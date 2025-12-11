
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeEtab, setCodeEtab] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const router = useRouter();

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO : logique d’authentification par email (magic link, code, etc.)
    setEmailSent(true);
  };

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCodeError(null);

    const etab = codeEtab.trim().toLowerCase();
    const userCode = codeUtilisateur.trim().toUpperCase();

    // 1) Vérifier le code établissement
    if (etab !== "dimitile") {
      setCodeError("Code établissement incorrect.");
      return;
    }

    // 2) Vérifier que le code utilisateur est entre 6C01 et 6C25
    const regex = /^6C(\d{2})$/i;
    const match = userCode.match(regex);

    if (!match) {
      setCodeError("Code utilisateur invalide (ex : 6C01, 6C02…).");
      return;
    }

    const numero = Number(match[1]); // 1 à 25
    if (numero < 1 || numero > 25) {
      setCodeError("Ce code élève n’est pas encore activé (6C01 à 6C25).");
      return;
    }

    // ✅ Tout est bon : on redirige vers l’espace élèves
    router.push("/espace-eleves");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* COLONNE GAUCHE : FORMULAIRE */}
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
              Étape 1 : choisir sa façon de se connecter (email, code établissement ou accès sans compte)
            </div>

            {/* CARTE */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-900">Accéder à mon espace</h1>

              <p className="mt-1 text-sm text-slate-600">
                Connectez-vous avec votre email ou un code établissement pour accéder à EleveAI
                en tant qu’élève, parent, professeur ou membre de l’équipe éducative.
              </p>

              {/* BADGE CRÉATIVITÉ */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                EleveAI : la créativité constructive au service de toute la communauté éducative
              </div>

              {/* FORMULAIRE EMAIL */}
              <form onSubmit={handleEmailSubmit} className="mt-5 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-800">Adresse email</label>

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
                    Un lien de connexion vient d’être envoyé (simulation).
                  </p>
                )}
              </form>

              {/* TESTER SANS COMPTE */}
              <div className="mt-3">
                <Link
                  href="/accueil"
                  className="block w-full rounded-lg border border-emerald-500 bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  🚀 Tester EleveAI sans compte
                </Link>
                <p className="mt-1 text-[11px] text-slate-500 text-center">
                  Idéal pour découvrir les prompts sans créer de compte.
                </p>
              </div>

              {/* CRÉER UN COMPTE */}
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

              {/* CODES ÉTABLISSEMENT */}
              <form
                onSubmit={handleCodeSubmit}
                className="space-y-3 rounded-xl bg-slate-50 p-3 border border-slate-200"
              >
                <p className="text-xs font-semibold text-slate-700 uppercase">
                  Connexion avec un code établissement
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Code établissement : <span className="font-semibold">DIMITILE</span>.  
                  Codes élèves : <span className="font-semibold">6C01 à 6C25</span>.
                </p>

                <div>
                  <label className="text-xs font-medium">Code établissement</label>
                  <input
                    type="text"
                    value={codeEtab}
                    onChange={(e) => setCodeEtab(e.target.value)}
                    placeholder="Ex : DIMITILE"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium">Code utilisateur</label>
                  <input
                    type="text"
                    value={codeUtilisateur}
                    onChange={(e) => setCodeUtilisateur(e.target.value)}
                    placeholder="Ex : 6C01, 6C02…"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />
                </div>

                {codeError && (
                  <p className="text-[11px] text-red-600">{codeError}</p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Se connecter avec le code établissement
                </button>
              </form>

              {/* … le reste de ta carte (bloc technique + badges) reste identique … */}
              {/* (tu peux conserver exactement ce que tu avais en-dessous) */}
            </div>
          </div>
        </div>

        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">EleveAI améliore vos prompts</h2>

            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 backdrop-blur">
              <p className="text-sm leading-relaxed text-red-300 font-medium">
                💡 Un <span className="font-semibold text-red-200">prompt</span> = une requête adressée
                à l’IA : question, consigne, situation.
              </p>
            </div>

            <p className="max-w-xl text-sm font-medium text-yellow-300">
              EleveAI utilise la créativité constructive : apprendre, inventer, transformer.
            </p>

            <p className="mt-4 max-w-xl text-sm text-slate-200">
              S’appuie sur les neurosciences : clarté cognitive, guidage, étapes simples,
              répétitions espacées.
            </p>

            <p className="mt-3 max-w-xl text-xs text-slate-400">
              Peut s’aligner avec un projet d’établissement : climat scolaire, différenciation,
              orientation, inclusion.
            </p>

            {/* CATÉGORIES */}
            <div className="mt-8 space-y-6 text-sm">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white text-lg">🎓</div>
                <div>
                  <h3 className="font-semibold text-slate-50">Pour les élèves</h3>
                  <p className="text-slate-200/80">Explications guidées et adaptées.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white text-lg">🧑‍🏫</div>
                <div>
                  <h3 className="font-semibold text-slate-50">Pour les professeurs</h3>
                  <p className="text-slate-200/80">Gain de temps, prompts variés, différenciation.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white text-lg">👨‍👩‍👧</div>
                <div>
                  <h3 className="font-semibold text-slate-50">Pour les parents</h3>
                  <p className="text-slate-200/80">Aide à encourager et reformuler.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white text-lg">🏫</div>
                <div>
                  <h3 className="font-semibold text-slate-50">Pour l’administration</h3>
                  <p className="text-slate-200/80">Courriers, projets, organisation.</p>
                </div>
              </div>
            </div>

            {/* TÉMOIGNAGE */}
            <div className="mt-10 max-w-xl rounded-2xl bg-slate-900/70 p-4 shadow-lg backdrop-blur">
              <p className="text-slate-100 italic">
                « Avec EleveAI, je peux enfin accompagner chaque élève selon son rythme et ses besoins. »
              </p>
              <p className="mt-3 text-xs font-medium text-slate-300">
                Frédéric Lacoste – Enseignant de mathématiques, Académie de La Réunion
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
