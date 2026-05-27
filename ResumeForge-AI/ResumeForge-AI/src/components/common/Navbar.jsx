import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, Moon, Sun, LogOut, User, LayoutDashboard, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../supabase/auth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Builder', href: '/builder', icon: FileText },
        { label: 'Templates', href: '/templates', icon: Layers },
      ]
    : [
        { label: 'Templates', href: '/templates', icon: Layers },
        { label: 'Features', href: '/#features', icon: null },
      ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] dark:bg-[var(--floral-white)] flex items-center justify-center transition-transform group-hover:scale-110">
            <FileText size={16} className="text-[var(--floral-white)] dark:text-[var(--smoky-black)]" />
          </div>
          <span className="font-display font-semibold text-[var(--smoky-black)] dark:text-[var(--floral-white)] text-lg">
            ResumeForge <span className="text-[var(--olive-drab)]">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                location.pathname === href
                  ? 'bg-[var(--bone)] text-[var(--smoky-black)] dark:bg-[var(--olive-drab)] dark:text-[var(--floral-white)]'
                  : 'text-[var(--olive-drab)] hover:text-[var(--smoky-black)] dark:hover:text-[var(--floral-white)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.2)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--olive-drab)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--olive-drab)] flex items-center justify-center text-[var(--floral-white)] text-xs font-medium">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-body text-[var(--smoky-black)] dark:text-[var(--floral-white)] hidden sm:block">
                  {user?.user_metadata?.full_name?.split(' ')[0] || 'Account'}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl overflow-hidden"
                  >
                    <div className="p-3 border-b border-[var(--border-light)]">
                      <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                        {user?.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
                      >
                        <LayoutDashboard size={14} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-sm px-4 py-2">
                Get started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--olive-drab)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[var(--border-light)] px-4 py-3 space-y-1"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
              >
                {label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-center">Sign in</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-primary text-center justify-center">Get started</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
