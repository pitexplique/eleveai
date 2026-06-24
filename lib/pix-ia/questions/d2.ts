import type { PixQuestion } from "../questionTypes";

// Domaine 2 — Usages et applications de l'IA. Paliers novice/indépendant.
export const d2Questions: PixQuestion[] = [
  // 2.1 Familles de tâches
  {
    microskillId: "2.1.1",
    text: "Lequel de ces usages repose sur de l'intelligence artificielle ?",
    choices: [
      "la reconnaissance de ton visage pour déverrouiller un téléphone",
      "appuyer sur l'interrupteur de la lumière",
      "ouvrir une porte avec une clé",
      "écrire avec un stylo",
    ],
  },
  {
    microskillId: "2.1.1",
    text: "Quand ton clavier propose le mot suivant pendant que tu écris un SMS, il utilise :",
    choices: [
      "de l'intelligence artificielle (prédiction de texte)",
      "rien de particulier",
      "un humain qui lit ton SMS en direct",
      "une simple ampoule",
    ],
  },
  {
    microskillId: "2.1.2",
    text: "La reconnaissance d'images sert à :",
    choices: [
      "analyser une image pour y reconnaître des objets, visages ou scènes",
      "augmenter le volume du son",
      "recharger la batterie",
      "imprimer une feuille",
    ],
  },
  {
    microskillId: "2.1.2",
    text: "Transformer la parole en texte écrit est une tâche de :",
    choices: [
      "reconnaissance de sons (reconnaissance vocale)",
      "génération d'images",
      "calcul de moyennes",
      "compression de fichiers",
    ],
  },
  {
    microskillId: "2.1.3",
    text: "Reconnaissance, prédiction, recommandation, génération de contenu sont :",
    choices: [
      "des familles de tâches que l'IA peut réaliser",
      "des marques de téléphones",
      "des langues parlées",
      "des types de batteries",
    ],
  },
  {
    microskillId: "2.1.4",
    text: "Dans un réseau social, l'ordre des publications que tu vois est surtout décidé par :",
    choices: [
      "un algorithme d'IA (recommandation)",
      "l'ordre alphabétique",
      "le pur hasard",
      "ton professeur",
    ],
  },

  // 2.2 Utiliser une IA générative
  {
    microskillId: "2.2.1",
    text: "Une bonne requête (prompt) pour une IA générative :",
    choices: [
      "est précise et donne le contexte et l'objectif",
      "est la plus courte possible",
      "est écrite tout en majuscules",
      "répète dix fois la même question",
    ],
  },
  {
    microskillId: "2.2.1",
    text: "Quel prompt est le meilleur pour préparer un exposé ?",
    choices: [
      "« Rédige un plan en 3 parties sur les volcans, pour un exposé de 6e »",
      "« volcan »",
      "« fais un truc »",
      "« réponds vite »",
    ],
  },
  {
    microskillId: "2.2.2",
    text: "Si la réponse de l'IA ne te convient pas, le mieux est de :",
    choices: [
      "reformuler ou préciser ta demande pour l'affiner",
      "abandonner tout de suite",
      "recopier la réponse sans la lire",
      "éteindre l'ordinateur",
    ],
  },
  {
    microskillId: "2.2.3",
    text: "Parmi ces tâches, laquelle peux-tu demander à une IA générative ?",
    choices: [
      "résumer, traduire ou reformuler un texte",
      "te faire un câlin",
      "recharger ton téléphone",
      "laver ton linge",
    ],
  },
  {
    microskillId: "2.2.4",
    text: "Après avoir reçu une réponse d'une IA, le bon réflexe est de :",
    choices: [
      "vérifier l'information, surtout si elle est importante",
      "la croire toujours, sans vérifier",
      "la partager immédiatement",
      "l'effacer sans la lire",
    ],
  },

  // 2.3 Évaluer l'information
  {
    microskillId: "2.3.1",
    text: "Devant une fausse vidéo très partagée, se demander « qui l'a publiée et pourquoi ? » sert à :",
    choices: [
      "comprendre l'intention de l'auteur et juger de sa fiabilité",
      "rien du tout",
      "accélérer ton téléphone",
      "gagner des abonnés",
    ],
  },
  {
    microskillId: "2.3.2",
    text: "Une image porte la mention « générée par IA ». Cela veut dire :",
    choices: [
      "qu'elle a été créée avec une IA, et n'est donc pas forcément réelle",
      "qu'elle est forcément vraie",
      "qu'elle est interdite",
      "qu'elle a gagné un prix",
    ],
  },
  {
    microskillId: "2.3.3",
    text: "Pour vérifier une information trouvée en ligne, une étape utile est de :",
    choices: [
      "retrouver qui en est l'auteur et s'il est fiable",
      "regarder seulement le nombre de « j'aime »",
      "la croire si elle est en couleur",
      "vérifier la taille du texte",
    ],
  },
  {
    microskillId: "2.3.4",
    text: "Quelle différence entre une IA générative et un moteur de recherche ?",
    choices: [
      "l'IA générative fabrique une réponse ; le moteur liste des pages existantes à vérifier",
      "il n'y a aucune différence",
      "le moteur de recherche invente tout",
      "l'IA générative ne se trompe jamais",
    ],
  },

  // 2.4 Services de recommandation
  {
    microskillId: "2.4.1",
    text: "Lequel de ces services repose sur la recommandation ?",
    choices: [
      "une appli qui te suggère des musiques selon tes écoutes",
      "une calculatrice",
      "un thermomètre",
      "une règle graduée",
    ],
  },
  {
    microskillId: "2.4.2",
    text: "Un avantage de la personnalisation des contenus est :",
    choices: [
      "gagner du temps en trouvant plus vite ce qui t'intéresse",
      "voir uniquement des publicités",
      "perdre ton mot de passe",
      "ralentir Internet",
    ],
  },
  {
    microskillId: "2.4.2",
    text: "Un inconvénient de la personnalisation des contenus est :",
    choices: [
      "ne plus être exposé à des idées ou contenus différents des tiens",
      "découvrir trop de nouveautés intéressantes",
      "que tout devienne gratuit",
      "qu'il n'y ait aucun effet",
    ],
  },
  {
    microskillId: "2.4.3",
    text: "Comment garder un peu de contrôle sur tes recommandations ?",
    choices: [
      "consulter et modifier ton historique et tes préférences dans les paramètres",
      "c'est totalement impossible",
      "éteindre la lumière",
      "changer de chaise",
    ],
  },
  {
    microskillId: "2.4.4",
    text: "Une « chambre d'écho », c'est quand :",
    choices: [
      "tu es exposé surtout à des opinions semblables aux tiennes",
      "tu entends un vrai écho dans une grotte",
      "ton micro est cassé",
      "tu vois absolument tous les avis possibles",
    ],
  },

  // 2.5 IA dans une organisation
  {
    microskillId: "2.5.1",
    text: "Lequel de ces outils peut intégrer de l'IA ?",
    choices: [
      "un logiciel qui résume automatiquement tes documents",
      "une gomme",
      "un cahier",
      "un tableau noir",
    ],
  },
  {
    microskillId: "2.5.2",
    text: "Une « charte d'usage de l'IA » dans un établissement sert à :",
    choices: [
      "définir les règles d'utilisation autorisée de l'IA",
      "vendre des ordinateurs",
      "interdire Internet pour toujours",
      "noter les élèves",
    ],
  },
  {
    microskillId: "2.5.3",
    text: "Avant de coller un texte dans une IA en ligne, il faut éviter d'y mettre :",
    choices: [
      "des données personnelles, sensibles ou confidentielles",
      "un mot de vocabulaire",
      "une question de cours",
      "un mot très simple",
    ],
  },
  {
    microskillId: "2.5.3",
    text: "Pourquoi être prudent avec une IA générative gratuite ?",
    choices: [
      "tes données peuvent être réutilisées pour entraîner le logiciel",
      "elle efface ton disque dur",
      "elle coûte toujours très cher",
      "elle ne fonctionne jamais",
    ],
  },
  {
    microskillId: "2.5.4",
    text: "Avant d'adopter un nouvel outil d'IA, il est prudent de :",
    choices: [
      "lire les conditions d'utilisation et les mentions légales sur les données",
      "le télécharger sans rien lire",
      "le partager à tout le monde d'abord",
      "changer ton nom d'utilisateur",
    ],
  },
];
