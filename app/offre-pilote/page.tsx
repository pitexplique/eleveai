// app/offre-pilote/page.tsx

import Link from "next/link";

export default function OffrePilotePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* HERO */}
        <section className="space-y-5">
          <p className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-amber-200">
            Établissements · Offre pilote EleveAI
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Devenir <span className="text-amber-300">collège pilote</span> EleveAI
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl">
            EleveAI propose une phase pilote pour les collèges et lycées
            souhaitant intégrer l’IA pédagogique dans un cadre
            <span className="font-semibold text-slate-100">
              {" "}sécurisé, conforme Eduscol ,
            </span>{" "}
            avec accompagnement des équipes.
          </p>
        </section>

        {/* POUR QUI ? */}
        <section className="space-y-5 rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold text-slate-50">
            Établissements concernés
          </h2>
          <p className="text-sm text-slate-300">
            Le dispositif pilote est ouvert aux établissements souhaitant tester
            l’IA dans un usage strictement pédagogique, sur une période limitée.
          </p>

          <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4">
              <p className="font-semibold">Collèges</p>
              <p className="mt-1 text-xs text-slate-400">
                Classes de la 6e à la 3e, général ou REP/REP+.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4">
              <p className="font-semibold">Lycées généraux & technologiques</p>
              <p className="mt-1 text-xs text-slate-400">
                Seconde, Première, Terminale.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4">
              <p className="font-semibold">Lycées professionnels</p>
              <p className="mt-1 text-xs text-slate-400">
                Accompagnement ciblé sur les fondamentaux.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENU DE L’OFFRE */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-50">
            Contenu de l’offre pilote
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                Accès plateforme
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-200">
                <li>Accès pour un ensemble de professeurs volontaires.</li>
                <li>Accès élève via codes de classe (sans compte individuel).</li>
                <li>Espace parents pour accompagner l’usage à la maison.</li>
                <li>
                  Contenus conformes{" "}
                  <span className="font-medium">Eduscol + neurosciences</span>.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-sky-300 uppercase tracking-wide">
                Accompagnement
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-200">
                <li>Réunion de lancement avec la direction.</li>
                <li>Formation des enseignants (visio ou présentiel).</li>
                <li>Chartes d’usage élèves et familles.</li>
                <li>Bilan à la fin de la période pilote.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CADRE & NEUROSCIENCES */}
        <section className="space-y-5 rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold text-slate-50">
            Cadre et principes pédagogiques
          </h2>

          <div className="grid gap-5 md:grid-cols-3 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-emerald-300">Eduscol</h3>
              <p className="text-slate-300 text-xs">
                Organisation par notions et niveaux, conformément aux programmes officiels.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sky-300">Neurosciences</h3>
              <p className="text-slate-300 text-xs">
                Rappel actif, progressivité, exemples gradués, changement de modalité.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-amber-300">Sécurité</h3>
              <p className="text-slate-300 text-xs">
                Accès cadré, réponses strictement pédagogiques, pas de dérives possibles.
              </p>
            </div>
          </div>
        </section>

        {/* ETAPES */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-50">
            Étapes du dispositif pilote
          </h2>

          <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-300">
            <li>Premier échange pour présenter votre établissement.</li>
            <li>Visio de cadrage : niveaux, disciplines, volume, besoins.</li>
            <li>Mise en place : accès, chartes, formation des équipes.</li>
            <li>Période pilote en conditions réelles.</li>
            <li>Bilan partagé et ajustements possibles.</li>
          </ol>
        </section>

        {/* CONTACT — WHATSAPP */}
        <section className="rounded-2xl bg-amber-500/15 border border-amber-400/60 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-amber-200">
            Prendre contact pour devenir établissement pilote
          </h2>

          <p className="text-sm text-amber-100">
            Nous répondons rapidement aux directions, coordinateurs et équipes pédagogiques.
          </p>

          <a
            href="https://wa.me/262692742958"
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition"
          >
            Contacter EleveAI via WhatsApp
          </a>
        </section>

      </div>
    </main>
  );
}
