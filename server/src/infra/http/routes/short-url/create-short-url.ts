import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';

export const createShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/short-urls',
    {
      schema: {
        body: z.object({
          originalUrl: z.string().url(),
          name: z.string().min(6).max(40),
        }),
        response: {
          201: z
            .object({
              id: z.string().uuid(),
              originalUrl: z.string().url(),
              name: z.string().min(6).max(40),
            })
            .describe('Short URL created'),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, name } = request.body;
      const sanitizedName = name.trim().replace(/[\s/]+/g, '-');

      const existingShortUrl = await db
        .select({ id: schema.shortUrls.id })
        .from(schema.shortUrls)
        .where(eq(schema.shortUrls.name, sanitizedName));

      if (existingShortUrl[0] != null) {
        return reply
          .status(400)
          .send({ message: 'Short URL name is already in use.' });
      }

      const createdShortUrls = await db
        .insert(schema.shortUrls)
        .values({
          name: sanitizedName,
          originalUrl,
        })
        .returning();

      return reply.status(201).send({
        id: createdShortUrls[0].id,
        originalUrl: createdShortUrls[0].originalUrl,
        name: createdShortUrls[0].name,
      });
    }
  );
};
