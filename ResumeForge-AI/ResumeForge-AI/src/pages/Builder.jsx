import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, FileText, Briefcase, GraduationCap, Code, Layers,
  Award, Trophy, Globe, Heart, Save, ChevronDown, ChevronRight,
  Palette, BarChart2, CheckCircle, Clock
} from 'lucide-react';
import { useResumeStore } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import EducationForm from '../components/forms/EducationForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import { CertificationsForm, AchievementsForm, LanguagesForm, InterestsForm } from '../components/forms/ExtraForms';
import ResumePreview from '../components/resume/ResumePreview';
import ResumeTemplateSwitcher from '../components/resume/ResumeTemplateSwitcher';
import ATSScore from '../components/dashboard/ATSScore';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
  { id: 'summary', label: 'Summary', icon: FileText, component: SummaryForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Code, component: SkillsForm },
  { id: 'projects', label: 'Projects', icon: Layers, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  { id: 'achievements', label: 'Achievements', icon: Trophy, component: AchievementsForm },
  { id: 'languages', label: 'Languages', icon: Globe, component: LanguagesForm },
  { id: 'interests', label: 'Interests', icon: Heart, component: InterestsForm },
];

const SectionPanel = ({ section, isOpen, onToggle }) => {
  const Icon = section.icon;
  const Component = section.component;
  return (
    <div className="section-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-1 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.3)] flex items-center justify-center">
            <Icon size={15} className="text-[var(--olive-drab)]" />
          </div>
          <span className="font-body font-semibold text-sm text-[var(--text-primary)]">{section.label}</span>
        </div>
        {isOpen
          ? <ChevronDown size={15} className="text-[var(--text-muted)]" />
          : <ChevronRight size={15} className="text-[var(--text-muted)]" />
        }
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-[var(--border-light)] mt-4">
              <Component />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Builder = () => {
  const { resumeData, isSaving, lastSaved, isDirty, saveResume } = useResumeStore();
  const { user } = useAuth();
  const [openSection, setOpenSection] = useState('personal');
  const [rightTab, setRightTab] = useState('preview');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Auto-save with debounce
  useEffect(() => {
    if (!isDirty || !user) return;
    const timer = setTimeout(() => {
      saveResume(user.id, resumeData.personal?.fullName ? `${resumeData.personal.fullName}'s Resume` : 'My Resume');
    }, 3000);
    return () => clearTimeout(timer);
  }, [resumeData, isDirty, user, saveResume]);

  const toggle = (id) => setOpenSection((prev) => (prev === id ? null : id));

  return (
    <div className="h-screen flex flex-col bg-[var(--surface-1)] pt-16">
      {/* Top status bar */}
      <div className="shrink-0 px-4 py-2 border-b border-[var(--border-light)] bg-[var(--surface-2)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--text-primary)]">Resume Builder</span>
          <span className="text-xs text-[var(--text-muted)]">·</span>
          {isSaving ? (
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Clock size={11} className="animate-pulse" /> Saving...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircle size={11} /> Saved
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">Unsaved</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="lg:hidden text-xs px-3 py-1.5 rounded-lg border border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
          >
            {showMobilePreview ? 'Edit' : 'Preview'}
          </button>
          {user && (
            <button
              onClick={() => saveResume(user.id)}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-primary"
            >
              <Save size={12} /> Save
            </button>
          )}
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT — Forms */}
        <div className={`w-full lg:w-[420px] xl:w-[480px] shrink-0 flex flex-col border-r border-[var(--border-light)] overflow-hidden ${showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {SECTIONS.map((section) => (
              <SectionPanel
                key={section.id}
                section={section}
                isOpen={openSection === section.id}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Preview / Tools */}
        <div className={`flex-1 flex flex-col overflow-hidden ${showMobilePreview ? 'flex' : 'hidden lg:flex'}`}>
          {/* Tab bar */}
          <div className="shrink-0 flex items-center gap-1 px-4 py-2 border-b border-[var(--border-light)] bg-[var(--surface-2)]">
            {[
              { id: 'preview', label: 'Preview', icon: FileText },
              { id: 'template', label: 'Templates', icon: Palette },
              { id: 'ats', label: 'ATS Score', icon: BarChart2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setRightTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  rightTab === id
                    ? 'bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.4)] text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {rightTab === 'preview' && <ResumePreview />}
            {rightTab === 'template' && (
              <div className="h-full overflow-y-auto p-5">
                <ResumeTemplateSwitcher />
              </div>
            )}
            {rightTab === 'ats' && (
              <div className="h-full overflow-y-auto p-5">
                <ATSScore resumeData={resumeData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
