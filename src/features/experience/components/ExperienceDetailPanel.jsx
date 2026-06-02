import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Briefcase, CheckCircle, Star, Shield, Code, Globe, Terminal, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * ExperienceDetailPanel — right sidebar panel showing full details of the selected experience.
 * Sticky on desktop, animated bottom-sheet on mobile with premium design.
 */
const ExperienceDetailPanel = ({ experience, onClose, isMobileSheet = false }) => {
  const { isDark } = useTheme();

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isMobileSheet) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isMobileSheet]);

  if (!experience) return null;

  // Map icon string to Lucide component
  const getIcon = (iconName) => {
    const iconMap = {
      shield: Shield,
      code: Code,
      globe: Globe,
      terminal: Terminal,
    };
    const IconComponent = iconMap[iconName] || Briefcase;
    return <IconComponent size={isMobileSheet ? 24 : 28} />;
  };

  // Icon background gradient colors by role type
  const getIconColors = (iconName) => {
    const colorMap = {
      shield: isDark
        ? 'from-blue-500/20 to-indigo-500/20 border-blue-400/30 text-blue-400'
        : 'from-blue-100 to-indigo-100 border-blue-300 text-blue-600',
      code: isDark
        ? 'from-violet-500/20 to-purple-500/20 border-violet-400/30 text-violet-400'
        : 'from-violet-100 to-purple-100 border-violet-300 text-violet-600',
      globe: isDark
        ? 'from-cyan-500/20 to-teal-500/20 border-cyan-400/30 text-cyan-400'
        : 'from-cyan-100 to-teal-100 border-cyan-300 text-cyan-600',
      terminal: isDark
        ? 'from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-400'
        : 'from-amber-100 to-orange-100 border-amber-300 text-amber-600',
    };
    return colorMap[iconName] || colorMap.shield;
  };

  /** Shared content sections — reused across mobile and desktop */
  const DetailContent = () => (
    <>
      {/* ── Header: Section Label ── */}
      <div className="flex items-center gap-1.5">
        <span
          className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}
        >
          Experience Details
        </span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={isDark ? 'text-yellow-400/40' : 'text-blue-400/40'}
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      {/* ── Role Icon + Title ── */}
      <div className="flex items-start gap-3">
        <div
          className={`
            ${isMobileSheet ? 'w-11 h-11' : 'w-12 h-12'} rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0
            ${getIconColors(experience.icon)}
          `}
        >
          {getIcon(experience.icon)}
        </div>
        <div className="flex flex-col min-w-0">
          <h3
            className={`${isMobileSheet ? 'text-[15px]' : 'text-base sm:text-lg'} font-bold tracking-wide leading-snug ${isDark ? 'text-white' : 'text-slate-800'}`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {experience.role}
          </h3>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
            {experience.company}
          </p>
        </div>
      </div>

      {/* ── Meta Information Grid ── */}
      <div
        className={`
          grid grid-cols-2 gap-2.5 p-3 rounded-xl border
          ${isDark ? 'bg-white/[0.05] border-white/10' : 'bg-slate-50/80 border-slate-100'}
        `}
      >
        <div className="flex items-center gap-2">
          <Clock size={12} className={isDark ? 'text-white/30' : 'text-slate-400'} />
          <span className={`text-[10px] font-medium ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            {experience.startDate} – {experience.endDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} className={isDark ? 'text-white/30' : 'text-slate-400'} />
          <span className={`text-[10px] font-medium ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            {experience.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className={isDark ? 'text-white/30' : 'text-slate-400'} />
          <span className={`text-[10px] font-medium ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            {experience.duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={12} className={isDark ? 'text-white/30' : 'text-slate-400'} />
          <span className={`text-[10px] font-medium ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            {experience.type}
          </span>
        </div>
      </div>

      {/* ── Key Responsibilities ── */}
      <div>
        <h4
          className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}
        >
          Key Responsibilities
        </h4>
        <ul className="flex flex-col gap-2">
          {experience.responsibilities.map((item, idx) => (
            <li
              key={idx}
              className={`
                text-[11px] leading-relaxed flex items-start gap-2
                ${isDark ? 'text-white/60' : 'text-slate-600'}
              `}
            >
              <CheckCircle
                size={11}
                className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400/60' : 'text-blue-500/60'}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Technologies & Tools ── */}
      <div>
        <h4
          className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}
        >
          Technologies & Tools
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {experience.tools.map((tool) => (
            <span
              key={tool}
              className={`
                text-[9px] sm:text-[10px] px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5
                ${isDark
                  ? 'bg-white/[0.06] border-white/15 text-white/70'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
                }
              `}
            >
              <svg
                width="6"
                height="6"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={isDark ? 'text-blue-400/60' : 'text-blue-500/60'}
              >
                <circle cx="12" cy="12" r="12" />
              </svg>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* ── Achievements ── */}
      {experience.achievements && experience.achievements.length > 0 && (
        <div
          className={`
            p-3 rounded-xl border
            ${isDark ? 'bg-amber-500/[0.04] border-amber-500/10' : 'bg-amber-50/60 border-amber-200/50'}
          `}
        >
          <h4
            className={`
              text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5 flex items-center gap-1.5
              ${isDark ? 'text-amber-400/70' : 'text-amber-600/70'}
            `}
          >
            <Star size={10} fill="currentColor" />
            Achievements
          </h4>
          <ul className="flex flex-col gap-2">
            {experience.achievements.map((item, idx) => (
              <li
                key={idx}
                className={`
                  text-[11px] leading-relaxed flex items-start gap-2
                  ${isDark ? 'text-white/55' : 'text-slate-600'}
                `}
              >
                <Star
                  size={10}
                  className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-amber-400/50' : 'text-amber-500/50'}`}
                  fill="currentColor"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Status indicator (current role) ── */}
      {experience.isCurrent && (
        <div className="flex items-center gap-2 pt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <span className={`text-[10px] font-semibold ${isDark ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>
            Currently Active
          </span>
        </div>
      )}
    </>
  );

  /* ── Mobile Bottom Sheet (animated with framer-motion) ── */
  if (isMobileSheet) {
    return (
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
        />

        {/* Sheet */}
        <motion.div
          className={`
            fixed bottom-0 left-0 right-0 z-[91] max-h-[88vh] overflow-y-auto
            rounded-t-3xl border-t border-x
            flex flex-col
            ${isDark
              ? 'bg-slate-950/[0.98] border-white/15 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-white/[0.98] border-slate-200 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]'
            }
          `}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Drag handle + close row */}
          <div className="sticky top-0 z-10 pt-3 pb-2 px-5 flex flex-col items-center gap-2">
            <div className={`w-10 h-1 rounded-full ${isDark ? 'bg-white/25' : 'bg-slate-300'}`} />

            {/* Top bar: current badge + close button */}
            <div className="w-full flex items-center justify-between">
              {experience.isCurrent ? (
                <span
                  className={`
                    text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border
                    ${isDark
                      ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-600'
                    }
                  `}
                >
                  Currently Active
                </span>
              ) : (
                <span />
              )}

              <button
                onClick={onClose}
                className={`
                  p-2 rounded-xl border cursor-pointer
                  transition-all duration-200 flex items-center gap-1.5
                  ${isDark
                    ? 'bg-white/[0.05] border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                    : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200 hover:text-slate-700'
                  }
                `}
              >
                <ChevronDown size={14} />
                <span className="text-[9px] font-bold tracking-wider uppercase">Close</span>
              </button>
            </div>
          </div>

          {/* Content with padding */}
          <div className="px-5 pb-8 flex flex-col gap-4">
            <DetailContent />
          </div>
        </motion.div>
      </>
    );
  }

  /* ── Desktop Inline Panel ── */
  return (
    <div
      className={`
        rounded-2xl border p-5 flex flex-col gap-4
        transition-all duration-300
        ${isDark
          ? 'bg-slate-950/97 border-white/15 backdrop-blur-xl'
          : 'bg-white/95 border-slate-200/80 backdrop-blur-xl shadow-lg'
        }
      `}
    >
      <DetailContent />
    </div>
  );
};

export default ExperienceDetailPanel;
