import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, degresDe, estMilieuSurFigure, longueursDe, perpendiculaireSurFigure, reponseDegres, reponseLongueur, reponseQcm, sommetsDe } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE points-remarquables.bank.ts (05/11/2026). Ils relisent le TEXTE
// (longueurs, angles, noms) et, pour les figures à lire, les COORDONNÉES du dessin ;
// puis refont le calcul sans passer par le gabarit. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** La première longueur du texte, puis une fonction de cette longueur. */
const surLongueur = (f: (v: number) => number) => (q: Q) => {
  const [L] = longueursDe(q.text);
  return L ? reponseLongueur(q, f(L.v), L.u) : ["longueur illisible"];
};

const pasDeFigureFausse = (q: Q, m: string, a: string, b: string) => (estMilieuSurFigure(q, m, a, b) ? [] : [`${m} n’est pas le milieu de [${a}${b}] sur la figure`]);

function medianeNommee(q: Q) {
  const [a, b, c] = sommetsDe(q.text);
  const lu = q.text.match(/([A-Z]) (?:est le )?milieu de|en deux en ([A-Z])|avec ([A-Z]) au milieu|, ([A-Z]) milieu/);
  const nom = lu?.slice(1).find(Boolean);
  if (!a || !nom) return ["milieu illisible"];
  return [...reponseQcm(q, `[${a}${nom}]`), ...pasDeFigureFausse(q, nom, b, c)];
}

function medianeArrive(q: Q) {
  const [a, b, c] = sommetsDe(q.text);
  const issue = q.text.match(/(?:issue de|partie de) ([A-Z])/)?.[1];
  if (issue !== a) return ["sommet de la médiane illisible"];
  return reponseQcm(q, `le milieu de [${b}${c}]`);
}

function medianeSurFigure(q: Q) {
  const [a, b, c] = sommetsDe(q.text);
  const [, x, y] = String(q.expected[0]).split("");
  if (x !== a) return [`la médiane attendue ne part pas de ${a}`];
  return estMilieuSurFigure(q, y, b, c) ? [] : ["le segment attendu n’arrive pas au milieu du côté opposé"];
}

/** Moitié de la seule aire donnée. */
function moitieAire(q: Q) {
  const [A] = airesDe(q.text);
  return A ? reponseLongueur(q, A.v / 2, A.u) : ["aire illisible"];
}

function medianePythagore(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 2 || !/rectangle|droit/.test(q.text)) return ["côtés illisibles"];
  return reponseLongueur(q, Math.hypot(l[0].v, l[1].v) / 2, l[0].u);
}

const nomGravite = (q: Q) => (/médianes/.test(q.text) ? reponseQcm(q, "le centre de gravité") : ["le texte ne parle pas des médianes"]);

function positionGravite(q: Q) {
  const [a] = sommetsDe(q.text);
  return reponseQcm(q, `aux deux tiers en partant de ${a}`);
}

function gravite2tiersOuTiers(q: Q) {
  const [L] = longueursDe(q.text);
  if (!L) return ["médiane illisible"];
  const [a] = sommetsDe(q.text);
  // Ce qu'on demande : aG (sommet) ou Gm (milieu).
  const versSommet = new RegExp(`${a}G|de ${a} à G|sépare ${a} de G`).test(q.text);
  return reponseLongueur(q, versSommet ? (2 * L.v) / 3 : L.v / 3, L.u);
}

function grandeMediane(q: Q) {
  const [L] = longueursDe(q.text);
  return L ? reponseLongueur(q, (3 * L.v) / 2, L.u) : ["longueur illisible"];
}

const equilibre = surLongueur((v) => (2 * v) / 3);

function coordonneesGravite(q: Q) {
  const c = [...q.text.matchAll(/[A-Z]\((\d+) ; (\d+)\)/g)];
  if (c.length !== 3) return ["sommets illisibles"];
  const gx = c.reduce((s, m) => s + Number(m[1]), 0) / 3;
  const gy = c.reduce((s, m) => s + Number(m[2]), 0) / 3;
  return reponseQcm(q, `(${gx} ; ${gy})`);
}

function hypotenuseVersG(q: Q) {
  const [L] = longueursDe(q.text);
  return L ? reponseLongueur(q, L.v / 3, L.u) : ["hypoténuse illisible"];
}

function tiersVersAutre(q: Q) {
  const [L] = longueursDe(q.text);
  if (!L) return ["longueur illisible"];
  const [a] = sommetsDe(q.text);
  const fin = q.text.slice(q.text.lastIndexOf(L.v + " " + L.u));
  const versSommet = new RegExp(`${a}G`).test(fin);
  return reponseLongueur(q, versSommet ? 2 * L.v : 3 * L.v, L.u);
}

/* ───── bissectrice ───── */
const memeDistance = surLongueur((v) => v);

function moitieAngle(q: Q) {
  const [x] = degresDe(q.text);
  return x ? reponseDegres(q, x / 2) : ["angle illisible"];
}
function doubleAngle(q: Q) {
  const [x] = degresDe(q.text);
  return x ? reponseDegres(q, x * 2) : ["angle illisible"];
}
function surBissectrice(q: Q) {
  const l = longueursDe(q.text);
  const nom = q.text.match(/(?:Distance de |Le point |^)([A-Z]),? /)?.[1] ?? q.text.match(/^([A-Z]) est/)?.[1];
  const ang = q.text.match(/\$\\widehat\{[A-Z]{3}\}\$/)?.[0];
  if (l.length !== 2 || !nom || !ang) return ["distances illisibles"];
  return reponseQcm(q, l[0].v === l[1].v ? `${nom} est sur la bissectrice de ${ang}` : `${nom} n’est pas sur la bissectrice de ${ang}`);
}
function angleSommetMoitie(q: Q) {
  const [b, c] = degresDe(q.text);
  if (!b || !c) return ["angles illisibles"];
  return reponseDegres(q, (180 - b - c) / 2);
}
function anglePiedBissectrice(q: Q) {
  const [b, c] = degresDe(q.text);
  if (!b || !c) return ["angles illisibles"];
  return reponseDegres(q, 180 - b - (180 - b - c) / 2);
}
function aireParBissectrice(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 3) return ["longueurs illisibles"];
  return reponseLongueur(q, ((l[0].v + l[1].v) * l[2].v) / 2, `${l[0].u}²`);
}

/* ───── cercle inscrit ───── */
const bissectrices = (q: Q) => (/cercle inscrit/.test(q.text) ? reponseQcm(q, "ses bissectrices") : ["pas de cercle inscrit"]);
const rayonDiametre = surLongueur((v) => v / 2);
function droitesSelonCible(q: Q) {
  const bords = /allées|rues|clôtures|murs|rives|haies/.test(q.text);
  const coins = /coins|angles|portails|pointes/.test(q.text);
  if (bords === coins) return ["cible illisible"];
  return reponseQcm(q, bords ? "les bissectrices du triangle" : "les médiatrices du triangle");
}
function airePerimetreRayon(q: Q) {
  const [p, r] = longueursDe(q.text);
  if (!p || !r) return ["périmètre et rayon illisibles"];
  if (p.v < 10.39 * r.v) return ["ce rayon est impossible pour ce périmètre"];
  return reponseLongueur(q, (p.v * r.v) / 2, `${p.u}²`);
}
function rayonRectangle(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 3) return ["côtés illisibles"];
  const [x, y, z] = l.map((m) => m.v);
  if (x * x + y * y !== z * z) return ["pas un triangle rectangle"];
  return reponseLongueur(q, (x * y) / (x + y + z), l[0].u);
}
function angleEntreBissectrices(q: Q) {
  const [b, c] = degresDe(q.text);
  if (!b || !c) return ["angles illisibles"];
  return reponseDegres(q, 180 - b / 2 - c / 2);
}
function rayonDepuisAire(q: Q) {
  const [A] = airesDe(q.text);
  const [p] = longueursDe(q.text);
  if (!A || !p) return ["aire et périmètre illisibles"];
  return reponseLongueur(q, (2 * A.v) / p.v, p.u);
}

/* ───── orthocentre ───── */
const nomOrtho = (q: Q) => (/hauteurs/.test(q.text) ? reponseQcm(q, "l’orthocentre") : ["le texte ne parle pas des hauteurs"]);
function hauteurPerp(q: Q) {
  const [a, b, c] = sommetsDe(q.text);
  if (!new RegExp(`(?:issue de|partant de) ${a}`).test(q.text)) return ["sommet illisible"];
  return reponseQcm(q, `(${b}${c})`);
}
function orthoRectangle(q: Q) {
  const droit = q.text.match(/rectangle en ([A-Z])|droit en ([A-Z])/);
  const s = droit?.[1] ?? droit?.[2];
  return s ? reponseQcm(q, `au sommet ${s}`) : ["angle droit illisible"];
}
function orthoSurFigure(q: Q) {
  const c = q.canvas as any;
  const [a, b, d] = sommetsDe(q.text);
  const H = c?.points?.find((p: any) => p.id === q.expected[0]);
  if (!H) return ["point attendu absent de la figure"];
  const P = (id: string) => c.points.find((p: any) => p.id === id);
  const [A, B, C] = [P(a), P(b), P(d)];
  const ps = (u: any, v: any, w: any, x: any) => (u.x - v.x) * (w.x - x.x) + (u.y - v.y) * (w.y - x.y);
  const ok = Math.abs(ps(H, A, B, C)) < 1e-9 && Math.abs(ps(H, B, A, C)) < 1e-9;
  return ok ? [] : ["le point attendu n’est pas sur les hauteurs"];
}
function complementAngle(q: Q) {
  const [b] = degresDe(q.text);
  return b ? reponseDegres(q, 90 - b) : ["angle illisible"];
}
function troisiemeHauteur(q: Q) {
  const [a, b, c] = sommetsDe(q.text);
  const p = perpendiculaireSurFigure(q, c, "H", a, b) ? [] : ["(cH) n’est pas perpendiculaire à (ab) sur la figure"];
  return [...p, ...reponseQcm(q, `(${c}H) est perpendiculaire à (${a}${b})`)];
}
function angleOrtho(q: Q) {
  const [A] = degresDe(q.text);
  return A ? reponseDegres(q, 180 - A) : ["angle illisible"];
}
function deuxHauteurs(q: Q) {
  const l = longueursDe(q.text);
  if (l.length !== 3) return ["longueurs illisibles"];
  return reponseLongueur(q, (l[0].v * l[1].v) / l[2].v, l[0].u);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  mediane_triangle_tpl_1: medianeNommee,
  mediane_triangle_tpl_2: medianeArrive,
  mediane_triangle_tpl_3: surLongueur((v) => v / 2),
  mediane_triangle_tpl_4: surLongueur((v) => v * 2),
  mediane_triangle_tpl_5: medianeSurFigure,
  mediane_triangle_tpl_6: moitieAire,
  mediane_triangle_tpl_7: moitieAire,
  mediane_triangle_tpl_8: surLongueur((v) => v / 2),
  mediane_triangle_tpl_9: medianePythagore,

  centre_gravite_tpl_1: nomGravite,
  centre_gravite_tpl_2: positionGravite,
  centre_gravite_tpl_3: gravite2tiersOuTiers,
  centre_gravite_tpl_4: gravite2tiersOuTiers,
  centre_gravite_tpl_5: grandeMediane,
  centre_gravite_tpl_6: equilibre,
  centre_gravite_tpl_7: coordonneesGravite,
  centre_gravite_tpl_8: hypotenuseVersG,
  centre_gravite_tpl_9: tiersVersAutre,

  bissectrice_equidistance_tpl_1: memeDistance,
  bissectrice_equidistance_tpl_2: moitieAngle,
  bissectrice_equidistance_tpl_3: doubleAngle,
  bissectrice_equidistance_tpl_4: surBissectrice,
  bissectrice_equidistance_tpl_5: memeDistance,
  bissectrice_equidistance_tpl_6: angleSommetMoitie,
  bissectrice_equidistance_tpl_7: anglePiedBissectrice,
  bissectrice_equidistance_tpl_8: aireParBissectrice,

  cercle_inscrit_tpl_1: bissectrices,
  cercle_inscrit_tpl_2: memeDistance,
  cercle_inscrit_tpl_3: rayonDiametre,
  cercle_inscrit_tpl_4: moitieAngle,
  cercle_inscrit_tpl_5: droitesSelonCible,
  cercle_inscrit_tpl_6: airePerimetreRayon,
  cercle_inscrit_tpl_7: rayonRectangle,
  cercle_inscrit_tpl_8: angleEntreBissectrices,
  cercle_inscrit_tpl_9: rayonDepuisAire,

  orthocentre_tpl_1: nomOrtho,
  orthocentre_tpl_2: hauteurPerp,
  orthocentre_tpl_3: orthoRectangle,
  orthocentre_tpl_4: orthoSurFigure,
  orthocentre_tpl_5: complementAngle,
  orthocentre_tpl_6: complementAngle,
  orthocentre_tpl_7: troisiemeHauteur,
  orthocentre_tpl_8: angleOrtho,
  orthocentre_tpl_9: deuxHauteurs,
});
