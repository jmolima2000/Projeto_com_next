'use client';

import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      const data = await taskService.getAll();
      if (isMounted) {
        setTasks(data);
        setLoading(false);
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    tasks,
    setTasks,
    loading
  };
}
