const STORAGE_KEY = 'tasks';

export const storageService = {
  getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
      return [];
    }
  },

  getTaskById(id) {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id) || null;
  },

  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      id: Date.now().toString(),
      ...task,
      completed: task.completed || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return newTask;
  },

  updateTask(id, updates) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return tasks[taskIndex];
  },

  deleteTask(id) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  },

  clearAllTasks() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default storageService;
