# Mars Copack App Structure and Tech Stack

## Tech Stack

This project is a frontend application built with:

- `React 18`
- `Vite 5`
- `JavaScript + JSX`
- Inline style objects for UI styling

A lightweight Django backend now exists alongside the React frontend; it uses a SQLite database (`db.sqlite3`) and exposes two read‑only REST endpoints. During development the frontend fetches data from these APIs instead of relying on hard‑coded constants.

The available endpoints are:

- `/api/masterdata/` – returns the master data rows as JSON
- `/api/mpsreport/` – returns the report rows; each object includes a `values` JSON field

Both endpoints automatically seed the database with sample data on first access, making the setup self‑contained for a college‑level prototype.

## High-Level App Flow

The app starts in `src/main.jsx`, which renders `App`.

Main flow:

1. `src/main.jsx`
2. `src/App.jsx`
3. Registration screen (first screen on refresh)
4. Login screen
5. Dashboard (`MPS Report` default)
6. Active page content

The current flow intentionally resets on refresh to registration, simulating a fresh auth entry without persistent session storage.

## Folder Structure

```text
src/
  components/
    illustrations/
    layout/
    ui/
  constants/
  layouts/
  pages/
  App.jsx
  index.css
  main.jsx
```

## What Each Area Does

### `src/main.jsx`

Application entry point. Mounts the React app into the DOM.

### `src/App.jsx`

Top-level app controller.

Responsibilities:

- manages which screen is visible
- handles register → login → dashboard flow
- validates user credentials (in-memory for prototype)
- passes logout behavior back into the dashboard
- uses session design where refresh returns to register

### `src/layouts/`

Contains higher-level page wrappers.

- `AuthLayout.jsx`
  Used by the login and register screens.

- `Dashboard.jsx`
  Main authenticated layout with:
  - top header
  - sub-header
  - sidebar
  - active page content

### `src/pages/`

Contains screen-level UI.

- `RegisterPage.jsx`
  Registration form UI

- `LoginPage.jsx`
  Login UI

- `MasterDataPage.jsx`
  Filter bar, editable table, footer controls, and detail panel

- `MPSReportPage.jsx`
  Report filter panel, search/actions row, and planning report table

- `PlaceholderPage.jsx`
  Fallback page for sections not fully implemented

### `src/components/layout/`

Reusable layout pieces:

- `TopHeader.jsx`
- `SubHeader.jsx`
- `Sidebar.jsx`

### `src/components/ui/`

Reusable UI controls:

- `Dropdown.jsx`

### `src/components/illustrations/`

Decorative SVG illustrations used by auth/report screens.

### `src/constants/`

Shared app-level values:

- `colors.js`
  Design tokens and color palette

- `data.js`
  Navigation labels and sample master data rows

## Current Architecture Notes

### State Management

The app uses local React state with `useState`, `useMemo`, `useEffect`, and `useRef`.

There is no external state library such as:

- Redux
- Zustand
- Recoil

### Styling

Most styling is written inline inside JSX objects.

Pros:

- fast to prototype
- easy to keep styles close to components

Cons:

- can become repetitive
- harder to scale for larger apps
- harder to share responsive or theme rules

### Data Handling

Most data is sample or static data.

Examples:

- master data rows come from `src/constants/data.js`
- MPS report rows are currently stored inside `src/pages/MPSReportPage.jsx`

### Routing

The project does not currently use `react-router-dom`.

Navigation is controlled by:

- app-level screen state in `App.jsx`
- page selection state in `Dashboard.jsx`

## Suggested Mental Model

When reading this project, think of it in 3 layers:

1. App shell
2. Reusable UI/layout components
3. Page-specific business UI

## Best Files to Read First

If you want to understand the app quickly, read in this order:

1. `src/main.jsx`
2. `src/App.jsx`
3. `src/layouts/Dashboard.jsx`
4. `src/pages/RegisterPage.jsx`
5. `src/pages/LoginPage.jsx`
6. `src/pages/MasterDataPage.jsx`
7. `src/pages/MPSReportPage.jsx`
8. `src/components/layout/Sidebar.jsx`
9. `src/constants/data.js`


---

For details on the backend API and how the frontend calls it, see `docs/api-integration/README.md`.

For major concepts used in building this app, see `docs/app-structure/major-concepts.md`.
