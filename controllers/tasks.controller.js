import Task from '../models/tasks.model.js';

// Listar todas as tarefas
export const getAllTasks = (req, res) => {
  const tasks = Task.getAll();
  res.json(tasks);
};

// Buscar tarefa pelo id
export const getTaskById = (req, res) => {
  const id = req.params.id; // o Task já faz a conversão para Number
  const task = Task.getById(id);

  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  res.json(task);
};

// Criar nova tarefa
export const createTask = (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'O campo "title" é obrigatório' });
  }

  const newTask = Task.create({ title, completed: completed || false });
  res.status(201).json(newTask);
};

// Atualizar tarefa existente
export const updateTask = (req, res) => {
  const id = req.params.id;
  const { title, completed } = req.body;

  const updatedTask = Task.update(id, { title, completed });

  if (!updatedTask) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  res.json(updatedTask);
};

// Deletar tarefa
export const deleteTask = (req, res) => {
  const id = req.params.id;

  const deleted = Task.delete(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  res.status(204).send();
};
