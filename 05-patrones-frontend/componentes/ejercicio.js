// Componente Tarjeta: genera un elemento visual para mostrar información
export function Tarjeta({ titulo, contenido }) {
  const div = document.createElement('div');
  div.className = 'tarjeta';
  div.innerHTML = `<h2>${titulo}</h2><p>${contenido}</p>`;
  return div;
}

// Componente Formulario: genera un formulario reutilizable con feedback visual
export function Formulario({ onSubmit }) {
  const form = document.createElement('form');
  form.className = 'formulario';
  form.innerHTML = `
    <input type="text" name="titulo" placeholder="Título" required />
    <input type="text" name="contenido" placeholder="Contenido" required />
    <button type="submit">Agregar Tarjeta</button>
    <div class="feedback" style="color: red; margin-top: 5px;"></div>
  `;
  const feedback = form.querySelector('.feedback');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = form.titulo.value.trim();
    const contenido = form.contenido.value.trim();
    if (!titulo || !contenido) {
      feedback.textContent = 'Completa ambos campos.';
      return;
    }
    feedback.textContent = '';
    onSubmit({ titulo, contenido });
    form.reset();
    feedback.style.color = 'green';
    feedback.textContent = '¡Tarjeta agregada!';
    setTimeout(() => {
      feedback.textContent = '';
      feedback.style.color = 'red';
    }, 1200);
  });
  return form;
}

// --- PATRÓN MVC ---

// Modelo: gestiona la lista de tarjetas
const Modelo = {
  tarjetas: [],
  agregarTarjeta(tarjeta) {
    this.tarjetas.push(tarjeta);
  }
};

// Vista: renderiza las tarjetas
const Vista = {
  app: document.getElementById('app'),
  renderTarjeta(tarjeta) {
    const el = Tarjeta(tarjeta);
    this.app.appendChild(el);
  }
};

// Controlador: conecta el formulario con el modelo y la vista
const Controlador = {
  agregarTarjeta({ titulo, contenido }) {
    Modelo.agregarTarjeta({ titulo, contenido });
    Vista.renderTarjeta({ titulo, contenido });
  },
  init() {
    Vista.app.appendChild(Formulario({ onSubmit: this.agregarTarjeta }));
  }
};

// Inicializar la app
Controlador.init();