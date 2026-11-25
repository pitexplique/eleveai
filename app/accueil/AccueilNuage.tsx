// L'ACCUEIL EN NUAGE (24/11/2026), monté par /accueil depuis le 24/11 (« Oui, bascule ») et par /accueil-2.
//
// Frédéric, 24/11 : « les élèves attendent de faire des choses dans l'ordinateur
// qui leur correspond. […] Le modal avec la carte est super et le CEO doit en
// tenir compte pour la page d'accueil » ; « Il y a 2 cas » : pas connecté, on
// montre ce qu'on peut faire (et ce qu'un compte ajoute) ; connecté, son nuage.
// Ordre : 1. le titre (choisi le 24/11) + le nuage de Ti Margo ; 2. un chemin
// court « Parent ou prof ? » vers la partie qui vend (chiffres, Famille à gauche,
// Prof à droite) ; 3. Choisis ta classe ; 4. une ligne sur Frédéric.

import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";
import { CollinesAccueil } from "@/components/accueil/dessins/PaysageAccueil";
import RechercheEntete from "@/components/accueil/RechercheEntete";
import NuageAccueil from "@/components/accueil/NuageAccueil";
import { BandeChiffres, EncartsFamilleProf } from "@/components/accueil/CompteurFamille";
import { ChoisisTaClasse } from "./AccueilCeo";

const slab = Roboto_Slab({ subsets: ["latin"], weight: ["700"], display: "swap" });

export default function AccueilNuage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      <div className="border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
        <RechercheEntete variante="page" />
      </div>

      {/* 1. LE TITRE ET LE NUAGE : chacun choisit par où commencer. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-50">
        <CollinesAccueil className="absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[200px]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-6 sm:pb-12 sm:pt-8">
          <h1 className={`${slab.className} text-center text-[1.6rem] font-bold leading-tight text-teal-800 sm:text-4xl lg:text-5xl`}>
            Progressons ensemble en maths, <span className="whitespace-nowrap text-sky-700">chaque jour.</span>
          </h1>
          <div className="mt-5">
            <NuageAccueil />
          </div>
          <p className="mt-3 text-center">
            <Link
              href="#parents-profs"
              className="inline-block whitespace-nowrap rounded-full bg-white/90 px-5 py-2 text-base font-black text-violet-800 shadow ring-1 ring-violet-200 hover:ring-violet-400"
            >
              {/* 25/11 : plus court, pour tenir sur une ligne en 375 px (la flèche tombait sur le dessin). */}
              Parent ou prof ? Par ici ↓
            </Link>
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* 2. LA PARTIE QUI VEND : la preuve, puis Famille à gauche et Prof à droite. */}
        <section id="parents-profs" className="mt-10 scroll-mt-24" aria-label="Pour les familles et les professeurs">
          <h2 className="mb-4 text-center text-3xl font-black sm:text-4xl">Parents et profs</h2>
          <BandeChiffres />
          <div className="mt-6">
            <EncartsFamilleProf />
          </div>
        </section>

        {/* 3. CHOISIS TA CLASSE */}
        <section id="classes" className="mt-14 scroll-mt-24">
          <ChoisisTaClasse />
        </section>

        {/* 4. QUI EST DERRIÈRE */}
        <section className="mx-auto mt-14 flex max-w-3xl items-center gap-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-visage.webp"
            alt="Frédéric"
            width={96}
            height={96}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-teal-200"
          />
          <p className="font-bold text-slate-700">
            Fait par Frédéric, professeur de maths à La Réunion. Il le corrige chaque semaine avec ses élèves.
          </p>
        </section>
      </main>
    </div>
  );
}
