import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { createShortUrl } from '@/app/functions/short-urls/create';
import { readOneShortUrl } from '@/app/functions/short-urls/read-one';
import { slugify } from '@/app/helpers/slugify';

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
          201: z.object({
            id: z.string().uuid(),
            originalUrl: z.string().url(),
            name: z.string().min(6).max(40),
          }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, name } = request.body;

      const nameAsSlug = slugify(name);

      const existingShortUrl = await readOneShortUrl({ name: nameAsSlug });

      if (existingShortUrl != null) {
        return reply
          .status(400)
          .send({ message: 'Short URL name is already in use.' });
      }

      const shortUrl = await createShortUrl({
        name: nameAsSlug,
        originalUrl: originalUrl.trim(),
      });

      return reply.status(201).send({
        id: shortUrl.id,
        originalUrl: shortUrl.originalUrl,
        name: shortUrl.name,
      });
    }
  );
};
