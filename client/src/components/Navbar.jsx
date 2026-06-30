import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 backdrop-blur-sm">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <div className="hidden lg:block">
        <p className="text-sm text-slate-400">Welcome back,</p>
        <p className="text-white font-semibold">{user?.name || 'User'}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-slate-400">{user?.email}</span>
        <Button variant="outline" onClick={logout} className="text-sm py-1.5">
          Logout
        </Button>
      </div>
    </header>
  );
}
