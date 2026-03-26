import Products from '@/components/Products/Products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Produits',
  description: 'Découvrez notre sélection de miel pur, huile d\'argan bio et produits artisanaux marocains. Qualité premium et livraison rapide au Maroc.',
};

export default function ProductsPage() {
  return <Products />;
}
