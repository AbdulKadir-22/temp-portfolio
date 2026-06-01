/**
 * Blog page configuration.
 * All blog posts, categories, and tags are centralized here.
 */

import blogJourney from '../../../assets/blogs/blog-journey.png';
import blogTechnology from '../../../assets/blogs/blog-technology.png';
import blogLearnings from '../../../assets/blogs/blog-learnings.png';
import blogThoughts from '../../../assets/blogs/blog-thoughts.png';
import blogFeatured from '../../../assets/blogs/blog-featured.png';

export const blogConfig = {
  pageTitle: 'My Blogs',
  pageSubtitle: 'Thoughts, stories and lessons from my journey.',
};

/** Category definitions with colors */
export const categories = [
  { id: 'journey', label: 'Journey', color: '#3b82f6', count: 4 },
  { id: 'technology', label: 'Technology', color: '#8b5cf6', count: 6 },
  { id: 'learnings', label: 'Learnings', color: '#06b6d4', count: 5 },
  { id: 'thoughts', label: 'Thoughts', color: '#eab308', count: 3 },
  { id: 'life', label: 'Life', color: '#22c55e', count: 2 },
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
  description: 'A deeply personal story about curiosity, struggles, and the moments that changed everything.',
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
  {
    id: 'why-i-love-building-things',
    category: 'technology',
    title: 'Why I Love Building Things for the Web',
    excerpt: 'Exploring the magic of turning ideas into interactive experiences that live on the internet.',
    date: 'May 12, 2025',
    readTime: '5 min read',
    image: blogTechnology,
    featured: false,
  },
  {
    id: 'lessons-from-my-first-big-project',
    category: 'learnings',
    title: 'Lessons from My First Big Project',
    excerpt: 'What I learned while building my first major project — mistakes, challenges and breakthroughs.',
    date: 'Apr 28, 2025',
    readTime: '7 min read',
    image: blogLearnings,
    featured: false,
  },
  {
    id: 'the-developer-mindset',
    category: 'thoughts',
    title: 'The Developer Mindset',
    excerpt: 'On consistency, problem solving, and staying curious in a world that\'s always changing.',
    date: 'Apr 10, 2025',
    readTime: '4 min read',
    image: blogThoughts,
    featured: false,
  },
];
