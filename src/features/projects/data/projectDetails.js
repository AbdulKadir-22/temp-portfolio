/**
 * Case Study Database for Portfolio Projects.
 * Centralizes deep technical information, metrics, highlights, and roadmap scopes.
 */

export const projectDetails = {
  neargrab: {
    subtitle: "Real-time ride booking web application with live tracking.",
    status: "Dreaming: Building • Learning • Growing",
    highlights: {
      duration: "Apr 2024 - May 2024",
      role: "Full Stack Developer",
      teamSize: "2 Developers",
      projectType: "Web Application"
    },
    techStackCategorized: {
      Frontend: [
        { name: "React", level: "Core" },
        { name: "Redux Toolkit", level: "State" },
        { name: "Tailwind CSS", level: "Styling" },
        { name: "Mapbox GL", level: "Maps" }
      ],
      Backend: [
        { name: "Node.js", level: "Runtime" },
        { name: "Express.js", level: "API" },
        { name: "Socket.io", level: "Real-time" }
      ],
      Database: [
        { name: "MongoDB", level: "Document Store" },
        { name: "Redis", level: "Cache/Sync" }
      ],
      "DevOps & Tools": [
        { name: "Git & GitHub", level: "Version Control" },
        { name: "Docker", level: "Container" },
        { name: "Vercel", level: "Hosting" },
        { name: "Postman", level: "API Testing" }
      ]
    },
    keyFeatures: [
      { title: "User Authentication", desc: "Secure sign up and login using JSON Web Tokens (JWT) and Google OAuth integrations." },
      { title: "Ride Booking", desc: "Book rides in just a few taps with dynamic address autocompletion and price estimation." },
      { title: "Real-time Tracking", desc: "Live driver tracking and location rendering on an interactive Mapbox vector container." },
      { title: "Real-time Notifications", desc: "Instant ride status updates, cancellation triggers, and chat messaging using Socket.io." },
      { title: "Multiple Payment Options", desc: "Seamless checkout experiences integrated via Stripe for credit/debit cards and wallet systems." },
      { title: "Ride History", desc: "Interactive ride history listings with detailed receipts, routes, and billing PDF generators." }
    ],
    metrics: [
      { label: "Total Users", value: "1K+", icon: "users" },
      { label: "Rides Booked", value: "10K+", icon: "trending" },
      { label: "Uptime", value: "99.9%", icon: "clock" },
      { label: "User Rating", value: "4.8", icon: "star" }
    ],
    architectureText: "NearGrab utilizes a decoupled client-server architecture. The React frontend consumes map tiles from Mapbox and coordinates driver updates using Socket.io client nodes. The Node.js API acts as the orchestration layer, handling authentication and payments, while WebSockets synchronize state between active drivers and riders. Database sync is managed via MongoDB for collections and Redis for fast transient coordinate caches.",
    challenges: [
      {
        title: "Socket Disconnection Conflicts",
        desc: "Frequent connection drops on mobile clients disrupted live coordinates. Resolved by implementing backoff reconnection states and caching last known coordinates in a Redis instance for temporary recovery."
      },
      {
        title: "Throttling Mapbox API Charges",
        desc: "Constant route recalculations caused high billing rates. Solved by writing an optimization algorithm that fetches static vector geometry lines only during ride generation and caches intermediate routing nodes on the server."
      }
    ],
    futureScope: [
      "Implement a localized passenger pooling algorithm to support shared rides.",
      "Add interactive driver rating systems with sentiment reviews.",
      "Deploy localized edge routing using Node-RED integrations."
    ]
  },

  astroblog: {
    subtitle: "A modern blog platform built with Next.js and MDX.",
    status: "Dreaming: Exploring • Building • Optimizing",
    highlights: {
      duration: "Jan 2025 - Feb 2025",
      role: "Frontend Developer",
      teamSize: "Solo",
      projectType: "Content & Blog"
    },
    techStackCategorized: {
      Frontend: [
        { name: "Next.js 14", level: "Framework" },
        { name: "React 18", level: "UI Library" },
        { name: "MDX Bundler", level: "Content Parser" },
        { name: "Tailwind CSS", level: "Styling" }
      ],
      Backend: [
        { name: "Next.js Route Handlers", level: "Serverless" },
        { name: "Contentlayer", level: "SDK" }
      ],
      Database: [
        { name: "Local Filesystem", level: "Markdown Storage" }
      ],
      "DevOps & Tools": [
        { name: "Vercel", level: "Deployment" },
        { name: "Git", level: "Version Control" },
        { name: "ESLint", level: "Linter" }
      ]
    },
    keyFeatures: [
      { title: "MDX Blog Parsing", desc: "Supports writing posts in MDX, allowing inline React component rendering within normal markdown text." },
      { title: "Dynamic Code Highlights", desc: "Elegant syntax highlighting for code blocks using Rehype-Prism integrations." },
      { title: "Table of Contents Gener", desc: "Automated extraction of page headings into a dynamic scroll-linked TOC component." },
      { title: "Reading Time Calculator", desc: "Calculates reads estimate based on character counts before bundling compiles." }
    ],
    metrics: [
      { label: "Lighthouse Score", value: "100", icon: "trending" },
      { label: "Active Readers", value: "500+", icon: "users" },
      { label: "Build Time", value: "<15s", icon: "clock" },
      { label: "MDX Posts", value: "24+", icon: "star" }
    ],
    architectureText: "AstroBlog utilizes Next.js static page generation (SSG) for lightning-fast loads. Contentlayer parses localized MDX files during build time and exports type-safe JSON objects, which are mapped directly to Next.js routes. Client-side state is minimal, leveraging React context only for theme management and analytics tracking.",
    challenges: [
      {
        title: "MDX Parsing Overhead",
        desc: "Bundling large MDX files with heavy custom React assets slowed client loads. Resolved by lazy loading expensive sub-components and utilizing Next.js layout structures to minimize nested re-renders."
      },
      {
        title: "SEO Optimization Requirements",
        desc: "Blog index pages needed rich schema metadata. Solved by writing automated JSON-LD script injections into the layout container for search indexing."
      }
    ],
    futureScope: [
      "Add interactive search index using Algolia or localized Pagefind engine.",
      "Integrate an automated newsletter subscription flow with Mailchimp.",
      "Introduce comments system using Giscus/GitHub Discussions."
    ]
  },

  devconnect: {
    subtitle: "Developer social platform to connect, share and grow.",
    status: "Dreaming: Scale • Support • Community",
    highlights: {
      duration: "Sep 2024 - Nov 2024",
      role: "Backend Architect",
      teamSize: "3 Developers",
      projectType: "Social Network"
    },
    techStackCategorized: {
      Frontend: [
        { name: "Next.js", level: "App Framework" },
        { name: "TypeScript", level: "Type Safety" },
        { name: "Framer Motion", level: "Animations" }
      ],
      Backend: [
        { name: "Node.js", level: "Runtime" },
        { name: "NestJS", level: "Framework" },
        { name: "GraphQL", level: "API Gateway" }
      ],
      Database: [
        { name: "MongoDB", level: "Main Database" },
        { name: "Redis", level: "Caching" }
      ],
      "DevOps & Tools": [
        { name: "Kubernetes", level: "Orchestration" },
        { name: "AWS (S3/EC2)", level: "Cloud Infrastr" },
        { name: "GitHub Actions", level: "CI/CD Pipeline" }
      ]
    },
    keyFeatures: [
      { title: "Real-time Feed", desc: "Dynamic developer feed containing code snippets, image shares, and text posts." },
      { title: "Interactive Snippet Run", desc: "Run snippets inside posts dynamically using embedded sandbox compilers." },
      { title: "Developer Profiler", desc: "GitHub repository integration to showcase personal contributions and profile metrics." },
      { title: "Chat Chambers", desc: "Private and channel chats with full WebRTC voice calls built right in." }
    ],
    metrics: [
      { label: "Active Developers", value: "3K+", icon: "users" },
      { label: "API Latency", value: "42ms", icon: "clock" },
      { label: "Snippets Run", value: "50K+", icon: "trending" },
      { label: "Stars Received", value: "850", icon: "star" }
    ],
    architectureText: "DevConnect utilizes a microservices architecture hosted on AWS. A NestJS Gateway handles incoming GraphQL queries, delegating work to microservices (Auth, Profiles, Feed, Compiler) via RabbitMQ message brokers. File uploads are streamed straight to AWS S3, and profile data matches are cached using highly scalable Redis clusters.",
    challenges: [
      {
        title: "Snippet Sandbox Security",
        desc: "Executing arbitrary user code posed critical server security issues. Solved by creating isolated Docker containers utilizing custom resource quotas to run compile tasks and terminate immediately."
      },
      {
        title: "Dynamic Feed Pagination",
        desc: "Slow database queries on long scrolling. Resolved by transitioning from offset pagination to cursor-based database matching indexing on MongoDB collections."
      }
    ],
    futureScope: [
      "Implement a developer job board matching algorithm based on tech stack metrics.",
      "Support Web3 wallet integrations and verified profiles.",
      "Add interactive group coding hackathon spaces with shared IDE boards."
    ]
  },

  portfoliov2: {
    subtitle: "My personal portfolio built with Next.js and Tailwind CSS.",
    status: "Dreaming: Finalizing • Polishing • Maintaining",
    highlights: {
      duration: "Oct 2024 - Nov 2024",
      role: "Creator & Designer",
      teamSize: "Solo",
      projectType: "Personal Showcase"
    },
    techStackCategorized: {
      Frontend: [
        { name: "Next.js", level: "Framework" },
        { name: "Tailwind CSS", level: "Styling" },
        { name: "Three.js", level: "3D Rendering" },
        { name: "Framer Motion", level: "Transitions" }
      ],
      Backend: [
        { name: "Vercel Serverless", level: "Contact Forms" }
      ],
      Database: [
        { name: "Upstash Redis", level: "Visitor Counter" }
      ],
      "DevOps & Tools": [
        { name: "Vercel", level: "Hosting" },
        { name: "Figma", level: "UI/UX Design" }
      ]
    },
    keyFeatures: [
      { title: "3D Celestial Scenes", desc: "Interactive planet spheres and orbiting stars built using React Three Fiber." },
      { title: "Sleek Glassmorphic UI", desc: "Curated translucent panels with custom backdrop-filters and light borders." },
      { title: "Interactive Canvas Hub", desc: "Custom widgets, terminals, and books that readers can explore natively." },
      { title: "Global Dark/Light toggle", desc: "Consistent themes utilizing Tailwind hooks and context switches." }
    ],
    metrics: [
      { label: "Daily Visits", value: "200+", icon: "users" },
      { label: "Render Frame Rate", value: "60fps", icon: "trending" },
      { label: "Bundle Size", value: "68kB", icon: "clock" },
      { label: "Design Iterations", value: "4", icon: "star" }
    ],
    architectureText: "The portfolio architecture focuses heavily on render optimization. Since Three.js is loaded, it is bundled in a lazy chunk that is only requested once the user focuses on 3D elements. Framer motion uses lightweight features to keep bundle sizes minimal, and layout grids are built to utilize pure CSS coordinates.",
    challenges: [
      {
        title: "3D Animation Lag on Mobile",
        desc: "Low-end mobile phones dropped to 15fps. Solved by rendering low-polygon geometry structures and throttling shadow calculations when mobile viewports are detected."
      },
      {
        title: "Light/Dark Contrast Spacing",
        desc: "Translucent panels lost outlines in light mode. Solved by defining tailored CSS border overrides for the light mode theme wrapper."
      }
    ],
    futureScope: [
      "Add interactive audio system with celestial theme melodies.",
      "Implement a pixel art terminal drawer game.",
      "Add automated deployment walkthrough logs page."
    ]
  },

  portyours: {
    subtitle: "Cloud storage solution with file sharing and previews.",
    status: "Dreaming: Building • Testing • Scaling",
    highlights: {
      duration: "Dec 2024 - Jan 2025",
      role: "Lead Developer",
      teamSize: "Solo",
      projectType: "Cloud Platform"
    },
    techStackCategorized: {
      Frontend: [
        { name: "React", level: "UI Library" },
        { name: "TypeScript", level: "Structure" },
        { name: "Tailwind CSS", level: "Styling" }
      ],
      Backend: [
        { name: "Node.js & Express", level: "File Processing" },
        { name: "AWS SDK", level: "Storage Access" }
      ],
      Database: [
        { name: "PostgreSQL", level: "Metadata Storage" },
        { name: "Prisma", level: "ORM" }
      ],
      "DevOps & Tools": [
        { name: "Docker", level: "Environment" },
        { name: "AWS S3", level: "Object Storage" },
        { name: "GitHub Actions", level: "CI" }
      ]
    },
    keyFeatures: [
      { title: "Drag & Drop Upload", desc: "Drag and drop uploading interface supporting multi-gigabyte files and folders." },
      { title: "Dynamic File Previews", desc: "Instantly view PDFs, videos, images, and code files inside the app canvas." },
      { title: "Encrypted Sharing Keys", desc: "Generate secure, password-protected download links with dynamic expiration times." },
      { title: "Visual Dashboard Stats", desc: "Disk space meters, category pie charts, and download counters." }
    ],
    metrics: [
      { label: "Data Stored", value: "5TB+", icon: "star" },
      { label: "Total Uploads", value: "25K+", icon: "trending" },
      { label: "Transfer Speed", value: "15MB/s", icon: "clock" },
      { label: "Active Accounts", value: "800+", icon: "users" }
    ],
    architectureText: "PortYours handles uploads using secure presigned S3 URLs, letting the client stream files directly to AWS buckets and bypassing backend node servers. PostgreSQL maps folder directories, file hashes, and permissions, while Redis maintains user session keys and rate-limiting metrics.",
    challenges: [
      {
        title: "Streaming Heavy Video Previews",
        desc: "High server memory usage during file downloads. Resolved by implementing chunked HTTP range headers to stream media content straight from S3 endpoints."
      },
      {
        title: "Folder Tree Performance",
        desc: "Nested folders required recursive database matching. Solved by adopting material path models in SQL schemas for fast single-query depth fetches."
      }
    ],
    futureScope: [
      "Implement client-side end-to-end zero-knowledge encryption.",
      "Add collaborative shared folders with role-based editing constraints.",
      "Introduce automated optical character recognition (OCR) on image uploads."
    ]
  },

  codesnippet: {
    subtitle: "Organize and share your code snippets easily.",
    status: "Dreaming: Planning • Designing • Launching",
    highlights: {
      duration: "Mar 2025 - Apr 2025",
      role: "Creator",
      teamSize: "Solo",
      projectType: "Developer Tool"
    },
    techStackCategorized: {
      Frontend: [
        { name: "TypeScript", level: "Main Language" },
        { name: "Vite", level: "Bundler" },
        { name: "Monaco Editor", level: "IDE Editor" },
        { name: "CSS Modules", level: "Scope Styles" }
      ],
      Backend: [
        { name: "Firebase Functions", level: "Backend Logic" }
      ],
      Database: [
        { name: "Firestore", level: "Snippet DB" }
      ],
      "DevOps & Tools": [
        { name: "Vercel", level: "Deployment" },
        { name: "Jest", level: "Testing Library" }
      ]
    },
    keyFeatures: [
      { title: "Monaco Code Editor", desc: "Integrates Monaco, the core engine behind VS Code, to provide autocomplete, linting, and folding." },
      { title: "One-click Copy & Embed", desc: "Generate customizable iframe embedded codes to share snippets on blogs or articles." },
      { title: "Auto-Tagging System", desc: "Automated programming language detection using file extension matching analysis." },
      { title: "Snippet Categories", desc: "Organize snippets into collections, folders, and tags with quick search options." }
    ],
    metrics: [
      { label: "Snippets Created", value: "1.5K+", icon: "star" },
      { label: "Search Speed", value: "8ms", icon: "clock" },
      { label: "GitHub Stars", value: "340", icon: "trending" },
      { label: "Active Devs", value: "600+", icon: "users" }
    ],
    architectureText: "CodeSnippet is designed to compile fast and operate instantly. The Monaco Editor is loaded asynchronously to speed up the initial paint. Firestore stores document entries, while localized caching (via IndexDB) allows full offline editing capability, automatically syncing updates once connection returns.",
    challenges: [
      {
        title: "Monaco Loading Performance",
        desc: "Monaco's massive bundle size caused slow page startup. Resolved by offloading the compilation steps to a Web Worker thread and lazy loading editor scripts."
      },
      {
        title: "Syntax Highlighting on Embeds",
        desc: "Embedded iframe cards needed lightweight rendering. Solved by replacing the heavy Monaco component with Shiki highlight engine in dynamic previews."
      }
    ],
    futureScope: [
      "Add multi-file code workspace templates.",
      "Support collaborative live snippet coding rooms.",
      "Integrate AI code review features with automatic suggestions."
    ]
  }
};
