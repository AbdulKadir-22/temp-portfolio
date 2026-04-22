import React from 'react';

const StatusCard = ({ 
  icon: Icon, 
  imageSrc,
  label = "STATUS", 
  status = "Dreaming", 
  subtext = "Building · Learning · Growing",
  dotColor = "bg-green-500",
  showDot = true,
  position = "bottom-right",
  theme = "dark"
}) => {
  const isDark = theme === 'dark';

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={`
      fixed ${positionClasses[position] || positionClasses['bottom-right']} z-50
      flex items-center gap-3 p-2 pr-6 rounded-xl
      backdrop-blur-md border transition-all duration-500 ease-in-out
      ${isDark 
        ? 'bg-black/20 border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]' 
        : 'bg-white/10 border-white/30 shadow-[0_4px_16px_rgba(31,38,135,0.05)]'}
    `}>
      {/* Icon Section */}
      <div className={`
        relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden
        transition-colors duration-500
        ${isDark ? 'bg-white/5' : 'bg-white/40 shadow-inner'}
      `}>
        {imageSrc ? (
          <img src={imageSrc} alt={status} className="w-full h-full object-cover" />
        ) : Icon ? (
          <div className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            <Icon size={16} />
          </div>
        ) : (
          <div className="relative scale-50">
            <div className={`w-6 h-6 rounded-full border-2 ${isDark ? 'border-blue-400' : 'border-blue-600'} flex items-center justify-center`}>
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
            </div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 border-b-2 rounded-[50%] ${isDark ? 'border-blue-400 rotate-[-15deg]' : 'border-blue-600 rotate-[-15deg]'}`} />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-1.5">
          <span className={`
            text-[7px] font-bold tracking-[0.15em] uppercase
            transition-colors duration-500
            ${isDark ? 'text-slate-400' : 'text-blue-500'}
          `}>
            {label}
          </span>
          {showDot && <div className={`w-1 h-1 rounded-full ${dotColor} animate-pulse shadow-[0_0_4px_currentColor]`} />}
        </div>
        
        <h3 className={`
          text-xs font-semibold tracking-tight leading-tight
          transition-colors duration-500
          ${isDark ? 'text-slate-50' : 'text-slate-800'}
        `}>
          {status}
        </h3>
        
        <p className={`
          text-[8px] font-medium tracking-wide
          transition-colors duration-500
          ${isDark ? 'text-slate-400' : 'text-slate-500'}
        `}>
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;

