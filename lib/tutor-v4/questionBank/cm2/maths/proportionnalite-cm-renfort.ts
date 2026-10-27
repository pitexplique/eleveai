// Renfort proportionnalité, pourcentages et échelles du CM1 et du CM2 (28/10/2026).
//
// Mesure du 27/10 (scripts/mesurer-squelettes-coach.ts) : 2 à 19 squelettes
// par micro, 14 à 19 répétitions sur 20, et 27 questions « open ».
// ⛔ Frédéric, 27/10 : plus AUCUNE question open (« on n'est pas prêt ») ;
// 28/10 : « remplace open par réponse courte ». Ici : QCM ou réponse courte
// seulement, des nombres entiers simples, des situations de leur âge, et un
// tableau en canvas une fois sur deux (règle des CM : la moitié avec canvas).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { attendu, makeChoices, tableauProportionnaliteCanvas } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fr(n: number) {
  return (Math.round(n * 1000) / 1000).toLocaleString("fr-FR").replace(/ /g, " ");
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

const DEF_PROP = "deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.";

/* =========================================================
   PROPORTIONNALITÉ : situations × tournures
   ========================================================= */

type SitCM = {
  lieu: string;
  /** « 5 mangues coûtent 10 € » */
  lien: (n: number, m: number) => string;
  /** « Combien coûtent 8 mangues ? » */
  demande: (n: number) => string;
  /** « Combien de mangues achète-t-on avec 20 € ? » */
  demandeA: (m: number) => string;
  /** « Combien coûte une mangue ? » */
  demandeUn: string;
  labelA: string;
  labelB: string;
  uB: string;
  n: [number, number];
  k: number[];
};

const SITS: SitCM[] = [
  {
    lieu: "Au marché de Saint-Paul",
    lien: (n, m) => `${n} mangues coûtent ${m} €`,
    demande: (n) => `Combien coûtent ${n} mangues ?`,
    demandeA: (m) => `Combien de mangues achète-t-on avec ${m} € ?`,
    demandeUn: "Combien coûte une mangue ?",
    labelA: "Nombre de mangues", labelB: "Prix (€)", uB: "€", n: [2, 10], k: [2, 3],
  },
  {
    lieu: "Au guichet du bus",
    lien: (n, m) => `${n} tickets de bus coûtent ${m} €`,
    demande: (n) => `Combien coûtent ${n} tickets ?`,
    demandeA: (m) => `Combien de tickets achète-t-on avec ${m} € ?`,
    demandeUn: "Combien coûte un ticket ?",
    labelA: "Nombre de tickets", labelB: "Prix (€)", uB: "€", n: [2, 10], k: [2],
  },
  {
    lieu: "À la papeterie",
    lien: (n, m) => `${n} cahiers coûtent ${m} €`,
    demande: (n) => `Combien coûtent ${n} cahiers ?`,
    demandeA: (m) => `Combien de cahiers achète-t-on avec ${m} € ?`,
    demandeUn: "Combien coûte un cahier ?",
    labelA: "Nombre de cahiers", labelB: "Prix (€)", uB: "€", n: [2, 9], k: [2, 3, 4],
  },
  {
    lieu: "Dans la recette des crêpes de Mamie",
    lien: (n, m) => `avec ${n} œufs, on fait ${m} crêpes`,
    demande: (n) => `Combien de crêpes fait-on avec ${n} œufs ?`,
    demandeA: (m) => `Combien d’œufs faut-il pour ${m} crêpes ?`,
    demandeUn: "Combien de crêpes fait-on avec un œuf ?",
    labelA: "Nombre d’œufs", labelB: "Nombre de crêpes", uB: "", n: [2, 8], k: [4, 5, 6],
  },
  {
    lieu: "Au parking à vélos",
    lien: (n, m) => `${n} vélos ont ${m} roues`,
    demande: (n) => `Combien de roues ont ${n} vélos ?`,
    demandeA: (m) => `Combien de vélos ont ${m} roues en tout ?`,
    demandeUn: "Combien de roues a un vélo ?",
    labelA: "Nombre de vélos", labelB: "Nombre de roues", uB: "", n: [3, 12], k: [2],
  },
  {
    lieu: "Au vivarium",
    lien: (n, m) => `${n} araignées ont ${m} pattes`,
    demande: (n) => `Combien de pattes ont ${n} araignées ?`,
    demandeA: (m) => `Combien d’araignées ont ${m} pattes en tout ?`,
    demandeUn: "Combien de pattes a une araignée ?",
    labelA: "Nombre d’araignées", labelB: "Nombre de pattes", uB: "", n: [2, 9], k: [8],
  },
  {
    lieu: "Dans la salle des fêtes",
    lien: (n, m) => `${n} rangées comptent ${m} chaises`,
    demande: (n) => `Combien de chaises y a-t-il dans ${n} rangées ?`,
    demandeA: (m) => `Combien de rangées faut-il pour ${m} chaises ?`,
    demandeUn: "Combien de chaises y a-t-il dans une rangée ?",
    labelA: "Nombre de rangées", labelB: "Nombre de chaises", uB: "", n: [2, 9], k: [6, 8, 10, 12],
  },
  {
    lieu: "À l’atelier bijoux",
    lien: (n, m) => `pour ${n} bracelets, il faut ${m} perles`,
    demande: (n) => `Combien de perles faut-il pour ${n} bracelets ?`,
    demandeA: (m) => `Combien de bracelets fait-on avec ${m} perles ?`,
    demandeUn: "Combien de perles faut-il pour un bracelet ?",
    labelA: "Nombre de bracelets", labelB: "Nombre de perles", uB: "", n: [2, 8], k: [12, 15, 20],
  },
  {
    lieu: "Dans le potager de l’école",
    lien: (n, m) => `${n} arrosoirs contiennent ${m} litres d’eau`,
    demande: (n) => `Combien de litres contiennent ${n} arrosoirs ?`,
    demandeA: (m) => `Combien d’arrosoirs remplit-on avec ${m} litres ?`,
    demandeUn: "Combien de litres contient un arrosoir ?",
    labelA: "Nombre d’arrosoirs", labelB: "Litres d’eau", uB: "L", n: [2, 9], k: [5, 10],
  },
  {
    lieu: "Pendant les vacances",
    lien: (n, m) => `en ${n} jours, Inès lit ${m} pages`,
    demande: (n) => `Combien de pages lit-elle en ${n} jours ?`,
    demandeA: (m) => `En combien de jours lit-elle ${m} pages ?`,
    demandeUn: "Combien de pages lit-elle par jour ?",
    labelA: "Nombre de jours", labelB: "Nombre de pages", uB: "", n: [2, 10], k: [10, 15, 20],
  },
  {
    lieu: "Au cinéma du quartier",
    lien: (n, m) => `${n} places de cinéma coûtent ${m} €`,
    demande: (n) => `Combien coûtent ${n} places ?`,
    demandeA: (m) => `Combien de places achète-t-on avec ${m} € ?`,
    demandeUn: "Combien coûte une place ?",
    labelA: "Nombre de places", labelB: "Prix (€)", uB: "€", n: [2, 8], k: [5, 6, 7],
  },
  {
    lieu: "Sur la voie verte",
    lien: (n, m) => `en ${n} heures, Noah parcourt ${m} km à vélo`,
    demande: (n) => `Combien de kilomètres parcourt-il en ${n} heures ?`,
    demandeA: (m) => `En combien d’heures parcourt-il ${m} km ?`,
    demandeUn: "Combien de kilomètres parcourt-il en une heure ?",
    labelA: "Durée (h)", labelB: "Distance (km)", uB: "km", n: [2, 6], k: [12, 15, 20],
  },
  {
    lieu: "Chez la vétérinaire",
    lien: (n, m) => `en ${n} jours, le chien Pilou mange ${m} g de croquettes`,
    demande: (n) => `Combien de grammes mange-t-il en ${n} jours ?`,
    demandeA: (m) => `En combien de jours mange-t-il ${m} g ?`,
    demandeUn: "Combien de grammes mange-t-il par jour ?",
    labelA: "Nombre de jours", labelB: "Croquettes (g)", uB: "g", n: [2, 7], k: [100, 150, 200],
  },
  {
    lieu: "Au club de foot",
    lien: (n, m) => `${n} équipes comptent ${m} joueuses`,
    demande: (n) => `Combien de joueuses comptent ${n} équipes ?`,
    demandeA: (m) => `Combien d’équipes forme-t-on avec ${m} joueuses ?`,
    demandeUn: "Combien de joueuses y a-t-il dans une équipe ?",
    labelA: "Nombre d’équipes", labelB: "Nombre de joueuses", uB: "", n: [2, 8], k: [7, 11],
  },
  {
    lieu: "À la boulangerie",
    lien: (n, m) => `${n} pains au chocolat coûtent ${m} €`,
    demande: (n) => `Combien coûtent ${n} pains au chocolat ?`,
    demandeA: (m) => `Combien de pains au chocolat achète-t-on avec ${m} € ?`,
    demandeUn: "Combien coûte un pain au chocolat ?",
    labelA: "Nombre de pains", labelB: "Prix (€)", uB: "€", n: [2, 10], k: [1, 2],
  },
  {
    lieu: "Au rayon des fournitures",
    lien: (n, m) => `${n} pochettes contiennent ${m} autocollants`,
    demande: (n) => `Combien d’autocollants contiennent ${n} pochettes ?`,
    demandeA: (m) => `Combien de pochettes faut-il pour ${m} autocollants ?`,
    demandeUn: "Combien d’autocollants contient une pochette ?",
    labelA: "Nombre de pochettes", labelB: "Autocollants", uB: "", n: [2, 9], k: [5, 6, 8, 10],
  },
];

function rep(n: number, s: SitCM) {
  return attendu(n, s.uB);
}

/** « Fois plus » (sens = 1) ou « fois moins » (sens = −1) : on multiplie ou on divise les deux grandeurs. */
export function genFois(sens: 1 | -1, niveau: 2 | 3) {
  const s = randomChoice(SITS);
  const k = randomChoice(s.k);
  const f = niveau === 2 ? randomChoice([2, 3]) : randomChoice([3, 4, 5, 10]);
  const petit = randomInt(2, Math.max(2, Math.floor(s.n[1] / (niveau === 2 ? 2 : 3))));
  const [n1, n2] = sens === 1 ? [petit, petit * f] : [petit * f, petit];
  const m1 = n1 * k;
  const m2 = n2 * k;
  const mot = sens === 1 ? "fois plus" : "fois moins";
  const t = randomInt(1, 5);
  let text: string;
  if (t === 1) text = `${cap(s.lien(n1, m1))}. ${s.demande(n2)}`;
  else if (t === 2) text = `${s.lieu}, ${s.lien(n1, m1)}. ${s.demande(n2)}`;
  else if (t === 3) text = `${s.lieu} : ${s.lien(n1, m1)}. On en prend ${f} ${mot}. ${s.demande(n2)}`;
  else if (t === 4) text = `Sachant que ${s.lien(n1, m1)}, réponds : ${s.demande(n2).charAt(0).toLowerCase()}${s.demande(n2).slice(1)}`;
  else {
    const pieges = [m1 + (n2 - n1), sens === 1 ? m1 + f : m1 - f, m1 * f + f, n2 * (k + 1)].filter((x) => x > 0 && x !== m2);
    return {
      text: `${s.lieu}, ${s.lien(n1, m1)}. ${s.demande(n2)}`,
      format: "qcm" as const,
      choices: makeChoices(String(m2), pieges.map(String)),
      expected: [String(m2)],
      comparator: "mcq_exact" as const,
      explanation: expl(
        DEF_PROP,
        `${n2} c’est ${f} ${mot} que ${n1} : on ${sens === 1 ? "multiplie" : "divise"} aussi l’autre nombre par ${f}.`,
        sens === 1 ? `${m1} × ${f} = ${m2}.` : `${m1} ÷ ${f} = ${m2}.`,
        `la réponse est ${m2}${s.uB ? " " + s.uB : ""}.`,
      ),
    };
  }
  return {
    text,
    format: "short" as const,
    expected: rep(m2, s),
    comparator: "number_equal" as const,
    explanation: expl(
      DEF_PROP,
      `${n2} c’est ${f} ${mot} que ${n1} : on ${sens === 1 ? "multiplie" : "divise"} aussi l’autre nombre par ${f}.`,
      sens === 1 ? `${m1} × ${f} = ${m2}.` : `${m1} ÷ ${f} = ${m2}.`,
      `la réponse est ${m2}${s.uB ? " " + s.uB : ""}.`,
    ),
  };
}

/** Compléter un tableau (canvas une fois sur deux). */
export function genTableauCM(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITS);
  const k = randomChoice(s.k);
  const a = niveau === 1 ? 1 : randomInt(2, 4);
  const b = niveau === 3 ? a + randomInt(1, 4) : a * randomChoice([2, 3]);
  const c = niveau === 3 ? a + b : b * 2;
  const ns = [a, b, c];
  const ms = ns.map((x) => x * k);
  const trou = niveau === 1 ? 1 : 2;
  const enHaut = niveau === 3 && Math.random() < 0.4;
  const rep_ = enHaut ? ns[trou] : ms[trou];
  const methode =
    niveau === 3
      ? `${c} = ${a} + ${b} : on additionne aussi les valeurs, ou on multiplie par ${k}.`
      : `on cherche par combien on multiplie : ${ms[0]} ÷ ${ns[0]} = ${k}.`;
  const calcul = enHaut ? `${ms[trou]} ÷ ${k} = ${ns[trou]}.` : `${ns[trou]} × ${k} = ${ms[trou]}.`;
  const base = {
    format: "short" as const,
    expected: attendu(rep_),
    comparator: "number_equal" as const,
    explanation: expl(DEF_PROP, methode, calcul, `la case vide vaut ${rep_}.`),
  };
  if (Math.random() < 0.5) {
    const vals = [ns.map(String), ms.map(String)];
    const cell = enHaut ? { row: 0, col: trou } : { row: 1, col: trou };
    vals[cell.row][cell.col] = "?";
    return {
      ...base,
      text: `${s.lieu} : ${randomChoice(["complète ce tableau de proportionnalité.", "quelle valeur manque dans ce tableau ?", "trouve le nombre caché par le « ? »."])}`,
      canvas: tableauProportionnaliteCanvas({ rowLabels: [s.labelA, s.labelB], values: vals, missing: [cell], highlightedCells: [cell] }),
    };
  }
  const haut = ns.map((x, i) => (enHaut && i === trou ? "?" : String(x))).join(" ; ");
  const bas = ms.map((x, i) => (!enHaut && i === trou ? "?" : String(x))).join(" ; ");
  return { ...base, text: `${s.lieu}, tableau de proportionnalité — ${s.labelA} : ${haut} — ${s.labelB} : ${bas}. Quelle est la valeur manquante ?` };
}

/** Reconnaître une situation proportionnelle (oui / non). */
export function genReconnaitreCM(niveau: 1 | 2 | 3) {
  const s = randomChoice(SITS);
  const k = randomChoice(s.k);
  const a = randomInt(2, 3);
  const ns = niveau === 1 ? [a, 2 * a] : niveau === 2 ? [a, 2 * a, 3 * a] : [a, a + randomInt(1, 3), a + randomInt(4, 6)];
  const ms = ns.map((x) => x * k);
  const prop = Math.random() < 0.5;
  if (!prop) ms[ms.length - 1] += randomChoice([1, 2, 3, k]);
  const couples = ns.map((x, i) => s.lien(x, ms[i]));
  const t = randomInt(1, 3);
  const text =
    t === 1
      ? `${s.lieu} : ${couples.join(" ; ")}. Est-ce une situation de proportionnalité ?`
      : t === 2
        ? `${s.lieu}, tableau — ${s.labelA} : ${ns.join(" ; ")} — ${s.labelB} : ${ms.join(" ; ")}. Ce tableau est-il proportionnel ?`
        : `On relève : ${couples.join(" ; ")}. Peut-on passer d’une ligne à l’autre en multipliant toujours par le même nombre ?`;
  return {
    text,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [prop ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(
      DEF_PROP,
      "on divise chaque nombre du bas par le nombre du haut.",
      ns.map((x, i) => `${ms[i]} ÷ ${x} = ${fr(ms[i] / x)}`).join(" ; ") + ".",
      prop ? `on multiplie toujours par ${k} : c’est proportionnel.` : "on ne multiplie pas toujours par le même nombre : ce n’est pas proportionnel.",
    ),
  };
}

/** Coefficient : valeur pour un, « par quel nombre multiplie-t-on ? », ou l’utiliser. */
export function genCoeffCM(niveau: 2 | 3 | 4) {
  const s = randomChoice(SITS);
  const k = randomChoice(s.k);
  const n = randomInt(s.n[0], s.n[1]);
  const m = n * k;
  const t = randomInt(1, niveau === 4 ? 4 : 3);
  if (t === 4) {
    const n2 = randomInt(s.n[0], s.n[1] + 3);
    return {
      text: `${s.lieu}, ${s.lien(n, m)}. ${s.demandeUn} Puis : ${s.demande(n2).charAt(0).toLowerCase()}${s.demande(n2).slice(1)}`,
      format: "short" as const,
      expected: rep(n2 * k, s),
      comparator: "number_equal" as const,
      explanation: expl(DEF_PROP, `on passe par un : ${m} ÷ ${n} = ${k}.`, `${n2} × ${k} = ${n2 * k}.`, `la réponse est ${n2 * k}${s.uB ? " " + s.uB : ""}.`),
    };
  }
  const text =
    t === 1
      ? `${cap(s.lien(n, m))}. ${s.demandeUn}`
      : t === 2
        ? `${s.lieu}, ${s.lien(n, m)}. ${s.demandeUn}`
        : `${s.lieu}, tableau de proportionnalité — ${s.labelA} : ${n} — ${s.labelB} : ${m}. Par quel nombre multiplie-t-on le nombre du haut pour obtenir celui du bas ?`;
  return {
    text,
    format: "short" as const,
    expected: t === 3 ? attendu(k) : rep(k, s),
    comparator: "number_equal" as const,
    explanation: expl(DEF_PROP, "on divise le nombre du bas par celui du haut.", `${m} ÷ ${n} = ${k}.`, `le coefficient est ${k}.`),
  };
}

/** Problèmes : passage par l’unité, sens inverse, somme de deux colonnes. */
export function genProblemeCM(niveau: 3 | 4) {
  const s = randomChoice(SITS);
  const k = randomChoice(s.k);
  const n1 = randomInt(Math.max(2, s.n[0]), s.n[1]);
  let n2: number;
  do n2 = randomInt(s.n[0], s.n[1] + 4);
  while (n2 === n1 || n2 % n1 === 0 || n1 % n2 === 0);
  const m1 = n1 * k;
  const m2 = n2 * k;
  const t = randomInt(1, niveau === 4 ? 4 : 3);
  if (t === 3) {
    const a = randomInt(2, 5);
    const b = randomInt(2, 5);
    return {
      text: `${s.lieu}, ${s.lien(a, a * k)} et ${s.lien(b, b * k)}. ${s.demande(a + b)}`,
      format: "short" as const,
      expected: rep((a + b) * k, s),
      comparator: "number_equal" as const,
      explanation: expl(DEF_PROP, `${a + b} = ${a} + ${b} : on additionne les deux valeurs.`, `${a * k} + ${b * k} = ${(a + b) * k}.`, `la réponse est ${(a + b) * k}${s.uB ? " " + s.uB : ""}.`),
    };
  }
  if (t === 4 || t === 2) {
    return {
      text: `${s.lieu}, ${s.lien(n1, m1)}. ${s.demandeA(m2)}`,
      format: "short" as const,
      expected: attendu(n2),
      comparator: "number_equal" as const,
      explanation: expl(DEF_PROP, `on passe par un : ${m1} ÷ ${n1} = ${k}.`, `${m2} ÷ ${k} = ${n2}.`, `la réponse est ${n2}.`),
    };
  }
  return {
    text: `${cap(s.lien(n1, m1))}. ${s.demande(n2)}`,
    format: "short" as const,
    expected: rep(m2, s),
    comparator: "number_equal" as const,
    explanation: expl(DEF_PROP, `on passe par un : ${m1} ÷ ${n1} = ${k}.`, `${n2} × ${k} = ${m2}.`, `la réponse est ${m2}${s.uB ? " " + s.uB : ""}.`),
  };
}

/** Défi : quelle offre est la plus avantageuse ? */
export function genOffresCM() {
  const s = randomChoice(SITS.filter((x) => x.uB === "€"));
  const ka = randomChoice([2, 3, 4, 5]);
  let kb: number;
  do kb = randomChoice([2, 3, 4, 5]);
  while (kb === ka);
  const na = randomInt(2, 5);
  const nb = randomInt(3, 8);
  const meilleure = ka < kb ? "l’offre A" : "l’offre B";
  return {
    text: randomChoice([
      `${s.lieu}, deux offres. Offre A : ${s.lien(na, na * ka)}. Offre B : ${s.lien(nb, nb * kb)}. Quelle offre est la moins chère pour un seul article ?`,
      `Offre A : ${s.lien(na, na * ka)}. Offre B : ${s.lien(nb, nb * kb)}. ${s.lieu}, quelle offre choisir pour payer le moins cher l’article ?`,
      `${s.lieu}, Léo compare. Offre A : ${s.lien(na, na * ka)} ; offre B : ${s.lien(nb, nb * kb)}. Où l’article est-il le moins cher ?`,
      `Pour économiser : offre A (${s.lien(na, na * ka)}) ou offre B (${s.lien(nb, nb * kb)}) ? Laquelle donne l’article le moins cher ?`,
    ]),
    format: "qcm" as const,
    choices: ["l’offre A", "l’offre B", "elles se valent"],
    expected: [meilleure],
    comparator: "mcq_exact" as const,
    explanation: expl(
      "pour comparer, on calcule le prix d’un seul article dans chaque offre.",
      "on divise le prix par le nombre d’articles.",
      `A : ${na * ka} ÷ ${na} = ${ka} € ; B : ${nb * kb} ÷ ${nb} = ${kb} €.`,
      `${meilleure} est la moins chère.`,
    ),
  };
}

/* =========================================================
   POURCENTAGES (CM2)
   ========================================================= */

const GROUPES = [
  { tout: "élèves de l’école", qui: "viennent à pied" },
  { tout: "billes du sac", qui: "sont rouges" },
  { tout: "cases de la grille", qui: "sont coloriées" },
  { tout: "arbres du parc", qui: "sont des manguiers" },
  { tout: "spectateurs du match", qui: "portent un maillot bleu" },
  { tout: "livres de la BCD", qui: "sont des bandes dessinées" },
  { tout: "élèves du collège", qui: "mangent à la cantine" },
  { tout: "poissons de l’aquarium", qui: "sont orange" },
  { tout: "coureurs du cross", qui: "finissent la course" },
  { tout: "voitures du parking", qui: "sont électriques" },
  { tout: "graines semées", qui: "ont germé" },
  { tout: "habitants du village", qui: "ont voté" },
];

const PCT_FRAC: Array<[number, string, string]> = [
  [50, "la moitié", "0,5"],
  [25, "le quart", "0,25"],
  [75, "les trois quarts", "0,75"],
  [10, "le dixième", "0,1"],
  [20, "le cinquième", "0,2"],
];

export function genPctComprendre(niveau: 1 | 2 | 3) {
  const g = randomChoice(GROUPES);
  const t = niveau === 1 ? randomInt(1, 2) : randomInt(1, 3);
  if (t === 1) {
    const p = randomInt(3, 97);
    return {
      text: randomChoice([`Sur 100 ${g.tout}, ${p} ${g.qui}. Quel pourcentage des ${g.tout} ${g.qui} ?`, `${p} ${g.tout} sur 100 ${g.qui}. Écris-le en pourcentage.`]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("un pourcentage, c’est un nombre de parts sur 100.", "sur 100, on lit directement le pourcentage.", `${p} sur 100 = ${p} %.`, `${p} % des ${g.tout} ${g.qui}.`),
    };
  }
  if (t === 2) {
    const p = randomChoice([5, 10, 15, 20, 30, 40, 60, 80]);
    return {
      text: randomChoice([`${p} % des ${g.tout} ${g.qui}. Sur 100 ${g.tout}, combien ${g.qui} ?`, `On lit : « ${p} % des ${g.tout} ${g.qui} ». Combien sur 100 ?`]),
      format: "short" as const,
      expected: attendu(p),
      comparator: "number_equal" as const,
      explanation: expl("p %, c’est p sur 100.", "sur 100, on prend p.", `${p} % de 100 = ${p}.`, `${p} ${g.tout} ${g.qui}.`),
    };
  }
  const [p, mot] = randomChoice(PCT_FRAC);
  return {
    text: randomChoice([`Dire que ${p} % des ${g.tout} ${g.qui}, c’est dire que :`, `${p} % des ${g.tout} ${g.qui}. Cela fait quelle part des ${g.tout} ?`]),
    format: "qcm" as const,
    choices: makeChoices(mot, PCT_FRAC.map((x) => x[1])),
    expected: [mot],
    comparator: "mcq_exact" as const,
    explanation: expl("p %, c’est p sur 100.", `${p} sur 100, c’est ${mot}.`, `${p}/100 = ${mot}.`, `${p} %, c’est ${mot}.`),
  };
}

export function genPctFracDec(niveau: 2 | 3) {
  const t = randomInt(1, 4);
  if (t === 1) {
    const p = niveau === 2 ? randomChoice([10, 20, 30, 50, 70, 90]) : randomInt(11, 99);
    const d = fr(p / 100);
    return {
      text: randomChoice([`Écris ${p} % sous forme d’un nombre décimal.`, `${p} % = ? (nombre décimal)`, `Quel nombre décimal est égal à ${p} % ?`, `${p} % des ${randomChoice(GROUPES).tout} : écris ce pourcentage avec un nombre décimal.`]),
      format: "short" as const,
      expected: [d],
      comparator: "number_equal" as const,
      explanation: expl("p % = p/100.", "on divise par 100.", `${p} ÷ 100 = ${d}.`, `${p} % = ${d}.`),
    };
  }
  if (t === 2) {
    const p = niveau === 2 ? randomChoice([10, 20, 40, 50, 60]) : randomInt(11, 99);
    const d = fr(p / 100);
    return {
      text: randomChoice([`Écris ${d} sous forme de pourcentage.`, `${d} = ? %`, `Quel pourcentage est égal à ${d} ?`, `Une part de ${d} des ${randomChoice(GROUPES).tout} : combien de pour cent ?`]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("p % = p/100.", "on multiplie par 100.", `${d} × 100 = ${p}.`, `${d} = ${p} %.`),
    };
  }
  const [p, mot, d] = randomChoice(PCT_FRAC);
  if (t === 3) {
    return {
      text: randomChoice([`Quel pourcentage correspond à ${mot} ?`, `Prendre ${mot} d’une quantité, c’est en prendre combien de pour cent ?`, `${cap(mot)} des ${randomChoice(GROUPES).tout} : quel pourcentage ?`]),
      format: "short" as const,
      expected: attendu(p, "%"),
      comparator: "number_equal" as const,
      explanation: expl("p % = p/100.", `${mot} de 100, c’est ${p}.`, `${mot} = ${p}/100.`, `${mot}, c’est ${p} %.`),
    };
  }
  return {
    text: `${p} %, c’est ${mot}. Quel nombre décimal lui est égal ?`,
    format: "qcm" as const,
    choices: makeChoices(d, PCT_FRAC.map((x) => x[2]).concat([String(p)])),
    expected: [d],
    comparator: "mcq_exact" as const,
    explanation: expl("p % = p/100.", "on divise par 100.", `${p} ÷ 100 = ${d}.`, `${mot} = ${d}.`),
  };
}

const QUANTITES = [
  { quoi: "élèves", ou: "dans l’école des Bambous", u: "" },
  { quoi: "€", ou: "dans la tirelire de Lina", u: "€" },
  { quoi: "km", ou: "sur le parcours de la course", u: "km" },
  { quoi: "billes", ou: "dans la boîte de Tom", u: "" },
  { quoi: "places", ou: "dans le stade", u: "" },
  { quoi: "g", ou: "dans le paquet de farine", u: "g" },
  { quoi: "spectateurs", ou: "dans la salle de concert", u: "" },
  { quoi: "mL", ou: "dans la bouteille de jus", u: "mL" },
  { quoi: "pages", ou: "dans le roman de Jules Verne", u: "" },
  { quoi: "€", ou: "dans la cagnotte de la classe", u: "€" },
];

export function genPctCalculer(niveau: 2 | 3) {
  const q = randomChoice(QUANTITES);
  const p = niveau === 2 ? randomChoice([50, 10, 25]) : randomChoice([20, 75, 30, 5]);
  const base = p === 25 || p === 75 ? 4 : p === 5 ? 20 : 10;
  const N = base * randomInt(3, 30);
  const r = (N * p) / 100;
  const t = randomInt(1, 4);
  const text =
    t === 1
      ? `Calcule ${p} % de ${N} ${q.quoi}.`
      : t === 2
        ? `Il y a ${N} ${q.quoi} ${q.ou}. Combien font ${p} % de ${N} ?`
        : t === 3
          ? `${cap(q.ou)}, il y a ${N} ${q.quoi}. On en prend ${p} %. Combien cela fait-il ?`
          : `Combien font ${p} % des ${N} ${q.quoi} ${q.ou} ?`;
  return {
    text,
    format: "short" as const,
    expected: attendu(r, q.u),
    comparator: "number_equal" as const,
    explanation: expl(
      "p % d’une quantité, c’est p parts sur 100 de cette quantité.",
      p === 50 ? "50 %, c’est la moitié." : p === 25 ? "25 %, c’est le quart." : p === 10 ? "10 %, c’est le dixième." : `on divise par 100 puis on multiplie par ${p}.`,
      `${N} ÷ 100 × ${p} = ${fr(r)}.`,
      `${p} % de ${N} = ${fr(r)}.`,
    ),
  };
}

const ARTICLES = [
  { quoi: "Un vélo", prix: [80, 120, 150, 200] },
  { quoi: "Un ballon de basket", prix: [20, 30, 40] },
  { quoi: "Une paire de baskets", prix: [40, 60, 80] },
  { quoi: "Un jeu de société", prix: [20, 30, 40, 50] },
  { quoi: "Un sac à dos", prix: [20, 40, 60] },
  { quoi: "Une trottinette", prix: [60, 80, 100, 120] },
  { quoi: "Une guitare", prix: [100, 120, 200] },
  { quoi: "Un maillot de foot", prix: [40, 60, 80] },
  { quoi: "Une tente de camping", prix: [80, 120, 160] },
  { quoi: "Un casque de vélo", prix: [20, 40, 60] },
];

export function genPctProbleme(niveau: 3 | 4) {
  const a = randomChoice(ARTICLES);
  const P = randomChoice(a.prix);
  const p = randomChoice(niveau === 3 ? [10, 50, 25] : [20, 30, 25, 10]);
  const r = (P * p) / 100;
  if (niveau === 3 || Math.random() < 0.4) {
    return {
      text: randomChoice([
        `${a.quoi} coûte ${P} €. Pendant les soldes, il y a une réduction de ${p} %. De combien d’euros est la réduction ?`,
        `${a.quoi} à ${P} € : soldes à −${p} %. Combien d’euros économise-t-on ?`,
        `Soldes : −${p} % sur cet article (${a.quoi.toLowerCase()}) affiché ${P} €. Quel est le montant de la remise, en € ?`,
      ]),
      format: "short" as const,
      expected: attendu(r, "€"),
      comparator: "number_equal" as const,
      explanation: expl("la réduction est p % du prix.", `on calcule ${p} % de ${P}.`, `${P} ÷ 100 × ${p} = ${fr(r)}.`, `la réduction est de ${fr(r)} €.`),
    };
  }
  return {
    text: randomChoice([
      `${a.quoi} coûte ${P} €. Soldes : −${p} %. Quel est son nouveau prix ?`,
        `Pendant les soldes, ${a.quoi.toLowerCase()} à ${P} € perd ${p} % de son prix. Quel est son prix maintenant ?`,
        `Prix affiché : ${P} € (${a.quoi.toLowerCase()}). Remise : ${p} %. Combien paie-t-on ?`,
    ]),
    format: "short" as const,
    expected: attendu(P - r, "€"),
    comparator: "number_equal" as const,
    explanation: expl("après une réduction, nouveau prix = prix − réduction.", `réduction : ${p} % de ${P} = ${fr(r)} €.`, `${P} − ${fr(r)} = ${fr(P - r)}.`, `le nouveau prix est ${fr(P - r)} €.`),
  };
}

export function genPctDefi(niveau: 4 | 5) {
  if (niveau === 4) return genPctProbleme(4);
  const a = randomChoice(ARTICLES);
  const P = randomChoice(a.prix);
  const p = randomChoice([10, 20, 25, 50]);
  const r = (P * p) / 100;
  return {
    text: randomChoice([
      `${p} % du prix (${a.quoi.toLowerCase()}) valent ${fr(r)} €. Quel est le prix entier ?`,
      `${a.quoi} : une remise de ${p} % fait économiser ${fr(r)} €. Quel était le prix avant la remise ?`,
      `On sait que ${p} % du prix (${a.quoi.toLowerCase()}) font ${fr(r)} €. Combien coûte l’objet en entier ?`,
    ]),
    format: "short" as const,
    expected: attendu(P, "€"),
    comparator: "number_equal" as const,
    explanation: expl("100 % est le prix entier.", `${p} % → ${fr(r)} € ; 100 % c’est ${100 / p} fois plus.`, `${fr(r)} × ${100 / p} = ${P}.`, `le prix entier est ${P} €.`),
  };
}

/* =========================================================
   ÉCHELLES (CM2)
   ========================================================= */

const PLANS = [
  { quoi: "le plan de la classe", E: [50, 100], u: "m" },
  { quoi: "le plan de la maison", E: [100, 200], u: "m" },
  { quoi: "le plan du stade", E: [500, 1000], u: "m" },
  { quoi: "le plan du collège", E: [200, 500, 1000], u: "m" },
  { quoi: "la carte de randonnée de Mafate", E: [25000, 50000, 100000], u: "km" },
  { quoi: "la carte routière de l’île", E: [100000, 200000, 500000], u: "km" },
  { quoi: "le plan du jardin de l’école", E: [100, 200, 500], u: "m" },
  { quoi: "le plan de la piscine", E: [200, 500], u: "m" },
  { quoi: "la carte du Piton de la Fournaise", E: [25000, 50000], u: "km" },
  { quoi: "le plan du quartier", E: [1000, 2000, 5000], u: "m" },
  { quoi: "la carte de France", E: [1000000, 2000000], u: "km" },
];

function enUnite(cmReels: number, u: string) {
  return u === "km" ? cmReels / 100000 : cmReels / 100;
}

export function genEchComprendre(niveau: 1 | 2 | 3) {
  const p = randomChoice(PLANS);
  const E = randomChoice(p.E);
  const t = niveau === 1 ? 1 : randomInt(1, 3);
  if (t === 1) {
    return {
      text: randomChoice([
        `Sur ${p.quoi}, à l’échelle 1/${fr(E)}, 1 cm représente combien de centimètres en réalité ?`,
        `On lit l’échelle 1/${fr(E)} sur ${p.quoi}. 1 cm sur le plan, c’est combien de cm en vrai ?`,
        `Échelle 1/${fr(E)} pour ${p.quoi} : quelle longueur réelle, en cm, représente 1 cm ?`,
      ]),
      format: "short" as const,
      expected: attendu(E, "cm"),
      comparator: "number_equal" as const,
      explanation: expl("l’échelle 1/E : 1 cm sur le plan représente E cm en réalité.", "on lit le nombre sous la barre.", `1 cm → ${fr(E)} cm.`, `1 cm représente ${fr(E)} cm.`),
    };
  }
  const reel = enUnite(E, p.u);
  if (t === 2) {
    return {
      text: randomChoice([
        `Sur ${p.quoi}, à l’échelle 1/${fr(E)}, 1 cm représente combien de ${p.u === "km" ? "kilomètres" : "mètres"} en réalité ?`,
        `${cap(p.quoi)} est à l’échelle 1/${fr(E)}. Combien de ${p.u} représente 1 cm ?`,
      ]),
      format: "short" as const,
      expected: attendu(reel, p.u),
      comparator: "number_equal" as const,
      explanation: expl("1 cm sur le plan représente E cm en réalité.", p.u === "km" ? "1 km = 100 000 cm." : "1 m = 100 cm.", `${fr(E)} cm = ${fr(reel)} ${p.u}.`, `1 cm représente ${fr(reel)} ${p.u}.`),
    };
  }
  const bon = `1 cm sur le plan représente ${fr(E)} cm en réalité`;
  return {
    text: `Que veut dire l’échelle 1/${fr(E)} sur ${p.quoi} ?`,
    format: "qcm" as const,
    choices: makeChoices(bon, [`1 cm en réalité représente ${fr(E)} cm sur le plan`, `1 m sur le plan représente ${fr(E)} km en réalité`, `le plan est ${fr(E)} fois plus grand que la réalité`]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl("l’échelle compare une longueur du plan à la longueur réelle.", "1/E : 1 sur le plan, E en réalité, dans la même unité.", `1 cm → ${fr(E)} cm.`, bon + "."),
  };
}

export function genEchDistance(sens: "reelle" | "plan", niveau: 1 | 2 | 3) {
  const p = randomChoice(PLANS);
  const E = randomChoice(p.E);
  const L = niveau === 1 ? randomInt(2, 6) : niveau === 2 ? randomInt(3, 12) : randomInt(5, 20) + randomChoice([0, 0.5]);
  const reel = enUnite(L * E, p.u);
  const uLong = p.u === "km" ? "kilomètres" : "mètres";
  if (sens === "reelle") {
    return {
      text: randomChoice([
        `Sur ${p.quoi} (échelle 1/${fr(E)}), deux points sont à ${fr(L)} cm. Quelle est la distance réelle, en ${uLong} ?`,
        `${cap(p.quoi)} est à l’échelle 1/${fr(E)}. On mesure ${fr(L)} cm. Combien de ${uLong} en réalité ?`,
        `Échelle 1/${fr(E)} : sur ${p.quoi}, un chemin mesure ${fr(L)} cm. Quelle est sa longueur réelle, en ${p.u} ?`,
        `Avec ta règle, tu mesures ${fr(L)} cm sur ${p.quoi} (échelle 1/${fr(E)}). Combien cela fait-il en réalité, en ${p.u} ?`,
      ]),
      format: "short" as const,
      expected: attendu(reel, p.u),
      comparator: "number_equal" as const,
      explanation: expl("1 cm sur le plan représente E cm en réalité.", `on multiplie par ${fr(E)}, puis on convertit en ${p.u}.`, `${fr(L)} × ${fr(E)} = ${fr(L * E)} cm = ${fr(reel)} ${p.u}.`, `la distance réelle est ${fr(reel)} ${p.u}.`),
    };
  }
  return {
    text: randomChoice([
      `En réalité, deux points sont à ${fr(reel)} ${p.u}. Sur ${p.quoi} (échelle 1/${fr(E)}), à combien de centimètres sont-ils ?`,
      `${cap(p.quoi)} est à l’échelle 1/${fr(E)}. Une distance réelle de ${fr(reel)} ${p.u} mesure combien de cm sur le plan ?`,
      `Échelle 1/${fr(E)} : quelle longueur, en cm, faut-il tracer sur ${p.quoi} pour ${fr(reel)} ${p.u} réels ?`,
      `Tu dessines ${p.quoi} à l’échelle 1/${fr(E)}. Une longueur réelle de ${fr(reel)} ${p.u} : combien de cm sur ton dessin ?`,
    ]),
    format: "short" as const,
    expected: attendu(L, "cm"),
    comparator: "number_equal" as const,
    explanation: expl("1 cm sur le plan représente E cm en réalité.", `on convertit en cm, puis on divise par ${fr(E)}.`, `${fr(reel)} ${p.u} = ${fr(L * E)} cm ; ${fr(L * E)} ÷ ${fr(E)} = ${fr(L)}.`, `on trace ${fr(L)} cm.`),
  };
}

export function genEchDefi(niveau: 4 | 5) {
  const p = randomChoice(PLANS);
  const E = randomChoice(p.E);
  const L = randomInt(2, 8);
  const reel = enUnite(L * E, p.u);
  if (niveau === 4) return genEchDistance(Math.random() < 0.5 ? "reelle" : "plan", 3);
  return {
    text: randomChoice([
      `Sur ${p.quoi}, ${L} cm représentent ${fr(reel)} ${p.u} en réalité. L’échelle est 1/… ? Donne le nombre manquant.`,
      `${fr(reel)} ${p.u} en vrai mesurent ${L} cm sur ${p.quoi}. Quelle est l’échelle 1/… ? Donne le nombre sous la barre.`,
    ]),
    format: "short" as const,
    expected: attendu(E),
    comparator: "number_equal" as const,
    explanation: expl("à l’échelle 1/E, 1 cm représente E cm.", "on met tout en cm, puis on divise par la longueur du plan.", `${fr(reel)} ${p.u} = ${fr(L * E)} cm ; ${fr(L * E)} ÷ ${L} = ${fr(E)}.`, `l’échelle est 1/${fr(E)}.`),
  };
}

/* =========================================================
   Les gabarits
   ========================================================= */

export function tplCM(niveau: "cm1" | "cm2", notionId: string, microId: string, difficulty: number, rang: number, generate: () => any, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${niveau}_renfort_${microId}_${difficulty}_${rang}`,
    niveau,
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [notionId, "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_FOIS = "Si une grandeur est multipliée (ou divisée) par un nombre, l’autre aussi.";
const H_TAB = "Cherche par quel nombre on multiplie la ligne du haut.";
const H_REC = "Divise chaque nombre du bas par celui du haut : est-ce toujours pareil ?";
const H_UN = "Passe par un : divise pour trouver la valeur d’un seul.";
const H_PCT = "p %, c’est p sur 100.";
const H_ECH = "À l’échelle 1/E, 1 cm sur le plan représente E cm en réalité.";

/** Les gabarits de proportionnalité, pour une classe (mêmes micros en CM1 et CM2, sauf fois plus / fois moins / quatrième). */
export function renfortPropCM(niveau: "cm1" | "cm2"): TutorBankItemV4[] {
  const t = (micro: string, d: number, r: number, g: () => any, h: string) => tplCM(niveau, "proportionnalite", micro, d, r, g, h);
  const commun = [
    t("prop_reconnaitre", 1, 1, () => genReconnaitreCM(1), H_REC),
    t("prop_reconnaitre", 1, 2, () => genReconnaitreCM(1), H_REC),
    t("prop_reconnaitre", 2, 1, () => genReconnaitreCM(2), H_REC),
    t("prop_reconnaitre", 2, 2, () => genReconnaitreCM(2), H_REC),
    t("prop_reconnaitre", 3, 1, () => genReconnaitreCM(3), H_REC),
    t("prop_reconnaitre", 3, 2, () => genReconnaitreCM(3), H_REC),
    t("prop_tableau", 1, 1, () => genTableauCM(1), H_TAB),
    t("prop_tableau", 1, 2, () => genTableauCM(1), H_TAB),
    t("prop_tableau", 2, 1, () => genTableauCM(2), H_TAB),
    t("prop_tableau", 2, 2, () => genTableauCM(2), H_TAB),
    t("prop_tableau", 3, 1, () => genTableauCM(3), H_TAB),
    t("prop_tableau", 3, 2, () => genTableauCM(3), H_TAB),
    t("prop_coefficient", 2, 1, () => genCoeffCM(2), H_UN),
    t("prop_coefficient", 2, 2, () => genCoeffCM(2), H_UN),
    t("prop_coefficient", 3, 1, () => genCoeffCM(3), H_UN),
    t("prop_coefficient", 3, 2, () => genCoeffCM(3), H_UN),
    t("prop_coefficient", 4, 1, () => genCoeffCM(4), H_UN),
    t("prop_coefficient", 4, 2, () => genCoeffCM(4), H_UN),
    t("prop_probleme", 3, 1, () => genProblemeCM(3), H_UN),
    t("prop_probleme", 3, 2, () => genProblemeCM(3), H_UN),
    t("prop_probleme", 4, 1, () => genProblemeCM(4), H_UN),
    t("prop_probleme", 4, 2, () => genProblemeCM(4), H_UN),
    t("prop_defi", 4, 1, () => genProblemeCM(4), H_UN),
    t("prop_defi", 4, 2, () => genOffresCM(), H_UN),
    t("prop_defi", 5, 1, () => genOffresCM(), H_UN),
    t("prop_defi", 5, 2, () => genProblemeCM(4), H_UN),
  ];
  if (niveau === "cm1") {
    return [
      ...commun,
      t("prop_fois_plus", 2, 1, () => genFois(1, 2), H_FOIS),
      t("prop_fois_plus", 2, 2, () => genFois(1, 2), H_FOIS),
      t("prop_fois_plus", 3, 1, () => genFois(1, 3), H_FOIS),
      t("prop_fois_plus", 3, 2, () => genFois(1, 3), H_FOIS),
      t("prop_fois_moins", 2, 1, () => genFois(-1, 2), H_FOIS),
      t("prop_fois_moins", 2, 2, () => genFois(-1, 2), H_FOIS),
      t("prop_fois_moins", 3, 1, () => genFois(-1, 3), H_FOIS),
      t("prop_fois_moins", 3, 2, () => genFois(-1, 3), H_FOIS),
    ];
  }
  return [
    ...commun,
    t("prop_quatrieme", 2, 1, () => genFois(1, 3), H_FOIS),
    t("prop_quatrieme", 3, 1, () => genProblemeCM(3), H_UN),
    t("prop_quatrieme", 3, 2, () => genFois(-1, 3), H_FOIS),
    t("prop_quatrieme", 4, 1, () => genProblemeCM(4), H_UN),
  ];
}

export const renfortPourcentagesCM2: TutorBankItemV4[] = [
  tplCM("cm2", "pourcentage", "pourcentage_comprendre", 1, 1, () => genPctComprendre(1), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_comprendre", 2, 1, () => genPctComprendre(2), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_comprendre", 3, 1, () => genPctComprendre(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 2, 1, () => genPctFracDec(2), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 2, 2, () => genPctFracDec(2), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 3, 1, () => genPctFracDec(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 3, 2, () => genPctFracDec(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 2, 3, () => genPctComprendre(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_fraction_decimal", 3, 3, () => genPctComprendre(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 2, 3, () => genPctProbleme(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 3, 3, () => genPctProbleme(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 2, 1, () => genPctCalculer(2), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 2, 2, () => genPctCalculer(2), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 3, 1, () => genPctCalculer(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_calculer", 3, 2, () => genPctCalculer(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_probleme", 3, 1, () => genPctProbleme(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_probleme", 3, 2, () => genPctCalculer(3), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_probleme", 4, 1, () => genPctProbleme(4), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_probleme", 4, 2, () => genPctProbleme(4), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_defi", 4, 1, () => genPctDefi(4), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_defi", 4, 2, () => genPctDefi(5), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_defi", 5, 1, () => genPctDefi(5), H_PCT),
  tplCM("cm2", "pourcentage", "pourcentage_defi", 5, 2, () => genPctProbleme(4), H_PCT),
];

export const renfortEchellesCM2: TutorBankItemV4[] = [
  tplCM("cm2", "echelle", "echelle_comprendre", 1, 1, () => genEchComprendre(1), H_ECH),
  tplCM("cm2", "echelle", "echelle_comprendre", 2, 1, () => genEchComprendre(2), H_ECH),
  tplCM("cm2", "echelle", "echelle_comprendre", 3, 1, () => genEchComprendre(3), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_reelle", 1, 1, () => genEchDistance("reelle", 1), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_reelle", 2, 1, () => genEchDistance("reelle", 2), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_reelle", 3, 1, () => genEchDistance("reelle", 3), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_plan", 1, 1, () => genEchDistance("plan", 1), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_plan", 2, 1, () => genEchDistance("plan", 2), H_ECH),
  tplCM("cm2", "echelle", "echelle_distance_plan", 3, 1, () => genEchDistance("plan", 3), H_ECH),
  tplCM("cm2", "echelle", "echelle_defi", 4, 1, () => genEchDefi(4), H_ECH),
  tplCM("cm2", "echelle", "echelle_defi", 4, 2, () => genEchDefi(5), H_ECH),
  tplCM("cm2", "echelle", "echelle_defi", 5, 1, () => genEchDefi(5), H_ECH),
  tplCM("cm2", "echelle", "echelle_defi", 5, 2, () => genEchDefi(4), H_ECH),
];
