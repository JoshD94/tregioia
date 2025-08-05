"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FlavorSlider from './components/FlavorSlider';
import OtherProducts from './components/OtherProducts';

export default function Home() {

  return (
    <div>
      {/* Hero section with big ice cream picture */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full">
        <Image 
          src="/images/img10.jpg" 
          alt="Premium natural ice cream Tregioia Creamery Jakarta Tangerang - artisanal gelato without artificial preservatives"
          fill
          priority
          sizes="100vw"
          style={{objectFit: 'cover'}}
          className="brightness-[0.85]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 sm:mb-4 drop-shadow-lg">
            Tregioia Creamery
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-4 sm:mb-8 drop-shadow-md">
            Premium natural ice cream made with love since 2008
          </p>
          <Link 
            href="/flavors" 
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm sm:text-base py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors"
          >
            Explore Our Flavors
          </Link>
        </div>
      </div>

      {/* About section */}
      <section className="py-10 sm:py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="md:w-1/2 text-black">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">What Tregioia Is All About</h2>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                Tregioia Creamery is inspired by our love for creating delicious, yet healthy food for everyone to enjoy. Our ice cream is crafted with pure and natural ingredients, without added food colorings, synthetic flavorings, emulsifiers, stabilizers or chemical preservatives. Just sugar, milk, cream, and fruits of nature.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                Our fruit purees are produced in-house from market-bought fruits, selected for good ripeness and quality. Natural cocoa, ground vanilla beans, and real vanilla bean extracts are used for flavoring our ice cream. Oven-roasted nuts, home-made baked cakes and brownies, and freshly-brewed coffee are some of the other ingredients we use.
              </p>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                Have a scoop today and spread the joy! Visit our 6 locations across Jakarta and Tangerang.
              </p>
              <Link 
                href="/about" 
                className="text-pink-600 hover:text-pink-800 font-medium transition-colors inline-flex items-center text-sm sm:text-base"
              >
                Learn more about our story
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2 relative h-64 sm:h-80 w-full md:h-96">
              <Image 
                src="/images/img14.jpg" 
                alt="Natural ice cream making process at Tregioia Creamery with premium quality ingredients" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{objectFit: 'cover', objectPosition: 'center 80%'}}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flavor slider section */}
      <section>
        <FlavorSlider />
      </section>

      {/* Other products section */}
      <OtherProducts />

      {/* Contact CTA */}
      <section className="py-10 sm:py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6">Want to Know More?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-5 sm:mb-8 max-w-2xl mx-auto">
            Have questions about our ice cream, locations, or want to place a special order? We&apos;d love to hear from you!
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-pink-600 hover:bg-gray-100 font-bold text-sm sm:text-base py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}