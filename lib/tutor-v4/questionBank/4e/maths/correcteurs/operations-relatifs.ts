import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { evaluer, egalRel } from "./puissances";

// LES CORRECTEURS DE operations-relatifs.bank.ts (notion relatif_operation, 08/10/2026).
// Ils relisent dans le TEXTE le calcul (« 14 + (−4) », « −4(a + 6) pour a = −5 »,
// « … × 3 = −15 »), la consigne en mots (« Ajoute −4 à 8 », « le quotient de −24
// par 3 ») ou la situation (valeur de départ, hausses et baisses, deuxième relevé,
// vitesse × durée, moyenne, écart, barème d'un quiz), et refont le calcul avec
// leur propre lecteur d'expressions. Ils vérifient aussi l'ÉCRITURE des relatifs :
// le signe « − » (jamais le tiret « - »), et un négatif après une opération
// toujours entre parenthèses (« 5 + (−3) », jamais « 5 + −3 »). Vide = juste.

type Q = TutorGeneratedQuestionV4;

const NB = String.raw`[−-]?\d{1,3}(?:[  ]\d{3})*(?:,\d+)?|[−-]?\d+(?:,\d+)?`;
const lireN = (s: string) => Number(s.replace(/[  ]/g, "").replace(/[−]/g, "-").replace(",", "."));
const ILLISIBLE = (t: string) => [`énoncé illisible pour le correcteur : ${t}`];

/* ── L'écriture des relatifs ───────────────────────────────────────────────── */
export function ecritureRelatifs(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...q.expected.map(String), q.explanation ?? ""]) {
    if (/(?<![\p{L}\d])-(?=\s?[\d(])/u.test(s)) p.push(`tiret « - » au lieu du signe « − » : « ${s.slice(0, 90)} »`);
    const m = s.match(/(?:[\d)…]|(?<!\p{L})[a-z])\s[+−×÷]\s*[−-]\s?\d/u);
    if (m) p.push(`négatif sans parenthèses après une opération : « ${m[0]} »`);
  }
  return p;
}

/* ── Les calculs écrits ────────────────────────────────────────────────────── */
/** Remplace les lettres par leur valeur (« pour a = −5 », « On remplace t par −4 »). */
function substituer(expr: string, t: string): string | null {
  const vals = new Map<string, string>();
  for (const m of t.matchAll(new RegExp(String.raw`(?<!\p{L})([a-z]) = (${NB})(?![\d,])`, "gu"))) vals.set(m[1], m[2]);
  for (const m of t.matchAll(new RegExp(String.raw`remplace ([a-z]) par (${NB})`, "gu"))) vals.set(m[1], m[2]);
  let e = expr;
  for (const [l, v] of vals) e = e.replace(new RegExp(String.raw`(?<!\p{L})${l}(?!\p{L})`, "gu"), `(${v})`);
  if (/\p{L}/u.test(e)) return null;
  return e.replace(/([\d)])\s*\(/g, "$1 × (");
}

/** Le calcul écrit dans le texte (le plus long), sans lettres. */
export function calculsDuTexte(t: string): string[] {
  const runs = t.match(/[−(-]*\s*[\d…][\d\s()+−×÷,…=-]*/g) ?? [];
  return runs
    .map((r) => r.trim().replace(/[\s,=]+$/, "").trim())
    .map((r) => {
      // parenthèses en trop au bord
      while (r.endsWith(")") && (r.match(/\(/g) ?? []).length < (r.match(/\)/g) ?? []).length) r = r.slice(0, -1).trim();
      return r;
    })
    .filter((r) => /[\d)…]\s*[+−×÷-]\s*[\d(−…-]/.test(r));
}

/** Valeur d'une égalité à trou « a × … = b » : le calcul est affine en « … ». */
function resoudreTrou(g: string, d: string): number | null {
  const f = (x: number) => {
    const ecrit = `(${String(Math.round(x * 1e6) / 1e6).replace(".", ",")})`;
    const gg = evaluer(g.replace("…", ecrit));
    const dd = evaluer(d.replace("…", ecrit));
    return gg == null || dd == null ? null : gg - dd;
  };
  const f0 = f(0);
  const f1 = f(1);
  if (f0 == null || f1 == null || f1 === f0) return null;
  const x = Math.round((-f0 / (f1 - f0)) * 1e6) / 1e6;
  const fx = f(x);
  return fx != null && Math.abs(fx) < 1e-6 ? x : null;
}

/** La valeur du calcul demandé (calcul écrit, éventuellement avec lettres ou trou). */
export function valeurCalcul(t: string): number | null {
  // Avec lettres : « Calcule −4x − 2a pour x = −3 et a = 5. »
  const avecLettres = t.match(/(?:Calcule|valeur de|dans l’expression|dans)\s+(.+?)(?:\s+(?:pour|lorsque)\s|\.(?:\s|$)|\s?\?)/);
  if (avecLettres && /(?<!\p{L})[a-z](?!\p{L})/u.test(avecLettres[1]) && /[a-z] = |remplace [a-z] par/.test(t)) {
    const e = substituer(avecLettres[1], t);
    return e == null ? null : evaluer(e);
  }
  const cs = calculsDuTexte(t);
  if (!cs.length) return null;
  const c = cs.reduce((a, b) => (b.length > a.length ? b : a));
  const [g, d] = c.split(/\s=\s?/);
  if (c.includes("…") && d != null && d.trim() !== "…") return resoudreTrou(g, d);
  return evaluer(g);
}

/* ── Les consignes en mots ─────────────────────────────────────────────────── */
const MOTS: [RegExp, (a: number, b: number) => number][] = [
  [new RegExp(String.raw`Additionne les nombres (${NB}) et (${NB})`), (a, b) => a + b],
  [new RegExp(String.raw`[Aa]joute (${NB}) à (${NB})`), (a, b) => b + a],
  [new RegExp(String.raw`en ajoutant (${NB}) à (${NB})`), (a, b) => b + a],
  [new RegExp(String.raw`[Ss]omme de (${NB}) et (?:de )?(${NB})`), (a, b) => a + b],
  [new RegExp(String.raw`Au nombre (${NB}), on soustrait (${NB})`), (a, b) => a - b],
  [new RegExp(String.raw`[Ss]oustrais (${NB}) (?:à|de) (${NB})`), (a, b) => b - a],
  [new RegExp(String.raw`en soustrayant (${NB}) (?:à|de) (${NB})`), (a, b) => b - a],
  [new RegExp(String.raw`différence de (${NB}) et (?:de )?(${NB})`), (a, b) => a - b],
  [new RegExp(String.raw`produit de (${NB}) (?:par|et) (${NB})`), (a, b) => a * b],
  [new RegExp(String.raw`[Mm]ultiplie (${NB}) par (${NB})`), (a, b) => a * b],
  [new RegExp(String.raw`quotient de (${NB}) par (${NB})`), (a, b) => a / b],
  [new RegExp(String.raw`division de (${NB}) par (${NB})`), (a, b) => a / b],
  [new RegExp(String.raw`[Dd]ivise (${NB}) par (${NB})`), (a, b) => a / b],
  [new RegExp(String.raw`(${NB}) divisé par (${NB})`), (a, b) => a / b],
  [new RegExp(String.raw`partage (${NB}) en (${NB}) parts`), (a, b) => a / b],
  [new RegExp(String.raw`Quel nombre, multiplié par (${NB}), donne (${NB})`), (a, b) => b / a],
  [new RegExp(String.raw`ajouter à (${NB}) pour obtenir (${NB})`), (a, b) => b - a],
  [new RegExp(String.raw`soustraire à (${NB}) pour obtenir (${NB})`), (a, b) => a - b],
  [new RegExp(String.raw`multiplier (${NB}) pour obtenir (${NB})`), (a, b) => b / a],
  [new RegExp(String.raw`en multipliant (${NB}) par (${NB})`), (a, b) => a * b],
  [new RegExp(String.raw`abscisse (${NB}) et on avance de (${NB})`), (a, b) => a + b],
  [new RegExp(String.raw`abscisse (${NB}) et on recule de (${NB})`), (a, b) => a - b],
];
function valeurMots(t: string): number | null {
  const liste = t.match(new RegExp(String.raw`(produit des nombres|Additionne les nombres relatifs|somme des nombres|somme de) ((?:${NB})(?:, (?:${NB}))*) et (${NB})`));
  if (liste) {
    const ns = [...liste[2].split(", "), liste[3]].map(lireN);
    return /produit/.test(liste[1]) ? ns.reduce((a, b) => a * b, 1) : ns.reduce((a, b) => a + b, 0);
  }
  const fois = t.match(new RegExp(String.raw`(double|triple|quadruple|moitié|tiers|quart) de (${NB})`));
  if (fois) return ({ double: 2, triple: 3, quadruple: 4, moitié: 1 / 2, tiers: 1 / 3, quart: 1 / 4 } as Record<string, number>)[fois[1]] * lireN(fois[2]);
  const facteur = t.match(new RegExp(String.raw`multiplier par (${NB}) pour obtenir (${NB})`));
  if (facteur) return lireN(facteur[2]) / lireN(facteur[1]);
  for (const [re, f] of MOTS) {
    const m = t.match(re);
    if (m) return f(lireN(m[1]), lireN(m[2]));
  }
  return null;
}

/* ── Les situations ────────────────────────────────────────────────────────── */
const UNITE = String.raw`°C|cm|m|€|points?|coups?|étages?|%`;
const MONTANT = new RegExp(String.raw`(${NB})\s?(?:${UNITE})(?![\p{L}²³])`, "gu");
const HAUSSE = /(?<!\p{L})(?:(?:re)?monte|gagne|augmente|réchauffe|rapporte|recharg|reçoit|virement|bonus|répond juste|de plus que le par|avance)/u;
const BAISSE = /(?<!\p{L})(?:baiss|descend|plonge(?!u)|perd|refroidit|diminue|débité|rachète|achète|piège|coûte|se trompe|de moins que le par|recule|prélevé|retire|chute)/u;

const montants = (s: string) => [
  ...[...s.matchAll(MONTANT)].map((m) => lireN(m[1])),
  ...[...s.matchAll(new RegExp(String.raw`(?:niveau|l’an) (${NB})`, "g"))].map((m) => lireN(m[1])),
];
const phrases = (t: string) => t.split(/(?<=[.?!])\s+/).filter(Boolean);
const PREFIXES = /^(?:Traduis la situation par un calcul de nombres relatifs\.|Utilise les nombres relatifs\.|Avec des nombres relatifs :)\s*/;

function signeVerbe(s: string): 1 | -1 | 0 {
  const h = HAUSSE.test(s);
  const b = BAISSE.test(s);
  if (h && !b) return 1;
  if (b && !h) return -1;
  if (b && h) return /se trompe et perd|plonge.*diminue/.test(s) ? -1 : 0;
  return 0;
}

const DUREE = String.raw`(?:an|année|jour|semaine|heure|minute|mois|seconde)s?`;

function valeurSituation(t0: string): number | null {
  const t = t0.replace(PREFIXES, "");
  // moyenne : « … : −8 °C ; −16 °C ; −6 °C. Quelle est la moyenne… »
  const question = phrases(t).filter((s) => /\?/.test(s)).join(" ") || phrases(t).slice(-1)[0];
  if (/moyen/.test(question)) {
    const liste = t.match(/:\s*([^.?]*;[^.?]*)/);
    if (!liste) return null;
    const vs = montants(liste[1]);
    return vs.length ? vs.reduce((a, b) => a + b, 0) / vs.length : null;
  }
  // écart : la plus haute moins la plus basse (deux valeurs dans la même phrase)
  if (/écart|sépar|de plus que|plus chaud que|plus bas que|amplitude|différence d’altitude|chute|écoulées|parcourus|est-il monté/.test(question)) {
    const vs = montants(t);
    if (vs.length !== 2) return null;
    return Math.abs(vs[0] - vs[1]);
  }
  // barème : bonne réponse / mauvaise réponse, cartes vertes / rouges
  let m = t.match(/(?:bonne réponse|réponse juste) rapporte (\d+) points?.*?(?:mauvaise|réponse fausse)(?: en retire| coûte) (\d+)(?: points?)?/);
  if (m) {
    const n = t.match(/(\d+) bonnes réponses et (\d+) mauvaises/) ?? t.match(/juste (\d+) fois et faux (\d+) fois/);
    return n ? Number(n[1]) * Number(m[1]) - Number(n[2]) * Number(m[2]) : null;
  }
  m = t.match(new RegExp(String.raw`carte (\p{L}+) vaut (${NB}) points?.*?carte (\p{L}+) vaut (${NB}) points?`, "u"));
  if (m) {
    const n1 = t.match(new RegExp(String.raw`(\d+) cartes ${m[1]}s`));
    const n2 = t.match(new RegExp(String.raw`(\d+) cartes ${m[3]}s`));
    return n1 && n2 ? Number(n1[1]) * lireN(m[2]) + Number(n2[1]) * lireN(m[4]) : null;
  }
  m = t.match(new RegExp(String.raw`réponse juste vaut (\d+) points? et chaque erreur (${NB}) points?.*?(\d+) réponses justes et (\d+) erreurs`));
  if (m) return Number(m[3]) * Number(m[1]) + Number(m[4]) * lireN(m[2]);
  m = t.match(new RegExp(String.raw`zone jaune rapporte (\d+) points? et chaque flèche hors de la cible compte (${NB}) points?.*?(\d+) flèches dans le jaune et (\d+) hors`));
  if (m) return Number(m[3]) * Number(m[1]) + Number(m[4]) * lireN(m[2]);
  // une valeur répétée : « chaque mauvaise réponse vaut −4 points. Nina donne 2 mauvaises réponses »
  m = t.match(new RegExp(String.raw`chaque mauvaise réponse vaut (${NB}) points?.*?(\d+) mauvaises réponses`));
  if (m) {
    const depart = t.match(new RegExp(String.raw`a (${NB}) points?\.`));
    return (depart ? lireN(depart[1]) : 0) + lireN(m[1]) * Number(m[2]);
  }
  // vitesse × durée : « baisse de 4 cm par jour pendant 3 jours », « abonnement de 15 € … chaque mois, pendant 4 mois »
  m =
    t.match(new RegExp(String.raw`(\d+) ?(?:${UNITE})? (?:de charge )?(?:par|chaque) ${DUREE},? (?:pendant|depuis) (\d+) ${DUREE}`, "u")) ??
    t.match(new RegExp(String.raw`de (\d+) ?(?:${UNITE})[^.]*?chaque ${DUREE}[^.]*?pendant (\d+) ${DUREE}`, "u"));
  if (m) {
    const ph = phrases(t).find((s) => s.includes(m![0])) ?? t;
    const sg = signeVerbe(ph) || (/recule/.test(ph) ? -1 : 0);
    if (!sg) return null;
    const total = sg * Number(m[1]) * Number(m[2]);
    // une valeur de départ dans une AUTRE phrase (« Un plongeur est à −4 m… »)
    const avant = phrases(t).filter((s) => s !== ph && !/\?/.test(s));
    const dep = avant.length ? montants(avant[0]) : [];
    return (dep.length ? dep[0] : 0) + total;
  }
  // quotient : « a perdu 72 m en 6 ans, régulièrement », « dette de 75 € partagée entre 5 amis »
  m = t.match(new RegExp(String.raw`(\d+) ?(?:${UNITE})(?: de charge| de longueur| d’altitude)? en (\d+) (?:${DUREE}|paliers|manches)`, "u"));
  if (m) {
    const ph = phrases(t).find((s) => s.includes(m![0])) ?? t;
    const sg = signeVerbe(ph);
    return sg ? (sg * Number(m[1])) / Number(m[2]) : null;
  }
  m = t.match(/(?:En|Sur) (\d+) \p{L}+, ([^.]*?(?:baissé|diminué|perdu|reculé|descendu|gagné|monté|augmenté)(?: de)? (\d+))/u);
  if (m) {
    const sg = signeVerbe(m[2]);
    return sg ? (sg * Number(m[3])) / Number(m[1]) : null;
  }
  m = t.match(/dette de (\d+) € est partagée à parts égales entre (\d+)/);
  if (m) return -Number(m[1]) / Number(m[2]);

  // départ, hausses / baisses, deuxième relevé
  const ps = phrases(t);
  let depart: number | null = null;
  let second: number | null = null;
  let somme = 0;
  let variations = 0;
  for (const s of ps) {
    if (/\?/.test(s) && !montants(s).length) continue;
    const vs = montants(s);
    if (!vs.length) continue;
    const sg = signeVerbe(s);
    if (sg) {
      if (vs.length !== 1 || vs[0] < 0) return null;
      somme += sg * vs[0];
      variations++;
    } else if (depart == null) depart = vs[0];
    else if (second == null) second = vs[0];
    else return null;
  }
  if (depart == null) return null;
  if (second != null) return variations ? null : second - depart;
  if (!variations) return null;
  return /varié|variation|déplacé|changé/.test(question) ? somme : depart + somme;
}

/* ── Vérifications ─────────────────────────────────────────────────────────── */
function verifierNombre(q: Q, v: number | null): string[] {
  if (v == null || !Number.isFinite(v)) return ILLISIBLE(q.text);
  const p: string[] = [];
  for (const e of q.expected) {
    const w = evaluer(String(e));
    if (w == null || !egalRel(w, v)) p.push(`attendu « ${e} », le texte donne ${v}`);
  }
  if (!Number.isInteger(v)) p.push(`résultat non entier : ${v}`);
  if (q.format === "qcm") {
    const bons = (q.choices ?? []).filter((c) => {
      const w = evaluer(c);
      return w != null && egalRel(w, v);
    });
    if (bons.length !== 1) p.push(`${bons.length} propositions valent ${v}`);
  } else if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/** Calcul écrit, consigne en mots, ou situation : la réponse numérique. */
function corrigerNombre(q: Q): string[] {
  const v = valeurMots(q.text) ?? (/\d\s?(?:°C|m|cm|€|points?|coups?|étages?|%)(?!\p{L})|niveau|moyen|réponses?|cartes|l’an|flèche|erreurs/u.test(q.text) ? valeurSituation(q.text) : null) ?? valeurCalcul(q.text);
  return [...ecritureRelatifs(q), ...verifierNombre(q, v)];
}

/** « De quel signe est … ? » : positif / négatif. */
function corrigerSigne(q: Q): string[] {
  const t = q.text;
  let v: number | null = null;
  let m = t.match(/jusqu’à avoir (\d+) facteurs|avec (\d+) facteurs égaux à −1/);
  if (m) v = (-1) ** Number(m[1] ?? m[2]);
  else if ((m = t.match(/(?:contient exactement|comporte) (\d+) facteurs? négatifs?/))) v = (-1) ** Number(m[1]);
  else if ((m = t.match(/multiplie (\d+) nombres négatifs/))) v = (-1) ** Number(m[1]);
  else v = valeurCalcul(t);
  if (v == null || v === 0) return ILLISIBLE(t);
  const juste = v > 0 ? "positif" : "négatif";
  const p = ecritureRelatifs(q);
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », le calcul est ${juste}`);
  if ((q.choices ?? []).filter((c) => c === juste).length !== 1) p.push("le bon signe n'est pas une seule fois parmi les choix");
  return p;
}

/** « Vrai ou faux : −8 + 4 × 2 = −8. », « a trouvé 1 pour (−5) + 4 ». */
function corrigerAffirmation(q: Q): string[] {
  const t = q.text;
  let e: string | undefined;
  let annonce: number | undefined;
  const m1 = t.match(new RegExp(String.raw`a trouvé (${NB}) pour (.+?)\. `));
  if (m1) {
    annonce = lireN(m1[1]);
    e = m1[2];
  } else {
    const m2 = t.match(new RegExp(String.raw`(?:que|:) (.+?) = (${NB})(?:\.|\s)`));
    if (m2) {
      e = m2[1];
      annonce = lireN(m2[2]);
    }
  }
  const v = e ? evaluer(e) : null;
  if (v == null || annonce == null) return ILLISIBLE(t);
  const juste = v === annonce;
  const bonne = q.choices?.includes("vrai") ? (juste ? "vrai" : "faux") : juste ? "oui" : "non";
  const p = ecritureRelatifs(q);
  if (q.expected[0] !== bonne) p.push(`attendu « ${q.expected[0]} » : ${e} = ${v}, annoncé ${annonce}`);
  return p;
}

/** « Laquelle de ces expressions est égale à un nombre positif ? » */
function corrigerLaquelle(q: Q): string[] {
  const cherche = /positif/.test(q.text) ? 1 : /négatif/.test(q.text) ? -1 : 0;
  if (!cherche) return ILLISIBLE(q.text);
  const p = ecritureRelatifs(q);
  const ok = (c: string) => {
    const v = evaluer(c);
    return v != null && Math.sign(v) === cherche;
  };
  if (!ok(String(q.expected[0]))) p.push(`attendu « ${q.expected[0]} » n'est pas ${cherche > 0 ? "positif" : "négatif"}`);
  const bons = (q.choices ?? []).filter(ok);
  if (bons.length !== 1) p.push(`${bons.length} expressions conviennent : ${bons.join(" | ")}`);
  return p;
}

/** La règle oubliée : elle doit parler d'une opération du calcul ; les leurres, non. */
const OPS_REGLE: [RegExp, (e: string) => boolean][] = [
  [/multiplication est prioritaire/i, (e) => e.includes("×") && / [+−] /.test(e)],
  [/produit/i, (e) => e.includes("×")],
  [/quotient/i, (e) => e.includes("÷")],
  [/somme/i, (e) => e.includes(" + ")],
  [/soustraire|retire/i, (e) => e.includes(" − ")],
  [/signes contraires, le résultat/i, (e) => / [+−] /.test(e)],
];
function corrigerRegleOubliee(q: Q): string[] {
  const m = q.text.match(new RegExp(String.raw`(?:: |que )(.+?) = (${NB})(?:\.|,|\s)`));
  if (!m) return ILLISIBLE(q.text);
  const e = m[1];
  const v = evaluer(e);
  const p = ecritureRelatifs(q);
  if (v == null) return ILLISIBLE(q.text);
  if (v === lireN(m[2])) p.push(`le calcul « ${e} = ${m[2]} » est juste : il n'y a pas d'erreur`);
  const parle = (c: string) => OPS_REGLE.find(([re]) => re.test(c))?.[1](e) ?? null;
  if (parle(String(q.expected[0])) !== true) p.push(`la règle attendue ne parle pas d'une opération de ${e}`);
  for (const c of q.choices ?? [])
    if (c !== q.expected[0] && parle(c) !== false) p.push(`le leurre « ${c} » pourrait expliquer ${e}`);
  if (q.format !== "qcm") p.push("question ouverte : à convertir en QCM");
  return p;
}

const IDS_NOMBRE = [
  "relatif_addition_tpl_1", "relatif_addition_tpl_2", "relatif_addition_tpl_3", "relatif_addition_tpl_4",
  "relatif_addition_tpl_5", "relatif_addition_tpl_6",
  "relatif_soustraction_tpl_1", "relatif_soustraction_tpl_2", "relatif_soustraction_tpl_3",
  "relatif_soustraction_tpl_4", "relatif_soustraction_tpl_5", "relatif_soustraction_tpl_6",
  "relatif_multiplication_tpl_1", "relatif_multiplication_tpl_2", "relatif_multiplication_tpl_4",
  "relatif_multiplication_tpl_5", "relatif_multiplication_tpl_6", "relatif_multiplication_tpl_7",
  "relatif_division_tpl_1", "relatif_division_tpl_2", "relatif_division_tpl_4", "relatif_division_tpl_5",
  "relatif_division_tpl_6",
  "relatif_calcul_tpl_1", "relatif_calcul_tpl_2", "relatif_calcul_tpl_3", "relatif_calcul_tpl_4",
  "relatif_calcul_tpl_5", "relatif_calcul_tpl_6",
  "relatif_probleme_tpl_temperature_1", "relatif_probleme_tpl_reunion_1", "relatif_probleme_tpl_argent_1",
  "relatif_probleme_tpl_ecart_1", "relatif_probleme_tpl_altitude_2", "relatif_probleme_tpl_double_1",
  "relatif_probleme_tpl_situation_1", "relatif_probleme_tpl_variation_1", "relatif_probleme_tpl_repetition_1",
  "relatif_operation_defi_tpl_3", "relatif_operation_defi_tpl_manquant_1",
];

export const CORRECTEURS: CorrecteursMaths = {
  ...Object.fromEntries(IDS_NOMBRE.map((id) => [id, corrigerNombre])),
  relatif_multiplication_tpl_3: corrigerSigne,
  relatif_division_tpl_3: corrigerSigne,
  relatif_operation_defi_tpl_2: corrigerSigne,
  relatif_operation_defi_tpl_affirmation_1: corrigerAffirmation,
  relatif_operation_defi_tpl_laquelle_1: corrigerLaquelle,
  relatif_operation_defi_open_1: corrigerRegleOubliee,
};
