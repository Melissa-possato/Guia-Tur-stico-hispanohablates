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
  const [filtro, setFiltro] = useState("Todos"); 

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
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const buscarLocalizacaoAtual = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
  
        console.log("Localização:", latitude, longitude);
  
        setPosicao([latitude, longitude]);
        setPrecisao(accuracy);
      },
      (error) => {
        console.error("Erro de geolocalização:", error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
      }
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
    <div className="mapa-bg">
  
      <div className="mapa-container">
  
        <div className="mapa-header">
          <h1>Mapa Interactivo</h1>
          <p>
            Explora São Carlos y encuentra universidades,
            cultura, parques y lugares importantes.
          </p>
        </div>

  
        <div className="busca-container">
  
          <input
            type="text"
            placeholder="Buscar cualquier lugar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarLugar()}
            className="input-busca"
          />
  
          <button onClick={buscarLugar} className="botao-busca">
            🔍 Buscar
          </button>
  
          <button
            onClick={buscarLocalizacaoAtual}
            className="botao-localizacao"
          >
            📍 Mi ubicación
          </button>
  
        </div>
  

  
        <div className="filtros-container">
  
          {["Todos", "Universidade", "Cultura", "Parque"].map((cat) => (
  
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`filtro-btn ${
                filtro === cat ? "ativo" : ""
              }`}
            >
              {cat === "Todos" ? "Todos" : cat + "s"}
            </button>
  
          ))}
  
        </div>
  

  
        <div className="mapa-wrapper">
  
          <MapContainer
            center={posicao}
            zoom={13}
            className="mapa-leaflet"
          >
  
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
            <ChangeView center={posicao} />
  
            <Marker position={posicao}>
              <Popup>
                Você está aqui / Lugar pesquisado 📍
              </Popup>
            </Marker>
  
            {lugaresFiltrados.map((lugar, index) => (
              <Marker
                key={index}
                position={lugar.posicao}
                icon={iconMap[lugar.type] || DefaultIcon}
              >
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
                  fillColor: "#22c55e",
                  color: "#22c55e",
                  weight: 1,
                  opacity: 0.5,
                  fillOpacity: 0.15
                }}
              />
            )}
  
          </MapContainer>
  
        </div>
  

  
        <h2 className="titulo-lugares">
          Lugares en destaque ({filtro})
        </h2>
  
        <div className="lugares-grid">
  
          {lugaresFiltrados.map((lugar, index) => (
  
            <div key={index} className="lugar-card">
  
              <h3>{lugar.nome}</h3>
  
              <span className="categoria">
                {lugar.categoria}
              </span>
  
              <p>{lugar.descricao}</p>
  
            </div>
  
          ))}
  
        </div>
  
        <Link to="/" className="botao-voltar">
          ← Volver al inicio
        </Link>
  
      </div>
  
    </div>
  );
}

export default Mapa;
