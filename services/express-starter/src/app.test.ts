import supertest from 'supertest';
import app from './app';

describe('app', () => {
  it('GET /hello has status code = 200', async () => {
    const response = await supertest(app).get('/health');
    expect(response.statusCode).toBe(200);
  });
});
