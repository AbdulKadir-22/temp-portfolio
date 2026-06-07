import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Star, Quote, Award } from 'lucide-react';
import { siteContent } from '../../../data/content';
import { useTheme } from '../../../context/ThemeContext';

const BookModal = ({ book, onClose, onPrev, onNext }) => {
  const { isDark } = useTheme();

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!book) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-700"}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Navigation Buttons (Floating Left/Right on Desktop) */}
      <button
        onClick={onPrev}
        className={`absolute left-2 sm:left-4 md:left-8 z-[105] p-2.5 sm:p-3 rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg
          ${isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50'
          }`}
        title="Previous Book"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={onNext}
        className={`absolute right-2 sm:right-4 md:right-8 z-[105] p-2.5 sm:p-3 rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg
          ${isDark
            ? 'bg-zinc-900/90 border-zinc-800 text-white hover:bg-zinc-800'
            : 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50'
          }`}
        title="Next Book"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Open Book Modal Body */}
      <div
        className={`relative w-full max-w-5xl aspect-[16/10] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 scale-in select-text
          ${isDark 
            ? 'bg-zinc-950 border border-zinc-800/80' 
            : 'bg-slate-100 border border-slate-200'
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: '85vh',
          height: '100%'
        }}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-[110] p-1.5 sm:p-2 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95
            ${isDark
              ? 'bg-zinc-900/85 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white'
            }`}
          title="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 3D Page Separator Seam (Desktop Only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 pointer-events-none"
             style={{
               background: isDark
                 ? 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.4) 100%)'
                 : 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 40%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.12) 100%)',
               boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
             }}
        />

        {/* Outer shadow overlay on the book edge */}
        <div className="absolute inset-y-0 left-0 w-4 pointer-events-none z-20"
             style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-4 pointer-events-none z-20"
             style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)' }} />

        {/* Scrollable Container for Stacked Mobile Layout */}
        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          
          {/* ═══════════════════════════════════════════
             LEFT PAGE (Book Metadata, Cover, About)
             ═══════════════════════════════════════════ */}
          <div
            className={`w-full md:w-1/2 h-auto md:h-full overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-start relative
              ${isDark
                ? 'bg-[#121214] text-zinc-300'
                : 'bg-[#FCFAF6] text-slate-800'
              }`}
            style={{
              boxShadow: isDark ? 'inset -15px 0 30px rgba(0,0,0,0.2)' : 'inset -15px 0 30px rgba(0,0,0,0.03)'
            }}
          >
            {/* Upper Section: Cover Image + Primary Stats */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              
              {/* Cover Card with Realistic Book Binding Shadow */}
              <div 
                className="w-36 h-52 sm:w-40 sm:h-56 rounded-r-lg overflow-hidden flex-shrink-0 relative transition-transform duration-500 hover:rotate-y-12"
                style={{
                  boxShadow: '5px 5px 20px rgba(0,0,0,0.25), inset 3px 0 5px rgba(255,255,255,0.1)'
                }}
              >
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center p-4 text-center font-bold"
                    style={{ backgroundColor: book.coverColor, color: book.textColor }}
                  >
                    <BookOpen className="w-8 h-8 mb-2" />
                    <span className="text-[11px] leading-tight tracking-wider font-semibold uppercase">{book.title}</span>
                  </div>
                )}
                {/* Spine shadow overlay */}
                <div className="absolute inset-y-0 left-0 w-2.5 bg-black/25 pointer-events-none" />
              </div>

              {/* Quick Details next to Cover */}
              <div className="flex flex-col justify-between py-1">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2 inline-block
                    ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                    {book.genre}
                  </span>
                  
                  <h2 
                    className={`text-xl sm:text-2xl font-extrabold tracking-wide mb-1 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {book.title}
                  </h2>
                  <p className={`text-xs sm:text-sm font-semibold mb-3 ${isDark ? 'text-blue-400/80' : 'text-blue-600/80'}`}>
                    by {book.author}
                  </p>
                </div>

                {/* Rating & Simple Grid Info */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider`}>Rating:</span>
                    <div className="flex items-center gap-0.5">
                      {renderStars(book.rating)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-dashed mt-2 pt-2 border-slate-200 dark:border-zinc-800">
                    <div className="flex flex-col">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Pages</span>
                      <span className="text-xs font-bold leading-tight">{book.pages}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Published</span>
                      <span className="text-xs font-bold leading-tight">{book.firstPublished}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Favorite Quote Banner */}
            {book.quote && (
              <div 
                className={`p-4 rounded-xl border mb-6 flex gap-3 relative overflow-hidden
                  ${isDark 
                    ? 'bg-zinc-900/40 border-zinc-800/85 text-zinc-300' 
                    : 'bg-amber-500/[0.04] border-amber-200 text-slate-700'
                  }`}
              >
                <Quote className="w-5 h-5 flex-shrink-0 text-amber-500 opacity-60 mt-0.5" />
                <p className="text-[11px] sm:text-xs leading-relaxed italic font-medium z-10">
                  "{book.quote}"
                </p>
              </div>
            )}

            {/* About Section */}
            <div>
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-2 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                About the Book
              </h4>
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-90">
                {book.about}
              </p>
            </div>

          </div>

          {/* ═══════════════════════════════════════════
             RIGHT PAGE (Review, My Takeaway)
             ═══════════════════════════════════════════ */}
          <div
            className={`w-full md:w-1/2 h-auto md:h-full overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-start relative
              ${isDark
                ? 'bg-[#121214] text-zinc-300'
                : 'bg-[#FCFAF6] text-slate-800'
              }`}
            style={{
              boxShadow: isDark ? 'inset 15px 0 30px rgba(0,0,0,0.2)' : 'inset 15px 0 30px rgba(0,0,0,0.03)'
            }}
          >
            {/* Header / Title */}
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                My Review
              </h4>
            </div>

            {/* Review text */}
            <div className="mb-6 flex-1">
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-95 whitespace-pre-line">
                {book.review}
              </p>
            </div>

            {/* Takeaway Block */}
            {book.takeaway && (
              <div 
                className={`p-4 rounded-xl border mt-auto
                  ${isDark 
                    ? 'bg-blue-950/20 border-blue-900/30 text-blue-300' 
                    : 'bg-blue-50 border-blue-100 text-blue-800'
                  }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h5 className="text-[10px] font-extrabold uppercase tracking-wider">
                    My Takeaway
                  </h5>
                </div>
                <p className="text-[11px] sm:text-xs leading-relaxed font-semibold">
                  {book.takeaway}
                </p>
              </div>
            )}

            {/* Page number footer decoration */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900/60 text-[9px] font-bold tracking-widest uppercase opacity-35">
              <span>{siteContent.personal.firstName}'s Library</span>
              <span>Hobby Space · {book.id}</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BookModal;
