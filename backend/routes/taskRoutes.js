import express from 'express';
import { getTasks, createTask, completeTask } from '../controller/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id/complete', completeTask);

export default router;
