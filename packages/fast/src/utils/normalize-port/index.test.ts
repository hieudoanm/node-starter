import { normalizePort } from '.';

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
