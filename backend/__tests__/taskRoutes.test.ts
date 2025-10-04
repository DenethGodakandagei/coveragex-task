import request from 'supertest';
import app from '../src/app'; 
import db from '../src/config/db';


jest.mock('../src/config/db', () => ({
  query: jest.fn(),
}));

describe('Task API', () => {
  it('GET /api/tasks should return tasks', async () => {
    // Mock the database response
    (db.query as jest.Mock).mockResolvedValueOnce([
      [{ id: 1, title: 'Test task', is_completed: false }]
    ]);

    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([{ id: 1, title: 'Test task', is_completed: false }]);
  });
});
