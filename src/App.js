import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function Desafio1() {
    // Estado para armazenar a lista de tarefas e outras variáveis de controle
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState('');
    
    useEffect(() => {
      fetchTasks();
    }, []);
  
    // Função para buscar as tarefas do servidor
    const fetchTasks = () => {
      axios.get('http://localhost:5000/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error('Erro ao buscar tarefas:', error));
    };
  
    // Função para adicionar uma nova tarefa
    const handleAddTask = (text) => {
      axios.post('http://localhost:5000/tasks', { text, completed: false })
        .then(() => fetchTasks())
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    };
  
    // Função para deletar uma tarefa
    const handleDeleteTask = (taskId) => {
      axios.delete(`http://localhost:5000/tasks/${taskId}`)
        .then(() => fetchTasks())
        .catch(error => console.error('Erro ao excluir tarefa:', error));
    };
  
    // Função para preparar a edição de uma tarefa
    const handleToggleTask = (taskId, currentText) => {
      setEditingTaskId(taskId);
      setEditedTaskText(currentText);
    };
  
    // Função para salvar alterações em uma tarefa
    const handleSaveTask = (taskId, newText, completed) => {
      axios.patch(`http://localhost:5000/tasks/${taskId}`, { text: newText, completed })
        .then(() => {
          fetchTasks();
          setEditingTaskId(null);
          setEditedTaskText('');
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
    };
  
    // Função para alternar o status de realização de uma tarefa
    const handleToggleCompleted = (taskId, completed) => {
      axios.patch(`http://localhost:5000/tasks/${taskId}`, { completed: !completed })
        .then(() => fetchTasks())
        .catch(error => console.error('Erro ao alternar completude:', error));
    };

    return (
      <div>
        {/* Componente para adicionar novas tarefas */}
        <TaskForm onAddTask={handleAddTask} />
  
        {/* Componente para exibir a lista de tarefas */}
        <TaskList
          tasks={tasks}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDeleteTask}
          onToggleEdit={handleToggleTask}
        />
      </div>
    );
  }
  
  export default Desafio1;
  