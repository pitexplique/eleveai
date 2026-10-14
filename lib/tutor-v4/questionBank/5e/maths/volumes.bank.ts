// lib/tutor-v4/question-banks/maths/5e/volumes.bank.ts

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, pick, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Ajouté le 04/08/2026 : le gabarit du pavé droit proposait deux fois la même
// valeur quand deux pièges tombaient d'accord (un cube, par exemple, où l'aire
// de la base égale une autre proposition). On dédoublonne les distracteurs, et
// la bonne réponse ne passe jamais à la trappe.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function solideCanvas(
  params: Omit<Solide3DCanvasData, "kind">
): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    ...params,
  };
}

function expl(calcul: string) {
  return (
    "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
    "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : le volume ou la grandeur obtenu répond à la question."
  );
}

/* ⭐ 13/10/2026 — LA VARIÉTÉ ET LES UNITÉS.
   Mesuré le 13/10 : 7 à 12 squelettes par micro, jusqu'à 18 répétitions sur 20
   (« Calculer le volume du pavé droit. » revenait mot pour mot ; les étoiles 1
   de volume_comprendre n'avaient que des questions figées). Chaque gabarit
   compose maintenant une SITUATION (aquarium, boîte, tente, canette, citerne…)
   × une TOURNURE × un PRÉNOM ; les dimensions sont tirées, plausibles pour
   l'objet ; la réponse porte son unité (« 120 cm³ », « 60 L ») ; les étiquettes
   du solide dessiné sont celles du texte. Le correcteur
   (correcteurs/volumes.ts) relit le texte et la figure et refait le calcul. */

const rnd = randomInt;
/** 3 538 ; 12,5 — virgule française, espace des milliers. */
const fr = (x: number) => {
  const [e, d] = String(Math.round(x * 1000) / 1000).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? `,${d}` : "");
};
const Maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");

/** Un objet : son nom avec article, l'unité de ses longueurs et leur plage. */
type Obj = { un: string; le: string; u: "cm" | "dm" | "m"; min: number; max: number; hmax?: number };
const PAVES: Obj[] = [
  { un: "une boîte à chaussures", le: "la boîte à chaussures", u: "cm", min: 10, max: 35 },
  { un: "un aquarium", le: "l’aquarium", u: "cm", min: 20, max: 80 },
  { un: "une brique de jus", le: "la brique de jus", u: "cm", min: 4, max: 20 },
  { un: "un carton de déménagement", le: "le carton de déménagement", u: "cm", min: 30, max: 60 },
  { un: "une piscine", le: "la piscine", u: "m", min: 1, max: 10, hmax: 3 },
  { un: "un conteneur", le: "le conteneur", u: "m", min: 2, max: 12, hmax: 3 },
  { un: "un coffre à jouets", le: "le coffre à jouets", u: "dm", min: 3, max: 10 },
  { un: "une boîte de mouchoirs", le: "la boîte de mouchoirs", u: "cm", min: 8, max: 25 },
  { un: "un bac à sable", le: "le bac à sable", u: "dm", min: 3, max: 15, hmax: 5 },
  { un: "une valise", le: "la valise", u: "cm", min: 20, max: 70 },
  { un: "une citerne d’eau de pluie à La Réunion", le: "la citerne", u: "m", min: 1, max: 4 },
  { un: "un tiroir", le: "le tiroir", u: "cm", min: 10, max: 50 },
];
const PRISMES: Obj[] = [
  { un: "une tente canadienne", le: "la tente", u: "m", min: 1, max: 4 },
  { un: "une barre de chocolat triangulaire", le: "la barre de chocolat", u: "cm", min: 2, max: 20 },
  { un: "un toit de cabane", le: "le toit", u: "m", min: 1, max: 5 },
  { un: "une part de fromage", le: "la part de fromage", u: "cm", min: 3, max: 12 },
  { un: "une rampe de skate", le: "la rampe", u: "m", min: 1, max: 4 },
  { un: "une serre de jardin", le: "la serre", u: "m", min: 1, max: 6 },
  { un: "un presse-papier en verre", le: "le presse-papier", u: "cm", min: 3, max: 12 },
  { un: "un prisme de verre de physique", le: "le prisme", u: "cm", min: 2, max: 10 },
  { un: "une cale de porte", le: "la cale", u: "cm", min: 2, max: 15 },
];
// Cylindres : min / max = la HAUTEUR ; rmin / rmax = le RAYON.
const CYLINDRES: (Obj & { rmin: number; rmax: number })[] = [
  { un: "une boîte de conserve", le: "la boîte de conserve", u: "cm", min: 8, max: 15, rmin: 3, rmax: 6 },
  { un: "un verre", le: "le verre", u: "cm", min: 8, max: 15, rmin: 3, rmax: 5 },
  { un: "une bougie", le: "la bougie", u: "cm", min: 5, max: 20, rmin: 2, rmax: 6 },
  { un: "un puits", le: "le puits", u: "m", min: 3, max: 12, rmin: 1, rmax: 2 },
  { un: "une piscine ronde", le: "la piscine ronde", u: "m", min: 1, max: 2, rmin: 2, rmax: 5 },
  { un: "une canette", le: "la canette", u: "cm", min: 10, max: 17, rmin: 3, rmax: 4 },
  { un: "un seau", le: "le seau", u: "cm", min: 20, max: 35, rmin: 10, rmax: 16 },
  { un: "un château d’eau", le: "le château d’eau", u: "m", min: 5, max: 15, rmin: 3, rmax: 8 },
  { un: "une boîte à biscuits ronde", le: "la boîte à biscuits", u: "cm", min: 6, max: 15, rmin: 8, rmax: 15 },
  { un: "un tambour", le: "le tambour", u: "cm", min: 15, max: 40, rmin: 10, rmax: 25 },
];
/** Une mesure entière dans la plage de l'objet. */
const dim = (o: Obj) => rnd(o.min, o.max);
/** « de la boîte », « du carton », « de l’aquarium ». */
const deLe = (o: Obj) => (o.le.startsWith("le ") ? `du ${o.le.slice(3)}` : `de ${o.le}`);
const TOUS: Obj[] = [...PAVES, ...PRISMES, ...CYLINDRES];

/** Un pavé de la vie courante, ses trois dimensions (largeur ≤ longueur), une phrase d'introduction. */
function paveSituation() {
  const p = pick(PRENOMS);
  const o = pick(PAVES);
  const a = dim(o), b = dim(o);
  const [L, l] = a >= b ? [a, b] : [b, a];
  const h = rnd(o.min, o.hmax ?? o.max);
  const intro = pick([
    `${p.nom} range ses affaires dans ${o.un}.`,
    `${p.nom} veut remplir ${o.un}.`,
    `${p.nom} a ${o.un} en forme de pavé droit.`,
    `Pour un exposé, ${p.nom} étudie ${o.un}.`,
    `${p.nom} mesure ${o.un}.`,
  ]);
  return { p, o, L, l, h, u: o.u, intro };
}
function canvasPave(L: number, l: number, h: number, u: string, formule = false) {
  return solideCanvas({
    solide: "pave_droit",
    dimensions: { longueur: L, largeur: l, hauteur: h, aireBase: L * l, volume: L * l * h },
    labels: { longueur: `${fr(L)} ${u}`, largeur: `${fr(l)} ${u}`, hauteur: `${fr(h)} ${u}`, aireBase: `${fr(L * l)} ${u}²` },
    highlight: { base: true, hauteur: true },
    display: { showLabels: true, showDimensions: true, showFormulaHint: formule },
  });
}
/** Un prisme droit de la vie courante : base triangulaire b × t ÷ 2, hauteur du prisme h. */
function prismeSituation() {
  const p = pick(PRENOMS);
  const o = pick(PRISMES);
  const b = dim(o), t = dim(o), h = dim(o);
  const intro = pick([
    `${p.nom} observe ${o.un}, qui a la forme d’un prisme droit.`,
    `${Maj(o.le)} ${de(p.nom)} a la forme d’un prisme droit à base triangulaire.`,
    `Pour un exposé, ${p.nom} étudie ${o.un} en forme de prisme droit.`,
    `${p.nom} mesure ${o.un} : c’est un prisme droit.`,
  ]);
  return { p, o, b, t, h, B: (b * t) / 2, u: o.u, intro };
}
/** Un cylindre de la vie courante : rayon r (la moitié de la plage), hauteur h. */
function cylSituation() {
  const p = pick(PRENOMS);
  const o = pick(CYLINDRES);
  const r = rnd(o.rmin, o.rmax);
  const h = rnd(o.min, o.max);
  const intro = pick([
    `${p.nom} observe ${o.un}, qui a la forme d’un cylindre.`,
    `${Maj(o.le)} ${de(p.nom)} a la forme d’un cylindre.`,
    `Pour un exposé, ${p.nom} étudie ${o.un} en forme de cylindre.`,
    `${p.nom} mesure ${o.un} : c’est un cylindre.`,
  ]);
  return { p, o, r, h, u: o.u, intro };
}
function canvasBaseHauteur(solide: "prisme" | "cylindre", B: string, h: number, u: string, extra: Record<string, string> = {}) {
  return solideCanvas({
    solide,
    labels: { aireBase: B, hauteur: `${fr(h)} ${u}`, ...extra },
    highlight: { base: true, hauteur: true },
    display: { showLabels: true, showDimensions: true, showFormulaHint: true },
  });
}

const Q_VOL = (o: Obj) => pick(["Quel est son volume ?", `Calcule le volume ${deLe(o)}.`, `Quel est le volume ${deLe(o)} ?`]);

/** Des cubes unités empilés en pavé : a en longueur, b en largeur, c étages. */
function cubesPave(a: number, b: number, c: number) {
  const cubes: { x: number; y: number; z: number }[] = [];
  for (let z = 0; z < c; z++) for (let y = 0; y < b; y++) for (let x = 0; x < a; x++) cubes.push({ x, y, z });
  return cubes;
}

export const volumesBank: TutorBankItemV4[] = [
  /* =========================
     VOLUME_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure le volume d’un solide ?",
    format: "qcm",
    choices: [
      "la place occupée dans l’espace",
      "la longueur du contour",
      "la surface d’une face",
      "la masse du solide",
    ],
    expected: ["la place occupée dans l’espace"],
    comparator: "mcq_exact",
    hint: "Un volume concerne un objet en trois dimensions.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume mesure la place occupée par un solide dans l’espace. Il s’exprime avec des unités cubes comme cm³, dm³ ou m³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression correspond à un volume ?",
    format: "qcm",
    choices: ["12 cm", "12 cm²", "12 cm³", "12 kg"],
    expected: ["12 cm³"],
    comparator: "mcq_exact",
    hint: "Le petit 3 indique une unité de volume.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Une longueur s’exprime en cm, une aire en cm², une masse en kg. Un volume s’exprime en cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 12 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque petit cube compte pour 1 unité de volume.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume en cubes unités correspond au nombre total de cubes. Ici, il y a 12 cubes, donc le volume vaut 12 unités de volume.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "assemblage_cubes",
      cubes: [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 2, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 0, z: 1 },
        { x: 2, y: 0, z: 1 },
        { x: 0, y: 1, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: 2, y: 1, z: 1 },
      ],
      display: { showLabels: true },
    }),
    tags: ["volume", "cubes_unite", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On calcule 2 cm × 3 cm × 4 cm.\nQuel est le résultat ?",
    format: "qcm",
    choices: ["24 cm³", "24 cm²", "24 cm", "9 cm"],
    expected: ["24 cm³"],
    comparator: "mcq_exact",
    hint: "On multiplie trois longueurs : cm × cm × cm.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on multiplie trois longueurs, donc l’unité est cm × cm × cm = cm³.\n\nCalcul : " +
          ("2 × 3 × 4 = 24. Trois longueurs multipliées donnent des cm³. 9 cm, c’est l’addition 2 + 3 + 4.") +
          "\n\nConclusion : le résultat est 24 cm³.",
    tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    // 13/10 : des cubes de 1 cm³ (1 dm³, 1 m³) rangés en pavé ; le texte dit
    // combien en longueur, en largeur et d'étages (les cubes cachés se comptent).
    generate: () => {
      const p = pick(PRENOMS);
      const a = rnd(2, 5), b = rnd(1, 3), c = rnd(1, 4);
      const n = a * b * c;
      const [quoi, u] = pick([
        [`${p.nom} empile des cubes en bois de 1 cm³.`, "cm"],
        [`Dans un entrepôt, des caisses cubiques de 1 m³ sont rangées. ${p.nom} les compte.`, "m"],
        [`${p.nom} construit un mur avec des morceaux de sucre de 1 cm³.`, "cm"],
        [`${p.nom} range des boîtes cubiques de 1 dm³ dans un placard.`, "dm"],
        [`${p.nom} assemble des dés de 1 cm³.`, "cm"],
        [`${p.nom} empile des briques de jeu cubiques de 1 cm³.`, "cm"],
        [`Sur un quai, des conteneurs cubiques de 1 m³ sont empilés. ${p.nom} les observe.`, "m"],
        [`${p.nom} remplit un carton avec des boîtes cubiques de 1 dm³.`, "dm"],
      ] as const);
      const etages = `${c} étage${c > 1 ? "s" : ""}`;
      const question = pick(["Quel est le volume du solide ?", "Quel volume occupe l’ensemble ?", "Calcule le volume de l’empilement."]);
      return {
        text: `${quoi} Il y a ${a} cubes en longueur, ${b} en largeur et ${etages}. ${question}`,
        format: "short",
        expected: [`${n} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Un étage contient ${a} × ${b} = ${a * b} cubes ; avec ${etages} : ${a * b} × ${c} = ${n} cubes de 1 ${u}³. Le volume est ${n} ${u}³.`),
        canvas: solideCanvas({ solide: "assemblage_cubes", cubes: cubesPave(a, b, c), display: { showLabels: true } }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une aire est en unités carrées, un volume en unités cubes.",
    tags: ["volume", "aire_volume", "template", "qcm"],
    // 13/10 : un objet, l'unité de ses longueurs, et l'unité de son volume.
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(TOUS);
      const correct = `${o.u}³`;
      const mot = { cm: "centimètres", dm: "décimètres", m: "mètres" }[o.u];
      const text = pick([
        `${p.nom} mesure les dimensions ${deLe(o)} en ${mot}. En quelle unité son volume s’exprime-t-il ?`,
        `Les longueurs ${deLe(o)} sont en ${mot}. ${p.nom} calcule le volume : dans quelle unité ?`,
        `${p.nom} calcule le volume ${deLe(o)} avec des longueurs en ${mot}. Quelle unité écrit-${ilElle(p)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([o.u, `${o.u}²`, correct, "kg"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: expl(`Avec des longueurs en ${mot} (${o.u}), une aire s’écrit en ${o.u}² et un volume en ${o.u}³ (trois longueurs multipliées).`),
      };
    },
  },

  // 13/10/2026 : l'étoile 1 n'avait que des questions figées.
  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_3_grandeur",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une longueur : cm. Une surface : cm². La place occupée : cm³.",
    tags: ["volume", "unite", "grandeur", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(PAVES);
      const [quoi, sorte] = pick([
        [`la hauteur ${deLe(o)}`, 1],
        [`la longueur ${deLe(o)}`, 1],
        [`la surface d’une face ${deLe(o)}`, 2],
        [`l’aire du fond ${deLe(o)}`, 2],
        [`la place occupée par ${o.le}`, 3],
        [`le volume ${deLe(o)}`, 3],
        [`l’espace à l’intérieur ${deLe(o)}`, 3],
      ] as const);
      const juste = sorte === 1 ? o.u : `${o.u}${sorte === 2 ? "²" : "³"}`;
      const question = pick(["Quelle unité convient ?", "Dans quelle unité l’écrire ?", "Quelle unité choisir ?"]);
      return {
        text: `${p.nom} mesure ${quoi}. ${question}`,
        format: "qcm",
        choices: shuffle([o.u, `${o.u}²`, `${o.u}³`, "kg"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(
          sorte === 1
            ? `C’est une longueur : elle s’écrit en ${o.u}.`
            : sorte === 2
              ? `C’est une surface (une aire) : elle s’écrit en ${o.u}².`
              : `C’est la place occupée dans l’espace, un volume : il s’écrit en ${o.u}³.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_4_facteurs",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux longueurs multipliées : unité². Trois longueurs : unité³.",
    tags: ["volume", "unite", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(PAVES);
      const n = pick([2, 3, 3]);
      let f: number[];
      do f = Array.from({ length: n }, () => rnd(Math.max(2, Math.min(o.min, 12)), Math.min(o.max, 30)));
      while (f.reduce((s, x) => s * x, 1) === f.reduce((s, x) => s + x, 0));
      const P = f.reduce((s, x) => s * x, 1);
      const S = f.reduce((s, x) => s + x, 0);
      const juste = `${fr(P)} ${o.u}${n === 2 ? "²" : "³"}`;
      const calc = f.map((x) => `${x} ${o.u}`).join(" × ");
      const text = pick([
        `Pour ${o.le}, ${p.nom} calcule ${calc}. Quel est le résultat ?`,
        `${p.nom} multiplie des dimensions ${deLe(o)} : ${calc}. Quel résultat écrit-${ilElle(p)} ?`,
        `On calcule ${calc} pour ${o.le} ${de(p.nom)}. Quel est le résultat, avec son unité ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([`${fr(P)} ${o.u}`, `${fr(P)} ${o.u}²`, `${fr(P)} ${o.u}³`, `${fr(S)} ${o.u}`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(
          `${f.join(" × ")} = ${fr(P)}. On multiplie ${n} longueurs, donc l’unité est ${o.u}${n === 2 ? " × " + o.u + " = " + o.u + "² (une aire)" : " × " + o.u + " × " + o.u + " = " + o.u + "³ (un volume)"}. ${fr(S)} ${o.u}, c’est l’addition.`,
        ),
      };
    },
  },

  /* =========================
     VOLUME_PAVE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure 6 cm de longueur, 4 cm de largeur et 3 cm de hauteur. Quel est son volume ?",
    format: "qcm",
    choices: ["13 cm³", "24 cm³", "72 cm³", "36 cm³"],
    expected: ["72 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 6 × 4 × 3 = 72 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 6, largeur: 4, hauteur: 3 },
      labels: {
        longueur: "6 cm",
        largeur: "4 cm",
        hauteur: "3 cm",
        aireBase: "24 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "pave_droit", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit a pour dimensions 5 cm, 3 cm et 2 cm. Calculer son volume.",
    format: "short",
    expected: ["30 cm³", "30"],
    comparator: "number_equal",
    hint: "Multiplie les trois dimensions.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume d’un pavé droit se calcule avec longueur × largeur × hauteur. Donc V = 5 × 3 × 2 = 30 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 5, largeur: 3, hauteur: 2, volume: 30 },
      labels: {
        longueur: "5 cm",
        largeur: "3 cm",
        hauteur: "2 cm",
        aireBase: "15 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "pave_droit", "short", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le volume d’un pavé droit de dimensions 5 cm, 4 cm et 3 cm. Il écrit : 5 + 4 + 3 = 12 cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume de pavé droit, on ne fait pas une addition.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Non. Pour un pavé droit, on multiplie les trois dimensions : 5 × 4 × 3 = 60 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "pave_droit", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un pavé droit mesure 4 cm, 3 cm et 5 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["60 cm³", "60 cm²", "12 cm", "20 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "Utilise la formule longueur × largeur × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : volume du pavé droit = longueur × largeur × hauteur.\n\nCalcul : " +
          ("4 × 3 × 5 = 60, donc 60 cm³. 12 cm, c’est l’addition 4 + 3 + 5. 20 cm³ oublie une dimension.") +
          "\n\nConclusion : le volume est 60 cm³.",
    tags: ["volume", "pave_droit", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_pave_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template", "canvas"],
    // 13/10 : situation × tournure × prénom ; les étiquettes du dessin sont celles du texte.
    generate: () => {
      const { o, L, l, h, u, intro } = paveSituation();
      const V = L * l * h;
      return {
        text: `${intro} ${Maj(o.le)} mesure ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut. ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Volume = longueur × largeur × hauteur = ${L} × ${l} × ${h} = ${fr(V)} ${u}³.`),
        canvas: canvasPave(L, l, h, u, true),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_pave_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer l’aire de la base.",
    tags: ["volume", "pave_droit", "aire_base", "template", "canvas"],
    // 13/10 : le fond (un rectangle) puis la hauteur : aire de base × hauteur.
    generate: () => {
      const { o, L, l, h, u, intro } = paveSituation();
      const B = L * l, V = B * h;
      const donnees = pick([
        `Le fond ${deLe(o)} est un rectangle de ${L} ${u} sur ${l} ${u}, et sa hauteur est ${h} ${u}.`,
        `Sa hauteur est ${h} ${u} et son fond est un rectangle de ${L} ${u} sur ${l} ${u}.`,
      ]);
      return {
        text: `${intro} ${donnees} ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Aire de base = ${L} × ${l} = ${fr(B)} ${u}². Volume = aire de base × hauteur = ${fr(B)} × ${h} = ${fr(V)} ${u}³.`),
        canvas: canvasPave(L, l, h, u),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_pave_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne pas additionner : il faut multiplier.",
    tags: ["volume", "pave_droit", "qcm", "template", "piege"],
    // 13/10 : situations tirées ; leurres = somme, aire du fond, unité d'aire, double.
    generate: () => {
      const { o, L, l, h, u, intro } = paveSituation();
      const V = L * l * h;
      const good = `${fr(V)} ${u}³`;
      return {
        text: `${intro} ${Maj(o.le)} mesure ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut. ${pick(["Quel est son volume ?", "Choisis son volume.", "Quel volume est juste ?"])}`,
        format: "qcm",
        choices: makeChoices(good, [`${fr(L + l + h)} ${u}³`, `${fr(L * l)} ${u}³`, `${fr(V)} ${u}²`, `${fr(2 * V)} ${u}³`, `${fr(V + h)} ${u}³`]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: expl(`Il faut multiplier les trois dimensions : ${L} × ${l} × ${h} = ${fr(V)} ${u}³. ${fr(L + l + h)}, c’est l’addition ; ${fr(L * l)}, c’est seulement l’aire du fond.`),
      };
    },
  },

  /* =========================
     VOLUME_PRISME
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 15 cm² et une hauteur de 8 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["23 cm³", "60 cm³", "120 cm³", "45 cm³"],
    expected: ["120 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 15 × 8 = 120 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 15, hauteur: 8, volume: 120 },
      labels: {
        aireBase: "15 cm²",
        hauteur: "8 cm",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "prisme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer le volume d’un prisme droit, quelle formule peut-on utiliser ?",
    format: "qcm",
    choices: [
      "Volume = aire de base × hauteur",
      "Volume = périmètre de base × hauteur",
      "Volume = aire de base + hauteur",
      "Volume = longueur + largeur + hauteur",
    ],
    expected: ["Volume = aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On imagine qu’on empile la même base sur une hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume d’un prisme droit se calcule avec la formule : Volume = aire de base × hauteur.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "prisme", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_prisme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "prisme", "template", "canvas"],
    // 13/10 : situation × tournure × prénom ; aire de base et hauteur données.
    generate: () => {
      const { o, B, h, u, intro } = prismeSituation();
      const V = B * h;
      const donnees = pick([
        `L’aire de sa base est ${fr(B)} ${u}² et la hauteur du prisme est ${fr(h)} ${u}.`,
        `La hauteur du prisme est ${fr(h)} ${u} et l’aire de sa base est ${fr(B)} ${u}².`,
      ]);
      return {
        text: `${intro} ${donnees} ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Volume = aire de base × hauteur = ${fr(B)} × ${fr(h)} = ${fr(V)} ${u}³.`),
        canvas: canvasBaseHauteur("prisme", `${fr(B)} ${u}²`, h, u),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_prisme_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "La base est un triangle : aire = base × hauteur ÷ 2.",
    tags: ["volume", "prisme", "triangle_base", "template", "canvas"],
    // 13/10 : la base triangulaire est donnée par sa base et sa hauteur : deux étapes.
    generate: () => {
      const { o, b, t, h, B, u, intro } = prismeSituation();
      const V = B * h;
      return {
        text: `${intro} Sa base est un triangle de base ${b} ${u} et de hauteur ${t} ${u} ; la hauteur du prisme est ${h} ${u}. ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Aire de la base triangulaire = ${b} × ${t} ÷ 2 = ${fr(B)} ${u}². Volume = ${fr(B)} × ${h} = ${fr(V)} ${u}³.`),
        canvas: canvasBaseHauteur("prisme", `${fr(B)} ${u}²`, h, u),
      };
    },
  },
    /* =========================
     VOLUME_CYLINDRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 20 cm² et une hauteur de 6 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["26 cm³", "60 cm³", "120 cm³", "140 cm³"],
    expected: ["120 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 20 × 6 = 120 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { aireBase: 20, hauteur: 6 },
      labels: {
        aireBase: "20 cm²",
        hauteur: "6 cm",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un cylindre a un rayon de 3 cm et une hauteur de 5 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["45π cm³", "15π cm³", "30π cm³", "180π cm³"],
    expected: ["45π cm³"],
    comparator: "mcq_exact",
    hint: "Aire de base = π × r².",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : volume du cylindre = π × rayon × rayon × hauteur.\n\nCalcul : " +
          ("Aire de base = π × 3 × 3 = 9π cm². Volume = 9π × 5 = 45π cm³. 15π oublie le carré du rayon. 30π calcule 3 × 2 au lieu de 3 × 3. 180π prend le diamètre 6 cm comme rayon.") +
          "\n\nConclusion : le volume est 45π cm³.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 3, hauteur: 5 },
      labels: {
        rayon: "3 cm",
        hauteur: "5 cm",
        aireBase: "9π cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "pi", "canvas"],
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "cylindre", "template", "canvas"],
    // 13/10 : situation × tournure × prénom ; l'aire du disque de base (arrondie) est donnée.
    generate: () => {
      const { o, r, h, u, intro } = cylSituation();
      const B = Math.max(1, Math.round(3.14 * r * r));
      const V = B * h;
      const donnees = pick([
        `L’aire de sa base est ${fr(B)} ${u}² et sa hauteur est ${h} ${u}.`,
        `Sa hauteur est ${h} ${u} et l’aire de son disque de base est ${fr(B)} ${u}².`,
      ]);
      return {
        text: `${intro} ${donnees} ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Volume = aire de base × hauteur = ${fr(B)} × ${h} = ${fr(V)} ${u}³.`),
        canvas: canvasBaseHauteur("cylindre", `${fr(B)} ${u}²`, h, u),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base d’un disque : π × r².",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    // 13/10 : situations tirées ; QCM en π, leurres = vraies erreurs (08/10, Frédéric).
    generate: () => {
      const { o, r, h, u, intro } = cylSituation();
      const k = r * r * h;
      const bonne = `${fr(k)}π ${u}³`;
      return {
        text: `${intro} Son rayon est ${r} ${u} et sa hauteur est ${h} ${u}. ${pick(["Quel est son volume ?", "Choisis son volume.", `Quel est le volume ${deLe(o)} ?`])}`,
        format: "qcm",
        choices: makeChoices(bonne, [`${fr(r * h)}π ${u}³`, `${fr(2 * r * h)}π ${u}³`, `${fr(4 * k)}π ${u}³`, `${fr(k)}π ${u}²`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation:
          "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : volume du cylindre = π × rayon × rayon × hauteur.\n\nCalcul : " +
          `Aire de base = π × ${r} × ${r} = ${fr(r * r)}π ${u}². Volume = ${fr(r * r)}π × ${h} = ${fr(k)}π ${u}³.` +
          `\n\nConclusion : le volume est ${fr(k)}π ${u}³.`,
        canvas: canvasBaseHauteur("cylindre", `${fr(r * r)}π ${u}²`, h, u, { rayon: `${r} ${u}` }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_erreur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le rayon n’est pas le diamètre.",
    tags: ["volume", "cylindre", "diametre", "piege", "template"],
    // 13/10 : situations tirées ; le piège reste le diamètre pris pour le rayon (08/10).
    // Le dessin n'affiche que le diamètre et la hauteur : le rayon se calcule.
    generate: () => {
      const { o, r, h, u, intro } = cylSituation();
      const d = 2 * r;
      const k = r * r * h;
      const bonne = `${fr(k)}π ${u}³`;
      return {
        text: `${intro} Son diamètre est ${d} ${u} et sa hauteur est ${h} ${u}. ${pick(["Quel est son volume ?", "Choisis son volume.", `Quel est le volume ${deLe(o)} ?`])}`,
        format: "qcm",
        choices: makeChoices(bonne, [`${fr(d * d * h)}π ${u}³`, `${fr(r * h)}π ${u}³`, `${fr(d * h)}π ${u}³`, `${fr(k)}π ${u}²`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation:
          "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on trouve d’abord le rayon, puis volume = π × rayon × rayon × hauteur.\n\nCalcul : " +
          `Le rayon vaut ${d} ÷ 2 = ${r} ${u}. Volume = π × ${r} × ${r} × ${h} = ${fr(k)}π ${u}³. ${fr(d * d * h)}π prend le diamètre comme rayon.` +
          `\n\nConclusion : le volume est ${fr(k)}π ${u}³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          labels: { diametre: `${d} ${u}`, hauteur: `${h} ${u}` },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_cylindre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Le disque de base d’un cylindre a une aire de 28 cm². Le cylindre a une hauteur de 10 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["280 cm³", "38 cm³", "280 cm²"],
    expected: ["280 cm³"],
    comparator: "mcq_exact",
    hint: "On empile le disque de base sur toute la hauteur : aire de base × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : volume du cylindre = aire du disque de base × hauteur.\n\nCalcul : " +
          ("28 × 10 = 280, donc 280 cm³. 38, c’est l’addition 28 + 10. Un volume s’écrit en cm³, pas en cm².") +
          "\n\nConclusion : le volume est 280 cm³.",
    tags: ["volume", "cylindre", "qcm"],
  },

  /* =========================
     VOLUME_ASSEMBLAGE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide est formé d’un pavé droit de 40 cm³ et d’un prisme droit de 30 cm³. Quel est le volume total ?",
    format: "short",
    expected: ["70 cm³", "70"],
    comparator: "number_equal",
    hint: "On additionne les deux volumes.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume total d’un assemblage est la somme des volumes des solides qui le composent : 40 + 30 = 70 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "assemblage", "short"],
  },

  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On colle deux pavés droits de volumes 24 cm³ et 36 cm³. Quel volume obtient-on ?",
    format: "qcm",
    choices: ["12 cm³", "48 cm³", "60 cm³", "864 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "On ajoute les volumes, on ne les multiplie pas.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Quand on assemble deux solides sans superposition, on additionne les volumes : 24 + 36 = 60 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "assemblage", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les volumes.",
    tags: ["volume", "assemblage", "template"],
    // 13/10 : deux blocs collés d'un objet réel ; on additionne.
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, a, b, u, min, max] = pick([
        ["La maison de poupée", "le corps", "le toit", "dm", 4, 40],
        ["Le château de sable", "la tour", "le mur", "dm", 5, 60],
        ["La fusée en briques", "le corps", "la pointe", "cm", 20, 300],
        ["Le meuble à chaussures", "le grand caisson", "le petit caisson", "dm", 20, 200],
        ["La statue en pâte à modeler", "le socle", "le personnage", "cm", 30, 400],
        ["Le bonhomme de neige", "le corps", "la tête", "dm", 10, 300],
        ["La cabane du jardin", "la partie basse", "le toit", "m", 2, 20],
        ["Le gâteau d’anniversaire", "l’étage du bas", "l’étage du haut", "cm", 500, 4000],
      ] as const);
      const v1 = rnd(min, max), v2 = rnd(min, max);
      const total = v1 + v2;
      const text = pick([
        `${objet} ${de(p.nom)} est formé de deux blocs collés : ${a} de ${fr(v1)} ${u}³ et ${b} de ${fr(v2)} ${u}³. Quel est son volume total ?`,
        `${p.nom} fabrique un objet : ${a} mesure ${fr(v1)} ${u}³ et ${b} mesure ${fr(v2)} ${u}³. Quel est le volume de l’objet entier ?`,
        `${objet} ${de(p.nom)} : ${a} a un volume de ${fr(v1)} ${u}³, ${b} un volume de ${fr(v2)} ${u}³. Calcule le volume total.`,
      ]).replace("est formé", /^La /.test(objet) ? "est formée" : "est formé");
      return {
        text,
        format: "short",
        expected: [`${fr(total)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Les deux blocs ne se chevauchent pas : on additionne les volumes. ${fr(v1)} + ${fr(v2)} = ${fr(total)} ${u}³.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord chaque volume séparément.",
    tags: ["volume", "assemblage", "pave_prisme", "template"],
    // 13/10 : une maison (maquette, cabane, niche…) = un pavé surmonté d'un toit prisme.
    // Le toit a la même longueur que le pavé ; sa base est un triangle de la largeur du pavé.
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, u, min, max] = pick([
        ["la maquette de maison", "cm", 4, 20],
        ["la cabane du jardin", "m", 1, 4],
        ["la niche du chien", "dm", 4, 12],
        ["le nichoir", "cm", 10, 25],
        ["le chalet en pain d’épices", "cm", 5, 20],
        ["la grange miniature", "dm", 2, 9],
      ] as const);
      const L = rnd(min, max), l = rnd(min, max), h = rnd(min, max);
      const t = rnd(Math.max(1, Math.round(min / 2)), Math.max(2, Math.round(max / 2)));
      const B = (l * t) / 2;
      const vP = L * l * h, vT = B * L, total = vP + vT;
      const text =
        `${Maj(objet)} ${de(p.nom)} est formée d’un pavé droit de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut, ` +
        `surmonté d’un toit en prisme droit : sa base a une aire de ${fr(B)} ${u}² et la hauteur du prisme est ${L} ${u}. ` +
        pick(["Quel est le volume total ?", "Calcule le volume de l’ensemble.", `Quel est le volume ${objet.startsWith("le ") ? `du ${objet.slice(3)}` : `de ${objet}`} ?`]);
      return {
        text: objet.startsWith("le ") ? text.replace("est formée", "est formé") : text,
        format: "short",
        expected: [`${fr(total)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Pavé : ${L} × ${l} × ${h} = ${fr(vP)} ${u}³. Toit : ${fr(B)} × ${L} = ${fr(vT)} ${u}³. Total : ${fr(vP)} + ${fr(vT)} = ${fr(total)} ${u}³.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux parties du réservoir.",
    tags: ["volume", "assemblage", "reunion", "template"],
    // 13/10 : deux contenants, l'un en m³ (ou dm³), l'autre en litres : convertir avant
    // d'additionner. La Réunion n'est plus qu'un contexte sur sept.
    generate: () => {
      const p = pick(PRENOMS);
      const [cadre, a, b] = pick([
        ["À La Réunion, dans la cour", "une cuve d’eau de pluie", "un tonneau"],
        ["Dans le camping-car", "le réservoir principal", "un réservoir de secours"],
        ["Au collège", "le grand bac de l’aquarium", "le petit bac"],
        ["Au jardin", "un récupérateur d’eau", "un tonneau"],
        ["À la ferme", "un abreuvoir", "une petite citerne"],
        ["Sur le bateau", "le réservoir d’eau douce", "une cuve de secours"],
        ["À la piscine gonflable", "le grand bassin", "la pataugeoire"],
      ] as const);
      const enM3 = Math.random() < 0.5;
      const v1 = enM3 ? rnd(2, 30) / 10 : rnd(20, 900); // m³ (dixièmes) ou dm³
      const v2 = rnd(5, 400); // L
      const v1L = enM3 ? Math.round(v1 * 1000) : v1;
      const total = v1L + v2;
      const u1 = enM3 ? "m³" : "dm³";
      return {
        text:
          `${cadre}, ${p.nom} remplit ${a} de ${fr(v1)} ${u1} et ${b} de ${fr(v2)} L. ` +
          pick(["Combien de litres faut-il en tout ?", "Quelle est la contenance totale, en litres ?", `Combien de litres d’eau ${p.nom} verse-t-${ilElle(p)} en tout ?`]),
        format: "short",
        expected: [`${fr(total)} L`],
        comparator: "number_equal",
        explanation: expl(
          `${enM3 ? `1 m³ = 1 000 L, donc ${fr(v1)} m³ = ${fr(v1L)} L` : `1 dm³ = 1 L, donc ${fr(v1)} dm³ = ${fr(v1L)} L`}. Total : ${fr(v1L)} + ${fr(v2)} = ${fr(total)} L.`,
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_assemblage_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On colle un cube de 8 cm³ contre un pavé droit de 20 cm³.\nQuel est le volume du solide obtenu ?",
    format: "qcm",
    choices: ["28 cm³", "160 cm³", "12 cm³", "28 cm²"],
    expected: ["28 cm³"],
    comparator: "mcq_exact",
    hint: "Les deux solides ne se chevauchent pas : on additionne les volumes.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : les deux solides occupent deux places différentes, donc on additionne leurs volumes.\n\nCalcul : " +
          ("8 + 20 = 28, donc 28 cm³. 160 vient de 8 × 20 : on ne multiplie pas des volumes.") +
          "\n\nConclusion : le volume est 28 cm³.",
    tags: ["volume", "assemblage", "qcm"],
  },

  /* =========================
     VOLUME_UNITES
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est une unité de volume ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure avec une unité au cube.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le cm³ est une unité de volume. Le cm mesure une longueur et le cm² une aire.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 dm³ correspond à combien de cm³ ?",
    format: "qcm",
    choices: ["10 cm³", "100 cm³", "1 000 cm³", "10 000 cm³"],
    expected: ["1 000 cm³"],
    comparator: "mcq_exact",
    hint: "1 dm = 10 cm, donc 1 dm³ = 10 × 10 × 10 cm³.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("1 dm³ = 10³ cm³ = 1 000 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "conversion", "unite"],
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["1 L = 1 cm³", "1 L = 1 dm³", "1 L = 1 m³", "1 L = 100 m³"],
    expected: ["1 L = 1 dm³"],
    comparator: "mcq_exact",
    hint: "C’est une correspondance classique à connaître.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("La correspondance importante est : 1 L = 1 dm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "litre", "conversion", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "template"],
    // 13/10 : 1 L = 1 dm³ et 1 mL = 1 cm³, dans les deux sens, en situation.
    generate: () => {
      const p = pick(PRENOMS);
      const [dire, a, b, vals] = pick([
        [(v: string) => `La bouteille ${de(p.nom)} contient ${v}.`, "L", "dm³", [0.5, 1, 1.5, 2]],
        [(v: string) => `L’arrosoir ${de(p.nom)} contient ${v}.`, "L", "dm³", [5, 6, 8, 10, 12]],
        [(v: string) => `Le seau ${de(p.nom)} contient ${v}.`, "dm³", "L", [8, 9, 10, 12, 15]],
        [(v: string) => `L’aquarium ${de(p.nom)} a un volume de ${v}.`, "dm³", "L", [20, 25, 40, 54, 60, 96, 120, 150]],
        [(v: string) => `La seringue de l’infirmière contient ${v}. ${p.nom} regarde.`, "mL", "cm³", [2, 5, 10, 15, 20]],
        [(v: string) => `Le flacon de parfum ${de(p.nom)} contient ${v}.`, "mL", "cm³", [30, 50, 75, 100, 150]],
        [(v: string) => `Le pot de yaourt ${de(p.nom)} a un volume de ${v}.`, "cm³", "mL", [100, 125, 150]],
        [(v: string) => `Le bidon ${de(p.nom)} contient ${v}.`, "L", "dm³", [2, 5, 10, 20]],
        [(v: string) => `La cuillère à soupe ${de(p.nom)} contient ${v}.`, "mL", "cm³", [10, 12, 15]],
        [(v: string) => `La boîte de crème glacée ${de(p.nom)} a un volume de ${v}.`, "dm³", "L", [0.5, 1, 1.5, 2]],
      ] as const);
      const v = pick(vals as readonly number[]);
      const question = pick([`Quel est ce volume en ${b} ?`, `Convertis ce volume en ${b}.`, `Combien cela fait-il en ${b} ?`]);
      return {
        text: `${dire(`${fr(v)} ${a}`)} ${question}`,
        format: "short",
        expected: [`${fr(v)} ${b}`],
        comparator: "number_equal",
        explanation: expl(`${a === "L" || a === "dm³" ? "1 L = 1 dm³" : "1 mL = 1 cm³"}, donc ${fr(v)} ${a} = ${fr(v)} ${b}.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "template"],
    // 13/10 : dm³ ↔ cm³, L ↔ mL, L ↔ cL, dans les deux sens ; des liquides du quotidien.
    generate: () => {
      const p = pick(PRENOMS);
      const [a, b] = pick([["dm³", "cm³"], ["cm³", "dm³"], ["L", "mL"], ["mL", "L"], ["L", "cL"], ["cL", "L"]] as const);
      const F: Record<string, number> = { mL: 1, "cm³": 1, cL: 10, L: 1000, "dm³": 1000 };
      // La valeur donnée : la réponse a deux décimales au plus.
      const v = F[a] > F[b] ? rnd(1, 24) / 4 : a === "cL" ? rnd(5, 150) : rnd(5, 300) * 10;
      const r = (v * F[a]) / F[b];
      const liquide = pick(["de jus d’orange", "d’eau", "de lait", "de sirop", "de soupe", "d’huile", "de peinture", "de shampoing"]);
      const dire = pick([
        `${p.nom} verse ${fr(v)} ${a} ${liquide} dans un récipient.`,
        `Une recette demande ${fr(v)} ${a} ${liquide}. ${p.nom} les mesure.`,
        `${p.nom} achète une bouteille de ${fr(v)} ${a} ${liquide}.`,
        `Le récipient ${de(p.nom)} contient ${fr(v)} ${a} ${liquide}.`,
      ]);
      const question = pick([`Quel est ce volume en ${b} ?`, `Convertis ce volume en ${b}.`, `Combien cela fait-il en ${b} ?`]);
      const regle = a === "dm³" || b === "dm³" ? "1 dm³ = 1 000 cm³" : a === "cL" || b === "cL" ? "1 L = 100 cL" : "1 L = 1 000 mL";
      return {
        text: `${dire} ${question}`,
        format: "short",
        expected: [`${fr(r)} ${b}`],
        comparator: "number_equal",
        explanation: expl(`${regle}, donc ${fr(v)} ${a} = ${fr(r)} ${b} (${F[a] > F[b] ? "on multiplie" : "on divise"} par ${F[a] > F[b] ? F[a] / F[b] : F[b] / F[a]}).`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 L.",
    tags: ["volume", "litre", "m3", "conversion", "template"],
    // 13/10 : m³ ↔ L et m³ ↔ dm³, dans les deux sens ; de grands contenants.
    generate: () => {
      const p = pick(PRENOMS);
      const [a, b] = pick([["m³", "L"], ["L", "m³"], ["m³", "dm³"], ["dm³", "m³"]] as const);
      const grand = a === "m³";
      const v = grand ? rnd(1, 120) / 4 : rnd(10, 900) * 10;
      const r = grand ? v * 1000 : v / 1000;
      const dire = pick([
        `La piscine ${de(p.nom)} contient ${fr(v)} ${a} d’eau.`,
        `La citerne de la ferme contient ${fr(v)} ${a}. ${p.nom} aide à la remplir.`,
        `La baignoire ${de(p.nom)} contient ${fr(v)} ${a} d’eau.`,
        `Le bassin du parc contient ${fr(v)} ${a}. ${p.nom} le regarde se remplir.`,
        `Une cuve de récupération d’eau de pluie contient ${fr(v)} ${a}. ${p.nom} la mesure.`,
        `La bétonnière livre ${fr(v)} ${a} de béton chez ${p.nom}.`,
      ]);
      const question = pick([`Quel est ce volume en ${b} ?`, `Convertis ce volume en ${b}.`, `Combien cela fait-il en ${b} ?`]);
      return {
        text: `${dire} ${question}`,
        format: "short",
        expected: [`${fr(r)} ${b}`],
        comparator: "number_equal",
        explanation: expl(`${b === "L" || a === "L" ? "1 m³ = 1 000 L" : "1 m³ = 1 000 dm³"}, donc ${fr(v)} ${a} = ${fr(r)} ${b} (${grand ? "on multiplie" : "on divise"} par 1 000).`),
      };
    },
  },

  // 13/10/2026 : l'étoile 1 n'avait qu'une question figée.
  {
    kind: "template",
    id: "5e_volume_unite_tpl_4_contenance",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Une contenance s’écrit en L, cL, mL ou m³ ; pas en m, cm² ni kg.",
    tags: ["volume", "unite", "contenance", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, juste] = pick([
        ["d’une bouteille d’eau", "L"],
        ["d’une cuillère à café", "mL"],
        ["d’un verre", "cL"],
        ["d’une piscine", "m³"],
        ["d’une seringue", "mL"],
        ["d’une canette", "cL"],
        ["d’une citerne", "m³"],
        ["d’une baignoire", "L"],
        ["d’un flacon de parfum", "mL"],
        ["d’un arrosoir", "L"],
        ["d’un seau", "L"],
        ["d’un château d’eau", "m³"],
      ] as const);
      const [l, s, m] = pick([["m", "cm²", "kg"], ["cm", "m²", "g"], ["km", "dm²", "kg"]] as const);
      const text = pick([
        `${p.nom} veut écrire la contenance ${objet}. Quelle unité choisit-${p.f ? "elle" : "il"} ?`,
        `Quelle unité convient pour la contenance ${objet} ? ${p.nom} hésite.`,
        `${p.nom} cherche la contenance ${objet}. En quelle unité l’écrire ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([juste, l, s, m]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`Une contenance est un volume : ${juste} convient. ${l} est une longueur, ${s} une aire, ${m} une masse.`),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un cube a une arête de 1 dm, c’est-à-dire 10 cm.\nQuel est son volume en cm³ ?",
    format: "qcm",
    choices: ["1 000 cm³", "100 cm³", "30 cm³", "10 cm³"],
    expected: ["1 000 cm³"],
    comparator: "mcq_exact",
    hint: "Volume du cube = arête × arête × arête.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : volume du cube = arête × arête × arête, avec l’arête en cm.\n\nCalcul : " +
          ("10 × 10 × 10 = 1 000, donc 1 dm³ = 1 000 cm³. 100 vient de 10 × 10 (une aire). 30 vient de 10 + 10 + 10.") +
          "\n\nConclusion : le volume est 1 000 cm³.",
    tags: ["volume", "conversion", "qcm"],
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’un cylindre de rayon 4 cm et de hauteur 5 cm. Il écrit : 4 × 5 = 20π cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut utiliser π × r² × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Non. Il a oublié le carré du rayon. Le volume vaut π × 4² × 5 = 80π cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "defi", "cylindre", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Modélise la réserve par un pavé droit.",
    tags: ["volume", "defi", "reunion", "pave", "template", "canvas"],
    // 13/10 : un contenant en pavé droit ; le volume, puis sa contenance EN LITRES
    // (cm³ → L, dm³ = L, m³ → L). La Réunion n'est plus qu'un contexte sur huit.
    generate: () => {
      const p = pick(PRENOMS);
      const [nom, u, pas, min, max, hmax] = pick([
        ["l’aquarium", "cm", 10, 2, 8, 6],
        ["la jardinière", "cm", 10, 1, 8, 3],
        ["la baignoire", "dm", 1, 5, 17, 6],
        ["l’abreuvoir", "dm", 1, 3, 20, 5],
        ["la réserve d’eau de pluie, à La Réunion", "m", 1, 1, 4, 2],
        ["la piscine", "m", 1, 2, 10, 2],
        ["le coffre de la voiture", "dm", 1, 4, 12, 6],
        ["la glacière", "cm", 10, 2, 6, 4],
      ] as const);
      const L = rnd(min, max) * pas, l = rnd(min, max) * pas, h = rnd(min, hmax) * pas;
      const V = L * l * h;
      const litres = u === "cm" ? V / 1000 : u === "dm" ? V : V * 1000;
      const conv = u === "cm" ? `1 L = 1 000 cm³ : ${fr(V)} ÷ 1 000 = ${fr(litres)} L` : u === "dm" ? `1 dm³ = 1 L : ${fr(V)} dm³ = ${fr(litres)} L` : `1 m³ = 1 000 L : ${fr(V)} × 1 000 = ${fr(litres)} L`;
      const intro = pick([`${p.nom} veut remplir ${nom}.`, `${p.nom} mesure ${nom}.`, `Pour un exposé, ${p.nom} étudie ${nom}.`]);
      return {
        text: `${intro} C’est un pavé droit de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut. ${pick(["Quelle est sa contenance en litres ?", "Combien de litres peut-on y verser ?", "Quel est son volume en litres ?"])}`,
        format: "short",
        expected: [`${fr(litres)} L`],
        comparator: "number_equal",
        explanation: expl(`Volume = ${L} × ${l} × ${h} = ${fr(V)} ${u}³. Puis ${conv}.`),
        canvas: canvasPave(L, l, h, u),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les volumes, pas seulement les hauteurs.",
    tags: ["volume", "defi", "comparaison", "template"],
    // 13/10 : deux enfants, deux boîtes : un pavé et un cylindre (π = 3,14). La plus
    // grande n'est pas toujours la plus haute.
    generate: () => {
      const p1 = pick(PRENOMS);
      let p2 = pick(PRENOMS);
      while (p2.nom === p1.nom) p2 = pick(PRENOMS);
      const objet = pick(["boîte", "tirelire", "pot à crayons", "vase", "boîte à goûter", "bocal"]);
      const fem = !["pot à crayons", "vase", "bocal"].includes(objet);
      let L = 0, l = 0, h = 0, r = 0, H = 0, vA = 0, vB = 0;
      do {
        L = rnd(5, 20); l = rnd(4, 15); h = rnd(5, 25);
        r = rnd(3, 9); H = rnd(5, 25);
        vA = L * l * h;
        vB = Math.round(314 * r * r * H) / 100;
      } while (Math.abs(vA - vB) < 0.05 * Math.max(vA, vB));
      const juste = vA > vB ? p1.nom : p2.nom;
      return {
        text:
          `${p1.nom} a ${fem ? "une" : "un"} ${objet} en forme de pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut. ` +
          `${p2.nom} a ${fem ? "une" : "un"} ${objet} cylindrique de rayon ${r} cm et de hauteur ${H} cm. Prends π = 3,14. ` +
          pick([`Qui a ${fem ? "la" : "le"} ${objet} de plus grand volume ?`, `Qui a ${fem ? "la" : "le"} ${objet} qui contient le plus ?`, `Qui peut y mettre le plus de choses ?`]),
        format: "qcm",
        choices: [p1.nom, p2.nom, "les deux ont le même volume"],
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`Pavé : ${L} × ${l} × ${h} = ${fr(vA)} cm³. Cylindre : 3,14 × ${r} × ${r} × ${H} = ${fr(vB)} cm³. Le plus grand volume est celui ${de(juste)}.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord chaque volume, puis additionne.",
    tags: ["volume", "defi", "assemblage", "template"],
    // 13/10 : des objets réels (fusée, phare, trophée…) ; QCM en π (08/10, Frédéric).
    generate: () => {
      const p = pick(PRENOMS);
      const objet = pick(["une fusée en carton", "un phare miniature", "un trophée", "une tour de château", "une lampe", "un moulin en bois", "une maquette de silo"]);
      const rayon = rnd(2, 6);
      const hauteurCylindre = rnd(3, 12);
      const coeffCylindre = rayon * rayon * hauteurCylindre;
      const volumePrisme = rnd(4, 40) * 5;

      // 08/10/2026 : précise et simple (Frédéric) — QCM, leurres = vraies erreurs.
      const bonne = `${coeffCylindre}π + ${volumePrisme} cm³`;
      return {
        text:
          pick([
            `Pour fabriquer ${objet}, ${p.nom} colle un cylindre (rayon ${rayon} cm, hauteur ${hauteurCylindre} cm) et un prisme droit de ${volumePrisme} cm³.`,
            `${p.nom} construit ${objet} : un cylindre (rayon ${rayon} cm, hauteur ${hauteurCylindre} cm) surmonté d’un prisme droit de ${volumePrisme} cm³.`,
          ]) + ` ${pick(["Quel est le volume total ?", "Quel est le volume de l’objet ?", "Choisis le volume total."])}`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${coeffCylindre + volumePrisme}π cm³`,
          `${rayon * hauteurCylindre}π + ${volumePrisme} cm³`,
          `${2 * rayon * hauteurCylindre}π + ${volumePrisme} cm³`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on calcule le volume du cylindre, puis on ajoute celui du prisme.\n\nCalcul : " +
          (`Volume du cylindre = π × ${rayon} × ${rayon} × ${hauteurCylindre} = ${coeffCylindre}π cm³. Volume total = ${coeffCylindre}π + ${volumePrisme} cm³. On ne peut pas ajouter ${coeffCylindre}π et ${volumePrisme} en un seul nombre de π.`) +
          `\n\nConclusion : le volume total est ${coeffCylindre}π + ${volumePrisme} cm³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur: hauteurCylindre },
          labels: {
            rayon: `${rayon} cm`,
            hauteur: `${hauteurCylindre} cm`,
            aireBase: `${rayon * rayon}π cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un prisme droit et un cylindre ont tous les deux une base de 12 cm² et une hauteur de 5 cm.\nLequel a le plus grand volume ?",
    format: "qcm",
    choices: ["le prisme", "le cylindre", "ils sont égaux"],
    expected: ["ils sont égaux"],
    comparator: "mcq_exact",
    hint: "Pour les deux solides : volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : pour un prisme droit comme pour un cylindre, volume = aire de base × hauteur.\n\nCalcul : " +
          ("Prisme : 12 × 5 = 60 cm³. Cylindre : 12 × 5 = 60 cm³.") +
          "\n\nConclusion : les deux volumes sont égaux.",
    tags: ["volume", "defi", "qcm"],
  },

  /* =========================
     TOP-UP — VOLUME_COMPRENDRE (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "En quelle unité exprime-t-on un volume ?",
    format: "qcm",
    choices: ["en unités cubes (cm³)", "en cm", "en cm²", "en degrés"],
    expected: ["en unités cubes (cm³)"],
    comparator: "mcq_exact",
    hint: "Trois dimensions → unité au cube.",
    explanation: expl("Un volume s’exprime en unités cubes, comme le cm³."),
    tags: ["volume", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 8 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Chaque cube vaut 1 unité de volume.",
    explanation: expl("Il y a 8 cubes unités, donc le volume vaut 8 unités de volume."),
    tags: ["volume", "cubes_unite"],
  },
  {
    kind: "fixed",
    id: "5e_volume_comprendre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un cube a une arête de 2 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["8 cm³", "4 cm²", "6 cm", "8 cm²"],
    expected: ["8 cm³"],
    comparator: "mcq_exact",
    hint: "Volume du cube = arête × arête × arête.",
    explanation: expl("2 × 2 × 2 = 8, donc 8 cm³. 4 cm² est l’aire d’une face (une surface plate), pas le volume. 6 cm vient de 2 + 2 + 2."),
    tags: ["volume", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_volume_comprendre_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces grandeurs, laquelle est un volume ?",
    format: "qcm",
    choices: ["250 cm³", "250 cm", "250 cm²", "250 g"],
    expected: ["250 cm³"],
    comparator: "mcq_exact",
    hint: "Cherche l’unité au cube.",
    explanation: expl("250 cm³ est une mesure de volume (unité au cube)."),
    tags: ["volume", "unite", "qcm"],
  },

  /* =========================
     TOP-UP — VOLUME_PAVE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit a pour dimensions 4 cm, 3 cm et 2 cm. Quel est son volume ?",
    format: "short",
    expected: ["24 cm³", "24"],
    comparator: "number_equal",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation: expl("V = 4 × 3 × 2 = 24 cm³."),
    tags: ["volume", "pave_droit", "canvas"],
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 3, hauteur: 2, volume: 24 },
      labels: { longueur: "4 cm", largeur: "3 cm", hauteur: "2 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
  },
  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un cube a une arête de 3 cm. Quel est son volume ?",
    format: "short",
    expected: ["27 cm³", "27"],
    comparator: "number_equal",
    hint: "Volume d’un cube = arête × arête × arête.",
    explanation: expl("V = 3 × 3 × 3 = 27 cm³."),
    tags: ["volume", "cube", "canvas"],
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 3, largeur: 3, hauteur: 3, volume: 27 },
      labels: { longueur: "3 cm", largeur: "3 cm", hauteur: "3 cm" },
      display: { showLabels: true, showDimensions: true },
    }),
  },
  {
    kind: "template",
    id: "5e_volume_pave_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume du cube = arête × arête × arête.",
    tags: ["volume", "cube", "template", "canvas"],
    // 13/10 : le cube, un pavé aux trois dimensions égales, dans la vie courante.
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, u, min, max] = pick([
        ["un dé", "cm", 1, 3],
        ["un glaçon cubique", "cm", 2, 5],
        ["un casse-tête cubique", "cm", 5, 8],
        ["une boîte cubique", "dm", 1, 6],
        ["une caisse cubique", "m", 1, 3],
        ["un aquarium cubique", "cm", 20, 60],
        ["un pouf cubique", "cm", 30, 50],
        ["un bloc de béton cubique", "dm", 2, 9],
        ["un carton cubique", "cm", 15, 45],
      ] as const);
      const a = rnd(min, max);
      const V = a * a * a;
      const text = pick([
        `${p.nom} a ${objet} : c’est un cube d’arête ${a} ${u}. Quel est son volume ?`,
        `${p.nom} possède ${objet}. C’est un cube d’arête ${a} ${u}. Calcule son volume.`,
        `${p.nom} mesure ${objet} : un cube d’arête ${a} ${u}. Quel volume occupe ce cube ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`V = ${a} × ${a} × ${a} = ${fr(V)} ${u}³.`),
        canvas: canvasPave(a, a, a, u),
      };
    },
  },

  /* =========================
     TOP-UP — VOLUME_PRISME (+6)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 10 cm² et une hauteur de 7 cm. Quel est son volume ?",
    format: "short",
    expected: ["70 cm³", "70"],
    comparator: "number_equal",
    hint: "Volume = aire de base × hauteur.",
    explanation: expl("V = 10 × 7 = 70 cm³."),
    tags: ["volume", "prisme", "canvas"],
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 10, hauteur: 7, volume: 70 },
      labels: { aireBase: "10 cm²", hauteur: "7 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
  },
  {
    kind: "fixed",
    id: "5e_volume_prisme_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 12 cm² et une hauteur de 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["17 cm³", "60 cm³", "120 cm³", "30 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "12 × 5.",
    explanation: expl("V = 12 × 5 = 60 cm³."),
    tags: ["volume", "prisme", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "Un prisme droit a pour base un triangle d’aire 6 cm² et une hauteur de 9 cm. Quel est son volume ?",
    format: "short",
    expected: ["54 cm³", "54"],
    comparator: "number_equal",
    hint: "Aire de base × hauteur.",
    explanation: expl("V = 6 × 9 = 54 cm³."),
    tags: ["volume", "prisme", "canvas"],
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 6, hauteur: 9, volume: 54 },
      labels: { aireBase: "6 cm²", hauteur: "9 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
  },
  {
    kind: "fixed",
    id: "5e_volume_prisme_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — garde l’idée : choisir les deux bonnes grandeurs.
    text: "Un prisme droit a une base d’aire 9 cm² et de périmètre 14 cm. Sa hauteur est 4 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["36 cm³", "56 cm³", "13 cm³", "36 cm²"],
    expected: ["36 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur. Le périmètre ne sert pas.",
    explanation: expl("On utilise l’aire de la base et la hauteur : 9 × 4 = 36, donc 36 cm³. 56 vient de 14 × 4 : le périmètre ne sert pas pour le volume."),
    tags: ["volume", "prisme", "qcm"],
  },
  {
    kind: "template",
    id: "5e_volume_prisme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base × hauteur. Le périmètre de la base ne sert pas.",
    tags: ["volume", "prisme", "piege", "qcm", "template"],
    // 13/10 : le piège du périmètre : trois données, deux servent.
    generate: () => {
      const { o, B, h, u, intro } = prismeSituation();
      // Un triangle d'aire B a un périmètre d'au moins √(12√3 × B) ≈ 4,56 √B.
      let P = Math.ceil(Math.sqrt(12 * Math.sqrt(3) * B)) + rnd(1, 6);
      if (P === B) P += 1;
      const V = B * h;
      const good = `${fr(V)} ${u}³`;
      return {
        text: `${intro} Sa base a une aire de ${fr(B)} ${u}² et un périmètre de ${P} ${u}. La hauteur du prisme est ${h} ${u}. ${pick(["Quel est son volume ?", "Choisis son volume.", `Quel est le volume ${deLe(o)} ?`])}`,
        format: "qcm",
        choices: makeChoices(good, [`${fr(P * h)} ${u}³`, `${fr(B + h)} ${u}³`, `${fr(V)} ${u}²`, `${fr(B * P)} ${u}³`]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: expl(`On utilise l’aire de la base et la hauteur : ${fr(B)} × ${h} = ${fr(V)} ${u}³. ${fr(P * h)} vient du périmètre : il ne sert pas pour le volume.`),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_volume_prisme_qcm_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Le volume d’un prisme droit dépend-il de la forme exacte de sa base ?",
    format: "qcm",
    choices: [
      "non, seule l’aire de la base compte",
      "oui, il faut que la base soit un carré",
      "oui, il faut que la base soit un triangle",
      "non, seul le périmètre compte",
    ],
    expected: ["non, seule l’aire de la base compte"],
    comparator: "mcq_exact",
    hint: "La formule utilise l’aire de base.",
    explanation: expl("La formule Volume = aire de base × hauteur n’utilise que l’aire de la base, pas sa forme."),
    tags: ["volume", "prisme", "qcm"],
  },

  /* =========================
     TOP-UP — VOLUME_CYLINDRE (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 15 cm² et une hauteur de 4 cm. Quel est son volume ?",
    format: "short",
    expected: ["60 cm³", "60"],
    comparator: "number_equal",
    hint: "Volume = aire de base × hauteur.",
    explanation: expl("V = 15 × 4 = 60 cm³."),
    tags: ["volume", "cylindre", "canvas"],
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { aireBase: 15, hauteur: 4 },
      labels: { aireBase: "15 cm²", hauteur: "4 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
  },
  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un cylindre a un rayon de 2 cm et une hauteur de 10 cm.\nQuel est son volume ?",
    format: "qcm",
    choices: ["40π cm³", "20π cm³", "160π cm³", "40π cm²"],
    expected: ["40π cm³"],
    comparator: "mcq_exact",
    hint: "Aire de base = π × r².",
    explanation: expl("Aire de base = π × 2 × 2 = 4π cm². Volume = 4π × 10 = 40π cm³. 20π oublie le carré du rayon. 160π prend le diamètre 4 cm comme rayon."),
    tags: ["volume", "cylindre", "pi", "canvas"],
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 2, hauteur: 10 },
      labels: { rayon: "2 cm", hauteur: "10 cm", aireBase: "4π cm²" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
  },
  {
    kind: "fixed",
    id: "5e_volume_cylindre_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formule donne l’aire de base d’un cylindre de rayon r ?",
    format: "qcm",
    choices: ["π × r²", "2 × π × r", "π × r", "r²"],
    expected: ["π × r²"],
    comparator: "mcq_exact",
    hint: "La base est un disque.",
    explanation: expl("La base d’un cylindre est un disque : son aire est π × r²."),
    tags: ["volume", "cylindre", "qcm"],
  },
  {
    kind: "template",
    id: "5e_volume_cylindre_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume = π × rayon × rayon × hauteur, avec π = 3,14.",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    // 13/10 : une valeur approchée de π (3,14) : la réponse est un nombre (deux décimales au plus).
    generate: () => {
      const { o, r, h, u, intro } = cylSituation();
      const V = Math.round(314 * r * r * h) / 100;
      return {
        text: `${intro} Son rayon est ${r} ${u} et sa hauteur est ${h} ${u}. Prends π = 3,14. ${Q_VOL(o)}`,
        format: "short",
        expected: [`${fr(V)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Aire de base = 3,14 × ${r} × ${r} = ${fr(3.14 * r * r)} ${u}². Volume = ${fr(3.14 * r * r)} × ${h} = ${fr(V)} ${u}³.`),
        canvas: canvasBaseHauteur("cylindre", `${fr(r * r)}π ${u}²`, h, u, { rayon: `${r} ${u}` }),
      };
    },
  },

  /* =========================
     TOP-UP — VOLUME_ASSEMBLAGE (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de deux pavés de volumes 18 cm³ et 22 cm³. Quel est son volume total ?",
    format: "short",
    expected: ["40 cm³", "40"],
    comparator: "number_equal",
    hint: "On additionne les volumes.",
    explanation: expl("Volume total = 18 + 22 = 40 cm³."),
    tags: ["volume", "assemblage"],
  },
  {
    kind: "fixed",
    id: "5e_volume_assemblage_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Comment calcule-t-on le volume d’un solide formé de plusieurs blocs ?",
    format: "qcm",
    choices: [
      "on additionne les volumes des blocs",
      "on multiplie les volumes des blocs",
      "on additionne les hauteurs",
      "on prend le plus grand bloc",
    ],
    expected: ["on additionne les volumes des blocs"],
    comparator: "mcq_exact",
    hint: "Chaque bloc occupe sa place.",
    explanation: expl("Le volume d’un assemblage est la somme des volumes des blocs qui le composent."),
    tags: ["volume", "assemblage", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Un solide est formé d’un grand pavé de 80 cm³ dans lequel on a creusé un cube de 8 cm³. Quel est le volume restant ?",
    format: "short",
    expected: ["72 cm³", "72"],
    comparator: "number_equal",
    hint: "On soustrait le volume creusé.",
    explanation: expl("Volume restant = 80 − 8 = 72 cm³."),
    tags: ["volume", "assemblage", "soustraction"],
  },
  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume du pavé moins volume du trou.",
    tags: ["volume", "assemblage", "soustraction", "template"],
    // 13/10 : un pavé creusé d'un trou cubique : on SOUSTRAIT.
    generate: () => {
      const p = pick(PRENOMS);
      const [objet, u, min, max] = pick([
        ["un bloc de bois", "cm", 6, 20],
        ["un bloc de polystyrène", "cm", 10, 40],
        ["un gâteau rectangulaire", "cm", 8, 25],
        ["un bloc d’argile", "cm", 6, 18],
        ["une boîte à bijoux pleine", "cm", 6, 15],
        ["un bloc de pierre", "dm", 4, 12],
        ["un pain de savon", "cm", 5, 12],
      ] as const);
      const L = rnd(min, max), l = rnd(min, max), h = rnd(min, max);
      const a = rnd(2, Math.max(2, Math.min(L, l, h) - 2));
      const V = L * l * h, t = a * a * a, reste = V - t;
      const text = pick([
        `${p.nom} creuse ${objet} de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut : ${ilElle(p)} en retire un cube d’arête ${a} ${u}. Quel volume reste-t-il ?`,
        `Dans ${objet} de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut, ${p.nom} découpe un trou en forme de cube d’arête ${a} ${u}. Quel est le volume restant ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${fr(reste)} ${u}³`],
        comparator: "number_equal",
        explanation: expl(`Pavé : ${L} × ${l} × ${h} = ${fr(V)} ${u}³. Trou : ${a} × ${a} × ${a} = ${fr(t)} ${u}³. Reste : ${fr(V)} − ${fr(t)} = ${fr(reste)} ${u}³.`),
      };
    },
  },

  /* =========================
     TOP-UP — VOLUME_UNITE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de litres y a-t-il dans 1 m³ ?",
    format: "qcm",
    choices: ["1 000 L", "100 L", "10 L", "1 L"],
    expected: ["1 000 L"],
    comparator: "mcq_exact",
    hint: "1 m³ = 1 000 dm³ et 1 dm³ = 1 L.",
    explanation: expl("1 m³ = 1 000 dm³, et 1 dm³ = 1 L, donc 1 m³ = 1 000 L."),
    tags: ["volume", "conversion", "litre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 3 dm³ en cm³.",
    format: "short",
    expected: ["3 000 cm³", "3000", "3 000"],
    comparator: "number_equal",
    hint: "1 dm³ = 1 000 cm³.",
    explanation: expl("3 dm³ = 3 × 1 000 = 3 000 cm³."),
    tags: ["volume", "conversion"],
  },
  {
    kind: "fixed",
    id: "5e_volume_unite_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de cL y a-t-il dans 1 L ?",
    format: "qcm",
    choices: ["100 cL", "10 cL", "1 000 cL", "1 cL"],
    expected: ["100 cL"],
    comparator: "mcq_exact",
    hint: "centi = centième.",
    explanation: expl("1 L = 100 cL (le centilitre est un centième de litre)."),
    tags: ["volume", "conversion", "litre", "qcm"],
  },

  /* =========================
     TOP-UP — VOLUME_DEFI (+5)
  ========================= */
  {
    kind: "fixed",
    id: "5e_volume_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un aquarium en forme de pavé droit mesure 50 cm × 30 cm × 40 cm. Quel est son volume en litres ? (1 L = 1 000 cm³)",
    format: "short",
    expected: ["60 L", "60"],
    comparator: "number_equal",
    hint: "Calcule le volume en cm³ puis convertis.",
    explanation: expl("V = 50 × 30 × 40 = 60 000 cm³ = 60 L."),
    tags: ["volume", "defi", "pave_droit", "litre"],
  },
  {
    kind: "fixed",
    id: "5e_volume_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On double la hauteur d’un pavé droit sans changer la base. Que devient son volume ?",
    format: "qcm",
    choices: ["il double", "il reste identique", "il est divisé par 2", "il est multiplié par 4"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation: expl("Le volume est proportionnel à la hauteur : si la hauteur double, le volume double."),
    tags: ["volume", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "5e_volume_defi_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une citerne en forme de pavé droit mesure 2 m × 1 m × 1 m. Combien de litres d’eau de pluie peut-elle contenir ? (1 m³ = 1 000 L)",
    format: "short",
    expected: ["2 000 L", "2000", "2 000"],
    comparator: "number_equal",
    hint: "Volume en m³ puis × 1 000.",
    explanation: expl("V = 2 × 1 × 1 = 2 m³ = 2 000 L."),
    tags: ["volume", "defi", "reunion", "litre"],
  },
  {
    kind: "fixed",
    id: "5e_volume_defi_qcm_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cube a une arête de 4 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["64 cm³", "16 cm³", "12 cm³", "48 cm³"],
    expected: ["64 cm³"],
    comparator: "mcq_exact",
    hint: "Arête³.",
    explanation: expl("V = 4 × 4 × 4 = 64 cm³."),
    tags: ["volume", "defi", "cube", "qcm"],
  },
  {
    kind: "template",
    id: "5e_volume_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Volume en cm³, puis en litres, puis le temps de remplissage.",
    tags: ["volume", "defi", "template", "litre", "debit"],
    // 13/10 : trois étapes : volume (cm³), litres, puis minutes avec un robinet.
    generate: () => {
      const p = pick(PRENOMS);
      const nom = pick(["un aquarium", "une baignoire pour bébé", "un bac à plantes", "une glacière", "un évier", "un bassin pour poissons", "une cuve à vendange"]);
      const L = rnd(2, 8) * 10, l = rnd(2, 6) * 10, h = rnd(1, 5) * 10;
      const vcm = L * l * h;
      const litres = vcm / 1000;
      const debit = pick([2, 4, 5]);
      const t = litres / debit;
      return {
        text:
          `${p.nom} remplit ${nom} en forme de pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut. ` +
          `Le robinet verse ${debit} L par minute. ${pick(["Combien de minutes faut-il pour tout remplir ?", "En combien de minutes le remplissage est-il fini ?", "Quelle est la durée du remplissage, en minutes ?"])}`,
        format: "short",
        expected: [`${fr(t)} min`],
        comparator: "number_equal",
        explanation: expl(`V = ${L} × ${l} × ${h} = ${fr(vcm)} cm³ = ${fr(litres)} L (1 L = 1 000 cm³). Durée : ${fr(litres)} ÷ ${debit} = ${fr(t)} min.`),
      };
    },
  },
];