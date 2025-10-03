import express, { Router } from 'express';
import { getTasks, createTask, completeTask } from '../controller/taskController';

const router: Router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id/complete', completeTask);

export default router;
