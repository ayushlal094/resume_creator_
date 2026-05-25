import { supabase } from './client';

// ── Resumes ──────────────────────────────────────────────

export const getUserResumes = async (userId) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return { data, error };
};

export const getResumeById = async (id) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const createResume = async (resumeData) => {
  const { data, error } = await supabase
    .from('resumes')
    .insert([resumeData])
    .select()
    .single();
  return { data, error };
};

export const updateResume = async (id, resumeData) => {
  const { data, error } = await supabase
    .from('resumes')
    .update({ ...resumeData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteResume = async (id) => {
  const { error } = await supabase.from('resumes').delete().eq('id', id);
  return { error };
};

export const duplicateResume = async (id, userId) => {
  const { data: original, error: fetchError } = await getResumeById(id);
  if (fetchError) return { error: fetchError };

  const { id: _id, created_at, updated_at, ...resumeData } = original;
  const { data, error } = await supabase
    .from('resumes')
    .insert([{ ...resumeData, title: `${resumeData.title} (Copy)`, user_id: userId }])
    .select()
    .single();
  return { data, error };
};

// ── Profile ──────────────────────────────────────────────

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const upsertUserProfile = async (profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert([profileData])
    .select()
    .single();
  return { data, error };
};
