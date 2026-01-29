'use client';

import { useState } from 'react';
import { Task } from '../components/types/task';

interface Props {
  onCreate: (task: Task) => void;
}

export function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState('');

  function handleSubmit() {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      title,
      status: 'PENDENTE'
    });

    setTitle('');
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Criar
      </button>
    </div>
  );
}
