import { createContext } from "react";

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
