"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PresetCarousel, PresetCarouselItem } from "@/components/PresetCarousel";
import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Gift,
  Wand2,
  Users,
  MapPin,
  Timer,
  Zap,
} from "lucide-react";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type TypeLieu =
  | "classe"
  | "famille"
  | "etablissement"
  | "quartier"
  | "en_ligne"
  | "autre"
  | "";

type DomaineDefi =
  | "ecologie"
  | "entraide"
  | "bien_etre"
  | "apprentissages"
  | "creativite"
  | "autre"
  | "";

type NiveauEnergie = "mini" | "normal" | "maxi";

type DefiForm = {
  prenom: string;
  ageOuClasse: string;
  typeLieu: TypeLieu;
  lieuPrecis: string;
  domaine: DomaineDefi;
  titreDefi: string;
  descriptionDefi: string;
  pourquoiImportant: string;
  personnesImpliquees: string;
  tempsDispo: string;
  niveauEnergie: NiveauEnergie;
  contraintes: string;
};

/* ----------------------------------------
   LISTES
---------------------------------------- */

const TYPES_LIEU: { value: TypeLieu; label: string; hint?: string }[] = [
  { value: "classe", label: "Ma classe / mon collège", hint: "Ex : 6e5, salle 12" },
  { value: "famille", label: "Ma famille / ma maison", hint: "Ex : à la maison" },
  { value: "etablissement", label: "Tout l’établissement", hint: "Ex : collège entier" },
  { value: "quartier", label: "Mon quartier / mon village", hint: "Ex : mon quartier" },
  { value: "en_ligne", label: "Une communauté en ligne", hint: "Ex : club / serveur" },
  { value: "autre", label: "Autre", hint: "Ex : club de sport" },
];

const DOMAINES: { value: DomaineDefi; label: string }[] = [
  { value: "ecologie", label: "Écologie / nature" },
  { value: "entraide", label: "Entraide / solidarité" },
  { value: "bien_etre", label: "Bien-être / climat de classe" },
  { value: "apprentissages", label: "Apprentissages / école" },
  { value: "creativite", label: "Créativité / projets" },
  { value: "autre", label: "Autre" },
];

/* ----------------------------------------
   PRESETS
---------------------------------------- */

type PresetKeyDefi =
  | "defi_classe_ecologie"
  | "defi_famille_ecrans"
  | "defi_etab_solidarite"
  | "defi_perso_confiance"
  | "defi_6e_classe_ambiance";

const PRESETS_DEFI: Record<
  PresetKeyDefi,
  { label: string; description: string; valeurs: Partial<DefiForm> }
> = {
  defi_classe_ecologie: {
    label: "🌱 Classe : défi écologie",
    description: "Moins de déchets + gestes simples dans la classe.",
    valeurs: {
      typeLieu: "classe",
      domaine: "ecologie",
      titreDefi: "Une classe plus écologique",
      descriptionDefi:
        "Je veux qu’on gaspille moins (papier, électricité, plastique) dans ma classe.",
      pourquoiImportant: "Parce que la planète est importante et on peut agir à notre niveau.",
      personnesImpliquees: "Mes camarades + un adulte (prof / CPE).",
      tempsDispo: "2 à 4 semaines pour commencer.",
      niveauEnergie: "normal",
    },
  },

  defi_famille_ecrans: {
    label: "📵 Famille : moins d’écrans",
    description: "Passer moins d’écran et faire plus d’activités ensemble.",
    valeurs: {
      typeLieu: "famille",
      domaine: "bien_etre",
      titreDefi: "Réduire les écrans à la maison",
      descriptionDefi:
        "Je veux proposer une règle simple : moins d’écran le soir et plus d’activités ensemble.",
      pourquoiImportant: "Pour discuter, jouer, mieux dormir, être ensemble.",
      personnesImpliquees: "Mes parents + frères/sœurs.",
      tempsDispo: "1 à 2 semaines pour tester.",
      niveauEnergie: "normal",
    },
  },

  defi_etab_solidarite: {
    label: "🎁 Établissement : solidarité",
    description: "Collecte / action solidaire avec plusieurs classes.",
    valeurs: {
      typeLieu: "etablissement",
      domaine: "entraide",
      titreDefi: "Une action solidaire au collège",
      descriptionDefi:
        "Je veux lancer une action (collecte, entraide, projet) pour aider des personnes qui en ont besoin.",
      pourquoiImportant: "Parce que c’est important d’aider et de se sentir utile.",
      personnesImpliquees: "CVC/CVL + vie scolaire + un professeur.",
      tempsDispo: "4 à 6 semaines.",
      niveauEnergie: "maxi",
    },
  },

  defi_perso_confiance: {
    label: "⭐ Personnel : confiance",
    description: "Prendre la parole, oser, progresser.",
    valeurs: {
      typeLieu: "autre",
      domaine: "apprentissages",
      titreDefi: "Oser plus en classe",
      descriptionDefi:
        "Je veux lever la main au moins 1 fois par cours et faire un petit exposé.",
      pourquoiImportant: "Pour être fier/fière de moi et progresser.",
      personnesImpliquees: "Moi + 1 adulte de confiance.",
      tempsDispo: "3 à 4 semaines.",
      niveauEnergie: "mini",
    },
  },

  defi_6e_classe_ambiance: {
    label: "😊 6e : meilleure ambiance",
    description: "Défi simple pour une classe plus gentille et calme.",
    valeurs: {
      typeLieu: "classe",
      domaine: "bien_etre",
      titreDefi: "Une classe plus sympa",
      descriptionDefi:
        "Je veux qu’on se respecte plus : moins de moqueries, plus d’entraide, plus de calme.",
      pourquoiImportant: "Parce qu’on apprend mieux quand l’ambiance est bonne.",
      personnesImpliquees: "Toute la classe + prof principal.",
      tempsDispo: "2 semaines pour tester.",
      niveauEnergie: "normal",
    },
  },
};

const PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PRESETS_DEFI) as [
    PresetKeyDefi,
    (typeof PRESETS_DEFI)[PresetKeyDefi],
  ][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Idée",
}));

/* ----------------------------------------
   HELPERS
---------------------------------------- */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function energyLabel(n: NiveauEnergie) {
  if (n === "mini") return "Mini";
  if (n === "normal") return "Normal";
  return "Maxi";
}

function energyHint(n: NiveauEnergie) {
  switch (n) {
    case "mini":
      return "Défi très simple : 2-3 actions faciles.";
    case "normal":
      return "Défi réaliste : quelques étapes + suivi.";
    case "maxi":
      return "Défi ambitieux : équipe + planning + responsabilités.";
  }
}

function descriptionNiveauEnergie(n: NiveauEnergie) {
  switch (n) {
    case "mini":
      return "Je cherche un défi simple, avec de petites actions faciles à tenir.";
    case "normal":
      return "Je suis prêt(e) à m’investir régulièrement si le plan est bien organisé.";
    case "maxi":
      return "Je veux un défi ambitieux avec plusieurs étapes et du travail d’équipe.";
  }
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function DefisPereNoelPage() {
  const initialForm: DefiForm = useMemo(
    () => ({
      prenom: "",
      ageOuClasse: "",
      typeLieu: "",
      lieuPrecis: "",
      domaine: "",
      titreDefi: "",
      descriptionDefi: "",
      pourquoiImportant: "",
      personnesImpliquees: "",
      tempsDispo: "",
      niveauEnergie: "normal",
      contraintes: "",
    }),
    [],
  );

  const [form, setForm] = useState<DefiForm>(initialForm);

  const [promptFinal, setPromptFinal] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // UI (progressive disclosure)
  const [showOptions, setShowOptions] = useState(false);

  function handleChange<K extends keyof DefiForm>(field: K, value: DefiForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: PresetKeyDefi) {
    const preset = PRESETS_DEFI[key];
    setForm((prev) => ({ ...prev, ...preset.valeurs }));
    setPromptFinal("");
    setCopiedPrompt(false);
  }

  function resetAll() {
    setForm(initialForm);
    setPromptFinal("");
    setCopiedPrompt(false);
    setShowOptions(false);
  }

  // ✅ checklist simple pour des 6e (3 champs clés)
  const checklist = useMemo(() => {
    const items = [
      { label: "Un titre", ok: form.titreDefi.trim().length >= 3 },
      { label: "Une description", ok: form.descriptionDefi.trim().length >= 20 },
      { label: "Pourquoi c’est important", ok: form.pourquoiImportant.trim().length >= 10 },
    ];
    const done = items.filter((i) => i.ok).length;
    const pct = Math.round((done / items.length) * 100);
    return { items, done, pct };
  }, [form.titreDefi, form.descriptionDefi, form.pourquoiImportant]);

  const suggestions = useMemo(() => {
    const s: string[] = [];
    if (!form.titreDefi.trim()) s.push("Donne un titre simple (ex : Classe plus verte).");
    if (form.descriptionDefi.trim().length < 20)
      s.push("Écris 2–3 phrases : ce que tu veux changer concrètement.");
    if (form.pourquoiImportant.trim().length < 10)
      s.push("Explique pourquoi c’est important pour toi / pour la classe.");
    if (!form.typeLieu) s.push("Choisis où se passe le défi (classe, maison…).");
    if (!form.domaine) s.push("Choisis un domaine (écologie, entraide…).");
    if (s.length === 0) s.push("Parfait ! Clique sur « Générer mon prompt » puis colle-le dans EleveAI.");
    return s;
  }, [form]);

  function genererPromptFinal() {
    if (!form.titreDefi.trim() || form.descriptionDefi.trim().length < 10) {
      alert("Merci de remplir au minimum le titre + une description (2 phrases).");
      return;
    }

    const prenom = form.prenom.trim() || "un élève";
    const titre = form.titreDefi.trim();
    const description = form.descriptionDefi.trim();
    const pourquoi =
      form.pourquoiImportant.trim() || "Je veux créer un changement positif autour de moi.";
    const lieuGlobal = form.typeLieu
      ? TYPES_LIEU.find((t) => t.value === form.typeLieu)?.label
      : "";
    const lieuPrecisions = form.lieuPrecis.trim();
    const contexteLieu =
      lieuGlobal || lieuPrecisions
        ? `${[lieuGlobal, lieuPrecisions].filter(Boolean).join(" – ")}`
        : "pas de lieu précis indiqué";

    const domaineTexte = form.domaine
      ? DOMAINES.find((d) => d.value === form.domaine)?.label
      : "domaine varié";

    const personnes =
      form.personnesImpliquees.trim() || "Je ne sais pas encore qui impliquer.";
    const temps =
      form.tempsDispo.trim() || "Le calendrier peut être adapté pour que le défi reste réaliste.";
    const contraintes = form.contraintes.trim();

    const prompt =
      `Tu es une IA pédagogique et créative (niveau collège) qui aide ${prenom} à imaginer un **défi positif** réaliste.\n\n` +
      `🎯 Titre du défi : ${titre}\n` +
      `🌍 Lieu : ${contexteLieu}\n` +
      `🏷️ Domaine : ${domaineTexte}\n` +
      `⚡ Énergie : ${descriptionNiveauEnergie(form.niveauEnergie)}\n\n` +
      `📝 Ce que je veux changer (concret) :\n${description}\n\n` +
      `💡 Pourquoi c’est important :\n${pourquoi}\n\n` +
      `👥 Personnes à impliquer :\n${personnes}\n\n` +
      `⏱️ Durée :\n${temps}\n\n` +
      (contraintes ? `⚠️ Contraintes :\n${contraintes}\n\n` : "") +
      `🎄 Ta mission :\n` +
      `1) Reformule le défi en 4–6 lignes claires.\n` +
      `2) Propose un plan en 5 étapes MAXI (très concret) + une action “facile dès demain”.\n` +
      `3) Donne 3 idées pour impliquer les autres (amis, adultes, classe).\n` +
      `4) Ajoute une mini-checklist de suivi (cases à cocher).\n` +
      `5) Termine par un message motivant “Père Noël de l’IA” (court, gentil, encourageant).`;

    setPromptFinal(prompt);
    setCopiedPrompt(false);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1200);
    } catch {
      alert("Copie manuelle : sélectionne le texte puis Ctrl+C.");
    }
  }

  const tchatHref = promptFinal ? `/tchat?prompt=${encodeURIComponent(promptFinal)}` : "/tchat";

  const progressWidth = `${clamp(checklist.pct, 0, 100)}%`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            <Gift className="w-4 h-4" />
            Défi IA Père Noël – Atelier 6e
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Écris ton défi et fais-le transformer en plan d’action
          </h1>

          <p className="text-sm text-gray-700 max-w-2xl">
            Tu remplis 2–3 infos, tu génères un prompt, puis tu le colles dans EleveAI (ou ChatGPT/Gemini).
            L’IA te propose un plan simple, concret et motivant.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
            >
              ⬅️ Accueil EleveAI
            </Link>

            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </header>

        {/* PRESETS */}
<PresetCarousel
  title="1️⃣ Choisis une idée de défi (facultatif)"
  items={PRESET_ITEMS}
  onSelect={(id) => appliquerPreset(id as PresetKeyDefi)}
/>



        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT: FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-md font-bold text-[#0047B6] flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  2️⃣ Ton défi (simple)
                </h2>
                <p className="text-[12px] text-slate-600 mt-1">
                  Objectif : écrire un défi clair, pas parfait. L’IA t’aidera ensuite.
                </p>
              </div>

              {/* Progress mini */}
              <div className="min-w-[140px]">
                <p className="text-[11px] text-slate-600 text-right">
                  Avancement : <span className="font-semibold">{checklist.done}/3</span>
                </p>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: progressWidth }} />
                </div>
              </div>
            </div>

            {/* Required core */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  Où ?
                </label>
                <select
                  value={form.typeLieu}
                  onChange={(e) => handleChange("typeLieu", e.target.value as TypeLieu)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">Choisir…</option>
                  {TYPES_LIEU.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  Domaine
                </label>
                <select
                  value={form.domaine}
                  onChange={(e) => handleChange("domaine", e.target.value as DomaineDefi)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="">Choisir…</option>
                  {DOMAINES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Titre du défi <span className="text-emerald-700">(important)</span>
              </label>
              <input
                type="text"
                value={form.titreDefi}
                onChange={(e) => handleChange("titreDefi", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex : Une classe plus sympa"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Ce que tu veux changer <span className="text-emerald-700">(2–3 phrases)</span>
              </label>
              <textarea
                value={form.descriptionDefi}
                onChange={(e) => handleChange("descriptionDefi", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex : Il y a trop de moqueries. Je veux plus d’entraide et de calme."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Pourquoi c’est important <span className="text-emerald-700">(1–2 phrases)</span>
              </label>
              <textarea
                value={form.pourquoiImportant}
                onChange={(e) => handleChange("pourquoiImportant", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Ex : On apprend mieux quand on se sent bien."
              />
            </div>

            {/* Optional accordion */}
            <button
              type="button"
              onClick={() => setShowOptions((v) => !v)}
              className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Options (facultatives) pour améliorer le plan
              </span>
              {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showOptions && (
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="grid sm:grid-cols-2 gap-3">
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
                    <label className="text-xs font-semibold">Âge / classe (facultatif)</label>
                    <input
                      type="text"
                      value={form.ageOuClasse}
                      onChange={(e) => handleChange("ageOuClasse", e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Ex : 6e, 11 ans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Lieu précis (facultatif)</label>
                  <input
                    type="text"
                    value={form.lieuPrecis}
                    onChange={(e) => handleChange("lieuPrecis", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder={
                      TYPES_LIEU.find((t) => t.value === form.typeLieu)?.hint ||
                      "Ex : 6e5, salle 12"
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold flex items-center gap-2">
                      <Timer className="w-4 h-4 text-slate-500" />
                      Durée (facultatif)
                    </label>
                    <input
                      type="text"
                      value={form.tempsDispo}
                      onChange={(e) => handleChange("tempsDispo", e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Ex : 2 semaines"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-slate-500" />
                      Énergie
                    </label>
                    <select
                      value={form.niveauEnergie}
                      onChange={(e) => handleChange("niveauEnergie", e.target.value as NiveauEnergie)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="mini">Mini</option>
                      <option value="normal">Normal</option>
                      <option value="maxi">Maxi</option>
                    </select>
                    <p className="text-[11px] text-slate-600">{energyHint(form.niveauEnergie)}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Qui pourrait t’aider ? (facultatif)</label>
                  <textarea
                    value={form.personnesImpliquees}
                    onChange={(e) => handleChange("personnesImpliquees", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                    placeholder="Ex : mes camarades + un adulte"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Contraintes (facultatif)</label>
                  <textarea
                    value={form.contraintes}
                    onChange={(e) => handleChange("contraintes", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                    placeholder="Ex : pas d’argent, pas trop de temps…"
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <div className="text-xs text-slate-600">
                Niveau énergie : <span className="font-semibold">{energyLabel(form.niveauEnergie)}</span>
              </div>

              <button
                onClick={genererPromptFinal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Générer mon prompt
              </button>
            </div>
          </section>

          {/* RIGHT: guidance + prompt */}
          <section className="space-y-4">
            {/* Tips + checklist */}
            <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-lg font-bold text-emerald-700">3️⃣ Checklist (rapide)</h2>

              <div className="space-y-2">
                {checklist.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    {it.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="w-4 h-4 inline-flex items-center justify-center text-slate-400">
                        ○
                      </span>
                    )}
                    <span className={it.ok ? "text-slate-800 font-semibold" : "text-slate-600"}>
                      {it.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-bold text-slate-800">Conseils</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  {suggestions.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600">➤</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prompt box */}
            <div className="bg-slate-900 text-slate-50 border border-slate-800 rounded-2xl shadow-md p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-emerald-300">
                    4️⃣ Ton prompt (à coller dans une IA)
                  </h2>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Étape atelier : 1) Copier → 2) Coller dans EleveAI → 3) Lire le plan → 4) Améliorer.
                  </p>
                </div>

                <button
                  onClick={copierPrompt}
                  disabled={!promptFinal}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                    promptFinal
                      ? "bg-slate-100 text-slate-900 hover:bg-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copiedPrompt ? "✅ Copié" : "Copier"}
                </button>
              </div>

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono bg-slate-950 min-h-[260px]"
                placeholder="Clique sur « Générer mon prompt »…"
              />

              {/* IA Links */}
              <div className="pt-1 space-y-2">
                <p className="text-[11px] text-slate-300">
                  Coller le prompt dans :
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href={tchatHref}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 EleveAI
                  </Link>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold"
                  >
                    ChatGPT
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold"
                  >
                    Gemini
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold"
                  >
                    Claude
                  </a>
                  <a
                    href="https://chat.mistral.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold"
                  >
                    Mistral
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                Astuce atelier : si le plan est trop long, réponds à l’IA : “Fais plus court (5 étapes max)”.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


