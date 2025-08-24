import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { readListShortUrls } from '@/app/functions/short-urls/read-list';

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

      const { total, list } = await readListShortUrls({ cursor, pageSize });

      return reply.status(200).send({
        total,
        list,
      });
    }
  );
};
