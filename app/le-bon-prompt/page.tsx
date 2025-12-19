"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Style = "creer" | "comprendre" | "agir";
type Intention =
  | "comprendre"
  | "ameliorer"
  | "expliquer"
  | "creer"
  | "convaincre"
  | "samuser";
type Duree = "5 min" | "10 min" | "20 min" | "30 min" | "1 h";
type Niveau = "10-12" | "13-15" | "16-18" | "Etudiant" | "Tous";
type ThemeId = "ecologie" | "vie_collective" | "quartier" | "famille" | "creation";

const INTENTIONS: { id: Intention; label: string; icon: string }[] = [
  { id: "comprendre", label: "Comprendre", icon: "🧠" },
  { id: "ameliorer", label: "Améliorer", icon: "🛠️" },
  { id: "expliquer", label: "Expliquer", icon: "🗣️" },
  { id: "creer", label: "Créer", icon: "🎨" },
  { id: "convaincre", label: "Convaincre", icon: "📣" },
  { id: "samuser", label: "S’amuser", icon: "🎮" },
];

const DUREES: Duree[] = ["5 min", "10 min", "20 min", "30 min", "1 h"];
const NIVEAUX: Niveau[] = ["10-12", "13-15", "16-18", "Etudiant", "Tous"];

const THEMES: { id: ThemeId; label: string; icon: string; exemples: string[] }[] = [
  {
    id: "ecologie",
    label: "Écologie",
    icon: "🌿",
    exemples: ["déchets", "eau", "énergie", "biodiversité"],
  },
  {
    id: "vie_collective",
    label: "Vie collective",
    icon: "🏫",
    exemples: ["climat", "respect", "entraide", "organisation"],
  },
  {
    id: "quartier",
    label: "Quartier",
    icon: "🏘️",
    exemples: ["propreté", "solidarité", "sécurité", "événements"],
  },
  {
    id: "famille",
    label: "Famille",
    icon: "👨‍👩‍👧",
    exemples: ["organisation", "écrans", "devoirs", "budget"],
  },
  {
    id: "creation",
    label: "Création",
    icon: "💡",
    exemples: ["projet", "dessin", "histoire", "prototype"],
  },
];

type ThemeFun = {
  helper: string;

  // labels (FUN LÉGER)
  lieu_fun: string;
  situation_fun: string;
  public_fun: string;
  objectif_fun: string;

  // labels (MODE DÉFI)
  lieu_defi: string;
  situation_defi: string;
  public_defi: string;
  objectif_defi: string;

  // placeholders
  placeholderLieu: string;
  placeholderSituation: string;
  placeholderPublic: string;
  placeholderObjectif: string;

  // CTA
  cta_fun: string;
  cta_defi: string;
};

const THEME_FUN: Record<ThemeId, ThemeFun> = {
  ecologie: {
    helper: "🌿 Mini-quête : repère un “petit bug” de la planète… et propose une action simple.",
    lieu_fun: "📍 Où tu l’as repéré ?",
    situation_fun: "👀 Ce que tu vois (sans juger)",
    public_fun: "👥 Qui est concerné / qui peut aider ?",
    objectif_fun: "🎯 Ce que tu veux améliorer (concret)",
    lieu_defi: "🗺️ Terrain de mission",
    situation_defi: "🔎 Indice principal (ce qui se passe)",
    public_defi: "🧑‍🤝‍🧑 Alliés & concernés",
    objectif_defi: "🏁 Victoire (objectif mesurable)",
    placeholderLieu: "Ex : près des poubelles du collège, sur la plage, au parc…",
    placeholderSituation: "Ex : déchets au sol, gaspillage d’eau, lumières allumées…",
    placeholderPublic: "Ex : élèves, agents, familles, voisins, mairie…",
    placeholderObjectif: "Ex : réduire les déchets autour des poubelles en 2 semaines",
    cta_fun: "🚀 Lancer l’idée",
    cta_defi: "🏆 Je relève le défi",
  },
  vie_collective: {
    helper: "🏫 Mini-quête : rendre l’ambiance meilleure (sans drama, juste du concret).",
    lieu_fun: "📍 Où ça se passe ?",
    situation_fun: "👀 Ce que tu observes",
    public_fun: "👥 Qui est concerné ?",
    objectif_fun: "🎯 Ce que tu veux changer",
    lieu_defi: "🗺️ Zone de jeu",
    situation_defi: "⚠️ Problème à résoudre",
    public_defi: "🧑‍🤝‍🧑 Personnes concernées",
    objectif_defi: "🏁 Objectif de victoire",
    placeholderLieu: "Ex : en classe, couloir, cantine, bus…",
    placeholderSituation: "Ex : trop de bruit, disputes, exclusions, retards…",
    placeholderPublic: "Ex : ma classe, mon groupe, un niveau…",
    placeholderObjectif: "Ex : baisser le bruit pendant 1 semaine, améliorer l’entraide…",
    cta_fun: "🚀 Construire le plan",
    cta_defi: "🏆 Démarrer la mission",
  },
  quartier: {
    helper: "🏘️ Mini-quête : améliorer ton quartier (petit pas = gros effet).",
    lieu_fun: "📍 C’est où exactement ?",
    situation_fun: "👀 Ce que tu as remarqué",
    public_fun: "👥 Qui vit là / qui peut agir ?",
    objectif_fun: "🎯 Ton amélioration idéale (réaliste)",
    lieu_defi: "🗺️ Spot de mission",
    situation_defi: "🔎 Ce qui cloche / peut être mieux",
    public_defi: "🧑‍🤝‍🧑 Équipe / concernés",
    objectif_defi: "🏁 Résultat attendu",
    placeholderLieu: "Ex : arrêt de bus, terrain, place, parking…",
    placeholderSituation: "Ex : saleté, danger, dégradations, isolement…",
    placeholderPublic: "Ex : jeunes, voisins, commerçants, mairie…",
    placeholderObjectif: "Ex : action propreté 1x/semaine pendant 1 mois",
    cta_fun: "🚀 Générer une solution",
    cta_defi: "🏆 Je lance le défi",
  },
  famille: {
    helper: "👨‍👩‍👧 Mini-quête : rendre la vie à la maison plus simple (mode zen).",
    lieu_fun: "📍 Quand / où ça coince ?",
    situation_fun: "👀 Ce qui se passe (factuel)",
    public_fun: "👥 Qui est concerné à la maison ?",
    objectif_fun: "🎯 Ce que tu veux améliorer",
    lieu_defi: "🗺️ Scène de mission",
    situation_defi: "⚠️ Le “boss” du quotidien",
    public_defi: "🧑‍🤝‍🧑 Équipe maison",
    objectif_defi: "🏁 Nouvelle règle / solution",
    placeholderLieu: "Ex : le soir, le matin, pendant les devoirs…",
    placeholderSituation: "Ex : disputes, écrans, organisation, oublis…",
    placeholderPublic: "Ex : moi + parents, frères/sœurs…",
    placeholderObjectif: "Ex : planning simple + règle claire sur les écrans",
    cta_fun: "🚀 Trouver une idée",
    cta_defi: "🏆 Mission famille : GO",
  },
  creation: {
    helper: "💡 Mini-quête : inventer / créer un truc cool (et utile).",
    lieu_fun: "📍 Pour qui / où ça servira ?",
    situation_fun: "✨ Ton idée de départ (même floue)",
    public_fun: "👥 À qui ça s’adresse ?",
    objectif_fun: "🎯 Ce que tu veux fabriquer / produire",
    lieu_defi: "🗺️ Univers de création",
    situation_defi: "✨ Étincelle (ton idée)",
    public_defi: "🧑‍🤝‍🧑 Public / joueurs",
    objectif_defi: "🏁 Objet final",
    placeholderLieu: "Ex : pour le collège, un club, chez moi…",
    placeholderSituation: "Ex : affiche, BD, prototype, histoire, mini-projet…",
    placeholderPublic: "Ex : ma classe, les 6e, mes amis, ma famille…",
    placeholderObjectif: "Ex : résultat visible en 30 min (affiche / mini BD / plan)",
    cta_fun: "🚀 Créer le prompt",
    cta_defi: "🏆 Lancer la création",
  },
};

function styleLabel(s: Style) {
  if (s === "creer") return "🎨 Créer";
  if (s === "comprendre") return "🧠 Comprendre";
  return "🚀 Agir";
}

export default function LeDefiPromptPage() {
  // ✅ Ton recommandé : mode mission ON par défaut
  const [modeDefi, setModeDefi] = useState(true);

  const [style, setStyle] = useState<Style>("agir");
  const [niveau, setNiveau] = useState<Niveau>("Tous");
  const [duree, setDuree] = useState<Duree>("10 min");
  const [intention, setIntention] = useState<Intention>("ameliorer");

  const [theme, setTheme] = useState<ThemeId>("ecologie");
  const labels = useMemo(() => THEME_FUN[theme], [theme]);

  const [lieu, setLieu] = useState("Autour de moi (école / quartier / maison)");
  const [situation, setSituation] = useState(
    "Il y a souvent des déchets par terre près des poubelles."
  );
  const [publicCible, setPublicCible] = useState("jeunes / camarades / famille");
  const [objectif, setObjectif] = useState(
    "Trouver une action simple et motivante qui améliore la situation."
  );

  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const slogan =
    "Apprendre à bien utiliser l’IA, pour t’aider dans tes cours et agir sur le monde qui t’entoure.";

  // ✅ Labels réellement utilisés dans le JSX
  const L_LIEU = modeDefi ? labels.lieu_defi : labels.lieu_fun;
  const L_SITUATION = modeDefi ? labels.situation_defi : labels.situation_fun;
  const L_PUBLIC = modeDefi ? labels.public_defi : labels.public_fun;
  const L_OBJECTIF = modeDefi ? labels.objectif_defi : labels.objectif_fun;
  const CTA = modeDefi ? labels.cta_defi : labels.cta_fun;

  // ✅ au changement de thème : préremplissage "exemples" si c'est encore très vide
  useEffect(() => {
    const looksEmpty = (v: string) => v.trim().length < 6;
    const shouldFill =
      looksEmpty(lieu) || looksEmpty(situation) || looksEmpty(publicCible) || looksEmpty(objectif);

    if (!shouldFill) return;

    setLieu(labels.placeholderLieu.replace("Ex : ", ""));
    setSituation(labels.placeholderSituation.replace("Ex : ", ""));
    setPublicCible(labels.placeholderPublic.replace("Ex : ", ""));
    setObjectif(labels.placeholderObjectif.replace("Ex : ", ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  function buildPrompt() {
    const intentionTxt =
      intention === "comprendre"
        ? "comprendre la situation"
        : intention === "ameliorer"
        ? "améliorer la situation"
        : intention === "expliquer"
        ? "expliquer clairement le sujet"
        : intention === "creer"
        ? "créer quelque chose (projet, affiche, idée)"
        : intention === "convaincre"
        ? "convaincre de passer à l’action"
        : "apprendre en s’amusant";

    const ton =
      style === "creer"
        ? "créatif, positif, concret, avec mini-défi final"
        : style === "comprendre"
        ? "clair, structuré, avec questions et mini-quiz"
        : "orienté action, réaliste, mesurable, motivant";

    const formatAgir = `Format attendu :
1) Diagnostic rapide (5 lignes)
2) 3 causes possibles (sans juger)
3) 5 idées d’actions (simples, réalistes)
4) Une action “dès maintenant” (≤ ${duree})
5) Plan sur 7 jours (étapes)
6) Message à partager (2 versions) :
   - affiche (3 lignes)
   - message (SMS/ENT/email)
7) Mesurer si ça marche (2 indicateurs simples)
8) 3 questions à me poser pour améliorer encore`;

    const formatCreer = `Format attendu :
1) Idée principale (1 phrase)
2) 3 inspirations / exemples
3) Étapes de création (3 à 6 étapes)
4) Variante facile / variante “plus stylée”
5) Mini défi final (à toi de jouer)
6) Critères de réussite (3 points)
7) Question bonus (pour aller plus loin)`;

    const formatComprendre = `Format attendu :
1) Résumé simple (6 lignes max)
2) Questions-guides (5 questions)
3) Exemple concret
4) 3 pièges / erreurs fréquentes
5) Mini quiz (5 questions) + corrigé bref
6) Une action utile (≤ ${duree}) pour tester “en vrai”`;

    const format =
      style === "creer" ? formatCreer : style === "comprendre" ? formatComprendre : formatAgir;

    const themeLabel = THEMES.find((t) => t.id === theme)?.label ?? theme;

    const p = `Tu es un assistant pédagogique et citoyen. Tu aides un jeune à transformer une situation réelle en plan clair, utile et responsable.

Profil :
- Tranche : ${niveau}
- Style : ${styleLabel(style)}
- Intention : ${intentionTxt}
- Temps dispo : ${duree}

Contexte :
- Thème : ${themeLabel}
- Lieu : ${lieu}
- Observation : ${situation}
- Personnes concernées : ${publicCible}
- Objectif : ${objectif}

Contraintes importantes :
- Actions réalistes, faisables sans danger, sans harcèlement, sans jugement.
- Respect de la loi, de la vie privée, et du cadre scolaire.
- “Anti-triche” : tu guides, tu poses des questions, tu donnes des choix.
- Tu proposes au moins 3 options et tu expliques avantages/inconvénients.

${format}

Ton :
- ${ton}
`;

    setPrompt(p);
    setCopied(false);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // noop
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold">
              🏆 Le Défi Prompt
            </span>
            <span className="text-slate-400">{slogan}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Une idée. Un bon prompt. Une action.
          </h1>

          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            Tu regardes autour de toi, tu choisis ton style, et EleveAI t’aide à transformer ça
            en plan concret (sans faire à ta place).
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              🏠 Accueil
            </Link>

            <Link
              href="/espace-eleves"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🎒 Espace élèves
            </Link>

            <button
              onClick={() => setModeDefi((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold border ${
                modeDefi
                  ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                  : "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
              }`}
              title="Change le ton des libellés"
            >
              {modeDefi ? "🕹️ Mode mission : ON" : "🙂 Mode simple : ON"}
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Règle d’or : l’IA te guide (questions, étapes, options) — elle ne fait pas à ta place.
          </p>
        </div>
      </section>

      {/* 1) STYLE + OPTIONS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">1) Choisis ton style</h2>

          <div className="grid gap-3 md:grid-cols-3">
            {([
              { id: "creer", title: "🎨 Créer", text: "Inventer, dessiner, fabriquer, imaginer un truc utile." },
              { id: "comprendre", title: "🧠 Comprendre", text: "Analyser, poser les bonnes questions, voir clair." },
              { id: "agir", title: "🚀 Agir", text: "Plan simple + message + résultat mesurable." },
            ] as const).map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  style === s.id
                    ? "border-emerald-400/60 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/60 hover:bg-slate-900"
                }`}
              >
                <p className="text-sm font-semibold text-slate-100">{s.title}</p>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{s.text}</p>
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 pt-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold text-slate-200 mb-2">🎚️ Niveau (optionnel)</p>
              <select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value as Niveau)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              >
                {NIVEAUX.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">Ça adapte le ton et la difficulté.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold text-slate-200 mb-2">⏱️ Temps dispo</p>
              <select
                value={duree}
                onChange={(e) => setDuree(e.target.value as Duree)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              >
                {DUREES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">On cale une mission qui tient dans ce temps.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold text-slate-200 mb-2">🧭 Ton intention</p>
              <div className="flex flex-wrap gap-2">
                {INTENTIONS.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIntention(i.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold border ${
                      intention === i.id
                        ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                        : "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {i.icon} {i.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) THEME + CHAMPS FUN */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">
            2) {modeDefi ? "Choisis ton terrain" : "Regarde autour de toi"}
          </h2>

          <div className="grid gap-3 md:grid-cols-5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  theme === t.id
                    ? "border-emerald-400/60 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/60 hover:bg-slate-900"
                }`}
              >
                <p className="text-2xl" aria-hidden>
                  {t.icon}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{t.label}</p>
                <p className="mt-2 text-[11px] text-slate-400">
                  Ex : <span className="text-slate-200">{t.exemples.join(", ")}</span>
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-900/10 p-4">
            <p className="text-sm font-semibold text-emerald-200">{labels.helper}</p>
            <p className="text-xs text-slate-300 mt-1">
              {modeDefi
                ? "Tu donnes l’indice → EleveAI te sort un plan + un message + une action immédiate."
                : "Décris simplement ce que tu vois. Après, on rend ça puissant."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr,1fr] items-start">
            {/* FORM */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">{L_LIEU}</label>
                <input
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  placeholder={labels.placeholderLieu}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  {L_SITUATION}
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder={labels.placeholderSituation}
                  className="w-full min-h-[110px] rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">{L_PUBLIC}</label>
                  <input
                    value={publicCible}
                    onChange={(e) => setPublicCible(e.target.value)}
                    placeholder={labels.placeholderPublic}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">
                    {L_OBJECTIF}
                  </label>
                  <input
                    value={objectif}
                    onChange={(e) => setObjectif(e.target.value)}
                    placeholder={labels.placeholderObjectif}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                  />
                </div>
              </div>

              <button
                onClick={buildPrompt}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                {CTA}
              </button>

              <p className="text-[11px] text-slate-500">
                {modeDefi ? "Tip : un bon indice = où + quoi + qui + objectif." : "Tip : simple d’abord, pro ensuite."}
              </p>
            </div>

            {/* OUTPUT */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">
                  {modeDefi ? "📜 Ton parchemin (prompt)" : "📜 Ton prompt prêt à copier"}
                </p>
                <button
                  onClick={copyPrompt}
                  disabled={!prompt}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                    prompt
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
                      : "border-slate-700 bg-slate-950 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {copied ? "✅ Copié" : "📋 Copier"}
                </button>
              </div>

              <pre className="whitespace-pre-wrap text-xs text-slate-200 bg-slate-950/60 border border-slate-800 rounded-xl p-3 min-h-[340px]">
                {prompt ||
                  (modeDefi
                    ? "Choisis un terrain → décris l’indice → clique sur « Je relève le défi »."
                    : "Choisis un thème → décris simplement → clique sur « Lancer l’idée ».")}
              </pre>

              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-xs font-semibold text-slate-200">🔒 Règle d’or</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  L’IA ne fait pas à ta place : elle t’aide à penser, structurer et agir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-100">Besoin de prompts “100% cours” ?</p>
              <p className="text-xs text-slate-400">
                L’espace élèves est plus scolaire (révisions, contrôles, méthodes).
              </p>
            </div>
            <Link
              href="/espace-eleves"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              🎒 Aller à l’espace élèves →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
