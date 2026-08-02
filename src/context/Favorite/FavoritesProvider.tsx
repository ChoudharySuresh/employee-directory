import { FAVORITES_STORAGE_KEY } from "@/constants/constant";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCallback } from "react";
import { FavoritesContext } from "./FavoriteContext";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    FAVORITES_STORAGE_KEY,
    [],
  );

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavoriteIds(
        favoriteIds.includes(id)
          ? favoriteIds.filter((favId) => favId !== id)
          : [...favoriteIds, id],
      );
    },
    [favoriteIds, setFavoriteIds],
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
