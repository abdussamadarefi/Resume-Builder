import { ResumeData, PersonalInfo, WorkEntry, EducationEntry, SkillGroup } from "@/types/resume";
import { SectionKey, DocumentType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResumeState {
  resumes: Record<string, ResumeData>;
  activeId: string;
  
  // Computed (helper)
  getActiveData: () => ResumeData;

  // Actions
  updatePersonal: (personal: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  
  addWork: (entry: WorkEntry) => void;
  updateWork: (id: string, entry: Partial<WorkEntry>) => void;
  removeWork: (id: string) => void;
  reorderWork: (entries: WorkEntry[]) => void;

  addEducation: (entry: EducationEntry) => void;
  updateEducation: (id: string, entry: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  addSkillGroup: (group: SkillGroup) => void;
  updateSkillGroup: (id: string, group: Partial<SkillGroup>) => void;
  removeSkillGroup: (id: string) => void;

  // Academic Actions
  addPublication: (entry: any) => void;
  updatePublication: (id: string, entry: any) => void;
  removePublication: (id: string) => void;
  
  addGrant: (entry: any) => void;
  updateGrant: (id: string, entry: any) => void;
  removeGrant: (id: string) => void;

  addTeaching: (entry: any) => void;
  updateTeaching: (id: string, entry: any) => void;
  removeTeaching: (id: string) => void;

  updateReferences: (references: string) => void;

  addProject: (entry: any) => void;
  updateProject: (id: string, entry: any) => void;
  removeProject: (id: string) => void;

  addCertification: (entry: any) => void;
  updateCertification: (id: string, entry: any) => void;
  removeCertification: (id: string) => void;

  addLanguage: (entry: any) => void;
  updateLanguage: (id: string, entry: any) => void;
  removeLanguage: (id: string) => void;

  addCustom: (entry: any) => void;
  updateCustom: (id: string, entry: any) => void;
  removeCustom: (id: string) => void;

  setSectionOrder: (order: SectionKey[]) => void;
  setSectionVisibility: (section: SectionKey, visible: boolean) => void;

  // Multi-resume actions
  switchResume: (id: string) => void;
  createNewResume: (type: DocumentType) => void;
  deleteResume: (id: string) => void;
  renameResume: (id: string, title: string) => void;
}

const createInitialData = (id: string, type: DocumentType = "resume"): ResumeData => ({
  meta: {
    id,
    title: type === "resume" ? "New Resume" : "New CV",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type,
  },
  personal: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  publications: [],
  grants: [],
  teaching: [],
  certifications: [],
  languages: [],
  custom: [],
  references: "",
  sectionOrder: ["personal", "summary", "experience", "education", "skills", "projects", "certifications", "languages", "publications", "grants", "teaching", "references", "custom"],
  sectionVisibility: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    publications: true,
    grants: true,
    teaching: true,
    references: true,
    custom: true,
  },
});

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: { "default": createInitialData("default") },
      activeId: "default",

      getActiveData: () => get().resumes[get().activeId] || get().resumes["default"],

      updatePersonal: (personal) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              personal: { ...state.resumes[state.activeId].personal, ...personal },
              meta: { ...state.resumes[state.activeId].meta, updatedAt: new Date().toISOString() },
            },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              summary,
              meta: { ...state.resumes[state.activeId].meta, updatedAt: new Date().toISOString() },
            },
          },
        })),

      addWork: (entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              experience: [...(state.resumes[state.activeId].experience || []), entry],
            },
          },
        })),

      updateWork: (id, entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              experience: state.resumes[state.activeId].experience.map((e) =>
                e.id === id ? { ...e, ...entry } : e
              ),
            },
          },
        })),

      removeWork: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              experience: state.resumes[state.activeId].experience.filter((e) => e.id !== id),
            },
          },
        })),

      reorderWork: (experience) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: { ...state.resumes[state.activeId], experience },
          },
        })),

      addEducation: (entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              education: [...(state.resumes[state.activeId].education || []), entry],
            },
          },
        })),

      updateEducation: (id, entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              education: state.resumes[state.activeId].education.map((e) =>
                e.id === id ? { ...e, ...entry } : e
              ),
            },
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              education: state.resumes[state.activeId].education.filter((e) => e.id !== id),
            },
          },
        })),

      addSkillGroup: (group) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              skills: [...(state.resumes[state.activeId].skills || []), group],
            },
          },
        })),

      updateSkillGroup: (id, group) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              skills: state.resumes[state.activeId].skills.map((s) =>
                s.id === id ? { ...s, ...group } : s
              ),
            },
          },
        })),

      removeSkillGroup: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              skills: state.resumes[state.activeId].skills.filter((s) => s.id !== id),
            },
          },
        })),

      setSectionOrder: (sectionOrder) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: { ...state.resumes[state.activeId], sectionOrder },
          },
        })),

      setSectionVisibility: (section, visible) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              sectionVisibility: {
                ...state.resumes[state.activeId].sectionVisibility,
                [section]: visible,
              },
            },
          },
        })),

      switchResume: (activeId) => set({ activeId }),

      createNewResume: (type) => {
        const id = crypto.randomUUID();
        set((state) => ({
          resumes: { ...state.resumes, [id]: createInitialData(id, type) },
          activeId: id,
        }));
      },

      deleteResume: (id) =>
        set((state) => {
          const newResumes = { ...state.resumes };
          delete newResumes[id];
          const remainingIds = Object.keys(newResumes);
          const nextActiveId = id === state.activeId ? remainingIds[0] || "default" : state.activeId;
          
          if (!newResumes[nextActiveId]) {
            newResumes["default"] = createInitialData("default");
          }

          return { resumes: newResumes, activeId: nextActiveId };
        }),

      renameResume: (id, title) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [id]: { ...state.resumes[id], meta: { ...state.resumes[id].meta, title } },
          },
        })),

      addPublication: (entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              publications: [...(state.resumes[state.activeId].publications || []), entry],
            },
          },
        })),

      updatePublication: (id, entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              publications: state.resumes[state.activeId].publications.map((p) =>
                p.id === id ? { ...p, ...entry } : p
              ),
            },
          },
        })),

      removePublication: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              publications: state.resumes[state.activeId].publications.filter((p) => p.id !== id),
            },
          },
        })),

      addGrant: (entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              grants: [...(state.resumes[state.activeId].grants || []), entry],
            },
          },
        })),

      updateGrant: (id, entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              grants: state.resumes[state.activeId].grants.map((g) =>
                g.id === id ? { ...g, ...entry } : g
              ),
            },
          },
        })),

      removeGrant: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              grants: state.resumes[state.activeId].grants.filter((g) => g.id !== id),
            },
          },
        })),

      addTeaching: (entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              teaching: [...(state.resumes[state.activeId].teaching || []), entry],
            },
          },
        })),

      updateTeaching: (id, entry) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              teaching: state.resumes[state.activeId].teaching.map((t) =>
                t.id === id ? { ...t, ...entry } : t
              ),
            },
          },
        })),

      removeTeaching: (id) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: {
              ...state.resumes[state.activeId],
              teaching: state.resumes[state.activeId].teaching.filter((t) => t.id !== id),
            },
          },
        })),

      updateReferences: (references) =>
        set((state) => ({
          resumes: {
            ...state.resumes,
            [state.activeId]: { ...state.resumes[state.activeId], references },
          },
        })),

      addProject: (entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], projects: [...(state.resumes[state.activeId].projects || []), entry] } } })),
      updateProject: (id, entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], projects: (state.resumes[state.activeId].projects || []).map((p) => p.id === id ? { ...p, ...entry } : p) } } })),
      removeProject: (id) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], projects: (state.resumes[state.activeId].projects || []).filter((p) => p.id !== id) } } })),

      addCertification: (entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], certifications: [...(state.resumes[state.activeId].certifications || []), entry] } } })),
      updateCertification: (id, entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], certifications: (state.resumes[state.activeId].certifications || []).map((c) => c.id === id ? { ...c, ...entry } : c) } } })),
      removeCertification: (id) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], certifications: (state.resumes[state.activeId].certifications || []).filter((c) => c.id !== id) } } })),

      addLanguage: (entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], languages: [...(state.resumes[state.activeId].languages || []), entry] } } })),
      updateLanguage: (id, entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], languages: (state.resumes[state.activeId].languages || []).map((l) => l.id === id ? { ...l, ...entry } : l) } } })),
      removeLanguage: (id) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], languages: (state.resumes[state.activeId].languages || []).filter((l) => l.id !== id) } } })),

      addCustom: (entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], custom: [...(state.resumes[state.activeId].custom || []), entry] } } })),
      updateCustom: (id, entry) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], custom: (state.resumes[state.activeId].custom || []).map((c) => c.id === id ? { ...c, ...entry } : c) } } })),
      removeCustom: (id) => set((state) => ({ resumes: { ...state.resumes, [state.activeId]: { ...state.resumes[state.activeId], custom: (state.resumes[state.activeId].custom || []).filter((c) => c.id !== id) } } })),
    }),
    {
      name: "rf-resume-data",
    }
  )
);
