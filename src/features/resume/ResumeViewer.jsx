import { useState } from 'react';
import { Minus, Plus, Maximize2, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { resumeConfig } from '../../data/resume/config';

/**
 * ResumeViewer — macOS-style window chrome wrapping an embedded PDF.
 * User places their resume PDF at public/resume/resume.pdf.
 */
const ResumeViewer = () => {
  const { isDark } = useTheme();
  const cleanPdfUrl = `${resumeConfig.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div
      id="resume-viewer"
      className={`
        macos-window w-full h-full lg:h-[80vh] min-h-[460px] sm:min-h-[500px] lg:min-h-[750px]
        flex flex-col rounded-2xl border overflow-hidden
        backdrop-blur-md transition-all duration-500
        ${isDark
          ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'bg-white/70 border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.08)]'
        }
      `}
    >
      {/* ── macOS Title Bar ── */}
      <div
        className={`
          macos-titlebar flex-shrink-0 flex items-center justify-between
          border-b px-4 py-2.5
          ${isDark ? 'bg-black/30 border-white/5' : 'bg-white/50 border-gray-200/60'}
        `}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="macos-dot macos-dot-red" />
          <div className="macos-dot macos-dot-yellow" />
          <div className="macos-dot macos-dot-green" />
        </div>

        {/* Centered Document Title */}
        <span
          className={`text-[11px] font-bold tracking-wider ${
            isDark ? 'text-white/40' : 'text-slate-400'
          }`}
        >
          {resumeConfig.fileName}
        </span>

        {/* Balance spacer */}
        <div className="w-[52px]" />
      </div>

      {/* ── PDF Content ── */}
      <div className="flex-1 relative overflow-hidden bg-white/5">
        <object
          data={cleanPdfUrl}
          type="application/pdf"
          className="absolute inset-0 w-full h-full"
          aria-label="Resume PDF"
        >
          {/* Fallback when no PDF is loaded */}
          <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
            <div
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center
                ${isDark ? 'bg-white/5' : 'bg-gray-100'}
              `}
            >
              <Download size={28} className={isDark ? 'text-white/30' : 'text-gray-300'} />
            </div>
            <div className="text-center">
              <p
                className={`text-sm font-semibold mb-1 ${
                  isDark ? 'text-white/60' : 'text-gray-500'
                }`}
              >
                Resume PDF
              </p>
              <p
                className={`text-xs max-w-xs ${
                  isDark ? 'text-white/30' : 'text-gray-400'
                }`}
              >
                Place your resume at{' '}
                <code
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  }`}
                >
                  public/resume/Resume.pdf
                </code>
              </p>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
};

export default ResumeViewer;
