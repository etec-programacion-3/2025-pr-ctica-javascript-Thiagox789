import dayjs from 'dayjs';

const now = dayjs().format('dddd, D [de] MMMM [de] YYYY - HH:mm:ss');
document.body.innerHTML = `<h1>Ejercicio Resuelto</h1><p>La fecha y hora actual es:</p><p><strong>${now}</strong></p>`;

