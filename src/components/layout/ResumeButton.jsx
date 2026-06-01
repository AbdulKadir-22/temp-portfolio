import { Link, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Global resume pill button — fixed top-right on all pages.
 * Glows every 5 seconds via CSS animation (no JS interval needed).
 */
const ResumeButton = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const isResumePage = location.pathname === '/resume';

  return (
    <Link
      to="/resume"
      id="resume-pill-button"
      className={`
        fixed top-[22px] right-[150px] lg:top-6 lg:right-6 z-50
        flex items-center gap-2.5 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full
        font-bold text-xs tracking-[0.12em] uppercase
        border backdrop-blur-md
        transition-all duration-300 ease-out
        cursor-pointer group
        ${isDark ? 'resume-glow-dark' : 'resume-glow-light'}
        ${isDark
          ? 'bg-black/20 border-yellow-500/30 text-white hover:bg-black/40 hover:border-yellow-400/50'
          : 'bg-white/40 border-blue-300/40 text-slate-800 hover:bg-white/60 hover:border-blue-400/50'
        }
        ${isResumePage
          ? isDark ? 'border-yellow-400/60' : 'border-blue-500/60'
          : ''
        }
      `}
    >
      <span className="hidden sm:inline">RESUME.PDF</span>
      <span className="sm:hidden">RESUME</span>
      <Download
        size={14}
        className={`transition-transform duration-300 group-hover:translate-y-0.5 ${
          isDark ? 'text-yellow-400' : 'text-blue-500'
        }`}
      />
    </Link>
  );
};

export default ResumeButton;
