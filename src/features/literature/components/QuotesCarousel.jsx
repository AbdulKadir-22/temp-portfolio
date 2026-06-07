import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { quotes } from '../data/literatureData';

const QuotesCarousel = () => {
  const { isDark } = useTheme();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 280; // approximate card width including gap
      const offset = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className={isDark ? 'text-yellow-400' : 'text-blue-500'} />
          <h3
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Quotes
          </h3>
          <span className={`text-[10px] ${isDark ? 'text-white/30' : 'text-slate-400'}`}>View all &rsaquo;</span>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer
              ${isDark
                ? 'border-white/10 hover:border-yellow-400/50 hover:bg-white/[0.03] text-white/70 hover:text-white'
                : 'border-slate-200 hover:border-blue-500/50 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
              }
            `}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer
              ${isDark
                ? 'border-white/10 hover:border-yellow-400/50 hover:bg-white/[0.03] text-white/70 hover:text-white'
                : 'border-slate-200 hover:border-blue-500/50 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
              }
            `}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cards Viewport Container */}
      <div
        ref={scrollRef}
        className="w-full flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
      >
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className={`
              snap-start w-[240px] md:w-[260px] flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-lg border relative overflow-hidden transition-all duration-300 hover:-translate-y-1
              ${isDark ? 'shadow-black/45' : 'shadow-slate-200/50'}
            `}
            style={{
              minHeight: '280px',
              backgroundColor: '#fbf5e8',
              borderColor: 'rgba(120, 53, 4, 0.15)',
            }}
          >
            {/* Card Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />

            {/* Soft Light Shine Glow */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.8) 0%, transparent 100%)',
              }}
            />

            {/* Large quotation mark ornament */}
            <span
              className="text-amber-900/10 text-5xl font-serif leading-none absolute top-4 left-6 select-none z-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              “
            </span>

            {/* Quote content - centered vertically in the space */}
            <div className="flex-1 flex items-center justify-center w-full px-2 my-6 z-10">
              <p
                className="text-sm md:text-base italic font-medium leading-relaxed"
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#57534e'
                }}
              >
                {quote.text}
              </p>
            </div>

            {/* Quote Author / Footer */}
            <div className="w-full flex flex-col items-center gap-3 z-10">
              {/* Golden flourish */}
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-6 h-[1px]" style={{ backgroundImage: 'linear-gradient(to right, transparent, #b45309)' }} />
                <div className="w-1.5 h-1.5 rotate-45 border border-amber-700 bg-amber-500" />
                <div className="w-6 h-[1px]" style={{ backgroundImage: 'linear-gradient(to left, transparent, #b45309)' }} />
              </div>

              <span
                className="text-[9px] font-bold tracking-[0.2em] uppercase"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#78716c'
                }}
              >
                &mdash; {quote.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesCarousel;
