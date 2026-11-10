// ═══════════════════════════════════════════════════════════════════════════
// CM1 et CM2 — micro « decimal_droite » : placer et lire un décimal (dixièmes)
// sur une droite graduée. Générateurs communs aux deux banques
// (cm1/maths/decimaux.bank.ts, cm2/maths/nombres-decimaux.bank.ts).
//
// ⛔ 08/11/2026 — mesuré avant la vidéo commune CM1/CM2 « decimal_droite » :
// 9 squelettes en CM1, 3 en CM2, 15 à 18 répétitions sur 20. Et la figure
// DONNAIT LA RÉPONSE : chaque dixième était écrit sous son trait (« 0,7 » juste
// sous le point « ? »). Ici, seuls les deux entiers sont écrits ; les dixièmes
// sont de petits traits sans nombre (`minorStep`), comme dans la vidéo.
//
// Même méthode que la vidéo : je pars de l'entier de gauche et je compte les
// SAUTS (pas le trait du départ) ; chaque saut vaut 1 dixième, 0,1.
// ═══════════════════════════════════════════════════════════════════════════

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

type Niveau = "cm1" | "cm2";
type Etoile = 2 | 3;

const tire = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
const entre = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const melange = <T,>(t: T[]): T[] => melangeEnPlace([...t]);
const dec = (n: number, k: number) => `${n},${k}`;
const rang = (k: number) => (k === 1 ? "1er" : `${k}e`);

type Prenom = { nom: string; f: boolean };
const PRENOMS: Prenom[] = [
  { nom: "Léa", f: true }, { nom: "Sami", f: false }, { nom: "Nina", f: true }, { nom: "Hugo", f: false },
  { nom: "Maëlys", f: true }, { nom: "Adam", f: false }, { nom: "Jade", f: true }, { nom: "Noé", f: false },
  { nom: "Inaya", f: true }, { nom: "Liam", f: false }, { nom: "Chloé", f: true }, { nom: "Yanis", f: false },
  { nom: "Lou", f: true }, { nom: "Tom", f: false }, { nom: "Awa", f: true }, { nom: "Rayan", f: false },
];
const LETTRES = ["A", "B", "C", "D", "E", "M", "N", "P", "R", "T"];

/** La droite du coach : les entiers écrits, les dixièmes en petits traits sans nombre. */
function droite(n: number, points: { value: number; label: string }[]) {
  return {
    kind: "number_line" as const,
    min: n,
    max: n + 1,
    step: 1,
    minorStep: 0.1,
    points: points.map((p) => ({ ...p, value: Math.round(p.value * 10) / 10, color: "#2563eb" })),
    display: { showTicks: true, showValues: true, showPoints: points.length > 0, showPointLabels: true, showZero: true },
    size: { width: 340, height: 130 },
  };
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** L'entier de gauche : 0 au début du CM1, plus loin ensuite. */
function entierGauche(niv: Niveau, etoile: Etoile) {
  if (etoile === 2) return niv === "cm1" ? 0 : entre(0, 3);
  return niv === "cm1" ? entre(1, 9) : entre(2, 15);
}

// ── Les tournures (★2 : la droite seule ; ★3 : une situation) ───────────────
const DECOUPE = [
  (n: number) => `Entre ${n} et ${n + 1}, la droite est partagée en 10 parts égales.`,
  (n: number) => `De ${n} à ${n + 1}, il y a 10 petits sauts égaux.`,
  (n: number) => `La droite va de ${n} à ${n + 1}. Elle est coupée en 10 parts égales.`,
  (n: number) => `Sur cette droite, l'unité de ${n} à ${n + 1} est coupée en 10.`,
  (n: number) => `Regarde la droite : entre ${n} et ${n + 1}, il y a 10 parts égales.`,
  (n: number) => `Cette droite graduée montre ${n} et ${n + 1}, avec 10 parts égales entre les deux.`,
];
const QUESTION_LIRE = [
  (L: string) => `Quel nombre est au point ${L} ?`,
  (L: string) => `Quel nombre décimal repère le point ${L} ?`,
  (L: string) => `Écris le nombre du point ${L}.`,
  (L: string) => `Quel nombre se cache sous le point ${L} ?`,
  (L: string) => `Le point ${L} est à quel nombre ?`,
  (L: string) => `Trouve le nombre placé en ${L}.`,
];

type Situation = { u: string; texte: (p: Prenom, n: number, L: string) => string; question: (p: Prenom, L: string) => string };
const SITUATIONS: Situation[] = [
  { u: "km", texte: (p, n, L) => `${p.nom} fait du vélo. Sur son plan, la route va du kilomètre ${n} au kilomètre ${n + 1}, coupée en 10 parts égales. ${p.f ? "Elle" : "Il"} s'arrête au point ${L}.`, question: () => "À quel kilomètre s'arrête-t-on ?" },
  { u: "L", texte: (p, n, L) => `La cuve ${p.nom.match(/^[AEIOUÉ]/) ? "d'" : "de "}${p.nom} est graduée de ${n} L à ${n + 1} L, en 10 parts égales. L'eau monte jusqu'au point ${L}.`, question: () => "Combien de litres y a-t-il ?" },
  { u: "m", texte: (p, n, L) => `Au saut en longueur, la règle du bac à sable va de ${n} m à ${n + 1} m, en 10 parts égales. ${p.nom} retombe au point ${L}.`, question: () => "Quelle longueur a-t-on sautée ?" },
  { u: "kg", texte: (p, n, L) => `Le cadran de la balance va de ${n} kg à ${n + 1} kg, coupé en 10 parts égales. L'aiguille montre le point ${L}.`, question: () => "Quelle masse indique la balance ?" },
  { u: "km", texte: (p, n, L) => `Le bus de ${p.nom} roule entre la borne ${n} km et la borne ${n + 1} km. Entre les deux, 10 parts égales. Il est au point ${L}.`, question: () => "À quel kilomètre est le bus ?" },
  { u: "cm", texte: (p, n, L) => `${p.nom} mesure une chenille sur sa règle, entre ${n} cm et ${n + 1} cm, coupés en 10 millimètres. Le bout est au point ${L}.`, question: () => "Combien mesure la chenille, en cm ?" },
];

/** Lire le nombre d'un point placé sur un dixième. */
export function genLire(niv: Niveau, etoile: Etoile): TutorGeneratedQuestionV4 {
  const n = entierGauche(niv, etoile);
  const k = entre(1, 9);
  const L = tire(LETTRES);
  const v = dec(n, k);
  const canvas = droite(n, [{ value: n + k / 10, label: L }]);
  const e = expl(
    "Entre deux entiers partagés en 10 parts égales, chaque saut vaut 1 dixième : 0,1.",
    `Je pars de ${n} et je compte les sauts jusqu'au point ${L}, sans compter le trait du départ.`,
    `Le point ${L} est à ${k} saut${k > 1 ? "s" : ""} après ${n} : ${n} et ${k} dixième${k > 1 ? "s" : ""}.`,
    `Le nombre du point ${L} est ${v}.`,
  );
  if (etoile === 2) {
    return {
      text: `${tire(DECOUPE)(n)} ${tire(QUESTION_LIRE)(L)}`,
      format: "short",
      expected: [v, v.replace(",", ".")],
      comparator: "number_equal",
      explanation: e,
      canvas,
    };
  }
  const p = tire(PRENOMS);
  const s = tire(SITUATIONS);
  // ★3 : un QCM dont les leurres sont les erreurs de la micro.
  const leurres = [dec(n, k + 1 > 9 ? k - 1 : k + 1), `${n},0${k}`, dec(n + 1, k), dec(n, 10 - k)].filter((x) => x !== v);
  const vus = new Set<string>();
  const trois = melange(leurres.filter((x) => !vus.has(x) && vus.add(x))).slice(0, 3);
  return {
    text: `${s.texte(p, n, L)} ${s.question(p, L)}`,
    format: "qcm",
    choices: melange([v, ...trois].map((x) => `${x} ${s.u}`)),
    expected: [`${v} ${s.u}`],
    comparator: "mcq_exact",
    explanation: e,
    canvas,
  };
}

const QUESTION_PLACER = [
  (x: string, L: string[]) => `Quel point est placé à ${x} : ${L.join(", ")} ?`,
  (x: string) => `Où se trouve ${x} ? Choisis le bon point.`,
  (x: string) => `Lequel de ces points repère le nombre ${x} ?`,
  (x: string) => `Montre ${x} sur la droite : quel point choisis-tu ?`,
  (x: string) => `${x} est sur un des points. Lequel ?`,
  (x: string) => `Quel point a pour nombre ${x} ?`,
];

/** Placer : trois points, un seul est au bon dixième. */
export function genPlacer(niv: Niveau, etoile: Etoile): TutorGeneratedQuestionV4 {
  const n = entierGauche(niv, etoile);
  const k = entre(2, 8);
  const v = dec(n, k);
  // Les leurres : un saut de trop (le trait du départ compté) et le compte fait depuis la droite.
  let faux = [k + 1, 10 - k, k - 1].filter((x) => x !== k && x >= 1 && x <= 9);
  faux = [...new Set(faux)].slice(0, 2);
  if (faux.length < 2) faux = [k - 1, k + 1];
  const noms = melange(["A", "B", "C"]);
  const positions = melange([k, ...faux]);
  const pts = positions.map((r, i) => ({ value: n + r / 10, label: noms[i] }));
  const bon = pts[positions.indexOf(k)].label;
  const tri = [...noms].sort();
  return {
    text: `${tire(DECOUPE)(n)} ${tire(QUESTION_PLACER)(v, tri)}`,
    format: "qcm",
    choices: tri,
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      "Entre deux entiers partagés en 10 parts égales, chaque saut vaut 0,1.",
      `${v}, c'est ${n} et ${k} dixièmes : je pars de ${n} et je fais ${k} sauts.`,
      `Le point ${bon} est au ${rang(k)} petit trait après ${n}.`,
      `${v} est au point ${bon}.`,
    ),
    canvas: droite(n, pts),
  };
}

const VERIF = [
  (p: Prenom, x: string, r: number, n: number) => `${p.nom} place ${x} au ${rang(r)} petit trait après ${n}. A-t-${p.f ? "elle" : "il"} raison ?`,
  (p: Prenom, x: string, r: number, n: number) => `Pour placer ${x}, ${p.nom} part de ${n} et compte ${r} traits, en comptant le trait du départ. Est-ce juste ?`,
  (p: Prenom, x: string, r: number, n: number) => `${p.nom} affirme : « ${x} est au ${rang(r)} trait après ${n}. » Vrai ou faux ?`,
  (p: Prenom, x: string, r: number, n: number) => `Sur sa droite, ${p.nom} a mis ${x} au ${rang(r)} petit trait après ${n}. Est-ce bien placé ?`,
  (p: Prenom, x: string, r: number, n: number) => `${p.nom} dit que ${x} se trouve ${r} sauts après ${n}. Es-tu d'accord ?`,
];

/** Vérifier le placement d'un camarade (★3). Juste une fois sur trois. */
export function genVerifier(niv: Niveau): TutorGeneratedQuestionV4 {
  const n = entierGauche(niv, 3);
  const k = entre(2, 8);
  const v = dec(n, k);
  const p = tire(PRENOMS);
  const juste = Math.random() < 0.34;
  const i = entre(0, VERIF.length - 1);
  // La tournure 1 dit « en comptant le trait du départ » : k traits comptés ainsi
  // ne font que k − 1 sauts. Elle est toujours fausse.
  const r = i === 1 ? k : juste ? k : tire([k + 1, k - 1, 10 - k].filter((x) => x !== k));
  const pose = i === 1 ? k - 1 : r; // là où le camarade a mis son point
  const bien = pose === k;
  const oui = i === 2 ? "vrai" : i === 4 ? "oui, d'accord" : "oui";
  const non = i === 2 ? "faux" : i === 4 ? "non, pas d'accord" : "non";
  const pourquoi =
    i === 1
      ? `En comptant le trait du départ, ${k} traits ne font que ${k - 1} saut${k - 1 > 1 ? "s" : ""} : le point arrive à ${dec(n, k - 1)}`
      : `Le point est au ${rang(pose)} petit trait : c'est ${dec(n, pose)}`;
  return {
    text: `Une droite va de ${n} à ${n + 1}, en 10 parts égales. ${VERIF[i](p, v, r, n)}`,
    format: "qcm",
    choices: [oui, non],
    expected: [bien ? oui : non],
    comparator: "mcq_exact",
    explanation: expl(
      "Chaque saut vaut 1 dixième ; on compte les sauts, pas le trait du départ.",
      `${v}, c'est ${n} et ${k} dixièmes : ${k} sauts après ${n}.`,
      bien ? `${v} est bien au ${rang(k)} petit trait après ${n}.` : `${pourquoi}, pas ${v}.`,
      bien ? "Le placement est juste." : "Le placement est faux.",
    ),
    // La figure montre le point du camarade, pas la bonne place.
    canvas: droite(n, [{ value: n + pose / 10, label: p.nom }]),
  };
}

const FRACTION = [
  (n: number, k: number) => `Le point est à ${n} et ${k}/10. Quel nombre décimal est-ce ?`,
  (n: number, k: number) => `On part de ${n} et on avance de ${k} dixièmes. Quel nombre décimal atteint-on ?`,
  (n: number, k: number) => `${n} + ${k}/10 : quel nombre décimal place-t-on sur la droite ?`,
  (n: number, k: number) => `Après ${n}, on fait ${k} sauts de 1 dixième. Où arrive-t-on ?`,
  (n: number, k: number) => `Quel nombre décimal vaut ${n} unités et ${k} dixièmes ?`,
];

/** Le lien fraction décimale / écriture à virgule, sur la droite (★3). */
export function genFraction(niv: Niveau): TutorGeneratedQuestionV4 {
  const n = entierGauche(niv, 3);
  const k = entre(1, 9);
  const v = dec(n, k);
  const leurres = [`${n},0${k}`, `${n + k},0`, `${k},${n}`, dec(n, 10 - k)].filter((x) => x !== v);
  return {
    text: `Une droite est graduée de ${n} à ${n + 1}, en 10 parts égales. ${tire(FRACTION)(n, k)}`,
    format: "qcm",
    choices: melange([v, ...melange([...new Set(leurres)]).slice(0, 3)]),
    expected: [v],
    comparator: "mcq_exact",
    explanation: expl(
      "1 dixième s'écrit 1/10 ou 0,1 : le chiffre des dixièmes se met juste après la virgule.",
      `${n} unités et ${k} dixièmes : ${n} avant la virgule, ${k} juste après.`,
      `${n} + ${k}/10 = ${v}.`,
      `On place ${v}, ${k} sauts après ${n}.`,
    ),
    canvas: droite(n, [{ value: n + k / 10, label: "?" }]),
  };
}

const MEME = [
  (a: string, b: string) => `${a} et ${b} se placent-ils au même endroit sur la droite ?`,
  (a: string, b: string) => `Sur la droite graduée, ${a} et ${b} sont-ils sur le même point ?`,
  (a: string, b: string, p: Prenom) => `${p.nom} dit que ${a} et ${b} sont au même endroit. A-t-${p.f ? "elle" : "il"} raison ?`,
  (a: string, b: string) => `Faut-il un seul point pour ${a} et ${b} ?`,
  (a: string, b: string) => `${a} et ${b} : est-ce la même place sur la droite ?`,
];

/** Le zéro à la fin ne change rien, le zéro juste après la virgule change tout (★3). */
export function genZero(niv: Niveau): TutorGeneratedQuestionV4 {
  const n = entierGauche(niv, 3);
  const k = entre(1, 9);
  const p = tire(PRENOMS);
  const meme = Math.random() < 0.5;
  const a = dec(n, k);
  const b = meme ? `${a}0` : `${n},0${k}`;
  const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
  return {
    text: tire(MEME)(x, y, p),
    format: "qcm",
    choices: ["oui", "non"],
    expected: [meme ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: meme
      ? expl(
          "Un zéro tout à la fin, après la virgule, ne change pas la valeur.",
          `${a}0, c'est ${k} dixièmes et 0 centième : toujours ${k} dixièmes.`,
          `${a}0 = ${a}.`,
          "Même nombre, même point : oui.",
        )
      : expl(
          "Le chiffre juste après la virgule, c'est celui des dixièmes.",
          `${a} a ${k} dixièmes ; ${n},0${k} a 0 dixième et ${k} centièmes.`,
          `${n},0${k} est bien plus près de ${n} que ${a}.`,
          "Deux nombres différents, deux places différentes : non.",
        ),
    canvas: droite(n, [{ value: n + k / 10, label: a }]),
  };
}

/** Les gabarits d'une banque, aux ids donnés (on garde les ids déjà servis). */
export function gabaritsDecimalDroite(
  niv: Niveau,
  ids: { lire2?: string; placer2?: string; lire3?: string; placer3?: string; verifier?: string; fraction?: string; zero?: string },
): TutorBankItemV4[] {
  const base = (id: string, difficulty: Etoile, hint: string, tag: string, generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 => ({
    kind: "template",
    id,
    niveau: niv,
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty,
    theme: "neutral",
    hint,
    tags: [niv, "decimal", "droite", tag, "template", "canvas"],
    generate,
  });
  const out: TutorBankItemV4[] = [];
  if (ids.lire2) out.push(base(ids.lire2, 2, "Pars de l'entier de gauche et compte les sauts : chacun vaut 0,1.", "lire", () => genLire(niv, 2)));
  if (ids.placer2) out.push(base(ids.placer2, 2, "Le chiffre après la virgule dit combien de sauts faire.", "placer", () => genPlacer(niv, 2)));
  if (ids.lire3) out.push(base(ids.lire3, 3, "Compte les sauts depuis l'entier de gauche, pas les traits.", "lire", () => genLire(niv, 3)));
  if (ids.placer3) out.push(base(ids.placer3, 3, "Le chiffre après la virgule dit combien de sauts faire.", "placer", () => genPlacer(niv, 3)));
  if (ids.verifier) out.push(base(ids.verifier, 3, "Compte les sauts, pas le trait du départ.", "verifier", () => genVerifier(niv)));
  if (ids.fraction) out.push(base(ids.fraction, 3, "Les dixièmes s'écrivent juste après la virgule.", "fraction", () => genFraction(niv)));
  if (ids.zero) out.push(base(ids.zero, 3, "Un zéro à la fin ne change pas la valeur.", "zero_final", () => genZero(niv)));
  return out;
}
