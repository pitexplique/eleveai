// app/auth/signin/page.tsx
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const RESEND_COOLDOWN_SECONDS = 30;

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
  // UI feedback
  // ---------------------------
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ---------------------------
  // Cooldown anti-spam OTP
  // ---------------------------
  const [cooldown, setCooldown] = useState<number>(0);

  // ---------------------------
  // ✅ Connexion établissement (ajout)
  // ---------------------------
  const [codeEtablissement, setCodeEtablissement] = useState("");
  const [codeUtilisateur, setCodeUtilisateur] = useState("");
  const [loadingEtab, setLoadingEtab] = useState(false);
  const [feedbackEtab, setFeedbackEtab] = useState<string | null>(null);
  const [errorEtab, setErrorEtab] = useState<string | null>(null);

  const normalizeCode = (v: string) => v.trim().toUpperCase();

  // ✅ Pré-remplissage email depuis /auth/signup -> /auth/signin?email=...
  // (sans useSearchParams => build Vercel OK)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email");
    if (e) setEmail(e);
  }, []);

  // ✅ Décompte cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const normalizeEmail = (v: string) => v.trim().toLowerCase();

  const resetEmailFlow = () => {
    setEmailSent(false);
    setSentEmail(null);
    setOtpCode("");
    setFeedback(null);
    setErrorMsg(null);
    setLoading(false);
    setCooldown(0);
  };

  const logSupabaseError = (label: string, err: any) => {
    console.error(label, {
      message: err?.message,
      details: err?.details,
      hint: err?.hint,
      code: err?.code,
    });
  };

  // ---------------------------
  // 1) Envoi du code OTP
  // ---------------------------
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);

    const emailToUse = normalizeEmail(email);
    if (!emailToUse) {
      setErrorMsg("Merci de renseigner votre email.");
      return;
    }

    // Si on est encore en cooldown, on ne renvoie pas
    if (cooldown > 0) {
      setErrorMsg(`Merci d’attendre ${cooldown}s avant de renvoyer un code.`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: { shouldCreateUser: false },
      });

      if (error) {
        logSupabaseError("signInWithOtp error:", error);
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Impossible d'envoyer le code. Vérifiez l’email ou créez un compte."
        );
        return;
      }

      setEmailSent(true);
      setSentEmail(emailToUse);
      setFeedback("Un code vient d’être envoyé. Entrez-le ci-dessous.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
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

    if (cooldown > 0) {
      setErrorMsg(`Merci d’attendre ${cooldown}s avant de renvoyer un code.`);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: sentEmail,
        options: { shouldCreateUser: false },
      });

      if (error) {
        logSupabaseError("resend OTP error:", error);
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Impossible de renvoyer le code. Réessayez."
        );
        return;
      }

      setFeedback("Code renvoyé. Vérifiez votre boîte mail (et le spam).");
      setCooldown(RESEND_COOLDOWN_SECONDS);
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
        logSupabaseError("verifyOtp error:", error);
        setErrorMsg(
          error?.message || "Code invalide ou expiré. Demandez un nouveau code."
        );
        return;
      }

      setFeedback("Connexion réussie. Redirection…");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Unexpected OTP verify error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // ✅ Connexion établissement (avec vérification Supabase)
  // ---------------------------
  const handleEtablissementSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedbackEtab(null);
    setErrorEtab(null);

    const ce = normalizeCode(codeEtablissement);
    const cu = normalizeCode(codeUtilisateur);

    if (!ce || !cu) {
      setErrorEtab("Merci de renseigner le code établissement et le code utilisateur.");
      return;
    }

    setLoadingEtab(true);
    try {
      const { data, error } = await supabase
        .from("acces_etablissement")
        .select("id, code_etablissement, code_utilisateur, type_utilisateur, nom, actif")
        .eq("code_etablissement", ce)
        .eq("code_utilisateur", cu)
        .eq("actif", true)
        .maybeSingle();

      if (error) {
        logSupabaseError("acces_etablissement check error:", error);
        setErrorEtab(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Impossible de vérifier ces codes. Réessayez."
        );
        return;
      }

      if (!data) {
        setErrorEtab("Codes invalides ou compte inactif. Vérifiez vos informations.");
        return;
      }

      setFeedbackEtab("Connexion établissement validée. Redirection…");

      // V1 : on passe les codes en querystring (en attendant la “vraie session” élève)
      router.push(
        `/espace-eleves?code_etablissement=${encodeURIComponent(ce)}&code_utilisateur=${encodeURIComponent(cu)}`
      );
    } catch (err: any) {
      console.error("Unexpected etablissement login error:", err);
      setErrorEtab(err?.message || "Erreur inattendue. Réessayez.");
    } finally {
      setLoadingEtab(false);
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
                Connectez-vous par email (code) – sans mot de passe.
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
                  disabled={loading || emailSent || cooldown > 0}
                  className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Envoi..."
                    : cooldown > 0
                      ? `Attendez ${cooldown}s…`
                      : "Recevoir mon code"}
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
                      disabled={loading || cooldown > 0}
                      className="w-1/2 rounded-lg border border-emerald-300 bg-white py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-60"
                    >
                      {cooldown > 0 ? `Renvoyer (${cooldown}s)` : "Renvoyer"}
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

              {/* ✅ AJOUT : CONNEXION ÉTABLISSEMENT (sous la partie email) */}
              <div className="mt-5 border-t border-slate-200 pt-5">
                <h2 className="text-sm font-semibold text-slate-900">
                  Connexion établissement
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Saisissez le code établissement et votre code utilisateur.
                </p>

                <form onSubmit={handleEtablissementSubmit} className="mt-3 space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800">
                      Code établissement
                    </label>
                    <input
                      type="text"
                      value={codeEtablissement}
                      onChange={(e) => setCodeEtablissement(e.target.value)}
                      placeholder="Ex: DIMITILE"
                      disabled={loadingEtab}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800">
                      Code utilisateur
                    </label>
                    <input
                      type="text"
                      value={codeUtilisateur}
                      onChange={(e) => setCodeUtilisateur(e.target.value)}
                      placeholder="Ex: 6C16"
                      disabled={loadingEtab}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loadingEtab}
                    className="w-full rounded-lg bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-slate-800 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingEtab ? "Vérification..." : "Se connecter (établissement)"}
                  </button>

                  {errorEtab && <p className="text-xs text-red-600">{errorEtab}</p>}
                  {feedbackEtab && <p className="text-xs text-emerald-600">{feedbackEtab}</p>}
                </form>
              </div>

              {/* TESTER SANS COMPTE */}
              <div className="mt-4">
                <Link
                  href="/accueil"
                  className="block w-full rounded-lg border border-emerald-500 bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  ✨ Tester EleveAI sans compte
                </Link>
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
{/* COLONNE DROITE */}
{/* COLONNE DROITE */}
<div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
  <div className="absolute inset-0 bg-slate-900/60" />

  <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
    <h2 className="max-w-xl text-3xl font-bold leading-tight">
      Apprendre avec l’IA, en confiance
    </h2>

    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200">
      EleveAI est conçu comme un outil pédagogique encadré.
      L’IA aide à comprendre, à s’entraîner et à progresser —
      <span className="font-semibold"> jamais à faire à la place.</span>
    </p>

    {/* 1 — ENSEIGNANTS */}
    <div className="mt-8 max-w-xl rounded-xl border border-slate-700/70 bg-slate-950/30 p-5 backdrop-blur">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Regard d’enseignant
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-100">
        EleveAI est né d’une pratique de terrain.
        Il aide à formuler de meilleures consignes,
        différencier les activités (base / standard / défi)
        et accompagner des élèves aux profils variés,
        notamment DYS, sans alourdir la préparation.
      </p>

      <p className="mt-3 text-xs text-slate-300">
        Frédéric Lacoste — Professeur de mathématiques, La Réunion
      </p>
    </div>

    {/* 2 — PARENTS */}
    <div className="mt-6 max-w-xl rounded-xl border border-slate-700/50 bg-slate-950/20 p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Côté parents
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        EleveAI pose un cadre clair et rassurant :
        l’IA est autorisée pour apprendre, s’entraîner et comprendre,
        mais l’élève doit toujours produire une réponse personnelle.
      </p>
    </div>

    {/* 3 — ÉLÈVES */}
    <div className="mt-6 max-w-xl rounded-xl border border-slate-700/50 bg-slate-950/20 p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Côté élèves
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        L’espace élèves permet de réviser, poser des questions
        et progresser à son rythme, avec des aides graduées
        et des explications adaptées à chacun.
      </p>

      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        L’Atelier-IA est un espace guidé pour explorer,
        réfléchir et chercher des pistes de solutions,
        en utilisant l’IA comme un outil d’accompagnement.
      </p>
    </div>
  </div>
</div>



      </div>
    </main>
  );
}
