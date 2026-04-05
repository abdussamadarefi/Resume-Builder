"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, GripVertical, ChevronDown, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { WorkEntry } from "@/types/resume"
import React from "react"
import { BulletOptimizer } from "./BulletOptimizer"

export function ExperienceForm() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const { addWork, updateWork, removeWork } = useResumeStore()
  const experience = activeData.experience
  const [optimizingBullet, setOptimizingBullet] = React.useState<{ expId: string, index: number, text: string } | null>(null)

  const handleAdd = () => {
    addWork({
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    })
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {experience.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative group"
          >
            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 cursor-grab active:cursor-grabbing text-slate-600">
                <GripVertical size={18} />
              </div>
            </div>

            <button 
              onClick={() => removeWork(entry.id)}
              className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input 
                  value={entry.company}
                  onChange={(e) => updateWork(entry.id, { company: e.target.value })}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input 
                  value={entry.role}
                  onChange={(e) => updateWork(entry.id, { role: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input 
                  value={entry.startDate}
                  onChange={(e) => updateWork(entry.id, { startDate: e.target.value })}
                  placeholder="Jan 2022"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input 
                  value={entry.endDate}
                  onChange={(e) => updateWork(entry.id, { endDate: e.target.value })}
                  placeholder="Present"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-primary font-bold tracking-widest uppercase text-[10px]">Responsibilities & Achievements</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      const updated = [...entry.bullets, ""]
                      updateWork(entry.id, { bullets: updated })
                    }}
                    className="h-8 text-[10px] uppercase font-bold text-slate-500 hover:text-primary"
                  >
                    <Plus size={14} className="mr-1" /> Add Bullet
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {entry.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex gap-2">
                      <Input
                        value={bullet}
                        onChange={(e) => {
                          const updated = [...entry.bullets]
                          updated[bulletIndex] = e.target.value
                          updateWork(entry.id, { bullets: updated })
                        }}
                        placeholder="e.g. Led a team of 4 to deliver X..."
                        className="flex-1"
                      />
                      {/* AI Button disabled for now */}
                      {false && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-primary hover:bg-primary/10 h-10 w-10 shrink-0"
                          onClick={() => setOptimizingBullet({ expId: entry.id, index: bulletIndex, text: bullet })}
                        >
                          <Sparkles size={16} />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-slate-600 hover:text-red-400 h-10 w-10 shrink-0"
                        onClick={() => {
                          const updated = entry.bullets.filter((_, i) => i !== bulletIndex)
                          updateWork(entry.id, { bullets: updated })
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* AI Optimizer Modal */}
      <AnimatePresence>
        {optimizingBullet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
            <BulletOptimizer
              initialText={optimizingBullet.text}
              onClose={() => setOptimizingBullet(null)}
              onApply={(newText) => {
                const targetExp = experience.find(e => e.id === optimizingBullet.expId)
                if (targetExp) {
                  const updatedBullets = [...targetExp.bullets]
                  updatedBullets[optimizingBullet.index] = newText
                  updateWork(optimizingBullet.expId, { bullets: updatedBullets })
                }
                setOptimizingBullet(null)
              }}
            />
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={handleAdd}
        className="w-full h-14 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:border-primary/50 hover:text-primary transition-all group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        Add Work Experience
      </button>
    </div>
  )
}
