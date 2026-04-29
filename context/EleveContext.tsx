"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Eleve = {
  acces_id: string;
  code_etablissement: string;
  code_eleve: string;
  nom?: string | null;
  type_utilisateur?: string;
};

type EleveContextType = {
  eleve: Eleve | null;
  login: (eleve: Eleve) => void;
  logout: () => void;
};

const EleveContext = createContext<EleveContextType | null>(null);

export function EleveProvider({ children }: { children: React.ReactNode }) {
  const [eleve, setEleve] = useState<Eleve | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("eleveai_eleve");
      if (stored) {
        setEleve(JSON.parse(stored) as Eleve);
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