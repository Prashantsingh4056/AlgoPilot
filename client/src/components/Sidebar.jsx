import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
  { to: '/coach', label: 'Coach', icon: '🎓' },
  { to: '/reviewer', label: 'Reviewer', icon: '💻' },
  { to: '/interview', label: 'Interview', icon: '🎤' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/solved-problems', label: 'Reviewed Problems', icon: '🗃️' },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br  flex items-center justify-center text-white font-bold text-2xl">
            <img src="public\logo.png" alt="" />
          </div>
          <span className="text-xl font-bold text-white ml-2">AlgoPilot</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md text-[15px] font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export function MobileNavFooter({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white w-full"
    >
      <span>🚪</span>
      Logout
    </button>
  );
}
