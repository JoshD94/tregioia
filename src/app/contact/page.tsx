import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Kontak Kami - Tregioia Creamery | Hubungi Es Krim Alami Jakarta',
  description: 'Hubungi Tregioia Creamery untuk pertanyaan, pesanan khusus, atau catering es krim alami. Kontak telepon dan form online tersedia untuk layanan terbaik.',
  keywords: [
    'kontak tregioia creamery',
    'telepon es krim jakarta',
    'pesan es krim tangerang',
    'catering gelato',
    'pesanan khusus ice cream',
    'hubungi tregioia',
    'customer service es krim'
  ],
  openGraph: {
    title: 'Kontak Tregioia Creamery - Hubungi Kami',
    description: 'Hubungi Tregioia Creamery untuk pertanyaan, pesanan khusus, atau catering es krim alami',
    images: ['/images/logo.png'],
  },
};

export default function Contact() {
  return <ContactForm />;
}