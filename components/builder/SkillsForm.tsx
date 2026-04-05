"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Plus, X, Tag, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function SkillsForm() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const { addSkillGroup, updateSkillGroup, removeSkillGroup } = useResumeStore()
  const skillGroups = activeData.skills
  const [newSkill, setNewSkill] = useState<Record<string, string>>({})

  const handleAddGroup = () => {
    addSkillGroup({
      id: crypto.randomUUID(),
      category: "",
      skills: [],
    })
  }

  const handleAddSkill = (groupId: string) => {
    const val = newSkill[groupId]?.trim()
    if (!val) return
    
    const group = skillGroups.find(g => g.id === groupId)
    if (group && !group.skills.includes(val)) {
      updateSkillGroup(groupId, { skills: [...group.skills, val] })
    }
    setNewSkill({ ...newSkill, [groupId]: "" })
  }

  const removeSkill = (groupId: string, skill: string) => {
    const group = skillGroups.find(g => g.id === groupId)
    if (group) {
      updateSkillGroup(groupId, { skills: group.skills.filter(s => s !== skill) })
    }
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {skillGroups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative group"
          >
            <button 
              onClick={() => removeSkillGroup(group.id)}
              className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Skill Category</Label>
                <Input 
                  value={group.category}
                  onChange={(e) => updateSkillGroup(group.id, { category: e.target.value })}
                  placeholder="Programming Languages"
                />
              </div>

              <div className="space-y-4">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700 group/tag"
                      >
                        {skill}
                        <button 
                          onClick={() => removeSkill(group.id, skill)}
                          className="text-slate-500 hover:text-slate-200"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex gap-2">
                  <Input 
                    value={newSkill[group.id] || ""}
                    onChange={(e) => setNewSkill({ ...newSkill, [group.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(group.id)}
                    placeholder="Add a skill (e.g. TypeScript)"
                    className="h-10 text-xs"
                  />
                  <button 
                    onClick={() => handleAddSkill(group.id)}
                    className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={handleAddGroup}
        className="w-full h-14 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:border-primary/50 hover:text-primary transition-all group"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        Add Skill Category
      </button>
    </div>
  )
}

