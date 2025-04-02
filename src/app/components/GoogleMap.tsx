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
    // Load Google Maps API
    const loadGoogleMapsScript = () => {
      // Check if the script is already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        // Define the callback function
        window.initMap = initializeMap;
      } else {
        initializeMap();
      }
    };
    
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;
      
      // Calculate center point based on locations
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      
      // Add markers for each location
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          animation: window.google.maps.Animation.DROP
        });
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 250px; padding: 10px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
              <p style="margin-bottom: 5px;">${location.address}</p>
              <p style="margin-bottom: 5px;"><strong>Phone:</strong> ${location.phone}</p>
              <p style="margin-bottom: 0;"><strong>Hours:</strong> ${location.hours}</p>
            </div>
          `,
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
      
      // Fit map to bounds of all markers
      map.fitBounds(bounds);
      
      // Adjust zoom if too close
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 16) map.setZoom(16);
        window.google.maps.event.removeListener(listener);
      });
    };
    
    // Add global initMap function to window
    window.initMap = initializeMap;
    
    // Load the script
    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      // Remove global callback when component unmounts
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [locations]);
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg shadow-md"
    >
      {/* Map will be rendered here */}
      <div className="flex items-center justify-center h-full text-gray-500">
        Loading map...
      </div>
    </div>
  );
}

// Add TypeScript declaration for window.initMap and window.google
declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}