'use client';
import GoogleMap from '@/app/components/GoogleMap';
import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

export default function LocationsMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showStreetView, setShowStreetView] = useState(false);

  const locations = [
    {
      id: 1,
      name: 'Tregioia Creamery Alam Sutera',
      address: 'Ruko Element, Jl. Jalur Sutera No.03 kav 25BC no C, Pakualam, Serpong Utara, South Tangerang City, Banten 15320, Indonesia',
      lat: -6.231974831698893,
      lng: 106.6595527807486,
      phone: '+62 21 30030598',
      hours: 'Mon-Sun: 8am-9pm',
      streetViewPov: {
        heading: 300,
        pitch: 16,
        zoom: 0.2
      }
    },
    {
      id: 2,
      name: 'Tregioia Creamery @Hublife',
      address: 'Hublife Jakarta GroundFloor GF-26, RT.12/RW.1, South Tanjung Duren, Grogol petamburan, West Jakarta City, Jakarta 11470, Indonesia',
      lat: -6.180373047204275,
      lng: 106.79291915274551,
      phone: '+62 81 280016706',
      hours: 'Mon-Sun: 10am-10pm',
      streetViewPov: {
        heading: -120,
        pitch: 15,
        zoom: 0.1
      }
    },
    {
      id: 3,
      name: 'Tregioia Creamery @Citra8',
      address: 'Citra Garden City, Jl. Sunset Avenue Aeroworld Citra 8 kav K06A no 2, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830, Indonesia',
      lat: -6.121337856608559,
      lng: 106.69719580259202,
      phone: '+62 82 211500825',
      hours: 'Mon-Sun: 8pm-9:30pm',
      streetViewPov: {
        heading: 180,
        pitch: 10,
        zoom: 0.1
      }
    },
    {
      id: 4,
      name: 'Tregioia Creamery Futopia',
      address: 'Jl. Jalur Sutera Bar. No.Kav. 16, RT.002/RW.003, Panunggangan Tim., Kec. Pinang, Kota Tangerang, Banten 15143, Indonesia',
      lat: -6.221858590070169,
      lng: 106.65565591736782,
      phone: '+62 21 30030598',
      hours: 'Mon-Sun: 10am-10pm',
      streetViewPov: {
        heading: -75,
        pitch: 8,
        zoom: 0.1
      }
    },
    {
      id: 5,
      name: 'Tregioia Creamery @YOMS',
      address: 'Graha Emerald Premium, Jl. Gading Serpong Boulevard.5, Blok M5 No.6, Curug Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810, Indonesia',
      lat: -6.244191336514912,
      lng: 106.62877108650676,
      phone: '+62 81 11689667',
      hours: 'Mon-Sun: 9am-9pm',
      streetViewPov: {
        heading: 50,
        pitch: 10,
        zoom: 0.1
      }
    },
    {
      id: 6,
      name: 'Tregioia Creamery @Maggiore',
      address: 'Ruko Maggiore Square, Jl. Springs Boulevard No.Kav.58A, Cihuni, Kec. Pagedangan, Kabupaten Tangerang, Banten 15332, Indonesia',
      lat: -6.273161889383019,
      lng: 106.63747598428783,
      phone: '+62 822 9944 2818',
      hours: 'Mon-Sun: 8am-09:30pm',
      streetViewPov: {
        heading: 0,
        pitch: 10,
        zoom: 0.1
      }
    },
  ];

  const handleLocationClick = (id: number) => {
    setSelectedLocation(id === selectedLocation ? null : id);
    setShowStreetView(false);
  };
  
  const handleStreetViewClick = (e: React.MouseEvent) => { 
    e.stopPropagation();
    setShowStreetView(true);
  };

  const pageTitle = selectedLocation 
    ? locations.find(loc => loc.id === selectedLocation)?.name || "Our Locations" 
    : "Our Locations";

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 text-black">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-white">{pageTitle}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 sticky top-0 h-60 md:h-160">
          <GoogleMap 
            locations={locations} 
            selectedLocation={selectedLocation}
            showStreetView={showStreetView}
          />
        </div>
        
        <div className="w-full md:w-1/2 mt-8 md:mt-0 h-160 overflow-y-auto no-scrollbar p-1 pt-0">
          <div className="space-y-6">
            {locations.map(location => (
              <div 
                key={location.id} 
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ${selectedLocation === location.id ? 'ring-2 ring-pink-500' : 'hover:shadow-lg'}`}
                onClick={() => handleLocationClick(location.id)}
              >
                <h2 className="text-xl font-bold mb-3 inline-flex items-center"><MapPinIcon className="h-4 w-4 mr-1" /> {location.name}</h2>
                <p className="mb-2 text-gray-700">{location.address}</p>
                <p className="mb-2">
                  <span className="font-medium">Phone: </span>
                  <a href={`tel:${location.phone}`} className="text-blue-600 hover:underline">{location.phone}</a>
                </p>
                <p className="font-medium">Hours: <span className="font-normal">{location.hours}</span></p>
                {selectedLocation === location.id && (
                  <button 
                    className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition-colors"
                    onClick={handleStreetViewClick}
                  >
                    Show Street View
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}