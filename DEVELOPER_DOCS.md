# ResumeForge Developer Documentation

Welcome to the **ResumeForge** codebase! This document provides a high-level overview of the architecture, state management, and extension patterns for this privacy-first resume builder.

## 🏗️ Architecture Overview

ResumeForge is a pure client-side Next.js application. It follows a **Zero-Backend** philosophy, meaning all data is persisted in the user's browser via `localStorage`.

### Core Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State**: Zustand (with Persistence Middleware)
- **Styling**: Tailwind CSS + Framer Motion
- **PDF Export**: `@react-pdf/renderer`
- **Icons**: Lucide React

---

## 📂 Project Structure

- `/app`: Next.js routes. The main logic resides in `/app/builder`.
- `/components/builder`: Form sections, navigation, and management tools.
- `/components/templates`: Visual layouts for the web preview.
- `/components/export`: PDF rendering logic (React-PDF components).
- `/store`: Zustand state split into `resumeStore`, `settingsStore`, and `uiStore`.
- `/types`: Comprehensive TypeScript definitions for resume data and app state.

---

## 💾 State Management

We use **Zustand** for its simplicity and performance in a client-only environment.

### 1. `resumeStore.ts`
Handles all resume content (Personal Info, Experience, Education, etc.).
- **Persistence**: Automatically syncs to `localStorage` under the key `rf-resume-data`.
- **Logic**: Implements full CRUD for complex nested structures (like Experience bullets and Academic sections).

### 2. `settingsStore.ts`
Manages the "Design System" of the current document.
- Properties: `templateId`, `accentColor`, `fontSize`, `lineHeight`, `margin`.
- Centralized control: Changing a value here ripples through the entire `Preview` engine.

### 3. `uiStore.ts`
Tracks transient UI state like the `activeSection` and `zoom` levels.

---

## 🎨 Adding New Templates

To add a new template (e.g., "Prism"):

1. **Define the Web Template**: Create `components/templates/PrismTemplate.tsx`.
   - Must accept `TemplateProps` (data, accentColor, fontSize, etc.).
   - Use Tailwind for visual layout.
2. **Update Settings**: Add `"prism"` to the `TemplateId` type in `types/index.ts`.
3. **Register in Preview**: Update `components/builder/Preview.tsx` to include the new template in the conditional rendering block.
4. **Register in Settings**: Add the template option to `components/builder/SettingsForm.tsx`.

---

## 📄 Export Engine

Exporting to PDF is handled via a **Dual-Render** path:
- **Web Preview**: Uses standard DOM elements + Tailwind CSS for maximum speed and interactivity.
- **PDF Generation**: Uses `@react-pdf/renderer` to build a PDF-safe React tree. This ensures pixel-perfect A4 printing independently of browser print engines.

**Note**: All templates should have a corresponding "PDF Mirror" if high-fidelity export is required for that specific style.

---

## 🛡️ Privacy & Data

- **No Cookies**: No tracking cookies are used.
- **No APIs**: We do not send resume data to any external server.
- **JSON Portability**: Users can export their entire state as a JSON file via the **Data & Privacy** section. This serves as their primary backup.

---

## 🚀 Deployment

ResumeForge is optimized for **Vercel** or any static hosting provider.
1. Run `npm run build`.
2. Deploy the `out` directory (if using static export) or the standard Next.js build.

---

**Developed with ❤️ by the ResumeForge Team.**
