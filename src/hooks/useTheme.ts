import { useContext } from "react";
import { ThemeContext } from "@/context/Theme/ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("use Theme must be inside ThemeProvider");
  return ctx;
}
