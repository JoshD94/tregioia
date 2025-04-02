"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Tregioia Creamery Logo" 
              width={60} 
              height={60} 
              className="mr-2 sm:mr-3 sm:w-[70px] sm:h-[70px]"
            />
            <Link href="/" className="text-xl sm:text-2xl font-bold text-black">
              Tregioia Creamery
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 focus:outline-none text-black"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="hover:text-pink-600 transition-colors font-medium text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/flavors" className="hover:text-pink-600 transition-colors font-medium text-black">
                  Flavors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pink-600 transition-colors font-medium text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-pink-600 transition-colors font-medium text-black">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600 transition-colors font-medium text-black">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="block hover:text-pink-600 transition-colors font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/flavors" 
                  className="block hover:text-pink-600 transition-colors font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Flavors
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block hover:text-pink-600 transition-colors font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations" 
                  className="block hover:text-pink-600 transition-colors font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block hover:text-pink-600 transition-colors font-medium text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}