import { MONGO_URL, REDIS_URL } from '.';

describe('configs', () => {
  it('get environment variables', () => {
    expect(MONGO_URL).toEqual('mongodb://localhost:27017');
    expect(REDIS_URL).toEqual('redis://localhost:6379');
  });
});
