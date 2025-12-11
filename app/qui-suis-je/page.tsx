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
              EleveAI · Projet pédagogique à La Réunion
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Qui suis-je ?
            </h1>

            <p className="max-w-2xl text-slate-300">
              Je m’appelle <span className="font-semibold">Frédéric Lacoste</span>. 
              Je suis <span className="font-semibold">enseignant de mathématiques</span> dans
              l’académie de La Réunion, développeur autodidacte et initiateur du projet{" "}
              <span className="font-semibold">EleveAI</span>. Je ne représente pas une
              start-up extérieure : je suis simplement un professeur qui essaie de mettre
              l’IA au service des élèves, des collègues et des familles.
            </p>
          </header>
        </div>
      </section>

      {/* Contenu */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Bloc : Pourquoi EleveAI existe */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-5 sm:p-6 space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            Pourquoi j’ai créé EleveAI
          </h2>
          <p className="text-sm text-slate-200">
            EleveAI est né d’un constat simple : les élèves utilisent déjà l’IA, 
            souvent sans cadre, et les professeurs manquent de temps pour tout faire.
            J’ai voulu construire un outil qui :
          </p>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• respecte les programmes officiels (Eduscol, BO) ;</li>
            <li>• aide les élèves à reprendre confiance et à comprendre le cours ;</li>
            <li>• fait gagner du temps aux enseignants (préparation, différenciation, corrections) ;</li>
            <li>• rassure les parents et la direction sur un usage responsable de l’IA.</li>
          </ul>
          <p className="text-sm text-slate-300">
            Ce projet avance petit à petit, grâce aux retours des élèves, de quelques collègues,
            de la direction et de l’inspection.
          </p>
        </div>

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
                  Cette formation nourrit aujourd’hui ma manière de concevoir des outils
                  d’IA transparents et rigoureux pour l’éducation.
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
                    Travaux sur la <span className="font-medium">théorie du plus proche voisin (k-NN)</span>
                    et des modèles prédictifs utilisés en industrie. Ces expériences m’ont
                    donné une culture solide des données et des algorithmes.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Consultant en statistiques industrielles (5 ans)
                  </h3>
                  <p className="text-sm text-slate-300">
                    Plans d’expériences (DOE), contrôle qualité (SPC), tests statistiques
                    et optimisation de procédés. Aujourd’hui, j’applique cette rigueur
                    à la conception d’outils éducatifs fiables.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Retour vers l’enseignement
                  </h3>
                  <p className="text-sm text-slate-300">
                    Après plusieurs années en entreprise, j’ai choisi de revenir auprès
                    des élèves. Mon objectif : rendre les mathématiques plus accessibles
                    et montrer que l’IA peut être un allié, pas une menace.
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
                <li>• Être créatif dans mes cours et dans les outils numériques.</li>
                <li>• Aider les élèves à reprendre confiance en eux.</li>
                <li>• Mettre l’IA au service de la pédagogie, pas l’inverse.</li>
                <li>• Construire des solutions durables à La Réunion.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Un ancrage à la Réunion
              </h2>
              <p className="text-sm text-slate-300">
                J’aime le <span className="font-medium">sport</span> et la{" "}
                <span className="font-medium">nature réunionnaise</span>, et je veux que mes projets
                participent au développement des jeunes de l’île, en leur donnant des outils
                modernes sans renoncer à l’exigence scolaire.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Un projet collectif, pas seulement personnel 
              </h2>
              <p className="text-sm text-slate-300">
                EleveAI évolue grâce aux retours :
              </p>
              <ul className="text-sm text-slate-200 space-y-1">
                <li>• d’élèves qui testent les activités ;</li>
                <li>• de quelques collègues qui expérimentent les prompts ;</li>
                <li>• de la direction qui teste le projet</li>
              </ul>
              <p className="text-sm text-slate-300">
                L’objectif d’EleveAI n’est pas de remplacer qui que ce soit, mais d’offrir un 
                appui clair et adaptable pour toute la communauté éducative : des outils pour les 
                professeurs, des aides à la compréhension pour les élèves, un accompagnement 
                bienveillant pour les parents et des fonctions de suivi pour l’administration. 
                Chacun peut l’utiliser à sa manière,.
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
              <span className="font-medium">neurosciences</span>, vidéos Manim, et outils pour
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
