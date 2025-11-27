"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Niveau = "basique" | "standard" | "expert";

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
  auteur: string;
  date: string;
};

const CLASSES = [
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

const TYPES_PROMPT = [
  "Explication d’une notion",
  "Génération d’exercices",
  "Correction méthodologique",
  "Création d’activité",
  "Analyse de copie",
  "Préparation de séquence",
  "QCM / Évaluation",
  "Réécriture / simplification",
];

export default function ProfsPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<PromptProf>({
    titre: "",
    objectifPedagogique: "",
    classe: "",
    matiere: "",
    niveau: "standard",
    type: "",
    contenu: "",
    tags: [],
    adaptationDYS: false,
    auteur: "",
    date: today,
  });

  const [rawTags, setRawTags] = useState("");
  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  function handleChange(
    field: keyof PromptProf,
    value: string | boolean | Niveau,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateTags(value: string) {
    setRawTags(value);
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tags }));
  }

  // Suggestions simples pour améliorer le prompt du prof
  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.objectifPedagogique.trim()) {
      s.push(
        "Précise l’objectif pédagogique : ce que l’élève doit comprendre, savoir faire ou produire.",
      );
    }

    if (!form.classe) {
      s.push("Sélectionne une classe/niveau : cela aide l’IA à ajuster le vocabulaire.");
    }

    if (!form.matiere) {
      s.push(
        "Indique la matière pour que l’IA reste dans le bon champ disciplinaire.",
      );
    }

    if (!form.type) {
      s.push(
        "Choisis un type de prompt (explication, exercices, activité, etc.) pour guider la structure de la réponse.",
      );
    }

    if (form.contenu.trim().length < 40) {
      s.push(
        "Ton texte de consigne est très court : ajoute quelques détails (contexte, exemple, formats attendus…).",
      );
    }

    if (!form.adaptationDYS) {
      s.push(
        "Si tu as des élèves DYS, pense à cocher l’option adaptation DYS pour obtenir une réponse plus accessible.",
      );
    }

    if (s.length === 0) {
      s.push(
        "Ton prompt est déjà bien structuré. Tu peux encore l’améliorer en donnant un exemple concret ou en précisant la durée de la tâche.",
      );
    }

    return s;
  }, [form]);

  // "Moulinette" interne : on enrichit le prompt prof avec tout le contexte pédagogique
  function genererPromptFinal() {
    if (!form.contenu.trim()) {
      alert("Merci de remplir au moins le contenu du prompt.");
      return;
    }

    const blocTags =
      form.tags.length > 0
        ? `Mots-clés pédagogiques fournis par le professeur : ${form.tags.join(", ")}.\n`
        : "";

    const blocDYS = form.adaptationDYS
      ? `Adapte ta réponse à un élève présentant des troubles DYS :\n` +
        `- phrases courtes et claires,\n` +
        `- pas de doubles négations,\n` +
        `- vocabulaire simple expliqué,\n` +
        `- mise en page aérée avec des listes.\n\n`
      : "";

    const blocAuteur = form.auteur
      ? `Ce prompt est préparé par le professeur : ${form.auteur}.\n`
      : "";

    const prompt =
      `Tu es une IA pédagogique destinée à des élèves de ${form.classe || "collège/lycée"} ` +
      `en ${form.matiere || "discipline scolaire"}, dans le système scolaire français.\n` +
      `Ta réponse doit respecter l’esprit des programmes officiels (Eduscol) et rester conforme au Bulletin officiel.\n` +
      `Tu t’appuies sur les bonnes pratiques issues des neurosciences de l’apprentissage : progression étape par étape, rappels, exemples concrets, reformulations possibles.\n\n` +
      `Objectif pédagogique indiqué par le professeur : ${form.objectifPedagogique || "(non précisé, propose-en un compatible avec le programme)"}\n` +
      `Niveau de difficulté souhaité : ${form.niveau}.\n` +
      `Type de tâche : ${form.type || "non précisé (choisis une structure adaptée au niveau de l’élève)"}.\n` +
      blocTags +
      blocAuteur +
      `Consigne initiale rédigée par le professeur (à optimiser) :\n` +
      `"""${form.contenu.trim()}"""\n\n` +
      blocDYS +
      `Ta mission :\n` +
      `1. Si la demande du professeur est floue ou incomplète, commence par proposer une version plus précise du prompt, en gardant son intention pédagogique.\n` +
      `2. Ensuite, produis la réponse pour l’élève en respectant :\n` +
      `   - le niveau indiqué,\n` +
      `   - le programme officiel,\n` +
      `   - la clarté pédagogique (étapes, exemples, vérification de compréhension).\n` +
      `3. Ne résous pas un devoir maison spécifique sauf si le professeur demande clairement une correction commentée.\n`;

    setPromptFinal(prompt);
    setCopied(false);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
      alert("Impossible de copier automatiquement. Sélectionne le texte et copie-le à la main.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Titre */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs – Générer un prompt pédagogique</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Générer un prompt pour les profs
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Remplis les informations ci-dessous : EleveAI construira pour toi un
            prompt optimisé, conforme aux programmes, que tu pourras ensuite utiliser
            dans ton IA préférée (ChatGPT, Gemini, Claude, Mistral…) ou dans le chat
            EleveAI.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Colonne gauche : formulaire */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0047B6] flex items-center gap-2">
              1️⃣ Paramètres pédagogiques
            </h2>
                        {/* Classe / matière / niveau */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Classe / niveau
                </label>
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
                <label className="text-xs font-semibold text-gray-600">
                  Matière
                </label>
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
                <label className="text-xs font-semibold text-gray-600">
                  Niveau de difficulté
                </label>
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

            {/* Type de prompt */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Type de prompt
              </label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="">Choisir…</option>
                {TYPES_PROMPT.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Titre du prompt
                </label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Expliquer la proportionnalité en 5e"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Auteur (facultatif)
                </label>
                <input
                  type="text"
                  value={form.auteur}
                  onChange={(e) => handleChange("auteur", e.target.value)}
                  placeholder="Nom, initiales…"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            {/* Objectif pédagogique */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Objectif pédagogique
              </label>
              <textarea
                value={form.objectifPedagogique}
                onChange={(e) => handleChange("objectifPedagogique", e.target.value)}
                placeholder="Ex : l’élève doit savoir reconnaître une situation de proportionnalité et utiliser un coefficient."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[70px]"
              />
            </div>



            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                value={rawTags}
                onChange={(e) => updateTags(e.target.value)}
                placeholder="Ex : proportionnalité, tableau, exercices"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Tags reconnus :{" "}
                  <span className="font-semibold">
                    {form.tags.join(", ")}
                  </span>
                </p>
              )}
            </div>

            {/* Adaptation DYS + date */}
            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={form.adaptationDYS}
                  onChange={(e) => handleChange("adaptationDYS", e.target.checked)}
                  className="rounded border-gray-400"
                />
                <span>Adapter la réponse pour des élèves DYS</span>
              </label>
              <div className="text-[11px] text-gray-500">
                Date :{" "}
                <span className="font-mono">{form.date}</span>
              </div>
            </div>

            {/* Contenu du prompt */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">
                Texte du prompt (version professeur)
              </label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder="Ex : Explique la proportionnalité à un élève de 5e avec un exemple concret, un tableau et deux exercices d’application."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

            {/* Bouton générer */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={genererPromptFinal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0047B6] text-white text-sm font-semibold shadow hover:bg-[#003894] transition"
              >
                ⚙️ Générer le prompt optimisé
              </button>
            </div>
          </section>

          {/* Colonne droite : suggestions + prompt final */}
          <section className="space-y-4">
            {/* Suggestions */}
            <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <h2 className="text-lg font-bold text-amber-700 flex items-center gap-2">
                2️⃣ Recommandations pour améliorer ton prompt
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px] text-amber-500">➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-gray-500">
                Ces recommandations sont là pour t’aider à rendre ton prompt plus
                clair, plus ciblé et plus utile pour les élèves.
              </p>
            </div>

            {/* Prompt final */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  3️⃣ Prompt final à utiliser dans ton IA
                </h2>
                <button
                  onClick={copierPrompt}
                  disabled={!promptFinal}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    promptFinal
                      ? "bg-slate-800 text-white hover:bg-slate-900"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {copied ? "✅ Copié" : "📋 Copier"}
                </button>
              </div>

              <textarea
                readOnly
                value={promptFinal}
                placeholder="Génère d’abord un prompt optimisé à partir du formulaire ci-contre."
                className="w-full border rounded-lg px-3 py-2 text-xs sm:text-[13px] font-mono bg-slate-50 min-h-[180px]"
              />

              {/* Liens vers les IA */}
              <div className="space-y-2">
                <p className="text-xs text-gray-700">
                  Une fois le prompt copié, ouvre l’IA de ton choix et colle-le
                  dans la zone de texte.
                </p>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <Link
                    href={promptFinal ? `/chat?prompt=${encodeURIComponent(promptFinal)}` : "/chat"}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Utiliser avec EleveAI
                  </Link>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900"
                  >
                    🟦 Ouvrir ChatGPT
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold hover:bg-[#0c7b45]"
                  >
                    🟩 Ouvrir Gemini
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold hover:bg-[#372dcc]"
                  >
                    🟪 Ouvrir Claude
                  </a>
                  <a
                    href="https://chat.mistral.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold hover:bg-[#e46f0d]"
                  >
                    🟧 Ouvrir Mistral
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
