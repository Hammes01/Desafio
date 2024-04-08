import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const Task = ({ task, onToggleCompleted, onDelete, onToggleEdit }) => {
  // Estado local para controlar a edição do texto da tarefa
  const [editedText, setEditedText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  // Função para lidar com a mudança de estado da tarefa concluída
  const handleToggleCompleted = () => {
    onToggleCompleted(task.id, task.completed);
  };

  // Função para alternar entre o modo de edição e visualização
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedText(task.text);
  };

  // Função para lidar com a exclusão da tarefa
  const handleDelete = () => {
    onDelete(task.id);
  };

  // Função para salvar as alterações feitas na tarefa
  const handleEditComplete = () => {
    if (editedText.trim() !== '') {
      // Atualiza a tarefa no banco de dados
      axios.patch(`http://localhost:5000/tasks/${task.id}`, {
        text: editedText,
        completed: task.completed
      })
      .then(response => {
        console.log('Tarefa atualizada:', response.data);
        // Atualiza localmente após a resposta
        onToggleEdit(task.id, editedText);
        setIsEditing(false); // Finaliza o modo de edição
      })
      .catch(error => {
        console.error('Erro ao atualizar a tarefa:', error);
        // Lida com o erro aqui
      });
    } else {
      // Restaura o texto original se o texto editado for vazio
      setEditedText(task.text);
      setIsEditing(false); // Finaliza o modo de edição
    }
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  // Função para lidar com a tecla pressionada (Enter) ao editar
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditComplete(); // Chama a função de conclusão da edição ao pressionar Enter
    }
  };

  return (
    <ListItem dense button>
      {/* Checkbox para indicar a conclusão da tarefa */}
      <Checkbox checked={task.completed} onChange={handleToggleCompleted} />

      {isEditing ? (
        // Componente TextField utilizado para editar o texto da tarefa
        <TextField
          fullWidth
          value={editedText}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onBlur={handleEditComplete}
          autoFocus
        />
      ) : (
        // Componente ListItemText utilizado para exibir o texto da tarefa
        <ListItemText
          primary={task.text}
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          onClick={handleToggleEdit}
        />
      )}

      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleToggleEdit}>
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
