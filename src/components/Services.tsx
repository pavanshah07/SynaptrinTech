import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MonitorSmartphone, 
  Bot, 
  BarChart3, 
  Megaphone, 
  Cpu, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Target, 
  Layers,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Play
} from 'lucide-react';

const carouselSlides = [
  {
    id: 'meta-ads',
    category: 'Meta & Social Ads',
    title: 'Instagram & Facebook Ads Domination',
    badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    description: 'High-converting reel video ads and carousel campaigns targeting high-intent buyers across Instagram and Facebook with precision audience retargeting.',
    metrics: [
      { label: 'Avg ROAS', value: '4.8x' },
      { label: 'CTR Boost', value: '+240%' },
      { label: 'Cost Per Lead', value: '-35%' },
    ],
    features: [
      'Instagram Reels & Story Video Ad Creatives',
      'Facebook Retargeting & Custom Audience Lookalikes',
      'A/B Split Testing for Copy & Visual Assets',
      'Meta Pixel & Conversion API (CAPI) Integration',
    ],
    type: 'meta',
  },
  {
    id: 'google-ads',
    category: 'Google PPC Marketing',
    title: 'Google Search & PMax Ads Strategy',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    description: 'Dominate top Google search results through optimized PPC Search campaigns, Performance Max, and high-converting landing pages.',
    metrics: [
      { label: 'Impression Share', value: '88%' },
      { label: 'Conversion Rate', value: '14.2%' },
      { label: 'Quality Score', value: '9/10' },
    ],
    features: [
      'High-Intent Keyword Bidding & Negative Match',
      'Google Performance Max (PMax) Campaigns',
      'Landing Page Conversion Rate Optimization (CRO)',
      'Google Analytics 4 (GA4) Revenue Tracking',
    ],
    type: 'google',
  },
  {
    id: 'web-dev',
    category: 'Full-Stack Development',
    title: 'High-Speed Web Development & UI',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    description: 'Custom React & Next.js web applications engineered with 60fps micro-animations, 100/100 Core Web Vitals, and mobile-first responsive UX.',
    metrics: [
      { label: 'Lighthouse Speed', value: '99+' },
      { label: 'Load Time', value: '< 0.6s' },
      { label: 'Mobile Score', value: '100/100' },
    ],
    features: [
      'React 19, Next.js & TypeScript Architecture',
      'Tailwind CSS & Glassmorphism Design System',
      'Sub-Second Page Loads & Instant Routing',
      'SEO Schema & Accessibility (a11y) Built-in',
    ],
    type: 'webdev',
  },
  {
    id: 'seo',
    category: 'Organic Growth',
    title: 'Technical SEO & Page 1 Ranking',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    description: 'Comprehensive technical site audits, keyword clustering, link building, and content strategy to rank #1 on Google organically.',
    metrics: [
      { label: 'Traffic Increase', value: '310%' },
      { label: 'Page 1 Keywords', value: '150+' },
      { label: 'Organic Leads', value: '4.2x' },
    ],
    features: [
      'Technical Crawl & Indexability Optimization',
      'Semantic Keyword Research & Content Hubs',
      'High Domain Authority (DA) Backlinks',
      'Google Search Console Rank Monitoring',
    ],
    type: 'seo',
  },
  {
    id: 'ai-agents',
    category: 'AI Automation',
    title: 'Autonomous AI Sales & Support Agents',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    description: 'Custom AI conversational bots trained on your business data to qualify leads, answer FAQs, and automate customer support 24/7.',
    metrics: [
      { label: 'Response Time', value: 'Instant' },
      { label: 'Lead Capture', value: '+180%' },
      { label: 'Support Savings', value: '65%' },
    ],
    features: [
      'Custom LLM Integration (Gemini / OpenAI)',
      'Knowledge Base RAG Training on Your Documents',
      'Automated Lead Qualification & CRM Sync',
      'Omnichannel Bot (Web, WhatsApp, Messenger)',
    ],
    type: 'ai',
  },
];

const gridServices = [
  {
    title: 'Digital Marketing & Social Ads',
    description: 'Data-driven campaigns across Instagram, Facebook, and search platforms to maximize your ROI and brand visibility.',
    icon: Megaphone,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'SEO Services & Audits',
    description: 'Dominate search rankings with our comprehensive technical, on-page, and off-page SEO strategies.',
    icon: Search,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Web Development',
    description: 'Blazing fast, responsive, and accessible websites built with modern frameworks like React and Next.js.',
    icon: MonitorSmartphone,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'AI Agent Creation',
    description: 'Custom AI conversational agents tailored to your business knowledge base for 24/7 customer support.',
    icon: Bot,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'AI Tool Deployment',
    description: 'Integrate powerful AI models and tools into your existing workflows to supercharge team productivity.',
    icon: Cpu,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Transparent, real-time dashboards to track performance, user behavior, and campaign success.',
    icon: BarChart3,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
];

export function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const activeSlideData = carouselSlides[currentSlide];

  return (
    <section id="services" className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles size={14} className="animate-pulse" />
            <span>Premium Digital & AI Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Comprehensive Digital Agency Solutions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            From Meta Ads & Google PPC to modern Web Development, Technical SEO, and Custom AI Agents.
          </p>
        </div>

        {/* INTERACTIVE CAROUSEL SHOWCASE */}
        <div className="mb-24 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Carousel Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-slate-800/80 pb-6">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlay(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {slide.category}
              </button>
            ))}
          </div>

          {/* Carousel Main Stage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold border ${activeSlideData.badgeColor}`}>
                    <Zap size={12} />
                    <span>{activeSlideData.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    {activeSlideData.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    {activeSlideData.description}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {activeSlideData.metrics.map((metric) => (
                      <div key={metric.label} className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl text-center">
                        <div className="text-lg sm:text-2xl font-black text-cyan-400">{metric.value}</div>
                        <div className="text-[11px] text-slate-400 font-semibold">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features Checkmarks */}
                  <div className="space-y-2.5 pt-2">
                    {activeSlideData.features.map((feat) => (
                      <div key={feat} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Media / Animated Visual Mockup Area */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[320px] flex items-center justify-center"
                >
                  {/* Visual 1: Meta Ads & Instagram / Facebook Animated GIF Mockup */}
                  {activeSlideData.type === 'meta' && (
                    <div className="w-full space-y-4">
                      {/* Animated Instagram Reel Ad Mockup */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-0.5">
                              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-[10px] font-bold text-pink-400">
                                S
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1">
                                synaptrintech.com <span className="text-[10px] text-pink-400 bg-pink-500/10 px-1.5 py-0.2 rounded">Sponsored</span>
                              </div>
                              <div className="text-[10px] text-slate-400">Instagram & Facebook Feed</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-cyan-400">Meta Ad Live</span>
                        </div>

                        {/* Animated Visual Card */}
                        <div className="relative h-40 bg-gradient-to-br from-pink-950/60 via-purple-950/40 to-slate-950 rounded-xl overflow-hidden border border-pink-500/20 flex flex-col justify-between p-4">
                          <div className="flex justify-between items-start">
                            <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-500/30 animate-pulse">
                              High ROAS Ad Campaign
                            </span>
                            <div className="flex items-center space-x-1 text-pink-400 text-xs font-bold">
                              <Heart size={14} className="fill-pink-500 text-pink-500 animate-bounce" />
                              <span>12.4k</span>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-black text-white mb-1">Scale Revenue with Meta Video Ads</div>
                            <div className="text-xs text-slate-300">Targeting High Intent Facebook & IG Users</div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-pink-500/20">
                            <span className="text-xs font-bold text-pink-300">Learn More</span>
                            <div className="flex space-x-3 text-slate-400">
                              <MessageCircle size={14} />
                              <Share2 size={14} />
                            </div>
                          </div>
                        </div>

                        {/* Live Conversion Ticker */}
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <TrendingUp size={14} /> ROAS 4.8x Achieved
                          </span>
                          <span className="text-slate-400">Meta Ads API</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 2: Google Ads Performance Dashboard */}
                  {activeSlideData.type === 'google' && (
                    <div className="w-full space-y-4">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-slate-300 ml-2">Google Ads Campaign Dashboard</span>
                          </div>
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">PMax Active</span>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-slate-400">Ad Search Query: <strong className="text-white">"Best Digital Agency Mumbai"</strong></div>
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                            <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                              Ad · https://synaptrintech.com/google-ads
                            </div>
                            <div className="text-sm font-extrabold text-blue-400">SynaptrinTech — #1 Technical SEO & Google PPC Agency</div>
                            <div className="text-xs text-slate-300 font-light">Get 3x ROI with optimized Search Ads & PMax campaigns. Book a consultation today.</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                            <div className="text-xs text-slate-400">Click Through Rate</div>
                            <div className="text-lg font-black text-amber-400">14.2%</div>
                          </div>
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                            <div className="text-xs text-slate-400">Quality Score</div>
                            <div className="text-lg font-black text-emerald-400">9 / 10</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 3: Web Development Animation */}
                  {activeSlideData.type === 'webdev' && (
                    <div className="w-full space-y-4">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                          <span>App.tsx — React 19 + Vite</span>
                          <span className="text-emerald-400 font-bold">100/100 Speed Score</span>
                        </div>

                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-slate-300 overflow-x-auto">
                          <div><span className="text-purple-400">export function</span> <span className="text-cyan-400">WebDevApp</span>() {'{'}</div>
                          <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                          <div className="pl-8 text-emerald-300">&lt;<span className="text-blue-400">HeroSection</span> speed="sub-second" /&gt;</div>
                          <div className="pl-4">);</div>
                          <div>{'}'}</div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 font-sans">
                          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                            <Zap size={16} />
                            <span>Core Web Vitals: Passed</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LCP 0.4s</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 4: SEO Ranking Dashboard */}
                  {activeSlideData.type === 'seo' && (
                    <div className="w-full space-y-3">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-white">Google Rank Monitoring</span>
                          <span className="text-xs font-bold text-emerald-400">Page 1 Ranked</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-slate-300 font-semibold">"Digital Marketing Agency Mumbai"</span>
                            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Rank #1</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-slate-300 font-semibold">"Technical SEO Services"</span>
                            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Rank #2</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-slate-300 font-semibold">"AI Agent Development"</span>
                            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Rank #1</span>
                          </div>
                        </div>

                        <div className="text-center pt-1 text-xs text-slate-400">
                          <span className="text-emerald-400 font-bold">+310% Organic Traffic Growth</span> in 90 Days
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 5: AI Agent Chat Interface */}
                  {activeSlideData.type === 'ai' && (
                    <div className="w-full space-y-3">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 text-xs">
                        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                          <Bot size={16} className="text-purple-400" />
                          <span className="font-bold text-white">SynaptrinTech AI Support Bot (24/7 Active)</span>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300 max-w-[85%]">
                            Hi! How can SynaptrinTech help scale your business today?
                          </div>
                          <div className="bg-purple-600/20 text-purple-200 p-2.5 rounded-xl border border-purple-500/30 max-w-[85%] ml-auto text-right">
                            I want to run Meta & Google Ads for my business.
                          </div>
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300 max-w-[85%]">
                            Great! I've booked your consultation slot with Pavan Shah. Check your email.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Carousel Controls Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
                  setIsAutoPlay(false);
                }}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => {
                  setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
                  setIsAutoPlay(false);
                }}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Slide {currentSlide + 1} of {carouselSlides.length}
            </div>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                isAutoPlay ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' : 'text-slate-400 bg-slate-900 border-slate-800'
              }`}
            >
              {isAutoPlay ? 'Autoplay ON' : 'Autoplay OFF'}
            </button>
          </div>

        </div>

        {/* ALL CAPABILITIES GRID */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Full Suite of Service Offerings
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Explore all specialized services available for immediate subscription or custom contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 hover:border-slate-700"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${service.color}`}>
                    <Icon size={28} />
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mb-3">{service.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
