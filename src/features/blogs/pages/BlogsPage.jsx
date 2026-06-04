import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { blogConfig, blogPosts, featuredStory } from '../data/config';
import BlogCard from '../components/BlogCard';
import JourneyCard from '../../../components/JourneyCard';
import CategoriesSidebar from '../components/CategoriesSidebar';
import PopularTags from '../components/PopularTags';
import BlogSearchBar from '../components/BlogSearchBar';
import BlogPagination from '../components/BlogPagination';

const POSTS_PER_PAGE = 4;

/**
 * BlogsPage — main blogs listing page.
 * Two-column layout: blog list (left) + sidebar (right).
 * Optimized size: Left main blogs section is expanded by 25% for high scannability,
 * and the right sidebar is pushed further to the right.
 */
const BlogsPage = () => {
  const { isDark } = useTheme();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarked_posts') || '[]');
    setBookmarkedPosts(new Set(saved));
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      );
    }

    if (activeCategory) {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    return posts;
  }, [searchQuery, activeCategory]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      localStorage.setItem('bookmarked_posts', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag) => {
    setActiveTag(tag);
  };

  return (
    <section
      id="blogs-page"
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
          {blogConfig.pageTitle}
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
          text-xs sm:text-sm tracking-wide -mt-4 mb-2
          ${isDark ? 'text-white/50' : 'text-slate-500'}
        `}
      >
        {blogConfig.pageSubtitle}
      </p>

      {/* Two-column layout: reduced left padding + widened container pushes things right and yields 25% bigger section */}
      <div className="w-full lg:pl-[210px] xl:pl-[240px] flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Left Side: Search + Blog Cards + Pagination (Increased width to 74% / 76%) */}
        <div className="w-full lg:w-[74%] xl:w-[76%] flex-shrink-0 flex flex-col gap-4">
          {/* Search Bar */}
          <BlogSearchBar
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            onFilterToggle={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            onCategoriesToggle={() => setShowCategories(!showCategories)}
            showCategories={showCategories}
          />

          {/* Mobile expandable Categories & Tags panel */}
          {showCategories && (
            <div className="lg:hidden flex flex-col gap-4 w-full p-4 rounded-xl border border-dashed border-blue-400/20 bg-blue-500/[0.01] backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
              <CategoriesSidebar
                activeCategory={activeCategory}
                onCategorySelect={handleCategorySelect}
              />
              <PopularTags
                activeTag={activeTag}
                onTagSelect={handleTagSelect}
              />
            </div>
          )}

          {/* Blog Cards */}
          <div className="flex flex-col gap-3">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarkedPosts.has(post.id)}
                />
              ))
            ) : (
              <div
                className={`
                  text-center py-12 rounded-xl border
                  ${isDark
                    ? 'bg-white/[0.02] border-white/10 text-white/40'
                    : 'bg-white/40 border-slate-200/60 text-slate-400'
                  }
                `}
              >
                <p className="text-sm font-medium">No articles found</p>
                <p className="text-xs mt-1 opacity-60">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        {/* Right Sidebar: Reusable JourneyCard + Categories + Tags (Pushed further right) */}
        <div className="w-full lg:w-[25%] xl:w-[23%] lg:max-w-[300px] flex-shrink-0 lg:ml-auto flex flex-col gap-4">
          <JourneyCard
            isFeatured={true}
            label="FEATURED STORY"
            title={featuredStory.title}
            description={featuredStory.description}
            ctaText={featuredStory.ctaText}
            ctaLink={`/blog/${featuredStory.id}`}
            image={featuredStory.image}
          />
          <div className="hidden lg:flex lg:flex-col lg:gap-4 w-full">
            <CategoriesSidebar
              activeCategory={activeCategory}
              onCategorySelect={handleCategorySelect}
            />
            <PopularTags
              activeTag={activeTag}
              onTagSelect={handleTagSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
