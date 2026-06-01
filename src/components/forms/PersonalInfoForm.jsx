import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ExternalLink, Code, Globe, Camera, X } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

const Field = ({ icon: Icon, label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="label">{label}</label>
    <div className="relative">
      {Icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          <Icon size={14} />
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${Icon ? 'pl-9' : ''}`}
      />
    </div>
  </div>
);

const PersonalInfoForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const personal = resumeData.personal;
  const fileRef = useRef(null);

  const handleChange = (e) => {
    updateSection('personal', { ...personal, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateSection('personal', { ...personal, photo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const removePhoto = () => updateSection('personal', { ...personal, photo: null });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {personal.photo ? (
            <div className="relative w-16 h-16">
              <img src={personal.photo} alt="Profile" className="w-16 h-16 rounded-xl object-cover border-2 border-[var(--bone)]" />
              <button
                onClick={removePhoto}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-[var(--bone)] hover:border-[var(--olive-drab)] flex items-center justify-center transition-colors"
            >
              <Camera size={18} className="text-[var(--text-muted)]" />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">Profile Photo</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Optional — JPG, PNG up to 2MB</p>
          {!personal.photo && (
            <button
              onClick={() => fileRef.current?.click()}
              className="text-xs text-[var(--olive-drab)] hover:underline mt-1"
            >
              Upload photo
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field icon={User} label="Full Name" name="fullName" value={personal.fullName} onChange={handleChange} placeholder="Alex Johnson" />
        <Field icon={null} label="Job Title" name="jobTitle" value={personal.jobTitle} onChange={handleChange} placeholder="Senior Software Engineer" />
        <Field icon={Mail} label="Email" name="email" value={personal.email} onChange={handleChange} type="email" placeholder="alex@example.com" />
        <Field icon={Phone} label="Phone" name="phone" value={personal.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" />
        <Field icon={MapPin} label="Location" name="address" value={personal.address} onChange={handleChange} placeholder="San Francisco, CA" />
        <Field icon={ExternalLink} label="LinkedIn" name="linkedin" value={personal.linkedin} onChange={handleChange} placeholder="linkedin.com/in/alexjohnson" />
        <Field icon={Code} label="GitHub" name="github" value={personal.github} onChange={handleChange} placeholder="github.com/alexjohnson" />
        <Field icon={Globe} label="Portfolio" name="portfolio" value={personal.portfolio} onChange={handleChange} placeholder="alexjohnson.dev" />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;
