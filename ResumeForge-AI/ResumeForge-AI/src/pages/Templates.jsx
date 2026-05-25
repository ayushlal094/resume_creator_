import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { TEMPLATES } from '../utils/constants';

const TEMPLATE_DETAILS = {
  modern: {
    features: ['Two-column layout', 'Color accent header', 'Skill tags', 'ATS optimized'],
    best: 'Software Engineers, Developers',
  },
  minimal: {
    features: ['Clean typography', 'Single column', 'Centered header', 'Maximum readability'],
    best: 'Academics, Writers, Designers',
  },
  corporate: {
    features: ['Dark header bar', 'Traditional layout', 'Sidebar skills', 'Executive feel'],
    best: 'Business, Finance, Management',
  },
  creative: {
    features: ['Bold visual design', 'Color accents', 'Portfolio focus', 'Creative layouts'],
    best: 'UX/UI Designers, Artists',
  },
  executive: {
    features: ['Professional photo', 'Border accents', 'Core competencies', 'Elegant spacing'],
    best: 'Senior Managers, Executives',
  },
};

const Templates = () => {
  const [active, setActive] = useState('modern');
  const details = TEMPLATE_DETAILS[active];

  return (
    <div className="min-h-screen bg-[var(--surface-1)] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--olive-drab)] mb-3 block">Templates</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Choose your perfect template
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">
            All templates are ATS-friendly, professionally designed, and fully customizable.
          </p>
        </motion.div>

        {/* Template grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {TEMPLATES.map((tmpl, i) => (
            <motion.button
              key={tmpl.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActive(tmpl.id)}
              className={`rounded-2xl overflow-hidden border-2 transition-all ${
                active === tmpl.id
                  ? 'border-[var(--olive-drab)] shadow-lg scale-105'
                  : 'border-[var(--border-light)] hover:border-[var(--olive-drab)] hover:scale-102'
              }`}
            >
              {/* Mini preview */}
              <div className="h-32 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${tmpl.color}20, ${tmpl.color}08)` }}>
                <div className="w-20 h-24 bg-white rounded-lg shadow p-2">
                  <div className="h-2 rounded mb-1" style={{ background: tmpl.color }} />
                  <div className="h-1 w-2/3 bg-gray-200 rounded mb-1.5" />
                  {[75, 55, 65, 45].map((w, j) => (
                    <div key={j} className="h-1 bg-gray-100 rounded mb-1" style={{ width: `${w}%` }} />
                  ))}
                </div>
                {active === tmpl.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--olive-drab)] rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </div>
              <div className="px-2.5 py-2 bg-[var(--surface-1)] text-left">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{tmpl.name}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Details panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-card"
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
                {TEMPLATES.find((t) => t.id === active)?.name}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">Best for: {details.best}</p>
              <div className="flex flex-wrap gap-2">
                {details.features.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-light)] text-[var(--text-secondary)]">
                    <Check size={11} className="text-green-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Link
                to="/builder"
                state={{ template: active }}
                className="btn-primary text-sm px-6 py-3"
              >
                Use this template <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[var(--text-muted)] text-sm mb-4">Not sure which template? Start with Modern and switch anytime.</p>
          <Link to="/builder" className="btn-primary text-sm px-8 py-3.5 justify-center">
            Start Building <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Templates;
