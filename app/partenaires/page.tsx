"use client";

import Link from "next/link";

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Partenaires & sponsors</span>
          </div>

          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Projet éducatif à La Réunion
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Partenaires & sponsors
            </h1>

            <p className="max-w-2xl text-slate-300">
              EleveAI est un projet indépendant, conçu à La Réunion, qui a besoin
              d’alliés : établissements, institutions, associations, entreprises et
              acteurs locaux engagés pour l’éducation et l’innovation.
            </p>
          </header>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Pourquoi devenir partenaire */}
        <div className="grid gap-6 sm:grid-cols-[1.5fr,1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-50">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-sm text-slate-300">
              En soutenant EleveAI, vous contribuez directement à{" "}
              <span className="font-medium">
                améliorer la réussite des élèves de l’île de La Réunion
              </span>{" "}
              grâce à des outils pédagogiques innovants, mais aussi à{" "}
              <span className="font-medium">
                former et impliquer les jeunes dans l’IA et le numérique éducatif
              </span>
              .
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Accès à des outils pédagogiques IA responsables.</li>
              <li>• Réduction des inégalités scolaires.</li>
              <li>• Formation des élèves aux usages éclairés de l’IA.</li>
              <li>• Accompagnement des enseignants et des équipes éducatives.</li>
              <li>• Développement de compétences numériques locales.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-5 sm:p-6 space-y-3">
            <h3 className="text-lg font-semibold text-emerald-300">
              Types de soutien possibles
            </h3>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Financement d’ateliers IA dans les collèges et lycées.</li>
              <li>• Soutien matériel (équipement, licences, hébergement).</li>
              <li>• Partenariats techniques ou pédagogiques.</li>
              <li>• Mécénat de compétences.</li>
            </ul>
          </div>
        </div>

        {/* Partenaires institutionnels / pros */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              Partenaires institutionnels
            </h2>
            <p className="text-sm text-slate-300">
              EleveAI a vocation à travailler en cohérence avec les{" "}
              <span className="font-medium">établissements scolaires</span> et les{" "}
              <span className="font-medium">structures académiques</span> qui
              réfléchissent aux usages responsables de l’IA.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              <li>• Collèges et lycées de l’académie de La Réunion.</li>
              <li>• Groupes de réflexion IA en mathématiques.</li>
              <li>• Services académiques souhaitant expérimenter des outils.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              Partenaires professionnels
            </h2>
            <p className="text-sm text-slate-300">
              Les entreprises et associations locales peuvent contribuer à{" "}
              <span className="font-medium">
                structurer une filière réunionnaise de l’IA éducative
              </span>{" "}
              et à créer des opportunités pour les jeunes.
            </p>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              <li>• Entreprises du numérique et de la formation.</li>
              <li>• Associations éducatives et citoyennes.</li>
              <li>• Acteurs engagés dans la responsabilité sociale.</li>
            </ul>
          </div>
        </div>

        {/* Sponsors */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">
            Sponsors : soutenir des actions concrètes
          </h2>
          <p className="text-sm text-slate-300">
            Les sponsors contribuent au financement d’actions très concrètes :
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Ateliers IA pour les classes (6e, 5e, 4e, 3e...).</li>
            <li>• Production de vidéos pédagogiques et ressources élèves.</li>
            <li>• Développement de fonctionnalités nouvelles d’EleveAI.</li>
            <li>• Formation et implication de jeunes de l’île dans le projet.</li>
          </ul>

          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-3 space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">
                Sponsor Bronze
              </h3>
              <p className="text-xs text-slate-300">
                Soutien ciblé sur une action (atelier, ressource ou vidéo).
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-3 space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">
                Sponsor Argent
              </h3>
              <p className="text-xs text-slate-300">
                Contribution à un ensemble d’ateliers ou de ressources.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-3 space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">
                Sponsor Or
              </h3>
              <p className="text-xs text-slate-300">
                Partenaire majeur du projet EleveAI à l’échelle de l’île.
              </p>
            </div>
          </div>
        </div>

        {/* Contact partenariat */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 sm:p-6 space-y-3">
          <h2 className="text-lg font-semibold text-emerald-300">
            Devenir partenaire ou sponsor
          </h2>
          <p className="text-sm text-slate-300">
            Vous souhaitez soutenir EleveAI, proposer une collaboration ou financer une
            action pour les élèves de La Réunion ?
          </p>
          <a
            href="mailto:frederic.lacoste@ac-reunion.fr"
            className="inline-flex items-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
          >
            Contacter EleveAI · frederic.lacoste@ac-reunion.fr
          </a>
        </div>
      </section>
    </main>
  );
}
