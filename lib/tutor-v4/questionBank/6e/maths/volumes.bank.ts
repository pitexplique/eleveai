import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, il, Il, nf, avecUnite, deuxPrenoms, type Prenom } from "./aires.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

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
  return melangeEnPlace([...arr]);
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
      canvas: dessinObjet(o.de), // 14/11/2026 : la forme de l'objet, sans aucune mesure
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
    canvas: dessinObjet(o.de),
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
    // 14/11/2026 : l'objet, neutre (aucune face, aucun bord surligné) : il ne désigne pas la grandeur.
    canvas: dessinObjet(a.phrase),
  };
}

// ─── volume_compter, volume_assemblage ──────────────────────────────────────
// Des solides faits de cubes UNITÉS (1 cm³, 1 dm³ ou 1 m³) : le volume est le
// nombre de cubes, suivi de l'unité du cube.
// 07/11/2026 : intros de 10 mots au plus, l'énoncé ★3 tient en 25 mots.
const CONSTRUCTIONS: { intro: (p: Prenom) => string; u: string }[] = [
  { intro: (p) => `${p.nom} construit une tour en cubes de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} fait un escalier en cubes de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} construit un château en cubes de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} empile des cubes en mousse de 1 dm³.`, u: "dm³" },
  { intro: (p) => `${p.nom} construit un robot en cubes de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} bâtit une pyramide en sucres de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} monte un mur en briques cubiques de 1 dm³.`, u: "dm³" },
  { intro: (p) => `${p.nom} remplit un coffre de cubes de 1 dm³.`, u: "dm³" },
  { intro: () => `Sur un chantier, on empile des cubes de 1 m³.`, u: "m³" },
  { intro: () => `Au port, on range des caisses cubiques de 1 m³.`, u: "m³" },
  { intro: (p) => `${p.nom} fait une maison en cubes de 1 cm³.`, u: "cm³" },
  { intro: (p) => `${p.nom} construit une cabane en cubes de 1 dm³.`, u: "dm³" },
];
const questionVolume = () => pick(["Quel est le volume ?", "Calcule le volume total.", "Quel volume obtient-on ?", "Combien mesure le volume ?"]);

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 14/11/2026 — PLUS DE FIGURES (13 % des énoncés en avaient). Les cubes
// décrits par le texte sont DESSINÉS : étages, couches, rangées, morceaux
// séparés d'un cube vide. Le canvas `assemblage_cubes` projette depuis une
// origine fixe (160, 170), pas de 32 px : `cubesCadres` décale le solide pour
// qu'il tienne dans les 340 px, et ne rend RIEN s'il déborde (pas de figure
// plutôt qu'une figure coupée). Jamais le compte écrit (`showLabels: false`).
// ═══════════════════════════════════════════════════════════════════════════
type Cube = { x: number; y: number; z: number };
function cubesCadres(cubes: Cube[]) {
  if (!cubes.length) return undefined;
  let mieux: { dx: number; dy: number; score: number } | null = null;
  for (let dx = -8; dx <= 8; dx++)
    for (let dy = -8; dy <= 8; dy++) {
      let [gauche, droite, haut, bas] = [Infinity, -Infinity, Infinity, -Infinity];
      for (const c of cubes) {
        const px = 160 + (c.x + dx - c.y - dy) * 27.2;
        const py = 170 + (c.x + dx + c.y + dy) * 15.36 - c.z * 32;
        [gauche, droite, haut, bas] = [Math.min(gauche, px - 27.2), Math.max(droite, px + 27.2), Math.min(haut, py - 32), Math.max(bas, py + 30.72)];
      }
      if (gauche < 4 || droite > 336 || haut < 4) continue;
      const score = bas + Math.abs((gauche + droite) / 2 - 170);
      if (!mieux || score < mieux.score) mieux = { dx, dy, score };
    }
  if (!mieux) return undefined;
  const { dx, dy } = mieux;
  return figureCubes(cubes.map((c) => ({ x: c.x + dx, y: c.y + dy, z: c.z })));
}
/** n cubes en mur (plan y = 0), `largeur` par rangée : rangées pleines en bas, le reste au-dessus, à gauche. */
function mur(n: number, largeur: number, x0 = 0): Cube[] {
  return Array.from({ length: n }, (_, i) => ({ x: x0 + (i % largeur), y: 0, z: Math.floor(i / largeur) }));
}
/** Des morceaux posés côte à côte, séparés d'une place vide : on les voit distincts. */
function morceaux(ns: number[], largeurMax = 4): Cube[] {
  let x0 = 0;
  const cubes: Cube[] = [];
  for (const n of ns) {
    const w = Math.min(n, largeurMax);
    cubes.push(...mur(n, w, x0));
    x0 += w + 1;
  }
  return cubes;
}
/** Un pavé de cubes : `long` cubes par rangée, `rangees` rangées, `couches` couches. */
function paveDeCubes(long: number, rangees: number, couches: number): Cube[] {
  const cubes: Cube[] = [];
  for (let z = 0; z < couches; z++) for (let y = 0; y < rangees; y++) for (let x = 0; x < long; x++) cubes.push({ x, y, z });
  return cubes;
}
/** Le premier découpage en murs de largeur 3 à 7 qui tient dans le cadre. */
function cubesCadresLargeur(fabrique: (largeur: number) => Cube[], largeurs = [5, 4, 6, 3, 7], zMax = 3) {
  // Des murs de 4 rangées au plus : plus haut, deux murs côte à côte se lisent mal (aperçu du 14/11).
  for (const w of largeurs) {
    const cubes = fabrique(w);
    if (Math.max(...cubes.map((c) => c.z)) > zMax) continue;
    const f = cubesCadres(cubes);
    if (f) return f;
  }
  return undefined;
}
/** L'objet dessiné SANS mesure (volume_unite, volume_lire) : la forme seule, rien qui donne l'unité ni la grandeur. */
function dessinObjet(de: string) {
  const solide: "cube" | "pave_droit" | "cylindre" | "boule" | null =
    /dé à jouer|sucre/.test(de) ? "cube"
    : /yaourt|verre|citerne|trousse|sac de couchage|seau|moule à gâteau|pot de peinture/.test(de) ? "cylindre"
    : /balle|boule/.test(de) ? "boule"
    : /gomme|boîte|piscine|chambre|benne|conteneur|abri|salle|aquarium|carton|frigo|valise|coffre|bac|niche|jardinière|tiroir|glacière/.test(de) ? "pave_droit"
    : null;
  if (!solide) return undefined;
  return { kind: "solide_3d" as const, solide, highlight: { base: false }, display: { showLabels: false, showDimensions: false, showFormulaHint: false } };
}

function genVolumeCompterEtages() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  // 03/11/2026 (★3) : 2 ou 3 étages, jamais plus de cubes en haut qu'en bas (texte plus court, solide qui tient).
  const n = randomInt(2, 3);
  const k: number[] = [];
  for (let i = 0; i < n; i++) k.push(randomInt(1, i === 0 ? 9 : k[i - 1]));
  const cubes = `${k[0]} cube${k[0] > 1 ? "s" : ""} en bas`;
  const liste = n === 2 ? `${cubes}, ${k[1]} en haut` : `${cubes}, ${k[1]} au milieu et ${k[2]} en haut`;
  const total = k.reduce((a, b) => a + b, 0);
  return {
    text: `${c.intro(p)} ${liste}. ${questionVolume()}`,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`Chaque cube a un volume de 1 ${c.u}. On compte tous les cubes : ${k.join(" + ")} = ${total}. Le volume est ${total} ${c.u}.`),
    // 14/11/2026 : les étages du texte, dessinés en escalier (aucun cube caché).
    canvas: cubesCadres(k.flatMap((nb, z) => mur(nb, nb).map((c) => ({ ...c, z })))),
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
        `Le pavé a ${a} couches de ${b} rangées de ${d} cubes.`,
      ])
    : pick([`Le solide a ${a} étages de ${b} cubes.`, `La construction a ${a} couches de ${b} cubes.`]);
  const calc = triple
    ? `Une couche contient ${b} × ${d} = ${b * d} cubes. Il y a ${a} couches : ${a} × ${b * d} = ${total} cubes. Le volume est ${total} ${c.u}.`
    : `${a} étages de ${b} cubes : ${a} × ${b} = ${total} cubes. Le volume est ${total} ${c.u}.`;
  const text = `${c.intro(p)} ${forme} ${questionVolume()}`;
  // 14/11/2026 : le pavé du texte (d cubes par rangée, b rangées, a couches), ou le mur de a étages de b cubes.
  const canvas = cubesCadres(triple ? paveDeCubes(d, b, a) : mur(a * b, b));
  if (!qcm) return { text, format: "short" as const, expected: avecUnite(total, c.u), comparator: "number_equal" as const, explanation: expl(calc), canvas };
  return {
    canvas,
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

function genVolumeAssembler() {
  const c = pick(CONSTRUCTIONS);
  const p = pick(PRENOMS);
  // 03/11/2026 (★3) : deux morceaux, pour rester vers 25 mots.
  const k = [randomInt(2, 12), randomInt(2, 12)];
  const total = k.reduce((a, b) => a + b, 0);
  const sujet = /^(Sur|Au port)/.test(c.intro(p)) ? "On" : Il(p);
  const text = `${c.intro(p)} ${sujet} assemble deux morceaux : ${k[0]} cubes et ${k[1]} cubes. ${pick([
    "Quel est le volume obtenu ?",
    "Calcule le volume de l’assemblage.",
    "Quel volume obtient-on en tout ?",
  ])}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`Assembler ne change pas le nombre de cubes : on additionne les volumes. ${k.join(" + ")} = ${total} ${c.u}.`),
    canvas: cubesCadresLargeur((w) => morceaux(k, w), [4, 3, 5]), // 14/11/2026 : les deux morceaux, avant assemblage
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
  const text = `${c.intro(p)} ${sujet} pose ${a} cubes, ajoute ${b} cubes, puis retire ${r} cube${r > 1 ? "s" : ""}. ${questionVolume()}`;
  return {
    text,
    format: "short" as const,
    expected: avecUnite(total, c.u),
    comparator: "number_equal" as const,
    explanation: expl(`On ajoute les cubes posés, on enlève les cubes retirés : ${a} + ${b} − ${r} = ${total}. Le volume est ${total} ${c.u}.`),
    canvas: cubesCadres(mur(a, 5)), // 14/11/2026 : les ${a} cubes posés au départ, seulement
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
  const text = `${c.intro(p)} ${sujet} pose ${a} étages de ${b} cubes, puis ${d} cubes. ${questionVolume()}`;
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(`${total} ${c.u}`, [`${a + b + d} ${c.u}`, `${a * b} ${c.u}`, `${a * b * d} ${c.u}`, `${a * (b + d)} ${c.u}`, `${total + 1} ${c.u}`]),
    expected: [`${total} ${c.u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Les étages contiennent ${a} × ${b} = ${a * b} cubes. On ajoute les autres cubes : ${a * b} + ${d} = ${total}. Le volume est ${total} ${c.u}.`),
    // 14/11/2026 : les étages, puis les ${d} cubes à part (s'ils tiennent dans le cadre).
    canvas: cubesCadres([...mur(a * b, b), ...mur(d, Math.min(d, 3), b + 1)]),
  };
}

// ─── volume_comparer ────────────────────────────────────────────────────────
type CtxDeuxVolumes = { u: string; min: number; max: number; phrase: (p: Prenom, q: Prenom, a: string, b: string) => string };
const CTX_DEUX_VOLUMES: CtxDeuxVolumes[] = [
  { u: "dm³", min: 30, max: 90, phrase: (p, q, a, b) => `Le carton de déménagement ${de(p.nom)} fait ${a}. Celui ${de(q.nom)} fait ${b}.` },
  { u: "dm³", min: 20, max: 120, phrase: (p, q, a, b) => `L’aquarium ${de(p.nom)} contient ${a} d’eau. Celui ${de(q.nom)} en contient ${b}.` },
  { u: "m³", min: 2, max: 9, phrase: (p, q, a, b) => `La piscine gonflable ${de(p.nom)} contient ${a} d’eau. Celle ${de(q.nom)} en contient ${b}.` },
  { u: "cm³", min: 200, max: 450, phrase: (p, q, a, b) => `Le pot de confiture ${de(p.nom)} fait ${a}. Celui ${de(q.nom)} fait ${b}.` },
  { u: "dm³", min: 15, max: 35, phrase: (p, q, a, b) => `Le sac à dos ${de(p.nom)} fait ${a}. Celui ${de(q.nom)} fait ${b}.` },
  { u: "dm³", min: 40, max: 100, phrase: (p, q, a, b) => `La valise ${de(p.nom)} fait ${a}. Celle ${de(q.nom)} fait ${b}.` },
  { u: "dm³", min: 150, max: 350, phrase: (p, q, a, b) => `Le frigo des parents ${de(p.nom)} fait ${a}. Celui des parents ${de(q.nom)} fait ${b}.` },
  { u: "m³", min: 3, max: 15, phrase: (_p, _q, a, b) => `La citerne de la ferme contient ${a} d’eau. Celle du voisin en contient ${b}.` },
  { u: "cm³", min: 600, max: 1500, phrase: (p, q, a, b) => `La boîte à goûter ${de(p.nom)} fait ${a}. Celle ${de(q.nom)} fait ${b}.` },
  { u: "dm³", min: 300, max: 800, phrase: (p, q, a, b) => `La niche du chien ${de(p.nom)} fait ${a}. Celle du chien ${de(q.nom)} fait ${b}.` },
  { u: "m³", min: 20, max: 45, phrase: (p, q, a, b) => `La chambre ${de(p.nom)} contient ${a} d’air. Celle ${de(q.nom)} en contient ${b}.` },
  { u: "cm³", min: 30, max: 90, phrase: (p, q, a, b) => `La pâte à modeler ${de(p.nom)} occupe ${a}. Celle ${de(q.nom)} occupe ${b}.` },
  { u: "m³", min: 10, max: 30, phrase: (_p, _q, a, b) => `La benne du premier camion contient ${a} de sable. Celle du second en contient ${b}.` },
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
  // 14/11/2026 : les deux constructions, celle du premier nommé à gauche (rien si elles ne tiennent pas).
  const canvas = cubesCadres([...mur(a * b, b), ...mur(c * d, d, b + 1)]);
  const text = `Mêmes cubes. ${Le} ${o.nom} ${de(p.nom)} : ${a} ${mot} de ${b} cubes. ${o.f ? "Celle" : "Celui"} ${de(q.nom)} : ${c} ${mot} de ${d} cubes. ${o.f ? "Laquelle" : "Lequel"} a le plus ${grand ? "grand" : "petit"} volume ?`;
  return {
    text,
    canvas,
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
  { de: "du sac de couchage", longueur: [40, 50, "cm"], aire: [4, 8, "dm²"], volume: [10, 20, "dm³"], masse: [1, 2, "kg"] },
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
    `Sur la fiche ${f.de} ${de(p.nom)}, on lit : ${liste}. Laquelle est le volume ?`,
    `${p.nom} a noté ${nombre} mesures ${f.de} : ${liste}. Écris celle qui donne le volume.`,
    `Voici ${nombre} mesures ${f.de} : ${liste}. Quel est son volume ?`,
  ]);
  return {
    text,
    format: "short" as const,
    expected: avecUnite(Number(vol.split(" ").slice(0, -1).join("").replace(",", ".")), vol.split(" ").pop()!),
    comparator: "number_equal" as const,
    explanation: expl(`Un volume s’écrit avec une unité cube (cm³, dm³, m³). La seule mesure de ce genre est ${vol}. Les autres sont une longueur, une aire ou une masse.`),
    canvas: dessinObjet(f.de), // 14/11/2026 : l'objet de la fiche, sans aucune mesure
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
      canvas: text.includes(objet) ? dessinObjet(objet) : undefined, // 14/11/2026 : l'objet nommé, sans mesure
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
  const texte = pick([
    `Sur ${objet}, ${p.nom} lit ${nf(n)} ${u}. Comment se lit ce volume ?`,
    `Comment lit-on ${nf(n)} ${u} ?`,
    `${p.nom} doit lire à voix haute : ${nf(n)} ${u}. Que doit-${il(p)} dire ?`,
  ]);
  return {
    text: texte,
    canvas: texte.includes(objet) ? dessinObjet(objet) : undefined,
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
/**
 * 14/11/2026 — Le pavé du texte, ses trois longueurs écrites (jamais le volume, pas de
 * formule). Le dessin du canvas a des proportions FIXES (face de 140 × 100, plus large
 * que haute) : on ne l'emploie que si la longueur dépasse la hauteur ; sinon, un pavé de
 * cubes à l'échelle s'il tient dans le cadre ; sinon rien. `h` peut valoir « ? ».
 */
function dessinPave(L: number, l: number, h: number | "?", u: string, hauteurReelle = typeof h === "number" ? h : 0) {
  if (hauteurReelle < L)
    return {
      kind: "solide_3d" as const,
      solide: "pave_droit" as const,
      dimensions: { longueur: L, largeur: l, ...(typeof h === "number" ? { hauteur: h } : {}) },
      labels: { longueur: `${nf(L)} ${u}`, largeur: `${nf(l)} ${u}`, hauteur: typeof h === "number" ? `${nf(h)} ${u}` : "?" },
      highlight: { base: false },
      display: { showLabels: false, showDimensions: true, showFormulaHint: false },
    };
  return typeof h === "number" && L <= 6 && l <= 5 && h <= 5 ? cubesCadres(paveDeCubes(L, l, h)) : undefined;
}
/** Un cube, son arête écrite (« 4 cm », « 1 dm » ou « ? »), sans volume ni formule. */
function dessinCube(arete: string, cote?: number) {
  return {
    kind: "solide_3d" as const,
    solide: "cube" as const,
    ...(cote ? { dimensions: { cote } } : {}),
    labels: { cote: arete },
    highlight: { base: false },
    display: { showLabels: false, showDimensions: true, showFormulaHint: false },
  };
}
const leMot = (o: { nom: string; f: boolean }) => (/^[aeiou]/.test(o.nom) ? `l’${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function genVolumePave() {
  const o = pick(PAVES);
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
  const sujet = maj(leMot(o));
  // 07/11/2026 : sans prénom et, pour les cubes, trois dimensions serrées : 25 mots au plus.
  const text = parCubes
    ? `${sujet} est un pavé de ${L} ${u} sur ${l} ${u} sur ${h} ${u}. Combien de cubes de 1 ${u}³ pour ${o.f ? "la" : "le"} remplir ?`
    : `${sujet} est un pavé droit : ${dims}. ${pick(["Quel est son volume ?", "Calcule son volume.", "Combien mesure son volume ?"])}`;
  return {
    text,
    format: "short" as const,
    expected: parCubes ? avecUnite(V, "cubes") : avecUnite(V, `${u}³`),
    comparator: "number_equal" as const,
    explanation: expl(
      `Volume d’un pavé droit = longueur × largeur × hauteur. Une couche contient ${L} × ${l} = ${L * l} cubes de 1 ${u}³ ; il y a ${h} couches : ${L * l} × ${h} = ${nf(V)}. ${parCubes ? `Il faut ${nf(V)} cubes.` : `Le volume est ${nf(V)} ${u}³.`}`
    ),
    canvas: dessinPave(L, l, h, u),
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
      canvas: dessinCube(`${a} ${u}`, a), // 14/11/2026 : l'arête écrite, pas le volume
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
      canvas: dessinCube("?"), // 14/11/2026 : l'arête cherchée, marquée « ? »
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
    // 14/11/2026 : le fond écrit, la hauteur cherchée en « ? » (seulement si le dessin, plus large que haut, ne ment pas).
    canvas: dessinPave(Math.max(L, l), Math.min(L, l), "?", o.u, h),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ⛔⛔ 03/11/2026 — À ★1-★2 : LE GESTE NU (lib/tutor-v4/questionBank/6e/REGLES-6E.md).
// Ni prénom, ni situation, ni histoire ; ★1 ≤ 12 mots, ★2 ≤ 15 mots, verbe
// d'action ou question directe. Les cubes sont DESSINÉS quand il faut compter.
// Les situations (cartons, aquariums, cabanes…) passent aux gabarits ★3.
// ═══════════════════════════════════════════════════════════════════════════

/** ★1 : l'unité d'un objet, sans prénom. */
function genVolumeUniteSimple() {
  const grand = Math.random() < 0.5;
  const o = pick(grand ? SOLIDES_GRANDS : SOLIDES_PETITS);
  const u = grand ? "m" : "cm";
  const autre = pick(["kg", "g"]);
  if (Math.random() < 0.5) {
    return {
      text: pick([`Quelle unité choisir pour le volume ${o.de} ?`, `Choisis l’unité du volume ${o.de}.`]),
      canvas: dessinObjet(o.de), // 14/11/2026 : la forme de l'objet, sans aucune mesure
      format: "qcm" as const,
      choices: shuffle([`${u}³`, `${u}²`, u, autre]),
      expected: [`${u}³`],
      comparator: "mcq_exact" as const,
      explanation: expl(
        `Un volume s’écrit avec une unité CUBE. ${u} mesure une longueur, ${u}² une aire, ${autre} une masse. Ici on choisit ${u}³.`
      ),
    };
  }
  const N = nf(randomInt(o.min, o.max));
  return {
    text: pick([`Quelle mesure peut être le volume ${o.de} ?`, `Choisis la mesure du volume ${o.de}.`]),
    canvas: dessinObjet(o.de),
    format: "qcm" as const,
    choices: shuffle([`${N} ${u}³`, `${N} ${u}²`, `${N} ${u}`, `${N} ${autre}`]),
    expected: [`${N} ${u}³`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Un volume s’écrit avec une unité cube. ${N} ${u} est une longueur, ${N} ${u}² une aire. Le volume est donc ${N} ${u}³.`),
  };
}

/** ★2 : remplir, couvrir ou faire le tour — sans personnage. */
const ACTIONS_SIMPLES: { phrase: string; rep: "le volume" | "l’aire" | "le périmètre" }[] = [
  { phrase: "remplir une boîte de sable", rep: "le volume" },
  { phrase: "remplir un aquarium d’eau", rep: "le volume" },
  { phrase: "remplir un carton de cubes", rep: "le volume" },
  { phrase: "remplir une jardinière de terre", rep: "le volume" },
  { phrase: "remplir un seau d’eau", rep: "le volume" },
  { phrase: "recouvrir le dessus d’une boîte", rep: "l’aire" },
  { phrase: "peindre le couvercle d’un coffre", rep: "l’aire" },
  { phrase: "recouvrir une table d’une nappe", rep: "l’aire" },
  { phrase: "coller un ruban tout autour d’un couvercle", rep: "le périmètre" },
  { phrase: "poser une bordure tout autour d’un tapis", rep: "le périmètre" },
];
function genVolumeGrandeurSimple() {
  const a = pick(ACTIONS_SIMPLES);
  const pourquoi =
    a.rep === "le volume"
      ? "Remplir, c’est occuper un espace : c’est le volume."
      : a.rep === "l’aire"
        ? "Couvrir une surface plate, c’est l’aire."
        : "Faire le tour d’une surface, c’est le périmètre.";
  return {
    text: pick([`Pour ${a.phrase}, que faut-il connaître ?`, `Pour ${a.phrase}, quelle grandeur compte ?`]),
    canvas: dessinObjet(a.phrase), // 14/11/2026 : l'objet, neutre : il ne désigne pas la grandeur
    format: "qcm" as const,
    choices: shuffle(["le volume", "l’aire", "le périmètre", "la masse"]),
    expected: [a.rep],
    comparator: "mcq_exact" as const,
    explanation: expl(pourquoi),
  };
}

/** Des cubes à DESSINER, en escalier (une rangée de face) ou en une couche à plat : aucun cube caché. */
function tirerFigure() {
  const nEtages = randomInt(1, 3);
  const k: number[] = [];
  for (let i = 0; i < nEtages; i++) k.push(randomInt(1, i === 0 ? 6 : k[i - 1]));
  if (k.reduce((a, b) => a + b, 0) < 3) k[0] = randomInt(3, 6);
  const cubes: { x: number; y: number; z: number }[] = [];
  if (Math.random() < 0.35) {
    // Une seule couche posée à plat (2 ou 3 rangées) : tous les dessus se voient.
    const L = randomInt(2, 5);
    const l = randomInt(2, 3);
    k.length = 0;
    for (let y = 0; y < l; y++) {
      k.push(L);
      for (let x = 0; x < L; x++) cubes.push({ x, y, z: 0 });
    }
  } else
    k.forEach((n, z) => {
      for (let x = 0; x < n; x++) cubes.push({ x, y: 0, z });
    });
  return { cubes, k, total: cubes.length };
}

/** ★2 : compter les cubes dessinés. */
function genVolumeCompterFigure() {
  const u = pick(["cm³", "cm³", "dm³", "m³"]);
  const { cubes, k, total } = tirerFigure();
  return {
    text: pick([
      `Chaque cube mesure 1 ${u}. Quel est le volume du solide ?`,
      `Un cube mesure 1 ${u}. Compte les cubes. Quel est le volume ?`,
      `Les cubes font 1 ${u}. Calcule le volume du solide.`,
      `Un cube vaut 1 ${u}. Écris le volume du solide.`,
      `Compte les cubes de 1 ${u}. Écris le volume.`,
      `Ce solide est fait de cubes de 1 ${u}. Quel est son volume ?`,
      `Cubes de 1 ${u} : quel est le volume ?`,
      `Trouve le volume du solide. Un cube mesure 1 ${u}.`,
    ]),
    format: "short" as const,
    expected: avecUnite(total, u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Chaque cube a un volume de 1 ${u}. On compte les cubes${k.length > 1 ? `, ${cubes.some((c) => c.y > 0) ? "rangée par rangée" : "étage par étage"} : ${k.join(" + ")} = ${total}` : ` : il y en a ${total}`}. Le volume est ${total} ${u}.`
    ),
    canvas: { kind: "solide_3d" as const, solide: "assemblage_cubes" as const, cubes, display: { showLabels: false } },
  };
}

/** ★2 : comparer deux volumes de même unité, sans histoire. */
function genVolumeComparerSimple() {
  const ctx = pick(CTX_DEUX_VOLUMES);
  const a = randomInt(ctx.min, ctx.max);
  let b = randomInt(ctx.min, ctx.max);
  while (b === a) b = randomInt(ctx.min, ctx.max);
  const grand = Math.random() < 0.5;
  const A = `${nf(a)} ${ctx.u}`;
  const B = `${nf(b)} ${ctx.u}`;
  const mot = grand ? "grand" : "petit";
  const r = grand ? Math.max(a, b) : Math.min(a, b);
  return {
    text: pick([
      `Écris le plus ${mot} : ${A} ou ${B}.`,
      `Quel volume est le plus ${mot} : ${A} ou ${B} ?`,
      `Écris le volume le plus ${mot} : ${A} ou ${B}.`,
      `${A} ou ${B} : quel est le plus ${mot} ?`,
      `Entre ${A} et ${B}, écris le plus ${mot}.`,
      `Trouve le plus ${mot} volume : ${A} ou ${B}.`,
      `Compare ${A} et ${B}. Écris le plus ${mot}.`,
      `Recopie le plus ${mot} : ${A} ou ${B}.`,
    ]),
    format: "short" as const,
    expected: avecUnite(r, ctx.u),
    comparator: "number_equal" as const,
    explanation: expl(
      `Les deux volumes sont dans la même unité (${ctx.u}) : on compare les nombres. ${nf(Math.min(a, b))} < ${nf(Math.max(a, b))}. Le plus ${mot} est ${nf(r)} ${ctx.u}.`
    ),
  };
}

/** ★2 : assembler des morceaux de cubes, sans histoire. */
function genVolumeAssemblerSimple() {
  const u = pick(["cm³", "cm³", "dm³", "m³"]);
  const n = pick([2, 2, 3]);
  const k = Array.from({ length: n }, () => randomInt(2, 12));
  const total = k.reduce((a, b) => a + b, 0);
  // 03/11/2026 : 13-14 mots ; « 7 et 5 cubes » plutôt que « 7 cubes et 5 cubes ».
  const liste = n === 2 ? `${k[0]} et ${k[1]} cubes` : `${k[0]}, ${k[1]} et ${k[2]} cubes`;
  return {
    text: pick([
      `Un cube mesure 1 ${u}. On assemble ${liste}. Calcule le volume.`,
      `Les cubes font 1 ${u}. On assemble ${liste}. Quel volume obtient-on ?`,
      `Un cube mesure 1 ${u}. On colle ${liste}. Calcule le volume.`,
      `On assemble ${liste} de 1 ${u}. Calcule le volume.`,
      `Assemble ${liste} de 1 ${u}. Quel est le volume ?`,
      `Colle ensemble ${liste} de 1 ${u}. Écris le volume.`,
      `Quel volume font ${liste} de 1 ${u} collés ensemble ?`,
      `${liste} de 1 ${u} sont assemblés. Calcule le volume total.`,
    ]),
    format: "short" as const,
    expected: avecUnite(total, u),
    comparator: "number_equal" as const,
    explanation: expl(`Assembler ne change pas le nombre de cubes : on additionne. ${k.join(" + ")} = ${total}. Le volume est ${total} ${u}.`),
    canvas: cubesCadresLargeur((w) => morceaux(k, w), [4, 3, 2, 5]), // 14/11/2026 : les morceaux avant assemblage (rien s'ils ne tiennent pas)
  };
}

/** ★1 (2 mesures) / ★2 (4 mesures) : trouver le volume parmi des mesures, sans objet ni prénom. */
function genVolumeLireSimple(combien: 2 | 4) {
  const f = pick(FICHES);
  const vol = tirerMesure(f.volume);
  const autres = shuffle([tirerMesure(f.longueur), tirerMesure(f.aire), tirerMesure(f.masse)]).slice(0, combien - 1);
  const toutes = shuffle([vol, ...autres]);
  const liste = toutes.slice(0, -1).join(", ") + " ou " + toutes[toutes.length - 1];
  return {
    text: pick([
      `Quelle mesure est un volume : ${liste} ?`,
      `Écris la mesure de volume : ${liste}.`,
      `Trouve le volume : ${liste}.`,
      `${liste} : quelle mesure est un volume ?`,
      `${liste} : écris le volume.`,
      `Recopie le volume : ${liste}.`,
      `Où est le volume : ${liste} ?`,
      `Écris le volume parmi ${liste}.`,
    ]),
    format: "short" as const,
    expected: avecUnite(Number(vol.split(" ").slice(0, -1).join("").replace(",", ".")), vol.split(" ").pop()!),
    comparator: "number_equal" as const,
    explanation: expl(`Un volume s’écrit avec une unité cube (cm³, dm³, m³). La seule mesure de ce genre est ${vol}. Les autres sont une longueur, une aire ou une masse.`),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 07/11/2026 — LA PHRASE NE REVIENT PLUS À ★1-★2 (voir triangles.bank.ts).
// De vrais modes (ajouter, enlever, multiplier, retrouver un morceau, partager,
// comparer des unités, reconnaître une grandeur…), chacun avec environ 8
// tournures, sans contexte ni prénom. Correcteurs : correcteurs/volumes.ts.
// ═══════════════════════════════════════════════════════════════════════════
const unitePiochee = () => pick(["cm³", "cm³", "dm³", "m³"]);
const compteEnPhrase = (f: { k: number[]; total: number; cubes: { y: number }[] }) =>
  f.k.length > 1 ? `${f.cubes.some((c) => c.y > 0) ? "rangée par rangée" : "étage par étage"} : ${f.k.join(" + ")} = ${f.total}` : `il y en a ${f.total}`;
const figureCubes = (cubes: { x: number; y: number; z: number }[]) => ({ kind: "solide_3d" as const, solide: "assemblage_cubes" as const, cubes, display: { showLabels: false } });

// ─── volume_compter ★2 ──────────────────────────────────────────────────────
/** Le solide dessiné, et combien de cubes ajouter pour atteindre un volume. */
function genVolumeCompterAjouter() {
  const f = tirerFigure();
  const u = unitePiochee();
  const a = randomInt(2, 6);
  const N = `${f.total + a} ${u}`;
  return {
    text: pick([
      `Un cube mesure 1 ${u}. Combien de cubes ajouter pour obtenir ${N} ?`,
      `Cubes de 1 ${u}. Il faut ${N}. Combien de cubes manquent ?`,
      `Le solide doit faire ${N}. Un cube vaut 1 ${u}. Combien en ajouter ?`,
      `Pour atteindre ${N}, combien de cubes de 1 ${u} faut-il ajouter ?`,
      `Complète ce solide jusqu’à ${N}. Combien de cubes de 1 ${u} poses-tu ?`,
      `Il manque des cubes de 1 ${u} pour faire ${N}. Combien ?`,
      `Écris le nombre de cubes de 1 ${u} à ajouter pour avoir ${N}.`,
      `Ajoute des cubes de 1 ${u} pour avoir ${N}. Combien en faut-il ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(a, "cubes"),
    comparator: "number_equal" as const,
    explanation: expl(`On compte les cubes dessinés, ${compteEnPhrase(f)}. Il en faut ${f.total + a} : ${f.total + a} − ${f.total} = ${a}. Il faut ajouter ${a} cubes.`),
    canvas: figureCubes(f.cubes),
  };
}

/** Le solide dessiné, moins quelques cubes. */
function genVolumeCompterEnlever() {
  let f = tirerFigure();
  const r = randomInt(2, 4);
  while (f.total < r + 2) f = tirerFigure();
  const u = unitePiochee();
  const reste = f.total - r;
  return {
    text: pick([
      `On enlève ${r} cubes de 1 ${u}. Quel volume reste-t-il ?`,
      `On retire ${r} cubes de 1 ${u}. Calcule le volume restant.`,
      `Enlève ${r} cubes de 1 ${u}. Quel est le nouveau volume ?`,
      `Retire ${r} cubes de 1 ${u}. Écris le volume qui reste.`,
      `Chaque cube fait 1 ${u}. On retire ${r} cubes. Que vaut le nouveau volume ?`,
      `Un cube vaut 1 ${u}. Sans ${r} cubes, quel est le volume ?`,
      `Le solide perd ${r} cubes de 1 ${u}. Quel est son volume maintenant ?`,
      `Tu enlèves ${r} cubes de 1 ${u}. Que vaut le volume ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(reste, u),
    comparator: "number_equal" as const,
    explanation: expl(`On compte les cubes dessinés, ${compteEnPhrase(f)}. On en enlève ${r} : ${f.total} − ${r} = ${reste}. Le volume est ${reste} ${u}.`),
    canvas: figureCubes(f.cubes),
  };
}

/** Des rangées, des étages ou des couches : on multiplie, sans dessin. */
function genVolumeCompterRangees() {
  const u = unitePiochee();
  const a = randomInt(2, 5);
  const b = randomInt(2, 6);
  const total = a * b;
  const text = pick([
      `Le solide a ${a} rangées de ${b} cubes de 1 ${u}. Quel est son volume ?`,
      `${a} rangées de ${b} cubes de 1 ${u}. Calcule le volume.`,
      `Un solide : ${a} étages de ${b} cubes de 1 ${u}. Quel volume ?`,
      `On empile ${a} couches de ${b} cubes de 1 ${u}. Calcule le volume.`,
      `${a} couches de ${b} cubes, chaque cube fait 1 ${u}. Quel volume ?`,
      `Multiplie : ${a} rangées de ${b} cubes de 1 ${u}. Écris le volume.`,
      `Écris le volume de ${a} étages de ${b} cubes de 1 ${u}.`,
      `Quel volume font ${a} rangées de ${b} cubes de 1 ${u} ?`,
    ]);
  return {
    text,
    // 14/11/2026 : des rangées posées à plat, ou des étages / couches empilés — comme le dit le texte.
    canvas: cubesCadres(/rangées/.test(text) ? paveDeCubes(b, a, 1) : mur(a * b, b)),
    format: "short" as const,
    expected: avecUnite(total, u),
    comparator: "number_equal" as const,
    explanation: expl(`${a} fois ${b} cubes : ${a} × ${b} = ${total} cubes de 1 ${u}. Le volume est ${total} ${u}.`),
  };
}

/** Un nombre de cubes donné : le volume s'en déduit, sans dessin. */
function genVolumeCompterNombre() {
  const u = unitePiochee();
  const n = randomInt(4, 15);
  return {
    text: pick([
      `Un solide contient ${n} cubes de 1 ${u}. Quel est son volume ?`,
      `${n} cubes de 1 ${u} forment un solide. Calcule son volume.`,
      `Avec ${n} cubes de 1 ${u}, quel volume obtient-on ?`,
      `On empile ${n} cubes de 1 ${u}. Quel volume cela fait-il ?`,
      `Écris le volume de ${n} cubes de 1 ${u}.`,
      `Quel volume occupent ${n} cubes de 1 ${u} ?`,
      `Compte : ${n} cubes de 1 ${u}. Quel volume ?`,
      `Que vaut le volume de ${n} cubes de 1 ${u} ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(n, u),
    comparator: "number_equal" as const,
    explanation: expl(`Chaque cube a un volume de 1 ${u}. ${n} cubes font ${n} ${u}.`),
    canvas: cubesCadres(mur(n, 5)), // 14/11/2026 : les ${n} cubes du texte
  };
}

/** Le cube dessiné ne vaut pas 1 : on compte, puis on multiplie. */
function genVolumeCompterGrosCube() {
  let f = tirerFigure();
  while (f.total > 12) f = tirerFigure();
  const u = unitePiochee();
  const c = pick([2, 3, 5]);
  const V = f.total * c;
  return {
    text: pick([
      `Attention, chaque cube fait ${c} ${u}. Quel est le volume ?`,
      `Ici, un cube vaut ${c} ${u}. Quel est le volume total ?`,
      `Volume d’un cube : ${c} ${u}. Quel est le volume du solide ?`,
      `Les cubes font ${c} ${u} chacun. Calcule le volume total.`,
      `Ces cubes mesurent ${c} ${u} chacun. Trouve le volume.`,
      `Multiplie : un cube vaut ${c} ${u}. Écris le volume du solide.`,
      `Chaque cube vaut ${c} ${u}. Compte-les et écris le volume.`,
      `Compte les cubes. Chacun fait ${c} ${u}. Quel est le volume ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(V, u),
    comparator: "number_equal" as const,
    explanation: expl(`On compte les cubes, ${compteEnPhrase(f)}. Chacun vaut ${c} ${u} : ${f.total} × ${c} = ${V}. Le volume est ${V} ${u}.`),
    canvas: figureCubes(f.cubes),
  };
}

/** Le solide dessiné, en QCM : le piège est l'unité carrée, ou un cube oublié. */
function genVolumeCompterQcmFigure() {
  const f = tirerFigure();
  const u = unitePiochee();
  const n = f.total;
  return {
    text: pick([
      `Cubes de 1 ${u}. Choisis le bon volume.`,
      `Choisis le volume du solide. Un cube fait 1 ${u}.`,
      `Un cube fait 1 ${u}. Quelle écriture donne le volume ?`,
      `Quelle proposition donne le volume ? Un cube fait 1 ${u}.`,
      `Regarde le solide. Un cube fait 1 ${u}. Choisis son volume.`,
      `Coche le volume de ce solide fait de cubes de 1 ${u}.`,
      `Ce solide a des cubes de 1 ${u}. Coche son volume.`,
      `Quel volume correspond au dessin ? Un cube fait 1 ${u}.`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(`${n} ${u}`, [`${n} ${u.replace("³", "²")}`, `${n + 1} ${u}`, `${n - 1} ${u}`, `${n + 2} ${u}`]),
    expected: [`${n} ${u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`On compte les cubes, ${compteEnPhrase(f)}. Le volume est ${n} ${u}, avec le petit 3 d’une unité cube.`),
    canvas: figureCubes(f.cubes),
  };
}

// ─── volume_assemblage ★2 ───────────────────────────────────────────────────
/** Le volume total et un morceau : retrouver l'autre morceau. */
function genVolumeAssemblerManque() {
  const u = unitePiochee();
  const t = randomInt(8, 30);
  const a = randomInt(2, t - 2);
  const T = `${t} ${u}`;
  const A = `${a} ${u}`;
  return {
    text: pick([
      `Deux morceaux font ${T} en tout. L’un fait ${A}. Et l’autre ?`,
      `Un solide de ${T} a deux morceaux. L’un fait ${A}. Et l’autre ?`,
      `${T} au total. Un morceau fait ${A}. Quel est le volume de l’autre ?`,
      `On assemble ${A} et un autre morceau : on obtient ${T}. Volume de l’autre ?`,
      `Calcule le morceau manquant : ${A} + ? = ${T}.`,
      `Complète : ${A} + ? = ${T}.`,
      `Il manque un morceau pour passer de ${A} à ${T}. Quel volume ?`,
      `Un assemblage fait ${T}. On retire un morceau de ${A}. Quel volume reste-t-il ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(t - a, u),
    comparator: "number_equal" as const,
    explanation: expl(`Les deux morceaux font ${T} ensemble : ${t} − ${a} = ${t - a}. L’autre morceau fait ${t - a} ${u}.`),
    canvas: cubesCadresLargeur((w) => mur(a, w), [5, 6, 7, 8, 9], 4), // 14/11/2026 : le morceau CONNU seul, en cubes de 1
  };
}

/** Couper en morceaux égaux : le chemin inverse de l'assemblage (÷). */
function genVolumeAssemblerPartage() {
  const u = unitePiochee();
  const n = randomInt(2, 5);
  const v = randomInt(2, 9);
  const V = `${n * v} ${u}`;
  return {
    text: pick([
      `On coupe ${V} en ${n} morceaux égaux. Quel volume a un morceau ?`,
      `Partage ${V} en ${n} morceaux égaux. Calcule le volume d’un morceau.`,
      `Un solide de ${V} donne ${n} morceaux égaux. Quel volume par morceau ?`,
      `${n} morceaux égaux font ${V}. Quel est le volume d’un morceau ?`,
      `En ${n} morceaux égaux, ${V} donne quel volume par morceau ?`,
      `Écris le volume d’un morceau : ${V} coupés en ${n} morceaux égaux.`,
      `On sépare ${V} en ${n} blocs égaux. Que vaut un bloc ?`,
      `${V} pour ${n} morceaux égaux : combien pour un morceau ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(v, u),
    comparator: "number_equal" as const,
    explanation: expl(`Les morceaux sont égaux, on partage : ${n * v} ÷ ${n} = ${v}. Un morceau fait ${v} ${u}.`),
    // 14/11/2026 : le solide ENTIER en cubes de 1, en rangées dont la longueur n'est ni n ni v (ni leur double) : le dessin ne fait pas le partage.
    canvas: cubesCadresLargeur((w) => mur(n * v, w), [4, 5, 6, 7, 8, 9].filter((w) => ![n, v, 2 * n, 2 * v].includes(w)), 4),
  };
}

/** Deux volumes déjà écrits en unités cubes : on les additionne. */
function genVolumeAssemblerAjout() {
  const u = unitePiochee();
  const a = randomInt(3, 25);
  const b = randomInt(2, 20);
  const A = `${a} ${u}`;
  const B = `${b} ${u}`;
  return {
    text: pick([
      `Un solide de ${A} est collé à un solide de ${B}. Volume total ?`,
      `Deux solides font ${A} et ${B}. On les colle. Quel est le volume ?`,
      `Écris le volume total de deux solides : ${A} et ${B}.`,
      `Assemble deux morceaux de ${A} et ${B}. Quel volume obtiens-tu ?`,
      `Un morceau de ${A}, un morceau de ${B}. Quel volume ensemble ?`,
      `On ajoute ${B} à un solide de ${A}. Quel est le nouveau volume ?`,
      `Un solide de ${A} grandit de ${B}. Quel volume a-t-il maintenant ?`,
      `${A} puis ${B} : quel volume après assemblage ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(a + b, u),
    comparator: "number_equal" as const,
    explanation: expl(`Assembler, c’est additionner les volumes : ${a} + ${b} = ${a + b}. Le volume est ${a + b} ${u}.`),
    canvas: cubesCadresLargeur((w) => morceaux([a, b], w), [5, 4, 6]), // 14/11/2026 : les deux solides en cubes de 1 (rien s'ils ne tiennent pas)
  };
}

/** Plusieurs blocs identiques : on multiplie. */
function genVolumeAssemblerFois() {
  const u = unitePiochee();
  const n = randomInt(2, 6);
  const v = randomInt(2, 9);
  const V = `${v} ${u}`;
  return {
    text: pick([
      `On assemble ${n} blocs de ${V}. Quel est le volume ?`,
      `${n} blocs de ${V} sont collés. Calcule le volume total.`,
      `Calcule le volume de ${n} morceaux de ${V} chacun.`,
      `Colle ${n} blocs de ${V}. Écris le volume obtenu.`,
      `Chaque bloc fait ${V}. On en assemble ${n}. Quel volume obtient-on ?`,
      `Chaque morceau fait ${V}. On en colle ${n}. Calcule le volume.`,
      `Avec ${n} morceaux de ${V}, quel volume construis-tu ?`,
      `Quel volume font ${n} blocs de ${V} collés ensemble ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(n * v, u),
    comparator: "number_equal" as const,
    explanation: expl(`${n} blocs identiques : ${n} × ${v} = ${n * v}. Le volume est ${n * v} ${u}.`),
    canvas: cubesCadres(mur(v, Math.min(v, 3))), // 14/11/2026 : UN bloc, en cubes de 1 ; la multiplication reste à faire
  };
}

/** Les mêmes cubes, une autre forme : le volume ne change pas. */
function genVolumeAssemblerForme() {
  const u = unitePiochee();
  const v = randomInt(6, 30);
  const V = `${v} ${u}`;
  const d = randomInt(1, 4);
  return {
    text: pick([
      `Un solide fait ${V}. On refait une tour avec ses cubes. Son volume ?`,
      `On démonte un solide de ${V}. On remonte tous les cubes autrement. Son volume ?`,
      `Un solide de ${V} change de forme, avec les mêmes cubes. Son volume ?`,
      `Les cubes d’un solide de ${V} forment un mur. Quel est son volume ?`,
      `Avec les mêmes cubes, ${V} devient un escalier. Quel est son volume ?`,
      `Un mur de ${V} devient une tour, mêmes cubes. Quel volume ?`,
      `Une tour de ${V} devient un mur, avec les mêmes cubes. Volume du mur ?`,
      `On empile autrement les cubes d’un solide de ${V}. Que vaut son volume ?`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(V, [`${v + d} ${u}`, `${v - d} ${u}`, `${v * 2} ${u}`, `${v} ${u.replace("³", "²")}`]),
    expected: [V],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le nombre de cubes ne change pas : la forme change, le volume reste ${V}.`),
    canvas: cubesCadresLargeur((w) => mur(v, w), [6, 7, 8, 9, 5], 4), // 14/11/2026 : le solide de départ (rien s'il ne tient pas)
  };
}

// ─── volume_comparer ★2 ─────────────────────────────────────────────────────
/** Le signe entre deux volumes (parfois égaux). */
function genVolumeComparerSigne() {
  const u = unitePiochee();
  const a = randomInt(5, 90);
  let b = randomInt(5, 90);
  if (Math.random() < 0.15) b = a;
  const A = `${a} ${u}`;
  const B = `${b} ${u}`;
  const juste = a < b ? "<" : a > b ? ">" : "=";
  return {
    text: pick([
      `Compare ${A} et ${B}. Choisis le signe.`,
      `Quel signe mettre entre ${A} et ${B} ?`,
      `${A} … ${B} : quel signe convient ?`,
      `Complète avec un signe : ${A} … ${B}.`,
      `Choisis <, > ou = : ${A} … ${B}.`,
      `Écris le bon signe : ${A} … ${B}.`,
      `Entre ${A} et ${B}, quel signe faut-il ?`,
      `Quel signe compare ${A} et ${B} ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle(["<", ">", "="]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(`Même unité : on compare ${a} et ${b}. On écrit ${A} ${juste} ${B}.`),
  };
}

/** L'écart entre deux volumes. */
function genVolumeComparerEcart() {
  const u = unitePiochee();
  const lo = randomInt(4, 40);
  const hi = lo + randomInt(2, 25);
  const L = `${lo} ${u}`;
  const H = `${hi} ${u}`;
  return {
    text: pick([
      `Calcule l’écart entre ${L} et ${H}.`,
      `Quelle est la différence entre ${H} et ${L} ?`,
      `De combien ${H} dépasse ${L} ?`,
      `Combien faut-il ajouter à ${L} pour avoir ${H} ?`,
      `${H} et ${L} : quel écart ?`,
      `Il manque combien à ${L} pour faire ${H} ?`,
      `Écris l’écart entre ${H} et ${L}.`,
      `De combien ${L} est plus petit que ${H} ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(hi - lo, u),
    comparator: "number_equal" as const,
    explanation: expl(`On soustrait le plus petit du plus grand : ${hi} − ${lo} = ${hi - lo}. L’écart est ${hi - lo} ${u}.`),
    // 14/11/2026 : les deux solides en cubes de 1, le plus petit à gauche (rien s'ils ne tiennent pas).
    canvas: cubesCadresLargeur((w) => morceaux([lo, hi], w), [5, 4, 6]),
  };
}

/** Deux unités différentes : le plus grand nombre n'est pas le plus grand volume. */
function genVolumeComparerUnites() {
  const [petite, grande] = pick([["cm³", "dm³"], ["dm³", "m³"], ["cm³", "m³"]]);
  const g = randomInt(1, 9);
  const n = randomInt(10, 99);
  const grand = Math.random() < 0.5;
  const M = grand ? "grand" : "petit";
  const [X, Y] = shuffle([`${g} ${grande}`, `${n} ${petite}`]);
  const juste = grand ? { v: g, u: grande } : { v: n, u: petite };
  return {
    text: pick([
      `Attention aux unités. Quel est le plus ${M} : ${X} ou ${Y} ?`,
      `Regarde les unités. Écris le plus ${M} : ${X} ou ${Y}.`,
      `Les unités changent : ${X} ou ${Y}. Quel est le plus ${M} ?`,
      `${X} ou ${Y} : regarde l’unité. Écris le plus ${M}.`,
      `Unités différentes : ${X} et ${Y}. Trouve le plus ${M}.`,
      `Lis bien l’unité. Le plus ${M} est-il ${X} ou ${Y} ?`,
      `Entre ${X} et ${Y}, l’unité compte. Écris le plus ${M}.`,
      `Avec ces unités, quel est le plus ${M} : ${X} ou ${Y} ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(juste.v, juste.u),
    comparator: "number_equal" as const,
    explanation: expl(`Un cube de 1 ${grande} est bien plus gros qu’un cube de 1 ${petite} : 1 ${grande} dépasse même 99 ${petite}. Donc ${g} ${grande} est plus grand que ${n} ${petite}. Le plus ${M} est ${juste.v} ${juste.u}.`),
  };
}

/** Quatre volumes : choisir le plus grand ou le plus petit. */
function genVolumeComparerParmi() {
  const u = unitePiochee();
  const vals = new Set<number>();
  while (vals.size < 4) vals.add(randomInt(5, 95));
  const v = [...vals];
  const grand = Math.random() < 0.5;
  const M = grand ? "grand" : "petit";
  const r = grand ? Math.max(...v) : Math.min(...v);
  return {
    text: pick([
      `Choisis le plus ${M} volume.`,
      `Coche le plus ${M}.`,
      `Parmi ces volumes, écris le plus ${M}.`,
      `Trouve le volume le plus ${M}.`,
      `Clique sur le plus ${M} volume.`,
      `Lis ces quatre volumes. Choisis le plus ${M}.`,
      `Repère le plus ${M} volume.`,
      `Compare ces volumes. Coche le plus ${M}.`,
    ]),
    format: "qcm" as const,
    choices: shuffle(v.map((x) => `${x} ${u}`)),
    expected: [`${r} ${u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`Même unité : on compare les nombres. Le plus ${M} est ${r} ${u}.`),
  };
}

/** Un volume entre deux autres. */
function genVolumeComparerEntre() {
  const u = unitePiochee();
  const a = randomInt(12, 60);
  const b = a + randomInt(4, 20);
  const dedans = randomInt(a + 1, b - 1);
  const A = `${a} ${u}`;
  const B = `${b} ${u}`;
  return {
    text: pick([
      `Quel volume est entre ${A} et ${B} ?`,
      `Choisis un volume compris entre ${A} et ${B}.`,
      `Trouve le volume plus grand que ${A} et plus petit que ${B}.`,
      `Plus grand que ${A}, plus petit que ${B} : quel volume ?`,
      `Entre ${A} et ${B}, quel volume trouves-tu ?`,
      `Coche le volume situé entre ${A} et ${B}.`,
      `Quelle mesure tombe entre ${A} et ${B} ?`,
      `Un volume dépasse ${A} et reste sous ${B}. Choisis-le.`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(`${dedans} ${u}`, [`${a - randomInt(1, 8)} ${u}`, `${b + randomInt(1, 8)} ${u}`, `${b + randomInt(9, 20)} ${u}`, `${a - randomInt(9, 11)} ${u}`]),
    expected: [`${dedans} ${u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`On cherche un nombre plus grand que ${a} et plus petit que ${b} : c’est ${dedans}. Le volume est ${dedans} ${u}.`),
  };
}

/** Le solide dessiné comparé à un volume écrit : oui ou non. */
function genVolumeComparerFigure() {
  const f = tirerFigure();
  const u = unitePiochee();
  let n = f.total + pick([-3, -2, -1, 1, 2, 3]);
  if (n < 2) n = f.total + randomInt(1, 3);
  const N = `${n} ${u}`;
  const t = pick([
    { p: `Un cube mesure 1 ${u}. Le volume dépasse-t-il ${N} ?`, plus: true },
    { p: `Cubes de 1 ${u}. Ce volume est-il plus grand que ${N} ?`, plus: true },
    { p: `Cubes de 1 ${u}. Ce volume est-il plus petit que ${N} ?`, plus: false },
    { p: `Ce solide fait-il plus de ${N} ? Un cube vaut 1 ${u}.`, plus: true },
    { p: `Ce solide fait-il moins de ${N} ? Un cube vaut 1 ${u}.`, plus: false },
    { p: `Un cube fait 1 ${u}. Le solide est-il au-dessus de ${N} ?`, plus: true },
    { p: `Un cube fait 1 ${u}. Le solide est-il en dessous de ${N} ?`, plus: false },
    { p: `Le volume passe-t-il ${N} ? Chaque cube fait 1 ${u}.`, plus: true },
  ]);
  const oui = t.plus ? f.total > n : f.total < n;
  return {
    text: t.p,
    format: "qcm" as const,
    choices: shuffle(["oui", "non"]),
    expected: [oui ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(`On compte les cubes, ${compteEnPhrase(f)}. Le volume est ${f.total} ${u}, à comparer à ${N} : la réponse est ${oui ? "oui" : "non"}.`),
    canvas: figureCubes(f.cubes),
  };
}

// ─── volume_lire ★1 ─────────────────────────────────────────────────────────
const nombreALire = () => randomInt(12, 59); // ★1 : pas de « quatre-vingt-dix-sept » à déchiffrer dans le nombre juste.
const piegesDeLecture = (n: number) => {
  const inverse = Number(String(n).split("").reverse().join(""));
  return [inverse, n + 100, n * 10].filter((x) => x !== n && x > 0);
};

/** Des lettres vers les chiffres. */
function genVolumeLireEnChiffres() {
  const u = pick(["cm³", "dm³", "m³"]);
  const n = nombreALire();
  const L = `${enLettres(n)} ${UNITES_MOTS[u]}`;
  return {
    text: pick([
      `Écris en chiffres : « ${L} ».`,
      `Comment écrire « ${L} » ?`,
      `Quelle écriture correspond à « ${L} » ?`,
      `Choisis l’écriture de « ${L} ».`,
      `Trouve l’écriture chiffrée de « ${L} ».`,
      `« ${L} » : quelle mesure est-ce ?`,
      `Que vaut « ${L} » en chiffres ?`,
      `Coche la mesure « ${L} ».`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(`${n} ${u}`, [`${n} ${u.replace("³", "²")}`, ...piegesDeLecture(n).map((x) => `${nf(x)} ${u}`)]),
    expected: [`${n} ${u}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`« ${L} » s’écrit ${n} ${u}. « Cube » se note avec le petit 3.`),
  };
}

/** Des chiffres vers les lettres. */
function genVolumeLireADire() {
  const u = pick(["cm³", "dm³", "m³"]);
  const n = nombreALire();
  const N = `${n} ${u}`;
  const L = `${enLettres(n)} ${UNITES_MOTS[u]}`;
  return {
    text: pick([
      `Comment lit-on ${N} ?`,
      `Lis ${N}. Que dis-tu ?`,
      `Comment se lit ${N} ?`,
      `Choisis la lecture de ${N}.`,
      `${N} se lit comment ?`,
      `Que dit-on pour ${N} ?`,
      `Quelle lecture convient pour ${N} ?`,
      `Lis à voix haute : ${N}.`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(L, [`${enLettres(n)} ${UNITES_MOTS[u].replace(" cubes", " carrés")}`, ...piegesDeLecture(n).filter((x) => x < 1000).map((x) => `${enLettres(x)} ${UNITES_MOTS[u]}`)]),
    expected: [L],
    comparator: "mcq_exact" as const,
    explanation: expl(`${N} se lit « ${L} ». Le petit 3 se dit « cube ».`),
  };
}

const MESURES_DIVERSES: { u: string; g: string }[] = [
  { u: "cm³", g: "un volume" },
  { u: "dm³", g: "un volume" },
  { u: "m³", g: "un volume" },
  { u: "cm³", g: "un volume" },
  { u: "cm²", g: "une aire" },
  { u: "m²", g: "une aire" },
  { u: "cm", g: "une longueur" },
  { u: "m", g: "une longueur" },
  { u: "kg", g: "une masse" },
  { u: "g", g: "une masse" },
];

/** Quelle grandeur donne cette mesure ? */
function genVolumeLireGrandeur() {
  const m = pick(MESURES_DIVERSES);
  const N = `${randomInt(2, 99)} ${m.u}`;
  return {
    text: pick([
      `Que mesure ${N} ?`,
      `${N} : c’est quelle grandeur ?`,
      `Quelle grandeur donne ${N} ?`,
      `${N} mesure quoi ?`,
      `Choisis la grandeur de ${N}.`,
      `À quelle grandeur correspond ${N} ?`,
      `Que donne la mesure ${N} ?`,
      `Lis ${N}. Quelle grandeur est-ce ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle(["un volume", "une aire", "une longueur", "une masse"]),
    expected: [m.g],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le petit 3 donne un volume, le petit 2 une aire ; cm et m donnent une longueur, g et kg une masse. ${N} donne ${m.g}.`),
  };
}

/** Un volume, c'est un nombre de cubes unités. */
function genVolumeLireEnCubes() {
  const u = pick(["cm³", "dm³", "m³"]);
  const n = randomInt(5, 60);
  const N = `${n} ${u}`;
  return {
    text: pick([
      `${N}, c’est combien de cubes de 1 ${u} ?`,
      `Combien de cubes de 1 ${u} dans ${N} ?`,
      `Un solide fait ${N}. Combien de cubes de 1 ${u} ?`,
      `Écris le nombre de cubes de 1 ${u} dans ${N}.`,
      `${N} = combien de cubes de 1 ${u} ?`,
      `Pour faire ${N}, combien de cubes de 1 ${u} ?`,
      `Il faut combien de cubes de 1 ${u} pour ${N} ?`,
      `Lis ${N}. Combien de cubes de 1 ${u} ?`,
    ]),
    format: "short" as const,
    expected: avecUnite(n, "cubes"),
    comparator: "number_equal" as const,
    explanation: expl(`Un cube de 1 ${u} compte pour 1. ${N} correspond donc à ${n} cubes.`),
    canvas: dessinCube(`1 ${u.replace("³", "")}`, 1), // 14/11/2026 : le cube unité, son arête de 1
  };
}

const NOMS_UNITES: { s: string; nom: string }[] = [
  { s: "cm", nom: "centimètre" },
  { s: "dm", nom: "décimètre" },
  { s: "m", nom: "mètre" },
];

/** Le nom de l'unité. */
function genVolumeLireNomUnite() {
  const o = pick(NOMS_UNITES);
  const autre = pick(NOMS_UNITES.filter((x) => x.s !== o.s));
  const carre = Math.random() < 0.2;
  const S = `${o.s}${carre ? "²" : "³"}`;
  const juste = `${o.nom} ${carre ? "carré" : "cube"}`;
  return {
    text: pick([
      `Que veut dire ${S} ?`,
      `Que signifie le symbole ${S} ?`,
      `Quel nom porte l’unité ${S} ?`,
      `${S} se dit comment ?`,
      `Quel est le nom de ${S} ?`,
      `Donne le nom de l’unité ${S}.`,
      `Lis l’unité ${S}. Que dis-tu ?`,
      `Choisis le nom de ${S}.`,
    ]),
    format: "qcm" as const,
    choices: makeChoices(juste, [`${o.nom} cube`, `${o.nom} carré`, o.nom, `${autre.nom} ${carre ? "carré" : "cube"}`]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(`${S} se lit « ${juste} » : le petit ${carre ? "2 se dit « carré »" : "3 se dit « cube »"}.`),
  };
}

/** Cette mesure est-elle un volume ? */
function genVolumeLireOuiNon() {
  const m = pick(MESURES_DIVERSES);
  const N = `${randomInt(2, 99)} ${m.u}`;
  const estVolume = m.g === "un volume";
  const vraiFaux = Math.random() < 0.25;
  const text = vraiFaux
    ? pick([`${N} est un volume. Vrai ou faux ?`, `Vrai ou faux : ${N} est un volume.`])
    : pick([
        `Est-ce un volume : ${N} ?`,
        `${N} est-il un volume ?`,
        `${N} : est-ce un volume ?`,
        `Cette mesure est-elle un volume : ${N} ?`,
        `${N} donne-t-il un volume ?`,
        `Peut-on dire que ${N} est un volume ?`,
      ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(vraiFaux ? ["vrai", "faux"] : ["oui", "non"]),
    expected: [vraiFaux ? (estVolume ? "vrai" : "faux") : estVolume ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(`Un volume s’écrit avec le petit 3 (cm³, dm³, m³). ${N} donne ${m.g}.`),
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
    canvas: dessinObjet("aquarium"), text: "Quelle unité est adaptée pour mesurer le volume d’un aquarium ?",
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
    // 03/11/2026 : un lieu = un contexte → ★3 (règle 6e).
    difficulty: 3,
    theme: "reunion",
    canvas: dessinObjet("bac"), text: "Pour mesurer le volume d’un grand bac à poissons à La Réunion, quelle unité peut-on utiliser ?",
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
    // 03/11/2026 : 9 mots, les 6 cubes dessinés.
    text: "Compte les cubes unités. Quel est le volume du solide ?",
    canvas: { kind: "solide_3d", solide: "assemblage_cubes", cubes: [0, 1, 2].flatMap((x) => [{ x, y: 0, z: 0 }, { x, y: 0, z: 1 }]), display: { showLabels: false } },
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
    canvas: cubesCadres(mur(10, 5)), text: "Un empilement contient 10 cubes unités. Quel est son volume ?",
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
    canvas: cubesCadres(paveDeCubes(4, 2, 1)), text: "Un pavé est formé de 2 rangées de 4 cubes. Quel est son volume en cubes unités ?",
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
    canvas: cubesCadres(mur(12, 4)), text: "Un solide contient 12 cubes unités. Son volume vaut…",
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
    canvas: cubesCadres(mur(15, 5)), text: "Un pavé est formé de 3 couches de 5 cubes chacune. Quel est son volume ?",
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
    canvas: cubesCadresLargeur((w) => morceaux([14, 12], w), [5, 4, 6]), text: "Un solide A contient 14 cubes. Un solide B contient 12 cubes. Lequel a le plus grand volume ?",
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
    canvas: cubesCadres(morceaux([4, 3])), text: "On assemble deux solides de 4 cubes et 3 cubes. Quel est le volume total ?",
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
    canvas: cubesCadresLargeur((w) => morceaux([6, 5], w), [3, 4]), text: "Un solide de 6 cubes est collé à un solide de 5 cubes. Quel est le volume total ?",
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
    canvas: cubesCadres(morceaux([8, 4])), text: "On assemble 8 cubes et 4 cubes. Le volume total est…",
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
    canvas: cubesCadres(morceaux([4, 6], 3)), text: "Un solide A de 10 cubes est coupé en deux morceaux de 4 cubes et 6 cubes. Si on réassemble les deux morceaux, quel volume retrouve-t-on ?",
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
    canvas: dessinCube("1 cm", 1), text: "Un solide fait 24 cm³. Combien de cubes de 1 cm³ contient-il ?",
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
    canvas: dessinCube("1 cm", 1), text: "Un bac de culture a un volume de 30 cm³. Combien de cubes unités cela représente-t-il ?",
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
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Un élève écrit : « le volume de la boîte est 24 cm² ».\nQuelle est la bonne écriture ?",
    format: "qcm",
    choices: ["24 cm³", "24 cm²", "24 cm"],
    expected: ["24 cm³"],
    comparator: "mcq_exact",
    hint: "Regarde l’unité, pas le nombre.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide.\n\n" +
      "Méthode : un volume s’écrit en cm³ (des petits cubes).\n\n" +
      "Calcul : " +
      ("Le nombre 24 est juste. Mais le cm² sert pour une aire, et le cm pour une longueur.") +
      "\n\nConclusion : le volume est 24 cm³.",
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
    generate: () => genVolumeUniteSimple(),
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
    generate: () => (Math.random() < 0.7 ? genVolumeGrandeurSimple() : genVolumeUniteSimple()),
  },
  {
    kind: "template",
    id: "volume_unite_tpl_3_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplir, c’est le volume ; couvrir, c’est l’aire. Un volume s’écrit avec l’exposant 3.",
    tags: ["volume_solide", "unite", "template"],
    // 03/11/2026 : les situations avec un prénom, montées de ★1-★2 à ★3.
    generate: () => (Math.random() < 0.6 ? genVolumeGrandeur() : genVolumeUnite()),
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
    generate: () => genVolumeCompterFigure(),
  },
  {
    kind: "template",
    id: "volume_compter_tpl_3_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Le volume correspond au nombre de cubes unités.",
    tags: ["volume_solide", "compter", "template"],
    // 03/11/2026 : les constructions (tour, cabane, caisses du port…), montées de ★2 à ★3.
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
    generate: () => genVolumeComparerSimple(),
  },
  {
    kind: "template",
    id: "volume_comparer_tpl_2_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["volume_solide", "comparer", "template"],
    // 03/11/2026 : les cartons, aquariums, chambres…, montés de ★2 à ★3.
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
    generate: () => genVolumeAssemblerSimple(),
  },
  {
    kind: "template",
    id: "volume_assemblage_tpl_2_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Assembler ne change pas le nombre de cubes : additionne.",
    tags: ["volume_solide", "assemblage", "template"],
    // 03/11/2026 : les constructions avec un prénom, montées de ★2 à ★3.
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
    hint: "Compte d’abord les cubes des étages, puis ajoute les autres.",
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
    generate: () => genVolumeLireSimple(2),
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
    generate: () => genVolumeLireSimple(4),
  },
  {
    kind: "template",
    id: "volume_lire_tpl_2_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la mesure avec le petit 3 : cm³, dm³ ou m³.",
    tags: ["volume_solide", "lire", "template"],
    // 03/11/2026 : les fiches d'objets (valise, aquarium…), montées de ★1-★2 à ★3.
    generate: () => genVolumeLireMesures(Math.random() < 0.5 ? 2 : 4),
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
    canvas: dessinObjet("piscine"), text: "Quelle unité est adaptée pour mesurer le volume d’une piscine ?", format: "qcm", choices: ["m³", "m²", "m", "kg"], expected: ["m³"], comparator: "mcq_exact",
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
    canvas: dessinCube("1 cm", 1), text: "Un cube a 1 cm de côté. Quel est son volume ?", format: "short", expected: ["1 cm³"], comparator: "number_equal",
    hint: "C’est le cube unité.", explanation: expl("Un cube de 1 cm de côté est le cube unité : son volume est 1 cm³."), tags: ["volume_solide", "lire", "cube_unite"] },
  { kind: "fixed", id: "volume_lire_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_lire", difficulty: 2, theme: "neutral",
    canvas: cubesCadres(mur(14, 5)), text: "Un solide est formé de 14 cubes unités. Quel est son volume ?", format: "short", expected: ["14"], comparator: "number_equal",
    hint: "Chaque cube vaut 1 cm³.", explanation: expl("Chaque cube unité vaut 1 cm³. Un solide de 14 cubes a donc un volume de 14 cm³."), tags: ["volume_solide", "lire"] },

  // ===== TOP-UP — VOLUME_COMPARER =====
  { kind: "fixed", id: "volume_comparer_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 2, theme: "neutral",
    canvas: cubesCadres(morceaux([12, 9])), text: "Solide A : 12 cubes. Solide B : 9 cubes. Quel solide a le plus grand volume ?", format: "qcm", choices: ["le solide A", "le solide B", "ils sont égaux"], expected: ["le solide A"], comparator: "mcq_exact",
    hint: "Compare le nombre de cubes.", explanation: expl("On compte les cubes : A = 12, B = 9. Comme 12 > 9, le solide A a le plus grand volume."), tags: ["volume_solide", "comparer", "qcm"] },
  { kind: "fixed", id: "volume_comparer_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 2, theme: "neutral",
    canvas: cubesCadres([...mur(8, 4), ...mur(8, 2, 5)]), text: "Deux solides sont faits chacun de 8 cubes. Ont-ils le même volume ?", format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Compte les cubes de chacun.", explanation: expl("Les deux solides ont 8 cubes, donc le même volume : 8 cm³. La forme peut être différente, mais le volume est identique."), tags: ["volume_solide", "comparer", "qcm"] },
  { kind: "fixed", id: "volume_comparer_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_comparer", difficulty: 2, theme: "neutral",
    canvas: cubesCadresLargeur((w) => morceaux([15, 9], w), [5, 4]), text: "Calcule l’écart entre 15 cubes et 9 cubes.", format: "short", expected: ["6 cubes"], comparator: "number_equal",
    hint: "Calcule 15 − 9.", explanation: expl("On calcule l’écart : 15 - 9 = 6. Le premier solide a 6 cubes de plus."), tags: ["volume_solide", "comparer"] },

  // ===== TOP-UP — VOLUME_ASSEMBLAGE =====
  { kind: "fixed", id: "volume_assemblage_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    canvas: cubesCadres(morceaux([5, 6], 3)), text: "On assemble 5 cubes et 6 cubes. Combien de cubes en tout ?", format: "short", expected: ["11"], comparator: "number_equal",
    hint: "Additionne les cubes.", explanation: expl("On additionne les volumes : 5 + 6 = 11 cubes, soit 11 cm³."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    canvas: cubesCadres(mur(12, 6)), text: "Un pavé est formé de 2 couches de 6 cubes. Combien de cubes contient-il ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "2 × 6.", explanation: expl("Chaque couche a 6 cubes, et il y a 2 couches : 2 × 6 = 12 cubes."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 3, theme: "neutral",
    canvas: cubesCadres(paveDeCubes(2, 2, 2)), text: "Un grand cube est formé de petits cubes : 2 sur chaque arête (2 × 2 × 2). Combien de petits cubes contient-il ?", format: "short", expected: ["8 cubes"], comparator: "number_equal",
    hint: "2 × 2 × 2.", explanation: expl("On multiplie les trois dimensions : 2 × 2 × 2 = 8 petits cubes."), tags: ["volume_solide", "assemblage"] },
  { kind: "fixed", id: "volume_assemblage_topup_4", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_assemblage", difficulty: 2, theme: "neutral",
    canvas: cubesCadres(mur(12, 4)), text: "On empile 3 étages de 4 cubes chacun. Combien de cubes en tout ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "3 × 4.", explanation: expl("3 étages de 4 cubes : 3 × 4 = 12 cubes."), tags: ["volume_solide", "assemblage"] },

  // ===== TOP-UP — VOLUME_DEFI =====
  { kind: "fixed", id: "volume_defi_topup_1", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    canvas: dessinPave(3, 2, 4, "cm"), text: "Défi : quel est le volume (en cm³) d’un pavé droit de dimensions 3 cm × 2 cm × 4 cm ?", format: "short", expected: ["24 cm³"], comparator: "number_equal",
    hint: "Volume = Longueur × largeur × hauteur.", explanation: expl("Le volume d’un pavé droit est Longueur × largeur × hauteur : 3 × 2 × 4 = 24, donc 24 cm³."), tags: ["volume_solide", "defi", "pave"] },
  { kind: "fixed", id: "volume_defi_topup_2", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    canvas: dessinCube("3 cm", 3), text: "Défi : quel est le volume (en cm³) d’un cube d’arête 3 cm ?", format: "short", expected: ["27 cm³"], comparator: "number_equal",
    hint: "3 × 3 × 3.", explanation: expl("Le volume d’un cube est arête × arête × arête : 3 × 3 × 3 = 27, donc 27 cm³."), tags: ["volume_solide", "defi", "cube"] },
  { kind: "fixed", id: "volume_defi_topup_3", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 2, theme: "neutral",
    canvas: dessinPave(5, 2, 1, "cm"), text: "Calcule le volume d’un pavé droit de 5 cm × 2 cm × 1 cm.", format: "short", expected: ["10 cm³"], comparator: "number_equal",
    hint: "5 × 2 × 1.", explanation: expl("Volume = 5 × 2 × 1 = 10, donc 10 cm³."), tags: ["volume_solide", "defi", "pave"] },
  { kind: "fixed", id: "volume_defi_topup_4", niveau: "6e", matiere: "maths", notionId: "volume_solide", microId: "volume_defi", difficulty: 3, theme: "neutral",
    canvas: dessinPave(3, 2, 2, "cm"), text: "Défi : combien de cubes de 1 cm³ faut-il pour remplir entièrement une boîte de 2 cm × 3 cm × 2 cm ?", format: "short", expected: ["12 cubes"], comparator: "number_equal",
    hint: "Calcule le volume de la boîte.", explanation: expl("Le volume de la boîte est 2 × 3 × 2 = 12 cm³. Il faut donc 12 cubes de 1 cm³ pour la remplir."), tags: ["volume_solide", "defi"] },

  // ⭐ 07/11/2026 — les modes neufs de ★1-★2 (voir plus haut).
  ...(
    [
      ["volume_compter", "volume_compter_tpl_e2_ajouter", 2, "Compte les cubes dessinés, puis cherche ce qui manque.", genVolumeCompterAjouter],
      ["volume_compter", "volume_compter_tpl_e2_enlever", 2, "Compte les cubes dessinés, puis enlève.", genVolumeCompterEnlever],
      ["volume_compter", "volume_compter_tpl_e2_rangees", 2, "Multiplie le nombre de rangées par le nombre de cubes.", genVolumeCompterRangees],
      ["volume_compter", "volume_compter_tpl_e2_nombre", 2, "Un cube de 1 compte pour 1 : le volume est le nombre de cubes.", genVolumeCompterNombre],
      ["volume_compter", "volume_compter_tpl_e2_gros_cube", 2, "Compte les cubes, puis multiplie par le volume d’un cube.", genVolumeCompterGrosCube],
      ["volume_compter", "volume_compter_qcm_tpl_e2_figure", 2, "Compte les cubes. Un volume s’écrit avec le petit 3.", genVolumeCompterQcmFigure],
      ["volume_assemblage", "volume_assemblage_tpl_e2_manque", 2, "Du volume total, enlève le morceau connu.", genVolumeAssemblerManque],
      ["volume_assemblage", "volume_assemblage_tpl_e2_partage", 2, "Des morceaux égaux : divise le volume par le nombre de morceaux.", genVolumeAssemblerPartage],
      ["volume_assemblage", "volume_assemblage_tpl_e2_ajout", 2, "Assembler, c’est additionner les volumes.", genVolumeAssemblerAjout],
      ["volume_assemblage", "volume_assemblage_tpl_e2_fois", 2, "Des blocs identiques : multiplie.", genVolumeAssemblerFois],
      ["volume_assemblage", "volume_assemblage_qcm_tpl_e2_forme", 2, "Les mêmes cubes donnent le même volume.", genVolumeAssemblerForme],
      ["volume_comparer", "volume_comparer_qcm_tpl_e2_signe", 2, "Même unité : compare les deux nombres.", genVolumeComparerSigne],
      ["volume_comparer", "volume_comparer_tpl_e2_ecart", 2, "Soustrais le plus petit du plus grand.", genVolumeComparerEcart],
      ["volume_comparer", "volume_comparer_tpl_e2_unites", 2, "Regarde l’unité : 1 m³ est plus gros que 1 dm³, et 1 dm³ plus gros que 1 cm³.", genVolumeComparerUnites],
      ["volume_comparer", "volume_comparer_qcm_tpl_e2_parmi", 2, "Même unité : compare les nombres.", genVolumeComparerParmi],
      ["volume_comparer", "volume_comparer_qcm_tpl_e2_entre", 2, "Cherche un nombre entre les deux nombres donnés.", genVolumeComparerEntre],
      ["volume_comparer", "volume_comparer_qcm_tpl_e2_figure", 2, "Compte les cubes, puis compare.", genVolumeComparerFigure],
      ["volume_lire", "volume_lire_qcm_tpl_e1_chiffres", 1, "« Cube » se note avec le petit 3.", genVolumeLireEnChiffres],
      ["volume_lire", "volume_lire_qcm_tpl_e1_dire", 1, "Le petit 3 se dit « cube ».", genVolumeLireADire],
      ["volume_lire", "volume_lire_qcm_tpl_e1_grandeur", 1, "Regarde l’unité : le petit 3 donne un volume.", genVolumeLireGrandeur],
      ["volume_lire", "volume_lire_tpl_e1_cubes", 1, "Un cube de 1 compte pour 1.", genVolumeLireEnCubes],
      ["volume_lire", "volume_lire_qcm_tpl_e1_nom", 1, "Le petit 3 se dit « cube », le petit 2 « carré ».", genVolumeLireNomUnite],
      ["volume_lire", "volume_lire_qcm_tpl_e1_oui_non", 1, "Un volume s’écrit avec le petit 3.", genVolumeLireOuiNon],
    ] as const
  ).map(
    ([microId, id, difficulty, hint, generate]): TutorBankItemV4 => ({
      kind: "template",
      id,
      niveau: "6e",
      matiere: "maths",
      notionId: "volume_solide",
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["volume_solide", microId.replace("volume_", ""), "template"],
      generate: () => generate(),
    }),
  ),
];