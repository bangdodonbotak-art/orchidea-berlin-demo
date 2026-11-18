// Shared dark-mode state for Orchidea (v3.7) — mirrors lib/useLang.ts
// (v3.4). The theme choice PERSISTS across pages and new tabs via
// localStorage, and the toggle exists on ALL THREE pages (/, /services,
// /team) — the v3.6 audit found the toggle only on the homepage, so Dark
// reverted to light on every navigation.
//
// Same hydration-safe pattern as useLang: first render is "light" (matches
// the server), the effect applies the stored choice on mount, and the
// toggle writes it immediately. A `storage` listener keeps other tabs
// in sync. The hook also owns the documentElement data-theme attribute,
// so every page just does `const [dark, setDark] = useTheme();`.
"use client";
import { useEffect, useState } from "react";

export const THEME_KEY = "orchidea-theme";

export function readStoredTheme(): boolean {
  try {
    return window.localStorage.getItem(THEME_KEY) === "dark";
  } catch {
    return false;
  }
}

/** Drop-in replacement for `useState(false)` dark state on every page. */
export function useTheme(): [boolean, (d: boolean) => void] {
  const [dark, setDarkState] = useState(false);
  useEffect(() => {
    setDarkState(readStoredTheme());
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) setDarkState(readStoredTheme());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  const setDark = (d: boolean) => {
    setDarkState(d);
    try {
      window.localStorage.setItem(THEME_KEY, d ? "dark" : "light");
    } catch {
      // Private mode / storage blocked — theme just doesn't persist.
    }
  };
  return [dark, setDark];
}
