import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, LogOut, LayoutDashboard, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export function UserAvatar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // No avatar shown when not logged in
  }

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-dark-800/50 transition-all"
      >
        <div className="relative">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.fullName} className="w-8 h-8 rounded-full object-cover border-2 border-dark-700" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
              {initials}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-success-500 border-2 border-dark-950 rounded-full" />
        </div>
        <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 bg-dark-900 rounded-xl shadow-lg border border-dark-800 overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-4 border-b border-dark-800">
          <p className="font-medium text-white truncate">{user?.fullName}</p>
          <p className="text-sm text-dark-400 truncate">{user?.email}</p>
        </div>

        <div className="p-2">
          <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-dark-200 hover:bg-dark-800 rounded-lg transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-dark-200 hover:bg-dark-800 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="p-2 border-t border-dark-800">
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 text-error-400 hover:bg-error-500/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
