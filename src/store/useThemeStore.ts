import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEMES, type ThemePalette } from "../constants/themes";

interface ThemeState {
  currentTheme: ThemePalette;
  allThemes: ThemePalette[];
  changeTheme: (themeId: string) => void;
}

const applyThemeToDOM = (theme: ThemePalette) => {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.primary);
  root.style.setProperty("--color-accent-hover", theme.hover);
  root.style.setProperty("--color-emphasis", theme.emphasis);
  root.style.setProperty("--color-laptop-start", theme.laptopStart);
  root.style.setProperty("--color-laptop-end", theme.laptopEnd);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: THEMES[0],
      allThemes: THEMES,
      changeTheme: (themeId) =>
        set((state) => {
          const selected = state.allThemes.find((t) => t.id === themeId);
          if (selected) {
            applyThemeToDOM(selected);
            return { currentTheme: selected };
          }
          return {};
        }),
    }),
    {
      name: "app-theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.currentTheme) {
          applyThemeToDOM(state.currentTheme);
        }
      },
    },
  ),
);
