// lib/tutor-v4/questionBank/cm1/maths/algebre-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DE L'ALGÈBRE DU CM1 (notion `algebre`). Avant :
// 8 à 10 squelettes par micro, 12 à 18 répétitions sur 20 (une seule phrase par
// gabarit, les nombres seuls changeaient). Ces micros n'ont pas de vidéo :
// vocabulaire du cycle 3 (« égalité », « le signe = veut dire a la même
// valeur », « compléter », « nombre inconnu », « schéma en barres », « motif »,
// « règle », « relation », « opération inverse »).
// Chaque gabarit tire une SITUATION (métiers, sport, cuisine, jardin, école,
// jeux…) × une TOURNURE × des nombres.
// ⛔ CM1 = zéro clavier : que des QCM, leurres = vraies erreurs d'élève :
//   - le signe = lu comme « donne le résultat » (« 8 + 4 = 12 + 5 = 17 »,
//     « 7 + … = 12 + 5 » → 12) ;
//   - additionner au lieu de soustraire (« 7 + … = 12 » → 19) ;
//   - « 3 × … » confondu avec « 3 + … » ;
//   - la proportionnalité appliquée à une relation qui ne l'est pas
//     (allumettes, tables et chaises) ;
//   - « de plus » qui fait additionner quand il faut soustraire.
// ⛔ Division : « ÷ », jamais de barre oblique.
// Dessins : `schema_barre` (⚠️ son `value` est lu comme un NOMBRE pour la
// largeur : les écritures « 6 × 8 » vont dans `label` ou `total`),
// `tableau_donnees` (balances, relations, tableaux), `stat_graph` (motifs qui
// grandissent), `suite` (suites de nombres). Le dessin porte les DONNÉES,
// jamais la réponse.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, fr, qcm, qcmN, un } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm1_${microId}_tpl_${n}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "algebre", microId, "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Clara", "Jade", "Maya", "Lina", "Manon", "Léa", "Sarah", "Chloé", "Sofia", "Rose", "Nora"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Rayan", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Nathan", "Sami", "Bilal", "Jules"];
type Perso = { nom: string; il: "il" | "elle" };
const perso = (): Perso => (Math.random() < 0.5 ? { nom: un(NOMS_F), il: "elle" } : { nom: un(NOMS_M), il: "il" });
const deux = (): [Perso, Perso] => {
  const a = perso();
  let b = perso();
  while (b.nom === a.nom) b = perso();
  return [a, b];
};
/** « de cubes », « d'allumettes ». */
const de = (x: string) => (/^[aeiouéèêâîôœ]/i.test(x) ? `d'${x}` : `de ${x}`);
/** « de un colis » → « d'un colis ». */
const deUn = (x: string) => (/^une? /.test(x) ? `d'${x}` : `de ${x}`);
const phrase = (...l: string[]) => l.filter(Boolean).join(" ");

/* ───────────────────────── Les dessins ───────────────────────── */

type Part = { label: string; value?: number; unknown?: boolean };
function barre(o: { title?: string; total?: string; parts: Part[]; question?: string }): CanvasFigure {
  return {
    kind: "schema_barre",
    ...(o.title ? { title: o.title } : {}),
    ...(o.total !== undefined ? { total: o.total } : {}),
    parts: o.parts.map((p) => (p.unknown ? { label: p.label, unknown: true } : { label: p.label, value: String(p.value) })),
    ...(o.question ? { questionLabel: o.question } : {}),
    display: { showTotal: o.total !== undefined, showPartLabels: true, showValues: true, showQuestion: !!o.question },
  } as CanvasFigure;
}
/** k parts égales, toutes inconnues (ou toutes de valeur v). */
const parts = (k: number, label: string, v?: number): Part[] =>
  Array.from({ length: k }, () => (v === undefined ? { label, unknown: true } : { label, value: v }));

function tableau(o: {
  title?: string;
  coin?: string;
  headers: (string | number)[];
  rows: { label?: string; values: (string | number)[] }[];
  cell?: { row: number; col: number };
}): CanvasFigure {
  return {
    kind: "tableau_donnees",
    ...(o.title ? { title: o.title } : {}),
    ...(o.coin !== undefined ? { coin: o.coin } : {}),
    headers: o.headers.map(String),
    rows: o.rows,
    ...(o.cell ? { highlight: { cell: o.cell } } : {}),
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

function barres(labels: string[], values: number[]): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data: labels.map((label, i) => ({ label, value: values[i] })),
    display: { showValues: true, showLabels: true },
  } as CanvasFigure;
}

function frise(terms: (number | string)[], missingIndex?: number): CanvasFigure {
  return {
    kind: "suite",
    theme: "nombre",
    terms,
    ...(missingIndex !== undefined ? { missingIndex } : {}),
    display: { showArrows: false, showRule: false, showLabels: false, showIcons: false },
  } as CanvasFigure;
}

/* ───────────────────────── Les écritures ───────────────────────── */

type Forme = "plus" | "moins" | "fois" | "div";
type Ex = { t: string; v: number; f: Forme; a: number; b: number };
function ecrire(v: number, f: Forme): Ex | null {
  if (f === "plus") {
    if (v < 3) return null;
    const c = entre(1, v - 1);
    return { t: `${c} + ${v - c}`, v, f, a: c, b: v - c };
  }
  if (f === "moins") {
    const q = entre(2, 15);
    return { t: `${v + q} − ${q}`, v, f, a: v + q, b: q };
  }
  if (f === "fois") {
    const ds: number[] = [];
    for (let d = 2; d <= 10; d++) if (v % d === 0 && v / d >= 2 && v / d <= 10) ds.push(d);
    if (!ds.length) return null;
    const d = un(ds);
    return { t: `${d} × ${v / d}`, v, f, a: d, b: v / d };
  }
  if (v > 12 || v < 2) return null;
  const k = entre(2, 9);
  return { t: `${v * k} ÷ ${k}`, v, f, a: v * k, b: k };
}
/** Une écriture de v, d'une forme permise (et pas `sauf`). */
function expr(v: number, permis: Forme[] = ["plus", "moins", "fois", "div"], sauf?: Forme): Ex {
  const l = permis.filter((f) => f !== sauf);
  for (let i = 0; i < 20; i++) {
    const e = ecrire(v, un(l));
    if (e) return e;
  }
  return ecrire(v, "plus") ?? { t: `${v} + 0`, v, f: "plus", a: v, b: 0 };
}

/* ───────────────────────── Les mondes ───────────────────────── */

/** Ce qu'on a, ce qu'on gagne, ce qu'on perd. */
const STOCKS = [
  { qui: "la boulangère", il: "elle", obj: "croissants", gagne: "en fait cuire", perd: "en vend" },
  { qui: "le fermier", il: "il", obj: "œufs", gagne: "en ramasse", perd: "en vend" },
  { qui: "la bibliothécaire", il: "elle", obj: "livres", gagne: "en reçoit", perd: "en prête" },
  { qui: "le fleuriste", il: "il", obj: "roses", gagne: "en reçoit", perd: "en vend" },
  { qui: "Nina", il: "elle", obj: "cartes de foot", gagne: "en gagne", perd: "en perd" },
  { qui: "le pêcheur", il: "il", obj: "poissons", gagne: "en pêche", perd: "en vend" },
  { qui: "l'infirmière", il: "elle", obj: "pansements", gagne: "en reçoit", perd: "en utilise" },
  { qui: "la maîtresse", il: "elle", obj: "crayons", gagne: "en achète", perd: "en distribue" },
  { qui: "Téo", il: "il", obj: "billes", gagne: "en gagne", perd: "en perd" },
  { qui: "la factrice", il: "elle", obj: "lettres", gagne: "en reçoit", perd: "en distribue" },
  { qui: "le glacier", il: "il", obj: "cornets", gagne: "en prépare", perd: "en vend" },
  { qui: "Lina", il: "elle", obj: "autocollants", gagne: "en reçoit", perd: "en donne" },
  { qui: "le maraîcher", il: "il", obj: "salades", gagne: "en cueille", perd: "en vend" },
  { qui: "l'apicultrice", il: "elle", obj: "pots de miel", gagne: "en remplit", perd: "en vend" },
  { qui: "le gardien du zoo", il: "il", obj: "bananes", gagne: "en reçoit", perd: "en distribue" },
  { qui: "le libraire", il: "il", obj: "bandes dessinées", gagne: "en reçoit", perd: "en vend" },
  { qui: "la cuisinière de la cantine", il: "elle", obj: "yaourts", gagne: "en reçoit", perd: "en sert" },
  { qui: "le jardinier", il: "il", obj: "plants de tomates", gagne: "en achète", perd: "en plante" },
  { qui: "Maya", il: "elle", obj: "perles", gagne: "en achète", perd: "en utilise" },
  { qui: "la vétérinaire", il: "elle", obj: "sachets de croquettes", gagne: "en commande", perd: "en donne" },
  { qui: "Yanis", il: "il", obj: "figurines", gagne: "en reçoit", perd: "en échange" },
  { qui: "la pâtissière", il: "elle", obj: "macarons", gagne: "en prépare", perd: "en vend" },
  { qui: "le marchand du marché de Saint-Paul", il: "il", obj: "mangues", gagne: "en reçoit", perd: "en vend" },
  { qui: "le moniteur de voile", il: "il", obj: "gilets de sauvetage", gagne: "en achète", perd: "en prête" },
  { qui: "la libraire", il: "elle", obj: "cahiers", gagne: "en reçoit", perd: "en vend" },
] as const;

/** Des contenants qui ont tous autant d'objets. g = genre du contenant. */
const PACKS = [
  { qui: "le fleuriste", il: "il", c: "bouquet", cs: "bouquets", o: "roses", g: "m" },
  { qui: "la fermière", il: "elle", c: "boîte", cs: "boîtes", o: "œufs", g: "f" },
  { qui: "la maîtresse", il: "elle", c: "pot", cs: "pots", o: "crayons", g: "m" },
  { qui: "le pâtissier", il: "il", c: "plateau", cs: "plateaux", o: "éclairs", g: "m" },
  { qui: "la confiseuse", il: "elle", c: "sachet", cs: "sachets", o: "bonbons", g: "m" },
  { qui: "le maraîcher", il: "il", c: "cagette", cs: "cagettes", o: "melons", g: "f" },
  { qui: "le libraire", il: "il", c: "étagère", cs: "étagères", o: "livres", g: "f" },
  { qui: "l'entraîneuse", il: "elle", c: "équipe", cs: "équipes", o: "joueurs", g: "f" },
  { qui: "le moniteur de tennis", il: "il", c: "tube", cs: "tubes", o: "balles", g: "m" },
  { qui: "l'épicière", il: "elle", c: "carton", cs: "cartons", o: "bouteilles de jus", g: "m" },
  { qui: "le jardinier", il: "il", c: "rangée", cs: "rangées", o: "salades", g: "f" },
  { qui: "la photographe", il: "elle", c: "page", cs: "pages", o: "photos", g: "f" },
  { qui: "le cuisinier de la cantine", il: "il", c: "lot", cs: "lots", o: "yaourts", g: "m" },
  { qui: "la vendeuse de jouets", il: "elle", c: "boîte", cs: "boîtes", o: "petites voitures", g: "f" },
  { qui: "le facteur", il: "il", c: "sacoche", cs: "sacoches", o: "lettres", g: "f" },
  { qui: "la bibliothécaire", il: "elle", c: "caisse", cs: "caisses", o: "albums", g: "f" },
  { qui: "le pêcheur", il: "il", c: "seau", cs: "seaux", o: "crabes", g: "m" },
  { qui: "l'animatrice du centre de loisirs", il: "elle", c: "pochette", cs: "pochettes", o: "feutres", g: "f" },
] as const;

/* ═════════════════════════ ALGEBRE_EGALITE ═════════════════════════ */

const E = "algebre_egalite";
const LEADS_EG = (p: Perso) => [
  "",
  "Au tableau, la maîtresse écrit quatre égalités.",
  `Sur son ardoise, ${p.nom} écrit quatre égalités.`,
  "Le signe = veut dire « a la même valeur que ».",
  `${p.nom} vérifie ses calculs.`,
  "Dans le cahier du jour, on lit ces égalités.",
  "Le maître propose un jeu du vrai ou faux.",
];
const Q_VRAIE = ["Quelle égalité est vraie ?", "Laquelle de ces égalités est juste ?", "Une seule est vraie : laquelle ?", "Quelle écriture est juste ?", "Trouve l'égalité vraie."];

const PESEES = [
  ["La pâtissière", "des sacs de farine"],
  ["Le maraîcher", "des cageots de tomates"],
  ["Le facteur", "des colis"],
  ["La vétérinaire", "des sacs de croquettes"],
  ["Le jardinier", "des sacs de terreau"],
  ["Le pêcheur", "des caisses de poissons"],
  ["La boulangère", "des sacs de sucre"],
  ["Le magasinier", "des cartons"],
  ["Le cuisinier de la cantine", "des sacs de pommes de terre"],
  ["La fermière", "des paniers de pommes"],
  ["Le libraire", "des piles de livres"],
  ["Le maçon", "des sacs de sable"],
  ["L'épicière", "des sacs de riz"],
  ["Le marchand de fruits", "des cagettes d'oranges"],
  ["Le professeur de sciences", "des masses marquées"],
  ["La déménageuse", "des caisses de vaisselle"],
] as const;

const CTX_CALCUL = [
  "Pour compter les points de son équipe",
  "Pour calculer le prix de ses courses",
  "Pour compter ses billes",
  "Pour compter les élèves du car",
  "Pour additionner ses scores au jeu vidéo",
  "Pour compter les livres rangés",
  "Pour compter les œufs du poulailler",
  "Pour calculer la longueur de sa frise",
  "Pour compter les tickets vendus à la kermesse",
  "Pour compter les passagers du bus",
  "Pour calculer ses économies",
  "Pour compter les fleurs du bouquet",
  "Pour compter les pommes ramassées",
  "Pour compter ses tours de piste",
];

const egalite: TutorBankItemV4[] = [
  // ★1 — quelle égalité est vraie (additions, et « 12 = 7 + 5 » lu à l'envers).
  tpl(E, "g01", 1, "Calcule la valeur de chaque côté du signe =.", () => {
    const p = perso();
    const T = entre(10, 30);
    const a = entre(2, T - 2);
    const b = T - a;
    let c = entre(2, T - 2);
    while (c === a || c === b) c = entre(2, T - 2);
    const d = T - c;
    const seul = Math.random() < 0.35;
    const g = seul ? String(T) : `${a} + ${b}`;
    const vraie = `${g} = ${c} + ${d}`;
    const e = entre(4, 9);
    const faux = [`${g} = ${c} + ${d + 1}`, `${g} = ${c + 1} + ${d + 1}`, seul ? `${T} = ${c} + ${d - 1}` : `${a} + ${b} = ${T} + ${e}`, `${g} = ${c + 2} + ${d + 1}`];
    return {
      text: phrase(un(LEADS_EG(p)), un(Q_VRAIE)),
      ...qcm(vraie, faux),
      explanation: etapes(
        "Une égalité est vraie quand les deux côtés du signe = ont la même valeur. On calcule chaque côté.",
        seul ? `${c} + ${d} = ${T}.` : `${a} + ${b} = ${T} et ${c} + ${d} = ${T}.`,
        `L'égalité vraie est ${vraie}.`,
      ),
    };
  }),

  // ★1 — la balance à deux plateaux.
  tpl(E, "g02", 1, "Calcule la masse de chaque plateau, puis compare.", () => {
    const [qui, choses] = un(PESEES);
    const a = entre(2, 15);
    const b = entre(2, 15);
    const L = a + b;
    const cas = un([0, 1, 2]);
    const R = cas === 0 ? L : cas === 1 ? L - entre(1, 3) : L + entre(1, 3);
    let c = entre(2, R - 2);
    for (let i = 0; i < 10 && (c === a || c === b); i++) c = entre(2, R - 2);
    const d = R - c;
    const juste = cas === 0 ? "Elle est équilibrée." : cas === 1 ? "Elle penche à gauche." : "Elle penche à droite.";
    return {
      text: `${qui} pose ${choses} sur une balance à deux plateaux. À gauche : ${a} kg et ${b} kg. À droite : ${c} kg et ${d} kg. ${un([
        "La balance est-elle équilibrée ?",
        "Que fait la balance ?",
        "Que va faire la balance ?",
        "Comment se place la balance ?",
      ])}`,
      ...qcm(juste, ["Elle est équilibrée.", "Elle penche à gauche.", "Elle penche à droite."]),
      explanation: etapes(
        "Une balance équilibrée, c'est une égalité : les deux plateaux ont la même masse. Elle penche du côté le plus lourd.",
        `À gauche : ${a} + ${b} = ${L} kg. À droite : ${c} + ${d} = ${R} kg.`,
        cas === 0 ? `${a} + ${b} = ${c} + ${d} : elle est équilibrée.` : `${L} kg et ${R} kg : ${juste.toLowerCase()}`,
      ),
      canvas: tableau({
        title: "La balance",
        coin: "Plateau",
        headers: ["Masses posées", "Masse totale"],
        rows: [
          { label: "Gauche", values: [`${a} kg + ${b} kg`, "?"] },
          { label: "Droite", values: [`${c} kg + ${d} kg`, "?"] },
        ],
      }),
    };
  }),

  // ★2 — « 8 + 4 = 12 + 5 = 17 » : le signe = lu comme « donne le résultat ».
  tpl(E, "g03", 2, "Les deux côtés de CHAQUE signe = doivent avoir la même valeur.", () => {
    const p = perso();
    const o1 = un(["+", "×"]);
    const o2 = un(["+", "−"]);
    const a = o1 === "×" ? entre(2, 9) : entre(5, 40);
    const b = o1 === "×" ? entre(2, 9) : entre(3, 30);
    const s = o1 === "×" ? a * b : a + b;
    const c = o2 === "−" ? entre(2, Math.max(2, s - 2)) : entre(2, 20);
    const t = o2 === "−" ? s - c : s + c;
    const bien = Math.random() < 0.35;
    const ecrit = bien ? `${a} ${o1} ${b} = ${s}, puis ${s} ${o2} ${c} = ${t}.` : `${a} ${o1} ${b} = ${s} ${o2} ${c} = ${t}.`;
    const J1 = `Non : ${a} ${o1} ${b} ne vaut pas ${s} ${o2} ${c}.`;
    const J2 = `Oui : ${a} ${o1} ${b} fait bien ${s}.`;
    const J3 = `Oui : le résultat ${t} est juste.`;
    const J4 = "Oui : chaque égalité est vraie.";
    const J5 = `Non : le résultat ${t} est faux.`;
    const J6 = `Non : ${s} ${o2} ${c} ne vaut pas ${t}.`;
    return {
      text: phrase(
        `${un(CTX_CALCUL)}, ${p.nom} calcule ${a} ${o1} ${b} ${o2} ${c}. ${cap(p.il)} écrit : ${ecrit}`,
        un(["Son écriture est-elle juste ?", `A-t-${p.il} le droit d'écrire cela ?`, "Que penses-tu de son écriture ?", "Ces signes = sont-ils bien utilisés ?"]),
      ),
      ...(bien ? qcm(J4, [J5, J6, J1]) : qcm(J1, [J2, J3, J5])),
      explanation: etapes(
        "Le signe = ne veut pas dire « voici le résultat » : il dit que ce qui est à gauche a la même valeur que ce qui est à droite.",
        bien ? `${a} ${o1} ${b} = ${s} est vrai, ${s} ${o2} ${c} = ${t} est vrai.` : `${a} ${o1} ${b} vaut ${s}, mais ${s} ${o2} ${c} vaut ${t} : ${s} n'est pas égal à ${t}.`,
        bien ? "L'écriture est juste." : `Il fallait écrire deux égalités : ${a} ${o1} ${b} = ${s}, puis ${s} ${o2} ${c} = ${t}.`,
      ),
      canvas: tableau({
        title: `Ce qu'a écrit ${p.nom}`,
        headers: ["Ce qui est écrit", "Ce que ça vaut"],
        rows: [
          { values: [`${a} ${o1} ${b}`, "?"] },
          { values: [`${s} ${o2} ${c}`, "?"] },
        ],
      }),
    };
  }),

  // ★2 — égalités à opérations mêlées (le piège « 3 × 4 = 3 + 4 »).
  tpl(E, "g04", 2, "Calcule chaque côté : le × et le + ne donnent pas la même chose.", () => {
    const p = perso();
    const V = un([12, 15, 16, 18, 20, 24, 30, 36, 40]);
    const L = expr(V, ["plus", "fois", "moins"]);
    const R = expr(V, ["plus", "moins", "fois", "div"], L.f);
    const vraie = `${L.t} = ${R.t}`;
    const e = entre(4, 9);
    const faux = [
      `${L.t} = ${expr(V + entre(1, 3), ["plus", "moins", "fois"]).t}`,
      `${L.t} = ${V} + ${e}`,
      L.f === "fois" ? `${L.t} = ${L.a} + ${L.b}` : L.f === "plus" && L.a * L.b !== V && L.a > 1 && L.b > 1 ? `${L.t} = ${L.a} × ${L.b}` : `${L.t} = ${expr(V - entre(1, 3), ["plus", "moins"]).t}`,
    ];
    return {
      text: phrase(un(LEADS_EG(p)), un(Q_VRAIE)),
      ...qcm(vraie, faux),
      explanation: etapes(
        "On calcule la valeur de chaque côté du signe =. Attention : × et + ne donnent pas le même résultat.",
        `${L.t} = ${V} et ${R.t} = ${V}.`,
        `L'égalité vraie est ${vraie}.`,
      ),
    };
  }),

  // ★2 — quel calcul écrire après le signe = ?
  tpl(E, "g05", 2, "Le calcul de droite doit avoir la même valeur que celui de gauche.", () => {
    const p = perso();
    const V = un([10, 12, 14, 15, 16, 18, 20, 24, 25, 30]);
    const L = expr(V, ["plus", "fois"]);
    const R = expr(V, ["plus", "moins", "fois"], L.f);
    const e = entre(4, 9);
    const faux = [
      `${V} + ${e}`,
      expr(V + un([1, 2, -1, -2]), ["plus", "moins"]).t,
      L.f === "fois" ? `${L.a} + ${L.b}` : L.a > 1 && L.b > 1 && L.a * L.b !== V ? `${L.a} × ${L.b}` : expr(V + 3, ["plus"]).t,
    ].filter((x) => x !== R.t);
    const eq = `${L.t} = …`;
    const parts0: Part[] = L.f === "plus" ? [{ label: String(L.a), value: L.a }, { label: String(L.b), value: L.b }] : L.a <= 6 ? parts(L.a, String(L.b), L.b) : parts(L.b, String(L.a), L.a);
    return {
      text: un([
        `Pour que l'égalité soit vraie, que peut-on écrire à la place des pointillés ? ${eq}`,
        `Complète avec un calcul qui a la même valeur : ${eq}`,
        `Quel calcul peut-on écrire après le signe = ? ${eq}`,
        `${p.nom} veut écrire une égalité vraie : ${eq} Que peut-${p.il} écrire ?`,
        `Quel calcul vaut autant que ${L.t} ?`,
      ]),
      ...qcm(R.t, faux),
      explanation: etapes(
        "Après le signe =, on écrit un calcul qui a la même valeur que le côté gauche, pas le résultat suivi d'un autre calcul.",
        `${L.t} = ${V} et ${R.t} = ${V}.`,
        `On peut écrire ${L.t} = ${R.t}.`,
      ),
      canvas: barre({ title: `${L.t} = …`, parts: parts0, question: "Même valeur des deux côtés du signe =" }),
    };
  }),

  // ★3 — paquets à comparer : 3 × 8 = 2 × 12 ?
  tpl(E, "g06", 3, "Calcule le total de chacun : nombre de paquets × nombre par paquet.", () => {
    const [A, B] = deux();
    const pk = un(PACKS);
    const egal = Math.random() < 0.4;
    let n1 = 0, k1 = 0, n2 = 0, k2 = 0;
    if (egal) {
      const V = un([12, 16, 18, 20, 24, 30, 36, 40]);
      const fs: [number, number][] = [];
      for (let d = 2; d <= 10; d++) if (V % d === 0 && V / d >= 2 && V / d <= 12) fs.push([d, V / d]);
      [n1, k1] = un(fs);
      [n2, k2] = un(fs.filter(([x]) => x !== n1));
    } else {
      for (let i = 0; i < 30; i++) {
        n1 = entre(2, 9); k1 = entre(3, 12); n2 = entre(2, 9); k2 = entre(3, 12);
        const ecart = Math.abs(n1 * k1 - n2 * k2);
        if (n1 !== n2 && ecart > 0 && ecart <= 12 && (i > 15 || n1 + k1 === n2 + k2 || Math.random() < 0.3)) break;
      }
    }
    const P1 = n1 * k1, P2 = n2 * k2;
    const pareil = `C'est pareil : ${n1} × ${k1} = ${n2} × ${k2}.`;
    const juste = P1 === P2 ? pareil : P1 > P2 ? `${A.nom} en a plus.` : `${B.nom} en a plus.`;
    const faux = [pareil, `${A.nom} en a plus.`, `${B.nom} en a plus.`];
    if (n1 + k1 === n2 + k2 && P1 !== P2) faux.push(`C'est pareil : ${n1} + ${k1} = ${n2} + ${k2}.`);
    return {
      text: phrase(
        `${A.nom} a ${n1} ${pk.cs} de ${k1} ${pk.o}. ${B.nom} a ${n2} ${pk.cs} de ${k2} ${pk.o}.`,
        un([`Qui a le plus ${de(pk.o)} ?`, `Compare : qui a le plus ${de(pk.o)} ?`, `Lequel des deux a le plus ${de(pk.o)} ?`, "Qui en a le plus ?"]),
      ),
      ...qcm(juste, faux),
      explanation: etapes(
        "On calcule le total de chacun, puis on compare les deux nombres : il ne faut pas additionner le nombre de paquets et le nombre par paquet.",
        `${A.nom} : ${n1} × ${k1} = ${P1}. ${B.nom} : ${n2} × ${k2} = ${P2}.`,
        P1 === P2 ? `${n1} × ${k1} = ${n2} × ${k2} : c'est pareil.` : juste,
      ),
      canvas: tableau({
        coin: "",
        headers: [cap(pk.cs), `${cap(pk.o)} par ${pk.c}`, "Total"],
        rows: [
          { label: A.nom, values: [n1, k1, "?"] },
          { label: B.nom, values: [n2, k2, "?"] },
        ],
      }),
    };
  }),

  // ★3 — sans calculer : on ajoute d'un côté, on enlève de l'autre.
  tpl(E, "g07", 3, "Regarde comment chaque nombre a changé entre les deux côtés.", () => {
    const p = perso();
    const d = un([1, 2, 5, 10]);
    const cas = un(["plusVrai", "plusFaux", "moinsVrai", "moinsFaux"] as const);
    const a = entre(25, 80);
    const b = entre(d + 6, 60);
    let eq = "", avant: number[] = [], apres: number[] = [];
    if (cas === "plusVrai") { eq = `${a} + ${b} = ${a + d} + ${b - d}`; avant = [a, b]; apres = [a + d, b - d]; }
    if (cas === "plusFaux") { eq = `${a} + ${b} = ${a + d} + ${b + d}`; avant = [a, b]; apres = [a + d, b + d]; }
    const g = Math.max(a, b) + 10, h = Math.min(a, b);
    if (cas === "moinsVrai") { eq = `${g} − ${h} = ${g + d} − ${h + d}`; avant = [g, h]; apres = [g + d, h + d]; }
    if (cas === "moinsFaux") { eq = `${g} − ${h} = ${g + d} − ${h - d}`; avant = [g, h]; apres = [g + d, h - d]; }
    const S = {
      plusVrai: `Oui : on ajoute ${d} à un nombre et on enlève ${d} à l'autre.`,
      plusFaux: `Non : les deux nombres ont augmenté de ${d}.`,
      moinsVrai: `Oui : les deux nombres ont augmenté de ${d}, l'écart ne change pas.`,
      moinsFaux: "Non : l'écart entre les deux nombres a changé.",
    };
    const piege = "Non : les nombres ne sont pas les mêmes des deux côtés.";
    const juste = S[cas];
    const faux = cas.startsWith("plus") ? [S.plusVrai, S.plusFaux, S.moinsVrai, S.moinsFaux, piege] : [S.moinsVrai, S.moinsFaux, S.plusVrai, S.plusFaux, piege];
    const vrai = cas.endsWith("Vrai");
    return {
      text: phrase(
        un(["Sans poser le calcul :", "Sans tout calculer :", "Astuce de calcul mental :", `${p.nom} a écrit dans son cahier :`, "Au jeu du vrai ou faux :", "Regarde bien les nombres :"]),
        eq + ".",
        un(["Cette égalité est-elle vraie ?", "Est-ce une égalité vraie ?", "L'égalité est-elle juste ?"]),
      ),
      ...qcm(juste, faux.filter((x) => x !== juste).slice(0, 3)),
      explanation: etapes(
        cas.startsWith("plus")
          ? "Dans une somme, si on ajoute à un nombre ce qu'on enlève à l'autre, la somme ne change pas."
          : "Dans une différence, si on ajoute le même nombre aux deux, l'écart ne change pas.",
        `On vérifie : ${eq.replace("=", "et")} valent ${vrai ? "la même chose" : "deux nombres différents"}.`,
        vrai ? "L'égalité est vraie." : "L'égalité est fausse.",
      ),
      canvas: tableau({
        title: "Ce qui change",
        coin: "",
        headers: ["À gauche", "À droite"],
        rows: [
          { label: "1er nombre", values: [avant[0], apres[0]] },
          { label: "2e nombre", values: [avant[1], apres[1]] },
        ],
      }),
    };
  }),

  // ★3 — une seule égalité fausse.
  tpl(E, "g08", 3, "Calcule les deux côtés de chaque égalité.", () => {
    const p = perso();
    const pool = [12, 14, 15, 16, 18, 20, 24, 25, 30, 36];
    const Vs = pool.sort(() => Math.random() - 0.5).slice(0, 4);
    const vraies = Vs.slice(0, 3).map((V) => {
      const L = expr(V, ["plus", "fois", "moins"]);
      return `${L.t} = ${expr(V, ["plus", "moins", "fois", "div"], L.f).t}`;
    });
    const V = Vs[3];
    const type = un(["chaine", "confusion", "decale"] as const);
    let fausse: string;
    if (type === "chaine") {
      const a = entre(2, V - 2);
      const c = entre(2, 9);
      fausse = `${a} + ${V - a} = ${V} + ${c}`;
    } else if (type === "confusion") {
      const L = expr(V, ["fois"]);
      fausse = L.f === "fois" ? `${L.t} = ${L.a} + ${L.b}` : `${L.t} = ${expr(V + 2, ["plus"]).t}`;
    } else {
      const L = expr(V, ["plus", "fois"]);
      fausse = `${L.t} = ${expr(V + un([1, -1, 2]), ["plus", "moins"]).t}`;
    }
    return {
      text: phrase(
        un(["", `${p.nom} a écrit quatre égalités.`, "La maîtresse affiche quatre égalités.", "Au jeu du vrai ou faux,", "Attention, piège !"]),
        un(["Une seule de ces égalités est fausse. Laquelle ?", "Trouve l'égalité fausse.", "Laquelle de ces égalités n'est pas vraie ?", "Une seule est fausse : laquelle ?"]),
      ),
      ...qcm(fausse, vraies),
      explanation: etapes(
        "Une égalité est fausse quand ses deux côtés n'ont pas la même valeur.",
        `Dans ${fausse}, les deux côtés ne valent pas la même chose.`,
        `L'égalité fausse est ${fausse}.`,
      ),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_COMPLETER_EGALITE ═════════════════════════ */

const C = "algebre_completer_egalite";
const SYMB = ["…", "?", "■", "★", "▲"];
const Q_COMPLETE = (eq: string, s: string) => [
  `Complète l'égalité : ${eq}`,
  `Quel nombre manque ? ${eq}`,
  `Par quel nombre remplacer ${s} ? ${eq}`,
  `Trouve le nombre caché : ${eq}`,
  `${eq} Quel nombre faut-il écrire à la place de ${s} ?`,
  `Pour que l'égalité soit vraie, que vaut ${s} ? ${eq}`,
  `Quel nombre rend l'égalité vraie ? ${eq}`,
];

type Trou = { eq: string; x: number; faux: number[]; calc: string; canvas?: CanvasFigure };
function trouSimple(s: string, op: string): Trou {
  if (op === "a+x" || op === "x+b") {
    const a = entre(10, 60), x = entre(3, 40), c = a + x;
    const eq = op === "a+x" ? `${a} + ${s} = ${c}` : `${s} + ${a} = ${c}`;
    return { eq, x, faux: [c + a, x + 10, x - 1, c], calc: `${c} − ${a} = ${x}`, canvas: barre({ title: eq, total: String(c), parts: op === "a+x" ? [{ label: String(a), value: a }, { label: "?", unknown: true }] : [{ label: "?", unknown: true }, { label: String(a), value: a }] }) };
  }
  if (op === "a−x") {
    const c = entre(5, 40), x = entre(3, 40), a = c + x;
    const eq = `${a} − ${s} = ${c}`;
    return { eq, x, faux: [a + c, x + 10, c, x + 1], calc: `${a} − ${c} = ${x}`, canvas: barre({ title: eq, total: String(a), parts: [{ label: "on enlève ?", unknown: true }, { label: "il reste", value: c }] }) };
  }
  if (op === "x−b") {
    const b = entre(3, 30), c = entre(5, 40), x = b + c;
    const eq = `${s} − ${b} = ${c}`;
    return { eq, x, faux: [Math.abs(c - b), x + 10, x - 1, c], calc: `${c} + ${b} = ${x}`, canvas: barre({ title: eq, total: "?", parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] }) };
  }
  if (op === "a×x" || op === "x×b") {
    const a = entre(2, 9), x = entre(2, 10), c = a * x;
    const eq = op === "a×x" ? `${a} × ${s} = ${c}` : `${s} × ${a} = ${c}`;
    return { eq, x, faux: [c - a, c + a, x + 1, x - 1], calc: `${c} ÷ ${a} = ${x}`, canvas: barre({ title: eq, total: String(c), parts: parts(a, "?") }) };
  }
  if (op === "x÷k") {
    const k = entre(2, 8), q = entre(2, 10), x = k * q;
    const eq = `${s} ÷ ${k} = ${q}`;
    return { eq, x, faux: [q + k, x + k, x - k, Math.abs(q - k)], calc: `${q} × ${k} = ${x}`, canvas: barre({ title: eq, total: "?", parts: parts(k, String(q), q) }) };
  }
  // a ÷ x = q
  const q = entre(2, 10), x = entre(2, 9), a = q * x;
  const eq = `${a} ÷ ${s} = ${q}`;
  return { eq, x, faux: [a * q, a - q, x + 1, x - 1], calc: `${a} ÷ ${q} = ${x}` };
}

const BALANCE_OBJ = ["un colis", "une valise", "un sac de riz", "une pastèque", "une citrouille", "un cartable", "un sac de pommes de terre", "une caisse de livres", "un pot de peinture", "un sac de sable", "un bidon d'eau", "un panier de fruits", "un sac de croquettes", "un carton de jouets", "un seau de coquillages", "un sac de ciment"];

const completer: TutorBankItemV4[] = [
  // ★2 — le trou dans une égalité simple, les quatre opérations.
  tpl(C, "g01", 2, "Cherche le nombre qui rend les deux côtés égaux : pense à l'opération inverse.", () => {
    const s = un(SYMB);
    const t = trouSimple(s, un(["a+x", "x+b", "a−x", "x−b", "a×x", "x×b", "x÷k", "a÷x"]));
    return {
      text: un(Q_COMPLETE(t.eq, s)),
      ...qcmN(t.x, t.faux),
      explanation: etapes("On cherche le nombre qui rend l'égalité vraie, avec l'opération inverse.", `${t.calc}.`, `On vérifie : ${t.eq.replace(s, String(t.x))}.`),
      ...(t.canvas ? { canvas: t.canvas } : {}),
    };
  }),

  // ★2 — « 7 + 5 = … + 4 » : le piège du résultat (12).
  tpl(C, "g02", 2, "Calcule d'abord le côté complet, puis cherche ce qui manque de l'autre côté.", () => {
    const s = un(SYMB);
    const a = entre(4, 30), b = entre(4, 30), T = a + b;
    const d = entre(2, T - 3), x = T - d;
    const forme = un([0, 1, 2]);
    const eq = forme === 0 ? `${a} + ${b} = ${s} + ${d}` : forme === 1 ? `${a} + ${b} = ${d} + ${s}` : `${s} + ${d} = ${a} + ${b}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [T, T + d, x + 1, x - 1]),
      explanation: etapes(
        `Le signe = veut dire « a la même valeur que ». ${s} n'est pas le résultat de ${a} + ${b} : il faut que les deux côtés valent autant.`,
        `${a} + ${b} = ${T}, puis ${T} − ${d} = ${x}.`,
        `${a} + ${b} = ${x} + ${d} : les deux côtés valent ${T}.`,
      ),
      canvas: barre({ title: eq, total: `${a} + ${b}`, parts: [{ label: "?", unknown: true }, { label: String(d), value: d }] }),
    };
  }),

  // ★2 — compléter dans une situation : ce qui manque, ce qui est parti.
  tpl(C, "g03", 2, "Écris l'égalité de la situation, puis cherche le nombre manquant.", () => {
    const st = un(STOCKS);
    const plus = Math.random() < 0.55;
    const a = entre(8, 45), x = entre(4, 35);
    const c = plus ? a + x : a;
    const reste = a - x;
    if (plus) {
      const eq = `${a} + … = ${c}`;
      return {
        text: phrase(
          `${cap(st.qui)} a ${a} ${st.obj}. ${cap(st.il)} voudrait en avoir ${c}.`,
          un([`Complète : ${eq}.`, `Combien lui en manque-t-il ? ${eq}`, `Quel nombre complète l'égalité ${eq} ?`, `Il lui en manque combien ? Complète ${eq}.`]),
        ),
        ...qcmN(x, [a + c, c, x + 10, x - 1]),
        explanation: etapes("Ce qu'il a, plus ce qui manque, donne ce qu'il veut : on calcule la différence.", `${c} − ${a} = ${x}.`, `${a} + ${x} = ${c}.`),
        canvas: barre({ title: eq, total: String(c), parts: [{ label: "déjà là", value: a }, { label: "manque", unknown: true }] }),
      };
    }
    const A = a + x;
    const eq = `${A} − … = ${a}`;
    void reste;
    return {
      text: phrase(
        `${cap(st.qui)} a ${A} ${st.obj}. ${cap(st.il)} ${st.perd} une partie ; il lui en reste ${a}.`,
        un([`Complète : ${eq}.`, `Quel nombre complète ${eq} ?`, `Trouve le nombre manquant : ${eq}.`, `Combien en sont partis ? Complète ${eq}.`]),
      ),
      ...qcmN(x, [A + a, a, x + 10, x + 1]),
      explanation: etapes("Ce qui est parti, c'est l'écart entre le début et ce qui reste.", `${A} − ${a} = ${x}.`, `${A} − ${x} = ${a}.`),
      canvas: barre({ title: eq, total: String(A), parts: [{ label: "partis", unknown: true }, { label: "reste", value: a }] }),
    };
  }),

  // ★2 — compléter une multiplication en situation (3 × … confondu avec 3 + …).
  tpl(C, "g04", 2, "Cherche dans la table : combien de fois ce nombre ?", () => {
    const pk = un(PACKS);
    const k = entre(2, 9), n = entre(2, 10), N = k * n;
    const parPaquet = Math.random() < 0.4;
    const chacun = pk.g === "f" ? "chacune" : "chacun";
    if (parPaquet) {
      const eq = `${n} × … = ${N}`;
      return {
        text: phrase(
          `${cap(pk.qui)} répartit ${N} ${pk.o} dans ${n} ${pk.cs}, autant dans ${chacun}.`,
          un([`Complète : ${eq}.`, `Combien ${de(pk.o)} par ${pk.c} ? Complète ${eq}.`, `Quel nombre complète ${eq} ?`]),
        ),
        ...qcmN(k, [N - n, N + n, k + 1, k - 1]),
        explanation: etapes(`${n} fois combien font ${N} ? On cherche dans la table de ${n}.`, `${N} ÷ ${n} = ${k}.`, `${n} × ${k} = ${N}.`),
        canvas: tableau({ coin: cap(pk.cs), headers: ["1", n], rows: [{ label: cap(pk.o), values: ["?", N] }], cell: { row: 0, col: 0 } }),
      };
    }
    const eq = `${k} × … = ${N}`;
    return {
      text: phrase(
        `${cap(pk.qui)} range ${N} ${pk.o} par ${pk.cs} de ${k}.`,
        un([`Combien de ${pk.cs} lui faut-il ? Complète : ${eq}.`, `Complète l'égalité ${eq} pour trouver le nombre de ${pk.cs}.`, `Quel nombre complète ${eq} ?`]),
      ),
      ...qcmN(n, [N - k, N + k, n + 1, n - 1]),
      explanation: etapes(`${k} fois combien font ${N} ? On cherche dans la table de ${k}.`, `${N} ÷ ${k} = ${n}.`, `${k} × ${n} = ${N}.`),
      canvas: tableau({ coin: cap(pk.cs), headers: ["1", "?"], rows: [{ label: cap(pk.o), values: [k, N] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★3 — deux côtés avec un produit : « 4 × 6 = 20 + … ».
  tpl(C, "g05", 3, "Calcule le côté complet, puis cherche le nombre qui donne la même valeur.", () => {
    const s = un(SYMB);
    const a = entre(2, 9), b = entre(3, 10), P = a * b;
    const forme = un(["plus", "fois", "moins", "somme"] as const);
    if (forme === "plus") {
      const c = entre(2, P - 2), x = P - c;
      const eq = `${a} × ${b} = ${c} + ${s}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [P, P + c, a + b - c, x + 1]),
        explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${c} + ${s} vaille aussi ${P}.`, `${P} − ${c} = ${x}.`, `${a} × ${b} = ${c} + ${x}.`),
        canvas: barre({ title: eq, total: `${a} × ${b}`, parts: [{ label: String(c), value: c }, { label: "?", unknown: true }] }),
      };
    }
    if (forme === "fois") {
      const ds: number[] = [];
      for (let d = 2; d <= 10; d++) if (P % d === 0 && d !== a && d !== b && P / d >= 2 && P / d <= 12) ds.push(d);
      if (ds.length) {
        const d = un(ds), x = P / d;
        const eq = `${a} × ${b} = ${s} × ${d}`;
        return {
          text: un(Q_COMPLETE(eq, s)),
          ...qcmN(x, [P, P - d, a + b - d, x + 1]),
          explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${s} × ${d} vaille aussi ${P}.`, `${P} ÷ ${d} = ${x}.`, `${a} × ${b} = ${x} × ${d}.`),
          canvas: d <= 8 ? barre({ title: eq, total: `${a} × ${b}`, parts: parts(d, "?") }) : undefined,
        };
      }
    }
    if (forme === "somme") {
      const c = un([2, 3, 4, 5, 6]), x = entre(3, 10), T = c * x, u = entre(2, T - 2);
      const eq = `${u} + ${T - u} = ${c} × ${s}`;
      return {
        text: un(Q_COMPLETE(eq, s)),
        ...qcmN(x, [T, T - c, x + 1, x - 1]),
        explanation: etapes(`${u} + ${T - u} vaut ${T} ; il faut que ${c} × ${s} vaille aussi ${T}.`, `${T} ÷ ${c} = ${x}.`, `${u} + ${T - u} = ${c} × ${x}.`),
        canvas: barre({ title: eq, total: `${u} + ${T - u}`, parts: parts(c, "?") }),
      };
    }
    const d = entre(2, 15), x = P + d;
    const eq = `${a} × ${b} = ${s} − ${d}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [P, P - d, x + 1, x - 10]),
      explanation: etapes(`${a} × ${b} vaut ${P} ; il faut que ${s} − ${d} vaille aussi ${P}.`, `${P} + ${d} = ${x}.`, `${a} × ${b} = ${x} − ${d}.`),
      canvas: barre({ title: eq, total: "?", parts: [{ label: `${a} × ${b}`, value: P }, { label: "on enlève", value: d }] }),
    };
  }),

  // ★3 — autant de paquets ? « 3 × 8 = 4 × … ».
  tpl(C, "g06", 3, "Calcule d'abord le total du premier, puis partage-le.", () => {
    const [A, B] = deux();
    const pk = un(PACKS);
    const V = un([12, 16, 18, 20, 24, 30, 36, 40, 48]);
    const fs: [number, number][] = [];
    for (let d = 2; d <= 10; d++) if (V % d === 0 && V / d >= 2 && V / d <= 12) fs.push([d, V / d]);
    const [n1, k1] = un(fs);
    const [n2, x] = un(fs.filter(([d]) => d !== n1));
    const eq = `${n1} × ${k1} = ${n2} × …`;
    return {
      text: phrase(
        `${A.nom} a ${n1} ${pk.cs} de ${k1} ${pk.o}. ${B.nom} veut autant ${de(pk.o)} avec ${n2} ${pk.cs} identiques.`,
        un([`Combien ${de(pk.o)} dans chaque ${pk.c} ? Complète : ${eq}`, `Complète l'égalité ${eq}`, `Quel nombre complète ${eq} ?`]),
      ),
      ...qcmN(x, [V, V - n2, k1, k1 + n1 - n2, x + 1]),
      explanation: etapes(`${A.nom} a ${n1} × ${k1} = ${V} ${pk.o}. Il faut ${V} aussi avec ${n2} ${pk.cs}.`, `${V} ÷ ${n2} = ${x}.`, `${n1} × ${k1} = ${n2} × ${x}.`),
      canvas: tableau({
        coin: "",
        headers: [cap(pk.cs), `${cap(pk.o)} par ${pk.c}`, "Total"],
        rows: [
          { label: A.nom, values: [n1, k1, "?"] },
          { label: B.nom, values: [n2, "?", "?"] },
        ],
        cell: { row: 1, col: 1 },
      }),
    };
  }),

  // ★3 — la balance équilibrée : « 7 + 5 = 4 + … » en kilos.
  tpl(C, "g07", 3, "Les deux plateaux ont la même masse : calcule le plateau complet.", () => {
    const obj = un(BALANCE_OBJ);
    const a = entre(3, 20), b = entre(3, 20), T = a + b;
    const c = entre(2, T - 2), x = T - c;
    const qui = un(["Au marché, la marchande", "À la poste, le facteur", "Au laboratoire, la chercheuse", "À l'épicerie, le vendeur", "Dans la classe, la maîtresse", "À la ferme, le fermier", "À l'aéroport, l'agent", "Dans son atelier, le menuisier"]);
    return {
      text: phrase(
        `${qui} pèse ${obj} sur une balance à deux plateaux. La balance est équilibrée. À gauche : ${a} kg et ${b} kg. À droite : ${c} kg et ${obj}.`,
        un([`Combien pèse ${obj} ?`, `Quelle est la masse ${deUn(obj)} ?`, `Complète : ${a} + ${b} = ${c} + … Combien pèse ${obj} ?`]),
      ),
      ...qcmN(x, [T, T + c, x + 1, x - 1], "kg"),
      explanation: etapes("Une balance équilibrée, c'est une égalité : les deux plateaux ont la même masse.", `${a} + ${b} = ${T} ; ${T} − ${c} = ${x}.`, `${a} + ${b} = ${c} + ${x} : il pèse ${x} kg.`),
      canvas: barre({ title: "Balance équilibrée", total: `${a} kg + ${b} kg`, parts: [{ label: `${c} kg`, value: c }, { label: "l'objet", unknown: true }] }),
    };
  }),

  // ★3 — soustractions des deux côtés.
  tpl(C, "g08", 3, "Calcule le côté complet ; le nombre caché doit donner la même valeur.", () => {
    const s = un(SYMB);
    const forme = un([0, 1, 2]);
    if (forme === 0) {
      const a = entre(30, 90), b = entre(5, 25), D = a - b, d = entre(3, 20), x = D + d;
      const eq = `${a} − ${b} = ${s} − ${d}`;
      return { text: un(Q_COMPLETE(eq, s)), ...qcmN(x, [D, D - d, x + 10, x - 1]), explanation: etapes(`${a} − ${b} vaut ${D} : il faut que ${s} − ${d} vaille aussi ${D}.`, `${D} + ${d} = ${x}.`, `${a} − ${b} = ${x} − ${d}.`) };
    }
    if (forme === 1) {
      const a = entre(30, 90), b = entre(5, 25), D = a - b, c = D + entre(5, 30), x = c - D;
      const eq = `${a} − ${b} = ${c} − ${s}`;
      return { text: un(Q_COMPLETE(eq, s)), ...qcmN(x, [D, c + D, x + 10, x + 1]), explanation: etapes(`${a} − ${b} vaut ${D} : il faut que ${c} − ${s} vaille aussi ${D}.`, `${c} − ${D} = ${x}.`, `${a} − ${b} = ${c} − ${x}.`) };
    }
    const a = entre(10, 40), b = entre(10, 40), T = a + b, d = entre(3, 20), x = T + d;
    const eq = `${a} + ${b} = ${s} − ${d}`;
    return {
      text: un(Q_COMPLETE(eq, s)),
      ...qcmN(x, [T, T - d, x + 1, x - 10]),
      explanation: etapes(`${a} + ${b} vaut ${T} : il faut que ${s} − ${d} vaille aussi ${T}.`, `${T} + ${d} = ${x}.`, `${a} + ${b} = ${x} − ${d}.`),
      canvas: barre({ title: eq, total: "?", parts: [{ label: `${a} + ${b}`, value: T }, { label: "on enlève", value: d }] }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_NOMBRE_INCONNU ═════════════════════════ */

const N = "algebre_nombre_inconnu";
type Op = "+" | "−" | "×" | "÷";
function devinette(op: Op, x: number, k: number) {
  const je = Math.random() < 0.5;
  const P = perso();
  const lead = je
    ? un(["Je pense à un nombre.", "Devine mon nombre mystère.", "J'ai choisi un nombre secret.", "Voici ma devinette."])
    : un([`${P.nom} pense à un nombre.`, `Devinette de ${P.nom} : ${P.il} a choisi un nombre secret.`, `${P.nom} cache un nombre dans sa tête.`, `Le magicien demande à ${P.nom} de choisir un nombre.`]);
  const S = je ? "Je" : cap(P.il);
  const verbe =
    op === "+" ? `${S} lui ajoute ${k}` : op === "−" ? `${S} lui ${un(["enlève", "retire"])} ${k}` : op === "×" ? (k === 2 && Math.random() < 0.4 ? `${S} le double` : `${S} le multiplie par ${k}`) : `${S} le divise par ${k}`;
  const r = op === "+" ? x + k : op === "−" ? x - k : op === "×" ? x * k : x / k;
  const fin = je ? un([`et j'obtiens ${r}.`, `: je trouve ${r}.`, `et le résultat est ${r}.`]) : un([`et ${P.il} obtient ${r}.`, `: ${P.il} trouve ${r}.`, `et le résultat est ${r}.`]);
  const q = je
    ? un(["Quel est ce nombre ?", "Quel nombre ai-je choisi ?", "Quel est mon nombre de départ ?", "Retrouve mon nombre."])
    : un(["Quel est ce nombre ?", `Quel nombre a-t-${P.il} choisi ?`, "Quel est le nombre de départ ?", "Retrouve le nombre secret."]);
  return { text: phrase(lead, `${verbe} ${fin}`, q), r };
}
const INVERSE: Record<Op, string> = { "+": "−", "−": "+", "×": "÷", "÷": "×" };

const inconnu: TutorBankItemV4[] = [
  // ★2 — je pense à un nombre (une opération).
  tpl(N, "g01", 2, "Fais l'opération inverse pour revenir au nombre de départ.", () => {
    const op = un(["+", "−", "×", "÷"] as Op[]);
    const k = op === "+" || op === "−" ? entre(4, 25) : entre(2, 9);
    const x = op === "+" ? entre(5, 60) : op === "−" ? entre(k + 3, 80) : op === "×" ? entre(2, 10) : k * entre(2, 10);
    const { text, r } = devinette(op, x, k);
    const faux = op === "+" ? [r + k, x + 10, x - 1] : op === "−" ? [r - k, x + 10, x - 1] : op === "×" ? [r - k, r + k, x + 1] : [r + k, Math.abs(r - k), x + k];
    const canvas =
      op === "+" ? barre({ total: String(r), parts: [{ label: "nombre", unknown: true }, { label: `+ ${k}`, value: k }] })
      : op === "−" ? barre({ total: "?", parts: [{ label: `on enlève ${k}`, value: k }, { label: "il reste", value: r }] })
      : op === "×" ? barre({ total: String(r), parts: parts(k, "?") })
      : barre({ total: "?", parts: parts(k, String(r), r) });
    return {
      text,
      ...qcmN(x, faux),
      explanation: etapes(`On remonte le calcul avec l'opération inverse : le contraire de « ${op} » est « ${INVERSE[op]} ».`, `${r} ${INVERSE[op]} ${k} = ${x}.`, `Le nombre est ${x} : ${x} ${op} ${k} = ${r}.`),
      canvas,
    };
  }),

  // ★2 — le nombre caché sous un symbole.
  tpl(N, "g02", 2, "Le symbole cache un nombre : utilise l'opération inverse.", () => {
    const s = un(["★", "■", "▲", "●", "♥", "?"]);
    const op = un(["a+x", "x+b", "a−x", "x−b", "a×x", "x×b", "x÷k"]);
    const t = trouSimple(s, op);
    return {
      text: un([`Quel nombre se cache sous ${s} ? ${t.eq}`, `${t.eq} Que vaut ${s} ?`, `Trouve la valeur de ${s} : ${t.eq}`, `Dans ${t.eq}, quel nombre remplace ${s} ?`, `${s} est un nombre mystère : ${t.eq}. Lequel ?`]),
      ...qcmN(t.x, t.faux),
      explanation: etapes("On trouve le nombre caché avec l'opération inverse.", `${t.calc}.`, `${s} = ${t.x}, car ${t.eq.replace(s, String(t.x))}.`),
      ...(t.canvas ? { canvas: t.canvas } : {}),
    };
  }),

  // ★2 — combien au début ? (stock qui monte ou qui baisse).
  tpl(N, "g03", 2, "Remonte le temps : fais l'inverse de ce qui s'est passé.", () => {
    const st = un(STOCKS);
    const gain = Math.random() < 0.5;
    const b = entre(4, 30), x = entre(b + 5, 70);
    const c = gain ? x + b : x - b;
    const fin = gain ? `Maintenant, ${st.il} en a ${c}.` : `Il lui en reste ${c}.`;
    return {
      text: phrase(
        `${cap(st.qui)} a des ${st.obj}. ${cap(st.il)} ${gain ? st.gagne : st.perd} ${b}. ${fin}`,
        un([`Combien ${de(st.obj)} avait-${st.il} au début ?`, `Combien en avait-${st.il} au départ ?`, `Combien ${de(st.obj)} y avait-il avant ?`]),
      ),
      ...qcmN(x, gain ? [c + b, c, x + 10] : [c - b, c, x - 10]),
      explanation: etapes(
        gain ? "On a ajouté : pour revenir au début, on soustrait." : "On a enlevé : pour revenir au début, on ajoute.",
        gain ? `${c} − ${b} = ${x}.` : `${c} + ${b} = ${x}.`,
        `Au début, il y en avait ${x}.`,
      ),
      canvas: gain
        ? barre({ title: "Au début ?", total: String(c), parts: [{ label: "au début", unknown: true }, { label: "en plus", value: b }] })
        : barre({ title: "Au début ?", total: "?", parts: [{ label: "partis", value: b }, { label: "reste", value: c }] }),
    };
  }),

  // ★2 — quel calcul fait trouver l'inconnu ?
  tpl(N, "g04", 2, "Pour défaire une addition, on soustrait ; pour défaire une multiplication, on divise.", () => {
    const s = un(["★", "■", "▲", "●", "?"]);
    const P = perso();
    const op = un(["+", "−", "×"] as Op[]);
    let eq = "", juste = "", faux: string[] = [], canvas: CanvasFigure;
    if (op === "+") {
      const b = entre(6, 30), x = entre(5, 50), c = x + b;
      eq = un([`${s} + ${b} = ${c}`, `${b} + ${s} = ${c}`]);
      juste = `${c} − ${b}`; faux = [`${c} + ${b}`, `${b} − ${c}`, `${c} × ${b}`];
      canvas = barre({ title: eq, total: String(c), parts: [{ label: s, unknown: true }, { label: String(b), value: b }] });
    } else if (op === "−") {
      const b = entre(5, 25), c = entre(5, 40);
      eq = `${s} − ${b} = ${c}`;
      juste = `${c} + ${b}`; faux = [`${c} − ${b}`, `${b} − ${c}`, `${c} × ${b}`];
      canvas = barre({ title: eq, total: s, parts: [{ label: "on enlève", value: b }, { label: "il reste", value: c }] });
    } else {
      const k = entre(3, 9), x = entre(3, 10), c = k * x;
      eq = un([`${s} × ${k} = ${c}`, `${k} × ${s} = ${c}`]);
      juste = `${c} ÷ ${k}`; faux = [`${c} − ${k}`, `${c} × ${k}`, `${c} + ${k}`];
      canvas = barre({ title: eq, total: String(c), parts: parts(k, s) });
    }
    return {
      text: un([`Pour trouver ${s} dans ${eq}, quel calcul fais-tu ?`, `Quel calcul donne ${s} ? ${eq}`, `${P.nom} cherche ${s} dans ${eq}. Quel calcul doit-${P.il} faire ?`, `${eq} Quelle opération permet de trouver ${s} ?`]),
      ...qcm(juste, faux),
      explanation: etapes("On utilise l'opération inverse : + se défait par −, − par +, × par ÷.", `Pour ${eq}, on calcule ${juste}.`, `Le bon calcul est ${juste}.`),
      canvas,
    };
  }),

  // ★3 — deux opérations : « je multiplie par 3 puis j'ajoute 5 ».
  tpl(N, "g05", 3, "Défais les opérations dans l'ordre inverse : la dernière d'abord.", () => {
    const je = Math.random() < 0.5;
    const P = perso();
    const k = entre(2, 6), b = entre(2, 15), x = entre(3, 12);
    const moins = Math.random() < 0.4 && x * k > b + 2;
    const r = moins ? x * k - b : x * k + b;
    const S = je ? "je" : P.il;
    const lead = je ? un(["Je pense à un nombre.", "Voici ma devinette.", "J'ai choisi un nombre secret."]) : un([`${P.nom} pense à un nombre.`, `Devinette de ${P.nom} :`, `${P.nom} a choisi un nombre secret.`]);
    const fois = k === 2 ? un(["le double", `le multiplie par ${k}`]) : k === 3 ? un(["le triple", `le multiplie par ${k}`]) : `le multiplie par ${k}`;
    const ajout = moins ? `${je ? "j'enlève" : `${P.il} enlève`} ${b}` : `${je ? "j'ajoute" : `${P.il} ajoute`} ${b}`;
    const obtient = je ? `J'obtiens ${r}.` : `${cap(P.il)} obtient ${r}.`;
    const faux = moins ? [r + b, Math.round((r - b) / k) || 1, x + 1, r * k] : [r - b, Math.floor(r / k) - b, x + 1, r + b];
    return {
      text: phrase(lead, `${cap(S)} ${fois}, puis ${ajout}. ${obtient}`, un(["Quel est le nombre de départ ?", "Quel est ce nombre ?", "Retrouve le nombre choisi."])),
      ...qcmN(x, faux),
      explanation: etapes(
        "On défait les opérations en partant de la fin, avec les opérations inverses.",
        moins ? `${r} + ${b} = ${x * k}, puis ${x * k} ÷ ${k} = ${x}.` : `${r} − ${b} = ${x * k}, puis ${x * k} ÷ ${k} = ${x}.`,
        `Le nombre est ${x} : ${x} × ${k} ${moins ? "−" : "+"} ${b} = ${r}.`,
      ),
      canvas: moins
        ? barre({ title: `? × ${k} − ${b} = ${r}`, total: `${x * k}`, parts: [{ label: "reste", value: r }, { label: `on enlève ${b}`, value: b }] })
        : barre({ title: `? × ${k} + ${b} = ${r}`, total: String(r), parts: [...parts(k, "?"), { label: `+ ${b}`, value: b }] }),
    };
  }),

  // ★3 — le facteur inconnu en situation (nombre de paquets ou nombre par paquet).
  tpl(N, "g06", 3, "Écris la multiplication à trou, puis cherche dans la table.", () => {
    const pk = un(PACKS);
    const k = entre(3, 9), n = entre(3, 10), T = k * n;
    const combienPaquets = Math.random() < 0.5;
    if (combienPaquets) {
      return {
        text: phrase(
          `${cap(pk.qui)} remplit des ${pk.cs} de ${k} ${pk.o}. ${cap(pk.il)} utilise ${T} ${pk.o} en tout.`,
          un([`Combien de ${pk.cs} remplit-${pk.il} ?`, `Combien de ${pk.cs} y a-t-il ?`, `Trouve le nombre de ${pk.cs} : ? × ${k} = ${T}.`]),
        ),
        ...qcmN(n, [T - k, T + k, n + 1, n - 1]),
        explanation: etapes(`Le nombre de ${pk.cs} est l'inconnu : ? × ${k} = ${T}.`, `${T} ÷ ${k} = ${n}.`, `Il y a ${n} ${pk.cs}.`),
        canvas: tableau({ coin: cap(pk.cs), headers: ["1", "?"], rows: [{ label: cap(pk.o), values: [k, T] }], cell: { row: 0, col: 1 } }),
      };
    }
    return {
      text: phrase(
        `${cap(pk.qui)} répartit ${T} ${pk.o} dans ${n} ${pk.cs}, autant dans ${pk.g === "f" ? "chacune" : "chacun"}.`,
        un([`Combien ${de(pk.o)} dans chaque ${pk.c} ?`, `Combien ${de(pk.o)} met-${pk.il} par ${pk.c} ?`, `Trouve le nombre inconnu : ${n} × ? = ${T}.`]),
      ),
      ...qcmN(k, [T - n, T + n, k + 1, k - 1]),
      explanation: etapes(`Le nombre par ${pk.c} est l'inconnu : ${n} × ? = ${T}.`, `${T} ÷ ${n} = ${k}.`, `Il y a ${k} ${pk.o} par ${pk.c}.`),
      canvas: n <= 8 ? barre({ title: `${T} ${pk.o}`, total: String(T), parts: parts(n, pk.c) }) : tableau({ coin: cap(pk.cs), headers: ["1", n], rows: [{ label: cap(pk.o), values: ["?", T] }], cell: { row: 0, col: 0 } }),
    };
  }),

  // ★3 — deux événements : il reçoit puis il donne.
  tpl(N, "g07", 3, "Repars de la fin et fais les opérations inverses, une à une.", () => {
    const st = un(STOCKS);
    const b = entre(5, 25), d = entre(4, 20), x = entre(Math.max(d, 10) + 5, 70);
    const gagneDabord = Math.random() < 0.5;
    const c = x + b - d;
    const e1 = gagneDabord ? `${st.gagne} ${b}` : `${st.perd} ${d}`;
    const e2 = gagneDabord ? `${st.perd} ${d}` : `${st.gagne} ${b}`;
    return {
      text: phrase(
        `${cap(st.qui)} a des ${st.obj}. ${cap(st.il)} ${e1}, puis ${st.il} ${e2}. Maintenant, ${st.il} en a ${c}.`,
        un([`Combien ${de(st.obj)} avait-${st.il} au début ?`, `Combien en avait-${st.il} au départ ?`, "Quel était le nombre de départ ?"]),
      ),
      ...qcmN(x, [c - b - d, c + b + d, c + b - d, c]),
      explanation: etapes(
        `${b} en plus et ${d} en moins : on défait avec les opérations inverses.`,
        `${c} − ${b} + ${d} = ${x}.`,
        `Au début, il y en avait ${x}.`,
      ),
      canvas: barre({ title: "Au début ?", total: String(c), parts: [{ label: "au début", unknown: true }, { label: `+ ${b}`, value: b }, { label: `− ${d}`, value: d }] }),
    };
  }),

  // ★3 — le même symbole plusieurs fois : ★ + ★ + ★ = 36, 2 × ★ + 5 = 21.
  tpl(N, "g08", 3, "Quand le même symbole revient, il vaut toujours le même nombre.", () => {
    const s = un(["★", "■", "▲", "●", "♥"]);
    const forme = un([0, 1, 2]);
    if (forme === 0) {
      const k = un([2, 3, 4]), x = entre(4, 15), T = k * x;
      const eq = Array.from({ length: k }, () => s).join(" + ") + ` = ${T}`;
      return {
        text: un([`Que vaut ${s} ? ${eq}`, `${eq} Quel nombre se cache sous ${s} ?`, `Trouve ${s} : ${eq}`, `Les ${s} cachent tous le même nombre : ${eq}. Lequel ?`]),
        ...qcmN(x, [T - k, T, x + 1, Math.floor(T / (k + 1))]),
        explanation: etapes(`${eq} veut dire ${k} × ${s} = ${T}.`, `${T} ÷ ${k} = ${x}.`, `${s} = ${x}.`),
        canvas: barre({ title: eq, total: String(T), parts: parts(k, s) }),
      };
    }
    const k = un([2, 3]), b = entre(2, 12), x = entre(3, 12), T = k * x + b;
    const eq = forme === 1 ? `${Array.from({ length: k }, () => s).join(" + ")} + ${b} = ${T}` : `${k} × ${s} + ${b} = ${T}`;
    return {
      text: un([`Que vaut ${s} ? ${eq}`, `${eq} Quel nombre se cache sous ${s} ?`, `Trouve ${s} : ${eq}`, `Le symbole ${s} cache toujours le même nombre : ${eq}. Lequel ?`]),
      ...qcmN(x, [T - b, Math.floor(T / k), x + 1, T - b - k]),
      explanation: etapes(`On enlève d'abord ${b}, puis on partage en ${k}.`, `${T} − ${b} = ${T - b}, puis ${T - b} ÷ ${k} = ${x}.`, `${s} = ${x}.`),
      canvas: barre({ title: eq, total: String(T), parts: [...parts(k, s), { label: String(b), value: b }] }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_SCHEMA_BARRE ═════════════════════════ */

const S = "algebre_schema_barre";
const DEUX_GROUPES = [
  { g: "Dans le car de la sortie", A: "filles", B: "garçons", u: "enfants" },
  { g: "Dans la corbeille de fruits", A: "pommes", B: "poires", u: "fruits" },
  { g: "Au refuge", A: "chats", B: "chiens", u: "animaux" },
  { g: "À la bibliothèque de l'école", A: "albums", B: "romans", u: "livres" },
  { g: "Sur le parking", A: "voitures", B: "motos", u: "véhicules" },
  { g: "Dans la boîte de feutres", A: "feutres rouges", B: "feutres bleus", u: "feutres" },
  { g: "Au club de sport", A: "judokas", B: "nageurs", u: "inscrits" },
  { g: "Dans la basse-cour de la fermière", A: "poules", B: "canards", u: "oiseaux" },
  { g: "Dans la vitrine du pâtissier", A: "éclairs", B: "tartelettes", u: "gâteaux" },
  { g: "Dans l'aquarium", A: "poissons rouges", B: "poissons-clowns", u: "poissons" },
  { g: "Sur l'étal du maraîcher", A: "tomates", B: "courgettes", u: "légumes" },
  { g: "Dans la collection de Malo", A: "cartes de foot", B: "cartes de basket", u: "cartes" },
  { g: "Dans la salle de cinéma", A: "adultes", B: "enfants", u: "spectateurs" },
  { g: "Dans le bocal de la maîtresse", A: "billes noires", B: "billes blanches", u: "billes" },
  { g: "Dans le bouquet de la fleuriste", A: "roses", B: "tulipes", u: "fleurs" },
  { g: "Dans l'atelier du réparateur", A: "vélos", B: "trottinettes", u: "engins" },
  { g: "À la cantine", A: "élèves de CM1", B: "élèves de CM2", u: "élèves" },
  { g: "Dans le potager", A: "salades", B: "poireaux", u: "plants" },
  { g: "Sur le marché de Saint-Pierre, dans le panier de Naïa", A: "letchis", B: "mangues", u: "fruits" },
  { g: "Dans le hangar du club de voile", A: "planches à voile", B: "kayaks", u: "bateaux" },
] as const;

/** Une longueur, un trajet, une somme d'argent dont on a déjà une partie. */
const RESTES = [
  { t: (T: number, a: number, p: Perso) => `${p.nom} lit un livre de ${T} pages. ${cap(p.il)} en a déjà lu ${a}.`, q: "Combien de pages lui reste-t-il à lire ?", u: "pages" },
  { t: (T: number, a: number, p: Perso) => `${p.nom} fait une randonnée de ${T} km. ${cap(p.il)} a déjà parcouru ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km" },
  { t: (T: number, a: number, p: Perso) => `${p.nom} économise pour un vélo à ${T} €. ${cap(p.il)} a déjà ${a} €.`, q: "Combien d'euros lui manque-t-il ?", u: "€" },
  { t: (T: number, a: number) => `La couturière coupe ${a} cm dans un ruban de ${T} cm.`, q: "Quelle longueur de ruban reste-t-il ?", u: "cm" },
  { t: (T: number, a: number) => `Le film dure ${T} minutes. On en a déjà regardé ${a} minutes.`, q: "Combien de minutes reste-t-il ?", u: "min" },
  { t: (T: number, a: number) => `Une corde de ${T} m est coupée en deux morceaux. L'un mesure ${a} m.`, q: "Combien mesure l'autre morceau ?", u: "m" },
  { t: (T: number, a: number) => `Le pâtissier a besoin de ${T} g de beurre. Il en a déjà pesé ${a} g.`, q: "Combien de grammes doit-il encore ajouter ?", u: "g" },
  { t: (T: number, a: number, p: Perso) => `À la piscine, ${p.nom} doit nager ${T} longueurs. ${cap(p.il)} en a déjà nagé ${a}.`, q: "Combien de longueurs lui reste-t-il ?", u: "longueurs" },
  { t: (T: number, a: number) => `Le camion de livraison doit parcourir ${T} km. Le chauffeur a déjà roulé ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km" },
  { t: (T: number, a: number) => `Le peintre doit poser ${T} m de frise. Il en a posé ${a} m.`, q: "Combien de mètres lui reste-t-il à poser ?", u: "m" },
  { t: (T: number, a: number) => `Pour la kermesse, il faut vendre ${T} tickets. On en a vendu ${a}.`, q: "Combien de tickets reste-t-il à vendre ?", u: "tickets" },
  { t: (T: number, a: number) => `La jardinière doit planter ${T} bulbes. Elle en a planté ${a}.`, q: "Combien de bulbes lui reste-t-il à planter ?", u: "bulbes" },
  { t: (T: number, a: number, p: Perso) => `Le puzzle de ${p.nom} a ${T} pièces. ${cap(p.il)} en a posé ${a}.`, q: "Combien de pièces reste-t-il à poser ?", u: "pièces" },
  { t: (T: number, a: number) => `La cycliste fait une course de ${T} km. Elle a déjà roulé ${a} km.`, q: "Combien de kilomètres lui reste-t-il ?", u: "km" },
];

const TROIS_GROUPES = [
  { g: "Dans la corbeille", A: "pommes", B: "poires", C: "bananes", u: "fruits" },
  { g: "Sur le parking", A: "voitures", B: "motos", C: "camions", u: "véhicules" },
  { g: "Au refuge", A: "chats", B: "chiens", C: "lapins", u: "animaux" },
  { g: "Dans la trousse géante de la classe", A: "crayons", B: "feutres", C: "stylos", u: "objets" },
  { g: "Au club de sport", A: "judokas", B: "nageurs", C: "danseurs", u: "inscrits" },
  { g: "Dans la vitrine de la boulangerie", A: "croissants", B: "pains au chocolat", C: "brioches", u: "viennoiseries" },
  { g: "Dans le jardin", A: "rosiers", B: "tulipes", C: "marguerites", u: "plantes" },
  { g: "À la ferme", A: "poules", B: "canards", C: "oies", u: "volailles" },
  { g: "Dans la bibliothèque de la classe", A: "albums", B: "romans", C: "bandes dessinées", u: "livres" },
  { g: "Au zoo, dans la volière", A: "perroquets", B: "flamants", C: "toucans", u: "oiseaux" },
  { g: "Au marché, sur l'étal", A: "tomates", B: "carottes", C: "courgettes", u: "légumes" },
  { g: "Dans le magasin de jouets", A: "puzzles", B: "ballons", C: "peluches", u: "jouets" },
] as const;

const ACHATS = [
  ["un livre", "un jeu"], ["un ballon", "une gourde"], ["un tee-shirt", "une casquette"], ["une trousse", "un compas"],
  ["un puzzle", "une peluche"], ["un cahier de coloriage", "des feutres"], ["une place de cinéma", "un pot de pop-corn"],
  ["un bouquet", "un vase"], ["des chaussettes", "un bonnet"], ["un masque de plongée", "un tuba"], ["une raquette", "des balles"],
  ["un sac de billes", "un yoyo"],
] as const;

const schemaBarre: TutorBankItemV4[] = [
  // ★2 — la partie manquante.
  tpl(S, "g01", 2, "Le tout moins la partie connue donne la partie cachée.", () => {
    const c = un(DEUX_GROUPES);
    const T = entre(25, 95), a = entre(8, T - 8), b = T - a;
    return {
      text: phrase(
        `${c.g}, il y a ${T} ${c.u} : ${a} ${c.A} et des ${c.B}.`,
        un([`Combien ${de(c.B)} y a-t-il ?`, `Combien ${de(c.B)} ?`, `Trouve le nombre ${de(c.B)}.`, `Aide-toi du schéma : combien ${de(c.B)} ?`]),
      ),
      ...qcmN(b, [T + a, a, b + 10, b - 1]),
      explanation: etapes("Sur le schéma, la barre entière est le tout ; on enlève la partie connue.", `${T} − ${a} = ${b}.`, `Il y a ${b} ${c.B}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, unknown: true }] }),
    };
  }),

  // ★2 — le tout.
  tpl(S, "g02", 2, "Les deux parties mises bout à bout forment le tout.", () => {
    const c = un(DEUX_GROUPES);
    const a = entre(8, 60), b = entre(8, 60), T = a + b;
    return {
      text: phrase(
        `${c.g}, il y a ${a} ${c.A} et ${b} ${c.B}.`,
        un([`Combien ${de(c.u)} y a-t-il en tout ?`, `Combien ${de(c.u)} au total ?`, `Quel est le nombre total ${de(c.u)} ?`, `Aide-toi du schéma : combien ${de(c.u)} en tout ?`]),
      ),
      ...qcmN(T, [Math.abs(a - b), T + 10, T - 10, T + 1]),
      explanation: etapes("Le tout, c'est les deux parties ensemble : on additionne.", `${a} + ${b} = ${T}.`, `Il y a ${T} ${c.u} en tout.`),
      canvas: barre({ total: "?", parts: [{ label: c.A, value: a }, { label: c.B, value: b }] }),
    };
  }),

  // ★2 — quel calcul le schéma montre-t-il ?
  tpl(S, "g03", 2, "Regarde où est le « ? » : c'est une partie ou le tout ?", () => {
    const c = un(DEUX_GROUPES);
    const T = entre(30, 90), a = entre(8, T - 8), b = T - a;
    const tout = Math.random() < 0.4;
    if (tout) {
      const juste = `${a} + ${b}`;
      return {
        text: phrase(
          `${c.g}, il y a ${a} ${c.A} et ${b} ${c.B}. Le schéma montre la situation.`,
          un([`Quel calcul donne le nombre total ${de(c.u)} ?`, `Quel calcul permet de trouver le « ? » ?`, "Quel calcul faut-il faire ?"]),
        ),
        ...qcm(juste, [`${Math.max(a, b)} − ${Math.min(a, b)}`, `${a} × ${b}`, `${a} + ${a}`]),
        explanation: etapes("Le « ? » est sur toute la barre : c'est le tout. On additionne les parties.", `${a} + ${b} = ${T}.`, `Le calcul est ${juste}.`),
        canvas: barre({ total: "?", parts: [{ label: c.A, value: a }, { label: c.B, value: b }] }),
      };
    }
    const juste = `${T} − ${a}`;
    return {
      text: phrase(
        `${c.g}, il y a ${T} ${c.u}, dont ${a} ${c.A}. Les autres sont des ${c.B}.`,
        un([`Quel calcul donne le nombre ${de(c.B)} ?`, "Quel calcul permet de trouver le « ? » du schéma ?", "Quel calcul faut-il faire ?"]),
      ),
      ...qcm(juste, [`${T} + ${a}`, `${a} − ${T}`, T % 2 === 0 ? `${T} ÷ 2` : `${a} + ${a}`]),
      explanation: etapes("Le « ? » est une partie de la barre : on enlève la partie connue du tout.", `${T} − ${a} = ${b}.`, `Le calcul est ${juste}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, unknown: true }] }),
    };
  }),

  // ★2 — ce qui reste (longueurs, durées, argent : avec l'unité).
  tpl(S, "g04", 2, "Le tout moins ce qui est déjà fait donne ce qui reste.", () => {
    const r = un(RESTES);
    const p = perso();
    const T = entre(30, 120), a = entre(8, T - 8), b = T - a;
    const u = ["pages", "longueurs", "tickets", "bulbes", "pièces"].includes(r.u) ? "" : r.u;
    return {
      text: phrase(r.t(T, a, p), r.q),
      ...qcmN(b, [T + a, a, b + 10, b - 1], u),
      explanation: etapes("Sur le schéma, le tout est la barre entière ; on enlève la partie déjà faite.", `${T} − ${a} = ${b}.`, `Il reste ${b}${u ? ` ${u}` : ""}.`),
      canvas: barre({ total: `${T}${u ? ` ${u}` : ""}`, parts: [{ label: "déjà fait", value: a }, { label: "reste", unknown: true }] }),
    };
  }),

  // ★3 — comparer : « de plus », « de moins ».
  tpl(S, "g05", 3, "Fais le schéma des deux quantités : qui en a le plus ?", () => {
    const [A, B] = deux();
    const o = un(["billes", "cartes", "timbres", "images", "perles", "autocollants", "coquillages", "points", "figurines", "euros d'économies"]);
    const a = entre(15, 60), d = entre(4, 20);
    const cas = un(["plus", "moins", "inverse"] as const);
    if (cas === "plus") {
      return {
        text: phrase(`${A.nom} a ${a} ${o}. ${B.nom} en a ${d} de plus.`, un([`Combien ${de(o)} a ${B.nom} ?`, `Combien ${B.nom} en a-t-${B.il} ?`, `Quel est le nombre ${de(o)} de ${B.nom} ?`])),
        ...qcmN(a + d, [a - d, d, a + d + 10]),
        explanation: etapes(`${B.nom} a autant que ${A.nom}, plus ${d}.`, `${a} + ${d} = ${a + d}.`, `${B.nom} a ${a + d} ${o}.`),
        canvas: barre({ title: B.nom, total: "?", parts: [{ label: `comme ${A.nom}`, value: a }, { label: "de plus", value: d }] }),
      };
    }
    if (cas === "moins") {
      return {
        text: phrase(`${A.nom} a ${a} ${o}. ${B.nom} en a ${d} de moins.`, un([`Combien ${de(o)} a ${B.nom} ?`, `Combien ${B.nom} en a-t-${B.il} ?`, `Quel est le nombre ${de(o)} de ${B.nom} ?`])),
        ...qcmN(a - d, [a + d, d, a - d - 10]),
        explanation: etapes(`${B.nom} a ${d} de moins que ${A.nom} : on enlève ${d}.`, `${a} − ${d} = ${a - d}.`, `${B.nom} a ${a - d} ${o}.`),
        canvas: barre({ title: A.nom, total: String(a), parts: [{ label: B.nom, unknown: true }, { label: "de moins", value: d }] }),
      };
    }
    const b = a + d;
    return {
      text: phrase(`${B.nom} a ${b} ${o}. C'est ${d} de plus que ${A.nom}.`, un([`Combien ${de(o)} a ${A.nom} ?`, `Combien ${A.nom} en a-t-${A.il} ?`, `Quel est le nombre ${de(o)} de ${A.nom} ?`])),
      ...qcmN(a, [b + d, d, a + 1]),
      explanation: etapes(`Attention au piège : « de plus » parle de ${B.nom}. ${A.nom} en a MOINS : on soustrait.`, `${b} − ${d} = ${a}.`, `${A.nom} a ${a} ${o}.`),
      canvas: barre({ title: B.nom, total: String(b), parts: [{ label: A.nom, unknown: true }, { label: "de plus", value: d }] }),
    };
  }),

  // ★3 — parts égales et « fois plus ».
  tpl(S, "g06", 3, "Compte les parts égales du schéma, puis partage le tout.", () => {
    const fois = Math.random() < 0.5;
    if (!fois) {
      const pk = un(PACKS);
      const k = entre(3, 8), x = entre(3, 12), T = k * x;
      return {
        text: phrase(
          `${cap(pk.qui)} partage ${T} ${pk.o} en ${k} ${pk.cs} égales.`.replace(/égales\./, pk.g === "f" ? "égales." : "égaux."),
          un([`Combien ${de(pk.o)} dans chaque ${pk.c} ?`, `Combien ${de(pk.o)} par ${pk.c} ?`, "Que vaut une part du schéma ?"]),
        ),
        ...qcmN(x, [T - k, T + k, x + 1, x - 1]),
        explanation: etapes(`Le tout est partagé en ${k} parts égales : on divise.`, `${T} ÷ ${k} = ${x}.`, `Il y en a ${x} par ${pk.c}.`),
        canvas: barre({ total: String(T), parts: parts(k, pk.c) }),
      };
    }
    const [A, B] = deux();
    const o = un(["billes", "cartes", "timbres", "images", "perles", "coquillages", "autocollants", "bonbons"]);
    const k = un([2, 3, 4]), x = entre(3, 15), T = (k + 1) * x;
    const demandeA = Math.random() < 0.6;
    return {
      text: phrase(
        `${B.nom} a ${k} fois plus ${de(o)} que ${A.nom}. Ensemble, ${A.nom} et ${B.nom} en ont ${T}.`,
        `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`,
      ),
      ...qcmN(demandeA ? x : k * x, demandeA ? [Math.floor(T / k), T - k, k * x] : [x, Math.floor(T / k), T - x - 1]),
      explanation: etapes(`${A.nom} : 1 part ; ${B.nom} : ${k} parts. En tout : ${k + 1} parts égales.`, `${T} ÷ ${k + 1} = ${x}${demandeA ? "" : `, puis ${k} × ${x} = ${k * x}`}.`, `${demandeA ? A.nom : B.nom} a ${demandeA ? x : k * x} ${o}.`),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, ...parts(k, B.nom)] }),
    };
  }),

  // ★3 — trois parties.
  tpl(S, "g07", 3, "Enlève les deux parties connues du tout.", () => {
    const c = un(TROIS_GROUPES);
    const a = entre(8, 35), b = entre(8, 35), x = entre(5, 35), T = a + b + x;
    return {
      text: phrase(
        `${c.g}, il y a ${T} ${c.u} : ${a} ${c.A}, ${b} ${c.B} et des ${c.C}.`,
        un([`Combien ${de(c.C)} y a-t-il ?`, `Combien ${de(c.C)} ?`, `Trouve le nombre ${de(c.C)}.`]),
      ),
      ...qcmN(x, [T - a, T - b, a + b, x + 10]),
      explanation: etapes("Le tout est fait de trois parties : on enlève les deux connues.", `${T} − ${a} − ${b} = ${x}.`, `Il y a ${x} ${c.C}.`),
      canvas: barre({ total: String(T), parts: [{ label: c.A, value: a }, { label: c.B, value: b }, { label: c.C, unknown: true }] }),
    };
  }),

  // ★3 — deux achats, ce qu'il reste.
  tpl(S, "g08", 3, "Le budget, c'est la barre entière : enlève les deux achats.", () => {
    const p = perso();
    const [o1, o2] = un(ACHATS);
    const a = entre(4, 25), b = entre(3, 20), x = entre(2, 30), T = a + b + x;
    return {
      text: phrase(
        `${p.nom} a ${T} €. ${cap(p.il)} achète ${o1} à ${a} € et ${o2} à ${b} €.`,
        un(["Combien d'argent lui reste-t-il ?", "Combien lui reste-t-il ?", "Quelle somme lui reste-t-il ?"]),
      ),
      ...qcmN(x, [T - a, T - b, a + b, x + 10], "€"),
      explanation: etapes("La barre entière est l'argent de départ ; les deux achats en sont deux parties.", `${T} − ${a} − ${b} = ${x}.`, `Il lui reste ${x} €.`),
      canvas: barre({ total: `${T} €`, parts: [{ label: o1.replace(/^(un|une|des) /, ""), value: a }, { label: o2.replace(/^(un|une|des) /, ""), value: b }, { label: "reste", unknown: true }] }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_MOTIF ═════════════════════════ */

const M = "algebre_motif";
type Monde = { intro: (p: Perso) => string; P: string; u: string; q: (n: number, p: Perso) => string; uq?: string };
const CROISSANCE: Monde[] = [
  { intro: (p) => `${p.nom} construit des tours de cubes.`, P: "Étape", u: "cubes", q: (n) => `Combien de cubes à l'étape ${n} ?` },
  { intro: () => "Avec des allumettes, on fabrique des figures qui grandissent.", P: "Figure", u: "allumettes", q: (n) => `Combien d'allumettes pour la figure ${n} ?` },
  { intro: () => "Une plante grimpante pousse le long du mur de l'école.", P: "Semaine", u: "cm", q: (n) => `Quelle hauteur aura-t-elle la semaine ${n} ?`, uq: "cm" },
  { intro: (p) => `${p.nom} met de l'argent dans sa tirelire chaque semaine.`, P: "Semaine", u: "€", q: (n, p) => `Combien aura-t-${p.il} la semaine ${n} ?`, uq: "€" },
  { intro: () => "Dans le jeu vidéo, chaque niveau rapporte plus de pièces.", P: "Niveau", u: "pièces", q: (n) => `Combien de pièces au niveau ${n} ?` },
  { intro: (p) => `${p.nom} s'entraîne à sauter à la corde.`, P: "Jour", u: "sauts", q: (n, p) => `Combien de sauts fera-t-${p.il} le jour ${n} ?` },
  { intro: () => "Le boulanger range des croissants en rangées de plus en plus longues.", P: "Rangée", u: "croissants", q: (n) => `Combien de croissants dans la rangée ${n} ?` },
  { intro: () => "Au théâtre, chaque rangée a plus de sièges que la précédente.", P: "Rangée", u: "sièges", q: (n) => `Combien de sièges dans la rangée ${n} ?` },
  { intro: () => "Un escargot grimpe le long d'un arrosoir.", P: "Minute", u: "cm", q: (n) => `À quelle hauteur sera-t-il à la minute ${n} ?`, uq: "cm" },
  { intro: () => "Au club de judo, des élèves s'inscrivent chaque mois.", P: "Mois", u: "inscrits", q: (n) => `Combien d'inscrits au mois ${n} ?` },
  { intro: (p) => `${p.nom} colle des timbres dans son album.`, P: "Page", u: "timbres", q: (n) => `Combien de timbres sur la page ${n} ?` },
  { intro: () => "Le jardinier plante des rangées de tulipes de plus en plus longues.", P: "Rangée", u: "tulipes", q: (n) => `Combien de tulipes dans la rangée ${n} ?` },
  { intro: () => "Dans le bus, des passagers montent à chaque arrêt et personne ne descend.", P: "Arrêt", u: "passagers", q: (n) => `Combien de passagers après l'arrêt ${n} ?` },
  { intro: () => "La pâtissière empile des macarons en tours.", P: "Tour", u: "macarons", q: (n) => `Combien de macarons dans la tour ${n} ?` },
  { intro: (p) => `${p.nom} lit un peu plus de pages chaque jour.`, P: "Jour", u: "pages", q: (n, p) => `Combien de pages lira-t-${p.il} le jour ${n} ?` },
  { intro: (p) => `Avec des perles, ${p.nom} fabrique des bracelets de plus en plus longs.`, P: "Bracelet", u: "perles", q: (n) => `Combien de perles pour le bracelet ${n} ?` },
];
const DECROISSANCE: Monde[] = [
  { intro: () => "Pendant la canicule, l'eau du bassin s'évapore.", P: "Jour", u: "cm", q: (n) => `Quelle hauteur d'eau restera-t-il le jour ${n} ?`, uq: "cm" },
  { intro: (p) => `${p.nom} mange des bonbons de son paquet chaque jour.`, P: "Jour", u: "bonbons", q: (n) => `Combien de bonbons restera-t-il le jour ${n} ?` },
  { intro: () => "À la boulangerie, on note le stock de baguettes plusieurs fois dans la matinée.", P: "Relevé", u: "baguettes", q: (n) => `Combien de baguettes au relevé ${n} ?` },
  { intro: () => "Le compte à rebours de la fusée défile.", P: "Écran", u: "secondes", q: (n) => `Combien de secondes sur l'écran ${n} ?` },
  { intro: () => "Le pirate dépense des pièces d'or à chaque escale.", P: "Escale", u: "pièces d'or", q: (n) => `Combien de pièces d'or lui restera-t-il à l'escale ${n} ?` },
  { intro: (p) => `${p.nom} rembourse son grand frère chaque semaine.`, P: "Semaine", u: "€", q: (n, p) => `Combien devra-t-${p.il} encore la semaine ${n} ?`, uq: "€" },
  { intro: () => "Une grande bougie fond petit à petit.", P: "Heure", u: "cm", q: (n) => `Quelle sera sa hauteur à l'heure ${n} ?`, uq: "cm" },
  { intro: () => "À la papeterie, le stock de cahiers baisse chaque jour de la rentrée.", P: "Jour", u: "cahiers", q: (n) => `Combien de cahiers restera-t-il le jour ${n} ?` },
  { intro: () => "La neige fond sur le toit du chalet.", P: "Jour", u: "cm", q: (n) => `Quelle épaisseur de neige restera-t-il le jour ${n} ?`, uq: "cm" },
  { intro: () => "La batterie du robot baisse à chaque mission.", P: "Mission", u: "points d'énergie", q: (n) => `Combien de points d'énergie restera-t-il à la mission ${n} ?` },
  { intro: () => "Le réservoir d'eau du jardin se vide un peu à chaque arrosage.", P: "Arrosage", u: "litres", q: (n) => `Combien de litres restera-t-il à l'arrosage ${n} ?` },
];
const ligne = (m: Monde, t: number[]) => t.map((v, i) => `${i === 0 ? m.P : m.P.toLowerCase()} ${i + 1} : ${v} ${m.u}`).join(" ; ") + ".";
const etiquettes = (m: Monde, n: number) => Array.from({ length: n }, (_, i) => `${m.P} ${i + 1}`);

const motif: TutorBankItemV4[] = [
  // ★2 — le terme suivant d'un motif qui grandit.
  tpl(M, "g01", 2, "Cherche de combien on augmente à chaque fois.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(2, 9), a = entre(1, 12);
    const n = un([3, 4]);
    const t = Array.from({ length: n }, (_, i) => a + i * r);
    const x = a + n * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), m.q(n + 1, p)),
      ...qcmN(x, [x + 1, t[n - 1] + 1, t[n - 1] * 2, x - 1], m.uq ?? ""),
      explanation: etapes(`On cherche la règle : à chaque fois, on ajoute ${r}.`, `${t[n - 1]} + ${r} = ${x}.`, `Il y en aura ${x}.`),
      canvas: barres(etiquettes(m, n), t),
    };
  }),

  // ★2 — la suite de nombres : nombre suivant ou nombre manquant.
  tpl(M, "g02", 2, "Trouve l'écart entre deux nombres voisins : il ne change pas.", () => {
    const p = perso();
    const monte = Math.random() < 0.7;
    const r = un([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 20, 25]);
    const a = monte ? entre(1, 40) : entre(5 * r + 5, 5 * r + 60);
    const t = Array.from({ length: 5 }, (_, i) => (monte ? a + i * r : a - i * r));
    const trou = Math.random() < 0.4 ? entre(1, 3) : 4;
    const x = t[trou];
    const vis = t.map((v, i) => (i === trou ? "?" : v));
    const lead = un(["Observe la suite :", "Voici le début d'une suite de nombres :", "Sur la frise du couloir, on lit :", "Le robot affiche :", `${p.nom} écrit :`, "Au jeu du furet, les élèves disent :"]);
    return {
      text: phrase(
        lead,
        trou === 4 ? `${vis.slice(0, 4).join(" ; ")} ; …` : `${vis.join(" ; ")}.`,
        trou === 4 ? un(["Quel est le nombre suivant ?", "Quel nombre vient ensuite ?", "Continue la suite : quel nombre écris-tu ?"]) : un(["Quel nombre manque ?", "Quel nombre remplace le « ? » ?", "Retrouve le nombre effacé."]),
      ),
      ...qcmN(x, [monte ? x + 1 : x - 1, monte ? x - r + 1 : x + r - 1, monte ? x + r : x - r, x + 2]),
      explanation: etapes(`On cherche l'écart : on ${monte ? "ajoute" : "enlève"} ${r} à chaque fois.`, `${t[trou - 1]} ${monte ? "+" : "−"} ${r} = ${x}.`, `Le nombre est ${x}.`),
      canvas: frise(vis, trou),
    };
  }),

  // ★2 — de combien le motif augmente-t-il ?
  tpl(M, "g03", 2, "Compare deux étapes qui se suivent.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(2, 9), a = entre(r + 1, 15);
    const t = [a, a + r, a + 2 * r];
    return {
      text: phrase(
        m.intro(p),
        ligne(m, t),
        un([`De combien augmente-t-on à chaque ${m.P.toLowerCase()} ?`, "Quelle est la règle : on ajoute combien à chaque fois ?", "Combien en ajoute-t-on à chaque fois ?"]),
      ),
      ...qcmN(r, [a, 2 * r, r + 1, t[2]]),
      explanation: etapes("On compare deux étapes qui se suivent.", `${t[1]} − ${t[0]} = ${r} et ${t[2]} − ${t[1]} = ${r}.`, `On ajoute ${r} à chaque fois.`),
      canvas: barres(etiquettes(m, 3), t),
    };
  }),

  // ★3 — une étape lointaine.
  tpl(M, "g04", 3, "Compte combien de fois on ajoute l'écart depuis l'étape 1.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const r = entre(2, 8), a = entre(r + 1, 15);
    const t = [a, a + r, a + 2 * r];
    const n = entre(6, 10);
    const x = a + (n - 1) * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), un(["La règle ne change pas.", "On continue de la même façon.", ""]), m.q(n, p)),
      ...qcmN(x, [a + n * r, n * r, t[2] + r, x + 1], m.uq ?? ""),
      explanation: etapes(`On ajoute ${r} à chaque fois. De l'étape 1 à l'étape ${n}, on ajoute ${n - 1} fois ${r}.`, `${a} + ${n - 1} × ${r} = ${a} + ${(n - 1) * r} = ${x}.`, `Il y en aura ${x}.`),
      canvas: barres(etiquettes(m, 3), t),
    };
  }),

  // ★3 — quelle est la règle ? (+ ou ×2 : 3 ; 6 ; 12 n'est pas « + 3 »).
  tpl(M, "g05", 3, "Vérifie ta règle sur TOUS les nombres, pas seulement les deux premiers.", () => {
    const m = un(CROISSANCE);
    const p = perso();
    const double = Math.random() < 0.45;
    const a = double ? entre(2, 6) : entre(2, 12);
    const r = double ? a : entre(2, 9);
    const t = double ? [a, 2 * a, 4 * a, 8 * a] : [a, a + r, a + 2 * r, a + 3 * r];
    const R = {
      plus: `On ajoute ${r} à chaque fois.`,
      double: "On multiplie par 2 à chaque fois.",
      plus1: `On ajoute ${r + 1} à chaque fois.`,
      plusA: `On ajoute ${a + 2} à chaque fois.`,
      triple: "On multiplie par 3 à chaque fois.",
    };
    const juste = double ? R.double : R.plus;
    return {
      text: phrase(m.intro(p), ligne(m, t), un(["Quelle est la règle ?", "Quelle règle permet de passer d'un nombre au suivant ?", "Comment passe-t-on d'une étape à la suivante ?"])),
      ...qcm(juste, double ? [R.plus, R.triple, R.plusA] : [R.double, R.plus1, R.triple]),
      explanation: etapes(
        "On teste la règle sur chaque passage.",
        double ? `${t[0]} × 2 = ${t[1]}, ${t[1]} × 2 = ${t[2]}, ${t[2]} × 2 = ${t[3]} ; « + ${a} » marche seulement au début.` : `${t[0]} + ${r} = ${t[1]}, ${t[1]} + ${r} = ${t[2]}, ${t[2]} + ${r} = ${t[3]}.`,
        juste,
      ),
      canvas: barres(etiquettes(m, 4), t),
    };
  }),

  // ★3 — un motif qui diminue.
  tpl(M, "g06", 3, "Cherche ce qu'on enlève à chaque fois.", () => {
    const m = un(DECROISSANCE);
    const p = perso();
    const r = entre(2, 9);
    const a = entre(8 * r + 5, 8 * r + 40);
    const t = [a, a - r, a - 2 * r, a - 3 * r];
    const loin = Math.random() < 0.5;
    const n = loin ? entre(6, 8) : 5;
    const x = a - (n - 1) * r;
    return {
      text: phrase(m.intro(p), ligne(m, t), m.q(n, p)),
      ...qcmN(x, [a - n * r, t[3] + r, loin ? t[3] - r : x - 1, x + 1], m.uq ?? ""),
      explanation: etapes(`On enlève ${r} à chaque fois.`, loin ? `${a} − ${n - 1} × ${r} = ${a} − ${(n - 1) * r} = ${x}.` : `${t[3]} − ${r} = ${x}.`, `Il en restera ${x}.`),
      canvas: barres(etiquettes(m, 4), t),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_RELATION ═════════════════════════ */

const R = "algebre_relation";
const RELS = [
  { art: "Un", a: "vélo", as: "vélos", v: "a", b: "roues", k: [2] },
  { art: "Un", a: "tricycle", as: "tricycles", v: "a", b: "roues", k: [3] },
  { art: "Une", a: "voiture", as: "voitures", v: "a", b: "roues", k: [4] },
  { art: "Une", a: "araignée", as: "araignées", v: "a", b: "pattes", k: [8] },
  { art: "Un", a: "chat", as: "chats", v: "a", b: "pattes", k: [4] },
  { art: "Une", a: "fourmi", as: "fourmis", v: "a", b: "pattes", k: [6] },
  { art: "Une", a: "étoile de mer", as: "étoiles de mer", v: "a", b: "bras", k: [5] },
  { art: "Une", a: "pieuvre", as: "pieuvres", v: "a", b: "bras", k: [8] },
  { art: "Une", a: "main", as: "mains", v: "a", b: "doigts", k: [5] },
  { art: "Une", a: "semaine", as: "semaines", v: "compte", b: "jours", k: [7] },
  { art: "Une", a: "boîte d'œufs", as: "boîtes d'œufs", v: "contient", b: "œufs", k: [6, 12] },
  { art: "Une", a: "équipe de basket", as: "équipes de basket", v: "compte", b: "joueurs", k: [5] },
  { art: "Une", a: "table de la cantine", as: "tables de la cantine", v: "a", b: "chaises", k: [4, 6, 8] },
  { art: "Un", a: "tube de balles", as: "tubes de balles", v: "contient", b: "balles de tennis", k: [3, 4] },
  { art: "Un", a: "carton de jus", as: "cartons de jus", v: "contient", b: "bouteilles", k: [6, 8] },
  { art: "Une", a: "rangée du potager", as: "rangées du potager", v: "compte", b: "salades", k: [6, 7, 9] },
  { art: "Un", a: "bouquet de la fleuriste", as: "bouquets de la fleuriste", v: "contient", b: "roses", k: [5, 7, 9] },
  { art: "Une", a: "page de l'album photo", as: "pages de l'album photo", v: "contient", b: "photos", k: [4, 6] },
  { art: "Une", a: "vache", as: "vaches", v: "a", b: "pattes", k: [4] },
  { art: "Un", a: "paquet de mouchoirs", as: "paquets de mouchoirs", v: "contient", b: "mouchoirs", k: [9, 10] },
];
const AFFINES = [
  { intro: "On aligne des tables carrées bout à bout et on place une chaise de chaque côté libre.", n1: "table", n: "tables", r: "chaises", k: 2, c: 2 },
  { intro: "Avec des allumettes, on fabrique des carrés collés en ligne.", n1: "carré", n: "carrés", r: "allumettes", k: 3, c: 1 },
  { intro: "Avec des allumettes, on construit des maisons collées en ligne.", n1: "maison", n: "maisons", r: "allumettes", k: 5, c: 1 },
  { intro: "Avec des allumettes, on fabrique une bande de triangles, pointe en haut puis pointe en bas.", n1: "triangle", n: "triangles", r: "allumettes", k: 2, c: 1 },
  { intro: "Un petit train a une locomotive et des wagons. On compte toutes les roues.", n1: "wagon", n: "wagons", r: "roues", k: 4, c: 6 },
  { intro: "Au restaurant, on assemble des tables rectangulaires bout à bout pour un grand repas.", n1: "table", n: "tables", r: "places", k: 4, c: 2 },
  { intro: "Le loueur de vélos fait payer le casque, puis chaque heure de location.", n1: "heure", n: "heures", r: "euros", k: 3, c: 4 },
  { intro: "Pour une chenille en perles, on enfile une tête puis des anneaux.", n1: "anneau", n: "anneaux", r: "perles", k: 2, c: 3 },
  { intro: "Le taxi compte un prix de départ, puis chaque kilomètre.", n1: "kilomètre", n: "kilomètres", r: "euros", k: 2, c: 3 },
  { intro: "Le carreleur entoure une ligne de carreaux rouges avec des carreaux blancs.", n1: "carreau rouge", n: "carreaux rouges", r: "carreaux blancs", k: 2, c: 6 },
  { intro: "Au club de natation, on paie l'inscription, puis chaque mois.", n1: "mois", n: "mois", r: "euros", k: 8, c: 12 },
  { intro: "Avec des allumettes, on fabrique des pentagones collés en ligne.", n1: "pentagone", n: "pentagones", r: "allumettes", k: 4, c: 1 },
];
const qte = (i: number, un1: string, des: string) => `${i} ${i === 1 ? un1 : des}`;
const paires = (af: (typeof AFFINES)[number], ns: number[]) => ns.map((i) => `${qte(i, af.n1, af.n)} : ${af.k * i + af.c} ${af.r}`).join(" ; ") + ".";
const tabAffine = (af: (typeof AFFINES)[number], ns: number[], q: number | string) =>
  tableau({ coin: cap(af.n), headers: [...ns, q], rows: [{ label: cap(af.r), values: [...ns.map((i) => af.k * i + af.c), "?"] }], cell: { row: 0, col: ns.length } });

const relation: TutorBankItemV4[] = [
  // ★2 — chaque … a k … : combien pour n ?
  tpl(R, "g01", 2, "Pour un, il y en a k ; pour n, on multiplie.", () => {
    const re = un(RELS);
    const k = un(re.k), n = entre(3, 10), x = k * n;
    return {
      text: phrase(
        un(["", `Le nombre ${de(re.b)} dépend du nombre ${de(re.as)}.`]),
        `${re.art} ${re.a} ${re.v} ${k} ${re.b}.`,
        un([`Combien ${de(re.b)} pour ${n} ${re.as} ?`, `Combien y a-t-il ${de(re.b)} pour ${n} ${re.as} ?`, `Avec ${n} ${re.as}, combien ${de(re.b)} en tout ?`, `Et pour ${n} ${re.as} ?`]),
      ),
      ...qcmN(x, [k + n, x + k, x - k, x + 1]),
      explanation: etapes(`Pour 1, il y en a ${k} ; pour ${n}, il y en a ${n} fois plus.`, `${n} × ${k} = ${x}.`, `Il y a ${x} ${re.b}.`),
      canvas: tableau({ coin: cap(re.as), headers: [1, n], rows: [{ label: cap(re.b), values: [k, "?"] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★2 — le tableau à compléter.
  tpl(R, "g02", 2, "Cherche par combien on multiplie le nombre du haut.", () => {
    const re = un(RELS);
    const k = un(re.k);
    const ns = un([[1, 2, 3], [2, 3, 4], [1, 3, 5], [2, 4, 5]]);
    const n = un([6, 7, 8, 9, 10].filter((v) => !ns.includes(v)));
    const x = k * n;
    const der = ns[ns.length - 1];
    return {
      text: phrase(
        `Le nombre ${de(re.b)} dépend du nombre ${de(re.as)}.`,
        ns.map((i) => `${qte(i, re.a, re.as)} : ${k * i} ${re.b}`).join(" ; ") + ".",
        un([`Combien ${de(re.b)} pour ${n} ${re.as} ?`, `Complète le tableau : combien ${de(re.b)} pour ${n} ${re.as} ?`, "Quel nombre va dans la case « ? » ?"]),
      ),
      ...qcmN(x, [k * der + (n - der), x + k, x - k, k + n]),
      explanation: etapes(`Pour 1, il y a ${k} ${re.b} : on multiplie le nombre ${de(re.as)} par ${k}.`, `${n} × ${k} = ${x}.`, `La case « ? » vaut ${x}.`),
      canvas: tableau({ coin: cap(re.as), headers: [...ns, n], rows: [{ label: cap(re.b), values: [...ns.map((i) => k * i), "?"] }], cell: { row: 0, col: ns.length } }),
    };
  }),

  // ★2 — quelle phrase décrit la relation ?
  tpl(R, "g03", 2, "Teste la phrase sur chaque colonne du tableau.", () => {
    const re = un(RELS);
    const k = un(re.k);
    const ns = un([[3, 4, 6], [3, 5, 7], [4, 5, 8], [3, 6, 10]]);
    const J = `Le nombre ${de(re.b)} est ${k} fois le nombre ${de(re.as)}.`;
    return {
      text: phrase(
        ns.map((i) => `${qte(i, re.a, re.as)} : ${k * i} ${re.b}`).join(" ; ") + ".",
        un(["Quelle phrase décrit la relation ?", "Quelle règle relie les deux nombres ?", `Comment trouver le nombre ${de(re.b)} ?`]),
      ),
      ...qcm(J, [
        `On ajoute ${k} au nombre ${de(re.as)}.`,
        `Le nombre ${de(re.b)} est ${k + 1} fois le nombre ${de(re.as)}.`,
        `Le nombre ${de(re.as)} est ${k} fois le nombre ${de(re.b)}.`,
      ]),
      explanation: etapes("On vérifie la phrase sur toutes les colonnes.", ns.map((i) => `${i} × ${k} = ${k * i}`).join(" ; ") + ".", J),
      canvas: tableau({ coin: cap(re.as), headers: ns, rows: [{ label: cap(re.b), values: ns.map((i) => k * i) }] }),
    };
  }),

  // ★3 — une relation qui AJOUTE (âges, scores, cubes, places de cinéma).
  tpl(R, "g04", 3, "L'écart reste le même : on ajoute (ou on enlève) toujours le même nombre.", () => {
    const [A, B] = deux();
    const d = entre(2, 9);
    const x1 = entre(4, 9), x2 = x1 + entre(2, 4), x = x2 + entre(3, 15);
    const inverse = Math.random() < 0.35;
    const ctx = un([
      { t: `${A.nom} a ${d} ans de plus que ${B.nom}.`, q: inverse ? `Quand ${A.nom} aura ${x + d} ans, quel âge aura ${B.nom} ?` : `Quand ${B.nom} aura ${x} ans, quel âge aura ${A.nom} ?`, la: `Âge de ${A.nom}`, lb: `Âge de ${B.nom}`, u: "ans" },
      { t: `La tour de ${A.nom} a toujours ${d} cubes de plus que celle de ${B.nom}.`, q: inverse ? `Quand la tour de ${A.nom} a ${x + d} cubes, combien de cubes a celle de ${B.nom} ?` : `Quand la tour de ${B.nom} a ${x} cubes, combien de cubes a celle de ${A.nom} ?`, la: `Tour de ${A.nom}`, lb: `Tour de ${B.nom}`, u: "" },
      { t: `Au cinéma, une place adulte coûte toujours ${d} € de plus qu'une place enfant.`, q: inverse ? `Si la place adulte coûte ${x + d} €, combien coûte la place enfant ?` : `Si la place enfant coûte ${x} €, combien coûte la place adulte ?`, la: "Place adulte (€)", lb: "Place enfant (€)", u: "€" },
      { t: `Aux fléchettes, ${A.nom} marque toujours ${d} points de plus que ${B.nom}.`, q: inverse ? `À une partie, ${A.nom} marque ${x + d} points. Combien en marque ${B.nom} ?` : `À une partie, ${B.nom} marque ${x} points. Combien en marque ${A.nom} ?`, la: `Points de ${A.nom}`, lb: `Points de ${B.nom}`, u: "" },
      { t: `Dans l'immeuble de ${A.nom}, l'ascenseur B monte toujours ${d} étages plus haut que l'ascenseur A.`, q: inverse ? `L'ascenseur B s'arrête au ${x + d}e étage. À quel étage monte l'ascenseur A ?` : `L'ascenseur A monte au ${x}e étage. À quel étage monte l'ascenseur B ?`, la: "Ascenseur B", lb: "Ascenseur A", u: "" },
    ]);
    const juste = inverse ? x : x + d;
    return {
      text: phrase(ctx.t, ctx.q),
      ...qcmN(juste, inverse ? [x + 2 * d, x + d + 1, d * (x + d)] : [x - d, x, d * x, x + 2 * d], ctx.u === "€" || ctx.u === "ans" ? ctx.u : ""),
      explanation: etapes(`L'écart est toujours de ${d} : on ${inverse ? "enlève" : "ajoute"} ${d}, on ne multiplie pas.`, inverse ? `${x + d} − ${d} = ${x}.` : `${x} + ${d} = ${x + d}.`, `La réponse est ${juste}${ctx.u ? ` ${ctx.u}` : ""}.`),
      canvas: tableau({ coin: ctx.lb, headers: [x1, x2, inverse ? "?" : x], rows: [{ label: ctx.la, values: [x1 + d, x2 + d, inverse ? x + d : "?"] }], cell: { row: 0, col: 2 } }),
    };
  }),

  // ★3 — la relation à l'envers : combien de vélos pour 18 roues ?
  tpl(R, "g05", 3, "Pour revenir au nombre d'objets, on divise.", () => {
    const re = un(RELS);
    const k = un(re.k), n = entre(3, 10), T = k * n;
    return {
      text: phrase(
        `${re.art} ${re.a} ${re.v} ${k} ${re.b}.`,
        un([`Combien ${de(re.as)} pour ${T} ${re.b} ?`, `On compte ${T} ${re.b}. Combien y a-t-il ${de(re.as)} ?`, `Avec ${T} ${re.b}, combien ${de(re.as)} ?`]),
      ),
      ...qcmN(n, [T - k, T + k, k, n + 1]),
      explanation: etapes(`Pour 1, il y a ${k} ${re.b} : on cherche combien de fois ${k} dans ${T}.`, `${T} ÷ ${k} = ${n}.`, `Il y a ${n} ${re.as}.`),
      canvas: tableau({ coin: cap(re.as), headers: [1, "?"], rows: [{ label: cap(re.b), values: [k, T] }], cell: { row: 0, col: 1 } }),
    };
  }),

  // ★3 — tables et chaises : ce n'est PAS proportionnel.
  tpl(R, "g06", 3, "Regarde de combien on augmente à chaque fois, sans multiplier le premier nombre.", () => {
    const af = un(AFFINES);
    const n = entre(5, 7);
    const x = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Combien ${de(af.r)} pour ${n} ${af.n} ?`, `Et avec ${n} ${af.n}, combien ${de(af.r)} ?`, `Combien faut-il ${de(af.r)} pour ${n} ${af.n} ?`])),
      ...qcmN(x, [n * (af.k + af.c), af.k * n, af.k * 4 + af.c, x + 1], af.r === "euros" ? "€" : ""),
      explanation: etapes(`On ajoute ${af.k} à chaque ${af.n1} de plus. Attention : ce n'est pas ${n} fois le nombre pour 1.`, `${af.k + af.c} + ${n - 1} × ${af.k} = ${x}.`, `Il en faut ${x}.`),
      canvas: tabAffine(af, [1, 2, 3], n),
    };
  }),

  // ★4 — quelle formule ?
  tpl(R, "g07", 4, "Teste chaque formule sur deux colonnes au moins.", () => {
    const af = un(AFFINES.filter((a) => a.c > 0));
    const ns = [1, 2, 3, 4];
    const nb = (s: string) => `nombre ${de(s)}`;
    const J = `${cap(nb(af.r))} = ${af.k} × ${nb(af.n)} + ${af.c}`;
    return {
      text: phrase(af.intro, paires(af, ns), un([`Quelle formule donne le ${nb(af.r)} ?`, `Quelle règle permet de calculer le ${nb(af.r)} ?`, "Quelle formule marche pour toutes les colonnes ?"])),
      ...qcm(J, [
        `${cap(nb(af.r))} = ${af.k + af.c} × ${nb(af.n)}`,
        `${cap(nb(af.r))} = ${nb(af.n)} + ${af.k + af.c - 1}`,
        `${cap(nb(af.r))} = ${af.k} × ${nb(af.n)}`,
      ]),
      explanation: etapes(`On ajoute ${af.k} à chaque fois, et il y a ${af.c} de plus au départ.`, ns.map((i) => `${af.k} × ${i} + ${af.c} = ${af.k * i + af.c}`).join(" ; ") + ".", J + "."),
      canvas: tableau({ coin: cap(af.n), headers: ns, rows: [{ label: cap(af.r), values: ns.map((i) => af.k * i + af.c) }] }),
    };
  }),

  // ★4 — pour un grand nombre.
  tpl(R, "g08", 4, "Trouve d'abord la règle, puis applique-la au grand nombre.", () => {
    const af = un(AFFINES);
    const n = un([10, 12, 15, 20, 25, 30]);
    const x = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Combien ${de(af.r)} pour ${n} ${af.n} ?`, `On en met ${n}. Combien ${de(af.r)} ?`, `Avec ${n} ${af.n}, combien faut-il ${de(af.r)} ?`])),
      ...qcmN(x, [n * (af.k + af.c), af.k * n, x + af.k, x - af.k], af.r === "euros" ? "€" : ""),
      explanation: etapes(`Règle : ${af.k} × le nombre ${de(af.n)}, plus ${af.c}.`, `${af.k} × ${n} + ${af.c} = ${af.k * n} + ${af.c} = ${x}.`, `Il en faut ${x}.`),
      canvas: tabAffine(af, [1, 2, 3], n),
    };
  }),

  // ★4 — à l'envers : combien de tables pour 42 chaises ?
  tpl(R, "g09", 4, "Enlève d'abord ce qu'il y a en plus au départ, puis divise.", () => {
    const af = un(AFFINES);
    const n = entre(6, 15);
    const T = af.k * n + af.c;
    return {
      text: phrase(af.intro, paires(af, [1, 2, 3]), un([`Il y a ${T} ${af.r}. Combien ${de(af.n)} ?`, `Avec ${T} ${af.r}, combien ${de(af.n)} a-t-on ?`, `On compte ${T} ${af.r}. Combien y a-t-il ${de(af.n)} ?`])),
      ...qcmN(n, [T - af.c, Math.round(T / af.k), Math.round(T / (af.k + af.c)), n + 1]),
      explanation: etapes(`Règle : ${af.k} × le nombre ${de(af.n)} + ${af.c}. On la défait à l'envers.`, `${T} − ${af.c} = ${T - af.c}, puis ${T - af.c} ÷ ${af.k} = ${n}.`, `Il y a ${n} ${af.n}.`),
      canvas: tableau({ coin: cap(af.n), headers: [1, 2, 3, "?"], rows: [{ label: cap(af.r), values: [1, 2, 3].map((i) => af.k * i + af.c).concat([T]) }], cell: { row: 0, col: 3 } }),
    };
  }),
];

/* ═════════════════════════ ALGEBRE_DEFI ═════════════════════════ */

const D = "algebre_defi";
const OBJ_DEFI = ["billes", "cartes", "timbres", "images", "perles", "autocollants", "coquillages", "points", "bonbons", "livres", "figurines", "euros"];
const ARTICLES = [
  { un: "un cahier", des: "cahiers", autre: "une gomme" },
  { un: "un croissant", des: "croissants", autre: "une baguette" },
  { un: "un ticket de manège", des: "tickets de manège", autre: "une barbe à papa" },
  { un: "un paquet de cartes", des: "paquets de cartes", autre: "un classeur" },
  { un: "un pot de peinture", des: "pots de peinture", autre: "un pinceau" },
  { un: "un ballon", des: "ballons", autre: "une pompe" },
  { un: "un jus de fruits", des: "jus de fruits", autre: "un sandwich" },
  { un: "un livre de poche", des: "livres de poche", autre: "un marque-page" },
  { un: "un sachet de graines", des: "sachets de graines", autre: "un arrosoir" },
  { un: "une place de piscine", des: "places de piscine", autre: "un bonnet de bain" },
  { un: "un tube de colle", des: "tubes de colle", autre: "une paire de ciseaux" },
  { un: "une crêpe", des: "crêpes", autre: "un chocolat chaud" },
];
const SUITE_CTX = [
  { t: (s: number) => `On ouvre un livre : la somme des numéros de trois pages qui se suivent vaut ${s}.`, q: "Quel est le numéro de la première de ces pages ?" },
  { t: (s: number) => `Trois coureurs ont des dossards qui se suivent. La somme de leurs numéros vaut ${s}.`, q: "Quel est le plus petit numéro ?" },
  { t: (s: number) => `Trois jours qui se suivent dans le calendrier : la somme de leurs dates vaut ${s}.`, q: "Quelle est la date du premier jour ?" },
  { t: (s: number) => `Trois casiers qui se suivent au vestiaire : la somme de leurs numéros vaut ${s}.`, q: "Quel est le numéro du premier casier ?" },
  { t: (s: number) => `Au cinéma, trois amis ont des sièges numérotés qui se suivent. La somme des numéros vaut ${s}.`, q: "Quel est le plus petit numéro de siège ?" },
  { t: (s: number) => `Trois nombres entiers se suivent. Leur somme vaut ${s}.`, q: "Quel est le plus petit de ces nombres ?" },
  { t: (s: number) => `Trois chambres d'hôtel qui se suivent ont des numéros dont la somme vaut ${s}.`, q: "Quel est le numéro de la première chambre ?" },
];

const defi: TutorBankItemV4[] = [
  // ★4 — le nombre mystère en deux opérations, dans les deux ordres.
  tpl(D, "g01", 4, "Repars du résultat et défais les opérations, la dernière en premier.", () => {
    const P = perso();
    const lead = un(["Défi :", `Défi de ${P.nom} :`, "Le magicien dit :", "Le robot calculateur affiche une devinette :", "Énigme du jour :"]);
    const k = entre(2, 6), b = entre(2, 12), x = entre(3, 15);
    const ordre = un(["fois_plus", "fois_moins", "plus_fois"] as const);
    let txt = "", r = 0, faux: number[] = [], calc = "", canvas: CanvasFigure;
    if (ordre === "fois_plus") {
      r = k * x + b;
      txt = `je pense à un nombre, je le multiplie par ${k}, puis j'ajoute ${b}. J'obtiens ${r}.`;
      faux = [r - b, Math.floor(r / k) - b, Math.floor((r + b) / k), x + 1];
      calc = `${r} − ${b} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`;
      canvas = barre({ title: `? × ${k} + ${b} = ${r}`, total: String(r), parts: [...parts(k, "?"), { label: `+ ${b}`, value: b }] });
    } else if (ordre === "fois_moins") {
      r = k * x - b;
      txt = `je pense à un nombre, je le multiplie par ${k}, puis j'enlève ${b}. J'obtiens ${r}.`;
      faux = [r + b, Math.floor(r / k) + b, Math.floor(Math.max(1, r - b) / k), x + 1];
      calc = `${r} + ${b} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`;
      canvas = barre({ title: `? × ${k} − ${b} = ${r}`, total: String(k * x), parts: [{ label: "résultat", value: r }, { label: `− ${b}`, value: b }] });
    } else {
      r = (x + b) * k;
      txt = `je pense à un nombre, je lui ajoute ${b}, puis je multiplie par ${k}. J'obtiens ${r}.`;
      faux = [Math.floor((r - b) / k), r - b, x + b, x + 1];
      calc = `${r} ÷ ${k} = ${x + b}, puis ${x + b} − ${b} = ${x}.`;
      canvas = barre({ title: `(? + ${b}) × ${k} = ${r}`, total: String(r), parts: parts(k, `? + ${b}`) });
    }
    return {
      text: phrase(lead, txt, un(["Quel est ce nombre ?", "Quel nombre ai-je choisi ?", "Retrouve le nombre de départ."])),
      ...qcmN(x, faux),
      explanation: etapes("On défait les opérations en partant de la fin, chacune avec son opération inverse.", calc, `Le nombre est ${x}.`),
      canvas,
    };
  }),

  // ★4 — à eux deux, et l'un a d de plus.
  tpl(D, "g02", 4, "Enlève d'abord ce que l'un a en plus : il reste deux parts égales.", () => {
    const [A, B] = deux();
    const o = un(OBJ_DEFI);
    const x = entre(8, 40), d = entre(2, 16), T = 2 * x + d;
    const demandeA = Math.random() < 0.6;
    const juste = demandeA ? x : x + d;
    return {
      text: phrase(
        `${A.nom} et ${B.nom} ont ${T} ${o} à eux deux. ${B.nom} en a ${d} de plus que ${A.nom}.`,
        `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`,
      ),
      ...qcmN(juste, demandeA ? [Math.floor(T / 2), T - d, x + d] : [Math.floor(T / 2), x, T - d]),
      explanation: etapes(
        `Sur le schéma, ${B.nom} a la part de ${A.nom} plus ${d}. On enlève ${d}, puis on partage en deux.`,
        `${T} − ${d} = ${2 * x}, puis ${2 * x} ÷ 2 = ${x}${demandeA ? "" : `, et ${x} + ${d} = ${x + d}`}.`,
        `${demandeA ? A.nom : B.nom} a ${juste} ${o}.`,
      ),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, { label: B.nom, unknown: true }, { label: `+ ${d} pour ${B.nom}`, value: d }] }),
    };
  }),

  // ★4 — prix d'un article quand on connaît le total.
  tpl(D, "g03", 4, "Enlève le prix connu, puis partage entre les articles identiques.", () => {
    const P = perso();
    const ar = un(ARTICLES);
    const n = entre(2, 6), x = entre(2, 9), p = entre(1, 9), T = n * x + p;
    return {
      text: phrase(
        `${P.nom} paie ${T} € pour ${n} ${ar.des} et ${ar.autre}. ${cap(ar.autre)} coûte ${p} €.`,
        un([`Combien coûte ${ar.un} ?`, `Quel est le prix ${ar.un.startsWith("une") ? "d'une" : "d'un"} ${ar.un.replace(/^une? /, "")} ?`, `Trouve le prix ${ar.un.startsWith("une") ? "d'une" : "d'un"} ${ar.un.replace(/^une? /, "")}.`]),
      ),
      ...qcmN(x, [T - p, Math.floor(T / n), x + p, x + 1], "€"),
      explanation: etapes(`On enlève le prix de ${ar.autre}, puis on partage entre les ${n} ${ar.des}.`, `${T} − ${p} = ${n * x}, puis ${n * x} ÷ ${n} = ${x}.`, `${cap(ar.un)} coûte ${x} €.`),
      canvas: barre({ total: `${T} €`, parts: [...parts(n, "?"), { label: `${p} €`, value: p }] }),
    };
  }),

  // ★4 — la balance : 2 boîtes + 3 kg = 11 kg.
  tpl(D, "g04", 4, "Enlève la même masse des deux plateaux, puis partage.", () => {
    const obj = un([["boîtes", "une boîte"], ["sacs de farine", "un sac de farine"], ["pastèques", "une pastèque"], ["briques", "une brique"], ["colis", "un colis"], ["citrouilles", "une citrouille"], ["pots de miel", "un pot de miel"], ["sacs de billes", "un sac de billes"], ["cartons de livres", "un carton de livres"], ["seaux de sable", "un seau de sable"]] as const);
    const k = un([2, 3, 4]), x = entre(2, 9), b = entre(1, 8), T = k * x + b;
    const qui = un(["Au marché", "Au laboratoire", "Dans la classe de sciences", "À la ferme", "À la poste", "Dans l'atelier"]);
    return {
      text: phrase(
        `${qui}, une balance est équilibrée. À gauche : ${k} ${obj[0]} identiques et ${b} kg. À droite : ${T} kg.`,
        un([`Combien pèse ${obj[1]} ?`, "Quelle est la masse d'un seul objet ?", `Quelle est la masse ${deUn(obj[1])} ?`]),
      ),
      ...qcmN(x, [T - b, Math.floor(T / k), Math.floor((T + b) / k), x + 1], "kg"),
      explanation: etapes(`On enlève ${b} kg des deux côtés : la balance reste équilibrée. Puis on partage en ${k}.`, `${T} − ${b} = ${k * x}, puis ${k * x} ÷ ${k} = ${x}.`, `Un objet pèse ${x} kg.`),
      canvas: barre({ title: "Balance équilibrée", total: `${T} kg`, parts: [...parts(k, "?"), { label: `${b} kg`, value: b }] }),
    };
  }),

  // ★5 — « k fois plus » et le total.
  tpl(D, "g05", 5, "Compte les parts égales : 1 pour l'un, k pour l'autre.", () => {
    const [A, B] = deux();
    const o = un(OBJ_DEFI);
    const k = un([2, 3, 4, 5]), x = entre(6, 30), T = (k + 1) * x;
    const demandeA = Math.random() < 0.5;
    const juste = demandeA ? x : k * x;
    return {
      text: phrase(
        un(["Défi !", "Petite énigme.", ""]),
        `${B.nom} a ${k} fois plus ${de(o)} que ${A.nom}. Ensemble, ${A.nom} et ${B.nom} en ont ${T}.`,
        `Combien ${de(o)} a ${demandeA ? A.nom : B.nom} ?`,
      ),
      ...qcmN(juste, demandeA ? [Math.floor(T / k), T - k, k * x, Math.floor(T / 2)] : [x, T - x - 1, Math.floor(T / 2), k * x + k]),
      explanation: etapes(`${A.nom} a 1 part, ${B.nom} a ${k} parts : ${k + 1} parts égales en tout.`, `${T} ÷ ${k + 1} = ${x}${demandeA ? "" : `, puis ${k} × ${x} = ${k * x}`}.`, `${demandeA ? A.nom : B.nom} a ${juste} ${o}.`),
      canvas: barre({ total: String(T), parts: [{ label: A.nom, unknown: true }, ...parts(k, B.nom)] }),
    };
  }),

  // ★5 — la grande balance, en grammes.
  tpl(D, "g06", 5, "Enlève la même masse des deux côtés, puis partage entre les objets identiques.", () => {
    const obj = un([["pommes", "pomme"], ["oranges", "orange"], ["boules de pétanque", "boule de pétanque"], ["savons", "savon"], ["tablettes de chocolat", "tablette de chocolat"], ["pots de yaourt", "pot de yaourt"], ["livres", "livre"], ["ballons", "ballon"]] as const);
    const fem = /^(pomme|orange|boule|tablette)/.test(obj[1]);
    const k = un([2, 3, 4, 5]), x = un([100, 150, 200, 250, 300, 400]), b = un([100, 200, 300, 500]), T = k * x + b;
    return {
      text: phrase(
        `Sur une balance équilibrée, il y a d'un côté ${k} ${obj[0]} identiques et une masse de ${fr(b)} g, de l'autre une masse de ${fr(T)} g.`,
        un([`Combien pèse ${fem ? "une" : "un"} ${obj[1]} ?`, "Quelle est la masse d'un seul objet ?", `Trouve la masse ${fem ? "d'une" : "d'un"} ${obj[1]}.`]),
      ),
      ...qcmN(x, [T - b, Math.round(T / k), Math.round((T + b) / k), x + 50], "g", 50),
      explanation: etapes(`On enlève ${fr(b)} g des deux côtés, puis on partage en ${k}.`, `${fr(T)} − ${fr(b)} = ${fr(k * x)}, puis ${fr(k * x)} ÷ ${k} = ${x}.`, `${cap(fem ? "une" : "un")} ${obj[1]} pèse ${x} g.`),
      canvas: barre({ title: "Balance équilibrée", total: `${fr(T)} g`, parts: [...parts(k, "?"), { label: `${fr(b)} g`, value: b }] }),
    };
  }),

  // ★5 — trois nombres qui se suivent.
  tpl(D, "g07", 5, "Trois nombres qui se suivent : le plus petit, puis 1 de plus, puis 2 de plus.", () => {
    const c = un(SUITE_CTX);
    const x = entre(c === SUITE_CTX[2] ? 2 : 8, c === SUITE_CTX[2] ? 28 : 120);
    const s = 3 * x + 3;
    return {
      text: phrase(un(["Défi !", "Petite énigme.", ""]), c.t(s), c.q),
      ...qcmN(x, [x + 1, x + 2, x + 3, x - 1]),
      explanation: etapes("Le plus petit, puis 1 de plus, puis 2 de plus : on enlève 1 + 2 = 3, il reste trois fois le plus petit.", `${s} − 3 = ${s - 3}, puis ${s - 3} ÷ 3 = ${x}.`, `${x} + ${x + 1} + ${x + 2} = ${s} : le premier est ${x}.`),
      canvas: barre({ total: String(s), parts: [{ label: "?", unknown: true }, { label: "? + 1", unknown: true }, { label: "? + 2", unknown: true }] }),
    };
  }),

  // ★5 — le nombre mystère à indices.
  tpl(D, "g08", 5, "Écris tous les nombres qui vérifient le premier indice, puis teste le second.", () => {
    const P = perso();
    for (let essai = 0; essai < 50; essai++) {
      const t = entre(3, 9);
      const min = un([10, 20, 30, 40, 50]);
      const max = min + un([20, 30, 40]);
      const mult: number[] = [];
      for (let v = min + 1; v < max; v++) if (v % t === 0) mult.push(v);
      const somme = (v: number) => String(v).split("").reduce((a, ch) => a + Number(ch), 0);
      const cible = un(mult);
      if (!cible) continue;
      const S = somme(cible);
      const bons = mult.filter((v) => somme(v) === S);
      if (bons.length !== 1) continue;
      const autresMult = mult.filter((v) => v !== cible);
      const memeSomme: number[] = [];
      for (let v = min + 1; v < max; v++) if (somme(v) === S && v % t !== 0) memeSomme.push(v);
      if (autresMult.length < 1 || memeSomme.length < 1) continue;
      const lead = un([`Devinette de ${P.nom} :`, `Le cadenas du coffre de ${P.nom} cache un nombre.`, "Le nombre mystère du jour :", `${P.nom} a écrit un nombre secret.`, "Le magicien pense à un nombre."]);
      return {
        text: phrase(lead, `Il est compris entre ${min} et ${max}. Il est dans la table de ${t}. La somme de ses chiffres vaut ${S}.`, un(["Quel est ce nombre ?", "Quel nombre est-ce ?", "Trouve-le."])),
        ...qcm(String(cible), [...autresMult.sort(() => Math.random() - 0.5).slice(0, 2), ...memeSomme.slice(0, 2)].map(String)),
        explanation: etapes(
          `Les nombres de la table de ${t} entre ${min} et ${max} : ${mult.join(", ")}.`,
          `Parmi eux, seul ${cible} a des chiffres dont la somme vaut ${S}.`,
          `Le nombre est ${cible}.`,
        ),
        ...(mult.length <= 8
          ? { canvas: tableau({ title: `Table de ${t} entre ${min} et ${max}`, headers: mult, rows: [{ label: "Somme des chiffres", values: mult.map(() => "?") }], coin: "Nombre" }) }
          : {}),
      };
    }
    return {
      text: "Le nombre mystère est compris entre 30 et 40. Il est dans la table de 7. Quel est ce nombre ?",
      ...qcm("35", ["28", "42", "37"]),
      explanation: etapes("Les nombres de la table de 7 entre 30 et 40 : 35 seulement.", "7 × 5 = 35.", "Le nombre est 35."),
    };
  }),
];

export const algebreGabaritsCm1: TutorBankItemV4[] = [...egalite, ...completer, ...inconnu, ...schemaBarre, ...motif, ...relation, ...defi];
