# ResumeForge — Custom CMS Admin Dashboard
## Architecture & Implementation Blueprint

> **Production Control Plane for ResumeForge (https://resumee.pro.bd)**
> GitHub-Powered CMS · JSON Content Files · Push-to-Deploy · Multi-Admin Support · $0/month

---

## Table of Contents

1. How It Works - The Core Concept
2. Architecture: GitHub as the Database
3. Technology Stack & $0/mo Cost Model
4. Content File Structure (content/ folder)
5. Full Directory & File Structure
6. Admin Authentication & User Management (Supabase)
7. Edge Middleware Route Guard
8. The Push to GitHub Engine
9. Content Management Panels (All 6 Page Modules)
10. Templates Registry Manager
11. Feature Flags Panel
12. Admin Dashboard UI - Layout
13. API Routes - Admin & Publish
14. Frontend Integration - Reading JSON Content
15. Environment Variables
16. Build & Deployment Flow
17. Content JSON File Schemas (Complete Reference)
18. Implementation Phases

---

## 1. How It Works — The Core Concept

### Your Current Flow (Manual Code Changes)

```
VS Code -> edit .tsx files -> git push -> GitHub -> Vercel -> resumee.pro.bd
```

### New CMS Flow (No Code Needed)

```
resumee.pro.bd/admin -> edit content -> [🚀 Push to GitHub] -> GitHub -> Vercel -> resumee.pro.bd
```

**It is the exact same pipeline. The CMS replaces VS Code + git push for all content changes.**

### What This Means in Practice

| Before (required coding) | After (CMS handles it) |
| :--- | :--- |
| Edit `app/page.tsx` to change hero headline | Edit headline in `/admin/dashboard/pages/landing` |
| Edit `.tsx` file to add a testimonial | Click "Add Testimonial" in admin panel |
| Write code to publish a new article | Create article in `/admin/dashboard/pages/articles` |
| Edit component file to change nav links | Edit links in `/admin/dashboard/pages/navigation` |
| Redeploy to toggle AI optimizer | Flip switch in `/admin/dashboard/flags` |

---

## 2. Architecture: GitHub as the Database

```
resumee.pro.bd/admin  (Custom CMS Dashboard)
  You edit hero text, toggle sections, write articles...
  Changes held as DRAFT in admin UI

  [ 3 unsaved changes pending ]
    - content/landing.json  (hero text updated)
    - content/faqs.json     (2 FAQs added)
    - content/articles/     (1 new article)

  [ Save Draft ]      [ 🚀 Push to GitHub ]
         |
         | POST /api/admin/publish
         | (GitHub API commits JSON files)
         v
  GitHub Repository: abdussamadarefi/Resume-Builder
  New commit: "cms: content update - 21 Aug 2026"
  Files:
    M  content/landing.json
    M  content/faqs.json
    A  content/articles/resume-tips-2026.md
         |
         | Vercel detects new commit -> auto-builds
         v
  resumee.pro.bd LIVE (~40 seconds later)
```

### Why Git IS the Database

| Database Concern | Git Solution |
| :--- | :--- |
| **Revision history** | Every push creates a git commit — full history for free |
| **Rollbacks** | `git revert` any change in seconds |
| **Backups** | GitHub mirrors the entire content history |
| **Zero cost** | Content files cost $0 forever in GitHub |
| **No outages** | Content is static JSON files — nothing to go down |

---

## 3. Technology Stack & $0/mo Cost Model

| Component | Tool / Service | Cost | Purpose |
| :--- | :--- | :--- | :--- |
| **Content Storage** | JSON files in GitHub repo | **$0 forever** | All CMS content (landing, articles, legal, nav) |
| **Admin Users DB** | Supabase PostgreSQL (free tier) | **$0** | admin_users table only — create/revoke admins from dashboard |
| **Hosting** | Vercel (existing project) | **$0 free tier** | Auto-deploys on every GitHub push |
| **Authentication** | `jose` (Web Crypto JWT) | **$0** | Admin session cookie (7-day expiry) |
| **GitHub Integration** | GitHub REST API v3 | **$0** | Commit content changes from admin UI |
| **Password Hashing** | `bcryptjs` | **$0** | Salted admin password — hashed server-side |
| **Rich Text Editing** | `@uiw/react-md-editor` | **$0 open source** | Markdown editor for articles & legal pages |
| **Drag & Drop** | `@hello-pangea/dnd` | **$0 open source** | Reorder sections, templates, FAQ items |
| **Form Validation** | `zod` | **$0 open source** | Schema validation on all admin API inputs |
| **Analytics** | Google Analytics 4 (existing) | **$0** | Visitor tracking already live |

**Total monthly cost: $0.00**

> Supabase free tier: 500MB storage, unlimited admin_users rows. More than enough forever.

---

## 4. Content File Structure (content/ folder)

All CMS-managed content lives in a `content/` folder at the repository root.
Pages read from these JSON/Markdown files instead of hardcoded text in `.tsx` files.

```
Resume-Builder/
+-- content/
    +-- landing.json          <- Hero, stats, sections config
    +-- testimonials.json     <- Review cards array
    +-- faqs.json             <- FAQ accordion array
    +-- templates.json        <- 10 templates registry
    +-- templates-page.json   <- Templates gallery page header
    +-- about.json            <- Mission, values, creator profile
    +-- navigation.json       <- Navbar & footer links
    +-- feature-flags.json    <- AI on/off, export toggles
    +-- site-settings.json    <- Site name, GA ID, announcement
    +-- legal/
    |   +-- privacy.json      <- Privacy policy clauses & TL;DR
    |   +-- terms.json        <- Terms of service clauses
    |   +-- cookies.json      <- Cookie policy content
    +-- articles/
        +-- index.json        <- Article list metadata
        +-- how-to-write-ats-resume.md
        +-- resume-vs-cv-difference.md
        +-- best-resume-templates-2025.md
        +-- how-to-write-academic-cv.md
        +-- career-change-resume-tips.md
```

---

## 5. Full Directory & File Structure

```
Resume-Builder/
+-- content/                         <- ALL CMS CONTENT LIVES HERE
|   +-- landing.json
|   +-- testimonials.json
|   +-- faqs.json
|   +-- templates.json
|   +-- templates-page.json
|   +-- about.json
|   +-- navigation.json
|   +-- feature-flags.json
|   +-- site-settings.json
|   +-- legal/
|   |   +-- privacy.json
|   |   +-- terms.json
|   |   +-- cookies.json
|   +-- articles/
|       +-- index.json
|       +-- *.md
|
+-- app/
|   +-- (admin)/                     <- Admin Route Group (not indexed by search engines)
|   |   +-- admin/
|   |       +-- login/
|   |       |   +-- page.tsx         <- Admin login page
|   |       +-- dashboard/
|   |           +-- layout.tsx       <- Admin shell (sidebar, topbar, publish button)
|   |           +-- page.tsx         <- Dashboard overview
|   |           +-- pages/
|   |           |   +-- landing/page.tsx     <- Module 1: Landing CMS
|   |           |   +-- templates/page.tsx   <- Module 2: Templates Gallery CMS
|   |           |   +-- articles/page.tsx    <- Module 3: Articles CMS
|   |           |   +-- about/page.tsx       <- Module 4: About CMS
|   |           |   +-- legal/page.tsx       <- Module 5: Legal Pages CMS
|   |           |   +-- navigation/page.tsx  <- Module 6: Nav & Footer CMS
|   |           +-- templates/page.tsx       <- Templates registry manager
|   |           +-- flags/page.tsx           <- Feature flags panel
|   |           +-- settings/
|   |               +-- page.tsx             <- Site-wide settings
|   |               +-- admins/page.tsx      <- Admin Users panel (create/revoke)
|   |
|   +-- api/admin/
|   |   +-- auth/login/route.ts      <- POST: verify username+password -> set JWT cookie
|   |   +-- auth/logout/route.ts     <- POST: clear JWT cookie
|   |   +-- content/route.ts         <- GET: read content | PATCH: update draft
|   |   +-- publish/route.ts         <- POST: commit all drafts to GitHub
|   |   +-- users/route.ts           <- GET: list admins | POST: create admin
|   |   +-- users/[username]/route.ts <- DELETE: revoke admin
|   |
|   +-- page.tsx                     <- Landing page reads from content/landing.json
|   +-- templates/page.tsx           <- Reads from content/templates.json
|   +-- articles/page.tsx            <- Reads from content/articles/index.json
|   +-- articles/[slug]/page.tsx     <- Reads from content/articles/[slug].md
|   +-- about/page.tsx               <- Reads from content/about.json
|   +-- privacy/page.tsx             <- Reads from content/legal/privacy.json
|   +-- terms/page.tsx               <- Reads from content/legal/terms.json
|   +-- cookies/page.tsx             <- Reads from content/legal/cookies.json
|
+-- lib/
|   +-- admin-auth.ts                <- JWT sign/verify helpers
|   +-- content.ts                   <- Helper functions to read content JSON files
|   +-- github-api.ts                <- GitHub REST API integration (commit files)
|   +-- supabase-admin.ts            <- Supabase client (admin_users table only)
|
+-- components/admin/
|   +-- Sidebar.tsx
|   +-- TopBar.tsx
|   +-- PublishButton.tsx            <- The [Push to GitHub] button
|   +-- SectionToggler.tsx           <- Drag-to-reorder + enable/disable sections
|   +-- HeroEditor.tsx
|   +-- MarkdownEditor.tsx
|   +-- TestimonialsEditor.tsx
|   +-- FaqEditor.tsx
|   +-- FeatureFlagToggle.tsx
|
+-- middleware.ts                    <- Edge guard: blocks /admin/dashboard without JWT
```

---

## 6. Admin Authentication & User Management (Supabase)

Admins are stored in a **Supabase `admin_users` table**.
Create, list, and revoke admins directly from the dashboard — no terminal, no Vercel, no redeploy.

### Supabase Table (run once in Supabase SQL Editor)

```sql
CREATE TABLE admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Insert your first admin (run once to bootstrap)
-- Replace 'your_bcrypt_hash' with output of:
-- node -e "const b=require('bcryptjs'); console.log(b.hashSync('YourPass', 12));"
INSERT INTO admin_users (username, password_hash)
VALUES ('arefi', 'your_bcrypt_hash');
```

### Login Page

```
┌─────────────────────────────────┐
│       ResumeForge Admin         │
│                                 │
│   Username  [arefi           ]  │
│   Password  [••••••••••••••• ]  │
│                                 │
│         [ Login ]               │
└─────────────────────────────────┘
```

### Login Flow

```
Admin visits resumee.pro.bd/admin/login
  -> Enters username + password
  -> POST /api/admin/auth/login
  -> Server queries Supabase: SELECT * FROM admin_users WHERE username = ?
  -> bcrypt.compare(password, row.password_hash)
     |
     Not found      -> 401 Unauthorized
     Wrong password -> 401 Unauthorized
     Match          -> Signs JWT { username, role: 'admin' } (7-day expiry)
                    -> Sets HttpOnly cookie: rf_admin_token
                    -> Redirects to /admin/dashboard
```

### lib/supabase-admin.ts

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only, never exposed to client
);
```

### lib/admin-auth.ts

```typescript
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export async function createAdminSession(username: string) {
  return await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}
```

### app/api/admin/auth/login/route.ts

```typescript
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
  }

  const { data: admin } = await supabaseAdmin
    .from('admin_users')
    .select('password_hash')
    .eq('username', username)
    .single();

  if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const isValid = await bcrypt.compare(password, admin.password_hash);
  if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = await createAdminSession(username);
  const res = NextResponse.json({ success: true, username });
  res.cookies.set('rf_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}
```

### Admin Users Panel — /admin/dashboard/settings/admins

Manage all admins from inside your own dashboard. No Supabase UI needed after initial setup.

```
┌──────────────────────────────────────────────────────┐
│  Admin Users                    /settings/admins      │
│                                                       │
│  Username        Created           Action             │
│  ──────────────────────────────────────────────────   │
│  arefi           21 Aug 2026       [You] [Superadmin] │
│  colleague       21 Aug 2026       [Active] [Revoke]  │
│                                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Add New Admin                                   │ │
│  │  Username  [                                   ] │ │
│  │  Password  [                                   ] │ │
│  │                             [ Create Admin ]    │ │
│  └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### app/api/admin/users/route.ts

```typescript
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase-admin';

// GET: list all admin users
export async function GET() {
  const { data } = await supabaseAdmin
    .from('admin_users')
    .select('id, username, created_at')
    .order('created_at', { ascending: true });
  return NextResponse.json({ admins: data || [] });
}

// POST: create new admin (server hashes password — no terminal needed)
export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password || password.length < 8) {
    return NextResponse.json({ error: 'Username and password (min 8 chars) required' }, { status: 400 });
  }

  const password_hash = await bcrypt.hash(password, 12); // hashed server-side
  const { error } = await supabaseAdmin
    .from('admin_users')
    .insert({ username, password_hash });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, username });
}
```

### app/api/admin/users/[username]/route.ts

```typescript
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// DELETE: revoke an admin
export async function DELETE(
  req: Request,
  { params }: { params: { username: string } }
) {
  await supabaseAdmin
    .from('admin_users')
    .delete()
    .eq('username', params.username);
  return NextResponse.json({ success: true });
}
```

### Admin Lifecycle (Everything From Dashboard)

| Action | How | Redeploy? |
| :--- | :--- | :--- |
| **Create admin** | Fill form in `/settings/admins` -> Click Create | No |
| **Revoke admin** | Click [Revoke] in `/settings/admins` | No |
| **Change password** | Revoke + recreate with new password | No |
| **First admin** | Insert via Supabase SQL Editor (one-time only) | No |

---

## 7. Edge Middleware Route Guard

Protects all `/admin/dashboard` routes and `/api/admin` routes automatically.
Unauthenticated requests are redirected to `/admin/login`.

### middleware.ts

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminDashboard = pathname.startsWith('/admin/dashboard');
  const isAdminApi =
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/auth');

  if (isAdminDashboard || isAdminApi) {
    const token = req.cookies.get('rf_admin_token')?.value;
    const session = token ? await verifyAdminSession(token) : null;

    if (!session) {
      if (isAdminApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
```

---

## 8. The Push to GitHub Engine

This is the core of the CMS. One API route that takes all pending draft changes and commits them to GitHub as real git commits.

### How the GitHub API Commit Works

```
POST /api/admin/publish
  1. Verify admin JWT cookie
  2. Receive: { files: [{ path, content }], message }
  3. For each file:
     a. GET current file SHA from GitHub API (required for updates)
     b. PUT updated file content (base64 encoded)
  4. GitHub creates new commit on 'main' branch
  5. Vercel webhook detects push -> triggers rebuild
  6. Return: { commitUrl, success }
```

### lib/github-api.ts

```typescript
const GITHUB_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
};

export async function getFileSha(filePath: string): Promise<string | null> {
  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`,
    { headers }
  );
  if (!res.ok) return null; // New file — no SHA needed
  const data = await res.json();
  return data.sha;
}

export async function commitFile(
  filePath: string,
  content: string,
  message: string
): Promise<{ sha: string; html_url: string }> {
  const sha = await getFileSha(filePath);
  const encoded = Buffer.from(content).toString('base64');
  const body: Record<string, unknown> = { message, content: encoded, branch: BRANCH };
  if (sha) body.sha = sha; // SHA required for existing files

  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`,
    { method: 'PUT', headers, body: JSON.stringify(body) }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub API error: ${err.message}`);
  }
  const data = await res.json();
  return { sha: data.content.sha, html_url: data.commit.html_url };
}

export async function commitMultipleFiles(
  files: Array<{ path: string; content: string }>,
  message: string
) {
  const commits = [];
  for (const file of files) {
    const result = await commitFile(file.path, file.content, message);
    commits.push({ path: file.path, url: result.html_url });
  }
  return { commits };
}
```

### app/api/admin/publish/route.ts

```typescript
import { NextResponse } from 'next/server';
import { commitMultipleFiles } from '@/lib/github-api';
import { z } from 'zod';

const Schema = z.object({
  files: z.array(z.object({ path: z.string(), content: z.string() })),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const { files, message } = Schema.parse(await req.json());
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
    const result = await commitMultipleFiles(files, message || `cms: update — ${timestamp}`);
    return NextResponse.json({ success: true, commits: result.commits });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

### The Publish Button — 4 States

```
[ 🚀 Push to GitHub ]       <- idle (N changes pending, blue)
[ ⏳ Committing... ]         <- GitHub API in progress (~3-5 sec, disabled)
[ ✅ Pushed! View commit ]   <- success (green, links to GitHub commit)
[ ❌ Push failed — Retry ]   <- error (red, clickable)
```

---

## 9. Content Management Panels (All 6 Page Modules)

### 9.1 Landing Page CMS

**Route:** `/admin/dashboard/pages/landing`
**Content files:** `content/landing.json`, `content/testimonials.json`, `content/faqs.json`

| Control | What It Edits |
| :--- | :--- |
| **Section Toggles & Reorder** | Enable/disable and drag-to-reorder all 10 landing sections: hero, stats, how_it_works, features, template_showcase, student_vs_pro, resume_vs_cv, testimonials, faq, cta |
| **Hero Editor** | Badge text, headline line 1, gradient highlight text, subheadline, primary CTA label & URL, secondary CTA label & URL |
| **Stats Bar** | Template count, cost label, privacy percentage, export format count + sub-labels |
| **Testimonials Manager** | Add / edit / delete / reorder review cards (name, role, company, quote, star rating, tag) |
| **FAQ Manager** | Add / edit / delete / reorder FAQ items (question, answer, category) |

---

### 9.2 Templates Gallery CMS

**Route:** `/admin/dashboard/pages/templates`
**Content file:** `content/templates-page.json`

| Control | What It Edits |
| :--- | :--- |
| Page header badge text | e.g. "Template Gallery" |
| Page title & subtitle | Main heading and description paragraph |
| Category filter order | Display order of filter tabs (All, Resume, CV, Both) |

---

### 9.3 Articles & Blog CMS

**Route:** `/admin/dashboard/pages/articles`
**Content files:** `content/articles/index.json`, `content/articles/[slug].md`

| Control | What It Edits |
| :--- | :--- |
| **Article List** | View all articles with publish status, edit, delete |
| **New Article** | Create new career guide with full Markdown editor |
| **Article Metadata** | Title, slug, description, category, color, read time, publish date, featured toggle |
| **Article Body** | Full Markdown / Rich Text editor with live preview |
| **Publish / Draft** | Toggle between draft and published status |

---

### 9.4 About Page CMS

**Route:** `/admin/dashboard/pages/about`
**Content file:** `content/about.json`

| Control | What It Edits |
| :--- | :--- |
| Hero story section | Badge, title, subtitle |
| Mission statement | Title + mission paragraphs |
| Core values cards | Icon, title, description, gradient (4 value cards) |
| Creator profile | Name, title, bio, avatar URL, GitHub URL, email |
| Contribution CTA | Banner headline and button text |

---

### 9.5 Legal Pages CMS

**Route:** `/admin/dashboard/pages/legal`
**Content files:** `content/legal/privacy.json`, `content/legal/terms.json`, `content/legal/cookies.json`

| Control | What It Edits |
| :--- | :--- |
| **Privacy Policy** | TL;DR box, 7 policy sections, last updated date |
| **Terms of Service** | Plain-English summary, 8 terms sections, last updated date |
| **Cookie Policy** | GA4 cookie disclosures, summary counters, last updated date |

---

### 9.6 Navigation & Footer CMS

**Route:** `/admin/dashboard/pages/navigation`
**Content file:** `content/navigation.json`

| Control | What It Edits |
| :--- | :--- |
| Navbar links | Label, URL, display order for header nav items |
| Navbar CTA button | Label and destination URL |
| Footer columns | Links in each of 4 columns (Product, Resources, Company, Legal) |
| Footer bottom bar | Copyright text, author credit, GitHub link |

---

## 10. Templates Registry Manager

**Route:** `/admin/dashboard/templates`
**Content file:** `content/templates.json`

| ID | Name | Category | ATS Score | Mode |
| :--- | :--- | :--- | :--- | :--- |
| `nexus` | Nexus | Modern | 96% | Resume & CV |
| `scholar` | Scholar | Academic | 98% | CV Focus |
| `arya` | Arya | Creative | 88% | Resume |
| `atlas` | Atlas | Professional | 94% | Resume & CV |
| `cascade` | Cascade | Elegant | 92% | Resume |
| `compact` | Compact | Minimal | 95% | Resume (Students) |
| `executive` | Executive | Premium | 94% | Resume |
| `meridian` | Meridian | Modern | 93% | Resume & CV |
| `minimo` | Minimo | Clean | 99% | Resume |
| `prism` | Prism | Bold | 90% | Resume |

**Admin can control per template:**
- Enable / Disable (hide from public gallery)
- Mark as "New" badge or "Featured"
- Edit description, highlight bullets, feature tags
- Reorder display position (drag-and-drop)

---

## 11. Feature Flags Panel

**Route:** `/admin/dashboard/flags`
**Content file:** `content/feature-flags.json`

Toggle features on/off without code. Changes take effect after next push.

| Flag Key | Default | What It Controls |
| :--- | :--- | :--- |
| `ai_optimizer` | `true` | Gemini AI bullet optimizer |
| `docx_export` | `true` | Word (.docx) export |
| `pdf_export` | `true` | PDF export |
| `cv_mode` | `true` | Academic CV mode |
| `announcement_banner` | `false` | Global site-wide announcement bar |
| `ats_score_badge` | `true` | ATS score pills on template cards |

---

## 12. Admin Dashboard UI — Layout

```
resumee.pro.bd/admin/dashboard
+--------------------------------------------------------------------+
| TOPBAR                                                              |
| ResumeForge CMS    Current Page: Landing    [arefi]  [Logout]       |
|                                                                     |
| [ 3 unpublished changes: landing.json, faqs.json, articles/ ]       |
|                                              [ 🚀 Push to GitHub ]  |
+-------------------+------------------------------------------------+
| SIDEBAR           | MAIN CONTENT AREA                              |
|                   |                                                |
| 📊 Overview       | [Active CMS panel renders here]                |
|                   |                                                |
| 📄 Pages          |                                                |
|   |- Landing      |                                                |
|   |- Templates    |                                                |
|   |- Articles     |                                                |
|   |- About        |                                                |
|   |- Legal        |                                                |
|   +- Navigation   |                                                |
|                   |                                                |
| 🎨 Templates      |                                                |
| 🚩 Feature Flags  |                                                |
| ⚙️  Settings       |                                                |
|   |- Site         |                                                |
|   +- Admin Users  | <- Create / Revoke admins (Supabase, instant)  |
+-------------------+------------------------------------------------+
```

---

## 13. API Routes — Admin & Publish

| Method | Route | Auth | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/auth/login` | Public | Verify username+password -> set JWT cookie |
| `POST` | `/api/admin/auth/logout` | JWT | Clear admin cookie |
| `GET` | `/api/admin/content?file=landing.json` | JWT | Read any content file |
| `PATCH` | `/api/admin/content` | JWT | Update draft content |
| `POST` | `/api/admin/publish` | JWT | **Commit all pending files to GitHub** |
| `GET` | `/api/admin/users` | JWT | List all admin users |
| `POST` | `/api/admin/users` | JWT | Create new admin (server hashes password) |
| `DELETE` | `/api/admin/users/[username]` | JWT | Revoke an admin instantly |

---

## 14. Frontend Integration — Reading JSON Content

Pages read from JSON files at **build time** (static generation).
No runtime database calls. Pure Next.js static rendering.

### Example: Landing Page reads from content/landing.json

```typescript
// app/page.tsx
import landingData from '@/content/landing.json';
import testimonials from '@/content/testimonials.json';
import faqs from '@/content/faqs.json';

export default function LandingPage() {
  const { hero, stats, sections } = landingData;
  return (
    <>
      {sections.find(s => s.id === 'hero')?.enabled && (
        <HeroSection
          headline1={hero.headline_line1}
          gradientText={hero.headline_gradient}
          subheadline={hero.subheadline}
          ctaPrimaryText={hero.cta_primary_text}
          ctaPrimaryUrl={hero.cta_primary_url}
        />
      )}
      {/* other sections... */}
    </>
  );
}
```

### lib/content.ts

```typescript
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function readContent<T>(filePath: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filePath), 'utf-8');
  return JSON.parse(raw) as T;
}

export function readMarkdown(filePath: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, filePath), 'utf-8');
}
```

---

## 15. Environment Variables

Add to **Vercel -> Project Settings -> Environment Variables**:

```env
# Supabase (admin_users table only)
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...  <- server-side only, never public

# JWT Signing Secret
ADMIN_JWT_SECRET=random_64_character_string_here

# GitHub Integration (for Push to GitHub button)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=abdussamadarefi
GITHUB_REPO=Resume-Builder
GITHUB_BRANCH=main

# Existing (already configured)
NEXT_PUBLIC_GA_ID=G-RGT94HGV0Z
NEXT_PUBLIC_APP_URL=https://resumee.pro.bd
GEMINI_API_KEY=your_gemini_api_key
```

### One-Time Bootstrap: Create Your First Admin

```bash
# Step 1: Generate bcrypt hash for your password (run locally, one time only)
node -e "const b=require('bcryptjs'); console.log(b.hashSync('YourPassword', 12));"
```

```sql
-- Step 2: Paste hash into Supabase SQL Editor (one time only)
INSERT INTO admin_users (username, password_hash)
VALUES ('arefi', '$2b$12$your_hash_here');
```

After this, all future admins are created from `/admin/dashboard/settings/admins` — no SQL, no terminal, no Vercel.

> `SUPABASE_SERVICE_ROLE_KEY` is server-side only. Never use `NEXT_PUBLIC_` prefix for it.

---

## 16. Build & Deployment Flow

```
Developer code push:
git push -> GitHub -> Vercel builds -> resumee.pro.bd live

CMS content push (no coding needed):
/admin -> edit -> [Push to GitHub] -> GitHub commit -> Vercel builds -> resumee.pro.bd live
```

Both flows use the **exact same Vercel build pipeline**.
Vercel typically builds in **30-60 seconds** after a commit is detected.

### Does Every Action Require a Push?

| Action | Needs push? |
| :--- | :--- |
| Edit hero text | Yes (content file changes) |
| Publish a new article | Yes (new .md file added) |
| Toggle a feature flag | Yes (JSON file changes) |
| View GA4 analytics | No |
| Save a draft without publishing | No |

---

## 17. Content JSON File Schemas (Complete Reference)

### content/landing.json

```json
{
  "sections": [
    { "id": "hero", "title": "Hero", "enabled": true, "order": 0 },
    { "id": "stats", "title": "Stats Bar", "enabled": true, "order": 1 },
    { "id": "how_it_works", "title": "How It Works", "enabled": true, "order": 2 },
    { "id": "features", "title": "Features", "enabled": true, "order": 3 },
    { "id": "template_showcase", "title": "Template Showcase", "enabled": true, "order": 4 },
    { "id": "student_vs_pro", "title": "Student vs Pro", "enabled": true, "order": 5 },
    { "id": "resume_vs_cv", "title": "Resume vs CV", "enabled": true, "order": 6 },
    { "id": "testimonials", "title": "Testimonials", "enabled": true, "order": 7 },
    { "id": "faq", "title": "FAQ", "enabled": true, "order": 8 },
    { "id": "cta", "title": "CTA Banner", "enabled": true, "order": 9 }
  ],
  "hero": {
    "badge_text": "Zero Auth - Zero Backend - 100% Client-Side",
    "headline_line1": "Craft Resumes & CVs",
    "headline_gradient": "Without The Tracking",
    "subheadline": "The privacy-first resume and CV builder. No account required.",
    "cta_primary_text": "Build Free Resume",
    "cta_primary_url": "/builder?type=resume",
    "cta_secondary_text": "Build Academic CV",
    "cta_secondary_url": "/builder?type=cv"
  },
  "stats": [
    { "id": "templates", "value": "10+", "label": "ATS-Ready Templates", "sublabel": "Industry & Academic", "order": 0 },
    { "id": "cost", "value": "$0", "label": "Free Forever", "sublabel": "No paywalls ever", "order": 1 },
    { "id": "privacy", "value": "100%", "label": "Private by Design", "sublabel": "Zero data collection", "order": 2 },
    { "id": "formats", "value": "3", "label": "Export Formats", "sublabel": "PDF, DOCX, Print", "order": 3 }
  ]
}
```

### content/testimonials.json

```json
[
  {
    "id": "t1",
    "author_name": "Sarah Chen",
    "role": "CS Graduate",
    "company_or_school": "MIT",
    "quote": "Got my first job offer using the Nexus template. Incredibly helpful.",
    "rating": 5,
    "tag": "Student",
    "enabled": true,
    "order": 0
  }
]
```

### content/faqs.json

```json
[
  {
    "id": "faq1",
    "question": "Is ResumeForge really free?",
    "answer": "Yes, completely free. No subscriptions, no hidden fees, no premium tiers.",
    "category": "General",
    "enabled": true,
    "order": 0
  }
]
```

### content/feature-flags.json

```json
{
  "ai_optimizer": true,
  "docx_export": true,
  "pdf_export": true,
  "cv_mode": true,
  "announcement_banner": false,
  "ats_score_badge": true
}
```

### content/articles/index.json

```json
[
  {
    "slug": "how-to-write-ats-resume",
    "title": "How to Write an ATS-Friendly Resume in 2025",
    "description": "Learn the exact strategies to beat Applicant Tracking Systems.",
    "category": "ATS Optimization",
    "category_color": "#3b82f6",
    "read_time": "8 min read",
    "target_audience": "Job Seekers",
    "published_at": "2026-08-16",
    "is_published": true,
    "featured": true,
    "order": 0
  }
]
```

### content/navigation.json

```json
{
  "navbar": [
    { "id": "n1", "label": "Templates", "url": "/templates", "order": 0, "enabled": true },
    { "id": "n2", "label": "Articles", "url": "/articles", "order": 1, "enabled": true },
    { "id": "n3", "label": "About", "url": "/about", "order": 2, "enabled": true }
  ],
  "navbar_cta": { "label": "Build Free Resume", "url": "/builder" },
  "footer": {
    "product": [
      { "id": "fp1", "label": "Resume Builder", "url": "/builder?type=resume", "order": 0 },
      { "id": "fp2", "label": "CV Builder", "url": "/builder?type=cv", "order": 1 },
      { "id": "fp3", "label": "Templates", "url": "/templates", "order": 2 }
    ],
    "resources": [{ "id": "fr1", "label": "Career Articles", "url": "/articles", "order": 0 }],
    "company": [{ "id": "fc1", "label": "About", "url": "/about", "order": 0 }],
    "legal": [
      { "id": "fl1", "label": "Privacy Policy", "url": "/privacy", "order": 0 },
      { "id": "fl2", "label": "Terms of Service", "url": "/terms", "order": 1 },
      { "id": "fl3", "label": "Cookie Policy", "url": "/cookies", "order": 2 }
    ]
  },
  "footer_copyright": "2026 ResumeForge. Built with care.",
  "footer_credit": "Made by Abdus Samad Arefi",
  "footer_github_url": "https://github.com/abdussamadarefi/Resume-Builder"
}
```

---

## 18. Implementation Phases

### Phase 1 — Foundation (Week 1)
- [ ] Create all `content/*.json` files with current default values
- [ ] Refactor all public pages to read from JSON files instead of hardcoded text
- [ ] Set up admin login (`/admin/login`) with password + JWT cookie
- [ ] Implement `lib/github-api.ts` (GitHub REST API commit logic)
- [ ] Implement `POST /api/admin/publish` route

### Phase 2 — Core CMS Panels (Week 2)
- [ ] Admin dashboard layout (sidebar, topbar)
- [ ] [Push to GitHub] button with all 4 states
- [ ] Landing Page CMS panel (hero editor, section toggles)
- [ ] Feature Flags panel

### Phase 3 — Full Content Management (Week 3)
- [ ] Articles CMS with Markdown editor
- [ ] Templates Registry manager (enable/disable/reorder)
- [ ] About, Legal, Navigation CMS panels

### Phase 4 — Polish (Week 4)
- [ ] Testimonials & FAQ managers with drag-to-reorder
- [ ] Site Settings panel
- [ ] Final security review and testing
