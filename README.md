# 🌌 internet-home — Abdulkadir Shaikh's Portfolio

<div align="center">
  
  [![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
  [![Vite 8](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.3-FF00C1?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev)
  [![React Router 7](https://img.shields.io/badge/React_Router-7.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)

  <p align="center">
    <strong>A highly interactive, motion-driven cosmic universe representing my digital presence.</strong><br />
    Designed around the concepts of space, gravity, and orbit, this portfolio serves as a personal laboratory, a creative outlet, and a showcase of my journey as a full-stack engineer.
  </p>

  <sub>"I want to become the sun who shines for others, but I am a meteor who only shines when he is falling." — *Zeron*</sub>

  <br />
  <br />
</div>

---

## 🪐 Project Concept & Theme

**internet-home** is not a standard corporate grid template portfolio. Built around a **motion-driven cosmic theme**, the architecture is designed to make navigation feel like exploring a solar system of capabilities:

- **The Core Gravity (Hero):** Centered around a minimalist typography grid that scales dynamically.
- **Orbits (Navigation):** Space-themed indicators and custom cursor interactions that reveal content organically.
- **Planetary Feature Hubs:** Each route (Blogs, Skills, Projects, Experience, Hobbies, Literature, Contact) behaves as an independent celestial body with specialized visual traits.

---

## ✨ Key Features

### 1. 🪐 Orbiting Skills System
An interactive, planetary-orbit UI mapping my technical specialties. Each category acts as a planet in orbit:
*   **Frontend Development:** Deep interaction, pixel-perfect rendering, and responsive state.
*   **Backend Development:** High-performance REST/GraphQL architecture, NestJS, and Node.js.
*   **Databases & Data:** Schemas, query optimization, and structured relational/document storage.
*   **Tools & DevOps:** CI/CD pipelines, Docker containers, AWS clouds, and developer workflows.
*   **Something is Brewing:** A locked, mysterious star system holding research, advanced algorithms, and artificial intelligence work still under construction.

### 2. 📁 Dynamic Projects Catalog
A portfolio grid showcasing 12+ web applications, tools, and open-source contributions with:
*   **Live Filtering:** Categorized by Web Apps, Full Stack, Tools, and Open Source.
*   **Grid/List Toggle:** Customizable layout configurations.
*   **Interactive Overlays:** Smooth Framer Motion transitions showing tech stacks and source repositories.
*   **Tech Stack Progress & Stats:** Sidebar widgets tracking language percentages and system categories.

### 3. ⏳ Journey Timeline
A timeline of my professional experience featuring key contributions at:
*   **Machine Learning Group, University of Cambridge** (Research Assistant) — Implementing novel visualization systems in Julia (`MCMCChains.jl`) and automating publication architectures.
*   **TechNova Solutions** (Full Stack Developer Intern) — Building responsive applications handling 10K+ active users and optimizing performance by 40%.
*   **Open Source Foundations** — Reviewing code, authoring documentation, and contributing package patches.

### 4. ✍️ Literature Corner
A private creative nook celebrating the balance of logic and expression:
*   **Poems:** Interactive cards containing original works (*Meteor*, *Silence*, *Still Trying*, *Echoes*).
*   **Novel Progress:** Updates on my in-progress novel **Obsessed** (currently Chapter 8, ~28.4K+ words).
*   **Curated Reflections & Quotes:** A database of thoughts shaping my coding and creative philosophy.

### 5. 🌙 Glassmorphic Dark & Light Modes
A monochromatic UI configured with custom CSS variables that transition smoothly:
*   **Dark Mode:** Cosmic black base (`#18181B`) with glowing yellow and violet accents.
*   **Light Mode:** Clean, high-contrast monochrome design prioritizing readability and subtle borders.
*   **A11y Compliant:** Respects `prefers-reduced-motion` and guarantees a minimum 4.5:1 text contrast ratio.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies & Tools |
| :--- | :--- |
| **Core Framework** | React 19, Vite 8 |
| **Routing** | React Router 7 (Lazy-loaded chunks per route) |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Motion** | Framer Motion (Transitions, Page Entrances, Orbit animations) |
| **Icons & Media** | Lucide React, React Icons (Simple Icons integration) |
| **SEO** | React Helmet Async (Dynamic title, meta tag injection, and canonical tags) |

---

## 📂 Project Structure

```bash
temp-portfolio/
├── .agent/                  # Custom developer agent workflows & design instructions
│   └── skills/ui-ux-pro-max # UI/UX design intelligence systems
├── assets/                  # Shared images, logos, and planet maps
├── design-system/           # Unified Design guidelines
│   └── MASTER.md            # Global style guidelines, color tokens, and button specs
├── src/
│   ├── App.jsx              # Application root (wrapped in Context Providers)
│   ├── index.css            # Core global Tailwind configuration and typography styles
│   ├── main.jsx             # Entry point
│   ├── router.jsx           # Route loader mapping pages and fallback spinners
│   ├── components/          # Shared components (ThemeToggle, Navigation, StatusCard)
│   │   └── layout/          # Global shell templates
│   ├── context/             # Global Context providers (ThemeContext)
│   ├── data/                # Site-wide content configuration (`siteContent`)
│   └── features/            # Feature-sliced modules
│       ├── blogs/           # Blog archives and detail pages
│       ├── contact/         # Contact forms and connection scripts
│       ├── experience/      # Experience pages and timeline cards
│       ├── hobbies/         # Interactive grids for books, movies, and paintings
│       ├── home/            # Landing page hero components
│       ├── literature/      # Original poetry, quotes, and novel status
│       ├── projects/        # Project grids, filters, detail overlays, and tech stack widgets
│       ├── resume/          # Digital resume view
│       └── skills/          # Orbits and solar system planet views
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have **Node.js (v18.x or later)** and **npm** installed.

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulKadir-22/temp-portfolio.git
   cd temp-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```

### 🛠️ Available Scripts

In the project directory, you can run:

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR) at `http://localhost:5173`.
*   `npm run build`: Bundles the application for production inside the `dist/` directory.
*   `npm run preview`: Statically previews the production build locally.
*   `npm run lint`: Analyzes code logic and styles using ESLint rules.

---

## 🎨 Design System System Overview

The site's visual language is guided by rules detailed in [MASTER.md](file:///home/ariont/Code/Personal/temp-portfolio/design-system/abdulkadir-portfolio/MASTER.md):

*   **Primary Color:** Zinc-900 (`#18181B`) / Dark, solid primary base
*   **Secondary Color:** Zinc-600 (`#3F3F46`) / Muted accents
*   **Accent Color:** Blue-600 (`#2563EB`) / CTA signals
*   **Fonts:** Archivo (Headings) + Space Grotesk (Body)
*   **Forbidden Patterns (Strictly Enforced):**
    *   ❌ Emojis as UI icons (strictly SVG/Lucide)
    *   ❌ Instant state shifts (always use 150-300ms transitions)
    *   ❌ Layout-shifting hover animations

---

## 📬 Contact & Socials

*   **Website:** [https://abdulkadir.in](https://abdulkadir.in)
*   **Email:** [contact@abdulkadir.in](mailto:contact@abdulkadir.in)
*   **GitHub:** [@AbdulKadir-22](https://github.com/AbdulKadir-22)
*   **LinkedIn:** [LinkedIn Profile](https://linkedin.com)
