"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useEleve } from "@/context/EleveContext";

export default function SignInElevePage() {
  const router = useRouter();
  const { login } = useEleve();
  const supabase = createClient();

  const [codeEtablissement, setCodeEtablissement] = useState("");
  const [codeEleve, setCodeEleve] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
      router.push("/dashboard-eleve");
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur inattendue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-900">
    {/* Fond SVG EleveAI */}
    <div className="absolute inset-0">
<svg
  viewBox="0 0 1200 800"
  className="h-full w-full"
  preserveAspectRatio="xMidYMid slice"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="bgMain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#020617" />
      <stop offset="48%" stopColor="#0f172a" />
      <stop offset="100%" stopColor="#312e81" />
    </linearGradient>

    <radialGradient id="greenGlow" cx="18%" cy="18%" r="55%">
      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.42" />
      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="purpleGlow" cx="82%" cy="30%" r="55%">
      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.38" />
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
    </radialGradient>

    <linearGradient id="lavaFlow" x1="50%" y1="20%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#450a0a" />
      <stop offset="35%" stopColor="#b91c1c" />
      <stop offset="68%" stopColor="#f97316" />
      <stop offset="100%" stopColor="#facc15" />
    </linearGradient>

    <radialGradient id="lavaGlow" cx="82%" cy="63%" r="52%">
      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.7" />
      <stop offset="55%" stopColor="#f97316" stopOpacity="0.22" />
      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
    </radialGradient>

    <filter id="softBlur">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>

  {/* Fond principal */}
  <rect width="1200" height="800" fill="url(#bgMain)" />
  <rect width="1200" height="800" fill="url(#greenGlow)" />
  <rect width="1200" height="800" fill="url(#purpleGlow)" />

  {/* Zone gauche plus calme pour le formulaire */}
  <rect x="0" y="0" width="520" height="800" fill="#020617" opacity="0.34" />

  {/* Montagnes Réunion */}
  <path d="M0 610 L180 445 L360 610 Z" fill="#0ea5e9" opacity="0.32" />
  <path d="M230 635 L525 395 L820 635 Z" fill="#22c55e" opacity="0.23" />
  <path d="M610 620 L900 430 L1200 620 Z" fill="#6366f1" opacity="0.28" />

  {/* Océan / vague */}
  <path
    d="M0 650 Q300 600 600 650 T1200 650 L1200 800 L0 800 Z"
    fill="#38bdf8"
    opacity="0.15"
  />
  <path
    d="M0 705 Q300 665 600 705 T1200 705 L1200 800 L0 800 Z"
    fill="#22c55e"
    opacity="0.10"
  />

  {/* Volcan sombre */}
  <path
    d="M710 610 L920 370 L1140 610 Z"
    fill="#111827"
    opacity="0.72"
  />
  <path
    d="M850 455 L920 370 L990 455 Z"
    fill="#7f1d1d"
    opacity="0.75"
  />

  {/* Glow lave */}
  <circle
    cx="960"
    cy="590"
    r="260"
    fill="url(#lavaGlow)"
    filter="url(#softBlur)"
  />

  {/* Coulée principale de lave */}
  <path
    d="M905 440
       C880 500, 760 500, 720 570
       C680 635, 770 670, 710 800
       L1200 800
       L1200 560
       C1100 610, 1020 575, 970 515
       C945 485, 925 460, 905 440 Z"
    fill="url(#lavaFlow)"
    opacity="0.92"
  />

  {/* Coulée secondaire */}
  <path
    d="M970 500
       C940 570, 860 595, 830 655
       C805 705, 850 745, 830 800
       L1110 800
       C1090 720, 1060 670, 1110 610
       C1145 565, 1050 550, 970 500 Z"
    fill="url(#lavaFlow)"
    opacity="0.58"
  />

  {/* Veines lumineuses */}
  <path
    d="M925 470 C900 535, 835 560, 805 625 C780 680, 805 730, 780 790"
    fill="none"
    stroke="#fde68a"
    strokeWidth="8"
    strokeLinecap="round"
    opacity="0.42"
  />
  <path
    d="M1000 535 C960 590, 945 655, 975 730"
    fill="none"
    stroke="#fb923c"
    strokeWidth="10"
    strokeLinecap="round"
    opacity="0.36"
  />

  {/* Braises */}
  <circle cx="910" cy="485" r="5" fill="#fed7aa" opacity="0.8" />
  <circle cx="1045" cy="580" r="6" fill="#facc15" opacity="0.68" />
  <circle cx="980" cy="660" r="4" fill="#fde68a" opacity="0.62" />
  <circle cx="1120" cy="630" r="5" fill="#fb923c" opacity="0.58" />
  <circle cx="870" cy="720" r="3" fill="#fef3c7" opacity="0.55" />

  {/* Symboles maths discrets */}
  <text x="820" y="175" fill="white" opacity="0.15" fontSize="54" fontWeight="700">
    π
  </text>
  <text x="950" y="255" fill="white" opacity="0.12" fontSize="42" fontWeight="700">
    ×
  </text>
  <text x="770" y="325" fill="white" opacity="0.12" fontSize="38" fontWeight="700">
    %
  </text>

  {/* Vignette légère */}
  <rect width="1200" height="800" fill="#000000" opacity="0.10" />
</svg>

    </div>

    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-4 py-10">
      <section className="grid w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl md:grid-cols-[1fr_1.05fr]">
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

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
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
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 font-mono text-lg font-black uppercase tracking-widest outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-black text-slate-700">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="Ex : coco banane"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 pr-12 text-base font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Cacher le mot de passe" : "Voir le mot de passe"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-500 px-5 py-4 text-lg font-black text-slate-950 shadow-lg transition hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Connexion…" : "🚀 Commencer ma mission"}
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
            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/75">
              Ton espace EleveAI
            </div>

            <h2 className="mt-4 text-4xl font-black leading-tight">
              Calcul rapide, Coach Maths et Parcours.
            </h2>

            <p className="mt-5 text-base leading-7 text-white/90">
              Entraîne-toi, progresse et garde une trace de tes réussites.
            </p>

            <div className="mt-8 grid gap-3 text-sm font-bold">
              <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3">
                ⚡ <span>Calcul rapide</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3">
                🧠 <span>Coach Maths IA</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3">
                ⭐ <span>Parcours et compétences</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
);
}