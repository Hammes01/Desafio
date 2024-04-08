import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function Desafio1() {
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas

  useEffect(() => {
    fetchTasks(); // Chamada para buscar as tarefas ao carregar o componente
  }, []);

  // Função para buscar as tarefas
  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks') // Requisição GET para obter as tarefas
      .then(response => setTasks(response.data)) // Atualiza o status das tarefas com os dados recebidos
      .catch(error => console.error('Erro ao buscar tarefas:', error)); // Tratamento de erro, se a requisição falhar
  };

  // Função para adicionar uma nova tarefa
  const handleAddTask = (text) => {
    axios.post('http://localhost:5000/tasks', { text, completed: false }) // Requisição POST para adicionar nova tarefa
      .then(() => fetchTasks()) // Após adicionar, busca novamente as tarefas atualizadas
      .catch(error => console.error('Erro ao adicionar tarefa:', error)); // Tratamento de erro, se a requisição falhar
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`) // Requisição DELETE para excluir a tarefa pelo ID
      .then(() => fetchTasks()) // Após excluir, busca novamente as tarefas atualizadas
      .catch(error => console.error('Erro ao excluir tarefa:', error)); // Tratamento de erro, se a requisição falhar
  };

  // Função para alterar o texto de uma tarefa
  const handleToggleTask = (taskId, currentText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, text: currentText }; // Atualiza o texto localmente se o ID corresponder à tarefa
      }
      return task; // Retorna a tarefa sem modificação se o ID não corresponder
    });
    setTasks(updatedTasks); // Atualiza o estado das tarefas com as tarefas atualizadas
  };

  // Função para alternar o estado de prioridade de uma tarefa
  const handleToggleCompleted = (taskId, completed) => {
    axios.patch(`http://localhost:5000/tasks/${taskId}`, { completed: !completed }) // Requisição PATCH para alternar o estado de prioridade
      .then(() => fetchTasks()) // Após alterar, busca novamente as tarefas atualizadas
      .catch(error => console.error('Erro ao atualizar tarefa:', error)); // Tratamento de erro, se a requisição falhar
  };

  return (
    <div>
      {/* Componente TaskForm para adicionar novas tarefas, passando a função handleAddTask como propriedade */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Componente TaskList para exibir a lista de tarefas, passando as funções necessárias como propriedades */}
      <TaskList
        tasks={tasks} // Lista de tarefas a ser exibida
        onToggleCompleted={handleToggleCompleted} // Função para alternar o estado de prioridade de uma tarefa
        onDelete={handleDeleteTask} // Função para excluir uma tarefa
        onToggleEdit={handleToggleTask} // Função para alterar o texto de uma tarefa
      />
    </div>
  );
}

export default Desafio1;
