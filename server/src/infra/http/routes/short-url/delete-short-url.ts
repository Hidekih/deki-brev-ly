import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const deleteShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/short-urls/:shortUrlId',
    {
      schema: {
        params: z.object({
          shortUrlId: z.string().uuid(),
        }),
        response: {
          204: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrlId } = request.params;

      const shortUrl = await db
        .select()
        .from(schema.shortUrls)
        .where(eq(schema.shortUrls.id, shortUrlId));

      if (shortUrl[0] == null) {
        return reply.status(400).send({ message: 'Short URL does not exist.' });
      }

      await db
        .delete(schema.shortUrls)
        .where(eq(schema.shortUrls.id, shortUrlId))
        .returning();

      return reply.status(204).send();
    }
  );
};
