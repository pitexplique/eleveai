// app/espace-atelier-IA/AtelierIAClient.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ToggleChip from "@/components/ToggleChip";

import {
  ClipboardCopy,
  RotateCcw,
  Eye,
  EyeOff,
  ArrowDown,
  Check,
  ExternalLink,
} from "lucide-react";

type Audience = "profs" | "eleves" | "parents";
type Classe = "6e" | "5e" | "4e" | "3e" | "Seconde" | "Première" | "Terminale";
type Niveau = "standard";

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

const CLASSES: Classe[] = ["6e", "5e", "4e", "3e", "Seconde", "Première", "Terminale"];

type DbPreset = {
  id: string;
  created_at?: string;
  updated_at?: string;
  audience: Audience;
  classe: string;
  matiere: string;
  niveau: Niveau;
  title: string;
  description: string;
  tags: string[];
  is_featured: boolean;
  featured_rank: number | null;
  payload: any; // jsonb
  is_archived: boolean;
};

function safeString(v: unknown): string {
  if (typeof v === "string") return v;
  return "";
}

function getActiveDeroule(payload: any, audience: Audience) {
  if (!payload || typeof payload !== "object") return null;
  if (audience === "profs") return payload.deroule_prof ?? null;
  if (audience === "eleves") return payload.deroule_eleve ?? null;
  return payload.deroule_parent ?? payload.deroule_parents ?? null;
}

function extractPromptBaseFromPayload(payload: any): string {
  if (!payload || typeof payload !== "object") return "";
  // si tu ajoutes plus tard un champ explicite, il sera pris ici
  return (
    safeString(payload.prompt) ||
    safeString(payload.prompt_base) ||
    safeString(payload.prompt_ia) ||
    safeString(payload.promptInterne) ||
    ""
  );
}

function reconstructPromptBase(preset: DbPreset): string {
  const payload = preset.payload ?? {};
  const programme = payload.programme ?? {};
  const attentes: string[] = Array.isArray(payload.attentes_age) ? payload.attentes_age : [];
  const antiTriche: string[] = Array.isArray(payload.anti_triche) ? payload.anti_triche : [];
  const ia = payload.ia_autorisee ?? {};
  const deroule = getActiveDeroule(payload, preset.audience);

  const theme = safeString(programme.theme) || "";
  const capacite = safeString(programme.capacite_code) || "";
  const age = safeString(payload.age_tranche) || "";

  const lines: string[] = [];

  lines.push("Tu es une IA pédagogique encadrée (EleveAI).");
  lines.push("Cadre : l’IA aide, l’élève produit un rendu personnel. Copier-coller interdit.");
  lines.push("");

  lines.push(`Contexte : ${preset.classe} — Atelier-IA.`);
  if (theme) lines.push(`Thème : ${theme}.`);
  if (capacite) lines.push(`Capacité / code : ${capacite}.`);
  if (age) lines.push(`Tranche d’âge : ${age}.`);
  lines.push("");

  if (attentes.length) {
    lines.push("Attentes (âge / niveau) :");
    for (const a of attentes) lines.push(`- ${a}`);
    lines.push("");
  }

  if (antiTriche.length) {
    lines.push("Anti-triche (obligatoire) :");
    for (const a of antiTriche) lines.push(`- ${a}`);
    lines.push("");
  }

  // Déroulé
  if (deroule && typeof deroule === "object") {
    const etapes = Array.isArray(deroule.etapes) ? deroule.etapes : [];
    if (etapes.length) {
      lines.push("Déroulé (résumé) :");
      for (const e of etapes) {
        const n = e?.n ?? "";
        const titre = safeString(e?.titre);
        const temps = e?.temps_min != null ? ` (${e.temps_min} min)` : "";
        const consigne = safeString(e?.consigne) || safeString(e?.a_faire);
        const trace = safeString(e?.trace);
        lines.push(`- Étape ${n} : ${titre}${temps}`);
        if (consigne) lines.push(`  Consigne : ${consigne}`);
        if (trace) lines.push(`  Trace : ${trace}`);
      }
      lines.push("");
    }
  }

  // IA autorisée
  const nbPromptsMax = ia?.nb_prompts_max;
  const promptsModeles: string[] = Array.isArray(ia?.prompts_modeles) ? ia.prompts_modeles : [];
  const tracesOblig: string[] = Array.isArray(ia?.traces_obligatoires) ? ia.traces_obligatoires : [];

  lines.push("IA autorisée (encadrée) :");
  if (typeof nbPromptsMax === "number") lines.push(`- Nombre de prompts max : ${nbPromptsMax}`);
  if (ia?.reformulation_obligatoire != null) lines.push(`- Reformulation obligatoire : ${ia.reformulation_obligatoire ? "oui" : "non"}`);
  if (ia?.copier_coller_interdit != null) lines.push(`- Copier-coller interdit : ${ia.copier_coller_interdit ? "oui" : "non"}`);
  if (tracesOblig.length) {
    lines.push("- Traces obligatoires :");
    for (const t of tracesOblig) lines.push(`  • ${t}`);
  }
  if (promptsModeles.length) {
    lines.push("- Prompts modèles :");
    for (const p of promptsModeles) lines.push(`  • ${p}`);
  }
  lines.push("");

  lines.push("IMPORTANT : Structure la réponse en 2 parties :");
  lines.push('1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="');
  lines.push('2) "=== PARTIE 2 : ACTIVITÉ PRÊTE POUR LA CLASSE ==="');

  return lines.join("\n");
}

function buildPromptFinal(opts: {
  preset: DbPreset;
  title: string;
  objectif: string;
  contenuBase: string;
  themesAgir: ThemeAgir[];
  themeLocal: string;
}): string {
  const { preset, title, objectif, contenuBase, themesAgir, themeLocal } = opts;

  const themesLabels = themesAgir
    .map((t) => THEMES.find((x) => x.id === t)?.label ?? t)
    .filter(Boolean);

  const enrich: string[] = [];
  enrich.push("=== ENRICHISSEMENT (EleveAI) ===");
  enrich.push(`Audience : ${preset.audience}`);
  enrich.push(`Classe : ${preset.classe}`);
  enrich.push(`Matière : ${preset.matiere}`);
  enrich.push(`Niveau : ${preset.niveau}`);
  enrich.push("");

  enrich.push(`Titre (modifié) : ${title || preset.title}`);
  enrich.push(`Objectif (modifié) : ${objectif || preset.title}`);
  enrich.push("");

  if (themesLabels.length) enrich.push(`Thèmes “Agir sur le monde” (enrichissement) : ${themesLabels.join(", ")}.`);
  if (themeLocal?.trim()) enrich.push(`Contexte local : ${themeLocal.trim()}`);
  enrich.push("");

  enrich.push("Consigne pour l’IA :");
  enrich.push("- Utilise le contenu ci-dessous comme base officielle (ne l’ignore pas).");
  enrich.push("- Améliore la clarté, ajoute des micro-étapes, et renforce traces + anti-triche.");
  enrich.push("- Si une info manque, propose une hypothèse explicite + une question courte.");
  enrich.push("");
  enrich.push("=== CONTENU (BASE DU PRESET) ===");
  enrich.push(contenuBase.trim() || "(contenu vide)");

  return enrich.join("\n");
}

/* ----------------------------------------
   UI : Boutons "Coller dans"
---------------------------------------- */
function PasteTargets({
  text,
  showToast,
}: {
  text: string;
  showToast: (msg: string) => void;
}) {
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

  const openChatGPT = () => {
    if (!text) return;
    // ChatGPT ne supporte pas un “prefill prompt” fiable côté web → on copie puis on ouvre.
    copySilently();
    window.open("https://chatgpt.com", "_blank", "noreferrer");
  };

  const openPerplexity = () => {
    if (!text) return;
    copySilently();
    window.open("https://www.perplexity.ai/", "_blank", "noreferrer");
  };

  return (
    <div className="space-y-2 pt-1">
      <p className="text-[11px] text-gray-600">Coller / ouvrir dans :</p>

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
          onClick={openChatGPT}
          disabled={disabled}
          className={`px-3 py-2 rounded-lg font-semibold transition inline-flex items-center gap-2 ${
            disabled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-slate-800 text-white hover:bg-slate-900"
          }`}
          title="Copie le prompt et ouvre ChatGPT"
        >
          🟦 Ouvrir ChatGPT <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={openPerplexity}
          disabled={disabled}
          className={`px-3 py-2 rounded-lg font-semibold transition inline-flex items-center gap-2 ${
            disabled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-[#0F9D58] text-white hover:bg-[#0c7b45]"
          }`}
          title="Copie le prompt et ouvre Perplexity"
        >
          🟩 Ouvrir Perplexity <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function AtelierIAClient() {
  const supabase = useMemo(() => createClient(), []);

  const topRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const scrollToPrompt = useCallback(() => {
    promptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  // Filtres (Supabase)
  const [classe, setClasse] = useState<Classe>("6e");
  const [audience, setAudience] = useState<Audience>("profs");
  const [q, setQ] = useState("");

  // Liste presets
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [presets, setPresets] = useState<DbPreset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Enrichissements / édition
  const [themesAgir, setThemesAgir] = useState<ThemeAgir[]>(["eau"]);
  const [themeLocal, setThemeLocal] = useState("La Réunion — contexte local : [commune / collège / quartier]");

  const [titreEdit, setTitreEdit] = useState("");
  const [objectifEdit, setObjectifEdit] = useState("");

  // Contenu base (issu du preset, éditable)
  const [contenuBase, setContenuBase] = useState("");

  // Prompt final
  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  const selectedPreset = useMemo(
    () => presets.find((p) => p.id === selectedId) ?? null,
    [presets, selectedId]
  );

  const filteredPresets = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return presets;
    return presets.filter((p) => {
      const inTitle = (p.title ?? "").toLowerCase().includes(qq);
      const inTags = (p.tags ?? []).some((t) => (t ?? "").toLowerCase().includes(qq));
      return inTitle || inTags;
    });
  }, [presets, q]);

  const fetchPresets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Source unique : Supabase
      // ✅ matiere = Atelier-IA, niveau = standard, audience/classe filtrés
      const { data, error } = await supabase
        .from("presets_eleveai")
        .select(
          "id, created_at, updated_at, audience, classe, matiere, niveau, title, description, tags, is_featured, featured_rank, payload, is_archived"
        )
        .eq("is_archived", false)
        .eq("matiere", "Atelier-IA")
        .eq("niveau", "standard")
        .eq("classe", classe)
        .eq("audience", audience)
        .order("created_at", { ascending: false })
        .limit(300);

      if (error) throw error;

      const rows = (data ?? []) as DbPreset[];
      setPresets(rows);

      // auto-select first
      if (rows.length) {
        setSelectedId(rows[0].id);
      } else {
        setSelectedId(null);
      }
    } catch (e: any) {
      setError(e?.message ?? "Erreur de chargement");
      setPresets([]);
      setSelectedId(null);
    } finally {
      setLoading(false);
    }
  }, [audience, classe, supabase]);

  // chargement auto quand filtres changent
  useEffect(() => {
    fetchPresets();
    // reset prompt final quand on change de filtre
    setPromptFinal("");
    setCopied(false);
    setShowPrompt(true);
  }, [fetchPresets]);

  // Quand on sélectionne un preset : hydrater l’édition
  useEffect(() => {
    if (!selectedPreset) {
      setTitreEdit("");
      setObjectifEdit("");
      setContenuBase("");
      return;
    }

    // Titre/Objectif éditables (par défaut = title preset)
    setTitreEdit(selectedPreset.title ?? "");
    setObjectifEdit(selectedPreset.title ?? "");

    const payload = selectedPreset.payload ?? {};
    const extracted = extractPromptBaseFromPayload(payload);
    const base = extracted.trim() ? extracted : reconstructPromptBase(selectedPreset);
    setContenuBase(base);
  }, [selectedPreset]);

  const toggleTheme = useCallback((id: ThemeAgir) => {
    setThemesAgir((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((t) => t !== id) : [...prev, id];
      return next.length ? next : ["eau"];
    });
  }, []);

  const resetAll = useCallback(() => {
    setQ("");
    setThemesAgir(["eau"]);
    setThemeLocal("La Réunion — contexte local : [commune / collège / quartier]");
    if (selectedPreset) {
      setTitreEdit(selectedPreset.title ?? "");
      setObjectifEdit(selectedPreset.title ?? "");
      const payload = selectedPreset.payload ?? {};
      const extracted = extractPromptBaseFromPayload(payload);
      const base = extracted.trim() ? extracted : reconstructPromptBase(selectedPreset);
      setContenuBase(base);
    } else {
      setTitreEdit("");
      setObjectifEdit("");
      setContenuBase("");
    }
    setPromptFinal("");
    setCopied(false);
    setShowPrompt(true);
    showToast("🔄 Reset");
    setTimeout(() => scrollToTop(), 50);
  }, [scrollToTop, selectedPreset, showToast]);

  const genererPromptFinal = useCallback(() => {
    if (!selectedPreset) return showToast("⚠️ Aucun preset sélectionné.");
    if (!contenuBase.trim()) return showToast("⚠️ Contenu vide : ajoute une base (preset).");

    const txt = buildPromptFinal({
      preset: selectedPreset,
      title: titreEdit.trim() || selectedPreset.title,
      objectif: objectifEdit.trim() || selectedPreset.title,
      contenuBase: contenuBase,
      themesAgir,
      themeLocal,
    });

    setPromptFinal(txt);
    setCopied(false);
    showToast("✨ Prompt final prêt !");
    setTimeout(() => scrollToPrompt(), 80);
  }, [contenuBase, objectifEdit, scrollToPrompt, selectedPreset, showToast, themeLocal, themesAgir, titreEdit]);

  const copierPromptFinal = useCallback(async () => {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      showToast("✅ Copié");
    } catch {
      showToast("⚠️ Copie impossible (Ctrl+C).");
    }
  }, [promptFinal, showToast]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div ref={topRef} className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-6 lg:py-10">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
            <span>🧪</span>
            <span>Atelier-IA · Presets Supabase (source unique)</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Atelier-IA — Prompt depuis un preset</h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-3xl">
            Tu <b>choisis un preset</b> (Supabase), puis tu fais un <b>petit enrichissement</b> : titre, objectif, thèmes “Agir sur le monde”.
            Ensuite EleveAI produit un <b>prompt final</b> prêt à coller.
          </p>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-900">
              <span className="font-extrabold">Règle EleveAI :</span> l’IA aide, mais le rendu final doit être{" "}
              <span className="font-semibold">personnel, justifié, et tracé</span>.
            </p>
            <p className="text-[11px] text-emerald-900/80 mt-1">Copier-coller interdit → reformulation + traces.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </header>

        {/* =========================
            TABLEAU PRESETS + FILTRES
            (tu m’as dit : on ne change rien — donc simple et propre)
           ========================= */}
        <section className="mt-6 bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end gap-3 justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Classe</label>
                <select
                  value={classe}
                  onChange={(e) => setClasse(e.target.value as Classe)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="profs">Profs</option>
                  <option value="eleves">Élèves</option>
                  <option value="parents">Parents</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Recherche (titre ou tags)</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="ex: CTM-05, traces, plan_action..."
                />
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="font-semibold">matière</span> = Atelier-IA · <span className="font-semibold">niveau</span> = standard
            </div>
          </div>

          {loading && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              Chargement des presets…
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              ⚠️ {error}
            </div>
          )}

          <div className="overflow-auto border border-slate-200 rounded-xl">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="p-3 font-semibold text-slate-700">Titre</th>
                  <th className="p-3 font-semibold text-slate-700">Tags</th>
                  <th className="p-3 font-semibold text-slate-700">Créé</th>
                </tr>
              </thead>

              <tbody>
                {filteredPresets.length === 0 ? (
                  <tr>
                    <td className="p-3 text-slate-600" colSpan={3}>
                      Aucun preset.
                    </td>
                  </tr>
                ) : (
                  filteredPresets.map((p) => {
                    const active = p.id === selectedId;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`cursor-pointer border-t ${
                          active ? "bg-emerald-50" : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        <td className="p-3">
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            {p.title}
                            {active && <Check className="w-4 h-4 text-emerald-700" />}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {p.classe} · {p.audience} · {p.matiere}
                          </div>
                        </td>
                        <td className="p-3 text-[11px] text-slate-700">
                          {(p.tags ?? []).slice(0, 10).join(" · ")}
                          {(p.tags ?? []).length > 10 ? " …" : ""}
                        </td>
                        <td className="p-3 text-[11px] text-slate-600">
                          {p.created_at ? new Date(p.created_at).toLocaleString() : "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================
            ÉDITION + ENRICHISSEMENT
           ========================= */}
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          {/* LEFT */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
              1️⃣ Enrichissement (petit, contrôlé)
            </h2>

            {!selectedPreset ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                Sélectionne un preset dans le tableau.
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Titre (modifiable)</label>
                    <input
                      value={titreEdit}
                      onChange={(e) => setTitreEdit(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <p className="text-[11px] text-slate-500">Par défaut : le titre du preset.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Objectif (modifiable)</label>
                    <input
                      value={objectifEdit}
                      onChange={(e) => setObjectifEdit(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <p className="text-[11px] text-slate-500">Tu peux préciser l’objectif pédagogique.</p>
                  </div>
                </div>

                {/* THEMES */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Thèmes (Agir sur le monde) — enrichissement</label>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map((t) => {
                      const active = themesAgir.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTheme(t.id)}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                            active
                              ? "bg-emerald-700 text-white border-emerald-700"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                          title={t.hint}
                        >
                          {t.emoji} {t.label} {active && <Check className="inline ml-1 w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-semibold text-gray-600">Contexte local (optionnel)</label>
                    <input
                      value={themeLocal}
                      onChange={(e) => setThemeLocal(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      placeholder="Ex : La Réunion — Saint-Joseph — collège — quartier…"
                    />
                  </div>
                </div>

                {/* CONTENU BASE */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Contenu (base du preset) — éditable</label>
                  <textarea
                    value={contenuBase}
                    onChange={(e) => setContenuBase(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-[12px] font-mono bg-slate-50 min-h-[260px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Contenu base issu du payload (prompt ou reconstruction)."
                  />
                  <p className="text-[11px] text-slate-500">
                    Ce contenu vient du preset (payload). Tu peux le retoucher légèrement si besoin.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={genererPromptFinal}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    ✨ Générer le prompt final
                  </button>
                </div>
              </>
            )}
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            {/* PROMPT FINAL */}
            <div
              ref={promptRef}
              className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-emerald-800">2️⃣ Prompt final (à copier-coller)</h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copierPromptFinal}
                    disabled={!promptFinal}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      promptFinal
                        ? "bg-slate-800 text-white hover:bg-slate-900"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied ? "Copié" : "Copier"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPrompt((v) => !v)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-300 hover:bg-slate-50"
                  >
                    {showPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPrompt ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              {showPrompt && (
              <textarea
                readOnly
                value={promptFinal}
                className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[320px]"
                placeholder="Clique « Générer le prompt final »."
              />
              )}

              <PasteTargets text={promptFinal} showToast={showToast} />

              {!!promptFinal && (
                <button
                  type="button"
                  onClick={() => {
                    showToast("💡 Copie / ouvre dans une IA (ChatGPT/Perplexity/Tchat).");
                    setTimeout(() => scrollToTop(), 150);
                  }}
                  className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900"
                >
                  <ArrowDown className="w-4 h-4 rotate-180" />
                  Revenir en haut
                </button>
              )}
            </div>

            {/* AIDE rapide */}
            <div className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm p-5 sm:p-6">
              <h3 className="font-bold text-slate-900">ℹ️ Rappel (aligné EleveAI)</h3>
              <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
                <li>Le preset Supabase est la base “officielle”.</li>
                <li>Tu modifies seulement : <b>titre</b>, <b>objectif</b>, <b>thèmes</b>, et éventuellement une petite retouche du contenu.</li>
                <li>Le prompt final reste <b>anti-triche</b> : traces + reformulation + vérification.</li>
              </ul>
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
