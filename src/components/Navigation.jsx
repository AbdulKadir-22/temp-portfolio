import React, { useState, useEffect, useRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smoothly center the active item on navigation
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const activeElement = containerRef.current.querySelector('.active-nav-item');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentPage, isMobile]);

  if (isMobile) {
    const mobileNavItems = [
      { label: 'HOME', uiLabel: 'Home' },
      { label: 'RESUME', uiLabel: 'Resume' },
      { label: 'BLOGS', uiLabel: 'Blogs' },
      { label: 'SKILLS', uiLabel: 'Skills' },
      { label: 'PROJECTS', uiLabel: 'Projects' },
      { label: 'EXPERIENCE', uiLabel: 'Experience' },
      { label: 'HOBBIES', uiLabel: 'Hobbies' },
      { label: 'CONTACT', uiLabel: 'Contact' },
    ];

    return (
      <div
        ref={containerRef}
        className={`
          fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[500px] h-[82px] z-50
          rounded-2xl border backdrop-blur-lg select-none
          flex items-center justify-start gap-6 px-5 py-2.5 overflow-x-auto scrollbar-none
          transition-all duration-500 ease-in-out
          ${isDark
            ? 'bg-slate-950/75 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/60 border-slate-200/50 shadow-[0_8px_32px_rgba(31,38,135,0.08)]'
          }
        `}
      >
        {mobileNavItems.map((item) => {
          const isActive = currentPage === item.label;
          return (
            <div
              key={item.label}
              className={`
                flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 min-w-[56px] relative
                ${isActive ? 'active-nav-item' : ''}
              `}
              onClick={() => {
                if (onPageChange) onPageChange(item.label);
              }}
            >
              {/* Planet sphere */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                {isActive && (
                  <div
                    className={`
                      absolute -inset-1.5 rounded-full border border-blue-500/80 animate-pulse
                      shadow-[0_0_12px_rgba(59,130,246,0.6)]
                    `}
                  />
                )}
                <img
                  src={isActive ? planetBase : planetDark}
                  alt={item.uiLabel}
                  className={`
                    w-7.5 h-7.5 object-contain transition-all duration-300
                    ${isActive 
                      ? 'animate-footer-orbit' 
                      : 'opacity-65 hover:opacity-95'
                    }
                  `}
                  style={{
                    filter: isActive
                      ? 'brightness(1.35) saturate(1.8) contrast(1.1) drop-shadow(0 0 6px rgba(234,179,8,0.4))'
                      : 'brightness(0.95) saturate(1.1) contrast(1.05)',
                    animationDuration: '30s'
                  }}
                />
              </div>

              {/* Label */}
              <span
                className={`
                  text-[10px] tracking-wide transition-colors duration-300
                  ${isActive
                    ? isDark ? 'text-white font-semibold' : 'text-slate-800 font-semibold'
                    : isDark ? 'text-white/40 font-medium' : 'text-slate-400 font-medium'
                  }
                `}
              >
                {item.uiLabel}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop Orbit System
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-start select-none pointer-events-none">
      {/* Central Planet Container */}
      <div
        className="lg:w-[340px] lg:h-[340px] flex items-center justify-center transition-all duration-500 cursor-pointer relative w-[220px] h-[220px] pointer-events-auto"
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

          {/* Orbiting Planets */}
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
                    e.stopPropagation();
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
