import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@mui/material';
import { Delete, Edit, Done } from '@mui/icons-material';

const Task = ({ task, onToggleCompleted, onDelete, onToggleEdit }) => {
    // Função para lidar com a mudança de estado da tarefa (concluída ou não)
    const handleToggleCompleted = () => {
      // Chama a função onToggleCompleted passando o ID da tarefa e o estado atual de concluído
      onToggleCompleted(task.id, task.completed);
    };
  
    const handleToggleEdit = () => {
      // Chama a função onToggleEdit passando o ID da tarefa e o texto atual da tarefa
      onToggleEdit(task.id, task.text);
    };
  
    return (
      // Componente ListItem do Material-UI, representando uma tarefa na lista
      <ListItem key={task.id} dense button>
        <Checkbox checked={task.completed} onChange={handleToggleCompleted} />
        <ListItemText primary={task.text} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
        <ListItemSecondaryAction>
          <IconButton onClick={handleToggleEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  
  export default Task;