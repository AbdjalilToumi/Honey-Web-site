'use client';
import { FaLeaf, FaHeart, FaAward } from 'react-icons/fa';
import { GiHoneycomb } from 'react-icons/gi';
import { useLang } from '@/contexts/LangContext';

const About = () => {
  const { t } = useLang();
  const a = t.about;

  const values = [
    { icon: <FaLeaf size={22} />,      title: a.v1Title, desc: a.v1Desc },
    { icon: <GiHoneycomb size={22} />, title: a.v2Title, desc: a.v2Desc },
    { icon: <FaHeart size={22} />,     title: a.v3Title, desc: a.v3Desc },
    { icon: <FaAward size={22} />,     title: a.v4Title, desc: a.v4Desc },
  ];

  const commitments = [a.c1, a.c2, a.c3];

  return (
    <main className="min-h-screen bg-amber-50">

      <section className="bg-stone-900 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span className="text-6xl">🐝</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">
            {a.heroTitle} <span className="text-amber-400">{a.heroTitleSpan}</span>
          </h1>
          <p className="font-body text-stone-400 text-lg leading-relaxed">{a.heroDesc}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="badge badge-warning badge-lg font-body font-semibold text-amber-900">{a.storyBadge}</div>
            <h2 className="font-heading text-4xl font-bold text-stone-800 leading-snug">
              {a.storyTitle} <span className="text-amber-600">{a.storyTitleSpan}</span>
            </h2>
            <p className="font-body text-stone-600 text-lg leading-relaxed">{a.storyP1}</p>
            <p className="font-body text-stone-600 text-lg leading-relaxed">{a.storyP2}</p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="card bg-amber-500 text-amber-950 shadow-2xl">
              <div className="card-body gap-6">
                <h3 className="font-heading text-2xl font-bold">{a.commitTitle}</h3>
                <p className="font-body opacity-80">{a.commitDesc}</p>
                <ul className="flex flex-col gap-3">
                  {commitments.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="font-body font-medium">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4 max-w-5xl mx-auto px-6">
        <div className="flex-1 h-px bg-amber-200" />
        <span className="text-2xl">🍯</span>
        <div className="flex-1 h-px bg-amber-200" />
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-stone-800 mb-3">{a.valuesTitle}</h2>
            <p className="font-body text-stone-500 text-lg">{a.valuesDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card bg-white border border-amber-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="card-body items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">{v.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-stone-800">{v.title}</h3>
                  <p className="font-body text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
