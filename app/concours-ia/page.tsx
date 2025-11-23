import Link from "next/link";

export default function ConcoursIaChangerTonMondePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-[#FFF9D6] text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0047B6] text-white text-xs font-semibold shadow">
            <span>🌍 Concours IA – Comment changer ton monde ?</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0047B6]">
            Et si l’IA t’aidait à changer ton monde ? ✨
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Ce concours invite les élèves à utiliser l’IA pour imaginer un projet
            positif : pour la planète, pour le collège, pour les autres… ou pour
            eux-mêmes. L’IA devient un partenaire pour créer, pas pour tricher.
          </p>
        </header>

        {/* Bloc 3 idées clés */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm shadow-sm">
            <h2 className="font-semibold text-[#0047B6] mb-1 flex items-center gap-2">
              🧑‍🎓 Qui ?
            </h2>
            <p>
              Élèves de 6e, 5e, 4e et 3e. Seul·e ou en petit groupe (2–4 élèves).
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm shadow-sm">
            <h2 className="font-semibold text-[#0047B6] mb-1 flex items-center gap-2">
              💡 Quoi ?
            </h2>
            <p>
              Un projet où l’IA t’aide à améliorer quelque chose : un problème,
              une injustice, une difficulté, une habitude…
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm shadow-sm">
            <h2 className="font-semibold text-[#0047B6] mb-1 flex items-center gap-2">
              🤖 Comment ?
            </h2>
            <p>
              Tu discutes avec EleveAI, tu construis ton projet, puis tu présentes
              le résultat sous la forme que tu veux (texte, affiche, diapo, vidéo…).
            </p>
          </div>
        </section>

        {/* Section : Ton monde à toi */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6] flex items-center gap-2">
            🌱 Ton monde, c’est quoi ?
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Quand on dit <span className="font-semibold">« changer ton monde »</span>,
            ce n’est pas forcément sauver la planète entière (même si tu peux essayer 😉).
            C’est déjà :
          </p>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>rendre le collège plus agréable ou plus juste ;</li>
            <li>aider une personne qui a du mal (élève, parent, voisin, grand-parent) ;</li>
            <li>protéger un coin de nature près de chez toi ;</li>
            <li>faciliter l’apprentissage d’une notion difficile ;</li>
            <li>changer une mauvaise habitude (déchets, gaspi, harcèlement, etc.).</li>
          </ul>
        </section>

        {/* Section : Les 4 étapes du concours */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6] flex items-center gap-2">
            🧩 Les 4 étapes de ton projet
          </h2>
          <ol className="space-y-3 text-sm sm:text-base text-gray-700 list-decimal list-inside">
            <li>
              <span className="font-semibold">Choisir un problème à améliorer</span> : 
              quelque chose qui t’agace, t’inquiète ou te touche dans ton quotidien.
            </li>
            <li>
              <span className="font-semibold">Imaginer une idée de solution</span> :
              une action, un système, un outil, une campagne, un support visuel…
            </li>
            <li>
              <span className="font-semibold">Utiliser EleveAI pour t’aider</span> :
              trouver des idées, structurer ton projet, formuler tes phrases.
            </li>
            <li>
              <span className="font-semibold">Présenter ton projet</span> :
              sous forme d’affiche, de texte, de diapo, de vidéo ou de fiche projet.
            </li>
          </ol>
        </section>

        {/* Section : Prompts pour démarrer avec EleveAI */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6] flex items-center gap-2">
            🤖 3 idées de prompts pour commencer dans le chat
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Tu peux copier-coller ces phrases dans le chat EleveAI pour t’aider
            à lancer ton projet.
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-gray-800">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
              <p className="font-semibold text-[#0047B6] mb-1">
                🌍 1. Trouver une idée de projet
              </p>
              <p>
                « Je veux participer à un concours qui s’appelle ‘Comment changer ton monde ?’.  
                Propose-moi plusieurs idées de projets positifs adaptés à un élève de [ma classe]
                pour améliorer la planète, le collège ou le quotidien des gens. Classe : [6e/5e/4e/3e]. »
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
              <p className="font-semibold text-[#0047B6] mb-1">
                🧠 2. Organiser mon projet
              </p>
              <p>
                « Voici l’idée de projet que j’ai choisie : [décris ton idée].  
                Aide-moi à l’organiser en 4 parties : 1) Le problème 2) Ma solution
                3) Comment l’IA m’aide 4) Ce que ça peut changer dans la réalité. »
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
              <p className="font-semibold text-[#0047B6] mb-1">
                📣 3. Préparer ma présentation
              </p>
              <p>
                « Aide-moi à préparer une présentation courte de mon projet ‘Comment changer ton monde ?’ :
                un titre, un slogan, 3 arguments simples et une phrase finale qui donne envie d’agir. »
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047B6] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#003894] transition"
            >
              ✨ Ouvrir le chat EleveAI pour commencer
            </Link>
          </div>
        </section>

        {/* Section : message perso */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6] flex items-center gap-2">
            ❤️ Le message du prof (et du père)
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Si mes élèves utilisent l’IA non pas pour tricher, mais pour rêver,
            créer, aider, protéger, inventer… alors j’aurai réussi mon rôle de
            professeur. Et aussi mon rôle de père.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            EleveAI n’est pas une machine qui donne des réponses toutes faites :
            c’est une porte. Et c’est toi qui choisis ce que tu fais en la franchissant.
          </p>
        </section>

        {/* Bas de page */}
        <footer className="pb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between text-[11px] sm:text-xs text-gray-500">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-slate-50"
            >
              ← Retour à l’accueil
            </Link>
            <Link
              href="/concours"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-slate-50"
            >
              🌍 Voir “Mission Planète”
            </Link>
          </div>
          <p className="text-gray-400">
            Concours IA – Comment changer ton monde ? · Version pilote.
          </p>
        </footer>
      </div>
    </main>
  );
}
