// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-16">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            L’IA qui aide les élèves à apprendre
            <span className="text-blue-700">, pas à tricher.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-700">
            EleveAI accompagne les professeurs, les élèves et les parents avec
            des outils simples pour mieux expliquer, s’entraîner et réviser,
            dans le respect des programmes officiels du collège et du lycée.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/profs"
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: "#FFCC00", color: "#000" }}
            >
              👨‍🏫 Je suis prof
            </Link>
            <Link
              href="/eleve"
              className="rounded-full border px-4 py-2 text-sm"
              style={{ backgroundColor: "#E5FFE5", color: "#008800" }}
            >
              🎒 Je suis élève
            </Link>
            <Link
              href="/parents"
              className="rounded-full border px-4 py-2 text-sm"
              style={{ backgroundColor: "#E6F2FF", color: "#0066CC" }}
            >
              👨‍👩‍👧 Je suis parent
            </Link>
          </div>

          <p className="text-xs text-gray-500">
            Projet créé par un professeur de mathématiques à La Réunion, avec
            l’ambition de construire une IA éducative utile, accessible à tous
            et respectueuse du travail des enseignants.
          </p>
        </div>

        <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-green-50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Concrètement, EleveAI fait quoi ?
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Aide les profs à préparer des cours, exercices et prompts.</li>
            <li>• Guide les élèves dans leurs révisions sans fournir les devoirs tout faits.</li>
            <li>• Donne aux parents des repères pour accompagner leurs enfants.</li>
            <li>• Propose des contenus clairs, structurés et adaptés au niveau de chacun.</li>
          </ul>

          <Link
            href="/blog"
            className="inline-flex rounded-full border px-4 py-2 text-sm"
            style={{ backgroundColor: "#FFE6F3", color: "#CC0088" }}
          >
            📝 Découvrir les articles du blog
          </Link>
        </div>
      </section>

      {/* NOTRE PHILOSOPHIE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Notre philosophie</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">1. L’humain d’abord</h3>
            <p className="text-sm text-gray-700">
              EleveAI ne remplace pas le professeur. L’IA aide à gagner du temps
              et à mieux expliquer, mais le cœur de la pédagogie reste
              l’enseignant et la relation avec les élèves.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">2. Pas de triche</h3>
            <p className="text-sm text-gray-700">
              Les outils sont pensés pour que l’élève réfléchisse, réponde,
              se trompe et progresse. EleveAI pose des questions, propose des pistes,
              corrige et explique au lieu de faire les devoirs à la place.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">
              3. Respect des programmes
            </h3>
            <p className="text-sm text-gray-700">
              Les contenus s’appuient sur les programmes officiels (Eduscol)
              et sur l’expérience de terrain d’enseignants. L’objectif : rester
              aligné avec ce qui est réellement attendu en classe et au bac.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">4. Accessible et concret</h3>
            <p className="text-sm text-gray-700">
              EleveAI vise à être simple à utiliser, même pour ceux qui ne se
              sentent pas “très à l’aise avec le numérique”. Des exemples
              concrets, des explications courtes, des chemins guidés.
            </p>
          </div>
        </div>
      </section>

      {/* POUR QUI ? */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Pour qui ?</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">Professeurs</h3>
            <p className="text-sm text-gray-700">
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

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">Élèves</h3>
            <p className="text-sm text-gray-700">
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

          <div className="rounded-2xl border bg-white p-5 space-y-2">
            <h3 className="text-md font-semibold">Parents & établissements</h3>
            <p className="text-sm text-gray-700">
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
    </main>
  );
}
