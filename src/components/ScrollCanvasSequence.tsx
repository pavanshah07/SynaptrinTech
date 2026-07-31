import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronDown, 
  CheckCircle2, 
  Zap, 
  Search, 
  MonitorSmartphone, 
  Bot, 
  Megaphone, 
  ExternalLink, 
  TrendingUp, 
  Code, 
  ShieldCheck, 
  Video, 
  Globe,
  Volume2,
  VolumeX
} from 'lucide-react';

const FRAME_COUNT = 240;

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/frames/frame_${paddedIndex}.jpg`;
};

interface ScrollCanvasSequenceProps {
  onSelectPlan?: (name: string, price: string) => void;
  onNavigate?: (href: string) => void;
}

export function ScrollCanvasSequence({ onSelectPlan, onNavigate }: ScrollCanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socialVideoRef = useRef<HTMLVideoElement>(null);
  const [isSocialMuted, setIsSocialMuted] = useState<boolean>(true);

  const toggleSocialAudio = () => {
    if (socialVideoRef.current) {
      const newMutedState = !isSocialMuted;
      socialVideoRef.current.muted = newMutedState;
      setIsSocialMuted(newMutedState);
      if (!newMutedState) {
        socialVideoRef.current.play().catch(() => {});
      }
    }
  };
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  const handleLinkClick = (e: MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.history.pushState(null, '', href);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0.0 -> 1.0) to frame index (0 -> 239)
  const frameIndexProgress = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload all 240 frames
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[i - 1] = img;
        count++;
        setLoadedCount(count);
        if (count === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
          setIsPlaying(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame on canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Sync scroll with frame index
  useEffect(() => {
    const unsubscribe = frameIndexProgress.on('change', (latest) => {
      if (!isPlaying && isLoaded && images.length > 0) {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
        setCurrentFrameIndex(index);
        renderFrame(index);
      }
    });

    return () => unsubscribe();
  }, [frameIndexProgress, isPlaying, isLoaded, images]);

  // Autoplay loop when not user scrolling or when playing
  useEffect(() => {
    let animationFrameId: number;
    if (isPlaying && isLoaded && images.length > 0) {
      const step = () => {
        setCurrentFrameIndex((prev) => {
          const next = (prev + 1) % FRAME_COUNT;
          renderFrame(next);
          return next;
        });
        animationFrameId = requestAnimationFrame(step);
      };
      animationFrameId = requestAnimationFrame(step);
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isLoaded, images]);

  // Transform values for text overlay animations
  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [1, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  const text2Opacity = useTransform(scrollYProgress, [0.26, 0.32, 0.48, 0.53], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.26, 0.32, 0.48, 0.53], [40, 0, 0, -40]);

  const text3Opacity = useTransform(scrollYProgress, [0.54, 0.6, 0.76, 0.82], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.54, 0.6, 0.76, 0.82], [40, 0, 0, -40]);

  const text4Opacity = useTransform(scrollYProgress, [0.83, 0.88, 0.98, 1], [0, 1, 1, 1]);
  const text4Y = useTransform(scrollYProgress, [0.83, 0.88], [40, 0]);

  const loadPercent = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div id="home" className="bg-slate-950 text-white font-sans">
      {/* 3D Canvas Scroll Section */}
      <div ref={containerRef} className="relative h-[350vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/60 pointer-events-none" />

          {!isLoaded && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white">
              <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
              <p className="text-sm font-semibold tracking-wider text-slate-300">
                Loading 3D Experience... {loadPercent}%
              </p>
            </div>
          )}

          {/* Overlay 1: Hero Intro */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="text-center max-w-4xl mx-auto pointer-events-auto">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-cyan-400 mb-6 shadow-lg shadow-cyan-500/10">
                <Sparkles size={16} className="animate-pulse" />
                <span>Next-Gen Digital Marketing & AI Agency</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
                Empowering Growth via{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  Syntrix Technologies
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                We blend technical SEO, modern web development, and cutting-edge AI agents to build high-converting web experiences that scale.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 hover:scale-105"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={20} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 backdrop-blur-md text-white rounded-full font-bold text-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all hover:scale-105"
                >
                  Book a Consultation
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center space-x-2 text-slate-400 text-xs sm:text-sm font-medium animate-bounce">
                <span>Scroll down to explore core pillars</span>
                <ChevronDown size={18} />
              </div>
            </div>
          </motion.div>

          {/* Overlay 2: Core Pillars */}
          <motion.div
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
                  <Search size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">SEO & Digital Marketing</h3>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Data-driven strategies that capture high-intent traffic, build brand authority, and maximize your return on ad spend.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    <span>Technical & On-Page Audit</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    <span>Omnichannel Paid Advertising</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Autonomous AI Agents</h3>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Tailored AI conversational agents and automation workflows built directly on your business knowledge base.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-indigo-400" />
                    <span>24/7 Customer Support Bots</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-indigo-400" />
                    <span>Automated Workflow Tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Overlay 3: Proven Impact */}
          <motion.div
            style={{ opacity: text3Opacity, y: text3Y }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="text-center max-w-4xl mx-auto pointer-events-auto">
              <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-4">Engineered For Performance</h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-12">
                Transforming Digital Metrics Into Real Revenue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                    98%
                  </div>
                  <p className="text-slate-300 font-medium text-sm">Client Retention Rate</p>
                </div>

                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                    300%+
                  </div>
                  <p className="text-slate-300 font-medium text-sm">Search Traffic Growth</p>
                </div>

                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
                    3x
                  </div>
                  <p className="text-slate-300 font-medium text-sm">Average Client ROI</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overlay 4: Transition Prompt */}
          <motion.div
            style={{ opacity: text4Opacity, y: text4Y }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="text-center max-w-3xl mx-auto pointer-events-auto bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Build Your Digital Advantage?
              </h2>
              <p className="text-slate-300 text-lg mb-8 font-light">
                Explore our core services, tech stack, and social channels below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#pricing"
                  onClick={(e) => handleLinkClick(e, '#pricing')}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-base transition-all shadow-lg shadow-blue-600/30"
                >
                  View Subscriptions
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, '#about')}
                  className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full font-bold text-base transition-all"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 z-40 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center space-x-4 shadow-2xl text-xs font-mono">
            <div className="flex items-center space-x-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Frame {currentFrameIndex + 1} / {FRAME_COUNT}</span>
            </div>

            <div className="h-4 w-px bg-slate-700" />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-cyan-400 transition-colors font-sans font-semibold"
            >
              {isPlaying ? (
                <>
                  <Pause size={14} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Auto Play</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentFrameIndex(0);
                renderFrame(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              title="Reset Animation"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* RICH HOME PAGE CONTENT SECTIONS */}
      <div className="relative z-30 bg-slate-950 border-t border-slate-800/80 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* SECTION 1: Core Services & Capabilities Grid */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 mb-4">
                <Code size={14} />
                <span>End-to-End Technology & Growth</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                SEO, Web Development & Digital Marketing Excellence
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Comprehensive digital agency solutions designed to elevate brand authority and drive sustainable revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Technical SEO */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 group">
                <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Search size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">SEO & Keyword Mastery</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Rank on Page 1 of Google with technical site audits, intent-based keyword research, on-page optimization, and high-DA link building.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400" />
                    <span>Technical SEO & Schema Markup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400" />
                    <span>Keyword Research & Competitor Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400" />
                    <span>Google Search Console & Analytics Setup</span>
                  </div>
                </div>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="inline-flex items-center space-x-2 text-cyan-400 font-bold text-sm hover:text-cyan-300 group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn about SEO</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Card 2: Web Development */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group">
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">Modern Web Development</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Blazing fast React & Next.js applications engineered for high conversion rates, ultra-low load times, and perfect mobile responsiveness.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span>React, Vite & Next.js Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span>Core Web Vitals & LCP Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span>Custom UI/UX & Interactive Design</span>
                  </div>
                </div>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="inline-flex items-center space-x-2 text-blue-400 font-bold text-sm hover:text-blue-300 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Web Development</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Card 3: Digital Marketing & AI */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Megaphone size={28} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">Digital Marketing & Ads</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  High-converting PPC ad campaigns on Meta & Google Ads paired with custom AI agents that automate customer lead qualification 24/7.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400" />
                    <span>Google Ads & Meta Advertising</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400" />
                    <span>Custom AI Support & Sales Bots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400" />
                    <span>Conversion Rate & Funnel Optimization</span>
                  </div>
                </div>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="inline-flex items-center space-x-2 text-indigo-400 font-bold text-sm hover:text-indigo-300 group-hover:translate-x-1 transition-transform"
                >
                  <span>Discover Digital Marketing</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* SECTION 2: Dedicated Social Media Video Reel Showcase */}
          <div className="mb-20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-pink-500/10 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Official Social Media Reel</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Experience Our Social Media & Brand Campaigns
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Watch how Syntrix Technologies crafts viral social content, high-conversion Instagram reels, and automated Meta ad funnels for our partners.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-3 py-1 rounded-lg">
                    Instagram & Facebook Ads
                  </span>
                  <span className="bg-slate-900 border border-slate-800 text-pink-400 px-3 py-1 rounded-lg">
                    High ROAS Content
                  </span>
                </div>
              </div>

              {/* Video Player Frame ("Mst View" with Real Audio Voice Control) */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl group-hover:border-cyan-400/60 transition-all duration-500">
                  <video
                    ref={socialVideoRef}
                    src="/social media.mp4"
                    autoPlay
                    loop
                    muted={isSocialMuted}
                    playsInline
                    controls
                    className="w-full h-[280px] sm:h-[380px] object-cover"
                  />
                  
                  {/* Floating Sound Control Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-xs font-bold text-white">Social Media Reel</span>
                    </div>

                    <button
                      onClick={toggleSocialAudio}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center space-x-1.5 shadow-xl border ${
                        !isSocialMuted
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/30 animate-pulse'
                          : 'bg-slate-950/90 text-cyan-400 border-cyan-500/40 hover:bg-slate-900 hover:scale-105'
                      }`}
                    >
                      {!isSocialMuted ? (
                        <>
                          <Volume2 size={16} />
                          <span>Real Voice Audio ON 🔊</span>
                        </>
                      ) : (
                        <>
                          <VolumeX size={16} />
                          <span>Click to Enable Real Voice 🔊</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Official Social Media & Content Channels Hub */}
          <div className="mb-24 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-pink-400 mb-4">
                <Globe size={14} />
                <span>Connect Across Platforms</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Syntrix Social Media & Content Hub
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Follow our official channels for daily tech insights, SEO tutorials, live AI builds, and growth marketing strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/pvn_shah05/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-pink-500/50 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Instagram</h4>
                  <p className="text-xs text-pink-400 font-semibold mb-3">@pvn_shah05</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Reels, UI design showcases, digital marketing tips, and behind-the-scenes agency updates.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300 flex items-center gap-1 group-hover:text-pink-400 transition-colors">
                  <span>Visit Instagram Profile</span>
                  <ArrowRight size={12} />
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/pavanshah07/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">LinkedIn</h4>
                  <p className="text-xs text-blue-400 font-semibold mb-3">Pavan Shah</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    B2B growth case studies, technical SEO breakdown articles, and agency leadership updates.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                  <span>Connect on LinkedIn</span>
                  <ArrowRight size={12} />
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-red-500/50 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                      <Video size={24} />
                    </div>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-red-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">YouTube Channel</h4>
                  <p className="text-xs text-red-400 font-semibold mb-3">Syntrix Tech</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Full video walkthroughs on React web development, custom AI agent builds, and technical SEO masterclasses.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300 flex items-center gap-1 group-hover:text-red-400 transition-colors">
                  <span>Subscribe on YouTube</span>
                  <ArrowRight size={12} />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/pavan.shah.733076"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-blue-600/50 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.814V8z" />
                      </svg>
                    </div>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Facebook Profile</h4>
                  <p className="text-xs text-blue-500 font-semibold mb-3">Pavan Shah</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Connect on Facebook for agency announcements, client testimonials, and digital marketing insights.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                  <span>Visit Facebook Profile</span>
                  <ArrowRight size={12} />
                </div>
              </a>
            </div>

            {/* Featured Side Video Player Card */}
            <div className="mt-10 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 relative z-10 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Syntrix Official Media & Social Campaign Video</span>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  HD 1080p Video
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl group-hover:border-cyan-500/40 transition-colors">
                <video
                  src="/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-56 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-extrabold bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-cyan-400">
                    Social Media & Digital Agency Showcase
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Founder Leadership Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-20 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shrink-0 shadow-2xl relative group">
              <img
                src="/pavan.jpg"
                alt="Pavan Shah - Founder & CEO of Syntrix Technologies"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Pavan.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold text-cyan-400">
                <ShieldCheck size={14} />
                <span>Founder & CEO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pavan Shah — Driving Innovation at Syntrix
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                "Our mission is to empower businesses with state-of-the-art web architectures, organic SEO authority, and custom AI agent automation that drive tangible business growth."
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={14} /> 500+ Global Projects Delivered
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <CheckCircle2 size={14} /> Mumbai, Maharashtra
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 4: Final Bottom Call to Action */}
          <div className="text-center max-w-3xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-10 sm:p-14 rounded-3xl shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Accelerate Your Digital Growth?
            </h3>
            <p className="text-slate-300 text-base mb-8">
              Explore our subscription pricing or get in touch directly to discuss your project requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing"
                onClick={(e) => handleLinkClick(e, '#pricing')}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
              >
                View Subscription Plans
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105"
              >
                Contact Our Team
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
