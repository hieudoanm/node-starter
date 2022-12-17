import RedisClient from '.';

jest.mock('redis', () => {
  const createClient = jest.fn().mockReturnValue({
    connect: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    on: jest.fn,
  });
  return { createClient };
});

describe('RedisClient', () => {
  const redisClient = new RedisClient({ url: '' });
  it('connect', async () => {
    expect(redisClient).toBeTruthy();
  });
});
