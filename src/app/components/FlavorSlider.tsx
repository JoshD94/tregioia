import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Flavor {
  id: number;
  name: string;
  description: string;
  image: string;
  seasonal: boolean;
}

export default function FlavorSlider() {
  const flavors: Flavor[] = [
    { 
      id: 1, 
      name: 'Strawberry Basil', 
      description: 'Sweet strawberries with fresh basil from our garden',
      image: '/images/img11.jpg',
      seasonal: true
    },
    { 
      id: 2, 
      name: 'Lavender Honey', 
      description: 'Fragrant lavender with local wildflower honey',
      image: '/images/img1.jpg',
      seasonal: true
    },
    { 
      id: 3, 
      name: 'Peach Cobbler', 
      description: 'Fresh summer peaches with buttery cobbler pieces',
      image: '/images/img16.jpg',
      seasonal: true
    },
    { 
      id: 4, 
      name: 'Maple Walnut', 
      description: 'Pure maple syrup with toasted walnuts',
      image: '/images/img14.jpg',
      seasonal: true
    },
    { 
      id: 5, 
      name: 'Pumpkin Spice', 
      description: 'Creamy pumpkin with warming fall spices',
      image: '/images/img12.jpg',
      seasonal: true
    },
    { 
      id: 6, 
      name: 'Peppermint Bark', 
      description: 'Cool peppermint with chocolate pieces',
      image: '/images/img17.jpg',
      seasonal: true
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive logic - detect if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Calculate how many items to show based on screen size
  const getItemsToShow = useCallback(() => {
    if (window.innerWidth < 640) return 1; // Small mobile
    if (window.innerWidth < 768) return 2; // Larger mobile/small tablet
    return 3; // Desktop
  }, []);

  // Dynamic itemsToShow based on screen size
  const [itemsToShow, setItemsToShow] = useState(3);
  
  useEffect(() => {
    const updateItemsToShow = () => {
      setItemsToShow(getItemsToShow());
    };
    
    // Initial check
    updateItemsToShow();
    
    // Add event listener for window resize
    window.addEventListener('resize', updateItemsToShow);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [getItemsToShow]);

  // Create copies of the first and last few items
  const visibleItems = [...flavors.slice(-itemsToShow), ...flavors, ...flavors.slice(0, itemsToShow)];
  
  // Reset position without animation when we've reached the clones
  useEffect(() => {
    if (!transitioning) return;
    
    const handleTransitionEnd = () => {
      setTransitioning(false);
      
      // When at the last clone, jump to the real first item
      if (currentIndex >= flavors.length) {
        sliderRef.current!.style.transition = 'none';
        setCurrentIndex(0);
        // Force a reflow
        // eslint-disable-next-line
        sliderRef.current!.offsetHeight;
        sliderRef.current!.style.transition = 'transform 500ms ease';
      }
      
      // When at the first clone, jump to the real last item
      if (currentIndex < 0) {
        sliderRef.current!.style.transition = 'none';
        setCurrentIndex(flavors.length - 1);
        // Force a reflow
        // eslint-disable-next-line
        sliderRef.current!.offsetHeight;
        sliderRef.current!.style.transition = 'transform 500ms ease';
      }
    };
    
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('transitionend', handleTransitionEnd);
      return () => slider.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentIndex, flavors.length, transitioning]);

  // Initialize slider position
  useEffect(() => {
    if (sliderRef.current) {
      // Position at the first real item (after clones)
      sliderRef.current.style.transform = getTransform();
    }
  }, []);

  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Calculate transform based on current index and screen size
  const getTransform = () => {
    // Calculate the item width based on how many items should be shown
    const itemWidthPercent = 100 / itemsToShow;
    const translateX = -(itemWidthPercent * (currentIndex + itemsToShow));
    return `translateX(${translateX}%)`;
  };

  // Calculate appropriate classes for the slider items based on screen size
  const getItemWidthClasses = () => {
    // Default to 1/3 width for desktop (3 items)
    if (itemsToShow === 3) return "w-1/3";
    // Half width for tablets (2 items)
    if (itemsToShow === 2) return "w-1/2";
    // Full width for mobile (1 item)
    return "w-full";
  };

  return (
    <div className="relative py-8 sm:py-12 bg-black text-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Seasonal Flavors</h2>
      
      <div className="flex items-center">
        <button 
          onClick={prevSlide} 
          className="text-white hover:text-pink-300 transition-colors p-2 focus:outline-none z-10"
          aria-label="Previous flavors"
          disabled={transitioning}
        >
          <FaChevronLeft size={20} className="sm:h-6 sm:w-6" />
        </button>
        
        <div className="overflow-hidden flex-grow mx-2 sm:mx-4">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: getTransform() }}
          >
            {visibleItems.map((flavor, index) => (
              <div 
                key={`${flavor.id}-${index}`} 
                className={`${getItemWidthClasses()} flex-shrink-0 px-1 sm:px-2`}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden text-black h-full">
                  <div className="relative h-48 sm:h-72">
                    <Image 
                      src={flavor.image} 
                      alt={flavor.name} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      style={{objectFit: 'cover'}}
                      priority={index < 3} // Prioritize loading first few images
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{flavor.name}</h3>
                    <p className="text-black text-xs sm:text-sm">{flavor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide} 
          className="text-white hover:text-pink-300 transition-colors p-2 focus:outline-none z-10"
          aria-label="Next flavors"
          disabled={transitioning}
        >
          <FaChevronRight size={20} className="sm:h-6 sm:w-6" />
        </button>
      </div>
      
      <div className="text-center mt-6 sm:mt-8">
        <Link 
          href="/flavors" 
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-5 sm:py-2 sm:px-6 rounded-full transition-colors inline-block text-sm sm:text-base"
        >
          See All Flavors
        </Link>
      </div>
    </div>
  );
}