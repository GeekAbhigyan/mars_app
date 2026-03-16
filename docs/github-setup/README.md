# Mars Copack App Setup Guide

## Overview

This guide explains how to install and run the `mars_app` repository in a standard GitHub-style workflow.

## Prerequisites

Before you start, make sure your machine has:

- `git`
- `Node.js` 18 or later
- `npm` (comes with Node.js)
- `Python` 3.10+ with `pip` (for the Django backend)

Check your versions:

```bash
git --version
node --version
npm --version
python --version
pip --version
```

## 1. Clone the Repository

Replace the URL below with your actual GitHub repository URL:

```bash
git clone https://github.com/your-username/mars_app.git
cd mars_app
```

## 2. Install Dependencies

Install the project packages:

```bash
npm install
```

This project uses:

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`

## 3. Start the Development Server

Run the frontend and backend in separate terminals.

Frontend:

```bash
npm run dev
```

Backend:

```bash
# make sure requirements are installed and migrations have been applied
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Vite will print a local URL in the terminal (typically `http://localhost:5173`).  The Django server listens on `http://localhost:8000` and exposes the API endpoints.

Open the frontend URL in your browser to see the app; it will fetch data from the backend automatically.

## 4. Build for Production

To create a production build:

```bash
npm run build
```

The output will be generated inside:

```bash
dist/
```

## 5. Preview the Production Build

To preview the built app locally:

```bash
npm run preview
```

## Common GitHub Workflow

### Pull latest changes

```bash
git pull origin main
```

### Create a feature branch

```bash
git checkout -b feature/your-change-name
```

### Commit your work

```bash
git add .
git commit -m "Add your change summary"
```

### Push your branch

```bash
git push origin feature/your-change-name
```

Then open a Pull Request on GitHub.

## Project Scripts

Available scripts from `package.json`:

```bash
npm run dev       # start Vite frontend
npm run build
npm run preview
npm run backend    # start Django backend (runs manage.py runserver)
```

## Troubleshooting

### `npm install` fails

- Delete `node_modules`
- Delete `package-lock.json` only if you intentionally want a fresh dependency resolution
- Run `npm install` again

### Port already in use

Run Vite on another port:

```bash
npm run dev -- --port 3000
```

### Build issues

Run:

```bash
npm run build
```

and fix the reported file or syntax error before pushing changes.

## Recommended First Step After Cloning

Read these project docs next:

- `docs/app-structure/README.md`
- `docs/beginner-guide/README.md`
- `docs/api-integration/README.md`  (explains backend calls)
