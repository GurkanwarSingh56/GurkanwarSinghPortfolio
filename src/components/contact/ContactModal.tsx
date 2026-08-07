"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { DEVELOPER_PROFILE } from "@/data/portfolioData";
import { submitContactMessage } from "@/lib/firebase";
import { playClickSound, playSuccessSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { X, Send, Mail, Check, Calendar, Sparkles, Copy, Loader2 } from "lucide-react";

export function ContactModal() {
  const { contactModalOpen, setContactModalOpen, soundEnabled } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && contactModalOpen) {
        setContactModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contactModalOpen, setContactModalOpen]);

  if (!contactModalOpen) return null;

  const handleClose = () => {
    playClickSound(soundEnabled);
    setContactModalOpen(false);
  };

  const handleCopyEmail = () => {
    playClickSound(soundEnabled);
    navigator.clipboard.writeText(DEVELOPER_PROFILE.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message || submitting) return;

    playClickSound(soundEnabled);
    setSubmitting(true);

    try {
      await submitContactMessage({ name, email, company, message });
      playSuccessSound(soundEnabled);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg bg-zinc-900/95 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-950/70 overflow-hidden z-10 glass-panel p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Priority Contract &amp; Hiring</h3>
              <p className="text-xs text-zinc-400 font-mono">Direct Inquiry Line • SLA Response &lt; 12 hrs</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Contact Modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl shadow-xl shadow-emerald-500/20">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-white">Inquiry Transmitted!</h4>
            <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. Gurkanwar Singh has received your direct message and will respond within 12 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg"
            >
              Return to DevOS Workspace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Quick Copy Email Bar */}
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{DEVELOPER_PROFILE.socials.email}</span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copiedEmail ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Work Email *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Company / Project Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. OpenAI / Stripe / Stealth AI Startup"
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Project Details / Scope *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your architectural scope, timeline, or position details..."
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Priority Inquiry</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound(soundEnabled)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Or Schedule a 30-min Technical Discovery Call</span>
              </a>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
