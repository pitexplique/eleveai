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
            Sponsors & Soutiens
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            EleveAI est un projet pédagogique indépendant, pensé pour les élèves,
            les parents et les professeurs. Votre soutien permet de garder l’outil
            accessible, responsable et centré sur la compréhension.
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
              changements. Nous croyons qu’une petite aide, un outil bien conçu,
              une explication claire peuvent transformer la relation d’un élève
              à l’école… puis à son avenir.
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
            Chaque contribution, même modeste, participe à l’hébergement, aux
            coûts d’API d’IA et au temps de création de contenus pédagogiques.
          </p>
        </section>

        {/* Bloc appel à soutien simple (sans paiement pour l’instant) */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            🤲 Comment nous soutenir (bientôt)
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Nous mettrons bientôt en place des formules simples pour les parents,
            les professeurs, les établissements et les entreprises qui souhaitent
            soutenir EleveAI&nbsp;: participation symbolique, sponsoring local,
            ou financement de fonctionnalités dédiées.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            En attendant, vous pouvez déjà :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• utiliser EleveAI avec vos élèves ;</li>
            <li>• en parler à vos collègues et à votre établissement ;</li>
            <li>• nous faire des retours pour améliorer l’outil.</li>
          </ul>
          <p className="text-xs text-gray-500">
            Une page avec les modalités de sponsoring et les contreparties sera
            ajoutée dans une prochaine version.
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
