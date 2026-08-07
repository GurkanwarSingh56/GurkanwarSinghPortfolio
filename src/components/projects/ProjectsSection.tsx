"use client";

import { useAppStore } from "@/store/useAppStore";
import { SAAS_PROJECTS, Project } from "@/data/portfolioData";
import { playClickSound } from "@/lib/audio";
import { GithubIcon } from "@/components/common/SocialIcons";
import { ExternalLink, Layers, ArrowUpRight, Sparkles } from "lucide-react";

const CATEGORIES = ["All", "AI & ML", "Distributed Systems", "Cloud & DevOps", "Fullstack SaaS"];

export function ProjectsSection() {
  const { activeCategory, setActiveCategory, setSelectedProject, soundEnabled } = useAppStore();

  const filteredProjects = activeCategory === "All"
    ? SAAS_PROJECTS
    : SAAS_PROJECTS.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    playClickSound(soundEnabled);
    setActiveCategory(cat);
  };

  const handleOpenDetail = (project: Project) => {
    playClickSound(soundEnabled);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Production Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-cyan">SaaS Applications</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Production-grade microservice platforms, AI multi-agent orchestration tools, real-time WebGL telemetries, and edge cloud tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400 font-bold"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl glass-panel glass-panel-hover p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-indigo-500/40"
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent blur-2xl rounded-tr-2xl pointer-events-none" />

              <div className="space-y-4">
                
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${project.badgeColor}`}>
                    {project.category}
                  </span>

                  <button
                    onClick={() => handleOpenDetail(project)}
                    className="flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <span>Architecture Deep-Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3
                    onClick={() => handleOpenDetail(project)}
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Highlights Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/5 text-center">
                      <div className="text-sm font-mono font-bold text-white">{m.value}</div>
                      <div className="text-[10px] text-zinc-400 truncate mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[11px] font-mono border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => handleOpenDetail(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound(soundEnabled)}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound(soundEnabled)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-md"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
