import type { CorrecteurMaths, CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE quadrilateres.bank.ts (06/10/2026, voir types.ts).
// Chacun relit le TEXTE que voit l'élève (noms des sommets, propriétés
// annoncées, longueurs) et le CANVAS s'il y en a un (codages, géométrie des
// points, noms affichés), puis refait le raisonnement avec ses propres tables :
// rien n'est emprunté au gabarit.

type Q = TutorGeneratedQuestionV4;

// ─── Les sommets ────────────────────────────────────────────────────────────

/** Le nom du quadrilatère : le mot de 4 majuscules du texte (pas « FAUX »). */
function nomDuTexte(t: string): string[] | null {
  const m1 = t.match(/([A-Z]), ([A-Z]), ([A-Z]) puis ([A-Z])/);
  if (m1) return m1.slice(1, 5);
  const noms = [...t.matchAll(/(?<![A-Za-zÀ-ÿ])([A-Z]{4})(?![A-Za-zÀ-ÿ])/g)].map((m) => m[1]).filter((x) => x !== "FAUX");
  return noms.length ? noms[0].split("") : null;
}
/** Tous les mots de 4 majuscules du texte désignent-ils le même quadrilatère ? */
function nomsCoherents(t: string, c: string[]): string[] {
  const p: string[] = [];
  for (const m of t.matchAll(/(?<![A-Za-zÀ-ÿ])([A-Z]{4})(?![A-Za-zÀ-ÿ])/g))
    if (m[1] !== "FAUX" && m[1] !== c.join("") && !estNomJuste(m[1], c) && !/nom/.test(t)) p.push(`le texte nomme deux quadrilatères : ${c.join("")} et ${m[1]}`);
  return p;
}
const idx = (c: string[], x: string) => c.indexOf(x);
/** Deux sommets voisins dans le tour. */
const voisins = (c: string[], x: string, y: string) => {
  const d = Math.abs(idx(c, x) - idx(c, y));
  return d === 1 || d === 3;
};
const oppose = (c: string[], x: string) => c[(idx(c, x) + 2) % 4];
/** Un nom de 4 lettres fait-il le tour du quadrilatère c ? */
function estNomJuste(n: string, c: string[]): boolean {
  const l = n.split("");
  if (l.length !== 4 || [...l].sort().join("") !== [...c].sort().join("")) return false;
  return [0, 1, 2, 3].every((i) => voisins(c, l[i], l[(i + 1) % 4]));
}
const estPermutation = (n: string, c: string[]) => n.length === 4 && n.split("").sort().join("") === [...c].sort().join("");
/** « [EG] » → "EG" trié. */
const segs = (s: string) => [...s.matchAll(/\[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2]].sort().join(""));
const estCote = (c: string[], s: string) => voisins(c, s[0], s[1]);
const estDiagonale = (c: string[], s: string) => c.includes(s[0]) && c.includes(s[1]) && !voisins(c, s[0], s[1]) && s[0] !== s[1];

/** QCM : la bonne réponse est l'attendue, et c'est la seule. */
function uneSeule(q: Q, juste: (x: string) => boolean, quoi: string): string[] {
  const ch = (q.choices ?? []).map((x) => x.trim());
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes pour ${quoi} : ${ch.join(" | ")}`];
  if (bons[0] !== q.expected[0].trim()) return [`la proposition juste « ${bons[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
  return [];
}

/** Le canvas affiche-t-il les sommets du texte, dans l'ordre du tour ? */
function canvasNomme(q: Q, c: string[]): string[] {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "quadrilatere") return [];
  const l = cv.labels ?? {};
  const n = ["A", "B", "C", "D"].map((k) => l[k] ?? k).join("");
  return estNomJuste(n, c) ? [] : `le canvas nomme ${n}, le texte ${c.join("")}`.split("§");
}

// ─── QUADRILATERE_NOMMER_VOCABULAIRE ────────────────────────────────────────
const COMPTE: Record<string, number> = { sommets: 4, côtés: 4, angles: 4, diagonales: 2 };
const corrVocabulaire: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c || new Set(c).size !== 4) return [`nom du quadrilatère introuvable : ${t}`];
  const p = [...nomsCoherents(t, c), ...canvasNomme(q, c)];
  const e = q.expected[0];
  const ch = q.choices ?? [];
  let m: RegExpMatchArray | null;
  // 03/11/2026 : « combien d’angles » (élision) aussi.
  if ((m = t.match(/(?:[Cc]ombien de |[Cc]ombien d’|Compte les )(sommets|côtés|angles|diagonales)/))) {
    const n = COMPTE[m[1]];
    p.push(...uneSeule(q, (x) => x === `${n} ${m![1]}`, `le nombre de ${m[1]}`));
    for (const x of ch) if (!x.endsWith(` ${m[1]}`)) p.push(`proposition sans le mot « ${m[1]} » : ${x}`);
  } else if (/nom/.test(t)) {
    for (const x of ch) if (!estPermutation(x, c)) p.push(`« ${x} » n'utilise pas les sommets ${c.join("")}`);
    const cherche = /PAS|FAUX|ne convient pas/.test(t) ? (x: string) => !estNomJuste(x, c) : (x: string) => estNomJuste(x, c);
    p.push(...uneSeule(q, cherche, "le nom"));
    if (/autre nom|renommer|même quadrilatère/.test(t) && e === c.join("")) p.push("le « nouveau » nom est le nom déjà donné");
  } else if ((m = t.match(/(?:opposé au côté|ne touche pas le côté|opposé à) \[([A-Z])([A-Z])\]/))) {
    const [x, y] = [m[1], m[2]];
    const opp = [oppose(c, x), oppose(c, y)].sort().join("");
    p.push(...uneSeule(q, (s) => segs(s)[0] === opp, `le côté opposé à [${x}${y}]`));
    if (!estCote(c, [x, y].sort().join(""))) p.push(`[${x}${y}] n'est pas un côté de ${c.join("")}`);
  } else if ((m = t.match(/(?:opposé au sommet|sommet opposé à|pas voisin de) ([A-Z])/))) {
    p.push(...uneSeule(q, (s) => s === oppose(c, m![1]), `le sommet opposé à ${m[1]}`));
  } else if (/que sont|comment appelle-t-on|Que sont-ils/.test(t)) {
    // La première phrase (la situation) est sautée, sauf si c'est elle qui cite
    // les segments (03/11/2026 : à ★1-★2, souvent plus d'introduction).
    const apres = t.replace(/^[^.]*\./, "");
    const [a, b] = segs(segs(apres).length >= 2 ? apres : t);
    if (!a || !b) return [`deux segments attendus : ${t}`];
    const commun = a.split("").some((x) => b.includes(x));
    const nature =
      estCote(c, a) && estCote(c, b) ? (commun ? "deux côtés consécutifs" : "deux côtés opposés")
      : estDiagonale(c, a) && estDiagonale(c, b) ? "les deux diagonales"
      : "un côté et une diagonale";
    p.push(...uneSeule(q, (x) => x === nature, `la paire ${a}, ${b}`));
  } else if (/diagonales/.test(t)) {
    const diag = [[c[0], c[2]].sort().join(""), [c[1], c[3]].sort().join("")].sort().join("+");
    p.push(...uneSeule(q, (x) => segs(x).sort().join("+") === diag, "les diagonales"));
  } else if (/une diagonale|Laquelle/.test(t)) {
    p.push(...uneSeule(q, (x) => segs(x).length === 1 && estDiagonale(c, segs(x)[0]), "une diagonale"));
  } else p.push(`question non reconnue : ${t}`);
  return p;
};

// ─── QUADRILATERE_IDENTIFIER_NATURE : on relit le CANVAS ───────────────────
type Pt = { x: number; y: number };
const SOMMETS = ["A", "B", "C", "D"] as const;
const COTE_SUIVANT: Record<string, string> = { AB: "BC", BC: "CD", CD: "DA", DA: "AB" };
const normCote = (s: string) => ({ BA: "AB", CB: "BC", DC: "CD", AD: "DA" } as Record<string, string>)[s] ?? s;

/** Ce que les codages permettent d'affirmer, et la cohérence du dessin. */
function lireCodages(cv: any): { nature: string; problemes: string[] } {
  const p: string[] = [];
  const P: Record<string, Pt> = cv.points;
  const m = cv.marks ?? {};
  const droits: string[] = m.rightAnglesAt ?? [];
  // Le dessin respecte-t-il les codages ?
  for (const v of droits) {
    const i = SOMMETS.indexOf(v as any);
    const a = P[SOMMETS[(i + 3) % 4]], o = P[v], b = P[SOMMETS[(i + 1) % 4]];
    const u = { x: a.x - o.x, y: a.y - o.y }, w = { x: b.x - o.x, y: b.y - o.y };
    const cos = (u.x * w.x + u.y * w.y) / Math.hypot(u.x, u.y) / Math.hypot(w.x, w.y);
    if (Math.abs(cos) > 0.03) p.push(`angle codé droit en ${v} mais dessiné à ${Math.round((Math.acos(cos) * 180) / Math.PI)}°`);
  }
  const L = (s: string) => Math.hypot(P[s[0]].x - P[s[1]].x, P[s[0]].y - P[s[1]].y);
  // Les côtés codés égaux : groupes (union des paires).
  const groupe: Record<string, string> = { AB: "AB", BC: "BC", CD: "CD", DA: "DA" };
  const chef = (s: string): string => (groupe[s] === s ? s : chef(groupe[s]));
  for (const [x, y] of m.equalSides ?? []) {
    const [a, b] = [normCote(x), normCote(y)];
    if (Math.abs(L(a) - L(b)) / Math.max(L(a), L(b)) > 0.03) p.push(`côtés ${a} et ${b} codés égaux mais dessinés ${Math.round(L(a))} et ${Math.round(L(b))}`);
    groupe[chef(a)] = chef(b);
  }
  const quatreEgaux = new Set(["AB", "BC", "CD", "DA"].map(chef)).size === 1;
  const consecutifsEgaux = ["AB", "BC", "CD", "DA"].some((s) => chef(s) === chef(COTE_SUIVANT[s]));
  const rect = droits.length >= 3;
  let nature: string;
  if (rect && (quatreEgaux || consecutifsEgaux)) nature = "carré"; // rectangle à deux côtés consécutifs égaux
  else if (rect) nature = "rectangle";
  else if (quatreEgaux && droits.length >= 1) nature = "carré"; // losange à un angle droit
  else if (quatreEgaux) nature = "losange";
  else nature = "aucune";
  return { nature, problemes: p };
}

const corrNature: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "quadrilatere") return ["il faut une figure codée"];
  const p = [...nomsCoherents(t, c), ...canvasNomme(q, c)];
  const { nature, problemes } = lireCodages(cv);
  p.push(...problemes);
  // Le dessin ne doit pas mentir sur ce qu'il ne code pas : à ★1-2 la figure a l'allure de sa nature.
  const rep = nature === "aucune" ? (/AFFIRMER|Seuls les codages|Attention au dessin/.test(t) ? "on ne peut rien affirmer" : "quadrilatère quelconque") : nature;
  p.push(...uneSeule(q, (x) => x === rep, `la nature (${rep})`));
  return p;
};

// ─── LES PROPRIÉTÉS LUES DANS LE TEXTE ──────────────────────────────────────
type Fait = "R" | "L" | "A1" | "C2" | "DE" | "DP" | "M" | "CO" | "PA" | "NR" | "NL";
/** Une propriété écrite (« des diagonales perpendiculaires… », « si ses 4 angles sont droits »). */
function classer(phrase: string): Fait[] | null {
  const c = phrase.toLowerCase().trim();
  const f: Fait[] = [];
  if (/diagonales/.test(c)) {
    if (/même longueur|égales/.test(c)) f.push("DE");
    if (/perpendiculaires/.test(c)) f.push("DP");
    if (/milieu/.test(c) && !/sans se couper|ne se coupent pas/.test(c)) f.push("M");
    return f.length ? f : null;
  }
  if (/aucun angle droit/.test(c)) return ["NR"];
  if (/(4|quatre|3|trois) angles (sont )?droits/.test(c)) return ["R"];
  if (/(^|\s)un (de ses )?angles? (est )?droit/.test(c)) return ["A1"];
  if (/(4|quatre) côtés (sont )?(égaux|de même longueur|ont la même longueur)/.test(c)) return ["L"];
  if (/consécutifs de longueurs différentes/.test(c)) return ["NL"];
  if (/consécutifs (de même longueur|ont la même longueur|sont égaux)/.test(c)) return ["C2"];
  if (/opposés (de même longueur|ont la même longueur)/.test(c)) return ["CO"];
  if (/opposés (sont )?parallèles/.test(c)) return ["PA"];
  return null;
}
/** « X, Y et Z » → les faits ; null si une propriété n'est pas reconnue. */
function lireListe(l: string): { faits: Set<Fait>; inconnues: string[] } {
  const faits = new Set<Fait>();
  const inconnues: string[] = [];
  for (const morceau of l.split(/, | et /)) {
    const f = classer(morceau);
    if (!f) inconnues.push(morceau);
    else f.forEach((x) => faits.add(x));
  }
  return { faits, inconnues };
}
type Nature = "carré" | "rectangle" | "losange" | "aucune";
/** Ce que les faits FORCENT, à partir d'une figure de départ éventuelle. */
function deduire(f: Set<Fait>, depart?: string): { nature: Nature; contradiction: boolean } {
  let rect = depart === "rectangle" || depart === "carré" || f.has("R") || (f.has("DE") && f.has("M"));
  let los = depart === "losange" || depart === "carré" || f.has("L") || (f.has("DP") && f.has("M"));
  if (los && (f.has("A1") || f.has("DE"))) rect = true; // losange à angle droit, ou à diagonales égales
  if (rect && (f.has("C2") || f.has("DP"))) los = true; // rectangle à côtés consécutifs égaux, ou à diagonales perpendiculaires
  const contradiction = (rect && f.has("NR")) || (los && f.has("NL"));
  return { nature: rect && los ? "carré" : rect ? "rectangle" : los ? "losange" : "aucune", contradiction };
}
/** Ce que chaque figure a TOUJOURS (table du correcteur). */
const A_TOUJOURS: Record<string, Fait[]> = {
  carré: ["R", "L", "A1", "C2", "DE", "DP", "M", "CO", "PA"],
  rectangle: ["R", "A1", "DE", "M", "CO", "PA"],
  losange: ["L", "C2", "DP", "M", "CO", "PA"],
};
/** Les faits annoncés : « EFGH a … . », et la figure de départ « EFGH est un rectangle ». */
function faitsDuTexte(t: string): { faits: Set<Fait>; depart?: string; problemes: string[] } {
  const p: string[] = [];
  const faits = new Set<Fait>();
  for (const m of t.matchAll(/(?:(?<![A-Za-z])[A-Z]{4}|Il|Elle) a (?:aussi )?([^.?!…]+)[.?!…]/g)) {
    const r = lireListe(m[1]);
    r.faits.forEach((x) => faits.add(x));
    if (r.inconnues.length) p.push(`propriété non reconnue : « ${r.inconnues.join(" | ")} »`);
  }
  // La figure de départ ouvre sa phrase (« … carton. FGHI est un rectangle. ») ; « conclut que FGHI est un carré » est l'affirmation.
  const d = t.match(/(?:^|[.!?] )[A-Z]{4} est un (rectangle|losange|carré)\./);
  return { faits, depart: d?.[1], problemes: p };
}

// ─── QUADRILATERE_LIEN_PROPRIETE ────────────────────────────────────────────
const corrLien: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const { faits, problemes } = faitsDuTexte(t);
  const p = [...nomsCoherents(t, c), ...problemes];
  if (!faits.size) return [...p, `aucune propriété lue : ${t}`];
  const { nature, contradiction } = deduire(faits);
  if (contradiction) p.push("les propriétés se contredisent");
  if (nature === "aucune") p.push("les propriétés ne forcent aucune figure : la question n'a pas de réponse");
  p.push(...uneSeule(q, (x) => x === nature, `la nature forcée (${nature})`));
  return p;
};

// ─── QUADRILATERE_CONCLUSION : le verdict et son contre-exemple ────────────
/** Les figures « génériques » des contre-exemples, et ce qu'elles ont. */
const GENERIQUES: { re: RegExp; nat: string; a: Fait[] }[] = [
  { re: /losange qui n’est pas un carré/, nat: "losange", a: ["L", "C2", "DP", "M", "CO", "PA", "NR"] },
  { re: /rectangle qui n’est pas un carré/, nat: "rectangle", a: ["R", "A1", "DE", "M", "CO", "PA", "NL"] },
  { re: /sans aucune propriété particulière/, nat: "aucune", a: [] },
];
const NATS = /(carré|rectangle|losange)/g;
function corrigerVerdict(q: Q, t: string, faits: Set<Fait>, depart?: string): string[] {
  const p: string[] = [];
  // La figure affirmée est la dernière nommée (la figure de départ vient avant).
  const dits = [...t.matchAll(NATS)].map((m) => m[1]);
  const affirme = dits[dits.length - 1];
  if (!affirme) return [`figure affirmée introuvable : ${t}`];
  const { nature, contradiction } = deduire(faits, depart);
  if (contradiction) p.push("les propriétés se contredisent");
  if ((affirme !== "losange" && faits.has("NR")) || (affirme !== "rectangle" && faits.has("NL")))
    p.push(`« ${affirme} » est impossible avec ces propriétés : « ce peut être… » ne convient pas`);
  const force = nature === "carré" || nature === affirme;
  const valide = (x: string) => {
    if (/^Oui/.test(x)) return force && x.includes(affirme);
    const g = GENERIQUES.find((k) => k.re.test(x));
    if (!g) return false;
    const aTout = [...faits].every((f) => g.a.includes(f));
    const departOk = !depart || depart === g.nat;
    return !force && aTout && departOk && g.nat !== affirme;
  };
  for (const x of q.choices ?? []) if (!/^Oui/.test(x) && !GENERIQUES.some((k) => k.re.test(x))) p.push(`proposition non reconnue : ${x}`);
  p.push(...uneSeule(q, valide, `le verdict sur « ${affirme} »`));
  return p;
}
const corrConclusion: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const { faits, depart, problemes } = faitsDuTexte(t);
  if (!faits.size) return [...problemes, `aucune propriété lue : ${t}`];
  return [...nomsCoherents(t, c), ...problemes, ...corrigerVerdict(q, t, faits, depart)];
};

// ─── QUADRILATERE_PROPRIETE_DEFI ────────────────────────────────────────────
const corrProprieteDefi: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) {
    // Inclusion : « Un X est-il toujours un Y ? »
    const [x, y] = [...t.matchAll(NATS)].map((m) => m[1]);
    if (!x || !y || x === y) return [`deux figures attendues : ${t}`];
    const toujours = A_TOUJOURS[y].every((f) => A_TOUJOURS[x].includes(f));
    const rep = toujours ? "oui, toujours" : "pas toujours, seulement parfois"; // un carré est à la fois l'un et l'autre
    return uneSeule(q, (z) => z === rep, `« un ${x} est-il un ${y} ? »`);
  }
  const { faits, depart, problemes } = faitsDuTexte(t);
  const p = [...nomsCoherents(t, c), ...problemes];
  if (!depart || !faits.size) return [...p, `figure de départ ou propriété introuvable : ${t}`];
  if (/plus précis|un carré, un rectangle ou un losange/.test(t)) {
    const { nature } = deduire(faits, depart);
    p.push(...uneSeule(q, (x) => x === nature, `la nature (${nature})`));
    return p;
  }
  return [...p, ...corrigerVerdict(q, t, faits, depart)];
};

// ─── LONGUEURS : côtés et diagonales ────────────────────────────────────────
/** Les objets et leurs unités plausibles (table du correcteur). */
const PLAUSIBLE: { re: RegExp; u: string; lo: number; hi: number }[] = [
  { re: /cahier/, u: "cm", lo: 2, hi: 20 },
  { re: /mosaïque/, u: "cm", lo: 2, hi: 15 },
  { re: /potager/, u: "m", lo: 1, hi: 15 },
  { re: /stade/, u: "m", lo: 2, hi: 25 },
  { re: /cerf-volant/, u: "cm", lo: 30, hi: 100 },
  { re: /cadre photo/, u: "cm", lo: 8, hi: 50 },
  { re: /pelouse/, u: "m", lo: 5, hi: 80 },
  { re: /faïence/, u: "cm", lo: 5, hi: 40 },
  { re: /drapeau/, u: "cm", lo: 5, hi: 80 },
  { re: /jeu de piste/, u: "cm", lo: 10, hi: 80 },
  { re: /set de table/, u: "cm", lo: 20, hi: 50 },
  { re: /bassin/, u: "m", lo: 1, hi: 10 },
  { re: /construire|tracer|trace/, u: "cm", lo: 2, hi: 30 },
];
/** Une longueur demandée, recalculée à partir des longueurs données et des propriétés de la figure. */
function corrigerLongueur(q: Q, t: string, c: string[], nat: string): string[] {
  const p: string[] = [];
  const cle = (s: string) => s.replace(/[[\]]/g, "").split("").sort().join("");
  const donnees = new Map<string, number>();
  const unites = new Set<string>();
  for (const m of t.matchAll(/(\[[A-Z]{2}\]) mesure (\d+) (cm|m)\b/g)) {
    donnees.set(cle(m[1]), Number(m[2]));
    unites.add(m[3]);
  }
  const dm = t.match(/(?:mesure|longueur de) (\[[A-Z]{2}\]) ?[?.]$/);
  if (!dm || !donnees.size) return [`longueur demandée ou donnée introuvable : ${t}`];
  if (unites.size !== 1) return [`unités mélangées : ${[...unites].join(", ")}`];
  const u = [...unites][0];
  const lettres = (s: string) => s.split("");
  // I est le point où se coupent les diagonales, sauf si c'est un sommet.
  const centre = (s: string) => !c.includes("I") && s.includes("I");
  const estDiag = (s: string) => !centre(s) && estDiagonale(c, s);
  const valeur = (s: string): number | undefined => {
    if (donnees.has(s)) return donnees.get(s);
    if (centre(s)) {
      const x = lettres(s).find((l) => l !== "I")!;
      const d = valeur([x, oppose(c, x)].sort().join(""));
      return d === undefined ? undefined : d / 2;
    }
    if (estDiag(s)) {
      for (const x of lettres(s)) {
        const demi = donnees.get([x, "I"].sort().join(""));
        if (demi !== undefined) return 2 * demi;
      }
      if (nat === "rectangle" || nat === "carré") {
        const autre = c.filter((l) => !s.includes(l)).sort().join("");
        if (donnees.has(autre)) return donnees.get(autre);
      }
      return undefined;
    }
    // Un côté : dans un rectangle, son opposé ; dans un carré ou un losange, n'importe quel côté.
    const opp = lettres(s).map((l) => oppose(c, l)).sort().join("");
    if (donnees.has(opp)) return donnees.get(opp);
    if (nat === "carré" || nat === "losange") for (const [k, v] of donnees) if (!centre(k) && estCote(c, k)) return v;
    return undefined;
  };
  const demande = cle(dm[1]);
  if (!centre(demande) && !(c.includes(demande[0]) && c.includes(demande[1]))) p.push(`${dm[1]} n'est pas un segment de ${c.join("")}`);
  const v = valeur(demande);
  if (v === undefined) return [...p, `impossible de trouver ${dm[1]} à partir des données : la question n'a pas de réponse sûre`];
  const r = String(q.expected[0]).match(/^(\d+(?:,\d+)?) (cm|m)$/);
  if (!r) p.push(`réponse sans unité : « ${q.expected[0]} »`);
  else {
    if (Number(r[1].replace(",", ".")) !== v) p.push(`longueur attendue « ${q.expected[0]} », recalculée ${v} ${u}`);
    if (r[2] !== u) p.push(`unité de la réponse « ${r[2]} », celle de l'énoncé « ${u} »`);
  }
  const pl = PLAUSIBLE.find((k) => k.re.test(t));
  if (pl) {
    if (pl.u !== u) p.push(`unité peu plausible pour cet objet : ${u}`);
    // Une demi-diagonale ([EI]) peut être plus courte qu'un côté : la moitié du minimum.
    for (const [k, x] of [...donnees, [demande, v] as [string, number]])
      if (x < (centre(k) ? pl.lo / 2 : pl.lo) || x > 1.5 * pl.hi) p.push(`mesure peu plausible : ${x} ${u}`);
  }
  // Un rectangle « donné » ne doit pas avoir ses deux côtés consécutifs égaux (ce serait un carré).
  if (nat === "rectangle") {
    const cotes = [...donnees].filter(([k]) => !centre(k) && estCote(c, k));
    if (cotes.length === 2 && cotes[0][1] === cotes[1][1]) p.push("rectangle aux côtés consécutifs égaux : c'est un carré");
  }
  return p;
}

/** Les questions sur une figure nommée : longueurs, comptes, diagonales, propriété à ajouter. */
const corrFigureNommee: CorrecteurMaths = (q) => {
  const t = q.text;
  const ch = (q.choices ?? []).map((x) => x.trim());
  // « Les diagonales d’un carré doivent être… » : la figure n'est pas nommée.
  const cible = t.match(/(?:tracer|construire) un (carré|rectangle|losange)|diagonales d’un (carré|rectangle|losange) doivent/);
  if (cible && q.format === "qcm" && !/[A-Z]{4}/.test(t)) {
    const nat = cible[1] ?? cible[2];
    return uneSeule(q, (x) => {
      const f = classer(`diagonales ${x}`);
      return !!f && deduire(new Set(f)).nature === nat;
    }, `les diagonales d’un ${nat}`);
  }
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const p = [...nomsCoherents(t, c)];
  // 03/11/2026 : « EFGH est un carré. » et « Carré EFGH : » (énoncés courts de ★1-★2) aussi.
  const nm0 = t.match(/(?:[Cc]arré|[Rr]ectangle|[Ll]osange) [A-Z]{4}/) ?? t.match(/[A-Z]{4} est un (?:carré|rectangle|losange)/);
  const nm = nm0 ? ["", nm0[0].toLowerCase().match(/carré|rectangle|losange/)![0]] : null;
  if (q.format !== "qcm") {
    if (!nm) return [...p, `nature de la figure introuvable : ${t}`];
    return [...p, ...corrigerLongueur(q, t, c, nm[1])];
  }
  let m: RegExpMatchArray | null;
  if ((m = t.match(/[Cc]ombien (?:de |d’)(angles droits|côtés de même longueur)/))) {
    if (!nm) return [...p, `nature de la figure introuvable : ${t}`];
    const a = m[1] === "angles droits" ? A_TOUJOURS[nm[1]].includes("R") : A_TOUJOURS[nm[1]].includes("L");
    if (!a) p.push(`un ${nm[1]} n'a pas forcément 4 ${m[1]} : la question n'a pas de réponse sûre`);
    p.push(...uneSeule(q, (x) => x === (m![1] === "angles droits" ? "4 angles droits" : "4 côtés"), `le nombre de ${m[1]}`));
    return p;
  }
  if (/diagonales de [A-Z]{4}/.test(t)) {
    if (!nm) return [...p, `nature de la figure introuvable : ${t}`];
    const toujours = A_TOUJOURS[nm[1]];
    p.push(...uneSeule(q, (x) => {
      if (/ne se coupent pas|double/.test(x)) return false;
      const f = classer(`diagonales ${x}`);
      return !!f && f.every((k) => toujours.includes(k));
    }, `les diagonales d’un ${nm[1]}`));
    return p;
  }
  // Propriété à ajouter pour obtenir la cible.
  const { faits, depart, problemes } = faitsDuTexte(t);
  p.push(...problemes);
  const cb = t.match(/(?:c’est|soit|pour) un (carré|rectangle|losange)/);
  if (!cb) return [...p, `question non reconnue : ${t}`];
  const atteint = (f: Set<Fait>) => {
    const n = deduire(f, depart).nature;
    return n === "carré" || n === cb[1];
  };
  if (atteint(faits)) p.push(`la figure de départ est déjà un ${cb[1]}`);
  p.push(...uneSeule(q, (x) => {
    const f = classer(x);
    return !!f && atteint(new Set([...faits, ...f]));
  }, `la propriété qui fait un ${cb[1]}`));
  for (const x of ch) if (!classer(x)) p.push(`proposition non reconnue : ${x}`);
  return p;
};

// ─── QUADRILATERE_DISTINGUER ────────────────────────────────────────────────
/** « 4 angles droits » + deux longueurs, ou « 4 côtés de a cm » + un angle : la nature. */
function natureParDonnees(t: string, c: string[]): { nature?: string; problemes: string[] } {
  const p: string[] = [];
  if (/[A-Z]{4} a 4 angles droits\./.test(t)) {
    const L = [...t.matchAll(/\[([A-Z])([A-Z])\] mesure (\d+) cm/g)].map((m) => ({ s: [m[1], m[2]].sort().join(""), v: Number(m[3]) }));
    if (L.length !== 2) return { problemes: [`deux longueurs attendues : ${t}`] };
    for (const l of L) if (!estCote(c, l.s)) p.push(`[${l.s}] n'est pas un côté de ${c.join("")}`);
    const consecutifs = L[0].s.split("").some((x) => L[1].s.includes(x));
    return { nature: consecutifs && L[0].v === L[1].v ? "carré" : "rectangle", problemes: p };
  }
  const l = t.match(/[A-Z]{4} a 4 côtés de (\d+) cm\. Son angle de sommet ([A-Z]) mesure (\d+)°/);
  if (l) {
    if (!c.includes(l[2])) p.push(`${l[2]} n'est pas un sommet de ${c.join("")}`);
    const a = Number(l[3]);
    if (a <= 0 || a >= 180) p.push(`angle impossible : ${a}°`);
    return { nature: a === 90 ? "carré" : "losange", problemes: p };
  }
  return { problemes: [`données non reconnues : ${t}`] };
}
const corrDistinguer: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const p = [...nomsCoherents(t, c)];
  const ch = q.choices ?? [];
  if (/vérifier|vérification|dans les deux cas|en commun/.test(t)) {
    const nats = [...new Set([...t.matchAll(NATS)].map((m) => m[1]))];
    if (nats.length !== 2) return [...p, `deux figures attendues : ${t}`];
    const [x, y] = nats;
    const commun = /dans les deux cas|en commun/.test(t);
    if (ch.some((z) => z.startsWith("si ") !== !commun)) p.push(`propositions mal tournées pour la question : ${ch.join(" | ")}`);
    p.push(...uneSeule(q, (z) => {
      const f = classer(z);
      if (!f || f.length !== 1) return false;
      const [ax, ay] = [A_TOUJOURS[x].includes(f[0]), A_TOUJOURS[y].includes(f[0])];
      return commun ? ax && ay : ax !== ay;
    }, commun ? `ce qu’ont en commun un ${x} et un ${y}` : `ce qui distingue un ${x} d’un ${y}`));
    for (const z of ch) if (!classer(z)) p.push(`proposition non reconnue : ${z}`);
    return p;
  }
  const r = natureParDonnees(t, c);
  p.push(...r.problemes);
  if (r.nature) p.push(...uneSeule(q, (z) => z === r.nature, `la nature (${r.nature})`));
  return p;
};

// ─── QUADRILATERE_DEFI ──────────────────────────────────────────────────────
const corrDefi: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!c) return [`nom du quadrilatère introuvable : ${t}`];
  const p = [...nomsCoherents(t, c)];
  if (/affirme/.test(t)) {
    const { faits, problemes } = faitsDuTexte(t);
    return [...p, ...problemes, ...corrigerVerdict(q, t, faits)];
  }
  if (q.format === "qcm") {
    // Description : angles droits, longueurs des côtés.
    const d = t.match(/[A-Z]{4} a ([^.]+)\./);
    if (!d) return [...p, `description introuvable : ${t}`];
    const f = new Set<Fait>();
    if (/(3|4) angles droits/.test(d[1])) f.add("R");
    if (/aucun angle droit/.test(d[1])) f.add("NR");
    else if (/(^|\s)un angle droit/.test(d[1])) f.add("A1");
    if (/4 côtés de \d+ cm/.test(d[1])) f.add("L");
    const deux = d[1].match(/deux côtés de (\d+) cm et deux côtés de (\d+) cm/) ?? d[1].match(/des côtés de (\d+) cm et de (\d+) cm/);
    if (deux && deux[1] !== deux[2]) f.add("NL");
    const { nature, contradiction } = deduire(f);
    if (contradiction) p.push("la description se contredit");
    p.push(...uneSeule(q, (z) => z === (nature === "aucune" ? "quadrilatère quelconque" : nature), `la nature (${nature})`));
    return p;
  }
  // Périmètres.
  const nm = t.match(/(carré|rectangle|losange) [A-Z]{4}/);
  const per = t.match(/(?:périmètre est de|tour complet mesure|cela fait) (\d+) (cm|m)\b/);
  if (!nm || !per) return [...p, `figure ou périmètre introuvable : ${t}`];
  const [P, u] = [Number(per[1]), per[2]];
  let v: number;
  const cotes: number[] = [];
  if (nm[1] === "rectangle") {
    const g = t.match(/\[([A-Z])([A-Z])\] mesure (\d+) (cm|m)\b/);
    if (!g) return [...p, `côté donné introuvable : ${t}`];
    v = P / 2 - Number(g[3]);
    cotes.push(Number(g[3]), v);
    if (v === Number(g[3])) p.push("rectangle aux côtés égaux : c'est un carré");
    const dm = t.match(/(?:mesure|longueur de) \[([A-Z])([A-Z])\] ?[?.]$/);
    if (!dm) return [...p, `côté demandé introuvable : ${t}`];
    const [s1, s2] = [[g[1], g[2]].sort().join(""), [dm[1], dm[2]].sort().join("")];
    if (!estCote(c, s1) || !estCote(c, s2) || !s1.split("").some((x) => s2.includes(x)) || s1 === s2)
      p.push(`[${s1}] et [${s2}] doivent être deux côtés consécutifs de ${c.join("")}`);
  } else {
    v = P / 4;
    cotes.push(v);
  }
  if (!Number.isInteger(v) || v <= 0) p.push(`côté non entier ou négatif : ${v}`);
  const r = String(q.expected[0]).match(/^(\d+) (cm|m)$/);
  if (!r) p.push(`réponse sans unité : « ${q.expected[0]} »`);
  else {
    if (Number(r[1]) !== v) p.push(`côté attendu « ${q.expected[0]} », recalculé ${v} ${u}`);
    if (r[2] !== u) p.push(`unité de la réponse « ${r[2]} », celle de l'énoncé « ${u} »`);
  }
  const pl = PLAUSIBLE.find((k) => k.re.test(t));
  if (pl) for (const x of cotes) if (pl.u !== u || x < pl.lo || x > 1.5 * pl.hi) p.push(`mesure peu plausible : ${x} ${u}`);
  return p;
};

// =====================================================================
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS « À PLUSIEURS FAÇONS » (bank : section
// du 07/11). Même contrat : on relit le texte et les codages, on refait le
// raisonnement. Une tournure non reconnue est un défaut.
// =====================================================================
const NON_RECONNUE = (t: string) => [`question non reconnue : ${t}`];
/** Oui/non ou vrai/faux : une seule proposition, celle du verdict recalculé. */
function verdictBool(q: Q, vrai: boolean): string[] {
  const c = q.choices ?? [];
  const mot = c.includes("vrai") ? (vrai ? "vrai" : "faux") : vrai ? "oui" : "non";
  return uneSeule(q, (x) => x === mot, `le verdict (${mot})`);
}
const figureDe = (q: Q) => {
  const cv = q.canvas as any;
  return cv?.kind === "quadrilatere" ? cv : null;
};
/** Le côté « AB » du canvas écrit avec les noms affichés, rangé : [EF]. */
const coteAffiche = (cv: any, s: string) => {
  const nom = (k: string) => cv.labels?.[k] ?? k;
  return `[${[nom(s[0]), nom(s[1])].sort().join("")}]`;
};
const natureLue = (cv: any) => lireCodages(cv);
const REP_NATURE = (n: string) => (n === "aucune" ? "quadrilatère quelconque" : n);
/** Dans un tour, le segment écrit est-il un côté du quadrilatère nommé ? */
const est4Lettres = (c: string[] | null) => c && new Set(c).size === 4;
const toujoursA = (nat: string, phrase: string) => {
  const f = classer(phrase);
  return !!f && f.every((k) => A_TOUJOURS[nat].includes(k));
};

// ----- IDENTIFIER_NATURE
const corrIdLire: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  if (!/précis/.test(q.text)) return ["la question ne demande pas le nom le plus précis"];
  const { nature, problemes } = natureLue(cv);
  return [...problemes, ...uneSeule(q, (x) => x === REP_NATURE(nature), `la nature (${nature})`)];
};
const corrIdOuiNon: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const Y = q.text.match(/\b[Uu]n (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  const { nature, problemes } = natureLue(cv);
  return [...problemes, ...verdictBool(q, nature === "carré" || nature === Y)];
};
const corrIdCompter: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const m = cv.marks ?? {};
  const { problemes } = natureLue(cv);
  let n: number;
  if (/angles droits|petits carrés/.test(q.text)) n = (m.rightAnglesAt ?? []).length;
  else if (/côtés/.test(q.text)) n = new Set((m.equalSides ?? []).flat().map(normCote)).size;
  else return NON_RECONNUE(q.text);
  return String(q.expected[0]) === String(n) ? problemes : [...problemes, `attendu ${q.expected[0]}, compté ${n}`];
};
const corrIdIndice: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const Y = q.text.match(/\b(?:[Uu]n|[Cc]e) (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  const { nature, problemes } = natureLue(cv);
  const p = [...problemes];
  if (nature !== Y) p.push(`le texte dit ${Y}, les codages ${nature}`);
  const droits = (cv.marks?.rightAnglesAt ?? []).length === 4;
  const egaux = new Set((cv.marks?.equalSides ?? []).flat().map(normCote)).size === 4;
  const rep = droits && egaux ? "4 angles droits et 4 côtés égaux" : droits ? "4 angles droits" : egaux ? "4 côtés égaux" : "aucun codage";
  return [...p, ...uneSeule(q, (x) => x === rep, `les codages lus (${rep})`)];
};
const corrIdCode: CorrecteurMaths = (q) => {
  const t = q.text;
  if (/petit carré/.test(t)) return uneSeule(q, (x) => x === "un angle droit", "le sens du petit carré");
  if (/même (petit )?trait/.test(t)) return uneSeule(q, (x) => x === "des côtés égaux", "le sens du même trait");
  if (/un angle droit/i.test(t)) return uneSeule(q, (x) => x === "un petit carré", "le code d’un angle droit");
  if (/côtés égaux/.test(t)) return uneSeule(q, (x) => x === "le même petit trait", "le code de côtés égaux");
  return NON_RECONNUE(t);
};
const corrIdSommet: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const d: string[] = cv.marks?.rightAnglesAt ?? [];
  if (d.length !== 1) return [`un seul angle droit codé attendu, lus : ${d.length}`];
  const rep = cv.labels?.[d[0]] ?? d[0];
  return [...natureLue(cv).problemes, ...uneSeule(q, (x) => x === rep, `le sommet codé (${rep})`)];
};
const corrIdCoteCode: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const paire: string[] = cv.marks?.equalSides?.[0] ?? [];
  if (paire.length !== 2) return ["une paire de côtés codés attendue"];
  const [a, b] = paire.map((s) => coteAffiche(cv, s));
  const lu = q.text.match(/\[[A-Z]{2}\]/)?.[0];
  if (lu !== a && lu !== b) return [`${lu} n’est pas un côté codé (${a}, ${b})`];
  const rep = lu === a ? b : a;
  return [...natureLue(cv).problemes, ...uneSeule(q, (x) => x === rep, `le côté codé comme ${lu}`)];
};
const corrManqueCode: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  if (!/carré/.test(q.text)) return NON_RECONNUE(q.text);
  const { nature, problemes } = natureLue(cv);
  if (nature !== "rectangle" && nature !== "losange") return [...problemes, `figure de départ inattendue : ${nature}`];
  const atteint = (x: string) => {
    const f = classer(x);
    return !!f && deduire(new Set(f), nature).nature === "carré";
  };
  return [...problemes, ...uneSeule(q, atteint, "le codage qui fait un carré")];
};

// ----- DEFI, ★2
const CHOIX_NATURE = (q: Q, rep: string) => uneSeule(q, (x) => x === rep, `la nature (${rep})`);
const corrDefiNomPrecis: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!est4Lettres(c)) return [`nom du quadrilatère introuvable : ${t}`];
  if (!/précis/.test(t)) return ["la question ne demande pas le nom le plus précis"];
  let m: RegExpMatchArray | null;
  if (/losange (?:[A-Z]{4} )?avec un angle droit/i.test(t)) return CHOIX_NATURE(q, "carré");
  if ((m = t.match(/(?:osange [A-Z]{4} : un angle|est un losange\. Un de ses angles) mesure (\d+)°/))) return CHOIX_NATURE(q, Number(m[1]) === 90 ? "carré" : "losange");
  const consec = (x: string, y: string) => {
    const [u, v] = [x.split("").sort().join(""), y.split("").sort().join("")];
    return estCote(c!, u) && estCote(c!, v) && u !== v && u.split("").some((l) => v.includes(l));
  };
  if ((m = t.match(/\[([A-Z]{2})\] et \[([A-Z]{2})\] mesurent \d+ cm/))) {
    if (!consec(m[1], m[2])) return ["les deux côtés ne sont pas consécutifs"];
    return CHOIX_NATURE(q, "carré");
  }
  if ((m = t.match(/\[([A-Z]{2})\] = (\d+) cm, \[([A-Z]{2})\] = (\d+) cm/))) {
    if (!consec(m[1], m[3])) return ["les deux côtés ne sont pas consécutifs"];
    return CHOIX_NATURE(q, m[2] === m[4] ? "carré" : "rectangle");
  }
  return NON_RECONNUE(t);
};
/** Longueur en cm attendue. */
function attenduCm(q: Q, v: number): string[] {
  if (!Number.isInteger(v) || v <= 0) return [`longueur impossible : ${v}`];
  return String(q.expected[0]) === `${v} cm` ? [] : [`attendu « ${q.expected[0]} », recalculé ${v} cm`];
}
const corrPerimetre: CorrecteurMaths = (q) => {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if ((m = t.match(/[Rr]ectangle.*?(?:de|mesure) (\d+) cm sur (\d+) cm/))) {
    if (m[1] === m[2]) return ["rectangle aux côtés égaux"];
    return attenduCm(q, 2 * (Number(m[1]) + Number(m[2])));
  }
  if ((m = t.match(/périmètre (\d+) cm, longueur (\d+) cm/))) return attenduCm(q, Number(m[1]) / 2 - Number(m[2]));
  if ((m = t.match(/(?:un |de )périmètre (?:de )?(\d+) cm/))) return attenduCm(q, Number(m[1]) / 4);
  if ((m = t.match(/(?:des côtés de|de côté) (\d+) cm/))) {
    // « Carré de côté 5 cm : longueur du tour » ou « des 4 côtés ».
    if (/périmètre|tour|4 côtés/.test(t)) return attenduCm(q, 4 * Number(m[1]));
  }
  return NON_RECONNUE(t);
};
const corrDefiInclusion: CorrecteurMaths = (q) => {
  const [x, y] = [...q.text.matchAll(NATS)].map((m) => m[1]);
  if (!x || !y || x === y) return [`deux figures attendues : ${q.text}`];
  return verdictBool(q, A_TOUJOURS[y].every((f) => A_TOUJOURS[x].includes(f)));
};
const corrDefiCompte: CorrecteurMaths = (q) => {
  const t = q.text;
  let m: RegExpMatchArray | null;
  let n: number;
  if ((m = t.match(/Rectangle de (\d+) cm sur (\d+) cm\. Combien de côtés de (\d+) cm/))) {
    if (m[1] === m[2] || (m[3] !== m[1] && m[3] !== m[2])) return ["longueur demandée hors du rectangle"];
    n = 2;
  } else if ((m = t.match(/(?:Carré|Losange) de côté (\d+) cm\. Combien de côtés mesurent (\d+) cm/))) {
    if (m[1] !== m[2]) return ["longueur demandée différente du côté"];
    n = 4;
  } else if (/paires de côtés opposés/.test(t)) n = 2;
  else if (/combien de côtés égaux/.test(t)) n = 4;
  else if (/combien de diagonales/.test(t)) n = 2;
  else return NON_RECONNUE(t);
  return String(q.expected[0]) === String(n) ? [] : [`attendu ${q.expected[0]}, recalculé ${n}`];
};
const corrDefiPenche: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const Y = q.text.match(/\b[Uu]n (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  const { nature, problemes } = natureLue(cv);
  return [...problemes, ...verdictBool(q, nature === "carré" || nature === Y)];
};
const corrDefiIntrus: CorrecteurMaths = (q) => {
  const Y = q.text.match(/\b[Uu]n (rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  for (const x of q.choices ?? []) if (!classer(x)) return [`proposition non reconnue : ${x}`];
  return uneSeule(q, (x) => !toujoursA(Y, x), `la propriété qu’un ${Y} n’a pas toujours`);
};

// ----- COMPLETER_CONSTRUIRE
const corrCompFaut: CorrecteurMaths = (q) => {
  const Y = q.text.match(/\b[Uu]n (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  const prop = q.text.match(/4 angles droits|4 côtés égaux/)?.[0];
  if (!Y || !prop) return NON_RECONNUE(q.text);
  return verdictBool(q, toujoursA(Y, prop));
};
const corrCompOutil: CorrecteurMaths = (q) => {
  const t = q.text;
  if (/angle droit|coin/.test(t)) return uneSeule(q, (x) => x === "une équerre", "l’instrument de l’angle droit");
  if (/côté|mesures-tu/.test(t)) return uneSeule(q, (x) => x === "une règle graduée", "l’instrument de la longueur");
  return NON_RECONNUE(t);
};
const corrCompSommet: CorrecteurMaths = (q) => {
  const t = q.text;
  const N = t.match(/(?<![A-Za-zÀ-ÿ])[A-Z]{4}(?![A-Za-zÀ-ÿ])/)?.[0];
  if (!N) return [`nom du quadrilatère introuvable : ${t}`];
  const trou = t.match(/([A-Z]*)…([A-Z]*)/);
  let manque: string[];
  if (trou) {
    const vus = trou[1] + trou[2];
    if (vus.length !== 3) return [`le trou du nom laisse ${vus.length} lettres`];
    if (`${trou[1]}?${trou[2]}`.split("").some((l, i) => l !== "?" && l !== N[i])) return ["le nom troué ne suit pas le nom du quadrilatère"];
    manque = N.split("").filter((l) => !vus.includes(l));
  } else {
    const m = t.match(/([A-Z]), ([A-Z]) et ([A-Z])/);
    if (!m) return NON_RECONNUE(t);
    const vus = m.slice(1, 4);
    if (vus.some((l) => !N.includes(l))) return ["une lettre placée n’est pas un sommet"];
    manque = N.split("").filter((l) => !vus.includes(l));
  }
  if (manque.length !== 1) return [`${manque.length} lettres manquent`];
  return q.expected[0] === manque[0] ? [] : [`attendu ${q.expected[0]}, recalculé ${manque[0]}`];
};
const corrCompCoteSuivant: CorrecteurMaths = (q) => {
  const t = q.text;
  const N = t.match(/(?<![A-Za-zÀ-ÿ])[A-Z]{4}(?![A-Za-zÀ-ÿ])/)?.[0];
  if (!N) return [`nom du quadrilatère introuvable : ${t}`];
  const c = N.split("");
  const cote = (i: number) => `[${[c[i % 4], c[(i + 1) % 4]].sort().join("")}]`;
  const tous = [0, 1, 2, 3].map(cote);
  if (/termine/.test(t)) return uneSeule(q, (x) => x === cote(3), "le côté qui termine le tour");
  if (/tu as tracé/.test(t)) {
    const faits = [...t.matchAll(/\[[A-Z]{2}\]/g)].map((m) => m[0]);
    if (faits.length !== 3 || faits.some((f) => !tous.includes(f))) return ["trois côtés du quadrilatère attendus"];
    return uneSeule(q, (x) => tous.includes(x) && !faits.includes(x), "le côté qui manque");
  }
  const lu = t.match(/\[[A-Z]{2}\]/)?.[0];
  const i = tous.indexOf(lu ?? "");
  if (i < 0 || i === 3) return [`côté de départ inattendu : ${lu}`];
  return uneSeule(q, (x) => x === cote(i + 1), `le côté après ${lu}`);
};
const corrCompReste: CorrecteurMaths = (q) => {
  const k = Number(q.text.match(/\b([1-3]) (?:côtés?|angles? droits?|sommets?)/)?.[1]);
  if (!k) return NON_RECONNUE(q.text);
  return String(q.expected[0]) === String(4 - k) ? [] : [`attendu ${q.expected[0]}, recalculé ${4 - k}`];
};
const corrCompLongueur: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!est4Lettres(c)) return [`nom du quadrilatère introuvable : ${t}`];
  const v = Number(t.match(/(\d+) cm/)?.[1]);
  const segsLus = [...t.matchAll(/\[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2]].sort().join(""));
  const p: string[] = [];
  for (const s of segsLus) if (!estCote(c!, s)) p.push(`[${s}] n’est pas un côté de ${c!.join("")}`);
  if (/[Rr]ectangle/.test(t)) {
    if (segsLus.length !== 2) return ["deux côtés attendus"];
    const opp = segsLus[0].split("").map((l) => oppose(c!, l)).sort().join("");
    if (opp !== segsLus[1]) p.push("le côté demandé n’est pas opposé au côté donné");
  } else if (!/carré|Carré|losange|Losange/.test(t)) return NON_RECONNUE(t);
  return [...p, ...attenduCm(q, v)];
};
const corrCompDevient: CorrecteurMaths = (q) => {
  const t = q.text;
  const d = t.match(/\b[Uu]n (rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  const prop = t.match(/4 côtés égaux|4 angles droits|un angle droit|des côtés opposés parallèles/)?.[0];
  if (!d || !prop || !/précis/.test(t)) return NON_RECONNUE(t);
  const { nature } = deduire(new Set(classer(prop) ?? []), d);
  return CHOIX_NATURE(q, nature);
};
const corrCompEquerre: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!est4Lettres(c)) return [`nom du quadrilatère introuvable : ${t}`];
  if (!/[Rr]ectangle|[Cc]arré/.test(t)) return ["figure sans angles droits"];
  if (/instrument/.test(t)) {
    const S = t.match(/angle droit en ([A-Z])/)?.[1];
    if (!S || !c!.includes(S)) return ["sommet de l’angle droit introuvable"];
    return uneSeule(q, (x) => x === "une équerre", "l’instrument");
  }
  if (/degrés/.test(t)) return q.expected[0] === "90°" && q.comparator === "number_equal" ? [] : [`attendu ${q.expected[0]}`];
  if (/quel angle/.test(t)) return uneSeule(q, (x) => x === "un angle droit", "l’angle");
  return NON_RECONNUE(t);
};
const corrCompDiag: CorrecteurMaths = (q) => {
  const Y = q.text.match(/d’un (rectangle|losange)/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  return uneSeule(q, (x) => {
    const f = classer(`diagonales ${x}`);
    return !!f && f.every((k) => A_TOUJOURS[Y].includes(k));
  }, `les diagonales d’un ${Y}`);
};
const corrCompManque: CorrecteurMaths = (q) => {
  const t = q.text;
  if (!/carré/.test(t)) return NON_RECONNUE(t);
  const depart = /4 angles droits|[Rr]ectangle/.test(t) ? "rectangle" : /4 côtés égaux|[Ll]osange/.test(t) ? "losange" : null;
  if (!depart) return NON_RECONNUE(t);
  for (const x of q.choices ?? []) if (!classer(x)) return [`proposition non reconnue : ${x}`];
  return uneSeule(q, (x) => deduire(new Set(classer(x) ?? []), depart).nature === "carré", "ce qui fait un carré");
};

// ----- LIEN_PROPRIETE, ★1
const corrLienOuiNon: CorrecteurMaths = (q) => {
  const Y = q.text.match(/\b(?:[Uu]n|[Tt]out) (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  const prop = q.text.match(/4 angles droits|4 côtés égaux/)?.[0];
  if (!Y || !prop) return NON_RECONNUE(q.text);
  return verdictBool(q, toujoursA(Y, prop));
};
const corrLienDevinette: CorrecteurMaths = (q) => {
  const t = q.text;
  const f = new Set<Fait>();
  if (/4 angles droits/.test(t)) f.add("R");
  if (/4 côtés égaux/.test(t)) f.add("L");
  if (/aucun angle droit/.test(t)) f.add("NR");
  if (/côtés inégaux/.test(t)) f.add("NL");
  if (!f.size) return NON_RECONNUE(t);
  const { nature, contradiction } = deduire(f);
  return contradiction ? ["la description se contredit"] : CHOIX_NATURE(q, nature);
};
const corrLienPropDeNat: CorrecteurMaths = (q) => {
  const Y = q.text.match(/\b(?:[Uu]n|[Tt]out) (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  const juste = (x: string) => {
    if (/aucun|seulement|3 côtés/.test(x)) return false;
    return x.split(" et ").every((b) => toujoursA(Y, b));
  };
  return uneSeule(q, juste, `ce qu’a toujours un ${Y}`);
};
const corrLienFaitUn: CorrecteurMaths = (q) => {
  const Y = q.text.match(/\b[Uu]n (carré|rectangle|losange)(?![a-zà-ÿ])/)?.[1];
  if (!Y) return NON_RECONNUE(q.text);
  return uneSeule(q, (x) => deduire(lireListe(x).faits).nature === Y, `ce qui donne un ${Y}`);
};

// ----- NOMMER_VOCABULAIRE, ★2
const corrNommerSommets: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/\[([A-Z])([A-Z])\] et \[([A-Z])([A-Z])\]/))) {
    const [u, v] = [m[1] + m[2], m[3] + m[4]];
    const commun = u.split("").filter((l) => v.includes(l));
    if (commun.length !== 1) return [`${commun.length} sommet(s) commun(s)`];
    return uneSeule(q, (x) => x === commun[0], "le sommet commun");
  }
  if (!est4Lettres(c)) return [`nom du quadrilatère introuvable : ${t}`];
  if ((m = t.match(/(?:voisin(?:e)? de|un voisin de|relié à|partent de|touchent) ([A-Z])\b/))) {
    const P = m[1];
    if (!c!.includes(P)) return [`${P} n’est pas un sommet`];
    if (/combien/i.test(t)) {
      const n = /diagonales/.test(t) ? 1 : /côtés/.test(t) ? 2 : 0;
      if (!n) return NON_RECONNUE(t);
      return String(q.expected[0]) === String(n) ? [] : [`attendu ${q.expected[0]}, recalculé ${n}`];
    }
    return uneSeule(q, (x) => c!.includes(x) && x !== P && voisins(c!, x, P), `un voisin de ${P}`);
  }
  return NON_RECONNUE(t);
};
const corrNommerSegment: CorrecteurMaths = (q) => {
  const t = q.text;
  const c = nomDuTexte(t);
  if (!est4Lettres(c)) return [`nom du quadrilatère introuvable : ${t}`];
  const s = segs(t)[0];
  if (!s) return NON_RECONNUE(t);
  const p = canvasNomme(q, c!);
  const cote = estCote(c!, s);
  const diag = estDiagonale(c!, s);
  if (!cote && !diag) return [...p, `[${s}] n’est ni un côté ni une diagonale`];
  if ((q.choices ?? []).includes("un sommet")) return [...p, ...uneSeule(q, (x) => x === (cote ? "un côté" : "une diagonale"), "la nature du segment")];
  if (/un côté/.test(t)) return [...p, ...verdictBool(q, cote)];
  if (/une diagonale/.test(t)) return [...p, ...verdictBool(q, diag)];
  return [...p, ...NON_RECONNUE(t)];
};

// ----- DISTINGUER, ★2
const corrDistFigure: CorrecteurMaths = (q) => {
  const cv = figureDe(q);
  if (!cv) return ["il faut une figure codée"];
  const nats = new Set([...q.text.toLowerCase().matchAll(NATS)].map((m) => m[1]));
  if (nats.size !== 2) return [`deux figures attendues : ${q.text}`];
  const { nature, problemes } = natureLue(cv);
  if (!nats.has(nature)) return [...problemes, `les codages disent ${nature}, hors du choix`];
  if (nature === "carré") return [...problemes, "un carré serait aussi l’autre figure : question ambiguë"];
  return [...problemes, ...uneSeule(q, (x) => x === nature, `la nature (${nature})`)];
};

export const CORRECTEURS: CorrecteursMaths = {
  quadrilatere_identifier_nature_tpl_n1_lire: corrIdLire,
  quadrilatere_identifier_nature_tpl_n1_ouinon: corrIdOuiNon,
  quadrilatere_identifier_nature_tpl_n1_compter: corrIdCompter,
  quadrilatere_identifier_nature_tpl_n1_indice: corrIdIndice,
  quadrilatere_identifier_nature_tpl_n1_code: corrIdCode,
  quadrilatere_identifier_nature_tpl_n1_sommet: corrIdSommet,
  quadrilatere_identifier_nature_tpl_n2_lire: corrIdLire,
  quadrilatere_identifier_nature_tpl_n2_ouinon: corrIdOuiNon,
  quadrilatere_identifier_nature_tpl_n2_compter: corrIdCompter,
  quadrilatere_identifier_nature_tpl_n2_indice: corrIdIndice,
  quadrilatere_identifier_nature_tpl_n2_cote_code: corrIdCoteCode,
  quadrilatere_identifier_nature_tpl_n2_manque: corrManqueCode,
  quadrilatere_defi_tpl_n2_nom_precis: corrDefiNomPrecis,
  quadrilatere_defi_tpl_n2_perimetre: corrPerimetre,
  quadrilatere_defi_tpl_n2_inclusion: corrDefiInclusion,
  quadrilatere_defi_tpl_n2_compte: corrDefiCompte,
  quadrilatere_defi_tpl_n2_penche: corrDefiPenche,
  quadrilatere_defi_tpl_n2_intrus: corrDefiIntrus,
  quadrilatere_completer_construire_tpl_n1_faut: corrCompFaut,
  quadrilatere_completer_construire_tpl_n1_outil: corrCompOutil,
  quadrilatere_completer_construire_tpl_n1_sommet: corrCompSommet,
  quadrilatere_completer_construire_tpl_n1_cote_suivant: corrCompCoteSuivant,
  quadrilatere_completer_construire_tpl_n1_reste: corrCompReste,
  quadrilatere_completer_construire_tpl_n1_longueur: corrCompLongueur,
  quadrilatere_completer_construire_tpl_n2_devient: corrCompDevient,
  quadrilatere_completer_construire_tpl_n2_equerre: corrCompEquerre,
  quadrilatere_completer_construire_tpl_n2_total: corrPerimetre,
  quadrilatere_completer_construire_tpl_n2_diagonales: corrCompDiag,
  quadrilatere_completer_construire_tpl_n2_manque: corrCompManque,
  quadrilatere_completer_construire_tpl_n2_manque_code: corrManqueCode,
  quadrilatere_lien_propriete_tpl_n1_ouinon: corrLienOuiNon,
  quadrilatere_lien_propriete_tpl_n1_devinette: corrLienDevinette,
  quadrilatere_lien_propriete_tpl_n1_propriete: corrLienPropDeNat,
  quadrilatere_lien_propriete_tpl_n1_fait_un: corrLienFaitUn,
  quadrilatere_nommer_vocabulaire_tpl_n2_sommets: corrNommerSommets,
  quadrilatere_nommer_vocabulaire_tpl_n2_segment: corrNommerSegment,
  quadrilatere_distinguer_tpl_n2_figure: corrDistFigure,
  quadrilatere_distinguer_tpl_n3_figure: corrDistFigure,
  quadrilatere_lien_propriete_tpl_n2_ouinon: corrLienOuiNon,

  quadrilatere_distinguer_tpl_1: corrDistinguer,
  quadrilatere_distinguer_tpl_verifier: corrDistinguer,
  quadrilatere_distinguer_qcm_tpl_carre_ou_rectangle: corrDistinguer,

  quadrilatere_defi_tpl_nature: corrDefi,
  quadrilatere_defi_tpl_nature_pieges: corrDefi,
  quadrilatere_defi_tpl_ouverte: corrDefi,
  quadrilatere_defi_tpl_perimetre_cote: corrDefi,
  quadrilatere_defi_tpl_rectangle_perimetre: corrDefi,

  quadrilatere_lire_propriete_tpl_1: corrFigureNommee,
  quadrilatere_lire_propriete_tpl_cotes: corrFigureNommee,
  quadrilatere_lire_propriete_tpl_diagonales: corrFigureNommee,

  quadrilatere_completer_construire_tpl_1: corrFigureNommee,
  quadrilatere_completer_construire_tpl_cotes: corrFigureNommee,
  quadrilatere_completer_construire_tpl_ajouter: corrFigureNommee,

  quadrilatere_conclusion_tpl_1: corrConclusion,
  quadrilatere_conclusion_tpl_cotes_angles: corrConclusion,
  quadrilatere_conclusion_tpl_contre_exemple: corrConclusion,

  quadrilatere_propriete_defi_tpl_5: corrProprieteDefi,
  quadrilatere_propriete_defi_tpl_inclusion: corrProprieteDefi,
  quadrilatere_propriete_defi_tpl_verdict: corrProprieteDefi,

  quadrilatere_lien_propriete_tpl_1: corrLien,
  quadrilatere_lien_propriete_tpl_cotes_angles: corrLien,
  quadrilatere_lien_propriete_tpl_diagonales: corrLien,

  quadrilatere_identifier_nature_tpl_1: corrNature,
  quadrilatere_identifier_nature_tpl_droit: corrNature,
  quadrilatere_identifier_nature_tpl_allure: corrNature,
  quadrilatere_identifier_nature_qcm_tpl_codages: corrNature,

  quadrilatere_nommer_vocabulaire_tpl_1: corrVocabulaire,
  quadrilatere_nommer_vocabulaire_tpl_compter_nommer: corrVocabulaire,
  quadrilatere_nommer_vocabulaire_qcm_tpl_oppose_diagonale: corrVocabulaire,
  quadrilatere_nommer_vocabulaire_qcm_tpl_nom_faux: corrVocabulaire,
};
