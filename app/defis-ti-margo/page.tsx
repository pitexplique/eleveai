// app/defis-ti-margo/page.tsx
//
// ⭐ LA RUBRIQUE « LES DÉFIS DE TI MARGO » (27/09/2026) — le calcul mental en
// BD, SANS CLASSE : les planches se rangent par savoir. Voir
// `lib/defis-ti-margo/planches.ts` pour les principes.
// ⛔ Aucune étiquette d'âge ni de classe dans la page (règle du 06/09, et
// Frédéric le 27/09 : « des élèves ont du mal même en CE2 »).

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SceneBD } from "@/components/defis/SceneBD";
import { PLANCHES } from "@/lib/defis-ti-margo/planches";

// ⚠️ Pas de « — EleveAI » : le layout racine l'ajoute.
export const metadata: Metadata = {
  title: "Les défis de Ti Margo : le calcul mental en BD",
  description:
    "Des petites histoires en BD pour apprendre à calculer de tête : les compléments à 10, les doubles, les dizaines. Ti Margo et Pic posent les questions, lues à voix haute ; on répond, on gagne des étoiles. Pour s'entraîner à son rythme, quel que soit son âge.",
  alternates: { canonical: "/defis-ti-margo" },
};

const ENCRE = "#3b2a1a";

export default function DefisPage() {
  return (
    <main className="defis mx-auto max-w-4xl px-4 py-8" style={{ color: ENCRE }}>
      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex shrink-0 items-end gap-1">
          <Image src="/cahier-vacances/ti-margo.png" alt="Ti Margo, le margouillat" width={110} height={137} priority />
          <Image src="/personnages/pic/pic-pose-sans-branche.svg" alt="Pic, le paille-en-queue" width={150} height={74} unoptimized />
        </div>
        <div>
          <h1 className="font-titre text-4xl font-bold">Les défis de Ti Margo</h1>
          <p className="mt-2 text-lg">
            Ti Margo le margouillat et son copain Pic, le paille-en-queue, te lancent des défis de calcul mental en BD.
            Les questions sont lues à voix haute : on écoute, on réfléchit, on tape sa réponse… et on gagne des étoiles !
          </p>
        </div>
      </header>

      <h2 className="font-titre mt-10 text-2xl font-bold">Les planches</h2>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2">
        {PLANCHES.map((p) => (
          <li key={p.slug}>
            <Link href={`/defis-ti-margo/${p.slug}`}
              className="block overflow-hidden rounded-3xl border-[5px] bg-white shadow-[6px_6px_0_#3b2a1a] transition hover:-translate-y-1"
              style={{ borderColor: ENCRE }}>
              <SceneBD scene={{ type: "feuille", presents: 7 }} qui="margo" humeur="malin" indice={0} />
              <div className="p-4">
                <p className="font-titre text-sm font-bold uppercase tracking-wide text-orange-600">{p.savoir}</p>
                <p className="font-titre text-2xl font-bold">{p.titre}</p>
                <p className="mt-1">{p.description}</p>
              </div>
            </Link>
          </li>
        ))}
        <li className="flex items-center justify-center rounded-3xl border-4 border-dashed p-6 text-center font-titre text-lg font-bold" style={{ borderColor: ENCRE }}>
          Bientôt : le papillon des doubles, les familles de dix… 🦋
        </li>
      </ul>
    </main>
  );
}
