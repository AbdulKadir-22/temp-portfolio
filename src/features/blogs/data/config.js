/**
 * Blog page configuration.
 * All blog posts, categories, and tags are centralized here.
 */

import blogJourney from '../../../assets/blogs/blog-journey.png';
import blogFeatured from '../../../assets/blogs/blog-featured.png';


// Import markdown posts as raw strings
import howIBecameMeMd from './posts/how-i-became-me.md?raw';

export const blogMarkdownMap = {
  'how-i-became-me': howIBecameMeMd,
};

export const blogConfig = {
  pageTitle: 'My Blogs',
  pageSubtitle: 'Thoughts, stories and lessons from my journey.',
};

/** Category definitions with colors */
export const categories = [
  { id: 'journey', label: 'Journey', color: '#3b82f6', count: 1 },
  { id: 'technology', label: 'Technology', color: '#8b5cf6', count: 0 },
  { id: 'learnings', label: 'Learnings', color: '#06b6d4', count: 0 },
  { id: 'thoughts', label: 'Thoughts', color: '#eab308', count: 1 },
  { id: 'life', label: 'Life', color: '#22c55e', count: 1 },
];

/** Popular tags */
export const popularTags = [
  '#development', '#javascript', '#react',
  '#webdev', '#learning', '#productivity',
  '#mindset', '#projects', '#life',
];

/** Featured story */
export const featuredStory = {
  id: 'how-i-became-me',
  title: 'How I Became Me',
  description: 'Part journal, part laboratory, part unfinished conversation. These writings explore technology, creativity, ambition, and the quiet moments between them.',
  ctaText: 'Read My Story',
  image: blogFeatured,
};

/** All blog posts */
export const blogPosts = [
  {
    id: 'how-i-became-me',
    category: 'journey',
    title: 'How I Became Me',
    excerpt: 'A story of curiosity, late nights, failed attempts, and small wins that built the developer I am today.',
    date: 'May 25, 2025',
    readTime: '6 min read',
    image: blogJourney,
    featured: true,
  },

];
