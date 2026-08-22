"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { DEVELOPER_PROFILE } from "@/data/portfolioData";
import { submitContactMessage } from "@/lib/firebase";
import { playClickSound, playSuccessSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { X, Send, Rocket, Radio, Cpu, Orbit, Terminal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactModal() {
  const { contactModalOpen, setContactModalOpen, soundEnabled } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const formMountTime = useRef(0);

  useEffect(() => {
    if (contactModalOpen) {
      formMountTime.current = Date.now();
    }
  }, [contactModalOpen]);

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
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setHoneypot("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message || submitting) return;
    
    // Spam Protection
    if (honeypot.trim() !== "") {
      // Honeypot caught a bot. Silently fail or pretend to succeed.
      console.warn("Spam detected via honeypot.");
      setSubmitted(true);
      return;
    }
    
    const timeToSubmit = Date.now() - formMountTime.current;
    if (timeToSubmit < 3000) {
      // Filled too fast, likely a bot.
      console.warn("Spam detected via rapid submission.");
      setSubmitted(true);
      return;
    }

    playClickSound(soundEnabled);
    setSubmitting(true);

    try {
      await submitContactMessage({ name, email, company, message });
      playSuccessSound(soundEnabled);
      // Confetti styled like stars
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#e0e7ff', '#c084fc']
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />
      
      {/* Grid background overlay for the modal area */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Modal Card Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-zinc-950 border-2 border-indigo-500/40 rounded-xl shadow-[0_0_50px_-12px_rgba(79,70,229,0.5)] overflow-hidden z-10 p-6 sm:p-8 space-y-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/10 before:to-transparent before:pointer-events-none"
      >
        
        {/* Radar Scanner Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-pulse opacity-50" />
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-400/30 text-cyan-400 relative overflow-hidden group">
              <Orbit className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-wider font-mono">MISSION TRANSMISSION</h3>
              <p className="text-xs text-indigo-300/70 font-mono tracking-widest uppercase mt-0.5">Secure Comms Channel • {DEVELOPER_PROFILE.socials.email}</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Abort Transmission"
            className="p-2 rounded-lg text-indigo-400 hover:text-cyan-300 hover:bg-indigo-900/30 border border-transparent hover:border-indigo-500/30 transition-all font-mono text-xs flex items-center gap-2"
          >
            <span className="hidden sm:inline uppercase">Abort</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-12 text-center space-y-6 relative z-10"
              aria-live="polite"
            >
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* Launch Pad Circles */}
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
                />
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                  className="absolute inset-4 rounded-full border-2 border-indigo-500/40"
                />
                
                {/* Rocket SVG Animation */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: -100, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  className="relative z-10"
                >
                  <Rocket className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  
                  {/* Rocket Flame */}
                  <motion.div 
                    animate={{ height: ["20px", "40px", "20px"], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-orange-400 to-red-600 rounded-b-full blur-[2px]"
                  />
                </motion.div>
              </div>

              <div className="space-y-2 mt-8">
                <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono tracking-widest uppercase">Payload Delivered</h4>
                <p className="text-sm text-indigo-200/80 max-w-md mx-auto leading-relaxed font-mono">
                  Your coordinates have been logged. The transmission is travelling at lightspeed and will be intercepted shortly.
                </p>
              </div>
              
              <button
                onClick={handleClose}
                className="mt-6 px-8 py-3 rounded-lg bg-indigo-950 border border-indigo-500/50 hover:bg-indigo-900 text-cyan-400 font-mono text-sm tracking-widest transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] uppercase"
              >
                Return to Base
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-5 relative z-10"
            >
              
              {/* Spam Protection - Honeypot Field */}
              <div className="absolute overflow-hidden w-0 h-0 opacity-0 -z-10" aria-hidden="true">
                <label htmlFor="bot-field">Do not fill this out</label>
                <input
                  type="text"
                  id="bot-field"
                  name="bot-field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="space-y-1.5"
                >
                  <label className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
                    <Terminal className="w-3.5 h-3.5" />
                    Commander Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter designation..."
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-indigo-500/30 rounded-lg text-sm font-mono text-indigo-100 placeholder-indigo-500/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                  />
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
                    <Radio className="w-3.5 h-3.5" />
                    Comm Frequency (Email) *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="signal@domain.com"
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-indigo-500/30 rounded-lg text-sm font-mono text-indigo-100 placeholder-indigo-500/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                  />
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="space-y-1.5"
              >
                <label className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
                  <Orbit className="w-3.5 h-3.5" />
                  Galactic Sector (Company)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Where are you broadcasting from?"
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-indigo-500/30 rounded-lg text-sm font-mono text-indigo-100 placeholder-indigo-500/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                />
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                className="space-y-1.5 group"
              >
                <label className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
                  <Cpu className="w-3.5 h-3.5" />
                  Encrypted Payload (Message) *
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Input transmission data here..."
                    className="w-full px-4 py-3 bg-zinc-950/50 border border-indigo-500/30 rounded-lg text-sm font-mono text-indigo-100 placeholder-indigo-500/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner resize-none"
                  />
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-900 to-cyan-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-mono text-sm tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden uppercase font-bold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                      <span>Initiating Launch Sequence...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      <span>Transmit Payload</span>
                    </>
                  )}
                </button>
              </motion.div>

            </motion.form>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
