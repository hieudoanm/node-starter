import { errorHandler, notFoundHandler } from '.';

describe('middlewares', () => {
  it('should be truthy', () => {
    expect(errorHandler).toBeTruthy();
    expect(notFoundHandler).toBeTruthy();
  });
});
