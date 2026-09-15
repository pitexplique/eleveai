"use client";

// ─── Le pont fiche de cours → fiche d'exercices (15/09/2026) ───────────────────
// Frédéric : « pour FicheCoursClient tu peux le mettre en composant partagé ».
// Même principe que `EncartsFiche` : ce qui s'ajoute à une fiche de cours vit
// dans son propre composant, et `FicheCoursClient` (1 300 lignes, partagé) ne
// porte qu'une ligne de montage par emplacement.
//
// Le composant ne rend RIEN si la notion n'a pas de feuille : une fiche ne
// promet que ce qui existe (la leçon de VideoNotion). Et rien à l'impression :
// un papier ne renvoie nulle part.
//
// Deux habillages, pour deux moments de la lecture :
//   • `encart` — sous l'accroche, pour l'élève qui vient chercher des exercices
//     et n'a pas à lire onze sections pour découvrir qu'ils existent ;
//   • `bouton` — dans la rangée des boutons du bas, à côté du coach et du PDF.

import Link from "next/link";
import { ArrowRight, PencilLine } from "lucide-react";
import { ficheExercicesPourCours } from "@/lib/fiches-exercices/registre";

export default function LienFicheExercices({
  matiere,
  classe,
  notion,
  variante,
}: {
  matiere: string;
  classe: string;
  notion: string;
  variante: "encart" | "bouton";
}) {
  const feuille = ficheExercicesPourCours(matiere, classe, notion);
  if (!feuille) return null;

  if (variante === "bouton") {
    return (
      <Link
        href={feuille.href}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-black text-amber-900 shadow-sm transition hover:bg-amber-100"
      >
        <PencilLine className="h-4 w-4" />
        {feuille.titre}
      </Link>
    );
  }

  return (
    <Link
      href={feuille.href}
      className="screen-only group mt-5 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition hover:border-amber-300 hover:bg-amber-100"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
        <PencilLine className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-black text-slate-900">{feuille.titre}</span>
        <span className="mt-0.5 block text-sm leading-6 text-slate-600">
          Une feuille à part, du geste seul au problème de contrôle, avec un rappel
          de cours avant chaque niveau et chaque corrigé étape par étape.
        </span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-amber-600 transition group-hover:translate-x-0.5" />
    </Link>
  );
}
