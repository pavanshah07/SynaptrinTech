import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  activeTab?: string;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
  onNavigate?: (href: string) => void;
}

export function Navigation({ activeTab = 'home', onOpenSignIn, onOpenSignUp, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(href);
    }

    window.history.pushState(null, '', href);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-2.5' : 'bg-slate-950/40 backdrop-blur-md border-b border-slate-800/30 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center group">
              <img 
                src="/Synaptrintech.png" 
                alt="SynaptrinTech Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain max-h-[56px] transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.35)]"
              />
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-2 lg:space-x-4 items-center">
            {navLinks.map((link) => {
              const isActive = link.href === `#${activeTab}`;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-400 font-extrabold bg-cyan-500/10 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-cyan-400 font-semibold hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-full py-1.5 pl-3 pr-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                    <User size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-200 leading-tight max-w-[120px] truncate">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck size={10} /> Free Access Active
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => signOut()}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-full transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenSignIn && onOpenSignIn()}
                  className="text-slate-200 hover:text-cyan-400 font-bold transition-colors px-4 py-2 text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenSignUp && onOpenSignUp()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-500/25 hover:scale-105 text-sm"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-200 hover:text-cyan-400 focus:outline-none p-2 rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 backdrop-blur-2xl shadow-2xl border-t border-slate-800/80 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = link.href === `#${activeTab}`;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-3.5 text-base rounded-xl transition-all ${
                      isActive
                        ? 'text-cyan-400 font-extrabold bg-slate-900 border border-cyan-500/30'
                        : 'font-bold text-slate-200 hover:text-cyan-400 hover:bg-slate-900/90 border border-transparent hover:border-slate-800'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="border-t border-slate-800/80 pt-4 mt-4 space-y-3">
                {user ? (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{displayName}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                        <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                          <ShieldCheck size={12} /> Free Access Active
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                      className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); if (onOpenSignIn) onOpenSignIn(); }}
                      className="w-full px-4 py-3.5 text-base font-bold text-center text-cyan-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); if (onOpenSignUp) onOpenSignUp(); }}
                      className="w-full px-4 py-3.5 text-base font-bold text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
                    >
                      Sign Up Free
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
