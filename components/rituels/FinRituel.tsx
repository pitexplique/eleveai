"use client";

// LE BAS DE PAGE DES RITUELS DE LANGUE (anglais du jour, espagnol du jour) —
// le moment de conversion (Frédéric, 25/07) : à la fin des 5 mots, deux voies
// claires — CONTINUER avec le coach (s'entraîner pour de vrai), ou S'ENREGISTRER
// pour garder sa mémoire et sa progression.
//
// Aujourd'hui la série + la répétition espacée vivent en localStorage (donc sur
// CET appareil). Le compte, c'est ce qui les fera suivre partout et remonter au
// prof — d'où l'invitation. Le branchement serveur reste à faire.

import Link from "next/link";
import { useEleve } from "@/context/EleveContext";

export default function FinRituel({
  coachHref,
  coachLabel,
}: {
  coachHref: string;
  coachLabel: string;
}) {
  const { eleve } = useEleve();
  const connecte = !!eleve?.token;

  return (
    <div className="mt-5 space-y-2.5">
      {/* Voie 1 — s'entraîner pour de vrai : le coach. */}
      <Link
        href={coachHref}
        className="block rounded-xl bg-indigo-600 px-6 py-3 text-base font-black text-white shadow-sm hover:bg-indigo-700"
      >
        ✍️ {coachLabel}
      </Link>

      {/* Voie 2 — garder sa mémoire et progresser. */}
      {connecte ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800">
          🔥 Te voilà connecté — ta série est gardée et tes mots reviennent au bon moment.
        </p>
      ) : (
        <Link
          href="/auth/signin?mode=eleve"
          className="block rounded-xl border-2 border-indigo-600 px-6 py-3 text-center text-base font-black text-indigo-700 transition hover:bg-indigo-50"
        >
          💾 Crée ton espace — garde ta mémoire et ta progression
        </Link>
      )}
    </div>
  );
}
