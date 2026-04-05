"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export function LanguagesForm() {
  const data = useResumeStore((state) => state.getActiveData())
  const languages = data.languages || []
  const addLanguage = useResumeStore((state) => state.addLanguage)
  const updateLanguage = useResumeStore((state) => state.updateLanguage)
  const removeLanguage = useResumeStore((state) => state.removeLanguage)

  const handleAdd = () => {
    addLanguage({
      id: crypto.randomUUID(),
      name: "",
      proficiency: "Native",
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = languages.findIndex((item) => item.id === active.id)
      const newIndex = languages.findIndex((item) => item.id === over.id)
      const reordered = arrayMove(languages, oldIndex, newIndex)
      // Update all items via individual updates to maintain store integrity
      reordered.forEach((item, idx) => {
        if (languages[idx]?.id !== item.id) {
          updateLanguage(item.id, item)
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={languages} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            <AnimatePresence>
              {languages.map((item) => (
                <LanguageItem
                  key={item.id}
                  item={item}
                  onUpdate={(updates: any) => updateLanguage(item.id, updates)}
                  onRemove={() => removeLanguage(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-2 bg-transparent hover:bg-slate-800 h-14">
        <Plus size={18} className="mr-2" /> Add Language
      </Button>
    </div>
  )
}

function LanguageItem({ item, onUpdate, onRemove }: { item: any; onUpdate: (updates: any) => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-white shrink-0">
        <GripVertical size={16} />
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-3">
        <Input 
          placeholder="Language (e.g. English)" 
          value={item.name} 
          onChange={(e) => onUpdate({ name: e.target.value })} 
          className="bg-slate-950/50"
        />
        <select
          value={item.proficiency}
          onChange={(e) => onUpdate({ proficiency: e.target.value })}
          className="bg-slate-950/50 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-full"
        >
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
          <option value="Proficient">Proficient</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
      </div>

      <Button variant="ghost" size="icon" onClick={onRemove} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-11 w-11 shrink-0">
        <Trash2 size={16} />
      </Button>
    </motion.div>
  )
}
