"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Eleve = {
  acces_id: string;
  code_etablissement: string;
  code_eleve: string;
  nom?: string | null;
  type_utilisateur?: string;
  classe?: string | null;
  /** Jeton signé délivré par /api/code-login ou /api/email-session.
   *  Requis pour /api/resultats et /api/dashboard. */
  token?: string | null;
};

type EleveContextType = {
  eleve: Eleve | null;
  login: (eleve: Eleve) => void;
  logout: () => void;
};

const EleveContext = createContext<EleveContextType | null>(null);

// ⛔ inferClasseFromCode A ÉTÉ SUPPRIMÉE LE 12/08/2026.
//
// Elle lisait la classe DANS LE CODE de l'élève : « 6C19 » → « 6e »,
// « CM1000 » → « cm1 ». C'était une béquille de l'époque où les codes
// décrivaient la classe. Le passage d'année du 12/08 l'a rendue fausse d'un
// coup : un code ne bouge JAMAIS — c'est l'identité de l'élève, écrite en
// texte brut dans 21 tables — donc « 6C19 » a continué d'annoncer « 6e » pour
// un élève passé en 5e. Et c'est cette valeur que le coach lit pour choisir le
// niveau des exercices.
//
// La classe se lit désormais dans `acces_etablissement`, via /api/ma-classe.
// Quand elle est inconnue, elle vaut null — et null est une réponse honnête.
// Deviner en avait l'air d'une meilleure, elle était seulement plus confiante.

export function EleveProvider({ children }: { children: React.ReactNode }) {
  const [eleve, setEleve] = useState<Eleve | null>(null);

  useEffect(() => {
    let stored: Eleve | null = null;
    try {
      const brut = localStorage.getItem("eleveai_eleve");
      if (brut) {
        stored = JSON.parse(brut) as Eleve;
        setEleve(stored);
      }
    } catch {
      localStorage.removeItem("eleveai_eleve");
      setEleve(null);
      return;
    }

    // ON RELIT LA CLASSE EN BASE, ON NE LA DEVINE PLUS (12/08/2026).
    //
    // Cette session a été écrite à la connexion et peut dater de 30 jours —
    // soit, à la rentrée, d'avant le passage d'année. Auparavant on comblait
    // le trou en LISANT LE CODE de l'élève (« 6C19 » → « 6e »). Un code ne
    // bouge jamais, c'est une identité : il continuait donc d'annoncer la
    // classe de l'an dernier, et le coach servait des exercices de 6e à un
    // élève de 5e.
    //
    // Le serveur est la seule source qui dise la vérité du jour. S'il ne
    // répond pas, on garde ce qu'on avait — jamais une classe inventée.
    if (!stored?.token) return;
    const connu = stored;
    fetch("/api/ma-classe", {
      headers: { Authorization: `Bearer ${connu.token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.ok) return;
        const classe = (d.classe as string | null) ?? null;
        if (classe === (connu.classe ?? null)) return;
        const frais: Eleve = { ...connu, classe };
        setEleve(frais);
        try {
          localStorage.setItem("eleveai_eleve", JSON.stringify(frais));
        } catch {
          /* stockage plein ou refusé : la valeur reste juste en mémoire. */
        }
      })
      .catch(() => {});
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
