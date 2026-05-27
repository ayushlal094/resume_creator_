import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, FileText, Edit3, Trash2, Copy, Download, Clock,
  BarChart2, Search, Grid, List, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResumeStore } from '../context/ResumeContext';
import { getUserResumes, deleteResume, duplicateResume } from '../supabase/queries';
import { downloadResumePDF } from '../services/pdfService';
import { InlineLoader } from '../components/common/Loader';

const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const TEMPLATE_COLORS = {
  modern: '#11120D',
  minimal: '#8A8679',
  corporate: '#565449',
  executive: '#4A4840',
  creative: '#D8CFBC',
};

const ResumeCard = ({ resume, onDelete, onDuplicate, onEdit, viewMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const color = TEMPLATE_COLORS[resume.template_name] || '#11120D';

  const handleDelete = async () => {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    setDeleting(true);
    await onDelete(resume.id);
    setDeleting(false);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="section-card flex items-center gap-4 group"
      >
        <div className="w-10 h-12 rounded-lg shrink-0 flex items-center justify-center" style={{ background: `${color}18` }}>
          <FileText size={16} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{resume.title}</p>
          <p className="text-xs text-[var(--text-muted)] capitalize">{resume.template_name} template · Edited {formatDate(resume.updated_at)}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(resume)} className="p-2 rounded-lg hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
            <Edit3 size={14} />
          </button>
          <button onClick={() => onDuplicate(resume.id)} className="p-2 rounded-lg hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
            <Copy size={14} />
          </button>
          <button onClick={handleDelete} disabled={deleting} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500 transition-all">
            {deleting ? <InlineLoader size="sm" /> : <Trash2 size={14} />}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -4 }}
      className="section-card group cursor-pointer overflow-hidden"
      onClick={() => onEdit(resume)}
    >
      {/* Thumbnail */}
      <div className="h-36 rounded-xl mb-4 flex items-end justify-between p-3 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}>
        {/* Mini resume lines */}
        <div className="absolute inset-4 space-y-1.5 opacity-60">
          <div className="h-2 w-1/2 rounded" style={{ background: color }} />
          <div className="h-1.5 w-1/3 rounded bg-gray-300" />
          {[70, 55, 80, 45, 65].map((w, i) => (
            <div key={i} className="h-1 rounded bg-gray-200" style={{ width: `${w}%` }} />
          ))}
        </div>
        <span className="relative z-10 text-[10px] font-medium px-2 py-0.5 rounded-full capitalize text-white" style={{ background: color }}>
          {resume.template_name}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="relative z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
        >
          <MoreHorizontal size={13} className="text-gray-700" />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-2 top-10 z-20 bg-[var(--floral-white)] dark:bg-[#1a1b16] border border-[var(--border-light)] rounded-xl shadow-xl w-40 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => { onEdit(resume); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all">
                <Edit3 size={12} /> Edit
              </button>
              <button onClick={() => { onDuplicate(resume.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all">
                <Copy size={12} /> Duplicate
              </button>
              <button onClick={() => { handleDelete(); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                <Trash2 size={12} /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1 truncate">{resume.title}</h3>
      <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
        <Clock size={10} /> {formatDate(resume.updated_at)}
      </p>
    </motion.div>
  );
};

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { loadResume, resetResume } = useResumeStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    fetchResumes();
  }, [isAuthenticated]);

  const fetchResumes = async () => {
    setLoading(true);
    const { data } = await getUserResumes(user.id);
    setResumes(data || []);
    setLoading(false);
  };

  const handleEdit = (resume) => {
    loadResume(resume);
    navigate('/builder');
  };

  const handleNew = () => {
    resetResume();
    navigate('/builder');
  };

  const handleDelete = async (id) => {
    await deleteResume(id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDuplicate = async (id) => {
    const { data } = await duplicateResume(id, user.id);
    if (data) setResumes((prev) => [data, ...prev]);
  };

  const filtered = resumes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-1"
          >
            Hey, {name} 👋
          </motion.h1>
          <p className="text-sm text-[var(--text-muted)]">Manage and build your professional resumes</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border-light)]">
            <BarChart2 size={14} className="text-[var(--olive-drab)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
          </div>

          <button onClick={handleNew} className="btn-primary text-sm">
            <Plus size={16} /> New Resume
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {resumes.length > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resumes..."
              className="input-field pl-9 text-sm py-2"
            />
          </div>
          <div className="flex items-center border border-[var(--border-light)] rounded-lg overflow-hidden">
            {[{ mode: 'grid', Icon: Grid }, { mode: 'list', Icon: List }].map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 transition-all ${viewMode === mode ? 'bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.4)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <InlineLoader size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center mx-auto mb-5">
            <FileText size={32} className="text-[var(--text-muted)]" />
          </div>
          <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mb-2">
            {search ? 'No resumes found' : 'Create your first resume'}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            {search ? 'Try a different search term.' : "Start building your professional resume in minutes."}
          </p>
          {!search && (
            <button onClick={handleNew} className="btn-primary">
              <Plus size={16} /> Create Resume
            </button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            : 'space-y-3'
          }>
            {/* New resume card (grid only) */}
            {viewMode === 'grid' && (
              <motion.button
                layout
                onClick={handleNew}
                whileHover={{ y: -4 }}
                className="section-card flex flex-col items-center justify-center gap-3 min-h-[200px] border-2 border-dashed border-[var(--border-light)] hover:border-[var(--olive-drab)] group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={18} className="text-[var(--olive-drab)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">New Resume</p>
              </motion.button>
            )}

            {filtered.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onEdit={handleEdit}
                viewMode={viewMode}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Dashboard;
