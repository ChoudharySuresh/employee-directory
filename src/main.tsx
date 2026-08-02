import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/context/Theme/ThemeProvider.tsx";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import { FavoritesProvider } from "./context/Favorite/FavoritesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
