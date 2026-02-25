const BASE_URL = window.location.origin; // pega http(s)://seudominio.onrender.com

const api = {
    async buscaLatLon(endereco) {
        try {
            const response = await fetch(`${BASE_URL}/api/nominatim?q=${encodeURIComponent(endereco)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar latitude e longitude do endereço', error);
            return [];
        }
    },

    async buscaPOIs(lat, lon, raio) {
        try {
            const response = await fetch(`${BASE_URL}/api/overpass?lat=${lat}&lon=${lon}&raio=${raio}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar POIs no backend:", error);
            return [];
        }
    }
};

export default api;