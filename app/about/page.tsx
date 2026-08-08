import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About ResumeForge | Free Open-Source Resume & CV Builder",
  description: "Learn about ResumeForge — a privacy-first, zero-cost, open-source resume and CV builder. Built with Next.js, React, and TypeScript.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
