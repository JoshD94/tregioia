"use client";
import GoogleMap from '@/app/components/GoogleMap';

export default function Locations() {
  const locations = [
    {
      id: 1,
      name: 'Tregioia Downtown',
      address: '123 Main Street, Anytown, USA',
      lat: 40.7128,
      lng: -74.0060,
      phone: '(555) 123-4567',
      hours: 'Mon-Sun: 11am-10pm'
    },
    {
      id: 2,
      name: 'Tregioia Westside',
      address: '456 West Avenue, Anytown, USA',
      lat: 40.7200,
      lng: -74.0300,
      phone: '(555) 987-6543',
      hours: 'Mon-Sun: 11am-9pm'
    },
    {
      id: 3,
      name: 'Tregioia Uptown',
      address: '789 North Street, Anytown, USA',
      lat: 40.7300,
      lng: -74.0100,
      phone: '(555) 456-7890',
      hours: 'Mon-Sun: 12pm-10pm'
    },
    {
      id: 4,
      name: 'Tregioia Eastside',
      address: '321 East Road, Anytown, USA',
      lat: 40.7250,
      lng: -73.9800,
      phone: '(555) 234-5678',
      hours: 'Mon-Sun: 11am-10pm'
    },
    {
      id: 5,
      name: 'Tregioia Southside',
      address: '654 South Boulevard, Anytown, USA',
      lat: 40.7050,
      lng: -74.0150,
      phone: '(555) 876-5432',
      hours: 'Mon-Sun: 12pm-9pm'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <h1 className="text-4xl font-bold text-center mb-12">Our Locations</h1>
      
      <div className="mb-12">
        <GoogleMap locations={locations} />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map(location => (
          <div key={location.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">{location.name}</h2>
            <p className="mb-2">{location.address}</p>
            <p className="mb-2">{location.phone}</p>
            <p className="font-medium">{location.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}