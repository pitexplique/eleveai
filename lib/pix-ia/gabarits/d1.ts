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
  // ── 1.4.1 Le « mot suivant le plus probable » ────────────────────────────
  corriger({
    id: "g_1_4_1_llm",
    microskillId: "1.4.1",
    pool: [
      {
        affirmation: "Quand je pose une question à un agent conversationnel, il cherche la réponse sur Internet.",
        bonne: "il produit sa réponse mot après mot, sans consulter quoi que ce soit — sauf outil ajouté",
        pieges: [
          "il cherche dans une base de réponses que ses concepteurs ont préparées",
          "il cherche sur Internet, mais seulement sur des sites qu'il juge fiables",
          "il cherche dans les conversations que d'autres utilisateurs ont eues avant",
        ],
        pourquoi:
          "Un modèle de langage prédit la suite la plus probable. Certains services y ajoutent une recherche, mais c'est un outil branché à côté, pas le fonctionnement du modèle.",
      },
      {
        affirmation: "Le modèle décide de toute sa réponse, puis l'écrit d'un seul coup.",
        bonne: "il l'écrit morceau par morceau, chacun choisi d'après ce qui précède",
        pieges: [
          "il l'écrit d'un coup, mais la relit ensuite avant de l'afficher",
          "il l'écrit phrase par phrase, en vérifiant chaque phrase terminée",
          "il l'écrit à l'envers, en partant de la conclusion vers le début",
        ],
        pourquoi:
          "Rien n'est décidé à l'avance : chaque morceau dépend de ceux déjà écrits. C'est pour cela que la réponse s'affiche progressivement.",
      },
      {
        affirmation: "Si le modèle choisit le mot le plus probable, il donnera toujours la même réponse.",
        bonne: "il tire parmi les suites probables : deux essais donnent souvent deux réponses",
        pieges: [
          "c'est exact, et c'est pourquoi il faut reformuler pour varier",
          "c'est exact, sauf si la question contient une faute d'orthographe",
          "c'est faux : il donne une réponse différente à chaque mot écrit",
        ],
        pourquoi:
          "Le modèle ne prend pas systématiquement le mot le plus probable : il échantillonne. D'où des réponses différentes à question identique.",
      },
      {
        affirmation: "« Le mot le plus probable », cela veut dire « le mot le plus vrai ».",
        bonne: "probable veut dire fréquent dans les textes vus, ce qui n'a rien à voir avec vrai",
        pieges: [
          "probable veut dire vérifié par une source, donc vrai la plupart du temps",
          "probable veut dire le mot que la majorité des utilisateurs attendent",
          "probable veut dire correct grammaticalement, donc juste dans le contexte",
        ],
        pourquoi:
          "C'est toute la difficulté : une phrase très plausible peut être entièrement fausse. La probabilité porte sur la forme, pas sur les faits.",
      },
      {
        affirmation: "Un modèle de langage connaît le sens des mots qu'il emploie.",
        bonne: "il manipule des régularités entre mots, sans que « sens » entre en jeu",
        pieges: [
          "il connaît le sens des mots courants, appris dans un dictionnaire intégré",
          "il connaît le sens, mais seulement dans la langue de son entraînement",
          "il ne connaît que l'orthographe, et devine le sens à partir du contexte",
        ],
        pourquoi:
          "Le modèle relie des suites de mots à d'autres suites de mots. Cela suffit à produire du texte juste, sans qu'aucune compréhension intervienne.",
      },
      {
        affirmation: "Plus la réponse est longue et détaillée, plus elle est fiable.",
        bonne: "la longueur ne dit rien de la fiabilité : le modèle sait détailler du faux",
        pieges: [
          "c'est exact : détailler oblige le modèle à s'appuyer sur ses données",
          "c'est exact pour les questions de cours, faux pour l'actualité récente",
          "c'est l'inverse : les réponses courtes sont toujours les plus sûres",
        ],
        pourquoi:
          "Une réponse détaillée est simplement une suite plus longue de mots probables. C'est même ce qui rend les erreurs convaincantes.",
      },
    ],
  }),

  // ── 1.4.2 Repérer une hallucination simple ───────────────────────────────
  situation({
    id: "g_1_4_2_hallucination",
    microskillId: "1.4.2",
    consigne: "Quel est le bon réflexe ?",
    pool: [
      {
        cas: "Tu demandes trois sources sur les éruptions du Piton de la Fournaise. L'IA cite un article très précis, avec auteur, revue et année.",
        bonne: "chercher cette référence dans un catalogue avant de l'utiliser",
        pieges: [
          "la citer : une référence aussi précise ne peut pas être inventée",
          "demander à l'IA de confirmer que la référence existe bien",
          "la citer en précisant qu'elle a été trouvée grâce à une IA",
        ],
        pourquoi:
          "Les références inventées sont l'hallucination la plus fréquente, et la précision les rend crédibles. Seule une vérification ailleurs tranche.",
      },
      {
        cas: "L'IA t'annonce que la loi sur le numérique a été votée le 12 mars, avec un chiffre de participation.",
        bonne: "vérifier la date sur un site officiel avant de la reprendre",
        pieges: [
          "la reprendre : une date aussi précise vient forcément d'une source",
          "la reprendre en ajoutant « selon une IA » pour rester honnête",
          "reformuler la question autrement et garder la date qui revient",
        ],
        pourquoi:
          "Reposer la question ne vérifie rien : le modèle peut répéter la même invention. Il faut sortir de l'outil.",
      },
      {
        cas: "Tu demandes le résumé d'un livre que tu as lu. L'IA invente un personnage qui n'y figure pas.",
        bonne: "ne pas utiliser ce résumé, et se fier à ta lecture",
        pieges: [
          "corriger ce détail et garder le reste, qui semble juste",
          "signaler l'erreur à l'IA, ce qui corrigera son résumé",
          "supposer que le personnage existe dans une autre édition",
        ],
        pourquoi:
          "Un résumé qui invente un personnage a pu en inventer d'autres. Une erreur visible signale un texte à ne pas utiliser tel quel.",
      },
      {
        cas: "Pour un exposé, l'IA t'affirme qu'un pays compte 42 millions d'habitants. Le chiffre te semble élevé.",
        bonne: "comparer avec une source statistique publique avant de le citer",
        pieges: [
          "le citer : un chiffre précis est plus fiable qu'un ordre de grandeur",
          "demander à l'IA d'où vient le chiffre, et citer la source qu'elle donne",
          "arrondir le chiffre pour éviter d'avoir à le vérifier",
        ],
        pourquoi:
          "La source citée par le modèle peut elle-même être inventée. Le doute se lève auprès d'un organisme, pas auprès de l'outil.",
      },
      {
        cas: "L'IA t'explique une règle de grammaire avec un exemple qui te paraît faux.",
        bonne: "vérifier la règle dans ton manuel ou auprès de ton professeur",
        pieges: [
          "faire confiance à l'IA : la grammaire est un domaine bien documenté",
          "demander un autre exemple et retenir celui qui te semble juste",
          "conclure que la règle est fausse et l'écarter complètement",
        ],
        pourquoi:
          "Un domaine bien documenté ne met pas à l'abri : le modèle produit du plausible, pas du vérifié.",
      },
      {
        cas: "Une IA te donne la biographie d'une personne peu connue. Deux dates s'y contredisent.",
        bonne: "considérer l'ensemble comme incertain et le vérifier ailleurs",
        pieges: [
          "garder la date qui te semble la plus vraisemblable des deux",
          "demander à l'IA laquelle des deux dates est la bonne",
          "conserver la biographie en retirant simplement les deux dates",
        ],
        pourquoi:
          "Les personnes peu documentées sont là où le modèle invente le plus, faute d'exemples. Une contradiction interne le signale.",
      },
    ],
  }),

  // ── 1.4.3 Les étapes d'entraînement d'un LLM ─────────────────────────────
  classer({
    id: "g_1_4_3_etapes_llm",
    microskillId: "1.4.3",
    consigne: "À quelle étape de la fabrication d'un modèle de langage cela correspond-il ?",
    familles: [
      "le pré-entraînement, sur d'énormes quantités de textes",
      "l'ajustement, sur des exemples de consignes bien suivies",
      "l'alignement, à partir de préférences humaines",
      "l'utilisation, une fois le modèle mis en service",
    ],
    pool: [
      {
        cas: "Le modèle apprend à prédire la suite de milliards de phrases issues du Web.",
        famille: "le pré-entraînement, sur d'énormes quantités de textes",
        pourquoi: "C'est la phase la plus longue et la plus coûteuse : elle donne au modèle sa langue.",
      },
      {
        cas: "On lui montre des milliers de paires « consigne → bonne réponse » rédigées exprès.",
        famille: "l'ajustement, sur des exemples de consignes bien suivies",
        pourquoi: "Le modèle apprend à répondre à une demande, et non à continuer un texte.",
      },
      {
        cas: "Des personnes classent deux réponses de la meilleure à la moins bonne, des milliers de fois.",
        famille: "l'alignement, à partir de préférences humaines",
        pourquoi: "Ces classements servent à orienter le modèle vers des réponses jugées utiles et sûres.",
      },
      {
        cas: "Un élève pose une question et lit la réponse affichée.",
        famille: "l'utilisation, une fois le modèle mis en service",
        pourquoi: "Le modèle applique ce qu'il a appris ; rien ne change dans ses paramètres.",
      },
      {
        cas: "Le modèle acquiert sa grammaire et son vocabulaire en lisant des textes sans consigne.",
        famille: "le pré-entraînement, sur d'énormes quantités de textes",
        pourquoi: "Aucune consigne à ce stade : il apprend seulement à continuer du texte.",
      },
      {
        cas: "On apprend au modèle à refuser une demande dangereuse, d'après des jugements humains.",
        famille: "l'alignement, à partir de préférences humaines",
        pourquoi: "Le refus n'a rien de spontané : il vient de préférences exprimées par des personnes.",
      },
      {
        cas: "Des rédacteurs écrivent des réponses modèles à des questions typiques.",
        famille: "l'ajustement, sur des exemples de consignes bien suivies",
        pourquoi: "Ces réponses modèles servent d'exemples d'un bon comportement face à une consigne.",
      },
      {
        cas: "Le service reçoit un million de questions par jour et y répond.",
        famille: "l'utilisation, une fois le modèle mis en service",
        pourquoi: "Sans réentraînement, l'usage ne modifie pas le modèle.",
      },
    ],
  }),

  // ── 1.4.4 Rôle des humains dans l'entraînement ───────────────────────────
  situation({
    id: "g_1_4_4_humains",
    microskillId: "1.4.4",
    consigne: "Quel rôle des humains cette description montre-t-elle ?",
    pool: [
      {
        cas: "Des milliers de personnes lisent deux réponses d'un modèle et disent laquelle est la meilleure.",
        bonne: "elles fournissent les préférences qui orientent le modèle vers de bonnes réponses",
        pieges: [
          "elles corrigent directement les paramètres que le modèle a mal ajustés",
          "elles vérifient chaque réponse avant qu'elle ne parvienne à l'utilisateur",
          "elles rédigent les réponses que le modèle ressortira ensuite telles quelles",
        ],
        pourquoi:
          "Ces classements ne touchent pas aux paramètres à la main : ils servent de signal pour un nouvel entraînement.",
      },
      {
        cas: "Des personnes examinent des textes violents ou choquants pour marquer ce que le modèle doit refuser.",
        bonne: "elles étiquettent les contenus à écarter, un travail éprouvant et souvent invisible",
        pieges: [
          "elles suppriment ces contenus d'Internet pour que le modèle ne les voie pas",
          "elles programment une règle qui interdit ces contenus au moment de répondre",
          "elles vérifient a posteriori les réponses signalées par les utilisateurs",
        ],
        pourquoi:
          "C'est le travail des modérateurs et annotateurs : réel, pénible, rarement mentionné quand on parle d'IA.",
      },
      {
        cas: "Une équipe rédige des centaines de réponses modèles à des questions courantes.",
        bonne: "elle fournit les exemples qui apprennent au modèle à suivre une consigne",
        pieges: [
          "elle constitue la base de réponses dans laquelle le modèle ira piocher",
          "elle écrit la documentation destinée aux futurs utilisateurs du service",
          "elle teste le modèle en comparant ses réponses aux réponses attendues",
        ],
        pourquoi:
          "Ces exemples servent à l'ajustement : le modèle apprend le comportement, pas les réponses.",
      },
      {
        cas: "Des spécialistes tentent de faire produire au modèle des contenus interdits, pour repérer ses failles.",
        bonne: "ils cherchent les failles avant la mise en service, pour qu'elles soient corrigées",
        pieges: [
          "ils entraînent le modèle à produire ces contenus pour qu'il les reconnaisse",
          "ils vérifient que le modèle respecte bien la réglementation européenne",
          "ils mesurent la performance du modèle sur des questions difficiles",
        ],
        pourquoi:
          "Chercher activement à faire échouer le système est une étape de mise au point, pas un entraînement.",
      },
      {
        cas: "Des personnes vérifient et corrigent les étiquettes d'un jeu de données avant l'entraînement.",
        bonne: "elles préparent les données : un exemple mal étiqueté enseigne une erreur",
        pieges: [
          "elles réduisent la taille des données pour accélérer l'entraînement",
          "elles ajoutent des exemples supplémentaires générés automatiquement",
          "elles répartissent les données entre entraînement et test du modèle",
        ],
        pourquoi:
          "La qualité des étiquettes conditionne tout ce qui suit : le modèle apprend ce qu'on lui montre, erreurs comprises.",
      },
      {
        cas: "Après la mise en service, une équipe suit les signalements des utilisateurs et prépare une nouvelle version.",
        bonne: "elle referme la boucle : les retours nourrissent le prochain entraînement",
        pieges: [
          "elle corrige le modèle en direct, à chaque signalement reçu",
          "elle vérifie que les utilisateurs respectent les conditions du service",
          "elle mesure la fréquentation pour dimensionner les serveurs",
        ],
        pourquoi:
          "Un modèle en service ne change pas tout seul : c'est une nouvelle version, entraînée à nouveau, qui corrige.",
      },
    ],
  }),

  // ── 1.4.5 Sources d'erreur des IA génératives ────────────────────────────
  classer({
    id: "g_1_4_5_source_erreur",
    microskillId: "1.4.5",
    consigne: "D'où vient l'erreur, dans ce cas ?",
    familles: [
      "d'une invention du modèle (hallucination)",
      "d'une erreur ou d'un biais présent dans ses données",
      "de la date : le fait est postérieur à son entraînement",
      "d'une consigne ambiguë, qui autorise plusieurs lectures",
    ],
    pool: [
      {
        cas: "L'IA cite un article scientifique avec un titre et une revue qui n'existent pas.",
        famille: "d'une invention du modèle (hallucination)",
        pourquoi: "Le modèle produit une référence plausible parce qu'elle ressemble à celles qu'il a vues.",
      },
      {
        cas: "Interrogée sur un match joué la semaine dernière, l'IA donne un résultat d'une autre saison.",
        famille: "de la date : le fait est postérieur à son entraînement",
        pourquoi: "Sans outil de recherche, un modèle ne sait rien de ce qui suit son entraînement.",
      },
      {
        cas: "Quand on lui demande d'illustrer « un chef d'entreprise », l'IA décrit systématiquement un homme.",
        famille: "d'une erreur ou d'un biais présent dans ses données",
        pourquoi: "Le déséquilibre vient des textes d'entraînement, qui reflètent la société.",
      },
      {
        cas: "Tu demandes « un résumé court », et l'IA rend une page entière.",
        famille: "d'une consigne ambiguë, qui autorise plusieurs lectures",
        pourquoi: "« Court » n'est pas une mesure. Préciser « en trois phrases » lève l'ambiguïté.",
      },
      {
        cas: "L'IA affirme qu'une ville est la capitale d'un pays, en reprenant une confusion courante.",
        famille: "d'une erreur ou d'un biais présent dans ses données",
        pourquoi: "Une erreur répandue dans les textes se retrouve dans le modèle entraîné dessus.",
      },
      {
        cas: "Tu demandes « parle-moi de Mercure », et l'IA te répond sur le métal.",
        famille: "d'une consigne ambiguë, qui autorise plusieurs lectures",
        pourquoi: "Le mot a plusieurs sens : la consigne ne dit pas lequel.",
      },
      {
        cas: "L'IA invente le nom d'un maire pour une commune dont elle sait peu de choses.",
        famille: "d'une invention du modèle (hallucination)",
        pourquoi: "Là où les exemples manquent, le modèle comble avec ce qui a la bonne forme.",
      },
      {
        cas: "L'IA ignore une loi entrée en vigueur il y a trois mois.",
        famille: "de la date : le fait est postérieur à son entraînement",
        pourquoi: "Les connaissances d'un modèle s'arrêtent à la date de ses données.",
      },
    ],
  }),

  // ── 1.5.1 Recommandation personnalisée ou non ────────────────────────────
  classer({
    id: "g_1_5_1_perso",
    microskillId: "1.5.1",
    consigne: "Cet affichage est-il personnalisé ?",
    familles: [
      "personnalisé : il dépend de ce que TU as fait",
      "non personnalisé : il est le même pour tout le monde",
      "non personnalisé : il suit un ordre fixe, chronologique ou alphabétique",
      "non personnalisé : il dépend d'un paiement de l'annonceur",
    ],
    pool: [
      {
        cas: "La « prochaine vidéo » proposée après celle que tu viens de regarder.",
        famille: "personnalisé : il dépend de ce que TU as fait",
        pourquoi: "Elle est calculée sur ton historique et sur celui de personnes aux goûts proches.",
      },
      {
        cas: "Le classement des dix titres les plus écoutés dans ton pays cette semaine.",
        famille: "non personnalisé : il est le même pour tout le monde",
        pourquoi: "Ce palmarès est identique pour tous les utilisateurs du pays.",
      },
      {
        cas: "Tes messages, affichés du plus récent au plus ancien.",
        famille: "non personnalisé : il suit un ordre fixe, chronologique ou alphabétique",
        pourquoi: "L'ordre est mécanique : aucune préférence n'entre en compte.",
      },
      {
        cas: "L'encart « Sponsorisé » en tête des résultats d'une boutique en ligne.",
        famille: "non personnalisé : il dépend d'un paiement de l'annonceur",
        pourquoi: "La place est achetée. Elle peut être ciblée, mais ce qui la décide est le paiement.",
      },
      {
        cas: "La page d'accueil d'une plateforme vidéo qui te propose « parce que tu as regardé… ».",
        famille: "personnalisé : il dépend de ce que TU as fait",
        pourquoi: "L'intitulé le dit : la proposition découle de ton historique.",
      },
      {
        cas: "La liste des chapitres d'un manuel scolaire en ligne, dans l'ordre du programme.",
        famille: "non personnalisé : il suit un ordre fixe, chronologique ou alphabétique",
        pourquoi: "L'ordre du programme ne dépend d'aucun utilisateur.",
      },
      {
        cas: "Les articles « recommandés pour toi » en bas d'un site d'information.",
        famille: "personnalisé : il dépend de ce que TU as fait",
        pourquoi: "Ces suggestions s'appuient sur les articles que tu as déjà consultés.",
      },
      {
        cas: "La météo de ta commune affichée sur la page d'accueil.",
        famille: "non personnalisé : il est le même pour tout le monde",
        pourquoi:
          "Elle dépend de ta localisation, pas de ton comportement : tous les habitants voient la même chose.",
      },
    ],
  }),

  // ── 1.5.2 Cas d'usage courants de la recommandation ──────────────────────
  classer({
    id: "g_1_5_2_usages",
    microskillId: "1.5.2",
    consigne: "Quelle technique ce service emploie-t-il principalement ?",
    familles: [
      "de la recommandation",
      "de la reconnaissance d'images",
      "de la reconnaissance vocale",
      "de la génération de contenu",
    ],
    pool: [
      {
        cas: "Une plateforme musicale te compose une liste hebdomadaire d'après tes écoutes.",
        famille: "de la recommandation",
        pourquoi: "La sélection est calculée sur ton comportement d'écoute.",
      },
      {
        cas: "Une application identifie une plante à partir d'une photo prise au jardin.",
        famille: "de la reconnaissance d'images",
        pourquoi: "On analyse une image pour y reconnaître une espèce.",
      },
      {
        cas: "Un téléphone écrit sous ta dictée le message que tu prononces.",
        famille: "de la reconnaissance vocale",
        pourquoi: "La parole est transformée en texte.",
      },
      {
        cas: "Un outil produit une illustration à partir d'une phrase que tu écris.",
        famille: "de la génération de contenu",
        pourquoi: "L'image n'existait pas : elle est produite.",
      },
      {
        cas: "Une boutique en ligne affiche « les clients ayant acheté ceci ont aussi aimé… ».",
        famille: "de la recommandation",
        pourquoi: "C'est du filtrage collaboratif : on s'appuie sur des acheteurs aux goûts proches.",
      },
      {
        cas: "Un service de vidéos sous-titre automatiquement une conférence filmée.",
        famille: "de la reconnaissance vocale",
        pourquoi: "Le son est transcrit en texte affiché à l'écran.",
      },
      {
        cas: "Un fil d'actualité met en avant les publications susceptibles de t'intéresser.",
        famille: "de la recommandation",
        pourquoi: "L'ordre du fil est calculé à partir de tes interactions passées.",
      },
      {
        cas: "Une caisse automatique reconnaît les fruits posés sur son plateau.",
        famille: "de la reconnaissance d'images",
        pourquoi: "La caméra analyse l'image pour identifier le produit.",
      },
    ],
  }),

  // ── 1.5.3 Types de données utilisés par la recommandation ────────────────
  situation({
    id: "g_1_5_3_donnees",
    microskillId: "1.5.3",
    consigne: "Quelle donnée pèse le plus dans la recommandation ?",
    pool: [
      {
        cas: "Une plateforme vidéo veut savoir quoi te proposer ensuite.",
        bonne: "le temps que tu passes réellement sur chaque vidéo, et si tu la termines",
        pieges: [
          "le nombre total de vidéos disponibles dans la catégorie que tu regardes",
          "la date de publication des vidéos que la plateforme met en ligne",
          "les informations que tu as saisies dans ton profil à l'inscription",
        ],
        pourquoi:
          "Les traces d'usage pèsent bien plus lourd que le profil déclaré : ce que tu fais en dit plus que ce que tu annonces.",
      },
      {
        cas: "Une plateforme musicale ajuste tes suggestions.",
        bonne: "les morceaux que tu réécoutes, et ceux que tu passes avant la fin",
        pieges: [
          "les genres musicaux que tu as cochés au moment de créer ton compte",
          "la popularité générale des morceaux sortis dans les derniers mois",
          "le nombre d'appareils sur lesquels tu utilises l'application",
        ],
        pourquoi: "Passer un morceau est un signal aussi fort que l'écouter en entier — un signal négatif.",
      },
      {
        cas: "Une boutique en ligne veut t'afficher les bons produits.",
        bonne: "les articles que tu as consultés, mis au panier ou achetés",
        pieges: [
          "la moyenne des notes attribuées aux produits par tous les clients",
          "le prix moyen des articles présents dans le catalogue du site",
          "les catégories que la boutique cherche à mettre en avant ce mois-ci",
        ],
        pourquoi:
          "Consulter sans acheter est déjà une information : le panier abandonné est l'un des signaux les plus exploités.",
      },
      {
        cas: "Un réseau social ordonne ton fil d'actualité.",
        bonne: "ce sur quoi tu t'arrêtes, réagis ou commentes, et pendant combien de temps",
        pieges: [
          "l'ordre dans lequel tes contacts ont publié leurs messages",
          "le nombre d'abonnés de chacun des comptes que tu suis",
          "les centres d'intérêt que tu as déclarés dans tes paramètres",
        ],
        pourquoi:
          "L'arrêt du défilement est mesuré : s'attarder sur une publication suffit à en signaler d'autres du même genre.",
      },
      {
        cas: "Une plateforme veut recommander un film à un nouvel abonné qui n'a encore rien regardé.",
        bonne: "les goûts d'abonnés au profil proche, faute de traces propres à lui",
        pieges: [
          "ses données personnelles : âge, ville et langue de son compte",
          "les films les plus récents ajoutés au catalogue de la plateforme",
          "rien : la plateforme attend qu'il regarde un premier film",
        ],
        pourquoi:
          "C'est le démarrage à froid : sans historique, on s'appuie sur des utilisateurs semblables, puis on affine.",
      },
      {
        cas: "Un service de recommandation d'articles de presse affine ses propositions.",
        bonne: "les articles ouverts, et ceux lus jusqu'au bout plutôt que survolés",
        pieges: [
          "le nombre d'articles que le site publie dans chaque rubrique",
          "l'heure à laquelle tu ouvres habituellement l'application",
          "la longueur moyenne des articles proposés par la rédaction",
        ],
        pourquoi:
          "Ouvrir et lire ne sont pas la même chose : la durée de lecture distingue l'intérêt réel du simple clic.",
      },
    ],
  }),

  // ── 1.5.4 Le risque d'enfermement (bulle de filtre) ──────────────────────
  situation({
    id: "g_1_5_4_bulle",
    microskillId: "1.5.4",
    consigne: "Que se passe-t-il, et que faire ?",
    pool: [
      {
        cas: "Depuis un mois, ton fil ne te propose plus que des vidéos sur un seul sujet.",
        bonne: "c'est une bulle de filtre : aller chercher volontairement d'autres sujets",
        pieges: [
          "c'est une panne de l'algorithme : signaler le problème au service",
          "c'est normal : la plateforme met en avant ce qui marche en ce moment",
          "c'est un réglage : désactiver les notifications pour en voir moins",
        ],
        pourquoi:
          "La personnalisation se renforce d'elle-même : plus tu regardes, plus on t'en propose, moins tu vois autre chose.",
      },
      {
        cas: "Tous les articles que tu vois sur un débat de société défendent le même point de vue.",
        bonne: "c'est une chambre d'écho : chercher ce que disent d'autres sources",
        pieges: [
          "c'est que tout le monde est d'accord sur la question",
          "c'est que les autres points de vue ont été retirés par la plateforme",
          "c'est un hasard : les propositions changeront d'elles-mêmes demain",
        ],
        pourquoi:
          "Ne plus rencontrer de désaccord n'est pas un signe d'unanimité : c'est un signe de filtrage.",
      },
      {
        cas: "Un ami et toi cherchez la même chose au même moment et obtenez des résultats différents.",
        bonne: "c'est la personnalisation : vos historiques ne sont pas les mêmes",
        pieges: [
          "c'est une erreur du moteur, qui devrait donner le même résultat",
          "c'est que l'un de vous deux est connecté et l'autre non",
          "c'est que les résultats changent d'une minute à l'autre",
        ],
        pourquoi:
          "Deux personnes ne voient pas le même Internet, et c'est justement ce qui rend la bulle difficile à repérer seul.",
      },
      {
        cas: "Tu veux sortir de l'enfermement algorithmique sans quitter la plateforme.",
        bonne: "suivre volontairement des sources qui ne te ressemblent pas, et nettoyer ton historique",
        pieges: [
          "t'abonner à davantage de comptes dans les sujets que tu suis déjà",
          "cliquer sur tout ce qui passe pour élargir le champ des propositions",
          "cesser toute interaction jusqu'à ce que les propositions changent",
        ],
        pourquoi:
          "S'abonner à plus de comptes du même domaine resserre la bulle. Il faut y introduire autre chose, et le faire exprès.",
      },
      {
        cas: "Une vidéo qui t'a mis en colère te vaut aussitôt cinq propositions du même genre.",
        bonne: "l'algorithme mesure la réaction, pas l'accord : réagir en attire d'autres",
        pieges: [
          "l'algorithme s'est trompé sur ce que tu aimes, il se corrigera seul",
          "l'algorithme cherche à te faire changer d'avis sur ce sujet",
          "l'algorithme propose ces vidéos à tout le monde en ce moment",
        ],
        pourquoi:
          "Regarder jusqu'au bout parce qu'on n'est pas d'accord est un signal positif pour le système. C'est ce qui rend la colère rentable.",
      },
      {
        cas: "Un adulte te dit qu'il ne voit jamais les contenus dont tu parles avec tes amis.",
        bonne: "vos algorithmes vous servent deux fils différents, à partir d'usages différents",
        pieges: [
          "il n'utilise pas la même application que toi et tes amis",
          "ces contenus sont réservés à une tranche d'âge par la plateforme",
          "il a désactivé les recommandations dans ses paramètres",
        ],
        pourquoi:
          "La bulle explique une part des incompréhensions entre générations : chacun croit voir « ce qui se passe ».",
      },
    ],
  }),

  // ── 1.6.1 Définir un robot et ses grandes fonctions ──────────────────────
  classer({
    id: "g_1_6_1_fonctions",
    microskillId: "1.6.1",
    consigne: "À quelle grande fonction d'un robot cet organe correspond-il ?",
    familles: [
      "percevoir",
      "décider",
      "agir",
      "aucune des trois : c'est de l'alimentation ou de la structure",
    ],
    pool: [
      {
        cas: "Une caméra placée à l'avant du robot.",
        famille: "percevoir",
        pourquoi: "La caméra recueille des informations sur l'environnement.",
      },
      {
        cas: "Le programme qui choisit de contourner l'obstacle par la gauche.",
        famille: "décider",
        pourquoi: "C'est le traitement : il choisit l'action à partir de ce qui a été perçu.",
      },
      {
        cas: "Le moteur qui fait tourner la roue droite.",
        famille: "agir",
        pourquoi: "Un actionneur exécute l'action décidée.",
      },
      {
        cas: "La batterie qui alimente l'ensemble du robot.",
        famille: "aucune des trois : c'est de l'alimentation ou de la structure",
        pourquoi: "Indispensable, mais elle ne perçoit rien, ne décide rien et n'agit pas.",
      },
      {
        cas: "Un capteur de distance qui mesure l'écart avec le mur.",
        famille: "percevoir",
        pourquoi: "Toute mesure prise sur l'environnement relève de la perception.",
      },
      {
        cas: "La pince qui se referme sur l'objet.",
        famille: "agir",
        pourquoi: "La pince est un actionneur : elle modifie le monde.",
      },
      {
        cas: "Le modèle qui reconnaît l'objet et en déduit la prise à employer.",
        famille: "décider",
        pourquoi: "Reconnaître pour choisir une action, c'est la partie décision.",
      },
      {
        cas: "Le châssis en aluminium qui porte les composants.",
        famille: "aucune des trois : c'est de l'alimentation ou de la structure",
        pourquoi: "La structure soutient l'ensemble, sans participer à la boucle.",
      },
    ],
  }),

  // ── 1.6.2 Exemples de robots utilisant l'IA ──────────────────────────────
  classer({
    id: "g_1_6_2_avec_ia",
    microskillId: "1.6.2",
    consigne: "Cette machine utilise-t-elle de l'IA ?",
    familles: [
      "oui : elle s'adapte à ce qu'elle perçoit",
      "non : elle répète un geste réglé une fois pour toutes",
      "non : elle applique une règle simple à un capteur",
      "non : c'est un appareil piloté à distance par un humain",
    ],
    pool: [
      {
        cas: "Un aspirateur qui cartographie la pièce et modifie son trajet selon les obstacles.",
        famille: "oui : elle s'adapte à ce qu'elle perçoit",
        pourquoi: "La carte est construite en roulant, et le trajet recalculé : le comportement dépend de la perception.",
      },
      {
        cas: "Un bras d'usine qui reproduit exactement la même soudure sur chaque pièce.",
        famille: "non : elle répète un geste réglé une fois pour toutes",
        pourquoi: "Le geste est programmé au millimètre. Aucune adaptation, aucune décision.",
      },
      {
        cas: "Une porte de magasin qui s'ouvre quand le détecteur repère un mouvement.",
        famille: "non : elle applique une règle simple à un capteur",
        pourquoi: "« Mouvement détecté, alors j'ouvre » est une règle écrite, pas un apprentissage.",
      },
      {
        cas: "Un drone dirigé en direct par une personne avec une télécommande.",
        famille: "non : c'est un appareil piloté à distance par un humain",
        pourquoi: "Toutes les décisions viennent du pilote : la machine exécute.",
      },
      {
        cas: "Une voiture qui freine seule quand elle reconnaît un piéton devant elle.",
        famille: "oui : elle s'adapte à ce qu'elle perçoit",
        pourquoi: "Reconnaître un piéton dans une image demande un modèle entraîné.",
      },
      {
        cas: "Un radiateur qui se coupe dès que la sonde dépasse 21 °C.",
        famille: "non : elle applique une règle simple à un capteur",
        pourquoi: "Un seuil fixe sur une mesure ne fait pas une IA.",
      },
      {
        cas: "Un robot de tri qui reconnaît le matériau des déchets qui défilent devant lui.",
        famille: "oui : elle s'adapte à ce qu'elle perçoit",
        pourquoi: "La reconnaissance du matériau sur une image est apprise sur des exemples.",
      },
      {
        cas: "Un bras chirurgical qui reproduit fidèlement les gestes du chirurgien qui le manipule.",
        famille: "non : c'est un appareil piloté à distance par un humain",
        pourquoi: "Le robot transmet et stabilise le geste, mais ne décide de rien.",
      },
    ],
  }),

  // ── 1.6.3 Qu'est-ce qu'une IA incarnée ───────────────────────────────────
  corriger({
    id: "g_1_6_3_incarnee",
    microskillId: "1.6.3",
    pool: [
      {
        affirmation: "Une IA incarnée, c'est une IA qui a l'apparence d'un être humain.",
        bonne: "c'est une IA logée dans un objet physique qui perçoit et agit, quelle que soit sa forme",
        pieges: [
          "c'est une IA qui se présente sous la forme d'un personnage animé à l'écran",
          "c'est une IA capable de tenir une conversation comme le ferait une personne",
          "c'est une IA installée sur l'appareil de l'utilisateur plutôt que sur un serveur",
        ],
        pourquoi:
          "Un aspirateur autonome est une IA incarnée. L'apparence humaine n'entre pas dans la définition.",
      },
      {
        affirmation: "Un assistant conversationnel sur téléphone est une IA incarnée.",
        bonne: "il n'agit pas dans le monde physique : il n'y a ni capteur ni actionneur",
        pieges: [
          "il l'est, puisqu'il est installé dans un objet que l'on tient en main",
          "il l'est, puisqu'il perçoit la voix grâce au microphone du téléphone",
          "il ne l'est pas, parce qu'il fonctionne en réalité sur un serveur distant",
        ],
        pourquoi:
          "Percevoir ne suffit pas : l'incarnation suppose d'agir sur le monde, donc des actionneurs.",
      },
      {
        affirmation: "Un robot avec des capteurs est forcément une IA incarnée.",
        bonne: "il faut de plus qu'il DÉCIDE à partir de ce qu'il perçoit, pas qu'il applique un seuil",
        pieges: [
          "il faut de plus qu'il soit relié à Internet pour accéder à un modèle",
          "il faut de plus qu'il puisse se déplacer seul dans son environnement",
          "il faut de plus qu'il apprenne pendant son utilisation, pas avant",
        ],
        pourquoi:
          "Un portail à détecteur a un capteur et un moteur. Sans décision apprise entre les deux, ce n'est pas de l'IA.",
      },
      {
        affirmation: "Ce qui est difficile pour une IA incarnée, c'est de calculer assez vite.",
        bonne: "le plus dur est l'incertitude du monde : les capteurs se trompent et rien ne se répète",
        pieges: [
          "le plus dur est le manque de données d'entraînement pour la robotique",
          "le plus dur est la consommation d'énergie des moteurs qu'elle pilote",
          "le plus dur est de faire tenir le modèle dans la mémoire du robot",
        ],
        pourquoi:
          "Une simulation est propre et reproductible. Le réel est bruité, glissant, encombré : c'est là que ça casse.",
      },
      {
        affirmation: "Une IA incarnée apprend en permanence pendant qu'elle travaille.",
        bonne: "le plus souvent elle applique un modèle déjà entraîné, sans plus rien apprendre",
        pieges: [
          "elle apprend, mais seulement lorsqu'elle échoue à accomplir sa tâche",
          "elle apprend, à condition d'être connectée au serveur du fabricant",
          "elle n'apprend jamais : un robot ne peut pas être réentraîné",
        ],
        pourquoi:
          "Apprendre en service est risqué : une erreur a des conséquences physiques. L'entraînement se fait avant, souvent en simulation.",
      },
      {
        affirmation: "Puisqu'elle agit dans le monde réel, une IA incarnée est plus autonome qu'un logiciel.",
        bonne: "agir physiquement ne rend pas autonome : ses objectifs et ses limites restent fixés par des humains",
        pieges: [
          "c'est exact, et c'est ce qui rend la robotique plus difficile à encadrer",
          "c'est exact, mais seulement pour les robots capables de se déplacer",
          "c'est faux : un robot est toujours moins autonome qu'un logiciel",
        ],
        pourquoi:
          "L'autonomie de mouvement n'est pas l'autonomie de décision. Le but, les règles et l'arrêt d'urgence viennent de personnes.",
      },
    ],
  }),

  // ── 1.6.4 Incertitude du monde réel ──────────────────────────────────────
  situation({
    id: "g_1_6_4_imprevu",
    microskillId: "1.6.4",
    consigne: "Pourquoi est-ce difficile, et que doit faire le robot ?",
    pool: [
      {
        cas: "Un robot livreur entraîné sur trottoir sec rencontre une flaque et des feuilles mouillées.",
        bonne: "le réel diffère de l'entraînement : il doit ralentir et réévaluer en avançant",
        pieges: [
          "ses capteurs sont en panne : il doit s'arrêter et attendre un technicien",
          "il lui manque des données : il doit être réentraîné avant de continuer",
          "la situation est trop rare : il peut l'ignorer et poursuivre son trajet",
        ],
        pourquoi:
          "Aucun entraînement ne couvre tous les cas. La réponse est de percevoir et décider en continu, pas de tout prévoir.",
      },
      {
        cas: "Un aspirateur autonome trouve un objet nouveau au milieu du salon.",
        bonne: "le monde change entre deux passages : il doit mettre sa carte à jour",
        pieges: [
          "sa carte est fausse : il doit recommencer entièrement la cartographie",
          "il doit suivre le trajet appris et contourner l'objet sans le noter",
          "il doit s'arrêter, l'objet n'étant pas prévu dans son programme",
        ],
        pourquoi:
          "Une carte figée devient fausse dès qu'on déplace une chaise. La boucle perception-décision doit tourner sans cesse.",
      },
      {
        cas: "Une voiture autonome roule sous une pluie battante qui brouille ses caméras.",
        bonne: "ses mesures deviennent incertaines : elle doit réduire sa vitesse et sa confiance",
        pieges: [
          "elle doit se fier davantage à la carte, puisque les caméras faiblissent",
          "elle doit poursuivre normalement : les autres capteurs compensent tout",
          "elle doit s'arrêter immédiatement sur la voie où elle se trouve",
        ],
        pourquoi:
          "Un capteur dégradé ne se remplace pas : il oblige à agir plus prudemment, en tenant compte de l'incertitude.",
      },
      {
        cas: "Un bras robotisé doit saisir des fruits de tailles et de fermetés très variables.",
        bonne: "aucun geste unique ne convient : il doit adapter sa prise à ce qu'il perçoit",
        pieges: [
          "il doit employer la prise la plus douce possible pour tous les fruits",
          "il doit trier les fruits par taille avant de commencer à les saisir",
          "il doit répéter le geste appris jusqu'à ce que la prise réussisse",
        ],
        pourquoi:
          "La variabilité est la règle dans le monde réel. Un geste unique casse les fruits mûrs ou lâche les fermes.",
      },
      {
        cas: "Un robot d'accueil, testé dans un couloir vide, se retrouve dans un hall bondé.",
        bonne: "les personnes bougent de façon imprévisible : il doit prévoir large et réagir vite",
        pieges: [
          "il doit demander aux personnes de s'écarter de son passage",
          "il doit reprendre le trajet appris, les personnes finissant par bouger",
          "il doit augmenter sa vitesse pour traverser avant que la foule ne bouge",
        ],
        pourquoi:
          "Le mouvement des autres ne se prédit pas exactement. On garde de la marge et on recalcule souvent.",
      },
      {
        cas: "Un drone agricole entraîné en simulation vole pour la première fois par vent latéral.",
        bonne: "la simulation ne reproduit pas tout : il doit corriger sa trajectoire en continu",
        pieges: [
          "la simulation était fausse : il faut la refaire avant tout nouveau vol",
          "il doit voler plus haut, le vent étant plus faible en altitude",
          "il doit attendre au sol que le vent tombe complètement",
        ],
        pourquoi:
          "L'écart entre simulation et réel est le problème central de la robotique apprenante. On le comble en corrigeant en vol.",
      },
    ],
  }),
];
