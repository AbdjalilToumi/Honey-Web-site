import { Link } from 'react-router-dom';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { useCallback, useEffect, useRef, useState } from 'react';


const NavBar = () => {
  const [expended, setExpended] = useState(false);

  const handleSideBar = () => {
    setExpended(!expended);
    
  }
  
  useEffect(() => {

    if(expended){
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
    }
  }, [expended])
  return (
<nav className='w-full h-16 md:h-20 p-2 md:p-4 bg-white shadow-md flex items-center justify-between sticky top-0 z-50'>
  
  {/* Mobile Menu Button & Overlay */}
  {expended && (
    <div onClick={handleSideBar} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 z-40 md:hidden"></div>
  )}
  <MdOutlineMenuOpen 
    size={40} 
    className={`${expended ? "rotate-[0deg] translate-x-0" : "rotate-[180deg] translate-x-0"} transition-all duration-300 md:hidden cursor-pointer text-gray-700 hover:text-yellow-600`} 
    onClick={handleSideBar}
  />
  
  {/* Logo & Brand Name */}
  <div className='flex items-center gap-2 relative z-50'>
    <img src="/logo.png" alt="logo web site" width={40} height={40} className="md:w-12 md:h-12" />
    <h1 className='selection:text-white text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-yellow-300 to-amber-700 text-transparent bg-clip-text tracking-wide'>
      Ifrane Miel
    </h1>
  </div>

  {/* Mobile Links (Sidebar) */}
  <ul className={`fixed top-0 ${expended ? 'left-0' : '-left-64'} z-50 w-64 h-full bg-white shadow-xl p-6 transition-all duration-300 ease-in-out md:hidden flex flex-col items-start space-y-4`}>
    <div className="w-full flex justify-end mb-4">
      <MdOutlineMenuOpen size={40} onClick={handleSideBar} className="cursor-pointer text-gray-700 hover:text-yellow-600" />
    </div>
    <Link onClick={handleSideBar} to='/' className='w-full p-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200'>Accueil</Link>
    <Link onClick={handleSideBar} to='/products' className='w-full p-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200'>Produits</Link>
    <Link onClick={handleSideBar} to='/contact' className='w-full p-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200'>Contact</Link>
    <Link onClick={handleSideBar} to='/about' className='w-full p-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200'>À propos</Link>
    <Link onClick={handleSideBar} to='/cart' className='w-full p-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between'>
        <span>Panier</span>
        <PiShoppingCartSimpleBold size={24} className="text-gray-600" />
    </Link>
  </ul>

  {/* Desktop Links */}
  <ul className='hidden md:flex flex-row items-center space-x-6 lg:space-x-8'>
    <Link to='/' className='p-2 text-lg font-semibold text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'>Accueil</Link>
    <Link to='/products' className='p-2 text-lg font-semibold text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'>Produits</Link>
    <Link to='/contact' className='p-2 text-lg font-semibold text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'>Contact</Link>
    <Link to='/about' className='p-2 text-lg font-semibold text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'>À propos</Link>
    <Link to='/cart' className='flex items-center gap-2 p-2 text-lg font-semibold text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600'>
        <span>Panier</span>
        <PiShoppingCartSimpleBold size={24}  />
    </Link>
  </ul>
</nav>
  );
};

export default NavBar;
