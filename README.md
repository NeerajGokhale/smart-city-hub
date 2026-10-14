# Smart City Hub

A civic-engagement platform built with **React + Vite + Tailwind CSS**, matching SRS v1.0 (MIT-WPU).
No backend required — all data (accounts, issues, alerts, waste schedules, facilities) is persisted
client-side in the browser's `localStorage`, pre-seeded with mock data on first load.

## Getting started

Requires [Node.js](https://nodejs.org) 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build, output in dist/
npm run preview   # preview the production build locally
npm run lint      # oxlint over src/
```

## Demo accounts

- **Citizen:** `aditi@citizen.com` / `citizen123` — or register a new citizen account from the app
- **Admin:** `admin@smartcity.gov` / `admin123` (pre-provisioned, no self-registration)

A "Switch Role" debug toggle is also available in the top nav once signed in, for quick demonstration
without logging in and out.

## How sign-in works

Visiting **Sign in** first asks you to choose a role (Citizen or Administrator), then shows a
role-specific panel — citizens get a combined login/register form, admins get a login-only form
for their pre-provisioned account. This mirrors the two distinct personas in the SRS.

## Project structure

```
src/
  main.jsx                 entry point
  App.jsx                  providers + top-level view routing
  index.css                Tailwind + design-system utilities
  data/                    constants, seed data
  utils/                   helpers, localStorage wrapper
  context/                 Auth, Data (issues/alerts/waste/facilities), Toast
  components/
    icons/                 shared inline SVG icon set
    ui/                    Modal, buttons, fields, star rating, empty states
    charts/                custom SVG donut & bar charts
    layout/                top nav, footer, emergency alert banner
    home/                  landing page + isometric city hero
    auth/                  role select, citizen auth, admin auth
    citizen/               report form, my reports, waste schedule, facility directory
    admin/                 kanban tracker, alert composer, analytics, admin forms
```

## Notes

- All data lives only in this browser's `localStorage` — clearing site data resets the app back to
  the seeded demo state. There is no server and nothing is sent anywhere over the network.
- Built and verified with `npm run build` (Vite) and `npm run lint` (oxlint) before delivery.
