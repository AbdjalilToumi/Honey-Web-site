'use client';
import { useContext } from 'react';
import Card from './Card';
import { Productsdata } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import { useLang } from '@/contexts/LangContext';

const Products = () => {
  const productsdata = useContext(Productsdata);
  const { cart, addToCart } = useCart();
  const { t, lang } = useLang();

  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-stone-900 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span className="text-5xl">🛒</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">{t.products.heroTitle}</h1>
          <p className="font-body text-stone-400 text-lg">{t.products.heroDesc}</p>
        </div>
      </section>
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsdata.map((product) =>
              product && (
                <Card
                  key={product.id}
                  cart={cart}
                  addtoCart={addToCart}
                  idProduct={product.id}
                  productName={lang === 'ar' ? product.name_ar || product.name_fr : lang === 'en' ? product.name_en || product.name_fr : product.name_fr}
                  productCategory={product.category}
                  productDesc={lang === 'ar' ? product.description_ar || product.description_fr : lang === 'en' ? product.description_en || product.description_fr : product.description_fr}
                  productImage={product.image}
                  productPrice={product.price}
                  productWeight={product.weight}
                />
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
