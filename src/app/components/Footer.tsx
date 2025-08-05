import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-pink-300 text-white pt-8 pb-4 sm:pt-12 sm:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Tregioia Creamery</h3>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">Artisanal ice cream made with simple, natural ingredients since 2008.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-pink-200" aria-label="Facebook">
                <FaFacebook size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/tregioiacreamery/" className="text-white hover:text-pink-200" aria-label="Instagram">
                <FaInstagram size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-pink-200" aria-label="Twitter">
                <FaTwitter size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:block sm:space-y-2 text-sm sm:text-base">
              <li className="mb-2 sm:mb-0">
                <Link href="/flavors" className="hover:text-pink-200 transition-colors">
                  Our Flavors
                </Link>
              </li>
              <li className="mb-2 sm:mb-0">
                <Link href="/locations" className="hover:text-pink-200 transition-colors">
                  Store Locations
                </Link>
              </li>
              <li className="mb-2 sm:mb-0">
                <Link href="/about" className="hover:text-pink-200 transition-colors">
                  Our Story
                </Link>
              </li>
              <li className="mb-2 sm:mb-0">
                <Link href="/contact" className="hover:text-pink-200 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Info</h3>
            <address className="not-italic text-sm sm:text-base">
              <p className="mb-2">Ruko Element, Jl. Jalur Sutera No.03 kav 25BC no C</p>
              <p className="mb-2">Pakualam, Serpong Utara</p>
              <p className="mb-2">South Tangerang City, Banten 15320</p>
              <p className="mb-2">Phone: +62 21 30030598</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-pink-600 pt-4 sm:pt-6 text-center text-sm sm:text-base">
          <p>© {new Date().getFullYear()} Tregioia Creamery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}