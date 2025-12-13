// app/espace-profs/page.tsx
"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";
import { PresetCarousel, PresetCarouselItem } from "@/components/PresetCarousel";
import SignupNudge from "@/components/SignupNudge";
import { PROFS_PRESETS, ProfsPresetKey } from "@/data/profsPresets";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type Niveau = "basique" | "standard" | "expert";

type MethodePedagogique =
  | "methode_active"
  | "enseignement_explicite"
  | "inductive"
  | "deductive"
  | "par_projet"
  | "par_problemes"
  | "cooperative"
  | "ludique"
  | "magistrale";

type OutputStyle = "simple" | "word" | "word_expert";

type PromptProf = {
  titre: string;
  objectifPedagogique: string;
  classe: string;
  matiere: string;
  niveau: Niveau;
  type: string;
  contenu: string;
  tags: string[];
  adaptationDYS: boolean;
  neuro: boolean;
  auteur: string;
  date: string;
  methode: MethodePedagogique;
  outputStyle: OutputStyle;
};

/* ----------------------------------------
   OPTIONS
---------------------------------------- */

const CLASSES = ["6e", "5e", "4e", "3e", "Seconde", "Première", "Terminale"];

const MATIERES = [
  "Mathématiques",
  "Français",
  "Physique-Chimie",
  "SVT",
  "Histoire-Géographie",
  "SES",
  "Langues",
  "Numérique/NSI",
  "Philosophie",
  "Autre",
];

const TYPES_COMMUNS = [
  "Explication d’une notion",
  "Génération d’exercices",
  "Correction méthodologique",
  "Création d’activité",
  "Préparation de séquence",
  "Préparation d’une séance",
  "QCM / Évaluation",
  "Réécriture / simplification",
  "Questions flash",
  "Résolution de problème",
];

const TYPES_PAR_MATIERE: Record<string, string[]> = {
  Mathématiques: [
    "Génération d’exercices de calcul mental",
    "Création de problèmes ouverts",
    "Construction d’exercices de démonstration",
  ],
  Français: [
    "Préparation de lecture analytique",
    "Création d’atelier d’écriture",
    "Préparation d’un commentaire composé guidé",
  ],
  "Physique-Chimie": ["Conception d’activité expérimentale", "Préparation d’exercices type bac"],
  SVT: ["Analyse de documents scientifiques", "Construction de schémas-bilans à compléter"],
  "Histoire-Géographie": ["Étude de documents historiques", "Analyse de carte ou croquis"],
  SES: ["Analyse de graphiques économiques", "Préparation d’exemples chiffrés"],
  Langues: ["Création d’activité de compréhension orale", "Génération de dialogues pour jeu de rôle"],
  "Numérique/NSI": ["Génération d’exercices de programmation", "Création de défis algorithmiques"],
  Philosophie: [
    "Préparation d’un sujet de dissertation",
    "Préparation d’une explication de texte philosophique",
    "Construction d’une fiche notionnelle (auteur, concept, problème)",
    "Génération de sujets de réflexion pour l’oral",
  ],
  Autre: ["Création d’activité interdisciplinaire"],
};

const TYPES_SPECIAUX_BREVET = [
  "Préparation d’un sujet type brevet",
  "Génération d’exercices de révision pour le brevet",
  "Création d’un QCM de révision brevet",
  "Préparation d’un sujet blanc de brevet avec barème",
];

const TYPES_SPECIAUX_BAC = [
  "Préparation d’un sujet type bac",
  "Préparation d’un sujet blanc de bac avec barème",
  "Génération d’exercices type bac avec correction",
  "Préparation d’une synthèse de révision pour le bac",
];

const METHODE_OPTIONS: {
  id: MethodePedagogique;
  label: string;
  description: string;
}[] = [
  {
    id: "methode_active",
    label: "Méthode active",
    description: "L’élève manipule, cherche, répond à des questions et construit la notion par étapes.",
  },
  {
    id: "enseignement_explicite",
    label: "Enseignement explicite (I do / We do / You do)",
    description: "Tu montres un exemple, vous faites ensemble, puis l’élève s’entraîne seul.",
  },
  { id: "inductive", label: "Méthode inductive", description: "On part d’exemples concrets pour faire émerger la règle." },
  { id: "deductive", label: "Méthode déductive", description: "On part de la règle, puis exercices d’application gradués." },
  { id: "par_projet", label: "Pédagogie par projet", description: "Production finale + étapes + critères + bilan." },
  { id: "par_problemes", label: "Apprentissage par problèmes", description: "Problème authentique → outils au bon moment → méthode." },
  { id: "cooperative", label: "Pédagogie coopérative", description: "Groupes + rôles + production commune + explication entre pairs." },
  { id: "ludique", label: "Approche ludique / gamification", description: "Défis, missions courtes, progression visible." },
  { id: "magistrale", label: "Cours magistral guidé", description: "Cours structuré + questions de vérification + entraînement final." },
];

/* ----------------------------------------
   CARROUSEL PRESETS
---------------------------------------- */

const PROFS_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PROFS_PRESETS) as [ProfsPresetKey, (typeof PROFS_PRESETS)[ProfsPresetKey]][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Modèle prof",
}));

/* ----------------------------------------
   HELPERS
---------------------------------------- */

function uniqueKeepOrder(items: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    if (!seen.has(it)) {
      seen.add(it);
      out.push(it);
    }
  }
  return out;
}

function getMethodeLabel(id: MethodePedagogique) {
  return METHODE_OPTIONS.find((m) => m.id === id)?.label ?? "Méthode active";
}

function getMethodeDesc(id: MethodePedagogique) {
  return METHODE_OPTIONS.find((m) => m.id === id)?.description ?? "";
}

/* ----------------------------------------
   BLOCS WORD / DESIGN EXPERT
---------------------------------------- */

function blocWordDesign(style: OutputStyle) {
  if (style === "simple") return "";

  if (style === "word") {
    return (
      "Format de sortie obligatoire : document Word (copier-coller sans perte).\n" +
      "- Utilise des titres hiérarchisés clairs (Titre 1 / Titre 2 / Titre 3) sur des lignes distinctes.\n" +
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
   CONSTRUCTION PROMPT (ELEVAI)
---------------------------------------- */

function construirePrompt(form: PromptProf): string {
  const blocTags =
    form.tags.length > 0 ? `Mots-clés pédagogiques : ${form.tags.join(", ")}.\n` : "";

  const blocMethode = (() => {
    switch (form.methode) {
      case "enseignement_explicite":
        return (
          "Méthode : enseignement explicite (I do / We do / You do).\n" +
          "- I do : exemple modélisé.\n- We do : 1-2 questions guidées.\n- You do : entraînement autonome.\n\n"
        );
      case "inductive":
        return "Méthode : inductive.\n- Exemples concrets → observations → règle → applications.\n\n";
      case "deductive":
        return "Méthode : déductive.\n- Règle → exemples → exercices gradués.\n\n";
      case "par_projet":
        return "Méthode : projet.\n- Production finale → étapes → critères → bilan.\n\n";
      case "par_problemes":
        return "Méthode : par problèmes.\n- Problème authentique → stratégies → outils au moment du besoin → méthode.\n\n";
      case "cooperative":
        return "Méthode : coopérative.\n- Groupes + rôles + production + explication entre pairs.\n\n";
      case "ludique":
        return "Méthode : ludique.\n- Défis, missions courtes, progression visible.\n\n";
      case "magistrale":
        return "Méthode : cours guidé.\n- Parties structurées + questions de vérification + entraînement.\n\n";
      case "methode_active":
      default:
        return "Méthode : active.\n- Faire agir l’élève à chaque étape + bilan + question métacognitive.\n\n";
    }
  })();

  const blocDYS = form.adaptationDYS
    ? "Adapter DYS : phrases courtes, aération, vocabulaire expliqué, éviter doubles négations.\n\n"
    : "";

  const blocAuteur = form.auteur ? `Préparé par : ${form.auteur}.\n` : "";

  const blocEduscol =
    "Respecter les programmes officiels français (Eduscol/BO), vocabulaire attendu.\n\n";

  const blocNeuro = form.neuro
    ? "Neurosciences : activer prérequis, petites étapes, alternance explications/questions, récapitulatif, reformulation.\n\n"
    : "";

  const matiereScientifique = ["Mathématiques", "Physique-Chimie", "SVT", "Numérique/NSI"].includes(form.matiere);

  const blocSansLatex = matiereScientifique
    ? 'Sans LaTeX (pas de \\frac, \\sqrt). Fractions a/b, puissances x^2 ou "x au carré".\n\n'
    : "";

  const blocStructureSeance =
    form.type === "Préparation d’une séance" || form.type === "Préparation de séquence"
      ? "Structure chronométrée : accroche / recherche guidée / mise en commun / entraînement / bilan (rôle prof/élèves + matériel).\n\n"
      : "";

  const blocDifferenciation =
    "Différenciation : niveau base / standard / défi (indiquer clairement).\n\n";

  const blocRappelsEtMeta =
    "Réponse : prérequis courts, étapes numérotées, questions de vérification, récapitulatif, question métacognitive.\n\n";

  const blocCriteres =
    "Fin : « Pour l’enseignant » (3-5 critères observables) + erreurs typiques.\n\n";

  const blocMiseEnPage =
    "Si fiche/évaluation : structure Word (titres, exos numérotés, temps/points, espaces réponses).\n\n";

  const blocWord = blocWordDesign(form.outputStyle);

  return (
    `Tu es une IA pédagogique pour des élèves de ${form.classe || "collège/lycée"} en ${form.matiere || "discipline"}.\n\n` +
    blocEduscol +
    blocNeuro +
    blocSansLatex +
    blocMethode +
    blocWord +
    `Objectif pédagogique : ${form.objectifPedagogique || "(non précisé)"}\n` +
    `Niveau : ${form.niveau}.\n` +
    `Type : ${form.type || "non précisé"}.\n` +
    blocTags +
    blocAuteur +
    `Consigne professeur (à optimiser) :\n"""${form.contenu.trim()}"""\n\n` +
    blocDYS +
    blocStructureSeance +
    blocDifferenciation +
    blocRappelsEtMeta +
    blocCriteres +
    blocMiseEnPage +
    `IMPORTANT : Structure ta réponse en 2 parties :\n` +
    `1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="\n` +
    `2) "=== PARTIE 2 : RESSOURCE PRÊTE POUR L’ÉLÈVE ==="\n`
  );
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ProfsPage() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const makeInitialForm = useCallback((): PromptProf => {
    return {
      titre: "",
      objectifPedagogique: "",
      classe: "",
      matiere: "",
      niveau: "standard",
      type: "",
      contenu: "",
      tags: [],
      adaptationDYS: true,
      neuro: true,
      auteur: "",
      date: today,
      methode: "methode_active",
      outputStyle: "word_expert",
    };
  }, [today]);

  const [form, setForm] = useState<PromptProf>(() => makeInitialForm());
  const [rawTags, setRawTags] = useState("");

  // ✅ prompt EleveAI (à copier)
  const [promptInterne, setPromptInterne] = useState("");

  // ✅ sortie agent (ressource)
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");

  // copies
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedRessource, setCopiedRessource] = useState(false);

  // UI
  const [showPromptInterne, setShowPromptInterne] = useState(true); // on l’affiche plutôt par défaut désormais
  const [showMethode, setShowMethode] = useState(false);

  // ✅ signal vers SignupNudge (après génération OK, ou copie)
  const [nudgeSignal, setNudgeSignal] = useState(0);
  const triggerNudge = useCallback(() => setNudgeSignal((n) => n + 1), []);

  const handleChange = useCallback(
    (field: keyof PromptProf, value: any) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setAgentOutput("");
    setAgentError("");
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

  const appliquerPreset = useCallback(
    (key: ProfsPresetKey) => {
      const preset = PROFS_PRESETS[key];
      const v = preset.valeurs;

      setForm((prev) => {
        const base: PromptProf = {
          ...prev,
          ...v,
          // tags
          tags: v.tags ?? prev.tags,
          // valeurs ajoutées
          methode: (v.methode ?? prev.methode) as MethodePedagogique,
          outputStyle: (v.outputStyle ?? prev.outputStyle) as OutputStyle,
        } as PromptProf;

        if (base.classe === "3e" && !base.tags.includes("DNB")) {
          base.tags = [...base.tags, "DNB"];
        }
        return base;
      });

      if (v.tags) setRawTags(v.tags.join(", "));
      clearOutputs();
      setShowMethode(false);
    },
    [clearOutputs]
  );

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    setRawTags("");
    clearOutputs();
    setAgentLoading(false);
    setShowMethode(false);
  }, [clearOutputs, makeInitialForm]);

  const typesDisponibles = useMemo(() => {
    const communs = TYPES_COMMUNS;
    const specifiquesMatiere = form.matiere ? TYPES_PAR_MATIERE[form.matiere] || [] : [];

    let speciauxExamens: string[] = [];
    if (form.classe === "3e") speciauxExamens = TYPES_SPECIAUX_BREVET;
    else if (["Seconde", "Première", "Terminale"].includes(form.classe)) speciauxExamens = TYPES_SPECIAUX_BAC;

    return uniqueKeepOrder([...specifiquesMatiere, ...speciauxExamens, ...communs]);
  }, [form.matiere, form.classe]);

  const suggestions = useMemo(() => {
    const s: string[] = [];
    if (!form.objectifPedagogique.trim()) s.push("Précise l’objectif : ce que l’élève doit savoir faire.");
    if (!form.classe) s.push("Choisis une classe : le vocabulaire et les attendus seront meilleurs.");
    if (!form.matiere) s.push("Indique la matière : EleveAI restera dans le bon cadre.");
    if (!form.type) s.push("Choisis un type : ça fixe la structure (séance, fiche, évaluation…).");
    if (form.contenu.trim().length < 40) s.push("Consigne trop courte : ajoute durée, contraintes, exemple attendu.");
    if (s.length === 0) s.push("Parfait. Tu peux ajouter : durée, matériel, contraintes, exemple de production.");
    return s;
  }, [form]);

  // ✅ Génère le prompt interne (local), puis appelle l'agent (optionnel)
  const creerPromptEtRessource = useCallback(async () => {
    if (!form.contenu.trim()) {
      alert("Merci de remplir le texte de ta demande (version professeur).");
      return;
    }

    const prompt = construirePrompt(form);
    setPromptInterne(prompt);
    setAgentOutput("");
    setAgentError("");
    setCopiedPrompt(false);
    setCopiedRessource(false);

    // ⚠️ Ici on garde l'appel agent-prof (ressource)
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

      if (out) triggerNudge(); // génération OK => nudge
    } catch (err: any) {
      setAgentError(err?.message || "Erreur inconnue (vérifie le serveur / API).");
    } finally {
      setAgentLoading(false);
    }
  }, [form, triggerNudge]);

  const copierPrompt = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
      triggerNudge();
    } catch {
      alert("Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
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
      alert("Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  }, [agentOutput, triggerNudge]);

  const tchatHref = useMemo(() => {
    return promptInterne ? `/tchat?prompt=${encodeURIComponent(promptInterne)}` : "/tchat";
  }, [promptInterne]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs – Générateur de prompts + ressource</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Générateur de prompts profs (Word-friendly)
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Tu remplis le formulaire → EleveAI te construit un <b>prompt</b> très propre (à coller où tu veux),
            et peut aussi générer une <b>ressource</b> via l’agent.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <label className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
              <span>🧠</span>
              <span>Eduscol + neurosciences</span>
              <input
                type="checkbox"
                checked={form.neuro}
                onChange={(e) => handleChange("neuro", e.target.checked)}
                className="rounded border-gray-400"
              />
              <span>Activer</span>
            </label>

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
          </div>
        </header>

        <PresetCarousel
          title="Modèles rapides (facultatif)"
          subtitle="Clique sur un modèle : le formulaire se pré-remplit."
          items={PROFS_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as ProfsPresetKey)}
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
                    <option key={c} value={c}>
                      {c}
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
                    <option key={m} value={m}>
                      {m}
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

            {/* Style Word */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Style de rendu</label>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { id: "simple", title: "Simple", desc: "Texte propre, sans design.", badge: "Rapide" },
                  { id: "word", title: "Word", desc: "Titres + icônes + aération.", badge: "Recommandé" },
                  { id: "word_expert", title: "Word Expert", desc: "Bannières + encadrés + zones réponses.", badge: "🔥 Best" },
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

            {/* Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Type de ressource</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="">Choisir…</option>
                {typesDisponibles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-gray-500 mt-1">S’adapte à la matière + brevet (3e) + bac (lycée).</p>
            </div>

            {/* Méthode (compact + ouvrir/réduire) */}
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

              {/* Résumé */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold text-slate-800">
                  {getMethodeLabel(form.methode)}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  {getMethodeDesc(form.methode)}
                </p>
              </div>

              {/* Grille */}
              {showMethode && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {METHODE_OPTIONS.map((m) => (
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

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Titre (pour toi)</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Problèmes ouverts sur les fractions (6e)"
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
                placeholder="Ex : faire comprendre le sens des fractions…"
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
                placeholder="Ex : #fraction, #DYS, #coopération"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Pris en compte : <span className="font-semibold">{form.tags.join(", ")}</span>
                </p>
              )}
            </div>

            {/* DYS + date */}
            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={form.adaptationDYS}
                  onChange={(e) => handleChange("adaptationDYS", e.target.checked)}
                  className="rounded border-gray-400"
                />
                <span>Adapter DYS</span>
              </label>
              <div className="text-[11px] text-gray-500">
                Date : <span className="font-mono">{form.date}</span>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">Texte de ta demande (version prof)</label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder="Ex : Génère une activité clé en main…"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

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
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  agentLoading
                    ? "bg-sky-100 text-sky-500 cursor-not-allowed"
                    : "bg-[#0047B6] text-white hover:bg-[#003894]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {agentLoading ? "Génération..." : "Créer prompt + ressource"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            {/* Conseils */}
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

            {/* 3) PROMPT */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  3️⃣ Prompt EleveAI (à copier-coller)
                </h2>

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
                <p className="text-[11px] text-gray-600">
                  Coller dans :
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                  <Link
                    href={tchatHref}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Tchat EleveAI
                  </Link>

                  <a href="https://chatgpt.com" target="_blank" rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900">
                    🟦 ChatGPT
                  </a>
                  <a href="https://gemini.google.com" target="_blank" rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold hover:bg-[#0c7b45]">
                    🟩 Gemini
                  </a>
                  <a href="https://claude.ai" target="_blank" rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold hover:bg-[#372dcc]">
                    🟪 Claude
                  </a>
                  <a href="https://chat.mistral.ai" target="_blank" rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold hover:bg-[#e46f0d]">
                    🟧 Mistral
                  </a>
                </div>
              </div>
            </div>

            {/* 4) RESSOURCE AGENT */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  4️⃣ Ressource générée (agent IA)
                </h2>

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
                {agentLoading ? "Réflexion en cours..." : agentOutput ? <MarkdownMath>{agentOutput}</MarkdownMath> : "La ressource apparaîtra ici."}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ✅ NUDGE : discret, déclenché après actions (et timer possible) */}
      <SignupNudge
        storageKey="eleveai_nudge_profs_v1"
        actionSignal={nudgeSignal}
        minActionCount={0}
        trigger="both"
        delayMs={5 * 60 * 10}
        minInteractions={3}
        variant="bottom"
      />
    </main>
  );
}
