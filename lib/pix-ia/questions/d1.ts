import type { PixQuestion } from "../questionTypes";

// Domaine 1 — Fondements de l'IA. Questions paliers novice/indépendant.
// Plusieurs variantes par microskill pour permettre des entraînements répétés
// sans répétition (le moteur anti-répétition s'appuie sur ce volume).
export const d1Questions: PixQuestion[] = [
  // ── 1.1 Définir l'IA, son histoire ───────────────────────────────────────
  {
    microskillId: "1.1.1",
    text: "L'intelligence artificielle est avant tout :",
    choices: [
      "un domaine scientifique qui cherche à faire réaliser des tâches « intelligentes » à des machines",
      "un seul logiciel précis, comme un site web",
      "un robot humanoïde",
      "une marque d'ordinateurs",
    ],
    explanation: "L'IA est une discipline scientifique interdisciplinaire, pas un produit unique.",
  },
  {
    microskillId: "1.1.1",
    text: "L'IA cherche à modéliser des mécanismes de l'intelligence pour :",
    choices: [
      "permettre à des machines d'effectuer des tâches complexes",
      "ralentir les ordinateurs",
      "remplacer Internet",
      "fabriquer des meubles",
    ],
  },
  {
    microskillId: "1.1.1",
    text: "Laquelle de ces phrases décrit le mieux l'IA ?",
    choices: [
      "un ensemble de techniques scientifiques pour réaliser des tâches « intelligentes »",
      "un robot qui ressemble à un humain",
      "un jeu vidéo en ligne",
      "un réseau social",
    ],
  },
  {
    microskillId: "1.1.2",
    text: "Qu'est-ce qui a fait fortement progresser l'IA depuis les années 2000 ?",
    choices: [
      "l'augmentation de la puissance de calcul et la collecte de données massives",
      "la baisse du prix du papier",
      "l'arrêt d'Internet",
      "la disparition des ordinateurs",
    ],
    explanation: "Plus de puissance de calcul + données massives (big data) = bond de l'apprentissage automatique.",
  },
  {
    microskillId: "1.1.2",
    text: "Les « données massives » (big data) sont utiles à l'IA parce qu'elles :",
    choices: [
      "fournissent de nombreux exemples pour entraîner les modèles",
      "rendent les écrans plus lumineux",
      "remplacent l'électricité",
      "corrigent les erreurs toutes seules",
    ],
  },
  {
    microskillId: "1.1.2",
    text: "Sans grandes quantités de données, une IA moderne :",
    choices: [
      "a beaucoup plus de mal à apprendre correctement",
      "apprend encore mieux et plus vite",
      "n'a plus besoin d'électricité",
      "devient un robot physique",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "Quand un journal parle d'« une IA » pour désigner un chatbot, c'est :",
    choices: [
      "un raccourci de langage : à l'origine, « IA » désigne une discipline, pas un logiciel précis",
      "le sens scientifique exact du mot",
      "une erreur de traduction",
      "le nom officiel du logiciel",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "Le terme « intelligence artificielle » désignait à l'origine :",
    choices: [
      "une discipline scientifique",
      "un téléphone portable",
      "un site web précis",
      "un robot ménager",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "« Cette IA a écrit le texte. » Une formulation plus juste serait :",
    choices: [
      "« ce logiciel d'IA générative a produit le texte »",
      "« ce robot vivant a écrit le texte »",
      "« ce cerveau humain a écrit le texte »",
      "« ce moteur de recherche a écrit le texte »",
    ],
  },

  // ── 1.2 Apprentissage automatique ────────────────────────────────────────
  {
    microskillId: "1.2.1",
    text: "La phase d'« entraînement » d'un modèle d'IA consiste à :",
    choices: [
      "ajuster ses paramètres à partir de données pour qu'il réussisse sa tâche",
      "le brancher sur le secteur",
      "lui faire faire du sport",
      "installer une mise à jour",
    ],
  },
  {
    microskillId: "1.2.1",
    text: "Après l'entraînement, à quoi sert la phase de test ?",
    choices: [
      "vérifier que le modèle fonctionne sur des données différentes de celles de l'entraînement",
      "éteindre le modèle",
      "supprimer toutes les données",
      "ralentir le modèle",
    ],
    explanation: "Le test mesure la capacité du modèle à généraliser à de nouveaux cas.",
  },
  {
    microskillId: "1.2.1",
    text: "Pendant l'entraînement, un modèle d'IA :",
    choices: [
      "apprend petit à petit à partir des exemples qu'on lui donne",
      "est déjà parfait dès le départ",
      "n'a besoin d'aucune donnée",
      "recopie simplement Internet en direct",
    ],
  },
  {
    microskillId: "1.2.2",
    text: "Dans l'apprentissage supervisé, on fournit au modèle :",
    choices: [
      "des exemples accompagnés de la bonne réponse (données étiquetées)",
      "aucune donnée",
      "uniquement des images floues",
      "seulement la réponse finale, sans exemples",
    ],
  },
  {
    microskillId: "1.2.2",
    text: "Entraîner une IA à reconnaître des chats avec des milliers de photos déjà marquées « chat / pas chat », c'est de l'apprentissage :",
    choices: ["supervisé", "non supervisé", "par renforcement", "sans aucune donnée"],
  },
  {
    microskillId: "1.2.2",
    text: "« Données étiquetées » signifie que chaque exemple :",
    choices: [
      "est accompagné de la bonne réponse attendue",
      "porte une étiquette de prix",
      "est en double",
      "a été effacé",
    ],
  },
  {
    microskillId: "1.2.3",
    text: "Tu veux entraîner une IA à trier des e-mails en « spam / pas spam ». Les étiquettes à fournir sont :",
    choices: [
      "« spam » ou « pas spam » sur des exemples d'e-mails",
      "la date du jour",
      "le poids du téléphone",
      "rien, l'IA devine toute seule",
    ],
  },
  {
    microskillId: "1.2.3",
    text: "Pour entraîner une IA à reconnaître des fruits sur des photos, les bonnes étiquettes seraient :",
    choices: [
      "le nom du fruit sur chaque photo (« pomme », « banane »…)",
      "la marque de l'appareil photo",
      "l'heure de la prise de vue",
      "la couleur du mur derrière",
    ],
  },

  // ── 1.3 Modèles d'apprentissage ──────────────────────────────────────────
  {
    microskillId: "1.3.1",
    text: "Une droite de régression linéaire sert surtout à :",
    choices: [
      "prédire une valeur à partir d'autres valeurs observées",
      "dessiner un cercle",
      "trier l'alphabet",
      "colorier une image",
    ],
  },
  {
    microskillId: "1.3.1",
    text: "À partir de la taille d'une maison, estimer son prix avec une tendance, c'est un exemple de :",
    choices: [
      "régression (prédire une valeur)",
      "traduction automatique",
      "reconnaissance vocale",
      "génération d'images",
    ],
  },
  {
    microskillId: "1.3.2",
    text: "Un arbre de décision prend une décision en :",
    choices: [
      "répondant à une suite de questions (oui/non) jusqu'à une conclusion",
      "tirant au hasard",
      "comptant les pixels d'une image",
      "mesurant la température de la pièce",
    ],
  },
  {
    microskillId: "1.3.2",
    text: "Dans un arbre de décision, une « feuille » correspond à :",
    choices: [
      "une décision ou une prédiction finale",
      "une panne du modèle",
      "une image décorative",
      "un mot de passe",
    ],
  },
  {
    microskillId: "1.3.3",
    text: "Un réseau de neurones artificiels est composé de :",
    choices: [
      "nombreuses petites unités (« neurones ») organisées en couches qui se transmettent des signaux",
      "vrais neurones humains",
      "uniquement des câbles électriques",
      "un seul gros calcul unique",
    ],
  },
  {
    microskillId: "1.3.3",
    text: "Pendant l'apprentissage, un réseau de neurones ajuste :",
    choices: [
      "les « poids » qui déterminent l'importance des signaux reçus",
      "la taille de l'écran",
      "le volume du son",
      "la couleur des boutons",
    ],
  },
  {
    microskillId: "1.3.4",
    text: "L'objectif d'un calcul de régression est de :",
    choices: [
      "trouver une relation entre une valeur à prédire et des valeurs observées",
      "trier des mots par ordre alphabétique",
      "compresser une vidéo",
      "chiffrer un mot de passe",
    ],
  },
  {
    microskillId: "1.3.4",
    text: "Un modèle de régression est surtout adapté quand :",
    choices: [
      "on veut prédire une valeur à partir de données bien structurées",
      "on veut trier des e-mails par couleur",
      "on veut dessiner au hasard",
      "on n'a aucune donnée",
    ],
  },

  // ── 1.4 Grands modèles de langage ────────────────────────────────────────
  {
    microskillId: "1.4.1",
    text: "Pour écrire sa réponse, un chatbot (IA générative) :",
    choices: [
      "prédit petit à petit les mots les plus probables",
      "recopie une page Wikipédia entière",
      "téléphone à un humain en direct",
      "choisit des mots totalement au hasard",
    ],
  },
  {
    microskillId: "1.4.1",
    text: "Un grand modèle de langage construit une phrase :",
    choices: [
      "mot après mot, en estimant la suite la plus probable",
      "en copiant la réponse d'un autre élève",
      "en cherchant la phrase exacte dans un livre",
      "sans jamais utiliser de probabilités",
    ],
  },
  {
    microskillId: "1.4.2",
    text: "Une « hallucination » d'une IA générative, c'est :",
    choices: [
      "une information inventée présentée comme vraie",
      "une panne d'écran",
      "un virus informatique",
      "une mise à jour du logiciel",
    ],
    explanation: "L'IA peut produire des faits inventés très crédibles : il faut toujours vérifier.",
  },
  {
    microskillId: "1.4.2",
    text: "Une IA t'affirme une date historique fausse, avec assurance. C'est :",
    choices: [
      "une hallucination : il faut vérifier l'information ailleurs",
      "forcément vrai, car l'IA l'a dit",
      "un bug de ton ordinateur",
      "une blague programmée exprès",
    ],
  },
  {
    microskillId: "1.4.2",
    text: "Une IA invente le titre d'un livre qui n'existe pas, pour répondre. Le bon réflexe :",
    choices: [
      "vérifier que le livre existe vraiment avant de le citer",
      "le recopier dans ton devoir tel quel",
      "le partager comme une découverte",
      "supposer qu'il existe forcément",
    ],
  },
  {
    microskillId: "1.4.3",
    text: "Avant de pouvoir répondre, un grand modèle de langage est d'abord :",
    choices: [
      "pré-entraîné sur d'énormes quantités de textes",
      "rempli à la main avec toutes les réponses possibles",
      "connecté directement à ton cerveau",
      "imprimé sur du papier",
    ],
  },
  {
    microskillId: "1.4.3",
    text: "Un modèle de langage apprend surtout à partir de :",
    choices: [
      "très nombreux textes issus notamment du Web",
      "ta seule conversation avec lui",
      "un unique dictionnaire papier",
      "rien, il est programmé à la main",
    ],
  },
  {
    microskillId: "1.4.4",
    text: "Quel est le rôle des humains dans l'entraînement d'un modèle de langage ?",
    choices: [
      "donner des exemples et noter les réponses pour l'améliorer",
      "aucun, tout est entièrement automatique",
      "taper chaque réponse en direct quand tu l'utilises",
      "fabriquer l'électricité du serveur",
    ],
  },
  {
    microskillId: "1.4.4",
    text: "Quand des humains notent les réponses d'une IA pour qu'elle s'améliore, on parle d'apprentissage :",
    choices: [
      "par renforcement à partir des retours humains",
      "sans aucune intervention humaine",
      "par recopie d'Internet",
      "par tirage au sort",
    ],
  },
  {
    microskillId: "1.4.5",
    text: "Pourquoi une IA générative peut-elle se tromper ?",
    choices: [
      "ses données d'entraînement peuvent contenir des erreurs, et elle peut inventer (hallucinations)",
      "elle ne se trompe jamais",
      "uniquement quand il n'y a pas de Wi-Fi",
      "seulement la nuit",
    ],
  },
  {
    microskillId: "1.4.5",
    text: "Une IA générative garantit-elle que ses réponses sont vraies ?",
    choices: [
      "non : elle ne vérifie pas la véracité, il faut recouper",
      "oui, toujours, à 100 %",
      "oui, si la question est polie",
      "oui, sauf le week-end",
    ],
  },

  // ── 1.5 Algorithmes de recommandation ────────────────────────────────────
  {
    microskillId: "1.5.1",
    text: "Une recommandation « personnalisée » est :",
    choices: [
      "adaptée à toi, d'après tes données et ton comportement",
      "la même pour tout le monde",
      "choisie totalement au hasard",
      "interdite par la loi",
    ],
  },
  {
    microskillId: "1.5.1",
    text: "Deux personnes différentes ouvrent la même appli vidéo. Avec la recommandation personnalisée :",
    choices: [
      "elles voient des suggestions différentes selon leurs goûts",
      "elles voient exactement les mêmes vidéos",
      "elles ne voient rien",
      "elles voient l'ordre alphabétique",
    ],
  },
  {
    microskillId: "1.5.2",
    text: "Lequel de ces services utilise une recommandation personnalisée ?",
    choices: [
      "une plateforme de vidéos qui te propose la « prochaine vidéo »",
      "une calculatrice",
      "un réveil matin",
      "une lampe de poche",
    ],
  },
  {
    microskillId: "1.5.2",
    text: "Le fil d'actualité d'un réseau social qui s'adapte à toi est un exemple de :",
    choices: [
      "recommandation personnalisée",
      "calcul de moyenne",
      "reconnaissance vocale",
      "traduction automatique",
    ],
  },
  {
    microskillId: "1.5.3",
    text: "Sur quoi se base un algorithme de recommandation pour te proposer des contenus ?",
    choices: [
      "ton historique, tes clics et tes préférences",
      "ta taille et ton poids",
      "la météo de demain",
      "rien du tout",
    ],
  },
  {
    microskillId: "1.5.3",
    text: "Parmi ces données, laquelle sert le plus à la recommandation ?",
    choices: [
      "les vidéos que tu as déjà regardées",
      "la couleur de tes yeux",
      "la marque de ta trousse",
      "ta pointure",
    ],
  },
  {
    microskillId: "1.5.4",
    text: "La « bulle de filtre », c'est quand :",
    choices: [
      "tu ne vois presque plus que des contenus proches de ce que tu aimes déjà",
      "ton écran devient flou",
      "Internet tombe en panne",
      "tu vois tous les contenus du monde entier",
    ],
    explanation: "À force de personnalisation, on s'enferme dans des contenus similaires : c'est l'enfermement algorithmique.",
  },
  {
    microskillId: "1.5.4",
    text: "Un risque de la recommandation personnalisée est :",
    choices: [
      "de t'enfermer dans une « bulle » de contenus toujours semblables",
      "de te montrer trop d'idées nouvelles",
      "de rendre ton téléphone plus rapide",
      "de supprimer la publicité",
    ],
  },

  // ── 1.6 IA incarnée / robotique ──────────────────────────────────────────
  {
    microskillId: "1.6.1",
    text: "Les trois grandes fonctions d'un robot sont :",
    choices: [
      "percevoir, décider, agir",
      "lire, écrire, compter",
      "manger, dormir, jouer",
      "acheter, vendre, payer",
    ],
  },
  {
    microskillId: "1.6.1",
    text: "Les caméras et capteurs d'un robot servent surtout à :",
    choices: [
      "percevoir son environnement",
      "le recharger",
      "le décorer",
      "le ralentir",
    ],
  },
  {
    microskillId: "1.6.2",
    text: "Lequel est un exemple de robot utilisant l'IA ?",
    choices: [
      "un aspirateur autonome qui cartographie la pièce et évite les obstacles",
      "un grille-pain classique",
      "une chaise de bureau",
      "un crayon de papier",
    ],
  },
  {
    microskillId: "1.6.2",
    text: "Une voiture autonome qui reconnaît les piétons utilise :",
    choices: [
      "de l'IA (vision par ordinateur)",
      "uniquement un volant",
      "un simple klaxon",
      "aucune technologie",
    ],
  },
  {
    microskillId: "1.6.3",
    text: "On parle d'« IA incarnée » quand :",
    choices: [
      "l'IA est dans un objet physique qui perçoit et agit dans le monde réel",
      "l'IA est seulement un site web",
      "l'IA est imprimée sur du papier",
      "l'IA n'existe pas vraiment",
    ],
  },
  {
    microskillId: "1.6.3",
    text: "Un robot qui combine perception, décision et action dans le monde réel illustre :",
    choices: [
      "une IA incarnée",
      "un simple tableur",
      "un moteur de recherche",
      "une calculatrice",
    ],
  },
  {
    microskillId: "1.6.4",
    text: "Pourquoi est-ce difficile pour un robot d'agir dans le monde réel ?",
    choices: [
      "le monde réel est changeant, incertain et imprévisible",
      "le monde réel est trop simple",
      "il n'y a aucune difficulté",
      "parce qu'il fait toujours nuit",
    ],
  },
  {
    microskillId: "1.6.4",
    text: "Face à un imprévu (un obstacle soudain), un bon robot doit :",
    choices: [
      "s'adapter rapidement et réagir",
      "s'arrêter de fonctionner pour toujours",
      "ignorer complètement l'obstacle",
      "supprimer ses capteurs",
    ],
  },
];
