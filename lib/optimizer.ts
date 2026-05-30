export async function runAutoFit(
  fontSize: number,
  setFontSize: (size: number) => void,
  lineHeight: number,
  setLineHeight: (height: number) => void,
  margin: number,
  setMargin: (margin: number) => void,
  setIsOptimizing?: (optimizing: boolean) => void
) {
  const el = document.getElementById("rf-preview-doc")
  if (!el) return

  if (setIsOptimizing) setIsOptimizing(true)

  // Measure A4 page height in exact device pixels
  const dummy = document.createElement("div")
  dummy.style.height = "297mm"
  dummy.style.position = "absolute"
  dummy.style.visibility = "hidden"
  document.body.appendChild(dummy)
  const pageHeight = dummy.clientHeight || 1122
  document.body.removeChild(dummy)

  let fs = fontSize
  let lh = lineHeight
  let mg = margin

  // Shrink spacing step-by-step
  for (let i = 0; i < 40; i++) {
    const sHeight = el.scrollHeight
    if (sHeight <= pageHeight + 2) {
      break // Fits on one page!
    }

    if (fs > 11) {
      fs -= 0.5
      setFontSize(fs)
    } else if (lh > 1.2) {
      lh -= 0.05
      setLineHeight(lh)
    } else if (mg > 20) {
      mg -= 2
      setMargin(mg)
    } else {
      break // Minimum limits reached
    }

    // Yield control to let browser recalculate layout & paint
    await new Promise((resolve) => requestAnimationFrame(resolve))
    await new Promise((resolve) => setTimeout(resolve, 40))
  }

  if (setIsOptimizing) setIsOptimizing(false)
}
