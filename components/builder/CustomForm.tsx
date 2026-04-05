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

export function CustomForm() {
  const data = useResumeStore((state) => state.getActiveData())
  const custom = data.custom || []
  const addCustom = useResumeStore((state) => state.addCustom)
  const updateCustom = useResumeStore((state) => state.updateCustom)
  const removeCustom = useResumeStore((state) => state.removeCustom)

  const [expandedId, setExpandedId] = useState<string | null>(custom[0]?.id || null)

  const handleAdd = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      title: "",
      subtitle: "",
      date: "",
      description: "",
    }
    addCustom(newEntry)
    setExpandedId(newEntry.id)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: any) => {
    // Array reordering logic can be added later
  }

  return (
    <div className="space-y-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={custom} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            <AnimatePresence>
              {custom.map((item) => (
                <CustomItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  onUpdate={(updates) => updateCustom(item.id, updates)}
                  onRemove={() => removeCustom(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-2 bg-transparent hover:bg-slate-800 h-14">
        <Plus size={18} className="mr-2" /> Add Custom Entry
      </Button>
    </div>
  )
}

function CustomItem({ item, isExpanded, onToggle, onUpdate, onRemove }: { item: any; isExpanded: boolean; onToggle: () => void; onUpdate: (updates: any) => void; onRemove: () => void }) {
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
          <h4 className="font-bold text-white">{item.title || "Untitled Entry"}</h4>
          <p className="text-sm text-slate-400">{item.subtitle || "No subtitle"}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 ml-2">
          <Trash2 size={16} />
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-6 pt-0 space-y-4 border-t border-slate-800 mt-2">
              <div className="space-y-2"><Label>Entry Title</Label><Input placeholder="e.g. Volunteer Work, Hobbies, etc." value={item.title} onChange={(e) => onUpdate({ title: e.target.value })} /></div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Subtitle/Role</Label><Input placeholder="e.g. Lead Organizer" value={item.subtitle} onChange={(e) => onUpdate({ subtitle: e.target.value })} /></div>
                <div className="space-y-2"><Label>Date/Year</Label><Input placeholder="e.g. 2021 - 2023" value={item.date} onChange={(e) => onUpdate({ date: e.target.value })} /></div>
              </div>

              <div className="space-y-2"><Label>Description</Label><Input placeholder="Details about this entry..." value={item.description} onChange={(e) => onUpdate({ description: e.target.value })} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
