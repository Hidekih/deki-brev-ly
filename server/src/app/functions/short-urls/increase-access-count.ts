import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { ShortUrl } from '@/infra/db/schemas/short-urls';
import { eq } from 'drizzle-orm';

const increaseAccessCountShortUrlInput = z.object({
  currentAccessCount: z.number().min(0),
  shortUrlId: z.string().uuid(),
});

type IncreaseAccessCountShortUrlInput = z.input<
  typeof increaseAccessCountShortUrlInput
>;

export async function increaseAccessCountShortUrl(
  input: IncreaseAccessCountShortUrlInput
): Promise<ShortUrl> {
  const { currentAccessCount, shortUrlId } =
    increaseAccessCountShortUrlInput.parse(input);

  const shortUrl = await db
    .update(schema.shortUrls)
    .set({ accessCount: currentAccessCount + 1 })
    .where(eq(schema.shortUrls.id, shortUrlId))
    .returning();

  return shortUrl[0];
}
