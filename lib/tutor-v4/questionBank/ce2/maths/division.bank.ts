// lib/tutor-v4/questionBank/ce2/maths/division.bank.ts
//
// Les partages et groupements du CE2, écrits à la main. Cinq micro-compétences
// qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025,
// cycle 2) : la division comme PARTAGE ou comme GROUPEMENT, le lien avec la
// multiplication, et l'interprétation du reste. ⛔ Pas de division posée au
// cycle 2 : la technique opératoire arrive au CM1. On cherche le quotient en
// s'appuyant sur les tables.
//
// ⚠️ LE SYMBOLE ÷ FAIT PARTIE DE L'ATTENDU, l'intitulé le dit : « Comprendre le
// sens de la division et UTILISER LE SYMBOLE "÷" ». Il ne vivait ici que dans
// les explications ; les énoncés, eux, parlaient toujours de partage en mots.
// Un élève qui n'a jamais lu « 24 ÷ 4 » dans une question ne le reconnaîtra pas
// le jour d'une évaluation. Le texte donne même son exemple : « On a
// 7 × 13 = 91, donc 91 ÷ 7 = 13 et 91 ÷ 13 = 7. »
//
// LE PIÈGE DE LA NOTION : le reste qu'on jette. 26 élèves, des cars de
// 8 places : 26 = 3 × 8 + 2, et l'élève répond 3 cars. Les deux derniers
// resteraient sur le trottoir. Selon la question posée, le même reste s'arrondit
// vers le haut (il faut un car de plus) ou se garde tel quel (il reste 2 billes).
// Le calcul ne décide pas : c'est l'histoire qui décide.
// Son cousin : confondre « combien chacun en a » (partage) et « combien de
// paquets on fait » (groupement).
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesuré avec scripts/mesurer-squelettes-coach.ts :
// les 5 micros tenaient sur 4 à 16 squelettes, et le ★2 du sens n'avait que
// deux items figés (18 répétitions sur 20). Chaque gabarit tire maintenant une
// FAMILLE, une SITUATION (18 choses, 11 contenants, la troupe) et une TOURNURE.
// ⭐ LES DESSINS (`objets`) : une collection À PARTAGER est dessinée EN VRAC
// (par cinq, comme on compte), jamais déjà rangée en paquets — le dessin aide à
// compter sans donner la réponse. Les paquets ne sont dessinés que pour un fait
// déjà connu (« on sait que 3 × 4 = 12 ») ou une multiplication. Sinon, un
// schéma en barres de parts égales. Outils communs : ./outils-calcul-ce2.ts.

import type { ObjetId, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Etoile,
  type Prenom,
  type Q,
  barre,
  barreEgale,
  de,
  exp,
  gabarit,
  maj,
  objetsEnVrac,
  objetsGroupes,
  pick,
  poserCalcul,
  qM,
  qN,
  quelquun,
  rint,
  tIl,
} from "./outils-calcul-ce2";

/* =========================================================
   LES ITEMS FIGÉS (gardés tels quels)
========================================================= */

const FIXES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 24 billes entre 4 enfants, à parts égales. Combien de billes chacun ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 4 : 4 fois combien font 24 ?",
    explanation: exp(
      "Partager à parts égales, c'est chercher ce que reçoit chacun.",
      "On cherche dans la table du nombre de parts.",
      "4 × 6 = 24, donc chacun reçoit 6 billes. On peut le vérifier : 6 + 6 + 6 + 6 = 24.",
      "Chacun a 6 billes.",
    ),
    tags: ["ce2", "division", "sens", "partage"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 3,
    theme: "neutral",
    text: "On range 24 billes dans des sachets de 4. Combien de sachets ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cette fois on connaît la taille des paquets, pas leur nombre.",
    explanation: exp(
      "Grouper, c'est chercher COMBIEN DE PAQUETS on peut faire quand on connaît leur taille.",
      "On cherche combien de fois 4 tient dans 24.",
      "4 × 6 = 24, donc on remplit 6 sachets. C'est le même calcul que le partage de 24 billes entre 4 enfants, mais l'histoire est différente : ici le 4 est la taille du paquet, là c'était le nombre d'enfants.",
      "On remplit 6 sachets.",
    ),
    tags: ["ce2", "division", "sens", "groupement"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, on met 30 letchis dans des barquettes de 6. Que cherche-t-on : combien de letchis par barquette, ou combien de barquettes ?",
    format: "qcm",
    choices: [
      "combien de barquettes",
      "combien de letchis par barquette",
      "les deux à la fois",
      "on ne peut pas savoir",
    ],
    expected: ["combien de barquettes"],
    comparator: "mcq_exact",
    hint: "Le 6, est-ce le nombre de barquettes ou ce qu'elles contiennent ?",
    explanation: exp(
      "Dans un groupement, on connaît la taille des paquets et on cherche leur nombre.",
      "On regarde ce que désigne le second nombre de l'énoncé.",
      "« Des barquettes de 6 » dit ce que contient CHAQUE barquette. On cherche donc combien on en remplit : 6 × 5 = 30, soit 5 barquettes.",
      "On cherche combien de barquettes.",
    ),
    tags: ["ce2", "division", "sens", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on le signe ÷ dans le calcul 24 ÷ 4 ?",
    format: "qcm",
    choices: [
      "24 divisé par 4",
      "24 fois 4",
      "24 moins 4",
      "24 plus 4",
    ],
    expected: ["24 divisé par 4"],
    comparator: "mcq_exact",
    hint: "C'est le signe du partage.",
    explanation: exp(
      "Le signe ÷ se lit « divisé par ». Il note le partage ou le groupement.",
      "On lit le nombre de gauche, puis « divisé par », puis le nombre de droite.",
      "24 ÷ 4 se lit « 24 divisé par 4 ». Cela veut dire : on partage 24 en 4 parts égales, ou bien on cherche combien de fois 4 tient dans 24. Dans les deux cas, la réponse est 6.",
      "On lit « 24 divisé par 4 ».",
    ),
    tags: ["ce2", "division", "symbole", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que 7 × 13 = 91. Combien font 91 ÷ 7 ?",
    format: "qcm",
    choices: ["13", "7", "98", "91"],
    expected: ["13"],
    comparator: "mcq_exact",
    hint: "La multiplication est déjà écrite. Lis-la à l'envers.",
    explanation: exp(
      "La division est l'opération inverse de la multiplication : elle défait ce que la multiplication a fait.",
      "On repart de la multiplication connue et on cherche le facteur qui manque.",
      "7 × 13 = 91, donc 91 ÷ 7 = 13. Et dans l'autre sens, 91 ÷ 13 = 7. Une seule multiplication apprise donne deux divisions.",
      "91 ÷ 7 = 13.",
    ),
    tags: ["ce2", "division", "symbole", "lien_multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 7 × 5 = 35, combien font 35 partagés en 5 parts égales ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La multiplication que tu connais donne la réponse toute faite.",
    explanation: exp(
      "La division et la multiplication sont deux opérations inverses.",
      "On relit la multiplication à l'envers : elle donne directement le partage.",
      "7 × 5 = 35 veut dire que 5 parts de 7 font 35. Donc 35 partagés en 5 parts donnent 7 par part.",
      "Chaque part vaut 7.",
    ),
    tags: ["ce2", "division", "lien_multiplication", "methode"],
  },
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Comment vérifier qu'on a bien trouvé le résultat d'un partage ?",
    format: "qcm",
    choices: [
      "on multiplie le résultat par le nombre de parts et on doit retrouver le total",
      "on refait le même partage",
      "on additionne le résultat au total",
      "on ne peut pas vérifier",
    ],
    expected: ["on multiplie le résultat par le nombre de parts et on doit retrouver le total"],
    comparator: "mcq_exact",
    hint: "La multiplication défait ce que le partage a fait.",
    explanation: exp(
      "La multiplication est l'opération inverse de la division : elle sert à vérifier.",
      "On multiplie ce que reçoit chacun par le nombre de parts.",
      "Si 35 partagés en 5 donnent 7, alors 7 × 5 doit redonner 35. C'est le cas. Avec une erreur, par exemple 8, on aurait 8 × 5 = 40 : on verrait tout de suite que ça ne colle pas.",
      "On multiplie le résultat par le nombre de parts.",
    ),
    tags: ["ce2", "division", "lien_multiplication", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de fois 6 tient-il dans 54 ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Récite la table de 6 jusqu'à 54.",
    explanation: exp(
      "Chercher combien de fois un nombre tient dans un autre, c'est parcourir sa table.",
      "On récite la table jusqu'à atteindre le total.",
      "6, 12, 18, 24, 30, 36, 42, 48, 54 : c'est le neuvième. Donc 6 × 9 = 54, et 6 tient 9 fois dans 54.",
      "6 tient 9 fois dans 54.",
    ),
    tags: ["ce2", "division", "lien_multiplication"],
  },
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "On partage 26 billes entre 4 enfants, à parts égales. Combien de billes restera-t-il ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le plus grand résultat de la table de 4 qui ne dépasse pas 26.",
    explanation: exp(
      "Quand le partage ne tombe pas juste, ce qui n'a pas pu être distribué s'appelle le reste.",
      "On cherche dans la table le plus grand produit qui ne dépasse pas le total, puis on soustrait.",
      "4 × 6 = 24 et 4 × 7 = 28, ce qui dépasse. Chacun reçoit donc 6 billes, et 26 - 24 = 2 : il reste 2 billes.",
      "Il reste 2 billes.",
    ),
    tags: ["ce2", "division", "reste"],
  },
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 5,
    theme: "reunion",
    text: "26 élèves partent en sortie. Chaque voiture emmène 8 élèves. Combien de voitures faut-il ?",
    format: "qcm",
    choices: ["4", "3", "2", "8"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "26 = 3 × 8 + 2. Que fait-on des deux élèves qui restent ?",
    explanation: exp(
      "Quand le reste ne peut pas être abandonné, il faut un groupe de plus.",
      "On calcule le partage, puis on regarde ce que le reste représente dans l'histoire.",
      "26 = 3 × 8 + 2. Trois voitures emmènent 24 élèves, et il en reste 2. On ne les laisse pas sur le trottoir : il faut une quatrième voiture, même si elle n'est pas pleine.",
      "Il faut 4 voitures.",
    ),
    tags: ["ce2", "division", "reste", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un partage, le reste peut-il être plus grand que le nombre de parts ?",
    format: "qcm",
    choices: [
      "non, sinon on pourrait encore donner une part à chacun",
      "oui, si le total est grand",
      "oui, toujours",
      "on ne peut pas savoir",
    ],
    expected: ["non, sinon on pourrait encore donner une part à chacun"],
    comparator: "mcq_exact",
    hint: "S'il reste 5 billes pour 4 enfants, le partage est-il fini ?",
    explanation: exp(
      "Le reste est toujours plus petit que le nombre de parts : sinon le partage n'est pas terminé.",
      "On vérifie si l'on peut encore donner une unité à chacun.",
      "S'il reste 5 billes à partager entre 4 enfants, on peut encore en donner une à chacun : le reste tombe alors à 1. Un reste de 5 pour 4 parts signale qu'on s'est arrêté trop tôt.",
      "Non, le reste est toujours plus petit que le nombre de parts.",
    ),
    tags: ["ce2", "division", "reste", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, 48 letchis sont rangés dans des barquettes de 6. Combien de barquettes ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Combien de fois 6 tient-il dans 48 ?",
    explanation: exp(
      "Grouper, c'est chercher combien de paquets on peut faire quand on connaît leur taille.",
      "On récite la table de 6 jusqu'à 48.",
      "6 × 8 = 48, donc on remplit 8 barquettes exactement, sans reste.",
      "Il faut 8 barquettes.",
    ),
    tags: ["ce2", "division", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_division_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle opération faut-il choisir pour partager 42 bonbons entre 7 enfants ?",
    format: "qcm",
    choices: ["Division", "Multiplication", "Addition", "Soustraction"],
    expected: ["Division"],
    comparator: "mcq_exact",
    hint: "On cherche ce que reçoit chacun quand tout le monde a pareil.",
    explanation: exp(
      "Partager une quantité en parts égales, c'est une division.",
      "On repère les mots de l'énoncé : « partager entre », « à parts égales ».",
      "42 partagés entre 7 : on cherche ce que reçoit chacun. Or 7 × 6 = 42, donc chacun reçoit 6 bonbons. La multiplication sert à vérifier, pas à répondre.",
      "C'est une division.",
    ),
    tags: ["ce2", "division", "probleme", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a 30 gâteaux et des boîtes de 4. On veut ne remplir que des boîtes COMPLÈTES. Combien de boîtes, et combien de gâteaux restent dehors ?",
    format: "qcm",
    choices: [
      "7 boîtes, 2 gâteaux restent",
      "8 boîtes, 0 gâteau reste",
      "7 boîtes, 4 gâteaux restent",
      "6 boîtes, 6 gâteaux restent",
    ],
    expected: ["7 boîtes, 2 gâteaux restent"],
    comparator: "mcq_exact",
    hint: "Cette fois, le reste n'a pas droit à une boîte : elle serait incomplète.",
    explanation: exp(
      "Selon la question posée, le reste donne un groupe de plus… ou reste dehors.",
      "On calcule le partage, puis on relit la question pour savoir quoi faire du reste.",
      "30 = 7 × 4 + 2. Sept boîtes sont complètes et il reste 2 gâteaux. Comme on ne veut que des boîtes pleines, ces 2 gâteaux restent dehors — c'est l'inverse des voitures de la sortie scolaire.",
      "7 boîtes complètes, et 2 gâteaux restent.",
    ),
    tags: ["ce2", "division", "defi", "reste", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une classe de 24 élèves se met en rangs de 4. Puis la maîtresse demande des rangs de 6. Y a-t-il plus de rangs, ou moins ?",
    format: "qcm",
    choices: [
      "moins de rangs, car ils sont plus grands",
      "plus de rangs, car 6 est plus grand que 4",
      "le même nombre de rangs",
      "on ne peut pas savoir",
    ],
    expected: ["moins de rangs, car ils sont plus grands"],
    comparator: "mcq_exact",
    hint: "Plus les paquets sont gros, moins il en faut.",
    explanation: exp(
      "Quand le total ne change pas, agrandir les paquets diminue leur nombre.",
      "On calcule les deux groupements et on compare.",
      "24 ÷ 4 = 6 rangs de 4. Et 24 ÷ 6 = 4 rangs de 6. On passe de 6 rangs à 4 rangs : il y en a moins, parce que chacun contient plus d'élèves.",
      "Il y a moins de rangs.",
    ),
    tags: ["ce2", "division", "defi", "reunion", "piege", "qcm"],
  },
];

/* =========================================================
   LES GABARITS — une famille × une situation × une tournure
========================================================= */

const N = "division";
const g = (id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], gen: () => Q) =>
  gabarit({ id, notionId: N, microId, difficulty, hint, tags: ["division", ...tags] }, gen);

const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);
const avec = (canvas: Q["canvas"] | undefined): Partial<Q> => (canvas ? { canvas } : {});

/* ---------------------------------------------------------
   LES SITUATIONS
   Un PARTAGE : on connaît le nombre de parts, on cherche la
   part. Un GROUPEMENT : on connaît la taille du paquet, on
   cherche le nombre de paquets. `dessin` : l'objet de la
   bibliothèque `objets`, quand il existe.
--------------------------------------------------------- */

type Chose = { un: string; des: string; dessin?: ObjetId };
const CHOSES: readonly Chose[] = [
  { un: "pomme", des: "pommes", dessin: "pomme" },
  { un: "banane", des: "bananes", dessin: "banane" },
  { un: "ballon", des: "ballons", dessin: "ballon" },
  { un: "poisson", des: "poissons", dessin: "poisson" },
  { un: "fleur", des: "fleurs", dessin: "fleur" },
  { un: "livre", des: "livres", dessin: "livre" },
  { un: "étoile en papier", des: "étoiles en papier", dessin: "etoile" },
  { un: "petite voiture", des: "petites voitures", dessin: "voiture" },
  { un: "feuille", des: "feuilles", dessin: "feuille" },
  { un: "chapeau de fête", des: "chapeaux de fête", dessin: "chapeau" },
  { un: "bille", des: "billes" },
  { un: "bonbon", des: "bonbons" },
  { un: "image", des: "images" },
  { un: "crayon", des: "crayons" },
  { un: "cookie", des: "cookies" },
  { un: "carte", des: "cartes" },
  { un: "pièce d'or", des: "pièces d'or" },
  { un: "graine", des: "graines" },
];

/** Le contenant d'un groupement : « des sachets de 4 », « des vases de 5 ». */
type Boite = { un: string; des: string; fem: boolean; pour?: string[] };
const BOITES: readonly Boite[] = [
  { un: "sachet", des: "sachets", fem: false },
  { un: "boîte", des: "boîtes", fem: true },
  { un: "panier", des: "paniers", fem: false, pour: ["pommes", "bananes", "fleurs", "cookies"] },
  { un: "vase", des: "vases", fem: false, pour: ["fleurs"] },
  { un: "aquarium", des: "aquariums", fem: false, pour: ["poissons"] },
  { un: "étagère", des: "étagères", fem: true, pour: ["livres"] },
  { un: "trousse", des: "trousses", fem: true, pour: ["crayons"] },
  { un: "coffre", des: "coffres", fem: false, pour: ["pièces d'or"] },
  { un: "filet", des: "filets", fem: false, pour: ["ballons"] },
  { un: "pochette", des: "pochettes", fem: true, pour: ["images", "cartes"] },
  { un: "pot", des: "pots", fem: false, pour: ["graines"] },
];

function boitePour(c: Chose): Boite {
  const faites = BOITES.filter((b) => b.pour?.includes(c.des));
  const libres = BOITES.filter((b) => !b.pour);
  if (c.des === "poissons" || (faites.length && Math.random() < 0.7)) return pick(faites);
  return pick(libres);
}

const chose = () => pick(CHOSES);

/** Le dessin d'un partage À FAIRE : la collection en vrac (par 5), jamais les groupes. */
const vrac = (c: Chose, total: number) => (c.dessin && total <= 30 ? objetsEnVrac(c.dessin, total) : undefined);

/** Un partage avec reste : `k` parts égales inconnues, et un petit reste inconnu. */
const barreReste = (k: number, total: number) =>
  barre([...Array.from({ length: k }, () => ["", null] as [string, null]), ["reste", null]], String(total));

/** Le dessin d'un fait connu : `groupes` paquets de `k` (k ≤ 5). */
const enGroupes = (c: Chose, groupes: number, k: number) =>
  c.dessin && k <= 5 && groupes <= 6 ? objetsGroupes(c.dessin, groupes, k) : undefined;

function textePartage(total: number, parts: number, c: Chose, p: Prenom): string {
  return pick([
    `On partage ${total} ${c.des} entre ${parts} enfants, à parts égales. Combien ${de(c.des)} pour chacun ?`,
    `${p.nom} partage ${total} ${c.des} entre ${parts} amis. Chacun en reçoit autant. Combien chacun en a-t-il ?`,
    `${p.nom} et ses amis sont ${parts}. Ils se partagent ${total} ${c.des} à égalité. Combien en a chaque enfant ?`,
    `La maîtresse distribue ${total} ${c.des} à ${parts} groupes, autant à chaque groupe. Combien par groupe ?`,
    `Pic le paille-en-queue partage ${total} ${c.des} entre ses ${parts} petits. Combien chaque petit en reçoit-il ?`,
    `À l'anniversaire ${de(p.nom)}, ${parts} enfants se partagent ${total} ${c.des}. Combien chacun en a-t-il ?`,
    `Les ${parts} pirates se partagent ${total} ${c.des} du coffre. Combien chaque pirate en a-t-il ?`,
    `Partage ${total} ${c.des} en ${parts} tas égaux. Combien ${de(c.des)} dans chaque tas ?`,
  ]);
}

function texteGroupement(total: number, k: number, c: Chose, b: Boite, p: Prenom): string {
  return pick([
    `On range ${total} ${c.des} dans des ${b.des} de ${k}. Combien ${de(b.des)} remplit-on ?`,
    `${p.nom} met ${total} ${c.des} par ${b.des} de ${k}. Combien ${de(b.des)} lui faut-il ?`,
    `${p.nom} a ${total} ${c.des}. ${maj(p.il)} en met ${k} dans chaque ${b.un}. Combien ${de(b.des)} remplit-${p.il} ?`,
    `Il y a ${total} ${c.des}. Dans ${b.fem ? "une" : "un"} ${b.un}, on en met ${k}. Combien ${de(b.des)} faut-il ?`,
    `Pic le paille-en-queue range ${total} ${c.des} par ${b.des} de ${k}. Combien ${de(b.des)} remplit-il ?`,
    `Le marchand vend ses ${c.des} par lots de ${k}. Il en a ${total}. Combien de lots peut-il faire ?`,
    `Combien ${de(b.des)} de ${k} ${c.des} peut-on faire avec ${total} ${c.des} ?`,
  ]);
}

/* ---------------------------------------------------------
   LE SENS : partager, grouper, lire « ÷ »
--------------------------------------------------------- */

function partage(total: number, parts: number, dessin = true): Q {
  const q = total / parts;
  const c = chose();
  const p = quelquun();
  return qN(
    textePartage(total, parts, c, p),
    q,
    [parts, total - parts, q + 1, q - 1, total + parts, q * 2],
    exp("Partager à parts égales, c'est faire une division.", `On cherche combien de fois ${parts} tient dans ${total}, ou : ${parts} × ? = ${total}.`, `${parts} × ${q} = ${total}, donc ${total} ÷ ${parts} = ${q}.`, `Chacun en reçoit ${q}.`),
    avec(dessin ? parfois(0.8, () => vrac(c, total) ?? barreEgale(parts, null, String(total))) : undefined),
  );
}

function groupement(total: number, k: number, dessin = true): Q {
  const q = total / k;
  const c = chose();
  const b = boitePour(c);
  const p = quelquun();
  return qN(
    texteGroupement(total, k, c, b, p),
    q,
    [k, total - k, q + 1, q - 1, total + k, q * 2],
    exp("Faire des paquets égaux et compter les paquets, c'est aussi une division.", `On cherche combien de fois ${k} tient dans ${total} : ${k} × ? = ${total}.`, `${k} × ${q} = ${total}, donc ${total} ÷ ${k} = ${q}.`, `On remplit ${q} ${b.des}.`),
    avec(dessin ? parfois(0.8, () => vrac(c, total) ?? barreEgale(q, String(k), null)) : undefined),
  );
}

function divisionNue(a: number, b: number): Q {
  const q = a / b;
  const p = quelquun();
  return qN(
    pick([
      poserCalcul(`${a} ÷ ${b}`, p),
      `${a} divisé par ${b}, ça fait combien ?`,
      `${p.nom} lit « ${a} ÷ ${b} ». Quel est le résultat ?`,
      `Quel nombre multiplié par ${b} donne ${a} ? Donc ${a} ÷ ${b} = ?`,
    ]),
    q,
    [b, a - b, a + b, q + 1, q - 1, q * 2],
    exp(`${a} ÷ ${b}, c'est le nombre qui, multiplié par ${b}, donne ${a}.`, `On cherche dans la table de ${b}.`, `${b} × ${q} = ${a}, donc ${a} ÷ ${b} = ${q}.`, `${a} ÷ ${b} = ${q}.`),
    avec(parfois(0.7, () => barreEgale(b, null, String(a)))),
  );
}

function lireDivise(): Q {
  const b = rint(2, 6);
  const q = rint(2, 9);
  const a = b * q;
  const p = quelquun();
  const f = rint(1, 3);
  if (f === 1)
    return qM(
      pick([
        `Que veut dire ${a} ÷ ${b} ?`,
        `${p.nom} lit le calcul ${a} ÷ ${b}. Qu'est-ce que ça veut dire ?`,
        `Pic le paille-en-queue voit « ${a} ÷ ${b} » au tableau. Que veut dire ce calcul ?`,
      ]),
      `on partage ${a} en ${b} parts égales`,
      [`on partage ${b} en ${a} parts égales`, `on enlève ${b} à ${a}`, `on multiplie ${a} par ${b}`],
      exp("Le signe ÷ se lit « divisé par ».", `${a} ÷ ${b}, c'est partager ${a} en ${b} parts égales (ou chercher combien de fois ${b} tient dans ${a}).`, `${a} ÷ ${b} = ${q}, car ${b} × ${q} = ${a}.`, `On partage ${a} en ${b} parts égales.`),
      avec(parfois(0.6, () => barreEgale(b, null, String(a)))),
    );
  if (f === 2)
    return qM(
      pick([
        `Comment lit-on ${a} ÷ ${b} ?`,
        `${p.nom} doit lire à voix haute « ${a} ÷ ${b} ». Que dit-${p.il} ?`,
      ]),
      `${a} divisé par ${b}`,
      [`${a} fois ${b}`, `${a} moins ${b}`, `${a} plus ${b}`],
      exp("Le signe ÷ se lit « divisé par ».", "On lit le premier nombre, puis « divisé par », puis le second.", `${a} ÷ ${b} se lit « ${a} divisé par ${b} ».`, `On dit « ${a} divisé par ${b} ».`),
    );
  const c = chose();
  return qM(
    pick([
      `${p.nom} partage ${a} ${c.des} entre ${b} amis. Quel calcul écrit-${p.il} ?`,
      `On range ${a} ${c.des} par paquets de ${b}. Quel calcul permet de trouver le nombre de paquets ?`,
    ]),
    `${a} ÷ ${b}`,
    [`${a} − ${b}`, `${a} × ${b}`, `${b} ÷ ${a}`, `${a} + ${b}`],
    exp("Partager ou faire des paquets égaux, c'est diviser.", "Le nombre de départ s'écrit en premier.", `${a} ÷ ${b} = ${q}.`, `Le calcul est ${a} ÷ ${b}.`),
    avec(parfois(0.6, () => vrac(c, a))),
  );
}

function queCherche(): Q {
  const p = quelquun();
  const c = chose();
  const k = rint(3, 8);
  const q = rint(3, 9);
  const total = k * q;
  if (Math.random() < 0.5) {
    const b = boitePour(c);
    return qM(
      pick([
        `On range ${total} ${c.des} dans des ${b.des} de ${k}. Que cherche-t-on ?`,
        `${p.nom} met ${total} ${c.des} par ${b.des} de ${k}. Quelle question se pose-t-${p.il} ?`,
        `Pic le paille-en-queue range ${total} ${c.des} par ${b.des} de ${k}. Que doit-il trouver ?`,
      ]),
      `combien ${de(b.des)} on remplit`,
      [`combien ${de(c.des)} dans chaque ${b.un}`, `combien ${de(c.des)} il y a en tout`, `combien ${de(c.des)} il reste`],
      exp("Dans un groupement, on connaît la taille d'un paquet.", `On sait déjà qu'il y a ${k} ${c.des} par ${b.un} : on cherche le nombre ${de(b.des)}.`, `${total} ÷ ${k} = ${q} ${b.des}.`, `On cherche combien ${de(b.des)} on remplit.`),
      avec(parfois(0.75, () => vrac(c, total) ?? barreEgale(q, String(k), String(total)))),
    );
  }
  return qM(
    pick([
      `On partage ${total} ${c.des} entre ${k} enfants. Que cherche-t-on ?`,
      `${p.nom} partage ${total} ${c.des} entre ${k} amis. Quelle question se pose-t-${p.il} ?`,
      `Les ${k} enfants de l'équipe se partagent ${total} ${c.des}. Que faut-il trouver ?`,
    ]),
    `combien ${de(c.des)} chacun reçoit`,
    [`combien de boîtes on remplit`, `combien ${de(c.des)} il reste`, `combien ${de(c.des)} il y a en tout`],
    exp("Dans un partage, on connaît le nombre de parts.", `On sait déjà qu'il y a ${k} enfants : on cherche la part de chacun.`, `${total} ÷ ${k} = ${q}.`, `On cherche combien ${de(c.des)} chacun reçoit.`),
    avec(parfois(0.75, () => vrac(c, total) ?? barreEgale(k, null, String(total)))),
  );
}

/* ---------------------------------------------------------
   LE LIEN AVEC LA MULTIPLICATION
--------------------------------------------------------- */

function combienDeFois(b: number, q: number): Q {
  const a = b * q;
  const p = quelquun();
  const c = chose();
  // Les tournures qui parlent des objets dessinent la collection EN VRAC
  // (l'élève fait les paquets) ; jamais les paquets tout faits : on les
  // compterait, et ce serait la réponse.
  const sansObjet = [
    `Combien de fois ${b} tient-il dans ${a} ?`,
    `${b} × ? = ${a}. Quel nombre manque ?`,
    `Quel nombre multiplié par ${b} donne ${a} ?`,
    `${p.nom} cherche combien de fois ${b} tient dans ${a}. Que trouve-${tIl(p)} ?`,
    `Pic le paille-en-queue fait des sauts de ${b}. Combien de sauts pour arriver à ${a} ?`,
    `${p.nom} compte de ${b} en ${b} jusqu'à ${a}. Combien de bonds fait-${p.il} ?`,
    `${p.nom} sait que ${b} × ? = ${a}. Quel est le nombre caché ?`,
    `Dans la table de ${b}, ${p.nom} cherche ${a}. ${b} fois combien ?`,
    `La grenouille ${de(p.nom)} fait des bonds de ${b} cases. Combien de bonds pour aller jusqu'à la case ${a} ?`,
  ];
  const avecObjet = [
    `Combien de paquets de ${b} ${c.des} peut-on faire avec ${a} ${c.des} ?`,
    `${p.nom} range ${a} ${c.des} par ${b}. Combien de tas fait-${p.il} ?`,
  ];
  const objet = Math.random() < 0.3;
  return qN(
    objet ? pick(avecObjet) : pick(sansObjet),
    q,
    [b, q + 1, q - 1, a - b, q + 10, a + b],
    exp("Chercher combien de fois un nombre tient dans un autre, c'est diviser.", `On cherche dans la table de ${b}.`, `${b} × ${q} = ${a}, donc ${b} tient ${q} fois dans ${a} : ${a} ÷ ${b} = ${q}.`, `${b} tient ${q} fois dans ${a}.`),
    avec(parfois(0.7, () => (objet ? vrac(c, a) : undefined) ?? barreEgale(b, null, String(a)))),
  );
}

function onSaitQue(): Q {
  const a = rint(2, 9);
  const b = rint(2, 9);
  const prod = a * b;
  const p = quelquun();
  const c = chose();
  const f = rint(1, 3);
  if (f <= 2) {
    const diviseur = Math.random() < 0.5 ? b : a;
    const q = prod / diviseur;
    return qN(
      pick([
        `On sait que ${a} × ${b} = ${prod}. Combien font ${prod} ÷ ${diviseur} ?`,
        `${p.nom} connaît sa table : ${a} × ${b} = ${prod}. Combien font alors ${prod} ÷ ${diviseur} ?`,
        `Si ${a} × ${b} = ${prod}, combien font ${prod} partagés en ${diviseur} parts égales ?`,
        `Pic le paille-en-queue sait que ${a} × ${b} = ${prod}. Il cherche ${prod} ÷ ${diviseur}. Que trouve-t-il ?`,
        `${p.nom} a écrit ${a} × ${b} = ${prod} sur son ardoise. Que vaut ${prod} ÷ ${diviseur} ?`,
        `${p.nom} range ${prod} ${c.des} en ${diviseur} tas égaux. ${maj(p.il)} sait que ${a} × ${b} = ${prod}. Combien dans chaque tas ?`,
      ]),
      q,
      [diviseur, prod, prod + diviseur, q + 1, q - 1],
      exp("La division est l'opération inverse de la multiplication.", `${a} × ${b} = ${prod} donne deux divisions : ${prod} ÷ ${b} = ${a} et ${prod} ÷ ${a} = ${b}.`, `${prod} ÷ ${diviseur} = ${q}.`, `${prod} ÷ ${diviseur} = ${q}.`),
      avec(parfois(0.75, () => enGroupes(c, a, b) ?? barreEgale(b, String(a), String(prod)))),
    );
  }
  return qM(
    pick([
      `Quelle multiplication aide à calculer ${prod} ÷ ${b} ?`,
      `${p.nom} veut calculer ${prod} ÷ ${b}. Quel résultat de table l'aide ?`,
      `Pour partager ${prod} ${c.des} en ${b} parts égales, ${p.nom} utilise une multiplication. Laquelle ?`,
    ]),
    `${a} × ${b} = ${prod}`,
    [`${prod} × ${b} = ${prod * b}`, `${a} + ${b} = ${a + b}`, `${b} × ${b} = ${b * b}`, `${a + 1} × ${b} = ${(a + 1) * b}`].filter((t) => t !== `${a} × ${b} = ${prod}`),
    exp("Pour diviser, on cherche dans les tables.", `On cherche le nombre qui, multiplié par ${b}, donne ${prod}.`, `${a} × ${b} = ${prod}, donc ${prod} ÷ ${b} = ${a}.`, `C'est ${a} × ${b} = ${prod}.`),
    avec(parfois(0.6, () => enGroupes(c, a, b) ?? barreEgale(b, null, String(prod)))),
  );
}

/* ---------------------------------------------------------
   LE RESTE : c'est l'histoire qui décide
--------------------------------------------------------- */

function partageAvecReste(): Q {
  const parts = rint(3, 8);
  const q = rint(3, 9);
  const r = rint(1, parts - 1);
  const total = parts * q + r;
  const c = chose();
  const p = quelquun();
  const chacun = Math.random() < 0.55;
  const debut = pick([
    `On partage ${total} ${c.des} entre ${parts} enfants, à parts égales.`,
    `${p.nom} partage ${total} ${c.des} entre ${parts} amis, autant pour chacun.`,
    `Pic le paille-en-queue distribue ${total} ${c.des} à ses ${parts} petits, autant à chacun.`,
    `${parts} enfants se partagent ${total} ${c.des} à égalité.`,
  ]);
  const text = chacun
    ? `${debut} ${pick([`Combien ${de(c.des)} chacun reçoit-il ?`, `Combien en a chaque enfant ?`])}`
    : `${debut} ${pick([`Combien ${de(c.des)} restera-t-il ?`, `Combien en reste-t-il à la fin ?`])}`;
  return qN(
    text,
    chacun ? q : r,
    chacun ? [q + 1, q - 1, r, parts, q + r] : [q, parts - r, r + 1, parts, 0 + parts + r],
    exp(
      "Dans un partage, on donne autant à chacun ; ce qui ne peut plus être donné à tous, c'est le reste.",
      `On cherche le plus grand multiple de ${parts} qui ne dépasse pas ${total}.`,
      `${parts} × ${q} = ${parts * q}, et ${total} − ${parts * q} = ${r}. Donc ${total} = ${parts} × ${q} + ${r}.`,
      chacun ? `Chacun reçoit ${q} ${c.des} (il en reste ${r}).` : `Il reste ${r} ${pl(r, c)}.`,
    ),
    avec(parfois(0.8, () => vrac(c, total) ?? barreReste(parts, total))),
  );
}

const pl = (n: number, c: Chose) => (n === 1 ? c.un : c.des);

/** Le même reste, trois histoires : on arrondit au-dessus, on garde le quotient, ou on demande le reste. */
function interpreterReste(): Q {
  const k = rint(3, 9);
  const q = rint(2, 8);
  const r = rint(1, k - 1);
  const total = k * q + r;
  const p = quelquun();
  const sit = pick([
    { qui: "élèves", un: "voiture", des: "voitures", fem: true, verbe: `Chaque voiture emmène ${k} élèves.`, depart: `${total} élèves partent en sortie.`, tous: "pour que tous les élèves partent" },
    { qui: "enfants", un: "barque", des: "barques", fem: true, verbe: `Une barque transporte ${k} enfants.`, depart: `${total} enfants veulent traverser le lac.`, tous: "pour que tous les enfants traversent" },
    { qui: "joueurs", un: "minibus", des: "minibus", fem: false, verbe: `Un minibus emmène ${k} joueurs.`, depart: `${total} joueurs vont au match de football.`, tous: "pour emmener tous les joueurs" },
    { qui: "gâteaux", un: "boîte", des: "boîtes", fem: true, verbe: `Chaque boîte contient ${k} gâteaux.`, depart: `Le chef pâtissier doit transporter ${total} gâteaux.`, tous: "pour transporter tous les gâteaux" },
    { qui: "livres", un: "carton", des: "cartons", fem: false, verbe: `Un carton contient ${k} livres.`, depart: `La bibliothécaire range ${total} livres.`, tous: "pour ranger tous les livres" },
    { qui: "œufs", un: "boîte", des: "boîtes", fem: true, verbe: `Une boîte contient ${k} œufs.`, depart: `La fermière a ramassé ${total} œufs.`, tous: "pour ranger tous les œufs" },
    { qui: "astronautes", un: "fusée", des: "fusées", fem: true, verbe: `Une fusée emmène ${k} astronautes.`, depart: `${total} astronautes partent sur la Lune.`, tous: "pour que tous les astronautes partent" },
    { qui: "invités", un: "table", des: "tables", fem: true, verbe: `À chaque table, il y a ${k} places.`, depart: `${total} invités viennent à l'anniversaire.`, tous: "pour asseoir tous les invités" },
  ]);
  const type = rint(1, 3);
  const complets = sit.fem ? "complètes" : "complets";
  const intro = pick(["", "", `${p.nom} aide à tout organiser. `, `${p.nom} fait le calcul. `, `Pic le paille-en-queue se pose une question. `]);
  const question =
    type === 1
      ? `Combien ${de(sit.des)} faut-il ${sit.tous} ?`
      : type === 2
        ? `Combien ${de(sit.des)} seront ${complets} ?`
        : `On ne remplit que des ${sit.des} ${complets}. Combien ${de(sit.qui)} restent à part ?`;
  const bon = type === 1 ? q + 1 : type === 2 ? q : r;
  return qN(
    `${intro}${sit.depart} ${sit.verbe} ${question}`,
    bon,
    [q, q + 1, r, k, q + 2, k - r].filter((v) => v !== bon),
    exp(
      "Le reste d'un partage ne se jette pas : c'est l'histoire qui dit quoi en faire.",
      `On écrit ${total} = ${k} × ${q} + ${r}.`,
      type === 1
        ? `${q} ${sit.des} ne suffisent pas : il reste ${r} ${sit.qui}. Il faut ${sit.fem ? "une" : "un"} ${sit.un} de plus : ${q + 1}.`
        : type === 2
          ? `${q} ${sit.des} sont ${complets}, et ${r} ${sit.qui} restent à part.`
          : `Il reste ${r} ${sit.qui}.`,
      `La réponse est ${bon}.`,
    ),
    avec(parfois(0.75, () => barre([...Array.from({ length: Math.min(q, 5) }, () => ["", String(k)] as [string, string]), ...(q > 5 ? [["…", "…"] as [string, string]] : []), ["reste", null]], String(total)))),
  );
}

/* ---------------------------------------------------------
   LES PROBLÈMES
--------------------------------------------------------- */

function choisirOperation(): Q {
  const p = quelquun();
  const c = chose();
  const f = rint(1, 4);
  const k = rint(3, 9);
  const q = rint(3, 9);
  let text: string;
  let bon: string;
  if (f === 1) {
    text = pick([
      `Quelle opération faut-il choisir pour partager ${k * q} ${c.des} entre ${k} enfants ?`,
      `${p.nom} range ${k * q} ${c.des} par paquets de ${k}. Quelle opération donne le nombre de paquets ?`,
    ]);
    bon = "Division";
  } else if (f === 2) {
    text = pick([
      `${p.nom} a ${k} sachets de ${q} ${c.des}. Quelle opération donne le nombre ${de(c.des)} ?`,
      `Il y a ${k} rangées de ${q} ${c.des}. Quelle opération permet de les compter vite ?`,
    ]);
    bon = "Multiplication";
  } else if (f === 3) {
    text = pick([
      `${p.nom} avait ${k * q + 12} ${c.des}. ${maj(p.il)} en donne ${q}. Quelle opération donne ce qui lui reste ?`,
      `Il y avait ${k * q + 12} ${c.des}. On en perd ${q}. Quelle opération faut-il faire ?`,
    ]);
    bon = "Soustraction";
  } else {
    text = pick([
      `${p.nom} a ${k * q} ${c.des} et en reçoit ${q} de plus. Quelle opération donne le total ?`,
      `On réunit ${k * q} ${c.des} et ${k + q} ${c.des}. Quelle opération faut-il faire ?`,
    ]);
    bon = "Addition";
  }
  return qM(
    text,
    bon,
    ["Division", "Multiplication", "Soustraction", "Addition"],
    exp("Chaque histoire a son opération.", "Partager ou faire des paquets égaux : division. Plusieurs paquets égaux : multiplication. Enlever : soustraction. Réunir : addition.", `Ici, il s'agit de ${bon === "Division" ? "partager" : bon === "Multiplication" ? "compter des paquets égaux" : bon === "Soustraction" ? "enlever" : "réunir"}.`, `On choisit la ${bon.toLowerCase()}.`),
    avec(f === 1 ? parfois(0.7, () => vrac(c, k * q) ?? barreEgale(k, null, String(k * q))) : f === 2 ? parfois(0.7, () => enGroupes(c, k, q) ?? barreEgale(k, String(q), null)) : f === 3 ? parfois(0.5, () => barre([["donné", String(q)], ["reste", null]], String(k * q + 12))) : parfois(0.5, () => barre([["", String(k * q)], ["", String(q)]], null))),
  );
}

function problemeDivision(): Q {
  const k = rint(2, 9);
  const q = rint(2, 10);
  return Math.random() < 0.5 ? partage(k * q, k) : groupement(k * q, k);
}

/* ---------------------------------------------------------
   LES DÉFIS
--------------------------------------------------------- */

function defiDeuxEtapes(): Q {
  const p = quelquun();
  const c = chose();
  const f = rint(1, 3);
  if (f === 1) {
    const boites = rint(2, 6);
    const par = rint(3, 6);
    const total = boites * par;
    const enfants = pick([2, 3, 4, 6].filter((e) => total % e === 0 && e !== boites));
    if (!enfants) return defiDeuxEtapes();
    return qN(
      pick([
        `${boites} boîtes contiennent chacune ${par} ${c.des}. On partage toutes les ${c.des} entre ${enfants} enfants. Combien chacun en reçoit-il ?`,
        `${p.nom} a ${boites} sachets de ${par} ${c.des}. ${maj(p.il)} les partage entre ${enfants} amis, à égalité. Combien chaque ami en a-t-il ?`,
        `Pic le paille-en-queue rapporte ${boites} fois ${par} ${c.des}. Il les partage entre ses ${enfants} petits. Combien en a chaque petit ?`,
      ]),
      total / enfants,
      [total, par, boites, total / enfants + 1, total - enfants],
      exp("Un problème à deux étapes : d'abord le total, puis le partage.", "On multiplie, puis on divise.", `${boites} × ${par} = ${total}, puis ${total} ÷ ${enfants} = ${total / enfants}.`, `Chacun reçoit ${total / enfants} ${c.des}.`),
      avec(parfois(0.6, () => enGroupes(c, boites, par))),
    );
  }
  if (f === 2) {
    const amis = rint(3, 6);
    const part = rint(3, 8);
    const mange = rint(2, 9);
    const total = amis * part + mange;
    return qN(
      pick([
        `${p.nom} a ${total} ${c.des}. ${maj(p.il)} en garde ${mange}, puis partage le reste entre ${amis} amis. Combien chaque ami en reçoit-il ?`,
        `Il y a ${total} ${c.des}. On en met ${mange} de côté, et on partage les autres entre ${amis} enfants. Combien pour chacun ?`,
      ]),
      part,
      [Math.floor(total / amis), part + 1, total - mange, amis, part - 1],
      exp("Un problème à deux étapes : d'abord ce qui reste, puis le partage.", "On soustrait, puis on divise.", `${total} − ${mange} = ${total - mange}, puis ${total - mange} ÷ ${amis} = ${part}.`, `Chaque ami reçoit ${part} ${c.des}.`),
      avec(parfois(0.6, () => barre([["gardé", String(mange)], ...Array.from({ length: amis }, () => ["", null] as [string, null])], String(total)))),
    );
  }
  const a = pick([2, 3, 4]);
  const b = pick([6, 8, 12].filter((x) => x > a));
  const total = a * b * pick([1, 2]);
  return qM(
    pick([
      `Une classe de ${total} élèves se met en rangs de ${a}. Puis la maîtresse demande des rangs de ${b}. Y a-t-il plus de rangs, ou moins ?`,
      `${p.nom} range ${total} ${c.des} par paquets de ${a}, puis par paquets de ${b}. Fait-${p.il} plus de paquets, ou moins ?`,
    ]),
    "moins, car les paquets sont plus grands",
    ["plus, car " + b + " est plus grand que " + a, "le même nombre", "on ne peut pas savoir"],
    exp("Plus les paquets sont gros, moins il y en a.", `On compare ${total} ÷ ${a} et ${total} ÷ ${b}.`, `${total} ÷ ${a} = ${total / a} et ${total} ÷ ${b} = ${total / b}.`, `Il y en a moins : ${total / b} au lieu de ${total / a}.`),
    avec(parfois(0.6, () => vrac(c, total) ?? barreEgale(total / a, String(a), String(total)))),
  );
}

function boitesCompletes(): Q {
  const k = rint(3, 9);
  const q = rint(3, 9);
  const r = rint(1, k - 1);
  const total = k * q + r;
  const c = chose();
  const b = boitePour(c);
  const p = quelquun();
  const reste = Math.random() < 0.4;
  const complets = b.fem ? "complètes" : "complets";
  const debut = pick([
    `On a ${total} ${c.des} et des ${b.des} de ${k}. On ne veut que des ${b.des} ${b.fem ? "pleines" : "pleins"}.`,
    `${p.nom} range ${total} ${c.des} dans des ${b.des} de ${k}. ${b.fem ? "Seules les" : "Seuls les"} ${b.des} ${complets} partent au marché.`,
    `Pic le paille-en-queue met ${total} ${c.des} par ${b.des} de ${k}.`,
    `${p.nom} prépare des ${b.des} de ${k} ${c.des}. ${maj(p.il)} en a ${total}.`,
  ]);
  const question = reste ? `Combien ${de(c.des)} restent dehors ?` : `Combien ${de(b.des)} ${complets} remplit-on ?`;
  return qN(
    `${debut} ${question}`,
    reste ? r : q,
    reste ? [k - r, r + 1, q, k] : [q + 1, q - 1, r, k],
    exp("Le reste, c'est ce qui ne suffit pas à remplir un paquet de plus.", `On cherche le plus grand multiple de ${k} qui ne dépasse pas ${total}.`, `${k} × ${q} = ${k * q}, et ${total} − ${k * q} = ${r}. Donc ${total} = ${k} × ${q} + ${r}.`, reste ? `${r} ${pl(r, c)} restent dehors.` : `On remplit ${q} ${b.des} ${complets}.`),
    avec(parfois(0.7, () => vrac(c, total) ?? barreReste(k, total))),
  );
}

/* =========================================================
   LES ITEMS
========================================================= */

const GABARITS: TutorBankItemV4[] = [
  // ce2_division_sens
  g("ce2_division_sens_tpl_5_partage_simple", "ce2_division_sens", 2, "Distribue un par un, comme des cartes.", ["sens", "partage"], () => {
    const parts = rint(2, 5);
    const q = rint(2, 6);
    const f = rint(1, 3);
    return f === 1 ? partage(parts * q, parts) : f === 2 ? groupement(parts * q, parts) : divisionNue(parts * q, parts);
  }),
  g("ce2_division_sens_tpl_1", "ce2_division_sens", 3, "Combien de fois le paquet tient-il dans le total ?", ["sens", "groupement"], () => {
    const k = rint(2, 6);
    return groupement(k * rint(3, 9), k);
  }),
  g("ce2_division_sens_tpl_2", "ce2_division_sens", 4, "Sais-tu déjà combien il y a de parts, ou combien il y a dans chaque paquet ?", ["sens"], queCherche),
  g("ce2_division_sens_tpl_3", "ce2_division_sens", 3, "Cherche dans la table du diviseur.", ["sens", "symbole"], () => {
    const b = rint(2, 9);
    return divisionNue(b * rint(2, 9), b);
  }),
  g("ce2_division_sens_tpl_4", "ce2_division_sens", 3, "« ÷ » se lit « divisé par ».", ["sens", "symbole"], () => {
    if (Math.random() < 0.6) return lireDivise();
    const parts = rint(2, 5);
    return partage(parts * rint(3, 6), parts);
  }),

  // ce2_division_lien_multiplication
  g("ce2_division_lien_multiplication_tpl_1", "ce2_division_lien_multiplication", 3, "Cherche dans la table : combien de fois ?", ["lien"], () => combienDeFois(rint(2, 9), rint(2, 9))),
  g("ce2_division_lien_multiplication_tpl_2", "ce2_division_lien_multiplication", 3, "Une multiplication donne deux divisions.", ["lien"], onSaitQue),

  // ce2_division_reste
  g("ce2_division_reste_tpl_1", "ce2_division_reste", 4, "Donne autant à chacun ; ce qui ne peut plus être donné à tous, c'est le reste.", ["reste"], partageAvecReste),
  g("ce2_division_reste_tpl_2", "ce2_division_reste", 5, "C'est l'histoire qui dit quoi faire du reste.", ["reste"], () => (Math.random() < 0.6 ? interpreterReste() : boitesCompletes())),

  // ce2_division_probleme
  g("ce2_division_probleme_tpl_1", "ce2_division_probleme", 3, "Partage ou paquets ? Cherche dans les tables.", ["probleme"], problemeDivision),
  g("ce2_division_probleme_tpl_2", "ce2_division_probleme", 4, "Que se passe-t-il dans l'histoire : partager, réunir, enlever, des paquets égaux ?", ["probleme", "operation"], () =>
    Math.random() < 0.6 ? choisirOperation() : problemeDivision(),
  ),

  // ce2_division_defi
  g("ce2_division_defi_tpl_1", "ce2_division_defi", 5, "Deux étapes : fais-les l'une après l'autre.", ["defi"], defiDeuxEtapes),
  g("ce2_division_defi_tpl_2", "ce2_division_defi", 5, "Les paquets complets d'abord, le reste ensuite.", ["defi", "reste"], () => (Math.random() < 0.5 ? boitesCompletes() : interpreterReste())),
];

export const divisionBank: TutorBankItemV4[] = [...FIXES, ...GABARITS];
