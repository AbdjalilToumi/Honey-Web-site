'use client';
import { IoCartOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

interface CardProps {
  cart: { id: string }[];
  addtoCart: (product: { id: string; name: string; cartegory: string; image: string; price: number; weigth: string }) => void;
  idProduct: string;
  productWeight: string;
  productImage: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDesc: string;
}

const Card = ({ cart, addtoCart, idProduct, productWeight, productImage, productName, productCategory, productPrice, productDesc }: CardProps) => {
  const router = useRouter();
  const { t } = useLang();
  const isProductInCart = cart.some((p) => p.id === idProduct);

  const hanledAddingCart = () => {
    addtoCart({ id: idProduct, name: productName, cartegory: productCategory, image: productImage, price: productPrice, weigth: productWeight });
  };

  return (
    <div className="card bg-white border border-amber-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      <figure className="px-6 pt-6">
        <Image src={productImage} alt={productName} width={200} height={200} className="w-full h-52 object-cover rounded-2xl" />
      </figure>
      <div className="card-body gap-3 pt-4">
        <span className="badge badge-warning badge-sm font-body font-semibold text-amber-900">{productCategory}</span>
        <h2 className="font-heading text-xl font-bold text-stone-800 leading-snug">{productName}</h2>
        <div className="flex items-center justify-between">
          <span className="font-heading text-2xl font-bold text-amber-600">{productPrice} <span className="text-base font-body font-semibold text-stone-400">MAD</span></span>
          {productWeight && <span className="badge badge-ghost font-body text-stone-500">{productWeight}</span>}
        </div>
        <details className="collapse collapse-arrow bg-amber-50 border border-amber-100 rounded-xl">
          <summary className="collapse-title font-body font-semibold text-stone-700 text-sm min-h-0 py-3 px-4">
            {t.products.description}
          </summary>
          <div className="collapse-content">
            <p className="font-body text-stone-500 text-sm leading-relaxed pt-1">{productDesc}</p>
          </div>
        </details>
        <div className="card-actions mt-auto pt-2">
          {!isProductInCart ? (
            <button 
              onClick={hanledAddingCart} 
              className="btn border-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 w-full font-body font-bold text-amber-950 gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 rounded-xl h-12"
            >
              <IoCartOutline size={22} className="animate-pulse" /> 
              {t.products.addToCart}
            </button>
          ) : (
            <button 
              onClick={() => router.push('/cart')} 
              className="btn border-none bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 w-full font-body font-bold text-white gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 rounded-xl h-12"
            >
              <FaCheck size={18} /> 
              {t.products.viewCart}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
