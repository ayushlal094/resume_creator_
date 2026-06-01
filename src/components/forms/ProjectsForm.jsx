import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Trash2, ChevronDown, Code, Globe } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

const emptyProject = { title: '', technologies: '', github: '', demo: '', description: '' };

const ProjectEntry = ({ entry, index, onChange, onRemove }) => {
  const [open, setOpen] = useState(true);
  const handle = (e) => onChange(index, { ...entry, [e.target.name]: e.target.value });

  return (
    <div className="border border-[var(--border-light)] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-2)] transition-colors">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-[var(--olive-drab)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">{entry.title || `Project ${index + 1}`}</span>
          {entry.technologies && <span className="text-xs text-[var(--text-muted)] truncate max-w-[120px]">· {entry.technologies}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onRemove(index); }} className="p-1 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
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
                <div>
                  <label className="label">Project Title</label>
                  <input type="text" name="title" value={entry.title} onChange={handle} placeholder="E-commerce Platform" className="input-field" />
                </div>
                <div>
                  <label className="label">Technologies Used</label>
                  <input type="text" name="technologies" value={entry.technologies} onChange={handle} placeholder="React, Node.js, PostgreSQL" className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">GitHub Link</label>
                  <div className="relative">
                    <Code size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="url" name="github" value={entry.github} onChange={handle} placeholder="github.com/user/repo" className="input-field pl-9" />
                  </div>
                </div>
                <div>
                  <label className="label">Live Demo</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="url" name="demo" value={entry.demo} onChange={handle} placeholder="myproject.vercel.app" className="input-field pl-9" />
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Project Description</label>
                <textarea
                  name="description"
                  value={entry.description}
                  onChange={handle}
                  rows={4}
                  placeholder="• Describe what the project does and the problem it solves&#10;• Mention key technical decisions and architecture&#10;• Highlight impact: users, performance gains, revenue, etc.&#10;• Include your specific role and contributions"
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

const ProjectsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const projects = resumeData.projects || [];

  const add = () => updateSection('projects', [...projects, { ...emptyProject, id: Date.now() }]);
  const remove = (i) => updateSection('projects', projects.filter((_, idx) => idx !== i));
  const change = (i, updated) => { const c = [...projects]; c[i] = updated; updateSection('projects', c); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {projects.map((entry, i) => (
          <motion.div key={entry.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <ProjectEntry entry={entry} index={i} onChange={change} onRemove={remove} />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={add} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all">
        <Plus size={15} /> Add Project
      </button>
    </motion.div>
  );
};

export default ProjectsForm;
