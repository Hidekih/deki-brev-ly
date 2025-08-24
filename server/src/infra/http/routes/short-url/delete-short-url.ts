import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { deleteShortUrl } from '@/app/functions/short-urls/delete';
import { readOneShortUrl } from '@/app/functions/short-urls/read-one';

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

      const shortUrl = await readOneShortUrl({ shortUrlId });

      if (shortUrl == null) {
        return reply.status(400).send({ message: 'Short URL does not exist.' });
      }

      await deleteShortUrl({ shortUrlId });

      return reply.status(204).send();
    }
  );
};
