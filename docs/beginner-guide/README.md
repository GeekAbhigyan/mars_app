# Beginner Guide to Learning This Project

## Goal

This guide is for a beginner who wants to understand how this project works and gradually become confident editing it.

## What You Should Know First

Before going deep into this repo, try to learn these basics:

- HTML
- CSS
- JavaScript fundamentals
- React basics
- how to run terminal commands
- how Git and GitHub work

## Step 1: Run the Project

Start by running the app locally.

Use:

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

Do not start by reading every file. Start by running the app and clicking through the UI.

## Step 2: Understand the Big Picture

Read these files first:

1. `src/main.jsx`
2. `src/App.jsx`
3. `src/layouts/Dashboard.jsx`

These three files explain:

- where the app starts
- how screens switch
- how the dashboard is built

## Step 3: Learn by Following the Screen

Open the app and match each visible area to the file that renders it.

Example:

- top header -> `src/components/layout/TopHeader.jsx`
- sidebar -> `src/components/layout/Sidebar.jsx`
- master data screen -> `src/pages/MasterDataPage.jsx`
- MPS report screen -> `src/pages/MPSReportPage.jsx`

This is one of the best ways to understand a React project.

## Step 4: Read the Data Files

After you understand the screen flow, read:

- `src/constants/colors.js`
- `src/constants/data.js`

This helps you understand:

- where repeated colors come from
- where sample navigation/data values come from

## Step 5: Practice Small Changes

Make small edits and refresh the browser.

Good beginner exercises:

1. Change a button color
2. Rename a sidebar item
3. Add one more master data row
4. Change the report table heading
5. Add one more filter option

## Step 6: Learn the React Concepts Used Here

This project mainly uses:

- `useState`
- `useMemo`
- `useEffect`
- `useRef`
- props
- component composition
- conditional rendering
- array `.map()`

If you understand those, most of this codebase will make sense.

## Step 7: Read One Page Deeply

A good next step is to fully understand one page.

Recommended order:

1. `MasterDataPage.jsx`
2. `MPSReportPage.jsx`

Try to answer:

- What state does this page store?
- What UI depends on that state?
- Which handlers change the state?
- Which parts are static and which are dynamic?

## Step 8: Learn Better Frontend Engineering

Once you are comfortable, start learning:

- reusable components
- controlled inputs
- accessibility basics
- responsive design
- state organization
- routing with `react-router-dom`
- API integration with `fetch`

## Beginner-Friendly Improvements You Can Try

Here are safe improvement tasks for practice:

- add a root `README.md`
- move more repeated styles into shared helpers
- add validation to register/login inputs
- add sorting to the master data table
- add page-level loading or empty states
- connect report data to a real API later

## How to Study This Repo Efficiently

Do this:

1. Run the app
2. Click through the screens
3. Open only the matching file
4. Make one small change
5. Refresh and observe the result
6. Repeat

That loop is much more effective than reading everything at once.

## If You Get Stuck

When stuck, ask:

- What file renders this UI?
- What state controls this behavior?
- What function changes that state?

If you can answer those three questions, you can usually understand the feature.

## Recommended Learning Resources

Search for these topics:

- React official docs
- Vite getting started
- JavaScript array map/filter
- controlled components in React
- React props and state
- accessibility for forms and buttons

## Final Advice

Do not try to master the whole repo in one day.

Learn it in layers:

1. run it
2. navigate it
3. trace one feature
4. change one feature
5. repeat
