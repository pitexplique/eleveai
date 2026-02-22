"use client";

import React from "react";

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Valeria — Robustesse IA"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function KPIChip({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-2 text-sm text-slate-600">{note}</div>
    </div>
  );
}

function StepCard({
  step,
  title,
  points,
}: {
  step: string;
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {step}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          PDCA
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{q}</div>
      <div className="mt-2 text-sm text-slate-600">{a}</div>
    </div>
  );
}

export default function ValeriaClient() {
  const videoId = "BTRp1LUJIeY";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Valeria Consulting — La Réunion
              </p>

              <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
                Gouvernance IA : objectifs, KPI, robustesse.
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                Je structure vos usages IA pour obtenir des résultats{" "}
                <span className="font-semibold text-slate-900">mesurables</span>,{" "}
                <span className="font-semibold text-slate-900">stables</span> et{" "}
                <span className="font-semibold text-slate-900">sécurisés</span>.
                Audit, indicateurs, pilotage PDCA, amélioration continue.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Demander un diagnostic
                </a>
                <a
                  href="#kpi"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Voir les KPI concrets
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                1ère mission “pilote” possible • périmètre limité • livrables
                clairs
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Démonstration (22s)
                </div>
                <div className="text-xs text-slate-500">
                  Robustesse & réduction des écarts
                </div>
              </div>

              <div className="mt-4">
                <YouTubeEmbed videoId={videoId} />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 underline"
                >
                  Voir sur YouTube →
                </a>
                <span className="text-xs text-slate-500">
                  www.eleveai.fr/valeria
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEME */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Le problème</h2>
              <p className="mt-4 text-slate-600 max-w-xl">
                Sans objectifs clairs, sans indicateurs et sans gouvernance, les
                usages IA deviennent fragiles : variations de qualité,
                hallucinations non détectées, risques de confidentialité, et ROI
                difficile à justifier.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                Ce que l’on stabilise en priorité
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Qualité des sorties (cohérence, exactitude, conformité)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Sécurité (données sensibles, fuites, usage non contrôlé)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Traçabilité (prompt, version, métriques, décisions)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Mesure (KPI, dérive, robustesse, productivité)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* KPI CONCRETS */}
      <section id="kpi" className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">KPI — exemples concrets</h2>
            <p className="text-slate-600 max-w-3xl">
              Un pilotage robuste commence par des indicateurs simples. Voici des
              KPI typiques (adaptés à votre contexte) pour rendre l’IA
              mesurable, stable et améliorable.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <KPIChip
              label="Robustesse"
              value="Écart moyen ↓"
              note="Mesure de la variabilité des sorties vs. attendu (qualité stable dans le temps)."
            />
            <KPIChip
              label="Conformité"
              value="% sorties conformes ↑"
              note="Respect des règles (confidentialité, ton, format, consignes internes)."
            />
            <KPIChip
              label="Fiabilité"
              value="Taux d’erreurs ↓"
              note="Hallucinations, incohérences, sources manquantes, réponses non exploitables."
            />
            <KPIChip
              label="Productivité"
              value="Temps gagné / semaine ↑"
              note="Comparaison avant/après : production, relecture, correction, mise en forme."
            />
            <KPIChip
              label="Traçabilité"
              value="% prompts versionnés ↑"
              note="Prompts standardisés, versionnés, réutilisables + journal des itérations."
            />
            <KPIChip
              label="Risque"
              value="Incidents / mois ↓"
              note="Fuites, usages non autorisés, contenus sensibles : réduction par cadre & contrôle."
            />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-sm font-semibold text-slate-900">
              Exemple de tableau “avant / après” (pilotage)
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-600">
                    <th className="py-2 pr-4">KPI</th>
                    <th className="py-2 pr-4">Avant</th>
                    <th className="py-2 pr-4">Après (pilotage)</th>
                    <th className="py-2">Lecture</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Écart moyen</td>
                    <td className="py-3 pr-4">élevé</td>
                    <td className="py-3 pr-4">bas</td>
                    <td className="py-3">Sorties plus stables</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-3 pr-4 font-semibold">% conforme</td>
                    <td className="py-3 pr-4">variable</td>
                    <td className="py-3 pr-4">élevé</td>
                    <td className="py-3">Moins de retours</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Temps de relecture</td>
                    <td className="py-3 pr-4">long</td>
                    <td className="py-3 pr-4">réduit</td>
                    <td className="py-3">ROI plus clair</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-3 pr-4 font-semibold">Incidents</td>
                    <td className="py-3 pr-4">ponctuels</td>
                    <td className="py-3 pr-4">rare</td>
                    <td className="py-3">Risque maîtrisé</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Les KPI exacts sont choisis avec vous (contexte, métiers, données,
              contraintes). L’objectif : un suivi simple et actionnable.
            </p>
          </div>
        </div>
      </section>

      {/* OFFRE / MISSION PILOTE */}
      <section id="audit" className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold">
                Mission pilote — Audit IA structuré
              </h2>
              <p className="mt-4 text-slate-600 max-w-xl">
                Une mission courte et cadrée pour clarifier : usages, risques,
                KPI, et plan d’intégration. Vous repartez avec un diagnostic
                clair et un plan de pilotage.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">
                  Livrables (concrets)
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                    Cartographie des usages IA (où, pourquoi, avec quels outils)
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                    Risques & règles (confidentialité, données, conformité)
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                    KPI minimal viable (3–8 indicateurs actionnables)
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                    Plan PDCA : revue + actions correctives + itérations
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Méthode de pilotage (PDCA)</h3>
              <p className="mt-3 text-sm text-slate-600">
                Une boucle simple : on mesure, on corrige, on stabilise.
              </p>

              <div className="mt-6 grid gap-6">
                <StepCard
                  step="1 — PLAN"
                  title="Objectifs + KPI"
                  points={[
                    "Définir le périmètre (usages prioritaires)",
                    "Définir l’attendu (qualité, conformité, sécurité)",
                    "Choisir des KPI simples (écarts, conformité, temps)",
                  ]}
                />
                <StepCard
                  step="2 — DO"
                  title="Standardiser + sécuriser"
                  points={[
                    "Prompts modèles (versionnés, réutilisables)",
                    "Règles d’usage (données, confidentialité, formats)",
                    "Tests de robustesse (variations d’entrées)",
                  ]}
                />
                <StepCard
                  step="3 — CHECK"
                  title="Mesurer et détecter la dérive"
                  points={[
                    "Suivi KPI (écart moyen, conformité, erreurs)",
                    "Revue régulière des cas limites",
                    "Analyse des erreurs fréquentes",
                  ]}
                />
                <StepCard
                  step="4 — ACT"
                  title="Corriger et améliorer"
                  points={[
                    "Ajuster prompts / règles / périmètre",
                    "Renforcer contrôle qualité",
                    "Stabiliser : moins de variabilité, plus de fiabilité",
                  ]}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold text-slate-900">
                  Résultat attendu
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Une IA utile et robuste : moins d’écarts, plus de conformité,
                  et un pilotage mesurable qui rassure la direction et les équipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A PROPOS */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">À propos</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Ancien consultant en statistiques industrielles, j’interviens
            aujourd’hui sur l’intégration structurée de l’IA : objectifs,
            indicateurs, robustesse et amélioration continue.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FAQItem
              q="Combien de temps dure une mission pilote ?"
              a="Courte et cadrée. L’objectif : un diagnostic clair et un plan PDCA actionnable."
            />
            <FAQItem
              q="Est-ce adapté aux petites structures ?"
              a="Oui, justement : KPI simples, gouvernance légère, périmètre limité, résultats mesurables."
            />
            <FAQItem
              q="Vous remplacez les équipes internes ?"
              a="Non. Je structure, je clarifie et je transmets. Les équipes gardent la maîtrise."
            />
            <FAQItem
              q="Et la confidentialité ?"
              a="On définit des règles d’usage, des périmètres, et des indicateurs de risque. Pas de données sensibles dans des outils non adaptés."
            />
          </div>
        </div>
      </section>

      {/* CONTACT (Landing entreprise) */}
      <section id="contact" className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Demander un diagnostic IA</h2>
              <p className="mt-4 text-slate-300 max-w-xl">
                Échange direct et confidentiel. Dites-moi votre contexte (secteur,
                usages IA, contraintes), et je vous propose un périmètre pilote
                avec KPI.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Ce que vous pouvez envoyer</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• 3 usages IA actuels (ou envisagés)</li>
                  <li>• 1 risque prioritaire (données, qualité, conformité)</li>
                  <li>• 1 objectif mesurable (temps gagné, qualité, fiabilité)</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/262692742958"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center rounded-xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition"
              >
                <span>WhatsApp — +262 6 92 74 29 58</span>
                <span className="text-xs font-medium mt-1">Frédéric Lacoste</span>
              </a>

              <a
                href="mailto:eleveai974@gmail.com?subject=Diagnostic%20IA%20Valeria&body=Bonjour%20Fr%C3%A9d%C3%A9ric%2C%0A%0ASecteur%20%3A%20...%0AUsages%20IA%20%3A%20...%0AObjectif%20mesurable%20%3A%20...%0ARisque%20prioritaire%20%3A%20...%0A%0AMerci%2C"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Envoyer un email (confidentiel)
              </a>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Lien direct</div>
                <div className="mt-2 text-sm text-slate-200">
                  www.eleveai.fr/valeria
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  La Réunion • Intervention possible à distance
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
            Valeria Consulting — Gouvernance IA, KPI, robustesse & amélioration continue.
          </div>
        </div>
      </section>
    </main>
  );
}