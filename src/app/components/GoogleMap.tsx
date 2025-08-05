import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  streetViewPov?: {
    heading: number;
    pitch: number;
    zoom?: number;  // Made zoom optional to match StreetViewPov type
  };
}

interface GoogleMapProps {
  locations: Location[];
  selectedLocation: number | null;
  showStreetView?: boolean;
}

export default function GoogleMap({ locations, selectedLocation, showStreetView = false }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [streetViewPanorama, setStreetViewPanorama] = useState<google.maps.StreetViewPanorama | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);
  const loaderRef = useRef<Loader | null>(null);

  useEffect(() => {
    if (!loaderRef.current) {
      loaderRef.current = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places', 'streetView'],
      });
    }

    const loadMap = async () => {
      try {
        await loaderRef.current?.load();
        initializeMap();
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });

      const newMap = new google.maps.Map(mapRef.current, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: bounds.getCenter(),
        zoom: 11
      });

      setMap(newMap);

      const panorama = new google.maps.StreetViewPanorama(mapRef.current, {
        visible: false,
        position: locations[0] ? { lat: locations[0].lat, lng: locations[0].lng } : { lat: 0, lng: 0 }
      });

      setStreetViewPanorama(panorama);
      newMap.setStreetView(panorama);

      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current = [];

      locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="max-width: 250px; padding: 10px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
              <p style="margin-bottom: 5px;">${location.address}</p>
              <p style="margin-bottom: 5px;"><strong>Phone:</strong> ${location.phone}</p>
              <p style="margin-bottom: 0;"><strong>Hours:</strong> ${location.hours}</p>
            </div>
          `,
        });

        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);

        marker.addListener('click', () => {
          infoWindowsRef.current.forEach(iw => iw.close());
          infoWindow.open(newMap, marker);
        });
      });

      newMap.fitBounds(bounds);
      const listener = google.maps.event.addListener(newMap, "idle", () => {
        const currentZoom = newMap.getZoom();
        if (currentZoom && currentZoom > 16) {  // Added null check for zoom
          newMap.setZoom(16);
        }
        google.maps.event.removeListener(listener);
      });
    };

    loadMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current = [];
    };
  }, [locations]);

  useEffect(() => {
    if (!map || selectedLocation === null) return;

    const location = locations.find(loc => loc.id === selectedLocation);
    if (!location) return;

    const markerIndex = locations.findIndex(loc => loc.id === selectedLocation);
    if (markerIndex === -1 || !markersRef.current[markerIndex]) return;

    const marker = markersRef.current[markerIndex];
    infoWindowsRef.current.forEach(iw => iw.close());
    
    map.setZoom(18);
    map.panTo({ lat: location.lat, lng: location.lng });
    infoWindowsRef.current[markerIndex].open(map, marker);

    if (!showStreetView && streetViewPanorama?.getVisible()) {
      streetViewPanorama.setVisible(false);
    }
  }, [selectedLocation, map, locations, streetViewPanorama, showStreetView]);

  useEffect(() => {
    if (!map || !streetViewPanorama || selectedLocation === null || !showStreetView) {
      if (streetViewPanorama?.getVisible()) {
        streetViewPanorama.setVisible(false);
      }
      return;
    }

    const location = locations.find(loc => loc.id === selectedLocation);
    if (!location) return;

    const streetViewService = new google.maps.StreetViewService();
    streetViewService.getPanorama(
      { location: { lat: location.lat, lng: location.lng }, radius: 100 },
      (data, status) => {
        if (status !== google.maps.StreetViewStatus.OK) {
          alert("Street View is not available at this location.");
          return;
        }

        streetViewPanorama.setPosition({ lat: location.lat, lng: location.lng });
        
        // Fixed StreetViewPov type issue
        const pov: google.maps.StreetViewPov = {
          heading: location.streetViewPov?.heading || 34,
          pitch: location.streetViewPov?.pitch || 10
        };
        
        streetViewPanorama.setPov(pov);
        streetViewPanorama.setVisible(true);
      }
    );
  }, [selectedLocation, map, streetViewPanorama, locations, showStreetView]);

  return (
    <div className="relative h-full">
      <div 
        ref={mapRef} 
        className="w-full h-70 md:h-160 rounded-lg shadow-md"
      >
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading map...
        </div>
      </div>
      
      {streetViewPanorama?.getVisible() && (
        <button
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded shadow z-10 border border-pink-500"
          onClick={() => streetViewPanorama?.setVisible(false)}
        >
          Exit Street View
        </button>
      )}
    </div>
  );
}