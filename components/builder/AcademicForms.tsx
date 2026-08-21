"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, BookOpen, Landmark, Presentation } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Publications ---
export function PublicationsForm() {
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="text-primary" size={24} />
          Publications
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 shadow-sm dark:shadow-none">
          <Plus size={16} /> Add Publication
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.publications.map((pub) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors relative group shadow-sm dark:shadow-none"
          >
            <button
              onClick={() => removePublication(pub.id)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
              title="Delete Publication"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label>Publication Title</Label>
                <Input
                  value={pub.title}
                  onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                  placeholder="e.g. Deep Learning in Healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label>Publisher / Journal</Label>
                <Input
                  value={pub.publisher}
                  onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })}
                  placeholder="e.g. Nature"
                />
              </div>
              <div className="space-y-2">
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Landmark className="text-primary" size={24} />
          Grants &amp; Funding
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 shadow-sm dark:shadow-none">
          <Plus size={16} /> Add Grant
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.grants.map((grant) => (
          <motion.div
            key={grant.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 relative group shadow-sm dark:shadow-none"
          >
            <button onClick={() => removeGrant(grant.id)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10" title="Delete Grant">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label>Grant Name</Label>
                <Input value={grant.title} onChange={(e) => updateGrant(grant.id, { title: e.target.value })} placeholder="e.g. Research Excellence Award" />
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input value={grant.organization} onChange={(e) => updateGrant(grant.id, { organization: e.target.value })} placeholder="e.g. National Science Foundation" />
              </div>
              <div className="space-y-2">
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Presentation className="text-primary" size={24} />
          Teaching Experience
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2 border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 shadow-sm dark:shadow-none">
          <Plus size={16} /> Add Course
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.teaching.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 relative group shadow-sm dark:shadow-none"
          >
            <button onClick={() => removeTeaching(t.id)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10" title="Delete Course">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label>Course Name</Label>
                <Input value={t.course} onChange={(e) => updateTeaching(t.id, { course: e.target.value })} placeholder="e.g. Advanced Calculus" />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input value={t.institution} onChange={(e) => updateTeaching(t.id, { institution: e.target.value })} placeholder="e.g. Stanford University" />
              </div>
              <div className="space-y-2">
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
