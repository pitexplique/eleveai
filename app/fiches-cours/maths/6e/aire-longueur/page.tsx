import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLongueurs6e,
  slidesLongueurs6e,
} from "@/lib/fiches/maths-6e-longueurs";

export const metadata: Metadata = {
  title: "Les longueurs — 6e : cours et exercices corrigés",
  description:
    "Définition, unités, conversions, exemples corrigés et exercices : la fiche de cours complète des longueurs en 6e, à lire, imprimer ou réviser en flashcards.",
};

export default function LongueursSixiemePage() {
  return (
    <>
      <FicheCoursClient fiche={ficheLongueurs6e} slides={slidesLongueurs6e} />
      {/* 19/11/2026 (Frédéric) : les 6 énigmes au tableau noir, à projeter
          (données lib/problemes/6e/aire_longueur.ts). */}
      <p className="mx-auto mb-10 max-w-3xl px-4 text-center print:hidden">
        <a
          href="/enigmes-mathematiques/6e/aire-longueur"
          className="inline-block rounded-full bg-emerald-800 px-6 py-3 font-black text-white hover:bg-emerald-900"
        >
          🧩 Projeter les 6 énigmes sur les longueurs
        </a>
      </p>
    </>
  );
}
