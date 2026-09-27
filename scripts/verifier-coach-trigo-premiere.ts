// Recalcul INDÉPENDANT des items de trigonométrie de 1re spé écrits le
// 26/09/2026 : les deux micros neuves (`trig_grand_reel`, `trig_archimede`) et
// les huit gabarits de renfort (`*_tpl_3`) des micros sous le seuil.
//
// On ne relit pas la table de `cercle-trigo-valeurs.ts` : on relit l'ÉNONCÉ
// (le réel écrit en LaTeX), on calcule Math.cos / Math.sin / Math.tan, et on
// compare à la valeur de la réponse attendue, elle aussi relue en LaTeX.
//
//   npx --yes tsx@4 scripts/verifier-coach-trigo-premiere.ts
//
// Sort en code 1 à la première famille fautive.

import { trigonometrieBank } from "../lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank";

const TIRAGES = 3000;
let erreurs = 0;
let controles = 0;
const signaler = (id: string, msg: string) => {
  if (erreurs < 30) console.log(`  ✗ ${id} — ${msg}`);
  erreurs++;
};
const proche = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** « -\dfrac{23\pi}{6} », « 14\pi », « \pi », « 0 » → le réel. */
// Aussi « \pi - \dfrac{\pi}{6} » : l'expression est traduite en JavaScript puis
// évaluée — aucun nombre n'est recopié de la banque.
function lireAngle(tex: string): number {
  const js = tex
    .trim()
    .replace(/\\left|\\right/g, "")
    .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))")
    .replace(/(\d)\\pi/g, "$1*PI")
    .replace(/\\pi/g, "PI");
  if (!/^[\d\s+\-*/().PI]+$/.test(js)) throw new Error(`angle illisible : ${tex}`);
  return Function("PI", `return ${js};`)(Math.PI) as number;
}

/** « $-\dfrac{\sqrt{3}}{2}$ », « $1$ », « -1 » → le nombre. */
function lireValeur(tex: string): number {
  const s0 = tex.replace(/\$/g, "").replace("−", "-").trim();
  const signe = s0.startsWith("-") ? -1 : 1;
  const s = s0.replace(/^-/, "");
  const racine = (x: string) => {
    const r = x.match(/^\\sqrt\{(\d+)\}$/);
    return r ? Math.sqrt(Number(r[1])) : Number(x);
  };
  const m = s.match(/^\\dfrac\{(.+?)\}\{(\d+)\}$/);
  if (m) return (signe * racine(m[1])) / Number(m[2]);
  if (/^(\d+)$/.test(s) === false && /^\\sqrt/.test(s)) return signe * racine(s);
  const v = Number(s);
  if (Number.isNaN(v)) throw new Error(`valeur illisible : ${tex}`);
  return signe * v;
}

function dollarsApparies(id: string, ...textes: (string | undefined)[]) {
  for (const t of textes) {
    if (!t) continue;
    const n = (t.replace(/\\\$/g, "").match(/\$/g) ?? []).length;
    if (n % 2) signaler(id, `$ non apparié : ${t.slice(0, 80)}`);
  }
}

const RENFORTS = ["rad", "enr", "val", "cer", "cs", "ang", "par", "crb"].map((m) => `premiere_trig_${m}_tpl_3`);
const items = trigonometrieBank.filter(
  (i) => i.microId === "trig_grand_reel" || i.microId === "trig_archimede" || RENFORTS.includes(i.id),
);
console.log(`${items.length} items (${items.filter((i) => i.kind === "template").length} gabarits)`);

for (const item of items) {
  const nb = item.kind === "template" ? TIRAGES : 1;
  const enonces = new Set<string>();
  for (let t = 0; t < nb; t++) {
    const q = item.kind === "template" ? item.generate() : item;
    enonces.add(q.text);
    dollarsApparies(item.id, q.text, q.explanation, ...(q.choices ?? []));

    if (q.format === "qcm") {
      const c = q.choices ?? [];
      if (c.length !== 4) signaler(item.id, `${c.length} propositions`);
      if (new Set(c).size !== c.length) signaler(item.id, `propositions en double : ${c.join(" | ")}`);
      if (!c.includes(q.expected[0])) signaler(item.id, "la réponse n'est pas parmi les propositions");
    }

    // cos / sin d'un réel : la valeur attendue contre Math.cos / Math.sin.
    const f = q.text.match(/combien vaut \$\\(cos|sin)\\left\((.+)\\right\)\$ \?$/i);
    if (f) {
      controles++;
      const x = lireAngle(f[2]);
      const vrai = f[1] === "cos" ? Math.cos(x) : Math.sin(x);
      const attendu = lireValeur(q.expected[0]);
      if (!proche(vrai, attendu)) signaler(item.id, `${f[1]}(${f[2]}) = ${vrai}, attendu ${q.expected[0]}`);
      // Aucune autre proposition ne doit être juste.
      for (const autre of (q.choices ?? []).slice(1)) {
        if (q.choices && autre !== q.expected[0] && proche(lireValeur(autre), vrai)) signaler(item.id, `deux propositions justes : ${autre}`);
      }
      if (item.microId === "trig_grand_reel" && Math.abs(x) <= 2 * Math.PI && item.id !== "premiere_trig_gr_fixed_3") signaler(item.id, `réel trop petit pour « retirer des tours » : ${f[2]}`);
    }

    // Même point image dans [0 ; 2π[.
    const g = q.text.match(/a le même point image que \$(.+)\$ sur le cercle/);
    if (g) {
      controles++;
      const x = lireAngle(g[1]);
      const y = lireAngle(q.expected[0].replace(/\$/g, ""));
      if (!(y >= 0 && y < 2 * Math.PI)) signaler(item.id, `réponse hors de [0 ; 2π[ : ${q.expected[0]}`);
      const k = (x - y) / (2 * Math.PI);
      if (!proche(k, Math.round(k))) signaler(item.id, `${g[1]} et ${q.expected[0]} ne diffèrent pas d'un nombre de tours`);
      for (const autre of (q.choices ?? []).slice(1)) {
        const z = lireAngle(autre.replace(/\$/g, ""));
        const kz = (x - z) / (2 * Math.PI);
        if (z >= 0 && z < 2 * Math.PI && proche(kz, Math.round(kz))) signaler(item.id, `deux propositions justes : ${autre}`);
      }
    }

    // Conversions degrés ↔ radians.
    const r1 = q.text.match(/^Convertis \$(\d+)°\$ en radians\.$/);
    if (r1 && !proche(lireAngle(q.expected[0].replace(/\$/g, "")), (Number(r1[1]) * Math.PI) / 180))
      signaler(item.id, `${r1[1]}° ≠ ${q.expected[0]}`);
    const r2 = q.text.match(/^Convertis \$(.+)\$ radians en degrés\.$/);
    if (r2 && !proche((lireAngle(r2[1]) * 180) / Math.PI, Number(q.expected[0])))
      signaler(item.id, `${r2[1]} rad ≠ ${q.expected[0]}°`);

    // Même point image ? Oui si la différence est un multiple de 2π.
    const e1 = q.text.match(/^Les réels \$(.+)\$ et \$(.+)\$ ont-ils le même point image/);
    if (e1) {
      controles++;
      const k = (lireAngle(e1[2]) - lireAngle(e1[1])) / (2 * Math.PI);
      const oui = proche(k, Math.round(k));
      if (q.expected[0].startsWith("Oui") !== oui) signaler(item.id, `${e1[1]} / ${e1[2]} : ${oui ? "oui" : "non"} attendu`);
    }

    // cos² + sin² = 1, le signe donné par l'intervalle (lu en son milieu).
    const c1 = q.text.match(/^On sait que \$\\(cos|sin) x = (.+)\$ et que \$x \\in (.+)\$\. Combien vaut/);
    if (c1) {
      controles++;
      const donne = lireValeur(c1[2]);
      const [a0, b0] = c1[3].replace(/\\left|\\right|\[|\]/g, "").split(" ; ").map(lireAngle);
      const m = (a0 + b0) / 2;
      const signe = Math.sign(c1[1] === "cos" ? Math.sin(m) : Math.cos(m));
      const vrai = signe * Math.sqrt(1 - donne * donne);
      if (!proche(vrai, lireValeur(q.expected[0]))) signaler(item.id, `${c1[1]} = ${c1[2]} sur ${c1[3]} : ${vrai}, attendu ${q.expected[0]}`);
      for (const autre of (q.choices ?? []).slice(1)) if (proche(lireValeur(autre), vrai)) signaler(item.id, `deux propositions justes : ${autre}`);
    }

    // Signes de cos et sin.
    const s1 = q.text.match(/^Quels sont les signes de \$\\cos\\left\((.+?)\\right\)\$/);
    if (s1) {
      controles++;
      const x = lireAngle(s1[1]);
      const attendu = `${Math.cos(x) > 0 ? ">" : "<"} 0$ et $\\sin\\left(${s1[1]}\\right) ${Math.sin(x) > 0 ? ">" : "<"} 0$`;
      if (!q.expected[0].endsWith(attendu)) signaler(item.id, `signes de ${s1[1]} : ${q.expected[0]}`);
    }

    // Ordonnée d'un point de la courbe.
    const k1 = q.text.match(/^Quelle est l'ordonnée du point de la courbe de la fonction (cosinus|sinus) d'abscisse \$(.+)\$ \?$/);
    if (k1) {
      controles++;
      const x = lireAngle(k1[2]);
      const vrai = k1[1] === "cosinus" ? Math.cos(x) : Math.sin(x);
      if (!proche(vrai, lireValeur(q.expected[0]))) signaler(item.id, `${k1[1]}(${k1[2]}) = ${vrai}, attendu ${q.expected[0]}`);
      for (const autre of (q.choices ?? []).slice(1)) if (proche(lireValeur(autre), vrai)) signaler(item.id, `deux propositions justes : ${autre}`);
    }

    // Nombre de tours retirés.
    const h = q.text.match(/tours complets faut-il retirer à \$(.+)\$ pour/);
    if (h) {
      controles++;
      const k = Math.floor(lireAngle(h[1]) / (2 * Math.PI) + 1e-12);
      if (String(k) !== q.expected[0]) signaler(item.id, `${h[1]} : ${k} tours, attendu ${q.expected[0]}`);
    }

    // Archimède : l'angle au centre.
    const a = q.text.match(/polygone régulier à \$(\d+)\$ côtés est inscrit dans un cercle de centre/);
    if (a && !proche(lireAngle(q.expected[0].replace(/\$/g, "")), (2 * Math.PI) / Number(a[1])))
      signaler(item.id, `angle au centre faux pour n = ${a[1]}`);

    // Archimède : le côté, contre la distance entre deux sommets consécutifs.
    const b = q.text.match(/polygone régulier à \$(\d+)\$ côtés est inscrit dans un cercle de rayon \$1\$\. Quelle est la longueur/);
    if (b) {
      controles++;
      const n = Number(b[1]);
      const cote = Math.hypot(Math.cos((2 * Math.PI) / n) - 1, Math.sin((2 * Math.PI) / n));
      const m = q.expected[0].match(/^\$2\\sin\\left\(\\dfrac\{\\pi\}\{(\d+)\}\\right\)\$$/);
      if (!m || !proche(2 * Math.sin(Math.PI / Number(m[1])), cote)) signaler(item.id, `côté faux pour n = ${n}`);
    }

    // Archimède : l'encadrement contient π et correspond bien à n.
    const e = q.text.match(/pour \$n = (\d+)\$ \(bornes/);
    if (e) {
      controles++;
      const n = Number(e[1]);
      const m = q.expected[0].match(/^\$(\d)\{,\}(\d{3}) < \\pi < (\d)\{,\}(\d{3})\$$/);
      if (!m) signaler(item.id, `encadrement illisible : ${q.expected[0]}`);
      else {
        const bas = Number(`${m[1]}.${m[2]}`);
        const haut = Number(`${m[3]}.${m[4]}`);
        if (!(bas < Math.PI && Math.PI < haut)) signaler(item.id, `l'encadrement ne contient pas π : ${q.expected[0]}`);
        if (!(bas <= n * Math.sin(Math.PI / n) + 1e-9 && n * Math.sin(Math.PI / n) - bas < 0.001)) signaler(item.id, `borne basse fausse pour n = ${n}`);
        if (!(haut >= n * Math.tan(Math.PI / n) && haut - n * Math.tan(Math.PI / n) < 0.001)) signaler(item.id, `borne haute fausse pour n = ${n}`);
      }
    }

    // Archimède : doublements.
    const d = q.text.match(/part d'un (hexagone|carré) régulier inscrit dans le cercle, puis double (\d) fois/);
    if (d) {
      controles++;
      let n = d[1] === "hexagone" ? 6 : 4;
      for (let i = 0; i < Number(d[2]); i++) n *= 2;
      if (String(n) !== q.expected[0]) signaler(item.id, `${n} côtés, attendu ${q.expected[0]}`);
    }
  }
  console.log(`  ${item.id.padEnd(30)} ${item.kind === "template" ? `${enonces.size} énoncés distincts` : "figé"}`);
}

// Le programme Python d'Archimède, exécuté ici.
{
  let n = 6;
  let c = 1;
  for (let i = 0; i < 4; i++) {
    c = Math.sqrt(2 - Math.sqrt(4 - c * c));
    n *= 2;
  }
  const v = (n * c) / 2;
  console.log(`  programme d'Archimède : n = ${n}, n·c/2 = ${v.toFixed(5)}`);
  if (n !== 96 || !(v < Math.PI) || v.toFixed(4) !== "3.1410") signaler("python", `n = ${n}, ${v}`);
  if ((3 + 10 / 71).toFixed(4) !== "3.1408" || (3 + 1 / 7).toFixed(4) !== "3.1429") signaler("arch_fixed_5", "bornes décimales");
}

// Un contrôle qui ne se déclenche jamais passe toujours : on dit combien ont tourné.
console.log(`\n${controles} contrôles numériques sur les énoncés tirés.`);
console.log(erreurs ? `\n${erreurs} erreur(s)` : "\nTout est juste.");
process.exit(erreurs ? 1 : 0);
