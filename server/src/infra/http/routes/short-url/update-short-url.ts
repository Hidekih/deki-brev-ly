import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const updateShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.put('/short-urls/:id', () => {
    return 'Hello World';
  });
};
