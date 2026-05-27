import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Code } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SKILL_CATEGORIES } from '../../utils/constants';

const SUGGESTIONS = {
  Frontend: ['React', 'Vue.js', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Next.js'],
  Backend: ['Node.js', 'Python', 'Java', 'Go', 'REST APIs', 'GraphQL'],
  Database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
  Tools: ['Git', 'Docker', 'Figma', 'VS Code', 'Postman', 'Jira'],
  Cloud: ['AWS', 'GCP', 'Azure', 'Vercel', 'Netlify', 'Supabase'],
  Languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Rust'],
  Frameworks: ['Express.js', 'FastAPI', 'Django', 'Spring Boot', 'Laravel'],
  Other: ['Agile', 'Scrum', 'CI/CD', 'Unit Testing', 'Leadership'],
};

const SkillsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const skills = resumeData.skills || [];
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Frontend');

  const addSkill = (name) => {
    const trimmed = (name || input).trim();
    if (!trimmed) return;
    if (skills.find((s) => s.name.toLowerCase() === trimmed.toLowerCase())) return;
    updateSection('skills', [...skills, { name: trimmed, category: selectedCategory, id: Date.now() }]);
    setInput('');
  };

  const removeSkill = (id) => updateSection('skills', skills.filter((s) => s.id !== id));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(); }
  };

  const groupedSkills = SKILL_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Add skill */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Code size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter..."
            className="input-field pl-9"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field w-auto"
        >
          {SKILL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => addSkill()} className="btn-primary px-4 py-2.5">
          <Plus size={15} />
        </button>
      </div>

      {/* Suggestions */}
      <div>
        <p className="label mb-2">Quick add — {selectedCategory}</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS[selectedCategory]?.filter((s) => !skills.find((sk) => sk.name === s)).map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="px-2.5 py-1 text-xs rounded-lg border border-dashed border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] hover:border-[var(--olive-drab)] transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Skills display */}
      <div className="space-y-3">
        {SKILL_CATEGORIES.map((cat) => {
          const catSkills = groupedSkills[cat];
          if (!catSkills.length) return null;
          return (
            <div key={cat}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">{cat}</p>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {catSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="tag group"
                    >
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-red-500"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillsForm;
