# Employee Directory

A responsive, feature-rich React + TypeScript + Vite employee directory application. It features real-time search, multi-faceted filtering, custom sorting, local storage-persisted favorites, pagination, dark/light theme toggle, and a complete unit/component test suite.

---

## 🔗 Live URLs

* **GitHub Repository:** [https://github.com/ChoudharySuresh/employee-directory](https://github.com/ChoudharySuresh/employee-directory)
* **Live Demo:** [https://employee-directory-assign.netlify.app/](https://employee-directory-assign.netlify.app/)

---

## 🛠️ Tech Stack

* **Core Framework:** React 19, TypeScript
* **Build Tool:** Vite, Vitest
* **State Management:** Redux Toolkit (RTK) Query, React Context API
* **Styling:** Tailwind CSS, shadcn/ui components, Lucide Icons, React Icons
* **Testing:** Vitest, jsdom, React Testing Library (RTL)

---

## 🚀 Features

* **Dashboard List:** Grid and card rendering of employees displaying photos, job titles, department, age, company, email, phone, and country details.
* **Real-time Debounced Search:** Instantly matches employee name and email without spamming network queries (400ms debounce).
* **Multi-Criteria Filter Bar:** Filter users dynamically by Department, Country, Gender, and numeric Age Ranges.
* **Custom Sorting:** Real-time ascending and descending ordering by Name, Age, Company (Department), and Country.
* **Detail Page View:** Display details (personal, contact, address, company info) and a dynamically computed biography.
* **Persistent Favorites:** Heart icons on cards toggle favorite status. Persistent across page refreshes using browser Local Storage.
* **Mobile-Optimized Theme Toggle:** Instant Dark / Light theme transition with persistent setting matching all screen sizes.
* **Error Handling & Fallback UI:** Integrated React Error Boundary and customized loading state card skeletons.

---

## 📂 Project Structure

```text
src/
 ├── assets/      # Static assets (images, logos)
 ├── components/  # Reusable UI elements (common/ layouts/, UI/, employee/)
 ├── constants/   # Global configurations and keys
 ├── context/     # Context providers (ThemeContext, FavoriteContext)
 ├── features/    # API slices and services (employeesApi)
 ├── hooks/       # Custom hooks (useTheme, useLocalStorage, useFavorites, useDebounce)
 ├── layouts/     # Page templates (MainLayout)
 ├── lib/         # Configuration helpers and utilities (theme utilities)
 ├── pages/       # Page components (Dashboard, Employee, Favorites, NotFound)
 ├── routes/      # Application route definitions (AppRoutes)
 ├── tests/       # Unit & Component test suites
 ├── types/       # Global TypeScript interfaces
 └── utils/       # In-memory helpers (filter & option utilities)
```

---

## ⚙️ Getting Started

### Prerequisites
* Node.js 18+
* npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application
Starts the Vite dev server locally:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run the Test Suite
Executes the Vitest unit and component tests:
```bash
npm run test
```

### 4. Build for Production
Compiles types and bundles the production asset distribution:
```bash
npm run build
```

---

## 💭 Assumptions Made

1. **Static Data Structure:** The data fetched from `dummyjson.com/users` is treated as a static dataset of 208 users. We query the endpoint with `limit=0` to fetch the complete set of employees for local caching.
2. **Context API for Local State:** Simple UI configurations (Theme toggle and favorites ID list) are handled using React Context, as they represent simple browser preferences, whereas RTK is utilized to cache and manage query data.
3. **Biography Availability:** The API does not provide a direct bio field. An assumption was made to dynamically generate a clean biography block on the details page combining the employee's title, department, age, and location.

---

## 🧠 State Management Approach

* **RTK Query (Server State):** The application utilizes Redux Toolkit Query (`employeesApi.ts`) for data fetching, indexing, and automatic query caching. 
* **Context API + Custom Hooks (UI/Preferences State):** 
  * `ThemeContext` manages the active Dark/Light theme class applied to the document root.
  * `FavoritesContext` stores the list of favorited employee IDs.
  * Local Storage synchronizes both states using the custom `useLocalStorage` hook to preserve user settings.

---

## ⚡ Performance Considerations

* **Search Debouncing:** Typing in the search bar triggers a custom `useDebounce` hook, delaying execution by 400ms to prevent expensive list re-render loops.
* **Caching with RTK Query:** Query variables and payloads are cached automatically by RTK Query, ensuring near-instant load times when returning to the dashboard.
* **Selective Computation (`useMemo`):** Computations like filtering operations (`filterEmployees`) and option derivation (`deriveOptions`) are memoized using React's `useMemo` hook, running only when dependencies change.
* **Favorites batched loading:** The Favorites page queries the cached employee list once and performs filtering/sorting entirely in-memory, avoiding $N$ separate network requests for individual cards.

---

## 🔮 Future Improvements

1. **Full Redux Migration:** Consolidate Theme and Favorites state from Context API into standard RTK slices (`createSlice`) to keep all state under a unified store structure.
2. **Forms Library Integration:** Integrate `react-hook-form` to manage advanced filters and search parameters.
3. **Advanced Accessibility:** Implement keyboard tab navigation, trap focus inside mobile drawers, and include full keyboard interactions (e.g., Space/Enter triggers) for interactive card grids.
4. **Infinite Scroll:** Implement infinite scrolling pagination on the Dashboard using `IntersectionObserver` or a virtualization library for larger databases.
