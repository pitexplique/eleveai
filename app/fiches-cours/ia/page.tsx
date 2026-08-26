import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, Download, FileText, Sparkles } from "lucide-react";
import { PIX_DOMAINES } from "@/lib/pix-ia/referentiel";
import { listerFiches } from "@/lib/fiches/registre";

export const metadata: Metadata = {
  title: "Fiches de cours IA",
  description:
    "Fiches de cours d'intelligence artificielle, organisées par domaine du référentiel Pix IA, à lire en ligne ou à télécharger en PDF.",
};

/* ─── ⭐ 26/08/2026 — CETTE PAGE NE TIENT PLUS SA PROPRE LISTE ────────────────
   Elle portait les 16 fiches d'IA écrites en dur, sous la consigne « ajouter
   une fiche ici quand elle est créée ». C'était la DEUXIÈME liste des mêmes
   fiches — le registre porte déjà la première, et c'est lui que lisent les
   sommaires de maths, de français, les 12 pages de niveau et le sitemap. Une
   fiche d'IA ajoutée au registre s'affichait donc dans son domaine et au
   sitemap, mais restait absente de ce sommaire-ci.

   ✅ AU PASSAGE, LES RÉSUMÉS ONT CHANGÉ DE MAISON. Ils n'existaient que dans
   cette page : les entrées d'IA du registre n'avaient qu'un `titre`, et les
   trois pages de domaine affichaient donc des cartes nues. Les 16 résumés sont
   remontés au registre — ils servent maintenant les deux endroits.

   ⚠️ LA COMPÉTENCE PIX RESTE ICI, ET C'EST VOULU. C'est la seule donnée que le
   registre n'a pas, et elle n'a de sens que sur cette page : le registre décrit
   des fiches, pas le référentiel Pix. Une fiche absente de cette table s'affiche
   sans badge — elle ne DISPARAÎT pas, ce qui est exactement le défaut qu'on
   vient de corriger. */
const COMPETENCE_PIX: Record<string, string> = {
  "ia/fondements/definir-l-ia": "1.1",
  "ia/fondements/apprentissage-automatique": "1.2",
  "ia/fondements/modeles-apprentissage": "1.3",
  "ia/fondements/grands-modeles-de-langage": "1.4",
  "ia/fondements/algorithmes-de-recommandation": "1.5",
  "ia/fondements/ia-incarnee-robotique": "1.6",
  "ia/usages/familles-de-taches": "2.1",
  "ia/usages/utiliser-ia-generative": "2.2",
  "ia/usages/evaluer-l-information": "2.3",
  "ia/usages/services-de-recommandation": "2.4",
  "ia/usages/ia-dans-une-organisation": "2.5",
  "ia/enjeux/empreinte-environnementale": "3.1",
  "ia/enjeux/gouvernance": "3.2",
  "ia/enjeux/ethique-et-transparence": "3.3",
  "ia/enjeux/emploi-et-formation": "3.4",
  "ia/enjeux/enjeux-culturels-societaux": "3.5",
};

// Le domaine Pix vit dans le SLUG de la fiche (ia/<domaine>/<notion>) : rien
// à déclarer, il se lit. `PIX_DOMAINES` donne l'ordre et les libellés.
const DOMAINE_PAR_SLUG: Record<string, "1" | "2" | "3"> = {
  fondements: "1",
  usages: "2",
  enjeux: "3",
};

/* ⚠️ ON RETRIE PAR COMPÉTENCE, ET CE N'EST PAS UN DÉTAIL. `listerFiches` trie
   par TITRE — c'est le bon ordre pour une classe de maths, où aucun ordre
   n'est imposé de l'extérieur. Ici il ne l'est pas : le référentiel Pix
   NUMÉROTE ses compétences, et 1.1 se lit avant 1.2. Sans ce tri, le domaine
   Fondements s'affichait 1.2, 1.6, 1.5, 1.4, 1.3, 1.1 — l'alphabet des titres.
   Une page qui affiche « COMPÉTENCE 1.6 » au-dessus de « COMPÉTENCE 1.1 » dit
   au lecteur que la numérotation ne veut rien dire.
   ⛔ Les fiches sans compétence connue vont EN FIN de leur domaine, pas au
   début : une fiche neuve pas encore inscrite dans COMPETENCE_PIX ne doit pas
   s'insérer devant la 1.1. */
const fiches = listerFiches("ia")
  .map((f) => ({
    href: f.href,
    cle: `ia/${f.classe}/${f.notion}`,
    domaineId: DOMAINE_PAR_SLUG[f.classe],
    competence: COMPETENCE_PIX[`ia/${f.classe}/${f.notion}`],
    titre: f.titre,
    resume: f.resume,
  }))
  .sort((a, b) =>
    (a.competence ?? "￿").localeCompare(b.competence ?? "￿", "fr", {
      numeric: true,
    })
  );

export default function FichesCoursIaPage() {
  return (
    <main className="min-h-screen bg-[#f5f6ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500">
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">IA</span>
          </nav>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black uppercase text-indigo-700">
            <Sparkles className="h-4 w-4" />
            Intelligence artificielle
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              Fiches de cours IA
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Des fiches courtes et illustrées, organisées par <strong>domaine du
              référentiel Pix IA</strong>. Lis-les en ligne, télécharge-les en PDF,
              puis teste-toi avec l&apos;éval Pix IA.
            </p>
            <Link
              href="/fiches-cours/ia/livre"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
            >
              <BookOpen className="h-4 w-4" />
              Lire tout le livre (16 fiches)
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="space-y-10">
          {PIX_DOMAINES.map((domaine) => {
            const fichesDomaine = fiches.filter((f) => f.domaineId === domaine.id);
            return (
              <div key={domaine.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-sm font-black text-indigo-700">
                    {domaine.id}
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{domaine.short}</h2>
                    <p className="text-sm font-medium text-slate-500">{domaine.label}</p>
                  </div>
                </div>

                {fichesDomaine.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-5 text-sm font-bold text-slate-400">
                    Fiches à venir…
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {fichesDomaine.map((fiche) => (
                      <Link
                        key={fiche.href}
                        href={fiche.href}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-200/40"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-violet-700">
                                IA
                              </span>
                              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-indigo-700">
                                Compétence {fiche.competence}
                              </span>
                            </div>
                            <h3 className="mt-4 text-xl font-black text-slate-900">
                              {fiche.titre}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {fiche.resume}
                            </p>
                          </div>
                          <FileText className="mt-1 h-6 w-6 shrink-0 text-indigo-500" />
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                          <Download className="h-4 w-4" />
                          Ouvrir la fiche
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-indigo-500" />
            <div>
              <p className="text-base font-black text-slate-900">Prépare le Pix IA</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Lis la fiche, puis vérifie tes acquis avec l&apos;évaluation blanche
                Pix IA (collège ou lycée).
              </p>
            </div>
          </div>
          <Link
            href="/eval-pix-ia"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4" />
            Faire une éval blanche
          </Link>
        </div>
      </section>
    </main>
  );
}
