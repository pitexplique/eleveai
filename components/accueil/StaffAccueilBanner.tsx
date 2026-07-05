"use client";

// Bandeau affiché EN TÊTE de l'accueil pour un prof/principal connecté, À LA
// PLACE du hero élève (sélecteur d'audience) : un staff n'a que faire du coach
// IA élève, on l'envoie droit à son tableau de bord. Rend `null` pour tout le
// reste (élève connecté, visiteur) → l'accueil garde son hero normal.

import Link from "next/link";
import { useEleve } from "@/context/EleveContext";

export default function StaffAccueilBanner() {
  const { eleve } = useEleve();
  const type = eleve?.type_utilisateur;
  const isPrincipal = type === "principal" || type === "boss";
  const isProf = type === "prof";
  if (!isProf && !isPrincipal) return null;

  const href = isPrincipal ? "/dashboard-principal" : "/dashboard-prof";
  const label = isPrincipal ? "Espace principal" : "Espace professeur";

  return (
    <section className="bg-gradient-to-br from-[#062A4F] to-[#041B33] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-blue-300/20 bg-white/[0.06] p-8 text-center shadow-2xl sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200/70">
            {label}
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">
            Bonjour, voici votre tableau de bord
          </h2>
          <p className="mt-2 text-sm font-semibold leading-snug text-white/60">
            Progression de vos élèves, activité récente et points à renforcer —
            en temps réel.
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 px-6 py-3 text-sm font-black text-[#041B33] shadow-lg transition hover:brightness-110"
        >
          Ouvrir mon tableau de bord →
        </Link>
      </div>
    </section>
  );
}
