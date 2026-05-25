import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="fixed inset-0 bg-[var(--surface-1)] flex flex-col items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-2 border-[var(--bone)] border-t-[var(--olive-drab)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText size={20} className="text-[var(--olive-drab)]" />
        </div>
      </div>
      <p className="text-sm font-body text-[var(--text-muted)]">{text}</p>
    </motion.div>
  </div>
);

export const InlineLoader = ({ size = 'sm' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div className={`${sizes[size]} rounded-full border-2 border-[var(--bone)] border-t-[var(--olive-drab)] animate-spin`} />
  );
};

export default Loader;
