import type { Metadata } from 'next';
import LocationsMap from './LocationsMap';

export const metadata: Metadata = {
  title: 'Lokasi Toko - Tregioia Creamery | 6 Cabang Jakarta & Tangerang',
  description: 'Temukan 6 lokasi Tregioia Creamery: Alam Sutera, Hublife Jakarta, Citra8, Futopia, YOMS Serpong, Maggiore Square. Es krim alami terbaik dekat Anda di Jakarta & Tangerang.',
  keywords: [
    'lokasi tregioia creamery',
    'alamat es krim jakarta',
    'toko gelato tangerang',
    'alam sutera ice cream',
    'hublife jakarta gelato',
    'citra8 es krim',
    'futopia tangerang',
    'yoms serpong ice cream',
    'maggiore square ice cream',
    'pagedangan tangerang gelato',
    'alamat lengkap tregioia'
  ],
  openGraph: {
    title: 'Lokasi Toko Tregioia Creamery - 6 Cabang Jakarta & Tangerang',  
    description: '6 lokasi Tregioia Creamery di Jakarta & Tangerang: Alam Sutera, Hublife, Citra8, Futopia, YOMS Serpong, Maggiore Square',
    images: ['/images/shop1.jpg'],
  },
};

export default function Locations() {
  return <LocationsMap />;
}