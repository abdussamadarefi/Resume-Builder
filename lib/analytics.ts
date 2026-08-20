/**
 * Google Analytics 4 — Custom Event Tracking Utility
 *
 * Usage in any client component:
 *   import { trackEvent } from "@/lib/analytics"
 *   trackEvent("resume_downloaded", { format: "pdf" })
 */

type GAEventParams = Record<string, string | number | boolean>

export function trackEvent(eventName: string, params?: GAEventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params)
  }
}

// Pre-defined event helpers for consistency
export const analytics = {
  /** User starts building a new resume */
  resumeCreated: () => trackEvent("resume_created"),

  /** User selects a template */
  templateSelected: (templateName: string) =>
    trackEvent("template_selected", { template: templateName }),

  /** User downloads/exports a resume */
  resumeDownloaded: (format: "pdf" | "docx" | "quick_pdf") =>
    trackEvent("resume_downloaded", { format }),

  /** User switches between resume and CV mode */
  modeSwitched: (mode: "resume" | "cv") =>
    trackEvent("mode_switched", { mode }),

  /** User changes accent color */
  colorChanged: (color: string) =>
    trackEvent("color_changed", { color }),

  /** User clicks a CTA button on the landing page */
  ctaClicked: (location: string, action: string) =>
    trackEvent("cta_clicked", { location, action }),
}
