import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { compiler, deriveeNum, lireIntegrale, nue, proche, seuleJuste, seulChoix, simpson, val } from "../../../lycee-correcteurs-commun";

// Ils relisent la fonction ou l'intégrale écrite : Simpson pour la valeur,
// différences finies pour dériver. Aucun nombre ne vient du gabarit.

type Q = TutorGeneratedQuestionV4;
const POINTS = [0.37, 0.71, 1.13, 1.9, 2.43];

function f$(src: string) {
  const c = compiler(src);
  return (x: number) => c({ x });
}
const estPrimitive = (F: (x: number) => number, f: (x: number) => number) => POINTS.every((x) => proche(deriveeNum(F, x), f(x), 1e-4));

function cibleDansTexte(t: string) {
  const m =
    t.match(/\\mapsto ([^$]+?)\$/) ??
    t.match(/F'\(x\) = ([^$]+?)\$/) ??
    t.match(/primitive de \$([^$]+?)\$/) ??
    t.match(/intégrer \$([^$]+?)\$/) ??
    t.match(/parties de \$([^$]+?)\$/) ??
    t.match(/parties : \$([^$]+?)\$/) ??
    t.match(/\$([^$]+?)\$ a pour primitive/);
  if (!m) throw new Error(`fonction cible illisible : ${t}`);
  return f$(m[1]);
}

function unePrimitive(q: Q): string[] {
  const f = cibleDansTexte(q.text);
  return seulChoix(q, (c) => estPrimitive(f$(nue(c)), f));
}

/** Le produit u × v' redonne f ; ln se dérive toujours ; sinon u est le polynôme (u' constante). */
function choixUV(q: Q): string[] {
  const f = cibleDansTexte(q.text);
  const m = String(q.expected[0]).match(/u\(x\) = (.+?)\$ et \$v'\(x\) = (.+?)\$/);
  if (!m) return ["choix illisible"];
  const u = f$(m[1]);
  const vp = f$(m[2]);
  const p: string[] = [];
  if (!POINTS.every((x) => proche(u(x) * vp(x), f(x), 1e-9))) p.push("u × v' ne redonne pas la fonction");
  if (/\\ln/.test(q.text.split("$").slice(0, 3).join("")) && !/\\ln/.test(m[1])) p.push("avec ln x, c'est ln x qu'on dérive");
  if (!/\\ln/.test(m[1]) && !POINTS.every((x) => proche(deriveeNum(u, x), deriveeNum(u, 0.5), 1e-4))) p.push("u n'est pas le facteur polynôme");
  return p;
}

function deriverPrimitiver(q: Q): string[] {
  const m = q.text.match(/u\(x\) = (.+?)\$.*?v'\(x\) = (.+?)\$/);
  if (!m) return ["u et v' illisibles"];
  const u = f$(m[1]);
  const vp = f$(m[2]);
  return seulChoix(q, (c) => {
    const k = c.match(/u'\(x\) = (.+?)\$ et \$v\(x\) = (.+?)\$/);
    if (!k) throw new Error(`proposition illisible ${c}`);
    const up = f$(k[1]);
    const v = f$(k[2]);
    return POINTS.every((x) => proche(deriveeNum(u, x), up(x), 1e-4) && proche(deriveeNum(v, x), vp(x), 1e-4));
  });
}

/** Écriture [uv]_a^b ± ∫… : seule celle de la formule doit tomber sur l'intégrale ET avoir la bonne forme. */
function formule(q: Q): string[] {
  const I = lireIntegrale(q.text);
  return seulChoix(q, (c) => {
    const s = c.replace(/\$/g, "");
    const m = s.match(/^\\left\[(.+?)\\right\]_\{(.+?)\}\^\{(.+?)\} ([+-]) (\\int.*)$/);
    if (!m) throw new Error(`proposition illisible ${c}`);
    const F = f$(m[1]);
    const J = lireIntegrale(m[5]);
    const v = F(val(m[3])) - F(val(m[2])) + (m[4] === "-" ? -J.valeur : J.valeur);
    return proche(v, I.valeur, 1e-5);
  });
}

const valeurIntegrale = (q: Q) => seuleJuste(q, lireIntegrale(q.text).valeur);

function primitiveCondition(q: Q): string[] {
  const m = q.text.match(/\\mapsto (.+?)\$.*?\$[FGH]\(1\) = (-?\d+)\$/);
  if (!m) return ["énoncé illisible"];
  const f = f$(m[1]);
  const c = Number(m[2]);
  return seulChoix(q, (ch) => {
    const F = f$(nue(ch));
    return estPrimitive(F, f) && proche(F(1), c, 1e-9);
  });
}
function primitiveValeur(q: Q): string[] {
  const m = q.text.match(/\\mapsto (.+?)\$/);
  if (!m) return ["énoncé illisible"];
  return seuleJuste(q, simpson(f$(m[1]), 0, 1));
}

export const CORRECTEURS: CorrecteursMaths = {
  tle_integrale_ipp_choisir_tpl_1: choixUV,
  tle_integrale_ipp_choisir_tpl_2: deriverPrimitiver,
  tle_integrale_ipp_choisir_tpl_3: formule,
  tle_integrale_ipp_calculer_tpl_1: valeurIntegrale,
  tle_integrale_ipp_calculer_tpl_2: valeurIntegrale,
  tle_integrale_ipp_calculer_tpl_3: valeurIntegrale,
  tle_integrale_ipp_calculer_tpl_4: valeurIntegrale,
  tle_integrale_ipp_calculer_tpl_5: valeurIntegrale,
  tle_integrale_ipp_calculer_tpl_6: valeurIntegrale,
  tle_integrale_ipp_primitive_tpl_1: unePrimitive,
  tle_integrale_ipp_primitive_tpl_2: unePrimitive,
  tle_integrale_ipp_primitive_tpl_3: primitiveCondition,
  tle_integrale_ipp_primitive_tpl_4: primitiveValeur,
};
