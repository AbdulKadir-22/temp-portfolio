import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, Bookmark, Share2, 
  Bug, Moon, TrendingUp, Eye, Check, AlertCircle 
} from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { useTheme } from '../../../context/ThemeContext';
import { blogPosts, categories, blogMarkdownMap } from '../data/config';
import { parseFrontmatter, parseMarkdownBlocks, FormattedText } from '../utils/markdown';

// Map icon names to Lucide icon components for custom struggle cards grid
const struggleIconMap = {
  bug: Bug,
  moon: Moon,
  chart: TrendingUp,
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Component States
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  // 1. Load markdown content on mount/id change
  useEffect(() => {
    setLoading(true);
    setError(false);
    try {
      const rawText = blogMarkdownMap[id];
      if (rawText === undefined) {
        throw new Error('Post not found in configuration');
      }
      setMarkdown(rawText);
    } catch (err) {
      console.error('Failed to load markdown blog post:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // 2. Parse Markdown blocks and frontmatter metadata
  const { frontmatter, contentBlocks, headings } = useMemo(() => {
    if (!markdown) {
      return { frontmatter: {}, contentBlocks: [], headings: [] };
    }
    const { frontmatter: fm, content: body } = parseFrontmatter(markdown);
    const blocks = parseMarkdownBlocks(body);
    const h2s = blocks
      .filter((b) => b.type === 'heading' && b.level === 2)
      .map((b) => ({ text: b.text, id: b.id }));
    return { frontmatter: fm, contentBlocks: blocks, headings: h2s };
  }, [markdown]);

  // Merge local frontmatter metadata with initial static post configs
  const postMeta = useMemo(() => {
    const staticConfig = blogPosts.find((p) => p.id === id) || {};
    return {
      title: frontmatter.title || staticConfig.title || 'Untitled Post',
      category: frontmatter.category || staticConfig.category || 'journey',
      date: frontmatter.date || staticConfig.date || 'Unknown Date',
      readTime: frontmatter.readTime || staticConfig.readTime || '5 min read',
      image: staticConfig.image || '',
    };
  }, [id, frontmatter]);

  const categoryDetails = useMemo(() => {
    const cat = categories.find((c) => c.id === postMeta.category);
    return {
      label: cat?.label?.toUpperCase() || postMeta.category.toUpperCase(),
      color: cat?.color || '#3b82f6',
    };
  }, [postMeta]);

  // 3. Initialize and sync bookmarked state from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked_posts') || '[]');
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked_posts') || '[]');
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarks, id];
      setIsBookmarked(true);
    }
    localStorage.setItem('bookmarked_posts', JSON.stringify(updated));
  };

  // 4. Handle share (copy link to clipboard)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      })
      .catch((err) => console.error('Failed to copy link:', err));
  };

  // 5. Scroll indicators fade out on scroll
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto') || window;
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop || window.scrollY;
      if (scrollTop > 80) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Scrollspy to highlight active Table of Contents item
  useEffect(() => {
    if (headings.length === 0) return;
    const scrollContainer = document.querySelector('.overflow-y-auto') || window;

    const handleScrollSpy = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      if (headingElements.length === 0) return;

      let currentActive = headings[0].id;
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        // If the heading is in the upper half of the viewport (top header is roughly 120-180px)
        if (rect.top <= 180) {
          currentActive = el.id;
        }
      }
      setActiveSection(currentActive);
    };

    scrollContainer.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial call
    return () => scrollContainer.removeEventListener('scroll', handleScrollSpy);
  }, [headings]);

  // 7. Smooth scrolling navigation to headers (with sticky header offset)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (element && scrollContainer) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetScrollTop = scrollContainer.scrollTop + elementRect.top - containerRect.top - 100; // 100px offset for header
      scrollContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 8. Determine related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogPosts.filter((p) => p.id !== id).slice(0, 3);
  }, [id]);

  // ── Render Loading Screen ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${
          isDark ? 'border-white/30' : 'border-blue-400/40'
        }`} />
        <p className={`text-xs tracking-widest ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
          LOADING STORY...
        </p>
      </div>
    );
  }

  // ── Render Error Screen ──
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center py-32 px-6 text-center max-w-md mx-auto ${
        isDark ? 'text-white' : 'text-slate-800'
      }`}>
        <AlertCircle className="w-12 h-12 text-red-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold mb-2">Failed to load story</h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
          The blog post you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/blogs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold tracking-widest transition-all cursor-pointer ${
            isDark
              ? 'border-white/20 hover:bg-white hover:text-black hover:border-white'
              : 'border-slate-800/20 hover:bg-slate-800 hover:text-white hover:border-slate-800'
          }`}
        >
          <ArrowLeft size={14} />
          BACK TO BLOGS
        </button>
      </div>
    );
  }

  // ── Main Page Render ──
  return (
    <div
      id="blog-detail-container"
      className="w-full max-w-[98vw] xl:max-w-[1650px] mx-auto px-4 flex flex-col gap-6 py-4"
    >
      {/* 2-Column Responsive Layout */}
      <div className="w-full lg:pl-[210px] xl:pl-[240px] flex flex-col lg:flex-row gap-8 items-start justify-between">
        
        {/* Main Content Box */}
        <div className="w-full lg:w-[73%] xl:w-[75%] flex-shrink-0 flex flex-col gap-4">
          
          {/* Breadcrumb Navigation */}
          <Link
            to="/blogs"
            className={`
              inline-flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer
              ${isDark ? 'text-white/60 hover:text-blue-300' : 'text-slate-500 hover:text-blue-600'}
            `}
          >
            <ArrowLeft size={14} />
            Back to Blogs
          </Link>

          {/* Article Container Card */}
          <article
            className={`
              w-full p-6 sm:p-8 md:p-10 rounded-2xl border flex flex-col gap-6 relative
              ${isDark
                ? 'bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                : 'bg-white/70 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
              }
            `}
          >
            {/* Tag Header Row */}
            <header className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                {/* Category & Read Time Tags */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="text-[9px] sm:text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-md"
                    style={{ 
                      color: categoryDetails.color,
                      backgroundColor: `${categoryDetails.color}15`,
                      border: `1px solid ${categoryDetails.color}30`
                    }}
                  >
                    {categoryDetails.label}
                  </span>
                  <span className={`text-[10px] font-semibold tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    • &nbsp; {postMeta.readTime}
                  </span>
                </div>

                {/* Bookmark & Share Buttons */}
                <div className="flex items-center gap-2 relative">
                  <button
                    onClick={toggleBookmark}
                    className={`
                      p-2 rounded-lg border transition-all duration-200 cursor-pointer
                      ${isDark
                        ? isBookmarked 
                          ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' 
                          : 'border-white/10 hover:bg-white/5 text-white/50 hover:text-white'
                        : isBookmarked 
                          ? 'border-blue-300 bg-blue-50 text-blue-600' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600'
                      }
                    `}
                    aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Story'}
                  >
                    <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={handleShare}
                    className={`
                      p-2 rounded-lg border transition-all duration-200 cursor-pointer
                      ${isDark
                        ? 'border-white/10 hover:bg-white/5 text-white/50 hover:text-white'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600'
                      }
                    `}
                    aria-label="Share Story"
                  >
                    {showShareTooltip ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                  </button>

                  {/* Share Tooltip */}
                  {showShareTooltip && (
                    <div className={`
                      absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider z-20 shadow-md animate-in fade-in slide-in-from-bottom-1 duration-200 whitespace-nowrap
                      ${isDark ? 'bg-slate-800 text-white border border-white/10' : 'bg-slate-900 text-white'}
                    `}>
                      Link copied!
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-wide"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: isDark ? '#f1f5f9' : '#1e3a5f',
                }}
              >
                {postMeta.title}
              </h1>

              {/* Meta Date & View Row */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs">
                <div className={`flex items-center gap-1.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                  <Calendar size={12} />
                  <span>{postMeta.date}</span>
                </div>
                <div className={`flex items-center gap-1.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                  <Clock size={12} />
                  <span>{postMeta.readTime}</span>
                </div>
                <div className={`flex items-center gap-1.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                  <Eye size={12} />
                  <span>1.2K views</span>
                </div>
              </div>

              {/* Banner Image */}
              {postMeta.image && (
                <div className="w-full h-[200px] sm:h-[300px] md:h-[380px] rounded-xl overflow-hidden mt-2 relative">
                  <img
                    src={postMeta.image}
                    alt={postMeta.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </header>

            {/* Render Body Content Blocks */}
            <section className={`
              flex flex-col gap-5 text-sm sm:text-[15px] leading-relaxed tracking-wide font-normal mt-4
              ${isDark ? 'text-slate-300' : 'text-slate-700'}
            `}>
              {contentBlocks.map((block, idx) => {
                switch (block.type) {
                  case 'heading': {
                    if (block.level === 2) {
                      return (
                        <h2
                          key={idx}
                          id={block.id}
                          className="text-lg sm:text-xl font-bold mt-6 mb-1 tracking-wider border-b pb-2 cursor-pointer group"
                          style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: isDark ? '#e2e8f0' : '#1e3a5f',
                            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,58,95,0.08)'
                          }}
                          onClick={() => scrollToSection(block.id)}
                        >
                          <span className="text-blue-500 mr-2 group-hover:underline">#</span>
                          <FormattedText text={block.text} />
                        </h2>
                      );
                    }
                    return (
                      <h3
                        key={idx}
                        id={block.id}
                        className="text-base sm:text-lg font-bold mt-4 mb-1 tracking-wide"
                        style={{
                          color: isDark ? '#cbd5e1' : '#2c4a6f',
                        }}
                      >
                        <FormattedText text={block.text} />
                      </h3>
                    );
                  }

                  case 'paragraph':
                    return (
                      <p key={idx} className="indent-0">
                        <FormattedText text={block.lines.join(' ')} />
                      </p>
                    );

                  case 'blockquote':
                    return (
                      <blockquote
                        key={idx}
                        className={`
                          pl-5 py-3.5 pr-4 border-l-4 rounded-r-xl italic my-4 text-sm sm:text-base font-medium relative overflow-hidden
                          ${isDark 
                            ? 'bg-white/[0.01] text-blue-200' 
                            : 'bg-blue-500/[0.04] text-blue-900'
                          }
                        `}
                        style={{ borderColor: categoryDetails.color }}
                      >
                        <FormattedText text={block.lines.join(' ')} />
                      </blockquote>
                    );

                  case 'list':
                    return (
                      <ul key={idx} className="list-disc pl-6 flex flex-col gap-2 my-2">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <FormattedText text={item} />
                          </li>
                        ))}
                      </ul>
                    );

                  case 'ordered-list':
                    return (
                      <ol key={idx} className="list-decimal pl-6 flex flex-col gap-2 my-2">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <FormattedText text={item} />
                          </li>
                        ))}
                      </ol>
                    );

                  case 'code':
                    return (
                      <div key={idx} className="my-4 rounded-xl overflow-hidden border border-white/5 relative">
                        <div className="bg-slate-900/80 px-4 py-2 text-[10px] font-mono tracking-widest text-slate-400 border-b border-white/5 flex items-center justify-between">
                          <span>{block.lang.toUpperCase()}</span>
                        </div>
                        <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-normal">
                          <code>{block.content}</code>
                        </pre>
                      </div>
                    );

                  case 'grid':
                    return (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                        {block.cards.map((card, cardIdx) => {
                          const IconComponent = struggleIconMap[card.icon] || AlertCircle;
                          return (
                            <div
                              key={cardIdx}
                              className={`
                                p-5 rounded-xl border flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:-translate-y-1
                                ${isDark
                                  ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                                  : 'bg-white/80 border-slate-200/60 shadow-md hover:shadow-lg'
                                }
                              `}
                            >
                              <div className={`p-2.5 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} style={{ color: categoryDetails.color }}>
                                <IconComponent size={20} />
                              </div>
                              <h4 className="font-bold text-xs uppercase tracking-wider">{card.title}</h4>
                              <p className={`text-xs ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{card.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </section>

            {/* Scroll Explore Indicator inside container */}
            {showScrollIndicator && headings.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none animate-bounce">
                <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                  Scroll to Explore
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={isDark ? 'text-yellow-400/60' : 'text-blue-500/60'}
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            )}
          </article>
        </div>

        {/* Right Widget Sidebar */}
        <aside className="w-full lg:w-[25%] xl:w-[23%] lg:max-w-[300px] flex-shrink-0 lg:ml-auto flex flex-col gap-6 lg:sticky lg:top-[100px] lg:self-start">
          
          {/* Widget 1: About the Author */}
          <div
            className={`
              p-5 rounded-2xl border flex flex-col gap-4 text-center items-center
              ${isDark
                ? 'bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                : 'bg-white/70 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
              }
            `}
          >
            <h3 
              className="text-xs font-bold tracking-[0.2em] uppercase w-full text-left"
              style={{ color: isDark ? '#94a3b8' : '#475569' }}
            >
              About the Author
            </h3>
            
            {/* Avatar image from unsplash placeholder */}
            <div className="w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-blue-500/20 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Abdulkadir Shaikh" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <h4 className="font-bold text-sm tracking-wide">Abdulkadir Shaikh</h4>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                Developer • Learner • Dreamer
              </p>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              I write about my experiences, lessons, and thoughts on tech, life and everything in between.
            </p>

            {/* Author Social Links */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: FaGithub, label: 'GitHub', href: 'https://github.com/AbdulKadir-22' },
                { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
                { icon: FaXTwitter, label: 'Twitter', href: '#' },
                { icon: FaInstagram, label: 'Instagram', href: '#' }
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className={`
                    w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer
                    ${isDark 
                      ? 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10' 
                      : 'bg-white border-blue-100 text-blue-500 hover:bg-blue-50 hover:border-blue-200'
                    }
                  `}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Widget 2: Table of Contents */}
          {headings.length > 0 && (
            <div
              className={`
                p-5 rounded-2xl border flex flex-col gap-3
                ${isDark
                  ? 'bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                  : 'bg-white/70 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
                }
              `}
            >
              <h3 
                className="text-xs font-bold tracking-[0.2em] uppercase border-b pb-2"
                style={{ 
                  color: isDark ? '#94a3b8' : '#475569',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' 
                }}
              >
                Table of Contents
              </h3>
              
              <nav className="flex flex-col gap-2.5 mt-1">
                {headings.map((h, hIdx) => {
                  const numberPrefix = String(hIdx + 1).padStart(2, '0');
                  const isActive = activeSection === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => scrollToSection(h.id)}
                      className={`
                        flex items-start gap-3 text-xs text-left font-medium transition-all duration-200 cursor-pointer hover:pl-1
                        ${isActive 
                          ? isDark 
                            ? 'text-blue-300 font-bold' 
                            : 'text-blue-600 font-bold' 
                          : isDark 
                            ? 'text-white/40 hover:text-white/70' 
                            : 'text-slate-400 hover:text-slate-600'
                        }
                      `}
                    >
                      <span className={`text-[10px] font-bold font-mono tracking-wider ${isActive ? 'text-blue-500' : 'opacity-60'}`}>
                        {numberPrefix}
                      </span>
                      <span className="leading-snug">{h.text}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Widget 3: Related Posts */}
          {relatedPosts.length > 0 && (
            <div
              className={`
                p-5 rounded-2xl border flex flex-col gap-4
                ${isDark
                  ? 'bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                  : 'bg-white/70 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
                }
              `}
            >
              <h3 
                className="text-xs font-bold tracking-[0.2em] uppercase border-b pb-2"
                style={{ 
                  color: isDark ? '#94a3b8' : '#475569',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' 
                }}
              >
                Related Posts
              </h3>

              <div className="flex flex-col gap-4 mt-1">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    {/* Related Thumbnail */}
                    <div className="w-[60px] h-[48px] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {/* Related Content */}
                    <div className="flex flex-col min-w-0">
                      <h4 
                        className={`
                          text-xs font-bold leading-snug line-clamp-1 transition-colors duration-200
                          ${isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-800 group-hover:text-blue-600'}
                        `}
                      >
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[9px] opacity-50">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>

      </div>
    </div>
  );
};

export default BlogDetailPage;
