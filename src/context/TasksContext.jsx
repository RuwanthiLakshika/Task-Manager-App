import React, { createContext, useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService';

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = storageService.getTasks();
    setTasks(loaded);
    setLoading(false);
  }, []);

  const getAllTasks = () => tasks;

  const getTask = (id) => {
    return tasks.find(t => t.id === id) || null;
  };

  const addTask = (taskData) => {
    const newTask = storageService.addTask(taskData);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    const updatedTask = storageService.updateTask(id, updates);
    if (updatedTask) {
      setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
    }
    return updatedTask;
  };

  const deleteTask = (id) => {
    const success = storageService.deleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
    return success;
  };

  const searchTasks = useCallback((query) => {
    if (!query || !query.trim()) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [tasks]);

  return (
    <TasksContext.Provider value={{
      tasks,
      loading,
      getAllTasks,
      getTask,
      addTask,
      updateTask,
      deleteTask,
      searchTasks,
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
