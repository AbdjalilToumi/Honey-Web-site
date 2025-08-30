import React, { useCallback, useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci"
import { CiCircleMinus } from "react-icons/ci";

const CartCard = ({cart,onQuantitychange, removefromcart, incrementquantity, getquantity ,decrementquantity, idproduct, productweight, productimage, productname, productcategory, productprice }) => {    
    let [quantityProduct, setQuantityProduct]=  useState(getquantity(idproduct));
    
    // hanle the quantity indcremenet
    let handleItemsIncrementQuantity = () => {
        incrementquantity(idproduct)
        setQuantityProduct(getquantity(idproduct));
        onQuantitychange(true)
    }
    // hanlde the quantity decrement 
    let hanldeItemsDecrement = () => {
        decrementquantity(idproduct);
        setQuantityProduct(getquantity(idproduct));
        onQuantitychange(true);
    }
    // handle the removing of pruducts 
    let handleRemovingProduct = () =>  {
        removefromcart(idproduct);
    }

  return (
<div className='relative w-full h-full bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl'>
  <div className='p-5 w-full h-full flex flex-col items-center gap-4'>
    {/* Product Image Section */}
    <div className='w-full flex justify-center items-center'>
      <img src={productimage} alt={`product image ${idproduct}`} className='w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover shadow-md' />
    </div>

    {/* Product Details Section */}
    <div className='flex self-start flex-col items-start gap-2 w-full text-center md:text-left'>
      <h1 className='text-3xl text-yellow-600 font-extrabold tracking-wide'>{productname}</h1>
      <h4 className='text-lg font-medium text-gray-500 capitalize'>{productcategory}</h4>
      <h2 className='text-2xl text-blue-500 font-bold mt-2'>{productprice} MAD</h2>
      <p className='text-xl text-gray-400 capitalize font-medium mt-1'>
        Total: <span className='font-semibold text-gray-600'>{(productprice * quantityProduct).toFixed(2)} MAD</span>
      </p>
      {productweight && <p className='text-sm text-gray-400 mt-1'>{productweight}</p>}
    </div>

    {/* Controls and Actions Section */}
    <main className='w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-4'>
      {/* Quantity Control */}
      <div className='bg-gray-100 p-2 text-blue-600 rounded-full flex items-center justify-around gap-6 text-2xl font-semibold'>
        <CiCircleMinus size={36} onClick={hanldeItemsDecrement} className='cursor-pointer hover:text-blue-800 transition-colors' />
        <span className='w-12 text-center'>{quantityProduct}</span>
        <CiCirclePlus size={36} onClick={handleItemsIncrementQuantity} className='cursor-pointer hover:text-blue-800 transition-colors' />
      </div>
      
      {/* Remove Button */}
      <button onClick={handleRemovingProduct} className='w-full md:w-auto text-lg bg-red-500 p-3 rounded-full h-full text-white font-semibold shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg'>
        Retirer du panier
      </button>
    </main>
  </div>
</div>
  )
}

export default CartCard;
