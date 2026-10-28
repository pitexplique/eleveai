"use client";

// « 1 234 questions répondues ! » — le compteur d'IXL, à la façon d'EleveAI.
// ⭐ 28/10/2026, Frédéric, capture d'IXL à l'appui : « compter le nombre de
// réponses au coach comme IXL, ça bouge en direct ! ». Chez IXL, les élèves
// sont connectés ; ici la connexion n'est pas obligatoire, donc le compteur
// est ANONYME : toute réponse corrigée compte (supabase/coach_reponses.sql).
// ⛔ On n'affiche que le TOTAL, jamais le nombre de bonnes réponses.
// ⛔ PAS EN HAUT DU COACH (retiré le 28/10, Frédéric) : « chaque élève va
// croire que c'est lui ». Il vit dans le pied de page, et dit « par tous les
// élèves ».
//
// Le total est relu toutes les 30 s ; entre deux lectures, le nombre monte
// un par un jusqu'à la nouvelle valeur, pour qu'on le voie bouger.
// ⚠️ Il est aussi dans le PIED DE PAGE, donc sur toutes les pages, avec le
// quota gratuit de Vercel à surveiller : on ne relit QUE si le compteur est à
// l'écran et l'onglet visible. Un visiteur qui ne descend pas jusqu'en bas
// ne coûte rien.
// Rien ne s'affiche tant que le compteur est à 0 ou illisible.

import { useEffect, useRef, useState } from "react";

const RELECTURE_MS = 30_000;

export default function CompteurReponsesCoach({
  className = "",
  sombre = false,
}: {
  className?: string;
  sombre?: boolean;
}) {
  const [cible, setCible] = useState<number | null>(null);
  const [affiche, setAffiche] = useState<number | null>(null);
  const afficheRef = useRef<number | null>(null);
  const boite = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let actif = true;
    let aLEcran = false;
    let id: ReturnType<typeof setInterval> | null = null;

    const lire = () =>
      fetch("/api/coach/compteur")
        .then((r) => r.json())
        .then((d) => {
          if (actif && typeof d?.total === "number") setCible(d.total);
        })
        .catch(() => {});

    const regler = () => {
      const doitLire = aLEcran && document.visibilityState === "visible";
      if (doitLire && !id) {
        lire();
        id = setInterval(lire, RELECTURE_MS);
      } else if (!doitLire && id) {
        clearInterval(id);
        id = null;
      }
    };

    const obs = new IntersectionObserver(([e]) => {
      aLEcran = e.isIntersecting;
      regler();
    });
    if (boite.current) obs.observe(boite.current);
    document.addEventListener("visibilitychange", regler);
    return () => {
      actif = false;
      obs.disconnect();
      document.removeEventListener("visibilitychange", regler);
      if (id) clearInterval(id);
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

  // La boîte reste dans la page (vide, mais haute d'une ligne) pour que
  // l'observateur la voie : un élément de hauteur nulle n'entre jamais à l'écran.
  return (
    <p ref={boite} className={["min-h-6 text-base", sombre ? "text-slate-400" : "text-slate-600", className].join(" ")}>
      {affiche ? (
        <>
          <strong className={["font-bold tabular-nums", sombre ? "text-white" : "text-slate-800"].join(" ")}>
            {affiche.toLocaleString("fr-FR")}
          </strong>{" "}
          {affiche > 1 ? "questions répondues" : "question répondue"} au coach par tous les élèves&nbsp;!
        </>
      ) : null}
    </p>
  );
}
