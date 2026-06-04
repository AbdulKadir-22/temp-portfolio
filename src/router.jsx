import { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { useTheme } from './context/ThemeContext';

// Eager-load the home page (first paint)
import Hero from './features/home/Hero';

// Lazy-load other pages (only fetched when navigated to)
const ResumePage = lazy(() => import('./features/resume/pages/ResumePage'));
const BlogsPage = lazy(() => import('./features/blogs/pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./features/blogs/pages/BlogDetailPage'));
const ProjectsPage = lazy(() => import('./features/projects/pages/ProjectsPage'));
const ExperiencePage = lazy(() => import('./features/experience/pages/ExperiencePage'));
const HobbiesPage = lazy(() => import('./features/hobbies/pages/HobbiesPage'));
const AllBooksPage = lazy(() => import('./features/hobbies/pages/AllBooksPage'));
const AllMoviesPage = lazy(() => import('./features/hobbies/pages/AllMoviesPage'));
const AllPaintingsPage = lazy(() => import('./features/hobbies/pages/AllPaintingsPage'));

/**
 * Centralized route definitions.
 * All page routes are defined here and wrapped in the shared AppLayout.
 */

/** Loading fallback for lazy routes */
const PageLoader = () => {
  const { isDark } = useTheme();
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className={`w-6 h-6 rounded-full border-2 border-t-transparent animate-spin ${
          isDark ? 'border-white/30' : 'border-blue-400/40'
        }`}
      />
    </div>
  );
};

/** Placeholder page for routes not yet built */
const PlaceholderPage = ({ page }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`text-center ${isDark ? 'text-white' : 'text-slate-800'}`}>
      <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-wider">{page}</h1>
      <p
        className={`text-xs uppercase tracking-[0.3em] font-light ${
          isDark ? 'text-white/60' : 'text-blue-600/70'
        }`}
      >
        Page Under Construction
      </p>
      <button
        onClick={() => navigate('/')}
        className={`mt-6 px-4 py-2 border rounded-full text-xs font-bold tracking-widest transition-colors cursor-pointer ${
          isDark
            ? 'border-white text-white hover:bg-white hover:text-black'
            : 'border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
        }`}
      >
        BACK TO HOME
      </button>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Home */}
        <Route index element={<Hero />} />

        {/* Resume (lazy-loaded) */}
        <Route
          path="resume"
          element={
            <Suspense fallback={<PageLoader />}>
              <ResumePage />
            </Suspense>
          }
        />

        {/* Blogs (lazy-loaded) */}
        <Route
          path="blogs"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogsPage />
            </Suspense>
          }
        />

        {/* Blog Detail (lazy-loaded) */}
        <Route
          path="blog/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogDetailPage />
            </Suspense>
          }
        />

        {/* Projects (lazy-loaded) */}
        <Route
          path="projects"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProjectsPage />
            </Suspense>
          }
        />

        {/* Experience (lazy-loaded) */}
        <Route
          path="experience"
          element={
            <Suspense fallback={<PageLoader />}>
              <ExperiencePage />
            </Suspense>
          }
        />

        {/* Hobbies (lazy-loaded) */}
        <Route
          path="hobbies"
          element={
            <Suspense fallback={<PageLoader />}>
              <HobbiesPage />
            </Suspense>
          }
        />
        <Route
          path="hobbies/books"
          element={
            <Suspense fallback={<PageLoader />}>
              <AllBooksPage />
            </Suspense>
          }
        />
        <Route
          path="hobbies/movies"
          element={
            <Suspense fallback={<PageLoader />}>
              <AllMoviesPage />
            </Suspense>
          }
        />
        <Route
          path="hobbies/paintings"
          element={
            <Suspense fallback={<PageLoader />}>
              <AllPaintingsPage />
            </Suspense>
          }
        />

        {/* Placeholder routes for future pages */}
        {['SKILLS', 'CONTACT'].map((page) => (
          <Route
            key={page}
            path={page.toLowerCase()}
            element={<PlaceholderPage page={page} />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
