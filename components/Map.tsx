'use client';

import { useEffect, useRef } from 'react';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // En Next.js, las variables NEXT_PUBLIC_* están disponibles en el cliente
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('Google Maps API key no encontrada');
      console.error('Asegúrate de tener NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local');
      console.error('Reinicia el servidor de desarrollo después de modificar .env.local');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
          gestureHandling: 'greedy', // Mejor para móvil - permite zoom con un dedo
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      className="w-full rounded-lg overflow-hidden"
      style={{ 
        height: 'clamp(300px, 50vh, 500px)',
        minHeight: '300px',
        width: '100%',
        touchAction: 'pan-x pan-y'
      }}
    />
  );
}
