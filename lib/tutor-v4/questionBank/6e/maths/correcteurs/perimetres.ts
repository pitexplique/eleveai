import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { longueursDuTexte, longueurAttendue, enUnite } from "./longueurs";

// Correcteurs des gabarits de perimetres.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT les longueurs du texte (et la figure s'il y en a une),
// refait le périmètre, et vérifie la réponse ET son unité : Frédéric (06/10) —
// l'unité est OBLIGATOIRE dans `expected` (« 24 » seul accepterait « 24 m »).

type Q = TutorGeneratedQuestionV4;
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const enM = (l: { v: number; u: string }) => enUnite(l.v, l.u, "m");

/** Règles communes : unité dans CHAQUE écriture acceptée, pas de barre de division, deux décimales au plus. */
function communes(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""])
    if (/\d\s*\/\s*\d/.test(s)) p.push(`barre de division : « ${s.slice(0, 60)} »`);
  if (q.format !== "qcm")
    for (const e of q.expected) if (/\d/.test(e) && !/\d\s?(mm|cm|m|km|unités?)\b/.test(e)) p.push(`écriture acceptée sans unité : « ${e} »`);
  for (const l of longueursDuTexte(q.text)) if (Math.round(l.v * 100) !== l.v * 100 && !egal(Math.round(l.v * 100), l.v * 100)) p.push(`plus de deux décimales : ${l.v}`);
  return p;
}
/** La réponse attendue vaut-elle `juste` (en mètres) ? QCM : une seule proposition juste, sans « ² ». */
function verifierLongueur(q: Q, justeM: number, p: string[]) {
  const att = longueurAttendue(q.expected[0]);
  if (!att) return p.push(`réponse sans unité de longueur : ${q.expected[0]}`);
  if (!egal(enM(att), justeM)) p.push(`réponse ${q.expected[0]}, recalculée ${enUnite(justeM, "m", att.u)} ${att.u}`);
  for (const e of q.expected.slice(1)) {
    const l = longueurAttendue(e.replace(/(\d)(mm|cm|m|km)$/, "$1 $2"));
    if (l && !egal(enM(l), justeM)) p.push(`écriture acceptée fausse : ${e}`);
  }
  if (q.format === "qcm") {
    const justes = (q.choices ?? []).filter((c) => {
      const l = longueurAttendue(c);
      return l && egal(enM(l), justeM);
    });
    if (justes.length !== 1) p.push(`${justes.length} propositions justes : ${justes.join(" | ")}`);
  }
  // L'unité de la réponse : celle demandée, sinon celle des données.
  const demandee = q.text.match(/(?:Donne la réponse|Réponds) en ([a-zà-ÿ]+)/);
  const unites: Record<string, string> = { millimètres: "mm", centimètres: "cm", mètres: "m", kilomètres: "km" };
  const ls = longueursDuTexte(q.text);
  if (demandee) {
    if (unites[demandee[1]] !== att.u) p.push(`unité demandée ${demandee[1]}, réponse en ${att.u}`);
  } else if (ls.length && !ls.some((l) => l.u === att.u)) p.push(`la réponse (${att.u}) n'est pas dans l'unité de l'énoncé`);
  return 0;
}

// ----- COMPRENDRE
// 03/11/2026 : ★1 sans histoire — « le contour », « le bord », « l’intérieur » d'une figure.
const TOUR = /clôture|ruban|bordure|galon|haie|le tour|guirlande|grillage|contour|\bbord\b/i;
const SURFACE = /peindre|gazon|moquette|carreler|vernir|surface|intérieur/i;
function corrigerComprendre(q: Q): string[] {
  const p = communes(q);
  const t = q.text;
  const choix = q.choices ?? [];
  if (choix.includes("le périmètre")) {
    const tour = TOUR.test(t);
    const surface = SURFACE.test(t);
    if (tour === surface) return [...p, "action illisible : ni tour ni surface (ou les deux)"];
    const juste = tour ? "le périmètre" : "l’aire";
    if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
    return p;
  }
  const ls = longueursDuTexte(t);
  if (ls.length === 2) {
    // Rectangle : le périmètre, pas le produit.
    const per = 2 * (enM(ls[0]) + enM(ls[1]));
    verifierLongueur(q, per, p);
    return p;
  }
  // Unité ou écriture : longueur pour un périmètre, « ² » pour une aire.
  const aire = /l’aire/.test(t);
  const att = q.expected[0];
  const carre = /²$/.test(att);
  if (aire !== carre) p.push(`on demande ${aire ? "une aire" : "un périmètre"}, la réponse est ${att}`);
  if (/³|kg/.test(att)) p.push("réponse en volume ou en masse");
  if (choix.filter((c) => (aire ? /²$/.test(c) : /^(\d+ )?(mm|cm|m|km)$/.test(c))).length !== 1) p.push("pas une seule proposition qui convient");
  return p;
}

// ----- CARRÉ et RECTANGLE
function corrigerCarre(q: Q): string[] {
  const p = communes(q);
  if (!/carré/.test(q.text)) return [...p, "le texte ne dit pas « carré »"];
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 1) return [...p, `il faut un seul côté, lu : ${ls.length}`];
  verifierLongueur(q, 4 * enM(ls[0]), p);
  return p;
}
function corrigerRectangle(q: Q): string[] {
  const p = communes(q);
  if (!/rectang/.test(q.text)) return [...p, "le texte ne dit pas « rectangle »"];
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 2) return [...p, `il faut une longueur et une largeur, lu : ${ls.length}`];
  if (ls[0].u !== ls[1].u && !/(?:Donne la réponse|Réponds) en/.test(q.text)) p.push("deux unités sans dire celle de la réponse");
  if (egal(enM(ls[0]), enM(ls[1]))) p.push("longueur = largeur : c'est un carré");
  verifierLongueur(q, 2 * (enM(ls[0]) + enM(ls[1])), p);
  return p;
}

// ----- FIGURES
const COTES_REGULIERS: Record<string, number> = {
  "triangle équilatéral": 3, losange: 4, "pentagone régulier": 5, "hexagone régulier": 6, "octogone régulier": 8,
};
/** Le contour d'une figure de carreaux, relu dans le dessin : un côté par voisin vide. */
function contourDuDessin(cells: [number, number][]) {
  const s = new Set(cells.map(([r, c]) => `${r},${c}`));
  if (s.size !== cells.length) return NaN;
  // D'un seul tenant ?
  const vus = new Set([`${cells[0][0]},${cells[0][1]}`]);
  const pile = [cells[0]];
  while (pile.length) {
    const [r, c] = pile.pop()!;
    for (const [a, b] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
      if (s.has(`${a},${b}`) && !vus.has(`${a},${b}`)) {
        vus.add(`${a},${b}`);
        pile.push([a, b]);
      }
  }
  if (vus.size !== s.size) return NaN;
  let n = 0;
  for (const [r, c] of cells) n += [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].filter(([a, b]) => !s.has(`${a},${b}`)).length;
  return n;
}
function corrigerFigure(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  const dessin = (q.canvas as any)?.grid?.filledCells as [number, number][] | undefined;
  if (dessin) {
    const n = contourDuDessin(dessin);
    if (Number.isNaN(n)) return [...p, "la figure n'est pas d'un seul tenant"];
    if (dessin.some(([r, c]) => r < 0 || c < 0 || r >= 6 || c >= 6)) p.push("un carreau sort du quadrillage");
    const cote = q.text.match(/carreau a un côté de ([\d,]+) (mm|cm|m)/);
    if (!cote) return [...p, "la longueur d'un carreau n'est pas donnée"];
    verifierLongueur(q, n * enUnite(Number(cote[1].replace(",", ".")), cote[2], "m"), p);
    return p;
  }
  const reg = Object.keys(COTES_REGULIERS).find((k) => q.text.includes(k));
  if (reg) {
    if (ls.length !== 1) return [...p, "polygone régulier : il faut un seul côté"];
    verifierLongueur(q, COTES_REGULIERS[reg] * enM(ls[0]), p);
    return p;
  }
  const annonce = q.text.match(/(\d) côtés|trois côtés/);
  const n = annonce ? (annonce[0] === "trois côtés" ? 3 : Number(annonce[1])) : ls.length;
  if (ls.length !== n) p.push(`le texte annonce ${n} côtés et en donne ${ls.length}`);
  if (ls.length === 3) {
    const [a, b, c] = ls.map(enM).sort((x, y) => x - y);
    if (a + b <= c) p.push("triangle impossible : le plus grand côté dépasse la somme des deux autres");
  }
  verifierLongueur(q, ls.reduce((s, l) => s + enM(l), 0), p);
  return p;
}

// 07/11/2026 : ★1, le dessin porte les longueurs. On les relit sur la figure.
/** Les longueurs écrites sur la figure, et le contrôle : le dessin est-il à leur échelle ? */
function longueursDuDessin(q: Q, p: string[]) {
  const c = q.canvas as any;
  if (c?.kind !== "triangle" && c?.kind !== "quadrilatere") return null;
  const cotes: [string, string][] = c.kind === "triangle" ? [["A", "B"], ["B", "C"], ["C", "A"]] : [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]];
  const lus = cotes.map(([x, y]) => {
    const l = longueurAttendue(String(c.sideLabels?.[x + y] ?? ""));
    return l ? { ...l, px: Math.hypot(c.points[x].x - c.points[y].x, c.points[x].y - c.points[y].y) } : null;
  });
  if (lus.some((l) => !l)) return null;
  const ls = lus as { v: number; u: string; px: number }[];
  if (new Set(ls.map((l) => l.u)).size !== 1) p.push("deux unités sur la figure");
  const r = ls.map((l) => l.px / l.v);
  if (Math.max(...r) / Math.min(...r) > 1.05) p.push(`figure pas à l’échelle : ${ls.map((l) => l.v).join(", ")}`);
  const m = ls.map(enM);
  if (2 * Math.max(...m) >= m.reduce((a, b) => a + b, 0)) p.push("figure impossible : un côté dépasse les autres réunis");
  return ls;
}
const nomDuDessin = (q: Q) => ((q.canvas as any)?.kind === "triangle" ? "triangle" : "quadrilatère");
function corrigerFigureLue(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuDessin(q, p);
  if (!ls) return [...p, "longueurs de la figure illisibles"];
  if (!q.text.includes(nomDuDessin(q))) p.push("le texte ne nomme pas la figure dessinée");
  if (longueursDuTexte(q.text).length) p.push("longueurs écrites dans le texte ET sur la figure");
  const annonce = q.text.match(/ses (\d) côtés/);
  if (annonce && Number(annonce[1]) !== ls.length) p.push("le texte annonce un autre nombre de côtés");
  if (!/[Cc]alcule son périmètre|[Tt]rouve son périmètre|Quel est son périmètre|Additionne ses|mesure son tour|Donne son périmètre/.test(q.text)) return [...p, "question non reconnue"];
  verifierLongueur(q, ls.reduce((s, l) => s + enM(l), 0), p);
  return p;
}
function corrigerCalculChoisi(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuDessin(q, p);
  if (!ls) return [...p, "longueurs de la figure illisibles"];
  if (!q.text.includes(nomDuDessin(q))) p.push("le texte ne nomme pas la figure dessinée");
  if (!/calcul|addition/.test(q.text) || !/périmètre|tour/.test(q.text)) return [...p, "question non reconnue"];
  const voulu = ls.map((l) => l.v).sort((a, b) => a - b).join();
  const justes = (q.choices ?? []).filter((c) => /^\d+(?: \+ \d+)+$/.test(c) && c.split(" + ").map(Number).sort((a, b) => a - b).join() === voulu);
  if (justes.length !== 1) p.push(`${justes.length} calculs justes : ${justes.join(" | ")}`);
  else if (q.expected[0] !== justes[0]) p.push(`réponse ${q.expected[0]}, recalculée ${justes[0]}`);
  return p;
}
const COTES_PAR_NOM: Record<string, number> = { triangle: 3, quadrilatère: 4, rectangle: 4, carré: 4, losange: 4, pentagone: 5, hexagone: 6, octogone: 8 };
function corrigerCombienDeCotes(q: Q): string[] {
  const p = communes(q);
  const noms = Object.keys(COTES_PAR_NOM).filter((k) => q.text.toLowerCase().includes(`un ${k}`));
  if (noms.length !== 1) return [...p, `figure illisible : ${noms.join(", ")}`];
  if (!/combien de (côtés|longueurs)/i.test(q.text)) return [...p, "question non reconnue"];
  const juste = String(COTES_PAR_NOM[noms[0]]);
  if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
  if ((q.choices ?? []).filter((c) => c === juste).length !== 1) p.push("la bonne réponse n’est pas proposée une seule fois");
  return p;
}

// ----- PROBLÈMES : le tour, moins l'ouverture, ou plusieurs fois le tour.
function corrigerProbleme(q: Q): string[] {
  const p = communes(q);
  const t = q.text;
  const ls = longueursDuTexte(t);
  const carre = /carré/.test(t);
  if (!carre && !/rectang/.test(t)) return [...p, "forme non dite (carré ou rectangle)"];
  const nDims = carre ? 1 : 2;
  if (ls.length < nDims) return [...p, "dimensions manquantes"];
  const dims = ls.slice(0, nDims).map(enM);
  let juste = carre ? 4 * dims[0] : 2 * (dims[0] + dims[1]);
  const ouverture = t.match(/(portail|entrée|barrière qui s’ouvre|passage) de/);
  const fois = t.match(/(\d+) fois le tour/);
  if (ouverture) {
    if (ls.length !== nDims + 1) return [...p, "l'ouverture n'a pas de longueur"];
    const o = enM(ls[nDims]);
    if (o >= Math.min(...dims)) p.push("l'ouverture est plus large qu'un côté");
    juste -= o;
  } else if (ls.length !== nDims) return [...p, `longueurs en trop : ${ls.length}`];
  if (fois) juste *= Number(fois[1]);
  if (!carre && egal(dims[0], dims[1])) p.push("rectangle à côtés égaux");
  verifierLongueur(q, juste, p);
  return p;
}

// ----- DÉFIS
function corrigerInverse(q: Q): string[] {
  const p = communes(q);
  const t = q.text;
  const ls = longueursDuTexte(t);
  if (/carré/.test(t)) {
    if (ls.length !== 1) return [...p, "carré : il faut un seul périmètre"];
    verifierLongueur(q, enM(ls[0]) / 4, p);
    return p;
  }
  if (ls.length !== 2) return [...p, "rectangle : il faut le périmètre et la longueur"];
  // Le périmètre est la plus grande des deux longueurs lues.
  const [lg, P] = ls.map(enM).sort((a, b) => a - b);
  const juste = P / 2 - lg;
  if (juste <= 0) p.push("largeur négative ou nulle");
  if (juste >= lg) p.push("la largeur dépasse la longueur");
  verifierLongueur(q, juste, p);
  return p;
}
function corrigerVariation(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 3) return [...p, "il faut deux dimensions et un allongement"];
  const x = enM(ls[2]);
  const juste = /longueur ET la largeur/.test(q.text) ? 4 * x : 2 * x;
  verifierLongueur(q, juste, p);
  return p;
}
function corrigerMemePerimetre(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 1) return [...p, "il faut le côté du carré"];
  const cible = 4 * enM(ls[0]);
  const justes = (q.choices ?? []).filter((c) => {
    const d = longueursDuTexte(c);
    return d.length === 2 && egal(2 * (enM(d[0]) + enM(d[1])), cible);
  });
  if (justes.length !== 1) return [...p, `${justes.length} rectangles ont le bon périmètre`];
  if (q.expected[0] !== justes[0]) p.push(`réponse ${q.expected[0]}, recalculée ${justes[0]}`);
  for (const c of q.choices ?? []) {
    const d = longueursDuTexte(c);
    if (d.length === 2 && egal(d[0].v, d[1].v)) p.push(`proposition carrée : ${c}`);
  }
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  aire_perimetre_probleme_tpl_1: corrigerProbleme,
  aire_perimetre_probleme_tpl_2: corrigerProbleme,
  aire_perimetre_probleme_tpl_3: corrigerProbleme,
  aire_perimetre_probleme_qcm_tpl_1: corrigerProbleme,
  aire_perimetre_defis_tpl_1: corrigerInverse,
  aire_perimetre_defis_tpl_3: corrigerInverse,
  aire_perimetre_defis_tpl_2: corrigerVariation,
  aire_perimetre_defis_qcm_tpl_1: corrigerMemePerimetre,
  aire_perimetre_figure_tpl_1: corrigerFigure,
  aire_perimetre_figure_tpl_2: corrigerFigure,
  aire_perimetre_figure_tpl_3: corrigerFigure,
  aire_perimetre_figure_canvas_tpl_1: corrigerFigure,
  aire_perimetre_figure_canvas_tpl_2: corrigerFigure,
  aire_perimetre_comprendre_tpl_1: corrigerComprendre,
  aire_perimetre_comprendre_tpl_2: corrigerComprendre,
  aire_perimetre_comprendre_tpl_3: corrigerComprendre,
  aire_perimetre_comprendre_tpl_situation: corrigerComprendre,
  aire_perimetre_carre_tpl_situation: corrigerCarre,
  aire_perimetre_figure_tpl_situation: corrigerFigure,
  aire_perimetre_figure_tpl_triangle_lu: corrigerFigureLue,
  aire_perimetre_figure_tpl_quadrilatere_lu: corrigerFigureLue,
  aire_perimetre_figure_tpl_calcul_choisi: corrigerCalculChoisi,
  aire_perimetre_figure_tpl_combien_cotes: corrigerCombienDeCotes,
  aire_perimetre_figure_tpl_somme_ecrite: corrigerFigure,
  aire_perimetre_figure_tpl_carreaux_nus: corrigerFigure,
  aire_perimetre_carre_tpl_1: corrigerCarre,
  aire_perimetre_carre_tpl_2: corrigerCarre,
  aire_perimetre_carre_qcm_tpl_1: corrigerCarre,
  aire_perimetre_rectangle_tpl_1: corrigerRectangle,
  aire_perimetre_rectangle_tpl_2: corrigerRectangle,
  aire_perimetre_rectangle_tpl_3: corrigerRectangle,
  aire_perimetre_rectangle_qcm_tpl_1: corrigerRectangle,
};
