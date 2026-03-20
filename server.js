import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(todos);
  } catch (error) {
    console.error('Failed to fetch todos', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const title = req.body?.title?.trim();
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await prisma.todo.create({
      data: { title },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Failed to create todo', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.patch('/api/todos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const completed = Boolean(req.body?.completed);

    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });

    res.json(todo);
  } catch (error) {
    console.error('Failed to update todo', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.todo.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete todo', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening');
});
