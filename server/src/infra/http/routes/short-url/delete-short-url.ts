import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const deleteShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/short-urls/:id', () => {
    return 'Hello World';
  });
};
