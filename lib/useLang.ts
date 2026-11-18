// Shared language state for Orchidea (v3.4) — DE/EN choice PERSISTS across
// pages and new tabs via localStorage.
//
// Why a hook + useEffect (not useState initializer reading localStorage):
// these pages are server-rendered, so the first render must match the
// server ("en") to avoid a hydration mismatch. The effect runs once on
// mount and applies the stored choice; the toggle writes it immediately.
// A `storage` listener keeps other open tabs in sync.
//
// Key name is namespaced to this demo so it never collides with other sites.
"use client";
import { useEffect, useState } from "react";
import type { Lang } from "./data";

export const LANG_KEY = "orchidea-lang";

export function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(LANG_KEY) === "de" ? "de" : "en";
  } catch {
    return "en";
  }
}

/** Drop-in replacement for `useState<Lang>("en")` on every page. */
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    setLangState(readStoredLang());
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY) setLangState(readStoredLang());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      // Private mode / storage blocked — language just doesn't persist.
    }
  };
  return [lang, setLang];
}
