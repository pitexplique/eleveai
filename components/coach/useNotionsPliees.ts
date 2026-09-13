"use client";

// components/coach/useNotionsPliees.ts
//
// LE MODE SIMPLE DE LA LISTE DU COACH (Frédéric, 13/09/2026).
//
// « Lorsque les personnes arrivent, ils se perdent avec toutes ses micros. Il
// faudrait un mode simple qui affiche que les notions, et un déplier qui
// affiche les micros. » Sur Maths 4e la page ouvrait 33 notions ET leurs 210
// séries d'un coup : deux cents lignes avant le premier choix. Le même
// diagnostic que le 09/09 sur le tutor (voir lib/tutor-v4/displayMode.ts) —
// quelqu'un qu'un lien vient de déposer là n'a pas à lire deux cents lignes
// pour en choisir une — et la même réponse : le SIMPLE par défaut, le complet
// à un bouton, et le choix retenu.
//
// CE QUE CE CROCHET DÉCIDE, ET RIEN D'AUTRE : quelles notions sont dépliées.
// Ce que la page en fait (le chevron, la liste des micros) reste dans la page.
// Il est partagé par app/coach-ia/[matiere]/page.tsx ET
// app/coach-ia/english-maths/page.tsx — ⚠️ deux fichiers, pas un : l'anglais a
// sa page à lui, la route statique gagne sur la dynamique.
//
// ⚠️ LA RECHERCHE PASSE OUTRE. Une notion dont le TITRE ne répond pas à la
// recherche mais dont une micro y répond doit se montrer dépliée, sinon la
// réponse est invisible. Ce cas-là ne passe pas par ici : la page le rend sans
// bouton, comme avant le pli. Voir `forceeParLaRecherche` dans les pages.

import { useCallback, useEffect, useState } from "react";

/* Retenu comme `tutorv4-mode-choisi` dans le tutor : déplier tout est une
   décision, on ne la reprend pas à chaque classe ni à chaque visite. */
const CLE = "coach-notions-mode";

export function useNotionsPliees(notionIds: string[]) {
  const [depliees, setDepliees] = useState<Set<string>>(() => new Set());
  const [modeComplet, setModeComplet] = useState(false);

  // Le choix retenu se lit APRÈS le montage : le serveur n'a pas de
  // localStorage, et rendre « tout déplié » côté serveur pour tout le monde
  // serait exactement l'écran qu'on vient de quitter.
  useEffect(() => {
    try {
      if (localStorage.getItem(CLE) === "complet") setModeComplet(true);
    } catch {
      /* localStorage indisponible : mode simple, sans mémoire. */
    }
  }, []);

  // En mode complet, changer de classe rouvre tout : les identifiants de
  // notions changent avec la classe, l'ensemble se recalcule.
  const cleNotions = notionIds.join("\n");
  useEffect(() => {
    if (modeComplet) setDepliees(new Set(cleNotions.split("\n")));
  }, [modeComplet, cleNotions]);

  const estDepliee = useCallback((id: string) => depliees.has(id), [depliees]);

  const basculer = useCallback((id: string) => {
    setDepliees((avant) => {
      const apres = new Set(avant);
      if (apres.has(id)) apres.delete(id);
      else apres.add(id);
      return apres;
    });
  }, []);

  const retenir = (mode: "simple" | "complet") => {
    try {
      localStorage.setItem(CLE, mode);
    } catch {
      /* le choix vaut pour cette page seulement */
    }
  };

  const toutDeplier = useCallback(() => {
    setDepliees(new Set(notionIds));
    setModeComplet(true);
    retenir("complet");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleNotions]);

  const toutReplier = useCallback(() => {
    setDepliees(new Set());
    setModeComplet(false);
    retenir("simple");
  }, []);

  return { estDepliee, basculer, toutDeplier, toutReplier };
}
