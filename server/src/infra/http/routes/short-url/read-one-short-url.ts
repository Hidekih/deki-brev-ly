import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { increaseAccessCountShortUrl } from '@/app/functions/short-urls/increase-access-count';
import { readOneShortUrl } from '@/app/functions/short-urls/read-one';

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

      const shortUrl = await readOneShortUrl({ shortUrlId });

      if (shortUrl == null) {
        return reply.status(404).send({ message: 'Short URL not found.' });
      }

      await increaseAccessCountShortUrl({
        currentAccessCount: shortUrl.accessCount,
        shortUrlId,
      });

      return reply.status(302).redirect(shortUrl.originalUrl);
    }
  );
};
