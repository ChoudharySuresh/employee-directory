import {
  applyThemeClass,
  getStoredTheme,
  getSystemTheme,
  type Theme,
} from "@/lib/theme";
import { useEffect, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { THEME_STORAGE_KEY } from "@/constants/constant";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    THEME_STORAGE_KEY,
    getStoredTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
