import type { Metadata } from 'next';
import LocationsMap from './LocationsMap';

export const metadata: Metadata = {
  title: 'Store Locations - Tregioia Creamery | 6 Branches Jakarta & Tangerang',
  description: 'Find our 6 Tregioia Creamery locations: Alam Sutera, Hublife Jakarta, Citra8, Futopia, YOMS Serpong, Maggiore Square. The best natural ice cream near you in Jakarta & Tangerang.',
  keywords: [
    'tregioia creamery locations',
    'ice cream jakarta address',
    'gelato store tangerang',
    'alam sutera ice cream',
    'hublife jakarta gelato',
    'citra8 ice cream',
    'futopia tangerang',
    'yoms serpong ice cream',
    'maggiore square ice cream',
    'pagedangan tangerang gelato',
    'tregioia complete address'
  ],
  openGraph: {
    title: 'Tregioia Creamery Store Locations - 6 Branches Jakarta & Tangerang',  
    description: '6 Tregioia Creamery locations in Jakarta & Tangerang: Alam Sutera, Hublife, Citra8, Futopia, YOMS Serpong, Maggiore Square',
    images: ['/images/shop1.jpg'],
  },
};

export default function Locations() {
  return <LocationsMap />;
}