import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Rempli le 07/10/2026 (voir types.ts). Chaque correcteur RELIT le texte que
// voit l'élève : le contenu de l'urne (« 3 billes rouges, 5 billes bleues et
// 1 bille verte »), les issues numérotées (« numérotées de 1 à 12 »), la pièce
// (pile ou face), l'événement entre guillemets ; il RECOMPTE les issues, refait
// le raisonnement (catégorie, fraction, comparaison, fréquence) et compare à la
// réponse attendue et aux leurres. Il ne connaît ni le contexte tiré, ni la
// formule du gabarit. Le dessin (sac de billes, roue, dé) doit dire la même
// chose que le texte.

type Q = TutorGeneratedQuestionV4;

/* ─────────────────────────── lecture des nombres ─────────────────────────── */

/** « 2 000 » → 2000 ; « 0,35 » → 0,35. */
const val = (s: string) => Number(String(s).replace(/[\s  ]/g, "").replace(",", "."));
/** Une fraction « 3/8 », un décimal « 0,375 », un pourcentage « 37,5 % » → nombre. */
function valeur(s: string): number {
  const t = s.trim();
  let m = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  m = t.match(/^(\d+(?:,\d+)?)\s*%$/);
  if (m) return val(m[1]) / 100;
  m = t.match(/^\d+(?:,\d+)?$/);
  if (m) return val(t);
  return NaN;
}
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/* ─────────────────────────── lecture de l'expérience ─────────────────────── */

const RE_COUL = "(rouge|bleu|vert|jaune|violet|orange|rose|noir|blanc)(?:te|he|e)?s?(?![\\p{L}])";
type Exp =
  | { kind: "num"; a: number; b: number }
  | { kind: "piece" }
  | { kind: "urne"; contenu: Map<string, number> };

/** Le texte sans ce qui est entre guillemets (événements, paroles). */
const horsGuillemets = (t: string) => t.replace(/«[^»]*»/g, "«»");

/** Les groupes « 3 billes rouges » d'un passage → couleur ↦ effectif. */
export function lireContenu(t: string): Map<string, number> {
  const m = new Map<string, number>();
  const re = new RegExp(`(\\d+) ((?:[\\p{L}’-]+ ){1,3}?)${RE_COUL}`, "gu");
  for (const x of t.matchAll(re)) m.set(x[3], (m.get(x[3]) ?? 0) + Number(x[1]));
  return m;
}

/** L'expérience décrite par un passage de texte (hors guillemets). */
export function lireExperience(t0: string): Exp | null {
  const t = horsGuillemets(t0);
  const n = t.match(/numérot\p{L}* de (\d+) à (\d+)/u);
  if (n) return { kind: "num", a: Number(n[1]), b: Number(n[2]) };
  const c = lireContenu(t);
  if (c.size) return { kind: "urne", contenu: c };
  if (/pièce/.test(t)) return { kind: "piece" };
  return null;
}

/** Toutes les issues équiprobables de l'expérience. */
function issues(e: Exp): (number | string)[] {
  if (e.kind === "num") return Array.from({ length: e.b - e.a + 1 }, (_, i) => e.a + i);
  if (e.kind === "piece") return ["pile", "face"];
  return [...e.contenu].flatMap(([c, k]) => Array.from({ length: k }, () => c));
}

/** Un événement relu : vrai/faux pour une issue ; `null` si illisible. */
export function lireEvenement(lib: string, e: Exp): ((x: number | string) => boolean) | null {
  const l = lib.trim();
  if (e.kind === "piece") {
    const pile = /\bpile\b/.test(l);
    const face = /\bface\b/.test(l);
    if (!pile && !face) return null;
    return (x) => (x === "pile" && pile) || (x === "face" && face);
  }
  if (e.kind === "urne") {
    const cs = [...l.matchAll(new RegExp(RE_COUL, "gu"))].map((x) => x[1]);
    if (!cs.length) return null;
    const pas = /n[’']est pas/.test(l);
    return (x) => (pas ? !cs.includes(String(x)) : cs.includes(String(x)));
  }
  // issues numérotées : on cumule les conditions lues
  const conds: ((v: number) => boolean)[] = [];
  let m: RegExpMatchArray | null;
  if (/\bimpair\b/.test(l)) conds.push((v) => v % 2 === 1);
  else if (/\bpair\b/.test(l)) conds.push((v) => v % 2 === 0);
  if ((m = l.match(/supérieur ou égal à (\d+)/))) { const k = +m[1]; conds.push((v) => v >= k); }
  else if ((m = l.match(/supérieur à (\d+)/))) { const k = +m[1]; conds.push((v) => v > k); }
  if ((m = l.match(/inférieur ou égal à (\d+)/))) { const k = +m[1]; conds.push((v) => v <= k); }
  else if ((m = l.match(/inférieur à (\d+)/))) { const k = +m[1]; conds.push((v) => v < k); }
  if ((m = l.match(/multiple de (\d+)/))) { const k = +m[1]; conds.push((v) => v % k === 0); }
  if (/à deux chiffres/.test(l)) conds.push((v) => v >= 10 && v <= 99);
  if ((m = l.match(/^ne pas obtenir le (?:nombre |numéro )?(\d+)$/))) { const k = +m[1]; conds.push((v) => v !== k); }
  else if ((m = l.match(/^obtenir le (?:nombre |numéro )?(\d+)$/))) { const k = +m[1]; conds.push((v) => v === k); }
  if (!conds.length) return null;
  return (x) => conds.every((f) => f(Number(x)));
}

/** Issues favorables et total pour un événement relu dans l'expérience. */
export function compter(lib: string, e: Exp): { fav: number; tot: number } | null {
  const f = lireEvenement(lib, e);
  if (!f) return null;
  const is = issues(e);
  return { fav: is.filter(f).length, tot: is.length };
}

/** Les événements entre guillemets, dans l'ordre. */
const guillemets = (t: string) => [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);

/** La case de l'échelle (au plus 1/4 : peu ; au moins 3/4 : très ; sinon douteux). */
function categorie(fav: number, tot: number): string {
  if (fav === 0) return "impossible";
  if (fav === tot) return "certain";
  if (2 * fav === tot) return "une chance sur deux";
  if (4 * fav <= tot) return "peu probable";
  if (4 * fav >= 3 * tot) return "très probable";
  return "douteux";
}

/* ─────────────────────────── contrôles communs ───────────────────────────── */

/** Le dessin dit-il la même chose que le texte ? */
function verifierCanvas(q: Q, e: Exp | null): string[] {
  const cv: any = q.canvas;
  if (!cv || !e) return [];
  const p: string[] = [];
  if (cv.variant === "billes") {
    if (e.kind !== "urne") return ["sac de billes dessiné pour une expérience qui n’est pas un tirage de couleurs"];
    const m = new Map<string, number>();
    for (const el of cv.billes?.elements ?? []) m.set(el.couleur, (m.get(el.couleur) ?? 0) + 1);
    const a = [...m].sort().join(";");
    const b = [...e.contenu].sort().join(";");
    if (a !== b) p.push(`le dessin (${a}) ne montre pas le contenu du texte (${b})`);
  }
  if (cv.variant === "de") {
    if (e.kind !== "num" || e.a !== 1 || e.b !== 6) p.push("dé à 6 faces dessiné pour une autre expérience");
  }
  if (cv.variant === "roue" && e.kind === "num") {
    const segs = cv.roue?.segments ?? [];
    if (segs.length !== e.b - e.a + 1 || segs.some((s: any) => s.poids !== segs[0].poids)) p.push("la roue dessinée n’a pas les secteurs égaux du texte");
  }
  if (cv.variant === "roue" && e.kind === "urne") {
    const segs = cv.roue?.segments ?? [];
    const m = new Map<string, number>();
    for (const s of segs) m.set(s.couleur, (m.get(s.couleur) ?? 0) + s.poids);
    if ([...m].sort().join(";") !== [...e.contenu].sort().join(";") || segs.some((s: any) => s.poids !== 1))
      p.push("la roue dessinée ne montre pas les secteurs du texte");
  }
  return p;
}

/** Plausibilité : effectifs d'un sac, nombre d'issues. */
function plausible(e: Exp | null): string[] {
  if (!e) return [];
  if (e.kind === "urne") {
    const t = [...e.contenu.values()].reduce((a, b) => a + b, 0);
    if (t > 40 || [...e.contenu.values()].some((k) => k < 1)) return [`contenu peu plausible (${t} objets)`];
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

/** La situation est le texte avant la question (avant le premier « ? » ou la consigne). */
function experienceEtEvenement(q: Q) {
  const e = lireExperience(q.text);
  const evs = guillemets(q.text);
  return { e, evs };
}

/* ─────────────────────────── proba_vocabulaire ───────────────────────────── */

/** ★1 et ★2 : un événement, un mot. */
function corrigerMot(q: Q, echelle: "trois" | "cinq"): string[] {
  const { e, evs } = experienceEtEvenement(q);
  if (!e) return ["expérience illisible"];
  if (evs.length !== 1) return [`un seul événement attendu entre guillemets (${evs.length})`];
  const c = compter(evs[0], e);
  if (!c) return [`événement illisible : « ${evs[0]} »`];
  let mot = categorie(c.fav, c.tot);
  if (echelle === "trois" && mot !== "impossible" && mot !== "certain") mot = "possible mais pas certain";
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  if (mot === "douteux") p.push(`${c.fav} chances sur ${c.tot} : ni nettement peu probable ni nettement très probable`);
  else if (q.expected[0] !== mot) p.push(`attendu « ${q.expected[0]} », recalculé « ${mot} » (${c.fav} sur ${c.tot})`);
  p.push(...uneSeule(q, (ch) => ch === mot));
  return p;
}

/** ★3 : quel événement est <mot> ? Chaque proposition est recomptée. */
function corrigerQuelEvenement(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const consigne = horsGuillemets(q.text).match(/(impossible|certain|peu probable|très probable)/);
  if (!consigne) return ["mot cherché illisible dans la question"];
  const mot = consigne[1];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const justes: string[] = [];
  for (const ch of q.choices ?? []) {
    const c = compter(ch, e);
    if (!c) { p.push(`proposition illisible : « ${ch} »`); continue; }
    const cat = categorie(c.fav, c.tot);
    if (cat === "douteux") p.push(`proposition douteuse : « ${ch} » (${c.fav} sur ${c.tot})`);
    if (cat === mot) justes.push(ch);
  }
  if (justes.length !== 1) p.push(`${justes.length} propositions sont « ${mot} » : ${justes.join(" | ")}`);
  else if (justes[0] !== q.expected[0]) p.push(`attendu « ${q.expected[0]} », recalculé « ${justes[0]} »`);
  return p;
}

/* ─────────────────────────── proba_issue ─────────────────────────────────── */

/** Un nombre d'issues demandé : en tout, favorables, couleurs, issue oubliée. */
function corrigerCompte(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const evs = guillemets(q.text);
  const t = horsGuillemets(q.text);
  let attendu: number;
  if (evs.length === 1) {
    const c = compter(evs[0], e);
    if (!c) return [...p, `événement illisible : « ${evs[0]} »`];
    attendu = c.fav;
    if (c.fav === 0 || c.fav === c.tot) p.push(`événement sans intérêt ici (${c.fav} sur ${c.tot})`);
  } else if (evs.length > 1) return [...p, "plusieurs événements entre guillemets"];
  else if (/couleurs différentes/.test(t)) {
    if (e.kind !== "urne") return [...p, "couleurs demandées sans contenu coloré"];
    attendu = e.contenu.size;
  } else if (/en tout/.test(t)) {
    attendu = issues(e).length;
  } else if (/oubliée|manque/.test(t)) {
    const l = t.match(/(?:possibles|issues) : ([\d, ]+)\./);
    if (!l) return [...p, "liste de l’élève illisible"];
    const vus = new Set(l[1].split(/,\s*/).map(Number));
    const manquent = issues(e).filter((v) => !vus.has(v as number));
    if (manquent.length !== 1) return [...p, `${manquent.length} issues manquent dans la liste`];
    attendu = manquent[0] as number;
  } else if (/issues? possibles|résultats différents|issues compte/.test(t)) {
    attendu = issues(e).length;
  } else return [...p, "question illisible"];
  if (val(q.expected[0]) !== attendu) p.push(`attendu ${q.expected[0]}, recompté ${attendu}`);
  return p;
}

/* ─────────────────────────── proba_comparer ──────────────────────────────── */

/** Deux événements entre guillemets : lequel a le plus de chances ? */
function corrigerComparaison(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const evs = guillemets(q.text);
  if (evs.length !== 2) return [...p, `deux événements attendus (${evs.length})`];
  const [A, B] = evs.map((l) => compter(l, e));
  if (!A || !B) return [...p, "événement illisible"];
  if (evs[0] === evs[1]) p.push("les deux événements sont les mêmes");
  const verite = A.fav > B.fav ? evs[0] : A.fav < B.fav ? evs[1] : "autant";
  /** Ce que dit une proposition : un événement, ou « autant ». */
  const sens = (ch: string): string | null => {
    if (/autant/.test(ch)) return "autant";
    if (evs.includes(ch)) return ch;
    const g = ch.match(/^«\s*(.+?)\s*» a plus de chances$/);
    if (g) return g[1];
    const pari = q.text.match(new RegExp(`${ch} parie sur «\\s*([^»]+?)\\s*»`));
    return pari ? pari[1] : null;
  };
  for (const ch of q.choices ?? []) if (sens(ch.trim()) === null) p.push(`proposition illisible : « ${ch} »`);
  p.push(...uneSeule(q, (ch) => sens(ch) === verite));
  return p;
}

/** La couleur la plus (la moins) probable. */
function corrigerCouleur(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e || e.kind !== "urne") return ["contenu coloré illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const moins = /moins/.test(q.text);
  const ns = [...e.contenu.values()];
  const cible = moins ? Math.min(...ns) : Math.max(...ns);
  const gagnantes = [...e.contenu].filter(([, k]) => k === cible).map(([c]) => c);
  const tous = new Set(ns).size === 1;
  p.push(...uneSeule(q, (ch) => (/autant/.test(ch) ? tous : !tous && gagnantes.length === 1 && ch === gagnantes[0])));
  return p;
}

/** Oui ou non : les deux événements ont-ils autant de chances ? */
function corrigerAutant(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const evs = guillemets(q.text);
  if (evs.length !== 2) return [...p, `deux événements attendus (${evs.length})`];
  const [A, B] = evs.map((l) => compter(l, e));
  if (!A || !B) return [...p, "événement illisible"];
  p.push(...uneSeule(q, (ch) => ch === (A.fav === B.fav ? "oui" : "non")));
  return p;
}

/** Les contenants de chacun : « Dans le sac de Léa, il y a … ». */
function lireContenants(t: string): Map<string, Map<string, number>> {
  const m = new Map<string, Map<string, number>>();
  for (const x of t.matchAll(/Dans (?:le|la) [\p{L}]+ (?:de |d’)([\p{L}-]+), il y a ([^.]+)\./gu)) m.set(x[1], lireContenu(x[2]));
  return m;
}

/** Deux sacs : qui a le plus de chances ? On compare les PARTS, pas les nombres. */
function corrigerDeuxSacs(q: Q): string[] {
  const sacs = lireContenants(q.text);
  if (sacs.size !== 2) return [`deux contenants attendus (${sacs.size})`];
  const evs = guillemets(q.text);
  if (evs.length !== 1) return ["un événement attendu"];
  const cs = [...evs[0].matchAll(new RegExp(RE_COUL, "gu"))].map((x) => x[1]);
  if (cs.length !== 1) return ["couleur de l’événement illisible"];
  const p: string[] = /(?<![\p{L}\d])[-−]\d/u.test(q.text) ? ["nombre négatif dans le texte"] : [];
  const parts = [...sacs].map(([nom, c]) => {
    const tot = [...c.values()].reduce((a, b) => a + b, 0);
    const fav = c.get(cs[0]) ?? 0;
    if (!fav || fav === tot || tot > 20) p.push(`contenu peu plausible pour ${nom}`);
    return { nom, fav, tot };
  });
  const [X, Y] = parts;
  const comp = X.fav * Y.tot - Y.fav * X.tot;
  const verite = comp > 0 ? X.nom : comp < 0 ? Y.nom : "autant";
  // le gagnant doit pouvoir se voir : même total, même nombre favorable, la moitié, ou parts égales
  const facile =
    comp === 0 || X.tot === Y.tot || X.fav === Y.fav || (2 * X.fav - X.tot) * (2 * Y.fav - Y.tot) < 0;
  if (!facile) p.push(`comparaison trop difficile en 6e : ${X.fav}/${X.tot} et ${Y.fav}/${Y.tot}`);
  p.push(...uneSeule(q, (ch) => (/autant/.test(ch) ? verite === "autant" : ch === verite)));
  return p;
}

/* ─────────────────────────── proba_estimer ───────────────────────────────── */

/** Ce que vaut une proposition d'échelle, pour une probabilité r : vrai, faux, ou inconnu (null). */
function echelle(ch: string, r: number): boolean | null {
  switch (ch) {
    case "0":
    case "impossible":
      return r === 0;
    case "1":
    case "certain":
      return r === 1;
    case "1/2":
    case "une chance sur deux":
      return egal(r, 0.5);
    case "proche de 0":
      return r > 0 && r <= 0.2 + 1e-9;
    case "proche de 1":
      return r < 1 && r >= 0.8 - 1e-9;
  }
  return null;
}

/** 0, 1/2, 1, proche de 0, proche de 1, impossible, certain : la probabilité recalculée décide. */
function corrigerEchelle(q: Q): string[] {
  const { e, evs } = experienceEtEvenement(q);
  if (!e) return ["expérience illisible"];
  if (evs.length !== 1) return [`un seul événement attendu (${evs.length})`];
  const c = compter(evs[0], e);
  if (!c) return [`événement illisible : « ${evs[0]} »`];
  const r = c.fav / c.tot;
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  for (const ch of q.choices ?? []) if (echelle(ch, r) === null) p.push(`proposition inconnue : « ${ch} »`);
  p.push(...uneSeule(q, (ch) => echelle(ch, r) === true));
  return p;
}

/** « 3/8 » ou « 3 chances sur 8 » → 3/8. */
function valeurProposee(ch: string): number {
  const m = ch.match(/^(\d+) chances? sur (\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  return valeur(ch);
}

/** La probabilité en fraction (ou en « chances sur ») : une seule proposition a la bonne VALEUR. */
function corrigerFraction(q: Q): string[] {
  const { e, evs } = experienceEtEvenement(q);
  if (!e) return ["expérience illisible"];
  if (evs.length !== 1) return [`un seul événement attendu (${evs.length})`];
  const c = compter(evs[0], e);
  if (!c) return [`événement illisible : « ${evs[0]} »`];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  if (c.fav === 0 || c.fav === c.tot) p.push("événement impossible ou certain : la fraction n’a pas d’intérêt ici");
  for (const ch of q.choices ?? []) if (Number.isNaN(valeurProposee(ch))) p.push(`proposition illisible : « ${ch} »`);
  p.push(...uneSeule(q, (ch) => egal(valeurProposee(ch), c.fav / c.tot)));
  // la bonne réponse s'écrit avec le nombre total d'issues (pas une fraction réduite sortie de nulle part)
  const m = q.expected[0].match(/(\d+)\D+(\d+)$/);
  if (m && Number(m[2]) !== c.tot) p.push(`la réponse « ${q.expected[0]} » n’utilise pas le total ${c.tot}`);
  return p;
}

/* ─────────────────────────── proba_lire ──────────────────────────────────── */

/** Ce que montre le dessin : couleur ↦ nombre (sac de billes ou roue à secteurs égaux). */
function lireDessin(q: Q): Map<string, number> | null {
  const cv: any = q.canvas;
  if (!cv) return null;
  const m = new Map<string, number>();
  if (cv.variant === "billes") for (const el of cv.billes?.elements ?? []) m.set(el.couleur, (m.get(el.couleur) ?? 0) + 1);
  else if (cv.variant === "roue") {
    for (const s of cv.roue?.segments ?? []) {
      if (s.poids !== 1) return null;
      m.set(s.couleur, (m.get(s.couleur) ?? 0) + 1);
    }
  } else return null;
  return m;
}

/** Compter sur le dessin : une couleur, en tout, « pas … », « … ou … », la plus (moins) présente. */
function corrigerLireDessin(q: Q): string[] {
  const d = lireDessin(q);
  if (!d || !d.size) return ["aucun dessin lisible"];
  const p: string[] = [];
  if (/\d/.test(q.text)) p.push("le texte donne des nombres : l’élève doit les LIRE sur le dessin");
  const t = q.text;
  const cs = [...t.matchAll(new RegExp(RE_COUL, "gu"))].map((x) => x[1]);
  const total = [...d.values()].reduce((a, b) => a + b, 0);
  if (total > 24) p.push("dessin trop chargé pour être compté");
  if (q.format === "qcm") {
    const moins = /moins/.test(t);
    const ns = [...d.values()];
    const cible = moins ? Math.min(...ns) : Math.max(...ns);
    const g = [...d].filter(([, k]) => k === cible).map(([c]) => c);
    p.push(...uneSeule(q, (ch) => (/autant/.test(ch) ? new Set(ns).size === 1 : g.length === 1 && ch === g[0])));
    return p;
  }
  let attendu: number;
  if (/en tout/.test(t) && cs.length === 0) attendu = total;
  else if (/ne sont pas/.test(t) && cs.length === 1) attendu = total - (d.get(cs[0]) ?? 0);
  else if (cs.length === 2) attendu = (d.get(cs[0]) ?? 0) + (d.get(cs[1]) ?? 0);
  else if (cs.length === 1) attendu = d.get(cs[0]) ?? 0;
  else return [...p, "question illisible"];
  for (const c of cs) if (!d.has(c)) p.push(`la couleur ${c} n’est pas sur le dessin`);
  if (val(q.expected[0]) !== attendu) p.push(`attendu ${q.expected[0]}, compté sur le dessin ${attendu}`);
  return p;
}

/** La roue des lots : on compte les secteurs de chaque lot SUR LE DESSIN. */
function corrigerRoueLots(q: Q): string[] {
  const cv: any = q.canvas;
  const segs = cv?.variant === "roue" ? cv.roue?.segments ?? [] : [];
  if (!segs.length) return ["roue absente"];
  const p: string[] = [];
  if (segs.some((s: any) => s.poids !== 1)) p.push("secteurs de tailles différentes : le texte dit qu’ils sont égaux");
  const lots = new Map<string, number>();
  const couleurDe = new Map<string, string>();
  for (const s of segs) {
    lots.set(s.label, (lots.get(s.label) ?? 0) + 1);
    if (couleurDe.has(s.label) && couleurDe.get(s.label) !== s.couleur) p.push(`le lot ${s.label} change de couleur`);
    couleurDe.set(s.label, s.couleur);
  }
  const total = segs.length;
  const t = q.text;
  const g = guillemets(t);
  if (/le plus de chances|le moins de chances/.test(t)) {
    const ns = [...lots.values()];
    const cible = /le moins/.test(t) ? Math.min(...ns) : Math.max(...ns);
    const gagnants = [...lots].filter(([, k]) => k === cible).map(([l]) => l);
    if (gagnants.length !== 1) p.push("plusieurs lots à égalité");
    p.push(...uneSeule(q, (ch) => ch === gagnants[0]));
  } else if (/Combien de chances/.test(t) && g.length === 1) {
    const n = lots.get(g[0]);
    if (!n) return [...p, `lot « ${g[0]} » absent de la roue`];
    p.push(...uneSeule(q, (ch) => egal(valeurProposee(ch), n / total)));
  } else if (/Combien de secteurs/.test(t) && g.length === 1) {
    const n = lots.get(g[0]);
    if (!n) return [...p, `lot « ${g[0]} » absent de la roue`];
    if (val(q.expected[0]) !== n) p.push(`attendu ${q.expected[0]}, compté ${n}`);
  } else p.push("question illisible");
  return p;
}

/** Le contenu donné par un tableau « Couleur | Nombre » : probabilité en fraction ou en chances. */
function corrigerTableau(q: Q): string[] {
  const cv: any = q.canvas;
  if (cv?.variant !== "tableau") return ["tableau absent"];
  const contenu = new Map<string, number>();
  for (const l of cv.tableau?.lignes ?? []) {
    const c = String(l[0]).match(new RegExp(`^${RE_COUL}$`, "u"));
    if (!c) return [`couleur illisible dans le tableau : ${l[0]}`];
    contenu.set(c[1], Number(l[1]));
  }
  const e: Exp = { kind: "urne", contenu };
  const p = plausible(e);
  if (lireContenu(horsGuillemets(q.text)).size) p.push("le texte redonne le contenu : il doit se lire dans le tableau");
  const evs = guillemets(q.text);
  if (evs.length !== 1) return [...p, "un événement attendu"];
  const c = compter(evs[0], e);
  if (!c) return [...p, `événement illisible : « ${evs[0]} »`];
  if (c.fav === 0 || c.fav === c.tot) p.push("événement impossible ou certain");
  p.push(...uneSeule(q, (ch) => egal(valeurProposee(ch), c.fav / c.tot)));
  return p;
}

/* ─────────────────────────── proba_defi ──────────────────────────────────── */

const minuscule = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Un camarade affirme : la phrase est relue, puis vérifiée en recomptant. */
function corrigerAffirmation(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e) return ["expérience illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const g = guillemets(q.text);
  if (g.length !== 1) return [...p, "une phrase entre guillemets attendue"];
  const ph = g[0];
  let vrai: boolean | null = null;
  let m: RegExpMatchArray | null;
  if ((m = ph.match(/^On a plus de chances (?:de |d’)(.+) que (?:de |d’)(.+)\.$/))) {
    const A = compter(m[1], e);
    const B = compter(m[2], e);
    if (A && B) vrai = A.fav > B.fav;
  } else if ((m = ph.match(/^(.+), c’est une chance sur deux\.$/))) {
    const c = compter(minuscule(m[1]), e);
    if (c) vrai = 2 * c.fav === c.tot;
  } else if ((m = ph.match(/^(.+) est (impossible|certain)\.$/))) {
    const c = compter(minuscule(m[1]), e);
    if (c) vrai = m[2] === "impossible" ? c.fav === 0 : c.fav === c.tot;
  }
  if (vrai === null) return [...p, `phrase illisible : « ${ph} »`];
  p.push(...uneSeule(q, (ch) => ch === (vrai ? "oui" : "non")));
  return p;
}

/** Combien en ajouter (en enlever) : on essaie 1, 2, 3… en recomptant à chaque fois. */
function corrigerAjouter(q: Q): string[] {
  const e = lireExperience(q.text);
  if (!e || e.kind !== "urne") return ["contenu illisible"];
  const p = [...plausible(e), ...verifierCanvas(q, e)];
  const t = horsGuillemets(q.text);
  const act = t.match(new RegExp(`Combien de [^?]*?${RE_COUL}[^?]*? faut-il (ajouter|enlever)`, "u"));
  if (!act) return [...p, "action illisible"];
  const [, coul, verbe] = act;
  const evs = guillemets(q.text);
  const cond = (c: Map<string, number>) => {
    const x: Exp = { kind: "urne", contenu: c };
    if (/autant de chances/.test(t) && evs.length === 2) {
      const A = compter(evs[0], x);
      const B = compter(evs[1], x);
      return A && B ? A.fav === B.fav : null;
    }
    if (/une chance sur deux/.test(t) && evs.length === 1) {
      const A = compter(evs[0], x);
      return A ? 2 * A.fav === A.tot : null;
    }
    return null;
  };
  if (cond(e.contenu) !== false) return [...p, "la condition est illisible, ou déjà remplie"];
  let trouve = 0;
  for (let k = 1; k <= 40 && !trouve; k++) {
    const c = new Map(e.contenu);
    const n = (c.get(coul) ?? 0) + (verbe === "ajouter" ? k : -k);
    if (n < 0) break;
    c.set(coul, n);
    if (cond(c)) trouve = k;
  }
  if (!trouve) return [...p, "aucun nombre ne convient"];
  if (val(q.expected[0]) !== trouve) p.push(`attendu ${q.expected[0]}, trouvé en essayant ${trouve}`);
  return p;
}

/** Deux stands : gagnants sur total de chaque côté ; la comparaison doit rester faisable en 6e. */
function corrigerStands(q: Q): string[] {
  const jeux = [...q.text.matchAll(/Stand ([AB]) : [^.]*?(\d+)[^.\d]*?dont (\d+) gagnant/g)].map((m) => ({ s: m[1], n: +m[2], k: +m[3] }));
  if (jeux.length !== 2) return [`deux stands attendus (${jeux.length})`];
  const [A, B] = jeux;
  const p: string[] = [];
  for (const j of jeux) if (j.k < 1 || j.k >= j.n || j.n > 24) p.push(`stand ${j.s} peu plausible : ${j.k} gagnants sur ${j.n}`);
  const comp = A.k * B.n - B.k * A.n;
  const facile = comp === 0 || A.n === B.n || A.k === B.k || (2 * A.k - A.n) * (2 * B.k - B.n) < 0;
  if (!facile) p.push(`comparaison trop difficile en 6e : ${A.k}/${A.n} et ${B.k}/${B.n}`);
  const verite = comp > 0 ? "le stand A" : comp < 0 ? "le stand B" : "les deux se valent";
  p.push(...uneSeule(q, (ch) => ch === verite));
  return p;
}

/* ─────────────────────────── proba_frequence ─────────────────────────────── */

/** La probabilité d'un événement d'une expérience décrite (pièce, deux pièces, dé, roue, sac). */
function probaExperience(t: string, lib: string): number | null {
  if (/deux pièces/.test(t)) {
    if (/deux piles|deux faces/.test(lib)) return 1 / 4;
    if (/un pile et un face/.test(lib)) return 1 / 2;
    return null;
  }
  const e = lireExperience(t);
  if (!e) return null;
  const c = compter(lib, e);
  return c ? c.fav / c.tot : null;
}

/** Une série relevée : « « panier » 13 fois » dans le texte, et/ou le tableau Résultat | Nombre de fois. */
function lireSerieCalc(q: Q): { issues: Map<string, number>; n: number; p: string[] } | null {
  const p: string[] = [];
  const duTexte = new Map<string, number>();
  for (const m of q.text.matchAll(/«\s*([^»]+?)\s*» (\d+) fois/g)) duTexte.set(m[1], Number(m[2]));
  const cv: any = q.canvas;
  const duTableau = new Map<string, number>();
  if (cv?.variant === "tableau") for (const l of cv.tableau?.lignes ?? []) duTableau.set(String(l[0]), Number(l[1]));
  const issues = duTexte.size ? duTexte : duTableau;
  if (!issues.size) return null;
  if (duTexte.size && duTableau.size && [...duTexte].join(";") !== [...duTableau].join(";")) p.push("le tableau ne dit pas la même chose que le texte");
  const n0 = q.text.match(/\d+/);
  const n = n0 ? Number(n0[0]) : NaN;
  const somme = [...issues.values()].reduce((a, b) => a + b, 0);
  if (somme !== n) p.push(`les résultats (${somme}) ne font pas le nombre d’essais (${n})`);
  if ([...issues.values()].some((k) => k < 1)) p.push("un résultat jamais sorti : à éviter ici");
  return { issues, n, p };
}

/** La fréquence demandée : les résultats cités après « fréquence ». */
function frequenceDemandee(q: Q, s: { issues: Map<string, number>; n: number }): number | null {
  const phrase = q.text.split(/(?<=[.?!])\s+/).filter((ph) => /fréquence/.test(ph)).pop();
  if (!phrase) return null;
  const cites = guillemets(phrase);
  if (!cites.length || cites.some((c) => !s.issues.has(c))) return null;
  return cites.reduce((a, c) => a + s.issues.get(c)!, 0) / s.n;
}

/** ★2-★3 : la fréquence calculée, sous toutes ses écritures. */
function corrigerFreqCalc(q: Q): string[] {
  const s = lireSerieCalc(q);
  if (!s) return ["série illisible"];
  const p = [...s.p];
  const f = frequenceDemandee(q, s);
  if (f === null) return [...p, "résultat demandé illisible"];
  for (const ex of q.expected) if (!egal(valeur(ex), f)) p.push(`écriture « ${ex} » ≠ ${f}`);
  if (/,\d{3}/.test(q.expected[0])) p.push("plus de deux chiffres après la virgule");
  return p;
}

/** ★4 : la fréquence impossible, la bonne fréquence parmi les pièges, fréquence ou probabilité. */
function corrigerFreqQcm(q: Q): string[] {
  const t = q.text;
  if (/est impossible \?/.test(t)) {
    const s = lireSerieCalc(q);
    const p = s ? [...s.p] : [];
    p.push(...uneSeule(q, (ch) => valeur(ch) > 1));
    for (const ch of q.choices ?? []) if (Number.isNaN(valeur(ch)) || valeur(ch) <= 0) p.push(`proposition illisible : ${ch}`);
    return p;
  }
  const pr = t.match(/La probabilité de «\s*([^»]+?)\s*» vaut (\d+(?:\/\d+)?)\./);
  if (pr) {
    const p: string[] = [];
    const vraie = probaExperience(t, pr[1]);
    if (vraie === null) return ["expérience illisible"];
    if (!egal(vraie, valeur(pr[2]))) p.push(`la probabilité annoncée ${pr[2]} est fausse (${vraie})`);
    const n = Number(t.match(/(\d+) fois/)?.[1]);
    const k = Number(t.match(/obtient ce résultat (\d+) fois/)?.[1]);
    if (!n || !k || k >= n) return [...p, "essais illisibles"];
    p.push(...uneSeule(q, (ch) => egal(valeur(ch), k / n)));
    return p;
  }
  const s = lireSerieCalc(q);
  if (!s) return ["série illisible"];
  const f = frequenceDemandee(q, s);
  if (f === null) return [...s.p, "résultat demandé illisible"];
  return [...s.p, ...uneSeule(q, (ch) => egal(valeur(ch), f))];
}

const NB = "(\\d{1,3}(?:[  ]\\d{3})*)";
/** Le nombre d'essais : le premier « … fois » du texte. */
const essais = (t: string) => {
  const m = t.match(new RegExp(`${NB} fois`));
  return m ? val(m[1]) : NaN;
};
/** Écart en écarts types (la mesure du statisticien : au plus 1,5 = hasard, au moins 4 = suspect). */
const ecartTypes = (n: number, k: number, p: number) => Math.abs(k - n * p) / Math.sqrt(n * p * (1 - p));

/** ★3 : nombre de fois attendu = n × p, la probabilité recalculée à partir de l'expérience. */
function corrigerAttendu(q: Q): string[] {
  const n = essais(q.text);
  const g = guillemets(q.text);
  if (!n || g.length !== 1) return ["essais ou événement illisibles"];
  const pr = probaExperience(q.text, g[0]);
  if (pr === null) return [`probabilité de « ${g[0]} » illisible`];
  if (pr === 0 || pr === 1) return ["événement impossible ou certain"];
  const att = n * pr;
  if (!egal(att, Math.round(att))) return [`n × p = ${att} n’est pas entier`];
  return val(q.expected[0]) === Math.round(att) ? [] : [`attendu ${q.expected[0]}, recalculé ${att}`];
}

/** ★4 : l'écart observé est-il le hasard ou un tirage truqué ? */
function corrigerEcart(q: Q): string[] {
  const t = q.text;
  const n = essais(t);
  const m = t.match(new RegExp(`L’événement «\\s*([^»]+?)\\s*» se produit ${NB} fois`));
  if (!n || !m) return ["essais illisibles"];
  const k = val(m[2]);
  const pr = probaExperience(t, m[1]);
  if (pr === null) return ["probabilité illisible"];
  const p: string[] = [];
  const dite = t.match(/La probabilité est (\d+(?:\/\d+)?)/);
  if (!dite || !egal(valeur(dite[1]), pr)) p.push(`la probabilité annoncée ne vaut pas ${pr}`);
  const att = t.match(new RegExp(`attendait environ ${NB}`));
  if (!att || Math.abs(val(att[1]) - n * pr) > 1) p.push("le nombre attendu annoncé est faux");
  const z = ecartTypes(n, k, pr);
  if (z > 1.5 && z < 4) return [...p, `écart de ${z.toFixed(1)} écarts types : ni nettement le hasard, ni nettement suspect`];
  const hasard = z <= 1.5;
  p.push(...uneSeule(q, (ch) => (/hasard/.test(ch) ? hasard : /truqu/.test(ch) ? !hasard : false)));
  return p;
}

/** ★5 : la fréquence de la classe (résultats réunis), ou la série qui fait vraiment douter. */
function corrigerClasseOuDoute(q: Q): string[] {
  const t = q.text;
  if (/Groupe 1 :/.test(t)) {
    const ks = [...t.matchAll(/Groupe \d+ : (\d+)\./g)].map((m) => Number(m[1]));
    const m = Number(t.match(/chacun (\d+) fois/)?.[1]);
    if (!m || !ks.length) return ["groupes illisibles"];
    const p: string[] = [];
    if (ks.some((k) => k > m)) p.push("un groupe a plus de résultats que d’essais");
    const f = ks.reduce((a, b) => a + b, 0) / (m * ks.length);
    for (const ex of q.expected) if (!egal(valeur(ex), f)) p.push(`écriture « ${ex} » ≠ ${f}`);
    if (/,\d{3}/.test(q.expected[0])) p.push("plus de deux chiffres après la virgule");
    return p;
  }
  const series = [...t.matchAll(new RegExp(`([\\p{L}-]+) lance ${NB} fois[^.]*\\. L’événement «\\s*([^»]+?)\\s*» se produit ${NB} fois`, "gu"))].map((m) => ({
    nom: m[1], n: val(m[2]), lib: m[3], k: val(m[4]),
  }));
  if (series.length !== 2) return [`deux séries attendues (${series.length})`];
  const pr = probaExperience(t, series[0].lib);
  if (pr === null) return ["probabilité illisible"];
  const p: string[] = [];
  const dite = t.match(/vaut (\d+\/\d+)/);
  if (!dite || !egal(valeur(dite[1]), pr)) p.push("la probabilité annoncée est fausse");
  const z = series.map((s) => ecartTypes(s.n, s.k, pr));
  if (z.some((x) => x > 1.5 && x < 4)) return [...p, `écart ambigu : ${z.map((x) => x.toFixed(1)).join(" et ")} écarts types`];
  const doutes = series.filter((_, i) => z[i] >= 4).map((s) => s.nom);
  p.push(
    ...uneSeule(q, (ch) =>
      ch === "aucune des deux"
        ? doutes.length === 0
        : ch === "les deux"
          ? doutes.length === 2
          : doutes.length === 1 && ch.replace(/^celle (?:de |d’)/, "") === doutes[0],
    ),
  );
  return p;
}

/** Les séries « Léa lance 20 fois … L’événement « … » se produit 9 fois. » */
function lireSeries(t: string) {
  return [...t.matchAll(new RegExp(`([\\p{L}-]+) lance ${NB} fois[^.]*\\. L’événement «\\s*([^»]+?)\\s*» se produit ${NB} fois`, "gu"))].map((m) => ({
    nom: m[1], n: val(m[2]), lib: m[3], k: val(m[4]),
  }));
}

/** ★3 : la série la plus longue renseigne le mieux. */
function corrigerConfiance(q: Q): string[] {
  const s = lireSeries(q.text);
  if (s.length !== 2) return [`deux séries attendues (${s.length})`];
  const p: string[] = [];
  for (const x of s) if (x.k > x.n) p.push(`${x.nom} : plus de résultats que d’essais`);
  if (s[0].n === s[1].n) return [...p, "deux séries de même longueur"];
  const long = s[0].n > s[1].n ? s[0].nom : s[1].nom;
  p.push(...uneSeule(q, (ch) => ch.replace(/^celle (?:de |d’)/, "") === long));
  return p;
}

/** ★4 : la série la plus proche de la probabilité (calculée), ou la valeur vers laquelle tend le tableau. */
function corrigerRapproche(q: Q): string[] {
  const t = q.text;
  const cv: any = q.canvas;
  if (cv?.variant === "tableau") {
    const g = guillemets(t);
    const pr = g.length === 1 ? probaExperience(t, g[0]) : null;
    if (pr === null) return ["probabilité illisible"];
    const p: string[] = [];
    const lignes: string[][] = cv.tableau?.lignes ?? [];
    for (const l of lignes) {
      const [n, k, f] = [val(l[0]), val(l[1]), val(l[2])];
      if (Math.abs(k / n - f) > 0.0006) p.push(`fréquence ${l[2]} ≠ ${l[1]} ÷ ${l[0]}`);
    }
    for (let i = 1; i < lignes.length; i++) if (val(lignes[i][1]) < val(lignes[i - 1][1])) p.push("le nombre de fois diminue");
    const fFin = val(lignes[lignes.length - 1][2]);
    if (Math.abs(fFin - pr) >= 0.04) p.push(`la dernière fréquence (${fFin}) est loin de la probabilité ${pr}`);
    for (const ch of q.choices ?? []) if (!egal(valeur(ch), pr) && Math.abs(valeur(ch) - fFin) < 0.05) p.push(`le leurre ${ch} est trop proche de ${fFin}`);
    p.push(...uneSeule(q, (ch) => egal(valeur(ch), pr)));
    return p;
  }
  const n1 = essais(t);
  const ks = [...t.matchAll(new RegExp(`se produit ${NB} fois`, "g"))].map((m) => val(m[1]));
  const n2m = t.match(new RegExp(`recommence avec ${NB} essais`));
  const g = guillemets(t);
  if (!n1 || ks.length !== 2 || !n2m || g.length !== 1) return ["séries illisibles"];
  const n2 = val(n2m[1]);
  const pr = probaExperience(t, g[0]);
  if (pr === null) return ["probabilité illisible"];
  const p: string[] = [];
  const dite = t.match(/vaut (\d+(?:\/\d+)?)\./);
  if (!dite || !egal(valeur(dite[1]), pr)) p.push("la probabilité annoncée est fausse");
  const d1 = Math.abs(ks[0] / n1 - pr);
  const d2 = Math.abs(ks[1] / n2 - pr);
  if (Math.abs(d1 - d2) < 0.02) return [...p, "écarts trop voisins pour trancher"];
  const nProche = d1 < d2 ? n1 : n2;
  p.push(...uneSeule(q, (ch) => { const m = ch.match(new RegExp(`^celle sur ${NB} essais$`)); return !!m && val(m[1]) === nProche; }));
  return p;
}

/** ★5 : le hasard n'a pas de mémoire ; sur des milliers d'essais, « très proche », pas « exactement ». */
function corrigerSansMemoire(q: Q): string[] {
  const g = guillemets(q.text);
  if (!g.length) return ["événement illisible"];
  const pr = probaExperience(q.text, g[g.length - 1]);
  if (pr === null) return ["probabilité illisible"];
  const p: string[] = [];
  const juste = (ch: string) => {
    let m: RegExpMatchArray | null;
    if ((m = ch.match(/^très proche de (.+)$/))) return egal(valeur(m[1]), pr);
    if ((m = ch.match(/^(?:plus que|moins que|exactement|loin de) (.+)$/))) {
      if (!egal(valeur(m[1]), pr)) p.push(`la proposition « ${ch} » ne parle pas de la bonne probabilité`);
      return false;
    }
    if (ch === "égale à 1") return false;
    return egal(valeur(ch), pr);
  };
  p.push(...uneSeule(q, juste));
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  proba_frequence_repeter_tpl_2_confiance: corrigerConfiance,
  proba_frequence_repeter_tpl_1: corrigerRapproche,
  proba_frequence_repeter_tpl_ouverte: corrigerSansMemoire,
  proba_frequence_comparer_tpl_2_attendu: corrigerAttendu,
  proba_frequence_comparer_tpl_1: corrigerEcart,
  proba_frequence_comparer_tpl_ouverte: corrigerClasseOuDoute,
  proba_frequence_calculer_tpl_2_simple: corrigerFreqCalc,
  proba_frequence_calculer_tpl_1: corrigerFreqCalc,
  proba_frequence_calculer_tpl_ouverte: corrigerFreqQcm,
  "6e_proba_defi_tpl_3_vrai_faux": corrigerAffirmation,
  "6e_proba_defi_tpl_4_ajouter": corrigerAjouter,
  "6e_proba_defi_tpl_5_proba_compose": corrigerFraction,
  "6e_proba_defi_tpl_1_billes_fraction": corrigerFraction,
  "6e_proba_defi_tpl_2_reunion": corrigerStands,
  "6e_proba_lire_tpl_3_compter": corrigerLireDessin,
  "6e_proba_lire_tpl_4_dessin": corrigerLireDessin,
  "6e_proba_lire_tpl_1_roue": corrigerRoueLots,
  "6e_proba_lire_tpl_2_tableau_favorable": corrigerTableau,
  "6e_proba_estimer_tpl_4_zero_un": corrigerEchelle,
  "6e_proba_estimer_tpl_5_echelle": corrigerEchelle,
  "6e_proba_estimer_tpl_1_de_fraction": corrigerFraction,
  "6e_proba_estimer_tpl_2_billes_proche": corrigerEchelle,
  "6e_proba_estimer_tpl_3_roue_proche_0": corrigerEchelle,
  "6e_proba_comparer_tpl_4_couleur": corrigerCouleur,
  "6e_proba_comparer_tpl_1_billes": corrigerComparaison,
  "6e_proba_comparer_tpl_2_roue": corrigerComparaison,
  "6e_proba_comparer_tpl_3_aussi_probable": corrigerAutant,
  "6e_proba_comparer_tpl_5_deux_sacs": corrigerDeuxSacs,
  "6e_proba_issue_tpl_4_total": corrigerCompte,
  "6e_proba_issue_tpl_1_de": corrigerCompte,
  "6e_proba_issue_tpl_2_roue": corrigerCompte,
  "6e_proba_issue_tpl_3_billes_total": corrigerCompte,
  "6e_proba_issue_tpl_5_compose": corrigerCompte,
  "6e_proba_vocabulaire_tpl_3_mots": (q) => corrigerMot(q, "trois"),
  "6e_proba_vocabulaire_tpl_1": (q) => corrigerMot(q, "cinq"),
  "6e_proba_vocabulaire_tpl_2": corrigerQuelEvenement,
};
