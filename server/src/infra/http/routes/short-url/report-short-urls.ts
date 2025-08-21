import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const reportShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post('/short-urls/report', () => {
    return 'Hello World';
  });
};
