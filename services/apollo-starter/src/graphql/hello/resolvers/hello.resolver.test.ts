import { resolvers } from './hello.resolver';

describe('hello', () => {
  it('should return world', () => {
    expect(resolvers.Query.hello()).toEqual('world');
  });
});
