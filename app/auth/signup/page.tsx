"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // ton client

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFeedback(null);

    if (password !== passwordConfirm) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        setErrorMsg(error.message || "Erreur lors de la création du compte.");
        return;
      }

      if (!data) {
        setErrorMsg(
          "Impossible de créer votre compte. Veuillez réessayer."
        );
        return;
      }

      setFeedback(
        "Votre compte a été créé. Vérifiez votre boîte mail pour confirmer votre adresse."
      );
      // Option : rediriger après quelques secondes
      // setTimeout(() => router.push("/auth/signin"), 3000);
    } catch (err: any) {
      console.error("Unexpected signup error:", err);
      setErrorMsg(err?.message || "Erreur inattendue. Merci de réessayer.");
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
              Créer un compte EleveAI avec votre adresse email
            </div>

            {/* CARTE */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80 border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-900">
                Inscription par email
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Un compte EleveAI vous permet de retrouver vos préférences, vos
                prompts et vos espaces personnalisés.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

                {/* MOT DE PASSE */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-800">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                  />
                  <p className="text-[11px] text-slate-500">
                    Minimum 6 caractères.
                  </p>
                </div>

                {/* CONFIRMATION */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-800">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-500/40"
                  />
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
                  {loading ? "Création du compte..." : "Créer mon compte"}
                </button>
              </form>

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

        {/* COLONNE DROITE (peut être la même que signin, ou simplifiée) */}
        <div className="relative hidden w-full overflow-hidden bg-slate-900 md:block md:w-1/2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a,_#020617)]" />
          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full flex-col justify-start pt-14 px-10 pb-20 text-slate-50">
            <h2 className="max-w-xl text-3xl font-bold leading-tight">
              Un compte EleveAI pour construire vos prompts dans la durée
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
