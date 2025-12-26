"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MarkdownMath } from "@/components/MarkdownMath";
import { PresetCarousel, PresetCarouselItem } from "@/components/PresetCarousel";
import SignupNudge from "@/components/SignupNudge";
import { PROFS_PRESETS, ProfsPresetKey } from "@/data/profsPresets";
import ToggleChip from "@/components/ToggleChip";

// ✅ constantes partagées
import { CLASSES, MATIERES } from "@/lib/constants/scolaire";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Clock3,
  BadgeCheck,
  Save,
  FolderOpen,
  History,
  X,
  Search,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";

import type { MethodePedagogique } from "@/lib/pedagogie/methodes";
import {
  getMethodeDesc,
  getMethodeLabel,
  getMethodePromptBlock,
  METHODES,
} from "@/lib/pedagogie/methodes";

import {
  getTypeById,
  getTypesForContext,
  tagToBadge,
} from "@/lib/pedagogie/types";

/* ----------------------------------------
   HELPERS (UI)
---------------------------------------- */

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

/* ----------------------------------------
   CATEGORIES (NEW UX)
   Ligne 1 : catégories principales
   Ligne 2 : options
---------------------------------------- */

type MainCategory = "seance" | "exercices" | "evaluation" | "correction" | "methodes";

const MAIN_CATEGORIES: {
  id: MainCategory;
  label: string;
  emoji: string;
  hint: string;
}[] = [
  {
    id: "seance",
    label: "Séance / Séquence",
    emoji: "🗂️",
    hint: "Structure du document (déroulé, timing, mise en commun…).",
  },
  {
    id: "exercices",
    label: "Exercices",
    emoji: "✏️",
    hint: "Entraînement (séries, niveaux, méthodes, corrigés séparés…).",
  },
  {
    id: "evaluation",
    label: "Évaluation",
    emoji: "🧾",
    hint: "Contrôle / évaluation (barème, critères, attendus, différenciation).",
  },
  {
    id: "correction",
    label: "Correction",
    emoji: "✅",
    hint: "Corrigé structuré, justification, points clés, erreurs typiques.",
  },
  {
    id: "methodes",
    label: "Méthodes",
    emoji: "🧭",
    hint: "Fiches méthode, stratégies, démarches, mémo, erreurs fréquentes.",
  },
];

function normalizeMainCategory(raw: unknown): MainCategory {
  const c = String(raw ?? "").toLowerCase();

  if (c.includes("seance") || c.includes("séance") || c.includes("sequence") || c.includes("séquence"))
    return "seance";
  if (c.includes("exercice")) return "exercices";
  if (c.includes("eval") || c.includes("éval") || c.includes("evaluation") || c.includes("évaluation"))
    return "evaluation";
  if (c.includes("correction") || c.includes("corrige") || c.includes("corrigé"))
    return "correction";
  // ancien "document(s)" → on le range dans "méthodes"
  if (c.includes("document")) return "methodes";
  if (c.includes("methode") || c.includes("méthode") || c.includes("methodes") || c.includes("méthodes"))
    return "methodes";

  return "seance";
}

function getMainCategoryMeta(cat: MainCategory) {
  return MAIN_CATEGORIES.find((c) => c.id === cat) ?? MAIN_CATEGORIES[0];
}

/* ----------------------------------------
   TYPES UI
---------------------------------------- */

type Niveau = "basique" | "standard" | "expert";
type OutputStyle = "simple" | "word" | "word_expert";

type Tonalite =
  | "neutre"
  | "bienveillante"
  | "motivation"
  | "institutionnelle"
  | "ludique";

type ModaliteEvaluation =
  | "evaluation_sommative"
  | "evaluation_formative"
  | "evaluation_diagnostique"
  | "evaluation_differenciee";

type ThemeAborde =
  | "sport"
  | "ecologie"
  | "nature"
  | "agriculture"
  | "art"
  | "musique"
  | "architecture";

type PromptProf = {
  titre: string;
  objectifPedagogique: string;
  classe: string;
  matiere: string;
  niveau: Niveau;

  // ✅ important : on stocke l'id stable (DB-friendly)
  typeId: string;

  contenu: string;
  tags: string[];
  adaptationDYS: boolean;
  neuro: boolean;

  // ✅ LaTeX ON/OFF
  latex: boolean;

  auteur: string;
  date: string;

  methode: MethodePedagogique;
  outputStyle: OutputStyle;
  dureeMin: number;
  tonalite: Tonalite;

  modaliteEvaluation: ModaliteEvaluation;

  themes: ThemeAborde[];
  themesLabel: string;

  // ✅ Ligne 2 : OPTIONS (modifient sans remplacer le type)
  optDifferenciation: boolean;
  optRituels: boolean; // 5–10 min
  optIAFriendly: boolean; // ✅ compatible correction IA (structure parsable)
  optAtelierIA: boolean; // ✅ intégrer usage de l'IA en classe
};

/* ----------------------------------------
   OPTIONS (catalogues simples)
---------------------------------------- */

const TONALITES: { id: Tonalite; label: string; hint: string }[] = [
  { id: "neutre", label: "Neutre", hint: "Clair et direct." },
  { id: "bienveillante", label: "Bienveillante", hint: "Encourageante, rassurante." },
  { id: "motivation", label: "Motivante", hint: "Énergie, défis, valorisation." },
  { id: "institutionnelle", label: "Institutionnelle", hint: "Style sujet officiel, formel." },
  { id: "ludique", label: "Ludique", hint: "Ton plus léger (sans perdre la rigueur)." },
];

const EVAL_OPTIONS: { id: ModaliteEvaluation; label: string; description: string }[] = [
  {
    id: "evaluation_sommative",
    label: "Évaluation sommative",
    description:
      "Notation + barème + critères. Progressivité, lisibilité, attendus conformes.",
  },
  {
    id: "evaluation_formative",
    label: "Évaluation formative",
    description:
      "Feedback + paliers + indices possibles. Sert à apprendre (et pas seulement noter).",
  },
  {
    id: "evaluation_diagnostique",
    label: "Évaluation diagnostique",
    description:
      "Repérage ciblé des prérequis et difficultés. Courte, précise, exploitable.",
  },
  {
    id: "evaluation_differenciee",
    label: "Évaluation différenciée",
    description:
      "2-3 parcours (base/standard/défi) ou choix d’exercices + barème adapté.",
  },
];

const THEME_OPTIONS: { id: ThemeAborde; label: string }[] = [
  { id: "sport", label: "Sport" },
  { id: "ecologie", label: "Écologie" },
  { id: "nature", label: "Nature" },
  { id: "agriculture", label: "Agriculture" },
  { id: "art", label: "Art" },
  { id: "musique", label: "Musique" },
  { id: "architecture", label: "Architecture" },
];

const THEME_LABEL_BY_ID: Record<ThemeAborde, string> = THEME_OPTIONS.reduce(
  (acc, t) => {
    acc[t.id] = t.label;
    return acc;
  },
  {} as Record<ThemeAborde, string>,
);

/* ----------------------------------------
   PRESETS “MODELES”
---------------------------------------- */

const PROFS_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PROFS_PRESETS) as [
    ProfsPresetKey,
    (typeof PROFS_PRESETS)[ProfsPresetKey],
  ][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Modèle prof",
}));

/* ----------------------------------------
   HELPERS
---------------------------------------- */

function getEvalLabel(id: ModaliteEvaluation) {
  return EVAL_OPTIONS.find((e) => e.id === id)?.label ?? "Évaluation sommative";
}
function getEvalDesc(id: ModaliteEvaluation) {
  return EVAL_OPTIONS.find((e) => e.id === id)?.description ?? "";
}

function blocWordDesign(style: OutputStyle) {
  if (style === "simple") return "";

  if (style === "word") {
    return (
      "Format de sortie obligatoire : document Word (copier-coller sans perte).\n" +
      "- Titres hiérarchisés clairs (Titre 1 / Titre 2 / Titre 3) sur des lignes distinctes.\n" +
      "- Mise en page aérée : listes, lignes courtes, espaces de réponse.\n" +
      "- Utilise des icônes emoji simples au début des sections (compatibles Word).\n" +
      "- Termine par : « ✅ Prêt à coller dans Word ». \n\n"
    );
  }

  return (
    "Format de sortie obligatoire : document Word EXPERT, très lisible.\n" +
    "Contraintes Word-ready :\n" +
    "- Réponse copiable-collable en conservant la structure.\n" +
    "- Icônes emoji au début des titres/sous-parties.\n" +
    "- Bannières pour grandes parties :\n" +
    "==================================================\n" +
    "🧠 TITRE DE LA PARTIE\n" +
    "==================================================\n" +
    "- Encadrés simulés :\n" +
    "[🟦 ENCART – À RETENIR]\nTexte…\n\n" +
    "[🟨 ENCART – MÉTHODE]\nÉtapes…\n\n" +
    "[🟥 ENCART – ERREUR FRÉQUENTE]\nErreur + correction…\n\n" +
    "[🟩 ENCART – DÉFI / BONUS]\nQuestion défi…\n\n" +
    "- Encarts min : 1 À RETENIR + 1 MÉTHODE + 1 ERREUR + 1 DÉFI.\n" +
    "- Ajoute des zones : « Réponse : ______________________ ».\n" +
    "- Interdits : gros paragraphes compacts.\n" +
    "- Termine par : « ✅ Prêt à coller dans Word ». \n\n"
  );
}

/* ----------------------------------------
   PROMPT
---------------------------------------- */

function construirePrompt(form: PromptProf): string {
  const typeItem = getTypeById(form.typeId);
  const typeLabel = typeItem?.label ?? "Ressource pédagogique";
  const typeDesc = typeItem?.description ?? "";

  const blocTags =
    form.tags.length > 0 ? `Mots-clés pédagogiques : ${form.tags.join(", ")}.\n` : "";
  const blocAuteur = form.auteur ? `Préparé par : ${form.auteur}.\n` : "";

  const themesHumains = form.themes?.length
    ? form.themes.map((t) => THEME_LABEL_BY_ID[t] ?? t)
    : [];

  const blocThemes =
    (themesHumains.length ? `Thèmes à intégrer : ${themesHumains.join(", ")}.\n` : "") +
    (form.themesLabel?.trim() ? `Contexte / angle : ${form.themesLabel.trim()}.\n` : "");
  const blocContexteThemes = blocThemes.trim().length ? `\n${blocThemes}\n` : "";

  const blocEduscol =
    "Respecter les programmes officiels français (Eduscol/BO), vocabulaire attendu.\n\n";

  const blocNeuro = form.neuro
    ? "Neurosciences : activer prérequis, petites étapes, alternance explications/questions, récapitulatif, reformulation.\n\n"
    : "";

  const matiereScientifique = ["Mathématiques", "Physique-Chimie", "SVT", "Numérique/NSI"].includes(
    form.matiere,
  );

  const blocSansLatex =
    matiereScientifique && !form.latex
      ? 'Sans LaTeX (pas de \\frac, \\sqrt). Fractions a/b, puissances x^2 ou "x au carré".\n\n'
      : "";

  const blocDYS = form.adaptationDYS
    ? "Adapter DYS : phrases courtes, aération, vocabulaire expliqué, éviter doubles négations.\n\n"
    : "";

  const dur = form.dureeMin && form.dureeMin > 0 ? `${form.dureeMin} min` : "non précisée";
  const tone = form.tonalite || "neutre";
  const blocCalibrage = `Calibrage demandé :\n- Durée : ${dur}.\n- Tonalité : ${tone}.\n\n`;

  // ✅ Options (ligne 2) — NOUVELLE SÉMANTIQUE
  const blocOptions =
    (form.optDifferenciation ? "Option : Différenciation (base / standard / défi) clairement indiquée.\n" : "") +
    (form.optRituels ? "Option : Rituel d’entrée 5–10 min (activation, rappel, mini-défi, correction rapide).\n" : "") +
    (form.optIAFriendly
      ? "Option : Compatible correction IA — produire un document très structuré, régulier et facile à analyser automatiquement (questions/réponses repérables).\n"
      : "") +
    (form.optAtelierIA
      ? "Option : Intégrer usage de l’IA en classe — inclure une mini-séquence guidée d’usage de l’IA (consignes, étapes, garde-fous, rendu attendu).\n"
      : "");

  const blocOptionsFinal = blocOptions.trim().length ? `Options activées :\n${blocOptions}\n` : "";

  const estEval = normalizeMainCategory(typeItem?.category) === "evaluation";

  const blocEvaluation = estEval
    ? "MODE ÉVALUATION (important) :\n" +
      `- Modalité : ${getEvalLabel(form.modaliteEvaluation)}.\n` +
      "- Exiger : barème/points, consignes claires, attendus, critères de réussite, aides autorisées (si besoin).\n" +
      (form.optDifferenciation
        ? "- Différenciation : base/standard/défi (clairement séparé) + erreurs typiques.\n"
        : "") +
      "- Sortie Word : en-tête (classe/durée), exercices numérotés, espaces réponses, total points.\n\n"
    : "";

  const blocMethode = estEval ? "" : getMethodePromptBlock(form.methode);

  const blocStructureSeance =
    normalizeMainCategory(typeItem?.category) === "seance"
      ? "Structure chronométrée : accroche / recherche guidée / mise en commun / entraînement / bilan (rôle prof/élèves + matériel).\n\n"
      : "";

  const blocRituels =
    form.optRituels && normalizeMainCategory(typeItem?.category) === "seance"
      ? "Rituel (5–10 min) : au tout début, une courte activité (question flash / rappel / mini-problème) + correction rapide.\n\n"
      : "";

  // ✅ IA-friendly = document “corrigeable IA”
  const blocIAFriendly = form.optIAFriendly
    ? "DOCUMENT COMPATIBLE CORRECTION IA :\n" +
      "- Structure très claire et régulière (titres explicites, numérotation stable).\n" +
      "- Une consigne = une question.\n" +
      "- Pour chaque question : une zone « Réponse attendue : ... » ou « Attendus : ... ».\n" +
      "- Si correction incluse : étapes numérotées + résultat final explicite.\n" +
      "- Éviter tableaux complexes non textuels / mises en page décoratives.\n" +
      "- Vocabulaire non ambigu (éviter « on voit que », « il suffit de », etc.).\n\n"
    : "";

  const blocAtelierIA = form.optAtelierIA
    ? "INTÉGRER USAGE DE L’IA EN CLASSE (mini-parcours guidé) :\n" +
      "- Étape 1 : rédiger un prompt (modèle fourni).\n" +
      "- Étape 2 : lire la réponse et surligner 2 points à vérifier.\n" +
      "- Étape 3 : corriger/améliorer (avec justification).\n" +
      "- Étape 4 : produire un rendu final personnel (synthèse + trace courte).\n\n"
    : "";

  const blocDifferenciation =
    form.optDifferenciation && !estEval
      ? "Différenciation : proposer base / standard / défi (indiquer clairement).\n\n"
      : "";

  const blocRappelsEtMeta =
    "Réponse : prérequis courts, étapes numérotées, questions de vérification, récapitulatif, question métacognitive.\n\n";

  const blocCriteres =
    "Fin : « Pour l’enseignant » (3-5 critères observables) + erreurs typiques.\n\n";

  const blocMiseEnPage =
    "Si fiche/évaluation : structure Word (titres, exos numérotés, temps/points, espaces réponses).\n\n";

  const blocWord = blocWordDesign(form.outputStyle);

  return (
    `Tu es une IA pédagogique pour des élèves de ${form.classe || "collège/lycée"} en ${
      form.matiere || "discipline"
    }.\n\n` +
    blocEduscol +
    blocNeuro +
    blocSansLatex +
    blocCalibrage +
    blocOptionsFinal +
    (typeDesc ? `Type choisi : ${typeLabel} — ${typeDesc}\n\n` : `Type choisi : ${typeLabel}\n\n`) +
    blocEvaluation +
    blocMethode +
    blocWord +
    `Objectif pédagogique : ${form.objectifPedagogique || "(non précisé)"}\n` +
    `Niveau : ${form.niveau}.\n` +
    blocTags +
    blocContexteThemes +
    blocAuteur +
    `Consigne professeur (à optimiser) :\n"""${form.contenu.trim()}"""\n\n` +
    blocDYS +
    blocStructureSeance +
    blocRituels +
    blocIAFriendly +
    blocAtelierIA +
    blocDifferenciation +
    blocRappelsEtMeta +
    blocCriteres +
    blocMiseEnPage +
    "IMPORTANT : Structure ta réponse en 2 parties :\n" +
    '1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="\n' +
    '2) "=== PARTIE 2 : RESSOURCE PRÊTE POUR L’ÉLÈVE ==="\n'
  );
}

/* ----------------------------------------
   DB TYPES (jsonb typé)
---------------------------------------- */

type PresetEmailMeta = {
  scope: "profs";
  version: number;
};

type PresetEmailDataProfs = {
  meta: PresetEmailMeta;
  form: PromptProf;
  promptInterne: string;
  agentOutput: string;
};

function isPresetEmailDataProfs(x: unknown): x is PresetEmailDataProfs {
  if (!x || typeof x !== "object") return false;
  const o = x as any;
  return (
    o.meta?.scope === "profs" &&
    typeof o.meta?.version === "number" &&
    typeof o.promptInterne === "string" &&
    typeof o.agentOutput === "string" &&
    typeof o.form === "object" &&
    typeof o.form?.typeId === "string"
  );
}

type DbPresetEmail = {
  id: string;
  auth_user_id: string;
  title: string | null;
  classe: string | null;
  matiere: string | null;
  niveau: string | null;
  prompt: string | null;
  data: unknown;
  created_at: string;
};

type DbRunEmail = {
  id: string;
  auth_user_id: string;
  preset_id: string | null;
  classe: string | null;
  matiere: string | null;
  created_at: string;
};

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ProfsPage() {
  const supabase = useMemo(() => createClient(), []);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const makeInitialForm = useCallback((): PromptProf => {
    return {
      titre: "",
      objectifPedagogique: "",
      classe: "",
      matiere: "",
      niveau: "standard",
      typeId: "seance_cle_en_main",
      contenu: "",
      tags: [],
      adaptationDYS: true,
      neuro: true,
      latex: false,
      auteur: "",
      date: today,
      methode: "methode_active",
      outputStyle: "word_expert",
      dureeMin: 45,
      tonalite: "neutre",
      modaliteEvaluation: "evaluation_sommative",
      themes: [],
      themesLabel: "Agriculture & écologie : enjeux et solutions — contexte local : [territoire]",

      // ✅ options ligne 2
      optDifferenciation: true,
      optRituels: false,
      optIAFriendly: true,
      optAtelierIA: false,
    };
  }, [today]);

  const [form, setForm] = useState<PromptProf>(() => makeInitialForm());
  const [rawTags, setRawTags] = useState("");

  const [promptInterne, setPromptInterne] = useState("");
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");

  const [formError, setFormError] = useState<string>("");

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedRessource, setCopiedRessource] = useState(false);

  const [showPromptInterne, setShowPromptInterne] = useState(true);

  const [showMethode, setShowMethode] = useState(false);
  const [showEval, setShowEval] = useState(false);

  const [nudgeSignal, setNudgeSignal] = useState(0);
  const triggerNudge = useCallback(() => setNudgeSignal((n) => n + 1), []);

  const [dbMsg, setDbMsg] = useState<string>("");
  const [lastPresetId, setLastPresetId] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  const [showMyPresets, setShowMyPresets] = useState(false);
  const [myPresetsLoading, setMyPresetsLoading] = useState(false);
  const [myPresets, setMyPresets] = useState<DbPresetEmail[]>([]);

  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [runs, setRuns] = useState<DbRunEmail[]>([]);

  // ✅ NEW UX : catégorie principale (ligne 1)
  const [mainCategory, setMainCategory] = useState<MainCategory>("seance");
  const [typeQuery, setTypeQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setIsAuthed(!!data?.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user);
    });
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  // ✅ si typeId invalide (suite refacto catalogue), fallback propre
  useEffect(() => {
    const current = getTypeById(form.typeId);
    if (current) return;

    const all = getTypesForContext({ classe: form.classe, matiere: form.matiere });
    const fallback = all?.[0];
    if (fallback) {
      setForm((p) => ({ ...p, typeId: fallback.id }));
      setMainCategory(normalizeMainCategory(fallback.category));
    }
  }, [form.classe, form.matiere, form.typeId]);

  const handleChange = useCallback(
    <K extends keyof PromptProf>(field: K, value: PromptProf[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setAgentOutput("");
    setAgentError("");
    setFormError("");
    setCopiedPrompt(false);
    setCopiedRessource(false);
    setShowPromptInterne(true);
  }, []);

  const updateTags = useCallback((value: string) => {
    setRawTags(value);
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tags }));
  }, []);

  const toggleTheme = useCallback((id: ThemeAborde) => {
    setForm((prev) => {
      const has = prev.themes.includes(id);
      return {
        ...prev,
        themes: has ? prev.themes.filter((t) => t !== id) : [...prev.themes, id],
      };
    });
  }, []);

  const appliquerPresetModele = useCallback(
    (key: ProfsPresetKey) => {
      const preset = PROFS_PRESETS[key];
      const v = preset.valeurs as Partial<PromptProf> & Record<string, unknown>;

      setForm((prev): PromptProf => {
        const next: PromptProf = {
          ...prev,
          ...v,
          typeId: typeof v.typeId === "string" ? v.typeId : prev.typeId,
          methode:
            typeof v.methode === "string"
              ? (v.methode as MethodePedagogique)
              : prev.methode,
          outputStyle:
            typeof v.outputStyle === "string"
              ? (v.outputStyle as OutputStyle)
              : prev.outputStyle,
          dureeMin: typeof v.dureeMin === "number" ? v.dureeMin : prev.dureeMin,
          tonalite:
            typeof v.tonalite === "string"
              ? (v.tonalite as Tonalite)
              : prev.tonalite,
          modaliteEvaluation:
            typeof v.modaliteEvaluation === "string"
              ? (v.modaliteEvaluation as ModaliteEvaluation)
              : prev.modaliteEvaluation,
          themes: Array.isArray(v.themes) ? (v.themes as ThemeAborde[]) : prev.themes,
          themesLabel:
            typeof v.themesLabel === "string" ? v.themesLabel : prev.themesLabel,
          tags: Array.isArray(v.tags) ? (v.tags as string[]) : prev.tags,
          latex: typeof v.latex === "boolean" ? v.latex : prev.latex,

          // options (ligne 2)
          optDifferenciation:
            typeof (v as any).optDifferenciation === "boolean"
              ? (v as any).optDifferenciation
              : prev.optDifferenciation,
          optRituels:
            typeof (v as any).optRituels === "boolean"
              ? (v as any).optRituels
              : prev.optRituels,
          optIAFriendly:
            typeof (v as any).optIAFriendly === "boolean"
              ? (v as any).optIAFriendly
              : prev.optIAFriendly,
          optAtelierIA:
            typeof (v as any).optAtelierIA === "boolean"
              ? (v as any).optAtelierIA
              : prev.optAtelierIA,
        };
        return next;
      });

      const t = getTypeById(typeof v.typeId === "string" ? v.typeId : form.typeId);
      if (t?.category) setMainCategory(normalizeMainCategory(t.category));

      if (Array.isArray(v.tags)) setRawTags((v.tags as string[]).join(", "));
      clearOutputs();
      setShowMethode(false);
      setShowEval(false);
      setDbMsg("");
    },
    [clearOutputs, form.typeId],
  );

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    setRawTags("");
    clearOutputs();
    setAgentLoading(false);
    setShowMethode(false);
    setShowEval(false);
    setDbMsg("");
    setLastPresetId(null);
    setMainCategory("seance");
    setTypeQuery("");
  }, [clearOutputs, makeInitialForm]);

  const typesDisponibles = useMemo(() => {
    const all = getTypesForContext({ classe: form.classe, matiere: form.matiere });
    const byCat = all.filter((t) => normalizeMainCategory(t.category) === mainCategory);

    const q = typeQuery.trim().toLowerCase();
    return q
      ? byCat.filter((t) => {
          const hay = `${t.label} ${t.description} ${(t.tags || []).join(" ")}`.toLowerCase();
          return hay.includes(q);
        })
      : byCat;
  }, [form.classe, form.matiere, mainCategory, typeQuery]);

  const selectedType = useMemo(() => getTypeById(form.typeId), [form.typeId]);
  const estEval = useMemo(
    () => normalizeMainCategory(selectedType?.category) === "evaluation",
    [selectedType?.category],
  );

  const selectType = useCallback(
    (typeId: string) => {
      const t = getTypeById(typeId);

      setForm((prev) => {
        const next: PromptProf = { ...prev, typeId };

        if (t?.defaultDureeMin !== undefined && t.defaultDureeMin !== null) {
          if (!prev.dureeMin || prev.dureeMin <= 0) next.dureeMin = t.defaultDureeMin;
        }
        if (t?.auto?.forceOutputStyle) next.outputStyle = t.auto.forceOutputStyle;

        return next;
      });

      if (t?.auto?.openEvalPanel) setShowEval(true);
      if (t?.auto?.hideMethodePanel) setShowMethode(false);

      if (t?.category) setMainCategory(normalizeMainCategory(t.category));

      clearOutputs();
    },
    [clearOutputs],
  );

  /* ----------------------------------------
     VALIDATION UX (désactiver "Créer")
  ---------------------------------------- */

  const validation = useMemo(() => {
    const issues: string[] = [];

    if (!form.classe) issues.push("Choisis une classe.");
    if (!form.matiere) issues.push("Choisis une matière.");
    if (!form.typeId) issues.push("Choisis un type.");
    if (!form.objectifPedagogique.trim()) issues.push("Précise l’objectif pédagogique.");
    if (!form.contenu.trim()) issues.push("Écris la consigne (version prof).");
    if (form.contenu.trim() && form.contenu.trim().length < 40)
      issues.push("Consigne trop courte (≈ 40 caractères minimum).");
    if (!form.dureeMin || form.dureeMin <= 0) issues.push("Renseigne une durée (> 0).");

    if (estEval && !form.modaliteEvaluation) issues.push("Choisis une modalité d’évaluation.");

    return { ok: issues.length === 0, issues };
  }, [estEval, form]);

  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.objectifPedagogique.trim())
      s.push("Objectif : ce que l’élève doit savoir faire (verbe d’action).");
    if (!form.classe) s.push("Classe : vocabulaire + attendus mieux calibrés.");
    if (!form.matiere) s.push("Matière : garde l’IA dans le bon cadre.");
    if (!form.typeId) s.push("Type : fixe la structure (séance, exercices, évaluation…).");
    if (form.contenu.trim().length > 0 && form.contenu.trim().length < 40)
      s.push("Consigne : ajoute contraintes, barème/critères, exemple attendu.");
    if (!form.dureeMin || form.dureeMin <= 0) s.push("Durée : calibre la production.");

    // ✅ options (ligne 2) — NOUVELLE SÉMANTIQUE
    if (!form.optDifferenciation)
      s.push("Option : active Différenciation si tu veux base/standard/défi.");
    if (normalizeMainCategory(selectedType?.category) === "seance" && !form.optRituels)
      s.push("Option : active Rituels pour un démarrage 5–10 min (efficace et simple).");
    if (!form.optIAFriendly)
      s.push("Option : active Compatible correction IA si tu veux un document Word structuré (questions/réponses repérables) pour correction automatisable.");
    // ✅ cohérence douce (pas obligatoire)
    if (form.optAtelierIA && !form.optIAFriendly)
      s.push("Atelier-IA : active aussi Compatible correction IA si tu veux une structure plus simple à relire/corriger automatiquement.");

    if (estEval) {
      s.push("Évaluation : barème + critères + aides autorisées (calculatrice, docs, IA…).");
      if (!form.optDifferenciation)
        s.push("Évaluation : si tu veux différencier, active l’option Différenciation.");
    } else {
      s.push("Méthode : tu peux la modifier si tu veux, mais c’est déjà OK.");
    }

    if ((form.themes?.length ?? 0) === 0)
      s.push("Ajoute 1-2 thèmes : exemples concrets + motivation.");
    if (!form.themesLabel.trim())
      s.push("Ajoute un angle (ex : contexte local : [territoire]) pour contextualiser.");

    if (s.length === 0)
      s.push("Parfait. Tu peux ajouter : matériel, contraintes, exemple de production attendue.");

    return s;
  }, [estEval, form, selectedType?.category]);

  /* ----------------------------------------
     DB HELPERS
  ---------------------------------------- */

  const getAuthUserIdOrThrow = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) throw new Error("Tu dois être connecté pour utiliser les presets.");
    return data.user.id;
  }, [supabase]);

  const loadMyPresets = useCallback(async () => {
    setDbMsg("");
    setMyPresetsLoading(true);

    try {
      const uid = await getAuthUserIdOrThrow();
      const { data, error } = await supabase
        .from("presets_email")
        .select("id, auth_user_id, title, classe, matiere, niveau, prompt, data, created_at")
        .eq("auth_user_id", uid)
        .order("created_at", { ascending: false })
        .limit(80);

      if (error) throw new Error(error.message);

      const rows = (data ?? []) as DbPresetEmail[];
      const filtered = rows.filter((r) => isPresetEmailDataProfs(r.data));

      setMyPresets(filtered);
      setShowMyPresets(true);
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur chargement presets."}`);
    } finally {
      setMyPresetsLoading(false);
    }
  }, [getAuthUserIdOrThrow, supabase]);

  const applySavedPreset = useCallback((p: DbPresetEmail) => {
    if (!isPresetEmailDataProfs(p.data)) {
      setDbMsg("⚠️ Preset incompatible (format ancien).");
      return;
    }

    const data = p.data;

    setForm(data.form);
    setRawTags((data.form.tags ?? []).join(", "));

    setPromptInterne(data.promptInterne || p.prompt || "");
    setAgentOutput(data.agentOutput || "");
    setAgentError("");
    setFormError("");

    const t = getTypeById(data.form.typeId);
    if (t?.category) setMainCategory(normalizeMainCategory(t.category));

    setLastPresetId(p.id);
    setDbMsg("✅ Preset chargé.");
    setShowMyPresets(false);
  }, []);

  const saveCurrentPreset = useCallback(async () => {
    setDbMsg("");

    try {
      const uid = await getAuthUserIdOrThrow();

      const title =
        form.titre?.trim() ||
        `${getTypeById(form.typeId)?.label || "Preset"} – ${form.classe || ""} ${form.matiere || ""}`.trim();

      const dataJson: PresetEmailDataProfs = {
        meta: { scope: "profs", version: 4 },
        form,
        promptInterne,
        agentOutput,
      };

      const { data, error } = await supabase
        .from("presets_email")
        .insert({
          auth_user_id: uid,
          title,
          classe: form.classe || null,
          matiere: form.matiere || null,
          niveau: form.niveau || null,
          prompt: promptInterne || null,
          data: dataJson,
        })
        .select("id")
        .single();

      if (error) throw new Error(error.message);

      setLastPresetId(data.id as string);
      setDbMsg("✅ Preset enregistré.");
      triggerNudge();
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur sauvegarde preset."}`);
    }
  }, [agentOutput, form, getAuthUserIdOrThrow, promptInterne, supabase, triggerNudge]);

  const loadRunsHistory = useCallback(async () => {
    setDbMsg("");
    setHistoryLoading(true);
    try {
      const uid = await getAuthUserIdOrThrow();
      const { data, error } = await supabase
        .from("preset_runs_email")
        .select("id, auth_user_id, preset_id, classe, matiere, created_at")
        .eq("auth_user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw new Error(error.message);
      setRuns((data ?? []) as DbRunEmail[]);
      setShowHistory(true);
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur historique."}`);
    } finally {
      setHistoryLoading(false);
    }
  }, [getAuthUserIdOrThrow, supabase]);

  const createRun = useCallback(
    async (presetId: string | null) => {
      try {
        const uid = await getAuthUserIdOrThrow();
        const { error } = await supabase.from("preset_runs_email").insert({
          auth_user_id: uid,
          preset_id: presetId,
          classe: form.classe || null,
          matiere: form.matiere || null,
        });
        if (error) throw new Error(error.message);
      } catch {
        // non bloquant
      }
    },
    [form.classe, form.matiere, getAuthUserIdOrThrow, supabase],
  );

  /* ----------------------------------------
     ACTIONS IA
  ---------------------------------------- */

  const creerPromptEtRessource = useCallback(async () => {
    setAgentError("");
    setFormError("");
    setDbMsg("");

    if (!validation.ok) {
      setFormError(validation.issues[0] ?? "Champs insuffisants.");
      return;
    }

    const prompt = construirePrompt(form);
    setPromptInterne(prompt);
    setAgentOutput("");
    setCopiedPrompt(false);
    setCopiedRessource(false);

    setAgentLoading(true);
    try {
      const res = await fetch("/api/agent-prof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'appel à l'agent IA.");

      const out = data.output || "";
      setAgentOutput(out);
      if (out) triggerNudge();

      await createRun(lastPresetId);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erreur inconnue (vérifie le serveur / API).";
      setAgentError(msg);
    } finally {
      setAgentLoading(false);
    }
  }, [createRun, form, lastPresetId, triggerNudge, validation]);

  const copierPrompt = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
      triggerNudge();
    } catch {
      setDbMsg("⚠️ Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  }, [promptInterne, triggerNudge]);

  const copierRessource = useCallback(async () => {
    if (!agentOutput) return;
    try {
      await navigator.clipboard.writeText(agentOutput);
      setCopiedRessource(true);
      setTimeout(() => setCopiedRessource(false), 2000);
      triggerNudge();
    } catch {
      setDbMsg("⚠️ Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  }, [agentOutput, triggerNudge]);

  const tchatHref = useMemo(() => {
    return promptInterne ? `/tchat?prompt=${encodeURIComponent(promptInterne)}` : "/tchat";
  }, [promptInterne]);

  /* ----------------------------------------
     UI
  ---------------------------------------- */

  const mainCatMeta = useMemo(() => getMainCategoryMeta(mainCategory), [mainCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-8">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs – 1 type + options (Word-friendly)</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Générateur de prompts profs (Word-friendly)
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Tu choisis un <b>type</b> (catégorie principale), puis tu ajoutes des{" "}
            <b>options</b> (différenciation, rituel, compatible correction IA, Atelier-IA),
            et tu écris ta consigne. EleveAI génère un prompt propre + une ressource via l’agent.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <ToggleChip
              label="Neurosciences"
              checked={form.neuro}
              onChange={(v) => handleChange("neuro", v)}
              hint="Active prérequis, micro-étapes, questions, récap, métacognition."
              tone="emerald"
              icon={<span>🧠</span>}
            />

            <ToggleChip
              label="Adapter DYS"
              checked={form.adaptationDYS}
              onChange={(v) => handleChange("adaptationDYS", v)}
              hint="Phrases courtes, aéré, vocabulaire expliqué, éviter doubles négations."
              tone="violet"
              icon={<span>👁️</span>}
            />

            <ToggleChip
              label="LaTeX"
              checked={form.latex}
              onChange={(v) => handleChange("latex", v)}
              hint="Formules LaTeX autorisées (sinon fractions a/b, x^2, etc.)."
              tone="sky"
              icon={<span>∑</span>}
            />

            {estEval && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[11px] font-semibold text-amber-800 border border-amber-200">
                <BadgeCheck className="w-4 h-4" />
                Mode évaluation (barème + critères)
              </span>
            )}

            <button
              type="button"
              onClick={resetPage}
              disabled={agentLoading}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                agentLoading
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset complet
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={saveCurrentPreset}
                disabled={!isAuthed || agentLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || agentLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour enregistrer" : "Enregistrer ce preset"}
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>

              <button
                type="button"
                onClick={loadMyPresets}
                disabled={!isAuthed || myPresetsLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || myPresetsLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour voir tes presets" : "Afficher mes presets"}
              >
                <FolderOpen className="w-4 h-4" />
                Mes presets
              </button>

              <button
                type="button"
                onClick={loadRunsHistory}
                disabled={!isAuthed || historyLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || historyLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour voir l'historique" : "Historique des générations"}
              >
                <History className="w-4 h-4" />
                Historique
              </button>
            </div>

            {dbMsg && (
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800 text-white">
                {dbMsg}
              </span>
            )}

            {!isAuthed && (
              <span className="text-[11px] text-slate-600">(Connecte-toi pour sauvegarder)</span>
            )}
          </div>
        </header>

        <PresetCarousel
          title="Modèles rapides (facultatif)"
          subtitle="Clique sur un modèle : le formulaire se pré-remplit."
          items={PROFS_PRESET_ITEMS}
          onSelect={(id) => appliquerPresetModele(id as ProfsPresetKey)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0047B6] flex items-center gap-2">
              1️⃣ Paramètres pédagogiques
            </h2>

            {/* Classe / matière / niveau */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Classe / niveau</label>
                <select
                  value={form.classe}
                  onChange={(e) => handleChange("classe", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
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
                <label className="text-xs font-semibold text-gray-600">Matière</label>
                <select
                  value={form.matiere}
                  onChange={(e) => handleChange("matiere", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Niveau de difficulté</label>
                <select
                  value={form.niveau}
                  onChange={(e) => handleChange("niveau", e.target.value as Niveau)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="basique">Basique (remédiation)</option>
                  <option value="standard">Standard</option>
                  <option value="expert">Expert / approfondissement</option>
                </select>
              </div>
            </div>

            {/* Durée + tonalité */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  Durée (minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.dureeMin}
                  onChange={(e) =>
                    handleChange("dureeMin", Math.max(0, Number(e.target.value || 0)))
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Ex : 45"
                />
                <p className="text-[11px] text-gray-500">Recommandé : 30 à 60 minutes.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Tonalité souhaitée</label>
                <select
                  value={form.tonalite}
                  onChange={(e) => handleChange("tonalite", e.target.value as Tonalite)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {TONALITES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-500">
                  {TONALITES.find((t) => t.id === form.tonalite)?.hint}
                </p>
              </div>
            </div>

            {/* Style Word */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Style de rendu</label>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { id: "simple", title: "Simple", desc: "Texte propre, sans design.", badge: "Rapide" },
                  { id: "word", title: "Word", desc: "Titres + icônes + aération.", badge: "Recommandé" },
                  {
                    id: "word_expert",
                    title: "Word Expert",
                    desc: "Bannières + encadrés + zones réponses.",
                    badge: "🔥 Best",
                  },
                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleChange("outputStyle", o.id as OutputStyle)}
                    className={`text-left border rounded-xl px-3 py-2 text-xs transition ${
                      form.outputStyle === o.id
                        ? "border-[#0047B6] bg-sky-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">{o.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {o.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">{o.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ TYPES UX (NEW) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Catégorie principale (ligne 1)
              </label>

              <div className="flex flex-wrap gap-2">
                {MAIN_CATEGORIES.map((c) => {
                  const active = mainCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setMainCategory(c.id)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                        active
                          ? "bg-[#0047B6] text-white border-[#0047B6]"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                      title={c.hint}
                    >
                      {c.emoji} {c.label}
                    </button>
                  );
                })}
              </div>

              {/* ✅ OPTIONS (ligne 2) */}
              <div className="pt-1">
                <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Options (ligne 2)
                </label>

                <div className="flex flex-wrap gap-2 mt-2">
                  <ToggleChip
                    label="Différenciation"
                    checked={form.optDifferenciation}
                    onChange={(v) => handleChange("optDifferenciation", v)}
                    hint="Base / Standard / Défi clairement séparés."
                    tone="emerald"
                    icon={<span>🎚️</span>}
                  />
                  <ToggleChip
                    label="Rituels (5–10 min)"
                    checked={form.optRituels}
                    onChange={(v) => handleChange("optRituels", v)}
                    hint="Mini-rituel d'entrée : question flash + correction rapide."
                    tone="sky"
                    icon={<span>⏱️</span>}
                  />
                  <ToggleChip
                    label="Compatible correction IA"
                    checked={form.optIAFriendly}
                    onChange={(v) => handleChange("optIAFriendly", v)}
                    hint="Document très structuré (questions/réponses repérables) pour correction automatisable."
                    tone="sky"
                    icon={<span>🤖</span>}
                  />
                  <ToggleChip
                    label="Intégrer usage de l’IA en classe"
                    checked={form.optAtelierIA}
                    onChange={(v) => handleChange("optAtelierIA", v)}
                    hint="Mini-parcours guidé d’usage de l’IA dans la ressource."
                    tone="violet"
                    icon={<span>🧪</span>}
                  />
                </div>

                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-[11px] text-slate-700">
                    <span className="font-semibold">
                      {mainCatMeta.emoji} {mainCatMeta.label}
                    </span>{" "}
                    + options :{" "}
                    <span className="font-semibold">
                      {[
                        form.optDifferenciation ? "Différenciation" : null,
                        form.optRituels ? "Rituels" : null,
                        form.optIAFriendly ? "Compatible correction IA" : null,
                        form.optAtelierIA ? "Usage IA en classe" : null,
                      ]
                        .filter(Boolean)
                        .join(" • ") || "aucune"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Recherche de type */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={typeQuery}
                  onChange={(e) => setTypeQuery(e.target.value)}
                  placeholder="Rechercher un type (ex: barème, QCM, séance, fiche...)"
                  className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              {/* Liste des types */}
              <div className="grid gap-2 sm:grid-cols-2">
                {typesDisponibles.map((t) => {
                  const active = form.typeId === t.id;
                  const meta = getMainCategoryMeta(normalizeMainCategory(t.category));
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => selectType(t.id)}
                      className={`text-left border rounded-xl px-3 py-3 text-xs sm:text-[13px] transition ${
                        active
                          ? "border-[#0047B6] bg-sky-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-sky-200"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800">
                          {meta.emoji} {t.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">{t.description}</div>
                      </div>

                      {t.tags?.length ? (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {t.tags.map((tag) => {
                            const b = tagToBadge(tag);
                            const cls =
                              b.tone === "sky"
                                ? "bg-sky-100 text-sky-800"
                                : b.tone === "amber"
                                  ? "bg-amber-100 text-amber-900"
                                  : b.tone === "emerald"
                                    ? "bg-emerald-100 text-emerald-900"
                                    : "bg-slate-100 text-slate-800";
                            return (
                              <span
                                key={tag}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cls}`}
                              >
                                {b.label}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold text-slate-800">
                  Type sélectionné : {selectedType?.label ?? "—"}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  {selectedType?.description ?? "Choisis un type dans le catalogue."}
                </p>
              </div>
            </div>

            {/* MODE ÉVALUATION / MÉTHODE */}
            {estEval ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-gray-600">Modalité d’évaluation</label>
                  <button
                    type="button"
                    onClick={() => setShowEval((v) => !v)}
                    className="text-[11px] font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 inline-flex items-center gap-1"
                  >
                    {showEval ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showEval ? "Réduire" : "Modifier"}
                  </button>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <p className="text-xs font-semibold text-amber-900">
                    {getEvalLabel(form.modaliteEvaluation)}
                  </p>
                  <p className="mt-1 text-[11px] text-amber-800/80">
                    {getEvalDesc(form.modaliteEvaluation)}
                  </p>
                  <p className="mt-2 text-[11px] text-amber-900">
                    ✅ Le prompt générera : barème, critères, consignes, progressivité
                    {form.optDifferenciation ? " + différenciation" : ""}.
                  </p>
                </div>

                {showEval && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {EVAL_OPTIONS.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => {
                          handleChange("modaliteEvaluation", e.id);
                          setShowEval(false);
                        }}
                        className={`text-left border rounded-xl px-3 py-2 text-xs sm:text-[13px] transition ${
                          form.modaliteEvaluation === e.id
                            ? "border-amber-400 bg-amber-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-amber-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800">{e.label}</div>
                        <div className="text-[11px] text-slate-600">{e.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-gray-600">Méthode pédagogique</label>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/blog"
                      className="text-[11px] text-[#0047B6] underline underline-offset-2 hover:text-[#003894]"
                    >
                      En savoir plus
                    </Link>
                    <button
                      type="button"
                      onClick={() => setShowMethode((v) => !v)}
                      className="text-[11px] font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 inline-flex items-center gap-1"
                    >
                      {showMethode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {showMethode ? "Réduire" : "Modifier"}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-800">
                      Méthode : {getMethodeLabel(form.methode)}
                      {form.methode === "methode_active" ? " (par défaut)" : ""}
                    </p>
                    {form.methode === "methode_active" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        OK
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">{getMethodeDesc(form.methode)}</p>
                </div>

                {showMethode && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {METHODES.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          handleChange("methode", m.id);
                          setShowMethode(false);
                        }}
                        className={`text-left border rounded-xl px-3 py-2 text-xs sm:text-[13px] transition ${
                          form.methode === m.id
                            ? "border-[#0047B6] bg-sky-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-sky-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800">{m.label}</div>
                        <div className="text-[11px] text-slate-600">{m.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Titre (pour toi)</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Éval fractions – barème + différenciation"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Auteur (facultatif)</label>
                <input
                  type="text"
                  value={form.auteur}
                  onChange={(e) => handleChange("auteur", e.target.value)}
                  placeholder="Nom, initiales…"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            {/* Objectif */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Objectif pédagogique</label>
              <textarea
                value={form.objectifPedagogique}
                onChange={(e) => handleChange("objectifPedagogique", e.target.value)}
                placeholder="Ex : évaluer la comparaison de fractions + justification…"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[70px]"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Mots-clés (virgules)</label>
              <input
                type="text"
                value={rawTags}
                onChange={(e) => updateTags(e.target.value)}
                placeholder="Ex : #DYS, #différenciation, #barème"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Pris en compte : <span className="font-semibold">{form.tags.join(", ")}</span>
                </p>
              )}
            </div>

            {/* Thèmes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Thèmes abordés</label>

              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((t) => {
                  const active = form.themes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTheme(t.id)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                        active
                          ? "bg-[#0047B6] text-white border-[#0047B6]"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-semibold text-gray-600">Libellé de contexte (facultatif)</label>
                <input
                  type="text"
                  value={form.themesLabel}
                  onChange={(e) => handleChange("themesLabel", e.target.value)}
                  placeholder="Ex : Agriculture & écologie : enjeux et solutions — contexte local : [territoire]"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <p className="text-[11px] text-gray-500">
                  Sert à contextualiser (exemples, vocabulaire, situations locales).
                </p>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">Texte de ta demande (version prof)</label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder={
                  estEval
                    ? "Ex : Fais une évaluation de 45 min… exos progressifs + barème sur 20…"
                    : "Ex : Génère une séance clé en main…"
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                <p className="text-xs font-semibold text-rose-800">⚠️ {formError}</p>
                {!validation.ok && (
                  <ul className="mt-2 text-[11px] text-rose-800/90 list-disc pl-4 space-y-1">
                    {validation.issues.slice(0, 6).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="pt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetPage}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  agentLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={creerPromptEtRessource}
                disabled={agentLoading || !validation.ok}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  agentLoading || !validation.ok
                    ? "bg-sky-100 text-sky-500 cursor-not-allowed"
                    : "bg-[#0047B6] text-white hover:bg-[#003894]"
                }`}
                title={!validation.ok ? validation.issues[0] : "Générer prompt + ressource"}
              >
                <Sparkles className="w-4 h-4" />
                {agentLoading ? "Génération..." : "Créer prompt + ressource"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <h2 className="text-lg font-bold text-amber-700 flex items-center gap-2">
                2️⃣ Conseils pour un meilleur résultat
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px] text-amber-500">➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">3️⃣ Prompt EleveAI (à copier-coller)</h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copierPrompt}
                    disabled={!promptInterne}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      promptInterne
                        ? "bg-slate-800 text-white hover:bg-slate-900"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copiedPrompt ? "Copié" : "Copier"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPromptInterne((v) => !v)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-300 hover:bg-slate-50"
                  >
                    {showPromptInterne ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPromptInterne ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              {showPromptInterne && (
                <textarea
                  readOnly
                  value={promptInterne}
                  className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[220px]"
                  placeholder="Le prompt apparaîtra ici après génération."
                />
              )}

              <div className="space-y-2 pt-1">
                <p className="text-[11px] text-gray-600">Coller dans :</p>
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                  <Link
                    href={tchatHref}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Tchat EleveAI
                  </Link>

                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900"
                  >
                    🟦 ChatGPT
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold hover:bg-[#0c7b45]"
                  >
                    🟩 Gemini
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold hover:bg-[#372dcc]"
                  >
                    🟪 Claude
                  </a>
                  <a
                    href="https://chat.mistral.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold hover:bg-[#e46f0d]"
                  >
                    🟧 Mistral
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">4️⃣ Ressource générée (agent IA)</h2>

                <button
                  type="button"
                  onClick={copierRessource}
                  disabled={!agentOutput}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    agentOutput
                      ? "bg-slate-800 text-white hover:bg-slate-900"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copiedRessource ? "Copié" : "Copier"}
                </button>
              </div>

              {agentError && <p className="text-xs text-red-600">⚠️ {agentError}</p>}

              <div className="eleveai-math border rounded p-3 min-h-[180px] bg-slate-50 text-sm whitespace-pre-wrap">
                {agentLoading
                  ? "Réflexion en cours..."
                  : agentOutput
                    ? <MarkdownMath>{agentOutput}</MarkdownMath>
                    : "La ressource apparaîtra ici."}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ✅ MODAL : Mes presets */}
      {showMyPresets && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-extrabold text-[#0047B6]">📚 Mes presets profs</h3>
                <p className="text-xs text-slate-600">
                  Clique sur “Charger” pour retrouver ton formulaire + prompt + ressource.
                </p>
              </div>
              <button
                onClick={() => setShowMyPresets(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {myPresetsLoading ? (
                <p className="text-sm text-slate-600">Chargement…</p>
              ) : myPresets.length === 0 ? (
                <p className="text-sm text-slate-600">
                  Aucun preset enregistré (scope profs). Clique sur <b>Enregistrer</b> après une génération.
                </p>
              ) : (
                <div className="space-y-2">
                  {myPresets.map((p) => (
                    <div key={p.id} className="border rounded-xl p-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{p.title || "Sans titre"}</div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          {p.classe || "—"} • {p.matiere || "—"} •{" "}
                          <span className="font-mono">{fmtDate(p.created_at)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => applySavedPreset(p)}
                        className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0047B6] text-white text-xs font-semibold hover:bg-[#003894]"
                      >
                        <FolderOpen className="w-4 h-4" />
                        Charger
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <button
                onClick={() => setShowMyPresets(false)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-50"
              >
                Fermer
              </button>
              <button
                onClick={loadMyPresets}
                disabled={myPresetsLoading}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                  myPresetsLoading ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-50"
                }`}
              >
                Recharger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL : Historique */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-extrabold text-[#0047B6]">🕒 Historique des générations</h3>
                <p className="text-xs text-slate-600">
                  Chaque clic “Créer prompt + ressource” ajoute une ligne ici.
                </p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {historyLoading ? (
                <p className="text-sm text-slate-600">Chargement…</p>
              ) : runs.length === 0 ? (
                <p className="text-sm text-slate-600">Aucun run pour l’instant.</p>
              ) : (
                <div className="space-y-2">
                  {runs.map((r) => (
                    <div key={r.id} className="border rounded-xl p-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {r.classe || "—"} • {r.matiere || "—"}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          {r.preset_id ? (
                            <span>
                              Preset lié : <span className="font-mono">{r.preset_id}</span>
                            </span>
                          ) : (
                            <span>Preset non lié (génération sans enregistrement)</span>
                          )}
                          {" • "}
                          <span className="font-mono">{fmtDate(r.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <button
                onClick={() => setShowHistory(false)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-50"
              >
                Fermer
              </button>
              <button
                onClick={loadRunsHistory}
                disabled={historyLoading}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                  historyLoading ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-50"
                }`}
              >
                Recharger
              </button>
            </div>
          </div>
        </div>
      )}

      <SignupNudge
        storageKey="eleveai_nudge_profs_v4"
        actionSignal={nudgeSignal}
        minActionCount={0}
        trigger="both"
        delayMs={5 * 60 * 1000}
        minInteractions={3}
        variant="bottom"
      />
    </main>
  );
}
