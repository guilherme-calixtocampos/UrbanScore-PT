import api from './api.js';

const ui = {
    async renderLatLon() {
        try {
            const enderecoInput = document.querySelector('#infoInserida').value;
            const raioInput = Number(document.querySelector('#escolhaDeRaio').value) * 1000;

            const latLon = await api.buscaLatLon(enderecoInput);

            const exibeResultado = document.querySelector('.exibeResultado');
            exibeResultado.innerHTML = '';

            if (latLon && latLon.length > 0) {
                const lat = latLon[0].lat;
                const lon = latLon[0].lon;

                exibeResultado.innerHTML = `
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lon}</p>
                    <p><strong>Nome:</strong> ${latLon[0].display_name}</p>
                    <h4 class="mt-4 font-bold">Pontos de Interesse (POIs):</h4>
                    <ul id="listaPOIs"></ul>
                `;

                const pois = await api.buscaPOIs(lat, lon, raioInput);

                const listaPOIs = document.querySelector('#listaPOIs');
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        const nome = poi.tags?.name || poi.tags?.amenity || 'Sem nome';
                        const tipo = poi.tags?.amenity || 'Desconhecido';
                        const rua = poi.tags?.['addr:street'] || 'Rua não disponível';
                        const numero = poi.tags?.['addr:housenumber'] || 'Número não disponível';
                        listaPOIs.innerHTML += `<li>
                            <strong>${nome}</strong> - ${tipo}<br>
                            Endereço: ${rua}, ${numero}
                        </li>`;
                    });
                } else {
                    listaPOIs.innerHTML = '<li>Nenhum POI encontrado neste raio.</li>';
                }
            } else {
                exibeResultado.innerHTML = '<p>Endereço não encontrado.</p>';
            }

            exibeResultado.classList.remove('hidden');

        } catch (error) {
            console.error('Erro ao renderizar latitude e longitude', error);
        }
    }
};

export default ui;