import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Rempli le 07/10/2026 (voir types.ts). Chaque correcteur RELIT la figure
// (tableau ou diagramme) et la question que voit l'élève, comprend ce qui est
// demandé à partir des mots de la question, et REFAIT le calcul : il ne
// connaît ni le contexte tiré ni la formule du gabarit.

type Q = TutorGeneratedQuestionV4;
const val = (s: string) => Number(String(s).replace(/\s/g, "").replace(",", "."));
/** Le premier nombre d'une réponse (« 12 élèves » → 12). */
const nombre = (s: string) => {
  const m = String(s).match(/\d+(?:[  ]\d{3})*(?:,\d+)?/);
  return m ? val(m[0]) : NaN;
};
/** Les entiers écrits dans un texte. */
const nombresDuTexte = (t: string) => (t.match(/\d+(?:,\d+)?/g) ?? []).map(val);
/** L'unité d'une réponse : ce qui suit le nombre. */
const uniteDe = (s: string) => String(s).replace(/^[\d\s  ,]+/, "").trim();
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Le libellé est-il cité dans le texte, comme mot entier (« mai » n'est pas dans « semaine ») ? */
const motif = (label: string) => new RegExp(`(?<![\\p{L}-])${echapper(label)}(?![\\p{L}-])`, "iu");
const cite = (t: string, label: string) => motif(label).test(t);
/** Où l'étiquette apparaît dans le texte (pour l'ordre « A … que B »). */
const position = (t: string, label: string) => t.search(motif(label));

/** Règle de 6e : pas de barre de division entre deux nombres hors des notions de fractions. */
function reglesEcriture(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""])
    if (/\d\s*\/\s*\d/.test(s)) p.push(`barre de division entre deux nombres : « ${s.slice(0, 60)} »`);
  return p;
}

/** L'unité de la réponse doit être celle dont parle la question. */
function verifierUnite(q: Q): string[] {
  const u = uniteDe(q.expected[0]);
  if (!u) return ["la réponse n'a pas d'unité"];
  const formes = u === "km" ? ["km", "kilomètres"] : [u];
  return formes.some((f) => cite(q.text, f)) ? [] : [`unité « ${u} » absente de la question`];
}

type Serie = { labels: string[]; vals: (number | "?")[] };
function lireSerie(cv: any): Serie | null {
  if (!cv) return null;
  if (cv.kind === "tableau_donnees" && cv.headers?.length === 1)
    return { labels: cv.rows.map((r: any) => String(r.label)), vals: cv.rows.map((r: any) => (r.values[0] === "?" ? "?" : Number(r.values[0]))) };
  if (cv.kind === "stat_graph") return { labels: cv.data.map((d: any) => String(d.label)), vals: cv.data.map((d: any) => Number(d.value)) };
  return null;
}

/** Une phrase du QCM « quelle phrase est vraie ? », relue et évaluée. `null` = phrase illisible. */
function evaluerPhrase(ph: string, s: Serie): boolean | null {
  // Les étiquettes sont écrites sans guillemets : on vérifie que chaque morceau
  // capturé est bien une catégorie de la figure.
  const v = (l: string) => {
    const k = s.labels.indexOf(l);
    if (k < 0) throw new Error(l);
    return s.vals[k] as number;
  };
  const nums = s.vals as number[];
  const t = nums.reduce((a, b) => a + b, 0);
  let m: RegExpMatchArray | null;
  try {
    if ((m = ph.match(/^Il y a (\d+) .+ en tout\.$/))) return Number(m[1]) === t;
    if ((m = ph.match(/^(.+) a (\d+) .+ de plus (?:que |qu’)(.+)\.$/))) return v(m[1]) - v(m[3]) === Number(m[2]);
    if ((m = ph.match(/^(.+) a deux fois plus (?:de |d’).+ (?:que |qu’)(.+)\.$/))) return v(m[1]) === 2 * v(m[2]);
    if ((m = ph.match(/^(.+) a plus (?:de |d’).+ (?:que |qu’)(.+)\.$/))) return v(m[1]) > v(m[2]);
    if ((m = ph.match(/^(.+) a le plus (?:de |d’).+\.$/))) return v(m[1]) === Math.max(...nums);
    if ((m = ph.match(/^(.+) a le moins (?:de |d’).+\.$/))) return v(m[1]) === Math.min(...nums);
    if ((m = ph.match(/^(.+) fait plus de la moitié du total\.$/))) return 2 * v(m[1]) > t;
  } catch {
    return null;
  }
  return null;
}

/** Tableau simple ou diagramme : lecture, total, écart, extrêmes, phrase vraie, part du total. */
export function corrigerSerie(q: Q): string[] {
  const p = reglesEcriture(q);
  const s = lireSerie(q.canvas);
  if (!s) return [...p, "aucun tableau ni diagramme à une série"];
  const t = q.text;
  const connus = s.vals.filter((x): x is number => x !== "?");
  if (connus.some((x) => !Number.isInteger(x) || x < 0 || x > 100)) p.push(`valeur peu plausible : ${connus.join(", ")}`);
  if (new Set(s.labels).size !== s.labels.length) p.push("deux catégories portent le même nom");
  const cites = s.labels.filter((l) => cite(t, l));

  if (q.format === "qcm") {
    const choix = q.choices ?? [];
    const att = q.expected[0];
    if (/phrase est vraie|affirmation est juste|dit vrai|conclusions est correcte/.test(t)) {
      for (const c of choix) {
        const ok = evaluerPhrase(c, s);
        if (ok === null) p.push(`phrase illisible pour le correcteur : « ${c} »`);
        else if (ok !== (c === att)) p.push(`« ${c} » est ${ok ? "vraie" : "fausse"}, attendue ${c === att ? "vraie" : "fausse"}`);
      }
      return p;
    }
    if (choix.some((c) => !s.labels.includes(c))) p.push("une proposition n'est pas une catégorie de la figure");
    let bons: string[];
    if (/moitié|quart/.test(t)) {
      const div = /quart/.test(t) ? 4 : 2;
      const tot = connus.reduce((a, b) => a + b, 0);
      bons = s.labels.filter((_, k) => (s.vals[k] as number) * div === tot);
    } else if (/plus grande? |en tête/.test(t)) bons = s.labels.filter((_, k) => s.vals[k] === Math.max(...connus));
    else if (/plus petite? |en dernier/.test(t)) bons = s.labels.filter((_, k) => s.vals[k] === Math.min(...connus));
    else {
      const N = nombresDuTexte(t).pop();
      bons = s.labels.filter((_, k) => s.vals[k] === N);
    }
    if (bons.length !== 1) return [...p, `${bons.length} catégories conviennent (${bons.join(", ")})`];
    if (att !== bons[0]) p.push(`réponse attendue « ${att} », recalculée « ${bons[0]} »`);
    return p;
  }

  p.push(...verifierUnite(q));
  const att = nombre(q.expected[0]);
  const v = (l: string) => s.vals[s.labels.indexOf(l)] as number;
  let juste: number;
  if (s.vals.includes("?")) {
    // Une case effacée : total lu dans le texte, moins les cases connues.
    const k = s.vals.indexOf("?");
    if (!cite(t, s.labels[k])) p.push("la case effacée n'est pas celle que nomme la question");
    const total = nombresDuTexte(t)[0];
    juste = total - connus.reduce((a, b) => a + b, 0);
    if (juste < 0) p.push("total plus petit que les cases connues");
  } else if (/plus grande? .+ et (?:le|la) plus petite? /.test(t)) {
    juste = Math.max(...connus) - Math.min(...connus);
  } else if (/de plus|séparent|écart/.test(t)) {
    if (cites.length !== 2) return [...p, `il faut deux catégories citées, lu : ${cites.join(", ")}`];
    // L'ordre de lecture dans la question : « de plus pour A que pour B ».
    const [A, B] = [...cites].sort((x, y) => position(t, x) - position(t, y));
    juste = Math.abs(v(A) - v(B));
    if (/de plus/.test(t) && v(A) < v(B)) p.push(`« ${A} » n'a pas plus que « ${B} »`);
  } else if (/réunis|Additionne les|Ensemble/.test(t)) {
    if (cites.length !== 2) return [...p, `il faut deux catégories citées, lu : ${cites.join(", ")}`];
    juste = v(cites[0]) + v(cites[1]);
  } else if (/en tout|au total|nombre total/.test(t)) {
    juste = connus.reduce((a, b) => a + b, 0);
  } else {
    if (cites.length !== 1) return [...p, `il faut une seule catégorie citée, lu : ${cites.join(", ") || "aucune"}`];
    juste = v(cites[0]);
  }
  if (att !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

/** Tableau à double entrée : une case, une case à l'envers, un total de ligne ou de colonne. */
export function corrigerDouble(q: Q): string[] {
  const p = reglesEcriture(q);
  const cv: any = q.canvas;
  if (!cv || cv.kind !== "tableau_donnees" || (cv.headers?.length ?? 0) < 2) return [...p, "pas de tableau à double entrée"];
  const cols: string[] = cv.headers.map(String);
  const lignes: string[] = cv.rows.map((r: any) => String(r.label));
  const M: number[][] = cv.rows.map((r: any) => r.values.map(Number));
  if (M.some((l) => l.length !== cols.length)) p.push("une ligne n'a pas autant de cases que de colonnes");
  if (M.flat().some((x) => !Number.isInteger(x) || x < 0 || x > 100)) p.push("valeur peu plausible");
  const t = q.text;
  const cl = lignes.filter((l) => cite(t, l));
  const cc = cols.filter((c) => cite(t, c));
  if (q.format === "qcm") {
    if (cc.length !== 1) return [...p, `il faut une colonne citée, lu : ${cc.join(", ")}`];
    const j = cols.indexOf(cc[0]);
    const N = nombresDuTexte(t).pop();
    const bons = lignes.filter((_, i) => M[i][j] === N);
    if (bons.length !== 1) return [...p, `${bons.length} lignes portent ${N} dans « ${cc[0]} »`];
    if (q.expected[0] !== bons[0]) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${bons[0]} »`);
    if ((q.choices ?? []).some((c) => !lignes.includes(c))) p.push("une proposition n'est pas une ligne du tableau");
    return p;
  }
  p.push(...verifierUnite(q));
  const att = nombre(q.expected[0]);
  let juste: number;
  if (/en tout/.test(t)) {
    if (cl.length === 1 && cc.length === 0) juste = M[lignes.indexOf(cl[0])].reduce((a, b) => a + b, 0);
    else if (cc.length === 1 && cl.length === 0) juste = M.reduce((a, l) => a + l[cols.indexOf(cc[0])], 0);
    else return [...p, `total illisible : lignes ${cl.join(", ")} ; colonnes ${cc.join(", ")}`];
  } else {
    if (cl.length !== 1 || cc.length !== 1) return [...p, `il faut une ligne et une colonne citées, lu : ${cl.join(", ")} / ${cc.join(", ")}`];
    juste = M[lignes.indexOf(cl[0])][cols.indexOf(cc[0])];
  }
  if (att !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

/** Les deux sortes de figures, selon ce que montre le canvas. */
export function corrigerStat(q: Q): string[] {
  const cv: any = q.canvas;
  return cv?.kind === "tableau_donnees" && (cv.headers?.length ?? 0) >= 2 ? corrigerDouble(q) : corrigerSerie(q);
}

/* ───── Enquêtes ───── */

/** Les trois défauts d'une question d'enquête : vague, qui souffle la réponse, qui ne se compte pas. */
const DEFAUTS_QUESTION = [/^« Que penses-tu /, /, non \? »$/, /un peu .+, ou pas trop \? »$/];
function corrigerQuestionEnquete(q: Q): string[] {
  const p = reglesEcriture(q);
  for (const c of q.choices ?? []) {
    const defaut = DEFAUTS_QUESTION.some((r) => r.test(c));
    if (c === q.expected[0] && defaut) p.push(`la réponse attendue est une question défectueuse : ${c}`);
    if (c !== q.expected[0] && !defaut) p.push(`le leurre ${c} n'a aucun défaut repérable`);
  }
  return p;
}

/** Un groupe qui laisse une chance à chacun de la population visée par la question. */
function representatif(groupe: string, texte: string): boolean {
  if (/du collège/.test(texte)) return /tirés au sort dans toutes les classes/.test(groupe);
  if (/quartier/.test(texte)) return /tirés au sort dans toutes les rues du quartier/.test(groupe);
  if (/de sa classe/.test(texte)) return /^tous les élèves de la classe/.test(groupe);
  return false;
}
function corrigerQuiInterroger(q: Q): string[] {
  const p = reglesEcriture(q);
  const bons = (q.choices ?? []).filter((c) => representatif(c, q.text));
  if (bons.length !== 1) return [...p, `${bons.length} groupes représentatifs parmi les propositions`];
  if (q.expected[0] !== bons[0]) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${bons[0]} »`);
  return p;
}
function corrigerJugerEnquete(q: Q): string[] {
  const p = reglesEcriture(q);
  const m = q.text.match(/interroge (.+?)(?:\. Que peut| Son enquête|\. Son enquête)/);
  if (!m) return [...p, "groupe interrogé illisible"];
  const bien = representatif(m[1], q.text);
  const juste = (q.choices ?? []).find((c) => (bien ? /^l’enquête est bien construite/ : /^le résultat sera faussé/).test(c));
  if (!juste) return [...p, "le bon verdict n'est pas proposé"];
  if (q.expected[0] !== juste) p.push(`verdict attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  return p;
}

function corrigerLignesMesure(q: Q): string[] {
  const p = reglesEcriture(q);
  const n = nombresDuTexte(q.text.replace(/\(°C\)/, ""));
  if (n.length !== 1) return [...p, `un seul nombre attendu dans le texte, lu : ${n.join(", ")}`];
  if (nombre(q.expected[0]) !== n[0]) p.push(`réponse attendue ${q.expected[0]}, recalculée ${n[0]}`);
  if (uniteDe(q.expected[0]) !== "lignes") p.push("l'unité de la réponse doit être « lignes »");
  if (n[0] < 2 || n[0] > 40) p.push("nombre de mesures peu plausible");
  return p;
}

/** 1 unité notée = combien d'unités de la colonne. */
const FACTEURS: Record<string, Record<string, number>> = {
  kg: { g: 1000 }, m: { cm: 100 }, cm: { mm: 10 }, min: { s: 60 }, h: { min: 60 }, L: { cL: 100 },
};
function corrigerConversion(q: Q): string[] {
  const p = reglesEcriture(q);
  const note = q.text.match(/(\d+(?:,\d+)?) (kg|m|cm|min|h|L)(?![\p{L}])/u);
  const cible = q.text.match(/\((g|cm|mm|s|min|cL)\)|est en (g|cm|mm|s|min|cL)\b/);
  if (!note || !cible) return [...p, "mesure ou unité de la colonne illisible"];
  const vers = cible[1] ?? cible[2];
  const f = FACTEURS[note[2]]?.[vers];
  if (!f) return [...p, `conversion ${note[2]} → ${vers} inconnue`];
  const juste = Math.round(val(note[1]) * f * 1000) / 1000;
  if (!Number.isInteger(juste)) p.push(`résultat non entier : ${juste}`);
  if (nombre(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste} ${vers}`);
  if (uniteDe(q.expected[0]) !== vers) p.push(`unité attendue ${vers}`);
  return p;
}
function corrigerComparerMesures(q: Q): string[] {
  const p = reglesEcriture(q);
  const lus = (q.choices ?? []).map((c) => {
    const m = c.match(/^([\d  ]+(?:,\d+)?) (\S+)$/);
    return m ? { v: val(m[1]), u: m[2] } : null;
  });
  if (lus.some((x) => !x)) return [...p, "proposition illisible"];
  const unites = [...new Set(lus.map((x) => x!.u))];
  if (unites.length !== 2) return [...p, `il faut deux unités mélangées, lu : ${unites.join(", ")}`];
  const [a, b] = unites;
  const petite = FACTEURS[a]?.[b] ? b : FACTEURS[b]?.[a] ? a : null;
  if (!petite) return [...p, `unités sans conversion connue : ${a}, ${b}`];
  const grande = petite === a ? b : a;
  const enPetite = lus.map((x) => (x!.u === grande ? x!.v * FACTEURS[grande][petite] : x!.v));
  if (new Set(enPetite).size !== enPetite.length) p.push("deux propositions sont la même mesure");
  const max = /la plus grande/.test(q.text);
  if (max === /la plus petite/.test(q.text)) return [...p, "sens de la comparaison illisible"];
  const cible = max ? Math.max(...enPetite) : Math.min(...enPetite);
  const juste = q.choices![enPetite.indexOf(cible)];
  if (q.expected[0] !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

/** La liste brute des réponses, écrite dans le texte : « …: bus, vélo, bus, marche. » */
function listeDuTexte(t: string): string[] | null {
  const m = t.match(/: ((?:[\p{L}]+, )+[\p{L}]+)\./u);
  return m ? m[1].split(", ") : null;
}
function corrigerCompterBrut(q: Q): string[] {
  const p = reglesEcriture(q);
  const L = listeDuTexte(q.text);
  // La réponse cherchée est le mot de la liste écrit dans la dernière phrase.
  const fin = q.text.slice(q.text.lastIndexOf(". ") + 2);
  const cibles = L ? [...new Set(L)].filter((x) => cite(fin, x)) : [];
  if (!L || cibles.length !== 1) return [...p, `liste ou réponse cherchée illisible (${cibles.join(", ")})`];
  const juste = L.filter((x) => x === cibles[0]).length;
  if (juste === 0) p.push("la réponse cherchée n'est pas dans la liste");
  const n = nombresDuTexte(q.text)[0];
  if (n !== undefined && n !== L.length) p.push(`le texte annonce ${n} élèves, la liste en a ${L.length}`);
  if (nombre(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}
function corrigerLignesEffectifs(q: Q): string[] {
  const p = reglesEcriture(q);
  const L = listeDuTexte(q.text);
  if (!L) return [...p, "liste illisible"];
  const juste = new Set(L).size;
  if (nombre(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  const n = nombresDuTexte(q.text)[0];
  if (n !== undefined && n !== L.length) p.push(`le texte annonce ${n} élèves, la liste en a ${L.length}`);
  return p;
}
function corrigerControleSomme(q: Q): string[] {
  const p = reglesEcriture(q);
  const N = Number(q.text.match(/interrogé (\d+)/)?.[1]);
  const tab = q.text.match(/donne : ([^.]+)\./)?.[1];
  if (!N || !tab) return [...p, "nombre d'élèves ou tableau illisible"];
  const s = nombresDuTexte(tab).reduce((a, b) => a + b, 0);
  const manque = /manquent/.test(q.text);
  const juste = manque ? N - s : s - N;
  if (juste <= 0) p.push(`le sens de la question ne colle pas : ${s} réponses comptées pour ${N} élèves`);
  if (nombre(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  // stat_enquete_planifier
  stat_enquete_planifier_tpl_e2: corrigerQuestionEnquete,
  stat_enquete_planifier_tpl_1: corrigerQuiInterroger,
  stat_enquete_planifier_tpl_ouverte: corrigerJugerEnquete,
  // stat_enquete_mesurer
  stat_enquete_mesurer_tpl_e2: corrigerLignesMesure,
  stat_enquete_mesurer_tpl_1: corrigerConversion,
  stat_enquete_mesurer_tpl_ouverte: corrigerComparerMesures,
  // stat_construire_tableau
  stat_construire_tableau_tpl_1: (q) => (q.canvas ? corrigerStat(q) : corrigerCompterBrut(q)),
  stat_construire_tableau_tpl_ouverte: (q) => (/manquent|en trop/.test(q.text) ? corrigerControleSomme(q) : corrigerLignesEffectifs(q)),
  // stat_donnee_lire_tableau
  "6e_stat_lire_tableau_tpl_e1": corrigerStat,
  "6e_stat_stat_stat_donnee_lire_tableau_tpl_1": corrigerStat,
  "6e_stat_stat_stat_donnee_lire_tableau_tpl_2_total_colonne": corrigerStat,
  "6e_stat_lire_tableau_tpl_e4": corrigerStat,
  // stat_donnee_lire_graphique
  "6e_stat_lire_graphique_tpl_e1": corrigerStat,
  "6e_stat_stat_stat_donnee_lire_graphique_tpl_1": corrigerStat,
  "6e_stat_stat_stat_donnee_lire_graphique_tpl_2_plus_petit": corrigerStat,
  "6e_stat_lire_graphique_tpl_e4": corrigerStat,
  // stat_donnee_prelever
  "6e_stat_stat_stat_donnee_prelever_tpl_2_cellule_surlignee": corrigerStat,
  "6e_stat_stat_stat_donnee_prelever_tpl_1": corrigerStat,
  "6e_stat_prelever_tpl_e4": corrigerStat,
  // stat_donnee_comparer
  "6e_stat_comparer_tpl_e1": corrigerStat,
  "6e_stat_comparer_tpl_e2": corrigerStat,
  "6e_stat_stat_stat_donnee_comparer_tpl_1": corrigerStat,
  "6e_stat_stat_stat_donnee_comparer_tpl_2_difference": corrigerStat,
  "6e_stat_stat_stat_donnee_comparer_tpl_3_ecart_graphique": corrigerStat,
  // stat_donnee_interpreter
  "6e_stat_interpreter_tpl_e2": corrigerStat,
  "6e_stat_interpreter_tpl_e3": corrigerStat,
  "6e_stat_stat_stat_donnee_interpreter_tpl_1": corrigerStat,
  "6e_stat_interpreter_tpl_e5": corrigerStat,
  // stat_donnee_defi
  "6e_stat_defi_tpl_e3": corrigerStat,
  "6e_stat_defi_tpl_e4": corrigerStat,
  "6e_stat_stat_donnee_defi_tpl_1": corrigerStat,
  "6e_stat_stat_donnee_defi_tpl_2_double_entree_total_ligne": corrigerStat,
  "6e_stat_stat_donnee_defi_tpl_3_deux_variables_total_colonne": corrigerStat,
  // stat_donnee_lire_circulaire
  "6e_stat_stat_donnee_lire_circulaire_tpl_1_lire_secteur": corrigerStat,
  "6e_stat_stat_donnee_lire_circulaire_tpl_2_plus_grand": corrigerStat,
  "6e_stat_stat_donnee_lire_circulaire_tpl_3_total": corrigerStat,
  "6e_stat_stat_donnee_lire_circulaire_tpl_4_difference": corrigerStat,
};
