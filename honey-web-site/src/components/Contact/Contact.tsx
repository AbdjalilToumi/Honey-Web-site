'use client';
import { useRef, useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLang } from '@/contexts/LangContext';

const Contact = () => {
  const { t } = useLang();
  const c = t.contact;

  const [resMessage, setResmessage] = useState<string | null>(null);
  const [isError, setIsError]       = useState(false);
  const [loading, setLoading]       = useState(false);

  const name    = useRef<HTMLInputElement>(null);
  const email   = useRef<HTMLInputElement>(null);
  const subject = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);
  const errorName  = useRef<HTMLSpanElement>(null);
  const errorEmail = useRef<HTMLSpanElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regEmail     = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const nameValue    = name.current!.value;
    const emailValue   = email.current!.value;
    const subjectValue = subject.current!.value;
    const messageValue = message.current!.value;

    if (!nameValue) { errorName.current!.textContent = c.errName; return; }
    if (!regEmail.test(emailValue)) { errorEmail.current!.textContent = c.errEmail; return; }

    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const resp = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameValue, email: emailValue, subject: subjectValue, message: messageValue }),
      });
      if (!resp.ok) throw new Error();
      const data = await resp.json();
      setResmessage(data);
      setIsError(false);
      setTimeout(() => window.location.reload(), 2500);
    } catch {
      setIsError(true);
      setResmessage(c.errServer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50">

      <section className="bg-stone-900 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span className="text-5xl">🍯</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">{c.heroTitle}</h1>
          <p className="font-body text-stone-400 text-lg">{c.heroDesc}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="flex flex-col gap-5">
            {[
              { icon: <FaWhatsapp size={20} />, title: c.whatsapp,     desc: c.whatsappDesc },
              { icon: <FaEnvelope size={20} />, title: c.emailTitle,   desc: c.emailDesc },
              { icon: <FaMapMarkerAlt size={20}/>,title: c.locationTitle,desc: c.locationDesc },
            ].map((item, i) => (
              <div key={i} className="card bg-white border border-amber-100 shadow-md">
                <div className="card-body gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">{item.icon}</div>
                  <h3 className="font-heading font-bold text-stone-800 text-lg">{item.title}</h3>
                  <p className="font-body text-stone-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {resMessage && (
              <div role="alert" className={`alert ${isError ? 'alert-error' : 'alert-success'} mb-6 font-body font-semibold`}>
                <span>{resMessage}</span>
              </div>
            )}
            <div className="card bg-white border border-amber-100 shadow-lg">
              <div className="card-body gap-6 p-8">
                <h2 className="font-heading text-2xl font-bold text-stone-800">{c.formTitle}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend font-body font-semibold text-stone-700">{c.name}</legend>
                      <input ref={name} type="text" placeholder={c.namePh} required
                        className="input input-bordered w-full focus:input-warning font-body"
                        onChange={() => { if (errorName.current) errorName.current.textContent = ''; }}
                      />
                      <span ref={errorName} className="fieldset-label text-error text-xs font-body" />
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend font-body font-semibold text-stone-700">{c.email}</legend>
                      <input ref={email} type="email" placeholder={c.emailPh} required
                        className="input input-bordered w-full focus:input-warning font-body"
                        onChange={() => { if (errorEmail.current) errorEmail.current.textContent = ''; }}
                      />
                      <span ref={errorEmail} className="fieldset-label text-error text-xs font-body" />
                    </fieldset>
                  </div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend font-body font-semibold text-stone-700">{c.subject}</legend>
                    <input ref={subject} type="text" placeholder={c.subjectPh} required className="input input-bordered w-full focus:input-warning font-body" />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend font-body font-semibold text-stone-700">{c.message}</legend>
                    <textarea ref={message} rows={6} placeholder={c.messagePh} required
                      className="textarea textarea-bordered w-full focus:textarea-warning font-body resize-y text-base" />
                  </fieldset>
                  <button type="submit" disabled={loading} className="btn btn-warning font-body font-bold text-amber-900 text-lg w-full mt-2">
                    {loading ? <><span className="loading loading-spinner loading-sm" /> {c.sending}</> : c.send}
                  </button>
                </form>
              </div>
            </div>
            <p className="font-body text-center text-sm text-stone-400 mt-4">{c.replyTime}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
