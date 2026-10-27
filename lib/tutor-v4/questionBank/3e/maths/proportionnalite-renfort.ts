// Renfort de la proportionnalité 3e (28/10/2026).
//
// Mesure du 27/10 (scripts/mesurer-squelettes-coach.ts) : 7 à 10 squelettes
// par micro, 13 à 18 répétitions sur 20. On branche ici les générateurs de la
// 4e, déjà robustes (18 situations de la vie, plusieurs tournures chacune),
// et un générateur vitesse / débit propre à la 3e, porté par des métiers.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  attendu,
  genAffirmation,
  genCoeff,
  genCoeffMillieme,
  genCoeffMult,
  genComparer,
  genDepart,
  genMental,
  genNouvelleValeur,
  genPourcentage,
  genProbleme,
  genQuatrieme,
  genReconnaitre,
  genRetour,
  genSuccessives,
  genTableau,
  genTauxEvolution,
  genTauxGlobal,
} from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fr(n: number) {
  return (Math.round(n * 1000) / 1000).toLocaleString("fr-FR").replace(/ /g, " ");
}

const NOMS_UNITES: Record<string, string> = { L: "litres", mL: "millilitres" };

function minus(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ---------- Vitesse : des métiers, filles et garçons ---------- */

type Mobile = {
  qui: string;
  pron: "il" | "elle";
  verbe: string;
  /** vitesses moyennes en km/h */
  v: number[];
  /** durées en h */
  t: number[];
};

const MOBILES: Mobile[] = [
  { qui: "Une conductrice de TGV", pron: "elle", verbe: "roule", v: [240, 280, 300, 320], t: [2, 3] },
  { qui: "Un pilote de ligne", pron: "il", verbe: "vole", v: [800, 840, 880, 900], t: [2, 3, 4, 5] },
  { qui: "Une cycliste professionnelle", pron: "elle", verbe: "roule", v: [36, 40, 44, 48], t: [2, 3, 4] },
  { qui: "Un chauffeur de car scolaire", pron: "il", verbe: "roule", v: [48, 60, 72], t: [2, 3] },
  { qui: "Une traileuse de la Diagonale des Fous", pron: "elle", verbe: "avance", v: [4, 5, 6, 8], t: [3, 4, 5, 6] },
  { qui: "Un livreur à scooter", pron: "il", verbe: "roule", v: [28, 32, 36, 40], t: [2, 3] },
  { qui: "Une skipper", pron: "elle", verbe: "navigue", v: [16, 20, 24], t: [3, 4, 5, 6] },
  { qui: "Un ambulancier", pron: "il", verbe: "roule", v: [80, 88, 96, 100], t: [2, 3] },
  { qui: "Une pilote d’hélicoptère du SAMU", pron: "elle", verbe: "vole", v: [200, 220, 240], t: [2, 3] },
  { qui: "Un garde forestier à cheval", pron: "il", verbe: "avance", v: [8, 12, 16], t: [2, 3, 4] },
];

const SUJETS_MS = [
  "Un guépard lancé court",
  "Une joueuse de tennis frappe une balle qui part",
  "Un drone de livraison vole",
  "Une pilote de rallye roule",
  "Un kitesurfeur glisse",
  "Une ingénieure teste un vélo électrique qui roule",
];

/** Vitesse moyenne : distance, vitesse, temps, durée en minutes, km/h → m/s. */
function genVitesse(niveau: 2 | 3 | 4) {
  const m = randomChoice(MOBILES);
  const v = randomChoice(m.v);
  const t = randomChoice(m.t);
  const d = v * t;
  const type =
    niveau === 2 ? randomChoice(["d", "v"]) : niveau === 3 ? randomChoice(["d", "v", "t"]) : randomChoice(["min", "t", "ms"]);
  if (type === "d") {
    return {
      text: randomChoice([
        `${m.qui} ${m.verbe} à ${v} km/h de moyenne pendant ${t} h. Quelle distance parcourt-${m.pron}, en km ?`,
        `Pendant ${t} h, ${minus(m.qui)} ${m.verbe} à la vitesse moyenne de ${v} km/h. Calcule la distance parcourue, en km.`,
        `${m.qui} garde une vitesse moyenne de ${v} km/h. Combien de kilomètres parcourt-${m.pron} en ${t} h ?`,
        `Vitesse moyenne : ${v} km/h ; durée : ${t} h. ${m.qui} ${m.verbe} : quelle distance, en km ?`,
      ]),
      format: "short" as const,
      expected: attendu(d, "km"),
      comparator: "number_equal" as const,
      explanation: expl(
        "à vitesse moyenne constante, la distance est proportionnelle au temps.",
        "distance = vitesse × temps.",
        `${v} × ${t} = ${fr(d)}.`,
        `${m.pron} parcourt ${fr(d)} km.`,
      ),
    };
  }
  if (type === "v") {
    return {
      text: randomChoice([
        `${m.qui} parcourt ${fr(d)} km en ${t} h. Quelle est sa vitesse moyenne, en km/h ?`,
        `En ${t} h, ${minus(m.qui)} a parcouru ${fr(d)} km. Calcule sa vitesse moyenne, en km/h.`,
        `${m.qui} ${m.verbe} ${t} h et parcourt ${fr(d)} km au total. À quelle vitesse moyenne, en km/h ?`,
        `Distance : ${fr(d)} km ; durée : ${t} h. Quelle est la vitesse moyenne de ${minus(m.qui)}, en km/h ?`,
      ]),
      format: "short" as const,
      expected: [String(v), `${v} km/h`],
      comparator: "number_equal" as const,
      explanation: expl(
        "la vitesse moyenne est la distance parcourue en une heure.",
        "vitesse = distance ÷ temps.",
        `${fr(d)} ÷ ${t} = ${v}.`,
        `la vitesse moyenne est de ${v} km/h.`,
      ),
    };
  }
  if (type === "t") {
    return {
      text: `${m.qui} doit parcourir ${fr(d)} km à ${v} km/h de moyenne. Combien d’heures dure le trajet ?`,
      format: "short" as const,
      expected: attendu(t, "h"),
      comparator: "number_equal" as const,
      explanation: expl(
        "à vitesse constante, le temps est proportionnel à la distance.",
        "temps = distance ÷ vitesse.",
        `${fr(d)} ÷ ${v} = ${t}.`,
        `le trajet dure ${t} h.`,
      ),
    };
  }
  if (type === "min") {
    // une durée qui n'est pas un nombre entier d'heures : 1 h 15, 2 h 30…
    const vq = randomChoice(m.v.filter((x) => x % 4 === 0));
    const h = randomInt(1, 2);
    const q = randomChoice([1, 2, 3]);
    const minutes = h * 60 + q * 15;
    const dist = (vq * minutes) / 60;
    return {
      text: `${m.qui} parcourt ${fr(dist)} km à ${vq} km/h de moyenne. Combien de minutes dure le trajet ?`,
      format: "short" as const,
      expected: attendu(minutes, "min"),
      comparator: "number_equal" as const,
      explanation: expl(
        "à vitesse constante, le temps est proportionnel à la distance.",
        "temps = distance ÷ vitesse, en heures, puis × 60 pour avoir des minutes.",
        `${fr(dist)} ÷ ${vq} = ${fr(minutes / 60)} h, et ${fr(minutes / 60)} × 60 = ${minutes}.`,
        `le trajet dure ${minutes} minutes, soit ${h} h ${q * 15} min.`,
      ),
    };
  }
  const kmh = randomChoice([18, 36, 54, 72, 90, 108, 126, 144]);
  const ms = kmh / 3.6;
  return {
    text: `${randomChoice(SUJETS_MS)} à ${kmh} km/h. Quelle est cette vitesse en m/s ?`,
    format: "short" as const,
    expected: [String(ms), `${ms} m/s`],
    comparator: "number_equal" as const,
    explanation: expl(
      "1 km = 1 000 m et 1 h = 3 600 s.",
      `${kmh} km/h, c’est ${fr(kmh * 1000)} m en 3 600 s : on divise par 3 600, ou directement ${kmh} par 3,6.`,
      `${kmh} ÷ 3,6 = ${ms}.`,
      `la vitesse est de ${ms} m/s.`,
    ),
  };
}

/* ---------- Débit : des métiers aussi ---------- */

type Debit = { qui: string; quoi: string; u: string; ut: "min" | "h"; k: number[]; t: number[] };

const DEBITS: Debit[] = [
  { qui: "Une pompière règle sa lance à incendie", quoi: "d’eau", u: "L", ut: "min", k: [250, 400, 500], t: [3, 4, 6] },
  { qui: "Un infirmier pose une perfusion", quoi: "de sérum", u: "mL", ut: "h", k: [50, 75, 100, 125], t: [2, 4, 6] },
  { qui: "Une agricultrice arrose ses ananas", quoi: "d’eau", u: "L", ut: "min", k: [12, 15, 20, 25], t: [10, 15, 20] },
  { qui: "Un plombier remplit une baignoire", quoi: "d’eau", u: "L", ut: "min", k: [12, 15, 18], t: [8, 10, 12] },
  { qui: "Une technicienne remplit une citerne", quoi: "d’eau", u: "L", ut: "min", k: [150, 200, 300], t: [5, 8, 10] },
  { qui: "Un pompiste remplit un réservoir", quoi: "de carburant", u: "L", ut: "min", k: [35, 40, 50], t: [2, 3] },
  { qui: "Une maître-nageuse remplit le petit bassin", quoi: "d’eau", u: "L", ut: "min", k: [300, 400, 600], t: [20, 30, 45] },
];

/** Débit : volume écoulé, débit, durée. */
function genDebit(niveau: 2 | 3 | 4) {
  const s = randomChoice(DEBITS);
  const k = randomChoice(s.k);
  const t = randomChoice(s.t);
  const vol = k * t;
  const unT = s.ut === "min" ? "une minute" : "une heure";
  const type = niveau === 2 ? "vol" : niveau === 3 ? randomChoice(["vol", "debit"]) : randomChoice(["debit", "temps"]);
  if (type === "vol") {
    return {
      text: randomChoice([
        `${s.qui} : le débit est de ${k} ${s.u}/${s.ut}. Quel volume ${s.quoi}, en ${s.u}, s’écoule en ${t} ${s.ut} ?`,
        `${s.qui}, avec un débit de ${k} ${s.u}/${s.ut}. Calcule le volume ${s.quoi} écoulé en ${t} ${s.ut}, en ${s.u}.`,
        `${s.qui}. Il s’écoule ${k} ${s.u} ${s.quoi} par ${s.ut === "min" ? "minute" : "heure"}. Combien de ${NOMS_UNITES[s.u]} en ${t} ${s.ut} ?`,
      ]),
      format: "short" as const,
      expected: attendu(vol, s.u),
      comparator: "number_equal" as const,
      explanation: expl(`le débit est le volume qui s’écoule en ${unT}.`, "volume = débit × durée.", `${k} × ${t} = ${fr(vol)}.`, `il s’écoule ${fr(vol)} ${s.u}.`),
    };
  }
  if (type === "debit") {
    return {
      text: randomChoice([
        `${s.qui} : ${fr(vol)} ${s.u} ${s.quoi} s’écoulent en ${t} ${s.ut}. Quel est le débit, en ${s.u}/${s.ut} ?`,
        `${s.qui}. En ${t} ${s.ut}, il passe ${fr(vol)} ${s.u} ${s.quoi}. Calcule le débit, en ${s.u}/${s.ut}.`,
        `${s.qui} : ${fr(vol)} ${s.u} en ${t} ${s.ut}. Combien de ${NOMS_UNITES[s.u]} s’écoulent en ${s.ut === "min" ? "une minute" : "une heure"} ?`,
      ]),
      format: "short" as const,
      expected: [String(k), `${k} ${s.u}/${s.ut}`],
      comparator: "number_equal" as const,
      explanation: expl(`le débit est le volume qui s’écoule en ${unT}.`, "débit = volume ÷ durée.", `${fr(vol)} ÷ ${t} = ${k}.`, `le débit est de ${k} ${s.u}/${s.ut}.`),
    };
  }
  return {
    text: `${s.qui} : le débit est de ${k} ${s.u}/${s.ut}. Combien de ${s.ut === "min" ? "minutes" : "heures"} faut-il pour ${fr(vol)} ${s.u} ?`,
    format: "short" as const,
    expected: attendu(t, s.ut),
    comparator: "number_equal" as const,
    explanation: expl("le volume écoulé est proportionnel à la durée.", "durée = volume ÷ débit.", `${fr(vol)} ÷ ${k} = ${t}.`, `il faut ${t} ${s.ut}.`),
  };
}

/* ---------- Les gabarits ---------- */

function tpl(microId: string, difficulty: number, rang: number, generate: () => any, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `3e_prop_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["prop_proportionnalite", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_RAPPORT = "Calcule le quotient pour chaque couple : est-il toujours le même ?";
const H_COEFF = "Cherche le nombre par lequel on multiplie toujours.";
const H_PCT = "p % d’une quantité, c’est p ÷ 100 × la quantité.";
const H_EVOL = "Hausse de t % : × (1 + t/100) ; baisse de t % : × (1 − t/100).";
const H_VIT = "Distance = vitesse × temps.";
const H_DEB = "Volume = débit × durée.";

export const proportionnaliteRenfort3e: TutorBankItemV4[] = [
  tpl("prop_reconnaitre", 1, 1, () => genReconnaitre(1), H_RAPPORT),
  tpl("prop_reconnaitre", 1, 2, () => genReconnaitre(1), H_RAPPORT),
  tpl("prop_reconnaitre", 2, 1, () => genReconnaitre(2), H_RAPPORT),
  tpl("prop_reconnaitre", 2, 2, () => genAffirmation(2), H_RAPPORT),
  tpl("prop_reconnaitre", 3, 1, () => genReconnaitre(3), H_RAPPORT),
  tpl("prop_reconnaitre", 3, 2, () => genAffirmation(3), H_RAPPORT),

  tpl("prop_table", 2, 1, () => genTableau(2), H_COEFF),
  tpl("prop_table", 2, 2, () => genCoeff(2), H_COEFF),
  tpl("prop_table", 3, 1, () => genTableau(3), H_COEFF),
  tpl("prop_table", 3, 2, () => genCoeff(3), H_COEFF),

  tpl("prop_quatrieme", 2, 1, () => genQuatrieme(2), H_COEFF),
  tpl("prop_quatrieme", 2, 2, () => genQuatrieme(1), H_COEFF),
  tpl("prop_quatrieme", 3, 1, () => genQuatrieme(3), H_COEFF),
  tpl("prop_quatrieme", 3, 2, () => genProbleme(3), H_COEFF),
  tpl("prop_quatrieme", 4, 1, () => genProbleme(4), H_COEFF),
  tpl("prop_quatrieme", 4, 2, () => genComparer(3), H_COEFF),

  tpl("prop_pourcentage", 2, 1, () => genPourcentage(["partie", "taux"], [5, 10, 20, 25, 30, 40, 50, 75]), H_PCT),
  tpl("prop_pourcentage", 2, 2, () => genMental([10, 20, 30, 5], ["nu", "partie", "comparaison"]), H_PCT),
  tpl("prop_pourcentage", 3, 1, () => genPourcentage(["partie"], [5, 12, 15, 30, 35, 40, 45, 60]), H_PCT),
  tpl("prop_pourcentage", 3, 2, () => genPourcentage(["taux"], [5, 12, 15, 30, 35, 40, 45, 60]), H_PCT),
  tpl("prop_pourcentage", 4, 1, () => genPourcentage(["total"], [5, 10, 20, 25, 40, 50, 75]), H_PCT),
  tpl("prop_pourcentage", 4, 2, () => genPourcentage(["fraction", "partie"], [5, 12, 15, 35, 45]), H_PCT),

  tpl("prop_evolution", 3, 1, () => genNouvelleValeur([5, 10, 15, 20, 25, 30, 40, 50]), H_EVOL),
  tpl("prop_evolution", 3, 2, () => genCoeffMult("short", "mixte", [5, 12, 15, 25, 35, 45]), H_EVOL),
  tpl("prop_evolution", 3, 3, () => genTauxEvolution([5, 10, 15, 20, 25, 30, 40, 50]), H_EVOL),
  tpl("prop_evolution", 4, 1, () => genSuccessives(false), H_EVOL),
  tpl("prop_evolution", 4, 2, () => genTauxGlobal(), H_EVOL),
  tpl("prop_evolution", 4, 3, () => genDepart(), H_EVOL),

  tpl("prop_vitesse_debit", 2, 1, () => genVitesse(2), H_VIT),
  tpl("prop_vitesse_debit", 2, 2, () => genDebit(2), H_DEB),
  tpl("prop_vitesse_debit", 3, 1, () => genVitesse(3), H_VIT),
  tpl("prop_vitesse_debit", 3, 2, () => genDebit(3), H_DEB),
  tpl("prop_vitesse_debit", 4, 1, () => genVitesse(4), H_VIT),
  tpl("prop_vitesse_debit", 4, 2, () => genDebit(4), H_DEB),

  tpl("prop_defi", 4, 1, () => genProbleme(4), H_COEFF),
  tpl("prop_defi", 4, 2, () => genCoeffMillieme(), H_EVOL),
  tpl("prop_defi", 4, 3, () => genVitesse(4), H_VIT),
  tpl("prop_defi", 5, 1, () => genTauxGlobal(), H_EVOL),
  tpl("prop_defi", 5, 2, () => genRetour(), H_EVOL),
  tpl("prop_defi", 5, 3, () => genDepart(), H_EVOL),
];
