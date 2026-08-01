

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { ScrollCanvasSequence } from './components/ScrollCanvasSequence';
import { About } from './components/About';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PaymentPage } from './components/PaymentPage';
import { AuthPage } from './components/AuthPage';
import { Sparkles, ShieldCheck, Lock, X, LogIn, UserPlus } from 'lucide-react';

type TabType = 'home' | 'about' | 'services' | 'pricing' | 'contact';

function MainContent() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [view, setView] = useState<'page' | 'signin' | 'signup'>('page');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string, price: string } | null>(null);
  const [loginPrompt, setLoginPrompt] = useState<{ isOpen: boolean, plan?: { name: string, price: string } }>({ isOpen: false });

  const { user } = useAuth();

  // Sync state with URL location hash
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash;
      const hash = fullHash.replace('#', '');

      if (hash === 'signin' || hash === 'signup') {
        setView(hash as 'signin' | 'signup');
      } else if (['home', 'about', 'services', 'pricing', 'contact'].includes(hash)) {
        setView('page');
        setActiveTab(hash as TabType);
      } else if (!hash) {
        setView('page');
        setActiveTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (href: string) => {
    const cleanHash = href.replace('#', '');
    if (cleanHash === 'signin' || cleanHash === 'signup') {
      setView(cleanHash as 'signin' | 'signup');
    } else {
      setView('page');
      setSelectedPlan(null);
      if (['home', 'about', 'services', 'pricing', 'contact'].includes(cleanHash)) {
        setActiveTab(cleanHash as TabType);
      } else {
        setActiveTab('home');
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectPlan = (name: string, price: string) => {
    if (!user) {
      setLoginPrompt({ isOpen: true, plan: { name, price } });
    } else {
      window.history.pushState(null, '', '#payment');
      setSelectedPlan({ name, price });
    }
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    window.history.pushState(null, '', `#${mode}`);
    setView(mode);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Full-screen Payment View
  if (selectedPlan) {
    return (
      <PaymentPage
        planName={selectedPlan.name}
        price={selectedPlan.price}
        onBack={() => handleNavigate('#pricing')}
      />
    );
  }

  // Full-screen Dedicated Auth Page View (Sign In / Sign Up)
  if (view === 'signin' || view === 'signup') {
    return (
      <AuthPage
        initialMode={view}
        onBack={() => handleNavigate('#home')}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-gray-100 relative flex flex-col justify-between">
      <div>
        <Navigation
          activeTab={activeTab}
          onOpenSignIn={() => handleOpenAuth('signin')}
          onOpenSignUp={() => handleOpenAuth('signup')}
          onNavigate={(href) => handleNavigate(href)}
        />

        {/* Access Status Banner */}
        {user ? (
          <div className="pt-24 pb-2 px-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border-b border-emerald-500/20 text-center">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-300">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>
                Welcome, <strong className="text-white">{user.user_metadata?.full_name || user.email}</strong>! Subscriptions unlocked.
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-24 pb-2 px-4 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border-b border-blue-500/20 text-center">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
              <Sparkles size={16} className="text-cyan-400 shrink-0" />
              <span>Sign in or create a free account to purchase any subscription plan.</span>
              <button
                onClick={() => handleOpenAuth('signup')}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-2 ml-1"
              >
                Sign Up Free Page
              </button>
            </div>
          </div>
        )}

        {/* Single Page Active Tab View */}
        <main className="min-h-[70vh]">
          {activeTab === 'home' && (
            <ScrollCanvasSequence onSelectPlan={handleSelectPlan} onNavigate={handleNavigate} />
          )}

          {activeTab === 'about' && (
            <div className="pt-6">
              <About onNavigate={handleNavigate} />
            </div>
          )}

          {activeTab === 'services' && (
            <div className="pt-6">
              <Services />
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="pt-6">
              <Pricing onSelectPlan={handleSelectPlan} />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="pt-6">
              <Contact />
            </div>
          )}
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />

      {/* Login Required Modal Prompt */}
      <AnimatePresence>
        {loginPrompt.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginPrompt({ isOpen: false })}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative my-auto w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 z-10 text-center"
            >
              <button
                onClick={() => setLoginPrompt({ isOpen: false })}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/10">
                <Lock size={30} />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">Login Required</h3>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                You must be logged in to purchase the <strong className="text-cyan-400">SynaptrinTech {loginPrompt.plan?.name}</strong> plan ({loginPrompt.plan?.price}).
                Please sign in or create a free account to proceed to checkout.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setLoginPrompt({ isOpen: false });
                    handleOpenAuth('signin');
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-sm"
                >
                  <LogIn size={18} />
                  <span>Sign In to Continue</span>
                </button>

                <button
                  onClick={() => {
                    setLoginPrompt({ isOpen: false });
                    handleOpenAuth('signup');
                  }}
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <UserPlus size={18} />
                  <span>Create Free Account</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
