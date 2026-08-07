"use client";

import { DEVELOPER_PROFILE } from "@/data/portfolioData";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound } from "@/lib/audio";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/SocialIcons";
import { Mail, FileText, ShieldCheck, ArrowUp } from "lucide-react";

export function Footer() {
  const { soundEnabled } = useAppStore();

  const scrollToTop = () => {
    playClickSound(soundEnabled);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-base text-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>{DEVELOPER_PROFILE.name}</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              {DEVELOPER_PROFILE.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={DEVELOPER_PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound(soundEnabled)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={DEVELOPER_PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound(soundEnabled)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 border border-white/10 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={DEVELOPER_PROFILE.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound(soundEnabled)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 border border-white/10 transition-colors"
              aria-label="Twitter Profile"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${DEVELOPER_PROFILE.socials.email}`}
              onClick={() => playClickSound(soundEnabled)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-white/10 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={DEVELOPER_PROFILE.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound(soundEnabled)}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-violet-400 border border-white/10 transition-colors"
              aria-label="Download Resume PDF"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Footer Meta Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>WCAG AA Accessible • Mobile First • Apple &amp; Linear Aesthetic</span>
          </div>

          <div>
            © {new Date().getFullYear()} Gurkanwar Singh. Built with Next.js 15, React 19 &amp; Three.js.
          </div>
        </div>

      </div>
    </footer>
  );
}
