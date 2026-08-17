// Gabarits du domaine 1 — Fondements de l'IA. Paliers novice / indépendant.
//
// Un gabarit par savoir-faire, chacun avec son réservoir de cas. Le cas change
// à chaque tirage, et avec lui le raisonnement : ce n'est pas la même question
// reformulée. Voir socle.ts pour la règle et les trois helpers.

import { classer, corriger, situation, type PixGabarit } from "./socle";

/* Les familles servent de propositions FIXES aux gabarits de classement :
   l'élève doit les distinguer entre elles, tirage après tirage. */
const FAMILLES_APPRENTISSAGE = [
  "l'apprentissage supervisé",
  "l'apprentissage non supervisé",
  "l'apprentissage par renforcement",
  "aucun apprentissage : des règles écrites à la main",
];

const FAMILLES_MODELE = [
  "une régression",
  "un arbre de décision",
  "un réseau de neurones",
  "un regroupement automatique",
];

export const d1Gabarits: PixGabarit[] = [
  // ── 1.1.1 Définir l'IA comme discipline scientifique ─────────────────────
  classer({
    id: "g_1_1_1_estce_ia",
    microskillId: "1.1.1",
    consigne: "De quoi s'agit-il ?",
    familles: [
      "de l'IA : le comportement est appris sur des exemples",
      "un programme classique : les règles sont écrites à l'avance",
      "un simple stockage de données, sans traitement",
      "un appareil électronique, sans aucun programme",
    ],
    pool: [
      {
        cas: "Un service repère les courriels indésirables après avoir été entraîné sur des milliers de messages déjà triés.",
        famille: "de l'IA : le comportement est appris sur des exemples",
        pourquoi: "Personne n'a écrit la règle « ce message est indésirable » : elle a été apprise sur des exemples.",
      },
      {
        cas: "Une caisse automatique additionne le prix des articles scannés et rend la monnaie.",
        famille: "un programme classique : les règles sont écrites à l'avance",
        pourquoi: "L'addition est une règle écrite une fois pour toutes. Aucun apprentissage là-dedans.",
      },
      {
        cas: "Une application reconnaît le chant d'un oiseau enregistré au jardin.",
        famille: "de l'IA : le comportement est appris sur des exemples",
        pourquoi: "Le modèle a été entraîné sur des milliers d'enregistrements annotés par espèce.",
      },
      {
        cas: "Un tableur trie une colonne de noms par ordre alphabétique.",
        famille: "un programme classique : les règles sont écrites à l'avance",
        pourquoi: "L'ordre alphabétique est une règle fixe : le tri l'applique, il ne l'apprend pas.",
      },
      {
        cas: "Une clé USB conserve les photos qu'on y a copiées.",
        famille: "un simple stockage de données, sans traitement",
        pourquoi: "Rien n'est calculé ni décidé : les données sont seulement conservées.",
      },
      {
        cas: "Un traducteur en ligne rend une phrase française en créole après entraînement sur des textes bilingues.",
        famille: "de l'IA : le comportement est appris sur des exemples",
        pourquoi: "Les correspondances entre les deux langues ont été apprises, pas listées à la main.",
      },
      {
        cas: "Un thermomètre électronique affiche la température qu'il mesure.",
        famille: "un appareil électronique, sans aucun programme",
        pourquoi: "Une mesure affichée n'est ni un apprentissage, ni même une décision.",
      },
      {
        cas: "Un portail s'ouvre lorsque la télécommande envoie le bon code.",
        famille: "un programme classique : les règles sont écrites à l'avance",
        pourquoi: "« Bon code, alors j'ouvre » est une règle écrite. C'est de l'automatisme, pas de l'IA.",
      },
    ],
  }),

  // ── 1.1.2 Données massives et puissance de calcul ────────────────────────
  corriger({
    id: "g_1_1_2_idees_recues",
    microskillId: "1.1.2",
    pool: [
      {
        affirmation: "L'IA a progressé parce qu'on a découvert une méthode entièrement nouvelle après 2000.",
        bonne: "les méthodes existaient déjà : ce sont les données et le calcul qui ont changé d'échelle",
        pieges: [
          "les méthodes ont changé, mais les données d'entraînement sont restées les mêmes",
          "la progression vient des écrans et des téléphones, apparus à la même période",
          "il n'y a eu aucune progression réelle depuis les années 2000",
        ],
        pourquoi:
          "Les réseaux de neurones datent des années 1950-1980. Ce qui a basculé, c'est la quantité de données disponibles et la puissance de calcul.",
      },
      {
        affirmation: "Avec assez de données, un modèle finit forcément par bien apprendre.",
        bonne: "la quantité ne suffit pas : des données fausses ou déséquilibrées font mal apprendre",
        pieges: [
          "c'est vrai, à condition d'attendre assez longtemps pendant l'entraînement",
          "c'est vrai seulement si les données viennent toutes de la même source",
          "c'est faux : au-delà d'un certain nombre, les données se contredisent toujours",
        ],
        pourquoi: "La qualité et la diversité des données comptent autant que leur nombre.",
      },
      {
        affirmation: "Les données massives permettent à l'IA de se corriger toute seule au fil du temps.",
        bonne: "un modèle entraîné ne change plus : le corriger demande de le réentraîner",
        pieges: [
          "il se corrige, mais seulement à partir des questions que lui posent les utilisateurs",
          "il se corrige, à condition d'être connecté en permanence à Internet",
          "il ne se corrige jamais, même si on le réentraîne sur de nouvelles données",
        ],
        pourquoi: "L'apprentissage a lieu pendant l'entraînement. Ensuite, le modèle applique ce qu'il a appris.",
      },
      {
        affirmation: "La puissance de calcul sert surtout à répondre plus vite aux utilisateurs.",
        bonne: "elle sert d'abord à l'entraînement, de très loin la phase la plus coûteuse",
        pieges: [
          "elle sert surtout à stocker les données massives dont le modèle a besoin",
          "elle sert à faire tourner plusieurs modèles en même temps sur un serveur",
          "elle ne sert à rien de particulier : un ordinateur ordinaire suffirait",
        ],
        pourquoi:
          "Entraîner un grand modèle mobilise des milliers de processeurs pendant des semaines. Répondre coûte bien moins.",
      },
      {
        affirmation: "Sans données massives, une IA moderne apprend mieux : elle n'est pas noyée d'exemples.",
        bonne: "avec trop peu d'exemples, le modèle retient les cas vus au lieu de généraliser",
        pieges: [
          "c'est exact : un petit nombre d'exemples bien choisis vaut mieux qu'un grand",
          "c'est exact, mais seulement pour les modèles qui traitent du texte",
          "peu importe : le nombre d'exemples n'a aucun effet sur l'apprentissage",
        ],
        pourquoi:
          "Trop peu d'exemples, et le modèle apprend par cœur ce qu'il a vu : il échoue dès qu'un cas nouveau se présente.",
      },
      {
        affirmation: "Les grandes bases de données servent à stocker les réponses que l'IA donnera.",
        bonne: "elles servent à l'entraîner : le modèle en retient des régularités, pas des réponses",
        pieges: [
          "elles servent à vérifier ses réponses au moment où l'utilisateur pose sa question",
          "elles servent à ranger les questions déjà posées pour y répondre plus vite",
          "elles servent à conserver les erreurs du modèle pour les corriger ensuite",
        ],
        pourquoi:
          "Un modèle ne contient pas les données : il contient des paramètres ajustés dessus.",
      },
    ],
  }),

  // ── 1.1.3 Glissement du mot « IA » ───────────────────────────────────────
  corriger({
    id: "g_1_1_3_glissement",
    microskillId: "1.1.3",
    pool: [
      {
        affirmation: "J'ai téléchargé l'IA sur mon téléphone.",
        bonne: "« IA » nomme une discipline : ce qu'on télécharge, c'est une application qui l'utilise",
        pieges: [
          "on ne télécharge rien : ces services fonctionnent uniquement sur des serveurs",
          "la phrase est juste, « IA » étant devenu le nom commercial de ces applications",
          "il faudrait dire « un robot », terme exact pour un programme installé",
        ],
        pourquoi:
          "L'intelligence artificielle est un champ scientifique. Un assistant est un logiciel qui en applique des techniques.",
      },
      {
        affirmation: "Cette IA a décidé de refuser ma demande.",
        bonne: "le logiciel applique des règles fixées par des humains : la décision leur revient",
        pieges: [
          "c'est exact : un modèle assez grand prend ses décisions de façon autonome",
          "il aurait fallu dire « cet algorithme a décidé », qui est le terme exact",
          "le refus vient forcément d'une erreur technique, pas d'une décision",
        ],
        pourquoi:
          "Parler de décision de l'IA fait disparaître les personnes qui l'ont conçue et qui en répondent.",
      },
      {
        affirmation: "L'IA a été inventée en 2022, avec les premiers agents conversationnels grand public.",
        bonne: "la discipline est née dans les années 1950 : 2022 a rendu ses outils publics",
        pieges: [
          "elle est née dans les années 2010, avec les premiers réseaux de neurones profonds",
          "elle est née avec les premiers ordinateurs, dont elle est une fonction d'origine",
          "elle n'a pas de date : le terme désigne toute machine automatique",
        ],
        pourquoi:
          "L'expression date de 1956. Ce qui est récent, c'est l'arrivée de ces outils entre toutes les mains.",
      },
      {
        affirmation: "Mon téléphone contient une IA qui comprend ce que je lui dis.",
        bonne: "il transcrit et met en correspondance, mais « comprendre » lui prête un état mental",
        pieges: [
          "il faudrait dire « une intelligence », le mot artificiel étant de trop ici",
          "c'est exact : les assistants récents comprennent le sens des phrases",
          "c'est faux : ces assistants ne font que reconnaître des mots-clés isolés",
        ],
        pourquoi:
          "Traiter le langage et le comprendre ne sont pas la même chose. Le mot « comprendre » prête à la machine ce qu'elle n'a pas.",
      },
      {
        affirmation: "Les IA vont bientôt se mettre d'accord entre elles.",
        bonne: "ce sont des logiciels sans intention : ce sont leurs concepteurs qui décident",
        pieges: [
          "c'est déjà le cas : les grands modèles échangent leurs données en continu",
          "cela arrivera dès qu'ils seront connectés à un même réseau",
          "impossible : deux logiciels différents ne peuvent jamais communiquer",
        ],
        pourquoi:
          "Prêter une volonté commune à des programmes déplace la responsabilité loin de ceux qui les font.",
      },
      {
        affirmation: "Ce texte a été écrit par une IA, donc personne n'en est l'auteur.",
        bonne: "quelqu'un a écrit la consigne, choisi et publié le texte : il en répond",
        pieges: [
          "c'est exact, et c'est pourquoi ces textes sont libres de droits",
          "l'auteur est l'entreprise qui a conçu et entraîné le modèle",
          "l'auteur est l'ensemble des personnes dont les textes ont servi à l'entraîner",
        ],
        pourquoi:
          "Le logiciel produit, mais la personne qui demande, retient et diffuse reste responsable de ce qu'elle publie.",
      },
    ],
  }),

  // ── 1.2.1 La phase d'entraînement ────────────────────────────────────────
  classer({
    id: "g_1_2_1_etapes",
    microskillId: "1.2.1",
    consigne: "À quelle étape de la vie d'un modèle appartient cette opération ?",
    familles: [
      "l'entraînement : le modèle ajuste ses paramètres",
      "le test : on vérifie sur des données jamais vues",
      "l'utilisation : le modèle répond, sans plus rien apprendre",
      "la préparation des données, avant tout apprentissage",
    ],
    pool: [
      {
        cas: "On corrige les étiquettes erronées et on retire les exemples en double.",
        famille: "la préparation des données, avant tout apprentissage",
        pourquoi: "Nettoyer les données précède l'entraînement : un exemple faux enseigne une erreur.",
      },
      {
        cas: "Le modèle voit des milliers d'exemples et modifie peu à peu ses paramètres.",
        famille: "l'entraînement : le modèle ajuste ses paramètres",
        pourquoi: "C'est la définition même de l'entraînement.",
      },
      {
        cas: "On mesure le taux de bonnes réponses sur 2 000 exemples mis de côté au départ.",
        famille: "le test : on vérifie sur des données jamais vues",
        pourquoi: "Le test mesure la capacité à généraliser, donc sur des exemples jamais vus à l'entraînement.",
      },
      {
        cas: "Un élève pose une question au modèle et reçoit une réponse.",
        famille: "l'utilisation : le modèle répond, sans plus rien apprendre",
        pourquoi: "Le modèle applique ce qu'il a appris ; il ne se modifie pas en répondant.",
      },
      {
        cas: "On réserve 20 % des exemples avant de commencer, pour ne pas les montrer au modèle.",
        famille: "la préparation des données, avant tout apprentissage",
        pourquoi: "Mettre de côté un jeu de test fait partie de la préparation.",
      },
      {
        cas: "Le modèle se trompe sur un exemple, et l'écart sert à corriger ses paramètres.",
        famille: "l'entraînement : le modèle ajuste ses paramètres",
        pourquoi: "Chaque erreur mesurée sert à ajuster les paramètres : c'est le cœur de l'entraînement.",
      },
      {
        cas: "On compare les résultats sur les exemples d'entraînement et sur ceux mis de côté.",
        famille: "le test : on vérifie sur des données jamais vues",
        pourquoi: "Un écart important entre les deux révèle un modèle qui a appris par cœur.",
      },
      {
        cas: "Des milliers de personnes utilisent le service chaque jour et obtiennent des réponses.",
        famille: "l'utilisation : le modèle répond, sans plus rien apprendre",
        pourquoi: "Sans réentraînement, l'usage ne modifie pas le modèle.",
      },
    ],
  }),

  // ── 1.2.2 Le procédé de l'apprentissage supervisé ────────────────────────
  classer({
    id: "g_1_2_2_famille",
    microskillId: "1.2.2",
    consigne: "De quelle famille d'apprentissage relève cette situation ?",
    familles: FAMILLES_APPRENTISSAGE,
    pool: [
      {
        cas: "On fournit 50 000 photos accompagnées du nom de l'animal qu'elles montrent.",
        famille: "l'apprentissage supervisé",
        pourquoi: "Chaque exemple porte la réponse attendue : c'est la définition du supervisé.",
      },
      {
        cas: "On fournit des milliers de profils clients, sans catégorie, et on demande des groupes.",
        famille: "l'apprentissage non supervisé",
        pourquoi: "Aucune étiquette n'est donnée : le modèle cherche seul des ressemblances.",
      },
      {
        cas: "Un programme joue des millions de parties et reçoit un point à chaque victoire.",
        famille: "l'apprentissage par renforcement",
        pourquoi: "Le retour est une récompense obtenue après action, pas une réponse fournie d'avance.",
      },
      {
        cas: "Un développeur écrit : « si le message contient ce mot, le classer indésirable ».",
        famille: "aucun apprentissage : des règles écrites à la main",
        pourquoi: "La règle est posée par un humain ; rien n'est appris sur des données.",
      },
      {
        cas: "On dispose de radios déjà annotées « sain » ou « anomalie » par des médecins.",
        famille: "l'apprentissage supervisé",
        pourquoi: "Les annotations des médecins sont les étiquettes du supervisé.",
      },
      {
        cas: "Un robot essaie des gestes de préhension et retient ceux qui font tenir l'objet.",
        famille: "l'apprentissage par renforcement",
        pourquoi: "Le succès de la prise sert de récompense : le robot apprend par essais.",
      },
      {
        cas: "On cherche à repérer, dans des relevés bancaires, des opérations qui sortent de l'ordinaire.",
        famille: "l'apprentissage non supervisé",
        pourquoi: "On ne dispose pas d'exemples étiquetés « fraude » : le modèle repère ce qui s'écarte du reste.",
      },
      {
        cas: "Un tableau associe la surface d'un logement au loyer réellement payé.",
        famille: "l'apprentissage supervisé",
        pourquoi: "Le loyer est la valeur à prédire, connue pour chaque exemple.",
      },
    ],
  }),

  // ── 1.2.3 Choisir les étiquettes ─────────────────────────────────────────
  situation({
    id: "g_1_2_3_etiquettes",
    microskillId: "1.2.3",
    consigne: "Quelle étiquette faut-il attacher à chaque exemple ?",
    pool: [
      {
        cas: "Tu veux entraîner une IA à reconnaître si une plante du jardin est malade.",
        bonne: "« saine » ou « malade » sur chaque photo, établi par quelqu'un qui s'y connaît",
        pieges: [
          "le nom de l'espèce de la plante photographiée, ce qui est plus précis",
          "la date et l'heure auxquelles chaque photo a été prise au jardin",
          "la liste des maladies que le modèle devra apprendre à reconnaître",
        ],
        pourquoi: "L'étiquette est la réponse attendue pour CET exemple, pas une information sur l'exemple.",
      },
      {
        cas: "Tu veux entraîner une IA à estimer le temps de trajet d'un bus.",
        bonne: "la durée réellement mise pour chaque trajet déjà effectué",
        pieges: [
          "l'heure de départ et le nom de la ligne empruntée par le bus",
          "le nombre d'arrêts que la ligne compte entre le départ et l'arrivée",
          "la durée annoncée par les horaires officiels de la compagnie",
        ],
        pourquoi:
          "La durée annoncée est une prévision, pas une observation. On étiquette avec ce qui s'est passé.",
      },
      {
        cas: "Tu veux entraîner une IA à repérer les commentaires blessants sur un forum.",
        bonne: "« blessant » ou « acceptable » sur chaque commentaire, jugé par des personnes formées",
        pieges: [
          "le nombre de signalements que chaque commentaire a reçus des lecteurs",
          "la liste des mots interdits que le modèle devra repérer dans le texte",
          "le pseudonyme de la personne qui a écrit chaque commentaire",
        ],
        pourquoi:
          "Le nombre de signalements mesure la réaction du public, pas le caractère blessant du message.",
      },
      {
        cas: "Tu veux entraîner une IA à reconnaître l'écriture manuscrite des chiffres.",
        bonne: "le chiffre que représente réellement chaque image, de 0 à 9",
        pieges: [
          "la couleur de l'encre et le type de papier utilisé pour l'écrire",
          "le nom de la personne qui a écrit chacun des chiffres",
          "les dix chiffres possibles, listés une fois pour toutes",
        ],
        pourquoi: "Une étiquette accompagne CHAQUE exemple. La liste des réponses possibles n'en est pas une.",
      },
      {
        cas: "Tu veux entraîner une IA à prédire si un élève réussira un exercice.",
        bonne: "le résultat réellement obtenu par l'élève à cet exercice",
        pieges: [
          "la note moyenne de l'élève sur l'ensemble du trimestre écoulé",
          "la difficulté de l'exercice, telle que le professeur l'a estimée",
          "le temps que l'élève a passé sur l'exercice avant de répondre",
        ],
        pourquoi:
          "On étiquette avec ce que l'on veut prédire. Le reste, ce sont des informations d'entrée.",
      },
      {
        cas: "Tu veux entraîner une IA à trier des photos du lagon selon qu'on y voit du corail blanchi.",
        bonne: "« corail blanchi » ou « corail sain » sur chaque photo, vérifié sur place",
        pieges: [
          "la profondeur et la température de l'eau au moment de la prise de vue",
          "le nom de la plage où chacune des photos a été prise",
          "la proportion de l'image occupée par le corail visible",
        ],
        pourquoi:
          "La profondeur et la température sont des données d'entrée utiles, mais ce n'est pas la réponse attendue.",
      },
    ],
  }),

  // ── 1.3.1 Prédire avec une régression linéaire ───────────────────────────
  classer({
    id: "g_1_3_1_tache",
    microskillId: "1.3.1",
    consigne: "Quelle tâche cette situation demande-t-elle ?",
    familles: [
      "une régression : prédire un nombre",
      "une classification : prédire une catégorie",
      "un regroupement : rassembler les cas proches",
      "une génération : produire un contenu nouveau",
    ],
    pool: [
      {
        cas: "Estimer le prix d'un logement à partir de sa surface et de son quartier.",
        famille: "une régression : prédire un nombre",
        pourquoi: "Un prix est une valeur chiffrée : c'est une régression.",
      },
      {
        cas: "Décider si un courriel est indésirable ou non.",
        famille: "une classification : prédire une catégorie",
        pourquoi: "Deux catégories possibles : c'est une classification.",
      },
      {
        cas: "Prévoir la température de demain à Saint-Denis.",
        famille: "une régression : prédire un nombre",
        pourquoi: "Une température est un nombre.",
      },
      {
        cas: "Rassembler les clients d'un magasin en profils d'achat, sans savoir lesquels chercher.",
        famille: "un regroupement : rassembler les cas proches",
        pourquoi: "Aucune catégorie n'est fixée d'avance : le modèle forme lui-même les groupes.",
      },
      {
        cas: "Écrire un résumé d'un article à partir de son texte.",
        famille: "une génération : produire un contenu nouveau",
        pourquoi: "On produit un texte qui n'existait pas : c'est de la génération.",
      },
      {
        cas: "Reconnaître l'espèce d'un oiseau photographié parmi douze espèces connues.",
        famille: "une classification : prédire une catégorie",
        pourquoi: "Douze catégories fixées d'avance : classification.",
      },
      {
        cas: "Estimer le nombre de spectateurs attendus au prochain match.",
        famille: "une régression : prédire un nombre",
        pourquoi: "Un effectif est une valeur chiffrée.",
      },
      {
        cas: "Créer une illustration à partir d'une phrase de description.",
        famille: "une génération : produire un contenu nouveau",
        pourquoi: "L'image n'existait pas : elle est produite.",
      },
    ],
  }),

  // ── 1.3.2 Appliquer un arbre de décision ─────────────────────────────────
  situation({
    id: "g_1_3_2_arbre",
    microskillId: "1.3.2",
    consigne: "Que conclut l'arbre ?",
    pool: [
      {
        cas: "Un arbre trie les champignons. Racine : « lamelles blanches ? » Si oui → « anneau sur le pied ? » Si oui → « à écarter ». Si non → « à faire vérifier ». Si lamelles non blanches → « à faire vérifier ».\nTon champignon a des lamelles blanches et un anneau.",
        bonne: "« à écarter »",
        pieges: ["« à faire vérifier »", "l'arbre ne peut pas conclure", "il faut repartir de la racine"],
        pourquoi: "On suit les réponses : lamelles blanches → oui, anneau → oui, donc la feuille « à écarter ».",
      },
      {
        cas: "Un arbre décide d'un arrosage. Racine : « pluie depuis 2 jours ? » Si oui → « ne pas arroser ». Si non → « terre sèche ? » Si oui → « arroser ». Si non → « attendre demain ».\nIl n'a pas plu, et la terre est sèche.",
        bonne: "« arroser »",
        pieges: ["« ne pas arroser »", "« attendre demain »", "l'arbre demande une troisième question"],
        pourquoi: "Pas de pluie → seconde question ; terre sèche → « arroser ».",
      },
      {
        cas: "Un arbre oriente un message. Racine : « expéditeur connu ? » Si oui → « boîte principale ». Si non → « pièce jointe ? » Si oui → « quarantaine ». Si non → « courrier indésirable ».\nL'expéditeur est inconnu, et le message n'a pas de pièce jointe.",
        bonne: "« courrier indésirable »",
        pieges: ["« quarantaine »", "« boîte principale »", "l'arbre le laisse sans décision"],
        pourquoi: "Inconnu → seconde question ; pas de pièce jointe → « courrier indésirable ».",
      },
      {
        cas: "Un arbre conseille une tenue. Racine : « température au-dessus de 25 °C ? » Si oui → « vent fort ? » Si oui → « coupe-vent léger ». Si non → « tee-shirt ». Si température non → « veste ».\nIl fait 28 °C et le vent est fort.",
        bonne: "« coupe-vent léger »",
        pieges: ["« tee-shirt »", "« veste »", "l'arbre propose deux tenues à la fois"],
        pourquoi: "Au-dessus de 25 °C → seconde question ; vent fort → « coupe-vent léger ».",
      },
      {
        cas: "Un arbre trie des photos. Racine : « prise de nuit ? » Si oui → « album Nuit ». Si non → « visage détecté ? » Si oui → « album Portraits ». Si non → « album Paysages ».\nLa photo est prise de jour, sans visage.",
        bonne: "« album Paysages »",
        pieges: ["« album Portraits »", "« album Nuit »", "la photo reste hors album"],
        pourquoi: "De jour → seconde question ; pas de visage → « album Paysages ».",
      },
      {
        cas: "Dans l'arbre d'arrosage, on appelle « feuille » :",
        bonne: "une conclusion comme « arroser » ou « attendre demain »",
        pieges: [
          "une question comme « la terre est-elle sèche ? »",
          "le chemin suivi depuis la racine jusqu'à la fin",
          "un exemple d'entraînement mal classé par l'arbre",
        ],
        pourquoi: "Les nœuds posent les questions, les feuilles portent les conclusions.",
      },
    ],
  }),

  // ── 1.3.3 Fonctionnement des réseaux de neurones ─────────────────────────
  corriger({
    id: "g_1_3_3_reseaux",
    microskillId: "1.3.3",
    pool: [
      {
        affirmation: "Un réseau de neurones artificiels contient de vrais neurones.",
        bonne: "ce sont des unités de calcul : le mot « neurone » n'est qu'une image",
        pieges: [
          "ce sont des composants électroniques conçus pour imiter une cellule nerveuse",
          "ce sont de vrais neurones, mais cultivés en laboratoire et non prélevés",
          "le terme est exact : le réseau reproduit le fonctionnement d'un cerveau",
        ],
        pourquoi:
          "Chaque « neurone » additionne des signaux pondérés. La comparaison au cerveau a inspiré le nom, rien de plus.",
      },
      {
        affirmation: "Pendant l'apprentissage, le réseau ajuste le nombre de ses couches.",
        bonne: "il ajuste les poids : le nombre de couches est fixé avant l'entraînement",
        pieges: [
          "il ajuste les données d'entraînement, qu'il corrige au fil de ses erreurs",
          "il ajuste le nombre de neurones par couche, selon la difficulté rencontrée",
          "il n'ajuste rien : il retient les exemples qu'on lui a présentés",
        ],
        pourquoi:
          "L'architecture est choisie par les concepteurs. L'apprentissage, lui, ne modifie que les poids.",
      },
      {
        affirmation: "Un réseau de neurones comprend ce qu'il traite.",
        bonne: "il calcule des correspondances entre entrées et sorties, sans rien comprendre",
        pieges: [
          "il comprend, mais seulement les données du domaine sur lequel il est entraîné",
          "il comprend le texte, pas les images, qu'il traite comme des nombres",
          "il ne comprend rien et ne peut donc traiter que des chiffres",
        ],
        pourquoi:
          "Le réseau ajuste des poids pour relier des entrées à des sorties. Aucune compréhension n'intervient.",
      },
      {
        affirmation: "Plus un réseau a de couches, meilleur il est.",
        bonne: "au-delà d'un certain point, il apprend le bruit des données au lieu de généraliser",
        pieges: [
          "c'est exact, à condition de disposer d'assez de puissance de calcul",
          "c'est exact pour les images, mais faux pour les textes et les sons",
          "le nombre de couches n'a aucun effet sur la qualité des résultats",
        ],
        pourquoi:
          "Un modèle trop grand pour ses données retient les particularités des exemples au lieu des régularités.",
      },
      {
        affirmation: "Les « poids » d'un réseau sont écrits par les programmeurs.",
        bonne: "ils sont trouvés pendant l'entraînement : personne ne les écrit un par un",
        pieges: [
          "ils sont choisis au départ, puis conservés jusqu'à la fin de l'entraînement",
          "ils sont recopiés d'un modèle plus ancien, déjà entraîné sur la même tâche",
          "ils sont fixés par la loi, pour que les modèles restent comparables",
        ],
        pourquoi:
          "Un grand modèle compte des milliards de poids. Ils sont ajustés automatiquement, jamais saisis.",
      },
      {
        affirmation: "Un réseau de neurones est utile pour tout, y compris un petit tableau de chiffres.",
        bonne: "sur des tableaux de chiffres, un arbre ou une régression font souvent aussi bien et s'expliquent",
        pieges: [
          "c'est exact : c'est le modèle le plus performant dans tous les cas de figure",
          "c'est faux : un réseau ne peut pas traiter de tableaux, seulement des images",
          "cela dépend uniquement du nombre de lignes que compte le tableau",
        ],
        pourquoi:
          "Les réseaux brillent sur les données non structurées. Sur un tableau, un modèle simple est souvent préférable, et lisible.",
      },
    ],
  }),

  // ── 1.3.4 Objectif d'un calcul de régression ─────────────────────────────
  classer({
    id: "g_1_3_4_modele",
    microskillId: "1.3.4",
    consigne: "Quel modèle convient le mieux à cette situation ?",
    familles: FAMILLES_MODELE,
    pool: [
      {
        cas: "Prédire la consommation d'électricité d'un foyer à partir de sa surface et du nombre d'habitants.",
        famille: "une régression",
        pourquoi: "On prédit une valeur chiffrée à partir de variables chiffrées.",
      },
      {
        cas: "Reconnaître un visage sur une photo prise dans la rue.",
        famille: "un réseau de neurones",
        pourquoi: "Une image est une donnée non structurée : c'est le terrain des réseaux de neurones.",
      },
      {
        cas: "Expliquer à un jury, étape par étape, pourquoi un dossier a été refusé.",
        famille: "un arbre de décision",
        pourquoi: "L'arbre se relit comme une suite de questions : c'est le modèle le plus lisible.",
      },
      {
        cas: "Découvrir, sans catégories fixées d'avance, des profils de spectateurs qui se ressemblent.",
        famille: "un regroupement automatique",
        pourquoi: "Aucune étiquette n'est donnée : on cherche des groupes.",
      },
      {
        cas: "Estimer le rendement d'une parcelle de canne à partir de la pluie et de l'ensoleillement.",
        famille: "une régression",
        pourquoi: "Un rendement est un nombre, prédit à partir de mesures.",
      },
      {
        cas: "Transcrire en texte un enregistrement audio d'une réunion.",
        famille: "un réseau de neurones",
        pourquoi: "Le son est une donnée non structurée.",
      },
      {
        cas: "Poser une suite de questions simples pour orienter un patient aux urgences.",
        famille: "un arbre de décision",
        pourquoi: "Une suite de questions menant à une conclusion : c'est exactement un arbre.",
      },
      {
        cas: "Repérer, dans les ventes d'un magasin, des articles souvent achetés ensemble.",
        famille: "un regroupement automatique",
        pourquoi: "On cherche des associations dans les données, sans réponse attendue.",
      },
    ],
  }),
];
