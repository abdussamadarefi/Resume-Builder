import { create } from "zustand";
import { SectionKey } from "@/types";

interface UIState {
  activeSection: SectionKey;
  isPreviewMode: boolean;
  isSidebarOpen: boolean;

  setActiveSection: (section: SectionKey) => void;
  togglePreviewMode: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: "personal",
  isPreviewMode: false,
  isSidebarOpen: true,

  setActiveSection: (activeSection) => set({ activeSection }),
  togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));
