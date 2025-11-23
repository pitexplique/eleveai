import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0047B6] via-sky-50 to-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

      {/* 🔔 Bannière concours */}
      <div className="bg-[#FFF9D6] border border-[#FFD300] rounded-2xl px-4 py-3 sm:px-5 sm:py-3 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-[#7A5A00] space-y-1">
          <div className="font-semibold flex items-center gap-2">
            <span>🌍 Nouveau : Concours IA – Comment changer ton monde ?</span>
          </div>
          <p>
            Utilise l’IA pour imaginer un projet positif : pour la planète, ton collège,
            les autres… ou pour toi-même.
          </p>
        </div>
        <Link
          href="/concours-ia"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#003894] transition"
        >
          Découvrir le concours
        </Link>
      </div>


        {/* Bandeau haut */}
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 shadow text-xs font-semibold text-[#0047B6]">
              <span>🇷🇪</span>
              <span>Pensé pour les collégiens de La Réunion</span>
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
              EleveAI
            </h1>
            <p className="text-sm sm:text-base text-sky-100 max-w-xl">
              Un espace sécurisé pour réviser les mathématiques de 6e, 5e et 4e,
              avec des explications claires, étape par étape.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end text-xs text-sky-100">
            <span>Professeur de maths · La Réunion</span>
            <span>Explications adaptées au collège</span>
          </div>
        </header>


        {/* Carte principale */}
        <section className="bg-white/95 rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0047B6]">
              Bienvenue sur EleveAI 👋
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Ici, les élèves peuvent poser des questions de maths en français
              normal, comme en classe, et recevoir une réponse claire, avec des
              exemples et des schémas écrits “comme au tableau du prof”.
            </p>
          </div>

          {/* Boutons principaux */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/chat"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0047B6] text-white text-sm sm:text-base font-semibold shadow hover:bg-[#003894] transition"
            >
              ✨ Ouvrir le chat EleveAI
            </Link>

            <Link
              href="/prompts"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#FFD300] text-[#b38600] bg-[#FFF9D6] text-sm sm:text-base font-semibold hover:bg-[#FFE766] transition"
            >
              📘 Prompts du prof (idées de questions)
            </Link>
          </div>

          {/* Deux colonnes : élèves / parents */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Pour les élèves */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0047B6] flex items-center gap-2">
                🧑‍🎓 Pour les élèves
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Pose tes questions de maths comme tu les dirais en classe.</li>
                <li>• Revois une notion mal comprise (fractions, équations, proportionnalité…).</li>
                <li>• Regarde les formules s’afficher proprement, comme sur un tableau.</li>
                <li>• Utilise les prompts du prof si tu ne sais pas comment formuler ta question.</li>
              </ul>
            </div>

            {/* Pour les parents */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#0047B6] flex items-center gap-2">
                👨‍👩‍👦 Pour les parents
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• EleveAI ne corrige pas les photos de devoirs maison.</li>
                <li>• L’élève doit rédiger sa question : il reste actif dans ses apprentissages.</li>
                <li>• L’objectif est de comprendre la méthode, pas de “faire à sa place”.</li>
                <li>• Aucune inscription Google pour l’instant : accès simple, sécurisé.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section : Comment ça marche ? */}
        <section className="bg-white/90 rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6] flex items-center gap-2">
            🟡 Comment utiliser EleveAI ?
          </h2>

          <ol className="space-y-3 text-sm sm:text-base text-gray-700">
            <li>
              <span className="font-semibold text-[#0047B6]">1.</span>{" "}
              L’élève ouvre le{" "}
              <Link href="/chat" className="text-[#0047B6] underline">
                chat EleveAI
              </Link>{" "}
              et décrit sa difficulté : une question, un exercice, une notion.
            </li>
            <li>
              <span className="font-semibold text-[#0047B6]">2.</span>{" "}
              EleveAI répond avec une explication étape par étape, en utilisant
              des fractions, équations et schémas écrits proprement.
            </li>
            <li>
              <span className="font-semibold text-[#0047B6]">3.</span>{" "}
              L’élève peut demander une autre explication, un exemple différent
              ou une version plus simple.
            </li>
            <li>
              <span className="font-semibold text-[#0047B6]">4.</span>{" "}
              Le professeur peut proposer des questions toutes prêtes via la page{" "}
              <Link href="/prompts" className="text-[#0047B6] underline">
                Prompts du prof
              </Link>
              .
            </li>
          </ol>
        </section>

        {/* Bas de page */}
        <footer className="pb-6 text-[11px] sm:text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
          <p>
            🇷🇪 EleveAI – Outil d’aide en maths pour les collégiens de La Réunion.  
            Pas de correction automatique de photos de devoirs.
          </p>
          <p className="text-gray-400">
            Version en développement – usage pédagogique uniquement.
          </p>
        </footer>
      </div>
    </main>
  );
}

