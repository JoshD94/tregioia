import Image from 'next/image';

interface Product {
  name: string;
  description: string;
  image: string;
}

interface OtherProductsProps {
  title?: string;
  backgroundColor?: string;
}

export default function OtherProducts({ title = "Everything Else We Offer", backgroundColor = "bg-pink-50" }: OtherProductsProps) {
  const products: Product[] = [
    {
      name: 'Breakfast specials',
      description: 'Hot coffee and pastries to start your day',
      image: '/images/prod1.jpg'
    },
    {
      name: 'Handmade waffles',
      description: 'Perfect match with our ice cream',
      image: '/images/prod2.jpg'
    },
    {
      name: 'Seasonal Hampers',
      description: 'A gift for your friends and loved ones',
      image: '/images/prod3.jpg'
    },
    {
      name: 'Ice Cream Cakes',
      description: 'Custom made for any occasion',
      image: '/images/prod4.jpg'
    }
  ];

  return (
    <section className={`py-10 sm:py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 text-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg">
              <div className="relative h-40 sm:h-48">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{product.name}</h3>
                <p className="text-black text-sm sm:text-base">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}