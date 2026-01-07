// app/espace-profs/EspaceprofsClient.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MarkdownMath } from "@/components/MarkdownMath";
import { PresetCarousel, PresetCarouselItem } from "@/components/PresetCarousel";
import SignupNudge from "@/components/SignupNudge";
import { PROFS_PRESETS, ProfsPresetKey } from "@/data/profsPresets";
import ToggleChip from "@/components/ToggleChip";
import { resolveTypeFromTacheProf } from "@/lib/pedagogie/runtime";
import type { TacheProfValue } from "@/lib/constants/scolaire";


// ✅ constantes partagées
import { CLASSES, MATIERES, TACHES_PROF } from "@/lib/constants/scolaire";

import {
  Sparkles,
  RotateCcw,
  ClipboardCopy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Clock3,
  BadgeCheck,
  Save,
  FolderOpen,
  History,
  X,
  Search,
  LayoutGrid,
  SlidersHorizontal,
  ArrowDown,
  MessageCircle,
  Bookmark,
} from "lucide-react";

import type { MethodePedagogique } from "@/lib/pedagogie/methodes";
import { getMethodeDesc, getMethodeLabel, getMethodePromptBlock, METHODES } from "@/lib/pedagogie/methodes";

import { getTypeById, getTypesForContext, tagToBadge } from "@/lib/pedagogie/types";

export { metadata } from "./metadata";

/* ----------------------------------------
   HELPERS (UI)
---------------------------------------- */

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

/* ----------------------------------------
   CATEGORIES (NEW UX)
---------------------------------------- */

type MainCategory = "seance" | "exercices" | "evaluation" | "correction" | "methodes";

const MAIN_CATEGORIES: { id: MainCategory; label: string; emoji: string; hint: string }[] = [
  { id: "seance", label: "Séance / Séquence", emoji: "🗂️", hint: "Déroulé, timing, mise en commun…" },
  { id: "exercices", label: "Exercices", emoji: "✏️", hint: "Séries, niveaux, méthodes, corrigés…" },
  { id: "evaluation", label: "Évaluation", emoji: "🧾", hint: "Contrôle, barème, critères, différenciation…" },
  { id: "correction", label: "Correction", emoji: "✅", hint: "Corrigé structuré, justifications, erreurs…" },
  { id: "methodes", label: "Méthodes", emoji: "🧭", hint: "Fiches méthode, démarches, mémo, erreurs…" },
];

function normalizeMainCategory(raw: unknown): MainCategory {
  const c = String(raw ?? "").toLowerCase();

  if (c.includes("seance") || c.includes("séance") || c.includes("sequence") || c.includes("séquence")) return "seance";
  if (c.includes("exercice")) return "exercices";
  if (c.includes("eval") || c.includes("éval") || c.includes("evaluation") || c.includes("évaluation")) return "evaluation";
  if (c.includes("correction") || c.includes("corrige") || c.includes("corrigé")) return "correction";
  if (c.includes("document")) return "methodes";
  if (c.includes("methode") || c.includes("méthode") || c.includes("methodes") || c.includes("méthodes")) return "methodes";

  return "seance";
}

function getMainCategoryMeta(cat: MainCategory) {
  return MAIN_CATEGORIES.find((c) => c.id === cat) ?? MAIN_CATEGORIES[0];
}

/* ----------------------------------------
   TYPES UI
---------------------------------------- */

type Niveau = "basique" | "remediation" | "ulis" | "standard" | "expert";

type OutputStyle = "simple" | "word" | "word_expert" | "slides";
type PromptMode = "basic" | "standard" | "expert";

type Tonalite = "neutre" | "bienveillante" | "motivation" | "institutionnelle" | "ludique";

type ModaliteEvaluation = "evaluation_sommative" | "evaluation_formative" | "evaluation_diagnostique" | "evaluation_differenciee";

type ThemeAborde = "sport" | "ecologie" | "nature" | "agriculture" | "art" | "musique" | "architecture";

type PromptProf = {
  titre: string;
  objectifPedagogique: string;
  classe: string;
  matiere: string;

  // ✅ Mode précis : tâche guidée
  tacheProf: string;

  niveau: Niveau;
  typeId: string;

  contenu: string;
  tags: string[];
  adaptationDYS: boolean;
  neuro: boolean;

  latex: boolean;

  auteur: string;
  date: string;

  methode: MethodePedagogique;
  outputStyle: OutputStyle;
  dureeMin: number;
  tonalite: Tonalite;

  modaliteEvaluation: ModaliteEvaluation;

  themes: ThemeAborde[];
  themesLabel: string;

  optDifferenciation: boolean;
  optRituels: boolean;
  optIAFriendly: boolean;
  optAtelierIA: boolean;
};

/* ----------------------------------------
   OPTION A : MODE RAPIDE / MODE PRÉCIS
---------------------------------------- */
type InputMode = "rapide" | "precis";

/* ----------------------------------------
   OPTIONS
---------------------------------------- */

const TONALITES: { id: Tonalite; label: string; hint: string }[] = [
  { id: "neutre", label: "Neutre", hint: "Clair et direct." },
  { id: "bienveillante", label: "Bienveillante", hint: "Encourageante, rassurante." },
  { id: "motivation", label: "Motivante", hint: "Énergie, défis, valorisation." },
  { id: "institutionnelle", label: "Institutionnelle", hint: "Style BO / sujet officiel." },
  { id: "ludique", label: "Ludique", hint: "Ton plus léger (sans perdre la rigueur)." },
];

const EVAL_OPTIONS: { id: ModaliteEvaluation; label: string; description: string }[] = [
  {
    id: "evaluation_sommative",
    label: "Évaluation sommative",
    description: "Notation + barème + critères. Progressivité, lisibilité, attendus conformes.",
  },
  {
    id: "evaluation_formative",
    label: "Évaluation formative",
    description: "Feedback + paliers + indices possibles. Sert à apprendre (et pas seulement noter).",
  },
  {
    id: "evaluation_diagnostique",
    label: "Évaluation diagnostique",
    description: "Repérage ciblé des prérequis et difficultés. Courte, précise, exploitable.",
  },
  {
    id: "evaluation_differenciee",
    label: "Évaluation différenciée",
    description: "2-3 parcours (base/standard/défi) ou choix d’exercices + barème adapté.",
  },
];

const THEME_OPTIONS: { id: ThemeAborde; label: string }[] = [
  { id: "sport", label: "Sport" },
  { id: "ecologie", label: "Écologie" },
  { id: "nature", label: "Nature" },
  { id: "agriculture", label: "Agriculture" },
  { id: "art", label: "Art" },
  { id: "musique", label: "Musique" },
  { id: "architecture", label: "Architecture" },
];

const THEME_LABEL_BY_ID: Record<ThemeAborde, string> = THEME_OPTIONS.reduce((acc, t) => {
  acc[t.id] = t.label;
  return acc;
}, {} as Record<ThemeAborde, string>);

/* ----------------------------------------
   PRESETS
---------------------------------------- */

const PROFS_PRESET_ITEMS: PresetCarouselItem[] = (Object.entries(PROFS_PRESETS) as [ProfsPresetKey, (typeof PROFS_PRESETS)[ProfsPresetKey]][]).map(
  ([key, preset]) => ({
    id: key,
    label: preset.label,
    description: preset.description,
    badge: "Modèle prof",
  }),
);

/* ----------------------------------------
   HELPERS
---------------------------------------- */

    function getEvalLabel(id: ModaliteEvaluation) {
      return EVAL_OPTIONS.find((e) => e.id === id)?.label ?? "Évaluation sommative";
    }

    function getEvalDesc(id: ModaliteEvaluation) {
      return EVAL_OPTIONS.find((e) => e.id === id)?.description ?? "";
    }

    function getDifficulteElevesLabel(n: Niveau): string {
      switch (n) {
        case "ulis":
          return "ULIS";
        case "remediation":
          return "Remédiation";
        case "basique":
          return "Basique (très guidé)";
        case "standard":
          return "Standard";
        case "expert":
          return "Expert / approfondissement";
        default:
          return "Standard";
      }
    }


function blocWordDesign(style: OutputStyle) {
  if (style === "simple") return "";

    if (style === "slides") {
        return (
          "Tu es une IA pédagogique experte, conçue pour aider les enseignants\n" +
          "à CONCEVOIR des activités scolaires sous forme de DIAPORAMA (slides).\n\n" +
          "⚠️ CADRE ÉLEVEAI — OBLIGATOIRE\n" +
          "1) Tu ne fais jamais “à la place” des élèves.\n" +
          "2) Tu ne produis PAS de contenu clé en main à projeter tel quel.\n" +
          "3) L’enseignant reste le concepteur final : tu proposes une structure.\n" +
          "4) Le travail des élèves doit rester ouvert, réfléchi et justifié.\n" +
          "5) Respect strict des programmes scolaires français.\n\n" +
          "---\n\n" +
          "FORMAT DE SORTIE OBLIGATOIRE\n" +
          "- Présentation structurée SLIDE PAR SLIDE\n" +
          "- Copiable directement dans PowerPoint / Google Slides\n" +
          "- Chaque slide contient :\n" +
          "  - un TITRE\n" +
          "  - un OBJECTIF pédagogique\n" +
          "  - des QUESTIONS ou CONSIGNES ouvertes\n" +
          "  - éventuellement une suggestion de visuel (schéma, photo, carte…)\n\n" +
          "---\n\n" +
          "STRUCTURE OBLIGATOIRE DES SLIDES\n\n" +
          "=== SLIDE 1 — TITRE & ACCROCHE ===\n" +
          "- Titre de l’activité\n" +
          "- Question déclencheuse OU situation problème\n" +
          "- Pourquoi ce sujet concerne les élèves\n\n" +
          "=== SLIDE 2 — CONTEXTE / ENJEU ===\n" +
          "- Mise en situation\n" +
          "- Enjeu citoyen / scientifique / social\n" +
          "- Lien avec le programme\n\n" +
          "=== SLIDE 3 — OBJECTIFS PÉDAGOGIQUES ===\n" +
          "- Savoirs visés\n" +
          "- Compétences travaillées\n" +
          "- Attitudes / esprit critique\n\n" +
          "=== SLIDE 4 — CONSIGNES DE TRAVAIL ===\n" +
          "- Ce que les élèves doivent faire\n" +
          "- Modalité (groupe, individuel…)\n" +
          "- Contraintes importantes\n" +
          "⚠️ Sans donner la solution\n\n" +
          "=== SLIDE 5 — ÉTAPE 1 ===\n" +
          "- Questions ouvertes\n" +
          "- Pistes de réflexion possibles\n" +
          "- Ce que l’élève doit JUSTIFIER\n\n" +
          "=== SLIDE 6 — ÉTAPE 2 ===\n" +
          "- Approfondissement\n" +
          "- Comparaison / analyse / choix\n" +
          "- Aide possible sans réponse directe\n\n" +
          "=== SLIDE 7 — PRODUCTION ATTENDUE ===\n" +
          "- Type de production\n" +
          "- Format attendu\n" +
          "- Critères de réussite compréhensibles\n\n" +
          "=== SLIDE 8 — VÉRIFICATION & ESPRIT CRITIQUE ===\n" +
          "- Questions de recul\n" +
          "- Ce qui peut être discuté\n" +
          "- Ce qui doit être vérifié ou sourcé\n\n" +
          "=== SLIDE 9 — POUR L’ENSEIGNANT (NON PROJETÉ) ===\n" +
          "- Points de vigilance\n" +
          "- Erreurs fréquentes\n" +
          "- Différenciation (élèves fragiles / à l’aise)\n\n" +
          "---\n\n" +
          "INTERDICTIONS ABSOLUES\n" +
          "- Pas de correction\n" +
          "- Pas de réponse modèle\n" +
          "- Pas de texte prêt à être récité par l’élève\n\n" +
          "---\n\n" +
          "STYLE ATTENDU\n" +
          "- Clair\n" +
          "- Structuré\n" +
          "- Ton professionnel enseignant\n" +
          "- Aucun jargon inutile\n" +
          "- Phrases courtes\n" +
          "- Listes lisibles\n\n" +
          "---\n\n" +
          "TERMINE OBLIGATOIREMENT PAR :\n" +
          "“⚠️ Cette structure de diaporama est une base de travail à adapter par l’enseignant.”\n\n"
        );
      }
  

  if (style === "word") {
    return (
      "Format de sortie obligatoire : document Word (copier-coller sans perte).\n" +
      "- Titres hiérarchisés clairs (Titre 1 / Titre 2 / Titre 3) sur des lignes distinctes.\n" +
      "- Mise en page aérée : listes, lignes courtes, espaces de réponse.\n" +
      "- Utilise des icônes emoji simples au début des sections (compatibles Word).\n" +
      "- Termine par : « ✅ Prêt à coller dans Word ». \n\n"
    );
  }

  // word_expert
  return (
    "Format de sortie obligatoire : document Word EXPERT, très lisible.\n" +
    "Contraintes Word-ready :\n" +
    "- Réponse copiable-collable en conservant la structure.\n" +
    "- Icônes emoji au début des titres/sous-parties.\n" +
    "- Bannières pour grandes parties :\n" +
    "==================================================\n" +
    "🧠 TITRE DE LA PARTIE\n" +
    "==================================================\n" +
    "- Encadrés simulés :\n" +
    "[🟦 ENCART – À RETENIR]\nTexte…\n\n" +
    "[🟨 ENCART – MÉTHODE]\nÉtapes…\n\n" +
    "[🟥 ENCART – ERREUR FRÉQUENTE]\nErreur + correction…\n\n" +
    "[🟩 ENCART – DÉFI / BONUS]\nQuestion défi…\n\n" +
    "- Encarts min : 1 À RETENIR + 1 MÉTHODE + 1 ERREUR + 1 DÉFI.\n" +
    "- Ajoute des zones : « Réponse : ______________________ ».\n" +
    "- Interdits : gros paragraphes compacts.\n" +
    "- Termine par : « ✅ Prêt à coller dans Word ». \n\n"
  );
}


function mapTacheToMainCategory(tache: string): MainCategory {
  if (
    [
      "devoir_dm",
      "evaluation",
      "evaluation_formative",
      "evaluation_diagnostique",
      "evaluation_differenciee",
      "grille_evaluation",
      "quiz_qcm",
      "rubrique_competences",
    ].includes(tache)
  )
    return "evaluation";

  if (["corrige_detaille", "consignes_travail"].includes(tache)) return "correction";

  if (
    [
      "explication",
      "fiche_methode",
      "presentation_support",
      "affichage_classe",
      "carte_mentale",
      "fiche_revision",
      "memo_eleve",
      "synthese_cours",
      "carnet_bord",
      "journal_apprentissage",
    ].includes(tache)
  )
    return "methodes";

  return "seance";
}

function labelFromTache(value: string) {
  const found = TACHES_PROF.find((t) => t.value === value);
  return found?.label ?? "";
}

/* ----------------------------------------
   PROMPT
---------------------------------------- */

function construirePrompt(form: PromptProf, promptMode: PromptMode): string {
  // ✅ EXPERT = ton prompt actuel inchangé
  const construirePromptExpert = (form: PromptProf): string => {
    const typeItem = getTypeById(form.typeId);
    const typeLabel = typeItem?.label ?? "Ressource pédagogique";
    const typeDesc = typeItem?.description ?? "";

    const blocTags = form.tags.length > 0 ? `Mots-clés pédagogiques : ${form.tags.join(", ")}.\n` : "";
    const blocAuteur = form.auteur ? `Préparé par : ${form.auteur}.\n` : "";

    const themesHumains = form.themes?.length ? form.themes.map((t) => THEME_LABEL_BY_ID[t] ?? t) : [];
    const blocThemes =
      (themesHumains.length ? `Thèmes à intégrer : ${themesHumains.join(", ")}.\n` : "") +
      (form.themesLabel?.trim() ? `Contexte / angle : ${form.themesLabel.trim()}.\n` : "");
    const blocContexteThemes = blocThemes.trim().length ? `\n${blocThemes}\n` : "";

    const blocEduscol = "Respecter les programmes officiels français (Eduscol/BO), vocabulaire attendu.\n\n";

    const blocNeuro = form.neuro
      ? "Neurosciences : activer prérequis, petites étapes, alternance explications/questions, récapitulatif, reformulation.\n\n"
      : "";

    const matiereScientifique = [
      "maths",
      "maths-spe-1re",
      "maths-spe-tle",
      "maths-complementaires",
      "maths-expertes",
      "physique-chimie",
      "svt",
      "enseignement-scientifique",
      "snt",
      "nsi",
      "informatique",
      "sciences-ingenieur",
    ].includes(form.matiere);

    const blocSansLatex =
      matiereScientifique && !form.latex
        ? 'Sans LaTeX (pas de \\frac, \\sqrt). Fractions a/b, puissances x^2 ou "x au carré".\n\n'
        : "";

    const blocDYS = form.adaptationDYS
      ? "Adapter DYS : phrases courtes, aération, vocabulaire expliqué, éviter doubles négations.\n\n"
      : "";

    const dur = form.dureeMin && form.dureeMin > 0 ? `${form.dureeMin} min` : "non précisée";
    const tone = form.tonalite || "neutre";
    const blocCalibrage = `Calibrage demandé :\n- Durée : ${dur}.\n- Tonalité : ${tone}.\n\n`;

    const blocOptions =
      (form.optDifferenciation ? "Option : Différenciation (base / standard / défi) clairement indiquée.\n" : "") +
      (form.optRituels ? "Option : Rituel d’entrée 5–10 min (activation, rappel, mini-défi, correction rapide).\n" : "") +
      (form.optIAFriendly
        ? "Option : Compatible correction IA — produire un document très structuré, régulier et facile à analyser automatiquement.\n"
        : "") +
      (form.optAtelierIA
        ? "Option : Intégrer usage de l’IA en classe — inclure une mini-séquence guidée d’usage de l’IA (consignes, étapes, garde-fous, rendu attendu).\n"
        : "");
    const blocOptionsFinal = blocOptions.trim().length ? `Options activées :\n${blocOptions}\n` : "";

    const estEval = normalizeMainCategory(typeItem?.category) === "evaluation";

    const blocEvaluation = estEval
      ? "MODE ÉVALUATION (important) :\n" +
        `- Modalité : ${getEvalLabel(form.modaliteEvaluation)}.\n` +
        "- Exiger : barème/points, consignes claires, attendus, critères de réussite.\n" +
        (form.optDifferenciation ? "- Différenciation : base/standard/défi + erreurs typiques.\n" : "") +
        "- Sortie Word : en-tête (classe/durée), exos numérotés, espaces réponses, total points.\n\n"
      : "";

    const blocMethode = estEval ? "" : getMethodePromptBlock(form.methode);

    const blocStructureSeance =
      normalizeMainCategory(typeItem?.category) === "seance"
        ? "Structure chronométrée : accroche / recherche guidée / mise en commun / entraînement / bilan (rôle prof/élèves + matériel).\n\n"
        : "";

    const blocRituels =
      form.optRituels && normalizeMainCategory(typeItem?.category) === "seance"
        ? "Rituel (5–10 min) : au tout début, une courte activité (question flash / rappel / mini-problème) + correction rapide.\n\n"
        : "";

    const blocIAFriendly = form.optIAFriendly
      ? "DOCUMENT COMPATIBLE CORRECTION IA :\n" +
        "- Structure très claire et régulière.\n" +
        "- Une consigne = une question.\n" +
        "- Pour chaque question : « Attendus : ... » ou « Réponse attendue : ... ».\n" +
        "- Si correction incluse : étapes numérotées + résultat final explicite.\n\n"
      : "";

    const blocAtelierIA = form.optAtelierIA
      ? "INTÉGRER USAGE DE L’IA EN CLASSE (mini-parcours guidé) :\n" +
        "- Étape 1 : rédiger un prompt (modèle fourni).\n" +
        "- Étape 2 : lire la réponse et surligner 2 points à vérifier.\n" +
        "- Étape 3 : corriger/améliorer (avec justification).\n" +
        "- Étape 4 : produire un rendu final personnel.\n\n"
      : "";

    const blocDifferenciation = form.optDifferenciation && !estEval ? "Différenciation : proposer base / standard / défi (indiquer clairement).\n\n" : "";

    const blocRappelsEtMeta =
      "Réponse : prérequis courts, étapes numérotées, questions de vérification, récapitulatif, question métacognitive.\n\n";

    const blocCriteres = "Fin : « Pour l’enseignant » (3-5 critères observables) + erreurs typiques.\n\n";

    const blocMiseEnPage =
      "Si fiche, séance ou évaluation :\n" +
      "- Mise en page claire et aérée.\n" +
      "- Titres hiérarchisés (Titre / Sous-titre).\n" +
      "- Listes à puces ou numérotées.\n" +
      "- Espaces prévus pour les réponses des élèves.\n" +
      "- Pas de blocs de texte trop longs.\n\n";

    const blocFinalStructure =
      form.outputStyle === "slides"
        ? "IMPORTANT :\n" +
          "- Structure ta réponse STRICTEMENT SLIDE PAR SLIDE.\n" +
          "- Chaque slide doit être clairement identifié :\n" +
          "=== SLIDE 1 — ... ===\n" +
          "=== SLIDE 2 — ... ===\n" +
          "- Aucune partie hors slides.\n\n"
        : "IMPORTANT : Structure ta réponse en 2 parties :\n" +
          '1) "=== PARTIE 1 : PROMPT OPTIMISÉ POUR L’IA ==="\n' +
          '2) "=== PARTIE 2 : RESSOURCE PRÊTE POUR L’ÉLÈVE ==="\n';

    const blocWord = blocWordDesign(form.outputStyle);

    return (
      `Tu es une IA pédagogique pour des élèves de ${form.classe || "collège/lycée"} en ${form.matiere || "discipline"}.\n\n` +
      blocEduscol +
      blocNeuro +
      blocSansLatex +
      blocCalibrage +
      blocOptionsFinal +
      (typeDesc ? `Type choisi : ${typeLabel} — ${typeDesc}\n\n` : `Type choisi : ${typeLabel}\n\n`) +
      blocEvaluation +
      blocMethode +
      blocWord +
      `Objectif pédagogique : ${form.objectifPedagogique || "(non précisé)"}\n` +
      `Difficulté élèves : ${getDifficulteElevesLabel(form.niveau)}.\n` +

      blocTags +
      blocContexteThemes +
      blocAuteur +
      `Consigne professeur (à optimiser) :\n"""${form.contenu.trim()}"""\n\n` +
      blocDYS +
      blocStructureSeance +
      blocRituels +
      blocIAFriendly +
      blocAtelierIA +
      blocDifferenciation +
      blocRappelsEtMeta +
      blocCriteres +
      (form.outputStyle === "slides" ? "" : blocMiseEnPage) +
      blocFinalStructure
    );
  };

  if (promptMode === "expert") {
    return construirePromptExpert(form); // ✅ inchangé
  }

  // ✅ STANDARD / BASIC : versions simplifiées
  const typeItem = getTypeById(form.typeId);
  const typeLabel = typeItem?.label ?? "Ressource pédagogique";
  const typeDesc = typeItem?.description ?? "";

  const blocEduscol = "Respecter les programmes officiels français (Eduscol/BO).\n";
  const blocNeuro = form.neuro ? "Neurosciences : petites étapes, questions, récap.\n" : "";
  const blocDYS = form.adaptationDYS ? "Adapter DYS : phrases courtes, aéré, vocabulaire expliqué.\n" : "";

  const dur = form.dureeMin && form.dureeMin > 0 ? `${form.dureeMin} min` : "non précisée";
  const tone = form.tonalite || "neutre";

  const blocCalibrage = `Calibrage : durée ${dur} • tonalité ${tone}.\n`;

  const blocOptionsStandard =
    (form.optDifferenciation ? "Différenciation : base/standard/défi.\n" : "") +
    (form.optRituels ? "Rituel court au début.\n" : "") +
    (form.optIAFriendly ? "Sortie structurée : questions + attendus repérables.\n" : "") +
    (form.optAtelierIA ? "Inclure une mini-étape d’usage IA guidé (si pertinent).\n" : "");

  const blocOptionsBasic =
    (form.optDifferenciation ? "Différenciation : base/standard/défi.\n" : "") +
    (form.optIAFriendly ? "Sortie structurée (questions + attendus).\n" : "");

  const blocFormat =
    form.outputStyle === "slides"
      ? "Format : SLIDE PAR SLIDE (Titre / Objectif / Questions-Consignes / Visuel suggéré). Aucune partie hors slides.\n"
      : "Format : document clair (titres, listes, espaces réponses si besoin).\n";

  const blocInterditsBasic =
    "Interdits : pas de correction modèle, pas de réponse rédigée à la place des élèves.\n";

  const optionsBloc = promptMode === "standard" ? blocOptionsStandard : blocOptionsBasic;

  return (
    `Tu es une IA pédagogique pour des élèves de ${form.classe || "collège/lycée"} en ${form.matiere || "discipline"}.\n` +
    blocEduscol +
    blocNeuro +
    blocDYS +
    blocCalibrage +
    (optionsBloc ? `Options :\n${optionsBloc}` : "") +
    (typeDesc ? `Type : ${typeLabel} — ${typeDesc}\n` : `Type : ${typeLabel}\n`) +
    blocFormat +
    `Objectif : ${form.objectifPedagogique || "(non précisé)"}\n` +
    `Difficulté élèves : ${getDifficulteElevesLabel(form.niveau)}.\n` +
    `Consigne prof : """${form.contenu.trim()}"""\n` +
    blocInterditsBasic
  );
}

/* ----------------------------------------
   UI : Boutons "Coller dans" (couleurs)
---------------------------------------- */

function PasteTargets({ text, showToast }: { text: string; showToast: (msg: string) => void }) {
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

  return (
    <div className="space-y-2 pt-1">
      <p className="text-[11px] text-gray-600">Coller dans :</p>
      <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
         <a
          href="https://chatgpt.com"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            copySilently();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-800 text-white hover:bg-slate-900"
          }`}
        >
          🟦 ChatGPT
        </a>

        <a
          href="https://www.perplexity.ai/"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            copySilently();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#0F9D58] text-white hover:bg-[#0c7b45]"
          }`}
        >
          🟩 Perplexity
        </a>
       <Link
          href={tchatHref}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            disabled ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          🚀 Tchat EleveAI
        </Link>

      </div>
    </div>
  );
}

/* ----------------------------------------
   DB TYPES (jsonb typé)
---------------------------------------- */

type PresetEmailMeta = {
  scope: "profs";
  version: number;
};

type PresetEmailDataProfs = {
  meta: PresetEmailMeta;
  form: PromptProf;
  promptInterne: string;
  agentOutput: string;
};

function isPresetEmailDataProfs(x: unknown): x is PresetEmailDataProfs {
  if (!x || typeof x !== "object") return false;
  const o = x as any;
  return (
    o.meta?.scope === "profs" &&
    typeof o.meta?.version === "number" &&
    typeof o.promptInterne === "string" &&
    typeof o.agentOutput === "string" &&
    typeof o.form === "object" &&
    typeof o.form?.typeId === "string"
  );
}

type DbPresetEmail = {
  id: string;
  auth_user_id: string;
  title: string | null;
  classe: string | null;
  matiere: string | null;
  niveau: string | null;
  prompt: string | null;
  data: unknown;
  created_at: string;
};

type DbRunEmail = {
  id: string;
  auth_user_id: string;
  preset_id: string | null;
  classe: string | null;
  matiere: string | null;
  created_at: string;
};

/* ----------------------------------------
   RELANCE (Prompt 2)
---------------------------------------- */

type FeedbackChoice = "" | "ok" | "bof" | "pas_ok";

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function ProfsPage() {
  const supabase = useMemo(() => createClient(), []);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // ✅ Refs (scroll UX)
  const promptRef = useRef<HTMLDivElement | null>(null);
  const ressourceRef = useRef<HTMLDivElement | null>(null);
  const relanceRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const scrollToPrompt = useCallback(() => {
    promptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const scrollToRessource = useCallback(() => {
    ressourceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const scrollToRelance = useCallback(() => {
    relanceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const makeInitialForm = useCallback((): PromptProf => {
    return {
      titre: "",
      objectifPedagogique: "",
      classe: "",
      matiere: "",
      tacheProf: "",
      niveau: "standard",
      typeId: "seance_cle_en_main",
      contenu: "",
      tags: [],
      adaptationDYS: true,
      neuro: true,
      latex: false,
      auteur: "",
      date: today,
      methode: "methode_active",
      outputStyle: "word_expert",
      dureeMin: 45,
      tonalite: "neutre",
      modaliteEvaluation: "evaluation_sommative",
      themes: [],
      themesLabel: "Exemples : thème local, type de texte, projet de classe, lien avec l’actualité, besoins spécifiques des élèves…",
      optDifferenciation: true,
      optRituels: false,
      optIAFriendly: true,
      optAtelierIA: false,
    };
  }, [today]);

  const [form, setForm] = useState<PromptProf>(() => makeInitialForm());
  const [rawTags, setRawTags] = useState("");
  // ✅ NEW : mode de génération du prompt (indépendant de la difficulté élèves)
   const [promptMode, setPromptMode] = useState<PromptMode>("standard");


  // ✅ Option A : mode
  const [mode, setMode] = useState<InputMode>("rapide");

  const [promptInterne, setPromptInterne] = useState("");
  const [agentOutput, setAgentOutput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");
  const [formError, setFormError] = useState<string>("");

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedRessource, setCopiedRessource] = useState(false);
  const [showPromptInterne, setShowPromptInterne] = useState(true);

  const [showMethode, setShowMethode] = useState(false);
  const [showEval, setShowEval] = useState(false);

  const [nudgeSignal, setNudgeSignal] = useState(0);
  const triggerNudge = useCallback(() => setNudgeSignal((n) => n + 1), []);

  const [dbMsg, setDbMsg] = useState<string>("");
  const [lastPresetId, setLastPresetId] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  const [showMyPresets, setShowMyPresets] = useState(false);
  const [myPresetsLoading, setMyPresetsLoading] = useState(false);
  const [myPresets, setMyPresets] = useState<DbPresetEmail[]>([]);

  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [runs, setRuns] = useState<DbRunEmail[]>([]);

  

  // ✅ NEW UX : catégorie principale + recherche type
  const [mainCategory, setMainCategory] = useState<MainCategory>("seance");
  const [typeQuery, setTypeQuery] = useState("");

  // ✅ Relance (Prompt 2)
  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackChoice>("");
  const [feedbackText, setFeedbackText] = useState("");
  const [promptRelance, setPromptRelance] = useState("");
  const [copiedRelance, setCopiedRelance] = useState(false);

  // ✅ Auth state
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setIsAuthed(!!data?.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user);
    });
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  // ✅ si typeId invalide → fallback
  useEffect(() => {
    const current = getTypeById(form.typeId);
    if (current) return;

    const all = getTypesForContext({ classe: form.classe, matiere: form.matiere });
    const fallback = all?.[0];
    if (fallback) {
      setForm((p) => ({ ...p, typeId: fallback.id }));
      setMainCategory(normalizeMainCategory(fallback.category));
    }
  }, [form.classe, form.matiere, form.typeId]);

  // ✅ synchro catégorie depuis type (robuste)
  useEffect(() => {
    const t = getTypeById(form.typeId);
    if (t?.category) setMainCategory(normalizeMainCategory(t.category));
  }, [form.typeId]);

  const handleChange = useCallback(<K extends keyof PromptProf>(field: K, value: PromptProf[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const clearOutputs = useCallback(() => {
    setPromptInterne("");
    setAgentOutput("");
    setAgentError("");
    setFormError("");
    setCopiedPrompt(false);
    setCopiedRessource(false);
    setShowPromptInterne(true);

    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);
  }, []);

  const updateTags = useCallback((value: string) => {
    setRawTags(value);
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tags }));
  }, []);

  const toggleTheme = useCallback((id: ThemeAborde) => {
    setForm((prev) => {
      const has = prev.themes.includes(id);
      return { ...prev, themes: has ? prev.themes.filter((t) => t !== id) : [...prev.themes, id] };
    });
  }, []);

  // ✅ Option A : switch mode
  const switchToRapide = useCallback(() => {
    setMode("rapide");
    // règle d’or : en mode rapide, pas de tâche
    setForm((p) => ({ ...p, tacheProf: "" }));
    setTypeQuery("");
    showToast("⚡ Mode rapide");
  }, [showToast]);

  const switchToPrecis = useCallback(() => {
    setMode("precis");
    showToast("🎯 Mode précis : choisis une tâche");
  }, [showToast]);

  const appliquerPresetModele = useCallback(
    (key: ProfsPresetKey) => {
      const preset = PROFS_PRESETS[key];
      const v = preset.valeurs as Partial<PromptProf> & Record<string, unknown>;

      setForm((prev): PromptProf => {
        const next: PromptProf = {
          ...prev,
          ...v,
          typeId: typeof v.typeId === "string" ? v.typeId : prev.typeId,
          methode: typeof v.methode === "string" ? (v.methode as MethodePedagogique) : prev.methode,
          outputStyle: typeof v.outputStyle === "string" ? (v.outputStyle as OutputStyle) : prev.outputStyle,
          dureeMin: typeof v.dureeMin === "number" ? v.dureeMin : prev.dureeMin,
          tonalite: typeof v.tonalite === "string" ? (v.tonalite as Tonalite) : prev.tonalite,
          modaliteEvaluation: typeof v.modaliteEvaluation === "string" ? (v.modaliteEvaluation as ModaliteEvaluation) : prev.modaliteEvaluation,
          themes: Array.isArray(v.themes) ? (v.themes as ThemeAborde[]) : prev.themes,
          themesLabel: typeof v.themesLabel === "string" ? v.themesLabel : prev.themesLabel,
          tags: Array.isArray(v.tags) ? (v.tags as string[]) : prev.tags,
          latex: typeof v.latex === "boolean" ? v.latex : prev.latex,

          optDifferenciation: typeof (v as any).optDifferenciation === "boolean" ? (v as any).optDifferenciation : prev.optDifferenciation,
          optRituels: typeof (v as any).optRituels === "boolean" ? (v as any).optRituels : prev.optRituels,
          optIAFriendly: typeof (v as any).optIAFriendly === "boolean" ? (v as any).optIAFriendly : prev.optIAFriendly,
          optAtelierIA: typeof (v as any).optAtelierIA === "boolean" ? (v as any).optAtelierIA : prev.optAtelierIA,
        };
        return next;
      });

      const t = getTypeById(typeof v.typeId === "string" ? v.typeId : form.typeId);
      if (t?.category) setMainCategory(normalizeMainCategory(t.category));

      if (Array.isArray(v.tags)) setRawTags((v.tags as string[]).join(", "));
      clearOutputs();
      setShowMethode(false);
      setShowEval(false);
      setDbMsg("");
      showToast("✅ Modèle appliqué !");
      setTimeout(() => scrollToTop(), 50);
    },
    [clearOutputs, form.typeId, scrollToTop, showToast],
  );

  const resetPage = useCallback(() => {
    setForm(makeInitialForm());
    setRawTags("");
    clearOutputs();
    setAgentLoading(false);
    setShowMethode(false);
    setShowEval(false);
    setDbMsg("");
    setLastPresetId(null);
    setMainCategory("seance");
    setTypeQuery("");
    setMode("rapide");
    showToast("🔄 Reset complet");
    setTimeout(() => scrollToTop(), 50);
  }, [clearOutputs, makeInitialForm, scrollToTop, showToast]);

  const typesDisponibles = useMemo(() => {
    const all = getTypesForContext({ classe: form.classe, matiere: form.matiere });
    const byCat = all.filter((t) => normalizeMainCategory(t.category) === mainCategory);

    const q = typeQuery.trim().toLowerCase();
    return q
      ? byCat.filter((t) => {
          const hay = `${t.label} ${t.description} ${(t.tags || []).join(" ")}`.toLowerCase();
          return hay.includes(q);
        })
      : byCat;
  }, [form.classe, form.matiere, mainCategory, typeQuery]);

  const selectedType = useMemo(() => getTypeById(form.typeId), [form.typeId]);
  const estEval = useMemo(() => normalizeMainCategory(selectedType?.category) === "evaluation", [selectedType?.category]);

  const selectType = useCallback(
    (typeId: string) => {
      const t = getTypeById(typeId);

      setForm((prev) => {
        const next: PromptProf = { ...prev, typeId };

        if (t?.defaultDureeMin !== undefined && t.defaultDureeMin !== null) {
          if (!prev.dureeMin || prev.dureeMin <= 0) next.dureeMin = t.defaultDureeMin;
        }
        if (t?.auto?.forceOutputStyle) next.outputStyle = t.auto.forceOutputStyle;

        return next;
      });

      if (t?.auto?.openEvalPanel) setShowEval(true);
      if (t?.auto?.hideMethodePanel) setShowMethode(false);
      if (t?.category) setMainCategory(normalizeMainCategory(t.category));

      clearOutputs();
      showToast("✅ Type sélectionné");
    },
    [clearOutputs, showToast],
  );

  /* ----------------------------------------
     VALIDATION UX
  ---------------------------------------- */

  const validation = useMemo(() => {
    const issues: string[] = [];

    if (!form.classe) issues.push("Choisis une classe.");
    if (!form.matiere) issues.push("Choisis une matière.");
    if (!form.typeId) issues.push("Choisis un type.");
    if (!form.objectifPedagogique.trim()) issues.push("Précise l’objectif pédagogique.");
    if (!form.contenu.trim()) issues.push("Écris la consigne (version prof).");
    if (form.contenu.trim() && form.contenu.trim().length < 40) issues.push("Consigne trop courte (≈ 40 caractères minimum).");
    if (!form.dureeMin || form.dureeMin <= 0) issues.push("Renseigne une durée (> 0).");

    if (estEval && !form.modaliteEvaluation) issues.push("Choisis une modalité d’évaluation.");

    // En mode précis, on veut une tâche
    if (mode === "precis" && !form.tacheProf) issues.push("Mode précis : choisis une tâche.");

    return { ok: issues.length === 0, issues };
  }, [estEval, form, mode]);

  const suggestions = useMemo(() => {
    const s: string[] = [];

    if (!form.objectifPedagogique.trim()) s.push("Objectif : ce que l’élève doit savoir faire (verbe d’action).");
    if (!form.classe) s.push("Classe : vocabulaire + attendus mieux calibrés.");
    if (!form.matiere) s.push("Matière : garde l’IA dans le bon cadre.");
    if (!form.typeId) s.push("Type : fixe la structure (séance, exercices, évaluation…).");
    if (form.contenu.trim().length > 0 && form.contenu.trim().length < 40) s.push("Consigne : ajoute contraintes, barème/critères, exemple attendu.");
    if (!form.dureeMin || form.dureeMin <= 0) s.push("Durée : calibre la production.");

    if (mode === "precis" && !form.tacheProf) s.push("Mode précis : choisis une tâche pour guider automatiquement la catégorie.");

    if (!form.optDifferenciation) s.push("Option : active Différenciation si tu veux base/standard/défi.");
    if (normalizeMainCategory(selectedType?.category) === "seance" && !form.optRituels) s.push("Option : active Rituels pour un démarrage 5–10 min (simple et efficace).");
    if (!form.optIAFriendly) s.push("Option : active Compatible correction IA si tu veux un document Word structuré.");

    if (estEval) {
      s.push("Évaluation : barème + critères + aides autorisées (calculatrice, docs, IA…).");
      if (!form.optDifferenciation) s.push("Évaluation : si tu veux différencier, active l’option Différenciation.");
    } else {
      s.push("Méthode : tu peux la modifier si tu veux, mais c’est déjà OK.");
    }

    if ((form.themes?.length ?? 0) === 0) s.push("Ajoute 1-2 thèmes : exemples concrets + motivation.");
    if (!form.themesLabel.trim()) s.push("Ajoute un angle (ex : contexte local : [territoire]) pour contextualiser.");

    if (s.length === 0) s.push("Parfait. Tu peux ajouter : matériel, contraintes, exemple de production attendue.");

    return s;
  }, [estEval, form, mode, selectedType?.category]);

  /* ----------------------------------------
     DB HELPERS
  ---------------------------------------- */

  const getAuthUserIdOrThrow = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) throw new Error("Tu dois être connecté pour utiliser les presets.");
    return data.user.id;
  }, [supabase]);

  const loadMyPresets = useCallback(async () => {
    setDbMsg("");
    setMyPresetsLoading(true);

    try {
      const uid = await getAuthUserIdOrThrow();
      const { data, error } = await supabase
        .from("presets_email")
        .select("id, auth_user_id, title, classe, matiere, niveau, prompt, data, created_at")
        .eq("auth_user_id", uid)
        .order("created_at", { ascending: false })
        .limit(80);

      if (error) throw new Error(error.message);

      const rows = (data ?? []) as DbPresetEmail[];
      const filtered = rows.filter((r) => isPresetEmailDataProfs(r.data));

      setMyPresets(filtered);
      setShowMyPresets(true);
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur chargement presets."}`);
    } finally {
      setMyPresetsLoading(false);
    }
  }, [getAuthUserIdOrThrow, supabase]);

  const applySavedPreset = useCallback(
    (p: DbPresetEmail) => {
      if (!isPresetEmailDataProfs(p.data)) {
        setDbMsg("⚠️ Preset incompatible (format ancien).");
        return;
      }

      const data = p.data;

      setForm(data.form);
      setRawTags((data.form.tags ?? []).join(", "));

      setPromptInterne(data.promptInterne || p.prompt || "");
      setAgentOutput(data.agentOutput || "");
      setAgentError("");
      setFormError("");

      const t = getTypeById(data.form.typeId);
      if (t?.category) setMainCategory(normalizeMainCategory(t.category));

      // mode : si la tâche existe, on passe en mode précis
      setMode(data.form.tacheProf ? "precis" : "rapide");

      setFeedbackChoice("");
      setFeedbackText("");
      setPromptRelance("");
      setCopiedRelance(false);

      setLastPresetId(p.id);
      setDbMsg("✅ Preset chargé.");
      setShowMyPresets(false);

      showToast("📚 Preset chargé");
      setTimeout(() => scrollToPrompt(), 50);
    },
    [scrollToPrompt, showToast],
  );

  const saveCurrentPreset = useCallback(async () => {
    setDbMsg("");

    try {
      const uid = await getAuthUserIdOrThrow();

      const title =
        form.titre?.trim() ||
        `${getTypeById(form.typeId)?.label || "Preset"} – ${form.classe || ""} ${form.matiere || ""}`.trim();

      const dataJson: PresetEmailDataProfs = {
        meta: { scope: "profs", version: 4 },
        form,
        promptInterne,
        agentOutput,
      };

      const { data, error } = await supabase
        .from("presets_email")
        .insert({
          auth_user_id: uid,
          title,
          classe: form.classe || null,
          matiere: form.matiere || null,
          niveau: form.niveau || null,
          prompt: promptInterne || null,
          data: dataJson,
        })
        .select("id")
        .single();

      if (error) throw new Error(error.message);

      setLastPresetId(data.id as string);
      setDbMsg("✅ Preset enregistré.");
      triggerNudge();
      showToast("⭐ Preset enregistré");
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur sauvegarde preset."}`);
      showToast("⚠️ Erreur sauvegarde");
    }
  }, [agentOutput, form, getAuthUserIdOrThrow, promptInterne, supabase, triggerNudge, showToast]);

  const loadRunsHistory = useCallback(async () => {
    setDbMsg("");
    setHistoryLoading(true);
    try {
      const uid = await getAuthUserIdOrThrow();
      const { data, error } = await supabase
        .from("preset_runs_email")
        .select("id, auth_user_id, preset_id, classe, matiere, created_at")
        .eq("auth_user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw new Error(error.message);
      setRuns((data ?? []) as DbRunEmail[]);
      setShowHistory(true);
    } catch (e: any) {
      setDbMsg(`⚠️ ${e?.message || "Erreur historique."}`);
    } finally {
      setHistoryLoading(false);
    }
  }, [getAuthUserIdOrThrow, supabase]);

  const createRun = useCallback(
    async (presetId: string | null) => {
      try {
        const uid = await getAuthUserIdOrThrow();
        const { error } = await supabase.from("preset_runs_email").insert({
          auth_user_id: uid,
          preset_id: presetId,
          classe: form.classe || null,
          matiere: form.matiere || null,
        });
        if (error) throw new Error(error.message);
      } catch {
        // non bloquant
      }
    },
    [form.classe, form.matiere, getAuthUserIdOrThrow, supabase],
  );

  /* ----------------------------------------
     ACTIONS IA
  ---------------------------------------- */

  const creerPromptEtRessource = useCallback(async () => {
    setAgentError("");
    setFormError("");
    setDbMsg("");

    if (!validation.ok) {
      setFormError(validation.issues[0] ?? "Champs insuffisants.");
      showToast("⚠️ Champs incomplets");
      return;
    }

     const prompt = construirePrompt(form, promptMode);

    setPromptInterne(prompt);
    setAgentOutput("");
    setCopiedPrompt(false);
    setCopiedRessource(false);

    setFeedbackChoice("");
    setFeedbackText("");
    setPromptRelance("");
    setCopiedRelance(false);

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
      if (out) triggerNudge();

      await createRun(lastPresetId);

      showToast("✨ Généré !");
      setTimeout(() => scrollToPrompt(), 50);
      setTimeout(() => scrollToRessource(), 350);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue (vérifie le serveur / API).";
      setAgentError(msg);
      showToast("⚠️ Erreur génération");
    } finally {
      setAgentLoading(false);
    }
  }, [createRun, form, promptMode, lastPresetId, triggerNudge, validation, scrollToPrompt, scrollToRessource, showToast]);

  const copierPrompt = useCallback(async () => {
    if (!promptInterne) return;
    try {
      await navigator.clipboard.writeText(promptInterne);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1200);
      triggerNudge();
      showToast("✅ Prompt copié");
    } catch {
      setDbMsg("⚠️ Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
      showToast("⚠️ Copie impossible");
    }
  }, [promptInterne, triggerNudge, showToast]);

  const copierRessource = useCallback(async () => {
    if (!agentOutput) return;
    try {
      await navigator.clipboard.writeText(agentOutput);
      setCopiedRessource(true);
      setTimeout(() => setCopiedRessource(false), 1200);
      triggerNudge();
      showToast("✅ Ressource copiée");
    } catch {
      setDbMsg("⚠️ Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
      showToast("⚠️ Copie impossible");
    }
  }, [agentOutput, triggerNudge, showToast]);

  // ✅ Relance (Prompt 2)
  const buildRelanceBloc = useCallback(() => {
    const feedbackFree = feedbackText.trim();

    const intentByChoice: Record<Exclude<FeedbackChoice, "">, string> = {
      ok:
        "Objectif : consolider et finaliser.\n" +
        "- Propose une version V2 plus propre (meilleure structure Word, consignes plus claires).\n" +
        "- Ajoute 5 points de vérification (erreurs fréquentes / pièges) + corrections.\n" +
        "- Termine par une checklist de conformité (programme, barème/critères si éval, différenciation si activée).",
      bof:
        "Objectif : clarifier / simplifier.\n" +
        "- Reprends en version plus simple et plus explicite.\n" +
        "- Réduis la densité, ajoute des micro-étapes et des exemples concrets.\n" +
        "- Si des consignes sont ambiguës, propose 2 variantes (A/B) et demande laquelle choisir.",
      pas_ok:
        "Objectif : vérifier / rectifier.\n" +
        "- Liste précisément ce qui semble incohérent ou risqué.\n" +
        "- Corrige en explicitant tes hypothèses.\n" +
        "- Si tu n’es pas sûr d’un point, dis-le et propose une alternative robuste.\n" +
        "- Termine par une version corrigée V2.",
    };

    const addUserNote = feedbackFree ? `\n\nNote du prof (à prendre en compte) :\n"${feedbackFree}"\n` : "";

    const antiHallucination =
      "\n\nRègles importantes :\n" +
      "- Si une information est incertaine, dis-le.\n" +
      "- Vérifie la cohérence interne (durée, niveau, barème, consignes).\n" +
      "- Termine par : « Souhaites-tu que je l’adapte à un établissement / un public spécifique ? »\n";

    const relance =
      "Tu vas améliorer une production pédagogique.\n" +
      "Voici le contexte :\n\n" +
      "=== PROMPT 1 (généré) ===\n" +
      "-----\n" +
      promptInterne +
      "\n-----\n\n" +
      "=== SORTIE (ressource générée) ===\n" +
      "-----\n" +
      (agentOutput || "(aucune ressource — produire une V2 à partir du prompt)") +
      "\n-----\n\n" +
      "Maintenant, fais la relance suivante :\n" +
      intentByChoice[feedbackChoice as Exclude<FeedbackChoice, "">] +
      addUserNote +
      antiHallucination;

    return relance;
  }, [agentOutput, feedbackChoice, feedbackText, promptInterne]);

  const buildRelancePrompt = useCallback(() => {
    if (!promptInterne) {
      showToast("⚠️ Génère d’abord le prompt (étape 3).");
      return;
    }
    if (!feedbackChoice) {
      showToast("⚠️ Choisis d’abord ton avis.");
      return;
    }
    const rel = buildRelanceBloc();
    setPromptRelance(rel);
    setCopiedRelance(false);
    showToast("🔁 Relance générée !");
    setTimeout(() => scrollToRelance(), 80);
  }, [buildRelanceBloc, feedbackChoice, promptInterne, scrollToRelance, showToast]);

  const copierRelance = useCallback(async () => {
    if (!promptRelance) return;
    try {
      await navigator.clipboard.writeText(promptRelance);
      setCopiedRelance(true);
      showToast("✅ Relance copiée");
      setTimeout(() => setCopiedRelance(false), 1200);
    } catch {
      showToast("⚠️ Copie auto impossible (sélectionne puis Ctrl+C).");
    }
  }, [promptRelance, showToast]);

  const mainCatMeta = useMemo(() => getMainCategoryMeta(mainCategory), [mainCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-gray-900">
      <div ref={topRef} className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-8">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
            <span>🧑‍🏫</span>
            <span>Espace professeurs · Prompts pédagogiques</span>
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">Générateur de prompts pédagogiques (Word-friendly)</h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Choisis un <b>type</b> (séance, exercices, évaluation…), ajoute des <b>options</b>, puis écris ta consigne. EleveAI génère un{" "}
            <b>prompt clair</b> et une <b>ressource prête à l’emploi</b>.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <ToggleChip
              label="Neurosciences"
              checked={form.neuro}
              onChange={(v) => handleChange("neuro", v)}
              hint="Pré-requis, micro-étapes, questions, récap, métacognition."
              tone="emerald"
              icon={<span>🧠</span>}
            />

            <ToggleChip
              label="Adapter DYS"
              checked={form.adaptationDYS}
              onChange={(v) => handleChange("adaptationDYS", v)}
              hint="Phrases courtes, aéré, vocabulaire expliqué."
              tone="violet"
              icon={<span>👁️</span>}
            />

            <ToggleChip
              label="LaTeX"
              checked={form.latex}
              onChange={(v) => handleChange("latex", v)}
              hint="Formules LaTeX autorisées (sinon a/b, x^2…)."
              tone="sky"
              icon={<span>∑</span>}
            />

            {estEval && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[11px] font-semibold text-amber-800 border border-amber-200">
                <BadgeCheck className="w-4 h-4" />
                Mode évaluation (barème + critères)
              </span>
            )}

            <button
              type="button"
              onClick={resetPage}
              disabled={agentLoading}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                agentLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset complet
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={saveCurrentPreset}
                disabled={!isAuthed || agentLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || agentLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour enregistrer" : "Enregistrer ce preset"}
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>

              <button
                type="button"
                onClick={loadMyPresets}
                disabled={!isAuthed || myPresetsLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || myPresetsLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour voir tes presets" : "Afficher mes presets"}
              >
                <FolderOpen className="w-4 h-4" />
                Mes presets
              </button>

              <button
                type="button"
                onClick={loadRunsHistory}
                disabled={!isAuthed || historyLoading}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                  !isAuthed || historyLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={!isAuthed ? "Connecte-toi pour voir l'historique" : "Historique des générations"}
              >
                <History className="w-4 h-4" />
                Historique
              </button>
            </div>

            {dbMsg && <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800 text-white">{dbMsg}</span>}

            {!isAuthed && <span className="text-[11px] text-slate-600">(Connecte-toi pour sauvegarder)</span>}
          </div>
        </header>

        <PresetCarousel
          title="Modèles rapides (facultatif)"
          subtitle="Clique sur un modèle : le formulaire se pré-remplit."
          items={PROFS_PRESET_ITEMS}
          onSelect={(id) => appliquerPresetModele(id as ProfsPresetKey)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0047B6] flex items-center gap-2">1️⃣ Paramètres pédagogiques</h2>

            {/* Classe / matière / niveau */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Classe / niveau</label>
                <select
                  value={form.classe}
                  onChange={(e) => {
                    handleChange("classe", e.target.value);
                    showToast("✅ Classe choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Choisir…</option>
                  {CLASSES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Matière</label>
                <select
                  value={form.matiere}
                  onChange={(e) => {
                    handleChange("matiere", e.target.value);
                    showToast("✅ Matière choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={`${m.label}-${m.value}`} value={m.value} disabled={!!m.disabled}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Difficulté élèves</label>

              <select
                value={form.niveau}
                onChange={(e) => handleChange("niveau", e.target.value as Niveau)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="ulis">ULIS (adaptations fortes)</option>
                <option value="remediation">Remédiation (bases à consolider)</option>
                <option value="basique">Basique (très guidé)</option>
                <option value="standard">Standard</option>
                <option value="expert">Expert / approfondissement</option>
              </select>

              </div>
            </div>

            {/* ✅ OPTION A : MODE */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={switchToRapide}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    mode === "rapide" ? "border-[#0047B6] bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  ⚡ Mode rapide
                  <div className="text-[11px] font-normal text-slate-600 mt-1">Catégorie + options → tu vas vite</div>
                </button>

                <button
                  type="button"
                  onClick={switchToPrecis}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    mode === "precis" ? "border-[#0047B6] bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  🎯 Mode précis
                  <div className="text-[11px] font-normal text-slate-600 mt-1">Choisir une tâche → guidé</div>
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-700">
                  <span className="font-semibold">{mode === "rapide" ? "⚡ Rapide" : "🎯 Précis"}</span>{" "}
                  {mode === "rapide"
                    ? "— tu choisis la catégorie, puis un type."
                    : "— tu choisis une tâche, la catégorie se déduit automatiquement."}
                </p>
              </div>
            </div>

            {/* ✅ MODE PRÉCIS : TÂCHE */}
            {mode === "precis" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Tâche précise</label>

                <select
                  value={form.tacheProf}
                  onChange={(e) => {
                    const v = e.target.value as TacheProfValue;

                    // 1) stocker la tâche
                    handleChange("tacheProf", v);
                    showToast(v ? "✅ Tâche choisie" : "↩️ Tâche retirée");

                    // tâche retirée => on nettoie juste la recherche
                    if (!v) {
                      setTypeQuery("");
                      return;
                    }

                    // 2) runtime (métier centralisé)
                    const r = resolveTypeFromTacheProf(v);

                    // 3) appliquer le typeId
                    handleChange("typeId", r.typeId);

                    // 3bis) mettre à jour la catégorie tout de suite (évite le “lag” visuel)
                    const t = getTypeById(r.typeId);
                    if (t?.category) setMainCategory(normalizeMainCategory(t.category));

                    // 4) auto-comportements
                    if (r.auto?.forceOutputStyle) {
                      handleChange("outputStyle", r.auto.forceOutputStyle as any);
                    }

                    if (r.auto?.openEvalPanel) setShowEval(true);
                    if (r.auto?.hideMethodePanel) setShowMethode(false);

                    // 5) UX : recherche guidée (optionnel mais pratique)
                    if (r.label) setTypeQuery(r.label.replace("—", " ").trim());
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Choisir…</option>

                  {TACHES_PROF.map((t) => (
                    <option key={`${t.label}-${t.value}`} value={t.value} disabled={!!t.disabled}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <p className="text-[11px] text-gray-500">
                  En mode précis, la tâche guide la catégorie + la recherche de type.
                </p>

                {!!form.tacheProf && (
                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-xs font-semibold text-slate-800">
                      🎯 Catégorie déduite : {getMainCategoryMeta(mainCategory).emoji}{" "}
                      {getMainCategoryMeta(mainCategory).label}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Tu peux ensuite choisir le “type” précis dans la liste.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Durée + tonalité */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  Durée (minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.dureeMin}
                  onChange={(e) => handleChange("dureeMin", Math.max(0, Number(e.target.value || 0)))}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Ex : 45"
                />
                <p className="text-[11px] text-gray-500">Recommandé : 30 à 60 minutes.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Tonalité souhaitée</label>
                <select
                  value={form.tonalite}
                  onChange={(e) => handleChange("tonalite", e.target.value as Tonalite)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  {TONALITES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-500">{TONALITES.find((t) => t.id === form.tonalite)?.hint}</p>
              </div>
            </div>

            {/* Style Word */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Style de rendu</label>
              <div className="grid sm:grid-cols-4 gap-2">
                {[
                  { id: "simple", title: "Simple", desc: "Texte propre, sans design.", badge: "Rapide" },
                  { id: "word", title: "Word", desc: "Titres + icônes + aération.", badge: "Recommandé" },
                  { id: "word_expert", title: "Word Expert", desc: "Bannières + encadrés + zones réponses.", badge: "🔥 Best" },
                  { id: "slides", title: "Slides", desc: "Diaporama slide par slide.", badge: "Classe" },

                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleChange("outputStyle", o.id as OutputStyle)}
                    className={`text-left border rounded-xl px-3 py-2 text-xs transition ${
                      form.outputStyle === o.id ? "border-[#0047B6] bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-sky-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">{o.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{o.badge}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">{o.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ MODE RAPIDE : CATÉGORIE */}
            {mode === "rapide" && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Catégorie principale (ligne 1)
                </label>

                <div className="flex flex-wrap gap-2">
                  {MAIN_CATEGORIES.map((c) => {
                    const active = mainCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setMainCategory(c.id);
                          showToast("✅ Catégorie choisie");
                        }}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                          active ? "bg-[#0047B6] text-white border-[#0047B6]" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                        title={c.hint}
                      >
                        {c.emoji} {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Options ligne 2 */}
            <div className="pt-1 space-y-2">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Options (ligne 2)
              </label>

              <div className="flex flex-wrap gap-2 mt-1">
                <ToggleChip
                  label="Différenciation"
                  checked={form.optDifferenciation}
                  onChange={(v) => handleChange("optDifferenciation", v)}
                  hint="Base / Standard / Défi clairement séparés."
                  tone="emerald"
                  icon={<span>🎚️</span>}
                />
                <ToggleChip
                  label="Rituels (5–10 min)"
                  checked={form.optRituels}
                  onChange={(v) => handleChange("optRituels", v)}
                  hint="Mini-rituel d'entrée : question flash + correction rapide."
                  tone="sky"
                  icon={<span>⏱️</span>}
                />
                <ToggleChip
                  label="Compatible correction IA"
                  checked={form.optIAFriendly}
                  onChange={(v) => handleChange("optIAFriendly", v)}
                  hint="Document structuré (questions/réponses repérables)."
                  tone="sky"
                  icon={<span>🤖</span>}
                />
                <ToggleChip
                  label="Intégrer usage IA en classe"
                  checked={form.optAtelierIA}
                  onChange={(v) => handleChange("optAtelierIA", v)}
                  hint="Mini-parcours guidé d’usage de l’IA dans la ressource."
                  tone="violet"
                  icon={<span>🧪</span>}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[11px] text-slate-700">
                  <span className="font-semibold">
                    {mainCatMeta.emoji} {mainCatMeta.label}
                  </span>{" "}
                  + options :{" "}
                  <span className="font-semibold">
                    {[
                      form.optDifferenciation ? "Différenciation" : null,
                      form.optRituels ? "Rituels" : null,
                      form.optIAFriendly ? "Correction IA" : null,
                      form.optAtelierIA ? "Usage IA" : null,
                    ]
                      .filter(Boolean)
                      .join(" • ") || "aucune"}
                  </span>
                </p>
              </div>
            </div>

            {/* Recherche de type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Type (structure finale)</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={typeQuery}
                  onChange={(e) => setTypeQuery(e.target.value)}
                  placeholder="Rechercher un type (ex: barème, QCM, séance, fiche...)"
                  className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              {/* Liste des types */}
              <div className="grid gap-2 sm:grid-cols-2">
                {typesDisponibles.map((t) => {
                  const active = form.typeId === t.id;
                  const meta = getMainCategoryMeta(normalizeMainCategory(t.category));
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => selectType(t.id)}
                      className={`text-left border rounded-xl px-3 py-3 text-xs sm:text-[13px] transition ${
                        active ? "border-[#0047B6] bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-sky-200"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800">
                          {meta.emoji} {t.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">{t.description}</div>
                      </div>

                      {t.tags?.length ? (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {t.tags.map((tag) => {
                            const b = tagToBadge(tag);
                            const cls =
                              b.tone === "sky"
                                ? "bg-sky-100 text-sky-800"
                                : b.tone === "amber"
                                ? "bg-amber-100 text-amber-900"
                                : b.tone === "emerald"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-slate-100 text-slate-800";
                            return (
                              <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cls}`}>
                                {b.label}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs font-semibold text-slate-800">Type sélectionné : {selectedType?.label ?? "—"}</p>
                <p className="mt-1 text-[11px] text-slate-600">{selectedType?.description ?? "Choisis un type dans le catalogue."}</p>
              </div>
            </div>

            {/* MODE ÉVALUATION / MÉTHODE */}
            {estEval ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-gray-600">Modalité d’évaluation</label>
                  <button
                    type="button"
                    onClick={() => setShowEval((v) => !v)}
                    className="text-[11px] font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 inline-flex items-center gap-1"
                  >
                    {showEval ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showEval ? "Réduire" : "Modifier"}
                  </button>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <p className="text-xs font-semibold text-amber-900">{getEvalLabel(form.modaliteEvaluation)}</p>
                  <p className="mt-1 text-[11px] text-amber-800/80">{getEvalDesc(form.modaliteEvaluation)}</p>
                  <p className="mt-2 text-[11px] text-amber-900">
                    ✅ Le prompt générera : barème, critères, consignes, progressivité{form.optDifferenciation ? " + différenciation" : ""}.
                  </p>
                </div>

                {showEval && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {EVAL_OPTIONS.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => {
                          handleChange("modaliteEvaluation", e.id);
                          setShowEval(false);
                          showToast("✅ Modalité choisie");
                        }}
                        className={`text-left border rounded-xl px-3 py-2 text-xs sm:text-[13px] transition ${
                          form.modaliteEvaluation === e.id ? "border-amber-400 bg-amber-50 shadow-sm" : "border-slate-200 bg-white hover:border-amber-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800">{e.label}</div>
                        <div className="text-[11px] text-slate-600">{e.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-gray-600">Méthode pédagogique</label>
                  <div className="flex items-center gap-2">
                    <Link href="/blog" className="text-[11px] text-[#0047B6] underline underline-offset-2 hover:text-[#003894]">
                      En savoir plus
                    </Link>
                    <button
                      type="button"
                      onClick={() => setShowMethode((v) => !v)}
                      className="text-[11px] font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 inline-flex items-center gap-1"
                    >
                      {showMethode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {showMethode ? "Réduire" : "Modifier"}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-800">
                      Méthode : {getMethodeLabel(form.methode)}
                      {form.methode === "methode_active" ? " (par défaut)" : ""}
                    </p>
                    {form.methode === "methode_active" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">OK</span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">{getMethodeDesc(form.methode)}</p>
                </div>

                {showMethode && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {METHODES.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          handleChange("methode", m.id);
                          setShowMethode(false);
                          showToast("✅ Méthode choisie");
                        }}
                        className={`text-left border rounded-xl px-3 py-2 text-xs sm:text-[13px] transition ${
                          form.methode === m.id ? "border-[#0047B6] bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-sky-200"
                        }`}
                      >
                        <div className="font-semibold text-slate-800">{m.label}</div>
                        <div className="text-[11px] text-slate-600">{m.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Titre + auteur */}
            <div className="grid sm:grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Titre (pour toi)</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex : Éval fractions – barème + différenciation"
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
                placeholder="Ex : évaluer la comparaison de fractions + justification…"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[70px]"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Mots-clés (virgules)</label>
              <input
                type="text"
                value={rawTags}
                onChange={(e) => updateTags(e.target.value)}
                placeholder="Ex : #DYS, #différenciation, #barème"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {form.tags.length > 0 && (
                <p className="text-[11px] text-gray-500">
                  Pris en compte : <span className="font-semibold">{form.tags.join(", ")}</span>
                </p>
              )}
            </div>

            {/* Thèmes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Thèmes abordés</label>

              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((t) => {
                  const active = form.themes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        toggleTheme(t.id);
                        showToast(active ? "➖ Thème retiré" : `✅ Thème : ${t.label}`);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                        active ? "bg-[#0047B6] text-white border-[#0047B6]" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1 pt-1">
              <label className="text-xs font-medium text-slate-500">
                Recommandations pédagogiques (facultatif)
              </label>

                <input
                  type="text"
                  value={form.themesLabel}
                  onChange={(e) => handleChange("themesLabel", e.target.value)}
                  placeholder="Exemples : thème local, type de texte, projet de classe, lien avec l’actualité, besoins spécifiques des élèves…"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <p className="text-[11px] text-gray-500">Sert à contextualiser (exemples, vocabulaire, situations locales).</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-gray-600">Texte de ta demande (version prof)</label>
              <textarea
                value={form.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                placeholder={estEval ? "Ex : Fais une évaluation de 45 min… exos progressifs + barème sur 20…" : "Ex : Génère une séance clé en main…"}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 min-h-[120px]"
              />
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                <p className="text-xs font-semibold text-rose-800">⚠️ {formError}</p>
                {!validation.ok && (
                  <ul className="mt-2 text-[11px] text-rose-800/90 list-disc pl-4 space-y-1">
                    {validation.issues.slice(0, 6).map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* ✅ NEW : Mode de génération du prompt */}
    <div className="pt-2 space-y-2">
      <label className="text-xs font-semibold text-gray-600">Mode de génération du prompt</label>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => {
            setPromptMode("basic");
            showToast("✍️ Prompt : BASIC");
          }}
          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
            promptMode === "basic" ? "border-[#0047B6] bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          BASIC
          <div className="text-[11px] font-normal text-slate-600 mt-1">Très court</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setPromptMode("standard");
            showToast("✅ Prompt : STANDARD");
          }}
          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
            promptMode === "standard" ? "border-[#0047B6] bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          STANDARD ⭐
          <div className="text-[11px] font-normal text-slate-600 mt-1">Équilibré</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setPromptMode("expert");
            showToast("🧠 Prompt : EXPERT");
          }}
          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
            promptMode === "expert" ? "border-[#0047B6] bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          EXPERT
          <div className="text-[11px] font-normal text-slate-600 mt-1">Complet</div>
        </button>
      </div>

  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
    <p className="text-[11px] text-slate-700">
      <span className="font-semibold">Difficulté élèves</span> = exigence pour l’élève •{" "}
      <span className="font-semibold">Mode de génération</span> = quantité de contraintes dans le prompt
    </p>
  </div>
</div>


            {/* CTA */}
            <div className="pt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetPage}
                disabled={agentLoading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  agentLoading ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={creerPromptEtRessource}
                disabled={agentLoading || !validation.ok}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow transition ${
                  agentLoading || !validation.ok ? "bg-sky-100 text-sky-500 cursor-not-allowed" : "bg-[#0047B6] text-white hover:bg-[#003894]"
                }`}
                title={!validation.ok ? validation.issues[0] : "Générer prompt + ressource"}
              >
                <Sparkles className="w-4 h-4" />
                {agentLoading ? "Génération..." : "Créer prompt + ressource"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="space-y-4">
            <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <h2 className="text-lg font-bold text-amber-700 flex items-center gap-2">2️⃣ Conseils pour un meilleur résultat</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px] text-amber-500">➤</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3️⃣ PROMPT */}
            <div ref={promptRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">3️⃣ Prompt (à copier-coller)</h2>

                <div className="flex items-center gap-2">
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
                    onClick={() => setShowPromptInterne((v) => !v)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-300 hover:bg-slate-50"
                  >
                    {showPromptInterne ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPromptInterne ? "Masquer" : "Afficher"}
                  </button>

                  <button
                    type="button"
                    onClick={saveCurrentPreset}
                    disabled={!isAuthed || !promptInterne}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                      !isAuthed || !promptInterne ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                    title={!isAuthed ? "Connecte-toi pour enregistrer" : "Enregistrer (form + prompt + sortie)"}
                  >
                    <Bookmark className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </div>

              {showPromptInterne && (
                <textarea
                  readOnly
                  value={promptInterne}
                  className="w-full border rounded-lg px-3 py-2 text-[11px] font-mono bg-slate-50 min-h-[220px]"
                  placeholder="Le prompt apparaîtra ici après génération."
                />
              )}

              <PasteTargets text={promptInterne} showToast={showToast} />

              {!!promptInterne && (
                <button
                  type="button"
                  onClick={scrollToRessource}
                  className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 hover:text-slate-900"
                  title="Aller à la ressource"
                >
                  <ArrowDown className="w-4 h-4" />
                  Aller à la ressource
                </button>
              )}
            </div>

            {/* 4️⃣ RESSOURCE */}
            <div ref={ressourceRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0047B6]">4️⃣ Ressource générée</h2>

                <button
                  type="button"
                  onClick={copierRessource}
                  disabled={!agentOutput}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    agentOutput ? "bg-slate-800 text-white hover:bg-slate-900" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copiedRessource ? "Copié" : "Copier"}
                </button>
              </div>

              {agentError && <p className="text-xs text-red-600">⚠️ {agentError}</p>}

              <div className="eleveai-math border rounded p-3 min-h-[180px] bg-slate-50 text-sm whitespace-pre-wrap">
                {agentLoading ? "Réflexion en cours..." : agentOutput ? <MarkdownMath>{agentOutput}</MarkdownMath> : "La ressource apparaîtra ici."}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!promptInterne) {
                    showToast("⚠️ Génère d’abord le prompt.");
                    return;
                  }
                  showToast("💡 Donne un avis (étape 5) pour produire un Prompt 2.");
                  setTimeout(() => scrollToRelance(), 120);
                }}
                disabled={!promptInterne}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border transition ${
                  promptInterne ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-50" : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Améliorer / vérifier (Prompt 2)
              </button>
            </div>

            {/* 5️⃣ AVIS + RELANCE */}
            <div ref={relanceRef} className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#0047B6]">5️⃣ Avis + relance (Prompt 2)</h2>
                <p className="text-xs text-slate-600">
                  10 secondes : tu qualifies la qualité de la sortie, puis EleveAI fabrique une relance adaptée (V2, simplification, vérification).
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("ok");
                    showToast("✅ OK");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "ok" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                  disabled={!promptInterne}
                >
                  ✅ C’est bon
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("bof");
                    showToast("🤔 À clarifier");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "bof" ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                  disabled={!promptInterne}
                >
                  🤔 Moyen
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFeedbackChoice("pas_ok");
                    showToast("🧪 À vérifier");
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    feedbackChoice === "pas_ok" ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                  disabled={!promptInterne}
                >
                  ❌ Risqué
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Optionnel : une précision</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[70px] bg-white"
                  placeholder="Ex : je veux un barème plus clair / je veux 3 versions (base, standard, défi) / ça dépasse 45 min…"
                  disabled={!promptInterne}
                />
              </div>

              <button
                type="button"
                onClick={buildRelancePrompt}
                disabled={!promptInterne || !feedbackChoice}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  promptInterne && feedbackChoice ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
                }`}
              >
                🔁 Générer une relance adaptée (Prompt 2)
              </button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">🔁 Prompt 2 (relance)</p>
                    <p className="text-[11px] text-slate-600">À coller dans une IA pour améliorer / simplifier / vérifier la production.</p>
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
                  placeholder="Ton Prompt 2 apparaîtra ici après ton avis."
                />

                <PasteTargets text={promptRelance} showToast={showToast} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ✅ MODAL : Mes presets */}
      {showMyPresets && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-extrabold text-[#0047B6]">📚 Mes presets profs</h3>
                <p className="text-xs text-slate-600">Clique sur “Charger” pour retrouver ton formulaire + prompt + ressource.</p>
              </div>
              <button onClick={() => setShowMyPresets(false)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Fermer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {myPresetsLoading ? (
                <p className="text-sm text-slate-600">Chargement…</p>
              ) : myPresets.length === 0 ? (
                <p className="text-sm text-slate-600">
                  Aucun preset enregistré (scope profs). Clique sur <b>Enregistrer</b> après une génération.
                </p>
              ) : (
                <div className="space-y-2">
                  {myPresets.map((p) => (
                    <div key={p.id} className="border rounded-xl p-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{p.title || "Sans titre"}</div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          {p.classe || "—"} • {p.matiere || "—"} • <span className="font-mono">{fmtDate(p.created_at)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => applySavedPreset(p)}
                        className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0047B6] text-white text-xs font-semibold hover:bg-[#003894]"
                      >
                        <FolderOpen className="w-4 h-4" />
                        Charger
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <button onClick={() => setShowMyPresets(false)} className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-50">
                Fermer
              </button>
              <button
                onClick={loadMyPresets}
                disabled={myPresetsLoading}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${myPresetsLoading ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-50"}`}
              >
                Recharger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL : Historique */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-extrabold text-[#0047B6]">🕒 Historique des générations</h3>
                <p className="text-xs text-slate-600">Chaque clic “Créer” ajoute une ligne ici.</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Fermer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {historyLoading ? (
                <p className="text-sm text-slate-600">Chargement…</p>
              ) : runs.length === 0 ? (
                <p className="text-sm text-slate-600">Aucun run pour l’instant.</p>
              ) : (
                <div className="space-y-2">
                  {runs.map((r) => (
                    <div key={r.id} className="border rounded-xl p-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {r.classe || "—"} • {r.matiere || "—"}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          {r.preset_id ? (
                            <span>
                              Preset lié : <span className="font-mono">{r.preset_id}</span>
                            </span>
                          ) : (
                            <span>Preset non lié</span>
                          )}
                          {" • "}
                          <span className="font-mono">{fmtDate(r.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <button onClick={() => setShowHistory(false)} className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-50">
                Fermer
              </button>
              <button
                onClick={loadRunsHistory}
                disabled={historyLoading}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${historyLoading ? "bg-slate-100 text-slate-400" : "bg-white hover:bg-slate-50"}`}
              >
                Recharger
              </button>
            </div>
          </div>
        </div>
      )}

      <SignupNudge storageKey="eleveai_nudge_profs_v4" actionSignal={nudgeSignal} minActionCount={0} trigger="both" delayMs={5 * 60 * 1000} minInteractions={3} variant="bottom" />

      {/* ✅ TOAST */}
      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-lg">{toast}</div>}
    </main>
  );
}
