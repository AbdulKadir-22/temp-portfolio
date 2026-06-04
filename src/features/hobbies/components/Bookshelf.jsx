import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { books } from '../data/config';
import BookModal from './BookModal';

const Bookshelf = () => {
  const { isDark } = useTheme();
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleShelves, setVisibleShelves] = useState(1);

  const [booksPerShelf, setBooksPerShelf] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 5 : 15;
    }
    return 15;
  });

  useEffect(() => {
    const updateBooksPerShelf = () => {
      setBooksPerShelf(window.innerWidth < 768 ? 5 : 15);
    };
    updateBooksPerShelf();
    window.addEventListener('resize', updateBooksPerShelf);
    return () => window.removeEventListener('resize', updateBooksPerShelf);
  }, []);
  
  // Calculate total shelves needed
  const totalShelvesNeeded = Math.ceil(books.length / booksPerShelf);
  
  // Slice books based on current visible shelves count
  const displayedBooks = books.slice(0, visibleShelves * booksPerShelf);

  // Create rows of books (max booksPerShelf per row)
  const shelfRows = [];
  for (let i = 0; i < displayedBooks.length; i += booksPerShelf) {
    shelfRows.push(displayedBooks.slice(i, i + booksPerShelf));
  }

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  // Next and Previous handlers inside Modal
  const handlePrevBook = () => {
    if (!selectedBook) return;
    const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
    const prevIndex = (currentIndex - 1 + books.length) % books.length;
    setSelectedBook(books[prevIndex]);
  };

  const handleNextBook = () => {
    if (!selectedBook) return;
    const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
    const nextIndex = (currentIndex + 1) % books.length;
    setSelectedBook(books[nextIndex]);
  };

  const handleLoadMore = () => {
    if (visibleShelves < totalShelvesNeeded) {
      setVisibleShelves((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      
      {/* ── Shelf Container ── */}
      <div className="w-full flex flex-col gap-16 md:gap-20 max-w-4xl mx-auto px-2">
        {shelfRows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative flex flex-col w-full">
            
            {/* Upright Book Spines Container */}
            <div className="flex items-end justify-center gap-2 md:gap-3 px-4 md:px-8 h-56 md:h-64 relative z-10">
              {row.map((book) => {
                // Generate a slightly varied height so shelves look realistic and unique
                const variationHeight = 180 + (book.id % 4) * 12; // ranges from 180px to 216px

                return (
                  <div
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="relative group cursor-pointer transition-all duration-300 select-none flex-shrink-0"
                    style={{
                      width: '38px',
                      height: `${variationHeight}px`,
                      // Set CSS variables for cleaner inline styles
                      '--spine-color': book.coverColor,
                      '--text-color': book.textColor,
                    }}
                  >
                    {/* Realistic 3D Spine Card */}
                    <div
                      className="w-full h-full rounded-t-sm flex flex-col justify-between items-center py-4 px-1 relative transition-all duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8"
                      style={{
                        backgroundColor: book.coverColor,
                        color: book.textColor,
                        borderRadius: '3px 3px 1px 1px',
                        boxShadow: isDark
                          ? '3px 5px 12px rgba(0,0,0,0.6), inset 2px 0 3px rgba(255,255,255,0.08), inset -2px 0 3px rgba(0,0,0,0.4)'
                          : '3px 5px 10px rgba(0,0,0,0.25), inset 2px 0 3px rgba(255,255,255,0.2), inset -2px 0 3px rgba(0,0,0,0.15)',
                      }}
                    >
                      {/* Left and Right binding lines on physical spine */}
                      <div className="absolute inset-y-0 left-0 w-[2px] bg-black/10 dark:bg-white/5 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-[2px] bg-black/15 dark:bg-black/30 pointer-events-none" />
                      
                      {/* Spine 3D Cylinder Shine Highlight */}
                      <div 
                        className="absolute inset-y-0 left-1 w-2 pointer-events-none opacity-40 dark:opacity-20"
                        style={{
                          background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)'
                        }}
                      />

                      {/* Top spine banding detail */}
                      <div className="w-full h-[3px] opacity-30 bg-current mb-2" />

                      {/* Spine Title (Rotated Vertically) */}
                      <div 
                        className="flex-1 flex items-center justify-center font-bold text-[9px] md:text-[11px] tracking-wide uppercase overflow-hidden"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        <span className="line-clamp-1 max-h-[120px] md:max-h-[140px] text-center font-semibold">
                          {book.title}
                        </span>
                      </div>

                      {/* Spine Author (Rotated Vertically or Smaller at Bottom) */}
                      <div 
                        className="mt-3 flex items-center justify-center opacity-70 text-[6px] md:text-[7.5px] tracking-widest uppercase font-medium"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        <span className="line-clamp-1 max-h-[40px] text-center">
                          {book.author}
                        </span>
                      </div>

                      {/* Bottom spine banding detail */}
                      <div className="w-full h-[3px] opacity-30 bg-current mt-2" />

                      {/* Subtle Bookmark Ribbon tail dangling from active/hovered book */}
                      <div 
                        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1.5 h-3 bg-red-600 rounded-b-sm pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-1"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Wooden Shelf Plank ── */}
            <div 
              className={`w-full h-4 rounded-md relative z-25
                ${isDark
                  ? 'bg-gradient-to-b from-[#3A271B] to-[#251810] border-t border-amber-800/15'
                  : 'bg-gradient-to-b from-[#C8945A] to-[#A4713C] border-t border-white/20'
                }`}
              style={{
                boxShadow: isDark
                  ? '0 2px 0 #18100A, 0 12px 16px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255,255,255,0.06)'
                  : '0 2px 0 #845729, 0 10px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.35)'
              }}
            >
              {/* Shelf Top Shadow cast on the wall */}
              <div 
                className="absolute left-0 right-0 top-full h-8 opacity-65 dark:opacity-85 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                }}
              />
              
              {/* Wooden grain highlights (Subtle stripes) */}
              <div className="absolute inset-0 bg-white/[0.03] pointer-events-none mix-blend-overlay" />
            </div>

          </div>
        ))}
      </div>

      {/* ── Load More Shelves Button ── */}
      {visibleShelves < totalShelvesNeeded && (
        <button
          onClick={handleLoadMore}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl border text-[10px] font-bold tracking-[0.1em] uppercase cursor-pointer
            transition-all duration-300 mt-2
            ${isDark
              ? 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white/80 hover:border-white/20'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:text-slate-800 hover:border-slate-300 hover:shadow-sm'
            }
          `}
        >
          <Plus className="w-3.5 h-3.5" />
          Load More Shelves
        </button>
      )}

      {/* ── Immersive BookModal Component ── */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onPrev={handlePrevBook}
          onNext={handleNextBook}
        />
      )}
      
    </div>
  );
};

export default Bookshelf;
