"use client";
import React from 'react';
import Image from 'next/image';

export default function Flavors() {
  const regularFlavors = [
    { 
      name: 'Vanilla Bean', 
      description: 'Rich and creamy vanilla made with real Madagascar vanilla beans',
      image: '/images/img1.jpg',
    },
    { 
      name: 'Chocolate Decadence', 
      description: 'Deep, dark chocolate made with premium cocoa',
      image: '/images/img2.jpg',
    },
    { 
      name: 'Strawberry Fields', 
      description: 'Sweet strawberry ice cream with chunks of fresh strawberries',
      image: '/images/img3.jpg',
    },
    { 
      name: 'Mint Chocolate Chip', 
      description: 'Cool mint ice cream with chocolate chips throughout',
      image: '/images/img4.jpg',
    },
    { 
      name: 'Cookies & Cream', 
      description: 'Vanilla ice cream with chunks of chocolate cookies',
      image: '/images/img5.jpg',
    },
    { 
      name: 'Salted Caramel', 
      description: 'Sweet caramel ice cream with a hint of sea salt',
      image: '/images/img6.jpg',
    }
  ];

  const seasonalFlavors = [
    { 
      name: 'Strawberry Basil', 
      description: 'Sweet strawberries with fresh basil from our garden',
      image: '/images/img7.jpg',
    },
    { 
      name: 'Lavender Honey', 
      description: 'Fragrant lavender with local wildflower honey',
      image: '/images/img8.jpg',
    },
    { 
      name: 'Peach Cobbler', 
      description: 'Fresh summer peaches with buttery cobbler pieces',
      image: '/images/img9.jpg',
    },
    { 
      name: 'Maple Walnut', 
      description: 'Pure maple syrup with toasted walnuts',
      image: '/images/img10.jpg',
    },
    { 
      name: 'Pumpkin Spice', 
      description: 'Creamy pumpkin with warming fall spices',
      image: '/images/img11.jpg',
    },
    { 
      name: 'Peppermint Bark', 
      description: 'Cool peppermint with chocolate pieces',
      image: '/images/img12.jpg',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Ice Cream Flavors</h1>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Signature Flavors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularFlavors.map((flavor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-72 relative">
                <Image 
                  src={flavor.image} 
                  alt={flavor.name}
                  fill
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-black">{flavor.name}</h2>
                <p className="text-black">{flavor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-bold mb-8">Seasonal Specials</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seasonalFlavors.map((flavor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-72 relative">
                <Image 
                  src={flavor.image} 
                  alt={flavor.name}
                  fill
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-black">{flavor.name}</h2>
                <p className="text-black">{flavor.description}</p>
                <div className="mt-3">
                  <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                    Limited Time
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}