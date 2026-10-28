"use client";

// « 1 234 questions répondues ! » — le compteur d'IXL, à la façon d'EleveAI.
// ⭐ 28/10/2026, Frédéric, capture d'IXL à l'appui : « compter le nombre de
// réponses au coach comme IXL, ça bouge en direct ! ». Chez IXL, les élèves
// sont connectés ; ici la connexion n'est pas obligatoire, donc le compteur
// est ANONYME : toute réponse corrigée compte (supabase/coach_reponses.sql).
//
// Le total est relu toutes les 10 s ; entre deux lectures, le nombre monte
// un par un jusqu'à la nouvelle valeur, pour qu'on le voie bouger.
// Rien ne s'affiche tant que le SQL n'a pas été exécuté (total null) ou que
// le compteur est à 0.

import { useEffect, useRef, useState } from "react";

const RELECTURE_MS = 10_000;

export default function CompteurReponsesCoach({ className = "" }: { className?: string }) {
  const [cible, setCible] = useState<number | null>(null);
  const [affiche, setAffiche] = useState<number | null>(null);
  const afficheRef = useRef<number | null>(null);

  useEffect(() => {
    let actif = true;
    const lire = () =>
      fetch("/api/coach/compteur")
        .then((r) => r.json())
        .then((d) => {
          if (actif && typeof d?.total === "number") setCible(d.total);
        })
        .catch(() => {});
    lire();
    const id = setInterval(lire, RELECTURE_MS);
    return () => {
      actif = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (cible === null) return;
    // Première lecture : le nombre s'affiche tel quel.
    if (afficheRef.current === null || cible < afficheRef.current) {
      afficheRef.current = cible;
      setAffiche(cible);
      return;
    }
    const ecart = cible - afficheRef.current;
    if (ecart === 0) return;
    // L'écart se comble sur la durée d'une relecture, au plus 20 pas par seconde.
    const pas = Math.max(1, Math.ceil(ecart / (RELECTURE_MS / 50)));
    const delai = Math.max(50, Math.floor(RELECTURE_MS / Math.ceil(ecart / pas)));
    const id = setInterval(() => {
      const suivant = Math.min(cible, (afficheRef.current ?? cible) + pas);
      afficheRef.current = suivant;
      setAffiche(suivant);
      if (suivant >= cible) clearInterval(id);
    }, delai);
    return () => clearInterval(id);
  }, [cible]);

  if (!affiche) return null;

  return (
    <p className={["text-base text-slate-600", className].join(" ")} aria-live="off">
      <strong className="font-bold tabular-nums text-slate-800">{affiche.toLocaleString("fr-FR")}</strong>{" "}
      questions répondues au coach&nbsp;!
    </p>
  );
}
