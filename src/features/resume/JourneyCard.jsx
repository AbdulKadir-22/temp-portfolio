import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { journeyContent } from '../../data/resume/config';
import journeyBg from '../../assets/journey-bg.png';

/**
 * JourneyCard — "My Journey" sidebar card with background image.
 * Links to the blogs/story page.
 */
const JourneyCard = () => {
  const { isDark } = useTheme();

  return (
    <div
      id="journey-card"
      className={`
        relative w-full h-full min-h-[260px] lg:min-h-[300px] lg:max-h-[350px]
        rounded-2xl overflow-hidden border
        flex flex-col justify-between
        transition-all duration-500
        ${isDark
          ? 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.08)]'
        }
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={journeyBg}
          alt="Stargazer on a hillside"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-b from-black/60 via-black/30 to-black/70'
              : 'bg-gradient-to-b from-white/60 via-white/20 to-white/70'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
        {/* Top Section */}
        <div>
          <span
            className={`
              text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block
              ${isDark ? 'text-yellow-300/80' : 'text-blue-600/80'}
            `}
          >
            {journeyContent.label}
          </span>

          <h2
            className={`
              text-xl lg:text-2xl font-black tracking-tight mb-3
              ${isDark ? 'text-white' : 'text-slate-800'}
            `}
          >
            {journeyContent.title}
          </h2>

          <p
            className={`
              text-sm leading-relaxed max-w-xs
              ${isDark ? 'text-white/70' : 'text-slate-600'}
            `}
          >
            {journeyContent.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <Link
            to={journeyContent.ctaLink}
            className={`
              inline-flex items-center gap-2 px-5 py-2.5
              rounded-lg border text-xs font-bold tracking-[0.1em] uppercase
              transition-all duration-300 cursor-pointer group
              ${isDark
                ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
              }
            `}
          >
            {journeyContent.ctaText}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
