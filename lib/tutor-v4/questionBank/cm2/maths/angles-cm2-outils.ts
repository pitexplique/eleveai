// MESURER UN ANGLE AU CM2 (15/11/2026) — micro `angle_mesurer`.
//
// Avant : 10 items, dont un oui/non à 2 choix et deux questions qui donnaient la
// mesure dans l'énoncé (« L'angle mesure 45°. Quelle mesure faut-il écrire ? »).
// Ici, au CM2, le degré et le RAPPORTEUR sont au programme : on lit un angle sur un
// rapporteur dessiné (simple ou double), on choisit la bonne graduation, on classe
// (aigu < 90°, droit = 90°, obtus entre 90° et 180°, plat = 180°), on estime, on
// compare, on additionne des angles collés (★3).
//
// Vocabulaire de la vidéo (manim/scripts/cm2/angle.py, écran 3) : « le centre sur le
// sommet, le zéro sur un côté, on lit sur l'autre ». Son exercice type (lire 60° au
// rapporteur) est posé par m1 (★1) et m5 (★2).
//
// Pièges = vraies erreurs d'élève : lire la mauvaise graduation (180 − mesure),
// compter une graduation de trop, confondre aigu et obtus, soustraire au lieu
// d'additionner, compléter à 90° au lieu de 180°, croire que 10 h fait 100°.
// ★1 : phrase courte, une étape. ★2 : lecture fine, comparaison. ★3 : situation, plusieurs étapes.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, melange, qcm, typo, un } from "./trous-outils";

/** Fabrique : ids `cm2_angle_mesurer_g<n>` (les anciens `_tpl_<n>` restent libres). */
const g = (n: number, difficulty: 1 | 2 | 3, hint: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_angle_mesurer_g${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "angle",
    microId: "angle_mesurer",
    difficulty,
    theme: "neutral",
    hint: typo(hint),
    tags: ["cm2", "angle", "mesurer", "rapporteur", "template"],
    generate,
  }) as TutorBankItemV4;

const LETTRES = ["A", "B", "C", "D", "E", "F", "K", "M", "N", "O", "P", "R", "S", "T", "U"];
const noms = () => {
  const [v, l, r] = melange(LETTRES).slice(0, 3);
  return { v, l, r, angle: `${l}${v}${r}`, cote: `${v}${r}`, autre: `${v}${l}` };
};
type Noms = ReturnType<typeof noms>;

const etapes = (methode: string, calcul: string, conclusion: string) => typo(`Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`);

/** Nature d'un angle d'après sa mesure. */
const nature = (d: number) => (d < 90 ? "aigu" : d === 90 ? "droit" : d < 180 ? "obtus" : "plat");

/** Leurres en degrés : distincts, entre 5° et 180°, jamais la bonne réponse. */
const deg = (juste: number, faux: number[]) => ({
  juste: `${juste}°`,
  faux: [...new Set(faux)].filter((f) => f !== juste && f >= 5 && f <= 180).map((f) => `${f}°`),
});

/** Un angle posé sur le rapporteur : centre sur le sommet, 0 sur le côté de droite. */
const rapporteur = (d: number, n: Noms, o: { double?: boolean; lu?: boolean; label?: string } = {}): CanvasFigure =>
  ({
    kind: "angle",
    angle: {
      angleDeg: d,
      labels: { vertex: n.v, left: n.l, right: n.r, angle: o.label ?? "" },
      display: {
        showLabels: true,
        showMeasure: Boolean(o.label),
        showArc: true,
        showRightAngle: false,
        placeholder: o.label ? "" : "?",
        showProtractor: true,
        protractorScale: o.double ? "double" : "simple",
        ...(o.lu ? { protractorStep: "reading" as const } : {}),
      },
    },
  }) as CanvasFigure;

/** Un angle seul, sans rapporteur : mesure écrite ou « ? ». */
const seul = (d: number, n: Noms, label = ""): CanvasFigure =>
  ({
    kind: "angle",
    angle: {
      angleDeg: d,
      labels: { vertex: n.v, left: n.l, right: n.r, angle: label },
      display: { showLabels: true, showMeasure: Boolean(label), showArc: true, showRightAngle: d === 90, placeholder: label ? "" : "?" },
    },
  }) as CanvasFigure;

type A = { deg: number; nom?: string; rotation?: number; longueur?: number };
const cote = (angles: A[]): CanvasFigure =>
  ({ kind: "deux_angles", mode: "cote_a_cote", angles: angles.map((a) => ({ ...a, rotation: a.rotation ?? un([0, 0, 10, 350]), longueur: a.longueur ?? entre(70, 90) })) }) as CanvasFigure;
const colles = (angles: A[]): CanvasFigure => ({ kind: "deux_angles", mode: "juxtaposes", angles: angles.map((a) => ({ deg: a.deg, nom: a.nom })) }) as CanvasFigure;

const METHODE = "le centre du rapporteur sur le sommet, le 0 sur un côté, on lit sur l'autre côté.";
const BONNE_GRAD = "on lit sur la graduation qui part de 0 sur le premier côté.";
const PRENOMS = ["Léa", "Hugo", "Inès", "Nathan", "Aïcha", "Malo", "Chloé", "Yanis", "Jade", "Lucas", "Sofia", "Kenji", "Maëlys", "Tom", "Nour", "Enzo", "Lina", "Sacha", "Rayan", "Zoé"];

/* ═════════════════════════════ ★1 ═════════════════════════════ */

/** Lire au rapporteur simple, sur une graduation chiffrée (30°, 60°…). Exercice type de la vidéo. */
const m1 = g(1, 1, "Le 0 est sur un côté : lis le nombre où passe l'autre côté.", () => {
  const n = noms();
  const d = un([30, 60, 60, 90, 120, 150]);
  const { juste, faux } = deg(d, [d + 30, d - 30, d + 10, d - 10, 180 - d]);
  const qst = un([
    `Combien mesure l'angle ${n.angle} ?`,
    `Lis la mesure de l'angle ${n.angle}.`,
    `Quelle est la mesure de l'angle ${n.angle} ?`,
    `Que lit-on sur le rapporteur ?`,
    `Le rapporteur est bien placé. Combien mesure cet angle ?`,
  ]);
  const intro = un(["", "", "Le rapporteur est posé sur l'angle.", "Regarde bien le rapporteur.", `Le centre est sur ${n.v}.`, `Le 0 est sur le côté ${n.cote}.`, "Voici un angle et un rapporteur.", "On mesure au rapporteur."]);
  return qcm(juste, faux, etapes(METHODE, `le côté ${n.cote} passe par 0, le côté ${n.autre} passe par ${d}.`, `l'angle ${n.angle} mesure ${d}°.`), `${intro} ${qst}`.trim(), rapporteur(d, n, { lu: Math.random() < 0.4 }));
});

/** La nature d'un angle d'après sa mesure. */
const NATURES = ["un angle aigu", "un angle droit", "un angle obtus", "un angle plat"];
const m2 = g(2, 1, "Aigu : moins de 90°. Droit : 90°. Obtus : entre 90° et 180°. Plat : 180°.", () => {
  const n = noms();
  const sorte = un(["aigu", "aigu", "obtus", "obtus", "droit", "plat"]);
  const d = sorte === "aigu" ? 5 * entre(3, 17) : sorte === "obtus" ? 5 * entre(19, 35) : sorte === "droit" ? 90 : 180;
  const qst = un([
    `Un angle mesure ${d}°. C'est…`,
    `Quelle est la nature d'un angle de ${d}° ?`,
    `L'angle ${n.angle} mesure ${d}°. Quel angle est-ce ?`,
    `Comment appelle-t-on un angle de ${d}° ?`,
    `Un angle de ${d}°, c'est…`,
    `On a mesuré ${d}°. Quel type d'angle est-ce ?`,
    `Cet angle mesure ${d}°. Il est…`,
    `Le rapporteur indique ${d}°. C'est…`,
    `Classe un angle de ${d}°.`,
    `Quel mot convient pour un angle de ${d}° ?`,
    `Un angle fait ${d}°. Comment s'appelle-t-il ?`,
  ]);
  const regle = d < 90 ? `${d} < 90` : d === 90 ? "90° pile" : d < 180 ? `90 < ${d} < 180` : "180° pile : les deux côtés forment une ligne droite";
  return qcm(`un angle ${sorte}`, NATURES, etapes("on compare la mesure à 90° (angle droit) et à 180° (angle plat).", `${regle}.`, `un angle de ${d}° est un angle ${sorte}.`), cap(qst), seul(d, n, `${d}°`));
});

/** Estimer à l'œil : des propositions très écartées. */
const m3 = g(3, 1, "Compare d'abord l'angle à un angle droit (90°).", () => {
  const n = noms();
  const d = 10 * entre(2, 17);
  const cands = melange([...new Set([d - 80, d - 60, d + 60, d + 80, 90, 180, 10, 45, 135].filter((x) => Math.abs(x - d) >= 40 && x >= 10 && x <= 180))]);
  const qst = un([
    `À peu près, combien mesure l'angle ${n.angle} ?`,
    `Sans rapporteur, estime l'angle ${n.angle}.`,
    `Quelle mesure est la plus proche de cet angle ?`,
    `Estime la mesure de cet angle.`,
    `Quelle est la mesure approchée de l'angle ${n.angle} ?`,
    `Juste à l'œil : combien mesure cet angle ?`,
    `Quelle mesure semble juste pour cet angle ?`,
    `Sans mesurer, quelle mesure choisir ?`,
  ]);
  const avant = un(["", "", "Pas de rapporteur.", "Regarde l'ouverture.", "Pense à l'angle droit."]);
  const cmp = d < 90 ? "il est plus petit qu'un angle droit" : d === 90 ? "c'est un angle droit" : "il est plus grand qu'un angle droit";
  return qcm(`environ ${d}°`, cands.slice(0, 3).map((x) => `environ ${x}°`), etapes("on compare l'angle à l'angle droit, puis à l'angle plat.", `${cmp}.`, `l'angle ${n.angle} mesure environ ${d}°.`), `${avant} ${qst}`.trim(), seul(d, n));
});

/** Les repères à connaître. */
type Repere = { q: string[]; j: string; f: string[]; d: number };
const REPERES: Repere[] = [
  { q: ["Combien mesure un angle droit ?", "Un angle droit mesure…", "Quelle est la mesure d'un angle droit ?"], j: "90°", f: ["45°", "100°", "180°"], d: 90 },
  { q: ["Combien mesure un angle plat ?", "Un angle plat mesure…", "Quelle est la mesure d'un angle plat ?"], j: "180°", f: ["90°", "100°", "360°"], d: 180 },
  { q: ["Combien mesure la moitié d'un angle droit ?", "Un demi-angle droit mesure…"], j: "45°", f: ["50°", "90°", "30°"], d: 45 },
  { q: ["Combien mesure le tiers d'un angle droit ?", "On partage un angle droit en 3 angles égaux. Chacun mesure…"], j: "30°", f: ["3°", "60°", "33°"], d: 30 },
  { q: ["Combien mesure la moitié d'un angle plat ?", "On partage un angle plat en 2 angles égaux. Chacun mesure…"], j: "90°", f: ["180°", "45°", "100°"], d: 90 },
  { q: ["Un angle aigu mesure…", "Quelle phrase décrit un angle aigu ?"], j: "moins de 90°", f: ["entre 90° et 180°", "exactement 90°", "exactement 180°"], d: 50 },
  { q: ["Un angle obtus mesure…", "Quelle phrase décrit un angle obtus ?"], j: "entre 90° et 180°", f: ["moins de 90°", "exactement 90°", "plus de 180°"], d: 130 },
  { q: ["Deux angles droits collés forment un angle de…", "On colle deux angles droits par un côté. On obtient un angle de…"], j: "180°", f: ["90°", "100°", "360°"], d: 180 },
];
const m4 = g(4, 1, "Angle droit : 90°. Angle plat : 180°.", () => {
  const r = un(REPERES);
  const n = noms();
  return qcm(r.j, r.f, etapes("on retient deux repères : l'angle droit (90°) et l'angle plat (180°).", `la réponse est ${r.j}.`, `${r.j}.`), un(r.q), seul(r.d, n));
});

/* ═════════════════════════════ ★2 ═════════════════════════════ */

/** Rapporteur double : graduations de 10 en 10, le piège 180 − mesure. */
const LECT = [20, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 160];
const m5 = g(5, 2, "Prends la graduation qui part de 0 sur le côté où le rapporteur est posé.", () => {
  const n = noms();
  const d = un(LECT);
  const { juste, faux } = deg(d, [180 - d, d + 10, d - 10, d + 20, 180 - d + 10]);
  const intro = un(["", "", `Le centre est sur ${n.v}, le 0 sur le côté ${n.cote}.`, "Le rapporteur a deux graduations.", "Attention aux deux graduations.", "Compte les graduations de 10 en 10.", "Le rapporteur est bien placé.", "Choisis la bonne graduation."]);
  const qst = un([`Combien mesure l'angle ${n.angle} ?`, `Lis la mesure de l'angle ${n.angle}.`, `Quelle est la mesure de cet angle ?`, `Que mesure l'angle ${n.angle} ?`, `Quelle mesure lis-tu ?`, `Donne la mesure de l'angle ${n.angle}.`]);
  return qcm(juste, faux, etapes(METHODE, `${BONNE_GRAD} Le côté ${n.cote} est sur le 0 bleu (extérieur) ; l'autre côté passe par ${d} sur la graduation bleue (et par ${180 - d} sur l'orange).`, `l'angle ${n.angle} mesure ${d}° : un angle ${nature(d)}${d < 90 ? ", donc moins de 90°" : ", donc plus de 90°"}.`), `${intro} ${qst}`.trim(), rapporteur(d, n, { double: true }));
});

/** Lire ET classer. */
const m6 = g(6, 2, "Lis la mesure, puis compare-la à 90°.", () => {
  const n = noms();
  const d = un(LECT);
  const o = 180 - d;
  const opp = (x: number) => (x < 90 ? "obtus" : "aigu");
  const qst = un([`Quelle est la mesure de l'angle ${n.angle}, et sa nature ?`, `Lis l'angle ${n.angle} et dis sa nature.`, `Quelle phrase est juste ?`, `Que peut-on dire de l'angle ${n.angle} ?`, `Mesure et nature de cet angle ?`, `Choisis la bonne mesure et le bon nom.`]);
  const intro = un(["", "", "Lis le rapporteur.", "Deux graduations : attention.", `Le 0 est sur le côté ${n.cote}.`, "Le rapporteur est bien posé."]);
  return qcm(
    `${d}°, un angle ${nature(d)}`,
    [`${o}°, un angle ${nature(o)}`, `${d}°, un angle ${opp(d)}`, `${o}°, un angle ${nature(d)}`],
    etapes(METHODE, `on lit ${d} sur la graduation qui part de 0 sur ${n.cote} ; ${d}${d < 90 ? " < 90" : " > 90"}.`, `l'angle ${n.angle} mesure ${d}° : c'est un angle ${nature(d)}.`),
    `${intro} ${qst}`.trim(),
    rapporteur(d, n, { double: true }),
  );
});

/** Comparer deux angles dont on connaît la mesure (le plus grand a parfois les côtés courts). */
const m7 = g(7, 2, "Compare les mesures en degrés, pas la longueur des côtés.", () => {
  const [x, y] = melange(LETTRES).slice(0, 2);
  let a = 0;
  let b = 0;
  do { a = 5 * entre(4, 34); b = 5 * entre(4, 34); } while (Math.abs(a - b) < 15);
  const grand = a > b ? x : y;
  const lg = (d: number) => (d === Math.max(a, b) ? 45 : 100);
  const figure = cote([{ deg: a, nom: `${x} : ${a}°`, longueur: lg(a) }, { deg: b, nom: `${y} : ${b}°`, longueur: lg(b) }]);
  if (Math.random() < 0.5) {
    const qst = un([`L'angle ${x} mesure ${a}°, l'angle ${y} mesure ${b}°. Lequel est le plus grand ?`, `Angle ${x} : ${a}°. Angle ${y} : ${b}°. Quel angle est le plus grand ?`, `Quel est le plus grand angle : ${x} (${a}°) ou ${y} (${b}°) ?`, `L'angle ${x} mesure ${a}° et l'angle ${y} ${b}°. Lequel est le plus ouvert ?`, `On a mesuré ${x} = ${a}° et ${y} = ${b}°. Quel angle est le plus grand ?`, `Angle ${x} : ${a}°. Angle ${y} : ${b}°. Lequel a la plus grande ouverture ?`]);
    return qcm(`L'angle ${grand}`, [`L'angle ${grand === x ? y : x}`, "Ils sont égaux"], etapes("on compare les mesures en degrés.", `${Math.max(a, b)}° > ${Math.min(a, b)}°. La longueur des côtés ne compte pas.`, `l'angle ${grand} est le plus grand.`), qst, figure);
  }
  const e = Math.abs(a - b);
  const qst = un([`L'angle ${x} mesure ${a}°, l'angle ${y} mesure ${b}°. Quel est l'écart entre les deux ?`, `De combien de degrés l'angle ${grand} dépasse-t-il l'autre ? (${x} : ${a}°, ${y} : ${b}°)`, `Angle ${x} : ${a}°. Angle ${y} : ${b}°. Combien de degrés de différence ?`, `L'angle ${x} mesure ${a}° et l'angle ${y} ${b}°. Calcule l'écart.`, `On a mesuré ${x} = ${a}° et ${y} = ${b}°. Quelle est la différence ?`]);
  const { juste, faux } = deg(e, [a + b, e + 10, e - 10, 180 - e]);
  return qcm(juste, faux, etapes("l'écart, c'est la plus grande mesure moins la plus petite.", `${Math.max(a, b)} − ${Math.min(a, b)} = ${e}.`, `l'écart est de ${e}°.`), qst, figure);
});

/** Ranger trois angles d'après leurs mesures. */
const m8 = g(8, 2, "Compare les mesures : le plus petit nombre de degrés, c'est le plus petit angle.", () => {
  const n = melange(LETTRES).slice(0, 3);
  let degs: number[] = [];
  do { degs = [0, 1, 2].map(() => 5 * entre(3, 35)); } while (!degs.every((p, i) => degs.every((q, j) => i === j || Math.abs(p - q) >= 15)));
  const croissant = Math.random() < 0.5;
  const tri = [0, 1, 2].sort((i, j) => (croissant ? degs[i] - degs[j] : degs[j] - degs[i])).map((i) => n[i]);
  const faux = [[...tri].reverse(), [tri[1], tri[0], tri[2]], [tri[0], tri[2], tri[1]], [tri[2], tri[0], tri[1]]].map((l) => l.join(", "));
  const liste = n.map((x, i) => `${x} = ${degs[i]}°`).join(", ");
  const qst = croissant ? un(["Range-les du plus petit au plus grand.", "Quel est l'ordre croissant ?", "Range ces angles du moins ouvert au plus ouvert.", "Quel ordre va du plus petit au plus grand ?", "Classe-les dans l'ordre croissant."]) : un(["Range-les du plus grand au plus petit.", "Quel est l'ordre décroissant ?", "Range ces angles du plus ouvert au moins ouvert.", "Quel ordre va du plus grand au plus petit ?", "Classe-les dans l'ordre décroissant."]);
  return qcm(tri.join(", "), faux, etapes("on compare les mesures en degrés.", liste + ".", `${croissant ? "du plus petit au plus grand" : "du plus grand au plus petit"} : ${tri.join(", ")}.`), `${un(["Voici trois angles :", "Trois angles mesurent :", "On a mesuré trois angles :", "Au rapporteur, on trouve :", "Mesures relevées :"])} ${liste}. ${qst}`, cote(n.map((x, i) => ({ deg: degs[i], nom: x }))));
});

/** Quel dessin montre l'angle annoncé ? */
const m9 = g(9, 2, "Repère d'abord les angles plus petits et plus grands qu'un angle droit.", () => {
  const n = melange(LETTRES).slice(0, 3);
  let degs: number[] = [];
  do { degs = [0, 1, 2].map(() => 10 * entre(2, 17)); } while (!degs.every((p, i) => degs.every((q, j) => i === j || Math.abs(p - q) >= 40)));
  const k = entre(0, 2);
  const qst = un([`Quel angle mesure environ ${degs[k]}° ?`, `Lequel de ces angles mesure à peu près ${degs[k]}° ?`, `Sans rapporteur : quel angle fait environ ${degs[k]}° ?`, `Un de ces angles mesure environ ${degs[k]}°. Lequel ?`, `Trouve l'angle d'environ ${degs[k]}°.`, `Quel dessin montre un angle d'environ ${degs[k]}° ?`, `Estime : lequel fait environ ${degs[k]}° ?`]);
  return qcm(`L'angle ${n[k]}`, n.filter((_, i) => i !== k).map((x) => `L'angle ${x}`), etapes("on compare chaque angle à l'angle droit (90°) et à l'angle plat (180°).", `${degs[k]}° est ${degs[k] < 90 ? "moins qu'un angle droit" : "plus qu'un angle droit"} ; les autres angles en sont loin.`, `c'est l'angle ${n[k]}.`), qst, cote(n.map((x, i) => ({ deg: degs[i], nom: x }))));
});

/* ═════════════════════════════ ★3 ═════════════════════════════ */

/** Des angles collés : la somme, ou ce qui manque pour un angle droit / plat. */
const COLLES = [
  "Deux parts de pizza sont collées.", "Deux parts de tarte se touchent sur le plat.", "Une architecte dessine deux angles collés.", "Un charpentier assemble deux pièces de bois.",
  "Une couturière plie un tissu en deux angles.", "Deux lames d'un éventail sont ouvertes.", "Un menuisier découpe deux coins de planche.", "Une géomètre trace deux angles côte à côte.",
  "Deux parts de gâteau sont posées l'une contre l'autre.", "Un ingénieur règle deux bras de robot.", "Une carreleuse pose deux carreaux taillés.", "Un jardinier trace deux allées qui partent du même point.",
  "Une pâtissière coupe deux parts de galette.", "Un pilote suit deux routes depuis le même point.", "Une élève trace deux angles qui se touchent.", "Deux rayons de lumière partent d'un phare.",
];
const m10 = g(10, 3, "Des angles collés par un côté : on additionne leurs mesures.", () => {
  const ctx = un(COLLES);
  const cas = un(["somme", "somme", "trois", "plat", "droit"] as const);
  if (cas === "somme") {
    const a = 5 * entre(3, 16);
    const b = 5 * entre(3, 18);
    const s = a + b;
    const qst = un(["Quel angle forment-ils ensemble ?", "Combien mesure le grand angle obtenu ?", "Combien mesurent les deux angles réunis ?"]);
    const { juste, faux } = deg(s, [Math.abs(a - b), s + 10, s - 10, 180 - s]);
    return qcm(juste, faux, etapes("des angles collés par un côté s'additionnent.", `${a} + ${b} = ${s}.`, `ensemble, ils forment un angle de ${s}°, un angle ${nature(s)}.`), `${ctx} Les angles mesurent ${a}° et ${b}°. ${qst}`, colles([{ deg: a, nom: `${a}°` }, { deg: b, nom: `${b}°` }]));
  }
  if (cas === "trois") {
    const [a, b, c] = [0, 1, 2].map(() => 5 * entre(3, 10));
    const s = a + b + c;
    const { juste, faux } = deg(s, [a + b, s + 10, s - 10, 180 - s]);
    return qcm(juste, faux, etapes("des angles collés par un côté s'additionnent.", `${a} + ${b} + ${c} = ${s}.`, `ensemble, ils forment un angle de ${s}°.`), `${un(["Trois parts de pizza sont collées.", "Trois lames d'un éventail sont ouvertes.", "Une architecte dessine trois angles collés.", "Trois parts de tarte se touchent."])} Les angles mesurent ${a}°, ${b}° et ${c}°. ${un(["Quel angle forment-ils ensemble ?", "Combien mesure l'angle total ?", "Combien mesurent-ils en tout ?"])}`, colles([{ deg: a, nom: `${a}°` }, { deg: b, nom: `${b}°` }, { deg: c, nom: `${c}°` }]));
  }
  const tot = cas === "plat" ? 180 : 90;
  const a = cas === "plat" ? un([5 * entre(5, 17), 5 * entre(19, 31)]) : 5 * entre(3, 15);
  const r = tot - a;
  const autre = cas === "plat" ? 90 - a : 180 - a;
  const { juste, faux } = deg(r, [autre, a, r + 10, r - 10]);
  const forme = cas === "plat" ? "un angle plat" : "un angle droit";
  return qcm(juste, faux, etapes(`${forme} mesure ${tot}° ; on cherche ce qui manque.`, `${tot} − ${a} = ${r}.`, `l'autre angle mesure ${r}°.`), `${ctx} Ensemble, les deux angles forment ${forme}. L'un mesure ${a}°. ${un(["Combien mesure l'autre ?", "Quelle est la mesure de l'autre angle ?", "Combien de degrés pour le second ?"])}`, colles([{ deg: a, nom: `${a}°` }, { deg: r, nom: "?" }]));
});

/** Un élève lit le rapporteur : a-t-il raison ? */
const m11 = g(11, 3, "Quelle graduation part de 0 sur le côté où le rapporteur est posé ?", () => {
  const n = noms();
  const d = un(LECT);
  const p = un(PRENOMS);
  const juste = Math.random() < 0.35;
  const lu = juste ? d : 180 - d;
  const verbe = un(["lit", "trouve", "écrit", "annonce"]);
  const qst = un(["Est-ce juste ?", "Qu'en penses-tu ?", "Que lui répondre ?", "Quelle phrase est juste ?"]);
  const ok = `Oui : l'angle mesure ${d}°`;
  const mauvaise = `Non : mauvaise graduation, l'angle mesure ${d}°`;
  const fauxL = [
    juste ? `Non : mauvaise graduation, l'angle mesure ${180 - d}°` : `Oui : l'angle mesure ${180 - d}°`,
    "Non : un angle se lit toujours à 90°",
    juste ? `Non : il faut lire le plus grand nombre, ${Math.max(d, 180 - d)}°` : `Oui : on lit toujours le plus grand nombre`,
  ];
  if (juste && d > 90) fauxL[2] = `Non : il faut lire le plus petit nombre, ${180 - d}°`;
  return qcm(
    juste ? ok : mauvaise,
    fauxL,
    etapes(METHODE, `${BONNE_GRAD} Ici le côté ${n.cote} est sur le 0 de la graduation bleue : on lit ${d}, pas ${180 - d}. Un angle ${nature(d)} mesure ${d < 90 ? "moins" : "plus"} de 90°.`, `l'angle ${n.angle} mesure ${d}° : ${p} ${juste ? "a raison" : "se trompe de graduation"}.`),
    `${p} mesure l'angle ${n.angle} et ${verbe} ${lu}°. ${qst}`,
    rapporteur(d, n, { double: true }),
  );
});

/** L'horloge : angle entre les aiguilles à une heure pile (un tour = 360°, 12 heures → 30° par heure). */
const ouvH = (h: number) => 30 * Math.min(h, 12 - h);
const LIEUX = ["l'horloge de la classe", "la pendule de la cuisine", "l'horloge de la gare", "le réveil de Hugo", "l'horloge de la mairie", "la montre d'une infirmière", "l'horloge du gymnase", "la pendule d'un boulanger", "l'horloge d'un aéroport", "la montre d'un pompier"];
const m12 = g(12, 3, "Entre deux nombres voisins du cadran, il y a 30° (360 ÷ 12).", () => {
  const h = un([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
  const o = ouvH(h);
  const lieu = un(LIEUX);
  const aig = (nom: string) => (h <= 6 ? { deg: o, nom, rotation: 90 - o, longueur: 85 } : { deg: o, nom, rotation: 90, longueur: 85 });
  if (Math.random() < 0.6) {
    const { juste, faux } = deg(o, [h * 10, h * 30, o + 30, o - 30, 90]);
    return qcm(juste, faux, etapes("un tour complet fait 360° ; 360 ÷ 12 = 30 : 30° entre deux nombres voisins.", `à ${h} h, la petite aiguille est à ${Math.min(h, 12 - h)} nombre(s) de la grande : ${Math.min(h, 12 - h)} × 30 = ${o}.`, `les aiguilles forment un angle de ${o}°, un angle ${nature(o)}.`), `Il est ${h} h pile sur ${lieu}. ${un(["Quel angle forment les aiguilles ?", "Combien mesure l'angle entre les deux aiguilles ?", "Quel est l'angle entre la petite et la grande aiguille ?"])}`, cote([aig(`${h} h`)]));
  }
  const autres = melange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((x) => ouvH(x) !== o)).slice(0, 3).map((x) => `${x} h`);
  return qcm(`${h} h`, autres, etapes("30° entre deux nombres voisins du cadran.", `${o} ÷ 30 = ${o / 30} : la petite aiguille est à ${o / 30} nombre(s) de la grande, sur le 12.`, `à ${h} h, les aiguilles forment un angle de ${o}°.`), `Sur ${lieu}, la grande aiguille est sur le 12 et les aiguilles forment un angle de ${o}°. ${un(["Quelle heure peut-il être ?", "Quelle heure pile convient ?", "Laquelle de ces heures convient ?"])}`, cote([aig("?")]));
});

/** Une contrainte de métier : quelle mesure convient ? */
type Besoin = { qui: string; veut: string; ok: (d: number) => boolean };
const BESOINS: Besoin[] = [
  { qui: "Une charpentière veut un toit au sommet obtus.", veut: "un angle obtus", ok: (d) => d > 90 && d < 180 },
  { qui: "Un couturier veut des ciseaux ouverts en angle aigu.", veut: "un angle aigu", ok: (d) => d < 90 },
  { qui: "Un peintre doit ouvrir son escabeau à moins de 40°.", veut: "moins de 40°", ok: (d) => d < 40 },
  { qui: "Une ingénieure doit régler le bras d'un robot entre 100° et 130°.", veut: "entre 100° et 130°", ok: (d) => d > 100 && d < 130 },
  { qui: "Un maître-nageur doit incliner une chaise longue à plus de 120°.", veut: "plus de 120°", ok: (d) => d > 120 },
  { qui: "Une informaticienne doit ouvrir son écran entre 95° et 115°.", veut: "entre 95° et 115°", ok: (d) => d > 95 && d < 115 },
  { qui: "Un grutier doit lever le bras de la grue entre 30° et 60°.", veut: "entre 30° et 60°", ok: (d) => d > 30 && d < 60 },
  { qui: "Une architecte dessine une rampe de moins de 15°.", veut: "moins de 15°", ok: (d) => d < 15 },
  { qui: "Un menuisier coupe un coin obtus pour une étagère.", veut: "un angle obtus", ok: (d) => d > 90 && d < 180 },
  { qui: "Une photographe doit ouvrir les pieds de son trépied à moins de 50°.", veut: "moins de 50°", ok: (d) => d < 50 },
  { qui: "Un skateur cherche une rampe inclinée entre 20° et 35°.", veut: "entre 20° et 35°", ok: (d) => d > 20 && d < 35 },
  { qui: "Une gymnaste veut un tremplin aigu, de plus de 20°.", veut: "un angle aigu de plus de 20°", ok: (d) => d > 20 && d < 90 },
];
const m13 = g(13, 3, "Teste chaque mesure : est-elle dans les limites demandées ?", () => {
  const b = un(BESOINS);
  const n = melange(LETTRES).slice(0, 3);
  const tous = Array.from({ length: 34 }, (_, i) => 5 * (i + 2));
  const bons = melange(tous.filter(b.ok));
  const mauvais = melange(tous.filter((d) => !b.ok(d) && d !== 90));
  const degs = melange([bons[0], mauvais[0], mauvais.find((d) => Math.abs(d - mauvais[0]) >= 15) ?? mauvais[1]]);
  const k = degs.findIndex(b.ok);
  const liste = n.map((x, i) => `${x} = ${degs[i]}°`).join(", ");
  return qcm(
    `La position ${n[k]}`,
    n.filter((_, i) => i !== k).map((x) => `La position ${x}`),
    etapes(`on compare chaque mesure à la contrainte : ${b.veut}.`, `${liste} : seule la position ${n[k]} (${degs[k]}°) convient.`, `la position ${n[k]}.`),
    `${b.qui} ${un(["Il y a trois positions :", "Trois réglages sont possibles :", "On mesure trois positions :"])} ${liste}. ${un(["Laquelle convient ?", "Quelle position choisir ?", "Laquelle donne " + b.veut + " ?"])}`,
    cote(n.map((x, i) => ({ deg: degs[i], nom: x }))),
  );
});

/** Lire au rapporteur, puis calculer : on ouvre ou on referme de quelques degrés. */
const OUVRE = [
  { qui: "Un grutier", o: "le bras de sa grue" }, { qui: "Une ingénieure", o: "le bras d'un robot" }, { qui: "Un étudiant", o: "sa lampe de bureau" },
  { qui: "Une informaticienne", o: "l'écran de son ordinateur" }, { qui: "Un menuisier", o: "une porte de placard" }, { qui: "Un maçon", o: "son mètre pliant" },
  { qui: "Un dessinateur", o: "son compas" }, { qui: "Une pilote", o: "le volet d'une maquette d'avion" }, { qui: "Un mécanicien", o: "le capot d'une voiture" },
  { qui: "Une fleuriste", o: "un éventail de feuilles" }, { qui: "Un pêcheur", o: "sa canne posée sur un support" }, { qui: "Une musicienne", o: "le couvercle d'un piano" },
];
const m14 = g(14, 3, "Lis d'abord l'angle au rapporteur, puis ajoute ou enlève.", () => {
  const n = noms();
  const s = un(OUVRE);
  const d = un(LECT.filter((x) => x <= 140));
  const plus = Math.random() < 0.6;
  const e = 5 * entre(2, plus ? Math.min(7, (175 - d) / 5) : Math.min(7, (d - 10) / 5));
  const r = plus ? d + e : d - e;
  const lu180 = plus ? 180 - d + e : 180 - d - e;
  const { juste, faux } = deg(r, [lu180, plus ? d - e : d + e, d, r + 10]);
  return qcm(
    juste,
    faux,
    etapes(`${METHODE} Puis on calcule.`, `on lit ${d}° ; ${d} ${plus ? "+" : "−"} ${e} = ${r}.`, `l'angle mesure maintenant ${r}°.`),
    `${s.qui} mesure l'angle ${`de ${s.o}`.replace(/^de le /, "du ").replace(/^de une /, "d'une ").replace(/^de un /, "d'un ")} au rapporteur, puis ${plus ? un(["ouvre encore de", "augmente l'angle de", "agrandit l'angle de"]) : un(["referme un peu de", "diminue l'angle de", "réduit l'angle de"])} ${e}°. ${un(["Combien mesure l'angle maintenant ?", "Quelle est la nouvelle mesure ?", "Quel angle obtient-on ?"])}`,
    rapporteur(d, n, { double: true }),
  );
});

export const angleMesurerGabarits: TutorBankItemV4[] = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14];
