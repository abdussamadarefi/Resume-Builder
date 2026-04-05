import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TemplateId, FontPairId } from "@/types";

interface SettingsState {
  templateId: TemplateId;
  accentColor: string;
  fontPair: FontPairId;
  fontSize: number;
  lineHeight: number;
  margin: number;
  pageSize: "a4" | "letter";
  zoom: number;
  
  setTemplate: (id: TemplateId) => void;
  setAccentColor: (color: string) => void;
  setFontPair: (id: FontPairId) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setMargin: (margin: number) => void;
  setPageSize: (size: "a4" | "letter") => void;
  setZoom: (zoom: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      templateId: "nexus",
      accentColor: "#3b82f6",
      fontPair: "outfit-inter",
      fontSize: 14,
      lineHeight: 1.5,
      margin: 40,
      pageSize: "a4",
      zoom: 0.75,

      setTemplate: (templateId) => set({ templateId }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setFontPair: (fontPair) => set({ fontPair }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setMargin: (margin) => set({ margin }),
      setPageSize: (pageSize) => set({ pageSize }),
      setZoom: (zoom) => set({ zoom }),
    }),
    {
      name: "rf-settings",
    }
  )
);
