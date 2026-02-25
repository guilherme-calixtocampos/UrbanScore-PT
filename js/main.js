import ui from './ui.js';

const btnAnalise = document.querySelector('#btnAnalise');

btnAnalise.addEventListener('click', (e) => {
  e.preventDefault(); // evita que o form recarregue a página
  ui.renderLatLon();
});