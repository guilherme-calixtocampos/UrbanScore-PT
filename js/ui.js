import api from './api.js';

const ui = {
  async renderLatLon() {
    try {
      // 1️⃣ pega o valor do input
      const enderecoInput = document.querySelector('#infoInserida').value;

      // 2️⃣ chama a API passando o endereço
      const latLon = await api.buscaLatLon(enderecoInput);

      // 3️⃣ seleciona a div onde vai exibir os resultados
      const exibeResultado = document.querySelector('.exibeResultado');
      exibeResultado.innerHTML = '';

      // 4️⃣ exibe o resultado
      if (latLon && latLon.length > 0) {
        exibeResultado.innerHTML = `
          <p><strong>Latitude:</strong> ${latLon[0].lat}</p>
          <p><strong>Longitude:</strong> ${latLon[0].lon}</p>
          <p><strong>Nome:</strong> ${latLon[0].display_name}</p>
        `;
        console.log(latLon)
      } else {
        exibeResultado.innerHTML = '<p>Endereço não encontrado.</p>';
      }

      exibeResultado.classList.remove('hidden');

    } catch (error) {
      console.error('Erro ao renderizar latitude e longitude', error);
    }
  }
}

export default ui;