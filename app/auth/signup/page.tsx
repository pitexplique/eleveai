"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Step = "form" | "code" | "success";

export default function SignUpPage() {
  const [step, setStep] = useState<Step>("form");

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  const [accepteCGV, setAccepteCGV] = useState(false);
  const [accepteNewsletter, setAccepteNewsletter] = useState(false);

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  /* --------------------------------------------------
   * Étape 1 : formulaire nom + email + CGV
   * -------------------------------------------------- */
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFeedback(null);

    if (!nom.trim()) {
      setErrorMsg("Merci de renseigner votre nom.");
      return;
    }

    if (!accepteCGV) {
      setErrorMsg("Vous devez accepter les CGV pour créer un compte.");
      return;
    }

    setLoading(true);
    try {
      // Vérifier si l'email existe déjà dans la table applicative
      const { data: exist, error: existError } = await supabase
        .from("eleveai_users_email")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existError) {
        console.error("Erreur de vérification email:", existError);
      }

      if (exist) {
        setErrorMsg(
          "Cet email est déjà enregistré. Veuillez vous connecter avec cet email."
        );
        setLoading(false);
        return;
      }

      // Envoi du code à 8 chiffres par email (config Supabase)
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
          data: {
            nom,
            accepte_cgv: accepteCGV,
            accepte_newsletter: accepteNewsletter,
          },
        },
      });

      if (otpError) {
        console.error("OTP send error:", otpError);
        setErrorMsg(
          otpError.message || "Impossible d'envoyer le code. Merci de réessayer."
        );
        return;
      }

      setFeedback(
        "Un code à 8 chiffres vient d'être envoyé sur votre email. Copiez-le et entrez-le ci-dessous."
      );
      setStep("code");
    } catch (err: any) {
      console.error("Unexpected signup error:", err);
      setErrorMsg(
        err?.message || "Erreur inattendue. Merci de réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------------------------
   * Étape 2 : saisie du code et validation
   * -------------------------------------------------- */
  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFeedback(null);

    // ⚠️ Supabase est configuré avec un OTP de 8 chiffres
    if (code.trim().length !== 8) {
      setErrorMsg("Le code doit contenir 8 chiffres.");
      return;
    }

    setLoading(true);
    try {
      // Vérifier le code OTP (email)
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code.trim(),
        type: "email", // OTP par email
      });

      if (error || !data?.session) {
        console.error("OTP verify error:", error);
        setErrorMsg(
          error?.message ||
            "Code invalide ou expiré. Demandez un nouveau code et réessayez."
        );
        return;
      }

      // Récupérer l'utilisateur connecté
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Get user error:", userError);
      } else {
        const authUser = userData.user;

        // Enregistrer / mettre à jour dans la table eleveai_users_email
        const { error: upsertError } = await supabase
          .from("eleveai_users_email")
          .upsert(
            {
              auth_user_id: authUser.id,
              email: authUser.email,
              nom: nom,
              accepte_cgv: accepteCGV,
              accepte_newsletter: accepteNewsletter,
            },
            { onConflict: "email" } // email est unique dans la table
          );

        if (upsertError) {
          console.error(
            "Upsert eleveai_users_email error:",
            upsertError.message
          );
        }
      }

      setFeedback("Connexion réussie. Bienvenue sur EleveAI !");
      setStep("success");

      // Redirection vers l’espace après succès
      setTimeout(() => {
        router.push("/accueil"); // à adapter plus tard (/dashboard, etc.)
      }, 1500);
    } catch (err: any) {
      console.error("Unexpected verify error:", err);
      setErrorMsg(
        err?.message || "Erreur inattendue. Merci de réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* COLONNE GAUCHE : FORMULAIRE */}
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

            {/* BANDEAU */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Créer un compte EleveAI sans mot de passe, avec un code de connexion
            </div>

            {/* CARTE */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              {step === "form" && (
                <>
                  <h1 className="text-lg font-semibold text-slate-900">
                    Inscription rapide
                  </h1>

                  <p className="mt-1 text-sm text-slate-600">
                    Entrez votre nom et votre email. Nous vous enverrons un code à 8
                    chiffres pour vous connecter.
                  </p>

                  <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                    {/* NOM */}
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
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                      />
                    </div>

                    {/* EMAIL */}
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
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                      />
                    </div>

                    {/* CGV + Newsletter */}
                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2 text-xs text-slate-700">
                        <input
                          type="checkbox"
                          checked={accepteCGV}
                          onChange={(e) => setAccepteCGV(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>
                          J’accepte les{" "}
                          <Link
                            href="/cgv"
                            className="text-emerald-600 underline"
                          >
                            conditions générales de vente
                          </Link>{" "}
                          d’EleveAI.
                        </span>
                      </label>

                      <label className="flex items-start gap-2 text-xs text-slate-700">
                        <input
                          type="checkbox"
                          checked={accepteNewsletter}
                          onChange={(e) =>
                            setAccepteNewsletter(e.target.checked)
                          }
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>
                          J’accepte de recevoir des emails sur les nouveautés
                          (newsletter, évolutions d’EleveAI).
                        </span>
                      </label>
                    </div>

                    {/* MESSAGES */}
                    {errorMsg && (
                      <p className="text-xs text-red-600">{errorMsg}</p>
                    )}
                    {feedback && (
                      <p className="text-xs text-emerald-600">{feedback}</p>
                    )}

                    {/* BOUTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? "Envoi du code..."
                        : "Recevoir mon code de connexion"}
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
                    Nous avons envoyé un code à 8 chiffres à{" "}
                    <span className="font-semibold">{email}</span>. Copiez-le
                    depuis votre email et collez-le ici.
                  </p>

                  <form onSubmit={handleCodeSubmit} className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-800">
                        Code de connexion (8 chiffres)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={8}
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="12345678"
                        className="w-full tracking-[0.4em] text-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-red-600">{errorMsg}</p>
                    )}
                    {feedback && (
                      <p className="text-xs text-emerald-600">{feedback}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-emerald-600 text-white py-2.5 text-sm font-semibold hover:bg-emerald-500 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Vérification..." : "Valider le code"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("form");
                        setCode("");
                        setFeedback(null);
                        setErrorMsg(null);
                      }}
                      className="w-full text-xs text-slate-500 mt-2 underline"
                    >
                      Modifier mon email / recevoir un nouveau code
                    </button>
                  </form>
                </>
              )}

              {step === "success" && (
                <div className="space-y-3">
                  <h1 className="text-lg font-semibold text-slate-900">
                    Bienvenue sur EleveAI 🎉
                  </h1>
                  <p className="text-sm text-slate-600">
                    Votre connexion est validée. Vous allez être redirigé(e)
                    vers votre espace.
                  </p>
                  {feedback && (
                    <p className="text-xs text-emerald-600">{feedback}</p>
                  )}
                </div>
              )}

              {/* LIEN VERS CONNEXION */}
              <p className="mt-4 text-xs text-slate-500">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/auth/signin"
                  className="text-emerald-600 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            {/* BADGES RGPD */}
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

        {/* COLONNE DROITE : visuel */}
        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">
              Un compte EleveAI, sans mot de passe, pour construire vos prompts
              dans la durée
            </h2>

            <div className="mt-4 mb-6 max-w-xl rounded-lg border border-emerald-500 bg-emerald-500/10 px-4 py-3 backdrop-blur">
              <p className="text-sm leading-relaxed text-emerald-200 font-medium">
                En créant un compte, vous retrouvez vos habitudes, vos thèmes
                favoris et votre manière de travailler avec l’IA.
              </p>
            </div>

            <p className="max-w-xl text-sm font-medium text-yellow-300">
              LLM + agent IA + méthodes actives pour l’apprentissage.
            </p>

            <p className="mt-4 max-w-xl text-sm text-slate-200">
              Pensé pour les élèves, les professeurs, les parents et toute la
              communauté éducative.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
