import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ onAddTask, editedTask, onEditTask }) => {
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    // Atualiza o estado local para sincronizar com o texto da tarefa sendo editada
    setTaskInput(editedTask);
  }, [editedTask]);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      if (editedTask) {
        onEditTask(taskInput);
      } else {
        onAddTask(taskInput);
      }
      setTaskInput('');
    }
  };

  return (
    <div>
      <TextField
        label={editedTask ? "Editar Tarefa" : "Nova Tarefa"}
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <Button onClick={handleAddTask} variant="contained" color="primary">
        {editedTask ? "Salvar" : "Adicionar"}
      </Button>
    </div>
  );
};

export default TaskForm;
