import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { Lora } from 'next/font/google';

const lora = Lora({ 
  subsets: ['latin'],
  // Optional: include specific weights
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Tregioia Creamery',
  description: 'Artisanal ice cream made with simple, natural ingredients',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
        <Footer />
      </body>
    </html>
  );
}