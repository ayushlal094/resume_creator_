import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-[var(--border-light)] bg-[var(--surface-2)] py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] dark:bg-[var(--floral-white)] flex items-center justify-center">
              <FileText size={16} className="text-[var(--floral-white)] dark:text-[var(--smoky-black)]" />
            </div>
            <span className="font-display font-semibold text-[var(--text-primary)]">
              ResumeForge <span className="text-[var(--olive-drab)]">AI</span>
            </span>
          </Link>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Build professional ATS-friendly resumes in minutes. Designed for modern job seekers.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Product</h4>
          <ul className="space-y-2.5">
            {['Templates', 'Builder', 'Dashboard', 'Pricing'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Resources</h4>
          <ul className="space-y-2.5">
            {['Resume Tips', 'ATS Guide', 'Career Blog', 'Examples'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Legal</h4>
          <ul className="space-y-2.5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[var(--border-light)]">
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} ResumeForge AI. All rights reserved.
        </p>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {[Github, Twitter, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bone)] dark:hover:bg-[rgba(86,84,73,0.3)] transition-all"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
