import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import tasks from './Data';

function Desafio1() {
  const [tasksData, setTasksData] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    setTasksData(tasks);
  }, []);

  const handleAddTask = (newTaskText) => {
    // Criar uma nova tarefa com base no texto fornecido e um ID)
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      completed: false,
    };

    setTasksData([...tasksData, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    // Filtrar as tarefas para remover a tarefa com o ID correspondente
    const updatedTasks = tasksData.filter(task => task.id !== taskId);

    setTasksData(updatedTasks);
  };

  const handleToggleTask = (taskId, currentText) => {
    // Configurar o ID da tarefa em edição e o texto editado
    setEditingTaskId(taskId);
    setEditedTaskText(currentText);
  };

  const handleSaveTask = (taskId, newText, completed) => {
    // Atualizar a tarefa com o novo texto e estado de conclusão
    const updatedTasks = tasksData.map(task => {
      if (task.id === taskId) {
        return { ...task, text: newText, completed };
      }
      return task;
    });

    // Limpar o estado de edição após salvar
    setEditingTaskId(null);
    setEditedTaskText('');

    // Atualizar o estado de tarefas com as alterações
    setTasksData(updatedTasks);
  };

  const handleToggleCompleted = (taskId, completed) => {
    // Alternar o estado de conclusão da tarefa com base no ID
    const updatedTasks = tasksData.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !completed };
      }
      return task;
    });

    // Atualizar o estado de tarefas com as alterações
    setTasksData(updatedTasks);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasksData}
        onToggleCompleted={handleToggleCompleted}
        onDelete={handleDeleteTask}
        onToggleEdit={handleToggleTask}
        onSaveTask={handleSaveTask}
        editingTaskId={editingTaskId}
        editedTaskText={editedTaskText}
      />
    </div>
  );
}

export default Desafio1;
