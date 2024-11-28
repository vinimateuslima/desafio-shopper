import { useState, useEffect } from "react";

const Map = ({ origin, destination }) => {
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      origin &&
      destination &&
      origin.latitude &&
      origin.longitude &&
      destination.latitude &&
      destination.longitude
    ) {
      setIsLoading(false);
    }
  }, [origin, destination]);

  if (isLoading) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Map;
