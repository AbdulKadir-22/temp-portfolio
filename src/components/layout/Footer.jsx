import React from 'react';
import { FaGithub, FaLinkedinIn, FaInstagram, FaRegEnvelope } from 'react-icons/fa6';
import { Orbit } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { contactConfig } from '../../features/contact/data/config';
import { siteContent } from '../../data/content';
import earthIcon from '../../assets/icons/earth.png';

/**
 * Footer — Common website footer, positioned relative at the bottom of pages.
 * Features a transparent background with a premium checkerboard grid pattern,
 * clean spaced typography, naked social icons, and the Location & Status cards
 * integrated directly into the layout.
 */
const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  // Helper to get social links safely
  const getSocialUrl = (id) => {
    const social = contactConfig.socials.find((s) => s.id === id);
    return social ? social.url : '#';
  };

  const emailUrl = `mailto:${contactConfig.info.email || 'contact@abdulkadir.in'}`;

  return (
    <footer
      className={`
        relative w-full py-16 lg:py-20 z-10 overflow-hidden select-none border-t
        transition-all duration-500 ease-in-out
        ${isDark 
          ? 'bg-grid-footer-dark border-white/[0.04] text-white/90' 
          : 'bg-grid-footer-light border-slate-200/40 text-slate-800'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* ── Left Side: Location Card (Desktop) ── */}
        <div className="hidden md:flex items-center gap-3 w-[260px] justify-start">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={earthIcon} 
              alt="Earth" 
              className="w-full h-full object-cover animate-footer-orbit" 
              style={{ animationDuration: '30s' }}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-[7px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              {siteContent.location.label}
            </span>
            <span className="text-xs font-semibold leading-tight mt-0.5">
              {siteContent.location.status}
            </span>
            <span className={`text-[9px] font-medium leading-none mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
              {siteContent.location.subtext}
            </span>
          </div>
        </div>

        {/* ── Center Content: Spacious, Uncongested Layout ── */}
        <div className="flex flex-col items-center justify-center text-center gap-6 md:gap-8 flex-1">
          
          {/* Yours Truly & Name Block */}
          <div className="flex flex-col items-center gap-2">
            <span
              className={`
                text-[9px] lg:text-[10px] font-bold tracking-[0.25em] uppercase select-none
                ${isDark ? 'text-white/40' : 'text-slate-400'}
              `}
            >
              yours truly,
            </span>

            <h2
              className={`
                text-2xl lg:text-3xl font-signature font-semibold tracking-wide italic select-none
                ${isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400'
                  : 'text-slate-800'
                }
              `}
            >
              {siteContent.personal.name}
            </h2>
          </div>

          {/* Social Icons row: Naked icons */}
          <div className="flex items-center justify-center gap-6 lg:gap-8">
            <a
              href={getSocialUrl('github')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={`
                transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer
                ${isDark
                  ? 'text-white/45 hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]'
                  : 'text-slate-400 hover:text-blue-600'
                }
              `}
            >
              <FaGithub size={17} />
            </a>

            <a
              href={getSocialUrl('linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`
                transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer
                ${isDark
                  ? 'text-white/45 hover:text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]'
                  : 'text-slate-400 hover:text-blue-600'
                }
              `}
            >
              <FaLinkedinIn size={17} />
            </a>

            <a
              href={getSocialUrl('instagram')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className={`
                transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer
                ${isDark
                  ? 'text-white/45 hover:text-pink-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]'
                  : 'text-slate-400 hover:text-blue-600'
                }
              `}
            >
              <FaInstagram size={17} />
            </a>

            <a
              href={emailUrl}
              aria-label="Send Email"
              className={`
                transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer
                ${isDark
                  ? 'text-white/45 hover:text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]'
                  : 'text-slate-400 hover:text-blue-600'
                }
              `}
            >
              <FaRegEnvelope size={17} />
            </a>
          </div>

          {/* Mobile-only Location & Status Row */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-1">
            {/* Location info */}
            <div className="flex items-center gap-2 text-left">
              <img src={earthIcon} alt="Earth" className="w-5.5 h-5.5 rounded-full object-cover animate-footer-orbit" style={{ animationDuration: '30s' }} />
              <div className="flex flex-col">
                <span className={`text-[6px] font-bold tracking-[0.15em] uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}>LOCATION</span>
                <span className="text-[10px] font-semibold leading-tight">{siteContent.location.status}</span>
              </div>
            </div>
            
            <div className={`w-px h-5 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />

            {/* Status info */}
            <div className="flex items-center gap-2 text-left">
              <Orbit size={13} className={`animate-footer-orbit ${isDark ? 'text-blue-400' : 'text-blue-600'}`} style={{ animationDuration: '25s' }} />
              <div className="flex flex-col">
                <span className={`text-[6px] font-bold tracking-[0.15em] uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}>STATUS</span>
                <span className="text-[10px] font-semibold leading-tight">{siteContent.status.status}</span>
              </div>
            </div>
          </div>

          {/* Separator Dot & Copyright Section */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`
                w-1 h-1 rounded-full animate-pulse
                ${isDark ? 'bg-yellow-500/30 shadow-[0_0_4px_rgba(234,179,8,0.4)]' : 'bg-blue-500/25'}
              `}
            />

            <span
              className={`
                text-[8px] font-bold tracking-[0.1em] select-none
                ${isDark ? 'text-white/20' : 'text-slate-400'}
              `}
            >
              © {currentYear}
            </span>
          </div>
        </div>

        {/* ── Right Side: Status Card (Desktop) ── */}
        <div className="hidden md:flex items-center gap-3 w-[260px] justify-end">
          <div className="flex flex-col text-right">
            <span className={`text-[7px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              {siteContent.status.label}
            </span>
            <span className="text-xs font-semibold leading-tight mt-0.5">
              {siteContent.status.status}
            </span>
            <span className={`text-[9px] font-medium leading-none mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
              {siteContent.status.subtext}
            </span>
          </div>
          <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${isDark ? 'bg-white/5' : 'bg-slate-100'} text-blue-400`}>
            <Orbit 
              size={14} 
              className={`animate-footer-orbit ${isDark ? 'text-blue-400' : 'text-blue-600'}`} 
              style={{ animationDuration: '25s' }}
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
