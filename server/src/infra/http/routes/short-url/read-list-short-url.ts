import { asc, gt } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';

export const readListShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-urls',
    {
      schema: {
        querystring: z.object({
          pageSize: z.coerce.number().min(1).max(100).default(10),
          cursor: z.string().optional(),
        }),
        response: {
          200: z.object({
            total: z.number().int().nonnegative(),
            list: z
              .array(
                z.object({
                  id: z.string().uuid(),
                  originalUrl: z.string().url(),
                  name: z.string().min(6).max(40),
                  accessCount: z.number().int().nonnegative(),
                  createdAt: z.date(),
                })
              )
              .describe('List of Short URLs'),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { pageSize, cursor } = request.query;

      const shortUrls = await db
        .select()
        .from(schema.shortUrls)
        .orderBy(asc(schema.shortUrls.id))
        .where(cursor != null ? gt(schema.shortUrls.id, cursor) : undefined)
        .limit(pageSize);

      return reply.status(200).send({
        total: shortUrls.length,
        list: shortUrls.map(shortUrl => ({
          id: shortUrl.id,
          originalUrl: shortUrl.originalUrl,
          name: shortUrl.name,
          accessCount: shortUrl.accessCount,
          createdAt: shortUrl.createdAt,
        })),
      });
    }
  );
};
