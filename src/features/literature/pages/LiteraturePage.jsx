import React from 'react';
import { Feather, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { literatureConfig } from '../data/literatureData';
import FeaturedBook from '../components/FeaturedBook';
import CurrentlyWriting from '../components/CurrentlyWriting';
import PoemsCarousel from '../components/PoemsCarousel';
import QuotesCarousel from '../components/QuotesCarousel';
import moonCloudsBg from '../../../assets/moon_clouds_bg.png';

const LiteraturePage = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="literature-page"
      className="w-full max-w-[95vw] xl:max-w-[1440px] mx-auto px-4 flex flex-col items-center gap-8 py-4 select-none"
    >
      {/* ── Page Header ── */}
      <header className="flex flex-col items-center mb-2 text-center animate-fadeIn select-none">
        <div className="flex items-center gap-3">
          <Feather
            className={isDark ? 'text-yellow-400' : 'text-blue-500'}
            size={24}
          />
          <h1
            className="text-3xl sm:text-4xl md:text-5xl tracking-wide font-semibold"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: isDark ? '#f8fafc' : '#0f172a',
            }}
          >
            {literatureConfig.pageTitle}
          </h1>
        </div>
        <p
          className={`text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold mt-3 ${isDark ? 'text-white/40' : 'text-slate-500'
            }`}
        >
          {literatureConfig.pageSubtitle}
        </p>
      </header>

      {/* ── Page Content Container ── */}
      {/* Offsets content on desktop to clear the orbital menu on the left side */}
      <div className="w-full lg:pl-[240px] xl:pl-[280px] flex flex-col gap-8 items-stretch justify-start animate-slideUp">

        {/* Row 1: Featured Book (Full Width) */}
        <div className="w-full">
          <FeaturedBook />
        </div>

        {/* Row 2: Currently Writing (Full Width) */}
        <div className="w-full">
          <CurrentlyWriting />
        </div>

        {/* Row 2: Poems + Quotes + Floating Quote Card */}
        <div className="w-full flex flex-col gap-6">
          {/* Poems (Carousel) - full width row */}
          <div className="w-full">
            <PoemsCarousel />
          </div>

          {/* Quotes (Carousel) - full width row */}
          <div className="w-full">
            <QuotesCarousel />
          </div>

          {/* Moon Quote Card - full width row */}
          <div className="w-full min-h-[280px]">
            <div
              className="w-full h-full rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-500 group hover:scale-[1.01]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${moonCloudsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Sparkles icon decoration top right */}
              <div className="absolute top-4 right-4 text-yellow-400/60 group-hover:text-yellow-400 transition-colors duration-500">
                <Sparkles size={16} />
              </div>

              {/* Quote centered */}
              <div className="flex-1 flex items-center justify-center pt-8">
                <p
                  className="text-lg md:text-xl italic font-medium leading-relaxed text-center text-white/90"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  I write to understand the universe outside, and the chaos inside.
                </p>
              </div>

              {/* Author */}
              <div className="flex flex-col items-center mt-6">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-2" />
                <span
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-yellow-400/80"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  &mdash; Zeron
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <footer className="w-full flex flex-col items-center gap-2 mt-6 select-none opacity-45">
        <div
          className={`w-5 h-8 rounded-full border-2 flex justify-center py-1.5 ${isDark ? 'border-white/30' : 'border-slate-400'
            }`}
        >
          <div className={`w-1 h-2 rounded-full scroll-indicator-icon ${isDark ? 'bg-white' : 'bg-slate-500'}`} />
        </div>
        <span
          className={`text-[7px] font-black tracking-[0.25em] uppercase ${isDark ? 'text-white/60' : 'text-slate-600'
            }`}
        >
          Scroll To Explore
        </span>
      </footer>
    </section>
  );
};

export default LiteraturePage;
