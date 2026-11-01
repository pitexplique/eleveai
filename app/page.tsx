// app/page.tsx — eleveai.fr/ : la PAGE D'ENTRÉE, « Quel chemin prends-tu ? » (01/11/2026).
//
// Frédéric : « qu'on n'atterrisse pas directement sur la page d'accueil » →
// plus de redirection vers /accueil : un arbre à deux branches, le coach ou le
// Journal d'EleveAI, et Ti Margo qui grimpe (./ChoixEntree.tsx). Les clics
// sont comptés dans Supabase (supabase/choix_entree.sql).
// 👉 RETOUR ARRIÈRE : `git show c70cfe69:app/page.tsx > app/page.tsx` (le redirect).
// ⚠️ On TRANSMET toujours la query aux deux chemins : les liens de campagne
// (?utm_source=...) arrivant sur / perdaient leurs UTM → trafic invisible.
// ⚠️ noindex : pour Google, la page d'entrée reste /accueil (son titre, sa
// description, ses liens) ; cette fourche n'a rien à lui dire.
import type { Metadata } from "next";
import ChoixEntree from "./ChoixEntree";
import { arbreDuJour, arbreParSlug } from "@/lib/accueil/arbre-du-jour";

export const metadata: Metadata = {
  title: "EleveAI — quel chemin prends-tu ?",
  robots: { index: false, follow: true },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  // ?arbre=baobab : voir un arbre précis (aperçu) ; il ne suit pas vers le coach ou le Journal.
  const apercu = typeof params.arbre === "string" ? arbreParSlug(params.arbre) : undefined;
  const qs = new URLSearchParams(
    Object.entries(params).filter(([k]) => k !== "arbre").flatMap(([k, v]) =>
      v === undefined ? [] : Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v]],
    ) as [string, string][],
  ).toString();
  return <ChoixEntree suite={qs ? `?${qs}` : ""} arbre={apercu ?? arbreDuJour()} />;
}
