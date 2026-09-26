// lib/automatismes/3e.ts
//
// Automatismes de 3e — la première partie du DNB (24/09/2026).
//
// SOURCE : les deux sujets 0 publiés sur Éduscol (septembre 2026), 9 questions
// chacun, 20 minutes sans calculatrice, 6 points. Les thèmes qui reviennent
// dans les DEUX : pourcentage d'un effectif, moyenne ou médiane, Thalès,
// Scratch, un angle, une durée ou une vitesse. D'où les neuf thèmes ci-dessous,
// une question par thème et par série.
//
// ⚠️ LE QCM N'EST PAS ÉCARTÉ AU DNB (il l'est à l'EAM) : 4 questions sur 18 aux
// sujets 0. On en garde donc environ une sur cinq, surtout pour les questions
// « quel calcul » — le sujet 0 le fait lui-même (4x − 3 = 20, question 7).
//
// ⭐ Contextes : le sport, la nature, le monde. Pas La Réunion par défaut —
// 83 % des visiteurs sont en métropole.
//
// ⛔ Sans calculatrice : tous les nombres se calculent de tête, en une ou deux
// étapes. Un générateur qui produit 17 × 23 est un générateur faux.

import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import type { AutoNiveau, AutoQuestion } from "./types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 2.5 → « 2,5 » */
function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** Toutes les écritures acceptées d'un nombre : « 2,5 » et « 2.5 ». */
function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

/** QCM : jamais deux fois la même ligne, la bonne réponse toujours présente. */
function qcm(correct: string, pieges: readonly string[]): string[] {
  const d = shuffle(Array.from(new Set(pieges)).filter((p) => p !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

/** Écritures d'un signe « + b » ou « − b » dans une formule. */
function signe(b: number): string {
  return b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
}

const NOMS_TRIANGLE = [
  ["A", "B", "C"],
  ["E", "F", "G"],
  ["R", "S", "T"],
  ["K", "L", "M"],
  ["D", "E", "F"],
  ["P", "Q", "R"],
] as const;

/* ═══════════════ 1. CALCUL MENTAL ET FRACTIONS ═══════════════ */

const FRACTIONS_MOT: { n: number; d: number; mot: string }[] = [
  { n: 1, d: 2, mot: "la moitié" },
  { n: 1, d: 3, mot: "le tiers" },
  { n: 1, d: 4, mot: "le quart" },
  { n: 1, d: 5, mot: "le cinquième" },
];

export function fractionDe(): AutoQuestion {
  if (Math.random() < 0.4) {
    const f = pick(FRACTIONS_MOT);
    const total = f.d * entre(3, 15);
    const rep = total / f.d;
    return {
      text: `Quel est ${f.mot} de ${total} ?`,
      format: "short",
      expected: accepte(rep),
      explanation: `${f.mot[0].toUpperCase()}${f.mot.slice(1)} d'un nombre, c'est ce nombre divisé par ${f.d}.\n$${total} \\div ${f.d} = ${rep}$.`,
    };
  }
  const [n, d] = pick([[2, 3], [3, 4], [2, 5], [3, 5], [5, 6], [3, 10], [7, 10]] as const);
  const total = d * entre(2, 12);
  const rep = (n * total) / d;
  return {
    text: `Calculer $\\dfrac{${n}}{${d}}$ de ${total}.`,
    format: "short",
    expected: accepte(rep),
    explanation: `Prendre $\\dfrac{${n}}{${d}}$ d'un nombre : on le divise par ${d}, puis on multiplie par ${n}.\n$${total} \\div ${d} = ${total / d}$, puis $${total / d} \\times ${n} = ${rep}$.`,
  };
}

export function priorites(): AutoQuestion {
  const cas = entre(1, 4);
  const a = entre(2, 9);
  const b = entre(2, 9);
  const c = entre(2, 9);
  if (cas === 1) {
    const rep = a + b * c;
    return {
      text: `Calculer $${a} + ${b} \\times ${c}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `La multiplication passe avant l'addition.\n$${a} + ${b} \\times ${c} = ${a} + ${b * c} = ${rep}$.`,
    };
  }
  if (cas === 2) {
    const rep = a - b * c;
    return {
      text: `Calculer $${a} - ${b} \\times ${c}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `La multiplication passe avant la soustraction.\n$${a} - ${b} \\times ${c} = ${a} - ${b * c} = ${rep}$.`,
    };
  }
  if (cas === 3) {
    const rep = (a - b) * c;
    return {
      text: `Calculer $(${a} - ${b}) \\times ${c}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `Les parenthèses d'abord.\n$(${a} - ${b}) \\times ${c} = ${a - b < 0 ? `(${a - b})` : a - b} \\times ${c} = ${rep}$.`,
    };
  }
  const n = -entre(2, 9);
  const rep = n * b - c;
  return {
    text: `Calculer $(${n}) \\times ${b} - ${c}$.`,
    format: "short",
    expected: accepte(rep),
    explanation: `La multiplication d'abord, avec la règle des signes.\n$(${n}) \\times ${b} = ${n * b}$, puis $${n * b} - ${c} = ${rep}$.`,
  };
}

export function droiteGraduee(): AutoQuestion {
  const d = pick([2, 3, 4, 5] as const);
  // Le point E tombe entre deux graduations entières, jamais sur un entier.
  let k = entre(1, 2 * d - 1);
  while (k % d === 0) k = entre(1, 2 * d - 1);
  const g = pgcd(k, d);
  const irr = `${k / g}/${d / g}`;
  const dec = k / d;
  const decFini = [2, 4, 5].includes(d / g);
  const canvas = {
    kind: "number_line",
    min: 0,
    max: 2,
    step: 1 / d,
    points: [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: dec, label: "E", color: "#c2410c" },
    ],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true },
    size: { width: 440, height: 110 },
  } as unknown as CanvasFigure;
  const explication =
    `L'unité est partagée en ${d} parts égales : chaque graduation vaut $\\dfrac{1}{${d}}$.\n` +
    `E est à ${k} graduations de 0 : son abscisse est $\\dfrac{${k}}{${d}}$` +
    (g > 1 ? ` $= \\dfrac{${k / g}}{${d / g}}$` : "") +
    (decFini ? ` $= ${fr(dec)}$.` : ".");
  if (Math.random() < 0.35) {
    const bonne = `$\\dfrac{${k}}{${d}}$`;
    return {
      text: "Sur cette droite graduée, quelle est l'abscisse du point E ?",
      format: "qcm",
      choices: qcm(bonne, [
        `$\\dfrac{${k}}{${d + 1}}$`,
        `$\\dfrac{${d}}{${k}}$`,
        `$\\dfrac{${k + 1}}{${d}}$`,
        `$\\dfrac{${k}}{10}$`,
      ]),
      expected: [bonne],
      explanation: explication,
      canvas,
    };
  }
  return {
    text: "Donner l'abscisse du point E sous la forme d'une fraction.",
    format: "short",
    expected: Array.from(new Set([`${k}/${d}`, irr, ...(decFini ? accepte(dec) : [])])),
    explanation: explication,
    canvas,
  };
}

/* ═══════════════ 2. POURCENTAGES ═══════════════ */

const CONTEXTES_PCT = [
  { tout: "élèves d'un collège", partie: "font partie de la chorale", non: "ne font pas partie de la chorale" },
  { tout: "arbres d'une forêt", partie: "sont des chênes", non: "ne sont pas des chênes" },
  { tout: "spectateurs d'un match", partie: "sont venus en train", non: "ne sont pas venus en train" },
  { tout: "coureurs d'un marathon", partie: "courent pour la première fois", non: "ne courent pas pour la première fois" },
  { tout: "oiseaux comptés dans un parc", partie: "sont des moineaux", non: "ne sont pas des moineaux" },
  { tout: "habitants d'un village", partie: "ont plus de 60 ans", non: "n'ont pas plus de 60 ans" },
];

/** Un pourcentage et un total dont le produit se calcule de tête. */
function pctEtTotal(): { p: number; total: number } {
  const p = pick([10, 20, 25, 50, 75, 5, 30, 40] as const);
  const totaux = [40, 60, 80, 120, 200, 300, 400, 500, 600, 800, 1000].filter(
    (t) => (p * t) % 100 === 0,
  );
  return { p, total: pick(totaux) };
}

export function pctEffectif(): AutoQuestion {
  const c = pick(CONTEXTES_PCT);
  const { p, total } = pctEtTotal();
  const rep = (p * total) / 100;
  return {
    text: `Sur les ${total} ${c.tout}, ${p} % ${c.partie}. Combien cela représente-t-il ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `Prendre ${p} %, c'est multiplier par $\\dfrac{${p}}{100}$.\n$${total} \\times \\dfrac{${p}}{100} = ${rep}$.`,
  };
}

export function pctComplement(): AutoQuestion {
  const c = pick(CONTEXTES_PCT);
  const { p, total } = pctEtTotal();
  const partie = (p * total) / 100;
  const rep = total - partie;
  return {
    text: `Sur les ${total} ${c.tout}, ${p} % ${c.partie}. Combien ${c.non} ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `Deux chemins : ${p} % de ${total} font ${partie}, donc $${total} - ${partie} = ${rep}$.\nOu directement : $100 - ${p} = ${100 - p}$ %, et ${100 - p} % de ${total} font ${rep}.`,
  };
}

export function pctProportion(): AutoQuestion {
  const c = pick(CONTEXTES_PCT);
  const [partie, total] = pick([
    [5, 20], [15, 60], [10, 40], [9, 30], [12, 48], [6, 25], [18, 50], [30, 200], [45, 300], [80, 400],
  ] as const);
  const rep = (partie * 100) / total;
  return {
    text: `Sur ${total} ${c.tout}, ${partie} ${c.partie}. Quel pourcentage cela représente-t-il ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `La part est $\\dfrac{${partie}}{${total}}$ ; on l'écrit sur 100.\n$\\dfrac{${partie}}{${total}} = ${fr(partie / total)} = \\dfrac{${fr(rep)}}{100}$, soit ${fr(rep)} %.`,
  };
}

/* ═══════════════ 3. DURÉES ET VITESSES ═══════════════ */

export function convertirDurees(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const min = pick([90, 150, 210, 240, 180, 45, 75, 30, 135] as const);
    const h = min / 60;
    return {
      text: `Un film dure ${min} min. Quelle est sa durée en heures (nombre décimal) ?`,
      format: "short",
      expected: accepte(h),
      explanation: `Une heure fait 60 minutes : on divise par 60.\n$${min} \\div 60 = ${fr(h)}$ h.`,
    };
  }
  if (cas === 2) {
    const h = pick([1.5, 2.5, 0.25, 0.75, 1.25, 3.5, 0.5] as const);
    const min = h * 60;
    return {
      text: `Combien de minutes y a-t-il dans ${fr(h)} h ?`,
      format: "short",
      expected: accepte(min),
      explanation: `On multiplie par 60.\n$${fr(h)} \\times 60 = ${min}$ min. (⚠️ ${fr(h)} h ne fait PAS ${Math.floor(h)} h ${fr(Math.round((h % 1) * 100))} min.)`,
    };
  }
  const h = entre(1, 4);
  const m = pick([10, 15, 20, 30, 40, 45] as const);
  const rep = h * 60 + m;
  return {
    text: `Convertir ${h} h ${m} min en minutes.`,
    format: "short",
    expected: accepte(rep),
    explanation: `$${h} \\times 60 = ${h * 60}$ min, puis on ajoute ${m} min.\n$${h * 60} + ${m} = ${rep}$ min.`,
  };
}

const MOBILES = [
  { qui: "Une voiture", v: [60, 80, 90, 120] },
  { qui: "Un cycliste", v: [15, 20, 24, 30] },
  { qui: "Un train", v: [120, 150, 180, 300] },
  { qui: "Une randonneuse", v: [4, 5, 6] },
  { qui: "Un bateau", v: [20, 30, 40] },
] as const;

export function vitesseDuree(): AutoQuestion {
  const m = pick(MOBILES);
  const v = pick(m.v);
  const t = pick([0.5, 0.25, 0.75, 1.5, 2, 3] as const).valueOf();
  const d = v * t;
  if (!Number.isInteger(d)) return vitesseDuree();
  const min = t * 60;
  const texte = `${m.qui} roule à ${v} km/h. Combien de temps met-elle pour parcourir ${fr(d)} km ?`
    .replace("roule", m.qui.startsWith("Une randonneuse") ? "marche" : m.qui.startsWith("Un bateau") ? "navigue" : "roule")
    .replace("met-elle", m.qui.startsWith("Une") ? "met-elle" : "met-il");
  const explication = `Durée = distance ÷ vitesse.\n$${fr(d)} \\div ${v} = ${fr(t)}$ h, soit ${min} min.`;
  if (Math.random() < 0.3) {
    const bonne = min >= 60 && min % 60 === 0 ? `${min / 60} h` : `${min} min`;
    const pieges = [`${min / 2} min`, `${min * 2} min`, `${min + 15} min`, `${fr(d)} min`, `${Math.max(5, min - 15)} min`]
      .map((p) => (p === `60 min` ? "1 h" : p));
    return { text: texte, format: "qcm", choices: qcm(bonne, pieges), expected: [bonne], explanation: explication };
  }
  return {
    text: `${texte} Donner la réponse en minutes.`,
    format: "short",
    expected: accepte(min),
    explanation: explication,
  };
}

export function vitesseDistance(): AutoQuestion {
  const m = pick(MOBILES);
  const v = pick(m.v);
  const t = pick([0.5, 2, 3, 1.5] as const).valueOf();
  const d = v * t;
  if (!Number.isInteger(d)) return vitesseDistance();
  if (Math.random() < 0.5) {
    return {
      text: `${m.qui} avance à la vitesse constante de ${v} km/h pendant ${t === 0.5 ? "30 min" : t === 1.5 ? "1 h 30 min" : `${t} h`}. Quelle distance parcourt-${m.qui.startsWith("Une") ? "elle" : "il"}, en km ?`,
      format: "short",
      expected: accepte(d),
      explanation: `Distance = vitesse × durée, la durée en heures.\n$${v} \\times ${fr(t)} = ${d}$ km.`,
    };
  }
  return {
    text: `${m.qui} parcourt ${d} km en ${t === 0.5 ? "30 min" : t === 1.5 ? "1 h 30 min" : `${t} h`}. Quelle est sa vitesse moyenne, en km/h ?`,
    format: "short",
    expected: accepte(v),
    explanation: `Vitesse = distance ÷ durée, la durée en heures.\n$${d} \\div ${fr(t)} = ${v}$ km/h.`,
  };
}

/* ═══════════════ 4. STATISTIQUES ═══════════════ */

const SERIES_STAT = [
  { quoi: "Les notes obtenues par une élève", unite: "" },
  { quoi: "Les températures relevées à midi, en °C,", unite: " °C" },
  { quoi: "Le nombre de buts marqués par une équipe à chaque match", unite: "" },
  { quoi: "Les tailles de jeunes plants de tomates, en cm,", unite: " cm" },
  { quoi: "Le nombre de dauphins aperçus lors de sorties en mer", unite: "" },
];

export function moyenne(): AutoQuestion {
  const s = pick(SERIES_STAT);
  const n = pick([4, 5] as const);
  const moy = entre(6, 14);
  // Des écarts à la moyenne qui s'annulent : la moyenne tombe juste.
  const ecarts = pick(
    n === 4
      ? [[-2, 2, -1, 1], [-3, 1, 0, 2], [-4, 3, 0, 1], [-1, -1, 0, 2]]
      : [[-2, 2, -1, 1, 0], [-3, 1, 0, 2, 0], [-4, 3, -1, 1, 1], [-2, -2, 1, 1, 2]],
  );
  const valeurs = shuffle(ecarts.map((e) => moy + e));
  const somme = valeurs.reduce((a, b) => a + b, 0);
  const explication = `Moyenne = somme des valeurs ÷ nombre de valeurs.\n$${valeurs.join(" + ")} = ${somme}$, et $${somme} \\div ${n} = ${moy}$.`;
  const texte = `${s.quoi} sont : ${valeurs.join(" ; ")}. Quelle est la moyenne de cette série ?`;
  if (Math.random() < 0.3) {
    const tri = [...valeurs].sort((a, b) => a - b);
    const med = n === 5 ? tri[2] : (tri[1] + tri[2]) / 2;
    const bonne = `${moy}${s.unite}`;
    return {
      text: texte,
      format: "qcm",
      choices: qcm(bonne, [`${fr(med)}${s.unite}`, `${moy + 1}${s.unite}`, `${moy - 1}${s.unite}`, `${somme}${s.unite}`, `${fr(moy + 0.5)}${s.unite}`]),
      expected: [bonne],
      explanation: explication,
    };
  }
  return { text: texte, format: "short", expected: accepte(moy), explanation: explication };
}

export function mediane(): AutoQuestion {
  const s = pick(SERIES_STAT);
  const n = pick([5, 7, 6] as const);
  const valeurs: number[] = [];
  while (valeurs.length < n) {
    const v = entre(3, 19);
    if (!valeurs.includes(v)) valeurs.push(v);
  }
  const tri = [...valeurs].sort((a, b) => a - b);
  const med = n % 2 === 1 ? tri[(n - 1) / 2] : (tri[n / 2 - 1] + tri[n / 2]) / 2;
  return {
    text: `${s.quoi} sont : ${valeurs.join(" ; ")}. Quelle est la médiane de cette série ?`,
    format: "short",
    expected: accepte(med),
    explanation:
      `On range d'abord les valeurs dans l'ordre : ${tri.join(" ; ")}.\n` +
      (n % 2 === 1
        ? `Il y a ${n} valeurs : la médiane est la ${(n + 1) / 2}ᵉ, soit ${med}.`
        : `Il y a ${n} valeurs, un nombre pair : la médiane est la moyenne des deux du milieu, $(${tri[n / 2 - 1]} + ${tri[n / 2]}) \\div 2 = ${fr(med)}$.`),
  };
}

/* ═══════════════ 5. LIRE UN GRAPHIQUE ═══════════════ */

// ⚠️ Le canvas `fonctionGraphique` trace une grille d'UNE unité : on garde
// des valeurs de 0 à 10, sinon la grille devient illisible.
const GRAPHIQUES = [
  { titre: "Hauteur d'eau dans un port (en m) selon l'heure (en h)", grandeur: "la hauteur d'eau", unite: "m", x: "h" },
  { titre: "Altitude d'un ballon-sonde (en km) selon le temps (en min)", grandeur: "l'altitude du ballon", unite: "km", x: "min" },
  { titre: "Température d'une serre (en dizaines de °C) selon l'heure", grandeur: "la température (en dizaines de °C)", unite: "", x: "h" },
  { titre: "Débit d'une rivière (en m³/s) selon le jour", grandeur: "le débit", unite: "m³/s", x: "" },
];

function courbe() {
  const g = pick(GRAPHIQUES);
  const xs = [0, 2, 4, 6, 8, 10];
  let ys = xs.map(() => entre(1, 8));
  // Un seul maximum, pour que « quand est-il atteint ? » ait une réponse.
  while (ys.filter((y) => y === Math.max(...ys)).length > 1) ys = xs.map(() => entre(1, 8));
  const pts = xs.map((x, i) => ({ x, y: ys[i] }));
  const canvas = {
    kind: "fonctionGraphique",
    titre: g.titre,
    // ⛔ Avec xmin = ymin = 0, les axes tombent SUR le bord : les chiffres de
    // l'axe horizontal sortaient du cadre et « 8 h » ne se lisait nulle part
    // (vu à l'aperçu, 24/09). Une unité de marge de chaque côté.
    xmin: -1,
    xmax: 11,
    ymin: -1,
    ymax: 9,
    grille: true,
    courbes: [{ id: "c", type: "points", points: pts, couleur: "#2563eb" }],
    points: pts.map((p) => ({ x: p.x, y: p.y })),
  } as unknown as CanvasFigure;
  return { g, pts, canvas };
}

function xLabel(x: number, g: (typeof GRAPHIQUES)[number]) {
  if (g.x === "h") return `${x} h`;
  if (g.x === "min") return `${x} min`;
  return `au jour ${x}`;
}

export function lireValeur(): AutoQuestion {
  const { g, pts, canvas } = courbe();
  const p = pick(pts);
  return {
    text: `D'après le graphique, quelle est ${g.grandeur} ${g.x ? "à " : ""}${xLabel(p.x, g)} ?`,
    format: "short",
    expected: accepte(p.y),
    explanation: `On part de ${p.x} sur l'axe horizontal, on monte jusqu'à la courbe, puis on lit sur l'axe vertical.\nOn lit ${p.y}${g.unite ? ` ${g.unite}` : ""}.`,
    canvas,
  };
}

export function lireVariation(): AutoQuestion {
  const { g, pts, canvas } = courbe();
  let i = entre(0, 4);
  let j = entre(i + 1, 5);
  while (pts[i].y === pts[j].y) {
    i = entre(0, 4);
    j = entre(i + 1, 5);
  }
  const a = pts[i];
  const b = pts[j];
  const hausse = b.y > a.y;
  const ecart = Math.abs(b.y - a.y);
  const debut = g.x ? `Entre ${a.x} ${g.x} et ${b.x} ${g.x}` : `Entre le jour ${a.x} et le jour ${b.x}`;
  return {
    text: `${debut}, de combien ${g.grandeur} a-t-elle ${hausse ? "augmenté" : "diminué"} ?`,
    format: "short",
    expected: accepte(ecart),
    explanation: `On lit les deux valeurs : ${a.y} puis ${b.y}.\nLa variation est $${b.y} - ${a.y} = ${b.y - a.y}$ : ${hausse ? "une hausse" : "une baisse"} de ${ecart}${g.unite ? ` ${g.unite}` : ""}.`,
    canvas,
  };
}

export function lireInstant(): AutoQuestion {
  const { g, pts, canvas } = courbe();
  const max = pts.reduce((m, p) => (p.y > m.y ? p : m));
  return {
    text: `${g.x === "h" ? "À quelle heure" : g.x === "min" ? "Au bout de combien de minutes" : "Quel jour"} ${g.grandeur} est-elle la plus grande ?`,
    format: "short",
    expected: accepte(max.x),
    explanation: `On cherche le point le plus HAUT de la courbe, puis on lit son abscisse sur l'axe horizontal.\nLe maximum (${max.y}) est atteint pour ${max.x}.`,
    canvas,
  };
}

/* ═══════════════ 6. ANGLES, PÉRIMÈTRES, AIRES ═══════════════ */

export function sommeAngles(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  const cas = entre(1, 3);
  // B et C à x = 225 : à 250, l'étiquette « ? » de l'angle en C sortait de 10 px du cadre de 280 (mesuré le 26/09).
  const pointsTri = { A: { x: 40, y: 190 }, B: { x: 225, y: 190 }, C: { x: 225, y: 50 } };
  if (cas === 1) {
    const a = pick([25, 30, 35, 40, 50, 55, 60, 65] as const);
    const canvas = {
      kind: "triangle",
      points: pointsTri,
      labels: { A, B, C },
      angleLabels: { A: `${a}°`, C: "?" },
      marks: { rightAngleAt: "B" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
    } as unknown as CanvasFigure;
    return {
      text: `Dans le triangle ${A}${B}${C}, rectangle en ${B}, on sait que $\\widehat{${A}} = ${a}°$. Calculer $\\widehat{${C}}$, en degrés.`,
      format: "short",
      expected: accepte(90 - a),
      explanation: `La somme des angles d'un triangle vaut 180°, et l'angle droit en vaut 90.\n$180 - 90 - ${a} = ${90 - a}$°.`,
      canvas,
    };
  }
  if (cas === 2) {
    const a = pick([40, 50, 35, 70, 65] as const);
    const b = pick([60, 45, 55, 80] as const);
    return {
      text: `Dans un triangle ${A}${B}${C}, $\\widehat{${A}} = ${a}°$ et $\\widehat{${B}} = ${b}°$. Calculer $\\widehat{${C}}$, en degrés.`,
      format: "short",
      expected: accepte(180 - a - b),
      explanation: `La somme des angles d'un triangle vaut 180°.\n$180 - ${a} - ${b} = ${180 - a - b}$°.`,
    };
  }
  const s = pick([20, 30, 40, 50, 80, 100] as const);
  const base = (180 - s) / 2;
  return {
    text: `${A}${B}${C} est un triangle isocèle en ${A}, et $\\widehat{${A}} = ${s}°$. Combien mesure l'angle $\\widehat{${B}}$, en degrés ?`,
    format: "short",
    expected: accepte(base),
    explanation: `Isocèle en ${A} : les deux angles à la base, en ${B} et en ${C}, sont égaux.\n$(180 - ${s}) \\div 2 = ${base}$°.`,
  };
}

export function perimetres(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const c = entre(3, 12);
    const canvas = {
      kind: "quadrilatere",
      points: { A: { x: 40, y: 130 }, B: { x: 150, y: 220 }, C: { x: 260, y: 130 }, D: { x: 150, y: 40 } },
      labels: { A: "A", B: "B", C: "C", D: "D" },
      sideLabels: { DA: `${c} cm` },
      display: { showPoints: true, showLabels: true, showSides: true },
    } as unknown as CanvasFigure;
    return {
      text: "Donner le périmètre du losange ABCD représenté ci-contre, en cm.",
      format: "short",
      expected: accepte(4 * c),
      explanation: `Les quatre côtés d'un losange ont la même longueur.\n$4 \\times ${c} = ${4 * c}$ cm.`,
      canvas,
    };
  }
  if (cas === 2) {
    const L = entre(5, 15);
    const l = entre(2, L - 1);
    return {
      text: `Un terrain rectangulaire mesure ${L} m sur ${l} m. Quel est son périmètre, en m ?`,
      format: "short",
      expected: accepte(2 * (L + l)),
      explanation: `Périmètre d'un rectangle = 2 × (longueur + largeur).\n$2 \\times (${L} + ${l}) = ${2 * (L + l)}$ m.`,
    };
  }
  if (cas === 3) {
    const c = entre(4, 15);
    return {
      text: `Un triangle équilatéral a des côtés de ${c} cm. Quel est son périmètre, en cm ?`,
      format: "short",
      expected: accepte(3 * c),
      explanation: `Ses trois côtés sont égaux.\n$3 \\times ${c} = ${3 * c}$ cm.`,
    };
  }
  const r = entre(2, 9);
  return {
    text: `Un cercle a un rayon de ${r} cm. Donner la valeur exacte de son périmètre, en fonction de $\\pi$.`,
    format: "short",
    expected: [`${2 * r}π`, `${2 * r} π`, `${2 * r}pi`, `${2 * r} pi`, `${2 * r}xπ`, `${2 * r}×π`],
    explanation: `Périmètre d'un cercle = $2 \\times \\pi \\times r$.\n$2 \\times \\pi \\times ${r} = ${2 * r}\\pi$ cm.`,
  };
}

export function aires(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const L = entre(3, 12);
    const l = entre(2, 9);
    return {
      text: `Quelle est l'aire d'un rectangle de ${L} cm sur ${l} cm, en cm² ?`,
      format: "short",
      expected: accepte(L * l),
      explanation: `Aire d'un rectangle = longueur × largeur.\n$${L} \\times ${l} = ${L * l}$ cm².`,
    };
  }
  if (cas === 2) {
    const c = entre(3, 12);
    return {
      text: `Un carré a un côté de ${c} m. Quelle est son aire, en m² ?`,
      format: "short",
      expected: accepte(c * c),
      explanation: `Aire d'un carré = côté × côté.\n$${c} \\times ${c} = ${c * c}$ m².`,
    };
  }
  if (cas === 3) {
    const b = 2 * entre(2, 7);
    const h = entre(3, 10);
    return {
      text: `Un triangle a une base de ${b} cm et une hauteur relative à cette base de ${h} cm. Quelle est son aire, en cm² ?`,
      format: "short",
      expected: accepte((b * h) / 2),
      explanation: `Aire d'un triangle = base × hauteur ÷ 2.\n$${b} \\times ${h} \\div 2 = ${(b * h) / 2}$ cm².`,
    };
  }
  const r = entre(2, 9);
  return {
    text: `Un disque a un rayon de ${r} cm. Donner la valeur exacte de son aire, en fonction de $\\pi$.`,
    format: "short",
    expected: [`${r * r}π`, `${r * r} π`, `${r * r}pi`, `${r * r} pi`, `${r * r}×π`],
    explanation: `Aire d'un disque = $\\pi \\times r^2$.\n$\\pi \\times ${r}^2 = ${r * r}\\pi$ cm².`,
  };
}

/* ═══════════════ 7. PYTHAGORE, THALÈS, TRIGONOMÉTRIE ═══════════════ */

/** Triangle rectangle en `A` (angle droit en bas à gauche), comme au sujet 0. */
function triangleRectangle(noms: readonly string[], cotes?: { AB?: string; CA?: string; BC?: string }, angleB?: string) {
  return {
    kind: "triangle",
    points: { A: { x: 55, y: 190 }, B: { x: 240, y: 190 }, C: { x: 55, y: 60 } },
    labels: { A: noms[0], B: noms[1], C: noms[2] },
    sideLabels: cotes ?? {},
    angleLabels: angleB ? { B: angleB } : {},
    marks: { rightAngleAt: "A" },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
    size: { width: 280, height: 240 },
  } as unknown as CanvasFigure;
}

export function pythagore(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  if (Math.random() < 0.5) {
    const bonne = `$${B}${C}^2 = ${A}${B}^2 + ${A}${C}^2$`;
    return {
      text: `Le triangle ${A}${B}${C} est rectangle en ${A}. Quelle égalité est vraie ?`,
      format: "qcm",
      choices: qcm(bonne, [
        `$${A}${B}^2 = ${B}${C}^2 + ${A}${C}^2$`,
        `$${B}${C} = ${A}${B} + ${A}${C}$`,
        `$${A}${C}^2 = ${A}${B}^2 + ${B}${C}^2$`,
        `$${B}${C}^2 = ${A}${B}^2 - ${A}${C}^2$`,
      ]),
      expected: [bonne],
      explanation: `L'hypoténuse est le côté opposé à l'angle droit : ici [${B}${C}].\nLe carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : $${B}${C}^2 = ${A}${B}^2 + ${A}${C}^2$.`,
      canvas: triangleRectangle([A, B, C]),
    };
  }
  const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15]] as const);
  return {
    text: `Le triangle ${A}${B}${C} est rectangle en ${A}, avec ${A}${B} = ${a} cm et ${A}${C} = ${b} cm. Calculer ${B}${C}, en cm.`,
    format: "short",
    expected: accepte(c),
    explanation: `D'après le théorème de Pythagore, $${B}${C}^2 = ${A}${B}^2 + ${A}${C}^2$.\n$${B}${C}^2 = ${a * a} + ${b * b} = ${c * c}$, donc $${B}${C} = \\sqrt{${c * c}} = ${c}$ cm.`,
    canvas: triangleRectangle([A, B, C], { AB: `${a} cm`, CA: `${b} cm`, BC: "?" }),
  };
}

// ⚠️ La liste indicative (octobre 2025) ne retient QUE le cosinus : « la ligne
// trigonométrique cosinus ». Sinus et tangente restent au programme, mais pas
// dans les automatismes.
export function trigoQuelCalcul(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  const enB = Math.random() < 0.5;
  const sommet = enB ? B : C;
  const angle = enB ? `${A}${B}${C}` : `${A}${C}${B}`;
  const adj = enB ? `${A}${B}` : `${A}${C}`;
  const opp = enB ? `${A}${C}` : `${A}${B}`;
  const hyp = `${B}${C}`;
  const frac = (n: string, d: string) => `$\\dfrac{${n}}{${d}}$`;
  const bonne = frac(adj, hyp);
  const canvas = {
    ...(triangleRectangle([A, B, C]) as object),
    angleLabels: enB ? { B: "?" } : { C: "?" },
  } as unknown as CanvasFigure;
  return {
    text: `Dans le triangle ${A}${B}${C} rectangle en ${A}, quel quotient est égal à $\\cos(\\widehat{${angle}})$ ?`,
    format: "qcm",
    choices: qcm(bonne, [frac(opp, hyp), frac(opp, adj), frac(hyp, adj), frac(adj, opp)]),
    expected: [bonne],
    explanation: `Pour l'angle en ${sommet} : l'hypoténuse est [${hyp}], face à l'angle droit ; le côté adjacent est [${adj}], le côté de l'angle qui n'est pas l'hypoténuse.\ncosinus = côté adjacent ÷ hypoténuse, donc $\\cos(\\widehat{${angle}}) = \\dfrac{${adj}}{${hyp}}$.`,
    canvas,
  };
}

export function cosinusLongueur(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  // cos 60° = 0,5 : le seul cosinus qui se calcule de tête au collège.
  const hyp = 2 * entre(2, 9);
  return {
    text: `Le triangle ${A}${B}${C} est rectangle en ${A}, avec ${B}${C} = ${hyp} cm et $\\widehat{${A}${B}${C}} = 60°$. On sait que $\\cos(60°) = 0,5$. Calculer ${A}${B}, en cm.`,
    format: "short",
    expected: accepte(hyp / 2),
    explanation: `$\\cos(\\widehat{${A}${B}${C}}) = \\dfrac{${A}${B}}{${B}${C}}$, donc $${A}${B} = ${B}${C} \\times \\cos(60°)$.\n$${hyp} \\times 0,5 = ${fr(hyp / 2)}$ cm.`,
    canvas: triangleRectangle([A, B, C], { BC: `${hyp} cm`, AB: "?" }, "60°"),
  };
}

const NOMS_THALES = [
  { A: "A", B: "B", C: "C", M: "M", N: "N" },
  { A: "S", B: "T", C: "U", M: "E", N: "F" },
  { A: "R", B: "P", C: "Q", M: "K", N: "L" },
  { A: "D", B: "G", C: "H", M: "V", N: "W" },
];

function thalesCanvas(n: (typeof NOMS_THALES)[number], sideLabels: Record<string, string>) {
  return {
    kind: "thales",
    variant: "triangle",
    labels: n,
    sideLabels,
    // ⛔ La longueur AB s'écrit 40 px SOUS la base (A.y = 230) : dans le cadre
    // par défaut de 270, elle sortait (mesuré à l'aperçu, 24/09). La hauteur ne
    // change pas l'échelle `k` (largeur ÷ 340) : on l'allonge seule.
    size: { width: 340, height: 300 },
    display: {
      showPoints: true,
      showLabels: true,
      showSideLabels: true,
      showParallelMarks: true,
      highlightParallel: false,
      showFormula: false,
    },
  } as unknown as CanvasFigure;
}

export function thalesEgalite(): AutoQuestion {
  const n = pick(NOMS_THALES);
  const f = (a: string, b: string) => `\\dfrac{${a}}{${b}}`;
  const AM = n.A + n.M, AB = n.A + n.B, AN = n.A + n.N, AC = n.A + n.C, MN = n.M + n.N, BC = n.B + n.C;
  const MB = n.M + n.B, NC = n.N + n.C;
  const bonne = `$${f(AM, AB)} = ${f(AN, AC)} = ${f(MN, BC)}$`;
  return {
    text: `Les droites (${MN}) et (${BC}) sont parallèles. Quelle égalité de rapports est vraie ?`,
    format: "qcm",
    choices: qcm(bonne, [
      `$${f(AM, MB)} = ${f(AN, NC)} = ${f(MN, BC)}$`,
      `$${f(AM, AB)} = ${f(AC, AN)} = ${f(MN, BC)}$`,
      // ⛔ Pas « AM/AN = AB/AC = MN/BC » : ses deux premiers rapports sont
      // égaux (on les déduit de l'égalité juste), et le piège était ambigu.
      `$${f(AM, AB)} = ${f(AN, AC)} = ${f(BC, MN)}$`,
      `$${f(AB, AM)} = ${f(AN, AC)} = ${f(BC, MN)}$`,
    ]),
    expected: [bonne],
    explanation: `Chaque rapport compare un côté du PETIT triangle ${n.A}${n.M}${n.N} au côté qui lui correspond dans le GRAND triangle ${n.A}${n.B}${n.C}, toujours dans le même ordre.\n$${f(AM, AB)} = ${f(AN, AC)} = ${f(MN, BC)}$.`,
    canvas: thalesCanvas(n, {}),
  };
}

export function thalesLongueur(): AutoQuestion {
  const n = pick(NOMS_THALES);
  const k = pick([2, 3, 4] as const);
  const am = entre(2, 5);
  const mn = entre(2, 6);
  const ab = k * am;
  const bc = k * mn;
  const AM = n.A + n.M, AB = n.A + n.B, MN = n.M + n.N, BC = n.B + n.C;
  const petitVersGrand = Math.random() < 0.6;
  if (petitVersGrand) {
    return {
      text: `Les droites (${MN}) et (${BC}) sont parallèles. ${AM} = ${am} cm, ${AB} = ${ab} cm et ${MN} = ${mn} cm. Calculer ${BC}, en cm.`,
      format: "short",
      expected: accepte(bc),
      explanation: `D'après le théorème de Thalès, $\\dfrac{${AM}}{${AB}} = \\dfrac{${MN}}{${BC}}$ : le grand triangle est un agrandissement du petit.\n$${AB} = ${k} \\times ${AM}$, donc $${BC} = ${k} \\times ${mn} = ${bc}$ cm.`,
      canvas: thalesCanvas(n, { AM: `${am}`, AB: `${ab}`, MN: `${mn}` }),
    };
  }
  return {
    text: `Les droites (${MN}) et (${BC}) sont parallèles. ${AM} = ${am} cm, ${AB} = ${ab} cm et ${BC} = ${bc} cm. Calculer ${MN}, en cm.`,
    format: "short",
    expected: accepte(mn),
    explanation: `D'après le théorème de Thalès, $\\dfrac{${AM}}{${AB}} = \\dfrac{${MN}}{${BC}}$ : le petit triangle est une réduction du grand.\n$${AB} = ${k} \\times ${AM}$, donc $${MN} = ${bc} \\div ${k} = ${mn}$ cm.`,
    canvas: thalesCanvas(n, { AM: `${am}`, AB: `${ab}`, BC: `${bc}` }),
  };
}

/* ═══════════════ 8. ÉQUATIONS ET EXPRESSIONS ═══════════════ */

export function equationQuelCalcul(): AutoQuestion {
  const a = entre(2, 9);
  const b = pick([-7, -5, -3, -2, 2, 3, 4, 6, 8] as const).valueOf();
  const c = entre(10, 40);
  const f = (n: string, d: number) => `\\dfrac{${n}}{${d}}`;
  const bonne = `$x = ${f(`${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`, a)}$`;
  return {
    text: `Pour résoudre l'équation $${a}x ${signe(b)} = ${c}$, quel calcul effectue-t-on ?`,
    format: "qcm",
    choices: qcm(bonne, [
      `$x = ${f(`${c} ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`, a)}$`,
      `$x = ${f(`${c}`, a)} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}$`,
      `$x = ${c} \\times ${a} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}$`,
      `$x = (${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}) - ${a}$`,
    ]),
    expected: [bonne],
    explanation: `On isole $${a}x$ en ${b >= 0 ? "retirant" : "ajoutant"} ${Math.abs(b)} des deux côtés, puis on divise par ${a}.\n$${a}x = ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}$, donc $x = ${f(`${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`, a)}$.`,
  };
}

export function equationResoudre(): AutoQuestion {
  const a = entre(2, 9);
  const x = entre(-5, 9);
  const b = pick([-7, -5, -3, 2, 4, 6, 8] as const).valueOf();
  const c = a * x + b;
  return {
    text: `Résoudre l'équation $${a}x ${signe(b)} = ${c}$. Donner la valeur de $x$.`,
    format: "short",
    expected: accepte(x),
    explanation: `$${a}x = ${c} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${c - b}$, puis $x = ${c - b} \\div ${a} = ${x}$.\nVérification : $${a} \\times (${x}) ${signe(b)} = ${c}$.`,
  };
}

export function valeurExpression(): AutoQuestion {
  const cas = entre(1, 3);
  const x = pick([-3, -2, -1, 2, 3, 4] as const).valueOf();
  if (cas === 1) {
    const a = entre(2, 5);
    const b = entre(1, 9);
    const rep = a * x * x - b;
    return {
      text: `Calculer $${a}x^2 - ${b}$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `On remplace $x$ par ${x}, avec des parenthèses : $${a} \\times (${x})^2 - ${b}$.\n$(${x})^2 = ${x * x}$ (un carré n'est jamais négatif), puis $${a} \\times ${x * x} - ${b} = ${rep}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(2, 6);
    const b = entre(1, 8);
    const rep = a * (x + b);
    return {
      text: `Calculer $${a}(x + ${b})$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `On remplace $x$ par ${x} : $${a} \\times (${x} + ${b})$.\n$${a} \\times ${x + b < 0 ? `(${x + b})` : x + b} = ${rep}$.`,
    };
  }
  const a = entre(2, 5);
  const b = entre(2, 9);
  const rep = -a * x + b;
  return {
    text: `Calculer $-${a}x + ${b}$ pour $x = ${x}$.`,
    format: "short",
    expected: accepte(rep),
    explanation: `On remplace $x$ par ${x} : $-${a} \\times (${x}) + ${b}$.\n$${-a * x} + ${b} = ${rep}$.`,
  };
}

/* ═══════════════ 9. SCRATCH ═══════════════ */

export function programmeCalcul(): AutoQuestion {
  const n = entre(1, 6);
  const a = entre(2, 8);
  const d = pick([2, 3] as const).valueOf();
  // b choisi pour que la division tombe juste.
  let b = entre(1, 12);
  while ((a * n + b) % d !== 0) b++;
  const rep = (a * n + b) / d;
  const canvas = {
    kind: "scratch",
    title: "Programme de calcul",
    blocks: [
      { type: "event" },
      { type: "ask", text: "« Choisis un nombre »" },
      { type: "set_variable", variable: "résultat", value: `${a} × réponse` },
      { type: "set_variable", variable: "résultat", value: `résultat + ${b}` },
      { type: "set_variable", variable: "résultat", value: `résultat ÷ ${d}` },
      { type: "say", text: "résultat" },
    ],
  } as unknown as CanvasFigure;
  return {
    text: `On choisit ${n} comme nombre de départ. Quel résultat le lutin dit-il à la fin ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `On suit les blocs dans l'ordre, sans en sauter.\n$${a} \\times ${n} = ${a * n}$ ; $${a * n} + ${b} = ${a * n + b}$ ; $${a * n + b} \\div ${d} = ${rep}$.`,
    canvas,
  };
}

const POLYGONES = [
  { n: 3, nom: "un triangle équilatéral" },
  { n: 4, nom: "un carré" },
  { n: 5, nom: "un pentagone régulier" },
  { n: 6, nom: "un hexagone régulier" },
  { n: 8, nom: "un octogone régulier" },
];

export function polygone(): AutoQuestion {
  const p = pick(POLYGONES);
  const angle = 360 / p.n;
  const longueur = pick([40, 50, 60, 80] as const);
  if (Math.random() < 0.5) {
    const canvas = {
      kind: "scratch",
      title: "Tracer une figure",
      blocks: [
        { type: "event" },
        { type: "pen" },
        {
          type: "repeat",
          times: p.n,
          children: [
            { type: "move", value: longueur },
            { type: "turn", value: "?" },
          ],
        },
      ],
    } as unknown as CanvasFigure;
    return {
      text: `Ce script doit tracer ${p.nom}. De combien de degrés le lutin doit-il tourner ?`,
      format: "short",
      expected: accepte(angle),
      explanation: `Après un tour complet, le lutin a tourné de 360°, en ${p.n} virages égaux.\n$360 \\div ${p.n} = ${angle}$°. (⚠️ ce n'est pas l'angle intérieur de la figure.)`,
      canvas,
    };
  }
  const canvas = {
    kind: "scratch",
    title: "Tracer une figure",
    blocks: [
      { type: "event" },
      { type: "pen" },
      {
        type: "repeat",
        times: "?",
        children: [
          { type: "move", value: longueur },
          { type: "turn", value: angle },
        ],
      },
    ],
  } as unknown as CanvasFigure;
  return {
    text: `Ce script doit tracer un polygone régulier en tournant de ${angle}° à chaque fois. Combien de fois faut-il répéter ?`,
    format: "short",
    expected: accepte(p.n),
    explanation: `Le lutin doit tourner de 360° en tout.\n$360 \\div ${angle} = ${p.n}$ : ${p.nom}.`,
    canvas,
  };
}

/* ═══════════════ COMPLÉMENTS DE LA LISTE INDICATIVE (octobre 2025) ═══════════════ */
//
// Tout ce que la liste nomme et que les deux sujets 0 ne montraient pas.

/* — Nombres : écritures, carrés, notation scientifique, divisibilité, n — */

export function ecritures(): AutoQuestion {
  const [n, d, dec] = pick([
    [1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [3, 2, 1.5], [5, 2, 2.5], [1, 10, 0.1], [6, 5, 1.2], [1, 5, 0.2], [7, 4, 1.75], [2, 5, 0.4],
  ] as const);
  const sens = entre(1, 3);
  if (sens === 1) {
    return {
      text: `Donner l'écriture décimale de $\\dfrac{${n}}{${d}}$.`,
      format: "short",
      expected: accepte(dec),
      explanation: `$\\dfrac{${n}}{${d}} = ${n} \\div ${d} = ${fr(dec)}$.`,
    };
  }
  if (sens === 2) {
    return {
      text: `Écrire ${fr(dec)} sous la forme d'un pourcentage.`,
      format: "short",
      expected: accepte(dec * 100).map((s) => `${s} %`).concat(accepte(dec * 100)),
      explanation: `$${fr(dec)} = \\dfrac{${fr(dec * 100)}}{100}$, soit ${fr(dec * 100)} %.`,
    };
  }
  const bonne = `$\\dfrac{${n}}{${d}}$`;
  return {
    text: `Quelle fraction est égale à ${fr(dec)} ?`,
    format: "qcm",
    choices: qcm(bonne, [`$\\dfrac{${d}}{${n}}$`, `$\\dfrac{${n}}{${d + 1}}$`, `$\\dfrac{${n + 1}}{${d}}$`, `$\\dfrac{1}{${Math.round(dec * 10)}}$`]),
    expected: [bonne],
    explanation: `$\\dfrac{${n}}{${d}} = ${n} \\div ${d} = ${fr(dec)}$.`,
  };
}

export function carres(): AutoQuestion {
  const n = entre(2, 12);
  if (Math.random() < 0.6) {
    return {
      text: `Calculer $${n}^2$.`,
      format: "short",
      expected: accepte(n * n),
      explanation: `$${n}^2 = ${n} \\times ${n} = ${n * n}$ (et non $${n} \\times 2 = ${2 * n}$).`,
    };
  }
  return {
    text: `Quel nombre entier positif a pour carré ${n * n} ?`,
    format: "short",
    expected: accepte(n),
    explanation: `$${n} \\times ${n} = ${n * n}$ : c'est ${n}. On dit aussi que $\\sqrt{${n * n}} = ${n}$.`,
  };
}

export function notationScientifique(): AutoQuestion {
  const m = pick([1.2, 2.5, 3.4, 4.5, 6.7, 7.2, 8.1] as const).valueOf();
  const p = pick([3, 4, 5, 6, -2, -3] as const).valueOf();
  const valeur = m * 10 ** p;
  const ecrit = p > 0 ? valeur.toLocaleString("fr-FR").replace(/ | /g, " ") : fr(valeur);
  const bonne = `$${fr(m)} \\times 10^{${p}}$`;
  return {
    text: `Quelle est la notation scientifique de ${ecrit} ?`,
    format: "qcm",
    choices: qcm(bonne, [
      `$${fr(m)} \\times 10^{${-p}}$`,
      `$${fr(m * 10)} \\times 10^{${p - 1}}$`,
      `$${fr(m)} \\times 10^{${p + 1}}$`,
      `$${fr(m / 10)} \\times 10^{${p + 1}}$`,
    ]),
    expected: [bonne],
    explanation: `En notation scientifique, le nombre devant la puissance de 10 est compris entre 1 et 10 (10 exclu).\n${ecrit} $= ${fr(m)} \\times 10^{${p}}$ : ${p > 0 ? `la virgule s'est déplacée de ${p} rangs vers la gauche` : `la virgule s'est déplacée de ${-p} rangs vers la droite`}.`,
  };
}

export function divisibilite(): AutoQuestion {
  const d = pick([2, 3, 5, 9] as const).valueOf();
  let n = d * entre(12, 111);
  // Pour 3 et 9 : pas un multiple de 2 ou 5 qu'on reconnaîtrait autrement.
  if (d === 9 || d === 3) while (n % 2 === 0 || n % 5 === 0) n = d * entre(12, 111);
  const regle = {
    2: "son chiffre des unités est pair",
    3: "la somme de ses chiffres est divisible par 3",
    5: "son chiffre des unités est 0 ou 5",
    9: "la somme de ses chiffres est divisible par 9",
  }[d];
  const somme = String(n).split("").reduce((s, c) => s + Number(c), 0);
  const leurres = [2, 3, 5, 9].filter((k) => n % k !== 0).map(String);
  if (leurres.length === 0) return divisibilite();
  return {
    text: `Parmi 2, 3, 5 et 9, donner un nombre par lequel ${n} est divisible.`,
    format: "short",
    expected: [2, 3, 5, 9].filter((k) => n % k === 0).map(String),
    explanation: `Un nombre est divisible par ${d} si ${regle}.` + (d === 3 || d === 9 ? `\nIci, ${String(n).split("").join(" + ")} = ${somme}.` : "") + `\n${n} = ${d} × ${n / d}.`,
  };
}

export function expressionsDeN(): AutoQuestion {
  const cas = pick([
    { quoi: "le double de $n$", bonne: "$2n$", pieges: ["$n^2$", "$n + 2$", "$\\dfrac{n}{2}$"] },
    { quoi: "le triple de $n$", bonne: "$3n$", pieges: ["$n^3$", "$n + 3$", "$\\dfrac{n}{3}$"] },
    { quoi: "le carré de $n$", bonne: "$n^2$", pieges: ["$2n$", "$n + 2$", "$n \\times n \\times 2$"] },
    { quoi: "la moitié de $n$", bonne: "$\\dfrac{n}{2}$", pieges: ["$2n$", "$n - 2$", "$n^2$"] },
    { quoi: "le successeur de $n$", bonne: "$n + 1$", pieges: ["$n - 1$", "$2n$", "$n + 2$"] },
    { quoi: "le prédécesseur de $n$", bonne: "$n - 1$", pieges: ["$n + 1$", "$1 - n$", "$\\dfrac{n}{2}$"] },
    { quoi: "le quadruple de $n$", bonne: "$4n$", pieges: ["$n^4$", "$n + 4$", "$\\dfrac{n}{4}$"] },
    { quoi: "le tiers de $n$", bonne: "$\\dfrac{n}{3}$", pieges: ["$3n$", "$n - 3$", "$n^3$"] },
    { quoi: "le double du successeur de $n$", bonne: "$2(n + 1)$", pieges: ["$2n + 1$", "$(n + 1)^2$", "$n + 2$"] },
    { quoi: "le successeur du double de $n$", bonne: "$2n + 1$", pieges: ["$2(n + 1)$", "$n^2 + 1$", "$n + 2$"] },
    { quoi: "le carré du successeur de $n$", bonne: "$(n + 1)^2$", pieges: ["$n^2 + 1$", "$2(n + 1)$", "$n^2 + n$"] },
    { quoi: "la somme de $n$ et de son successeur", bonne: "$2n + 1$", pieges: ["$2n$", "$n + 1$", "$n^2 + 1$"] },
  ] as const);
  return {
    text: `$n$ est un nombre entier. Comment s'écrit ${cas.quoi} ?`,
    format: "qcm",
    choices: qcm(cas.bonne, cas.pieges),
    expected: [cas.bonne],
    explanation: `${cas.quoi[0].toUpperCase()}${cas.quoi.slice(1)} s'écrit ${cas.bonne}.\nAttention : le double ($2n$) et le carré ($n^2 = n \\times n$) ne se confondent pas.`,
  };
}

/* — Calcul littéral — */

export function simplifierDevelopper(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = entre(2, 7), b = entre(2, 7), c = entre(1, 9);
    const bonne = `$${a + b}x - ${c}$`;
    return {
      text: `Réduire l'expression $${a}x + ${b}x - ${c}$.`,
      format: "qcm",
      choices: qcm(bonne, [`$${a + b - c}x$`, `$${a * b}x - ${c}$`, `$${a + b}x^2 - ${c}$`, `$${a + b + c}x$`]),
      expected: [bonne],
      explanation: `On regroupe les termes en $x$ : $${a}x + ${b}x = ${a + b}x$. Le terme $-${c}$ n'a pas de $x$ : il reste seul.\nRésultat : $${a + b}x - ${c}$.`,
    };
  }
  if (cas === 2) {
    const k = entre(2, 6), b = entre(1, 9);
    const bonne = `$${k}x + ${k * b}$`;
    return {
      text: `Développer $${k}(x + ${b})$.`,
      format: "qcm",
      choices: qcm(bonne, [`$${k}x + ${b}$`, `$${k + b}x$`, `$x + ${k * b}$`, `$${k}x + ${k + b}$`]),
      expected: [bonne],
      explanation: `On distribue ${k} à CHACUN des deux termes de la parenthèse.\n$${k} \\times x + ${k} \\times ${b} = ${k}x + ${k * b}$.`,
    };
  }
  const k = pick([2, 3, 4, 5] as const).valueOf(), a = entre(2, 4), b = entre(1, 7);
  const bonne = `$${k}(${a}x + ${b})$`;
  return {
    text: `Factoriser $${k * a}x + ${k * b}$.`,
    format: "qcm",
    choices: qcm(bonne, [`$${k}(${a}x + ${k * b})$`, `$${k * a}(x + ${b})$`, `$${k}x(${a} + ${b})$`, `$${a}(${k}x + ${b})$`]),
    expected: [bonne],
    explanation: `${k} divise ${k * a} et ${k * b} : c'est le facteur commun.\n$${k * a}x + ${k * b} = ${k} \\times ${a}x + ${k} \\times ${b} = ${k}(${a}x + ${b})$. (On vérifie en redéveloppant.)`,
  };
}

export function equationsSimples(): AutoQuestion {
  const x = entre(-6, 12);
  if (Math.random() < 0.5) {
    const b = entre(2, 15);
    return {
      text: `Résoudre l'équation $x + ${b} = ${x + b}$.`,
      format: "short",
      expected: accepte(x),
      explanation: `On retire ${b} des deux côtés.\n$x = ${x + b} - ${b} = ${x}$.`,
    };
  }
  const a = entre(2, 9);
  return {
    text: `Résoudre l'équation $${a}x = ${a * x}$.`,
    format: "short",
    expected: accepte(x),
    explanation: `On divise les deux côtés par ${a}.\n$x = ${a * x} \\div ${a} = ${x}$.`,
  };
}

/* — Proportionnalité et évolutions — */

export function evolutionPct(): AutoQuestion {
  const p = pick([10, 20, 25, 50] as const).valueOf();
  const prix = pick([20, 40, 60, 80, 120, 200] as const).valueOf();
  const hausse = Math.random() < 0.5;
  const rep = prix * (hausse ? 1 + p / 100 : 1 - p / 100);
  const objet = pick(["un vélo", "une paire de chaussures", "un sac de randonnée", "une tente", "un ballon"]);
  return {
    text: `Le prix de ${objet}, ${prix} €, ${hausse ? "augmente" : "baisse"} de ${p} %. Quel est son nouveau prix, en € ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `${p} % de ${prix} € font ${fr((p * prix) / 100)} €.\n$${prix} ${hausse ? "+" : "-"} ${fr((p * prix) / 100)} = ${fr(rep)}$ €.`,
  };
}

export function proportionnalite(): AutoQuestion {
  if (Math.random() < 0.6) {
    const produit = pick([
      { q: "kg de pommes", unite: "€" },
      { q: "litres d'essence", unite: "€" },
      { q: "baguettes", unite: "€" },
      { q: "m de tissu", unite: "€" },
    ]);
    const prixUnit = pick([1.5, 2, 2.5, 3, 4] as const).valueOf();
    const a = entre(2, 5);
    const k = pick([2, 3, 4] as const).valueOf();
    const b = a * k;
    return {
      text: `${a} ${produit.q} coûtent ${fr(a * prixUnit)} €. Combien coûtent ${b} ${produit.q}, en € ? (Le prix est proportionnel à la quantité.)`,
      format: "short",
      expected: accepte(b * prixUnit),
      explanation: `${b}, c'est ${k} fois ${a} : le prix est donc ${k} fois plus grand (linéarité).\n$${k} \\times ${fr(a * prixUnit)} = ${fr(b * prixUnit)}$ €.`,
    };
  }
  const prop = Math.random() < 0.5;
  const coef = entre(2, 5);
  const xs = [1, 2, 3, 5];
  const ys = xs.map((x) => coef * x + (prop ? 0 : 1));
  return {
    text: `Voici un tableau : pour ${xs.join(" ; ")}, on obtient ${ys.join(" ; ")}. Est-ce un tableau de proportionnalité ? Répondre par oui ou par non.`,
    format: "short",
    expected: prop ? ["oui", "Oui"] : ["non", "Non"],
    explanation: prop
      ? `On multiplie toujours par ${coef} : $${ys.map((y, i) => `\\dfrac{${y}}{${xs[i]}}`).join(" = ")} = ${coef}$. C'est un tableau de proportionnalité.`
      : `$\\dfrac{${ys[0]}}{${xs[0]}} = ${ys[0]}$ mais $\\dfrac{${ys[1]}}{${xs[1]}} = ${fr(ys[1] / xs[1])}$ : les quotients ne sont pas égaux. Ce n'est pas un tableau de proportionnalité.`,
  };
}

/* — Conversions d'unités — */

export function conversions(): AutoQuestion {
  const cas = pick([
    () => { const v = entre(2, 9) * 100; return { t: `Convertir ${v} cm en m.`, r: v / 100, e: `1 m = 100 cm : on divise par 100.\n$${v} \\div 100 = ${fr(v / 100)}$ m.` }; },
    () => { const v = pick([1.5, 2.3, 4, 0.8] as const).valueOf(); return { t: `Convertir ${fr(v)} km en m.`, r: v * 1000, e: `1 km = 1 000 m : on multiplie par 1 000.\n$${fr(v)} \\times 1000 = ${v * 1000}$ m.` }; },
    () => { const v = entre(2, 9); return { t: `Convertir ${v} m² en cm².`, r: v * 10000, e: `1 m = 100 cm, donc 1 m² = 100 × 100 = 10 000 cm².\n$${v} \\times 10\\,000 = ${v * 10000}$ cm². (⚠️ pas × 100 : une aire a deux dimensions.)` }; },
    () => { const v = entre(2, 20); return { t: `Combien de litres contient un récipient de ${v} dm³ ?`, r: v, e: `1 dm³ = 1 L.\n${v} dm³ = ${v} L.` }; },
    () => { const v = pick([1, 2, 3, 0.5] as const).valueOf(); return { t: `Combien de litres y a-t-il dans ${fr(v)} m³ ?`, r: v * 1000, e: `1 m³ = 1 000 dm³ = 1 000 L.\n$${fr(v)} \\times 1000 = ${v * 1000}$ L.` }; },
    () => { const v = pick([1500, 2500, 750, 3200] as const).valueOf(); return { t: `Convertir ${v.toLocaleString("fr-FR").replace(/ | /g, " ")} g en kg.`, r: v / 1000, e: `1 kg = 1 000 g : on divise par 1 000.\n$${v} \\div 1000 = ${fr(v / 1000)}$ kg.` }; },
    () => { const v = pick([25, 50, 75, 33] as const).valueOf(); return { t: `Convertir ${v} cL en L.`, r: v / 100, e: `1 L = 100 cL : on divise par 100.\n$${v} \\div 100 = ${fr(v / 100)}$ L.` }; },
    () => { const v = entre(2, 7); return { t: `Combien d'heures y a-t-il dans ${v} jours ?`, r: v * 24, e: `Un jour dure 24 h.\n$${v} \\times 24 = ${v * 24}$ h.` }; },
    () => { const v = entre(2, 9); return { t: `Combien de secondes y a-t-il dans ${v} min ?`, r: v * 60, e: `Une minute dure 60 s.\n$${v} \\times 60 = ${v * 60}$ s.` }; },
  ]);
  const { t, r, e } = cas();
  return { text: t, format: "short", expected: accepte(r), explanation: e };
}

/* — Repère et symétries — */

function repereCanvas(points: { x: number; y: number; label: string }[]) {
  return {
    kind: "fonctionGraphique",
    xmin: -5,
    xmax: 5,
    ymin: -5,
    ymax: 5,
    grille: true,
    points: points.map((p) => ({ ...p, couleur: "#c2410c" })),
  } as unknown as CanvasFigure;
}

export function coordonnees(): AutoQuestion {
  let x = entre(-4, 4), y = entre(-4, 4);
  while (x === 0 || y === 0 || x === y) { x = entre(-4, 4); y = entre(-4, 4); }
  const nom = pick(["A", "B", "M", "P", "R"]);
  return {
    text: `Quelles sont les coordonnées du point ${nom} ? Écrire la réponse sous la forme (x ; y).`,
    format: "short",
    expected: [`(${x};${y})`, `(${x} ; ${y})`, `(${x},${y})`, `${x};${y}`],
    explanation: `On lit d'abord l'abscisse sur l'axe horizontal (${x}), puis l'ordonnée sur l'axe vertical (${y}).\n${nom}(${x} ; ${y}). (⚠️ L'ordre compte : (${y} ; ${x}) est un autre point.)`,
    canvas: repereCanvas([{ x, y, label: nom }]),
  };
}

export function symetries(): AutoQuestion {
  let x = entre(-4, 4), y = entre(-4, 4);
  while (x === 0 || y === 0) { x = entre(-4, 4); y = entre(-4, 4); }
  const cas = pick([
    { quoi: "l'origine O du repère (symétrie centrale)", sx: -x, sy: -y, pourquoi: "O est le milieu du segment : les deux coordonnées changent de signe." },
    { quoi: "l'axe des ordonnées", sx: -x, sy: y, pourquoi: "l'axe vertical est la médiatrice du segment : seule l'abscisse change de signe." },
    { quoi: "l'axe des abscisses", sx: x, sy: -y, pourquoi: "l'axe horizontal est la médiatrice du segment : seule l'ordonnée change de signe." },
  ]);
  return {
    text: `Le point A a pour coordonnées (${x} ; ${y}). Quelles sont les coordonnées de son symétrique A' par rapport à ${cas.quoi} ? Écrire la réponse sous la forme (x ; y).`,
    format: "short",
    expected: [`(${cas.sx};${cas.sy})`, `(${cas.sx} ; ${cas.sy})`, `(${cas.sx},${cas.sy})`, `${cas.sx};${cas.sy}`],
    explanation: `Par rapport à ${cas.quoi.replace(" (symétrie centrale)", "")}, ${cas.pourquoi}\nA'(${cas.sx} ; ${cas.sy}).`,
    canvas: repereCanvas([{ x, y, label: "A" }]),
  };
}

/* — Angles : le vocabulaire — */

export function anglesVocabulaire(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const q = pick([
      { t: "Combien mesure un angle droit, en degrés ?", r: 90 },
      { t: "Combien mesure un angle plat, en degrés ?", r: 180 },
      { t: "Combien mesure un angle nul, en degrés ?", r: 0 },
    ]);
    return { text: q.t, format: "short", expected: accepte(q.r), explanation: `Angle nul : 0°. Angle droit : 90°. Angle plat : 180° (ses côtés forment une droite).\nRéponse : ${q.r}°.` };
  }
  if (cas === 2) {
    const a = entre(3, 16) * 10 + pick([0, 5] as const);
    return {
      text: `Deux angles sont supplémentaires. L'un mesure ${a}°. Combien mesure l'autre, en degrés ?`,
      format: "short",
      expected: accepte(180 - a),
      explanation: `Deux angles supplémentaires ont une somme de 180°.\n$180 - ${a} = ${180 - a}$°.`,
    };
  }
  const a = entre(3, 16) * 10 + pick([0, 5] as const);
  const bonne = a < 90 ? "aigu" : a > 90 ? "obtus" : "droit";
  return {
    text: `Un angle mesure ${a}°. Est-il aigu, droit ou obtus ?`,
    format: "qcm",
    choices: shuffle(["aigu", "droit", "obtus", "plat"]),
    expected: [bonne],
    explanation: `Aigu : moins de 90°. Droit : 90°. Obtus : entre 90° et 180°.\n${a}° : ${bonne}.`,
  };
}

/* — Solides et volumes — */

export function solides(): AutoQuestion {
  const s = pick([
    { d: "a deux bases qui sont des disques identiques et parallèles", r: "cylindre" },
    { d: "a une base qui est un disque et un sommet", r: "cône" },
    { d: "a une base polygonale et toutes ses autres faces sont des triangles qui se rejoignent en un sommet", r: "pyramide" },
    { d: "a six faces qui sont toutes des carrés identiques", r: "cube" },
    { d: "a deux bases polygonales identiques et parallèles, reliées par des rectangles", r: "prisme droit" },
    { d: "a six faces rectangulaires, opposées deux à deux", r: "pavé droit" },
  ]);
  return {
    text: `Quel solide ${s.d} ?`,
    format: "qcm",
    choices: qcm(s.r, ["cylindre", "cône", "pyramide", "cube", "prisme droit", "pavé droit", "boule"]),
    expected: [s.r],
    explanation: `C'est un ${s.r}. On reconnaît un solide à ses BASES (disque ou polygone, une ou deux) et à la présence d'un sommet.`,
  };
}

export function volumes(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const c = entre(2, 6);
    return { text: `Quel est le volume d'un cube d'arête ${c} cm, en cm³ ?`, format: "short", expected: accepte(c ** 3), explanation: `Volume d'un cube = arête × arête × arête.\n$${c} \\times ${c} \\times ${c} = ${c ** 3}$ cm³.` };
  }
  if (cas === 2) {
    const L = entre(2, 8), l = entre(2, 5), h = entre(2, 5);
    return { text: `Un pavé droit mesure ${L} cm × ${l} cm × ${h} cm. Quel est son volume, en cm³ ?`, format: "short", expected: accepte(L * l * h), explanation: `Volume d'un pavé droit = longueur × largeur × hauteur.\n$${L} \\times ${l} \\times ${h} = ${L * l * h}$ cm³.` };
  }
  if (cas === 3) {
    const r = entre(1, 5), h = entre(2, 10);
    return {
      text: `Un cylindre a un rayon de ${r} cm et une hauteur de ${h} cm. Donner la valeur exacte de son volume en fonction de $\\pi$, en cm³.`,
      format: "short",
      expected: [`${r * r * h}π`, `${r * r * h} π`, `${r * r * h}pi`, `${r * r * h} pi`, `${r * r * h}×π`],
      explanation: `Volume d'un cylindre = aire de la base × hauteur = $\\pi \\times r^2 \\times h$.\n$\\pi \\times ${r}^2 \\times ${h} = ${r * r * h}\\pi$ cm³.`,
    };
  }
  const aireBase = entre(3, 12), h = entre(2, 9);
  return { text: `Un prisme droit a une base d'aire ${aireBase} cm² et une hauteur de ${h} cm. Quel est son volume, en cm³ ?`, format: "short", expected: accepte(aireBase * h), explanation: `Volume d'un prisme droit = aire de la base × hauteur.\n$${aireBase} \\times ${h} = ${aireBase * h}$ cm³.` };
}

/* — Probabilités et fréquences — */

/** « 1 boule rouge », « 3 boules rouges ». */
function boules(n: number, couleur: string): string {
  return n > 1 ? `${n} boules ${couleur}s` : `${n} boule ${couleur}`;
}

export function probabilites(): AutoQuestion {
  if (Math.random() < 0.5) {
    const r = entre(1, 6), b = entre(1, 6), v = entre(0, 4);
    const total = r + b + v;
    const coul = pick([{ n: r, c: "rouge" }, { n: b, c: "bleue" }]);
    const g = pgcd(coul.n, total);
    return {
      // ⛔ « 1 boules vertes » et « 6 boules rouges, 2 boules bleues, » sans « et » sortaient à la relecture (26/09).
      text: `Un sac contient ${boules(r, "rouge")}${v ? ", " : " et "}${boules(b, "bleue")}${v ? ` et ${boules(v, "verte")}` : ""}, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité qu'elle soit ${coul.c} ? (Écrire une fraction.)`,
      format: "short",
      expected: Array.from(new Set([`${coul.n}/${total}`, `${coul.n / g}/${total / g}`])),
      explanation: `Chaque boule a la même chance d'être tirée : probabilité = nombre de cas favorables ÷ nombre de cas possibles.\n$\\dfrac{${coul.n}}{${total}}$${g > 1 ? ` $= \\dfrac{${coul.n / g}}{${total / g}}$` : ""}.`,
    };
  }
  const ev = pick([
    { e: "obtenir un nombre pair", n: 3, cas: "2, 4, 6" },
    { e: "obtenir un multiple de 3", n: 2, cas: "3, 6" },
    { e: "obtenir 6", n: 1, cas: "6" },
    { e: "obtenir un nombre inférieur à 5", n: 4, cas: "1, 2, 3, 4" },
    { e: "obtenir un nombre premier", n: 3, cas: "2, 3, 5" },
  ]);
  const g = pgcd(ev.n, 6);
  return {
    text: `On lance un dé équilibré à six faces. Quelle est la probabilité d'${ev.e} ? (Écrire une fraction.)`,
    format: "short",
    expected: Array.from(new Set([`${ev.n}/6`, `${ev.n / g}/${6 / g}`])),
    explanation: `Six issues équiprobables ; les issues favorables sont ${ev.cas}.\n$\\dfrac{${ev.n}}{6}$${g > 1 ? ` $= \\dfrac{${ev.n / g}}{${6 / g}}$` : ""}.`,
  };
}

export function frequence(): AutoQuestion {
  const [k, n] = pick([[5, 25], [6, 30], [8, 40], [3, 12], [9, 36], [7, 28], [12, 48], [10, 50], [4, 20]] as const);
  const f = k / n;
  return {
    text: pick([
      `Dans une classe, ${k} des ${n} élèves portent des lunettes. Quelle est la fréquence des élèves à lunettes ? (Écrire un nombre décimal.)`,
      `Sur ${n} oiseaux observés, ${k} sont des mésanges. Quelle est la fréquence des mésanges ? (Écrire un nombre décimal.)`,
      `Une joueuse a réussi ${k} tirs sur ${n}. Quelle est la fréquence de ses tirs réussis ? (Écrire un nombre décimal.)`,
    ]),
    format: "short",
    expected: [...accepte(f), `${k}/${n}`, `${k / pgcd(k, n)}/${n / pgcd(k, n)}`, `${fr(f * 100)} %`],
    explanation: `Fréquence = effectif ÷ effectif total.\n$\\dfrac{${k}}{${n}} = ${fr(f)}$, soit ${fr(f * 100)} %.`,
  };
}

/* ═══════════════ CODAGE, ANGLES, ÉCRITURES, TRANSLATION — partagés avec la 5e et la 4e (26/09) ═══════════════ */
//
// Écrits pour la 5e et la 4e, remontés ici : la liste du DNB les demande
// aussi (codage d'une figure, angles opposés par le sommet, 1,2 = 6/5 = 120 %).
// 3e.ts est la source commune : la 5e et la 4e importent d'ici, jamais l'inverse.

function tex(n: number, d: number): string {
  return `\\dfrac{${n}}{${d}}`;
}

const NOMS_QUADRI = ["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"] as const;

export function ecrituresMultiples(): AutoQuestion {
  const [n, d] = pick([[1, 2], [1, 4], [3, 4], [3, 2], [5, 2], [6, 5], [1, 5], [2, 5], [7, 4], [5, 4], [7, 10], [3, 5], [9, 10], [4, 5], [7, 5]] as const);
  const dec = n / d;
  if (Math.random() < 0.5) {
    const sur = pick([10, 100] as const).valueOf();
    if ((dec * sur) % 1 !== 0) return ecrituresMultiples();
    return {
      text: `Compléter : $${fr(dec)} = \\dfrac{\\ldots}{${sur}}$.`,
      format: "short",
      expected: accepte(dec * sur),
      explanation: `$${fr(dec)} = ${fr(dec * sur)} \\div ${sur}$.\nDonc $${fr(dec)} = ${tex(dec * sur, sur)}$.`,
    };
  }
  const vrais = [`$${fr(dec)}$`, `$${tex(2 * n, 2 * d)}$`, `${fr(dec * 100)} %`];
  if (n > d) vrais.push(`$${Math.floor(n / d)} + ${tex(n % d, d)}$`);
  const faux = pick([`$${tex(d, n)}$`, `${fr(dec * 10)} %`, `$${tex(n, 10 * d)}$`, `$${fr(dec + 1)}$`]);
  return {
    text: `Parmi ces écritures, laquelle n'est PAS égale à $${tex(n, d)}$ ?`,
    format: "qcm",
    choices: qcm(faux, vrais),
    expected: [faux],
    explanation: `$${tex(n, d)} = ${n} \\div ${d} = ${fr(dec)} = ${fr(dec * 100)}$ %${n > d ? ` $= ${Math.floor(n / d)} + ${tex(n % d, d)}$` : ""}.\nL'intrus est ${faux}.`,
  };
}


export function angles5e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = entre(15, 165);
    return {
      text: `Deux angles sont opposés par le sommet. L'un mesure ${a}°. Combien mesure l'autre, en degrés ?`,
      format: "short",
      expected: accepte(a),
      explanation: `Deux angles opposés par le sommet ont la même mesure.\nL'autre mesure aussi ${a}°.`,
    };
  }
  if (cas === 2) {
    const a = 2 * entre(10, 85);
    return {
      text: `On trace la bissectrice d'un angle de ${a}°. Combien mesure chacun des deux angles obtenus, en degrés ?`,
      format: "short",
      expected: accepte(a / 2),
      explanation: `La bissectrice partage un angle en deux angles de même mesure.\n$${a} \\div 2 = ${a / 2}$°.`,
    };
  }
  const q = pick([
    { t: "Une équerre a un angle droit et un angle de 30°. Combien mesure son troisième angle, en degrés ?", r: 60 },
    { t: "Une équerre a un angle droit et un angle de 60°. Combien mesure son troisième angle, en degrés ?", r: 30 },
    { t: "Une équerre a un angle droit et un angle de 45°. Combien mesure son troisième angle, en degrés ?", r: 45 },
    { t: "Combien mesure un angle plein, en degrés ?", r: 360 },
  ]);
  return {
    text: q.t,
    format: "short",
    expected: accepte(q.r),
    explanation: q.r === 360 ? "Un angle plein fait un tour complet.\n360°." : `Une équerre est un triangle : ses angles font 180° en tout.\n$180 - 90 - ${90 - q.r} = ${q.r}$°.`,
  };
}


const TRIANGLES_5E = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["P", "Q", "R"]] as const;

export function triangles5e(): AutoQuestion {
  const [A, B, C] = pick(TRIANGLES_5E);
  const cas = entre(1, 3);
  if (cas === 1) {
    const f = pick([
      { t: `les côtés [${A}${B}] et [${A}${C}] portent le même codage`, r: "isocèle", e: `Deux côtés de même longueur : il est isocèle en ${A}.` },
      { t: "ses trois côtés portent le même codage", r: "équilatéral", e: "Trois côtés de même longueur : il est équilatéral." },
      { t: `un angle droit est codé en ${B}`, r: "rectangle", e: `Un angle droit : il est rectangle en ${B}.` },
      { t: `un angle droit est codé en ${A}, et [${A}${B}] et [${A}${C}] portent le même codage`, r: "rectangle isocèle", e: `Un angle droit en ${A} et deux côtés égaux issus de ${A} : il est rectangle isocèle en ${A}.` },
    ]);
    return {
      text: `Sur la figure du triangle ${A}${B}${C}, ${f.t}. Quelle est sa nature ?`,
      format: "qcm",
      choices: qcm(f.r, ["isocèle", "équilatéral", "rectangle", "rectangle isocèle", "quelconque"]),
      expected: [f.r],
      explanation: `On lit le codage : même trait = même longueur, petit carré = angle droit.\n${f.e}`,
    };
  }
  if (cas === 2) {
    const v = entre(15, 95) / 10;
    return {
      text: `Le point M est sur la médiatrice du segment [${A}${B}], et M${A} = ${fr(v)} cm. Combien mesure M${B}, en cm ?`,
      format: "short",
      expected: accepte(v),
      explanation: `Un point de la médiatrice d'un segment est à la même distance de ses deux extrémités.\nM${B} = M${A} = ${fr(v)} cm.`,
    };
  }
  const r = entre(15, 80) / 10;
  return {
    text: `O est le centre du cercle circonscrit au triangle ${A}${B}${C}, et O${A} = ${fr(r)} cm. Combien mesure O${C}, en cm ?`,
    format: "short",
    expected: accepte(r),
    explanation: `Le cercle circonscrit passe par les trois sommets : O${A}, O${B} et O${C} sont trois rayons.\nO${C} = ${fr(r)} cm.`,
  };
}


export function quadrilateres5e(): AutoQuestion {
  const nom = pick(["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"]);
  const f = pick([
    { t: `Sur la figure, les quatre côtés du quadrilatère ${nom} portent le même codage.`, r: "un losange", e: "Quatre côtés de même longueur : c'est un losange (on ne sait rien des angles)." },
    { t: `Sur la figure, les quatre angles du quadrilatère ${nom} sont codés droits.`, r: "un rectangle", e: "Quatre angles droits : c'est un rectangle (on ne sait rien des côtés)." },
    { t: `Sur la figure, les quatre côtés du quadrilatère ${nom} portent le même codage et ses quatre angles sont codés droits.`, r: "un carré", e: "Quatre côtés égaux ET quatre angles droits : c'est un carré." },
    { t: `Sur la figure, les côtés opposés du quadrilatère ${nom} sont parallèles deux à deux.`, r: "un parallélogramme", e: "Côtés opposés parallèles deux à deux : c'est un parallélogramme." },
    { t: `Le quadrilatère ${nom} a deux côtés parallèles, et deux seulement.`, r: "un trapèze", e: "Deux côtés parallèles (et pas les deux autres) : c'est un trapèze." },
    // Des lettres qu'aucun nom de NOMS n'emploie : pas de « IJKLK ».
    { t: `Le polygone ${nom}${pick(["V", "W"])} a 5 côtés.`, r: "un pentagone", e: "Cinq côtés : un pentagone (penta = 5)." },
    { t: `Le polygone ${nom}${pick(["VW", "XY"])} a 6 côtés.`, r: "un hexagone", e: "Six côtés : un hexagone (hexa = 6)." },
  ]);
  return {
    text: `${f.t} Quelle est la nature la plus précise que l'on peut affirmer ?`,
    format: "qcm",
    choices: qcm(f.r, ["un parallélogramme", "un rectangle", "un losange", "un carré", "un trapèze", "un pentagone", "un hexagone"]),
    expected: [f.r],
    explanation: `${f.e}\nOn ne conclut que ce que le codage PROUVE, pas ce que la figure semble montrer.`,
  };
}


export function droiteRelatifs(): AutoQuestion {
  const pas = pick([1, 0.5] as const).valueOf();
  // Jamais au bout de la droite (−4 ou 4 : on ne sait pas si elle continue) ;
  // avec un pas de 0,5, un demi entier, sinon la graduation ne sert à rien.
  let v = entre(-7, 7) * pas;
  while (v === 0 || v === 1 || Math.abs(v) >= 4 || (pas === 0.5 && Number.isInteger(v))) v = entre(-7, 7) * pas;
  const canvas = {
    kind: "number_line",
    min: -4,
    max: 4,
    step: pas,
    points: [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: v, label: "M", color: "#c2410c" },
    ],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true },
    size: { width: 440, height: 110 },
  } as unknown as CanvasFigure;
  return {
    text: "Quelle est l'abscisse du point M sur cette droite graduée ?",
    format: "short",
    expected: accepte(v),
    explanation: `On repère l'unité entre 0 et 1 : ${pas === 1 ? "chaque graduation vaut 1" : "elle est partagée en 2, chaque graduation vaut 0,5"}.\nM est à ${Math.abs(v / pas)} graduation${Math.abs(v / pas) > 1 ? "s" : ""} ${v < 0 ? "à gauche" : "à droite"} de 0 : son abscisse est ${fr(v)}.`,
    canvas,
  };
}


const NATURES = ["un parallélogramme", "un rectangle", "un losange", "un carré"] as const;

export function quadrilateres(): AutoQuestion {
  const nom = pick(NOMS_QUADRI);
  const [A, B, C, D] = nom.split("");
  const cas = pick([
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu.`, r: 0, e: "Des diagonales qui se coupent en leur milieu : c'est la propriété caractéristique du parallélogramme." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu et ont la même longueur.`, r: 1, e: "Même milieu : parallélogramme ; même longueur en plus : rectangle." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu et sont perpendiculaires.`, r: 2, e: "Même milieu : parallélogramme ; perpendiculaires en plus : losange." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu, ont la même longueur et sont perpendiculaires.`, r: 3, e: "Même milieu et même longueur : rectangle ; perpendiculaires en plus : c'est aussi un losange, donc un carré." },
    { t: `Le quadrilatère ${nom} a ses côtés opposés parallèles deux à deux.`, r: 0, e: "Côtés opposés parallèles deux à deux : c'est la définition du parallélogramme." },
    { t: `Le quadrilatère ${nom} a ses côtés opposés de même longueur deux à deux.`, r: 0, e: "Côtés opposés de même longueur : c'est une propriété caractéristique du parallélogramme." },
    { t: `Le quadrilatère ${nom} a ses quatre côtés de même longueur.`, r: 2, e: "Quatre côtés de même longueur : c'est un losange." },
    { t: `${nom} est un parallélogramme et ${A}${B} = ${B}${C}.`, r: 2, e: "Un parallélogramme qui a deux côtés consécutifs de même longueur est un losange." },
    { t: `${nom} est un parallélogramme et l'angle $\\widehat{${A}${B}${C}}$ est droit.`, r: 1, e: "Un parallélogramme qui a un angle droit est un rectangle." },
    { t: `${nom} est un losange et l'angle $\\widehat{${B}${C}${D}}$ est droit.`, r: 3, e: "Un losange qui a un angle droit est aussi un rectangle : c'est un carré." },
    { t: `${nom} est un rectangle et ${A}${B} = ${B}${C}.`, r: 3, e: "Un rectangle qui a deux côtés consécutifs de même longueur est aussi un losange : c'est un carré." },
    { t: `${nom} est un parallélogramme et ses diagonales [${A}${C}] et [${B}${D}] ont la même longueur.`, r: 1, e: "Un parallélogramme dont les diagonales ont la même longueur est un rectangle." },
    { t: `${nom} est un parallélogramme et ses diagonales [${A}${C}] et [${B}${D}] sont perpendiculaires.`, r: 2, e: "Un parallélogramme dont les diagonales sont perpendiculaires est un losange." },
  ]);
  const bonne = NATURES[cas.r];
  return {
    text: `${cas.t} Quelle est sa nature, la plus précise possible ?`,
    format: "qcm",
    choices: [...NATURES],
    expected: [bonne],
    explanation: `${cas.e}\n${nom} est ${bonne}.`,
  };
}


/* — Fractions et décimaux : ce que la liste du DNB demande en plus (26/09) — */

/** « Simplifier, comparer des fractions, calculer avec des fractions. » */
export function fractions3e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const [n, d] = pick([[2, 3], [3, 4], [2, 5], [4, 5], [5, 6], [3, 7], [5, 8], [7, 9], [4, 7], [5, 9]] as const);
    const k = entre(2, 9);
    return {
      text: `Écrire $${tex(n * k, d * k)}$ sous forme irréductible.`,
      format: "short",
      expected: [`${n}/${d}`],
      explanation: `${n * k} et ${d * k} sont tous deux dans la table de ${k} : on divise en haut et en bas par ${k}.\n$${tex(n * k, d * k)} = ${tex(n, d)}$.`,
    };
  }
  if (cas === 2) {
    const [a, b] = pick([[2, 3], [3, 4], [1, 2], [2, 5], [3, 5], [4, 7]] as const);
    const [c, d] = pick([[3, 4], [5, 6], [2, 3], [1, 3], [5, 7], [3, 8]] as const);
    const n = a * c, D = b * d, g = pgcd(n, D);
    return {
      text: `Calculer $${tex(a, b)} \\times ${tex(c, d)}$. (Donner une fraction.)`,
      format: "short",
      expected: Array.from(new Set([`${n}/${D}`, D / g === 1 ? `${n / g}` : `${n / g}/${D / g}`])),
      explanation: `On multiplie les numérateurs entre eux et les dénominateurs entre eux.\n$${tex(a * c, b * d)}$${g > 1 ? ` $= ${D / g === 1 ? n / g : tex(n / g, D / g)}$` : ""}.`,
    };
  }
  if (cas === 3) {
    const [a, b] = pick([[2, 3], [3, 4], [1, 2], [3, 5], [5, 6], [2, 7]] as const);
    const [c, d] = pick([[1, 3], [3, 4], [2, 5], [1, 4], [5, 2], [4, 3]] as const);
    const n = a * d, D = b * c, g = pgcd(n, D);
    return {
      text: `Calculer $${tex(a, b)} \\div ${tex(c, d)}$. (Donner une fraction.)`,
      format: "short",
      expected: Array.from(new Set([`${n}/${D}`, D / g === 1 ? `${n / g}` : `${n / g}/${D / g}`])),
      explanation: `Diviser par une fraction, c'est multiplier par son inverse : $${tex(a, b)} \\times ${tex(d, c)}$.\n$= ${tex(n, D)}$${g > 1 ? ` $= ${D / g === 1 ? n / g : tex(n / g, D / g)}$` : ""}.`,
    };
  }
  const [b, d] = pick([[3, 4], [4, 6], [2, 5], [6, 9], [5, 10], [3, 5], [4, 10], [6, 8]] as const);
  let a = entre(1, 2 * b - 1), c = entre(1, 2 * d - 1);
  while (a * d === c * b) { a = entre(1, 2 * b - 1); c = entre(1, 2 * d - 1); }
  const L = (b * d) / pgcd(b, d);
  const moins = Math.random() < 0.5;
  const s = moins ? (a * L) / b - (c * L) / d : (a * L) / b + (c * L) / d;
  const g = pgcd(Math.abs(s), L);
  return {
    text: `Calculer $${tex(a, b)} ${moins ? "-" : "+"} ${tex(c, d)}$. (Donner une fraction.)`,
    format: "short",
    expected: Array.from(new Set([`${s}/${L}`, L / g === 1 ? `${s / g}` : `${s / g}/${L / g}`])),
    explanation: `Même dénominateur d'abord : ${L}. $${tex(a, b)} = ${tex((a * L) / b, L)}$ et $${tex(c, d)} = ${tex((c * L) / d, L)}$.\n$${tex((a * L) / b, L)} ${moins ? "-" : "+"} ${tex((c * L) / d, L)} = ${s < 0 ? `-${tex(-s, L)}` : tex(s, L)}$${g > 1 ? ` $= ${L / g === 1 ? s / g : s < 0 ? `-${tex(-s / g, L / g)}` : tex(s / g, L / g)}$` : ""}.`,
  };
}

/** « Comparer des nombres décimaux et calculer avec des nombres décimaux (y compris négatifs). » */
export function decimaux3e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const paire = pick([
      () => { const a = entre(10, 99) / 10; return [a, Math.round((a + 0.05) * 100) / 100]; },
      () => { const e = entre(1, 9); return [e + 0.5, e + 0.45]; },
      () => { const e = entre(1, 9); return [-(e + 0.3), -(e + 0.25)]; },
      () => { const e = entre(1, 9); return [-e - 0.1, -e + 0.9]; },
      () => { const e = entre(1, 5); return [-e, -(e + 0.5)]; },
    ])();
    const [x, y] = shuffle(paire);
    const grand = Math.max(x, y);
    return {
      text: `Quel est le plus grand des deux nombres ${fr(x)} et ${fr(y)} ?`,
      format: "short",
      expected: accepte(grand),
      explanation: `On compare chiffre par chiffre, rang par rang (${fr(x).includes(",") || fr(y).includes(",") ? "on peut compléter par des zéros : 2,5 = 2,50" : "d'abord la partie entière"}). Entre deux négatifs, le plus grand est le plus PROCHE de zéro.\nLe plus grand est ${fr(grand)}.`,
    };
  }
  if (cas === 2) {
    const a = entre(-40, 40) / 10, b = entre(-40, 40) / 10;
    if (a === 0 || b === 0 || Number.isInteger(a) && Number.isInteger(b)) return decimaux3e();
    const moins = Math.random() < 0.5;
    const r = Math.round((moins ? a - b : a + b) * 10) / 10;
    const pa = a < 0 ? `(${fr(a)})` : fr(a), pb = b < 0 ? `(${fr(b)})` : fr(b);
    return {
      text: `Calculer $${pa} ${moins ? "-" : "+"} ${pb}$.`,
      format: "short",
      expected: accepte(r),
      explanation: `${moins ? `Soustraire, c'est ajouter l'opposé : $${pa} + ${-b < 0 ? `(${fr(-b)})` : fr(-b)}$. ` : ""}On compte en dixièmes, avec la règle des signes de l'addition.\n$${pa} ${moins ? "-" : "+"} ${pb} = ${fr(r)}$.`,
    };
  }
  const a = pick([-0.5, -0.2, -0.3, 0.4, -1.5, 2.5, -0.1] as const).valueOf();
  const b = pick([-4, -6, 3, 8, -2, 10, -20] as const).valueOf();
  const r = Math.round(a * b * 100) / 100;
  const pa = a < 0 ? `(${fr(a)})` : fr(a), pb = b < 0 ? `(${b})` : `${b}`;
  return {
    text: `Calculer $${pa} \\times ${pb}$.`,
    format: "short",
    expected: accepte(r),
    explanation: `Le signe d'abord : ${(a < 0) === (b < 0) ? "deux facteurs de même signe, produit positif" : "deux facteurs de signes contraires, produit négatif"}. Puis $${fr(Math.abs(a))} \\times ${Math.abs(b)} = ${fr(Math.abs(r))}$.\nRésultat : ${fr(r)}.`,
  };
}

/* — Transformations sur quadrillage (canvas `transformation`, celui du coach de 3e) — */

type Pt = { x: number; y: number };

/** Une figure de 3 ou 4 sommets, NON symétrique (sinon image et figure se confondent), dans la moitié gauche. */
function figureQuelconque(): Pt[] {
  for (;;) {
    const n = pick([3, 4] as const);
    const pts = Array.from({ length: n }, () => ({ x: entre(1, 4), y: entre(1, 8) }));
    const cles = new Set(pts.map((p) => `${p.x},${p.y}`));
    if (cles.size < n) continue;
    const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
    if (Math.max(...xs) - Math.min(...xs) < 2 || Math.max(...ys) - Math.min(...ys) < 2) continue;
    // Pas de symétrie propre évidente : aucun axe vertical ou horizontal ne la laisse en place.
    const cx = Math.min(...xs) + Math.max(...xs), cy = Math.min(...ys) + Math.max(...ys);
    const invV = pts.every((p) => cles.has(`${cx - p.x},${p.y}`));
    const invH = pts.every((p) => cles.has(`${p.x},${cy - p.y}`));
    const invC = pts.every((p) => cles.has(`${cx - p.x},${cy - p.y}`));
    if (invV || invH || invC) continue;
    return pts;
  }
}

function canvasTransfo(transformation: string, source: Pt[], image: Pt[], extra: Record<string, unknown> = {}) {
  return {
    kind: "transformation",
    transformation,
    grid: { rows: 10, cols: 10 },
    source: { label: "F", points: source },
    image: { label: "F'", points: image },
    ...extra,
  } as unknown as CanvasFigure;
}

/**
 * Symétrie axiale sur quadrillage (5e) : F' est-elle la symétrique de F par
 * rapport à la droite tracée ? Le piège : une copie GLISSÉE, qui n'est pas retournée.
 */
export function symetrieQuadrillage(): AutoQuestion {
  const F = figureQuelconque();
  const axe = 5;
  const vraie = F.map((p) => ({ x: 2 * axe - p.x, y: p.y }));
  const bonne = Math.random() < 0.5;
  const glisse = F.map((p) => ({ x: p.x + 5, y: p.y }));
  const image = bonne ? vraie : glisse;
  return {
    text: "La figure F' est-elle la symétrique de la figure F par rapport à la droite tracée ? Répondre par oui ou par non.",
    format: "short",
    expected: bonne ? ["oui", "Oui"] : ["non", "Non"],
    explanation: bonne
      ? "Chaque sommet de F' est à la même distance de l'axe que son sommet dans F, de l'autre côté, sur la même ligne du quadrillage : F' est retournée, comme dans un miroir.\nOui, c'est la symétrique."
      : "Une symétrie axiale RETOURNE la figure, comme un miroir : le sommet le plus proche de l'axe doit le rester de l'autre côté. Ici F' a seulement glissé vers la droite, sans se retourner.\nNon, c'est une translation.",
    canvas: canvasTransfo("symetrie_axiale", F, image, { axis: { type: "vertical", x: axe } }),
  };
}

/**
 * Quelle transformation relie F et F' ? — sans tracer l'axe, le centre ni la
 * flèche. La 4e : symétrie axiale ou demi-tour ; la 3e : la translation en plus.
 */
function quelleTransformation(avecTranslation: boolean): AutoQuestion {
  const F = figureQuelconque();
  const cas = pick([
    { nom: "une symétrie axiale", kind: "symetrie_axiale", img: F.map((p) => ({ x: 10 - p.x, y: p.y })), signe: "la figure est retournée, comme dans un miroir" },
    { nom: "une symétrie centrale", kind: "symetrie_centrale", img: F.map((p) => ({ x: 10 - p.x, y: 9 - p.y })), signe: "la figure a fait un demi-tour : elle a la tête en bas" },
    ...(avecTranslation
      ? [{ nom: "une translation", kind: "translation", img: F.map((p) => ({ x: p.x + 5, y: p.y })), signe: "la figure a glissé sans tourner ni se retourner" }]
      : []),
  ]);
  const choix = avecTranslation
    ? ["une symétrie axiale", "une symétrie centrale", "une translation"]
    : ["une symétrie axiale", "une symétrie centrale"];
  return {
    text: `Quelle transformation permet de passer de la figure F à la figure F' ?`,
    format: "qcm",
    choices: shuffle(choix),
    expected: [cas.nom],
    explanation: `On suit un sommet, et on regarde surtout le SENS de la figure : une translation le garde, une symétrie axiale le retourne (miroir), une symétrie centrale fait faire un demi-tour.\nIci, ${cas.signe} : c'est ${cas.nom}.`,
    canvas: canvasTransfo(cas.kind, F, cas.img, { display: { showGrid: true, showLabels: true } }),
  };
}

export function quelleTransformation4e(): AutoQuestion {
  return quelleTransformation(false);
}

export function quelleTransformation3e(): AutoQuestion {
  return quelleTransformation(true);
}

/* ═══════════════ 10. RÉDIGER UNE RÉPONSE (la « question en gras ») ═══════════════ */

// ⭐ Depuis 2026, la maîtrise de la langue vaut 2 points sur 20 à tous les
// sujets ; au DNB elle est « plus particulièrement évaluée dans les réponses aux
// questions en gras » (message de l'IPR, 24/09/2026). Ces questions demandent
// une PHRASE : le vocabulaire juste, une justification, l'orthographe.

const CRITERE_ORTHO = "Ma phrase est complète, avec une majuscule, un point et sans faute d'orthographe.";

export function redigerPythagore(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]] as const);
  return {
    text: `Dans le triangle ${A}${B}${C}, ${A}${B} = ${a} cm, ${A}${C} = ${b} cm et ${B}${C} = ${c} cm. **Justifier que le triangle ${A}${B}${C} est rectangle.**`,
    format: "redaction",
    expected: [],
    modele:
      `Le plus grand côté est [${B}${C}]. D'une part, $${B}${C}^2 = ${c}^2 = ${c * c}$. ` +
      `D'autre part, $${A}${B}^2 + ${A}${C}^2 = ${a * a} + ${b * b} = ${c * c}$. ` +
      `Comme $${B}${C}^2 = ${A}${B}^2 + ${A}${C}^2$, d'après la réciproque du théorème de Pythagore, le triangle ${A}${B}${C} est rectangle en ${A}.`,
    criteres: [
      "J'ai calculé séparément le carré du plus grand côté et la somme des deux autres carrés.",
      "J'ai écrit « d'après la réciproque du théorème de Pythagore » et nommé l'angle droit.",
      CRITERE_ORTHO,
    ],
    explanation: "On compare le carré du plus grand côté à la somme des carrés des deux autres : s'ils sont égaux, la RÉCIPROQUE (pas le théorème) permet de conclure.",
  };
}

export function redigerPremier(): AutoQuestion {
  const [p, q] = pick([[3, 17], [3, 19], [7, 13], [3, 23], [7, 11], [3, 29], [11, 13], [3, 31], [7, 17], [7, 19], [13, 17], [11, 17], [3, 37], [7, 23], [11, 19]] as const);
  const n = p * q;
  return {
    text: `**Expliquer pourquoi ${n} n'est pas un nombre premier.**`,
    format: "redaction",
    expected: [],
    modele: `${n} n'est pas un nombre premier, car il est divisible par ${p} : $${n} = ${p} \\times ${q}$. Il a donc un autre diviseur que 1 et lui-même.`,
    criteres: [
      `J'ai donné un diviseur de ${n} autre que 1 et ${n}, avec le calcul qui le prouve.`,
      "J'ai rappelé qu'un nombre premier n'a que deux diviseurs : 1 et lui-même.",
      CRITERE_ORTHO,
    ],
    explanation: `Un seul diviseur « en trop » suffit à prouver qu'un nombre n'est pas premier. Ici, $${n} = ${p} \\times ${q}$.`,
  };
}

export function redigerPourcentages(): AutoQuestion {
  const p = pick([10, 20, 25, 50] as const);
  const prix = pick([100, 200, 400] as const);
  const apres = prix * (1 + p / 100);
  const fin = apres * (1 - p / 100);
  return {
    text: `Le prix d'un vélo de ${prix} € augmente de ${p} %, puis baisse de ${p} %. **Le vélo revient-il à ${prix} € ? Justifier.**`,
    format: "redaction",
    expected: [],
    modele:
      `Non. Après la hausse, le vélo coûte $${prix} \\times ${fr(1 + p / 100)} = ${fr(apres)}$ €. ` +
      `La baisse de ${p} % porte sur ${fr(apres)} €, pas sur ${prix} € : il coûte ensuite $${fr(apres)} \\times ${fr(1 - p / 100)} = ${fr(fin)}$ €, ce qui est moins que ${prix} €.`,
    criteres: [
      "J'ai répondu par oui ou par non, puis j'ai calculé les deux prix successifs.",
      "J'ai expliqué que la baisse s'applique au NOUVEAU prix.",
      CRITERE_ORTHO,
    ],
    explanation: "Un pourcentage se calcule toujours sur la valeur du moment : la baisse s'applique à un prix plus grand, elle retire donc plus que la hausse n'avait ajouté.",
  };
}

export function redigerMediane(): AutoQuestion {
  const valeurs = shuffle([entre(8, 10), entre(11, 12), entre(13, 14), entre(15, 16), entre(17, 19)]);
  const tri = [...valeurs].sort((a, b) => a - b);
  return {
    text: `Les températures relevées sur cinq jours sont : ${valeurs.join(" ; ")} (en °C). Un élève affirme que la médiane est ${valeurs[2]} °C, car c'est la valeur du milieu. **A-t-il raison ? Justifier.**`,
    format: "redaction",
    expected: [],
    modele:
      valeurs[2] === tri[2]
        ? `Il trouve le bon nombre, mais son raisonnement est faux : il faut d'abord ranger les valeurs dans l'ordre (${tri.join(" ; ")}). La médiane est la 3ᵉ valeur rangée, soit ${tri[2]} °C.`
        : `Non. Il faut d'abord ranger les valeurs dans l'ordre croissant : ${tri.join(" ; ")}. La médiane est la 3ᵉ valeur rangée, soit ${tri[2]} °C, et non ${valeurs[2]} °C.`,
    criteres: [
      "J'ai rangé les valeurs dans l'ordre avant de chercher celle du milieu.",
      "J'ai donné la bonne médiane, avec son unité.",
      CRITERE_ORTHO,
    ],
    explanation: "La médiane est la valeur du milieu de la série RANGÉE. Sans rangement, « la valeur du milieu » ne veut rien dire.",
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes3e: AutoNiveau = {
  classe: "3e",
  label: "3e",
  duree: 20,
  examen: "Première partie du brevet : 20 minutes, sans calculatrice",
  // ⭐ Les thèmes suivent les rubriques de la LISTE INDICATIVE d'automatismes
  // (DNB, octobre 2025) — plus large que les deux sujets 0. Une série en tire 9
  // au hasard, plus la question à rédiger : 10 questions, comme les 9 du sujet 0
  // plus la phrase où compte la langue.
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    // Nombres et calculs
    { id: "fractions", label: "Fractions et écritures", generateurs: [fractionDe, ecritures, droiteGraduee, fractions3e, ecrituresMultiples] },
    { id: "calcul", label: "Calcul mental", generateurs: [priorites, carres, notationScientifique, decimaux3e] },
    { id: "entiers", label: "Divisibilité et nombres entiers", generateurs: [divisibilite, expressionsDeN] },
    { id: "litteral", label: "Calcul littéral", generateurs: [simplifierDevelopper, valeurExpression] },
    { id: "equations", label: "Équations", generateurs: [equationQuelCalcul, equationResoudre, equationsSimples] },
    // Proportionnalité, fonctions
    { id: "pourcentages", label: "Pourcentages", generateurs: [pctEffectif, pctComplement, pctProportion, evolutionPct] },
    { id: "proportionnalite", label: "Proportionnalité", generateurs: [proportionnalite] },
    { id: "graphique", label: "Lire un graphique", generateurs: [lireValeur, lireVariation, lireInstant] },
    // Grandeurs
    { id: "durees", label: "Durées et vitesses", generateurs: [convertirDurees, vitesseDuree, vitesseDistance] },
    { id: "unites", label: "Conversions d'unités", generateurs: [conversions] },
    // Espace et géométrie
    { id: "repere", label: "Repère et transformations", generateurs: [coordonnees, droiteRelatifs, symetries, quelleTransformation3e] },
    { id: "codage", label: "Codage d'une figure", generateurs: [triangles5e, quadrilateres5e, quadrilateres] },
    { id: "angles", label: "Angles", generateurs: [sommeAngles, anglesVocabulaire, angles5e] },
    { id: "mesures", label: "Périmètres et aires", generateurs: [perimetres, aires] },
    { id: "solides", label: "Solides et volumes", generateurs: [solides, volumes] },
    { id: "pythagore", label: "Pythagore et cosinus", generateurs: [pythagore, trigoQuelCalcul, cosinusLongueur] },
    { id: "thales", label: "Thalès", generateurs: [thalesEgalite, thalesLongueur] },
    // Données et probabilités
    { id: "stats", label: "Moyenne, médiane, fréquence", generateurs: [moyenne, mediane, frequence] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    // Algorithmique
    { id: "scratch", label: "Scratch", generateurs: [programmeCalcul, polygone] },
    // La langue
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerPythagore, redigerPremier, redigerPourcentages, redigerMediane] },
  ],
};
