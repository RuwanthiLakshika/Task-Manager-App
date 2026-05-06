import { NavLink } from 'react-router-dom';
import useTasks from '../hooks/useTasks';

export const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { tasks } = useTasks();
  
  const menuItems = [
    { icon: '✓', label: 'My Tasks', href: '/tasks', active: true },
  ];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg overflow-y-auto transform transition-transform z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-11/12 max-w-xs md:w-64 md:translate-x-0`}
      >
        <div className="md:hidden flex items-center justify-end p-3">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-slate-300 hover:bg-slate-700/40"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">TM</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Task Manager</h1>
            <p className="text-slate-400 text-xs">v1.0</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive || item.active
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900/50">
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">👤</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-white font-semibold">Welcome back!</p>
              <p className="text-slate-300 text-xs mt-1">Keep pushing forward</p>
            </div>

            <div className="flex flex-col items-center">
              <svg className="w-24 h-24 -rotate-90 mb-3" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#1e293b" strokeWidth="3" />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center mt-2">
                <p className="text-2xl font-bold text-white">{percentage}%</p>
                <p className="text-xs text-slate-300">Completed</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-600">
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-400">{completed}</p>
                <p className="text-xs text-slate-400">Done</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-orange-400">{total - completed}</p>
                <p className="text-xs text-slate-400">Left</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
