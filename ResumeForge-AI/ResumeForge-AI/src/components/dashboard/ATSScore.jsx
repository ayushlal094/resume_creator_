import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { calculateATSScore, getScoreColor, getScoreLabel } from '../../utils/atsScore';

const ATSScore = ({ resumeData }) => {
  const { score, suggestions, keywords, breakdown } = useMemo(
    () => calculateATSScore(resumeData || {}),
    [resumeData]
  );

  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="section-card space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)] flex items-center justify-center">
          <Target size={15} className="text-[var(--olive-drab)]" />
        </div>
        <h3 className="font-display font-semibold text-[var(--text-primary)]">ATS Score</h3>
      </div>

      {/* Circular progress */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bone)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-bold text-2xl text-[var(--text-primary)]">{score}</span>
            <span className="text-xs text-[var(--text-muted)]">/ 100</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: `${color}20`, color }}
        >
          {label}
        </span>
      </div>

      {/* Breakdown */}
      <div className="space-y-2.5">
        {Object.entries(breakdown).map(([key, val]) => {
          const maxes = { personal: 20, summary: 15, experience: 25, skills: 20, education: 10, projects: 10 };
          const pct = maxes[key] ? Math.round((val / maxes[key]) * 100) : 0;
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs capitalize text-[var(--text-secondary)]">{key}</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{val}/{maxes[key]}</span>
              </div>
              <div className="h-1.5 bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <TrendingUp size={13} className="text-[var(--olive-drab)]" />
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Suggestions</span>
          </div>
          <ul className="space-y-1.5">
            {suggestions.slice(0, 4).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <AlertCircle size={12} className="mt-0.5 shrink-0 text-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords found */}
      {keywords.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle size={13} className="text-green-500" />
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Keywords Found</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.slice(0, 8).map((kw) => (
              <span key={kw} className="tag text-xs">{kw}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
