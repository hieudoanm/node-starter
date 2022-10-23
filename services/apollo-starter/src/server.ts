import dotenv from '@hieudoanm/dotenv';
const NODE_ENV = process.env.NODE_ENV || 'development';
NODE_ENV === 'development' && dotenv.config();

import apollo from '@hieudoanm/apollo';
import { normalizePort, onError, onListening } from '@hieudoanm/express';
import logger from '@hieudoanm/pino';
import http from 'http';
import { HttpError } from 'http-errors';
import app from './app';
import { resolvers, typeDefs } from './graphql';

const environment = process.env.NODE_ENV || 'development';

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Create HTTP server.
const httpServer = http.createServer(app);

const main = async () => {
  // Apollo Server
  const apolloServer = apollo({ environment, httpServer, typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  logger.info(`GraphQL Path: ${apolloServer.graphqlPath}`);
  // HTTP Server
  httpServer.listen({ port });
  httpServer.on('listening', () => {
    const message = onListening(httpServer);
    logger.info(message);
  });
  httpServer.on('error', (error: HttpError) => {
    const message = onError(error, port);
    logger.info(message);
    process.exit(1);
  });
};

main().catch((error: Error) => logger.error('Error', error));

process.on('unhandledRejection', (reason: string) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  logger.error('Error', error);
  process.exit(1);
});
