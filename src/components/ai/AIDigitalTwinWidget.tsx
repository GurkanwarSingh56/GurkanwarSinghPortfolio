"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { queryDigitalTwinRAG, RAGResult } from "@/lib/ragEngine";
import { SAAS_PROJECTS } from "@/data/portfolioData";
import { playClickSound, playTerminalKeySound } from "@/lib/audio";
import {
  Bot,
  User,
  Send,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "twin";
  text: string;
  sources?: string[];
  confidence?: number;
  targetModuleId?: string;
  targetProjectId?: string;
  isStreaming?: boolean;
}

const PRESET_RAG_PROMPTS = [
  "What is Gurkanwar's primary tech stack?",
  "Tell me about the NovaAgent AI Studio project",
  "What are Gurkanwar's GitHub & LeetCode metrics?",
  "What is Gurkanwar's work history & background?",
  "How can I hire Gurkanwar for a Staff Engineer role?"
];

export function AIDigitalTwinWidget() {
  const { aiChatOpen, setAIChatOpen, soundEnabled, setSelectedProject } = useAppStore();

  const [inputVal, setInputVal] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "twin",
      text: "Hello! I am Gurkanwar Singh's official AI Digital Twin. I operate strictly under a Zero-Hallucination RAG architecture. Ask me anything about Gurkanwar's architecture expertise, SaaS projects, or telemetry stats.",
      sources: ["Portfolio Grounded Knowledge Base"],
      confidence: 100
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!aiChatOpen) return null;

  // Speak response using Web Speech API synthesis
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !voiceEnabled || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synth errors
    }
  };

  // Start speech recognition voice input
  const startVoiceInput = () => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);
      playClickSound(soundEnabled);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Handle RAG Query execution with character-by-character token typing stream
  const handleSendQuery = (textQuery?: string) => {
    const queryStr = (textQuery || inputVal).trim();
    if (!queryStr || isTyping) return;

    playClickSound(soundEnabled);
    const userMsg: Message = { id: `u-${Date.now()}`, sender: "user", text: queryStr };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Execute zero-hallucination RAG Retrieval
    const ragResult: RAGResult = queryDigitalTwinRAG(queryStr);

    // Create streaming placeholder twin message
    const twinMsgId = `twin-${Date.now()}`;
    const twinMsg: Message = {
      id: twinMsgId,
      sender: "twin",
      text: "",
      sources: ragResult.sources,
      confidence: ragResult.confidence,
      targetModuleId: ragResult.targetModuleId,
      targetProjectId: ragResult.targetProjectId,
      isStreaming: true
    };

    setMessages((prev) => [...prev, twinMsg]);

    // Simulate Character-by-Character Token Typing Stream
    let charIdx = 0;
    const fullText = ragResult.answer;

    const interval = setInterval(() => {
      charIdx += 2;
      const currentChunk = fullText.slice(0, charIdx);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === twinMsgId
            ? { ...m, text: currentChunk, isStreaming: charIdx < fullText.length }
            : m
        )
      );

      if (charIdx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        playTerminalKeySound(soundEnabled);
        speakText(fullText);

        // Auto-action: Trigger module scroll or project detail modal
        if (ragResult.targetProjectId) {
          const proj = SAAS_PROJECTS.find((p) => p.id === ragResult.targetProjectId);
          if (proj) setSelectedProject(proj);
        } else if (ragResult.targetModuleId) {
          const element = document.getElementById(ragResult.targetModuleId);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 25);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-zinc-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden glass-panel">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                Gurkanwar Singh AI Digital Twin
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  RAG Zero-Hallucination
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono">Grounded Knowledge Engine • Text &amp; Voice</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Output Toggle */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                voiceEnabled
                  ? "bg-indigo-950 border-indigo-500/50 text-indigo-300"
                  : "bg-zinc-800 border-white/10 text-zinc-500"
              }`}
              title={voiceEnabled ? "Voice Output: ON" : "Voice Output: OFF"}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setAIChatOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-zinc-950/60 border-b border-white/5 flex gap-2 overflow-x-auto">
          {PRESET_RAG_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(prompt)}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-cyan-300 text-[11px] font-mono border border-white/5 transition-all whitespace-nowrap shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 h-[360px] font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-zinc-800 text-cyan-300 border border-white/10 shadow-md"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`space-y-1.5 max-w-[82%] ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-zinc-950/80 text-zinc-200 border border-white/10 rounded-tl-none font-mono"
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />}
                </div>

                {/* Grounding Source & Confidence Tag */}
                {msg.sender === "twin" && msg.sources && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 px-1">
                    <span className="text-emerald-400 font-bold">Grounded ({msg.confidence}% Match)</span>
                    <span>•</span>
                    <span className="truncate">Source: {msg.sources.join(", ")}</span>
                    {msg.targetModuleId && (
                      <span className="text-cyan-400 flex items-center gap-0.5 ml-auto">
                        <span>Auto-Jumping Module</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Input Support */}
        <div className="p-4 bg-zinc-950 border-t border-white/10 flex items-center gap-2">
          
          {/* Mic Speech Recognition Trigger */}
          <button
            onClick={startVoiceInput}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? "bg-rose-950 border-rose-500 text-rose-400 animate-pulse"
                : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
            }`}
            title="Speak Question into Microphone"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
            placeholder={isListening ? "Listening..." : "Ask AI Digital Twin about Gurkanwar's code..."}
            className="flex-1 px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={isTyping || !inputVal.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold transition-all shadow-md flex items-center justify-center"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer Disclaimer */}
        <div className="p-2.5 bg-zinc-950/90 border-t border-white/5 text-center text-[10px] font-mono text-zinc-500">
          Zero-Hallucination Guardrail Active • Grounded strictly in Gurkanwar Singh&apos;s verified dataset
        </div>

      </div>

    </div>
  );
}
