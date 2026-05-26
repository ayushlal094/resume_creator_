import { motion } from 'framer-motion';
import { useResumeStore } from '../../context/ResumeContext';

const SummaryForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const summary = resumeData.summary || '';
  const maxChars = 600;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div>
        <label className="label">Professional Summary</label>
        <textarea
          value={summary}
          onChange={(e) => updateSection('summary', e.target.value.slice(0, maxChars))}
          rows={5}
          placeholder="Write 2–4 sentences highlighting your experience, skills, and what you bring to the table. Focus on your strongest points and tailor it to the role you're applying for..."
          className="input-field resize-none"
        />
        <div className="flex justify-between items-center mt-1.5">
          <p className="text-xs text-[var(--text-muted)]">
            Tip: Keep it concise, impactful, and keyword-rich for ATS systems.
          </p>
          <span className={`text-xs font-medium ${summary.length > maxChars * 0.9 ? 'text-amber-500' : 'text-[var(--text-muted)]'}`}>
            {summary.length}/{maxChars}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[
          'Results-driven professional',
          'Cross-functional collaboration',
          'Strategic problem solver',
          'Data-driven decision maker',
          '5+ years of experience',
          'Team leadership',
        ].map((phrase) => (
          <button
            key={phrase}
            onClick={() => {
              const newText = summary ? `${summary} ${phrase.toLowerCase()}` : phrase;
              updateSection('summary', newText.slice(0, maxChars));
            }}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--olive-drab)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.2)] transition-all text-left"
          >
            + {phrase}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SummaryForm;
