import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { Lora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const lora = Lora({ 
  subsets: ['latin'],
  // Optional: include specific weights
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Tregioia Creamery - Natural Ice Cream Jakarta & Tangerang | Artisanal Gelato',
  description: 'Premium natural ice cream in Jakarta & Tangerang. Tregioia Creamery serves artisanal gelato made with pure ingredients, no artificial preservatives. 6 locations: Alam Sutera, Hublife, Citra8, Futopia, YOMS Serpong, Maggiore Square.',
  keywords: [
    'natural ice cream Jakarta',
    'artisanal gelato Jakarta',
    'premium ice cream Tangerang',
    'organic ice cream Jakarta',
    'handmade gelato Jakarta',
    'ice cream no preservatives',
    'gelato Alam Sutera',
    'ice cream Gading Serpong',
    'maggiore square ice cream',
    'natural ice cream Serpong',
    'es krim alami Jakarta',
    'gelato artisan Jakarta',
    'Tregioia Creamery'
  ],
  authors: [{ name: 'Tregioia Creamery' }],
  creator: 'Tregioia Creamery',
  publisher: 'Tregioia Creamery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tregioia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tregioia Creamery - Premium Natural Ice Cream Jakarta & Tangerang',
    description: 'Premium natural ice cream with no artificial preservatives. 6 locations in Jakarta & Tangerang: Alam Sutera, Hublife, Citra8, Futopia, YOMS Serpong, Maggiore Square.',
    url: 'https://tregioia.com',
    siteName: 'Tregioia Creamery',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/img10.jpg',
        width: 1200,
        height: 630,
        alt: 'Tregioia Creamery - Natural Ice Cream Jakarta Tangerang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tregioia Creamery - Natural Ice Cream Jakarta & Tangerang',
    description: 'Premium natural ice cream with no artificial preservatives in Jakarta & Tangerang',
    images: ['/images/img10.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16' },
      { url: '/images/favicon-32x32.png', sizes: '32x32' }
    ],
    apple: '/images/apple-touch-icon.png',
    shortcut: '/images/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tregioia Creamery",
    "description": "Premium natural ice cream with no artificial preservatives in Jakarta & Tangerang",
    "url": "https://tregioia.com",
    "logo": "https://tregioia.com/images/logo.png",
    "image": "https://tregioia.com/images/img10.jpg",
    "telephone": "+62 21 30030598",
    "priceRange": "$$",
    "servesCuisine": "Ice Cream",
    "foundingDate": "2008",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta",
      "addressLocality": "Jakarta"
    },
    "location": [
      {
        "@type": "Place",
        "name": "Tregioia Creamery Alam Sutera",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ruko Element, Jl. Jalur Sutera No.03 kav 25BC no C",
          "addressLocality": "South Tangerang",
          "addressRegion": "Banten",
          "postalCode": "15320",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.231974831698893,
          "longitude": 106.6595527807486
        },
        "telephone": "+62 21 30030598"
      },
      {
        "@type": "Place", 
        "name": "Tregioia Creamery @Hublife",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hublife Jakarta GroundFloor GF-26, RT.12/RW.1",
          "addressLocality": "West Jakarta",
          "addressRegion": "Jakarta",
          "postalCode": "11470",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.180373047204275,
          "longitude": 106.79291915274551
        },
        "telephone": "+62 81 280016706"
      },
      {
        "@type": "Place", 
        "name": "Tregioia Creamery @Maggiore",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ruko Maggiore Square, Jl. Springs Boulevard No.Kav.58A",
          "addressLocality": "Pagedangan",
          "addressRegion": "Banten",
          "postalCode": "15332",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.273161889383019,
          "longitude": 106.63747598428783
        },
        "telephone": "+62 822 9944 2818"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/tregioia",
      "https://www.facebook.com/tregioia"
    ],
    "openingHours": "Mo-Su 08:00-21:00",
    "hasMenu": "https://tregioia.com/flavors",
    "acceptsReservations": true
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={lora.className}>
        <Header />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}