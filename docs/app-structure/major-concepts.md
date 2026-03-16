# Major Concepts Used in the Mars Copack App

This document explains the major design and implementation concepts used in the app.

## 1) Screen Flow & Auth State (Single-Page, App-Managed Routing)

The app does not use `react-router`. Instead, auth and page flow is controlled by state in `src/App.jsx`.

- `App` keeps a `screen` state: `register`, `login`, `dashboard`.
- Register action adds a new in-memory user and moves to login.
- Login checks credentials against stored user list and moves to dashboard.
- Logout returns to registration.
- Refresh returns to register intentionally (no persistent login storage).

This pattern is suitable for prototype flows and demonstrates explicit state-driven navigation.

## 2) Reusable Layout Components

The UI is split between high-level layout components and page components:

- `AuthLayout.jsx` (common wrapper for registration/login forms)
- `Dashboard.jsx` (main app shell with fixed header/subheader/sidebar and content)
- `TopHeader.jsx`, `SubHeader.jsx`, `Sidebar.jsx` (shared layout pieces)

This separation improves reuse and keeps each page focused on its business UI.

## 3) Table Data + Editable Logic

Master Data and MPS Report tables are implemented as plain HTML tables with inline styling.

Key concepts:

- `useState` for table data state and editing mode
- `useMemo` for filtered row computation
- `useEffect` for optional backend fetches
- Row-level selection and inline editing controls

The MPS edit flow uses `isEditing` state and renders input fields conditionally.

## 4) Scrollable Table UIs

Large tables in Master Data and MPS Report use CSS scroll containers:

- Saturate with `overflowX: 'auto'` for horizontal scroll
- Use `maxHeight` + `overflowY: 'auto'` for vertical scrolling

This ensures wide or tall datasets remain usable on desktop viewports.

## 5) Static Data + Backend Fallback

The app uses sample constants for quick UI development (`src/constants/data.js`).

It also includes leaves for backend fetch:

- `fetch('/api/masterdata/')` in `MasterDataPage`
- `fetch('/api/mpsreport/')` in `MPSReportPage`

This is a hybrid approach: local sample data is always available while API integration is supported.

## 6) Minimal CSS Architecture

Styling is inline using JavaScript style objects. This is fast for small prototypes but is best replaced by CSS modules or utility classes in larger apps.

## 7) Build and Run Workflow

Standard Vite commands:

- `npm run dev` — development server
- `npm run build` — production build

## 8) How to Extend

For production, extend this with:

- Real routing (`react-router-dom`)
- Persisted auth tokens and session storage
- Backend user/register/login endpoints
- Shared CSS system (Tailwind or design tokens)
- Component extraction for reusable form controls

---

For architecture-level onboarding, read `docs/app-structure/README.md` first.
