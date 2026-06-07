import React from 'react';
import { Book, Feather, FileText, Quote, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { currentlyWriting } from '../data/literatureData';

// Map icon string names to Lucide icons
const iconMap = {
  book: Book,
  feather: Feather,
  fileText: FileText,
  quote: Quote,
};

const CurrentlyWriting = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        w-full rounded-2xl p-6 border flex flex-col gap-5
        transition-all duration-500 ease-in-out
        ${isDark
          ? 'bg-black/35 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-white/50 border-slate-200/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)]'
        }
      `}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3
          className={`text-xs font-bold tracking-[0.2em] uppercase ${
            isDark ? 'text-white/70' : 'text-slate-500'
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Currently Writing
        </h3>
        
        {/* Tiny golden dot decoration */}
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.7)]" />
      </div>

      {/* Grid of Writing Projects - Lay out horizontally in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentlyWriting.map((item, index) => {
          const IconComponent = iconMap[item.icon] || FileText;

          return (
            <div
              key={index}
              className={`
                flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 group cursor-pointer
                ${isDark
                  ? 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] text-white'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100 hover:border-slate-200 text-slate-800'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Icon Wrapper */}
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0
                    ${isDark
                      ? 'bg-white/[0.04] group-hover:bg-white/[0.08] text-yellow-500/80 group-hover:text-yellow-400'
                      : 'bg-slate-200/50 group-hover:bg-slate-200 text-blue-600/85 group-hover:text-blue-500'
                    }
                  `}
                >
                  <IconComponent size={15} />
                </div>

                {/* Details */}
                <div className="flex flex-col text-left min-w-0">
                  <span
                    className={`text-[8px] font-bold tracking-[0.2em] uppercase truncate ${
                      isDark ? 'text-white/30' : 'text-slate-400'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-xs font-bold tracking-tight leading-tight mt-0.5 group-hover:text-yellow-400/90 transition-colors truncate">
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] font-light leading-none mt-1 truncate ${
                      isDark ? 'text-white/45' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight
                size={13}
                className={`transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0 ${
                  isDark ? 'text-white/20 group-hover:text-white/50' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentlyWriting;
