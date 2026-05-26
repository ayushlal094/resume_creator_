import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '../../context/ResumeContext';

const emptyEntry = { degree: '', university: '', specialization: '', cgpa: '', startYear: '', endYear: '' };

const EducationEntry = ({ entry, index, onChange, onRemove }) => {
  const [open, setOpen] = useState(true);
  const handle = (e) => onChange(index, { ...entry, [e.target.name]: e.target.value });

  return (
    <div className="border border-[var(--border-light)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-2)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <GraduationCap size={14} className="text-[var(--olive-drab)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {entry.degree || `Education ${index + 1}`}
          </span>
          {entry.university && (
            <span className="text-xs text-[var(--text-muted)]">· {entry.university}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={13} />
          </button>
          <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Degree', name: 'degree', placeholder: 'B.Tech / B.Sc / MBA' },
                { label: 'University', name: 'university', placeholder: 'MIT, Stanford...' },
                { label: 'Specialization', name: 'specialization', placeholder: 'Computer Science' },
                { label: 'CGPA / Grade', name: 'cgpa', placeholder: '9.0 / 10.0' },
                { label: 'Start Year', name: 'startYear', placeholder: '2019' },
                { label: 'End Year', name: 'endYear', placeholder: '2023 or Present' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="label">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={entry[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    className="input-field"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EducationForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const education = resumeData.education || [];

  const add = () => updateSection('education', [...education, { ...emptyEntry, id: Date.now() }]);
  const remove = (i) => updateSection('education', education.filter((_, idx) => idx !== i));
  const change = (i, updated) => {
    const copy = [...education];
    copy[i] = updated;
    updateSection('education', copy);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {education.map((entry, i) => (
          <motion.div key={entry.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <EducationEntry entry={entry} index={i} onChange={change} onRemove={remove} />
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all"
      >
        <Plus size={15} /> Add Education
      </button>
    </motion.div>
  );
};

export default EducationForm;
