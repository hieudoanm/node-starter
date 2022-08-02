import { getHello } from '../services/hello.service';

export const resolvers = {
  Query: {
    hello: (): string => {
      return getHello();
    },
  },
};
