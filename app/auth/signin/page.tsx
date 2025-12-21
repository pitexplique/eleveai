// app/auth/signin/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type CodeUserType = "eleve" | "prof" | "parent" | "admin" | string;

export default function SignInPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  // ---------------------------
  // Email OTP
  // ---------------------------
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // ---------------------------
  // Codes établissement
  // ---------------------------
  const [codeEtab, setCodeEtab] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");

  // ---------------------------
  // UI feedback
  // ---------------------------
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  const normalizeEmail = (v: string) => v.trim().toLowerCase();

  const emailRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  const resetEmailFlow = () => {
    setEmailSent(false);
    setSentEmail(null);
    setOtpCode("");
    setFeedback(null);
    setErrorMsg(null);
    setLoading(false);
  };

  // ---------------------------
  // 1) Envoi du code OTP par email
  // ---------------------------
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);
    setCodeError(null);

    const emailToUse = normalizeEmail(email);
    if (!emailToUse) {
      setErrorMsg("Merci de renseigner votre email.");
      return;
    }

    setLoading(true);

    try {
      // V1: on vérifie que l’utilisateur existe dans la table applicative
      const { data: existingUser, error: checkError } = await supabase
        .from("eleveai_users_email")
        .select("id")
        .eq("email", emailToUse)
        .maybeSingle();

      if (checkError) {
        console.error("Erreur vérification eleveai_users_email:", {
          message: checkError.message,
          details: (checkError as any).details,
          hint: (checkError as any).hint,
          code: (checkError as any).code,
        });
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${checkError.message}`
            : "Impossible de vérifier votre compte. Merci de réessayer."
        );
        return;
      }

      if (!existingUser) {
        setErrorMsg(
          "Aucun compte trouvé pour cet email. Créez un compte (Inscription) ou vérifiez l’adresse saisie."
        );
        return;
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: {
          shouldCreateUser: false,
          emailRedirectTo,
        },
      });

      if (otpError) {
        console.error("signInWithOtp error:", {
          message: otpError.message,
          details: (otpError as any).details,
          hint: (otpError as any).hint,
          code: (otpError as any).code,
        });
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${otpError.message}`
            : "Impossible d'envoyer le code de connexion. Merci de réessayer."
        );
        return;
      }

      setEmailSent(true);
      setSentEmail(emailToUse);
      setFeedback(
        "Un code vient d’être envoyé. Entrez-le ci-dessous pour vous connecter."
      );
    } catch (err: any) {
      console.error("Unexpected sign-in error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setFeedback(null);
    setErrorMsg(null);

    if (!sentEmail) {
      setErrorMsg("Email manquant. Merci de redemander un code.");
      resetEmailFlow();
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: sentEmail,
        options: {
          shouldCreateUser: false,
          emailRedirectTo,
        },
      });

      if (error) {
        console.error("resend OTP error:", {
          message: error.message,
          details: (error as any).details,
          hint: (error as any).hint,
          code: (error as any).code,
        });
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Impossible de renvoyer le code. Réessayez."
        );
        return;
      }

      setFeedback("Code renvoyé. Vérifiez votre boîte mail (et le spam).");
    } catch (err: any) {
      console.error("Unexpected resend error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // 2) Vérification du code OTP
  // ---------------------------
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);

    if (!emailSent || !sentEmail) {
      setErrorMsg("Envoyez d’abord un code à votre email.");
      return;
    }

    const token = otpCode.trim().replace(/\s/g, "");
    if (!/^[0-9]{6,8}$/.test(token)) {
      setErrorMsg("Le code doit contenir 6 à 8 chiffres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: sentEmail,
        token,
        type: "email",
      });

      if (error || !data?.session) {
        console.error("verifyOtp error:", {
          message: error?.message,
          details: (error as any)?.details,
          hint: (error as any)?.hint,
          code: (error as any)?.code,
        });
        setErrorMsg(
          error?.message || "Code invalide ou expiré. Demandez un nouveau code."
        );
        return;
      }

      setFeedback("Connexion réussie. Redirection…");
      router.push("/accueil");
    } catch (err: any) {
      console.error("Unexpected OTP verify error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // 3) Connexion via code établissement
  // ---------------------------
  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCodeError(null);
    setErrorMsg(null);
    setFeedback(null);

    const etab = codeEtab.trim().toUpperCase();
    const userCode = codeUtilisateur.trim().toUpperCase();

    if (!etab || !userCode) {
      setCodeError("Merci de renseigner les deux codes.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("utilisateurs_codes")
        .select("id, type_utilisateur, actif")
        .eq("code_etablissement", etab)
        .eq("code_utilisateur", userCode)
        .maybeSingle();

      if (error) {
        console.error("utilisateurs_codes error:", {
          message: error.message,
          details: (error as any).details,
          hint: (error as any).hint,
          code: (error as any).code,
        });
        setCodeError(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Erreur technique. Merci de réessayer."
        );
        return;
      }

      // data null => mauvais codes, ou bien RLS/filtrage
      if (!data) {
        setCodeError("Code établissement ou code utilisateur incorrect.");
        return;
      }

      // sécurité logique côté app (même si RLS filtre déjà)
      if (data.actif === false) {
        setCodeError("Ce code est désactivé. Contactez l’établissement.");
        return;
      }

      const t = (data.type_utilisateur || "") as CodeUserType;

      if (t === "eleve") router.push("/espace-eleves");
      else if (t === "prof") router.push("/espace-profs");
      else if (t === "parent") router.push("/parents");
      else if (t === "admin") router.push("/admin");
      else router.push("/accueil");
    } catch (err: any) {
      console.error("Unexpected code login error:", err);
      setCodeError(err?.message || "Erreur inattendue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* COLONNE GAUCHE */}
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

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Connexion
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-900">
                Accéder à mon espace
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Connectez-vous avec votre email (code) ou un code établissement.
              </p>

              {/* EMAIL */}
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
                    disabled={emailSent || loading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || emailSent}
                  className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Envoi..." : "C’est parti !"}
                </button>

                {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
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

              {/* OTP */}
              {emailSent && (
                <form
                  onSubmit={handleOtpSubmit}
                  className="mt-4 space-y-3 rounded-lg bg-emerald-50 p-3 border border-emerald-200"
                >
                  <p className="text-xs font-semibold text-emerald-800 uppercase">
                    Entrer le code reçu par email
                  </p>

                  {sentEmail && (
                    <p className="text-[11px] text-emerald-700">
                      Code envoyé à{" "}
                      <span className="font-semibold">{sentEmail}</span>
                    </p>
                  )}

                  <input
                    type="text"
                    inputMode="numeric"
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="Code (6 à 8 chiffres)"
                    className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Vérification..." : "Valider le code"}
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      className="w-1/2 rounded-lg border border-emerald-300 bg-white py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-60"
                    >
                      Renvoyer
                    </button>

                    <button
                      type="button"
                      onClick={resetEmailFlow}
                      disabled={loading}
                      className="w-1/2 rounded-lg border border-emerald-300 bg-white py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-60"
                    >
                      Changer d’email
                    </button>
                  </div>

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

              {/* SEPARATEUR */}
              <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                OU
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* CODES ETABLISSEMENT */}
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
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium">Code utilisateur</label>
                  <input
                    type="text"
                    value={codeUtilisateur}
                    onChange={(e) => setCodeUtilisateur(e.target.value)}
                    placeholder="Ex : 6C01"
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring disabled:opacity-60"
                  />
                </div>

                {codeError && (
                  <p className="text-[11px] text-red-600">{codeError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition disabled:opacity-60"
                >
                  {loading ? "Connexion..." : "Se connecter avec le code"}
                </button>
              </form>

              {/* NOTRE TECHNOLOGIE */}
              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-[11px] text-slate-600">
                <div className="font-semibold text-slate-800 mb-1">
                  Notre technologie
                </div>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>LLM de pointe, sécurisé pour l’éducation</li>
                  <li>Agent IA pédagogique qui guide pas à pas</li>
                  <li>Méthodes actives : questionnement, essais, feedback</li>
                </ul>
              </div>
            </div>

            {/* BADGES */}
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

        {/* COLONNE DROITE */}
        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">
              EleveAI améliore vos prompts
            </h2>

            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 backdrop-blur">
              <p className="text-sm leading-relaxed text-red-300 font-medium">
                💡 Un <span className="font-semibold text-red-200">prompt</span>{" "}
                = une consigne destinée à l’IA : question, tâche, activité.
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
