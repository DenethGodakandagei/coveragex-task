import dotenv from 'dotenv';
import app from './app.ts';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
