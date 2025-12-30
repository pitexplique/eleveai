// app/espace-atelier-IA/AtelierIAClient.tsx
"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";
import ToggleChip from "@/components/ToggleChip";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
  ArrowDown,
  MessageCircle,
} from "lucide-react";

type NiveauPublic = "college" | "lycee" | "tous";
type Duree = 15 | 30 | 45 | 60 | 90;

type ThemeAgir =
  | "eau"
  | "dechets"
  | "energie"
  | "biodiversite"
  | "risques"
  | "alimentation"
  | "mobilite"
  | "numerique"
  | "vivre_ensemble"
  | "sante"
  | "info_esprit_critique"
  | "territoire_patrimoine";

type TypeProduction =
  | "diagnostic"
  | "plan_action"
  | "debat"
  | "enquete"
  | "affiche"
  | "article"
  | "pitch"
  | "lettre_officielle"
  | "projet_classe"
  | "atelier_terrain";

type OutputStyle = "simple" | "word" | "word_expert";
type FeedbackChoice = "" | "ok" | "bof" | "pas_ok";

const THEMES: { id: ThemeAgir; label: string; hint: string; emoji: string }[] = [
  { id: "eau", label: "Eau", hint: "économies, pollution, accès, usages", emoji: "💧" },
  { id: "dechets", label: "Déchets", hint: "tri, réduction, recyclage, plastique", emoji: "🗑️" },
  { id: "energie", label: "Énergie", hint: "sobriété, renouvelables, efficacité", emoji: "⚡" },
  { id: "biodiversite", label: "Biodiversité", hint: "espèces, habitats, invasives", emoji: "🦎" },
  { id: "risques", label: "Risques naturels", hint: "cyclones, inondations, sécurité", emoji: "🌪️" },
  { id: "alimentation", label: "Alimentation", hint: "local, santé, agriculture", emoji: "🥗" },
  { id: "mobilite", label: "Mobilité", hint: "transport, sécurité, pollution", emoji: "🚌" },
  { id: "numerique", label: "Numérique", hint: "écrans, cyber, IA, usages", emoji: "📱" },
  { id: "vivre_ensemble", label: "Vivre ensemble", hint: "respect, harcèlement, inclusion", emoji: "🤝" },
  { id: "sante", label: "Santé & bien-être", hint: "sommeil, stress, activité", emoji: "🧘" },
  { id: "info_esprit_critique", label: "Info & esprit critique", hint: "fake news, biais, sources", emoji: "🧠" },
  { id: "territoire_patrimoine", label: "Territoire & patrimoine", hint: "commune, mémoire, culture", emoji: "🏝️" },
];

const PRODUCTIONS: { id: TypeProduction; label: string; hint: string; emoji: string }[] = [
  { id: "diagnostic", label: "Diagnostic", hint: "constat + causes + enjeux", emoji: "🔎" },
  { id: "plan_action", label: "Plan d’action", hint: "mesures concrètes + priorités", emoji: "🛠️" },
  { id: "debat", label: "Débat argumenté", hint: "pour/contre + arbitrage", emoji: "🎤" },
  { id: "enquete", label: "Enquête", hint: "questions + collecte + synthèse", emoji: "📋" },
  { id: "affiche", label: "Affiche / campagne", hint: "message + slogans + preuves", emoji: "🪧" },
  { id: "article", label: "Article", hint: "structure + sources + angles", emoji: "📰" },
  { id: "pitch", label: "Pitch 1 min", hint: "impact + solution + appel", emoji: "⚡" },
  { id: "lettre_officielle", label: "Lettre (mairie / établissement)", hint: "ton institutionnel", emoji: "✉️" },
  { id: "projet_classe", label: "Mini-projet", hint: "étapes + rôles + livrables", emoji: "🧩" },
  { id: "atelier_terrain", label: "Atelier terrain", hint: "observation + mesures + retour", emoji: "🌿" },
];

function blocWordDesign(style: OutputStyle) {
  if (style === "simple") return "";
  if (style === "word") {
    return (
      "Format de sortie obligatoire : document Word (copier-coller sans perte).\n" +
      "- Titres hiérarchisés clairs.\n" +
      "- Mise en page aérée : listes, lignes courtes, zones de réponse.\n" +
      "- Emoji simples au début des sections.\n" +
      "- Termine par : « ✅ Prêt à coller dans Word ».\n\n"
    );
  }
  return (
    "Format de sortie obligatoire : document Word EXPERT, très lisible.\n" +
    "- Bannières et encadrés simulés : À RETENIR / MÉTHODE / ERREUR / DÉFI.\n" +
    "- Ajoute des zones : « Réponse : __________________ ».\n" +
    "- Interdits : gros paragraphes.\n" +
    "- Termine par : « ✅ Prêt à coller dans Word ».\n\n"
  );
}

type AtelierForm = {
  titre: string;
  niveauPublic: NiveauPublic;
  duree: Duree;
  themes: ThemeAgir[];
  themeLocal: string; // ex: "La Réunion / Saint-Joseph / collège ..."
  production: TypeProduction;
  objectif: string;
  contraintes: string;

  // options
  traces: boolean; // prompt/réponse/amélioration
  antiTriche: boolean; // interdit le “fait à la place”
  dataChiffres: boolean; // demander données / ordres de grandeur
  terrain: boolean; // observation locale
  espritCritique: boolean; // vérifier, sources, incertitudes

  outputStyle: OutputStyle;
};

function construirePromptAtelier(form: AtelierForm) {
  const themesHumains = form.themes.map((t) => THEMES.find((x) => x.id === t)?.label ?? t);
  const prodLabel = PRODUCTIONS.find((p) => p.id === form.production)?.label ?? form.production;

  const blocCadre =
    "Cadre EleveAI (obligatoire) :\n" +
    "1) Une réponse IA n’est jamais une fin : elle doit être jugée et améliorée.\n" +
    "2) L’IA peut se tromper : signaler les incertitudes.\n" +
    "3) Le rendu final doit être personnel et expliqué.\n\n";

  const blocTraces = form.traces
    ? "TRACES OBLIGATOIRES :\n- Prompt utilisé\n- Réponse IA brute\n- Améliorations personnelles (ce qui a été corrigé et pourquoi)\n\n"
    : "";

  const blocAntiTriche = form.antiTriche
    ? "ANTI-TRICHE PÉDAGOGIQUE :\n- Ne fais pas “à la place”.\n- Pose des questions, propose une structure, donne des pistes.\n- Exige des choix justifiés.\n\n"
    : "";

  const blocCritique = form.espritCritique
    ? "ESPRIT CRITIQUE :\n- Donne 5 points à vérifier.\n- Propose 3 sources ou types de sources à consulter.\n- Sépare faits / hypothèses / opinions.\n\n"
    : "";

  const blocData = form.dataChiffres
    ? "DONNÉES / CHIFFRES :\n- Propose des ordres de grandeur.\n- Si tu inventes un chiffre, dis que c’est une estimation.\n- Propose comment mesurer/collecter des données.\n\n"
    : "";

  const blocTerrain = form.terrain
    ? "TERRAIN / LOCAL :\n- Propose une mini-sortie/observation/diagnostic local.\n- Indique quoi observer, comment noter, comment restituer.\n\n"
    : "";

  const blocWord = blocWordDesign(form.outputStyle);

  return (
    "Tu es une IA pédagogique encadrée (EleveAI). Tu aides des élèves à réfléchir et agir sur un thème de société.\n\n" +
    blocCadre +
    blocTraces +
    blocAntiTriche +
    blocCritique +
    blocData +
    blocTerrain +
    blocWord +
    `Public : ${form.niveauPublic}.\n` +
    `Durée cible : ${form.duree} minutes.\n` +
    `Thèmes : ${themesHumains.join(", ")}.\n` +
    (form.themeLocal?.trim() ? `Contexte local : ${form.themeLocal.trim()}.\n` : "") +
    `Type de production : ${prodLabel}.\n\n` +
    `Objectif : ${form.objectif || "(non précisé)"}\n` +
    (form.contraintes?.trim() ? `Contraintes : ${form.contraintes.trim()}\n` : "") +
    "\nTa mission :\n" +
    "1) Proposer une structure claire (étapes numérotées).\n" +
    "2) Donner un rendu prêt à utiliser en classe (consignes + production attendue).\n" +
    "3) Ajouter une section « Vérification & amélioration » (checklist + améliorations).\n\n" +
    "IMPORTANT : Structure ta réponse en 2 parties :\n" +
    '1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="\n' +
    '2) "=== PARTIE 2 : ACTIVITÉ PRÊTE POUR LA CLASSE ==="\n'
  );
}

function PasteTargets({ text, showToast }: { text: string; showToast: (msg: string) => void }) {
  const disabled = !text;
  const tchatHref = text ? `/tchat?prompt=${encodeURIComponent(text)}` : "/tchat";

  const copySilently = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast("✅ Copié ! Colle-le dans l’IA.");
    } catch {
      showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    }
  };

  return (
    <div className="space-y-2 pt-1">
      <p className="text-[11px] text-gray-600">Coller dans :</p>
      <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
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
          href="https://gemini.google.com"
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
          🟩 Gemini
        </a>

        <a
          href="https://claude.ai"
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
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#4B3FFF] text-white hover:bg-[#372dcc]"
          }`}
        >
          🟪 Claude
        </a>

        <a
          href="https://chat.mistral.ai"
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
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#FF7F11] text-white hover:bg-[#e46f0d]"
          }`}
        >
          🟧 Mistral
        </a>
      </div>
    </div>
  );
}

export default function AtelierIAClient() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const ressourceRef = useRef<HTMLDivElement | null>(null);
  const relanceRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = useCallback(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);
  const scrollToPrompt = useCallback(() => promptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);
  const scrollToRessource = useCallback(() => ressourceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);
  const scrollToRelance = useCallback(() => relanceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const makeInitialForm = useCallback((): AtelierForm => {
    return {
      titre: "",
      niveauPublic: "tous",
      duree: 45,
      themes: ["eau"],
      themeLocal: "La Réunion — contexte local : [commune / collège / quartier]",
      production: "plan_action",
      objectif: "Comprendre le problème, proposer des solutions réalistes, et justifier des choix.",
      contraintes: "Travail en groupe (3-4). Rendu final personnel + justification. Ton clair et concret.",
      traces: true,
      antiTriche: true,
      dataChiffres: true,
      terrain: true,
      espritCritique: true,
      outputStyle: "word_expert",
    };
  }, []);

  const [form, setForm] = useState<AtelierForm>(() => makeInitialForm());

  const [promptInterne, setPromptInterne] = useState("");
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedRessource, setCopiedRessource] = useState(false);
  const [showPromptInterne, setShowPromptInterne] = useState(true);

  // relance
  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackChoice>("");
  const [feedbackText, setFeedbackText] = useState("");
  const [promptRelance, setPromptRelance] = useState("");
  const [copiedRelance, setCopiedRelance] = useState(false);

  const handleChange = useCallback(<K extends keyof AtelierForm>(field: K, value: AtelierForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setAgentOutput("");
    setAgentError("");
    setCopiedPrompt(false);
    setCopiedRessource(false);
    setShowPromptInterne(true);
    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);
  }, []);

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    clearOutputs();
    showToast("🔄 Reset complet");
    setTimeout(() => scrollToTop(), 50);
  }, [clearOutputs, makeInitialForm, scrollToTop, showToast]);

  const toggleTheme = useCallback((id: ThemeAgir) => {
    setForm((prev) => {
      const has = prev.themes.includes(id);
      const nextThemes = has ? prev.themes.filter((t) => t !== id) : [...prev.themes, id];
      return { ...prev, themes: nextThemes.length ? nextThemes : ["eau"] };
    });
  }, []);

  const validation = useMemo(() => {
    const issues: string[] = [];
    if (!form.themes.length) issues.push("Choisis au moins 1 thème.");
    if (!form.production) issues.push("Choisis un type de production.");
    if (!form.objectif.trim()) issues.push("Précise l’objectif.");
    if (!form.contraintes.trim()) issues.push("Ajoute quelques contraintes (rendu attendu, groupe…).");
    return { ok: issues.length === 0, issues };
  }, [form]);

  const creerPromptEtRessource = useCallback(async () => {
    setAgentError("");
    if (!validation.ok) {
      showToast(`⚠️ ${validation.issues[0]}`);
      return;
    }

    const prompt = construirePromptAtelier(form);
    setPromptInterne(prompt);
    setAgentOutput("");
    setCopiedPrompt(false);
    setCopiedRessource(false);
    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);

    setAgentLoading(true);
    try {
      const res = await fetch("/api/agent-atelier-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'appel à l'agent IA.");

      setAgentOutput(data.output || "");
      showToast("✨ Généré !");
      setTimeout(() => scrollToPrompt(), 50);
      setTimeout(() => scrollToRessource(), 350);
    } catch (e: any) {
      setAgentError(e?.message || "Erreur inconnue.");
      showToast("⚠️ Erreur génération");
    } finally {
      setAgentLoading(false);
    }
  }, [form, scrollToPrompt, scrollToRessource, showToast, validation.ok, validation.issues]);

  const copierPrompt = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1200);
      showToast("✅ Prompt copié");
    } catch {
      showToast("⚠️ Copie impossible (Ctrl+C).");
    }
  }, [promptInterne, showToast]);

  const copierRessource = useCallback(async () => {
    if (!agentOutput) return;
    try {
      await navigator.clipboard.writeText(agentOutput);
      setCopiedRessource(true);
      setTimeout(() => setCopiedRessource(false), 1200);
      showToast("✅ Ressource copiée");
    } catch {
      showToast("⚠️ Copie impossible (Ctrl+C).");
    }
  }, [agentOutput, showToast]);

  const buildRelanceBloc = useCallback(() => {
    const free = feedbackText.trim();

    const intentByChoice: Record<Exclude<FeedbackChoice, "">, string> = {
      ok:
        "Objectif : finaliser.\n- Propose une V2 plus claire, plus actionnable.\n- Ajoute une checklist “preuves / faisabilité / impacts”.\n- Termine par un plan de restitution (oral, affiche, doc).",
      bof:
        "Objectif : simplifier et clarifier.\n- Reprends en version plus simple.\n- Ajoute des exemples concrets et des micro-étapes.\n- Propose 2 variantes (A/B) si nécessaire.",
      pas_ok:
        "Objectif : vérifier et sécuriser.\n- Liste ce qui est incertain, discutable, ou risqué.\n- Corrige avec hypothèses explicites.\n- Termine par une version corrigée V2.",
    };

    const addUserNote = free ? `\n\nNote utilisateur : "${free}"\n` : "";

    return (
      "Tu vas améliorer une activité ‘Agir sur le monde’.\n\n" +
      "=== PROMPT 1 ===\n-----\n" +
      promptInterne +
      "\n-----\n\n" +
      "=== SORTIE (activité) ===\n-----\n" +
      (agentOutput || "(aucune sortie — produire une V2 à partir du prompt)") +
      "\n-----\n\n" +
      intentByChoice[feedbackChoice as Exclude<FeedbackChoice, "">] +
      addUserNote +
      "\n\nRègles : indique les incertitudes, propose des vérifications, et termine par une checklist."
    );
  }, [agentOutput, feedbackChoice, feedbackText, promptInterne]);

  const buildRelancePrompt = useCallback(() => {
    if (!promptInterne) return showToast("⚠️ Génère d’abord.");
    if (!feedbackChoice) return showToast("⚠️ Choisis ton avis.");
    setPromptRelance(buildRelanceBloc());
    setCopiedRelance(false);
    showToast("🔁 Relance générée !");
    setTimeout(() => scrollToRelance(), 80);
  }, [buildRelanceBloc, feedbackChoice, promptInterne, scrollToRelance, showToast]);

  const copierRelance = useCallback(async () => {
    if (!promptRelance) return;
    try {
      await navigator.clipboard.writeText(promptRelance);
      setCopiedRelance(true);
      setTimeout(() => setCopiedRelance(false), 1200);
      showToast("✅ Relance copiée");
    } catch {
      showToast("⚠️ Copie impossible (Ctrl+C).");
    }
  }, [promptRelance, showToast]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-8">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
            <span>🧪</span>
            <span>Atelier-IA · Agir sur le monde</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">
            Moulinette “Agir sur le monde” (prompts encadrés)
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Tu choisis un <b>thème</b> + un <b>type de production</b> (plan d’action, débat, enquête…).
            EleveAI génère un <b>prompt</b> et une <b>activité prête</b>, avec traces et esprit critique.
          </p>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-900">
              <span className="font-extrabold">Règle EleveAI :</span> Une réponse IA n’est jamais une fin : elle doit être{" "}
              <span className="font-semibold">jugée et améliorée</span>.
            </p>
            <p className="text-[11px] text-emerald-900/80 mt-1">
              Traces + vérification + amélioration personnelle → pas “fait à la place”.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <ToggleChip
              label="Traces"
              checked={form.traces}
              onChange={(v) => handleChange("traces", v)}
              hint="Prompt + réponse IA + améliorations personnelles."
              tone="emerald"
              icon={<span>🧾</span>}
            />
            <ToggleChip
              label="Anti-triche"
              checked={form.antiTriche}
              onChange={(v) => handleChange("antiTriche", v)}
              hint="L’IA ne fait pas à la place."
              tone="violet"
              icon={<span>🔒</span>}
            />
            <ToggleChip
              label="Esprit critique"
              checked={form.espritCritique}
              onChange={(v) => handleChange("espritCritique", v)}
              hint="Vérifications + sources + incertitudes."
              tone="emerald"
              icon={<span>🧠</span>}
            />
            <ToggleChip
              label="Données/chiffres"
              checked={form.dataChiffres}
              onChange={(v) => handleChange("dataChiffres", v)}
              hint="Ordres de grandeur + mesures."
              tone="sky"
              icon={<span>📊</span>}
            />
            <ToggleChip
              label="Terrain/local"
              checked={form.terrain}
              onChange={(v) => handleChange("terrain", v)}
              hint="Observation locale, restitution."
              tone="sky"
              icon={<span>🏝️</span>}
            />

            <button
              type="button"
              onClick={resetPage}
              disabled={agentLoading}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                agentLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">1️⃣ Choix de l’activité</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Public</label>
                <select
                  value={form.niveauPublic}
                  onChange={(e) => handleChange("niveauPublic", e.target.value as NiveauPublic)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="tous">Collège + Lycée</option>
                  <option value="college">Collège</option>
                  <option value="lycee">Lycée</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Durée</label>
                <select
                  value={form.duree}
                  onChange={(e) => handleChange("duree", Number(e.target.value) as Duree)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {[15, 30, 45, 60, 90].map((d) => (
                    <option key={d} value={d}>
                      {d} min
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Style</label>
                <select
                  value={form.outputStyle}
                  onChange={(e) => handleChange("outputStyle", e.target.value as OutputStyle)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="simple">Simple</option>
                  <option value="word">Word</option>
                  <option value="word_expert">Word Expert</option>
                </select>
              </div>
            </div>

            {/* THEMES */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Thèmes (Agir sur le monde)</label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((t) => {
                  const active = form.themes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTheme(t.id)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                        active ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                      title={t.hint}
                    >
                      {t.emoji} {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-semibold text-gray-600">Contexte local (facultatif)</label>
                <input
                  value={form.themeLocal}
                  onChange={(e) => handleChange("themeLocal", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Ex : La Réunion — Saint-Joseph — collège — quartier…"
                />
              </div>
            </div>

            {/* PRODUCTION */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Type de production</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {PRODUCTIONS.map((p) => {
                  const active = form.production === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleChange("production", p.id)}
                      className={`text-left border rounded-xl px-3 py-3 text-xs sm:text-[13px] transition ${
                        active ? "border-emerald-700 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white hover:border-emerald-200"
                      }`}
                      title={p.hint}
                    >
                      <div className="font-semibold text-slate-800">
                        {p.emoji} {p.label}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">{p.hint}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OBJECTIF / CONTRAINTES */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Objectif</label>
              <textarea
                value={form.objectif}
                onChange={(e) => handleChange("objectif", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex : comprendre le problème + proposer 3 solutions réalistes + justifier."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Contraintes / consigne initiale</label>
              <textarea
                value={form.contraintes}
                onChange={(e) => handleChange("contraintes", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[110px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex : travail en groupe, restitution orale, pas de copier-coller, preuves, sources…"
              />
            </div>

            {!validation.ok && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                <p className="text-xs font-semibold text-rose-800">⚠️ {validation.issues[0]}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetPage}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  agentLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={creerPromptEtRessource}
                disabled={agentLoading || !validation.ok}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  agentLoading || !validation.ok ? "bg-emerald-100 text-emerald-500 cursor-not-allowed" : "bg-emerald-700 text-white hover:bg-emerald-800"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {agentLoading ? "Génération..." : "Créer prompt + activité"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            {/* PROMPT */}
            <div ref={promptRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-emerald-800">2️⃣ Prompt (à copier-coller)</h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copierPrompt}
                    disabled={!promptInterne}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      promptInterne ? "bg-slate-800 text-white hover:bg-slate-900" : "bg-slate-200 text-slate-500 cursor-not-allowed"
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
                <textarea readOnly value={promptInterne} className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[220px]" />
              )}

              <PasteTargets text={promptInterne} showToast={showToast} />

              {!!promptInterne && (
                <button
                  type="button"
                  onClick={scrollToRessource}
                  className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900"
                >
                  <ArrowDown className="w-4 h-4" />
                  Aller à l’activité
                </button>
              )}
            </div>

            {/* RESSOURCE */}
            <div ref={ressourceRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-emerald-800">3️⃣ Activité générée</h2>

                <button
                  type="button"
                  onClick={copierRessource}
                  disabled={!agentOutput}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    agentOutput ? "bg-slate-800 text-white hover:bg-slate-900" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copiedRessource ? "Copié" : "Copier"}
                </button>
              </div>

              {agentError && <p className="text-xs text-red-600">⚠️ {agentError}</p>}

              <div className="eleveai-math border rounded p-3 min-h-[180px] bg-slate-50 text-sm whitespace-pre-wrap">
                {agentLoading ? "Réflexion en cours..." : agentOutput ? <MarkdownMath>{agentOutput}</MarkdownMath> : "L’activité apparaîtra ici."}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!promptInterne) return showToast("⚠️ Génère d’abord le prompt.");
                  showToast("💡 Donne un avis pour générer le Prompt 2.");
                  setTimeout(() => scrollToRelance(), 120);
                }}
                disabled={!promptInterne}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border transition ${
                  promptInterne ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-50" : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Améliorer / vérifier (Prompt 2)
              </button>
            </div>

            {/* RELANCE */}
            <div ref={relanceRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-emerald-800">4️⃣ Avis + relance (Prompt 2)</h2>

              <div className="grid sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackChoice("ok")}
                  disabled={!promptInterne}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "ok" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  ✅ C’est bon
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackChoice("bof")}
                  disabled={!promptInterne}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "bof" ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  🤔 Moyen
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackChoice("pas_ok")}
                  disabled={!promptInterne}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "pas_ok" ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  ❌ Risqué
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Optionnel : une précision</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  disabled={!promptInterne}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                  placeholder="Ex : je veux plus local / plus simple / un débat mieux cadré / plus de données…"
                />
              </div>

              <button
                type="button"
                onClick={buildRelancePrompt}
                disabled={!promptInterne || !feedbackChoice}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  promptInterne && feedbackChoice ? "bg-emerald-700 text-white hover:bg-emerald-800" : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
                }`}
              >
                🔁 Générer une relance adaptée
              </button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">🔁 Prompt 2</p>
                    <p className="text-[11px] text-slate-600">À coller dans une IA pour améliorer / simplifier / vérifier.</p>
                  </div>

                  <button
                    type="button"
                    onClick={copierRelance}
                    disabled={!promptRelance}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      promptRelance ? "bg-slate-900 text-white hover:bg-slate-950" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copiedRelance ? "Copié" : "Copier"}
                  </button>
                </div>

                <textarea readOnly value={promptRelance} className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-white min-h-[180px]" />

                <PasteTargets text={promptRelance} showToast={showToast} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
