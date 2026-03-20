import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Este componente é essencial para mover a "câmera" do mapa
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15); // Aumentamos o zoom para 15 para ver melhor a rua
  }, [center, map]);
  return null;
}

function Mapa() {
  // Iniciamos com um valor padrão (ex: São Carlos)
  const [posicao, setPosicao] = useState([-22.0056, -47.8977]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Localização encontrada:", latitude, longitude);
          setPosicao([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        },
        {
          enableHighAccuracy: true, // Tenta usar GPS em vez de apenas IP
          timeout: 10000,           // Espera até 10 segundos
          maximumAge: 0             // Não usa localização em cache
        }
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}> 
      <MapContainer 
        center={posicao} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        
        
        {/* ADICIONADO: O componente que força o mapa a se mover */}
        <ChangeView center={posicao} />
        
        <Marker position={posicao}></Marker>
      </MapContainer>
    </div>
  );
}

export default Mapa;