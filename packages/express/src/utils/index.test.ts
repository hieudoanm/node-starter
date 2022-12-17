import { normalizePort, onError, onListening } from '.';

describe('utils', () => {
  it('should be truthy', () => {
    expect(normalizePort).toBeTruthy();
    expect(onError).toBeTruthy();
    expect(onListening).toBeTruthy();
  });
});
