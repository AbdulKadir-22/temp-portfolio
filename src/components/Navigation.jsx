import React, { useState, useEffect } from 'react';
import planetBase from '../assets/planet-base.png';
import planetDark from '../assets/planet-dark.png';

const navItems = [
  { id: '01', label: 'BLOGS', subtext: 'My story, my journey', color: '#3b82f6', angle: -85, hue: 215 },
  { id: '02', label: 'SKILLS', subtext: "What I'm good at", color: '#eab308', angle: -43, hue: 42 },
  { id: '03', label: 'PROJECTS', subtext: 'My work & creations', color: '#a855f7', angle: -1, hue: 285 },
  { id: '04', label: 'EXPERIENCE', subtext: 'My journey so far', color: '#06b6d4', angle: 41, hue: 175 },
  { id: '05', label: 'HOBBIES', subtext: 'Beyond the code', color: '#22c55e', angle: 83, hue: 140 },
  { id: '06', label: 'CONTACT', subtext: "Let's connect", color: '#ef4444', angle: 125, hue: 350 },
];

const Navigation = ({ theme, currentPage = 'HOME', onPageChange }) => {
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="select-none">
        {/* Closed State: Floating Glowing Mini Planet Menu Toggle */}
        {!isOpen && (
          <div 
            className="fixed bottom-6 left-6 w-14 h-14 z-50 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation menu"
          >
            <img
              src={isDark ? planetDark : planetBase}
              alt="Navigation Menu"
              className="w-full h-full object-contain planet-animation"
              style={{
                filter: isDark
                  ? 'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(100, 150, 255, 0.6))'
                  : 'brightness(0.9) contrast(1.2) hue-rotate(190deg) saturate(1.5) drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-[6px] font-bold tracking-widest ${isDark ? 'text-white/90' : 'text-blue-900/90'}`}>NAV</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={isDark ? 'text-white/90' : 'text-blue-900/90'}>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
        )}

        {/* Open State: Fullscreen Immersive Solar System Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-lg transition-all duration-500 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button top-left */}
            <button 
              className="absolute top-6 left-6 text-white/60 hover:text-white text-xs font-bold tracking-widest flex items-center gap-1.5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ✕ CLOSE
            </button>

            {/* Immersive Solar Menu */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center" onClick={e => e.stopPropagation()}>
              
              {/* Starry Orbit Ring Indicators */}
              {[1.0, 1.4].map((scale, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-dashed border-white/10"
                  style={{
                    width: `${100 * scale}%`,
                    height: `${100 * scale}%`,
                  }}
                />
              ))}

              {/* Center Main Planet */}
              <div 
                className="w-[120px] h-[120px] relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src={planetDark}
                  alt="Main Planet"
                  className="w-full h-full object-contain planet-animation"
                  style={{
                    filter: 'brightness(1.25) contrast(1.1) drop-shadow(0 0 30px rgba(100, 150, 255, 0.5))',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[7px] font-bold text-white/50 tracking-widest uppercase">CURRENT</span>
                  <h2 className="text-base font-black tracking-widest text-white leading-tight">{currentPage}</h2>
                  <p className="text-[6px] tracking-[0.2em] font-light text-white/40 uppercase">Tap to close</p>
                </div>
              </div>

              {/* Orbiting Solar Navigation Items (Fanned out in a perfect circle) */}
              {navItems.map((item, index) => {
                const angle = -90 + (index * 60); // 6 items distributed evenly (360 / 6 = 60 deg)
                const radius = 110; 
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div
                      className="flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group"
                      onClick={() => {
                        if (onPageChange) onPageChange(item.label);
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-11 h-11 relative">
                        <img
                          src={planetBase}
                          alt={item.label}
                          className="w-full h-full object-contain planet-animation"
                          style={{
                            filter: `hue-rotate(${item.hue}deg) brightness(1.35) saturate(2.2) contrast(1.1) drop-shadow(0 0 15px ${item.color}aa)`
                          }}
                        />
                      </div>
                      <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded border transition-colors duration-300 ${
                        currentPage === item.label
                          ? 'bg-white text-black border-white'
                          : 'bg-black/60 text-white/90 border-white/10 group-hover:border-white/40'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Orbit System
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-start select-none">
      {/* Central Planet Container */}
      <div 
        className="lg:w-[340px] lg:h-[340px] flex items-center justify-center transition-all duration-500 cursor-pointer relative w-[220px] h-[220px]"
        onClick={() => {
          if (onPageChange) {
            onPageChange('HOME');
          }
        }}
      >

        {/* Orbital Paths */}
        {[1.2, 1.5, 1.8].map((scale, i) => (
          <div
            key={i}
            className={`absolute rounded-full border border-dashed transition-colors duration-700 ${isDark ? 'border-white/10' : 'border-blue-200/40'
              }`}
            style={{
              width: `${100 * scale}%`,
              height: `${100 * scale}%`,
              opacity: 1 - (i * 0.2)
            }}
          />
        ))}

        {/* Central Planet */}
        <div className="relative z-10 w-full h-full">
          <img
            src={isDark ? planetDark : planetBase}
            alt="Main Planet"
            className="w-full h-full object-contain mix-blend-screen transition-all duration-700 planet-animation"
            style={{
              filter: isDark
                ? 'brightness(1.2) contrast(1.1) drop-shadow(0 0 40px rgba(100, 150, 255, 0.4))'
                : 'brightness(0.9) contrast(1.2) hue-rotate(190deg) saturate(1.5)',
            }}
          />

          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className={`mb-1 transition-transform duration-500 hover:scale-110 cursor-pointer ${isDark ? 'text-white' : 'text-blue-900'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <h2 className={`text-xl md:text-2xl font-black tracking-widest mb-0.5 ${isDark ? 'text-white' : 'text-blue-900'}`}>
              {currentPage}
            </h2>
            <p className={`text-[8px] md:text-[9px] tracking-[0.3em] font-light ${isDark ? 'text-white/60' : 'text-blue-600/70'}`}>
              EXPLORE MY UNIVERSE
            </p>
          </div>

          {/* Orbiting Planets (Moved inside central planet container to fix desktop alignment) */}
          {navItems.map((item, index) => {
            const angle = item.angle;
            const radius = isDark ? 210 + (index * 10) : 200 + (index * 8); 
              
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={item.id}
                className="absolute z-20 scale-100 opacity-100"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className="transition-all duration-500 hover:scale-110 group cursor-pointer orbit-item"
                  style={{ animationDelay: `${index * 0.5}s` }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling to central planet
                    console.log('Clicked planet:', item.label);
                    if (onPageChange) onPageChange(item.label);
                  }}
                >
                  {/* Small Planet Container */}
                  <div className="relative w-10 h-10 md:w-14 md:h-14">
                    <img
                      src={planetBase}
                      alt={item.label}
                      className="w-full h-full object-contain mix-blend-screen planet-animation"
                      style={{
                        filter: `hue-rotate(${item.hue}deg) brightness(${isDark ? 1.3 : 0.9}) saturate(${isDark ? 2.5 : 1.5}) contrast(1.1) ${isDark ? `drop-shadow(0 0 20px ${item.color}88)` : ''
                          }`
                      }}
                    />

                    {/* Label Container */}
                    <div
                      className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex flex-col items-start whitespace-nowrap transition-all duration-500 pointer-events-none opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold ${isDark ? 'text-white/40' : 'text-blue-400'}`}>{item.id}</span>
                        <h3 className={`text-xs md:text-sm font-black tracking-wider ${isDark ? 'text-white' : 'text-blue-900'}`}>{item.label}</h3>
                      </div>
                      <p className={`text-[9px] md:text-[10px] font-medium tracking-tight ${isDark ? 'text-white/50' : 'text-blue-600/60'}`}>{item.subtext}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
