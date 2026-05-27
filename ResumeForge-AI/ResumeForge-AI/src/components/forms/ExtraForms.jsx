import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Trash2, Trophy, Globe, Heart, X } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { PROFICIENCY_LEVELS } from '../../utils/constants';

// ── Certifications ────────────────────────────────────────

export const CertificationsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const certs = resumeData.certifications || [];

  const add = () => updateSection('certifications', [...certs, { id: Date.now(), name: '', organization: '', year: '', link: '' }]);
  const remove = (i) => updateSection('certifications', certs.filter((_, idx) => idx !== i));
  const change = (i, key, val) => { const c = [...certs]; c[i] = { ...c[i], [key]: val }; updateSection('certifications', c); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {certs.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="border border-[var(--border-light)] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[var(--olive-drab)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">{cert.name || `Certification ${i + 1}`}</span>
              </div>
              <button onClick={() => remove(i)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className="label">Certificate Name</label>
                <input className="input-field" value={cert.name} onChange={(e) => change(i, 'name', e.target.value)} placeholder="AWS Solutions Architect" /></div>
              <div><label className="label">Issuing Organization</label>
                <input className="input-field" value={cert.organization} onChange={(e) => change(i, 'organization', e.target.value)} placeholder="Amazon Web Services" /></div>
              <div><label className="label">Year</label>
                <input className="input-field" value={cert.year} onChange={(e) => change(i, 'year', e.target.value)} placeholder="2023" /></div>
              <div><label className="label">Credential URL</label>
                <input className="input-field" value={cert.link} onChange={(e) => change(i, 'link', e.target.value)} placeholder="https://credential.link" /></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={add} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all">
        <Plus size={15} /> Add Certification
      </button>
    </motion.div>
  );
};

// ── Achievements ─────────────────────────────────────────

export const AchievementsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const achievements = resumeData.achievements || [];

  const add = () => updateSection('achievements', [...achievements, { id: Date.now(), text: '' }]);
  const remove = (i) => updateSection('achievements', achievements.filter((_, idx) => idx !== i));
  const change = (i, val) => { const c = [...achievements]; c[i] = { ...c[i], text: val }; updateSection('achievements', c); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {achievements.map((ach, i) => (
          <motion.div key={ach.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2">
            <Trophy size={14} className="text-[var(--olive-drab)] shrink-0" />
            <input className="input-field flex-1" value={ach.text} onChange={(e) => change(i, e.target.value)}
              placeholder="Won Hackathon 2023 — Built AI tool used by 10K+ users" />
            <button onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={add} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all">
        <Plus size={15} /> Add Achievement
      </button>
    </motion.div>
  );
};

// ── Languages ─────────────────────────────────────────────

export const LanguagesForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const languages = resumeData.languages || [];

  const add = () => updateSection('languages', [...languages, { id: Date.now(), name: '', proficiency: 'Fluent' }]);
  const remove = (i) => updateSection('languages', languages.filter((_, idx) => idx !== i));
  const change = (i, key, val) => { const c = [...languages]; c[i] = { ...c[i], [key]: val }; updateSection('languages', c); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <AnimatePresence>
        {languages.map((lang, i) => (
          <motion.div key={lang.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2">
            <Globe size={14} className="text-[var(--olive-drab)] shrink-0" />
            <input className="input-field flex-1" value={lang.name} onChange={(e) => change(i, 'name', e.target.value)} placeholder="English" />
            <select className="input-field w-auto" value={lang.proficiency} onChange={(e) => change(i, 'proficiency', e.target.value)}>
              {PROFICIENCY_LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
              <Trash2 size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={add} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] text-sm transition-all">
        <Plus size={15} /> Add Language
      </button>
    </motion.div>
  );
};

// ── Interests ─────────────────────────────────────────────

export const InterestsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const interests = resumeData.interests || [];
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed || interests.includes(trimmed)) return;
    updateSection('interests', [...interests, trimmed]);
    setInput('');
  };

  const remove = (item) => updateSection('interests', interests.filter((i) => i !== item));

  const suggestions = ['Open Source', 'Machine Learning', 'Photography', 'Travel', 'Gaming', 'Music', 'Reading', 'Fitness', 'Blogging'];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Heart size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input className="input-field pl-9" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Type an interest and press Enter..." />
        </div>
        <button onClick={add} className="btn-primary px-4 py-2.5"><Plus size={15} /></button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {suggestions.filter((s) => !interests.includes(s)).map((s) => (
          <button key={s} onClick={() => updateSection('interests', [...interests, s])}
            className="px-2.5 py-1 text-xs rounded-lg border border-dashed border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--olive-drab)] hover:border-[var(--olive-drab)] transition-all">
            + {s}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {interests.map((item) => (
            <motion.div key={item} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="tag group">
              {item}
              <button onClick={() => remove(item)} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-red-500">
                <X size={10} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
