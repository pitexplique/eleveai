import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>📩</span>
            <span>Contact EleveAI</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Nous contacter
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-xl">
            Cette page permet aux parents, enseignants et partenaires de
            prendre contact à propos du projet EleveAI : questions, retours,
            idées d’amélioration ou propositions de collaboration.
          </p>
        </header>

        {/* Bloc parents / profs */}
        <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Pour les parents et les élèves
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Vous pouvez nous écrire si :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• vous avez une question sur l’utilisation d’EleveAI ;</li>
            <li>• vous avez constaté un contenu inadapté ou une erreur ;</li>
            <li>• vous souhaitez proposer une amélioration ou une idée.</li>
          </ul>
        </section>

        {/* Bloc enseignants / institutions */}
        <section className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-700">
            Pour les enseignants et les institutions
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            EleveAI est pensé comme un projet éducatif local, en dialogue avec
            les pratiques de classe et les cadres institutionnels.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            N’hésitez pas à nous contacter pour :
          </p>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li>• échanger sur l’usage de l’IA en classe ;</li>
            <li>• proposer une expérimentation dans un établissement ;</li>
            <li>• demander une présentation du projet ;</li>
            <li>• discuter d’un partenariat ou d’un soutien.</li>
          </ul>
        </section>

        {/* Coordonnées / formulaire simple */}
        {/* SECTION : Comment nous écrire ? */}
        <section className="bg-white/95 border border-sky-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">
        <h2 className="text-lg sm:text-xl font-bold text-[#0047B6]">
            Comment nous contacter ?
        </h2>

        {/* EMAIL */}
        <div className="space-y-1">
            <p className="text-sm sm:text-base text-gray-700">
            📩 Par e-mail :
            </p>
            <p className="text-sm sm:text-base">
            <a
                href="mailto:contact@eleveai.re"
                className="font-semibold text-[#0047B6] underline underline-offset-2"
            >
                Frederic.Lacoste@ac-reunion.fr
            </a>
            </p>
        </div>

        {/* WHATSAPP */}
        <div className="space-y-1 pt-3">
            <p className="text-sm sm:text-base text-gray-700">
            📱 WhatsApp (Réunion) :
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#0047B6]">
            <a
                href="https://wa.me/262692742958"
                className="underline underline-offset-2 hover:text-[#003894]"
                target="_blank"
            >
                +262 06 92 74 29 58
            </a>
            </p>
            <p className="text-xs text-gray-500">
            Disponible pour les messages écrits (parents, professeurs, partenaires).  
            Pas de communication directe avec les élèves pour des raisons de sécurité.
            </p>
        </div>

        <p className="text-xs text-gray-500 pt-3">
            Merci de ne pas envoyer d’informations personnelles sensibles (adresse complète, identité complète d’un enfant, etc.).  
            Les échanges restent centrés sur la pédagogie, la technique et le projet EleveAI.
        </p>
        </section>


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
