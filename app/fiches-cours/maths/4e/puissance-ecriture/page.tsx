// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePuissances4e,
  slidesPuissances4e,
} from "@/lib/fiches/maths-4e-puissances";

export const metadata: Metadata = {
  title: "Puissances et notation scientifique — 4e : cours et exercices corrigés",
  description:
    "Comprendre l'écriture d'une puissance, calculer un exposant positif ou négatif, utiliser les puissances de 10, écrire et comparer des nombres en notation scientifique : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function PuissancesQuatriemePage() {
  return (
    <>
      <FicheCoursClient
        fiche={fichePuissances4e}
        slides={slidesPuissances4e}
      />
      {/* 19/11/2026 (Frédéric) : les 6 énigmes au tableau noir, à projeter
          (données lib/enigmes/4e/puissance_ecriture.ts). */}
      <p className="mx-auto mb-10 max-w-3xl px-4 text-center print:hidden">
        <a
          href="/enigmes/4e/puissance-ecriture"
          className="inline-block rounded-full bg-emerald-800 px-6 py-3 font-black text-white hover:bg-emerald-900"
        >
          🧩 6 énigmes des puissances à projeter en classe
        </a>
      </p>
    </>
  );
}
