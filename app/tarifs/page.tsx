"use client";

import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  reqMonth: string;
  highlight?: boolean;
  description: string;
  idealFor: string[];
};

const PLANS: Plan[] = [
  {
    name: "Découverte",
    price: "0 € / mois",
    reqMonth: "≈ 30 requêtes / mois",
    description:
      "Pour tester EleveAI tranquillement, sans carte bancaire et avec un petit quota de requêtes.",
    idealFor: [
      "Curieux qui découvrent l’IA",
      "Élève ou parent qui veut essayer",
      "Prof qui teste l’outil avant de s’abonner",
    ],
  },
  {
    name: "Starter",
    price: "5 € / mois",
    reqMonth: "≈ 100 requêtes / mois",
    description:
      "Pour utiliser EleveAI de temps en temps, sans se prendre la tête.",
    idealFor: ["Élève motivé", "Parent curieux", "Auto-formation légère"],
  },
  {
    name: "Essentiel",
    price: "9 € / mois",
    reqMonth: "≈ 300 requêtes / mois",
    highlight: true,
    description:
      "Le bon équilibre pour un usage régulier : cours, devoirs, mails, révisions.",
    idealFor: ["Professeur", "Parent très impliqué", "Étudiant en formation"],
  },
  {
    name: "Avancé",
    price: "20 € / mois",
    reqMonth: "≈ 1 000 requêtes / mois",
    description:
      "Pour ceux qui utilisent l’IA tous les jours dans leur pratique scolaire ou professionnelle.",
    idealFor: [
      "Prof très utilisateur",
      "Tuteur / coach scolaire",
      "AED / vie scolaire",
    ],
  },
  {
    name: "Pro",
    price: "50 € / mois",
    reqMonth: "≈ 4 000 requêtes / mois",
    description:
      "Pour une équipe ou un groupe qui souhaite centraliser son usage.",
    idealFor: [
      "Équipe pédagogique réduite",
      "Service vie scolaire / direction",
      "Petite structure de soutien scolaire",
    ],
  },
  {
    name: "Établissement",
    price: "95–149 € / mois",
    reqMonth: "Plafond global d’établissement",
    description:
      "Pour un collège ou un lycée : accès pour élèves, profs, CPE, AED et direction. Le tarif s’adapte au volume de requêtes et au nombre de professeurs, avec un plafond garanti à 149 €.",
    idealFor: [
      "Collège pilote",
      "Lycée",
      "Établissement en expérimentation IA",
      "Communauté éducative complète",
    ],
  },
];

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO / INTRO TARIFS */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 space-y-6">
          {/* Fil d’Ariane */}
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span>/</span>
            <span>Tarifs</span>
          </div>

          {/* Titre & pitch */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
              Tarifs EleveAI
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Des tarifs simples, basés sur le{" "}
              <strong>nombre de requêtes par mois</strong>.{" "}
              Pas de cases “élève / parent / prof” obligatoires : chacun choisit la
              formule qui correspond à son usage réel, selon la fréquence d’utilisation.
            </p>
            <p className="text-xs sm:text-sm text-emerald-300">
              Défis Prompt : change ton monde, un meilleur prompt après l’autre.
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Une offre <strong>0 €</strong> est disponible pour tester EleveAI avec un
              quota limité de requêtes, sans carte bancaire.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative rounded-2xl border bg-slate-900/60 p-5 sm:p-6 flex flex-col gap-4",
                plan.highlight
                  ? "border-emerald-500/70 shadow-lg shadow-emerald-500/20"
                  : "border-slate-800",
              ].join(" ")}
            >
              {/* Badge recommandé sur Essentiel */}
              {plan.highlight && (
                <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow">
                  Recommandé
                </div>
              )}

              {/* En-tête du plan */}
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-50">
                  {plan.name}
                </h2>
                <p className="text-2xl font-bold text-emerald-300">
                  {plan.price}
                </p>
                <p className="text-xs text-slate-400">{plan.reqMonth}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300">{plan.description}</p>

              {/* Public idéal */}
              <div className="mt-1">
                <p className="text-xs font-semibold text-slate-400 mb-1">
                  Idéal pour :
                </p>
                <ul className="text-xs text-slate-300 space-y-0.5">
                  {plan.idealFor.map((who) => (
                    <li key={who}>• {who}</li>
                  ))}
                </ul>
              </div>

              {/* CTA (placeholder pour futur Stripe) */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  className={[
                    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
                    plan.highlight
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "bg-slate-800 text-slate-100 hover:bg-slate-700",
                  ].join(" ")}
                >
                  Bientôt : choisir ce plan
                </button>
                <p className="text-[11px] text-slate-500">
                  Paiement mensuel (sauf offre Découverte à 0 €). Alerte ou blocage
                  possible en cas de dépassement du quota de requêtes.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* OFFRE PILOTE – COLLEGES & LYCÉES */}
        <div className="mt-10 rounded-2xl border border-emerald-600/60 bg-slate-950/70 px-4 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-300 flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span>Offre Pilote – Collèges & Lycées</span>
            </h2>

            <p className="text-sm text-slate-200 max-w-2xl">
              Testez EleveAI gratuitement dans votre établissement pendant{" "}
              <strong>8 semaines</strong>. Aucun engagement, aucun paiement, un simple
              code établissement suffit.
            </p>

            <ul className="text-sm text-slate-200 space-y-1 text-left max-w-xl">
              <li>✓ Accès complet pour élèves, parents, profs et personnels</li>
              <li>✓ Plafonds de requêtes élargis</li>
              <li>✓ Accompagnement au lancement</li>
              <li>✓ Tableau de bord de suivi</li>
              <li>✓ Rapport final d’usage</li>
            </ul>

            <Link
              href="/offre-pilote"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Devenir établissement pilote
            </Link>
          </div>
        </div>

        {/* Bloc explicatif Offre établissement */}
        <div className="mt-10 rounded-2xl border border-emerald-700/60 bg-emerald-500/5 p-5 sm:p-6 space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-emerald-200">
            Offre Établissement : comment fonctionne le tarif 95–149 € ?
          </h2>
          <p className="text-sm text-slate-200">
            L’offre <strong>Établissement</strong> est pensée pour un{" "}
            <strong>collège ou un lycée entier</strong> : plusieurs professeurs,
            équipes vie scolaire, éventuellement accès pour certains élèves ou classes pilotes.
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Prix plancher : <strong>95 € / mois</strong>.</li>
            <li>
              • Le tarif peut monter progressivement jusqu’à{" "}
              <strong>149 € / mois</strong> en fonction du{" "}
              <strong>nombre de professeurs</strong> connectés et du{" "}
              <strong>volume global de requêtes</strong>.
            </li>
            <li>
              • Le montant est <strong>toujours plafonné</strong> à 149 € : aucune
              surprise de facturation.
            </li>
          </ul>
          <p className="text-xs text-emerald-200">
            Concrètement : un petit collège peu utilisateur restera proche de 95 €.  
            Un gros établissement utilisant EleveAI intensivement se rapprochera du plafond,
            mais ne le dépassera jamais.
          </p>
          <Link
            href="/contact-etablissement"
            className="inline-flex items-center text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 mt-1"
          >
            Discuter d’une offre établissement adaptée à mon collège / lycée →
          </Link>
        </div>

        {/* Bloc formule annuelle */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-50">
            Et la formule annuelle ?
          </h2>
          <p className="text-sm text-slate-300">
            Une formule annuelle avec remise (par exemple{" "}
            <strong>-20 %</strong>) sera proposée prochainement pour les
            utilisateurs réguliers : professeurs, parents, tuteurs, établissements…
          </p>
          <p className="text-xs text-slate-500">
            L’esprit reste le même : vous choisissez surtout votre{" "}
            <strong>volume de requêtes</strong>, pas une étiquette de profil.  
            EleveAI s’adapte à votre façon de travailler, pas l’inverse.
          </p>
        </div>
      </section>
    </main>
  );
}



