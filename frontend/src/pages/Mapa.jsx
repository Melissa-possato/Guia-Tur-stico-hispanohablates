import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 17);
  }, [center, map]);

  return null;
}

function Mapa() {
  const [posicao, setPosicao] = useState([-22.0056, -47.8977]);
  const [precisao, setPrecisao] = useState(0);
  const [busca, setBusca] = useState("");

  const lugares = [
    {
      nome: "USP São Carlos",
      categoria: "Universidade",
      descricao: "Campus histórico e importante centro científico.",
      posicao: [-22.00404552192482, -47.89849160294083]
    },
    {
      nome: "UFSCar",
      categoria: "Universidade",
      descricao: "Uma das universidades mais importantes do Brasil.",
      posicao: [-21.983, -47.88]
    },
    {
      nome: "SESC São Carlos",
      categoria: "Cultura",
      descricao: "Espaço com shows, exposições e eventos.",
      posicao: [-22.01668311212401, -47.905964218650375]
    },
    {
      nome: "Praça Coronel Salles",
      categoria: "Parque",
      descricao: "Praça central muito visitada.",
      posicao: [-22.015936410918915, -47.890597043787615]
    }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setPosicao([latitude, longitude]);
          setPrecisao(accuracy);
        },
        (error) => console.error("Erro ao localizar:", error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const buscarLocalizacaoAtual = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setPosicao([latitude, longitude]);
        setPrecisao(accuracy);
      },
      (error) => console.error("Erro:", error),
      { enableHighAccuracy: true }
    );
  };

  const buscarLugar = async () => {
    if (!busca) return;

    try {
      const resposta = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${busca}, São Carlos, SP`
      );

      const dados = await resposta.json();

      if (dados.length > 0) {
        const { lat, lon } = dados[0];
        setPosicao([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Lugar não encontrado.");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  };

  const lugaresFiltrados = lugares.filter((lugar) =>
    lugar.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mapa Interativo - São Carlos</h1>

      {/* Barra superior */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          type="text"
          placeholder="Buscar qualquer lugar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") buscarLugar();
          }}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px"
          }}
        />

        <button onClick={buscarLugar}>🔍 Buscar</button>

        <button onClick={buscarLocalizacaoAtual}>
          📍 Minha Localização
        </button>
      </div>

      {/* Categorias */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button>Todos</button>
        <button>Universidades</button>
        <button>Cultura</button>
        <button>Parques</button>
      </div>

      {/* Mapa */}
      <div
        style={{
          height: "60vh",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "20px"
        }}
      >
        <MapContainer
          center={posicao}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <ChangeView center={posicao} />

          <Marker position={posicao}>
            <Popup>Você está aqui / Lugar pesquisado 📍</Popup>
          </Marker>

          {lugaresFiltrados.map((lugar, index) => (
            <Marker key={index} position={lugar.posicao}>
              <Popup>
                <strong>{lugar.nome}</strong>
                <br />
                {lugar.descricao}
              </Popup>
            </Marker>
          ))}

          {precisao > 0 && (
            <Circle
              center={posicao}
              radius={Math.min(precisao, 200)}
              pathOptions={{
                fillColor: "#3388ff",
                color: "#3388ff",
                weight: 1,
                opacity: 0.5,
                fillOpacity: 0.15
              }}
            />
          )}
        </MapContainer>
      </div>

          {/* Cards fixos */}
      <h2>Lugares em destaque</h2>
      {lugares.map((lugar, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{lugar.nome}</h3>
          <p>
            <strong>Categoria:</strong> {lugar.categoria}
          </p>
          <p>{lugar.descricao}</p>
        </div>
      ))}

      <br />
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}

export default Mapa;


