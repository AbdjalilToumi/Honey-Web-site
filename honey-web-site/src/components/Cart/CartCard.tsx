'use client';
import { useState } from 'react';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { FiTrash2 } from 'react-icons/fi';
import { useLang } from '@/contexts/LangContext';

interface CartCardProps {
  cart: { id: string }[];
  onQuantitychange: (ischange: boolean) => void;
  removefromcart: (id: string) => void;
  incrementquantity: (id: string) => void;
  getquantity: (id: string) => number;
  decrementquantity: (id: string) => void;
  idproduct: string;
  productweight: string;
  productimage: string;
  productname: string;
  productcategory: string;
  productprice: number;
}

const CartCard = ({ onQuantitychange, removefromcart, incrementquantity, getquantity, decrementquantity, idproduct, productweight, productimage, productname, productcategory, productprice }: CartCardProps) => {
  const [quantity, setQuantity] = useState(getquantity(idproduct));
  const { t } = useLang();

  const increment = () => { incrementquantity(idproduct); setQuantity(getquantity(idproduct)); onQuantitychange(true); };
  const decrement = () => { decrementquantity(idproduct); setQuantity(getquantity(idproduct)); onQuantitychange(true); };

  return (
    <div className="card bg-white border border-amber-100 shadow-md hover:shadow-xl transition-shadow duration-300">
      <figure className="px-5 pt-5">
        <img src={productimage} alt={productname} className="w-full h-48 object-cover rounded-2xl" />
      </figure>
      <div className="card-body gap-3 pt-4">
        <span className="badge badge-warning badge-sm font-body font-semibold text-amber-900">{productcategory}</span>
        <h2 className="font-heading text-xl font-bold text-stone-800 leading-snug">{productname}</h2>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-amber-600">{productprice} <span className="text-sm font-body text-stone-400">MAD</span></span>
          {productweight && <span className="badge badge-ghost font-body text-stone-500 text-xs">{productweight}</span>}
        </div>
        <div className="divider my-1" />
        <div className="flex items-center justify-between font-body text-sm text-stone-500">
          <span>{t.cartCard.subtotal}</span>
          <span className="font-bold text-stone-700 text-base">{(productprice * quantity).toFixed(2)} MAD</span>
        </div>
        <div className="flex items-center justify-between mt-2 gap-3">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <button onClick={decrement} className="btn btn-ghost btn-xs btn-circle text-amber-700 hover:bg-amber-100">
              <CiCircleMinus size={22} />
            </button>
            <span className="font-heading font-bold text-stone-800 w-6 text-center">{quantity}</span>
            <button onClick={increment} className="btn btn-ghost btn-xs btn-circle text-amber-700 hover:bg-amber-100">
              <CiCirclePlus size={22} />
            </button>
          </div>
          <button onClick={() => removefromcart(idproduct)} className="btn btn-error btn-outline btn-sm gap-1 font-body font-semibold">
            <FiTrash2 size={15} /> {t.cartCard.remove}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
