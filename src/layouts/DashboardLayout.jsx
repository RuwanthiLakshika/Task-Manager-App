import { Sidebar } from '../components/Sidebar';
import { useState, useEffect } from 'react';

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-pink-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 ml-0 md:ml-64 overflow-y-auto">
        <div className="md:hidden flex items-center justify-between p-4 bg-transparent">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-white/10 text-slate-800"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <div className="text-lg font-semibold">Task Manager</div>
          <div />
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
