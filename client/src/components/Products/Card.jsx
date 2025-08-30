import { IoCartOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Card = ({cart, addtoCart, idProduct, productWeight, productImage, productName, productCategory, productPrice, productDesc  }) => {
 
  let navigator = useNavigate();
  // check if product in the cart 
  let isProductInCart = cart.some((p) => p.id === idProduct);
  // hanlde the adding in cart 
  const hanledAddingCart = () => {
    addtoCart(
      {
        id: idProduct,
        name: productName,
        cartegory: productCategory,
        image: productImage,
        price: productPrice,
        weigth: productWeight,
      }
    )
  }
  
  return (
<div className='min-w-[50%] h-full p-4 rounded-lg'>
  <div className='p-6 w-full h-full bg-white rounded-xl shadow-lg flex flex-col items-center gap-4'>
    <img
      src={productImage}
      alt={`product image ${idProduct}`}
      className='w-[200px] h-[200px] rounded-lg object-cover'
    />
    <div className='flex self-start flex-col items-start w-full gap-2'>
      <h1 className='text-3xl text-yellow-700 font-bold font-sans'>{productName}</h1>
      <h4 className='text-lg font-semibold text-gray-500 font-sans'>{productCategory}</h4>
      <h2 className='text-2xl text-blue-500 font-bold mt-2'>{productPrice} MAD</h2>
      <details className='w-full cursor-pointer'>
        <summary className='flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-gray-900 transition-all duration-150'>
          <span className='w-4 h-4 text-blue-500 transition-transform duration-150 transform rotate-0'>
            &#9654;
          </span>
          {productName}
        </summary>
        <p className='p-2 text-gray-600 text-sm md:text-base lg:text-base leading-relaxed'>
          {productDesc}
        </p>
      </details>
      {productWeight && (
        <p className='text-sm text-gray-500 mt-2'>{productWeight}</p>
      )}
    </div>
    {!isProductInCart ? (
      <div
        onClick={() => hanledAddingCart()}
        className='cursor-pointer w-full flex justify-center items-center text-white font-semibold font-sans gap-2 text-lg p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition-all duration-150'
      >
        Ajouter au panier <IoCartOutline size={24} color='white' />
      </div>
    ) : (
      <div
        onClick={() => navigator("/cart")}
        className='w-full cursor-pointer flex justify-center items-center gap-2 text-lg p-3 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-150 text-white font-semibold'
      >
        Produit ajouté au panier <FaCheck size={20} />
      </div>
    )}
  </div>
</div>
  )
}

export default Card;

