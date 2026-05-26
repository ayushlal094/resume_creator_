import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const DashboardLayout = () => (
  <div className="min-h-screen flex flex-col bg-[var(--surface-1)]">
    <Navbar />
    <main className="flex-1 pt-20">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
