import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { movies } from '../data/config';
import { useNavigate } from 'react-router-dom';

const FilmReel = ({ onMovieClick }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Responsive page size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setItemsPerPage(2);
      } else if (w < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // Get current visible movies (with wrapping around)
  const visibleMovies = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (startIndex + i) % movies.length;
    visibleMovies.push(movies[index]);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header with Title and View All */}
      <div className="w-full flex justify-between items-end max-w-6xl mx-auto px-4">
        <div className="flex flex-col">
          <p className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
            Cinematic Influences
          </p>
          <h2 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Movies & Series
          </h2>
          <p className={`text-[10px] md:text-xs font-light mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            Escapes that entertain and leave a mark.
          </p>
        </div>

        <button
          onClick={() => navigate('/hobbies/movies')}
          className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group transition-colors duration-300 ${
            isDark ? 'text-purple-400/80 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
          }`}
        >
          View all ({movies.length * 5}) <span className="group-hover:translate-x-1 transition-transform inline-block">›</span>
        </button>
      </div>

      {/* Film Reel Body */}
      <div className="relative w-full max-w-6xl mx-auto px-12 flex items-center justify-center">
        
        {/* Navigation - Left Arrow */}
        <button
          onClick={handlePrev}
          className={`absolute left-2 z-30 p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
            isDark
              ? 'bg-black/40 border-white/10 hover:border-purple-500/30 text-white/70 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-white border-slate-200 hover:border-purple-300 text-slate-600 hover:text-purple-600 hover:shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Outer Reel Wrapper */}
        <div 
          className={`w-full py-6 px-4 md:px-8 rounded-2xl relative overflow-hidden flex flex-col gap-3 transition-all duration-500
            ${isDark 
              ? 'bg-white/[0.01] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)]'
              : 'bg-slate-50 border border-slate-200/60 shadow-[0_10px_25px_rgba(0,0,0,0.05)]'
            }`}
        >
          
          {/* Film Strip Plate (Container with Sprocket Holes and Glow) */}
          <div 
            className={`w-full py-4 md:py-6 px-1 rounded-xl relative flex flex-col justify-between overflow-hidden transition-all duration-500
              ${isDark 
                ? 'bg-[#121212]/80 border-y-2 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02),_inset_0_0_15px_rgba(0,0,0,0.8)]'
                : 'bg-slate-900 border-y-2 border-slate-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]'
              }`}
          >
            {/* Top Sprocket Holes */}
            <div className="w-full flex justify-between px-3 md:px-6 pointer-events-none opacity-80">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={`top-${i}`} 
                  className={`w-2.5 h-1.5 md:w-3.5 md:h-2.5 rounded-[2px] transition-colors duration-500
                    ${isDark ? 'bg-zinc-800' : 'bg-zinc-800'}`} 
                />
              ))}
            </div>

            {/* Mid Film Cells (Active items) */}
            <div className="my-4 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 px-2 md:px-4 z-10">
              {visibleMovies.map((movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  onClick={() => onMovieClick(movie)}
                  className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer shadow-md transform hover:-translate-y-2 transition-all duration-500 select-none"
                  style={{
                    boxShadow: isDark 
                      ? '0 10px 20px rgba(0,0,0,0.6), 0 0 10px rgba(168,85,247,0.1)'
                      : '0 8px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Poster Image */}
                  <img
                    src={movie.coverUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/95" />

                  {/* Film Border Accent Inside */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-purple-500/30 transition-colors duration-500" />

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end min-h-[60%]">
                    <span className="text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.2em] text-purple-400/90 mb-0.5">
                      {movie.type}
                    </span>
                    <h3 
                      className="text-xs md:text-sm font-black tracking-wide text-white leading-tight uppercase line-clamp-2"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {movie.title}
                    </h3>
                    
                    {/* Hover Extra Details */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden">
                      <p className="text-[9px] text-white/70 line-clamp-2 font-medium">
                        "{movie.quote}"
                      </p>
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-white/10 text-[8px] text-white/50 font-bold">
                        <span>{movie.year}</span>
                        <span className="text-yellow-400">★ {movie.rating}.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="w-full flex justify-between px-3 md:px-6 pointer-events-none opacity-80">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={`bot-${i}`} 
                  className={`w-2.5 h-1.5 md:w-3.5 md:h-2.5 rounded-[2px] transition-colors duration-500
                    ${isDark ? 'bg-zinc-800' : 'bg-zinc-800'}`} 
                />
              ))}
            </div>
            
            {/* Film Edge Light Leaks (Ambient Neon Strip) */}
            <div 
              className={`absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-700
                ${isDark 
                  ? 'bg-gradient-to-r from-transparent via-purple-500/35 to-transparent blur-[1px]' 
                  : 'bg-gradient-to-r from-transparent via-purple-400/20 to-transparent'
                }`} 
            />
            <div 
              className={`absolute top-0 left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-700
                ${isDark 
                  ? 'bg-gradient-to-r from-transparent via-purple-500/35 to-transparent blur-[1px]' 
                  : 'bg-gradient-to-r from-transparent via-purple-400/20 to-transparent'
                }`} 
            />

          </div>
          
          {/* Subtle Ambient Underglow */}
          <div 
            className={`w-[60%] h-3 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none blur-md rounded-full transition-opacity duration-700
              ${isDark ? 'bg-purple-500/10' : 'bg-purple-400/5'}`} 
          />

        </div>

        {/* Navigation - Right Arrow */}
        <button
          onClick={handleNext}
          className={`absolute right-2 z-30 p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
            isDark
              ? 'bg-black/40 border-white/10 hover:border-purple-500/30 text-white/70 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-white border-slate-200 hover:border-purple-300 text-slate-600 hover:text-purple-600 hover:shadow-sm'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default FilmReel;
