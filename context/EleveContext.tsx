"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Eleve = {
  acces_id: string;
  code_etablissement: string;
  code_eleve: string;
  nom?: string | null;
  type_utilisateur?: string;
  classe?: string | null;
};

type EleveContextType = {
  eleve: Eleve | null;
  login: (eleve: Eleve) => void;
  logout: () => void;
};

const EleveContext = createContext<EleveContextType | null>(null);

export function inferClasseFromCode(...codes: Array<string | null | undefined>) {
  const value = codes
    .filter(Boolean)
    .join(" ")
    .toUpperCase()
    .replace(/[._-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!value) return null;

  const patterns: Array<[string, RegExp]> = [
    ["cp", /\bCP[A-Z0-9]*\b/],
    ["ce1", /\bCE1[A-Z0-9]*\b/],
    ["ce2", /\bCE2[A-Z0-9]*\b/],
    ["cm1", /\bCM1[A-Z0-9]*\b/],
    ["cm2", /\bCM2[A-Z0-9]*\b/],
    ["6e", /\b6(?:E|EME|[A-Z]\d{0,2})?\b/],
    ["5e", /\b5(?:E|EME|[A-Z]\d{0,2})?\b/],
    ["4e", /\b4(?:E|EME|[A-Z]\d{0,2})?\b/],
    ["3e", /\b3(?:E|EME|[A-Z]\d{0,2})?\b/],
  ];

  return patterns.find(([, pattern]) => pattern.test(value))?.[0] ?? null;
}

export function EleveProvider({ children }: { children: React.ReactNode }) {
  const [eleve, setEleve] = useState<Eleve | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("eleveai_eleve");
      if (stored) {
        const parsed = JSON.parse(stored) as Eleve;
        setEleve({
          ...parsed,
          classe:
            parsed.classe ??
            inferClasseFromCode(parsed.code_eleve, parsed.code_etablissement),
        });
      }
    } catch {
      localStorage.removeItem("eleveai_eleve");
      setEleve(null);
    }
  }, []);

  function login(eleveData: Eleve) {
    localStorage.setItem("eleveai_eleve", JSON.stringify(eleveData));
    setEleve(eleveData);
  }

  function logout() {
    localStorage.removeItem("eleveai_eleve");
    setEleve(null);
  }

  return (
    <EleveContext.Provider value={{ eleve, login, logout }}>
      {children}
    </EleveContext.Provider>
  );
}

export function useEleve() {
  const ctx = useContext(EleveContext);

  if (!ctx) {
    throw new Error("useEleve doit être utilisé dans EleveProvider");
  }

  return ctx;
}
