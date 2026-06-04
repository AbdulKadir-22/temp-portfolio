import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Star, Quote, Award, Film, Clapperboard } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { movies } from '../data/config';

const MovieDetailModal = ({ movie, onClose, onPrev, onNext }) => {
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

  if (!movie) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-purple-500 fill-purple-500" : "text-slate-300 dark:text-zinc-700"}
      />
    ));
  };

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
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-purple-300 hover:shadow-md'
          }`}
        title="Previous Item"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={onNext}
        className={`absolute right-2 sm:right-4 md:right-8 z-[105] p-2.5 sm:p-3 rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg
          ${isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-purple-300 hover:shadow-md'
          }`}
        title="Next Item"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Cinema-Ticket Style Body */}
      <div
        className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 scale-in select-text
          ${isDark 
            ? 'bg-[#0b0b0d]/90 border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
            : 'bg-slate-50 border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '85vh',
          height: '100%'
        }}
      >
        {/* Cinematic Backdrop Poster (Low Opacity Blurred Background) */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5 mix-blend-lighten dark:opacity-10 blur-xl"
          style={{ backgroundImage: `url(${movie.coverUrl})` }}
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
          
          {/* LEFT PANEL: Media details */}
          <div
            className={`w-full md:w-[45%] h-auto md:h-full p-6 sm:p-8 md:p-10 flex flex-col justify-start relative border-b md:border-b-0 md:border-r
              ${isDark ? 'border-zinc-800/40 bg-black/20' : 'border-slate-200/50 bg-slate-100/30'}`}
          >
            {/* Poster image container */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-6 mb-6">
              <div 
                className="w-36 h-52 sm:w-40 sm:h-56 md:w-44 md:h-64 rounded-lg overflow-hidden flex-shrink-0 relative transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              >
                <img
                  src={movie.coverUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Film frame style details */}
                <div className="absolute inset-0 border border-white/10" />
              </div>

              {/* Poster info */}
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex gap-2 mb-2 items-center flex-wrap">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                      ${isDark ? 'bg-purple-950/30 border-purple-800/40 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'}`}>
                      {movie.type}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                      ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                      {movie.year}
                    </span>
                  </div>
                  
                  <h2 
                    className={`text-xl sm:text-2xl font-black tracking-wide leading-tight mb-1 uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {movie.title}
                  </h2>
                  <p className={`text-xs font-semibold mb-3 ${isDark ? 'text-purple-400/80' : 'text-purple-600/80'}`}>
                    {movie.type === 'Series' ? 'Created' : 'Directed'} by {movie.creator}
                  </p>
                </div>

                {/* Rating & Metadata */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider`}>Rating:</span>
                    <div className="flex items-center gap-0.5">
                      {renderStars(movie.rating)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-dashed mt-2 pt-2.5 border-slate-200 dark:border-zinc-800">
                    <div className="flex flex-col">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Genre</span>
                      <span className="text-xs font-bold leading-tight line-clamp-1">{movie.genre}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Status</span>
                      <span className="text-xs font-bold leading-tight">Must Watch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Quote / Tagline */}
            {movie.quote && (
              <div 
                className={`p-4 rounded-xl border mt-auto flex gap-3 relative overflow-hidden
                  ${isDark 
                    ? 'bg-purple-950/15 border-purple-900/30 text-purple-300' 
                    : 'bg-purple-500/[0.04] border-purple-200 text-slate-700'
                  }`}
              >
                <Quote className="w-5 h-5 flex-shrink-0 text-purple-500 opacity-60 mt-0.5" />
                <p className="text-[11px] sm:text-xs leading-relaxed italic font-medium z-10">
                  "{movie.quote}"
                </p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Review & thoughts */}
          <div className="w-full md:w-[55%] h-auto md:h-full overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-start relative">
            <div className="flex items-center gap-2 mb-4">
              <Clapperboard className="w-4 h-4 text-purple-500" />
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                Story Premise
              </h4>
            </div>
            
            <p className={`text-[11px] sm:text-xs leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              {movie.about}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-purple-500" />
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                My Commentary
              </h4>
            </div>

            {/* Detailed Review */}
            <div className="mb-6 flex-1">
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-95 whitespace-pre-line">
                {movie.review}
              </p>
            </div>

            {/* Takeaway Block */}
            {movie.takeaway && (
              <div 
                className={`p-4 rounded-xl border mt-auto
                  ${isDark 
                    ? 'bg-purple-950/20 border-purple-900/30 text-purple-300' 
                    : 'bg-purple-50 border-purple-100 text-purple-800'
                  }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h5 className="text-[10px] font-extrabold uppercase tracking-wider">
                    Core Philosophy
                  </h5>
                </div>
                <p className="text-[11px] sm:text-xs leading-relaxed font-semibold">
                  {movie.takeaway}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900/60 text-[9px] font-bold tracking-widest uppercase opacity-35">
              <span>Cinema Archive</span>
              <span>Hobby Space · {movie.id}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
