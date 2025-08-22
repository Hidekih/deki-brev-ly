import { env } from '@/env';
import {
  createShortUrlRoute,
  deleteShortUrlRoute,
  readListShortUrlRoute,
  readOneShortUrlRoute,
  reportShortUrlRoute,
  updateShortUrlRoute,
} from '@/infra/http/routes';
import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  type ZodFastifySchemaValidationError,
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const validation = error.validation as ZodFastifySchemaValidationError[];
    return reply.status(400).send({
      message: `Validation error: ${validation.map(error => error.message).join(', ')}`,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: 'Internal server error.' });
});

server.register(fastifyCors, { origin: '*' });

// * Register routes
server.register(createShortUrlRoute);
server.register(deleteShortUrlRoute);
server.register(readOneShortUrlRoute);
server.register(readListShortUrlRoute);
server.register(updateShortUrlRoute);
server.register(reportShortUrlRoute);

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!');
});
