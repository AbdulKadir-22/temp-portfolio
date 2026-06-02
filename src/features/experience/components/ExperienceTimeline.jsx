import ExperienceCard from './ExperienceCard';
import { useTheme } from '../../../context/ThemeContext';

/**
 * ExperienceTimeline — vertical timeline container that renders ExperienceCard components.
 * Includes the scroll-to-explore indicator at the bottom.
 */
const ExperienceTimeline = ({ experiences, selectedId, onSelect }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col gap-0 sm:gap-0 relative">
      {experiences.map((exp, idx) => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          isSelected={selectedId === exp.id}
          onSelect={onSelect}
          isLast={idx === experiences.length - 1}
          index={idx}
        />
      ))}

      {/* Scroll To Explore */}
      <div className="flex flex-col items-center gap-1 mt-8 mb-4">
        {/* Mouse icon */}
        <div className="scroll-indicator-icon flex flex-col items-center gap-1.5">
          <div
            className={`
              w-5 h-8 rounded-full border-2 flex justify-center pt-1.5
              ${isDark ? 'border-white/20' : 'border-slate-300/60'}
            `}
          >
            <div
              className={`
                w-1 h-2 rounded-full animate-pulse
                ${isDark ? 'bg-white/40' : 'bg-slate-400'}
              `}
            />
          </div>
        </div>
        <span
          className={`
            text-[9px] font-bold tracking-[0.2em] uppercase
            ${isDark ? 'text-white/25' : 'text-slate-400'}
          `}
        >
          Scroll To Explore
        </span>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
