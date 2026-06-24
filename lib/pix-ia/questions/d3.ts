import type { PixQuestion } from "../questionTypes";

// Domaine 3 — Enjeux du développement de l'IA. Paliers novice/indépendant.
// Plusieurs variantes par microskill (rejouabilité / anti-répétition).
export const d3Questions: PixQuestion[] = [
  // ── 3.1 Empreinte environnementale ───────────────────────────────────────
  {
    microskillId: "3.1.1",
    text: "Pourquoi les IA génératives grand public consomment-elles beaucoup d'énergie ?",
    choices: [
      "elles tournent sur d'immenses centres de calcul gourmands en électricité",
      "elles fonctionnent à l'énergie solaire gratuite",
      "elles n'utilisent aucune énergie",
      "elles marchent à la main",
    ],
  },
  {
    microskillId: "3.1.1",
    text: "Les serveurs qui font tourner l'IA consomment de l'électricité surtout pour :",
    choices: [
      "le calcul et le refroidissement des machines",
      "allumer des lampes décoratives",
      "imprimer des documents",
      "recharger des téléphones",
    ],
  },
  {
    microskillId: "3.1.1",
    text: "Un « supercalculateur » utilisé pour l'IA, c'est :",
    choices: [
      "une infrastructure de calcul très puissante et énergivore",
      "une grosse calculatrice de poche",
      "un simple téléphone",
      "un panneau solaire",
    ],
  },
  {
    microskillId: "3.1.2",
    text: "L'entraînement d'une grande IA générative :",
    choices: [
      "demande énormément de calculs, donc beaucoup d'énergie",
      "ne consomme rien du tout",
      "se fait sans aucun ordinateur",
      "prend à peine une seconde",
    ],
  },
  {
    microskillId: "3.1.2",
    text: "La phase la plus coûteuse en énergie d'un grand modèle est souvent :",
    choices: [
      "son entraînement initial sur d'énormes données",
      "son installation sur ton téléphone",
      "le choix de son nom",
      "son logo",
    ],
  },
  {
    microskillId: "3.1.3",
    text: "Quelle piste permet de réduire l'impact environnemental de l'IA ?",
    choices: [
      "l'« IA frugale » : des modèles plus économes en calculs",
      "faire tourner l'IA 24h/24 inutilement",
      "multiplier les modèles inutiles",
      "augmenter volontairement la consommation",
    ],
  },
  {
    microskillId: "3.1.3",
    text: "Réutiliser et partager des modèles déjà entraînés permet :",
    choices: [
      "d'éviter de refaire des entraînements coûteux en énergie",
      "d'augmenter la pollution",
      "de ralentir tous les ordinateurs",
      "de supprimer Internet",
    ],
  },
  {
    microskillId: "3.1.4",
    text: "La fabrication des composants des supercalculateurs nécessite :",
    choices: [
      "des ressources naturelles rares (lithium, cobalt, terres rares)",
      "uniquement de l'eau de pluie",
      "rien de particulier",
      "seulement du papier recyclé",
    ],
  },
  {
    microskillId: "3.1.4",
    text: "L'extraction des matériaux rares pour le matériel d'IA a des conséquences :",
    choices: [
      "environnementales et sociales (pollution, conditions d'extraction)",
      "uniquement positives",
      "totalement nulles",
      "seulement esthétiques",
    ],
  },

  // ── 3.2 Gouvernance ──────────────────────────────────────────────────────
  {
    microskillId: "3.2.1",
    text: "L'utilisation de l'IA :",
    choices: [
      "fait l'objet de règles fixées par des États, des entreprises et des organisations internationales",
      "n'est encadrée par personne",
      "est décidée uniquement par les robots",
      "est interdite partout dans le monde",
    ],
  },
  {
    microskillId: "3.2.1",
    text: "En Europe, une loi spécifique encadre l'IA. Elle s'appelle :",
    choices: [
      "l'IA Act (règlement européen sur l'IA)",
      "la loi Turing",
      "le pacte des robots",
      "le code de la route",
    ],
  },
  {
    microskillId: "3.2.2",
    text: "Aujourd'hui, la plupart des grandes plateformes d'IA sont :",
    choices: [
      "contrôlées par un petit nombre d'entreprises situées dans quelques pays",
      "réparties équitablement dans le monde entier",
      "gérées par les élèves",
      "gratuites et sans aucun propriétaire",
    ],
  },
  {
    microskillId: "3.2.2",
    text: "La « souveraineté numérique » désigne l'enjeu de :",
    choices: [
      "garder le contrôle sur des technologies aussi influentes que l'IA",
      "fabriquer des drapeaux",
      "augmenter le nombre d'écrans",
      "réduire la taille des fichiers",
    ],
  },
  {
    microskillId: "3.2.3",
    text: "Dire qu'une IA contient des « valeurs encodées » signifie :",
    choices: [
      "que des choix humains (ce qui est acceptable, pertinent…) sont intégrés dans son fonctionnement",
      "qu'elle a un prix en euros",
      "qu'elle est totalement neutre, sans aucun choix",
      "qu'elle parle plusieurs langues",
    ],
  },
  {
    microskillId: "3.2.3",
    text: "Quand une IA filtre des informations ou note des profils, elle s'appuie sur :",
    choices: [
      "des choix implicites ou explicites faits par des humains",
      "le hasard pur, sans aucun choix",
      "la météo du jour",
      "rien du tout",
    ],
  },
  {
    microskillId: "3.2.4",
    text: "« Gouverner » l'IA, c'est :",
    choices: [
      "décider collectivement des règles, des limites et des obligations de transparence",
      "éteindre tous les ordinateurs",
      "laisser faire sans aucune règle",
      "uniquement vendre des IA",
    ],
  },
  {
    microskillId: "3.2.4",
    text: "Évaluer un usage de l'IA avec la grille de l'IA Act revient à :",
    choices: [
      "juger son niveau de risque (minime, limité, élevé, interdit)",
      "mesurer sa vitesse d'affichage",
      "compter ses utilisateurs",
      "choisir sa couleur",
    ],
  },

  // ── 3.3 Éthique et transparence ──────────────────────────────────────────
  {
    microskillId: "3.3.1",
    text: "Si une décision prise par une IA cause un dommage, cela pose la question :",
    choices: [
      "de la responsabilité : qui est responsable de l'erreur ?",
      "de la couleur du logiciel",
      "de la marque du téléphone",
      "d'aucune question particulière",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "Un principe éthique important pour une IA est :",
    choices: [
      "la transparence et la non-discrimination",
      "aller le plus vite possible",
      "coûter le moins cher",
      "avoir le plus d'utilisateurs",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Le RGPD et l'IA Act sont des cadres qui servent à :",
    choices: [
      "protéger les personnes et encadrer l'usage des données et de l'IA",
      "accélérer les téléphones",
      "vendre plus de logiciels",
      "noter les élèves",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "L'IA Act européen classe les systèmes d'IA selon :",
    choices: [
      "leur niveau de risque (minime, limité, élevé, interdit)",
      "leur couleur",
      "leur prix de vente",
      "leur popularité sur les réseaux",
    ],
  },

  // ── 3.4 Emploi et formation ──────────────────────────────────────────────
  {
    microskillId: "3.4.1",
    text: "Avec l'automatisation permise par l'IA :",
    choices: [
      "certaines tâches et certains métiers peuvent disparaître ou se transformer",
      "rien ne change jamais",
      "tous les humains deviennent des robots",
      "le travail devient interdit",
    ],
  },
  {
    microskillId: "3.4.1",
    text: "Face à l'IA, les compétences attendues dans les métiers :",
    choices: [
      "évoluent, d'où un besoin de se former tout au long de la vie",
      "ne changent jamais",
      "disparaissent complètement",
      "deviennent inutiles",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "L'IA fait aussi :",
    choices: [
      "apparaître de nouveaux métiers (conception, supervision, analyse de l'IA)",
      "disparaître absolument tous les métiers",
      "interdire toute formation",
      "supprimer l'école",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "Parmi ces métiers, lequel est lié au développement de l'IA ?",
    choices: [
      "spécialiste qui supervise et améliore des modèles d'IA",
      "boulanger d'autrefois",
      "facteur à cheval",
      "allumeur de réverbères",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "Derrière l'entraînement des IA, on trouve souvent :",
    choices: [
      "des humains qui étiquettent et vérifient des données (les « travailleurs du clic »)",
      "uniquement des robots entièrement autonomes",
      "absolument personne",
      "des extraterrestres",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "Les « travailleurs du clic » réalisent souvent :",
    choices: [
      "des tâches répétitives (étiquetage, modération) parfois mal payées",
      "uniquement des métiers très bien rémunérés",
      "le pilotage des avions",
      "la conception des lois",
    ],
  },

  // ── 3.5 Enjeux culturels et sociétaux ────────────────────────────────────
  {
    microskillId: "3.5.1",
    text: "Une IA peut parfois :",
    choices: [
      "reproduire des discriminations présentes dans ses données",
      "être toujours parfaitement neutre",
      "ressentir de la haine",
      "choisir volontairement d'être méchante",
    ],
  },
  {
    microskillId: "3.5.1",
    text: "Les biais d'une IA viennent surtout :",
    choices: [
      "des données d'entraînement, qui reflètent la société",
      "de sa couleur",
      "de la marque du serveur",
      "du jour de la semaine",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Pourquoi une IA peut-elle associer un métier à un seul genre (« infirmière », « ingénieur ») ?",
    choices: [
      "parce qu'elle apprend sur des données qui contiennent déjà ces stéréotypes",
      "parce qu'elle a un avis personnel",
      "parce que c'est obligatoire",
      "parce qu'elle a été punie",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Les biais d'une IA sont le plus souvent :",
    choices: [
      "involontaires, mais avec des conséquences bien réelles",
      "toujours voulus par les ingénieurs",
      "sans aucune conséquence",
      "impossibles à exister",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Pourquoi de fausses informations se répandent-elles parfois très vite en ligne ?",
    choices: [
      "les algorithmes de recommandation favorisent les contenus qui font le plus réagir",
      "parce que les gens vérifient toujours tout",
      "parce que c'est interdit",
      "parce qu'Internet est trop lent",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Les contenus qui se diffusent le plus vite sont souvent :",
    choices: [
      "ceux qui font le plus réagir, vrais ou faux",
      "uniquement les contenus vérifiés",
      "les plus ennuyeux",
      "ceux que personne ne regarde",
    ],
  },

  // ── Renfort (rejouabilité) : compétences 3.3 / 3.4 / 3.5 ──────────────────
  {
    microskillId: "3.3.1",
    text: "Si une voiture autonome cause un accident, une question importante est :",
    choices: [
      "qui est juridiquement responsable (constructeur, conducteur… ?)",
      "la couleur de la voiture",
      "la marque des pneus",
      "la météo du jour",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "L'« explicabilité » d'une IA, c'est :",
    choices: [
      "pouvoir expliquer comment elle arrive à sa décision",
      "sa vitesse d'affichage",
      "son prix d'achat",
      "sa couleur",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "Un système d'IA « transparent » est un système :",
    choices: [
      "dont on peut comprendre le fonctionnement et les critères",
      "qui est invisible à l'écran",
      "qui n'a jamais de bugs",
      "qui est forcément gratuit",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Le RGPD protège surtout :",
    choices: [
      "les données personnelles des individus",
      "la vitesse d'Internet",
      "le prix des logiciels",
      "la couleur des sites web",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Une appli d'IA jugée à « risque élevé » par l'IA Act (santé, justice…) doit :",
    choices: [
      "respecter des obligations strictes",
      "être obligatoirement gratuite",
      "être la plus rapide possible",
      "changer de logo",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "La reconnaissance faciale de masse ou la notation sociale posent surtout des questions de :",
    choices: [
      "libertés individuelles et de droits fondamentaux",
      "couleur d'écran",
      "autonomie de batterie",
      "taille des fichiers",
    ],
  },
  {
    microskillId: "3.4.1",
    text: "L'automatisation par l'IA touche surtout :",
    choices: [
      "des tâches répétitives, qui peuvent être prises en charge par des machines",
      "uniquement les métiers d'art",
      "absolument aucune tâche",
      "seulement le sport de haut niveau",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "Avec l'IA, un nouveau besoin qui apparaît est :",
    choices: [
      "former et accompagner les gens à utiliser ces outils",
      "interdire toute technologie",
      "supprimer les écoles",
      "arrêter d'apprendre",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "La modération de contenus sur les grandes plateformes repose souvent sur :",
    choices: [
      "des humains qui visionnent et filtrent des contenus",
      "uniquement des robots parfaits",
      "absolument personne",
      "des animaux dressés",
    ],
  },
  {
    microskillId: "3.5.1",
    text: "Un logiciel de tri de CV entraîné sur des données biaisées peut :",
    choices: [
      "défavoriser injustement certains profils de candidats",
      "être forcément équitable",
      "lire dans les pensées",
      "créer des emplois tout seul",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Pour limiter les biais d'une IA, il faut surtout agir sur :",
    choices: [
      "la qualité et la diversité des données d'entraînement",
      "la couleur de l'écran",
      "le nom du logiciel",
      "la vitesse du Wi-Fi",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Pourquoi est-il important de vérifier une information virale ?",
    choices: [
      "parce que les contenus très partagés ne sont pas forcément vrais",
      "parce que le nombre de partages prouve la vérité",
      "parce que c'est interdit par la loi",
      "parce que c'est forcément toujours faux",
    ],
  },
];
