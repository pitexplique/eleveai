// lib/tutor-v4/questionBank/ce1/maths/nombres-entiers.bank.ts
//
// Les nombres entiers du CE1, écrits à la main. C'est la plus grosse notion de
// la classe : dix-huit micro-compétences, et le programme rappelle que les
// deux tiers du temps de mathématiques vont au domaine « Nombres, calcul et
// résolution de problèmes ».
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — les nombres vont jusqu'à MILLE. La centaine est abordée dès la période 1,
//     le millier au plus tard en période 2 ;
//   — quatre écritures d'un même nombre : chiffres, lettres, unités de
//     numération, décomposition additive. L'élève passe de l'une à l'autre ;
//   — comparer, encadrer, intercaler avec =, < et > ; ranger dans l'ordre ;
//   — les expressions « égal à », « supérieur à », « inférieur à »,
//     « compris entre … et … » ;
//   — placer un nombre sur une demi-droite graduée de un en un, de dix en dix
//     ou de cent en cent ;
//   — les nombres ORDINAUX jusqu'à cent, et cinq façons de s'en servir.
//
// LES DEUX PIÈGES DE LA NOTION :
//   1. la position des chiffres. Le programme le dit mot pour mot : l'élève
//      doit savoir expliquer « pourquoi 23 n'est pas le même nombre que 32,
//      bien que les écritures soient composées des mêmes chiffres » ;
//   2. les ordinaux. Le cinquième a QUATRE éléments devant lui, pas cinq. Le
//      programme donne l'exemple : « Il y a six personnes qui font la queue à
//      la caisse. Je suis la troisième. Combien y a-t-il de personnes devant
//      moi ? »
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS. Départ : 1 micro sur 18 au seuil des
// squelettes, 4 % d'énoncés avec un dessin. Chaque gabarit tire désormais une
// FAMILLE × une SITUATION × une TOURNURE (outils-nombres-ce1.ts). Dessins :
// `base_dix` (le matériel : plaques, barres, cubes — jamais le nombre écrit),
// `number_line` (la valeur cherchée n'est jamais écrite : `valeursEcrites`),
// `objets` (une file d'objets pour les rangs et les motifs).
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { PersonnageCanvasData, PersonnageId } from "@/lib/tutor-v4/types_canvas";
import {
  baseDix,
  court,
  de,
  deuxDifferents,
  deuxEnfants,
  droite,
  duDeLa,
  enLettres,
  exp,
  leLa,
  maj,
  objets,
  OBJETS_FILE,
  ordinal,
  pl,
  plusieursEnfants,
  qcm,
  que,
  quelquun,
  randomChoice,
  randomInt,
  shuffle,
  suite,
  tirerDessin,
  troisChiffres,
  type Personne,
} from "./outils-nombres-ce1";

/* =========================================================
   LES SITUATIONS
========================================================= */

/** Des collections rangées par cent, par dix et à l'unité. */
type Groupe = {
  obj: string;
  obj1: string;
  f: boolean;
  gros: [string, string];
  moyen: [string, string];
  metier?: string;
};
const GROUPES: readonly Groupe[] = [
  { obj: "billes", obj1: "bille", f: true, gros: ["grand sac", "grands sacs"], moyen: ["sachet", "sachets"] },
  { obj: "timbres", obj1: "timbre", f: false, gros: ["plaque", "plaques"], moyen: ["carnet", "carnets"], metier: "La factrice" },
  { obj: "perles", obj1: "perle", f: true, gros: ["boîte", "boîtes"], moyen: ["collier", "colliers"] },
  { obj: "crayons", obj1: "crayon", f: false, gros: ["caisse", "caisses"], moyen: ["boîte", "boîtes"], metier: "La maîtresse" },
  { obj: "tickets", obj1: "ticket", f: false, gros: ["rouleau", "rouleaux"], moyen: ["carnet", "carnets"], metier: "Le forain" },
  { obj: "graines", obj1: "graine", f: true, gros: ["sac", "sacs"], moyen: ["sachet", "sachets"], metier: "Le jardinier" },
  { obj: "gommettes", obj1: "gommette", f: true, gros: ["planche", "planches"], moyen: ["bande", "bandes"] },
  { obj: "images", obj1: "image", f: true, gros: ["album", "albums"], moyen: ["pochette", "pochettes"] },
  { obj: "bonbons", obj1: "bonbon", f: false, gros: ["bocal", "bocaux"], moyen: ["rouleau", "rouleaux"], metier: "Le marchand" },
  { obj: "pièces d'or", obj1: "pièce d'or", f: true, gros: ["coffre", "coffres"], moyen: ["bourse", "bourses"], metier: "Le capitaine pirate" },
  { obj: "briques", obj1: "brique", f: true, gros: ["bac", "bacs"], moyen: ["sachet", "sachets"] },
  { obj: "biscuits", obj1: "biscuit", f: false, gros: ["carton", "cartons"], moyen: ["paquet", "paquets"], metier: "La boulangère" },
  { obj: "cartes de dinosaures", obj1: "carte de dinosaure", f: true, gros: ["boîte", "boîtes"], moyen: ["paquet", "paquets"] },
  { obj: "clous", obj1: "clou", f: false, gros: ["boîte", "boîtes"], moyen: ["sachet", "sachets"], metier: "Le menuisier" },
];
const seul = (g: Groupe, n: number) => `${n} ${pl(n, g.obj1, g.obj)} ${pl(n, g.f ? "seule" : "seul", g.f ? "seules" : "seuls")}`;
const seuls = (g: Groupe) => `${g.obj} ${g.f ? "seules" : "seuls"}`;
const gros = (g: Groupe, n: number) => `${n} ${pl(n, g.gros[0], g.gros[1])} de cent`;
const moyen = (g: Groupe, n: number) => `${n} ${pl(n, g.moyen[0], g.moyen[1])} de dix`;
/** Qui parle : un enfant, ou le métier de la situation. */
const acteur = (g: Groupe) => (g.metier && Math.random() < 0.4 ? g.metier : quelquun().nom);

/** Les phrases qui présentent un dessin de cubes. */
const introCubes = (p: Personne) =>
  randomChoice([
    `Voici les cubes ${de(p.nom)}.`,
    `Pic a empilé ces cubes.`,
    `${p.nom} a ces cubes.`,
    `Le château de cubes ${de(p.nom)}.`,
    `La boîte ${de(p.nom)}.`,
    `${p.nom} a gagné ces cubes.`,
    `Le matériel ${de(p.nom)}.`,
  ]);
const Q_TOTAL_CUBES = [
  "Combien de cubes en tout ?",
  "Combien de petits cubes ?",
  "Quel nombre est dessiné ?",
  "Compte les cubes : combien ?",
];

/** Un nombre qu'on lit dans la vie : dossard, pages, numéro de maison… */
const numeroDans = (p: Personne, n: number) =>
  randomChoice([
    `Le dossard ${de(p.nom)} : ${n}.`,
    `Le livre ${de(p.nom)} a ${n} pages.`,
    `${p.nom} habite au ${n}.`,
    `Le ticket ${de(p.nom)} : ${n}.`,
    `Pic a caché ${n} graines.`,
    `Le train porte le numéro ${n}.`,
    `Le car du zoo : numéro ${n}.`,
    `${p.nom} a marqué ${n} points.`,
    `Le robot ${de(p.nom)} : ${n}.`,
    `Le code du cadenas : ${n}.`,
    `Le livre numéro ${n}.`,
    `Au cirque, ${n} enfants.`,
  ]);

const RANGS = [
  { nom: "centaines", idx: 0 as const },
  { nom: "dizaines", idx: 1 as const },
  { nom: "unités", idx: 2 as const },
];

const chiffresDe = (n: number): [number, number, number] => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

/** « 3 centaines, 4 dizaines et 7 unités » (les rangs vides sont omis). */
function enUnites(c: number, d: number, u: number) {
  const parts: string[] = [];
  if (c) parts.push(`${c} ${pl(c, "centaine", "centaines")}`);
  if (d) parts.push(`${d} ${pl(d, "dizaine", "dizaines")}`);
  if (u) parts.push(`${u} ${pl(u, "unité", "unités")}`);
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} et ${parts[parts.length - 1]}`;
}

/** « 300 + 40 + 7 », sans les morceaux nuls. */
function decomposition(c: number, d: number, u: number) {
  return [c * 100, d * 10, u].filter((x) => x > 0).join(" + ");
}

/** Les quantités qu'on compare entre enfants. */
const QUANTITES: readonly { titre: string; dire: (n: number) => string; plus: string; moins: string }[] = [
  { titre: "Billes", dire: (n) => `a ${n} billes`, plus: "Qui a le plus de billes ?", moins: "Qui a le moins de billes ?" },
  { titre: "Points", dire: (n) => `a marqué ${n} points`, plus: "Qui a marqué le plus de points ?", moins: "Qui a marqué le moins de points ?" },
  { titre: "Pages lues", dire: (n) => `a lu ${n} pages`, plus: "Qui a lu le plus de pages ?", moins: "Qui a lu le moins de pages ?" },
  { titre: "Gommettes", dire: (n) => `a collé ${n} gommettes`, plus: "Qui a collé le plus de gommettes ?", moins: "Qui a collé le moins de gommettes ?" },
  { titre: "Coquillages", dire: (n) => `a ramassé ${n} coquillages`, plus: "Qui a ramassé le plus de coquillages ?", moins: "Qui a ramassé le moins de coquillages ?" },
  { titre: "Graines plantées", dire: (n) => `a planté ${n} graines`, plus: "Qui a planté le plus de graines ?", moins: "Qui a planté le moins de graines ?" },
  { titre: "Sauts à la corde", dire: (n) => `a fait ${n} sauts à la corde`, plus: "Qui en a fait le plus ?", moins: "Qui en a fait le moins ?" },
  { titre: "Étoiles comptées", dire: (n) => `a compté ${n} étoiles`, plus: "Qui a compté le plus d'étoiles ?", moins: "Qui a compté le moins d'étoiles ?" },
  { titre: "Cartes de dinosaures", dire: (n) => `a ${n} cartes de dinosaures`, plus: "Qui a le plus de cartes ?", moins: "Qui a le moins de cartes ?" },
  { titre: "Tickets de tombola vendus", dire: (n) => `a vendu ${n} tickets de tombola`, plus: "Qui en a vendu le plus ?", moins: "Qui en a vendu le moins ?" },
  { titre: "Mètres nagés", dire: (n) => `a nagé ${n} mètres`, plus: "Qui a nagé le plus loin ?", moins: "Qui a nagé le moins loin ?" },
  { titre: "Perles", dire: (n) => `a ${n} perles`, plus: "Qui a le plus de perles ?", moins: "Qui a le moins de perles ?" },
];

/** « Billes : Nina 524, Téo 529. » — le nom de l'objet une seule fois. */
const tableau = (ctx: { titre: string }, gens: readonly [Personne, number][]) =>
  `${ctx.titre} : ${gens.map(([e, n]) => `${e.nom} ${n}`).join(", ")}.`;

/** Deux nombres à trois chiffres PROCHES : c'est là qu'on se trompe. */
function deuxProches(): [number, number] {
  const c = randomInt(1, 9);
  const genre = randomInt(0, 3);
  if (genre === 0) {
    // même centaine, dizaines différentes, unités « trompeuses »
    const [d1, d2] = deuxDifferents(0, 9);
    const u1 = d1 < d2 ? randomInt(6, 9) : randomInt(0, 3);
    const u2 = d1 < d2 ? randomInt(0, 3) : randomInt(6, 9);
    return [c * 100 + d1 * 10 + u1, c * 100 + d2 * 10 + u2];
  }
  if (genre === 1) {
    // mêmes centaines et dizaines
    const d = randomInt(0, 9);
    const [u1, u2] = deuxDifferents(0, 9);
    return [c * 100 + d * 10 + u1, c * 100 + d * 10 + u2];
  }
  if (genre === 2) {
    // chiffres échangés : 352 et 325
    const [x, y] = deuxDifferents(0, 9);
    return [c * 100 + x * 10 + y, c * 100 + y * 10 + x];
  }
  // centaines différentes, mais le plus petit a de gros chiffres derrière
  const [c1, c2] = deuxDifferents(1, 9);
  const petit = Math.min(c1, c2);
  const grand = Math.max(c1, c2);
  return shuffle([petit * 100 + randomInt(80, 99), grand * 100 + randomInt(0, 19)]) as [number, number];
}

/* ---------------------------------------------------------
   Les files : rangs et ordinaux.
--------------------------------------------------------- */
const FILES: readonly { qui: string; lieu: string }[] = [
  { qui: "enfants", lieu: "au toboggan" },
  { qui: "enfants", lieu: "à la cantine" },
  { qui: "enfants", lieu: "au manège" },
  { qui: "enfants", lieu: "pour le bus" },
  { qui: "personnes", lieu: "à la caisse" },
  { qui: "enfants", lieu: "à la piscine" },
  { qui: "enfants", lieu: "au carnaval" },
  { qui: "personnes", lieu: "à la boulangerie" },
  { qui: "enfants", lieu: "au cirque" },
  { qui: "enfants", lieu: "pour la photo" },
  { qui: "enfants", lieu: "chez les girafes" },
  { qui: "enfants", lieu: "au parc" },
  { qui: "personnes", lieu: "chez la vétérinaire" },
  { qui: "enfants", lieu: "à la bibliothèque" },
];
const leLaP = (p: Personne) => (p.il === "elle" ? "la" : "le");

/** La troupe dessinée, qui montre ses cartes ou pense à un nombre. */
const PARLEURS: readonly { id: PersonnageId; nom: string }[] = [
  { id: "nina", nom: "Nina" },
  { id: "teo", nom: "Téo" },
  { id: "zoe", nom: "Zoé" },
  { id: "ravi", nom: "Ravi" },
  { id: "pic", nom: "Pic" },
];
function parle(id: PersonnageId, texte: string, forme: "parole" | "pensee" = "parole"): PersonnageCanvasData {
  return { kind: "personnage", personnage: id, pose: "montre", expression: randomChoice(["sourire", "pense"] as const), bulle: { texte, forme }, mode: "couleur" };
}
const luiElle = (p: Personne) => (p.il === "elle" ? "elle" : "lui");

/** Une file d'objets tous différents, dessinée de gauche à droite. */
function fileObjets(n: number, marque?: number) {
  const objs = shuffle(OBJETS_FILE).slice(0, n);
  return {
    objs,
    canvas: objets(objs.map((o, i) => ({ quoi: o.quoi, ...(marque === i ? { marque: true } : {}) }))),
  };
}

export const nombresEntiersBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ENTIER_DENOMBRER — compter en organisant
     On ne compte pas un à un : on groupe par dix et par cent.
     C'est ce groupement qui fabrique la numération.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_denombrer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compter un grand tas de jetons sans se tromper, que vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "les grouper par paquets de dix",
      "les compter un par un très vite",
      "les compter deux fois de suite",
      "en prendre une poignée au hasard",
    ],
    expected: ["les grouper par paquets de dix"],
    comparator: "mcq_exact",
    hint: "Avec des paquets de dix, on compte les paquets, pas les jetons.",
    explanation: exp(
      "Dénombrer, c'est trouver combien il y a d'objets en tout.",
      "On organise la collection en paquets de dix avant de compter.",
      "Avec des paquets de dix, on lit directement le nombre de dizaines, puis on ajoute les jetons isolés. Compter un par un, c'est long et on perd le fil.",
      "Il vaut mieux les grouper par paquets de dix.",
    ),
    tags: ["ce1", "nombre_entier", "denombrer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_denombrer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque plaque vaut 100, chaque barre vaut 10, chaque cube vaut 1.",
    tags: ["ce1", "nombre_entier", "denombrer", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le matériel dessiné : on compte les plaques, les barres, les cubes.
        () => {
          const p = quelquun();
          const c = randomInt(1, 5);
          const d = randomInt(1, 9);
          const u = randomInt(1, 9);
          const n = c * 100 + d * 10 + u;
          return court(
            `${introCubes(p)} ${randomChoice(Q_TOTAL_CUBES)}`,
            n,
            exp(
              "Chaque groupe a sa valeur : la plaque vaut cent, la barre vaut dix, le cube seul vaut un.",
              "On compte les plaques, puis les barres, puis les cubes seuls.",
              `${c} ${pl(c, "plaque", "plaques")} : ${c * 100}. ${d} ${pl(d, "barre", "barres")} : ${d * 10}. ${u} ${pl(u, "cube", "cubes")}. ${c * 100} + ${d * 10} + ${u} = ${n}.`,
              `Il y a ${n} cubes.`,
            ),
            baseDix(c, d, u, { etiquettes: Math.random() < 0.5 }),
          );
        },
        // Une collection de la vie, rangée par cent et par dix.
        () => {
          const g = randomChoice(GROUPES);
          const c = randomInt(1, 9);
          const d = randomInt(1, 9);
          const u = randomInt(1, 9);
          const n = c * 100 + d * 10 + u;
          const phrase = `${maj(g.obj)} : ${gros(g, c)}, ${moyen(g, d)} et ${u} ${pl(u, g.f ? "seule" : "seul", g.f ? "seules" : "seuls")}.`;
          const question = "Combien en tout ?";
          return court(
            `${phrase} ${question}`,
            n,
            exp(
              "Un paquet de cent vaut 100, un paquet de dix vaut 10, un objet seul vaut 1.",
              "On compte chaque sorte de paquet, puis on additionne.",
              `${c * 100} + ${d * 10} + ${u} = ${n}.`,
              `Cela fait ${n} ${g.obj}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_entier_denombrer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus de dix objets seuls : refais un paquet de dix.",
    tags: ["ce1", "nombre_entier", "denombrer", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Plus de dix cubes seuls : il faut regrouper avant de lire.
        () => {
          const p = quelquun();
          const c = randomInt(0, 4);
          const d = randomInt(1, 7);
          const u = randomInt(11, 19);
          const n = c * 100 + d * 10 + u;
          const alerte = randomChoice([
            "Attention aux cubes seuls !",
            "Plus de dix cubes seuls !",
            "",
            "",
          ]);
          return court(
            `${introCubes(p)} ${alerte} ${randomChoice(Q_TOTAL_CUBES)}`.replace(/\s+/g, " "),
            n,
            exp(
              "Dix cubes seuls font une barre de dix.",
              "On regroupe dix cubes seuls pour faire une barre de plus, puis on compte.",
              `${u} cubes seuls, c'est 1 barre et ${u - 10} cubes. On a donc ${c ? `${c * 100} + ` : ""}${(d + 1) * 10} + ${u - 10} = ${n}.`,
              `Il y a ${n} cubes.`,
            ),
            baseDix(c, d, u, { echange: Math.random() < 0.4 ? "unites" : undefined }),
          );
        },
        // Plus de dix barres : il faut refaire une plaque.
        () => {
          const p = quelquun();
          const c = randomInt(1, 3);
          const d = randomInt(11, 16);
          const u = randomInt(0, 9);
          const n = c * 100 + d * 10 + u;
          return court(
            `${introCubes(p)} ${randomChoice(["Plus de dix barres !", "Attention aux barres !", ""])} ${randomChoice(Q_TOTAL_CUBES)}`.replace(/\s+/g, " "),
            n,
            exp(
              "Dix barres de dix font une plaque de cent.",
              "On regroupe dix barres pour faire une plaque de plus, puis on compte.",
              `${d} barres, c'est 1 plaque et ${d - 10} ${pl(d - 10, "barre", "barres")}. On a donc ${(c + 1) * 100} + ${(d - 10) * 10} + ${u} = ${n}.`,
              `Il y a ${n} cubes.`,
            ),
            baseDix(c, d, u, { echange: Math.random() < 0.4 ? "dizaines" : undefined }),
          );
        },
        // En mots : des objets seuls en trop.
        () => {
          const g = randomChoice(GROUPES);
          const qui = acteur(g);
          const d = randomInt(2, 8);
          const u = randomInt(11, 19);
          const n = d * 10 + u;
          return court(
            `${qui} a ${moyen(g, d)} et ${seul(g, u)}. ${randomChoice(["Combien en tout ?", "Combien cela fait-il ?"])}`,
            n,
            exp(
              "Quand il reste plus de dix objets seuls, on peut encore faire un paquet de dix.",
              "On fait un paquet de dix avec les objets seuls, puis on compte.",
              `${u} ${seuls(g)}, c'est 1 paquet de dix et ${u - 10} de plus. ${(d + 1) * 10} + ${u - 10} = ${n}.`,
              `Il y a ${n} ${g.obj}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_CONSTRUIRE_COLLECTION — fabriquer un nombre
     La question à l'envers : on connaît le nombre, on cherche
     les groupes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_construire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 3,
    theme: "neutral",
    text: "Timbres : en plaques de cent, en carnets de dix ou seuls. Que prendre pour 235 timbres ?",
    format: "qcm",
    choices: [
      "2 plaques, 3 carnets et 5 timbres",
      "2 plaques, 5 carnets et 3 timbres",
      "3 plaques, 2 carnets et 5 timbres",
      "23 carnets et 5 timbres seulement",
    ],
    expected: ["2 plaques, 3 carnets et 5 timbres"],
    comparator: "mcq_exact",
    hint: "Lis les chiffres de 235 dans l'ordre : centaines, dizaines, unités.",
    explanation: exp(
      "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
      "On lit le nombre chiffre par chiffre, en partant de la gauche.",
      "Dans 235 : le 2 dit deux centaines, donc 2 plaques ; le 3 dit trois dizaines, donc 3 carnets ; le 5 dit cinq unités, donc 5 timbres.",
      "Il faut 2 plaques, 3 carnets et 5 timbres.",
    ),
    tags: ["ce1", "nombre_entier", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_entier_construire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 4,
    theme: "neutral",
    text: "Plus de plaques de cent ! Combien de carnets de dix pour 200 timbres ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Combien de dizaines dans une centaine ?",
    explanation: exp(
      "Une centaine, c'est dix dizaines.",
      "On cherche combien de fois dix tient dans le nombre.",
      "100 timbres, c'est 10 carnets. Pour 200 timbres, il en faut deux fois plus : 20 carnets.",
      "Il faut 20 carnets.",
    ),
    tags: ["ce1", "nombre_entier", "construire", "piege"],
  },
  {
    kind: "template",
    id: "ce1_entier_construire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chiffre dit combien il faut de paquets de sa taille.",
    tags: ["ce1", "nombre_entier", "construire", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le dessin montre ce qui est déjà posé ; il manque un rang.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const manque = randomChoice(["u", "d", "c"] as const);
          const deja = { u: "ces plaques et ces barres", d: "ces plaques et ces cubes", c: "ces barres et ces cubes" }[manque];
          const quoi = { u: "de cubes seuls", d: "de barres de dix", c: "de plaques de cent" }[manque];
          const rep = { u, d, c }[manque];
          const debut = randomChoice([
            `${p.nom} veut faire ${n}.`,
            `${p.nom} doit fabriquer ${n}.`,
            `Pic veut construire ${n}.`,
            `On veut montrer ${n}.`,
          ]);
          return court(
            `${debut} Voici ${deja}. Combien ${quoi} ajouter ?`,
            rep,
            exp(
              "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
              "On lit le nombre : centaines, dizaines, unités. On compare avec le dessin.",
              `${n}, c'est ${c} ${pl(c, "plaque", "plaques")}, ${d} ${pl(d, "barre", "barres")} et ${u} ${pl(u, "cube", "cubes")}. Il manque ${rep} ${quoi.replace("de ", "")}.`,
              `Il faut en ajouter ${rep}.`,
            ),
            baseDix(manque === "c" ? 0 : c, manque === "d" ? 0 : d, manque === "u" ? 0 : u),
          );
        },
        // En mots : il manque un rang à la commande.
        () => {
          const g = randomChoice(GROUPES);
          const [c, d, u] = [randomInt(1, 9), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const manque = randomChoice(["u", "d"] as const);
          if (manque === "u") {
            return court(
              `Pour ${n} ${g.obj} : ${gros(g, c)}, ${moyen(g, d)} et combien ${g.obj.includes(" ") ? (g.f ? "de seules" : "de seuls") : de(seuls(g))} ?`,
              u,
              exp(
                "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
                "On lit le nombre chiffre par chiffre : centaines, dizaines, unités.",
                `${c * 100} + ${d * 10} = ${c * 100 + d * 10}. Pour aller à ${n}, il manque ${u}.`,
                `Il en faut encore ${u}.`,
              ),
            );
          }
          return court(
            `Pour ${n} ${g.obj} : ${gros(g, c)}, ${seul(g, u)} et combien de ${g.moyen[1]} de dix ?`,
            d,
            exp(
              "Le chiffre des dizaines dit combien il faut de paquets de dix.",
              "On lit le nombre chiffre par chiffre : centaines, dizaines, unités.",
              `Dans ${n}, le chiffre des dizaines est ${d}. Il faut ${d} ${pl(d, g.moyen[0], g.moyen[1])} de dix.`,
              `Il en faut ${d}.`,
            ),
          );
        },
        // La bonne commande, parmi quatre.
        () => {
          const g = randomChoice(GROUPES);
          const [c, d, u] = troisChiffres();
          const n = c * 100 + d * 10 + u;
          const cmd = (x: number, y: number, z: number) => `${gros(g, x).replace(" de cent", "")}, ${y} ${pl(y, g.moyen[0], g.moyen[1])} et ${z} ${pl(z, g.obj1, g.obj)}`;
          return qcm(
            `${maj(g.obj)} : ${g.gros[1]} de cent, ${g.moyen[1]} de dix ou ${g.f ? "seules" : "seuls"}. Que prendre pour ${n} ?`,
            cmd(c, d, u),
            [cmd(c, u, d), cmd(d, c, u), cmd(u, d, c), cmd(c + 1, d, u)],
            exp(
              "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
              "On lit le nombre chiffre par chiffre, en partant de la gauche.",
              `Dans ${n} : ${c} centaines, ${d} dizaines, ${u} unités.`,
              `Il faut ${cmd(c, d, u)}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_entier_construire_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 4,
    theme: "neutral",
    hint: "Une centaine, c'est dix dizaines.",
    tags: ["ce1", "nombre_entier", "construire", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Plus de paquets de cent : tout en paquets de dix.
        () => {
          const g = randomChoice(GROUPES);
          const qui = acteur(g);
          const k = randomInt(11, 60);
          const n = k * 10;
          return court(
            `${qui} veut ${n} ${g.obj}, en ${g.moyen[1]} de dix seulement. Combien de ${g.moyen[1]} ?`,
            k,
            exp(
              "Une centaine, c'est dix dizaines.",
              "On compte les dizaines de tout le nombre, pas seulement le chiffre des dizaines.",
              `${n}, c'est ${Math.floor(k / 10)} ${pl(Math.floor(k / 10), "centaine", "centaines")}${k % 10 ? ` et ${k % 10} ${pl(k % 10, "dizaine", "dizaines")}` : ""}, donc ${k} dizaines en tout.`,
              `Il faut ${k} ${g.moyen[1]}.`,
            ),
          );
        },
        // Échanger des plaques contre des barres.
        () => {
          const p = quelquun();
          const c = randomInt(1, 3);
          return court(
            `${randomChoice([`${p.nom} échange ces plaques contre des barres de dix.`, `Pic casse ces plaques en barres de dix.`, `${p.nom} refait ces plaques en barres de dix.`])} Combien de barres ?`,
            c * 10,
            exp(
              "Une plaque de cent, c'est dix barres de dix.",
              "On compte dix barres par plaque.",
              `${c} ${pl(c, "plaque", "plaques")} : ${c} × 10 = ${c * 10} barres.`,
              `Il faut ${c * 10} barres.`,
            ),
            baseDix(c, 0, 0),
          );
        },
        // Sans plaques : barres et cubes.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 4), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const k = c * 10 + d;
          const dire = (x: number, y: number) => `${x} ${pl(x, "barre", "barres")} et ${y} ${pl(y, "cube", "cubes")}`;
          return qcm(
            `${p.nom} fait ${n} sans plaque, avec des barres et des cubes. Que prend-${p.il} ?`,
            dire(k, u),
            [dire(d, u), dire(c, d * 10 + u), dire(k, u * 10), dire(k + 1, u)],
            exp(
              "Une centaine, c'est dix dizaines.",
              "On compte toutes les dizaines du nombre, puis les unités.",
              `${n}, c'est ${c} centaines et ${d} dizaines, soit ${k} dizaines, et ${u} unités.`,
              `Il prend ${dire(k, u)}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_LIRE_ECRIRE — lire et écrire jusqu'à 1 000
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_lire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'écrit en chiffres « six cent trente-cinq » ?",
    format: "qcm",
    choices: ["635", "6035", "60035", "563"],
    expected: ["635"],
    comparator: "mcq_exact",
    hint: "Six cents, puis trente, puis cinq.",
    explanation: exp(
      "Un nombre à trois chiffres a un chiffre des centaines, un des dizaines et un des unités.",
      "On écoute le nombre par morceaux : les centaines, puis les dizaines, puis les unités.",
      "« Six cent » donne le 6 des centaines, « trente » donne le 3 des dizaines, « cinq » donne le 5 des unités. Cela fait 635, sans zéro à l'intérieur.",
      "Cela s'écrit 635.",
    ),
    tags: ["ce1", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_entier_lire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit en chiffres « quatre cent sept » ?",
    format: "qcm",
    choices: ["407", "47", "470", "4007"],
    expected: ["407"],
    comparator: "mcq_exact",
    hint: "Il n'y a aucune dizaine : que met-on à cette place ?",
    explanation: exp(
      "Quand un rang est vide, on écrit un zéro pour garder sa place.",
      "On repère les centaines, les dizaines et les unités dans ce qu'on entend.",
      "« Quatre cent » donne 4 centaines. On n'entend aucune dizaine : on écrit 0. « Sept » donne 7 unités. Cela fait 407. Sans le zéro, on lirait 47, un tout petit nombre.",
      "Cela s'écrit 407.",
    ),
    tags: ["ce1", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_lire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un zéro garde la place d'un rang vide.",
    tags: ["ce1", "nombre_entier", "lire_ecrire", "template", "canvas"],
    generate: () => {
      if (Math.random() < 0.5) {
        // Le matériel, sans barre : comment se lit ce nombre ?
        const p = quelquun();
        const c = randomInt(1, 5);
        const u = randomInt(1, 9);
        const n = c * 100 + u;
        return qcm(
          `${introCubes(p)} Aucune barre. ${randomChoice(["Comment se lit ce nombre ?", "Ce nombre en lettres ?"])}`,
          enLettres(n),
          [enLettres(c * 10 + u), enLettres(c * 100 + u * 10), enLettres(u * 100 + c), enLettres(n + 100 > 999 ? n - 100 : n + 100)],
          exp(
            "Quand un rang est vide, on n'entend rien pour lui, mais on écrit 0.",
            "Les plaques donnent les centaines, les cubes les unités.",
            `${c} ${pl(c, "plaque", "plaques")}, 0 barre, ${u} ${pl(u, "cube", "cubes")} : ${n}, qui se lit « ${enLettres(n)} ».`,
            `C'est « ${enLettres(n)} ».`,
          ),
          baseDix(c, 0, u),
        );
      }
      const c = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + u; // toujours zéro dizaine : c'est là qu'on se trompe
      const lettresUnites = [
        "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
      ] as const;
      return qcm(
        `Comment s'écrit en chiffres « ${c === 1 ? "" : `${lettresUnites[c - 1]} `}cent ${lettresUnites[u - 1]} » ?`,
        String(n),
        [String(c * 10 + u), String(c * 100 + u * 10), String(c * 1000 + u), String(u * 100 + c)],
        exp(
          "Quand un rang est vide, on écrit un zéro pour garder sa place.",
          "On repère les centaines, les dizaines et les unités dans ce qu'on entend.",
          `Il y a ${c} centaine${c > 1 ? "s" : ""}, aucune dizaine, et ${u} unité${u > 1 ? "s" : ""}. On écrit donc ${c}, puis 0 pour les dizaines, puis ${u} : ${n}.`,
          `Cela s'écrit ${n}.`,
        ),
      );
    },
  },

  /* =========================================================
     CE1_ENTIER_CENTAINES — unités, dizaines, centaines
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_centaines_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de dizaines dans une centaine ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte les barres de dix qu'il faut pour faire une plaque de cent.",
    explanation: exp(
      "Une centaine, c'est dix dizaines.",
      "On empile les barres de dix jusqu'à remplir une plaque de cent.",
      "10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = 100. Il faut dix barres.",
      "Il y a 10 dizaines dans une centaine.",
    ),
    tags: ["ce1", "nombre_entier", "centaines", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_entier_centaines_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 1,
    theme: "neutral",
    hint: "Une plaque de cent, c'est cent cubes, ou dix barres de dix.",
    tags: ["ce1", "nombre_entier", "centaines", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Des plaques dessinées : combien de cubes ?
        () => {
          const p = quelquun();
          const k = randomInt(1, 9);
          return court(
            `${randomChoice([`${p.nom} a posé ces plaques de cent.`, `Voici les plaques ${de(p.nom)}.`, `Pic s'est posé sur ces plaques.`, `${p.nom} range ces plaques.`])} ${randomChoice(["Combien de cubes en tout ?", "Quel nombre montrent-elles ?", "Combien de petits cubes ?"])}`,
            k * 100,
            exp(
              "Une plaque de cent vaut 100.",
              "On compte les plaques de cent en cent.",
              `${k} ${pl(k, "plaque", "plaques")} : ${Array.from({ length: k }, (_, i) => (i + 1) * 100).join(", ")}.`,
              `Cela fait ${k * 100}.`,
            ),
            baseDix(k, 0, 0),
          );
        },
        // Le nombre écrit : k centaines.
        () => {
          const p = quelquun();
          const k = randomInt(2, 9);
          return court(
            randomChoice([
              `${p.nom} écrit en chiffres : ${k} centaines. Qu'écrit-${p.il} ?`,
              `${p.nom} pense à ${k} centaines. Quel nombre est-ce ?`,
              `${p.nom} a ${k} plaques de cent cubes. Combien de cubes a-t-${p.il} ?`,
              `${p.nom} compte de cent en cent ${k} fois. Où arrive-t-${p.il} ?`,
            ]),
            k * 100,
            exp(
              "Une centaine vaut 100.",
              "On compte de cent en cent.",
              `${k} centaines : ${k} × 100 = ${k * 100}.`,
              `C'est ${k * 100}.`,
            ),
          );
        },
        // Dix barres font une plaque.
        () => {
          const p = quelquun();
          return court(
            randomChoice([
              `${p.nom} fait une plaque de cent avec des barres de dix. Combien de barres ?`,
              `${p.nom} demande : combien de barres de dix faut-il pour faire 100 ?`,
              `${p.nom} range 100 cubes par barres de dix. Combien de barres remplit-${p.il} ?`,
              `${p.nom} range 100 billes par sachets de dix. Combien de sachets ?`,
              `${p.nom} colle 100 gommettes, dix par ligne. Combien de lignes ?`,
            ]),
            10,
            exp(
              "Une centaine, c'est dix dizaines.",
              "On compte de dix en dix jusqu'à cent.",
              "10, 20, 30, 40, 50, 60, 70, 80, 90, 100 : cela fait dix barres.",
              "Il faut 10 barres.",
            ),
          );
        },
        // Des cubes dans des plaques.
        () => {
          const p = quelquun();
          const k = randomInt(2, 9);
          return court(
            randomChoice([
              `${p.nom} a ${k * 100} cubes. Combien de plaques de cent peut-${p.il} faire ?`,
              `${p.nom} se demande combien de centaines il y a dans ${k * 100}.`,
              `${p.nom} range ${k * 100} graines par sacs de cent. Combien de sacs ?`,
              `${p.nom} colle ${k * 100} images, cent par page. Combien de pages ?`,
            ]),
            k,
            exp(
              "Une centaine vaut 100.",
              "On compte combien de fois 100 tient dans le nombre.",
              `${k * 100}, c'est ${k} fois 100.`,
              `Il y en a ${k}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "fixed",
    id: "ce1_entier_centaines_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 3,
    theme: "neutral",
    text: "Combien y a-t-il d'unités dans une centaine ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Dix barres de dix cubes, cela fait combien de cubes ?",
    explanation: exp(
      "Une centaine, c'est dix dizaines, et chaque dizaine vaut dix unités.",
      "On compte de dix en dix : dix, vingt, trente… jusqu'à la dixième barre.",
      "Dix barres de dix cubes font cent cubes. Une plaque de cent, c'est bien 100 unités.",
      "Il y a 100 unités dans une centaine.",
    ),
    tags: ["ce1", "nombre_entier", "centaines", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_entier_centaines_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 3,
    theme: "neutral",
    hint: "Une centaine vaut dix dizaines.",
    tags: ["ce1", "nombre_entier", "centaines", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Des plaques dessinées : combien de barres de dix dedans ?
        () => {
          const p = quelquun();
          const c = randomInt(2, 5);
          return court(
            `${randomChoice([`${p.nom} a ces plaques de cent.`, `Voici les plaques ${de(p.nom)}.`, `La maîtresse montre ces plaques.`])} ${randomChoice(["Combien de barres de dix pour les faire ?", "Combien de dizaines en tout ?", "Combien de barres de dix pour faire pareil ?"])}`,
            c * 10,
            exp(
              "Une plaque de cent, c'est dix barres de dix.",
              "On compte dix barres par plaque.",
              `${c} ${pl(c, "plaque", "plaques")} : ${Array.from({ length: c }, (_, i) => (i + 1) * 10).join(", ")} barres.`,
              `Il faut ${c * 10} barres.`,
            ),
            baseDix(c, 0, 0),
          );
        },
        // Des centaines en dizaines.
        () => {
          const p = quelquun();
          const c = randomInt(2, 9);
          return court(
            randomChoice([
              `Combien de dizaines y a-t-il dans ${c} centaines ?`,
              `${p.nom} se demande : ${c} centaines, c'est combien de dizaines ?`,
              `${p.nom} range ${c * 100} crayons par boîtes de dix. Combien de boîtes ?`,
              `${p.nom} change ${c} plaques de cent en barres de dix. Combien de barres ?`,
              `La boulangère range ${c * 100} biscuits par paquets de dix. Combien de paquets ?`,
              `Le jardinier plante ${c * 100} graines, dix par rangée. Combien de rangées ?`,
            ]),
            c * 10,
            exp(
              "Une centaine, c'est dix dizaines.",
              "On compte dix dizaines par centaine.",
              `${c} × 10 = ${c * 10}. Il y a ${c * 10} dizaines dans ${c * 100}.`,
              `Il y en a ${c * 10}.`,
            ),
          );
        },
        // Toutes les dizaines d'un nombre rond.
        () => {
          const p = quelquun();
          const k = randomInt(11, 99);
          const n = k * 10;
          return court(
            randomChoice([
              `Combien y a-t-il de dizaines en tout dans ${n} ?`,
              `${p.nom} fait ${n} avec des barres de dix. Combien de barres ?`,
              `${p.nom} a ${n} cubes. Combien de barres de dix peut-${p.il} faire ?`,
              `${p.nom} range ${n} perles par colliers de dix. Combien de colliers ?`,
            ]),
            k,
            exp(
              "Une centaine, c'est dix dizaines.",
              "On compte les dizaines des centaines, puis on ajoute les autres dizaines.",
              `${n}, c'est ${Math.floor(k / 10)} centaines (${Math.floor(k / 10) * 10} dizaines) et ${k % 10} dizaines : ${k} dizaines.`,
              `Il y en a ${k}.`,
            ),
          );
        },
        // Des barres dessinées : combien de plaques ?
        () => {
          const p = quelquun();
          const d = randomChoice([10, 20, 30, 12, 15, 18, 21, 24, 27]);
          return court(
            `${randomChoice([`${p.nom} a aligné ces barres de dix.`, `Voici les barres ${de(p.nom)}.`, `Pic a trouvé ces barres de dix.`])} Combien de plaques de cent ${randomChoice([`peut-${p.il} faire`, "peut-on remplir", "peut-on faire"])} ?`,
            Math.floor(d / 10),
            exp(
              "Dix barres de dix font une plaque de cent.",
              "On fait des groupes de dix barres.",
              `${d} barres : ${Math.floor(d / 10)} ${pl(Math.floor(d / 10), "groupe", "groupes")} de dix${d % 10 ? `, et il reste ${d % 10} ${pl(d % 10, "barre", "barres")}` : ""}.`,
              `On peut faire ${Math.floor(d / 10)} ${pl(Math.floor(d / 10), "plaque", "plaques")}.`,
            ),
            baseDix(0, d, 0),
          );
        },
        // Des centaines en unités.
        () => {
          const p = quelquun();
          const c = randomInt(2, 9);
          return court(
            randomChoice([
              `Combien d'unités y a-t-il dans ${c} centaines ?`,
              `${p.nom} a ${c} plaques de cent. Combien de petits cubes ?`,
              `${p.nom} a ${c} sacs de cent billes. Combien de billes ?`,
              `${p.nom} achète ${c} rouleaux de cent tickets. Combien de tickets ?`,
            ]),
            c * 100,
            exp(
              "Une centaine vaut cent unités.",
              "On compte de cent en cent.",
              `${c} × 100 = ${c * 100}.`,
              `Cela fait ${c * 100}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_VALEUR_POSITION — la place fait la valeur
     LE piège que le programme nomme : 23 et 32 s'écrivent avec
     les mêmes chiffres et ne valent pas la même chose.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_position_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 4,
    theme: "neutral",
    text: "23 et 32 ont les mêmes chiffres. Pourquoi ne sont-ils pas le même nombre ?",
    format: "qcm",
    choices: [
      "parce que les chiffres ne sont pas à la même place",
      "parce qu'on ne peut pas comparer deux nombres",
      "parce que 23 s'écrit avant 32 dans la liste",
      "ce sont en fait les mêmes nombres",
    ],
    expected: ["parce que les chiffres ne sont pas à la même place"],
    comparator: "mcq_exact",
    hint: "Dans 23, où est le 2 ? Et dans 32 ?",
    explanation: exp(
      "Un chiffre ne vaut pas la même chose selon la place qu'il occupe.",
      "On lit chaque nombre en disant ses dizaines et ses unités.",
      "23, c'est 2 dizaines et 3 unités : vingt-trois. 32, c'est 3 dizaines et 2 unités : trente-deux. Les mêmes chiffres, mais pas aux mêmes places, donc pas le même nombre.",
      "Parce que les chiffres ne sont pas à la même place.",
    ),
    tags: ["ce1", "nombre_entier", "position", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_position_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les rangs en partant de la droite : unités, dizaines, centaines.",
    tags: ["ce1", "nombre_entier", "position", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Un nombre de la vie : quel chiffre à tel rang ?
        () => {
          const p = quelquun();
          const ch = troisChiffres();
          const n = ch[0] * 100 + ch[1] * 10 + ch[2];
          const r = randomChoice(RANGS);
          return court(
            `${numeroDans(p, n)} ${randomChoice([`Quel est le chiffre des ${r.nom} ?`, `Quel chiffre est aux ${r.nom} ?`, `Le chiffre des ${r.nom} ?`])}`,
            ch[r.idx],
            exp(
              "Chaque chiffre d'un nombre occupe un rang : unités, dizaines, centaines.",
              "On repère les rangs en partant de la droite.",
              `Dans ${n} : ${ch[2]} aux unités, ${ch[1]} aux dizaines, ${ch[0]} aux centaines.`,
              `Le chiffre des ${r.nom} est ${ch[r.idx]}.`,
            ),
          );
        },
        // Le matériel dessiné : quel chiffre ?
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(1, 9), randomInt(1, 9)];
          const r = randomChoice(RANGS);
          const rep = [c, d, u][r.idx];
          return court(
            `${introCubes(p)} ${randomChoice([`Quel est le chiffre des ${r.nom} ?`, `Le chiffre des ${r.nom} ?`])}`,
            rep,
            exp(
              "Le chiffre des centaines compte les plaques, celui des dizaines les barres, celui des unités les cubes seuls.",
              "On compte la sorte d'objets qui correspond au rang demandé.",
              `${c} ${pl(c, "plaque", "plaques")}, ${d} ${pl(d, "barre", "barres")}, ${u} ${pl(u, "cube", "cubes")} : le nombre est ${c * 100 + d * 10 + u}.`,
              `Le chiffre des ${r.nom} est ${rep}.`,
            ),
            baseDix(c, d, u),
          );
        },
        // À quel rang est ce chiffre ?
        () => {
          const p = quelquun();
          const ch = troisChiffres();
          const n = ch[0] * 100 + ch[1] * 10 + ch[2];
          const r = randomChoice(RANGS);
          const x = ch[r.idx];
          return qcm(
            `${numeroDans(p, n)} À quel rang est le chiffre ${x} ?`,
            `aux ${r.nom}`,
            ["aux centaines", "aux dizaines", "aux unités", "aux milliers"],
            exp(
              "Chaque chiffre d'un nombre occupe un rang : unités, dizaines, centaines.",
              "On repère les rangs en partant de la droite.",
              `Dans ${n} : ${ch[2]} aux unités, ${ch[1]} aux dizaines, ${ch[0]} aux centaines.`,
              `Le ${x} est aux ${r.nom}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_entier_position_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 4,
    theme: "neutral",
    hint: "Le chiffre dit combien ; la place dit combien ça vaut.",
    tags: ["ce1", "nombre_entier", "position", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Que vaut ce chiffre ?
        () => {
          const p = quelquun();
          const ch = troisChiffres();
          const n = ch[0] * 100 + ch[1] * 10 + ch[2];
          const r = randomChoice(RANGS.slice(0, 2));
          const x = ch[r.idx];
          const val = r.idx === 0 ? x * 100 : x * 10;
          return qcm(
            `${numeroDans(p, n)} ${randomChoice([`Que vaut le chiffre ${x} dans ${n} ?`, `Dans ${n}, combien vaut le ${x} ?`])}`,
            String(val),
            [String(x), String(x * 10), String(x * 100), String(n)].filter((s) => s !== String(val)),
            exp(
              "La valeur d'un chiffre dépend de sa place.",
              "On repère le rang du chiffre : aux dizaines il compte des dix, aux centaines des cent.",
              `Dans ${n}, le ${x} est aux ${r.nom} : il vaut ${val}.`,
              `Il vaut ${val}.`,
            ),
          );
        },
        // Quel nombre a ce chiffre à ce rang ?
        () => {
          const ch = troisChiffres();
          const r = randomChoice(RANGS);
          const x = ch[r.idx];
          const perms = [
            [ch[0], ch[1], ch[2]], [ch[0], ch[2], ch[1]], [ch[1], ch[0], ch[2]],
            [ch[1], ch[2], ch[0]], [ch[2], ch[0], ch[1]], [ch[2], ch[1], ch[0]],
          ];
          const bons = perms.filter((t) => t[r.idx] === x).map((t) => t.join(""));
          const faux = perms.filter((t) => t[r.idx] !== x).map((t) => t.join(""));
          const bonne = randomChoice(bons);
          const p = quelquun();
          return qcm(
            randomChoice([
              `Quel nombre a ${x} pour chiffre des ${r.nom} ?`,
              `Chiffre des ${r.nom} : ${x}. Quel nombre ?`,
              `Dans quel nombre le chiffre ${x} est-il aux ${r.nom} ?`,
            ]),
            bonne,
            faux,
            exp(
              "Les mêmes chiffres à des places différentes donnent des nombres différents.",
              "Dans chaque nombre, on regarde le chiffre placé au rang demandé.",
              `Dans ${bonne}, le chiffre des ${r.nom} est bien ${x}.`,
              `C'est ${bonne}.`,
            ),
          );
        },
        // Le dessin : que vaut le chiffre des centaines ?
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(1, 9), randomInt(1, 9)];
          return qcm(
            `${introCubes(p)} Que vaut le chiffre des centaines ?`,
            String(c * 100),
            [String(c), String(c * 10), String((c + 1) * 100), String(c * 100 + d * 10)],
            exp(
              "Le chiffre des centaines compte les plaques de cent.",
              "On compte les plaques, puis on dit ce qu'elles valent.",
              `${c} ${pl(c, "plaque", "plaques")} de cent : le chiffre des centaines est ${c}, il vaut ${c * 100}.`,
              `Il vaut ${c * 100}.`,
            ),
            baseDix(c, d, u),
          );
        },
        // Mêmes chiffres, places échangées : qui a le plus ?
        () => {
          const [p, q] = deuxEnfants();
          const [a, b] = deuxDifferents(1, 9);
          const n1 = a * 10 + b;
          const n2 = b * 10 + a;
          const ctx = randomChoice(QUANTITES);
          const plus = Math.random() < 0.5;
          const bon = (plus ? n1 > n2 : n1 < n2) ? p.nom : q.nom;
          return qcm(
            `${tableau(ctx, [[p, n1], [q, n2]])} ${plus ? ctx.plus : ctx.moins}`,
            bon,
            [p.nom, q.nom, "les deux pareil"],
            exp(
              "Les mêmes chiffres à des places différentes ne valent pas la même chose.",
              "On compare d'abord les dizaines.",
              `${n1} a ${a} dizaines, ${n2} a ${b} dizaines. Donc ${Math.max(n1, n2)} est le plus grand.`,
              `C'est ${bon}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_REPRESENTATIONS — passer d'une écriture à l'autre
     Le programme en nomme cinq : matériel, chiffres, lettres,
     unités de numération, décomposition additive.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_representations_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle écriture ne désigne PAS le nombre 305 ?",
    format: "qcm",
    choices: [
      "3 dizaines et 5 unités",
      "3 centaines et 5 unités",
      "300 + 5",
      "trois cent cinq",
    ],
    expected: ["3 dizaines et 5 unités"],
    comparator: "mcq_exact",
    hint: "3 dizaines, cela fait combien ?",
    explanation: exp(
      "Un même nombre s'écrit de plusieurs façons, mais elles doivent toutes donner la même quantité.",
      "On calcule ce que vaut chaque écriture, puis on la compare à 305.",
      "3 dizaines et 5 unités font 35, pas 305. Les trois autres écritures donnent bien 305.",
      "L'intruse est « 3 dizaines et 5 unités ».",
    ),
    tags: ["ce1", "nombre_entier", "representations", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_representations_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 3,
    theme: "neutral",
    hint: "Une centaine vaut cent, une dizaine vaut dix.",
    tags: ["ce1", "nombre_entier", "representations", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le matériel → les chiffres.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(0, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          return court(
            `${introCubes(p)} ${randomChoice(["Quel nombre montre ce dessin ?", "Écris ce nombre en chiffres.", "Quel nombre est représenté ?"])}`,
            n,
            exp(
              "Le matériel, les chiffres et les mots disent le même nombre.",
              "Les plaques donnent le chiffre des centaines, les barres celui des dizaines, les cubes celui des unités.",
              `${enUnites(c, d, u)} : ${n}.${d === 0 ? " Pas de barre : on écrit 0 aux dizaines." : ""}`,
              `C'est ${n}.`,
            ),
            baseDix(c, d, u),
          );
        },
        // Les unités de numération → les chiffres.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 9), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const ecrit = enUnites(c, d, u);
          return court(
            randomChoice([
              `Quel nombre s'écrit « ${ecrit} » ?`,
              `${p.nom} a noté : ${ecrit}. Quel est ce nombre ?`,
              `Écris en chiffres : ${ecrit}.`,
              `Pic pense à ${ecrit}. Quel nombre est-ce ?`,
            ]),
            n,
            exp(
              "Une écriture en unités de numération dit combien il y a de groupes de chaque taille.",
              "On transforme chaque groupe en nombre, puis on additionne.",
              `${c * 100} + ${d * 10} + ${u} = ${n}.`,
              `C'est le nombre ${n}.`,
            ),
          );
        },
        // Le matériel → les lettres.
        () => {
          const p = quelquun();
          const [c, d, u] = troisChiffres().map((x, i) => (i === 0 ? Math.min(x, 5) : x)) as [number, number, number];
          const n = c * 100 + d * 10 + u;
          const autres = [c * 100 + u * 10 + d, d * 100 + c * 10 + u, (c + 1) * 100 + d * 10 + u, c * 10 + d].filter((x) => x !== n);
          return qcm(
            `${introCubes(p)} ${randomChoice(["Ce nombre en lettres ?", "Comment s'écrit ce nombre en lettres ?"])}`,
            enLettres(n),
            autres.map(enLettres),
            exp(
              "Le matériel et les lettres disent le même nombre.",
              "On compte les plaques, les barres et les cubes, puis on lit le nombre.",
              `${enUnites(c, d, u)} : ${n}, qui se lit « ${enLettres(n)} ».`,
              `C'est « ${enLettres(n)} ».`,
            ),
            baseDix(c, d, u),
          );
        },
        // Les lettres → les unités de numération.
        () => {
          const [c, d, u] = troisChiffres();
          const n = c * 100 + d * 10 + u;
          return qcm(
            `${randomChoice(["Quelle écriture va avec", "Que veut dire", "Comment décompose-t-on"])} « ${enLettres(n)} » ?`,
            enUnites(c, d, u),
            [enUnites(c, u, d), enUnites(d, c, u), enUnites(u, d, c), enUnites(c, d + 1 > 9 ? d - 1 : d + 1, u)],
            exp(
              "Un même nombre s'écrit en lettres ou en unités de numération.",
              "On écoute les centaines, puis les dizaines, puis les unités.",
              `« ${enLettres(n)} », c'est ${n} : ${enUnites(c, d, u)}.`,
              `C'est ${enUnites(c, d, u)}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_entier_representations_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus de dix dizaines : refais des centaines.",
    tags: ["ce1", "nombre_entier", "representations", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // « 34 dizaines et 7 unités » : écriture non canonique.
        () => {
          const p = quelquun();
          const k = randomInt(11, 60);
          const u = randomInt(1, 9);
          const n = k * 10 + u;
          const ecrit = `${k} dizaines et ${u} ${pl(u, "unité", "unités")}`;
          return court(
            randomChoice([
              `Quel nombre s'écrit « ${ecrit} » ?`,
              `${p.nom} a noté : ${ecrit}. Quel est ce nombre ?`,
              `Écris en chiffres : ${ecrit}.`,
            ]),
            n,
            exp(
              "On peut compter un nombre en dizaines même quand il y en a plus de dix.",
              "On transforme les dizaines en nombre, puis on ajoute les unités.",
              `${k} dizaines font ${k * 10}. ${k * 10} + ${u} = ${n}.`,
              `C'est le nombre ${n}.`,
            ),
          );
        },
        // Le matériel avec plus de dix barres.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 3), randomInt(11, 17), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          return court(
            `${introCubes(p)} Plus de dix barres ! ${randomChoice(["Quel nombre montre ce dessin ?", "Quel nombre est représenté ?"])}`,
            n,
            exp(
              "Dix barres de dix font une plaque de cent.",
              "On refait une plaque avec dix barres, puis on lit le nombre.",
              `${d} barres = 1 plaque et ${d - 10} ${pl(d - 10, "barre", "barres")}. On a ${c + 1} plaques, ${d - 10} ${pl(d - 10, "barre", "barres")} et ${u} ${pl(u, "cube", "cubes")} : ${n}.`,
              `C'est ${n}.`,
            ),
            baseDix(c, d, u),
          );
        },
        // Combien de dizaines en tout ?
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 9), randomInt(0, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          if (c <= 4 && Math.random() < 0.6) {
            return court(
              `${introCubes(p)} Combien de barres de dix peut-on faire en tout ?`,
              c * 10 + d,
              exp(
                "Une plaque de cent, c'est dix barres de dix.",
                "On compte dix barres par plaque, puis on ajoute les barres.",
                `${c} ${pl(c, "plaque", "plaques")} = ${c * 10} barres. ${c * 10} + ${d} = ${c * 10 + d}. Les ${u} cubes seuls ne font pas une barre.`,
                `On pourrait faire ${c * 10 + d} barres.`,
              ),
              baseDix(c, d, u),
            );
          }
          return court(
            randomChoice([
              `Combien y a-t-il de dizaines en tout dans ${n} ?`,
              `${p.nom} fait des colliers de dix avec ${n} perles. Combien de colliers complets ?`,
              `${n} cubes : combien de barres de dix peut-on faire ?`,
            ]),
            c * 10 + d,
            exp(
              "Une centaine contient dix dizaines.",
              "On compte les dizaines des centaines, puis on ajoute le chiffre des dizaines.",
              `${c} centaines = ${c * 10} dizaines. ${c * 10} + ${d} = ${c * 10 + d} dizaines (et ${u} ${pl(u, "unité", "unités")} de reste).`,
              `Il y en a ${c * 10 + d}.`,
            ),
          );
        },
        // Quelle écriture désigne aussi ce nombre ?
        () => {
          const [c, d, u] = troisChiffres();
          const n = c * 100 + d * 10 + u;
          const k = c * 10 + d;
          return qcm(
            `Quelle écriture désigne aussi ${n} ?`,
            `${k} dizaines et ${u} ${pl(u, "unité", "unités")}`,
            [
              `${c} dizaines et ${d * 10 + u} unités`,
              `${d} dizaines et ${u} ${pl(u, "unité", "unités")}`,
              `${k} centaines et ${u} ${pl(u, "unité", "unités")}`,
              `${c} dizaines et ${u} ${pl(u, "unité", "unités")}`,
            ],
            exp(
              "Un même nombre peut se dire avec beaucoup de dizaines.",
              "On compte toutes les dizaines du nombre.",
              `${n} = ${c} centaines, ${d} dizaines et ${u} unités = ${k} dizaines et ${u} unités.`,
              `C'est ${k} dizaines et ${u} unités.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_DECOMPOSER — la décomposition additive
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_decomposer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chiffre garde la valeur de sa place.",
    tags: ["ce1", "nombre_entier", "decomposer", "template", "canvas"],
    generate: () => {
      const avecDessin = Math.random() < 0.65;
      const p = quelquun();
      const c = randomInt(1, avecDessin ? 5 : 9);
      const d = Math.random() < 0.2 ? 0 : randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const bonne = decomposition(c, d, u);
      const vaut = (t: string) => t.split(" + ").reduce((a, x) => a + Number(x), 0);
      const leurres = [
        `${c} + ${d} + ${u}`,
        `${c * 10} + ${d * 10} + ${u}`,
        `${c * 100} + ${d} + ${u * 10}`,
        `${c * 100} + ${d * 100} + ${u}`,
        `${u * 100} + ${d * 10} + ${c}`,
      ].filter((s) => s !== bonne && vaut(s) !== n);
      const ex = exp(
        "Décomposer, c'est écrire le nombre comme une somme où chaque chiffre garde la valeur de son rang.",
        "On écrit les centaines, puis les dizaines, puis les unités.",
        `Dans ${n} : le ${c} vaut ${c * 100}${d ? `, le ${d} vaut ${d * 10}` : ", il n'y a pas de dizaine"}, le ${u} vaut ${u}.`,
        `C'est ${bonne}.`,
      );
      if (avecDessin) {
        return qcm(
          `${introCubes(p)} ${randomChoice(["Quelle addition va avec ce dessin ?", "Quelle décomposition montre ce dessin ?", "Quel calcul donne ce nombre ?"])}`,
          bonne,
          leurres,
          ex,
          baseDix(c, d, u),
        );
      }
      return qcm(
        `${numeroDans(p, n)} ${randomChoice([`Quelle est la décomposition de ${n} ?`, `Quelle addition fait ${n} ?`, `Comment décompose-t-on ${n} ?`])}`,
        bonne,
        leurres,
        ex,
      );
    },
  },
  {
    kind: "template",
    id: "ce1_entier_decomposer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les morceaux : centaines, dizaines, unités.",
    tags: ["ce1", "nombre_entier", "decomposer", "template"],
    generate: () =>
      tirerDessin([
        // Recomposer, dans l'ordre ou dans le désordre.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 9), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const morceaux = Math.random() < 0.5 ? [c * 100, d * 10, u] : shuffle([c * 100, d * 10, u]);
          const calc = morceaux.join(" + ");
          return court(
            randomChoice([
              `Quel nombre vaut ${calc} ?`,
              `Calcule : ${calc}.`,
              `${p.nom} a écrit ${calc}. Quel nombre a-t-${p.il} décomposé ?`,
              `Pic a ${calc} graines. Combien en tout ?`,
            ]),
            n,
            exp(
              "Une décomposition se recompose en additionnant ses morceaux.",
              "On range les morceaux : centaines, dizaines, unités.",
              `${c * 100} + ${d * 10} + ${u} = ${n}.`,
              `C'est ${n}.`,
            ),
          );
        },
        // Le morceau qui manque.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 9), randomInt(1, 9), randomInt(1, 9)];
          const n = c * 100 + d * 10 + u;
          const trou = randomInt(0, 2);
          const morceaux = [c * 100, d * 10, u];
          const rep = morceaux[trou];
          const ecrit = morceaux.map((x, i) => (i === trou ? "?" : String(x))).join(" + ");
          return court(
            randomChoice([
              `Complète : ${n} = ${ecrit}.`,
              `${p.nom} décompose ${n} : ${ecrit}. Que vaut le « ? » ?`,
              `Quel nombre manque ? ${n} = ${ecrit}`,
            ]),
            rep,
            exp(
              "Dans une décomposition, chaque chiffre garde la valeur de son rang.",
              "On regarde quel rang manque, puis on lit le chiffre de ce rang.",
              `${n} = ${c * 100} + ${d * 10} + ${u}. Il manque ${rep}.`,
              `Le « ? » vaut ${rep}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_COMPARER — =, < et >
     Le piège : le nombre qui a le plus de chiffres est le plus
     grand, mais à nombre de chiffres égal, c'est le rang le
     plus à gauche qui décide.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Trombones : Aaron en a 49, Mia 53. Qui en a le plus ?",
    format: "qcm",
    choices: ["Mia", "Aaron", "ils en ont autant", "on ne peut pas savoir"],
    expected: ["Mia"],
    comparator: "mcq_exact",
    hint: "Compare les dizaines avant les unités.",
    explanation: exp(
      "Pour comparer deux nombres à deux chiffres, on regarde d'abord les dizaines.",
      "On compte les dizaines de chacun, puis les unités seulement en cas d'égalité.",
      "Aaron a 4 dizaines et 9 unités, Mia a 5 dizaines et 3 unités. Cinq dizaines, c'est plus que quatre, même si 9 est plus grand que 3.",
      "C'est Mia qui en a le plus.",
    ),
    tags: ["ce1", "nombre_entier", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La pointe du signe montre le plus petit nombre.",
    tags: ["ce1", "nombre_entier", "comparer", "template"],
    generate: () => {
      const [a, b] = deuxProches();
      const ex = exp(
        "Le signe < se lit « est inférieur à », le signe > se lit « est supérieur à ». La pointe montre le plus petit.",
        "On compare les centaines, puis les dizaines, puis les unités.",
        `Le plus petit des deux est ${Math.min(a, b)}. On écrit ${a} ${a < b ? "<" : ">"} ${b}.`,
        `${Math.max(a, b)} est le plus grand.`,
      );
      return tirerDessin([
        () => qcm(randomChoice([`Quel signe faut-il placer entre ${a} et ${b} ?`, `Complète : ${a} … ${b}`, `Choisis le bon signe : ${a} … ${b}`]), a < b ? "<" : ">", ["<", ">", "="], ex),
        () => {
          const p = quelquun();
          const plus = Math.random() < 0.5;
          return qcm(
            randomChoice([
              `Quel est le plus ${plus ? "grand" : "petit"} nombre : ${a} ou ${b} ?`,
              `${p.nom} entoure le plus ${plus ? "grand" : "petit"} : ${a} ou ${b}. Lequel ?`,
            ]),
            String(plus ? Math.max(a, b) : Math.min(a, b)),
            [String(a), String(b), "ils sont égaux"],
            ex,
          );
        },
        () => {
          const p = quelquun();
          const signe = randomChoice(["<", ">"] as const);
          const vrai = signe === "<" ? a < b : a > b;
          return qcm(
            randomChoice([`Est-ce vrai ou faux : ${a} ${signe} ${b} ?`, `${p.nom} a écrit ${a} ${signe} ${b}. A-t-${p.il} raison ?`]),
            vrai ? "vrai" : "faux",
            ["vrai", "faux"],
            ex,
          );
        },
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(0, 9), randomInt(0, 9)];
          const x = c * 100 + d * 10 + u;
          let y = randomChoice([x + randomInt(1, 9), x - randomInt(1, 9), c * 100 + u * 10 + d, x + 10, x - 10]);
          if (y === x || y < 100) y = x + 1;
          return qcm(
            `${introCubes(p)} Ce nombre est-il plus grand ou plus petit que ${y} ?`,
            x > y ? "plus grand" : "plus petit",
            ["plus grand", "plus petit", "égal"],
            exp(
              "On lit d'abord le nombre du dessin, puis on compare rang par rang.",
              "Les plaques donnent les centaines, les barres les dizaines, les cubes les unités.",
              `Le dessin montre ${x}. ${Math.min(x, y)} < ${Math.max(x, y)}.`,
              `${x} est ${x > y ? "plus grand" : "plus petit"} que ${y}.`,
            ),
            baseDix(c, d, u),
          );
        },
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_entier_comparer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les centaines, puis les dizaines, puis les unités.",
    tags: ["ce1", "nombre_entier", "comparer", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Deux enfants, deux nombres proches.
        () => {
          const [p, q] = deuxEnfants();
          const [a, b] = deuxProches();
          const ctx = randomChoice(QUANTITES);
          const plus = Math.random() < 0.5;
          const bon = (plus ? a > b : a < b) ? p.nom : q.nom;
          return qcm(
            `${tableau(ctx, [[p, a], [q, b]])} ${plus ? ctx.plus : ctx.moins}`,
            bon,
            [p.nom, q.nom, "les deux pareil"],
            exp(
              "Pour comparer deux nombres, on regarde d'abord le chiffre le plus à gauche.",
              "On compare les centaines, puis les dizaines, puis les unités.",
              `${Math.min(a, b)} < ${Math.max(a, b)}.`,
              `C'est ${bon}.`,
            ),
          );
        },
        // Le dessin de l'un, le nombre de l'autre.
        () => {
          const [p, q] = deuxEnfants();
          const [c, d, u] = [randomInt(1, 5), randomInt(0, 9), randomInt(0, 9)];
          const a = c * 100 + d * 10 + u;
          let b = randomChoice([a + randomInt(1, 9), a - randomInt(1, 9), a + 10 * randomInt(1, 3), a - 10 * randomInt(1, 3), c * 100 + u * 10 + d]);
          if (b === a || b < 10) b = a + 11;
          const bon = a > b ? p.nom : q.nom;
          return qcm(
            `Dessin : les cubes ${de(p.nom)}. ${q.nom} en a ${b}. Qui en a le plus ?`,
            bon,
            [p.nom, q.nom, "les deux pareil"],
            exp(
              "On lit d'abord le nombre du dessin, puis on compare.",
              "Les plaques donnent les centaines, les barres les dizaines, les cubes les unités.",
              `${p.nom} a ${a} cubes. ${Math.min(a, b)} < ${Math.max(a, b)}.`,
              `C'est ${bon}.`,
            ),
            baseDix(c, d, u),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_EXPRESSIONS — dire la comparaison avec des mots
     Le programme les nomme : « égal à », « supérieur à »,
     « inférieur à », « compris entre … et … ».
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_expressions_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on le signe < ?",
    format: "qcm",
    choices: [
      "est inférieur à",
      "est supérieur à",
      "est égal à",
      "est compris entre",
    ],
    expected: ["est inférieur à"],
    comparator: "mcq_exact",
    hint: "La pointe du signe est du côté du plus petit.",
    explanation: exp(
      "Le signe < veut dire « est inférieur à », c'est-à-dire « est plus petit que ».",
      "On regarde de quel côté est la pointe : elle montre le plus petit nombre.",
      "Dans 12 < 30, la pointe est vers le 12 : douze est inférieur à trente.",
      "Le signe < se lit « est inférieur à ».",
    ),
    tags: ["ce1", "nombre_entier", "expressions", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_expressions_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 2,
    theme: "neutral",
    hint: "La pointe du signe montre le plus petit nombre.",
    tags: ["ce1", "nombre_entier", "expressions", "template"],
    generate: () => {
      const [x, y] = deuxDifferents(10, 999);
      const a = Math.min(x, y);
      const b = Math.max(x, y);
      const p = quelquun();
      const ex = exp(
        "« < » se lit « est inférieur à », « > » se lit « est supérieur à ».",
        "La pointe du signe montre le plus petit nombre.",
        `${a} est plus petit que ${b} : ${a} < ${b}, et ${b} > ${a}.`,
        `${a} est inférieur à ${b}.`,
      );
      return tirerDessin([
        () => {
          const ecrit = Math.random() < 0.5 ? `${a} < ${b}` : `${b} > ${a}`;
          const [g, dr] = ecrit.includes("<") ? [a, b] : [b, a];
          const mot = ecrit.includes("<") ? "inférieur" : "supérieur";
          return qcm(
            randomChoice([
              `Comment lit-on « ${ecrit} » ?`,
              `${p.nom} lit à voix haute « ${ecrit} ». Que dit-${p.il} ?`,
              `Au tableau, ${p.nom} a écrit « ${ecrit} ». Comment le lire ?`,
              `${p.nom} montre l'étiquette « ${ecrit} ». Que veut-elle dire ?`,
              `Pic lit « ${ecrit} ». Que dit-il ?`,
              `Que veut dire « ${ecrit} » ?`,
            ]),
            `${g} est ${mot} à ${dr}`,
            [`${g} est ${mot === "inférieur" ? "supérieur" : "inférieur"} à ${dr}`, `${g} est égal à ${dr}`],
            ex,
          );
        },
        () => {
          const mot = randomChoice(["inférieur", "supérieur"] as const);
          const [g, dr] = mot === "inférieur" ? [a, b] : [b, a];
          return qcm(
            randomChoice([
              `Écris avec un signe : « ${g} est ${mot} à ${dr} ».`,
              `${p.nom} dit : « ${g} est ${mot} à ${dr} ». Comment l'écrire ?`,
              `Avec un signe, comment écrire « ${g} est ${mot} à ${dr} » ?`,
              `${p.nom} écrit « ${g} est ${mot} à ${dr} » avec un signe. Lequel ?`,
              `Pic veut écrire « ${g} est ${mot} à ${dr} ». Quel signe ?`,
            ]),
            `${g} ${mot === "inférieur" ? "<" : ">"} ${dr}`,
            [`${g} ${mot === "inférieur" ? ">" : "<"} ${dr}`, `${g} = ${dr}`],
            ex,
          );
        },
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_entier_expressions_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "« Inférieur à » veut dire plus petit ; « supérieur à » veut dire plus grand.",
    tags: ["ce1", "nombre_entier", "expressions", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le nombre dessiné : inférieur ou supérieur ?
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(0, 9), randomInt(1, 9)];
          const x = c * 100 + d * 10 + u;
          let y = randomChoice([x + randomInt(1, 9), x - randomInt(1, 9), x + 10 * randomInt(1, 4), x - 10 * randomInt(1, 4)]);
          if (y < 100) y = x + 5;
          return qcm(
            `${introCubes(p)} ${randomChoice([`Complète : ce nombre est … ${y}.`, `Ce nombre est-il inférieur ou supérieur à ${y} ?`])}`,
            x < y ? `inférieur à ${y}` : `supérieur à ${y}`,
            [`inférieur à ${y}`, `supérieur à ${y}`, `égal à ${y}`],
            exp(
              "« Inférieur à » : plus petit. « Supérieur à » : plus grand.",
              "On lit le nombre du dessin, puis on compare rang par rang.",
              `Le dessin montre ${x}. ${Math.min(x, y)} < ${Math.max(x, y)}.`,
              `${x} est ${x < y ? "inférieur" : "supérieur"} à ${y}.`,
            ),
            baseDix(c, d, u),
          );
        },
        // Lequel est inférieur / supérieur ?
        () => {
          const [a, b] = deuxProches();
          const p = quelquun();
          const inf = Math.random() < 0.5;
          const bonne = String(inf ? Math.min(a, b) : Math.max(a, b));
          return qcm(
            randomChoice([
              `Parmi ${a} et ${b}, lequel est ${inf ? "INFÉRIEUR" : "SUPÉRIEUR"} à l'autre ?`,
              `${p.nom} cherche le nombre ${inf ? "inférieur" : "supérieur"} à l'autre : ${a} ou ${b} ?`,
            ]),
            bonne,
            [String(a), String(b), "les deux sont égaux"],
            exp(
              "« Inférieur à » veut dire « plus petit que » ; « supérieur à » veut dire « plus grand que ».",
              "On compare les deux nombres rang par rang, en partant de la gauche.",
              `${Math.min(a, b)} < ${Math.max(a, b)}.`,
              `C'est ${bonne}.`,
            ),
          );
        },
        // Compléter la phrase avec le bon mot.
        () => {
          const [a, b] = Math.random() < 0.15 ? [randomInt(100, 999), 0] : deuxProches();
          const bb = b === 0 ? a : b;
          const mot = a < bb ? "inférieur à" : a > bb ? "supérieur à" : "égal à";
          return qcm(
            randomChoice([`Complète : ${a} est … ${bb}.`, `Quel mot manque ? ${a} est … ${bb}.`]),
            mot,
            ["inférieur à", "supérieur à", "égal à"],
            exp(
              "« Inférieur à » : plus petit. « Supérieur à » : plus grand. « Égal à » : pareil.",
              "On compare les deux nombres rang par rang.",
              a === bb ? `${a} et ${bb} sont le même nombre.` : `${Math.min(a, bb)} < ${Math.max(a, bb)}.`,
              `${a} est ${mot} ${bb}.`,
            ),
          );
        },
        // Un nombre pensé, plus grand ou plus petit qu'un autre.
        () => {
          const p = quelquun();
          const n = randomInt(150, 850);
          const sup = Math.random() < 0.5;
          const bonne = sup ? n + randomInt(1, 40) : n - randomInt(1, 40);
          const faux = sup
            ? [n - randomInt(1, 9), n - randomInt(10, 60), n - 100]
            : [n + randomInt(1, 9), n + randomInt(10, 60), n + 100];
          return qcm(
            randomChoice([
              `${p.nom} pense à un nombre ${sup ? "supérieur" : "inférieur"} à ${n}. Lequel peut-${p.il} choisir ?`,
              `Pic cherche un nombre ${sup ? "supérieur" : "inférieur"} à ${n}. Lequel ?`,
              `Quel nombre est ${sup ? "supérieur" : "inférieur"} à ${n} ?`,
            ]),
            String(bonne),
            faux.map(String),
            exp(
              `« ${sup ? "Supérieur" : "Inférieur"} à ${n} » veut dire « plus ${sup ? "grand" : "petit"} que ${n} ».`,
              `On compare chaque nombre à ${n}.`,
              `${bonne} ${sup ? ">" : "<"} ${n}. Les autres sont ${sup ? "plus petits" : "plus grands"}.`,
              `C'est ${bonne}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_entier_expressions_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 4,
    theme: "neutral",
    hint: "« Compris entre » veut dire : plus grand que le premier, plus petit que le second.",
    tags: ["ce1", "nombre_entier", "expressions", "template", "canvas"],
    generate: () => {
      const bas = randomInt(10, 80) * 10;
      const haut = bas + randomChoice([20, 30, 50, 100]);
      const dedans = randomInt(bas + 1, haut - 1);
      const p = quelquun();
      const pas = randomChoice([true, false]);
      const dehors = [bas - randomInt(1, 9), haut + randomInt(1, 9), haut + randomInt(10, 50), bas - randomInt(10, 50)];
      const contexte = randomChoice([
        `${p.nom} pense à un nombre compris entre ${bas} et ${haut}.`,
        `Le trésor de Pic est sous une pierre entre ${bas} et ${haut}.`,
        `Le livre ${de(p.nom)} a entre ${bas} et ${haut} pages.`,
        `Le dragon a entre ${bas} et ${haut} écailles.`,
        `Le ticket gagnant est entre ${bas} et ${haut}.`,
        `La fusée ${de(p.nom)} vole entre ${bas} et ${haut} mètres.`,
        `${p.nom} a compté entre ${bas} et ${haut} arbres.`,
        `Le gâteau pèse entre ${bas} et ${haut} grammes.`,
        `${p.nom} a gagné entre ${bas} et ${haut} points.`,
        `La maîtresse cache un nombre entre ${bas} et ${haut}.`,
      ]);
      const ex = exp(
        "« Compris entre … et … » veut dire plus grand que le premier nombre et plus petit que le second.",
        "On vérifie les deux conditions l'une après l'autre.",
        `${bas} < ${dedans} < ${haut}.`,
        `${dedans} est compris entre ${bas} et ${haut}.`,
      );
      if (pas) {
        // L'autre bout : trouver celui qui N'EST PAS dedans.
        const intrus = randomChoice(dehors);
        const dedans2 = [dedans, randomInt(bas + 1, haut - 1), randomInt(bas + 1, haut - 1)];
        return qcm(
          randomChoice([
            `Quel nombre n'est PAS compris entre ${bas} et ${haut} ?`,
            `Un nombre entre ${bas} et ${haut} ? Lequel ne va PAS ?`,
            `Pic doit se poser entre ${bas} et ${haut}. Quel nombre est en dehors ?`,
            `Le ticket gagnant est entre ${bas} et ${haut}. Quel ticket a PERDU ?`,
          ]),
          String(intrus),
          dedans2.map(String),
          exp(
            "« Compris entre … et … » veut dire plus grand que le premier et plus petit que le second.",
            "On vérifie chaque nombre : est-il après le premier ET avant le second ?",
            intrus < bas ? `${intrus} < ${bas} : il est avant.` : `${intrus} > ${haut} : il est après.`,
            `C'est ${intrus}.`,
          ),
          droite({ min: bas, max: haut, step: (haut - bas) / 10, valeursEcrites: [bas, haut] }),
        );
      }
      return qcm(
        `${contexte} ${randomChoice(["Quel nombre convient ?", "Lequel convient ?", "Lequel de ces nombres convient ?"])}`,
        String(dedans),
        dehors.map(String),
        ex,
        droite({ min: bas, max: haut, step: (haut - bas) / 10, valeursEcrites: [bas, haut] }),
      );
    },
  },

  /* =========================================================
     CE1_ENTIER_ENCADRER — encadrer et intercaler
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_encadrer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "La dizaine d'avant se termine par 0.",
    tags: ["ce1", "nombre_entier", "encadrer", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const c = randomInt(1, 9);
      const d = randomInt(0, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const parCent = Math.random() < 0.35;
      const entre = (x: number, y: number) => `entre ${x} et ${y}`;
      if (parCent) {
        const bas = c * 100;
        return qcm(
          `${numeroDans(p, n)} ${randomChoice([`Entre quelles centaines se trouve ${n} ?`, `${n} est entre quelles centaines ?`])}`,
          entre(bas, bas + 100),
          [entre(bas - 100, bas), entre(bas + 100, bas + 200), entre(d * 100, d * 100 + 100), entre(bas, bas + 10)].filter((s) => !s.includes("-")),
          exp(
            "Encadrer par des centaines, c'est trouver la centaine juste avant et celle juste après.",
            "On regarde le chiffre des centaines.",
            `${n} a ${c} centaines : ${bas} < ${n} < ${bas + 100}.`,
            `${n} est entre ${bas} et ${bas + 100}.`,
          ),
        );
      }
      const bas = n - u;
      const choix = [entre(bas - 10, bas), entre(bas + 10, bas + 20), entre(n - 1, n + 1), entre(c * 100, c * 100 + 100)];
      const ex = exp(
        "Encadrer par des dizaines, c'est trouver la dizaine juste avant et celle juste après.",
        "On enlève les unités pour obtenir la dizaine d'avant, puis on ajoute dix.",
        `${n} : la dizaine d'avant est ${bas}, la suivante ${bas + 10}. ${bas} < ${n} < ${bas + 10}.`,
        `${n} est entre ${bas} et ${bas + 10}.`,
      );
      if (Math.random() < 0.75) {
        // La droite graduée de dix en dix : seules les centaines sont écrites.
        return qcm(
          `${randomChoice([`Sur la droite, le point montre ${n}.`, `${p.nom} a placé ${n} sur la droite.`, `Pic s'est posé sur ${n}.`, `Le robot ${de(p.nom)} s'arrête sur ${n}.`, `${p.nom} a lancé sa balle jusqu'à ${n}.`, `La grenouille ${de(p.nom)} a sauté jusqu'à ${n}.`])} ${randomChoice(["Entre quelles dizaines est-il ?", "Entre quelles dizaines ?", `Encadre ${n} entre deux dizaines.`])}`,
          entre(bas, bas + 10),
          choix,
          ex,
          droite({
            min: c * 100,
            max: c * 100 + 100,
            step: 10,
            valeursEcrites: [c * 100, c * 100 + 100],
            points: [{ value: n, label: String(n), color: "#ef4444" }],
          }),
        );
      }
      return qcm(
        `${numeroDans(p, n)} ${randomChoice([`Entre quelles dizaines se trouve ${n} ?`, `Encadre ${n} entre deux dizaines.`, `${n} est entre quelles dizaines ?`])}`,
        entre(bas, bas + 10),
        choix,
        ex,
      );
    },
  },
  {
    kind: "template",
    id: "ce1_entier_encadrer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Intercaler, c'est trouver le nombre qui tient entre les deux.",
    tags: ["ce1", "nombre_entier", "encadrer", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le point « ? » sur une droite de un en un.
        () => {
          const p = quelquun();
          const debut = randomInt(100, 990);
          const k = randomInt(2, 6);
          return court(
            `${randomChoice([`La droite avance de un en un.`, `${p.nom} compte de un en un.`, `Pic saute de un en un.`])} Quel nombre est au point « ? » ?`,
            debut + k,
            exp(
              "Sur cette droite, chaque graduation ajoute 1.",
              "On part du nombre écrit et on avance graduation par graduation.",
              `${debut}, ${Array.from({ length: k }, (_, i) => debut + i + 1).join(", ")}.`,
              `C'est ${debut + k}.`,
            ),
            droite({
              min: debut,
              max: debut + 8,
              step: 1,
              valeursEcrites: [debut],
              points: [{ value: debut + k, label: "?", color: "#ef4444" }],
            }),
          );
        },
        // Juste avant, juste après, entre deux.
        () => {
          const p = quelquun();
          const n = randomInt(101, 998);
          const type = randomChoice(["avant", "apres", "entre"] as const);
          const rep = type === "avant" ? n - 1 : type === "apres" ? n + 1 : n;
          const text =
            type === "avant"
              ? randomChoice([`Quel nombre vient juste avant ${n} ?`, `${p.nom} recule d'un pas depuis ${n}. Où arrive-t-${p.il} ?`])
              : type === "apres"
                ? randomChoice([`Quel nombre vient juste après ${n} ?`, `${p.nom} avance d'un pas depuis ${n}. Où arrive-t-${p.il} ?`])
                : randomChoice([`Quel nombre se place entre ${n - 1} et ${n + 1} ?`, `Pic saute de la pierre ${n - 1} à la pierre ${n + 1}. Quelle pierre a-t-il sautée ?`]);
          const connu = type === "entre" ? n - 1 : n;
          const ecrits = type === "entre" ? [n - 1, n + 1] : [n];
          return court(
            text,
            rep,
            exp(
              "Les nombres se suivent de un en un.",
              "Juste avant : on enlève 1. Juste après : on ajoute 1.",
              `${n - 1}, ${n}, ${n + 1}.`,
              `C'est ${rep}.`,
            ),
            Math.random() < 0.6
              ? droite({ min: connu - 3, max: connu + 4, step: 1, valeursEcrites: ecrits, points: [{ value: rep, label: "?", color: "#ef4444" }] })
              : undefined,
          );
        },
        // La bande de nombres avec un trou.
        () => {
          const debut = randomInt(100, 990);
          const trou = randomInt(1, 5);
          const bande = Array.from({ length: 7 }, (_, i) => (i === trou ? "?" : String(debut + i)));
          return court(
            `${randomChoice(["Quel nombre remplace le « ? » ?", "Quel nombre manque dans la bande ?"])} ${bande.join(" · ")}`,
            debut + trou,
            exp(
              "Sur une bande de nombres, on avance de un en un.",
              "On regarde le nombre juste avant le trou, puis on ajoute 1.",
              `${debut + trou - 1} + 1 = ${debut + trou}, et ${debut + trou} + 1 = ${debut + trou + 1}.`,
              `C'est ${debut + trou}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_ORDONNER — croissant et décroissant
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_ordonner_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Ranger des nombres dans l'ordre CROISSANT, cela veut dire les ranger comment ?",
    format: "qcm",
    choices: [
      "du plus petit au plus grand",
      "du plus grand au plus petit",
      "par ordre alphabétique",
      "au hasard",
    ],
    expected: ["du plus petit au plus grand"],
    comparator: "mcq_exact",
    hint: "« Croissant » vient de « croître », c'est-à-dire grandir.",
    explanation: exp(
      "L'ordre croissant va du plus petit au plus grand ; l'ordre décroissant fait l'inverse.",
      "On retient le mot : croître, c'est grandir.",
      "Dans l'ordre croissant, les nombres grandissent au fur et à mesure : 12, 45, 128, 340.",
      "C'est du plus petit au plus grand.",
    ),
    tags: ["ce1", "nombre_entier", "ordonner", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_ordonner_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_ordonner",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d'abord le chiffre des centaines.",
    tags: ["ce1", "nombre_entier", "ordonner", "template"],
    generate: () => {
      const cs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      const nombres = cs.map((c) => c * 100 + randomInt(0, 99));
      const plus = Math.random() < 0.5;
      const bonne = plus ? Math.max(...nombres) : Math.min(...nombres);
      const p = quelquun();
      if (Math.random() < 0.4) {
        // Le nombre d'un enfant est dessiné ; les deux autres sont écrits.
        const k = cs.findIndex((c) => c <= 5);
        if (k >= 0) {
          const x = nombres[k];
          const [moi, q, r] = plusieursEnfants(3);
          const autres = nombres.filter((_, i) => i !== k);
          const nomDe = (v: number) => (v === x ? moi.nom : v === autres[0] ? q.nom : r.nom);
          return qcm(
            `Dessin : les cubes ${de(moi.nom)}. ${q.nom} en a ${autres[0]}, ${r.nom} ${autres[1]}. Qui en a le ${plus ? "plus" : "moins"} ?`,
            nomDe(bonne),
            [moi.nom, q.nom, r.nom],
            exp(
              "On lit d'abord le nombre du dessin, puis on compare les centaines.",
              "Le plus grand nombre a le plus grand chiffre des centaines.",
              `${moi.nom} : ${x}. ${q.nom} : ${autres[0]}. ${r.nom} : ${autres[1]}.`,
              `C'est ${nomDe(bonne)}.`,
            ),
            baseDix(Math.floor(x / 100), Math.floor(x / 10) % 10, x % 10),
          );
        }
      }
      return qcm(
        randomChoice([
          `Quel est le plus ${plus ? "grand" : "petit"} nombre : ${nombres.join(", ")} ?`,
          `${p.nom} range ses cartes : ${nombres.join(", ")}. Quelle est la plus ${plus ? "grande" : "petite"} ?`,
          `${p.nom} a trois tickets : ${nombres.join(", ")}. Lequel porte le plus ${plus ? "grand" : "petit"} numéro ?`,
          `${p.nom} compare ${nombres.join(", ")}. Lequel est le plus ${plus ? "grand" : "petit"} ?`,
          `Trois livres : ${nombres.join(", ")} pages. Lequel a le ${plus ? "plus" : "moins"} de pages ?`,
          `Trois dinosaures pèsent ${nombres.join(", ")} kilos. Quel est le plus ${plus ? "lourd" : "léger"} ?`,
          `${p.nom} entoure le plus ${plus ? "grand" : "petit"} : ${nombres.join(", ")}. Lequel ?`,
          `Pic cherche le plus ${plus ? "grand" : "petit"} nombre : ${nombres.join(", ")}.`,
          `Dans l'ordre ${plus ? "décroissant" : "croissant"}, quel nombre vient en premier : ${nombres.join(", ")} ?`,
        ]),
        String(bonne),
        nombres.map(String),
        exp(
          "Le plus grand nombre a le plus grand chiffre des centaines (quand ils ont tous trois chiffres).",
          "On compare les centaines.",
          `Les centaines sont ${cs.join(", ")}. Le plus ${plus ? "grand" : "petit"} est ${bonne}.`,
          `C'est ${bonne}.`,
        ),
      );
    },
  },
  {
    kind: "template",
    id: "ce1_entier_ordonner_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les centaines, puis les dizaines, puis les unités.",
    tags: ["ce1", "nombre_entier", "ordonner", "template"],
    generate: () =>
      tirerDessin([
        // Premier ou dernier dans un ordre donné (nombres proches).
        () => {
          const c = randomInt(1, 8);
          const ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
          const nombres = shuffle([...ds.map((d) => c * 100 + d * 10 + randomInt(0, 9)), (c + 1) * 100 + randomInt(0, 9)]);
          const croissant = Math.random() < 0.5;
          const premier = Math.random() < 0.6;
          const prendMax = croissant !== premier;
          const bonne = prendMax ? Math.max(...nombres) : Math.min(...nombres);
          return qcm(
            `${randomChoice(["Ordre", "Range dans l'ordre", "On range dans l'ordre"])} ${croissant ? "croissant" : "décroissant"} : ${nombres.join(", ")}. Lequel ${randomChoice(["vient", "écrit-on"])} en ${premier ? "PREMIER" : "DERNIER"} ?`,
            String(bonne),
            nombres.map(String),
            exp(
              "L'ordre croissant va du plus petit au plus grand, l'ordre décroissant du plus grand au plus petit.",
              "On compare les centaines, puis les dizaines.",
              `Rangés du plus petit au plus grand : ${[...nombres].sort((a, b) => a - b).join(" < ")}.`,
              `On écrit ${bonne} en ${premier ? "premier" : "dernier"}.`,
            ),
          );
        },
        // Des enfants et leurs scores : qui vient en premier ?
        () => {
          const enfants = plusieursEnfants(3);
          const ctx = randomChoice(QUANTITES);
          const c = randomInt(1, 8);
          const valeurs = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3).map((d) => c * 100 + d * 10 + randomInt(0, 9));
          const plus = Math.random() < 0.5;
          const idx = valeurs.indexOf(plus ? Math.max(...valeurs) : Math.min(...valeurs));
          return qcm(
            `${tableau(ctx, enfants.map((e, i) => [e, valeurs[i]] as [Personne, number]))} ${plus ? ctx.plus : ctx.moins}`,
            enfants[idx].nom,
            enfants.map((e) => e.nom),
            exp(
              "Pour ranger, on compare les nombres rang par rang.",
              "Mêmes centaines : ce sont les dizaines qui décident.",
              `${[...valeurs].sort((a, b) => a - b).join(" < ")}.`,
              `C'est ${enfants[idx].nom}.`,
            ),
          );
        },
        // Trois enfants, l'un dessiné.
        () => {
          const [moi, q, r] = plusieursEnfants(3);
          const c = randomInt(1, 4);
          const ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
          const vals = ds.map((d) => c * 100 + d * 10 + randomInt(0, 9));
          const plus = Math.random() < 0.5;
          const cible = plus ? Math.max(...vals) : Math.min(...vals);
          const noms = [moi.nom, q.nom, r.nom];
          const x = vals[0];
          return qcm(
            `Dessin : les cubes ${de(moi.nom)}. ${q.nom} en a ${vals[1]}, ${r.nom} ${vals[2]}. Qui en a le ${plus ? "plus" : "moins"} ?`,
            noms[vals.indexOf(cible)],
            noms,
            exp(
              "On lit le nombre du dessin, puis on range les trois nombres.",
              "Mêmes centaines : ce sont les dizaines qui décident.",
              `${moi.nom} : ${x}. ${[...vals].sort((a, b) => a - b).join(" < ")}.`,
              `C'est ${noms[vals.indexOf(cible)]}.`,
            ),
            baseDix(c, Math.floor(x / 10) % 10, x % 10),
          );
        },
        // Quelle liste est bien rangée ?
        () => {
          const t = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).map((d) => randomInt(1, 8) * 100 + d * 10 + randomInt(0, 9));
          const tri = [...t].sort((a, b) => a - b);
          if (new Set(tri).size < 4) tri[3] = tri[2] + 1;
          const croissant = Math.random() < 0.5;
          const bon = (croissant ? tri : [...tri].reverse()).join(", ");
          const ech = (k: number) => {
            const x = croissant ? [...tri] : [...tri].reverse();
            [x[k], x[k + 1]] = [x[k + 1], x[k]];
            return x.join(", ");
          };
          return qcm(
            `Quelle liste est rangée dans l'ordre ${croissant ? "croissant" : "décroissant"} ?`,
            bon,
            [ech(0), ech(1), ech(2), (croissant ? [...tri].reverse() : tri).join(", ")],
            exp(
              `L'ordre ${croissant ? "croissant va du plus petit au plus grand" : "décroissant va du plus grand au plus petit"}.`,
              "On vérifie chaque nombre avec son voisin.",
              `${bon}.`,
              `C'est la liste ${bon}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_DROITE — la demi-droite graduée
     Le programme fait le lien avec la règle graduée : la
     distance à l'origine, c'est le nombre.
     ⛔ La valeur cherchée n'est JAMAIS écrite sur la droite.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_droite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien on avance entre deux graduations.",
    tags: ["ce1", "nombre_entier", "droite", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 10, 10, 100] as const);
      const depart = pas === 1 ? randomInt(10, 90) * 10 : pas === 10 ? randomInt(1, 8) * 100 + randomChoice([0, 0, 50]) : 0;
      const nbGrad = pas === 100 ? 10 : 8;
      const max = depart + pas * nbGrad;
      const ecrites = [depart, depart + pas];
      const p = quelquun();
      const intro = randomChoice([
        `Cette droite est graduée de ${pas} en ${pas}.`,
        `Sur la droite, on avance de ${pas} en ${pas}.`,
        `${p.nom} a gradué sa droite de ${pas} en ${pas}.`,
        `Pic saute de ${pas} en ${pas} sur la droite.`,
        `Sur le chemin du trésor, chaque trait ajoute ${pas}.`,
      ]);
      const ex = (x: number) =>
        exp(
          "Sur une droite graduée, chaque graduation avance du même pas.",
          "On part d'une graduation écrite et on ajoute le pas autant de fois qu'il faut.",
          `Le pas est ${pas}. De ${depart}, on avance de ${(x - depart) / pas} ${pl((x - depart) / pas, "graduation", "graduations")} : ${x}.`,
          `C'est ${x}.`,
        );
      return tirerDessin([
        // Le point « ? »
        () => {
          const x = depart + pas * randomInt(2, nbGrad - 1);
          return court(
            `${intro} ${randomChoice(["Quel nombre est au point « ? » ?", "Quel nombre cache le point « ? » ?", "Où est arrivé le point « ? » ?"])}`,
            x,
            ex(x),
            droite({ min: depart, max, step: pas, valeursEcrites: ecrites, points: [{ value: x, label: "?", color: "#ef4444" }] }),
          );
        },
        // Trois points nommés : lequel est à x ?
        () => {
          const ks = shuffle(Array.from({ length: nbGrad - 2 }, (_, i) => i + 2)).slice(0, 3).sort((a, b) => a - b);
          const lettres = ["A", "B", "C"];
          const i = randomInt(0, 2);
          const x = depart + pas * ks[i];
          return qcm(
            `${intro} ${randomChoice([`Quel point est placé à ${x} ?`, `${p.nom} cherche ${x}. Quel point est-ce ?`])}`,
            `le point ${lettres[i]}`,
            ["le point A", "le point B", "le point C"],
            ex(x),
            droite({
              min: depart,
              max,
              step: pas,
              valeursEcrites: ecrites,
              points: ks.map((k, j) => ({ value: depart + pas * k, label: lettres[j], color: ["#ef4444", "#2563eb", "#16a34a"][j] })),
            }),
          );
        },
        // Trois points nommés : quel nombre au point B ?
        () => {
          const ks = shuffle(Array.from({ length: nbGrad - 2 }, (_, i) => i + 2)).slice(0, 3).sort((a, b) => a - b);
          const lettres = ["A", "B", "C"];
          const i = randomInt(0, 2);
          const x = depart + pas * ks[i];
          return court(
            `${intro} Quel nombre est au point ${lettres[i]} ?`,
            x,
            ex(x),
            droite({
              min: depart,
              max,
              step: pas,
              valeursEcrites: ecrites,
              points: ks.map((k, j) => ({ value: depart + pas * k, label: lettres[j], color: ["#ef4444", "#2563eb", "#16a34a"][j] })),
            }),
          );
        },
      ]);
    },
  },

  /* =========================================================
     CE1_ORDINAL_JUSQU_CENT — premier, deuxième, troisième…
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_connaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_jusqu_cent",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une course, celui qui arrive juste après le premier est le…",
    format: "qcm",
    choices: ["deuxième", "troisième", "dernier", "premier aussi"],
    expected: ["deuxième"],
    comparator: "mcq_exact",
    hint: "Compte dans l'ordre d'arrivée.",
    explanation: exp(
      "Les nombres ordinaux disent une place, pas une quantité : premier, deuxième, troisième…",
      "On compte les places dans l'ordre d'arrivée.",
      "Le premier arrive en tête, celui qui le suit occupe la deuxième place.",
      "C'est le deuxième.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_connaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_jusqu_cent",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rang se dit avec un mot qui finit par « ième », sauf le premier.",
    tags: ["ce1", "nombre_entier", "ordinaux", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le numéro → le rang en mots.
        () => {
          const k = randomInt(2, 12);
          const ctx = randomChoice([
            { avant: `Dans la file du toboggan, l'enfant numéro ${k} est`, art: "le", f: false },
            { avant: `Dans le train de Ravi, le wagon numéro ${k} est`, art: "le", f: false },
            { avant: `À la course de vélo, Nina arrive en position ${k}. Elle est`, art: "la", f: true },
            { avant: `Dans l'escalier du château, la marche numéro ${k} est`, art: "la", f: true },
            { avant: `Sur l'étagère de la bibliothèque, le livre numéro ${k} est`, art: "le", f: false },
            { avant: `Dans la course des escargots, l'escargot numéro ${k} est`, art: "le", f: false },
            { avant: `Dans le défilé du cirque, le clown numéro ${k} est`, art: "le", f: false },
            { avant: `Au jardin, la rangée de fleurs numéro ${k} est`, art: "la", f: true },
          ]);
          const autres = [k - 1, k + 1, k + 2, k === 2 ? 12 : 1].map((x) => `${ctx.art} ${ordinal(x, ctx.f)}`);
          return qcm(
            `${ctx.avant} …`,
            `${ctx.art} ${ordinal(k, ctx.f)}`,
            autres,
            exp(
              "Un nombre ordinal dit la place occupée dans une file ou une liste.",
              "On compte les places une à une depuis le début.",
              `Le numéro ${k} occupe la ${ordinal(k, true)} place.`,
              `C'est ${ctx.art} ${ordinal(k, ctx.f)}.`,
            ),
          );
        },
        // L'écriture « 21e » → les lettres.
        () => {
          const k = randomChoice([randomInt(13, 30), randomInt(31, 69), randomInt(70, 99), 100]);
          const inv = (k % 10) * 10 + Math.floor(k / 10);
          const autres = [ordinal(k + 1), ordinal(k - 1), inv !== k && inv > 1 && inv <= 100 ? ordinal(inv) : ordinal(k + 10), enLettres(k)];
          return qcm(
            randomChoice([`Comment écrit-on « ${k}e » en lettres ?`, `Le « ${k}e » se lit…`, `${quelquun().nom} est à la place n° ${k}. Comment dire son rang ?`]),
            ordinal(k),
            autres,
            exp(
              "Pour dire un rang, on ajoute « ième » au nombre.",
              "On lit le nombre, puis on ajoute « ième » (cinq → cinquième, neuf → neuvième).",
              `${k} se lit « ${enLettres(k)} », donc le ${k}e se lit « ${ordinal(k)} ».`,
              `C'est « ${ordinal(k)} ».`,
            ),
          );
        },
        // Juste après / juste avant.
        () => {
          const k = randomInt(2, 30);
          const apres = Math.random() < 0.6;
          const rep = apres ? k + 1 : k - 1;
          const p = quelquun();
          return qcm(
            randomChoice([
              `Dans une course, qui arrive juste ${apres ? "après" : "avant"} le ${ordinal(k)} ?`,
              `${p.nom} est ${p.il === "elle" ? "la" : "le"} ${ordinal(k, p.il === "elle")} de la file. Celui qui est juste ${apres ? "derrière" : "devant"} est le…`,
            ]),
            `le ${ordinal(rep)}`,
            [`le ${ordinal(k)}`, `le ${ordinal(apres ? k + 2 : k + 1)}`, `le ${ordinal(apres ? k - 1 : k - 2 < 1 ? k + 2 : k - 2)}`],
            exp(
              "Les rangs se suivent comme les nombres.",
              apres ? "Juste après : on ajoute 1 au rang." : "Juste avant : on enlève 1 au rang.",
              `${k} ${apres ? "+" : "-"} 1 = ${rep}.`,
              `C'est le ${ordinal(rep)}.`,
            ),
          );
        },
        // La file dessinée : quelle place pour l'objet entouré ?
        () => {
          const n = randomInt(5, 7);
          const k = randomInt(2, n);
          const { objs, canvas } = fileObjets(n, k - 1);
          return qcm(
            `${randomChoice(["En partant de la gauche, quelle", "Depuis la gauche, quelle"])} est la place ${duDeLa(objs[k - 1])} entouré${objs[k - 1].f ? "e" : ""} ?`,
            ordinal(k, true),
            [ordinal(k - 1 || 3, true), ordinal(k + 1, true), ordinal(k === 2 ? 4 : 2, true)].filter((s) => s !== ordinal(k, true)),
            exp(
              "Le rang dit la place, en comptant depuis le début de la file.",
              "On compte les objets depuis la gauche, en comptant aussi l'objet entouré.",
              `En partant de la gauche, ${leLa(objs[k - 1])} est à la place ${k}.`,
              `C'est la ${ordinal(k, true)}.`,
            ),
            canvas,
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ORDINAL_RANG_PRECEDENTS — LE piège des ordinaux
     Le programme donne l'exemple : « Il y a six personnes qui
     font la queue. Je suis la troisième. Combien y a-t-il de
     personnes devant moi ? » Le cinquième a QUATRE personnes
     devant lui, pas cinq.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_precedents_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 3,
    theme: "neutral",
    text: "Six personnes font la queue. Je suis la troisième. Combien de personnes devant moi ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les personnes devant toi, sans te compter toi-même.",
    explanation: exp(
      "Le rang dit la place qu'on occupe, en se comptant soi-même.",
      "Pour savoir combien de personnes précèdent, on enlève 1 au rang.",
      "Être troisième, c'est avoir deux personnes devant soi : la première et la deuxième. 3 - 1 = 2.",
      "Il y a 2 personnes devant moi.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_ordinal_precedents_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une file, Malia a quatre enfants devant elle. Quelle est sa place ?",
    format: "qcm",
    choices: ["cinquième", "quatrième", "troisième", "sixième"],
    expected: ["cinquième"],
    comparator: "mcq_exact",
    hint: "N'oublie pas de te compter toi-même.",
    explanation: exp(
      "Le rang compte les personnes qui précèdent, plus soi-même.",
      "On ajoute 1 au nombre de personnes devant.",
      "Quatre enfants devant Malia, et Malia juste après : 4 + 1 = 5. Elle est cinquième.",
      "Malia est cinquième.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_precedents_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rang te compte, toi aussi.",
    tags: ["ce1", "nombre_entier", "ordinaux", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Combien devant ?
        () => {
          const p = quelquun();
          const f = randomChoice(FILES);
          const rang = randomInt(2, 12);
          const total = rang + randomInt(1, 5);
          return court(
            `${total} ${f.qui} font la queue ${f.lieu}. ${p.nom} est ${leLaP(p)} ${ordinal(rang, p.il === "elle")}. Combien devant ${luiElle(p)} ?`,
            rang - 1,
            exp(
              "Le rang dit la place qu'on occupe, en se comptant soi-même.",
              "Pour savoir combien sont devant, on enlève 1 au rang.",
              `Être ${ordinal(rang, p.il === "elle")}, c'est avoir ${rang - 1} ${f.qui} devant soi : ${rang} - 1 = ${rang - 1}.`,
              `Il y en a ${rang - 1} devant ${luiElle(p)}.`,
            ),
          );
        },
        // La file dessinée : combien d'objets avant l'objet entouré ?
        () => {
          const n = randomInt(5, 7);
          const k = randomInt(3, n);
          const { objs, canvas } = fileObjets(n, k - 1);
          const o = objs[k - 1];
          return court(
            `${maj(leLa(o))} entouré${o.f ? "e" : ""} est ${o.f ? "la" : "le"} ${ordinal(k, o.f)} depuis la gauche. Combien d'objets avant ${o.f ? "elle" : "lui"} ?`,
            k - 1,
            exp(
              "Le rang compte aussi l'objet lui-même.",
              "On enlève 1 au rang pour savoir combien d'objets sont avant.",
              `${k} - 1 = ${k - 1}.`,
              `Il y a ${k - 1} objets avant.`,
            ),
            canvas,
          );
        },
        // Combien derrière ?
        () => {
          const p = quelquun();
          const f = randomChoice(FILES);
          const rang = randomInt(2, 9);
          const total = rang + randomInt(2, 6);
          return court(
            `${total} ${f.qui} font la queue ${f.lieu}. ${p.nom} est ${leLaP(p)} ${ordinal(rang, p.il === "elle")}. Combien derrière ${luiElle(p)} ?`,
            total - rang,
            exp(
              "Le rang compte les personnes devant, plus soi-même.",
              "Derrière, il y a toutes les autres : on enlève le rang au total.",
              `${rang - 1} devant, ${p.nom}, puis les autres : ${total} - ${rang} = ${total - rang}.`,
              `Il y en a ${total - rang} derrière ${luiElle(p)}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_ordinal_precedents_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 4,
    theme: "neutral",
    hint: "N'oublie pas de te compter toi-même.",
    tags: ["ce1", "nombre_entier", "ordinaux", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // La file dessinée : combien d'objets APRÈS l'objet entouré ?
        () => {
          const n = 7;
          const k = randomInt(2, 6);
          const { objs, canvas } = fileObjets(n, k - 1);
          const o = objs[k - 1];
          return court(
            `${maj(leLa(o))} entouré${o.f ? "e" : ""} est ${o.f ? "la" : "le"} ${ordinal(k, o.f)} depuis la gauche. Combien d'objets après ${o.f ? "elle" : "lui"} ?`,
            n - k,
            exp(
              "Le rang compte les objets d'avant, plus l'objet lui-même.",
              "Après lui, il y a tous les autres : le total moins le rang.",
              `${n} objets. ${n} - ${k} = ${n - k}.`,
              `Il y a ${n - k} ${pl(n - k, "objet", "objets")} après.`,
            ),
            canvas,
          );
        },
        // Devant → le rang.
        () => {
          const p = quelquun();
          const f = randomChoice(FILES);
          const devant = randomInt(2, 11);
          const r = devant + 1;
          const fem = p.il === "elle";
          return qcm(
            `${maj(f.lieu)}, ${p.nom} a ${devant} ${f.qui} devant ${luiElle(p)}. Quelle est sa place ?`,
            ordinal(r, fem),
            [ordinal(devant, fem), ordinal(r + 1, fem), ordinal(devant - 1, fem)],
            exp(
              "Le rang compte les personnes devant, plus soi-même.",
              "On ajoute 1 au nombre de personnes devant.",
              `${devant} + 1 = ${r}.`,
              `${p.nom} est ${ordinal(r, fem)}.`,
            ),
          );
        },
        // Derrière et total → le rang.
        () => {
          const p = quelquun();
          const f = randomChoice(FILES);
          const total = randomInt(6, 12);
          const derriere = randomInt(1, total - 2);
          const r = total - derriere;
          const fem = p.il === "elle";
          return qcm(
            `${total} ${f.qui} font la queue ${f.lieu}. ${derriere} ${pl(derriere, "est", "sont")} derrière ${p.nom}. Quelle est sa place ?`,
            ordinal(r, fem),
            [ordinal(r + 1, fem), ordinal(r - 1, fem), ordinal(derriere + 1, fem) === ordinal(r, fem) ? ordinal(r + 2, fem) : ordinal(derriere + 1, fem)],
            exp(
              "Le rang compte depuis le début de la file.",
              "Le total moins ceux de derrière donne le rang.",
              `${total} - ${derriere} = ${r}.`,
              `${p.nom} est ${ordinal(r, fem)}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ORDINAL_RANG_FILE — repérer un rang dans une file
  ========================================================= */
  {
    kind: "template",
    id: "ce1_ordinal_file_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_file",
    difficulty: 3,
    theme: "neutral",
    hint: "La place et la valeur ne sont pas la même chose.",
    tags: ["ce1", "nombre_entier", "ordinaux", "file", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Le kième nombre d'une liste.
        () => {
          const p = quelquun();
          const depart = randomInt(2, 9);
          const pas = randomInt(2, 6);
          const liste = shuffle([0, 1, 2, 3, 4, 5].map((i) => depart + i * pas));
          const k = randomInt(2, 6);
          const intro = randomChoice([
            "Voici des nombres :",
            `${p.nom} a noté :`,
            "Les dossards :",
            "Les wagons du train :",
            "Pic a picoré :",
          ]);
          return court(
            `${intro} ${liste.join(", ")}. Quel est le ${ordinal(k)} nombre ?`,
            liste[k - 1],
            exp(
              "Le rang d'un nombre dit sa place dans la liste, pas sa valeur.",
              "On compte les nombres depuis le début, en pointant chacun du doigt.",
              `1er : ${liste[0]}, 2e : ${liste[1]}, … ${k}e : ${liste[k - 1]}.`,
              `C'est ${liste[k - 1]}.`,
            ),
            suite({ terms: liste, display: { showArrows: false, showRule: false, showLabels: false } }),
          );
        },
        // La file dessinée : quel est le kième objet ?
        () => {
          const n = randomInt(5, 7);
          const k = randomInt(2, n);
          const { objs, canvas } = fileObjets(n);
          const depuisDroite = Math.random() < 0.3;
          const idx = depuisDroite ? n - k : k - 1;
          return qcm(
            `En partant de la ${depuisDroite ? "DROITE" : "gauche"}, quel est le ${ordinal(k)} objet ?`,
            leLa(objs[idx]),
            objs.filter((_, i) => i !== idx).map(leLa),
            exp(
              "Le rang dit la place, en comptant depuis le bout choisi.",
              `On compte les objets en partant de la ${depuisDroite ? "droite" : "gauche"}.`,
              `1, 2, … ${k} : on tombe sur ${leLa(objs[idx])}.`,
              `C'est ${leLa(objs[idx])}.`,
            ),
            canvas,
          );
        },
        // À quelle place est ce nombre ?
        () => {
          const liste = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map((x) => x * 10 + randomInt(1, 9));
          const k = randomInt(2, 6);
          return qcm(
            `${randomChoice(["Voici des numéros de maisons :", "Voici les scores du jeu :", "Voici des numéros de tickets :"])} ${liste.join(", ")}. À quelle place est ${liste[k - 1]} ?`,
            `à la ${ordinal(k, true)} place`,
            [ordinal(k - 1 || 3, true), ordinal(k + 1, true), ordinal(k === 2 ? 4 : 2, true)].filter((x) => x !== ordinal(k, true)).map((x) => `à la ${x} place`),
            exp(
              "Le rang d'un nombre dit sa place dans la liste.",
              "On compte depuis le début jusqu'au nombre cherché.",
              `${liste.slice(0, k).join(", ")} : ${liste[k - 1]} est le ${k}e.`,
              `Il est à la ${ordinal(k, true)} place.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ORDINAL_UTILISER — se servir des ordinaux
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_utiliser_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 2,
    theme: "neutral",
    text: "Le jeton est sous la sixième tasse depuis la gauche. Combien de tasses soulever avant elle ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On soulève les tasses avant la bonne.",
    explanation: exp(
      "Le rang dit la place, en comptant depuis le point de départ choisi.",
      "On compte les tasses qui précèdent celle du jeton.",
      "Le jeton est sous la sixième : il y a cinq tasses avant elle. 6 - 1 = 5.",
      "Il faut soulever 5 tasses.",
    ),
    canvas: objets(Array.from({ length: 7 }, (_, i) => ({ quoi: "tasse" as const, ...(i === 5 ? { marque: true } : {}) }))),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_utiliser_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte dans l'ordre, depuis le début.",
    tags: ["ce1", "nombre_entier", "ordinaux", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Les jours et les mois.
        () => {
          const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
          const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
          const deMois = Math.random() < 0.5;
          const liste = deMois ? mois : jours;
          const k = randomInt(2, liste.length);
          const rep = liste[k - 1];
          return qcm(
            deMois
              ? `Quel est le ${ordinal(k)} mois de l'année ?`
              : `La semaine commence le lundi. Quel est le ${ordinal(k)} jour ?`,
            rep,
            [liste[k - 2], liste[k % liste.length], liste[(k + 1) % liste.length]],
            exp(
              "Les jours de la semaine et les mois de l'année ont un rang.",
              "On les récite dans l'ordre en comptant.",
              `${liste.slice(0, k).join(", ")} : le ${k}e est ${rep}.`,
              `C'est ${rep}.`,
            ),
          );
        },
        // Sous quelle tasse ? Combien avant ?
        () => {
          const p = quelquun();
          const n = 7;
          const k = randomInt(3, n);
          const canvas = objets(Array.from({ length: n }, (_, i) => ({ quoi: "tasse" as const, ...(i === k - 1 ? { marque: true } : {}) })));
          return court(
            `Sous la tasse entourée : ${randomChoice([`la bille ${de(p.nom)}`, "la graine de Pic", "une pièce", "un bonbon", "une perle", "l'or du pirate"])}. ${randomChoice(["Depuis la gauche, combien de tasses avant elle ?", "Combien de tasses avant elle, depuis la gauche ?"])}`,
            k - 1,
            exp(
              "Le rang compte aussi la tasse elle-même.",
              "On compte les tasses avant celle qui est entourée.",
              `La tasse entourée est la ${k}e : ${k} - 1 = ${k - 1} tasses avant.`,
              `Il faut en soulever ${k - 1}.`,
            ),
            canvas,
          );
        },
        // Un rang dans la vie : combien avant ?
        () => {
          const p = quelquun();
          const k = randomInt(3, 12);
          const ctx = randomChoice([
            { t: `${p.nom} habite au ${ordinal(k)} étage. Combien d'étages sous le sien, sans le rez-de-chaussée ?` },
            { t: `Pic se pose sur le ${ordinal(k)} arbre du chemin. Combien d'arbres a-t-il dépassés ?` },
            { t: `${p.nom} lit la ${ordinal(k, true)} page. Combien de pages a-t-${p.il} déjà lues ?` },
            { t: `Le trésor est dans le ${ordinal(k)} coffre. Combien de coffres ouvrir avant ?` },
            { t: `${p.nom} monte dans le ${ordinal(k)} wagon. Combien de wagons devant ?` },
          ]);
          return court(
            ctx.t,
            k - 1,
            exp(
              "Le rang compte aussi l'élément lui-même.",
              "Ce qui est avant, c'est le rang moins 1.",
              `${k} - 1 = ${k - 1}.`,
              `Il y en a ${k - 1}.`,
            ),
          );
        },
      ]),
  },
  {
    kind: "fixed",
    id: "ce1_ordinal_utiliser_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 4,
    theme: "reunion",
    text: "À la Diagonale, 167 coureurs partent. Combien arrivent avant le quarante-huitième ?",
    format: "short",
    expected: ["47"],
    comparator: "number_equal",
    hint: "Le nombre de coureurs partis ne sert à rien ici.",
    explanation: exp(
      "Le rang d'arrivée compte le coureur lui-même.",
      "Pour savoir combien sont arrivés avant, on enlève 1 au rang.",
      "48 - 1 = 47. Les 167 partants ne changent rien : la question porte sur ce qui se passe avant la quarante-huitième place.",
      "47 coureurs sont arrivés avant lui.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "reunion", "piege"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_utiliser_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte depuis l'autre bout : le premier devient le dernier.",
    tags: ["ce1", "nombre_entier", "ordinaux", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // La file dessinée : le rang en partant de la DROITE.
        () => {
          const n = 7;
          const k = randomInt(2, 6);
          const { objs, canvas } = fileObjets(n, k - 1);
          const o = objs[k - 1];
          const rd = n - k + 1;
          return qcm(
            `${maj(leLa(o))} entouré${o.f ? "e" : ""} est ${o.f ? "la" : "le"} ${ordinal(k, o.f)} depuis la gauche. Sa place depuis la DROITE ?`,
            `${o.f ? "la" : "le"} ${ordinal(rd, o.f)}`,
            [rd - 1, rd + 1, k].filter((x) => x >= 1 && x !== rd).map((x) => `${o.f ? "la" : "le"} ${ordinal(x, o.f)}`),
            exp(
              "Un même objet a deux rangs : depuis la gauche, et depuis la droite.",
              "On compte les objets à sa droite, puis on ajoute l'objet lui-même.",
              `À sa droite : ${n} - ${k} = ${n - k}. Depuis la droite : ${n - k} + 1 = ${rd}.`,
              `${maj(o.f ? "elle" : "il")} est ${o.f ? "la" : "le"} ${ordinal(rd, o.f)}.`,
            ),
            canvas,
          );
        },
        // En partant de la fin.
        () => {
          const p = quelquun();
          const f = randomChoice(FILES);
          const total = randomInt(5, 12);
          const rg = randomInt(2, total - 1);
          const rd = total - rg + 1;
          const fem = p.il === "elle";
          return qcm(
            `${total} ${f.qui} font la queue. ${p.nom} est ${leLaP(p)} ${ordinal(rg, fem)} depuis le début. Et depuis la FIN ?`,
            `${leLaP(p)} ${ordinal(rd, fem)}`,
            [rd - 1, rd + 1, rg, total - rg].filter((x) => x >= 1 && x !== rd).map((x) => `${leLaP(p)} ${ordinal(x, fem)}`),
            exp(
              "Un même enfant a deux rangs : un depuis le début, un autre depuis la fin.",
              "On compte ceux qui sont derrière, puis on ajoute l'enfant lui-même.",
              `Derrière ${p.nom} : ${total} - ${rg} = ${total - rg}. Depuis la fin : ${total - rg} + 1 = ${rd}.`,
              `${maj(p.il)} est ${leLaP(p)} ${ordinal(rd, fem)} en partant de la fin.`,
            ),
          );
        },
        // Combien entre deux rangs ?
        () => {
          const [p, q] = deuxEnfants();
          const f = randomChoice(FILES);
          const [a, b] = deuxDifferents(1, 15).sort((x, y) => x - y);
          const bb = b - a < 2 ? b + 2 : b;
          return court(
            `${maj(f.lieu)}, ${p.nom} est ${leLaP(p)} ${ordinal(a, p.il === "elle")} et ${q.nom} ${leLaP(q)} ${ordinal(bb, q.il === "elle")}. Combien ${de(f.qui)} entre eux ?`,
            bb - a - 1,
            exp(
              "Entre deux rangs, on ne compte ni l'un ni l'autre.",
              "On enlève les deux rangs, puis encore 1.",
              `Les places ${a + 1} à ${bb - 1} : ${bb} - ${a} - 1 = ${bb - a - 1}.`,
              `Il y en a ${bb - a - 1}.`,
            ),
          );
        },
        // Un grand rang dans une course.
        () => {
          const p = quelquun();
          const k = randomInt(21, 99);
          const partis = k + randomInt(10, 80);
          return court(
            randomChoice([
              `Au cross, ${partis} enfants courent. ${p.nom} arrive ${ordinal(k, p.il === "elle")}. Combien arrivent avant ${luiElle(p)} ?`,
              `Course de vélo : ${p.nom} est ${ordinal(k, p.il === "elle")} sur ${partis}. Combien de cyclistes devant ${luiElle(p)} ?`,
              `Course de ${partis} canards : celui ${de(p.nom)} est ${ordinal(k)}. Combien arrivent avant ?`,
            ]),
            k - 1,
            exp(
              "Le rang compte aussi celui qui arrive.",
              "Ceux qui sont avant : le rang moins 1. Le nombre de partants ne sert pas.",
              `${k} - 1 = ${k - 1}.`,
              `${k - 1} sont arrivés avant.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ORDINAL_SUITE_SYMBOLES — les suites répétitives
     Le programme le demande mot pour mot : « Dans la suite
     répétitive ABABAB…, quelle est la dix-neuvième lettre ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_symboles_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_suite_symboles",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la suite ABABAB…, quelle est la dixième lettre ?",
    format: "qcm",
    choices: ["B", "A", "C", "il n'y en a pas"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Les lettres de rang pair sont toujours les mêmes.",
    explanation: exp(
      "Dans une suite qui se répète, le rang suffit à savoir quel symbole tombe.",
      "On regarde le motif : ici il fait deux lettres, A puis B.",
      "Les rangs impairs (1, 3, 5…) donnent A, les rangs pairs (2, 4, 6…) donnent B. Dix est pair, donc c'est B.",
      "La dixième lettre est B.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "suite", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_symboles_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_suite_symboles",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la longueur du motif qui se répète.",
    tags: ["ce1", "nombre_entier", "ordinaux", "suite", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Un motif d'objets dessinés.
        () => {
          const p = quelquun();
          const pris = shuffle(OBJETS_FILE).slice(0, 3);
          const forme = randomChoice([[0, 1], [0, 1, 2], [0, 0, 1], [0, 1, 1]]);
          const motif = forme.map((i) => pris[i]);
          const differents = [...new Set(forme)].map((i) => pris[i]);
          const montre = motif.length === 2 ? 6 : 6;
          const rang = randomInt(9, 20);
          const bon = motif[(rang - 1) % motif.length];
          const intro = randomChoice([
            `${p.nom} range ses jouets en suivant un motif.`,
            "Sur la frise de la classe, les dessins se répètent.",
            `${p.nom} colle des images en suivant un motif.`,
            "Pic aligne des objets qui se répètent.",
            `La maîtresse dessine une frise qui se répète.`,
          ]);
          return qcm(
            `${intro} Quel sera le dessin numéro ${rang} ?`,
            leLa(bon),
            [...differents.filter((o) => o.nom !== bon.nom).map(leLa), leLa(pris.find((o) => !differents.includes(o)) ?? shuffle(OBJETS_FILE).find((o) => !differents.includes(o))!)],
            exp(
              "Dans une suite qui se répète, le motif revient toujours identique.",
              "On compte la longueur du motif, puis on avance de motif en motif jusqu'au rang cherché.",
              `Le motif fait ${motif.length} dessins : ${motif.map((o) => o.nom).join(", ")}. Au rang ${rang}, on tombe sur ${leLa(bon)}.`,
              `C'est ${leLa(bon)}.`,
            ),
            objets(Array.from({ length: montre }, (_, i) => ({ quoi: motif[i % motif.length].quoi }))),
          );
        },
        // Un motif de lettres ou de symboles.
        () => {
          const motif = randomChoice([["A", "B"], ["A", "B", "C"], ["▲", "●"], ["▲", "▲", "●"], ["X", "O", "O"], ["★", "♥", "●"]]);
          const rang = randomInt(7, 20);
          const bonne = motif[(rang - 1) % motif.length];
          const autres = [...new Set(motif)].filter((s) => s !== bonne);
          const debut = Array.from({ length: 8 }, (_, i) => motif[i % motif.length]).join(" ");
          const p = quelquun();
          return qcm(
            randomChoice([
              `Suite : ${debut} … Quel est le symbole numéro ${rang} ?`,
              `${p.nom} écrit ${debut} … Quel sera le ${ordinal(rang)} symbole ?`,
            ]),
            bonne,
            [...autres, "on ne peut pas savoir"],
            exp(
              "Dans une suite qui se répète, le motif revient toujours identique.",
              "On compte la longueur du motif, puis on avance de motif en motif jusqu'au rang cherché.",
              `Le motif fait ${motif.length} symboles : ${motif.join(" ")}. Au rang ${rang}, on tombe sur ${bonne}.`,
              `C'est ${bonne}.`,
            ),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_ENTIER_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avec 4, 7 et 2, quel est le plus GRAND nombre à trois chiffres ?",
    canvas: { kind: "personnage", personnage: "zoe", pose: "montre", expression: "pense", bulle: { texte: "4   7   2" }, mode: "couleur" },
    format: "short",
    expected: ["742"],
    comparator: "number_equal",
    hint: "Où faut-il mettre le plus grand chiffre pour qu'il compte le plus ?",
    explanation: exp(
      "Un chiffre compte d'autant plus qu'il est placé à gauche.",
      "On range les chiffres du plus grand au plus petit, en partant des centaines.",
      "Le plus grand chiffre, 7, va aux centaines. Puis 4 aux dizaines, puis 2 aux unités : 742.",
      "Le plus grand nombre est 742.",
    ),
    tags: ["ce1", "nombre_entier", "defi"],
  },
  {
    kind: "template",
    id: "ce1_entier_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le chiffre placé aux centaines pèse le plus lourd.",
    tags: ["ce1", "nombre_entier", "defi", "template"],
    generate: () => {
      const avecZero = Math.random() < 0.35;
      const chiffres = avecZero ? [0, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2)] : shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      const affiches = shuffle(chiffres);
      const tries = [...chiffres].sort((a, b) => a - b);
      const plusGrand = Math.random() < 0.5;
      let bonne: number;
      if (plusGrand) bonne = Number([...tries].reverse().join(""));
      else if (avecZero) bonne = Number(`${tries[1]}0${tries[2]}`);
      else bonne = Number(tries.join(""));
      const qui = randomChoice(PARLEURS);
      const liste = `${affiches[0]}, ${affiches[1]} et ${affiches[2]}`;
      const intro = randomChoice([
        `${qui.nom} a les cartes ${liste}.`,
        `Le cadenas ${de(qui.nom)} : ${liste}.`,
        `${qui.nom} a tiré ${liste}.`,
      ]);
      const question = `Fais le plus ${plusGrand ? "GRAND" : "PETIT"} nombre à trois chiffres.`;
      return court(
        `${intro} ${question}`,
        bonne,
        exp(
          "Un chiffre compte d'autant plus qu'il est placé à gauche. Un nombre à trois chiffres ne commence pas par 0.",
          `On met le chiffre le plus ${plusGrand ? "grand" : "petit"} aux centaines${avecZero && !plusGrand ? " (sauf 0)" : ""}, puis on continue.`,
          `Avec ${affiches.join(", ")} : ${bonne}.`,
          `C'est ${bonne}.`,
        ),
        parle(qui.id, affiches.join("   ")),
      );
    },
  },
  {
    kind: "template",
    id: "ce1_entier_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis chaque indice et place le bon chiffre au bon rang.",
    tags: ["ce1", "nombre_entier", "defi", "piege", "template", "canvas"],
    generate: () =>
      tirerDessin([
        // Échanger deux chiffres.
        () => {
          const d = randomInt(2, 9);
          let u = randomInt(1, 9);
          if (u === d) u = d === 9 ? 1 : d + 1;
          const a = d * 10 + u;
          const b = u * 10 + d;
          const p = quelquun();
          return court(
            randomChoice([
              `On échange les chiffres de ${a} : ${b}. Quel est l'écart entre les deux ?`,
              `${p.nom} a écrit ${a} au lieu de ${b}. De combien s'est-${p.il} trompé${p.e} ?`,
              `Pic lit ${b} au lieu de ${a}. Quel est l'écart ?`,
            ]),
            Math.abs(a - b),
            exp(
              "Échanger deux chiffres change le nombre : chaque chiffre change de valeur en changeant de place.",
              "On calcule la différence entre le plus grand et le plus petit.",
              `${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}.`,
              `L'écart est ${Math.abs(a - b)}.`,
            ),
          );
        },
        // Devinette : « Qui suis-je ? »
        () => {
          const c = randomInt(1, 9);
          const d = randomInt(0, 9);
          const u = randomInt(0, 9);
          const n = c * 100 + d * 10 + u;
          const indices = [
            `${c} ${pl(c, "centaine", "centaines")}`,
            d === 0 ? "0 dizaine" : d === c ? "autant de dizaines que de centaines" : `${d} ${pl(d, "dizaine", "dizaines")}`,
            u === 0 ? "0 unité" : u === d && d !== 0 && d !== c ? "autant d'unités que de dizaines" : `${u} ${pl(u, "unité", "unités")}`,
          ];
          const qui = randomChoice(PARLEURS);
          const melange = shuffle(indices);
          return court(
            `${randomChoice(["Nombre secret", "Mon nombre secret", "Le nombre du dragon"])} : ${melange[0]}, ${melange[1]} et ${melange[2]}. Quel est-il ?`,
            n,
            exp(
              "Chaque indice donne le chiffre d'un rang.",
              "On remplit les centaines, les dizaines, les unités. Un rang vide prend un 0.",
              `${c} centaines, ${d} dizaines, ${u} unités : ${n}.`,
              `C'est ${n}.`,
            ),
            parle(qui.id, "Devine mon nombre !", "pensee"),
          );
        },
        // Il manque une sorte de matériel : le nombre qu'on vise.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 4), randomInt(1, 9), randomInt(1, 9)];
          const a = c * 100 + d * 10 + u;
          const ajout = randomChoice([{ t: "une plaque de cent", v: 100 }, { t: "une barre de dix", v: 10 }, { t: "deux barres de dix", v: 20 }, { t: "trois cubes", v: 3 }]);
          return court(
            `${introCubes(p)} On ajoute ${ajout.t}. ${randomChoice(["Combien de cubes maintenant ?", "Quel nombre obtient-on ?"])}`,
            a + ajout.v,
            exp(
              "Ajouter une plaque, c'est ajouter 100 ; une barre, 10 ; un cube, 1.",
              "On lit le nombre du dessin, puis on ajoute.",
              `${a} + ${ajout.v} = ${a + ajout.v}.`,
              `Cela fait ${a + ajout.v} cubes.`,
            ),
            baseDix(c, d, u),
          );
        },
      ]),
  },
];

