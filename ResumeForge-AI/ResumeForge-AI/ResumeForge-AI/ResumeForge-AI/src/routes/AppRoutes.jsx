import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../pages/Home'));
const Builder = lazy(() => import('../pages/Builder'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Templates = lazy(() => import('../pages/Templates'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Auth pages (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Builder — no footer */}
      <Route element={<DashboardLayout />}>
        <Route path="/builder" element={<Builder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Main pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
