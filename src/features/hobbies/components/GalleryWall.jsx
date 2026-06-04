import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { paintings } from '../data/config';
import { useNavigate } from 'react-router-dom';

const GalleryWall = ({ onPaintingClick }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(5);

  // Responsive page size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setItemsToShow(2);
      } else if (w < 1024) {
        setItemsToShow(3);
      } else {
        setItemsToShow(5);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedPaintings = paintings.slice(0, itemsToShow);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header with Title and View All */}
      <div className="w-full flex justify-between items-end max-w-6xl mx-auto px-4">
        <div className="flex flex-col">
          <p className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            Visual Creations
          </p>
          <h2 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Paintings & Sketches
          </h2>
          <p className={`text-[10px] md:text-xs font-light mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            Where colors speak louder than words.
          </p>
        </div>

        <button
          onClick={() => navigate('/hobbies/paintings')}
          className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group transition-colors duration-300 ${
            isDark ? 'text-amber-400/80 hover:text-amber-300' : 'text-amber-600 hover:text-amber-800'
          }`}
        >
          View all ({paintings.length * 3}) <span className="group-hover:translate-x-1 transition-transform inline-block">›</span>
        </button>
      </div>

      {/* Virtual Gallery Wall Frame */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-12 flex flex-col items-center select-none">
        
        {/* Gallery Wall Content */}
        <div 
          className={`w-full pt-12 pb-4 px-4 md:px-10 rounded-2xl relative flex flex-col items-center justify-end overflow-hidden transition-all duration-500
            ${isDark 
              ? 'bg-zinc-950/20 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_15px_35px_rgba(0,0,0,0.5)]'
              : 'bg-slate-50 border border-slate-200/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)]'
            }`}
        >
          {/* Subtly repeating vertical wall panels/boards for realistic gallery background */}
          <div className={`absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:80px_100%]`} />

          {/* Spotlight Overhead Ambient Glow Grid */}
          <div className="absolute inset-x-0 top-0 h-44 flex justify-around pointer-events-none opacity-40 dark:opacity-60">
            {displayedPaintings.map((p, idx) => (
              <div 
                key={`glow-${p.id}`} 
                className={`w-40 h-full rounded-full blur-2xl transition-all duration-500
                  ${isDark ? 'bg-amber-300/10' : 'bg-amber-100/30'}`}
                style={{ transform: 'translateY(-30%) scale(1.5)' }}
              />
            ))}
          </div>

          {/* Exhibition Row */}
          <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 relative z-10 px-4 md:px-12 h-64 sm:h-72 md:h-80 pb-1">
            
            {/* DECOR: Potted Plant on Left (Desktop only - sway on hover) */}
            <div 
              className={`hidden lg:flex flex-col items-center justify-end absolute left-2 bottom-0 w-12 z-20 pointer-events-auto cursor-pointer 
                transition-all duration-500 hover:rotate-6 origin-bottom opacity-85 dark:opacity-75`}
              title="Touch of green"
            >
              <svg viewBox="0 0 100 120" className="w-12 h-16 text-emerald-800 dark:text-emerald-700/80 fill-current drop-shadow-md">
                {/* Pot */}
                <path d="M25 80 L75 80 L65 115 L35 115 Z" fill="#8d5b4c" />
                <rect x="20" y="75" width="60" height="6" rx="2" fill="#7a4b3d" />
                {/* Soil */}
                <ellipse cx="50" cy="78" rx="23" ry="3" fill="#3a221a" />
                {/* Leaves */}
                <path d="M50 75 Q40 40 15 45 Q35 30 50 75" />
                <path d="M50 75 Q60 40 85 45 Q65 30 50 75" />
                <path d="M50 75 Q35 25 25 15 Q40 10 50 75" />
                <path d="M50 75 Q65 25 75 15 Q60 10 50 75" />
                <path d="M50 75 Q50 20 50 5 Q55 20 50 75" />
              </svg>
            </div>

            {/* Framed Canvases */}
            {displayedPaintings.map((painting, index) => (
              <div
                key={painting.id}
                onClick={() => onPaintingClick(painting)}
                className="flex flex-col items-center relative group cursor-pointer transition-all duration-500 select-none flex-1 max-w-[130px] sm:max-w-[150px] md:max-w-[170px]"
              >
                {/* Picture Light Fixture */}
                <div className="absolute top-[-26px] flex flex-col items-center z-20 pointer-events-none">
                  {/* Horizontal cylinder lamp tube */}
                  <div className={`w-8 h-2 rounded-full border transition-colors duration-300
                    ${isDark ? 'bg-zinc-700 border-zinc-600' : 'bg-slate-300 border-slate-400'}`}
                    style={{
                      boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 1px 2px rgba(0,0,0,0.15)'
                    }}
                  />
                  {/* Curved arm stem */}
                  <div className={`w-[2px] h-4 ${isDark ? 'bg-zinc-600' : 'bg-slate-400'}`} />
                  
                  {/* Mounting bracket on top of the frame */}
                  <div className={`w-2 h-1 rounded-[1px] ${isDark ? 'bg-zinc-800' : 'bg-slate-500'}`} />
                </div>

                {/* Spreading trapezoid spotlight beam casting down */}
                <div 
                  className="absolute top-[-20px] w-36 h-48 pointer-events-none mix-blend-screen opacity-15 dark:opacity-25 transition-all duration-500 group-hover:opacity-30 dark:group-hover:opacity-40"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(253, 224, 71, 0.4) 0%, rgba(253, 224, 71, 0.08) 55%, transparent 100%)',
                    clipPath: 'polygon(35% 0%, 0% 100%, 100% 100%, 65% 0%)',
                    zIndex: 15
                  }}
                />

                {/* The 3D Framed Canvas */}
                <div
                  className={`w-full aspect-[3/4] rounded-sm relative overflow-hidden transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-[1.04]
                    ${isDark
                      ? 'bg-zinc-900 border-4 shadow-[0_12px_22px_rgba(0,0,0,0.65),_inset_0_1px_4px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.85),_0_0_15px_rgba(251,191,36,0.1)]'
                      : 'bg-white border-4 shadow-[0_10px_18px_rgba(0,0,0,0.18),_inset_0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.28),_0_0_12px_rgba(251,191,36,0.08)]'
                    }`}
                  style={{
                    borderRadius: '2px',
                    borderColor: isDark ? '#2e1e15' : '#a87543',
                  }}
                >
                  {/* Gold Fillet Inner Border */}
                  <div className="absolute inset-0.5 border border-[#c5a880] opacity-40 pointer-events-none" />

                  {/* Artwork Image */}
                  <img
                    src={painting.coverUrl}
                    alt={painting.title}
                    className="w-full h-full object-cover transition-all duration-700 brightness-[88%] group-hover:brightness-[100%] contrast-[103%]"
                    loading="lazy"
                  />

                  {/* Glass Reflection glare */}
                  <div 
                    className="absolute inset-0 opacity-15 dark:opacity-5 pointer-events-none transition-transform duration-700 group-hover:translate-x-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)'
                    }}
                  />

                  {/* Spotlight overlay mask */}
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 dark:opacity-20"
                    style={{
                      background: 'radial-gradient(circle at top, rgba(253,224,71,0.8) 0%, rgba(0,0,0,0) 80%)'
                    }}
                  />
                  
                  {/* Canvas Texture Overlay */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-800 to-black" />
                </div>

                {/* Subtitle / Title Plaque (Styled like brass/gold exhibition label) */}
                <div 
                  className={`mt-3.5 px-3 py-1 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-center line-clamp-1 border transition-all duration-300
                    ${isDark
                      ? 'bg-gradient-to-r from-[#b38e55]/90 to-[#92713d]/90 border-[#856333]/40 text-[#fffbeb] shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:border-[#cda66e]/60 group-hover:text-white'
                      : 'bg-gradient-to-r from-[#dfc193] to-[#cba36f] border-[#b08753] text-[#3c2a13] shadow-[0_2px_3px_rgba(0,0,0,0.12)] group-hover:border-[#966b37]'
                    }`}
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: isDark ? '0 1px 1px rgba(0,0,0,0.4)' : 'none'
                  }}
                >
                  {painting.title}
                </div>
              </div>
            ))}

            {/* DECOR: Paintbrushes Jar on Right (Desktop only - sway on hover) */}
            <div 
              className={`hidden lg:flex flex-col items-center justify-end absolute right-2 bottom-0 w-12 z-20 pointer-events-auto cursor-pointer 
                transition-all duration-500 hover:-rotate-6 origin-bottom opacity-85 dark:opacity-75`}
              title="Creative tools"
            >
              <svg viewBox="0 0 100 120" className="w-12 h-16 text-zinc-400 dark:text-zinc-600/80 fill-current drop-shadow-md">
                {/* Brushes */}
                <line x1="35" y1="20" x2="45" y2="75" stroke="#a3765d" strokeWidth="4" />
                <polygon points="30,10 40,10 37,22 33,22" fill="#2d2d2d" />
                
                <line x1="50" y1="15" x2="50" y2="75" stroke="#a3765d" strokeWidth="4" />
                <polygon points="46,5 54,5 52,17 48,17" fill="#1b4d3e" />
                
                <line x1="65" y1="25" x2="55" y2="75" stroke="#8d5b4c" strokeWidth="3" />
                <polygon points="62,17 68,17 66,27 64,27" fill="#8b2500" />
                
                {/* Jar */}
                <rect x="35" y="70" width="30" height="45" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                <ellipse cx="50" cy="70" rx="15" ry="3" fill="#cbd5e1" />
                {/* Watercolor details inside jar */}
                <path d="M37 90 Q50 93 63 90 L63 112 Q50 115 37 112 Z" fill="#93c5fd" opacity="0.4" />
              </svg>
            </div>

          </div>

          {/* Wooden Shelf Board Running Underneath */}
          <div 
            className={`w-full h-3 rounded-md relative z-25
              ${isDark
                ? 'bg-gradient-to-b from-[#301e14] to-[#1a100c] border-t border-amber-800/10'
                : 'bg-gradient-to-b from-[#b8854c] to-[#916132] border-t border-white/20'
              }`}
            style={{
              boxShadow: isDark
                ? '0 2px 0 #0e0a07, 0 10px 14px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.04)'
                : '0 2px 0 #734c26, 0 8px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.3)'
            }}
          >
            {/* Shelf shadow projection on the wall */}
            <div 
              className="absolute left-0 right-0 top-full h-8 opacity-50 dark:opacity-75 pointer-events-none animate-fadeIn"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default GalleryWall;
