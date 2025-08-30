import React, { useContext } from 'react';
import Card from './Card'
import { Productsdata } from '../../Contexts/ProductsContext';
import { useCart } from '../../Contexts/CartContext';
const Products = () => {
  let productsdata = useContext(Productsdata);
  
  let {cart, addToCart} = useCart()  

  return (
   <main className='w-full h-fit p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
    {
      productsdata.map((product) => {
        return product && <Card key={product.id} cart={cart} addtoCart={addToCart} idProduct={product.id} productName={product.name} productCategory={product.category} productDesc={product.description} productImage={product.image} productPrice={product.price} productWeight={product.weight}  />
      })
    }
   </main>
  );
};

export default Products;
