"use client";

import { WORK_EXPERIENCES } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Track Record of Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Career &amp; <span className="text-gradient-emerald">Impact Timeline</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Proven trajectory leading engineering teams, shipping resilient cloud architectures, and driving quantifiable metrics.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 md:ml-12 space-y-12">
          {WORK_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Glowing Timeline Node Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-950 border-2 border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-4">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-indigo-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Measurable Key Metrics Grid */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Quantifiable Business Impact</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.keyMetrics.map((metric, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-200 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements List */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Key Deliverables &amp; Achievements</div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-mono border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
