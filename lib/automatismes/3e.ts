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

function fractionDe(): AutoQuestion {
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

function priorites(): AutoQuestion {
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

function droiteGraduee(): AutoQuestion {
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

function pctEffectif(): AutoQuestion {
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

function pctComplement(): AutoQuestion {
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

function pctProportion(): AutoQuestion {
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

function convertirDurees(): AutoQuestion {
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

function vitesseDuree(): AutoQuestion {
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

function vitesseDistance(): AutoQuestion {
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

function moyenne(): AutoQuestion {
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

function mediane(): AutoQuestion {
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

function lireValeur(): AutoQuestion {
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

function lireVariation(): AutoQuestion {
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

function lireInstant(): AutoQuestion {
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

function sommeAngles(): AutoQuestion {
  const [A, B, C] = pick(NOMS_TRIANGLE);
  const cas = entre(1, 3);
  const pointsTri = { A: { x: 40, y: 190 }, B: { x: 250, y: 190 }, C: { x: 250, y: 50 } };
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

function perimetres(): AutoQuestion {
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

function aires(): AutoQuestion {
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

function pythagore(): AutoQuestion {
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
function trigoQuelCalcul(): AutoQuestion {
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

function cosinusLongueur(): AutoQuestion {
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

function thalesEgalite(): AutoQuestion {
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

function thalesLongueur(): AutoQuestion {
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

function equationQuelCalcul(): AutoQuestion {
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

function equationResoudre(): AutoQuestion {
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

function valeurExpression(): AutoQuestion {
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

function programmeCalcul(): AutoQuestion {
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

function polygone(): AutoQuestion {
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

function ecritures(): AutoQuestion {
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

function carres(): AutoQuestion {
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

function notationScientifique(): AutoQuestion {
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

function divisibilite(): AutoQuestion {
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

function expressionsDeN(): AutoQuestion {
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

function simplifierDevelopper(): AutoQuestion {
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

function equationsSimples(): AutoQuestion {
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

function evolutionPct(): AutoQuestion {
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

function proportionnalite(): AutoQuestion {
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

function conversions(): AutoQuestion {
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

function coordonnees(): AutoQuestion {
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

function symetries(): AutoQuestion {
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

function anglesVocabulaire(): AutoQuestion {
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

function solides(): AutoQuestion {
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

function volumes(): AutoQuestion {
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

function probabilites(): AutoQuestion {
  if (Math.random() < 0.5) {
    const r = entre(1, 6), b = entre(1, 6), v = entre(0, 4);
    const total = r + b + v;
    const coul = pick([{ n: r, c: "rouge" }, { n: b, c: "bleue" }]);
    const g = pgcd(coul.n, total);
    return {
      text: `Un sac contient ${r} boules rouges, ${b} boules bleues${v ? ` et ${v} boules vertes` : ""}, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité qu'elle soit ${coul.c} ? (Écrire une fraction.)`,
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

function frequence(): AutoQuestion {
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

/* ═══════════════ 10. RÉDIGER UNE RÉPONSE (la « question en gras ») ═══════════════ */

// ⭐ Depuis 2026, la maîtrise de la langue vaut 2 points sur 20 à tous les
// sujets ; au DNB elle est « plus particulièrement évaluée dans les réponses aux
// questions en gras » (message de l'IPR, 24/09/2026). Ces questions demandent
// une PHRASE : le vocabulaire juste, une justification, l'orthographe.

const CRITERE_ORTHO = "Ma phrase est complète, avec une majuscule, un point et sans faute d'orthographe.";

function redigerPythagore(): AutoQuestion {
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

function redigerPremier(): AutoQuestion {
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

function redigerPourcentages(): AutoQuestion {
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

function redigerMediane(): AutoQuestion {
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
    { id: "fractions", label: "Fractions et écritures", generateurs: [fractionDe, ecritures, droiteGraduee] },
    { id: "calcul", label: "Calcul mental", generateurs: [priorites, carres, notationScientifique] },
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
    { id: "repere", label: "Repère et symétries", generateurs: [coordonnees, symetries] },
    { id: "angles", label: "Angles", generateurs: [sommeAngles, anglesVocabulaire] },
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
