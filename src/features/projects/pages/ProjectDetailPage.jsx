import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { siteContent } from '../../../data/content';
import { 
  ArrowLeft, Calendar, Clock, Star, ExternalLink, 
  Users, CheckCircle2, ChevronLeft, ChevronRight,
  TrendingUp, Activity, Code, Cpu, Layers, ShieldAlert,
  MapPin, Rocket, Award
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';
import { projects } from '../data/config';
import { projectDetails } from '../data/projectDetails';

// Map metric icon keys to Lucide components
const metricIconMap = {
  users: Users,
  trending: TrendingUp,
  clock: Clock,
  star: Star
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Find base project metadata
  const baseProject = useMemo(() => {
    return projects.find((p) => p.id === id);
  }, [id]);

  // Find detailed project case study
  const details = useMemo(() => {
    return projectDetails[id] || null;
  }, [id]);

  // Active Tab State (tracked by scrollspy or manual tab click)
  const [activeTab, setActiveTab] = useState('overview');
  
  // Screenshots Slider Index
  const [currentScreenshotIdx, setCurrentScreenshotIdx] = useState(0);

  // Favorite Star Toggle
  const [isStarred, setIsStarred] = useState(baseProject?.starred || false);

  // 1. Scrollspy to update active tab based on container scroll position
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (!scrollContainer) return;

    const handleScrollSpy = () => {
      const sectionIds = ['overview', 'features', 'techstack', 'screenshots', 'architecture', 'challenges', 'futurescope'];
      const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
      if (elements.length === 0) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      let currentActive = sectionIds[0];

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // Since container top is 0, we check if the element's top is near the top of the viewport
        if (rect.top <= 200) {
          currentActive = el.id;
        }
      }
      setActiveTab(currentActive);
    };

    scrollContainer.addEventListener('scroll', handleScrollSpy, { passive: true });
    // Run an initial deferred check to capture position on load
    const timer = setTimeout(handleScrollSpy, 150);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScrollSpy);
      clearTimeout(timer);
    };
  }, []);

  // Fallback if project is not found
  if (!baseProject || !details) {
    return (
      <div className={`flex flex-col items-center justify-center py-32 px-6 text-center max-w-md mx-auto ${
        isDark ? 'text-white' : 'text-slate-800'
      }`}>
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
          The project case study you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold tracking-widest transition-all cursor-pointer ${
            isDark
              ? 'border-white/20 hover:bg-white hover:text-black hover:border-white'
              : 'border-slate-800/20 hover:bg-slate-800 hover:text-white hover:border-slate-800'
          }`}
        >
          <ArrowLeft size={14} />
          BACK TO PROJECTS
        </button>
      </div>
    );
  }

  // Theme styling helpers (Opaque panels for readability)
  const glassCardStyle = isDark 
    ? 'bg-[#0C0A09]/92 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md' 
    : 'bg-white/90 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)] backdrop-blur-md';

  const badgeColor = baseProject.badge.toLowerCase().includes('stack')
    ? { text: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)' }
    : baseProject.badge.toLowerCase().includes('app')
    ? { text: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)' }
    : { text: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)' };

  // Slider navigation
  const prevScreenshot = () => {
    setCurrentScreenshotIdx((prev) => (prev === 0 ? 2 : prev - 1));
  };
  const nextScreenshot = () => {
    setCurrentScreenshotIdx((prev) => (prev === 2 ? 0 : prev + 1));
  };

  // Static mock screenshots for slider
  const mockScreenshots = [
    baseProject.image,
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=480&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=480&q=80"
  ];

  // Click handler to scroll to corresponding section inside AppLayout scrollbar container
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const container = document.querySelector('.overflow-y-auto');
    const element = document.getElementById(tabId);
    if (container && element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top + container.scrollTop;
      
      // Offset for sticky navigation and sub-tabs header (130px)
      const offset = 130;
      
      container.scrollTo({
        top: relativeTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="project-detail-container"
      className="w-full max-w-[98vw] xl:max-w-[1650px] mx-auto px-4 flex flex-col gap-6 py-4"
    >
      {/* 2-Column Responsive Layout */}
      <div className="w-full lg:pl-[210px] xl:pl-[240px] flex flex-col lg:flex-row gap-8 items-start justify-between">
        
        {/* Main Content Box (Left Column) */}
        <div className="w-full lg:w-[73%] xl:w-[75%] flex-shrink-0 flex flex-col gap-5">
          
          {/* Breadcrumb Navigation */}
          <Link
            to="/projects"
            className={`
              inline-flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer
              ${isDark ? 'text-white/60 hover:text-blue-300' : 'text-slate-500 hover:text-blue-600'}
            `}
          >
            <ArrowLeft size={14} />
            Back to Projects
          </Link>

          {/* Hero Header Card */}
          <div className={`w-full p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row gap-6 ${glassCardStyle}`}>
            {/* Left Cover Image */}
            <div className="w-full md:w-[45%] aspect-[16/10] rounded-xl overflow-hidden relative border border-white/5 flex-shrink-0">
              <img
                src={baseProject.image}
                alt={baseProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Quick Info */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  {/* Category Badge */}
                  <span
                    className="text-[9px] sm:text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-md border"
                    style={{ 
                      color: badgeColor.text,
                      backgroundColor: badgeColor.bg,
                      borderColor: badgeColor.border
                    }}
                  >
                    {baseProject.badge}
                  </span>

                  {/* Star Toggle */}
                  <button
                    onClick={() => setIsStarred(!isStarred)}
                    className={`
                      p-2 rounded-lg border transition-all duration-200 cursor-pointer
                      ${isDark
                        ? isStarred 
                          ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' 
                          : 'border-white/10 hover:bg-white/5 text-white/50 hover:text-white'
                        : isStarred 
                          ? 'border-blue-300 bg-blue-50 text-blue-600' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600'
                      }
                    `}
                    aria-label="Star Project"
                  >
                    <Star size={14} fill={isStarred ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <h1
                  className="text-2xl sm:text-3xl font-black leading-tight tracking-wide"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: isDark ? '#f1f5f9' : '#1e3a5f',
                  }}
                >
                  {baseProject.title}
                </h1>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                  {details.subtitle}
                </p>
              </div>

              {/* Quick Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {baseProject.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`
                      text-[9px] font-bold px-2 py-1 rounded border tracking-wide uppercase
                      ${isDark 
                        ? 'bg-white/[0.03] border-white/5 text-white/40' 
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                      }
                    `}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 border-t border-dashed pt-3 border-white/5">
                <a
                  href={`https://demo.shaikh.dev/${baseProject.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer
                    ${isDark
                      ? 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
                      : 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white hover:shadow-lg hover:shadow-blue-600/20'
                    }
                  `}
                >
                  <ExternalLink size={12} />
                  Live Demo
                </a>

                <a
                  href={`https://github.com/AbdulKadir-22/${baseProject.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer
                    ${isDark
                      ? 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }
                  `}
                >
                  <FaGithub size={12} />
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>

          {/* Sticky Navigation Tabs Header */}
          <div className={`sticky top-0 z-[40] -mx-4 px-4 py-2 border-b backdrop-blur-md transition-colors duration-300 ${
            isDark ? 'bg-[#0C0A09]/90 border-white/10' : 'bg-[#FAFAF9]/90 border-slate-200'
          }`}>
            <div className="w-full flex items-center overflow-x-auto gap-1 no-scrollbar">
              {[
                { id: 'overview', label: 'Overview', icon: Layers },
                { id: 'features', label: 'Features', icon: CheckCircle2 },
                { id: 'techstack', label: 'Tech Stack', icon: Code },
                { id: 'screenshots', label: 'Screenshots', icon: Cpu },
                { id: 'architecture', label: 'Architecture', icon: Activity },
                { id: 'challenges', label: 'Challenges', icon: ShieldAlert },
                { id: 'futurescope', label: 'Future Scope', icon: Rocket }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider whitespace-nowrap cursor-pointer transition-all duration-200
                      ${isActive
                        ? isDark
                          ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                        : isDark
                          ? 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent'
                      }
                    `}
                  >
                    <TabIcon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continuous Scrollable Case Study Body Container */}
          <div className={`w-full p-6 sm:p-8 rounded-2xl border flex flex-col gap-12 ${glassCardStyle}`}>
            
            {/* SECTION 1: OVERVIEW */}
            <section id="overview" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">01</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Overview
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Project</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {details.longDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Feature Set</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <h5 className="text-xs font-bold uppercase tracking-wider">{feat.title}</h5>
                        <p className={`text-xs ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screenshots Slider Sub-component */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Slider Previews</h4>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prevScreenshot}
                      className={`p-1.5 rounded-lg border cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                      aria-label="Previous"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={nextScreenshot}
                      className={`p-1.5 rounded-lg border cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                      aria-label="Next"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/5 relative bg-black/20 flex items-center justify-center">
                  <img
                    src={mockScreenshots[currentScreenshotIdx]}
                    alt="Project Screenshot"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {mockScreenshots.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentScreenshotIdx(dotIdx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          dotIdx === currentScreenshotIdx 
                            ? 'bg-blue-400 w-3' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: FEATURES */}
            <section id="features" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">02</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Features
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {details.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`
                      p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5
                      ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-200/60'}
                    `}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-400 mt-0.5 flex-shrink-0">
                      <Award size={16} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold tracking-wide">{feat.title}</h4>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                        {feat.desc} Implementation leverages structured component layouts, high performing async state, cached calculations, and custom hooks fully compatible with our global configuration.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: TECH STACK */}
            <section id="techstack" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">03</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Tech Stack Specs
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(details.techStackCategorized).map(([category, list]) => (
                  <div
                    key={category}
                    className={`
                      p-4 rounded-xl border flex flex-col gap-3
                      ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-200/60'}
                    `}
                  >
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-2">
                      {category}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {list.map((tech) => (
                        <div key={tech.name} className="flex items-center justify-between">
                          <span className="text-xs font-bold">{tech.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            isDark ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-100 border-slate-200 text-slate-500'
                          }`}>
                            {tech.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: SCREENSHOTS */}
            <section id="screenshots" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">04</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Screenshots Gallery
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockScreenshots.map((scr, idx) => (
                  <div
                    key={idx}
                    className={`
                      group relative rounded-xl border overflow-hidden aspect-[16/10] cursor-pointer
                      ${isDark ? 'border-white/10' : 'border-slate-200'}
                    `}
                  >
                    <img
                      src={scr}
                      alt={`Screenshot View ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-widest text-white uppercase border border-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        Fullscreen View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">05</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Architecture
                </h3>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {details.architectureText}
              </p>

              {/* Blueprint Flowchart */}
              <div className={`p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-100/50 border-slate-200'
              }`}>
                <div className={`w-full md:w-[28%] p-4 rounded-xl border text-center ${
                  isDark ? 'bg-[#0C0A09] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <h5 className="text-xs font-black uppercase tracking-wider text-blue-500 mb-1">CLIENT CONTAINER</h5>
                  <p className={`text-[10px] ${isDark ? 'text-white/45' : 'text-slate-500'}`}>React Application State, Mapbox Engine Layers, Websocket Handler Listener.</p>
                </div>

                <div className={`hidden md:block w-8 h-[2px] ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />

                <div className={`w-full md:w-[28%] p-4 rounded-xl border text-center ${
                  isDark ? 'bg-[#0C0A09] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <h5 className="text-xs font-black uppercase tracking-wider text-yellow-500 mb-1">ORCHESTRATOR API</h5>
                  <p className={`text-[10px] ${isDark ? 'text-white/45' : 'text-slate-500'}`}>Express Server Handlers, JSON Web Tokens Validator, Redis Cache Queue Worker.</p>
                </div>

                <div className={`hidden md:block w-8 h-[2px] ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />

                <div className={`w-full md:w-[28%] p-4 rounded-xl border text-center ${
                  isDark ? 'bg-[#0C0A09] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <h5 className="text-xs font-black uppercase tracking-wider text-purple-500 mb-1">DATABASE STORAGE</h5>
                  <p className={`text-[10px] ${isDark ? 'text-white/45' : 'text-slate-500'}`}>MongoDB collections storing transactional metrics, history coordinates logs database.</p>
                </div>
              </div>
            </section>

            {/* SECTION 6: CHALLENGES */}
            <section id="challenges" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">06</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Challenges
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {details.challenges.map((chal, idx) => (
                  <div
                    key={idx}
                    className={`
                      p-5 rounded-xl border flex flex-col gap-3
                      ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-200/60'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">
                        THE CHALLENGE
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">{chal.title}</h4>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                      {chal.desc} Setup static network thresholds, isolated mock frameworks, automated testing pipelines, and unified coordinate checks.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: FUTURE SCOPE */}
            <section id="futurescope" className="scroll-mt-32 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-dashed pb-2 border-white/10">
                <span className="text-xs font-mono text-blue-400 font-bold">07</span>
                <h3 className="text-base font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: isDark ? '#e2e8f0' : '#1e3a5f' }}>
                  Future Scope
                </h3>
              </div>

              <div className="flex flex-col gap-5 relative pl-4 border-l border-dashed border-white/10 ml-2 py-2">
                {details.futureScope.map((scope, idx) => (
                  <div key={idx} className="relative flex gap-3 items-start">
                    <div className="absolute left-[-21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white/80 dark:border-slate-950" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">PHASE 0{idx + 1}</span>
                      <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-white/85' : 'text-slate-700'}`}>
                        {scope}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* Right Widget Sidebar (Sticky alongside content) */}
        <aside className="w-full lg:w-[25%] xl:w-[23%] lg:max-w-[300px] flex-shrink-0 lg:ml-auto flex flex-col gap-6 lg:sticky lg:top-[100px] lg:self-start">
          
          {/* Widget 1: Project Highlights */}
          <div className={`p-5 rounded-2xl border flex flex-col gap-4 ${glassCardStyle}`}>
            <h3 
              className="text-xs font-bold tracking-[0.2em] uppercase w-full text-left"
              style={{ color: isDark ? '#94a3b8' : '#475569' }}
            >
              Project Highlights
            </h3>

            <div className="flex flex-col gap-3.5 mt-1">
              {[
                { label: "Duration", value: details.highlights.duration, icon: Calendar },
                { label: "Role", value: details.highlights.role, icon: MapPin },
                { label: "Team Size", value: details.highlights.teamSize, icon: Users },
                { label: "Project Type", value: details.highlights.projectType, icon: Cpu }
              ].map(({ label, value, icon: HighlightIcon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-white/5 text-white/50' : 'bg-slate-100 text-slate-400'}`}>
                    <HighlightIcon size={14} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[10px] font-semibold tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                      {label}
                    </span>
                    <span className="text-xs font-bold tracking-wide">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Technology Stack */}
          <div className={`p-5 rounded-2xl border flex flex-col gap-4 ${glassCardStyle}`}>
            <h3 
              className="text-xs font-bold tracking-[0.2em] uppercase border-b pb-2"
              style={{ 
                color: isDark ? '#94a3b8' : '#475569',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' 
              }}
            >
              Technology Stack
            </h3>

            <div className="flex flex-col gap-3.5 mt-1">
              {Object.entries(details.techStackCategorized).map(([category, items]) => (
                <div key={category} className="flex flex-col gap-1.5">
                  <span className={`text-[10px] font-semibold uppercase tracking-widest opacity-60`}>
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((tech) => (
                      <span
                        key={tech.name}
                        className={`
                          text-[9px] font-bold px-2 py-1 rounded-md border tracking-wide transition-all hover:scale-102
                          ${isDark
                            ? 'bg-blue-500/5 border-blue-500/10 text-blue-300'
                            : 'bg-blue-50 border-blue-100 text-blue-600'
                          }
                        `}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Project Metrics */}
          <div className={`p-5 rounded-2xl border flex flex-col gap-4 ${glassCardStyle}`}>
            <h3 
              className="text-xs font-bold tracking-[0.2em] uppercase border-b pb-2"
              style={{ 
                color: isDark ? '#94a3b8' : '#475569',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' 
              }}
            >
              Project Metrics
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-1">
              {details.metrics.map((metric) => {
                const MetricIcon = metricIconMap[metric.icon] || Star;
                return (
                  <div
                    key={metric.label}
                    className={`
                      p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5
                      ${isDark ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]' : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'}
                    `}
                  >
                    <div className="text-blue-500">
                      <MetricIcon size={14} />
                    </div>
                    <span className="text-xs font-bold tracking-wide">
                      {metric.value}
                    </span>
                    <span className={`text-[9px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Widget 4: Status Indicator */}
          <div className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-3 relative overflow-hidden ${glassCardStyle}`}>
            
            {/* Status dot glowing pulse */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative" />
            </div>

            <h3 
              className="text-xs font-bold tracking-[0.2em] uppercase w-full text-left"
              style={{ color: isDark ? '#94a3b8' : '#475569' }}
            >
              Status
            </h3>

            {/* Pulsing visual orbital status shape */}
            <div className="relative w-16 h-16 rounded-full border border-dashed border-blue-500/40 flex items-center justify-center my-1 animate-spin-slow">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                <Rocket size={18} className="text-blue-400 animate-pulse" />
              </div>
              <div className="absolute w-2 h-2 rounded-full bg-yellow-400 top-1 left-2 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold tracking-wide">{siteContent.personal.name}</span>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                {details.status}
              </p>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default ProjectDetailPage;
