import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // serve seu front-end

// Rota Nominatim
app.get("/api/nominatim", async (req, res) => {
  const endereco = req.query.q;
  try {
    console.log("Buscando endereço:", endereco);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`,
      { headers: { "User-Agent": "UrbanScore/1.0 (gcalixtocampos16@gmail.com)" } }
    );

    if (!response.ok) {
      console.error("Erro Nominatim:", response.status, response.statusText);
      return res.status(500).json({ error: "Erro ao buscar endereço (Nominatim)" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro Nominatim:", error);
    res.status(500).json({ error: "Erro ao buscar endereço" });
  }
});

// Rota Overpass
app.get("/api/overpass", async (req, res) => {
  const { lat, lon, raio } = req.query;

  if (!lat || !lon || !raio) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  const overpassQuery = `
    [out:json];
    (
      node(around:${raio},${lat},${lon})["amenity"="school"];
      node(around:${raio},${lat},${lon})["amenity"="hospital"];
      node(around:${raio},${lat},${lon})["amenity"="restaurant"];
      node(around:${raio},${lat},${lon})["amenity"="cafe"];
      node(around:${raio},${lat},${lon})["amenity"="bank"];
      node(around:${raio},${lat},${lon})["amenity"="supermarket"];
      node(around:${raio},${lat},${lon})["leisure"="park"];
    );
    out center;
  `;

  try {
    console.log("Consulta Overpass:", overpassQuery.trim());
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`,
      {
        headers: {
          "User-Agent": "UrbanScore/1.0 (gcalixtocampos16@gmail.com)",
          "Accept": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.error("Erro Overpass:", response.status, response.statusText);
      return res.status(500).json({ error: "Erro ao buscar POIs (Overpass)" });
    }

    const data = await response.json();
    res.json(data.elements || []);
  } catch (error) {
    console.error("Erro Overpass:", error);
    res.status(500).json({ error: "Erro ao buscar POIs" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});