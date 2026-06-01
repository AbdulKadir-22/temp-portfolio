import { Link } from 'react-router-dom';
import { Sparkle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeToggle — fixed top-left dark/light mode switcher with logo.
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
      {/* Logo */}
      <div className={`w-8 h-8 rounded-full border-2 font-bold text-xs cursor-pointer transition-transform hover:scale-110 ${isDark ? 'border-white text-white' : 'border-slate-800 text-slate-800'}`}>
        <Link to="/" className="w-full h-full flex items-center justify-center">
          AS
        </Link>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full
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
          <Sparkle size={16} fill="currentColor" />
        </div>

        <span className={`
          text-xs font-bold tracking-[0.1em] uppercase
          transition-colors duration-300
          hidden md:inline
          ${isDark ? 'text-white' : 'text-slate-800'}
        `}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>

        <div className={`
          w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]
          transition-all duration-500
          hidden md:block
          ${isDark ? 'bg-blue-400 scale-100' : 'bg-slate-400 scale-75 opacity-50'}
        `} />
      </button>
    </div>
  );
};

export default ThemeToggle;
