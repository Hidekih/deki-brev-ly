import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { ShortUrl } from '@/infra/db/schemas/short-urls';

const readOneShortUrlInput = z
  .object({
    shortUrlId: z.string().uuid().optional(),
    name: z.string().optional(),
  })
  .refine(data => data.shortUrlId != null || data.name != null, {
    message: 'É necessário informar o identificador ou o nome',
    path: ['shortUrlId'],
  });

type ReadOneShortUrlInput = z.input<typeof readOneShortUrlInput>;

export async function readOneShortUrl(
  input: ReadOneShortUrlInput
): Promise<ShortUrl | null> {
  const { shortUrlId, name } = readOneShortUrlInput.parse(input);

  const shortUrl = await db.query.shortUrls.findFirst({
    where:
      (shortUrlId != null ? eq(schema.shortUrls.id, shortUrlId) : undefined) ||
      (name != null ? eq(schema.shortUrls.name, name) : undefined),
  });

  if (shortUrl == null) return null;

  return shortUrl;
}
