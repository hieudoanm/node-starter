import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log('NODE_ENV', NODE_ENV);
if (NODE_ENV === 'development') {
  dotenv.config();
}

import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import http from 'http';
import { HttpError } from 'http-errors';
import app from './app';
import { resolvers, typeDefs } from './graphql';
import logger from './libs/logger';
import { normalizePort, onError, onListening } from './utils/server';

// Get port from environment and store in Express.
const PORT = normalizePort(process.env.PORT || '5000');
app.set('port', PORT);

// Create HTTP server.
const httpServer = http.createServer(app);

const main = async () => {
  const landingPage =
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    validationRules: [depthLimit(10)],
    introspection: NODE_ENV === 'development',
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen({ port: PORT });
  httpServer.on('listening', () => onListening(apolloServer, httpServer));
  httpServer.on('error', (error: HttpError) => onError(error, PORT));
};

main().catch((error: Error) => logger.error(error));

process.on('unhandledRejection', (reason: string) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  logger.error(error);
  process.exit(1);
});
