// lib/tutor-v4/questionBank/ce2/maths/addition-soustraction.bank.ts
//
// Les additions et soustractions posées du CE2, écrites à la main. Cinq
// micro-compétences qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : poser et calculer une
// addition et une soustraction avec retenues, compléter une égalité additive,
// et contrôler un résultat par estimation. Les nombres restent sous 10 000.
//
// LES DEUX PIÈGES DE LA NOTION, tous deux vus chaque année :
//   • L'ALIGNEMENT. 348 + 27 posé en collant les chiffres à gauche donne 618.
//     Les unités vont sous les unités, et la colonne décide, pas l'œil.
//   • LA SOUSTRACTION À L'ENVERS. Pour 52 - 27, l'élève fait 7 - 2 dans la
//     colonne des unités parce que « on prend le plus petit au plus grand »,
//     et annonce 35. Il faut casser une dizaine, pas retourner le calcul.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

//
// ⛔ LES SQUELETTES (10/11/2026). Mesuré avec scripts/mesurer-squelettes-coach.ts :
// les 6 micros tenaient sur 4 à 7 squelettes. Chaque gabarit tire maintenant une
// FAMILLE (le résultat, un chiffre du résultat, la retenue, l'erreur à trouver,
// la vérification, une histoire), une TOURNURE et un enfant de la troupe.
// ⭐ L'opération posée (`calcul_pose`) est dessinée SANS son résultat — sauf quand
// c'est le résultat FAUX d'un élève qu'on demande de juger. Outils communs :
// ./outils-calcul-ce2.ts.

import type { CalculPoseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Etoile,
  type Prenom,
  type Q,
  MONDES,
  barre,
  de,
  deuxPersonnes,
  exp,
  fmt,
  gabarit,
  maj,
  monde,
  nObj,
  pick,
  pose,
  poserCalcul,
  qM,
  qN,
  quelquun,
  rint,
  tIl,
} from "./outils-calcul-ce2";

function calculPose(data: Omit<CalculPoseCanvasData, "kind">): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

/* =========================================================
   LES ITEMS FIGÉS (gardés tels quels)
========================================================= */

const FIXES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser 348 + 27, comment aligne-t-on les deux nombres ?",
    format: "qcm",
    choices: [
      "les unités sous les unités, à droite",
      "les premiers chiffres l'un sous l'autre, à gauche",
      "on met le plus grand nombre en bas",
      "peu importe, le résultat sera le même",
    ],
    expected: ["les unités sous les unités, à droite"],
    comparator: "mcq_exact",
    hint: "On ne peut ajouter que ce qui compte la même chose : des unités avec des unités.",
    explanation: exp(
      "Dans une opération posée, chaque colonne réunit des chiffres du même rang.",
      "On aligne les nombres par la droite : unités sous unités, dizaines sous dizaines.",
      "Le 7 de 27 est une unité : il se met sous le 8 de 348. Aligné à gauche, il tomberait sous le 3, une centaine, et on trouverait 618 au lieu de 375.",
      "On aligne par la droite, unités sous unités.",
    ),
    tags: ["ce2", "addition", "posee", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 348 + 27 ?",
    format: "short",
    expected: ["375"],
    comparator: "number_equal",
    hint: "8 + 7 dépasse 9 : garde la retenue pour les dizaines.",
    explanation: exp(
      "Quand une colonne dépasse 9, dix unités deviennent une dizaine : c'est la retenue.",
      "On additionne colonne par colonne en partant des unités.",
      "Unités : 8 + 7 = 15, on écrit 5 et on retient 1. Dizaines : 4 + 2 + 1 = 7. Centaines : 3. Le résultat est 375.",
      "348 + 27 = 375.",
    ),
    tags: ["ce2", "addition", "posee", "retenue"],
    canvas: calculPose({
      operation: "addition",
      numbers: ["348", "27"],
      result: "375",
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_addition_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une addition posée, que veut dire la petite retenue écrite en haut d'une colonne ?",
    format: "qcm",
    choices: [
      "dix unités de la colonne de droite regroupées",
      "un chiffre qu'on a oublié",
      "le résultat de la colonne",
      "un chiffre qu'on peut ignorer",
    ],
    expected: ["dix unités de la colonne de droite regroupées"],
    comparator: "mcq_exact",
    hint: "Dix unités font une dizaine : elle va rejoindre les dizaines.",
    explanation: exp(
      "Dix unités d'un rang se regroupent en une seule unité du rang suivant.",
      "Quand une colonne dépasse 9, on écrit le chiffre des unités et on porte le reste au rang de gauche.",
      "8 + 7 = 15, c'est-à-dire 1 dizaine et 5 unités. Le 5 reste dans la colonne des unités, la dizaine part rejoindre les dizaines : c'est elle, la retenue.",
      "C'est un groupement de dix, qui monte d'un rang.",
    ),
    tags: ["ce2", "addition", "posee", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Pour 52 - 27, un élève fait 7 - 2 = 5 aux unités et trouve 35. Où est l'erreur ?",
    format: "qcm",
    choices: [
      "on ne retourne pas la colonne : il faut casser une dizaine",
      "il fallait commencer par les dizaines",
      "il fallait poser 27 en haut",
      "il n'y a pas d'erreur",
    ],
    expected: ["on ne retourne pas la colonne : il faut casser une dizaine"],
    comparator: "mcq_exact",
    hint: "On enlève toujours le nombre du bas à celui du haut, jamais l'inverse.",
    explanation: exp(
      "Dans une soustraction, on enlève toujours le chiffre du bas à celui du haut, même s'il est plus grand.",
      "Quand le chiffre du haut est trop petit, on casse une dizaine du rang de gauche pour lui donner dix unités.",
      "52, c'est 4 dizaines et 12 unités. Alors 12 - 7 = 5 aux unités, et 4 - 2 = 2 aux dizaines : 25. En retournant la colonne, l'élève trouve 35, soit 10 de trop.",
      "Il fallait casser une dizaine : 52 - 27 = 25.",
    ),
    tags: ["ce2", "soustraction", "posee", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 403 - 158 ?",
    format: "short",
    expected: ["245"],
    comparator: "number_equal",
    hint: "Il n'y a aucune dizaine à casser : va chercher une centaine.",
    explanation: exp(
      "Quand le chiffre du haut est trop petit, on emprunte au rang de gauche.",
      "S'il n'y a rien à emprunter juste à gauche, on va chercher plus loin : une centaine se change en dix dizaines.",
      "403, c'est 3 centaines, 9 dizaines et 13 unités. Alors 13 - 8 = 5, puis 9 - 5 = 4, puis 3 - 1 = 2. Le résultat est 245.",
      "403 - 158 = 245.",
    ),
    tags: ["ce2", "soustraction", "posee", "retenue"],
    canvas: calculPose({
      operation: "soustraction",
      numbers: ["403", "158"],
      result: "245",
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_soustraction_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Comment vérifier qu'on n'a pas fait d'erreur dans une soustraction ?",
    format: "qcm",
    choices: [
      "on ajoute le résultat au nombre du bas et on doit retrouver celui du haut",
      "on refait exactement le même calcul",
      "on multiplie les deux nombres",
      "on ne peut pas vérifier",
    ],
    expected: ["on ajoute le résultat au nombre du bas et on doit retrouver celui du haut"],
    comparator: "mcq_exact",
    hint: "L'addition défait ce que la soustraction a fait.",
    explanation: exp(
      "L'addition et la soustraction sont deux opérations inverses : l'une défait l'autre.",
      "On additionne le résultat trouvé avec le nombre qu'on avait enlevé.",
      "Si 52 - 27 = 25, alors 25 + 27 doit redonner 52. C'est le cas. En revanche, avec la réponse fausse 35 : 35 + 27 = 62, et non 52 — l'erreur se voit tout de suite.",
      "On ajoute le résultat au nombre enlevé.",
    ),
    tags: ["ce2", "soustraction", "posee", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'addition 12 + 25 = 37, comment appelle-t-on 12 et 25 ?",
    format: "qcm",
    choices: ["les termes", "les sommes", "les facteurs", "les différences"],
    expected: ["les termes"],
    comparator: "mcq_exact",
    hint: "Ce sont les nombres qu'on additionne, pas le résultat.",
    explanation: exp(
      "Les nombres qu'on additionne s'appellent les termes ; leur résultat s'appelle la somme.",
      "On repère ce qui est de chaque côté du signe, et ce qui est après le signe égal.",
      "12 et 25 sont les termes de l'addition 12 + 25. Le nombre 37, lui, est la somme. « Facteur » appartient à la multiplication, pas à l'addition.",
      "12 et 25 sont les termes.",
    ),
    tags: ["ce2", "addition", "vocabulaire", "terme", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la soustraction 60 − 37, comment appelle-t-on 60 et 37 ?",
    format: "qcm",
    choices: ["les termes", "les différences", "les facteurs", "les restes"],
    expected: ["les termes"],
    comparator: "mcq_exact",
    hint: "Le mot ne sert pas qu'à l'addition.",
    explanation: exp(
      "Les nombres d'une soustraction s'appellent eux aussi des termes ; leur résultat s'appelle la différence.",
      "On nomme d'abord ce qu'on calcule, ensuite ce qu'on obtient.",
      "60 et 37 sont les termes de la soustraction 60 − 37. Le résultat, 23, est la différence. Un seul mot pour les deux opérations : terme.",
      "60 et 37 sont les termes.",
    ),
    tags: ["ce2", "soustraction", "vocabulaire", "terme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_vocabulaire_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "« Calcule la somme de 26 et de 14. » Un élève écrit « 26 + 14 » et s'arrête. A-t-il répondu ?",
    format: "qcm",
    choices: [
      "non : la somme est le résultat, il fallait écrire 40",
      "oui, c'est exactement ce qu'on demandait",
      "non, il fallait écrire 26 − 14",
      "non, il fallait écrire 14 + 26",
    ],
    expected: ["non : la somme est le résultat, il fallait écrire 40"],
    comparator: "mcq_exact",
    hint: "Il a écrit le calcul. On lui demandait ce que ce calcul donne.",
    explanation: exp(
      "La somme n'est pas l'addition : l'addition est l'opération, la somme est ce qu'elle produit.",
      "On pose le calcul, puis on va jusqu'au bout et on écrit le nombre trouvé.",
      "26 + 14 = 40. La réponse attendue est 40. Écrire « 26 + 14 », c'est répéter la question autrement.",
      "Non : la somme de 26 et de 14 est 40.",
    ),
    tags: ["ce2", "addition", "vocabulaire", "somme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 47 + ... = 100",
    format: "short",
    expected: ["53"],
    comparator: "number_equal",
    hint: "Passe d'abord de 47 à 50.",
    explanation: exp(
      "Compléter à 100, c'est chercher ce qui manque pour atteindre la centaine.",
      "On avance par étapes : d'abord jusqu'à la dizaine ronde, puis jusqu'à 100.",
      "De 47 à 50 : 3. De 50 à 100 : 50. En tout : 3 + 50 = 53.",
      "Il manque 53.",
    ),
    tags: ["ce2", "addition", "complement", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : ... - 36 = 24",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "On a enlevé 36 et il reste 24 : combien y avait-il au départ ?",
    explanation: exp(
      "Quand le nombre qui manque est celui de DÉPART, on le retrouve en additionnant.",
      "On remet ce qui a été enlevé sur ce qui reste.",
      "Il reste 24 après avoir enlevé 36 : au départ il y avait 24 + 36 = 60. Vérification : 60 - 36 = 24.",
      "Il manque 60.",
    ),
    tags: ["ce2", "soustraction", "complement", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_complement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compléter 68 + ... = 95, quelle opération fait-on ?",
    format: "qcm",
    choices: ["95 - 68", "95 + 68", "68 - 95", "68 × 95"],
    expected: ["95 - 68"],
    comparator: "mcq_exact",
    hint: "On cherche l'écart entre 68 et 95.",
    explanation: exp(
      "Le nombre qui manque dans une addition se trouve par une soustraction.",
      "On enlève au total ce qu'on a déjà.",
      "On a déjà 68 et on veut atteindre 95 : il manque 95 - 68 = 27. On n'écrit pas 68 - 95, qui reviendrait à enlever le plus grand du plus petit.",
      "On calcule 95 - 68.",
    ),
    tags: ["ce2", "addition", "complement", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève calcule 198 + 203 et trouve 1001. Sans refaire le calcul, que peut-on dire ?",
    format: "qcm",
    choices: [
      "c'est faux : 198 et 203 sont proches de 200, le total est proche de 400",
      "c'est juste",
      "on ne peut rien dire sans poser le calcul",
      "c'est faux, le total doit être proche de 800",
    ],
    expected: ["c'est faux : 198 et 203 sont proches de 200, le total est proche de 400"],
    comparator: "mcq_exact",
    hint: "Remplace chaque nombre par le nombre rond le plus proche.",
    explanation: exp(
      "Estimer, c'est remplacer les nombres par des nombres ronds pour prévoir l'ordre de grandeur du résultat.",
      "On arrondit chaque nombre, on calcule de tête, puis on compare au résultat annoncé.",
      "198 et 203 sont tous deux proches de 200, donc le total est proche de 200 + 200 = 400. Le 1001 annoncé est plus de deux fois trop grand : il y a une erreur.",
      "C'est faux : le résultat doit être proche de 400.",
    ),
    tags: ["ce2", "addition", "estimer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert d'estimer un résultat AVANT de poser le calcul ?",
    format: "qcm",
    choices: [
      "à savoir tout de suite si le résultat trouvé est possible",
      "à trouver le résultat exact plus vite",
      "à éviter de poser le calcul",
      "à rien, c'est du temps perdu",
    ],
    expected: ["à savoir tout de suite si le résultat trouvé est possible"],
    comparator: "mcq_exact",
    hint: "L'estimation ne donne pas le résultat : elle donne son voisinage.",
    explanation: exp(
      "Une estimation donne l'ordre de grandeur du résultat, pas sa valeur exacte.",
      "On arrondit, on calcule de tête, et on garde ce nombre en tête pendant qu'on pose l'opération.",
      "Si l'estimation annonce environ 400 et que le calcul posé donne 1001, on sait qu'il faut recommencer — sans même chercher où est l'erreur.",
      "Elle sert à contrôler si le résultat est possible.",
    ),
    tags: ["ce2", "addition", "estimer", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Environ combien font 297 + 405 ?",
    format: "qcm",
    choices: ["environ 700", "environ 600", "environ 800", "environ 1100"],
    expected: ["environ 700"],
    comparator: "mcq_exact",
    hint: "Remplace 297 par 300 et 405 par 400.",
    explanation: exp(
      "Estimer, c'est remplacer chaque nombre par le nombre rond le plus proche.",
      "On arrondit à la centaine, puis on additionne de tête.",
      "297 est proche de 300, et 405 de 400. Donc 300 + 400 = 700 : le résultat exact sera juste au-dessus de 700.",
      "C'est environ 700.",
    ),
    tags: ["ce2", "addition", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'opération posée 3?4 + 128 = 482, quel chiffre se cache sous le « ? » ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche d'abord le nombre entier : 482 - 128.",
    explanation: exp(
      "Un chiffre manquant se retrouve en remontant l'opération à l'envers.",
      "On calcule la soustraction pour retrouver le nombre complet, puis on lit le chiffre cherché.",
      "482 - 128 = 354. Le nombre caché est donc 354, et le chiffre des dizaines est 5.",
      "C'est le 5.",
    ),
    tags: ["ce2", "addition", "defi", "chiffre_manquant"],
  },
  {
    kind: "fixed",
    id: "ce2_add_sous_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce2_add_sous_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur 253 élèves, 128 partent en sortie le matin et 74 autres l'après-midi. Combien ne sont pas partis ?",
    format: "short",
    expected: ["51"],
    comparator: "number_equal",
    hint: "Additionne d'abord les deux groupes partis.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les deux groupes partis, puis on retire ce total de l'effectif de l'école.",
      "128 + 74 = 202 élèves partis. Puis 253 - 202 = 51.",
      "51 élèves ne sont pas partis.",
    ),
    tags: ["ce2", "addition", "defi", "reunion", "deux_etapes"],
  },
];

/* =========================================================
   LES GABARITS — une famille × une situation × une tournure
========================================================= */

const N = "addition_soustraction";
const g = (id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], gen: () => Q, theme: "neutral" | "reunion" = "neutral") =>
  gabarit({ id, notionId: N, microId, difficulty, hint, tags, theme }, gen);

const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);
const avec = (canvas: Q["canvas"] | undefined): Partial<Q> => (canvas ? { canvas } : {});

const chiffres = (n: number) => String(n).split("").reverse().map(Number);

/** L'addition faite colonne par colonne SANS les retenues (l'erreur la plus vue). */
function sansRetenue(a: number, b: number): number {
  const A = chiffres(a);
  const B = chiffres(b);
  let r = 0;
  for (let i = Math.max(A.length, B.length) - 1; i >= 0; i--) r = r * 10 + (((A[i] ?? 0) + (B[i] ?? 0)) % 10);
  return r;
}

/** La soustraction « à l'envers » : dans chaque colonne, le grand moins le petit. */
function aLEnvers(a: number, b: number): number {
  const A = chiffres(a);
  const B = chiffres(b);
  let r = 0;
  for (let i = A.length - 1; i >= 0; i--) r = r * 10 + Math.abs((A[i] ?? 0) - (B[i] ?? 0));
  return r;
}

const aDesRetenues = (a: number, b: number) => sansRetenue(a, b) !== a + b;

/** Deux nombres pour une addition posée, somme sous 10 000. */
function deuxNombres(etoile: Etoile): [number, number] {
  if (etoile <= 2) return [rint(120, 680), rint(15, 290)];
  if (etoile === 3) return Math.random() < 0.5 ? [rint(120, 899), rint(45, 899)] : [rint(1020, 4800), rint(120, 3900)];
  return [rint(1200, 5800), rint(380, 3900)];
}

/* ---------------------------------------------------------
   LES SITUATIONS — un total de deux quantités, un retrait.
--------------------------------------------------------- */

type Sit = (p: Prenom, a: string, b: string) => string;

const REUNIONS: readonly Sit[] = [
  (p, a, b) => `Au zoo, ${a} visiteurs sont venus samedi et ${b} dimanche. Combien en tout ?`,
  (p, a, b) => `La bibliothécaire a ${a} contes et ${b} livres de sciences. Combien de livres en tout ?`,
  (p, a, b) => `${p.nom} a ${a} points au jeu, puis en gagne ${b}. Combien en a-t-${p.il} ?`,
  (p, a, b) => `Le cirque a vendu ${a} billets le matin et ${b} le soir. Combien en tout ?`,
  (p, a, b) => `La fusée a ${a} litres d'eau ; on en ajoute ${b}. Combien de litres en tout ?`,
  (p, a, b) => `Les pirates trouvent ${a} pièces d'or, puis ${b}. Combien en tout ?`,
  (p, a, b) => `La boulangère a fait ${a} croissants et ${b} brioches. Combien en tout ?`,
  (p, a, b) => `${p.nom} roule ${a} mètres le matin et ${b} le soir. Combien de mètres en tout ?`,
  (p, a, b) => `À la kermesse, on a vendu ${a} tickets, puis ${b}. Combien de tickets en tout ?`,
  (p, a, b) => `Le jardinier plante ${a} tulipes et ${b} roses. Combien de fleurs plante-t-il ?`,
  (p, a, b) => `Le musée range ${a} fossiles dans une salle et ${b} dans l'autre. Combien en tout ?`,
  (p, a, b) => `Le train transporte ${a} voyageurs. ${b} montent à la gare. Combien sont-ils ?`,
  (p, a, b) => `L'astronaute compte ${a} étoiles, puis ${b} autres. Combien d'étoiles en tout ?`,
  (p, a, b) => `À la piscine, ${a} enfants sont venus en juin et ${b} en juillet. Combien en tout ?`,
  (p, a, b) => `La fermière a ramassé ${a} œufs, puis ${b}. Combien d'œufs en tout ?`,
];

const RETRAITS: readonly Sit[] = [
  (p, a, b) => `La bibliothèque avait ${a} livres. Elle en prête ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `${p.nom} a ${a} points au jeu. ${maj(p.il)} en perd ${b}. Combien lui en reste-t-il ?`,
  (p, a, b) => `Le cirque a ${a} places. ${b} sont déjà vendues. Combien restent libres ?`,
  (p, a, b) => `Les pirates avaient ${a} pièces d'or. Ils en dépensent ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `La boulangère a fait ${a} croissants. Elle en a vendu ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `Le chemin fait ${a} mètres. ${p.nom} en a marché ${b}. Combien lui en reste-t-il ?`,
  (p, a, b) => `À la kermesse, il y avait ${a} ballons. ${b} s'envolent. Combien en reste-t-il ?`,
  (p, a, b) => `Le jardinier avait ${a} graines. Il en sème ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `Le train transporte ${a} voyageurs. ${b} descendent. Combien en reste-t-il ?`,
  (p, a, b) => `La fusée a ${a} litres de carburant. Elle en brûle ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `${p.nom} lit un livre de ${a} pages. ${maj(p.il)} en a lu ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `Le zoo a reçu ${a} kilos de fruits. Les singes en mangent ${b}. Combien en reste-t-il ?`,
  (p, a, b) => `La cantine avait ${a} yaourts. ${b} ont été mangés. Combien en reste-t-il ?`,
  (p, a, b) => `Le marchand de Saint-Pierre avait ${a} letchis. Il en vend ${b}. Combien en reste-t-il ?`,
];

/* ---------------------------------------------------------
   POSER UNE ADDITION, UNE SOUSTRACTION
--------------------------------------------------------- */

function additionPosee(a: number, b: number): Q {
  const r = a + b;
  const p = quelquun();
  const f = rint(1, 10);
  const canvas = pose("addition", [a, b]);
  if (f <= 6) {
    const text = pick([
      poserCalcul(`${fmt(a)} + ${fmt(b)}`, p),
      `Pose et calcule : ${fmt(a)} + ${fmt(b)}.`,
      `${p.nom} pose l'addition ${fmt(a)} + ${fmt(b)}. Quel résultat doit-${p.il} trouver ?`,
      `Voici une addition posée. Quel est son résultat ?`,
      `${p.nom} a posé ${fmt(a)} + ${fmt(b)} dans son cahier. Combien trouve-${tIl(p)} ?`,
    ]);
    return qN(
      text,
      r,
      [sansRetenue(a, b), r + 10, r - 10, r + 100, r - 100, r + 1, a + b * 10],
      exp(
        "On additionne colonne par colonne en partant des unités ; dix unités d'un rang font une unité du rang suivant (la retenue).",
        "On aligne les unités sous les unités, puis on avance vers la gauche en portant les retenues.",
        `Unités : ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}${(a % 10) + (b % 10) >= 10 ? `, on écrit ${((a % 10) + (b % 10)) % 10} et on retient 1` : ""}. On continue vers la gauche : le total est ${fmt(r)}.`,
        `${fmt(a)} + ${fmt(b)} = ${fmt(r)}.`,
      ),
      { canvas },
    );
  }
  if (f <= 8) {
    const rang = pick(["unités", "dizaines"] as const);
    const chiffre = rang === "unités" ? r % 10 : Math.floor(r / 10) % 10;
    const faux = rang === "unités" ? ((a % 10) + (b % 10)) : (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    return chiffreQ(chiffre, faux, rang, a, b, r, p);
  }
  const ret = (a % 10) + (b % 10) >= 10;
  return qM(
    pick([
      `Dans ${fmt(a)} + ${fmt(b)}, faut-il une retenue des unités aux dizaines ?`,
      `${p.nom} pose ${fmt(a)} + ${fmt(b)}. Doit-${p.il} écrire une retenue au-dessus des dizaines ?`,
    ]),
    ret ? `oui, car ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}` : `non, car ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}`,
    [
      ret ? `non, car ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}` : `oui, car ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}`,
      "on ne peut pas savoir avant d'avoir fini",
      "oui, il y a toujours une retenue",
    ],
    exp("On met une retenue quand une colonne dépasse 9.", "On regarde la somme des unités.", `${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}.`, ret ? "Elle dépasse 9 : une dizaine part dans la colonne des dizaines." : "Elle ne dépasse pas 9 : pas de retenue."),
    { canvas },
  );
}

/** Le chiffre d'un rang du résultat : les choix sont des chiffres de 0 à 9. */
function chiffreQ(chiffre: number, faux: number, rang: string, a: number, b: number, r: number, p: Prenom): Q {
  const pieges = [faux % 10, (chiffre + 1) % 10, (chiffre + 9) % 10, (chiffre + 2) % 10, (chiffre + 8) % 10].filter((d) => d !== chiffre).map(String);
  return qM(
    pick([
      `Dans cette addition posée, quel chiffre écrit-on dans la colonne des ${rang} du résultat ?`,
      `${p.nom} pose ${fmt(a)} + ${fmt(b)}. Quel chiffre doit-${p.il} écrire aux ${rang} du résultat ?`,
      `Regarde l'addition posée. Quel est le chiffre des ${rang} du résultat ?`,
      `${p.nom} a commencé l'addition posée. Quel chiffre va dans la colonne des ${rang}, en bas ?`,
    ]),
    String(chiffre),
    pieges,
    exp("Dans chaque colonne, on écrit le chiffre des unités de la somme, et on retient les dizaines.", `On additionne la colonne des ${rang}${rang === "dizaines" ? ", sans oublier la retenue des unités" : ""}.`, `Le résultat complet est ${fmt(r)} : le chiffre des ${rang} est ${chiffre}.`, `On écrit ${chiffre}.`),
    { canvas: pose("addition", [a, b]) },
  );
}

function soustractionPosee(a: number, b: number): Q {
  const r = a - b;
  const p = quelquun();
  const f = rint(1, 10);
  const canvas = pose("soustraction", [a, b]);
  if (f <= 7) {
    return qN(
      pick([
        poserCalcul(`${fmt(a)} − ${fmt(b)}`, p),
        `Pose et calcule : ${fmt(a)} − ${fmt(b)}.`,
        `${p.nom} pose la soustraction ${fmt(a)} − ${fmt(b)}. Quel résultat doit-${p.il} trouver ?`,
        `Voici une soustraction posée. Quel est son résultat ?`,
        `${p.nom} a posé ${fmt(a)} − ${fmt(b)} dans son cahier. Combien trouve-${tIl(p)} ?`,
      ]),
      r,
      [aLEnvers(a, b), r + 10, r - 10, r + 100, r - 100, r + 1, a + b],
      exp(
        "On soustrait colonne par colonne en partant des unités. Si le chiffre du haut est trop petit, on casse une dizaine (ou une centaine) du rang de gauche.",
        "On ne retourne jamais la colonne : on prend toujours le chiffre du haut moins celui du bas.",
        `${fmt(a)} − ${fmt(b)} = ${fmt(r)}. Vérification : ${fmt(r)} + ${fmt(b)} = ${fmt(a)}.`,
        `${fmt(a)} − ${fmt(b)} = ${fmt(r)}.`,
      ),
      { canvas },
    );
  }
  return qN(
    pick([
      `Pour vérifier ${fmt(a)} − ${fmt(b)} = ${fmt(r)}, ${p.nom} fait une addition. Que doit-${p.il} retrouver ?`,
      `${p.nom} vérifie ${fmt(a)} − ${fmt(b)} = ${fmt(r)} en calculant ${fmt(r)} + ${fmt(b)}. Que doit-${p.il} trouver ?`,
      `On vérifie une soustraction avec une addition : combien font ${fmt(r)} + ${fmt(b)} ?`,
    ]),
    a,
    [r, b, a + 10, a - 10, r + b + 1],
    exp("Une soustraction se vérifie par une addition.", "Résultat + nombre du bas = nombre du haut.", `${fmt(r)} + ${fmt(b)} = ${fmt(a)}.`, `On retrouve ${fmt(a)} : le calcul est juste.`),
    { canvas },
  );
}

/** Deux nombres pour une soustraction posée avec au moins une retenue. */
function deuxPourSoustraire(etoile: Etoile): [number, number] {
  for (;;) {
    const a = etoile <= 3 ? (Math.random() < 0.5 ? rint(210, 980) : rint(1010, 4900)) : rint(1200, 9600);
    const b = rint(etoile <= 3 ? 35 : 180, Math.floor(a * 0.8));
    if (aLEnvers(a, b) !== a - b) return [a, b];
  }
}

function erreurSoustraction(): Q {
  const p = quelquun();
  for (;;) {
    const [a, b] = deuxPourSoustraire(4);
    const faux = aLEnvers(a, b);
    if (faux === a - b) continue;
    const r = a - b;
    return qN(
      pick([
        `${p.nom} calcule ${fmt(a)} − ${fmt(b)} et trouve ${fmt(faux)}. ${maj(p.il)} a retourné une colonne. Quelle est la bonne réponse ?`,
        `Voici la soustraction posée par ${p.nom}. ${maj(p.il)} trouve ${fmt(faux)}, mais c'est faux. Quel est le bon résultat ?`,
        `${p.nom} fait partout « le grand moins le petit » pour ${fmt(a)} − ${fmt(b)}. Quel est le bon résultat ?`,
      ]),
      r,
      [faux, r + 10, r - 10, r + 100, r - 100],
      exp(
        "Dans une soustraction posée, on prend toujours le chiffre du haut moins celui du bas.",
        "Quand le chiffre du haut est trop petit, on casse une dizaine (ou une centaine) du rang de gauche.",
        `${fmt(a)} − ${fmt(b)} = ${fmt(r)} ; vérification : ${fmt(r)} + ${fmt(b)} = ${fmt(a)}. Avec ${fmt(faux)}, on ne retrouve pas ${fmt(a)}.`,
        `Le bon résultat est ${fmt(r)}.`,
      ),
      { canvas: { ...pose("soustraction", [a, b]), result: String(faux), display: { showResult: true, showRetenues: false } } },
    );
  }
}

function enSituation(plus: boolean, a: number, b: number): Q {
  const p = quelquun();
  const A = fmt(a);
  const B = fmt(b);
  const r = plus ? a + b : a - b;
  const text = pick(plus ? REUNIONS : RETRAITS)(p, A, B);
  const dessin = pick(["pose", "barre", "aucun"] as const);
  const canvas =
    dessin === "pose"
      ? pose(plus ? "addition" : "soustraction", [a, b])
      : dessin === "barre"
        ? plus
          ? barre([["", A], ["", B]], null)
          : barre([["", B], ["il reste", null]], A)
        : undefined;
  return qN(
    text,
    r,
    plus ? [sansRetenue(a, b), r + 10, r - 10, r + 100, a - b] : [aLEnvers(a, b), r + 10, r - 10, r + 100, a + b],
    exp(
      plus ? "Quand on réunit deux quantités, on les additionne." : "Quand on enlève une quantité, on fait une soustraction.",
      plus ? `On pose ${A} + ${B}, unités sous unités.` : `On pose ${A} − ${B}, unités sous unités.`,
      plus ? `${A} + ${B} = ${fmt(r)}.` : `${A} − ${B} = ${fmt(r)} ; vérification : ${fmt(r)} + ${B} = ${A}.`,
      `La réponse est ${fmt(r)}.`,
    ),
    avec(canvas),
  );
}

/* ---------------------------------------------------------
   LE VOCABULAIRE : terme, somme, différence
--------------------------------------------------------- */

function vocabulaire(): Q {
  const p = quelquun();
  const a = rint(24, 380);
  const b = rint(11, a - 5);
  const f = rint(1, 6);
  if (f === 1)
    return qM(
      pick([
        `Quelle est la somme de ${a} et de ${b} ?`,
        `${p.nom} doit calculer la somme de ${a} et de ${b}. Que trouve-${tIl(p)} ?`,
        `Calcule la somme de ${a} et de ${b}.`,
      ]),
      fmt(a + b),
      [`${a} + ${b}`, fmt(a - b), fmt(a + b + 1), fmt(a + b + 10)],
      exp("La somme est le RÉSULTAT d'une addition.", "On additionne les deux termes.", `${a} + ${b} = ${a + b}.`, `La somme est ${a + b}.`),
      avec(parfois(0.6, () => barre([["", String(a)], ["", String(b)]], null))),
    );
  if (f === 2)
    return qM(
      pick([
        `Quelle est la différence entre ${a} et ${b} ?`,
        `${p.nom} cherche la différence entre ${a} et ${b}. Que trouve-${tIl(p)} ?`,
        `Calcule la différence entre ${a} et ${b}.`,
      ]),
      fmt(a - b),
      [`${a} − ${b}`, fmt(a + b), fmt(a - b + 1), fmt(a - b + 10)],
      exp("La différence est le RÉSULTAT d'une soustraction : l'écart entre deux nombres.", "On enlève le plus petit du plus grand.", `${a} − ${b} = ${a - b}.`, `La différence est ${a - b}.`),
      avec(parfois(0.6, () => barre([["", String(b)], ["écart", null]], String(a)))),
    );
  if (f === 3) {
    const plus = Math.random() < 0.5;
    const c = plus ? a + b : a - b;
    const bon = plus ? "la somme" : "la différence";
    return qM(
      pick([
        `Dans ${a} ${plus ? "+" : "−"} ${b} = ${c}, comment appelle-t-on ${c} ?`,
        `${p.nom} écrit ${a} ${plus ? "+" : "−"} ${b} = ${c}. Quel nom porte ${c} ?`,
        `Pic le paille-en-queue montre le ${c} de ${a} ${plus ? "+" : "−"} ${b} = ${c}. Comment s'appelle-t-il ?`,
      ]),
      bon,
      [plus ? "la différence" : "la somme", "un terme", "le produit"],
      exp("La somme est le résultat d'une addition, la différence celui d'une soustraction. Les nombres qu'on ajoute ou qu'on soustrait sont les termes.", "On regarde le signe de l'opération.", `Le signe est « ${plus ? "+" : "−"} » : ${c} est ${bon}.`, `${c} est ${bon}.`),
      avec(parfois(0.5, () => pose(plus ? "addition" : "soustraction", [a, b]))),
    );
  }
  if (f === 4) {
    const plus = Math.random() < 0.5;
    const c = plus ? a + b : a - b;
    return qM(
      pick([
        `Dans ${a} ${plus ? "+" : "−"} ${b} = ${c}, comment appelle-t-on ${a} et ${b} ?`,
        `${p.nom} écrit ${a} ${plus ? "+" : "−"} ${b} = ${c}. Comment s'appellent ${a} et ${b} ?`,
      ]),
      "les termes",
      [plus ? "les sommes" : "les différences", "les facteurs", "les résultats"],
      exp("Les nombres qu'on ajoute ou qu'on soustrait s'appellent les termes.", "Le résultat a son propre nom : somme ou différence.", `${a} et ${b} sont les termes ; ${c} est ${plus ? "la somme" : "la différence"}.`, "Ce sont les termes."),
      avec(parfois(0.5, () => pose(plus ? "addition" : "soustraction", [a, b]))),
    );
  }
  if (f === 5) {
    const dit = Math.random() < 0.5 ? a + b : a - b;
    const juste = dit === a + b;
    return qM(
      pick([
        `${p.nom} dit : « La somme de ${a} et de ${b}, c'est ${dit}. » A-t-${p.il} raison ?`,
        `Pic le paille-en-queue annonce que la somme de ${a} et de ${b} est ${dit}. Est-ce juste ?`,
      ]),
      juste ? "oui, c'est le résultat de l'addition" : `non, ${dit} est leur différence`,
      [juste ? `non, ${dit} est leur différence` : "oui, c'est le résultat de l'addition", "non, la somme est un des termes", "on ne peut pas savoir"],
      exp("La somme est le résultat de l'addition.", `On calcule ${a} + ${b}.`, `${a} + ${b} = ${a + b}${juste ? "" : ` ; ${a} − ${b} = ${a - b}, c'est la différence`}.`, juste ? "Oui, c'est bien la somme." : "Non : c'est la différence."),
      avec(parfois(0.5, () => barre([["", String(a)], ["", String(b)]], null))),
    );
  }
  const [x, y] = deuxPersonnes();
  const m = pick(MONDES);
  if (Math.random() < 0.5)
    return qM(
      `${x.nom} a ${nObj(a, m)} et ${y.nom} en a ${b}. Quelle est la différence entre leurs nombres ${de(m.des)} ?`,
      fmt(a - b),
      [fmt(a + b), fmt(a - b + 10), fmt(a - b - 1), `${a} − ${b}`],
      exp("La différence est le résultat d'une soustraction.", "On enlève le plus petit nombre du plus grand.", `${a} − ${b} = ${a - b}.`, `La différence est ${a - b}.`),
      avec(parfois(0.6, () => barre([[y.nom, String(b)], ["écart", null]], String(a)))),
    );
  return qM(
    `${x.nom} a ${nObj(a, m)} et ${y.nom} en a ${b}. Quelle est la somme de leurs ${m.des} ?`,
    fmt(a + b),
    [fmt(a - b), fmt(a + b + 10), fmt(a + b + 1), `${a} + ${b}`],
    exp("La somme est le résultat d'une addition.", "On additionne les deux nombres.", `${a} + ${b} = ${a + b}.`, `La somme est ${a + b}.`),
    avec(parfois(0.6, () => barre([[x.nom, String(a)], [y.nom, String(b)]], null))),
  );
}

/* ---------------------------------------------------------
   COMPLÉTER UNE ÉGALITÉ
--------------------------------------------------------- */

function completerPlus(a: number, c: number): Q {
  const r = c - a;
  const p = quelquun();
  const m = monde();
  const text = pick([
    `Complète : ${fmt(a)} + … = ${fmt(c)}`,
    `Quel nombre manque : ${fmt(a)} + ? = ${fmt(c)} ?`,
    `Complète : … + ${fmt(a)} = ${fmt(c)}`,
    `${p.nom} cherche le nombre caché : ${fmt(a)} + ? = ${fmt(c)}.`,
    `${p.nom} a ${nObj(a, m)}. ${maj(p.il)} en veut ${fmt(c)}. Combien lui en manque-t-il ?`,
    `Pic le paille-en-queue a ${fmt(a)} graines. Combien doit-il en trouver pour en avoir ${fmt(c)} ?`,
    `Le cirque a ${fmt(c)} places. ${fmt(a)} sont occupées. Combien sont libres ?`,
    `${p.nom} a déjà ${fmt(a)} points. Il en faut ${fmt(c)} pour gagner. Combien de points lui manque-t-il ?`,
    `${p.nom} lit un livre de ${fmt(c)} pages. ${maj(p.il)} est à la page ${fmt(a)}. Combien lui en reste-t-il ?`,
    `Le jardinier veut planter ${fmt(c)} fleurs. Il en a planté ${fmt(a)}. Combien lui en reste-t-il à planter ?`,
    `Les pirates veulent ${fmt(c)} pièces d'or. Ils en ont ${fmt(a)}. Combien leur en manque-t-il ?`,
    `La fusée doit monter à ${fmt(c)} mètres. Elle est à ${fmt(a)} mètres. Combien lui en manque-t-il ?`,
    `${p.nom} écrit ${fmt(a)} + … = ${fmt(c)} sur son ardoise. Quel nombre remplace les points ?`,
    `Le puzzle ${de(p.nom)} a ${fmt(c)} pièces. ${maj(p.il)} en a posé ${fmt(a)}. Combien de pièces reste-t-il ?`,
  ]);
  return qN(
    text,
    r,
    [r + 10, r - 10, r + 1, r - 1, a + c, r + 100],
    exp("Compléter une addition, c'est chercher ce qui manque.", `On calcule l'écart : ${fmt(c)} − ${fmt(a)}.`, `${fmt(c)} − ${fmt(a)} = ${fmt(r)}, et ${fmt(a)} + ${fmt(r)} = ${fmt(c)}.`, `Le nombre qui manque est ${fmt(r)}.`),
    avec(parfois(0.6, () => barre([["", fmt(a)], ["", null]], fmt(c)))),
  );
}

function completerMoins(): Q {
  const p = quelquun();
  const b = rint(24, 480);
  const r = rint(15, 480);
  const a = b + r;
  if (Math.random() < 0.55) {
    // … − b = r : on cherche le nombre de départ.
    return qN(
      pick([
        `Complète : … − ${b} = ${r}`,
        `Quel nombre manque : ? − ${b} = ${r} ?`,
        `${p.nom} avait des billes. ${maj(p.il)} en a donné ${b}, il lui en reste ${r}. Combien en avait-${p.il} ?`,
        `La boulangère a vendu ${b} croissants. Il lui en reste ${r}. Combien en avait-elle fait ?`,
        `Pic le paille-en-queue a mangé ${b} graines. Il lui en reste ${r}. Combien en avait-il au départ ?`,
        `${p.nom} cherche le nombre de départ : ? − ${b} = ${r}.`,
        `Le jardinier a semé ${b} graines. Il lui en reste ${r}. Combien de graines avait-il ?`,
        `${p.nom} a perdu ${b} points au jeu. ${maj(p.il)} en a encore ${r}. Combien de points avait-${p.il} avant ?`,
        `Les pirates ont dépensé ${b} pièces d'or. Il leur en reste ${r}. Combien en avaient-ils ?`,
      ]),
      a,
      [r - b > 0 ? r - b : r + b + 10, a + 10, a - 10, a + 1, a - 1, a + 100],
      exp("Pour retrouver le nombre de départ d'une soustraction, on fait le chemin inverse.", `On ajoute ce qu'on a enlevé à ce qui reste : ${r} + ${b}.`, `${r} + ${b} = ${a}, et ${a} − ${b} = ${r}.`, `Le nombre qui manque est ${a}.`),
      avec(parfois(0.6, () => barre([["enlevé", String(b)], ["reste", String(r)]], null))),
    );
  }
  // a − … = r : on cherche ce qu'on a enlevé.
  return qN(
    pick([
      `Complète : ${a} − … = ${r}`,
      `Quel nombre manque : ${a} − ? = ${r} ?`,
      `${p.nom} avait ${a} images. Il lui en reste ${r}. Combien en a-t-${p.il} donné ?`,
      `Le train transportait ${a} voyageurs. Il en reste ${r}. Combien sont descendus ?`,
      `${p.nom} cherche le nombre caché : ${a} − ? = ${r}.`,
      `La bibliothèque avait ${a} livres. Il en reste ${r} sur les étagères. Combien de livres sont prêtés ?`,
      `${p.nom} avait ${a} points. ${maj(p.il)} n'en a plus que ${r}. Combien de points a-t-${p.il} perdus ?`,
    ]),
    b,
    [a + r, b + 10, b - 10, b + 1, b - 1],
    exp("Dans une soustraction, ce qu'on enlève est l'écart entre le départ et ce qui reste.", `On calcule ${a} − ${r}.`, `${a} − ${r} = ${b}, et ${a} − ${b} = ${r}.`, `Le nombre qui manque est ${b}.`),
    avec(parfois(0.6, () => barre([["enlevé", null], ["reste", String(r)]], String(a)))),
  );
}

/* ---------------------------------------------------------
   ESTIMER
--------------------------------------------------------- */

const proche = (c: number) => c * 100 + pick([-3, -2, -1, 1, 2, 3, 4, -4, 5]);

function estimer(): Q {
  const p = quelquun();
  const ca = rint(2, 6);
  const cb = rint(1, 4);
  const a = proche(ca);
  const b = proche(cb);
  const plus = Math.random() < 0.65;
  const vrai = plus ? ca + cb : ca - cb;
  const cible = plus ? ca + cb : ca - cb;
  if (!plus && cible <= 0) return estimer();
  const opt = (k: number) => `environ ${fmt(k * 100)}`;
  const calc = `${a} ${plus ? "+" : "−"} ${b}`;
  const sit = plus
    ? pick([
        `Au cinéma, il y a eu ${a} enfants le matin et ${b} l'après-midi. Environ combien d'enfants en tout ?`,
        `${p.nom} a ${a} images et en reçoit ${b}. Environ combien en a-t-${p.il} ?`,
        `La fermière a ${a} poules et ${b} canards. Environ combien d'animaux ?`,
        `Le zoo a reçu ${a} visiteurs samedi et ${b} dimanche. Environ combien de visiteurs ?`,
        `Les pirates trouvent ${a} pièces d'or, puis ${b} autres. Environ combien de pièces ont-ils ?`,
        `${p.nom} fait ${a} pas le matin et ${b} pas le soir. Environ combien de pas en tout ?`,
        `La boulangère vend ${a} croissants et ${b} baguettes. Environ combien de viennoiseries et de pains ?`,
      ])
    : pick([
        `La bibliothèque a ${a} livres. Elle en prête ${b}. Environ combien en reste-t-il ?`,
        `Le cirque a ${a} places. ${b} sont vendues. Environ combien de places restent ?`,
        `${p.nom} a ${a} images. ${maj(p.il)} en donne ${b}. Environ combien lui en reste-t-il ?`,
        `La fusée a ${a} litres d'eau. Les astronautes en boivent ${b}. Environ combien de litres reste-t-il ?`,
        `Le jardinier a ${a} graines. Il en sème ${b}. Environ combien lui en reste-t-il ?`,
      ]);
  const text = pick([
    `Environ combien font ${calc} ?`,
    `Sans calculer exactement, ${calc} fait environ…`,
    `${p.nom} arrondit pour estimer ${calc}. Que trouve-${tIl(p)} ?`,
    `Pic le paille-en-queue veut un ordre de grandeur de ${calc}. Lequel ?`,
    `${p.nom} ne veut pas poser ${calc}. ${maj(p.il)} cherche juste un résultat proche. Lequel ?`,
    `Avant de poser ${calc}, ${p.nom} estime le résultat. Que trouve-${tIl(p)} ?`,
    sit,
    sit,
    sit,
  ]);
  return qM(
    text,
    opt(vrai),
    [opt(vrai + 1), opt(vrai - 1), opt(vrai + 2), opt(plus ? ca * cb : ca + cb)].filter((o) => !o.includes(" 0") && !o.includes("-")),
    exp("Estimer, c'est calculer avec des nombres ronds proches des vrais.", "On remplace chaque nombre par la centaine la plus proche.", `${a} ≈ ${ca * 100} et ${b} ≈ ${cb * 100}. ${ca * 100} ${plus ? "+" : "−"} ${cb * 100} = ${cible * 100}.`, `Le résultat est ${opt(vrai)} (exactement ${plus ? a + b : a - b}).`),
  );
}

function resultatPossible(): Q {
  const p = quelquun();
  const ca = rint(2, 6);
  const cb = rint(1, 3);
  const a = proche(ca);
  const b = proche(cb);
  const juste = a + b;
  const type = rint(1, 4);
  const annonce = type === 1 ? juste : type === 2 ? juste + 1000 : type === 3 ? Math.floor(juste / 10) : juste - 200;
  const bon = type === 1 ? "oui, il est proche de l'estimation" : "non, il est trop loin de l'estimation";
  const estim = (ca + cb) * 100;
  return qM(
    pick([
      `${p.nom} calcule ${a} + ${b} et annonce ${fmt(annonce)}. Sans poser le calcul, ce résultat est-il possible ?`,
      `Voici l'addition posée par ${p.nom}. ${maj(p.il)} trouve ${fmt(annonce)}. Ce résultat est-il possible ?`,
      `Pic le paille-en-queue dit que ${a} + ${b} = ${fmt(annonce)}. Peut-on le croire ?`,
      `${p.nom} a trouvé ${fmt(annonce)} pour ${a} + ${b}. Est-ce vraisemblable ?`,
    ]),
    bon,
    [type === 1 ? "non, il est trop loin de l'estimation" : "oui, il est proche de l'estimation", "on ne peut rien dire sans poser le calcul", "oui, s'il y a une retenue"],
    exp("Une estimation permet de repérer un résultat impossible.", "On arrondit chaque nombre à la centaine.", `${a} ≈ ${ca * 100}, ${b} ≈ ${cb * 100}, donc le total est proche de ${estim}.`, type === 1 ? `${fmt(annonce)} est proche de ${estim} : c'est possible.` : `${fmt(annonce)} est loin de ${estim} : c'est impossible.`),
    { canvas: { ...pose("addition", [a, b]), result: String(annonce), display: { showResult: true, showRetenues: false } } },
  );
}

/* ---------------------------------------------------------
   LES DÉFIS
--------------------------------------------------------- */

function chiffreCache(): Q {
  const p = quelquun();
  const plus = Math.random() < 0.6;
  for (;;) {
    const a = rint(120, 899);
    const b = rint(105, 899);
    if (!plus && a <= b) continue;
    const r = plus ? a + b : a - b;
    if (r > 9999) continue;
    const pos = rint(0, 2);
    const s = String(a);
    const cache = Number(s[s.length - 1 - pos]);
    const masque = s.slice(0, s.length - 1 - pos) + "?" + s.slice(s.length - pos);
    const op = plus ? "+" : "−";
    return qM(
          pick([
            `Dans ${masque} ${op} ${b} = ${fmt(r)}, quel chiffre se cache sous le « ? » ?`,
            `${p.nom} a fait une tache d'encre sur son opération : ${masque} ${op} ${b} = ${fmt(r)}. Quel chiffre est caché ?`,
            `Pic le paille-en-queue a caché un chiffre sous son aile. Lequel est sous le « ? » ?`,
            `Retrouve le chiffre caché : ${masque} ${op} ${b} = ${fmt(r)}.`,
          ]),
          String(cache),
          [(cache + 1) % 10, (cache + 9) % 10, (cache + 2) % 10, (cache + 5) % 10].map(String),
          exp(
            plus ? "Dans une addition, le nombre de départ est le résultat moins l'autre terme." : "Dans une soustraction, le nombre de départ est le résultat plus le nombre enlevé.",
            plus ? `On calcule ${fmt(r)} − ${b}.` : `On calcule ${fmt(r)} + ${b}.`,
            plus ? `${fmt(r)} − ${b} = ${a}.` : `${fmt(r)} + ${b} = ${a}.`,
            `Le nombre est ${a} : le chiffre caché est ${cache}.`,
          ),
          { canvas: { kind: "calcul_pose", operation: plus ? "addition" : "soustraction", numbers: [masque, String(b)], result: String(r), display: { showResult: true, showRetenues: false } } },
        );
  }
}

function deuxEtapes(): Q {
  const p = quelquun();
  const total = rint(250, 980);
  const x = rint(60, Math.floor(total / 2));
  const y = rint(30, total - x - 20);
  const r = total - x - y;
  const sit = pick([
    `La bibliothèque a ${total} livres. ${x} sont empruntés le matin, ${y} le soir. Combien en reste-t-il ?`,
    `L'école a ${total} élèves. ${x} vont au zoo, ${y} au musée. Combien restent à l'école ?`,
    `Les pirates ont ${total} pièces d'or. Ils en dépensent ${x}, puis ${y}. Combien en reste-t-il ?`,
    `${p.nom} a ${total} points au jeu. ${maj(p.il)} en perd ${x}, puis ${y}. Combien lui en reste-t-il ?`,
    `La fusée emporte ${total} litres d'eau. On en boit ${x}, puis ${y}. Combien en reste-t-il ?`,
    `Le jardinier a ${total} graines. Il en sème ${x} lundi et ${y} mardi. Combien en reste-t-il ?`,
    `Le cirque a ${total} places. ${x} sont vendues samedi, ${y} dimanche. Combien restent libres ?`,
    `La boulangère a fait ${total} croissants. Elle en vend ${x}, puis ${y}. Combien en reste-t-il ?`,
  ]);
  return qN(
    sit,
    r,
    [total - x, total - y, total + x - y, x + y, r + 10, r - 10],
    exp("Quand on enlève deux fois, on peut enlever les deux quantités l'une après l'autre, ou d'un coup.", `On ajoute ce qui part (${x} + ${y}), puis on l'enlève du total.`, `${x} + ${y} = ${x + y}, puis ${total} − ${x + y} = ${r}.`, `Il reste ${r}.`),
    avec(parfois(0.7, () => barre([["", String(x)], ["", String(y)], ["reste", null]], String(total)))),
  );
}

/* =========================================================
   LES ITEMS
========================================================= */

const GABARITS: TutorBankItemV4[] = [
  g("ce2_addition_posee_tpl_1", "ce2_addition_posee", 3, "Colonne par colonne, en partant des unités.", ["addition", "posee", "canvas"], () => {
    const [a, b] = deuxNombres(3);
    return additionPosee(a, b);
  }),
  g("ce2_addition_posee_tpl_2", "ce2_addition_posee", 4, "Additionne les deux nombres : les unités d'abord.", ["addition", "posee", "probleme"], () => {
    const [a, b] = deuxNombres(4);
    return Math.random() < 0.6 ? enSituation(true, a, b) : additionPosee(a, b);
  }),
  g("ce2_soustraction_posee_tpl_1", "ce2_soustraction_posee", 3, "Le chiffre du haut moins celui du bas ; s'il est trop petit, casse une dizaine.", ["soustraction", "posee", "canvas"], () => {
    const [a, b] = deuxPourSoustraire(3);
    return soustractionPosee(a, b);
  }),
  g("ce2_soustraction_posee_tpl_2", "ce2_soustraction_posee", 4, "On ne retourne jamais une colonne.", ["soustraction", "posee", "piege"], () => {
    if (Math.random() < 0.4) return erreurSoustraction();
    const [a, b] = deuxPourSoustraire(4);
    return Math.random() < 0.6 ? enSituation(false, a, b) : soustractionPosee(a, b);
  }),
  g("ce2_add_sous_vocabulaire_tpl_1", "ce2_add_sous_vocabulaire", 3, "La somme et la différence sont des RÉSULTATS.", ["vocabulaire"], vocabulaire),
  g("ce2_add_sous_complement_tpl_1", "ce2_add_sous_complement", 3, "Cherche l'écart entre les deux nombres.", ["complement"], () => {
    const f = rint(1, 3);
    if (f === 1) return completerPlus(rint(12, 88), 100);
    if (f === 2) {
      const c = pick([500, 1000, 1000]);
      return completerPlus(rint(110, c - 30), c);
    }
    const a = rint(45, 680);
    return completerPlus(a, a + rint(25, 480));
  }),
  g("ce2_add_sous_complement_tpl_2", "ce2_add_sous_complement", 4, "Pour retrouver un nombre caché, fais le chemin inverse.", ["complement"], () =>
    Math.random() < 0.75 ? completerMoins() : completerPlus(rint(1200, 4800), rint(5, 9) * 1000),
  ),
  g("ce2_add_sous_estimer_tpl_1", "ce2_add_sous_estimer", 3, "Arrondis chaque nombre à la centaine.", ["estimer"], estimer),
  g("ce2_add_sous_estimer_tpl_2", "ce2_add_sous_estimer", 4, "Compare avec l'estimation.", ["estimer"], resultatPossible),
  g("ce2_add_sous_defi_tpl_1", "ce2_add_sous_defi", 5, "Fais l'opération inverse pour retrouver le chiffre.", ["defi"], chiffreCache),
  g("ce2_add_sous_defi_tpl_2", "ce2_add_sous_defi", 5, "Additionne ce qui part, puis enlève-le.", ["defi"], () => (Math.random() < 0.7 ? deuxEtapes() : completerMoins())),
];

export const additionSoustractionBank: TutorBankItemV4[] = [...FIXES, ...GABARITS];
