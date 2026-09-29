import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ProfileInfo } from '../types/portfolio';
import { PortfolioStore } from '../lib/storage';

interface ContactProps {
  profile: ProfileInfo;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // spam prevention bot trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim()) return 'Please enter your email.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return 'Please enter a valid email address.';
    if (!formData.message.trim()) return 'Please enter your message.';
    if (formData.message.trim().length < 10) return 'Message should be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Bot detected, silently succeed
      setStatus('success');
      return;
    }

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await PortfolioStore.sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setErrorMessage(res.message || 'Failed to send message.');
        setStatus('error');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please reach out via email directly.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            07. Initiate Contact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Let's Discuss Engineering Opportunities
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Open for full-time engineering roles, institutional software contracts, or technical consultations.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Direct Details & Channels */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white">
                Contact Channels
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Direct Email</span>
                    <span className="font-mono text-xs sm:text-sm text-slate-200 group-hover:text-blue-300">
                      {profile.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Telephone</span>
                    <span className="font-mono text-xs sm:text-sm text-slate-200 group-hover:text-cyan-300">
                      {profile.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Location</span>
                    <span className="text-slate-200 text-sm">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                  Professional Profiles:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    title="GitHub: liban770"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
            >
              <h3 className="text-base font-bold text-white mb-2">
                Send an Inbound Message
              </h3>

              {/* Bot Honeypot (hidden from real users) */}
              <input
                type="text"
                name="user_verification_field"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300">
                  Subject / Opportunity
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software Engineer Role / Project Architecture Discussion"
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                  Message Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your technical requirements, team needs, or questions..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'error' && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Your message has been dispatched successfully. Ahmed will reply shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inbound Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
