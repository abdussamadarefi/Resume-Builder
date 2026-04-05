"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, BookOpen, Landmark, Presentation } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Publications ---
export function PublicationsForm() {
  const activeId = useResumeStore((state) => state.activeId)
  const data = useResumeStore((state) => state.getActiveData())
  const { addPublication, updatePublication, removePublication } = useResumeStore()

  const handleAdd = () => {
    addPublication({
      id: crypto.randomUUID(),
      title: "",
      publisher: "",
      date: "",
      url: ""
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-primary" size={24} />
          Publications
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300">
          <Plus size={16} /> Add Publication
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors relative group"
          >
            <button
              onClick={() => removePublication(pub.id)}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-400/10"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>Publication Title</Label>
                <Input
                  value={pub.title}
                  onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                  placeholder="e.g. Deep Learning in Healthcare"
                />
              </div>
              <div>
                <Label>Publisher / Journal</Label>
                <Input
                  value={pub.publisher}
                  onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })}
                  placeholder="e.g. Nature"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  value={pub.date}
                  onChange={(e) => updatePublication(pub.id, { date: e.target.value })}
                  placeholder="e.g. Dec 2023"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// --- Grants ---
export function GrantsForm() {
  const activeId = useResumeStore((state) => state.activeId)
  const data = useResumeStore((state) => state.getActiveData())
  const { addGrant, updateGrant, removeGrant } = useResumeStore()

  const handleAdd = () => {
    addGrant({
      id: crypto.randomUUID(),
      title: "",
      organization: "",
      amount: "",
      date: ""
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Landmark className="text-primary" size={24} />
          Grants & Funding
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300">
          <Plus size={16} /> Add Grant
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.grants.map((grant) => (
          <motion.div
            key={grant.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 relative group"
          >
            <button onClick={() => removeGrant(grant.id)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-400/10">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>Grant Name</Label>
                <Input value={grant.title} onChange={(e) => updateGrant(grant.id, { title: e.target.value })} placeholder="e.g. Research Excellence Award" />
              </div>
              <div>
                <Label>Organization</Label>
                <Input value={grant.organization} onChange={(e) => updateGrant(grant.id, { organization: e.target.value })} placeholder="e.g. National Science Foundation" />
              </div>
              <div>
                <Label>Amount</Label>
                <Input value={grant.amount} onChange={(e) => updateGrant(grant.id, { amount: e.target.value })} placeholder="e.g. $50,000" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// --- Teaching ---
export function TeachingForm() {
  const activeId = useResumeStore((state) => state.activeId)
  const data = useResumeStore((state) => state.getActiveData())
  const { addTeaching, updateTeaching, removeTeaching } = useResumeStore()

  const handleAdd = () => {
    addTeaching({
      id: crypto.randomUUID(),
      course: "",
      institution: "",
      date: "",
      description: ""
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Presentation className="text-primary" size={24} />
          Teaching Experience
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300">
          <Plus size={16} /> Add Course
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.teaching.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 relative group"
          >
            <button onClick={() => removeTeaching(t.id)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-400/10">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>Course Name</Label>
                <Input value={t.course} onChange={(e) => updateTeaching(t.id, { course: e.target.value })} placeholder="e.g. Advanced Calculus" />
              </div>
              <div>
                <Label>Institution</Label>
                <Input value={t.institution} onChange={(e) => updateTeaching(t.id, { institution: e.target.value })} placeholder="e.g. Stanford University" />
              </div>
              <div>
                <Label>Date</Label>
                <Input value={t.date} onChange={(e) => updateTeaching(t.id, { date: e.target.value })} placeholder="e.g. Fall 2023" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
