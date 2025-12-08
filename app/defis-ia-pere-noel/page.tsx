"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";

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
   PRESETS
---------------------------------------- */

type PresetKeyDefi =
  | "defi_classe_ecologie"
  | "defi_famille_ecrans"
  | "defi_etab_solidarite"
  | "defi_perso_confiance";

const PRESETS_DEFI: Record<
  PresetKeyDefi,
  { label: string; description: string; valeurs: Partial<DefiForm> }
> = {
  defi_classe_ecologie: {
    label: "🌱 Défi écologie dans ma classe",
    description:
      "Réduire les déchets et économiser l’énergie dans une classe ou un collège.",
    valeurs: {
      typeLieu: "classe",
      domaine: "ecologie",
      titreDefi: "Rendre ma classe plus écologique",
      descriptionDefi:
        "Je voudrais mettre en place des actions simples pour moins gaspiller (papier, électricité, plastique) dans ma classe.",
      pourquoiImportant:
        "Je trouve qu’on jette trop de choses et j’aimerais qu’on prenne mieux soin de la planète.",
      personnesImpliquees: "Mes camarades, mon/ma professeur principal(e).",
      tempsDispo: "Toute l’année scolaire, avec de petites actions régulières.",
      niveauEnergie: "normal",
    },
  },

  defi_famille_ecrans: {
    label: "📵 Défi en famille : moins d’écrans",
    description:
      "Organiser un défi en famille pour réduire les écrans et faire plus d’activités ensemble.",
    valeurs: {
      typeLieu: "famille",
      domaine: "bien_etre",
      titreDefi: "Réduire les écrans en famille",
      descriptionDefi:
        "Je veux proposer un défi à ma famille pour passer moins de temps sur les écrans et faire plus d’activités ensemble.",
      pourquoiImportant:
        "On passe beaucoup de temps chacun de notre côté sur nos écrans, j’aimerais qu’on discute et qu’on joue plus ensemble.",
      personnesImpliquees: "Mes parents, mes frères et sœurs.",
      tempsDispo: "Pendant les vacances et quelques semaines après.",
      niveauEnergie: "normal",
    },
  },

  defi_etab_solidarite: {
    label: "🎁 Défi solidarité dans l’établissement",
    description:
      "Imaginer une action solidaire (collecte, aide, projet) avec plusieurs classes.",
    valeurs: {
      typeLieu: "etablissement",
      domaine: "entraide",
      titreDefi: "Organiser une action solidaire",
      descriptionDefi:
        "Je voudrais organiser avec d’autres élèves une action solidaire (collecte, entraide, visite…) pour des personnes qui en ont besoin.",
      pourquoiImportant:
        "Je veux que notre établissement soit connu pour sa solidarité et son engagement.",
      personnesImpliquees:
        "Le CVC ou CVL, quelques professeurs, la vie scolaire.",
      tempsDispo: "Entre janvier et mars.",
      niveauEnergie: "maxi",
    },
  },

  defi_perso_confiance: {
    label: "⭐ Défi personnel : confiance en moi",
    description:
      "Défi individuel pour gagner en confiance (oral, organisation, projet perso…).",
    valeurs: {
      typeLieu: "autre",
      domaine: "apprentissages",
      titreDefi: "Gagner confiance en moi cette année",
      descriptionDefi:
        "Je veux lancer un défi pour oser davantage participer à l’oral et présenter un petit projet personnel.",
      pourquoiImportant:
        "Je me sens souvent trop timide et j’aimerais prendre plus la parole et être fier de moi.",
      personnesImpliquees: "Moi d’abord, puis 1 ou 2 adultes de confiance.",
      tempsDispo: "3 à 4 mois.",
      niveauEnergie: "mini",
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
  badge: "Idée de défi",
}));

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function DefisPereNoelPage() {
  const [form, setForm] = useState<DefiForm>({
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
    }));
  }

  /* ----------------------------------------
     SUGGESTIONS
  ---------------------------------------- */

  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.titreDefi.trim())
      s.push("Donne un titre à ton défi, même simple (ex : Classe plus verte).");
    if (!form.descriptionDefi.trim())
      s.push("Explique en quelques phrases ce que tu veux changer concrètement.");
    if (!form.pourquoiImportant.trim())
      s.push("Note pourquoi ce défi est important pour toi ou pour les autres.");
    if (!form.personnesImpliquees.trim())
      s.push("Dis qui pourrait t’aider : camarades, adultes, famille…");
    if (!form.tempsDispo.trim())
      s.push("Indique sur combien de temps tu imagines ce défi (semaines, mois…).");

    if (s.length === 0)
      s.push(
        "Ton formulaire est prêt ! Tu peux cliquer sur « Générer mon prompt » puis l’envoyer à Frédéric.",
      );

    return s;
  }, [form]);

  /* ----------------------------------------
     DESCRIPTION NIVEAU D'ÉNERGIE
  ---------------------------------------- */

  function descriptionNiveauEnergie() {
    switch (form.niveauEnergie) {
      case "mini":
        return "Je cherche un défi simple, avec de petites actions faciles à tenir.";
      case "normal":
        return "Je suis prêt(e) à m’investir régulièrement si le plan est bien organisé.";
      case "maxi":
        return "Je veux un défi ambitieux avec plusieurs étapes et du travail d’équipe.";
    }
  }

  /* ----------------------------------------
     MOULINETTE : GENERER LE PROMPT
  ---------------------------------------- */

  function genererPromptFinal() {
    if (!form.titreDefi.trim() || !form.descriptionDefi.trim()) {
      alert(
        "Merci de remplir au minimum le titre du défi et la description de ce que tu veux changer.",
      );
      return;
    }

    const prenom = form.prenom.trim() || "un élève";
    const titre = form.titreDefi.trim();
    const description = form.descriptionDefi.trim();
    const pourquoi =
      form.pourquoiImportant.trim() ||
      "Je veux créer un changement positif autour de moi.";
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
      form.tempsDispo.trim() ||
      "Le calendrier peut être adapté pour que le défi reste réaliste.";
    const contraintes = form.contraintes.trim();

    const prompt =
      `Tu es une IA pédagogique et créative qui aide ${prenom} à imaginer un **défi positif** pour changer un petit morceau du monde.\n\n` +
      `🎯 *Titre du défi* : ${titre}\n` +
      `🌍 *Contexte / lieu* : ${contexteLieu}\n` +
      `🏷️ *Domaine principal* : ${domaineTexte}\n\n` +
      `📝 *Description de ce que je veux changer* :\n${description}\n\n` +
      `💡 *Pourquoi ce défi est important pour moi / pour nous* :\n${pourquoi}\n\n` +
      `👥 *Personnes qui pourraient être impliquées* :\n${personnes}\n\n` +
      `⏱️ *Durée ou période imaginée* :\n${temps}\n\n` +
      `⚡ *Niveau d’énergie que je peux y mettre* :\n${descriptionNiveauEnergie()}\n\n` +
      (contraintes
        ? `⚠️ *Contraintes à respecter* :\n${contraintes}\n\n`
        : "") +
      `🎄 Ta mission :\n` +
      `1. Reformule mon défi en quelques phrases claires, comme si tu écrivais un petit briefing pour un projet.\n` +
      `2. Propose-moi un plan d’action en étapes simples (avec des actions très concrètes) adapté à mon niveau d’énergie.\n` +
      `3. Donne quelques idées pour impliquer les autres (classe, famille, adultes…).\n` +
      `4. Termine par un petit message motivant, façon “Père Noël de l’IA” qui m’encourage à essayer pour de vrai.`;

    setPromptFinal(prompt);
    setCopiedPrompt(false);
    setCopiedDiscord(false);
  }

  /* ----------------------------------------
     ACTIONS : COPIE + WHATSAPP
  ---------------------------------------- */

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
    : undefined; // adapte le numéro

  const tchatHref = promptFinal
    ? `/tchat?prompt=${encodeURIComponent(promptFinal)}`
    : "/tchat";

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            🎄 Défis IA Père Noël – Change ton monde
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Écris ton défi IA Père Noël
          </h1>

          <p className="text-sm text-gray-700 max-w-2xl">
            Tu vas préparer un *prompt* que tu pourras envoyer à Frédéric
            (WhatsApp ou Discord). L’idée : imaginer un défi positif pour ta
            classe, ta famille, ton établissement… et laisser l’IA t’aider à en
            faire un vrai plan d’action.
          </p>

          <div className="text-xs text-gray-600 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
            >
              ⬅️ Retour à l’accueil EleveAI
            </Link>
            <span>
              Étapes : 1) Tu remplis le formulaire – 2) Tu génères ton prompt –
              3) Tu l’envoies à Frédéric.
            </span>
          </div>
        </header>

        {/* PRESETS */}
        <PresetCarousel
          title="1️⃣ Choisis un modèle de défi (facultatif)"
          subtitle="Tu peux partir d’une idée proche de ce que tu veux faire, puis adapter ensuite tous les champs."
          items={PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as PresetKeyDefi)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* COLONNE GAUCHE : FORMULAIRE */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-md font-bold text-[#0047B6]">
              2️⃣ Raconte ton défi
            </h2>

            {/* Infos de base */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Prénom (facultatif)
                </label>
                <input
                  type="text"
                  value={form.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : Lina"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Âge / classe (facultatif)
                </label>
                <input
                  type="text"
                  value={form.ageOuClasse}
                  onChange={(e) =>
                    handleChange("ageOuClasse", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : 5e, 14 ans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Type de lieu</label>
                <select
                  value={form.typeLieu}
                  onChange={(e) =>
                    handleChange("typeLieu", e.target.value as TypeLieu)
                  }
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

            {/* Lieu précis */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Où se passe ton défi ? (facultatif)
              </label>
              <input
                type="text"
                value={form.lieuPrecis}
                onChange={(e) => handleChange("lieuPrecis", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Ex : Collège X à La Réunion, à la maison, dans mon quartier…"
              />
            </div>

            {/* Domaine + Titre */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Domaine principal du défi
                </label>
                <select
                  value={form.domaine}
                  onChange={(e) =>
                    handleChange("domaine", e.target.value as DomaineDefi)
                  }
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
                <label className="text-xs font-semibold">
                  Titre de ton défi
                </label>
                <input
                  type="text"
                  value={form.titreDefi}
                  onChange={(e) => handleChange("titreDefi", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : Une classe plus écologique"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Ce que tu veux changer concrètement
              </label>
              <textarea
                value={form.descriptionDefi}
                onChange={(e) =>
                  handleChange("descriptionDefi", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
                placeholder="Décris ton idée avec tes mots : ce qui te gêne aujourd’hui et ce que tu aimerais voir comme changement."
              />
            </div>

            {/* Pourquoi c'est important */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Pourquoi ce défi est important pour toi / pour vous ?
              </label>
              <textarea
                value={form.pourquoiImportant}
                onChange={(e) =>
                  handleChange("pourquoiImportant", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px]"
                placeholder="Ex : Pour que l’ambiance soit meilleure, pour aider des personnes, pour protéger la nature…"
              />
            </div>

            {/* Personnes + temps */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Qui pourrait t’aider ?
                </label>
                <textarea
                  value={form.personnesImpliquees}
                  onChange={(e) =>
                    handleChange("personnesImpliquees", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                  placeholder="Ex : mes camarades, un prof, la vie scolaire, ma famille…"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Sur combien de temps ? (semaines, mois…)
                </label>
                <textarea
                  value={form.tempsDispo}
                  onChange={(e) =>
                    handleChange("tempsDispo", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                  placeholder="Ex : Un mois, tout le deuxième trimestre, pendant les vacances…"
                />
              </div>
            </div>

            {/* Niveau d'énergie + contraintes */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Ton niveau d’énergie pour ce défi
                </label>
                <select
                  value={form.niveauEnergie}
                  onChange={(e) =>
                    handleChange("niveauEnergie", e.target.value as NiveauEnergie)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="mini">
                    Mini : petites actions simples à mettre en place
                  </option>
                  <option value="normal">
                    Normal : je peux m’investir régulièrement
                  </option>
                  <option value="maxi">
                    Maxi : gros défi avec plusieurs étapes
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Contraintes à respecter (facultatif)
                </label>
                <textarea
                  value={form.contraintes}
                  onChange={(e) =>
                    handleChange("contraintes", e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[60px]"
                  placeholder="Ex : Pas d’argent à dépenser, pas trop de temps pour les adultes…"
                />
              </div>
            </div>

            {/* Bouton générer */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={genererPromptFinal}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
              >
                ⚙️ Générer mon prompt Père Noël
              </button>
            </div>
          </section>

          {/* COLONNE DROITE */}
          <section className="space-y-4">
            {/* Suggestions */}
            <div className="bg-white/95 border border-emerald-200 rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-lg font-bold text-emerald-700">
                3️⃣ Conseils pour mieux remplir
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span>➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prompt final + actions */}
            <div className="bg-slate-900 text-slate-50 border border-slate-800 rounded-2xl shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-emerald-300">
                    4️⃣ Ta liste de défis / ton prompt
                  </h2>
                  <p className="text-[11px] text-slate-300">
                    Tu pourras envoyer ce message à Frédéric sur WhatsApp ou le
                    coller sur Discord.
                  </p>
                </div>
                <button
                  onClick={copierPrompt}
                  disabled={!promptFinal}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    promptFinal
                      ? "bg-slate-100 text-slate-900"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {copiedPrompt ? "✅ Copié" : "📋 Copier"}
                </button>
              </div>

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono bg-slate-950 min-h-[220px]"
                placeholder="Ton prompt Père Noël apparaîtra ici après avoir cliqué sur « Générer mon prompt »."
              />

              {/* Boutons WhatsApp / Discord */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={whatsappUrl || "#"}
                  target={whatsappUrl ? "_blank" : undefined}
                  rel={whatsappUrl ? "noreferrer" : undefined}
                  aria-disabled={!promptFinal}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                    promptFinal
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  💬 Envoyer sur WhatsApp (Frédéric)
                </a>

                <button
                  onClick={copierPourDiscord}
                  disabled={!promptFinal}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                    promptFinal
                      ? "bg-slate-100 text-slate-900"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {copiedDiscord ? "✅ Copié pour Discord" : "🧩 Copier pour Discord"}
                </button>
              </div>

              {/* 🔗 Liens vers les IA */}
              <div className="pt-3 space-y-2">
                <p className="text-[11px] text-slate-300">
                  Tu peux aussi utiliser ce prompt dans l’IA de ton choix :
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href={tchatHref}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Utiliser EleveAI
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
                Astuce : après la réponse de Frédéric ou de l’IA, tu pourras
                renvoyer un nouveau message pour affiner ton plan d’action.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


