// lib/matrice/ressources.ts
//
// L'INVENTAIRE. C'est le cœur du produit, et le seul fichier du chantier
// qu'une machine ne peut pas écrire à la place d'un prof.
//
// ⚠️ LES STATUTS CI-DESSOUS SONT UNE PROPOSITION, PAS UNE VALIDATION.
// Ils ont été posés à partir des routes réellement présentes dans le dépôt et
// de ce qui a déjà tourné en classe. Frédéric doit les relire un par un :
// « validee » veut dire QU'IL l'a relue, « testee_eleves » qu'une classe l'a
// réellement utilisée. Tant qu'il ne l'a pas fait, une ressource ne devrait
// pas dépasser « a_verifier ».
//
// RÈGLE : seules `validee` et `testee_eleves` sortent du moteur. Une nouvelle
// ressource naît en `a_verifier` — donc invisible. C'est volontaire : on ne
// recommande jamais ce que personne n'a relu.

import type { RessourceEleveAI, StatutRessource } from "./types";

/** Le statut d'une ressource qu'on vient d'ajouter. Ne PAS le changer. */
export const STATUT_PAR_DEFAUT: StatutRessource = "a_verifier";

/** Les seuls statuts que le moteur accepte de recommander. */
export const STATUTS_PUBLIABLES: StatutRessource[] = ["validee", "testee_eleves"];

export const RESSOURCES: RessourceEleveAI[] = [
  // ── Le coach ───────────────────────────────────────────────────────────
  {
    id: "coach-maths",
    titre: "Le coach maths",
    promesse: "Une question à la fois, corrigée, avec l'explication quand tu te trompes.",
    url: "/coach-ia/maths",
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["*"],
    // « preparer » aussi : un élève qui a un contrôle vendredi vient s'entraîner
    // au coach — c'est même la première chose à lui proposer.
    intentions: ["comprendre", "entrainer", "corriger", "preparer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
    accepteNotion: "maths",
  },
  {
    id: "coach-francais",
    titre: "Le coach français",
    promesse: "Repérer l'erreur d'abord, corriger ensuite.",
    url: "/coach-ia/francais",
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"],
    matiere: "francais",
    notions: ["conjugaison", "grammaire", "orthographe", "lecture", "vocabulaire"],
    intentions: ["comprendre", "entrainer", "corriger", "preparer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
    accepteNotion: "francais",
  },
  {
    id: "coach-anglais",
    titre: "Le coach anglais",
    promesse: "Du A1 au B2, à ton rythme.",
    // ⚠️ /coach-ia/english-maths, pas /tutor-v4?matiere=anglais : sans classe,
    // le tutor retombe sur la 6e en maths (normalizeClasse a sa whitelist).
    // Le sommaire, lui, ouvre bien la bonne matière.
    url: "/coach-ia/english-maths",
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["comprendre", "entrainer"],
    statut: "validee",
  },
  {
    // Manquait à l'inventaire jusqu'au 06/08 : le bouton « Espagnol » n'ouvrait
    // que la dictée du jour, alors que le coach existe depuis des mois.
    id: "coach-espagnol",
    titre: "Le coach espagnol",
    promesse: "Du A1 au B2, à ton rythme.",
    url: "/coach-ia/espagnol",
    niveaux: ["5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["comprendre", "entrainer", "preparer"],
    statut: "validee",
  },
  {
    id: "coach-ia",
    titre: "Le coach IA",
    promesse: "Comprendre ce qu'est vraiment une intelligence artificielle.",
    url: "/coach-ia/ia",
    niveaux: ["4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["comprendre", "decouvrir"],
    statut: "validee",
  },
  {
    id: "parcours",
    titre: "Les parcours",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["entrainer", "preparer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  // Les parcours des AUTRES matières. Ils existaient tous en route, aucun
  // n'était dans l'inventaire : « Espagnol » n'ouvrait que la dictée du jour,
  // et le parcours restait invisible à qui ne connaissait pas son adresse.
  {
    id: "parcours-francais",
    titre: "Les parcours de français",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours-francais",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
    matiere: "francais",
    notions: ["conjugaison", "grammaire", "orthographe", "lecture", "vocabulaire"],
    intentions: ["entrainer", "preparer"],
    statut: "validee",
  },
  {
    id: "parcours-anglais",
    titre: "Les parcours d'anglais",
    promesse: "L'anglais et les maths dans la même série.",
    url: "/parcours-english-maths",
    niveaux: ["6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["entrainer", "preparer"],
    statut: "validee",
  },
  {
    id: "parcours-espagnol",
    titre: "Les parcours d'espagnol",
    promesse: "Une série guidée qui monte en difficulté, du début à la fin.",
    url: "/parcours-espagnol",
    niveaux: ["5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["entrainer", "preparer"],
    statut: "validee",
  },
  {
    id: "parcours-ia",
    titre: "Les parcours d'IA",
    promesse: "Comprendre l'intelligence artificielle en la pratiquant.",
    url: "/parcours-ia",
    niveaux: ["4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "ia",
    notions: ["ia"],
    intentions: ["entrainer", "decouvrir", "comprendre"],
    statut: "validee",
  },

  {
    // Manquait à l'inventaire (Frédéric, 06/08 : « si les élèves sont
    // connectés ils voient leurs notes »). Un élève qui demandait « où j'en
    // suis » ne trouvait rien, alors que la page existe et l'attend.
    // ⏳ À terme, l'enseignant y suivra les notes de coach et de parcours de
    // ses élèves, matière par matière — c'est le chantier du dashboard prof.
    id: "dashboard-eleve",
    titre: "Mes résultats",
    promesse: "Tes notes de coach et de parcours, matière par matière.",
    url: "/dashboard-eleve",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    notions: ["*"],
    intentions: ["suivre"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },

  // ── Les rituels ────────────────────────────────────────────────────────
  {
    id: "calcul-rapide",
    titre: "Le calcul rapide",
    promesse: "Quelques minutes, chrono, et on recommence demain.",
    url: "/calcul-rapide",
    niveaux: ["ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"],
    matiere: "maths",
    notions: ["calcul"],
    intentions: ["rituel", "entrainer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "dictee-du-jour",
    titre: "La dictée du jour",
    promesse: "Cinq mots dictés, chaque jour, avec la série qui monte.",
    url: "/dictee-du-jour",
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"],
    matiere: "francais",
    notions: ["orthographe"],
    intentions: ["rituel", "entrainer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "anglais-du-jour",
    titre: "L'anglais du jour",
    promesse: "Cinq mots par jour, entendus et écrits.",
    url: "/anglais-du-jour",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "anglais",
    notions: ["anglais"],
    intentions: ["rituel"],
    statut: "validee",
  },
  {
    id: "espagnol-du-jour",
    titre: "L'espagnol du jour",
    promesse: "Cinq mots par jour, entendus et écrits.",
    url: "/espagnol-du-jour",
    niveaux: ["5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "espagnol",
    notions: ["espagnol"],
    intentions: ["rituel"],
    statut: "validee",
  },
  {
    id: "defis-du-jour",
    titre: "Les défis du jour",
    promesse: "Un défi, des points, et on voit qui suit.",
    url: "/defis-du-jour",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
    notions: ["*"],
    intentions: ["decouvrir", "rituel"],
    statut: "validee",
  },

  // ── Préparer une échéance ──────────────────────────────────────────────
  {
    id: "eval-nat-6e-maths",
    titre: "Évaluation nationale 6e — maths",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/6e-maths",
    niveaux: ["6e", "cm2"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer"],
    statut: "validee",
  },
  {
    id: "eval-nat-6e-francais",
    titre: "Évaluation nationale 6e — français",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/6e-francais",
    niveaux: ["6e", "cm2"],
    matiere: "francais",
    notions: ["*"],
    intentions: ["preparer"],
    statut: "validee",
  },
  {
    id: "eval-nat-4e-maths",
    titre: "Évaluation nationale 4e — maths",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/4e-maths",
    niveaux: ["4e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer"],
    statut: "validee",
  },
  {
    id: "eval-nat-4e-francais",
    titre: "Évaluation nationale 4e — français",
    promesse: "Au rythme réel de l'épreuve : une minute par question.",
    url: "/evaluation-nationale-college/4e-francais",
    niveaux: ["4e"],
    matiere: "francais",
    notions: ["*"],
    intentions: ["preparer"],
    statut: "validee",
  },
  // Les guides de survie — un par niveau, à imprimer. Le dossier
  // app/guide-de-survie/ fait foi : ne pas inventer d'URL qui n'existe pas.
  ...([
    ["maths-cm1", "maths CM1", "cm1", "maths"],
    ["maths-cm2", "maths CM2", "cm2", "maths"],
    ["maths-sixieme", "maths 6e", "6e", "maths"],
    ["maths-cinquieme", "maths 5e", "5e", "maths"],
    ["maths-quatrieme", "maths 4e", "4e", "maths"],
    ["maths-troisieme", "maths 3e", "3e", "maths"],
    ["maths-seconde", "maths Seconde", "seconde", "maths"],
    ["maths-premiere", "maths Première", "premiere", "maths"],
    ["maths-terminale", "maths Terminale", "terminale", "maths"],
    ["francais-cm1", "français CM1", "cm1", "francais"],
    ["francais-cm2", "français CM2", "cm2", "francais"],
    ["francais-6e", "français 6e", "6e", "francais"],
    ["francais-5e", "français 5e", "5e", "francais"],
    ["francais-4e", "français 4e", "4e", "francais"],
    ["francais-3e", "français 3e", "3e", "francais"],
  ] as const).map(([slug, libelle, niveau, matiere]): RessourceEleveAI => ({
    id: `guide-${slug}`,
    titre: `Guide de survie — ${libelle}`,
    promesse: "Ce qu'il faut avoir en tête, ramassé sur une page à imprimer.",
    url: `/guide-de-survie/${slug}`,
    niveaux: [niveau],
    matiere,
    notions:
      matiere === "francais" ? ["conjugaison", "grammaire", "orthographe", "*"] : ["*"],
    intentions: ["preparer", "comprendre"],
    statut: "validee",
  })),
  ...([
    ["anglais-a1", "anglais A1", ["6e", "5e"]],
    ["anglais-a2", "anglais A2", ["4e", "3e"]],
    ["anglais-b1", "anglais B1", ["seconde", "premiere"]],
    ["anglais-b2", "anglais B2", ["premiere", "terminale"]],
  ] as const).map(([slug, libelle, niveaux]): RessourceEleveAI => ({
    id: `guide-${slug}`,
    titre: `Guide de survie — ${libelle}`,
    promesse: "Ce qu'il faut avoir en tête, ramassé sur une page à imprimer.",
    url: `/guide-de-survie/${slug}`,
    niveaux: [...niveaux],
    matiere: "anglais" as const,
    notions: ["anglais"],
    intentions: ["preparer", "comprendre"],
    statut: "validee",
  })),

  // Les cahiers de vacances — le dossier app/cahier-vacances/ fait foi.
  ...([
    ["vers-la-6e", "vers la 6e", ["cm2", "6e"]],
    ["vers-la-5e", "vers la 5e", ["6e", "5e"]],
    ["vers-la-4e", "vers la 4e", ["5e", "4e"]],
    ["vers-la-3e", "vers la 3e", ["4e", "3e"]],
    ["vers-la-2nde", "vers la Seconde", ["3e", "seconde"]],
    ["vers-la-premiere", "vers la Première", ["seconde", "premiere"]],
    ["vers-la-terminale", "vers la Terminale", ["premiere", "terminale"]],
    ["vers-le-bac-plus-1", "vers le Bac+1", ["terminale"]],
  ] as const).map(([slug, libelle, niveaux]): RessourceEleveAI => ({
    id: `cahier-${slug}`,
    titre: `Cahier de vacances — ${libelle}`,
    promesse: "À imprimer, avec les corrigés.",
    url: `/cahier-vacances/${slug}`,
    niveaux: [...niveaux],
    notions: ["*"],
    intentions: ["preparer", "entrainer"],
    statut: "validee",
  })),
  {
    id: "concours-avenir",
    titre: "Concours Avenir",
    promesse: "Dix épreuves blanches, sans jamais deux fois la même question.",
    url: "/concours-avenir",
    niveaux: ["terminale"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["preparer"],
    statut: "validee",
  },

  // ── Comprendre une notion ──────────────────────────────────────────────
  {
    id: "fiches-maths-6e",
    titre: "Fiches de cours — maths 6e",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/6e",
    niveaux: ["6e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    statut: "validee",
  },
  {
    id: "fiches-maths-3e",
    titre: "Fiches de cours — maths 3e",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/3e",
    niveaux: ["3e"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    statut: "validee",
  },
  {
    id: "fiches-maths-premiere",
    titre: "Fiches de cours — maths Première spé",
    promesse: "La notion expliquée court, avec un exemple.",
    url: "/fiches-cours/maths/premiere-spe",
    niveaux: ["premiere"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["comprendre"],
    statut: "validee",
  },
  {
    id: "dico",
    titre: "Le dico des mots et des gestes",
    promesse: "Le mot que tu n'as pas compris dans la consigne.",
    url: "/dico",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e"],
    notions: ["vocabulaire"],
    intentions: ["comprendre"],
    statut: "validee",
  },

  // ── Découvrir ──────────────────────────────────────────────────────────
  {
    id: "picto-maths",
    titre: "Picto maths — 974",
    promesse: "Vingt-cinq défis en images, sans une ligne à lire.",
    url: "/picto-maths",
    niveaux: ["cp", "ce1", "ce2", "cm1", "cm2"],
    matiere: "maths",
    notions: ["calcul", "geometrie", "grandeurs"],
    intentions: ["decouvrir", "entrainer"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "maths-974",
    titre: "Les maths en vrai — 974",
    promesse: "Là où les maths sortent dehors, sur l'île.",
    url: "/maths-974",
    // ⭐ « prof » AUSSI (Frédéric, 06/08) : c'est la ressource qu'un enseignant
    // cherche pour accrocher une séance au réel. Elle n'était proposée qu'aux
    // élèves — le premier public à qui elle sert était le seul à ne pas la voir.
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["decouvrir", "enseigner"],
    statut: "validee",
  },
  {
    // Les vidéos par notion sont encore peu nombreuses : plutôt que d'en
    // inventorier trois et de faire croire à une bibliothèque, on renvoie à la
    // chaîne. Le jour où il y en aura assez, elles entreront une par une.
    id: "chaine-youtube",
    titre: "Les vidéos d'EleveAI",
    promesse: "Les maths de l'île en images, sur la chaîne.",
    url: "https://www.youtube.com/@eleveai974",
    externe: true,
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof", "parent"],
    matiere: "maths",
    notions: ["videos", "*"],
    intentions: ["decouvrir", "comprendre"],
    statut: "validee",
  },
  {
    id: "carte-974",
    titre: "La carte des maths de l'île",
    promesse: "Chaque endroit de l'île a son calcul.",
    url: "/carte",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: ["*"],
    intentions: ["decouvrir", "enseigner"],
    statut: "validee",
  },

  // ── Les machines ───────────────────────────────────────────────────────
  // Elles ne sortent QUE si on demande à découvrir, expérimenter ou
  // comprendre en profondeur. Depuis l'accueil-catalogue, elles ne servaient
  // presque jamais : ce n'était pas leur qualité qui manquait, c'était le
  // moment. Un prof qui prépare une séance en est le meilleur client.
  ...([
    ["lagon", "Le lagon de l'Ermitage", "Le lagon en chiffres, entre tes mains.", ["proportionnalite", "statistiques", "grandeurs"]],
    ["cyclone", "Le simulateur de cyclone", "Un cyclone, et ce qu'il faut savoir compter avant.", ["proportionnalite", "statistiques", "grandeurs"]],
    ["volcan", "La machine de la Fournaise", "Le volcan en chiffres, à faire varier soi-même.", ["proportionnalite", "grandeurs", "statistiques"]],
    ["barrage", "Le barrage", "L'eau qu'on retient, et ce qu'elle produit.", ["proportionnalite", "grandeurs", "fonctions"]],
    ["energie", "L'énergie de l'effort", "Ce que ton corps dépense, en vrai.", ["proportionnalite", "grandeurs", "fonctions"]],
    ["sucre", "Le sucre de la canne", "De la canne au sucre, en proportions.", ["proportionnalite", "grandeurs"]],
    ["fromage", "La fromagerie", "Du lait au fromage, tout est affaire de rapport.", ["proportionnalite", "grandeurs"]],
    ["epsilon", "La machine des epsilons", "Des epsilons qui finissent par engendrer des infinis.", ["suites", "fonctions"]],
  ] as const).map(([slug, titre, promesse, notions]): RessourceEleveAI => ({
    id: `simulateur-${slug}`,
    titre,
    promesse,
    url: `/simulateur-${slug}`,
    niveaux: ["cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale", "prof"],
    matiere: "maths",
    notions: [...notions, "machines"],
    intentions: ["decouvrir", "comprendre", "enseigner"],
    statut: "validee",
  })),
  {
    id: "loi-performance",
    titre: "La loi de la performance",
    promesse: "Un neurone qui décide, expliqué du CP à la Terminale.",
    url: "/loi-performance",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["fonctions", "statistiques", "ia"],
    intentions: ["decouvrir", "comprendre"],
    statut: "validee",
  },
  {
    id: "bulles",
    titre: "Pourquoi les bulles sont rondes",
    promesse: "Une question d'enfant, une réponse de mathématicienne.",
    url: "/pourquoi-les-bulles-sont-rondes",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    matiere: "maths",
    notions: ["geometrie", "grandeurs"],
    intentions: ["decouvrir"],
    statut: "validee",
  },
  {
    id: "explorer",
    titre: "Explorer",
    promesse: "Tout ce qu'il y a à voir, quand tu ne sais pas quoi chercher.",
    url: "/explorer",
    niveaux: ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"],
    notions: ["*"],
    intentions: ["decouvrir"],
    statut: "validee",
  },

  // ── Les adultes ────────────────────────────────────────────────────────
  {
    id: "espace-parents",
    titre: "L'espace parents",
    promesse: "Ce que fait votre enfant, et comment l'accompagner.",
    url: "/espace-parents",
    niveaux: ["parent"],
    notions: ["*"],
    intentions: ["suivre", "comprendre"],
    statut: "validee",
  },
  {
    id: "cahier-aider",
    titre: "Aider mon enfant",
    promesse: "Des activités à faire ensemble, sans être prof.",
    url: "/cahier-vacances/aider-mon-enfant",
    niveaux: ["parent"],
    notions: ["*"],
    intentions: ["comprendre", "entrainer"],
    statut: "validee",
  },
  {
    id: "dashboard-prof",
    titre: "Le tableau de bord de la classe",
    promesse: "Qui a travaillé, sur quoi, et où ça coince.",
    url: "/dashboard-prof",
    niveaux: ["prof"],
    notions: ["*"],
    // « suivre » SEULEMENT (06/08). Avec « enseigner », il sortait en tête sur
    // « une activité pour ma classe » — un prof qui prépare sa séance ne
    // demande pas son tableau de bord. Il le demandera en disant « où en sont
    // mes élèves », et là il sera premier.
    // ⏳ Le chantier du dashboard prof est en cours ; il y suivra les notes de
    // coach et de parcours, matière par matière.
    intentions: ["suivre"],
    statut: "testee_eleves",
    testeeAvec: "Collège du Dimitile",
  },
  {
    id: "programme-seo",
    titre: "Les programmes, classe par classe",
    promesse: "Ce qui est au programme, et ce qu'on a pour l'entraîner.",
    url: "/programme/6e",
    niveaux: ["prof", "parent"],
    notions: ["*"],
    intentions: ["enseigner", "comprendre"],
    statut: "validee",
  },
  {
    // ⚠️ /enseignants, PAS /espace-profs (Frédéric, 06/08). Les deux routes
    // existent — c'est /enseignants que le header pointe et que les profs
    // connaissent. L'autre reste en ligne, elle n'est simplement plus ce que
    // la matrice propose.
    id: "espace-enseignants",
    titre: "L'espace enseignant",
    promesse: "Le suivi élève par élève, et les ressources à donner.",
    url: "/enseignants",
    niveaux: ["prof"],
    notions: ["*"],
    intentions: ["enseigner", "suivre", "comprendre"],
    statut: "validee",
  },
  // ⚠️ L'ORDRE COMPTE POUR LA DIRECTION : à score égal, le moteur garde l'ordre
  // de ce fichier. L'espace établissement passe donc devant le tableau de bord
  // (Frédéric, 05/08) — un chef d'établissement qui arrive veut d'abord savoir
  // ce que c'est, comment ça se déploie et ce que ça coûte ; le suivi vient
  // après, quand ses classes sont inscrites.
  {
    id: "espace-ecoles",
    titre: "L'espace établissement",
    promesse: "Financement, RGPD, déploiement : tout ce qu'il faut avant de dire oui.",
    url: "/espace-ecoles",
    niveaux: ["direction"],
    notions: ["*"],
    intentions: ["suivre", "enseigner", "comprendre"],
    statut: "validee",
  },
  {
    // Ce qui l'intéresse vraiment (Frédéric, 03/08) : il est jugé là-dessus.
    id: "eval-nationales-hub",
    titre: "Les évaluations nationales",
    promesse: "Ce sur quoi l'établissement est attendu, et de quoi s'y préparer.",
    url: "/evaluation-nationale-college",
    niveaux: ["direction", "prof", "parent"],
    notions: ["*"],
    intentions: ["preparer", "suivre", "enseigner", "comprendre"],
    statut: "validee",
  },
  {
    id: "dashboard-principal",
    titre: "Le tableau de bord de l'établissement",
    promesse: "L'activité de l'établissement, en un écran.",
    url: "/dashboard-principal",
    niveaux: ["direction"],
    notions: ["*"],
    intentions: ["suivre"],
    statut: "validee",
  },
];
