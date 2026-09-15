import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Download, PencilLine, Sparkles } from "lucide-react";
import { libelleClasse } from "@/lib/fiches/registre";
import { listerFichesExercices } from "@/lib/fiches-exercices/registre";

// ─── Le hub des fiches d'exercices (15/09/2026) ───────────────────────────────
// Le pendant de /fiches-cours pour la seconde collection : une feuille de vingt
// exercices corrigés par notion, à part du cours, pour l'élève qui « préfère
// vidéo et exercices corrigés ». Il n'existe qu'à partir de la deuxième feuille
// — un hub d'une seule carte n'est pas un hub.
//
// ⚠️ MÊME SOURCE DE VÉRITÉ QUE LE COACH ET LE SITEMAP : `listerFichesExercices()`
// relit le registre. Une feuille ajoutée au registre apparaît ici toute seule.
// ⛔ Ne jamais écrire une liste de feuilles en dur dans cette page.
//
// ⭐ LE TITRE PORTE CE QU'ON TAPE : « exercices corrigés » est la requête, et
// « fiche » n'y pèse rien. Le h1 ne dit pas la même chose que celui de
// /fiches-cours (« Fiches de cours ») : deux collections, deux requêtes.

export const metadata: Metadata = {
  title: "Exercices corrigés par notion, à imprimer en PDF",
  description:
    "Des fiches de vingt exercices corrigés par notion, du geste seul au problème de contrôle : un rappel de cours avant chaque niveau, chaque corrigé écrit étape par étape, et le PDF avec les corrigés à part. Maths 1re spé pour commencer.",
};

const LIBELLE_MATIERE: Record<string, string> = {
  maths: "Maths",
  francais: "Français",
};

export default function FichesExercicesPage() {
  const fiches = listerFichesExercices();
  // Un groupe par matière et par niveau, dans l'ordre du registre trié.
  const groupes: { cle: string; matiere: string; classe: string; fiches: typeof fiches }[] = [];
  for (const f of fiches) {
    const cle = `${f.matiere}/${f.classe}`;
    let g = groupes.find((x) => x.cle === cle);
    if (!g) {
      g = { cle, matiere: f.matiere, classe: f.classe, fiches: [] };
      groupes.push(g);
    }
    g.fiches.push(f);
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className="border-b border-slate-200 bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black uppercase text-amber-800">
            <PencilLine className="h-4 w-4" />
            Ressources élèves
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              Fiches d&apos;exercices corrigés
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Vingt exercices par notion, du geste seul au problème de contrôle.
              Un rappel de cours de trois lignes avant chaque niveau, et chaque
              corrigé écrit étape par étape, avec le pourquoi et le piège nommé.
              À l&apos;écran, la correction est repliée sous l&apos;exercice ;
              sur le PDF, les corrigés sont sur des pages à part.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
            >
              <BookOpen className="h-4 w-4" />
              Les fiches de cours
            </Link>
            <Link
              href="/coach-ia/maths"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-800 shadow-sm transition hover:bg-sky-50"
            >
              <Sparkles className="h-4 w-4" />
              Le coach, pour en refaire
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {groupes.map((g) => (
          <div key={g.cle} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
                {LIBELLE_MATIERE[g.matiere] ?? g.matiere}
              </span>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700">
                {libelleClasse(g.classe)}
              </span>
              <span className="text-slate-400">
                {g.fiches.length} fiche{g.fiches.length > 1 ? "s" : ""}
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {g.fiches.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{f.titre}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{f.resume}</p>
                    </div>
                    <PencilLine className="mt-1 h-6 w-6 shrink-0 text-amber-500" />
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-700">
                    <Download className="h-4 w-4" />
                    Ouvrir la fiche
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <p className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <Sparkles className="h-4 w-4" />
          Une feuille par notion, au fil du programme. D&apos;autres arrivent.
        </p>
      </section>
    </main>
  );
}
