import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { UseLocation } from "../hooks/uselocation";
import { HaversineDistance } from "../context/haversine";

// Garante que o Pin de localização esteja presente
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export const GeolocationPage = () => {
  const location = UseLocation();

  if (!location) {
    return <div>A carregar coordenadas...</div>;
  }

  return (
    <div className=" rounded-xl shadow-lg p-4 w-full max-w-xl">
      <h1 className="text-blue-900 font-bold mb-2">Minhas coordenadas</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "320px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>Você está aqui!</Popup>
        </Marker>
      </MapContainer>
      <div>
        Distância exemplo:{" "}
        {HaversineDistance(
          -25.8572288,
          32.620544,
          -18.8572288,
          28.620544
        ).toFixed(2)}{" "}
        km
      </div>
    </div>
  );
};