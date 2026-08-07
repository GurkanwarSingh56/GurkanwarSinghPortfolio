"use client";

import { useState, useEffect } from "react";
import { fetchGuestbookEntries, submitGuestbookEntry, GuestbookEntry } from "@/lib/firebase";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound, playSuccessSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { MessageSquare, Send, Sparkles, User, ThumbsUp, Loader2 } from "lucide-react";

const REACTIONS = ["🚀", "🔥", "⚡", "💎", "🧠"];

export function GuestbookSection() {
  const { soundEnabled } = useAppStore();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [reaction, setReaction] = useState("🚀");

  useEffect(() => {
    fetchGuestbookEntries().then((res) => {
      setEntries(res);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    playClickSound(soundEnabled);
    setSubmitting(true);

    try {
      const newEntry = await submitGuestbookEntry({
        name: name.trim() || "Anonymous Engineer",
        role: role.trim() || "Software Developer",
        message: message.trim(),
        reaction
      });

      playSuccessSound(soundEnabled);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      setEntries((prev) => [newEntry, ...prev]);

      setName("");
      setRole("");
      setMessage("");
    } catch {
      // Silent catch
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Firebase Firestore Realtime Sync</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="text-gradient-cyan">Guestbook</span> &amp; Feedback
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Leave a message, feedback on the 3D architecture visualizer, or technical reaction. Synced live across visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Sign the Guestbook</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Role / Company</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Lead Architect @ Vercel"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Message / Reaction *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts on the DevOS portfolio aesthetic..."
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Reaction Pickers */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Choose Reaction Badge</label>
                <div className="flex items-center gap-2">
                  {REACTIONS.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setReaction(r);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
                        reaction === r
                          ? "bg-indigo-600 text-white scale-110 border border-indigo-400 shadow-md"
                          : "bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-zinc-800"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Guestbook Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Live Guestbook Stream */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-2">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <span>Live Feedback Stream ({entries.length})</span>
              </span>
              <span className="text-xs font-mono text-zinc-500">Firebase Firestore</span>
            </h3>

            {loading ? (
              <div className="p-8 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Fetching real-time messages...</span>
              </div>
            ) : entries.length === 0 ? (
              <div className="p-8 rounded-2xl glass-panel text-center text-zinc-500 font-mono text-xs">
                No messages yet. Be the first to sign the guestbook!
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold shrink-0">
                        {entry.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                          <span>{entry.name}</span>
                          <span className="text-base">{entry.reaction}</span>
                        </div>
                        <div className="text-xs font-mono text-indigo-400">{entry.role}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">{entry.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal pl-11">
                    {entry.message}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
