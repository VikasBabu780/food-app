import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light", // Default theme
      setTheme: (theme: Theme) => {
        // Update the store
        set({ theme });

        // Apply the theme to the HTML root element
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
      },
    }),
    {
      name: "theme-store", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: apply theme on load automatically
      // This ensures the DOM class matches the stored theme on page load
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(state.theme);
        }
      },
    }
  )
);
