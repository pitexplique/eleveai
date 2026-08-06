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
import Image from "next/image";
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
          {/* « PROPOSE », pas « trouve » : le moteur sort deux ou trois
              ressources compatibles, il ne devine pas LA bonne — on ne promet
              pas plus que ce que fait ressources.ts.
              « VÉRIFIÉES », pas « adaptées » : adapté ne veut rien dire, tout
              le monde l'écrit. Ce qui distingue vraiment, c'est qu'un
              enseignant les a relues.
              Et on tutoie, comme deux lignes plus bas. L'origine reste, en
              petit, APRÈS la promesse : La Réunion est une bonne histoire, pas
              un bon mot-clé. */}
          <header className="mb-10 text-center">
            {/* ⭐ TI MARGO RESTE. Il est parti avec la manchette lors de la
                refonte — il était dans le titre du journal. Or il n'appartient
                pas au journal : c'est la figure d'EleveAI, dessinée, celle des
                vidéos et des cahiers. Une page d'entrée peut être sobre sans
                être anonyme. */}
            <Image
              src="/cahier-vacances/ti-margo.png"
              alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
              width={1122}
              height={1402}
              sizes="72px"
              priority
              className="mx-auto mb-3 h-16 w-auto sm:h-20"
            />
            <p className="text-2xl font-semibold tracking-[0.14em] sm:text-3xl">ELEVEAI</p>
            <p className="mt-2 text-sm text-slate-700 sm:text-base">
              L&apos;IA éducative qui te propose des ressources vérifiées
            </p>
            <p className="mt-1 text-xs text-slate-500">Conçue à La Réunion</p>
          </header>

          <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
            {/* L'entrée n'affiche plus l'historique sous la recherche : c'est
                la colonne de gauche qui le porte, et lui seul. Sur téléphone
                la colonne devient un tiroir (bouton ☰) — le RÉCENT reste donc
                atteignable, à un geste plutôt qu'à zéro. */}
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
