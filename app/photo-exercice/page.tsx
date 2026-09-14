// app/photo-exercice/page.tsx
//
// La feuille d'exercices photographiée → les chemins dans le coach.
// Née le 13/09/2026 de l'histoire de sa fille (voir la mémoire
// « photo-d-un-exercice-vers-les-liens-du-coach »). La brique vit aussi dans la
// colonne de gauche de l'accueil ; cette page est l'adresse qu'on peut envoyer
// à quelqu'un, et celle qu'on cherche.
//
// ⚠️ Les trois gestes vont ensemble : pas de noindex ici, une ligne dans
// app/sitemap.ts, et un lien sur le site (le champ de recherche du coach).

import type { Metadata } from "next";
import PhotoExercice from "@/components/photo-exercice/PhotoExercice";

// ⚠️ force-dynamic : 0 « ISR read » sur le quota Vercel, comme /photo-cours.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photographier un exercice et trouver la série du coach",
  description:
    "Photographie ta feuille d'exercices ou dépose le PDF : EleveAI reconnaît chaque exercice et t'indique la notion et les séries du coach pour t'entraîner dessus, du CP à la Terminale.",
};

export default async function PhotoExercicePage({
  searchParams,
}: {
  searchParams: Promise<{ classe?: string; annee?: string; matiere?: string }>;
}) {
  const sp = await searchParams;
  return (
    // Le même fond clair que le coach : sans lui, la page hérite du fond sombre
    // du site et le titre disparaît (vu au premier rendu, 13/09).
    <main className="min-h-screen bg-[#f5f8ef] text-slate-800">
      <div className="mx-auto max-w-xl px-4 py-8">
        <h1 className="text-xl font-bold text-slate-900">Ta feuille d&apos;exercices, et les séries qui vont avec</h1>
        <p className="mt-2 text-sm text-slate-600">
          Tu photographies la feuille, ou tu déposes le PDF. Pour chaque exercice, tu vois la notion du coach
          et les séries où t&apos;entraîner, une question à la fois, corrigée.
        </p>
        <div className="mt-6">
          <PhotoExercice
            classeInitiale={sp.classe ?? null}
            anneeInitiale={sp.annee ?? null}
            matiereInitiale={sp.matiere ?? null}
          />
        </div>
      </div>
    </main>
  );
}
