"use client";
import React from 'react';
import Image from 'next/image';

export default function About() {
  const team = [
    {
      name: 'Winny Setiady',
      role: 'Founder & Master Ice Cream Maker',
      bio: 'Winny is the heart and soul of Tregioia Creamery, crafting each flavor with passion and expertise. With over 15 years of experience, she brings a unique blend of creativity and tradition to our ice cream.',
      image: '/images/winny.jpg'
    },
    {
      name: 'Antony Dirga',
      role: 'Co-founder',
      bio: 'Antony is the co-founder of Tregioia Creamery and has been instrumental in expanding the brand and ensuring that every scoop of ice cream meets our high standards.',
      image: '/images/antony.jpg'
    },
    {
      name: 'Joshua Dirga',
      role: 'Technology & Operations Manager',
      bio: 'Joshua ensures that our production processes are efficient and sustainable, while also overseeing our online presence and customer engagement.',
      image: '/images/josh.jpg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Tregioia Creamery</h1>
      
      {/* Our Story Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4 text-white">
              Tregioia Creamery began as a small family operation in 2008. What started as a hobby making ice cream for friends and family quickly grew into a passion project when Winny decided to share her delicious creations with the world.
            </p>
            <p className="text-lg mb-4 text-white">
              Drawing from her Italian heritage and family recipes, Winny created a collection of ice cream flavors that were both nostalgic and innovative. The response was overwhelming, and within a year, the first Tregioia Creamery shop opened its doors.
            </p>
            <p className="text-lg mb-4 text-white">
              Today, with five locations across the city, we remain committed to Winny&apos;s original vision: creating delicious, healthy ice cream using only the purest ingredients and traditional methods.
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 w-full md:h-96">
            <Image 
              src="/images/shop1.jpg" 
              alt="The original Tregioia Creamery shop" 
              fill
              style={{objectFit: 'cover'}}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="mb-16 bg-pink-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Quality Ingredients</h3>
            <p className="text-black">We source only the finest natural ingredients, from local dairy to organic fruits and premium flavors.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Traditional Methods</h3>
            <p className="text-black">We craft our ice cream in small batches using time-honored techniques that create the perfect texture and flavor.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Community Focus</h3>
            <p className="text-black">We&apos;re proud to be part of our local community, supporting neighborhood events and partnering with local businesses.</p>
          </div>
        </div>
      </section>
      
      {/* Meet the Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 relative">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-black">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-black">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}