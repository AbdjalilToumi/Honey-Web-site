import React, { use, useCallback, useEffect, useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import CartCard from './cartCard'
import { LuPackageOpen } from "react-icons/lu";


const Cart = ({ onComfirmOrderFromCart}) => {
  let {cart, removeFromCart, incrementQuantity, decrementQuantity, getQuantity, getTotalPrice } = useCart();
  let [totalPrice, setTotalPrice] = useState(getTotalPrice());

  let onQuantityChange = useCallback((ischange) => {
      if(ischange){
        setTotalPrice(getTotalPrice());
      }
  })
  let hanleComfirmationButtom = useCallback(() => {
    onComfirmOrderFromCart(true);
  });
  return (
<div className='w-full h-full p-6 md:p-10 bg-gray-100 rounded-xl shadow-inner'>
  {
    cart.length !== 0 ?
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
        {cart.map((product) => (
          product && <CartCard 
                      onQuantitychange={onQuantityChange} 
                      key={product.id} 
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
        ))}
      </div>
      
      <div className='flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-xl shadow-lg'>
        <h1 className='text-3xl font-extrabold text-blue-600 font-sans mb-4 md:mb-0'>
          Total de la Commande: <span className='text-yellow-600'>{(totalPrice).toFixed(2)} MAD</span>
        </h1>
        <button
          className='px-8 py-4 bg-yellow-500 text-white font-bold rounded-full text-lg 
                     shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300'
          onClick={hanleComfirmationButtom}
        >
          Confirmer et savourer
        </button>
      </div>
    </>
    :
    <div className='w-full h-96 flex flex-col justify-center items-center gap-6 p-8 bg-white rounded-xl shadow-lg'>
      <p className='text-2xl md:text-3xl font-semibold text-gray-500 text-center tracking-wide'>
        Oh ! Votre panier est encore vide...
      </p>
      <LuPackageOpen size={60} className='text-gray-400 animate-bounce' />
      <p className='text-md text-gray-400 mt-2'>Ajoutez des produits pour commencer votre commande.</p>
    </div>
  }
</div>
  )
};

export default Cart;