const STORAGE_KEY = 'tasks';

// Obtiene las tareas desde localStorage
export const getTasks = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Guarda una lista de tareas en localStorage
export const updateTasks = tasks =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

// Agrega una nueva tarea
export const addTask = task => {
  const tasks = getTasks();
  tasks.push({ ...task });
  updateTasks(tasks);
};

// Elimina una tarea por índice
export const removeTask = index => {
  const tasks = getTasks();
  tasks.splice(index, 1);
  updateTasks(tasks);
};
