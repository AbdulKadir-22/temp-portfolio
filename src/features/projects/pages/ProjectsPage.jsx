import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { projects, projectConfig } from '../data/config';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import ProjectStatsWidget from '../components/ProjectStatsWidget';
import ProjectTechWidget from '../components/ProjectTechWidget';
import { ChevronDown, ExternalLink, X, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

/**
 * ProjectsPage — renders the full projects catalog with categories filter, grid/list layout controls,
 * sidebar statistics, tech stack, and interactive previews.
 */
const ProjectsPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleExploreProject = (project) => {
    navigate(`/project/${project.id}`);
  };

  const handleLoadMore = () => {
    // Show premium animation or increase visible count
    setVisibleCount((prev) => Math.min(projects.length, prev + 3));
  };

  return (
    <section
      id="projects-page"
      className="w-full max-w-[98vw] xl:max-w-[1650px] mx-auto px-4 flex flex-col items-center gap-6 py-4"
    >
      {/* Page Title */}
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
          {projectConfig.pageTitle}
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

      {/* Subtitle */}
      <p
        className={`
          text-xs sm:text-sm tracking-wide -mt-4 mb-2 text-center max-w-xl
          ${isDark ? 'text-white/50' : 'text-slate-500'}
        `}
      >
        {projectConfig.pageSubtitle}
      </p>

      {/* Two-column layout matching design mockup */}
      <div className="w-full lg:pl-[210px] xl:pl-[240px] flex flex-col lg:flex-row gap-10 items-start justify-between">
        
        {/* Left Column: Filters + Projects Catalog Grid (Takes 74% / 76%) */}
        <div className="w-full lg:w-[74%] xl:w-[76%] flex-shrink-0 flex flex-col gap-5">
          {/* Layout Filters (Category pills + Grid/List triggers) */}
          <ProjectFilters
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Project List / Grid Container */}
          {displayedProjects.length > 0 ? (
            <div
              className={`
                grid gap-5 w-full
                ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
                }
              `}
            >
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  onExplore={() => handleExploreProject(project)}
                />
              ))}
            </div>
          ) : (
            <div
              className={`
                text-center py-16 rounded-xl border
                ${isDark
                  ? 'bg-white/[0.02] border-white/10 text-white/40'
                  : 'bg-white/40 border-slate-200/60 text-slate-400'
                }
              `}
            >
              <p className="text-sm font-medium">No projects found in this category</p>
              <p className="text-xs mt-1 opacity-60">Try selecting another filter</p>
            </div>
          )}

          {/* View More Button */}
          {filteredProjects.length > displayedProjects.length && (
            <button
              onClick={handleLoadMore}
              className={`
                self-center flex items-center gap-1.5 px-6 py-2.5 rounded-xl border text-[10px] font-bold tracking-[0.1em] uppercase cursor-pointer
                transition-all duration-300 mt-4
                ${isDark
                  ? 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white/80 hover:border-white/20'
                  : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:text-slate-800 hover:border-slate-300 hover:shadow-sm'
                }
              `}
            >
              View More Projects
            </button>
          )}

          {/* Scroll to Explore Helper */}
          <div className="flex flex-col items-center gap-1 mt-6 text-slate-400 opacity-60">
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Scroll To Explore</span>
          </div>
        </div>

        {/* Right Column: Stats + Tech stack progress widgets (Pushed far right) */}
        <div className="w-full lg:w-[25%] xl:w-[23%] lg:max-w-[300px] flex-shrink-0 lg:ml-auto flex flex-col gap-4">
          <ProjectStatsWidget />
          <ProjectTechWidget />
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
