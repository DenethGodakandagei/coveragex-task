import { getTasks } from '../src/controller/taskController';
import { Request, Response } from 'express';
import db from '../src/config/db';

// Mock the db module
jest.mock('../src/config/db', () => ({
  query: jest.fn(),
}));

describe('Task Controller', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return last 5 incomplete tasks', async () => {
    (db.query as jest.Mock).mockResolvedValueOnce([
      [{ id: 1, title: 'Test', is_completed: false }],
    ]);

    // Act: call the controller
    await getTasks({} as Request, res as Response);

    // Assert: check response
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: 'Test', is_completed: false },
    ]);
  });

  it('should handle DB errors', async () => {
    // Arrange: mock a DB error
    (db.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    // Act: call the controller
    await getTasks({} as Request, res as Response);

    // Assert: check status and error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
  });
});
