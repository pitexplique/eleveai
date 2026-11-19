// /enigmes/<classe>/<notion-slug> — les 6 énigmes d'une notion, à projeter.
// Données : lib/enigmes/<classe>/<notionId>.ts, via lib/enigmes/registre.ts.
// Sans l'habillage du site (components/MasqueSurEmbed.tsx) : c'est un écran
// de classe, plein écran.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kalam, Atkinson_Hyperlegible } from "next/font/google";
import { getEnigmes, listerEnigmes } from "@/lib/enigmes/registre";
import ProjectionEnigmes from "./ProjectionEnigmes";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam" });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-atkinson" });

type Params = { classe: string; notion: string };

export function generateStaticParams(): Params[] {
  return listerEnigmes().map((n) => ({ classe: n.classe, notion: n.notionId.replace(/_/g, "-") }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { classe, notion } = await params;
  const data = getEnigmes(classe, notion);
  if (!data) return {};
  return {
    title: `${data.titre} (${data.classe}) à projeter en classe`,
    description: `Six énigmes à projeter (${data.classe}) : ${data.description}`,
    alternates: { canonical: `/enigmes/${classe}/${notion}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { classe, notion } = await params;
  const data = getEnigmes(classe, notion);
  if (!data) notFound();
  return (
    <ProjectionEnigmes
      data={data}
      retourHref={`/enigmes-slide#${data.classe}`}
      fonts={`${kalam.variable} ${atkinson.variable}`}
    />
  );
}
