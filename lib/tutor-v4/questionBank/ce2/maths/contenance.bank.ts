// lib/tutor-v4/questionBank/ce2/maths/contenance.bank.ts
//
// Les contenances du CE2, écrites à la main. Troisième et dernière notion de
// mesure à quitter le constructeur commun ce soir, après les longueurs et les
// masses. Elles partagent la même ossature — connaître les unités, les
// relations, comparer, résoudre — et le même piège.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités L, dL et cL, et
// les relations 1 L = 10 dL = 100 cL. Trois interdits :
//   — pas de millilitre au cycle 2 : le programme s'arrête au centilitre ;
//   — pas de tableau de conversion : on passe par les relations connues ;
//   — pas d'écriture à virgule. On écrit « 1 L 50 cL », jamais « 1,5 L ».
//
// LE PIÈGE DE LA NOTION, en deux couches. Celui des nombres d'abord, le même
// qu'en longueurs et en masses : « 75 cL est plus grand que 1 L, parce que 75
// est plus grand que 1. » Et celui du regard ensuite, propre aux liquides :
// une bouteille haute et fine paraît contenir plus qu'un saladier large et
// bas. La forme du récipient ne dit rien de sa contenance.
//
// ⛔ PAS DE CANVAS `contenance` SUR LES COMPARAISONS. La variante
// « comparaison » remplit les bouteilles selon les valeurs et écrit « gauche
// contient plus » : elle donne la réponse avant que l'élève ait converti. Et la
// variante « conversion » affiche « 1 L = 1000 mL », hors programme au CE2. On
// n'utilise donc que la variante « objets », qui se contente de montrer les
// récipients.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { ContenanceCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { choix, de, gabarit, maj, pick, pl, quelquun, rint, type Etoile, type Q } from "./outils-mesures-ce2";
import { comparer, estimer, relations, sansArticle, unites, type Grandeur } from "./grandeurs-ce2";

function contenanceCanvas(
  data: Omit<ContenanceCanvasData, "kind">,
): ContenanceCanvasData {
  return { kind: "contenance", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const contenanceBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_CONTENANCE_UNITES — connaître L, dL et cL
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure-t-on avec un litre ?",
    format: "qcm",
    choices: [
      "ce qu'un récipient peut contenir",
      "la longueur d'un objet",
      "la masse d'un objet",
      "le temps qui passe",
    ],
    expected: ["ce qu'un récipient peut contenir"],
    comparator: "mcq_exact",
    hint: "Regarde ce qui est écrit sur une bouteille d'eau.",
    explanation: exp(
      "La contenance, c'est la quantité de liquide qu'un récipient peut contenir.",
      "On cherche ce qu'on verse : de l'eau, du jus, du lait.",
      "Une bouteille marquée 1 L peut contenir un litre d'eau. On ne mesure pas une longueur avec un litre : pour cela on prend le mètre.",
      "Le litre mesure ce qu'un récipient peut contenir.",
    ),
    tags: ["ce2", "contenance", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi le litre, le décilitre et le centilitre, quelle est la plus PETITE unité ?",
    format: "qcm",
    choices: ["le centilitre", "le décilitre", "le litre", "elles sont pareilles"],
    expected: ["le centilitre"],
    comparator: "mcq_exact",
    hint: "« Centi » annonce cent parts : plus on partage, plus c'est petit.",
    explanation: exp(
      "Les trois unités de contenance du CE2 se rangent ainsi : centilitre, décilitre, litre.",
      "On écoute le début du mot : « déci » veut dire dix, « centi » veut dire cent.",
      "1 L partagé en 10 donne des décilitres, partagé en 100 donne des centilitres. Plus on partage, plus la part est petite : le centilitre est le plus petit.",
      "La plus petite est le centilitre.",
    ),
    tags: ["ce2", "contenance", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une bouteille de sirop, on lit « 75 cL ». Que veut dire cL ?",
    format: "qcm",
    choices: ["centilitre", "centimètre", "centigramme", "kilolitre"],
    expected: ["centilitre"],
    comparator: "mcq_exact",
    hint: "Le L majuscule à la fin annonce toujours des litres.",
    explanation: exp(
      "Le L majuscule à la fin d'une abréviation annonce une contenance.",
      "On lit l'abréviation en deux morceaux : ce qu'il y a devant, puis le L.",
      "« cL » se lit centilitre. Le m de cm annoncerait des mètres, le g de cg des grammes : c'est la dernière lettre qui dit ce qu'on mesure.",
      "cL veut dire centilitre.",
    ),
    tags: ["ce2", "contenance", "unites", "reunion", "piege", "qcm"],
  },


  /* =========================================================
     CE2_CONTENANCE_RELATIONS — 1 L = 10 dL = 100 cL
     Le micro-intitulé du BO dit exactement cela. Le piège :
     confondre le décilitre et le centilitre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centilitres dans 1 litre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "« Centi » veut dire cent.",
    explanation: exp(
      "1 litre vaut 100 centilitres.",
      "On écoute le début du mot : « centi » annonce cent.",
      "Un litre partagé en 100 parts égales donne des centilitres. Une bouteille de 100 cL contient donc exactement 1 L.",
      "1 L = 100 cL.",
    ),
    tags: ["ce2", "contenance", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de décilitres dans 1 litre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "« Déci » veut dire dix.",
    explanation: exp(
      "1 litre vaut 10 décilitres.",
      "On écoute le début du mot : « déci » annonce dix.",
      "Un litre partagé en 10 parts égales donne des décilitres. Un décilitre, c'est à peu près un petit verre.",
      "1 L = 10 dL.",
    ),
    tags: ["ce2", "contenance", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 L = 10 cL ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 L = 100 cL",
      "oui",
      "non, 1 L = 1000 cL",
      "non, 1 L = 10 L",
    ],
    expected: ["non, 1 L = 100 cL"],
    comparator: "mcq_exact",
    hint: "10 cL, c'est un demi-verre. Un litre en remplit bien plus.",
    explanation: exp(
      "1 litre vaut 100 centilitres, et 10 décilitres.",
      "On vérifie en écoutant le début du mot : « déci » c'est dix, « centi » c'est cent.",
      "Il a confondu les deux : 1 L = 10 dL, mais 1 L = 100 cL. Une bouteille de 75 cL ne fait pas encore un litre, il lui manque 25 cL.",
      "Non : 1 L = 100 cL.",
    ),
    tags: ["ce2", "contenance", "relations", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONTENANCE_COMPARER — comparer des contenances
     Deux pièges se croisent ici : le nombre (75 cL contre
     1 L) et la forme du récipient (haut et fin contre large
     et bas).
     ⛔ Aucun canvas de comparaison : il pencherait la réponse.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui contient le plus : 1 L ou 75 cL ?",
    format: "qcm",
    choices: ["1 L", "75 cL", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 L"],
    comparator: "mcq_exact",
    hint: "Écris les deux contenances dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux contenances qu'après les avoir écrites dans la même unité.",
      "On choisit la plus petite unité des deux et on convertit.",
      "1 L = 100 cL. Or 100 cL est plus que 75 cL. Le nombre 75 est plus grand que 1, mais il compte des centilitres, pas des litres : il manque 25 cL à la bouteille pour faire un litre.",
      "1 L contient plus que 75 cL.",
    ),
    tags: ["ce2", "contenance", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "On verse toute l'eau d'une bouteille haute et fine dans un saladier large et bas. Le saladier est presque vide. Y a-t-il moins d'eau qu'avant ?",
    format: "qcm",
    choices: [
      "non, c'est la même quantité d'eau",
      "oui, il y en a moins",
      "oui, il y en a plus",
      "on ne peut pas savoir",
    ],
    expected: ["non, c'est la même quantité d'eau"],
    comparator: "mcq_exact",
    hint: "As-tu enlevé de l'eau en versant ?",
    explanation: exp(
      "Verser un liquide d'un récipient à un autre ne change pas sa quantité.",
      "On se demande si on a ajouté ou enlevé quelque chose pendant le transvasement.",
      "Rien n'a été enlevé : c'est la même eau. Elle paraît moins haute parce que le saladier est large, mais si on la reverse dans la bouteille, elle remonte au même niveau.",
      "Non, c'est exactement la même quantité d'eau.",
    ),
    tags: ["ce2", "contenance", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Kevin a une gourde de 5 dL, Malia une bouteille de 75 cL. Qui peut emporter le plus d'eau ?",
    format: "qcm",
    choices: ["Malia", "Kevin", "ils ont la même quantité", "on ne peut pas savoir"],
    expected: ["Malia"],
    comparator: "mcq_exact",
    hint: "Passe les décilitres en centilitres : 1 dL = 10 cL.",
    explanation: exp(
      "On ne compare deux contenances qu'après les avoir écrites dans la même unité.",
      "On convertit tout en centilitres, la plus petite unité des deux.",
      "5 dL = 50 cL, car 1 dL vaut 10 cL. On compare alors 50 cL et 75 cL : Malia emporte 25 cL de plus.",
      "C'est Malia qui peut emporter le plus d'eau.",
    ),
    tags: ["ce2", "contenance", "comparer", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_CONTENANCE_PROBLEME — un problème de contenances
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Pour la kermesse de l'école, on prépare du jus de goyavier. On verse 2 L de jus et 50 cL d'eau. Combien de centilitres de boisson en tout ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Passe les litres en centilitres avant d'additionner.",
    explanation: exp(
      "On n'additionne des contenances que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "2 L = 200 cL. Puis 200 + 50 = 250.",
      "Il y a 250 cL de boisson, soit 2 L 50 cL.",
    ),
    tags: ["ce2", "contenance", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un arrosoir contient 5 L. On arrose deux plants avec 80 cL chacun. Combien de centilitres reste-t-il dans l'arrosoir ?",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Cherche d'abord ce qui a été versé sur les deux plants.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On convertit l'arrosoir en centilitres, on calcule ce qui a été versé, puis on soustrait.",
      "5 L = 500 cL. Les deux plants ont reçu 80 + 80 = 160 cL. Il reste 500 - 160 = 340 cL.",
      "Il reste 340 cL dans l'arrosoir.",
    ),
    tags: ["ce2", "contenance", "probleme", "deux_etapes"],
  },

  /* =========================================================
     CE2_CONTENANCE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves mesurent la même bouteille. Léa écrit 50 cL, Kevin écrit 5 dL, Malia écrit un demi-litre. Qui a raison ?",
    format: "qcm",
    choices: [
      "les trois : c'est la même contenance",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Kevin seulement",
    ],
    expected: ["les trois : c'est la même contenance"],
    comparator: "mcq_exact",
    hint: "Écris les trois contenances en centilitres.",
    explanation: exp(
      "Une même contenance peut s'écrire de plusieurs façons.",
      "On ramène tout à la même unité, ici le centilitre.",
      "5 dL = 50 cL, car 1 dL vaut 10 cL. Et un demi-litre, c'est la moitié de 100 cL, donc 50 cL. Les trois écritures disent la même chose.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "contenance", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu as une bouteille de 1 L. Tu remplis trois verres de 25 cL. Peux-tu encore remplir un quatrième verre de 25 cL ?",
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cL",
      "oui, et il en restera encore",
      "non, la bouteille est déjà vide",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois verres de 25 cL ? Compare au litre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a versé à ce qu'on avait au départ.",
      "On convertit la bouteille en centilitres, puis on compte ce qui a déjà été versé.",
      "1 L = 100 cL. Trois verres font 3 × 25 = 75 cL. Il reste 100 - 75 = 25 cL : exactement de quoi remplir le quatrième.",
      "Oui, tout juste : quatre verres de 25 cL font pile 1 L.",
    ),
    tags: ["ce2", "contenance", "defi", "qcm"],
  },
];

/* =========================================================
   LES GABARITS (10/11/2026)
   ⛔ Avant : une phrase par gabarit, 7 à 17 squelettes par micro,
   13 à 17 répétitions sur 20. Les familles communes aux trois
   grandeurs sont dans `grandeurs-ce2.ts` ; ici, la fiche de la
   contenance (L, dL, cL, des récipients d'enfant) et les problèmes.
   ⛔ Jamais la variante `conversion` : elle imprime « 1 L = 1000 mL ».
========================================================= */

const CONTENANCE: Grandeur = {
  notionId: "contenance",
  mot: "contenance",
  laGrandeur: "une contenance",
  unites: [
    { sym: "cL", nom: "centilitre", le: "le centilitre", base: 1 },
    { sym: "dL", nom: "décilitre", le: "le décilitre", base: 10 },
    { sym: "L", nom: "litre", le: "le litre", base: 100 },
  ],
  instrument: "un verre doseur",
  verbe: "contient",
  infinitif: "mesurer ce que contient",
  avecQuelle: "Avec quelle unité mesure-t-on ce que contient",
  sup: { m: "qui contient le plus", f: "qui contient le plus" },
  questionPlus: "Qu'est-ce qui contient le plus",
  supports: [
    { le: "la bouteille de jus", un: "une bouteille de jus", f: true, icon: "🧃", grand: "L", petit: "cL", max: 2 },
    { le: "le seau", un: "un seau", icon: "🪣", grand: "L", petit: "dL", max: 9 },
    { le: "l'arrosoir", un: "un arrosoir", icon: "🪴", grand: "L", petit: "dL", max: 9 },
    { le: "le bidon d'eau", un: "un bidon d'eau", icon: "🛢️", grand: "L", petit: "cL", max: 5 },
    { le: "la carafe de sirop", un: "une carafe de sirop", f: true, icon: "🫖", grand: "L", petit: "cL", max: 2 },
    { le: "la casserole de soupe", un: "une casserole de soupe", f: true, icon: "🍲", grand: "L", petit: "dL", max: 4 },
    { le: "l'aquarium", un: "un aquarium", icon: "🐠", grand: "L", petit: "dL", max: 9 },
    { le: "le bol de lait", un: "un bol de lait", icon: "🥣", grand: "dL", petit: "cL", max: 5 },
    { le: "le verre de jus d'orange", un: "un verre de jus d'orange", icon: "🥛", grand: "dL", petit: "cL", max: 3 },
    { le: "la tasse de chocolat", un: "une tasse de chocolat", f: true, icon: "☕", grand: "dL", petit: "cL", max: 3 },
    { le: "le biberon du chaton", un: "un biberon", icon: "🍼", grand: "dL", petit: "cL", max: 2 },
    { le: "la bassine", un: "une bassine", f: true, icon: "🫧", grand: "L", petit: "dL", max: 9 },
    { le: "le chaudron de soupe du dragon", un: "un chaudron de soupe", icon: "🐉", grand: "L", petit: "cL", max: 5 },
    { le: "la gourde de randonnée", un: "une gourde", f: true, icon: "🥤", grand: "L", petit: "cL", max: 2 },
  ],
  objets: [
    { nom: "une cuillère à soupe", quoi: "une cuillère à soupe", valeur: 1, unite: "cL", icon: "🥄" },
    { nom: "un verre", quoi: "un verre", valeur: 20, unite: "cL", icon: "🥛" },
    { nom: "une grande bouteille d'eau", quoi: "une grande bouteille d'eau", valeur: 1, unite: "L", icon: "🍶" },
    { nom: "un seau", quoi: "un seau", valeur: 10, unite: "L", icon: "🪣" },
    { nom: "une baignoire", quoi: "une baignoire", valeur: 150, unite: "L", icon: "🛁" },
    { nom: "une tasse", quoi: "une tasse", valeur: 25, unite: "cL", icon: "☕" },
    { nom: "une canette", quoi: "une canette", valeur: 33, unite: "cL", icon: "🥫" },
    { nom: "un arrosoir", quoi: "un arrosoir", valeur: 5, unite: "L", icon: "🪴" },
    { nom: "une gourde", quoi: "une gourde", valeur: 50, unite: "cL", icon: "🥤" },
    { nom: "un aquarium", quoi: "un aquarium", valeur: 30, unite: "L", icon: "🐠" },
    { nom: "un biberon", quoi: "un biberon", valeur: 2, unite: "dL", icon: "🍼" },
    { nom: "une casserole", quoi: "une casserole", valeur: 2, unite: "L", icon: "🍲" },
    { nom: "un pot de yaourt", quoi: "un pot de yaourt", valeur: 12, unite: "cL", icon: "🥛" },
    { nom: "une piscine gonflable", quoi: "une piscine gonflable", valeur: 500, unite: "L", icon: "🏊" },
  ],
  cartes: (items) =>
    contenanceCanvas({
      variant: "objets",
      objets: items.map((i) => ({ label: i.label, icon: i.icon, contenance: i.valeur })),
      display: { showContenances: items.some((i) => i.valeur), showLabels: true },
    }),
};

/* ---------------------------------------------------------
   PROBLÈMES DE CONTENANCES
--------------------------------------------------------- */

const BOISSONS: readonly { a: string; b: string; ou: string; icon: string; icon2: string }[] = [
  { a: "jus de pomme", b: "eau pétillante", ou: "pour le goûter de la classe", icon: "🧃", icon2: "💧" },
  { a: "lait", b: "chocolat chaud", ou: "pour le petit-déjeuner du camping", icon: "🥛", icon2: "☕" },
  { a: "sirop de grenadine", b: "eau", ou: "pour la kermesse", icon: "🍹", icon2: "💧" },
  { a: "soupe de potiron", b: "bouillon", ou: "pour la cantine", icon: "🍲", icon2: "🥣" },
  { a: "jus d'orange", b: "jus de citron", ou: "pour l'anniversaire de Lou", icon: "🍊", icon2: "🍋" },
  { a: "potion verte", b: "potion bleue", ou: "dans le chaudron de la sorcière", icon: "🧪", icon2: "🫧" },
  { a: "limonade", b: "sirop de menthe", ou: "pour la fête du cirque", icon: "🍋", icon2: "🌿" },
  { a: "eau", b: "engrais liquide", ou: "dans l'arrosoir du jardinier", icon: "💧", icon2: "🌱" },
  { a: "lait", b: "crème", ou: "pour les crêpes du chef", icon: "🥛", icon2: "🥄" },
  { a: "eau de mer", b: "eau douce", ou: "dans l'aquarium des poissons-clowns", icon: "🌊", icon2: "💧" },
];

function contenanceTotale(e: Etoile): Q {
  const b = pick(BOISSONS);
  const p = quelquun();
  const L = rint(1, e === 2 ? 3 : 5);
  const cl = e === 2 ? pick([10, 20, 25, 50, 75]) : rint(11, 95);
  const total = L * 100 + cl;
  const bonne = `${total} cL`;
  return {
    text: `${pick([
      `${p.nom} verse ${L} L ${de(b.a)} et ${cl} cL ${de(b.b)} ${b.ou}.`,
      `On mélange ${L} L ${de(b.a)} avec ${cl} cL ${de(b.b)} ${b.ou}.`,
      `${b.ou.charAt(0).toUpperCase() + b.ou.slice(1)}, ${p.nom} prépare ${L} L ${de(b.a)} et ${cl} cL ${de(b.b)}.`,
    ])} ${pick([
      "Combien de centilitres cela fait-il en tout ?",
      "Quelle quantité en tout, en centilitres ?",
      "Écris la quantité totale en centilitres.",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [`${L + cl} cL`, `${Number(`${L}${cl}`)} cL`, `${L * 10 + cl} cL`, `${total + 100} cL`, `${L * 1000 + cl} cL`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour additionner deux contenances, on les écrit dans la même unité. 1 L = 100 cL.",
      "On change les litres en centilitres, puis on ajoute.",
      `${L} L = ${L * 100} cL ; ${L * 100} + ${cl} = ${total}.`,
      `Cela fait ${bonne}.`,
    ),
    canvas: CONTENANCE.cartes!([
      { label: b.a, icon: b.icon, valeur: `${L} L` },
      { label: b.b, icon: b.icon2, valeur: `${cl} cL` },
    ]),
  };
}

/** Un groupe et l'adulte qui le fait boire. */
const GROUPES: readonly { qui: string; chef: string }[] = [
  { qui: "joueurs de l'équipe de football", chef: "L'entraîneur" },
  { qui: "élèves de la classe", chef: "La maîtresse" },
  { qui: "artistes du cirque", chef: "Le clown Pipo" },
  { qui: "enfants de la colonie", chef: "L'animatrice" },
  { qui: "pirates du bateau", chef: "La capitaine" },
  { qui: "danseuses du spectacle", chef: "Le professeur de danse" },
  { qui: "pompiers de la caserne", chef: "Le chef des pompiers" },
  { qui: "invités de l'anniversaire", chef: "Le papa de Zoé" },
];
const QUI_BOIT = GROUPES.map((g) => g.qui);

function resteDansLeRecipient(): Q {
  const s = pick(CONTENANCE.supports.filter((x) => x.petit === "cL" && x.grand === "L"));
  const L = rint(1, Math.max(1, Math.min(5, s.max)));
  const v1 = pick([10, 15, 20, 25, 30]);
  const nb = rint(2, 3);
  const reste = L * 100 - nb * v1;
  if (reste <= 0) return resteDansLeRecipient();
  const p = quelquun();
  const bonne = `${reste} cL`;
  return {
    text: `${maj(s.le)} contient ${L} L. ${pick([
      `${p.nom} remplit ${nb} verres de ${v1} cL.`,
      `${p.nom} verse ${nb} gobelets de ${v1} cL pour ses amis.`,
      `Au goûter, on sert ${nb} tasses de ${v1} cL.`,
      `${p.nom} et ses copains boivent ${nb} verres de ${v1} cL.`,
      `Pour le pique-nique, ${p.nom} remplit ${nb} petites gourdes de ${v1} cL.`,
    ])} ${pick([
      "Combien de centilitres reste-t-il ?",
      "Quelle quantité reste-t-il, en centilitres ?",
      `Combien de centilitres reste-t-il dans ${s.le} ?`,
    ])}`,
    format: "qcm",
    choices: choix(bonne, [`${L * 100 - v1} cL`, `${L * 10 - nb * v1 > 0 ? L * 10 - nb * v1 : reste + 20} cL`, `${reste + v1} cL`, `${nb * v1} cL`, `${reste - 10} cL`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "1 L = 100 cL.",
      "On écrit tout en centilitres, puis on enlève ce qu'on a versé.",
      `${L} L = ${L * 100} cL ; ${nb} × ${v1} = ${nb * v1} cL ; ${L * 100} − ${nb * v1} = ${reste}.`,
      `Il reste ${bonne}.`,
    ),
    canvas: CONTENANCE.cartes!([
      { label: maj(sansArticle(s.le)), icon: s.icon, valeur: `${L} L` },
      ...Array.from({ length: nb }, () => ({ label: "verre", icon: "🥛", valeur: `${v1} cL` })),
    ]),
  };
}

function combienDeVerres(): Q {
  const L = rint(1, 5);
  const v = pick([10, 20, 25, 50]);
  const nb = (L * 100) / v;
  const qui = pick(QUI_BOIT);
  const [s, quoi, verres, verre] = pick([
    ["Un bidon", "de jus de pomme", "verres", "verre"],
    ["Une grande carafe", "de limonade", "verres", "verre"],
    ["Une fontaine", "d'eau fraîche", "gobelets", "gobelet"],
    ["Un chaudron", "de soupe", "bols", "bol"],
    ["Une grosse bouteille", "de lait", "verres", "verre"],
    ["Une marmite", "de chocolat chaud", "tasses", "tasse"],
  ] as const);
  const u = (x: number) => pl(x, verre, verres);
  return {
    text: `${s} ${quoi} contient ${L} L. ${pick([
      `Combien de ${verres} de ${v} cL peut-on remplir ?`,
      `On sert les ${qui} dans des ${verres} de ${v} cL. Combien de ${verres} peut-on remplir ?`,
      `Pour les ${qui}, on remplit des ${verres} de ${v} cL. Combien de ${verres} remplira-t-on ?`,
    ])}`,
    format: "qcm",
    choices: choix(u(nb), [(L * 10) / v >= 1 && Number.isInteger((L * 10) / v) ? (L * 10) / v : nb + 2, nb + 1, nb * 2, L * v, nb - 1].map(u)),
    expected: [u(nb)],
    comparator: "mcq_exact",
    explanation: exp(
      "1 L = 100 cL.",
      "On écrit la contenance en centilitres, puis on cherche combien de fois un verre y tient.",
      `${L} L = ${L * 100} cL ; ${v} × ${nb} = ${L * 100}.`,
      `On remplit ${nb} ${verres}.`,
    ),
    canvas: CONTENANCE.cartes!([
      { label: s.replace(/^(Un|Une) /, "").replace("grosse ", "").replace("grande ", ""), icon: "🛢️", valeur: `${L} L` },
      { label: verres.replace(/s$/, ""), icon: verres === "bols" ? "🥣" : verres === "tasses" ? "☕" : "🥛", valeur: `${v} cL` },
    ]),
  };
}

function boissonDuGroupe(): Q {
  const L = rint(3, 9);
  const v = pick([10, 20, 25]);
  const nb = rint(8, Math.floor((L * 100) / v) - 1);
  const reste = L * 100 - nb * v;
  const { qui, chef: p } = pick(GROUPES);
  return {
    text: `${p} remplit un bidon de ${L} L. ${nb} ${qui} boivent chacun ${v} cL. ${pick([
      "Combien de centilitres reste-t-il dans le bidon ?",
      "Quelle quantité reste-t-il, en centilitres ?",
    ])}`,
    format: "qcm",
    choices: choix(`${reste} cL`, [`${nb * v} cL`, `${L * 10 - nb * v > 0 ? L * 10 - nb * v : reste + 50} cL`, `${reste + v} cL`, `${reste + 100} cL`]),
    expected: [`${reste} cL`],
    comparator: "mcq_exact",
    explanation: exp(
      "1 L = 100 cL.",
      "On calcule ce qui est bu, en centilitres, puis on l'enlève au bidon.",
      `${nb} × ${v} = ${nb * v} cL ; ${L} L = ${L * 100} cL ; ${L * 100} − ${nb * v} = ${reste}.`,
      `Il reste ${reste} cL.`,
    ),
    canvas: CONTENANCE.cartes!([
      { label: "bidon", icon: "🛢️", valeur: `${L} L` },
      { label: `${nb} verres`, icon: "🥛", valeur: `${v} cL chacun` },
    ]),
  };
}

/* ---------------------------------------------------------
   LES GABARITS, micro par micro
--------------------------------------------------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q) {
  return gabarit({ id, notionId: "contenance", microId, difficulty, hint, tags }, generate);
}

const C_UNI = "ce2_contenance_unites";
const C_REL = "ce2_contenance_relations";
const C_CMP = "ce2_contenance_comparer";
const C_PRO = "ce2_contenance_probleme";
const C_DEF = "ce2_contenance_defi";

contenanceBank.push(
  gab(`${C_UNI}_tpl_4`, C_UNI, 1, "Le litre mesure ce qu'un récipient peut contenir. Du plus petit au plus grand : cL, dL, L.", ["unites"], () => unites(CONTENANCE, 1)),
  gab(`${C_UNI}_tpl_1`, C_UNI, 2, "L = litre, dL = décilitre, cL = centilitre.", ["unites", "canvas"], () => unites(CONTENANCE, 2)),
  gab(`${C_UNI}_tpl_2`, C_UNI, 3, "Du plus petit au plus grand : cL, dL, L.", ["unites"], () => unites(CONTENANCE, 3)),
  gab(`${C_UNI}_tpl_3`, C_UNI, 3, "Un verre contient environ 20 cL, un seau environ 10 L.", ["unites", "estimer", "canvas"], () => estimer(CONTENANCE, Math.random() < 0.5 ? 2 : 3)),

  gab(`${C_REL}_tpl_4`, C_REL, 1, "1 L = 10 dL = 100 cL ; 1 dL = 10 cL.", ["relations"], () => relations(CONTENANCE, 1)),
  gab(`${C_REL}_tpl_1`, C_REL, 2, "Chaque litre vaut 100 centilitres, ou 10 décilitres.", ["relations", "canvas"], () => relations(CONTENANCE, 2)),
  gab(`${C_REL}_tpl_2`, C_REL, 3, "Combien de fois 100 cL (ou 10 dL) dans ce nombre ?", ["relations", "canvas"], () => relations(CONTENANCE, 3)),
  gab(`${C_REL}_tpl_3`, C_REL, 4, "2 L 5 cL, ce n'est pas 25 cL : 2 L = 200 cL, puis on ajoute 5.", ["relations", "piege", "canvas"], () => relations(CONTENANCE, 4)),

  gab(`${C_CMP}_tpl_3`, C_CMP, 2, "Écris les deux contenances dans la même unité avant de comparer.", ["comparer", "canvas"], () => comparer(CONTENANCE, 2)),
  gab(`${C_CMP}_tpl_1`, C_CMP, 3, "1 L = 100 cL : compare les nombres seulement quand l'unité est la même.", ["comparer", "canvas"], () => comparer(CONTENANCE, 3)),
  gab(`${C_CMP}_tpl_2`, C_CMP, 4, "Écris toutes les contenances dans la même unité, puis range-les.", ["comparer", "canvas"], () => comparer(CONTENANCE, 4)),

  gab(`${C_PRO}_tpl_3`, C_PRO, 2, "Écris tout en centilitres, puis additionne.", ["probleme", "canvas"], () => contenanceTotale(2)),
  gab(`${C_PRO}_tpl_1`, C_PRO, 3, "1 L = 100 cL : change les litres en centilitres, puis calcule.", ["probleme", "canvas"], () =>
    Math.random() < 0.6 ? contenanceTotale(3) : resteDansLeRecipient(),
  ),
  gab(`${C_PRO}_tpl_2`, C_PRO, 4, "Écris tout en centilitres, puis enlève ce qu'on a versé.", ["probleme", "canvas"], () =>
    Math.random() < 0.6 ? resteDansLeRecipient() : combienDeVerres(),
  ),

  gab(`${C_DEF}_tpl_1`, C_DEF, 5, "Écris la contenance en centilitres, puis cherche combien de verres y tiennent.", ["defi", "canvas"], combienDeVerres),
  gab(`${C_DEF}_tpl_2`, C_DEF, 5, "Calcule d'abord ce qui est bu, en centilitres.", ["defi", "deux_etapes", "canvas"], boissonDuGroupe),
);
