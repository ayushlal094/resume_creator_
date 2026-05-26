import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { TEMPLATES } from '../../utils/constants';

const TemplateSwitcher = () => {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="space-y-2">
      <p className="label">Resume Template</p>
      <div className="grid grid-cols-1 gap-2">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setTemplate(tmpl.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
              selectedTemplate === tmpl.id
                ? 'border-[var(--olive-drab)] bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)]'
                : 'border-[var(--border-light)] hover:border-[var(--olive-drab)] hover:bg-[var(--surface-2)]'
            }`}
          >
            {/* Color swatch */}
            <div
              className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
              style={{ background: tmpl.color }}
            >
              {selectedTemplate === tmpl.id && <Check size={14} className="text-white" />}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{tmpl.name}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{tmpl.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSwitcher;
