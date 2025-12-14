// app/espace-eleves/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PresetCarousel, PresetCarouselItem } from "@/components/PresetCarousel";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Check,
  ChevronRight,
  Timer,
  Smile,
  Frown,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type Classe =
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "Seconde"
  | "Première"
  | "Terminale"
  | "";

type Confiance = "en_difficulte" | "moyen" | "a_l_aise";

type TypeAide =
  | "manipuler_pour_comprendre"
  | "comprendre_le_cours"
  | "reviser_un_chapitre"
  | "preparer_un_controle"
  | "faire_des_exercices"
  | "methode_de_travail"
  | "defis";

type DysType =
  | "dyslexie"
  | "dyspraxie"
  | "dyscalculie"
  | "dysorthographie"
  | "autre";

type PromptEleve = {
  prenom: string;
  classe: Classe;
  matiere: string;
  chapitre: string;
  typeAide: TypeAide | "";
  confiance: Confiance;
  tempsDispo: string; // ex: "20 min"
  objectifPerso: string;
  exemplesDifficiles: string;
  prefereQuestions: boolean;
  prefereExemplesConcrets: boolean;
  adaptationDYS: boolean;
  dysTypes: DysType[];
  dysPrecisionAutre?: string;
};

/* ----------------------------------------
   LISTES
---------------------------------------- */

const CLASSES: Classe[] = [
  "6e",
  "5e",
  "4e",
  "3e",
  "Seconde",
  "Première",
  "Terminale",
];

const MATIERES = [
  "Mathématiques",
  "Français",
  "Physique-Chimie",
  "SVT",
  "Histoire-Géographie",
  "SES",
  "Langues",
  "Numérique/NSI",
  "Autre",
];

const TYPE_AIDE_CARDS: {
  value: TypeAide;
  label: string;
  desc: string;
  emoji: string;
}[] = [
  {
    value: "manipuler_pour_comprendre",
    label: "Manipuler",
    desc: "Exemples concrets + étapes",
    emoji: "🧩",
  },
  {
    value: "comprendre_le_cours",
    label: "Comprendre",
    desc: "Explication simple + mini test",
    emoji: "💡",
  },
  {
    value: "reviser_un_chapitre",
    label: "Réviser",
    desc: "Résumé + exercices",
    emoji: "📌",
  },
  {
    value: "preparer_un_controle",
    label: "Contrôle",
    desc: "Entraînement + méthodes",
    emoji: "🎯",
  },
  {
    value: "faire_des_exercices",
    label: "Exercices",
    desc: "Série progressive",
    emoji: "✍️",
  },
  {
    value: "methode_de_travail",
    label: "Méthode",
    desc: "Organisation + astuces",
    emoji: "🗓️",
  },
  {
    value: "defis",
    label: "Défis",
    desc: "Petits challenges",
    emoji: "⚡",
  },
];

const TIME_CHIPS = ["10 min", "20 min", "30 min", "45 min", "60 min"] as const;

const CONFIANCE_CHIPS: {
  value: Confiance;
  label: string;
  icon: React.ReactNode;
  hint: string;
}[] = [
  {
    value: "en_difficulte",
    label: "J’ai du mal",
    icon: <Frown className="w-4 h-4" />,
    hint: "On va y aller pas à pas.",
  },
  {
    value: "moyen",
    label: "Ça va",
    icon: <Smile className="w-4 h-4" />,
    hint: "On corrige les erreurs.",
  },
  {
    value: "a_l_aise",
    label: "Je suis à l’aise",
    icon: <Star className="w-4 h-4" />,
    hint: "On vérifie et on approfondit.",
  },
];

/* ----------------------------------------
   PRESETS (intégrés ici)
   👉 si tu crées data/elevesPresets.ts, remplace juste ce bloc + PRESET_ITEMS
---------------------------------------- */

type PresetKey =
  | "6e_maths_calculs_base"
  | "6e_maths_fractions_debut"
  | "5e_maths_fractions_controle"
  | "4e_fr_orthographe"
  | "3e_maths_brevet_revision"
  | "3e_langues_oral"
  | "seconde_methodo"
  | "terminale_maths_fonctions";

const PRESETS: Record<
  PresetKey,
  {
    label: string;
    description: string;
    badges?: string[];
    valeurs: Partial<PromptEleve>;
  }
> = {
  "6e_maths_calculs_base": {
    label: "🧩 6e – Calculs de base",
    description: "Additions / soustractions / multiplications, pas à pas.",
    badges: ["6e", "Maths", "Bases"],
    valeurs: {
      classe: "6e",
      matiere: "Mathématiques",
      chapitre: "Calculs de base (priorités simples, opérations)",
      typeAide: "manipuler_pour_comprendre",
      confiance: "en_difficulte",
      tempsDispo: "20 min",
      objectifPerso: "Je veux être plus rapide et faire moins d’erreurs.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "6e_maths_fractions_debut": {
    label: "🍕 6e – Fractions (démarrage)",
    description: "Comprendre 1/2, 3/4… avec dessins et exemples.",
    badges: ["6e", "Maths", "Fractions"],
    valeurs: {
      classe: "6e",
      matiere: "Mathématiques",
      chapitre: "Fractions : sens, représentation, comparaison simple",
      typeAide: "comprendre_le_cours",
      confiance: "moyen",
      tempsDispo: "25 min",
      objectifPerso: "Je veux comprendre les fractions avec des exemples faciles.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "5e_maths_fractions_controle": {
    label: "🟣 5e – Contrôle fractions",
    description: "Réviser : addition/soustraction/simplification.",
    badges: ["5e", "Maths", "Contrôle"],
    valeurs: {
      classe: "5e",
      matiere: "Mathématiques",
      chapitre: "Fractions : addition, soustraction, simplification",
      typeAide: "preparer_un_controle",
      confiance: "en_difficulte",
      tempsDispo: "30 min",
      objectifPerso: "Je veux réussir mon contrôle sans paniquer.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "4e_fr_orthographe": {
    label: "✍️ 4e – Orthographe",
    description: "Accords + astuces + entraînement progressif.",
    badges: ["4e", "Français", "Exercices"],
    valeurs: {
      classe: "4e",
      matiere: "Français",
      chapitre: "Orthographe : accords, conjugaison, homophones",
      typeAide: "faire_des_exercices",
      confiance: "en_difficulte",
      tempsDispo: "20 min",
      objectifPerso: "Je veux faire moins de fautes dans mes textes.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "3e_maths_brevet_revision": {
    label: "🎯 3e – Révisions brevet maths",
    description: "Révision globale + mini test pour repérer tes points faibles.",
    badges: ["3e", "Maths", "Brevet"],
    valeurs: {
      classe: "3e",
      matiere: "Mathématiques",
      chapitre: "Brevet : calcul, géométrie, fonctions, probabilités",
      typeAide: "reviser_un_chapitre",
      confiance: "moyen",
      tempsDispo: "45 min",
      objectifPerso: "Je veux savoir ce que je dois revoir en priorité.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "3e_langues_oral": {
    label: "🎤 3e – Anglais oral",
    description: "S’entraîner à parler, phrases simples + corrections.",
    badges: ["3e", "Langues", "Oral"],
    valeurs: {
      classe: "3e",
      matiere: "Langues",
      chapitre: "Oral : se présenter, parler de ses goûts",
      typeAide: "faire_des_exercices",
      confiance: "moyen",
      tempsDispo: "15 min",
      objectifPerso: "Je veux oser parler en anglais.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  "seconde_methodo": {
    label: "📘 Seconde – Méthode de travail",
    description: "Organisation, révisions, apprendre efficacement.",
    badges: ["Seconde", "Méthode"],
    valeurs: {
      classe: "Seconde",
      matiere: "Autre",
      chapitre: "Méthode : s’organiser, réviser, mémoriser",
      typeAide: "methode_de_travail",
      confiance: "moyen",
      tempsDispo: "20 min",
      objectifPerso: "Je veux arrêter de tout faire au dernier moment.",
      prefereQuestions: false,
      prefereExemplesConcrets: true,
    },
  },
  "terminale_maths_fonctions": {
    label: "📈 Terminale – Fonctions",
    description: "Méthodes bac : variations, dérivée, lecture graphique.",
    badges: ["Terminale", "Maths", "Bac"],
    valeurs: {
      classe: "Terminale",
      matiere: "Mathématiques",
      chapitre: "Étude de fonctions : dérivation, variations, limites simples",
      typeAide: "reviser_un_chapitre",
      confiance: "moyen",
      tempsDispo: "40 min",
      objectifPerso: "Je veux réussir les exos type bac sur les fonctions.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
};

const PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PRESETS) as [PresetKey, (typeof PRESETS)[PresetKey]][]
).map(([key, p]) => ({
  id: key,
  label: p.label,
  description: p.description,
  badge: "Modèle élève",
  badges: p.badges ?? [],
}));

/* ----------------------------------------
   HELPERS
---------------------------------------- */

function typeAideLabel(t: TypeAide | "") {
  const it = TYPE_AIDE_CARDS.find((x) => x.value === t);
  return it ? `${it.emoji} ${it.label}` : "Aide libre";
}

function descriptionConfiance(c: Confiance) {
  switch (c) {
    case "en_difficulte":
      return "Je me sens en difficulté : j’ai besoin d’explications simples, pas à pas.";
    case "moyen":
      return "Je comprends certaines choses mais je fais encore des erreurs.";
    case "a_l_aise":
      return "Je suis plutôt à l’aise : je veux vérifier et aller un peu plus loin.";
  }
}

function isStep1Ok(form: PromptEleve) {
  return !!(form.classe && form.matiere && form.typeAide && form.chapitre.trim());
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ElevePage() {
  const router = useRouter();
  const supabase = createClient();

  const makeInitialForm = (): PromptEleve => ({
    prenom: "",
    classe: "",
    matiere: "",
    chapitre: "",
    typeAide: "",
    confiance: "moyen",
    tempsDispo: "",
    objectifPerso: "",
    exemplesDifficiles: "",
    prefereQuestions: true,
    prefereExemplesConcrets: true,
    adaptationDYS: false,
    dysTypes: [],
    dysPrecisionAutre: "",
  });

  const [form, setForm] = useState<PromptEleve>(makeInitialForm());

  // ✅ UI progressive (étapes)
  const [showAdvanced, setShowAdvanced] = useState(false);

  // sortie
  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  // saving
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function handleChange<K extends keyof PromptEleve>(field: K, value: PromptEleve[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: PresetKey) {
    const preset = PRESETS[key];
    setForm((prev) => ({ ...prev, ...preset.valeurs }));
    setShowAdvanced(true); // avec un preset, on affiche souvent l’étape 2
    setPromptFinal("");
    setCopied(false);
    setSaveMessage(null);
  }

  function resetAll() {
    setForm(makeInitialForm());
    setShowAdvanced(false);
    setPromptFinal("");
    setCopied(false);
    setSaveMessage(null);
  }

  /* ----------------------------------------
     SUGGESTIONS (plus simples)
  ---------------------------------------- */

  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.matiere) s.push("Choisis la matière.");
    if (!form.classe) s.push("Indique ta classe.");
    if (!form.typeAide) s.push("Choisis ce que tu veux faire.");
    if (!form.chapitre.trim()) s.push("Écris le chapitre (fractions, Thalès…).");

    if (showAdvanced) {
      if (form.objectifPerso.trim().length < 10) s.push("Ajoute ton objectif (1 phrase).");
      if (!form.exemplesDifficiles.trim()) s.push("Ajoute un exemple qui te pose problème.");
    }

    if (s.length === 0) s.push("Parfait ✅ Tu peux générer ton prompt.");
    return s;
  }, [form, showAdvanced]);

  /* ----------------------------------------
     GENERER PROMPT (anti-triche + calibrage)
  ---------------------------------------- */

  function genererPromptFinal(mode: "rapide" | "complet" = "complet") {
    // Step1 minimum
    if (!form.classe || !form.matiere || !form.typeAide || !form.chapitre.trim()) {
      alert("Remplis au minimum : classe, matière, chapitre, et ce que tu veux faire.");
      return;
    }

    const prenom = form.prenom.trim() || "un élève";
    const chapitre = form.chapitre.trim();
    const temps = form.tempsDispo?.trim() || "non précisé";

    // si rapide, on tolère objectif/exemples vides
    const objectif =
      (mode === "complet" ? form.objectifPerso.trim() : "") ||
      "mieux comprendre ce chapitre et réussir les exercices importants.";

    const exemples =
      mode === "complet" ? form.exemplesDifficiles.trim() : "";

    const blocPrefs =
      `Mes préférences :\n` +
      (form.prefereQuestions
        ? "- Pose-moi d’abord 2 à 4 questions pour voir ce que je sais.\n"
        : "- Tu peux expliquer directement, mais vérifie que je comprends.\n") +
      (form.prefereExemplesConcrets
        ? "- Utilise des exemples concrets avant la règle.\n"
        : "- Tu peux aller à l’essentiel.\n");

    const blocAntiTriche =
      "\nIMPORTANT (anti-triche) :\n" +
      "- Ne fais pas l’exercice à ma place.\n" +
      "- Demande-moi d’essayer, puis corrige étape par étape.\n" +
      "- À la fin, fais une mini vérification (2–3 questions).\n";

    const blocDYS = form.adaptationDYS
      ? (() => {
          const lignes: string[] = [];
          lignes.push("Je peux avoir des difficultés de type DYS. Merci d’adapter :");
          lignes.push("- phrases courtes et claires,");
          lignes.push("- explications pas à pas,");
          lignes.push("- vocabulaire expliqué,");
          lignes.push("- exemples simples avant la théorie.");

          if (form.dysTypes.includes("dyslexie"))
            lignes.push("- Dyslexie : éviter les gros blocs, mettre en évidence les mots importants.");
          if (form.dysTypes.includes("dyspraxie"))
            lignes.push("- Dyspraxie : étapes numérotées, consignes très claires.");
          if (form.dysTypes.includes("dyscalculie"))
            lignes.push("- Dyscalculie : détailler les calculs + verbaliser.");
          if (form.dysTypes.includes("dysorthographie"))
            lignes.push("- Dysorthographie : aider à structurer les phrases, pas de jugement sur les fautes.");
          if (form.dysTypes.includes("autre") && form.dysPrecisionAutre?.trim())
            lignes.push(`- Autre : ${form.dysPrecisionAutre.trim()}.`);

          return "\n" + lignes.join("\n") + "\n";
        })()
      : "";

    const prompt =
      `Tu es un professeur bienveillant de ${form.matiere}.\n` +
      `Tu t’adresses à un élève de ${form.classe}.\n\n` +
      `Je suis ${prenom}.\n` +
      `Je veux travailler : ${chapitre}.\n` +
      `Ce que je veux faire : ${typeAideLabel(form.typeAide)}.\n` +
      `Mon niveau : ${descriptionConfiance(form.confiance)}\n` +
      `Temps disponible : ${temps}\n\n` +
      `Mon objectif : ${objectif}\n\n` +
      blocPrefs +
      (exemples ? `\nExemples qui me posent problème :\n${exemples}\n` : "") +
      blocDYS +
      blocAntiTriche;

    setPromptFinal(prompt);
    setCopied(false);
    setSaveMessage(null);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  }

  /* ----------------------------------------
     ENREGISTRER PRESET (Supabase)
  ---------------------------------------- */

  async function enregistrerPreset() {
    if (!promptFinal) {
      alert("Génère d’abord ton prompt, puis tu pourras l’enregistrer comme preset.");
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    let user = null;

    try {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) console.error("Erreur getUser Supabase :", userError);
      user = data?.user ?? null;
    } catch (err: any) {
      if (err?.name === "AuthSessionMissingError" || err?.message?.includes("Auth session missing")) {
        user = null;
      } else {
        console.error("Erreur inattendue Supabase :", err);
      }
    }

    if (!user) {
      setSaving(false);
      router.push("/auth/signin?redirect=/espace-eleves");
      return;
    }

    const titreParDefaut =
      form.chapitre.trim() ||
      `${form.matiere || "Matière"} – ${form.typeAide ? typeAideLabel(form.typeAide) : "Aide"}`;

    const titre = window.prompt("Titre de ton preset (pour le retrouver facilement) :", titreParDefaut);

    if (!titre) {
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("presets_eleves").insert({
      user_id: user.id,
      titre: titre.trim(),
      contexte: "espace-eleves",
      contenu: promptFinal,
      form_data: form,
    });

    if (error) {
      console.error(error);
      setSaveMessage("Erreur pendant l’enregistrement du preset.");
    } else {
      setSaveMessage("✅ Preset enregistré dans ton espace !");
    }

    setSaving(false);
    setTimeout(() => setSaveMessage(null), 4000);
  }

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            🎒 Espace élève – Crée ton prompt d’aide
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Ton coach IA pour apprendre (sans tricher)
          </h1>

          <p className="text-sm text-gray-700 max-w-2xl">
            Choisis un modèle ou remplis 4 infos rapides. Tu obtiens un prompt clair
            pour comprendre, réviser ou préparer un contrôle. Ensuite, tu peux améliorer avec des options.
          </p>
        </header>

        {/* PRESETS */}
        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Clique sur un modèle : tu peux ensuite adapter tous les champs."
          items={PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as PresetKey)}
          tone="emerald"
          searchPlaceholder="Rechercher un modèle… (fractions, brevet, oral, méthode)"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-md font-bold text-[#0047B6]">1️⃣ En 30 secondes</h2>
                <p className="text-xs text-slate-600 mt-1">
                  Remplis juste ça pour générer une aide rapide.
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
                title="Tout remettre à zéro"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Prénom / classe / matière */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Prénom (facultatif)</label>
                <input
                  type="text"
                  value={form.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : Lina"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Classe</label>
                <select
                  value={form.classe}
                  onChange={(e) => handleChange("classe", e.target.value as Classe)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Matière</label>
                <select
                  value={form.matiere}
                  onChange={(e) => handleChange("matiere", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chapitre */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">Chapitre / thème</label>
              <input
                type="text"
                value={form.chapitre}
                onChange={(e) => handleChange("chapitre", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Ex : fractions, Thalès, rédaction…"
              />
            </div>

            {/* Type d’aide en cartes (plus engageant) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold">Ce que tu veux faire</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {TYPE_AIDE_CARDS.map((t) => {
                  const active = form.typeAide === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => handleChange("typeAide", t.value)}
                      className={`text-left rounded-xl border px-3 py-2 transition ${
                        active
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {t.emoji} {t.label}
                        </span>
                        {active && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Temps chips + confiance chips */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Temps dispo (facultatif)
                </label>

                <div className="flex flex-wrap gap-2">
                  {TIME_CHIPS.map((t) => {
                    const active = form.tempsDispo === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleChange("tempsDispo", t)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition ${
                          active
                            ? "border-emerald-500 bg-emerald-100 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                  <input
                    type="text"
                    value={form.tempsDispo}
                    onChange={(e) => handleChange("tempsDispo", e.target.value)}
                    className="min-w-[120px] flex-1 border rounded-lg px-3 py-2 text-sm"
                    placeholder="Ou écris…"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold">Comment tu te sens ?</label>
                <div className="grid gap-2">
                  {CONFIANCE_CHIPS.map((c) => {
                    const active = form.confiance === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => handleChange("confiance", c.value)}
                        className={`text-left rounded-xl border px-3 py-2 transition ${
                          active
                            ? "border-emerald-500 bg-emerald-50 shadow-sm"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                            {c.icon} {c.label}
                          </span>
                          {active && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">{c.hint}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA rapide + toggle avancé */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {showAdvanced ? "Masquer les options" : "Options (objectif, exemple, DYS…)"}
                <ChevronRight className={`w-4 h-4 transition ${showAdvanced ? "rotate-90" : ""}`} />
              </button>

              <button
                type="button"
                disabled={!isStep1Ok(form)}
                onClick={() => genererPromptFinal(showAdvanced ? "complet" : "rapide")}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow transition ${
                  isStep1Ok(form)
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {showAdvanced ? "Générer mon prompt" : "Générer une aide rapide"}
              </button>
            </div>

            {/* ADVANCED */}
            {showAdvanced && (
              <div className="mt-3 space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                <h3 className="text-sm font-extrabold text-emerald-800">
                  2️⃣ Options pour améliorer l’aide
                </h3>

                {/* Objectif */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Ton objectif (avec tes mots)</label>
                  <textarea
                    value={form.objectifPerso}
                    onChange={(e) => handleChange("objectifPerso", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                    placeholder="Ex : Je veux comprendre comment poser une équation."
                  />
                </div>

                {/* Exemples */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Un exemple qui te pose problème</label>
                  <textarea
                    value={form.exemplesDifficiles}
                    onChange={(e) => handleChange("exemplesDifficiles", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                    placeholder="Ex : Je n’arrive pas à additionner 3/4 + 1/6."
                  />
                </div>

                {/* Préférences */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.prefereQuestions}
                      onChange={(e) => handleChange("prefereQuestions", e.target.checked)}
                      className="rounded border-gray-400"
                    />
                    Pose-moi des questions d’abord
                  </label>

                  <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.prefereExemplesConcrets}
                      onChange={(e) => handleChange("prefereExemplesConcrets", e.target.checked)}
                      className="rounded border-gray-400"
                    />
                    Je veux des exemples concrets
                  </label>
                </div>

                {/* DYS */}
                <div className="space-y-2 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.adaptationDYS}
                      onChange={(e) => handleChange("adaptationDYS", e.target.checked)}
                      className="rounded border-gray-400"
                    />
                    Aide adaptée (DYS)
                  </label>

                  {form.adaptationDYS && (
                    <div className="ml-3 space-y-2 border-l pl-3 border-emerald-200">
                      <p className="text-[11px] text-slate-600">Tu peux préciser (facultatif) :</p>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {[
                          { value: "dyslexie", label: "Dyslexie" },
                          { value: "dyspraxie", label: "Dyspraxie" },
                          { value: "dyscalculie", label: "Dyscalculie" },
                          { value: "dysorthographie", label: "Dysorthographie" },
                          { value: "autre", label: "Autre" },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-emerald-200 bg-white"
                          >
                            <input
                              type="checkbox"
                              checked={form.dysTypes.includes(opt.value as DysType)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                handleChange(
                                  "dysTypes",
                                  checked
                                    ? [...form.dysTypes, opt.value as DysType]
                                    : form.dysTypes.filter((t) => t !== opt.value),
                                );
                              }}
                              className="h-3 w-3"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>

                      {form.dysTypes.includes("autre") && (
                        <input
                          type="text"
                          value={form.dysPrecisionAutre}
                          onChange={(e) => handleChange("dysPrecisionAutre", e.target.value)}
                          className="w-full border rounded-lg px-2 py-2 text-sm bg-white"
                          placeholder="Précision facultative…"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Regénérer */}
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => genererPromptFinal("complet")}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <Sparkles className="w-4 h-4" />
                    Générer (version complète)
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            {/* Conseils */}
            <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-lg font-bold text-emerald-700">
                3️⃣ Conseils (rapides)
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-600">➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prompt final */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  4️⃣ Ton prompt
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copierPrompt}
                    disabled={!promptFinal}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      promptFinal
                        ? "bg-slate-800 text-white hover:bg-slate-900"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied ? "Copié" : "Copier"}
                  </button>

                  <button
                    onClick={enregistrerPreset}
                    disabled={!promptFinal || saving}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      promptFinal
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                    }`}
                  >
                    {saving ? "💾 Enregistrement..." : "⭐ Enregistrer"}
                  </button>
                </div>
              </div>

              {saveMessage && (
                <p className="text-xs text-emerald-700">{saveMessage}</p>
              )}

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-slate-50 min-h-[220px]"
                placeholder="Ton prompt apparaîtra ici après génération."
              />

              <p className="text-xs text-gray-700">
                Tu peux coller ce prompt dans l’IA de ton choix :
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  href={promptFinal ? `/tchat?prompt=${encodeURIComponent(promptFinal)}` : "/tchat"}
                  className={`px-3 py-2 rounded-lg font-semibold transition ${
                    promptFinal
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                  }`}
                >
                  🚀 Utiliser EleveAI
                </Link>

                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900"
                >
                  ChatGPT
                </a>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold hover:opacity-95"
                >
                  Gemini
                </a>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold hover:opacity-95"
                >
                  Claude
                </a>
                <a
                  href="https://chat.mistral.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold hover:opacity-95"
                >
                  Mistral
                </a>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                ✅ Astuce : si l’IA te donne directement la réponse, dis :
                <span className="font-semibold"> “Pose-moi des questions d’abord, puis corrige.”</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
