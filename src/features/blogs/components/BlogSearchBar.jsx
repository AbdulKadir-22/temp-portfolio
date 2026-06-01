import { Search, SlidersHorizontal, FolderOpen } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * BlogSearchBar — search input with filter button.
 * Matches the top search bar design from the mockup.
 */
const BlogSearchBar = ({
  searchQuery,
  onSearchChange,
  onFilterToggle,
  showFilters,
  onCategoriesToggle,
  showCategories,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      id="blog-search-bar"
      className="flex items-center gap-3 w-full"
    >
      {/* Search Input */}
      <div
        className={`
          flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border
          transition-all duration-300
          ${isDark
            ? 'bg-white/[0.04] border-white/10 focus-within:border-white/25 focus-within:bg-white/[0.06]'
            : 'bg-white/60 border-slate-200/60 focus-within:border-blue-300 focus-within:bg-white/80 focus-within:shadow-sm'
          }
        `}
      >
        <Search
          size={14}
          className={`flex-shrink-0 ${isDark ? 'text-white/30' : 'text-slate-400'}`}
        />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`
            w-full bg-transparent text-xs outline-none placeholder-opacity-50
            ${isDark
              ? 'text-white placeholder-white/30'
              : 'text-slate-800 placeholder-slate-400'
            }
          `}
        />
      </div>

      {/* Categories Toggle Button (Mobile/Tablet only) */}
      <button
        onClick={onCategoriesToggle}
        className={`
          lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border
          text-[10px] font-bold tracking-[0.1em] uppercase
          transition-all duration-200 cursor-pointer flex-shrink-0
          ${showCategories
            ? isDark
              ? 'bg-blue-500/15 border-blue-400/30 text-blue-300'
              : 'bg-blue-50 border-blue-300 text-blue-600'
            : isDark
              ? 'bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.08] hover:text-white/70'
              : 'bg-white/60 border-slate-200/60 text-slate-500 hover:bg-white/80 hover:text-slate-700'
          }
        `}
        aria-label="Toggle categories"
      >
        <FolderOpen size={13} />
        <span className="hidden sm:inline">Categories</span>
      </button>

      {/* Filter Button */}
      <button
        onClick={onFilterToggle}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl border
          text-[10px] font-bold tracking-[0.1em] uppercase
          transition-all duration-200 cursor-pointer flex-shrink-0
          ${showFilters
            ? isDark
              ? 'bg-blue-500/15 border-blue-400/30 text-blue-300'
              : 'bg-blue-50 border-blue-300 text-blue-600'
            : isDark
              ? 'bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.08] hover:text-white/70'
              : 'bg-white/60 border-slate-200/60 text-slate-500 hover:bg-white/80 hover:text-slate-700'
          }
        `}
      >
        <SlidersHorizontal size={13} />
        <span className="hidden sm:inline">Filter</span>
      </button>
    </div>
  );
};

export default BlogSearchBar;
