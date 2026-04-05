"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Button } from "@/components/ui/Button"
import { Download, Upload, RefreshCcw, ShieldCheck, AlertCircle } from "lucide-react"
import React from "react"

export function DataManagement() {
  const { resumes, activeId } = useResumeStore()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const data = JSON.stringify({ resumes, activeId }, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `resumeforge-backup-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const parsed = JSON.parse(content)
        
        if (parsed.resumes && parsed.activeId) {
          // Confirm before overwrite
          if (confirm("Restore from backup? This will replace your current resume data.")) {
            useResumeStore.setState({ resumes: parsed.resumes, activeId: parsed.activeId })
            alert("Backup restored successfully!")
          }
        } else {
          throw new Error("Invalid backup format")
        }
      } catch (err) {
        alert("Failed to restore backup: Invalid file format.")
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm("Are you sure? This will delete all your resumes and settings forever. This cannot be undone.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex gap-6 items-start">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-2">Privacy & Portability</h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            ResumeForge is a zero-backend platform. Your data never leaves your browser. 
            Use these tools to backup your resumes or move them to another device.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Download className="text-primary" size={32} />
          </div>
          <h5 className="text-lg font-bold text-white mb-2">Export Backup</h5>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed">
            Download your data as a JSON file. Keep it safe as a backup.
          </p>
          <Button onClick={handleExport} className="w-full gap-2">
            Download JSON
          </Button>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Upload className="text-emerald-500" size={32} />
          </div>
          <h5 className="text-lg font-bold text-white mb-2">Import Data</h5>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed">
            Restore your resumes from a previously exported JSON backup.
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            accept=".json"
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full gap-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10">
            Select Backup File
          </Button>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-red-500" size={24} />
        </div>
        <h5 className="text-lg font-bold text-white mb-2">Danger Zone</h5>
        <p className="text-xs text-red-500/60 mb-6">
          Wiping all data is permanent. Make sure you have a backup first.
        </p>
        <Button onClick={handleReset} variant="outline" className="gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10">
          <RefreshCcw size={16} /> Reset All Data
        </Button>
      </div>
    </div>
  )
}
