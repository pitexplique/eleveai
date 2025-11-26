import Link from "next/link";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Titre / Accroche */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🤝</span>
            <span>Soutenir EleveAI</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Sponsors & aide financière
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            EleveAI est un projet pédagogique indépendant, pensé pour les élèves,
            les parents et les professeurs. Votre soutien, même modeste, permet
            de garder l’outil accessible, responsable et gratuit pour les élèves.
          </p>
        </header>

        {/* Bloc philosophie */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            ✨ Notre philosophie
          </h2>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-800">
              «&nbsp;epsilon engendre l’infini&nbsp;»
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              En mathématiques, un tout petit nombre peut déclencher de grands
              changements. Nous croyons qu’une petite aide, une explication claire,
              un outil bien conçu peuvent transformer la relation d’un élève à l’école…
              puis à son avenir.
            </p>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Nous croyons que chacun peut changer son monde.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              EleveAI est là pour donner aux élèves, aux professeurs et aux familles
              des outils concrets pour apprendre, comprendre et créer avec l’IA,
              en respectant les programmes et le cadre de l’École.
            </p>
          </div>
        </section>

        {/* Bloc : à quoi sert l'aide financière */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            💶 À quoi sert l’aide financière ?
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            L’aide financière reçue pour EleveAI est utilisée uniquement pour
            soutenir le projet pédagogique :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• payer l’hébergement du site et les outils techniques (Vercel, etc.) ;</li>
            <li>• financer les appels à l’IA (API) pour répondre aux élèves ;</li>
            <li>• consacrer du temps à la création de contenus pédagogiques de qualité ;</li>
            <li>• développer de nouvelles fonctionnalités (espace profs, adaptation DYS, etc.) ;</li>
            <li>• garder EleveAI gratuit pour les élèves, en particulier à La Réunion.</li>
          </ul>
          <p className="text-xs text-gray-500">
            Chaque euro est un investissement direct dans l’accompagnement des
            élèves et la qualité des ressources proposées.
          </p>
        </section>

        {/* Bloc premiers soutiens */}
        <section className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
            🌱 Nos premiers soutiens
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Le projet EleveAI a démarré grâce à l’engagement personnel de son
            créateur et de ses élèves.
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• Contributeur : Frédéric Lacoste</li>
            <li>• Élèves de 6eC – Entre-Deux</li>
            <li>• Sponsor actuel : FL (50&nbsp;€)</li>
          </ul>
          <p className="text-xs text-gray-500">
            Ces premiers soutiens ont permis de lancer EleveAI et de couvrir les
            premiers frais techniques.
          </p>
        </section>

        {/* Bloc : qui peut aider ? */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            🤲 Qui peut nous aider ?
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Plusieurs types de soutiens seront possibles dans les prochaines
            versions du site :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• parents qui souhaitent soutenir un projet éducatif local ;</li>
            <li>• professeurs qui utilisent EleveAI avec leurs classes ;</li>
            <li>• établissements scolaires (collèges, lycées) ;</li>
            <li>• entreprises et partenaires locaux sensibles à l’égalité des chances ;</li>
            <li>• toute personne convaincue qu’un élève accompagné peut changer son monde.</li>
          </ul>
          <p className="text-sm sm:text-base text-gray-700">
            Nous mettrons bientôt en place des formules simples de sponsoring
            et des contreparties claires (remerciements, logo, soutien d’une classe, etc.).
          </p>
          <p className="text-xs text-gray-500">
            En attendant, vous pouvez déjà en parler autour de vous, tester l’outil
            avec vos élèves ou nous faire des retours pour l’améliorer.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-sm font-semibold hover:bg-[#003894]"
            >
              ← Retour à l’accueil EleveAI
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
