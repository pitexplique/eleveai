"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeEtab, setCodeEtab] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO : logique d’authentification par email (magic link, code, etc.)
    setEmailSent(true);
  };

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO : logique d’authentification par code établissement + code utilisateur
    console.log("Connexion avec code établissement :", {
      codeEtab,
      codeUtilisateur,
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* -------------------------------------------------- */}
        {/* COLONNE GAUCHE : FORMULAIRE */}
        {/* -------------------------------------------------- */}
        <div className="flex w-full justify-center px-4 pt-6 pb-10 md:w-1/2 md:px-8 lg:px-16 md:pt-8">
          <div className="w-full max-w-md">
            {/* LOGO */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold">
                EA
              </div>
              <div className="text-xl font-semibold tracking-tight text-slate-900">
                Eleve<span className="text-emerald-600">AI</span>
              </div>
            </div>

            {/* BANDEAU ÉTAPE 1 */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Étape 1 : choisir sa façon de se connecter (email, code
              établissement ou accès sans compte)
            </div>

            {/* CARTE */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-900">
                Accéder à mon espace
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Connectez-vous avec votre email ou un code établissement pour
                accéder à EleveAI en tant qu’élève, parent, professeur ou membre
                de l’équipe éducative.
              </p>

              {/* BADGE CRÉATIVITÉ CONSTRUCTIVE */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                EleveAI : la créativité constructive au service de toute la
                communauté éducative
              </div>

              {/* FORMULAIRE EMAIL */}
              <form onSubmit={handleEmailSubmit} className="mt-5 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-800">
                    Adresse email
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.fr"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition"
                >
                  C’est parti !
                </button>

                {emailSent && (
                  <p className="text-xs text-emerald-600">
                    Un lien ou un code de connexion vient d’être envoyé
                    (simulation).
                  </p>
                )}
              </form>

              {/* BOUTON TESTER SANS COMPTE */}
              <div className="mt-3">
                <Link
                  href="/accueil"
                  className="block w-full rounded-lg border border-emerald-500 bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  🚀 Tester EleveAI sans compte
                </Link>
                <p className="mt-1 text-[11px] text-slate-500 text-center">
                  Idéal pour découvrir les prompts et les espaces élèves / profs
                  sans créer de compte.
                </p>
              </div>

              {/* LIEN CRÉER UN COMPTE */}
              <p className="mt-3 text-xs text-slate-500">
                Pas encore de compte ?{" "}
                <Link href="#" className="text-emerald-600 font-semibold">
                  Créer un compte
                </Link>
              </p>

              {/* SÉPARATEUR */}
              <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                OU
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* BLOC UNIQUE CODE ÉTABLISSEMENT */}
              <form
                onSubmit={handleCodeSubmit}
                className="space-y-3 rounded-xl bg-slate-50 p-3 border border-slate-200"
              >
                <p className="text-xs font-semibold text-slate-700 uppercase">
                  Connexion avec un code établissement
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Compatible avec tous les collèges et lycées. Le code
                  établissement active les espaces élèves, parents, professeurs
                  et administration, avec les adaptations nécessaires
                  (différenciation, DYS, besoins particuliers…).
                </p>

                <div>
                  <label className="text-xs font-medium">
                    Code établissement
                  </label>
                  <input
                    type="text"
                    value={codeEtab}
                    onChange={(e) => setCodeEtab(e.target.value)}
                    placeholder="Ex : COLLEGE123"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium">
                    Code utilisateur
                  </label>
                  <input
                    type="text"
                    value={codeUtilisateur}
                    onChange={(e) => setCodeUtilisateur(e.target.value)}
                    placeholder="Ex : 6C01, PARENT01, PROF01…"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Se connecter avec le code établissement
                </button>
              </form>

              {/* ENCADRÉ RASSURANT */}
              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">
                  Ce que fait (et ne fait pas) EleveAI
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Ne remplace pas les professeurs, il les aide.</li>
                  <li>Ne met pas de notes aux élèves.</li>
                  <li>
                    Ne contacte pas directement les familles sans passer par
                    l’équipe éducative.
                  </li>
                  <li>
                    Propose des aides adaptées au niveau, au rythme et au profil
                    de chaque élève.
                  </li>
                </ul>
              </div>

              {/* BADGES */}
              <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Hébergé en France
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Conforme RGPD
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Adapté DYS &amp; besoins particuliers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Inspiré des neurosciences
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* COLONNE DROITE : ARGUMENTAIRE */}
        {/* -------------------------------------------------- */}
        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          {/* Fond */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">
              EleveAI améliore vos prompts
            </h2>

            {/* Définition du prompt */}
            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 shadow-md backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-lg mt-0.5">💡</div>

                <p className="text-sm leading-relaxed text-red-300 font-medium">
                  Un{" "}
                  <span className="font-semibold text-red-200">prompt</span> est
                  une requête adressée à l’IA :
                  <br />
                  💬 une <span className="text-red-200">question</span>
                  <br />
                  📝 une <span className="text-red-200">consigne</span>
                  <br />
                  🎯 une{" "}
                  <span className="text-red-200">situation à traiter</span>.
                </p>
              </div>
            </div>

            <p className="max-w-xl text-sm font-medium text-yellow-300">
              Au cœur d’EleveAI : une créativité constructive, pour apprendre,
              inventer et transformer.
            </p>

            <p className="mt-4 max-w-xl text-sm text-slate-200">
              EleveAI s’appuie sur les neurosciences de l’apprentissage : petits
              pas, répétitions espacées, guidage explicite, clarté cognitive.
              Chaque prompt peut être adapté à la longueur, au niveau de
              langage, au rythme, et aux besoins DYS et TDAH.
            </p>

            <p className="mt-3 max-w-xl text-xs text-slate-400">
              Dans chaque établissement, EleveAI peut être configuré pour
              soutenir les axes du projet d’établissement : climat scolaire
              apaisé, accompagnement individualisé, différenciation
              pédagogique, parcours d’orientation et ouverture sur le monde.
            </p>

            <div className="mt-8 space-y-6 text-sm">
              {/* Élèves */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white text-lg">
                  🎓
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">
                    Pour les élèves
                  </h3>
                  <p className="text-slate-200/80">
                    Explications concrètes, étapes guidées, versions
                    simplifiées ou enrichies selon leur niveau et leur rythme
                    d’apprentissage.
                  </p>
                </div>
              </div>

              {/* Professeurs */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white text-lg">
                  🧑‍🏫
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">
                    Pour les professeurs
                  </h3>
                  <p className="text-slate-200/80">
                    Outils de différenciation, niveaux progressifs, supports
                    variés, adaptations DYS immédiates.
                  </p>
                </div>
              </div>

              {/* Parents */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white text-lg">
                  👨‍👩‍👧
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">
                    Pour les parents
                  </h3>
                  <p className="text-slate-200/80">
                    Aide pour encourager, reformuler, rassurer et soutenir sans
                    remplacer le travail de la classe.
                  </p>
                </div>
              </div>

              {/* Administration */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white text-lg">
                  🏫
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">
                    Pour l’administration
                  </h3>
                  <p className="text-slate-200/80">
                    Rédaction de courriers, projets, notes officielles et
                    documents internes plus clairs et plus accessibles.
                  </p>
                </div>
              </div>
            </div>

            {/* Témoignage */}
            <div className="mt-10 max-w-xl rounded-2xl bg-slate-900/70 p-4 shadow-lg backdrop-blur">
              <p className="text-slate-100 italic">
                « Avec EleveAI, je peux enfin accompagner chaque élève comme il
                en a besoin : les plus fragiles, les DYS, les curieux, les
                rapides… et ceux qui apprennent mieux en collaborant. Chacun
                trouve sa place. »
              </p>
              <p className="mt-3 text-xs font-medium text-slate-300">
                Frédéric Lacoste – Enseignant de mathématiques, Académie de La
                Réunion
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
