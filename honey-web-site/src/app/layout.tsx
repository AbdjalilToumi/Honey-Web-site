import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Ifrane Miel',
  description: 'Miel naturel et produits artisanaux du Maroc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' className={`${playfair.variable} ${lato.variable} h-full`} >
      <body className='min-h-full flex flex-col box-border font-[var(--font-lato)]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
