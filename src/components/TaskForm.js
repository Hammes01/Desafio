import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ onAddTask }) => {
  // Estado local para controlar o valor do campo de entrada de texto
  const [taskInput, setTaskInput] = useState('');

  // Função para lidar com a adição de uma nova tarefa
  const handleAddTask = () => {
    // Verifica se o texto da tarefa está vazio antes de adicionar
    if (taskInput.trim() !== '') {
      // Chama a função onAddTask passada como propriedade, com o texto da tarefa como argumento
      onAddTask(taskInput);
      // Limpa o campo de entrada após adicionar a tarefa
      setTaskInput('');
    }
  };

  return (
    <div>
      <TextField
        label="Nova Tarefa"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)} // Atualiza o estado com o valor do campo de entrada
      />
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Adicionar
      </Button>
    </div>
  );
};

export default TaskForm;
