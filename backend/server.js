import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API routes
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
    res.send(' backend running ..!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
