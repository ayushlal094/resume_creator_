# ResumeForge AI 🚀

> **Build Professional ATS-Friendly Resumes in Minutes**

A premium, production-ready AI-powered resume builder SaaS built with React, Vite, Tailwind CSS, Framer Motion, and Supabase.

---

## ✨ Features

- 🎨 **5 Professional Templates** — Modern, Minimal, Corporate, Creative, Executive
- 📄 **Live Resume Preview** — Real-time updates as you type
- 🎯 **ATS Score Analyzer** — Keyword detection and improvement suggestions
- ☁️ **Cloud Saving** — Auto-save with Supabase (3-second debounce)
- 📥 **PDF Download** — High-quality PDF generation via html2pdf.js
- 🌙 **Dark / Light Mode** — Persisted in localStorage
- 🔐 **Auth** — Email, Google, GitHub via Supabase Auth
- 📱 **Fully Responsive** — Mobile, tablet, desktop

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| State | Zustand |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| PDF | html2pdf.js |
| Icons | Lucide React |
| Routing | React Router v6 |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourname/resumeforge-ai.git
cd resumeforge-ai
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Copy your **Project URL** and **Anon Key** from Settings → API.
3. Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Database Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Resume',
  template_name TEXT DEFAULT 'modern',
  personal_info JSONB DEFAULT '{}',
  summary TEXT DEFAULT '',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  experience JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  interests JSONB DEFAULT '[]',
  ats_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 4. Enable OAuth Providers (Optional)

In Supabase Dashboard → Authentication → Providers:
- Enable **Google** (add Client ID + Secret from Google Cloud Console)
- Enable **GitHub** (add Client ID + Secret from GitHub OAuth Apps)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Navbar, Footer, Loader
│   ├── forms/         # All resume section forms
│   ├── resume/        # Preview + Template switcher
│   ├── templates/     # 5 resume templates
│   └── dashboard/     # ATS Score, Progress, Stats
├── pages/             # Home, Builder, Dashboard, Templates, Login, Signup
├── layouts/           # MainLayout, DashboardLayout
├── routes/            # AppRoutes (lazy-loaded)
├── context/           # Auth, Resume (Zustand), Theme
├── supabase/          # client, auth, queries
├── services/          # pdfService, atsService
├── utils/             # constants, atsScore, helpers
└── styles/            # globals.css, themes.css, animations.css
```

---

## 🎨 Color Palette

| Name | Hex |
|------|-----|
| Smoky Black | `#11120D` |
| Olive Drab | `#565449` |
| Bone | `#D8CFBC` |
| Floral White | `#FFFBF4` |

---

## 🔧 Customization

| What to change | Where |
|----------------|-------|
| Brand colors | `src/styles/themes.css` |
| Global animations | `src/styles/animations.css` |
| Resume templates | `src/components/templates/` |
| ATS scoring logic | `src/utils/atsScore.js` |
| PDF generation settings | `src/services/pdfService.js` |
| Navigation links | `src/components/common/Navbar.jsx` |
| Feature list (homepage) | `src/utils/constants.js` |

---

## 🚀 Deploy to Vercel

```bash
npm run build
vercel --prod
```

Add your environment variables in Vercel Dashboard → Settings → Environment Variables.

---

## 📄 License

MIT — feel free to use, modify, and distribute.
