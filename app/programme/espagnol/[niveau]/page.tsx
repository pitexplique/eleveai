// /programme/espagnol/<niveau> — une page par niveau, pas par notion.
// ⚠️ CE DOSSIER STATIQUE PASSE AVANT `[classe]`, et c'est ce qui fait marcher
// l'adresse : Next résout un segment littéral avant un segment dynamique de
// même profondeur. Sans lui, « espagnol » serait lu comme un nom de classe et
// `getProgrammeClasse` rendrait un 404.

import { notFound } from "next/navigation";
import { PageNiveau, metadataNiveau } from "@/components/programme/PageNiveau";
import {
  NIVEAUX_HORS_CLASSE,
  getNiveauHorsClasse,
} from "@/lib/programme";

const MATIERE = "espagnol" as const;

export function generateStaticParams() {
  return NIVEAUX_HORS_CLASSE[MATIERE].map((niveau) => ({ niveau }));
}

type Params = Promise<{ niveau: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { niveau } = await params;
  const pack = getNiveauHorsClasse(MATIERE, niveau);
  if (!pack) return {};
  return metadataNiveau(MATIERE, niveau, pack);
}

export default async function Page({ params }: { params: Params }) {
  const { niveau } = await params;
  const pack = getNiveauHorsClasse(MATIERE, niveau);
  if (!pack) notFound();
  return <PageNiveau matiere={MATIERE} niveau={niveau} pack={pack} />;
}
