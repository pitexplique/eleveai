import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { lireExperience, compter, lireContenu } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/probabilites";

// Rempli le 09/10/2026 (voir types.ts). Chaque correcteur RELIT le texte que
// voit l'élève : le contenu du sac (« 3 billes rouges et 5 billes bleues »),
// les issues numérotées (« numérotées de 1 à 12 »), la roue (« 2 secteurs
// rouges »), l'événement entre guillemets. Il RECOMPTE les issues avec le
// lecteur de la 6e (correcteurs 6e/probabilites.ts : lireExperience, compter),
// refait le raisonnement (mot juste, fraction, contraire, comparaison) et
// compare à la réponse attendue et aux leurres. Le dessin (sac, roue, dé) doit
// dire la même chose que le texte.

type Q = TutorGeneratedQuestionV4;
type Exp = NonNullable<ReturnType<typeof lireExperience>>;

/* ─────────────────────────── lecture ─────────────────────────── */

const val = (s: string) => Number(String(s).replace(/[\s  ]/g, "").replace("−", "-").replace(",", "."));
/** « 3/8 », « 0,375 », « −0,2 », « 2 » → nombre. */
function valeur(s0: string): number {
  const s = s0.trim().replace("−", "-");
  let m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  m = s.match(/^-?\d+(?:,\d+)?$/);
  if (m) return val(s);
  return NaN;
}
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-9;
const guillemets = (t: string) => [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);
const horsGuillemets = (t: string) => t.replace(/«[^»]*»/g, "«»");

/** Les issues équiprobables de l'expérience (comme le lecteur de la 6e). */
function issues(e: Exp): (number | string)[] {
  if (e.kind === "num") return Array.from({ length: e.b - e.a + 1 }, (_, i) => e.a + i);
  if (e.kind === "piece") return ["pile", "face"];
  return [...e.contenu].flatMap(([c, k]) => Array.from({ length: k }, () => c));
}

/** Le dessin dit-il la même chose que le texte ? */
function verifierCanvas(q: Q, e: Exp | null): string[] {
  const cv: any = q.canvas;
  if (!cv || !e) return [];
  const p: string[] = [];
  const compte = (xs: { couleur?: string; poids?: number }[], poids: boolean) => {
    const m = new Map<string, number>();
    for (const x of xs) m.set(String(x.couleur), (m.get(String(x.couleur)) ?? 0) + (poids ? (x.poids ?? 1) : 1));
    return [...m].sort().join(";");
  };
  if (cv.variant === "billes") {
    if (e.kind !== "urne") return ["sac dessiné pour une expérience qui n’est pas un tirage de couleurs"];
    if (compte(cv.billes?.elements ?? [], false) !== [...e.contenu].sort().join(";")) p.push("le sac dessiné ne montre pas le contenu du texte");
  }
  if (cv.variant === "de" && (e.kind !== "num" || e.a !== 1 || e.b !== 6)) p.push("dé à 6 faces dessiné pour une autre expérience");
  if (cv.variant === "roue") {
    const segs = cv.roue?.segments ?? [];
    if (e.kind === "num") {
      if (segs.length !== e.b - e.a + 1 || segs.some((s: any) => s.poids !== segs[0].poids)) p.push("la roue dessinée n’a pas les secteurs égaux du texte");
    } else if (e.kind === "urne") {
      if (segs.some((s: any) => s.poids !== 1) || compte(segs, true) !== [...e.contenu].sort().join(";")) p.push("la roue dessinée ne montre pas les secteurs du texte");
    } else p.push("roue dessinée pour une pièce");
  }
  return p;
}

/** Plausibilité : effectifs d'un sac, nombre d'issues. */
function plausible(e: Exp | null): string[] {
  if (!e) return [];
  if (e.kind === "urne") {
    const t = [...e.contenu.values()].reduce((a, b) => a + b, 0);
    if (t > 30 || [...e.contenu.values()].some((k) => k < 1)) return [`contenu peu plausible (${t} objets)`];
  }
  if (e.kind === "num" && (e.a !== 1 || e.b < 2 || e.b > 60)) return [`issues numérotées de ${e.a} à ${e.b} : peu plausible`];
  return [];
}

/** En QCM : exactement une proposition juste (recalculée), et c'est l'attendue. */
function uneSeule(q: Q, juste: (ch: string) => boolean): string[] {
  const js = (q.choices ?? []).filter((ch) => juste(ch.trim()));
  if (js.length !== 1) return [`${js.length} propositions justes : ${js.join(" | ")}`];
  if (js[0] !== q.expected[0]) return [`attendu « ${q.expected[0]} », la proposition juste est « ${js[0]} »`];
  return [];
}

/** L'expérience, l'unique événement entre guillemets, et son compte. */
function lireUn(q: Q): { e: Exp; fav: number; tot: number; lib: string; p: string[] } | string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const evs = guillemets(q.text);
  if (evs.length !== 1) return [`un seul événement attendu entre guillemets (${evs.length})`];
  const c = compter(evs[0], e);
  if (!c) return [`événement illisible : « ${evs[0]} »`];
  return { e, fav: c.fav, tot: c.tot, lib: evs[0], p: [...plausible(e), ...verifierCanvas(q, e)] };
}

/* ─────────────────────────── proba_vocabulaire ───────────────────────────── */

/** Une expérience aléatoire se reconnaît au hasard qu'elle nomme. */
const ALEA = /hasard|au sort|lancer un dé|lancer une pièce|faire tourner une roue/;

function corrigerAlea(q: Q): string[] {
  const pas = /PAS|qu’on peut prévoir/.test(q.text);
  if (q.canvas) return ["dessin inattendu"];
  return uneSeule(q, (ch) => ALEA.test(ch) !== pas);
}

function corrigerIssuePossible(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const pas = /PAS|n’est pas une issue/.test(q.text);
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const possible = (ch: string): boolean | null => {
    if (e.kind === "num") {
      const m = ch.match(/^le (?:nombre|numéro) (\d+)$/);
      return m ? Number(m[1]) >= e.a && Number(m[1]) <= e.b : null;
    }
    if (e.kind === "urne") {
      const c = lireContenu(`1 ${ch.replace(/^une? /, "")}`);
      return c.size === 1 ? e.contenu.has([...c.keys()][0]) : null;
    }
    return null;
  };
  for (const ch of q.choices ?? []) if (possible(ch) === null) p.push(`proposition illisible : « ${ch} »`);
  p.push(...uneSeule(q, (ch) => possible(ch) === !pas));
  return p;
}

/** La probabilité 0 ou 1 d'un événement impossible ou certain. */
function corriger01(q: Q): string[] {
  const l = lireUn(q);
  if (Array.isArray(l)) return l;
  const p = l.p;
  if (l.fav !== 0 && l.fav !== l.tot) p.push(`événement ni impossible ni certain (${l.fav} sur ${l.tot})`);
  if (!egal(val(q.expected[0]), l.fav / l.tot)) p.push(`attendu ${q.expected[0]}, recalculé ${l.fav}/${l.tot}`);
  return p;
}

/** Impossible, certain, ou entre les deux. */
function corrigerCategorie(q: Q): string[] {
  const l = lireUn(q);
  if (Array.isArray(l)) return l;
  const cat = l.fav === 0 ? "impossible" : l.fav === l.tot ? "certain" : "entre";
  return [...l.p, ...uneSeule(q, (ch) => (ch === "impossible" || ch === "certain" ? ch === cat : cat === "entre"))];
}

/** Une seule issue, plusieurs, ou aucune. */
function corrigerDescription(q: Q): string[] {
  const l = lireUn(q);
  if (Array.isArray(l)) return l;
  const sens = (ch: string) =>
    /aucune issue/.test(ch) ? l.fav === 0 : /une seule issue/.test(ch) ? l.fav === 1 : /plusieurs issues/.test(ch) ? l.fav >= 2 : false;
  return [...l.p, ...uneSeule(q, sens)];
}

/** Quel nombre peut (ne peut pas) être une probabilité ? */
function corrigerBornes(q: Q): string[] {
  const p: string[] = [];
  const pas = /ne peut pas|fausse|erreur/.test(q.text);
  for (const ch of q.choices ?? []) if (Number.isNaN(valeur(ch))) p.push(`proposition illisible : « ${ch} »`);
  p.push(...uneSeule(q, (ch) => (valeur(ch) >= 0 && valeur(ch) <= 1) !== pas));
  return p;
}

/** Une couleur accordée (« rouges », « bleue », « blanches »), comme le lecteur de la 6e. */
const RE_COUL = "(rouge|bleu|vert|jaune|violet|orange|rose|noir|blanc)(?:te|he|e)?s?(?![\\p{L}])";

/* ─────────────── proba_issue, proba_calculer, proba_equiprobabilite, proba_defi (13/10/2026) ─────────────── */

/** Combien d'issues possibles : on recompte l'expérience lue. */
function corrigerNbIssues(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const n = issues(e).length;
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  if (!egal(val(q.expected[0]), n)) p.push(`attendu ${q.expected[0]}, recompté ${n} issues`);
  return p;
}

/** Combien d'issues favorables à l'événement entre guillemets. */
function corrigerNbFavorables(q: Q): string[] {
  const l = lireUn(q);
  if (Array.isArray(l)) return l;
  if (!egal(val(q.expected[0]), l.fav)) l.p.push(`attendu ${q.expected[0]}, recompté ${l.fav} issues favorables`);
  return l.p;
}

/** La probabilité de l'événement entre guillemets (réponse courte ou QCM de valeurs distinctes). */
function corrigerProbabilite(q: Q): string[] {
  const l = lireUn(q);
  if (Array.isArray(l)) return l;
  const juste = l.fav / l.tot;
  const p = l.p;
  if (l.fav === 0 || l.fav === l.tot) p.push(`événement ${l.fav === 0 ? "impossible" : "certain"} : pas un défi de calcul`);
  // « X affirme que la probabilité est 2/6 » : l'affirmation doit être fausse
  const af = q.text.match(/affirme que la probabilité de «[^»]*» est (\d+\/\d+|\d+)\./);
  if (af && egal(valeur(af[1]), juste)) p.push(`l’affirmation ${af[1]} est juste : ce n’est pas une erreur`);
  if (q.format === "qcm") {
    for (const ch of q.choices ?? []) if (Number.isNaN(valeur(ch))) p.push(`proposition illisible « ${ch} »`);
    p.push(...uneSeule(q, (ch) => egal(valeur(ch), juste)));
  } else {
    if (!egal(valeur(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, recalculé ${l.fav}/${l.tot}`);
    if (q.comparator !== "fraction_decimal_equivalent") p.push(`comparateur ${q.comparator}`);
  }
  return p;
}

/** Équiprobabilité : probabilité de chaque issue, deux événements comparés. */
function corrigerEquiprobabilite(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const evs = guillemets(q.text);
  if (!evs.length) {
    // la probabilité de chaque issue (issues numérotées)
    if (e.kind !== "num") return [...p, "issues numérotées attendues"];
    const n = issues(e).length;
    const m = q.text.match(/obtenir le (?:nombre|numéro) (\d+) \?/);
    if (m && (Number(m[1]) < 1 || Number(m[1]) > n)) p.push(`le ${m[1]} n’est pas une issue`);
    if (!egal(valeur(q.expected[0]), 1 / n)) p.push(`attendu ${q.expected[0]}, il faut 1/${n}`);
    return p;
  }
  if (evs.length !== 2) return [...p, `deux événements attendus (${evs.length})`];
  const c = evs.map((x) => compter(x, e));
  if (c.some((x) => !x)) return [...p, "événement illisible"];
  const [f1, f2] = c.map((x) => x!.fav);
  const ch = q.choices ?? [];
  if (ch.includes("oui")) {
    if (q.expected[0] !== (f1 === f2 ? "oui" : "non")) p.push(`attendu « ${q.expected[0]} » : ${f1} contre ${f2}`);
    return p;
  }
  // le plus probable
  const juste = f1 === f2 ? "les deux ont la même probabilité" : `« ${f1 > f2 ? evs[0] : evs[1]} »`;
  p.push(...uneSeule(q, (x) => x === juste));
  return p;
}

/** Deux sacs A et B : dans lequel la couleur demandée est la plus probable ? */
function corrigerDeuxSacs(q: Q): string[] {
  const A = q.text.match(/sac A contient ([^.]+)\./)?.[1], B = q.text.match(/sac B contient ([^.]+)\./)?.[1];
  const coul = q.text.match(new RegExp(`le plus de chances de tirer (?:un|une) \\S+ ${RE_COUL}`, "u"))?.[1];
  if (!A || !B || !coul) return ["sacs ou couleur illisibles"];
  const [cA, cB] = [lireContenu(A), lireContenu(B)];
  const pr = (c: Map<string, number>) => (c.get(coul) ?? 0) / [...c.values()].reduce((x, y) => x + y, 0);
  const [pA, pB] = [pr(cA), pr(cB)];
  const juste = egal(pA, pB) ? "autant dans les deux sacs" : pA > pB ? "dans le sac A" : "dans le sac B";
  return uneSeule(q, (x) => x === juste);
}

/** « 3 billes rouges et des billes bleues ; la probabilité de tirer une rouge est 1/4 » : combien de bleues ? */
function corrigerContenuRetrouve(q: Q): string[] {
  const a = q.text.match(new RegExp(`(\\d+) \\S+ ${RE_COUL} et des`, "u"));
  const pr = q.text.match(/est (\d+)\/(\d+)\. Combien/);
  if (!a || !pr) return ["données illisibles"];
  const tot = (Number(a[1]) * Number(pr[2])) / Number(pr[1]);
  if (!Number.isInteger(tot)) return [`total non entier (${tot})`];
  const p: string[] = [];
  if (tot - Number(a[1]) < 1) p.push("aucun objet de l’autre couleur");
  if (!egal(val(q.expected[0]), tot - Number(a[1]))) p.push(`attendu ${q.expected[0]}, il faut ${tot - Number(a[1])}`);
  return p;
}

function corrigerDefi(q: Q): string[] {
  if (/sac A contient/.test(q.text)) return corrigerDeuxSacs(q);
  if (/et des \S+ \S+\. La probabilité/.test(q.text)) return corrigerContenuRetrouve(q);
  return corrigerProbabilite(q);
}

export const CORRECTEURS: CorrecteursMaths = {
  proba_issue_tpl_1: corrigerNbIssues,
  proba_issue_tpl_2: corrigerNbFavorables,
  proba_calculer_tpl_1: corrigerProbabilite,
  proba_calculer_tpl_2: corrigerProbabilite,
  proba_calculer_tpl_x1: corrigerProbabilite,
  proba_calculer_tpl_s2: corrigerProbabilite,
  proba_equiprobabilite_tpl_1: corrigerEquiprobabilite,
  proba_equiprobabilite_tpl_2: corrigerEquiprobabilite,
  proba_equiprobabilite_tpl_s2: corrigerEquiprobabilite,
  proba_defi_tpl_1: corrigerDefi,
  proba_defi_open_tpl_1: corrigerDefi,
  proba_defi_tpl_x1: corrigerDefi,
  proba_defi_tpl_s4: corrigerDefi,
  // proba_vocabulaire
  proba_vocabulaire_tpl_alea: corrigerAlea,
  proba_vocabulaire_tpl_issue_possible: corrigerIssuePossible,
  proba_vocabulaire_tpl_01: corriger01,
  proba_vocabulaire_tpl_impcert: corrigerCategorie,
  proba_vocabulaire_tpl_1: corrigerDescription,
  proba_vocabulaire_tpl_2: corrigerCategorie,
  proba_vocabulaire_tpl_bornes: corrigerBornes,
};
