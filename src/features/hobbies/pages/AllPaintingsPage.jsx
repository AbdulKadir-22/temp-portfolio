import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, Palette, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { paintings } from '../data/config';
import PaintingDetailModal from '../components/PaintingDetailModal';

const AllPaintingsPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedPainting, setSelectedPainting] = useState(null);
  
  // Search, filter, and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title'); // 'title', 'year'
  const [filterMedium, setFilterMedium] = useState('all'); // 'all', 'Acrylic', 'Oil', 'Gouache', 'Watercolor'
  const [filteredPaintings, setFilteredPaintings] = useState(paintings);

  // Sync scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let result = paintings.filter(
      (p) =>
        (filterMedium === 'all' || p.medium.toLowerCase().includes(filterMedium.toLowerCase())) &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.year - a.year);
    }

    setFilteredPaintings(result);
  }, [searchQuery, sortBy, filterMedium]);

  // Modal navigation handlers
  const handlePrevPainting = () => {
    if (!selectedPainting) return;
    const currentIndex = filteredPaintings.findIndex((p) => p.id === selectedPainting.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredPaintings.length) % filteredPaintings.length;
    setSelectedPainting(filteredPaintings[prevIndex]);
  };

  const handleNextPainting = () => {
    if (!selectedPainting) return;
    const currentIndex = filteredPaintings.findIndex((p) => p.id === selectedPainting.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredPaintings.length;
    setSelectedPainting(filteredPaintings[nextIndex]);
  };

  // Get distinct mediums for filtering
  const mediums = ['all', 'Acrylic', 'Oil', 'Gouache', 'Watercolor'];

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
              The Art Gallery
            </h1>
            <p className={`text-xs md:text-sm font-light mt-1 ${isDark ? 'text-zinc-400/80' : 'text-slate-500'}`}>
              Explore my oil and acrylic paintings, gouache studies, and watercolor sketches.
            </p>
          </div>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 border rounded-md self-start sm:self-auto
            ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200/85 text-slate-500'}`}>
            Total: {paintings.length} Pieces
          </span>
        </div>
      </div>

      {/* Control bar (Search + Filter + Sort) */}
      <div 
        className={`w-full p-4 rounded-xl border mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between
          ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-slate-200/80 shadow-sm'}`}
      >
        {/* Search input */}
        <div className="relative w-full lg:max-w-xs">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search by title, medium, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-lg border outline-none transition-all duration-300
              ${isDark 
                ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-amber-500/50' 
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-400'}`}
          />
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
          
          {/* Medium Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className={`text-[10px] uppercase font-bold tracking-wider whitespace-nowrap ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Medium:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 p-0.5 bg-slate-100 dark:bg-zinc-950 w-full sm:w-auto overflow-x-auto">
              {mediums.map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMedium(m)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md cursor-pointer transition-all duration-200 whitespace-nowrap
                    ${filterMedium === m 
                      ? (isDark ? 'bg-amber-950/40 text-amber-400' : 'bg-amber-100 text-amber-600')
                      : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-800')}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <SlidersHorizontal className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`} />
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-1.5 text-xs rounded-lg border outline-none cursor-pointer transition-all duration-300 w-full sm:w-auto
                ${isDark 
                  ? 'bg-zinc-950 border-zinc-800 text-white focus:border-amber-500/50' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-400'}`}
            >
              <option value="title">Title (A-Z)</option>
              <option value="year">Date (Newest)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Paintings Museum Wall Grid */}
      {filteredPaintings.length > 0 ? (
        <div 
          className={`w-full p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden transition-all duration-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 md:gap-16
            ${isDark 
              ? 'bg-zinc-950/10 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_15px_35px_rgba(0,0,0,0.5)]'
              : 'bg-slate-50 border border-slate-200/60 shadow-[0_15px_30px_rgba(0,0,0,0.03)]'
            }`}
        >
          {/* Subtly repeating vertical wall panels/boards for realistic gallery background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:80px_100%]" />

          {/* Spotlight Overhead Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 flex justify-around">
            <div className={`w-96 h-96 rounded-full blur-[80px] bg-amber-300/5 -translate-y-1/2`} />
            <div className={`w-96 h-96 rounded-full blur-[80px] bg-amber-300/5 -translate-y-1/2`} />
          </div>

          {filteredPaintings.map((painting) => (
            <div
              key={painting.id}
              onClick={() => setSelectedPainting(painting)}
              className="flex flex-col items-center relative group cursor-pointer transition-all duration-500 select-none w-full"
            >
              {/* Hanging Wire Hook */}
              <div className={`absolute top-[-34px] w-2.5 h-2 rounded-[2px] z-15 ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-500 border-slate-400'} border-b-2`} />
              {/* Wire Hanging Line */}
              <div className={`absolute top-[-30px] w-[1px] h-8 z-10 pointer-events-none ${isDark ? 'bg-zinc-700' : 'bg-slate-350'}`} />
              
              {/* Picture Light Fixture */}
              <div className="absolute top-[-26px] flex flex-col items-center z-20 pointer-events-none">
                {/* Horizontal cylinder lamp tube */}
                <div className={`w-8 h-2 rounded-full border transition-colors duration-300
                  ${isDark ? 'bg-zinc-700 border-zinc-600' : 'bg-slate-300 border-slate-400'}`}
                  style={{
                    boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 1px 2px rgba(0,0,0,0.15)'
                  }}
                />
                {/* Curved arm stem */}
                <div className={`w-[2px] h-4 ${isDark ? 'bg-zinc-600' : 'bg-slate-400'}`} />
                
                {/* Mounting bracket on top of the frame */}
                <div className={`w-2 h-1 rounded-[1px] ${isDark ? 'bg-zinc-800' : 'bg-slate-500'}`} />
              </div>

              {/* Spreading trapezoid spotlight beam casting down */}
              <div 
                className="absolute top-[-20px] w-48 h-64 pointer-events-none mix-blend-screen opacity-15 dark:opacity-25 transition-all duration-500 group-hover:opacity-30 dark:group-hover:opacity-40"
                style={{
                  background: 'linear-gradient(to bottom, rgba(253, 224, 71, 0.35) 0%, rgba(253, 224, 71, 0.06) 55%, transparent 100%)',
                  clipPath: 'polygon(35% 0%, 0% 100%, 100% 100%, 65% 0%)',
                  zIndex: 15
                }}
              />

              {/* The Framed Painting */}
              <div
                className={`w-full aspect-[3/4] rounded-sm relative overflow-hidden transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-[1.03]
                  ${isDark
                    ? 'border-[8px] shadow-[0_15px_30px_rgba(0,0,0,0.65),_inset_0_1px_3px_rgba(255,255,255,0.05)] hover:shadow-[0_22px_40px_rgba(0,0,0,0.85),_0_0_15px_rgba(251,191,36,0.1)]'
                    : 'border-[8px] shadow-[0_10px_20px_rgba(0,0,0,0.18),_inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_18px_32px_rgba(0,0,0,0.28),_0_0_12px_rgba(251,191,36,0.08)]'
                  }`}
                style={{
                  borderColor: isDark ? '#1e120c' : '#7c4c23',
                  borderRadius: '2px',
                }}
              >
                {/* Inner gold fillet */}
                <div className="absolute inset-0.5 border border-[#c5a880] opacity-40 pointer-events-none" />

                {/* Cover Image */}
                <img
                  src={painting.coverUrl}
                  alt={painting.title}
                  className="w-full h-full object-cover transition-all duration-700 brightness-[90%] group-hover:brightness-[100%] contrast-[102%]"
                  loading="lazy"
                />

                {/* Glass glare effect */}
                <div 
                  className="absolute inset-0 opacity-15 dark:opacity-5 pointer-events-none transition-transform duration-700 group-hover:translate-x-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)'
                  }}
                />

                {/* Spotlighting overlay mask */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 dark:opacity-20"
                  style={{
                    background: 'radial-gradient(circle at top, rgba(253,224,71,0.8) 0%, rgba(0,0,0,0) 85%)'
                  }}
                />
                
                {/* Texture */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10 mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-800 to-black" />
              </div>

              {/* Title & Medium plaque card (Styled like brass/gold exhibition label) */}
              <div 
                className={`mt-4 px-3 py-1.5 rounded text-center border transition-all duration-300 w-[90%]
                  ${isDark
                    ? 'bg-gradient-to-r from-[#b38e55]/90 to-[#92713d]/90 border-[#856333]/40 text-[#fffbeb] shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:border-[#cda66e]/60 group-hover:text-white'
                    : 'bg-gradient-to-r from-[#dfc193] to-[#cba36f] border-[#b08753] text-[#3c2a13] shadow-[0_2px_3px_rgba(0,0,0,0.12)] group-hover:border-[#966b37]'
                  }`}
                style={{
                  textShadow: isDark ? '0 1px 1px rgba(0,0,0,0.4)' : 'none'
                }}
              >
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider line-clamp-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {painting.title}
                </div>
                <div className="text-[8px] font-semibold mt-0.5 tracking-wide opacity-75">
                  {painting.medium} · {painting.year}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-20 border rounded-2xl border-dashed ${isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-400'}`}>
          <Palette className="w-8 h-8 mx-auto mb-3 opacity-55" />
          <p className="text-sm font-semibold">No paintings found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSortBy('title'); setFilterMedium('all'); }}
            className={`mt-4 px-4 py-1.5 border rounded-lg text-xs font-bold tracking-wider transition-colors duration-300 cursor-pointer
              ${isDark ? 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800'}`}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Painting detail modal */}
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

export default AllPaintingsPage;
