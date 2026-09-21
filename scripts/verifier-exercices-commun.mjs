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
const nb = (x) => (typeof x === "object" ? x : typeof x === "string" ? D(x) : Q(x));

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
  return { ensemble, dessin };
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
