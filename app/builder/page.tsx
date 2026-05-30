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

const SECTION_INFO: Record<string, { title: string; desc: string }> = {
  personal: { title: "Personal Information", desc: "How recruiters can contact you" },
  summary: { title: "Profile Summary", desc: "A brief, impactful introduction of your career" },
  experience: { title: "Work Experience", desc: "Your professional chronology and key achievements" },
  education: { title: "Education History", desc: "Your academic degrees and qualifications" },
  skills: { title: "Core Skills", desc: "Categorized tools, technologies, and competencies" },
  projects: { title: "Projects & Portfolio", desc: "Key professional or open-source achievements" },
  certifications: { title: "Certifications", desc: "Professional credentials and licenses" },
  languages: { title: "Languages", desc: "Your native and secondary spoken languages" },
  publications: { title: "Publications & Research", desc: "Journal articles, book chapters, and preprints" },
  grants: { title: "Grants & Funding", desc: "Acquired project fellowships and research grants" },
  teaching: { title: "Teaching Experience", desc: "Courses taught, lectures, and academic instruction" },
  references: { title: "References", desc: "Professional contacts who can vouch for you" },
  custom: { title: "Custom Section", desc: "Any additional details you wish to highlight" },
  settings: { title: "Design & Layout Settings", desc: "Customize spacing, colors, and font sizes" },
  data: { title: "Data & Backup Manager", desc: "Export, import, or clear your locally-stored data" },
}

function BuilderContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") as "resume" | "cv" | null
  const createNewResume = useResumeStore((state) => state.createNewResume)
  const switchResume = useResumeStore((state) => state.switchResume)
  const resumes = useResumeStore((state) => state.resumes)
  const activeSection = useUIStore((state) => state.activeSection)
  const workspaceInitialized = useUIStore((state) => state.workspaceInitialized)
  const setWorkspaceInitialized = useUIStore((state) => state.setWorkspaceInitialized)
  const { accentColor, setAccentColor, zoom, setZoom, templateId, setTemplate } = useSettingsStore()
  const settingsState = useSettingsStore()
  const resumeData = useResumeStore((state) => state.getActiveData())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Track Zustand store hydration
  useEffect(() => {
    setIsHydrated(useResumeStore.persist.hasHydrated())
    return useResumeStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
    })
  }, [])

  // Initialize the document type once from URL query parameters on load, after hydration
  useEffect(() => {
    if (!isHydrated || workspaceInitialized) return

    if (type && resumeData?.meta?.type) {
      setWorkspaceInitialized(true)
      if (resumeData.meta.type !== type) {
        const match = Object.values(resumes).find((r) => r.meta.type === type)
        if (match) {
          switchResume(match.meta.id)
        } else {
          createNewResume(type)
        }
      }
    } else {
      setWorkspaceInitialized(true)
    }
  }, [isHydrated, workspaceInitialized, type, resumeData?.meta?.type, resumes, switchResume, createNewResume, setWorkspaceInitialized])

  // Synchronize the URL parameter to reflect the active document type
  useEffect(() => {
    if (isHydrated && workspaceInitialized && resumeData?.meta?.type) {
      const params = new URLSearchParams(window.location.search)
      if (params.get("type") !== resumeData.meta.type) {
        params.set("type", resumeData.meta.type)
        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`)
      }
    }
  }, [isHydrated, workspaceInitialized, resumeData?.meta?.type])

  if (!isHydrated || !resumeData || !resumeData.meta) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400 font-sans">
        Loading workspace...
      </div>
    )
  }

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
      <aside className="w-64 border-r border-slate-800 bg-slate-950 flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/25 text-white font-bold text-sm tracking-tighter">
              RF
            </div>
            <h2 className="text-lg font-heading font-bold text-white tracking-tight">ResumeForge</h2>
          </div>
          <SectionNav />
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 max-w-3xl mx-auto p-6 md:p-12 overflow-y-auto">
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">
              {SECTION_INFO[activeSection]?.title || activeSection}
            </h1>
            <p className="text-slate-400 text-sm">
              {SECTION_INFO[activeSection]?.desc || "Fill in the details for your professional profile."}
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
              <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-bold uppercase text-[10px] tracking-tight">{resumeData.meta.type}</span>
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
