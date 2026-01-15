import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

interface ResumeProps {
  onBack: () => void;
}

export const Resume: React.FC<ResumeProps> = ({ onBack }) => {
  const [pdfUrl, setPdfUrl] = React.useState<string>('');

  React.useEffect(() => {
    const base = (import.meta as any).env?.BASE_URL ?? '/';
    const normalizedBase = base.replace(/\/+$/, '/');

    const candidates = [
      `${normalizedBase}Jeff_Yuen_Resume.pdf`,
      `${normalizedBase}public/Jeff_Yuen_Resume.pdf`,
    ];

    let cancelled = false;

    (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
          if (res.ok) {
            if (!cancelled) setPdfUrl(url);
            return;
          }
        } catch {
          // ignore and try next
        }
      }

      // If nothing works, fall back to first candidate for visibility/debugging
      if (!cancelled) setPdfUrl(candidates[0]);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-stone-100 font-sans">
      <div className="flex-none bg-white border-b border-stone-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-sm z-20 relative gap-4">
        <div className="flex items-center w-full md:w-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-stone-600 hover:text-stone-900 transition-colors font-medium text-sm tracking-wide uppercase group"
          >
            <span className="p-2 bg-stone-100 rounded-full group-hover:bg-stone-200 transition-colors border border-stone-200">
              <ArrowLeft size={16} />
            </span>
            Back to Portfolio
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <a
            href={pdfUrl || '#'}
            download="Jeff_Yuen_Resume.pdf"
            className="flex items-center gap-2 bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-stone-800 transition-all shadow-md text-xs font-bold tracking-widest uppercase"
            aria-disabled={!pdfUrl}
            onClick={(e) => {
              if (!pdfUrl) e.preventDefault();
            }}
          >
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>

      <div className="flex-1 w-full bg-stone-200 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full max-w-[1000px] bg-white shadow-2xl rounded-sm"
            title="Resume PDF"
          />
        ) : (
          <div className="text-stone-700 text-sm">Loading resume…</div>
        )}
      </div>
    </div>
  );
};
