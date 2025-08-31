import React, { useCallback, useRef, useState } from 'react'
import { useCart } from '../Contexts/CartContext'
import { useNavigate } from 'react-router-dom';
import { MdError } from "react-icons/md";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ComfirmOrder = ({isComfirmedOrder, comfirmedOrder}) => {
    let {cart, getTotalPrice, resetCart} = useCart();
    let navigator = useNavigate();
    // states
    let [isvalideName, setIsValideName] = useState(true);
    let [isvalideLast, setIsValideLast] = useState(true);
    let [isvalidePhone, setIsValidePhone] = useState(true);
    let [isvalideCity, setIsValideCity] = useState(true);
    let [isvalideLocation, setIsValideLocation] = useState(true);
    let [isFormSended, setIsFormSended] = useState(false);
    let [respMessage, setResmessage] = useState("")
    let [serverStatue, setServerStatues] = useState(true);
    // the date 
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;

    // regular expressions 
    let phoneNumberReg = /^(?:\+212|0)([5-7]\d{8})$/;
    
    // refeneces 
    let errorName = useRef(null);
    let errorLastName = useRef(null);
    let errroPhoneNumber = useRef(null);
    let errorCity = useRef(null);
    let errorLocation = useRef(null);
    let name = useRef(null);
    let lastName = useRef(null);
    let phonenumber = useRef(null);
    let City = useRef(null);
    let location = useRef(null);

    // form verfication 
    let handleFormSubmistion = useCallback(async (event) => {
        event.preventDefault();

        let namevalue = name.current.value;
        let lastNameValue = lastName.current.value;
        let phoneNumberValue = phonenumber.current.value;
        let cityValue = City.current.value;
        let locationValue = location.current.value;

        let isValidForm = true;
        if(namevalue === ""){
            setIsValideName(false);
            setTimeout(() => {
                setIsValideName(true);
            }, 2000)
            isValidForm = false;
        }
        if(lastNameValue === ""){
            setIsValideLast(false)
            setTimeout(() => {
                setIsValideLast(true);
            }, 2000)
            isValidForm = false
        }
        if(cityValue === ""){
            setIsValideCity(false);
            setTimeout(() =>  {
                setIsValideCity(true);
            }, 2000)
            isValidForm = false;
        }
        if(locationValue === ""){
            setIsValideLocation(false);
            setTimeout(() =>  {
                setIsValideLocation(true);
            }, 2000);
            isValidForm = false
        }
        if(phoneNumberReg.test(phoneNumberValue) === false) {
            setIsValidePhone(false);
            setTimeout(() => {
                setIsValidePhone(true);
            }, 2000)
            isValidForm = false;
        }
        if(isValidForm){
            let userData =  {
                name: lastNameValue,
                lastName: namevalue,
                phoneNumber: phoneNumberValue,
                city: cityValue,
                location: locationValue,
                products: cart,
                date: formattedDate,
            }
            try {
            let resp = await fetch(`${backendUrl}/order`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            if(!resp.ok){
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            const data = resp.json();
            // set the resonse message, and render it and reset the cart array, reset the form inputs, change route to /products page 
            setResmessage(data);
            setIsFormSended(true);
            resetCart();
            event.target.reset()
            navigator('/products')
        }
        catch(error){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            setServerStatues(false);
            setTimeout(() => {
                window.location.reload();
                setServerStatues(true);
            }, 1500)
        }
        }   
        else{   
            return;
        }
    });
    return (
<div className={`w-full h-full absolute ${isComfirmedOrder ? "left-[0%]" : "left-[-200%]"} transition-all duration-150 bg-black/50 z-50 flex justify-center items-start`}>
    <div className='bg-black/90 mt-5 text-white rounded-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-6 md:p-8 shadow-2xl'>
        {serverStatue ?
            !isFormSended ?
                <>
                    <h1 className='text-3xl sm:text-4xl font-bold text-center mb-2 text-yellow-300'>Merci pour votre commande !</h1>
                    <p className='text-sm sm:text-base indent-5 text-white/90 text-center mb-6'>
                        Votre commande a bien été enregistrée. Nous la préparons avec soin et nous vous contacterons directement sur WhatsApp.
                    </p>

                    <div className='bg-white/10 rounded-lg p-5 mb-6'>
                        <h4 className='text-xl font-semibold mb-3'>Détails de la commande</h4>
                        <div className='text-sm sm:text-base mb-4'>
                            <p className='font-semibold'>Date: <span className='font-normal'>{formattedDate}</span></p>
                            <h4 className='font-semibold mt-3'>Produits :</h4>
                            <ul className='list-disc list-inside space-y-2 mt-2 ml-4'>
                                {cart.map((item, index) => (
                                    <li key={index}>{item.name} – {item.weigth} (x{item.quantity})</li>
                                ))}
                            </ul>
                            <p className='font-bold text-lg text-blue-400 font-serif mt-4'>
                                Total: {getTotalPrice()} MAD
                            </p>
                        </div>
                    </div>

                    <form onSubmit={(e) => handleFormSubmistion(e)} className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='font-semibold'>Nom :</label>
                            <input type="text" ref={name} placeholder='Votre nom' className='outline-none rounded-md p-2 h-9 bg-yellow-300 text-black' />
                            <div ref={errorName} className={`${!isvalideName ? "block" : "hidden"} text-red-500 text-center text-xs mt-1`}>Ce champ est obligatoire</div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="lastName" className='font-semibold'>Prénom: </label>
                            <input type="text" ref={lastName} placeholder='Votre prénom' className='outline-none rounded-md p-2 h-9 bg-yellow-300 text-black' />
                            <div ref={errorLastName} className={`${!isvalideLast ? "block" : "hidden"} text-red-500 text-center text-xs mt-1`}>Ce champ est obligatoire</div>
                        </div>
                        <div className='flex flex-col md:col-span-2'>
                            <label htmlFor="phoneNumber" className='font-semibold'>Numéro de téléphone / WhatsApp:</label>
                            <input type="text" ref={phonenumber} placeholder='Votre numéro WhatsApp' className='outline-none rounded-md p-2 h-9 bg-yellow-300 text-black' />
                            <div ref={errroPhoneNumber} className={`${!isvalidePhone ? "block" : "hidden"} text-red-500 text-center text-xs mt-1`}>Veuillez entrer un numéro de téléphone valide</div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="city" className='font-semibold'>Ville: </label>
                            <input type="text" placeholder='Votre ville' ref={City} className='outline-none rounded-md p-2 h-9 bg-yellow-300 text-black' />
                            <div ref={errorCity} className={`${!isvalideCity ? "block" : "hidden"} text-red-500 text-center text-xs mt-1`}>Ce champ est obligatoire</div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="location" className='font-semibold'>Localisation: </label>
                            <input type="text" placeholder='Votre localisation' ref={location} title='Veuillez entrer une adresse de livraison complète' className='outline-none rounded-md p-2 h-9 bg-yellow-300 text-black' />
                            <div ref={errorLocation} className={`${!isvalideLocation ? "block" : "hidden"} text-red-500 text-center text-xs mt-1`}>Ce champ est obligatoire</div>
                        </div>
                        <div className='md:col-span-2 flex justify-center mt-4'>
                            <button type='submit' className='w-full text-black bg-gradient-to-tr from-yellow-300 to-amber-800 hover:opacity-80 transition-all duration-150 shadow-lg shadow-yellow-500/50 p-3 rounded-md font-sans font-semibold text-lg sm:text-xl'>
                                Confirmer
                            </button>
                        </div>
                    </form>
                </>
                :
                <div className='w-full h-full flex flex-col items-start justify-between text-white text-xl sm:text-2xl text-center p-8'>
                    <div className='w-full flex justify-end'>
                        <button onClick={() => {
                            comfirmedOrder(true);
                            setTimeout(() => {
                                setIsFormSended(false);
                            }, 200);
                        }} className='bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition-colors text-sm'>
                            Créer une nouvelle commande
                        </button>
                    </div>
                    <div className='mt-16'>
                        <h1 className='text-green-400 font-bold mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {respMessage}
                        </h1>
                    </div>
                </div>
            :
            <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-white p-8 text-center'>
                <h1 className='text-2xl sm:text-3xl font-bold text-red-500 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.021 3.373 1.865 3.373h14.47c1.844 0 2.73-1.873 1.865-3.373L13.715 4.704a1.88 1.88 0 00-3.432 0z" />
                    </svg>
                    Une erreur est survenue. Veuillez réessayer plus tard.
                </h1>
            </div>
        }
    </div>
</div>
);
}

export default ComfirmOrder
