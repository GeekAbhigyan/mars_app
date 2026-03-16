# Mars Copack App Structure and Tech Stack

## Tech Stack

This project is a frontend application built with:

- `React 18`
- `Vite 5`
- `JavaScript + JSX`
- Inline style objects for UI styling

There is currently no backend, database, router, or API integration in this repo. Most screens use local React state and static sample data.

## High-Level App Flow

The app starts in `src/main.jsx`, which renders `App`.

Main flow:

1. `src/main.jsx`
2. `src/App.jsx`
3. Auth screens or dashboard layout
4. Active page content

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
- switches between register, login, and dashboard
- passes logout behavior back into the dashboard

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
4. `src/pages/MasterDataPage.jsx`
5. `src/pages/MPSReportPage.jsx`
6. `src/components/layout/Sidebar.jsx`
7. `src/constants/data.js`

---

## Backend (Django) Setup

A minimal Django backend has been added under the project root. It uses SQLite (`db.sqlite3`) as a dummy database with two tables:

- `api_masterdatarow` – stores copack master data
- `api_mpsreportrow` – stores MPS report rows (values are stored as JSON)

The database file is created when you run migrations and seeded automatically on first API request.

To start the backend server:

```powershell
cd mars_app
# make sure you have Python 3 installed
python -m venv venv          # optional
venv\Scripts\activate       # if using the virtualenv
pip install -r requirements.txt  # you can generate one from pip freeze
python manage.py migrate
python manage.py runserver
```

The API endpoints are exposed at:

- `http://localhost:8000/api/masterdata/`
- `http://localhost:8000/api/mpsreport/`

The frontend pages (`MasterDataPage` / `MPSReportPage`) now fetch data from these endpoints during mount, replacing the previous static constants.

This simple setup is meant to resemble what a college project might include – a small backend serving a few read‑only endpoints with a local SQLite database. Feel free to extend it later.
