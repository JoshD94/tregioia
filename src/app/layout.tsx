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
  title: 'Tregioia Creamery',
  description: 'Artisanal ice cream made with simple, natural ingredients',
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
  return (
    <html lang="en">
      <body className={lora.className}>
        <Header />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}