# Employee Directory

A React + TypeScript + Vite employee directory application built for browsing employee records, applying search and filters, sorting results, browsing paginated pages, and managing favorites with persistence.

## GitHub Repository

https://github.com/ChoudharySuresh/employee-directory

## Live Demo

https://employee-directory-assign.netlify.app/

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit Query
- Context API
- Tailwind CSS

## Features Implemented

- Employee dashboard with profile image, name, email, phone, department, company, job title, and city/country
- Search by name and email
- Filtering by department/company, gender, age range, and country
- Sorting by name, age, company, and country with ascending/descending order
- Pagination with page-size selection
- Employee details page with personal, contact, company, and address details
- Favorites with browser persistence using local storage
- Light and dark mode with persisted user preference
- Responsive design for desktop, tablet, and mobile
- Graceful API error and fallback UI

## Project Structure

```text
src/
  components/
  context/
  features/
  hooks/
  layouts/
  lib/
  pages/
  routes/
  store.ts
  types/
  utils/
```

## Getting Started

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

## Notes

This project uses the DummyJSON users API as the data source and is structured as a frontend-only employee directory assignment implementation.
