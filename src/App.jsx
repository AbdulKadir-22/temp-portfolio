import React, { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
import StatusCard from './components/StatusCard';
import Hero from './components/Hero';
import { Orbit } from 'lucide-react';
import lightBg from './assets/background/light-bg.png';
import darkBg from './assets/background/dark-bg.png';
import earthIcon from './assets/icons/earth.png';
import darkMeteor from './assets/meteors/dark-mt.png';
import lightMeteor from './assets/meteors/white-mt.png';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const meteorImage = theme === 'dark' ? darkMeteor : lightMeteor;

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-['Inter',system-ui,sans-serif]">
      {/* Background Layers for Smooth Transition */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${lightBg})` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${darkBg})` }}
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-screen">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[44vw] min-w-[320px] max-w-[720px] overflow-hidden">
          <img
            src={meteorImage}
            alt=""
            className="meteor-piece meteor-piece-lg"
          />
          <img
            src={meteorImage}
            alt=""
            className="meteor-piece meteor-piece-sm meteor-piece-sm-top"
          />
          <img
            src={meteorImage}
            alt=""
            className="meteor-piece meteor-piece-sm meteor-piece-sm-upper"
          />
        </div>

        {/* Hero Section */}
        <div className="flex items-center justify-center h-full">
          <Hero theme={theme} />
        </div>

        {/* Bottom Left: Location Card */}
        <StatusCard
          theme={theme}
          imageSrc={earthIcon}
          label="LOCATION"
          status="Earth"
          subtext="Milky Way"
          showDot={false}
          position="bottom-left"
        />

        {/* Bottom Right: Status Card */}
        <StatusCard
          theme={theme}
          icon={Orbit}
          status="Dreaming"
          subtext="Building · Learning · Growing"
          position="bottom-right"
        />
      </div>
    </main>
  );
}

export default App;


