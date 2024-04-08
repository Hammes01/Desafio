import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

// Componente funcional TaskForm para adicionar novas tarefas
const TaskForm = ({ onAddTask }) => {
  const [taskInput, setTaskInput] = useState('');

  // Função para lidar com a adição de uma nova tarefa
  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      onAddTask(taskInput);
      setTaskInput('');
    }
  };

  return (
    <div>
      <TextField
        label="Nova Tarefa"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}/>
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Adicionar
      </Button>
    </div>
  );
};

export default TaskForm;
