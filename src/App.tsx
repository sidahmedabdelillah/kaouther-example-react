import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./screens/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, PaletteMode, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { useAppStore } from "./store/appStore";

export default function App() {
  const appStore = useAppStore();

  const ColorModeContext = createContext({ toggleColorMode: () => {} });

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        const newMode = appStore.themeMode === "light" ? "dark" : "light";
        appStore.setThemeMode(newMode);
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: appStore.themeMode,
        },
      }),
    [appStore.themeMode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
