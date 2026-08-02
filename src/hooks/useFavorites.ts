import { FavoritesContext } from "@/context/Favorite/FavoriteContext";
import { useContext } from "react";

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
