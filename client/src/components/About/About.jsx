import React from 'react';

const About = () => {
  return <div className='w-full h-full p-6 md:p-10 bg-gray-50 font-sans text-gray-800'>
  
  {/* Title Section */}
  <div className='text-center mb-8 md:mb-12'>
    <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight selection:bg-transparent bg-gradient-to-br from-amber-700 via-yellow-400 to-amber-900 bg-clip-text text-transparent'>
      <span className='mr-2'>🐝</span> À propos de nous
    </h1>
  </div>
  
  {/* Notre histoire Section */}
  <section className='bg-white p-6 rounded-2xl shadow-lg mb-8 md:mb-12'>
    <h2 className='text-2xl md:text-3xl font-bold font-serif mb-3 text-amber-900'>Notre histoire :</h2>
    <p className='text-lg md:text-xl text-gray-700 leading-relaxed indent-8'>
      Depuis des générations, nous cultivons une passion pour l'apiculture et le respect de la nature. Notre aventure a commencé avec quelques ruches familiales, et s'est transformée au fil des années en une véritable mission : offrir un miel authentique, pur et issu d’un savoir-faire traditionnel.
    </p>
  </section>

  {/* Separator */}
  <hr className='w-1/2 mx-auto border-t-2 border-dashed border-yellow-400 my-8'/>

  {/* Notre engagement Section */}
  <section className='bg-gray-800 p-8 rounded-2xl text-white shadow-xl mb-8 md:mb-12'>
    <h2 className='text-2xl md:text-3xl font-extrabold font-serif mb-4 text-yellow-400'>Notre engagement :</h2>
    <p className='text-md md:text-lg indent-8 mb-4 opacity-90'>
      Nous croyons que le miel n'est pas seulement un produit, mais un véritable trésor de la nature.
    </p>
    <h5 className='text-lg md:text-xl font-semibold mb-3'>C'est pourquoi nous veillons à :</h5>
    <ul className='space-y-3 pl-6 md:pl-8'>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400">
        <span className="pl-4 text-md md:text-lg">Respecter le rythme naturel des abeilles 🐝</span>
      </li>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400">
        <span className="pl-4 text-md md:text-lg">Privilégier des méthodes d'apiculture douces et durables</span>
      </li>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400">
        <span className="pl-4 text-md md:text-lg">Offrir un miel 100% naturel, sans additifs ni transformations</span>
      </li>
    </ul>
  </section>

  {/* Separator */}
  <hr className='w-1/2 mx-auto border-t-2 border-dashed border-yellow-400 my-8'/>

  {/* La qualité avant tout Section */}
  <section className='bg-white p-6 rounded-2xl shadow-lg'>
    <h2 className='text-2xl md:text-3xl uppercase font-bold bg-gradient-to-tr from-yellow-500 to-amber-900 text-transparent bg-clip-text mb-3'>
      La qualité avant tout :
    </h2>
    <p className='text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4'>
      Chaque pot de miel est le reflet de notre terroir et du travail minutieux de nos abeilles. Notre objectif est de partager avec vous un produit riche en goût, en bienfaits et en authenticité.
    </p>
    <h5 className='text-xl md:text-2xl font-bold mb-3 underline decoration-yellow-500 underline-offset-4'>Nos valeurs :</h5>
    <ul className='space-y-3 pl-6 md:pl-8'>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-500">
        <span className='pl-4 text-md md:text-lg'><span className='font-extrabold text-amber-900'>Authenticité : </span>un miel pur, tel que la nature l'offre</span>
      </li>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-500">
        <span className='pl-4 text-md md:text-lg'><span className='font-extrabold text-amber-900'>Durabilité : </span> une apiculture respectueuse de l'environnement</span>
      </li>
      <li className="relative flex items-start before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-500">
        <span className='pl-4 text-md md:text-lg'><span className='font-extrabold text-amber-900'>Passion : </span>l'amour de notre métier et de nos abeilles</span>
      </li>
    </ul>
  </section>
  
</div>
};

export default About;





{/* <div className='w-full h-full p-5 bg-white'>
    <h1 className='text-3xl text-center uppercase font-bold selection:bg-transparent bg-gradient-to-br from-amber-950 via-yellow-300 to-black/5 bg-clip-text text-transparent '>🐝 À propos de nous</h1>
    <section className='flex flex-col items-start gap-1 p-2 text-xl '>
      <h2 className='text-2xl text-gray-700 font-serif font-semibold'>Notre histoire :</h2>
      <p className='text-[1.1rem] indent-5 text-gray-600 '>
        Depuis des générations, nous cultivons une passion pour l'apiculture et le respect de la nature. Notre aventure a commencé avec quelques ruches familiales, et s'est transformée au fil des années en une véritable mission : offrir un miel authentique, pur et issu d’un savoir-faire traditionnel.
      </p>
    </section>
    <hr className='bg-black/20 w-full h-[.10rem] my-5'/>
    <section className='rounded-lg bg-black/40 p-5 text-white flex flex-col items-start gap-2 text-xl'>
      <h2 className='text-2xl font-serif font-extrabold '>Notre engagement :</h2>
      <p className='text-[1rem] indent-5'>
      Nous croyons que le miel n'est pas seulement un produit, mais un véritable trésor de la nature.
      </p>
      <h5>C'est pourquoi nous veillons à :</h5>
      <ul className='text-xs indent-4 relative'>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-white">Respecter le rythme naturel des abeilles 🐝</li>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-white">Privilégier des méthodes d'apiculture douces et durables</li>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-[20%] md:before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-white">Offrir un miel 100% naturel, sans additifs ni transformations</li>
      </ul>
    </section>
    <hr className='bg-black/20 w-full h-[.10rem] my-5'/>
    <section className='flex flex-col items-start gap-2 p-2 text-xl'>
      <h2 className='text-2xl uppercase font-semibold bg-gradient-to-tr from-yellow-500 to-black/40 text-transparent bg-clip-text '>
        La qualité avant tout :
      </h2>
      <p className='p-2 md:p-2 lg:p-1 text-[1rem] md:text-xl lg:text-xl text-gray-500'>Chaque pot de miel est le reflet de notre terroir et du travail minutieux de nos abeilles. Notre objectif est de partager avec vous un produit riche en goût, en bienfaits et en authenticité.</p>
      <h5 className='underline md:text-2xl lg:text-2xl'>Nos valeurs :</h5>
      <ul className='text-xs md:text-xl  indent-4 relative'>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-black md:before:w-2 md:before:h-2 lg:before:w-3 lg:before:h-3 lg:before:left-0"><span className='font-bold'>Authenticité : </span>un miel pur, tel que la nature l'offre</li>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-black md:before:w-2 md:before:h-2 lg:before:w-3 lg:before:h-3 lg:before:left-0"><span className='font-bold'>Durabilité : </span> une apiculture respectueuse de l'environnement</li>
        <li className="relative before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-black md:before:w-2 md:before:h-2 lg:before:w-3 lg:before:h-3 lg:before:left-0"><span className='font-bold'>Passion : </span>l'amour de notre métier et de nos abeilles</li>
      </ul>
    </section>
  </div>; */}