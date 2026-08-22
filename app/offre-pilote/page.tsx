// app/offre-pilote/page.tsx
//
// ⛔ RÉÉCRITE LE 22/08/2026 — « DEVENIR COLLÈGE PILOTE » N'EXISTE PLUS.
// La page vendait une « phase pilote », un « dispositif sur une période
// limitée » et cinq étapes de cadrage à négocier. Le prix établissement est
// ferme et public depuis le 22/08 : il n'y a plus rien à deviser, donc plus
// rien à piloter. Elle ne montrait par ailleurs AUCUN écran — que du texte sur
// ce que l'outil ferait.
//
// ⭐ CE QUE FRÉDÉRIC A DEMANDÉ À LA PLACE : « sur établissement c'est une offre
// où on montre comment cela fonctionne ». Donc on MONTRE. Les écrans sont
// reconstruits ici, en HTML, et non décrits — c'est le même pari que
// /formation-ia : ne rien promettre, montrer.
//
// ⛔ AUCUNE DONNÉE RÉELLE, ET C'EST NON NÉGOCIABLE. Les résultats d'un collège
// ne sont jamais publics, à aucun degré d'anonymisation. Les élèves de cette
// page s'appellent « Élève 1 » et la mention « exemple » est portée par chaque
// bloc : personne ne doit pouvoir croire qu'il regarde une vraie classe.
//
// ⭐ LES GROUPES DE MAÎTRISE VIENNENT DU MOTEUR (`GROUPES`), pas d'une copie :
// « Fragile » doit se lire ici exactement comme sur l'épreuve et dans la vue de
// classe. Deux copies auraient divergé au premier ajustement de libellé.
//
// ⚠️ L'ADRESSE `/offre-pilote` EST CONSERVÉE VOLONTAIREMENT bien qu'elle ne
// décrive plus le contenu : elle est au sitemap et reçoit deux liens internes.
// Une page connue qui change de contenu se re-crawle en quelques jours ; une
// adresse neuve met des semaines, et la fenêtre de septembre ne les a pas.

import type { Metadata } from "next";
import Link from "next/link";

import { GROUPES } from "@/lib/eval-nationale/moteur";
import {
  EXEMPLE_ETABLISSEMENT,
  PRIX_ETABLISSEMENT_AN,
  PRIX_PROF_AN,
  centimes,
  euros,
} from "@/lib/tarifs";

const resume =
  `Ce qu'un collège voit, écran par écran : ce que passe l'élève, ce que le professeur lit de sa classe, ` +
  `ce que le chef d'établissement voit de tous ses niveaux. ${euros(PRIX_ETABLISSEMENT_AN)} par an, forfait, ` +
  `quel que soit l'effectif — et aucune famille ne paie.`;

export const metadata: Metadata = {
  title: "EleveAI dans un établissement — ce que vous voyez",
  description: resume,
  alternates: { canonical: "https://www.eleveai.fr/offre-pilote" },
  openGraph: {
    title: "EleveAI dans un établissement — ce que vous voyez",
    description: resume,
    url: "https://www.eleveai.fr/offre-pilote",
    siteName: "EleveAI",
    type: "website",
  },
};

/* ── LES DONNÉES DE DÉMONSTRATION ──────────────────────────────────────────
   Inventées, et elles doivent le rester. Les chiffres sont plausibles mais ne
   proviennent d'aucun établissement : ils servent à montrer la FORME de
   l'écran, jamais un résultat.                                              */

const CLASSE_DEMO = [
  { nom: "Élève 1", nombres: 82, geometrie: 71, grandeurs: 64, donnees: 77 },
  { nom: "Élève 2", nombres: 58, geometrie: 44, grandeurs: 51, donnees: 62 },
  { nom: "Élève 3", nombres: 91, geometrie: 88, grandeurs: 79, donnees: 84 },
  { nom: "Élève 4", nombres: 34, geometrie: 28, grandeurs: 22, donnees: 41 },
  { nom: "Élève 5", nombres: 66, geometrie: 73, grandeurs: 58, donnees: 55 },
  { nom: "Élève 6", nombres: 47, geometrie: 31, grandeurs: 38, donnees: 49 },
];

const DOMAINES = [
  { cle: "nombres" as const, label: "Nombres et calculs" },
  { cle: "geometrie" as const, label: "Espace et géométrie" },
  { cle: "grandeurs" as const, label: "Grandeurs et mesures" },
  { cle: "donnees" as const, label: "Données et gestion" },
];

/** Les mêmes seuils que le moteur : 60 % et 30 %. */
function groupeDe(pct: number): keyof typeof GROUPES {
  if (pct >= 60) return "satisfaisant";
  if (pct > 30) return "fragile";
  return "a_besoins";
}

/** Le fond de la pastille suit le groupe — même code couleur que l'épreuve. */
const FOND: Record<keyof typeof GROUPES, string> = {
  satisfaisant: "bg-cyan-100 text-cyan-900",
  fragile: "bg-amber-100 text-amber-900",
  a_besoins: "bg-red-100 text-red-900",
};

/** Répartition d'un niveau entier — ce que lit une direction. */
const NIVEAUX_DEMO = [
  { niveau: "6ᵉ", eleves: 104, satisfaisant: 51, fragile: 34, aBesoins: 19 },
  { niveau: "5ᵉ", eleves: 98, satisfaisant: 44, fragile: 37, aBesoins: 17 },
  { niveau: "4ᵉ", eleves: 101, satisfaisant: 39, fragile: 41, aBesoins: 21 },
  { niveau: "3ᵉ", eleves: 97, satisfaisant: 46, fragile: 33, aBesoins: 18 },
];

function Etiquette({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
      {children}
    </span>
  );
}

export default function OffreEtablissementPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-14">
        {/* ── HERO ── */}
        <section className="space-y-5">
          <p className="inline-flex items-center rounded-full border border-violet-400/60 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-200">
            Collèges et lycées
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Ce que votre établissement{" "}
            <span className="text-violet-300">voit vraiment</span>
          </h1>

          <p className="max-w-3xl text-lg text-slate-300">
            Plutôt que de vous décrire l’outil, voici ses écrans — celui de
            l’élève, celui du professeur, celui de la direction. Les chiffres
            ci-dessous sont inventés : les résultats d’un établissement ne sont
            jamais publics, chez nous pas davantage qu’ailleurs.
          </p>

          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5">
            <div>
              <p className="text-3xl font-black text-violet-200">
                {euros(PRIX_ETABLISSEMENT_AN)}
                <span className="ml-1 text-base font-bold text-slate-400">par an</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-300">
                Forfait, quel que soit l’effectif — soit{" "}
                {centimes(EXEMPLE_ETABLISSEMENT.parEleve)} par élève pour un
                collège de {EXEMPLE_ETABLISSEMENT.eleves}.
              </p>
            </div>
            <p className="text-sm text-slate-400 sm:ml-auto sm:max-w-xs">
              Il n’y a pas d’effectif à déclarer, pas de devis à demander, et le
              prix ne change pas à la rentrée suivante.
            </p>
          </div>
        </section>

        {/* ── 1. L'ÉLÈVE ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-sm font-black text-slate-950">
              1
            </span>
            <h2 className="text-xl font-semibold">L’élève travaille, et ça se mesure tout seul</h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            Il s’entraîne dans les cinq matières, ou passe une évaluation blanche
            chronométrée comme celle de la rentrée. Chaque réponse est rattachée
            à une notion et à une micro-compétence — c’est ce rattachement, et
            lui seul, qui rend tout le reste possible.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-white p-5 text-slate-900">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Question 14 sur 62</span>
              <span className="rounded-full bg-slate-100 px-2 py-1">⏱ 31:07</span>
            </div>
            <p className="mt-4 text-base font-bold">
              Quelle est l’aire d’un rectangle de 7 cm sur 4 cm ?
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["22 cm²", "28 cm²", "28 cm", "11 cm²"].map((c) => (
                <div
                  key={c}
                  className="rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-bold"
                >
                  {c}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-500">
              Grandeurs et mesures · <span className="text-slate-700">Calculer l’aire d’un rectangle</span>
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Écran d’exemple. L’élève voit la notion et la micro-compétence
            testées — ce que l’évaluation officielle ne lui dit jamais.
          </p>
        </section>

        {/* ── 2. LE PROFESSEUR ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-black text-slate-950">
              2
            </span>
            <h2 className="text-xl font-semibold">Le professeur lit sa classe sans corriger</h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            Une ligne par élève, une colonne par domaine. Les trois couleurs sont
            celles du bilan officiel : {GROUPES.satisfaisant.label},{" "}
            {GROUPES.fragile.label}, {GROUPES.a_besoins.label}. Il n’a rien à
            saisir et rien à ramasser.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <table className="w-full min-w-[540px] text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4">5ᵉ B — exemple</th>
                  {DOMAINES.map((d) => (
                    <th key={d.cle} className="pb-3 pr-4 font-bold">
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASSE_DEMO.map((e) => (
                  <tr key={e.nom} className="border-t border-slate-800">
                    <td className="py-2.5 pr-4 font-bold text-slate-200">{e.nom}</td>
                    {DOMAINES.map((d) => {
                      const pct = e[d.cle];
                      const g = groupeDe(pct);
                      return (
                        <td key={d.cle} className="py-2.5 pr-4">
                          <span
                            className={`inline-flex min-w-[86px] items-center justify-between gap-2 rounded-lg px-2 py-1 text-xs font-black ${FOND[g]}`}
                          >
                            <span>{pct} %</span>
                            <span className="text-[10px] font-bold opacity-80">
                              {GROUPES[g].label}
                            </span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {(Object.keys(GROUPES) as (keyof typeof GROUPES)[]).map((g) => (
              <div
                key={g}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
              >
                <p className="flex items-center gap-2 text-sm font-black text-slate-100">
                  <span className={`h-2.5 w-2.5 rounded-full ${FOND[g].split(" ")[0]}`} />
                  {GROUPES[g].label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  {GROUPES[g].constat}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Ces trois libellés viennent du moteur d’évaluation lui-même : ils
            disent ici exactement ce qu’ils disent à l’élève.
          </p>
        </section>

        {/* ── 3. LA DIRECTION ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-sm font-black text-slate-950">
              3
            </span>
            <h2 className="text-xl font-semibold">
              La direction voit tous ses niveaux, avant le jour J
            </h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            C’est la vue que le forfait établissement ouvre en plus : la
            répartition par niveau, et donc où porter l’effort — avant
            l’évaluation nationale, pas trois mois après.
          </p>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Mathématiques — exemple
              </p>
              <Etiquette>données inventées</Etiquette>
            </div>
            {NIVEAUX_DEMO.map((n) => {
              const total = n.satisfaisant + n.fragile + n.aBesoins;
              return (
                <div key={n.niveau} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-black text-slate-200">{n.niveau}</span>
                  <div className="flex h-6 flex-1 overflow-hidden rounded-lg">
                    <div
                      className="bg-cyan-400/80"
                      style={{ width: `${(n.satisfaisant / total) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400/80"
                      style={{ width: `${(n.fragile / total) * 100}%` }}
                    />
                    <div
                      className="bg-red-400/80"
                      style={{ width: `${(n.aBesoins / total) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs font-bold text-slate-400">
                    {n.eleves} élèves
                  </span>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-sm font-black text-red-200">
              ⛔ Ce que cette vue ne fera jamais
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Elle ne compare pas les professeurs entre eux, et elle ne le fera
              pas. Un tableau de bord qui classe les enseignants cesse d’être un
              outil pédagogique le jour où il est ouvert — et il se retient toute
              l’année. La répartition se lit par niveau et par domaine, pour
              décider où porter l’effort, jamais pour désigner quelqu’un.
            </p>
          </div>
        </section>

        {/* ── 4. CE QUE ÇA DÉCLENCHE ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-slate-950">
              4
            </span>
            <h2 className="text-xl font-semibold">Et l’élève repart avec quelque chose à faire</h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300">
            Un bilan qui ne débouche sur rien ne sert à personne. Quand une
            compétence coince, l’élève est renvoyé vers le prérequis qui la porte
            — pas vers le chapitre entier.
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
            <p className="font-bold text-amber-300">Grandeurs et mesures · {GROUPES.fragile.label}</p>
            <p className="mt-2 leading-relaxed text-slate-300">{GROUPES.fragile.geste}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Périmètre du rectangle", "Aire du rectangle", "Conversions d’aires"].map((m) => (
                <span
                  key={m}
                  className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs font-bold text-slate-200"
                >
                  {m} →
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── LE DÉPLOIEMENT ── */}
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-xl font-semibold">Comment ça se met en place</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
            <li>
              Un code établissement, un code par élève et par professeur. Sans
              installation, sans adresse e-mail à collecter.
            </li>
            <li>
              Les élèves se connectent depuis n’importe quel navigateur, en
              quelques secondes. Rien à installer sur les postes.
            </li>
            <li>
              Les professeurs voient leur classe dès la première évaluation
              passée. Il n’y a pas de paramétrage préalable.
            </li>
            <li>
              La direction ouvre sa vue quand elle veut : elle est comprise dans
              le forfait.
            </li>
          </ol>
          <p className="text-sm text-slate-400">
            Vous pouvez aussi commencer sans engager l’établissement : un
            professeur équipe sa ou ses classes pour {euros(PRIX_PROF_AN)} par
            an, forfait, et vous verrez ce que ça donne sur de vrais élèves avant
            d’en parler en conseil.
          </p>
        </section>

        {/* ── CONTACT ── */}
        <section className="space-y-4 rounded-2xl border border-violet-400/50 bg-violet-500/10 p-6">
          <h2 className="text-xl font-semibold text-violet-100">
            En parler pour votre établissement
          </h2>
          <p className="text-sm text-violet-100/90">
            Écrivez-nous le nom de l’établissement, les niveaux concernés et ce
            que vous cherchez à voir. On répond aux directions, coordonnateurs et
            équipes pédagogiques.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-violet-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-violet-300"
            >
              Nous écrire
            </Link>
            <Link
              href="/espace-ecoles"
              className="inline-flex items-center justify-center rounded-lg border border-violet-300/50 px-5 py-2.5 text-sm font-bold text-violet-100 transition hover:bg-violet-500/20"
            >
              La page établissement
            </Link>
            <Link
              href="/tarifs#etablissement"
              className="inline-flex items-center justify-center rounded-lg border border-violet-300/50 px-5 py-2.5 text-sm font-bold text-violet-100 transition hover:bg-violet-500/20"
            >
              Les trois offres
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
