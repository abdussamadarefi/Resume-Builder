"use client"

import { useSettingsStore } from "@/store/settingsStore"
import { useResumeStore } from "@/store/resumeStore"
import { Label } from "@/components/ui/Label"
import { Layout, Type, Palette, Eye, EyeOff } from "lucide-react"
import { SectionKey } from "@/types"

const colors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Gold", value: "#DEB887" },
  { name: "Slate", value: "#475569" },
  { name: "Rose", value: "#E11D48" },
  { name: "Emerald", value: "#10B981" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Amber", value: "#F59E0B" },
]

const templates = [
  { id: "nexus", name: "Nexus", desc: "Premium Dual Column" },
  { id: "meridian", name: "Meridian", desc: "Classic Serif" },
  { id: "atlas", name: "Atlas", desc: "Modern Sidebar" },
  { id: "prism", name: "Prism", desc: "Bold Accents" },
  { id: "scholar", name: "Scholar", desc: "Academic Single-Column" },
  { id: "compact", name: "Compact", desc: "Space Efficient" },
  { id: "cascade", name: "Cascade", desc: "Timeline Clean" },
  { id: "minimo", name: "Minimo", desc: "Ultra Minimalist" },
  { id: "arya", name: "Arya", desc: "Bold Color Sidebar" },
  { id: "executive", name: "Executive", desc: "Corporate Premium" },
]

const SECTION_LABELS: Record<string, string> = {
  personal: "Personal Info",
  summary: "Profile Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  publications: "Publications",
  grants: "Grants & Funding",
  teaching: "Teaching",
  references: "References",
  custom: "Custom Section",
}

export function SettingsForm() {
  const { 
    templateId, setTemplate, 
    accentColor, setAccentColor,
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    margin, setMargin
  } = useSettingsStore()

  const activeData = useResumeStore((state) => state.getActiveData())
  const setSectionVisibility = useResumeStore((state) => state.setSectionVisibility)
  const visibility = activeData.sectionVisibility

  const toggleSection = (key: string) => {
    setSectionVisibility(key as SectionKey, !visibility[key])
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Layout className="text-primary" size={24} />
          Choose Layout
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id as any)}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                templateId === t.id 
                  ? "border-primary bg-primary/10" 
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
            >
              <h4 className="font-bold text-white mb-1">{t.name}</h4>
              <p className="text-xs text-slate-500">{t.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Palette className="text-primary" size={24} />
          Accent Color
        </h3>
        <div className="flex flex-wrap gap-4">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setAccentColor(c.value)}
              className={`w-12 h-12 rounded-full border-4 transition-all ${
                accentColor === c.value ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
          <div className="relative">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-4 border-transparent opacity-60 hover:opacity-100"
              title="Custom color"
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Type className="text-primary" size={24} />
          Typography & Spacing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="space-y-4">
            <Label className="text-slate-400">Font Size ({fontSize}px)</Label>
            <input 
              type="range" min="10" max="20" step="1"
              value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-slate-400">Line Height ({lineHeight})</Label>
            <input 
              type="range" min="1" max="2" step="0.1"
              value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-slate-400">Document Margin ({margin}px)</Label>
            <input 
              type="range" min="20" max="80" step="5"
              value={margin} onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Eye className="text-primary" size={24} />
          Section Visibility
        </h3>
        <p className="text-sm text-slate-500 mb-6">Toggle sections to show or hide them on your resume preview and export.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(SECTION_LABELS).map(([key, label]) => {
            const isVisible = visibility?.[key] !== false
            return (
              <button
                key={key}
                onClick={() => toggleSection(key)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                  isVisible
                    ? "border-primary/30 bg-primary/5 text-white"
                    : "border-slate-800 bg-slate-900/30 text-slate-500"
                }`}
              >
                <span className="text-sm font-medium">{label}</span>
                {isVisible
                  ? <Eye size={16} className="text-primary flex-shrink-0" />
                  : <EyeOff size={16} className="text-slate-600 flex-shrink-0" />
                }
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
