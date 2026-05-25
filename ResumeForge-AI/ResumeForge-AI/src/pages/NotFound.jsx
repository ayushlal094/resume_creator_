import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--surface-1)]">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <p className="font-display font-bold text-8xl text-[var(--bone)] mb-4">404</p>
      <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">Page not found</h1>
      <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home size={16} /> Go home
        </Link>
        <Link to="/builder" className="btn-secondary">
          <FileText size={16} /> Build resume
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
