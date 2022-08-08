import { KEY_CLOAK_EXPRESS_HOST, MONGO_URI } from '.';

describe('configs', () => {
  it('should get correct environment variables', () => {
    expect(MONGO_URI).toEqual('mongodb://localhost:27017/test');
    expect(KEY_CLOAK_EXPRESS_HOST).toEqual(
      'http://localhost:8080/realms/express'
    );
  });
});
