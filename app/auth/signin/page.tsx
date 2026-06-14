// app/auth/signin/page.tsx
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { inferClasseFromCode, useEleve } from "@/context/EleveContext";

const RESEND_COOLDOWN_SECONDS = 30;
const INDEPENDENT_ETABLISSEMENT_CODE = "INDEPENDANT";

type UserEmailProfile = {
  id: string;
  auth_user_id: string;
  email: string;
  nom: string | null;
  type_utilisateur: string | null;
};

export default function SignInPage() {
  const router = useRouter();
  const { login } = useEleve();
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
  const [motDePasse, setMotDePasse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const getEmailUserCode = (profile: UserEmailProfile) =>
    `EMAIL-${profile.id}`;

  const routeEmailProfile = (profile: UserEmailProfile, token?: string | null) => {
    const type = profile.type_utilisateur ?? "perso";

    login({
      acces_id: profile.id,
      code_etablissement: INDEPENDENT_ETABLISSEMENT_CODE,
      code_eleve: getEmailUserCode(profile),
      nom: profile.nom ?? profile.email,
      type_utilisateur: type,
      token: token ?? null,
    });

    if (type === "admin") {
      router.push("/dashboard");
    } else if (type === "prof") {
      router.push("/dashboard-prof");
    } else {
      router.push("/dashboard-eleve");
    }
  };

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

      const authUser = data.session.user;
      const { data: profile, error: profileError } = await supabase
        .from("users_email")
        .select("id, auth_user_id, email, nom, type_utilisateur")
        .eq("auth_user_id", authUser.id)
        .maybeSingle();

      if (profileError || !profile) {
        logSupabaseError("users_email lookup error:", profileError);
        setErrorMsg("Profil introuvable. Merci de créer un compte.");
        return;
      }

      // Jeton de session signé pour /api/resultats et /api/dashboard.
      // En cas d'échec on connecte quand même (dégradé : l'enregistrement
      // des résultats demandera une reconnexion).
      let sessionToken: string | null = null;
      try {
        const tokenRes = await fetch("/api/email-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: data.session.access_token }),
        });
        const tokenData = await tokenRes.json().catch(() => ({}));
        if (tokenRes.ok && tokenData?.token) sessionToken = tokenData.token;
      } catch {
        sessionToken = null;
      }

      setFeedback("Connexion réussie. Redirection…");
      routeEmailProfile(profile as UserEmailProfile, sessionToken);
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
    const mdp = motDePasse.trim();

    if (!ce || !cu || !mdp) {
      setErrorEtab("Merci de renseigner le code établissement et le code utilisateur.");
      return;
    }

    setLoadingEtab(true);
    try {
      // Vérification entièrement côté serveur (mot de passe jamais lu ni
      // comparé dans le navigateur) ; renvoie le jeton de session signé.
      const res = await fetch("/api/code-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: ce,
          codeUtilisateur: cu,
          motDePasse: mdp,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok || !data?.session) {
        setErrorEtab(
          data?.error ??
            "Codes invalides ou compte inactif. Vérifiez vos informations."
        );
        return;
      }

      const session = data.session;

      setFeedbackEtab("Connexion établissement validée. Redirection…");

      login({
        acces_id: session.utilisateurCodeId,
        code_etablissement: session.code_etablissement,
        code_eleve: session.code_utilisateur,
        nom: session.nom,
        type_utilisateur: session.role,
        classe: session.classe ?? inferClasseFromCode(
          session.code_utilisateur,
          session.code_etablissement
        ),
        token: data.token ?? null,
      });

      const type = session.role;
      if (type === "principal" || type === "boss") {
        router.push("/dashboard-principal");
      } else if (type === "prof") {
        router.push("/dashboard-prof");
      } else {
        router.push("/dashboard-eleve");
      }
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
              {/* ✅ CHOIX CLAIR : s'inscrire ou se connecter */}
              <div className="mb-5 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  C&apos;est ta première fois sur EleveAI ?
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Tu dois d&apos;abord créer ton compte. Sinon, connecte-toi juste en dessous.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/auth/signup?type=eleve"
                    className="flex flex-col items-center justify-center rounded-lg bg-emerald-600 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-500 transition"
                  >
                    <span className="text-base">📝</span>
                    Je m&apos;inscris
                    <span className="mt-0.5 text-[10px] font-normal text-emerald-100">
                      Nouveau compte
                    </span>
                  </Link>

                  <a
                    href="#connexion-existante"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
                  >
                    <span className="text-base">🔑</span>
                    J&apos;ai déjà un compte
                    <span className="mt-0.5 text-[10px] font-normal text-slate-500">
                      Je me connecte
                    </span>
                  </a>
                </div>
              </div>

              <h1 id="connexion-existante" className="text-lg font-semibold text-slate-900">
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
                    href="/auth/signup?type=eleve"
                    className="text-emerald-600 font-semibold"
                  >
                    Créer un compte élève, parent ou adulte
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

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value.toUpperCase())}
                        placeholder="Ex: GRANDRAID"
                        disabled={loadingEtab}
                        autoCapitalize="characters"
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck={false}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm uppercase outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                        tabIndex={-1}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
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
        <div className="relative hidden w-full overflow-hidden bg-[#041B33] text-white md:block md:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-[#041B33] via-[#062A4F] to-[#041B33]" />

          <div className="relative z-10 flex h-full flex-col justify-start px-10 py-10 lg:px-14">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                Pourquoi EleveAI
              </p>
              <h2 className="mt-1 text-3xl font-black leading-tight">
                Un coach simple pour progresser sans se perdre
              </h2>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-200">
                Pour les parents, c'est une facon simple de voir que l'enfant
                s'entraine regulierement et avance avec un cadre clair.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  {
                    title: "Guidage clair",
                    text: "L'eleve sait quoi faire maintenant.",
                  },
                  {
                    title: "Rituels courts",
                    text: "Des sessions utiles meme en 10 minutes.",
                  },
                  {
                    title: "Suivi lisible",
                    text: "Les espaces retrouvent le bon parcours.",
                  },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-lg"
                  >
                    <p className="text-sm font-black leading-tight text-white">
                      {benefit.title}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-300">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                Modules
              </p>
              <h3 className="mt-1 text-2xl font-black leading-tight">
                Tous les espaces EleveAI
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {[
                  {
                    image: "/images/cards/coach.webp",
                    label: "Coach Maths IA",
                  },
                  {
                    image: "/images/cards/parcours.webp",
                    label: "Parcours",
                  },
                  {
                    image: "/images/cards/calcul-rapide.webp",
                    label: "Calcul rapide",
                  },
                  {
                    image: "/images/cards/lecondujour.webp",
                    label: "Podcast maths",
                  },
                  {
                    image: "/images/cards/defis-du-jour.webp",
                    label: "Defis du jour",
                  },
                  {
                    image: "/images/cards/english-maths.webp",
                    label: "English Maths",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="group relative h-[118px] w-[220px] overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]"
                  >
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
                    <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[300px]" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-black leading-tight text-white">
                        {card.label}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* AVIS D'ÉLÈVES */}
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                Ils utilisent EleveAI
              </p>
              <h3 className="mt-1 text-2xl font-black leading-tight">
                Ce que disent les élèves
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    quote:
                      "Rubrique très intéressante pour revoir les bases et acquérir des automatismes. Très rapide, mais très intuitif.",
                    name: "Pierre",
                    classe: "Utilisateur",
                    note: 5,
                  },
                  {
                    quote:
                      "C'est trop bien, on peut vraiment progresser sur ce site comparé à d'autres.",
                    name: "Tamara",
                    classe: "6e",
                    note: 5,
                  },
                  {
                    quote: "C'est un moyen facile d'apprendre.",
                    name: "Laszlo",
                    classe: "6e",
                    note: 4,
                  },
                ].map((avis) => (
                  <figure
                    key={avis.name}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-lg"
                  >
                    <div className="text-xs tracking-widest">
                      <span className="text-yellow-300">
                        {"★".repeat(avis.note)}
                      </span>
                      <span className="text-white/25">
                        {"★".repeat(5 - avis.note)}
                      </span>
                    </div>
                    <blockquote className="mt-2 text-xs font-semibold leading-relaxed text-slate-200">
                      « {avis.quote} »
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-bold text-white">
                      {avis.name}{" "}
                      <span className="font-semibold text-slate-400">
                        · {avis.classe}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}
