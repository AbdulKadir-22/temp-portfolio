import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { experiences, experienceConfig } from '../data/config';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ExperienceDetailPanel from '../components/ExperienceDetailPanel';

/**
 * ExperiencePage — renders the professional experience timeline with a detail panel.
 * Two-column on desktop (timeline left, details right). Single column + animated bottom sheet on mobile.
 */
const ExperiencePage = () => {
  const { isDark } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-select first experience on mount
  useEffect(() => {
    if (experiences.length > 0) {
      setSelectedExperience(experiences[0]);
    }
  }, []);

  // Track viewport for mobile/desktop behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelect = (experience) => {
    setSelectedExperience(experience);
    if (isMobile) {
      setShowMobileDetail(true);
    }
  };

  const handleCloseDetail = () => {
    setShowMobileDetail(false);
  };

  return (
    <section
      id="experience-page"
      className="w-full max-w-[98vw] xl:max-w-[1650px] mx-auto px-4 flex flex-col items-center gap-6 py-4"
    >
      {/* ── Page Title ── */}
      <header className="flex items-center gap-4 mb-2">
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
          className="text-2xl sm:text-3xl md:text-4xl tracking-wider"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            color: isDark ? '#e2e8f0' : '#1e3a5f',
          }}
        >
          {experienceConfig.pageTitle}
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
      </header>

      {/* ── Subtitle ── */}
      <p
        className={`
          text-xs sm:text-sm tracking-wide -mt-4 mb-2 text-center max-w-xl
          ${isDark ? 'text-white/50' : 'text-slate-500'}
        `}
      >
        {experienceConfig.pageSubtitle}
      </p>

      {/* ── Two-Column Layout ── */}
      <div className="w-full lg:pl-[210px] xl:pl-[240px] flex flex-col lg:flex-row gap-8 items-start justify-between">
        {/* Left Column: Experience Timeline */}
        <div className="w-full lg:w-[62%] xl:w-[64%] flex-shrink-0 flex flex-col gap-0">
          <ExperienceTimeline
            experiences={experiences}
            selectedId={selectedExperience?.id}
            onSelect={handleSelect}
          />
        </div>

        {/* Right Column: Detail Panel (Desktop only — sticky) */}
        <div className="hidden lg:block w-full lg:w-[36%] xl:w-[34%] lg:max-w-[380px] flex-shrink-0 lg:ml-auto sticky top-8">
          {selectedExperience && (
            <ExperienceDetailPanel
              experience={selectedExperience}
              onClose={() => setSelectedExperience(null)}
            />
          )}
        </div>
      </div>

      {/* ── Mobile Detail Panel (Animated Bottom Sheet) ── */}
      <AnimatePresence>
        {isMobile && showMobileDetail && selectedExperience && (
          <ExperienceDetailPanel
            experience={selectedExperience}
            onClose={handleCloseDetail}
            isMobileSheet
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperiencePage;
