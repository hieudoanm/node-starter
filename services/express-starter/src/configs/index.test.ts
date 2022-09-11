import { MONGO_URL, REDIS_URL } from '.';

describe('configs', () => {
  it('get environment variables', () => {
    expect(MONGO_URL).toEqual('');
    expect(REDIS_URL).toEqual('');
  });
});
