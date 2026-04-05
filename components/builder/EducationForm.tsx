"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function EducationForm() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const { addEducation, updateEducation, removeEducation } = useResumeStore()
  const education = activeData.education

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    })
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {education.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative group"
          >
            <button 
              onClick={() => removeEducation(entry.id)}
              className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label>Institution</Label>
                <Input 
                  value={entry.school}
                  onChange={(e) => updateEducation(entry.id, { school: e.target.value })}
                  placeholder="University of Oxford"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input 
                  value={entry.degree}
                  onChange={(e) => updateEducation(entry.id, { degree: e.target.value })}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input 
                  value={entry.field}
                  onChange={(e) => updateEducation(entry.id, { field: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Year</Label>
                <Input 
                  value={entry.startYear}
                  onChange={(e) => updateEducation(entry.id, { startYear: e.target.value })}
                  placeholder="2018"
                />
              </div>
              <div className="space-y-2">
                <Label>End Year</Label>
                <Input 
                  value={entry.endYear}
                  onChange={(e) => updateEducation(entry.id, { endYear: e.target.value })}
                  placeholder="2022"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={handleAdd}
        className="w-full h-14 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:border-primary/50 hover:text-primary transition-all group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        Add Education
      </button>
    </div>
  )
}
