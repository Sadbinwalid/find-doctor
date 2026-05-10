"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  lang: Language;
  toggle: () => void;
  t: (en: string, bn: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggle = () => setLang((l) => (l === "en" ? "bn" : "en"));
  const t = (en: string, bn: string) => (lang === "en" ? en : bn);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
