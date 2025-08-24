import { asc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';

const deleteShortUrlInput = z.object({
  shortUrlId: z.string().uuid(),
});

type DeleteShortUrlInput = z.input<typeof deleteShortUrlInput>;

export async function deleteShortUrl(
  input: DeleteShortUrlInput
): Promise<void> {
  const { shortUrlId } = deleteShortUrlInput.parse(input);

  await db.delete(schema.shortUrls).where(eq(schema.shortUrls.id, shortUrlId));

  return;
}
