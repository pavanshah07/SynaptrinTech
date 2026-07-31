import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Video, 
  Globe, 
  Search, 
  Bot, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const platformBadges = [
  { name: 'Instagram', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30', type: 'instagram' },
  { name: 'Facebook', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', type: 'facebook' },
  { name: 'YouTube', color: 'text-red-400 bg-red-500/10 border-red-500/30', type: 'youtube' },
  { name: 'Google Ads', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', type: 'google' },
  { name: 'Website & App', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30', type: 'website' },
];

const tiersData = [
  {
    name: 'Growth',
    tagline: 'Social & Local SEO Starter',
    description: 'Perfect for small businesses looking to establish their online presence and social channels.',
    monthlyPrice: 8999,
    yearlyPrice: 7199,
    popular: false,
    platforms: ['instagram', 'facebook', 'website'],
    features: [
      'Instagram & Facebook Content (8 Posts/mo)',
      'Basic Local SEO & Google Business Profile',
      'Website Maintenance & Speed Monitoring',
      'Monthly Analytics & Reach Report',
      'Standard Email & WhatsApp Support',
    ],
  },
  {
    name: 'Scale',
    tagline: 'Meta Ads & Web Development',
    description: 'Advanced marketing with Meta Ads (Instagram & Facebook), Google Ads, and full web development.',
    monthlyPrice: 19999,
    yearlyPrice: 15999,
    popular: true,
    platforms: ['instagram', 'facebook', 'google', 'website'],
    features: [
      'Instagram Reels & Facebook Video Ads',
      'Google Search PPC & Keyword Ads',
      'Full React / Next.js Web Development',
      'Technical SEO & On-Page Audit',
      'Basic AI Lead Qualification Bot',
      'Bi-Weekly Growth Strategy Calls',
    ],
  },
  {
    name: 'All Packages Included',
    tagline: 'Complete Omnichannel & AI Suite',
    description: 'Full digital ecosystem covering Instagram, Facebook, YouTube Ads, Web Apps & Custom AI Agents.',
    monthlyPrice: 24999,
    yearlyPrice: 19999,
    popular: false,
    platforms: ['instagram', 'facebook', 'youtube', 'google', 'website'],
    features: [
      'Complete Meta Ads (Instagram + Facebook)',
      'YouTube Video Ad Campaigns & Management',
      'Custom Full-Stack Web App Development',
      'Technical SEO, Backlinks & Rank Tracking',
      'Custom Autonomous AI Support Agent',
      '24/7 Priority VIP Support & Account Manager',
    ],
  },
];

interface PricingProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user } = useAuth();

  return (
    <section id="pricing" className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles size={14} className="animate-pulse" />
            <span>Transparent Subscription Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Select Your Growth Subscription
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            All plans include Instagram, Facebook, YouTube Ads, Website Development, and AI integration.
          </p>

          {/* Billing Cycle Switcher Toggle */}
          <div className="mt-8 inline-flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* PLATFORM LOGO ANIMATED SHOWCASE STRIP */}
        <div className="mb-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Supported Platforms & Channels Included Across Plans
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Instagram Icon Badge */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-pink-500/30 px-4 py-2.5 rounded-2xl shadow-lg hover:border-pink-500 transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white">Instagram Reels</span>
                <span className="text-[10px] text-pink-400 font-semibold">Meta Video Ads</span>
              </div>
            </div>

            {/* Facebook Icon Badge */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-blue-500/30 px-4 py-2.5 rounded-2xl shadow-lg hover:border-blue-500 transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white">Facebook Ads</span>
                <span className="text-[10px] text-blue-400 font-semibold">Meta Audience</span>
              </div>
            </div>

            {/* YouTube Icon Badge */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-red-500/30 px-4 py-2.5 rounded-2xl shadow-lg hover:border-red-500 transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Video size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white">YouTube Ads</span>
                <span className="text-[10px] text-red-400 font-semibold">Video Campaigns</span>
              </div>
            </div>

            {/* Google Ads Badge */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-amber-500/30 px-4 py-2.5 rounded-2xl shadow-lg hover:border-amber-500 transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Search size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white">Google PPC</span>
                <span className="text-[10px] text-amber-400 font-semibold">Search & PMax</span>
              </div>
            </div>

            {/* Website App Badge */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-cyan-500/30 px-4 py-2.5 rounded-2xl shadow-lg hover:border-cyan-500 transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-white">Web Development</span>
                <span className="text-[10px] text-cyan-400 font-semibold">React & Next.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING TIERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {tiersData.map((tier, index) => {
            const displayPrice = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
            const priceFormatted = `₹${displayPrice.toLocaleString()}`;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'bg-slate-900 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 scale-105 z-10'
                    : 'bg-slate-900/60 border border-slate-800 shadow-xl hover:border-slate-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-white mb-1">{tier.name}</h3>
                    <div className="text-xs font-bold text-cyan-400 mb-2">{tier.tagline}</div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tier.description}</p>
                  </div>

                  {/* Included Channel Badges */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {tier.platforms.includes('instagram') && (
                      <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                        Instagram
                      </span>
                    )}
                    {tier.platforms.includes('facebook') && (
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        Facebook
                      </span>
                    )}
                    {tier.platforms.includes('youtube') && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                        YouTube Ads
                      </span>
                    )}
                    {tier.platforms.includes('google') && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        Google Ads
                      </span>
                    )}
                    {tier.platforms.includes('website') && (
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                        Web Dev
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline text-4xl sm:text-5xl font-black text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {priceFormatted}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 ml-1.5">
                      / month {billingCycle === 'yearly' && '(billed annually)'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start text-xs sm:text-sm text-slate-300">
                        <CheckCircle2
                          size={16}
                          className="mr-2.5 flex-shrink-0 text-cyan-400 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(tier.name, priceFormatted)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-lg ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/25 hover:scale-105'
                      : 'bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-cyan-500/30 hover:scale-105'
                  }`}
                >
                  {!user && <Lock size={16} className="text-slate-400 shrink-0" />}
                  <span>{user ? 'Select Plan' : 'Buy Now (Login Required)'}</span>
                  {user && <ArrowRight size={16} />}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* GUARANTEE & SERVICE COMMITMENT BAR */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck size={20} />
            <span>Satisfaction & Quality Guaranteed</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Need a Custom Agency Contract or Specialized AI Architecture?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            We offer custom enterprise contracts for multi-region SEO campaigns, high-volume Meta ad budgets, and custom on-premise AI deployments.
          </p>
        </div>

      </div>
    </section>
  );
}
