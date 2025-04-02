import { useEffect, useRef } from 'react';

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
}

interface GoogleMapProps {
  locations: Location[];
}

export default function GoogleMap({ locations }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be the actual implementation with the Google Maps API
    // You'll need to add the Google Maps script to your project and use your API key
    // For demonstration purposes, this is a placeholder
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of US
          zoom: 4,
        });
        
        locations.forEach(location => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
          });
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
                <p>${location.address}</p>
                <p>${location.phone}</p>
                <p>${location.hours}</p>
              </div>
            `,
          });
          
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      }
    };
    
    // In a real implementation, you would load the Google Maps script here
    loadGoogleMaps();
  }, [locations]);
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg shadow-md"
      style={{ background: '#f0f0f0' }}
    >
      {/* Map will be rendered here */}
      <div className="flex items-center justify-center h-full text-gray-500">
        Google Maps will be displayed here with all 5 locations
      </div>
    </div>
  );
}