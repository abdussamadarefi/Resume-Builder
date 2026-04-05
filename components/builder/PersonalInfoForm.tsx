"use client"

import { useResumeStore } from "@/store/resumeStore"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { motion } from "framer-motion"
import React from "react"
import { Camera, X } from "lucide-react"

export function PersonalInfoForm() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const updatePersonal = useResumeStore((state) => state.updatePersonal)
  const personal = activeData.personal
  const photoInputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updatePersonal({ [name]: value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      updatePersonal({ photoUrl: ev.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Photo Upload */}
      <div className="flex items-center gap-6 p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
        <div className="relative flex-shrink-0">
          {personal.photoUrl ? (
            <div className="relative">
              <img
                src={personal.photoUrl}
                alt="Profile photo"
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-700"
              />
              <button
                onClick={() => updatePersonal({ photoUrl: undefined })}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => photoInputRef.current?.click()}
              className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:border-primary/50 hover:text-primary transition-all"
            >
              <Camera size={24} />
              <span className="text-[9px] mt-1 font-bold uppercase tracking-wide">Photo</span>
            </button>
          )}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-300 mb-1">Profile Photo</p>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Optional. Used in Scholar and Prism templates. Stored locally in your browser.
          </p>
          {!personal.photoUrl && (
            <button
              onClick={() => photoInputRef.current?.click()}
              className="text-xs text-primary font-medium hover:underline"
            >
              Upload image →
            </button>
          )}
          {personal.photoUrl && (
            <button
              onClick={() => photoInputRef.current?.click()}
              className="text-xs text-slate-400 font-medium hover:text-slate-200"
            >
              Change photo
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName"
            name="firstName"
            value={personal.firstName}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName"
            name="lastName"
            value={personal.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input 
          id="title"
          name="title"
          value={personal.title}
          onChange={handleChange}
          placeholder="Senior Software Engineer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location"
          name="location"
          value={personal.location}
          onChange={handleChange}
          placeholder="New York, USA"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website / Portfolio</Label>
          <Input 
            id="website"
            name="website"
            value={personal.website ?? ""}
            onChange={handleChange}
            placeholder="https://johndoe.me"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input 
            id="linkedin"
            name="linkedin"
            value={personal.linkedin ?? ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input 
            id="github"
            name="github"
            value={personal.github ?? ""}
            onChange={handleChange}
            placeholder="github.com/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orcid">ORCID <span className="text-slate-500 font-normal">(CV only)</span></Label>
          <Input 
            id="orcid"
            name="orcid"
            value={personal.orcid ?? ""}
            onChange={handleChange}
            placeholder="0000-0000-0000-0000"
          />
        </div>
      </div>
    </motion.div>
  )
}
