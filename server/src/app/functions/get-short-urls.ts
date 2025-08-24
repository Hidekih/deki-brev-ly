import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { asc, count, gt } from 'drizzle-orm';
import { z } from 'zod';

const getShortUrlsInput = z.object({
  cursor: z.string().optional(),
  pageSize: z.number().optional().default(20),
});

type GetShortUrlsInput = z.input<typeof getShortUrlsInput>;

type GetShortUrlsOutput = {
  total: number;
  list: Array<{
    id: string;
    originalUrl: string;
    name: string;
    accessCount: number;
    createdAt: Date;
  }>;
};

export async function getShortUrls(
  input: GetShortUrlsInput
): Promise<GetShortUrlsOutput> {
  const { cursor, pageSize } = getShortUrlsInput.parse(input);

  const queryList = db
    .select()
    .from(schema.shortUrls)
    .orderBy(asc(schema.shortUrls.id))
    .limit(pageSize);

  const queryCount = db
    .select({ total: count(schema.shortUrls.id) })
    .from(schema.shortUrls);

  if (cursor) {
    queryList.where(gt(schema.shortUrls.id, cursor));
  }

  const [list, [{ total }]] = await Promise.all([queryList, queryCount]);

  return {
    total,
    list: list.map(item => ({
      id: item.id,
      originalUrl: item.originalUrl,
      name: item.name,
      accessCount: item.accessCount,
      createdAt: item.createdAt,
    })),
  };
}
