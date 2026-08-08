import type { Metadata } from "next"
import CookiesPageClient from "./CookiesPageClient"

export const metadata: Metadata = {
  title: "Cookie Policy | ResumeForge",
  description: "ResumeForge Cookie Policy — We use zero cookies. Learn about our approach to browser storage and data handling.",
}

export default function CookiesPage() {
  return <CookiesPageClient />
}
