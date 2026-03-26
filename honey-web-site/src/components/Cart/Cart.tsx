'use client';
import { useCallback, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartCard from './CartCard';
import { LuPackageOpen } from 'react-icons/lu';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

const Cart = ({ onComfirmOrderFromCart }: { onComfirmOrderFromCart: (v: boolean) => void }) => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, getQuantity, getTotalPrice } = useCart();
  const [totalPrice, setTotalPrice] = useState(getTotalPrice());
  const { t } = useLang();
  const ct = t.cart;

  const onQuantityChange = useCallback((ischange: boolean) => {
    if (ischange) setTotalPrice(getTotalPrice());
  }, [getTotalPrice]);

  const handleConfirm = useCallback(() => onComfirmOrderFromCart(true), [onComfirmOrderFromCart]);

  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-stone-900 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span className="text-5xl">🛒</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">{ct.heroTitle}</h1>
          <p className="font-body text-stone-400 text-lg">
            {cart.length > 0 ? ct.heroItems(cart.length) : ct.heroEmpty}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {cart.length > 0 ? (
            <div className="flex flex-col xl:flex-row gap-10 items-start">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cart.map((product) =>
                  product && (
                    <CartCard
                      key={product.id}
                      onQuantitychange={onQuantityChange}
                      cart={cart}
                      getquantity={getQuantity}
                      removefromcart={removeFromCart}
                      incrementquantity={incrementQuantity}
                      decrementquantity={decrementQuantity}
                      idproduct={product.id}
                      productname={product.name}
                      productimage={product.image}
                      productweight={product.weigth}
                      productcategory={product.cartegory}
                      productprice={product.price}
                    />
                  )
                )}
              </div>

              {/* Order summary */}
              <div className="w-full xl:w-80 sticky top-24">
                <div className="card bg-white border border-amber-100 shadow-lg">
                  <div className="card-body gap-5">
                    <h2 className="font-heading text-2xl font-bold text-stone-800">{ct.summary}</h2>
                    <div className="flex flex-col gap-3 font-body text-stone-600">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="truncate max-w-[160px]">{item.name} ×{item.quantity}</span>
                          <span className="font-semibold text-stone-700">{(item.price * item.quantity).toFixed(2)} MAD</span>
                        </div>
                      ))}
                    </div>
                    <div className="divider my-0" />
                    <div className="flex justify-between items-center">
                      <span className="font-body font-semibold text-stone-600">{ct.total}</span>
                      <span className="font-heading text-2xl font-bold text-amber-600">{totalPrice.toFixed(2)} MAD</span>
                    </div>
                    <button onClick={handleConfirm} className="btn btn-warning w-full font-body font-bold text-amber-900 text-lg mt-2">
                      {ct.confirm}
                    </button>
                    <Link href="/products" className="btn btn-ghost btn-sm font-body text-stone-500 w-full">
                      {ct.continueShopping}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
              <LuPackageOpen size={80} className="text-amber-300" />
              <div>
                <h2 className="font-heading text-3xl font-bold text-stone-700 mb-2">{ct.emptyTitle}</h2>
                <p className="font-body text-stone-400 text-lg">{ct.emptyDesc}</p>
              </div>
              <Link href="/products" className="btn btn-warning btn-lg font-body font-bold text-amber-900 px-10">
                {ct.discover}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
