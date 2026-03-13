import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Popup } from "react-leaflet";


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const iconMercado = "https://cdn-icons-png.flaticon.com/512/3081/3081840.png";
const iconHospital = "https://cdn-icons-png.flaticon.com/512/3063/3063176.png";
const iconPadrao = "https://cdn-icons-png.flaticon.com/512/447/447031.png";
const iconUniversity = "https://cdn-icons-png.flaticon.com/512/2231/2231533.png"; 
const iconPolice = "https://cdn-icons-png.flaticon.com/512/2563/2563351.png";     
const iconChurch = "https://cdn-icons-png.flaticon.com/512/1160/1160351.png";     

// Função para criar o ícone do Leaflet dinamicamente
const criarIcone = (url) => L.icon({
  iconUrl: url,
  iconSize: [35, 35], // Tamanho do ícone
  iconAnchor: [17, 35], // Ponto do ícone que ficará sobre a coordenada
  popupAnchor: [0, -35] // Onde o popup abrirá em relação ao ícone
});

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

//Controle de Mapa
function Localizador({ posicao }) {
  const map = useMap();

  const irParaLocalizacao = () => {
    map.flyTo(posicao, 17, {
      duration: 1.5 // segundos
    });
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
      <button 
        onClick={irParaLocalizacao}
        style={{
          padding: '10px 15px',
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}
      >
        📍 Centralizar em mim
      </button>
    </div>
  );
}

function Mapa() {
  const [posicao, setPosicao] = useState([-22.0056, -47.8977]);
  const [precisao, setPrecisao] = useState(0);

  const lugares = [
    { id: 1, nome: "USP câmpus 2", tipo: "universidade", lat: -22.006, lng: -47.898 },
    { id: 2, nome: "Hospital Municipal", tipo: "hospital", lat: -22.010, lng: -47.890 },
  ];

  // Objeto de mapeamento (Tipo -> Ícone)
  const iconesPorTipo = {
    mercado: criarIcone(iconMercado),
    hospital: criarIcone(iconHospital),
    universidade: criarIcone(iconUniversity),
    igreja: criarIcone(iconChurch),
    delegacia: criarIcone(iconPolice),
    default: criarIcone(iconPadrao)
  };
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosicao([latitude, longitude]);
        setPrecisao(accuracy);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ height: "80vh", width: "80vw", position: 'relative' }}> 
      <MapContainer 
        center={posicao} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {lugares.map((lugar) => (
        <Marker 
          key={lugar.id} 
          position={[lugar.lat, lugar.lng]} 
          icon={iconesPorTipo[lugar.tipo] || iconesPorTipo.default}
        >
          <Popup>{lugar.nome}</Popup>
        </Marker>
      ))}
        {/* Componente que contém o botão e a lógica de movimento */}
        <Localizador posicao={posicao} />
        
        <Marker position={posicao} />

        {precisao > 0 && (
          <Circle 
            center={posicao} 
            radius={precisao} 
            pathOptions={{ color: '#3388ff', fillColor: '#3388ff', fillOpacity: 0.2 }} 
          />
        )}
      </MapContainer>
      
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Precisão atual: <strong>{precisao.toFixed(1)} metros</strong>
        {precisao > 50 && " (Sinal de GPS fraco ou usando Wi-Fi/IP)"}
      </div>
    </div>
  );
}

export default Mapa;
