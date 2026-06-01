import { Download } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import ResumeViewer from '../components/ResumeViewer';
import JourneyCard from '../../../components/JourneyCard';
import { resumeConfig, journeyContent } from '../data/config';

/**
 * ResumePage — main resume page layout.
 * Two-column on desktop (viewer + journey), stacked on mobile.
 */
const ResumePage = () => {
  const { isDark } = useTheme();

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeConfig.pdfUrl);
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.setAttribute('download', resumeConfig.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error('Download failed, falling back to open in new tab:', error);
      window.open(resumeConfig.pdfUrl, '_blank');
    }
  };

  return (
    <section
      id="resume-page"
      className="w-full max-w-[95vw] xl:max-w-[1440px] mx-auto px-4 flex flex-col items-center gap-6 py-4"
    >
      {/* Page Title */}
      <header className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className={`tracking-widest text-sm ${isDark ? 'text-yellow-400/60' : 'text-blue-400/60'}`}>
            ───
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${isDark ? 'text-yellow-300' : 'text-blue-500'}`}
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl tracking-wider"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            color: isDark ? '#e2e8f0' : '#1e3a5f',
          }}
        >
          {resumeConfig.pageTitle}
        </h1>

        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${isDark ? 'text-yellow-300' : 'text-blue-500'}`}
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <span className={`tracking-widest text-sm ${isDark ? 'text-yellow-400/60' : 'text-blue-400/60'}`}>
            ───
          </span>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="w-full lg:pl-[240px] xl:pl-[280px] flex flex-col lg:flex-row gap-6 items-start justify-between">
        {/* Left Side: Resume Viewer + Download Button */}
        <div className="w-full lg:w-[69%] xl:w-[71%] flex-shrink-0 flex flex-col gap-4">
          <ResumeViewer />
          
          {/* Download Button below viewer */}
          <div className="flex justify-center mt-2">
            <button
              onClick={handleDownload}
              className={`
                flex items-center gap-2.5 px-6 py-3 rounded-full
                font-bold text-xs tracking-[0.15em] uppercase border
                transition-all duration-300 cursor-pointer group
                ${isDark
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
                  : 'bg-blue-600/10 border-blue-600/30 text-blue-600 hover:bg-blue-600/20 hover:border-blue-600/50 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                }
              `}
            >
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              Download Resume (PDF)
            </button>
          </div>
        </div>

        {/* Journey Card (reusable shared component) */}
        <div className="w-full lg:w-[29%] xl:w-[27%] lg:max-w-[350px] flex-shrink-0 lg:ml-auto">
          <JourneyCard
            label={journeyContent.label}
            title={journeyContent.title}
            description={journeyContent.description}
            ctaText={journeyContent.ctaText}
            ctaLink={journeyContent.ctaLink}
          />
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
