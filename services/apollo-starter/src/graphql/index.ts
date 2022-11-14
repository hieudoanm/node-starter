import { gql, mergeResolvers } from '@hieudoanm/apollo';
import {
  resolvers as helloResolvers,
  typeDefs as helloTypeDefs,
} from './hello';

const globalsTypeDefs = gql`
  type Query
`;

export const typeDefs = [globalsTypeDefs, helloTypeDefs];

export const resolvers = mergeResolvers([helloResolvers]);
