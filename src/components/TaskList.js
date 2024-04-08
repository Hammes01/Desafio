import React from 'react';
import { List } from '@mui/material';
import Task from './Task';

// Componente funcional TaskList que renderiza uma lista de tarefas
const TaskList = ({ tasks, onToggleCompleted, onDelete, onToggleEdit }) => {
  return (
    <List>
      {/* Mapeia todas as tarefas recebidas como props e renderiza o componente Task para cada uma */}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}
          onToggleEdit={onToggleEdit}/>
      ))}
    </List>
  );
};

export default TaskList;
