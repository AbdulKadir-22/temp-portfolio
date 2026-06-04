import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Palette, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { paintings } from '../data/config';

const PaintingDetailModal = ({ painting, onClose, onPrev, onNext }) => {
  const { isDark } = useTheme();

  // Escape key and arrow key listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!painting) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Navigation Buttons (Left/Right) */}
      <button
        onClick={onPrev}
        className={`absolute left-2 sm:left-4 md:left-8 z-[105] p-2.5 sm:p-3 rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg
          ${isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-amber-300 hover:shadow-md'
          }`}
        title="Previous Art"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={onNext}
        className={`absolute right-2 sm:right-4 md:right-8 z-[105] p-2.5 sm:p-3 rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg
          ${isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-amber-300 hover:shadow-md'
          }`}
        title="Next Art"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Art Plaque Style Body */}
      <div
        className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 scale-in select-text
          ${isDark 
            ? 'bg-[#0f0e0c]/95 border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)]' 
            : 'bg-[#faf9f6] border border-slate-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '85vh',
          height: '100%'
        }}
      >
        {/* Gallery Spotlighting Ambient Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5 mix-blend-color-dodge dark:opacity-10 blur-xl"
          style={{ backgroundImage: `url(${painting.coverUrl})` }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-[110] p-1.5 sm:p-2 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95
            ${isDark
              ? 'bg-zinc-900/85 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white'
            }`}
          title="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden z-10">
          
          {/* LEFT PANEL: Framed Painting Canvas */}
          <div
            className={`w-full md:w-[50%] h-auto md:h-full p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r
              ${isDark ? 'border-zinc-800/40 bg-black/30' : 'border-slate-200/50 bg-slate-100/20'}`}
          >
            {/* Spotlight Cone Glow Overhead */}
            <div 
              className="absolute top-0 w-36 h-28 pointer-events-none opacity-30 mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at top, rgba(253,224,71,0.7) 0%, rgba(0,0,0,0) 80%)'
              }}
            />

            {/* Rich 3D Frame */}
            <div 
              className={`w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 rounded-sm relative overflow-hidden flex-shrink-0 transition-transform duration-500 hover:scale-[1.015]
                ${isDark
                  ? 'border-[10px] border-[#22150E] shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_3px_rgba(255,255,255,0.06)]'
                  : 'border-[10px] border-[#8a562b] shadow-[0_12px_25px_rgba(0,0,0,0.22),_inset_0_1px_2px_rgba(0,0,0,0.15)]'
                }`}
              style={{
                borderColor: isDark ? '#1e120c' : '#7c4c23',
                borderRadius: '3px'
              }}
            >
              {/* Inner gold fillet */}
              <div className="absolute inset-0.5 border-2 border-[#b89564] opacity-50 pointer-events-none" />

              {/* The painting cover */}
              <img
                src={painting.coverUrl}
                alt={painting.title}
                className="w-full h-full object-cover brightness-[94%]"
                loading="lazy"
              />

              {/* Canvas Texture overlay */}
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.14] mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-800 to-black" />
            </div>
          </div>

          {/* RIGHT PANEL: Artwork museum description plaque */}
          <div className="w-full md:w-[50%] h-auto md:h-full overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-start relative">
            
            {/* Plaque Header */}
            <div className="border-b border-dashed border-slate-200 dark:border-zinc-800 pb-4 mb-5">
              <div className="flex items-center gap-1.5 mb-1">
                <Palette className="w-4 h-4 text-amber-500" />
                <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                  Exhibition Plaque
                </span>
              </div>
              <h2 
                className={`text-xl sm:text-2xl font-black tracking-wide leading-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {painting.title}
              </h2>
              <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-amber-400/80' : 'text-amber-600/80'}`}>
                {painting.medium} · {painting.year}
              </p>
            </div>

            {/* Plaque Dimensions */}
            <div className="grid grid-cols-2 gap-4 mb-5 text-[11px] sm:text-xs">
              <div>
                <span className={`block text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Dimensions</span>
                <span className="font-bold">{painting.dimensions}</span>
              </div>
              <div>
                <span className={`block text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Style</span>
                <span className="font-bold">Contemporary Realism</span>
              </div>
            </div>

            {/* Work Description */}
            <div className="mb-5">
              <span className={`block text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'} mb-1.5`}>Description</span>
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-90">
                {painting.description}
              </p>
            </div>

            {/* Artist's thoughts / Story */}
            <div className="mb-6 flex-1">
              <span className={`block text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'} mb-1.5`}>Behind the Canvas</span>
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-95 italic whitespace-pre-line">
                "{painting.thoughts}"
              </p>
            </div>

            {/* Gallery Tag */}
            <div 
              className={`p-3.5 rounded-xl border mt-auto flex items-center gap-3
                ${isDark 
                  ? 'bg-amber-950/20 border-amber-900/30 text-amber-300' 
                  : 'bg-amber-50 border-amber-100 text-amber-800'
                }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-[10px] sm:text-[11px] leading-snug font-bold">
                Exhibited in the Virtual Space Collection. Acrylics, Oils, and digital brush studies.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900/60 text-[9px] font-bold tracking-widest uppercase opacity-35">
              <span>Art Plaque Gallery</span>
              <span>Hobby Space · {painting.id}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaintingDetailModal;
