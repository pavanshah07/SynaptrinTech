import { useState, useRef, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2, Loader2, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Digital Marketing');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email,
            service,
            message,
          },
        ]);

      if (error) {
        setErrorMessage(error.message);
      } else {
        setIsSubmitted(true);
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setService('Digital Marketing');
        setMessage('');

        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit contact message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-sm font-bold text-cyan-400 tracking-widest uppercase mb-3">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
              Let's build something extraordinary together.
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
              Ready to transform your digital presence? Reach out to our team to discuss your project, request an audit, or learn more about our AI solutions.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl shadow-sm flex items-center justify-center text-cyan-400">
                  <Mail size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                  <p className="text-slate-400">shahpavan46@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl shadow-sm flex items-center justify-center text-cyan-400">
                  <Phone size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                  <p className="text-slate-400">+91 87994 23605</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl shadow-sm flex items-center justify-center text-cyan-400">
                  <MapPin size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                  <p className="text-slate-400">SynaptrinTech Pvt. Ltd.<br />Malad West, Mumbai, Maharashtra – 400064</p>
                </div>
              </div>
            </div>

            {/* Side Showcase Video Player Card */}
            <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SynaptrinTech Social & Media Showcase</span>
                </div>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      const nextMuted = !isAudioMuted;
                      videoRef.current.muted = nextMuted;
                      setIsAudioMuted(nextMuted);
                      if (!nextMuted) videoRef.current.play().catch(() => { });
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center space-x-1 border ${!isAudioMuted
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold animate-pulse'
                    : 'bg-slate-950 text-cyan-400 border-slate-800 hover:border-cyan-500/40'
                    }`}
                >
                  {!isAudioMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span>{!isAudioMuted ? 'Real Voice ON 🔊' : 'Enable Real Audio 🔊'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group-hover:border-cyan-500/40 transition-colors">
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  autoPlay
                  loop
                  muted={isAudioMuted}
                  playsInline
                  controls
                  className="w-full h-52 sm:h-60 object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-2xl border border-slate-800"
          >
            <h3 className="text-2xl font-extrabold text-white mb-2">Send a Message</h3>
            <p className="text-slate-400 text-sm mb-6">Fill in your details below to save your inquiry to our database.</p>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start gap-3">
                <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isSubmitted && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Thank you! Your message has been saved to our database. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service of Interest</label>
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm transition-all outline-none"
                >
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI Agent / Tool Deployment">AI Agent / Tool Deployment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving to Supabase...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
