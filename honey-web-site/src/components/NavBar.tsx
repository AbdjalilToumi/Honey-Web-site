'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';
import LanguageSwitcher from './LanguageSwitcher';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  const links = [
    { href: '/',         label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/about',    label: t.nav.about },
    { href: '/contact',  label: t.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-amber-50/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="navbar max-w-7xl mx-auto px-4 md:px-8 min-h-16">

          {/* Logo */}
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/logo.png" alt="Ifrane Miel logo" width={44} height={44} className="rounded-full ring-2 ring-amber-300 group-hover:ring-amber-500 transition-all" />
              <span className="font-heading text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-400 bg-clip-text text-transparent tracking-wide">
                Ifrane Miel
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <nav className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-1 p-0">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`font-body font-semibold text-base rounded-lg transition-all duration-200
                      ${pathname === href
                        ? 'text-amber-700 bg-amber-100'
                        : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: lang switcher + cart + burger */}
          <div className="navbar-end flex items-center gap-1">
            <LanguageSwitcher />
            <Link href="/cart" className="btn btn-ghost btn-circle text-stone-700 hover:text-amber-700 hover:bg-amber-100">
              <PiShoppingCartSimpleBold size={24} />
            </Link>
            <button
              className="btn btn-ghost btn-circle md:hidden text-stone-700"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <HiMenuAlt3 size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={`fixed top-0 right-0 z-[70] h-full w-72 bg-amber-50 shadow-2xl flex flex-col
        transition-transform duration-300 ease-in-out md:hidden
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-amber-200">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={36} height={36} className="rounded-full" />
            <span className="font-heading font-bold text-lg text-amber-700">Ifrane Miel</span>
          </Link>
          <button className="btn btn-ghost btn-circle text-stone-600" onClick={() => setOpen(false)}>
            <HiX size={24} />
          </button>
        </div>

        <ul className="menu p-4 gap-1 flex-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`font-body font-semibold text-base rounded-xl py-3
                  ${pathname === href
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="font-body font-semibold text-base rounded-xl py-3 text-stone-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
            >
              <span>{t.nav.cart}</span>
              <PiShoppingCartSimpleBold size={22} />
            </Link>
          </li>
        </ul>

        {/* Language switcher inside drawer */}
        <div className="p-4 border-t border-amber-200 flex justify-center">
          <LanguageSwitcher />
        </div>

        <div className="pb-5 text-xs text-stone-400 text-center">© 2024 Ifrane Miel</div>
      </aside>
    </>
  );
};

export default NavBar;
