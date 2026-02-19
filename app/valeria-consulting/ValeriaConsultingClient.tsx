"use client";

import Link from "next/link";

export default function ValeriaConsultingClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Valeria Consulting — La Réunion
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
            Formations IA & accompagnement — objectifs mesurables, conformité, robustesse
          </h1>

          <p className="mt-6 text-lg text-slate-700 max-w-3xl mx-auto">
            J’accompagne <strong>organismes de formation</strong>, <strong>établissements</strong> et{" "}
            <strong>entreprises</strong> à structurer l’usage de l’IA (ChatGPT & LLM) :
            transformation d’objectifs flous en critères testables, montée en compétences,
            et amélioration continue.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500 transition"
            >
              Proposer un échange (OF / école / entreprise) →
            </Link>

            <Link
              href="/optimiseur"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold hover:bg-slate-100 transition"
            >
              Tester Valeria (notation de prompt) →
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Présentiel / distanciel",
              "Ateliers 2h → parcours 1–3 jours",
              "Niveaux : débutant à avancé",
              "Livrables : supports + grilles + templates",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES (FORMATION) */}
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-10">
        <div>
          <h2 className="text-2xl font-extrabold mb-2">🎓 Offres pensées pour les organismes de formation</h2>
          <p className="text-slate-700">
            Pour les centres de formation (CFA/OF), écoles et universités : des modules prêts à intégrer dans un parcours,
            avec objectifs, compétences, évaluation et livrables.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Module 1 — “IA au quotidien” (2h à 1/2 journée)</h3>
            <p className="mt-3 text-slate-700">
              Prise en main des IA génératives : prompts efficaces, limites, vérification, bonnes pratiques.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Public : débutants / reconversion / apprentis</li>
              <li>• Modalités : atelier + cas pratiques métiers</li>
              <li>• Évaluation : mini-défis + grille simple</li>
              <li>• Livrables : fiches méthode + templates</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Module 2 — “Prompt Engineering robuste” (1 journée)</h3>
            <p className="mt-3 text-slate-700">
              Passer de “ça marche parfois” à une méthode reproductible : objectifs, critères, tests, itérations.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Public : formateurs, référents numériques, dev/data</li>
              <li>• Méthode : score indicateur + amélioration itérative</li>
              <li>• Sortie : 10 prompts métiers “prêts à l’emploi”</li>
              <li>• Outil : démonstration avec Valeria</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Module 3 — “IA responsable & conformité” (1 journée)</h3>
            <p className="mt-3 text-slate-700">
              Cadre d’usage : données, sécurité, biais, traçabilité, bonnes pratiques (éducation / entreprise).
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Public : direction, équipes pédagogiques, RH/qualité</li>
              <li>• Outils : charte IA, checklist, cas d’école</li>
              <li>• Livrables : charte + procédures + kit formateur</li>
              <li>• Objectif : déploiement sans “boîte noire”</li>
            </ul>
          </div>
        </div>
      </section>

      {/* POUR LES OF: INTÉGRATION */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-extrabold mb-4">🧩 Intégration facile dans vos parcours</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-bold">Ce que vous obtenez (concret)</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Objectifs pédagogiques formulés + critères de réussite</li>
                <li>• Déroulé formateur + activités apprenants (pas à pas)</li>
                <li>• Grille d’évaluation + exercices corrigés</li>
                <li>• Pack de prompts “métier” & anti-hallucination</li>
                <li>• Supports (PDF/Word) + version tableau numérique</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold">Formats possibles</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Ateliers ponctuels (2h / 1/2 journée)</li>
                <li>• Bootcamp (1 à 3 jours)</li>
                <li>• Parcours blended (distanciel + présentiel)</li>
                <li>• Formation de formateurs (ToT)</li>
                <li>• Adaptation par filière : tertiaire, industrie, éducation</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {["CFA / OF", "Écoles", "Université", "Entreprises"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500 transition"
            >
              Demander une proposition (programme + devis) →
            </Link>

            <Link
              href="/optimiseur"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold hover:bg-slate-100 transition"
            >
              Voir la méthode “score + itérations” →
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERTISE (GEN) */}
      <section className="mx-auto max-w-5xl px-4 pb-16 space-y-10">
        <div>
          <h2 className="text-2xl font-extrabold mb-4">🎯 Ce que j’apporte (différenciant)</h2>

          <ul className="space-y-3 text-slate-700">
            <li>• Transformation d’intentions floues en objectifs testables (compétences / tâches)</li>
            <li>• Définition de critères mesurables (qualité, conformité, sécurité, traçabilité)</li>
            <li>• Méthode d’itération contrôlée : score indicateur + amélioration continue</li>
            <li>• Templates & prompts reproductibles (pas du “one shot”)</li>
            <li>• Intégration IA sans perte de maîtrise humaine</li>
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-extrabold mb-3">🏫 Éducation</h2>
            <p className="text-slate-700">
              Clarification de séances, évaluations, séquences. Formation d’équipe. Cadre IA encadrée et conforme.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Idéal pour : équipes pédagogiques, référents numériques, direction, projets innovants.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-extrabold mb-3">🏭 Entreprises</h2>
            <p className="text-slate-700">
              Procédures, supports de formation interne, critères qualité, optimisation de prompts métiers.
              Adapté formation, qualité, RH.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Idéal pour : responsables qualité, formation, managers, équipes opérationnelles.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-extrabold mb-3">📍 Ancrage local (La Réunion)</h2>
          <p className="text-slate-700">
            Basé à La Réunion. Objectif : développer des usages concrets et responsables de l’IA au service du territoire.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Interventions possibles à Saint-Pierre, Saint-Louis, Le Tampon, Saint-Denis et à distance.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-extrabold">L’IA est un outil. La méthode fait la différence.</h2>

          <p className="mt-6 text-slate-300">
            Organisme de formation, école, université ou entreprise : je vous propose un échange court pour cadrer
            vos objectifs et vous envoyer une proposition (programme + modalités + livrables).
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-slate-900 hover:bg-slate-200 transition"
          >
            Me contacter →
          </Link>
        </div>
      </section>
    </main>
  );
}
