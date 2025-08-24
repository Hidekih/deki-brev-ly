import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { exportShortUrls } from '@/app/functions/short-urls/export-short-urls';

export const exportShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/short-urls/export',
    {
      schema: {
        body: z.object({
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        }),
        response: {
          200: z.object({
            url: z.string().url(),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { startDate, endDate } = request.body;

      const { url } = await exportShortUrls({ startDate, endDate });

      return reply.status(200).send({
        url,
      });
    }
  );
};
