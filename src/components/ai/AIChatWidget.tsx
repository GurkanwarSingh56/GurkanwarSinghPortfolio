"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import { Sparkles, X, Send, Bot, User, CornerDownLeft } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const PRESET_PROMPTS = [
  "What is Gurkanwar's primary tech stack?",
  "What projects has Gurkanwar worked on?",
  "Is Gurkanwar available for roles?",
  "Explain Gurkanwar's architecture philosophy"
];

export function AIChatWidget() {
  const { aiChatOpen, setAIChatOpen, soundEnabled, toggleContactModal } = useAppStore();
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "ai-1",
      sender: "ai",
      text: "Hello! I am DevOS AI Assistant. Ask me anything about Gurkanwar Singh's skills, projects, or background."
    }
  ]);

  if (!aiChatOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    playClickSound(soundEnabled);
    const userMsg: Message = { id: `u-${Date.now()}`, sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI LLM inference stream delay
    setTimeout(() => {
      let aiReply = "Gurkanwar Singh is a Computer Science Student and Full-Stack Developer focusing on modern web architectures.";

      const qLower = query.toLowerCase();
      if (qLower.includes("stack") || qLower.includes("skills") || qLower.includes("tech")) {
        aiReply = "Gurkanwar's primary stack includes Next.js, React, TypeScript, Tailwind CSS, Node.js, and practical web technologies.";
      } else if (qLower.includes("project") || qLower.includes("work")) {
        aiReply = "Yes! Gurkanwar has built projects like the Technovate Website, Learning Curve Academy, TravelFlow, and an ERP System.";
      } else if (qLower.includes("available") || qLower.includes("contract") || qLower.includes("role") || qLower.includes("hire")) {
        aiReply = "Gurkanwar is open to full-stack development opportunities and technical roles. Click below to contact him directly!";
      } else if (qLower.includes("architecture") || qLower.includes("philosophy")) {
        aiReply = "His architecture philosophy centers on building practical, fast, and accessible web applications using modern best practices.";
      }

      setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, sender: "ai", text: aiReply }]);
      setIsTyping(false);
      playTerminalKeySound(soundEnabled);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="w-full max-w-xl bg-zinc-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-indigo-950/50 flex flex-col overflow-hidden glass-panel">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-500/40 text-cyan-300">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                DevOS AI Assistant
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  Gemini API
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Ask about Gurkanwar&apos;s architectural capabilities</p>
            </div>
          </div>

          <button
            onClick={() => setAIChatOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-zinc-950/60 border-b border-white/5 flex flex-wrap gap-2 overflow-x-auto">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-cyan-300 text-[11px] font-mono border border-white/5 transition-all text-left truncate max-w-[240px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 h-[340px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-800 text-cyan-300 border border-white/10"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-zinc-950/80 text-zinc-200 border border-white/10 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Generating LLM inference response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-zinc-950 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI assistant about Gurkanwar's code..."
            className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !inputVal.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Hire Quick Action Bar */}
        <div className="p-2.5 bg-zinc-950/90 border-t border-white/5 flex items-center justify-between px-4 text-[11px] font-mono text-zinc-400">
          <span>Ready to discuss a project?</span>
          <button
            onClick={() => {
              setAIChatOpen(false);
              toggleContactModal();
            }}
            className="text-cyan-400 hover:underline font-bold flex items-center gap-1"
          >
            <span>Open Priority Hire Form</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}
