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
  const demandee = q.text.match(/Donne la réponse en ([a-zà-ÿ]+)/);
  const unites: Record<string, string> = { millimètres: "mm", centimètres: "cm", mètres: "m", kilomètres: "km" };
  const ls = longueursDuTexte(q.text);
  if (demandee) {
    if (unites[demandee[1]] !== att.u) p.push(`unité demandée ${demandee[1]}, réponse en ${att.u}`);
  } else if (ls.length && !ls.some((l) => l.u === att.u)) p.push(`la réponse (${att.u}) n'est pas dans l'unité de l'énoncé`);
  return 0;
}

// ----- COMPRENDRE
const TOUR = /clôture|ruban|bordure|galon|haie|le tour|guirlande|grillage/;
const SURFACE = /peindre|gazon|moquette|carreler|vernir|surface/;
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
  if (ls[0].u !== ls[1].u && !/Donne la réponse en/.test(q.text)) p.push("deux unités sans dire celle de la réponse");
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
  aire_perimetre_carre_tpl_1: corrigerCarre,
  aire_perimetre_carre_tpl_2: corrigerCarre,
  aire_perimetre_carre_qcm_tpl_1: corrigerCarre,
  aire_perimetre_rectangle_tpl_1: corrigerRectangle,
  aire_perimetre_rectangle_tpl_2: corrigerRectangle,
  aire_perimetre_rectangle_tpl_3: corrigerRectangle,
  aire_perimetre_rectangle_qcm_tpl_1: corrigerRectangle,
};
