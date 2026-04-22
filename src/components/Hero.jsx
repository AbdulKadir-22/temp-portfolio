import React from 'react';
import { Sparkle } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';

const Hero = ({ theme }) => {
  const isDark = theme === 'dark';

  const socialLinks = [
    { icon: FaGithub, color: 'hover:text-white hover:border-white', label: 'Github' },
    { icon: FaLinkedinIn, color: 'hover:text-blue-400 hover:border-blue-400', label: 'LinkedIn' },
    { icon: FaXTwitter, color: 'hover:text-white hover:border-white', label: 'Twitter' },
    { icon: FaInstagram, color: 'hover:text-pink-400 hover:border-pink-400', label: 'Instagram' },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
      {/* Name Heading */}
      <div className="space-y-0 mb-8">
        <h1 className={`
          text-5xl md:text-7xl font-black tracking-[0.25em] uppercase font-['Orbitron']
          transition-colors duration-500
          ${isDark 
            ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
            : 'text-slate-900 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]'}
        `}>
          ABDULKADIR
        </h1>
        <h1 className={`
          text-5xl md:text-7xl font-black tracking-[0.25em] uppercase font-['Orbitron']
          transition-colors duration-500
          ${isDark 
            ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
            : 'text-slate-900 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]'}
        `}>
          SHAIKH
        </h1>
      </div>

      {/* Futuristic Divider */}
      <div className="relative w-full max-w-lg flex items-center justify-center my-10">
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-blue-500/50' : 'via-blue-400/50'} to-transparent`} />
        <div className={`mx-4 relative group`}>
          <Sparkle 
            size={24} 
            className={`
              transition-all duration-500
              ${isDark ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]'}
              group-hover:rotate-90 group-hover:scale-125
            `}
            fill="currentColor"
          />
          <div className={`absolute inset-0 animate-ping opacity-20 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            <Sparkle size={24} fill="currentColor" />
          </div>
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-blue-500/50' : 'via-blue-400/50'} to-transparent`} />
      </div>

      {/* Quote Section */}
      <div className="relative max-w-2xl mb-12">
        <span className="absolute -top-6 -left-8 text-4xl text-orange-400/40 font-serif">“</span>
        <p className={`
          text-lg md:text-xl font-light tracking-wide leading-relaxed
          transition-colors duration-500
          ${isDark ? 'text-slate-300' : 'text-slate-700'}
        `}>
          I want to become sun who shines other, 
          <br className="hidden md:block" />
          but am a meteor who only shines when he is falling.
        </p>
        <span className="absolute -bottom-10 -right-8 text-4xl text-orange-400/40 font-serif">”</span>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href="#"
            className={`
              w-12 h-12 flex items-center justify-center rounded-full border
              backdrop-blur-md transition-all duration-300
              ${isDark 
                ? 'bg-white/5 border-white/10 text-slate-400' 
                : 'bg-white/40 border-black/5 text-slate-600 shadow-sm'}
              ${social.color}
              hover:scale-110 hover:-translate-y-1
            `}
          >
            <social.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
