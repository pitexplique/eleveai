// app/espace-atelier-IA/AtelierIAClient.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ToggleChip from "@/components/ToggleChip";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
  ArrowDown,
  MessageCircle,
  Check,
  ExternalLink,
  Search,
} from "lucide-react";

/* -------------------------------------------------------
   Types
------------------------------------------------------- */
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

type FeedbackChoice = "" | "ok" | "bof" | "pas_ok";

type Audience = "profs" | "eleves" | "parents" | "admin" | "viescolaire";
type Niveau = "ulis" | "remediation" | "basique" | "standard" | "expert";

type DbPresetEleveai = {
  id: string;
  audience: Audience;
  classe: string;
  matiere: string;
  niveau: Niveau;
  title: string;
  description: string;
  tags: string[];
  payload: any; // jsonb
};

type AtelierForm = {
  // ✅ Objectif = titre du preset (auto)
  objectif: string;

  // ✅ Contenu = prompt base venant de Supabase (auto)
  contenu: string;

  // ✅ Thèmes "Agir sur le monde" : servent à améliorer le prompt final
  themes: ThemeAgir[];
  themeLocal: string;

  traces: boolean;
  antiTriche: boolean;
  dataChiffres: boolean;
  terrain: boolean;
  espritCritique: boolean;
};

/* -------------------------------------------------------
   Constantes
------------------------------------------------------- */
const MATIERE_ATELIER = "Atelier-IA";
const CLASSES_ATELIER = ["6e", "5e", "4e", "3e", "Seconde", "Première", "Terminale"] as const;

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

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */
function parseSearchParams() {
  if (typeof window === "undefined") return { presetId: null as string | null };
  const sp = new URLSearchParams(window.location.search);
  return { presetId: sp.get("preset") };
}

function safeString(v: any) {
  if (typeof v === "string") return v;
  return "";
}

/**
 * 🔑 On récupère "le prompt de Supabase".
 * On tente plusieurs clés de payload (au cas où), sans jamais utiliser presets_eleveai.data (inexistant).
 */
function extractPromptFromPayload(payload: any): string {
  if (!payload || typeof payload !== "object") return "";
  return (
    safeString(payload.prompt) ||
    safeString(payload.prompt_base) ||
    safeString(payload.prompt_ia) ||
    safeString(payload.promptInterne) ||
    safeString(payload.prompt_template) ||
    ""
  );
}

/* -------------------------------------------------------
   Construction prompt final
   - Base = form.contenu (vient de Supabase)
   - Ajouts = thèmes + options
------------------------------------------------------- */
function construirePromptFinal(form: AtelierForm) {
  const themesHumains = form.themes.map((t) => THEMES.find((x) => x.id === t)?.label ?? t);

  const base = (form.contenu || "").trim();

  const blocCadre =
    "=== AJOUT EleveAI (amélioration du prompt) ===\n" +
    "Cadre EleveAI :\n" +
    "1) Une réponse IA n’est jamais une fin : elle doit être jugée et améliorée.\n" +
    "2) L’IA peut se tromper : signaler les incertitudes.\n" +
    "3) Le rendu final doit être personnel et expliqué.\n";

  const blocThemes =
    (themesHumains.length ? `\nThèmes (Agir sur le monde) : ${themesHumains.join(", ")}\n` : "\n") +
    (form.themeLocal?.trim() ? `Contexte local : ${form.themeLocal.trim()}\n` : "");

  const blocTraces = form.traces
    ? "\nTRACES OBLIGATOIRES :\n- Prompt utilisé\n- Réponse IA brute\n- Améliorations personnelles (ce qui a été corrigé et pourquoi)\n"
    : "";

  const blocAntiTriche = form.antiTriche
    ? "\nANTI-TRICHE :\n- Ne fais pas à la place.\n- Pose des questions + propose une structure.\n- Exige des choix justifiés.\n"
    : "";

  const blocCritique = form.espritCritique
    ? "\nESPRIT CRITIQUE :\n- Donne 5 points à vérifier.\n- Propose 3 sources ou types de sources.\n- Sépare faits / hypothèses / opinions.\n"
    : "";

  const blocData = form.dataChiffres
    ? "\nDONNÉES / CHIFFRES :\n- Propose des ordres de grandeur.\n- Si tu estimes, dis que c’est une estimation.\n- Propose comment mesurer/collecter.\n"
    : "";

  const blocTerrain = form.terrain
    ? "\nTERRAIN / LOCAL :\n- Propose une mini-observation/diagnostic local.\n- Indique quoi observer, comment noter, comment restituer.\n"
    : "";

  const blocObjectif = form.objectif?.trim()
    ? `\nOBJECTIF (titre du preset) : ${form.objectif.trim()}\n`
    : "\n";

  // Si le prompt Supabase est vide, on laisse un message clair
  if (!base) {
    return (
      "⚠️ Aucun prompt trouvé dans payload (ex: payload.prompt).\n" +
      "Ajoute un champ payload.prompt dans tes presets, ou colle le prompt dans le champ 'Contenu'.\n\n" +
      blocCadre +
      blocObjectif +
      blocThemes +
      blocTraces +
      blocAntiTriche +
      blocCritique +
      blocData +
      blocTerrain
    );
  }

  return (
    "=== PROMPT (base Supabase) ===\n" +
    base +
    "\n\n" +
    blocCadre +
    blocObjectif +
    blocThemes +
    blocTraces +
    blocAntiTriche +
    blocCritique +
    blocData +
    blocTerrain
  );
}

/* -------------------------------------------------------
   UI : Boutons "Coller dans"
------------------------------------------------------- */
function PasteTargets({ text, showToast }: { text: string; showToast: (msg: string) => void }) {
  const disabled = !text;
  const tchatHref = text ? `/tchat?prompt=${encodeURIComponent(text)}` : "/tchat";

  const copySilently = async () => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const openAndCopy = async (url: string, label: string) => {
    if (disabled) return;
    const ok = await copySilently();
    if (ok) showToast(`✅ Copié ! Ouverture ${label}…`);
    else showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    window.open(url, "_blank", "noopener,noreferrer");
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
            disabled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          🚀 Tchat EleveAI
        </Link>

        <button
          type="button"
          onClick={() => openAndCopy("https://chatgpt.com", "ChatGPT")}
          disabled={disabled}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-800 text-white hover:bg-slate-900"
          }`}
        >
          🟦 ChatGPT
        </button>

        <button
          type="button"
          onClick={() => openAndCopy("https://www.perplexity.ai/", "Perplexity")}
          disabled={disabled}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#0F9D58] text-white hover:bg-[#0c7b45]"
          }`}
        >
          🟩 Perplexity
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Main
------------------------------------------------------- */
export default function AtelierIAClient() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const relanceRef = useRef<HTMLDivElement | null>(null);
  const contenuRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToTop = useCallback(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);
  const scrollToPrompt = useCallback(() => promptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);
  const scrollToRelance = useCallback(
    () => relanceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    []
  );

  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const makeInitialForm = useCallback((): AtelierForm => {
    return {
      objectif: "", // sera mis = titre preset
      contenu: "", // sera mis = prompt Supabase (payload.prompt)
      themes: ["eau"],
      themeLocal: "La Réunion — contexte local : [commune / collège / quartier]",
      traces: true,
      antiTriche: true,
      dataChiffres: true,
      terrain: true,
      espritCritique: true,
    };
  }, []);

  const [form, setForm] = useState<AtelierForm>(() => makeInitialForm());

  const autoResize = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize(contenuRef.current);
  }, [form.contenu]);

  // ✅ Sorties locales
  const [promptInterne, setPromptInterne] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptInterne, setShowPromptInterne] = useState(true);

  // ✅ Option : coller la réponse IA reçue (pour relance)
  const [reponseIA, setReponseIA] = useState("");

  // relance
  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackChoice>("");
  const [feedbackText, setFeedbackText] = useState("");
  const [promptRelance, setPromptRelance] = useState("");
  const [copiedRelance, setCopiedRelance] = useState(false);

  // Presets (tableau en haut) + recherche
  const [presetLoaded, setPresetLoaded] = useState<DbPresetEleveai | null>(null);
  const [presets, setPresets] = useState<DbPresetEleveai[]>([]);
  const [presetsLoading, setPresetsLoading] = useState(false);

  const [presetClasse, setPresetClasse] = useState<(typeof CLASSES_ATELIER)[number]>("6e");
  const [presetAudience, setPresetAudience] = useState<Audience>("profs");
  const [searchText, setSearchText] = useState("");

  const filteredPresets = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return presets;
    return presets.filter((p) => {
      const inTitle = (p.title ?? "").toLowerCase().includes(q);
      const inTags = Array.isArray(p.tags) && p.tags.some((t) => (t ?? "").toLowerCase().includes(q));
      return inTitle || inTags;
    });
  }, [presets, searchText]);

  const handleChange = useCallback(<K extends keyof AtelierForm>(field: K, value: AtelierForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setCopiedPrompt(false);
    setShowPromptInterne(true);
    setReponseIA("");
    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);
  }, []);

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    setPresetLoaded(null);
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
    if (!form.contenu.trim()) issues.push("Contenu vide : il faut un prompt dans payload.prompt (ou coller manuellement).");
    // objectif vient du preset ; on ne bloque pas si vide, mais c’est mieux
    return { ok: issues.length === 0, issues };
  }, [form]);

  // ✅ Génération locale du prompt final (base Supabase + amélioration par thèmes/options)
  const genererPrompt = useCallback(() => {
    if (!validation.ok) {
      showToast(`⚠️ ${validation.issues[0]}`);
      return;
    }
    const prompt = construirePromptFinal(form);
    setPromptInterne(prompt);

    // reset relance
    setReponseIA("");
    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);

    showToast("✨ Prompt généré !");
    setTimeout(() => scrollToPrompt(), 80);
  }, [form, scrollToPrompt, showToast, validation.ok, validation.issues]);

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

  // boutons ouvrir + copier
  const openChatGPT = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      showToast("✅ Copié ! Ouverture ChatGPT…");
    } catch {
      showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    }
    window.open("https://chatgpt.com", "_blank", "noopener,noreferrer");
  }, [promptInterne, showToast]);

  const openPerplexity = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      showToast("✅ Copié ! Ouverture Perplexity…");
    } catch {
      showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    }
    window.open("https://www.perplexity.ai/", "_blank", "noopener,noreferrer");
  }, [promptInterne, showToast]);

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

    const blocReponseIA = reponseIA.trim()
      ? "\n\n=== RÉPONSE IA REÇUE ===\n-----\n" + reponseIA.trim() + "\n-----\n"
      : "\n\n(Optionnel) Si tu as une réponse IA, colle-la ici avant de générer la relance.\n";

    return (
      "Tu vas améliorer une activité ‘Agir sur le monde’.\n\n" +
      "=== PROMPT UTILISÉ ===\n-----\n" +
      promptInterne +
      "\n-----\n" +
      blocReponseIA +
      "\n" +
      intentByChoice[feedbackChoice as Exclude<FeedbackChoice, "">] +
      addUserNote +
      "\n\nRègles : indique les incertitudes, propose des vérifications, et termine par une checklist."
    );
  }, [feedbackChoice, feedbackText, promptInterne, reponseIA]);

  const buildRelancePrompt = useCallback(() => {
    if (!promptInterne) return showToast("⚠️ Génère d’abord le prompt.");
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

  // -------------------------------------------------------
  // Presets : fetch + load preset
  // -------------------------------------------------------
  const fetchPresets = useCallback(async () => {
    setPresetsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("presets_eleveai")
        .select("id,audience,classe,matiere,niveau,title,description,tags,payload")
        .eq("matiere", MATIERE_ATELIER)
        .eq("niveau", "standard")
        .eq("is_archived", false)
        .eq("classe", presetClasse)
        .eq("audience", presetAudience)
        .order("title", { ascending: true })
        .limit(250);

      if (error) {
        showToast("⚠️ Impossible de charger les presets");
        setPresets([]);
        return;
      }
      setPresets((data as DbPresetEleveai[]) ?? []);
    } finally {
      setPresetsLoading(false);
    }
  }, [presetAudience, presetClasse, showToast]);

  const loadPresetById = useCallback(
    async (presetId: string) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("presets_eleveai")
          .select("id,audience,classe,matiere,niveau,title,description,tags,payload")
          .eq("id", presetId)
          .single();

        if (error || !data) {
          showToast("⚠️ Preset introuvable");
          return;
        }

        const p = data as DbPresetEleveai;
        setPresetLoaded(p);

        const promptSupabase = extractPromptFromPayload(p.payload);

        setForm((prev) => ({
          ...prev,
          // ✅ mets le titre du preset dans objectif
          objectif: p.title ?? "",
          // ✅ contenu = prompt de Supabase (payload.prompt)
          contenu: promptSupabase || prev.contenu || "",
        }));

        clearOutputs();
        showToast(promptSupabase ? "✅ Preset chargé (prompt OK)" : "⚠️ Preset chargé (prompt manquant dans payload)");
        setTimeout(() => scrollToTop(), 50);
      } catch {
        showToast("⚠️ Erreur chargement preset");
      }
    },
    [clearOutputs, scrollToTop, showToast]
  );

  // au premier rendu : si ?preset=... on le charge
  useEffect(() => {
    const { presetId } = parseSearchParams();
    if (presetId) loadPresetById(presetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // quand audience/classe changent : refresh presets
  useEffect(() => {
    fetchPresets();
  }, [fetchPresets]);

  const openPresetInUrl = useCallback((id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("preset", id);
    window.history.pushState({}, "", url.toString());
  }, []);

  const onPickPreset = useCallback(
    (p: DbPresetEleveai) => {
      openPresetInUrl(p.id);
      loadPresetById(p.id);
    },
    [loadPresetById, openPresetInUrl]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div ref={topRef} className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-6 lg:py-10">
        {/* -------------------------------------------------------
            PRESETS TABLE (en haut) + recherche
           ------------------------------------------------------- */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/95 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-600">Presets (Supabase)</p>
              <h2 className="text-lg font-extrabold text-emerald-800">Atelier-IA · Presets</h2>
              <p className="text-xs text-slate-600">
                Filtrés par <b>classe</b> + <b>audience</b> (matière = Atelier-IA, niveau = standard).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Classe</label>
                <select
                  value={presetClasse}
                  onChange={(e) => setPresetClasse(e.target.value as any)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {CLASSES_ATELIER.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Audience</label>
                <select
                  value={presetAudience}
                  onChange={(e) => setPresetAudience(e.target.value as Audience)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="profs">profs</option>
                  <option value="eleves">eleves</option>
                  <option value="parents">parents</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Titre ou tags…"
                    className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-bold text-slate-700">Titre</th>
                  <th className="px-4 py-3 font-bold text-slate-700">Tags</th>
                  <th className="px-4 py-3 font-bold text-slate-700 w-[130px]">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {presetsLoading && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-slate-600">
                      Chargement…
                    </td>
                  </tr>
                )}

                {!presetsLoading && filteredPresets.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-slate-600">
                      Aucun preset.
                    </td>
                  </tr>
                )}

                {!presetsLoading &&
                  filteredPresets.map((p) => (
                    <tr key={p.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{p.title}</div>
                        <div className="text-xs text-slate-500">
                          {p.description?.slice(0, 110)}
                          {p.description?.length > 110 ? "…" : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(p.tags ?? []).slice(0, 8).map((t, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => onPickPreset(p)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {presetLoaded && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-900">
                <span className="font-extrabold">Preset actif :</span> {presetLoaded.title}
              </p>
              <p className="text-[11px] text-emerald-900/80 mt-1">
                Audience: {presetLoaded.audience} · Classe: {presetLoaded.classe} · Matière: {presetLoaded.matiere}
              </p>
            </div>
          )}
        </section>

        {/* -------------------------------------------------------
            HEADER
           ------------------------------------------------------- */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
            <span>🧪</span>
            <span>Atelier-IA · Agir sur le monde</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Générateur de prompt (base Supabase)</h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Le <b>prompt de base</b> vient de Supabase (payload.prompt). Les <b>thèmes</b> et options servent à
            <b> améliorer</b> le prompt final.
          </p>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-900">
              <span className="font-extrabold">Règle EleveAI :</span> une réponse IA n’est jamais une fin : elle doit
              être <span className="font-semibold">jugée et améliorée</span>.
            </p>
            <p className="text-[11px] text-emerald-900/80 mt-1">Traces + vérification + amélioration personnelle → pas “fait à la place”.</p>
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">1️⃣ Améliorations (thèmes)</h2>

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
                      {t.emoji} {t.label} {active && <Check className="inline ml-1 w-3 h-3" />}
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

            {/* OBJECTIF = titre preset */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Objectif (titre du preset)</label>
              <input
                value={form.objectif}
                readOnly
                className="w-full border rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-800"
                placeholder="Sélectionne un preset (le titre se mettra ici)."
              />
            </div>

            {/* CONTENU = prompt supabase */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Contenu (prompt base Supabase)</label>
              <textarea
                ref={contenuRef}
                value={form.contenu}
                onChange={(e) => {
                  // ✅ tu peux laisser éditable si besoin (au cas où payload.prompt manque)
                  handleChange("contenu", e.target.value);
                  autoResize(e.currentTarget);
                }}
                onFocus={(e) => autoResize(e.currentTarget)}
                className="w-full border rounded-lg px-3 py-2 text-[12px] font-mono bg-white resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-200 min-h-[220px]"
                placeholder="Doit venir de payload.prompt (Supabase). Si vide, ajoute payload.prompt dans tes presets."
              />
              <p className="text-[11px] text-slate-500">
                Attendu : <b>payload.prompt</b> (ou prompt_base / prompt_ia / promptInterne).
              </p>
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={genererPrompt}
                disabled={!validation.ok}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  !validation.ok ? "bg-emerald-100 text-emerald-500 cursor-not-allowed" : "bg-emerald-700 text-white hover:bg-emerald-800"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Générer le prompt final
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            {/* PROMPT */}
            <div ref={promptRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-emerald-800">2️⃣ Prompt final (base + améliorations)</h2>

                <div className="flex items-center gap-2 flex-wrap">
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
                    onClick={openChatGPT}
                    disabled={!promptInterne}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      promptInterne ? "bg-slate-900 text-white hover:bg-black" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                    title="Copie le prompt puis ouvre ChatGPT"
                  >
                    <ExternalLink className="w-4 h-4" />
                    ChatGPT
                  </button>

                  <button
                    type="button"
                    onClick={openPerplexity}
                    disabled={!promptInterne}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      promptInterne ? "bg-emerald-700 text-white hover:bg-emerald-800" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                    title="Copie le prompt puis ouvre Perplexity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Perplexity
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
                  className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[260px]"
                  placeholder="Le prompt final apparaîtra ici."
                />
              )}

              <PasteTargets text={promptInterne} showToast={showToast} />

              {!!promptInterne && (
                <button
                  type="button"
                  onClick={() => {
                    showToast("💡 Colle le prompt dans une IA, puis colle la réponse IA ci-dessous.");
                    setTimeout(() => scrollToRelance(), 150);
                  }}
                  className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900"
                >
                  <ArrowDown className="w-4 h-4" />
                  Aller à “Améliorer / vérifier”
                </button>
              )}
            </div>

            {/* RELANCE */}
            <div ref={relanceRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-emerald-800">3️⃣ Améliorer / vérifier (Prompt 2)</h2>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                ✅ Colle ici la <b>réponse IA</b> (optionnel), puis génère une relance plus intelligente.
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Réponse IA reçue (optionnel)</label>
                <textarea
                  value={reponseIA}
                  onChange={(e) => setReponseIA(e.target.value)}
                  disabled={!promptInterne}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[120px] bg-white"
                />
              </div>

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
                <MessageCircle className="w-4 h-4" />
                Générer la relance (Prompt 2)
              </button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">🔁 Prompt 2</p>
                    <p className="text-[11px] text-slate-600">À coller dans une IA pour améliorer / sécuriser.</p>
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

                <textarea
                  readOnly
                  value={promptRelance}
                  className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-white min-h-[180px]"
                  placeholder="Le Prompt 2 apparaîtra ici."
                />

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
