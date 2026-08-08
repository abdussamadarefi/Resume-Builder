import type { Metadata } from "next"
import TemplatesPageClient from "./TemplatesPageClient"

export const metadata: Metadata = {
  title: "Resume & CV Templates | ResumeForge",
  description: "Browse 10+ professionally designed resume and CV templates. ATS-friendly, print-ready, and free to use. Find the perfect template for students, professionals, and academics.",
}

export default function TemplatesPage() {
  return <TemplatesPageClient />
}
