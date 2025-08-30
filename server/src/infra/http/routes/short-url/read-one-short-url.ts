import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { increaseAccessCountShortUrl } from '@/app/functions/short-urls/increase-access-count';
import { readOneShortUrl } from '@/app/functions/short-urls/read-one';

export const readOneShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-urls/:name',
    {
      schema: {
        params: z.object({
          name: z.string(),
        }),
      },
    },
    async (request, reply) => {
      if (request.headers.purpose === 'prefetch') {
        return reply.status(200).send();
      }

      const { name } = request.params;

      const shortUrl = await readOneShortUrl({ name });

      if (shortUrl == null) {
        return reply.status(404).send({ message: 'Short URL not found.' });
      }

      await increaseAccessCountShortUrl({
        currentAccessCount: shortUrl.accessCount,
        shortUrlId: shortUrl.id,
      });

      return reply.status(302).redirect(shortUrl.originalUrl);
    }
  );
};
