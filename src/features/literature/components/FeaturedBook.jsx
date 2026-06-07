import { useTheme } from '../../../context/ThemeContext';
import { featuredBook } from '../data/literatureData';
import bookCover from '../../../assets/obsessed_book_cover.png';

const FeaturedBook = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        relative w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-10 border overflow-hidden
        transition-all duration-500 ease-in-out group
        ${isDark
          ? 'bg-black/35 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-white/50 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
        }
      `}
    >
      {/* Background Starry Nebula Light Effect behind book cover */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none group-hover:bg-blue-400/20 transition-all duration-700" />
      {isDark && (
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full bg-yellow-500/5 blur-[50px] pointer-events-none group-hover:bg-yellow-400/10 transition-all duration-700" />
      )}

      {/* Book Cover Container (Perspective/3D Card Hover Effect) */}
      <div className="relative w-[180px] md:w-[220px] aspect-[1/1] md:aspect-[3/4] flex-shrink-0 perspective-[1000px] z-10">
        <div 
          className="w-full h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-[1.03] group-hover:rotate-y-[-10deg] group-hover:rotate-x-[5deg]"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(234, 179, 8, 0.1)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.2)'
          }}
        >
          <img
            src={bookCover}
            alt={featuredBook.title}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Subtle reflection overlay on cover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none mix-blend-overlay" />
        </div>

        {/* Small sparkle in top-right of cover area */}
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 flex items-center justify-center pointer-events-none animate-pulse">
          <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-yellow-400 shadow-[0_0_8px_#eab308]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'}`} />
        </div>
      </div>

      {/* Book Info Section */}
      <div className="flex-1 flex flex-col justify-between items-start text-left z-10 w-full">
        <div>
          {/* Title & Subtitle */}
          <h2
            className={`text-3xl md:text-4xl font-semibold tracking-wide`}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: isDark ? '#f8fafc' : '#0f172a',
            }}
          >
            {featuredBook.title}
          </h2>
          <p
            className={`text-xs md:text-sm font-semibold tracking-wider uppercase italic mt-1 ${
              isDark ? 'text-yellow-500/80' : 'text-blue-600/80'
            }`}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {featuredBook.subtitle}
          </p>

          {/* Description */}
          <p
            className={`text-xs md:text-sm leading-relaxed font-light mt-4 max-w-xl ${
              isDark ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            {featuredBook.description}
          </p>
        </div>

        {/* Stats Row & Action Button */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8 pt-6 border-t border-dashed border-white/10">
          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className={`text-[8px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>STATUS</span>
              <span className={`text-xs md:text-sm font-bold mt-1 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>{featuredBook.status}</span>
            </div>
            <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className="flex flex-col">
              <span className={`text-[8px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>CHAPTER</span>
              <span className={`text-xs md:text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{featuredBook.chapter}</span>
            </div>
            <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className="flex flex-col">
              <span className={`text-[8px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>WORDS</span>
              <span className={`text-xs md:text-sm font-bold mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{featuredBook.words}</span>
            </div>
          </div>

          {/* Button - Hidden/Removed */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
