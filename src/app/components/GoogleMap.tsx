import { useEffect, useRef, useState } from 'react';

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
    zoom: number;
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
      
      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
      });
      
      setMap(newMap);
      
      // Create street view panorama
      const panorama = new google.maps.StreetViewPanorama(mapRef.current, {
        visible: false,
        position: { lat: locations[0].lat, lng: locations[0].lng }
      });
      
      setStreetViewPanorama(panorama);
      newMap.setStreetView(panorama);
      
      // Add markers for each location
      markersRef.current = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
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
        
        infoWindowsRef.current.push(infoWindow);
        
        marker.addListener('click', () => {
          // Close all info windows first
          infoWindowsRef.current.forEach(iw => iw.close());
          // Open this info window
          infoWindow.open(newMap, marker);
        });
        
        return marker;
      });
      
      // Fit map to bounds of all markers
      newMap.fitBounds(bounds);
      
      // Adjust zoom if too close
      const listener = window.google.maps.event.addListener(newMap, "idle", () => {
        if (newMap.getZoom() > 16) newMap.setZoom(16);
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
  
  // Effect to handle selected location changes
  useEffect(() => {
    if (map && selectedLocation !== null) {
      // Find the selected location
      const location = locations.find(loc => loc.id === selectedLocation);
      
      if (location) {
        // Close all info windows
        infoWindowsRef.current.forEach(iw => iw.close());
        
        // Find the marker for this location
        const markerIndex = locations.findIndex(loc => loc.id === selectedLocation);
        if (markerIndex !== -1 && markersRef.current[markerIndex]) {
          const marker = markersRef.current[markerIndex];
          
          // Zoom to this location
          map.setZoom(18);
          map.panTo({ lat: location.lat, lng: location.lng });
          
          // Open the info window for this marker
          if (infoWindowsRef.current[markerIndex]) {
            infoWindowsRef.current[markerIndex].open(map, marker);
          }
        }
      }
    } else if (map) {
      // If no location is selected, fit to all markers
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      map.fitBounds(bounds);
      
      // Close all info windows
      infoWindowsRef.current.forEach(iw => iw.close());
      
      // Hide street view if it's visible
      if (streetViewPanorama && streetViewPanorama.getVisible()) {
        streetViewPanorama.setVisible(false);
      }
    }
  }, [selectedLocation, map, locations, streetViewPanorama]);
  
  // Effect to handle street view display when button is clicked
  useEffect(() => {
    if (map && streetViewPanorama && selectedLocation !== null && showStreetView) {
      const location = locations.find(loc => loc.id === selectedLocation);
      if (location) {
        // Check if Street View is available at this location
        const streetViewService = new google.maps.StreetViewService();
        streetViewService.getPanorama(
          { location: { lat: location.lat, lng: location.lng }, radius: 100 },
          (data, status) => {
            if (status === google.maps.StreetViewStatus.OK) {
              // Set panorama position and point of view
              streetViewPanorama.setPosition({ lat: location.lat, lng: location.lng });
              
              // Use location-specific POV if available
              if (location.streetViewPov) {
                streetViewPanorama.setPov({
                  heading: location.streetViewPov.heading,
                  pitch: location.streetViewPov.pitch,
                  zoom: location.streetViewPov.zoom || 1
                });
              } else {
                // Default POV
                streetViewPanorama.setPov({
                  heading: 34,
                  pitch: 10,
                  zoom: 1
                });
              }
              
              // Force panorama to be visible
              streetViewPanorama.setVisible(true);
              
              // Add a small delay to ensure the street view is shown
              setTimeout(() => {
                if (streetViewPanorama && !streetViewPanorama.getVisible()) {
                  streetViewPanorama.setVisible(true);
                }
              }, 300);
            } else {
              alert("Street View is not available at this location.");
            }
          }
        );
      }
    } else if (streetViewPanorama && !showStreetView) {
      // Hide street view when showStreetView is set to false
      streetViewPanorama.setVisible(false);
    }
  }, [selectedLocation, map, streetViewPanorama, locations, showStreetView]);

  return (
    <div className="relative h-full">
      <div 
        ref={mapRef} 
        className="w-full h-160 rounded-lg shadow-md"
      >
        {/* Map will be rendered here */}
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading map...
        </div>
      </div>
      
      {streetViewPanorama && streetViewPanorama.getVisible && streetViewPanorama.getVisible() && (
        <button
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded shadow z-10 border border-pink-500"
          onClick={() => {
            if (streetViewPanorama) {
              streetViewPanorama.setVisible(false);
            }
          }}
        >
          Exit Street View
        </button>
      )}
    </div>
  );
}

// Add TypeScript declaration for window.initMap and window.google
declare global {
  interface Window {
    initMap?: () => void;
    google: typeof google;
  }
}

// Google Maps types
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setZoom(zoom: number): void;
    getZoom(): number;
    setCenter(latLng: LatLng | LatLngLiteral): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
    setStreetView(panorama: StreetViewPanorama): void;
  }

  interface StreetViewPov {
    heading: number;
    pitch: number;
    zoom?: number;
  }

  class StreetViewPanorama {
    constructor(container: Element, opts?: StreetViewPanoramaOptions);
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    setPov(pov: StreetViewPov): void;
  }

  class StreetViewService {
    getPanorama(request: StreetViewLocationRequest, callback: (data: StreetViewPanoramaData, status: StreetViewStatus) => void): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    addListener(eventName: string, handler: Function): MapsEventListener;
    setMap(map: Map | null): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: MVCObject): void;
    close(): void;
  }

  class LatLngBounds {
    constructor();
    extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
  }

  class LatLng {
    constructor(lat: number, lng: number);
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  interface MapOptions {
    zoom?: number;
    center?: LatLng | LatLngLiteral;
    mapTypeId?: string;
    streetViewControl?: boolean;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    animation?: any;
  }

  interface InfoWindowOptions {
    content?: string | Element;
  }

  interface StreetViewPanoramaOptions {
    position?: LatLng | LatLngLiteral;
    visible?: boolean;
  }

  interface StreetViewLocationRequest {
    location?: LatLng | LatLngLiteral;
    radius?: number;
  }

  interface StreetViewPanoramaData {
    location?: StreetViewLocation;
  }

  interface StreetViewLocation {
    latLng?: LatLng;
    pano?: string;
  }

  interface MapsEventListener {
    remove(): void;
  }

  interface MVCObject {}

  const event: {
    addListener(instance: Object, eventName: string, handler: Function): MapsEventListener;
    removeListener(listener: MapsEventListener): void;
  };

  enum StreetViewStatus {
    OK = 'OK',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    ZERO_RESULTS = 'ZERO_RESULTS'
  }

  enum MapTypeId {
    ROADMAP = 'roadmap',
    SATELLITE = 'satellite',
    HYBRID = 'hybrid',
    TERRAIN = 'terrain'
  }

  enum Animation {
    BOUNCE = 1,
    DROP = 2
  }
}