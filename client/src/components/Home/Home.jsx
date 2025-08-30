import React, { useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Productsdata } from '../../Contexts/ProductsContext';
import { useRef } from 'react';
import { Cartegories } from '../../Contexts/Category';

const Home = () => {
  let [activeIndexCategory, setActiveIndexCategory ] = useState(0);
  let products = useContext(Productsdata);
  let categories = useContext(Cartegories);
  products = [products[0], products[1], products[2], products[3], products[9], products[15]];
  // 1. Create a ref for the scrollable container
  const containerRef = useRef(null);

  // 2. Set up state for the dragging logic
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // 3. Define the mouse event handlers
  const handleMouseDown = (e) => {
    setIsDown(true);
    // Get the initial mouse position and scroll position
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    // Add a class for styling while dragging (optional)
    containerRef.current.classList.add('grabbing');
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    containerRef.current.classList.remove('grabbing');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    containerRef.current.classList.remove('grabbing');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    // Calculate the new scroll position
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // The multiplier (* 2) makes scrolling faster
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  let navigate = useNavigate();
  return (
    <>
  <section className="relative w-full h-[600px] flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 text-center text-white overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url('/path/to/your/section-1-large.jpeg')` }}
  >
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg">
        Le miel pur, directement de la ruche à votre table 🍯
      </h1>
      <p className="text-lg md:text-2xl font-medium text-gray-200 max-w-3xl leading-relaxed drop-shadow-lg">
        Découvrez notre miel 100% naturel, récolté avec soin par des apiculteurs passionnés. Goûtez à l'authenticité et à la douceur dorée d'un produit sain et artisanal.
      </p>
      <Link
        to="/products"
        className="inline-block mt-4 px-8 py-4 text-xl font-bold rounded-full bg-yellow-400 text-amber-900 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
      >
        Découvrir nos produits
      </Link>
    </div>
  </section>

  <section className="w-full flex flex-col md:flex-row-reverse items-center justify-center p-8 md:p-12 lg:p-24 bg-gray-50 gap-10 lg:gap-20">
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/section-2.jpeg"
        alt="section 2 image"
        className="w-full max-w-md rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 md:w-[80%] lg:w-[60%]"
      />
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-start gap-6 text-center md:text-left">
      <h1 className="w-full text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
        Nos variétés de miel
      </h1>
      <p className="w-full text-lg md:text-xl font-light text-gray-600 leading-relaxed">
        Que vous soyez amateur de miel doux, parfumé ou floral, nous avons la saveur qui éveillera vos papilles.
      </p>
      <ul className="w-full flex flex-col gap-4 mt-4 list-none pl-0">
        <li className="relative pl-6 md:pl-8">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl text-yellow-500">
            ●
          </span>
          <Link to="#" className="text-xl md:text-2xl text-gray-700 font-medium hover:text-yellow-600 transition-colors">
            Miel d'Eucalyptus
          </Link>
        </li>
        <li className="relative pl-6 md:pl-8">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl text-yellow-500">
            ●
          </span>
          <Link to="#" className="text-xl md:text-2xl text-gray-700 font-medium hover:text-yellow-600 transition-colors">
            Miel d'Euphorbe (Daghmous)
          </Link>
        </li>
        <li className="relative pl-6 md:pl-8">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl md:text-3xl text-yellow-500">
            ●
          </span>
          <Link to="#" className="text-xl md:text-2xl text-gray-700 font-medium hover:text-yellow-600 transition-colors">
            Miel de Thym
          </Link>
        </li>
      </ul>
    </div>
  </section>

  <section className="w-full flex flex-col items-center justify-center text-center p-8 md:p-16 lg:p-20 bg-white shadow-inner">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      🐝 Qui sommes-nous ?
    </h1>
    <p className="text-lg md:text-xl font-light text-gray-600 max-w-4xl leading-relaxed mb-8">
      Apiculteurs depuis plusieurs générations, nous croyons en une apiculture respectueuse de la nature et des abeilles. Chaque pot de miel reflète notre passion, notre savoir-faire et notre engagement pour la qualité.
    </p>
    <Link 
      to='/about' 
      className='inline-block px-8 py-4 text-lg font-bold rounded-full bg-yellow-400 text-amber-900 shadow-md transition-all duration-300 hover:scale-105 hover:bg-yellow-300'
    >
      En savoir plus
    </Link>
  </section>
</>
  );
};

export default Home;


