import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Tregioia Creamery | Natural Ice Cream Jakarta',
  description: 'Contact Tregioia Creamery for questions, special orders, or natural ice cream catering. Phone contact and online form available for the best service.',
  keywords: [
    'contact tregioia creamery',
    'ice cream jakarta phone',
    'order ice cream tangerang',
    'gelato catering',
    'special ice cream orders',
    'contact tregioia',
    'ice cream customer service'
  ],
  openGraph: {
    title: 'Contact Tregioia Creamery - Get In Touch',
    description: 'Contact Tregioia Creamery for questions, special orders, or natural ice cream catering',
    images: ['/images/logo.png'],
  },
};

export default function Contact() {
  return <ContactForm />;
}