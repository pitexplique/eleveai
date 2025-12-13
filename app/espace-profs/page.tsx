// app/espace-profs/page.tsx
"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { MarkdownMath } from "@/components/MarkdownMath";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";
import { PROFS_PRESETS, ProfsPresetKey } from "@/data/profsPresets";

import SignupNudge from "@/components/SignupNudge";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
} from "lucide-react";

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

type OutputStyle = "simple" | "word" | "word_expert";

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
  outputStyle: OutputStyle;
};

/* ----------------------------------------
   OPTIONS
---------------------------------------- */

const CLASSES = ["6e", "5e", "4e", "3e", "Seconde", "Première", "Terminale"];

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
  SES: ["Analyse de graphiques économiques", "Préparation d’exemples chiffrés"],
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
    description: "On part d’exemples concrets pour faire émerger la règle ou la notion.",
  },
  {
    id: "deductive",
    label: "Méthode déductive",
    description: "On part de la règle, puis on propose des exercices d’application gradués.",
  },
  {
    id: "par_projet",
    label: "Pédagogie par projet",
    description: "Production finale (exposé, affiche, vidéo, étude, etc.).",
  },
  {
    id: "par_problemes",
    label: "Apprentissage par problèmes",
    description: "On pose un problème authentique que les élèves doivent résoudre.",
  },
  {
    id: "cooperative",
    label: "Pédagogie coopérative",
    description: "Groupes + rôles + production commune + explication entre pairs.",
  },
  {
    id: "ludique",
    label: "Approche ludique / gamification",
    description: "Défis, points, badges, missions courtes, progression visible.",
  },
  {
    id: "magistrale",
    label: "Cours magistral guidé",
    description: "Cours structuré par l’enseignant avec questions de vérification.",
  },
];

/* ----------------------------------------
   CARROUSEL PRESETS
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
   HELPERS
---------------------------------------- */

function uniqueKeepOrder(items: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    if (!seen.has(it)) {
      seen.add(it);
      out.push(it);
    }
  }
  return out;
}

/* ----------------------------------------
   BLOCS WORD / DESIGN EXPERT
---------------------------------------- */

function blocWordDesign(style: OutputStyle) {
  if (style === "simple") return "";

  if (style === "word") {
    return (
      "Format de sortie obligatoire : document Word (copier-coller sans perte).\n" +
      "- Utilise des titres hiérarchisés clairs (Titre 1 / Titre 2 / Titre 3) sous forme de lignes distinctes.\n" +
      "- Mise en page aérée : listes, lignes courtes, espaces de réponse.\n" +
      "- Utilise des icônes emoji simples au début des sections (compatibles Word).\n" +
      "- Termine par la ligne : « ✅ Prêt à coller dans Word ». \n\n"
    );
  }

  return (
    "Format de sortie obligatoire : document Word EXPERT, visuellement très lisible.\n" +
    "Contraintes de mise en page (Word-ready) :\n" +
    "- Réponse entièrement copiable-collable dans Word en conservant la structure.\n" +
    "- Utilise des icônes emoji au début des titres et sous-parties.\n" +
    "- Ajoute des bannières visuelles pour les grandes parties :\n" +
    "==================================================\n" +
    "🧠 TITRE DE LA PARTIE\n" +
    "==================================================\n" +
    "- Ajoute des encadrés (simulés en texte) avec ces formats :\n" +
    "[🟦 ENCART – À RETENIR]\n" +
    "Texte court…\n\n" +
    "[🟨 ENCART – MÉTHODE]\n" +
    "Étapes numérotées…\n\n" +
    "[🟥 ENCART – ERREUR FRÉQUENTE]\n" +
    "Erreur + correction…\n\n" +
    "[🟩 ENCART – DÉFI / BONUS]\n" +
    "Question défi…\n\n" +
    "- Encarts minimum : 1 À RETENIR + 1 MÉTHODE + 1 ERREUR FRÉQUENTE + 1 DÉFI.\n" +
    "- Ajoute des zones de réponse : « Réponse : ______________________ ».\n" +
    "- Interdits : gros paragraphes, blocs compacts.\n" +
    "- Termine par : « ✅ Prêt à coller dans Word ». \n\n"
  );
}

/* ----------------------------------------
   MOULINETTE PROMPT
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
          "- terminer par des exercices où l’élève agit seul (You do).\n\n"
        );
      case "inductive":
        return (
          "Méthode pédagogique souhaitée : méthode inductive.\n" +
          "- Partir d’exemples concrets,\n" +
          "- faire formuler des observations,\n" +
          "- faire émerger la règle,\n" +
          "- terminer par une formulation claire + applications.\n\n"
        );
      case "deductive":
        return (
          "Méthode pédagogique souhaitée : méthode déductive.\n" +
          "- Donner d’abord la règle,\n" +
          "- illustrer par des exemples,\n" +
          "- proposer des exercices gradués.\n\n"
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
          "- Partir d’un problème authentique,\n" +
          "- laisser l’élève proposer des stratégies,\n" +
          "- apporter les outils au moment où le besoin apparaît,\n" +
          "- conclure par méthode + solution structurée.\n\n"
        );
      case "cooperative":
        return (
          "Méthode pédagogique souhaitée : pédagogie coopérative.\n" +
          "- Organiser des groupes avec des rôles (lecteur, rapporteur, gestionnaire du temps, etc.),\n" +
          "- prévoir une production commune,\n" +
          "- intégrer des moments d’explication entre pairs.\n\n"
        );
      case "ludique":
        return (
          "Méthode pédagogique souhaitée : approche ludique / gamification.\n" +
          "- Transformer la tâche en défi/jeu,\n" +
          "- proposer des missions courtes,\n" +
          "- garder une trace des progrès.\n\n"
        );
      case "magistrale":
        return (
          "Méthode pédagogique souhaitée : cours magistral guidé.\n" +
          "- Structurer en parties numérotées,\n" +
          "- insérer des questions de vérification,\n" +
          "- prévoir un entraînement final.\n\n"
        );
      case "methode_active":
      default:
        return (
          "Méthode pédagogique souhaitée : méthode active.\n" +
          "- Faire agir l’élève à chaque étape,\n" +
          "- alterner explications courtes et questions,\n" +
          "- conclure par un récapitulatif + question métacognitive.\n\n"
        );
    }
  })();

  const blocDYS = form.adaptationDYS
    ? "Adapte ta réponse pour un élève présentant des troubles DYS :\n" +
      "- phrases courtes et simples,\n" +
      "- mise en page aérée,\n" +
      "- éviter les doubles négations,\n" +
      "- expliquer le vocabulaire difficile,\n" +
      "- rappeler le sens des symboles si nécessaire.\n\n"
    : "";

  const blocAuteur = form.auteur
    ? `Ce prompt est préparé par le professeur : ${form.auteur}.\n`
    : "";

  const blocEduscol =
    "Ta réponse doit respecter les programmes officiels du système scolaire français :\n" +
    "- conformité à l’esprit des programmes publiés sur Eduscol,\n" +
    "- cohérence avec le Bulletin Officiel (BO),\n" +
    "- vocabulaire disciplinaire attendu en classe.\n\n";

  const blocNeuro = form.neuro
    ? "Tu t’appuies sur des principes issus des neurosciences de l’apprentissage :\n" +
      "- activer les connaissances préalables,\n" +
      "- introduire une seule difficulté nouvelle à la fois,\n" +
      "- découper la notion en petites étapes,\n" +
      "- alterner explications et questions de vérification,\n" +
      "- partir d’exemples concrets avant la formalisation,\n" +
      "- terminer par un récapitulatif,\n" +
      "- inviter l’élève à reformuler.\n\n"
    : "";

  const blocNiveauLangage = (() => {
    const niveau = form.niveau || "standard";
    const classe = form.classe;
    const isCollege = ["6e", "5e", "4e", "3e"].includes(classe);

    if (isCollege) {
      if (niveau === "basique") {
        return (
          "Adapte ton langage pour un élève de collège en difficulté :\n" +
          "- phrases très courtes,\n" +
          "- vocabulaire simple,\n" +
          "- exemples concrets,\n" +
          "- reformulations fréquentes.\n\n"
        );
      }
      if (niveau === "expert") {
        return (
          "Adapte ton langage pour un élève de collège à l’aise :\n" +
          "- vocabulaire simple mais précis,\n" +
          "- propose des défis/bonus,\n" +
          "- valorise l’initiative.\n\n"
        );
      }
      return (
        "Adapte ton langage à un élève de collège :\n" +
        "- phrases courtes et claires,\n" +
        "- explique les mots difficiles,\n" +
        "- questions de vérification régulières.\n\n"
      );
    }

    if (niveau === "basique") {
      return (
        "Adapte ton langage pour un élève de lycée en difficulté :\n" +
        "- étapes très explicites,\n" +
        "- vocabulaire disciplinaire guidé.\n\n"
      );
    }

    if (niveau === "expert") {
      return (
        "Adapte ton langage pour un élève de lycée à l’aise :\n" +
        "- vocabulaire disciplinaire précis,\n" +
        "- approfondissements,\n" +
        "- exigences de méthode attendues aux examens.\n\n"
      );
    }

    return (
      "Adapte ton langage à un élève de lycée :\n" +
      "- rigueur + clarté,\n" +
      "- progression logique explicite.\n\n"
    );
  })();

  const matiereScientifique = ["Mathématiques", "Physique-Chimie", "SVT", "Numérique/NSI"].includes(
    form.matiere,
  );

  const blocSansLatex = matiereScientifique
    ? 'Pour les écritures mathématiques, n’utilise pas de LaTeX (pas de \\frac, \\sqrt, etc.). Écris les fractions sous la forme a/b et les puissances sous la forme x^2 ou "x au carré".\n\n'
    : "";

  const blocStructureSeance =
    form.type === "Préparation d’une séance" || form.type === "Préparation de séquence"
      ? "Lorsque tu construis une séance, présente-la avec une structure claire et chronométrée :\n" +
        "- durée totale,\n" +
        "- phase 1 : accroche,\n" +
        "- phase 2 : recherche guidée,\n" +
        "- phase 3 : mise en commun / institutionnalisation,\n" +
        "- phase 4 : entraînement,\n" +
        "- phase 5 : bilan / métacognition.\n" +
        "Pour chaque phase : rôle prof, rôle élèves, matériel.\n\n"
      : "";

  const blocDifferenciation =
    "Prévois systématiquement une différenciation pédagogique :\n" +
    "- niveau « base » (élèves en difficulté),\n" +
    "- niveau « standard » (classe),\n" +
    "- niveau « défi » (élèves à l’aise).\n" +
    "Indique clairement quels exercices correspondent à chaque niveau.\n\n";

  const blocRappelsEtMeta =
    "Ta réponse devra :\n" +
    "- commencer par un rappel très court des prérequis,\n" +
    "- présenter en étapes numérotées,\n" +
    "- insérer des questions de vérification (« Et toi, saurais-tu… ? »),\n" +
    "- se terminer par un récapitulatif en puces,\n" +
    "- finir par une question métacognitive.\n\n";

  const blocCriteres =
    "Ajoute à la fin une rubrique « Pour l’enseignant » (3 à 5 critères observables) + erreurs typiques.\n\n";

  const blocMiseEnPage =
    "Si c’est une fiche d’activités/évaluation : structure Word (titres, exercices numérotés, temps, points éventuels, espaces réponses).\n\n";

  const blocWord = blocWordDesign(form.outputStyle);

  return (
    `Tu es une IA pédagogique destinée à des élèves de ${form.classe || "collège/lycée"} en ${
      form.matiere || "discipline scolaire"
    }, dans le système scolaire français.\n\n` +
    blocEduscol +
    blocNeuro +
    blocNiveauLangage +
    blocSansLatex +
    blocMethode +
    blocWord +
    `Objectif pédagogique indiqué par le professeur : ${
      form.objectifPedagogique ||
      "(non précisé : propose une version compatible avec le programme officiel)"
    }\n` +
    `Niveau de difficulté souhaité : ${form.niveau}.\n` +
    `Type de tâche : ${form.type || "non précisé"}.\n` +
    blocTags +
    blocAuteur +
    `Consigne initiale rédigée par le professeur (à optimiser) :\n"""${form.contenu.trim()}"""\n\n` +
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
    `1) Dans la PARTIE 1 : réécris le prompt du professeur (copier-coller dans une autre IA).\n` +
    `2) Dans la PARTIE 2 : produis la ressource complète pour l’élève (sans correction complète si non demandée).\n`
  );
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ProfsPage() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const makeInitialForm = useCallback((): PromptProf => {
    return {
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
      outputStyle: "word_expert",
    };
  }, [today]);

  const [form, setForm] = useState<PromptProf>(() => makeInitialForm());

  const [rawTags, setRawTags] = useState("");
  const [promptInterne, setPromptInterne] = useState("");
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");
  const [copiedRessource, setCopiedRessource] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptInterne, setShowPromptInterne] = useState(false);

  // ✅ signal vers SignupNudge (déclenché après "générer" OK ou "copier")
  const [nudgeSignal, setNudgeSignal] = useState(0);
  const triggerNudge = useCallback(() => setNudgeSignal((n) => n + 1), []);

  const handleChange = useCallback(
    (
      field: keyof PromptProf,
      value: string | boolean | Niveau | MethodePedagogique | OutputStyle,
    ) => {
      setForm((prev) => ({ ...prev, [field]: value as any }));
    },
    [],
  );

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setAgentOutput("");
    setAgentError("");
    setCopiedRessource(false);
    setCopiedPrompt(false);
    setShowPromptInterne(false);
  }, []);

  const updateTags = useCallback((value: string) => {
    setRawTags(value);
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tags }));
  }, []);

  const appliquerPreset = useCallback(
    (key: ProfsPresetKey) => {
      const preset = PROFS_PRESETS[key];
      const v = preset.valeurs;

      setForm((prev) => {
        const base: PromptProf = {
          ...prev,
          ...v,
          tags: v.tags ?? prev.tags,
        };

        if (base.classe === "3e" && !base.tags.includes("DNB")) {
          base.tags = [...base.tags, "DNB"];
        }
        return base;
      });

      if (v.tags) setRawTags(v.tags.join(", "));

      // ✅ important : si on change le formulaire via preset, on nettoie l’ancien output
      clearOutputs();
    },
    [clearOutputs],
  );

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    setRawTags("");
    clearOutputs();
    setAgentLoading(false);
  }, [clearOutputs, makeInitialForm]);

  const typesDisponibles = useMemo(() => {
    const communs = TYPES_COMMUNS;
    const specifiquesMatiere = form.matiere ? TYPES_PAR_MATIERE[form.matiere] || [] : [];

    let speciauxExamens: string[] = [];
    if (form.classe === "3e") speciauxExamens = TYPES_SPECIAUX_BREVET;
    else if (["Seconde", "Première", "Terminale"].includes(form.classe))
      speciauxExamens = TYPES_SPECIAUX_BAC;

    // ✅ déduplication SANS casser l’ordre
    return uniqueKeepOrder([...specifiquesMatiere, ...speciauxExamens, ...communs]);
  }, [form.matiere, form.classe]);

  const suggestions = useMemo(() => {
    const s: string[] = [];
    if (!form.objectifPedagogique.trim()) {
      s.push("Précise l’objectif pédagogique : ce que l’élève doit comprendre / savoir faire / produire.");
    }
    if (!form.classe) {
      s.push("Sélectionne une classe/niveau : ça améliore fortement la qualité du vocabulaire et des attendus.");
    }
    if (!form.matiere) {
      s.push("Indique la matière : EleveAI restera dans le bon cadre disciplinaire.");
    }
    if (!form.type) {
      s.push("Choisis un type de ressource : ça fixe une structure (séance, fiche, évaluation, etc.).");
    }
    if (form.contenu.trim().length < 40) {
      s.push("Ta consigne est courte : ajoute contexte, durée, contraintes, exemple attendu.");
    }
    if (s.length === 0) {
      s.push("Tout est bon. Pour un rendu Word encore meilleur, précise : durée, matériel, contraintes, et un exemple de production attendue.");
    }
    return s;
  }, [form]);

  const creerRessource = useCallback(async () => {
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
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'appel à l'agent IA.");

      const out = data.output || "";
      setAgentOutput(out);

      // ✅ action métier : génération OK -> proposer création de compte (discret)
      if (out) triggerNudge();
    } catch (err: any) {
      console.error(err);
      setAgentError(err?.message || "Erreur inconnue (vérifie le serveur / API).");
    } finally {
      setAgentLoading(false);
    }
  }, [form, triggerNudge]);

  const copierRessource = useCallback(async () => {
    if (!agentOutput) return;
    try {
      await navigator.clipboard.writeText(agentOutput);
      setCopiedRessource(true);
      setTimeout(() => setCopiedRessource(false), 2000);

      // ✅ action métier : copie -> proposer création de compte (discret)
      triggerNudge();
    } catch {
      alert("Impossible de copier automatiquement. Sélectionne le texte et copie-le (Ctrl+C).");
    }
  }, [agentOutput, triggerNudge]);

  const copierPromptInterne = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);

      // (optionnel) tu peux aussi déclencher ici si tu veux
      // triggerNudge();
    } catch {
      alert("Impossible de copier automatiquement. Sélectionne le texte et copie-le (Ctrl+C).");
    }
  }, [promptInterne]);

  const tchatHref = useMemo(() => {
    return promptInterne ? `/tchat?prompt=${encodeURIComponent(promptInterne)}` : "/tchat";
  }, [promptInterne]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs – Générer une ressource pédagogique</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
            Génère une ressource prête Word (et jolie)
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Remplis le formulaire : EleveAI te renvoie une ressource structurée, copiable
            dans Word/ENT/Pronote. Tu peux choisir un rendu « Word Expert » avec icônes,
            encadrés et bannières.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <label className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
              <span>🧠</span>
              <span>Eduscol + neurosciences</span>
              <input
                type="checkbox"
                checked={form.neuro}
                onChange={(e) => handleChange("neuro", e.target.checked)}
                className="rounded border-gray-400"
              />
              <span>Activer</span>
            </label>

            <button
              type="button"
              onClick={resetPage}
              disabled={agentLoading}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                agentLoading
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset complet
            </button>
          </div>
        </header>

        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Clique sur un modèle : le formulaire se pré-remplit."
          items={PROFS_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as ProfsPresetKey)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0047B6] flex items-center gap-2">
              1️⃣ Paramètres pédagogiques
            </h2>

            {/* Classe / matière / niveau */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Classe / niveau</label>
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
                <label className="text-xs font-semibold text-gray-600">Matière</label>
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
                <label className="text-xs font-semibold text-gray-600">Niveau de difficulté</label>
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

            {/* Style Word */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Style de rendu (Word)</label>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  {
                    id: "simple",
                    title: "Simple",
                    desc: "Texte propre, sans contraintes graphiques.",
                    badge: "Rapide",
                  },
                  {
                    id: "word",
                    title: "Word propre",
                    desc: "Titres + icônes + aération.",
                    badge: "Recommandé",
                  },
                  {
                    id: "word_expert",
                    title: "Word Expert",
                    desc: "Bannières + encadrés + zones réponse + design.",
                    badge: "🔥 Best",
                  },
                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleChange("outputStyle", o.id as OutputStyle)}
                    className={`text-left border rounded-xl px-3 py-2 text-xs transition ${
                      form.outputStyle === o.id
                        ? "border-[#0047B6] bg-sky-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">{o.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {o.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">{o.desc}</p>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500">
                Le mode <b>Word Expert</b> force EleveAI à produire un rendu “document” très lisible
                (icônes, encadrés, bannières).
              </p>
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Type de ressource à générer</label>
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
                S’adapte à la matière + brevet (3e) + bac (lycée).
              </p>
            </div>

            {/* Méthode */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600">Méthode pédagogique</label>
                <Link
                  href="/blog"
                  className="text-[11px] text-[#0047B6] underline underline-offset-2 hover:text-[#003894]"
                >
                  En savoir plus
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
                      <span className="font-semibold text-slate-800">{m.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{m.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Titre (pour toi)</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Problèmes ouverts sur les fractions (6e)"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Auteur (facultatif)</label>
                <input
                  type="text"
                  value={form.auteur}
                  onChange={(e) => handleChange("auteur", e.target.value)}
                  placeholder="Nom, initiales…"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            {/* Objectif */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Objectif pédagogique</label>
              <textarea
                value={form.objectifPedagogique}
                onChange={(e) => handleChange("objectifPedagogique", e.target.value)}
                placeholder="Ex : faire comprendre le sens des fractions et l’intérêt du travail coopératif."
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
                placeholder="Ex : #fraction, #collaboration, #DYS"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Pris en compte : <span className="font-semibold">{form.tags.join(", ")}</span>
                </p>
              )}
            </div>

            {/* DYS + date */}
            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={form.adaptationDYS}
                  onChange={(e) => handleChange("adaptationDYS", e.target.checked)}
                  className="rounded border-gray-400"
                />
                <span>Adapter pour des élèves DYS</span>
              </label>
              <div className="text-[11px] text-gray-500">
                Date : <span className="font-mono">{form.date}</span>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">
                Texte de ta demande (version professeur)
              </label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder="Ex : Génère une activité clé en main sur les fractions en pédagogie par projet, avec différenciation et rendu Word Expert."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

            {/* CTA + RESET */}
            <div className="pt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetPage}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  agentLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={creerRessource}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  agentLoading
                    ? "bg-sky-100 text-sky-500 cursor-not-allowed"
                    : "bg-[#0047B6] text-white hover:bg-[#003894]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {agentLoading ? "Génération..." : "Créer la ressource EleveAI"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
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
            </div>

            {/* Output */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">
                  3️⃣ Ressource générée (copiable Word)
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetPage}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-300 hover:bg-slate-50"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={copierRessource}
                    disabled={!agentOutput}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      agentOutput
                        ? "bg-slate-800 text-white hover:bg-slate-900"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copiedRessource ? "Copié" : "Copier"}
                  </button>
                </div>
              </div>

              {agentError && <p className="text-xs text-red-600">⚠️ {agentError}</p>}

              <div className="eleveai-math border rounded p-3 min-h-[180px] bg-slate-50 text-sm whitespace-pre-wrap">
                {agentLoading ? (
                  "Réflexion en cours..."
                ) : agentOutput ? (
                  <MarkdownMath>{agentOutput}</MarkdownMath>
                ) : (
                  "La ressource apparaîtra ici après génération."
                )}
              </div>

              {/* Links */}
              <div className="space-y-2 pt-3">
                <p className="text-[11px] text-gray-600">
                  Réutiliser le prompt interne dans une autre IA :
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                  <Link
                    href={tchatHref}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    🚀 Tchat EleveAI
                  </Link>

                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900"
                  >
                    🟦 ChatGPT
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#0F9D58] text-white font-semibold hover:bg-[#0c7b45]"
                  >
                    🟩 Gemini
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#4B3FFF] text-white font-semibold hover:bg-[#372dcc]"
                  >
                    🟪 Claude
                  </a>
                  <a
                    href="https://chat.mistral.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#FF7F11] text-white font-semibold hover:bg-[#e46f0d]"
                  >
                    🟧 Mistral
                  </a>
                </div>
              </div>
            </div>

            {/* Prompt interne */}
            <div className="bg-white/80 border border-dashed border-slate-300 rounded-2xl shadow-sm p-4 space-y-3 text-xs">
              <button
                type="button"
                onClick={() => setShowPromptInterne((v) => !v)}
                className="text-[11px] font-semibold text-slate-600 underline underline-offset-2 inline-flex items-center gap-2"
              >
                {showPromptInterne ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showPromptInterne
                  ? "Masquer le prompt interne"
                  : "Afficher le prompt interne (avancé)"}
              </button>

              {showPromptInterne && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-700">
                      Prompt interne (EleveAI)
                    </span>
                    <button
                      type="button"
                      onClick={copierPromptInterne}
                      disabled={!promptInterne}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                        promptInterne
                          ? "bg-slate-800 text-white hover:bg-slate-900"
                          : "bg-slate-200 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      <ClipboardCopy className="w-4 h-4" />
                      {copiedPrompt ? "Copié" : "Copier"}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={promptInterne}
                    className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[160px]"
                    placeholder="Le prompt interne apparaîtra après génération."
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ✅ NUDGE (réutilisable) : déclenché par actions métier, jamais si connecté (géré dans le composant) */}
      <SignupNudge
        storageKey="eleveai_nudge_profs_v1"
        delayMs={5 * 60 * 10}
        minInteractions={3}
        variant="bottom"
      />



    </main>
  );
}
