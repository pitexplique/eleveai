// lib/tutor-v4/questionBank/3e/maths/pythagore-solide.bank.ts
//
// Micro de 3e `pythagore_solide` : utiliser Pythagore DANS UN SOLIDE.
//
// ⭐ 13/10/2026 — née du brevet 2026 (Asie, 15 juin, exercice 2) : un gobelet
// en tronc de cône. Le triangle rectangle OAD est caché dans le cône (OD = 8,2 cm
// la génératrice, AD = 1,8 cm le rayon de la petite base) et l'on calcule
// OA² = OD² − AD² = 67,24 − 3,24 = 64, donc OA = 8 cm. Les six autres micros de
// la notion restaient dans le plan.
//
// ⚠️ À NE PAS CONFONDRE avec `sections_solides.bank.ts` (micro
// `section_calculer_longueur`) : là, on calcule la diagonale d'une SECTION
// rectangulaire, une figure plane. Ici, le triangle rectangle est DANS le
// volume : hauteur d'un cône, arête d'une pyramide, grande diagonale d'un pavé.
//
// Robustesse (règle du 30/09) : chaque gabarit compose une SITUATION (l'objet
// réel), des NOMS de points tirés, une TOURNURE de question et des longueurs
// tirées. Mesure :
//   npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 3e pythagore_theoreme
//
// La figure (canvas `pythagore_solide`) colorie le triangle rectangle caché :
// c'est tout le geste de l'exercice, le voir avant de calculer.

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  PythagoreSolideCanvasData,
} from "@/lib/tutor-v4/types";

type Q = TutorGeneratedQuestionV4;

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** 67.24 → « 67,24 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const r = Math.round(n * 10000) / 10000;
  const [ent, dec] = String(Math.abs(r)).split(".");
  const entier = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (r < 0 ? "−" : "") + entier + (dec ? "," + dec : "");
}
const sq = (x: number) => Math.round(x * x * 10000) / 10000;
const arrondi1 = (x: number) => Math.round(x * 10) / 10;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const estCarreParfait = (s: number) => {
  const r = Math.round(Math.sqrt(s) * 10000) / 10000;
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-7;
};

/** Bonne réponse + trois leurres DISTINCTS (jamais deux fois la même valeur). */
function qcm(correct: string, leurres: string[]): string[] {
  const d = shuffle([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

/** La réponse attendue avec son unité : « 8,2 cm ». */
const avecU = (x: number, u: string) => `${fr(x)} ${u}`;

const SUFFIXES_ARRONDI = [
  " Donne l’arrondi au dixième.",
  " Arrondis au dixième.",
  " Arrondis le résultat au dixième.",
];

// ---------- Les triplets ----------
// [côté, côté, hypoténuse]. Les dix premiers restent petits (étoiles basses).
const TRIPLETS: [number, number, number][] = [
  [3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15],
  [7, 24, 25], [12, 16, 20], [10, 24, 26], [15, 20, 25], [20, 21, 29],
  [9, 40, 41], [12, 35, 37], [16, 30, 34], [18, 24, 30], [21, 28, 35],
];
/** Un triplet, à l'échelle d'une situation (entier, ou ×0,1 / ×0,5 pour les mètres). */
function tirerTriplet(echelles: number[]): [number, number, number] {
  const k = randomChoice(echelles);
  const [a, b, c] = randomChoice(k === 1 ? TRIPLETS : TRIPLETS.slice(0, 10));
  const t = [a, b, c].map((x) => Math.round(x * k * 100) / 100);
  return randomChoice([true, false]) ? [t[0], t[1], t[2]] : [t[1], t[0], t[2]];
}

// =========================================================================
// LE CÔNE
// =========================================================================
type NomsCone = { s: string; o: string; a: string };
// Pas de I (il se lit 1) ; le O reste permis pour un CENTRE, c'est l'usage.
const NOMS_CONE: NomsCone[] = [
  { s: "S", o: "O", a: "A" }, { s: "S", o: "O", a: "M" }, { s: "S", o: "H", a: "B" },
  { s: "T", o: "O", a: "R" }, { s: "K", o: "H", a: "L" }, { s: "P", o: "O", a: "N" },
  { s: "V", o: "O", a: "C" }, { s: "S", o: "K", a: "E" }, { s: "E", o: "F", a: "G" },
  { s: "A", o: "H", a: "B" },
];
type ObjetCone = { nom: string; unite: string; echelles: number[] };
const OBJETS_CONE: ObjetCone[] = [
  { nom: "un cornet de glace", unite: "cm", echelles: [0.5] },
  { nom: "un chapeau pointu de fête", unite: "cm", echelles: [1] },
  { nom: "un entonnoir", unite: "cm", echelles: [1, 0.5] },
  { nom: "un cône de chantier", unite: "cm", echelles: [1] },
  { nom: "une bougie décorative", unite: "cm", echelles: [0.5, 1] },
  { nom: "un tipi", unite: "m", echelles: [0.5] },
  { nom: "un tas de sable", unite: "m", echelles: [0.1, 0.2] },
  { nom: "le toit d’une tour de château", unite: "m", echelles: [0.5, 1] },
  { nom: "une tente conique", unite: "m", echelles: [0.5] },
  { nom: "un verre à cocktail", unite: "cm", echelles: [0.5] },
  { nom: "un sapin de Noël en carton", unite: "cm", echelles: [1] },
  { nom: "un tas de sel dans un marais salant", unite: "m", echelles: [0.1, 0.2] },
];

function introCone(obj: ObjetCone, n: NomsCone): string {
  return randomChoice([
    `${cap(obj.nom)} a la forme d’un cône de sommet ${n.s}. ${n.o} est le centre de sa base et ${n.a} un point du cercle de base.`,
    `On modélise ${obj.nom} par un cône de révolution de sommet ${n.s}, dont la base a pour centre ${n.o}. Le point ${n.a} est sur le cercle de base.`,
    `${cap(obj.nom)} est un cône : ${n.s} est son sommet, ${n.o} le centre de sa base, et ${n.a} un point du bord de la base.`,
  ]);
}

function figureCone(n: NomsCone, cotes: PythagoreSolideCanvasData["cotes"]): PythagoreSolideCanvasData {
  return { kind: "pythagore_solide", solide: "cone", noms: { haut: n.s, droit: n.o, bas: n.a }, cotes };
}

const DEF_CONE = (n: NomsCone) =>
  `Définition : dans un cône de révolution, la hauteur [${n.s}${n.o}] est perpendiculaire à la base. Le triangle ${n.s}${n.o}${n.a} est donc rectangle en ${n.o}, et son hypoténuse est la génératrice [${n.s}${n.a}].`;

type Inconnue = "hyp" | "hauteur" | "rayon";

/** Un calcul dans le cône : la génératrice, la hauteur ou le rayon. */
function questionCone(inconnue: Inconnue, arrondir: boolean): Q {
  const obj = randomChoice(OBJETS_CONE);
  const n = randomChoice(NOMS_CONE);
  const u = obj.unite;
  let h: number;
  let r: number;
  let g: number;
  if (arrondir) {
    // Des longueurs entières (ou au dixième pour les mètres) dont la racine ne tombe pas juste.
    const pas = u === "m" ? 0.5 : 1;
    for (;;) {
      h = Math.round((3 + Math.floor(Math.random() * 13)) * pas * 10) / 10;
      r = Math.round((2 + Math.floor(Math.random() * 10)) * pas * 10) / 10;
      if (inconnue !== "hyp" && h === r) continue;
      g = Math.sqrt(sq(h) + sq(r));
      if (inconnue === "hyp" && !estCarreParfait(sq(h) + sq(r))) break;
      if (inconnue !== "hyp") {
        // On DONNE la génératrice : on la prend au dixième, et l'inconnue ne tombe pas juste.
        g = Math.round((Math.max(h, r) + 1 + Math.floor(Math.random() * 6)) * pas * 10) / 10;
        const connu = inconnue === "hauteur" ? r : h;
        if (g > connu && !estCarreParfait(sq(g) - sq(connu))) break;
      }
    }
  } else {
    [h, r, g] = tirerTriplet(obj.echelles);
  }
  const SO = `${n.s}${n.o}`;
  const OA = `${n.o}${n.a}`;
  const SA = `${n.s}${n.a}`;

  const donnees = {
    hyp: randomChoice([
      `On donne ${SO} = ${avecU(h, u)} et ${OA} = ${avecU(r, u)}.`,
      `Sa hauteur ${SO} mesure ${avecU(h, u)} et le rayon ${OA} de sa base ${avecU(r, u)}.`,
    ]),
    hauteur: randomChoice([
      `On donne ${SA} = ${avecU(g, u)} et ${OA} = ${avecU(r, u)}.`,
      `Sa génératrice ${SA} mesure ${avecU(g, u)} et le rayon ${OA} de sa base ${avecU(r, u)}.`,
    ]),
    rayon: randomChoice([
      `On donne ${SA} = ${avecU(g, u)} et ${SO} = ${avecU(h, u)}.`,
      `Sa génératrice ${SA} mesure ${avecU(g, u)} et sa hauteur ${SO} ${avecU(h, u)}.`,
    ]),
  }[inconnue];
  const cible = { hyp: SA, hauteur: SO, rayon: OA }[inconnue];
  const motCible = { hyp: "la génératrice", hauteur: "la hauteur", rayon: "le rayon de la base" }[inconnue];
  const question = randomChoice([
    `Calcule ${cible}.`,
    `Combien mesure ${motCible} ${cible} ?`,
    `Quelle est la longueur ${cible} ?`,
  ]) + (arrondir ? randomChoice(SUFFIXES_ARRONDI) : "");

  let carre: number;
  let calcul: string;
  if (inconnue === "hyp") {
    carre = Math.round((sq(h) + sq(r)) * 10000) / 10000;
    calcul = `${SA}² = ${SO}² + ${OA}² = ${fr(h)}² + ${fr(r)}² = ${fr(sq(h))} + ${fr(sq(r))} = ${fr(carre)}.`;
  } else {
    const connu = inconnue === "hauteur" ? r : h;
    const nomConnu = inconnue === "hauteur" ? OA : SO;
    carre = Math.round((sq(g) - sq(connu)) * 10000) / 10000;
    calcul = `${cible}² = ${SA}² − ${nomConnu}² = ${fr(g)}² − ${fr(connu)}² = ${fr(sq(g))} − ${fr(sq(connu))} = ${fr(carre)}.`;
  }
  const valeur = Math.sqrt(carre);
  const rep = arrondir ? arrondi1(valeur) : Math.round(valeur * 100) / 100;
  const conclusion = arrondir
    ? `Conclusion : ${cible} = √${fr(carre)} ≈ ${avecU(rep, u)} (arrondi au dixième).`
    : `Conclusion : ${cible} = √${fr(carre)} = ${avecU(rep, u)}.`;
  const methode =
    inconnue === "hyp"
      ? `Méthode : on cherche l’hypoténuse, on additionne les carrés des deux côtés de l’angle droit.`
      : `Méthode : on cherche un côté de l’angle droit, on soustrait : ${cible}² = ${SA}² − ${inconnue === "hauteur" ? OA : SO}².`;

  const cotes = {
    droitHaut: inconnue === "hauteur" ? "?" : avecU(h, u),
    droitBas: inconnue === "rayon" ? "?" : avecU(r, u),
    hypotenuse: inconnue === "hyp" ? "?" : avecU(g, u),
  };

  return {
    text: `${introCone(obj, n)} ${donnees}\n${question}`,
    format: "short",
    expected: [avecU(rep, u)],
    comparator: "number_equal",
    explanation: `${DEF_CONE(n)}\n\n${methode}\n\nCalcul : ${calcul}\n\n${conclusion}`,
    canvas: figureCone(n, cotes),
  };
}

// =========================================================================
// LE GOBELET DU BREVET (tronc de cône)
// =========================================================================
type NomsGobelet = { o: string; a: string; d: string };
const NOMS_GOBELET: NomsGobelet[] = [
  { o: "O", a: "A", d: "D" }, { o: "S", a: "H", d: "M" }, { o: "O", a: "K", d: "L" },
  { o: "S", a: "A", d: "B" }, { o: "O", a: "E", d: "F" }, { o: "P", a: "H", d: "R" },
];
const OBJETS_GOBELET = [
  "un gobelet", "un pot de fleurs", "un seau", "un abat-jour", "une tasse à café",
  "un verre", "un pot de yaourt", "une corbeille à papier", "un cornet de frites",
];
// [OA, AD, OD] : la hauteur du petit cône, le rayon de la petite base, la génératrice.
// Le premier est celui du brevet 2026 ; les autres en sont des cousins (9-40-41,
// 5-12-13, 7-24-25, 12-35-37 réduits), toujours décimaux comme au brevet.
const GOBELETS: [number, number, number][] = [
  [8, 1.8, 8.2], [4, 0.9, 4.1], [12, 2.7, 12.3], [16, 3.6, 16.4], [20, 4.5, 20.5],
  [6, 2.5, 6.5], [3.6, 1.5, 3.9], [2.4, 0.7, 2.5], [9.6, 2.8, 10], [7, 2.4, 7.4],
  [4.8, 1.4, 5], [12, 5, 13],
];

function questionGobelet(): Q {
  const objet = randomChoice(OBJETS_GOBELET);
  const n = randomChoice(NOMS_GOBELET);
  const [oa, ad, od] = randomChoice(GOBELETS);
  const OA = `${n.o}${n.a}`;
  const AD = `${n.a}${n.d}`;
  const OD = `${n.o}${n.d}`;
  const inconnue = randomChoice(["OA", "OA", "OD", "AD"] as const);
  const intro = randomChoice([
    `${cap(objet)} a la forme d’un tronc de cône. On le prolonge vers le bas en un cône de sommet ${n.o}. ${n.a} est le centre de la petite base et ${n.d} un point de son bord.`,
    `On modélise ${objet} par un tronc de cône, obtenu en coupant un cône de sommet ${n.o}. La petite base a pour centre ${n.a}, et ${n.d} est sur son cercle.`,
  ]);
  const donnees = {
    OA: `On donne ${OD} = ${fr(od)} cm et ${AD} = ${fr(ad)} cm.`,
    OD: `On donne ${OA} = ${fr(oa)} cm et ${AD} = ${fr(ad)} cm.`,
    AD: `On donne ${OD} = ${fr(od)} cm et ${OA} = ${fr(oa)} cm.`,
  }[inconnue];
  const cible = { OA, OD, AD }[inconnue];
  const question = randomChoice([`Calcule ${cible}.`, `Combien mesure ${cible} ?`, `Quelle est la longueur ${cible} ?`]);
  const rep = { OA: oa, OD: od, AD: ad }[inconnue];
  const carre = sq(rep);
  const calcul =
    inconnue === "OD"
      ? `${OD}² = ${OA}² + ${AD}² = ${fr(oa)}² + ${fr(ad)}² = ${fr(sq(oa))} + ${fr(sq(ad))} = ${fr(carre)}.`
      : inconnue === "OA"
        ? `${OA}² = ${OD}² − ${AD}² = ${fr(od)}² − ${fr(ad)}² = ${fr(sq(od))} − ${fr(sq(ad))} = ${fr(carre)}.`
        : `${AD}² = ${OD}² − ${OA}² = ${fr(od)}² − ${fr(oa)}² = ${fr(sq(od))} − ${fr(sq(oa))} = ${fr(carre)}.`;
  return {
    text: `${intro} ${donnees}\n${question}`,
    format: "short",
    expected: [avecU(rep, "cm")],
    comparator: "number_equal",
    explanation:
      `Définition : l’axe [${n.o}${n.a}] du cône est perpendiculaire à la petite base. Le triangle ${n.o}${n.a}${n.d} est donc rectangle en ${n.a}, d’hypoténuse [${OD}].\n\n` +
      `Méthode : d’après le théorème de Pythagore dans le triangle ${n.o}${n.a}${n.d} rectangle en ${n.a}, ${OD}² = ${OA}² + ${AD}².\n\n` +
      `Calcul : ${calcul}\n\n` +
      `Conclusion : ${cible} = √${fr(carre)} = ${avecU(rep, "cm")}.`,
    canvas: {
      kind: "pythagore_solide",
      solide: "gobelet",
      noms: { haut: n.o, droit: n.a, bas: n.d },
      cotes: {
        droitHaut: inconnue === "OA" ? "?" : `${fr(oa)} cm`,
        droitBas: inconnue === "AD" ? "?" : `${fr(ad)} cm`,
        hypotenuse: inconnue === "OD" ? "?" : `${fr(od)} cm`,
      },
    },
  };
}

// =========================================================================
// LA PYRAMIDE À BASE CARRÉE
// =========================================================================
type NomsPyramide = { s: string; h: string; base: string[]; m: string };
const NOMS_PYRAMIDE: NomsPyramide[] = [
  { s: "S", h: "H", base: ["A", "B", "C", "D"], m: "M" },
  { s: "S", h: "O", base: ["E", "F", "G", "H"], m: "M" },
  { s: "T", h: "O", base: ["M", "N", "P", "Q"], m: "K" },
  { s: "V", h: "O", base: ["A", "B", "C", "D"], m: "J" },
  { s: "S", h: "K", base: ["L", "M", "N", "P"], m: "R" },
  { s: "P", h: "H", base: ["A", "B", "C", "D"], m: "M" },
  { s: "E", h: "O", base: ["A", "B", "C", "D"], m: "K" },
];
type ObjetPyramide = { nom: string; unite: string; echelles: number[] };
const OBJETS_PYRAMIDE: ObjetPyramide[] = [
  { nom: "un presse-papier en verre", unite: "cm", echelles: [0.5, 1] },
  { nom: "le toit d’un kiosque", unite: "m", echelles: [0.5] },
  { nom: "une tente", unite: "m", echelles: [0.2] },
  { nom: "une boîte de chocolats", unite: "cm", echelles: [1] },
  { nom: "une lanterne en papier", unite: "cm", echelles: [1, 0.5] },
  { nom: "une pyramide de verre devant un musée", unite: "m", echelles: [1] },
  { nom: "le sommet d’un obélisque", unite: "cm", echelles: [1] },
  { nom: "un gâteau en forme de pyramide", unite: "cm", echelles: [0.5, 1] },
];

/**
 * ★4 — la pyramide régulière : par le SOMMET de la base (demi-diagonale,
 * arête latérale) ou par le MILIEU d'un côté (demi-côté, apothème).
 */
function questionPyramide(): Q {
  const obj = randomChoice(OBJETS_PYRAMIDE);
  const n = randomChoice(NOMS_PYRAMIDE);
  const u = obj.unite;
  const apotheme = randomChoice([true, false]);
  const [hauteur, pied, hyp] = tirerTriplet(obj.echelles);
  const [A, B, C, D] = n.base;
  const S = n.s;
  const H = n.h;
  const P = apotheme ? n.m : A; // le pied du côté horizontal
  const SH = `${S}${H}`;
  const HP = `${H}${P}`;
  const SP = `${S}${P}`;
  const inconnue = randomChoice(["hauteur", "hyp", "hyp"] as const);
  const intro = randomChoice([
    `${cap(obj.nom)} a la forme d’une pyramide régulière ${S}${A}${B}${C}${D}, de base carrée ${A}${B}${C}${D} et de hauteur [${SH}] ; ${H} est le centre de la base.`,
    `On modélise ${obj.nom} par une pyramide ${S}${A}${B}${C}${D} à base carrée. Sa hauteur [${SH}] tombe au centre ${H} du carré ${A}${B}${C}${D}.`,
  ]);
  // La longueur horizontale est donnée par le côté ou la diagonale entière : l'élève divise par 2.
  const donneePied = apotheme
    ? `${P} est le milieu de [${B}${C}], et le côté du carré mesure ${avecU(2 * pied, u)}.`
    : `La diagonale [${A}${C}] de la base mesure ${avecU(2 * pied, u)}.`;
  const donnee =
    inconnue === "hyp"
      ? `${donneePied} La hauteur ${SH} mesure ${avecU(hauteur, u)}.`
      : `${donneePied} ${apotheme ? `Le segment [${SP}]` : `L’arête [${SP}]`} mesure ${avecU(hyp, u)}.`;
  const cible = inconnue === "hyp" ? SP : SH;
  const question = randomChoice([`Calcule ${cible}.`, `Combien mesure ${cible} ?`, `Quelle est la longueur ${cible} ?`]);
  const rep = inconnue === "hyp" ? hyp : hauteur;
  const carre = sq(rep);
  const pas1 = apotheme
    ? `${HP} est la moitié du côté : ${HP} = ${fr(2 * pied)} ÷ 2 = ${fr(pied)} ${u}.`
    : `${H} est le milieu de la diagonale : ${HP} = ${fr(2 * pied)} ÷ 2 = ${fr(pied)} ${u}.`;
  const calcul =
    inconnue === "hyp"
      ? `${SP}² = ${SH}² + ${HP}² = ${fr(hauteur)}² + ${fr(pied)}² = ${fr(sq(hauteur))} + ${fr(sq(pied))} = ${fr(carre)}.`
      : `${SH}² = ${SP}² − ${HP}² = ${fr(hyp)}² − ${fr(pied)}² = ${fr(sq(hyp))} − ${fr(sq(pied))} = ${fr(carre)}.`;
  return {
    text: `${intro} ${donnee}\n${question}`,
    format: "short",
    expected: [avecU(rep, u)],
    comparator: "number_equal",
    explanation:
      `Définition : la hauteur [${SH}] est perpendiculaire à la base, donc à [${HP}] : le triangle ${S}${H}${P} est rectangle en ${H}, d’hypoténuse [${SP}].\n\n` +
      `Méthode : ${pas1} Puis Pythagore dans le triangle ${S}${H}${P} rectangle en ${H}.\n\n` +
      `Calcul : ${calcul}\n\n` +
      `Conclusion : ${cible} = √${fr(carre)} = ${avecU(rep, u)}.`,
    canvas: {
      kind: "pythagore_solide",
      solide: apotheme ? "pyramide_apotheme" : "pyramide",
      noms: { haut: S, droit: H, bas: P },
      base: n.base,
      cotes: {
        droitHaut: inconnue === "hauteur" ? "?" : avecU(hauteur, u),
        droitBas: avecU(pied, u),
        hypotenuse: inconnue === "hyp" ? "?" : avecU(hyp, u),
      },
    },
  };
}

/** ★5 — l'arête latérale depuis le côté de la base et la hauteur : trois étapes, un arrondi. */
function questionPyramideArete(): Q {
  const obj = randomChoice(OBJETS_PYRAMIDE.filter((o) => o.unite === "cm"));
  const n = randomChoice(NOMS_PYRAMIDE);
  const [A, B, C, D] = n.base;
  const S = n.s;
  const H = n.h;
  let c: number;
  let h: number;
  for (;;) {
    c = randomChoice([4, 6, 8, 10, 12, 14, 16]);
    h = 3 + Math.floor(Math.random() * 14);
    if (!estCarreParfait(h * h + (c * c) / 2)) break;
  }
  const AC2 = 2 * c * c;
  const HA2 = (c * c) / 2;
  const SA2 = h * h + HA2;
  const rep = arrondi1(Math.sqrt(SA2));
  return {
    text:
      `${cap(obj.nom)} a la forme d’une pyramide régulière ${S}${A}${B}${C}${D} : sa base est un carré de côté ${c} cm, de centre ${H}, et sa hauteur ${S}${H} mesure ${h} cm.\n` +
      `Calcule la longueur de l’arête ${S}${A}.` + randomChoice(SUFFIXES_ARRONDI),
    format: "short",
    expected: [avecU(rep, "cm")],
    comparator: "number_equal",
    explanation:
      `Définition : deux triangles rectangles se suivent : ${A}${B}${C} (rectangle en ${B}, dans la base) puis ${S}${H}${A} (rectangle en ${H}, car la hauteur est perpendiculaire à la base).\n\n` +
      `Méthode : on calcule ${A}${C}², puis ${H}${A}² (${H} est le milieu de [${A}${C}]), puis ${S}${A}². On garde les carrés sans arrondir jusqu’au bout.\n\n` +
      `Calcul : ${A}${C}² = ${c}² + ${c}² = ${AC2}. ${H}${A} = ${A}${C} ÷ 2, donc ${H}${A}² = ${AC2} ÷ 4 = ${fr(HA2)}. ${S}${A}² = ${S}${H}² + ${H}${A}² = ${h * h} + ${fr(HA2)} = ${fr(SA2)}.\n\n` +
      `Conclusion : ${S}${A} = √${fr(SA2)} ≈ ${avecU(rep, "cm")} (arrondi au dixième).`,
    canvas: {
      kind: "pythagore_solide",
      solide: "pyramide",
      noms: { haut: S, droit: H, bas: A },
      base: n.base,
      cotes: { droitHaut: `${h} cm`, hypotenuse: "?" },
    },
  };
}

// =========================================================================
// LE PAVÉ DROIT
// =========================================================================
const NOMS_PAVE: string[][] = [
  ["A", "B", "C", "D", "E", "F", "G", "H"],
  ["M", "N", "P", "Q", "R", "S", "T", "U"],
  ["K", "L", "M", "N", "P", "Q", "R", "S"],
  ["E", "F", "G", "H", "J", "K", "L", "M"],
  ["A", "B", "C", "D", "M", "N", "P", "Q"],
];
// `facteur` met les quadruplets à la taille de l'objet ; `dMin` écarte les
// tirages trop petits pour lui (pas de valise de 12 cm). Pas de pièce ni de
// conteneur : leur hauteur doit rester la plus petite dimension, ce que les
// quadruplets ne garantissent pas — une boîte, elle, peut être posée de chant.
type ObjetPave = { nom: string; unite: string; facteur: number; dMin: number };
const OBJETS_PAVE: ObjetPave[] = [
  { nom: "une boîte à chaussures", unite: "cm", facteur: 2, dMin: 20 },
  { nom: "un carton de déménagement", unite: "cm", facteur: 5, dMin: 45 },
  { nom: "un aquarium", unite: "cm", facteur: 5, dMin: 45 },
  { nom: "une valise", unite: "cm", facteur: 5, dMin: 45 },
  { nom: "un coffre de jardin", unite: "cm", facteur: 10, dMin: 90 },
  { nom: "une malle", unite: "cm", facteur: 10, dMin: 90 },
  { nom: "un colis", unite: "cm", facteur: 3, dMin: 30 },
  { nom: "une caisse en bois", unite: "dm", facteur: 1, dMin: 7 },
  { nom: "une boîte de mouchoirs", unite: "cm", facteur: 2, dMin: 14 },
];
// [longueur, largeur, hauteur, grande diagonale] : a² + b² + c² = d².
const QUADRUPLETS: [number, number, number, number][] = [
  [4, 3, 12, 13], [8, 6, 24, 26], [12, 9, 20, 25], [16, 12, 15, 25], [6, 2, 3, 7],
  [7, 4, 4, 9], [9, 6, 2, 11], [7, 6, 6, 11], [8, 4, 1, 9], [11, 10, 2, 15],
  [12, 9, 8, 17], [15, 10, 6, 19], [6, 3, 2, 7], [12, 4, 3, 13],
];

function introPave(obj: ObjetPave, s: string[]): string {
  const [A, B, C, D, E, F, G, H] = s;
  return randomChoice([
    `${cap(obj.nom)} a la forme d’un pavé droit ${A}${B}${C}${D}${E}${F}${G}${H} : la base est ${A}${B}${C}${D}, et ${E}, ${F}, ${G}, ${H} sont au-dessus de ${A}, ${B}, ${C}, ${D}.`,
    `On modélise ${obj.nom} par un pavé droit ${A}${B}${C}${D}${E}${F}${G}${H} de base ${A}${B}${C}${D} (les arêtes [${A}${E}], [${B}${F}], [${C}${G}], [${D}${H}] sont verticales).`,
  ]);
}

/** ★3 — une seule étape dans l'espace : AC (diagonale de la base) et CG donnés, AG cherché. */
function questionPaveUneEtape(): Q {
  const obj = randomChoice(OBJETS_PAVE);
  const s = randomChoice(NOMS_PAVE);
  const u = obj.unite;
  const [A, , C, , , , G] = s;
  // Les triplets à la taille de l'objet, assez grands pour lui.
  const possibles = TRIPLETS.filter((t) => t[2] * obj.facteur >= obj.dMin && t[2] * obj.facteur <= 2 * obj.dMin);
  const [p1, p2, ag] = randomChoice(possibles).map((v) => Math.round(v * obj.facteur * 10) / 10);
  const [ac, cg] = randomChoice([true, false]) ? [p1, p2] : [p2, p1];
  const inconnue = randomChoice(["AG", "AG", "CG"] as const);
  const donnee =
    inconnue === "AG"
      ? `La diagonale de la base mesure ${A}${C} = ${avecU(ac, u)} et la hauteur ${C}${G} = ${avecU(cg, u)}.`
      : `La diagonale de la base mesure ${A}${C} = ${avecU(ac, u)} et la grande diagonale ${A}${G} = ${avecU(ag, u)}.`;
  const cible = inconnue === "AG" ? `${A}${G}` : `${C}${G}`;
  const rep = inconnue === "AG" ? ag : cg;
  const carre = sq(rep);
  const calcul =
    inconnue === "AG"
      ? `${A}${G}² = ${A}${C}² + ${C}${G}² = ${fr(ac)}² + ${fr(cg)}² = ${fr(sq(ac))} + ${fr(sq(cg))} = ${fr(carre)}.`
      : `${C}${G}² = ${A}${G}² − ${A}${C}² = ${fr(ag)}² − ${fr(ac)}² = ${fr(sq(ag))} − ${fr(sq(ac))} = ${fr(carre)}.`;
  return {
    text: `${introPave(obj, s)} ${donnee}\n` + randomChoice([`Calcule ${cible}.`, `Combien mesure ${cible} ?`, `Quelle est la longueur ${cible} ?`]),
    format: "short",
    expected: [avecU(rep, u)],
    comparator: "number_equal",
    explanation:
      `Définition : l’arête [${C}${G}] est perpendiculaire à la base, donc à [${A}${C}] : le triangle ${A}${C}${G} est rectangle en ${C}, d’hypoténuse [${A}${G}].\n\n` +
      `Méthode : théorème de Pythagore dans le triangle ${A}${C}${G} rectangle en ${C}.\n\n` +
      `Calcul : ${calcul}\n\n` +
      `Conclusion : ${cible} = √${fr(carre)} = ${avecU(rep, u)}.`,
    canvas: {
      kind: "pythagore_solide",
      solide: "pave_espace",
      sommets: s,
      cotes: {
        droitBas: avecU(ac, u),
        droitHaut: inconnue === "CG" ? "?" : avecU(cg, u),
        hypotenuse: inconnue === "AG" ? "?" : avecU(ag, u),
      },
    },
  };
}

function dimensionsPave(obj: ObjetPave): { L: number; l: number; h: number; d: number } {
  const possibles = QUADRUPLETS.filter((q) => q[3] * obj.facteur >= obj.dMin);
  const [L, l, h, d] = randomChoice(possibles).map((x) => Math.round(x * obj.facteur * 10) / 10);
  return { L, l, h, d };
}

/** ★4 — deux Pythagore de suite : la diagonale de la base, puis la grande diagonale. */
function questionPaveDeuxEtapes(): Q {
  const obj = randomChoice(OBJETS_PAVE);
  const s = randomChoice(NOMS_PAVE);
  const u = obj.unite;
  const [A, B, C, , , , G] = s;
  const { L, l, h, d } = dimensionsPave(obj);
  const AC2 = Math.round((sq(L) + sq(l)) * 10000) / 10000;
  const AG2 = Math.round((AC2 + sq(h)) * 10000) / 10000;
  const donnee = randomChoice([
    `On donne ${A}${B} = ${avecU(L, u)}, ${B}${C} = ${avecU(l, u)} et ${C}${G} = ${avecU(h, u)}.`,
    `Ses dimensions sont : longueur ${A}${B} = ${avecU(L, u)}, largeur ${B}${C} = ${avecU(l, u)}, hauteur ${C}${G} = ${avecU(h, u)}.`,
  ]);
  const question = randomChoice([
    `Calcule la longueur de la grande diagonale [${A}${G}].`,
    `Combien mesure ${A}${G} ?`,
    `Calcule d’abord ${A}${C}², puis ${A}${G}.`,
  ]);
  return {
    text: `${introPave(obj, s)} ${donnee}\n${question}`,
    format: "short",
    expected: [avecU(d, u)],
    comparator: "number_equal",
    explanation:
      `Définition : deux triangles rectangles se suivent. ${A}${B}${C} est rectangle en ${B} (dans la base), et ${A}${C}${G} est rectangle en ${C} (l’arête [${C}${G}] est perpendiculaire à la base).\n\n` +
      `Méthode : Pythagore dans ${A}${B}${C} donne ${A}${C}², que l’on GARDE tel quel (inutile de prendre sa racine) ; puis Pythagore dans ${A}${C}${G}.\n\n` +
      `Calcul : ${A}${C}² = ${fr(L)}² + ${fr(l)}² = ${fr(sq(L))} + ${fr(sq(l))} = ${fr(AC2)}. Puis ${A}${G}² = ${A}${C}² + ${C}${G}² = ${fr(AC2)} + ${fr(sq(h))} = ${fr(AG2)}.\n\n` +
      `Conclusion : ${A}${G} = √${fr(AG2)} = ${avecU(d, u)}.`,
    canvas: {
      kind: "pythagore_solide",
      solide: "pave_espace",
      sommets: s,
      cotes: { droitHaut: avecU(h, u), hypotenuse: "?" },
    },
  };
}

/** ★5 — l'objet tient-il dans la boîte ? Le plus long segment d'un pavé est sa grande diagonale. */
// Des objets à la mesure de la boîte : petits sous 40 cm, longs au-delà.
const OBJETS_COURTS = ["une règle", "un pinceau", "une baguette chinoise", "un crayon", "une paille", "un stylo"];
const OBJETS_LONGS = [
  "une baguette de bois", "un parapluie", "un tube à affiches",
  "un bâton de randonnée", "une flûte", "une canne", "une tringle à rideau",
];
function questionPaveObjet(): Q {
  const obj = randomChoice(OBJETS_PAVE.filter((o) => o.unite === "cm" && o.facteur <= 5));
  const s = randomChoice(NOMS_PAVE);
  const [A, B, C, , , , G] = s;
  const { L, l, h, d } = dimensionsPave(obj);
  const tient = randomChoice([true, false]);
  const ecart = randomChoice([1, 2, 3]);
  const long = tient ? d - ecart : d + ecart;
  const objet = randomChoice(d < 40 ? OBJETS_COURTS : OBJETS_LONGS);
  const AC2 = sq(L) + sq(l);
  const AG2 = AC2 + sq(h);
  return {
    text:
      `${introPave(obj, s)} Ses dimensions sont ${A}${B} = ${L} cm, ${B}${C} = ${l} cm et ${C}${G} = ${h} cm.\n` +
      `Peut-on y ranger ${objet} de ${long} cm, d’un coin à l’autre, de ${A} à ${G} ?`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [tient ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation:
      `Définition : le plus long segment que l’on peut placer dans un pavé droit est sa grande diagonale [${A}${G}].\n\n` +
      `Méthode : Pythagore dans ${A}${B}${C} rectangle en ${B}, puis dans ${A}${C}${G} rectangle en ${C}.\n\n` +
      `Calcul : ${A}${C}² = ${L}² + ${l}² = ${AC2}, puis ${A}${G}² = ${AC2} + ${h}² = ${AG2}, donc ${A}${G} = √${AG2} = ${d} cm.\n\n` +
      (tient
        ? `Conclusion : ${long} cm < ${d} cm : oui, l’objet tient en diagonale.`
        : `Conclusion : ${long} cm > ${d} cm : non, même en diagonale l’objet ne tient pas.`),
    canvas: { kind: "pythagore_solide", solide: "pave_espace", sommets: s, cotes: { hypotenuse: `${d} cm ?` } },
  };
}

// =========================================================================
// REPÉRER LE TRIANGLE RECTANGLE CACHÉ (★2)
// =========================================================================
type Cache = {
  /** Le triangle, angle droit, hypoténuse, deux autres côtés, et sa phrase. */
  tri: string;
  droit: string;
  autres: [string, string];
  hyp: string;
  c1: string;
  c2: string;
  phrase: string;
  /** Pourquoi l'angle est droit, dans CE solide. */
  pourquoi: string;
  canvas: PythagoreSolideCanvasData;
};
function tirerCache(): Cache {
  const sorte = randomChoice(["cone", "gobelet", "pyramide", "apotheme", "pave_face", "pave_espace"] as const);
  if (sorte === "cone") {
    const n = randomChoice(NOMS_CONE);
    return {
      tri: `${n.s}${n.o}${n.a}`, droit: n.o, autres: [n.s, n.a],
      hyp: `${n.s}${n.a}`, c1: `${n.s}${n.o}`, c2: `${n.o}${n.a}`,
      phrase: `Un cône a pour sommet ${n.s} ; ${n.o} est le centre de sa base et ${n.a} un point du cercle de base.`,
      pourquoi: `la hauteur [${n.s}${n.o}] du cône est perpendiculaire à sa base, donc au rayon [${n.o}${n.a}]`,
      canvas: { kind: "pythagore_solide", solide: "cone", noms: { haut: n.s, droit: n.o, bas: n.a } },
    };
  }
  if (sorte === "gobelet") {
    const n = randomChoice(NOMS_GOBELET);
    return {
      tri: `${n.o}${n.a}${n.d}`, droit: n.a, autres: [n.o, n.d],
      hyp: `${n.o}${n.d}`, c1: `${n.o}${n.a}`, c2: `${n.a}${n.d}`,
      phrase: `Un gobelet est un tronc de cône, prolongé vers le bas en un cône de sommet ${n.o}. ${n.a} est le centre de la petite base et ${n.d} un point de son bord.`,
      pourquoi: `l’axe [${n.o}${n.a}] du cône est perpendiculaire à la petite base, donc au rayon [${n.a}${n.d}]`,
      canvas: { kind: "pythagore_solide", solide: "gobelet", noms: { haut: n.o, droit: n.a, bas: n.d } },
    };
  }
  if (sorte === "pyramide" || sorte === "apotheme") {
    const n = randomChoice(NOMS_PYRAMIDE);
    const [A, B, C, D] = n.base;
    const P = sorte === "apotheme" ? n.m : A;
    return {
      tri: `${n.s}${n.h}${P}`, droit: n.h, autres: [n.s, P],
      hyp: `${n.s}${P}`, c1: `${n.s}${n.h}`, c2: `${n.h}${P}`,
      phrase:
        `${n.s}${A}${B}${C}${D} est une pyramide régulière à base carrée, de hauteur [${n.s}${n.h}] où ${n.h} est le centre de la base` +
        (sorte === "apotheme" ? ` ; ${P} est le milieu de [${B}${C}].` : "."),
      pourquoi: `la hauteur [${n.s}${n.h}] est perpendiculaire à la base, donc au segment [${n.h}${P}] tracé dans la base`,
      canvas: {
        kind: "pythagore_solide",
        solide: sorte === "apotheme" ? "pyramide_apotheme" : "pyramide",
        noms: { haut: n.s, droit: n.h, bas: P },
        base: n.base,
      },
    };
  }
  const s = randomChoice(NOMS_PAVE);
  const [A, B, C, D, E, F, G, H] = s;
  const phrase = `${A}${B}${C}${D}${E}${F}${G}${H} est un pavé droit de base ${A}${B}${C}${D} ; ${E}, ${F}, ${G}, ${H} sont au-dessus de ${A}, ${B}, ${C}, ${D}.`;
  if (sorte === "pave_face") {
    return {
      tri: `${A}${B}${C}`, droit: B, autres: [A, C],
      hyp: `${A}${C}`, c1: `${A}${B}`, c2: `${B}${C}`,
      phrase, pourquoi: `la base ${A}${B}${C}${D} est un rectangle : ses angles sont droits`,
      canvas: { kind: "pythagore_solide", solide: "pave_face", sommets: s },
    };
  }
  return {
    tri: `${A}${C}${G}`, droit: C, autres: [A, G],
    hyp: `${A}${G}`, c1: `${A}${C}`, c2: `${C}${G}`,
    phrase, pourquoi: `l’arête [${C}${G}] est perpendiculaire à la base, donc à la diagonale [${A}${C}] de la base`,
    canvas: { kind: "pythagore_solide", solide: "pave_espace", sommets: s },
  };
}

const DEF_CACHE = (k: Cache) =>
  `Définition : ${k.pourquoi}. Le triangle ${k.tri} est donc rectangle en ${k.droit}.`;

// =========================================================================
// LA BANQUE
// =========================================================================
const base = {
  niveau: "3e" as const,
  matiere: "maths" as const,
  notionId: "pythagore_theoreme",
  microId: "pythagore_solide",
  theme: "neutral" as const,
};

export const pythagoreSolide3eBank: TutorBankItemV4[] = [
  // ---------- ★2 : voir le triangle ----------
  {
    ...base,
    kind: "fixed",
    id: "pythagore_solide_fixed_1_cone_vocabulaire",
    difficulty: 2,
    text: "Dans un cône de révolution, la hauteur, le rayon de la base et la génératrice forment un triangle rectangle.\nQuel segment est son hypoténuse ?",
    format: "qcm",
    choices: ["la génératrice", "la hauteur", "le rayon de la base", "le diamètre de la base"],
    expected: ["la génératrice"],
    comparator: "mcq_exact",
    hint: "L’angle droit est au centre de la base, entre la hauteur et le rayon.",
    explanation:
      "Définition : la hauteur d’un cône est perpendiculaire à sa base ; elle fait un angle droit avec le rayon.\n\n" +
      "Méthode : l’hypoténuse est le côté en face de l’angle droit, donc celui qui relie le sommet au bord de la base.\n\n" +
      "Calcul : génératrice² = hauteur² + rayon².\n\n" +
      "Conclusion : l’hypoténuse est la génératrice.",
    tags: ["pythagore_theoreme", "pythagore_solide", "cone", "qcm"],
    canvas: { kind: "pythagore_solide", solide: "cone", cotes: { droitHaut: "hauteur", droitBas: "rayon", hypotenuse: "génératrice" } },
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_reperer_hypotenuse",
    difficulty: 2,
    hint: "Repère d’abord l’angle droit : l’hypoténuse est le côté qui lui fait face.",
    tags: ["pythagore_theoreme", "pythagore_solide", "reperer", "qcm", "canvas"],
    generate: () => {
      const k = tirerCache();
      const question = randomChoice([
        `Le triangle ${k.tri} est rectangle. Quel segment est son hypoténuse ?`,
        `Pour appliquer Pythagore dans le triangle ${k.tri}, quel côté est l’hypoténuse ?`,
        `Dans le triangle ${k.tri}, quel segment est en face de l’angle droit ?`,
      ]);
      return {
        text: `${k.phrase}\n${question}`,
        format: "qcm",
        choices: shuffle([`[${k.hyp}]`, `[${k.c1}]`, `[${k.c2}]`]),
        expected: [`[${k.hyp}]`],
        comparator: "mcq_exact",
        explanation:
          `${DEF_CACHE(k)}\n\n` +
          `Méthode : l’hypoténuse est le côté opposé à l’angle droit, donc celui qui ne passe pas par ${k.droit}.\n\n` +
          `Calcul : les côtés [${k.c1}] et [${k.c2}] passent par ${k.droit} ; [${k.hyp}] non.\n\n` +
          `Conclusion : l’hypoténuse est [${k.hyp}].`,
        canvas: k.canvas,
      };
    },
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_reperer_angle_droit",
    difficulty: 2,
    hint: "Cherche le pied de la hauteur, de l’axe ou de l’arête verticale.",
    tags: ["pythagore_theoreme", "pythagore_solide", "reperer", "qcm", "canvas"],
    generate: () => {
      const k = tirerCache();
      const question = randomChoice([
        `Le triangle ${k.tri} est rectangle. En quel sommet ?`,
        `Où est l’angle droit du triangle ${k.tri} ?`,
      ]);
      return {
        text: `${k.phrase}\n${question}`,
        format: "qcm",
        choices: shuffle([`en ${k.droit}`, `en ${k.autres[0]}`, `en ${k.autres[1]}`]),
        expected: [`en ${k.droit}`],
        comparator: "mcq_exact",
        explanation:
          `${DEF_CACHE(k)}\n\n` +
          `Méthode : l’angle droit est au pied du segment perpendiculaire, entre [${k.c1}] et [${k.c2}].\n\n` +
          `Calcul : ces deux côtés se rejoignent en ${k.droit}.\n\n` +
          `Conclusion : le triangle ${k.tri} est rectangle en ${k.droit}.`,
        // Le codage de l'angle droit donnerait la réponse : on colorie sans coder.
        canvas: { ...k.canvas, coderAngleDroit: false },
      };
    },
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_reperer_egalite",
    difficulty: 2,
    hint: "Le carré de l’hypoténuse est seul d’un côté du signe égal.",
    tags: ["pythagore_theoreme", "pythagore_solide", "reperer", "egalite", "qcm", "canvas"],
    generate: () => {
      const k = tirerCache();
      const juste = `${k.hyp}² = ${k.c1}² + ${k.c2}²`;
      return {
        text: `${k.phrase}\n` + randomChoice([
          `Quelle égalité de Pythagore est juste dans le triangle ${k.tri} ?`,
          `Le triangle ${k.tri} est rectangle en ${k.droit}. Quelle égalité peut-on écrire ?`,
        ]),
        format: "qcm",
        choices: qcm(juste, [
          `${k.c1}² = ${k.hyp}² + ${k.c2}²`,
          `${k.c2}² = ${k.c1}² + ${k.hyp}²`,
          `${k.hyp} = ${k.c1} + ${k.c2}`,
        ]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          `${DEF_CACHE(k)}\n\n` +
          `Méthode : l’hypoténuse [${k.hyp}] est en face de l’angle droit ; son carré est la somme des carrés des deux autres côtés.\n\n` +
          `Calcul : ${juste}.\n\n` +
          `Conclusion : l’égalité juste est ${juste}. Sans les carrés, l’égalité est fausse.`,
        canvas: k.canvas,
      };
    },
  },

  // ---------- ★3 : une étape, dans le cône ou le pavé ----------
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_cone_generatrice",
    difficulty: 3,
    hint: "La génératrice est l’hypoténuse : on additionne les carrés de la hauteur et du rayon.",
    tags: ["pythagore_theoreme", "pythagore_solide", "cone", "hypotenuse", "canvas"],
    generate: () => questionCone("hyp", false),
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_cone_hauteur",
    difficulty: 3,
    hint: "La hauteur est un côté de l’angle droit : on soustrait les carrés.",
    tags: ["pythagore_theoreme", "pythagore_solide", "cone", "cote", "canvas"],
    generate: () => questionCone(randomChoice(["hauteur", "rayon"] as const), false),
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_pave_une_etape",
    difficulty: 3,
    hint: "L’arête verticale est perpendiculaire à la base : le triangle est rectangle au pied de cette arête.",
    tags: ["pythagore_theoreme", "pythagore_solide", "pave", "canvas"],
    generate: questionPaveUneEtape,
  },

  // ---------- ★4 : le brevet, la pyramide, deux étapes ----------
  {
    ...base,
    kind: "fixed",
    id: "pythagore_solide_fixed_2_brevet_2026",
    difficulty: 4,
    text:
      "Brevet 2026. Un gobelet a la forme d’un tronc de cône. On le prolonge vers le bas en un cône de sommet O. A est le centre de la petite base et D un point de son bord. On donne OD = 8,2 cm et AD = 1,8 cm.\nMontre que OA = 8 cm : combien vaut OA² ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "Le triangle OAD est rectangle en A : on cherche un côté de l’angle droit.",
    explanation:
      "Définition : l’axe [OA] est perpendiculaire à la petite base, donc le triangle OAD est rectangle en A, d’hypoténuse [OD].\n\n" +
      "Méthode : d’après le théorème de Pythagore dans le triangle OAD rectangle en A, OD² = OA² + AD², donc OA² = OD² − AD².\n\n" +
      "Calcul : OA² = 8,2² − 1,8² = 67,24 − 3,24 = 64.\n\n" +
      "Conclusion : OA² = 64, donc OA = √64 = 8 cm.",
    tags: ["pythagore_theoreme", "pythagore_solide", "gobelet", "brevet"],
    canvas: { kind: "pythagore_solide", solide: "gobelet", cotes: { droitHaut: "?", droitBas: "1,8 cm", hypotenuse: "8,2 cm" } },
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_gobelet",
    difficulty: 4,
    hint: "Le triangle est rectangle au centre de la petite base. Attention aux carrés des décimaux.",
    tags: ["pythagore_theoreme", "pythagore_solide", "gobelet", "brevet", "canvas"],
    generate: questionGobelet,
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_pyramide",
    difficulty: 4,
    hint: "La hauteur tombe au centre de la base. Prends la MOITIÉ de la diagonale ou du côté.",
    tags: ["pythagore_theoreme", "pythagore_solide", "pyramide", "canvas"],
    generate: questionPyramide,
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_pave_deux_etapes",
    difficulty: 4,
    hint: "D’abord la diagonale de la base, puis la grande diagonale. Garde le carré sans prendre la racine.",
    tags: ["pythagore_theoreme", "pythagore_solide", "pave", "deux_etapes", "canvas"],
    generate: questionPaveDeuxEtapes,
  },

  // ---------- ★5 : défis ----------
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_defi_pave_objet",
    difficulty: 5,
    hint: "Le plus long segment dans un pavé est sa grande diagonale.",
    tags: ["pythagore_theoreme", "pythagore_solide", "pave", "defi", "canvas"],
    generate: questionPaveObjet,
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_defi_cone_arrondi",
    difficulty: 5,
    hint: "Repère l’hypoténuse, calcule le carré, puis arrondis seulement à la fin.",
    tags: ["pythagore_theoreme", "pythagore_solide", "cone", "arrondi", "defi", "canvas"],
    generate: () => questionCone(randomChoice(["hyp", "hauteur", "rayon"] as const), true),
  },
  {
    ...base,
    kind: "template",
    id: "pythagore_solide_tpl_defi_pyramide_arete",
    difficulty: 5,
    hint: "Trois étapes : la diagonale de la base, sa moitié, puis l’arête.",
    tags: ["pythagore_theoreme", "pythagore_solide", "pyramide", "arrondi", "defi", "canvas"],
    generate: questionPyramideArete,
  },
];
