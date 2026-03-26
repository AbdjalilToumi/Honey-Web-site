'use client';
import { useCallback, useEffect, useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { Productsdata, ProductData } from '@/contexts/ProductsContext';
import { Cartegories } from '@/contexts/Category';
import { LangProvider } from '@/contexts/LangContext';
import { supabase } from '@/utils/supabase/client';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ComfirmOrder from '@/components/ComfirmOrder';
import Loading from '@/components/Loading';

export default function Providers({ children }: { children: React.ReactNode }) {
  const categories = ['Miel', 'Soin de la peau', 'Huile'];
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isrecive, setIsrecive] = useState(false);

  const handleComfirmedOrder = useCallback((comfirmed: boolean) => {
    if (comfirmed) {
      setIsrecive(false);
    }
  }, []);

  const handleComfirmOrder = useCallback((isComformed: boolean) => {
    if (isComformed) {
      setIsrecive(true);
    }
  }, []);

  const fecthData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw error;
      }
      setProductsData((data as ProductData[]) || []);
    } catch (error) {
      console.error('Failed to fetch data from Supabase:', error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center bg-amber-50 gap-4'>
        <span className='text-6xl'>⚠️</span>
        <p className='text-xl font-semibold text-red-600'>Erreur lors du chargement. Veuillez réessayer plus tard.</p>
        <button className='btn btn-warning' onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <LangProvider>
    <CartProvider>
      <NavBar />
      <ComfirmOrder isComfirmedOrder={isrecive} comfirmedOrder={handleComfirmedOrder} />
      <Cartegories.Provider value={categories}>
        <Productsdata.Provider value={productsData}>
          {children}
        </Productsdata.Provider>
      </Cartegories.Provider>
      <Footer />
    </CartProvider>
    </LangProvider>
  );
}
