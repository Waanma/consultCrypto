import { create } from "zustand";
import { Crypto } from "../types/types";

interface FavoritesState {
  favorites: Crypto[];
  addFavorite: (crypto: Crypto) => void;
  removeFavorite: (cryptoId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (crypto) =>
    set((state) => ({
      favorites: [...state.favorites, crypto],
    })),
  removeFavorite: (cryptoId) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== cryptoId),
    })),
}));
