# Employee Directory

A React + TypeScript + Vite employee directory application that displays employee data, supports search, filtering, sorting, pagination, and favorites.

## Project setup instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint the project

```bash
npm run lint
```

## Assumptions made

- The project uses the DummyJSON users API as the remote data source.
- Search, filtering, and sorting are handled via API-driven queries where possible.
- The employee listing is rendered as a dashboard with server-side pagination support.
- Favorites are stored locally in browser storage rather than in a backend service.
- The app is designed as a frontend-only prototype with a lightweight state architecture.

## Folder structure explanation

```text
src/
  components/
    common/          Shared reusable UI helpers such as pagination
    employee/        Employee card, filter bar, and related views
    ui/              Reusable primitives styled for the app shell
  constants/         Static app constants
  context/           Theme and favorites context providers
  features/
    employees/       RTK Query API slice for employee endpoints
  hooks/             Custom hooks for favorites, theme, and local storage
  layouts/           Page layout containers
  lib/               Utility helpers and theme configuration
  pages/             Route-driven screen components
  routes/            Application route configuration
  store.ts           Redux store configuration
  types/             TypeScript interfaces and shared domain types
  utils/             Filter derivation and filtering utilities
```

## State management approach

The application uses a combination of:

- React local state for page-level UI concerns such as filters and pagination
- Redux Toolkit Query for remote API data fetching and caching
- Context API for theme and favorites state
- Local storage hooks for persisting favorites across sessions

This separation keeps the app predictable:

- API data is managed in the RTK Query slice
- route-level UI controls stay in React state
- cross-cutting preferences such as theme/favorites use context providers

## Performance considerations

- RTK Query caches API responses and avoids unnecessary refetches.
- Dashboard pagination requests only the required slice of data rather than loading the full dataset at once.
- Filtering and sorting are pushed to the backend where supported to reduce client-side work.
- Card rendering remains lightweight and uses a grid layout optimized for a concise UI.
- Favorites are persisted using a small local-storage hook rather than a heavy global store.

## Future improvements

- Replace native select controls with a fully styled custom dropdown component for a more consistent design system.
- Add URL query parameter synchronization for search, filters, sort, and page state.
- Introduce a dedicated loading/error boundary pattern for more graceful UX.
- Add user-level pagination controls such as page-size selection and keyboard navigation.
- Add unit and integration tests for sorting, filtering, and pagination flows.
- Move favorites persistence to a backend/API if the product grows into a multi-user system.

## Notes

This project follows a modern React + TypeScript frontend structure and is suitable for a small-to-medium sized employee directory dashboard.
