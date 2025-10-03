// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend running ..!');
});

export default app;
