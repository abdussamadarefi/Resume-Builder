/* Google Analytics gtag.js global type declaration */
interface Window {
  gtag?: (
    command: "event" | "config" | "set",
    targetId: string,
    params?: Record<string, unknown>
  ) => void
}
