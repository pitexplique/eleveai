"use client";

// Le bouton « cette question a un problème », posé à côté de la question, dans
// TOUS les coachs (maths, français, anglais, espagnol, IA, brevet, bac).
//
// ⭐ IL N'APPARAÎT QUE POUR UN BÊTA TESTEUR ACCEPTÉ. C'est le privilège qui rend
// le rôle concret : les cinquante ont un outil que les autres n'ont pas. Personne
// n'y perd pour autant — /signaler-une-erreur reste ouverte à tout le monde
// depuis le menu, y compris sans compte. Ce qui se gagne ici, c'est le clic
// unique et le contexte joint tout seul.
//
// Le composant se débrouille seul : on lui donne la question, il décide s'il
// s'affiche. Aucun coach n'a à savoir ce qu'est un bêta testeur.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";

type Props = {
  /** La page où l'on se trouve, ex. « /coach-ia/maths » ou « /parcours ». */
  page: string;
  /** L'énoncé, tel qu'il est affiché. Tronqué : c'est un repère, pas une copie. */
  question?: string | null;
  /** L'identifiant de notion du moteur, ex. « fractions-addition ». */
  notion?: string | null;
  /** La ressource visée si le signalement porte sur elle (fiche, vidéo). */
  ressource?: string | null;
  className?: string;
};

/** Une seule interrogation par session de navigation, partagée par tous les
 *  boutons de la page : sept coachs qui demandent la même chose, c'est six
 *  requêtes de trop. */
let promesse: Promise<boolean> | null = null;
let jetonConnu: string | null = null;

function estBeta(jeton: string): Promise<boolean> {
  if (promesse && jetonConnu === jeton) return promesse;
  jetonConnu = jeton;
  promesse = fetch("/api/beta-testeurs/moi", {
    headers: { Authorization: `Bearer ${jeton}` },
  })
    .then((r) => r.json())
    .then((d) => Boolean(d?.beta))
    .catch(() => false);
  return promesse;
}

export default function BoutonSignalerQuestion({
  page,
  question,
  notion,
  ressource,
  className = "",
}: Props) {
  const { eleve } = useEleve();
  const [beta, setBeta] = useState(false);

  useEffect(() => {
    const jeton = eleve?.token;
    if (!jeton) {
      setBeta(false);
      return;
    }
    let vivant = true;
    estBeta(jeton).then((v) => {
      if (vivant) setBeta(v);
    });
    return () => {
      vivant = false;
    };
  }, [eleve?.token]);

  if (!beta) return null;

  const params = new URLSearchParams({ page });
  // 300 signes : au-delà, l'API tronque de toute façon, et une URL trop longue
  // se fait couper en route.
  if (question) params.set("question", question.slice(0, 300));
  if (notion) params.set("notion", notion);
  if (ressource) params.set("ressource", ressource);

  return (
    <Link
      href={`/signaler-une-erreur?${params.toString()}`}
      prefetch={false}
      title="Réservé aux bêta testeurs : signaler cette question, avec son contexte."
      className={`inline-flex items-center gap-1 rounded-full border border-amber-300/60 bg-amber-100/80 px-3 py-1 text-xs font-black text-amber-900 transition hover:bg-amber-200 ${className}`}
    >
      🧪 Un problème ici ?
    </Link>
  );
}
