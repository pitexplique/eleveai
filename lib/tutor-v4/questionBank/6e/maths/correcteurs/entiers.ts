import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Rempli par la réparation du 06/10/2026 (voir types.ts).
// Chaque correcteur RELIT les nombres du texte (et des propositions) que voit
// l'élève, refait le raisonnement, et compare à la réponse attendue.

/** Les entiers écrits dans un texte, espaces des milliers compris (« 4 506 »). */
export function nombresDuTexte(t: string): number[] {
  return (t.match(/\d{1,3}(?:[  ]\d{3})+(?!\d)|\d+/g) ?? []).map((s) => Number(s.replace(/\s/g, "")));
}
const val = (s: string) => Number(String(s).replace(/\s/g, "").replace(",", "."));

/** Règles de 6e communes : pas de barre de division entre deux nombres (« 12/4 »). */
export function reglesEcriture(q: TutorGeneratedQuestionV4): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""])
    if (/\d\s*\/\s*\d/.test(s)) p.push(`barre de division entre deux nombres : « ${s.slice(0, 60)} »`);
  return p;
}

/** Comparer deux nombres : plus grand / plus petit, ou signe < > en QCM. */
function corrigerComparerDeux(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const n = nombresDuTexte(q.text);
  if (q.format === "qcm") {
    const [a, b] = n.slice(-2);
    if (n.length < 2) return [...p, "moins de deux nombres dans le texte"];
    if (a === b) p.push("les deux nombres sont égaux");
    const juste = a < b ? "<" : ">";
    if (q.expected[0] !== juste) p.push(`signe attendu ${q.expected[0]}, recalculé ${juste} (${a} ? ${b})`);
    if (!(q.choices ?? []).includes(juste)) p.push("le bon signe n'est pas proposé");
    return p;
  }
  if (n.length !== 2) return [...p, `il faut exactement deux nombres dans le texte, lu : ${n.join(", ")}`];
  const [a, b] = n;
  if (a === b) p.push("les deux nombres sont égaux");
  const grand = /plus grand/.test(q.text);
  const petit = /plus petit/.test(q.text);
  if (grand === petit) return [...p, "la question ne dit pas clairement « plus grand » ou « plus petit »"];
  const juste = grand ? Math.max(a, b) : Math.min(a, b);
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  if (Math.min(a, b) < 1 || Math.max(a, b) > 20000) p.push("nombres peu plausibles");
  return p;
}

/** Quatre personnes, quatre nombres : la proposition attendue est le max (ou le min). */
function corrigerComparerQuatre(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const c = (q.choices ?? []).map(val);
  if (c.length !== 4) p.push("il faut quatre propositions");
  const lus = nombresDuTexte(q.text);
  if ([...lus].sort((x, y) => x - y).join() !== [...c].sort((x, y) => x - y).join())
    p.push(`les propositions (${c.join(", ")}) ne sont pas les nombres du texte (${lus.join(", ")})`);
  if (new Set(c).size !== c.length) p.push("deux nombres égaux");
  const grand = /plus grand/.test(q.text);
  const petit = /plus petit/.test(q.text);
  if (grand === petit) return [...p, "sens de la question illisible"];
  const juste = grand ? Math.max(...c) : Math.min(...c);
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

const RANGS = ["unités", "dizaines", "centaines", "unités de mille", "dizaines de mille", "centaines de mille"];
const RE_RANG = /chiffre des (unités de mille|dizaines de mille|centaines de mille|milliers|unités|dizaines|centaines)/;

/** Chiffre d'un rang, ou rang d'un chiffre : relu dans le nombre du texte. */
function corrigerRang(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  // Le nombre peut être écrit deux fois (situation puis question) : on ne garde
  // chaque valeur qu'une fois, dans l'ordre de lecture.
  const n = [...new Set(nombresDuTexte(q.text))];
  if (!n.length) return [...p, "aucun nombre dans le texte"];
  const N = n[0];
  const chiffres = String(N).split("").reverse();
  if (RANGS.includes(q.expected[0])) {
    // « À quel rang est le chiffre d ? »
    if (n.length !== 2) return [...p, `il faut le nombre puis le chiffre, lu : ${n.join(", ")}`];
    const d = String(n[1]);
    const pos = chiffres.map((c, i) => (c === d ? i : -1)).filter((i) => i >= 0);
    if (pos.length !== 1) return [...p, `le chiffre ${d} apparaît ${pos.length} fois dans ${N}`];
    if (q.expected[0] !== RANGS[pos[0]]) p.push(`rang attendu ${q.expected[0]}, recalculé ${RANGS[pos[0]]}`);
    for (const c of q.choices ?? []) if (!RANGS.includes(c)) p.push(`proposition qui n'est pas un rang : ${c}`);
    return p;
  }
  if (n.length !== 1) p.push(`il faut un seul nombre dans le texte, lu : ${n.join(", ")}`);
  const m = q.text.match(RE_RANG);
  if (!m) return [...p, "rang demandé illisible"];
  const i = m[1] === "milliers" ? 3 : RANGS.indexOf(m[1]);
  if (i >= chiffres.length) return [...p, `${N} n'a pas de chiffre des ${m[1]}`];
  if (q.expected[0] !== chiffres[i]) p.push(`chiffre attendu ${q.expected[0]}, recalculé ${chiffres[i]}`);
  return p;
}

/** Valeur d'une écriture « 3 × 1 000 + 40 + 5 » (sans parenthèses). */
export function valeurSomme(e: string): number {
  return e.split("+").reduce((acc, terme) => acc + terme.split("×").reduce((pr, f) => pr * val(f.trim()), 1), 0);
}

/** Décomposer / recomposer : refait la somme, la valeur du chiffre, le nombre de centaines… */
function corrigerDecomposer(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const t = q.text;
  const attendu = val(q.expected[0]);
  if (q.format === "qcm") {
    const n = [...new Set(nombresDuTexte(t))];
    if (n.length !== 1) return [...p, `il faut un seul nombre dans le texte, lu : ${n.join(", ")}`];
    const justes = (q.choices ?? []).filter((c) => valeurSomme(c) === n[0]);
    if (justes.length !== 1) p.push(`${justes.length} propositions valent ${n[0]} : ${justes.join(" | ")}`);
    if (valeurSomme(q.expected[0]) !== n[0]) p.push(`la réponse attendue vaut ${valeurSomme(q.expected[0])}, pas ${n[0]}`);
    for (const c of q.choices ?? []) if (/\d,\d|\d\.\d/.test(c)) p.push(`leurre non entier : ${c}`);
    return p;
  }
  const ligne = t.split("\n").pop() ?? "";
  if (ligne.includes("=") && ligne.includes("…")) {
    const [gauche, droite] = ligne.split("=");
    const N = nombresDuTexte(gauche).pop()!;
    const connus = droite.split("+").map((x) => x.trim()).filter((x) => x !== "…").map(val);
    const juste = N - connus.reduce((a, b) => a + b, 0);
    if (juste <= 0) p.push("le nombre qui manque n'est pas positif");
    if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
    // Le terme manquant doit être un chiffre suivi de zéros (une vraie décomposition).
    if (!/^[1-9]0*$/.test(String(juste))) p.push(`le terme manquant ${juste} n'est pas un rang`);
    return p;
  }
  if (/valeur du chiffre|vaut le chiffre/.test(t)) {
    const n = [...new Set(nombresDuTexte(t))];
    const N = Math.max(...n);
    const d = Math.min(...n);
    const ch = String(N).split("").reverse();
    const pos = ch.map((c, i) => (c === String(d) ? i : -1)).filter((i) => i >= 0);
    if (pos.length !== 1) return [...p, `le chiffre ${d} apparaît ${pos.length} fois dans ${N}`];
    const juste = d * 10 ** pos[0];
    if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
    return p;
  }
  const enTout = t.match(/de (dizaines|centaines|milliers) en tout dans/);
  if (enTout) {
    const N = Math.max(...nombresDuTexte(t));
    const juste = Math.floor(N / { dizaines: 10, centaines: 100, milliers: 1000 }[enTout[1] as "dizaines"]);
    if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
    return p;
  }
  // Recomposer : la somme de tous les nombres écrits.
  const n = nombresDuTexte(t);
  if (n.length < 2) return [...p, "pas de somme à recomposer"];
  for (const x of n) if (!/^[1-9]0*$/.test(String(x))) p.push(`le terme ${x} n'est pas un rang`);
  const juste = n.reduce((a, b) => a + b, 0);
  if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
  return p;
}

/** Encadrer / arrondir : unité lue dans le texte (dizaine, centaine, millier). */
function corrigerEncadrer(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const t = q.text;
  const m = t.match(/(dizaine|centaine|millier)/);
  if (!m) return [...p, "unité d'encadrement illisible"];
  const U = { dizaine: 10, centaine: 100, millier: 1000 }[m[1] as "dizaine"];
  const ligne = t.split("\n").pop() ?? "";
  const attendu = val(q.expected[0]);
  if (q.format === "qcm") {
    const N = [...new Set(nombresDuTexte(t))];
    if (N.length !== 1) return [...p, `il faut un seul nombre, lu : ${N.join(", ")}`];
    const n = N[0];
    const valide = (c: string) => {
      const [a, b] = c.split(" et ").map(val);
      return a % U === 0 && b === a + U && a < n && n < b;
    };
    const justes = (q.choices ?? []).filter(valide);
    if (justes.length !== 1) p.push(`${justes.length} propositions justes : ${justes.join(" | ")}`);
    if (!valide(q.expected[0])) p.push(`la réponse attendue « ${q.expected[0]} » n'encadre pas ${n}`);
    return p;
  }
  if (ligne.includes("<")) {
    // « … < N < b » ou « a < N < … »
    const [g, mil, d] = ligne.split("<").map((x) => x.trim());
    const n = nombresDuTexte(mil)[0];
    const bas = Math.floor(n / U) * U;
    if (n % U === 0) p.push(`${n} est un multiple de ${U}`);
    const juste = g.endsWith("…") ? bas : bas + U;
    const autre = g.endsWith("…") ? val(d) : nombresDuTexte(g).pop()!;
    if (autre !== (g.endsWith("…") ? bas + U : bas)) p.push(`la borne écrite ${autre} est fausse`);
    if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
    return p;
  }
  const N = [...new Set(nombresDuTexte(t))];
  if (N.length !== 1) return [...p, `il faut un seul nombre, lu : ${N.join(", ")}`];
  const n = N[0];
  const bas = Math.floor(n / U) * U;
  let juste: number;
  if (/arrondi/i.test(ligne)) {
    if (n - bas === U / 2) return [...p, "nombre pile au milieu : arrondi ambigu"];
    juste = n - bas < U / 2 ? bas : bas + U;
  } else if (/juste avant/.test(ligne)) juste = bas;
  else if (/juste après/.test(ligne)) juste = bas + U;
  else return [...p, "question illisible"];
  if (n % U === 0) p.push(`${n} est un multiple de ${U}`);
  if (attendu !== juste) p.push(`réponse attendue ${attendu}, recalculée ${juste}`);
  return p;
}

const MOTS_K: Record<string, number> = { trois: 3, quatre: 4, cinq: 5 };
const RE_R = "(unités de mille|dizaines de mille|centaines de mille|unités|dizaines|centaines)";

/** Devinette : reconstruit le nombre à partir des indices « chiffre des … est d » (et « le double de »). */
function corrigerDevinette(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const k = q.text.match(/de (trois|quatre|cinq) chiffres|a (trois|quatre|cinq) chiffres/);
  if (!k) return [...p, "nombre de chiffres illisible"];
  const K = MOTS_K[k[1] ?? k[2]];
  const ch: (number | null)[] = Array(K).fill(null); // ch[rang]
  const doubles: [number, number][] = [];
  for (const m of q.text.matchAll(new RegExp(`chiffre des ${RE_R} est (\\d)\\.`, "g"))) ch[RANGS.indexOf(m[1])] = Number(m[2]);
  for (const m of q.text.matchAll(new RegExp(`chiffre des ${RE_R} est le double de \\w+ chiffre des ${RE_R}`, "g")))
    doubles.push([RANGS.indexOf(m[1]), RANGS.indexOf(m[2])]);
  for (const [r, s] of doubles) {
    if (ch[s] === null) return [...p, "le double cite un chiffre inconnu"];
    ch[r] = 2 * ch[s]!;
  }
  if (ch.some((c) => c === null || c > 9)) return [...p, `indices incomplets ou faux : ${ch.join(",")}`];
  if (ch[K - 1] === 0) p.push("le nombre commencerait par 0");
  const juste = Number([...ch].reverse().join(""));
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  return p;
}

/** Plus grand / plus petit nombre avec des chiffres donnés une seule fois chacun. */
function corrigerFormerNombre(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const d = nombresDuTexte(q.text);
  if (d.some((x) => x > 9)) return [...p, `nombre à plusieurs chiffres dans le texte : ${d.join(", ")}`];
  if (new Set(d).size !== d.length) p.push("un chiffre répété");
  const k = q.text.match(/(trois|quatre|cinq) chiffres/);
  if (!k || MOTS_K[k[1]] !== d.length) p.push(`le texte annonce ${k?.[1]} chiffres mais en donne ${d.length}`);
  const grand = /plus grand/.test(q.text);
  if (grand === /plus petit/.test(q.text)) return [...p, "sens illisible"];
  let juste: number;
  if (grand) juste = Number([...d].sort((a, b) => b - a).join(""));
  else {
    // On essaie toutes les écritures sans 0 en tête et on garde la plus petite.
    let best = Infinity;
    const go = (reste: number[], pref: number[]) => {
      if (!reste.length) {
        if (pref[0] !== 0) best = Math.min(best, Number(pref.join("")));
        return;
      }
      reste.forEach((x, i) => go([...reste.slice(0, i), ...reste.slice(i + 1)], [...pref, x]));
    };
    go(d, []);
    juste = best;
  }
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  if (q.format === "qcm") {
    const justes = (q.choices ?? []).filter((c) => val(c) === juste);
    if (justes.length !== 1) p.push(`${justes.length} propositions justes`);
    const tri = (x: number) => String(x).split("").sort().join("");
    for (const c of q.choices ?? [])
      if (tri(val(c)) !== d.map(String).sort().join("")) p.push(`le leurre ${c} n'utilise pas les mêmes chiffres`);
  }
  return p;
}

/** Complément : la différence entre les deux nombres du texte, cible ronde. */
function corrigerComplement(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const n = nombresDuTexte(q.text);
  if (n.length !== 2) return [...p, `il faut deux nombres, lu : ${n.join(", ")}`];
  const [a, b] = [Math.min(...n), Math.max(...n)];
  if (b % 10 !== 0) p.push(`la cible ${b} n'est pas un nombre rond`);
  if (a === b) p.push("rien ne manque");
  if (val(q.expected[0]) !== b - a) p.push(`réponse attendue ${q.expected[0]}, recalculée ${b - a}`);
  return p;
}

/** Les nombres écrits en lettres (orthographe traditionnelle ou rectifiée). */
export function lettresVersNombre(s: string): number {
  const V: Record<string, number> = {
    zéro: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
    onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, vingts: 20, trente: 30,
    quarante: 40, cinquante: 50, soixante: 60, octante: 80,
  };
  const mots = s.toLowerCase().replace(/quatre-vingts?/g, "octante").split(/[\s-]+/).filter((m) => m && m !== "et");
  let total = 0;
  let courant = 0;
  for (const m of mots) {
    if (m === "cent" || m === "cents") courant = (courant || 1) * 100;
    else if (m === "mille") {
      total += (courant || 1) * 1000;
      courant = 0;
    } else if (m in V) courant += V[m];
    else return NaN;
  }
  return total + courant;
}

function corrigerLireEcrire(q: TutorGeneratedQuestionV4): string[] {
  const p = reglesEcriture(q);
  const m = q.text.match(/«\s*(.+?)\s*»/) ?? q.text.match(/:\s*(.+)$/);
  if (!m) return [...p, "nombre en lettres introuvable"];
  const juste = lettresVersNombre(m[1]);
  if (Number.isNaN(juste)) return [...p, `mot inconnu dans « ${m[1]} »`];
  if (val(q.expected[0]) !== juste) p.push(`réponse attendue ${q.expected[0]}, relue ${juste}`);
  if (q.format === "qcm" && (q.choices ?? []).filter((c) => val(c) === juste).length !== 1) p.push("pas exactement une proposition juste");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  entier_lire_ecrire_tpl_1: corrigerLireEcrire,
  entier_lire_ecrire_qcm_tpl_1: corrigerLireEcrire,
  entier_defi_tpl_1: corrigerDevinette,
  entier_defi_tpl_2_complement: corrigerComplement,
  entier_defi_tpl_3_former_nombre: corrigerFormerNombre,
  entier_defi_qcm_tpl_1: corrigerFormerNombre,
  entier_encadrer_tpl_1: corrigerEncadrer,
  entier_encadrer_qcm_tpl_1: corrigerEncadrer,
  entier_decomposer_tpl_1: corrigerDecomposer,
  entier_decomposer_tpl_2_etoile_1: corrigerDecomposer,
  entier_decomposer_qcm_tpl_1: corrigerDecomposer,
  entier_rang_tpl_1: corrigerRang,
  entier_rang_tpl_2_etoile_1: corrigerRang,
  entier_rang_qcm_tpl_1: corrigerRang,
  entier_comparer_tpl_1: corrigerComparerDeux,
  entier_comparer_tpl_2_etoile_1: corrigerComparerDeux,
  entier_comparer_qcm_tpl_1: corrigerComparerQuatre,
};
