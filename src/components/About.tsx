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
              SynaptrinTech Technologies
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            We blend technical SEO precision, AI agent automation, and high-performance web development to scale ambitious businesses worldwide.
          </p>
        </div>

        {/* Founder & CEO Executive Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20">
          {/* Founder Card: Pavan Shah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 overflow-hidden">
                <img
                  src="/Pavan.png"
                  alt="Pavan Shah - Founder of SynaptrinTech"
                  className="w-full h-full object-cover object-top block filter contrast-[1.02]"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-full z-10">
                  Founder
                </div>
              </div>

              <div className="p-6 space-y-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-wide">Pavan Shah</h3>
                  <p className="text-cyan-400 font-semibold text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                    <Award size={16} /> Founder, SynaptrinTech
                  </p>
                  <blockquote className="text-sm text-slate-300 font-medium italic border-l-2 border-cyan-400 pl-3 mt-3">
                    "I am the Founder of SynaptrinTech. My mission is to empower modern brands with intelligent web architecture, data-backed SEO strategy, and custom AI agents."
                  </blockquote>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={handleContactClick}
                    className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 px-5 py-2.5 rounded-full font-bold text-xs transition-all hover:scale-105"
                  >
                    <span>Connect with Founder</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CEO Card: Suhani Shah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src="/Suhani.png"
                  alt="Suhani Shah - CEO of SynaptrinTech"
                  className="w-full h-full object-cover object-center block filter contrast-[1.02]"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full z-10">
                  Chief Executive Officer
                </div>
              </div>

              <div className="p-6 space-y-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-wide">Suhani Shah</h3>
                  <p className="text-purple-400 font-semibold text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                    <Award size={16} /> CEO, SynaptrinTech
                  </p>
                  <blockquote className="text-sm text-slate-300 font-medium italic border-l-2 border-purple-400 pl-3 mt-3">
                    "As CEO of SynaptrinTech, I lead our strategic expansion and operational excellence to ensure ambitious brands achieve predictable growth worldwide."
                  </blockquote>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={handleContactClick}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all hover:scale-105 shadow-lg shadow-purple-500/20"
                  >
                    <span>Connect with CEO</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
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
