import { useTheme } from '../context/ThemeContext';

/**
 * Bottom-center "SCROLL TO EXPLORE" indicator with animated mouse icon.
 */
const ScrollIndicator = () => {
  const { isDark } = useTheme();

  return (
    <div
      id="scroll-indicator"
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        hidden lg:flex items-center gap-3
        transition-colors duration-500
        ${isDark ? 'text-white/40' : 'text-slate-400'}
      `}
    >
      {/* Left decorative arrows */}
      <div className="flex items-center gap-1 text-[10px]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-40">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
        <span className="tracking-widest">───</span>
      </div>

      {/* Mouse icon */}
      <div className="scroll-indicator-icon flex flex-col items-center gap-1.5">
        <div
          className={`
            w-5 h-8 rounded-full border-2 flex justify-center pt-1.5
            ${isDark ? 'border-white/30' : 'border-slate-400/60'}
          `}
        >
          <div
            className={`
              w-1 h-2 rounded-full animate-pulse
              ${isDark ? 'bg-white/60' : 'bg-slate-500'}
            `}
          />
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold tracking-[0.25em] uppercase">
        SCROLL TO EXPLORE
      </span>

      {/* Right decorative arrows */}
      <div className="flex items-center gap-1 text-[10px]">
        <span className="tracking-widest">───</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-40">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
    </div>
  );
};

export default ScrollIndicator;
