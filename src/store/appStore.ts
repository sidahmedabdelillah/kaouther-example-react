import { PaletteMode } from "@mui/material";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  themeMode: PaletteMode;
  setThemeMode: (theme: PaletteMode) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  themeMode: "dark",
  setThemeMode: (theme) => set(() => ({ themeMode: theme })),
}));
