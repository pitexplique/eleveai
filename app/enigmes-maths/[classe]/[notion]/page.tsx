// /enigmes-maths/<classe>/<notion-slug> — les 6 problèmes d'une notion, à projeter.
// Données : lib/problemes/<classe>/<notionId>.ts, via lib/problemes/registre.ts.
// Sans l'habillage du site (components/MasqueSurEmbed.tsx) : c'est un écran
// de classe, plein écran.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kalam, Atkinson_Hyperlegible } from "next/font/google";
import { getProblemes, listerProblemes } from "@/lib/problemes/registre";
import { getNotionProgramme } from "@/lib/programme";
import ProjectionProblemes from "./ProjectionProblemes";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam" });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-atkinson" });

type Params = { classe: string; notion: string };

export function generateStaticParams(): Params[] {
  return listerProblemes().map((n) => ({ classe: n.classe, notion: n.notionId.replace(/_/g, "-") }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { classe, notion } = await params;
  const data = getProblemes(classe, notion);
  if (!data) return {};
  // Schéma du titre (19/11) : « Théorème de Pythagore 4e : 6 énigmes à
  // projeter en classe (défis et questions flash corrigés) ».
  const sujet = getNotionProgramme(classe, "maths", notion)?.label ?? data.titre;
  const niveau = getNotionProgramme(classe, "maths", notion)?.classeLabel ?? data.classe;
  return {
    title: `${sujet} ${niveau} : 6 énigmes à projeter en classe (défis et questions flash corrigés)`,
    description: `Diaporama à projeter, ${niveau} : ${data.description} Six énigmes en contexte, comme un problème du jour, avec un piège et un défi maths, avec minuteur et correction expliquée.`,
    alternates: { canonical: `/enigmes-maths/${classe}/${notion}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { classe, notion } = await params;
  const data = getProblemes(classe, notion);
  if (!data) notFound();
  return (
    <ProjectionProblemes
      data={data}
      retourHref={`/enigmes-maths#${data.classe}`}
      fonts={`${kalam.variable} ${atkinson.variable}`}
    />
  );
}
