import type { PixQuestion } from "../questionTypes";

// Domaine 3 — Enjeux du développement de l'IA. Paliers novice/indépendant.
export const d3Questions: PixQuestion[] = [
  // 3.1 Empreinte environnementale
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
    microskillId: "3.1.4",
    text: "La fabrication des composants des supercalculateurs nécessite :",
    choices: [
      "des ressources naturelles rares (lithium, cobalt, terres rares)",
      "uniquement de l'eau de pluie",
      "rien de particulier",
      "seulement du papier recyclé",
    ],
  },

  // 3.2 Gouvernance
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
    microskillId: "3.2.4",
    text: "« Gouverner » l'IA, c'est :",
    choices: [
      "décider collectivement des règles, des limites et des obligations de transparence",
      "éteindre tous les ordinateurs",
      "laisser faire sans aucune règle",
      "uniquement vendre des IA",
    ],
  },

  // 3.3 Éthique et transparence
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
    microskillId: "3.3.2",
    text: "L'IA Act européen classe les systèmes d'IA selon :",
    choices: [
      "leur niveau de risque (minime, limité, élevé, interdit)",
      "leur couleur",
      "leur prix de vente",
      "leur popularité sur les réseaux",
    ],
  },

  // 3.4 Emploi et formation
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
    microskillId: "3.4.3",
    text: "Derrière l'entraînement des IA, on trouve souvent :",
    choices: [
      "des humains qui étiquettent et vérifient des données (les « travailleurs du clic »)",
      "uniquement des robots entièrement autonomes",
      "absolument personne",
      "des extraterrestres",
    ],
  },

  // 3.5 Enjeux culturels et sociétaux
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
    microskillId: "3.5.3",
    text: "Pourquoi de fausses informations se répandent-elles parfois très vite en ligne ?",
    choices: [
      "les algorithmes de recommandation favorisent les contenus qui font le plus réagir",
      "parce que les gens vérifient toujours tout",
      "parce que c'est interdit",
      "parce qu'Internet est trop lent",
    ],
  },
];
