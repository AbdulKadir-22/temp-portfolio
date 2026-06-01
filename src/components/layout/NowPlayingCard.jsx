import { Music } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { siteContent } from '../../data/content';

/**
 * "Now Playing" status card — fixed top-right, below the resume button.
 * Displays current track info with a pulsing green dot.
 */
const NowPlayingCard = () => {
  const { isDark } = useTheme();
  const { nowPlaying } = siteContent;

  return (
    <div
      id="now-playing-card"
      className={`
        fixed top-20 right-6 z-40
        hidden md:flex items-center gap-3 p-2 pr-5 rounded-xl
        backdrop-blur-md border transition-all duration-500 ease-in-out
        ${isDark
          ? 'bg-black/20 border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
          : 'bg-white/20 border-white/30 shadow-[0_4px_16px_rgba(31,38,135,0.05)]'
        }
      `}
    >
      {/* Music Icon */}
      <div
        className={`
          flex items-center justify-center w-8 h-8 rounded-full
          transition-colors duration-500
          ${isDark ? 'bg-white/5' : 'bg-white/40 shadow-inner'}
        `}
      >
        <Music size={14} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`
              text-[7px] font-bold tracking-[0.15em] uppercase
              transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-blue-500'}
            `}
          >
            {nowPlaying.label}
          </span>
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
        </div>
        <p
          className={`
            text-xs font-semibold tracking-tight leading-tight
            transition-colors duration-500
            ${isDark ? 'text-slate-50' : 'text-slate-800'}
          `}
        >
          {nowPlaying.track} · {nowPlaying.artist}
        </p>
      </div>
    </div>
  );
};

export default NowPlayingCard;
