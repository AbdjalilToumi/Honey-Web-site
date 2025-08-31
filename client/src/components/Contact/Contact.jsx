import React, { useCallback, useRef, useReducer, useState } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Contact = () => {
  let [resMessage, setResmessage ] = useState(null);
  let [isError, setIsError] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const succesSend = useRef(null);
  const errorSend = useRef(null);
  const mainElement = useRef(null);
  const errorName = useRef(null);
  const subject = useRef(null);
  const message = useRef(null);
  const errorEmail = useRef(null);
  let  hanldContactSubmitFrom = async (event) => {
    event.preventDefault();
    let regEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let nameValue = name.current.value;
    let emailValue = email.current.value;
    let subjectValue = subject.current.value;
    let messageValue = message.current.value;
    if( name === ""){
      errorName.current.textContent = " le nom est requis!"
      return;
    }
    if(regEmail.test(emailValue) === false) {
      errorEmail.current.textContent = "Please enter a valid email address"
      return;
    }
    else{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      let dataContact = {
        name: nameValue,
        email: emailValue,
        subject: subjectValue,
        message: messageValue,
      }/contact-form
      try {
        const resp = await fetch(`${backendUrl}/contact-form`,  {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataContact)
        });
        if(!resp.ok){
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const data = await resp.json();
        setResmessage(data);
        setIsError(false);
        setTimeout(() => {
          window.location.reload();        
        }, 1800);
      }
      catch(error){
        setIsError(true);
        setResmessage('Something went wrong try later. ❗'); 
        setTimeout(() => {
          window.location.reload();
        }, 1800);
        console.log("error" + error);
      }
    }
}


  return (<div ref={mainElement} className='w-full h-full min-h-screen flex-grow-1 p-6 md:p-10 lg:p-16 bg-gray-50 font-sans'>
    {/* Success Message */}
    {
      <>
        <div ref={succesSend} className={`${isError === false ? resMessage !== null ? "block" : "hidden" : "hidden"} p-4 mb-6 rounded-lg bg-green-100 text-center text-lg md:text-xl text-green-700 font-bold animate-ping`}>
          {resMessage} 
        </div>
        <div ref={errorSend} className={`${isError === true ? "block" : "hidden"} p-4 mb-6 rounded-lg bg-red-100 text-center text-lg md:text-xl text-red-700 font-bold animate-ping`}>
          {resMessage} 
        </div>
      </>
    }

    {/* Header Section */}
    <div className='w-full flex flex-col items-center space-y-3 mb-8 text-center'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900'>Contactez-nous 🍯</h1>
        <p className='text-md md:text-lg text-gray-600 max-w-2xl'>
            Notre équipe est à votre disposition pour toute question sur nos produits, commandes ou partenariats.
        </p>
    </div>

    {/* Contact Form */}
    <form onSubmit={(e) => hanldContactSubmitFrom(e)} className='w-full max-w-2xl mx-auto p-8 md:p-10 bg-white rounded-xl shadow-lg flex flex-col gap-6'>
        
        {/* Name Field */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="name" className="text-lg md:text-xl font-semibold text-gray-700">Nom complet:</label>
            <input 
                ref={name} 
                type="text" 
                className='w-full p-3 text-lg md:text-xl border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200' 
                required
            />
            <div className="text-red-600 text-sm md:text-base font-medium uppercase" ref={errorName}></div>
        </div>

        {/* Email Field */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className="text-lg md:text-xl font-semibold text-gray-700">Adresse e-mail:</label>
            <input 
                ref={email} 
                type="email"  
                className='w-full p-3 text-lg md:text-xl border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200' 
                required
            />
            <div className="text-red-600 text-sm md:text-base font-medium uppercase" ref={errorEmail}></div>
        </div>

        {/* Subject Field */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="subject" className="text-lg md:text-xl font-semibold text-gray-700">Sujet :</label>
            <input 
                ref={subject} 
                type="text"  
                className='w-full p-3 text-lg md:text-xl border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200' 
                required
            />
        </div>   

        {/* Message Field */}
        <div className='flex flex-col gap-2'>
            <label htmlFor="message" className="text-lg md:text-xl font-semibold text-gray-700">Message :</label>
            <textarea 
                ref={message} 
                rows={6} 
                className='w-full p-3 text-lg border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-y' 
                required 
                placeholder="Votre message ici..."
            ></textarea>
        </div>  

        {/* Submit Button */}
        <div className='w-full flex justify-center mt-4'>
            <button 
                type="submit" 
                className='w-full md:w-auto px-8 py-4 text-xl md:text-2xl font-bold bg-yellow-500 text-white rounded-full 
                           shadow-md transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300'
            >
                Envoyer
            </button>
        </div>
    </form>

    {/* Response Time Info */}
    <p className='mt-8 text-center text-sm md:text-base text-gray-500'>
        Nous vous répondrons sous 24h.
    </p>
</div>)
}

export default Contact;


