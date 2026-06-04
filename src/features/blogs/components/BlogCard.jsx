import { Bookmark, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { categories } from '../data/config';

/**
 * BlogCard — individual blog post card with thumbnail, category tag,
 * title, excerpt, date, read time, bookmark, and read more link.
 */
const BlogCard = ({ post, onBookmark, isBookmarked = false }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === post.category);
  const categoryLabel = category?.label?.toUpperCase() || post.category.toUpperCase();
  const categoryColor = category?.color || '#3b82f6';

  return (
    <article
      id={`blog-card-${post.id}`}
      onClick={() => navigate(`/blog/${post.id}`)}
      className={`
        group relative flex gap-4 sm:gap-5 p-4 rounded-xl border
        transition-all duration-300 cursor-pointer
        ${isDark
          ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
          : 'bg-white/60 border-slate-200/60 hover:bg-white/80 hover:border-slate-300 hover:shadow-lg'
        }
      `}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-[100px] h-[80px] sm:w-[130px] sm:h-[100px] rounded-lg overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Top: Category + Bookmark */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: categoryColor }}
            />
            <span
              className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: categoryColor }}
            >
              {categoryLabel}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmark) onBookmark(post.id);
            }}
            className={`
              p-1 rounded-md transition-all duration-200 cursor-pointer
              ${isBookmarked
                ? isDark ? 'text-yellow-400' : 'text-blue-500'
                : isDark ? 'text-white/20 hover:text-white/50' : 'text-slate-300 hover:text-slate-500'
              }
            `}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title */}
        <h3
          className={`
            text-sm sm:text-[15px] font-bold leading-snug mb-1 line-clamp-1
            transition-colors duration-200
            ${isDark
              ? 'text-white group-hover:text-blue-300'
              : 'text-slate-800 group-hover:text-blue-600'
            }
          `}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={`
            text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-2
            ${isDark ? 'text-white/50' : 'text-slate-500'}
          `}
        >
          {post.excerpt}
        </p>

        {/* Bottom: Date, Read Time, Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
              <Calendar size={10} />
              <span className="text-[10px]">{post.date}</span>
            </div>
            <div className={`flex items-center gap-1 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
              <Clock size={10} />
              <span className="text-[10px]">{post.readTime}</span>
            </div>
          </div>

          <span
            className={`
              flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold
              transition-all duration-200
              ${isDark
                ? 'text-blue-400/70 group-hover:text-blue-300'
                : 'text-blue-500/70 group-hover:text-blue-600'
              }
            `}
          >
            Read More
            <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
