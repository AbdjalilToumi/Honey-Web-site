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
  metadataBase: new URL('https://ifranemiel.com'),
  title: {
    default: 'Ifrane Miel | Miel Naturel & Produits Artisanaux du Maroc',
    template: '%s | Ifrane Miel'
  },
  description: 'Découvrez l\'excellence du terroir marocain avec Ifrane Miel. Miel de Thym, Sidr, Euphorbe et soins naturels à base d\'huile d\'argan pure. Livraison partout au Maroc.',
  keywords: ['miel naturel', 'miel ifrane', 'miel maroc', 'huile argan bio', 'produits artisanaux', 'miel sidr maroc', 'miel de thym'],
  authors: [{ name: 'Ifrane Miel' }],
  creator: 'Ifrane Miel',
  publisher: 'Ifrane Miel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ifrane-miel.vercel.app',
    siteName: 'Ifrane Miel',
    title: 'Ifrane Miel | Le Meilleur du Terroir Marocain',
    description: 'Miel 100% pur et produits de soin naturels récoltés dans les montagnes d\'Ifrane.',
    images: [
      {
        url: '/Hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ifrane Miel - Miel Naturel du Maroc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ifrane Miel | Miel Naturel du Maroc',
    description: 'Miel 100% pur et soins naturels issus de l\'Atlas.',
    images: ['/Hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ifrane Miel',
    description: 'Miel naturel et produits artisanaux du Maroc.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ifrane',
      addressCountry: 'MA',
    },
    url: 'https://ifrane-miel.vercel.app',
  };

  return (
    <html lang='fr' className={`${playfair.variable} ${lato.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='min-h-full flex flex-col box-border font-[var(--font-lato)]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
