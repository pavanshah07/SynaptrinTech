import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Target, Users, Zap, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Client Retention Rate', value: '98%', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { label: 'Global Clients Served', value: '500+', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { label: 'Average ROI Increase', value: '3x', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
];

interface AboutProps {
  onNavigate?: (href: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#contact');
    } else {
      window.history.pushState(null, '', '#contact');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section id="about" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-4">
            <Sparkles size={14} className="animate-pulse" />
            <span>Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet the Driving Force Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Syntrix Technologies
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            We blend technical SEO precision, AI agent automation, and high-performance web development to scale ambitious businesses worldwide.
          </p>
        </div>

        {/* Founder Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/Pavan.png"
                  alt="Pavan Shah - Founder & CEO of Syntrix Technologies"
                  className="w-full h-[480px] sm:h-[560px] lg:h-[600px] object-cover object-top rounded-t-3xl block filter contrast-[1.02]"
                />

                {/* Info Overlay / Badge */}
                <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-wide">Pavan Shah</h3>
                    <p className="text-cyan-400 font-semibold text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                      <Award size={16} /> Founder & CEO, Syntrix Technologies
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">
                    Leadership
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Story & Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
              Executive Statement
            </div>

            <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed border-l-4 border-cyan-400 pl-4 py-1">
              "I am the Founder & CEO of Syntrix Technologies. My mission is to empower modern brands with intelligent web architecture, data-backed SEO strategy, and custom AI agents that drive real revenue."
            </blockquote>

            <p className="text-slate-300 text-base leading-relaxed font-light">
              Under Pavan's leadership, Syntrix Technologies has evolved from a boutique digital consulting initiative into a full-suite technological partner. We specialize in transforming complex marketing challenges into predictable growth engines through cutting-edge engineering and automated workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200">AI Agent Custom Deployment</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200">Technical & Organic SEO</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200">High-Converting Web Design</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200">Data Analytics & Funnels</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 text-sm"
              >
                <span>Get in Touch with Pavan</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border ${stat.bg} bg-slate-900/60 backdrop-blur-sm transform transition-all hover:-translate-y-1.5`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-6`}>
                  <Icon size={26} />
                </div>
                <h4 className={`text-4xl font-extrabold mb-2 ${stat.color}`}>{stat.value}</h4>
                <p className="text-slate-300 font-medium text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
