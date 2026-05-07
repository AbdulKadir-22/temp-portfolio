import React from 'react';
import planetBase from '../assets/planet-base.png';

const navItems = [
  { id: '01', label: 'ABOUT', subtext: 'Get to know me', color: 'blue', angle: -60, hue: 200 },
  { id: '02', label: 'SKILLS', subtext: 'What I\'m good at', color: 'gold', angle: -20, hue: 40 },
  { id: '03', label: 'PROJECTS', subtext: 'My work & creations', color: 'purple', angle: 20, hue: 280 },
  { id: '04', label: 'EXPERIENCE', subtext: 'My journey so far', color: 'cyan', angle: 60, hue: 180 },
  { id: '05', label: 'CONTACT', subtext: 'Let\'s connect', color: 'red', angle: 110, hue: 0 },
];

const Navigation = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-start lg:pl-[10%] select-none">
      {/* Central Planet Container */}
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        
        {/* Orbital Paths */}
        {[1.2, 1.5, 1.8].map((scale, i) => (
          <div 
            key={i}
            className={`absolute rounded-full border border-dashed transition-colors duration-700 ${
              isDark ? 'border-white/10' : 'border-blue-200/40'
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
            src={planetBase} 
            alt="Main Planet"
            className="w-full h-full object-contain mix-blend-screen transition-all duration-700 planet-animation"
            style={{ 
              filter: isDark 
                ? 'brightness(1.1) contrast(1.1) drop-shadow(0 0 30px rgba(100, 150, 255, 0.3))' 
                : 'brightness(0.9) contrast(1.2) hue-rotate(190deg) saturate(1.5)',
            }}
          />
          
          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className={`mb-2 transition-transform duration-500 hover:scale-110 cursor-pointer ${isDark ? 'text-white' : 'text-blue-900'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <h2 className={`text-2xl md:text-4xl font-black tracking-widest mb-1 ${isDark ? 'text-white' : 'text-blue-900'}`}>
              NAVIGATION
            </h2>
            <p className={`text-[10px] md:text-xs tracking-[0.3em] font-light ${isDark ? 'text-white/60' : 'text-blue-600/70'}`}>
              EXPLORE MY UNIVERSE
            </p>
          </div>
        </div>

        {/* Orbiting Planets */}
        {navItems.map((item, index) => {
          const radius = isDark ? 240 + (index * 15) : 220 + (index * 10); 
          const x = Math.cos((item.angle * Math.PI) / 180) * radius;
          const y = Math.sin((item.angle * Math.PI) / 180) * radius;

          return (
            <div 
              key={item.id}
              className="absolute z-20"
              style={{ 
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div 
                className="transition-all duration-500 hover:scale-110 group cursor-pointer orbit-item"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {/* Small Planet Container */}
                <div className="relative w-12 h-12 md:w-16 md:h-16">
                  <img 
                    src={planetBase} 
                    alt={item.label}
                    className="w-full h-full object-contain mix-blend-screen planet-animation"
                    style={{ 
                      filter: `hue-rotate(${item.hue}deg) brightness(${isDark ? 1.2 : 0.9}) saturate(2) contrast(1.1) ${
                        isDark ? `drop-shadow(0 0 15px ${item.color})` : ''
                      }`
                    }}
                  />
                  
                  {/* Label Container */}
                  <div 
                    className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 flex flex-col items-start whitespace-nowrap transition-all duration-300 opacity-80 group-hover:opacity-100`}
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
  );
};

export default Navigation;
