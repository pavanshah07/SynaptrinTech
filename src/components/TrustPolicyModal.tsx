import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrustPolicyModalProps {
  policyType: 'privacy' | 'terms' | 'editorial' | null;
  onClose: () => void;
}

export function TrustPolicyModal({ policyType, onClose }: TrustPolicyModalProps) {
  if (!policyType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative my-auto w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-100 z-10 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center shrink-0">
              {policyType === 'privacy' && <ShieldCheck size={26} />}
              {policyType === 'terms' && <FileText size={26} />}
              {policyType === 'editorial' && <CheckCircle2 size={26} />}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {policyType === 'privacy' && 'Privacy Policy'}
                {policyType === 'terms' && 'Terms of Service'}
                {policyType === 'editorial' && 'Editorial & E-E-A-T Policy'}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                SynaptrinTech Technologies • Last Updated: September 18, 2026
              </p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 text-sm leading-relaxed font-light">
            {policyType === 'privacy' && (
              <>
                <p>
                  At <strong>SynaptrinTech Technologies</strong>, led by Founder & CEO <strong>Pavan Shah</strong>, we prioritize the confidentiality and protection of your personal and business data.
                </p>
                
                <div>
                  <h3 className="text-white font-bold text-base mb-2">1. Information We Collect</h3>
                  <p>We collect essential information provided when you request consultations, sign up for subscription services, or contact our team via phone or email (e.g. name, email address, phone number, and project requirements).</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">2. How Data is Utilized</h3>
                  <p>Your information is used strictly to deliver web development, technical SEO audits, AI agent automation, customer support, and subscription billing management.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">3. Data Security & Cookies</h3>
                  <p>We implement SSL encryption, secure API integrations, and access controls. Cookies are utilized solely for essential user session handling and performance analytics.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">4. Your Data Rights</h3>
                  <p>You have the right to inspect, update, or request deletion of your personal data at any time by contacting our support desk at <a href="mailto:shahpavan46@gmail.com" className="text-cyan-400 underline">shahpavan46@gmail.com</a>.</p>
                </div>
              </>
            )}

            {policyType === 'terms' && (
              <>
                <p>
                  These Terms of Service govern your use of digital marketing, web development, SEO, and AI automation services provided by <strong>SynaptrinTech Technologies</strong>.
                </p>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">1. Scope of Service</h3>
                  <p>SynaptrinTech provides monthly and annual subscription plans covering technical SEO optimization, modern web architecture, Meta/Google ad funnel management, and custom AI support bots.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">2. Payment & Subscriptions</h3>
                  <p>Subscription fees are billed according to your selected plan. Payments are processed securely via encrypted gateways (Razorpay/Stripe).</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">3. Intellectual Property</h3>
                  <p>All custom web code, web designs, assets, and tailored AI agent prompts created for your business belong to you upon full project payment completion.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">4. Client Responsibilities</h3>
                  <p>Clients agree to provide accurate business assets, access tokens, and timely approvals necessary for SEO implementation and website development.</p>
                </div>
              </>
            )}

            {policyType === 'editorial' && (
              <>
                <p>
                  Our Editorial &amp; E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) Policy ensures all published benchmarks, technical SEO tutorials, and service representations adhere to strict quality standards.
                </p>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">1. Author Expertise & Leadership</h3>
                  <p>All technical strategy, web architecture benchmarks, and AI integration guidelines are curated and verified by <strong>Pavan Shah</strong>, Founder & CEO of SynaptrinTech Technologies.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">2. Fact-Checking & Accuracy</h3>
                  <p>We ground all technical SEO guidance in official documentation (e.g. Google Search Central, Web.dev, W3C standards). Information is regularly reviewed and updated to match the latest algorithms.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">3. Transparency & AI Ethics</h3>
                  <p>When AI assistance is utilized in custom workflows or content generation, every output undergoes mandatory human review and verification by our engineering leads.</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-2">4. Direct Contact & Verification</h3>
                  <p>For inquiries regarding our editorial guidelines or technical publications, contact Founder Pavan Shah directly at <a href="mailto:shahpavan46@gmail.com" className="text-cyan-400 underline">shahpavan46@gmail.com</a>.</p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
