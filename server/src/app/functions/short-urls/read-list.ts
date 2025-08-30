import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { asc, count, gt, gte } from 'drizzle-orm';
import { z } from 'zod';

const readListShortUrlsInput = z.object({
  cursor: z.string().optional(),
  pageSize: z.number().optional().default(20),
});

type ReadListShortUrlsInput = z.input<typeof readListShortUrlsInput>;

type GetShortUrlsOutput = {
  total: number;
  nextCursor?: string;
  list: Array<{
    id: string;
    originalUrl: string;
    name: string;
    accessCount: number;
    createdAt: Date;
  }>;
};

export async function readListShortUrls(
  input: ReadListShortUrlsInput
): Promise<GetShortUrlsOutput> {
  const { cursor, pageSize } = readListShortUrlsInput.parse(input);

  const queryList = db
    .select()
    .from(schema.shortUrls)
    .orderBy(asc(schema.shortUrls.id))
    .limit(pageSize);

  const queryCount = db
    .select({ total: count(schema.shortUrls.id) })
    .from(schema.shortUrls);

  if (cursor) {
    queryList.where(gte(schema.shortUrls.id, cursor));
  }

  const [list, [{ total }]] = await Promise.all([queryList, queryCount]);

  const [nextShortUrl] = await db
    .select({ id: schema.shortUrls.id })
    .from(schema.shortUrls)
    .orderBy(asc(schema.shortUrls.id))
    .where(gt(schema.shortUrls.id, list[list.length - 1].id))
    .limit(1);

  return {
    total,
    nextCursor: nextShortUrl?.id,
    list: list.map(item => ({
      id: item.id,
      originalUrl: item.originalUrl,
      name: item.name,
      accessCount: item.accessCount,
      createdAt: item.createdAt,
    })),
  };
}
