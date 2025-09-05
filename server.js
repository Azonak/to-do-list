import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.routes.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
