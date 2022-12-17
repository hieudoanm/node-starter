import { IResolvers, TypeSource } from '@graphql-tools/utils';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
  gql,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import graphqlDepthLimit from 'graphql-depth-limit';
import http from 'http';

export type ApolloOptions = {
  depthLimit?: number;
  environment?: string;
  typeDefs?: TypeSource;
  resolvers?: IResolvers;
  httpServer?: http.Server;
};

const defaultTypeDefs = gql`
  type Query {
    health: String
  }
`;

const defaultResolvers = {
  Query: {
    health: () => 'healthy',
  },
};

const apolloDefaultOptions = {
  depthLimit: 10,
  environment: 'development',
  typeDefs: defaultTypeDefs,
  resolvers: defaultResolvers,
  httpServer: new http.Server(),
};

const init = (
  apolloOptions: ApolloOptions = apolloDefaultOptions
): ApolloServer => {
  const {
    depthLimit = 10,
    environment = 'development',
    typeDefs = defaultTypeDefs,
    resolvers = defaultResolvers,
    httpServer = new http.Server(),
  } = apolloOptions;

  const landingPage =
    environment === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    validationRules: [graphqlDepthLimit(depthLimit)],
    introspection: environment !== 'production',
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  return apolloServer;
};

export { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
export * from 'apollo-server-core';
export default init;
