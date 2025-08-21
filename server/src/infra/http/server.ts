import { env } from '@/env';
import {
  createShortUrlRoute,
  deleteShortUrlRoute,
  readListShortUrlRoute,
  reportShortUrlRoute,
  updateShortUrlRoute,
} from '@/infra/http/routes';
import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
    });

    // const validation = error.validation as ZodFastifySchemaValidationError[];
    // return validation.map(
    //   (error, ind) =>
    //     `Parameter '${error.params.issue.path.join('.')}': Message: ${error.params.issue.message} `
    // );
  }

  console.error(error);

  return reply.status(500).send({ message: 'Internal server error.' });
});

server.register(fastifyCors, { origin: '*' });

// * Register routes
server.register(createShortUrlRoute);
server.register(readListShortUrlRoute);
server.register(updateShortUrlRoute);
server.register(deleteShortUrlRoute);
server.register(reportShortUrlRoute);

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!');
});
