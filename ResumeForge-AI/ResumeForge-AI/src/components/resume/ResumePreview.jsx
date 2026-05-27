import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '../../context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import { MinimalTemplate, CorporateTemplate, ExecutiveTemplate } from '../templates/OtherTemplates';
import { downloadResumePDF } from '../../services/pdfService';

const TEMPLATES = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  corporate: CorporateTemplate,
  executive: ExecutiveTemplate,
};

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [downloading, setDownloading] = useState(false);
  const Template = TEMPLATES[selectedTemplate] || ModernTemplate;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const name = resumeData?.personal?.fullName?.replace(/\s+/g, '_') || 'resume';
      await downloadResumePDF('resume-preview', name);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-light)] bg-[var(--surface-2)] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-[var(--text-muted)] font-body">Live Preview</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--smoky-black)] text-[var(--floral-white)] dark:bg-[var(--floral-white)] dark:text-[var(--smoky-black)] hover:opacity-90 transition-all disabled:opacity-60"
        >
          {downloading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
          {downloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-[#e8e4de] dark:bg-[#1a1b16] p-6">
        <div className="max-w-[794px] mx-auto shadow-2xl rounded-sm overflow-hidden">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Template data={resumeData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
