const api = {
    async buscaLatLon(endereco) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Erro ao buscar latitude e longitude do endereço')
        }
    }
}

export default api;