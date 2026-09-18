import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate?: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (href: string) => {
    window.history.pushState(null, '', href);
    if (onNavigate) {
      onNavigate(href);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }} className="flex items-center group mb-4 inline-flex">
              <img 
                src="/Synaptrintech.png" 
                alt="SynaptrinTech Logo" 
                width="180"
                height="56"
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain max-h-[56px] transform group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              SynaptrinTech Pvt. Ltd. — Architecting the future of digital presence through intelligent marketing, robust web development, and AI integration.
            </p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Malad West, Mumbai, Maharashtra – 400064</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+918799423605" className="hover:text-blue-400 transition-colors">+91 87994 23605</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:shahpavan46@gmail.com" className="hover:text-blue-400 transition-colors">shahpavan46@gmail.com</a>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h5 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }} className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('#about'); }} className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('#services'); }} className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); handleLinkClick('#pricing'); }} className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }} className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Services Links */}
          <div>
            <h5 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Services</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('#services'); }} className="hover:text-cyan-400 transition-colors">Digital Marketing</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('#services'); }} className="hover:text-cyan-400 transition-colors">SEO Optimization</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('#services'); }} className="hover:text-cyan-400 transition-colors">Web Development</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleLinkClick('#services'); }} className="hover:text-cyan-400 transition-colors">AI Agents & Automation</a></li>
            </ul>
          </div>
          
          {/* Legal Links & E-E-A-T Trust Policies */}
          <div>
            <h5 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Legal & Trust Policies</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#privacy-policy" onClick={(e) => { e.preventDefault(); handleLinkClick('#privacy-policy'); }} className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms-of-service" onClick={(e) => { e.preventDefault(); handleLinkClick('#terms-of-service'); }} className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#editorial-policy" onClick={(e) => { e.preventDefault(); handleLinkClick('#editorial-policy'); }} className="hover:text-cyan-400 transition-colors">Editorial Policy</a></li>
              <li>
                <a
                  href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Google SEO Guide
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/search/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Google Search Central
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 border-t border-slate-800/60 mt-6">
          <div className="space-y-1 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} SynaptrinTech Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Curated &amp; Managed by <strong className="text-slate-300">Pavan Shah</strong> (Founder &amp; CEO, Technical SEO &amp; AI Specialist). Published: July 31, 2026 | Last Updated: September 18, 2026.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Social Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400 font-semibold mr-1">Share:</span>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://synaptrintech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://synaptrintech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                title="Share on Facebook"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 transition-all"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://synaptrintech.vercel.app/&text=Check%20out%20SynaptrinTech%20Technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                title="Share on X"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* Social Profile Links */}
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/in/pavanshah07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/pvn_shah05/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Back to top button */}
            <button 
              onClick={() => handleLinkClick('#home')} 
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center space-x-1"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

