"use client";

import Link from "next/link";

export default function QuiSuisJePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-300 transition">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Qui suis-je ?</span>
          </div>

          {/* En-tête */}
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              EleveAI · Fondateur & enseignant
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Qui suis-je ?
            </h1>

            <p className="max-w-2xl text-slate-300">
              Je m’appelle <span className="font-semibold">Frédéric Lacoste</span>.
              Je suis <span className="font-semibold">enseignant de mathématiques</span> dans
              l’académie de La Réunion, développeur autodidacte et fondateur du projet{" "}
              <span className="font-semibold">EleveAI</span>.
            </p>
          </header>
        </div>
      </section>

      {/* Contenu */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Parcours académique & pro */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-50">
                Parcours académique
              </h2>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                <p className="text-slate-200 font-medium">
                  Titulaire d’un DESS de mathématiques appliquées
                </p>
                <p className="text-sm text-slate-300">
                  Spécialisation en statistiques, modélisation numérique et optimisation.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-50">
                Parcours professionnel
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Statisticien chez ELF Aquitaine
                  </h3>
                  <p className="text-sm text-slate-300">
                    Travaux sur la <span className="font-medium">théorie du plus proche voisin (k-NN)</span>,
                    les premiers <span className="font-medium">réseaux de neurones industriels</span> et des modèles
                    prédictifs précurseurs de l’IA moderne.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Consultant en statistiques industrielles (5 ans)
                  </h3>
                  <p className="text-sm text-slate-300">
                    Plans d’expériences (DOE), contrôle qualité (SPC), tests statistiques et
                    optimisation de procédés pour l’industrie.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Développement IA avancé
                  </h3>
                  <p className="text-sm text-slate-300">
                    Modification et amélioration d’un algorithme{" "}
                    <span className="font-medium">TensorFlow</span> pour optimiser la{" "}
                    <span className="font-medium">rétropropagation sur matrices</span>.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Expérience en import–export
                  </h3>
                  <p className="text-sm text-slate-300">
                    Gestion, logistique et conduite de projets, avant un retour engagé vers
                    l’éducation et la pédagogie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte profil / côté humain */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5 space-y-3">
              <h2 className="text-lg font-semibold text-emerald-300">
                Ce qui me motive
              </h2>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Être créatif dans mes cours et mes outils numériques.</li>
                <li>• Aider les élèves à reprendre confiance en eux.</li>
                <li>• Mettre l’IA au service de la pédagogie, pas l’inverse.</li>
                <li>• Construire des solutions durables à La Réunion.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Un ancrage à La Réunion
              </h2>
               <p className="text-sm text-slate-300">
                J’aime le <span className="font-medium">sport</span> et la{" "}
                <span className="font-medium">nature réunionnaise</span>, et je veux que mes projets
                participent au développement des jeunes de l’île.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Vision à long terme
              </h2>
              <p className="text-sm text-slate-300">
                Construire une société réunionnaise liée à EleveAI pour{" "}
                <span className="font-medium">
                  former et embaucher des jeunes de l’île
                </span>{" "}
                autour de l’IA éducative, du développement et des contenus pédagogiques.
              </p>
            </div>
          </aside>
        </div>

        {/* EleveAI + contact */}
        <div className="grid gap-6 sm:grid-cols-[1.4fr,1fr] pt-4 border-t border-slate-800 mt-4">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-50">
              EleveAI : un projet humain avant tout
            </h2>
            <p className="text-sm text-slate-300">
              EleveAI est un écosystème pédagogique qui combine IA générative, recommandations{" "}
              <span className="font-medium">Eduscol</span>, principes des{" "}
              <span className="font-medium">neurosciences</span>, vidéos Manim, outils pour
              les élèves, les enseignants, les parents et l’administration.
            </p>
            <p className="text-sm text-slate-300">
              L’objectif est simple :{" "}
              <span className="font-medium">
                mettre l’IA au service de la réussite des élèves et de la communauté
                éducative, dans un cadre responsable, éthique et sécurisé.
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-300">
              Me contacter
            </h2>
            <p className="text-sm text-slate-300">
              Pour toute collaboration, question, atelier IA ou partenariat :
            </p>
            <a
              href="mailto:frederic.lacoste@ac-reunion.fr"
              className="inline-flex items-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
            >
              Frederic.Lacoste@ac-reunion.fr
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
