"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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

const TYPES_LIEU: { value: TypeLieu; label: string }[] = [
  { value: "classe", label: "Ma classe / mon collège / mon lycée" },
  { value: "famille", label: "Ma famille / ma maison" },
  { value: "etablissement", label: "Tout l’établissement" },
  { value: "quartier", label: "Mon quartier / mon village" },
  { value: "en_ligne", label: "Une communauté en ligne" },
  { value: "autre", label: "Autre" },
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
   PRESETS (6e friendly)
---------------------------------------- */

type PresetKeyDefi =
  | "mission_classe_bonne_ambiance"
  | "mission_anti_moqueries"
  | "mission_ecolo_gourde"
  | "mission_proprete_classe"
  | "mission_entraide_devoirs"
  | "mission_compliments"
  | "mission_famille_moins_ecrans"
  | "mission_crea_affiche";

type DefiPreset = {
  label: string; // court, punchy
  description: string; // 1 phrase
  emoji: string;
  valeurs: Partial<DefiForm>;
};

const PRESETS_DEFI: Record<PresetKeyDefi, DefiPreset> = {
  mission_classe_bonne_ambiance: {
    emoji: "😊",
    label: "Mission : meilleure ambiance",
    description: "Rendre la classe plus gentille, plus calme, plus cool.",
    valeurs: {
      typeLieu: "classe",
      domaine: "bien_etre",
      titreDefi: "Une classe plus cool et plus gentille",
      descriptionDefi:
        "Je veux améliorer l’ambiance dans la classe : moins de disputes, plus de respect, plus d’entraide.",
      pourquoiImportant:
        "Quand l’ambiance est bonne, on apprend mieux et on se sent mieux.",
      personnesImpliquees: "Mes camarades + un adulte (prof principal, CPE).",
      tempsDispo: "2 à 4 semaines (puis on continue si ça marche).",
      niveauEnergie: "normal",
    },
  },

  mission_anti_moqueries: {
    emoji: "🛡️",
    label: "Mission : zéro moqueries",
    description: "Stop aux petites moqueries. On protège tout le monde.",
    valeurs: {
      typeLieu: "classe",
      domaine: "entraide",
      titreDefi: "Zéro moqueries, 100% respect",
      descriptionDefi:
        "Je veux qu’on arrête les moqueries et qu’on ait des règles simples de respect (mots, gestes, réseaux).",
      pourquoiImportant:
        "Personne ne doit se sentir humilié ou exclu à l’école.",
      personnesImpliquees: "Mes camarades + professeur + vie scolaire.",
      tempsDispo: "1 mois (avec un bilan chaque semaine).",
      niveauEnergie: "maxi",
    },
  },

  mission_ecolo_gourde: {
    emoji: "🌱",
    label: "Mission : classe écolo",
    description: "Moins de plastique, plus de bons réflexes.",
    valeurs: {
      typeLieu: "classe",
      domaine: "ecologie",
      titreDefi: "Ma classe écolo : objectif moins de déchets",
      descriptionDefi:
        "Je veux réduire les déchets : gourdes, tri simple, moins de papier gaspillé.",
      pourquoiImportant:
        "On peut aider la planète avec des petits gestes faciles.",
      personnesImpliquees: "La classe + un adulte + éventuellement la cantine.",
      tempsDispo: "3 semaines (objectif mesurable).",
      niveauEnergie: "normal",
    },
  },

  mission_proprete_classe: {
    emoji: "🧹",
    label: "Mission : classe propre",
    description: "On garde la salle clean, simple et efficace.",
    valeurs: {
      typeLieu: "classe",
      domaine: "bien_etre",
      titreDefi: "Classe propre = classe agréable",
      descriptionDefi:
        "Je veux qu’on garde la classe propre : papiers à la poubelle, tables rangées, matériel respecté.",
      pourquoiImportant:
        "Une classe propre, c’est plus agréable et on perd moins de temps.",
      personnesImpliquees: "La classe + un adulte pour valider les règles.",
      tempsDispo: "2 semaines (test) puis on garde ce qui marche.",
      niveauEnergie: "mini",
    },
  },

  mission_entraide_devoirs: {
    emoji: "🤝",
    label: "Mission : entraide devoirs",
    description: "On s’aide sans tricher. On progresse ensemble.",
    valeurs: {
      typeLieu: "classe",
      domaine: "apprentissages",
      titreDefi: "S’entraider pour les devoirs",
      descriptionDefi:
        "Je veux créer un petit système d’entraide : binômes, mini-temps questions, explications entre élèves.",
      pourquoiImportant:
        "Quand on explique à quelqu’un, on comprend mieux soi-même.",
      personnesImpliquees: "Mes camarades + un prof pour organiser.",
      tempsDispo: "2 à 3 semaines pour démarrer.",
      niveauEnergie: "normal",
    },
  },

  mission_compliments: {
    emoji: "🌟",
    label: "Mission : compliments",
    description: "Une phrase gentille par jour. Ça change tout.",
    valeurs: {
      typeLieu: "classe",
      domaine: "bien_etre",
      titreDefi: "1 compliment par jour",
      descriptionDefi:
        "Je veux qu’on se dise plus de choses positives : compliments, merci, encouragements.",
      pourquoiImportant:
        "Ça donne confiance et ça rend la classe plus agréable.",
      personnesImpliquees: "La classe (et un adulte si besoin).",
      tempsDispo: "10 jours (puis bilan).",
      niveauEnergie: "mini",
    },
  },

  mission_famille_moins_ecrans: {
    emoji: "📵",
    label: "Mission : moins d’écrans",
    description: "Plus d’activités ensemble, moins de téléphone.",
    valeurs: {
      typeLieu: "famille",
      domaine: "bien_etre",
      titreDefi: "Réduire les écrans en famille",
      descriptionDefi:
        "Je veux proposer un défi à ma famille pour passer moins de temps sur les écrans et faire plus d’activités ensemble.",
      pourquoiImportant:
        "On passe beaucoup de temps chacun de notre côté, j’aimerais qu’on se parle plus.",
      personnesImpliquees: "Mes parents, mes frères et sœurs.",
      tempsDispo: "Pendant 2 semaines.",
      niveauEnergie: "normal",
    },
  },

  mission_crea_affiche: {
    emoji: "🎨",
    label: "Mission : affiche / projet",
    description: "Créer une affiche ou un petit projet pour la classe.",
    valeurs: {
      typeLieu: "classe",
      domaine: "creativite",
      titreDefi: "Créer une affiche utile pour la classe",
      descriptionDefi:
        "Je veux faire une affiche (ou mini-projet) qui aide la classe : règles de respect, éco-gestes, entraide, etc.",
      pourquoiImportant:
        "Une affiche simple peut aider tout le monde à se rappeler les bonnes idées.",
      personnesImpliquees: "2-3 camarades + un adulte pour valider.",
      tempsDispo: "1 semaine.",
      niveauEnergie: "mini",
    },
  },
};

const PRESET_ORDER: PresetKeyDefi[] = [
  "mission_classe_bonne_ambiance",
  "mission_anti_moqueries",
  "mission_compliments",
  "mission_entraide_devoirs",
  "mission_proprete_classe",
  "mission_ecolo_gourde",
  "mission_crea_affiche",
  "mission_famille_moins_ecrans",
];

/* ----------------------------------------
   UI: Presets strip (sans recherche/tri)
---------------------------------------- */

function Presets6e({
  onPick,
}: {
  onPick: (key: PresetKeyDefi) => void;
}) {
  return (
    <section className="rounded-3xl bg-white/95 p-4 sm:p-5 shadow-sm ring-1 ring-emerald-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            1️⃣ Choisis une mission (facultatif)
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Clique sur une carte si tu veux une idée de départ. Sinon, remplis
            directement le formulaire.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto scroll-smooth pr-2 no-scrollbar">
        {PRESET_ORDER.map((key) => {
          const p = PRESETS_DEFI[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onPick(key)}
              className="min-w-[240px] max-w-[280px] rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-left shadow-sm hover:bg-emerald-100"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="font-bold text-emerald-900 text-sm">
                    {p.label}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 ring-1 ring-emerald-200 text-emerald-800">
                  Idée
                </span>
              </div>

              <p className="mt-2 text-[12px] text-emerald-900/90">
                {p.description}
              </p>

              <div className="mt-3 text-[11px] text-emerald-900/80">
                👉 Cliquer pour choisir
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function DefisPereNoelPage() {
  const [form, setForm] = useState<DefiForm>({
    prenom: "",
    ageOuClasse: "6e",
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
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  function handleChange<K extends keyof DefiForm>(field: K, value: DefiForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: PresetKeyDefi) {
    const preset = PRESETS_DEFI[key];
    setForm((prev) => ({
      ...prev,
      ...preset.valeurs,
      ageOuClasse: prev.ageOuClasse || "6e",
    }));
    // on efface le prompt final pour éviter confusion
    setPromptFinal("");
    setCopiedPrompt(false);
    setCopiedDiscord(false);
  }

  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.titreDefi.trim())
      s.push("Donne un titre simple à ton défi (ex : Classe plus cool).");
    if (!form.descriptionDefi.trim())
      s.push("Explique ce que tu veux changer concrètement (en 2-4 phrases).");
    if (!form.pourquoiImportant.trim())
      s.push("Dis pourquoi c’est important pour toi ou pour les autres.");
    if (!form.personnesImpliquees.trim())
      s.push("Dis qui peut t’aider (amis, prof, CPE, famille…).");
    if (!form.tempsDispo.trim())
      s.push("Indique la durée (10 jours, 2 semaines, 1 mois…).");

    if (s.length === 0)
      s.push("C’est prêt ! Clique sur « Générer mon prompt » puis copie-colle.");

    return s;
  }, [form]);

  function descriptionNiveauEnergie() {
    switch (form.niveauEnergie) {
      case "mini":
        return "Défi simple, petites actions faciles.";
      case "normal":
        return "Je peux m’y mettre régulièrement si c’est bien organisé.";
      case "maxi":
        return "Défi ambitieux, plusieurs étapes + équipe.";
    }
  }

  function genererPromptFinal() {
    if (!form.titreDefi.trim() || !form.descriptionDefi.trim()) {
      alert("Merci de remplir au minimum le titre + la description.");
      return;
    }

    const prenom = form.prenom.trim() || "un élève de 6e";
    const titre = form.titreDefi.trim();
    const description = form.descriptionDefi.trim();
    const pourquoi =
      form.pourquoiImportant.trim() || "Je veux améliorer les choses autour de moi.";

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
      form.tempsDispo.trim() || "À définir pour que ce soit réaliste.";
    const contraintes = form.contraintes.trim();

    const prompt =
      `Tu es une IA pédagogique et créative. Tu aides ${prenom} à imaginer un **défi positif** (niveau 6e), très concret.\n\n` +
      `🎯 Titre : ${titre}\n` +
      `🌍 Lieu : ${contexteLieu}\n` +
      `🏷️ Domaine : ${domaineTexte}\n\n` +
      `📝 Ce que je veux changer :\n${description}\n\n` +
      `💡 Pourquoi c’est important :\n${pourquoi}\n\n` +
      `👥 Personnes à impliquer :\n${personnes}\n\n` +
      `⏱️ Durée :\n${temps}\n\n` +
      `⚡ Mon énergie :\n${descriptionNiveauEnergie()}\n\n` +
      (contraintes ? `⚠️ Contraintes :\n${contraintes}\n\n` : "") +
      `🎄 Ta mission (réponse courte, claire, motivante) :\n` +
      `1) Reformule mon défi en 3 phrases simples.\n` +
      `2) Propose un plan en 5 étapes (actions très concrètes).\n` +
      `3) Donne 5 idées faciles pour embarquer la classe / un adulte.\n` +
      `4) Ajoute 3 “indicateurs de réussite” (comment je sais que ça marche).\n` +
      `5) Termine par un message “Père Noël de l’IA” (encourageant).`;

    setPromptFinal(prompt);
    setCopiedPrompt(false);
    setCopiedDiscord(false);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    await navigator.clipboard.writeText(promptFinal);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1500);
  }

  async function copierPourDiscord() {
    if (!promptFinal) return;
    await navigator.clipboard.writeText(promptFinal);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 1500);
  }

  const whatsappUrl = promptFinal
    ? `https://wa.me/33692742958?text=${encodeURIComponent(promptFinal)}`
    : undefined;

  const tchatHref = promptFinal
    ? `/tchat?prompt=${encodeURIComponent(promptFinal)}`
    : "/tchat";

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            🎄 Défis IA Père Noël – spécial 6e
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Écris ton défi (et laisse l’IA t’aider)
          </h1>

          <p className="text-sm text-gray-700 max-w-2xl">
            Tu remplis le formulaire, puis tu génères un message (un prompt) à coller
            dans EleveAI, ChatGPT, Gemini… L’IA te donne un plan d’action simple.
          </p>

          <div className="text-xs text-gray-600 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
            >
              ⬅️ Retour
            </Link>
            <span>
              Étapes : 1) mission (optionnel) → 2) formulaire → 3) générer → 4) copier/coller.
            </span>
          </div>
        </header>

        {/* ✅ PRESETS SANS RECHERCHE/TRI */}
        <Presets6e onPick={appliquerPreset} />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-md font-bold text-[#0047B6]">2️⃣ Raconte ton défi</h2>

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
                <label className="text-xs font-semibold">Âge / classe (facultatif)</label>
                <input
                  type="text"
                  value={form.ageOuClasse}
                  onChange={(e) => handleChange("ageOuClasse", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : 6e, 11 ans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Type de lieu</label>
                <select
                  value={form.typeLieu}
                  onChange={(e) => handleChange("typeLieu", e.target.value as TypeLieu)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Choisir…</option>
                  {TYPES_LIEU.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Où exactement ? (facultatif)</label>
              <input
                type="text"
                value={form.lieuPrecis}
                onChange={(e) => handleChange("lieuPrecis", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Ex : mon collège, ma rue, ma maison…"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Domaine</label>
                <select
                  value={form.domaine}
                  onChange={(e) => handleChange("domaine", e.target.value as DomaineDefi)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Choisir…</option>
                  {DOMAINES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Titre</label>
                <input
                  type="text"
                  value={form.titreDefi}
                  onChange={(e) => handleChange("titreDefi", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : Classe plus cool"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Ce que tu veux changer</label>
              <textarea
                value={form.descriptionDefi}
                onChange={(e) => handleChange("descriptionDefi", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[90px]"
                placeholder="Décris ton idée en 2 à 4 phrases."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Pourquoi c’est important ?</label>
              <textarea
                value={form.pourquoiImportant}
                onChange={(e) => handleChange("pourquoiImportant", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px]"
                placeholder="Ex : pour mieux apprendre, mieux vivre ensemble…"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Qui peut t’aider ?</label>
                <textarea
                  value={form.personnesImpliquees}
                  onChange={(e) => handleChange("personnesImpliquees", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                  placeholder="Ex : mes amis, un prof, CPE, famille…"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Durée</label>
                <textarea
                  value={form.tempsDispo}
                  onChange={(e) => handleChange("tempsDispo", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                  placeholder="Ex : 10 jours, 2 semaines, 1 mois…"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Niveau d’énergie</label>
                <select
                  value={form.niveauEnergie}
                  onChange={(e) => handleChange("niveauEnergie", e.target.value as NiveauEnergie)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="mini">Mini : petites actions faciles</option>
                  <option value="normal">Normal : je m’y mets régulièrement</option>
                  <option value="maxi">Maxi : gros défi en équipe</option>
                </select>
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

            <div className="pt-3 flex justify-end">
              <button
                onClick={genererPromptFinal}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
              >
                ⚙️ Générer mon prompt Père Noël
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-lg font-bold text-emerald-700">3️⃣ Conseils</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span>➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 text-slate-50 border border-slate-800 rounded-2xl shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-emerald-300">4️⃣ Ton prompt</h2>
                  <p className="text-[11px] text-slate-300">
                    Copie-colle ce texte dans EleveAI / ChatGPT / Gemini…
                  </p>
                </div>
                <button
                  onClick={copierPrompt}
                  disabled={!promptFinal}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    promptFinal ? "bg-slate-100 text-slate-900" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {copiedPrompt ? "✅ Copié" : "📋 Copier"}
                </button>
              </div>

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono bg-slate-950 min-h-[230px]"
                placeholder="Ton prompt apparaîtra ici après génération."
              />

 
              <div className="pt-3 space-y-2">
                <p className="text-[11px] text-slate-300">Utiliser dans :</p>
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
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                Astuce : après la réponse de l’IA, tu peux recopier le plan et demander “fais plus simple”
                ou “donne-moi 3 étapes”.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
