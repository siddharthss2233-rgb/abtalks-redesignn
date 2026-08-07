import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, Sparkles, LayoutDashboard, Compass, Mic, Home, Users, Info } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Explore', path: '/explore', icon: Compass },
  { label: 'Speakers', path: '/explore?cat=Speakers', icon: Users },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'About', path: '/about', icon: Info },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
                  <Mic className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                AB<span className="gradient-text">Talks</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      active ? 'text-brand-600 dark:text-brand-300' : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{ color: active ? undefined : 'var(--text-secondary)' }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-px gradient-brand rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all hover:border-brand-400/50 hover:bg-brand-50/50 dark:hover:bg-brand-950/30"
                style={{
                  color: 'var(--text-tertiary)',
                  borderColor: 'var(--border-color)',
                  background: 'var(--bg-elevated)',
                }}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link
                to="/profile"
                className="hidden lg:inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium border transition-all hover:border-brand-400/50"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
              >
                Login
              </Link>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/dashboard"
                  className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold gradient-brand text-white shadow-lg shadow-brand-500/30"
                >
                  Get Started
                </Link>
              </motion.div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden glass border-t overflow-hidden"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active ? 'gradient-brand text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                      style={{ color: active ? 'white' : 'var(--text-secondary)' }}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 flex gap-2">
                  <Link
                    to="/profile"
                    className="flex-1 text-center px-3 py-2.5 rounded-lg text-sm font-medium border"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex-1 text-center px-3 py-2.5 rounded-lg text-sm font-semibold gradient-brand text-white"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
            onClick={() => setSearchOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.form
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSearch}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-strong rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <Sparkles className="w-5 h-5 text-brand-500 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search talks, topics, speakers..."
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-5 py-3 flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span>Try:</span>
                {['Artificial Intelligence', 'Design', 'Leadership', 'Startups'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      navigate(`/explore?q=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="px-2 py-1 rounded-md border hover:border-brand-400/50 hover:text-brand-500 transition-colors"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
