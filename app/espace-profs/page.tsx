// app/espace-profs/page.tsx
// app/espace-profs/page.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MarkdownMath } from "@/components/MarkdownMath";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";
import {
  PROFS_PRESETS,
  ProfsPresetKey,
} from "@/data/profsPresets";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type Niveau = "basique" | "standard" | "expert";

type MethodePedagogique =
  | ""
  | "methode_active"
  | "enseignement_explicite"
  | "inductive"
  | "deductive"
  | "par_projet"
  | "par_problemes"
  | "cooperative"
  | "ludique"
  | "magistrale";

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
  methode?: MethodePedagogique;
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
  "Philosophie",
  "Autre",
];

// 🔹 Types communs à toutes les matières
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

// 🔹 Types spécifiques par matière (en plus des communs)
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
  "Physique-Chimie": [
    "Conception d’activité expérimentale",
    "Préparation d’exercices type bac",
  ],
  SVT: [
    "Analyse de documents scientifiques",
    "Construction de schémas-bilans à compléter",
  ],
  "Histoire-Géographie": [
    "Étude de documents historiques",
    "Analyse de carte ou croquis",
  ],
  SES: [
    "Analyse de graphiques économiques",
    "Préparation d’exemples chiffrés",
  ],
  Langues: [
    "Création d’activité de compréhension orale",
    "Génération de dialogues pour jeu de rôle",
  ],
  "Numérique/NSI": [
    "Génération d’exercices de programmation",
    "Création de défis algorithmiques",
  ],
  Philosophie: [
    "Préparation d’un sujet de dissertation",
    "Préparation d’une explication de texte philosophique",
    "Construction d’une fiche notionnelle (auteur, concept, problème)",
    "Génération de sujets de réflexion pour l’oral",
  ],
  Autre: ["Création d’activité interdisciplinaire"],
};

// 🔹 Types spéciaux examens
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

/* ----------------------------------------
   MÉTHODES PÉDAGOGIQUES – OPTIONS UI
---------------------------------------- */

const METHODE_OPTIONS: {
  id: MethodePedagogique;
  label: string;
  description: string;
}[] = [
  {
    id: "methode_active",
    label: "Méthode active",
    description:
      "L’élève manipule, cherche, répond à des questions et construit la notion par étapes.",
  },
  {
    id: "enseignement_explicite",
    label: "Enseignement explicite (I do / We do / You do)",
    description:
      "Tu montres un exemple, vous faites ensemble, puis l’élève s’entraîne seul.",
  },
  {
    id: "inductive",
    label: "Méthode inductive",
    description:
      "On part d’exemples concrets pour faire émerger la règle ou la notion.",
  },
  {
    id: "deductive",
    label: "Méthode déductive",
    description:
      "On part de la règle, puis on propose des exercices d’application gradués.",
  },
  {
    id: "par_projet",
    label: "Pédagogie par projet",
    description:
      "Les élèves réalisent une production finale (exposé, vidéo, étude, etc.).",
  },
  {
    id: "par_problemes",
    label: "Apprentissage par problèmes",
    description:
      "On pose un problème authentique que les élèves doivent résoudre.",
  },
  {
    id: "cooperative",
    label: "Pédagogie coopérative",
    description:
      "Les élèves travaillent en groupes avec des rôles définis et une production commune.",
  },
  {
    id: "ludique",
    label: "Approche ludique / gamification",
    description:
      "Utilisation de jeux, défis, badges, escape games pour soutenir les apprentissages.",
  },
  {
    id: "magistrale",
    label: "Cours magistral guidé",
    description:
      "Cours structuré principalement par l’enseignant, avec quelques questions intermédiaires.",
  },
];

/* ----------------------------------------
   CARROUSEL – ITEMS À PARTIR DES PRESETS
---------------------------------------- */

const PROFS_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PROFS_PRESETS) as [
    ProfsPresetKey,
    (typeof PROFS_PRESETS)[ProfsPresetKey],
  ][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Modèle prof",
}));

/* ----------------------------------------
   FONCTION MOULINETTE
---------------------------------------- */

function construirePrompt(form: PromptProf): string {
  const blocTags =
    form.tags.length > 0
      ? `Mots-clés pédagogiques fournis par le professeur : ${form.tags.join(", ")}.\n`
      : "";

  const blocMethode = (() => {
    switch (form.methode) {
      case "enseignement_explicite":
        return (
          "Méthode pédagogique souhaitée : enseignement explicite (I do / We do / You do).\n" +
          "- Commencer par un exemple entièrement modélisé par l’enseignant (I do),\n" +
          "- proposer ensuite une ou deux questions faites avec l’élève (We do),\n" +
          "- terminer par des exercices où l’élève agit seul avec correction commentée (You do).\n\n"
        );
      case "inductive":
        return (
          "Méthode pédagogique souhaitée : méthode inductive.\n" +
          "- Partir d’exemples concrets ou de documents,\n" +
          "- faire formuler par l’élève des observations,\n" +
          "- faire émerger la règle ou la notion à partir de ces observations,\n" +
          "- terminer par une formulation claire de la règle et quelques applications.\n\n"
        );
      case "deductive":
        return (
          "Méthode pédagogique souhaitée : méthode déductive.\n" +
          "- Donner d’abord la définition ou la règle générale,\n" +
          "- illustrer par un ou deux exemples simples,\n" +
          "- proposer une série d’exercices gradués d’application.\n\n"
        );
      case "par_projet":
        return (
          "Méthode pédagogique souhaitée : pédagogie par projet.\n" +
          "- Proposer une production finale claire (exposé, affiche, vidéo, étude, etc.),\n" +
          "- découper le projet en étapes avec délais,\n" +
          "- préciser les critères de réussite,\n" +
          "- prévoir des moments de régulation et de bilan.\n\n"
        );
      case "par_problemes":
        return (
          "Méthode pédagogique souhaitée : apprentissage par problèmes.\n" +
          "- Partir d’un problème authentique ou d’une situation complexe,\n" +
          "- laisser l’élève formuler des hypothèses et des stratégies,\n" +
          "- apporter les outils au moment où le besoin apparaît,\n" +
          "- conclure par une mise en forme claire de la solution et de la méthode.\n\n"
        );
      case "cooperative":
        return (
          "Méthode pédagogique souhaitée : pédagogie coopérative.\n" +
          "- Organiser la classe en groupes avec des rôles (lecteur, rapporteur, gestionnaire du temps, etc.),\n" +
          "- prévoir une production commune par groupe,\n          " +
          "- intégrer des moments d’explication entre pairs.\n\n"
        );
      case "ludique":
        return (
          "Méthode pédagogique souhaitée : approche ludique / gamification.\n" +
          "- Transformer la tâche en défi ou en jeu (points, badges, niveaux),\n" +
          "- proposer des missions courtes,\n" +
          "- garder une trace des réussites et des progrès.\n\n"
        );
      case "magistrale":
        return (
          "Méthode pédagogique souhaitée : cours magistral guidé.\n" +
          "- Structurer la séance en grandes parties numérotées,\n" +
          "- insérer régulièrement de courtes questions de vérification,\n" +
          "- prévoir un court temps d’entraînement en fin de séance.\n\n"
        );
      case "methode_active":
      default:
        return (
          "Méthode pédagogique souhaitée : méthode active.\n" +
          "- Faire agir l’élève à chaque étape (questions, manipulations, mini-tâches),\n" +
          "- alterner explications très courtes et questions de vérification,\n" +
          "- terminer par un récapitulatif et une question métacognitive.\n\n"
        );
    }
  })();

  const blocDYS = form.adaptationDYS
    ? `Adapte ta réponse pour un élève présentant des troubles DYS :\n` +
      `- phrases courtes et simples,\n` +
      `- mise en page aérée avec listes,\n` +
      `- éviter les doubles négations,\n` +
      `- expliquer le vocabulaire difficile,\n` +
      `- rappeler le sens des symboles mathématiques si nécessaire.\n\n`
    : "";

  const blocAuteur = form.auteur
    ? `Ce prompt est préparé par le professeur : ${form.auteur}.\n`
    : "";

  const blocEduscol =
    `Ta réponse doit respecter les programmes officiels du système scolaire français :\n` +
    `- conformité à l’esprit des programmes publiés sur Eduscol,\n` +
    `- cohérence avec le Bulletin Officiel (BO),\n` +
    `- vocabulaire disciplinaire attendu en classe.\n\n`;

  const blocNeuro = form.neuro
    ? `Tu t’appuies sur des principes issus des neurosciences de l’apprentissage :\n` +
      `- activer les connaissances préalables de l’élève,\n` +
      `- introduire une seule difficulté nouvelle à la fois,\n` +
      `- découper la notion en petites étapes claires,\n` +
      `- alterner explications et petites questions de vérification,\n` +
      `- utiliser des exemples concrets avant la formalisation,\n` +
      `- terminer par un court récapitulatif des idées clés,\n` +
      `- inviter l’élève à reformuler avec ses propres mots.\n\n`
    : "";

  // 🔹 Adapter le langage au niveau + au cycle
  const blocNiveauLangage = (() => {
    const niveau = form.niveau || "standard";
    const classe = form.classe;
    const isCollege =
      classe === "6e" || classe === "5e" || classe === "4e" || classe === "3e";

    if (isCollege) {
      if (niveau === "basique") {
        return (
          "Adapte ton langage pour un élève de collège en difficulté :\n" +
          "- phrases très courtes (une idée par phrase),\n" +
          "- vocabulaire simple et du quotidien,\n" +
          "- beaucoup d’exemples concrets proches de la vie des élèves,\n" +
          "- reformule les idées importantes au moins deux fois.\n\n"
        );
      }
      if (niveau === "expert") {
        return (
          "Adapte ton langage pour un élève de collège à l’aise :\n" +
          "- vocabulaire simple mais précis,\n" +
          "- propose quelques défis ou questions bonus,\n" +
          "- valorise la prise d’initiative et la recherche autonome.\n\n"
        );
      }
      return (
        "Adapte ton langage à un élève de collège :\n" +
        "- phrases courtes et claires,\n" +
        "- explique les mots difficiles lorsqu’ils apparaissent,\n" +
        "- alterne explications et petites questions de vérification.\n\n"
      );
    }

    // Lycée
    if (niveau === "basique") {
      return (
        "Adapte ton langage pour un élève de lycée en difficulté :\n" +
        "- phrases courtes avec peu de subordonnées,\n" +
        "- explicite les étapes de raisonnement,\n" +
        "- fais ressortir les mots du vocabulaire disciplinaire à retenir.\n\n"
      );
    }
    if (niveau === "expert") {
      return (
        "Adapte ton langage pour un élève de lycée à l’aise :\n" +
        "- tu peux utiliser un vocabulaire disciplinaire précis,\n" +
        "- propose des prolongements ou questions d’approfondissement,\n" +
        "- souligne les exigences de méthode attendues au bac.\n\n"
      );
    }
    return (
      "Adapte ton langage à un élève de lycée :\n" +
      "- équilibre entre rigueur disciplinaire et clarté,\n" +
      "- explique les notions clés sans surcharger en détails techniques,\n" +
      "- garde une progression logique et explicite.\n\n"
    );
  })();

  // 🔹 LaTeX seulement si matière scientifique
  const matiereScientifique = [
    "Mathématiques",
    "Physique-Chimie",
    "SVT",
    "Numérique/NSI",
  ].includes(form.matiere);

  const blocSansLatex = matiereScientifique
    ? `Pour les écritures mathématiques, n'utilise pas de LaTeX (pas de \\frac, \\sqrt, etc.). ` +
      `Écris les fractions sous la forme a/b et les puissances sous la forme x^2 ou "x au carré".\n\n`
    : "";

  // 🔹 Structure précise de séance (utile pour ton cas « préparation de séance »)
  const blocStructureSeance =
    form.type === "Préparation d’une séance" ||
    form.type === "Préparation de séquence"
      ? `Lorsque tu construis une séance, présente-la avec une structure claire et chronométrée :\n` +
        `- durée totale approximative (par exemple : 55 minutes),\n` +
        `- phase 1 : accroche / mise en situation (5–10 min),\n` +
        `- phase 2 : manipulation ou recherche guidée (15–20 min),\n` +
        `- phase 3 : mise en commun / institutionnalisation (10–15 min),\n` +
        `- phase 4 : entraînement ou jeu de consolidation (10–15 min),\n` +
        `- phase 5 : bilan / trace écrite / retour métacognitif (5 min).\n` +
        `Pour chaque phase, indique :\n` +
        `- ce que fait l’enseignant,\n` +
        `- ce que font les élèves,\n` +
        `- le matériel nécessaire (manipulables, fiches, vidéoprojecteur, etc.).\n\n`
      : "";

  // 🔹 Différenciation pédagogique (base / soutien / défi)
  const blocDifferenciation =
    `Prévois systématiquement une différenciation pédagogique quand c’est pertinent :\n` +
    `- un niveau « base » pour les élèves en difficulté,\n` +
    `- un niveau « standard » pour le groupe classe,\n` +
    `- un niveau « défi » pour les élèves à l’aise.\n` +
    `Indique clairement quels exercices ou activités correspondent à chaque niveau.\n\n`;

  const blocRappelsEtMeta =
    `Ta réponse devra :\n` +
    `- commencer par un rappel très court des prérequis ou de la notion déjà vue en classe,\n` +
    `- présenter la nouvelle notion ou la tâche en plusieurs étapes numérotées,\n` +
    `- insérer régulièrement de petites questions de vérification du type « Et toi, saurais-tu… ? » ou « Quel est le point important à retenir ici ? »,\n` +
    `- se terminer par un court récapitulatif sous forme de liste à puces,\n` +
    `- proposer une question métacognitive finale du type « Qu’as-tu trouvé le plus facile ? Le plus difficile ? » pour inviter l’élève à réfléchir sur son apprentissage.\n\n`;

  const blocCriteres =
    `Ajoute à la fin une courte rubrique intitulée « Pour l’enseignant » qui liste 3 à 5 critères de réussite observables, par exemple :\n` +
    `- ce que l’élève sait expliquer,\n` +
    `- ce qu’il sait faire en autonomie,\n` +
    `- les erreurs typiques à surveiller.\n\n`;

  const blocMiseEnPage =
    `Si ta réponse correspond à un devoir surveillé, une fiche d’activités ou une évaluation, propose une mise en page structurée facilement transférable dans un document Word :\n` +
    `- titres clairs (contexte, questions, rappel de la méthode),\n` +
    `- exercices numérotés,\n` +
    `- indication des points éventuels ou du temps conseillé,\n` +
    `- espaces prévus pour que l’élève puisse répondre.\n\n`;

  const prompt =
    `Tu es une IA pédagogique destinée à des élèves de ${form.classe || "collège/lycée"} ` +
    `en ${form.matiere || "discipline scolaire"}, dans le système scolaire français.\n\n` +
    blocEduscol +
    blocNeuro +
    blocNiveauLangage +
    blocSansLatex +
    blocMethode +
    `Objectif pédagogique indiqué par le professeur : ` +
    `${
      form.objectifPedagogique ||
      "(non précisé : propose une version compatible avec le programme officiel)"
    }\n` +
    `Niveau de difficulté souhaité : ${form.niveau}.\n` +
    `Type de tâche : ` +
    `${
      form.type ||
      "non précisé (choisis une structure adaptée au niveau de l’élève)"
    }.\n` +
    blocTags +
    blocAuteur +
    `Consigne initiale rédigée par le professeur (à optimiser) :\n` +
    `"""${form.contenu.trim()}"""\n\n` +
    blocDYS +
    blocStructureSeance +
    blocDifferenciation +
    blocRappelsEtMeta +
    blocCriteres +
    blocMiseEnPage +
    `Structure ta réponse en DEUX GRANDES PARTIES clairement séparées :\n` +
    `1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="\n` +
    `2) "=== PARTIE 2 : RESSOURCE PRÊTE POUR L’ÉLÈVE ==="\n\n` +
    `Ta mission :\n` +
    `1. Dans la PARTIE 1, réécris le prompt du professeur de manière plus précise, structurée et complète, en gardant son intention pédagogique. Ne donne pas encore la ressource pour l’élève dans cette partie : produis uniquement le prompt optimisé (prêt à être copié-collé dans une autre IA).\n` +
    `2. Dans la PARTIE 2, produis la ressource complète pour l’élève en respectant :\n` +
    `   - le niveau indiqué,\n` +
    `   - les programmes officiels (Eduscol, BO),\n` +
    `   - la méthode pédagogique souhaitée,\n` +
    `   - les principes des neurosciences de l’apprentissage (si activés),\n` +
    `   - la clarté pédagogique (étapes, exemples, questions de vérification, récapitulatif),\n` +
    `   - la prise en compte éventuelle des besoins DYS,\n` +
    `   - la différenciation entre au moins deux niveaux d’exigence.\n` +
    `3. Ne résous pas un devoir maison spécifique à la place de l’élève, sauf si le professeur demande explicitement une correction commentée.\n`;

  return prompt;
}



/* ----------------------------------------
   PAGE PROF
---------------------------------------- */

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
    adaptationDYS: true,
    neuro: true,
    auteur: "",
    date: today,
    methode: "methode_active",
  });

  const [rawTags, setRawTags] = useState("");
  const [promptInterne, setPromptInterne] = useState("");
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");
  const [copiedRessource, setCopiedRessource] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptInterne, setShowPromptInterne] = useState(false);

  function handleChange(
    field: keyof PromptProf,
    value: string | boolean | Niveau | MethodePedagogique,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value as any,
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

  // 🔁 Appliquer un preset (carrousel)
  function appliquerPreset(key: ProfsPresetKey) {
    const preset = PROFS_PRESETS[key];
    const v = preset.valeurs;

    setForm((prev) => {
      const base: PromptProf = {
        ...prev,
        ...v,
        tags: v.tags ?? prev.tags,
      };

      // Exemple : si la classe est 3e, on ajoute un tag DNB
      if (base.classe === "3e" && !base.tags.includes("DNB")) {
        base.tags = [...base.tags, "DNB"];
      }

      return base;
    });

    if (v.tags) {
      setRawTags(v.tags.join(", "));
    }
  }

  // 🔹 Types de ressource disponibles en fonction de la matière + bac/brevet
  const typesDisponibles = useMemo(() => {
    const communs = TYPES_COMMUNS;
    const specifiquesMatiere = form.matiere
      ? TYPES_PAR_MATIERE[form.matiere] || []
      : [];

    let speciauxExamens: string[] = [];

    if (form.classe === "3e") {
      speciauxExamens = TYPES_SPECIAUX_BREVET;
    } else if (
      form.classe === "Seconde" ||
      form.classe === "Première" ||
      form.classe === "Terminale"
    ) {
      speciauxExamens = TYPES_SPECIAUX_BAC;
    }

    return Array.from(
      new Set([...specifiquesMatiere, ...speciauxExamens, ...communs]),
    );
  }, [form.matiere, form.classe]);

  // Suggestions simples pour améliorer le prompt du prof
  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.objectifPedagogique.trim()) {
      s.push(
        "Précise l’objectif pédagogique : ce que l’élève doit comprendre, savoir faire ou produire.",
      );
    }

    if (!form.classe) {
      s.push(
        "Sélectionne une classe/niveau : cela aide l’IA à ajuster le vocabulaire.",
      );
    }

    if (!form.matiere) {
      s.push(
        "Indique la matière pour que l’IA reste dans le bon champ disciplinaire.",
      );
    }

    if (!form.type) {
      s.push(
        "Choisis un type de ressource (exercices, activité, évaluation…) pour guider la structure de la réponse.",
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

    if (!form.neuro) {
      s.push(
        "Tu peux activer les principes des neurosciences pour structurer davantage la réponse (rappels, étapes, questions de vérification, récapitulatif).",
      );
    }

    if (s.length === 0) {
      s.push(
        "Ton paramétrage est déjà bien structuré. Tu peux encore l’améliorer en donnant un exemple concret ou en précisant la durée de la tâche.",
      );
    }

    return s;
  }, [form]);

  // 🔵 Bouton principal : créer la ressource pédagogique
  async function creerRessource() {
    if (!form.contenu.trim()) {
      alert("Merci de remplir le texte du prompt (version professeur).");
      return;
    }

    const prompt = construirePrompt(form);
    setPromptInterne(prompt);
    setAgentOutput("");
    setAgentError("");
    setCopiedRessource(false);
    setCopiedPrompt(false);

    setAgentLoading(true);

    try {
      const res = await fetch("/api/agent-prof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'appel à l'agent IA.");
      }

      setAgentOutput(data.output || "");
    } catch (err: any) {
      console.error(err);
      setAgentError(
        err?.message ||
          "Erreur inconnue lors de l'appel à EleveAI. Vérifie que le serveur tourne.",
      );
    } finally {
      setAgentLoading(false);
    }
  }

  async function copierRessource() {
    if (!agentOutput) return;
    try {
      await navigator.clipboard.writeText(agentOutput);
      setCopiedRessource(true);
      setTimeout(() => setCopiedRessource(false), 2000);
    } catch {
      alert(
        "Impossible de copier automatiquement. Sélectionne le texte et copie-le à la main (Ctrl+C).",
      );
    }
  }

  async function copierPromptInterne() {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      alert(
        "Impossible de copier automatiquement. Sélectionne le texte et copie-le à la main (Ctrl+C).",
      );
    }
  }

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Titre / bandeau haut */}
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs – Générer une ressource pédagogique</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Prenez votre temps pour générer votre prompt pour une meilleure efficacité
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Remplis les informations ci-dessous : EleveAI générera pour toi une
            ressource pédagogique prête à être copiée dans Word, Pronote ou ton ENT.
          </p>
          <p className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
            <span>🧠</span>
            <span>Cette page applique Eduscol + neurosciences de l’apprentissage</span>
            <input
              type="checkbox"
              checked={form.neuro}
              onChange={(e) => handleChange("neuro", e.target.checked)}
              className="rounded border-gray-400"
            />
            <span>Activer les principes des neurosciences</span>
          </p>
        </header>

        {/* Carrousel Netflix de presets */}
        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Clique sur un modèle proche de ta séance : le formulaire sera pré-rempli, tu pourras ensuite tout adapter."
          items={PROFS_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as ProfsPresetKey)}
        />

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
                  onChange={(e) =>
                    handleChange("niveau", e.target.value as Niveau)
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="basique">Basique (remédiation)</option>
                  <option value="standard">Standard</option>
                  <option value="expert">Expert / approfondissement</option>
                </select>
              </div>
            </div>

            {/* Type de ressource */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Type de ressource à générer
              </label>
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
              <p className="text-[11px] text-gray-500 mt-1">
                Les propositions s’adaptent à la matière choisie et, en 3e, à la
                préparation du brevet ; en Seconde, Première et Terminale, à la
                préparation du bac.
              </p>
            </div>

            {/* Méthode pédagogique */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600">
                  Méthode pédagogique souhaitée
                </label>
                <Link
                  href="/blog"
                  className="text-[11px] text-[#0047B6] underline underline-offset-2 hover:text-[#003894]"
                >
                  En savoir plus sur les différentes méthodes (article de blog)
                </Link>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {METHODE_OPTIONS.map((m) => (
                  <button
                    key={m.id || "default"}
                    type="button"
                    onClick={() => handleChange("methode", m.id)}
                    className={`text-left border rounded-xl px-3 py-2 text-xs sm:text-[13px] transition ${
                      form.methode === m.id
                        ? "border-[#0047B6] bg-sky-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          form.methode === m.id ? "bg-[#0047B6]" : "bg-slate-300"
                        }`}
                      />
                      <span className="font-semibold text-slate-800">
                        {m.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {m.description}
                    </p>
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-gray-500">
                Choisis la méthode correspondant le mieux à ta séance : EleveAI
                adaptera la structure de la ressource (étapes, questions, exercices…).
              </p>
            </div>

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">
                  Titre de la ressource (pour toi)
                </label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Séance sur la notion de justice en philosophie"
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
                onChange={(e) =>
                  handleChange("objectifPedagogique", e.target.value)
                }
                placeholder="Ex : amener l’élève à problématiser un sujet philosophique simple."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[70px]"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={rawTags}
                onChange={(e) => updateTags(e.target.value)}
                placeholder="Ex : justice, liberté, dissertation"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Mots-clés pris en compte :{" "}
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
                  onChange={(e) =>
                    handleChange("adaptationDYS", e.target.checked)
                  }
                  className="rounded border-gray-400"
                />
                <span>Adapter la ressource pour des élèves DYS</span>
              </label>
              <div className="text-[11px] text-gray-500">
                Date : <span className="font-mono">{form.date}</span>
              </div>
            </div>

            {/* Contenu du prompt */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">
                Texte de ta demande (version professeur)
              </label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder="Ex : Génère une fiche d’exercices guidés sur « Faut-il toujours dire la vérité ? » avec corrigé, pour une classe de Première."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

            {/* Bouton principal */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={creerRessource}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow ${
                  agentLoading
                    ? "bg-sky-100 text-sky-500 cursor-not-allowed"
                    : "bg-[#0047B6] text-white hover:bg-[#003894]"
                }`}
              >
                {agentLoading
                  ? "⏳ EleveAI prépare ta ressource..."
                  : "✨ Créer la ressource pédagogique avec EleveAI"}
              </button>
            </div>
          </section>

          {/* Colonne droite : suggestions + résultat */}
          <section className="space-y-4">
            {/* Suggestions */}
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
              <p className="text-[11px] text-gray-500">
                Plus ta demande est précise (niveau, type de tâche, méthode pédagogique, exemples…),
                plus la ressource générée sera directement exploitable en classe.
              </p>
            </div>

            {/* Ressource générée */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  3️⃣ Ressource générée par EleveAI
                </h2>
                <button
                  type="button"
                  onClick={copierRessource}
                  disabled={!agentOutput}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold ${
                    agentOutput
                      ? "bg-slate-800 text-white hover:bg-slate-900"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {copiedRessource ? "✅ Texte copié" : "📋 Copier pour Word / ENT"}
                </button>
              </div>

              {agentError && (
                <p className="text-xs text-red-600">⚠️ {agentError}</p>
              )}

              <p className="text-[11px] text-gray-500">
                Tu peux copier cette ressource et la coller telle quelle dans Word,
                Pronote, ton ENT ou une autre IA (EleveAI tchat, etc.).
              </p>

              <div className="eleveai-math border rounded p-3 min-h-[180px] bg-slate-50 text-sm whitespace-pre-wrap">
                {agentLoading ? (
                  "Réflexion en cours..."
                ) : agentOutput ? (
                  <MarkdownMath>{agentOutput}</MarkdownMath>
                ) : (
                  "La ressource générée par EleveAI apparaîtra ici après avoir cliqué sur « Créer la ressource pédagogique »."
                )}
              </div>

              {/* Boutons IA externes */}
              <div className="space-y-2 pt-3">
                <p className="text-[11px] text-gray-600">
                  Tu peux aussi réutiliser le prompt interne dans l’IA de ton choix :
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                  <Link
                    href={
                      promptInterne
                        ? `/tchat?prompt=${encodeURIComponent(promptInterne)}`
                        : "/tchat"
                    }
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Utiliser avec le tchat EleveAI
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

            {/* Prompt interne (optionnel) */}
            <div className="bg-white/80 border border-dashed border-slate-300 rounded-2xl shadow-sm p-4 space-y-3 text-xs">
              <button
                type="button"
                onClick={() => setShowPromptInterne((v) => !v)}
                className="text-[11px] font-semibold text-slate-600 underline underline-offset-2"
              >
                {showPromptInterne
                  ? "Masquer le prompt interne (pour usage avancé / autres IA)"
                  : "Afficher le prompt interne utilisé par EleveAI (optionnel, pour les curieux)"}
              </button>

              {showPromptInterne && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-700">
                      Prompt interne actuellement utilisé
                    </span>
                    <button
                      type="button"
                      onClick={copierPromptInterne}
                      disabled={!promptInterne}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold ${
                        promptInterne
                          ? "bg-slate-800 text-white hover:bg-slate-900"
                          : "bg-slate-200 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {copiedPrompt ? "✅ Copié" : "📋 Copier ce prompt"}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={promptInterne}
                    className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[140px]"
                    placeholder="Le prompt interne apparaîtra ici après la première création de ressource."
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
