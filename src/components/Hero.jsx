import React, { createElement } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { icon: FaGithub, label: 'GitHub', color: 'gold' },
  { icon: FaLinkedinIn, label: 'LinkedIn', color: 'blue' },
  { icon: FaXTwitter, label: 'Twitter', color: 'blue' },
  { icon: FaInstagram, label: 'Instagram', color: 'gold' },
];

const Hero = ({ theme }) => {
  const isDark = theme === 'dark';
  
  const titleStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 900,
    lineHeight: '0.95',
    backgroundImage: isDark ? 'linear-gradient(180deg, #f7fbff 0%, #c6dcff 48%, #eef5ff 100%)' : 'none',
    WebkitBackgroundClip: isDark ? 'text' : 'initial',
    backgroundClip: isDark ? 'text' : 'initial',
    color: isDark ? 'transparent' : '#233f83',
    textShadow: isDark ? 'none' : '0 4px 12px rgba(106, 143, 225, 0.2)',
  };

  return (
    <section className="flex flex-col items-center text-center px-4 w-full max-w-xl scale-[0.95]">
      <header className="mb-4">
        {['ABDULKADIR', 'SHAIKH'].map((name, i) => (
          <h1 key={i} className={`text-4xl sm:text-6xl md:text-7xl font-black ${i > 0 ? '-mt-1' : ''}`} style={titleStyle}>
            {name}
          </h1>
        ))}
      </header>

      <div className="flex items-center w-full max-w-xs gap-3 mb-6">
        <div className={`h-px flex-1 ${isDark ? 'bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400/60 to-transparent'}`} />
        <div className="relative">
          {!isDark && <div className="absolute inset-0 blur-lg rounded-full bg-blue-400/30" />}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={isDark ? 'text-yellow-200 relative' : 'text-blue-600 relative'}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
        <div className={`h-px flex-1 ${isDark ? 'bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400/60 to-transparent'}`} />
      </div>

      <blockquote className={`relative mb-8 max-w-lg px-6 italic ${isDark ? 'text-white/80' : 'text-[#23386d]'}`}>
        <span className="absolute left-0 top-0 text-2xl text-yellow-500">"</span>
        <p className="text-lg md:text-xl font-light leading-relaxed">
          I want to become sun who shines other, 
          <br className="hidden sm:block" />
          but am a meteor who only shines when he is falling.
        </p>
        <span className="absolute bottom-0 right-0 text-2xl text-yellow-500">"</span>
      </blockquote>

      <nav className="flex gap-4">
        {socialLinks.map(({ icon: Icon, label, color }) => (
          <a key={label} href="#" aria-label={label}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 shadow-md ${
              isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-blue-100 text-blue-500'
            }`}
            style={{ borderColor: isDark ? (color === 'gold' ? '#eab30866' : '#3b82f666') : undefined }}
          >
            {createElement(Icon, { size: 19 })}
          </a>
        ))}
      </nav>
    </section>
  );
};

export default Hero;
