# API Integration Guide

This document describes the backend API calls used by the React frontend and how they are wired up.  The server is a simple Django project that provides read-only endpoints backed by a dummy SQLite database.

## Backend endpoints

| URL                      | Purpose                         | Returned data format                     |
|--------------------------|---------------------------------|------------------------------------------|
| `/api/masterdata/`       | Fetch master data rows          | Array of objects, each with fields:
```
code, desc, cpp, b1, b2, rule, type,
rate, donorCode, usageStatus
```
| `/api/mpsreport/`        | Fetch MPS report entries        | Array of objects including:
```
code, description, casePerPallet,
brand, copackCode, values (JSON)
```

Both endpoints auto-seed the database on the first query with the same hard-coded sample data that previously lived in the frontend constants.

### How the API is implemented

- **Models** (`api/models.py`): `MasterDataRow` and `MPSReportRow` mirror the sample JSON structure. `values` on the latter uses Django's `JSONField`.
- **Serializers** (`api/serializers.py`): standard `ModelSerializer` classes for both models.
- **Views** (`api/views.py`): two `ListAPIView` classes (`MasterDataList` and `MPSReportList`) which call `ensure_seeded()` before returning `queryset = Model.objects.all()`.
- **URLs** (`backend/urls.py`): the patterns above are wired directly to the view classes.

### Consuming the API in React

Calls are made using the native `fetch` API inside `useEffect` hooks when each page component mounts.  The base URL comes from the `VITE_API_BASE` environment variable defined in `.env`.

Example from `MasterDataPage.jsx`:

```js
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE}/masterdata/`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length) {
        setRows(data);
      }
    })
    .catch((err) => {
      console.error('Error fetching master data from API', err);
    });
}, []);
```

And from `MPSReportPage.jsx`:

```js
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE}/mpsreport/`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length) {
        setReportRows(data);
      }
    })
    .catch((err) => {
      console.error('Error loading MPS report rows', err);
    });
}, []);
```

If the API request fails or returns an empty list the app will simply continue using the static constants defined in `src/constants/data.js` or inside `MPSReportPage.jsx`.

### Adding new API endpoints

1. Create or modify a Django model in `api/models.py`.
2. Add a serializer and a view (use DRF generics for simplicity).
3. Add a URL pattern in `backend/urls.py`.
4. Update the frontend component, calling `fetch` and setting state accordingly.
5. Optionally, add a description of the new call to this document.

### Notes for students

- The backend is intentionally minimal: there is no authentication, no write operations, no pagination, and the CORS policy allows all origins.
- SQLite is used because it requires zero configuration and behaves like a "dummy SQL database" for demo purposes.
- This setup emulates a simple full‑stack college assignment: a React frontend fetching from a local API with a small database file.
- You can inspect or edit the data via Django's admin interface (`/admin/`).

Happy hacking!  Feel free to extend the API and update this README as you add new endpoints.