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
    // ⭐ APRÈS « preparer », ET C'EST VOLONTAIRE (07/08). « Évaluation » et
    // « contrôle » disent une ÉCHÉANCE : ils doivent rester sur « préparer ».
    // Ici on ne garde que ce qui dit « je veux savoir où j'en suis », sans
    // date derrière. Le premier bloc qui accroche gagne — celui-ci passe donc
    // en second, et il n'attrape que ce que l'autre a laissé.
    intention: "tester",
    marqueurs: [
      "teste moi", "teste-moi", "me tester", "je veux me tester", "tester mon niveau",
      "test de niveau", "faire le point", "ou j'en suis", "ou j en suis",
      "mon niveau", "quel niveau", "bilan", "diagnostic", "evaluer mon niveau",
      "savoir si j'ai compris", "savoir si j ai compris", "verifier mon niveau",
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
      // « arrive pas » sans le pronom : attrape « je n'arrive pas », « narrive
      // pas », « j'arrive pas » d'un coup, apostrophe ou pas.
      "arrive pas", "arrive plus", "je bloque", "difficile", "j'ai du mal", "aide moi",
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
      // LES FORMATS (06/08). Personne ne trouvait les machines en tapant
      // « simulation », ni les vidéos en tapant « vidéo » : ces mots ne sont
      // ni des notions ni des matières, ils n'accrochaient donc rien. Ils
      // disent une envie — voir, manipuler — et c'est bien « découvrir ».
      // ⚠️ « projeter » reste à « enseigner » : c'est le geste d'un prof
      // devant sa classe, pas celui d'un élève curieux.
      "simulateur", "simulation", "machine", "manipuler", "experimenter",
      "video", "videos", "en video", "regarder", "animation", "en images",
    ],
  },
  {
    intention: "suivre",
    marqueurs: [
      "progression", "progres", "resultats", "ou en est", "ou il en est",
      "ou elle en est", "ou en sont", "ou ils en sont", "ou elles en sont",
      "suivi", "bilan", "statistiques",
      "difficultes", "tableau de bord",
      // Les formes que l'élève emploie pour lui-même. « où j'en suis » ne
      // s'attrapait pas par « où en est » : « suis » et « est » sont trop
      // courts pour la tolérance aux fautes, et c'est très bien ainsi.
      "ou j en suis", "ou jen suis", "mes notes", "mes points", "mes resultats",
      "ma progression", "mon niveau",
      // ⛔ « classe » et « activite » RETIRÉS le 06/08. Ils faisaient lire
      // « suivre » dans « une activité pour ma classe » — qui est un
      // professeur voulant ENSEIGNER, pas consulter des progrès. Deux mots
      // trop larges pour être des marqueurs : ils vivent dans presque toutes
      // les phrases d'un prof. Les formes explicites restent (« suivi »,
      // « où en est », « tableau de bord »).
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

  // ── LES FORMATS, avant les matières ─────────────────────────────────────
  // « Simulation » et « vidéo » sont AUSSI des marqueurs de l'intention
  // « découvrir » — mais l'intention seule ne suffisait pas : toutes les
  // ressources de découverte se retrouvaient à égalité, et l'ordre du fichier
  // décidait. Quelqu'un qui demande une simulation recevait la carte de l'île.
  // En les déclarant ici, le mot désigne la ressource, et pas seulement l'envie.
  {
    id: "machines", label: "les machines à manipuler", matiere: "maths",
    alias: ["simulateur", "simulateurs", "simulation", "simulations", "machine", "machines", "manipuler", "experimenter"],
  },
  {
    id: "videos", label: "les vidéos", matiere: "transversal",
    alias: ["video", "videos", "en video", "animation", "animations", "regarder", "en images"],
  },
  {
    // ⭐ AJOUTÉE LE 07/08. Taper « guide de survie » renvoyait l'évaluation
    // nationale : aucun mot n'était reconnu, le moteur repliait sur le niveau,
    // et le coup de pouce de rentrée faisait le reste. On demandait un guide,
    // on recevait une épreuve — le pire des deux mondes, parce que la réponse
    // avait l'air assurée.
    // ⚠️ « survie » et « imprimer » sont dans les alias : c'est comme ça qu'on
    // les nomme entre profs et en classe, pas « guide de révision ».
    id: "guides", label: "les guides de survie", matiere: "transversal",
    alias: [
      "guide", "guides", "guide de survie", "guides de survie", "survie",
      "kit de survie", "fiche de survie", "memo", "l'essentiel", "lessentiel",
      "a imprimer", "imprimer", "antiseche", "anti seche",
    ],
  },
  {
    // Même trou, même correction : « cahier de vacances » ne trouvait rien.
    // ⚠️ C'est pourtant ce qui amène le plus de monde sur le site — Google et
    // Bing envoient l'essentiel du trafic sur ces pages. Les gens arrivaient
    // par les cahiers et ne pouvaient pas les redemander par leur nom.
    id: "cahiers", label: "les cahiers de vacances", matiere: "transversal",
    alias: [
      "cahier", "cahiers", "cahier de vacances", "cahiers de vacances",
      "cahier vacances", "vacances", "cahier d'ete", "cahier ete", "l'ete",
    ],
  },
  {
    // ⭐ AJOUTÉE LE 08/08 (Frédéric : « picto maths qui concerne le collège
    // n'apparaît pas dans ressources, ça servira aux profs surtout »).
    //
    // Les défis Picto existent en deux versions — CP→CM2 et CM2→3e — et le
    // nom « picto » n'était écrit nulle part dans ce que la machine sait lire.
    // Un prof qui les a vus au primaire et les redemande par leur nom pour sa
    // classe de 5e ne trouvait donc que la version des petits.
    id: "picto", label: "les défis en images", matiere: "maths",
    alias: [
      "picto", "picto maths", "pictomaths", "defis en images", "defi en image",
      "un dessin une question", "dessin question", "sans lire", "sans texte",
    ],
  },
  {
    // ⭐ AJOUTÉE LE 07/08 (Frédéric : « si on tape concours général sur la
    // barre de recherche il doit envoyer sur ce répertoire », « idem si on
    // tape concours avenir »).
    //
    // ⚠️ « concours » était DÉJÀ un marqueur d'intention (« preparer ») : taper
    // « concours avenir » se lisait donc « quelqu'un prépare une échéance » et
    // sortait le cahier de vacances. L'intention était juste, le sujet passait
    // à la trappe — et c'est le sujet qu'on avait nommé. Il fallait la notion
    // en plus du marqueur, pas à la place.
    //
    // ⚠️ Les alias en DEUX MOTS d'abord n'auraient servi à rien : `lireNotion`
    // rend la première notion qui accroche, et chaque alias est testé mot à
    // mot dans l'ordre de la phrase. « concours » seul suffit à accrocher les
    // deux ; ce sont les NIVEAUX des ressources qui départagent ensuite —
    // Avenir en Terminale, le général au collège.
    id: "concours", label: "les concours", matiere: "maths",
    alias: [
      "concours", "concours general", "concours generale", "concour general",
      "concours avenir", "concour avenir", "avenir",
      "olympiade", "olympiades", "olympiades junior",
    ],
  },

  // ── LES MATIÈRES, EN DERNIER ────────────────────────────────────────────
  // ⚠️ L'ORDRE EST LE MÉCANISME : lireNotion() rend la PREMIÈRE notion qui
  // accroche. « les fractions en maths » doit donner les fractions, pas
  // « les maths » — d'où ces deux entrées tout en bas, filet de sécurité pour
  // qui écrit juste sa matière.
  //
  // Trou constaté le 06/08 : « anglais » et « espagnol » étaient reconnus
  // (ce sont des notions), « maths » et « français » ne l'étaient pas. Taper
  // « maths » tombait sur « je n'ai pas bien compris » avec seize notions de
  // maths dans le lexique. C'était une asymétrie, pas un choix.
  {
    id: "maths", label: "les mathématiques", matiere: "maths",
    alias: ["maths", "math", "mathematiques", "mathematique", "calculs"],
  },
  {
    id: "francais", label: "le français", matiere: "francais",
    alias: ["francais", "francai", "langue francaise"],
  },
];
