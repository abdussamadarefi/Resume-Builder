import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"

export const metadata: Metadata = {
  title: "Privacy Policy | ResumeForge",
  description: "ResumeForge Privacy Policy — Learn how we protect your data. Zero tracking, zero databases, zero cookies. All data stays in your browser's localStorage.",
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
