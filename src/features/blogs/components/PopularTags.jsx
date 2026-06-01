import { useTheme } from '../../../context/ThemeContext';
import { popularTags } from '../data/config';

/**
 * PopularTags — tag cloud section from the right sidebar.
 * Displays hashtags as interactive pill buttons.
 */
const PopularTags = ({ activeTag, onTagSelect }) => {
  const { isDark } = useTheme();

  return (
    <div
      id="blog-tags"
      className={`
        w-full rounded-xl border p-4 sm:p-5
        transition-all duration-300
        ${isDark
          ? 'bg-white/[0.03] border-white/10'
          : 'bg-white/50 border-slate-200/60'
        }
      `}
    >
      <h3
        className={`
          text-[10px] font-bold tracking-[0.2em] uppercase mb-4
          ${isDark ? 'text-white/50' : 'text-slate-500'}
        `}
      >
        POPULAR TAGS
      </h3>

      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onTagSelect(isActive ? null : tag)}
              className={`
                px-3 py-1.5 rounded-full text-[10px] font-semibold
                border transition-all duration-200 cursor-pointer
                ${isActive
                  ? isDark
                    ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                    : 'bg-blue-50 border-blue-300 text-blue-600'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70 hover:border-white/20'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;
