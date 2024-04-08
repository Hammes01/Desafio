import React from 'react';
import { List } from '@mui/material';
import Task from './Task'; // Importa o componente Task que será usado para renderizar cada item da lista

const TaskList = ({ tasks, onToggleCompleted, onDelete, onToggleEdit }) => {
  return (
    <List>
      {/* Mapeia o array de tarefas recebido como propriedade e renderiza um componente Task para cada uma */}
      {tasks.map((task) => (
        <Task
          key={task.id} // Define a chave única para cada tarefa (importante para o React)
          task={task} // Passa a tarefa como propriedade para o componente Task
          onToggleCompleted={onToggleCompleted} // Passa a função onToggleCompleted como propriedade para o componente Task
          onDelete={onDelete} // Passa a função onDelete como propriedade para o componente Task
          onToggleEdit={onToggleEdit} // Passa a função onToggleEdit como propriedade para o componente Task
        />
      ))}
    </List>
  );
};

export default TaskList;
