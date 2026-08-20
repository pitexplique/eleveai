"use client";

// ─── Les encarts de la page de garde d'une fiche ───────────────────────────────
// LE POINT D'ENTRÉE UNIQUE pour ce qui s'ajoute sous l'accroche d'une fiche :
// aujourd'hui la dictée du jour pour le français, demain autre chose, sans
// jamais rouvrir `FicheCoursClient` (900 lignes) pour changer un lien ou une
// phrase. Un encart = une entrée dans `ENCARTS`, filtrée par matière.
//
// Deux règles tenues ici :
// - `screen-only` : une fiche s'imprime pour la classe, et un papier ne renvoie
//   nulle part. Aucun encart ne part à l'impression.
// - un encart PROPOSE, il n'interrompt pas : il vit sous l'accroche, dans la
//   couleur de sa matière, jamais entre deux blocs du cours.

import Link from "next/link";
import { ChevronRight, PenLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Encart = {
  id: string;
  /** Les matières où l'encart s'affiche (`fiche.matiere`). */
  matieres: string[];
  /** Les classes concernées ; absent = toutes. */
  classes?: string[];
  href: string;
  titre: string;
  texte: string;
  icone: LucideIcon;
  /** Les trois classes de couleur, pour que l'encart reste dans le ton de sa
   *  matière (le français est violet, comme son hub). */
  couleurs: { carte: string; pastille: string; fleche: string };
};

const ENCARTS: Encart[] = [
  {
    id: "dictee-du-jour",
    matieres: ["francais"],
    href: "/dictee-du-jour",
    titre: "La dictée du jour",
    // Une règle d'accord se retient en écrivant, pas en relisant : la fiche
    // envoie vers l'exercice quotidien qui la met en œuvre.
    texte:
      "Les accords de cette fiche, à écrire pour de vrai — une dictée courte, corrigée tout de suite.",
    icone: PenLine,
    couleurs: {
      carte: "border-violet-200 bg-violet-50 hover:border-violet-300 hover:bg-violet-100",
      pastille: "bg-violet-500 shadow-violet-500/30",
      fleche: "text-violet-500",
    },
  },
];

export default function EncartsFiche({
  matiere,
  classe,
}: {
  matiere: string;
  classe: string;
}) {
  const visibles = ENCARTS.filter(
    (e) =>
      e.matieres.includes(matiere) &&
      (!e.classes || e.classes.includes(classe.toLowerCase()))
  );
  if (!visibles.length) return null;

  return (
    <div className="screen-only mt-5 grid gap-3">
      {visibles.map((encart) => {
        const Icone = encart.icone;
        return (
          <Link
            key={encart.id}
            href={encart.href}
            className={`flex items-center gap-4 rounded-2xl border p-4 transition ${encart.couleurs.carte}`}
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-lg ${encart.couleurs.pastille}`}
            >
              <Icone className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-black text-slate-900">
                {encart.titre}
              </span>
              <span className="mt-0.5 block text-sm leading-6 text-slate-600">
                {encart.texte}
              </span>
            </span>
            <ChevronRight
              className={`ml-auto h-5 w-5 shrink-0 ${encart.couleurs.fleche}`}
            />
          </Link>
        );
      })}
    </div>
  );
}
