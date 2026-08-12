// app/photo-cours/page.tsx
//
// Née banc d'essai le matin du 12/08/2026 (Frédéric : « j'aimerais essayer »),
// devenue une porte le soir même.
//
// Elle a vécu trois heures en noindex, liée nulle part — le temps qu'on la
// regarde. Depuis, elle est une chip de la matrice chez l'enseignant et une
// entrée du sitemap. La fonction, elle, N'A TOUJOURS PAS ÉTÉ ESSAYÉE sur une
// vraie photo de cahier manuscrit : la page est publique, la promesse ne l'est
// pas encore. C'est le seul écart à surveiller.
//
// Le composant reste autonome : <PhotoCours /> se pose dans /espace-profs le
// jour où on le décide, et cette page peut disparaître sans que rien ne bouge.

import type { Metadata } from "next";
import PhotoCours from "@/components/photo-cours/PhotoCours";

// ⚠️ force-dynamic : 0 « ISR read » sur le quota Vercel. Ne pas retirer.
export const dynamic = "force-dynamic";

// ⚠️ LE `noindex` A SAUTÉ LE 12/08, le jour où la page est entrée au sitemap.
// Les deux ensemble se contredisent : on annonce l'adresse à Google et on lui
// interdit de l'ouvrir. Il fallait choisir, et Frédéric a choisi la porte.
//
// Le titre ne dit donc plus « essai » et ne porte pas « EleveAI » : il dit ce
// qu'un professeur TAPE quand il cherche cet outil, parce que personne ne
// cherche le nom d'une chose qu'il ne connaît pas encore.
export const metadata: Metadata = {
  title: "Photographier un cours et en faire des exercices",
  description:
    "Photographiez le cours écrit au tableau ou dans le cahier : vous relisez ce qui a été lu, puis vous obtenez des exercices, une séance ou une évaluation appuyés sur votre cours, avec vos notations et vos exemples.",
};

export default function PhotoCoursPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-xl font-bold text-slate-900">
        Photographier un cours
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Vous photographiez le cours écrit au tableau ou dans le cahier. La
        machine vous dit d&apos;abord ce qu&apos;elle a lu — vous corrigez si
        elle s&apos;est trompée — puis elle produit les exercices, la séance ou
        l&apos;évaluation <strong>à partir de votre cours</strong>, avec vos
        notations et vos exemples.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        La photo n&apos;est jamais conservée : elle est lue, puis oubliée.
        Accessible à tout compte connecté.
      </p>

      <div className="mt-6">
        <PhotoCours />
      </div>
    </main>
  );
}
