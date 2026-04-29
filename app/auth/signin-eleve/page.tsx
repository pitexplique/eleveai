"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap } from "lucide-react";
import { useEleve } from "@/context/EleveContext";

export default function SignInElevePage() {
  const router = useRouter();
  const { login } = useEleve();
  const supabase = createClient();

  const [codeEtablissement, setCodeEtablissement] = useState("");
  const [codeEleve, setCodeEleve] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);


  const normalizeCode = (v: string) => v.trim().toUpperCase();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setFeedback(null);

    const ce = normalizeCode(codeEtablissement);
    const code = normalizeCode(codeEleve);
    const mdp = motDePasse.trim();

    if (!ce || !code || !mdp) {
      setErrorMsg("Remplis les trois champs.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("acces_etablissement")
        .select(
          "id, code_etablissement, code_utilisateur, mot_de_passe, type_utilisateur, nom, actif"
        )
        .eq("code_etablissement", ce)
        .eq("code_utilisateur", code)
        .eq("type_utilisateur", "eleve")
        .eq("actif", true)
        .maybeSingle();

      if (error) {
        console.error(error);
        setErrorMsg("Erreur de connexion. Réessaie.");
        return;
      }

      if (!data) {
        setErrorMsg("Code établissement ou code élève incorrect.");
        return;
      }

      if (data.mot_de_passe !== mdp) {
        setErrorMsg("Mot de passe incorrect.");
        return;
      }

      login({
        acces_id: data.id,
        code_etablissement: data.code_etablissement,
        code_eleve: data.code_utilisateur,
        nom: data.nom,
        type_utilisateur: data.type_utilisateur,
      });

setFeedback("Connexion réussie. Redirection…");
router.push("/parcours");

      setFeedback("Connexion réussie. Redirection…");
      router.push("/parcours");
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur inattendue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
   <main className="relative min-h-screen bg-slate-900 text-slate-900 overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl md:grid-cols-[1fr_1.05fr]">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <div className="text-2xl font-black">
                  Eleve<span className="text-emerald-600">AI</span>
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  Connexion élève
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              🚀 Prêt à progresser ?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Entre tes codes et commence ta mission 💪
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-black text-slate-700">
                  Code établissement
                </label>
                <input
                  value={codeEtablissement}
                  onChange={(e) => setCodeEtablissement(e.target.value)}
                  placeholder="Ex : DIMITILE"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base font-bold uppercase outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-black text-slate-700">
                  Code élève
                </label>
                <input
                  value={codeEleve}
                  onChange={(e) => setCodeEleve(e.target.value)}
                  placeholder="Ex : 6C01"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base font-bold uppercase outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-black text-slate-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="Ex : coco banane"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 text-lg font-black text-slate-950 shadow-lg transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? "Connexion…" : "Entrer dans mon parcours"}
              </button>

              {errorMsg && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {errorMsg}
                </p>
              )}

              {feedback && (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  {feedback}
                </p>
              )}
            </form>
          </div>

          <div className="hidden bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 p-10 text-white md:flex md:flex-col md:justify-center">
            <div className="rounded-[2rem] bg-white/15 p-6 backdrop-blur">
              <div className="text-sm font-black uppercase tracking-widest text-white/80">
                Ton espace de progression
              </div>

              <h2 className="mt-4 text-4xl font-black leading-tight">
                Calcul rapide, Coach Maths et Parcours.
              </h2>

              <p className="mt-5 text-base leading-7 text-white/90">
                Entraîne-toi, progresse et garde une trace de tes réussites.
              </p>

              <div className="mt-8 grid gap-3 text-sm font-bold">
                <div className="rounded-2xl bg-white/15 px-4 py-3">
                  ⚡ Calcul rapide
                </div>
                <div className="rounded-2xl bg-white/15 px-4 py-3">
                  🧠 Coach Maths IA
                </div>
                <div className="rounded-2xl bg-white/15 px-4 py-3">
                  ⭐ Parcours et compétences
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}