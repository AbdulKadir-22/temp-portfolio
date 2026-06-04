import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { hobbiesConfig, books, movies, paintings } from '../data/config';
import Bookshelf from '../components/Bookshelf';
import FilmReel from '../components/FilmReel';
import GalleryWall from '../components/GalleryWall';
import MovieDetailModal from '../components/MovieDetailModal';
import PaintingDetailModal from '../components/PaintingDetailModal';

const HobbiesPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Modals state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedPainting, setSelectedPainting] = useState(null);

  // Movie modal navigation
  const handlePrevMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = movies.findIndex((m) => m.id === selectedMovie.id);
    const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
    setSelectedMovie(movies[prevIndex]);
  };

  const handleNextMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = movies.findIndex((m) => m.id === selectedMovie.id);
    const nextIndex = (currentIndex + 1) % movies.length;
    setSelectedMovie(movies[nextIndex]);
  };

  // Painting modal navigation
  const handlePrevPainting = () => {
    if (!selectedPainting) return;
    const currentIndex = paintings.findIndex((p) => p.id === selectedPainting.id);
    const prevIndex = (currentIndex - 1 + paintings.length) % paintings.length;
    setSelectedPainting(paintings[prevIndex]);
  };

  const handleNextPainting = () => {
    if (!selectedPainting) return;
    const currentIndex = paintings.findIndex((p) => p.id === selectedPainting.id);
    const nextIndex = (currentIndex + 1) % paintings.length;
    setSelectedPainting(paintings[nextIndex]);
  };

  return (
    <section
      id="hobbies-page"
      className="w-full max-w-[98vw] xl:max-w-[1650px] mx-auto px-4 flex flex-col items-center justify-start gap-12 py-6 lg:pt-8 lg:pb-16 min-h-[75vh] transition-all duration-300"
    >
      {/* ── Page Header (Centered globally) ── */}
      <header className="flex flex-col items-center mb-2 animate-fadeIn text-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`tracking-widest text-sm ${isDark ? 'text-yellow-400/60' : 'text-blue-400/60'}`}>
              ───
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${isDark ? 'text-yellow-300' : 'text-blue-500'}`}
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl tracking-wider uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              color: isDark ? '#e2e8f0' : '#1e3a5f',
            }}
          >
            {hobbiesConfig.pageTitle}
          </h1>

          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${isDark ? 'text-yellow-300' : 'text-blue-500'}`}
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
            <span className={`tracking-widest text-sm ${isDark ? 'text-yellow-400/60' : 'text-blue-400/60'}`}>
              ───
            </span>
          </div>
        </div>

        {/* ── Subtitle ── */}
        <p
          className={`
            text-xs sm:text-sm tracking-wide mt-3 text-center max-w-xl animate-fadeIn
            ${isDark ? 'text-white/50' : 'text-slate-500'}
          `}
        >
          {hobbiesConfig.pageSubtitle}
        </p>
      </header>

      {/* ── Section 1: Bookshelf ── */}
      <div className="w-full flex flex-col gap-6 animate-slideUp max-w-6xl">
        <div className="w-full flex justify-between items-end px-4">
          <div className="flex flex-col text-left">
            <p className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              My Readings
            </p>
            <h2 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
              My Bookshelf
            </h2>
            <p className={`text-[10px] md:text-xs font-light mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
              A curated collection of pages and ideas that shape my mindset.
            </p>
          </div>

          <button
            onClick={() => navigate('/hobbies/books')}
            className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group transition-colors duration-300 ${
              isDark ? 'text-amber-400/80 hover:text-amber-300' : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            View all ({books.length * 5}) <span className="group-hover:translate-x-1 transition-transform inline-block">›</span>
          </button>
        </div>

        <Bookshelf />
      </div>

      {/* ── Section 2: Movies & Series ── */}
      <div className="w-full animate-slideUp max-w-6xl">
        <FilmReel onMovieClick={(movie) => setSelectedMovie(movie)} />
      </div>

      {/* ── Section 3: Paintings & Sketches ── */}
      <div className="w-full animate-slideUp max-w-6xl">
        <GalleryWall onPaintingClick={(painting) => setSelectedPainting(painting)} />
      </div>

      {/* ── Movie Detail Modal ── */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPrev={handlePrevMovie}
          onNext={handleNextMovie}
        />
      )}

      {/* ── Painting Detail Modal ── */}
      {selectedPainting && (
        <PaintingDetailModal
          painting={selectedPainting}
          onClose={() => setSelectedPainting(null)}
          onPrev={handlePrevPainting}
          onNext={handleNextPainting}
        />
      )}
      
    </section>
  );
};

export default HobbiesPage;
