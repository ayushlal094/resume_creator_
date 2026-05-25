import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, label, showPercent = true, color = 'var(--olive-drab)' }) => (
  <div className="space-y-1.5">
    {(label || showPercent) && (
      <div className="flex justify-between items-center">
        {label && <span className="text-xs text-[var(--text-secondary)]">{label}</span>}
        {showPercent && <span className="text-xs font-medium text-[var(--text-primary)]">{Math.round(value)}%</span>}
      </div>
    )}
    <div className="h-2 bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  </div>
);

export default ProgressBar;
