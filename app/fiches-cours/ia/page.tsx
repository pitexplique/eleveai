import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, Download, FileText, Sparkles } from "lucide-react";
import { PIX_DOMAINES } from "@/lib/pix-ia/referentiel";

export const metadata: Metadata = {
  title: "Fiches de cours IA",
  description:
    "Fiches de cours d'intelligence artificielle, organisées par domaine du référentiel Pix IA, à lire en ligne ou à télécharger en PDF.",
};

// Fiches IA disponibles. `domaineId` = domaine Pix (1 Fondements / 2 Usages /
// 3 Enjeux). Ajouter une fiche ici quand elle est créée sous
// app/fiches-cours/ia/<domaine>/<competence>/.
type FicheIa = {
  href: string;
  domaineId: "1" | "2" | "3";
  competence: string;
  titre: string;
  resume: string;
};

const fiches: FicheIa[] = [
  // ── Domaine 1 — Fondements ──
  {
    href: "/fiches-cours/ia/fondements/definir-l-ia",
    domaineId: "1",
    competence: "1.1",
    titre: "Qu'est-ce que l'intelligence artificielle ?",
    resume: "Définir l'IA, ses deux approches et pourquoi elle a explosé récemment.",
  },
  {
    href: "/fiches-cours/ia/fondements/apprentissage-automatique",
    domaineId: "1",
    competence: "1.2",
    titre: "L'apprentissage automatique",
    resume: "Apprendre à partir de données : supervisé, non supervisé, renforcement.",
  },
  {
    href: "/fiches-cours/ia/fondements/modeles-apprentissage",
    domaineId: "1",
    competence: "1.3",
    titre: "Les modèles d'apprentissage",
    resume: "Arbre de décision, régression, réseau de neurones et « boîte noire ».",
  },
  {
    href: "/fiches-cours/ia/fondements/grands-modeles-de-langage",
    domaineId: "1",
    competence: "1.4",
    titre: "Les grands modèles de langage",
    resume: "Prédire le mot suivant, l'entraînement, et les hallucinations.",
  },
  {
    href: "/fiches-cours/ia/fondements/algorithmes-de-recommandation",
    domaineId: "1",
    competence: "1.5",
    titre: "Les algorithmes de recommandation",
    resume: "Comment on te recommande des contenus, et la bulle de filtre.",
  },
  {
    href: "/fiches-cours/ia/fondements/ia-incarnee-robotique",
    domaineId: "1",
    competence: "1.6",
    titre: "L'IA incarnée et la robotique",
    resume: "Percevoir, décider, agir : l'IA dans les robots du monde réel.",
  },
  // ── Domaine 2 — Usages ──
  {
    href: "/fiches-cours/ia/usages/familles-de-taches",
    domaineId: "2",
    competence: "2.1",
    titre: "Ce que l'IA sait faire",
    resume: "Reconnaissance, prédiction, recommandation, génération de contenu.",
  },
  {
    href: "/fiches-cours/ia/usages/utiliser-ia-generative",
    domaineId: "2",
    competence: "2.2",
    titre: "Utiliser une IA générative",
    resume:
      "Écrire un bon prompt, itérer, vérifier les réponses et rester responsable.",
  },
  {
    href: "/fiches-cours/ia/usages/evaluer-l-information",
    domaineId: "2",
    competence: "2.3",
    titre: "Évaluer l'information à l'ère de l'IA",
    resume: "Hypertrucages, bots, et comment vérifier une information.",
  },
  {
    href: "/fiches-cours/ia/usages/services-de-recommandation",
    domaineId: "2",
    competence: "2.4",
    titre: "Utiliser les services de recommandation",
    resume: "Avantages, limites et contrôle de la personnalisation.",
  },
  {
    href: "/fiches-cours/ia/usages/ia-dans-une-organisation",
    domaineId: "2",
    competence: "2.5",
    titre: "Utiliser l'IA dans une organisation",
    resume: "Identifier le besoin, protéger les données, charte d'usage et RAG.",
  },
  // ── Domaine 3 — Enjeux ──
  {
    href: "/fiches-cours/ia/enjeux/empreinte-environnementale",
    domaineId: "3",
    competence: "3.1",
    titre: "L'empreinte environnementale de l'IA",
    resume: "Énergie des calculs, ressources rares et IA frugale.",
  },
  {
    href: "/fiches-cours/ia/enjeux/gouvernance",
    domaineId: "3",
    competence: "3.2",
    titre: "La gouvernance de l'IA",
    resume: "Qui régule l'IA, l'IA Act, souveraineté et valeurs encodées.",
  },
  {
    href: "/fiches-cours/ia/enjeux/ethique-et-transparence",
    domaineId: "3",
    competence: "3.3",
    titre: "Éthique et transparence de l'IA",
    resume: "Transparence, non-discrimination, responsabilité, RGPD et IA Act.",
  },
  {
    href: "/fiches-cours/ia/enjeux/emploi-et-formation",
    domaineId: "3",
    competence: "3.4",
    titre: "IA, emploi et formation",
    resume: "Métiers qui changent, nouveaux métiers, travailleurs du clic.",
  },
  {
    href: "/fiches-cours/ia/enjeux/enjeux-culturels-societaux",
    domaineId: "3",
    competence: "3.5",
    titre: "Enjeux culturels et sociétaux de l'IA",
    resume: "Biais, désinformation, diversité culturelle et droits des créateurs.",
  },
];

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
