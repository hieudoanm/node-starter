import { getHello } from './hello.service';

describe('hello', () => {
  it('should return world', () => {
    expect(getHello()).toEqual('world');
  });
});
