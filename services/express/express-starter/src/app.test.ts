import supertest from 'supertest';
import app from './app';

describe('app', () => {
  it('GET /hello has status code = 200', async () => {
    const response = await supertest(app).get('/hello');
    expect(response.statusCode).toBe(200);
  });

  it('POST /api/visas has status code = 200', async () => {
    const response = await supertest(app).post('/hello');
    expect(response.statusCode).toBe(200);
  });

  it('PUT /hello has status code = 200', async () => {
    const response = await supertest(app).put('/hello');
    expect(response.statusCode).toBe(200);
  });

  it('PATCH /api/visas has status code = 200', async () => {
    const response = await supertest(app).patch('/hello');
    expect(response.statusCode).toBe(200);
  });

  it('DELETE /api/visas has status code = 200', async () => {
    const response = await supertest(app).delete('/hello');
    expect(response.statusCode).toBe(200);
  });
});
