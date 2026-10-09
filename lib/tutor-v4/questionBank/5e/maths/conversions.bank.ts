// CONVERSIONS ET DURÉES (5ᵉ) — notion `grandeur_conversion`.
//
// POURQUOI CETTE BANQUE EXISTE (15/08/2026). L'évaluation nationale de 4ᵉ teste
// les conversions et les durées dans son domaine « grandeurs et mesures » :
// 135 minutes en heures et minutes, 75 L en centilitres, et un problème de
// lait et de beurre qui mêle kilogrammes et grammes. Or `BO5M1 « Grandeurs et
// mesures »` ne portait qu'une notion, les aires — le thème « grandeurs » de
// l'épreuve blanche de 4ᵉ ne pouvait donc proposer que des aires et des
// volumes. Cinq questions sur vingt ne ressemblaient pas à celles du jour J.
//
// ⭐ TROIS ITEMS SONT OFFICIELS, repris des ressources d'accompagnement Éduscol
// de juillet 2023 avec l'analyse de leurs distracteurs faite avec la DEPP. Ils
// sont signalés un par un. Les autres sont écrits ici, et leurs diagnostics
// disent une méprise qu'on peut défendre — jamais une méprise inventée pour
// remplir la case.
//
// ⚠️ CE QUE LA FICHE ÉDUSCOL DÉSIGNE COMME L'ERREUR CENTRALE : « calculs
// effectués ou comparaisons de grandeurs, mesurées dans des unités
// différentes, sans conversion ». C'est ce que teste la micro-compétence
// `conversion_avant_calcul`, et c'est elle qui porte le plus de distracteurs.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

const OFFICIEL = ["evaluation_nationale_4e", "eval4e_automatismes"];
const OFFICIEL_PB = ["evaluation_nationale_4e", "eval4e_resolution"];

/* =========================================================
   SITUATIONS × TOURNURES × PRÉNOMS — 09/10/2026
   ---------------------------------------------------------
   ⛔ POURQUOI. Mesuré le 09/10 : 5 à 9 squelettes par micro, 11 à 18
   répétitions sur 20 questions (« Convertis : # m = … cm » revenait à
   l'identique). Chaque gabarit compose maintenant une SITUATION × une
   TOURNURE × un PRÉNOM. Correcteurs : correcteurs/conversions.ts (ils
   relisent les mesures du texte et refont la conversion).
   ⚠️ Les nouveaux énoncés sont en texte simple (pas de LaTeX) : le coach
   sonore les lit à voix haute. Une mesure s'écrit « 3,5 km » : nombre,
   espace, symbole d'unité.
   ========================================================= */

function rint(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
const r3 = (x: number) => Math.round(x * 1000) / 1000;
/** Nombre à la française : « 3,5 », « 2400 ». */
const nb = (x: number) => String(r3(x)).replace(".", ",");
const deuxDecimales = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const il = (p: Prenom) => (p.f ? "elle" : "il");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const prenom = () => randomChoice(PRENOMS);

/** Les unités d'une même grandeur, avec leur puissance de 10 par rapport à l'unité de base. */
type Unite = { s: string; nom: string; e: number };
const LONGUEURS: Unite[] = [
  { s: "km", nom: "kilomètres", e: 3 },
  { s: "m", nom: "mètres", e: 0 },
  { s: "dm", nom: "décimètres", e: -1 },
  { s: "cm", nom: "centimètres", e: -2 },
  { s: "mm", nom: "millimètres", e: -3 },
];
const MASSES: Unite[] = [
  { s: "kg", nom: "kilogrammes", e: 3 },
  { s: "g", nom: "grammes", e: 0 },
  { s: "mg", nom: "milligrammes", e: -3 },
];
const CONTENANCES: Unite[] = [
  { s: "L", nom: "litres", e: 0 },
  { s: "dL", nom: "décilitres", e: -1 },
  { s: "cL", nom: "centilitres", e: -2 },
  { s: "mL", nom: "millilitres", e: -3 },
];
/** Une mesure réelle : la phrase, l'unité de départ, des valeurs plausibles, les unités d'arrivée permises. */
type Mesure = { phrase: (p: Prenom, v: string) => string; u: string; v: number[]; vers: string[]; famille: Unite[] };
const MESURES_CONV: Mesure[] = [
  { phrase: (_p, v) => `La piste cyclable du parc mesure ${v} km`, u: "km", v: [2, 2.5, 3, 3.5, 4.2, 5], vers: ["m"], famille: LONGUEURS },
  { phrase: (p, v) => `Le ruban ${de(p.nom)} mesure ${v} m`, u: "m", v: [1.2, 1.5, 2, 2.4, 3], vers: ["cm", "dm", "mm"], famille: LONGUEURS },
  { phrase: (p, v) => `Le crayon ${de(p.nom)} mesure ${v} cm`, u: "cm", v: [12, 14, 15, 17, 18.5], vers: ["mm", "m", "dm"], famille: LONGUEURS },
  { phrase: (_p, v) => `Une fourmi mesure ${v} mm`, u: "mm", v: [5, 6, 8, 12], vers: ["cm"], famille: LONGUEURS },
  { phrase: (p, v) => `Le sentier de randonnée ${de(p.nom)} fait ${v} km`, u: "km", v: [6, 7.5, 8, 12.5], vers: ["m"], famille: LONGUEURS },
  { phrase: (_p, v) => `La table de la cuisine mesure ${v} m de long`, u: "m", v: [1.6, 1.8, 2, 2.2], vers: ["cm", "mm"], famille: LONGUEURS },
  { phrase: (p, v) => `La planche de skate ${de(p.nom)} mesure ${v} cm`, u: "cm", v: [78, 80, 82], vers: ["m", "mm", "dm"], famille: LONGUEURS },
  { phrase: (_p, v) => `Le sac de pommes de terre pèse ${v} kg`, u: "kg", v: [2, 2.5, 5, 10], vers: ["g"], famille: MASSES },
  { phrase: (p, v) => `Le cartable ${de(p.nom)} pèse ${v} kg`, u: "kg", v: [3, 3.5, 4.2, 5], vers: ["g"], famille: MASSES },
  { phrase: (_p, v) => `Le paquet de farine pèse ${v} g`, u: "g", v: [250, 500, 1000, 1500], vers: ["kg"], famille: MASSES },
  { phrase: (p, v) => `Le chaton ${de(p.nom)} pèse ${v} g`, u: "g", v: [450, 600, 800, 1200], vers: ["kg"], famille: MASSES },
  { phrase: (_p, v) => `La pastèque du marché pèse ${v} kg`, u: "kg", v: [3.5, 4, 5.2, 6], vers: ["g"], famille: MASSES },
  { phrase: (_p, v) => `Un comprimé de vitamine C contient ${v} g de vitamine`, u: "g", v: [0.5, 0.25, 1], vers: ["mg"], famille: MASSES },
  { phrase: (p, v) => `La gourde ${de(p.nom)} contient ${v} cL`, u: "cL", v: [50, 75, 60], vers: ["L", "mL", "dL"], famille: CONTENANCES },
  { phrase: (_p, v) => `La bouteille de jus de goyave contient ${v} L`, u: "L", v: [1, 1.5, 2], vers: ["cL", "mL", "dL"], famille: CONTENANCES },
  { phrase: (_p, v) => `Le verre de la cantine contient ${v} cL`, u: "cL", v: [20, 25], vers: ["mL", "L", "dL"], famille: CONTENANCES },
  { phrase: (_p, v) => `Une cuillère à soupe contient ${v} mL`, u: "mL", v: [15], vers: ["cL"], famille: CONTENANCES },
  { phrase: (p, v) => `L’arrosoir ${de(p.nom)} contient ${v} L`, u: "L", v: [5, 8, 10, 12], vers: ["cL", "dL"], famille: CONTENANCES },
  { phrase: (_p, v) => `La casserole contient ${v} mL de lait`, u: "mL", v: [250, 500, 750, 1500], vers: ["L", "cL"], famille: CONTENANCES },
];
const unite = (f: Unite[], s: string) => f.find((u) => u.s === s)!;
/** v exprimé en `de`, écrit en `vers`. */
const convertir = (f: Unite[], v: number, de_: string, vers: string) => r3(v * 10 ** (unite(f, de_).e - unite(f, vers).e));

/** Conversion d'une mesure. niveau 2 : unité d'arrivée plus petite (on multiplie) ; 3 : dans les deux sens. */
function genConvDecimal(niveau: 2 | 3) {
  for (;;) {
    const m = randomChoice(MESURES_CONV);
    const v = randomChoice(m.v);
    const vers = randomChoice(m.vers);
    const ua = unite(m.famille, m.u);
    const ub = unite(m.famille, vers);
    if (niveau === 2 && ub.e > ua.e) continue;
    const rep = convertir(m.famille, v, m.u, vers);
    if (!deuxDecimales(rep)) continue;
    const p = prenom();
    const phrase = m.phrase(p, nb(v));
    const t = rint(1, 5);
    let text: string;
    if (t === 1) text = `${phrase}. Combien cela fait-il de ${ub.nom} ?`;
    else if (t === 2) text = `${phrase}. Convertis cette mesure en ${ub.nom}.`;
    else if (t === 3) text = `Complète : ${nb(v)} ${m.u} = … ${vers}.`;
    else if (t === 4) text = `${p.nom} lit : « ${phrase} ». ${cap(il(p))} veut l’écrire en ${ub.nom}. Que trouve-t-${il(p)} ?`;
    else text = `${phrase}. Écris cette mesure en ${vers}.`;
    const facteur = 10 ** Math.abs(ua.e - ub.e);
    const plusPetite = ub.e < ua.e;
    const explication = exp(
      `1 ${plusPetite ? m.u : vers} = ${facteur} ${plusPetite ? vers : m.u}.`,
      plusPetite ? "on va vers une unité plus petite : le nombre devient plus grand, on multiplie." : "on va vers une unité plus grande : le nombre devient plus petit, on divise.",
      `${nb(v)} ${plusPetite ? "×" : "÷"} ${facteur} = ${nb(rep)}.`,
      `${nb(v)} ${m.u} = ${nb(rep)} ${vers}.`,
    );
    if (niveau === 3 && Math.random() < 0.35) {
      const pieges = [rep * 10, rep / 10, r3(plusPetite ? v / facteur : v * facteur), rep * 100];
      const choix = [...new Set([rep, ...pieges].map(r3))].filter((x) => x > 0 && deuxDecimales(x)).slice(0, 4);
      return {
        text,
        format: "qcm" as const,
        choices: shuffle(choix.map((x) => `${nb(x)} ${vers}`)),
        expected: [`${nb(rep)} ${vers}`],
        comparator: "mcq_exact" as const,
        explanation: explication,
      };
    }
    return { text, format: "short" as const, expected: [`${nb(rep)} ${vers}`], comparator: "number_equal" as const, explanation: explication };
  }
}

/* ─── Durées ─────────────────────────────────────────────────────────────── */
const ACTIVITES: Array<(p: Prenom) => string> = [
  (p) => `Le film que regarde ${p.nom} dure`,
  (p) => `L’entraînement de natation ${de(p.nom)} dure`,
  (p) => `Le trajet en bus ${de(p.nom)} dure`,
  (p) => `La cuisson du gâteau ${de(p.nom)} dure`,
  (p) => `La randonnée ${de(p.nom)} dure`,
  (p) => `Le concert où va ${p.nom} dure`,
  (p) => `Le voyage en train ${de(p.nom)} dure`,
  (p) => `La partie de jeu de société ${de(p.nom)} dure`,
  (p) => `La sieste du chat ${de(p.nom)} dure`,
  (p) => `Le match de basket ${de(p.nom)} dure`,
  (p) => `La séance de cinéma ${de(p.nom)} dure`,
  (p) => `L’atelier de poterie ${de(p.nom)} dure`,
];
const hm = (h: number, m: number) => (m ? `${h} h ${m} min` : `${h} h`);

/**
 * Durées. niveau 1 : h (et min) → min ; 2 : min → h min (QCM) et h min → min ;
 * 3 : additions avec retenue, h décimales (1,5 h), min s → s.
 */
function genConvDuree(niveau: 1 | 2 | 3) {
  const p = prenom();
  const act = randomChoice(ACTIVITES)(p);
  if (niveau === 1) {
    const h = rint(1, 3);
    const m = randomChoice([0, 10, 15, 20, 30, 40, 45]);
    const tot = h * 60 + m;
    const text = randomChoice([
      `${act} ${hm(h, m)}. Combien de minutes cela fait-il ?`,
      `${act} ${hm(h, m)}. Écris cette durée en minutes.`,
      `Complète : ${hm(h, m)} = … min.`,
      `${act} ${hm(h, m)}. ${p.nom} veut l’écrire en minutes. Que trouve-t-${il(p)} ?`,
      `${p.nom} regarde l’horloge : ${hm(h, m)} se sont écoulées. Combien de minutes est-ce ?`,
    ]);
    return {
      text,
      format: "short" as const,
      expected: [`${tot} min`],
      comparator: "number_equal" as const,
      explanation: exp("une heure vaut 60 minutes.", "on change les heures en minutes, puis on ajoute les minutes.", `${h} × 60 = ${h * 60}${m ? `, puis ${h * 60} + ${m} = ${tot}` : ""}.`, `${hm(h, m)} = ${tot} min.`),
    };
  }
  if (niveau === 2) {
    const h = rint(1, 4);
    const m = randomChoice([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]);
    const tot = h * 60 + m;
    if (Math.random() < 0.5) {
      const bon = hm(h, m);
      const pieges = [hm(Math.floor(tot / 100), tot % 100), hm(h - 1 > 0 ? h - 1 : h + 1, m), hm(h, m + 10 < 60 ? m + 10 : m - 10), hm(h + 1, m)];
      // « 1 h 35 min » pour 135 min : le piège de la fiche Éduscol (lire 135 comme 1 et 35).
      const choix = [...new Set([bon, ...pieges.filter((x) => !x.startsWith("0 h"))])].slice(0, 4);
      return {
        text: randomChoice([
          `${act} ${tot} min. Comment écrire cette durée en heures et minutes ?`,
          `${act} ${tot} minutes. Cela fait combien d’heures et de minutes ?`,
          `${p.nom} chronomètre : ${tot} min. Quelle écriture en heures et minutes est juste ?`,
        ]),
        format: "qcm" as const,
        choices: shuffle(choix),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp("une heure vaut 60 minutes, pas 100.", "on cherche combien de fois 60 tient dans le nombre de minutes, et ce qu’il reste.", `${h} × 60 = ${h * 60} et ${tot} − ${h * 60} = ${m}.`, `${tot} min = ${bon}.`),
      };
    }
    return {
      text: randomChoice([
        `${act} ${hm(h, m)}. Combien de minutes cela fait-il ?`,
        `${act} ${hm(h, m)}. ${p.nom} veut l’écrire en minutes. Que trouve-t-${il(p)} ?`,
        `Complète : ${hm(h, m)} = … min.`,
      ]),
      format: "short" as const,
      expected: [`${tot} min`],
      comparator: "number_equal" as const,
      explanation: exp("une heure vaut 60 minutes.", "on change les heures en minutes, puis on ajoute les minutes.", `${h} × 60 = ${h * 60}, puis ${h * 60} + ${m} = ${tot}.`, `${hm(h, m)} = ${tot} min.`),
    };
  }
  const t = rint(1, 3);
  if (t === 1) {
    // addition avec retenue, réponse en minutes
    const h1 = rint(0, 2);
    const m1 = randomChoice([35, 40, 45, 50, 55]);
    const m2 = randomChoice([20, 25, 30, 35, 40]);
    const tot = h1 * 60 + m1 + m2;
    return {
      text: `${act} ${hm(h1, m1).replace(/^0 h /, "")}. Ensuite, ${p.nom} attend encore ${m2} min. Combien de minutes cela fait-il en tout ?`,
      format: "short" as const,
      expected: [`${tot} min`],
      comparator: "number_equal" as const,
      explanation: exp("une heure vaut 60 minutes.", "on écrit tout en minutes, puis on additionne.", `${h1 ? `${h1} × 60 + ${m1} = ${h1 * 60 + m1}, puis ` : ""}${h1 * 60 + m1} + ${m2} = ${tot}.`, `cela fait ${tot} min en tout.`),
    };
  }
  if (t === 2) {
    // heures décimales
    const h = rint(1, 3);
    const d = randomChoice([0.25, 0.5, 0.75]);
    const tot = Math.round((h + d) * 60);
    return {
      text: randomChoice([`${act} ${nb(h + d)} h. Combien de minutes cela fait-il ?`, `${p.nom} lit sur une notice : « durée ${nb(h + d)} h ». Écris cette durée en minutes.`]),
      format: "short" as const,
      expected: [`${tot} min`],
      comparator: "number_equal" as const,
      explanation: exp(
        `${nb(d)} h n’est pas ${nb(d * 100)} min : c’est une fraction d’heure.`,
        "on multiplie le nombre d’heures par 60.",
        `${nb(h + d)} × 60 = ${tot}.`,
        `${nb(h + d)} h = ${tot} min (soit ${hm(h, Math.round(d * 60))}).`,
      ),
    };
  }
  // minutes et secondes → secondes
  const mi = rint(1, 6);
  const s = randomChoice([5, 10, 15, 20, 30, 40, 45, 50]);
  const tot = mi * 60 + s;
  return {
    text: randomChoice([
      `${p.nom} fait le tour du lac à vélo en ${mi} min ${s} s. Combien de secondes cela fait-il ?`,
      `La chanson préférée ${de(p.nom)} dure ${mi} min ${s} s. Écris cette durée en secondes.`,
      `Complète : ${mi} min ${s} s = … s.`,
    ]),
    format: "short" as const,
    expected: [`${tot} s`],
    comparator: "number_equal" as const,
    explanation: exp("une minute vaut 60 secondes.", "on change les minutes en secondes, puis on ajoute.", `${mi} × 60 = ${mi * 60}, puis ${mi * 60} + ${s} = ${tot}.`, `${mi} min ${s} s = ${tot} s.`),
  };
}

/* ─── Convertir AVANT de calculer ───────────────────────────────────────── */
type Melange = {
  famille: Unite[];
  /** grande unité, petite unité (réponse dans la petite) */
  U: [string, string];
  grand: number[];
  petit: number[];
  somme: (p: Prenom, a: string, b: string) => string;
  qSomme: (p: Prenom) => string;
  reste: (p: Prenom, a: string, b: string) => string;
  qReste: string;
};
const MELANGES: Melange[] = [
  {
    famille: MASSES, U: ["kg", "g"], grand: [1, 1.5, 2, 2.5, 3], petit: [150, 250, 300, 400, 750],
    somme: (p, a, b) => `${p.nom} pose sur la balance un sac de ${a} et un paquet de ${b}`,
    qSomme: () => "Quelle masse cela fait-il en tout, en grammes ?",
    reste: (p, a, b) => `${p.nom} a un sac de ${a} de farine. ${cap(il(p))} en utilise ${b} pour des crêpes`,
    qReste: "Quelle masse de farine reste-t-il, en grammes ?",
  },
  {
    famille: LONGUEURS, U: ["m", "cm"], grand: [1, 1.2, 1.5, 2, 2.4], petit: [35, 45, 60, 75, 80],
    somme: (p, a, b) => `${p.nom} met bout à bout une planche de ${a} et une planche de ${b}`,
    qSomme: () => "Quelle longueur cela fait-il en tout, en centimètres ?",
    reste: (p, a, b) => `${p.nom} a un ruban de ${a}. ${cap(il(p))} en coupe ${b} pour un cadeau`,
    qReste: "Quelle longueur de ruban reste-t-il, en centimètres ?",
  },
  {
    famille: CONTENANCES, U: ["L", "cL"], grand: [1, 1.5, 2], petit: [20, 25, 33, 40, 75],
    somme: (p, a, b) => `Pour un cocktail, ${p.nom} verse ${a} de jus et ${b} de sirop dans un saladier`,
    qSomme: () => "Quel volume cela fait-il en tout, en centilitres ?",
    reste: (p, a, b) => `La bouteille d’eau ${de(p.nom)} contient ${a}. ${cap(il(p))} en boit ${b}`,
    qReste: "Quel volume d’eau reste-t-il, en centilitres ?",
  },
  {
    famille: LONGUEURS, U: ["km", "m"], grand: [1, 1.5, 2, 3.5], petit: [250, 400, 600, 800],
    somme: (p, a, b) => `${p.nom} court ${a} le matin et ${b} le soir`,
    qSomme: () => "Quelle distance cela fait-il en tout, en mètres ?",
    reste: (p, a, b) => `La randonnée ${de(p.nom)} fait ${a}. ${cap(il(p))} a déjà parcouru ${b}`,
    qReste: "Quelle distance reste-t-il, en mètres ?",
  },
];
const FRUITS = [
  { nom: "cerises", prix: [6, 8, 10, 12] },
  { nom: "fraises", prix: [8, 10, 12] },
  { nom: "tomates", prix: [2, 3, 4] },
  { nom: "pommes", prix: [2, 3, 4] },
  { nom: "letchis", prix: [4, 5, 6, 8] },
  { nom: "noix", prix: [10, 12, 16] },
  { nom: "abricots", prix: [4, 5, 6] },
];

/** niveau 3 : somme, reste, comparaison ; niveau 4 : prix au kilogramme, recette, somme de trois. */
function genAvantCalcul(niveau: 3 | 4) {
  const p = prenom();
  const t = niveau === 3 ? rint(1, 3) : rint(4, 6);
  if (t === 1 || t === 2) {
    const m = randomChoice(MELANGES);
    const a = randomChoice(m.grand);
    let b = randomChoice(m.petit);
    const aPetit = convertir(m.famille, a, m.U[0], m.U[1]);
    if (t === 2 && b >= aPetit) b = randomChoice(m.petit.filter((x) => x < aPetit));
    const rep = t === 1 ? aPetit + b : aPetit - b;
    const A = `${nb(a)} ${m.U[0]}`;
    const B = `${b} ${m.U[1]}`;
    return {
      text: t === 1 ? `${m.somme(p, A, B)}. ${m.qSomme(p)}` : `${m.reste(p, A, B)}. ${m.qReste}`,
      format: "short" as const,
      expected: [`${nb(rep)} ${m.U[1]}`],
      comparator: "number_equal" as const,
      explanation: exp(
        "on ne calcule qu’avec des mesures écrites dans la même unité.",
        `on convertit d’abord ${A} en ${m.U[1]}.`,
        `${A} = ${nb(aPetit)} ${m.U[1]}, puis ${nb(aPetit)} ${t === 1 ? "+" : "−"} ${b} = ${nb(rep)}.`,
        `${t === 1 ? "cela fait" : "il reste"} ${nb(rep)} ${m.U[1]}.`,
      ),
    };
  }
  if (t === 3) {
    // comparer trois mesures écrites dans trois unités
    const f = randomChoice([LONGUEURS, MASSES, CONTENANCES]);
    const base = f === MASSES ? "g" : f === LONGUEURS ? "cm" : "cL";
    for (;;) {
      const us = shuffle(f === MASSES ? ["kg", "g", "kg"] : f === LONGUEURS ? ["m", "cm", "mm"] : ["L", "cL", "mL"]);
      const vals = us.map((u) =>
        u === "kg" ? randomChoice([0.5, 1.2, 0.75, 2]) : u === "g" ? randomChoice([450, 800, 1500, 900]) : u === "m" ? randomChoice([0.6, 1.2, 0.85])
          : u === "cm" ? randomChoice([45, 70, 95]) : u === "mm" ? randomChoice([500, 900, 1100]) : u === "L" ? randomChoice([0.5, 1.5, 0.75])
          : u === "cL" ? randomChoice([33, 60, 80]) : randomChoice([400, 700, 900]),
      );
      const enBase = vals.map((v, i) => convertir(f, v, us[i], base));
      if (new Set(enBase).size !== 3) continue;
      const libelles = vals.map((v, i) => `${nb(v)} ${us[i]}`);
      if (new Set(libelles).size !== 3) continue;
      const grande = Math.random() < 0.5;
      const k = enBase.indexOf(grande ? Math.max(...enBase) : Math.min(...enBase));
      const quoi = f === MASSES ? "masses" : f === LONGUEURS ? "longueurs" : "contenances";
      return {
        text: randomChoice([
          `Laquelle de ces trois ${quoi} est la plus ${grande ? "grande" : "petite"} : ${libelles.join(", ")} ?`,
          `${p.nom} compare trois ${quoi} : ${libelles.join(" ; ")}. Quelle est la plus ${grande ? "grande" : "petite"} ?`,
        ]),
        format: "qcm" as const,
        choices: shuffle(libelles),
        expected: [libelles[k]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "on ne compare des mesures que dans une même unité.",
          `on convertit tout en ${base}.`,
          libelles.map((l, i) => `${l} = ${nb(enBase[i])} ${base}`).join(" ; ") + ".",
          `la plus ${grande ? "grande" : "petite"} est ${libelles[k]}.`,
        ),
      };
    }
  }
  if (t === 4) {
    // prix au kilogramme, quantité en grammes
    const fr = randomChoice(FRUITS);
    const prix = randomChoice(fr.prix);
    const g = randomChoice([250, 500, 750, 1500, 200, 400]);
    const rep = Math.round(prix * g) / 1000;
    const prixTxt = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(2).replace(".", ","));
    return {
      text: randomChoice([
        `Les ${fr.nom} coûtent ${prix} € le kilogramme. ${p.nom} en achète ${g} g. Combien paie-t-${il(p)} ?`,
        `Au marché, ${p.nom} prend ${g} g de ${fr.nom}, vendues ${prix} € le kilogramme. Quel est le prix à payer ?`,
      ]).replace("vendues", fr.nom === "letchis" || fr.nom === "abricots" ? "vendus" : "vendues"),
      format: "short" as const,
      expected: [`${prixTxt(rep)} €`],
      comparator: "number_equal" as const,
      explanation: exp(
        "le prix est donné pour un kilogramme, la quantité en grammes : on convertit d’abord.",
        `${g} g = ${nb(g / 1000)} kg.`,
        `${nb(g / 1000)} × ${prix} = ${prixTxt(rep)}.`,
        `${p.nom} paie ${prixTxt(rep)} €.`,
      ),
    };
  }
  if (t === 5) {
    // recette (comme l'item officiel lait / beurre)
    const L = randomChoice([20, 22, 24]);
    const gB = randomChoice([100, 200, 250, 500]);
    const rep = r3((L * gB) / 1000);
    return {
      text: randomChoice([
        `Avec ${L} L de lait, on obtient 1 kg de beurre. Combien de litres de lait faut-il pour obtenir ${gB} g de beurre ?`,
        `À la ferme, ${p.nom} apprend qu’avec ${L} L de lait on obtient 1 kg de beurre. Quel volume de lait, en litres, faut-il pour ${gB} g de beurre ?`,
      ]),
      format: "short" as const,
      expected: [`${nb(rep)} L`],
      comparator: "number_equal" as const,
      explanation: exp(
        "les deux masses de beurre sont dans deux unités différentes.",
        `on convertit : 1 kg = 1000 g, et ${gB} g, c’est ${1000 / gB} fois moins.`,
        `${L} ÷ ${1000 / gB} = ${nb(rep)}.`,
        `il faut ${nb(rep)} L de lait.`,
      ),
    };
  }
  // somme de trois mesures en trois unités, réponse dans la plus petite
  const f = randomChoice([LONGUEURS, CONTENANCES]);
  const [u1, u2, u3] = f === LONGUEURS ? ["m", "cm", "mm"] : ["L", "cL", "mL"];
  const v1 = randomChoice([1, 1.2, 1.5, 2]);
  const v2 = randomChoice([15, 25, 40, 55]);
  const v3 = randomChoice([5, 8, 120, 250]);
  const rep = convertir(f, v1, u1, u3) + convertir(f, v2, u2, u3) + v3;
  const nomU3 = unite(f, u3).nom;
  return {
    text:
      f === LONGUEURS
        ? `${p.nom} mesure trois morceaux de fil : ${nb(v1)} ${u1}, ${v2} ${u2} et ${v3} ${u3}. Quelle longueur cela fait-il en tout, en ${nomU3} ?`
        : `${p.nom} verse dans une carafe ${nb(v1)} ${u1} d’eau, ${v2} ${u2} de sirop et ${v3} ${u3} de jus de citron. Quel volume cela fait-il en tout, en ${nomU3} ?`,
    format: "short" as const,
    expected: [`${nb(rep)} ${u3}`],
    comparator: "number_equal" as const,
    explanation: exp(
      "on additionne seulement des mesures écrites dans la même unité.",
      `on écrit les trois mesures en ${u3}.`,
      `${nb(v1)} ${u1} = ${nb(convertir(f, v1, u1, u3))} ${u3} ; ${v2} ${u2} = ${nb(convertir(f, v2, u2, u3))} ${u3} ; total : ${nb(rep)} ${u3}.`,
      `cela fait ${nb(rep)} ${u3} en tout.`,
    ),
  };
}

/* ─── Cohérence : la bonne unité, la mesure plausible ───────────────────── */
type ObjetReel = { quoi: string; verbe: "mesure" | "pèse" | "contient"; v: number; u: string; famille: Unite[] };
const OBJETS_REELS: ObjetReel[] = [
  { quoi: "une porte de maison", verbe: "mesure", v: 2, u: "m", famille: LONGUEURS },
  { quoi: "un crayon neuf", verbe: "mesure", v: 17, u: "cm", famille: LONGUEURS },
  { quoi: "un terrain de football", verbe: "mesure", v: 100, u: "m", famille: LONGUEURS },
  { quoi: "une fourmi", verbe: "mesure", v: 5, u: "mm", famille: LONGUEURS },
  { quoi: "le trajet de la maison au collège", verbe: "mesure", v: 3, u: "km", famille: LONGUEURS },
  { quoi: "une feuille de cahier", verbe: "mesure", v: 30, u: "cm", famille: LONGUEURS },
  { quoi: "un bus scolaire", verbe: "mesure", v: 12, u: "m", famille: LONGUEURS },
  { quoi: "un grain de riz", verbe: "mesure", v: 6, u: "mm", famille: LONGUEURS },
  { quoi: "un marathon", verbe: "mesure", v: 42, u: "km", famille: LONGUEURS },
  { quoi: "un sac de riz", verbe: "pèse", v: 5, u: "kg", famille: MASSES },
  { quoi: "une pomme", verbe: "pèse", v: 150, u: "g", famille: MASSES },
  { quoi: "un comprimé de vitamine", verbe: "pèse", v: 500, u: "mg", famille: MASSES },
  { quoi: "un chat adulte", verbe: "pèse", v: 4, u: "kg", famille: MASSES },
  { quoi: "un trombone", verbe: "pèse", v: 1, u: "g", famille: MASSES },
  { quoi: "une tablette de chocolat", verbe: "pèse", v: 100, u: "g", famille: MASSES },
  { quoi: "une grande bouteille d’eau", verbe: "contient", v: 1.5, u: "L", famille: CONTENANCES },
  { quoi: "une cuillère à café", verbe: "contient", v: 5, u: "mL", famille: CONTENANCES },
  { quoi: "un verre", verbe: "contient", v: 20, u: "cL", famille: CONTENANCES },
  { quoi: "une baignoire", verbe: "contient", v: 150, u: "L", famille: CONTENANCES },
  { quoi: "une canette de soda", verbe: "contient", v: 33, u: "cL", famille: CONTENANCES },
  { quoi: "un seau", verbe: "contient", v: 10, u: "L", famille: CONTENANCES },
];
/** Trois autres unités de la même grandeur, assez éloignées pour être absurdes. */
function unitesAbsurdes(o: ObjetReel): string[] {
  const e = unite(o.famille, o.u).e;
  return o.famille.filter((x) => Math.abs(x.e - e) >= 1 && x.s !== "dm" && x.s !== "dL").map((x) => x.s);
}

/**
 * niveau 1 : quelle unité convient ? ; 2 : quelle mesure est plausible ? ;
 * 3 : une conversion écrite par un camarade : vrai ou faux ?
 */
function genCoherence(niveau: 1 | 2 | 3) {
  const p = prenom();
  if (niveau <= 2) {
    const o = randomChoice(OBJETS_REELS);
    const autres = shuffle(unitesAbsurdes(o)).slice(0, 3);
    if (niveau === 1) {
      return {
        text: randomChoice([
          `Quelle unité convient ? ${cap(o.quoi)} ${o.verbe} environ ${nb(o.v)} …`,
          `${p.nom} écrit : « ${o.quoi} ${o.verbe} environ ${nb(o.v)} … ». Quelle unité doit-${il(p)} écrire ?`,
          `Complète avec la bonne unité : ${o.quoi} ${o.verbe} environ ${nb(o.v)} …`,
        ]),
        format: "qcm" as const,
        choices: shuffle([o.u, ...autres]),
        expected: [o.u],
        comparator: "mcq_exact" as const,
        explanation: exp("une mesure ne se lit qu’avec son unité.", "on essaie chaque unité et on garde celle qui donne un objet reconnaissable.", `${nb(o.v)} ${o.u}, c’est un ordre de grandeur réaliste pour ${o.quoi}.`, `l’unité qui convient est ${o.u}.`),
      };
    }
    const bon = `${nb(o.v)} ${o.u}`;
    return {
      text: randomChoice([
        `${cap(o.quoi)} ${o.verbe} environ …`,
        `${p.nom} cherche la bonne mesure : ${o.quoi} ${o.verbe} environ …`,
        `Laquelle de ces mesures est plausible pour ${o.quoi} ?`,
      ]),
      format: "qcm" as const,
      choices: shuffle([bon, ...autres.map((u) => `${nb(o.v)} ${u}`)]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: exp("un ordre de grandeur se vérifie en pensant à l’objet réel.", "on compare chaque proposition à ce qu’on connaît.", `seule la mesure ${bon} correspond à ${o.quoi}.`, `la bonne réponse est ${bon}.`),
    };
  }
  // vrai ou faux sur une conversion
  const m = randomChoice(MESURES_CONV);
  const v = randomChoice(m.v);
  const vers = randomChoice(m.vers);
  const juste = convertir(m.famille, v, m.u, vers);
  const vrai = Math.random() < 0.5;
  const faux = randomChoice([juste * 10, juste / 10, juste * 100, juste / 100].map(r3).filter((x) => x > 0 && deuxDecimales(x)));
  const ecrit = vrai || faux === undefined ? juste : faux;
  return {
    text: randomChoice([
      `${p.nom} écrit : ${nb(v)} ${m.u} = ${nb(ecrit)} ${vers}. Vrai ou faux ?`,
      `Vrai ou faux : ${nb(v)} ${m.u} = ${nb(ecrit)} ${vers} ? C’est ce que pense ${p.nom}.`,
      `Sans poser de calcul, ${p.nom} contrôle l’égalité ${nb(v)} ${m.u} = ${nb(ecrit)} ${vers}. Vrai ou faux ?`,
    ]),
    format: "qcm" as const,
    choices: ["vrai", "faux"],
    expected: [ecrit === juste ? "vrai" : "faux"],
    comparator: "mcq_exact" as const,
    explanation: exp(
      "changer d’unité ne change pas la mesure, seulement le nombre qui l’écrit.",
      `on regarde le rapport entre ${m.u} et ${vers}.`,
      `${nb(v)} ${m.u} = ${nb(juste)} ${vers}.`,
      ecrit === juste ? "l’égalité est vraie." : `l’égalité est fausse : il fallait ${nb(juste)} ${vers}.`,
    ),
  };
}

export const conversionsBank: TutorBankItemV4[] = [
  /* ══════════════════════════════════════════════════════════════════════
     conversion_decimal — longueurs, masses, contenances
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, automatismes). Les trois distracteurs et
  // leurs causes sont ceux de la fiche.
  // ⚠️ LE COMMENTAIRE RESTE AU-DESSUS DE L'ACCOLADE : `verifier-banque.mjs`
  // lit le SOURCE et cherche l'`id:` dans le bloc ; un commentaire glissé
  // entre `kind:` et `id:` lui fait voir un item « sans id ».
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_1_litres_centilitres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : $75\\ \\text{L} = \\ldots\\ \\text{cL}$",
    format: "qcm",
    choices: ["7500", "0,75", "7,5", "750"],
    expected: ["7500"],
    comparator: "mcq_exact",
    hint: "Le préfixe « centi » veut dire centième : il y a 100 cL dans 1 L.",
    explanation: exp(
      "le préfixe « centi » désigne un centième d’unité.",
      "on passe d’une unité grande à une unité petite, donc on multiplie.",
      "1 L = 100 cL, donc 75 L = 75 × 100 = 7 500 cL.",
      "75 L font 7 500 cL."
    ),
    tags: [...OFFICIEL, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "0,75",
        cause:
          "Tu as divisé par 100 au lieu de multiplier. En allant vers une unité plus petite, le nombre devient plus grand.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "7,5",
        cause:
          "Tu as divisé par 10. Deux choses à revoir : le sens de l’opération, et le rapport entre le litre et le centilitre, qui est 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "750",
        cause:
          "Tu as multiplié par 10 : c’est le décilitre. Le préfixe « centi » vaut 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_2_km_metres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "reunion",
    text: "La route du littoral fait environ $3,5\\ \\text{km}$.\nCombien cela fait-il de mètres ?",
    format: "qcm",
    choices: ["3500 m", "350 m", "35 m", "0,0035 m"],
    expected: ["3500 m"],
    comparator: "mcq_exact",
    hint: "1 km = 1 000 m.",
    explanation: exp(
      "le kilomètre vaut mille mètres.",
      "on passe du kilomètre au mètre, donc on multiplie par 1 000.",
      "3,5 × 1 000 = 3 500.",
      "la route fait environ 3 500 m."
    ),
    tags: ["grandeur_conversion", "reunion"],
    choiceDiagnostics: [
      {
        choice: "350 m",
        cause:
          "Tu as multiplié par 100. Le préfixe « kilo » vaut 1 000, pas 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "35 m",
        cause:
          "Tu as seulement déplacé la virgule d’un rang, c’est-à-dire multiplié par 10.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "0,0035 m",
        cause:
          "Tu as divisé par 1 000 au lieu de multiplier : 3,5 km deviendrait plus court que ta main.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_3_grammes_kilos",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "cuisine",
    text: "Un sac de riz pèse $2400\\ \\text{g}$.\nQuelle est sa masse en kilogrammes ?",
    format: "qcm",
    choices: ["2,4 kg", "24 kg", "240 kg", "0,24 kg"],
    expected: ["2,4 kg"],
    comparator: "mcq_exact",
    hint: "1 kg = 1 000 g. On va vers une unité plus grande.",
    explanation: exp(
      "le kilogramme vaut mille grammes.",
      "on passe du gramme au kilogramme, donc on divise par 1 000.",
      "2 400 ÷ 1 000 = 2,4.",
      "le sac pèse 2,4 kg."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "24 kg",
        cause:
          "Tu as divisé par 100. Entre le gramme et le kilogramme, le rapport est 1 000.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "240 kg",
        cause:
          "Tu as divisé par 10. Et 240 kg, ce serait le poids de trois personnes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "0,24 kg",
        cause:
          "Tu as divisé par 10 000 : un rang de trop. Compte les zéros de 1 000.",
        errorKind: "careless",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots
  // comment savoir… si le nombre devient plus grand ou plus petit ». Désormais :
  // un cas (3,5 m en cm). Leurres : « plus petit » (on divise par réflexe),
  // « le même » (la longueur ne change pas, donc le nombre non plus).
  {
    kind: "fixed",
    id: "5e_conversion_decimal_open_1_sens_de_la_conversion",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 3,
    theme: "neutral",
    text: "On écrit 3,5 m en centimètres. Sans calculer : le nombre obtenu est-il plus grand ou plus petit que 3,5 ?",
    format: "qcm",
    choices: ["plus grand", "plus petit", "le même"],
    expected: ["plus grand"],
    comparator: "mcq_exact",
    hint: "Le centimètre est plus petit que le mètre : il en faut beaucoup plus.",
    explanation: exp(
      "changer d’unité ne change pas la longueur, seulement le nombre qui la mesure.",
      "l’unité d’arrivée (cm) est plus petite que l’unité de départ (m) : il en faut davantage.",
      "1 m = 100 cm, donc 3,5 m = 3,5 × 100 = 350 cm.",
      "unité plus petite, nombre plus grand : 350 est plus grand que 3,5."
    ),
    tags: ["grandeur_conversion", "qcm"],
  },
  {
    kind: "template",
    id: "5e_conversion_decimal_tpl_1_longueurs",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère d’abord le rapport entre les deux unités : 10, 100 ou 1 000.",
    tags: ["grandeur_conversion", "template"],
    // 09/10/2026 : 19 mesures réelles × 5 tournures × prénoms (voir genConvDecimal).
    generate: () => genConvDecimal(2),
  },
  {
    kind: "template",
    id: "5e_conversion_decimal_tpl_e3",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "Unité plus petite : le nombre grandit. Unité plus grande : il diminue.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genConvDecimal(3),
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_duree — le système sexagésimal
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, automatismes).
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_1_spectacle",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    text: "Max assiste à un spectacle qui dure 135 minutes.\nComment cette durée peut-elle s’écrire autrement ?",
    format: "qcm",
    choices: ["2 h 15 min", "2 h 35 min", "1 h 15 min", "1 h 35 min"],
    expected: ["2 h 15 min"],
    comparator: "mcq_exact",
    hint: "Une heure fait 60 minutes, pas 100.",
    explanation: exp(
      "les durées ne se comptent pas de dix en dix : une heure vaut 60 minutes.",
      "on cherche combien de fois 60 tient dans 135, et ce qu’il reste.",
      "135 = 60 + 60 + 15, donc 135 min = 2 h 15 min.",
      "le spectacle dure 2 h 15 min."
    ),
    tags: [...OFFICIEL, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "2 h 35 min",
        cause:
          "Tu as compté 100 minutes pour 2 heures, comme si les durées se comptaient de dix en dix. Une heure fait 60 minutes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1 h 15 min",
        cause:
          "Tu as compté 120 minutes pour une seule heure. 120 minutes, ce sont deux heures.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1 h 35 min",
        cause:
          "Tu as lu 135 comme « 1 » et « 35 » en séparant les chiffres. Une durée ne se découpe pas comme un nombre décimal.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_2_deux_heures_quarante_cinq",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    text: "$2\\ \\text{h}\\ 45\\ \\text{min}$, c’est combien de minutes ?",
    format: "qcm",
    choices: ["165 min", "245 min", "105 min", "285 min"],
    expected: ["165 min"],
    comparator: "mcq_exact",
    hint: "Convertis d’abord les 2 heures en minutes, puis ajoute les 45.",
    explanation: exp(
      "une heure vaut 60 minutes.",
      "on transforme les heures en minutes, puis on ajoute les minutes restantes.",
      "2 × 60 = 120, puis 120 + 45 = 165.",
      "2 h 45 min font 165 minutes."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "245 min",
        cause:
          "Tu as collé le 2 des heures devant les 45 minutes. Il faut convertir les heures, pas les juxtaposer.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "105 min",
        cause:
          "Tu n’as compté qu’une seule heure : 60 + 45. Il y en a deux.",
        errorKind: "careless",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "285 min",
        cause:
          "Tu as compté 120 minutes par heure au lieu de 60 : 240 + 45.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_3_une_heure_vingt",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 1,
    theme: "sport",
    text: "Un entraînement dure $1\\ \\text{h}\\ 20\\ \\text{min}$.\nCette durée, c’est aussi …",
    format: "qcm",
    choices: ["80 min", "120 min", "1,20 min", "100 min"],
    expected: ["80 min"],
    comparator: "mcq_exact",
    hint: "Une heure, c’est 60 minutes. Ajoute ensuite les 20.",
    explanation: exp(
      "une heure vaut 60 minutes.",
      "on remplace l’heure par 60 minutes, puis on ajoute.",
      "60 + 20 = 80.",
      "l’entraînement dure 80 minutes."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "120 min",
        cause:
          "Tu as lu « 1 h 20 » comme le nombre 120. Ce sont deux écritures différentes.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1,20 min",
        cause:
          "Tu as écrit la durée avec une virgule. Une durée ne s’écrit pas comme un nombre décimal : la partie après la virgule ne compte pas des centièmes d’heure.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "100 min",
        cause:
          "Tu as compté 80 minutes pour une heure, ou arrondi à la centaine. Une heure fait exactement 60 minutes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi
  // 1 h 70 min ne va pas ». Désormais : le calcul, avec l'erreur de l'élève en
  // leurre (1 h 70 min), et l'oubli de l'heure de départ (1 h 10 min).
  {
    kind: "fixed",
    id: "5e_conversion_duree_open_1_pourquoi_pas_soixante_dix",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 1 h 50 min + 20 min.",
    format: "qcm",
    choices: ["2 h 10 min", "1 h 70 min", "1 h 10 min"],
    expected: ["2 h 10 min"],
    comparator: "mcq_exact",
    hint: "60 minutes font 1 heure.",
    explanation: exp(
      "une durée en minutes ne dépasse jamais 59 : à 60, on change d’heure.",
      "on additionne les minutes, puis on convertit tout ce qui dépasse 60.",
      "50 + 20 = 70, et 70 min = 1 h 10 min, donc 1 h + 1 h 10 = 2 h 10 min.",
      "1 h 50 min + 20 min = 2 h 10 min (et non 1 h 70 min)."
    ),
    tags: ["grandeur_conversion", "qcm"],
  },
  {
    kind: "template",
    id: "5e_conversion_duree_tpl_1_minutes_vers_heures",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de fois 60 tient dans le nombre de minutes.",
    tags: ["grandeur_conversion", "template"],
    // 09/10/2026 : 12 activités × tournures × prénoms ; min → h min (QCM) et h min → min.
    generate: () => genConvDuree(2),
  },
  {
    kind: "template",
    id: "5e_conversion_duree_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 1,
    theme: "neutral",
    hint: "Une heure, c’est 60 minutes.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genConvDuree(1),
  },
  {
    kind: "template",
    id: "5e_conversion_duree_tpl_e3",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 3,
    theme: "neutral",
    hint: "Une heure vaut 60 minutes, une minute 60 secondes ; 0,5 h n’est pas 50 min.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genConvDuree(3),
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_avant_calcul — l'erreur centrale de la fiche Éduscol
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, résolution de problèmes).
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_1_lait_beurre",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 4,
    theme: "cuisine",
    text: "Avec $20\\ \\text{L}$ de lait on obtient $1\\ \\text{kg}$ de beurre.\nPour obtenir $100\\ \\text{g}$ de beurre, il faut :",
    format: "qcm",
    choices: [
      "2 L de lait",
      "2000 L de lait",
      "20 cL de lait",
      "200 L de lait",
    ],
    expected: ["2 L de lait"],
    comparator: "mcq_exact",
    hint: "Commence par écrire les deux masses de beurre dans la même unité.",
    explanation: exp(
      "les deux masses de beurre sont données dans des unités différentes.",
      "on convertit d’abord, puis on applique la proportionnalité.",
      "1 kg = 1 000 g, et 100 g, c’est dix fois moins ; il faut donc dix fois moins de lait : 20 ÷ 10 = 2.",
      "il faut 2 L de lait."
    ),
    tags: [...OFFICIEL_PB, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "2000 L de lait",
        cause:
          "Tu as multiplié 20 par 100. Or 100 g, c’est MOINS que 1 kg : il faut donc moins de lait, pas davantage.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "20 cL de lait",
        cause:
          "Tu as changé l’unité du lait au lieu de convertir la masse du beurre. C’est le beurre qui est donné en deux unités.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "200 L de lait",
        cause:
          "Tu as bien converti 1 kg en 1 000 g et repéré le rapport 10, mais tu as multiplié par 10 au lieu de diviser.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_2_comparer_contenances",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Laquelle de ces trois contenances est la plus grande : $0,5\\ \\text{L}$, $75\\ \\text{cL}$, $400\\ \\text{mL}$ ?",
    format: "qcm",
    choices: ["75 cL", "400 mL", "0,5 L", "Elles sont égales"],
    expected: ["75 cL"],
    comparator: "mcq_exact",
    hint: "Mets les trois dans la même unité avant de comparer.",
    explanation: exp(
      "on ne peut comparer des grandeurs que dans une même unité.",
      "on convertit tout en centilitres, puis on compare les nombres.",
      "0,5 L = 50 cL ; 75 cL ; 400 mL = 40 cL.",
      "la plus grande est 75 cL."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "400 mL",
        cause:
          "Tu as comparé les nombres écrits, et 400 est le plus grand des trois. Mais 400 mL ne font que 40 cL : il faut convertir avant de comparer.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "0,5 L",
        cause:
          "Tu as choisi celle dont l’unité est la plus grande, le litre, sans regarder le nombre : 0,5 L ne font que 50 cL.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "Elles sont égales",
        cause:
          "En convertissant, on obtient 50 cL, 75 cL et 40 cL : elles sont bien différentes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_3_ruban",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban mesure $1,2\\ \\text{m}$. On en coupe $45\\ \\text{cm}$.\nQuelle longueur reste-t-il ?",
    format: "qcm",
    choices: ["75 cm", "0,75 cm", "43,8 cm", "75 m"],
    expected: ["75 cm"],
    comparator: "mcq_exact",
    hint: "Écris les deux longueurs dans la même unité avant de soustraire.",
    explanation: exp(
      "on ne soustrait que des grandeurs exprimées dans la même unité.",
      "on convertit le mètre en centimètres, puis on soustrait.",
      "1,2 m = 120 cm, puis 120 − 45 = 75.",
      "il reste 75 cm."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "0,75 cm",
        cause:
          "Ton calcul est juste en mètres — 1,2 − 0,45 = 0,75 — mais l’unité écrite ne l’est pas : 0,75 m, c’est 75 cm.",
        errorKind: "format",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "43,8 cm",
        cause:
          "Tu as calculé 45 − 1,2 comme si les deux nombres étaient dans la même unité. Il fallait convertir d’abord.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "75 m",
        cause:
          "Le nombre est bon, l’unité non : 75 m, ce serait la longueur d’une piste d’athlétisme.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique ce qu'il faut
  // faire avant d'additionner des kg et des g ». Désormais : le calcul 2 kg + 300 g
  // en grammes (l'erreur « 302 » est refusée).
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_open_1_deux_unites",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac de riz pèse 2 kg et un sac de sucre pèse 300 g. Quelle est la masse totale, en grammes ?",
    format: "short",
    expected: ["2300 g", "2300", "2 300"],
    comparator: "number_equal",
    hint: "Convertis d’abord 2 kg en grammes.",
    explanation: exp(
      "on additionne seulement des masses écrites dans la même unité.",
      "on convertit d’abord les kilogrammes en grammes, puis on additionne.",
      "2 kg = 2 000 g. Donc 2 000 g + 300 g = 2 300 g.",
      "la masse totale est 2 300 g (et non 302 : on n’ajoute pas des kg à des g)."
    ),
    tags: ["grandeur_conversion", "short"],
  },
  {
    kind: "template",
    id: "5e_conversion_avant_calcul_tpl_1_somme_deux_unites",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord les kilogrammes en grammes.",
    tags: ["grandeur_conversion", "template"],
    // 09/10/2026 : somme, reste ou comparaison, en masses, longueurs, contenances.
    generate: () => genAvantCalcul(3),
  },
  {
    kind: "template",
    id: "5e_conversion_avant_calcul_tpl_e4",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris d’abord toutes les mesures dans la même unité.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genAvantCalcul(4),
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_coherence — « contrôle de l'unité finale » (fiche Éduscol)
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_1_deux_km",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : $2\\ \\text{km} = 200\\ \\text{m}$.\nSans poser de calcul, qu’est-ce qui montre que c’est faux ?",
    format: "qcm",
    choices: [
      "1 km vaut 1 000 m, donc 2 km valent bien plus que 200 m",
      "Il fallait diviser par 100",
      "2 est plus petit que 200",
      "On ne peut pas convertir des kilomètres en mètres",
    ],
    expected: ["1 km vaut 1 000 m, donc 2 km valent bien plus que 200 m"],
    comparator: "mcq_exact",
    hint: "Combien de mètres dans un seul kilomètre ?",
    explanation: exp(
      "un ordre de grandeur se contrôle avant tout calcul.",
      "on compare le résultat annoncé à ce que vaut une seule unité.",
      "1 km = 1 000 m, donc 2 km = 2 000 m, dix fois plus que 200 m.",
      "le résultat annoncé est dix fois trop petit."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "Il fallait diviser par 100",
        cause:
          "Non : du kilomètre vers le mètre on multiplie, et par 1 000. Diviser rendrait le résultat encore plus petit.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "2 est plus petit que 200",
        cause:
          "Comparer les nombres seuls ne dit rien : 2 km sont plus longs que 200 m, justement parce que les unités diffèrent.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "On ne peut pas convertir des kilomètres en mètres",
        cause:
          "Si : ce sont deux unités de longueur du même système, on passe de l’une à l’autre en multipliant par 1 000.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_2_bouteille",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 1,
    theme: "neutral",
    text: "Une grande bouteille d’eau contient environ …",
    format: "qcm",
    choices: ["1,5 L", "1,5 mL", "1,5 cL", "1500 L"],
    expected: ["1,5 L"],
    comparator: "mcq_exact",
    hint: "Pense à une bouteille que tu as déjà tenue.",
    explanation: exp(
      "un ordre de grandeur se vérifie en pensant à un objet réel.",
      "on compare chaque proposition à ce qu’on connaît.",
      "1,5 mL tiendrait dans une cuillère, 1,5 cL dans un dé à coudre, 1 500 L rempliraient une citerne.",
      "une grande bouteille contient environ 1,5 L."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "1,5 mL",
        cause:
          "Le millilitre est mille fois plus petit que le litre : 1,5 mL tiendrait au fond d’une cuillère.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "1,5 cL",
        cause:
          "Le centilitre est cent fois plus petit que le litre : 1,5 cL, c’est une gorgée.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "1500 L",
        cause:
          "1 500 L, c’est le volume d’une citerne. Tu as pris le nombre de millilitres et gardé l’unité litre.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_3_marche",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 2,
    theme: "reunion",
    text: "Pour aller à pied au marché de Saint-Pierre, il y a $3\\ \\text{km}$.\nLe trajet dure environ …",
    format: "qcm",
    choices: ["35 minutes", "35 secondes", "3 heures", "3 minutes"],
    expected: ["35 minutes"],
    comparator: "mcq_exact",
    hint: "À pied, on parcourt environ 5 km en une heure.",
    explanation: exp(
      "on contrôle une durée en la rapprochant d’une vitesse connue.",
      "à pied, on marche à environ 5 km/h ; on compare 3 km à cette vitesse.",
      "5 km en 60 min, donc 3 km en un peu plus de la moitié : environ 35 min.",
      "le trajet dure environ 35 minutes."
    ),
    tags: ["grandeur_conversion", "reunion"],
    choiceDiagnostics: [
      {
        choice: "35 secondes",
        cause:
          "Le nombre est bon, l’unité non : en 35 secondes on parcourt une centaine de mètres, pas 3 km.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "3 heures",
        cause:
          "Tu as repris le 3 des kilomètres comme une durée. En 3 heures à pied, on ferait environ 15 km.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "3 minutes",
        cause:
          "Même report du 3, dans l’autre unité : 3 minutes à pied, c’est environ 250 mètres.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment il aurait
  // pu s'en apercevoir ». Désormais : choisir la bonne unité. Leurres : m (l'erreur
  // de l'élève), mm (14 mm, c'est la taille d'un ongle).
  {
    kind: "fixed",
    id: "5e_conversion_coherence_open_1_stylo_de_quatorze_metres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève trouve qu’un stylo mesure 14 m. C’est faux. Un stylo mesure environ 14…",
    format: "qcm",
    choices: ["cm", "m", "mm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "À quoi ressemblerait un objet de 14 mètres ?",
    explanation: exp(
      "un résultat de mesure se relit toujours en pensant à l’objet réel.",
      "on compare le résultat à une taille connue avant de l’écrire.",
      "14 m, c’est la hauteur d’un immeuble de quatre étages ; un stylo mesure environ 14 cm.",
      "l’erreur porte sur l’unité, et l’ordre de grandeur suffisait à la voir."
    ),
    tags: ["grandeur_conversion", "qcm"],
  },
  {
    kind: "template",
    id: "5e_conversion_coherence_tpl_1_choisir_unite",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à l’objet réel avant de choisir l’unité.",
    tags: ["grandeur_conversion", "template"],
    // 09/10/2026 : 21 objets réels ; QCM (avant : l'unité tapée au clavier, en exact_text).
    generate: () => genCoherence(2),
  },
  {
    kind: "template",
    id: "5e_conversion_coherence_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 1,
    theme: "neutral",
    hint: "Pense à l’objet réel avant de choisir l’unité.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genCoherence(1),
  },
  {
    kind: "template",
    id: "5e_conversion_coherence_tpl_e3",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 3,
    theme: "neutral",
    hint: "Vers une unité plus petite, le nombre doit grandir.",
    tags: ["grandeur_conversion", "template"],
    generate: () => genCoherence(3),
  },
];
