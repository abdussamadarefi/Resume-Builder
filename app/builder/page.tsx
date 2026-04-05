"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useCallback, useState } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { useUIStore } from "@/store/uiStore"
import { SectionNav } from "@/components/builder/SectionNav"
import { PersonalInfoForm } from "@/components/builder/PersonalInfoForm"
import { SummaryForm } from "@/components/builder/SummaryForm"
import { ExperienceForm } from "@/components/builder/ExperienceForm"
import { EducationForm } from "@/components/builder/EducationForm"
import { SkillsForm } from "@/components/builder/SkillsForm"
import { PublicationsForm, GrantsForm, TeachingForm } from "@/components/builder/AcademicForms"
import { ProjectsForm } from "@/components/builder/ProjectsForm"
import { CertificationsForm } from "@/components/builder/CertificationsForm"
import { LanguagesForm } from "@/components/builder/LanguagesForm"
import { ReferencesForm } from "@/components/builder/ReferencesForm"
import { CustomForm } from "@/components/builder/CustomForm"
import { SettingsForm } from "@/components/builder/SettingsForm"
import { DataManagement } from "@/components/builder/DataManagement"
import { Preview } from "@/components/builder/Preview"
import { useSettingsStore } from "@/store/settingsStore"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/Button"
import { Download, FileText, Menu, X, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
import { PDFRenderer } from "@/components/export/PDFRenderer"

function BuilderContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") as "resume" | "cv" | null
  const createNewResume = useResumeStore((state) => state.createNewResume)
  const activeSection = useUIStore((state) => state.activeSection)
  const { accentColor, setAccentColor, zoom, setZoom, templateId, setTemplate } = useSettingsStore()
  const settingsState = useSettingsStore()
  const resumeData = useResumeStore((state) => state.getActiveData())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false)

  useEffect(() => {
    if (type) {
      // Logic to initialize if needed
    }
  }, [type])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-white">Builder</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMobilePreviewOpen(true)}>
            <Eye className="text-slate-200" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="text-slate-200" />
          </Button>
        </div>
      </div>

      {/* Mobile Preview Overlay */}
      <AnimatePresence>
        {isMobilePreviewOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:hidden overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">Preview</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobilePreviewOpen(false)}>
                  <X className="text-slate-200" />
                </Button>
              </div>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg flex-1">
                  <span className="text-xs text-slate-500 w-10">{Math.round(zoom * 100)}%</span>
                  <input 
                    type="range" 
                    min="0.3" 
                    max="1.5" 
                    step="0.05" 
                    value={zoom} 
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-8 h-8 rounded-full overflow-hidden border-none bg-transparent cursor-pointer flex-shrink-0"
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-900/30 relative">
              <div className="absolute inset-0 overflow-auto scrollbar-hide py-4 px-2">
                <Preview />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:hidden overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950">
              <h2 className="text-xl font-heading font-bold text-white">Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="text-slate-200" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 pb-24">
              <SectionNav onNavClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-heading font-bold text-white mb-8">Builder</h2>
          <SectionNav />
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 max-w-3xl mx-auto p-6 md:p-12 overflow-y-auto">
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white capitalize mb-2">
              {activeSection}
            </h1>
            <p className="text-slate-400">
              Fill in the details for your professional profile.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <PDFDownloadLink
              document={<PDFRenderer 
                data={resumeData} 
                settings={{ templateId, accentColor, fontSize: settingsState.fontSize, lineHeight: settingsState.lineHeight, margin: settingsState.margin }} 
              />}
              fileName={`${resumeData.personal.firstName || "Resume"}.pdf`}
            >
              {({ loading }: any) => (
                <Button disabled={loading} className="gap-2">
                  <Download size={18} />
                  {loading ? "Preparing..." : "PDF"}
                </Button>
              )}
            </PDFDownloadLink>
            <Button
              variant="outline"
              className="gap-2 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={async () => {
                const { generateDOCX } = await import("@/components/export/DOCXExporter")
                await generateDOCX(resumeData, accentColor)
              }}
            >
              <FileText size={18} />
              DOCX
            </Button>
          </div>
        </div>

        <div className="space-y-12 pb-24">
          {activeSection === "personal" && <PersonalInfoForm />}
          {activeSection === "summary" && <SummaryForm />}
          {activeSection === "experience" && <ExperienceForm />}
          {activeSection === "education" && <EducationForm />}
          {activeSection === "skills" && <SkillsForm />}
          {activeSection === "projects" && <ProjectsForm />}
          {activeSection === "certifications" && <CertificationsForm />}
          {activeSection === "languages" && <LanguagesForm />}
          {activeSection === "publications" && <PublicationsForm />}
          {activeSection === "grants" && <GrantsForm />}
          {activeSection === "teaching" && <TeachingForm />}
          {activeSection === "references" && <ReferencesForm />}
          {activeSection === "custom" && <CustomForm />}
          {activeSection === "settings" && <SettingsForm />}
          {activeSection === "data" && <DataManagement />}
          {/* Fallback for sections not yet implemented */}
          {!["personal", "summary", "experience", "education", "skills", "projects", "certifications", "languages", "publications", "grants", "teaching", "references", "custom", "settings", "data"].includes(activeSection) && (
            <div className="p-12 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500">
              <p>Section &quot;{activeSection}&quot; is coming soon.</p>
            </div>
          )}
        </div>
      </main>

      {/* Preview Mini-Panel (Sticky) */}
      <aside className="w-[500px] border-l border-slate-800 bg-slate-900/30 hidden lg:block sticky top-0 h-screen overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 text-[10px]">Live Preview</h2>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 bg-slate-800/50 px-2 py-1 rounded-lg">
                <span className="text-[10px] text-slate-500">{Math.round(zoom * 100)}%</span>
                <input 
                  type="range" 
                  min="0.4" 
                  max="1.2" 
                  step="0.05" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <input 
                type="color" 
                value={accentColor} 
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-6 h-6 rounded-full overflow-hidden border-none bg-transparent cursor-pointer"
              />
              {type && <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-bold uppercase text-[10px] tracking-tight">{type}</span>}
            </div>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 relative">
            <div className="absolute inset-0 overflow-auto scrollbar-hide">
              <Preview />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        Loading builder...
      </div>
    }>
      <BuilderContent />
    </React.Suspense>
  )
}
