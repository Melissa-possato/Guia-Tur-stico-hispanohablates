import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet"; // Adicionamos Circle
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

function Mapa() {
  const [posicao, setPosicao] = useState([-22.0056, -47.8977]);
  const [precisao, setPrecisao] = useState(0); // Estado para a margem de erro

  // Função para buscar a localização atual
  const localizarUsuario = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setPosicao([latitude, longitude]);
          setPrecisao(accuracy); // Salva a margem de erro em metros
        },
        (error) => console.error("Erro:", error),
        { enableHighAccuracy: true }
      );
    }
  };

  // Localiza automaticamente ao carregar a página pela primeira vez
  useEffect(() => {
    localizarUsuario();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      
      {/* Botão de Me Achar */}
      <button 
        onClick={localizarUsuario}
        style={{ cursor: "pointer", borderRadius: "8px", border: "none", backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}
      >
        📍 Me Achar
      </button>

      <div style={{ height: "80vh", width: "70vw", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}> 
        <MapContainer 
          center={posicao} 
          zoom={13} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <ChangeView center={posicao} />
          
          <Marker position={posicao} />

          {/* Círculo de Margem de Erro */}
          {precisao > 0 && (
          <Circle 
            center={posicao} 
            // Aqui dizemos: "use a precisão real, mas no máximo 100 metros"
            radius={Math.min(precisao, 200)} 
            pathOptions={{ 
              fillColor: '#3388ff', 
              color: '#3388ff', 
              weight: 1,       // Linha de borda mais fina
              opacity: 0.5, 
              fillOpacity: 0.15 
              }} 
            />
          )}
        </MapContainer>
      </div>
      <br />
       <Link to={"/"}>Voltar para a página inicial</Link>

    </div>
  );
}

export default Mapa;