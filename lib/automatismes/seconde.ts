// lib/automatismes/seconde.ts
//
// Automatismes de Seconde — 24/09/2026, recalés le 26/09/2026.
//
// ⭐ LA RÉFÉRENCE : la partie « Automatismes » du PROGRAMME DE SECONDE (annexe
// « Programme d'enseignement de mathématiques de la classe de seconde générale
// et technologique »), apportée par Frédéric le 26/09. Frédéric : « on colle
// strictement la liste ».
//
// ⛔ Ce qui a changé le 26/09 :
// - SORTIS : intervalles et valeur absolue, multiples et diviseurs, fonctions
//   de référence, vecteurs, Python. Au programme de seconde, mais pas dans sa
//   liste d'automatismes (ils étaient « hors épreuve », cochables seulement).
// - ENTRÉ : le bloc « Géométrie » de la liste, que l'annexe de l'épreuve
//   anticipée de première (notre première source) n'a pas : droite graduée,
//   repère, périmètres, aires, volumes (pyramide, cône et boule compris),
//   Pythagore, Thalès, cosinus, sinus, tangente.
//
// Les générateurs de calcul, fonctions, statistiques et probabilités viennent
// de premiere.ts, appelés avec les CAS de la liste de seconde ; ceux de
// géométrie, de 3e.ts. ⭐ Règle des QCM en seconde (Frédéric, 26/09) : « QCM
// que si c'est difficile à taper » — un nombre se tape ; une égalité
// (Pythagore) ou un quotient de longueurs (trigonométrie) se choisit.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  aires,
  coordonnees,
  cosinusLongueur,
  droiteRelatifs,
  perimetres,
  pythagore,
  thalesLongueur,
  triangleRectangle,
  volumes,
} from "./3e";
import {
  calculLitteral,
  comparer,
  conversions,
  developperFactoriser,
  droites,
  ecritureScientifique,
  ecrituresNombre,
  equations,
  evolutions,
  fonctions,
  formules,
  fractionsCalcul,
  inequations,
  ordreGrandeur,
  probabilites,
  proportions,
  puissances,
  statistiques,
} from "./premiere";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}

function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** « 12π », « 12 π », « 12pi » : les écritures d'un multiple de π. */
function enPi(k: number): string[] {
  return [`${k}π`, `${k} π`, `${k}pi`, `${k} pi`, `${k}×π`];
}

const NOMS = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["P", "Q", "R"]] as const;

/* ═══════════════ TRIGONOMÉTRIE : COSINUS, SINUS, TANGENTE ═══════════════ */

function trigonometrie(): AutoQuestion {
  const [A, B, C] = pick(NOMS);
  const cas = entre(1, 3);
  if (cas === 1) {
    // Un quotient de longueurs se tape mal : QCM (Frédéric, 26/09 : « QCM que
    // si c'est difficile à taper »). Et pas d'exemple dans l'énoncé : il
    // soufflait la forme de la réponse.
    const f = pick([
      { nom: "sin", haut: `${A}${C}`, bas: `${B}${C}`, mot: "côté opposé ÷ hypoténuse" },
      { nom: "cos", haut: `${A}${B}`, bas: `${B}${C}`, mot: "côté adjacent ÷ hypoténuse" },
      { nom: "tan", haut: `${A}${C}`, bas: `${A}${B}`, mot: "côté opposé ÷ côté adjacent" },
    ]);
    const q = (h: string, b: string) => `$\\dfrac{${h}}{${b}}$`;
    const bonne = q(f.haut, f.bas);
    const toutes = [q(`${A}${C}`, `${B}${C}`), q(`${A}${B}`, `${B}${C}`), q(`${A}${C}`, `${A}${B}`), q(f.bas, f.haut)];
    return {
      text: `Le triangle ${A}${B}${C} est rectangle en ${A}. À quel quotient est égal $\\${f.nom}(\\widehat{${A}${B}${C}})$ ?`,
      format: "qcm",
      choices: shuffle(Array.from(new Set(toutes))),
      expected: [bonne],
      explanation: `Vu de l'angle en ${B} : l'hypoténuse est [${B}${C}], le côté opposé [${A}${C}], le côté adjacent [${A}${B}].\n$\\${f.nom}(\\widehat{${A}${B}${C}})$ = ${f.mot} = $\\dfrac{${f.haut}}{${f.bas}}$.`,
      canvas: triangleRectangle([A, B, C]),
    };
  }
  if (cas === 2) {
    // sin 30° = 0,5 ; tan 45° = 1 : la valeur est donnée, le calcul se fait de tête
    const f = pick([
      { nom: "sin", angle: 30, v: 0.5, connu: "hyp", cherche: "opp" },
      { nom: "tan", angle: 45, v: 1, connu: "adj", cherche: "opp" },
      { nom: "sin", angle: 30, v: 0.5, connu: "opp", cherche: "hyp" },
    ]);
    const L = f.connu === "opp" ? entre(2, 9) : 2 * entre(2, 9);
    const rep = f.cherche === "hyp" ? L / f.v : L * f.v;
    const nomsCotes = { hyp: `${B}${C}`, opp: `${A}${C}`, adj: `${A}${B}` };
    const cotes: Record<string, string> = {};
    cotes[f.connu === "hyp" ? "BC" : f.connu === "opp" ? "CA" : "AB"] = `${L} cm`;
    cotes[f.cherche === "hyp" ? "BC" : "CA"] = "?";
    return {
      text: `Le triangle ${A}${B}${C} est rectangle en ${A}, $\\widehat{${A}${B}${C}} = ${f.angle}°$ et ${nomsCotes[f.connu as "hyp" | "opp" | "adj"]} = ${L} cm. On sait que $\\${f.nom}(${f.angle}°) = ${fr(f.v)}$. Calculer ${nomsCotes[f.cherche as "hyp" | "opp"]}, en cm.`,
      format: "short",
      expected: accepte(rep),
      explanation:
        f.nom === "sin"
          ? `$\\sin(\\widehat{${A}${B}${C}}) = \\dfrac{${A}${C}}{${B}${C}}$ (opposé ÷ hypoténuse), donc $\\dfrac{${A}${C}}{${B}${C}} = 0,5$.\n${f.cherche === "hyp" ? `${B}${C} = ${L} \\div 0,5 = ${fr(rep)}` : `${A}${C} = 0,5 \\times ${L} = ${fr(rep)}`} cm.`
          : `$\\tan(\\widehat{${A}${B}${C}}) = \\dfrac{${A}${C}}{${A}${B}}$ (opposé ÷ adjacent) = 1 : les deux côtés de l'angle droit sont égaux.\n${A}${C} = ${fr(rep)} cm.`,
      canvas: triangleRectangle([A, B, C], cotes, `${f.angle}°`),
    };
  }
  // tan = opposé / adjacent, avec des longueurs données
  const [opp, adj] = pick([[3, 4], [4, 5], [6, 8], [1, 2], [3, 5], [2, 5], [9, 10], [7, 10]] as const);
  return {
    text: `Le triangle ${A}${B}${C} est rectangle en ${A}, avec ${A}${B} = ${adj} cm et ${A}${C} = ${opp} cm. Calculer $\\tan(\\widehat{${A}${B}${C}})$ (écriture décimale).`,
    format: "short",
    expected: accepte(opp / adj),
    explanation: `$\\tan(\\widehat{${A}${B}${C}}) = \\dfrac{\\text{opposé}}{\\text{adjacent}} = \\dfrac{${A}${C}}{${A}${B}}$.\n$\\dfrac{${opp}}{${adj}} = ${fr(opp / adj)}$.`,
    canvas: triangleRectangle([A, B, C], { AB: `${adj} cm`, CA: `${opp} cm` }),
  };
}

/* ═══════════════ VOLUMES : PYRAMIDE, CÔNE, BOULE ═══════════════ */

function volumesSeconde(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const h = 3 * entre(1, 5), B = entre(4, 20);
    return {
      text: `Une pyramide a une base d'aire ${B} cm² et une hauteur de ${h} cm. Quel est son volume, en cm³ ?`,
      format: "short",
      expected: accepte((B * h) / 3),
      explanation: `Volume d'une pyramide = aire de la base × hauteur ÷ 3.\n$${B} \\times ${h} \\div 3 = ${(B * h) / 3}$ cm³.`,
    };
  }
  if (cas === 2) {
    const r = entre(1, 6), h = 3 * entre(1, 4);
    const k = (r * r * h) / 3;
    return {
      text: `Un cône a un rayon de base de ${r} cm et une hauteur de ${h} cm. Donner la valeur exacte de son volume, en cm³, en fonction de $\\pi$.`,
      format: "short",
      expected: enPi(k),
      explanation: `Volume d'un cône = $\\dfrac{1}{3} \\times \\pi r^2 \\times h$.\n$\\dfrac{1}{3} \\times \\pi \\times ${r * r} \\times ${h} = ${k}\\pi$ cm³.`,
    };
  }
  const r = pick([3, 6, 9] as const).valueOf();
  const k = (4 * r ** 3) / 3;
  return {
    text: `Une boule a un rayon de ${r} cm. Donner la valeur exacte de son volume, en cm³, en fonction de $\\pi$.`,
    format: "short",
    expected: enPi(k),
    explanation: `Volume d'une boule = $\\dfrac{4}{3} \\pi r^3$.\n$${r}^3 = ${r ** 3}$, puis $\\dfrac{4}{3} \\times ${r ** 3} = ${k}$ : ${k}$\\pi$ cm³.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesSeconde: AutoNiveau = {
  classe: "seconde",
  label: "Seconde",
  duree: 20,
  examen: "Pas d'épreuve en seconde : la liste d'automatismes du programme de seconde, que l'épreuve anticipée de première reprendra. Réponses courtes, sans calculatrice",
  nbQuestions: 10,
  // Les générateurs de première ne sont appelés qu'avec les CAS de la liste de
  // seconde : pas de produit nul, pas de signe d'expression, pas de taux
  // successifs ni réciproques, pas de probabilités conditionnelles.
  themes: [
    // Calcul numérique et algébrique
    { id: "comparer", label: "Comparer deux nombres", generateurs: [comparer] },
    { id: "fractions", label: "Fractions", generateurs: [fractionsCalcul] },
    { id: "puissances", label: "Puissances", generateurs: [puissances, ecritureScientifique] },
    { id: "ecritures", label: "Écritures d'un nombre", generateurs: [ecrituresNombre] },
    { id: "grandeur", label: "Ordre de grandeur", generateurs: [ordreGrandeur] },
    { id: "unites", label: "Conversions d'unités", generateurs: [conversions] },
    { id: "litteral", label: "Calcul littéral élémentaire", generateurs: [calculLitteral] },
    { id: "devfac", label: "Développer, factoriser", generateurs: [developperFactoriser] },
    // x² = a, ax + b = cx + d, a/x = b — le produit nul (cas 2) est de première.
    { id: "equations", label: "Équations", generateurs: [() => equations([1, 3, 4])] },
    { id: "inequations", label: "Inéquations du premier degré", generateurs: [() => inequations([1])] },
    { id: "formules", label: "Formules : isoler, appliquer", generateurs: [formules] },
    // Proportions et pourcentages ; évolutions : seulement « +5 % = × 1,05 »
    { id: "proportions", label: "Proportions et pourcentages", generateurs: [() => proportions([3, 4])] },
    { id: "evolutions", label: "Coefficient multiplicateur", generateurs: [() => evolutions([1])] },
    // Fonctions et représentations
    { id: "fonctions", label: "Fonctions : images et antécédents", generateurs: [() => fonctions([1, 3, 4]), droites] },
    // Géométrie (ajoutée le 26/09)
    { id: "reperage", label: "Droite graduée et repère", generateurs: [droiteRelatifs, coordonnees] },
    { id: "mesures", label: "Périmètres, aires, volumes", generateurs: [perimetres, aires, volumes, volumesSeconde] },
    { id: "pythagore", label: "Pythagore et Thalès", generateurs: [pythagore, thalesLongueur] },
    { id: "trigo", label: "Trigonométrie", generateurs: [trigonometrie, cosinusLongueur] },
    // Statistiques et probabilités
    { id: "stats", label: "Statistiques", generateurs: [statistiques] },
    { id: "probas", label: "Probabilités", generateurs: [() => probabilites([3, 4])] },
  ],
};
