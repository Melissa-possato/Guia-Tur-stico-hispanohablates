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

// --- Configuração de Ícones ---
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const universityIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1656/1656819.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const plazaIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/932/932063.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const leisureIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/932/932063.png',
  iconSize: [25, 25],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const iconMap = {
  university: universityIcon,
  plaza: plazaIcon,
  lounge: leisureIcon
};

L.Marker.prototype.options.icon = DefaultIcon;

// --- Componente para atualizar a visão do mapa ---
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
  const [filtro, setFiltro] = useState("Todos"); // Novo estado para filtros

  const lugares = [
    {
      nome: "USP São Carlos",
      categoria: "Universidade",
      descricao: "Campus histórico e importante centro científico.",
      posicao: [-22.00404552192482, -47.89849160294083],
      type: "university"
    },
    {
      nome: "UFSCar",
      categoria: "Universidade",
      descricao: "Uma das universidades mais importantes do Brasil.",
      posicao: [-21.983, -47.88],
      type: "university"
    },
    {
      nome: "SESC São Carlos",
      categoria: "Cultura",
      descricao: "Espaço com shows, exposições e eventos.",
      posicao: [-22.01668311212401, -47.905964218650375],
      type: "lounge",
    },
    {
      nome: "Praça Coronel Salles",
      categoria: "Parque",
      descricao: "Praça central muito visitada.",
      posicao: [-22.015936410918915, -47.890597043787615],
      type: "plaza",
    }
  ];

  // Lógica de filtragem (Busca + Botões de Categoria)
  const lugaresFiltrados = lugares.filter((lugar) => {
    const correspondeBusca = lugar.nome.toLowerCase().includes(busca.toLowerCase());
    const correspondeFiltro = filtro === "Todos" || lugar.categoria === filtro;
    return correspondeBusca && correspondeFiltro;
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setPosicao([latitude, longitude]);
          setPrecisao(accuracy);
        },
        (error) => console.error("Erro ao localizar:", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mapa Interativo - São Carlos</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar qualquer lugar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarLugar()}
          style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
        />
        <button onClick={buscarLugar}>🔍 Buscar</button>
        <button onClick={buscarLocalizacaoAtual}>📍 Minha Localização</button>
      </div>

      {/* Categorias com funcionalidade */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["Todos", "Universidade", "Cultura", "Parque"].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setFiltro(cat)}
            style={{ fontWeight: filtro === cat ? "bold" : "normal" }}
          >
            {cat === "Todos" ? "Todos" : cat + "s"}
          </button>
        ))}
      </div>

      <div style={{ height: "60vh", width: "100%", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
        <MapContainer center={posicao} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeView center={posicao} />

          {/* Marcador da sua posição ou busca atual */}
          <Marker position={posicao}>
            <Popup>Você está aqui / Lugar pesquisado 📍</Popup>
          </Marker>

          {/* Marcadores dos lugares salvos com ícones personalizados */}
          {lugaresFiltrados.map((lugar, index) => (
            <Marker 
              key={index} 
              position={lugar.posicao} 
              icon={iconMap[lugar.type] || DefaultIcon}
            >
              <Popup>
                <strong>{lugar.nome}</strong><br />
                {lugar.descricao}
              </Popup>
            </Marker>
          ))}

          {precisao > 0 && (
            <Circle 
              center={posicao} 
              radius={Math.min(precisao, 200)} 
              pathOptions={{ fillColor: "#3388ff", color: "#3388ff", weight: 1, opacity: 0.5, fillOpacity: 0.15 }} 
            />
          )}
        </MapContainer>
      </div>

      <h2>Lugares em destaque ({filtro})</h2>
      {lugaresFiltrados.map((lugar, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>
          <h3>{lugar.nome}</h3>
          <p><strong>Categoria:</strong> {lugar.categoria}</p>
          <p>{lugar.descricao}</p>
        </div>
      ))}

      <br />
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}

export default Mapa;