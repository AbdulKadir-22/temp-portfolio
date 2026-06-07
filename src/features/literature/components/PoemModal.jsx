import React, { useEffect } from 'react';
import { X, Feather } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const PoemModal = ({ poem, onClose }) => {
  const { isDark } = useTheme();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!poem) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none animate-fadeIn">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Parchment Plaque Modal Box */}
      <div
        className={`
          relative w-full max-w-md rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl border overflow-hidden select-text z-10
          transition-transform duration-300 scale-in
          ${isDark ? 'shadow-black/60' : 'shadow-slate-800/30'}
        `}
        style={{
          backgroundColor: '#fbf5e8',
          borderColor: 'rgba(120, 53, 4, 0.2)',
          maxHeight: '85vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />

        {/* Soft radial shine */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.8) 0%, transparent 100%)',
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-1.5 rounded-xl border border-amber-900/10 text-stone-500 hover:text-amber-900 hover:bg-amber-900/5 cursor-pointer transition-all duration-200"
          title="Close"
        >
          <X size={16} />
        </button>

        {/* Decorative Top Ornament */}
        <div className="flex items-center gap-2 mb-3 text-amber-800/40 select-none">
          <Feather size={14} className="transform -rotate-45" />
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Poem Plaque
          </span>
          <Feather size={14} className="transform rotate-45" />
        </div>

        {/* Scrollable Poem Content Panel */}
        <div className="w-full flex-1 overflow-y-auto pr-1 my-4 flex flex-col items-center justify-center">
          {/* Poem Title */}
          <h2
            className="text-2xl md:text-3xl italic font-semibold border-b pb-3 w-full"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#451a03',
              borderColor: 'rgba(120, 53, 4, 0.1)',
            }}
          >
            {poem.title}
          </h2>

          {/* Poem Lines */}
          <div
            className="my-6 text-sm md:text-base font-light leading-relaxed w-full whitespace-pre-wrap"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#57534e',
            }}
          >
            {poem.content.map((line, idx) => (
              <p key={idx} className={line === '' ? 'h-4' : 'my-1'}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Card Footer (Gold Decorative flourish) */}
        <div className="w-full flex flex-col items-center gap-2 select-none mt-auto">
          {/* Golden flourish */}
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-8 h-[1px]" style={{ backgroundImage: 'linear-gradient(to right, transparent, #b45309)' }} />
            <div className="w-1.5 h-1.5 rotate-45 border border-amber-700 bg-amber-500" />
            <div className="w-8 h-[1px]" style={{ backgroundImage: 'linear-gradient(to left, transparent, #b45309)' }} />
          </div>

          <span
            className="text-[8px] font-bold tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: '#78716c',
            }}
          >
            Celestial Literature Collection
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoemModal;
