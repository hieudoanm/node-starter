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

server.listen({ port: PORT }).then(({ url }) => {
  logger.info(`🚀  Server is listening at ${url}`);
});
