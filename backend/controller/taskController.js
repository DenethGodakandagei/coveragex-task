import db from '../config/db.js';

// Get last 5 incomplete tasks
export const getTasks = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC LIMIT 5'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new task
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO task (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.json({ id: result.insertId, title, description, is_completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark task as completed
export const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('UPDATE task SET is_completed = TRUE WHERE id = ?', [id]);
    res.json({ message: 'Task completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
