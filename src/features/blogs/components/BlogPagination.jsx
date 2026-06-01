import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * BlogPagination — pagination controls with page numbers and prev/next.
 * Matches the bottom pagination design from the mockup.
 */
const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isDark } = useTheme();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      id="blog-pagination"
      className="flex items-center justify-center gap-2 mt-6"
    >
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold
          transition-all duration-200 cursor-pointer border
          ${currentPage === 1
            ? isDark ? 'opacity-30 cursor-not-allowed border-white/5' : 'opacity-30 cursor-not-allowed border-slate-100'
            : isDark
              ? 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white/70'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }
        `}
      >
        <ChevronLeft size={12} />
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-8 h-8 rounded-lg text-xs font-bold
            transition-all duration-200 cursor-pointer
            ${page === currentPage
              ? isDark
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                : 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
              : isDark
                ? 'text-white/40 hover:bg-white/5 hover:text-white/60'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold
          transition-all duration-200 cursor-pointer border
          ${currentPage === totalPages
            ? isDark ? 'opacity-30 cursor-not-allowed border-white/5' : 'opacity-30 cursor-not-allowed border-slate-100'
            : isDark
              ? 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white/70'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }
        `}
      >
        Next
        <ArrowRight size={12} />
      </button>
    </div>
  );
};

export default BlogPagination;
