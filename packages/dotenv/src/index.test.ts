import dotenv from '.';

describe('dotenv', () => {
  it('should return environments', () => {
    const environments = dotenv.config();
    expect(environments).toBeTruthy();
  });
});
