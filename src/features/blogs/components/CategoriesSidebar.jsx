import { useTheme } from '../../../context/ThemeContext';
import { categories } from '../data/config';

/**
 * CategoriesSidebar — displays category list with colored dots and post counts.
 * Matches the right sidebar "CATEGORIES" section from the design.
 */
const CategoriesSidebar = ({ activeCategory, onCategorySelect }) => {
  const { isDark } = useTheme();

  return (
    <div
      id="blog-categories"
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
        CATEGORIES
      </h3>

      <ul className="flex flex-col gap-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <li key={cat.id}>
              <button
                onClick={() => onCategorySelect(isActive ? null : cat.id)}
                className={`
                  w-full flex items-center justify-between py-1.5 px-2 rounded-lg
                  transition-all duration-200 cursor-pointer group
                  ${isActive
                    ? isDark ? 'bg-white/10' : 'bg-blue-50'
                    : isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span
                    className={`
                      text-xs font-medium transition-colors duration-200
                      ${isActive
                        ? isDark ? 'text-white' : 'text-blue-600'
                        : isDark ? 'text-white/70 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-800'
                      }
                    `}
                  >
                    {cat.label}
                  </span>
                </div>
                <span
                  className={`
                    text-[10px] font-semibold transition-colors duration-200
                    ${isDark ? 'text-white/30' : 'text-slate-400'}
                  `}
                >
                  {cat.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
