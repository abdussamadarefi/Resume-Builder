import { SectionKey, DocumentType } from "./index";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string; // base64
  // CV Specific
  orcid?: string;
  nationality?: string;
}

export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "present";
  location?: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
  thesisTitle?: string;
  supervisor?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface PublicationEntry {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
}

export interface GrantEntry {
  id: string;
  title: string;
  organization: string;
  amount: string;
  date: string;
}

export interface TeachingEntry {
  id: string;
  course: string;
  institution: string;
  date: string;
  description: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface ResumeData {
  meta: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    type: DocumentType;
  };
  personal: PersonalInfo;
  summary: string;
  experience: WorkEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  publications: PublicationEntry[];
  grants: GrantEntry[];
  teaching: TeachingEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  custom: CustomSectionEntry[];
  references: string;
  // Layout
  sectionOrder: SectionKey[];
  sectionVisibility: Record<string, boolean>;
}
