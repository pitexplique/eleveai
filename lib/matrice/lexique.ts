// lib/matrice/lexique.ts
//
// Ce que la machine sait lire dans une phrase écrite à la main.
//
// Deux tables, et deux seulement :
//   — les MARQUEURS d'intention : la FAÇON de dire (« j'ai pas compris »,
//     « contrôle demain »). C'est la façon, pas le sujet.
//   — les NOTIONS et leurs ALIAS : le sujet, dit avec les mots des élèves
//     (« les x » pour les équations, « les moins et les plus » pour les
//     relatifs). C'est ici que se joue la qualité, et ça s'écrit à la main.
//
// Les deux tables sont faites pour être relues et corrigées par un prof.
// Ajouter un alias vaut mieux que compliquer l'algorithme.

import type { Intention } from "./types";

/**
 * Marqueurs d'intention. L'ordre compte : le premier qui accroche gagne.
 * « Contrôle demain, j'ai pas compris » doit partir en « préparer », pas en
 * « comprendre » — l'échéance prime.
 */
export const MARQUEURS_INTENTION: { intention: Intention; marqueurs: string[] }[] = [
  {
    // En premier, avant tout le reste : quelqu'un qui cherche UNE PERSONNE ne
    // cherche pas une ressource, et lui servir un cahier serait à côté.
    // Marqueurs venus d'une vraie demande (une mère, en bivouac, 04/08/2026 :
    // « je cherche un prof de soutien scolaire pour ma fille »).
    intention: "humain",
    marqueurs: [
      "prof de soutien", "soutien scolaire", "cours particuliers", "cours particulier",
      "prof particulier", "professeur particulier", "un prof pour", "quelqu'un pour aider",
      "quelqu un pour aider", "un coach", "coach pour", "prendre des cours",
      "visio", "en direct", "rendez vous", "rencontrer un prof", "parler a un prof",
    ],
  },
  {
    intention: "preparer",
    marqueurs: [
      "controle", "evaluation", "interro", "devoir surveille", "ds ", "demain",
      "la semaine prochaine", "brevet", "bac", "examen", "concours",
      "evaluation nationale", "preparer", "reviser", "revision", "revise",
    ],
  },
  {
    intention: "corriger",
    marqueurs: [
      "corrige", "corriger", "correction", "mon erreur", "mes erreurs",
      "je me trompe", "faux", "j'ai rate", "j ai rate", "verifie", "verifier",
      "ou est mon erreur", "pourquoi c'est faux",
    ],
  },
  {
    intention: "comprendre",
    marqueurs: [
      "pas compris", "rien compris", "compris rien", "comprends pas", "comprend pas",
      "je comprends rien", "c'est quoi", "cest quoi", "qu'est ce que",
      "explique", "expliquer", "comprendre", "j'y arrive pas", "jy arrive pas",
      "j'arrive pas", "je bloque", "difficile", "j'ai du mal", "aide moi",
      "comment on fait", "a quoi ca sert",
    ],
  },
  {
    intention: "rituel",
    marqueurs: [
      "cinq minutes", "5 minutes", "10 minutes", "rapidement", "vite fait",
      "un mot", "chaque jour", "tous les jours", "le matin", "court",
      "continuer", "reprendre", "la suite",
    ],
  },
  {
    intention: "entrainer",
    marqueurs: [
      "exercice", "exercices", "entrainer", "entrainement", "m'entrainer",
      "mentrainer", "travailler", "s'entrainer", "refaire", "pratiquer",
      "faire des maths", "des questions", "quiz", "defi", "challenge",
    ],
  },
  {
    intention: "decouvrir",
    marqueurs: [
      "decouvrir", "decouverte", "original", "curieux", "curiosite", "etonnant",
      "surprends moi", "surprend moi", "quelque chose", "je sais pas quoi",
      "au hasard", "amusant", "rigolo", "interessant",
    ],
  },
  {
    intention: "suivre",
    marqueurs: [
      "progression", "progres", "resultats", "ou en est", "ou il en est",
      "ou elle en est", "suivi", "bilan", "activite", "statistiques",
      "difficultes", "tableau de bord", "classe",
    ],
  },
  {
    intention: "enseigner",
    marqueurs: [
      "mes eleves", "ma classe", "une activite", "une seance", "differencier",
      "differenciation", "remediation", "evaluer", "preparer un cours",
      "support", "photocopie", "imprimer", "projeter",
    ],
  },
];

export type NotionLexique = {
  id: string;
  label: string;
  matiere: "maths" | "francais" | "anglais" | "espagnol" | "ia" | "transversal";
  /** Écrits SANS accent et en minuscules — la normalisation les retire aussi. */
  alias: string[];
};

/**
 * Les notions reconnues. On commence petit et juste : mieux vaut vingt notions
 * qui tombent bien que cent qui se marchent dessus. Les mots d'élèves sont
 * en alias, pas les intitulés du programme.
 */
export const NOTIONS: NotionLexique[] = [
  {
    id: "fractions", label: "les fractions", matiere: "maths",
    alias: ["fraction", "fractions", "fracsion", "fracssion", "demi", "demis", "tiers", "quart", "quarts", "numerateur", "denominateur", "partage", "partager en parts"],
  },
  {
    id: "nombres-decimaux", label: "les nombres décimaux", matiere: "maths",
    alias: ["decimal", "decimaux", "virgule", "dixieme", "centieme", "nombre a virgule"],
  },
  {
    id: "calcul", label: "le calcul", matiere: "maths",
    alias: ["calcul", "calculs", "calculer", "addition", "additionner", "soustraction", "soustraire", "multiplication", "multiplier", "division", "diviser", "table", "tables", "tables de multiplication", "poser une operation", "compter"],
  },
  {
    id: "relatifs", label: "les nombres relatifs", matiere: "maths",
    alias: ["relatif", "relatifs", "negatif", "negatifs", "les moins et les plus", "moins moins", "nombre negatif"],
  },
  {
    id: "proportionnalite", label: "la proportionnalité", matiere: "maths",
    alias: ["proportionnalite", "proportionnel", "pourcentage", "pourcentages", "echelle", "produit en croix", "regle de trois", "vitesse"],
  },
  {
    id: "equations", label: "les équations", matiere: "maths",
    alias: ["equation", "equations", "les x", "inconnue", "resoudre", "inequation", "developper", "factoriser", "identite remarquable", "litteral"],
  },
  {
    id: "fonctions", label: "les fonctions", matiere: "maths",
    alias: ["fonction", "fonctions", "image", "antecedent", "courbe", "representation graphique", "affine", "lineaire", "parabole", "second degre", "polynome"],
  },
  {
    id: "derivees", label: "les dérivées", matiere: "maths",
    alias: ["derive", "derivee", "derivees", "deriver", "nombre derive", "tangente", "variation", "sens de variation", "taux d'accroissement"],
  },
  {
    id: "suites", label: "les suites", matiere: "maths",
    alias: ["suite", "suites", "arithmetique", "geometrique", "raison", "terme general", "recurrence"],
  },
  {
    id: "exponentielle", label: "l'exponentielle et le logarithme", matiere: "maths",
    alias: ["exponentielle", "exp", "logarithme", "ln", "log", "croissance exponentielle"],
  },
  {
    id: "probabilites", label: "les probabilités", matiere: "maths",
    alias: ["probabilite", "probabilites", "proba", "hasard", "chance", "arbre", "tirage", "des", "aleatoire"],
  },
  {
    id: "statistiques", label: "les statistiques", matiere: "maths",
    alias: ["statistique", "statistiques", "moyenne", "mediane", "etendue", "diagramme", "graphique", "histogramme"],
  },
  {
    id: "geometrie", label: "la géométrie", matiere: "maths",
    alias: ["geometrie", "figure", "triangle", "carre", "rectangle", "cercle", "angle", "angles", "symetrie", "pythagore", "thales", "trigonometrie", "cosinus", "sinus"],
  },
  {
    id: "grandeurs", label: "les longueurs, aires et volumes", matiere: "maths",
    alias: ["perimetre", "aire", "aires", "volume", "volumes", "longueur", "conversion", "unite", "unites", "masse", "duree", "heure", "minutes"],
  },
  {
    id: "problemes", label: "les problèmes", matiere: "maths",
    alias: ["probleme", "problemes", "enonce", "resoudre un probleme", "situation"],
  },
  {
    id: "conjugaison", label: "la conjugaison", matiere: "francais",
    alias: ["conjugaison", "conjuguer", "verbe", "verbes", "present", "imparfait", "passe compose", "futur", "passe simple", "terminaison", "participe passe"],
  },
  {
    id: "grammaire", label: "la grammaire", matiere: "francais",
    alias: ["grammaire", "sujet", "complement", "cod", "coi", "nature des mots", "fonction", "phrase", "proposition", "adjectif", "nom commun", "pronom"],
  },
  {
    id: "orthographe", label: "l'orthographe", matiere: "francais",
    alias: ["orthographe", "ortographe", "accord", "accords", "dictee", "dicte", "mots", "ecrire les mots", "homophone", "a ou a", "et ou est", "son ou sont"],
  },
  {
    id: "lecture", label: "la lecture et la compréhension", matiere: "francais",
    alias: ["lecture", "lire", "comprehension", "comprendre un texte", "texte", "histoire", "livre", "voix haute", "fluence"],
  },
  {
    id: "vocabulaire", label: "le vocabulaire", matiere: "francais",
    alias: ["vocabulaire", "mot", "synonyme", "famille de mots", "definition", "sens du mot"],
  },
  {
    id: "anglais", label: "l'anglais", matiere: "anglais",
    alias: ["anglais", "english", "vocabulaire anglais", "irregular", "verbes irreguliers", "present perfect", "prononciation anglaise"],
  },
  {
    id: "espagnol", label: "l'espagnol", matiere: "espagnol",
    alias: ["espagnol", "espanol", "vocabulaire espagnol", "ser estar"],
  },
  {
    id: "ia", label: "l'intelligence artificielle", matiere: "ia",
    alias: ["intelligence artificielle", "ia", "chatgpt", "prompt", "algorithme", "reseau de neurones", "pix"],
  },
];
