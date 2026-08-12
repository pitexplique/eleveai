// app/photo-cours/page.tsx
//
// LE BANC D'ESSAI. Frédéric, 12/08/2026 : « j'aimerais essayer ».
//
// Cette page n'existe que pour manipuler la brique. Elle n'est liée nulle part,
// elle n'est pas dans le sitemap, et elle est en noindex : tant qu'on essaie,
// on n'annonce rien. Le jour où ça tient, <PhotoCours /> se pose dans
// /espace-profs et cette page peut disparaître sans que rien ne bouge.

import type { Metadata } from "next";
import PhotoCours from "@/components/photo-cours/PhotoCours";

// ⚠️ force-dynamic : 0 « ISR read » sur le quota Vercel. Ne pas retirer.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photographier un cours — essai",
  robots: { index: false, follow: false },
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
