// LES DEUX CARTES DU MENU DU JOUR, À IMPRIMER (21/11/2026, Frédéric : « une belle
// carte pour chaque prof et une autre pour chaque élève, l'une à côté de l'autre »).
// A4 paysage : la carte du prof à gauche, celle de l'élève à droite.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BoutonImprimer from "@/components/BoutonImprimer";
import MenuDuJour from "@/components/seances/MenuDuJour";
import { SEANCES } from "@/lib/seances/seances";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return SEANCES.filter((s) => s.menu).map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const s = SEANCES.find((x) => x.id === id);
  return {
    title: s ? `Menu du jour à imprimer : ${s.titre} (${s.niveau})` : "Menu du jour",
    description: "La carte du prof et la carte de l'élève, côte à côte, à imprimer.",
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const seance = SEANCES.find((x) => x.id === id);
  if (!seance?.menu) notFound();
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 print:max-w-none print:p-0">
      <style>{"@page { size: A4 landscape; margin: 8mm; }"}</style>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-white print:text-black">Le menu du jour, à imprimer</h1>
          <p className="text-slate-300">
            {seance.titre} · {seance.niveau} · {seance.notion}. La carte du prof à gauche, celle de l&apos;élève à droite.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/seances#${seance.id}`} className="font-bold text-slate-200 underline">
            Voir la séance
          </Link>
          <BoutonImprimer />
        </div>
      </div>
      <MenuDuJour menu={seance.menu} avecEleve />
    </main>
  );
}
