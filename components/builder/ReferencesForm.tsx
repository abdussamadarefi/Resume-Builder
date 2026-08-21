"use client"

import { useResumeStore } from "@/store/resumeStore"

export function ReferencesForm() {
  const data = useResumeStore((state) => state.getActiveData())
  const updateReferences = useResumeStore((state) => state.updateReferences)

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-3 block">
          References
        </label>
        <textarea
          value={data.references}
          onChange={(e) => updateReferences(e.target.value)}
          placeholder="e.g. Available upon request. Or provide specific contact details."
          className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[150px] font-sans shadow-sm dark:shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
          Tip: Many modern resumes use &quot;Available upon request&quot; to save valuable space.
        </p>
      </div>
    </div>
  )
}
