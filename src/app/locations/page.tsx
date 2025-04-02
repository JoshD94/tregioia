"use client";
import GoogleMap from '@/app/components/GoogleMap';
import { useState } from 'react';

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const locations = [
    {
      id: 1,
      name: 'Tregioia Creamery Alam Sutera',
      address: 'Ruko Element, Jl. Jalur Sutera No.03 kav 25BC no C, Pakualam, Serpong Utara, South Tangerang City, Banten 15320, Indonesia',
      lat: -6.231974831698893,
      lng: 106.6595527807486,
      phone: '+62 21 30030598',
      hours: 'Mon-Sun: 8am-9pm'
    },
    {
      id: 2,
      name: 'Tregioia Creamery @Hublife',
      address: 'Hublife Jakarta GroundFloor GF-26, RT.12/RW.1, South Tanjung Duren, Grogol petamburan, West Jakarta City, Jakarta 11470, Indonesia',
      lat: -6.179926013127432,
      lng: 106.79200467776104,
      phone: '+62 81 280016706',
      hours: 'Mon-Sun: 10am-10pm'
    },
    {
      id: 3,
      name: 'Tregioia Creamery @Citra8',
      address: 'Citra Garden City, Jl. Sunset Avenue Aeroworld Citra 8 kav K06A no 2, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830, Indonesia',
      lat: -6.121337856608559,
      lng: 106.69719580259202,
      phone: '+62 82 211500825',
      hours: 'Mon-Sun: 8pm-9:30pm'
    },
    {
      id: 4,
      name: 'Tregioia Creamery Futopia',
      address: 'Jl. Jalur Sutera Bar. No.Kav. 16, RT.002/RW.003, Panunggangan Tim., Kec. Pinang, Kota Tangerang, Banten 15143, Indonesia',
      lat: -6.221670082388968,
      lng: 106.65413299463836,
      phone: '+62 21 30030598',
      hours: 'Mon-Sun: 10am-10pm'
    },
    {
      id: 5,
      name: 'Tregioia Creamery @YOMS',
      address: 'Graha Emerald Premium, Jl. Gading Serpong Boulevard.5, Blok M5 No.6, Curug Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810, Indonesia',
      lat: -6.244191336514912,
      lng: 106.62877108650676,
      phone: '+62 81 11689667',
      hours: 'Mon-Sun: 9am-9pm'
    },
  ];

  const handleLocationClick = (id: number) => {
    setSelectedLocation(id === selectedLocation ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">Our Locations</h1>
      
      <div className="mb-12">
        <GoogleMap locations={locations} />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {locations.map(location => (
          <div 
            key={location.id} 
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ${selectedLocation === location.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
            onClick={() => handleLocationClick(location.id)}
          >
            <h2 className="text-xl font-bold mb-3">{location.name}</h2>
            <p className="mb-2 text-gray-700">{location.address}</p>
            <p className="mb-2">
              <span className="font-medium">Phone: </span>
              <a href={`tel:${location.phone}`} className="text-blue-600 hover:underline">{location.phone}</a>
            </p>
            <p className="font-medium">Hours: <span className="font-normal">{location.hours}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}