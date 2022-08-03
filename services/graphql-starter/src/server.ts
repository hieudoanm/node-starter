import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { resolvers, typeDefs } from './graphql';
import logger from './libs/logger';

const PORT = process.env.PORT || '5000';
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const main = async () => {
  server.listen({ port: PORT }).then(({ url }) => {
    logger.info(`🚀  Server is listening at ${url}`);
  });
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
