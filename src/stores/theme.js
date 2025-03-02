import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    currentThemeName: "light",
    themes: {
      light: { bgColor: "#ffffff", textColor: "#000000" },
      dark: { bgColor: "#000000", textColor: "#ffffff" },
    },
  }),
  actions: {
    setTheme(themeName) {
      if (this.themes[themeName]) {
        this.currentThemeName = themeName;
      }
    },
  },
  persist: {
    storage: localStorage,
    pick: ["currentThemeName"],
  },
});
