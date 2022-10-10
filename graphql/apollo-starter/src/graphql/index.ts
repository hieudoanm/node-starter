import { gql } from '@hieudoanm/apollo';
import merge from 'lodash/merge';
import {
  resolvers as helloResolvers,
  typeDefs as helloTypeDefs,
} from './hello';

const globalsTypeDefs = gql`
  type Query
`;

export const typeDefs = [globalsTypeDefs, helloTypeDefs];

export const resolvers = merge(helloResolvers);
