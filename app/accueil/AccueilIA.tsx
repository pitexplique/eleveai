"use client";

// LA NOUVELLE PAGE D'ACCUEIL — « Dis-nous ce que tu cherches », et rien d'autre.
//
// Ce que cet écran ne fait PAS, et c'est le sujet :
//   — aucune requête Supabase (l'ancienne page en lançait sept avant d'afficher
//     quoi que ce soit : avis, maths_974, catalogue, la Une, les articles ×2) ;
//   — aucun composant de journal monté (manchette, oreilles, Une, courrier,
//     édito, catalogue, machines, dictée, défis…). Non pas masqués en CSS :
//     pas importés du tout, donc absents du bundle de cette route ;
//   — aucun Coach IA. Il reste dans Tutor v4, là où un contexte pédagogique
//     existe — une notion, une question, une réponse, une erreur. Sur un écran
//     d'accueil il n'aurait rien de tout ça, et il ferait doublon avec l'entrée.
//
// L'ancien AccueilClient.tsx reste sur le disque : ses rubriques vivent
// toujours à leurs routes, et ses ressources sont dans ressources.ts.

import { Suspense } from "react";
import Link from "next/link";
import ColonneGauche from "@/components/accueil/ColonneGauche";
import EntreeMatrice from "@/components/matrice/EntreeMatrice";

/** Un pied de page sobre : des repères, pas une seconde page d'accueil. */
const PIED = [
  { label: "Comment ça marche", href: "/pourquoi-eleveai" },
  { label: "Enseignants", href: "/enseignants" },
  { label: "Établissements", href: "/espace-ecoles" },
  { label: "Parents", href: "/parents" },
  { label: "Toutes les ressources", href: "/explorer" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/qui-sommes-nous" },
  { label: "Aide", href: "/faq" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions", href: "/cgu" },
];

export default function AccueilIA() {
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <ColonneGauche />

      <main className="min-w-0 flex-1">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-12 pt-16 sm:px-6 lg:pt-24">
          <header className="mb-10 text-center">
            <p className="text-2xl font-semibold tracking-[0.14em] sm:text-3xl">ELEVEAI</p>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              L&apos;IA éducative conçue à La Réunion
            </p>
          </header>

          <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
            <EntreeMatrice variante="page" />
          </Suspense>

          <footer className="mt-auto pt-16">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
              {PIED.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} className="hover:text-slate-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </main>
    </div>
  );
}
