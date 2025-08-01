// Ejercicio: pruebas unitarias con Jest

function suma(a, b) {
  return a + b;
}


// Implementación de la función totalCarrito
function totalCarrito(carrito) {
  return carrito.reduce((total, producto) => total + (producto.precio || 0), 0);
}


test('suma 2 + 2 es 4', () => {
  expect(suma(2, 2)).toBe(4);
});

test('suma -1 + 1 es 0', () => {
  expect(suma(-1, 1)).toBe(0);
});


// Tests para totalCarrito
test('totalCarrito de carrito vacío es 0', () => {
  expect(totalCarrito([])).toBe(0);
});

test('totalCarrito de un producto', () => {
  expect(totalCarrito([{ nombre: 'pan', precio: 10 }])).toBe(10);
});

test('totalCarrito de varios productos', () => {
  const carrito = [
    { nombre: 'pan', precio: 10 },
    { nombre: 'pepe', precio: 20 },
    { nombre: 'queso', precio: 30 }
  ];
  expect(totalCarrito(carrito)).toBe(60);
});

test('totalCarrito ignora productos sin precio', () => {
  const carrito = [
    { nombre: 'pan', precio: 10 },
    { nombre: 'gratis' },
    { nombre: 'leche', precio: 20 }
  ];
  expect(totalCarrito(carrito)).toBe(30);
});