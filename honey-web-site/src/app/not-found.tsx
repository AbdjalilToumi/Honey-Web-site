'use client';
import Link from 'next/link';
import { IoArrowBack, IoSearch } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-amber-50 px-6 py-20'>
      <div className='max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700'>
        
        {/* Animated Bee/Honey Icon */}
        <div className='relative inline-block'>
          <span className='text-9xl block drop-shadow-2xl animate-bounce duration-[2000ms]'>🍯</span>
          <span className='text-4xl absolute -top-4 -right-4 animate-pulse'>🐝</span>
        </div>

        {/* Error Message */}
        <div className='space-y-4'>
          <h1 className='text-7xl font-black font-heading text-stone-900 tracking-tighter'>404</h1>
          <h2 className='text-2xl md:text-3xl font-bold font-heading text-stone-800'>Oups ! Le pot de miel est vide.</h2>
          <p className='text-stone-500 font-body text-lg leading-relaxed max-w-md mx-auto'>
            La page que vous recherchez n'existe pas ou a été déplacée. Ne vous inquiétez pas, nos abeilles s'en occupent !
          </p>
        </div>

        {/* Search Suggestion (Visual only) */}
        <div className='relative max-w-sm mx-auto group'>
          <div className='absolute inset-y-0 left-4 flex items-center text-stone-400'>
            <IoSearch size={20} />
          </div>
          <input 
            type='text' 
            placeholder='Que cherchez-vous ?' 
            className='input input-bordered w-full bg-white pl-12 rounded-2xl border-stone-200 focus:border-amber-400 transition-all text-stone-600'
            disabled
          />
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-center pt-4'>
          <Link 
            href='/' 
            className='btn border-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-bold text-amber-950 px-10 rounded-2xl h-14 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto'
          >
            <IoArrowBack size={24} className='mr-2' />
            Retour à l'accueil
          </Link>
          <Link 
            href='/products' 
            className='btn btn-ghost font-bold text-stone-500 hover:text-amber-600 px-10 h-14 rounded-2xl w-full sm:w-auto'
          >
            Découvrir nos produits
          </Link>
        </div>

        {/* Background Decorative Element */}
        <div className='pt-12 flex justify-center gap-2 opacity-10 grayscale select-none pointer-events-none'>
          <span className='text-4xl'>🍯</span>
          <span className='text-4xl'>🐝</span>
          <span className='text-4xl'>🌻</span>
          <span className='text-4xl'>🍯</span>
          <span className='text-4xl'>🐝</span>
        </div>
      </div>
    </div>
  );
}
