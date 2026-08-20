# ResumeForge — Backend Admin Dashboard

> **Medium-grade admin panel** · Controls templates, analytics, feature flags, announcements, and feedback · Secured with JWT auth

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [File Structure](#3-file-structure)
4. [Database Schema](#4-database-schema)
5. [Authentication](#5-authentication)
6. [API Routes](#6-api-routes)
7. [Dashboard Modules](#7-dashboard-modules)
8. [Feature Flags](#8-feature-flags)
9. [Analytics Tracking](#9-analytics-tracking)
10. [Template Management](#10-template-management)
11. [Announcement System](#11-announcement-system)
12. [Feedback & Reports](#12-feedback--reports)
13. [Frontend Integration](#13-frontend-integration)
14. [Environment Variables](#14-environment-variables)
15. [Deployment](#15-deployment)
16. [Security](#16-security)
17. [Dashboard UI Pages](#17-dashboard-ui-pages)

---

## 1. Overview

The backend dashboard gives the app owner full control over ResumeForge without touching code. It runs as a separate Next.js admin app, connects to a Supabase database, and exposes a set of internal APIs the main app calls at runtime.

### What the Dashboard Controls

| Module | What You Can Do |
|--------|----------------|
| **Analytics** | See daily active users, document type splits, export counts, template popularity |
| **Templates** | Enable / disable templates, change display order, mark as featured or new |
| **Feature Flags** | Turn features on/off without redeployment |
| **Announcements** | Push a banner or notice to all users (maintenance, new template, etc.) |
| **Feedback** | Read user-submitted feedback, bug reports, and star ratings |
| **Export Stats** | Track PDF vs DOCX vs Print vs Share link usage |
| **Error Logs** | View client-side errors reported by the main app |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ResumeForge App                      │
│              (Next.js — Vercel — client-side)           │
│                                                         │
│  On load: fetch /api/config  ──────────────────────┐   │
│  On export: POST /api/event  ──────────────────────┤   │
│  On error: POST /api/error   ──────────────────────┤   │
│  On feedback: POST /api/feedback ──────────────────┤   │
└────────────────────────────────────────────────────┼───┘
                                                     │
                                              ┌──────▼──────┐
                                              │   Supabase   │
                                              │  (Postgres)  │
                                              └──────┬───────┘
                                                     │
┌────────────────────────────────────────────────────▼───┐
│               Admin Dashboard                          │
│         (Next.js — separate Vercel project)            │
│                                                        │
│   /dashboard         → Overview + KPIs                 │
│   /dashboard/analytics  → Charts + trends              │
│   /dashboard/templates  → Template control             │
│   /dashboard/flags      → Feature flags                │
│   /dashboard/announce   → Announcements                │
│   /dashboard/feedback   → User feedback                │
│   /dashboard/errors     → Error logs                   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

### Backend / Data

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Database client — Postgres via Supabase free tier |
| `next` 14 | Admin app framework + API routes |
| `typescript` | Type safety |
| `jose` | JWT signing and verification |
| `bcryptjs` | Password hashing |
| `zod` | API request validation |

### Dashboard UI

| Package | Purpose |
|---------|---------|
| `tailwindcss` | Styling |
| `recharts` | Analytics charts (line, bar, pie) |
| `@tanstack/react-table` | Data tables with sort, filter, pagination |
| `lucide-react` | Icons |
| `date-fns` | Date formatting and range calculations |
| `react-hot-toast` | Action feedback toasts |

### Infrastructure

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Free | 500 MB DB, 2 GB bandwidth |
| Vercel | Free | Admin app hosting |
| Upstash Redis | Free | Rate limiting (10K requests/day) |

**Total infrastructure cost: $0/month** on free tiers.

---

## 3. File Structure

```
resumeforge-admin/
├── app/
│   ├── layout.tsx                    # Admin shell layout
│   ├── login/
│   │   └── page.tsx                  # Admin login page
│   ├── dashboard/
│   │   ├── layout.tsx                # Sidebar + top bar
│   │   ├── page.tsx                  # Overview / KPI page
│   │   ├── analytics/
│   │   │   └── page.tsx              # Charts, trends, breakdown
│   │   ├── templates/
│   │   │   └── page.tsx              # Template management table
│   │   ├── flags/
│   │   │   └── page.tsx              # Feature flags toggles
│   │   ├── announce/
│   │   │   └── page.tsx              # Announcement composer
│   │   ├── feedback/
│   │   │   └── page.tsx              # Feedback inbox
│   │   └── errors/
│   │       └── page.tsx              # Error log viewer
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts        # POST /api/auth/login
│       │   └── logout/route.ts       # POST /api/auth/logout
│       ├── config/route.ts           # GET  /api/config  (public — called by main app)
│       ├── event/route.ts            # POST /api/event   (public — analytics)
│       ├── error/route.ts            # POST /api/error   (public — error reporting)
│       ├── feedback/route.ts         # POST /api/feedback (public — user feedback)
│       ├── templates/route.ts        # GET/PUT /api/templates (admin)
│       ├── flags/route.ts            # GET/PUT /api/flags     (admin)
│       ├── announce/route.ts         # GET/POST/DELETE        (admin)
│       └── stats/route.ts            # GET /api/stats         (admin)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── NavItem.tsx
│   ├── charts/
│   │   ├── DailyUsersChart.tsx
│   │   ├── ExportBreakdownChart.tsx
│   │   ├── TemplatePopularityChart.tsx
│   │   └── DocumentTypePieChart.tsx
│   ├── tables/
│   │   ├── FeedbackTable.tsx
│   │   └── ErrorLogTable.tsx
│   └── ui/
│       ├── KPICard.tsx
│       ├── Badge.tsx
│       ├── Toggle.tsx
│       └── Modal.tsx
│
├── lib/
│   ├── supabase.ts                   # Supabase client
│   ├── auth.ts                       # JWT helpers
│   ├── rateLimit.ts                  # Upstash rate limiting
│   └── middleware.ts                 # Route protection
│
├── middleware.ts                     # Protects /dashboard/* routes
├── .env.local
└── package.json
```

---

## 4. Database Schema

All tables live in Supabase (Postgres). Run these in the Supabase SQL editor.

### `events` — Analytics events from the main app

```sql
CREATE TABLE events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type        TEXT NOT NULL,         -- 'page_view' | 'export_pdf' | 'export_docx' | 'export_print' | 'doc_created' | 'template_switch'
  doc_type    TEXT,                  -- 'resume' | 'cv' | null
  template_id TEXT,                  -- 'r-nexus' | 'c-academia' | null
  meta        JSONB DEFAULT '{}',    -- extra data (export format, section name, etc.)
  session_id  TEXT,                  -- anonymous session identifier
  country     TEXT,                  -- from Vercel headers (X-Vercel-IP-Country)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_events_type       ON events(type);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_events_doc_type   ON events(doc_type);
CREATE INDEX idx_events_template   ON events(template_id);
```

### `templates` — Template registry and control

```sql
CREATE TABLE templates (
  id           TEXT PRIMARY KEY,      -- 'r-nexus' | 'c-academia'
  name         TEXT NOT NULL,
  doc_type     TEXT NOT NULL,         -- 'resume' | 'cv'
  enabled      BOOLEAN DEFAULT TRUE,
  featured     BOOLEAN DEFAULT FALSE,
  is_new       BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  thumbnail    TEXT,                  -- public URL
  description  TEXT,
  ats_score    INT,                   -- 0-100
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### `feature_flags` — Feature toggles

```sql
CREATE TABLE feature_flags (
  key          TEXT PRIMARY KEY,      -- 'share_link' | 'docx_export' | 'cv_mode'
  enabled      BOOLEAN DEFAULT TRUE,
  description  TEXT,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_by   TEXT                   -- admin username
);
```

### `announcements` — Banners shown to users

```sql
CREATE TABLE announcements (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message     TEXT NOT NULL,
  type        TEXT DEFAULT 'info',    -- 'info' | 'warning' | 'success'
  link_text   TEXT,                   -- optional CTA label
  link_url    TEXT,                   -- optional CTA URL
  active      BOOLEAN DEFAULT TRUE,
  starts_at   TIMESTAMPTZ DEFAULT NOW(),
  ends_at     TIMESTAMPTZ,            -- null = no expiry
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `feedback` — User-submitted feedback

```sql
CREATE TABLE feedback (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type        TEXT NOT NULL,          -- 'bug' | 'feature' | 'general' | 'rating'
  rating      INT,                    -- 1-5 stars (nullable)
  message     TEXT NOT NULL,
  email       TEXT,                   -- optional contact email
  doc_type    TEXT,                   -- 'resume' | 'cv'
  template_id TEXT,
  status      TEXT DEFAULT 'new',     -- 'new' | 'read' | 'resolved'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `error_logs` — Client-side errors

```sql
CREATE TABLE error_logs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message     TEXT NOT NULL,
  stack       TEXT,
  context     JSONB DEFAULT '{}',     -- { page, action, browser, os }
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-delete logs older than 30 days (keep DB lean)
CREATE INDEX idx_error_logs_created ON error_logs(created_at);
```

### `admin_users` — Dashboard login

```sql
CREATE TABLE admin_users (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_login    TIMESTAMPTZ
);
```

---

## 5. Authentication

The admin dashboard uses simple **JWT-based auth** — no OAuth, no third-party service, no cost.

### Login Flow

```
POST /api/auth/login
  { username, password }
      ↓
  bcrypt.compare(password, hash)
      ↓
  jose.SignJWT({ sub: username, role: 'admin' })
      ↓
  Set HttpOnly cookie: rf_admin_token (7 day expiry)
      ↓
  Redirect to /dashboard
```

### JWT Helper

```typescript
// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: object) {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload;
}
```

### Route Protection Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isAdminApi = req.nextUrl.pathname.startsWith('/api/') &&
    !['config', 'event', 'error', 'feedback'].some(p =>
      req.nextUrl.pathname.includes(`/api/${p}`)
    );

  if (isDashboard || isAdminApi) {
    const token = req.cookies.get('rf_admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      await verifyToken(token);
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/templates/:path*', '/api/flags/:path*',
            '/api/announce/:path*', '/api/stats/:path*'],
};
```

### Login API

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const { data: user } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single();

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signToken({ sub: username, role: 'admin' });

  await supabase.from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('username', username);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('rf_admin_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,  // 7 days
    path: '/',
  });
  return res;
}
```

---

## 6. API Routes

### Public Routes — Called by the Main App

These require no auth. They are rate-limited via Upstash Redis.

---

#### `GET /api/config`

The main app calls this once on load to get the current runtime configuration — feature flags, active announcements, and enabled templates. The response is cached for 60 seconds.

**Response:**

```json
{
  "flags": {
    "share_link": true,
    "docx_export": true,
    "cv_mode": true,
    "print_export": true,
    "plain_text_export": true
  },
  "announcement": {
    "id": "abc123",
    "message": "New CV templates just added!",
    "type": "success",
    "link_text": "See templates",
    "link_url": "/templates"
  },
  "templates": {
    "resume": ["r-nexus", "r-meridian", "r-atlas"],
    "cv": ["c-academia", "c-scholar", "c-modern-ac"]
  }
}
```

```typescript
// app/api/config/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const [flags, announcement, templates] = await Promise.all([
    supabase.from('feature_flags').select('key, enabled'),
    supabase.from('announcements')
      .select('*')
      .eq('active', true)
      .lte('starts_at', new Date().toISOString())
      .or('ends_at.is.null,ends_at.gte.' + new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),
    supabase.from('templates')
      .select('id, doc_type')
      .eq('enabled', true)
      .order('display_order'),
  ]);

  const flagMap = Object.fromEntries(
    (flags.data ?? []).map(f => [f.key, f.enabled])
  );

  const templateMap = {
    resume: (templates.data ?? []).filter(t => t.doc_type === 'resume').map(t => t.id),
    cv: (templates.data ?? []).filter(t => t.doc_type === 'cv').map(t => t.id),
  };

  return NextResponse.json({
    flags: flagMap,
    announcement: announcement.data ?? null,
    templates: templateMap,
  });
}
```

---

#### `POST /api/event`

Receives anonymous analytics events from the main app. No personal data is stored.

**Request:**

```json
{
  "type": "export_pdf",
  "doc_type": "resume",
  "template_id": "r-nexus",
  "session_id": "anon_abc123",
  "meta": {}
}
```

```typescript
// app/api/event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

const EventSchema = z.object({
  type: z.enum(['page_view', 'doc_created', 'export_pdf', 'export_docx',
                 'export_print', 'export_text', 'share_link', 'template_switch']),
  doc_type: z.enum(['resume', 'cv']).optional(),
  template_id: z.string().optional(),
  session_id: z.string().max(64),
  meta: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, 30); // 30 events per minute per IP
  if (limited) return NextResponse.json({ error: 'Rate limited' }, { status: 429 });

  const body = EventSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const country = req.headers.get('x-vercel-ip-country') ?? 'unknown';

  await supabase.from('events').insert({
    ...body.data,
    country,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
```

---

#### `POST /api/error`

Receives client-side error reports from the main app.

```typescript
// app/api/error/route.ts
const ErrorSchema = z.object({
  message: z.string().max(500),
  stack: z.string().max(2000).optional(),
  context: z.object({
    page: z.string().optional(),
    action: z.string().optional(),
    browser: z.string().optional(),
    os: z.string().optional(),
  }).optional(),
  session_id: z.string().max(64),
});
```

---

#### `POST /api/feedback`

Receives user-submitted feedback.

```typescript
// app/api/feedback/route.ts
const FeedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general', 'rating']),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(5).max(1000),
  email: z.string().email().optional(),
  doc_type: z.enum(['resume', 'cv']).optional(),
  template_id: z.string().optional(),
});
```

---

### Admin Routes — Dashboard Only

All require valid `rf_admin_token` cookie (enforced by middleware).

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/stats` | KPIs, daily counts, breakdowns |
| `GET` | `/api/templates` | All templates with status |
| `PUT` | `/api/templates/[id]` | Update template (enabled, order, featured) |
| `GET` | `/api/flags` | All feature flags |
| `PUT` | `/api/flags/[key]` | Toggle a feature flag |
| `GET` | `/api/announce` | All announcements |
| `POST` | `/api/announce` | Create new announcement |
| `DELETE` | `/api/announce/[id]` | Delete announcement |
| `GET` | `/api/feedback` | Paginated feedback list |
| `PUT` | `/api/feedback/[id]` | Update feedback status |
| `GET` | `/api/errors` | Paginated error log |
| `DELETE` | `/api/errors` | Clear error logs older than N days |

---

## 7. Dashboard Modules

### Overview Page — `/dashboard`

Key metrics at a glance. Updates every 5 minutes.

```
┌────────────────────────────────────────────────────────────────┐
│  ResumeForge Admin                          Thu 20 Aug 2026    │
├───────────┬───────────┬───────────┬────────────────────────────┤
│  Today    │  This     │  Total    │  Feedback                  │
│  Users    │  Week     │  Exports  │  Unread                    │
│           │           │           │                            │
│   247     │  1,842    │  34,291   │   12                       │
│  ▲ 18%    │  ▲ 6%     │           │   🔴 3 bugs                │
├───────────┴───────────┴───────────┴────────────────────────────┤
│  Daily Active Users (last 30 days)                             │
│  [Line chart]                                                  │
├───────────────────────────┬────────────────────────────────────┤
│  Export Breakdown         │  Document Type Split               │
│  [Bar chart]              │  [Pie chart]                       │
│  PDF  ████████████ 68%   │  Resume  ███████ 71%              │
│  DOCX ████ 18%           │  CV      ███ 29%                  │
│  Print██ 10%             │                                    │
│  Text █ 4%               │                                    │
├───────────────────────────┴────────────────────────────────────┤
│  Top Templates This Week                                       │
│  1. r-nexus      ████████████  892 uses                       │
│  2. r-meridian   ████████      634 uses                       │
│  3. c-academia   ████          312 uses                       │
└────────────────────────────────────────────────────────────────┘
```

---

## 8. Feature Flags

Feature flags let you turn app features on or off without redeployment. The main app fetches flags on load from `/api/config` and gates features accordingly.

### Default Flags

| Key | Default | Description |
|-----|---------|-------------|
| `cv_mode` | `true` | Show CV option on first screen |
| `share_link` | `true` | Enable share-via-URL feature |
| `docx_export` | `true` | Enable DOCX download |
| `print_export` | `true` | Enable print option |
| `plain_text_export` | `true` | Enable plain text copy |
| `feedback_widget` | `true` | Show feedback button in app |
| `announcement_bar` | `true` | Show announcements banner |
| `template_nexus` | `true` | Enable Nexus resume template |
| `template_academia` | `true` | Enable Academia CV template |

### Flag API

```typescript
// PUT /api/flags/[key]
// Body: { enabled: boolean }

export async function PUT(req: NextRequest, { params }: { params: { key: string } }) {
  const { enabled } = await req.json();

  const { error } = await supabase
    .from('feature_flags')
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq('key', params.key);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

### How the Main App Uses Flags

```typescript
// lib/config.ts  (in the main ResumeForge app)

interface AppConfig {
  flags: Record<string, boolean>;
  announcement: Announcement | null;
  templates: { resume: string[]; cv: string[] };
}

let cachedConfig: AppConfig | null = null;

export async function getConfig(): Promise<AppConfig> {
  if (cachedConfig) return cachedConfig;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/config`);
    cachedConfig = await res.json();
  } catch {
    // Fallback — all features enabled if admin API is unreachable
    cachedConfig = { flags: {}, announcement: null, templates: { resume: [], cv: [] } };
  }

  // Re-fetch after 60 seconds
  setTimeout(() => { cachedConfig = null; }, 60_000);
  return cachedConfig!;
}

// Usage in components
const config = await getConfig();
if (!config.flags.docx_export) {
  // Hide DOCX button
}
```

---

## 9. Analytics Tracking

### Event Types

The main app sends these events silently in the background. All are anonymous — no IP address, no email, no fingerprint stored.

| Event Type | When Fired | Extra Data |
|-----------|------------|-----------|
| `page_view` | Every page load | `{ page }` |
| `doc_created` | User picks Resume or CV on first screen | `{ doc_type }` |
| `template_switch` | User changes template | `{ from, to, doc_type }` |
| `export_pdf` | PDF downloaded | `{ doc_type, template_id, quality }` |
| `export_docx` | DOCX downloaded | `{ doc_type }` |
| `export_print` | Print triggered | `{ doc_type }` |
| `export_text` | Plain text copied | `{ doc_type }` |
| `share_link` | Share link generated | `{ doc_type }` |

### Session ID

A random anonymous ID is generated per browser session — not tied to any user identity. Used only to deduplicate page views.

```typescript
// lib/analytics.ts (in main app)

function getSessionId(): string {
  let id = sessionStorage.getItem('rf_sid');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).slice(2, 12);
    sessionStorage.setItem('rf_sid', id);
  }
  return id;
}

export async function track(
  type: string,
  meta: Record<string, unknown> = {}
) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        session_id: getSessionId(),
        doc_type: meta.doc_type,
        template_id: meta.template_id,
        meta,
      }),
    });
  } catch {
    // Silently fail — analytics must never break the app
  }
}

// Usage
track('export_pdf', { doc_type: 'resume', template_id: 'r-nexus' });
```

### Stats API

```typescript
// GET /api/stats?range=30d

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get('range') ?? '30d';
  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const [daily, exports, docSplit, topTemplates, totalExports] = await Promise.all([

    // Daily unique sessions
    supabase.rpc('daily_sessions', { since_date: since }),

    // Export breakdown
    supabase.from('events')
      .select('type')
      .in('type', ['export_pdf', 'export_docx', 'export_print', 'export_text'])
      .gte('created_at', since),

    // Resume vs CV split
    supabase.from('events')
      .select('doc_type')
      .eq('type', 'doc_created')
      .gte('created_at', since),

    // Top templates
    supabase.from('events')
      .select('template_id')
      .eq('type', 'template_switch')
      .gte('created_at', since)
      .not('template_id', 'is', null),

    // Total exports
    supabase.from('events')
      .select('id', { count: 'exact', head: true })
      .like('type', 'export_%')
      .gte('created_at', since),
  ]);

  return NextResponse.json({ daily, exports, docSplit, topTemplates, totalExports });
}
```

---

## 10. Template Management

### Template Table UI

```
┌────────────────────────────────────────────────────────────────────┐
│  Templates                                    [+ Sync from code]   │
├──────────┬──────────┬─────────┬────────┬──────────┬───────────────┤
│  ID      │  Name    │  Type   │ Order  │ Status   │  Actions      │
├──────────┼──────────┼─────────┼────────┼──────────┼───────────────┤
│ r-nexus  │ Nexus    │ Resume  │  1     │ ✅ ON    │ [↑][↓][Edit] │
│ r-merid  │ Meridian │ Resume  │  2     │ ✅ ON    │ [↑][↓][Edit] │
│ r-atlas  │ Atlas    │ Resume  │  3     │ ✅ ON    │ [↑][↓][Edit] │
│ r-prism  │ Prism    │ Resume  │  4     │ ❌ OFF   │ [↑][↓][Edit] │
│ c-acad   │ Academia │  CV     │  1     │ ✅ ON    │ [↑][↓][Edit] │
│ c-schol  │ Scholar  │  CV     │  2     │ ✅ ON    │ [↑][↓][Edit] │
└──────────┴──────────┴─────────┴────────┴──────────┴───────────────┘
```

### Template Update API

```typescript
// PUT /api/templates/[id]
// Body: { enabled?, featured?, is_new?, display_order? }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  const allowed = ['enabled', 'featured', 'is_new', 'display_order'];
  const update = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );
  update.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('templates')
    .update(update)
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

---

## 11. Announcement System

Push a banner to all app users instantly — no redeployment needed.

### Announcement Composer UI

```
┌────────────────────────────────────────────────────────┐
│  New Announcement                                      │
│                                                        │
│  Message ─────────────────────────────────────────     │
│  [ New CV templates just launched! Check them out ]   │
│                                                        │
│  Type      [ info ▾ ]    (info / warning / success)   │
│                                                        │
│  CTA Label  [ See templates ]                          │
│  CTA URL    [ /templates    ]                          │
│                                                        │
│  Expires    [ 2026-08-27 ] (leave blank = no expiry)  │
│                                                        │
│            [Cancel]  [Publish Announcement]            │
└────────────────────────────────────────────────────────┘
```

### Announcement API

```typescript
// POST /api/announce
export async function POST(req: NextRequest) {
  const body = await req.json();

  const AnnouncementSchema = z.object({
    message:   z.string().min(1).max(200),
    type:      z.enum(['info', 'warning', 'success']),
    link_text: z.string().max(50).optional(),
    link_url:  z.string().url().optional(),
    ends_at:   z.string().datetime().optional(),
  });

  const parsed = AnnouncementSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  // Deactivate any currently active announcements first
  await supabase.from('announcements').update({ active: false }).eq('active', true);

  const { data, error } = await supabase
    .from('announcements')
    .insert({ ...parsed.data, active: true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

### How It Appears in the Main App

```tsx
// components/AnnouncementBar.tsx (in main app)

export function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getConfig().then(c => setAnnouncement(c.announcement));
  }, []);

  if (!announcement || dismissed) return null;

  const colors = {
    info:    'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className={`border-b px-4 py-2 flex items-center justify-between text-sm ${colors[announcement.type]}`}>
      <span>
        {announcement.message}
        {announcement.link_url && (
          <a href={announcement.link_url} className="ml-2 underline font-medium">
            {announcement.link_text}
          </a>
        )}
      </span>
      <button onClick={() => setDismissed(true)} className="ml-4 opacity-60 hover:opacity-100">✕</button>
    </div>
  );
}
```

---

## 12. Feedback & Reports

### Feedback Inbox UI

```
┌──────────────────────────────────────────────────────────────────┐
│  Feedback Inbox                Filter: [All ▾]  [New ▾]          │
├────────┬─────────┬─────────────────────────────┬────────┬────────┤
│  Type  │  Stars  │  Message                    │  Date  │ Status │
├────────┼─────────┼─────────────────────────────┼────────┼────────┤
│ 🐛 Bug │  —      │ PDF export cuts off the ... │ 2h ago │ 🔴 New │
│ ⭐ Rate│ ★★★★★  │ Love the Nexus template!    │ 5h ago │ ✅ Read│
│ 💡 Feat│  —      │ Please add LinkedIn import  │ 1d ago │ ✅ Read│
│ 🐛 Bug │  —      │ DOCX download not working.. │ 2d ago │ 🟡 Wip │
└────────┴─────────┴─────────────────────────────┴────────┴────────┘
```

### Feedback Widget in Main App

```tsx
// components/FeedbackWidget.tsx (in main app)

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'bug' | 'feature' | 'rating'>('general');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  async function submit() {
    await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, rating: rating || undefined, message }),
    });
    setOpen(false);
    toast.success('Thanks for your feedback!');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 text-xs text-gray-400 hover:text-gray-600 bg-white border rounded-full px-3 py-1.5 shadow"
      >
        Feedback
      </button>
      {open && <FeedbackModal onSubmit={submit} onClose={() => setOpen(false)} />}
    </>
  );
}
```

---

## 13. Frontend Integration

### What Changes in the Main ResumeForge App

Only three additions are needed in the main app to connect to the dashboard:

**1. Fetch config on app startup**

```typescript
// app/layout.tsx (main app)
const config = await getConfig();
// Pass to providers
```

**2. Track events**

```typescript
// Add track() calls at key moments
track('doc_created', { doc_type: 'resume' });
track('export_pdf',  { doc_type, template_id });
track('template_switch', { from: oldId, to: newId, doc_type });
```

**3. Gate features with flags**

```typescript
const { flags } = useConfig();

{flags.docx_export && <DocxButton />}
{flags.share_link  && <ShareButton />}
{flags.cv_mode     && <CVOption />}
```

### Environment Variable Needed in Main App

```bash
# .env.local (in main ResumeForge app)
NEXT_PUBLIC_ADMIN_API=https://resumeforge-admin.vercel.app
```

---

## 14. Environment Variables

```bash
# resumeforge-admin/.env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # server-side only

# JWT
JWT_SECRET=your-32-char-random-secret  # openssl rand -base64 32

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# CORS — allow requests from the main app
ALLOWED_ORIGIN=https://resumeforge.vercel.app
```

---

## 15. Deployment

Both apps deploy to Vercel — the main app and the admin dashboard are **separate Vercel projects** pointing to different directories or repos.

```bash
# Deploy admin dashboard
cd resumeforge-admin
vercel --prod

# Set env vars in Vercel dashboard or via CLI
vercel env add JWT_SECRET production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

### CORS Middleware

The public API routes (`/api/config`, `/api/event`, `/api/error`, `/api/feedback`) must allow requests from the main app's domain.

```typescript
// lib/cors.ts
export function corsHeaders(origin: string) {
  const allowed = process.env.ALLOWED_ORIGIN ?? '';
  if (origin === allowed) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  return {};
}
```

---

## 16. Security

| Concern | Mitigation |
|---------|------------|
| Admin access | HttpOnly JWT cookie, 7-day expiry, bcrypt passwords |
| Public API abuse | Upstash rate limiting — 30 req/min per IP |
| SQL injection | Supabase client uses parameterized queries |
| XSS | No user content rendered as HTML in dashboard |
| CORS | Only main app origin allowed on public routes |
| Secrets exposure | Service role key server-side only, never in client bundle |
| Error data | Stack traces stored but never returned to client |
| Analytics privacy | No IP stored, no fingerprinting, anonymous session IDs only |

### Rate Limiting Helper

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, '1m'),
});

export async function rateLimit(req: NextRequest, limit = 30) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(`${ip}:${limit}`);
  return !success;
}
```

---

## 17. Dashboard UI Pages

### `/dashboard` — Overview

- 4 KPI cards: Today's users, Weekly users, Total exports, Unread feedback
- Line chart: Daily active users (30 days)
- Bar chart: Export type breakdown
- Pie chart: Resume vs CV split
- Bar chart: Top 5 templates this week

### `/dashboard/analytics` — Deep Analytics

- Date range picker (7d / 30d / 90d / custom)
- Daily/weekly/monthly toggle
- Country breakdown table
- Export trend over time
- Template adoption over time

### `/dashboard/templates` — Template Control

- Table of all templates with enable/disable toggle
- Drag-to-reorder display order
- Mark as Featured or New (shows badge in main app)
- Filter by Resume / CV

### `/dashboard/flags` — Feature Flags

- Simple list of all flags with toggle switch
- Last updated time and who updated
- Description of what each flag controls

### `/dashboard/announce` — Announcements

- Active announcement card (with dismiss/deactivate button)
- Announcement composer form
- History of past announcements

### `/dashboard/feedback` — Feedback Inbox

- Table with type, rating, message, date, status
- Click row to read full message
- Mark as read / resolved / bug
- Filter by type, status, date range
- Star rating average display

### `/dashboard/errors` — Error Logs

- Table with message, page, browser, date
- Expandable stack trace per row
- Filter by date
- Bulk delete old logs button

---

## Seed the Database

Run this once to set up default flags and templates:

```sql
-- Feature flags
INSERT INTO feature_flags (key, enabled, description) VALUES
  ('cv_mode',             TRUE, 'Show CV option on first screen'),
  ('share_link',          TRUE, 'Share resume via encoded URL'),
  ('docx_export',         TRUE, 'Download as Word document'),
  ('print_export',        TRUE, 'Print via browser dialog'),
  ('plain_text_export',   TRUE, 'Copy as plain text'),
  ('feedback_widget',     TRUE, 'Show feedback button in app'),
  ('announcement_bar',    TRUE, 'Show announcement banner');

-- Resume templates
INSERT INTO templates (id, name, doc_type, enabled, display_order, ats_score) VALUES
  ('r-nexus',     'Nexus',    'resume', TRUE, 1, 78),
  ('r-meridian',  'Meridian', 'resume', TRUE, 2, 95),
  ('r-atlas',     'Atlas',    'resume', TRUE, 3, 82),
  ('r-prism',     'Prism',    'resume', TRUE, 4, 70),
  ('r-compact',   'Compact',  'resume', TRUE, 5, 90),
  ('r-executive', 'Executive','resume', TRUE, 6, 88);

-- CV templates
INSERT INTO templates (id, name, doc_type, enabled, display_order, ats_score) VALUES
  ('c-academia',  'Academia',       'cv', TRUE, 1, 85),
  ('c-scholar',   'Scholar',        'cv', TRUE, 2, 95),
  ('c-modern-ac', 'Modern Academic','cv', TRUE, 3, 80),
  ('c-medical',   'Medical',        'cv', TRUE, 4, 88),
  ('c-research',  'Research',       'cv', TRUE, 5, 82),
  ('c-europass',  'Europass',       'cv', TRUE, 6, 90);

-- Create admin user (password: change_this_immediately)
INSERT INTO admin_users (username, password_hash) VALUES
  ('admin', '$2b$10$...');  -- generate with bcrypt.hash('your_password', 10)
```

---

## License

MIT © ResumeForge Contributors

---

*Backend Dashboard v1.0 · Supabase + Next.js + Vercel · $0/month on free tiers*
