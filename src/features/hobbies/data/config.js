import booksData from './books.json';
import moviesData from './movies.json';
import paintingsData from './paintings.json';

export const books = booksData;
export const movies = moviesData;
export const paintings = paintingsData;

export const hobbiesConfig = {
  pageTitle: 'Beyond the Code',
  pageSubtitle: 'A curated collection of books, movies, and paintings that shape my mindset, imagination, and creative journey.',
  stats: [
    { label: 'Books Read', value: '45+', color: 'blue' },
    { label: 'Movies & Series', value: '40+', color: 'purple' },
    { label: 'Paintings & Sketches', value: '18+', color: 'gold' }
  ]
};
