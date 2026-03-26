'use client';
import Link from 'next/link';
import { FaLeaf, FaAward, FaTruck } from 'react-icons/fa';
import { GiHoneycomb } from 'react-icons/gi';
import { useLang } from '@/contexts/LangContext';

const Home = () => {
  const { t } = useLang();
  const h = t.home;

  const features = [
    { icon: <FaLeaf size={28} />,      title: h.f1Title, desc: h.f1Desc },
    { icon: <GiHoneycomb size={28} />, title: h.f2Title, desc: h.f2Desc },
    { icon: <FaAward size={28} />,     title: h.f3Title, desc: h.f3Desc },
    { icon: <FaTruck size={28} />,     title: h.f4Title, desc: h.f4Desc },
  ];

  const honeyTypes = [
    { name: h.h1Name, desc: h.h1Desc },
    { name: h.h2Name, desc: h.h2Desc },
    { name: h.h3Name, desc: h.h3Desc },
    { name: h.h4Name, desc: h.h4Desc },
  ];

  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/Hero.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
          <div className="badge badge-warning badge-lg font-body font-semibold tracking-widest uppercase text-amber-900 px-4 py-3">
            🐝 {h.badge}
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold leading-tight drop-shadow-xl">
            {h.heroTitle}<br />
            <span className="text-amber-400">{h.heroTitleSpan}</span> {h.heroEmoji}
          </h1>
          <p className="font-body text-base md:text-xl text-stone-200 max-w-2xl leading-relaxed">{h.heroDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 md:mt-6 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/products" className="btn border-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 btn-lg font-body font-bold text-amber-950 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 px-10 rounded-2xl h-14 sm:h-16 flex items-center justify-center">
              {h.ctaProducts}
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg font-body font-bold text-white border-2 border-white/80 hover:bg-white hover:text-amber-900 px-10 rounded-2xl h-14 sm:h-16 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center">
              {h.ctaAbout}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 animate-bounce z-20 pointer-events-none">
          <span className="font-body text-[10px] sm:text-xs tracking-widest uppercase">{h.scrollHint}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-amber-500 text-amber-950 py-10 px-6">
        <div className="max-w-5xl mx-auto stats stats-vertical sm:stats-horizontal shadow-none bg-transparent w-full">
          <div className="stat place-items-center">
            <div className="stat-value font-heading text-4xl">100%</div>
            <div className="stat-desc font-body text-amber-900 font-semibold text-sm mt-1">{h.statsNatural}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-value font-heading text-4xl">13+</div>
            <div className="stat-desc font-body text-amber-900 font-semibold text-sm mt-1">{h.statsProducts}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-value font-heading text-4xl">3+</div>
            <div className="stat-desc font-body text-amber-900 font-semibold text-sm mt-1">{h.statsGen}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-value font-heading text-4xl">🇲🇦</div>
            <div className="stat-desc font-body text-amber-900 font-semibold text-sm mt-1">Ifrane, Maroc</div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-amber-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800 mb-4">{h.whyTitle}</h2>
            <p className="font-body text-stone-500 text-lg max-w-xl mx-auto">{h.whyDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-amber-100">
                <div className="card-body items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">{f.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-stone-800">{f.title}</h3>
                  <p className="font-body text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Honey varieties ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-14">
          <div className="w-full lg:w-1/2">
            <img src="/section-2.jpeg" alt="Nos variétés de miel" className="w-full rounded-3xl shadow-2xl object-cover max-h-[500px]" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div>
              <div className="badge badge-outline badge-warning font-body font-semibold mb-3">{h.varietiesBadge}</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800 leading-tight">
                {h.varietiesTitle} <span className="text-amber-600">{h.varietiesTitleSpan}</span>
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              {honeyTypes.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 hover:border-amber-300 transition-colors">
                  <span className="text-2xl mt-0.5">🍯</span>
                  <div>
                    <p className="font-heading font-bold text-stone-800 text-lg">{item.name}</p>
                    <p className="font-body text-stone-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/products" className="btn btn-warning font-body font-bold text-amber-900 w-fit px-8">{h.seeAll}</Link>
          </div>
        </div>
      </section>

      {/* ── About CTA ── */}
      <section className="bg-stone-900 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="text-5xl">🐝</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">{h.whoTitle}</h2>
          <p className="font-body text-stone-400 text-lg leading-relaxed">{h.whoDesc}</p>
          <Link href="/about" className="btn btn-warning btn-lg font-body font-bold text-amber-900 px-10 hover:scale-105 transition-transform">
            {h.learnMore}
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Home;
