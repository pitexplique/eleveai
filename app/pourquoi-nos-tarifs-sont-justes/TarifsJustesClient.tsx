"use client";

import Link from "next/link";
// ⛔ RÉÉCRITE LE 22/08/2026. La page précédente défendait le MODÈLE INVERSE, et
// elle était restée en ligne, au sitemap, sans un seul lien entrant :
//   — « quotas de requêtes », « plafonds », « pas de dépassement facturé » :
//     il n'existe aucun quota dans l'offre, et il n'y en a jamais eu ;
//   — « l'accès aux modèles IA (coût variable par requête) » en tête de la
//     liste de ce que finance un abonnement. ⛔ LE COÛT API N'EST PAS UN
//     ARGUMENT : tout ce que touche un élève tourne en `gpt-4.1-mini`, photo du
//     cours comprise, et une famille très active coûte moins d'un euro par an.
//     Bâtir la justification du prix sur ce coût-là, c'est répondre à un
//     problème qui n'existe pas — et l'aveu serait embarrassant s'il était lu ;
//   — « tu veux un devis ou un cadrage établissement ? » : le prix est ferme
//     depuis le 21/08, et il n'y a plus de devis ;
//   — elle tutoyait un lecteur adulte, seule page du site à le faire ici.
//
// ⭐ SON SUJET, LUI, EST LE BON — c'est même le risque n°1 du positionnement
// (Frédéric, 21/08 : « il faut l'expliquer dans la page tarifs, sinon ils
// voient un prix 10 fois plus bas et pour eux c'est 10 fois moins de
// qualité »). Cette page est le seul endroit où la réponse tient au long.
// ⛔ Elle ne répète pas /tarifs : là-bas on dit COMBIEN, ici on dit POURQUOI.
// Aucun montant n'est écrit à la main — voir `lib/tarifs.ts`.
import { ENSEIGNANT, PRIX_ANNUEL, PRIX_MENSUEL, montant } from "@/lib/tarifs";

export default function TarifsJustesClient() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-8">
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Pourquoi nos tarifs sont justes</span>
          </div>

          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Ce que vous payez · et ce que vous ne payez pas
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Pourquoi {montant(PRIX_ANNUEL)} par an, et pas dix fois plus
            </h1>

            <p className="max-w-3xl text-slate-300">
              Un prix dix fois plus bas que les autres se lit « dix fois moins
              bon » tant que personne n&apos;explique d&apos;où vient l&apos;écart.
              Alors voici l&apos;explication, en entier. Elle tient en une phrase :
              nous n&apos;avons pas les mêmes coûts, et nous ne cherchons pas les
              mêmes choses.
            </p>

            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">À retenir</p>
              <ul className="mt-2 text-sm text-slate-200 space-y-1">
                <li>• L&apos;élève ne paie jamais. Ce qui se paie, c&apos;est de VOIR et de GARDER.</li>
                <li>• Aucun investisseur à rémunérer, aucun commercial à payer.</li>
                <li>• L&apos;IA démultiplie le travail, l&apos;enseignant vérifie. Jamais l&apos;un sans l&apos;autre.</li>
                <li>• Aucun quota, aucun dépassement, aucune facture surprise.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12 space-y-8">
        {/* 1) Ce qu'on n'a pas */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            1) Ce que coûte un logiciel scolaire, et que nous n&apos;avons pas
          </h2>
          <p className="text-sm text-slate-300">
            Dans le prix d&apos;un abonnement éducatif, la part qui revient à
            l&apos;enseignement est petite. Le reste finance une structure — et
            c&apos;est cette structure que nous n&apos;avons pas. Nous ne disons
            rien des comptes des autres : nous ne les connaissons pas. Nous disons
            seulement ce qui, chez nous, n&apos;existe pas.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• <span className="font-semibold">Aucun investisseur</span> à rémunérer, donc aucune rentabilité à atteindre pour quelqu&apos;un d&apos;autre.</li>
            <li>• <span className="font-semibold">Aucun commercial</span>, aucune force de vente, aucun salon.</li>
            <li>• <span className="font-semibold">Des exercices écrits ici</span>, pas achetés à un éditeur au chapitre.</li>
            <li>• <span className="font-semibold">Un élève de plus ne coûte presque rien</span> — c&apos;est pour ça qu&apos;il peut ne jamais payer.</li>
          </ul>
        </div>

        {/* 2) Ce qu'on a */}
        <div className="rounded-2xl border border-emerald-500/25 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            2) Ce que nous avons à la place : l&apos;IA démultiplie, l&apos;enseignant vérifie
          </h2>
          <p className="text-sm text-slate-200">
            Les exercices, les corrections et les explications sont produits avec
            l&apos;aide de l&apos;intelligence artificielle. C&apos;est ce qui
            permet d&apos;écrire en un mois ce qui prenait des années, et donc de
            demander {montant(PRIX_MENSUEL)} par mois.
          </p>
          <p className="text-sm text-slate-200">
            Mais les deux moitiés de cette phrase ne se séparent jamais. Un
            professeur en exercice relit ce qui sort, notion par notion, et le
            corrige — parce qu&apos;un exercice faux ne se voit pas au premier
            coup d&apos;œil, et qu&apos;un élève ne peut pas s&apos;en rendre
            compte. Annoncer que l&apos;IA produit sans dire qui relit, ce serait
            confirmer la crainte plutôt que la lever.
          </p>
          <p className="text-sm text-slate-200">
            Il y a une troisième part, qu&apos;on oublie toujours :{" "}
            <span className="font-semibold">l&apos;imagination</span>. Ti Margo, le
            marché de Saint-Pierre, le tour de l&apos;île. Aucune machine
            n&apos;a envie d&apos;inventer ça — et un contenu scolaire que personne
            n&apos;a rêvé, les élèves le referment.
          </p>
        </div>

        {/* 3) Ce qui se paie */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-50">
            3) Ce qui se paie n&apos;est pas ce que votre enfant apprend
          </h2>
          <p className="text-sm text-slate-300">
            C&apos;est la ligne qui gouverne tout le reste. Le coach dans les cinq
            matières, les exercices corrigés, les parcours, les cahiers, les fiches
            de cours, les évaluations blanches : rien de tout cela ne se paie,
            sans limite de temps et sans publicité. Votre enfant garde ses
            résultats.
          </p>
          <p className="text-sm text-slate-300">
            Ce que l&apos;abonnement ouvre, c&apos;est <span className="font-semibold">votre</span>{" "}
            fenêtre à vous : son bulletin, sa semaine, son historique, et des
            recommandations qui vous disent quoi reprendre maintenant. On ne vend
            pas l&apos;accès au savoir. On vend de le voir apprendre, et de savoir
            quoi faire ensuite.
          </p>
          <p className="text-xs text-slate-400">
            Et si l&apos;enfant d&apos;à côté ne paie pas, il apprend exactement la
            même chose. Une famille qui ne peut pas payer ne paie pas, et personne
            ne le saura.
          </p>
        </div>

        {/* 4) Ce que ce n'est pas / 5) ce qui ne se copie pas */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              4) Ce que ce prix n&apos;est pas
            </h2>
            <p className="text-sm text-slate-300">
              Un prix bas éveille des soupçons légitimes. Voici, un par un, ceux
              qui ne s&apos;appliquent pas ici.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• <span className="font-semibold">Ce n&apos;est pas un essai</span> qui se transforme en abonnement.</li>
              <li>• <span className="font-semibold">Ce n&apos;est pas un tarif de lancement</span> qui doublera l&apos;an prochain : le prix d&apos;un abonnement reste celui auquel il a été souscrit.</li>
              <li>• <span className="font-semibold">Il n&apos;y a aucun quota</span>, aucun compteur de questions, aucun dépassement facturé.</li>
              <li>• <span className="font-semibold">Il n&apos;y a pas de publicité</span>, et aucune donnée d&apos;élève n&apos;est revendue. Ce n&apos;est pas vous le produit.</li>
              <li>• <span className="font-semibold">Ce n&apos;est pas par enfant</span> : le second de la maison ne coûte rien.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-200">
              5) Ce qu&apos;un concurrent ne peut pas copier
            </h2>
            <p className="text-sm text-slate-200">
              Un prix se copie en un après-midi. Ce qui ne se copie pas, c&apos;est
              d&apos;où viennent les exercices : d&apos;un professeur qui a ses
              classes, qui voit où ça coince, et qui relit ce qu&apos;il publie.
            </p>
            {/* ⚠️ LA CONSTANTE DU 21/08 (`PRIX_PROF_AN`) A DISPARU LE 22, et
                avec elle le verbe : le professeur ne PAIE plus un forfait, il
                ouvre un tarif de groupe. Une constante protège d'un chiffre
                faux, jamais d'un verbe faux — c'est ce qui a fallu relire ici à
                la main. */}
            {/* ⛔ LE TOTAL DE LA CLASSE A DISPARU D'ICI LE 01/09 (il valait
                22,50 € par mois, il vaudrait 30 €). Ce nombre-là fait faire au
                professeur la multiplication qu'il ne doit justement pas faire :
                cinq classes, 150 élèves, 1 800 € par an. Le repère du livre le
                remplace, parce qu'un livre ne se multiplie pas — il se pose sur
                une liste. */}
            <p className="text-sm text-slate-100">
              C&apos;est aussi pour ça que le professeur ne paie rien du tout :
              son compte est gratuit, à titre personnel, ouvert sur{" "}
              {ENSEIGNANT.verification} — et il n&apos;a besoin de
              l&apos;autorisation de personne pour s&apos;en servir. Sa gratuité
              s&apos;arrête à lui : les familles de ses élèves s&apos;abonnent au
              tarif ordinaire.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              {/* ⛔⛔ 29/08/2026 — TOUT CE QUI CONCERNAIT L'ÉTABLISSEMENT EST
                  PARTI D'ICI (Frédéric : « je ne vends plus aux établissements,
                  c'est du pénal », puis « enlève tout ce qui concerne
                  établissement » sur cette page).
                  Trois choses tombaient ensemble et devaient tomber ensemble :
                  le compte (« trois offres », « trois forfaits » — il en reste
                  deux), l'adresse au lecteur (« si vous représentez un collège
                  ou un lycée »), et le bouton « Pour un établissement » qui
                  menait à /espace-ecoles, désormais en `noindex` et sans lien
                  ailleurs sur le site.
                  ⚠️ Le reste de la page ne bouge pas : son sujet est le COÛT et
                  ce qui le justifie, pas le canal de vente. */}
              <h2 className="text-lg font-semibold text-slate-50">
                Le détail des offres est sur la page tarifs
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Une famille, ou une classe que son professeur organise — et pas
                un élève à compter. L&apos;élève, lui, ne paie jamais.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Des epsilons engendrent des infinis.
          </p>
        </div>
      </section>
    </main>
  );
}
