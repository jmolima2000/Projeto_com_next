export type TaskStatus = 'PENDENTE' | 'EM_ANDAMENTO'| 'CONCLUIDA';

export interface Task {
  id: number | string;
  title: string;
  status: TaskStatus;
}

