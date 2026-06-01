import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import defaultJourneyBg from '../assets/journey-bg.png';

/**
 * JourneyCard — A premium, reusable card with a background image, gradient overlays,
 * and high-fidelity hovering interactions. Used in both Resume and Blogs sidebar.
 */
const JourneyCard = ({
  label = 'MY JOURNEY',
  title = 'How I Became Me',
  description = 'A story of curiosity, late nights, failed attempts, and small wins that built the developer I am today.',
  ctaText = 'READ MY STORY',
  ctaLink = '/blogs',
  image = defaultJourneyBg,
  isFeatured = false,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      id="journey-card"
      className={`
        relative w-full h-full min-h-[260px] lg:min-h-[300px] lg:max-h-[350px]
        rounded-2xl overflow-hidden border
        flex flex-col justify-between
        transition-all duration-500 group cursor-pointer
        ${isDark
          ? isFeatured
            ? 'border-amber-500/30 shadow-[0_8px_32px_rgba(217,119,6,0.15)] hover:border-amber-500/50'
            : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/20'
          : isFeatured
            ? 'border-amber-200 shadow-[0_8px_32px_rgba(217,119,6,0.08)] hover:border-amber-300'
            : 'border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.08)] hover:border-slate-300'
        }
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay for text readability */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark
              ? isFeatured
                ? 'bg-gradient-to-b from-amber-950/80 via-amber-900/40 to-amber-950/90 group-hover:opacity-95'
                : 'bg-gradient-to-b from-black/60 via-black/30 to-black/70 group-hover:opacity-95'
              : isFeatured
                ? 'bg-gradient-to-b from-amber-500/70 via-amber-400/40 to-amber-600/80 group-hover:opacity-95'
                : 'bg-gradient-to-b from-white/60 via-white/20 to-white/70 group-hover:opacity-95'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
        {/* Top Section */}
        <div>
          <span
            className={`
              text-[9px] font-bold tracking-[0.2em] uppercase mb-3 block transition-colors duration-300
              ${isDark
                ? isFeatured ? 'text-amber-300/90' : 'text-yellow-300/80'
                : isFeatured ? 'text-white' : 'text-blue-600/80'
              }
            `}
          >
            {label}
          </span>

          <h2
            className={`
              text-xl lg:text-2xl font-black tracking-tight mb-3 leading-tight transition-colors duration-300
              ${isDark ? 'text-white' : isFeatured ? 'text-white' : 'text-slate-800'}
            `}
          >
            {title}
          </h2>

          <p
            className={`
              text-sm leading-relaxed max-w-xs transition-colors duration-300
              ${isDark ? 'text-white/75' : isFeatured ? 'text-white/90' : 'text-slate-600'}
            `}
          >
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <Link
            to={ctaLink}
            className={`
              inline-flex items-center gap-2 px-5 py-2.5
              rounded-lg border text-xs font-bold tracking-[0.1em] uppercase
              transition-all duration-300 cursor-pointer group/btn
              ${isDark
                ? isFeatured
                  ? 'border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/50'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                : isFeatured
                  ? 'border-white/40 text-white hover:bg-white/15 hover:border-white/60'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
              }
            `}
          >
            {ctaText}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
