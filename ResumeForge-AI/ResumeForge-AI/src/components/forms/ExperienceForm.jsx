import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, ChevronDown } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

const emptyEntry = {
  company: '', role: '', duration: '', location: '', responsibilities: '', achievements: ''
};

const ExperienceEntry = ({ entry, index, onChange, onRemove }) => {
  const [open, setOpen] = useState(true);
  const handle = (e) => onChange(index, { ...entry, [e.target.name]: e.target.value });

  return (
    <div className="border border-[var(--border-light)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-2)] transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Briefcase size={14} className="text-[var(--olive-drab)] shrink-0" />
          <span className="text-sm font-medium text-[var(--text-primary)] truncate">
            {entry.role || `Experience ${index + 1}`}
          </span>
          {entry.company && <span className="text-xs text-[var(--text-muted)] shrink-0">· {entry.company}</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
            <Trash2 size={13} />
          </button>
          <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Company', name: 'company', placeholder: 'Google, Apple...' },
                  { label: 'Role / Title', name: 'role', placeholder: 'Software Engineer' },
                  { label: 'Duration', name: 'duration', placeholder: 'Jan 2022 — Present' },
                  { label: 'Location', name: 'location', placeholder: 'San Francisco, CA / Remote' },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label className="label">{label}</label>
                    <input type="text" name={name} value={entry[name]} onChange={handle} placeholder={placeholder} className="input-field" />
                  </div>
                ))}
              </div>

              <div>
                <label className="label">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={entry.responsibilities}
                  onChange={handle}
                  rows={3}
                  placeholder="• Built and maintained RESTful APIs serving 2M+ users&#10;• Led team of 4 engineers to deliver project 2 weeks ahead of schedule&#10;• Reduced page load time by 40% through performance optimizations"
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="label">Key Achievements</label>
                <textarea
                  name="achievements"
                  value={entry.achievements}
                  onChange={handle}
                  rows={2}
                  placeholder="• Increased revenue by 25% through new feature development&#10;• Won Best Intern Award Q3 2022"
                  className="input-field resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const experience = resumeData.experience || [];

  const add = () => updateSection('experience', [...experience, { ...emptyEntry, id: Date.now() }]);
  const remove = (i) => updateSection('experience', experience.filter((_, idx) => idx !== i));
  const change = (i, updated) => { const c = [...experience]; c[i] = updated; updateSection('experience', c); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {experience.map((entry, i) => (
          <motion.div key={entry.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <ExperienceEntry entry={entry} index={i} onChange={change} onRemove={remove} />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={add} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all">
        <Plus size={15} /> Add Experience
      </button>
    </motion.div>
  );
};

export default ExperienceForm;
