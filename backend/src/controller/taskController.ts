import { Request, Response } from 'express';
import db from '../config/db';

// Define a Task interface
interface Task {
  id?: number;
  title: string;
  description?: string;
  is_completed?: boolean;
  created_at?: Date;
}

// Get last 5 incomplete tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query('SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC LIMIT 5');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query('SELECT * FROM task ORDER BY created_at DESC');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Create new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body as { title: string; description?: string };
  try {
    const [result]: any = await db.query(
      'INSERT INTO task (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.json({ id: result.insertId, title, description, is_completed: false });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mark task as completed
export const completeTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await db.query('UPDATE task SET is_completed = TRUE WHERE id = ?', [id]);
    res.json({ message: 'Task completed' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
