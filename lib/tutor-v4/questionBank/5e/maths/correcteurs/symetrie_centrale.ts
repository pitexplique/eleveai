import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE symetrie_centrale.bank.ts (notion sym_centrale, 13/10/2026).
// Ils relisent le TEXTE (le centre nommé, les longueurs « OA = 3 cm », les
// carreaux, les mots du mouvement : demi-tour, pliage, glissement) et la FIGURE
// (centre, figure bleue, figure rouge), puis refont le raisonnement : l'image
// d'un point P par la symétrie de centre C est 2C − P ; la symétrie conserve
// longueurs, angles, périmètres et aires. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };
const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
const NB = "(\\d+(?:,\\d+)?)";

const egalPt = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;
const memeEnsemble = (u: Pt[], v: Pt[]) =>
  u.length === v.length && u.every((p) => v.some((q) => egalPt(p, q))) && v.every((p) => u.some((q) => egalPt(p, q)));

/** Le centre nommé dans le texte (« centre O », « par rapport à O », « autour de O »). */
function centreTexte(t: string): string | null {
  const m =
    t.match(/symétrie de centre ([A-Z])(?![A-Za-z])/) ??
    t.match(/par rapport (?:au point |au centre |à )([A-Z])(?![A-Za-z'])/) ??
    t.match(/autour (?:du point |du centre |de )([A-Z])(?![A-Za-z'])/) ??
    t.match(/centre ([A-Z])(?![A-Za-z'])/);
  return m ? m[1] : null;
}

/** La figure : centre, figure bleue, figure rouge ; et ses défauts de dessin. */
function figure(q: Q): { c: Pt; src: Pt[]; img: Pt[]; C: string; F: string; p: string[] } | null {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "transformation" || !cv.center || !cv.image) return null;
  const p: string[] = [];
  const g = cv.grid ?? { rows: 8, cols: 8 };
  for (const pt of [...cv.source.points, ...cv.image.points, cv.center.point])
    if (pt.x < 0 || pt.y < 0 || pt.x > g.cols || pt.y > g.rows) p.push(`point (${pt.x};${pt.y}) hors du quadrillage`);
  const C = cv.center.label ?? "O";
  const F = cv.source.label ?? "";
  const ct = centreTexte(q.text);
  if (ct && ct !== C) p.push(`centre du texte « ${ct} » ≠ centre de la figure « ${C} »`);
  if (!new RegExp(`(?<![A-Za-z])${C}(?![A-Za-z'])`).test(q.text)) p.push(`le centre « ${C} » n'est pas nommé dans le texte`);
  if (F && !new RegExp(`(?<![A-Za-z])${F}(?![A-Za-z'])`).test(q.text)) p.push(`la figure « ${F} » n'est pas nommée dans le texte`);
  if (cv.image.label !== `${F}'`) p.push(`figure rouge nommée « ${cv.image.label} » au lieu de « ${F}' »`);
  return { c: cv.center.point, src: cv.source.points, img: cv.image.points, C, F, p };
}
const imageJuste = (src: Pt[], c: Pt) => src.map((p) => ({ x: 2 * c.x - p.x, y: 2 * c.y - p.y }));

/** Oui / non : la figure rouge est-elle l'image de la bleue ? */
function ouiNonFigure(q: Q): string[] {
  const f = figure(q);
  if (!f) return ["pas de figure de symétrie centrale"];
  const juste = memeEnsemble(f.img, imageJuste(f.src, f.c)) ? "oui" : "non";
  const p = [...f.p];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », la figure dit « ${juste} »`);
  if (JSON.stringify([...(q.choices ?? [])].sort()) !== JSON.stringify(["non", "oui"])) p.push("propositions autres que oui / non");
  return p;
}

/** Le mouvement décrit : demi-tour, pliage ou glissement. */
function mouvement(q: Q): string[] {
  const t = q.text;
  const quoi = /demi-tour/.test(t)
    ? "une symétrie centrale"
    : /pli|miroir/.test(t)
      ? "une symétrie axiale"
      : /glisse|tout droit|en ligne droite/.test(t)
        ? "un glissement"
        : null;
  if (!quoi) return ["mouvement non reconnu dans le texte"];
  const p = qcmUnique(q, (c) => c === quoi);
  if (/demi-tour/.test(t) && /pli|miroir|glisse/.test(t)) p.push("deux mouvements dans le même texte");
  return p;
}

/** La réponse attendue « 4,5 cm » : la valeur juste et l'unité. */
function reponse(q: Q, juste: number, unite: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), juste)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${String(juste).replace(".", ",")}`);
  else if (m[2].trim() !== unite) p.push(`unité « ${m[2]} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  if (Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-6) p.push("plus de deux décimales");
  return p;
}

/** Les longueurs données « XY = 3 cm » ou « XY' = 3 cm » (X, Y : lettres). */
function longueurs(t: string): { a: string; b: string; prime: boolean; v: number; u: string }[] {
  return [...t.matchAll(new RegExp(`(?<![A-Za-z])([A-Z])([A-Z])(')? = ${NB} (cm|m)(?![a-z²³])`, "g"))].map((m) => ({
    a: m[1],
    b: m[2],
    prime: !!m[3],
    v: num(m[4]),
    u: m[5],
  }));
}

/** OA' (ou OA) donné, l'autre demandé : même longueur. */
function distanceCentre(q: Q): string[] {
  const C = centreTexte(q.text);
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une longueur donnée attendue, lu ${L.length}`];
  const l = L[0];
  if (l.a !== C) return [`la longueur donnée ${l.a}${l.b} ne part pas du centre ${C}`];
  const demande = q.text.match(new RegExp(`(?:mesure|longueur|distance|vaut) ${C}${l.b}(')? \\?`));
  if (!demande) return ["longueur demandée non trouvée"];
  if (!!demande[1] === l.prime) return ["on demande la longueur déjà donnée"];
  return reponse(q, l.v, l.u);
}

/** Les chemins sur le quadrillage : « 3 carreaux vers la droite et 2 carreaux vers le haut ». */
const RE_CHEMIN = /(\d+) carreaux? vers la (droite|gauche) et (\d+) carreaux? vers le (haut|bas)/;
function cheminQuadrillage(q: Q): string[] {
  const m = q.text.match(RE_CHEMIN);
  if (!m) return ["chemin de C à A non trouvé"];
  const C = centreTexte(q.text);
  if (!new RegExp(`de ${C} à [A-Z]'(?: \\?|, que)|[A-Z]' en partant de ${C} \\?`).test(q.text)) return [`la question ne part pas du centre ${C}`];
  const cx = (n: string) => `${n} carreau${Number(n) > 1 ? "x" : ""}`;
  const juste = `${cx(m[1])} vers la ${m[2] === "droite" ? "gauche" : "droite"} et ${cx(m[3])} vers le ${m[4] === "haut" ? "bas" : "haut"}`;
  const p = qcmUnique(q, (c) => c === juste);
  for (const c of q.choices ?? []) if (!RE_CHEMIN.test(c)) p.push(`proposition mal écrite : « ${c} »`);
  return p;
}

/** Sur une droite : « A est à 3 cm à gauche de O » → « 3 cm à droite de O ». */
function reporter(q: Q): string[] {
  const C = centreTexte(q.text);
  const m = q.text.match(new RegExp(`(?:est|il est) à (\\d+) (carreaux|cm) (à gauche de|à droite de|au-dessus de|au-dessous de) ${C}\\.`));
  if (!m) return ["position de A non trouvée"];
  const opp: Record<string, string> = {
    "à gauche de": "à droite de",
    "à droite de": "à gauche de",
    "au-dessus de": "au-dessous de",
    "au-dessous de": "au-dessus de",
  };
  return qcmUnique(q, (c) => c === `${m[1]} ${m[2]} ${opp[m[3]]} ${C}`);
}

/** Le centre au milieu de [AA'] : OA donné → AA' = 2 OA ; AA' donné → OA = AA' ÷ 2. */
function milieuSegment(q: Q): string[] {
  const C = centreTexte(q.text);
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une longueur donnée attendue, lu ${L.length}`];
  const l = L[0];
  if (l.a === C) {
    if (!new RegExp(`\\[?${l.b}${l.b}'\\]? \\?|sépare ${l.b} de ${l.b}' \\?`).test(q.text)) return ["on attend la question sur le segment"];
    return reponse(q, 2 * l.v, l.u);
  }
  if (l.a === l.b && l.prime) {
    if (!new RegExp(`${C}${l.a}'? \\?|${C} se trouve ${l.a} \\?`).test(q.text)) return ["on attend la question sur la distance au centre"];
    return reponse(q, l.v / 2, l.u);
  }
  return [`longueur donnée inattendue : ${l.a}${l.b}`];
}

/** Quelle transformation envoie la figure bleue sur la rouge ? (recalculée sur la figure) */
function transfoFigure(q: Q): string[] {
  const f = figure(q);
  if (!f) return ["pas de figure"];
  const { c, src, img, C } = f;
  const estTranslatee = src.some((_, j) => {
    const v = { x: img[j].x - src[0].x, y: img[j].y - src[0].y };
    return (v.x !== 0 || v.y !== 0) && memeEnsemble(src.map((p) => ({ x: p.x + v.x, y: p.y + v.y })), img);
  });
  const vaut = (ch: string): boolean => {
    if (ch === `la symétrie de centre ${C}`) return memeEnsemble(img, imageJuste(src, c));
    if (ch === `le pliage le long de la droite verticale qui passe par ${C}`) return memeEnsemble(img, src.map((p) => ({ x: 2 * c.x - p.x, y: p.y })));
    if (ch === `le pliage le long de la droite horizontale qui passe par ${C}`) return memeEnsemble(img, src.map((p) => ({ x: p.x, y: 2 * c.y - p.y })));
    if (ch === "un glissement, sans tourner") return estTranslatee;
    return false;
  };
  const p = [...f.p, ...qcmUnique(q, vaut)];
  for (const ch of q.choices ?? []) if (!/^(la symétrie de centre|le pliage le long|un glissement)/.test(ch)) p.push(`proposition inconnue « ${ch} »`);
  return p;
}

/** Combien de sommets rouges sont mal placés ? (recompté sur la figure) */
function compterFaux(q: Q): string[] {
  const f = figure(q);
  if (!f) return ["pas de figure"];
  const bon = imageJuste(f.src, f.c);
  const faux = bon.filter((b) => !f.img.some((i) => egalPt(i, b))).length;
  const p = [...f.p];
  if (f.img.length !== f.src.length) p.push("pas autant de sommets rouges que de sommets bleus");
  if (String(q.expected[0]) !== String(faux)) p.push(`attendu « ${q.expected[0]} », la figure a ${faux} sommet(s) mal placé(s)`);
  if (q.comparator !== "number_equal") p.push("comparateur");
  return p;
}

/** La méthode de construction : construire l'image de CHAQUE sommet nommé, puis relier. */
function methodeConstruction(q: Q): string[] {
  const m =
    q.text.match(/(?:le|du) segment \[([A-Z]{2})\]/) ??
    q.text.match(/(?:le|du) triangle ([A-Z]{3})(?![A-Za-z])/) ??
    q.text.match(/(?:le|du) quadrilatère ([A-Z]{4})(?![A-Za-z])/);
  if (!m) return ["figure non nommée dans le texte"];
  const L = m[1].split("");
  const juste = (c: string) => /^construire /.test(c) && !/seulement/.test(c) && L.every((l) => c.includes(`${l}'`));
  return qcmUnique(q, juste);
}

/** La figure nommée : « triangle EFG », « quadrilatère MNPQ », « rectangle RSTU ». */
const nomFigureTexte = (t: string) => t.match(/(?:triangle|quadrilatère|rectangle) ([A-Z]{3,4})(?![A-Za-z'])/)?.[1] ?? null;

/** Un côté de l'image : la symétrie conserve les longueurs. */
function coteImage(q: Q): string[] {
  const nom = nomFigureTexte(q.text);
  const L = longueurs(q.text);
  const m = q.text.match(/([A-Z])'([A-Z])' \?/);
  if (!nom || !m) return ["figure ou côté demandé non trouvé"];
  if (L.length !== 3) return [`trois côtés attendus, lu ${L.length}`];
  const [a, b, c] = L.map((l) => l.v);
  if (a + b <= c || b + c <= a || a + c <= b) return ["triangle impossible (inégalité triangulaire)"];
  const l = L.find((x) => [x.a, x.b].sort().join("") === [m[1], m[2]].sort().join(""));
  if (!l) return [`le côté ${m[1]}${m[2]} n'est pas donné`];
  return reponse(q, l.v, "cm");
}

/** Un angle de l'image : conservé ; le troisième angle d'un triangle = 180 − les deux autres. */
function angleImage(q: Q): string[] {
  const nom = nomFigureTexte(q.text);
  const donnes = [...q.text.matchAll(/angle en ([A-Z]) mesure (\d+)°/g)].map((m) => ({ l: m[1], v: Number(m[2]) }));
  const m = q.text.match(/angle en ([A-Z])'/);
  if (!nom || !m || donnes.length !== 2) return ["triangle, angles donnés ou angle demandé non trouvés"];
  if (!nom.includes(m[1]) || donnes.some((d) => !nom.includes(d.l))) return ["lettres hors du triangle"];
  const s = donnes[0].v + donnes[1].v;
  if (s >= 180) return ["angles impossibles (somme ≥ 180°)"];
  const d = donnes.find((x) => x.l === m[1]);
  return reponse(q, d ? d.v : 180 - s, "°");
}

/** « Vrai ou faux ? » : la longueur ou l'angle image doit être égal(e) à celui de départ. */
function vraiFaux(q: Q): string[] {
  const m =
    q.text.match(new RegExp(`\\[([A-Z]{2})\\] mesure ${NB} cm et son image \\[([A-Z])'([A-Z])'\\] mesure ${NB} cm`)) ??
    q.text.match(new RegExp(`angle en ([A-Z]) mesure ${NB}° et son image, l’angle en ([A-Z])', mesure ${NB}°`));
  if (!m) return ["affirmation non lue"];
  const vals = m.slice(1).filter((x) => /^\d/.test(x)).map(num);
  const juste = egal(vals[0], vals[1]) ? "vrai" : "faux";
  const p = qcmUnique(q, (c) => c === juste);
  if (!/Vrai ou faux \?$/.test(q.text)) p.push("la question doit finir par « Vrai ou faux ? »");
  return p;
}

/** Le périmètre de l'image : somme des côtés donnés. */
function perimetreImage(q: Q): string[] {
  const nom = nomFigureTexte(q.text);
  const L = longueurs(q.text);
  if (!nom || !/périmètre/.test(q.text)) return ["figure ou périmètre non trouvés"];
  if (L.length !== nom.length) return [`${nom.length} côtés attendus, lu ${L.length}`];
  const v = L.map((l) => l.v);
  if (2 * Math.max(...v) >= v.reduce((s, x) => s + x, 0)) return ["figure impossible (un côté trop long)"];
  if (L.some((l) => !nom.includes(l.a) || !nom.includes(l.b))) return ["côté hors de la figure"];
  return reponse(q, v.reduce((s, x) => s + x, 0), "cm");
}

/** L'aire de l'image : celle du rectangle (L × l) ou du triangle (base × hauteur ÷ 2). */
function aireImage(q: Q): string[] {
  const t = q.text;
  let aire: number | null = null;
  const r1 = t.match(new RegExp(`longueur de ${NB} cm et une largeur de ${NB} cm`));
  const tri = t.match(new RegExp(`base \\[[A-Z]{2}\\] mesure ${NB} cm et la hauteur issue de [A-Z] mesure ${NB} cm`));
  if (r1) aire = num(r1[1]) * num(r1[2]);
  else if (tri) aire = (num(tri[1]) * num(tri[2])) / 2;
  else if (/rectangle/.test(t)) {
    const L = longueurs(t);
    if (L.length === 2) aire = L[0].v * L[1].v;
  }
  if (aire == null) return ["dimensions non lues"];
  return reponse(q, aire, "cm²");
}

/** La construction d'un élève : juste ssi sur la droite, de l'autre côté du centre, à la même distance. */
function constructionEleve(q: Q): string[] {
  const C = centreTexte(q.text);
  const oa = longueurs(q.text).find((l) => l.a === C && !l.prime);
  const m = q.text.match(new RegExp(`place ([A-Z])' (.*?)\\. `));
  if (!oa || !m) return ["distance au centre ou placement non lus"];
  const pl = m[2];
  const dist = pl.match(new RegExp(`à ${NB} cm de ${C}`));
  if (!dist) return ["distance de A' au centre non lue"];
  const aligne = new RegExp(`^sur la droite \\(${m[1]}${C}\\)`).test(pl) && !/pas sur la droite/.test(pl);
  const autreCote = new RegExp(`de l’autre côté de ${C}`).test(pl);
  const juste = aligne && autreCote && egal(num(dist[1]), oa.v) ? "oui" : "non";
  const p = q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », la construction est ${juste === "oui" ? "juste" : "fausse"}`];
  if (/du même côté/.test(pl) && egal(num(dist[1]), oa.v)) p.push("même côté et même distance : A' serait A");
  return p;
}

/** Deux points et leurs symétriques : A'B' = AB, A'B = AB', périmètre de ABA'B' = 2 (AB + AB'). */
function deuxPoints(q: Q): string[] {
  const L = longueurs(q.text);
  const ab = L.find((l) => !l.prime);
  const abp = L.find((l) => l.prime);
  if (L.length !== 2 || !ab || !abp || ab.a !== abp.a || ab.b !== abp.b) return ["AB et AB' non lus"];
  const [A, B] = [ab.a, ab.b];
  const t = q.text;
  if (new RegExp(`périmètre du quadrilatère ${A}${B}${A}'${B}'`).test(t)) return reponse(q, 2 * (ab.v + abp.v), "cm");
  if (new RegExp(`${A}'${B}' \\?`).test(t)) return reponse(q, ab.v, "cm");
  if (new RegExp(`${A}'${B} \\?`).test(t)) return reponse(q, abp.v, "cm");
  return ["question non reconnue"];
}

/** Le français : pas de « de le », « à le », ni de « de A » devant voyelle oubliée dans nos phrases. */
function francais(c: CorrecteursMaths): CorrecteursMaths {
  return Object.fromEntries(
    Object.entries(c).map(([id, f]) => [
      id,
      (q: Q) => {
        const p = f(q);
        for (const s of [q.text, ...(q.choices ?? [])])
          if (/(?<![a-zé])(de|à) (le|les) /.test(s) || /\s{2,}|\s[.,?]/.test(s.replace(/ \?/g, "?").replace(/ :/g, ":")))
            p.push(`français : « ${s.slice(0, 100)} »`);
        return p;
      },
    ]),
  );
}

export const CORRECTEURS: CorrecteursMaths = francais(avecRegleMotsCles({
  "5e_sym_centrale_defi_tpl_1_reunion": milieuSegment,
  "5e_sym_centrale_defi_tpl_2_canvas": ouiNonFigure,
  "5e_sym_centrale_defi_tpl_3_erreur_eleve": constructionEleve,
  "5e_sym_centrale_defi_tpl_4_deux_points": deuxPoints,
  "5e_sym_centrale_propriete_tpl_1_longueur": coteImage,
  "5e_sym_centrale_propriete_tpl_2_angle": angleImage,
  "5e_sym_centrale_propriete_tpl_3_perimetre": perimetreImage,
  "5e_sym_centrale_propriete_tpl_4_vrai_faux": vraiFaux,
  "5e_sym_centrale_propriete_tpl_5_aire": aireImage,
  "5e_sym_centrale_figure_tpl_1_triangle": ouiNonFigure,
  "5e_sym_centrale_figure_tpl_2_quadrilatere": transfoFigure,
  "5e_sym_centrale_figure_tpl_3_segment": methodeConstruction,
  "5e_sym_centrale_figure_tpl_4_canvas_non": compterFaux,
  "5e_sym_centrale_point_tpl_1_distance": distanceCentre,
  "5e_sym_centrale_point_tpl_2_coordonnees": cheminQuadrillage,
  "5e_sym_centrale_point_tpl_3_graduation": reporter,
  "5e_sym_centrale_point_tpl_4_segment": milieuSegment,
  "5e_sym_centrale_reconnaitre_tpl_1_canvas_oui": ouiNonFigure,
  "5e_sym_centrale_reconnaitre_tpl_2_piege_non": ouiNonFigure,
  "5e_sym_centrale_reconnaitre_tpl_3_mouvement": mouvement,
}));
