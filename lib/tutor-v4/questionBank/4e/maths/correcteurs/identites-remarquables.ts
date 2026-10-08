import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { estReduite } from "@/lib/tutor/evaluation/expressionAlgebrique";
import {
  avecReglesLitteral,
  coef,
  equiv,
  normaliser,
  poly,
  polyEgaux,
  qcmExpression,
  qcmUnique,
  reponseExpression,
  reponseNombre,
  texteLisible,
  valeur,
} from "./expressions-litterales";

// LES CORRECTEURS DE identites-remarquables.bank.ts (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// ⛔ Décision de Frédéric (4e) : PAS de formule a² + 2ab + b² — un carré
// s'écrit comme le produit de deux parenthèses identiques, puis on fait les
// quatre produits. Les correcteurs relisent l'expression écrite en LaTeX
// ($(x + 3)^2$), ou la SITUATION (côté d'un carré, longueur et largeur, programme
// de calcul), développent eux-mêmes (polynôme exact) et jugent : bonne réponse,
// une seule proposition juste, forme développée réduite. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Les morceaux $…$ du texte. */
const morceaux = (t: string) => [...t.matchAll(/\$([^$]+)\$/g)].map((m) => m[1].trim());

/** « C = (x + 8)(x + 8) » → « (x + 8)(x + 8) » ; une égalité garde ses deux membres. */
const sansNom = (s: string) => s.replace(/^[A-Z]\s*=\s*/, "");

/** L'expression de la consigne : le premier morceau $…$ avec une lettre et une parenthèse (pas une condition « 3t > 5 »). */
function cible(t: string): string | null {
  for (const m of morceaux(t)) {
    if (/[<>]/.test(m) || !/[a-z]/.test(m.replace(/\\[a-z]+/g, "")) || !/\(/.test(m)) continue;
    const s = sansNom(m).split("=")[0].trim();
    if (poly(s)) return s;
  }
  return null;
}

/** Une SITUATION qui donne l'expression : carré de côté C, rectangle A sur B, programme de calcul. */
function situation(t: string): { expr: string; longueurs: string[] } | null {
  let m: RegExpMatchArray | null;
  if ((m = t.match(/côtés de longueur \$(.+?)\$|côté d’une? .+? mesure \$(.+?)\$|a des côtés de \$(.+?)\$/))) {
    const C = m[1] ?? m[2] ?? m[3];
    return { expr: `(${C})^2`, longueurs: [C] };
  }
  if ((m = t.match(/mesure \$(.+?)\$ \S+ de long et \$(.+?)\$ \S+ de large|a pour longueur \$(.+?)\$ \S+ et pour largeur \$(.+?)\$/))) {
    const A = m[1] ?? m[3], B = m[2] ?? m[4];
    return { expr: `(${A})(${B})`, longueurs: [A, B] };
  }
  if ((m = t.match(/(?:choisir|choisit) un nombre \$([a-z])\$, (.+?), puis (?:élever le résultat au carré|multiplie le résultat par lui-même)/))) {
    const L = m[1];
    const op = m[2];
    let n: RegExpMatchArray | null;
    let base: string | null = null;
    if ((n = op.match(/^lui (ajouter|ajoute|soustraire|soustrait) (\d+)$/))) base = `${L} ${n[1].startsWith("ajout") ? "+" : "-"} ${n[2]}`;
    else if ((n = op.match(/^le multipli(?:er|e) par (\d+), puis (ajouter|ajoute|soustraire|soustrait) (\d+)$/)))
      base = `${n[1]}${L} ${n[2].startsWith("ajout") ? "+" : "-"} ${n[3]}`;
    return base ? { expr: `(${base})^2`, longueurs: [] } : null;
  }
  return null;
}

/** Une longueur « pL − q » doit être annoncée positive : « (avec pL > q) ». */
function conditions(t: string, longueurs: string[]): string[] {
  const conds = morceaux(t).filter((m) => m.includes(">")).map((m) => m.split(">").map((x) => x.trim()));
  const p: string[] = [];
  for (const L of longueurs) {
    const P = poly(L);
    if (!P || (P.get("") ?? 0) >= 0) continue;
    if (!conds.some(([u, v]) => equiv(`(${u}) - (${v})`, L))) p.push(`la longueur ${L} n'est pas annoncée positive`);
  }
  return p;
}

/** L'expression à développer : écrite, ou donnée par la situation. */
function aDevelopper(q: Q): { E: string | null; p: string[] } {
  const t = texteLisible(q.text).replace(/²/g, "^2");
  const s = situation(q.text);
  if (s) return { E: s.expr, p: conditions(q.text, s.longueurs) };
  return { E: cible(q.text) ?? (t ? null : null), p: [] };
}

/** Développer et réduire (réponse tapée ou QCM). */
function cDevelopper(q: Q): string[] {
  const { E, p } = aDevelopper(q);
  if (!E) return ["expression introuvable"];
  if (q.format === "qcm") {
    const r = qcmExpression(q, E);
    if (!estReduite(normaliser(String(q.expected[0])))) r.push(`la bonne proposition « ${q.expected[0]} » n'est pas réduite`);
    return [...p, ...r];
  }
  return [...p, ...reponseExpression(q, E, `${E} développée`)];
}

// ─── Les formes ────────────────────────────────────────────────────────────

/** Les termes d'une parenthèse (« 3 - 2x » → polynômes de 3 et de −2x), dans l'ordre. */
function termes(s: string): string[] {
  return normaliser(s)
    .split(/(?<=[^+\-*^(])(?=[+-])/)
    .filter(Boolean);
}

type Forme = "somme" | "difference" | "produit" | "autre";

/** Carré d'une somme, d'une différence, produit somme × différence, ou autre. */
function forme(E0: string): Forme {
  const E = normaliser(E0);
  let m: RegExpMatchArray | null;
  if ((m = E.match(/^\(([^()]+)\)\^2$/)) || ((m = E.match(/^\(([^()]+)\)\(([^()]+)\)$/)) && normaliser(m[1]) === normaliser(m[2]))) {
    const t = termes(m[1]);
    if (t.length !== 2) return "autre";
    return t.some((x) => x.startsWith("-")) ? "difference" : "somme";
  }
  if ((m = E.match(/^\(([^()]+)\)\*?\(([^()]+)\)$/))) {
    const A = poly(m[1]), B = poly(m[2]);
    if (!A || !B || A.size !== 2 || B.size !== 2) return "autre";
    const cles = [...A.keys()];
    if (!cles.every((k) => B.has(k))) return "autre";
    const memes = cles.filter((k) => A.get(k) === B.get(k)).length;
    const opposes = cles.filter((k) => A.get(k) === -B.get(k)!).length;
    return memes === 1 && opposes === 1 ? "produit" : "autre";
  }
  return "autre";
}

const LABEL: Record<Forme, RegExp> = {
  somme: /^(le )?carré d’une somme$/,
  difference: /^(le )?carré d’une différence$/,
  produit: /^(le )?produit d’une somme par une différence$/,
  autre: /^aucune? de ces trois/,
};

function cForme(q: Q): string[] {
  const E = cible(q.text);
  if (!E) return ["expression introuvable"];
  const f = forme(E);
  return qcmUnique(q, (c) => LABEL[f].test(c));
}

/** « Laquelle de ces expressions est le carré d'une somme ? » */
function cLaquelle(q: Q): string[] {
  const t = texteLisible(q.text);
  const voulue: Forme | null = /carré d’une somme/.test(t) ? "somme" : /carré d’une différence/.test(t) ? "difference" : /produit d’une somme par une différence/.test(t) ? "produit" : null;
  if (!voulue) return ["forme demandée illisible"];
  return qcmUnique(q, (c) => forme(c.replace(/\$/g, "")) === voulue);
}

/** (F)² = (F)(F) : la bonne écriture est un produit de deux parenthèses IDENTIQUES, égal au carré. */
function cEcrireProduit(q: Q): string[] {
  const E = cible(q.text);
  if (!E) return ["expression introuvable"];
  const p: string[] = [];
  const s = situation(q.text);
  if (s && !equiv(s.expr, E)) p.push(`l'aire ${E} n'est pas celle d'un carré de côté ${s.longueurs[0]}`);
  if (s) p.push(...conditions(q.text, s.longueurs));
  const juste = (c: string) => {
    const m = normaliser(c).match(/^\(([^()]+)\)\(([^()]+)\)$/);
    return !!m && m[1] === m[2] && equiv(c, E);
  };
  return [...p, ...qcmUnique(q, juste)];
}

/** La première étape : écrire le produit de deux parenthèses identiques, puis les quatre produits. */
function cPremiereEtape(q: Q): string[] {
  const E = cible(q.text);
  if (!E) return ["expression introuvable"];
  const juste = (c: string) => {
    const m = morceaux(c)[0];
    const n = m ? normaliser(m).match(/^\(([^()]+)\)\(([^()]+)\)$/) : null;
    return /quatre produits/.test(c) && !!n && n[1] === n[2] && equiv(m!, E);
  };
  return qcmUnique(q, juste);
}

/** Les quatre produits de (u1 + v1)(u2 + v2). */
function cQuatreProduits(q: Q): string[] {
  const FF = morceaux(q.text)
    .flatMap((m) => m.split("="))
    .map((m) => normaliser(m))
    .find((m) => /^\([^()]+\)\([^()]+\)$/.test(m));
  if (!FF) return ["produit de deux parenthèses introuvable"];
  const [, A, B] = FF.match(/^\(([^()]+)\)\(([^()]+)\)$/)!;
  const attendus = termes(A).flatMap((u) => termes(B).map((v) => poly(`(${u})*(${v})`)!));
  const juste = (c: string) => {
    if (/seulement/.test(c)) return false;
    const items = c.split(" ; ");
    if (items.length !== 4 || items.some((x) => !/\\times/.test(x))) return false;
    const restants = [...attendus];
    for (const x of items) {
      const P = poly(x);
      const i = restants.findIndex((r) => polyEgaux(r, P));
      if (i < 0) return false;
      restants.splice(i, 1);
    }
    return true;
  };
  return qcmUnique(q, juste);
}

/** Le terme en L après réduction (ou « aucun »). */
function cTermeMilieu(q: Q): string[] {
  const E = cible(q.text);
  const P = E ? poly(E) : null;
  const L = texteLisible(q.text).match(/terme en ([a-z])/)?.[1];
  if (!P || !L) return ["expression ou lettre introuvable"];
  const B = coef(P, L);
  return qcmUnique(q, (c) => (B === 0 ? c.startsWith("aucun") : !c.startsWith("aucun") && polyEgaux(poly(c), poly(`${B}${L}`))));
}

/** Quel cas ? (choisir) */
function cCas(q: Q): string[] {
  const E = cible(q.text);
  if (!E) return ["expression introuvable"];
  const f = forme(E);
  return qcmUnique(q, (c) => (f === "autre" ? /^aucun de ces trois cas/.test(c) : LABEL[f].test(c)));
}

/** Laquelle est une parenthèse multipliée par elle-même ? */
function cMemeFacteur(q: Q): string[] {
  const carre = (c: string) => {
    const s = normaliser(c);
    const m = s.match(/^\(([^()]+)\)\^2$/) ?? s.match(/^\(([^()]+)\)\(([^()]+)\)$/);
    return !!m && (m[2] === undefined || m[1] === m[2]);
  };
  return qcmUnique(q, carre);
}

/** Quelle égalité « E = … » est juste ? */
function cQuelleEgalite(q: Q): string[] {
  const E = cible(q.text);
  const juste = (c: string) => {
    const [a, b] = (morceaux(c)[0] ?? "").split("=");
    return !!a && !!b && equiv(a, b) && (!E || equiv(a, E));
  };
  return qcmUnique(q, juste);
}

/** Quelle démarche ? Un carré : l'écrire comme un produit ; sinon les quatre produits directement. */
function cDemarche(q: Q): string[] {
  const E = cible(q.text);
  if (!E) return ["expression introuvable"];
  const carre = /\)\^2$/.test(normaliser(E));
  return qcmUnique(q, (c) => (carre ? c.startsWith("écrire le carré comme un produit") : c.startsWith("faire directement les quatre produits")));
}

/** Le nombre à calculer de tête : 79², 29 × 31, ou a rangées de b. */
function nombreMalin(t: string): number | null {
  const ms = morceaux(t);
  for (const m of ms) {
    const s = normaliser(m);
    let n: RegExpMatchArray | null;
    if ((n = s.match(/^(\d+)\^2$/))) return Number(n[1]) ** 2;
    if ((n = s.match(/^(\d+)\*(\d+)$/))) return Number(n[1]) * Number(n[2]);
  }
  const r = texteLisible(t).match(/(\d+) (?:rangées|rangs|lignes|pixels) (?:de|sur|et) (\d+)/);
  return r ? Number(r[1]) * Number(r[2]) : null;
}

function cMalinCourt(q: Q): string[] {
  const N = nombreMalin(q.text);
  const prod = morceaux(q.text).map((m) => normaliser(m)).find((m) => /^\(\d+[+-]\d+\)\(\d+[+-]\d+\)$/.test(m));
  const p = prod && N != null && valeur(prod, {}) !== N ? [`le produit ${prod} ne vaut pas ${N}`] : [];
  if (q.expected.some((x) => Number(String(x).replace(/\s/g, "")) !== N)) p.push(`réponses acceptées ${q.expected.join(" / ")} : le calcul donne ${N}`);
  return [...p, ...reponseNombre(q, N, "calcul de tête")];
}

function cMalinQcm(q: Q): string[] {
  const N = nombreMalin(q.text);
  if (N == null) return ["nombre à calculer illisible"];
  const p = /\)\(/.test(String(q.expected[0])) ? [] : ["la bonne écriture n'est pas un produit de deux parenthèses"];
  return [...p, ...qcmUnique(q, (c) => valeur(c, {}) === N)];
}

/** L'égalité « E = claim » écrite par un élève. */
function egaliteEleve(t: string): [string, string] | null {
  const ms = morceaux(t);
  const eg = ms.find((m) => m.includes("=") && /\(/.test(m));
  if (eg) {
    const [a, b] = eg.split("=");
    return [a.trim(), b.trim()];
  }
  if (ms.length >= 2 && /est égal à|sont égales/.test(t)) return [ms[0], ms[1]];
  return null;
}

/** « C'est juste. » ou « C'est faux : on trouve … » */
function cEleveErreur(q: Q): string[] {
  const e = egaliteEleve(q.text);
  if (!e || !poly(e[0]) || !poly(e[1])) return ["égalité illisible"];
  const [E, claim] = e;
  const vrai = equiv(E, claim);
  return qcmUnique(q, (c) => {
    if (c === "C’est juste.") return vrai;
    const x = morceaux(c)[0];
    return !vrai && !!x && equiv(x, E);
  });
}

function cOuiNon(q: Q): string[] {
  const e = egaliteEleve(q.text);
  if (!e || !poly(e[0]) || !poly(e[1])) return ["égalité illisible"];
  return qcmUnique(q, (c) => c === (equiv(e[0], e[1]) ? "oui" : "non"));
}

/** Le carré contre le produit somme × différence : les deux développements justes. */
function cComparaison(q: Q): string[] {
  const ms = morceaux(q.text);
  if (ms.length < 2) return ["expressions illisibles"];
  const [X, Y] = ms;
  return qcmUnique(q, (c) => {
    if (/même résultat/.test(c)) return equiv(X, Y);
    if (/ne se développe/.test(c)) return false;
    const eg = morceaux(c).map((m) => m.split("="));
    return eg.length === 2 && eg.every(([a, b]) => !!b && equiv(a, b)) && eg.some(([a]) => equiv(a, X)) && eg.some(([a]) => equiv(a, Y));
  });
}

/** Corriger : l'égalité de l'élève est fausse ; la réponse est le bon développement. */
function cCorriger(q: Q): string[] {
  const e = egaliteEleve(q.text);
  if (!e || !poly(e[0]) || !poly(e[1])) return ["égalité illisible"];
  const p = equiv(e[0], e[1]) ? [`${e[0]} = ${e[1]} est juste : rien à corriger`] : [];
  return [...p, ...reponseExpression(q, e[0], `${e[0]} développée`)];
}

export const CORRECTEURS: CorrecteursMaths = avecReglesLitteral({
  litteral_identite_lier_litteral_distributivite_tpl_ecrire_produit_1: cEcrireProduit,
  litteral_identite_lier_litteral_distributivite_tpl_premiere_etape_1: cPremiereEtape,
  litteral_identite_lier_litteral_distributivite_tpl_1: cEcrireProduit,
  litteral_identite_lier_litteral_distributivite_tpl_quatre_produits_1: cQuatreProduits,
  litteral_identite_lier_litteral_distributivite_tpl_2: cDevelopper,
  litteral_identite_lier_litteral_distributivite_tpl_passer_par_produit_1: cDevelopper,
  litteral_identite_lier_litteral_distributivite_tpl_3: cEcrireProduit,
  litteral_identite_reconnaitre_tpl_1: cForme,
  litteral_identite_reconnaitre_tpl_2: cLaquelle,
  litteral_identite_reconnaitre_tpl_forme_developpee_1: cDevelopper,
  litteral_identite_reconnaitre_tpl_terme_milieu_1: cTermeMilieu,
  litteral_identite_developper_tpl_qcm_simple_1: cDevelopper,
  litteral_identite_developper_tpl_court_simple_1: cDevelopper,
  litteral_identite_developper_tpl_somme_1: cDevelopper,
  litteral_identite_developper_tpl_difference_1: cDevelopper,
  litteral_identite_developper_tpl_carres_1: cDevelopper,
  litteral_identite_developper_tpl_qcm_1: cDevelopper,
  litteral_identite_developper_tpl_carres_qcm_1: cDevelopper,
  litteral_identite_choisir_tpl_1: cCas,
  litteral_identite_choisir_tpl_meme_facteur_1: cMemeFacteur,
  litteral_identite_choisir_tpl_2: cQuelleEgalite,
  litteral_identite_choisir_tpl_3: cDemarche,
  litteral_identite_choisir_tpl_calcul_malin_1: cMalinQcm,
  litteral_identite_defi_tpl_eleve_erreur_1: cEleveErreur,
  litteral_identite_defi_tpl_calcul_malin_1: cMalinCourt,
  litteral_identite_defi_open_erreur_1: cCorriger,
  litteral_identite_defi_tpl_comparaison_1: cComparaison,
  litteral_identite_defi_tpl_erreur_2: cOuiNon,
  litteral_identite_defi_tpl_developper_2: cDevelopper,
});
