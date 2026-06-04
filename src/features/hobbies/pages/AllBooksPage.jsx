import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, BookOpen, Star } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { books } from '../data/config';
import BookModal from '../components/BookModal';

const AllBooksPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Search, filter, and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title'); // 'title', 'rating', 'year'
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Dynamic books per shelf
  const [booksPerShelf, setBooksPerShelf] = useState(15);
  useEffect(() => {
    const handleResize = () => {
      setBooksPerShelf(window.innerWidth < 768 ? 5 : 15);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort books logic
  useEffect(() => {
    let result = books.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.firstPublished - a.firstPublished);
    }

    setFilteredBooks(result);
  }, [searchQuery, sortBy]);

  // Group filtered books for display on shelves
  const shelfRows = [];
  for (let i = 0; i < filteredBooks.length; i += booksPerShelf) {
    shelfRows.push(filteredBooks.slice(i, i + booksPerShelf));
  }

  // Modal navigation handlers
  const handlePrevBook = () => {
    if (!selectedBook) return;
    const currentIndex = filteredBooks.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredBooks.length) % filteredBooks.length;
    setSelectedBook(filteredBooks[prevIndex]);
  };

  const handleNextBook = () => {
    if (!selectedBook) return;
    const currentIndex = filteredBooks.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredBooks.length;
    setSelectedBook(filteredBooks[nextIndex]);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 min-h-screen">
      
      {/* Back button and page title */}
      <div className="flex flex-col gap-4 mb-8">
        <button
          onClick={() => navigate('/hobbies')}
          className={`self-start flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hobbies
        </button>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
          <div>
            <h1 className={`text-2xl md:text-3xl font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
              The Library Vault
            </h1>
            <p className={`text-xs md:text-sm font-light mt-1 ${isDark ? 'text-zinc-400/80' : 'text-slate-500'}`}>
              Browse and search the full collection of books that shaped my worldview.
            </p>
          </div>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 border rounded-md self-start sm:self-auto
            ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200/85 text-slate-500'}`}>
            Total: {books.length} Books
          </span>
        </div>
      </div>

      {/* Control bar (Search + Sort) */}
      <div 
        className={`w-full p-4 rounded-xl border mb-10 flex flex-col md:flex-row gap-4 items-center justify-between
          ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-slate-200/80 shadow-sm'}`}
      >
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-lg border outline-none transition-all duration-300
              ${isDark 
                ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-amber-500/50' 
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-400'}`}
          />
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <SlidersHorizontal className={`w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
          <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border outline-none cursor-pointer transition-all duration-300
              ${isDark 
                ? 'bg-zinc-950 border-zinc-800 text-white focus:border-amber-500/50' 
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-400'}`}
          >
            <option value="title">Title (A-Z)</option>
            <option value="rating">Rating (Highest)</option>
            <option value="year">Published (Newest)</option>
          </select>
        </div>
      </div>

      {/* Bookshelf Shelf Layout */}
      {filteredBooks.length > 0 ? (
        <div className="w-full flex flex-col gap-12 md:gap-16 px-1">
          {shelfRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative flex flex-col w-full">
              
              {/* Upright Book Spines Container */}
              <div className="flex items-end justify-center gap-2 md:gap-3 px-4 md:px-8 h-56 md:h-64 relative z-10">
                {row.map((book) => {
                  const variationHeight = 180 + (book.id % 4) * 12;

                  return (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="relative group cursor-pointer transition-all duration-300 select-none flex-shrink-0"
                      style={{
                        width: '38px',
                        height: `${variationHeight}px`,
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
                        {/* Highlights */}
                        <div className="absolute inset-y-0 left-0 w-[2px] bg-black/10 dark:bg-white/5 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-[2px] bg-black/15 dark:bg-black/30 pointer-events-none" />
                        
                        <div 
                          className="absolute inset-y-0 left-1 w-2 pointer-events-none opacity-40 dark:opacity-20"
                          style={{
                            background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)'
                          }}
                        />

                        {/* Top Banding */}
                        <div className="w-full h-[3px] opacity-30 bg-current mb-2" />

                        {/* Title */}
                        <div 
                          className="flex-1 flex items-center justify-center font-bold text-[9px] md:text-[11px] tracking-wide uppercase overflow-hidden"
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          <span className="line-clamp-1 max-h-[120px] md:max-h-[140px] text-center font-semibold animate-fadeIn">
                            {book.title}
                          </span>
                        </div>

                        {/* Author */}
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

                        {/* Bottom Banding */}
                        <div className="w-full h-[3px] opacity-30 bg-current mt-2" />

                        {/* Bookmark Ribbon */}
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

              {/* Wooden Shelf Plank */}
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
                <div 
                  className="absolute left-0 right-0 top-full h-8 opacity-65 dark:opacity-85 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <div className="absolute inset-0 bg-white/[0.03] pointer-events-none mix-blend-overlay" />
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 border rounded-2xl border-dashed ${isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-400'}`}>
          <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-55" />
          <p className="text-sm font-semibold">No books found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSortBy('title'); }}
            className={`mt-4 px-4 py-1.5 border rounded-lg text-xs font-bold tracking-wider transition-colors duration-300 cursor-pointer
              ${isDark ? 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onPrev={handlePrevBook}
          onNext={handleNextBook}
        />
      )}

    </section>
  );
};

export default AllBooksPage;
