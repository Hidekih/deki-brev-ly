import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { shortUrls } from '@/infra/db/schemas/short-urls';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const readOneShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-urls/:shortUrlId',
    {
      schema: {
        params: z.object({
          shortUrlId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { shortUrlId } = request.params;

      const [shortUrl] = await db
        .select()
        .from(schema.shortUrls)
        .where(eq(schema.shortUrls.id, shortUrlId));

      if (shortUrl == null) {
        return reply.status(404).send({ message: 'Short URL not found.' });
      }

      await db
        .update(schema.shortUrls)
        .set({
          accessCount: shortUrl.accessCount + 1,
        })
        .where(eq(shortUrls.id, shortUrlId));

      return reply.status(302).redirect(shortUrl.originalUrl);
    }
  );
};
