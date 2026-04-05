"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"

export function CertificationsForm() {
  const data = useResumeStore((state) => state.getActiveData())
  const certifications = data.certifications || []
  const addCertification = useResumeStore((state) => state.addCertification)
  const updateCertification = useResumeStore((state) => state.updateCertification)
  const removeCertification = useResumeStore((state) => state.removeCertification)

  const [expandedId, setExpandedId] = useState<string | null>(certifications[0]?.id || null)

  const handleAdd = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    }
    addCertification(newEntry)
    setExpandedId(newEntry.id)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
       // Drag functionality omitted for certification store array reordering initially
    }
  }

  return (
    <div className="space-y-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certifications} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            <AnimatePresence>
              {certifications.map((item) => (
                <CertItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  onUpdate={(updates) => updateCertification(item.id, updates)}
                  onRemove={() => removeCertification(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-2 bg-transparent hover:bg-slate-800 h-14">
        <Plus size={18} className="mr-2" /> Add Certification
      </Button>
    </div>
  )
}

function CertItem({ item, isExpanded, onToggle, onUpdate, onRemove }: { item: any; isExpanded: boolean; onToggle: () => void; onUpdate: (updates: any) => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
    >
      <div className="flex items-center p-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={onToggle}>
        <div {...attributes} {...listeners} className="p-2 mr-2 cursor-grab active:cursor-grabbing text-slate-500 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <GripVertical size={18} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white">{item.name || "(Not specified)"}</h4>
          <p className="text-sm text-slate-400">{item.issuer || "Unknown Issuer"}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 ml-2">
          <Trash2 size={16} />
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-6 pt-0 space-y-4 border-t border-slate-800 mt-2">
              <div className="space-y-2"><Label>Certification Name</Label><Input placeholder="e.g. AWS Certified Solutions Architect" value={item.name} onChange={(e) => onUpdate({ name: e.target.value })} /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Issuing Organization</Label><Input placeholder="e.g. Amazon Web Services" value={item.issuer} onChange={(e) => onUpdate({ issuer: e.target.value })} /></div>
                <div className="space-y-2"><Label>Date Earned</Label><Input placeholder="e.g. Aug 2023" value={item.date} onChange={(e) => onUpdate({ date: e.target.value })} /></div>
              </div>

              <div className="space-y-2"><Label>Credential URL</Label><Input placeholder="e.g. https://credly.com/..." value={item.url} onChange={(e) => onUpdate({ url: e.target.value })} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
