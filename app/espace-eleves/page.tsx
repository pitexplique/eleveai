"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";


/* ----------------------------------------
   TYPES
---------------------------------------- */

type Classe =
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "Seconde"
  | "Première"
  | "Terminale"
  | "";

type Confiance = "en_difficulte" | "moyen" | "a_l_aise";

type TypeAide =
  | "manipuler_pour_comprendre"
  | "comprendre_le_cours"
  | "reviser_un_chapitre"
  | "preparer_un_controle"
  | "faire_des_exercices"
  | "methode_de_travail"
  | "defis";

type DysType =
  | "dyslexie"
  | "dyspraxie"
  | "dyscalculie"
  | "dysorthographie"
  | "autre";

type PromptEleve = {
  prenom: string;
  classe: Classe;
  matiere: string;
  chapitre: string;
  typeAide: TypeAide | "";
  confiance: Confiance;
  tempsDispo: string;
  objectifPerso: string;
  exemplesDifficiles: string;
  prefereQuestions: boolean;
  prefereExemplesConcrets: boolean;
  adaptationDYS: boolean;
  dysTypes: DysType[];
  dysPrecisionAutre?: string;
};

/* ----------------------------------------
   LISTES
---------------------------------------- */

const CLASSES: Classe[] = [
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

const TYPES_AIDE: { value: TypeAide; label: string }[] = [
  {
    value: "manipuler_pour_comprendre",
    label: "Manipuler pour comprendre",
  },
  { value: "comprendre_le_cours", label: "Comprendre le cours" },
  { value: "reviser_un_chapitre", label: "Réviser un chapitre" },
  { value: "preparer_un_controle", label: "Préparer un contrôle" },
  { value: "faire_des_exercices", label: "Faire des exercices" },
  { value: "methode_de_travail", label: "Méthode de travail" },
  { value: "defis", label: "Défis" },
];

/* ----------------------------------------
   PRESETS
---------------------------------------- */

type PresetKey =
  | "controle_fractions_5e"
  | "brevet_maths_3e"
  | "redaction_francais_3e"
  | "methodo_seconde"
  | "decouverte_6e_maths"
  | "remise_a_niveau_4e_francais"
  | "terminale_spe_maths_fonctions"
  | "troisieme_anglais_oral";

const PRESETS: Record<
  PresetKey,
  { label: string; description: string; valeurs: Partial<PromptEleve> }
> = {
  controle_fractions_5e: {
    label: "🟣 5e – Contrôle de maths (fractions)",
    description: "Pour réviser un contrôle de fractions simple.",
    valeurs: {
      classe: "5e",
      matiere: "Mathématiques",
      chapitre: "Fractions : addition, soustraction, simplification",
      typeAide: "preparer_un_controle",
      confiance: "en_difficulte",
      tempsDispo: "30 minutes",
      objectifPerso:
        "Je voudrais enfin comprendre comment additionner des fractions sans me tromper.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  brevet_maths_3e: {
    label: "🧮 3e – Préparer le brevet de maths",
    description: "Révision globale : calcul, géométrie, fonctions, probas.",
    valeurs: {
      classe: "3e",
      matiere: "Mathématiques",
      chapitre:
        "Révision brevet : fonctions, calcul littéral, géométrie, probabilités",
      typeAide: "preparer_un_controle",
      confiance: "moyen",
      tempsDispo: "45 minutes",
      objectifPerso:
        "Je veux vérifier si je suis prêt pour le brevet et trouver mes faiblesses.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  redaction_francais_3e: {
    label: "📚 3e – Rédaction en français",
    description: "Améliorer les rédactions et organiser les idées.",
    valeurs: {
      classe: "3e",
      matiere: "Français",
      chapitre:
        "Rédaction : structurer introduction, développement et conclusion",
      typeAide: "methode_de_travail",
      confiance: "en_difficulte",
      tempsDispo: "30 minutes",
      objectifPerso:
        "Je veux apprendre une méthode simple pour organiser une rédaction.",
      prefereQuestions: false,
      prefereExemplesConcrets: true,
    },
  },
  methodo_seconde: {
    label: "📘 Seconde – Méthode de travail",
    description: "Aider un élève entrant au lycée à s'organiser.",
    valeurs: {
      classe: "Seconde",
      matiere: "Autre",
      chapitre: "Méthode de travail : apprendre efficacement",
      typeAide: "methode_de_travail",
      confiance: "moyen",
      tempsDispo: "40 minutes",
      objectifPerso:
        "Je veux une méthode simple pour travailler plus régulièrement.",
    },
  },
  decouverte_6e_maths: {
    label: "🔢 6e – Découvrir les maths au collège",
    description:
      "Pour un élève de 6e qui a besoin de prendre confiance en maths dès le début de l’année.",
    valeurs: {
      classe: "6e",
      matiere: "Mathématiques",
      chapitre: "Nombres entiers, additions, soustractions, multiplications",
      typeAide: "manipuler_pour_comprendre",
      confiance: "en_difficulte",
      tempsDispo: "20 minutes",
      objectifPerso:
        "Je veux comprendre les bases des nombres et des calculs pour être plus à l’aise en classe.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  remise_a_niveau_4e_francais: {
    label: "✏️ 4e – Remise à niveau en français",
    description:
      "Pour retravailler l’orthographe et la grammaire sans se décourager.",
    valeurs: {
      classe: "4e",
      matiere: "Français",
      chapitre: "Orthographe, accords, conjugaison de base",
      typeAide: "faire_des_exercices",
      confiance: "en_difficulte",
      tempsDispo: "30 minutes",
      objectifPerso:
        "Je veux faire moins de fautes dans mes rédactions et mes contrôles.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  terminale_spe_maths_fonctions: {
    label: "📈 Tle spé maths – Fonctions",
    description:
      "Révisions ciblées sur les fonctions pour préparer le bac spécialité maths.",
    valeurs: {
      classe: "Terminale",
      matiere: "Mathématiques",
      chapitre:
        "Étude de fonctions, dérivation, variations, limites simples (niveau bac spé maths)",
      typeAide: "reviser_un_chapitre",
      confiance: "moyen",
      tempsDispo: "45 minutes",
      objectifPerso:
        "Je veux revoir les méthodes sur les fonctions pour réussir les exercices de bac.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
  troisieme_anglais_oral: {
    label: "🎤 3e – Anglais (oral)",
    description:
      "Pour s’entraîner à parler en anglais à l’oral, sans jugements, avant le brevet.",
    valeurs: {
      classe: "3e",
      matiere: "Langues",
      chapitre:
        "Expression orale : se présenter, parler de sa journée, de ses goûts",
      typeAide: "faire_des_exercices",
      confiance: "moyen",
      tempsDispo: "20 minutes",
      objectifPerso:
        "Je veux être plus à l’aise pour parler en anglais à l’oral en classe et pour le brevet.",
      prefereQuestions: true,
      prefereExemplesConcrets: true,
    },
  },
};

/* ----------------------------------------
   ITEMS POUR LE CARROUSEL
---------------------------------------- */

const PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PRESETS) as [PresetKey, (typeof PRESETS)[PresetKey]][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Modèle élève",
}));

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ElevePage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState<PromptEleve>({
    prenom: "",
    classe: "",
    matiere: "",
    chapitre: "",
    typeAide: "",
    confiance: "moyen",
    tempsDispo: "",
    objectifPerso: "",
    exemplesDifficiles: "",
    prefereQuestions: true,
    prefereExemplesConcrets: true,
    adaptationDYS: false,
    dysTypes: [],
    dysPrecisionAutre: "",
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function handleChange<K extends keyof PromptEleve>(
    field: K,
    value: PromptEleve[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: PresetKey) {
    const preset = PRESETS[key];
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

    if (!form.matiere) s.push("Choisis la matière pour que l’aide soit adaptée.");
    if (!form.classe) s.push("Indique ta classe : 6e, 3e, Seconde…");
    if (!form.chapitre.trim())
      s.push("Précise le chapitre (fractions, Thalès, rédaction…).");
    if (!form.typeAide)
      s.push("Choisis ce que tu veux faire : comprendre, réviser, exercices…");
    if (form.objectifPerso.trim().length < 10)
      s.push("Décris ton objectif avec tes mots.");
    if (!form.exemplesDifficiles.trim())
      s.push("Ajoute un exemple de question qui te pose problème.");

    if (s.length === 0)
      s.push("Ton formulaire est parfait ! Tu peux générer le prompt.");

    return s;
  }, [form]);

  /* ----------------------------------------
     DESCRIPTION DU NIVEAU
  ---------------------------------------- */

  function descriptionConfiance() {
    switch (form.confiance) {
      case "en_difficulte":
        return "Je me sens en difficulté et j’ai besoin d’explications simples.";
      case "moyen":
        return "Je comprends certaines choses mais je fais encore des erreurs.";
      case "a_l_aise":
        return "Je suis plutôt à l’aise et je veux vérifier ou aller plus loin.";
    }
  }

  /* ----------------------------------------
     MOULINETTE : GENERER LE PROMPT
  ---------------------------------------- */

  function genererPromptFinal() {
    if (!form.classe || !form.matiere) {
      alert("Indique au minimum ta classe et ta matière.");
      return;
    }

    const prenom = form.prenom.trim() || "un élève";
    const chapitre = form.chapitre.trim() || "un chapitre du programme";
    const objectif =
      form.objectifPerso.trim() ||
      "mieux comprendre ce chapitre et réussir les exercices importants.";

    const blocDYS = form.adaptationDYS
      ? (() => {
          const lignes: string[] = [];

          lignes.push("Je peux avoir des difficultés de type DYS. Merci d’adapter :");
          lignes.push("- phrases courtes et claires,");
          lignes.push("- explications pas à pas,");
          lignes.push("- vocabulaire expliqué,");
          lignes.push("- exemples simples avant la théorie.");

          if (form.dysTypes.includes("dyslexie"))
            lignes.push(
              "- Pour la dyslexie : éviter les blocs longs, mettre en évidence les mots importants.",
            );
          if (form.dysTypes.includes("dyspraxie"))
            lignes.push(
              "- Pour la dyspraxie : limiter les manipulations spatiales complexes, donner des étapes numérotées.",
            );
          if (form.dysTypes.includes("dyscalculie"))
            lignes.push(
              "- Pour la dyscalculie : détailler les calculs étape par étape et privilégier les explications verbales.",
            );
          if (form.dysTypes.includes("dysorthographie"))
            lignes.push(
              "- Pour la dysorthographie : aider à structurer les phrases, ne pas se focaliser sur les fautes.",
            );
          if (
            form.dysTypes.includes("autre") &&
            form.dysPrecisionAutre?.trim()
          )
            lignes.push(
              `- Autre difficulté indiquée : ${form.dysPrecisionAutre.trim()}.`,
            );

          return "\n" + lignes.join("\n") + "\n";
        })()
      : "";

    const prompt =
      `Tu es un professeur bienveillant de ${form.matiere}.\n` +
      `Tu t’adresses à un élève de ${form.classe}.\n\n` +
      `Je suis ${prenom} et je veux travailler : ${chapitre}.\n` +
      `Mon objectif : ${objectif}\n` +
      `Mon niveau actuel : ${descriptionConfiance()}\n` +
      `Temps disponible : ${form.tempsDispo || "non précisé"}\n\n` +
      `Ce que je veux faire : ${form.typeAide || "Aide libre"}\n\n` +
      `Mes préférences :\n` +
      (form.prefereQuestions
        ? "- Pose-moi d’abord des questions.\n"
        : "- Tu peux expliquer directement.\n") +
      (form.prefereExemplesConcrets
        ? "- Utilise des exemples concrets.\n"
        : "- Pas besoin d’exemples concrets.\n") +
      blocDYS +
      (form.exemplesDifficiles.trim()
        ? `\nExemples qui me posent problème :\n${form.exemplesDifficiles.trim()}\n`
        : "");

    setPromptFinal(prompt);
    setCopied(false);
    setSaveMessage(null);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    await navigator.clipboard.writeText(promptFinal);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  /* ----------------------------------------
     ENREGISTRER LE PRESET DANS SUPABASE
  ---------------------------------------- */

  async function enregistrerPreset() {
    if (!promptFinal) {
      alert(
        "Génère d’abord ton prompt, puis tu pourras l’enregistrer comme preset.",
      );
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    let user = null;

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Erreur getUser Supabase :", userError);
      }

      user = data?.user ?? null;
    } catch (err: any) {
      // Cas où Supabase lève AuthSessionMissingError : on considère juste qu'il n'y a pas d'utilisateur connecté
      if (
        err?.name === "AuthSessionMissingError" ||
        err?.message?.includes("Auth session missing")
      ) {
        console.warn("Aucune session Supabase : utilisateur non connecté.");
        user = null;
      } else {
        console.error("Erreur inattendue Supabase :", err);
      }
    }

    if (!user) {
      setSaving(false);
      // Redirection vers la page de connexion, avec retour vers l’espace élèves
      router.push("/auth/signin?redirect=/espace-eleves");
      return;
    }

    // 2. Demander un titre à l'élève
    const titreParDefaut =
      form.chapitre.trim() ||
      `${form.matiere || "Matière"} – ${form.typeAide || "Aide"}`;

    const titre = window.prompt(
      "Titre de ton preset (pour le retrouver facilement) :",
      titreParDefaut,
    );

    if (!titre) {
      setSaving(false);
      return;
    }

    // 3. Enregistrer dans la table "presets_eleves"
    const { error } = await supabase.from("presets_eleves").insert({
      user_id: user.id,
      titre: titre.trim(),
      contexte: "espace-eleves",
      contenu: promptFinal,
      form_data: form,
    });

    if (error) {
      console.error(error);
      setSaveMessage("Erreur pendant l’enregistrement du preset.");
    } else {
      setSaveMessage("✅ Preset enregistré dans ton espace !");
    }

    setSaving(false);
    setTimeout(() => setSaveMessage(null), 4000);
  }


  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
            🎒 Espace élève – Crée ton prompt d’aide
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Crée ton propre prompt pour t’aider à apprendre
          </h1>

          <p className="text-sm text-gray-700 max-w-2xl">
            Remplis ce formulaire ou choisis un modèle : EleveAI créera pour toi
            un prompt clair pour réviser, comprendre un chapitre ou préparer un
            contrôle sans tricher.
          </p>
        </header>

        {/* 1️⃣ PRESETS – CARROUSEL */}
        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Tu peux gagner du temps en partant d’un exemple proche de ta situation. Tu pourras ensuite adapter tous les champs dans le formulaire."
          items={PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as PresetKey)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* COLONNE GAUCHE : FORMULAIRE */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-md font-bold text-[#0047B6]">
              2️⃣ Ta situation
            </h2>

            {/* Prénom / classe / matière */}
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
                <label className="text-xs font-semibold">Classe</label>
                <select
                  value={form.classe}
                  onChange={(e) =>
                    handleChange("classe", e.target.value as Classe)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Choisir…</option>
                  {CLASSES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Matière</label>
                <select
                  value={form.matiere}
                  onChange={(e) => handleChange("matiere", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chapitre */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Chapitre / thème à travailler
              </label>
              <input
                type="text"
                value={form.chapitre}
                onChange={(e) => handleChange("chapitre", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Ex : fractions, Thalès, rédaction…"
              />
            </div>

            {/* Type d'aide */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Ce que tu veux faire
              </label>
              <select
                value={form.typeAide}
                onChange={(e) =>
                  handleChange("typeAide", e.target.value as TypeAide)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Choisir…</option>
                {TYPES_AIDE.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Niveau et temps */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Comment tu te sens ?
                </label>
                <select
                  value={form.confiance}
                  onChange={(e) =>
                    handleChange("confiance", e.target.value as Confiance)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="en_difficulte">En difficulté</option>
                  <option value="moyen">Ça va mais je me trompe</option>
                  <option value="a_l_aise">À l’aise</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Temps disponible (facultatif)
                </label>
                <input
                  type="text"
                  value={form.tempsDispo}
                  onChange={(e) => handleChange("tempsDispo", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : 20 min"
                />
              </div>
            </div>

            {/* Objectif */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Ton objectif (avec tes mots)
              </label>
              <textarea
                value={form.objectifPerso}
                onChange={(e) => handleChange("objectifPerso", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px]"
                placeholder="Ex : Je veux comprendre comment poser une équation."
              />
            </div>

            {/* Exemples difficiles */}
            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Exemples qui te posent problème
              </label>
              <textarea
                value={form.exemplesDifficiles}
                onChange={(e) =>
                  handleChange("exemplesDifficiles", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px]"
                placeholder="Ex : J’ai raté un exercice sur les fractions."
              />
            </div>

            {/* DYS */}
            <div className="space-y-2 pt-2">
              <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={form.adaptationDYS}
                  onChange={(e) =>
                    handleChange("adaptationDYS", e.target.checked)
                  }
                  className="rounded border-gray-400"
                />
                <span>Aide adaptée (DYS)</span>
              </label>

              {form.adaptationDYS && (
                <div className="ml-3 space-y-2 border-l pl-3 border-emerald-100">
                  <p className="text-[11px] text-gray-600">
                    Tu peux préciser (facultatif) :
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {[
                      { value: "dyslexie", label: "Dyslexie" },
                      { value: "dyspraxie", label: "Dyspraxie" },
                      { value: "dyscalculie", label: "Dyscalculie" },
                      { value: "dysorthographie", label: "Dysorthographie" },
                      { value: "autre", label: "Autre" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-emerald-200 bg-emerald-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.dysTypes.includes(
                            opt.value as DysType,
                          )}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            handleChange(
                              "dysTypes",
                              checked
                                ? [...form.dysTypes, opt.value as DysType]
                                : form.dysTypes.filter(
                                    (t) => t !== opt.value,
                                  ),
                            );
                          }}
                          className="h-3 w-3"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>

                  {form.dysTypes.includes("autre") && (
                    <input
                      type="text"
                      value={form.dysPrecisionAutre}
                      onChange={(e) =>
                        handleChange("dysPrecisionAutre", e.target.value)
                      }
                      className="w-full border rounded-lg px-2 py-1 text-[11px]"
                      placeholder="Précision facultative..."
                    />
                  )}
                </div>
              )}
            </div>

            {/* Bouton générer */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={genererPromptFinal}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
              >
                ⚙️ Générer mon prompt
              </button>
            </div>
          </section>

          {/* COLONNE DROITE */}
          <section className="space-y-4">
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

            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  4️⃣ Ton prompt final
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copierPrompt}
                    disabled={!promptFinal}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      promptFinal
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {copied ? "✅ Copié" : "📋 Copier"}
                  </button>
                  <button
                    onClick={enregistrerPreset}
                    disabled={!promptFinal || saving}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      promptFinal
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-emerald-200 text-emerald-700"
                    }`}
                  >
                    {saving ? "💾 Enregistrement..." : "⭐ Enregistrer ce preset"}
                  </button>
                </div>
              </div>

              {saveMessage && (
                <p className="text-xs text-emerald-700">{saveMessage}</p>
              )}

              <textarea
                readOnly
                value={promptFinal}
                className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-slate-50 min-h-[200px]"
                placeholder="Ton prompt apparaîtra ici."
              />

              <p className="text-xs text-gray-700">
                Tu peux maintenant coller ce prompt dans l’IA de ton choix :
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  href={
                    promptFinal
                      ? `/tchat?prompt=${encodeURIComponent(promptFinal)}`
                      : "/tchat"
                  }
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
          </section>
        </div>
      </div>
    </main>
  );
}
