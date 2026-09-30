// lib/tutor-v4/questionBank/4e/maths/divisibilite.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `divisibilite`. Avec sa sœur
// `nombre_premier`, elle ferme les DIX puces du chapitre « Comprendre et
// utiliser les notions de divisibilité et de nombres premiers » — le plus gros
// bloc restant du programme de 4e.
//
// ⭐ QUATRE MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 5e À L'IDENTIQUE :
// `div_multiple_diviseur`, `div_critere_2_5_10`, `div_critere_3_9`,
// `div_lister_diviseurs`. C'est le motif qui a marché huit fois — trouver la
// notion sœur, reprendre ses identifiants pour la continuité verticale, puis
// ajouter ce que le BO place ici : la DIVISION EUCLIDIENNE et les PROBLÈMES.
//
// ⚠️ LE CRITÈRE PAR 4 N'EST PAS AU PROGRAMME. Le BO énonce 2, 3, 5, 9 dans les
// connaissances (4e-A-divisibilite-2) et 2, 3, 5, 9, 10 dans les compétences
// (4e-A-divisibilite-8). Il n'apparaît donc nulle part ici, même comme leurre
// « qui aurait pu servir » : un leurre enseigne autant qu'une bonne réponse.
//
// ⭐ LE CANVAS `calcul_pose` PORTE LA DIVISION EUCLIDIENNE avec son champ
// `division` — dividende, diviseur. ⚠️ 30/09 : le canvas s'affiche AVEC
// l'énoncé ; la potence montrait le quotient et le reste, c'est-à-dire la
// réponse. Elle ne montre plus que le dividende et le diviseur. Même
// correction pour les tableaux (critère par 3 et 9, diviseurs par paires) :
// ils posent le travail, ils ne le font plus.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : la condition sur le reste (0 ⩽ r < diviseur), et le fait que
// 1 et le nombre lui-même sont toujours des diviseurs.
//
// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». 2 à 4 squelettes
// d'énoncé par micro, 16 à 18 répétitions sur une série de 20. Chaque gabarit
// compose désormais une SITUATION DE PARTAGE (table PARTAGES : bouquets,
// équipes, boîtes, rangées de dalles, sachets, poules, cagettes…) × une
// TOURNURE, ou, pour les critères, une FORME de question différente (tester,
// choisir, compléter, pourquoi). Mesure :
//   npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e divisibilite
// La Réunion reste UN contexte parmi dix-sept (la vanille), pas le décor.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Tous les diviseurs d'un entier, dans l'ordre croissant. */
function diviseurs(n: number): number[] {
  const d: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      d.push(i);
      if (i !== n / i) d.push(n / i);
    }
  }
  return d.sort((a, b) => a - b);
}

const sommeChiffres = (x: number | string) =>
  String(x).split("").reduce((s, c) => s + Number(c), 0);

/**
 * La potence de la division euclidienne. ⚠️ Le canvas est affiché AVEC
 * l'énoncé : on ne pose que le dividende et le diviseur, jamais le résultat.
 */
function potence(a: number, b: number) {
  return {
    kind: "calcul_pose" as const,
    operation: "division" as const,
    numbers: [String(a), String(b)],
    division: {
      dividende: String(a),
      diviseur: String(b),
    },
    display: { showResult: false },
    size: { width: 240 },
  };
}

/** Choisit l'une des deux familles au prorata de leurs tournures : le tirage reste uniforme. */
const tireContexte = (nbContexte: number, nbPur: number) =>
  Math.random() < nbContexte / (nbContexte + nbPur);

/* ---------------------------------------------------------------------------
   Petite grammaire
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const min1 = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
/** « de » devant un nom sans article, avec élision : « de roses », « d'œufs ». */
const deNu = (n: string) => (/^[aeiouyéèêhœ]/i.test(n) ? "d'" + n : "de " + n);
/** « 1, 2, 3 et 4 » */
const listeEt = (xs: readonly (string | number)[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
/** « 1, 2, 3 ou 4 » */
const listeOu = (xs: readonly (string | number)[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ou ${xs[xs.length - 1]}`;

/* ---------------------------------------------------------------------------
   ⭐ LA TABLE DES PARTAGES. Chaque ligne : qui partage, quoi, comment (le
   verbe porte sa préposition : « assembler en bouquets », « ranger dans des
   boîtes »), le groupe au pluriel et au singulier, son genre (pour
   « complets / complètes », « lesquels / lesquelles »), et un ordre de
   grandeur plausible (`max`) — un entraîneur n'a pas 4 000 joueurs.
--------------------------------------------------------------------------- */
type Partage = {
  qui: string;
  pr: "il" | "elle";
  objets: string;
  mise: string;
  groupes: string;
  sing: string;
  fem: boolean;
  max: number;
};

const PARTAGES: readonly Partage[] = [
  { qui: "Une fleuriste", pr: "elle", objets: "roses", mise: "assembler en bouquets", groupes: "bouquets", sing: "bouquet", fem: false, max: 1000 },
  { qui: "Un entraîneur", pr: "il", objets: "joueurs", mise: "répartir en équipes", groupes: "équipes", sing: "équipe", fem: true, max: 150 },
  { qui: "Un pâtissier", pr: "il", objets: "macarons", mise: "ranger dans des boîtes", groupes: "boîtes", sing: "boîte", fem: true, max: 1000 },
  { qui: "Une bibliothécaire", pr: "elle", objets: "livres", mise: "ranger sur des étagères", groupes: "étagères", sing: "étagère", fem: true, max: 3000 },
  { qui: "Un jardinier", pr: "il", objets: "plants de tomates", mise: "planter en rangées", groupes: "rangées", sing: "rangée", fem: true, max: 1000 },
  { qui: "Un carreleur", pr: "il", objets: "dalles", mise: "poser en rangées", groupes: "rangées", sing: "rangée", fem: true, max: 2000 },
  { qui: "Une enseignante", pr: "elle", objets: "élèves", mise: "répartir en groupes", groupes: "groupes", sing: "groupe", fem: false, max: 400 },
  { qui: "Un confiseur", pr: "il", objets: "bonbons", mise: "mettre en sachets", groupes: "sachets", sing: "sachet", fem: false, max: 5000 },
  { qui: "Une organisatrice de tournoi", pr: "elle", objets: "participants", mise: "répartir en poules", groupes: "poules", sing: "poule", fem: true, max: 300 },
  { qui: "Un apiculteur", pr: "il", objets: "pots de miel", mise: "emballer dans des cartons", groupes: "cartons", sing: "carton", fem: false, max: 1500 },
  { qui: "Une cheffe de chœur", pr: "elle", objets: "choristes", mise: "placer en rangs", groupes: "rangs", sing: "rang", fem: false, max: 150 },
  { qui: "Une maraîchère", pr: "elle", objets: "œufs", mise: "ranger dans des boîtes", groupes: "boîtes", sing: "boîte", fem: true, max: 3000 },
  { qui: "Un moniteur de colonie", pr: "il", objets: "enfants", mise: "loger dans des chambres", groupes: "chambres", sing: "chambre", fem: true, max: 200 },
  { qui: "Une libraire", pr: "elle", objets: "cartes postales", mise: "présenter en paquets", groupes: "paquets", sing: "paquet", fem: false, max: 2000 },
  { qui: "Un producteur de vanille de La Réunion", pr: "il", objets: "gousses de vanille", mise: "lier en bottes", groupes: "bottes", sing: "botte", fem: true, max: 5000 },
  { qui: "Un organisateur de course", pr: "il", objets: "coureurs", mise: "faire partir par vagues", groupes: "vagues", sing: "vague", fem: true, max: 5000 },
  { qui: "Une cuisinière de cantine", pr: "elle", objets: "yaourts", mise: "disposer sur des plateaux", groupes: "plateaux", sing: "plateau", fem: false, max: 1000 },
];

const partagePour = (n: number) => randomChoice(PARTAGES.filter((p) => p.max >= n));
const complets = (p: Partage) => (p.fem ? "complètes" : "complets");
const faits = (p: Partage) => (p.fem ? "faites" : "faits");
const lesquels = (p: Partage) => (p.fem ? "lesquelles" : "lesquels");

export const divisibiliteBank: TutorBankItemV4[] = [
  /* =========================================================================
     DIV_MULTIPLE_DIVISEUR — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_multiple_diviseur_tpl_1_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le multiple est le GRAND, le diviseur est le PETIT.",
    tags: ["divisibilite", "multiple", "qcm", "template"],
    generate: () => {
      const d = randomInt(3, 12);
      const k = randomInt(3, 12);
      const m = d * k;
      const question = randomChoice([
        "Quelle phrase est juste ?",
        "Laquelle de ces phrases est vraie ?",
        "Que peut-on en déduire ?",
        "Quelle affirmation est exacte ?",
      ]);
      const ctxs = PARTAGES.filter((p) => p.max >= m);
      const purs = [
        `On sait que ${d} × ${k} = ${m}.`,
        `La division de ${m} par ${d} tombe juste : ${m} ÷ ${d} = ${k}.`,
        `On compare les nombres ${m} et ${d}.`,
        `Dans la table de ${d}, on trouve ${m}.`,
      ];
      let intro: string;
      if (tireContexte(ctxs.length, purs.length)) {
        const P = randomChoice(ctxs);
        intro = `${P.qui} a ${m} ${P.objets}. ${cap(P.pr)} peut les ${P.mise} de ${d} : ${P.pr} obtient ${k} ${P.groupes}, sans qu'il en reste.`;
      } else {
        intro = randomChoice(purs);
      }
      const correct = `${m} est un multiple de ${d}`;
      // ⚠️ Un leurre « m est un multiple de x » doit être FAUX : 42 est bien un
      // multiple de 7 (= 6 + 1). On prend le premier x > d qui ne divise pas m.
      let x = d + 1;
      while (m % x === 0) x++;
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${d} est un multiple de ${m}`,
          `${m} est un diviseur de ${d}`,
          `${m} et ${d} n'ont aucun lien`,
          `${d} n'est pas un diviseur de ${m}`,
          `${m} est un multiple de ${x}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est MULTIPLE d'un autre lorsqu'il s'obtient en le multipliant par un entier. L'autre en est alors un DIVISEUR.\n\n" +
          "Méthode : on regarde lequel des deux est le plus grand — le multiple est toujours le plus grand.\n\n" +
          `Calcul : $${d} \\times ${k} = ${m}$, donc ${m} est un multiple de ${d}, et ${d} est un diviseur de ${m}.\n\n` +
          "Conclusion : ⭐ c'est une SEULE relation dite dans les deux sens, comme « parent » et « enfant ». Les deux mots ne s'échangent jamais.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_multiple_diviseur_tpl_2_tester",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise, et regarde si le reste vaut zéro.",
    tags: ["divisibilite", "multiple", "qcm", "template"],
    generate: () => {
      const d = randomInt(4, 13);
      const divisible = Math.random() < 0.5;
      const n = divisible ? d * randomInt(4, 15) : d * randomInt(4, 15) + randomInt(1, d - 1);
      const correct = divisible ? "oui" : "non";
      const ctxs = PARTAGES.filter((p) => p.max >= n);
      const purs = [
        `${n} est-il un multiple de ${d} ?`,
        `${d} est-il un diviseur de ${n} ?`,
        `La division de ${n} par ${d} tombe-t-elle juste ?`,
        `${n} est-il divisible par ${d} ?`,
      ];
      let text: string;
      if (tireContexte(ctxs.length * 4, purs.length)) {
        const P = randomChoice(ctxs);
        text = randomChoice([
          `${P.qui} a ${n} ${P.objets}. Peut-${P.pr} les ${P.mise} de ${d}, sans qu'il en reste ?`,
          `${P.qui} veut ${P.mise} de ${d} ses ${n} ${P.objets}, sans en laisser de côté. Est-ce possible ?`,
          `Avec ${n} ${P.objets}, ${min1(P.qui)} peut-${P.pr} faire des ${P.groupes} de ${d} ${complets(P)}, sans reste ?`,
          `${P.qui} compte ${n} ${P.objets} et prévoit des ${P.groupes} de ${d}. La répartition tombe-t-elle juste ?`,
        ]);
      } else {
        text = randomChoice(purs);
      }
      return {
        text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est multiple d'un autre lorsque la division tombe juste — autrement dit lorsque le RESTE vaut zéro. Faire des groupes de même taille sans reste, c'est exactement cela.\n\n" +
          "Méthode : on divise et on regarde le reste.\n\n" +
          `Calcul : $${n} \\div ${d}$ donne ${Math.floor(n / d)} et il reste ${n - d * Math.floor(n / d)}.\n\n` +
          (divisible
            ? `Conclusion : le reste vaut 0, donc ${n} est bien un multiple de ${d} : la réponse est oui.`
            : `Conclusion : ⚠️ le reste ne vaut pas 0, donc ${n} n'est PAS un multiple de ${d} : la réponse est non. « Presque divisible » n'existe pas.`),
      };
    },
  },

  /* =========================================================================
     DIV_CRITERE_2_5_10 — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_critere_2_5_10_tpl_1_lequel",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces trois critères ne regardent QUE le chiffre des unités.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    generate: () => {
      const purs = 6;
      const enContexte = tireContexte(PARTAGES.length * 3, purs);
      const P = randomChoice(PARTAGES);
      const n = enContexte ? randomInt(40, P.max) : randomInt(120, 9800);
      const par2 = n % 2 === 0;
      const par5 = n % 5 === 0;
      const par10 = n % 10 === 0;
      const L = enContexte
        ? {
            tous: `des ${P.groupes} de 2, de 5 et de 10`,
            c5: `des ${P.groupes} de 5 seulement`,
            c2: `des ${P.groupes} de 2 seulement`,
            aucun: "aucune de ces trois tailles",
            piege: `des ${P.groupes} de 2 et de 10 seulement`,
          }
        : {
            tous: "par 2, par 5 et par 10",
            c5: "par 5 seulement",
            c2: "par 2 seulement",
            aucun: "par aucun des trois",
            piege: "par 2 et par 10 seulement",
          };
      const correct = par10 ? L.tous : par5 ? L.c5 : par2 ? L.c2 : L.aucun;
      const text = enContexte
        ? randomChoice([
            `${P.qui} a ${n} ${P.objets}. ${cap(P.pr)} hésite entre des ${P.groupes} de 2, de 5 ou de 10. Avec ${lesquels(P)} la répartition tombe-t-elle juste ?`,
            `Avec ses ${n} ${P.objets}, ${min1(P.qui)} veut faire des ${P.groupes} de 2, de 5 ou de 10, sans reste. Quelles tailles conviennent ?`,
            `${n} ${P.objets} à ${P.mise} de 2, de 5 ou de 10 : dans quels cas n'y a-t-il aucun reste ?`,
          ])
        : randomChoice([
            `Le nombre ${n} est-il divisible par 2, par 5, par 10 ?`,
            `Par lesquels des nombres 2, 5 et 10 peut-on diviser ${n} sans reste ?`,
            `Sans poser de division, dis si ${n} est divisible par 2, par 5 et par 10.`,
            `${n} est-il pair ? Est-il un multiple de 5 ? de 10 ? Choisis la bonne réponse.`,
            `Parmi 2, 5 et 10, quels sont les diviseurs de ${n} ?`,
            `Regarde le chiffre des unités de ${n} : par quels nombres parmi 2, 5 et 10 est-il divisible ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [L.tous, L.c5, L.c2, L.aucun, L.piege]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les critères par 2, 5 et 10 ne regardent QUE le chiffre des unités — le reste du nombre ne compte pas.\n\n" +
          "Méthode : par 2 si le chiffre des unités est 0, 2, 4, 6 ou 8 ; par 5 s'il est 0 ou 5 ; par 10 s'il est 0.\n\n" +
          `Calcul : ${n} se termine par ${n % 10}, donc il est ${par2 ? "" : "non "}divisible par 2, ${par5 ? "" : "non "}divisible par 5, ${par10 ? "" : "non "}divisible par 10.\n\n` +
          `Conclusion : la réponse est « ${correct} ». ⭐ Un nombre divisible par 10 l'est forcément par 2 ET par 5 — c'est le seul cas où les trois tombent ensemble.`,
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET, qui oppose deux questions et
    // ne peut pas le faire avec un seul. Il travaille le critère À L'ENVERS :
    // au lieu de tester un nombre, on complète celui qui manque.
    kind: "template",
    id: "4e_div_critere_2_5_10_tpl_2_unite_manquante",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Seul le chiffre des unités compte pour ces trois critères.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    generate: () => {
      const par = randomChoice([2, 5, 10] as const);
      const correct =
        par === 10
          ? "0 seulement"
          : par === 5
            ? "0 ou 5"
            : "0, 2, 4, 6 ou 8";
      const purs = 5;
      const ctxs = PARTAGES.filter((p) => p.max >= 200);
      let text: string;
      if (tireContexte(ctxs.length * 4, purs)) {
        const P = randomChoice(ctxs);
        const base = randomInt(12, Math.floor(P.max / 10) - 1);
        text = randomChoice([
          `${P.qui} a ${base}? ${P.objets} : le chiffre des unités est effacé. ${cap(P.pr)} sait qu'${P.pr} peut les ${P.mise} de ${par} sans reste. Quels chiffres sont possibles ?`,
          `Il y a ${base}? ${P.objets} (le dernier chiffre est illisible), et on peut les ${P.mise} de ${par} sans qu'il en reste. Quel peut être ce dernier chiffre ?`,
          `${P.qui} note ${base}? ${P.objets} dans son carnet, mais une tache cache le chiffre des unités. La répartition en ${P.groupes} de ${par} tombe juste. Quels chiffres peuvent se cacher sous la tache ?`,
          `${P.qui} doit ${P.mise} de ${par} ses ${base}? ${P.objets}, sans reste. Par quels chiffres ce nombre peut-il se terminer ?`,
        ]);
      } else {
        const base = randomInt(24, 987);
        text = randomChoice([
          `Par quel chiffre le nombre ${base}? doit-il se terminer pour être divisible par ${par} ?`,
          `On cherche le chiffre des unités de ${base}? pour obtenir un multiple de ${par}. Quels chiffres conviennent ?`,
          `Le nombre ${base}? a perdu son chiffre des unités. Lesquels le rendent divisible par ${par} ?`,
          `Quels chiffres peut-on écrire à la place du ? dans ${base}? pour que ce nombre soit divisible par ${par} ?`,
          `Complète ${base}? pour qu'il soit un multiple de ${par} : quels chiffres des unités sont possibles ?`,
        ]);
      }
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          "0 seulement",
          "0 ou 5",
          "0, 2, 4, 6 ou 8",
          "n'importe quel chiffre pair sauf 0",
          "il faut regarder la somme des chiffres",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les critères par 2, 5 et 10 ne regardent QUE le chiffre des unités.\n\n" +
          "Méthode : on se demande quels chiffres conviennent, sans jamais regarder le reste du nombre.\n\n" +
          `Calcul : pour ${par}, les chiffres possibles sont ${correct}.\n\n` +
          `Conclusion : ⚠️ « il faut regarder la somme des chiffres » est le piège : c'est vrai pour 3 et 9, jamais pour 2, 5 et 10. Chaque critère a sa méthode, et les confondre fait rater les deux.`,
      };
    },
  },

  /* =========================================================================
     DIV_CRITERE_3_9 — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_critere_3_9_tpl_1_somme",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne les chiffres, et on regarde la somme.",
    tags: ["divisibilite", "critere", "qcm", "template", "canvas"],
    generate: () => {
      const purs = 6;
      const enContexte = tireContexte(PARTAGES.length * 3, purs);
      const P = randomChoice(PARTAGES);
      const [lo, hi] = enContexte ? [40, P.max] : [120, 9800];
      // Un tiers de multiples de 9, un tiers de multiples de 3, un tiers au hasard.
      const t = Math.random();
      const f = t < 0.33 ? 9 : t < 0.66 ? 3 : 1;
      const n = f * randomInt(Math.ceil(lo / f), Math.floor(hi / f));
      const somme = sommeChiffres(n);
      const par3 = somme % 3 === 0;
      const par9 = somme % 9 === 0;
      const L = enContexte
        ? {
            deux: `des ${P.groupes} de 3 et de 9`,
            c3: `des ${P.groupes} de 3 seulement`,
            aucun: "aucune de ces deux tailles",
            c9: `des ${P.groupes} de 9 seulement`,
          }
        : {
            deux: "par 3 et par 9",
            c3: "par 3 seulement",
            aucun: "ni par 3 ni par 9",
            c9: "par 9 seulement",
          };
      const correct = par9 ? L.deux : par3 ? L.c3 : L.aucun;
      const text = enContexte
        ? randomChoice([
            `${P.qui} a ${n} ${P.objets}. ${cap(P.pr)} hésite entre des ${P.groupes} de 3 ou de 9. Avec ${lesquels(P)} la répartition tombe-t-elle juste ?`,
            `Avec ses ${n} ${P.objets}, ${min1(P.qui)} veut faire des ${P.groupes} de 3 ou de 9, sans reste. Quelles tailles conviennent ?`,
            `${n} ${P.objets} à ${P.mise} de 3 ou de 9 : dans quels cas n'y a-t-il aucun reste ?`,
          ])
        : randomChoice([
            `Le nombre ${n} est-il divisible par 3, par 9 ?`,
            `Sans poser de division, dis si ${n} est divisible par 3 et par 9.`,
            `Parmi 3 et 9, lesquels sont des diviseurs de ${n} ?`,
            `${n} est-il un multiple de 3 ? de 9 ? Choisis la bonne réponse.`,
            `Additionne les chiffres de ${n} : par quels nombres parmi 3 et 9 est-il divisible ?`,
            `La division de ${n} par 3 tombe-t-elle juste ? Et celle par 9 ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [L.deux, L.c3, L.aucun, L.c9]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est divisible par 3 si la SOMME DE SES CHIFFRES l'est, et par 9 si cette même somme est divisible par 9.\n\n" +
          "Méthode : on additionne tous les chiffres, puis on teste la somme — plus petite, donc plus facile.\n\n" +
          `Calcul : ${String(n).split("").join(" + ")} = ${somme}. Or ${somme} ${par3 ? "est" : "n'est pas"} divisible par 3, et ${par9 ? "est" : "n'est pas"} divisible par 9.\n\n` +
          `Conclusion : la réponse est « ${correct} ». ⚠️ « 9 seulement » est IMPOSSIBLE : si la somme est divisible par 9, elle l'est aussi par 3. Tout multiple de 9 est un multiple de 3.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["le nombre", "somme des chiffres", "divisible par"],
          rows: [{ values: [String(n), "?", "?"] }],
          highlight: { col: 1 },
          caption: "la somme décide",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il fait CHOISIR parmi
    // plusieurs nombres au lieu d'en tester un — c'est le geste de l'exercice
    // « entoure ceux qui sont divisibles par 3 ». Par 9, les leurres sont en
    // partie des multiples de 3 : c'est le piège du chapitre.
    kind: "template",
    id: "4e_div_critere_3_9_tpl_2_lequel",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les chiffres de chacun, et compare les sommes au diviseur.",
    tags: ["divisibilite", "critere", "choisir", "qcm", "template"],
    generate: () => {
      const p = randomChoice([3, 9] as const);
      const purs = 6;
      const enContexte = tireContexte(PARTAGES.length * 4, purs);
      const P = randomChoice(PARTAGES);
      const hi = enContexte ? Math.min(990, P.max) : 990;
      const lo = enContexte ? 30 : 120;
      const bon = p * randomInt(Math.ceil(lo / p), Math.floor(hi / p));
      const faux: number[] = [];
      // Par 9 : deux leurres multiples de 3 (mais pas de 9), s'il y en a.
      if (p === 9) {
        let essais = 0;
        while (faux.length < 2 && essais++ < 50) {
          const c = 3 * randomInt(Math.ceil(lo / 3), Math.floor(hi / 3));
          if (c % 9 !== 0 && c !== bon && !faux.includes(c)) faux.push(c);
        }
      }
      while (faux.length < 4) {
        const c = randomInt(lo, hi);
        if (c % p !== 0 && !faux.includes(c)) faux.push(c);
      }
      const correct = String(bon);
      const text = enContexte
        ? randomChoice([
            `${P.qui} doit choisir un lot ${deNu(P.objets)} parmi ceux proposés. Lequel peut-${P.pr} ${P.mise} de ${p} sans qu'il en reste ?`,
            `Parmi ces nombres ${deNu(P.objets)}, lequel permet de les ${P.mise} de ${p}, sans reste ?`,
            // « tous ses cartes postales » : le genre de l'objet n'est pas connu ici, on évite l'accord.
            `${P.qui} veut ${P.mise} de ${p} ses ${P.objets}, sans en laisser. Combien peut-${P.pr} en avoir ?`,
            `Pour pouvoir ${P.mise} de ${p} sans reste, combien ${deNu(P.objets)} ${min1(P.qui)} doit-${P.pr} avoir ? Un seul nombre convient.`,
          ])
        : randomChoice([
            `Lequel de ces nombres est divisible par ${p} ?`,
            `Un seul de ces nombres est un multiple de ${p}. Lequel ?`,
            `Sans poser de division, trouve le nombre divisible par ${p}.`,
            `Lequel de ces nombres admet ${p} comme diviseur ?`,
            `Entoure le seul multiple de ${p} parmi ces nombres.`,
            `Quel nombre de la liste peut-on diviser par ${p} sans reste ?`,
          ]);
      const choices = makeChoices(correct, faux.map(String));
      const autres = choices.filter((c) => c !== correct).map(Number);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un nombre est divisible par ${p} lorsque la somme de ses chiffres l'est.\n\n` +
          "Méthode : on additionne les chiffres de chaque candidat — c'est bien plus rapide que de poser quatre divisions.\n\n" +
          `Calcul : ${bon} donne ${String(bon).split("").join(" + ")} = ${sommeChiffres(bon)}, qui est un multiple de ${p}. Les autres donnent ${autres.map((f) => `${f} → ${sommeChiffres(f)}`).join(", ")} : aucune de ces sommes n'est un multiple de ${p}.\n\n` +
          (p === 9
            ? "Conclusion : ⚠️ une somme divisible par 3 ne suffit pas pour 9 : il faut que la somme elle-même soit un multiple de 9."
            : "Conclusion : ⭐ le critère transforme un test de divisibilité sur un grand nombre en un test sur un tout petit. C'est exactement ce à quoi il sert."),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : l'implication « multiple de 9 ⇒ multiple de 3 »,
    // et son inverse qui est FAUX. C'est la connaissance du chapitre, et elle
    // ne se génère pas — elle se retient.
    kind: "fixed",
    id: "4e_div_critere_3_9_fixed_implication",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un nombre est divisible par 3. Peut-on en conclure qu'il est divisible par 9 ?",
    format: "qcm",
    choices: [
      "non : 6 est divisible par 3 mais pas par 9",
      "oui, toujours",
      "oui, si le nombre est pair",
      "on ne peut jamais savoir",
    ],
    expected: ["non : 6 est divisible par 3 mais pas par 9"],
    comparator: "mcq_exact",
    hint: "Cherche un contre-exemple parmi les petits multiples de 3.",
    explanation:
      "Définition : 9 est un multiple de 3, donc tout multiple de 9 est un multiple de 3. Mais la réciproque est fausse.\n\n" +
      "Méthode : pour réfuter une affirmation, un seul contre-exemple suffit.\n\n" +
      "Calcul : 6 est divisible par 3, car $6 = 3 \\times 2$. Mais $6 \\div 9$ ne tombe pas juste.\n\n" +
      "Conclusion : ⭐ l'implication ne marche que dans UN sens — de 9 vers 3, jamais de 3 vers 9. C'est la même logique que « tout carré est un rectangle, mais pas l'inverse ».",
    tags: ["divisibilite", "critere", "valeur_particuliere", "logique", "qcm"],
  },

  /* =========================================================================
     DIV_EUCLIDIENNE — ce que la 4e ajoute
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_euclidienne_tpl_1_quotient_reste",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 3,
    theme: "neutral",
    hint: "Le quotient est le nombre de parts entières, le reste est ce qui ne se partage pas.",
    tags: ["divisibilite", "euclidienne", "template", "canvas"],
    generate: () => {
      const purs = 5;
      const enContexte = tireContexte(PARTAGES.length * 5, purs);
      const P = randomChoice(PARTAGES);
      const b = randomInt(4, 15);
      const qMax = enContexte ? Math.max(5, Math.min(30, Math.floor((P.max - b) / b))) : 30;
      const q = randomInt(5, qMax);
      const r = randomInt(1, b - 1);
      const a = b * q + r;
      // [énoncé, ce qu'on demande]
      const [text, demande] = enContexte
        ? randomChoice<[string, "q" | "r"]>([
            [`${P.qui} a ${a} ${P.objets} et veut les ${P.mise} de ${b}. Combien ${deNu(P.objets)} restera-t-il ?`, "r"],
            [`${P.qui} veut ${P.mise} de ${b} ses ${a} ${P.objets}. Une fois les ${P.groupes} ${complets(P)} ${faits(P)}, combien ${deNu(P.objets)} restent de côté ?`, "r"],
            [`${a} ${P.objets} à ${P.mise} de ${b} : combien en restera-t-il une fois les ${P.groupes} ${complets(P)} ${faits(P)} ?`, "r"],
            [`${P.qui} a ${a} ${P.objets}. Combien ${deNu(P.groupes)} ${complets(P)} de ${b} peut-${P.pr} faire ?`, "q"],
            [`Avec ${a} ${P.objets}, ${min1(P.qui)} veut les ${P.mise} de ${b}. Combien ${deNu(P.groupes)} ${complets(P)} obtiendra-t-${P.pr} ?`, "q"],
          ])
        : randomChoice<[string, "q" | "r"]>([
            [`Dans la division euclidienne de ${a} par ${b}, combien vaut le reste ?`, "r"],
            [`Quel est le reste de la division euclidienne de ${a} par ${b} ?`, "r"],
            [`Effectue la division euclidienne de ${a} par ${b} et donne le reste.`, "r"],
            [`Donne le quotient de la division euclidienne de ${a} par ${b}.`, "q"],
            [`On divise ${a} par ${b}. Quel est le quotient entier ?`, "q"],
          ]);
      const reponse = demande === "q" ? q : r;
      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation:
          "Définition : la division euclidienne de a par b donne un quotient q et un reste r tels que $a = b \\times q + r$, avec $0 \\leqslant r < b$.\n\n" +
          "Méthode : on cherche le plus grand multiple de b qui ne dépasse pas a ; le nombre de fois est le quotient, ce qui manque pour atteindre a est le reste.\n\n" +
          `Calcul : $${b} \\times ${q} = ${b * q}$, et $${a} - ${b * q} = ${r}$. Donc $${a} = ${b} \\times ${q} + ${r}$.\n\n` +
          (demande === "q"
            ? `Conclusion : le quotient vaut ${q}${enContexte ? ` : ${q} ${P.groupes} ${complets(P)}, et il en reste ${r}` : ""}. ⚠️ On ne compte que les parts ENTIÈRES : le reste ${r} ne fait pas une part de plus.`
            : `Conclusion : le reste vaut ${r}. ⚠️ Il est TOUJOURS plus petit que le diviseur : s'il atteignait ${b}, on pourrait faire une part de plus.`),
        canvas: potence(a, b),
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_euclidienne_tpl_2_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 4,
    theme: "neutral",
    hint: "Dividende = diviseur × quotient + reste.",
    tags: ["divisibilite", "euclidienne", "qcm", "template"],
    generate: () => {
      const purs = 5;
      const enContexte = tireContexte(PARTAGES.length * 4, purs);
      const P = randomChoice(PARTAGES);
      const b = randomInt(5, 14);
      const qMax = enContexte ? Math.max(6, Math.min(25, Math.floor((P.max - b) / b))) : 25;
      const q = randomInt(6, qMax);
      const r = randomInt(1, b - 1);
      const a = b * q + r;
      const correct = `${a} = ${b} × ${q} + ${r}`;
      const text = enContexte
        ? randomChoice([
            `${P.qui} a ${a} ${P.objets}. ${cap(P.pr)} fait ${q} ${P.groupes} de ${b} et il en reste ${r}. Quelle égalité traduit la situation ?`,
            `En voulant ${P.mise} de ${b} ses ${a} ${P.objets}, ${min1(P.qui)} obtient ${q} ${P.groupes} ${complets(P)}, et il en reste ${r}. Quelle égalité l'écrit ?`,
            `${a} ${P.objets}, ${P.groupes} de ${b} : on obtient ${q} ${P.groupes} ${complets(P)} et un reste de ${r}. Quelle égalité correspond ?`,
            `${P.qui} vérifie son partage : ${a} ${P.objets} en tout, ${q} ${P.groupes} de ${b}, et un reste de ${r}. Quelle égalité doit-${P.pr} écrire ?`,
          ])
        : randomChoice([
            `On divise ${a} par ${b} : le quotient vaut ${q} et le reste ${r}. Quelle égalité traduit cette division ?`,
            `La division euclidienne de ${a} par ${b} donne ${q}, reste ${r}. Quelle égalité est juste ?`,
            `Quelle égalité correspond à la division euclidienne de ${a} par ${b}, de quotient ${q} et de reste ${r} ?`,
            `Dans la division de ${a} par ${b}, on trouve un quotient de ${q} et un reste de ${r}. Comment l'écrire en une égalité ?`,
            `Quotient ${q}, reste ${r}, diviseur ${b}, dividende ${a} : choisis l'égalité de la division euclidienne.`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} = ${b} × ${q} - ${r}`,
          `${a} = ${q} × ${r} + ${b}`,
          `${b} = ${a} × ${q} + ${r}`,
          `${a} = ${b} + ${q} + ${r}`,
          `${a} = ${b} × ${r} + ${q}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : toute division euclidienne s'écrit $a = b \\times q + r$, où a est le dividende, b le diviseur, q le quotient et r le reste.\n\n" +
          "Méthode : on repère chaque rôle avant d'écrire — le dividende est SEUL d'un côté.\n\n" +
          `Calcul : $${b} \\times ${q} = ${b * q}$, puis $${b * q} + ${r} = ${a}$. L'égalité est vérifiée.\n\n` +
          `Conclusion : ⭐ cette égalité est le CONTRÔLE de la division : si elle ne tombe pas juste, c'est que le quotient ou le reste est faux.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : la condition sur le reste. C'est ce qui rend le
    // couple (quotient, reste) UNIQUE, et c'est la moitié de la définition.
    kind: "fixed",
    id: "4e_div_euclidienne_fixed_condition_reste",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : « 47 divisé par 6 donne un quotient de 6 et un reste de 11 », car 6 × 6 + 11 = 47. Qu'en penses-tu ?",
    format: "qcm",
    choices: [
      "faux : le reste doit être plus petit que 6",
      "juste, puisque l'égalité tombe",
      "faux : l'égalité ne tombe pas",
      "faux : le quotient doit être plus grand que le diviseur",
    ],
    expected: ["faux : le reste doit être plus petit que 6"],
    comparator: "mcq_exact",
    hint: "L'égalité ne suffit pas : il y a une seconde condition.",
    explanation:
      "Définition : la division euclidienne demande DEUX choses — l'égalité $a = b \\times q + r$, ET la condition $0 \\leqslant r < b$.\n\n" +
      "Méthode : on vérifie toujours les deux, jamais une seule.\n\n" +
      "Calcul : ici l'égalité tombe bien, $6 \\times 6 + 11 = 47$. Mais $11 > 6$ : le reste dépasse le diviseur. La bonne réponse est $47 = 6 \\times 7 + 5$.\n\n" +
      "Conclusion : ⭐ c'est cette seconde condition qui rend le quotient et le reste UNIQUES. Sans elle, on pourrait écrire une infinité d'égalités justes.",
    tags: ["divisibilite", "euclidienne", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     DIV_LISTER_DIVISEURS — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_lister_diviseurs_tpl_1_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche par PAIRES : chaque diviseur en appelle un autre.",
    tags: ["divisibilite", "diviseurs", "template", "canvas"],
    generate: () => {
      const n = randomChoice([18, 24, 28, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72] as const);
      const d = diviseurs(n);
      const purs = 5;
      let text: string;
      let P: Partage | null = null;
      if (tireContexte(PARTAGES.length * 3, purs)) {
        P = randomChoice(PARTAGES);
        text = randomChoice([
          `${P.qui} a ${n} ${P.objets} et veut les ${P.mise} de même taille, sans reste. Combien de tailles ${deNu(P.groupes)} sont possibles, de 1 à ${n} ${P.objets} par ${P.sing} ?`,
          `Pour ${P.mise} ses ${n} ${P.objets} sans reste, ${min1(P.qui)} peut mettre 1, 2… jusqu'à ${n} ${P.objets} par ${P.sing}, mais pas n'importe quel nombre. Combien de nombres conviennent ?`,
          `${P.qui} a ${n} ${P.objets}. Combien de nombres entre 1 et ${n} peut-${P.pr} choisir comme nombre ${deNu(P.objets)} par ${P.sing}, pour les ${P.mise} sans reste ?`,
        ]);
      } else {
        text = randomChoice([
          `Combien ${n} a-t-il de diviseurs en tout ?`,
          `Combien de diviseurs le nombre ${n} possède-t-il ?`,
          `Liste les diviseurs de ${n}. Combien en trouves-tu ?`,
          `Quel est le nombre de diviseurs de ${n} ?`,
          `Cherche les diviseurs de ${n} par paires. Combien y en a-t-il ?`,
        ]);
      }
      return {
        text,
        format: "short",
        expected: [String(d.length)],
        comparator: "number_equal",
        explanation:
          "Définition : un diviseur d'un nombre est un entier par lequel la division tombe juste." +
          (P ? ` Chaque taille ${deNu(P.sing)} possible est un diviseur de ${n}.` : "") +
          "\n\n" +
          "Méthode : on cherche par PAIRES, en partant de 1. Chaque diviseur trouvé en donne un second — celui qui le complète.\n\n" +
          `Calcul : ${d
            .slice(0, Math.ceil(d.length / 2))
            .map((x) => `${x} × ${n / x}`)
            .join(", ")}. On s'arrête quand les deux se croisent.\n\n` +
          `Conclusion : les diviseurs de ${n} sont ${d.join(", ")}, soit ${d.length} en tout. ⭐ Chercher par paires garantit de n'en oublier aucun.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["paire", "produit"],
          rows: [
            { values: [`1 et ${n}`, String(n)] },
            { values: ["… et …", String(n)] },
            { values: ["… et …", String(n)] },
          ],
          caption: `les diviseurs de ${n}, par paires : à toi de continuer`,
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il travaille l'INTRUS, qui
    // est le geste inverse du précédent : au lieu de construire la liste, on
    // repère celui qui n'y est pas.
    kind: "template",
    id: "4e_div_lister_diviseurs_tpl_2_intrus",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste chaque candidat : la division tombe-t-elle juste ?",
    tags: ["divisibilite", "diviseurs", "intrus", "qcm", "template"],
    generate: () => {
      const n = randomChoice([24, 30, 36, 40, 48, 54, 60, 72, 84, 90] as const);
      const d = diviseurs(n).filter((x) => x !== 1 && x !== n);
      const vrais = shuffle([...d]).slice(0, 3);
      // Un intrus qui n'est PAS un diviseur, et pas déjà dans la liste.
      let intrus = 0;
      while (!intrus || n % intrus === 0 || vrais.includes(intrus)) {
        intrus = randomInt(2, Math.max(9, Math.floor(n / 2)));
      }
      const liste = shuffle([...vrais, intrus]);
      const L = listeOu(liste);
      const purs = 5;
      let text: string;
      if (tireContexte(PARTAGES.length * 3, purs)) {
        const P = randomChoice(PARTAGES);
        text = randomChoice([
          `${P.qui} a ${n} ${P.objets}. ${cap(P.pr)} envisage des ${P.groupes} de ${L}. Laquelle de ces tailles laisserait un reste ?`,
          `Pour ${P.mise} ${n} ${P.objets} sans reste, lequel de ces nombres ne convient PAS comme nombre ${deNu(P.objets)} par ${P.sing} : ${L} ?`,
          `${P.qui} teste des ${P.groupes} de ${L} pour ses ${n} ${P.objets}. Avec lequel de ces nombres la répartition ne tombe-t-elle pas juste ?`,
        ]);
      } else {
        text = randomChoice([
          `Dans la liste ${L}, lequel n'est PAS un diviseur de ${n} ?`,
          `Parmi ${L}, trouve le nombre qui ne divise pas ${n}.`,
          `Un seul de ces nombres n'est pas un diviseur de ${n} : ${L}. Lequel ?`,
          `Cherche l'intrus : lequel de ces nombres ne divise pas ${n} ? ${L}.`,
          `${n} est divisible par tous ces nombres sauf un : ${L}. Lequel ?`,
        ]);
      }
      return {
        text,
        format: "qcm",
        choices: shuffle([...vrais, intrus]).map(String),
        expected: [String(intrus)],
        comparator: "mcq_exact",
        explanation:
          "Définition : un diviseur d'un nombre est un entier par lequel la division tombe juste, sans reste.\n\n" +
          "Méthode : on teste chaque candidat. Un reste non nul suffit à l'éliminer.\n\n" +
          `Calcul : ${vrais.map((v) => `${n} ÷ ${v} = ${n / v}`).join(", ")} — trois divisions justes. Mais ${n} ÷ ${intrus} donne ${Math.floor(n / intrus)} et il reste ${n - intrus * Math.floor(n / intrus)}.\n\n` +
          `Conclusion : l'intrus est ${intrus}. ⭐ Les diviseurs de ${n} sont ${diviseurs(n).join(", ")} — et les repérer par paires évite d'en oublier.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 1 et le nombre lui-même sont TOUJOURS des
    // diviseurs. C'est ce qui empêche de croire qu'un nombre peut n'en avoir
    // aucun, et c'est la clé de la définition d'un nombre premier.
    kind: "fixed",
    id: "4e_div_lister_diviseurs_fixed_toujours",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 3,
    theme: "neutral",
    text: "Quels diviseurs tout nombre entier plus grand que 1 possède-t-il forcément ?",
    format: "qcm",
    choices: [
      "1 et lui-même",
      "1 et 2",
      "seulement lui-même",
      "aucun en particulier",
    ],
    expected: ["1 et lui-même"],
    comparator: "mcq_exact",
    hint: "Que donne la division d'un nombre par 1 ? Et par lui-même ?",
    explanation:
      "Définition : un diviseur est un entier par lequel la division tombe juste.\n\n" +
      "Méthode : on teste les deux cas extrêmes.\n\n" +
      "Calcul : $n \\div 1 = n$, sans reste. Et $n \\div n = 1$, sans reste. Les deux tombent toujours juste.\n\n" +
      "Conclusion : ⭐ tout nombre a donc AU MOINS deux diviseurs. Ceux qui n'en ont QUE ces deux-là portent un nom : ce sont les nombres premiers.",
    tags: ["divisibilite", "diviseurs", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     DIV_PROBLEME — ce que la 4e ajoute : engrenages, conjonction
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_probleme_tpl_1_paquets",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Un paquet complet, c'est un diviseur commun aux deux quantités.",
    tags: ["divisibilite", "probleme", "template"],
    generate: () => {
      // ⭐ Deux sortes d'objets, un contenant. `grp` au pluriel, `fem` pour les accords.
      const cas = randomChoice([
        { qui: "Une fleuriste", pr: "elle", A: "roses", B: "tulipes", grp: "bouquets", sing: "bouquet" },
        { qui: "Un professeur", pr: "il", A: "crayons", B: "gommes", grp: "lots", sing: "lot" },
        { qui: "Un pâtissier", pr: "il", A: "macarons", B: "chouquettes", grp: "boîtes", sing: "boîte" },
        { qui: "Une entraîneuse", pr: "elle", A: "garçons", B: "filles", grp: "équipes mixtes", sing: "équipe" },
        { qui: "Une association", pr: "elle", A: "boîtes de conserve", B: "paquets de pâtes", grp: "colis", sing: "colis" },
        { qui: "Un jardinier", pr: "il", A: "plants de salade", B: "plants de tomates", grp: "parcelles", sing: "parcelle" },
        { qui: "Une bibliothécaire", pr: "elle", A: "romans", B: "bandes dessinées", grp: "cartons", sing: "carton" },
        { qui: "Un confiseur", pr: "il", A: "caramels", B: "sucettes", grp: "sachets", sing: "sachet" },
        { qui: "Une directrice de colonie", pr: "elle", A: "garçons", B: "filles", grp: "groupes", sing: "groupe" },
        { qui: "Un décorateur", pr: "il", A: "ballons rouges", B: "ballons blancs", grp: "grappes", sing: "grappe" },
        { qui: "Une productrice de fruits de La Réunion", pr: "elle", A: "ananas", B: "mangues", grp: "cagettes", sing: "cagette" },
        { qui: "Une libraire", pr: "elle", A: "cartes postales", B: "marque-pages", grp: "pochettes", sing: "pochette" },
        { qui: "Un carreleur", pr: "il", A: "carreaux bleus", B: "carreaux blancs", grp: "lots", sing: "lot" },
        { qui: "Un apiculteur", pr: "il", A: "pots de miel", B: "bougies", grp: "paniers garnis", sing: "panier" },
        { qui: "Un cuisinier", pr: "il", A: "morceaux de poulet", B: "morceaux de poivron", grp: "brochettes", sing: "brochette" },
        { qui: "Une animatrice", pr: "elle", A: "feutres", B: "feuilles de dessin", grp: "kits de coloriage", sing: "kit" },
      ] as const);
      const d = randomChoice([6, 8, 9, 12, 15] as const);
      // Deux multiplicateurs distincts, sans diviseur commun : le plus grand
      // diviseur commun vaut alors exactement d, et chaque lot contient au
      // moins 3 objets de chaque sorte (pas de « 1 roses »).
      let ka = 0;
      let kb = 0;
      const pgcd = (x: number, y: number): number => (y ? pgcd(y, x % y) : x);
      while (ka === kb || pgcd(ka, kb) !== 1) {
        ka = randomInt(3, 8);
        kb = randomInt(3, 8);
      }
      const a = d * ka;
      const b = d * kb;
      const communs = diviseurs(a).filter((x) => b % x === 0);
      const max = communs[communs.length - 1];
      const text = randomChoice([
        `${cas.qui} a ${a} ${cas.A} et ${b} ${cas.B}. ${cap(cas.pr)} veut faire des ${cas.grp} identiques, en utilisant tout. Quel est le plus grand nombre ${deNu(cas.grp)} possible ?`,
        `Avec ${a} ${cas.A} et ${b} ${cas.B}, ${min1(cas.qui)} prépare des ${cas.grp} identiques, sans rien laisser. Combien ${deNu(cas.grp)} au maximum ?`,
        `${cas.qui} veut répartir ${a} ${cas.A} et ${b} ${cas.B} dans le plus grand nombre possible ${deNu(cas.grp)} identiques, sans reste. Combien peut-${cas.pr} en faire ?`,
        `Combien ${deNu(cas.grp)} identiques, au maximum, ${min1(cas.qui)} peut-${cas.pr} composer avec ${a} ${cas.A} et ${b} ${cas.B}, sans rien laisser ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(max)],
        comparator: "number_equal",
        explanation:
          "Définition : faire des lots identiques sans reste, c'est chercher un DIVISEUR COMMUN aux deux quantités.\n\n" +
          "Méthode : on liste les diviseurs de chaque nombre, on garde ceux qui figurent dans les deux listes, et on prend le plus grand.\n\n" +
          `Calcul : les diviseurs communs à ${a} et ${b} sont ${communs.join(", ")}. Le plus grand vaut ${max}.\n\n` +
          `Conclusion : on peut faire ${max} ${cas.grp} ; chaque ${cas.sing} contient ${a / max} ${cas.A} et ${b / max} ${cas.B}. ⚠️ « Le plus grand nombre ${deNu(cas.grp)} » n'est pas « le plus gros » : plus il y en a, plus chacun est petit.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_probleme_tpl_2_engrenages",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche un MULTIPLE commun, pas un diviseur : les deux événements doivent retomber ensemble.",
    tags: ["divisibilite", "probleme", "engrenages", "template"],
    generate: () => {
      // ⭐ Chaque situation dit son début (intro), puis la même rencontre sous
      // trois formes : interrogative (Q), subjonctive (S), déclarative (D).
      type Cas = {
        u: string;
        petit?: boolean;
        intro: (a: number, b: number) => string;
        Q: string;
        S: string;
        D: string;
      };
      const CAS: Cas[] = [
        { u: "minutes", intro: (a, b) => `Deux lignes de bus desservent le même arrêt : l'une toutes les ${a} minutes, l'autre toutes les ${b} minutes. Les deux bus viennent de s'y croiser.`, Q: "les deux bus s'y croiseront-ils à nouveau", S: "les deux bus s'y croisent à nouveau", D: "les deux bus s'y croiseront à nouveau" },
        { u: "secondes", intro: (a, b) => `Deux phares s'allument, l'un toutes les ${a} secondes, l'autre toutes les ${b} secondes. Ils viennent de s'allumer en même temps.`, Q: "s'allumeront-ils de nouveau ensemble", S: "ils s'allument de nouveau ensemble", D: "ils s'allumeront de nouveau ensemble" },
        { u: "minutes", intro: (a, b) => `Sur une piste, Nina boucle un tour en ${a} minutes et Sacha en ${b} minutes. Ils partent ensemble de la ligne de départ.`, Q: "repasseront-ils ensemble sur la ligne", S: "ils repassent ensemble sur la ligne", D: "ils repasseront ensemble sur la ligne" },
        { u: "minutes", intro: (a, b) => `Dans un jardin, un arroseur se déclenche toutes les ${a} minutes et un autre toutes les ${b} minutes. Ils viennent de démarrer ensemble.`, Q: "se déclencheront-ils de nouveau en même temps", S: "ils se déclenchent de nouveau en même temps", D: "ils se déclencheront de nouveau en même temps" },
        { u: "secondes", intro: (a, b) => `Une guirlande rouge clignote toutes les ${a} secondes et une guirlande bleue toutes les ${b} secondes. Elles viennent de clignoter ensemble.`, Q: "clignoteront-elles de nouveau ensemble", S: "elles clignotent de nouveau ensemble", D: "elles clignoteront de nouveau ensemble" },
        { u: "minutes", intro: (a, b) => `Deux navettes quittent le port, l'une toutes les ${a} minutes, l'autre toutes les ${b} minutes. Elles viennent de partir en même temps.`, Q: "partiront-elles de nouveau ensemble", S: "elles partent de nouveau ensemble", D: "elles partiront de nouveau ensemble" },
        { u: "heures", petit: true, intro: (a, b) => `Un patient prend un comprimé toutes les ${a} heures et un sirop toutes les ${b} heures. Il vient de prendre les deux en même temps.`, Q: "les prendra-t-il de nouveau ensemble", S: "il les prenne de nouveau ensemble", D: "il les prendra de nouveau ensemble" },
        { u: "minutes", intro: (a, b) => `Au vélodrome, un cycliste fait un tour en ${a} minutes et une cycliste en ${b} minutes. Ils s'élancent ensemble.`, Q: "se retrouveront-ils côte à côte sur la ligne", S: "ils se retrouvent côte à côte sur la ligne", D: "ils se retrouveront côte à côte sur la ligne" },
        { u: "minutes", intro: (a, b) => `À la gare, un train part vers le nord toutes les ${a} minutes et un autre vers le sud toutes les ${b} minutes. Deux trains viennent de partir ensemble.`, Q: "deux trains partiront-ils à nouveau ensemble", S: "deux trains partent à nouveau ensemble", D: "deux trains partiront à nouveau ensemble" },
        { u: "minutes", intro: (a, b) => `Dans un parc, une fontaine jaillit toutes les ${a} minutes et une autre toutes les ${b} minutes. Elles viennent de jaillir ensemble.`, Q: "jailliront-elles de nouveau ensemble", S: "elles jaillissent de nouveau ensemble", D: "elles jailliront de nouveau ensemble" },
        { u: "secondes", intro: (a, b) => `À un carrefour, un feu passe au vert toutes les ${a} secondes et un autre toutes les ${b} secondes. Ils viennent de passer au vert ensemble.`, Q: "passeront-ils de nouveau au vert ensemble", S: "ils passent de nouveau au vert ensemble", D: "ils passeront de nouveau au vert ensemble" },
        { u: "jours", petit: true, intro: (a, b) => `Un maraîcher arrose ses salades tous les ${a} jours et les désherbe tous les ${b} jours. Aujourd'hui, il a fait les deux.`, Q: "fera-t-il de nouveau les deux le même jour", S: "il fasse de nouveau les deux le même jour", D: "il fera de nouveau les deux le même jour" },
        { u: "minutes", intro: (a, b) => `À la fête foraine, la grande roue repart toutes les ${a} minutes et le carrousel toutes les ${b} minutes. Ils viennent de repartir ensemble.`, Q: "repartiront-ils de nouveau ensemble", S: "ils repartent de nouveau ensemble", D: "ils repartiront de nouveau ensemble" },
        { u: "secondes", intro: (a, b) => `Deux métronomes battent, l'un toutes les ${a} secondes, l'autre toutes les ${b} secondes. Ils viennent de battre ensemble.`, Q: "battront-ils de nouveau ensemble", S: "ils battent de nouveau ensemble", D: "ils battront de nouveau ensemble" },
        { u: "minutes", intro: (a, b) => `Deux téléphériques partent de la station, l'un toutes les ${a} minutes, l'autre toutes les ${b} minutes. Ils viennent de partir ensemble.`, Q: "partiront-ils de nouveau ensemble", S: "ils partent de nouveau ensemble", D: "ils partiront de nouveau ensemble" },
      ];
      const cas = randomChoice(CAS);
      const [a, b] = randomChoice(
        cas.petit
          ? ([[4, 6], [6, 8], [8, 12], [4, 10], [6, 10]] as const)
          : ([[4, 6], [6, 8], [6, 9], [8, 12], [9, 12], [10, 15], [12, 18], [6, 10], [4, 10], [12, 15], [8, 10], [15, 20], [12, 16], [10, 12]] as const),
      );
      // Le plus petit multiple commun, cherché sans PGCD — hors programme de 4e.
      let ppcm = Math.max(a, b);
      while (ppcm % a !== 0 || ppcm % b !== 0) ppcm += Math.max(a, b);
      const intro = cas.intro(a, b);
      const text = randomChoice([
        `${intro} Dans combien ${deNu(cas.u)}, au plus tôt, ${cas.Q} ?`,
        `${intro} Combien ${deNu(cas.u)} faut-il attendre pour ${/^(il|elle)/.test(cas.S) ? "qu'" : "que "}${cas.S} ?`,
        `${intro} Au bout de combien ${deNu(cas.u)} ${cas.Q} pour la première fois ?`,
        `${intro} Quel est le plus petit nombre ${deNu(cas.u)} après lequel ${cas.D} ?`,
      ]);
      const multiples = (x: number) =>
        Array.from({ length: ppcm / x }, (_, k) => x * (k + 1)).join(", ");
      return {
        text,
        format: "short",
        expected: [String(ppcm)],
        comparator: "number_equal",
        explanation:
          "Définition : deux phénomènes qui se répètent retombent ensemble sur un MULTIPLE COMMUN de leurs périodes.\n\n" +
          "Méthode : on écrit les multiples de chaque nombre et on cherche le premier qui figure dans les deux listes.\n\n" +
          `Calcul : multiples de ${a} : ${multiples(a)} ; multiples de ${b} : ${multiples(b)}. Le premier commun vaut ${ppcm}.\n\n` +
          `Conclusion : il faut attendre ${ppcm} ${cas.u}. ⚠️ Ne pas confondre avec les LOTS : ici on cherche un multiple commun (le plus PETIT), là un diviseur commun (le plus GRAND). Les deux mots se ressemblent, les deux calculs sont inverses.`,
      };
    },
  },

  /* =========================================================================
     DIV_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_defi_tpl_1_quel_critere",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce que le nombre a de particulier : ses unités, ou la somme de ses chiffres.",
    tags: ["divisibilite", "defi", "qcm", "template"],
    generate: () => {
      const purs = 5;
      const enContexte = tireContexte(PARTAGES.length * 3, purs);
      const P = randomChoice(PARTAGES);
      const [lo, hi] = enContexte ? [100, Math.min(9999, P.max)] : [1000, 9999];
      // Un facteur qui oriente vers des cas intéressants, et qui tient dans [lo, hi].
      const f = randomChoice(
        ([1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90] as const).filter(
          (x) => Math.ceil(lo / x) <= Math.floor(hi / x),
        ),
      );
      const n = f * randomInt(Math.ceil(lo / f), Math.floor(hi / f));
      const TOUS = [2, 3, 5, 9, 10] as const;
      const estDiv = (x: number) => n % x === 0;
      const vrai = TOUS.filter(estDiv);
      const etiquette = (s: readonly number[]) =>
        enContexte
          ? s.length === 0
            ? "aucune de ces tailles"
            : s.length === 1
              ? `${s[0]} seulement`
              : listeEt(s)
          : s.length === 0
            ? "par aucun de ces nombres"
            : s.length === 1
              ? `par ${s[0]} seulement`
              : `par ${listeEt(s)}`;
      const correct = etiquette(vrai);
      // Leurres : on bascule un ou deux critères — chacun est une erreur réelle.
      const leurres: string[] = [];
      for (const x of TOUS) {
        leurres.push(etiquette(TOUS.filter((y) => (y === x ? !estDiv(y) : estDiv(y)))));
      }
      leurres.push(etiquette(TOUS.filter((y) => (y === 3 || y === 9 ? !estDiv(y) : estDiv(y)))));
      const text = enContexte
        ? randomChoice([
            `${P.qui} a ${n} ${P.objets}. ${cap(P.pr)} voudrait les ${P.mise} de 2, 3, 5, 9 ou 10, sans reste. Quelles tailles sont possibles ?`,
            `Avec ${n} ${P.objets}, ${min1(P.qui)} peut-${P.pr} faire des ${P.groupes} de 2, de 3, de 5, de 9 ou de 10 sans reste ? Donne toutes les tailles qui conviennent.`,
            `${n} ${P.objets} à ${P.mise} : parmi des ${P.groupes} de 2, 3, 5, 9 ou 10, ${lesquels(P)} tombent juste ?`,
          ])
        : randomChoice([
            `Par lesquels de 2, 3, 5, 9 et 10 le nombre ${n} est-il divisible ?`,
            `Parmi 2, 3, 5, 9 et 10, quels sont les diviseurs de ${n} ?`,
            `Sans poser de division, trouve par lesquels des nombres 2, 3, 5, 9 et 10 on peut diviser ${n} sans reste.`,
            `Applique les cinq critères de divisibilité (2, 3, 5, 9, 10) au nombre ${n}. Que trouves-tu ?`,
            `${n} est-il divisible par 2 ? par 3 ? par 5 ? par 9 ? par 10 ? Choisis la réponse complète.`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, leurres),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on applique les cinq critères, chacun avec sa méthode.\n\n" +
          "Méthode : on regarde d'abord le chiffre des unités (2, 5, 10), puis la somme des chiffres (3, 9).\n\n" +
          `Calcul : ${n} se termine par ${n % 10}, et la somme de ses chiffres vaut ${sommeChiffres(n)}.\n\n` +
          `Conclusion : la réponse est « ${correct} ». ⭐ Le contrôle rapide : si 9 marche, 3 marche forcément ; si 10 marche, 2 et 5 marchent forcément.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_defi_tpl_2_chiffre_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris la somme des chiffres connus, puis cherche ce qu'il faut ajouter.",
    tags: ["divisibilite", "defi", "chiffre_manquant", "template"],
    generate: () => {
      const par = randomChoice([3, 9] as const);
      const purs = 4;
      const ctxs = PARTAGES.filter((p) => p.max >= 200);
      const enContexte = tireContexte(ctxs.length * 2, purs);
      const P = randomChoice(ctxs);
      // Trois chiffres connus (nombre de 4 chiffres), ou deux si le contexte
      // n'admet pas des milliers d'objets.
      const nbConnus = !enContexte || P.max >= 1000 ? 3 : 2;
      let chiffres: number[] = [];
      let sommeConnue = 0;
      do {
        chiffres = [randomInt(1, 9), ...Array.from({ length: nbConnus - 1 }, () => randomInt(0, 9))];
        sommeConnue = chiffres.reduce((s, c) => s + c, 0);
        // Par 9 : on écarte le cas où 0 ET 9 conviendraient — la réponse doit être unique.
      } while (par === 9 && sommeConnue % 9 === 0);
      const manquant = (par - (sommeConnue % par)) % par;
      const auMilieu = Math.random() < 0.5;
      const N = auMilieu
        ? `${chiffres.slice(0, -1).join("")}?${chiffres[chiffres.length - 1]}`
        : `${chiffres.join("")}?`;
      const quel = par === 3 ? "le plus petit chiffre" : "le chiffre";
      const quelEfface =
        par === 9 ? "Quel est le chiffre effacé ?" : "Quel est le plus petit chiffre effacé possible ?";
      const text = enContexte
        ? randomChoice([
            `${P.qui} a ${N} ${P.objets}, mais un chiffre est effacé. ${cap(P.pr)} sait qu'${P.pr} peut les ${P.mise} de ${par}, sans reste. ${quelEfface}`,
            `Le bon de commande indique ${N} ${P.objets} (un chiffre est taché). On sait qu'on peut les ${P.mise} de ${par} sans qu'il en reste. ${quelEfface}`,
          ])
        : randomChoice([
            `Dans le nombre ${N}, quel est ${quel} à mettre à la place du ? pour obtenir un multiple de ${par} ?`,
            `Remplace le ? de ${N} pour que ce nombre soit divisible par ${par}. Quel est ${quel} qui convient ?`,
            `${N} doit être divisible par ${par}. Quel est ${quel} qui peut remplacer le point d'interrogation ?`,
            `Complète ${N} pour obtenir un nombre divisible par ${par} : quel est ${quel} possible ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation:
          `Définition : un nombre est divisible par ${par} lorsque la somme de ses chiffres l'est.\n\n` +
          `Méthode : on additionne les chiffres connus, puis on cherche ce qu'il faut ajouter pour atteindre ${manquant === 0 ? "un" : "le prochain"} multiple de ${par}.\n\n` +
          `Calcul : ${chiffres.join(" + ")} = ${sommeConnue}. ` +
          (manquant === 0
            ? `C'est déjà un multiple de ${par} : il suffit d'ajouter 0.\n\n`
            : `Le prochain multiple de ${par} est ${sommeConnue + manquant}, donc il faut ajouter ${manquant}.\n\n`) +
          (par === 3
            ? `Conclusion : le plus petit chiffre possible est ${manquant}. ⭐ Pour 3, il y a plusieurs solutions : ${[manquant, manquant + 3, manquant + 6, manquant + 9].filter((c) => c <= 9).join(", ")} conviennent toutes, car on avance de 3 en 3.`
            : `Conclusion : le chiffre est ${manquant}. ⭐ Pour 9, la solution est unique ici : ajouter 9 de plus dépasserait un chiffre.`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_defi_tpl_3_vrai_ou_faux",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une affirmation se réfute par un seul contre-exemple.",
    tags: ["divisibilite", "defi", "logique", "qcm", "template"],
    generate: () => {
      type Aff = { phrase: string; vrai: boolean; pourquoi: string };
      const implication = (A: number, B: number) =>
        A % B === 0
          ? `${A} = ${B} × ${A / B}, donc un multiple de ${A}, qui s'écrit ${A} × n, s'écrit aussi ${B} × (${A / B} × n) : c'est un multiple de ${B}.`
          : `contre-exemple : ${A} lui-même est un multiple de ${A}, mais ${A} ÷ ${B} ne tombe pas juste.`;
      const FAMILLES: (() => Aff)[] = [
        () => {
          const [A, B] = randomChoice([[9, 3], [3, 9], [10, 5], [10, 2], [2, 10], [5, 10]] as const);
          return { phrase: `Tout multiple de ${A} est un multiple de ${B}.`, vrai: A % B === 0, pourquoi: implication(A, B) };
        },
        () => {
          const [A, B] = randomChoice([[9, 3], [3, 9], [10, 5], [10, 2], [2, 10], [5, 10]] as const);
          return { phrase: `Si un nombre est divisible par ${A}, alors il est divisible par ${B}.`, vrai: A % B === 0, pourquoi: implication(A, B) };
        },
        () => {
          const [A, B, C, vrai, contre] = randomChoice([
            [2, 5, 10, true, 0], [2, 3, 6, true, 0], [3, 5, 15, true, 0], [2, 9, 18, true, 0],
            [2, 3, 9, false, 6], [3, 9, 27, false, 9], [2, 10, 20, false, 10], [5, 10, 50, false, 10],
          ] as const);
          return {
            phrase: `Un nombre divisible par ${A} et par ${B} est toujours divisible par ${C}.`,
            vrai,
            pourquoi: vrai
              ? `les multiples communs à ${A} et à ${B} sont exactement les multiples de ${C} : ${C}, ${2 * C}, ${3 * C}… Aucun ne fait exception.`
              : `contre-exemple : ${contre} est divisible par ${A} et par ${B}, mais pas par ${C}.`,
          };
        },
        () => {
          const P = randomChoice([3, 9] as const);
          const S = randomInt(10, 30);
          const vrai = S % P === 0;
          return {
            phrase: `Un nombre dont la somme des chiffres vaut ${S} est divisible par ${P}.`,
            vrai,
            pourquoi: `c'est le critère : un nombre est divisible par ${P} exactement quand la somme de ses chiffres l'est. Or ${S} ${vrai ? "est" : "n'est pas"} un multiple de ${P}.`,
          };
        },
        () => {
          const P = randomChoice([2, 5, 10, 3, 9] as const);
          const U = P === 3 ? randomChoice([3, 6, 9] as const) : P === 9 ? 9 : randomInt(0, 9);
          const vrai =
            P === 2 ? U % 2 === 0 : P === 5 ? U === 0 || U === 5 : P === 10 ? U === 0 : false;
          return {
            phrase: `Un nombre qui se termine par ${U} est toujours divisible par ${P}.`,
            vrai,
            pourquoi:
              P === 3 || P === 9
                ? `contre-exemple : 1${U} se termine par ${U}, mais n'est pas divisible par ${P}. Pour ${P}, c'est la SOMME des chiffres qui compte, pas le dernier.`
                : vrai
                  ? `pour ${P}, seul le chiffre des unités compte, et ${U} convient.`
                  : `contre-exemple : ${U === 0 ? 10 : 10 + U} se termine par ${U}, mais n'est pas divisible par ${P}.`,
          };
        },
        () => {
          const A = randomInt(3, 12);
          return {
            phrase: `La somme de deux multiples de ${A} est toujours un multiple de ${A}.`,
            vrai: true,
            pourquoi: `${A} × m + ${A} × n = ${A} × (m + n), qui est encore un multiple de ${A}.`,
          };
        },
        () => {
          const A = randomInt(3, 12);
          return {
            phrase: `La différence de deux multiples de ${A} est toujours un multiple de ${A}.`,
            vrai: true,
            pourquoi: `${A} × m − ${A} × n = ${A} × (m − n), qui est encore un multiple de ${A}.`,
          };
        },
        () => {
          const A = randomInt(3, 9);
          return {
            phrase: `Si un nombre est divisible par ${A}, alors son double est divisible par ${2 * A}.`,
            vrai: true,
            pourquoi: `si le nombre vaut ${A} × k, son double vaut 2 × ${A} × k = ${2 * A} × k.`,
          };
        },
        () => {
          const A = randomInt(4, 12);
          return {
            phrase: `Le reste de la division euclidienne d'un entier par ${A} peut valoir ${A}.`,
            vrai: false,
            pourquoi: `le reste est toujours strictement plus petit que le diviseur : il vaut au plus ${A - 1}. S'il valait ${A}, on pourrait faire une part de plus.`,
          };
        },
        () => {
          const A = randomInt(4, 12);
          return {
            phrase: `Le reste de la division euclidienne d'un entier par ${A} peut valoir ${A - 1}.`,
            vrai: true,
            pourquoi: `par exemple ${2 * A - 1} = ${A} × 1 + ${A - 1}, et ${A - 1} est bien plus petit que ${A}.`,
          };
        },
        () => ({
          phrase: "Tout nombre entier plus grand que 1 a au moins deux diviseurs.",
          vrai: true,
          pourquoi: "1 et le nombre lui-même le divisent toujours.",
        }),
        () => ({
          phrase: "La somme de deux nombres impairs est un nombre impair.",
          vrai: false,
          pourquoi: "contre-exemple : 3 + 5 = 8, qui est pair.",
        }),
        () => ({
          phrase: "Si la somme des chiffres d'un nombre est divisible par 3, alors ce nombre est divisible par 9.",
          vrai: false,
          pourquoi: "contre-exemple : 12 a pour somme 1 + 2 = 3, divisible par 3, mais 12 n'est pas divisible par 9.",
        }),
        () => ({
          phrase: "Un nombre divisible par 10 se termine toujours par 0.",
          vrai: true,
          pourquoi: "les multiples de 10 sont 10, 20, 30… : leur chiffre des unités est toujours 0.",
        }),
        () => {
          const A = randomInt(3, 12);
          return {
            phrase: `Le produit de n'importe quel entier par ${A} est un multiple de ${A}.`,
            vrai: true,
            pourquoi: `c'est la définition même : ${A} × n est un multiple de ${A}.`,
          };
        },
      ];
      const aff = randomChoice(FAMILLES)();
      const nom = randomChoice(["Léa", "Tom", "Inès", "Hugo", "Maël", "Chloé", "Yanis", "Jade"] as const);
      const text = randomChoice([
        `« ${aff.phrase} » Vrai ou faux ?`,
        `${nom} affirme : « ${aff.phrase} » Son affirmation est-elle vraie ou fausse ?`,
        `Voici une affirmation : « ${aff.phrase} » Est-elle vraie ou fausse ?`,
        `Dans sa copie, ${nom} écrit : « ${aff.phrase} » Vrai ou faux ?`,
        `Que penses-tu de cette phrase ? « ${aff.phrase} » Vrai ou faux ?`,
      ]);
      const correct = aff.vrai ? "vrai" : "faux";
      return {
        text,
        format: "qcm",
        choices: shuffle(["vrai", "faux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une affirmation générale est fausse dès qu'UN cas la contredit ; elle est vraie s'il n'en existe aucun.\n\n" +
          "Méthode : on cherche d'abord un contre-exemple parmi les petits nombres. Si on n'en trouve pas, on cherche pourquoi.\n\n" +
          `Calcul : ${aff.pourquoi}\n\n` +
          `Conclusion : c'est ${correct}. ⭐ Beaucoup de ces affirmations ne marchent que dans UN sens, et savoir lequel évite la moitié des erreurs du chapitre.`,
      };
    },
  },
];
