import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Feather } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { poems } from '../data/literatureData';
import PoemModal from './PoemModal';

const PoemsCarousel = () => {
  const { isDark } = useTheme();
  const scrollRef = useRef(null);
  const [selectedPoem, setSelectedPoem] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 280; // approximate card width including gap
      const offset = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left animate-fadeIn">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between px-1 select-none">
        <div className="flex items-center gap-2">
          <Feather size={16} className={isDark ? 'text-yellow-400' : 'text-blue-500'} />
          <h3
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Poems
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
        {poems.map((poem) => (
          <div
            key={poem.id}
            onClick={() => setSelectedPoem(poem)}
            className={`
              snap-start w-[240px] md:w-[260px] flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-lg border relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer
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

            {/* Poem Title */}
            <h4
              className="text-lg md:text-xl italic font-semibold border-b pb-2 w-full z-10"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#451a03',
                borderColor: 'rgba(120, 53, 4, 0.1)'
              }}
            >
              {poem.title}
            </h4>

            {/* Poem Excerpt/Content */}
            <div
              className="my-5 text-xs md:text-sm font-light leading-relaxed w-full z-10"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#57534e'
              }}
            >
              {poem.content.map((line, idx) => (
                <p key={idx} className={line === '' ? 'h-3' : ''}>
                  {line}
                </p>
              ))}
            </div>

            {/* Card Footer (Gold Decorative flourish + Read button) */}
            <div className="w-full flex flex-col items-center gap-3 z-10">
              {/* Golden Separator Ornament */}
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-6 h-[1px]" style={{ backgroundImage: 'linear-gradient(to right, transparent, #b45309)' }} />
                <div className="w-1.5 h-1.5 rotate-45 border border-amber-700 bg-amber-500" />
                <div className="w-6 h-[1px]" style={{ backgroundImage: 'linear-gradient(to left, transparent, #b45309)' }} />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPoem(poem);
                }}
                className="text-[9px] font-bold tracking-[0.2em] uppercase hover:text-amber-800 transition-colors cursor-pointer"
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#78716c'
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Poem Plaque Detail Modal */}
      {selectedPoem && (
        <PoemModal
          poem={selectedPoem}
          onClose={() => setSelectedPoem(null)}
        />
      )}
    </div>
  );
};

export default PoemsCarousel;
