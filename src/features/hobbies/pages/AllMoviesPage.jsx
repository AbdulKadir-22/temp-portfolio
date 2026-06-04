import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, Film, Star } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { movies } from '../data/config';
import MovieDetailModal from '../components/MovieDetailModal';

const AllMoviesPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Search, filter, and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title'); // 'title', 'rating', 'year'
  const [filterType, setFilterType] = useState('all'); // 'all', 'Movie', 'Series'
  const [filteredMovies, setFilteredMovies] = useState(movies);

  // Sync scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let result = movies.filter(
      (m) =>
        (filterType === 'all' || m.type === filterType) &&
        (m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         m.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
         m.genre.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.year - a.year);
    }

    setFilteredMovies(result);
  }, [searchQuery, sortBy, filterType]);

  // Modal navigation handlers
  const handlePrevMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = filteredMovies.findIndex((m) => m.id === selectedMovie.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredMovies.length) % filteredMovies.length;
    setSelectedMovie(filteredMovies[prevIndex]);
  };

  const handleNextMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = filteredMovies.findIndex((m) => m.id === selectedMovie.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredMovies.length;
    setSelectedMovie(filteredMovies[nextIndex]);
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
              The Cinema Vault
            </h1>
            <p className={`text-xs md:text-sm font-light mt-1 ${isDark ? 'text-zinc-400/80' : 'text-slate-500'}`}>
              Browse and review the films and television shows that had a lasting impact on me.
            </p>
          </div>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 border rounded-md self-start sm:self-auto
            ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200/85 text-slate-500'}`}>
            Total: {movies.length} entries
          </span>
        </div>
      </div>

      {/* Control bar (Search + Filter + Sort) */}
      <div 
        className={`w-full p-4 rounded-xl border mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between
          ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-slate-200/80 shadow-sm'}`}
      >
        {/* Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search by title, director, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-lg border outline-none transition-all duration-300
              ${isDark 
                ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-purple-500/50' 
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-400'}`}
          />
        </div>

        {/* Filter and Sort selectors */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
          
          {/* Content Type Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className={`text-[10px] uppercase font-bold tracking-wider whitespace-nowrap ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Type:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 p-0.5 bg-slate-100 dark:bg-zinc-950 w-full sm:w-auto">
              {['all', 'Movie', 'Series'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md cursor-pointer transition-all duration-200 flex-1 sm:flex-none
                    ${filterType === t 
                      ? (isDark ? 'bg-purple-950/40 text-purple-400' : 'bg-purple-100 text-purple-600')
                      : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-800')}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <SlidersHorizontal className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border outline-none cursor-pointer transition-all duration-300 w-full sm:w-auto
                ${isDark 
                  ? 'bg-zinc-950 border-zinc-800 text-white focus:border-purple-500/50' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-400'}`}
            >
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating (Highest)</option>
              <option value="year">Release (Newest)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-1">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className={`relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer transition-all duration-500 select-none shadow-md
                ${isDark ? 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'hover:shadow-lg'}`}
              style={{ transform: 'translate3d(0,0,0)' }}
            >
              {/* Poster image */}
              <img
                src={movie.coverUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/95" />

              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-purple-500/30 transition-colors duration-500" />

              {/* Title & Metadata Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col justify-end min-h-[60%]">
                <span className="text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.2em] text-purple-400/90 mb-0.5">
                  {movie.type}
                </span>
                <h3 
                  className="text-xs md:text-sm font-black tracking-wide text-white leading-tight uppercase line-clamp-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {movie.title}
                </h3>
                
                {/* Expand on hover */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out overflow-hidden">
                  <p className="text-[9px] text-white/70 line-clamp-2 font-medium">
                    "{movie.quote}"
                  </p>
                  <div className="flex justify-between items-center mt-2.5 pt-1.5 border-t border-white/10 text-[8px] text-white/50 font-bold">
                    <span>{movie.year}</span>
                    <span className="text-yellow-400">★ {movie.rating}.0</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 border rounded-2xl border-dashed ${isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-400'}`}>
          <Film className="w-8 h-8 mx-auto mb-3 opacity-55" />
          <p className="text-sm font-semibold">No movies or series found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSortBy('title'); setFilterType('all'); }}
            className={`mt-4 px-4 py-1.5 border rounded-lg text-xs font-bold tracking-wider transition-colors duration-300 cursor-pointer
              ${isDark ? 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Movie detail modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPrev={handlePrevMovie}
          onNext={handleNextMovie}
        />
      )}

    </section>
  );
};

export default AllMoviesPage;
