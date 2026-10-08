import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, entier, frN, lireReponse, memeMesure, mesures, net, nombres, num, verifierReponse, type Mesure } from "./grandeurs";

// LES CORRECTEURS DE volumes.bank.ts (notion volume_solide, 08/10/2026).
// Ils relisent dans le TEXTE les longueurs (« 12 cm »), les aires de base
// (« 40 cm² », « 9π cm² »), les volumes (« 4 800 cm³ », « 2,5 L ») et, quand il
// y en a une, la FIGURE (`solide_3d` : dimensions et étiquettes, assemblage de
// cubes). Puis ils refont le calcul sans passer par le gabarit : pavé
// (L × l × h, a³), prisme (aire de base × hauteur, triangle b × h ÷ 2),
// cylindre (r² × h en π, ou avec 3,14), conversions (1 L = 1 dm³ = 1 000 cm³,
// 1 m³ = 1 000 L), patrons de rangement, comparaisons. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/* ───────────────────────── lecture ───────────────────────── */

const LONG = ["mm", "cm", "dm", "m", "km"];
/** Chaque unité de volume en cm³. */
const EN_CM3: Record<string, number> = { "mm³": 0.001, "cm³": 1, "dm³": 1000, "m³": 1e6, L: 1000, cL: 10, mL: 1 };

/** Le texte, « 3 litres » écrit « 3 L » pour la lecture. */
const plat = (t: string) => t.replace(/(\d) litres?(?!\p{L})/gu, "$1 L");

function lire(t: string) {
  const ms = mesures(plat(t));
  return {
    lon: ms.filter((m) => LONG.includes(m.u)),
    aires: ms.filter((m) => m.u.endsWith("²")),
    vols: ms.filter((m) => EN_CM3[m.u] != null),
  };
}
/** L'unité de longueur d'une aire ou d'un volume : « cm² » → « cm ». */
const base = (u: string) => u.replace(/[²³]$/, "");

/** Une seule unité de longueur dans tout l'énoncé (pas de cm mélangés aux m). */
function memeUnite(ms: Mesure[]): string | null {
  const us = new Set(ms.map((m) => base(m.u)).filter((u) => LONG.includes(u)));
  return us.size === 1 ? [...us][0] : null;
}

/** La figure : ses dimensions et étiquettes doivent dire les nombres du texte. */
function verifierFigure(q: Q, attendus: Record<string, number>, u: string): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  const p: string[] = [];
  for (const [k, v] of Object.entries(attendus)) {
    if (c.dimensions?.[k] != null && !egal(c.dimensions[k], v)) p.push(`figure : ${k} = ${c.dimensions[k]} au lieu de ${v}`);
    const lab = c.labels?.[k];
    if (lab != null) {
      const r = lireReponse(String(lab).replace(/[  ]/g, " "));
      const uu = k === "aireBase" ? `${u}²` : u;
      if (!r || !egal(r.v, v) || r.u !== uu) p.push(`figure : étiquette ${k} « ${lab} » au lieu de ${frN(v)} ${uu}`);
    }
  }
  return p;
}

/* ───────────────────────── volume_comprendre ───────────────────────── */

/** Les cubes dessinés : on les compte, ils tiennent debout, les étages annoncés sont là. */
function corrigerCubes(q: Q): string[] {
  const cubes = ((q.canvas as any)?.cubes ?? []) as { x: number; y: number; z: number }[];
  if (!cubes.length) return ["aucun cube dessiné"];
  const cle = (c: { x: number; y: number; z: number }) => `${c.x},${c.y},${c.z}`;
  const vus = new Set(cubes.map(cle));
  const p: string[] = [];
  if (vus.size !== cubes.length) p.push("deux cubes au même endroit");
  for (const c of cubes) if (c.z > 0 && !vus.has(cle({ ...c, z: c.z - 1 }))) p.push(`un cube flotte en (${cle(c)})`);
  const etages = new Set(cubes.map((c) => c.z));
  const t = q.text;
  if (/seule (couche|épaisseur)|qu’un étage|plaque|dallage/.test(t) && etages.size !== 1) p.push(`${etages.size} étages pour « une seule couche »`);
  const annonce = t.match(/(\d+) étages/);
  if (annonce && Number(annonce[1]) !== etages.size) p.push(`${annonce[1]} étages annoncés, ${etages.size} dessinés`);
  if (/étages identiques|bloc régulier|pavé formé/.test(t)) {
    const parEtage = [...etages].map((z) => cubes.filter((c) => c.z === z).length);
    if (new Set(parEtage).size !== 1) p.push(`étages inégaux : ${parEtage.join(", ")}`);
  }
  return [...p, ...verifierReponse(q, vus.size, "")];
}

/** Deux constructions : la plus grande a le plus de cubes. */
function corrigerComparerCubes(q: Q): string[] {
  const [nA, nB] = nombres(q.text);
  const [c1, c2, eg] = q.choices ?? [];
  const prenoms = [...q.text.matchAll(/\p{Lu}\p{Ll}+/gu)].map((m) => m[0]).filter((x) => !/^(Quelle|Chaque|On|Laquelle)$/.test(x));
  const p: string[] = [];
  if (!c1?.endsWith(prenoms[0]) || !c2?.endsWith(prenoms[1])) p.push(`propositions ${c1} / ${c2} dans le désordre des prénoms ${prenoms.join(", ")}`);
  const juste = nA > nB ? c1 : nB > nA ? c2 : eg;
  if (eg !== "les deux ont le même volume") p.push("proposition « même volume » absente");
  return [...p, ...(q.expected[0] === juste ? [] : [`${nA} contre ${nB} : attendu « ${juste} »`])];
}

/** Volume, aire, longueur ou masse : ce qu'on cherche à connaître. */
function corrigerGrandeur(q: Q): string[] {
  const t = q.text;
  const juste = /pèse|masse|balance/.test(t)
    ? "une masse"
    : /surface|tapis sur le sol/.test(t)
      ? "une aire"
      : /tour d’une piste|hauteur|distance|longueur|profondeur/.test(t)
        ? "une longueur"
        : /quantité|contenance|capacité|place occupée|espace qu’occupe/.test(t)
          ? "un volume"
          : null;
  if (!juste) return ["grandeur illisible"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${juste} », pas « ${q.expected[0]} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/* ───────────────────────── aire de base × hauteur ───────────────────────── */

/** Une aire de base et une hauteur : V = A × h, en unité³. */
function corrigerAireFoisHauteur(q: Q): string[] {
  const { lon, aires, vols } = lire(q.text);
  if (aires.length !== 1 || lon.length !== 1 || vols.length) return [`une aire et une hauteur attendues : ${JSON.stringify({ aires, lon, vols })}`];
  const u = memeUnite([...aires, ...lon]);
  if (!u) return [`unités mélangées : ${aires[0].u} et ${lon[0].u}`];
  return [
    ...verifierReponse(q, aires[0].v * lon[0].v, `${u}³`),
    ...verifierFigure(q, { aireBase: aires[0].v, hauteur: lon[0].v }, u),
  ];
}

/** « On propose V » : oui si V = A × h. */
function corrigerOuiNon(q: Q, juste: number, propose: number): string[] {
  const rep = egal(net(juste), net(propose)) ? "oui" : "non";
  const p = q.expected[0] === rep ? [] : [`${frN(propose)} proposé, ${frN(juste)} juste : attendu « ${rep} »`];
  if (JSON.stringify(q.choices) !== JSON.stringify(["oui", "non"])) p.push("propositions autres que oui / non");
  return p;
}
function corrigerOuiNonAire(q: Q): string[] {
  const { lon, aires, vols } = lire(q.text);
  if (aires.length !== 1 || lon.length !== 1 || vols.length !== 1) return ["aire, hauteur et volume proposé attendus"];
  return corrigerOuiNon(q, aires[0].v * lon[0].v, vols[0].v);
}

/** Le volume et l'une des deux grandeurs : l'autre par une division. */
function corrigerInverse(q: Q): string[] {
  const { lon, aires, vols } = lire(q.text);
  if (vols.length !== 1) return ["un volume attendu"];
  const V = vols[0];
  const u = base(V.u);
  if (aires.length === 1 && !lon.length) {
    if (base(aires[0].u) !== u) return ["unités mélangées"];
    if (!/hauteur/.test(q.text)) return ["la question ne demande pas la hauteur"];
    return verifierReponse(q, V.v / aires[0].v, u);
  }
  if (lon.length === 1 && !aires.length) {
    if (lon[0].u !== u) return ["unités mélangées"];
    if (!/aire/.test(q.text)) return ["la question ne demande pas l'aire de la base"];
    return verifierReponse(q, V.v / lon[0].v, `${u}²`);
  }
  return [`données illisibles : ${JSON.stringify({ lon, aires })}`];
}

/** Base carrée : l'aire est côté × côté (le périmètre 4 × côté est le piège). */
function corrigerCarre(q: Q): string[] {
  const t = q.text;
  const c = t.match(new RegExp(`(?:côté ${NB}|${NB} \\p{L}+ de côté)`, "u"));
  const h = t.match(new RegExp(`(?:hauteur ${NB}|${NB} \\p{L}+ de haut)`, "u"));
  const calc = t.match(new RegExp(`${NB} × ${NB} = ${NB}`));
  if (!c || !h || !calc) return ["côté, hauteur ou calcul proposé illisible"];
  const cote = num(c[1] ?? c[2]);
  const ht = num(h[1] ?? h[2]);
  const [x, y, z] = [num(calc[1]), num(calc[2]), num(calc[3])];
  const p = egal(x * y, z) && egal(y, ht) ? [] : [`le calcul proposé ${x} × ${y} = ${z} est faux en lui-même`];
  return [...p, ...corrigerOuiNon(q, cote * cote * ht, z)];
}

/** Le calcul à poser : « A × h » (dans un ordre ou dans l'autre). */
function corrigerCalculAireHauteur(q: Q): string[] {
  const { lon, aires } = lire(q.text);
  if (aires.length !== 1 || lon.length !== 1) return ["une aire et une hauteur attendues"];
  const [A, h] = [frN(aires[0].v), frN(lon[0].v)];
  const forme = (c: string) => c === `${A} × ${h}` || c === `${h} × ${A}`;
  // Un calcul faux qui donne le bon NOMBRE serait aussi une bonne réponse.
  const V = aires[0].v * lon[0].v;
  return [...(forme(q.expected[0]) ? [] : [`attendu ${A} × ${h}, pas « ${q.expected[0]} »`]), ...qcmUnique(q, (c) => egal(calcul(c), V))];
}

/** La valeur d'un calcul écrit « 2 × (6 + 3) × 4 », « 50 ÷ 6 ». */
export function calcul(c: string): number | null {
  const e = c.replace(/×/g, "*").replace(/÷/g, "/").replace(/(\d),(\d)/g, "$1.$2");
  if (!/^[\d\s.+*/()-]+$/.test(e)) return null;
  try {
    return Number(Function(`"use strict"; return (${e});`)());
  } catch {
    return null;
  }
}

export const CORRECTEURS_A: CorrecteursMaths = {
  volume_comprendre_tpl_1: corrigerCubes,
  volume_comprendre_tpl_2: corrigerCubes,
  volume_comprendre_tpl_3: corrigerCubes,
  volume_comprendre_tpl_4: corrigerComparerCubes,
  volume_comprendre_tpl_5: corrigerGrandeur,
  volume_lien_aire_tpl_1: corrigerAireFoisHauteur,
  volume_lien_aire_tpl_2: corrigerOuiNonAire,
  volume_lien_aire_tpl_3: corrigerAireFoisHauteur,
  volume_lien_aire_tpl_4: corrigerInverse,
  volume_lien_aire_tpl_5: corrigerInverse,
  volume_lien_aire_tpl_6: corrigerCarre,
  volume_lien_aire_tpl_7: corrigerCalculAireHauteur,
};

/* ───────────────────────── pavé droit ───────────────────────── */

/** Les trois dimensions d'un pavé : dans le texte, sinon sur la figure. */
function troisDimensions(q: Q): { d: number[]; u: string } | null {
  const { lon } = lire(q.text);
  if (lon.length === 3) {
    const u = memeUnite(lon);
    return u ? { d: lon.map((m) => m.v), u } : null;
  }
  const c = q.canvas as any;
  if (!lon.length && c?.dimensions?.longueur != null && c?.labels?.longueur) {
    const u = lireReponse(String(c.labels.longueur))?.u;
    return u ? { d: [c.dimensions.longueur, c.dimensions.largeur, c.dimensions.hauteur], u } : null;
  }
  return null;
}
const trie = (xs: number[]) => [...xs].sort((a, b) => a - b).join(",");

/** La figure d'un pavé : mêmes trois dimensions que le texte, aire de base et volume cohérents. */
function figurePave(q: Q, d: number[], u: string): string[] {
  const c = q.canvas as any;
  if (!c?.dimensions) return [];
  const { longueur: L, largeur: l, hauteur: h, aireBase, volume } = c.dimensions;
  const p: string[] = [];
  if (trie([L, l, h]) !== trie(d)) p.push(`figure ${L} × ${l} × ${h} au lieu de ${d.join(" × ")}`);
  if (aireBase != null && !egal(aireBase, L * l)) p.push(`figure : aire de base ${aireBase} ≠ ${L} × ${l}`);
  if (volume != null && !egal(volume, L * l * h)) p.push(`figure : volume ${volume} ≠ ${L * l * h}`);
  for (const [k, v] of Object.entries({ longueur: L, largeur: l, hauteur: h, aireBase: L * l })) {
    const lab = c.labels?.[k];
    if (lab == null) continue;
    const r = lireReponse(String(lab).replace(/[  ]/g, " "));
    const uu = k === "aireBase" ? `${u}²` : u;
    if (!r || !egal(r.v, v) || r.u !== uu) p.push(`figure : étiquette ${k} « ${lab} » au lieu de ${frN(v)} ${uu}`);
  }
  return p;
}

/** Volume d'un pavé (ou d'un prisme à section rectangulaire) ; en litres ou en seaux si on le demande. */
function corrigerPave(q: Q): string[] {
  const r = troisDimensions(q);
  if (!r) return ["trois dimensions dans une même unité attendues"];
  const V = r.d[0] * r.d[1] * r.d[2];
  const t = q.text;
  const seau = t.match(new RegExp(`seaux de ${NB} L`));
  let p: string[];
  if (seau) {
    const n = (V * EN_CM3[`${r.u}³`]) / 1000 / num(seau[1]);
    p = [...(entier(n) ? [] : [`${n} seaux : pas un nombre entier`]), ...verifierReponse(q, n, "seaux")];
  } else if (/litres/.test(t)) p = verifierReponse(q, (V * EN_CM3[`${r.u}³`]) / 1000, "L");
  else p = verifierReponse(q, V, `${r.u}³`);
  return [...p, ...figurePave(q, r.d, r.u)];
}

/** Un cube : arête³. */
function corrigerCube(q: Q): string[] {
  const { lon } = lire(q.text);
  if (lon.length !== 1 || !/cubique|cube/.test(q.text)) return ["une arête de cube attendue"];
  const a = lon[0].v;
  return [...verifierReponse(q, a ** 3, `${lon[0].u}³`), ...figurePave(q, [a, a, a], lon[0].u)];
}

/** Le volume et deux dimensions : la troisième. */
function corrigerDimension(q: Q): string[] {
  const { lon, vols } = lire(q.text);
  if (vols.length !== 1 || lon.length !== 2) return ["un volume et deux dimensions attendus"];
  const u = base(vols[0].u);
  if (memeUnite(lon) !== u) return ["unités mélangées"];
  return verifierReponse(q, vols[0].v / (lon[0].v * lon[1].v), u);
}

function corrigerOuiNonPave(q: Q): string[] {
  const { lon, vols } = lire(q.text);
  if (lon.length !== 3 || vols.length !== 1) return ["trois dimensions et un volume proposé attendus"];
  return corrigerOuiNon(q, lon[0].v * lon[1].v * lon[2].v, vols[0].v);
}

/** Le calcul à poser : les trois dimensions multipliées. */
function corrigerCalculPave(q: Q): string[] {
  const { lon } = lire(q.text);
  if (lon.length !== 3) return ["trois dimensions attendues"];
  const V = lon[0].v * lon[1].v * lon[2].v;
  const m = q.expected[0].match(new RegExp(`^${NB} × ${NB} × ${NB}$`));
  const p = m && trie([num(m[1]), num(m[2]), num(m[3])]) === trie(lon.map((x) => x.v)) ? [] : [`attendu le produit des trois dimensions, pas « ${q.expected[0]} »`];
  return [...p, ...qcmUnique(q, (c) => egal(calcul(c), V))];
}

/* ───────────────────────── prisme droit ───────────────────────── */

/** Base triangulaire : (côté × hauteur ÷ 2) × longueur du prisme. */
function corrigerPrismeTriangle(q: Q): string[] {
  const { lon } = lire(q.text);
  const u = memeUnite(lon);
  if (lon.length !== 3 || !u || !/triang/i.test(q.text)) return ["un triangle (côté, hauteur) et une longueur attendus"];
  const V = (lon[0].v * lon[1].v * lon[2].v) / 2;
  const p = verifierReponse(q, V, `${u}³`);
  const c = (q.canvas as any)?.dimensions;
  if (c) {
    const autres = lon.map((m) => m.v);
    const i = autres.indexOf(c.hauteur);
    if (i < 0) p.push(`figure : hauteur ${c.hauteur} absente du texte`);
    else {
      autres.splice(i, 1);
      if (!egal(c.aireBase * 2, autres[0] * autres[1])) p.push(`figure : aire de base ${c.aireBase} ≠ ${autres[0]} × ${autres[1]} ÷ 2`);
    }
    if (c.volume != null && !egal(c.volume, V)) p.push(`figure : volume ${c.volume} ≠ ${V}`);
    p.push(...verifierFigure(q, { aireBase: c.aireBase, hauteur: c.hauteur }, u));
  }
  return p;
}

/** La méthode : l'aire de LA base (la bonne figure) × la hauteur du prisme. */
function corrigerMethodePrisme(q: Q): string[] {
  const f = q.text.match(/triangle|hexagone|pentagone|trapèze|rectangle/)?.[0];
  if (!f) return ["forme de la base illisible"];
  const du = /^[aeiouyh]/.test(f) ? `de l’${f}` : `du ${f}`;
  const juste = `l’aire ${du} multipliée par la hauteur du prisme`;
  return [...(q.expected[0] === juste ? [] : [`attendu « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

export const CORRECTEURS_B: CorrecteursMaths = {
  volume_pave_tpl_1: corrigerPave,
  volume_pave_tpl_2: corrigerPave,
  volume_pave_tpl_3: corrigerCube,
  volume_pave_tpl_4: corrigerPave,
  volume_pave_tpl_5: corrigerDimension,
  volume_pave_tpl_6: corrigerOuiNonPave,
  volume_pave_tpl_7: corrigerCalculPave,
  volume_prisme_tpl_1: corrigerAireFoisHauteur,
  volume_prisme_tpl_2: corrigerPrismeTriangle,
  volume_prisme_tpl_3: corrigerAireFoisHauteur,
  volume_prisme_tpl_4: corrigerPrismeTriangle,
  volume_prisme_tpl_5: corrigerPave,
  volume_prisme_tpl_6: corrigerInverse,
  volume_prisme_tpl_7: corrigerMethodePrisme,
};

/* ───────────────────────── cylindre ───────────────────────── */

/** Le rayon (ou la moitié du diamètre) et la hauteur d'un cylindre. */
function rayonHauteur(t: string): { r: number; h: number; u: string } | null {
  const { lon } = lire(t);
  const u = memeUnite(lon);
  if (lon.length !== 2 || !u) return null;
  const U = "\\p{L}+";
  const r = t.match(new RegExp(`(?:[Rr]ayon(?: de la base)? (?:de |: |mesure )?${NB}|${NB} ${U} de rayon|disque de ${NB} ${U} de rayon|disque de rayon ${NB})`, "u"));
  const d = t.match(new RegExp(`(?:[Dd]iamètre(?: du fond)?(?: [^:0-9]*)?(?:de |: |mesure )?${NB}|${NB} ${U} de diamètre|${NB} ${U} de large \\(son diamètre\\))`, "u"));
  if (!!r === !!d) return null;
  const m = (r ?? d)!;
  const val = num(m.slice(1).find((x) => x != null)!);
  const i = lon.findIndex((x) => x.v === val);
  if (i < 0) return null;
  const h = lon[1 - i].v;
  return { r: r ? val : val / 2, h, u };
}

/** La figure d'un cylindre : rayon, hauteur, aire de base en π. */
function figureCylindre(q: Q, r: number, h: number, u: string): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  const p: string[] = [];
  if (c.dimensions && (c.dimensions.rayon !== r || c.dimensions.hauteur !== h)) p.push(`figure : rayon ${c.dimensions.rayon}, hauteur ${c.dimensions.hauteur} au lieu de ${r}, ${h}`);
  if (c.labels?.rayon && c.labels.rayon !== `${frN(r)} ${u}`) p.push(`figure : étiquette rayon « ${c.labels.rayon} »`);
  if (c.labels?.hauteur && c.labels.hauteur !== `${frN(h)} ${u}`) p.push(`figure : étiquette hauteur « ${c.labels.hauteur} »`);
  if (c.labels?.aireBase && c.labels.aireBase !== `${frN(r * r)}π ${u}²`) p.push(`figure : étiquette aire de base « ${c.labels.aireBase} »`);
  return p;
}

/** Écriture du fichier de banque : espace des milliers à partir de 10 000 (« 1600π », « 12 000π »). */
const frV = (n: number) => {
  const [e, d] = String(net(n)).split(".");
  const ent = e.length > 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e;
  return d ? `${ent},${d}` : ent;
};

/** Valeur exacte « aπ » : a = r² × h, avec l'unité en tête ; aucune écriture admise ne dit un autre a. */
function verifierPi(q: Q, a: number, u: string): string[] {
  const p: string[] = [];
  const juste = `${frV(a)}π ${u}³`;
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : ${juste}`);
  for (const x of q.expected) {
    const m = String(x).match(new RegExp(`^${NB}(?:π| × π| \\* π| pi)(?: ${u}[³3])?$`));
    if (!m || num(m[1]) !== a) p.push(`écriture admise « ${x} » ≠ ${a}π`);
  }
  return p;
}

function corrigerCylindrePi(q: Q): string[] {
  const c = rayonHauteur(q.text);
  if (!c) return ["rayon (ou diamètre) et hauteur illisibles"];
  return [...verifierPi(q, c.r * c.r * c.h, c.u), ...figureCylindre(q, c.r, c.h, c.u)];
}
function corrigerCylindrePiQcm(q: Q): string[] {
  const c = rayonHauteur(q.text);
  if (!c) return ["rayon et hauteur illisibles"];
  const juste = `${frV(c.r * c.r * c.h)}π ${c.u}³`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}
/** π ≈ 3,14 : 3,14 × r² × h. */
function corrigerCylindre314(q: Q): string[] {
  const c = rayonHauteur(q.text);
  if (!c || !/3,14/.test(q.text)) return ["rayon, hauteur ou π ≈ 3,14 illisibles"];
  const V = 3.14 * c.r * c.r * c.h;
  if (/litres/.test(q.text)) return verifierReponse(q, (V * EN_CM3[`${c.u}³`]) / 1000, "L");
  return verifierReponse(q, V, `${c.u}³`);
}
/** L'aire du disque de base : r²π. */
function corrigerAireDisque(q: Q): string[] {
  const { lon } = lire(q.text);
  if (lon.length !== 1 || !/rayon/.test(q.text)) return ["un rayon attendu"];
  const juste = `${frV(lon[0].v ** 2)}π ${lon[0].u}²`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}
/** Base d'aire aπ, hauteur h : (a × h)π. */
function corrigerBasePi(q: Q): string[] {
  const m = q.text.match(new RegExp(`${NB}π (cm|dm|m)²`));
  const { lon } = lire(q.text);
  if (!m || lon.length !== 1 || lon[0].u !== m[2]) return ["aire de base en π et hauteur attendues"];
  const juste = `${frV(num(m[1]) * lon[0].v)}π ${m[2]}³`;
  return [...(q.expected[0] === juste ? [] : [`attendu ${juste}`]), ...qcmUnique(q, (x) => x === juste)];
}

/* ───────────────────────── unités ───────────────────────── */

/** Une conversion : 1 L = 1 dm³ = 1 000 cm³ ; 1 m³ = 1 000 dm³. */
function corrigerConversion(q: Q): string[] {
  const { vols } = lire(q.text);
  if (vols.length !== 1) return [`un volume attendu : ${JSON.stringify(vols)}`];
  const cible = q.text.match(/(?:en|de) (litres|cm³|dm³|m³)(?![\d])/)?.[1];
  if (!cible) return ["unité d'arrivée illisible"];
  const u = cible === "litres" ? "L" : cible;
  if (u === vols[0].u) return ["conversion vers la même unité"];
  return verifierReponse(q, (vols[0].v * EN_CM3[vols[0].u]) / EN_CM3[u], u);
}
/** L'unité d'un volume : au cube (ou le litre). */
function corrigerUniteVolume(q: Q): string[] {
  const vol = (c: string) => /^(mm|cm|dm|m)³$|^(L|mL|cL)$/.test(c);
  return [...(vol(q.expected[0]) ? [] : [`« ${q.expected[0]} » n'est pas une unité de volume`]), ...qcmUnique(q, vol)];
}

/* ───────────────────────── défis ───────────────────────── */

/** Deux solides A et B : aire de base × hauteur de chacun. */
function corrigerComparer(q: Q): string[] {
  const { lon, aires } = lire(q.text);
  if (aires.length !== 2 || lon.length !== 2) return ["deux aires et deux hauteurs attendues"];
  const vA = aires[0].v * lon[0].v;
  const vB = aires[1].v * lon[1].v;
  const juste = (c: string) => (vA > vB ? / A$/.test(c) : vB > vA ? / B$/.test(c) : c === "les deux ont le même volume");
  if (/moins|plus petit/.test(q.text)) return ["question à l'envers (le plus petit) : non prévue"];
  return [...(juste(q.expected[0]) ? [] : [`${vA} contre ${vB} : « ${q.expected[0]} » est faux`]), ...qcmUnique(q, juste)];
}

/** Des cubes d'arête a dans une boîte : (L ÷ a) × (l ÷ a) × (h ÷ a), en entiers. */
function corrigerRangement(q: Q): string[] {
  const { lon } = lire(q.text);
  const a = q.text.match(new RegExp(`${NB} cm (?:d’arête|de côté)`));
  if (!a || lon.length !== 4) return ["arête et trois dimensions attendues"];
  const ar = num(a[1]);
  const dims = lon.map((m) => m.v);
  dims.splice(dims.indexOf(ar), 1);
  const n = dims.reduce((s, d) => s * Math.floor(d / ar), 1);
  const p = dims.every((d) => entier(d / ar)) ? [] : ["l'arête ne tombe pas juste dans la boîte"];
  return [...p, ...verifierReponse(q, n, "")];
}

export const CORRECTEURS_C: CorrecteursMaths = {
  volume_cylindre_tpl_1: corrigerCylindrePi,
  volume_cylindre_tpl_2: corrigerCylindrePi,
  volume_cylindre_tpl_3: corrigerCylindrePi,
  volume_cylindre_tpl_4: corrigerCylindrePiQcm,
  volume_cylindre_tpl_5: corrigerCylindre314,
  volume_cylindre_tpl_6: corrigerCylindrePi,
  volume_cylindre_tpl_7: corrigerAireDisque,
  volume_cylindre_tpl_8: corrigerBasePi,
  volume_cylindre_tpl_9: corrigerAireFoisHauteur,
  volume_unite_tpl_1: corrigerConversion,
  volume_unite_tpl_2: corrigerConversion,
  volume_unite_tpl_3: corrigerConversion,
  volume_unite_tpl_4: corrigerConversion,
  volume_unite_tpl_5: corrigerConversion,
  volume_unite_tpl_6: corrigerUniteVolume,
  volume_unite_tpl_7: corrigerConversion,
  volume_unite_tpl_8: corrigerPave,
  volume_defi_tpl_1: corrigerPave,
  volume_defi_tpl_2: corrigerComparer,
  volume_defi_tpl_3: corrigerCylindrePi,
  volume_defi_tpl_4: corrigerPave,
  volume_defi_tpl_5: corrigerCylindre314,
  volume_defi_tpl_6: corrigerRangement,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  ...CORRECTEURS_A,
  ...CORRECTEURS_B,
  ...CORRECTEURS_C,
});

// Utilisés par la suite du fichier.
export { lire, base, memeUnite, verifierFigure, corrigerOuiNon, EN_CM3, LONG, plat, entier, memeMesure };
