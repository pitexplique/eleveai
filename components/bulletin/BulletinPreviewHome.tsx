"use client";

import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import BulletinDashboard from "@/components/bulletin/BulletinDashboard";
import type { Bulletin } from "@/lib/bulletin/types";

// Aperçu du tableau de bord sur la page d'accueil, pour les visiteurs NON
// connectés : on montre un bulletin de démonstration pour donner envie de
// s'inscrire. Masqué dès qu'un élève est connecté (il a le sien dans son espace).

const DEMO: Bulletin = {
  prenom: "Léa",
  classe: "4e B · exemple",
  computed_at: new Date().toISOString(),
  periodes: {
    "30j": {
      moyenne: 16.1,
      progression: 2.9,
      assiduite: { jours: 18, niveau: "Régulier" },
      matieres: [
        { matiere: "anglais", note: 16, nb: 7, progression: 1 },
        { matiere: "maths", note: 14, nb: 10, progression: 2.8 },
        { matiere: "espagnol", note: 13, nb: 5, progression: null },
        { matiere: "francais", note: 11, nb: 6, progression: -0.5 },
      ],
      appreciation:
        "Beau travail en anglais (16/20) ! Belle progression d'ensemble (+2,9 pts), continue comme ça. Encore un peu d'entraînement en français et tu décolles.",
    },
    trim: {
      moyenne: 13.5,
      progression: 1.4,
      assiduite: { jours: 47, niveau: "Régulier" },
      matieres: [
        { matiere: "anglais", note: 15, nb: 20, progression: 1.2 },
        { matiere: "maths", note: 13, nb: 24, progression: 1.6 },
        { matiere: "espagnol", note: 12, nb: 12, progression: 0.8 },
        { matiere: "francais", note: 12, nb: 15, progression: 0.5 },
      ],
      appreciation:
        "Trimestre solide et régulier : toutes tes matières sont au-dessus de 12/20, avec l'anglais en tête. Garde ce rythme, ça paie.",
    },
    debut: {
      moyenne: 12.8,
      progression: 4,
      assiduite: { jours: 120, niveau: "Assidu" },
      matieres: [
        { matiere: "anglais", note: 14, nb: 40, progression: 3.5 },
        { matiere: "maths", note: 12.5, nb: 55, progression: 4.4 },
        { matiere: "francais", note: 12.5, nb: 30, progression: 1.8 },
        { matiere: "espagnol", note: 11.5, nb: 25, progression: 3 },
      ],
      appreciation:
        "Énorme parcours depuis le début : +4 pts de progression, c'est remarquable ! Ton assiduité explique tes progrès.",
    },
  },
};

export default function BulletinPreviewHome() {
  const { eleve } = useEleve();
  const connecte = Boolean(eleve?.code_etablissement?.trim() && eleve?.code_eleve?.trim());
  if (connecte) return null;

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300/80">
            Ton bulletin vivant
          </p>
          <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
            🏁 Ton tableau de bord, mis à jour à chaque exercice
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-white/70">
            Notes sur 20, progression, assiduité, appréciation : ton bulletin se construit
            tout seul pendant que tu t&apos;entraînes. Voici un exemple 👇
          </p>
        </div>

        <div className="relative">
          <BulletinDashboard bulletin={DEMO} />
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black text-slate-900 shadow">
            Aperçu
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <Link
            href="/auth/signin?mode=eleve"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-3 text-sm font-black text-[#041B33] shadow-lg transition hover:brightness-110"
          >
            Crée ton compte pour voir le tien →
          </Link>
          <p className="text-xs font-semibold text-white/50">
            Déjà inscrit ?{" "}
            <Link href="/auth/signin?mode=eleve" className="text-cyan-200 underline hover:text-cyan-100">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
