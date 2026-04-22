import React from 'react';
import { Sparkle } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-6 left-6 z-50
        flex items-center gap-4 px-4 py-2 rounded-full
        transition-all duration-300 ease-out
        cursor-pointer group
        ${isDark 
          ? 'bg-black/20 border-white/10 hover:bg-black/30' 
          : 'bg-white/20 border-black/10 hover:bg-white/30'}
        border backdrop-blur-md
        shadow-lg
      `}
    >
      <div className={`
        transition-transform duration-500 ease-out
        ${isDark ? 'text-blue-400 rotate-12' : 'text-yellow-400 -rotate-12'}
        group-hover:scale-110
      `}>
        <Sparkle size={20} fill="currentColor" />
      </div>

      <span className={`
        text-xs font-bold tracking-[0.2em] uppercase
        transition-colors duration-300
        ${isDark ? 'text-white' : 'text-slate-800'}
      `}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>

      <div className={`
        w-2 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]
        transition-all duration-500
        ${isDark ? 'bg-blue-400 scale-100' : 'bg-slate-400 scale-75 opacity-50'}
      `} />
    </button>
  );
};

export default ThemeToggle;
