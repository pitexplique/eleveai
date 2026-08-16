import type { PixQuestion } from "../questionTypes";

// Domaine 3 — Enjeux du développement de l'IA. Paliers novice/indépendant.
// Plusieurs variantes par microskill (rejouabilité / anti-répétition).
//
// ⚠️ Distracteurs : des erreurs que les élèves font vraiment, de longueur
// comparable à la bonne réponse. Voir l'en-tête de d1.ts et le contrôle
// scripts/verifier-devinabilite.mjs.
// Le domaine 3 y était le plus exposé : sur des sujets de société, la bonne
// réponse est nuancée — donc longue — et les faux choix tombaient dans la
// caricature (« des extraterrestres », « ressentir de la haine », « la couleur
// du logiciel »). Une caricature ne se coche pas : elle montre du doigt.
export const d3Questions: PixQuestion[] = [
  // ── 3.1 Empreinte environnementale ───────────────────────────────────────
  {
    microskillId: "3.1.1",
    text: "Pourquoi les IA génératives grand public consomment-elles beaucoup d'énergie ?",
    choices: [
      "elles tournent sur d'immenses centres de calcul, gourmands en électricité",
      "elles doivent rester connectées en permanence à l'ensemble du réseau",
      "chaque utilisateur fait tourner une copie du modèle sur son appareil",
      "elles conservent l'historique de toutes les conversations échangées",
    ],
  },
  {
    microskillId: "3.1.1",
    text: "Les serveurs qui font tourner l'IA consomment de l'électricité surtout pour :",
    choices: [
      "le calcul lui-même et le refroidissement des machines",
      "le stockage des données et leur sauvegarde régulière",
      "le transport des données jusqu'à l'appareil de l'utilisateur",
      "l'éclairage et la climatisation des bâtiments qui les abritent",
    ],
  },
  {
    microskillId: "3.1.1",
    text: "Un « supercalculateur » utilisé pour l'IA, c'est :",
    choices: [
      "un ensemble de machines de calcul très puissant et énergivore",
      "un ordinateur unique, beaucoup plus rapide que les autres",
      "un serveur qui stocke les données servant à entraîner le modèle",
      "le réseau qui relie entre eux les centres de données du monde",
    ],
  },
  {
    microskillId: "3.1.2",
    text: "L'entraînement d'une grande IA générative :",
    choices: [
      "demande énormément de calculs, donc beaucoup d'énergie",
      "coûte peu : c'est l'usage quotidien qui pèse le plus lourd",
      "se fait une fois par jour pour tenir le modèle à jour",
      "consomme surtout de l'espace de stockage, pas de l'énergie",
    ],
  },
  {
    microskillId: "3.1.2",
    text: "La phase la plus coûteuse en énergie d'un grand modèle est souvent :",
    choices: [
      "son entraînement initial, sur d'énormes quantités de données",
      "chaque réponse qu'il produit lorsqu'un utilisateur l'interroge",
      "la mise à jour de ses connaissances au fil de l'actualité",
      "la vérification de ses réponses par des relecteurs humains",
    ],
  },
  {
    microskillId: "3.1.3",
    text: "Quelle piste permet de réduire l'impact environnemental de l'IA ?",
    choices: [
      "l'« IA frugale » : des modèles plus petits et plus économes",
      "installer les centres de calcul dans des pays plus froids",
      "faire tourner les modèles la nuit, quand la demande baisse",
      "compresser les données pour qu'elles occupent moins de place",
    ],
  },
  {
    microskillId: "3.1.3",
    text: "Réutiliser et partager des modèles déjà entraînés permet :",
    choices: [
      "d'éviter de refaire des entraînements coûteux en énergie",
      "de réduire la place occupée par les données d'entraînement",
      "d'obtenir des réponses plus rapides pour l'utilisateur final",
      "de garantir que les modèles ne contiennent pas de biais",
    ],
  },
  {
    microskillId: "3.1.4",
    text: "La fabrication des composants des supercalculateurs nécessite :",
    choices: [
      "des ressources naturelles rares : lithium, cobalt, terres rares",
      "surtout du silicium, un matériau abondant et facile à extraire",
      "des matériaux recyclés provenant des anciens équipements",
      "peu de matières premières, mais beaucoup de main-d'œuvre",
    ],
  },
  {
    microskillId: "3.1.4",
    text: "L'extraction des matériaux rares pour le matériel d'IA a des conséquences :",
    choices: [
      "environnementales et sociales : pollution, conditions d'extraction",
      "surtout économiques : elle fait varier le prix des équipements",
      "limitées, car ces matériaux s'extraient en très petites quantités",
      "temporaires, car le recyclage remplace aujourd'hui l'extraction",
    ],
  },

  // ── 3.2 Gouvernance ──────────────────────────────────────────────────────
  {
    microskillId: "3.2.1",
    text: "L'utilisation de l'IA :",
    choices: [
      "obéit à des règles fixées par des États et des organisations",
      "relève des seules conditions d'utilisation de chaque service",
      "dépend uniquement des choix de l'entreprise qui l'a conçue",
      "suit une norme technique unique, adoptée dans le monde entier",
    ],
  },
  {
    microskillId: "3.2.1",
    text: "En Europe, une loi spécifique encadre l'IA. Elle s'appelle :",
    choices: [
      "l'IA Act, le règlement européen sur l'intelligence artificielle",
      "le RGPD, qui a été étendu à l'intelligence artificielle en 2024",
      "le Digital Services Act, qui encadre les services numériques",
      "la directive européenne sur le droit d'auteur et les données",
    ],
  },
  {
    microskillId: "3.2.2",
    text: "Aujourd'hui, la plupart des grandes plateformes d'IA sont :",
    choices: [
      "contrôlées par quelques entreprises, dans un petit nombre de pays",
      "réparties de façon assez équilibrée entre les grandes régions",
      "développées par des universités et des laboratoires publics",
      "gérées par des organisations internationales sans but lucratif",
    ],
  },
  {
    microskillId: "3.2.2",
    text: "La « souveraineté numérique » désigne l'enjeu de :",
    choices: [
      "garder la maîtrise de technologies aussi influentes que l'IA",
      "protéger les données personnelles des habitants d'un pays",
      "assurer à chacun un accès égal aux services numériques",
      "faire respecter les lois nationales sur Internet",
    ],
  },
  {
    microskillId: "3.2.3",
    text: "Dire qu'une IA contient des « valeurs encodées » signifie :",
    choices: [
      "que des choix humains sont intégrés dans son fonctionnement",
      "qu'elle applique une charte éthique déclarée par son éditeur",
      "qu'elle a appris seule ce qui est acceptable et ce qui ne l'est pas",
      "que ses réponses sont vérifiées par un comité avant publication",
    ],
  },
  {
    microskillId: "3.2.3",
    text: "Quand une IA filtre des informations ou note des profils, elle s'appuie sur :",
    choices: [
      "des choix, implicites ou explicites, faits par des humains",
      "des critères objectifs, établis à partir des seules données",
      "une réglementation commune à l'ensemble des plateformes",
      "un classement calculé sans intervention humaine possible",
    ],
  },
  {
    microskillId: "3.2.4",
    text: "« Gouverner » l'IA, c'est :",
    choices: [
      "décider ensemble des règles, des limites et de la transparence exigée",
      "contrôler techniquement ce que chaque modèle a le droit de produire",
      "confier à une autorité unique l'autorisation de mettre en service",
      "obliger les entreprises à publier le code source de leurs modèles",
    ],
  },
  {
    microskillId: "3.2.4",
    text: "Évaluer un usage de l'IA avec la grille de l'IA Act revient à :",
    choices: [
      "juger son niveau de risque : minime, limité, élevé ou interdit",
      "vérifier qu'il respecte les règles de protection des données",
      "mesurer sa fiabilité à partir des erreurs qu'il a commises",
      "classer le secteur d'activité auquel cet usage appartient",
    ],
  },

  // ── 3.3 Éthique et transparence ──────────────────────────────────────────
  {
    microskillId: "3.3.1",
    text: "Si une décision prise par une IA cause un dommage, cela pose la question :",
    choices: [
      "de la responsabilité : qui doit répondre de cette erreur ?",
      "de la fiabilité : le modèle était-il assez bien entraîné ?",
      "de la transparence : l'utilisateur savait-il qu'il parlait à une IA ?",
      "de la sécurité : le système avait-il été correctement protégé ?",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "Un principe éthique important pour une IA est :",
    choices: [
      "la transparence et la non-discrimination",
      "la rapidité et la disponibilité permanente",
      "la gratuité et l'ouverture du code source",
      "la précision et l'absence totale d'erreur",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Le RGPD et l'IA Act sont des cadres qui servent à :",
    choices: [
      "protéger les personnes et encadrer l'usage des données et de l'IA",
      "harmoniser les techniques employées par les systèmes d'IA européens",
      "garantir que les systèmes d'IA ne commettent aucune erreur grave",
      "financer la recherche européenne en intelligence artificielle",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "L'IA Act européen classe les systèmes d'IA selon :",
    choices: [
      "leur niveau de risque : minime, limité, élevé ou interdit",
      "leur domaine d'application : santé, éducation, transport",
      "leur degré d'autonomie vis-à-vis de la décision humaine",
      "la quantité de données personnelles qu'ils manipulent",
    ],
  },

  // ── 3.4 Emploi et formation ──────────────────────────────────────────────
  {
    microskillId: "3.4.1",
    text: "Avec l'automatisation permise par l'IA :",
    choices: [
      "certaines tâches et certains métiers se transforment ou disparaissent",
      "les métiers manuels disparaissent, les métiers intellectuels résistent",
      "le nombre total d'emplois diminue mécaniquement dans tous les secteurs",
      "seuls les métiers créés récemment sont concernés par les changements",
    ],
  },
  {
    microskillId: "3.4.1",
    text: "Face à l'IA, les compétences attendues dans les métiers :",
    choices: [
      "évoluent, d'où le besoin de se former tout au long de la vie",
      "se réduisent, la machine prenant en charge le plus difficile",
      "se limitent désormais à savoir se servir des outils numériques",
      "restent stables : seuls les outils employés changent vraiment",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "L'IA fait aussi :",
    choices: [
      "apparaître des métiers : conception, supervision, analyse des modèles",
      "revenir des métiers anciens que l'automatisation avait fait disparaître",
      "disparaître le besoin de formation, les outils devenant plus simples",
      "converger tous les métiers du numérique vers un seul profil technique",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "Parmi ces métiers, lequel est lié au développement de l'IA ?",
    choices: [
      "spécialiste qui supervise et améliore des modèles d'IA",
      "technicien qui installe et entretient les réseaux d'un site",
      "administrateur qui gère les sauvegardes d'une base de données",
      "intégrateur qui met en forme les pages d'un site internet",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "Derrière l'entraînement des IA, on trouve souvent :",
    choices: [
      "des humains qui étiquettent et vérifient les données",
      "des programmes qui produisent seuls les données voulues",
      "les utilisateurs, dont chaque question corrige le modèle",
      "des chercheurs qui écrivent à la main les règles à suivre",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "Les « travailleurs du clic » réalisent souvent :",
    choices: [
      "des tâches répétitives d'étiquetage ou de modération, parfois mal payées",
      "des tâches de programmation, dans les équipes qui conçoivent les modèles",
      "des tâches de vérification confiées à des spécialistes du domaine traité",
      "des tâches ponctuelles, proposées en complément d'un emploi principal",
    ],
  },

  // ── 3.5 Enjeux culturels et sociétaux ────────────────────────────────────
  {
    microskillId: "3.5.1",
    text: "Une IA peut parfois :",
    choices: [
      "reproduire des discriminations présentes dans ses données",
      "corriger d'elle-même les inégalités que montrent ses données",
      "rester neutre, puisqu'elle ne fait que calculer des probabilités",
      "détecter les discriminations et prévenir ses utilisateurs",
    ],
  },
  {
    microskillId: "3.5.1",
    text: "Les biais d'une IA viennent surtout :",
    choices: [
      "des données d'entraînement, qui reflètent la société",
      "des erreurs de programmation commises par les ingénieurs",
      "des questions que les utilisateurs lui posent chaque jour",
      "du manque de puissance de calcul au moment de l'entraînement",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Pourquoi une IA peut-elle associer un métier à un seul genre (« infirmière », « ingénieur ») ?",
    choices: [
      "parce qu'elle apprend sur des données qui portent déjà ce stéréotype",
      "parce que la langue française impose un genre à ces noms de métiers",
      "parce qu'elle choisit le mot le plus courant, sans jamais se tromper",
      "parce que ses concepteurs ont fixé cette règle pour simplifier le texte",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Les biais d'une IA sont le plus souvent :",
    choices: [
      "involontaires, mais avec des conséquences bien réelles",
      "voulus, car ils rendent les réponses plus naturelles à lire",
      "repérés à l'entraînement, puis corrigés avant la mise en service",
      "sans effet, tant que le modèle est utilisé avec discernement",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Pourquoi de fausses informations se répandent-elles parfois très vite en ligne ?",
    choices: [
      "les algorithmes mettent en avant les contenus qui font le plus réagir",
      "les fausses informations sont publiées bien plus souvent que les vraies",
      "les plateformes n'ont aucun moyen technique de repérer un faux contenu",
      "les vraies informations sont publiées plus tard, après vérification",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Les contenus qui se diffusent le plus vite sont souvent :",
    choices: [
      "ceux qui font le plus réagir, qu'ils soient vrais ou faux",
      "ceux qui viennent des comptes ayant le plus d'abonnés",
      "ceux qui sont publiés au moment où le public est connecté",
      "ceux qui traitent d'un sujet déjà présent dans l'actualité",
    ],
  },

  // ── Renfort (rejouabilité) : compétences 3.3 / 3.4 / 3.5 ──────────────────
  {
    microskillId: "3.3.1",
    text: "Si une voiture autonome cause un accident, une question importante est :",
    choices: [
      "qui en est juridiquement responsable : constructeur, conducteur ?",
      "si le système avait bien été mis à jour avant de prendre la route",
      "si les autres véhicules impliqués étaient eux aussi autonomes",
      "si le conducteur avait été formé à l'usage de ce type de véhicule",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "L'« explicabilité » d'une IA, c'est :",
    choices: [
      "pouvoir expliquer comment elle est arrivée à sa décision",
      "pouvoir consulter les données sur lesquelles elle s'est entraînée",
      "pouvoir lui demander de justifier sa réponse en langage courant",
      "pouvoir refaire le même calcul et retrouver le même résultat",
    ],
  },
  {
    microskillId: "3.3.1",
    text: "Un système d'IA « transparent » est un système :",
    choices: [
      "dont on peut connaître le fonctionnement et les critères",
      "dont le code source est publié et librement consultable",
      "qui indique à l'utilisateur qu'il s'adresse à une machine",
      "qui affiche le degré de certitude de chacune de ses réponses",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Le RGPD protège surtout :",
    choices: [
      "les données personnelles des individus",
      "les créations protégées par le droit d'auteur",
      "les utilisateurs contre les contenus illicites",
      "les entreprises contre le vol de leurs données",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "Une appli d'IA jugée à « risque élevé » par l'IA Act (santé, justice…) doit :",
    choices: [
      "respecter des obligations strictes avant sa mise en service",
      "être autorisée au cas par cas par une autorité nationale",
      "faire l'objet d'un contrôle humain sur chacune de ses décisions",
      "afficher un avertissement à chaque utilisation par le public",
    ],
  },
  {
    microskillId: "3.3.2",
    text: "La reconnaissance faciale de masse ou la notation sociale posent surtout des questions de :",
    choices: [
      "libertés individuelles et de droits fondamentaux",
      "fiabilité technique des systèmes de reconnaissance",
      "coût pour les administrations qui les mettent en place",
      "protection des données contre le vol et le piratage",
    ],
  },
  {
    microskillId: "3.4.1",
    text: "L'automatisation par l'IA touche surtout :",
    choices: [
      "des tâches répétitives, qu'une machine peut prendre en charge",
      "les métiers les moins qualifiés, quels que soient leurs gestes",
      "les emplois de bureau, plus que ceux de l'industrie ou des services",
      "les métiers récents, apparus avec le développement du numérique",
    ],
  },
  {
    microskillId: "3.4.2",
    text: "Avec l'IA, un nouveau besoin qui apparaît est :",
    choices: [
      "former et accompagner les gens à l'usage de ces outils",
      "recruter davantage de spécialistes du développement logiciel",
      "réduire le temps de travail que l'automatisation libère",
      "remplacer les formations existantes par des cours en ligne",
    ],
  },
  {
    microskillId: "3.4.3",
    text: "La modération de contenus sur les grandes plateformes repose souvent sur :",
    choices: [
      "des humains qui visionnent et filtrent les contenus signalés",
      "des systèmes automatiques, sans intervention humaine derrière",
      "les signalements des utilisateurs, traités automatiquement",
      "des règles fixées par la loi et appliquées par une autorité",
    ],
  },
  {
    microskillId: "3.5.1",
    text: "Un logiciel de tri de CV entraîné sur des données biaisées peut :",
    choices: [
      "écarter injustement certains profils de candidats",
      "réduire les inégalités en jugeant sur les seules compétences",
      "signaler de lui-même que sa sélection manque de diversité",
      "corriger les biais à mesure qu'il traite de nouveaux dossiers",
    ],
  },
  {
    microskillId: "3.5.2",
    text: "Pour limiter les biais d'une IA, il faut surtout agir sur :",
    choices: [
      "la qualité et la diversité des données d'entraînement",
      "la puissance de calcul consacrée à l'entraînement du modèle",
      "le nombre de personnes qui participent à sa mise au point",
      "la longueur des réponses que le modèle est autorisé à donner",
    ],
  },
  {
    microskillId: "3.5.3",
    text: "Pourquoi est-il important de vérifier une information virale ?",
    choices: [
      "parce qu'un contenu très partagé n'est pas pour autant vrai",
      "parce qu'un contenu très partagé a souvent été déformé en route",
      "parce que les plateformes suppriment ensuite les contenus faux",
      "parce qu'une information virale est presque toujours inventée",
    ],
  },
];
