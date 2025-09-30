
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
  return (
<footer className='w-full p-8 md:p-12 lg:p-16 bg-gray-900 text-gray-300'>
  <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 lg:gap-20'>
    {/* Brand & Copyright Section */}
    <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
      <div className='flex items-center space-x-2 mb-2'>
        <img src="/logo.png" alt="logo" width={40} height={40}/>
        <h1 className='uppercase text-2xl font-bold text-yellow-400 tracking-wide'>Ifrane miel</h1>
      </div>
      <p className='text-sm text-gray-500'>© 2024 Ifrane miel. All Rights Reserved.</p>
      {/* <div className='mt-2 text-xs text-gray-500 space-x-2'>
        <a href="#" className='hover:underline'>[Privacy Policy]</a>
        <span>|</span>
        <a href="#" className='hover:underline'>[Terms of Service]</a>
        <span>|</span>
        <a href="#" className='hover:underline'>[Shipping & Returns]</a>
      </div> */}
    </div>

    {/* Navigation Links & Socials */}
    <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
      <h2 className='text-lg font-semibold text-white mb-4'>Découvrir</h2>
      <nav className='flex flex-col items-center md:items-start space-y-2 text-md md:text-lg text-gray-400'>
        <Link to='/products' className='hover:text-white transition-colors duration-200'>Produits</Link>
        <Link to="/contact" className='hover:text-white transition-colors duration-200'>Contact</Link>
        <Link to='about' className='hover:text-white transition-colors duration-200'>À propos</Link>
      </nav>
      <div className='flex justify-between gap-5 mt-6'>
        <a href="https://www.facebook.com/profile.php?id=61581583350372" target="_blank" aria-label="Facebook">
          <FaFacebook size={25} fill='white' className='hover:fill-yellow-400 transition-colors'/>
        </a>
        <a href="https://www.instagram.com/manahilifrane1?igsh=bmk3bTJvcnMwN3Vp" target="_blank" aria-label="Instagram">
          <FaInstagram size={25} fill='white' className='hover:fill-yellow-400 transition-colors'/>
        </a>
        <a href="https://maps.app.goo.gl/b6PWzRTpK7zSos8J6" target="_blank" rel="noopener noreferrer" aria-label="Location">
          <FaLocationDot size={25} fill='white' className='hover:fill-yellow-400 transition-colors'/>
        </a>
      </div>
    </div>

    {/* Newsletter Section */}
    <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
      <h2 className='text-lg font-semibold text-white mb-4'>Newsletter</h2>
      <p className='text-sm text-gray-400 mb-4'>Restez à l'affût ! Recevez les nouveautés et des offres exclusives.</p>
    </div>
  </div>
</footer>
  )
}

export default Footer;

