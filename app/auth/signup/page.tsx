// app/auth/signup/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Step = "form" | "code" | "success";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [step, setStep] = useState<Step>("form");

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  const [accepteCGV, setAccepteCGV] = useState(false);
  const [accepteNewsletter, setAccepteNewsletter] = useState(false);

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // on fige l’email réellement utilisé
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const normalizeEmail = (v: string) => v.trim().toLowerCase();

  const resetMessages = () => {
    setErrorMsg(null);
    setFeedback(null);
  };

  const emailRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  const logSupabaseError = (label: string, err: any) => {
    console.error(label, {
      message: err?.message,
      details: err?.details,
      hint: err?.hint,
      code: err?.code,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();

    const nomToUse = nom.trim();
    const emailToUse = normalizeEmail(email);

    if (!nomToUse) {
      setErrorMsg("Merci de renseigner votre nom.");
      return;
    }
    if (!emailToUse) {
      setErrorMsg("Merci de renseigner votre email.");
      return;
    }
    if (!accepteCGV) {
      setErrorMsg("Vous devez accepter les CGV pour créer un compte.");
      return;
    }

    setLoading(true);

    try {
      // Pré-check : l’email ne doit pas exister dans la table applicative
      const { data: exist, error: existError } = await supabase
        .from("eleveai_users_email")
        .select("id")
        .eq("email", emailToUse)
        .maybeSingle();

      if (existError) {
        logSupabaseError("Erreur de vérification eleveai_users_email:", existError);
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${existError.message}`
            : "Impossible de vérifier l’email. Merci de réessayer."
        );
        return;
      }

      if (exist) {
        setErrorMsg(
          "Cet email est déjà enregistré. Veuillez vous connecter avec cet email."
        );
        return;
      }

      // Envoi OTP (création autorisée)
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: emailToUse,
        options: {
          shouldCreateUser: true,
          emailRedirectTo,
          data: {
            nom: nomToUse,
            accepte_cgv: accepteCGV,
            accepte_newsletter: accepteNewsletter,
          },
        },
      });

      if (otpError) {
        logSupabaseError("OTP send error:", otpError);
        setErrorMsg(
          process.env.NODE_ENV === "development"
            ? `Erreur Supabase: ${otpError.message}`
            : "Impossible d'envoyer le code. Merci de réessayer."
        );
        return;
      }

      setSentEmail(emailToUse);
      setFeedback(
        "Un code vient d'être envoyé sur votre email. Copiez-le et entrez-le ci-dessous."
      );
      setStep("code");
    } catch (err: any) {
      console.error("Unexpected signup error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();

    const emailToUse = sentEmail ? normalizeEmail(sentEmail) : normalizeEmail(email);

    // ✅ on nettoie fort
    const token = code.trim().replace(/[^\d]/g, "");

    if (!emailToUse) {
      setErrorMsg("Email manquant. Recommencez l’inscription.");
      setStep("form");
      return;
    }

    if (!/^[0-9]{6,8}$/.test(token)) {
      setErrorMsg("Le code doit contenir 6 à 8 chiffres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: emailToUse,
        token,
        type: "email",
      });

      if (error || !data?.session) {
        logSupabaseError("OTP verify error:", error);
        setErrorMsg(
          error?.message ||
            "Code invalide ou expiré. Demandez un nouveau code et réessayez."
        );
        return;
      }

      // Session OK -> on récupère l'user
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        logSupabaseError("Get user error:", userError);
        // On n'empêche pas la redirection si la session est valide
      } else {
        const authUser = userData.user;

        const { error: upsertError } = await supabase
          .from("eleveai_users_email")
          .upsert(
            {
              auth_user_id: authUser.id,
              email: authUser.email ?? emailToUse,
              nom: nom.trim(),
              accepte_cgv: accepteCGV,
              accepte_newsletter: accepteNewsletter,
            },
            { onConflict: "email" }
          );

        if (upsertError) {
          logSupabaseError("Upsert eleveai_users_email error:", upsertError);
          // On ne bloque pas l’utilisateur si l’upsert échoue
        }
      }

      setFeedback("Compte créé. Bienvenue sur EleveAI !");
      setStep("success");

      setTimeout(() => {
        router.push("/accueil");
      }, 1200);
    } catch (err: any) {
      console.error("Unexpected verify error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

const handleResendCode = async () => {
  resetMessages();

  const emailToUse = sentEmail ? normalizeEmail(sentEmail) : normalizeEmail(email);
  if (!emailToUse) {
    setErrorMsg("Email manquant. Recommencez l’inscription.");
    setStep("form");
    return;
  }

  console.log("[signup] resend OTP ->", emailToUse); // ✅ debug

  setLoading(true);
  try {
    // ✅ IMPORTANT : au renvoi, l’utilisateur est souvent déjà créé => false
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailToUse,
      options: {
        shouldCreateUser: false,
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    if (error) {
      console.error("[signup] resend signInWithOtp error:", {
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });

      setErrorMsg(
        process.env.NODE_ENV === "development"
          ? `Erreur Supabase: ${error.message}`
          : "Impossible de renvoyer le code. Réessayez dans un instant."
      );
      return;
    }

    console.log("[signup] resend OK:", data);
    setFeedback("Code renvoyé. Vérifiez votre boîte mail (et les spams).");
  } catch (err: any) {
    console.error("[signup] resend unexpected:", err);
    setErrorMsg(err?.message || "Erreur inattendue. Réessayez.");
  } finally {
    setLoading(false);
  }
};





  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* COLONNE GAUCHE */}
        <div className="flex w-full justify-center px-4 pt-6 pb-6 md:w-1/2 md:px-8 lg:px-16 md:pt-8">
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

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Inscription
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              {step === "form" && (
                <>
                  <h1 className="text-lg font-semibold text-slate-900">
                    Inscription rapide
                  </h1>

                  <p className="mt-1 text-sm text-slate-600">
                    Entrez votre nom et votre email. Nous vous enverrons un code
                    pour vous connecter.
                  </p>

                  <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-800">
                        Nom
                      </label>
                      <input
                        type="text"
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Votre nom"
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40 disabled:bg-slate-100"
                      />
                    </div>

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
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40 disabled:bg-slate-100"
                      />
                    </div>

                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2 text-xs text-slate-700">
                        <input
                          type="checkbox"
                          checked={accepteCGV}
                          onChange={(e) => setAccepteCGV(e.target.checked)}
                          disabled={loading}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>
                          J’accepte les{" "}
                          <Link href="/cgv" className="text-emerald-600 underline">
                            conditions générales de vente
                          </Link>{" "}
                          d’EleveAI.
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
                        <span>J’accepte de recevoir des emails sur les nouveautés.</span>
                      </label>
                    </div>

                    {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
                    {feedback && <p className="text-xs text-emerald-600">{feedback}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Envoi du code..." : "Recevoir mon code"}
                    </button>
                  </form>
                </>
              )}

              {step === "code" && (
                <>
                  <h1 className="text-lg font-semibold text-slate-900">
                    Entrez votre code
                  </h1>

                  <p className="mt-1 text-sm text-slate-600">
                    Nous avons envoyé un code à{" "}
                    <span className="font-semibold">{sentEmail ?? email}</span>.
                    Copiez-le depuis votre email et collez-le ici.
                  </p>

                  <form onSubmit={handleCodeSubmit} className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-800">
                        Code (6 à 8 chiffres)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={8}
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="12345678"
                        className="w-full tracking-[0.4em] text-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                      />
                    </div>

                    {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
                    {feedback && <p className="text-xs text-emerald-600">{feedback}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Vérification..." : "Valider le code"}
                    </button>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={loading}
                        className="w-full rounded-lg border border-emerald-300 bg-white py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-60"
                      >
                        Renvoyer un code
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStep("form");
                          setCode("");
                          setSentEmail(null);
                          resetMessages();
                        }}
                        disabled={loading}
                        className="w-full text-xs text-slate-500 underline"
                      >
                        Modifier mon email
                      </button>
                    </div>
                  </form>
                </>
              )}

              {step === "success" && (
                <div className="space-y-3">
                  <h1 className="text-lg font-semibold text-slate-900">
                    Bienvenue sur EleveAI 🎉
                  </h1>
                  <p className="text-sm text-slate-600">
                    Votre compte est prêt. Redirection…
                  </p>
                  {feedback && <p className="text-xs text-emerald-600">{feedback}</p>}
                </div>
              )}

              <p className="mt-4 text-xs text-slate-500">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/signin" className="text-emerald-600 font-semibold">
                  Se connecter
                </Link>
              </p>
            </div>

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
              Un compte EleveAI, sans mot de passe
            </h2>

            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-emerald-500 bg-emerald-500/10 px-4 py-3 backdrop-blur">
              <p className="text-sm leading-relaxed text-emerald-200 font-medium">
                Retrouver vos presets, votre historique et vos usages.
              </p>
            </div>

            <p className="max-w-xl text-sm font-medium text-yellow-300">
              LLM + agent IA + méthodes actives pour l’apprentissage.
            </p>

            <p className="mt-4 max-w-xl text-sm text-slate-200">
              Pensé pour les élèves, les professeurs, les parents.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
