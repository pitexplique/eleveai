import Link from "next/link";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🤝</span>
            <span>Soutenir EleveAI</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Sponsors & Soutiens
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            EleveAI est un projet éducatif réunionnais qui accompagne les élèves 
            dans leur réussite, grâce à une IA responsable, encadrée et conforme 
            aux valeurs de l’École. Votre soutien, même modeste, peut réellement 
            transformer leur avenir.
          </p>
        </header>

        {/* SECTION – Pourquoi soutenir EleveAI ? */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            🌍 Pourquoi soutenir EleveAI ?
          </h2>

          <p className="text-gray-800 font-semibold text-lg">
            « epsilon engendre l’infini »
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            En mathématiques, un tout petit nombre peut provoquer un immense changement.
            Dans l’éducation, c’est pareil : une explication claire, un outil adapté,
            un accompagnement, peuvent changer la trajectoire d’un élève.
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            Avec l’arrivée de l’Intelligence Artificielle, nous avons une opportunité 
            unique : mettre cette technologie au service des apprentissages, 
            dans le respect du cadre de l’École et de ses valeurs.
          </p>

          <div className="space-y-2">
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Soutenir EleveAI, c’est investir dans :
            </p>
            <ul className="text-sm sm:text-base text-gray-700 space-y-1">
              <li>• l’égalité des chances à La Réunion ;</li>
              <li>• l’autonomie et la confiance des élèves ;</li>
              <li>• la compréhension et non la triche ;</li>
              <li>• l’inclusion (notamment DYS et besoins particuliers) ;</li>
              <li>• l’accès gratuit à une IA responsable et pédagogique ;</li>
              <li>• la préparation des jeunes aux compétences du XXIe siècle.</li>
            </ul>
          </div>

          <p className="text-sm sm:text-base font-semibold text-gray-800">
            Nous croyons que chacun peut changer son monde.
          </p>
        </section>

        {/* SECTION – À quoi sert l’aide financière ? */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            💶 À quoi sert l’aide financière ?
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            Chaque contribution est utilisée exclusivement pour faire avancer 
            le projet :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• couvrir les coûts techniques (hébergement, API IA, sécurité) ;</li>
            <li>• produire des contenus pédagogiques conformes aux programmes ;</li>
            <li>• développer de nouvelles fonctionnalités pour les élèves ;</li>
            <li>• améliorer l’accessibilité (DYS, simplifications, oralisations) ;</li>
            <li>• garder EleveAI totalement gratuit pour les élèves réunionnais.</li>
          </ul>
        </section>

        {/* SECTION – Pour les parents et les élèves */}
        <section className="bg-white/95 border border-amber-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-700">
            👨‍👩‍👦 Message aux parents et aux élèves
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI a été conçu pour une seule chose : aider les jeunes à comprendre,
            progresser, prendre confiance. Jamais pour remplacer leurs efforts.
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            Votre soutien — même 2 €, 5 € ou 10 € — permet de financer un outil 
            qui aide des centaines d’élèves à réussir, gratuitement.
          </p>
        </section>

        {/* SECTION – Message aux institutions */}
        <section className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
            🏛️ Message aux institutions : Région, Département, Académie
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI contribue à plusieurs priorités publiques :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• lutte contre les inégalités scolaires ;</li>
            <li>• accompagnement des élèves réunionnais ;</li>
            <li>• développement des compétences numériques ;</li>
            <li>• diffusion d’une IA responsable et éthique ;</li>
            <li>• innovation éducative locale.</li>
          </ul>

          <p className="text-sm sm:text-base text-gray-700">
            Un soutien institutionnel permettrait :  
            faire grandir le projet, assurer sa pérennité, et positionner 
            La Réunion comme territoire pionnier dans l’éducation à l’IA.
          </p>
        </section>

        {/* SECTION – Premiers soutiens */}
        <section className="bg-white/95 border border-indigo-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">
            🌱 Nos premiers soutiens
          </h2>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• Contributeur : Frédéric Lacoste</li>
            <li>• Élèves de 6eC – Entre-Deux</li>
            <li>• Sponsor actuel : FL (50 €)</li>
          </ul>
          <p className="text-xs text-gray-500">
            Merci à celles et ceux qui ont permis de lancer EleveAI.
          </p>
        </section>

        {/* Retour */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-sm font-semibold hover:bg-[#003894]"
          >
            ← Retour à l’accueil EleveAI
          </Link>
        </div>
      </div>
    </main>
  );
}

