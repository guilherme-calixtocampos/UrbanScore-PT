# 🌍 UrbanScore PT

Sistema web para análise inteligente de qualidade de bairros em Portugal com base em geolocalização e infraestrutura ao redor.

---

## 📌 Sobre o Projeto

O **UrbanScore PT** permite que o usuário pesquise um bairro ou freguesia em Portugal e receba:

- 📍 Localização no mapa
- 🏫 Escolas próximas
- 🏥 Hospitais próximos
- 👮 Esquadras de polícia
- 🛒 Supermercados
- ⭐ Score geral da região

O objetivo é fornecer uma visão clara da infraestrutura disponível em um raio definido ao redor da localização pesquisada.

---

## 🚀 Tecnologias Utilizadas

- JavaScript (ES Modules)
- HTML5
- CSS3
- Fetch API
- OpenStreetMap
- Nominatim API
- Overpass API
- Leaflet (renderização de mapa)

---


### 📦 Responsabilidades por Módulo

- **geocodeApi** → Converte endereço em latitude e longitude
- **placesApi** → Busca locais próximos dentro do raio informado
- **scoreService** → Calcula a pontuação da região
- **radiusCalculator** → Converte km para metros
- **ui** → Responsável pela renderização na interface
- **main** → Orquestra o fluxo completo da aplicação

---

## 🧠 Como Funciona

1. O usuário informa um bairro ou freguesia.
2. O sistema converte o endereço em coordenadas via Nominatim.
3. Busca pontos de interesse próximos via Overpass.
4. Calcula um score baseado na infraestrutura encontrada.
5. Renderiza o resultado no mapa utilizando Leaflet.

---

## 📊 Lógica de Score (Exemplo)

A pontuação é calculada considerando categorias como:

- Educação
- Saúde
- Segurança
- Comércio

Cada categoria possui um peso específico no cálculo final.

Exemplo simplificado:

```js
score =
  (schools * 0.3) +
  (hospitals * 0.3) +
  (police * 0.4)
