import { useTheme } from '../../../context/ThemeContext';
import planetBase from '../../../assets/planet-dark.png';
import planetDark from '../../../assets/planet-base.png';

// Planet hue colors for each experience card (cycles through these)
const PLANET_HUES = [215, 285, 175, 42];

/**
 * ExperienceCard — timeline card displaying role, company, highlights, and tech stack.
 * Shows a "Current" badge for active roles. Highlights when selected.
 * Uses small planet images (same as navigation) as timeline markers.
 */
const ExperienceCard = ({ experience, isSelected, onSelect, index = 0 }) => {
  const { isDark } = useTheme();
  const hue = PLANET_HUES[index % PLANET_HUES.length];

  return (
    <div
      onClick={() => onSelect(experience)}
      className={`
        group relative flex gap-4 sm:gap-5 cursor-pointer
        transition-all duration-300 mb-6
      `}
    >
      {/* ── Left: Date Column ── */}
      <div className="hidden sm:flex flex-col items-end w-[110px] flex-shrink-0 pt-2">
        <span
          className={`
            text-xs font-bold tracking-wide leading-tight
            ${isDark ? 'text-white/70' : 'text-slate-700'}
          `}
        >
          {experience.startDate}
        </span>
        <span
          className={`
            text-[10px] font-medium
            ${isDark ? 'text-white/35' : 'text-slate-400'}
          `}
        >
          – {experience.endDate}
        </span>
        <span
          className={`
            text-[9px] font-semibold mt-1 tracking-wide uppercase
            ${isDark ? 'text-white/25' : 'text-slate-300'}
          `}
        >
          {experience.duration}
        </span>
      </div>

      {/* ── Timeline Connector (Planet + Line) ── */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0 pt-0.5">
        {/* Planet marker (same as navigation) */}
        <div
          className={`
            w-8 h-8 flex-shrink-0 transition-all duration-300 relative
            ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
          `}
        >
          <img
            src={isDark ? planetDark : planetBase}
            alt=""
            className="w-full h-full object-contain mix-blend-screen planet-animation"
            style={{
              filter: `hue-rotate(${hue}deg) brightness(${isDark ? 1.3 : 0.9}) saturate(${isDark ? 2.5 : 1.5}) contrast(1.1) ${
                isSelected
                  ? `drop-shadow(0 0 14px rgba(96,165,250,0.6))`
                  : isDark
                    ? `drop-shadow(0 0 10px rgba(100,150,255,0.3))`
                    : ''
              }`,
              animationDuration: `${12 + index * 3}s`,
            }}
          />
        </div>
        {/* Vertical line (extends to next card) */}
        <div
          className={`
            w-px flex-1 min-h-[20px]
            ${isDark ? 'bg-white/10' : 'bg-slate-200'}
          `}
        />
      </div>

      {/* ── Right: Content Card ── */}
      <div
        className={`
          flex-1 rounded-xl border p-4 sm:p-5
          transition-all duration-300
          ${isSelected
            ? isDark
              ? 'bg-blue-500/[0.08] border-blue-400/30 shadow-lg shadow-blue-950/20'
              : 'bg-blue-50/60 border-blue-300/60 shadow-lg shadow-blue-100/40'
            : isDark
              ? 'bg-white/[0.05] border-white/15 hover:bg-white/[0.08] hover:border-white/25'
              : 'bg-white/60 border-slate-200/60 hover:bg-white/80 hover:border-slate-300 hover:shadow-md'
          }
        `}
      >
        {/* Mobile Date (visible on small screens) */}
        <div className="flex items-center gap-2 mb-2 sm:hidden">
          <span
            className={`text-[10px] font-bold tracking-wide ${isDark ? 'text-white/50' : 'text-slate-400'}`}
          >
            {experience.startDate} – {experience.endDate}
          </span>
          <span className={`text-[9px] ${isDark ? 'text-white/25' : 'text-slate-300'}`}>
            · {experience.duration}
          </span>
        </div>

        {/* Title Row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className={`
              text-sm sm:text-[15px] font-bold leading-snug tracking-wide flex items-center gap-1.5
              transition-colors duration-200
              ${isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-800 group-hover:text-blue-600'}
            `}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {experience.role}
            {/* Star sparkle next to title */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`flex-shrink-0 ${isDark ? 'text-yellow-400/60' : 'text-blue-400/60'}`}
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </h3>

          {/* Current badge */}
          {experience.isCurrent && (
            <span
              className={`
                flex-shrink-0 text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border
                ${isDark
                  ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-600'
                }
              `}
            >
              Current
            </span>
          )}
        </div>

        {/* Company */}
        <p
          className={`
            text-xs mb-3
            ${isDark ? 'text-blue-300/60' : 'text-blue-600/70'}
          `}
        >
          {experience.company}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mb-3">
          {experience.highlights.map((item, idx) => (
            <li
              key={idx}
              className={`
                text-[11px] sm:text-xs leading-relaxed flex gap-2
                ${isDark ? 'text-white/60' : 'text-slate-500'}
              `}
            >
              <span className="mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0 opacity-40" />
              {item}
            </li>
          ))}
        </ul>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className={`
                text-[9px] sm:text-[10px] px-2 py-1 rounded-lg border font-semibold flex items-center gap-1
                ${isDark
                  ? 'bg-white/[0.06] border-white/15 text-white/70'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
                }
              `}
            >
              <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
