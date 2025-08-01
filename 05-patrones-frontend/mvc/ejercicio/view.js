// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
  constructor() {
    // Referencias a los elementos del DOM
    this.list = document.getElementById('task-list');
    this.form = document.getElementById('task-form');
    this.input = document.getElementById('task-input');
  }

  // Renderiza la lista de tareas en el DOM
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = task;
      li.appendChild(span);

      // Botón eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'btn-eliminar';
      btnEliminar.dataset.idx = idx;
      li.appendChild(btnEliminar);

      // Botón editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'btn-editar';
      btnEditar.dataset.idx = idx;
      li.appendChild(btnEditar);

      this.list.appendChild(li);
    });
  }

  // Asocia el evento de agregar tarea al formulario
  bindAddTask(handler) {
    this.form.onsubmit = e => {
      e.preventDefault();
      handler(this.input.value); // Llama al controlador con el valor ingresado
      this.input.value = '';
    };
  }


  // Asocia el evento de eliminar tarea a la lista
  bindRemoveTask(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.classList.contains('btn-eliminar')) {
        const idx = parseInt(e.target.dataset.idx);
        handler(idx);
      }
    });
  }

  // Asocia el evento de editar tarea a la lista
  bindEditTask(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.classList.contains('btn-editar')) {
        const idx = parseInt(e.target.dataset.idx);
        const nuevoTexto = prompt('Editar tarea:', this.list.children[idx].querySelector('span').textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
          handler(idx, nuevoTexto.trim());
        }
      }
    });
  }
} 