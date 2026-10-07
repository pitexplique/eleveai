import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, il, Il, nf, avecUnite, deuxPrenoms, type Prenom } from "./aires.bank";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un volume mesure la place occupée par un solide.\n\n" +
    "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE (voir aires.bank.ts, d'où
// viennent les outils). Unité OBLIGATOIRE dans l'énoncé et dans la réponse
// (« 24 cm³ »), division « ÷ ». Les correcteurs : correcteurs/volumes.ts.
// ═══════════════════════════════════════════════════════════════════════════

// ─── volume_unite ───────────────────────────────────────────────────────────
const SOLIDES_PETITS: { de: string; min: number; max: number }[] = [
  { de: "d’un dé à jouer", min: 2, max: 8 },
  { de: "d’une gomme", min: 8, max: 20 },
  { de: "d’un morceau de sucre", min: 2, max: 6 },
  { de: "d’une boîte d’allumettes", min: 30, max: 60 },
  { de: "d’un pot de yaourt", min: 125, max: 150 },
  { de: "d’une balle de tennis", min: 140, max: 150 },
  { de: "d’un verre d’eau", min: 200, max: 300 },
  { de: "d’une boîte de craies", min: 150, max: 400 },
  { de: "d’une petite boîte à bijoux", min: 100, max: 500 },
];
const SOLIDES_GRANDS: { de: string; min: number; max: number }[] = [
  { de: "d’une piscine", min: 30, max: 80 },
  { de: "de l’air d’une chambre", min: 25, max: 40 },
  { de: "de la benne d’un camion", min: 10, max: 30 },
  { de: "d’un conteneur de bateau", min: 30, max: 70 },
  { de: "d’une citerne d’eau de pluie", min: 2, max: 10 },
  { de: "d’un abri de jardin", min: 8, max: 15 },
  { de: "d’une salle de sport", min: 900, max: 3000 },
];

function genVolumeUnite() {
  const grand = Math.random() < 0.5;
  const o = pick(grand ? SOLIDES_GRANDS : SOLIDES_PETITS);
  const u = grand ? "m" : "cm";
  const p = pick(PRENOMS);
  const autre = pick(["kg", "g"]);
  if (Math.random() < 0.5) {
    const text = pick([
      `${p.nom} veut connaître le volume ${o.de}. Quelle unité doit-${il(p)} choisir ?`,
      `Quelle unité convient pour mesurer le volume ${o.de} ?`,
      `Pour écrire le volume ${o.de}, ${p.nom} hésite entre quatre unités. Laquelle convient ?`,
      `${p.nom} calcule le volume ${o.de}. Dans quelle unité peut-${il(p)} écrire son résultat ?`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([`${u}³`, `${u}²`, u, autre]),
      expected: [`${u}³`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Un volume mesure la place occupée dans l’espace : il s’écrit avec une unité CUBE. ${u} mesure une longueur, ${u}² une aire, ${autre} une masse. Ici on choisit ${u}³.`
      ),
    };
  }
  const n = randomInt(o.min, o.max);
  const N = nf(n);
  const text = pick([
    `${p.nom} a noté quatre mesures. Laquelle peut être le volume ${o.de} ?`,
    `Laquelle de ces mesures peut être le volume ${o.de} ?`,
    `Voici quatre écritures. Laquelle donne le volume ${o.de} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([`${N} ${u}³`, `${N} ${u}²`, `${N} ${u}`, `${N} ${autre}`]),
    expected: [`${N} ${u}³`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Un volume s’écrit avec une unité cube. ${N} ${u} est une longueur, ${N} ${u}² une aire. Le volume est donc ${N} ${u}³.`),
  };
}

const ACTIONS_VOLUME: { phrase: string; rep: "le volume" | "l’aire" | "le périmètre" }[] = [
  { phrase: "veut remplir de sable le bac de son petit frère", rep: "le volume" },
  { phrase: "veut savoir combien d’eau contient son aquarium", rep: "le volume" },
  { phrase: "veut savoir combien de cubes tiennent dans une boîte", rep: "le volume" },
  { phrase: "veut savoir quelle place prend un carton dans le coffre", rep: "le volume" },
  { phrase: "veut remplir de terre une jardinière", rep: "le volume" },
  { phrase: "veut savoir combien d’air il y a dans sa chambre", rep: "le volume" },
  { phrase: "veut remplir un moule à gâteau de pâte", rep: "le volume" },
  { phrase: "veut recouvrir de papier cadeau le dessus d’une boîte", rep: "l’aire" },
  { phrase: "veut peindre le couvercle d’un coffre", rep: "l’aire" },
  { phrase: "veut coller du tissu sur tout le fond d’un tiroir", rep: "l’aire" },
  { phrase: "veut coller un galon tout autour du couvercle d’une boîte", rep: "le périmètre" },
];

function genVolumeGrandeur() {
  const a = pick(ACTIONS_VOLUME);
  const p = pick(PRENOMS);
  const text = pick([
    `${p.nom} ${a.phrase}. Que doit-${il(p)} mesurer ?`,
    `${p.nom} ${a.phrase}. Quelle grandeur doit-${il(p)} calculer ?`,
    `${p.nom} ${a.phrase}. Avant de commencer, que doit-${il(p)} connaître ?`,
  ]);
  const pourquoi =
    a.rep === "le volume"
      ? "Il s’agit de remplir un espace, ou de la place occupée dans l’espace : c’est le volume."
      : a.rep === "l’aire"
        ? "Il s’agit de couvrir une surface plate : c’est l’aire."
        : "Il s’agit du tour d’une surface : c’est le périmètre.";
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(["le volume", "l’aire", "le périmètre", "la masse"]),
    expected: [a.rep],
    comparator: "mcq_exact" as const,
    explanation: expl(pourquoi),
  };
}

// ─── volume_compter, volume_assemblage ──────────────────────────────────────
// Des solides faits de cubes UNITÉS (1 cm³, 1 dm³ ou 1 m³) : le volume est le
// nombre de cubes, suivi de l'unité du cube.
const CONSTRUCTIONS: { intro: (p: Prenom) => string; u: string; quoi: string }[] = [
  { intro: (p) => `${p.nom} construit une tour avec des cubes en bois de 1 cm³.`, u: "cm³", quoi: "la tour" },
  { intro: (p) => `${p.nom} fait un escalier avec des cubes emboîtables de 1 cm³.`, u: "cm³", quoi: "l’escalier" },
  { intro: (p) => `${p.nom} construit un château avec des cubes de 1 cm³.`, u: "cm³", quoi: "le château" },
  { intro: (p) => `${p.nom} empile de gros cubes en mousse de 1 dm³.`, u: "dm³", quoi: "la pile" },
  { intro: (p) => `${p.nom} construit un robot avec des cubes magnétiques de 1 cm³.`, u: "cm³", quoi: "le robot" },
  { intro: (p) => `${p.nom} bâtit une pyramide avec des sucres en forme de cube de 1 cm³.`, u: "cm³", quoi: "la pyramide" },
  { intro: (p) => `${p.nom} construit un mur avec des briques cubiques de 1 dm³.`, u: "dm³", quoi: "le mur" },
  { intro: (p) => `${p.nom} remplit un coffre avec des cubes en plastique de 1 dm³.`, u: "dm³", quoi: "le tas de cubes" },
  { intro: () => `Sur un chantier, on empile des blocs de béton cubiques de 1 m³.`, u: "m³", quoi: "le tas de blocs" },
  { intro: () => `Au port, on range des caisses cubiques de 1 m³.`, u: "m³", quoi: "le tas de caisses" },
  { intro: (p) => `${p.nom} fabrique une maison de poupée avec des cubes de 1 cm³.`, u: "cm³", quoi: "la maison" },
  { intro: (p) => `Au centre de loisirs, ${p.nom} construit une cabane avec des cubes en carton de 1 dm³.`, u: "dm³", quoi: "la cabane" },
];
const ETAGES = ["au premier étage", "au deuxième", "au troisième", "au quatrième"];
const duQuoi = (quoi: string) => quoi.replace(/^le /, "du ").replace(/^la /, "de la ").replace(/^l’/, "de l’");
const questionVolume = (quoi: string) =>
  pick([`Quel est le volume ${duQuoi(quoi)} ?`, "Calcule le volume total.", `Combien mesure le volume ${duQuoi(quoi)} ?`, `Calcule le volume ${duQuoi(quoi)}.`]);

function genVolumeCompterEtages() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  const n = randomInt(2, 4);
  const k = Array.from({ length: n }, () => randomInt(1, 9));
  const morceaux = k.map((x, i) => (i === 0 ? `${x} cube${x > 1 ? "s" : ""} ${ETAGES[i]}` : `${x} ${ETAGES[i]}`));
  const liste = morceaux.slice(0, -1).join(", ") + " et " + morceaux[morceaux.length - 1];
  const total = k.reduce((a, b) => a + b, 0);
  return {
    text: `${c.intro(p)} Il y a ${liste}. ${questionVolume(c.quoi)}`,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`Chaque cube a un volume de 1 ${c.u}. On compte tous les cubes : ${k.join(" + ")} = ${total}. Le volume est ${total} ${c.u}.`),
  };
}

function genVolumeCompterCouches(qcm: boolean) {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  const triple = !qcm || Math.random() < 0.5;
  const a = randomInt(2, 5);
  const b = randomInt(2, 6);
  const d = triple ? randomInt(2, 6) : 1;
  const total = a * b * d;
  const forme = triple
    ? pick([
        `Le solide a ${a} couches de ${b} rangées de ${d} cubes.`,
        `Les cubes forment un pavé : ${a} couches de ${b} rangées de ${d} cubes.`,
      ])
    : pick([`Le solide a ${a} étages de ${b} cubes.`, `La construction a ${a} couches de ${b} cubes.`]);
  const calc = triple
    ? `Une couche contient ${b} × ${d} = ${b * d} cubes. Il y a ${a} couches : ${a} × ${b * d} = ${total} cubes. Le volume est ${total} ${c.u}.`
    : `${a} étages de ${b} cubes : ${a} × ${b} = ${total} cubes. Le volume est ${total} ${c.u}.`;
  const text = `${c.intro(p)} ${forme} ${questionVolume(c.quoi)}`;
  if (!qcm) return { text, format: "short" as const, expected: avecUnite(total, c.u), comparator: "number_equal" as const, explanation: expl(calc) };
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(`${total} ${c.u}`, [
      `${a + b + (triple ? d : 0)} ${c.u}`,
      `${triple ? a * b : a * b + 1} ${c.u}`,
      `${total + a} ${c.u}`,
      `${total - 1} ${c.u}`,
      `${total} ${c.u.replace("³", "²")}`,
    ]),
    expected: [`${total} ${c.u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`${calc} Additionner les nombres ne compte pas les cubes.`),
  };
}

const MORCEAUX = ["l’un", "le deuxième", "le troisième"];
function genVolumeAssembler() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  const n = pick([2, 2, 3]);
  const k = Array.from({ length: n }, () => randomInt(2, 12));
  const total = k.reduce((a, b) => a + b, 0);
  const liste =
    n === 2
      ? `l’un de ${k[0]} cubes, l’autre de ${k[1]} cubes`
      : k.map((x, i) => `${MORCEAUX[i]} de ${x} cubes`).join(", ").replace(/, (le troisième)/, " et $1");
  const sujet = /^(Sur|Au port)/.test(c.intro(p)) ? "On" : Il(p);
  const text = `${c.intro(p)} ${sujet} assemble ${n === 2 ? "deux" : "trois"} morceaux : ${liste}. ${pick([
    "Quel est le volume du solide obtenu ?",
    "Calcule le volume de l’assemblage.",
    "Quel volume obtient-on en tout ?",
  ])}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`Assembler ne change pas le nombre de cubes : on additionne les volumes. ${k.join(" + ")} = ${total} ${c.u}.`),
  };
}

function genVolumeAssemblerRetirer() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  const a = randomInt(6, 15);
  const b = randomInt(2, 9);
  const r = randomInt(1, Math.min(a, 9));
  const total = a + b - r;
  const sujet = /^(Sur|Au port)/.test(c.intro(p)) ? "On" : Il(p);
  const text = `${c.intro(p)} Le solide a d’abord ${a} cubes. ${sujet} ajoute ${b} cubes, puis ${sujet === "On" ? "on" : il(p)} retire ${r} cube${r > 1 ? "s" : ""}. ${questionVolume(c.quoi)}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`On ajoute les cubes posés, on enlève les cubes retirés : ${a} + ${b} − ${r} = ${total}. Le volume est ${total} ${c.u}.`),
  };
}

function genVolumeAssemblerEtages() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  const a = randomInt(2, 5);
  const b = randomInt(3, 8);
  const d = randomInt(2, 9);
  const total = a * b + d;
  const sujet = /^(Sur|Au port)/.test(c.intro(p)) ? "On" : Il(p);
  const text = `${c.intro(p)} ${sujet} assemble un bloc de ${a} étages de ${b} cubes et un petit morceau de ${d} cubes. ${pick([
    "Quel est le volume du solide obtenu ?",
    "Calcule le volume de l’assemblage.",
    "Quel volume obtient-on en tout ?",
  ])}`;
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(`${total} ${c.u}`, [`${a + b + d} ${c.u}`, `${a * b} ${c.u}`, `${a * b * d} ${c.u}`, `${a * (b + d)} ${c.u}`, `${total + 1} ${c.u}`]),
    expected: [`${total} ${c.u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le bloc contient ${a} × ${b} = ${a * b} cubes. On ajoute le petit morceau : ${a * b} + ${d} = ${total}. Le volume est ${total} ${c.u}.`),
  };
}

// ─── volume_comparer ────────────────────────────────────────────────────────
type CtxDeuxVolumes = { u: string; min: number; max: number; phrase: (p: Prenom, q: Prenom, a: string, b: string) => string };
const CTX_DEUX_VOLUMES: CtxDeuxVolumes[] = [
  { u: "dm³", min: 30, max: 90, phrase: (p, q, a, b) => `Le carton de déménagement ${de(p.nom)} a un volume de ${a}. Celui ${de(q.nom)} a un volume de ${b}.` },
  { u: "dm³", min: 20, max: 120, phrase: (p, q, a, b) => `L’aquarium ${de(p.nom)} contient ${a} d’eau. Celui ${de(q.nom)} en contient ${b}.` },
  { u: "m³", min: 2, max: 9, phrase: (p, q, a, b) => `La piscine gonflable ${de(p.nom)} contient ${a} d’eau. Celle ${de(q.nom)} en contient ${b}.` },
  { u: "cm³", min: 200, max: 450, phrase: (p, q, a, b) => `Le pot de confiture ${de(p.nom)} a un volume de ${a}. Celui ${de(q.nom)} a un volume de ${b}.` },
  { u: "dm³", min: 15, max: 35, phrase: (p, q, a, b) => `Le sac à dos ${de(p.nom)} a un volume de ${a}. Celui ${de(q.nom)} a un volume de ${b}.` },
  { u: "dm³", min: 40, max: 100, phrase: (p, q, a, b) => `Pour les vacances, la valise ${de(p.nom)} a un volume de ${a}. Celle ${de(q.nom)} a un volume de ${b}.` },
  { u: "dm³", min: 150, max: 350, phrase: (p, q, a, b) => `Le frigo des parents ${de(p.nom)} a un volume de ${a}. Celui des parents ${de(q.nom)} a un volume de ${b}.` },
  { u: "m³", min: 3, max: 15, phrase: (_p, _q, a, b) => `La citerne de la ferme contient ${a} d’eau de pluie. Celle du voisin en contient ${b}.` },
  { u: "cm³", min: 600, max: 1500, phrase: (p, q, a, b) => `La boîte à goûter ${de(p.nom)} a un volume de ${a}. Celle ${de(q.nom)} a un volume de ${b}.` },
  { u: "dm³", min: 300, max: 800, phrase: (p, q, a, b) => `La niche du chien ${de(p.nom)} a un volume de ${a}. Celle du chien ${de(q.nom)} a un volume de ${b}.` },
  { u: "m³", min: 20, max: 45, phrase: (p, q, a, b) => `La chambre ${de(p.nom)} contient ${a} d’air. Celle ${de(q.nom)} en contient ${b}.` },
  { u: "cm³", min: 30, max: 90, phrase: (p, q, a, b) => `La pâte à modeler ${de(p.nom)} occupe ${a}. Celle ${de(q.nom)} occupe ${b}.` },
  { u: "m³", min: 10, max: 30, phrase: (_p, _q, a, b) => `Sur le chantier, la benne du premier camion contient ${a} de sable. Celle du second en contient ${b}.` },
];
const QUESTIONS_DEUX_VOLUMES: { q: string; grand: boolean }[] = [
  { q: "Quel est le plus grand des deux volumes ?", grand: true },
  { q: "Écris le plus petit des deux volumes.", grand: false },
  { q: "Donne le plus grand volume.", grand: true },
  { q: "Quel volume est le plus petit ?", grand: false },
];

function genVolumeComparerDeux() {
  const ctx = pick(CTX_DEUX_VOLUMES);
  const [p, q] = deuxPrenoms();
  const a = randomInt(ctx.min, ctx.max);
  let b = randomInt(ctx.min, ctx.max);
  while (b === a) b = randomInt(ctx.min, ctx.max);
  const t = pick(QUESTIONS_DEUX_VOLUMES);
  const r = t.grand ? Math.max(a, b) : Math.min(a, b);
  return {
    text: `${ctx.phrase(p, q, `${nf(a)} ${ctx.u}`, `${nf(b)} ${ctx.u}`)} ${t.q}`,
    format: "short" as const,
    expected: avecUnite(r, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Les deux volumes sont dans la même unité (${ctx.u}) : on compare les nombres. ${nf(Math.min(a, b))} < ${nf(Math.max(a, b))}. Le plus ${t.grand ? "grand" : "petit"} est ${nf(r)} ${ctx.u}.`
    ),
  };
}

// Deux constructions de cubes identiques : il faut compter (multiplier) avant de comparer.
const PILES: { nom: string; f: boolean }[] = [
  { nom: "tour", f: true },
  { nom: "mur", f: false },
  { nom: "bloc", f: false },
  { nom: "pile", f: true },
  { nom: "caisse", f: true },
  { nom: "coffre", f: false },
];
function genVolumeComparerPiles() {
  const o = pick(PILES);
  const [p, q] = deuxPrenoms();
  const mot = pick(["étages", "couches"]);
  const tir = () => [randomInt(2, 6), randomInt(2, 9)];
  let [a, b] = tir();
  let [c, d] = tir();
  if (Math.random() < 0.25)
    for (let k = 0; k < 300; k++) {
      if (a * b === c * d && a !== c) break;
      [a, b] = tir();
      [c, d] = tir();
    }
  while (a === c && b === d) [c, d] = tir();
  // Le plus souvent, l'une a plus d'étages et l'autre plus de cubes par étage :
  // il faut multiplier pour conclure.
  if ((a - c) * (b - d) >= 0 && Math.random() < 0.75) {
    for (let k = 0; k < 50 && (a - c) * (b - d) >= 0; k++) [c, d] = tir();
  }
  const grand = Math.random() < 0.6;
  const V1 = a * b;
  const V2 = c * d;
  const celui = (x: Prenom) => `${o.f ? "celle" : "celui"} ${de(x.nom)}`;
  const egal = `${o.f ? "elles" : "ils"} ont le même volume`;
  const juste = V1 === V2 ? egal : (V1 > V2) === grand ? celui(p) : celui(q);
  const Le = o.f ? "La" : "Le";
  const text = `Tous les cubes sont pareils. ${Le} ${o.nom} ${de(p.nom)} a ${a} ${mot} de ${b} cubes. ${o.f ? "Celle" : "Celui"} ${de(q.nom)} a ${c} ${mot} de ${d} cubes. ${o.f ? "Laquelle" : "Lequel"} a le plus ${grand ? "grand" : "petit"} volume ?`;
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([celui(p), celui(q), egal]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `On compte les cubes : ${a} × ${b} = ${V1} et ${c} × ${d} = ${V2}. ${V1 === V2 ? "Il y en a autant : les volumes sont égaux, même si les formes diffèrent." : `Le plus ${grand ? "grand" : "petit"} volume est celui qui a ${grand ? Math.max(V1, V2) : Math.min(V1, V2)} cubes : c’est ${juste}.`}`
    ),
  };
}

// ─── volume_lire ────────────────────────────────────────────────────────────
// Reconnaître, parmi plusieurs mesures d'un objet, celle qui est un volume ;
// lire un volume écrit en lettres.
type Mesure = [number, number, string];
const FICHES: { de: string; longueur: Mesure; aire: Mesure; volume: Mesure; masse: Mesure }[] = [
  { de: "de l’aquarium", longueur: [40, 80, "cm"], aire: [8, 20, "dm²"], volume: [30, 120, "dm³"], masse: [10, 40, "kg"] },
  { de: "du carton de déménagement", longueur: [40, 60, "cm"], aire: [15, 30, "dm²"], volume: [40, 90, "dm³"], masse: [5, 20, "kg"] },
  { de: "de la piscine", longueur: [6, 12, "m"], aire: [20, 50, "m²"], volume: [30, 90, "m³"], masse: [200, 400, "kg"] },
  { de: "du frigo", longueur: [150, 180, "cm"], aire: [80, 110, "dm²"], volume: [200, 300, "dm³"], masse: [50, 70, "kg"] },
  { de: "de la valise", longueur: [55, 70, "cm"], aire: [20, 30, "dm²"], volume: [35, 80, "dm³"], masse: [3, 5, "kg"] },
  { de: "du coffre à jouets", longueur: [60, 90, "cm"], aire: [20, 40, "dm²"], volume: [60, 150, "dm³"], masse: [8, 15, "kg"] },
  { de: "de la boîte à bijoux", longueur: [8, 15, "cm"], aire: [60, 150, "cm²"], volume: [300, 900, "cm³"], masse: [150, 400, "g"] },
  { de: "de la trousse", longueur: [18, 22, "cm"], aire: [100, 150, "cm²"], volume: [700, 1200, "cm³"], masse: [100, 300, "g"] },
  { de: "du bac à fleurs", longueur: [50, 100, "cm"], aire: [10, 25, "dm²"], volume: [20, 60, "dm³"], masse: [3, 9, "kg"] },
  { de: "du sac de couchage roulé", longueur: [40, 50, "cm"], aire: [4, 8, "dm²"], volume: [10, 20, "dm³"], masse: [1, 2, "kg"] },
  { de: "de la niche du chien", longueur: [70, 110, "cm"], aire: [50, 90, "dm²"], volume: [300, 700, "dm³"], masse: [15, 30, "kg"] },
];
const tirerMesure = (m: Mesure) => `${nf(randomInt(m[0], m[1]))} ${m[2]}`;

function genVolumeLireMesures(combien: 2 | 4) {
  const f = pick(FICHES);
  const p = pick(PRENOMS);
  const vol = tirerMesure(f.volume);
  const autres = shuffle([tirerMesure(f.longueur), tirerMesure(f.aire), tirerMesure(f.masse)]).slice(0, combien - 1);
  const toutes = shuffle([vol, ...autres]);
  const liste = toutes.slice(0, -1).join(", ") + " et " + toutes[toutes.length - 1];
  const nombre = combien === 2 ? "deux" : "quatre";
  const text = pick([
    `Sur la fiche ${f.de} ${de(p.nom)}, on lit ${nombre} mesures : ${liste}. Laquelle est son volume ?`,
    `${p.nom} a noté ${nombre} mesures ${f.de} : ${liste}. Écris celle qui donne le volume.`,
    `Voici ${nombre} mesures ${f.de} : ${liste}. Quel est le volume ${f.de} ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(Number(vol.split(" ").slice(0, -1).join("").replace(",", ".")), vol.split(" ").pop()!),
    comparator: "number_equal" as const,
    explanation: expl(`Un volume s’écrit avec une unité cube (cm³, dm³, m³). La seule mesure de ce genre est ${vol}. Les autres sont une longueur, une aire ou une masse.`),
  };
}

const UNITES_MOTS: Record<string, string> = { "cm³": "centimètres cubes", "dm³": "décimètres cubes", "m³": "mètres cubes" };
const CHIFFRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const DIZAINES = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];
/** Un entier de 1 à 999 en lettres (orthographe traditionnelle, tirets). */
function enLettres(n: number): string {
  // 10 + u en lettres : « dix », « onze »… « seize », « dix-sept »… « dix-neuf ».
  const dixPlus = (u: number) => (u <= 6 ? CHIFFRES[10 + u] : `dix-${CHIFFRES[u]}`);
  if (n < 17) return CHIFFRES[n];
  if (n < 20) return dixPlus(n - 10);
  if (n < 100) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (d === 7 || d === 9) {
      const base = d === 7 ? "soixante" : "quatre-vingt";
      return `${base}${u === 1 && d === 7 ? " et " : "-"}${dixPlus(u)}`;
    }
    if (d === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${CHIFFRES[u]}`;
    if (u === 0) return DIZAINES[d];
    if (u === 1) return `${DIZAINES[d]} et un`;
    return `${DIZAINES[d]}-${CHIFFRES[u]}`;
  }
  const c = Math.floor(n / 100);
  const r = n % 100;
  const cent = c === 1 ? "cent" : `${CHIFFRES[c]} cent${r === 0 ? "s" : ""}`;
  return r === 0 ? cent : `${cent} ${enLettres(r)}`;
}

function genVolumeLireLettres() {
  const p = pick(PRENOMS);
  const u = pick(["cm³", "dm³", "m³"]);
  const objet =
    u === "cm³"
      ? pick(["une boîte de bonbons", "un pot de peinture", "une boule de pâte à modeler", "un moule à muffins"])
      : u === "dm³"
        ? pick(["un aquarium", "un carton", "une glacière", "un coffre de rangement"])
        : pick(["une piscine", "une benne", "un conteneur", "une citerne"]);
  const n = u === "m³" ? randomInt(12, 95) : randomInt(21, 980);
  // Pièges : chiffres inversés, cent de plus ou de moins, zéro ajouté, mauvaise unité.
  const inverse = Number(String(n).split("").reverse().join(""));
  const pieges = [inverse, n < 900 ? n + 100 : n - 100, n * 10].filter((x) => x !== n && x > 0);
  const lettres = `${enLettres(n)} ${UNITES_MOTS[u]}`;
  if (Math.random() < 0.6) {
    const text = pick([
      `Sur l’étiquette d’${objet}, ${p.nom} lit « ${lettres} ». Comment écrire ce volume avec des chiffres ?`,
      `${p.nom} entend : « ${lettres} ». Quelle écriture correspond ?`,
      `Écris avec des chiffres le volume « ${lettres} ».`,
    ]);
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${nf(n)} ${u}`, [`${nf(n)} ${u.replace("³", "²")}`, ...pieges.map((x) => `${nf(x)} ${u}`)]),
      expected: [`${nf(n)} ${u}`],
      comparator: "mcq_exact" as const,
      explanation: expl(`« ${lettres} » s’écrit ${nf(n)} ${u}. « Cube » se note avec le petit 3 : ${u}.`),
    };
  }
  const leurres = [
    `${enLettres(n)} ${UNITES_MOTS[u].replace(" cubes", " carrés")}`,
    ...pieges.filter((x) => x < 1000).map((x) => `${enLettres(x)} ${UNITES_MOTS[u]}`),
  ];
  return {
    text: pick([
      `Sur ${objet}, ${p.nom} lit ${nf(n)} ${u}. Comment se lit ce volume ?`,
      `Comment lit-on ${nf(n)} ${u} ?`,
      `${p.nom} doit lire à voix haute : ${nf(n)} ${u}. Que doit-${il(p)} dire ?`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(lettres, leurres),
    expected: [lettres],
    comparator: "mcq_exact" as const,
    explanation: expl(`${nf(n)} ${u} se lit « ${lettres} ». Le petit 3 de ${u} se dit « cube ».`),
  };
}

// ─── volume_defi ────────────────────────────────────────────────────────────
// Le pavé droit : longueur × largeur × hauteur (cubes rangés en couches).
const PAVES: { nom: string; f: boolean; u: string; L: [number, number]; l: [number, number]; h: [number, number] }[] = [
  { nom: "boîte à bijoux", f: true, u: "cm", L: [6, 12], l: [4, 8], h: [3, 6] },
  { nom: "boîte de jeu", f: true, u: "cm", L: [20, 30], l: [15, 20], h: [4, 8] },
  { nom: "boîte d’allumettes", f: true, u: "cm", L: [5, 6], l: [3, 4], h: [1, 2] },
  { nom: "aquarium", f: false, u: "dm", L: [4, 8], l: [2, 4], h: [3, 5] },
  { nom: "carton", f: false, u: "dm", L: [4, 6], l: [3, 4], h: [3, 5] },
  { nom: "bac à fleurs", f: false, u: "dm", L: [5, 10], l: [2, 3], h: [2, 3] },
  { nom: "coffre à jouets", f: false, u: "dm", L: [6, 9], l: [4, 5], h: [4, 5] },
  { nom: "piscine", f: true, u: "m", L: [4, 8], l: [2, 4], h: [1, 2] },
  { nom: "conteneur", f: false, u: "m", L: [6, 12], l: [2, 3], h: [2, 3] },
  { nom: "benne", f: true, u: "m", L: [3, 5], l: [2, 3], h: [1, 2] },
  { nom: "brique de jus", f: true, u: "cm", L: [6, 8], l: [4, 5], h: [9, 12] },
];
const tirerIntervalle = (r: [number, number]) => randomInt(r[0], r[1]);
const leMot = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `l’${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function genVolumePave() {
  const o = pick(PAVES);
  const p = pick(PRENOMS);
  const [a, b, h] = [tirerIntervalle(o.L), tirerIntervalle(o.l), tirerIntervalle(o.h)];
  // La longueur reste la plus grande des deux côtés du fond.
  const [L, l] = [Math.max(a, b), Math.min(a, b)];
  const V = L * l * h;
  const u = o.u;
  const parCubes = Math.random() < 0.4;
  const dims = pick([
    `${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut`,
    `${L} ${u} sur ${l} ${u}, et ${h} ${u} de hauteur`,
    `${h} ${u} de haut, ${L} ${u} de long et ${l} ${u} de large`,
  ]);
  const sujet = `${maj(leMot(o))} ${de(p.nom)}`;
  const text = parCubes
    ? `${sujet} est un pavé droit : ${dims}. Combien de cubes de 1 ${u}³ faut-il pour ${o.f ? "la" : "le"} remplir ?`
    : `${sujet} est un pavé droit : ${dims}. ${pick(["Quel est son volume ?", "Calcule son volume.", "Combien mesure son volume ?"])}`;
  return {
    text,
    format: "short" as const,
    expected: parCubes ? avecUnite(V, "cubes") : avecUnite(V, `${u}³`),
    comparator: "number_equal" as const,
    explanation: expl(
      `Volume d’un pavé droit = longueur × largeur × hauteur. Une couche contient ${L} × ${l} = ${L * l} cubes de 1 ${u}³ ; il y a ${h} couches : ${L * l} × ${h} = ${nf(V)}. ${parCubes ? `Il faut ${nf(V)} cubes.` : `Le volume est ${nf(V)} ${u}³.`}`
    ),
  };
}

function genVolumeDefiQcm() {
  const p = pick(PRENOMS);
  if (Math.random() < 0.5) {
    // Le cube d'arête a : a × a × a (et non 3 × a, ni a × a).
    const a = randomInt(2, 9);
    const u = pick(["cm", "dm", "m"]);
    const objet = u === "cm" ? pick(["un dé géant", "une boîte cubique", "un cube de bois"]) : u === "dm" ? pick(["un carton cubique", "un pouf cubique", "une caisse cubique"]) : pick(["un bassin cubique", "une cuve cubique"]);
    const text = pick([
      `${p.nom} a ${objet} de ${a} ${u} d’arête. Quel est son volume ?`,
      `${p.nom} remplit ${objet} de ${a} ${u} d’arête avec des cubes de 1 ${u}³. Quel est son volume ?`,
    ]);
    const V = a * a * a;
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(`${V} ${u}³`, [`${3 * a} ${u}³`, `${a * a} ${u}³`, `${6 * a * a} ${u}³`, `${V} ${u}²`]),
      expected: [`${V} ${u}³`],
      comparator: "mcq_exact" as const,
      explanation: expl(`Le cube est un pavé dont les trois dimensions valent ${a} ${u} : ${a} × ${a} × ${a} = ${V} ${u}³. Ce n’est ni ${a} × 3, ni ${a} × ${a}.`),
    };
  }
  // Deux boîtes : le volume se calcule, il ne se devine pas.
  const [q] = deuxPrenoms().filter((x) => x.nom !== p.nom);
  const tir = () => [randomInt(2, 6), randomInt(2, 6), randomInt(2, 6)];
  const A = tir();
  let B = tir();
  // Pas de boîte plus grande dans les trois sens : il faut multiplier pour savoir.
  const domine = (x: number[], y: number[]) => x.every((v, i) => v >= y[i]) || y.every((v, i) => v >= x[i]);
  for (let k = 0; k < 100 && (A.join() === B.join() || domine(A, B)); k++) B = tir();
  while (A.join() === B.join()) B = tir();
  const VA = A[0] * A[1] * A[2];
  const VB = B[0] * B[1] * B[2];
  const egal = "elles ont le même volume";
  const nomA = `celle ${de(p.nom)}`;
  const nomB = `celle ${de(q.nom)}`;
  const juste = VA === VB ? egal : VA > VB ? nomA : nomB;
  return {
    text: `La boîte ${de(p.nom)} mesure ${A[0]} dm sur ${A[1]} dm, et ${A[2]} dm de haut. Celle ${de(q.nom)} mesure ${B[0]} dm sur ${B[1]} dm, et ${B[2]} dm de haut. Laquelle a le plus grand volume ?`,
    format: "qcm" as const,
    choices: shuffle([nomA, nomB, egal]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(`${A.join(" × ")} = ${VA} dm³ et ${B.join(" × ")} = ${VB} dm³. ${VA === VB ? "Les deux volumes sont égaux." : `Le plus grand volume est ${Math.max(VA, VB)} dm³ : c’est ${juste}.`}`),
  };
}

function genVolumeDefiInverse() {
  const p = pick(PRENOMS);
  if (Math.random() < 0.35) {
    const u = pick(["cm", "dm"]);
    // Un pouf de 10 dm d'arête n'existe pas : 6 dm au plus.
    const a = randomInt(2, u === "cm" ? 10 : 6);
    const V = a * a * a;
    const objet = u === "cm" ? pick(["une boîte cubique", "un dé géant", "un cube en bois"]) : pick(["un carton cubique", "un pouf cubique", "une caisse cubique"]);
    return {
      text: `${p.nom} a ${objet} de ${nf(V)} ${u}³. ${pick(["Combien mesure son arête ?", "Quelle est la longueur d’une arête ?"])}`,
      format: "short" as const,
      expected: avecUnite(a, u),
      comparator: "number_equal" as const,
      explanation: expl(`On cherche le nombre qui, multiplié trois fois par lui-même, donne ${nf(V)} : ${a} × ${a} × ${a} = ${nf(V)}. L’arête mesure ${a} ${u}.`),
    };
  }
  // Un aquarium (ou un bac) au fond connu : la hauteur d'eau = volume ÷ aire du fond.
  const o = pick([
    { nom: "aquarium", u: "dm", L: [4, 8], l: [2, 4], h: [2, 5], quoi: "d’eau" },
    { nom: "bac à sable", u: "dm", L: [6, 10], l: [4, 6], h: [1, 3], quoi: "de sable" },
    { nom: "bassin", u: "m", L: [3, 6], l: [2, 4], h: [1, 2], quoi: "d’eau" },
    { nom: "bac à graines", u: "dm", L: [3, 6], l: [2, 4], h: [1, 3], quoi: "de terreau" },
  ] as const);
  const L = randomInt(o.L[0], o.L[1]);
  const l = randomInt(o.l[0], o.l[1]);
  const h = randomInt(o.h[0], o.h[1]);
  const V = L * l * h;
  const text = pick([
    `Le fond du ${o.nom} ${de(p.nom)} mesure ${L} ${o.u} sur ${l} ${o.u}. Il contient ${V} ${o.u}³ ${o.quoi}. Quelle hauteur ${o.quoi} y a-t-il ?`,
    `${p.nom} verse ${V} ${o.u}³ ${o.quoi} dans un ${o.nom} dont le fond mesure ${L} ${o.u} sur ${l} ${o.u}. Jusqu’à quelle hauteur monte le niveau ?`,
  ]).replace("Le fond du aquarium", "Le fond de l’aquarium");
  return {
    text,
    format: "short" as const,
    expected: avecUnite(h, o.u),
    comparator: "number_equal" as const,
    explanation: expl(`Une couche de 1 ${o.u} de haut contient ${L} × ${l} = ${L * l} ${o.u}³. Combien de couches pour ${V} ${o.u}³ ? ${V} ÷ ${L * l} = ${h}. La hauteur est ${h} ${o.u}.`),
  };
}

export const volumesBank: TutorBankItemV4[] = [
  // =========================
  // VOLUME_UNITE
  // =========================
  {
    kind: "fixed",
    id: "volume_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est adaptée pour mesurer le volume d’un aquarium ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure en unités “cubes”.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume mesure l’espace occupé par un objet en trois dimensions. On utilise donc des unités cubes, ici cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quel symbole correspond à une unité de volume ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "m/s"],
    expected: ["m³"],
    comparator: "mcq_exact",
    hint: "Le petit 3 indique un volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Une longueur s’écrit en m, une aire en m², et un volume en m³. L’exposant 3 correspond à trois dimensions.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Un volume se mesure plutôt en…",
    format: "qcm",
    choices: ["unités simples", "unités carrées", "unités cubes", "degrés"],
    expected: ["unités cubes"],
    comparator: "mcq_exact",
    hint: "On peut imaginer qu’on remplit avec des petits cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Pour mesurer un volume, on compte combien de petits cubes unités remplissent l’espace. On parle donc d’unités cubes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces écritures désigne un volume ?",
    format: "qcm",
    choices: ["12 cm", "12 cm²", "12 cm³", "12 g"],
    expected: ["12 cm³"],
    comparator: "mcq_exact",
    hint: "Regarde l’exposant.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("12 cm correspond à une longueur, 12 cm² à une aire, 12 g à une masse. Seule l’écriture 12 cm³ désigne un volume.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_unite_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le volume d’un grand bac à poissons à La Réunion, quelle unité peut-on utiliser ?",
    format: "qcm",
    choices: ["m", "m²", "m³", "cm"],
    expected: ["m³"],
    comparator: "mcq_exact",
    hint: "Un grand bac occupe un espace en trois dimensions.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Un grand bac prend de la place en longueur, largeur et hauteur. On mesure donc son volume en mètres cubes, notés m³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "unite", "reunion", "qcm"],
  },

  // =========================
  // VOLUME_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "volume_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 6 petits cubes identiques. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On compte simplement les cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume en cubes unités correspond ici au nombre total de petits cubes. Comme il y en a 6, le volume est 6 cubes unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un empilement contient 10 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Le volume correspond ici au nombre de cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Chaque cube unité compte pour 1 unité de volume. Avec 10 cubes unités, le volume est donc 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 2 rangées de 4 cubes. Quel est son volume en cubes unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "2 × 4 cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Il y a 2 rangées de 4 cubes. Donc le nombre total de cubes est 2 × 4 = 8. Le volume est 8 cubes unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "compter"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide contient 12 cubes unités. Son volume vaut…",
    format: "qcm",
    choices: ["12", "6", "24", "3"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "On compte les cubes unités.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume d’un solide construit avec des cubes unités est égal au nombre de cubes. Ici, 12 cubes donnent un volume de 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé est formé de 3 couches de 5 cubes chacune. Quel est son volume ?",
    format: "qcm",
    choices: ["8", "10", "15", "20"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "3 × 5 cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Chaque couche contient 5 cubes et il y a 3 couches. On calcule donc 3 × 5 = 15. Le volume est 15 cubes unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "compter", "qcm"],
  },

  // =========================
  // VOLUME_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "volume_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand : 8 cm³ ou 12 cm³ ?",
    format: "short",
    // ⛔ 06/10/2026 : contains_keyword « 12 » acceptait « 120 » → numérique, unité comprise.
    expected: ["12 cm³"],
    comparator: "number_equal",
    hint: "Compare les nombres 8 et 12.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Les deux volumes sont exprimés dans la même unité. Il suffit donc de comparer 8 et 12. Comme 12 est plus grand, 12 cm³ est le plus grand volume.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus petit : 15 cm³ ou 9 cm³ ?",
    format: "short",
    expected: ["9 cm³"],
    comparator: "number_equal",
    hint: "Compare les nombres 15 et 9.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Comme les unités sont les mêmes, on compare seulement les nombres. 9 est plus petit que 15, donc 9 cm³ est le plus petit volume.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "comparer"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel volume est le plus grand ?",
    format: "qcm",
    choices: ["7 cm³", "11 cm³", "9 cm³", "10 cm³"],
    expected: ["11 cm³"],
    comparator: "mcq_exact",
    hint: "Choisis le plus grand nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Tous les volumes sont en cm³. Le plus grand nombre proposé est 11, donc le plus grand volume est 11 cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide A contient 14 cubes. Un solide B contient 12 cubes. Lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["A", "B", "Ils sont égaux", "On ne peut pas savoir"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Le plus de cubes donne le plus grand volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume dépend ici du nombre de cubes unités. Le solide A contient 14 cubes contre 12 pour B, donc A a le plus grand volume.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Quel bac contient le plus : 18 cm³ ou 25 cm³ ?",
    format: "short",
    expected: ["25 cm³"],
    comparator: "number_equal",
    hint: "Le plus grand nombre donne le plus grand volume.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Comme les deux volumes sont donnés en cm³, on compare 18 et 25. Le plus grand est 25, donc le bac de 25 cm³ contient le plus.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "comparer", "reunion"],
  },

  // =========================
  // VOLUME_ASSEMBLAGE
  // =========================
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble deux solides de 4 cubes et 3 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "On additionne les cubes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Quand on assemble deux solides sans enlever de cubes, on additionne leurs volumes. Ici 4 + 3 = 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide de 6 cubes est collé à un solide de 5 cubes. Quel est le volume total ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "6 + 5.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume total est la somme des cubes des deux solides : 6 + 5 = 11.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "assemblage"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On assemble 8 cubes et 4 cubes. Le volume total est…",
    format: "qcm",
    choices: ["4", "8", "12", "16"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Additionne 8 et 4.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Assembler 8 cubes et 4 cubes donne un total de 12 cubes. Le volume total est donc 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "assemblage", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_assemblage_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Un solide A de 10 cubes est coupé en deux morceaux de 4 cubes et 6 cubes. Si on réassemble les deux morceaux, quel volume retrouve-t-on ?",
    format: "qcm",
    choices: ["4", "6", "10", "14"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Le volume total reste le même.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Couper puis réassembler ne change pas le nombre total de cubes. Comme 4 + 6 = 10, on retrouve un volume de 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "assemblage", "qcm"],
  },

  // =========================
  // VOLUME_LIRE
  // =========================
  {
    kind: "fixed",
    id: "volume_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’écriture 18 cm³, quel est le volume ?",
    format: "short",
    expected: ["18 cm³"],
    comparator: "number_equal",
    hint: "Lis le nombre avant l’unité.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Dans 18 cm³, le nombre 18 indique la quantité de volume. Le volume vaut donc 18 cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Le solide a un volume de 24 cm³. Combien cela représente-t-il de cubes unités de 1 cm³ ?",
    format: "short",
    expected: ["24 cubes"],
    comparator: "number_equal",
    hint: "24 cm³ = 24 cubes de 1 cm³.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Un cube unité de 1 cm³ compte pour 1. Donc un volume de 24 cm³ correspond à 24 cubes unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "lire"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans “9 m³”, le volume vaut…",
    format: "qcm",
    choices: ["3", "9", "27", "90"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On lit directement le nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Dans l’écriture 9 m³, le nombre qui donne la valeur du volume est 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide a le plus grand volume ?",
    format: "qcm",
    choices: ["6 cm³", "14 cm³", "9 cm³", "12 cm³"],
    expected: ["14 cm³"],
    comparator: "mcq_exact",
    hint: "Lis le nombre avant l’unité.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Tous les volumes sont donnés dans la même unité. Le plus grand nombre est 14, donc le plus grand volume est 14 cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "lire", "qcm"],
  },
  {
    kind: "fixed",
    id: "volume_lire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 3,
    theme: "reunion",
    text: "Un bac de culture a un volume de 30 cm³. Combien de cubes unités cela représente-t-il ?",
    format: "short",
    expected: ["30 cubes"],
    comparator: "number_equal",
    hint: "Le nombre donne directement le volume en cubes unités de 1 cm³.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Si chaque cube unité vaut 1 cm³, alors 30 cm³ correspond à 30 cubes unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "lire", "reunion"],
  },

  // =========================
  // VOLUME_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "volume_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit que le volume d’une boîte est 24 cm². Qu’est-ce qui cloche dans sa réponse ?",
    format: "short",
    expected: ["cm³", "cm3", "trois dimensions", "3 dimensions", "cube", "aire"],
    comparator: "contains_keyword",
    hint: "Regarde l’unité, pas le nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le nombre peut être juste, mais l’unité ne l’est pas. Le cm² mesure une surface, une grandeur plate, à deux dimensions. Une boîte occupe un espace : longueur, largeur ET hauteur, donc trois dimensions. Le volume s’exprime en cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 06/10/2026 : question ouverte dont les mots-clés étaient « 12 », « 9 »…
    // (« 9 » seul suffisait). QCM sur la même idée.
    text: "Les cubes sont tous pareils. Pourquoi un solide de 12 cubes a-t-il un volume plus grand qu’un solide de 9 cubes ? Choisis la bonne explication.",
    format: "qcm",
    choices: [
      "le volume est le nombre de cubes, et 12 cubes, c’est plus que 9 cubes",
      "le solide de 12 cubes est forcément plus haut",
      "le solide de 12 cubes est forcément plus long",
      "on ne peut pas savoir sans voir la forme des solides",
    ],
    expected: ["le volume est le nombre de cubes, et 12 cubes, c’est plus que 9 cubes"],
    comparator: "mcq_exact",
    hint: "Plus il y a de cubes, plus le volume est grand.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Le volume correspond ici au nombre de cubes unités. Comme 12 cubes est plus grand que 9 cubes, le solide de 12 cubes a le plus grand volume.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de volume compris entre 10 cm³ et 15 cm³.",
    format: "short",
    expected: ["11", "12", "13", "14"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Un nombre compris strictement entre 10 et 15 peut être 11, 12, 13 ou 14. Chacun convient comme exemple.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "volume_defi_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux bacs de 18 cm³ et 12 cm³ sont réunis. Quel volume total obtient-on ?",
    format: "short",
    expected: ["30 cm³"],
    comparator: "number_equal",
    hint: "Additionne les deux volumes.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : on compte les cubes unités ou on utilise les dimensions données.\n\n" +
      "Calcul : " +
      ("Quand on réunit deux volumes, on les additionne. Ici 18 + 12 = 30 cm³.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["volume_solide", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - UNITE
  // =========================
  {
    kind: "template",
    id: "volume_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Un volume se mesure en unités cubes.",
    tags: ["volume_solide", "unite", "template"],
    generate: () => genVolumeUnite(),
  },
  {
    kind: "template",
    id: "volume_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplir, c’est le volume ; couvrir, c’est l’aire. Un volume s’écrit avec l’exposant 3.",
    tags: ["volume_solide", "unite", "template"],
    generate: () => (Math.random() < 0.7 ? genVolumeGrandeur() : genVolumeUnite()),
  },

  // =========================
  // TEMPLATES - COMPTER
  // =========================
  {
    kind: "template",
    id: "volume_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Le volume correspond au nombre de cubes unités.",
    tags: ["volume_solide", "compter", "template"],
    generate: () => genVolumeCompterEtages(),
  },
  {
    kind: "template",
    id: "volume_compter_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de couches par le nombre de cubes par couche.",
    tags: ["volume_solide", "compter", "template"],
    generate: () => genVolumeCompterCouches(false),
  },
  {
    kind: "template",
    id: "volume_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte ou multiplie les cubes.",
    tags: ["volume_solide", "compter", "qcm", "template"],
    // Pièges : additionner au lieu de multiplier, oublier une dimension,
    // l'unité carrée. makeChoices écarte un piège qui tomberait sur la réponse
    // (à 2 × 2, la somme vaut le produit).
    generate: () => genVolumeCompterCouches(true),
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "volume_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["volume_solide", "comparer", "template"],
    // ⛔ 06/10/2026 — était en contains_keyword avec « 15 » comme mot-clé
    // (« 150 » passait). Comparateur numérique, unité comprise.
    generate: () => genVolumeComparerDeux(),
  },
  {
    kind: "template",
    id: "volume_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cubes de chaque construction avant de comparer.",
    tags: ["volume_solide", "comparer", "qcm", "template"],
    generate: () => genVolumeComparerPiles(),
  },

  // =========================
  // TEMPLATES - ASSEMBLAGE
  // =========================
  {
    kind: "template",
    id: "volume_assemblage_tpl_e2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 2,
    theme: "neutral",
    hint: "Assembler ne change pas le nombre de cubes : additionne.",
    tags: ["volume_solide", "assemblage", "template"],
    generate: () => genVolumeAssembler(),
  },
  {
    kind: "template",
    id: "volume_assemblage_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute les cubes posés, enlève les cubes retirés.",
    tags: ["volume_solide", "assemblage", "template"],
    generate: () => genVolumeAssemblerRetirer(),
  },
  {
    kind: "template",
    id: "volume_assemblage_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte d’abord les cubes du bloc, puis ajoute le petit morceau.",
    tags: ["volume_solide", "assemblage", "qcm", "template"],
    generate: () => genVolumeAssemblerEtages(),
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "volume_lire_tpl_e1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Un volume s’écrit avec une unité cube : cm³, dm³, m³.",
    tags: ["volume_solide", "lire", "template"],
    generate: () => genVolumeLireMesures(2),
  },
  {
    kind: "template",
    id: "volume_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la mesure avec le petit 3 : cm³, dm³ ou m³.",
    tags: ["volume_solide", "lire", "template"],
    generate: () => genVolumeLireMesures(4),
  },
  {
    kind: "template",
    id: "volume_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "« Cube » se dit pour le petit 3 : cm³ se lit « centimètres cubes ».",
    tags: ["volume_solide", "lire", "qcm", "template"],
    generate: () => genVolumeLireLettres(),
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "volume_defi_tpl_e3",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume d’un pavé = longueur × largeur × hauteur.",
    tags: ["volume_solide", "defi", "pave", "template"],
    generate: () => genVolumePave(),
  },
  {
    kind: "template",
    id: "volume_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie les TROIS dimensions.",
    tags: ["volume_solide", "defi", "qcm", "template"],
    // ⛔ 06/10/2026 — était en contains_keyword avec un nombre seul comme
    // mot-clé. Remplacé par un QCM : le cube (a × a × a, pas 3 × a) et deux
    // boîtes à comparer par le calcul.
    generate: () => genVolumeDefiQcm(),
  },
  {
    kind: "template",
    id: "volume_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une couche de 1 de haut contient longueur × largeur cubes : combien de couches ?",
    tags: ["volume_solide", "defi", "template"],
    // 06/10/2026 — était « donne un volume entre 9 et 14 cm³ » : aucun volume
    // à calculer. Remplacé par le chemin inverse : l'arête d'un cube, la
    // hauteur d'eau d'un aquarium.
    generate: () => genVolumeDefiInverse(),
  },

  // ===== TOP-UP — VOLUME_UNITE =====
  { kind: "fixed", id: "volume_unite_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_unite", difficulty: 1, theme: "neutral",
    text: "Quelle unité est adaptée pour mesurer le volume d’une piscine ?", format: "qcm", choices: ["m³", "m²", "m", "kg"], expected: ["m³"], comparator: "mcq_exact",
    hint: "Une grande place occupée en 3 dimensions.", explanation: expl("Une piscine occupe un grand espace en trois dimensions. On utilise une unité cube adaptée aux grandes tailles : le mètre cube (m³)."), tags: ["volume_solide", "unite", "qcm"] },
  { kind: "fixed", id: "volume_unite_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_unite", difficulty: 2, theme: "neutral",
    text: "Un volume se mesure avec des unités...", format: "qcm", choices: ["cubes", "carrées", "de longueur", "de masse"], expected: ["cubes"], comparator: "mcq_exact",
    hint: "Le volume occupe l’espace en 3 dimensions.", explanation: expl("Un volume occupe l’espace en trois dimensions. On le mesure avec des unités cubes (cm³, m³…)."), tags: ["volume_solide", "unite", "qcm"] },
  { kind: "fixed", id: "volume_unite_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_unite", difficulty: 2, theme: "neutral",
    text: "Laquelle de ces écritures est une mesure de volume ?", format: "qcm", choices: ["12 cm³", "12 cm²", "12 cm", "12 kg"], expected: ["12 cm³"], comparator: "mcq_exact",
    hint: "Le petit « 3 » indique une unité cube.", explanation: expl("Le cm³ (centimètre cube) est une unité de volume. « 12 cm³ » est donc une mesure de volume (cm² = aire, cm = longueur, kg = masse)."), tags: ["volume_solide", "unite", "qcm"] },

  // ===== TOP-UP — VOLUME_LIRE =====
  { kind: "fixed", id: "volume_lire_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_lire", difficulty: 1, theme: "neutral",
    text: "Dans l’écriture 25 cm³, quel est le volume ?", format: "short", expected: ["25 cm³"], comparator: "number_equal",
    hint: "Lis le nombre avant l’unité.", explanation: expl("Dans 25 cm³, le nombre 25 indique la quantité de volume. Le volume vaut 25 cm³."), tags: ["volume_solide", "lire"] },
  { kind: "fixed", id: "volume_lire_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_lire", difficulty: 1, theme: "neutral",
    text: "Un petit cube unité mesure 1 cm de côté. Quel est son volume ?", format: "short", expected: ["1 cm³"], comparator: "number_equal",
    hint: "C’est le cube unité.", explanation: expl("Un cube de 1 cm de côté est le cube unité : son volume est 1 cm³."), tags: ["volume_solide", "lire", "cube_unite"] },
  { kind: "fixed", id: "volume_lire_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_lire", difficulty: 2, theme: "neutral",
    text: "Un solide est formé de 14 cubes unités. Quel est son volume ?", format: "short", expected: ["14"], comparator: "number_equal",
    hint: "Chaque cube vaut 1 cm³.", explanation: expl("Chaque cube unité vaut 1 cm³. Un solide de 14 cubes a donc un volume de 14 cm³."), tags: ["volume_solide", "lire"] },

  // ===== TOP-UP — VOLUME_COMPARER =====
  { kind: "fixed", id: "volume_comparer_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 1, theme: "neutral",
    text: "Le solide A est fait de 12 cubes, le solide B de 9 cubes. Lequel a le plus grand volume ?", format: "qcm", choices: ["le solide A", "le solide B", "ils sont égaux"], expected: ["le solide A"], comparator: "mcq_exact",
    hint: "Compare le nombre de cubes.", explanation: expl("On compte les cubes : A = 12, B = 9. Comme 12 > 9, le solide A a le plus grand volume."), tags: ["volume_solide", "comparer", "qcm"] },
  { kind: "fixed", id: "volume_comparer_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 2, theme: "neutral",
    text: "Deux solides sont faits chacun de 8 cubes. Ont-ils le même volume ?", format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Compte les cubes de chacun.", explanation: expl("Les deux solides ont 8 cubes, donc le même volume : 8 cm³. La forme peut être différente, mais le volume est identique."), tags: ["volume_solide", "comparer", "qcm"] },
  { kind: "fixed", id: "volume_comparer_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 2, theme: "neutral",
    text: "Un solide a 15 cubes, un autre 9 cubes. Combien de cubes de plus a le premier ?", format: "short", expected: ["6 cubes"], comparator: "number_equal",
    hint: "Calcule 15 − 9.", explanation: expl("On calcule l’écart : 15 - 9 = 6. Le premier solide a 6 cubes de plus."), tags: ["volume_solide", "comparer"] },

  // ===== TOP-UP — VOLUME_ASSEMBLAGE =====
  { kind: "fixed", id: "volume_assemblage_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    text: "On assemble un solide de 5 cubes et un solide de 6 cubes. Quel est le volume total ?", format: "short", expected: ["11"], comparator: "number_equal",
    hint: "Additionne les cubes.", explanation: expl("On additionne les volumes : 5 + 6 = 11 cubes, soit 11 cm³."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    text: "Un pavé est formé de 2 couches de 6 cubes. Combien de cubes contient-il ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "2 × 6.", explanation: expl("Chaque couche a 6 cubes, et il y a 2 couches : 2 × 6 = 12 cubes."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 3, theme: "neutral",
    text: "Un grand cube est formé de petits cubes : 2 sur chaque arête (2 × 2 × 2). Combien de petits cubes contient-il ?", format: "short", expected: ["8 cubes"], comparator: "number_equal",
    hint: "2 × 2 × 2.", explanation: expl("On multiplie les trois dimensions : 2 × 2 × 2 = 8 petits cubes."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_4", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    text: "On empile 3 étages de 4 cubes chacun. Combien de cubes en tout ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "3 × 4.", explanation: expl("3 étages de 4 cubes : 3 × 4 = 12 cubes."), tags: ["volume_solide", "assemblage"] },

  // ===== TOP-UP — VOLUME_DEFI =====
  { kind: "fixed", id: "volume_defi_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    text: "Défi : quel est le volume (en cm³) d’un pavé droit de dimensions 3 cm × 2 cm × 4 cm ?", format: "short", expected: ["24 cm³"], comparator: "number_equal",
    hint: "Volume = Longueur × largeur × hauteur.", explanation: expl("Le volume d’un pavé droit est Longueur × largeur × hauteur : 3 × 2 × 4 = 24, donc 24 cm³."), tags: ["volume_solide", "defi", "pave"] },
  { kind: "fixed", id: "volume_defi_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    text: "Défi : quel est le volume (en cm³) d’un cube d’arête 3 cm ?", format: "short", expected: ["27 cm³"], comparator: "number_equal",
    hint: "3 × 3 × 3.", explanation: expl("Le volume d’un cube est arête × arête × arête : 3 × 3 × 3 = 27, donc 27 cm³."), tags: ["volume_solide", "defi", "cube"] },
  { kind: "fixed", id: "volume_defi_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 2, theme: "neutral",
    text: "Défi : un pavé droit mesure 5 cm × 2 cm × 1 cm. Quel est son volume en cm³ ?", format: "short", expected: ["10 cm³"], comparator: "number_equal",
    hint: "5 × 2 × 1.", explanation: expl("Volume = 5 × 2 × 1 = 10, donc 10 cm³."), tags: ["volume_solide", "defi", "pave"] },
  { kind: "fixed", id: "volume_defi_topup_4", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    text: "Défi : combien de cubes de 1 cm³ faut-il pour remplir entièrement une boîte de 2 cm × 3 cm × 2 cm ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "Calcule le volume de la boîte.", explanation: expl("Le volume de la boîte est 2 × 3 × 2 = 12 cm³. Il faut donc 12 cubes de 1 cm³ pour la remplir."), tags: ["volume_solide", "defi"] },
];