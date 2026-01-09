// app/espace-eleves/EspaceElevesClient.tsx
"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
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
  ShieldCheck,
  MessageCircle,
  Wand2,
  ArrowDown,
  Bookmark,
} from "lucide-react";

import {
  ELEVES_PRESETS,
  ElevesPresetKey,
  Confiance,
  TypeAide,
  DysType,
  PromptEleve as PromptEleveBase,
  ProfilEleve,
} from "@/data/elevesPresets";

import type { ClasseValue, MatiereValue } from "@/lib/constants/scolaire";

// ✅ constantes partagées (format { value, label })
import { CLASSES, MATIERES } from "@/lib/constants/scolaire";

export const dynamic = "force-dynamic";
export { metadata } from "./metadata";

/* ----------------------------------------
   TYPES (UI)
---------------------------------------- */

// ✅ On garde modeAntiTriche côté UI (même si tes presets ne l’ont pas)
type PromptEleve = PromptEleveBase & {
  modeAntiTriche: boolean;
};

type FeedbackChoice = "" | "ok" | "bof" | "pas_ok";

/* ----------------------------------------
   LISTES
---------------------------------------- */

const TYPE_AIDE_CARDS: {
  value: TypeAide;
  label: string;
  desc: string;
  emoji: string;
}[] = [
  { value: "manipuler_pour_comprendre", label: "Manipuler", desc: "Exemples concrets + étapes", emoji: "🧩" },
  { value: "comprendre_le_cours", label: "Comprendre", desc: "Explication simple + mini test", emoji: "💡" },
  { value: "reviser_un_chapitre", label: "Réviser", desc: "Résumé + exercices", emoji: "📌" },
  { value: "preparer_un_controle", label: "Contrôle", desc: "Entraînement + méthodes", emoji: "🎯" },
  { value: "faire_des_exercices", label: "Exercices", desc: "Série progressive", emoji: "✍️" },
  { value: "methode_de_travail", label: "Méthode", desc: "Organisation + astuces", emoji: "🗓️" },
  { value: "defis", label: "Défis", desc: "Petits challenges", emoji: "⚡" },
];

const TIME_CHIPS = ["10 min", "20 min", "30 min", "45 min", "60 min"] as const;

const CONFIANCE_CHIPS: {
  value: Confiance;
  label: string;
  icon: React.ReactNode;
  hint: string;
}[] = [
  { value: "en_difficulte", label: "J’ai du mal", icon: <Frown className="w-4 h-4" />, hint: "On va y aller pas à pas." },
  { value: "moyen", label: "Ça va", icon: <Smile className="w-4 h-4" />, hint: "On corrige les erreurs." },
  { value: "a_l_aise", label: "Je suis à l’aise", icon: <Star className="w-4 h-4" />, hint: "On vérifie et on approfondit." },
];

// ✅ Profil (chips)
const PROFIL_OPTIONS: { id: ProfilEleve; label: string; emoji: string }[] = [
  { id: "sport", label: "Sport", emoji: "🏀" },
  { id: "musique", label: "Musique", emoji: "🎵" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "dessin", label: "Dessin", emoji: "🎨" },
  { id: "jeux_videos", label: "Jeux vidéos", emoji: "🎮" },
  { id: "amis", label: "Les amis", emoji: "🧑‍🤝‍🧑" },
];

/* ----------------------------------------
   PRESETS (factorisés)
---------------------------------------- */

const PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(ELEVES_PRESETS) as [ElevesPresetKey, (typeof ELEVES_PRESETS)[ElevesPresetKey]][]
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

function labelProfil(p: ProfilEleve) {
  switch (p) {
    case "sport":
      return "sport";
    case "musique":
      return "musique";
    case "nature":
      return "nature";
    case "dessin":
      return "dessin";
    case "jeux_videos":
      return "jeux vidéos";
    case "amis":
      return "les amis";
  }
}

/* ----------------------------------------
   UI : Boutons "Coller dans" (couleurs)
---------------------------------------- */

function PasteTargets({ text, showToast }: { text: string; showToast: (msg: string) => void }) {
  const disabled = !text;
  const tchatHref = text ? `/tchat?prompt=${encodeURIComponent(text)}` : "/tchat";

  const copySilently = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast("✅ Prompt copié ! Colle-le dans l’IA.");
    } catch {
      showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    }
  };

  return (
    <div className="space-y-2 pt-1">
      <p className="text-[11px] text-gray-600">Coller dans :</p>
      <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
        <a
          href="https://chatgpt.com"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            copySilently();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-800 text-white hover:bg-slate-900"
          }`}
        >
          🟦 ChatGPT
        </a>

        <a
          href="https://www.perplexity.ia/"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            copySilently();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#0F9D58] text-white hover:bg-[#0c7b45]"
          }`}
        >
          🟩 Perplexity.ia
        </a>

        <Link
          href={tchatHref}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          🚀 Tchat EleveAI
        </Link>
      </div>
    </div>
  );
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ElevePage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  // Refs (scroll UX)
  const prompt2Ref = useRef<HTMLDivElement | null>(null);
  const prompt1Ref = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const scrollToPrompt1 = useCallback(() => {
    prompt1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToPrompt2 = useCallback(() => {
    prompt2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const makeInitialForm = (): PromptEleve => ({
    prenom: "",
    classe: "" as any,
    matiere: "" as any,
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
    profil: [],
    modeAntiTriche: true, // ✅ par défaut ON
  });

  const [form, setForm] = useState<PromptEleve>(makeInitialForm());

  // UI progressive (options)
  const [showAdvanced, setShowAdvanced] = useState(false);

  // sortie : Prompt 1 + Prompt 2 (relance)
  const [promptFinal, setPromptFinal] = useState("");
  const [promptRelance, setPromptRelance] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedRelance, setCopiedRelance] = useState(false);

  // saving
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // feedback élève (UI)
  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackChoice>("");
  const [feedbackText, setFeedbackText] = useState("");

  function handleChange<K extends keyof PromptEleve>(field: K, value: PromptEleve[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleProfil(id: ProfilEleve) {
    setForm((prev) => {
      const exists = prev.profil.includes(id);
      const profil = exists ? prev.profil.filter((x) => x !== id) : [...prev.profil, id];
      return { ...prev, profil };
    });
  }

  function appliquerPreset(key: ElevesPresetKey) {
    const preset = ELEVES_PRESETS[key];

    setForm((prev) => {
      const next: PromptEleve = {
        ...prev,
        ...preset.valeurs,

        // ✅ garde modeAntiTriche si preset ne l'a pas
        modeAntiTriche: (preset.valeurs as Partial<PromptEleve>)?.modeAntiTriche ?? prev.modeAntiTriche ?? true,

        // ✅ profil : si preset ne l’a pas, on garde l’ancien
        profil: preset.valeurs.profil ?? prev.profil ?? [],
      };
      return next;
    });

    setShowAdvanced(true);
    setPromptFinal("");
    setPromptRelance("");
    setCopied(false);
    setCopiedRelance(false);
    setSaveMessage(null);
    setFeedbackChoice("");
    setFeedbackText("");
    showToast("✅ Modèle appliqué !");
    scrollToTop();
  }

  function resetAll() {
    setForm(makeInitialForm());
    setShowAdvanced(false);
    setPromptFinal("");
    setPromptRelance("");
    setCopied(false);
    setCopiedRelance(false);
    setSaveMessage(null);
    setFeedbackChoice("");
    setFeedbackText("");
    showToast("🔄 Tout est réinitialisé");
    scrollToTop();
  }

  /* ----------------------------------------
     SUGGESTIONS (mini, non intrusif)
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

    if (!form.modeAntiTriche) {
      s.push("Conseil : active le mode anti-triche pour apprendre avec des indices.");
    }

    if (s.length === 0) s.push("Parfait ✅ Tu peux générer ton prompt.");
    return s;
  }, [form, showAdvanced]);

  /* ----------------------------------------
     GENERER PROMPT 1 (anti-triche + profil)
  ---------------------------------------- */

  function buildPromptBloc(mode: "rapide" | "complet") {
    const prenom = form.prenom.trim() || "un élève";
    const chapitre = form.chapitre.trim();
    const temps = form.tempsDispo?.trim() || "non précisé";

    const objectif =
      (mode === "complet" ? form.objectifPerso.trim() : "") || "mieux comprendre ce chapitre et réussir les exercices importants.";

    const exemples = mode === "complet" ? form.exemplesDifficiles.trim() : "";

    const profilTxt =
      form.profil && form.profil.length > 0
        ? `Mon profil (centres d’intérêt) : ${form.profil.map(labelProfil).join(", ")}.\n` +
          "➡️ Utilise ces centres d’intérêt pour choisir des exemples et des analogies (sans infantiliser).\n\n"
        : "";

    const blocPrefs =
      `Mes préférences :\n` +
      (form.prefereQuestions
        ? "- Pose-moi d’abord 2 à 4 questions pour voir ce que je sais.\n"
        : "- Tu peux expliquer directement, mais vérifie que je comprends.\n") +
      (form.prefereExemplesConcrets ? "- Utilise des exemples concrets avant la règle.\n" : "- Tu peux aller à l’essentiel.\n");

    const blocAntiTriche = form.modeAntiTriche
      ? "\nMODE ANTI-TRICHE :\n" +
        "- Ne donne pas la solution tout de suite.\n" +
        "- Fais-moi chercher : questions → indices → correction étape par étape.\n" +
        "- Demande-moi d’essayer à chaque étape.\n" +
        "- À la fin, fais une mini vérification (2–3 questions).\n"
      : "";

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
          if (form.dysTypes.includes("dyspraxie")) lignes.push("- Dyspraxie : étapes numérotées, consignes très claires.");
          if (form.dysTypes.includes("dyscalculie")) lignes.push("- Dyscalculie : détailler les calculs + verbaliser.");
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
      profilTxt +
      `Mon objectif : ${objectif}\n\n` +
      blocPrefs +
      (exemples ? `\nExemples qui me posent problème :\n${exemples}\n` : "") +
      blocDYS +
      blocAntiTriche;

    return prompt;
  }

  function genererPromptFinal(mode: "rapide" | "complet") {
    if (!form.classe || !form.matiere || !form.typeAide || !form.chapitre.trim()) {
      alert("Remplis au minimum : classe, matière, chapitre, et ce que tu veux faire.");
      return;
    }

    const prompt = buildPromptBloc(mode);

    setPromptFinal(prompt);
    setPromptRelance("");
    setCopied(false);
    setCopiedRelance(false);
    setSaveMessage(null);
    setFeedbackChoice("");
    setFeedbackText("");

    showToast(mode === "rapide" ? "⚡ Prompt rapide généré !" : "✨ Prompt complet généré !");
    setTimeout(() => scrollToPrompt1(), 60);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopied(true);
      showToast("✅ Copié !");
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  }

  /* ----------------------------------------
     PROMPT 2 : RELANCE ADAPTEE (avis élève)
  ---------------------------------------- */

  function buildRelanceBloc() {
    const feedbackFree = feedbackText.trim();

    const intentByChoice: Record<Exclude<FeedbackChoice, "">, string> = {
      ok: "Objectif : consolider. Donne 2–3 exercices progressifs (avec corrigé détaillé) + une mini-question de vérification à la fin.",
      bof: "Objectif : clarifier. Reprends plus simple, avec un exemple concret d’abord, puis la règle. Pose 2–4 questions courtes pour vérifier ce que je sais avant de corriger.",
      pas_ok:
        "Objectif : vérifier/rectifier. Refais le raisonnement étape par étape, contrôle avec un exemple, et signale explicitement si tu n’es pas certain. Propose une méthode alternative si possible.",
    };

    const addUserNote = feedbackFree ? `\n\nNote de l’élève (à prendre en compte) :\n"${feedbackFree}"\n` : "";

    const antiHallucination =
      "\n\nRègles importantes :\n" +
      "- Si une étape est incertaine, dis-le.\n" +
      "- Vérifie sur un exemple.\n" +
      "- Termine par : “Est-ce que tu peux refaire un essai seul ?”.\n";

    const relance =
      "Tu vas continuer le travail avec un élève.\n" +
      "Voici le contexte (Prompt 1) :\n" +
      "-----\n" +
      promptFinal +
      "\n-----\n\n" +
      "Maintenant, réponds en suivant cette relance :\n" +
      intentByChoice[feedbackChoice as Exclude<FeedbackChoice, "">] +
      addUserNote +
      antiHallucination;

    return relance;
  }

  function buildRelancePrompt() {
    if (!promptFinal) {
      alert("Génère d’abord ton prompt (étape 2).");
      return;
    }
    if (!feedbackChoice) {
      alert("Choisis d’abord ton avis (étape 3).");
      return;
    }

    const relance = buildRelanceBloc();
    setPromptRelance(relance);
    setCopiedRelance(false);

    showToast("🔁 Relance générée !");
    setTimeout(() => scrollToPrompt2(), 80);
  }

  async function copierRelance() {
    if (!promptRelance) return;
    try {
      await navigator.clipboard.writeText(promptRelance);
      setCopiedRelance(true);
      showToast("✅ Relance copiée !");
      setTimeout(() => setCopiedRelance(false), 1200);
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

    const titreParDefaut = form.chapitre.trim() || `${form.matiere || "Matière"} – ${form.typeAide ? typeAideLabel(form.typeAide) : "Aide"}`;
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
      showToast("⚠️ Erreur d’enregistrement");
    } else {
      setSaveMessage("✅ Preset enregistré dans ton espace !");
      showToast("⭐ Preset enregistré !");
    }

    setSaving(false);
    setTimeout(() => setSaveMessage(null), 3500);
  }

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  const canGenerate = isStep1Ok(form);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
       <div ref={topRef} className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-6 lg:py-10">
        {/* HEADER */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            🎒 Espace élèves · Atelier IA pour apprendre
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6] leading-tight">
            Ton coach IA pour comprendre et progresser
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            1) Tu règles tes <b>paramètres</b> → 2) Tu <b>génères un prompt</b> → 3) Après la réponse, tu donnes ton{" "}
            <b>avis</b> et tu peux faire une <b>relance</b> pour progresser.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200">1️⃣ Paramètres</span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200">2️⃣ Prompt</span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200">3️⃣ Avis + relance</span>
          </div>
        </header>

        {/* MODELES RAPIDES (collapsible) — ✅ FERMÉ PAR DÉFAUT */}
        <details className="group rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
          <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-extrabold text-slate-900 inline-flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-emerald-700" />
                Modèles rapides (facultatif)
              </p>
              <p className="text-xs text-slate-600">
                Choisis un modèle si tu veux aller plus vite. Tu peux tout modifier ensuite.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 transition group-open:rotate-90 mt-0.5" />
          </summary>

          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <PresetCarousel
              title="Choisir un modèle"
              subtitle="Clique sur un modèle : tu peux ensuite adapter tous les champs."
              items={PRESET_ITEMS}
              onSelect={(id) => appliquerPreset(id as ElevesPresetKey)}
              tone="emerald"
              searchPlaceholder="Rechercher… (fractions, brevet, méthode, oral)"
            />
          </div>
        </details>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ETAPE 1 : PARAMETRES */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-[#0047B6]">1️⃣ Paramètres</h2>
                <p className="text-xs text-slate-600 mt-1">Remplis l’essentiel. Ensuite tu pourras générer ton prompt.</p>
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
                  onChange={(e) => {
                    handleChange("classe", e.target.value as ClasseValue);

                    showToast("✅ Classe choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {CLASSES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Matière</label>
                <select
                  value={form.matiere}
                  onChange={(e) => {
                    handleChange("matiere", e.target.value as MatiereValue);

                    showToast("✅ Matière choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={`${m.label}-${m.value}`} value={m.value} disabled={!!m.disabled}>
                      {m.label}
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

            {/* Profil */}
            <div className="space-y-2">
              <label className="text-xs font-semibold">Ton profil (facultatif)</label>
              <p className="text-[11px] text-slate-600">Choisis 1 à 3 centres d’intérêt : l’IA peut s’en servir pour des exemples motivants.</p>

              <div className="flex flex-wrap gap-2">
                {PROFIL_OPTIONS.map((p) => {
                  const active = form.profil.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        toggleProfil(p.id);
                        showToast(active ? "➖ Retiré du profil" : `✅ Profil : ${p.label}`);
                      }}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition ${
                        active
                          ? "border-emerald-500 bg-emerald-100 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {p.emoji} {p.label}
                    </button>
                  );
                })}
              </div>

              {form.profil.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Sélection : <span className="font-semibold">{form.profil.map(labelProfil).join(", ")}</span>
                </p>
              )}
            </div>

            {/* Type d’aide */}
            <div className="space-y-2">
              <label className="text-xs font-semibold">Ce que tu veux faire</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {TYPE_AIDE_CARDS.map((t) => {
                  const active = form.typeAide === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => {
                        handleChange("typeAide", t.value);
                        showToast(`🎯 ${t.label} sélectionné`);
                      }}
                      className={`text-left rounded-xl border px-3 py-2 transition ${
                        active ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white hover:bg-slate-50"
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

            {/* Temps + Confiance */}
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
                        onClick={() => {
                          handleChange("tempsDispo", t);
                          showToast(`⏱️ ${t}`);
                        }}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition ${
                          active ? "border-emerald-500 bg-emerald-100 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
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
                        onClick={() => {
                          handleChange("confiance", c.value);
                          showToast("✅ Niveau noté");
                        }}
                        className={`text-left rounded-xl border px-3 py-2 transition ${
                          active ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white hover:bg-slate-50"
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

            {/* Anti-triche */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-amber-900 inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Mode anti-triche
                  </p>
                  <p className="text-xs text-amber-800 mt-1">L’IA doit t’aider à <b>comprendre</b> : questions → indices → correction pas à pas.</p>
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <input
                    type="checkbox"
                    checked={form.modeAntiTriche}
                    onChange={(e) => {
                      handleChange("modeAntiTriche", e.target.checked);
                      showToast(e.target.checked ? "🛡️ Anti-triche activé" : "⚠️ Anti-triche désactivé");
                    }}
                    className="rounded border-gray-400"
                  />
                  Activer
                </label>
              </div>
            </div>

            {/* Options avancées */}
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span>{showAdvanced ? "Masquer les options avancées" : "Options avancées (facultatif)"}</span>
              <ChevronRight className={`w-4 h-4 transition ${showAdvanced ? "rotate-90" : ""}`} />
            </button>

            {showAdvanced && (
              <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                <p className="text-sm font-extrabold text-emerald-800">🧠 Pour une aide plus précise</p>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Ton objectif (avec tes mots)</label>
                  <textarea
                    value={form.objectifPerso}
                    onChange={(e) => handleChange("objectifPerso", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                    placeholder="Ex : Je veux comprendre comment poser une équation."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Un exemple qui te pose problème</label>
                  <textarea
                    value={form.exemplesDifficiles}
                    onChange={(e) => handleChange("exemplesDifficiles", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                    placeholder="Ex : Je n’arrive pas à additionner 3/4 + 1/6."
                  />
                </div>

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
                                  checked ? [...form.dysTypes, opt.value as DysType] : form.dysTypes.filter((t) => t !== opt.value)
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
              </div>
            )}

            {/* CTA génération */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                disabled={!canGenerate}
                onClick={() => genererPromptFinal("rapide")}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow transition ${
                  canGenerate ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Générer (rapide)
              </button>

              <button
                type="button"
                disabled={!canGenerate}
                onClick={() => genererPromptFinal("complet")}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border transition ${
                  canGenerate ? "border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50" : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Générer (complet)
              </button>
            </div>

            {/* Conseils discrets */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-extrabold text-slate-800">Conseils rapides</p>
              <ul className="mt-2 space-y-1 text-xs text-slate-700">
                {suggestions.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-600">➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* COLONNE DROITE : ETAPE 2 + 3 + Prompt 2 */}
          <section className="space-y-4">
            {/* ETAPE 2 : PROMPT 1 */}
            <div ref={prompt1Ref} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h2 className="text-base font-extrabold text-[#0047B6]">2️⃣ Ton prompt (Prompt 1)</h2>
                  <p className="text-xs text-slate-600">Copie-le ou utilise EleveAI directement.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copierPrompt}
                    disabled={!promptFinal}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      promptFinal ? "bg-slate-900 text-white hover:bg-slate-950" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied ? "Copié" : "Copier"}
                  </button>

                  <button
                    onClick={enregistrerPreset}
                    disabled={!promptFinal || saving}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      promptFinal ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    {saving ? "Enregistrement…" : "Enregistrer"}
                  </button>
                </div>
              </div>

              {saveMessage && <p className="text-xs text-emerald-700">{saveMessage}</p>}

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-slate-50 min-h-[220px]"
                placeholder="Ton prompt apparaîtra ici après génération."
              />

              {/* ✅ Boutons colorés */}
              <PasteTargets text={promptFinal} showToast={showToast} />

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => showToast("✅ Astuce : demande des questions d’abord.")}
                  disabled={!promptFinal}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-semibold border transition ${
                    promptFinal ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-50" : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Astuce
                </button>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                ✅ Astuce : si l’IA donne directement la solution, dis :
                <span className="font-semibold"> “Pose-moi des questions d’abord, puis corrige.”</span>
              </div>
            </div>

            {/* ETAPE 3 : AVIS + RELANCE */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-base font-extrabold text-[#0047B6]">3️⃣ Après la réponse : qu’en penses-tu ?</h2>
              <p className="text-xs text-slate-600">10 secondes : ça t’aide à mieux apprendre. Puis tu peux générer une relance (Prompt 2).</p>

              <div className="grid sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("ok");
                    showToast("✅ OK !");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "ok" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  ✅ Je comprends
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("bof");
                    showToast("🤔 On clarifie.");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "bof" ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  🤔 Pas sûr
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("pas_ok");
                    showToast("🧪 On vérifie.");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "pas_ok" ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  ❌ Ça semble faux
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Optionnel : une phrase</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                  placeholder="Ex : Je bloque sur la 2e étape / je ne comprends pas pourquoi on fait ça."
                />
              </div>

              <button
                type="button"
                onClick={buildRelancePrompt}
                disabled={!promptFinal || !feedbackChoice}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  promptFinal && feedbackChoice ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
                }`}
              >
                🔁 Générer une relance adaptée (Prompt 2)
              </button>
            </div>

            {/* PROMPT 2 : RELANCE */}
            <div ref={prompt2Ref} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-[#0047B6]">🔁 Prompt 2 (relance)</h3>
                  <p className="text-xs text-slate-600">À utiliser pour consolider, clarifier, ou vérifier.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copierRelance}
                    disabled={!promptRelance}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      promptRelance ? "bg-slate-900 text-white hover:bg-slate-950" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copiedRelance ? "Copié" : "Copier"}
                  </button>

                  <Link
                    href={promptRelance ? `/tchat?prompt=${encodeURIComponent(promptRelance)}` : "/tchat"}
                    className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      promptRelance ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                    }`}
                  >
                    🚀 Utiliser la relance
                  </Link>
                </div>
              </div>

              <textarea
                readOnly
                value={promptRelance}
                className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-slate-50 min-h-[180px]"
                placeholder="Ton Prompt 2 apparaîtra ici après ton avis (étape 3)."
              />

              {/* ✅ Boutons colorés */}
              <PasteTargets text={promptRelance} showToast={showToast} />

              {promptRelance && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                  ✅ Astuce : fais au moins 1 relance. C’est souvent là que tu comprends “vraiment”.
                </div>
              )}
            </div>

            {/* FUTUR : MES PRESETS */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">⭐ Mes presets</h2>
              <p className="text-xs text-slate-600">
                Bientôt : tu retrouveras ici tes prompts enregistrés (et tu pourras les relancer en 1 clic).
              </p>
              <button
                type="button"
                disabled
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-500 cursor-not-allowed"
              >
                Voir mes presets (bientôt)
              </button>
            </div>
          </section>
        </div>

        {/* espace pour éviter que la barre sticky cache le bas */}
        <div className="h-16 sm:hidden" />
      </div>

      {/* ✅ BARRE STICKY MOBILE */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => (showAdvanced ? genererPromptFinal("complet") : genererPromptFinal("rapide"))}
            disabled={!canGenerate}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow transition ${
              canGenerate ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Générer
          </button>

          <button
            type="button"
            onClick={scrollToPrompt1}
            disabled={!promptFinal}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold border transition ${
              promptFinal ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50" : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
            }`}
            title="Aller au prompt"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ✅ TOAST */}
      {toast && (
        <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
