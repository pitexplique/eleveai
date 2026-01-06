// app/espace-parents/EspaceParentsClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState, useCallback, useEffect } from "react";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";
import { createClient } from "@/lib/supabase/client";
import { CLASSES, MATIERES } from "@/lib/constants/scolaire";

/* ----------------------------------------
   TYPES POUR LES ÉTATS
---------------------------------------- */

type Maitrise = "besoin" | "satisfaisant" | "expert";

type ParentsPresetValues = {
  classe?: string;
  matiere?: string;
  objectif?: string;
  maitrise?: Maitrise;
  hasDys?: boolean;
  dysTypes?: string[];
  hyperactif?: boolean;
};

type PresetKey =
  | "primaire_bases_maths"
  | "primaire_lecture_francais"
  | "college_controle_fractions"
  | "college_devoirs_maison_encadrement"
  | "lycee_methodes_travail"
  | "lycee_preparation_bac_maths"
  | "lycee_stress_examens"
  | "dys_hyperactif_college";

/* ----------------------------------------
   PRESETS (MODÈLES RAPIDES)
---------------------------------------- */

const PRESETS: Record<
  PresetKey,
  { label: string; description: string; valeurs: ParentsPresetValues }
> = {
  primaire_bases_maths: {
    label: "🟢 Primaire – Reprendre les bases en maths",
    description:
      "Pour un enfant qui manque de confiance sur les opérations et les problèmes simples.",
    valeurs: {
      classe: "CM2",
      matiere: "maths",
      objectif:
        "Lui redonner confiance sur les bases en calcul (additions, soustractions, multiplications, problèmes simples) sans le décourager.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
    },
  },

  primaire_lecture_francais: {
    label: "📖 Primaire – Lecture et français",
    description:
      "Pour un enfant qui lit lentement et a besoin d’un accompagnement rassurant en lecture / écriture.",
    valeurs: {
      classe: "CM2",
      matiere: "français",
      objectif:
        "L’aider à lire plus régulièrement, comprendre les textes simples et écrire des phrases correctes sans le mettre en échec.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
    },
  },

  college_controle_fractions: {
    label: "🟣 Collège – Préparer un contrôle de fractions",
    description:
      "Pour un élève de 5e/4e qui stresse à l’idée d’un contrôle en maths.",
    valeurs: {
      classe: "5e",
      matiere: "maths",
      objectif:
        "L’aider à préparer un contrôle sur les fractions (simplifier, additionner, comparer) en le guidant pas à pas.",
      maitrise: "besoin",
      hasDys: false,
      hyperactif: false,
    },
  },

  college_devoirs_maison_encadrement: {
    label: "📝 Collège – Mieux gérer les devoirs",
    description:
      "Pour un élève qui se laisse vite déborder par les devoirs maison et ne sait pas par où commencer.",
    valeurs: {
      classe: "collège",
      matiere: "toutes les matières",
      objectif:
        "L’aider à organiser ses devoirs, découper les tâches en petites étapes et garder une attitude positive face au travail personnel.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
    },
  },

  lycee_methodes_travail: {
    label: "📘 Lycée – Méthode de travail",
    description:
      "Pour un élève qui a besoin d’une méthode pour s’organiser et réviser plus efficacement.",
    valeurs: {
      classe: "lycée",
      matiere: "toutes les matières",
      objectif:
        "L’aider à trouver une méthode de travail simple pour s’organiser, réviser régulièrement et préparer ses évaluations sans être débordé.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
    },
  },

  lycee_preparation_bac_maths: {
    label: "📊 Lycée – Préparation bac (maths)",
    description:
      "Pour un élève de Première / Terminale qui veut se préparer sereinement aux épreuves de maths.",
    valeurs: {
      classe: "Tle",
      matiere: "maths",
      objectif:
        "L’aider à revoir les chapitres importants pour le bac, identifier ses points faibles et s’entraîner avec des exercices progressifs.",
      maitrise: "expert",
      hasDys: false,
      hyperactif: false,
    },
  },

  lycee_stress_examens: {
    label: "💬 Lycée – Stress et examens",
    description:
      "Pour un élève qui se bloque à cause du stress avant les contrôles et examens.",
    valeurs: {
      classe: "lycée",
      matiere: "toutes les matières",
      objectif:
        "L’aider à gérer son stress avant les contrôles et examens, avec des conseils concrets, des routines courtes et des encouragements.",
      maitrise: "satisfaisant",
      hasDys: false,
      hyperactif: false,
    },
  },

  dys_hyperactif_college: {
    label: "🧩 Collège – Profil DYS + hyperactif",
    description:
      "Pour un élève avec profil DYS et/ou TDAH qui a besoin d’un accompagnement très guidé et rassurant.",
    valeurs: {
      classe: "collège",
      matiere: "toutes les matières",
      objectif:
        "L’aider à reprendre confiance, à comprendre les consignes et à travailler avec des activités courtes, guidées et adaptées à son profil DYS / hyperactif.",
      maitrise: "besoin",
      hasDys: true,
      dysTypes: ["Dyslexie", "Dysorthographie"],
      hyperactif: true,
    },
  },
};

/* ----------------------------------------
   ITEMS POUR LE CARROUSEL
---------------------------------------- */

const PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PRESETS) as [PresetKey, (typeof PRESETS)[PresetKey]][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Modèle parent",
}));

/* ----------------------------------------
   UI HELPERS
---------------------------------------- */

function FieldLabel({
  title,
  hint,
  required,
}: {
  title: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-semibold text-slate-700">
        {title}
        {required ? <span className="ml-1 text-rose-600">*</span> : null}
      </p>
      {hint ? (
        <p className="text-[11px] text-slate-500 leading-tight">{hint}</p>
      ) : null}
    </div>
  );
}

function Tag({
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "dark" | "green" | "purple" | "orange";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition border";
  const styles: Record<typeof variant, string> = {
    default: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
    dark: "bg-slate-900 text-white border-slate-900 hover:bg-slate-800",
    green: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
    purple: "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700",
    orange: "bg-orange-500 text-white border-orange-500 hover:bg-orange-600",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        styles[variant],
        disabled ? "opacity-50 cursor-not-allowed hover:bg-inherit" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function CollerDansTags({
  prompt,
  onCopy,
}: {
  prompt: string;
  onCopy: () => Promise<void>;
}) {
  const encoded = useMemo(() => encodeURIComponent(prompt || ""), [prompt]);
  const disabled = !prompt;

  async function openEleveAI() {
    if (!prompt) return;
    await onCopy();
    window.open("/tchat", "_blank");
  }

  function openChatGPT() {
    if (!prompt) return;
    window.open(`https://chat.openai.com/?q=${encoded}`, "_blank");
  }

  function openMistral() {
    if (!prompt) return;
    window.open("https://chat.mistral.ai/", "_blank");
  }

  function openGemini() {
    if (!prompt) return;
    window.open(`https://gemini.google.com/app?q=${encoded}`, "_blank");
  }

  function openClaude() {
    if (!prompt) return;
    window.open("https://claude.ai/new", "_blank");
  }

    function openPerplexity() {
    if (!prompt) return;
    window.open("https://www.perplexity.ia", "_blank");
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-700">Coller dans :</p>
      <div className="flex flex-wrap gap-2">
        <Tag
          label="⬛ ChatGPT"
          onClick={openChatGPT}
          disabled={disabled}
          variant="dark"
        />
        <Tag
          label="🟩 Perplexity"
          onClick={openPerplexity}
          disabled={disabled}
          variant="green"
        />
        <Tag
          label="🚀 Tchat EleveAI"
          onClick={openEleveAI}
          disabled={disabled}
          variant="green"
        />        

      </div>
      <p className="text-[11px] text-slate-500">
        Astuce : clique sur “🚀 Tchat EleveAI” → le prompt est copié et /tchat
        s’ouvre dans un nouvel onglet.
      </p>
    </div>
  );
}

/* ----------------------------------------
   PAGE PARENTS
---------------------------------------- */

export default function EspaceParentsClient() {
  const supabase = useMemo(() => createClient(), []);

  // ✅ Auth state (pour afficher le bloc connexion)
  const [authLoading, setAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isLoggedIn = !!userEmail;

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUserEmail(data.user?.email ?? null);
      setAuthLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("collège");
  const [matiere, setMatiere] = useState("maths");
  const [objectif, setObjectif] = useState(
    "Lui redonner confiance et l’aider à comprendre le cours sur : les fractions et la cuisine",
  );

  // Zone "Vous qui connaissez votre enfant"
  const [maitrise, setMaitrise] = useState<Maitrise>("besoin");
  const [hasDys, setHasDys] = useState(false);
  const [dysTypes, setDysTypes] = useState<string[]>([]);
  const [hyperactif, setHyperactif] = useState(false);

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleDysType = (type: string) => {
    setDysTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const appliquerPreset = (key: PresetKey) => {
    const preset = PRESETS[key];
    const v = preset.valeurs;

    if (v.classe !== undefined) setClasse(v.classe);
    if (v.matiere !== undefined) setMatiere(v.matiere);
    if (v.objectif !== undefined) setObjectif(v.objectif);
    if (v.maitrise !== undefined) setMaitrise(v.maitrise);
    if (v.hasDys !== undefined) {
      setHasDys(v.hasDys);
      if (!v.hasDys) setDysTypes([]);
    }
    if (v.dysTypes !== undefined) setDysTypes(v.dysTypes);
    if (v.hyperactif !== undefined) setHyperactif(v.hyperactif);
  };

  const handleGenerate = useCallback(() => {
    const nomEleve = prenom.trim() || "mon enfant";

    let maitrisePhrase = "";
    if (maitrise === "besoin") {
      maitrisePhrase = `${nomEleve} a plutôt besoin d’aide en ce moment dans cette matière : certaines bases ne sont pas complètement installées et la confiance est fragile.`;
    } else if (maitrise === "satisfaisant") {
      maitrisePhrase = `${nomEleve} a un niveau globalement satisfaisant : il/elle réussit beaucoup de choses mais a besoin d’être rassuré·e et de consolider certaines notions.`;
    } else {
      maitrisePhrase = `${nomEleve} est plutôt à l’aise / expert dans cette matière et a besoin d’être stimulé·e, d’aller un peu plus loin sans perdre le plaisir d’apprendre.`;
    }

    const base = `Tu es une IA pédagogique bienveillante qui s’adresse à ${nomEleve}, élève en classe de ${classe}, en ${matiere}, dans le système scolaire français.

${maitrisePhrase}

Ta mission :
- aider ${nomEleve} à COMPRENDRE et à S’ENTRAÎNER,
- sans jamais faire les exercices à sa place,
- en respectant les programmes officiels (Eduscol / BO),
- en expliquant avec des mots simples et des exemples concrets.

Objectif principal demandé par le parent : ${objectif}`;

    let besoinsBloc = "";

    if (hasDys || hyperactif) {
      const listeDys =
        hasDys && dysTypes.length > 0
          ? `Profil DYS indiqué par le parent : ${dysTypes.join(", ")}.`
          : hasDys
          ? `Profil DYS indiqué par le parent (type non précisé).`
          : "";

      const hyperactifTexte = hyperactif
        ? `Le parent signale aussi un profil hyperactif / TDAH : prévois des activités courtes, très guidées, avec des changements réguliers de rythme.`
        : "";

      besoinsBloc = `

Prise en compte des besoins spécifiques :
- Présentation très aérée, phrases courtes.
- Tu évites les gros blocs de texte.
- Tu relis les consignes en les reformulant avec des mots simples.
- Tu fais souvent des petites pauses ("On récapitule en une phrase ?").
${listeDys ? `- ${listeDys}` : ""}${
        hyperactifTexte ? `\n- ${hyperactifTexte}` : ""
      }`;
    }

    const suite = `

Règles importantes :
- Tu poses d’abord quelques questions simples pour vérifier ce que ${nomEleve} sait déjà.
- Tu donnes ensuite une seule nouvelle difficulté à la fois.
- Quand ${nomEleve} se trompe, tu expliques calmement l’erreur et proposes un exemple similaire.
- Tu termines chaque échange par un petit récapitulatif et une question :
  "Peux-tu me réexpliquer avec tes mots ce que tu as retenu ?"
- Tu refuses de donner directement la solution complète d’un devoir maison ou d’une évaluation à venir. À la place, tu guides pas à pas.`;

    setGeneratedPrompt(base + besoinsBloc + suite);
    setCopied(false);
  }, [prenom, classe, matiere, objectif, maitrise, hasDys, dysTypes, hyperactif]);

  const handleCopy = useCallback(async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copie impossible automatiquement. Sélectionnez le texte à la main.");
    }
  }, [generatedPrompt]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50">
      <div className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* HERO */}
        <section className="mb-10 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                Espace parents · Accompagnement serein
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts parents – EleveAI
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                EleveAI est pensé pour{" "}
                <span className="font-semibold">
                  soutenir votre enfant, pas le remplacer
                </span>
                . Cette page vous aide à formuler des messages clairs et
                sécurisés pour que l’IA l’accompagne avec bienveillance et dans
                le respect de l’école.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs text-sky-900 shadow-inner">
              <p className="mb-1 font-semibold">Notre promesse :</p>
              <ul className="space-y-1">
                <li>• Respect des programmes officiels.</li>
                <li>• Pas de triche, pas de “copié-collé”.</li>
                <li>• Priorité à la confiance et à l’autonomie.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1️⃣ VOUS QUI CONNAISSEZ VOTRE ENFANT */}
        <section className="mb-8 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
          <div className="mb-4 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              Vous qui connaissez votre enfant 💛
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Décrivez brièvement son profil : l’IA adaptera la façon d’expliquer
              et le rythme.
            </p>
          </div>

          <div className="space-y-5">
            {/* Niveau de maîtrise */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-slate-700">
                Comment décririez-vous son niveau dans cette matière ?
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMaitrise("besoin")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "besoin"
                      ? "bg-rose-100 text-rose-900 ring-1 ring-rose-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  A besoin d’aide
                </button>
                <button
                  type="button"
                  onClick={() => setMaitrise("satisfaisant")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "satisfaisant"
                      ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  Satisfaisant
                </button>
                <button
                  type="button"
                  onClick={() => setMaitrise("expert")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "expert"
                      ? "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  Très à l’aise / expert
                </button>
              </div>
            </div>

            {/* Profil DYS & hyperactif */}
            <div className="grid gap-4 sm:grid-cols-[2fr,1fr]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="hasDys"
                    type="checkbox"
                    checked={hasDys}
                    onChange={(e) => setHasDys(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="hasDys"
                    className="text-xs sm:text-sm text-slate-700"
                  >
                    Profil <strong>DYS</strong>
                  </label>
                </div>

                {hasDys && (
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-slate-700 sm:text-[13px]">
                    {[
                      "Dyslexie",
                      "Dysorthographie",
                      "Dyscalculie",
                      "Dyspraxie",
                      "Dysphasie",
                      "Autre DYS",
                    ].map((type) => (
                      <label
                        key={type}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 ring-1 ring-slate-200"
                      >
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5"
                          checked={dysTypes.includes(type)}
                          onChange={() => toggleDysType(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="hyperactif"
                    type="checkbox"
                    checked={hyperactif}
                    onChange={(e) => setHyperactif(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="hyperactif"
                    className="text-xs sm:text-sm text-slate-700"
                  >
                    Profil <strong>hyperactif / TDAH</strong>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500">
                  Activités plus courtes, rythmées, très guidées.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2️⃣ PRESETS – CARROUSEL */}
        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Partir d’un exemple proche de votre situation, puis ajuster."
          items={PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as PresetKey)}
        />

        {/* 3️⃣ FORMULAIRE PRINCIPAL + GÉNÉRATION */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
          <header className="mb-6 space-y-2">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-xs font-semibold text-indigo-800">
              👨‍👩‍👧‍👦 Espace parents · Accompagnement scolaire encadré
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
              Aider votre enfant à apprendre avec l’IA (sans tricher)
            </h2>

            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Indiquez la situation de votre enfant (niveau, difficulté,
              objectif). EleveAI génère un <b>prompt clair et encadré</b> pour
              l’aider à comprendre, réviser ou s’entraîner, dans le respect du
              cadre scolaire.
            </p>

            {/* ✅ Remplace SignupNudge (pb de props) par un bloc inline robuste */}
            {!authLoading && !isLoggedIn && (
              <div className="pt-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Sauvegarder vos presets parents
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Connectez-vous pour sauvegarder vos réglages, les retrouver plus tard et accéder à votre historique.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/auth/signin"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-500/15"
                    >
                      Inscription
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel title="Prénom (facultatif)" hint="Ex : Léa, Yanis…" />
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Léa, Yanis…"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel title="Classe" required />
                <select
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {CLASSES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel title="Matière" required />
                <select
                  value={matiere}
                  onChange={(e) => setMatiere(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {MATIERES.map((m) => (
                    <option
                      key={`${m.label}-${m.value}`}
                      value={m.value}
                      disabled={!!m.disabled}
                    >
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Objectif"
                  required
                  hint="Écrivez simplement, comme à un enseignant."
                />
                <textarea
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  rows={3}
                  placeholder="Ex : réviser un contrôle, reprendre les bases, retrouver confiance…"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                Générer le prompt
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!generatedPrompt}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
              >
                {copied ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>

            {/* RESULTAT */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Prompt généré
              </h3>

              <CollerDansTags prompt={generatedPrompt} onCopy={handleCopy} />

              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full min-h-[240px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-900 shadow-inner"
                placeholder="Remplissez le formulaire puis cliquez sur « Générer le prompt »."
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
