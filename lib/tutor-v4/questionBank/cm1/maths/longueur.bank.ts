// lib/tutor-v4/questionBank/cm1/maths/longueur.bank.ts
//
// Les LONGUEURS du CM1 : mesurer, comparer, convertir, estimer, défi. Aucune
// vidéo pour ces micros : vocabulaire du cycle 3 (règle graduée, graduation,
// tableau de conversion, « 1 m = 100 cm », « 1 km = 1 000 m »).
//
// ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS. Avant : 5 à 16 squelettes par micro,
// 9 à 19 répétitions sur 20, des droites graduées en « unités » sans unité, des
// QCM à deux choix et des questions ouvertes. Chaque gabarit tire maintenant une
// SITUATION (métiers, bricolage, couture, sport, nature, cuisine…) × une
// TOURNURE × des nombres, et pose son dessin :
//   - la RÈGLE graduée (`number_line` de 0 à 12 cm, ou de 0 à 6 cm avec les
//     millimètres) et l'objet posé dessus (un `intervalle` coloré) ;
//   - le TABLEAU DE CONVERSION (`tableau_donnees`, colonnes km hm dam m dm cm
//     mm) : les chiffres de la donnée placés, la case cherchée surlignée ;
//   - le SCHÉMA EN BARRE (`schema_barre`) des problèmes ;
//   - l'objet dessiné (`objets`) pour estimer.
// ⛔ Le dessin porte les DONNÉES, jamais la réponse.
// ⛔ `schema_barre` met ses parts à l'échelle des nombres de `value` : « 2 km »
//    et « 750 m » y deviendraient 2 et 750. Les longueurs en unités mêlées vont
//    donc dans `label`, jamais dans `value`.
// ⛔ L'unité partout : dans l'énoncé et dans chaque choix (« 24 cm »).
// ⛔ CM1 = zéro clavier : que des QCM (3 ou 4 choix), leurres = vraies erreurs
//    d'élève : mesurer depuis 1 au lieu de 0, lire la fin sans enlever le début,
//    1 m = 10 cm, comparer les nombres sans convertir, un zéro de trop ou de
//    moins, coller les nombres (2 m 5 cm → 25 cm), oublier de convertir.
// ⛔ Division : « ÷ ». La Réunion ≈ 2 % (un contexte sur une quarantaine).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { NumberLineCanvasData, ObjetId, ObjetsCanvasData, SchemaBarreCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, melange, qcm, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const lg = (v: number, u: string) => `${fr(v)} ${u}`;
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

/* ───────────────────────── Les mots ───────────────────────── */

const VOY = /^(?!haric)[aeiouyàâéèêëîïôûh]/i;
/** « de Nina », « d'Aya ». */
const dN = (nom: string) => (/^[aeiouéèh]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
const nomDe = (o: string) => o.replace(/^une? /, "");
const estF = (o: string) => o.startsWith("une ");
/** « le crayon », « la gomme », « l'allumette ». */
const le = (o: string) => (VOY.test(nomDe(o)) ? `l'${nomDe(o)}` : `${estF(o) ? "la" : "le"} ${nomDe(o)}`);
/** « du crayon », « de la gomme », « de l'allumette ». */
const du = (o: string) => {
  const d = le(o);
  return d.startsWith("le ") ? `du ${d.slice(3)}` : `de ${d}`;
};
/** « ce crayon », « cette gomme », « cet escargot ». */
const ce = (o: string) => (estF(o) ? `cette ${nomDe(o)}` : VOY.test(nomDe(o)) ? `cet ${nomDe(o)}` : `ce ${nomDe(o)}`);
/** « du trajet » / « de la longueur » / « de l'épaisseur », pour un groupe déjà déterminé. */
const deArt = (q: string) => (q.startsWith("le ") ? `du ${q.slice(3)}` : `de ${q}`);
const pluriel = (o: string) => {
  const [w, ...r] = nomDe(o).split(" ");
  const p = /[sxz]$/.test(w) ? w : /(eau|au|eu)$/.test(w) ? `${w}x` : `${w}s`;
  return [p, ...r].join(" ");
};

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alice", "Mila"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam"];
type Metier = readonly [string, string];
type Perso = { nom: string; il: "il" | "elle"; txt: string; f: boolean };
/** Un prénom, et souvent son métier : « Nina, couturière, ». */
function perso(metier?: Metier, sauf: string[] = []): Perso {
  const f = Math.random() < 0.5;
  const noms = (f ? NOMS_F : NOMS_M).filter((n) => !sauf.includes(n));
  const nom = un(noms);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.7 ? `${nom}, ${m},` : nom, f };
}
const sujet = (p: Perso) => cap(p.il);

/* ───────────────────────── Les unités ───────────────────────── */

const COL = ["km", "hm", "dam", "m", "dm", "cm", "mm"] as const;
type Un = (typeof COL)[number];
const NOM_U: Record<Un, string> = { km: "kilomètres", hm: "hectomètres", dam: "décamètres", m: "mètres", dm: "décimètres", cm: "centimètres", mm: "millimètres" };
const rang = (u: Un) => COL.indexOf(u);
/** Combien de « vers » dans un « de » : m → cm = 100 ; cm → m = 0,01. */
const facteur = (de: Un, vers: Un) => 10 ** (rang(vers) - rang(de));
const egalite = (grand: Un, petit: Un) => `1 ${grand} = ${fr(facteur(grand, petit))} ${petit}`;

/* ───────────────────────── Les dessins ───────────────────────── */

/** La règle graduée en cm (traits des demi-cm), ou de 0 à 6 cm avec les mm. L'objet posé de `debut` à `fin`. */
function regle(debut: number, fin: number, nom: string, mm = false): NumberLineCanvasData {
  return {
    kind: "number_line",
    min: 0,
    max: mm ? 6 : 12,
    step: 1,
    minorStep: mm ? 0.1 : 0.5,
    intervalles: [{ de: debut, a: fin, deInclus: true, aInclus: true, color: "#f59e0b", label: nom }],
    display: { showTicks: true, showValues: true, showPoints: false, showZero: true },
    size: { width: 360, height: 110 },
  };
}
/** La règle avec seulement le point de départ du trait à tracer. */
function regleDepart(debut: number): NumberLineCanvasData {
  return {
    kind: "number_line",
    min: 0,
    max: 12,
    step: 1,
    minorStep: 0.5,
    points: [{ value: debut, label: "départ", color: "#2563eb" }],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
    size: { width: 360, height: 110 },
  };
}

type Ligne = { label: string; parts: [number, Un][] };
/** Le tableau de conversion : chaque chiffre dans sa colonne, la case cherchée surlignée (1re ligne). */
function tableauConv(lignes: Ligne[], cible?: Un): TableauDonneesCanvasData {
  let lo = 6;
  let hi = 0;
  const grilles = lignes.map((l) => {
    const cells: string[] = COL.map(() => "");
    for (const [v, u] of l.parts) {
      const s = String(v);
      const fin = rang(u);
      for (let i = 0; i < s.length; i++) {
        const c = fin - (s.length - 1 - i);
        if (c >= 0) cells[c] = s[i];
      }
      lo = Math.min(lo, Math.max(0, fin - s.length + 1));
      hi = Math.max(hi, fin);
    }
    return cells;
  });
  if (cible) {
    lo = Math.min(lo, rang(cible));
    hi = Math.max(hi, rang(cible));
  }
  while (hi - lo < 3) {
    if (hi < 6) hi++;
    else lo--;
  }
  return {
    kind: "tableau_donnees",
    title: "Tableau de conversion",
    headers: ["", ...COL.slice(lo, hi + 1)],
    rows: lignes.map((l, i) => ({ values: [l.label, ...grilles[i].slice(lo, hi + 1)] })),
    display: { compact: true },
    ...(cible ? { highlight: { cell: { row: 0, col: rang(cible) - lo + 1 } } } : {}),
  };
}
/** Un tableau simple : qui, et quelle longueur. */
const tableauLongueurs = (lignes: [string, string][], tete = "Prénom"): TableauDonneesCanvasData => ({
  kind: "tableau_donnees",
  headers: [tete, "Longueur"],
  rows: lignes.map(([a, b]) => ({ values: [a, b] })),
  display: { compact: true },
});
/** Le schéma en barre ; ⛔ les longueurs dans `label` (unités mêlées). */
const barre = (parts: { label: string; unknown?: boolean }[], total?: string): SchemaBarreCanvasData => ({
  kind: "schema_barre",
  parts: parts.map((p) => (p.unknown ? { label: p.label, unknown: true } : { label: p.label })),
  ...(total ? { total } : {}),
});
const objetsCanvas = (elements: { quoi: ObjetId; label: string }[]): ObjetsCanvasData => ({ kind: "objets", mode: "couleur", elements, size: { width: 320 } });

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelier =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm1_longueur_${micro}_tpl_${suffixe}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: `longueur_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "longueur", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "format" | "comparator">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm1", matiere: "maths", notionId: "longueur", format: "qcm", comparator: "mcq_exact", ...f });

/** QCM de longueurs dans UNE unité : leurres entiers, positifs, distincts. */
function qcmL(juste: number, faux: number[], u: string) {
  const ok = [...new Set(faux.filter((v) => v > 0 && entier(v) && v !== juste))];
  for (let k = 1; ok.length < 3 && k < 20; k++) for (const v of [juste + k, juste - k]) if (v > 0 && !ok.includes(v) && ok.length < 3) ok.push(v);
  return qcm(lg(juste, u), ok.map((v) => lg(v, u)));
}

/* =========================================================
   LONGUEUR_MESURER — lire la règle, partir du 0
========================================================= */
const MES = atelier("mesurer");

/** Les petits objets qu'on pose sur la règle : [objet, métier, longueur max en cm]. */
const PETITS: readonly (readonly [string, Metier, number])[] = [
  ["un crayon", ["dessinatrice", "dessinateur"], 11],
  ["une gomme", ["maîtresse", "maître"], 6],
  ["un trombone", ["secrétaire", "secrétaire"], 5],
  ["une craie", ["maîtresse", "maître"], 9],
  ["une clé", ["serrurière", "serrurier"], 8],
  ["un feutre", ["illustratrice", "illustrateur"], 11],
  ["une plume", ["ornithologue", "ornithologue"], 11],
  ["un clou", ["menuisière", "menuisier"], 9],
  ["une vis", ["mécanicienne", "mécanicien"], 7],
  ["une brindille", ["jardinière", "jardinier"], 11],
  ["une chenille", ["biologiste", "biologiste"], 6],
  ["un ver de terre", ["jardinière", "jardinier"], 11],
  ["un bâton de colle", ["maîtresse", "maître"], 9],
  ["un ticket de bus", ["conductrice de bus", "conducteur de bus"], 7],
  ["une carte à jouer", ["magicienne", "magicien"], 9],
  ["un pinceau", ["peintre", "peintre"], 11],
  ["une feuille de laurier", ["cuisinière", "cuisinier"], 9],
  ["un coquillage", ["biologiste marine", "biologiste marin"], 7],
  ["une sauterelle", ["biologiste", "biologiste"], 6],
  ["un haricot vert", ["maraîchère", "maraîcher"], 11],
  ["une allumette", ["pompière", "pompier"], 5],
  ["une barrette", ["coiffeuse", "coiffeur"], 7],
  ["un biscuit", ["pâtissière", "pâtissier"], 8],
  ["une petite cuillère", ["cuisinière", "cuisinier"], 11],
  ["un bouchon", ["vigneronne", "vigneron"], 5],
  ["un timbre", ["postière", "postier"], 4],
  ["un tube de peinture", ["peintre", "peintre"], 10],
  ["un piment", ["cuisinière", "cuisinier"], 8],
  ["une fève de cacao", ["chocolatière", "chocolatier"], 4],
  ["un morceau de ruban", ["couturière", "couturier"], 11],
];

const Q_MESURE = (o: string) => [
  `Combien mesure ${ce(o)} ?`,
  `Quelle est la longueur ${du(o)} ?`,
  `Combien de centimètres mesure ${ce(o)} ?`,
  `Donne la longueur ${du(o)}.`,
  `Quelle longueur faut-il écrire ?`,
  `Quelle mesure trouve-t-on ?`,
];

/** Début sur le 0 : on lit la graduation de la fin. */
function lireZero(): Gen {
  const [o, metier, max] = un(PETITS);
  const p = perso(metier);
  const L = entre(2, max);
  const e = estF(o) ? "e" : "";
  const intro = un([
    `${p.txt} pose ${o} contre sa règle, au bord du 0.`,
    `${p.txt} mesure ${o} avec sa règle graduée.`,
    `${p.txt} mesure ${o} avec un double décimètre.`,
    `${cap(o)} est posé${e} sur la règle, à partir du 0.`,
    `On mesure ${o} : son bout est sur le 0 de la règle.`,
    `${p.txt} place ${le(o)} sur la règle, en partant du 0.`,
  ]);
  return {
    text: `${intro} ${un(Q_MESURE(o))}`,
    ...qcm(lg(L, "cm"), [lg(L + 1, "cm"), lg(L - 1, "cm"), lg(L, "mm"), lg(L * 10, "cm")].filter((s) => !s.startsWith("0 "))),
    explanation: exp(
      "Mesurer avec une règle, c'est compter les centimètres entre le début et la fin de l'objet.",
      "Le début est sur le 0 : on lit directement la graduation de la fin.",
      `La fin est sur la graduation ${L}.`,
      `${cap(ce(o))} mesure ${lg(L, "cm")}.`,
    ),
    canvas: regle(0, L, nomDe(o)),
  };
}

/** Début sur une autre graduation : fin − début. */
function lireDecale(): Gen {
  const [o, metier, max] = un(PETITS);
  const p = perso(metier);
  const d = entre(1, 4);
  const L = entre(2, Math.min(max, 12 - d));
  const fin = d + L;
  const pron = estF(o) ? "elle" : "il";
  const e = estF(o) ? "e" : "";
  const intro = un([
    `${p.txt} n'a pas posé ${le(o)} sur le 0 : ${pron} commence à la graduation ${d} et finit à la graduation ${fin}.`,
    `Sur la règle, ${le(o)} va de la graduation ${d} à la graduation ${fin}.`,
    `${p.txt} mesure ${o}. Le début est sur le ${d}, la fin sur le ${fin}.`,
    `La règle ${dN(p.nom)} a le bout cassé : ${le(o)} part du ${d} et s'arrête au ${fin}.`,
    `${cap(le(o))} est posé${e} entre la graduation ${d} et la graduation ${fin}.`,
    `${p.txt} a posé ${le(o)} sur la graduation ${d} au lieu du 0 ; le bout arrive sur le ${fin}.`,
  ]);
  return {
    text: `${intro} ${un([...Q_MESURE(o), `Quelle est sa vraie longueur ?`, `Combien mesure-t-${pron} vraiment ?`])}`,
    ...qcm(lg(L, "cm"), [lg(fin, "cm"), lg(fin + d, "cm"), lg(L + 1, "cm"), lg(L - 1, "cm")].filter((s) => !s.startsWith("0 "))),
    explanation: exp(
      "Mesurer, c'est compter les centimètres entre le début et la fin.",
      "Le début n'est pas sur le 0 : on enlève la graduation du début à celle de la fin.",
      `${fin} − ${d} = ${L}.`,
      `${cap(ce(o))} mesure ${lg(L, "cm")}, pas ${lg(fin, "cm")}.`,
    ),
    canvas: regle(d, fin, nomDe(o)),
  };
}

const A_TRACER: readonly (readonly [string, Metier])[] = [
  ["un trait", ["maîtresse", "maître"]],
  ["un segment", ["maîtresse", "maître"]],
  ["le côté d'un carré", ["architecte", "architecte"]],
  ["la tige d'une fleur", ["illustratrice", "illustrateur"]],
  ["une ligne de départ", ["animatrice", "animateur"]],
  ["le mât d'un bateau", ["dessinatrice", "dessinateur"]],
  ["le bord d'un cadre", ["encadreuse", "encadreur"]],
  ["une flèche", ["graphiste", "graphiste"]],
  ["le pied d'une table", ["menuisière", "menuisier"]],
  ["une ligne de couture", ["couturière", "couturier"]],
  ["une rue sur un plan", ["architecte", "architecte"]],
  ["la queue d'un cerf-volant", ["illustratrice", "illustrateur"]],
];
/** Tracer un trait de L cm qui ne part pas du 0. */
function tracer(): Gen {
  const [quoi, metier] = un(A_TRACER);
  const p = perso(metier);
  const d = entre(1, 4);
  const L = entre(3, 12 - d);
  const f = d + L;
  const intro = un([
    `${p.txt} veut tracer ${quoi} de ${L} cm. ${sujet(p)} pose la pointe du crayon sur la graduation ${d}.`,
    `${p.txt} trace ${quoi} de ${L} cm en partant de la graduation ${d} de sa règle.`,
    `Pour tracer ${quoi} de ${L} cm, ${p.nom} commence au ${d} de la règle.`,
    `${p.txt} doit tracer ${quoi} long de ${L} cm. ${sujet(p)} démarre sur le ${d}.`,
  ]);
  const q = un([`Sur quelle graduation doit-${p.il} s'arrêter ?`, `Où doit-${p.il} arrêter son trait ?`, `Jusqu'à quelle graduation doit-${p.il} tracer ?`, `À quelle graduation le trait finit-il ?`]);
  return {
    text: `${intro} ${q}`,
    ...qcm(`à ${f} cm`, [`à ${L} cm`, `à ${f + 1} cm`, `à ${f - 1} cm`, ...(L - d > 0 ? [`à ${L - d} cm`] : [])]),
    explanation: exp(
      `Un trait de ${L} cm couvre ${L} centimètres sur la règle, quel que soit son départ.`,
      "On part de la graduation du début et on ajoute la longueur.",
      `${d} + ${L} = ${f}.`,
      `Le trait s'arrête à la graduation ${f} cm.`,
    ),
    canvas: regleDepart(d),
  };
}

/** Petits objets (6 cm au plus) pour la règle aux millimètres. */
const PETITS_MM = PETITS.filter((x) => x[2] <= 7);
/** a cm et b mm → mm, avec la règle aux millimètres. */
function cmEtMm(): Gen {
  const [o, metier] = un(PETITS_MM);
  const p = perso(metier);
  const a = entre(1, 5);
  const b = entre(1, 9);
  const total = 10 * a + b;
  const intro = un([
    `${p.txt} mesure ${o} : ${a} cm et ${b} mm.`,
    `${cap(o)} mesure ${a} cm et ${b} mm.`,
    `Sur la règle, ${le(o)} mesure ${a} cm et ${b} mm.`,
    `${p.txt} lit ${a} cm et ${b} mm pour ${le(o)}.`,
  ]);
  const q = un(["Combien de millimètres cela fait-il ?", "Quelle est sa longueur en millimètres ?", "Écris cette longueur en millimètres.", "Cela fait combien de millimètres en tout ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcm(lg(total, "mm"), [lg(a + b, "mm"), lg(10 * a, "mm"), lg(total, "cm"), lg(100 * a + b, "mm")]),
    explanation: exp("1 cm = 10 mm.", "On change les centimètres en millimètres, puis on ajoute les millimètres.", `${a} cm = ${10 * a} mm ; ${10 * a} + ${b} = ${total}.`, `${cap(le(o))} mesure ${lg(total, "mm")}.`),
    canvas: regle(0, a + b / 10, nomDe(o), true),
  };
}

/** Lire la règle aux millimètres (début sur 0, ou décalé). */
function lireMm(decale: boolean): Gen {
  const [o, metier] = un(PETITS_MM);
  const p = perso(metier);
  const d = decale ? entre(1, 2) : 0;
  const a = entre(1, 5 - d);
  const b = un([1, 2, 3, 4, 6, 7, 8, 9]);
  const L = 10 * a + b;
  const fin = d + a + b / 10;
  const finMm = 10 * d + L;
  const enMm = decale || Math.random() < 0.5;
  const intro = decale
    ? un([
        `${p.txt} a posé ${le(o)} sur la graduation ${d} cm de la règle.`,
        `Sur la règle, ${le(o)} ne part pas du 0 mais du ${d}.`,
        `${p.txt} mesure ${o}, mais le début est sur le ${d} cm.`,
        `${cap(le(o))} est posé${estF(o) ? "e" : ""} à partir de la graduation ${d}.`,
      ])
    : un([
        `${p.txt} mesure ${o} avec une règle graduée en millimètres.`,
        `${cap(o)} est posé${estF(o) ? "e" : ""} sur la règle, à partir du 0.`,
        `${p.txt} pose ${le(o)} contre sa règle, au bord du 0.`,
        `On mesure ${o} au millimètre près.`,
      ]);
  if (enMm) {
    const q = un(["Combien mesure-t-il en millimètres ?", "Quelle est sa longueur en millimètres ?", "Lis sa longueur en millimètres.", "Combien de millimètres trouve-t-on ?"]).replace("-t-il", `-t-${estF(o) ? "elle" : "il"}`);
    const faux = decale ? [finMm, L + 10, L - 10, L + 1] : [L + 10, L, L - 1, L + 1];
    return {
      text: `${intro} ${q}`,
      ...(decale ? qcmL(L, faux, "mm") : qcm(lg(L, "mm"), [lg(L + 10, "mm"), lg(L, "cm"), lg(L - 1, "mm"), lg(a + b, "mm")])),
      explanation: exp(
        "Sur la règle, 1 cm = 10 mm : chaque petit trait vaut 1 mm.",
        decale ? "Le début n'est pas sur le 0 : on enlève la position du début à celle de la fin." : "Le début est sur le 0 : on compte les centimètres entiers, puis les petits traits.",
        decale ? `La fin est à ${finMm} mm, le début à ${10 * d} mm : ${finMm} − ${10 * d} = ${L}.` : `${a} cm = ${10 * a} mm, plus ${b} mm : ${L} mm.`,
        `${cap(le(o))} mesure ${lg(L, "mm")}.`,
      ),
      canvas: regle(d, fin, nomDe(o), true),
    };
  }
  const q = un(["Quelle est sa longueur en centimètres et millimètres ?", "Combien mesure-t-il, en cm et en mm ?", "Lis sa longueur en cm et mm."]).replace("-t-il", `-t-${estF(o) ? "elle" : "il"}`);
  const juste = `${a} cm ${b} mm`;
  return {
    text: `${intro} ${q}`,
    ...qcm(juste, [`${b} cm ${a} mm`, `${a + 1} cm ${b} mm`, `${a} cm ${10 - b} mm`, `${a + 1} cm ${10 - b} mm`]),
    explanation: exp(
      "Sur la règle, chaque petit trait vaut 1 mm, et 10 mm font 1 cm.",
      "On lit le dernier centimètre entier dépassé, puis on compte les petits traits après lui.",
      `Le bout dépasse ${a} cm de ${b} petits traits.`,
      `${cap(le(o))} mesure ${juste}.`,
    ),
    canvas: regle(0, fin, nomDe(o), true),
  };
}

/** Trouver l'erreur de lecture. */
function erreurLecture(): Gen {
  const [o, metier, max] = un(PETITS);
  const p = perso(metier);
  const d = entre(1, 4);
  const L = entre(2, Math.min(max, 12 - d));
  const fin = d + L;
  const juste = `${p.il} a lu la fin sans enlever le début : la vraie longueur est ${lg(L, "cm")}`;
  return {
    text: `${un([`${p.txt} pose ${le(o)} entre la graduation ${d} et la graduation ${fin}.`, `${p.txt} mesure ${o} qui va du ${d} au ${fin} sur la règle.`, `Sur la règle ${dN(p.nom)}, ${le(o)} part du ${d} et finit au ${fin}.`])} ${sujet(p)} écrit : « ${lg(fin, "cm")} ». ${un(["Quelle est son erreur ?", `Qu'a-t-${p.il} mal fait ?`, "Que faut-il lui dire ?", "Où est l'erreur ?"])}`,
    ...qcm(juste, [
      `il n'y a pas d'erreur : ${le(o)} mesure ${lg(fin, "cm")}`,
      `${p.il} devait ajouter le début : la vraie longueur est ${lg(fin + d, "cm")}`,
      d === 1 ? `${p.il} a mal lu la fin : la vraie longueur est ${lg(fin + 1, "cm")}` : `${p.il} a compté un trait de trop : la vraie longueur est ${lg(fin - 1, "cm")}`,
    ]),
    explanation: exp("Une longueur se compte entre le début et la fin de l'objet.", "Si le début n'est pas sur le 0, on enlève la graduation du début.", `${fin} − ${d} = ${L}.`, `${cap(le(o))} mesure ${lg(L, "cm")}.`),
    canvas: regle(d, fin, nomDe(o)),
  };
}

const mesurerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_longueur_mesurer_fixed_g1",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Un crayon mesure 13 cm et 5 mm. Combien de millimètres cela fait-il en tout ?",
    choices: ["135 mm", "18 mm", "130 mm", "155 mm"],
    expected: ["135 mm"],
    hint: "1 cm = 10 mm.",
    explanation: "13 cm = 130 mm, plus 5 mm = 135 mm.",
    tags: ["cm1", "longueur", "longueur_mesurer", "guide", "qcm"],
  }),
  MES("lire_zero", 2, "Le début est sur le 0 : lis la graduation de la fin.", lireZero),
  MES("lire_decale", 2, "Le début n'est pas sur le 0 : fais fin − début.", lireDecale),
  MES("tracer", 2, "Pars de la graduation du début et ajoute la longueur.", tracer),
  MES("cm_et_mm", 2, "1 cm = 10 mm.", cmEtMm),
  MES("lire_mm", 3, "Chaque petit trait vaut 1 mm ; 10 mm = 1 cm.", () => lireMm(false)),
  MES("lire_mm_decale", 3, "Le début n'est pas sur le 0 : enlève-le.", () => lireMm(true)),
  MES("erreur_lecture", 3, "Regarde où commence l'objet sur la règle.", erreurLecture),
];

/* =========================================================
   LONGUEUR_COMPARER — même unité, puis convertir avant de comparer
========================================================= */
const COMP = atelier("comparer");

/** Ce qu'on compare : [nom, féminin, métier]. */
const LONGS: readonly (readonly [string, boolean, Metier])[] = [
  ["ruban", false, ["couturière", "couturier"]],
  ["corde", true, ["marin", "marin"]],
  ["planche", true, ["menuisière", "menuisier"]],
  ["écharpe", true, ["tricoteuse", "tricoteur"]],
  ["guirlande", true, ["décoratrice", "décorateur"]],
  ["fil de laine", false, ["tricoteuse", "tricoteur"]],
  ["tresse", true, ["coiffeuse", "coiffeur"]],
  ["baguette de pain", true, ["boulangère", "boulanger"]],
  ["bande de papier", true, ["maîtresse", "maître"]],
  ["serpent en pâte à modeler", false, ["potière", "potier"]],
  ["tuyau", false, ["plombière", "plombier"]],
  ["câble", false, ["électricienne", "électricien"]],
  ["bâton de marche", false, ["guide", "guide"]],
  ["tige de bambou", true, ["jardinière", "jardinier"]],
  ["ficelle", true, ["fleuriste", "fleuriste"]],
  ["frise", true, ["graphiste", "graphiste"]],
  ["banderole", true, ["animatrice", "animateur"]],
  ["corde à sauter", true, ["animatrice", "animateur"]],
];
type Long = { nom: string; f: boolean; un: string; celui: string; ils: string; long: string; court: string; metier: Metier };
function tireLong(): Long {
  const [nom, f, metier] = un(LONGS);
  return { nom, f, un: `${f ? "une" : "un"} ${nom}`, celui: f ? "celle" : "celui", ils: f ? "elles" : "ils", long: f ? "longue" : "long", court: f ? "courte" : "court", metier };
}
const leN = (x: Long) => (VOY.test(x.nom) ? `l'${x.nom}` : `${x.f ? "la" : "le"} ${x.nom}`);
const art = (x: Long) => (x.f ? "la" : "le");
/** Deux nombres de deux chiffres, souvent aux chiffres inversés (45 et 54). */
function deuxNombres(): [number, number] {
  const a = entre(12, 98);
  const inv = Number(String(a).split("").reverse().join(""));
  if (Math.random() < 0.45 && inv !== a && inv >= 12) return [a, inv];
  let b = entre(12, 98);
  while (b === a) b = entre(12, 98);
  return [a, b];
}

/** ★1 — deux longueurs dans la même unité. */
function compDeux(): Gen {
  const x = tireLong();
  const p1 = perso(x.metier);
  const p2 = perso(undefined, [p1.nom]);
  const u = "cm";
  const [a, bb] = deuxNombres();
  const plusLong = Math.random() < 0.6;
  const adj = plusLong ? x.long : x.court;
  const intro = un([
    `${p1.txt} a ${x.un} de ${lg(a, u)}. ${p2.nom} a ${x.un} de ${lg(bb, u)}.`,
    `${cap(leN(x))} ${dN(p1.nom)} mesure ${lg(a, u)}, ${x.celui} ${dN(p2.nom)} mesure ${lg(bb, u)}.`,
    `${p1.txt} et ${p2.nom} comparent leurs ${pluriel(x.un)} : ${lg(a, u)} pour ${p1.nom}, ${lg(bb, u)} pour ${p2.nom}.`,
  ]);
  const q = un([`Qui a ${leN(x)} ${art(x) === "la" ? "la" : "le"} plus ${adj} ?`, `${x.f ? "Laquelle" : "Lequel"} est ${art(x)} plus ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${art(x)} plus ${adj} ?`]);
  const gagne = plusLong === a > bb ? p1 : p2;
  const vg = gagne === p1 ? a : bb;
  const perd = gagne === p1 ? p2 : p1;
  const vp = gagne === p1 ? bb : a;
  return {
    text: `${intro} ${q}`,
    ...qcm(`${x.celui} ${dN(gagne.nom)} (${lg(vg, u)})`, [`${x.celui} ${dN(perd.nom)} (${lg(vp, u)})`, `${x.ils} ont la même longueur`]),
    explanation: exp(
      "Comparer deux longueurs, c'est trouver la plus longue ou la plus courte.",
      "Les deux longueurs sont dans la même unité : on compare les nombres, chiffre par chiffre en commençant par la gauche.",
      `${fr(Math.max(a, bb))} > ${fr(Math.min(a, bb))}.`,
      `${cap(art(x))} plus ${adj} est ${x.celui} ${dN(gagne.nom)}.`,
    ),
    canvas: tableauLongueurs([[p1.nom, lg(a, u)], [p2.nom, lg(bb, u)]]),
  };
}

/** ★1 — trois ou quatre longueurs dans la même unité. */
function compTrois(): Gen {
  const x = tireLong();
  const p1 = perso(x.metier);
  const n = un([3, 3, 4]);
  const ps = [p1];
  while (ps.length < n) ps.push(perso(undefined, ps.map((p) => p.nom)));
  const [a, b] = deuxNombres();
  const vals = [a, b];
  while (vals.length < n) {
    const v = entre(12, 98);
    if (!vals.includes(v)) vals.push(v);
  }
  const vs = melange(vals);
  const plusLong = Math.random() < 0.55;
  const adj = plusLong ? x.long : x.court;
  const cible = plusLong ? Math.max(...vs) : Math.min(...vs);
  const liste = ps.map((p, i) => `${p.nom} : ${lg(vs[i], "cm")}`).join(", ");
  const intro = un([
    `${ps.length === 3 ? "Trois" : "Quatre"} amis mesurent leur ${x.nom}. ${liste}.`,
    `${p1.txt} compare les ${pluriel(x.un)} de ses amis. ${liste}.`,
    `Voici la longueur des ${pluriel(x.un)} : ${liste}.`,
  ]);
  const q = un([`Qui a ${leN(x)} ${art(x)} plus ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${art(x)} plus ${adj} ?`, `À qui est ${leN(x)} ${art(x)} plus ${adj} ?`]);
  const ix = vs.indexOf(cible);
  return {
    text: `${intro} ${q}`,
    ...qcm(`${ps[ix].nom} (${lg(cible, "cm")})`, ps.filter((_, i) => i !== ix).map((p) => `${p.nom} (${lg(vs[ps.indexOf(p)], "cm")})`)),
    explanation: exp(
      "Pour trouver la plus grande (ou la plus petite) longueur, on compare les nombres quand l'unité est la même.",
      "On regarde d'abord le chiffre des dizaines, puis celui des unités.",
      `Les longueurs : ${vs.map((v) => lg(v, "cm")).join(", ")}.`,
      `${cap(art(x))} plus ${adj} mesure ${lg(cible, "cm")} : c'est ${x.celui} ${dN(ps[ix].nom)}.`,
    ),
    canvas: tableauLongueurs(ps.map((p, i) => [p.nom, lg(vs[i], "cm")])),
  };
}

/** Les trois phrases « a … b » ; la juste selon les valeurs `va`, `vb` (ramenées à la même unité). */
function signes(ta: string, tb: string, va: number, vb: number) {
  const s = va < vb ? "<" : va > vb ? ">" : "=";
  return qcm(`${ta} ${s} ${tb}`, ["<", ">", "="].filter((x) => x !== s).map((x) => `${ta} ${x} ${tb}`));
}

/** ★1 — le signe entre deux longueurs dans la même unité. */
function compSigne(): Gen {
  const u = un(["cm", "m", "mm", "km"] as const);
  let [a, b] = deuxNombres();
  if (Math.random() < 0.12) b = a;
  const ta = lg(a, u);
  const tb = lg(b, u);
  const x = tireLong();
  const p1 = perso(x.metier);
  const p2 = perso(undefined, [p1.nom]);
  const text = un([
    `Complète avec <, > ou = : ${ta} … ${tb}.`,
    `Quel signe faut-il mettre entre ${ta} et ${tb} ?`,
    `Compare ${ta} et ${tb} : quelle écriture est juste ?`,
    `Choisis l'écriture juste pour comparer ${ta} et ${tb}.`,
    ...(u === "cm" || u === "mm"
      ? [`${cap(leN(x))} ${dN(p1.nom)} mesure ${ta}, ${x.celui} ${dN(p2.nom)} mesure ${tb}. Quelle écriture est juste ?`]
      : u === "m"
        ? [`${p1.txt} a ${x.un} de ${ta} ; ${p2.nom} en a ${x.f ? "une" : "un"} de ${tb}. Quelle écriture est juste ?`]
        : [`Le trajet ${dN(p1.nom)} fait ${ta}, celui ${dN(p2.nom)} ${tb}. Quelle écriture est juste ?`]),
  ]);
  return {
    text,
    ...signes(ta, tb, a, b),
    explanation: exp("« < » se lit « est plus petit que », « > » « est plus grand que ».", "Même unité : on compare les nombres.", a === b ? `${fr(a)} = ${fr(b)}.` : `${fr(Math.min(a, b))} < ${fr(Math.max(a, b))}.`, `${ta} ${a < b ? "<" : a > b ? ">" : "="} ${tb}.`),
  };
}

/** Deux longueurs dans deux unités voisines : il faut convertir. Piège : comparer les nombres seuls. */
function deuxUnites(grand: Un, petit: Un): { X: number; Y: number; vX: number; vY: number } {
  const F = facteur(grand, petit);
  const X = grand === "km" ? entre(1, 9) : grand === "m" ? entre(1, 6) : grand === "dm" ? entre(2, 9) : entre(2, 30);
  const r = Math.random();
  let Y: number;
  if (r < 0.2) Y = X * F;
  else {
    const pas = F >= 1000 ? un([100, 200, 300, 400, 500, 50]) : F >= 100 ? un([10, 20, 30, 40, 50, 60, 70, 80, 90]) : entre(1, 9);
    Y = X * F + (Math.random() < 0.5 ? pas : -pas);
    if (Y <= 0) Y = X * F + pas;
  }
  return { X, Y, vX: X * F, vY: Y };
}

/** ★2-★3 — deux personnes, deux unités. */
function compUnites(familles: readonly (readonly [Un, Un])[]): () => Gen {
  return () => {
    const [grand, petit] = un(familles);
    const { X, Y, vX, vY } = deuxUnites(grand, petit);
    const plusLong = Math.random() < 0.6;
    const tX = lg(X, grand);
    const tY = lg(Y, petit);
    let intro: string;
    let q: string;
    let celui: string;
    let ils: string;
    let adj: string;
    let p1: Perso;
    let p2: Perso;
    if (grand === "km") {
      const [act, metier] = un(TRAJETS);
      p1 = perso(metier);
      p2 = perso(undefined, [p1.nom]);
      intro = un([
        `${p1.txt} ${act} ${tX}. ${p2.nom} ${act} ${tY}.`,
        `Le parcours ${dN(p1.nom)} fait ${tX}, celui ${dN(p2.nom)} fait ${tY}.`,
        `${p1.txt} a fait ${tX} et ${p2.nom} ${tY}.`,
      ]);
      adj = plusLong ? "le plus long" : "le plus court";
      q = un([`Qui a fait le parcours ${plusLong ? "le plus long" : "le plus court"} ?`, `Quel parcours est ${adj} ?`, `Lequel des deux a parcouru ${plusLong ? "la plus grande" : "la plus petite"} distance ?`]);
      celui = "celui";
      ils = "les deux parcours";
    } else {
      const x = tireLong();
      p1 = perso(x.metier);
      p2 = perso(undefined, [p1.nom]);
      intro = un([
        `${p1.txt} a ${x.un} de ${tX}. ${p2.nom} a ${x.un} de ${tY}.`,
        `${cap(leN(x))} ${dN(p1.nom)} mesure ${tX}, ${x.celui} ${dN(p2.nom)} mesure ${tY}.`,
        `${p1.txt} mesure ${x.f ? "sa" : "son"} ${x.nom} : ${tX}. ${p2.nom} trouve ${tY} pour ${x.f ? "la sienne" : "le sien"}.`,
      ]);
      adj = `${art(x)} plus ${plusLong ? x.long : x.court}`;
      q = un([`Qui a ${leN(x)} ${adj} ?`, `${x.f ? "Laquelle" : "Lequel"} est ${adj} ?`, `${x.f ? "Quelle" : "Quel"} ${x.nom} est ${adj} ?`]);
      celui = x.celui;
      ils = x.ils;
    }
    const egal = vX === vY;
    const g1 = plusLong === vX > vY;
    const choixX = grand === "km" ? `${p1.nom} (${tX})` : `${celui} ${dN(p1.nom)} (${tX})`;
    const choixY = grand === "km" ? `${p2.nom} (${tY})` : `${celui} ${dN(p2.nom)} (${tY})`;
    const choixE = grand === "km" ? `${ils} ont la même longueur` : `${ils} ont la même longueur`;
    const juste = egal ? choixE : g1 ? choixX : choixY;
    return {
      text: `${intro} ${q}`,
      ...qcm(juste, [choixX, choixY, choixE]),
      explanation: exp(
        "Pour comparer deux longueurs écrites dans deux unités, on les écrit d'abord dans la même unité.",
        `On utilise ${egalite(grand, petit)}. ⚠️ Comparer ${fr(X)} et ${fr(Y)} sans convertir ne veut rien dire.`,
        `${tX} = ${lg(vX, petit)} ; on compare ${lg(vX, petit)} et ${tY}.`,
        egal ? "Les deux longueurs sont égales." : `${lg(Math.max(vX, vY), petit)} > ${lg(Math.min(vX, vY), petit)}.`,
      ),
      canvas: tableauConv([
        { label: p1.nom, parts: [[X, grand]] },
        { label: p2.nom, parts: [[Y, petit]] },
      ]),
    };
  };
}

/** ★2 — le signe entre deux longueurs d'unités différentes. */
function compSigneUnites(): Gen {
  const [grand, petit] = un([["m", "cm"], ["cm", "mm"], ["dm", "cm"], ["m", "cm"]] as const);
  const { X, Y, vX, vY } = deuxUnites(grand, petit);
  const tX = lg(X, grand);
  const tY = lg(Y, petit);
  const inverse = Math.random() < 0.4;
  const [ta, tb, va, vb] = inverse ? [tY, tX, vY, vX] : [tX, tY, vX, vY];
  return {
    text: un([`Complète avec <, > ou = : ${ta} … ${tb}.`, `Quel signe faut-il mettre entre ${ta} et ${tb} ?`, `Compare ${ta} et ${tb} : quelle écriture est juste ?`, `Attention aux unités ! Quelle écriture est juste pour ${ta} et ${tb} ?`]),
    ...signes(ta, tb, va, vb),
    explanation: exp(
      "On ne compare deux longueurs que dans la même unité.",
      `On utilise ${egalite(grand, petit)}.`,
      `${tX} = ${lg(vX, petit)}, à comparer avec ${tY}.`,
      `${ta} ${va < vb ? "<" : va > vb ? ">" : "="} ${tb}.`,
    ),
    canvas: tableauConv([
      { label: ta, parts: [[inverse ? Y : X, inverse ? petit : grand]] },
      { label: tb, parts: [[inverse ? X : Y, inverse ? grand : petit]] },
    ]),
  };
}

/** ★3 — « a m b cm » contre « c cm » : sport et bricolage. */
const SAUTS: readonly (readonly [string, Metier])[] = [
  ["saute", ["athlète", "athlète"]],
  ["lance sa balle à", ["athlète", "athlète"]],
  ["lance son javelot en mousse à", ["entraîneuse", "entraîneur"]],
  ["fait glisser son palet jusqu'à", ["joueuse de curling", "joueur de curling"]],
  ["fait rouler sa bille jusqu'à", ["joueuse", "joueur"]],
  ["lance son avion en papier à", ["pilote", "pilote"]],
  ["lance son frisbee à", ["animatrice", "animateur"]],
  ["fait voler son cerf-volant à", ["animatrice", "animateur"]],
];
function compMixte(): Gen {
  const [act, metier] = un(SAUTS);
  const p1 = perso(metier);
  const p2 = perso(undefined, [p1.nom]);
  const a = entre(1, 4);
  const b = un([5, 8, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90]);
  const v1 = a * 100 + b;
  // les pièges : le nombre « collé » (2 m 5 cm lu 25), ou une valeur proche
  const r = Math.random();
  const c = r < 0.15 ? v1 : r < 0.45 ? a * 100 + (b < 10 ? b * 10 : Math.round(b / 10) * 10 + un([-5, 5, 10])) : v1 + un([-30, -20, -10, 10, 20, 30]);
  const v2 = c > 0 ? c : v1 + 10;
  const t1 = `${a} m ${b} cm`;
  const t2 = lg(v2, "cm");
  const plusLoin = Math.random() < 0.65;
  const intro = un([`${p1.txt} ${act} ${t1}. ${p2.nom} ${act} ${t2}.`, `Au concours, ${p1.nom} ${act} ${t1} et ${p2.nom} ${t2}.`, `${p1.txt} ${act} ${t1} ; ${p2.nom}, ${t2}.`]);
  const q = plusLoin ? un(["Qui est allé le plus loin ?", "Qui gagne ?", "Qui a fait le meilleur essai ?"]) : un(["Qui est allé le moins loin ?", "Qui a fait l'essai le plus court ?"]);
  const egal = v1 === v2;
  const juste = egal ? "les deux sont à égalité" : (plusLoin === v1 > v2 ? `${p1.nom} (${t1})` : `${p2.nom} (${t2})`);
  return {
    text: `${intro} ${q}`,
    ...qcm(juste, [`${p1.nom} (${t1})`, `${p2.nom} (${t2})`, "les deux sont à égalité"]),
    explanation: exp("Pour comparer, on écrit les deux longueurs dans la même unité.", "1 m = 100 cm : on change les mètres en centimètres, puis on ajoute les centimètres.", `${t1} = ${a * 100} cm + ${b} cm = ${lg(v1, "cm")} ; on compare avec ${t2}.`, egal ? "Les deux longueurs sont égales." : `${lg(Math.max(v1, v2), "cm")} > ${lg(Math.min(v1, v2), "cm")}.`),
    canvas: tableauConv([
      { label: p1.nom, parts: [[a, "m"], [b, "cm"]] },
      { label: p2.nom, parts: [[v2, "cm"]] },
    ]),
  };
}

/** ★3 — ranger trois longueurs écrites dans des unités différentes. */
function compRanger(): Gen {
  const famille = un([["m", "cm"], ["km", "m"], ["cm", "mm"]] as const);
  const [grand, petit] = famille;
  const F = facteur(grand, petit);
  const base = grand === "km" ? entre(1, 4) : grand === "m" ? entre(1, 4) : entre(2, 9);
  // trois valeurs en petite unité : X·F, et deux autres proches ; une seule écrite en grande unité
  const vals = new Set<number>([base * F]);
  while (vals.size < 3) {
    const d = F >= 1000 ? un([200, 300, 500, 800]) : F >= 100 ? un([20, 30, 50, 80]) : entre(2, 8);
    vals.add(base * F + (Math.random() < 0.5 ? d : -d));
  }
  const vs = [...vals].filter((v) => v > 0);
  while (vs.length < 3) vs.push(base * F + 7 * vs.length);
  const ecr = (v: number) => (v === base * F ? lg(base, grand) : lg(v, petit));
  const tri = [...vs].sort((x, y) => x - y);
  const juste = tri.map(ecr).join(" < ");
  // piège : ranger les nombres écrits sans regarder l'unité
  const parNombres = [...vs].sort((x, y) => (x === base * F ? base : x) - (y === base * F ? base : y)).map(ecr).join(" < ");
  const inverse = [...tri].reverse().map(ecr).join(" < ");
  const autre = [tri[1], tri[0], tri[2]].map(ecr).join(" < ");
  const autre2 = [tri[0], tri[2], tri[1]].map(ecr).join(" < ");
  const x = tireLong();
  const p = perso(x.metier);
  const intro = un([
    "Range ces longueurs de la plus courte à la plus longue :",
    "Range dans l'ordre croissant :",
    `${p.txt} veut ranger ${grand === "km" ? "ces distances" : "ces longueurs"} de la plus petite à la plus grande :`,
    "Quel est le bon rangement, du plus court au plus long ?",
  ]);
  const mel = melange(vs.map(ecr)).join(" ; ");
  return {
    text: `${intro} ${mel}.`,
    ...qcm(juste, [parNombres, inverse, autre, autre2]),
    explanation: exp("Pour ranger des longueurs, il faut qu'elles soient dans la même unité.", `On utilise ${egalite(grand, petit)} et on écrit tout en ${NOM_U[petit]}.`, `${lg(base, grand)} = ${lg(base * F, petit)}.`, `Rangement : ${juste}.`),
    canvas: tableauConv(vs.map((v) => ({ label: ecr(v), parts: [v === base * F ? [base, grand] : [v, petit]] as [number, Un][] }))),
  };
}

/** Les trajets pour les km : [verbe + préposition, métier]. */
const TRAJETS: readonly (readonly [string, Metier])[] = [
  ["court", ["coureuse", "coureur"]],
  ["marche", ["randonneuse", "randonneur"]],
  ["roule à vélo sur", ["cycliste", "cycliste"]],
  ["livre des colis sur", ["livreuse", "livreur"]],
  ["fait sa tournée sur", ["factrice", "facteur"]],
  ["rame en kayak sur", ["kayakiste", "kayakiste"]],
  ["fait du roller sur", ["animatrice", "animateur"]],
  ["patrouille sur", ["garde forestière", "garde forestier"]],
  ["promène les chiens sur", ["promeneuse de chiens", "promeneur de chiens"]],
  ["nage", ["nageuse", "nageur"]],
];

const compUnites2 = compUnites([["m", "cm"], ["cm", "mm"], ["dm", "cm"], ["m", "cm"]]);
const compUnites3 = compUnites([["km", "m"]]);

const comparerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_longueur_comparer_fixed_002_cm_m",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle longueur est la plus grande : 1 m ou 80 cm ?",
    choices: ["1 m", "80 cm", "elles sont égales"],
    expected: ["1 m"],
    hint: "Convertis 1 m en centimètres.",
    explanation: exp(
      "Pour comparer deux longueurs avec des unités différentes, il faut les mettre dans la même unité.",
      "On convertit 1 m en centimètres.",
      "1 m = 100 cm, et 100 cm est plus grand que 80 cm.",
      "La longueur la plus grande est 1 m.",
    ),
    tags: ["cm1", "longueur", "comparer", "conversion", "qcm", "fixed"],
  }),
  fixe({
    id: "cm1_longueur_comparer_fixed_003_m_cm",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle longueur est la plus grande : 3 m ou 250 cm ?",
    choices: ["3 m", "250 cm", "elles sont égales"],
    expected: ["3 m"],
    hint: "Convertis 3 m en centimètres.",
    explanation: exp(
      "Pour comparer deux longueurs avec des unités différentes, on les met dans la même unité.",
      "On convertit les mètres en centimètres.",
      "3 m = 300 cm, et 300 cm est plus grand que 250 cm.",
      "La longueur la plus grande est 3 m.",
    ),
    tags: ["cm1", "longueur", "comparer", "conversion", "qcm", "fixed"],
  }),
  COMP("deux", 1, "Même unité : compare les nombres.", compDeux),
  COMP("trois", 1, "Même unité : compare les dizaines, puis les unités.", compTrois),
  COMP("signe", 1, "« < » : est plus petit que ; « > » : est plus grand que.", compSigne),
  COMP("unites", 2, "Écris les deux longueurs dans la même unité avant de comparer.", compUnites2),
  COMP("signe_unites", 2, "Convertis d'abord : 1 m = 100 cm, 1 cm = 10 mm.", compSigneUnites),
  COMP("km_m", 3, "1 km = 1 000 m.", compUnites3),
  COMP("mixte", 3, "Écris « a m b cm » en centimètres.", compMixte),
  COMP("ranger", 3, "Écris tout dans la même unité, puis range.", compRanger),
];

/* =========================================================
   LONGUEUR_CONVERTIR — le tableau, les zéros
========================================================= */
const CONV = atelier("convertir");

const CTX_CONV: Record<"petit" | "moyen" | "grand", readonly (readonly [string, Metier])[]> = {
  petit: [
    ["un ruban", ["couturière", "couturier"]],
    ["une bande de papier", ["maîtresse", "maître"]],
    ["une ficelle", ["fleuriste", "fleuriste"]],
    ["un fil de laine", ["tricoteuse", "tricoteur"]],
    ["une frise", ["graphiste", "graphiste"]],
    ["un galon", ["couturière", "couturier"]],
    ["une baguette de bois", ["menuisière", "menuisier"]],
    ["un lacet", ["cordonnière", "cordonnier"]],
  ],
  moyen: [
    ["une corde", ["marin", "marin"]],
    ["un tuyau d'arrosage", ["jardinière", "jardinier"]],
    ["une banderole", ["animatrice", "animateur"]],
    ["un câble", ["électricienne", "électricien"]],
    ["une guirlande", ["décoratrice", "décorateur"]],
    ["une clôture", ["agricultrice", "agriculteur"]],
    ["un rouleau de tissu", ["couturière", "couturier"]],
    ["une piste de saut", ["athlète", "athlète"]],
  ],
  grand: [
    ["un sentier", ["guide", "guide"]],
    ["une piste cyclable", ["cycliste", "cycliste"]],
    ["une route", ["cantonnière", "cantonnier"]],
    ["un parcours de course", ["coureuse", "coureur"]],
    ["une randonnée", ["randonneuse", "randonneur"]],
    ["une tournée de livraison", ["livreuse", "livreur"]],
    ["une ligne de bus", ["conductrice de bus", "conducteur de bus"]],
    ["une course de kayak", ["kayakiste", "kayakiste"]],
  ],
};
const echelle = (a: Un, b: Un): "petit" | "moyen" | "grand" => (a === "km" || b === "km" ? "grand" : a === "m" || b === "m" ? "moyen" : "petit");

const PAIRES: readonly (readonly [Un, Un])[] = [
  ["m", "cm"], ["m", "cm"], ["cm", "mm"], ["km", "m"], ["km", "m"], ["dm", "cm"], ["m", "dm"], ["m", "mm"],
  ["cm", "m"], ["mm", "cm"], ["m", "km"], ["cm", "dm"], ["dm", "mm"],
];
/** Une valeur entière à convertir de `de` vers `vers` (résultat entier). */
function valeurPour(de: Un, vers: Un): number {
  const f = facteur(de, vers);
  if (f >= 1) return f >= 1000 ? entre(2, 9) : f >= 100 ? entre(2, 15) : entre(2, 60);
  const k = 1 / f;
  return entre(2, f <= 0.001 ? 9 : 15) * Math.round(k);
}

/** ★2 — une conversion simple. */
function convSimple(): Gen {
  const [de, vers] = un(PAIRES);
  const v = valeurPour(de, vers);
  const f = facteur(de, vers);
  const r = Math.round(v * f * 1000) / 1000;
  const [quoi, metier] = un(CTX_CONV[echelle(de, vers)]);
  const p = perso(metier);
  const nu = Math.random() < 0.5;
  const text = nu
    ? un([
        `Convertis ${lg(v, de)} en ${NOM_U[vers]}.`,
        `Complète : ${lg(v, de)} = … ${vers}.`,
        `Combien de ${NOM_U[vers]} y a-t-il dans ${lg(v, de)} ?`,
        `${lg(v, de)}, cela fait combien de ${NOM_U[vers]} ?`,
        `Écris ${lg(v, de)} en ${NOM_U[vers]}.`,
        `Quelle longueur est égale à ${lg(v, de)} ?`,
      ])
    : `${un([`${p.txt} mesure ${quoi} : ${lg(v, de)}.`, `${cap(quoi)} mesure ${lg(v, de)}.`, `${p.txt} a besoin ${quoi.startsWith("un ") ? "d'un" : "d'une"} ${nomDe(quoi)} de ${lg(v, de)}.`])} ${un([`Combien cela fait-il de ${NOM_U[vers]} ?`, `Quelle est cette longueur en ${NOM_U[vers]} ?`, `Écris cette longueur en ${NOM_U[vers]}.`])}`;
  const faux = [r * 10, r / 10, v, v / f, r * 100].map((x) => Math.round(x * 1000) / 1000);
  return {
    text,
    ...qcmL(r, faux.filter((x) => entier(x)), vers),
    explanation: exp(
      `${f >= 1 ? egalite(de, vers) : egalite(vers, de)}.`,
      f >= 1 ? `Pour passer en ${NOM_U[vers]}, on multiplie par ${fr(f)} : dans le tableau, on ajoute un zéro par colonne.` : `Pour passer en ${NOM_U[vers]}, on divise par ${fr(1 / f)} : dans le tableau, on lit le chiffre de la colonne ${vers}.`,
      f >= 1 ? `${fr(v)} × ${fr(f)} = ${fr(r)}.` : `${fr(v)} ÷ ${fr(1 / f)} = ${fr(r)}.`,
      `${lg(v, de)} = ${lg(r, vers)}.`,
    ),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }], vers),
  };
}

/** ★2 — retrouver l'unité qui manque. */
function convUnite(): Gen {
  const [de, vers] = un(PAIRES);
  const v = valeurPour(de, vers);
  const r = Math.round(v * facteur(de, vers) * 1000) / 1000;
  const autres = (["km", "m", "dm", "cm", "mm"] as Un[]).filter((u) => u !== vers && u !== de);
  return {
    text: un([
      `Quelle unité manque ? ${lg(v, de)} = ${fr(r)} …`,
      `Complète avec la bonne unité : ${lg(v, de)} = ${fr(r)} …`,
      `Trouve l'unité : ${lg(v, de)} = ${fr(r)} …`,
      `${lg(v, de)}, c'est ${fr(r)} quoi ?`,
    ]),
    ...qcm(lg(r, vers), melange(autres).slice(0, 3).map((u) => lg(r, u))),
    explanation: exp(
      "Une même longueur s'écrit avec un nombre plus grand dans une unité plus petite.",
      "On place le nombre dans le tableau de conversion et on cherche la colonne où il finit.",
      `${lg(v, de)} = ${lg(r, vers)} car ${facteur(de, vers) >= 1 ? egalite(de, vers) : egalite(vers, de)}.`,
      `L'unité qui manque est le ${vers}.`,
    ),
    canvas: tableauConv([{ label: lg(v, de), parts: [[v, de]] }]),
  };
}

/** ★2 — quelle égalité est vraie ? */
function convEgalite(): Gen {
  const k = entre(2, 9);
  const fam = melange([["m", "cm"], ["km", "m"], ["cm", "mm"], ["dm", "cm"], ["m", "mm"]] as [Un, Un][]);
  const [g, pt] = fam[0];
  const F = facteur(g, pt);
  const juste = `${k} ${g} = ${fr(k * F)} ${pt}`;
  const faux = [`${k} ${g} = ${fr(k * F / 10)} ${pt}`, `${k} ${g} = ${fr(k * F * 10)} ${pt}`, ...fam.slice(1, 3).map(([g2, p2]) => `${k} ${g2} = ${fr(k * facteur(g2, p2) * (Math.random() < 0.5 ? 10 : 0.1))} ${p2}`)];
  return {
    text: un(["Quelle égalité est vraie ?", "Une seule de ces conversions est juste. Laquelle ?", "Quelle conversion est correcte ?", "Trouve la conversion sans erreur."]),
    ...qcm(juste, faux.filter((x) => !/\b0 /.test(x) && !/,/.test(x))),
    explanation: exp(`${egalite(g, pt)}.`, "Pour vérifier, on multiplie par le bon nombre : 10, 100 ou 1 000.", `${k} × ${fr(F)} = ${fr(k * F)}.`, `La conversion juste est : ${juste}.`),
    canvas: tableauConv([{ label: lg(k, g), parts: [[k, g]] }], pt),
  };
}

/** ★3 — « a m b cm » → cm ; « a km b m » → m ; « a cm b mm » → mm. */
function convCompose(): Gen {
  const [g, pt] = un([["m", "cm"], ["km", "m"], ["cm", "mm"], ["m", "cm"], ["km", "m"]] as const);
  const F = facteur(g, pt);
  const a = g === "cm" ? entre(2, 40) : entre(1, 9);
  const b = F === 10 ? entre(1, 9) : F === 100 ? un([entre(1, 9), entre(11, 99), entre(11, 99)]) : un([entre(1, 9) * 10, entre(1, 9) * 5, entre(101, 999), entre(101, 999)]);
  const r = a * F + b;
  const t = `${a} ${g} ${b} ${pt}`;
  const colle = Number(`${a}${b}`);
  const [quoi, metier] = un(CTX_CONV[echelle(g, pt)]);
  const p = perso(metier);
  const text = un([
    `Convertis ${t} en ${NOM_U[pt]}.`,
    `Complète : ${t} = … ${pt}.`,
    `${p.txt} mesure ${quoi} : ${t}. Combien de ${NOM_U[pt]} cela fait-il ?`,
    `${cap(quoi)} mesure ${t}. Quelle est sa longueur en ${NOM_U[pt]} ?`,
    `Écris ${t} en ${NOM_U[pt]}.`,
    `${p.txt} a besoin ${quoi.startsWith("un ") ? "d'un" : "d'une"} ${nomDe(quoi)} de ${t}. Combien de ${NOM_U[pt]} est-ce ?`,
    `${t} : combien de ${NOM_U[pt]} en tout ?`,
    `${p.txt} note ${t} pour ${quoi}. Quelle est cette longueur en ${pt} ?`,
  ]);
  return {
    text,
    ...qcmL(r, [colle, a + b, a * F * 10 + b, a * (F / 10) + b, a * F + b * 10], pt),
    explanation: exp(
      `${egalite(g, pt)}.`,
      `On change les ${NOM_U[g]} en ${NOM_U[pt]}, puis on ajoute les ${NOM_U[pt]}. ⚠️ On ne colle pas les nombres.`,
      `${lg(a, g)} = ${lg(a * F, pt)} ; ${fr(a * F)} + ${fr(b)} = ${fr(r)}.`,
      `${t} = ${lg(r, pt)}.`,
    ),
    canvas: tableauConv([{ label: t, parts: [[a, g], [b, pt]] }], pt),
  };
}

/** ★3 — « 325 cm » → « 3 m 25 cm ». */
function convDecompose(): Gen {
  const [g, pt] = un([["m", "cm"], ["km", "m"], ["cm", "mm"]] as const);
  const F = facteur(g, pt);
  let v = 0;
  while (v % F === 0) v = F === 10 ? entre(11, 99) : F === 100 ? un([entre(101, 999), entre(1, 9) * 100 + entre(1, 9)]) : un([entre(1001, 9999), entre(1, 9) * 1000 + entre(1, 9) * 10]);
  const a = Math.floor(v / F);
  const b = v % F;
  const juste = `${a} ${g} ${b} ${pt}`;
  const faux = [`${a * 10} ${g} ${b} ${pt}`, `${a} ${g} ${b * 10} ${pt}`];
  if (a !== b) faux.push(`${b} ${g} ${a} ${pt}`);
  if (F >= 100 && v % (F / 10)) faux.push(`${Math.floor(v / (F / 10))} ${g} ${v % (F / 10)} ${pt}`);
  const [quoi, metier] = un(CTX_CONV[echelle(g, pt)]);
  const p = perso(metier);
  return {
    text: un([
      `Écris ${lg(v, pt)} en ${NOM_U[g]} et ${NOM_U[pt]}.`,
      `Complète : ${lg(v, pt)} = … ${g} … ${pt}.`,
      `${p.txt} mesure ${quoi} : ${lg(v, pt)}. Comment l'écrire en ${g} et ${pt} ?`,
      `${cap(quoi)} mesure ${lg(v, pt)}. Combien de ${NOM_U[g]} et de ${NOM_U[pt]} ?`,
      `${p.txt} a besoin de ${lg(v, pt)} pour ${quoi}. Comment l'écrire avec des ${NOM_U[g]} ?`,
      `Décompose ${lg(v, pt)} en ${g} et ${pt}.`,
      `${p.txt} trouve ${lg(v, pt)}. Quelle écriture en ${g} et ${pt} est juste ?`,
    ]),
    ...qcm(juste, faux),
    explanation: exp(`${egalite(g, pt)}.`, `On fait des paquets de ${fr(F)} ${pt} : chaque paquet fait 1 ${g}.`, `${fr(v)} = ${fr(a * F)} + ${fr(b)} ; ${lg(a * F, pt)} = ${lg(a, g)}.`, `${lg(v, pt)} = ${juste}.`),
    canvas: tableauConv([{ label: lg(v, pt), parts: [[v, pt]] }], g),
  };
}

/** ★3 — quelle longueur est égale à « a m b cm » ? (les mêmes erreurs, à l'envers) */
function convEgaleA(): Gen {
  const [g, pt] = un([["m", "cm"], ["km", "m"], ["m", "cm"]] as const);
  const F = facteur(g, pt);
  const a = entre(1, 9);
  const b = F === 100 ? un([entre(1, 9), entre(11, 99)]) : un([entre(1, 9) * 10, entre(101, 999), entre(1, 9) * 5]);
  const r = a * F + b;
  const t = `${a} ${g} ${b} ${pt}`;
  const [quoi, metier] = un(CTX_CONV[echelle(g, pt)]);
  const p = perso(metier);
  return {
    text: un([
      `Quelle longueur est égale à ${t} ?`,
      `${t}, c'est la même longueur que…`,
      `Laquelle de ces longueurs vaut ${t} ?`,
      `Trouve la longueur égale à ${t}.`,
      `${p.txt} mesure ${quoi} : ${t}. ${sujet(p)} veut l'écrire en ${NOM_U[pt]}. Que doit-${p.il} écrire ?`,
      `${cap(quoi)} mesure ${t}. Quelle écriture en ${pt} est juste ?`,
      `${p.txt} lit ${t} pour ${quoi}. Quelle est la même longueur en ${NOM_U[pt]} ?`,
    ]),
    ...qcmL(r, [Number(`${a}${b}`), a * F * 10 + b, a * F + b * 10, a + b], pt),
    explanation: exp(`${egalite(g, pt)}.`, `On change les ${NOM_U[g]} en ${NOM_U[pt]}, puis on ajoute.`, `${lg(a * F, pt)} + ${lg(b, pt)} = ${lg(r, pt)}.`, `${t} = ${lg(r, pt)}.`),
    canvas: tableauConv([{ label: t, parts: [[a, g], [b, pt]] }], pt),
  };
}

const convertirItems: TutorBankItemV4[] = [
  CONV("simple", 2, "Place le nombre dans le tableau de conversion.", convSimple),
  CONV("simple_bis", 2, "1 m = 100 cm ; 1 cm = 10 mm ; 1 km = 1 000 m.", convSimple),
  CONV("unite", 2, "Dans une unité plus petite, le nombre est plus grand.", convUnite),
  CONV("egalite", 2, "Vérifie le nombre de zéros.", convEgalite),
  CONV("compose", 3, "Convertis la grande unité, puis ajoute.", convCompose),
  CONV("decompose", 3, "Fais des paquets : 100 cm = 1 m, 1 000 m = 1 km.", convDecompose),
  CONV("egale_a", 3, "Attention au zéro : 2 m 5 cm = 205 cm.", convEgaleA),
];

/* =========================================================
   LONGUEUR_ESTIMER — l'ordre de grandeur, l'unité adaptée
========================================================= */
const EST = atelier("estimer");

type U4 = "mm" | "cm" | "m" | "km";
type Est = { quoi: string; dessin?: ObjetId; nom?: string; u: U4; v: number };
const E = (quoi: string, u: U4, v: number, dessin?: ObjetId, nom?: string): Est => ({ quoi, u, v, dessin, nom });
const ESTIM: readonly Est[] = [
  E("la longueur d'un livre", "cm", 25, "livre", "le livre"),
  E("la longueur d'une clé", "cm", 6, "cle", "la clé"),
  E("la longueur d'une banane", "cm", 18, "banane", "la banane"),
  E("la hauteur d'une tasse", "cm", 9, "tasse", "la tasse"),
  E("la hauteur d'un verre", "cm", 12, "verre", "le verre"),
  E("la longueur d'une voiture", "m", 4, "voiture", "la voiture"),
  E("la hauteur d'une maison", "m", 8, "maison", "la maison"),
  E("la hauteur d'un grand arbre", "m", 15, "arbre", "l'arbre"),
  E("la longueur d'un bateau de pêche", "m", 10, "bateau", "le bateau"),
  E("la longueur d'un chat", "cm", 45, "chat", "le chat"),
  E("la longueur d'un poisson rouge", "cm", 8, "poisson", "le poisson"),
  E("la hauteur d'une tulipe", "cm", 40, "fleur", "la tulipe"),
  E("la longueur d'une feuille d'arbre", "cm", 12, "feuille", "la feuille"),
  E("la largeur d'un cartable", "cm", 40, "cartable", "le cartable"),
  E("la largeur d'un ballon de foot", "cm", 22, "ballon", "le ballon"),
  E("la largeur d'un chapeau", "cm", 30, "chapeau", "le chapeau"),
  E("la hauteur d'une pomme", "cm", 8, "pomme", "la pomme"),
  E("la longueur d'un moineau", "cm", 15, "oiseau", "l'oiseau"),
  E("la largeur d'un papillon", "cm", 5, "papillon", "le papillon"),
  E("l'épaisseur d'une pièce de 1 euro", "mm", 2),
  E("la longueur d'une fourmi", "mm", 5),
  E("l'épaisseur d'un cahier", "mm", 8),
  E("la longueur d'un grain de riz", "mm", 6),
  E("l'épaisseur d'un téléphone", "mm", 9),
  E("la distance entre Paris et Lyon", "km", 400),
  E("la longueur d'un marathon", "km", 42),
  E("la longueur de la Loire", "km", 1000),
  E("la longueur d'une randonnée d'une journée", "km", 15),
  E("la montée au Piton des Neiges depuis Cilaos", "km", 8),
  E("la longueur d'une piscine", "m", 25),
  E("la hauteur d'une porte", "m", 2),
  E("la longueur d'un bus", "m", 12),
  E("la longueur d'une salle de classe", "m", 8),
  E("la longueur d'un terrain de foot", "m", 100),
  E("la longueur d'un crayon", "cm", 15),
  E("la longueur d'une règle de classe", "cm", 30),
  E("la longueur d'une fourchette", "cm", 20),
];
const ESTIM_DESSIN = ESTIM.filter((x) => x.dessin);
const U4S: readonly U4[] = ["mm", "cm", "m", "km"];
const NOM_U4: Record<U4, string> = { mm: "en millimètres (mm)", cm: "en centimètres (cm)", m: "en mètres (m)", km: "en kilomètres (km)" };
const enCm = (x: { u: U4; v: number }) => x.v * { mm: 0.1, cm: 1, m: 100, km: 100000 }[x.u];
const dessinDe = (x: Est) => (x.dessin ? { canvas: objetsCanvas([{ quoi: x.dessin, label: (x.nom ?? "").replace(/^(le |la |l')/, "") }]) } : {});
const METIERS_EST: readonly Metier[] = [["maîtresse", "maître"], ["architecte", "architecte"], ["menuisière", "menuisier"], ["scientifique", "scientifique"], ["géomètre", "géomètre"], ["couturière", "couturier"]];
const estUnAuHasard = () => (Math.random() < 0.55 ? un(ESTIM_DESSIN) : un(ESTIM));

/** ★1 — l'unité adaptée. */
function estUnite(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  return {
    text: un([
      `Quelle unité choisir pour mesurer ${x.quoi} ?`,
      `Pour mesurer ${x.quoi}, quelle unité est la mieux adaptée ?`,
      `${p.txt} veut mesurer ${x.quoi}. Quelle unité doit-${p.il} utiliser ?`,
      `En quelle unité exprime-t-on ${x.quoi} ?`,
      `Quelle est la bonne unité pour ${x.quoi} ?`,
    ]),
    ...qcm(NOM_U4[x.u], U4S.map((u) => NOM_U4[u])),
    explanation: exp("On choisit l'unité qui donne un nombre simple, ni minuscule ni énorme.", "On pense à la vraie taille : mm pour le tout petit, cm pour ce qui tient dans la main, m pour une pièce ou une maison, km pour un trajet.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `On mesure ${NOM_U4[x.u]}.`),
    ...dessinDe(x),
  };
}

/** ★1 — le même nombre, quatre unités. */
function estValeur(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  return {
    text: un([
      `${cap(x.quoi)} est d'environ…`,
      `Quelle mesure convient pour ${x.quoi} ?`,
      `Estime ${x.quoi}.`,
      `${p.txt} estime ${x.quoi}. Que trouve-t-${p.il} ?`,
      `Quelle est la mesure la plus vraisemblable ${deArt(x.quoi)} ?`,
    ]),
    ...qcm(lg(x.v, x.u), U4S.filter((u) => u !== x.u).map((u) => lg(x.v, u))),
    explanation: exp("Estimer, c'est trouver une mesure qui a du sens sans mesurer.", "Le nombre est le même : c'est l'unité qui décide si la mesure est trop petite ou trop grande.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `La bonne estimation est ${lg(x.v, x.u)}.`),
    ...dessinDe(x),
  };
}

/** ★1 — corriger l'unité d'un camarade. */
function estTrop(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  const wu = un(U4S.filter((u) => u !== x.u && Math.abs(U4S.indexOf(u) - U4S.indexOf(x.u)) >= 1));
  const trop = enCm({ u: wu, v: x.v }) > enCm(x);
  return {
    text: `${p.nom} écrit : « ${cap(x.quoi)} : ${lg(x.v, wu)} ». ${un([`Quelle unité aurait-${p.il} dû écrire ?`, "Corrige son unité.", `Quelle mesure aurait-${p.il} dû écrire ?`, "Quelle est la bonne mesure ?"])}`,
    ...qcm(lg(x.v, x.u), U4S.filter((u) => u !== x.u).map((u) => lg(x.v, u))),
    explanation: exp("Une estimation doit avoir du sens.", `${lg(x.v, wu)}, c'est beaucoup ${trop ? "trop grand" : "trop petit"} pour ${x.quoi}.`, `${cap(x.quoi)} : environ ${lg(x.v, x.u)}.`, `Il fallait écrire ${lg(x.v, x.u)}.`),
    ...dessinDe(x),
  };
}

/** ★2 — même unité, le bon ordre de grandeur. */
function estOrdre(): Gen {
  const x = estUnAuHasard();
  const p = perso(un(METIERS_EST));
  const faux = [x.v * 10, x.v * 100, x.v % 10 === 0 ? x.v / 10 : x.v * 1000];
  return {
    text: un([
      `${cap(x.quoi)} : quelle mesure est la plus proche de la réalité ?`,
      `Quelle mesure est vraisemblable pour ${x.quoi} ?`,
      `${p.txt} hésite entre ces mesures pour ${x.quoi}. Laquelle est la bonne ?`,
      `Choisis la mesure la plus réaliste pour ${x.quoi}.`,
    ]),
    ...qcm(lg(x.v, x.u), faux.map((v) => lg(v, x.u))),
    explanation: exp("Estimer, c'est choisir un ordre de grandeur réaliste.", "On compare avec un objet connu : une règle de classe mesure 30 cm, une porte 2 m.", `${cap(x.quoi)} : environ ${lg(x.v, x.u)} ; ${lg(x.v * 10, x.u)} serait dix fois trop.`, `La bonne mesure est ${lg(x.v, x.u)}.`),
    ...dessinDe(x),
  };
}

/** ★2 — quel objet mesure environ… ? (quatre objets dessinés) */
function estObjet(): Gen {
  const cible = un(ESTIM_DESSIN);
  const autres: Est[] = [];
  for (const y of melange([...ESTIM_DESSIN])) {
    if (autres.length === 3) break;
    const loin = (a: Est, b: Est) => Math.max(enCm(a), enCm(b)) / Math.min(enCm(a), enCm(b)) >= 3;
    if (y !== cible && loin(y, cible) && autres.every((z) => z.dessin !== y.dessin)) autres.push(y);
  }
  const tous = melange([cible, ...autres]);
  const p = perso(un(METIERS_EST));
  const m = lg(cible.v, cible.u);
  return {
    text: un([`Lequel de ces objets mesure environ ${m} ?`, `${p.txt} a mesuré un de ces objets et trouvé environ ${m}. Lequel ?`, `Quel objet a une taille d'environ ${m} ?`, `Environ ${m} : de quel objet s'agit-il ?`]),
    ...qcm(cible.nom ?? "", autres.map((z) => z.nom ?? "")),
    explanation: exp("Estimer, c'est relier une mesure à un objet réel.", "On imagine chaque objet à côté d'une règle ou d'une porte.", `${cap(cible.quoi)} : environ ${m}.`, `C'est ${cible.nom}.`),
    canvas: objetsCanvas(tous.map((z) => ({ quoi: z.dessin as ObjetId, label: (z.nom ?? "").replace(/^(le |la |l')/, "") }))),
  };
}

/** ★2 — la seule phrase vraisemblable. */
function estIntrus(): Gen {
  const tires = melange([...ESTIM]).slice(0, 4);
  if (!tires.some((x) => x.dessin)) tires[0] = un(ESTIM_DESSIN);
  const [juste, ...reste] = tires;
  const faux = reste.map((x) => `${cap(x.quoi)} : ${lg(x.v, un(U4S.filter((u) => u !== x.u)))}`);
  const dessines = tires.filter((x) => x.dessin);
  return {
    text: un(["Une seule de ces mesures est vraisemblable. Laquelle ?", "Quelle mesure est réaliste ?", "Laquelle de ces phrases est vraie ?", "Trouve la seule mesure qui a du sens."]),
    ...qcm(`${cap(juste.quoi)} : ${lg(juste.v, juste.u)}`, faux),
    explanation: exp("Une mesure a du sens si le nombre ET l'unité correspondent à la vraie taille.", "On vérifie chaque phrase en imaginant l'objet.", `${cap(juste.quoi)} : environ ${lg(juste.v, juste.u)}. Les autres ont la mauvaise unité.`, `La phrase vraisemblable : ${juste.quoi}, ${lg(juste.v, juste.u)}.`),
    ...(dessines.length ? { canvas: objetsCanvas(dessines.map((z) => ({ quoi: z.dessin as ObjetId, label: (z.nom ?? "").replace(/^(le |la |l')/, "") }))) } : {}),
  };
}

const estimerItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_longueur_estimer_fixed_002_distance",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour la longueur d'une salle de classe ?",
    choices: ["8 m", "8 cm", "8 km", "800 km"],
    expected: ["8 m"],
    hint: "Une salle de classe est plus longue qu'une règle, mais beaucoup plus courte qu'une route.",
    explanation: exp(
      "Estimer, c'est choisir une valeur qui a du sens.",
      "On compare avec des objets connus : une salle est plus grande qu'un cahier, mais beaucoup plus petite qu'un kilomètre.",
      "8 cm est trop petit et 8 km est beaucoup trop grand.",
      "Une estimation raisonnable est 8 m.",
    ),
    tags: ["cm1", "longueur", "estimer", "ordre_grandeur", "qcm", "fixed"],
  }),
  fixe({
    id: "cm1_longueur_estimer_fixed_003_riviere",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d'une rivière ?",
    choices: ["km", "cm", "mm", "dm"],
    expected: ["km"],
    hint: "Une rivière est très longue.",
    explanation: exp(
      "On choisit l'unité adaptée à la taille de ce que l'on mesure.",
      "Une rivière s'étend sur de grandes distances.",
      "Le centimètre ou le millimètre seraient beaucoup trop petits.",
      "L'unité la plus adaptée est le kilomètre.",
    ),
    tags: ["cm1", "longueur", "estimer", "unite", "qcm", "fixed"],
  }),
  fixe({
    id: "cm1_longueur_estimer_fixed_004_adulte",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour la taille d'un adulte ?",
    choices: ["170 cm", "17 cm", "17 m", "1 700 cm"],
    expected: ["170 cm"],
    hint: "Un adulte mesure un peu moins de 2 mètres.",
    explanation: exp(
      "Estimer, c'est choisir une valeur qui a du sens.",
      "On compare avec une taille connue : un adulte mesure environ 1 m 70.",
      "17 cm est trop petit et 17 m est beaucoup trop grand.",
      "Une estimation raisonnable est 170 cm.",
    ),
    tags: ["cm1", "longueur", "estimer", "ordre_grandeur", "qcm", "fixed"],
  }),
  fixe({
    id: "cm1_longueur_estimer_fixed_005_fourmi",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d'une fourmi ?",
    choices: ["mm", "m", "km", "dam"],
    expected: ["mm"],
    hint: "Une fourmi est minuscule.",
    explanation: exp(
      "On choisit une unité adaptée à la taille de l'objet.",
      "Une fourmi est un très petit insecte.",
      "Le mètre ou le kilomètre seraient beaucoup trop grands.",
      "L'unité la plus adaptée est le millimètre.",
    ),
    tags: ["cm1", "longueur", "estimer", "unite", "qcm", "fixed"],
  }),
  EST("unite", 1, "Pense à la vraie taille : dans la main (cm), une pièce (m), un trajet (km).", estUnite),
  EST("valeur", 1, "Le nombre ne change pas : c'est l'unité qui compte.", estValeur),
  EST("trop", 1, "Imagine l'objet à côté d'une règle.", estTrop),
  EST("ordre", 2, "Compare avec une règle (30 cm) ou une porte (2 m).", estOrdre),
  EST("objet", 2, "Imagine chaque objet à côté d'une règle.", estObjet),
  EST("intrus", 2, "Vérifie le nombre ET l'unité.", estIntrus),
];

/* =========================================================
   LONGUEUR_DEFI — problèmes : convertir avant de calculer
========================================================= */
const DEFI = atelier("defi");

const BUTS = ["aller à l'école", "rejoindre la plage", "livrer un colis", "arriver au refuge", "finir sa course", "atteindre le phare", "arriver à la ferme", "rentrer à la maison", "rejoindre le stade", "arriver au marché", "atteindre le sommet", "rejoindre le camping"];

/** ★3 — a km puis b m : distance totale en m. */
function defiAjout(): Gen {
  const [act, metier] = un(TRAJETS);
  const p = perso(metier);
  const km = entre(1, 6);
  const m = un([entre(1, 9) * 50, entre(1, 9) * 100, entre(11, 19) * 50, entre(1, 9) * 10]) % 1000 || 250;
  const total = km * 1000 + m;
  const ordre = un([["le matin", "l'après-midi"], ["d'abord", "ensuite"], ["à l'aller", "au retour"], ["avant la pause", "après la pause"]]);
  const intro = un([`${p.txt} ${act} ${km} km ${ordre[0]}, puis ${m} m ${ordre[1]}.`, `${ordre[0] === "d'abord" ? "D'abord" : cap(ordre[0])}, ${p.nom} ${act} ${km} km ; ${ordre[1]}, ${m} m.`, `${p.txt} ${act} ${km} km, puis encore ${m} m.`]);
  const q = un([`Quelle distance a-t-${p.il} parcourue en tout, en mètres ?`, `Combien de mètres a-t-${p.il} faits en tout ?`, "Quelle est la longueur totale de son trajet, en mètres ?", "Combien de mètres en tout ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(total, [km + m, km * 100 + m, km * 10000 + m, km * 1000 + m * 10], "m"),
    explanation: exp("On n'additionne que des longueurs écrites dans la même unité.", "1 km = 1 000 m : on convertit, puis on additionne.", `${km} km = ${fr(km * 1000)} m ; ${fr(km * 1000)} + ${fr(m)} = ${fr(total)}.`, `${cap(p.il)} a parcouru ${lg(total, "m")}.`),
    canvas: barre([{ label: `${ordre[0]} : ${km} km` }, { label: `${ordre[1]} : ${m} m` }], "? m"),
  };
}

const RESTES: readonly (readonly [string, Metier])[] = [
  ["un rouleau de ruban", ["couturière", "couturier"]],
  ["une corde", ["marin", "marin"]],
  ["un tuyau", ["plombière", "plombier"]],
  ["un câble", ["électricienne", "électricien"]],
  ["un rouleau de papier peint", ["décoratrice", "décorateur"]],
  ["une planche", ["menuisière", "menuisier"]],
  ["une guirlande", ["décoratrice", "décorateur"]],
  ["un rouleau de tissu", ["couturière", "couturier"]],
  ["une ficelle", ["fleuriste", "fleuriste"]],
  ["un fil électrique", ["électricienne", "électricien"]],
  ["une bande de cuir", ["maroquinière", "maroquinier"]],
  ["un rouleau de grillage", ["éleveuse", "éleveur"]],
];
/** ★3 — M m, on coupe c cm : il reste ? cm. */
function defiReste(): Gen {
  const [o, metier] = un(RESTES);
  const p = perso(metier);
  const M = entre(2, 6);
  const c = un([entre(1, 9) * 5, entre(11, 99), entre(101, 99 + M * 100 - 100)]);
  const reste = M * 100 - c;
  const intro = un([`${p.txt} a ${o} de ${M} m. ${sujet(p)} en coupe ${c} cm.`, `${cap(o)} mesure ${M} m. ${p.nom} en coupe un morceau de ${c} cm.`, `${p.txt} coupe ${c} cm dans ${o} de ${M} m.`]);
  const q = un(["Quelle longueur reste-t-il, en centimètres ?", "Combien de centimètres reste-t-il ?", "Que reste-t-il, en cm ?", "Quelle est la longueur du morceau restant, en centimètres ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(reste, [M * 100 + c, Math.abs(c - M), M * 1000 - c, M * 10 * 10 - c + 100, M * 10 - c], "cm"),
    explanation: exp("On ne soustrait que des longueurs écrites dans la même unité.", "1 m = 100 cm : on convertit, puis on enlève le morceau coupé.", `${M} m = ${M * 100} cm ; ${M * 100} − ${c} = ${reste}.`, `Il reste ${lg(reste, "cm")}.`),
    canvas: barre([{ label: `coupé : ${c} cm` }, { label: "reste : ?", unknown: true }], `${M} m`),
  };
}

/** ★3 — trajet de a km b m, déjà d m : il reste ? m. */
function defiManque(): Gen {
  const [act, metier] = un(TRAJETS.filter(([v]) => v !== "nage" && !v.startsWith("rame")));
  const p = perso(metier);
  const a = entre(1, 4);
  const b = un([0, entre(1, 9) * 100, entre(1, 9) * 50]);
  const T = a * 1000 + b;
  const d = entre(2, Math.floor(T / 50) - 1) * 50;
  const reste = T - d;
  const tT = b ? `${a} km ${b} m` : `${a} km`;
  const but = un(BUTS);
  const intro = un([`Pour ${but}, ${p.nom} doit faire ${tT}. ${sujet(p)} a déjà fait ${lg(d, "m")}.`, `${p.txt} ${act} ${tT} pour ${but}. ${sujet(p)} en a déjà fait ${lg(d, "m")}.`, `Il faut ${tT} pour ${but}. ${p.nom} a déjà parcouru ${lg(d, "m")}.`]);
  const q = un([`Combien de mètres lui reste-t-il ?`, "Quelle distance reste-t-il, en mètres ?", `Combien de mètres doit-${p.il} encore faire ?`]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(reste, [T + d, a * 1000 - d, Math.abs(a + b - d), a * 100 + b - d, reste + 100], "m"),
    explanation: exp("On calcule ce qui manque : le trajet entier moins ce qui est déjà fait.", "On écrit d'abord tout en mètres (1 km = 1 000 m).", `${tT} = ${lg(T, "m")} ; ${fr(T)} − ${fr(d)} = ${fr(reste)}.`, `Il reste ${lg(reste, "m")}.`),
    canvas: barre([{ label: `déjà fait : ${lg(d, "m")}` }, { label: "reste : ?", unknown: true }], tT),
  };
}

const PISTES: readonly (readonly [string, number[], Metier])[] = [
  ["d'une piste d'athlétisme", [400], ["athlète", "athlète"]],
  ["d'un stade", [300, 350, 400], ["entraîneuse", "entraîneur"]],
  ["d'un parc", [500, 600, 700, 750, 800], ["coureuse", "coureur"]],
  ["d'un lac", [800, 900, 1200, 1500], ["randonneuse", "randonneur"]],
  ["de la cour de l'école", [150, 200, 250], ["maîtresse", "maître"]],
  ["d'un circuit de karting", [600, 700, 800, 900], ["pilote", "pilote"]],
  ["d'un hippodrome", [1200, 1500, 1800], ["jockey", "jockey"]],
  ["d'un vélodrome", [250, 333, 400], ["cycliste", "cycliste"]],
  ["d'une piste de roller", [200, 250, 300], ["animatrice", "animateur"]],
  ["d'une île au large", [1500, 2000, 2500], ["kayakiste", "kayakiste"]],
];
/** ★4 — n tours de X m : en m, ou en km et m. */
function defiTours(): Gen {
  const [piste, longueurs, metier] = un(PISTES);
  const p = perso(metier);
  const X = un(longueurs);
  let n = entre(2, 9);
  while (n * X < 1000) n++;
  const T = n * X;
  const intro = un([`${p.txt} fait ${n} tours ${piste}. Un tour mesure ${lg(X, "m")}.`, `Un tour ${piste} fait ${lg(X, "m")}. ${p.txt} en fait ${n}.`, `${p.txt} s'entraîne : ${n} tours ${piste} de ${lg(X, "m")} chacun.`]);
  const enKm = T % 1000 !== 0 && Math.random() < 0.5;
  if (enKm) {
    const a = Math.floor(T / 1000);
    const b = T % 1000;
    const juste = `${a} km ${b} m`;
    return {
      text: `${intro} ${un([`Quelle distance parcourt-${p.il}, en km et m ?`, "Écris la distance totale en kilomètres et mètres.", `Combien de kilomètres et de mètres fait-${p.il} en tout ?`])}`,
      ...qcm(juste, [`${a * 10} km ${b} m`, `${a} km ${fr(b * 10)} m`, ...(T % 100 ? [`${fr(Math.floor(T / 100))} km ${T % 100} m`] : []), `${n} km ${X} m`].filter((s) => s !== juste)),
      explanation: exp("Un tour se répète n fois : c'est une multiplication.", "On calcule la distance en mètres, puis on fait des paquets de 1 000 m (1 km).", `${n} × ${fr(X)} = ${fr(T)} ; ${fr(T)} m = ${juste}.`, `${cap(p.il)} parcourt ${juste}.`),
      canvas: barre(Array.from({ length: Math.min(n, 8) }, () => ({ label: `${fr(X)} m` })), `${n} tours : ?`),
    };
  }
  return {
    text: `${intro} ${un([`Quelle distance parcourt-${p.il} en tout, en mètres ?`, "Combien de mètres en tout ?", `Combien de mètres fait-${p.il} ?`])}`,
    ...qcmL(T, [n + X, T * 10, T / 10, (n - 1) * X, T + X], "m"),
    explanation: exp("Un tour se répète n fois : c'est une multiplication.", `On multiplie la longueur d'un tour par ${n}.`, `${n} × ${fr(X)} = ${fr(T)}.`, `${cap(p.il)} parcourt ${lg(T, "m")}.`),
    canvas: barre(Array.from({ length: Math.min(n, 8) }, () => ({ label: `${fr(X)} m` })), `${n} tours : ?`),
  };
}

/** ★4 — M m coupés en n morceaux égaux : chaque morceau en cm. */
function defiMorceaux(): Gen {
  const [o, metier] = un(RESTES);
  const p = perso(metier);
  let M = 0;
  let n = 0;
  for (let k = 0; k < 50; k++) {
    M = entre(1, 9);
    n = un([2, 3, 4, 5, 6, 8]);
    if ((M * 100) % n === 0 && M % n !== 0) break;
  }
  if ((M * 100) % n !== 0 || M % n === 0) [M, n] = [un([2, 3, 6]), 8];
  const r = (M * 100) / n;
  const intro = un([`${p.txt} coupe ${o} de ${M} m en ${n} morceaux de même longueur.`, `${cap(o)} mesure ${M} m. ${p.nom} le partage en ${n} morceaux égaux.`.replace("le partage", estF(o) ? "la partage" : "le partage"), `${p.txt} partage ${o} de ${M} m en ${n} parts égales.`]);
  const q = un(["Combien mesure chaque morceau, en centimètres ?", "Quelle est la longueur d'un morceau, en cm ?", "Combien de centimètres mesure un morceau ?"]);
  return {
    text: `${intro} ${q}`,
    ...qcmL(r, [(M * 10) / n, M * 100 * n, M * 100 - n, (M * 1000) / n, r + 10], "cm"),
    explanation: exp("Partager en morceaux égaux, c'est diviser.", "1 m = 100 cm : on convertit d'abord, puis on divise.", `${M} m = ${M * 100} cm ; ${M * 100} ÷ ${n} = ${fr(r)}.`, `Chaque morceau mesure ${lg(r, "cm")}.`),
    canvas: barre(Array.from({ length: n }, () => ({ label: "?" })), `${M} m`),
  };
}

const ASSEZ: readonly (readonly [string, string, Metier])[] = [
  ["ruban", "emballer des cadeaux", ["vendeuse", "vendeur"]],
  ["ficelle", "attacher des bouquets", ["fleuriste", "fleuriste"]],
  ["tissu", "coudre des écharpes", ["couturière", "couturier"]],
  ["corde", "faire des cordes à sauter", ["animatrice", "animateur"]],
  ["fil électrique", "brancher des lampes", ["électricienne", "électricien"]],
  ["galon", "border des coussins", ["couturière", "couturier"]],
  ["guirlande", "décorer des fenêtres", ["décoratrice", "décorateur"]],
  ["laine", "tricoter des bracelets", ["tricoteuse", "tricoteur"]],
  ["baguette de bois", "faire des cadres", ["encadreuse", "encadreur"]],
  ["tuyau", "arroser des jardinières", ["jardinière", "jardinier"]],
];
/** ★4 — est-ce assez ? (la phrase juste, et celles des erreurs) */
function defiAssez(): Gen {
  const [fil, but, metier] = un(ASSEZ);
  const p = perso(metier);
  const M = entre(2, 6);
  const n = entre(3, 6);
  const c = un([45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 120, 150]);
  const besoin = n * c;
  const dispo = M * 100;
  const phrase = (d: number) => (d === 0 ? "oui, c'est juste assez" : d > 0 ? `oui, il en reste ${lg(d, "cm")}` : `non, il en manque ${lg(-d, "cm")}`);
  const d = dispo - besoin;
  const faux = [phrase(M * 10 - besoin), phrase(dispo - c), phrase(-d), phrase(dispo - besoin - c)];
  return {
    text: `${p.txt} a ${M} m de ${fil}. ${sujet(p)} veut ${but} : il faut ${n} morceaux de ${c} cm. ${un(["A-t-il assez ?", "Est-ce assez ?", "Y en a-t-il assez ?"]).replace("A-t-il", `A-t-${p.il}`)}`,
    ...qcm(phrase(d), faux),
    explanation: exp("On compare ce qu'il faut et ce qu'on a, dans la même unité.", `On calcule le besoin (${n} × ${c} cm), et on écrit ${M} m en centimètres.`, `${n} × ${c} = ${besoin} cm ; ${M} m = ${dispo} cm ; ${dispo} − ${besoin} = ${d}.`, `Réponse : ${phrase(d)}.`),
    canvas: barre(Array.from({ length: n }, () => ({ label: `${c} cm` })), `${M} m de ${fil}`),
  };
}

const CHEMINS = ["par la forêt", "par la plage", "par le pont", "par le village", "par la rivière", "par le marché", "par la colline", "par le parc", "par le port", "par les champs"];
/** ★4 — deux chemins en deux étapes : lequel est le plus court ? */
function defiChemins(): Gen {
  const [c1, c2] = melange([...CHEMINS]).slice(0, 2);
  const p = perso(un([["factrice", "facteur"], ["randonneuse", "randonneur"], ["promeneuse de chiens", "promeneur de chiens"], ["guide", "guide"], ["infirmière", "infirmier"]] as Metier[]));
  const a1 = entre(1, 3);
  const a2 = entre(1, 9) * 100;
  const T1 = a1 * 1000 + a2;
  const r = Math.random();
  const T2 = r < 0.15 ? T1 : T1 + un([-300, -200, -100, 100, 200, 300]);
  const b1 = entre(Math.min(3, Math.floor(T2 / 100) - 1), Math.floor(T2 / 100) - 1) * 100;
  const b2 = T2 - b1;
  const plusCourt = Math.random() < 0.6;
  const tA = `${a1} km et ${lg(a2, "m")}`;
  const tB = `${lg(b1, "m")} et ${lg(b2, "m")}`;
  const intro = `${p.txt} peut ${un(BUTS)} ${c1} (${tA}) ou ${c2} (${tB}).`;
  const q = plusCourt ? un(["Quel chemin est le plus court ?", `Quel chemin doit-${p.il} prendre pour marcher le moins ?`, "Quel chemin fait marcher le moins ?"]) : un(["Quel chemin est le plus long ?", "Quel chemin fait marcher le plus ?", `Par où marchera-t-${p.il} le plus ?`]);
  const egal = T1 === T2;
  const juste = egal ? "les deux chemins ont la même longueur" : plusCourt === T1 < T2 ? `le chemin ${c1}` : `le chemin ${c2}`;
  return {
    text: `${intro} ${q}`,
    ...qcm(juste, [`le chemin ${c1}`, `le chemin ${c2}`, "les deux chemins ont la même longueur"]),
    explanation: exp("On calcule la longueur de chaque chemin, dans la même unité.", "1 km = 1 000 m : on écrit tout en mètres, puis on additionne les étapes.", `${c1} : ${fr(a1 * 1000)} + ${fr(a2)} = ${lg(T1, "m")} ; ${c2} : ${fr(b1)} + ${fr(b2)} = ${lg(T2, "m")}.`, egal ? "Les deux chemins ont la même longueur." : `Réponse : ${juste}.`),
    canvas: tableauLongueurs([[c1, tA], [c2, tB]], "Chemin"),
  };
}

const defiItems: TutorBankItemV4[] = [
  DEFI("ajout", 3, "Convertis les km en m avant d'additionner.", defiAjout),
  DEFI("reste", 3, "Convertis les m en cm avant de soustraire.", defiReste),
  DEFI("manque", 3, "Écris tout en mètres, puis fais trajet − déjà fait.", defiManque),
  DEFI("tours", 4, "Un tour, n fois : multiplie.", defiTours),
  DEFI("morceaux", 4, "Convertis en cm, puis divise.", defiMorceaux),
  DEFI("assez", 4, "Calcule ce qu'il faut, convertis ce qu'on a, compare.", defiAssez),
  DEFI("chemins", 4, "Calcule chaque chemin en mètres.", defiChemins),
];

export const longueurBank: TutorBankItemV4[] = [...mesurerItems, ...comparerItems, ...convertirItems, ...estimerItems, ...defiItems];
