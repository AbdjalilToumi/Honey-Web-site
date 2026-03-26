'use client';
import { useCallback, useRef, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { FiUser, FiPhone, FiMapPin, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { useLang } from '@/contexts/LangContext';

const ComfirmOrder = ({
  isComfirmedOrder,
  comfirmedOrder,
}: {
  isComfirmedOrder: boolean;
  comfirmedOrder: (v: boolean) => void;
}) => {
  const { cart, getTotalPrice, resetCart } = useCart();
  const router = useRouter();
  const { t } = useLang();
  const cf = t.confirm;

  const [isvalideName,     setIsValideName]     = useState(true);
  const [isvalideLast,     setIsValideLast]     = useState(true);
  const [isvalidePhone,    setIsValidePhone]    = useState(true);
  const [isvalideCity,     setIsValideCity]     = useState(true);
  const [isvalideLocation, setIsValideLocation] = useState(true);
  const [isFormSended,     setIsFormSended]     = useState(false);
  const [respMessage,      setResmessage]       = useState('');
  const [serverStatue,     setServerStatues]    = useState(true);
  const [submitting,       setSubmitting]       = useState(false);

  const date          = new Date();
  const formattedDate = `${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')}/${date.getFullYear()}`;
  const phoneReg      = /^(?:\+212|0)([5-7]\d{8})$/;

  const name       = useRef<HTMLInputElement>(null);
  const lastName   = useRef<HTMLInputElement>(null);
  const phonenumber= useRef<HTMLInputElement>(null);
  const City       = useRef<HTMLInputElement>(null);
  const location   = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const namevalue     = name.current!.value;
    const lastNameValue = lastName.current!.value;
    const phoneValue    = phonenumber.current!.value;
    const cityValue     = City.current!.value;
    const locationValue = location.current!.value;

    let valid = true;
    if (!namevalue)     { setIsValideName(false);    setTimeout(() => setIsValideName(true),    2000); valid = false; }
    if (!lastNameValue) { setIsValideLast(false);    setTimeout(() => setIsValideLast(true),    2000); valid = false; }
    if (!cityValue)     { setIsValideCity(false);    setTimeout(() => setIsValideCity(true),    2000); valid = false; }
    if (!locationValue) { setIsValideLocation(false);setTimeout(() => setIsValideLocation(true),2000); valid = false; }
    if (!phoneReg.test(phoneValue)) { setIsValidePhone(false); setTimeout(() => setIsValidePhone(true), 2000); valid = false; }
    if (!valid) return;

    setSubmitting(true);
    try {
      const resp = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lastNameValue, lastName: namevalue, phoneNumber: phoneValue, city: cityValue, location: locationValue, products: cart, date: formattedDate }),
      });
      if (!resp.ok) throw new Error();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const data = await resp.json();
      setResmessage(data);
      setIsFormSended(true);
      resetCart();
      (e.target as HTMLFormElement).reset();
      router.push('/products');
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setServerStatues(false);
      setTimeout(() => { window.location.reload(); setServerStatues(true); }, 1500);
    } finally {
      setSubmitting(false);
    }
  }, [cart, formattedDate, resetCart, router]);

  if (!isComfirmedOrder) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 px-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-auto">

        {!serverStatue && (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <FiAlertTriangle size={56} className="text-error" />
            <h2 className="font-heading text-2xl font-bold text-error">{cf.errServer}</h2>
          </div>
        )}

        {serverStatue && isFormSended && (
          <div className="p-10 flex flex-col items-center gap-6 text-center">
            <FiCheckCircle size={64} className="text-success" />
            <h2 className="font-heading text-3xl font-bold text-stone-800">{cf.successTitle}</h2>
            <p className="font-body text-stone-500 text-lg">{respMessage}</p>
            <button
              onClick={() => { comfirmedOrder(true); setTimeout(() => setIsFormSended(false), 200); }}
              className="btn btn-warning font-body font-bold text-amber-900 px-8"
            >
              {cf.newOrder}
            </button>
          </div>
        )}

        {serverStatue && !isFormSended && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <span className="text-4xl">🍯</span>
              <h2 className="font-heading text-3xl font-bold text-stone-800 mt-2">{cf.title}</h2>
              <p className="font-body text-stone-500 mt-1 text-sm">{cf.subtitle}</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
              <p className="font-body text-xs text-stone-400 mb-2 uppercase tracking-widest">{cf.dateLabel} — {formattedDate}</p>
              <ul className="flex flex-col gap-1">
                {cart.map((item, i) => (
                  <li key={i} className="flex justify-between font-body text-sm text-stone-700">
                    <span>{item.name} – {item.weigth} ×{item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} MAD</span>
                  </li>
                ))}
              </ul>
              <div className="divider my-2" />
              <div className="flex justify-between font-heading font-bold text-amber-700 text-lg">
                <span>{cf.total}</span>
                <span>{getTotalPrice().toFixed(2)} MAD</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-body font-semibold text-stone-700 flex items-center gap-1"><FiUser size={13}/> {cf.nom}</legend>
                <input ref={name} type="text" placeholder={cf.nomPh} className={`input input-bordered w-full focus:input-warning font-body ${!isvalideName ? 'input-error' : ''}`} />
                {!isvalideName && <span className="fieldset-label text-error text-xs font-body">{cf.errRequired}</span>}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-body font-semibold text-stone-700 flex items-center gap-1"><FiUser size={13}/> {cf.prenom}</legend>
                <input ref={lastName} type="text" placeholder={cf.prenomPh} className={`input input-bordered w-full focus:input-warning font-body ${!isvalideLast ? 'input-error' : ''}`} />
                {!isvalideLast && <span className="fieldset-label text-error text-xs font-body">{cf.errRequired}</span>}
              </fieldset>

              <fieldset className="fieldset sm:col-span-2">
                <legend className="fieldset-legend font-body font-semibold text-stone-700 flex items-center gap-1"><FiPhone size={13}/> {cf.phone}</legend>
                <input ref={phonenumber} type="text" placeholder={cf.phonePh} className={`input input-bordered w-full focus:input-warning font-body ${!isvalidePhone ? 'input-error' : ''}`} />
                {!isvalidePhone && <span className="fieldset-label text-error text-xs font-body">{cf.errPhone}</span>}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-body font-semibold text-stone-700 flex items-center gap-1"><FiMapPin size={13}/> {cf.ville}</legend>
                <input ref={City} type="text" placeholder={cf.villePh} className={`input input-bordered w-full focus:input-warning font-body ${!isvalideCity ? 'input-error' : ''}`} />
                {!isvalideCity && <span className="fieldset-label text-error text-xs font-body">{cf.errRequired}</span>}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-body font-semibold text-stone-700 flex items-center gap-1"><FiMapPin size={13}/> {cf.adresse}</legend>
                <input ref={location} type="text" placeholder={cf.adressePh} className={`input input-bordered w-full focus:input-warning font-body ${!isvalideLocation ? 'input-error' : ''}`} />
                {!isvalideLocation && <span className="fieldset-label text-error text-xs font-body">{cf.errRequired}</span>}
              </fieldset>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
                <button type="submit" disabled={submitting} className="btn btn-warning flex-1 font-body font-bold text-amber-900 text-lg">
                  {submitting ? <><span className="loading loading-spinner loading-sm" /> {cf.submitting}</> : cf.submit}
                </button>
                <button type="button" onClick={() => comfirmedOrder(true)} className="btn btn-ghost font-body text-stone-500">
                  {cf.cancel}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComfirmOrder;
