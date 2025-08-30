import { stringify } from 'csv-stringify';
import { type SQL, asc, gt, lt, sql } from 'drizzle-orm';
import { z } from 'zod';

import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { env } from '@/config/env';
import { db, pg } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { concat } from 'drizzle-orm/pg-core/expressions';

const getShortUrlsInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type GetShortUrlsInput = z.input<typeof getShortUrlsInput>;

type GetShortUrlsOutput = {
  url: string;
};

// * Este endpoint cria um arquivo em CSV e o envia para o Cloudflare R2 com estratégia de stream para otimização de memória
export async function exportShortUrls(
  input: GetShortUrlsInput
): Promise<GetShortUrlsOutput> {
  const { startDate, endDate } = getShortUrlsInput.parse(input);

  const API_URL_WITH_SLASH = env.API_URL.endsWith('/')
    ? env.API_URL
    : `${env.API_URL}/`;
  const SHORT_URL_BASE = `${API_URL_WITH_SLASH}short-urls/`;

  const shortUrlSelect = concat(
    sql`${SHORT_URL_BASE}` as unknown as SQL.Aliased,
    schema.shortUrls.name
  );

  const query = db
    .select({
      id: schema.shortUrls.id,
      short_url: shortUrlSelect.as('short_url'),
      original_url: schema.shortUrls.originalUrl,
      access_count: schema.shortUrls.accessCount,
      created_at: schema.shortUrls.createdAt,
    })
    .from(schema.shortUrls)
    .orderBy(asc(schema.shortUrls.id));

  if (endDate != null) {
    const parsedEndDate = new Date(endDate);
    query.where(lt(schema.shortUrls.createdAt, parsedEndDate));
  }

  if (startDate != null) {
    const parsedStartDate = new Date(startDate);
    query.where(gt(schema.shortUrls.createdAt, parsedStartDate));
  }

  const { sql: rawSql, params } = query.toSQL();

  const cursor = pg.unsafe(rawSql, params as (string | number)[]).cursor(50);

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'original_url', header: 'URL original' },
      { key: 'short_url', header: 'URL encurtada' },
      { key: 'access_count', header: 'Acessos' },
      { key: 'created_at', header: 'Criado em' },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      // * Transforma o binário em objeto
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        // * Garante que cada chunk seja tratado de forma individual para gerar uma linha do CSV
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: 'report.csv',
    contentStream: uploadToStorageStream,
  });

  // * Cria o arquivo CSV apartir do cursor ao mesmo tempo que envia o stream para o Cloudflare R2
  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return {
    url,
  };
}
