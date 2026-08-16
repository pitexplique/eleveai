import type { PixQuestion } from "../questionTypes";

// Domaine 1 — Fondements de l'IA. Questions paliers novice/indépendant.
// Plusieurs variantes par microskill pour permettre des entraînements répétés
// sans répétition (le moteur anti-répétition s'appuie sur ce volume).
//
// ⚠️ RÈGLE D'ÉCRITURE DES DISTRACTEURS (16/08/2026). Un distracteur est une
// ERREUR QU'UN ÉLÈVE FAIT VRAIMENT, écrite de la même longueur que la bonne
// réponse. Ce fichier ne respectait ni l'un ni l'autre : « fabriquer des
// meubles », « lui faire faire du sport », « la baisse du prix du papier ».
// Mesuré, cela donnait une bonne réponse la plus longue dans 94 % des cas,
// avec trente caractères d'avance — l'élève cochait la ligne longue et
// raisonnable sans rien connaître à l'IA, et sortait à 95 %.
// Le contrôle : node --experimental-strip-types scripts/verifier-devinabilite.mjs
// Une proposition drôle est une proposition qui ne sera jamais choisie : elle
// ne mesure rien, elle occupe une ligne.
export const d1Questions: PixQuestion[] = [
  // ── 1.1 Définir l'IA, son histoire ───────────────────────────────────────
  {
    microskillId: "1.1.1",
    text: "L'intelligence artificielle est avant tout :",
    choices: [
      "un domaine scientifique qui cherche à faire réaliser des tâches complexes à des machines",
      "un logiciel unique, mis au point par les grandes entreprises du numérique",
      "une machine capable de penser et de ressentir comme un être humain",
      "la version la plus récente et la plus rapide des ordinateurs actuels",
    ],
    explanation: "L'IA est une discipline scientifique interdisciplinaire, pas un produit unique.",
  },
  {
    microskillId: "1.1.1",
    text: "L'IA cherche à modéliser des mécanismes de l'intelligence pour :",
    choices: [
      "permettre à des machines d'effectuer des tâches jugées complexes",
      "reproduire fidèlement le fonctionnement du cerveau humain",
      "rendre les ordinateurs conscients de ce qu'ils calculent",
      "remplacer les moteurs de recherche par des machines",
    ],
  },
  {
    microskillId: "1.1.1",
    text: "Laquelle de ces phrases décrit le mieux l'IA ?",
    choices: [
      "un ensemble de techniques scientifiques pour réaliser des tâches complexes",
      "une machine qui comprend le monde comme le ferait une personne",
      "un programme unique que toutes les applications se partagent",
      "un robot capable de se déplacer et de parler avec les gens",
    ],
  },
  {
    microskillId: "1.1.2",
    text: "Qu'est-ce qui a fait fortement progresser l'IA depuis les années 2000 ?",
    choices: [
      "l'augmentation de la puissance de calcul et la collecte de données massives",
      "la découverte d'une méthode entièrement nouvelle, inconnue avant 2000",
      "l'abandon des statistiques au profit de règles écrites à la main",
      "la miniaturisation des écrans et l'arrivée des téléphones tactiles",
    ],
    explanation: "Plus de puissance de calcul + données massives (big data) = bond de l'apprentissage automatique.",
  },
  {
    microskillId: "1.1.2",
    text: "Les « données massives » (big data) sont utiles à l'IA parce qu'elles :",
    choices: [
      "fournissent de très nombreux exemples pour entraîner les modèles",
      "garantissent que le modèle ne commettra plus aucune erreur",
      "remplacent le travail de programmation par une simple copie",
      "permettent au modèle de se corriger tout seul en direct",
    ],
  },
  {
    microskillId: "1.1.2",
    text: "Sans grandes quantités de données, une IA moderne :",
    choices: [
      "a beaucoup plus de mal à apprendre correctement sa tâche",
      "apprend mieux, parce qu'elle n'est pas noyée d'exemples",
      "fonctionne pareil : les données servent seulement au test",
      "se rabat automatiquement sur les règles de sa programmation",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "Quand un journal parle d'« une IA » pour désigner un chatbot, c'est :",
    choices: [
      "un raccourci : à l'origine, « IA » désigne une discipline, pas un logiciel",
      "l'emploi scientifique exact du terme, tel qu'il a été défini en 1956",
      "une erreur de traduction de l'anglais, où le mot n'existe pas ainsi",
      "le nom commercial officiel que le fabricant a déposé pour son service",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "Le terme « intelligence artificielle » désignait à l'origine :",
    choices: [
      "une discipline scientifique, née dans les années 1950",
      "un programme précis, écrit pour jouer aux échecs",
      "une machine imaginée dans un roman de science-fiction",
      "un projet militaire de traduction automatique des textes",
    ],
  },
  {
    microskillId: "1.1.3",
    text: "« Cette IA a écrit le texte. » Une formulation plus juste serait :",
    choices: [
      "« ce logiciel d'IA générative a produit le texte »",
      "« cette intelligence a rédigé le texte toute seule »",
      "« cet algorithme a recopié le texte sur Internet »",
      "« ce robot a écrit le texte à la place de l'auteur »",
    ],
  },

  // ── 1.2 Apprentissage automatique ────────────────────────────────────────
  {
    microskillId: "1.2.1",
    text: "La phase d'« entraînement » d'un modèle d'IA consiste à :",
    choices: [
      "ajuster ses paramètres sur des données pour qu'il réussisse sa tâche",
      "lui faire apprendre par cœur toutes les réponses qu'il devra donner",
      "écrire à la main les règles qu'il devra appliquer ensuite",
      "le laisser chercher les informations sur Internet au moment voulu",
    ],
  },
  {
    microskillId: "1.2.1",
    text: "Après l'entraînement, à quoi sert la phase de test ?",
    choices: [
      "vérifier qu'il fonctionne sur des données différentes de l'entraînement",
      "vérifier qu'il retrouve bien les réponses de ses données d'entraînement",
      "mesurer la vitesse à laquelle il répond, une fois mis en service",
      "corriger une à une les erreurs qu'il a commises pendant l'entraînement",
    ],
    explanation: "Le test mesure la capacité du modèle à généraliser à de nouveaux cas.",
  },
  {
    microskillId: "1.2.1",
    text: "Pendant l'entraînement, un modèle d'IA :",
    choices: [
      "apprend petit à petit à partir des exemples qu'on lui donne",
      "enregistre les exemples pour les ressortir tels quels ensuite",
      "reçoit d'un programmeur les règles à appliquer, une par une",
      "consulte Internet en direct pour trouver la bonne réponse",
    ],
  },
  {
    microskillId: "1.2.2",
    text: "Dans l'apprentissage supervisé, on fournit au modèle :",
    choices: [
      "des exemples accompagnés de la bonne réponse (données étiquetées)",
      "des exemples bruts, dans lesquels il repère seul des ressemblances",
      "une récompense chiffrée à chaque fois qu'il prend une décision",
      "les règles à suivre, écrites à l'avance par un spécialiste",
    ],
  },
  {
    microskillId: "1.2.2",
    text: "Entraîner une IA à reconnaître des chats avec des milliers de photos déjà marquées « chat / pas chat », c'est de l'apprentissage :",
    choices: ["supervisé", "non supervisé", "par renforcement", "auto-supervisé"],
  },
  {
    microskillId: "1.2.2",
    text: "« Données étiquetées » signifie que chaque exemple :",
    choices: [
      "est accompagné de la bonne réponse attendue",
      "a été vérifié et corrigé avant d'être utilisé",
      "est rangé dans une catégorie choisie par le modèle",
      "porte la date et la source dont il a été extrait",
    ],
  },
  {
    microskillId: "1.2.3",
    text: "Tu veux entraîner une IA à trier des e-mails en « spam / pas spam ». Les étiquettes à fournir sont :",
    choices: [
      "« spam » ou « pas spam » sur des exemples d'e-mails déjà triés",
      "les mots suspects qu'il faudra chercher dans chaque message",
      "le nombre d'e-mails reçus chaque jour dans la boîte de réception",
      "l'adresse de l'expéditeur et l'heure d'arrivée de chaque message",
    ],
  },
  {
    microskillId: "1.2.3",
    text: "Pour entraîner une IA à reconnaître des fruits sur des photos, les bonnes étiquettes seraient :",
    choices: [
      "le nom du fruit présent sur chaque photo (« pomme », « banane »…)",
      "la couleur dominante relevée automatiquement sur chaque photo",
      "la liste des fruits que le modèle devra apprendre à reconnaître",
      "le nombre de fruits visibles sur chacune des photos fournies",
    ],
  },

  // ── 1.3 Modèles d'apprentissage ──────────────────────────────────────────
  {
    microskillId: "1.3.1",
    text: "Une droite de régression linéaire sert surtout à :",
    choices: [
      "prédire une valeur à partir d'autres valeurs observées",
      "séparer des exemples en deux catégories distinctes",
      "regrouper des données qui se ressemblent entre elles",
      "relier tous les points mesurés en passant par chacun",
    ],
  },
  {
    microskillId: "1.3.1",
    text: "À partir de la taille d'une maison, estimer son prix avec une tendance, c'est un exemple de :",
    choices: [
      "régression : on prédit une valeur chiffrée",
      "classification : on prédit une catégorie",
      "regroupement : on rassemble les cas proches",
      "recommandation : on propose un contenu",
    ],
  },
  {
    microskillId: "1.3.2",
    text: "Un arbre de décision prend une décision en :",
    choices: [
      "répondant à une suite de questions jusqu'à une conclusion",
      "calculant une moyenne sur l'ensemble des exemples connus",
      "comparant le cas présenté au cas le plus ressemblant",
      "additionnant des signaux transmis de couche en couche",
    ],
  },
  {
    microskillId: "1.3.2",
    text: "Dans un arbre de décision, une « feuille » correspond à :",
    choices: [
      "une décision ou une prédiction finale",
      "une question posée sur une donnée",
      "une branche que le modèle a écartée",
      "un exemple d'entraînement mal classé",
    ],
  },
  {
    microskillId: "1.3.3",
    text: "Un réseau de neurones artificiels est composé de :",
    choices: [
      "nombreuses petites unités organisées en couches qui se transmettent des signaux",
      "une copie simplifiée des cellules nerveuses prélevées sur un cerveau vivant",
      "une longue suite de règles écrites par des spécialistes du domaine traité",
      "un unique calcul très complexe, appliqué d'un coup à toutes les données",
    ],
  },
  {
    microskillId: "1.3.3",
    text: "Pendant l'apprentissage, un réseau de neurones ajuste :",
    choices: [
      "les « poids » qui déterminent l'importance des signaux reçus",
      "le nombre de couches et de neurones dont il a besoin",
      "les données d'entraînement, qu'il corrige au fil des erreurs",
      "les questions qu'il pose avant de rendre sa réponse finale",
    ],
  },
  {
    microskillId: "1.3.4",
    text: "L'objectif d'un calcul de régression est de :",
    choices: [
      "trouver une relation entre une valeur à prédire et des valeurs observées",
      "répartir les exemples en groupes sans qu'on lui dise lesquels chercher",
      "attribuer à chaque exemple l'étiquette de la catégorie qui lui convient",
      "retenir tous les exemples vus pour retrouver le plus proche au besoin",
    ],
  },
  {
    microskillId: "1.3.4",
    text: "Un modèle de régression est surtout adapté quand :",
    choices: [
      "on veut prédire une valeur chiffrée à partir de données structurées",
      "on veut classer des textes ou des images dans plusieurs catégories",
      "on veut engendrer un contenu nouveau à partir d'une consigne écrite",
      "on ne dispose d'aucun exemple et qu'on cherche des régularités",
    ],
  },

  // ── 1.4 Grands modèles de langage ────────────────────────────────────────
  {
    microskillId: "1.4.1",
    text: "Pour écrire sa réponse, un chatbot (IA générative) :",
    choices: [
      "prédit petit à petit les mots les plus probables",
      "retrouve la réponse déjà écrite dans sa mémoire",
      "recherche la page qui répond le mieux, puis la résume",
      "applique des règles de grammaire écrites à l'avance",
    ],
  },
  {
    microskillId: "1.4.1",
    text: "Un grand modèle de langage construit une phrase :",
    choices: [
      "mot après mot, en estimant la suite la plus probable",
      "d'un seul bloc, une fois la réponse entièrement décidée",
      "en assemblant des phrases toutes faites de sa base",
      "en traduisant la question dans une langue interne",
    ],
  },
  {
    microskillId: "1.4.2",
    text: "Une « hallucination » d'une IA générative, c'est :",
    choices: [
      "une information inventée, présentée comme vraie",
      "une réponse dont elle indique qu'elle n'est pas sûre",
      "une erreur de calcul dans le traitement des données",
      "un refus de répondre à une question trop difficile",
    ],
    explanation: "L'IA peut produire des faits inventés très crédibles : il faut toujours vérifier.",
  },
  {
    microskillId: "1.4.2",
    text: "Une IA t'affirme une date historique fausse, avec assurance. C'est :",
    choices: [
      "une hallucination : il faut vérifier l'information ailleurs",
      "une erreur qui vient forcément d'une faute dans ta question",
      "une réponse juste que ton manuel scolaire présente autrement",
      "un dysfonctionnement passager qui se corrigera de lui-même",
    ],
  },
  {
    microskillId: "1.4.2",
    text: "Une IA invente le titre d'un livre qui n'existe pas, pour répondre. Le bon réflexe :",
    choices: [
      "vérifier dans un catalogue que le livre existe avant de le citer",
      "redemander le titre à l'IA : si elle le répète, c'est qu'il existe",
      "chercher un livre proche et citer celui-là à la place du premier",
      "le citer en précisant simplement qu'il vient d'une IA générative",
    ],
  },
  {
    microskillId: "1.4.3",
    text: "Avant de pouvoir répondre, un grand modèle de langage est d'abord :",
    choices: [
      "pré-entraîné sur d'énormes quantités de textes",
      "rempli avec les réponses aux questions courantes",
      "relié aux sites de référence qu'il devra consulter",
      "programmé règle par règle par des spécialistes",
    ],
  },
  {
    microskillId: "1.4.3",
    text: "Un modèle de langage apprend surtout à partir de :",
    choices: [
      "très nombreux textes issus notamment du Web",
      "des conversations qu'il a eues avec ses utilisateurs",
      "encyclopédies vérifiées, choisies une par une",
      "règles de langue saisies par des linguistes",
    ],
  },
  {
    microskillId: "1.4.4",
    text: "Quel est le rôle des humains dans l'entraînement d'un modèle de langage ?",
    choices: [
      "donner des exemples et noter les réponses pour l'améliorer",
      "aucun : l'apprentissage se fait entièrement sans intervention",
      "rédiger à l'avance les réponses aux questions les plus posées",
      "relire chaque réponse produite avant qu'elle ne soit affichée",
    ],
  },
  {
    microskillId: "1.4.4",
    text: "Quand des humains notent les réponses d'une IA pour qu'elle s'améliore, on parle d'apprentissage :",
    choices: [
      "par renforcement à partir des retours humains",
      "supervisé à partir de données déjà étiquetées",
      "non supervisé, puisque personne n'écrit la réponse",
      "par transfert depuis un modèle déjà entraîné",
    ],
  },
  {
    microskillId: "1.4.5",
    text: "Pourquoi une IA générative peut-elle se tromper ?",
    choices: [
      "ses données peuvent contenir des erreurs, et elle peut inventer",
      "elle se trompe seulement quand la question est mal formulée",
      "elle recopie ses sources, et ce sont elles qui se trompent",
      "elle manque de puissance de calcul au moment de répondre",
    ],
  },
  {
    microskillId: "1.4.5",
    text: "Une IA générative garantit-elle que ses réponses sont vraies ?",
    choices: [
      "non : elle ne vérifie pas la véracité, il faut recouper",
      "oui, dès lors qu'elle cite la source d'où vient la réponse",
      "oui, sauf sur les sujets postérieurs à son entraînement",
      "oui, tant qu'on lui pose une question claire et précise",
    ],
  },

  // ── 1.5 Algorithmes de recommandation ────────────────────────────────────
  {
    microskillId: "1.5.1",
    text: "Une recommandation « personnalisée » est :",
    choices: [
      "adaptée à toi, d'après tes données et ton comportement",
      "la même pour tous, mais rangée dans un ordre différent",
      "choisie par les éditeurs qui paient pour être mis en avant",
      "établie une fois pour toutes à ton inscription au service",
    ],
  },
  {
    microskillId: "1.5.1",
    text: "Deux personnes différentes ouvrent la même appli vidéo. Avec la recommandation personnalisée :",
    choices: [
      "elles voient des suggestions différentes, selon leurs goûts",
      "elles voient les mêmes vidéos, dans un ordre différent",
      "elles voient les vidéos les plus regardées du moment",
      "elles voient les nouveautés, classées de la plus récente",
    ],
  },
  {
    microskillId: "1.5.2",
    text: "Lequel de ces services utilise une recommandation personnalisée ?",
    choices: [
      "une plateforme vidéo qui propose la « prochaine vidéo »",
      "un dictionnaire en ligne qui affiche la définition cherchée",
      "un site météo qui donne les prévisions de ta commune",
      "une messagerie qui range les messages du plus récent",
    ],
  },
  {
    microskillId: "1.5.2",
    text: "Le fil d'actualité d'un réseau social qui s'adapte à toi est un exemple de :",
    choices: [
      "recommandation personnalisée",
      "traduction automatique",
      "reconnaissance d'images",
      "génération de contenu",
    ],
  },
  {
    microskillId: "1.5.3",
    text: "Sur quoi se base un algorithme de recommandation pour te proposer des contenus ?",
    choices: [
      "ton historique, tes clics et le temps passé sur chaque contenu",
      "les seules informations que tu as saisies dans ton profil",
      "un classement des contenus les plus populaires du moment",
      "le programme scolaire correspondant à ta classe et ton âge",
    ],
  },
  {
    microskillId: "1.5.3",
    text: "Parmi ces données, laquelle sert le plus à la recommandation ?",
    choices: [
      "les vidéos que tu as déjà regardées jusqu'au bout",
      "le modèle du téléphone sur lequel tu es connecté",
      "l'heure à laquelle tu ouvres l'application chaque jour",
      "le nombre d'amis inscrits sur ton compte",
    ],
  },
  {
    microskillId: "1.5.4",
    text: "La « bulle de filtre », c'est quand :",
    choices: [
      "tu ne vois presque plus que des contenus proches de ce que tu aimes",
      "l'algorithme te propose sans arrêt des contenus qui t'agacent",
      "tes données servent à personnaliser la publicité qu'on te montre",
      "plusieurs personnes voient exactement le même fil d'actualité",
    ],
    explanation: "À force de personnalisation, on s'enferme dans des contenus similaires : c'est l'enfermement algorithmique.",
  },
  {
    microskillId: "1.5.4",
    text: "Un risque de la recommandation personnalisée est :",
    choices: [
      "de t'enfermer dans une « bulle » de contenus toujours semblables",
      "de te proposer trop souvent des contenus loin de tes habitudes",
      "de te montrer les mêmes contenus qu'à tous les autres abonnés",
      "de rendre l'application plus lente à mesure qu'elle te connaît",
    ],
  },

  // ── 1.6 IA incarnée / robotique ──────────────────────────────────────────
  {
    microskillId: "1.6.1",
    text: "Les trois grandes fonctions d'un robot sont :",
    choices: [
      "percevoir, décider, agir",
      "calculer, stocker, afficher",
      "recevoir, traduire, répondre",
      "observer, imiter, mémoriser",
    ],
  },
  {
    microskillId: "1.6.1",
    text: "Les caméras et capteurs d'un robot servent surtout à :",
    choices: [
      "percevoir l'environnement dans lequel il se déplace",
      "décider de l'action à mener une fois l'obstacle vu",
      "transmettre ses images au technicien qui le surveille",
      "enregistrer ce qu'il fait pour l'améliorer plus tard",
    ],
  },
  {
    microskillId: "1.6.2",
    text: "Lequel est un exemple de robot utilisant l'IA ?",
    choices: [
      "un aspirateur qui cartographie la pièce et évite les obstacles",
      "un portail électrique qui s'ouvre quand on appuie sur un bouton",
      "une machine à laver qui suit le programme choisi par l'utilisateur",
      "un bras d'usine qui répète le même geste, réglé une fois pour toutes",
    ],
  },
  {
    microskillId: "1.6.2",
    text: "Une voiture autonome qui reconnaît les piétons utilise :",
    choices: [
      "de l'IA, et plus précisément de la vision par ordinateur",
      "un radar de recul comme ceux des voitures ordinaires",
      "une carte détaillée où les piétons sont déjà repérés",
      "une liaison permanente avec un opérateur qui la guide",
    ],
  },
  {
    microskillId: "1.6.3",
    text: "On parle d'« IA incarnée » quand :",
    choices: [
      "l'IA est dans un objet physique qui perçoit et agit dans le monde réel",
      "l'IA se présente sous la forme d'un personnage animé sur un écran",
      "l'IA imite le raisonnement humain plutôt qu'un calcul statistique",
      "l'IA tourne sur la machine de l'utilisateur et non sur un serveur",
    ],
  },
  {
    microskillId: "1.6.3",
    text: "Un robot qui combine perception, décision et action dans le monde réel illustre :",
    choices: [
      "une IA incarnée",
      "une IA générative",
      "une IA symbolique",
      "une IA supervisée",
    ],
  },
  {
    microskillId: "1.6.4",
    text: "Pourquoi est-ce difficile pour un robot d'agir dans le monde réel ?",
    choices: [
      "le monde réel est changeant, incertain, et rarement conforme aux essais",
      "les capteurs actuels ne parviennent pas encore à mesurer les distances",
      "les robots ne savent traiter qu'une seule information à la fois",
      "le monde réel demande des calculs qu'aucune machine ne sait faire",
    ],
  },
  {
    microskillId: "1.6.4",
    text: "Face à un imprévu (un obstacle soudain), un bon robot doit :",
    choices: [
      "s'adapter et réagir sans attendre une nouvelle consigne",
      "reprendre depuis le début le programme qu'on lui a donné",
      "poursuivre sa trajectoire, l'obstacle finissant par bouger",
      "attendre qu'un opérateur humain lui indique quoi faire",
    ],
  },
];
