'use client';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={44} height={44} className="rounded-full ring-2 ring-amber-500" />
            <span className="font-heading text-2xl font-bold text-amber-400 tracking-wide uppercase">Ifrane Miel</span>
          </Link>
          <p className="font-body text-sm text-stone-400 max-w-xs leading-relaxed">{t.footer.tagline}</p>
          <p className="font-body text-xs text-stone-600">{t.footer.copyright}</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <span className="font-heading text-sm font-bold text-amber-400 tracking-widest uppercase mb-1">{t.footer.discover}</span>
          <Link href="/products" className="link link-hover font-body text-stone-400 hover:text-amber-400 transition-colors">{t.nav.products}</Link>
          <Link href="/about"    className="link link-hover font-body text-stone-400 hover:text-amber-400 transition-colors">{t.nav.about}</Link>
          <Link href="/contact"  className="link link-hover font-body text-stone-400 hover:text-amber-400 transition-colors">{t.nav.contact}</Link>
          <Link href="/cart"     className="link link-hover font-body text-stone-400 hover:text-amber-400 transition-colors">{t.nav.cart}</Link>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center sm:items-start gap-3 sm:col-span-2 lg:col-span-1">
          <span className="font-heading text-sm font-bold text-amber-400 tracking-widest uppercase mb-1">{t.footer.follow}</span>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=61581583350372" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="btn btn-ghost btn-circle text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/manahilifrane1?igsh=bmk3bTJvcnMwN3Vp" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="btn btn-ghost btn-circle text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://maps.app.goo.gl/b6PWzRTpK7zSos8J6" target="_blank" rel="noopener noreferrer" aria-label="Localisation"
              className="btn btn-ghost btn-circle text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors">
              <FaLocationDot size={20} />
            </a>
          </div>
          <p className="font-body text-xs text-stone-500">{t.footer.location}</p>
        </div>

      </div>

      <div className="border-t border-stone-800 py-4 px-6 text-center">
        <p className="font-body text-xs text-stone-600">{t.footer.madeWith}</p>
      </div>
    </footer>
  );
};

export default Footer;
