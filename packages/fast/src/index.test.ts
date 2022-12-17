import express from '.';

describe('express', () => {
  it('should be truthy', () => {
    const app = express();
    expect(app).toBeTruthy();
  });

  it('should be truthy with cors', () => {
    const app = express();
    expect(app).toBeTruthy();
  });
});
