import { ApolloServer, gql } from 'apollo-server-express';
import http from 'http';
import { normalizePort, onListening } from '.';

describe('server utils', () => {
  describe('normalizePort', () => {
    it('should return port', () => {
      expect(normalizePort('8080')).toEqual(8080);
    });

    it('should return pipe', () => {
      expect(normalizePort('pipe')).toEqual('pipe');
    });

    it('should return false', () => {
      expect(normalizePort('-8080')).toEqual(false);
    });
  });

  describe('onListening', () => {
    it('should log message', () => {
      const apolloServer = new ApolloServer({
        resolvers: { Query: { hello: () => 'world' } },
        typeDefs: [
          gql`
            type Query {
              hello: String
            }
          `,
        ],
      });
      const httpServer = http.createServer();
      onListening(apolloServer, httpServer);
    });
  });
});
