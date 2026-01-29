'use client';

import { useTasks } from '../components/hooks/useTasks';
import { TaskForm } from '../components/TaskForm';
import { taskService } from '../components/services/taskService';
import { TaskStatus } from '../components/types/task';

function getNextStatus(status: TaskStatus): TaskStatus {
  if (status === 'PENDENTE') return 'EM_ANDAMENTO';
  if (status === 'EM_ANDAMENTO') return 'CONCLUIDA';
  return 'PENDENTE';
}

function getStatusColor(status: TaskStatus) {
  if (status === 'PENDENTE') return '#6b7280';
  if (status === 'EM_ANDAMENTO') return '#2563eb';
  return '#16a34a';
}

export default function Home() {
  const { tasks, setTasks, loading } = useTasks();

  if (loading) return <p>Carregando...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard de Tarefas</h1>

      <TaskForm
        onCreate={async task => {
          await taskService.create(task);
          const updatedTasks = await taskService.getAll();
          setTasks(updatedTasks);
        }}
      />

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: 8 }}>
            <span
              style={{
                color: getStatusColor(task.status),
                fontWeight: 600
              }}
            >
              {task.title} — {task.status}
            </span>

            <button
              style={{ marginLeft: 10 }}
              onClick={async () => {
                const nextStatus = getNextStatus(task.status);
                await taskService.updateStatus(task.id, nextStatus);

                setTasks(prev =>
                  prev.map(t =>
                    t.id === task.id
                      ? { ...t, status: nextStatus }
                      : t
                  )
                );
              }}
            >
              Avançar status
            </button>

            <button
              style={{ marginLeft: 6, color: 'red' }}
              onClick={async () => {
                await taskService.delete(task.id);
                setTasks(prev =>
                  prev.filter(t => t.id !== task.id)
                );
              }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
