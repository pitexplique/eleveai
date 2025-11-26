import Link from "next/link";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🤝</span>
            <span>Soutenir EleveAI</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Devenir Sponsor & Partenaire
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            EleveAI est un projet pédagogique réunionnais indépendant, conçu pour aider 
            les élèves à mieux comprendre leurs cours grâce à une Intelligence 
            Artificielle responsable, adaptée et conforme aux valeurs de l’École 
            de la République.
          </p>
        </header>

        {/* SECTION 1 : Vision */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            🌍 Une vision pour les élèves de La Réunion
          </h2>

          <p className="text-lg font-semibold text-gray-800">
            « epsilon engendre l’infini »
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            En mathématiques, un très petit nombre peut produire un immense effet.  
            Dans l’éducation, une explication claire, un outil adapté, un accompagnement 
            personnalisé peuvent transformer la trajectoire d’un élève.
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI met la puissance de l’IA au service de l’apprentissage, dans un 
            cadre responsable, transparent et aligné avec Eduscol.  
            Notre objectif : offrir à chaque enfant de La Réunion les meilleures 
            chances de réussir.
          </p>

          <p className="text-sm sm:text-base font-medium text-gray-800">
            Nous croyons que chacun peut changer son monde.
          </p>
        </section>

        {/* SECTION 2 : Pourquoi soutenir EleveAI */}
        <section className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
            🎯 Pourquoi soutenir EleveAI ?
          </h2>

          <ul className="text-sm sm:text-base text-gray-700 space-y-2">
            <li>• Favoriser l’égalité des chances à La Réunion</li>
            <li>• Offrir une aide gratuite aux élèves (6e → 4e)</li>
            <li>• Soutenir l’inclusion (DYS, besoins particuliers)</li>
            <li>• Promouvoir une IA éthique et responsable</li>
            <li>• Développer un projet éducatif 100 % réunionnais</li>
            <li>• Créer des outils pédagogiques innovants pour les profs</li>
          </ul>

          <p className="text-sm sm:text-base font-medium text-gray-800">
            Soutenir EleveAI, ce n’est pas financer de la technologie :  
            c’est financer l’avenir des jeunes réunionnais.
          </p>
        </section>

        {/* SECTION 3 : Transparence financière */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
            💶 Transparence : 80 % pédagogique – 20 % rémunération
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI suit un modèle clair et éthique :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• <strong>80 %</strong> des fonds sont dédiés aux élèves : IA, hébergement, sécurité, contenus pédagogiques.</li>
            <li>• <strong>20 %</strong> servent à rémunérer le développement technique et pédagogique.</li>
          </ul>

          <p className="text-xs text-gray-500">
            Aucun bénéfice personnel. Pas de publicité. Pas de revente de données.
          </p>
        </section>

        {/* SECTION 4 : Coût pour un collège réunionnais */}
        <section className="bg-white/95 border border-indigo-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">
            🏫 Exemple : Collège de l’Entre-Deux
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            Pour 350 élèves de 6e–5e–4e :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• Coût IA (requêtes mensuelles) : <strong>105 € / mois</strong></li>
            <li>• Hébergement, sécurité, logs : <strong>45 € / mois</strong></li>
          </ul>

          <p className="text-sm sm:text-base font-bold text-gray-800">
            🔹 Total mensuel : 150 €  
            🔹 Total annuel : 1 800 €  
            🔹 Soit 5 € par élève et par an
          </p>

          <p className="text-sm sm:text-base text-gray-700">
            Une commune, un Département ou un sponsor local peut facilement couvrir ce coût.
          </p>
        </section>

        {/* SECTION 5 : Emploi réunionnais */}
        <section className="bg-white/95 border border-amber-300 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-700">
            🧑‍💼 Créer de l’emploi à La Réunion
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI a l’ambition d’embaucher, à terme, des jeunes réunionnais dans :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• le développement web & IA</li>
            <li>• la pédagogie numérique (maths, français…)</li>
            <li>• l’accompagnement DYS</li>
            <li>• la création de contenus éducatifs</li>
            <li>• le support aux établissements scolaires</li>
          </ul>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI peut devenir un outil local générateur d’emplois et de compétences numériques.
          </p>
        </section>

        {/* SECTION 6 : Institutions */}
        <section className="bg-white/95 border border-teal-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-700">
            🏛️ Message aux institutions : Région, Département, Rectorat
          </h2>

          <p className="text-sm sm:text-base text-gray-700">
            EleveAI répond pleinement aux priorités publiques :
          </p>

          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• réduction des inégalités scolaires</li>
            <li>• maîtrise du numérique éducatif</li>
            <li>• inclusion DYS</li>
            <li>• accompagnement des familles</li>
            <li>• innovation pédagogique locale</li>
          </ul>

          <p className="text-sm sm:text-base text-gray-700">
            Avec un soutien institutionnel, EleveAI peut devenir un 
            <strong>outil pilote pour l’académie de La Réunion</strong>.
          </p>
        </section>

        {/* FOOTER BUTTON */}
        <div className="pt-4">
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
