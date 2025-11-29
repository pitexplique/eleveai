// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Colonne texte */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              L’IA qui aide les élèves à apprendre
              <span className="block md:inline text-blue-700">
                {" "}
                pas à tricher.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              EleveAI accompagne les professeurs, les élèves et les parents avec
              des outils simples pour mieux expliquer, s’entraîner et réviser,
              dans le respect des programmes officiels du collège et du lycée.
            </p>

            {/* Boutons principaux */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/profs"
                className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-[#FFCC00] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:brightness-95 transition"
              >
                👨‍🏫 Je suis prof
              </Link>
              <Link
                href="/eleve"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-[#E5FFE5] px-4 py-2 text-sm font-semibold text-[#008800] shadow-sm hover:brightness-95 transition"
              >
                🎒 Je suis élève
              </Link>
              <Link
                href="/parents"
                className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-[#E6F2FF] px-4 py-2 text-sm font-semibold text-[#0066CC] shadow-sm hover:brightness-95 transition"
              >
                👨‍👩‍👧 Je suis parent
              </Link>
            </div>

            <p className="text-[11px] md:text-xs text-slate-500 max-w-lg">
              Projet créé par un professeur de mathématiques à La Réunion, avec
              l’ambition de construire une IA éducative utile, accessible à
              tous et respectueuse du travail des enseignants.
            </p>
          </div>

          {/* Colonne carte explicative */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-green-50 p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Concrètement, EleveAI fait quoi ?
            </h2>
            <ul className="space-y-2 text-sm text-slate-800">
              <li>• Aide les profs à préparer des cours, exercices et prompts.</li>
              <li>
                • Guide les élèves dans leurs révisions sans fournir les devoirs
                tout faits.
              </li>
              <li>
                • Donne aux parents des repères pour accompagner leurs enfants.
              </li>
              <li>
                • Propose des contenus clairs, structurés et adaptés au niveau
                de chacun.
              </li>
            </ul>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-[#FFE6F3] px-4 py-2 text-sm font-semibold text-[#CC0088] shadow-sm hover:brightness-95 transition"
            >
              📝 Découvrir les articles du blog
            </Link>
          </div>
        </section>

        {/* NOTRE PHILOSOPHIE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Notre philosophie
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                1. L’humain d’abord
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                EleveAI ne remplace pas le professeur. L’IA aide à gagner du temps
                et à mieux expliquer, mais le cœur de la pédagogie reste
                l’enseignant et la relation avec les élèves.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                2. Pas de triche
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Les outils sont pensés pour que l’élève réfléchisse, réponde,
                se trompe et progresse. EleveAI pose des questions, propose des
                pistes, corrige et explique au lieu de faire les devoirs à sa place.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                3. Respect des programmes
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Les contenus s’appuient sur les programmes officiels (Eduscol)
                et sur l’expérience de terrain d’enseignants. Objectif : rester
                aligné avec ce qui est réellement attendu en classe et au bac.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                4. Accessible et concret
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                EleveAI vise à être simple à utiliser, même pour ceux qui ne se
                sentent pas “très à l’aise avec le numérique”. Des exemples
                concrets, des explications courtes, des chemins guidés.
              </p>
            </div>
          </div>
        </section>

        {/* POUR QUI ? */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Pour qui ?</h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Professeurs</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Aide à la rédaction de prompts, préparation de séances, exercices,
                évaluations et supports adaptés à chaque classe.
              </p>
              <Link
                href="/profs"
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                Accéder à l’espace prof →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Élèves</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Révisions guidées, préparation de contrôles, défis progressifs :
                un copilote pour apprendre à mieux travailler, pas un raccourci.
              </p>
              <Link
                href="/eleve"
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                Accéder à l’espace élève →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Parents & établissements
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Comprendre ce que fait l’IA, comment l’utiliser en confiance, et
                comment l’intégrer dans un projet d’établissement.
              </p>
              <Link
                href="/parents"
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                Accéder à l’espace parents →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

