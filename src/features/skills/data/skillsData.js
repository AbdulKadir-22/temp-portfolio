import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiSocketdotio,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiGithubactions,
  SiNginx,
  SiLinux,
  SiVercel,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpenai,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiNpm,
  SiWebpack,
  SiVite
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

import frontendPlanet from '../../../assets/skills/frontend.png';
import backendPlanet from '../../../assets/skills/Backend.png';
import databasePlanet from '../../../assets/skills/Database.png';
import aiPlanet from '../../../assets/skills/Locked.png';
import toolsPlanet from '../../../assets/skills/tools.png';

export const skillsConfig = {
  pageTitle: 'My Skills',
  pageSubtitle:
    'A growing collection of technologies, tools, ideas, and disciplines that shape the things I create.',
  quote: 'Every skill started as a mystery I refused to leave unsolved.',
};

export const skillsData = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    planet: frontendPlanet,
    count: '8 Technologies',
    description:
      'The visible side of my ideas. I enjoy transforming concepts into experiences that feel intuitive, expressive, and alive. From portfolio experiments to hackathon products, frontend development is where design meets engineering.',
    angle: -126,
    proficiencies: [
      { name: 'React / Next.js', percentage: 90 },
      { name: 'JavaScript (ES6+)', percentage: 88 },
      { name: 'TypeScript', percentage: 82 },
      { name: 'UI/UX Design', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 92 }
    ],
    technologies: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000', lightColor: '#000000', darkColor: '#FFFFFF' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Sass', icon: SiSass, color: '#CC6699' }
    ],
    featuredProjects: ['astroblog', 'portfoliov2', 'devconnect']
  },

  {
    id: 'backend',
    title: 'Backend Development',
    planet: backendPlanet,
    count: '7 Technologies',
    description:
      'My favorite playground. I enjoy architecting APIs, designing systems, solving data-flow challenges, and building the invisible foundations that power modern applications. Most of my recent growth has been focused on becoming a stronger backend engineer.',
    angle: -54,
    proficiencies: [
      { name: 'Node.js / Express', percentage: 90 },
      { name: 'NestJS', percentage: 78 },
      { name: 'REST APIs', percentage: 92 },
      { name: 'Authentication & Security', percentage: 85 },
      { name: 'WebSockets', percentage: 82 }
    ],
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#000000', lightColor: '#000000', darkColor: '#FFFFFF' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Socket.io', icon: SiSocketdotio, color: '#010101', lightColor: '#010101', darkColor: '#FFFFFF' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' }
    ],
    featuredProjects: ['devconnect', 'neargrab', 'portyours']
  },

  {
    id: 'databases',
    title: 'Databases & Data',
    planet: databasePlanet,
    count: '5 Technologies',
    description:
      'Every application eventually becomes a story about data. I enjoy designing schemas, structuring information, optimizing queries, and ensuring systems remain reliable as projects grow from prototypes into products.',
    angle: 18,
    proficiencies: [
      { name: 'MongoDB', percentage: 88 },
      { name: 'PostgreSQL', percentage: 82 },
      { name: 'Data Modeling', percentage: 85 },
      { name: 'Redis', percentage: 75 },
      { name: 'Firebase', percentage: 80 }
    ],
    technologies: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' }
    ],
    featuredProjects: ['devconnect', 'neargrab']
  },

  {
    id: 'tools-devops',
    title: 'Tools & DevOps',
    planet: toolsPlanet,
    count: '13 Technologies',
    description:
      'The quiet infrastructure behind every successful project. From version control and deployment pipelines to containers and cloud platforms, these tools help transform ideas into production-ready products.',
    angle: 90,
    proficiencies: [
      { name: 'Git & GitHub', percentage: 92 },
      { name: 'Docker', percentage: 78 },
      { name: 'CI/CD', percentage: 80 },
      { name: 'Cloud Deployments', percentage: 82 },
      { name: 'Developer Workflow', percentage: 95 }
    ],
    technologies: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717', lightColor: '#181717', darkColor: '#FFFFFF' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: '#000000', lightColor: '#000000', darkColor: '#FFFFFF' },
      { name: 'Nginx', icon: SiNginx, color: '#009639' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'NPM', icon: SiNpm, color: '#CB3837' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' }
    ],
    featuredProjects: ['portfoliov2', 'astroblog', 'devconnect', 'codesnippet']
  },

  {
    id: 'something-brewing',
    title: 'Something is Brewing',
    planet: aiPlanet,
    count: 'Classified',
    description:
      'Not every project belongs in the spotlight. Somewhere between curiosity and obsession, a new frontier is taking shape. Research papers, intelligent systems, machine learning, language models, and ideas that currently feel just beyond my reach have captured my attention. This world remains locked for now. Check back later — the stars are still aligning.',
    angle: 162,
    proficiencies: [
      { name: 'Curiosity', percentage: 100 },
      { name: 'Research', percentage: 85 },
      { name: 'Experimentation', percentage: 90 },
      { name: 'Ambition', percentage: 100 },
      { name: 'Patience', percentage: 60 }
    ],
    technologies: [],
    featuredProjects: []
  }
];