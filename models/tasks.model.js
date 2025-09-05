import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o db.json
const dbPath = path.resolve(__dirname, '../db.json');

// Função para ler o banco de dados
function readDB() {
  try {
    if (!fs.existsSync(dbPath)) {
      // Cria o arquivo com estrutura inicial, se não existir
      fs.writeFileSync(dbPath, JSON.stringify({ tasks: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o banco de dados:', error);
    return { tasks: [] };
  }
}

// Função para escrever no banco de dados
function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
  }
}

class Task {
  static getAll() {
    const db = readDB();
    return db.tasks;
  }

  static getById(id) {
    const db = readDB();
    const numId = Number(id);
    if (isNaN(numId)) return null;
    return db.tasks.find(task => task.id === numId) || null;
  }

  static create({ title, completed }) {
    const db = readDB();
    const newId = db.tasks.length ? db.tasks[db.tasks.length - 1].id + 1 : 1;
    const newTask = {
      id: newId,
      title,
      completed: Boolean(completed),
    };
    db.tasks.push(newTask);
    writeDB(db);
    return newTask;
  }

  static update(id, { title, completed }) {
    const db = readDB();
    const numId = Number(id);
    if (isNaN(numId)) return null;

    const taskIndex = db.tasks.findIndex(t => t.id === numId);
    if (taskIndex === -1) return null;

    if (title !== undefined) db.tasks[taskIndex].title = title;
    if (completed !== undefined) db.tasks[taskIndex].completed = Boolean(completed);

    writeDB(db);
    return db.tasks[taskIndex];
  }

  static delete(id) {
    const db = readDB();
    const numId = Number(id);
    if (isNaN(numId)) return false;

    const initialLength = db.tasks.length;
    db.tasks = db.tasks.filter(t => t.id !== numId);
    if (db.tasks.length === initialLength) return false;

    writeDB(db);
    return true;
  }
}

export default Task;
