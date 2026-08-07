// app/auth/signin/page.tsx
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { inferClasseFromCode, useEleve } from "@/context/EleveContext";

const RESEND_COOLDOWN_SECONDS = 30;
const INDEPENDENT_ETABLISSEMENT_CODE = "INDEPENDANT";
const ADMIN_EMAIL = "eleveai974@gmail.com";

type UserEmailType = "prof" | "eleve" | "parent" | "perso" | "admin";

const PROFILE_OPTIONS: { value: Exclude<UserEmailType, "admin">; label: string }[] = [
  { value: "prof", label: "Professeur" },
  { value: "parent", label: "Parent" },
  { value: "eleve", label: "Élève" },
  { value: "perso", label: "Adulte / personnel" },
];

// Classes proposées à l'inscription d'un élève indépendant (users_email.classe).
// Mêmes valeurs que la whitelist SQL users_email_classe.sql et que les niveaux
// gérés par le coach / l'accueil adaptatif.
const CLASSE_OPTIONS: { value: string; label: string }[] = [
  { value: "cp", label: "CP" },
  { value: "ce1", label: "CE1" },
  { value: "ce2", label: "CE2" },
  { value: "cm1", label: "CM1" },
  { value: "cm2", label: "CM2" },
  { value: "6e", label: "6e" },
  { value: "5e", label: "5e" },
  { value: "4e", label: "4e" },
  { value: "3e", label: "3e" },
  { value: "seconde", label: "Seconde" },
  { value: "premiere-spe", label: "Première spé" },
  { value: "terminale-spe", label: "Terminale spé" },
];

type UserEmailProfile = {
  id: string;
  auth_user_id: string;
  email: string;
  nom: string | null;
  type_utilisateur: string | null;
  classe: string | null;
};

type PendingAuth = {
  authUserId: string;
  email: string;
  accessToken: string;
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

  // Contexte : l'utilisateur arrive depuis un cahier de vacances (?from=cahier)
  const [fromCahier, setFromCahier] = useState(false);
  // … ou depuis un kit de survie lycée (?from=kit)
  const [fromKit, setFromKit] = useState(false);

  /**
   * ⭐ OÙ L'ON REPART APRÈS S'ÊTRE CONNECTÉ (07/08).
   *
   * Avant : tout le monde atterrissait sur son tableau de bord. C'était le bon
   * réflexe du temps où l'accueil était un journal — il n'y avait rien à y
   * faire. Depuis que l'accueil DEMANDE ce qu'on cherche, l'y renvoyer est la
   * seule destination qui ne présume de rien : le tableau de bord répond à
   * « où j'en suis », pas à « qu'est-ce que je fais aujourd'hui ».
   *
   * ⚠️ SAUF si la personne s'est connectée POUR quelque chose de précis :
   * `?next=/coach-ia/maths` la ramène là où elle allait. On ne perd pas une
   * intention en route.
   * ⚠️ Et on n'accepte QUE des chemins internes (« / » suivi d'autre chose
   * qu'un second « / ») : un `?next=https://…` serait une redirection ouverte,
   * c'est-à-dire un hameçonnage offert avec notre nom de domaine dessus.
   */
  const [destination, setDestination] = useState<string | null>(null);
  /** Arrivé par le bouton « Inscription » du header : on le dit, c'est tout. */
  const [modeInscription, setModeInscription] = useState(false);

  // ---------------------------
  // Complément de profil (nouveaux comptes uniquement)
  // ---------------------------
  const [needsProfile, setNeedsProfile] = useState(false);
  const [pendingAuth, setPendingAuth] = useState<PendingAuth | null>(null);
  const [nom, setNom] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState<UserEmailType>("perso");
  const [classe, setClasse] = useState("");
  const [accepteCgv, setAccepteCgv] = useState(false);
  const [accepteNewsletter, setAccepteNewsletter] = useState(false);

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
    const t = params.get("type");
    if (t === "prof" || t === "parent" || t === "eleve" || t === "perso") {
      setTypeUtilisateur(t);
    }
    if (params.get("from") === "kit") {
      setFromKit(true);
      // Le kit de survie s'adresse aux lycéens : profil élève pré-sélectionné.
      if (!t) setTypeUtilisateur("eleve");
    }
    if (params.get("from") === "cahier") {
      setFromCahier(true);
      // Le cahier s'adresse aux parents : on pré-sélectionne ce profil.
      if (!t) setTypeUtilisateur("parent");
    }

    if (params.get("inscription") === "1") setModeInscription(true);

    // ⚠️ CHEMIN INTERNE UNIQUEMENT. « /quelque-chose », jamais « //autre.site »
    // ni « https://… » : accepter une URL absolue ici, c'est offrir une
    // redirection ouverte — un lien qui porte notre nom de domaine et qui
    // dépose la personne ailleurs, juste après qu'elle a tapé son code.
    const suite = params.get("next") ?? params.get("redirect");
    if (suite && suite.startsWith("/") && !suite.startsWith("//")) {
      setDestination(suite);
    }
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
      classe: profile.classe ?? null,
      token: token ?? null,
    });

    // ⭐ ON REPART SUR L'ACCUEIL (07/08), plus sur le tableau de bord.
    // Le tableau de bord répond à « où j'en suis » ; l'accueil demande « que
    // veux-tu faire aujourd'hui ? ». La deuxième question est celle qu'on se
    // pose en se connectant. Le tableau de bord reste à un clic : « Mon
    // espace » dans le header, et le menu du compte.
    // ⛔ SAUF l'administration : ce compte n'existe QUE pour /dashboard, l'y
    // envoyer n'est pas une supposition sur ce qu'il veut faire.
    if (type === "admin") {
      router.push(destination ?? "/dashboard");
    } else {
      router.push(destination ?? "/");
    }
  };

  // Jeton de session signé pour /api/resultats et /api/dashboard.
  // En cas d'échec on connecte quand même (dégradé : l'enregistrement des
  // résultats demandera une reconnexion).
  const fetchEmailSessionToken = async (
    accessToken: string
  ): Promise<string | null> => {
    try {
      const tokenRes = await fetch("/api/email-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });
      const tokenData = await tokenRes.json().catch(() => ({}));
      if (tokenRes.ok && tokenData?.token) return tokenData.token as string;
    } catch {
      /* dégradé */
    }
    return null;
  };

  const resetEmailFlow = () => {
    setEmailSent(false);
    setSentEmail(null);
    setOtpCode("");
    setFeedback(null);
    setErrorMsg(null);
    setLoading(false);
    setCooldown(0);
    setNeedsProfile(false);
    setPendingAuth(null);
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
      // Flux unifié : on crée l'utilisateur Auth si besoin. Le navigateur
      // n'apprend jamais si un compte existait déjà (pas d'oracle
      // d'énumération) ; l'éventuelle création du profil applicatif se fait
      // après validation du code, une fois la boîte mail prouvée.
      const { error } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: { shouldCreateUser: true },
      });

      if (error) {
        logSupabaseError("signInWithOtp error:", error);
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${error.message}`
            : "Impossible d'envoyer le code. Vérifiez votre adresse email."
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
        options: { shouldCreateUser: true },
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
        .select("id, auth_user_id, email, nom, type_utilisateur, classe")
        .eq("auth_user_id", authUser.id)
        .maybeSingle();

      if (profileError) {
        logSupabaseError("users_email lookup error:", profileError);
        setErrorMsg("Erreur de lecture du profil. Réessayez.");
        return;
      }

      // Nouvelle adresse : l'utilisateur vient de prouver qu'il possède cette
      // boîte mail. On collecte son profil avant de créer le compte
      // applicatif (étape « complète ton profil »).
      if (!profile) {
        const verifiedEmail = authUser.email ?? sentEmail;
        setPendingAuth({
          authUserId: authUser.id,
          email: verifiedEmail,
          accessToken: data.session.access_token,
        });
        if (verifiedEmail === ADMIN_EMAIL) setTypeUtilisateur("admin");
        setNeedsProfile(true);
        setFeedback("Dernière étape : complète ton profil.");
        return;
      }

      const sessionToken = await fetchEmailSessionToken(
        data.session.access_token
      );

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
  // 3) Complément de profil (nouveaux comptes uniquement)
  // ---------------------------
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);

    if (!pendingAuth) {
      setErrorMsg("Session expirée. Recommencez la connexion.");
      resetEmailFlow();
      return;
    }

    const nomToUse = nom.trim();
    if (!nomToUse) {
      setErrorMsg("Merci de renseigner votre nom.");
      return;
    }
    if (typeUtilisateur === "eleve" && !classe) {
      setErrorMsg("Merci de choisir ta classe (pour te recommander les bons exercices).");
      return;
    }
    if (!accepteCgv) {
      setErrorMsg("Vous devez accepter les CGV pour créer votre compte.");
      return;
    }

    setLoading(true);
    try {
      // Canal d'acquisition : renseigné seulement s'il est connu (ne pas
      // écraser une éventuelle valeur existante par null).
      const payload: Record<string, unknown> = {
        auth_user_id: pendingAuth.authUserId,
        email: pendingAuth.email,
        nom: nomToUse,
        type_utilisateur: typeUtilisateur,
        accepte_cgv: accepteCgv,
        accepte_newsletter: accepteNewsletter,
        // Classe uniquement pour un profil élève : les autres profils n'en ont pas.
        classe: typeUtilisateur === "eleve" && classe ? classe : null,
      };
      if (fromCahier) payload.source = "cahier-vacances";
      if (fromKit) payload.source = "kit-survie";

      const { data: profile, error: upsertError } = await supabase
        .from("users_email")
        .upsert(payload, { onConflict: "email" })
        .select("id, auth_user_id, email, nom, type_utilisateur, classe")
        .single();

      if (upsertError || !profile) {
        logSupabaseError("users_email upsert error:", upsertError);
        setErrorMsg("Impossible de créer le profil. Merci de réessayer.");
        return;
      }

      const sessionToken = await fetchEmailSessionToken(pendingAuth.accessToken);

      setFeedback("Compte créé. Bienvenue sur EleveAI !");
      routeEmailProfile(profile as UserEmailProfile, sessionToken);
    } catch (err: any) {
      console.error("Unexpected profile submit error:", err);
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

      // Même règle que la connexion par email : on revient sur l'accueil, sauf
      // si la personne s'était connectée POUR quelque chose de précis.
      // Le tableau de bord — élève, prof ou principal — reste à un clic depuis
      // « Mon espace » et le menu du compte.
      router.push(destination ?? "/");
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

            {/* Le header a désormais DEUX boutons — « Connexion » et
                « Inscription » — qui mènent au même endroit, parce que le flux
                est le même : un email, un code. Mais quelqu'un qui a cliqué
                « Inscription » et qui lit « Connexion » en arrivant croit
                s'être trompé de porte. On lui renvoie son mot. */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {modeInscription ? "Inscription" : "Connexion"}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              {/* 🌺 Contexte cahier de vacances */}
              {fromCahier && (
                <div className="mb-5 rounded-xl border-2 border-teal-200 bg-teal-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    🌺 Vous venez du cahier de vacances&nbsp;?
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Créez un compte <span className="font-semibold">gratuit</span>{" "}
                    pour suivre votre enfant et être prévenu·e des nouveautés
                    (nouveaux cahiers, coach, dictée du jour…).
                  </p>
                </div>
              )}

              {/* ✅ Flux unifié : inscription ET connexion par le même email */}
              <div className="mb-5 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-slate-900">
                  Inscription et connexion, au même endroit 👇
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Entrez votre adresse email : que vous ayez déjà un compte ou
                  non, on vous envoie un code. Nouveau compte ? On vous demandera
                  juste votre nom juste après.
                </p>
              </div>

              <h1 id="connexion-existante" className="text-lg font-semibold text-slate-900">
                Accéder à mon espace
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Connexion par email (code à usage unique) – sans mot de passe.
              </p>

              {/* EMAIL */}
              {!needsProfile && (
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
              </form>
              )}

              {/* OTP */}
              {emailSent && !needsProfile && (
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

              {/* COMPLÉMENT DE PROFIL (nouveaux comptes) */}
              {needsProfile && (
                <form
                  onSubmit={handleProfileSubmit}
                  className="mt-4 space-y-3 rounded-lg bg-emerald-50 p-3 border border-emerald-200"
                >
                  <p className="text-xs font-semibold text-emerald-800 uppercase">
                    Bienvenue ! Complète ton profil
                  </p>
                  {pendingAuth?.email && (
                    <p className="text-[11px] text-emerald-700">
                      Compte créé pour{" "}
                      <span className="font-semibold">{pendingAuth.email}</span>
                    </p>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom"
                      disabled={loading}
                      className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring disabled:bg-slate-100"
                    />
                  </div>

                  {pendingAuth?.email !== ADMIN_EMAIL && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-800">
                        Je suis
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PROFILE_OPTIONS.map((option) => {
                          const active = typeUtilisateur === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setTypeUtilisateur(option.value)}
                              disabled={loading}
                              className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                active
                                  ? "border-emerald-500 bg-white text-emerald-800"
                                  : "border-emerald-200 bg-white/60 text-slate-700 hover:border-emerald-400"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Classe : demandée seulement aux élèves, pour que l'accueil
                      et le coach recommandent directement le bon niveau
                      (comme les comptes établissement). */}
                  {typeUtilisateur === "eleve" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-800">
                        Ta classe
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {CLASSE_OPTIONS.map((option) => {
                          const active = classe === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setClasse(option.value)}
                              disabled={loading}
                              className={`rounded-lg border px-2 py-1.5 text-center text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                active
                                  ? "border-emerald-500 bg-white text-emerald-800"
                                  : "border-emerald-200 bg-white/60 text-slate-700 hover:border-emerald-400"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pour te proposer directement les exercices de ton niveau.
                      </p>
                    </div>
                  )}

                  <label className="flex items-start gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={accepteCgv}
                      onChange={(e) => setAccepteCgv(e.target.checked)}
                      disabled={loading}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      J&apos;accepte les{" "}
                      <Link href="/cgu" className="text-emerald-600 underline">
                        conditions générales de vente
                      </Link>{" "}
                      d&apos;EleveAI.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={accepteNewsletter}
                      onChange={(e) => setAccepteNewsletter(e.target.checked)}
                      disabled={loading}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      J&apos;accepte de recevoir des emails sur les nouveautés.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-500 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Création..." : "Créer mon compte"}
                  </button>

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
                <span>🔒</span>
                <span>Données chiffrées</span>
              </div>
            </div>
          </div>
        </div>


        {/* ── COLONNE DROITE ────────────────────────────────────────────────
            ⭐ ENTIÈREMENT REFAITE LE 07/08. Ce qui partait, et pourquoi :

            — « POURQUOI ELEVEAI » + « Un coach simple pour progresser sans se
              perdre » : le produit n'est plus un coach de maths avec une page
              d'explication autour. Il demande qui vous êtes et ce que vous
              cherchez, puis il propose. La promesse d'avant décrivait le
              premier module, pas le site.
            — LES TROIS CARTES « Guidage clair / Rituels courts / Suivi
              lisible » : trois affirmations invérifiables, sans accents, et
              dont aucune ne dit ce qu'on va faire en arrivant.
            — LES SIX VIGNETTES « Tous les espaces EleveAI » : un catalogue.
              C'est exactement ce que la refonte de l'accueil a enterré — on ne
              va pas le remettre sur la porte d'entrée. Et la moitié des noms
              (« Podcast maths », « Défis du jour ») ne sont pas ce qu'on vient
              chercher en créant un compte.

            Ce qui reste, et pourquoi : LES AVIS D'ÉLÈVES. Ce ne sont pas
            d'anciennes promesses, ce sont des phrases écrites par de vraies
            personnes — la seule preuve de la page. Elles gardent leurs mots
            tels quels, fautes comprises.

            À la place : les quatre gestes, dans l'ordre où ils arrivent. Pas
            « voici nos qualités » mais « voici ce qui va se passer ». */}
        <div className="relative hidden w-full overflow-hidden bg-[#041B33] text-white md:block md:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-[#041B33] via-[#062A4F] to-[#041B33]" />

          <div className="relative z-10 flex h-full flex-col justify-center px-10 py-12 lg:px-14">
            {/* ⭐ LA MÊME PHRASE QUE L'ACCUEIL, AU MOT PRÈS. Une promesse dite
                deux fois de deux façons, c'est une promesse qu'on cesse de
                croire — et cette page-ci est le moment exact où l'on décide de
                donner son adresse.
                ⚠️ SANS PRONOM. L'accueil tutoie (« te propose ») parce qu'il
                s'adresse d'abord à un élève ; le formulaire de gauche vouvoie
                (« Entrez votre adresse email ») parce qu'il sert aussi aux
                parents, aux profs et aux principaux. Écrire « te » ici mettrait
                deux voix sur le même écran. La promesse se dit donc à la
                troisième personne, et les quatre étapes vouvoient comme le
                formulaire. */}
            <h2 className="text-3xl font-black leading-tight">
              Des ressources pédagogiques
              <br />
              conçues, sélectionnées et vérifiées.
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Conçues à La Réunion
            </p>
            <p className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-slate-300">
              Pas de catalogue à explorer, pas de niveau à deviner. Vous dites
              ce que vous cherchez, EleveAI va chercher parmi ce qui existe
              vraiment pour vous.
            </p>

            <ol className="mt-8 space-y-5">
              {[
                {
                  titre: "Vous dites qui vous êtes",
                  texte:
                    "Élève et sa classe, parent, enseignant, chef d'établissement. « Les fractions » ne veulent pas dire la même chose en CP et en Terminale.",
                },
                {
                  titre: "Vous dites ce que vous cherchez",
                  texte:
                    "Une matière, une notion, ou simplement ce qui coince — avec vos mots, y compris les fautes de frappe.",
                },
                {
                  titre: "EleveAI propose ce qui vous correspond",
                  texte:
                    "Deux ou trois ressources, jamais dix : le coach ouvert sur votre notion, un parcours, une fiche, un guide à imprimer.",
                },
                {
                  titre: "Vous y allez directement",
                  texte:
                    "Un clic, et vous êtes dedans. Rien à installer, rien à configurer.",
                },
              ].map((etape, i) => (
                <li key={etape.titre} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-[#041B33]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-black leading-tight text-white">{etape.titre}</p>
                    <p className="mt-1 max-w-md text-xs font-semibold leading-relaxed text-slate-300">
                      {etape.texte}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Ce que les trois mots veulent dire, une fois qu'on les a lus en
                titre. C'est là que la promesse devient vérifiable — sinon ce
                sont trois adjectifs de plus. */}
            <div className="mt-8 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4">
              <p className="text-xs font-semibold leading-relaxed text-slate-200">
                <span className="font-black text-white">Conçues</span> — les
                coachs, les parcours, les cahiers et les guides sont écrits ici,
                par un enseignant en poste.{" "}
                <span className="font-black text-white">Sélectionnées</span> —
                le reste vient d&apos;ailleurs, et n&apos;entre que si ça tient.{" "}
                <span className="font-black text-white">Vérifiées</span> — dans
                les deux cas, relues avant d&apos;être proposées à qui que ce
                soit. Ce qui n&apos;est pas relu n&apos;est pas recommandé.
              </p>
            </div>

            {/* AVIS D'ÉLÈVES — leurs mots, tels qu'ils les ont écrits. */}
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                Ce que disent les élèves
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                      <span className="text-yellow-300">{"★".repeat(avis.note)}</span>
                      <span className="text-white/25">{"★".repeat(5 - avis.note)}</span>
                    </div>
                    <blockquote className="mt-2 text-xs font-semibold leading-relaxed text-slate-200">
                      « {avis.quote} »
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-bold text-white">
                      {avis.name}{" "}
                      <span className="font-semibold text-slate-400">· {avis.classe}</span>
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
