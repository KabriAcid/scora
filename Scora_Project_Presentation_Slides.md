---
marp: true
theme: default
paginate: true
---

# Scora — Nigerian Local Livescore (Scora)

- Local Nigerian live-score web application for grassroots & semi-pro leagues
- Role-based access: Guest, Agent, Admin
- Date: December 31, 2025

---

---

## Slide 1 — Introduction

- Two brand colors (no gradients):
  - Primary purple: `--primary` HSL(280, 50%, 25%) — Hex: #4A2060 — RGB: rgb(74,32,96)
  - Accent pink: `--accent` HSL(330, 100%, 55%) — Hex: #FF1A8C — RGB: rgb(255,26,140)
- Uses football vector icons and SVG event icons across the UI

---

## Slide 2 — Project Overview

- Centralized match platform for Nigerian local leagues
- Live timelines, formation visualizer, lineups, stats, H2H
- Frontend: React + Vite + Tailwind; lightweight for mobile-first use

---

---

## Slide 3 — Problem Statement (bullet list)

- Local matches lack real-time coverage and standardized event logging
- Fans have limited access to live scores for grassroots leagues
- Administrators lack simple tools to manage fixtures and agents
- Clubs and coaches lack structured, timely analytics for decisions

---

---

## Slide 4 — Solutions (bullet list)

- On-field agents for live event logging (mobile-friendly agent UI)
- Real-time timeline with SVG football vectors for events
- Formation visualizer, head-to-head analytics, and downloadable reports
- Tiered API for partners and white-label SaaS for leagues

---

---

## Slide 5 — Roles & Access (Guest / Agent / Admin)

- Guest (Public)

  - Access: public, no authentication
  - Can view: live scores, match pages, lineups, timelines, H2H, standings, fixtures calendar
  - Read-only: cannot edit events or access agent/admin tools

- Agent (Live Data Logger)

  - Access: authenticated accounts, match assignment required
  - Can: start/pause/end match timer, log events (goal, card, sub, offside, corner, foul, injury), select players, submit timeline events
  - Role-based limits: assigned matches only; event editing limited to recent entries; audit logs available to admins

- Admin (League Manager)
  - Access: elevated authenticated accounts
  - Can: create/edit/delete leagues, teams, players, fixtures; approve/edit agent-submitted events; manage agent assignments; access all analytics and exports
  - Additional: billing, white-label config, user management

---

---

## Slide 6 — Revenue Streams (bullet list)

- Advertising (display & in-app video) — CPM model for public pages and live match views
- Sponsorships & branded placements (match sponsors, "powered by" banners)
- Subscriptions: Fan premium (ad-free, alerts, downloads), Agent/Club premium (extended exports, priority support)
- API access & resell: tiered developer plans, usage-based pricing for partners
- Data licensing & insights: anonymized feeds & reports sold to clubs/analysts
- White-label SaaS for leagues (setup + recurring fee)
- Merchandise, affiliate, and ticketing integrations

---

---

## Slide 7 — Cost & Server Usage (Naira, yearly estimates)

- Assumptions: small/medium Nigerian league usage; exchange rate estimate: 1 USD ≈ ₦1,500 (approx.) — adjust to current rate when budgeting
- Monthly infra (small/medium): $30–$170 → approx. ₦45,000 – ₦255,000 per month
- Yearly infra: ₦540,000 – ₦3,060,000
- Components:

  - Frontend hosting (static): CDN costs, SSL — low (₦5k–₦30k/mo)
  - Backend/API & WebSocket: app servers, real-time connections — (₦15k–₦100k/mo)
  - Database (managed Postgres): storage & I/O — (₦10k–₦80k/mo)
  - Monitoring, backups, storage, CDN egress: variable

- Usage estimates (yearly):
  - Concurrent users on match days: 100–500 (average); peak events may spike higher for featured matches
  - Bandwidth: estimate 100–500 GB/month for local leagues (static assets, match pages, images), yearly ≈ 1.2–6 TB
  - API requests: 100k–1M requests/year depending on integrations

---

## Slide 8 — Impact & Metrics

- Faster, accurate match reporting for Nigerian grassroots leagues
- Fan retention & daily active users growth targets
- KPIs: matches covered/year, avg concurrent users, monthly active users (MAU), API calls, revenue per month

---

## Slide 9 — Architecture (concise)

- Frontend: React + Tailwind (static deploy)
- API: Node.js/Express or serverless endpoints (REST + WebSocket for real-time)
- Database: PostgreSQL (managed)
- CDN for assets and football vector SVGs
- Optional analytics pipeline: event stream → batch/OLAP

---

## Slide 10 — Risks & Mitigation / Conclusion

- Risks:

  - Real-time scale and latency → Mitigate with managed WebSocket/CDN, horizontal scaling
  - Data quality from agents → Mitigate with validation, admin approvals, and audit logs
  - Monetization ramp slow → Mitigate with pilot sponsorships and freemium trials

- Conclusion:
  - Scora brings real-time livescore coverage to Nigerian local football with low-cost frontend, agent-driven events, and multiple monetization channels. Ready for backend integration and pilot deployment.

---

<!-- End of slides -->
