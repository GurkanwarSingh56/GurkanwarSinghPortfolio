"use client";

import { useState, useEffect } from "react";
import { GuestbookEntry, submitGuestbookEntry, subscribeToGuestbook, isFirebaseConnected } from "@/lib/firebase";
import { playClickSound, playSuccessSound } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import confetti from "canvas-confetti";
import { MessageSquare, Send, Sparkles, User, ShieldCheck, Flame, Radio } from "lucide-react";

const REACTION_BADGES = ["🚀", "🔥", "⚡", "💎", "🧠"];

export function GuestbookSection() {
  const { soundEnabled } = useAppStore();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [reaction, setReaction] = useState("🚀");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseActive, setFirebaseActive] = useState(false);

  useEffect(() => {
    setFirebaseActive(isFirebaseConnected());
    const unsubscribe = subscribeToGuestbook((liveEntries) => {
      setEntries(liveEntries);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    playClickSound(soundEnabled);
    setIsSubmitting(true);

    try {
      const created = await submitGuestbookEntry({ name, role, message, reaction });
      playSuccessSound(soundEnabled);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });

      setEntries((prev) => [created, ...prev.filter((e) => e.id !== created.id)]);
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-20 md:py-28 relative overflow-hidden bg-zinc-950/90">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/10 via-cyan-500/10 to-violet-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>REAL-TIME FIREBASE GUESTBOOK STREAM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Public Visitor <span className="text-gradient-cyan">Guestbook</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
              firebaseActive
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-400"
                : "bg-indigo-950/80 border-indigo-500/40 text-indigo-300"
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{firebaseActive ? "Firebase Firestore Live Connected" : "DevOS Synchronized Database"}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 font-bold border-b border-white/10 pb-3">
                <MessageSquare className="w-4 h-4" />
                <span>Leave a Visitor Signature</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Your Role / Company</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Staff Engineer @ Vercel"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Select Reaction Badge</label>
                  <div className="flex gap-2">
                    {REACTION_BADGES.map((badge) => (
                      <button
                        type="button"
                        key={badge}
                        onClick={() => setReaction(badge)}
                        className={`p-2 rounded-xl text-base border transition-transform ${
                          reaction === badge
                            ? "bg-cyan-950 border-cyan-400 scale-110 shadow-md shadow-cyan-500/30"
                            : "bg-zinc-950 border-white/5 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Message / Architecture Feedback</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share feedback on the 3D canvas, JARVIS control plane, or code..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold transition-transform active:scale-98 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting..." : "Sign Guestbook Stream"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Live Stream Feed (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-sm font-mono text-zinc-200 font-bold">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Live Feedback Stream ({entries.length})</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Sync Active
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs max-h-[420px] overflow-y-auto pr-1">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-xs">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-100">{entry.name}</div>
                          <div className="text-[10px] text-zinc-500">{entry.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{entry.reaction}</span>
                        <span className="text-[10px] text-zinc-500">{entry.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-zinc-300 font-sans text-xs leading-relaxed pt-1">
                      &quot;{entry.message}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
