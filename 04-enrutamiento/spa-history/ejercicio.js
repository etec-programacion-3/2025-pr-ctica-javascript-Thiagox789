// Referencia al contenedor principal de la SPA
const app = document.getElementById('app');

// Definición de rutas y sus vistas asociadas (solo básicas)
const routes = {
  '/': () => '<h1>Inicio</h1><p>HOLA, Este es el SPA :) .</p>',
  '/productos': () => '<h1>Productos</h1><p>Esta es la lista de productos.</p>',
  '/contacto': () => '<h1>Contacto</h1><p>Este es el formulario de contacto.</p>',
  '/producto/1': () => '<h1>Detalle Producto 1</h1><p>Esta es la info que tenemos sobre el producto 1.</p>' // Nueva ruta
};

// Renderiza la vista correspondiente a la ruta actual
const render = route => {
  app.innerHTML = routes[route] ? routes[route]() : '<h1>404</h1><p>No existe esta pagina :(, lamentablemente conociste el famosisimo error 404 .</p>';
};

// Cambia la ruta usando history.pushState y renderiza la nueva vista
const navigate = route => {
  window.history.pushState({}, '', route);
  render(route);
};

// Maneja los clics en la navegación para cambiar de vista sin recargar
document.querySelector('nav').addEventListener('click', e => {
  if (e.target.matches('button[data-route]')) {
    navigate(e.target.dataset.route);
  }
});

// Maneja el evento popstate para soportar navegación con los botones del navegador
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

// Render inicial según la ruta actual
render(window.location.pathname);