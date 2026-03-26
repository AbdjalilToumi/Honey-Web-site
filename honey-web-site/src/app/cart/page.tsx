'use client';
import Cart from '@/components/Cart/Cart';
import { useCallback, useState } from 'react';
import ComfirmOrder from '@/components/ComfirmOrder';

export default function CartPage() {
  const [isrecive, setIsrecive] = useState(false);

  const handleComfirmedOrder = useCallback((comfirmed: boolean) => {
    if (comfirmed) setIsrecive(false);
  }, []);

  const handleComfirmOrder = useCallback((isComformed: boolean) => {
    if (isComformed) setIsrecive(true);
  }, []);

  return (
    <>
      <ComfirmOrder isComfirmedOrder={isrecive} comfirmedOrder={handleComfirmedOrder} />
      <Cart onComfirmOrderFromCart={handleComfirmOrder} />
    </>
  );
}
