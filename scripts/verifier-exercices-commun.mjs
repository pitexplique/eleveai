// Le socle commun des scripts de recalcul des feuilles d'exercices (21/09/2026).
//
// ⭐ POURQUOI UN MODULE : Frédéric a demandé les huit feuilles de « Nombres et
// calculs » en seconde d'un coup. Chaque script de notion ne garde que ses
// CALCULS ; tout ce qui est identique d'une feuille à l'autre vit ici — la
// lecture du fichier, la structure 8 + 8 + 4, les dollars, les micros, et les
// contrôles négatifs.
//
// ⭐⭐ LES CONTRÔLES NÉGATIFS SONT JOUÉS EN MÉMOIRE. La leçon du 20/09
// (feuille des fractions de 5e) : un contrôle négatif doit PROUVER qu'il a été
// joué — mon premier `sed` ne cassait rien, et le script disait vert. Ici,
// chaque casse remplace un morceau du texte source EN MÉMOIRE et repasse tout le
// vérificateur dessus. Le script refuse une casse dont le morceau est introuvable
// ou ambigu (« NON joué »), et vérifie en fin de course que le fichier sur le
// disque est identique, à l'octet, à celui du début. Rien à restaurer.
//
// Les fractions sont EXACTES (BigInt) : `puissance()` multiplie facteur par
// facteur, elle ne passe jamais par les règles des exposants. C'est ce qui fait
// du recalcul un AUTRE chemin que le corrigé.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ── Fractions exactes ───────────────────────────────────────────────────── */

const pgcdB = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};
export function Q(n, d = 1n) {
  n = BigInt(n);
  d = BigInt(d);
  if (d === 0n) throw new Error("division par zéro");
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = pgcdB(n, d) || 1n;
  return { n: n / g, d: d / g };
}
export const fois = (a, b) => Q(a.n * b.n, a.d * b.d);
export const div = (a, b) => Q(a.n * b.d, a.d * b.n);
export const plus = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
export const moins = (a, b) => Q(a.n * b.d - b.n * a.d, a.d * b.d);
export const oppose = (a) => Q(-a.n, a.d);
export const egal = (a, b) => a.n === b.n && a.d === b.d;
export const inf = (a, b) => a.n * b.d < b.n * a.d;
export const versNombre = (a) => Number(a.n) / Number(a.d);

/** aᵉ par multiplications répétées — JAMAIS par les règles des exposants. */
export function puissance(a, e) {
  let r = Q(1);
  for (let i = 0; i < Math.abs(e); i++) r = fois(r, a);
  return e < 0 ? div(Q(1), r) : r;
}

/** Un décimal écrit « 0,25 », « -1,5 » ou 450 → fraction exacte. */
export function D(s) {
  const t = String(s).replace(",", ".").trim();
  const signe = t.startsWith("-") ? -1n : 1n;
  const [e, f = ""] = t.replace("-", "").split(".");
  return Q(signe * BigInt(e + f), 10n ** BigInt(f.length));
}

/** m × 10ᵉ, exact. */
export const sci = (m, e) => fois(D(m), puissance(Q(10), e));

/* ── Écriture d'un nombre comme dans les feuilles ────────────────────────── */

/** `1\,073\,741\,824`, `0{,}25`, `-3{,}5` — un décimal FINI, sinon erreur. */
export function tex(a) {
  let k = 0;
  let x = a;
  while (x.d !== 1n && k < 20) {
    x = fois(x, Q(10));
    k++;
  }
  if (x.d !== 1n) throw new Error(`décimal infini : ${a.n}/${a.d}`);
  const neg = x.n < 0n;
  const s = (neg ? -x.n : x.n).toString().padStart(k + 1, "0");
  const ent = s.slice(0, s.length - k);
  const dec = s.slice(s.length - k).replace(/0+$/, "");
  return (neg ? "-" : "") + ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (dec ? "{,}" + dec : "");
}

/** `2{,}5 \times 10^{13}` : la notation scientifique d'un nombre positif. */
export function texSci(a) {
  let m = a;
  let e = 0;
  while (inf(m, Q(1))) {
    m = fois(m, Q(10));
    e--;
  }
  while (!inf(m, Q(10))) {
    m = div(m, Q(10));
    e++;
  }
  return `${tex(m)} \\times 10^{${e}}`;
}

/** `\dfrac{7}{20}` pour une fraction, l'entier sinon. */
export const texFrac = (a) =>
  a.d === 1n ? tex(a) : `${a.n < 0n ? "-" : ""}\\dfrac{${a.n < 0n ? -a.n : a.n}}{${a.d}}`;

const echappe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Le corrigé écrit-il « = base^n » ? `3^9` et `3^{9}` sont acceptés, `3^{19}` non. */
export function litPuissance(texte, base, n) {
  const exp = n >= 0 && n < 10 ? `(?:\\{${n}\\}|${n}(?!\\d))` : `\\{${n}\\}`;
  return new RegExp(`=\\s*${echappe(String(base))}\\^${exp}`).test(texte);
}

/* ── Lire une expression en x TELLE QU'ELLE EST ÉCRITE ───────────────────── */
//
// ⭐ Pour les feuilles de calcul littéral (développer, factoriser, identités,
// équations) : le script ne recopie pas le résultat dans son propre langage, il
// LIT la chaîne LaTeX du corrigé — `(x - 7)(x + 1)`, `4x(3x - 2)`, `-x^2 + 2x + 8`
// — et l'évalue en fractions exactes. Une faute de frappe dans le corrigé se
// voit donc, alors qu'une traduction à la main l'aurait corrigée en silence.
//
// Sait lire : entiers et décimaux `2{,}5`, `x`, `^2` ou `^{12}`, parenthèses,
// crochets, `\left( \right)`, `\times`, le produit implicite `3x(x + 1)`.

// `\dfrac{a}{b}` se lit dans les deux modes ; `\sqrt{…}` seulement en mode
// RÉEL (décimal), puisqu'une racine n'est pas une fraction exacte.

const EXACT = { nb: D, plus, moins, fois, div, oppose, puis: puissance, racine: () => { throw new Error("√ en mode exact : utiliser evalTexReel"); } };
const REEL = {
  nb: (s) => parseFloat(s),
  plus: (a, b) => a + b,
  moins: (a, b) => a - b,
  fois: (a, b) => a * b,
  div: (a, b) => a / b,
  oppose: (a) => -a,
  puis: (a, e) => a ** e,
  racine: Math.sqrt,
};

export function evalTex(texte, x, ops = EXACT) {
  const s = texte
    .replace(/\\left|\\right/g, "")
    .replace(/\\times/g, "*")
    .replace(/\\d?frac/g, "F")
    .replace(/\\sqrt/g, "R")
    .replace(/\\,/g, "")
    .replace(/\{,\}/g, ".")
    .replace(/[[]/g, "(")
    .replace(/[\]]/g, ")")
    .replace(/\s+/g, "");
  let i = 0;
  const peek = () => s[i];
  const expr = () => {
    let v = terme();
    while (peek() === "+" || peek() === "-") {
      const op = s[i++];
      const t = terme();
      v = op === "+" ? ops.plus(v, t) : ops.moins(v, t);
    }
    return v;
  };
  const terme = () => {
    let negatif = false;
    while (peek() === "-" || peek() === "+") if (s[i++] === "-") negatif = !negatif;
    let v = facteur();
    while (i < s.length && (peek() === "*" || /[\dx(FR{]/.test(peek()))) {
      if (peek() === "*") i++;
      v = ops.fois(v, facteur());
    }
    return negatif ? ops.oppose(v) : v;
  };
  const facteur = () => {
    let b = base();
    if (peek() === "^") {
      i++;
      let e;
      if (peek() === "{") {
        const j = s.indexOf("}", i);
        e = parseInt(s.slice(i + 1, j), 10);
        i = j + 1;
      } else e = parseInt(s[i++], 10);
      b = ops.puis(b, e);
    }
    return b;
  };
  const groupe = () => {
    if (s[i++] !== "{") throw new Error(`accolade attendue à la position ${i - 1} : ${texte}`);
    const v = expr();
    if (s[i++] !== "}") throw new Error(`accolade non fermée : ${texte}`);
    return v;
  };
  const base = () => {
    const c = peek();
    if (c === "(") {
      i++;
      const v = expr();
      if (s[i++] !== ")") throw new Error(`parenthèse non fermée : ${texte}`);
      return v;
    }
    if (c === "{") return groupe();
    if (c === "F") {
      i++;
      const a = groupe();
      return ops.div(a, groupe());
    }
    if (c === "R") {
      i++;
      return ops.racine(groupe());
    }
    if (c === "x") {
      i++;
      return x;
    }
    const m = /^\d+(\.\d+)?/.exec(s.slice(i));
    if (!m) throw new Error(`illisible à la position ${i} : ${texte}`);
    i += m[0].length;
    return ops.nb(m[0]);
  };
  const v = expr();
  if (i !== s.length) throw new Error(`reste non lu « ${s.slice(i)} » : ${texte}`);
  return v;
}

/** La même lecture en décimal, pour les expressions à racines. */
export const evalTexReel = (texte, x = 0) => evalTex(texte, x, REEL);

/** Neuf valeurs de x, dont des négatifs et une fraction : deux polynômes de
 *  degré au plus 8 qui y coïncident sont égaux. */
export const VALEURS_X = [-3, -2, -1, 0, 1, 2, 3, 7].map((n) => Q(n)).concat([Q(1, 2)]);

/** Les deux écritures désignent-elles la même expression ? */
export const identiques = (a, b) => VALEURS_X.every((x) => egal(evalTex(a, x), evalTex(b, x)));

/**
 * Les trois contrôles du calcul littéral, liés à une feuille lue.
 * - `chaine(k, orig, forme)` : « orig = … = forme$ » dans UNE formule du
 *   corrigé k, orig lu dans l'énoncé, et les deux écritures identiques. C'est la
 *   leçon de la feuille des puissances : un résultat se lit À SA PLACE, pas
 *   quelque part dans le texte.
 * - `vaut(k, orig, forme, phrase)` : identiques, et la phrase qui porte la forme est écrite.
 * - `solutions(k, gauche, droite, sols, phrase)` : chaque solution annule
 *   gauche − droite, qui n'est pas nulle partout et reste de degré ≤ 2 — deux
 *   solutions distinctes sont donc TOUTES les solutions.
 */
export function outilsAlgebre(v, { enonces, corrections }) {
  const e = (k) => enonces[k - 1] ?? "";
  const c = (k) => corrections[k - 1] ?? "";
  const echappe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const chaine = (k, orig, forme, { enonce = true } = {}) => {
    const re = new RegExp(`${echappe(orig)}(?: = [^$]*)? = ${echappe(forme)}\\$`);
    const id = identiques(orig, forme);
    const lu = re.test(c(k));
    const dansEnonce = !enonce || e(k).includes(orig);
    v.ok(`${k}. ${orig} = ${forme}`, id && lu && dansEnonce, `identiques : ${id} ; lu dans le corrigé : ${lu} ; dans l'énoncé : ${dansEnonce}`);
  };
  const vaut = (k, orig, forme, phrase) => {
    const id = identiques(orig, forme);
    v.ok(`${k}. ${orig} ≡ ${forme} — « ${phrase} »`, id && c(k).includes(phrase), `identiques : ${id} ; phrase : ${c(k).includes(phrase)}`);
  };
  const solutions = (k, gauche, droite, sols, phrase) => {
    const f = (x) => moins(evalTex(gauche, x), evalTex(droite, x));
    const S = sols.map((s) => (typeof s === "object" ? s : Q(s)));
    const annule = S.every((s) => egal(f(s), Q(0)));
    const [f0, f1, f2, f3] = [0, 1, 2, 3].map((n) => f(Q(n)));
    const troisieme = moins(moins(f3, f0), fois(Q(3), moins(f2, f1)));
    const degre2 = egal(troisieme, Q(0));
    const nonNulle = [0, 1, 2, 3, 7].some((n) => !egal(f(Q(n)), Q(0)));
    const distinctes = new Set(S.map((s) => `${s.n}/${s.d}`)).size === 2;
    const complet = distinctes && degre2 && nonNulle;
    v.ok(`${k}. ${gauche} = ${droite} : ${S.map((s) => (s.d === 1n ? `${s.n}` : `${s.n}/${s.d}`)).join(" ou ")}, et rien d'autre`, annule && complet && c(k).includes(phrase), `annulent : ${annule} ; complet : ${complet} ; phrase : ${c(k).includes(phrase)}`);
  };
  return { e, c, dit, chaine, vaut, solutions };
}

/* ── Les intervalles (feuilles des équations et des réels) ──────────────────
 *
 * L'ensemble des solutions n'est jamais RECOPIÉ : il est retrouvé en testant la
 * condition sur une grille de nombres (un pas régulier, plus chaque borne et
 * ses deux voisins à 1/1000), puis comparé à l'intervalle écrit — et à celui
 * du DESSIN, lu dans le source de l'exercice. Une borne comprise à tort, un
 * sens oublié : la grille le voit.
 */
const nb = (x) => (typeof x === "object" ? x : typeof x === "string" || !Number.isInteger(x) ? D(String(x)) : Q(x));

export function grille(a, b, pas, bornes) {
  const g = [];
  for (let x = nb(a); !inf(nb(b), x); x = plus(x, pas)) g.push(x);
  for (const bo of bornes) for (const e of [Q(-1, 1000), Q(0), Q(1, 1000)]) g.push(plus(bo, e));
  return g;
}

/** x est-il dans { de, a, deInclus, aInclus } ? (`de` ou `a` absents : l'infini) */
export const dans = (x, iv) =>
  (iv.de === undefined || (iv.deInclus ? !inf(x, nb(iv.de)) : inf(nb(iv.de), x))) &&
  (iv.a === undefined || (iv.aInclus ? !inf(nb(iv.a), x) : inf(x, nb(iv.a))));

export function outilsIntervalles(v, { corrections, blocs }) {
  const c = (k) => corrections[k - 1] ?? "";
  /** La condition, testée sur la grille, donne-t-elle exactement l'intervalle iv ? */
  const ensemble = (k, quoi, condition, iv, { phrase, de = -30, a = 30, pas = Q(1, 4) } = {}) => {
    const bornes = [iv.de, iv.a].filter((b) => b !== undefined).map(nb);
    const faux = grille(de, a, pas, bornes).filter((x) => condition(x) !== dans(x, iv));
    v.ok(`${k}. ${quoi}`, faux.length === 0 && (!phrase || c(k).includes(phrase)), faux.length ? `désaccord en x = ${faux[0].n}/${faux[0].d}` : `phrase : ${phrase}`);
  };
  /** Le dessin de l'exercice k porte-t-il cet intervalle ? On lit le premier
   *  objet `{ de: … }` ou `{ a: … }` de son source. */
  const dessin = (k, iv) => {
    const m = /\{\s*((?:de|a): [^}]*)\}/.exec(blocs[k - 1] ?? "");
    const lu = {};
    if (m) for (const [, cle, valeur] of m[1].matchAll(/\b(de|a|deInclus|aInclus): ([^,}\s]+)/g)) lu[cle] = valeur === "true" ? true : valeur === "false" ? false : Number(valeur);
    const num = (x) => (x === undefined ? undefined : Number(String(x).replace(",", ".")));
    const attendu = { de: num(iv.de), a: num(iv.a), deInclus: iv.de === undefined ? undefined : !!iv.deInclus, aInclus: iv.a === undefined ? undefined : !!iv.aInclus };
    const ok = ["de", "a", "deInclus", "aInclus"].every((cle) => lu[cle] === attendu[cle]);
    v.ok(`${k}. le dessin montre le même intervalle`, !!m && ok, `lu ${JSON.stringify(lu)} ; attendu ${JSON.stringify(attendu)}`);
  };
  /** Même contrôle pour une RÉUNION d'intervalles (`[−2 ; −1[ ∪ ]3 ; 4]`). */
  const union = (k, quoi, condition, ivs, { phrase, de = -30, a = 30, pas = Q(1, 4) } = {}) => {
    const bornes = ivs.flatMap((iv) => [iv.de, iv.a]).filter((b) => b !== undefined).map(nb);
    const faux = grille(de, a, pas, bornes).filter((x) => condition(x) !== ivs.some((iv) => dans(x, iv)));
    v.ok(`${k}. ${quoi}`, faux.length === 0 && (!phrase || c(k).includes(phrase)), faux.length ? `désaccord en x = ${faux[0].n}/${faux[0].d}` : `phrase : ${phrase}`);
  };
  return { ensemble, dessin, union };
}

/* ── Les courbes et les tableaux DESSINÉS (bloc « Fonctions », 21/09 au soir) ─
 *
 * ⭐ Une feuille de fonctions se LIT sur ses figures : la courbe de l'énoncé est
 * la donnée de l'exercice. Le script ne recopie donc pas les courbes — il les
 * RELIT dans le source (`repere([cadre], courbes, marques, horizontale)`, les
 * constantes `const NOM: Courbe[]`, les `tableau([entête], [ligne])`) et les
 * évalue en fractions exactes. Une courbe modifiée sans son corrigé, un point
 * marqué à côté de sa courbe : ça se voit.
 */

/** Une courbe relue : `q` (ax² + bx + c) ou `pts` (ligne brisée), évaluée exactement.
 *  Renvoie null hors d'une ligne brisée. */
export function evalCourbe(courbe) {
  if (courbe.p) {
    const coefs = courbe.p.map(nb);
    return (x) => coefs.reduce((s, c) => plus(fois(s, x), c), Q(0));
  }
  if (courbe.q) {
    const [a, b, cc] = courbe.q.map(nb);
    return (x) => plus(plus(fois(a, fois(x, x)), fois(b, x)), cc);
  }
  const pts = courbe.pts.map(([x, y]) => [nb(x), nb(y)]);
  return (x) => {
    for (let i = 0; i + 1 < pts.length; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      if (!inf(x, x0) && !inf(x1, x)) return plus(y0, div(fois(moins(x, x0), moins(y1, y0)), moins(x1, x0)));
    }
    return null;
  };
}

/** JSON d'un argument relu dans le source : la virgule finale d'une liste
 *  écrite sur plusieurs lignes est permise en TypeScript, pas en JSON. */
// ⚠️ Seulement devant un retour à la ligne : `{,}`, la virgule décimale de
// LaTeX, est une virgule devant une accolade — elle perdait sa virgule.
const json = (t) => JSON.parse(t.replace(/,(\s*\n\s*[\]}])/g, "$1"));

/** Les arguments de premier niveau d'un appel dont `debut` pointe la parenthèse ouvrante. */
function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if ("([{".includes(ch)) prof++;
    if (")]}".includes(ch)) {
      if (prof === 0) {
        if (courant.trim()) args.push(courant.trim());
        return args;
      }
      prof--;
    }
    if (ch === "," && prof === 0) {
      args.push(courant.trim());
      courant = "";
    } else courant += ch;
  }
  throw new Error("appel non fermé");
}

export function outilsCourbes(v, { blocs }, source) {
  // Les constantes du fichier : `const NOM: Courbe[] = […];` et `const NOM: [number, number][] = […];`.
  const consts = {};
  const lireCourbes = (t) => {
    t = t.trim();
    if (/^[A-Z0-9_]+$/.test(t)) {
      if (!consts[t]) throw new Error(`constante inconnue : ${t}`);
      return consts[t];
    }
    return [...t.matchAll(/\{\s*(q|pts|p): (\[\[[\s\S]*?\]\]|\[[^\]]*\]|[A-Z0-9_]+)/g)].map(([, cle, val]) =>
      /^[A-Z0-9_]+$/.test(val) ? { pts: consts[val].pts } : { [cle]: json(val) },
    );
  };
  for (const m of source.matchAll(/const ([A-Z0-9_]+): (Courbe\[\]|\[number, number\]\[\]) = (\[[\s\S]*?\]);\n/g)) {
    consts[m[1]] = m[2] === "Courbe[]" ? lireCourbes(m[3]) : { pts: json(m[3]) };
  }

  /** Les appels `repere(…)` de l'exercice k, avec leur rôle (figure ou schéma). */
  const reperes = (k) => {
    const bloc = blocs[k - 1] ?? "";
    return [...bloc.matchAll(/\brepere\(/g)].map((m) => {
      const debut = m.index + m[0].length - 1;
      const avant = bloc.slice(0, m.index);
      const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
      const [cadre, courbes, marques, horiz] = argumentsDe(bloc, debut);
      return {
        role,
        cadre: json(cadre),
        courbes: lireCourbes(courbes),
        marques: marques && marques.startsWith("[") ? [...marques.matchAll(/\{([^}]*)\}/g)].map(([, t]) => ({ x: Number(/x: (-?[\d.]+)/.exec(t)[1]), y: Number(/y: (-?[\d.]+)/.exec(t)[1]), label: /label: "([^"]*)"/.exec(t)?.[1] })) : [],
        horizontale: horiz === undefined ? undefined : Number(horiz),
      };
    });
  };

  /** Les fonctions dessinées dans la figure (ou le schéma) de l'exercice k. */
  const courbes = (k, role = "figure") => {
    const r = reperes(k).find((x) => x.role === role);
    if (!r) throw new Error(`exercice ${k} : pas de ${role}`);
    return r.courbes.map(evalCourbe);
  };

  /** Le `tableau([entête], [ligne])` de l'exercice k, ligne en nombres (« −3 » compris). */
  const tableauDe = (k) => {
    const bloc = blocs[k - 1] ?? "";
    const i = bloc.indexOf("tableau(");
    if (i < 0) throw new Error(`exercice ${k} : pas de tableau`);
    const [entete, ligne] = argumentsDe(bloc, i + "tableau".length).map((a) => json(a.replace(/−/g, "-")));
    return { entete, ligne };
  };

  /** Contrôle de TOUS les repères de la feuille : chaque point marqué est dans
   *  son cadre, sur une des courbes tracées, et un point étiqueté garde deux
   *  unités au-dessus de lui (sinon l'étiquette sort, mesuré le 08/09). */
  const controlerTout = () => {
    let n = 0;
    const fautes = [];
    blocs.forEach((_, i) => {
      for (const r of reperes(i + 1)) {
        n++;
        const [xmin, xmax, ymin, ymax] = r.cadre;
        if (!(xmin < xmax && ymin < 0 && ymax > ymin)) fautes.push(`${i + 1} : cadre ${r.cadre} (ymin doit être < 0)`);
        const fs = r.courbes.map(evalCourbe);
        for (const p of r.marques) {
          const x = D(String(p.x));
          const y = D(String(p.y));
          if (p.x < xmin || p.x > xmax || p.y < ymin || p.y > ymax) fautes.push(`${i + 1} : (${p.x} ; ${p.y}) hors du cadre`);
          if (!fs.some((f) => { const fx = f(x); return fx && egal(fx, y); })) fautes.push(`${i + 1} : (${p.x} ; ${p.y}) sur aucune courbe`);
          if (p.label && ymax - p.y < 2) fautes.push(`${i + 1} : l'étiquette « ${p.label} » colle au bord du haut`);
        }
      }
    });
    v.ok(`${n} repères : points marqués dans le cadre, sur leur courbe, étiquettes loin du bord`, fautes.length === 0, fautes.join(" | "));
  };

  /** Les `tableauVariations([bornes], [valeurs], "label")` de l'exercice k, avec leur rôle. */
  const tableauxVariations = (k) => {
    const bloc = blocs[k - 1] ?? "";
    const num = (x) => D(String(x).replace(/−/g, "-"));
    return [...bloc.matchAll(/\btableauVariations\(/g)].map((m) => {
      const avant = bloc.slice(0, m.index);
      const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
      const [b, val, label] = argumentsDe(bloc, m.index + m[0].length - 1);
      return { role, bornes: json(b).map(num), valeurs: json(val).map(num), label: label ? json(label) : "f" };
    });
  };
  const tableauVariationsDe = (k, role = "figure") => {
    const t = tableauxVariations(k).find((x) => x.role === role);
    if (!t) throw new Error(`exercice ${k} : pas de tableau de variations (${role})`);
    return t;
  };

  /** Le tableau dit-il la même chose que la fonction F ? Valeur à chaque borne,
   *  puis, sur chaque morceau, le sens de la flèche — strictement monotone, ou
   *  constante si les deux bouts sont égaux — vérifié sur une grille de 1/8. */
  const accord = (k, t, F, quoi) => {
    const fautes = [];
    t.bornes.forEach((b, i) => {
      if (!egal(F(b), t.valeurs[i])) fautes.push(`f(${b.n}/${b.d}) ≠ ${t.valeurs[i].n}/${t.valeurs[i].d}`);
    });
    for (let i = 0; i + 1 < t.bornes.length; i++) {
      const sens = inf(t.valeurs[i], t.valeurs[i + 1]) ? 1 : inf(t.valeurs[i + 1], t.valeurs[i]) ? -1 : 0;
      let prec = F(t.bornes[i]);
      for (let x = plus(t.bornes[i], Q(1, 8)); !inf(t.bornes[i + 1], x); x = plus(x, Q(1, 8))) {
        const y = F(x);
        const ok = sens === 1 ? inf(prec, y) : sens === -1 ? inf(y, prec) : egal(y, prec);
        if (!ok) {
          fautes.push(`morceau ${i + 1} : le sens ne tient pas en x = ${x.n}/${x.d}`);
          break;
        }
        prec = y;
      }
    }
    v.ok(`${k}. ${quoi}`, fautes.length === 0, fautes.slice(0, 2).join(" ; "));
  };

  return { reperes, courbes, tableauDe, controlerTout, consts, tableauxVariations, tableauVariationsDe, accord };
}

/** Racine carrée exacte d'une fraction, ou null. */
export function racineExacte(q) {
  const r = (n) => {
    if (n < 0n) return null;
    let x = BigInt(Math.floor(Math.sqrt(Number(n))));
    while (x * x > n) x--;
    while ((x + 1n) * (x + 1n) <= n) x++;
    return x * x === n ? x : null;
  };
  const a = r(q.n);
  const b = r(q.d);
  return a === null || b === null ? null : Q(a, b);
}

/** Les racines EXACTES de f, polynôme de degré ≤ 2 LU PAR SES VALEURS en −1, 0,
 *  1 (et 2 pour s'assurer du degré) : « deux, une ou aucune » se compte, il ne
 *  se recopie pas. null si f est nulle partout. */
export function racines(f) {
  const [fm, f0, f1, f2] = [-1, 0, 1, 2].map((n) => f(Q(n)));
  const a = moins(div(plus(f1, fm), Q(2)), f0);
  const b = div(moins(f1, fm), Q(2));
  const c = f0;
  const troisieme = moins(moins(f2, f0), fois(Q(2), moins(f1, f0)));
  if (!egal(troisieme, fois(Q(2), a))) throw new Error("pas un polynôme de degré ≤ 2");
  if (egal(a, Q(0))) return egal(b, Q(0)) ? (egal(c, Q(0)) ? null : []) : [div(moins(Q(0), c), b)];
  const delta = moins(fois(b, b), fois(Q(4), fois(a, c)));
  if (inf(delta, Q(0))) return [];
  const r = racineExacte(delta);
  if (r === null) throw new Error(`discriminant non carré : ${delta.n}/${delta.d}`);
  const s = [div(moins(moins(Q(0), b), r), fois(Q(2), a)), div(plus(moins(Q(0), b), r), fois(Q(2), a))];
  return egal(s[0], s[1]) ? [s[0]] : s;
}

/**
 * Les tableaux de SIGNES d'une feuille (`tableauSignes([bornes], [[libellé,
 * signes, marques], …])`), relus et recalculés case par case.
 * ⭐ Chaque ligne se vérifie sur SA formule — son libellé lui-même (`$2x - 8$`,
 * `$\dfrac{x - 5}{2x + 2}$`), ou celle qu'on donne pour un libellé comme
 * `$h(x)$`. Dans chaque colonne, le signe au milieu ; sous chaque borne, `0` si
 * la formule s'annule, `||` si elle n'existe pas (division par zéro), rien sinon.
 */
export function outilsSignes(v, { blocs }) {
  const borne = (s) => {
    const t = s.replace(/−/g, "-").replace(/\$/g, "").trim();
    if (t === "-∞") return -Infinity;
    if (t === "+∞") return Infinity;
    return evalTex(t, Q(0));
  };
  const tableaux = (k) => {
    const bloc = blocs[k - 1] ?? "";
    return [...bloc.matchAll(/\btableauSignes\(/g)].map((m) => {
      const avant = bloc.slice(0, m.index);
      const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
      const [b, l, variable] = argumentsDe(bloc, m.index + m[0].length - 1);
      return { role, bornesTexte: json(b), bornes: json(b).map(borne), lignes: json(l), variable: variable ? json(variable) : "x" };
    });
  };
  const tableau = (k, role = "schema") => {
    const t = tableaux(k).find((x) => x.role === role);
    if (!t) throw new Error(`exercice ${k} : pas de tableau de signes (${role})`);
    return t;
  };
  /** Le signe exact d'une formule en x, ou « || » si elle n'y existe pas. */
  const signeEn = (formule, x) => {
    let y;
    try {
      y = evalTex(formule, x);
    } catch (e) {
      if (/division par zéro/.test(String(e?.message))) return "||";
      throw e;
    }
    return inf(y, Q(0)) ? "-" : inf(Q(0), y) ? "+" : "0";
  };
  /** Tout le tableau de l'exercice k est-il juste ? `formules[i]` remplace le
   *  libellé de la ligne i quand celui-ci n'est pas une formule (« $h(x)$ »). */
  const juste = (k, formules = {}, role = "schema") => {
    const t = tableau(k, role);
    const fautes = [];
    const finies = t.bornes.filter((b) => typeof b === "object");
    if (finies.some((b, i) => i > 0 && !inf(finies[i - 1], b))) fautes.push("bornes pas dans l'ordre croissant");
    const milieu = (j) => {
      const [a, b] = [t.bornes[j], t.bornes[j + 1]];
      if (a === -Infinity) return moins(b, Q(1));
      if (b === Infinity) return plus(a, Q(1));
      return div(plus(a, b), Q(2));
    };
    t.lignes.forEach(([label, signes, marques = []], i) => {
      const f = (formules[i] ?? label.replace(/\$/g, "")).replace(t.variable === "x" ? /$^/ : new RegExp(t.variable, "g"), "x");
      signes.forEach((s, j) => {
        const lu = signeEn(f, milieu(j));
        if (lu !== s) fautes.push(`ligne « ${label} », colonne ${j + 1} : ${s} écrit, ${lu} calculé`);
      });
      for (let j = 1; j + 1 < t.bornes.length; j++) {
        const lu = signeEn(f, t.bornes[j]);
        const attendu = lu === "0" ? "0" : lu === "||" ? "||" : "";
        if ((marques[j - 1] ?? "") !== attendu) fautes.push(`ligne « ${label} », sous ${t.bornesTexte[j]} : « ${marques[j - 1] ?? ""} » écrit, « ${attendu} » calculé`);
      }
    });
    v.ok(`${k}. le tableau de signes, case par case (${t.lignes.length} ligne${t.lignes.length > 1 ? "s" : ""}, ${t.bornes.length - 1} colonnes)`, fautes.length === 0, fautes.slice(0, 2).join(" ; "));
    return t;
  };
  return { tableau, juste, signeEn };
}

/** Ce qu'un tableau de variations permet de LIRE, calculé sur ses nombres. */
export function lireTableauVariations(t) {
  const max = t.valeurs.reduce((m, x) => (inf(m, x) ? x : m));
  const min = t.valeurs.reduce((m, x) => (inf(x, m) ? x : m));
  return {
    max,
    min,
    enMax: t.bornes.filter((_, i) => egal(t.valeurs[i], max)),
    enMin: t.bornes.filter((_, i) => egal(t.valeurs[i], min)),
    /** Nombre de solutions de f(x) = k, flèche par flèche (k ne doit être aucune valeur du tableau). */
    solutions: (k) => {
      if (t.valeurs.some((x) => egal(x, k))) throw new Error("k est une valeur du tableau : compte ambigu");
      let n = 0;
      for (let i = 0; i + 1 < t.valeurs.length; i++) {
        const [a, b] = [t.valeurs[i], t.valeurs[i + 1]];
        if ((inf(a, k) && inf(k, b)) || (inf(b, k) && inf(k, a))) n++;
      }
      return n;
    },
    /** Les intervalles où la flèche monte (1), descend (−1). */
    morceaux: (sens) =>
      t.bornes.slice(0, -1).map((b, i) => [b, t.bornes[i + 1], inf(t.valeurs[i], t.valeurs[i + 1]) ? 1 : inf(t.valeurs[i + 1], t.valeurs[i]) ? -1 : 0]).filter((m) => m[2] === sens).map(([a, b]) => [a, b]),
  };
}

/** « a = b = c » écrit dans le corrigé k, et tous les membres égaux (exact, ou
 *  décimal s'il y a une racine). */
export function outilsEgalites(v, { corrections }) {
  const c = (k) => corrections[k - 1] ?? "";
  return (k, texte) => {
    const membres = texte.split(" = ");
    const reel = /\\sqrt/.test(texte);
    const vals = membres.map((m) => (reel ? evalTexReel(m) : evalTex(m, Q(0))));
    const tous = vals.every((x) => (reel ? Math.abs(x - vals[0]) < 1e-9 : egal(x, vals[0])));
    v.ok(`${k}. ${texte}`, tous && c(k).includes(texte), `membres égaux : ${tous} ; écrit : ${c(k).includes(texte)}`);
  };
}

/* ── Lecture de la feuille ───────────────────────────────────────────────── */

/** Les chaînes d'un champ (`enonce`, `correction`…), antislashs dédoublés :
 *  `\\dfrac` dans le source devient `\dfrac`, comme à l'écran. */
function champ(source, cle) {
  return [...source.matchAll(new RegExp(`\\b${cle}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g"))].map((m) =>
    m[1].replace(/\\\\/g, "\\"),
  );
}

export function lireFeuille(source) {
  const series = source.slice(source.indexOf("series: ["));
  return {
    enonces: champ(source, "enonce"),
    corrections: champ(source, "correction"),
    nbParSerie: series
      .split(/niveau: [123],/)
      .slice(1)
      .map((bloc) => (bloc.match(/^\s*enonce:/gm) ?? []).length),
    /** Le source de chaque exercice, schéma compris (k − 1 pour l'exercice k). */
    blocs: series.split(/\n\s+enonce:/).slice(1),
    /** Toutes les chaînes que l'élève LIT : titres, consignes, rappels, énoncés, corrigés. */
    textes: [...series.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\\\/g, "\\")),
    series,
  };
}

/* ── Le vérificateur ─────────────────────────────────────────────────────── */

export function creerVerif(bavard = true) {
  let erreurs = 0;
  return {
    ok(nom, condition, detail = "") {
      if (condition) {
        if (bavard) console.log(`  ✓ ${nom}`);
      } else {
        erreurs++;
        if (bavard) console.log(`  ✗ ${nom}${detail ? " — " + detail : ""}`);
      }
    },
    titre(t) {
      if (bavard) console.log(`\n${t}`);
    },
    erreurs: () => erreurs,
  };
}

/** Ce qui est vrai de TOUTE feuille : 20 exercices en 8 + 8 + 4, des `$`
 *  appariés, pas de LaTeX hors formule, pas de `$` dans un canvas, et les
 *  micros de la notion toutes servies — sans micro d'une autre notion. */
export function controlesCommuns(v, source, { notionId, classe = "seconde", matiere = "maths" }) {
  const f = lireFeuille(source);
  v.titre("Le texte de la feuille");
  v.ok("20 énoncés, 20 corrigés", f.enonces.length === 20 && f.corrections.length === 20, `${f.enonces.length} / ${f.corrections.length}`);
  v.ok("8 + 8 + 4 : le format arrêté", JSON.stringify(f.nbParSerie) === "[8,8,4]", JSON.stringify(f.nbParSerie));

  const impaires = f.textes.filter((t) => (t.match(/\$/g) ?? []).length % 2 === 1);
  v.ok(`dollars appariés dans ${f.textes.length} chaînes`, impaires.length === 0, impaires.slice(0, 2).join(" | ").slice(0, 160));

  // ⛔ Hors d'une formule, un `\` ou un `^` s'afficheraient tels quels à l'élève.
  const fuites = f.textes.filter((t) => /[\\^]/.test(t.replace(/\$[^$]*\$/g, "").replace(/\\n/g, "")));
  v.ok("aucune notation LaTeX hors formule", fuites.length === 0, fuites.slice(0, 2).join(" | ").slice(0, 160));

  // ⛔ Un canvas ne traverse pas KaTeX : un `$` dans une case s'afficherait.
  const lignesCanvas = f.series.split("\n").filter((l) => /tableau\(|label:|values:/.test(l));
  const dollarsCanvas = lignesCanvas.filter((l) => l.includes("$"));
  v.ok("aucun $ dans un canvas", dollarsCanvas.length === 0, dollarsCanvas[0]?.trim().slice(0, 120));

  // ⛔ La consigne d'une série devient le BADGE de ses diapos en mode classe
  // (`lib/fiches-exercices/slides.ts`), qui est du texte brut : un `$a$` y
  // s'afficherait tel quel. (Trouvé sur la feuille des identités, 21/09.)
  const consignes = [...f.series.matchAll(/consigne: "((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  const consignesTex = consignes.filter((t) => /[$\\^]/.test(t));
  v.ok(`aucune formule dans les ${consignes.length} consignes (badge du mode classe)`, consignes.length === 3 && consignesTex.length === 0, consignesTex[0]);

  const cites = new Set(
    [...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => (m[1].match(/"([^"]+)"/g) ?? []).map((s) => s.slice(1, -1))),
  );
  const microSkills = fs.readFileSync(
    path.join(RACINE, "lib", "tutor-v4", "knowledge", matiere, classe, "microSkills.ts"),
    "utf8",
  );
  const deLaNotion = [
    ...microSkills.matchAll(new RegExp(`\\{ id: "([a-z0-9_]+)", label: "(?:[^"\\\\]|\\\\.)*", notionId: "${notionId}"`, "g")),
  ].map((m) => m[1]);
  const inconnues = [...cites].filter((id) => !microSkills.includes(`id: "${id}"`));
  v.ok(`${cites.size} micros citées, toutes connues du coach`, inconnues.length === 0, inconnues.join(", "));
  const sansExercice = deLaNotion.filter((id) => !cites.has(id));
  v.ok(`les ${deLaNotion.length} micros de ${notionId} ont chacune un exercice`, deLaNotion.length > 0 && sansExercice.length === 0, sansExercice.join(", ") || "aucune micro lue");
  const horsNotion = [...cites].filter((id) => !deLaNotion.includes(id));
  v.ok("aucune micro d'une autre notion", horsNotion.length === 0, horsNotion.join(", "));
}

/**
 * Lance le recalcul, puis les contrôles négatifs.
 * @param {{ nom: string, fichier: string, notionId: string, verifier: (source: string, v: ReturnType<typeof creerVerif>) => void, casses: [string, string, string][] }} p
 */
export function lancer({ nom, fichier, notionId, verifier, casses }) {
  const chemin = path.join(RACINE, fichier);
  const source = fs.readFileSync(chemin, "utf8");
  const passe = (src, bavard) => {
    const v = creerVerif(bavard);
    try {
      verifier(src, v);
    } catch (e) {
      v.ok("le recalcul s'exécute", false, String(e?.message ?? e));
    }
    controlesCommuns(v, src, { notionId });
    return v.erreurs();
  };

  console.log(`\n${nom}`);
  const e = passe(source, true);
  console.log(e ? `\n✗ ${e} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");

  console.log(`\nContrôles négatifs — joués en mémoire, le fichier n'est jamais touché`);
  // ⛔ MESURÉ LE 21/09 (feuille du développement) : un recalcul qui PLANTE fait
  // « attraper » toutes les casses — le plantage compte pour un écart dans
  // chaque passe. Deux casses sur douze n'étaient attrapées QUE par lui. Tant
  // que la passe propre n'est pas verte, les casses ne prouvent rien.
  if (e > 0) {
    console.log("  ✗ NON PROBANTS : la passe sur le fichier propre n'est pas verte, une casse « attrapée » ne prouverait rien");
    process.exitCode = 1;
    return;
  }
  let ratees = 0;
  for (const [quoi, avant, apres] of casses) {
    const occurrences = source.split(avant).length - 1;
    if (occurrences !== 1) {
      ratees++;
      console.log(`  ✗ NON joué (${occurrences} occurrence(s) du morceau) : ${quoi}`);
      continue;
    }
    const cassee = source.replace(avant, apres);
    if (cassee === source) {
      ratees++;
      console.log(`  ✗ NON joué (rien n'a changé) : ${quoi}`);
      continue;
    }
    const n = passe(cassee, false);
    if (n > 0) console.log(`  ✓ attrapée (${n} écart${n > 1 ? "s" : ""}) : ${quoi}`);
    else {
      ratees++;
      console.log(`  ✗ PASSÉE INAPERÇUE : ${quoi}`);
    }
  }
  const intact = fs.readFileSync(chemin, "utf8") === source;
  if (!intact) ratees++;
  console.log(`  ${intact ? "✓" : "✗"} le fichier sur le disque est identique à l'octet`);
  console.log(ratees ? `\n✗ ${ratees} contrôle(s) négatif(s) en défaut` : `\n✓ ${casses.length} casses sur ${casses.length} attrapées`);
  process.exitCode = e || ratees ? 1 : 0;
}
