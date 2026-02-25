// app/iso-42001/page.tsx
// Page "Gouvernance IA" Valeria — inspirée ISO/IEC 42001 (AIMS)
// ✅ Pédagogique, crédible, sans revendication de certification

import Link from "next/link";

export const metadata = {
  title: "Gouvernance IA — inspirée ISO/IEC 42001 | Valeria",
  description:
    "La philosophie de Valeria : supervision humaine, indicateurs, traçabilité et amélioration continue, inspirée des principes ISO/IEC 42001 (AIMS).",
};

export default function Iso42001Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 space-y-10">
        {/* HERO */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">
              🛡️ Gouvernance IA (inspirée ISO/IEC 42001)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
              AIMS • Human oversight • Traçabilité
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Notre philosophie : une IA pilotée, encadrée, utile
          </h1>

          <p className="text-base text-slate-700 max-w-3xl">
            Valeria applique des principes de pilotage d’un système IA :{" "}
            <b>supervision humaine</b>, <b>indicateurs</b>, <b>traçabilité</b> et{" "}
            <b>amélioration continue</b>. Cette démarche est{" "}
            <b>inspirée des bonnes pratiques de la norme ISO/IEC 42001</b> (AI
            Management System / AIMS).
          </p>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              <b>Important :</b> cette page décrit une <b>démarche progressive</b>.
              Valeria <b>n’affirme pas être certifié</b> ISO/IEC 42001 à ce stade.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/optimiseur"
              className="inline-flex items-center justify-center rounded-xl bg-[#0047B6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#003894]"
            >
              Accéder à l’Optimiseur
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Retour accueil
            </Link>
          </div>
        </header>

        {/* PILIERS */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">1) Supervision humaine</h2>
            <p className="mt-2 text-sm text-slate-700">
              Le score et l’optimisation aident… mais{" "}
              <b>la validation finale reste humaine</b>. Pour les élèves, on
              encourage une étape de <b>vérification</b> et de <b>reformulation</b>.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Relecture obligatoire avant diffusion</li>
              <li>• Contrôle du niveau (élèves / profs)</li>
              <li>• Repérage des erreurs / ambiguïtés</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">2) Indicateurs (KPI)</h2>
            <p className="mt-2 text-sm text-slate-700">
              Le compteur est motivant, mais ce n’est pas le but. Les indicateurs
              servent à <b>piloter</b> : détecter une dérive, comparer, améliorer.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Score global /20 + breakdown</li>
              <li>• Courbe de convergence (dérives visibles)</li>
              <li>• Arrêt manuel + seuil cible</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">3) Traçabilité</h2>
            <p className="mt-2 text-sm text-slate-700">
              On garde des traces pour comprendre ce qui a été produit et
              pourquoi. C’est la base d’un système sérieux.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Prompt initial → versions améliorées</li>
              <li>• Rapports de score (forces / fixes / risques)</li>
              <li>• Historique des itérations</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">4) Amélioration continue</h2>
            <p className="mt-2 text-sm text-slate-700">
              Valeria progresse par boucle : mesurer → corriger → vérifier. C’est
              l’esprit “système” (AIMS).
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• Corrections itératives (max itérations)</li>
              <li>• Règles d’arrêt (cible, stop, invalidité)</li>
              <li>• Ajustements des grilles (RUBRIC_VERSION)</li>
            </ul>
          </div>
        </section>

        {/* RISQUES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-extrabold text-[#0047B6]">
            Risques que nous prenons au sérieux
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">🔁 Dérive (divergence)</p>
              <p className="mt-1 text-sm text-slate-700">
                L’optimisation peut “partir de travers” : hors-sujet, ajout de
                contraintes inutiles, perte de simplicité.
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <b>Réponse :</b> type + public, scoring stable, stop, historique,
                relecture.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">⚠️ Contenu problématique</p>
              <p className="mt-1 text-sm text-slate-700">
                Une IA peut produire des erreurs, des biais, ou des contenus
                inadaptés au public.
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <b>Réponse :</b> supervision humaine + checklist de validation +
                consignes de vérification côté élèves.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-900">
              <b>Principe clé :</b> Valeria aide à produire une ressource, mais
              <b> ne remplace pas l’enseignant</b> ni la vérification humaine.
            </p>
          </div>
        </section>

        {/* CHARTE COURTE */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-extrabold text-[#0047B6]">Charte courte Valeria</h2>

          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              • <b>Utilité :</b> produire des ressources claires, exploitables, adaptées.
            </li>
            <li>
              • <b>Encadrement :</b> validation finale humaine, surtout pour les élèves.
            </li>
            <li>
              • <b>Qualité :</b> indicateurs + amélioration continue (itérations).
            </li>
            <li>
              • <b>Responsabilité :</b> traçabilité (prompts, scores, historiques).
            </li>
          </ul>

          <div className="pt-2">
            <Link
              href="/optimiseur"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Tester Valeria maintenant
            </Link>
          </div>
        </section>

        {/* FOOT NOTE */}
        <footer className="text-xs text-slate-500">
          Dernière mise à jour : philosophie de gouvernance IA — “inspirée ISO/IEC 42001”.
        </footer>
      </div>
    </main>
  );
}