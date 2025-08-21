import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const readListShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get('/short-urls', () => {
    return 'Hello World';
  });
};
