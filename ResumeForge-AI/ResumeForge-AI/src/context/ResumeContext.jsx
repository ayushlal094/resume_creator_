import { createContext, useContext, useRef, useCallback } from 'react';
import { create } from 'zustand';
import { DEFAULT_RESUME_DATA } from '../utils/constants';
import { updateResume, createResume } from '../supabase/queries';

// Zustand store for resume data
export const useResumeStore = create((set, get) => ({
  resumeData: { ...DEFAULT_RESUME_DATA },
  currentResumeId: null,
  selectedTemplate: 'modern',
  activeSection: 'personal',
  isSaving: false,
  lastSaved: null,
  isDirty: false,

  setResumeData: (data) => set({ resumeData: data, isDirty: true }),

  updateSection: (section, value) =>
    set((state) => ({
      resumeData: { ...state.resumeData, [section]: value },
      isDirty: true,
    })),

  setTemplate: (template) => set({ selectedTemplate: template }),

  setActiveSection: (section) => set({ activeSection: section }),

  setCurrentResumeId: (id) => set({ currentResumeId: id }),

  resetResume: () =>
    set({
      resumeData: { ...DEFAULT_RESUME_DATA },
      currentResumeId: null,
      isDirty: false,
      lastSaved: null,
    }),

  saveResume: async (userId, title = 'My Resume') => {
    const { resumeData, currentResumeId, selectedTemplate } = get();
    set({ isSaving: true });

    const payload = {
      user_id: userId,
      title,
      template_name: selectedTemplate,
      personal_info: resumeData.personal,
      summary: resumeData.summary,
      education: resumeData.education,
      skills: resumeData.skills,
      experience: resumeData.experience,
      projects: resumeData.projects,
      certifications: resumeData.certifications,
      achievements: resumeData.achievements,
      languages: resumeData.languages,
      interests: resumeData.interests,
    };

    let result;
    if (currentResumeId) {
      result = await updateResume(currentResumeId, payload);
    } else {
      result = await createResume(payload);
      if (result.data) set({ currentResumeId: result.data.id });
    }

    set({ isSaving: false, lastSaved: new Date(), isDirty: false });
    return result;
  },

  loadResume: (resume) => {
    set({
      currentResumeId: resume.id,
      selectedTemplate: resume.template_name || 'modern',
      resumeData: {
        personal: resume.personal_info || DEFAULT_RESUME_DATA.personal,
        summary: resume.summary || '',
        education: resume.education || [],
        skills: resume.skills || [],
        experience: resume.experience || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        achievements: resume.achievements || [],
        languages: resume.languages || [],
        interests: resume.interests || [],
      },
      isDirty: false,
      lastSaved: new Date(resume.updated_at),
    });
  },
}));

// Context for legacy support
const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  return (
    <ResumeContext.Provider value={useResumeStore}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;
