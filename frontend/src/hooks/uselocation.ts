import { useEffect, useState } from "react";

export const UseLocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    //pega as coordenadas actuais do usuário ao renderizar o componente
    navigator.geolocation.watchPosition(
      (position) => setLocation(position.coords),
      (error) => console.log("Ocorreu um erro ao obter coordenadas", error),
      { enableHighAccuracy: true }
    );
  }, [location]);

  //retorna essa localização
  return location;
}