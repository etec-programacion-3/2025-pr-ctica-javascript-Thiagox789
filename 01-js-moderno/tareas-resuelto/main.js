// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask, updateTasks } from './tareas.js';

// Referencias al DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const filter = document.getElementById('filter');

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  let tasks = getTasks();

  const selectedFilter = filter?.value || 'all';
  if (selectedFilter === 'completed') {
    tasks = tasks.filter(t => t.completada);
  } else if (selectedFilter === 'pending') {
    tasks = tasks.filter(t => !t.completada);
  }

  tasks.forEach(({ texto, completada }, idx) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completada;
    checkbox.onchange = () => {
      const updated = getTasks();
      updated[idx].completada = checkbox.checked;
      updateTasks(updated);
      renderTasks();
    };

    const span = document.createElement('span');
    span.textContent = texto;
    span.style.textDecoration = completada ? 'line-through' : 'none';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const nuevoTexto = prompt('Editar tarea:', texto);
      if (nuevoTexto) {
        const updated = getTasks();
        updated[idx].texto = nuevoTexto;
        updateTasks(updated);
        renderTasks();
      }
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Eliminar';
    delBtn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };

    li.append(checkbox, span, editBtn, delBtn);
    list.appendChild(li);
  });
}

// Manejo del formulario
form.onsubmit = e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  addTask({ texto, completada: false });
  input.value = '';
  renderTasks();
};

filter?.addEventListener('change', renderTasks);

// Render inicial
renderTasks();
