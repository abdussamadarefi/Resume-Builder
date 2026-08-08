import type { Metadata } from "next"
import TermsPageClient from "./TermsPageClient"

export const metadata: Metadata = {
  title: "Terms of Service | ResumeForge",
  description: "ResumeForge Terms of Service — Understand your rights and responsibilities when using our free, open-source resume and CV builder.",
}

export default function TermsPage() {
  return <TermsPageClient />
}
