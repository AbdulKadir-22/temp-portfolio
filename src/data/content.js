/**
 * Site-wide content configuration.
 * All static text and metadata is centralized here for easy updates.
 * Page-specific data should be lazy-loaded from feature data modules.
 */

export const siteContent = {
  personal: {
    name: 'Alfisha  Shaikh',
    firstName: 'Alfisha',
    lastName: 'SHAIKH',
    title: 'Developer · Learner · Dreamer',
    tagline:
      'I want to become sun who shines other, but am a meteor who only shines when he is falling.',
  },

  location: {
    label: 'LOCATION',
    status: 'Earth',
    subtext: 'Milky Way',
  },

  status: {
    label: 'STATUS',
    status: 'Dreaming',
    subtext: 'Building · Learning · Growing',
  },

  nowPlaying: {
    label: 'NOW PLAYING',
    track: 'Interstellar',
    artist: 'Cornfield Chase',
  },

  navigation: [
    { id: '01', label: 'BLOGS', subtext: 'My story, my journey' },
    { id: '02', label: 'SKILLS', subtext: "What I'm good at" },
    { id: '03', label: 'PROJECTS', subtext: 'My work & creations' },
    { id: '04', label: 'EXPERIENCE', subtext: 'My journey so far' },
    { id: '05', label: 'HOBBIES', subtext: 'Beyond the code' },
    { id: '06', label: 'CONTACT', subtext: "Let's connect" },
  ],
};
