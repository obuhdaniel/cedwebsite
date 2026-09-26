# CED Website — Product Requirements Document & Build Plan

**Plan tier:** Maxed Out (10 screens · Responsive · Advanced interactions · CMS · SEO · API integration · Priority support)
**Stack:** Next.js (App Router) + Supabase (Postgres, Auth, Storage)

> **Prototype scope note:** This build is a prototype, not a production system. It uses mocked/simulated data where a full-scale app would need live third-party integrations (payments, SMS/WhatsApp, mapping/logistics providers, vision APIs). Status updates, tracking, and notifications are handled with standard polling/refresh rather than Supabase Realtime or Edge Functions. Both are flagged in this doc as the first things to add when moving from prototype to production.

---

## 1. Executive Summary

CED Website is an operational support platform for Nigeria's industrial and construction supply chain. It connects project managers, site engineers, and procurement teams with a digital catalog of equipment, aggregates, and skilled manpower — wrapped in RFQ, machinery-booking, logistics-tracking, and environmental-remediation workflows, with AI layered in for personalization, visual inspection, and automated communication.

**Core problem:** Procurement, civil works, and logistics for large-scale projects in Nigeria are fragmented, manual, and opaque.

**Solution:** One dashboard where a site engineer requests a quote, books a crane, tracks its delivery, and escalates an emergency — without leaving the platform.

---

## 2. Target Users

| Persona | Role | Primary Need |
|---|---|---|
| **Amara** | Procurement Lead, real estate developer | Fast, comparable RFQs across multiple sites |
| **Tunde** | Site Engineer, industrial construction | Book machinery, track delivery in real time |
| **Dr. Ekong** | Environmental compliance officer (ecological industry) | Request & track remediation service jobs |
| **Ministry contact** | State/federal agency procurement officer | Auditable, transparent multi-vendor sourcing |

---

## 3. Core Problem & Goals

- **Problem:** No single system unifies catalog discovery, quoting, booking, logistics visibility, and emergency response for industrial projects.
- **Goal 1:** Cut RFQ turnaround time from days to hours.
- **Goal 2:** Give real-time visibility into equipment transport status across multiple sites.
- **Goal 3:** Provide a fast-path emergency support channel for critical site incidents.
- **Goal 4:** Build trust with government/enterprise buyers via transparency and audit trails.

---

## 4. MVP Scope — 10 Screens (plan cap)

| # | Screen | Purpose |
|---|---|---|
| 1 | **Landing / Marketing Home** | SEO entry point, value prop, lead capture |
| 2 | **Auth (Login / Signup / Org onboarding)** | Multi-tenant org + role-based access |
| 3 | **Dashboard (Multi-Site Overview)** | KPI cards, active orders, alerts, AI-personalized feed |
| 4 | **Catalog (Equipment / Aggregates / Manpower)** | Search, filter, AI-tagged listings |
| 5 | **RFQ Builder & Management** | Multi-step wizard, bulk request, quote comparison |
| 6 | **Machinery Booking + Logistics Tracking** | Availability calendar, live map tracking |
| 7 | **Environmental Remediation Request** | Specialized intake form, photo/CV inspection upload |
| 8 | **Order & Shipment Status** | Timeline view, status updates on refresh/poll |
| 9 | **Emergency Support Portal** | Priority ticket + AI chatbot triage, escalation path |
| 10 | **Admin / CMS** | Catalog & content management, user & org management |

Advanced interactions live in screens 5, 6, 8, 9 (wizards, live maps, kanban-style order boards, chat).

---

## 5. Core AI Features — Implementation Mapping

| AI Capability | Where It Lives | Approach |
|---|---|---|
| **Personalization** | Dashboard, Catalog | Behavior + org-history based ranking; start rule-based (recent categories, site region, order frequency), evolve to embeddings via `pgvector` in Supabase |
| **Computer Vision** | Remediation requests, delivery confirmation | Uploaded site/equipment photos analyzed by a vision-capable LLM API to flag damage, verify condition, or assess environmental site state |
| **Image Recognition** | Catalog, delivery confirmation | Auto-tag catalog images by equipment type/category on upload; match "delivered" photo against the ordered SKU |
| **AI Chatbot** | RFQ builder, Emergency Support Portal | LLM-powered assistant that helps draft RFQs, answers catalog questions, and triages emergency tickets (severity, routing to the right team) before human handoff |
| **Data Automation** | RFQ → quote, order status | Next.js API routes auto-generate draft quotes and update mock logistics status on demand (prototype: triggered by user action, not a live scheduler) |

**Note on AI vendor:** Treat the LLM/vision provider as a swappable service behind an internal API route — don't hardcode a single vendor into the frontend, so you can benchmark cost/accuracy later.

---

## 6. Technical Architecture

```
Next.js (App Router, SSR/ISR)
 ├─ /app (screens 1–10, route groups: (marketing) / (dashboard) / (admin))
 ├─ /app/api (server routes → Supabase, AI provider calls)
 └─ Supabase
     ├─ Postgres (core data + pgvector for personalization embeddings)
     ├─ Auth (org + role-based access control)
     └─ Storage (equipment photos, inspection images, documents)
```

For this prototype, everything that would normally be a live third-party integration (payments, SMS/WhatsApp, maps/logistics tracking) is simulated with mock data and static/sample states so the flows can be demoed end-to-end without external accounts or keys.

### 6.1 Draft Data Model (Supabase / Postgres)

```sql
organizations (id, name, type, region, cac_number, created_at)
users (id, org_id, role, name, phone, email)
sites (id, org_id, name, location, geo_point)

catalog_items (id, category, name, description, image_url, tags[], embedding vector)

rfqs (id, org_id, site_id, status, created_by, created_at)
rfq_items (id, rfq_id, catalog_item_id, qty, notes)
quotes (id, rfq_id, vendor_id, price, valid_until, status)

bookings (id, org_id, site_id, catalog_item_id, start_date, end_date, status)
logistics_events (id, booking_id, status, geo_point, timestamp)

remediation_requests (id, org_id, site_id, description, photos[], cv_assessment jsonb, status)

orders (id, org_id, source_type, source_id, status)
order_status_updates (id, order_id, status, note, created_at)

emergency_tickets (id, org_id, site_id, severity, description, ai_triage jsonb, status, created_at)
chat_sessions (id, user_id, context_type, messages jsonb, created_at)
```

### 6.2 Roles & Access

- **Org Admin** — manage users, view all org orders
- **Procurement** — RFQs, quotes, bookings
- **Site Engineer** — bookings, status, emergency tickets (site-scoped)
- **Platform Admin** — CMS, catalog, org approvals

---

## 7. Non-Functional Requirements

- **Responsive:** mobile-first for field/site use (screens 6–9 especially).
- **SEO:** SSR/ISR on marketing + catalog pages, structured data (schema.org `Service`/`Product`), sitemap, metadata per catalog item.
- **CMS:** catalog content, service descriptions, and resource pages editable without a deploy — either a lightweight Supabase-backed admin (screen 10) or a headless CMS if content volume grows.
- **Security:** row-level security in Supabase scoped by `org_id`; signed URLs for uploaded documents/photos.
- **Auditability:** every status change and quote logged with timestamp + actor, for government/enterprise trust.

---

## 8. Build Plan (Phased)

| Phase | Focus | Rough Duration |
|---|---|---|
| **0 — Foundation** | Next.js + Supabase setup, auth, org onboarding, design system | 1–2 weeks |
| **1 — Core Commerce** | Catalog, RFQ builder, quotes, dashboard | 2–3 weeks |
| **2 — Operations** | Booking engine, logistics tracking, order/shipment status | 2–3 weeks |
| **3 — Specialized + Emergency** | Remediation module, emergency support portal | 1–2 weeks |
| **4 — AI Layer** | Chatbot, CV/image recognition, personalization, data automation | 2–3 weeks |
| **5 — CMS, SEO, Polish** | Admin/CMS screen, SEO pass, responsive QA, priority support setup | 1–2 weeks |

**Total estimate:** ~9–15 weeks depending on team size. Timeline assumes prototype scope (mocked integrations) — add time when moving to production with live payments, SMS/WhatsApp, and logistics providers.

---

## 9. Success Metrics

- RFQ turnaround time (target: <24h from request to first quote)
- % of bookings with a visible status/tracking timeline
- Emergency ticket first-response time
- Catalog search → RFQ conversion rate
- Chatbot deflection rate (tickets resolved without human handoff)

---

## 10. Open Questions

1. Do vendors self-list in the catalog, or is it platform-curated to start?
2. Which logistics/tracking provider (or in-house GPS integration) is available in Nigeria for the pilot?
3. Government agency users — any specific procurement compliance/audit requirements to build in from day one?
4. Preferred payment flow: pay-on-platform, or quote-only with offline payment for MVP?
