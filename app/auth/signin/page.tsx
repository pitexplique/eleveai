"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // client Supabase custom

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
    const [otpCode, setOtpCode] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeEtab, setCodeEtab] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO : auth email réelle
setFeedback(null);
    setErrorMsg(null);
    setEmailSent(false);

    const emailToUse = email.trim();

    if (!emailToUse) {
      setErrorMsg("Merci de renseigner votre email.");
      return;
    }

    setLoading(true);

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("eleveai_users_email")
        .select("id")
        .eq("email", emailToUse)
        .maybeSingle();

      if (checkError) {
        console.error("Erreur de vérification utilisateur:", checkError);
        setErrorMsg(
          checkError.message ||
            "Impossible de vérifier votre compte. Merci de réessayer."
        );
        return;
      }

      if (!existingUser) {
        setErrorMsg(
          "Aucun compte trouvé pour cet email. Créez un compte ou vérifiez l'adresse saisie."
        );
        return;
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: {
          shouldCreateUser: false,
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
        },
      });

      if (otpError) {
        console.error("OTP sign-in error:", otpError);
        setErrorMsg(
          otpError.message ||
            "Impossible d'envoyer le code de connexion. Merci de réessayer."
        );
        return;
      }

      setEmailSent(true);
      setFeedback(
        "Un code à 8 chiffres vient d'être envoyé sur votre email. Entrez-le ci-dessous pour vous connecter."
      );
    } catch (err: any) {
      console.error("Unexpected sign-in error:", err);
      setErrorMsg(
        err?.message || "Erreur inattendue. Merci de réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);

    if (!emailSent) {
      setErrorMsg("Envoyez d'abord un code à votre email avant de valider.");
      return;
    }

    if (otpCode.trim().length !== 8) {
      setErrorMsg("Le code doit contenir 8 chiffres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpCode.trim(),
        type: "email",
      });

      if (error || !data?.session) {
        console.error("OTP verify error:", error);
        setErrorMsg(
          error?.message || "Code invalide ou expiré. Demandez un nouveau code."
        );
        return;
      }

      setFeedback("Connexion réussie. Redirection en cours…");

      setTimeout(() => {
        router.push("/accueil");
      }, 1200);
    } catch (err: any) {
      console.error("Unexpected OTP verification error:", err);
      setErrorMsg(
        err?.message || "Erreur inattendue. Merci de réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCodeError(null);

    const etab = codeEtab.trim().toUpperCase();
    const userCode = codeUtilisateur.trim().toUpperCase();

    if (!etab || !userCode) {
      setCodeError("Merci de renseigner les deux codes.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("utilisateurs_codes")
        .select("id, type_utilisateur")
        .eq("code_etablissement", etab)
        .eq("code_utilisateur", userCode)
        .maybeSingle();

      if (error) {
        console.error(error);
        setCodeError("Erreur technique. Merci de réessayer.");
        return;
      }

      if (!data) {
        setCodeError("Code établissement ou code utilisateur incorrect.");
        return;
      }

      switch (data.type_utilisateur) {
        case "eleve":
          router.push("/espace-eleves");
          break;
        case "prof":
          router.push("/espace-profs");
          break;
        case "parent":
          router.push("/parents");
          break;
        default:
          router.push("/accueil");
      }
    } catch (err) {
      console.error(err);
      setCodeError("Erreur inattendue. Merci de réessayer.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* COLONNE GAUCHE : FORMULAIRE */}
        <div className="flex w-full justify-center px-4 pt-6 pb-6 md:w-1/2 md:px-8 lg:px-16 md:pt-8">
          <div className="w-full max-w-md flex flex-col">
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
              Étape 1 : choisir sa façon de se connecter
            </div>

            {/* CARTE */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-900">
                Accéder à mon espace
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Connectez-vous avec votre email ou un code établissement pour
                accéder à EleveAI.
              </p>

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
                             disabled={loading}
                  className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"    >
                  C’est parti !
                </button>

               {errorMsg && (
                  <p className="text-xs text-red-600">{errorMsg}</p>
                )}
                {feedback && (
                  <p className="text-xs text-emerald-600">{feedback}</p>
                )}

                <p className="text-xs text-slate-500">
                  Pas encore de compte ?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-emerald-600 font-semibold"
                  >
                    Inscription
                  </Link>
                </p>
              </form>
             {emailSent && (
                <form
                  onSubmit={handleOtpSubmit}
                  className="mt-4 space-y-3 rounded-lg bg-emerald-50 p-3 border border-emerald-200"
                >
                  <p className="text-xs font-semibold text-emerald-800 uppercase">
                    Entrer le code reçu par email
                  </p>

                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Code à 8 chiffres"
                    className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Valider le code et se connecter
                  </button>

                  {errorMsg && (
                    <p className="text-[11px] text-red-600">{errorMsg}</p>
                  )}
                  {feedback && (
                    <p className="text-[11px] text-emerald-700">{feedback}</p>
                  )}
                </form>
              )}


              {/* TESTER SANS COMPTE */}
              <div className="mt-4">
                <Link
                  href="/accueil"
                  className="block w-full rounded-lg border border-emerald-500 bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  ✨ Tester EleveAI sans compte
                </Link>
              </div>

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

                <div>
                  <label className="text-xs font-medium">
                    Code établissement
                  </label>
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
                    placeholder="Ex : 6C01"
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

              {/* NOTRE TECHNOLOGIE */}
              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-[11px] text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">
                  Notre technologie
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>LLM de pointe, sécurisé pour l’éducation</li>
                  <li>Agent IA pédagogique qui guide pas à pas</li>
                  <li>Méthodes actives : questionnement, essais, feedback</li>
                </ul>
              </div>
            </div>

            {/* BADGES RGPD / HÉBERGEMENT */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <div className="inline-flex items-center gap-1.5">
                <span>🇫🇷</span>
                <span>Hébergé en France</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Conforme RGPD</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : CONTENU EXPLICATIF */}
        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">
              EleveAI améliore vos prompts
            </h2>

            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 backdrop-blur">
              <p className="text-sm leading-relaxed text-red-300 font-medium">
                💡 Un{" "}
                <span className="font-semibold text-red-200">prompt</span> =
                une consigne destinée à l’IA : question, tâche, activité.
              </p>
            </div>

            <p className="max-w-xl text-sm font-medium text-yellow-300">
              Créativité constructive : apprendre, inventer, transformer.
            </p>

            <p className="mt-4 max-w-xl text-sm text-slate-200">
              Neurosciences : clarté, progressivité, répétitions espacées.
            </p>

            <p className="mt-3 max-w-xl text-xs text-slate-400">
              Compatible avec les projets d’établissement : climat scolaire,
              différenciation, inclusion, orientation.
            </p>

            <div className="mt-8 space-y-6 text-sm">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white text-lg">
                  🎓
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Élèves</h3>
                  <p className="text-slate-200/80">
                    Explications guidées, adaptées au rythme.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white text-lg">
                  🧑‍🏫
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Professeurs</h3>
                  <p className="text-slate-200/80">
                    Gain de temps, différenciation immédiate.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white text-lg">
                  👨‍👩‍👧
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Parents</h3>
                  <p className="text-slate-200/80">
                    Aide à accompagner les révisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white text-lg">
                  🏫
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">
                    Administration
                  </h3>
                  <p className="text-slate-200/80">
                    Organisation, courriers, projets.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 max-w-xl rounded-2xl bg-slate-900/70 p-4 shadow-lg backdrop-blur">
                <p className="text-slate-100 italic">
                  « Je découvre de nouvelles façons d’enseigner »
                </p>
              <p className="mt-3 text-xs font-medium text-slate-300">
                Frédéric Lacoste – Mathématiques
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



