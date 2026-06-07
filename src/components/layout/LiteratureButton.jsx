import { Link, useLocation } from 'react-router-dom';
import { Feather } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
  * Global Literature button — sits next to the Resume button.
  */
const LiteratureButton = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const isLiteraturePage = location.pathname === '/literature';

  return (
    <Link
      to="/literature"
      id="literature-pill-button"
      className={`
        flex items-center gap-2 px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full
        font-bold text-xs tracking-[0.12em] uppercase
        border backdrop-blur-md
        transition-all duration-300 ease-out
        cursor-pointer group
        ${isDark ? 'resume-glow-dark' : 'resume-glow-light'}
        ${isDark
          ? 'bg-black/20 border-yellow-500/30 text-white hover:bg-black/40 hover:border-yellow-400/50'
          : 'bg-white/40 border-blue-300/40 text-slate-800 hover:bg-white/60 hover:border-blue-400/50'
        }
        ${isLiteraturePage
          ? isDark ? 'border-yellow-400/60 bg-yellow-500/10' : 'border-blue-500/60 bg-blue-500/10'
          : ''
        }
      `}
    >
      <span>LITERATURE</span>
      <Feather
        size={13}
        className={`transition-transform duration-300 group-hover:rotate-12 ${
          isDark ? 'text-yellow-400' : 'text-blue-500'
        }`}
      />
    </Link>
  );
};

export default LiteratureButton;
