// knowledge/maths/5e/nombres_relatifs.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatSigned(n: number): string {
  return n > 0 ? `+${n}` : String(n);
}

function signedChoices(values: number[]): string[] {
  return values.map((v) => formatSigned(v));
}

function uniqueNumbers(values: number[]): number[] {
  return Array.from(new Set(values));
}

function expl(calcul: string) {
  return (
    "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
    "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : le nombre relatif choisi répond à la question."
  );
}

function numberLine(
  points: { value: number; label: string }[],
  min = -5,
  max = 5
) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step: 1,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: true,
      showPointLabels: true,
      showZero: true,
    },
  };
}

// ⭐ 09/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 09/10 : 5 à 14
// squelettes par micro, 13 à 18 répétitions sur 20. Chaque gabarit compose une
// situation (températures, altitudes, étages, comptes, scores…) × une tournure ×
// un prénom ; il a son correcteur dans correcteurs/nombres-relatifs.ts.
// ⛔ Le signe moins est « − » (pas le tiret « - ») : `vraiMoins` le rétablit
// partout à la sortie du fichier, items figés compris (voir en bas).
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export const il = (p: Prenom) => (p.f ? "elle" : "il");
export const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function choix<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
/** Un entier non nul entre -max et max. */
export function nonNul(max: number) {
  const n = randInt(1, max);
  return Math.random() < 0.5 ? -n : n;
}
/** « −7 », « +7 » (ou « 7 » si `plus` est faux), « 0 » ; virgule décimale. */
export function rel(n: number, plus = true) {
  const v = String(Math.abs(n)).replace(".", ",");
  return n < 0 ? `−${v}` : n > 0 && plus ? `+${v}` : v;
}
/** Un relatif écrit APRÈS une opération : « (−3) », « (+3) » ou « 3 ». */
export function par(n: number, plus = false) {
  return n < 0 ? `(−${String(-n).replace(".", ",")})` : plus ? `(+${String(n).replace(".", ",")})` : String(n).replace(".", ",");
}
/** Les écritures acceptées d'un relatif : « −7 », « -7 » ; « +7 », « 7 » ; avec l'unité d'abord. */
export function attendus(n: number, unite = ""): string[] {
  const u = unite ? ` ${unite}` : "";
  const base = n > 0 ? [`${rel(n, false)}${u}`, `+${rel(n, false)}${u}`] : [`${rel(n)}${u}`, `${rel(n).replace("−", "-")}${u}`];
  return unite ? [...base, ...attendus(n)] : base;
}

/** ⛔ Le vrai signe moins : « -7 », « (-3) », « 5 - 3 », « le signe - » → « − ». Les traits d'union des mots restent. */
export function moins(s: string): string {
  return s.replace(/(?<!\p{L})-(?=\s?[\d(+−-])/gu, "−").replace(/(?<=\s)-(?=[\s,.)])/g, "−");
}
function vraiMoinsQ<T extends Partial<TutorGeneratedQuestionV4>>(q: T): T {
  return {
    ...q,
    ...(q.text != null ? { text: moins(q.text) } : {}),
    ...(q.choices ? { choices: q.choices.map(moins) } : {}),
    ...(q.expected ? { expected: q.expected.map((e) => moins(String(e))) } : {}),
    ...(q.explanation != null ? { explanation: moins(q.explanation) } : {}),
    ...((q as any).hint != null ? { hint: moins((q as any).hint) } : {}),
  };
}
/** Appliqué à toute la banque : items figés réécrits, gabarits enveloppés. */
export function vraiMoins(items: TutorBankItemV4[]): TutorBankItemV4[] {
  return items.map((it) =>
    it.kind === "template"
      ? { ...it, hint: it.hint != null ? moins(it.hint) : it.hint, generate: (ctx) => vraiMoinsQ(it.generate(ctx)) }
      : (vraiMoinsQ(it as any) as TutorBankItemV4),
  );
}

/** « 1 degré », « 3 degrés ». */
export const pl = (a: number, mot: string) => `${a} ${mot}${a > 1 ? "s" : ""}`;
const ord = (a: number) => (a === 1 ? "1er" : `${a}e`);

/** Une grandeur repérée par un relatif (14 situations). Le signe se lit dans les MOTS
 *  (`dire`, `sens` : « au-dessous de zéro », « sous le niveau de la mer ») ou dans le NOMBRE (`affiche`). */
export type Repere = {
  max: number;
  /** L'unité de la réponse (« °C », « m », « € », « cm ») ou "". */
  unite: string;
  dire: (p: Prenom, n: number) => string;
  sens: (n: number) => string;
  affiche: (p: Prenom, n: number) => string;
};
const A = Math.abs;
export const REPERES: Repere[] = [
  {
    max: 25, unite: "°C",
    dire: (p, n) => `Ce matin, chez ${p.nom}, il fait ${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro.`,
    sens: (n) => `${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro`,
    affiche: (p, n) => `Ce matin, le thermomètre ${de(p.nom)} affiche ${rel(n)} °C.`,
  },
  {
    max: 40, unite: "m",
    dire: (p, n) => (n < 0 ? `${p.nom} plonge à ${-n} m sous le niveau de la mer.` : `${p.nom} grimpe sur une falaise, à ${n} m au-dessus du niveau de la mer.`),
    sens: (n) => `${A(n)} m ${n < 0 ? "sous le" : "au-dessus du"} niveau de la mer`,
    affiche: (p, n) => `Sur la carte ${de(p.nom)}, un point est noté à l’altitude ${rel(n)} m.`,
  },
  {
    max: 5, unite: "",
    dire: (p, n) => `${p.nom} prend l’ascenseur jusqu’au ${ord(A(n))} ${n < 0 ? "sous-sol" : "étage"}.`,
    sens: (n) => `le ${ord(A(n))} ${n < 0 ? "sous-sol" : "étage"}`,
    affiche: (p, n) => `Dans l’ascenseur, ${p.nom} appuie sur le bouton ${rel(n)}.`,
  },
  {
    max: 80, unite: "€",
    dire: (p, n) => (n < 0 ? `Le compte ${de(p.nom)} est à découvert de ${-n} €.` : `Le compte ${de(p.nom)} a ${n} € d’avance.`),
    sens: (n) => (n < 0 ? `un découvert de ${-n} €` : `${n} € d’avance`),
    affiche: (p, n) => `Le relevé du compte ${de(p.nom)} indique ${rel(n)} €.`,
  },
  {
    max: 8, unite: "",
    dire: (p, n) => `Au golf, ${p.nom} fait un trou en ${pl(A(n), "coup")} de ${n < 0 ? "moins" : "plus"} que le par.`,
    sens: (n) => `${pl(A(n), "coup")} de ${n < 0 ? "moins" : "plus"} que le par`,
    affiche: (p, n) => `Au golf, la carte ${de(p.nom)} indique ${rel(n)} pour ce trou.`,
  },
  {
    max: 30, unite: "",
    dire: (p, n) => `Au jeu, ${p.nom} ${n < 0 ? "perd" : "gagne"} ${pl(A(n), "point")} en un tour.`,
    sens: (n) => `${pl(A(n), "point")} ${n < 0 ? "perdu" : "gagné"}${A(n) > 1 ? "s" : ""}`,
    affiche: (p, n) => `Au jeu, le score du tour ${de(p.nom)} est ${rel(n)}.`,
  },
  {
    max: 25, unite: "°C",
    dire: (p, n) => `Le congélateur ${de(p.nom)} affiche ${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro.`,
    sens: (n) => `${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro`,
    affiche: (p, n) => `L’écran du congélateur ${de(p.nom)} indique ${rel(n)} °C.`,
  },
  {
    max: 12, unite: "",
    dire: (p, n) => `Sur un jeu de plateau, ${p.nom} ${n < 0 ? "recule" : "avance"} de ${pl(A(n), "case")}.`,
    sens: (n) => `${n < 0 ? "reculer" : "avancer"} de ${pl(A(n), "case")}`,
    affiche: (p, n) => `Sur le jeu de plateau, la carte tirée par ${p.nom} indique ${rel(n)}.`,
  },
  {
    max: 50, unite: "cm",
    dire: (p, n) => `${p.nom} note que la rivière est à ${A(n)} cm ${n < 0 ? "au-dessous" : "au-dessus"} de son niveau habituel.`,
    sens: (n) => `${A(n)} cm ${n < 0 ? "au-dessous" : "au-dessus"} du niveau habituel`,
    affiche: (p, n) => `L’échelle de la rivière, relevée par ${p.nom}, indique ${rel(n)} cm.`,
  },
  {
    max: 20, unite: "°C",
    dire: (p, n) => `En montagne, au refuge où dort ${p.nom}, il fait ${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro.`,
    sens: (n) => `${pl(A(n), "degré")} ${n < 0 ? "au-dessous" : "au-dessus"} de zéro`,
    affiche: (p, n) => `Au refuge où dort ${p.nom}, le thermomètre indique ${rel(n)} °C.`,
  },
  {
    max: 40, unite: "€",
    dire: (p, n) => `Au marché, ${p.nom} ${n < 0 ? "dépense" : "gagne"} ${A(n)} € en une matinée.`,
    sens: (n) => `${A(n)} € ${n < 0 ? "dépensés" : "gagnés"}`,
    affiche: (p, n) => `Le carnet de marché ${de(p.nom)} indique ${rel(n)} € pour la matinée.`,
  },
  {
    max: 900, unite: "",
    dire: (p, n) => `${p.nom} lit sur une frise : l’an ${A(n)} ${n < 0 ? "avant" : "après"} J.-C.`,
    sens: (n) => `l’an ${A(n)} ${n < 0 ? "avant" : "après"} J.-C.`,
    affiche: (p, n) => `Sur la frise ${de(p.nom)}, une date est notée ${rel(n)}.`,
  },
  {
    max: 10, unite: "m",
    dire: (p, n) => (n < 0 ? `Un fou de Bassan, vu par ${p.nom}, plonge à ${-n} m sous la surface de l’eau.` : `Un fou de Bassan, vu par ${p.nom}, vole à ${n} m au-dessus de l’eau.`),
    sens: (n) => `${A(n)} m ${n < 0 ? "sous la surface" : "au-dessus de l’eau"}`,
    affiche: (p, n) => `Le capteur fixé sur un oiseau marin, suivi par ${p.nom}, indique ${rel(n)} m.`,
  },
  {
    max: 4, unite: "",
    dire: (p, n) => `Dans le parking, ${p.nom} gare la voiture au niveau ${A(n)} ${n < 0 ? "sous" : "au-dessus de"} la rue.`,
    sens: (n) => `le niveau ${A(n)} ${n < 0 ? "sous" : "au-dessus de"} la rue`,
    affiche: (p, n) => `Au parking, le ticket ${de(p.nom)} indique le niveau ${rel(n)}.`,
  },
];

export const VILLES = ["Lille", "Brest", "Grenoble", "Strasbourg", "Chamonix", "Lyon", "Briançon", "Metz", "Annecy", "Besançon", "Reims", "Gap"];
/** Deux éléments différents d'une liste. */
export function deux<T>(arr: readonly T[]): [T, T] {
  const a = choix(arr);
  let b = choix(arr);
  while (b === a) b = choix(arr);
  return [a, b];
}

/** Comparer deux relatifs en situation (10 situations) : la phrase, la question, l'unité de la réponse. */
export function comparaison(a: number, b: number, plusGrand: boolean) {
  const [p, q] = deux(PRENOMS);
  const [v1, v2] = deux(VILLES);
  const sits = [
    { u: "°C", t: `Ce matin, il fait ${rel(a)} °C à ${v1} et ${rel(b)} °C à ${v2}.`, g: "Quelle température est la plus élevée ?", pt: "Quelle température est la plus basse ?" },
    { u: "m", t: `Sur la carte ${de(p.nom)}, le point A est à l’altitude ${rel(a)} m et le point B à ${rel(b)} m.`, g: "Quelle altitude est la plus haute ?", pt: "Quelle altitude est la plus basse ?" },
    { u: "", t: `Au jeu, ${p.nom} a un score de ${rel(a)} et ${q.nom} un score de ${rel(b)}.`, g: "Quel est le meilleur score ?", pt: "Quel est le moins bon score ?" },
    { u: "", t: `Dans l’ascenseur, ${p.nom} va au niveau ${rel(a)} et ${q.nom} au niveau ${rel(b)}.`, g: "Quel niveau est le plus haut ?", pt: "Quel niveau est le plus bas ?" },
    { u: "€", t: `Le compte ${de(p.nom)} est à ${rel(a)} € et celui ${de(q.nom)} à ${rel(b)} €.`, g: "Quel solde est le plus élevé ?", pt: "Quel solde est le plus bas ?" },
    { u: "", t: `Au golf, ${p.nom} termine à ${rel(a)} et ${q.nom} à ${rel(b)} par rapport au par.`, g: "Quel résultat est le plus grand ?", pt: "Quel résultat est le plus petit ?" },
    { u: "", t: `Sur la frise ${de(p.nom)}, deux dates sont notées ${rel(a)} et ${rel(b)}.`, g: "Quelle date est la plus récente ?", pt: "Quelle date est la plus ancienne ?" },
    { u: "", t: `${p.nom} hésite entre ${rel(a)} et ${rel(b)}.`, g: "Lequel est le plus grand ?", pt: "Lequel est le plus petit ?" },
    { u: "", t: `Sur la droite graduée, ${p.nom} place ${rel(a)} et ${rel(b)}.`, g: "Lequel est le plus à droite ?", pt: "Lequel est le plus à gauche ?" },
    { u: "°C", t: `Le congélateur ${de(p.nom)} est à ${rel(a)} °C, celui ${de(q.nom)} à ${rel(b)} °C.`, g: "Quelle température est la plus élevée ?", pt: "Quelle température est la plus basse ?" },
  ];
  const s = choix(sits);
  const rep = plusGrand ? Math.max(a, b) : Math.min(a, b);
  return { phrase: s.t, question: plusGrand ? s.g : s.pt, unite: s.u, rep };
}

/** Une droite graduée tirée au hasard : pas de 1, 2, 5 ou 10, une fenêtre qui contient 0. */
export function droiteAuHasard() {
  const step = choix([1, 1, 1, 2, 2, 5, 10]);
  const ticks = choix([10, 12]);
  const gauche = randInt(2, ticks - 2);
  const min = -gauche * step;
  return { min, max: min + ticks * step, step };
}
/** `k` valeurs distinctes non nulles sur les graduations de la droite (au moins une négative). */
export function pointsSurDroite(d: { min: number; max: number; step: number }, k: number) {
  const vals = new Set<number>([d.min + d.step * randInt(0, -d.min / d.step - 1)]);
  while (vals.size < k) {
    const v = d.min + randInt(0, (d.max - d.min) / d.step) * d.step;
    if (v !== 0) vals.add(v);
  }
  return [...vals];
}
export function lettres(k: number) {
  return shuffle(["A", "B", "C", "D", "E", "F", "G", "H", "K", "M", "N", "P", "R", "S", "T"]).slice(0, k).sort();
}
export function canvasDroite(d: { min: number; max: number; step: number }, points: { value: number; label: string }[]) {
  return { ...numberLine(points, d.min, d.max), step: d.step };
}

const nombresRelatifsBrut: TutorBankItemV4[] = [
  // =========================
  // RELATIF_LIRE
  // =========================
  {
    kind: "fixed",
    id: "relatif_lire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris avec son signe : 4 au-dessus de zéro.",
    format: "short",
    expected: ["+4", "4"],
    comparator: "number_equal",
    hint: "Un nombre au-dessus de zéro est positif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Un nombre situé au-dessus de zéro est positif. On peut l’écrire +4. Dans beaucoup de cas, 4 et +4 désignent le même nombre.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "lecture", "positif"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris avec son signe : 7 au-dessous de zéro.",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "Un nombre au-dessous de zéro est négatif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Un nombre situé au-dessous de zéro est négatif. Il s’écrit avec le signe -, donc -7.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "lecture", "negatif"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle désigne un nombre négatif ?",
    format: "qcm",
    choices: ["+6", "6", "-6", "0"],
    expected: ["-6"],
    comparator: "mcq_exact",
    hint: "Cherche le signe -.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le signe - indique un nombre négatif. Ici, seul -6 est négatif.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "reunion",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "La température au volcan est de 3 °C en dessous de zéro. Écris cette température.",
    format: "short",
    expected: ["-3", "-3 °C"],
    comparator: "number_equal",
    hint: "En dessous de zéro → signe -.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Une température en dessous de zéro est négative. 3 °C en dessous de zéro s’écrit -3 °C.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "lecture", "reunion", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à « moins huit » ?",
    format: "qcm",
    choices: ["8", "+8", "-8", "0"],
    expected: ["-8"],
    comparator: "mcq_exact",
    hint: "Le mot « moins » correspond au signe -.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("« Moins huit » signifie que le nombre est négatif. Il s’écrit -8.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "lecture", "qcm"],
  },

  // =========================
  // RELATIF_SIGNE
  // =========================
  {
    kind: "fixed",
    id: "relatif_signe_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre -5 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Le signe - indique un nombre négatif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le nombre -5 porte le signe -. Il est donc négatif.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre +9 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "Le signe + indique un nombre positif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le nombre +9 porte le signe +. Il est donc positif.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 0 est-il positif, négatif, ou ni l’un ni l’autre ?",
    format: "qcm",
    choices: ["positif", "négatif", "ni l’un ni l’autre"],
    expected: ["ni l’un ni l’autre"],
    comparator: "mcq_exact",
    hint: "0 est la frontière entre les positifs et les négatifs.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("0 n’est ni positif ni négatif. Il sépare les nombres positifs et les nombres négatifs.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "signe", "zero", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Complète : un nombre situé à gauche de 0 sur une droite graduée est ...",
    format: "qcm",
    choices: ["négatif", "positif", "nul"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "À gauche de 0 → signe -.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Sur une droite graduée, les nombres situés à gauche de 0 sont négatifs.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "signe", "droite"],
  },

  // =========================
  // RELATIF_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : -2 ou +3 ?",
    format: "short",
    expected: ["+3", "3"],
    comparator: "number_equal",
    hint: "Tout nombre positif est plus grand que tout nombre négatif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Tout nombre positif est plus grand que tout nombre négatif. Donc +3 est plus grand que -2.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : -5 ou -1 ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Parmi les nombres négatifs, celui qui est le plus à gauche est le plus petit.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Sur une droite graduée, -5 est à gauche de -1. Donc -5 est plus petit que -1.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec > ou < : -3 ... +1",
    format: "short",
    expected: ["<"],
    comparator: "exact_text",
    hint: "Un nombre négatif est inférieur à un nombre positif.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("-3 est négatif et +1 est positif. Donc -3 < +1.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison", "inegalite"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec > ou < : -4 ... -7",
    format: "short",
    expected: [">"],
    comparator: "exact_text",
    hint: "Le nombre le plus proche de 0 est le plus grand parmi deux négatifs.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Parmi deux nombres négatifs, le plus proche de 0 est le plus grand. Comme -4 est plus proche de 0 que -7, on a -4 > -7.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison", "inegalite"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Au Maïdo, il fait -1 °C le matin et +6 °C l’après-midi. Quelle température est la plus grande ?",
    format: "short",
    expected: ["+6", "6", "+6 °C", "6 °C"],
    comparator: "number_equal", // 08/10/2026 : précise et simple (Frédéric)
    hint: "Une température positive est plus grande qu’une température négative.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Une température positive est toujours plus grande qu’une température négative. Donc +6 °C est plus grand que -1 °C.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison", "reunion", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["-8", "-3", "0", "-1"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "0 est plus grand que tous les nombres négatifs.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Parmi -8, -3, 0 et -1, seul 0 n’est pas négatif. Il est donc le plus grand.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "comparaison", "qcm"],
  },

  // =========================
  // RELATIF_PLACER
  // =========================
  {
    kind: "fixed",
    id: "relatif_placer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point correspond au nombre -3 ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Cherche le point placé au-dessus de -3.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Sur la droite graduée, le point A est placé au-dessus de -3. Donc A correspond à -3.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "placement", "qcm", "canvas"],
    canvas: {
      kind: "number_line",
      min: -5,
      max: 5,
      step: 1,
      points: [
        { value: -3, label: "A" },
        { value: -1, label: "B" },
        { value: 2, label: "C" },
        { value: 4, label: "D" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’abscisse du point B ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    hint: "Lis le nombre situé sous le point B.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le point B est placé au-dessus de -2. Son abscisse est donc -2.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "placement", "abscisse", "canvas"],
    canvas: {
      kind: "number_line",
      min: -4,
      max: 4,
      step: 1,
      points: [{ value: -2, label: "B" }],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi A, B et C, quel point est le plus à droite ?",
    format: "qcm",
    choices: ["A", "B", "C"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "Le point le plus à droite correspond au plus grand nombre.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le point le plus à droite représente le plus grand nombre. Ici, C est le plus à droite.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "placement", "comparaison", "canvas", "qcm"],
    canvas: {
      kind: "number_line",
      min: -5,
      max: 5,
      step: 1,
      points: [
        { value: -4, label: "A" },
        { value: 0, label: "B" },
        { value: 3, label: "C" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel point correspond au nombre le plus petit ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["D"],
    comparator: "mcq_exact",
    hint: "Le plus petit est le plus à gauche.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Sur une droite graduée, le plus petit nombre est celui qui est placé le plus à gauche. Ici, c’est le point D.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "placement", "comparaison", "canvas", "qcm"],
    canvas: {
      kind: "number_line",
      min: -6,
      max: 4,
      step: 1,
      points: [
        { value: -1, label: "A" },
        { value: 2, label: "B" },
        { value: 0, label: "C" },
        { value: -5, label: "D" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },

  // =========================
  // RELATIF_OPPOSES
  // =========================
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de +4 ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "L’opposé a la même distance à 0, mais de l’autre côté.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("L’opposé de +4 est le nombre situé à la même distance de 0, mais de l’autre côté. C’est -4.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de -7 ?",
    format: "short",
    expected: ["+7", "7"],
    comparator: "number_equal",
    hint: "On change seulement le signe.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("L’opposé de -7 est +7. Les deux nombres sont symétriques par rapport à 0.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "L’opposé de 0 est ...",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "0 est déjà au centre.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("0 est à la fois à gauche et à droite de lui-même. Son opposé est donc 0.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "oppose", "zero"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Deux nombres opposés ont-ils le même signe ?",
    format: "qcm",
    choices: ["oui", "non", "parfois"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’un est à gauche de 0, l’autre à droite, sauf pour 0.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Deux nombres opposés sont symétriques par rapport à 0. En général, ils n’ont pas le même signe. Le seul cas particulier est 0, qui est son propre opposé.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "oppose", "qcm"],
  },

  // =========================
  // RELATIF_VALEUR_ABSOLUE
  // =========================
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur absolue de -5 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "La valeur absolue est la distance à 0.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("La valeur absolue de -5 est sa distance à 0. Cette distance vaut 5.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur absolue de +8 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On mesure la distance entre le nombre et 0.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("La valeur absolue de +8 est sa distance à 0. Cette distance vaut 8.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    text: "Les nombres -6 et +6 ont-ils la même valeur absolue ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ils sont à la même distance de 0.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("-6 et +6 sont opposés. Ils sont à la même distance de 0. Leur valeur absolue est donc la même : 6.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "valeur_absolue", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre a pour valeur absolue 4 ?",
    format: "qcm",
    choices: ["-4", "+4", "-4 et +4", "0"],
    expected: ["-4 et +4"],
    comparator: "mcq_exact",
    hint: "Deux nombres opposés peuvent avoir la même valeur absolue.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("La valeur absolue mesure seulement la distance à 0. Les nombres -4 et +4 sont tous les deux à distance 4 de 0.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "valeur_absolue", "qcm"],
  },

  // =========================
  // RELATIF_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "relatif_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre négatif. Mon opposé est 6. Qui suis-je ?",
    format: "short",
    expected: ["-6"],
    comparator: "number_equal",
    hint: "Si son opposé est 6, alors le nombre se trouve de l’autre côté de 0.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Le nombre dont l’opposé est 6 est -6. En effet, -6 et +6 sont opposés.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Trouve un nombre négatif plus grand que -5 et plus petit que -2.",
    format: "short",
    expected: ["-4", "-3"],
    comparator: "number_equal",
    hint: "Cherche un entier compris entre -5 et -2.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Les entiers négatifs strictement compris entre -5 et -2 sont -4 et -3. L’un de ces deux nombres convient.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "comparaison", "encadrement"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une droite graduée, A a pour abscisse -4 et B a pour abscisse +1. Quelle est la distance entre A et B ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte le nombre d’unités entre -4 et +1.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Pour aller de -4 à 0, il faut 4 unités. Puis de 0 à +1, il faut encore 1 unité. La distance totale est 5.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "distance", "droite"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Quel autre nombre a la même valeur absolue que -7 ?",
    format: "short",
    expected: ["+7", "7"],
    comparator: "number_equal",
    hint: "Pense à l’opposé de -7.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("-7 est à 7 graduations de 0. L’autre nombre à 7 graduations de 0 est +7, de l’autre côté. Deux nombres opposés ont la même valeur absolue.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "valeur_absolue", "short"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 5,
    theme: "reunion",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Au lever du jour, la température au sommet est de -2 °C. Elle augmente de 5 degrés dans la matinée puis redescend de 3 degrés le soir. Quelle est la température finale ?",
    format: "short",
    expected: ["0", "0 °C"],
    comparator: "number_equal",
    hint: "Pars de -2, puis ajoute 5, puis enlève 3.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("On part de -2. Après une hausse de 5 degrés, on obtient 3. Puis on enlève 3 degrés : on revient à 0. La température finale est donc 0 °C.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "reunion", "temperature", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Je suis un nombre. Je suis négatif, mon opposé est plus petit que 10, et ma valeur absolue vaut 9. Qui suis-je ?",
    format: "short",
    expected: ["-9"],
    comparator: "number_equal",
    hint: "Si la valeur absolue vaut 9 et que le nombre est négatif, il n’y a qu’une possibilité.",
    explanation:
      "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Avoir une valeur absolue de 9 signifie être à distance 9 de 0 : le nombre est donc -9 ou +9. Comme on sait qu’il est négatif, c’est -9. Son opposé est +9, qui est bien plus petit que 10.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "defi", "valeur_absolue", "oppose", "raisonnement"],
  },

  // =========================
  // TEMPLATES - RELATIF_LIRE
  // =========================
  {
    kind: "template",
    id: "relatif_lire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Au-dessus de zéro → positif ; au-dessous de zéro → négatif.",
    tags: ["relatif", "lecture", "template"],
    // 09/10/2026 : une situation (14) × une tournure (4) × un prénom ; le signe se lit dans les mots.
    generate: () => {
      const p = pick(PRENOMS);
      const r = choix(REPERES);
      const n = nonNul(r.max);
      const question = choix([
        "Écris ce nombre avec son signe.",
        "Quel nombre relatif correspond à cette situation ?",
        "Traduis la situation par un nombre relatif.",
        `Quel nombre relatif ${p.nom} doit-${il(p)} noter ?`,
      ]);
      return {
        text: `${r.dire(p, n)} ${question}`,
        format: "short",
        expected: attendus(n, r.unite),
        comparator: "number_equal",
        explanation: expl(
          `« ${r.sens(n)} » : ${n < 0 ? "on est du côté des nombres négatifs, signe −" : "on est du côté des nombres positifs, signe +"}. ` +
            `On écrit ${rel(n)}${r.unite ? ` ${r.unite}` : ""}.`,
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_SIGNE
  // =========================
  {
    kind: "template",
    id: "relatif_signe_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde le signe du nombre.",
    tags: ["relatif", "signe", "template"],
    // 09/10/2026 : le nombre affiché dans une situation (14) ou nu (4 tournures) ; un positif s'écrit parfois sans « + ».
    generate: () => {
      const p = pick(PRENOMS);
      const r = choix(REPERES);
      const enSituation = Math.random() < 0.6;
      const n = nonNul(enSituation ? r.max : 30);
      const positive = n > 0;
      const displayed = rel(n, Math.random() < 0.6);
      const expected = positive ? "positif" : "négatif";

      return {
        text: enSituation
          ? `${r.affiche(p, n)} ${choix(["Ce nombre est-il positif ou négatif ?", "Est-ce un nombre positif ou négatif ?", `${p.nom} lit-${il(p)} un nombre positif ou négatif ?`])}`
          : choix([
              `Le nombre ${displayed} est-il positif ou négatif ?`,
              `${p.nom} écrit ${displayed} au tableau. Ce nombre est-il positif ou négatif ?`,
              `Sur la droite graduée, ${p.nom} place ${displayed}. Est-il positif ou négatif ?`,
              `${displayed} : positif ou négatif ? ${p.nom} doit répondre.`,
            ]),
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          (positive
            ? `${rel(n)} (on peut aussi écrire ${rel(n, false)}, sans signe) est à droite de 0 : il est positif.`
            : `${rel(n)} porte le signe − : il est à gauche de 0, il est négatif.`) +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_COMPARER
  // =========================
  {
    kind: "template",
    id: "relatif_comparer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur une droite graduée, le plus grand est le plus à droite.",
    tags: ["relatif", "comparaison", "template"],
    // 09/10/2026 : deux relatifs quelconques (souvent deux négatifs) en situation (10 × 2 sens) ; réponse tapée, avec l'unité.
    generate: () => {
      const a = nonNul(15);
      let b = Math.random() < 0.5 ? -randInt(1, 15) : nonNul(15);
      while (b === a) b = nonNul(15);
      const plusGrand = Math.random() < 0.5;
      const c = comparaison(a, b, plusGrand);
      return {
        text: `${c.phrase} ${c.question}`,
        format: "short",
        expected: attendus(c.rep, c.unite),
        comparator: "number_equal",
        explanation: expl(
          `Sur une droite graduée, le plus ${plusGrand ? "grand" : "petit"} nombre est le plus à ${plusGrand ? "droite" : "gauche"}. ` +
            `${rel(Math.min(a, b))} < ${rel(Math.max(a, b))}, donc la réponse est ${rel(c.rep)}${c.unite ? ` ${c.unite}` : ""}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_comparer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Parmi deux nombres négatifs, le plus proche de 0 est le plus grand.",
    tags: ["relatif", "comparaison", "inegalite", "template"],
    // 09/10/2026 : surtout deux négatifs (parfois décimaux), nu ou en situation (8 tournures) ; un QCM « < » / « > ».
    generate: () => {
      const p = pick(PRENOMS);
      const decimal = Math.random() < 0.25;
      const tirer = () => (decimal ? -randInt(1, 99) / 10 : Math.random() < 0.75 ? -randInt(1, 20) : nonNul(20));
      const a = tirer();
      let b = tirer();
      while (b === a) b = tirer();
      const sign = a > b ? ">" : "<";
      const [v1, v2] = deux(VILLES);
      const paire = `${rel(a)} … ${rel(b)}`;
      const text = choix([
        `Complète avec < ou > : ${paire}`,
        `${p.nom} compare deux nombres. Quel signe faut-il écrire ? ${paire}`,
        `Quel signe, < ou >, ${p.nom} doit-${il(p)} placer entre les deux nombres ? ${paire}`,
        `Il fait ${rel(a)} °C à ${v1} et ${rel(b)} °C à ${v2}. Complète avec < ou > : ${paire}`,
        `Sur la carte ${de(p.nom)}, deux points sont aux altitudes ${rel(a)} m et ${rel(b)} m. Complète : ${paire}`,
        `Le thermomètre ${de(p.nom)} indiquait ${rel(a)} °C hier et ${rel(b)} °C aujourd’hui. Complète avec < ou > : ${paire}`,
        `${p.nom} range ses relevés. Complète avec le bon signe : ${paire}`,
        `Sur la droite graduée de ${p.nom}, complète avec < ou > : ${paire}`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["<", ">"],
        expected: [sign],
        comparator: "mcq_exact",
        explanation: expl(
          a < 0 && b < 0
            ? `Les deux nombres sont négatifs : le plus grand est le plus proche de 0. Donc ${rel(a)} ${sign} ${rel(b)}.`
            : `Sur la droite graduée, le plus grand est le plus à droite. Donc ${rel(a)} ${sign} ${rel(b)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_comparer_tpl_3_signes",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Un nombre positif est toujours plus grand qu’un nombre négatif.",
    tags: ["relatif", "comparaison", "qcm", "template"],
    // 09/10/2026 : un négatif et un positif (ou 0), en situation (10 × 2 sens) ; QCM à deux choix.
    generate: () => {
      const neg = -randInt(1, 12);
      const pos = Math.random() < 0.15 ? 0 : randInt(1, 12);
      const [a, b] = Math.random() < 0.5 ? [neg, pos] : [pos, neg];
      const plusGrand = Math.random() < 0.5;
      const c = comparaison(a, b, plusGrand);
      const ecrire = (x: number) => `${rel(x)}${c.unite ? ` ${c.unite}` : ""}`;
      return {
        text: `${c.phrase} ${c.question}`,
        format: "qcm",
        choices: [ecrire(a), ecrire(b)],
        expected: [ecrire(c.rep)],
        comparator: "mcq_exact",
        explanation: expl(
          `${rel(neg)} est négatif, ${rel(pos)} ${pos === 0 ? "est zéro" : "est positif"} : ${rel(neg)} < ${rel(pos)}. ` +
            `La réponse est donc ${ecrire(c.rep)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_comparer_tpl_4_ranger",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Place les nombres sur une droite graduée : de gauche à droite, ils sont dans l’ordre croissant.",
    tags: ["relatif", "comparaison", "rangement", "qcm", "template"],
    // 09/10/2026 : ranger quatre relatifs ; les leurres rangent par distance à 0, ou à l'envers.
    generate: () => {
      const p = pick(PRENOMS);
      const vals = new Set<number>();
      while (vals.size < 4) vals.add(Math.random() < 0.65 ? -randInt(1, 15) : randInt(0, 15));
      // Il faut au moins deux négatifs et des distances à 0 toutes différentes.
      let v = [...vals];
      while (v.filter((x) => x < 0).length < 2 || new Set(v.map(Math.abs)).size < 4) {
        v = [-randInt(1, 15), -randInt(1, 15), randInt(0, 15), Math.random() < 0.5 ? -randInt(1, 15) : randInt(0, 15)];
      }
      const croissant = Math.random() < 0.6;
      const sit = choix([
        { u: " °C", t: `${p.nom} a relevé ces températures : ${v.map((x) => `${rel(x)} °C`).join(" ; ")}.`, c: "Range-les de la plus basse à la plus haute.", d: "Range-les de la plus haute à la plus basse." },
        { u: "", t: `Voici des nombres : ${v.map((x) => rel(x)).join(" ; ")}.`, c: `${p.nom} doit les ranger dans l’ordre croissant. Quel rangement est juste ?`, d: `${p.nom} doit les ranger dans l’ordre décroissant. Quel rangement est juste ?` },
        { u: " m", t: `Sur la carte ${de(p.nom)}, quatre points ont pour altitudes ${v.map((x) => `${rel(x)} m`).join(" ; ")}.`, c: "Range-les de la plus basse à la plus haute.", d: "Range-les de la plus haute à la plus basse." },
        { u: "", t: `Au jeu, les scores de la table ${de(p.nom)} sont ${v.map((x) => rel(x)).join(" ; ")}.`, c: "Range-les du plus petit au plus grand.", d: "Range-les du plus grand au plus petit." },
      ]);
      const ecrire = (xs: number[]) => xs.map((x) => `${rel(x)}${sit.u}`).join(croissant ? " < " : " > ");
      const bon = [...v].sort((x, y) => (croissant ? x - y : y - x));
      const parDistance = [...v].sort((x, y) => (croissant ? Math.abs(x) - Math.abs(y) : Math.abs(y) - Math.abs(x)));
      const envers = [...bon].reverse();
      // Piège : les négatifs rangés comme si −8 était plus grand que −3.
      const cleFausse = (x: number) => (x < 0 ? -100 + Math.abs(x) : x);
      const sansSigne = [...v].sort((x, y) => (croissant ? cleFausse(x) - cleFausse(y) : cleFausse(y) - cleFausse(x)));
      const propositions = [...new Set([ecrire(bon), ecrire(parDistance), ecrire(envers), ecrire(sansSigne)])];
      return {
        text: `${sit.t} ${croissant ? sit.c : sit.d}`,
        format: "qcm",
        choices: shuffle(propositions),
        expected: [ecrire(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `Sur une droite graduée, de gauche à droite : ${[...v].sort((x, y) => x - y).map((x) => rel(x)).join(", ")}. ` +
            "Parmi les négatifs, le plus petit est le plus loin de 0." +
            (croissant ? "" : " Dans l’ordre décroissant, on lit dans l’autre sens."),
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_PLACER
  // =========================
  {
    kind: "template",
    id: "relatif_placer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis l’abscisse du point sur la droite graduée.",
    tags: ["relatif", "placement", "canvas", "template"],
    // 09/10/2026 : droite tirée (pas de 1, 2, 5 ou 10 ; fenêtre variable), 2 à 4 points, 5 tournures.
    generate: () => {
      const p = pick(PRENOMS);
      const d = droiteAuHasard();
      const vals = pointsSurDroite(d, randInt(2, 4));
      const labels = lettres(vals.length);
      const points = vals.map((value, i) => ({ value, label: labels[i] }));
      const cible = Math.random() < 0.7 ? points.find((x) => x.value < 0)! : choix(points);
      const L = cible.label;
      const text = choix([
        `Quelle est l’abscisse du point ${L} ?`,
        `${p.nom} lit l’abscisse du point ${L}. Que trouve-t-${il(p)} ?`,
        `Quel nombre correspond au point ${L} ? Attention à la graduation.`,
        `Sur cette droite graduée de ${d.step} en ${d.step}, quel nombre repère le point ${L} ?`,
        `${p.nom} a placé le point ${L} sur la droite graduée. Quelle est son abscisse ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendus(cible.value),
        comparator: "number_equal",
        explanation: expl(
          `La droite est graduée de ${d.step} en ${d.step}. Le point ${L} est ${cible.value < 0 ? "à gauche" : "à droite"} de 0, ` +
            `à ${Math.abs(cible.value) / d.step} graduation${Math.abs(cible.value) / d.step > 1 ? "s" : ""} : son abscisse est ${rel(cible.value)}.`,
        ),
        canvas: canvasDroite(d, points),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_placer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point le plus à droite correspond au plus grand nombre.",
    tags: ["relatif", "placement", "comparaison", "canvas", "template"],
    // 09/10/2026 : 3 ou 4 points sur une droite tirée ; six critères (droite, gauche, plus grande ou plus petite
    // abscisse, plus proche ou plus loin de 0) × un prénom.
    generate: () => {
      const p = pick(PRENOMS);
      const d = droiteAuHasard();
      let vals = pointsSurDroite(d, randInt(3, 4));
      while (new Set(vals.map(Math.abs)).size < vals.length) vals = pointsSurDroite(d, vals.length);
      const labels = lettres(vals.length);
      const points = vals.map((value, i) => ({ value, label: labels[i] }));
      const crit = choix([
        { q: "est le plus à droite", f: (x: number) => x, max: true },
        { q: "est le plus à gauche", f: (x: number) => x, max: false },
        { q: "a la plus grande abscisse", f: (x: number) => x, max: true },
        { q: "a la plus petite abscisse", f: (x: number) => x, max: false },
        { q: "est le plus proche de 0", f: (x: number) => Math.abs(x), max: false },
        { q: "est le plus loin de 0", f: (x: number) => Math.abs(x), max: true },
      ]);
      const best = points.reduce((b, c) => ((crit.max ? crit.f(c.value) > crit.f(b.value) : crit.f(c.value) < crit.f(b.value)) ? c : b));
      const text = choix([
        `Quel point ${crit.q} ?`,
        `${p.nom} regarde la droite graduée. Quel point ${crit.q} ?`,
        `Parmi les points placés par ${p.nom}, lequel ${crit.q} ?`,
        `Sur cette droite graduée, quel point ${crit.q} ? ${p.nom} hésite.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: labels,
        expected: [best.label],
        comparator: "mcq_exact",
        explanation: expl(
          `Les abscisses sont : ${points.map((x) => `${x.label} = ${rel(x.value)}`).join(", ")}. ` +
            `Le point qui ${crit.q} est ${best.label}.` +
            (crit.f(-1) === 1 ? " On compare les distances à 0, sans tenir compte du signe." : " Plus un point est à droite, plus son abscisse est grande."),
        ),
        canvas: canvasDroite(d, points),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_placer_tpl_3_quel_point",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pars de 0 : à gauche pour un négatif, à droite pour un positif, en comptant les graduations.",
    tags: ["relatif", "placement", "qcm", "canvas", "template"],
    // 09/10/2026 : quel point est placé en x ? (3 ou 4 points, un leurre à l'opposé de x) × 5 tournures.
    generate: () => {
      const p = pick(PRENOMS);
      const d = droiteAuHasard();
      let vals = pointsSurDroite(d, randInt(3, 4));
      const x = vals[0];
      // Le piège : l'opposé de x, s'il tient sur la droite.
      if (-x <= d.max && !vals.includes(-x)) vals = [x, -x, ...vals.slice(1, vals.length - 1)];
      const labels = lettres(vals.length);
      const points = shuffle(vals).map((value, i) => ({ value, label: labels[i] }));
      const bon = points.find((pt) => pt.value === x)!;
      const text = choix([
        `Quel point a pour abscisse ${rel(x)} ?`,
        `${p.nom} a placé le nombre ${rel(x)} sur la droite graduée. Quelle lettre a-t-${il(p)} écrite ?`,
        `Sur cette droite graduée, quel point est placé en ${rel(x)} ?`,
        `Le thermomètre couché ${de(p.nom)} est gradué en degrés. Quel point marque ${rel(x)} °C ?`,
        `${p.nom} cherche le point d’abscisse ${rel(x)}. Lequel est-ce ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: labels,
        expected: [bon.label],
        comparator: "mcq_exact",
        explanation: expl(
          `La droite est graduée de ${d.step} en ${d.step}. ${rel(x)} est ${x < 0 ? "à gauche" : "à droite"} de 0, à ${Math.abs(x) / d.step} graduation${Math.abs(x) / d.step > 1 ? "s" : ""} : c’est le point ${bon.label}.`,
        ),
        canvas: canvasDroite(d, points),
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_OPPOSES
  // =========================
  {
    kind: "template",
    id: "relatif_oppose_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "L’opposé a la même distance à 0, mais de l’autre côté.",
    tags: ["relatif", "oppose", "template"],
    // 09/10/2026 : retrouver le nombre dont on connaît l'opposé, ou compléter « x + … = 0 » (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const x = nonNul(30);
      const text = choix([
        `L’opposé d’un nombre est ${rel(x)}. Quel est ce nombre ?`,
        `${p.nom} pense à un nombre. Son opposé est ${rel(x)}. À quel nombre pense-t-${il(p)} ?`,
        `Complète : ${rel(x)} + … = 0`,
        `Complète : … + ${par(x, true)} = 0`,
        `Quel nombre est à la même distance de 0 que ${rel(x)}, mais de l’autre côté ? ${p.nom} cherche.`,
        `${p.nom} doit ajouter un nombre à ${rel(x)} pour revenir à 0. Lequel ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendus(-x),
        comparator: "number_equal",
        explanation: expl(
          `${rel(x)} et ${rel(-x)} sont opposés : même distance à 0, de part et d’autre de 0. Leur somme vaut 0 : ${rel(x)} + ${par(-x, true)} = 0.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_oppose_tpl_3_simple",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 1,
    theme: "neutral",
    hint: "On garde la distance à 0 et on change le signe.",
    tags: ["relatif", "oppose", "template"],
    // 09/10/2026 : l'opposé d'un nombre, nu ou en situation (symétrique sur la droite, ascenseur) — 6 tournures.
    generate: () => {
      const [p, q] = deux(PRENOMS);
      const ascenseur = Math.random() < 0.2;
      const x = nonNul(ascenseur ? 5 : 20);
      const text = ascenseur
        ? `Dans l’ascenseur, ${p.nom} descend au niveau ${rel(x)}. ${q.nom} va au niveau opposé. À quel niveau va ${q.nom} ?`
        : choix([
            `${p.nom} demande à ${q.nom} : « Quel est l’opposé de ${rel(x)} ? » Que doit répondre ${q.nom} ?`,
            `${p.nom} écrit ${rel(x)}. Quel est l’opposé de ce nombre ?`,
            `Sur la droite graduée ${de(p.nom)}, le point A a pour abscisse ${rel(x)}. Le point B est son symétrique par rapport à 0. Quelle est l’abscisse de B ?`,
            `${p.nom} a noté ${rel(x)} au tableau. ${q.nom} doit écrire l’opposé juste en dessous. Que doit-${il(q)} écrire ?`,
            `${p.nom} change le signe de ${rel(x)}. Quel nombre obtient-${il(p)} ?`,
            `Donne l’opposé de ${rel(x)}, comme ${p.nom} l’a appris en classe.`,
          ]);
      return {
        text: ascenseur && x > 0 ? text.replace("descend", "monte") : text,
        format: "short",
        expected: attendus(-x),
        comparator: "number_equal",
        explanation: expl(`On garde la distance à 0 (${Math.abs(x)}) et on change le signe : l’opposé de ${rel(x)} est ${rel(-x)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_oppose_tpl_4_vrai_faux",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux nombres opposés : même distance à 0, signes contraires, somme nulle.",
    tags: ["relatif", "oppose", "vrai_faux", "template"],
    // 09/10/2026 : « Vrai ou faux ? » sur cinq affirmations chiffrées, la moitié fausses (2 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const a = nonNul(25);
      const vrai = Math.random() < 0.5;
      const autre = vrai ? -a : choix([a, -a + (a > 0 ? -1 : 1), a + (a > 0 ? 1 : -1)]);
      const aff = choix([
        { t: `${rel(a)} et ${rel(autre)} sont opposés.`, v: autre === -a },
        { t: `L’opposé de ${rel(a)} est ${rel(autre)}.`, v: autre === -a },
        { t: `La somme de ${rel(a)} et de son opposé vaut ${vrai ? "0" : rel(choix([2 * a, a]))}.`, v: vrai },
        { t: `${rel(a)} est plus grand que son opposé.`, v: a > 0 },
        { t: `${rel(a)} est plus petit que son opposé.`, v: a < 0 },
      ]);
      const text = choix([`Vrai ou faux ? « ${aff.t} »`, `${p.nom} affirme : « ${aff.t} » Vrai ou faux ?`]);
      return {
        text,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [aff.v ? "vrai" : "faux"],
        comparator: "mcq_exact",
        explanation: expl(
          `L’opposé de ${rel(a)} est ${rel(-a)} : même distance à 0, de l’autre côté. ${rel(a)} + ${par(-a, true)} = 0. ` +
            `L’affirmation est donc ${aff.v ? "vraie" : "fausse"}.`,
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_VALEUR_ABSOLUE
  // =========================
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "La valeur absolue est la distance à 0.",
    tags: ["relatif", "valeur_absolue", "template"],
    // 09/10/2026 : le plus loin (ou le plus près) de 0 parmi quatre relatifs, nu ou en situation (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const abs = shuffle(Array.from({ length: 20 }, (_, i) => i + 1)).slice(0, 4);
      const vals = abs.map((a, i) => (i < 2 ? -a : Math.random() < 0.5 ? -a : a));
      const loin = Math.random() < 0.5;
      const cible = vals.reduce((b, c) => ((loin ? Math.abs(c) > Math.abs(b) : Math.abs(c) < Math.abs(b)) ? c : b));
      const sit = choix([
        { u: " °C", t: `${p.nom} a relevé quatre températures. Laquelle est la ${loin ? "plus éloignée" : "plus proche"} de 0 °C ?` },
        { u: " m", t: `Quatre points de la carte ${de(p.nom)} ont ces altitudes. Lequel est le ${loin ? "plus loin" : "plus près"} du niveau de la mer (0 m) ?` },
        { u: "", t: `Lequel de ces nombres est le ${loin ? "plus loin" : "plus près"} de 0 ?` },
        { u: "", t: `${p.nom} place ces nombres sur une droite graduée. Lequel est le ${loin ? "plus éloigné" : "plus proche"} de 0 ?` },
        { u: " €", t: `Quatre comptes ont ces soldes. ${p.nom} cherche celui qui est le ${loin ? "plus loin" : "plus près"} de 0 €. Lequel ?` },
        { u: "", t: `Quel nombre a la ${loin ? "plus grande" : "plus petite"} distance à zéro ? ${p.nom} doit choisir.` },
      ]);
      const ecrire = (x: number) => `${rel(x)}${sit.u}`;
      return {
        text: sit.t,
        format: "qcm",
        choices: vals.map(ecrire),
        expected: [ecrire(cible)],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare les distances à 0, sans regarder le signe : ${vals.map((x) => `${rel(x)} → ${Math.abs(x)}`).join(" ; ")}. ` +
            `La ${loin ? "plus grande" : "plus petite"} est celle de ${rel(cible)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux nombres opposés ont la même valeur absolue.",
    tags: ["relatif", "valeur_absolue", "qcm", "template"],
    // 09/10/2026 : les DEUX nombres à une distance donnée de 0 (5 tournures) ; leurres : un seul des deux, ou 0.
    generate: () => {
      const p = pick(PRENOMS);
      const n = randInt(1, 30);
      const text = choix([
        `Quels nombres sont à la distance ${n} de 0 ?`,
        `Sur la droite graduée de 1 en 1, deux points sont à ${n} graduations de 0. Quelles sont leurs abscisses ?`,
        `${p.nom} cherche tous les nombres dont la distance à zéro vaut ${n}. Lesquels trouve-t-${il(p)} ?`,
        `Quels nombres ont pour valeur absolue ${n} ? ${p.nom} hésite.`,
        `${p.nom} part de 0 et fait ${n} pas, vers la droite ou vers la gauche. Sur quels nombres peut-${il(p)} arriver ?`,
      ]);
      const bon = `−${n} et +${n}`;
      return {
        text,
        format: "qcm",
        choices: shuffle([bon, `−${n} seulement`, `+${n} seulement`, `0 et +${n}`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: expl(`À ${n} de 0, il y a deux nombres, un de chaque côté : −${n} à gauche et +${n} à droite. Ils sont opposés.`),
      };
    },
  },
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_3_graduations",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les graduations entre 0 et le nombre, sans t’occuper du signe.",
    tags: ["relatif", "valeur_absolue", "short", "template"],
    // 09/10/2026 : la distance à zéro, nue ou en situation (6 tournures) ; l'unité quand la situation en a une.
    generate: () => {
      const p = pick(PRENOMS);
      const x = nonNul(20);
      const sit = choix([
        { u: "", t: `À combien de graduations de 0 se trouve ${rel(x)} sur une droite graduée de 1 en 1 ?` },
        { u: "", t: `${p.nom} part de 0 et va jusqu’à ${rel(x)} sur la droite graduée de 1 en 1. Combien de graduations parcourt-${il(p)} ?` },
        { u: "", t: `Quelle est la distance à zéro de ${rel(x)} ? ${p.nom} la cherche.` },
        { u: "°C", t: `Le thermomètre ${de(p.nom)} indique ${rel(x)} °C. De combien de degrés est-on éloigné de 0 °C ?` },
        { u: "", t: `${p.nom} écrit ${rel(x)}. Quelle est la distance entre ce nombre et 0 ?` },
        { u: "", t: `Combien d’unités séparent ${rel(x)} de 0 ? ${p.nom} compte sur la droite graduée.` },
      ]);
      return {
        text: sit.t,
        format: "short",
        expected: sit.u ? [`${Math.abs(x)} ${sit.u}`, String(Math.abs(x))] : [String(Math.abs(x))],
        comparator: "number_equal",
        explanation: expl(`De 0 à ${rel(x)}, on compte ${Math.abs(x)} unités. Une distance n’a pas de signe : c’est ${Math.abs(x)}.`),
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_DEFIS
  // =========================
{
  kind: "template",
  id: "relatif_defi_tpl_1",
  niveau: "5e",
  matiere: "maths",
  notionId: "relatif_nombre",
  microId: "relatif_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Cherche un nombre situé à une certaine distance de 0 et repère sa position.",
  tags: ["relatif", "defi", "raisonnement", "distance", "droite_graduee", "template"],
  // 09/10/2026 : trois sortes d'indices (distance + côté, distance + borne, même distance qu'un autre) × 3 présentations × prénoms.
  generate: () => {
    const p = pick(PRENOMS);
    const d = randInt(2, 30);
    const x = Math.random() < 0.6 ? -d : d;
    const sorte = randInt(0, 2);
    let indices: string[];
    if (sorte === 0) indices = [`Je suis à ${d} unités de 0.`, choix([`Je suis ${x < 0 ? "à gauche" : "à droite"} de 0.`, `Je suis ${x < 0 ? "négatif" : "positif"}.`])];
    else if (sorte === 1) {
      const borne = x < 0 ? randInt(-d + 1, d) : randInt(-d, d - 1);
      indices = [`Je suis à ${d} unités de 0.`, x < 0 ? `Je suis plus petit que ${rel(borne)}.` : `Je suis plus grand que ${rel(borne)}.`];
    } else indices = [`Je suis à la même distance de 0 que ${rel(-x)}.`, `Je suis ${x < 0 ? "négatif" : "positif"}.`];
    const texte = indices.join(" ");
    return {
      text: choix([
        `Devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} pose une devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} a écrit sur une carte : « Je suis un nombre entier. ${texte} Quel nombre suis-je ? »`,
      ]),
      format: "short",
      expected: attendus(x),
      comparator: "number_equal",
      explanation: expl(
        `À ${d} unités de 0, il y a deux nombres : ${rel(-d)} et ${rel(d)}. Le second indice ne garde que ${rel(x)}.`,
      ),
    };
  },
},
  {
    kind: "template",
    id: "relatif_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La distance entre deux points sur la droite se calcule en comptant les unités.",
    tags: ["relatif", "defi", "distance", "template"],
    // 09/10/2026 : la distance entre deux relatifs, nue ou en situation (6), souvent de part et d'autre de 0.
    generate: () => {
      const [p, q] = deux(PRENOMS);
      const [v1, v2] = deux(VILLES);
      const a = -randInt(1, 20);
      let b = a;
      while (b === a) b = Math.random() < 0.7 ? randInt(1, 20) : -randInt(1, 20);
      const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
      const ecart = Math.abs(a - b);
      const sit = choix([
        { u: "", t: `Sur une droite graduée, A a pour abscisse ${rel(x)} et B a pour abscisse ${rel(y)}. Quelle est la distance entre A et B ?` },
        { u: "m", t: `Un oiseau est à l’altitude ${rel(x)} m et un poisson, juste à la verticale, à l’altitude ${rel(y)} m. Quelle distance les sépare ?` },
        { u: "°C", t: `À ${v1}, il fait ${rel(x)} °C ; à ${v2}, il fait ${rel(y)} °C. Quel est l’écart de température entre les deux villes ?` },
        { u: "", t: `Au jeu, ${p.nom} a un score de ${rel(x)} et ${q.nom} un score de ${rel(y)}. Combien de points les séparent ?` },
        { u: "", t: `${p.nom} place ${rel(x)} et ${rel(y)} sur la droite graduée de 1 en 1. Combien d’unités les séparent ?` },
        { u: "m", t: `Sur la carte ${de(p.nom)}, deux points sont aux altitudes ${rel(x)} m et ${rel(y)} m. Quelle est la différence d’altitude ?` },
      ]);
      return {
        text: sit.t,
        format: "short",
        expected: sit.u ? [`${ecart} ${sit.u}`, String(ecart)] : [String(ecart)],
        comparator: "number_equal",
        explanation: expl(
          a < 0 && b > 0
            ? `De ${rel(a)} à 0 : ${-a} unités. De 0 à ${rel(b)} : ${b} unités. En tout : ${-a} + ${b} = ${ecart}.`
            : `Les deux nombres sont du même côté de 0 : on compte de ${rel(Math.min(a, b))} à ${rel(Math.max(a, b))}, soit ${ecart} unités.`,
        ),
      };
    },
  },
  {
  kind: "template",
  id: "relatif_defi_tpl_3",
  niveau: "5e",
  matiere: "maths",
  notionId: "relatif_nombre",
  microId: "relatif_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Compare le nombre et son opposé.",
  tags: ["relatif", "defi", "oppose", "comparaison", "piege", "template"],
  // 09/10/2026 : AVANT, la devinette avait plusieurs réponses (« entre −6 et 0 » : −5, −4, … −1).
  // Désormais : un encadrement à trois candidats, la parité n'en garde qu'un ; l'indice sur l'opposé donne le signe.
  generate: () => {
    const p = pick(PRENOMS);
    let x = nonNul(40);
    if (Math.abs(x) < 3) x = x < 0 ? -3 : 3;
    const indices = [
      x < 0 ? "Mon opposé est plus grand que moi." : "Mon opposé est plus petit que moi.",
      `Je suis compris entre ${rel(x - 2)} et ${rel(x + 2)}.`,
      `Je suis ${x % 2 === 0 ? "pair" : "impair"}.`,
    ];
    const texte = (Math.random() < 0.5 ? indices : [indices[1], indices[2], indices[0]]).join(" ");
    return {
      text: choix([
        `Devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} pose une devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} cache un nombre entier et donne trois indices : « ${texte} » Quel est ce nombre ?`,
      ]),
      format: "short",
      expected: attendus(x),
      comparator: "number_equal",
      explanation: expl(
        `Entre ${rel(x - 2)} et ${rel(x + 2)}, il y a ${rel(x - 1)}, ${rel(x)} et ${rel(x + 1)}. ` +
          `Seul ${rel(x)} est ${x % 2 === 0 ? "pair" : "impair"}. Il est bien ${x < 0 ? "négatif : son opposé est plus grand" : "positif : son opposé est plus petit"}.`,
      ),
    };
  },
},
{
  kind: "template",
  id: "relatif_defi_tpl_4",
  niveau: "5e",
  matiere: "maths",
  notionId: "relatif_nombre",
  microId: "relatif_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Quand la somme fait 0, les nombres sont opposés.",
  tags: ["relatif", "defi", "addition", "oppose", "raisonnement", "template"],
  // 09/10/2026 : « quand on m'ajoute a, on obtient b » (b souvent 0 : l'opposé) ou « si on m'enlève a » ; 3 présentations.
  generate: () => {
    const p = pick(PRENOMS);
    const x = nonNul(20);
    const enleve = Math.random() < 0.3;
    const a = enleve ? randInt(2, 15) : Math.random() < 0.5 ? -x : nonNul(15);
    const b = enleve ? x - a : x + a;
    const indice = enleve ? `Si on m’enlève ${a}, on obtient ${rel(b)}.` : `Quand on m’ajoute ${rel(a)}, on obtient ${rel(b)}.`;
    return {
      text: choix([
        `Devinette : « Je suis un nombre entier. ${indice} Qui suis-je ? »`,
        `${p.nom} pose une devinette : « Je suis un nombre. ${indice} Qui suis-je ? »`,
        `${p.nom} pense à un nombre et dit : « ${indice} » À quel nombre pense-t-${il(p)} ?`,
      ]),
      format: "short",
      expected: attendus(x),
      comparator: "number_equal",
      explanation: expl(
        enleve
          ? `On fait le chemin inverse : ${rel(b)} + ${a} = ${rel(x)}. Vérification : ${rel(x)} − ${a} = ${rel(b)}.`
          : b === 0
            ? `Ajouter ${rel(a)} donne 0 : le nombre est l’opposé de ${rel(a)}, soit ${rel(x)}.`
            : `On fait le chemin inverse : ${rel(b)} − ${par(a, true)} = ${rel(x)}. Vérification : ${rel(x)} + ${par(a, true)} = ${rel(b)}.`,
      ),
    };
  },
},
{
  kind: "template",
  id: "relatif_defi_tpl_5",
  niveau: "5e",
  matiere: "maths",
  notionId: "relatif_nombre",
  microId: "relatif_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Utilise la distance à 0 et compare avec les bornes.",
  tags: ["relatif", "defi", "distance", "encadrement", "raisonnement", "template"],
  // 09/10/2026 : distance à 0 + un encadrement (deux bornes tirées) qui écarte l'opposé ; 3 présentations.
  generate: () => {
    const p = pick(PRENOMS);
    const d = randInt(3, 40);
    const x = Math.random() < 0.6 ? -d : d;
    // Bornes : x entre elles, −x dehors.
    const lo = x - randInt(1, 6);
    const hi = x + randInt(1, 6);
    const ok = !(lo < -x && -x < hi);
    const [bas, haut] = ok ? [lo, hi] : x < 0 ? [lo, Math.min(hi, 0)] : [Math.max(lo, 0), hi];
    const texte = `Je suis à ${d} unités de 0. Je suis plus grand que ${rel(bas)} et plus petit que ${rel(haut)}.`;
    return {
      text: choix([
        `Devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} pose une devinette : « Je suis un nombre entier. ${texte} Qui suis-je ? »`,
        `${p.nom} a écrit sur une carte : « ${texte} Quel nombre suis-je ? »`,
      ]),
      format: "short",
      expected: attendus(x),
      comparator: "number_equal",
      explanation: expl(
        `À ${d} unités de 0, il y a ${rel(-d)} et ${rel(d)}. Seul ${rel(x)} est entre ${rel(bas)} et ${rel(haut)}.`,
      ),
    };
  },
},
  /* =========================
     QUESTIONS OUVERTES — NOMBRES RELATIFS
  ========================= */
  {
    kind: "fixed",
    id: "relatif_lire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Écris avec son signe : 7 au-dessous de zéro.",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "En dessous de zéro, on utilise le signe moins.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Un nombre situé au-dessous de zéro est négatif. Donc 7 au-dessous de zéro s’écrit -7.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "short", "lecture"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Le nombre 0 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["ni l’un ni l’autre", "positif", "négatif"],
    expected: ["ni l’un ni l’autre"],
    comparator: "mcq_exact",
    hint: "0 est la séparation entre les nombres positifs et négatifs.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("0 n’est ni positif ni négatif : il sert de frontière entre les nombres positifs et les nombres négatifs.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "qcm", "signe", "zero"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Quel est le plus grand : -4 ou -7 ?",
    format: "qcm",
    choices: ["-4", "-7"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Parmi deux négatifs, le plus proche de 0 est le plus grand.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("Sur une droite graduée, -4 est à droite de -7. Il est aussi plus proche de 0. Donc -4 > -7.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "qcm", "comparaison"],
  },
  {
    kind: "fixed",
    id: "relatif_placer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Sur une droite graduée, on part de 0 et on avance de 3 graduations vers la gauche. Sur quel nombre arrive-t-on ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Les nombres négatifs sont à gauche de 0.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("À gauche de 0, les nombres sont négatifs. 3 graduations à gauche de 0, c’est -3. Pour placer -3, on fait donc ce chemin.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "short", "placement"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Quel est l’opposé de -6 ?",
    format: "short",
    expected: ["+6", "6"],
    comparator: "number_equal",
    hint: "Ils sont à la même distance de 0 mais de deux côtés différents.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("-6 et +6 sont opposés car ils sont à la même distance de 0, mais de chaque côté de 0.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "short", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Sur une droite graduée, à combien de graduations de 0 se trouve -5 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les graduations entre 0 et -5.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("De 0 à -5, on compte 5 graduations. La distance à 0 vaut 5 : c’est la valeur absolue de -5. Une distance n’est jamais négative.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "short", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève dit : « -8 est plus grand que -3, car 8 est plus grand que 3 ». Quel est le plus grand ?",
    format: "qcm",
    choices: ["-3", "-8"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Avec les nombres négatifs, le plus grand est celui qui est le plus proche de 0.",
    explanation: "Définition : un nombre relatif peut être positif, négatif ou nul.\n\n" +
          "Méthode : on repère le signe, la distance à zéro et la position sur la droite graduée.\n\nCalcul : " +
          ("L’élève compare seulement 8 et 3, mais il oublie les signes. Sur une droite graduée, -3 est plus proche de 0 et se trouve à droite de -8. Donc -3 > -8.") +
          "\n\nConclusion : le nombre relatif choisi répond à la question.",
    tags: ["relatif", "qcm", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — RELATIF_LIRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "relatif_lire_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris avec son signe : 12 au-dessous de zéro.",
    format: "short",
    expected: ["-12"],
    comparator: "number_equal",
    hint: "Au-dessous de zéro → signe -.",
    explanation: expl("Un nombre au-dessous de zéro est négatif : on écrit -12."),
    tags: ["relatif", "lecture", "negatif"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Un plongeur descend à 15 m sous le niveau de la mer. Quelle altitude relative ?",
    format: "qcm",
    choices: ["-15 m", "+15 m", "15 m", "0 m"],
    expected: ["-15 m"],
    comparator: "mcq_exact",
    hint: "Sous le niveau de la mer → négatif.",
    explanation: expl("Sous le niveau de la mer, l’altitude est négative : -15 m."),
    tags: ["relatif", "lecture", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_lire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Au-dessus → +, au-dessous → -.",
    tags: ["relatif", "lecture", "template"],
    // 09/10/2026 : lecture inverse — le nombre est affiché, l'élève choisit ce qu'il veut dire (14 situations × 3 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const r = choix(REPERES);
      const n = nonNul(r.max);
      const ecart = r.max >= 100 ? 100 : 10;
      const loin = n < 0 ? n - ecart : n + ecart;
      const question = choix(["Que veut dire ce nombre ?", "Qu’est-ce que cela signifie ?", `Comment ${p.nom} doit-${il(p)} le comprendre ?`]);
      return {
        text: `${r.affiche(p, n)} ${question}`,
        format: "qcm",
        choices: shuffle([r.sens(n), r.sens(-n), r.sens(loin)]),
        expected: [r.sens(n)],
        comparator: "mcq_exact",
        explanation: expl(
          `${rel(n)} porte le signe ${n < 0 ? "−" : "+"} : ${n < 0 ? "c’est le côté des nombres négatifs" : "c’est le côté des nombres positifs"}. ` +
            `Il veut dire « ${r.sens(n)} ». Sa distance au repère est ${A(n)}.`,
        ),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_SIGNE (+4)
  // =========================
  {
    kind: "fixed",
    id: "relatif_signe_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre -14 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Regarde le signe.",
    explanation: expl("Le signe - indique que -14 est négatif."),
    tags: ["relatif", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Complète : un nombre situé à droite de 0 sur une droite graduée est ...",
    format: "qcm",
    choices: ["positif", "négatif", "nul"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "À droite de 0.",
    explanation: expl("À droite de 0, les nombres sont positifs."),
    tags: ["relatif", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces nombres, lequel est positif ?",
    format: "qcm",
    choices: ["+5", "-2", "-9", "-1"],
    expected: ["+5"],
    comparator: "mcq_exact",
    hint: "Le signe + (ou aucun signe).",
    explanation: expl("Seul +5 porte le signe + : c’est le nombre positif."),
    tags: ["relatif", "signe", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_signe_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe donne la réponse.",
    tags: ["relatif", "signe", "template"],
    // 09/10/2026 : trouver LE positif (ou LE négatif) parmi quatre nombres ; 0 sert de piège ; nu ou en situation (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const veutPositif = Math.random() < 0.5;
      const sg = veutPositif ? 1 : -1;
      const bon = sg * randInt(1, 20);
      const autres = new Set<number>([0]);
      while (autres.size < 3) autres.add(-sg * randInt(1, 20));
      const sit = choix([
        { u: " °C", t: `${p.nom} a relevé quatre températures. Laquelle est ${veutPositif ? "positive" : "négative"} ?` },
        { u: " m", t: `${p.nom} lit quatre altitudes sur une carte. Laquelle est ${veutPositif ? "positive" : "négative"} ?` },
        { u: " €", t: `Le relevé du compte ${de(p.nom)} montre quatre opérations. Laquelle est ${veutPositif ? "positive" : "négative"} ?` },
        { u: "", t: `Parmi ces nombres, lequel est ${veutPositif ? "positif" : "négatif"} ?` },
        { u: "", t: `${p.nom} cherche le seul nombre ${veutPositif ? "positif" : "négatif"} de la liste. Lequel est-ce ?` },
        { u: "", t: `Au jeu, ${p.nom} a noté quatre scores. Lequel est ${veutPositif ? "positif" : "négatif"} ?` },
      ]);
      const ecrire = (x: number) => `${rel(x, Math.random() < 0.5)}${sit.u}`;
      const bonTexte = ecrire(bon);
      return {
        text: sit.t,
        format: "qcm",
        choices: shuffle([bonTexte, ...[...autres].map(ecrire)]),
        expected: [bonTexte],
        comparator: "mcq_exact",
        explanation: expl(
          `${bonTexte} est ${veutPositif ? "à droite de 0 : il est positif" : "précédé du signe − : il est négatif"}. ` +
            "Attention : 0 n’est ni positif ni négatif.",
        ),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_OPPOSE (+4)
  // =========================
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de +9 ?",
    format: "short",
    expected: ["-9"],
    comparator: "number_equal",
    hint: "On change le signe.",
    explanation: expl("L’opposé de +9 est -9."),
    tags: ["relatif", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de -15 ?",
    format: "short",
    expected: ["+15", "15"],
    comparator: "number_equal",
    hint: "On change le signe.",
    explanation: expl("L’opposé de -15 est +15."),
    tags: ["relatif", "oppose"],
  },
  {
    kind: "fixed",
    id: "relatif_oppose_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "La somme d’un nombre et de son opposé vaut :",
    format: "qcm",
    choices: ["0", "1", "le double", "le nombre lui-même"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Essaie +5 et -5.",
    explanation: expl("Un nombre plus son opposé donne toujours 0 (ex. +5 + (-5) = 0)."),
    tags: ["relatif", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_oppose_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["relatif", "oppose", "template"],
    // 09/10/2026 : QCM — l'opposé parmi le nombre lui-même, 0 et un voisin (5 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const n = nonNul(40);
      const voisin = -n + (n > 0 ? -10 : 10);
      const text = choix([
        `Quel est l’opposé de ${rel(n)} ?`,
        `${p.nom} cherche l’opposé de ${rel(n)}. Que doit-${il(p)} choisir ?`,
        `Sur la droite graduée, quel nombre est le symétrique de ${rel(n)} par rapport à 0 ?`,
        `${p.nom} affirme que la somme de ${rel(n)} et d’un de ces nombres vaut 0. Lequel ?`,
        `Quel nombre a la même distance à 0 que ${rel(n)}, mais un signe contraire ? ${p.nom} doit le trouver.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([rel(-n), rel(n), "0", rel(voisin)]),
        expected: [rel(-n)],
        comparator: "mcq_exact",
        explanation: expl(`On change le signe : l’opposé de ${rel(n)} est ${rel(-n)}. Et ${rel(n)} + ${par(-n, true)} = 0.`),
      };
    },
  },

  // =========================
  // TOP-UP — RELATIF_COMPARER (+1)
  // =========================
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec > ou < : -2 ... -6",
    format: "short",
    expected: [">"],
    comparator: "exact_text",
    hint: "Le plus grand des négatifs est le plus proche de 0.",
    explanation: expl("-2 est plus proche de 0 que -6, donc -2 > -6."),
    tags: ["relatif", "comparer"],
  },

  // =========================
  // TOP-UP — RELATIF_PLACER (+3)
  // =========================
  {
    kind: "fixed",
    id: "relatif_placer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’abscisse du point C ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Lis le nombre sous le point C.",
    explanation: expl("Le point C est placé au-dessus de 3 : son abscisse est 3."),
    tags: ["relatif", "placement", "abscisse", "canvas"],
    canvas: numberLine([
      { value: -4, label: "A" },
      { value: -1, label: "B" },
      { value: 3, label: "C" },
    ]),
  },
  {
    kind: "fixed",
    id: "relatif_placer_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point correspond au nombre -2 ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Cherche le point au-dessus de -2.",
    explanation: expl("Le point B est placé au-dessus de -2."),
    tags: ["relatif", "placement", "qcm", "canvas"],
    canvas: numberLine([
      { value: -5, label: "A" },
      { value: -2, label: "B" },
      { value: 1, label: "C" },
      { value: 4, label: "D" },
    ]),
  },
  {
    kind: "fixed",
    id: "relatif_placer_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Quel point est placé au nombre -4 ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "On part de 0 et on compte 4 graduations vers la gauche.",
    explanation: expl("On part de 0 et on compte 4 graduations vers la gauche : on arrive au point C. Le point A est à +4, de l’autre côté de 0."),
    tags: ["relatif", "placement", "qcm", "canvas"],
    canvas: numberLine([
      { value: 4, label: "A" },
      { value: -3, label: "B" },
      { value: -4, label: "C" },
      { value: -5, label: "D" },
    ]),
  },

  // =========================
  // TOP-UP — RELATIF_VALEUR_ABSOLUE (+3)
  // =========================
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la valeur absolue de -12 ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "C’est la distance à 0.",
    explanation: expl("La valeur absolue de -12 est sa distance à 0, soit 12."),
    tags: ["relatif", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Deux nombres opposés ont-ils la même valeur absolue ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ils sont à la même distance de 0.",
    explanation: expl("Oui : deux nombres opposés (ex. -5 et +5) sont à la même distance de 0, donc même valeur absolue."),
    tags: ["relatif", "valeur_absolue", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "relatif_nombre",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    hint: "Valeur absolue = distance à 0 (toujours positive).",
    tags: ["relatif", "valeur_absolue", "template"],
    // 09/10/2026 : distance à zéro en situation (plongeur, compte, sous-sol, congélateur) ou nue (7 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const sit = choix([
        { u: "m", n: -randInt(2, 40), t: (n: number) => `${p.nom} plonge : son profondimètre indique ${rel(n)} m. À quelle distance de la surface est-${il(p)} ?` },
        { u: "€", n: -randInt(5, 90), t: (n: number) => `Le compte ${de(p.nom)} est à ${rel(n)} €. Combien d’euros faut-il ajouter pour revenir à 0 € ?` },
        { u: "°C", n: -randInt(2, 25), t: (n: number) => `Le congélateur ${de(p.nom)} est à ${rel(n)} °C. De combien de degrés est-il sous 0 °C ?` },
        { u: "", n: -randInt(1, 5), t: (n: number) => `${p.nom} est au niveau ${rel(n)} du parking. Combien de niveaux ${p.f ? "la" : "le"} séparent de la rue (niveau 0) ?` },
        { u: "", n: nonNul(30), t: (n: number) => `Quelle est la valeur absolue de ${rel(n)} ?` },
        { u: "", n: nonNul(30), t: (n: number) => `${p.nom} cherche la distance à zéro de ${rel(n)}. Que trouve-t-${il(p)} ?` },
        { u: "", n: nonNul(30), t: (n: number) => `Quelle est la distance entre ${rel(n)} et 0 sur une droite graduée ? ${p.nom} répond.` },
      ]);
      const a = Math.abs(sit.n);
      return {
        text: sit.t(sit.n),
        format: "short",
        expected: sit.u ? [`${a} ${sit.u}`, String(a)] : [String(a)],
        comparator: "number_equal",
        explanation: expl(`La distance à 0 de ${rel(sit.n)} vaut ${a} : on garde le nombre sans son signe.`),
      };
    },
  },
];

// ⛔ 09/10/2026 : le vrai signe moins « − » partout (énoncés, choix, réponses, aides, explications).
export const nombresRelatifsBank: TutorBankItemV4[] = vraiMoins(nombresRelatifsBrut);