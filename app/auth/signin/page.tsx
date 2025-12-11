"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ----------------------------------------
   CODES D'ÉTABLISSEMENT (version simple)
---------------------------------------- */

// Génère 6C01, 6C02, ..., 6C25
const ELEVES_6C = Array.from({ length: 25 }, (_, i) =>
  `6C${String(i + 1).padStart(2, "0")}`,
);

type Role = "eleve" | "parent" | "prof" | "admin";

type EtabAccess = {
  role: Role;
  redirect: string;
  codes: string[];
};

// Pour l’instant : 1 établissement + 1 classe
const ACCESS_MAP: Record<string, EtabAccess> = {
  // dimitile → élèves 6C01 à 6C25
  dimitile: {
    role: "eleve",
    redirect: "/espace-eleves",
    codes: ELEVES_6C,
  },
  // plus tard : tu pourras ajouter d’autres entrées ici
  // "autrecollege": { role: "prof", redirect: "/espace-profs", codes: ["PROF01"] },
};

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeEtab, setCodeEtab] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO : logique d’authentification par email (magic link, code, etc.)
    setEmailSent(true);
  };

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCodeError(null);

    const etabKey = codeEtab.trim().toLowerCase();
    const userCode = codeUtilisateur.trim().toUpperCase();

    if (!etabKey || !userCode) {
      setCodeError("Merci de saisir le code établissement ET le code utilisateur.");
      return;
    }

    const etab = ACCESS_MAP[etabKey];

    if (!etab) {
      setCodeError("Code établissement inconnu. Vérifie l’orthographe (ex : dimitile).");
      return;
    }

    const isValid = etab.codes.includes(userCode);

    if (!isValid) {
      setCodeError(
        "Code utilisateur invalide pour cet établissement. Vérifie ton code (ex : 6C01).",
      );
      return;
    }

    // On mémorise quelques infos en session (pour plus tard)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("eleveai_role", etab.role);
      sessionStorage.setItem("eleveai_code_etab", etabKey);
      sessionStorage.setItem("eleveai_code_utilisateur", userCode);
    }

    // Redirection vers l’espace adapté
    router.push(etab.redirect);
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
                  Pour tester : code établissement{" "}
                  <span className="font-semibold">dimitile</span> et codes
                  élèves <span className="font-semibold">6C01 à 6C25</span>.
                  Chaque élève a son propre code.
                </p>

                <div>
                  <label className="text-xs font-medium">
                    Code établissement
                  </label>
                  <input
                    type="text"
                    value={codeEtab}
                    onChange={(e) => setCodeEtab(e.target.value)}
                    placeholder="Ex : dimitile"
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

              {/* ENCADRÉ TECHNO */}
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-4 py-3 text-[12px] text-slate-700 shadow-sm">
                <p className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 text-xs">
                    ⚙️
                  </span>
                  Sous le capot : comment fonctionne EleveAI ?
                </p>

                <div className="grid gap-2 sm:grid-cols-2 text-[11px]">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800">
                      🧠 Modèles de langage (LLM)
                    </p>
                    <p className="text-slate-600">
                      EleveAI s’appuie sur des modèles de langage avancés
                      capables de comprendre le vocabulaire scolaire, les
                      programmes et les situations de classe.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800">
                      🤖 Agents IA coopératifs
                    </p>
                    <p className="text-slate-600">
                      Plusieurs “agents” IA travaillent ensemble : clarification
                      de la demande, mise en forme, vérification, puis
                      enrichissement du prompt.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800">
                      🎯 Méthode ACTIVE
                    </p>
                    <p className="text-slate-600">
                      Analyse → Clarification → Transformation → Vérification →
                      Enrichissement : une chaîne d’étapes qui transforme une
                      question floue en prompt utile.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800">
                      ✨ Adapté à chaque profil
                    </p>
                    <p className="text-slate-600">
                      Les prompts sont personnalisés selon le rôle (élève,
                      parent, prof, personnel) et peuvent intégrer des besoins
                      spécifiques (DYS, rythme, confiance).
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-500 italic">
                  Résultat : moins de temps à chercher comment formuler, plus
                  de temps pour apprendre, expliquer ou organiser.
                </p>
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

            {/* (le reste de la colonne droite inchangé) */}
            {/* ... */}
          </div>
        </div>
      </div>
    </main>
  );
}

