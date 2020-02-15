import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import { UserAvatar } from './UserAvatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Meeting Room', href: '/meeting-room' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Export', href: '/export' },
];

// PivotalStacks Logo Component
function PivotalStacksLogo({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#logoGradient)"/>
        <path d="M10 26V10h4l6 10 6-10h4v16h-4V17l-4 7h-4l-4-7v9h-4z" fill="white"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-base tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Pivotal</span>
        <span className="font-semibold text-primary-400 text-[10px] tracking-widest">STACKS</span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? `${isDark ? 'bg-dark-950/95' : 'bg-white/95'} backdrop-blur-xl shadow-lg py-3`
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <PivotalStacksLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.href
                    ? 'text-primary-400'
                    : isDark ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-dark-800/50 text-dark-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden lg:block">
              <UserAvatar />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 ${isDark ? 'bg-dark-950 border-dark-800' : 'bg-white border-gray-200'} border-t transition-all duration-500 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-main py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                location.pathname === item.href
                  ? 'text-primary-400 bg-primary-500/10'
                  : isDark ? 'text-dark-300 hover:text-white hover:bg-dark-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className={`pt-4 mt-4 border-t ${isDark ? 'border-dark-800' : 'border-gray-200'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Link to="/auth/login" className={`hover:text-primary-400 text-sm font-medium ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                Sign In
              </Link>
              <Link to="/auth/register" className="btn-primary text-sm py-2 px-4">
                Get Started
              </Link>
            </div>
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
              {isDark ? <Sun className="w-5 h-5 text-dark-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}