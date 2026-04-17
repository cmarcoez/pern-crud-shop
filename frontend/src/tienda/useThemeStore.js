import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("night") || "night",
  setTheme: (theme) => {
    localStorage.setItem("night", theme);
    set({ theme });
  },
}));
