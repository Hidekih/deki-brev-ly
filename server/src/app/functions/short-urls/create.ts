import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { ShortUrl } from '@/infra/db/schemas/short-urls';

const createShortUrlInput = z.object({
  originalUrl: z.string().url(),
  name: z.string().min(6).max(40),
});

type CreateShortUrlInput = z.input<typeof createShortUrlInput>;

export async function createShortUrl(
  input: CreateShortUrlInput
): Promise<ShortUrl> {
  const { name, originalUrl } = createShortUrlInput.parse(input);

  const [createdShortUrl] = await db
    .insert(schema.shortUrls)
    .values({
      name,
      originalUrl,
    })
    .returning();

  return createdShortUrl;
}
