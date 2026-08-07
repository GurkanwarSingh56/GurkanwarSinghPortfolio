import { create } from "zustand";
import { Project } from "@/data/portfolioData";

interface AppState {
  // Command Palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Sound Engine
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSoundEnabled: () => void;

  // Modals & Drawers
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
  toggleContactModal: () => void;

  // Terminal & AI Assistant
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  aiChatOpen: boolean;
  setAIChatOpen: (open: boolean) => void;
  toggleAIChat: () => void;

  // Filters
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Command Palette
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  // Sound Engine (Default enabled for tactile experience)
  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  toggleSoundEnabled: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Modals & Drawers
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  contactModalOpen: false,
  setContactModalOpen: (open) => set({ contactModalOpen: open }),
  toggleContactModal: () => set((state) => ({ contactModalOpen: !state.contactModalOpen })),

  // Terminal & AI Assistant
  terminalOpen: false,
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  aiChatOpen: false,
  setAIChatOpen: (open) => set({ aiChatOpen: open }),
  toggleAIChat: () => set((state) => ({ aiChatOpen: !state.aiChatOpen })),

  // Filters
  activeCategory: "All",
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
