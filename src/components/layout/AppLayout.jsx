import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle';
import Navigation from '../Navigation';
import ResumeButton from './ResumeButton';
import LiteratureButton from './LiteratureButton';
import NowPlayingCard from './NowPlayingCard';
import Footer from './Footer';
import { siteContent } from '../../data/content';

import lightBg from '../../assets/background/light-bg.png';
import darkBg from '../../assets/background/dark-bg.png';
import meteorImg from '../../assets/meteors/meteor.png';

/**
 * AppLayout — shared shell wrapping all pages.
 * Renders backgrounds, navigation, status cards, and page content via <Outlet />.
 */
const AppLayout = () => {
  const { theme, isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.slice(1).toUpperCase();
  const currentPage = path === '' ? 'HOME' : path;
  const showFooter = currentPage !== 'HOME';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const pageTitle =
      currentPage.charAt(0) + currentPage.slice(1).toLowerCase();
    document.title = `${pageTitle} - Abdulkadir Shaikh`;
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(page === 'HOME' ? '/' : `/${page.toLowerCase()}`);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-['Inter',system-ui,sans-serif]">
      {/* ── Background Layers ── */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${!isDark ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ backgroundImage: `url(${lightBg})` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ backgroundImage: `url(${darkBg})` }}
      />

      {/* ── Content Layer ── */}
      <div className="relative z-10 w-full h-screen overflow-y-auto">
        {/* Fixed UI Elements */}
        <ThemeToggle />
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 sm:gap-3">
          <LiteratureButton />
          <ResumeButton />
        </div>
        <NowPlayingCard />

        {/* Meteor Pieces */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[44vw] min-w-[320px] max-w-[720px] overflow-hidden">
          <img src={meteorImg} alt="" className="meteor-piece meteor-piece-lg hidden lg:block" />
          <img src={meteorImg} alt="" className="meteor-piece meteor-piece-sm meteor-piece-sm-top" />
          <img src={meteorImg} alt="" className="meteor-piece meteor-piece-sm meteor-piece-sm-upper" />
        </div>

        {/* ── Main Interface Layout ── */}
        <div className="relative min-h-full w-full flex items-start lg:items-center justify-center px-[4%]">
          {/* Navigation (Left) - Desktop Orbits */}
          <div className="hidden lg:block fixed left-[-5%] lg:left-0 top-1/2 -translate-y-1/2 w-full lg:w-[500px] h-full pointer-events-none z-20">
            <div className="pointer-events-none h-full">
              <Navigation
                theme={theme}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Navigation (Mobile Floating Orb Menu) */}
          <div className="lg:hidden">
            <Navigation
              theme={theme}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Page Content (via Outlet) — Aligned to start to prevent negative space shifting on mobile */}
          <div className="relative z-10 w-full flex flex-col items-center justify-start lg:justify-center pt-36 pb-20 lg:pb-8 min-h-screen">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </main>
  );
};

export default AppLayout;
