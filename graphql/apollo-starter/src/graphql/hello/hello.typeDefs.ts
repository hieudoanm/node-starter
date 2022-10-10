import { gql } from '@hieudoanm/apollo';

export const typeDefs = gql`
  extend type Query {
    hello: String
  }
`;
