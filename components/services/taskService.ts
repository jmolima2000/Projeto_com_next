import { Task, TaskStatus } from '../types/task';

const STORAGE_KEY = 'tasks';

function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [
    { id: 1, title: 'Estudar Next.js', status: 'PENDENTE' },
    { id: 2, title: 'Criar dashboard', status: 'EM_ANDAMENTO' },
    { id: 1, title: 'Estudar Next.js', status: 'PENDENTE' },
    { id: 2, title: 'Criar dashboard', status: 'EM_ANDAMENTO' }
  ];
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks: Task[] = [];

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    if (tasks.length === 0) {
      tasks = loadTasks();
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(tasks), 300);
    });
  },

  create: async (task: Task) => {
    tasks.push(task);
    saveTasks(tasks);
  },

  updateStatus: async (id: Task['id'], status: TaskStatus) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      saveTasks(tasks);
    }
  },

  delete: async (id: Task['id']) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
  }
};
