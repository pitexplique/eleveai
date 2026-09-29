// ─── Fiche d'exercices : médiatrices et cercle circonscrit (6e) — 20 exercices ──
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-triangle-figure.tsx` (son `tri()` à l'échelle, étiquettes bornées).
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/cercle-circonscrit.bank.ts`,
// notionId cercle_circonscrit : les trois médiatrices d'un triangle sont
// concourantes (la PREMIÈRE PREUVE de l'année : le BO demande de « restituer
// les arguments »), construire le cercle circonscrit, défis (trois points à
// égale distance, points alignés).
// La preuve ne tient que par la propriété de la médiatrice DANS LES DEUX SENS :
// « sur la médiatrice, donc à égale distance » et « à égale distance, donc sur
// la médiatrice » — le second est celui que l'élève oublie (10, 12, 15, 19).
// ⛔ LIMITES DE LA 6e : aucun calcul de longueur (pas de Pythagore) : une
// distance est DONNÉE ou mesurée ; pas de coordonnées ; pas de propriété du
// triangle rectangle (4e) ; « deux perpendiculaires à une même droite sont
// parallèles » (6e) sert aux points alignés.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : ils ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : un hasard du dessin (1), mesurer au lieu de déduire (2),
// croire qu'il faut trois médiatrices (3), le diamètre pris pour le rayon (4),
// croire savoir OC (5), choisir le milieu d'un côté (6), piquer sur une seule
// médiatrice (7), un cercle par trois points alignés (8, 16), le cercle avant
// le centre (9), oublier le sens « égale distance, donc sur la médiatrice »
// (10, 15, 19), le centre toujours dedans (11), un seul cercle par deux points
// (13), « sur le cercle » et « dans le disque » (14), le centre à l'œil (17,
// 18), la longueur du plateau prise pour le diamètre (20).
//
// Aucun fait réel chiffré : fermes, assiette, table, sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo` est un SVG local — des points NOMMÉS (en vraies
// coordonnées, y vers le haut), un polygone, les MÉDIATRICES calculées par le
// composant (milieu + perpendiculaire, codées : angle droit et petits traits),
// des cercles « de centre X passant par Y », des arcs, des segments cotés.
// Tout s'écrit par les NOMS des points : le script de recalcul relit chaque
// coordonnée, recalcule le centre du cercle circonscrit par un autre chemin
// (intersection de deux médiatrices en équations), vérifie OA = OB = OC et que
// chaque médiatrice dessinée passe par O, puis rejoue la place des étiquettes
// (ni sur une autre, ni sur un point, ni sur un trait).
// 14 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages). Police 14, viewBox de 300 de large au
// plus, AUCUN `min-w`.
//
// Les corrigés sont écrits à la première personne (« je trace »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-cercle-circonscrit.mjs`.
//
// Micro-compétences : circonscrit_concourantes (1, 2, 3, 5, 6, 7, 10, 12, 15,
// 19), circonscrit_construire (1, 3, 4, 7, 9, 11, 13, 14, 16, 17, 18),
// circonscrit_defi (6, 8, 11, 12, 13, 14, 15, 16, 17, 18, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ENCRE = "#0f172a";
const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const ORANGE = "#ea580c";
const VERT = "#16a34a";
const TAILLE = 14;
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type P2 = [number, number];
type Vers = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";
const SIGNES: Record<Vers, P2> = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };

/** La boîte d'une étiquette posée à `e` pixels du point (x ; y) de l'écran,
 *  dans la direction d. ⭐ Le script de recalcul refait ce calcul. */
const boite = (x: number, y: number, t: string, d: Vers, e: number) => {
  const w = [...t].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const ee = sx !== 0 && sy !== 0 ? e * 0.7 : e;
  return { cx: x + sx * (ee + w / 2), cy: y + sy * (ee + TAILLE / 2), w, h: TAILLE };
};

type Pt = { nom: string; en: P2; vers?: Vers; ecart?: number; cache?: boolean; couleur?: string };

/**
 * ⭐ UNE FIGURE DE GÉOMÉTRIE À L'ÉCHELLE, écrite par les NOMS de ses points.
 * - `polygone` : « ABC » (ou « ABCD »), tracé en noir ; deux points : un segment.
 * - `mediatrices` : « AB », « BC »… calculées ici (milieu, perpendiculaire),
 *   en rouge ; `pointillees` : les mêmes, en tirets (la médiatrice « de
 *   vérification »). `codage` : angle droit et petits traits (1, 2 ou 3 selon
 *   l'ordre) sur chaque médiatrice.
 * - `cercles` : « de centre X passant par Y » ; `arcs` : un morceau de ce
 *   cercle, de Y vers Z dans le sens inverse des aiguilles d'une montre.
 * - `segments` : « OA », en tirets, avec une cote facultative.
 * - un point `cache` sert aux calculs sans être dessiné (le centre inconnu).
 * ⛔ Texte NU dans les étiquettes (SVG, pas de KaTeX).
 */
const geo = (o: {
  points: Pt[];
  polygone?: string;
  mediatrices?: string[];
  pointillees?: string[];
  codage?: boolean;
  cercles?: { centre: string; par: string; couleur?: string; pointilles?: boolean }[];
  arcs?: { centre: string; de: string; a: string }[];
  segments?: { de: string; a: string; label?: string; vers?: Vers; couleur?: string }[];
}) => {
  const P: Record<string, P2> = Object.fromEntries(o.points.map((p) => [p.nom, p.en]));
  const d = (a: P2, b: P2) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  // Les morceaux d'arc, échantillonnés (angle de départ → angle d'arrivée, sens direct).
  const arcs = (o.arcs ?? []).map((a) => {
    const [c, p, q] = [P[a.centre], P[a.de], P[a.a]];
    const r = d(c, p);
    const t0 = Math.atan2(p[1] - c[1], p[0] - c[0]) - 0.17;
    let t1 = Math.atan2(q[1] - c[1], q[0] - c[0]) + 0.17;
    while (t1 < t0) t1 += 2 * Math.PI;
    return Array.from({ length: 41 }, (_, i) => [c[0] + r * Math.cos(t0 + ((t1 - t0) * i) / 40), c[1] + r * Math.sin(t0 + ((t1 - t0) * i) / 40)] as P2);
  });
  const xs: number[] = [], ys: number[] = [];
  for (const p of o.points) if (!p.cache) xs.push(p.en[0]), ys.push(p.en[1]);
  for (const c of o.cercles ?? []) {
    const r = d(P[c.centre], P[c.par]);
    xs.push(P[c.centre][0] - r, P[c.centre][0] + r), ys.push(P[c.centre][1] - r, P[c.centre][1] + r);
  }
  for (const a of arcs) for (const q of a) xs.push(q[0]), ys.push(q[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(230 / (x1 - x0), 170 / Math.max(y1 - y0, 2));
  const M = 34;
  const W = (x1 - x0) * s + 2 * M, H = Math.max(y1 - y0, 2) * s + 2 * M;
  const px = (p: P2): P2 => [M + (p[0] - x0) * s, M + (y1 - p[1]) * s];
  const pts = (q: P2[]) => q.map((p) => px(p).map((v) => v.toFixed(1)).join(",")).join(" ");
  const dessin: ReactNode[] = [];

  for (const [i, c] of (o.cercles ?? []).entries()) {
    const [cx, cy] = px(P[c.centre]);
    const col = c.couleur ?? BLEU;
    dessin.push(<circle key={`c${i}`} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r={(d(P[c.centre], P[c.par]) * s).toFixed(1)} fill="none" stroke={col} strokeWidth={2.2} strokeDasharray={c.pointilles ? "6 4" : undefined} />);
  }
  arcs.forEach((a, i) => dessin.push(<polyline key={`a${i}`} points={pts(a)} fill="none" stroke={BLEU} strokeWidth={3} strokeLinecap="round" />));
  if (o.polygone) {
    const q = [...o.polygone].map((k) => P[k]);
    dessin.push(q.length > 2 ? <polygon key="poly" points={pts(q)} fill="#f8fafc" fillOpacity={0.6} stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" /> : <polyline key="poly" points={pts(q)} fill="none" stroke={ENCRE} strokeWidth={2.4} />);
  }
  const toutes = [...(o.mediatrices ?? []).map((m) => [m, false] as const), ...(o.pointillees ?? []).map((m) => [m, true] as const)];
  const L = 2 * Math.hypot(x1 - x0, y1 - y0);
  toutes.forEach(([m, tirets], i) => {
    const [a, b] = [P[m[0]], P[m[1]]];
    const mil: P2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const l = d(a, b);
    const n: P2 = [-(b[1] - a[1]) / l, (b[0] - a[0]) / l];
    const [p, q] = [px([mil[0] - L * n[0], mil[1] - L * n[1]]), px([mil[0] + L * n[0], mil[1] + L * n[1]])];
    dessin.push(<line key={`m${i}`} x1={p[0].toFixed(1)} y1={p[1].toFixed(1)} x2={q[0].toFixed(1)} y2={q[1].toFixed(1)} stroke={ROUGE} strokeWidth={tirets ? 1.6 : 2} strokeDasharray={tirets ? "6 4" : undefined} />);
    if (o.codage) {
      // L'angle droit, et 1, 2 ou 3 petits traits sur chaque moitié du côté.
      const [M0, A0, B0] = [px(mil), px(a), px(b)];
      const lu = Math.hypot(B0[0] - A0[0], B0[1] - A0[1]);
      const u: P2 = [(B0[0] - A0[0]) / lu, (B0[1] - A0[1]) / lu];
      const v: P2 = [-u[1], u[0]];
      const c = 8;
      dessin.push(<path key={`d${i}`} d={`M ${M0[0] + u[0] * c} ${M0[1] + u[1] * c} L ${M0[0] + (u[0] + v[0]) * c} ${M0[1] + (u[1] + v[1]) * c} L ${M0[0] + v[0] * c} ${M0[1] + v[1] * c}`} fill="none" stroke={ROUGE} strokeWidth={1.6} />);
      for (const cote of [-1, 1]) {
        const cen: P2 = [M0[0] + (cote * u[0] * lu) / 4, M0[1] + (cote * u[1] * lu) / 4];
        for (let k = 0; k <= i; k++) {
          const dec = (k - i / 2) * 4;
          const c0: P2 = [cen[0] + u[0] * dec, cen[1] + u[1] * dec];
          dessin.push(<line key={`t${i}-${cote}-${k}`} x1={c0[0] - v[0] * 5} y1={c0[1] - v[1] * 5} x2={c0[0] + v[0] * 5} y2={c0[1] + v[1] * 5} stroke={ENCRE} strokeWidth={1.6} />);
        }
      }
    }
  });
  for (const [i, g] of (o.segments ?? []).entries()) {
    const [a, b] = [px(P[g.de]), px(P[g.a])];
    dessin.push(<line key={`s${i}`} x1={a[0].toFixed(1)} y1={a[1].toFixed(1)} x2={b[0].toFixed(1)} y2={b[1].toFixed(1)} stroke={g.couleur ?? VERT} strokeWidth={1.8} strokeDasharray="5 4" />);
  }
  const texte = (x: number, y: number, t: string, v: Vers, e: number, couleur: string, k: string) => {
    const b = boite(x, y, t, v, e);
    const cx = Math.min(Math.max(b.cx, b.w / 2 + 2), W - b.w / 2 - 2);
    const cy = Math.min(Math.max(b.cy, b.h / 2 + 2), H - b.h / 2 - 2);
    return (
      <text key={k} x={cx.toFixed(1)} y={(cy + TAILLE * 0.35).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={couleur} {...halo}>
        {t}
      </text>
    );
  };
  for (const [i, g] of (o.segments ?? []).entries()) {
    if (!g.label) continue;
    const [a, b] = [px(P[g.de]), px(P[g.a])];
    dessin.push(texte((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, g.label, g.vers ?? "h", 6, g.couleur ?? VERT, `sl${i}`));
  }
  for (const p of o.points) {
    if (p.cache) continue;
    const [x, y] = px(p.en);
    dessin.push(<circle key={`p${p.nom}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3.5} fill={p.couleur ?? ENCRE} />);
    dessin.push(texte(x, y, p.nom, p.vers ?? "hd", p.ecart ?? 6, p.couleur ?? ENCRE, `n${p.nom}`));
  }
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} className="block h-auto w-full" role="img" aria-label="Figure à l'échelle : triangle, médiatrices et cercle">
        {dessin}
      </svg>
    </div>
  );
};

export const exercicesCercleCirconscrit6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "cercle-circonscrit",
  titre: "Médiatrices et cercle circonscrit",
  accroche:
    "Vingt exercices, du geste seul au problème : voir que les trois médiatrices d'un triangle se coupent en un même point, écrire la preuve, construire le cercle circonscrit, trouver un point à égale distance de trois points, et comprendre pourquoi c'est impossible quand ils sont alignés. Trois fermes et un puits, une assiette cassée, une table ronde. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure tracée à l'échelle.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je repère les médiatrices et leur point commun, puis je réponds.",
      rappel: [
        "La médiatrice d'un segment : la droite perpendiculaire qui passe par son milieu.",
        "Un point de la médiatrice de [AB] est à la même distance de A et de B.",
        "Les trois médiatrices d'un triangle se coupent en un même point O.",
        "Le cercle de centre O qui passe par A, B et C : c'est le cercle circonscrit.",
      ],
      exercices: [
        {
          enonce: "Sur la figure, on a tracé trois droites rouges.\nChacune coupe un côté du triangle en son milieu, à angle droit.\na) Comment s'appellent ces trois droites ?\nb) Que remarques-tu ?\nc) Comment s'appelle le cercle bleu ?",
          figure: geo({
            points: [
              { nom: "A", en: [-5, 0], vers: "g" },
              { nom: "B", en: [3, -4], vers: "bd" },
              { nom: "C", en: [4, 3], vers: "hd" },
              { nom: "O", en: [0, 0], vers: "bd", ecart: 12 },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC", "CA"],
            cercles: [{ centre: "O", par: "A" }],
          }),
          correction:
            "a) Ce sont les médiatrices des trois côtés.\nb) Elles se coupent toutes les trois en un même point, O.\nOn dit qu'elles sont concourantes.\nc) Le cercle de centre O passe par A, B et C. C'est le cercle circonscrit au triangle.\n⛔ Le piège : croire que c'est un hasard du dessin. C'est vrai pour tous les triangles.\nRéponse : a) les médiatrices ; b) elles passent par un même point ; c) le cercle circonscrit.",
          micros: ["circonscrit_concourantes", "circonscrit_construire"],
        },
        {
          enonce: "O est le point commun des trois médiatrices du triangle ABC.\nOn sait que $OA = 4$ cm.\nCombien mesurent $OB$ et $OC$ ? Pourquoi ?",
          figure: geo({
            points: [
              { nom: "A", en: [-2.4, -3.2], vers: "bg" },
              { nom: "B", en: [3.2, -2.4], vers: "bd" },
              { nom: "C", en: [0, 4], vers: "h" },
              { nom: "O", en: [0, 0], vers: "hd", ecart: 10 },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC", "CA"],
            segments: [
              { de: "O", a: "A", label: "4 cm", vers: "b" },
              { de: "O", a: "B" },
              { de: "O", a: "C" },
            ],
          }),
          correction:
            "O est sur la médiatrice de $[AB]$.\nDonc O est à la même distance de A et de B : $OB = OA = 4$ cm.\nO est aussi sur la médiatrice de $[AC]$.\nDonc $OC = OA = 4$ cm.\n⛔ Le piège : mesurer sur le dessin. La propriété de la médiatrice donne la réponse exacte.\nRéponse : $OB = 4$ cm et $OC = 4$ cm.",
          micros: ["circonscrit_concourantes"],
        },
        {
          enonce: "Pour trouver le centre du cercle circonscrit, Nour trace des médiatrices.\nCombien doit-elle en tracer au minimum ? Pourquoi ?",
          correction:
            "Deux médiatrices suffisent. Elles se coupent en un point, O.\nLa troisième passe forcément par O : les trois médiatrices sont concourantes.\nSi je la trace, elle sert seulement à vérifier.\n⛔ Le piège : croire qu'il en faut trois. La troisième ne change pas le point.\nRéponse : $2$ médiatrices.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-4, 3], vers: "hg" },
                { nom: "B", en: [-3, -4], vers: "bg" },
                { nom: "C", en: [5, 0], vers: "d" },
                { nom: "O", en: [0, 0], vers: "b", ecart: 10 },
              ],
              polygone: "ABC",
              mediatrices: ["AB", "BC"],
              pointillees: ["CA"],
            }),
          ),
          micros: ["circonscrit_construire", "circonscrit_concourantes"],
        },
        {
          enonce: "Le cercle circonscrit au triangle ABC a pour centre O et pour rayon $3{,}5$ cm.\na) Combien mesure son diamètre ?\nb) Combien mesurent $OA$, $OB$ et $OC$ ?",
          correction:
            "a) Le diamètre vaut deux rayons : $3{,}5 \\times 2 = 7$ cm.\nb) Le cercle passe par A, B et C. Ce sont trois points du cercle.\nIls sont tous à un rayon du centre : $OA = OB = OC = 3{,}5$ cm.\n⛔ Le piège : répondre $7$ cm pour OA. OA est un rayon, pas un diamètre.\nRéponse : a) $7$ cm ; b) $3{,}5$ cm chacun.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-2.1, -2.8], vers: "bg" },
                { nom: "B", en: [2.8, -2.1], vers: "bd" },
                { nom: "C", en: [0, 3.5], vers: "h" },
                { nom: "O", en: [0, 0], vers: "g" },
              ],
              polygone: "ABC",
              cercles: [{ centre: "O", par: "A" }],
              segments: [{ de: "O", a: "B", label: "3,5 cm", vers: "b" }],
            }),
          ),
          micros: ["circonscrit_construire"],
        },
        {
          enonce: "O est sur la médiatrice de $[AB]$.\na) Que peux-tu dire des longueurs $OA$ et $OB$ ?\nb) Quelle propriété utilises-tu ?",
          figure: geo({
            points: [
              { nom: "A", en: [-5, 0], vers: "g" },
              { nom: "B", en: [3, -4], vers: "bd" },
              { nom: "C", en: [4, 3], vers: "hd" },
              { nom: "O", en: [0, 0], vers: "d", ecart: 10 },
            ],
            polygone: "ABC",
            mediatrices: ["AB"],
            codage: true,
            segments: [
              { de: "O", a: "A" },
              { de: "O", a: "B" },
            ],
          }),
          correction:
            "a) $OA = OB$.\nb) J'utilise la propriété de la médiatrice.\nUn point de la médiatrice d'un segment est à la même distance des deux bouts.\nLe codage le rappelle : même petit trait sur les deux moitiés, et l'angle droit.\n⚠️ On ne sait rien de OC ici. On ne connaît qu'une seule médiatrice.\nRéponse : $OA = OB$, par la propriété de la médiatrice.",
          micros: ["circonscrit_concourantes"],
        },
        {
          enonce: "On a mesuré les distances de trois points P, Q et R aux sommets.\nP : $PA = 2{,}1$ cm, $PB = 2{,}1$ cm, $PC = 5{,}1$ cm.\nQ : $QA = 3$ cm, $QB = 3$ cm, $QC = 3$ cm.\nR : $RA = 3{,}3$ cm, $RB = 5{,}5$ cm, $RC = 3{,}3$ cm.\na) Lequel est le centre du cercle circonscrit ?\nb) Sur quelle médiatrice sont les deux autres ?",
          figure: geo({
            points: [
              { nom: "A", en: [-1.8, -2.4], vers: "bg" },
              { nom: "B", en: [2.4, -1.8], vers: "bd" },
              { nom: "C", en: [0, 3], vers: "h" },
              { nom: "P", en: [0.3, -2.1], vers: "b" },
              { nom: "Q", en: [0, 0], vers: "d" },
              { nom: "R", en: [-2.4, 0.8], vers: "g" },
            ],
            polygone: "ABC",
          }),
          correction:
            "a) Le centre est à la même distance des trois sommets.\nSeul Q a trois distances égales : $3$ cm. Le centre, c'est Q.\nb) $PA = PB$ : P est sur la médiatrice de $[AB]$. Mais $PC$ est différent.\n$RA = RC$ : R est sur la médiatrice de $[AC]$. Mais $RB$ est différent.\n⛔ Le piège : choisir P, le milieu de $[AB]$. Il doit aussi être à la même distance de C.\nRéponse : a) Q ; b) P sur celle de $[AB]$, R sur celle de $[AC]$.",
          micros: ["circonscrit_concourantes", "circonscrit_defi"],
        },
        {
          enonce: "Lou pique son compas en O, le point commun des médiatrices. Elle règle l'écartement sur OA.\nTom pique en P, un autre point de la médiatrice de $[AB]$. Il règle l'écartement sur PA.\na) Le cercle de Lou passe-t-il par B et par C ?\nb) Le cercle de Tom passe-t-il par B ? Et par C ?",
          figure: geo({
            points: [
              { nom: "A", en: [-4, 3], vers: "hg" },
              { nom: "B", en: [-3, -4], vers: "bg" },
              { nom: "C", en: [5, 0], vers: "d" },
              { nom: "O", en: [0, 0], vers: "h", ecart: 12 },
              { nom: "P", en: [-1.75, -0.25], vers: "b", couleur: ORANGE },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC"],
            cercles: [
              { centre: "O", par: "A" },
              { centre: "P", par: "A", couleur: ORANGE, pointilles: true },
            ],
          }),
          correction:
            "a) O est sur les trois médiatrices. Donc $OA = OB = OC$.\nLe cercle de Lou passe par A, B et C.\nb) P est sur la médiatrice de $[AB]$. Donc $PA = PB$ : le cercle de Tom passe par B.\nMais P n'est pas sur la médiatrice de $[BC]$. $PC$ n'est pas égal à $PB$.\nLe cercle orange de Tom rate C : le dessin le montre.\n⛔ Le piège : piquer sur une seule médiatrice. Il faut le point commun de deux médiatrices.\nRéponse : a) oui, par les deux ; b) par B, mais pas par C.",
          micros: ["circonscrit_construire", "circonscrit_concourantes"],
        },
        {
          enonce: "Trois points A, B et C sont alignés : $AB = 3$ cm et $BC = 4$ cm.\na) Trace les médiatrices de $[AB]$ et de $[BC]$. Se coupent-elles ?\nb) Existe-t-il un cercle qui passe par A, B et C ?",
          correction:
            "a) Les deux médiatrices sont perpendiculaires à la même droite $(AC)$.\nDonc elles sont parallèles. Elles ne se coupent jamais.\nb) Le centre devrait être sur les deux médiatrices à la fois. C'est impossible.\nAucun cercle ne passe par trois points alignés.\n⛔ Le piège : croire qu'on peut toujours tracer un cercle. Il faut un vrai triangle.\nRéponse : a) non, elles sont parallèles ; b) non.",
          schema: geo({
            points: [
              { nom: "A", en: [0, 0], vers: "b" },
              { nom: "B", en: [3, 0], vers: "bd" },
              { nom: "C", en: [7, 0], vers: "b" },
            ],
            polygone: "AC",
            mediatrices: ["AB", "BC"],
            codage: true,
          }),
          micros: ["circonscrit_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même triangle. Je trace deux médiatrices, je place O, puis je justifie.",
      rappel: [
        "O sur la médiatrice de [AB], donc OA = OB.",
        "Dans l'autre sens : OA = OB, donc O est sur la médiatrice de [AB].",
        "Deux médiatrices suffisent pour placer O.",
        "Le rayon du cercle circonscrit : OA = OB = OC.",
      ],
      exercices: [
        {
          enonce: "Voici les étapes pour tracer le cercle circonscrit, dans le désordre.\n① Tracer le cercle de centre O qui passe par A.\n② Tracer la médiatrice de $[AB]$.\n③ Placer O, le point où les deux médiatrices se coupent.\n④ Tracer la médiatrice de $[BC]$.\na) Remets les étapes dans l'ordre.\nb) Comment vérifier le tracé ?",
          correction:
            "a) D'abord les deux médiatrices : ② puis ④. On peut aussi faire ④ puis ②.\nEnsuite leur point commun : ③.\nEnfin le cercle : ①. L'ordre est ②, ④, ③, ①.\nb) Je trace la troisième médiatrice, celle de $[AC]$. Elle doit passer par O.\nJe vérifie aussi que le cercle passe par B et par C.\n⛔ Le piège : tracer le cercle avant d'avoir O. Sans centre, pas de cercle.\nRéponse : a) ②, ④, ③, ① ; b) la médiatrice de $[AC]$ passe par O.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-5, 0], vers: "g" },
                { nom: "B", en: [3, -4], vers: "bd" },
                { nom: "C", en: [4, 3], vers: "hd" },
                { nom: "O", en: [0, 0], vers: "bd", ecart: 12 },
              ],
              polygone: "ABC",
              mediatrices: ["AB", "BC"],
              pointillees: ["CA"],
              cercles: [{ centre: "O", par: "A" }],
            }),
          ),
          micros: ["circonscrit_construire"],
        },
        {
          enonce: "O est le point où se coupent les médiatrices de $[AB]$ et de $[BC]$.\nComplète la preuve.\n• O est sur la médiatrice de $[AB]$, donc … = … .\n• O est sur la médiatrice de $[BC]$, donc … = … .\n• Donc $OA = $ … .\n• Donc O est sur la médiatrice de … .",
          figure: geo({
            points: [
              { nom: "A", en: [-3, -4], vers: "bg" },
              { nom: "B", en: [4, -3], vers: "bd" },
              { nom: "C", en: [0, 5], vers: "h" },
              { nom: "O", en: [0, 0], vers: "hg", ecart: 12 },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC"],
            codage: true,
            segments: [
              { de: "O", a: "A" },
              { de: "O", a: "B" },
              { de: "O", a: "C" },
            ],
          }),
          correction:
            "• O est sur la médiatrice de $[AB]$, donc $OA = OB$.\n• O est sur la médiatrice de $[BC]$, donc $OB = OC$.\n• $OA$ et $OC$ sont égales à $OB$. Donc $OA = OC$.\n• O est à la même distance de A et de C. Donc O est sur la médiatrice de $[AC]$.\n⭐ Voilà pourquoi les trois médiatrices se coupent en un même point.\n⛔ Le piège : oublier la dernière phrase. Elle utilise l'autre sens : même distance, donc sur la médiatrice.\nRéponse : $OA = OB$ ; $OB = OC$ ; $OA = OC$ ; la médiatrice de $[AC]$.",
          micros: ["circonscrit_concourantes"],
        },
        {
          enonce: "Le triangle ABC a un angle obtus en C.\nOn a tracé ses trois médiatrices et son cercle circonscrit.\na) Le centre O est-il dans le triangle ou dehors ?\nb) Le cercle passe-t-il quand même par A, B et C ?\nc) Est-ce une erreur de tracé ?",
          figure: geo({
            points: [
              { nom: "A", en: [-5, 0], vers: "g" },
              { nom: "B", en: [4, -3], vers: "d" },
              { nom: "C", en: [0, -5], vers: "b" },
              { nom: "O", en: [0, 0], vers: "h", ecart: 10 },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC", "CA"],
            cercles: [{ centre: "O", par: "A" }],
          }),
          correction:
            "a) O est dehors, de l'autre côté de $[AB]$.\nb) Oui. O est sur les trois médiatrices, donc $OA = OB = OC$.\nLe cercle de centre O passe bien par les trois sommets.\nc) Non. Quand un angle est obtus, le centre sort toujours du triangle.\n⛔ Le piège : croire que le centre est toujours à l'intérieur.\nRéponse : a) dehors ; b) oui ; c) non, c'est normal.",
          micros: ["circonscrit_construire", "circonscrit_defi"],
        },
        {
          enonce: "ABC est isocèle en A : $AB = AC$.\na) Pourquoi A est-il sur la médiatrice de $[BC]$ ?\nb) La médiatrice de $[AB]$ coupe celle de $[BC]$ en O. On mesure $OA = 5$ cm. Que vaut $OB$ ?\nc) Que vaut $OC$ ?",
          figure: geo({
            points: [
              { nom: "A", en: [0, 8], vers: "hd" },
              { nom: "B", en: [-4, 0], vers: "bg" },
              { nom: "C", en: [4, 0], vers: "bd" },
              { nom: "O", en: [0, 3], vers: "bg", ecart: 12 },
            ],
            polygone: "ABC",
            mediatrices: ["BC", "AB"],
            cercles: [{ centre: "O", par: "A" }],
          }),
          correction:
            "a) $AB = AC$ : A est à la même distance de B et de C.\nDonc A est sur la médiatrice de $[BC]$.\nb) O est sur la médiatrice de $[AB]$. Donc $OB = OA = 5$ cm.\nc) O est sur la médiatrice de $[BC]$. Donc $OC = OB = 5$ cm.\n⛔ Le piège : oublier le sens « même distance, donc sur la médiatrice ». C'est lui qui répond au a).\nRéponse : a) car $AB = AC$ ; b) $5$ cm ; c) $5$ cm.",
          micros: ["circonscrit_concourantes", "circonscrit_defi"],
        },
        {
          enonce: "P, Q et R sont sur la médiatrice de $[AB]$.\na) Le cercle de centre P qui passe par A passe-t-il aussi par B ?\nb) Combien de cercles passent par A et par B ? Où sont leurs centres ?\nc) On ajoute un point C hors de la droite $(AB)$. Combien de cercles passent par A, B et C ?",
          figure: geo({
            points: [
              { nom: "A", en: [0, 0], vers: "g", ecart: 12 },
              { nom: "B", en: [4, 0], vers: "d", ecart: 12 },
              { nom: "P", en: [2, 1.5], vers: "d" },
              { nom: "Q", en: [2, 5], vers: "d" },
              { nom: "R", en: [2, -3], vers: "d", couleur: VERT },
            ],
            polygone: "AB",
            mediatrices: ["AB"],
            cercles: [
              { centre: "P", par: "A" },
              { centre: "R", par: "A", couleur: VERT },
            ],
          }),
          correction:
            "a) Oui. P est sur la médiatrice de $[AB]$, donc $PA = PB$.\nb) Chaque point de la médiatrice donne un cercle. Il y en a une infinité.\nTous leurs centres sont sur la médiatrice de $[AB]$.\nc) Le centre doit aussi être sur la médiatrice de $[BC]$.\nLes deux médiatrices se coupent en un seul point.\nIl y a donc un seul cercle : le cercle circonscrit à ABC.\n⛔ Le piège : croire qu'un seul cercle passe par deux points.\nRéponse : a) oui ; b) une infinité, centres sur la médiatrice ; c) un seul.",
          micros: ["circonscrit_construire", "circonscrit_defi"],
        },
        {
          enonce: "Le cercle circonscrit au triangle DEF a pour centre K. On sait que $KD = 6$ cm.\na) Combien mesurent $KE$ et $KF$ ?\nb) Quel est le diamètre du cercle ?\nc) Un point M vérifie $KM = 6$ cm. Est-il sur le cercle ?\nd) Un point N vérifie $KN = 5$ cm. Est-il sur le cercle ?",
          correction:
            "a) D, E et F sont sur le cercle : $KE = KF = KD = 6$ cm.\nb) $6 \\times 2 = 12$ cm.\nc) M est à $6$ cm de K, comme le rayon. M est sur le cercle.\nd) $5 < 6$ : N est à l'intérieur du cercle, pas dessus.\n⛔ Le piège : confondre « sur le cercle » et « dans le disque ».\nRéponse : a) $6$ cm chacun ; b) $12$ cm ; c) oui ; d) non.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "D", en: [-4.8, 3.6], vers: "hg" },
                { nom: "E", en: [-3.6, -4.8], vers: "bg" },
                { nom: "F", en: [6, 0], vers: "d" },
                { nom: "K", en: [0, 0], vers: "g" },
                { nom: "M", en: [0, 6], vers: "h", couleur: VERT },
                { nom: "N", en: [0, -5], vers: "d", couleur: ORANGE },
              ],
              polygone: "DEF",
              cercles: [{ centre: "K", par: "D" }],
            }),
          ),
          micros: ["circonscrit_construire", "circonscrit_defi"],
        },
        {
          enonce: "ABC est équilatéral : ses trois côtés sont égaux.\na) Pourquoi C est-il sur la médiatrice de $[AB]$ ?\nb) Chaque médiatrice passe-t-elle par un sommet ?\nc) Où est le centre O du cercle circonscrit ?",
          correction:
            "a) $CA = CB$ : C est à la même distance de A et de B.\nIl est donc sur la médiatrice de $[AB]$.\nb) Oui. A est sur la médiatrice de $[BC]$, car $AB = AC$.\nEt B est sur celle de $[AC]$, car $BA = BC$.\nc) O est le point commun des trois médiatrices. Il est au milieu du triangle.\n⛔ Le piège : oublier l'autre sens de la propriété : même distance, donc sur la médiatrice.\nRéponse : a) car $CA = CB$ ; b) oui ; c) au point commun, à l'intérieur.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-3, 0], vers: "g", ecart: 14 },
                { nom: "B", en: [3, 0], vers: "d", ecart: 14 },
                { nom: "C", en: [0, 5.2], vers: "hd", ecart: 10 },
                { nom: "O", en: [0, 1.73], vers: "d", ecart: 12 },
              ],
              polygone: "ABC",
              mediatrices: ["AB", "BC", "CA"],
              cercles: [{ centre: "O", par: "A" }],
            }),
          ),
          micros: ["circonscrit_concourantes", "circonscrit_defi"],
        },
        {
          enonce: "Vrai ou faux ?\na) Le centre du cercle circonscrit est toujours dans le triangle.\nb) Deux médiatrices suffisent pour trouver le centre.\nc) Le cercle circonscrit passe par les trois sommets.\nd) Trois points alignés ont un cercle circonscrit.",
          correction:
            "a) Faux. Avec un angle obtus, le centre est dehors.\nb) Vrai. La troisième passe par le même point.\nc) Vrai. C'est sa définition.\nd) Faux. Les médiatrices sont parallèles : il n'y a pas de centre.\n⛔ Le piège : généraliser à partir d'un seul dessin.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-4, -3], vers: "bg" },
                { nom: "B", en: [5, 0], vers: "d" },
                { nom: "C", en: [-3, 4], vers: "hg" },
                { nom: "O", en: [0, 0], vers: "bd", ecart: 10 },
              ],
              polygone: "ABC",
              mediatrices: ["AB", "BC"],
              pointillees: ["CA"],
              cercles: [{ centre: "O", par: "A" }],
            }),
          ),
          micros: ["circonscrit_defi", "circonscrit_construire"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je trace deux médiatrices, je place le centre, puis je réponds par une phrase.",
      rappel: [
        "Le centre est à la même distance des trois points.",
        "Deux médiatrices suffisent pour le placer.",
        "Le rayon, c'est la distance du centre à un des points.",
      ],
      exercices: [
        {
          titre: "Le puits des trois fermes",
          enonce:
            "Trois fermes A, B et C veulent creuser un puits commun.\nLe puits doit être à la même distance des trois fermes.\na) Comment trouver l'endroit du puits ?\nb) Le puits O est à $500$ m de A. À quelle distance est-il de B et de C ?\nc) Une ferme D est à $400$ m du puits. Est-elle sur le cercle des trois autres ?\nd) Et si les trois fermes étaient alignées ?",
          figure: geo({
            points: [
              { nom: "A", en: [3, 4], vers: "hd" },
              { nom: "B", en: [-5, 0], vers: "g" },
              { nom: "C", en: [0, -5], vers: "b" },
              { nom: "O", en: [0, 0], cache: true },
            ],
            polygone: "ABC",
          }),
          correction:
            "a) Je trace les médiatrices de $[AB]$ et de $[BC]$.\nLe puits est au point où elles se coupent.\nb) Ce point est sur les deux médiatrices. Donc $OA = OB = OC = 500$ m.\nc) $400 < 500$ : D est dans le cercle, pas dessus. Elle est plus près du puits.\nd) Les médiatrices seraient parallèles. Aucun point ne conviendrait.\n⛔ Le piège : placer le puits « au milieu », à l'œil. Seul le point commun des médiatrices convient.\nRéponse : a) au point commun des médiatrices ; b) $500$ m ; c) non ; d) impossible.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [3, 4], vers: "hd" },
                { nom: "B", en: [-5, 0], vers: "g" },
                { nom: "C", en: [0, -5], vers: "b" },
                { nom: "O", en: [0, 0], vers: "d", ecart: 10 },
              ],
              polygone: "ABC",
              mediatrices: ["AB", "BC"],
              cercles: [{ centre: "O", par: "A" }],
            }),
          ),
          micros: ["circonscrit_construire", "circonscrit_defi"],
        },
        {
          titre: "L'assiette cassée",
          enonce:
            "Une archéologue trouve un morceau d'assiette ronde.\nElle marque trois points A, B et C sur le bord.\na) Comment retrouver le centre de l'assiette ?\nb) Elle trouve $OA = 12$ cm. Quel était le diamètre de l'assiette ?\nc) Pourquoi la méthode marche-t-elle ?",
          figure: geo({
            points: [
              { nom: "A", en: [-12, 0], vers: "g" },
              { nom: "B", en: [-9.6, -7.2], vers: "bg" },
              { nom: "C", en: [0, -12], vers: "b" },
              { nom: "O", en: [0, 0], cache: true },
            ],
            arcs: [{ centre: "O", de: "A", a: "C" }],
          }),
          correction:
            "a) Je trace les médiatrices de $[AB]$ et de $[BC]$. Le centre O est leur point commun.\nb) $OA$ est un rayon : $12 \\times 2 = 24$ cm.\nc) A, B et C sont sur le bord, donc sur le cercle de l'assiette.\nLe centre de l'assiette est à la même distance de A, B et C.\nC'est donc le centre du cercle circonscrit au triangle ABC.\n⛔ Le piège : chercher le centre à l'œil. Sur un petit morceau, on se trompe beaucoup.\nRéponse : a) au point commun des médiatrices ; b) $24$ cm.",
          schema: ecranSeulement(
            geo({
              points: [
                { nom: "A", en: [-12, 0], vers: "g" },
                { nom: "B", en: [-9.6, -7.2], vers: "bg" },
                { nom: "C", en: [0, -12], vers: "b" },
                { nom: "O", en: [0, 0], vers: "hg", ecart: 12 },
              ],
              arcs: [{ centre: "O", de: "A", a: "C" }],
              mediatrices: ["AB", "BC"],
              cercles: [{ centre: "O", par: "A", pointilles: true }],
            }),
          ),
          micros: ["circonscrit_construire", "circonscrit_defi"],
        },
        {
          titre: "La preuve, sans trou",
          enonce:
            "Tu dois prouver que les trois médiatrices d'un triangle se coupent en un même point.\nÉcris la preuve en quatre phrases. Aide-toi de la figure.\nCommence par : « Soit O le point où se coupent les médiatrices de [AB] et de [BC]. »",
          figure: geo({
            points: [
              { nom: "A", en: [-4, -3], vers: "bg" },
              { nom: "B", en: [5, 0], vers: "d" },
              { nom: "C", en: [-3, 4], vers: "hg" },
              { nom: "O", en: [0, 0], vers: "bd", ecart: 10 },
            ],
            polygone: "ABC",
            mediatrices: ["AB", "BC"],
            codage: true,
            segments: [
              { de: "O", a: "A" },
              { de: "O", a: "B" },
              { de: "O", a: "C" },
            ],
          }),
          correction:
            "1. Soit O le point où se coupent les médiatrices de $[AB]$ et de $[BC]$.\n2. O est sur la médiatrice de $[AB]$, donc $OA = OB$.\n3. O est sur la médiatrice de $[BC]$, donc $OB = OC$.\n4. Donc $OA = OC$ : O est sur la médiatrice de $[AC]$.\nLes trois médiatrices passent donc par O.\n⭐ En prime : $OA = OB = OC$. Le cercle de centre O passe par les trois sommets.\n⛔ Le piège : sauter la phrase 4. C'est elle qui amène la troisième médiatrice.\nRéponse : la preuve en quatre phrases ci-dessus.",
          micros: ["circonscrit_concourantes"],
        },
        {
          titre: "La table ronde",
          enonce:
            "Un menuisier a un plateau rectangulaire ABCD de $8$ dm sur $6$ dm.\nIl veut une table ronde dont le bord passe par les quatre coins.\na) Trace les médiatrices de $[AB]$ et de $[BC]$. Où se coupent-elles ?\nb) On mesure $OA = 5$ dm. Que valent $OB$, $OC$ et $OD$ ?\nc) Quel diamètre doit avoir la table ?",
          figure: geo({
            points: [
              { nom: "A", en: [-4, -3], vers: "bg" },
              { nom: "B", en: [4, -3], vers: "bd" },
              { nom: "C", en: [4, 3], vers: "hd" },
              { nom: "D", en: [-4, 3], vers: "hg" },
              { nom: "O", en: [0, 0], vers: "bd", ecart: 10 },
            ],
            polygone: "ABCD",
            mediatrices: ["AB", "BC"],
            cercles: [{ centre: "O", par: "A" }],
          }),
          correction:
            "a) La médiatrice de $[AB]$ coupe le plateau en une moitié gauche et une moitié droite.\nCelle de $[BC]$ le coupe en une moitié du haut et une du bas.\nElles se coupent au centre O du plateau.\nb) O est sur la médiatrice de $[AB]$ : $OB = OA = 5$ dm.\nO est sur la médiatrice de $[BC]$ : $OC = OB = 5$ dm.\nLa médiatrice de $[AB]$ est aussi celle de $[CD]$ : $OD = OC = 5$ dm.\nc) Le cercle de centre O et de rayon $5$ dm passe par les quatre coins.\nSon diamètre : $5 \\times 2 = 10$ dm.\n⛔ Le piège : prendre $8$ dm, la longueur du plateau. Les coins dépasseraient.\nRéponse : a) au centre du plateau ; b) $5$ dm chacun ; c) $10$ dm.",
          micros: ["circonscrit_defi"],
        },
      ],
    },
  ],
};
