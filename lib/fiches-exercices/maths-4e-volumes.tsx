// ─── Fiche d'exercices : les volumes (4e) — 20 exercices corrigés ─────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-volumes.tsx` (« Les
// volumes ») et sur les SEPT micros du coach de 4e (notionId `volume_solide`).
// L'angle de la 4e, comme le cours : UNE formule pour trois solides droits,
// « aire de la base × hauteur » — pavé, prisme, cylindre —, et les unités qui
// vont de mille en mille. ⛔ Ni cône, ni pyramide, ni boule, ni agrandissement
// (k³) : aucune micro de 4e ne les porte, c'est la 3e. ⛔ Ni patrons, ni vues,
// ni sections (`vision_espace`), ni conversions de longueurs, d'aires ou de
// débits pour elles-mêmes (`grandeur_composee`) : ici, une longueur ne se
// convertit que pour mettre un calcul de volume dans une seule unité.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le pavé 4 × 3 × 5
// (60 cm³), ni les 24 cubes en 4 × 3 × 2, ni l'aire de base 12 ou 18, ni le
// cylindre de rayon 5 et de hauteur 4, ni la réserve 3 × 2 × 2, ni les trois
// élèves du pavé 5 × 4 × 3. ⛔ Ni ceux de la feuille de 3e (le carton 55 × 35 ×
// 30, la tente, le verre de 7 cm, la piscine 25 × 12,5, le hangar, la cuve de
// pluie, les dés, la maquette, le silo).
//
// Les pièges nommés, et où ils reviennent :
// - juger un volume à l'œil, à la hauteur ou à la largeur (1, 14) ;
// - additionner les dimensions au lieu de les multiplier (3, 7) ;
// - s'arrêter à l'aire de la base, des cm² (2) ;
// - oublier le ÷ 2 d'une base triangulaire (4) ;
// - le TOUR du disque (2πr) au lieu de son aire (πr²) (5) ;
// - un rang de virgule au lieu de trois, × 10 au lieu de × 1 000 (6, 15) ;
// - prendre la hauteur de la base pour celle du prisme (8, 10) ;
// - la hauteur du récipient au lieu de celle du liquide (9) ;
// - des unités mélangées dans un produit ou une division (11, 12, 17, 19) ;
// - le pavé qui enferme le solide au lieu du solide (13) ;
// - doubler le rayon, c'est doubler la base (14) ;
// - garder les dimensions de la plaque (16) ;
// - le diamètre à la place du rayon (18, 20).
//
// Les chiffres du monde, et d'où ils viennent :
// - bain de 150 à 200 L, douche de 4 à 5 minutes de 60 à 80 L : Centre
//   d'information sur l'eau (cieau.com, « Les usages domestiques de l'eau ») —
//   ex. 17 ; la baignoire 1,5 m × 0,6 m remplie sur 20 cm est un MODÈLE (un
//   pavé) qui retombe dans la fourchette (180 L) ;
// - balle ronde de foin : 1,20 m de large, la largeur de chambre courante des
//   presses à balles rondes (fiches techniques des constructeurs), diamètre
//   réglable autour de 1,20 m ; les 200 kg par m³ sont « admis » dans
//   l'énoncé, à l'ordre de grandeur d'un foin pressé — ex. 18 ;
// - bassin olympique : 50 m sur 25 m, profondeur minimale de 2 m (World
//   Aquatics, Facilities Rules, FR 2), soit 2 500 m³ — ex. 19 ; la digue
//   (1,2 km, coupe de 20 m, 5 m et 6 m) est IMAGINÉE, à l'ordre de grandeur
//   d'une digue de terre réelle ;
// - tuyau d'arrosage de 15 mm de diamètre intérieur : un des trois diamètres
//   courants du commerce (12,5 / 15 / 19 mm) — ex. 20 ;
// - le ballon d'eau chaude de 200 L (50 cm × 1 m intérieurs) et l'aquarium
//   60 × 30 × 35 sont IMAGINÉS, à l'ordre de grandeur des modèles vendus —
//   ex. 9 et 11.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés
// dessinent leur solide, à l'échelle, dimensions écrites dessus ; la base en
// ORANGE, la hauteur en pointillés ou sur la fuyante, le rayon en rouge. Deux
// solides à comparer sont à la MÊME échelle (`ech` commun). Trois dessins
// seulement sont RACCOURCIS sur la fuyante (le fossé de 40 m, la digue de
// 1,2 km, le tuyau de 25 m) et leur légende le dit.
// ⛔ LA LEÇON DE LA FEUILLE « ESPACE » DE 3e : des étiquettes y croisaient des
// arêtes. Ici, chaque dessin est une SCÈNE (traits + étiquettes) : une cote se
// pose DEHORS, à 5 px du bord, le long de la normale extérieure (`dehors`), et
// le cadre se calcule sur la boîte de chaque texte. Le script de recalcul
// REND chaque dessin (React, côté serveur) et vérifie que tout texte reste
// dans le cadre, qu'aucun trait visible ne le traverse, qu'aucun texte n'en
// chevauche un autre, et qu'il reste à 11 px au moins sur un téléphone.
// ⭐ Le script relit aussi les nombres de chaque dessin (`pave(60, 30, 35`,
// `prisme([[0, 0], …]`…) : les écrire EN CLAIR, dans l'appel.
//
// Les corrigés sont écrits à la première personne, comme les autres feuilles.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-volumes-4e.mjs`.
//
// Micro-compétences : volume_comprendre (1, 14), volume_lien_aire (2, 8, 12,
// 16, 17, 20), volume_pave (3, 7, 9, 12, 16, 17, 18, 19), volume_prisme (4, 8,
// 10, 13, 19), volume_cylindre (5, 11, 14, 18, 20), volume_unite (6, 7, 9, 10,
// 11, 12, 13, 15, 17, 19, 20), volume_defi (17 à 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU_CORPS = "#dbeafe";
const BLEU_DESSUS = "#eff6ff";
const BLEU_COTE = "#bfdbfe";
const GRILLE = "#60a5fa";
const TRAIT = "#0f172a";
const ORANGE_FOND = "#fed7aa";
const ORANGE_TRAIT = "#f97316";
const ROUGE = "#b91c1c";
const GRIS = "#94a3b8";
const VERRE = "#f8fafc";
const EAU = { face: "#93c5fd", dessus: "#bfdbfe", cote: "#60a5fa" };
const PATE = { face: "#fde68a", dessus: "#fef3c7", cote: "#fcd34d" };
const F = 14;
/** Largeur d'un caractère gras, en fraction de F (large exprès : « m » compris). */
const LETTRE = 0.62;
const CADRE = "mx-auto w-full max-w-[16rem] print:max-w-[11rem]";
const POINTILLE = "5 4";

type Pt = [number, number];
type Trait = { p: Pt[]; ferme?: boolean; fond?: string; couleur?: string; ep?: number; tirets?: boolean };
type Etiquette = { x: number; y: number; t: string; ancre?: "start" | "middle" | "end"; couleur?: string; vertical?: boolean };
type Scene = { traits: Trait[]; textes: Etiquette[] };

const largeurTexte = (t: string) => [...t].length * F * LETTRE;

/** La boîte d'un texte : [xmin, ymin, xmax, ymax]. Vertical = `rotate(-90)`. */
const boiteTexte = (e: Etiquette): [number, number, number, number] => {
  const w = largeurTexte(e.t);
  const a = e.ancre ?? "middle";
  const u0 = a === "start" ? 0 : a === "end" ? -w : -w / 2;
  if (!e.vertical) return [e.x + u0, e.y - 0.75 * F, e.x + u0 + w, e.y + 0.25 * F];
  return [e.x - 0.75 * F, e.y - u0 - w, e.x + 0.25 * F, e.y - u0];
};

/**
 * Une étiquette posée DEHORS : sa boîte est à `ecart` px du point `p`, du côté
 * de la normale `n` (coordonnées d'écran, y vers le bas). Pour un bord droit,
 * elle ne peut donc pas le croiser.
 */
const dehors = (p: Pt, n: Pt, t: string, couleur?: string, ecart = 5): Etiquette => {
  const l = Math.hypot(n[0], n[1]);
  const [nx, ny] = [n[0] / l, n[1] / l];
  const k = ecart + (Math.abs(nx) * largeurTexte(t)) / 2 + (Math.abs(ny) * F) / 2;
  return { x: p[0] + nx * k, y: p[1] + ny * k + 0.25 * F, t, couleur };
};

/** Un texte vertical collé à gauche de la verticale x = 0, centré en y. */
const aGauche = (y: number, t: string): Etiquette => ({ x: -5 - 0.25 * F, y, t, vertical: true });

/** Des points d'ellipse, de l'angle a0 à l'angle a1. */
const ovale = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n = 36): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as Pt;
  });

/** La scène rendue : le cadre se calcule sur les traits ET sur la boîte de chaque texte. */
const dessiner = (s: Scene, titre: string) => {
  const xs: number[] = [];
  const ys: number[] = [];
  s.traits.forEach((tr) => tr.p.forEach(([x, y]) => (xs.push(x), ys.push(y))));
  s.textes.forEach((e) => {
    const b = boiteTexte(e);
    xs.push(b[0], b[2]);
    ys.push(b[1], b[3]);
  });
  const M = 6;
  const dx = M - Math.min(...xs);
  const dy = M - Math.min(...ys);
  const W = Math.max(...xs) + dx + M;
  const H = Math.max(...ys) + dy + M;
  const P = (p: Pt[]) => p.map(([x, y]) => `${(x + dx).toFixed(1)},${(y + dy).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} role="img" aria-label={titre} className={CADRE}>
      {s.traits.map((tr, i) =>
        tr.ferme ? (
          <polygon key={i} points={P(tr.p)} fill={tr.fond ?? "none"} stroke={tr.couleur ?? "none"} strokeWidth={tr.ep ?? 2} strokeDasharray={tr.tirets ? POINTILLE : undefined} strokeLinejoin="round" />
        ) : (
          <polyline key={i} points={P(tr.p)} fill="none" stroke={tr.couleur ?? TRAIT} strokeWidth={tr.ep ?? 2} strokeDasharray={tr.tirets ? POINTILLE : undefined} strokeLinejoin="round" />
        ),
      )}
      {s.textes.map((e, i) => {
        const x = +(e.x + dx).toFixed(1);
        const y = +(e.y + dy).toFixed(1);
        return (
          <text key={`t${i}`} x={x} y={y} textAnchor={e.ancre ?? "middle"} fontSize={F} fontWeight={700} fill={e.couleur ?? TRAIT} transform={e.vertical ? `rotate(-90 ${x} ${y})` : undefined}>
            {e.t}
          </text>
        );
      })}
    </svg>
  );
};

/**
 * Un pavé droit en perspective cavalière (fuyante à 45°, réduite à 0,35).
 * `L` s'écrit dessous, `h` à gauche (vertical), `l` sous la fuyante de droite.
 * `grille` : les cubes unités ; `etages` : une tranche par unité de hauteur.
 * `niveau` : un liquide jusqu'à cette hauteur (le pavé devient un récipient ;
 * `pate` le colore en jaune), `t.eau` s'écrit DANS le liquide.
 */
const pave = (
  L: number,
  l: number,
  h: number,
  t: { L?: string; l?: string; h?: string; eau?: string } = {},
  o: { ech?: number; grille?: boolean; etages?: boolean; niveau?: number; pate?: boolean } = {},
) => {
  const ech = o.ech ?? Math.min(150 / (L + 0.35 * l), 115 / (h + 0.35 * l));
  const w = L * ech;
  const H = h * ech;
  const d = l * ech * 0.35;
  const f = ([x, y]: Pt, k = 1): Pt => [x + d * k, y - d * k];
  const A: Pt = [0, 0];
  const B: Pt = [w, 0];
  const C: Pt = [w, -H];
  const D: Pt = [0, -H];
  const [A2, B2, C2, D2] = [A, B, C, D].map((p) => f(p));
  const recipient = o.niveau !== undefined;
  const traits: Trait[] = [
    { p: [A, B, C, D], ferme: true, fond: recipient ? VERRE : BLEU_CORPS },
    { p: [D, C, C2, D2], ferme: true, fond: recipient ? VERRE : BLEU_DESSUS },
    { p: [B, B2, C2, C], ferme: true, fond: recipient ? VERRE : BLEU_COTE },
    { p: [A, A2, B2], tirets: true, ep: 1.2 },
    { p: [A2, D2], tirets: true, ep: 1.2 },
  ];
  const textes: Etiquette[] = [];
  if (recipient) {
    const nv = (o.niveau ?? 0) * ech;
    const c = o.pate ? PATE : EAU;
    const Aw: Pt = [0, -nv];
    const Bw: Pt = [w, -nv];
    traits.push(
      { p: [A, B, Bw, Aw], ferme: true, fond: c.face },
      { p: [Aw, Bw, f(Bw), f(Aw)], ferme: true, fond: c.dessus },
      { p: [B, B2, f(Bw), Bw], ferme: true, fond: c.cote },
      { p: [Aw, Bw, f(Bw)], couleur: c.cote, ep: 1.4 },
    );
    if (t.eau) textes.push({ x: w / 2, y: -nv / 2 + 0.25 * F, t: t.eau });
  }
  if (o.grille) {
    for (let i = 1; i < L; i++) {
      const x = (i * w) / L;
      traits.push({ p: [[x, 0], [x, -H], f([x, -H])], couleur: GRILLE, ep: 0.8 });
    }
    for (let j = 1; j < h; j++) {
      const y = -(j * H) / h;
      traits.push({ p: [[0, y], [w, y], f([w, y])], couleur: GRILLE, ep: 0.8 });
    }
    for (let k = 1; k < l; k++) {
      const e = (k * d) / l;
      traits.push({ p: [[e, -H - e], [w + e, -H - e], [w + e, -e]], couleur: GRILLE, ep: 0.8 });
    }
  }
  if (o.etages) {
    for (let j = 1; j < h; j++) {
      const y = -(j * H) / h;
      traits.push({ p: [[0, y], [w, y], f([w, y])], couleur: ORANGE_TRAIT, ep: 1 });
    }
  }
  traits.push({ p: [A, B, B2, C2, D2, D, A], couleur: TRAIT }, { p: [D, C, B], couleur: TRAIT }, { p: [C, C2], couleur: TRAIT });
  if (t.L) textes.push(dehors([w / 2, 0], [0, 1], t.L));
  if (t.h) textes.push(aGauche(-H / 2, t.h));
  if (t.l) textes.push(dehors([w + d / 2, -d / 2], [1, 1], t.l));
  return dessiner({ traits, textes }, `Un pavé droit ${t.L ?? ""} ${t.l ?? ""} ${t.h ?? ""}`);
};

/**
 * Un prisme droit COUCHÉ : sa base (en orange) est la façade, un polygone
 * donné par ses sommets en vraies unités (y vers le haut, sens direct) ; la
 * hauteur du prisme `long` est sur la fuyante. `cotes` : texte d'un bord de la
 * base (numéro du bord = numéro de son premier sommet), posé dehors ; seuls les
 * bords tournés vers le bas ou la gauche en portent, les autres ont une face
 * collée contre eux. `longDessin` : la longueur DESSINÉE, quand elle est
 * raccourcie. `droit` : le sommet de l'angle droit de la base.
 */
const prisme = (
  base: Pt[],
  long: number,
  t: { long?: string; cotes?: Record<number, string> } = {},
  o: { ech?: number; longDessin?: number; droit?: number } = {},
) => {
  const Ld = o.longDessin ?? long;
  const xs = base.map((p) => p[0]);
  const ys = base.map((p) => p[1]);
  const [minx, miny] = [Math.min(...xs), Math.min(...ys)];
  const [wx, hy] = [Math.max(...xs) - minx, Math.max(...ys) - miny];
  const ech = o.ech ?? Math.min(140 / (wx + 0.35 * Ld), 110 / (hy + 0.35 * Ld));
  const d = Ld * ech * 0.35;
  const n = base.length;
  const P = base.map(([x, y]): Pt => [(x - minx) * ech, -(y - miny) * ech]);
  const Q = P.map(([x, y]): Pt => [x + d, y - d]);
  const suiv = (i: number) => (i + 1) % n;
  // Face latérale i visible si sa normale extérieure regarde vers le haut ou la droite.
  const vue = base.map((p, i) => {
    const q = base[suiv(i)];
    return q[1] - p[1] - (q[0] - p[0]) > 1e-9;
  });
  const traits: Trait[] = [];
  base.forEach((p, i) => {
    if (!vue[i]) return;
    const q = base[suiv(i)];
    const droite = Math.abs(q[1] - p[1]) > Math.abs(q[0] - p[0]);
    traits.push({ p: [P[i], P[suiv(i)], Q[suiv(i)], Q[i]], ferme: true, fond: droite ? BLEU_COTE : BLEU_DESSUS });
  });
  traits.push({ p: P, ferme: true, fond: ORANGE_FOND });
  base.forEach((_, i) => {
    const prec = (i + n - 1) % n;
    if (!vue[i]) traits.push({ p: [Q[i], Q[suiv(i)]], tirets: true, ep: 1.2 });
    if (!vue[i] && !vue[prec]) traits.push({ p: [P[i], Q[i]], tirets: true, ep: 1.2 });
  });
  base.forEach((_, i) => {
    const prec = (i + n - 1) % n;
    if (vue[i]) traits.push({ p: [Q[i], Q[suiv(i)]], couleur: TRAIT });
    if (vue[i] || vue[prec]) traits.push({ p: [P[i], Q[i]], couleur: TRAIT });
  });
  traits.push({ p: P, ferme: true, couleur: ORANGE_TRAIT, ep: 2.4 });
  if (o.droit !== undefined) {
    const j = o.droit;
    const u = (a: Pt): Pt => {
      const l = Math.hypot(a[0] - P[j][0], a[1] - P[j][1]);
      return [((a[0] - P[j][0]) / l) * 9, ((a[1] - P[j][1]) / l) * 9];
    };
    const [a, b] = [u(P[suiv(j)]), u(P[(j + n - 1) % n])];
    traits.push({ p: [[P[j][0] + a[0], P[j][1] + a[1]], [P[j][0] + a[0] + b[0], P[j][1] + a[1] + b[1]], [P[j][0] + b[0], P[j][1] + b[1]]], couleur: ORANGE_TRAIT, ep: 1.4 });
  }
  const textes: Etiquette[] = [];
  for (const [k, texte] of Object.entries(t.cotes ?? {})) {
    const i = Number(k);
    const [p, q] = [base[i], base[suiv(i)]];
    const m: Pt = [(P[i][0] + P[suiv(i)][0]) / 2, (P[i][1] + P[suiv(i)][1]) / 2];
    textes.push(dehors(m, [q[1] - p[1], q[0] - p[0]], texte));
  }
  if (t.long) {
    let j = 0;
    base.forEach((p, i) => {
      if (p[0] - p[1] > base[j][0] - base[j][1]) j = i;
    });
    textes.push(dehors([P[j][0] + d / 2, P[j][1] - d / 2], [1, 1], t.long));
  }
  return dessiner({ traits, textes }, "Un prisme droit couché, sa base en orange");
};

/**
 * Un cylindre : debout (rayon en rouge sur le disque du haut, hauteur à
 * droite), ou `couche` (axe horizontal, rayon à droite, longueur dessous).
 * `longDessin` : la longueur dessinée d'un cylindre couché raccourci.
 */
const cylindre = (r: number, h: number, t: { r?: string; h?: string } = {}, o: { ech?: number; couche?: boolean; longDessin?: number } = {}) => {
  const traits: Trait[] = [];
  const textes: Etiquette[] = [];
  if (!o.couche) {
    const ech = o.ech ?? Math.min(70 / r, 120 / h);
    const rx = r * ech;
    const ry = Math.max(rx * 0.3, 4);
    const H = h * ech;
    const devant = ovale(0, H, rx, ry, Math.PI, 0);
    traits.push(
      { p: [[-rx, 0], ...devant, [rx, 0]], ferme: true, fond: BLEU_CORPS },
      { p: ovale(0, 0, rx, ry, 0, 2 * Math.PI), ferme: true, fond: BLEU_DESSUS },
      { p: ovale(0, H, rx, ry, Math.PI, 2 * Math.PI), tirets: true, ep: 1.2 },
      { p: [[-rx, 0], ...devant, [rx, 0]], couleur: TRAIT },
      { p: ovale(0, 0, rx, ry, 0, 2 * Math.PI), ferme: true, couleur: TRAIT },
      { p: [[0, 0], [0, H]], tirets: true, ep: 1.4 },
      { p: [[0, 0], [rx, 0]], couleur: ROUGE, ep: 2.4 },
    );
    if (t.r) textes.push(dehors([rx / 2, -ry], [0, -1], t.r, ROUGE));
    if (t.h) textes.push(dehors([rx, H / 2], [1, 0], t.h));
  } else {
    const Ld0 = o.longDessin ?? h;
    const ech = o.ech ?? Math.min(60 / r, 170 / Ld0);
    const R = r * ech;
    const e = Math.max(R * 0.3, 4);
    const Ld = Ld0 * ech;
    const gauche = ovale(0, 0, e, R, (3 * Math.PI) / 2, Math.PI / 2);
    traits.push(
      { p: [[Ld, -R], ...gauche, [Ld, R]], ferme: true, fond: BLEU_CORPS },
      { p: ovale(0, 0, e, R, -Math.PI / 2, Math.PI / 2), tirets: true, ep: 1.2 },
      { p: ovale(Ld, 0, e, R, 0, 2 * Math.PI), ferme: true, fond: BLEU_DESSUS, couleur: TRAIT },
      { p: [[Ld, -R], ...gauche, [Ld, R]], couleur: TRAIT },
      { p: [[0, 0], [Ld, 0]], tirets: true, ep: 1.4 },
      { p: [[Ld, 0], [Ld, -R]], couleur: ROUGE, ep: 2.4 },
    );
    if (t.r) textes.push(dehors([Ld + e, -R / 2], [1, 0], t.r, ROUGE));
    if (t.h) textes.push(dehors([Ld / 2, R], [0, 1], t.h));
  }
  return dessiner({ traits, textes }, `Un cylindre, ${t.r ?? ""}, ${t.h ?? ""}`);
};

/**
 * Une base à plat, en vraie grandeur relative (y vers le haut, sens direct) :
 * `cotes` posées dehors comme pour le prisme, `hauteurs` en pointillés avec
 * leur texte à droite, `decoupe` : les pointillés d'un découpage.
 */
const aPlat = (poly: Pt[], t: { cotes?: Record<number, string>; hauteurs?: [Pt, Pt, string][]; decoupe?: [Pt, Pt][] } = {}, o: { ech?: number } = {}) => {
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  const [minx, miny] = [Math.min(...xs), Math.min(...ys)];
  const ech = o.ech ?? Math.min(170 / (Math.max(...xs) - minx), 110 / (Math.max(...ys) - miny));
  const E = ([x, y]: Pt): Pt => [(x - minx) * ech, -(y - miny) * ech];
  const P = poly.map(E);
  const n = poly.length;
  const traits: Trait[] = [{ p: P, ferme: true, fond: ORANGE_FOND, couleur: ORANGE_TRAIT, ep: 2.4 }];
  const textes: Etiquette[] = [];
  for (const [a, b] of t.decoupe ?? []) traits.push({ p: [E(a), E(b)], tirets: true, ep: 1.2 });
  for (const [a, b, texte] of t.hauteurs ?? []) {
    const [A, B] = [E(a), E(b)];
    traits.push({ p: [A, B], tirets: true, ep: 1.4 });
    textes.push(dehors([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], [1, 0], texte));
  }
  for (const [k, texte] of Object.entries(t.cotes ?? {})) {
    const i = Number(k);
    const [p, q] = [poly[i], poly[(i + 1) % n]];
    const m: Pt = [(P[i][0] + P[(i + 1) % n][0]) / 2, (P[i][1] + P[(i + 1) % n][1]) / 2];
    textes.push(dehors(m, [q[1] - p[1], q[0] - p[0]], texte));
  }
  return dessiner({ traits, textes }, "Une base dessinée à plat");
};

/**
 * La plaque de carton `Lg` × `lg` dont on découpe un carré de côté `c` à
 * chaque coin (en gris, pointillés) ; les pliures en pointillés noirs.
 */
const plaque = (Lg: number, lg: number, c: number, t: { L?: string; l?: string; c?: string; fond?: string } = {}) => {
  const ech = Math.min(170 / Lg, 110 / lg);
  const [W, H, s] = [Lg * ech, lg * ech, c * ech];
  const croix: Pt[] = [[s, 0], [W - s, 0], [W - s, s], [W, s], [W, H - s], [W - s, H - s], [W - s, H], [s, H], [s, H - s], [0, H - s], [0, s], [s, s]];
  const carre = (x: number, y: number): Trait => ({ p: [[x, y], [x + s, y], [x + s, y + s], [x, y + s]], ferme: true, couleur: GRIS, ep: 1.2, tirets: true });
  const traits: Trait[] = [
    carre(0, 0),
    carre(W - s, 0),
    carre(W - s, H - s),
    carre(0, H - s),
    { p: croix, ferme: true, fond: ORANGE_FOND, couleur: ORANGE_TRAIT, ep: 2.2 },
    { p: [[s, s], [W - s, s], [W - s, H - s], [s, H - s]], ferme: true, couleur: TRAIT, ep: 1.2, tirets: true },
  ];
  const textes: Etiquette[] = [];
  if (t.L) textes.push(dehors([W / 2, H], [0, 1], t.L));
  if (t.l) textes.push(aGauche(H / 2, t.l));
  if (t.c) textes.push(dehors([s / 2, 0], [0, -1], t.c));
  if (t.fond) textes.push({ x: W / 2, y: H / 2 + 0.25 * F, t: t.fond });
  return dessiner({ traits, textes }, "Une plaque de carton aux coins découpés");
};

/** L'escalier des unités, du haut vers le bas, chaque marche avec sa flèche. */
const chaine = (cases: string[], fleches: string[]) => {
  const bw = Math.max(...cases.map(largeurTexte)) + 24;
  const bh = 30;
  const pas = 64;
  const traits: Trait[] = [];
  const textes: Etiquette[] = [];
  cases.forEach((c, i) => {
    const y0 = i * pas;
    traits.push({ p: [[0, y0], [bw, y0], [bw, y0 + bh], [0, y0 + bh]], ferme: true, fond: BLEU_DESSUS, couleur: TRAIT, ep: 1.6 });
    textes.push({ x: bw / 2, y: y0 + bh / 2 + 0.25 * F, t: c });
    if (i < fleches.length) {
      const [ya, yb] = [y0 + bh + 3, y0 + pas - 3];
      traits.push({ p: [[bw / 2, ya], [bw / 2, yb - 6]], couleur: ROUGE, ep: 2 });
      traits.push({ p: [[bw / 2 - 5, yb - 8], [bw / 2 + 5, yb - 8], [bw / 2, yb]], ferme: true, fond: ROUGE });
      textes.push(dehors([bw / 2, (ya + yb) / 2], [1, 0], fleches[i], ROUGE, 9));
    }
  });
  return dessiner({ traits, textes }, "L'escalier des unités de volume");
};

/** Un dessin et sa légende en HTML dessous (texte nu, pas de `$`). */
const avec = (dessin: ReactNode, legende: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-sm font-bold text-slate-600">{legende}</p>
  </div>
);

/** Deux dessins côte à côte ; l'un sous l'autre sur un téléphone. */
const ensemble = (...dessins: ReactNode[]) => (
  <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 print:grid-cols-2">
    {dessins.map((d, i) => (
      <div key={i}>{d}</div>
    ))}
  </div>
);

// Échelles communes des paires à comparer (px par unité).
const ECH_CUBES = 12;
const ECH_BOITES = 12;
const ECH_FOIN = 90;

export const exercicesVolumes4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "volume-solide",
  titre: "Calculer des volumes : pavé, prisme, cylindre",
  accroche:
    "Vingt exercices, de la tour de cubes à la digue contre la mer : une seule règle, aire de la base × hauteur, pour le pavé, le prisme et le cylindre, puis les cm³, les litres et les m³ qui vont de mille en mille. Un aquarium, un moule à cake, un bain contre une douche, une balle de foin, l'eau oubliée dans un tuyau d'arrosage. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le solide dessiné et ses mesures dessus.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/volume-solide", titre: "Les volumes" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je reconnais le solide, je calcule l'aire de sa base, je multiplie par la hauteur et j'écris l'unité.",
      rappel: [
        "Un volume compte des cubes : $1$ cm³, c'est un petit cube de $1$ cm d'arête. On MULTIPLIE des longueurs, on ne les additionne jamais.",
        "Pavé droit, prisme droit, cylindre : volume = aire de la base × hauteur. Pour le pavé : $V = L \\times l \\times h$.",
        "La base d'un cylindre est un disque, d'aire $\\pi \\times r^2$, avec le RAYON.",
        "$1$ dm³ $= 1\\,000$ cm³ $= 1$ L, et $1$ m³ $= 1\\,000$ dm³ $= 1\\,000$ L.",
      ],
      exercices: [
        {
          enonce:
            "On construit deux solides avec des cubes de $1$ cm d'arête, sans laisser de vide (figure) : une tour de $2$ cubes sur $2$, haute de $9$ étages, et un bloc de $4$ cubes sur $3$, haut de $3$ étages.\na) Combien de cubes compte chaque solide ?\nb) Lequel occupe le plus de place ?",
          reponses: [
            { question: "a) tour", attendu: "36" },
            { question: "a) bloc", attendu: "36" },
          ],
          figure: ensemble(pave(2, 2, 9, {}, { ech: ECH_CUBES, grille: true }), pave(4, 3, 3, {}, { ech: ECH_CUBES, grille: true })),
          correction:
            "Je compte étage par étage : chaque étage est un rectangle de cubes, et tous les étages sont pareils.\na) La tour : un étage compte $2 \\times 2 = 4$ cubes, et il y a $9$ étages : $4 \\times 9 = 36$ cubes. Le bloc : un étage compte $4 \\times 3 = 12$ cubes, et il y a $3$ étages : $12 \\times 3 = 36$ cubes.\nb) Chaque cube occupe $1$ cm³. Les deux solides ont donc le même volume, $36$ cm³ : ils occupent exactement la même place, rangée autrement.\n⛔ Le piège : juger à l'œil. La tour paraît plus grosse parce qu'elle est haute, le bloc parce qu'il est large. Le volume ne dépend pas de la forme, seulement du nombre de cubes.\nRéponse : $36$ cubes chacun ; les deux ont le même volume, $36$ cm³.",
          schema: ensemble(
            avec(pave(2, 2, 9, { L: "2 cm", h: "9 cm" }, { ech: ECH_CUBES, grille: true }), "4 cubes par étage, 9 étages : 36"),
            avec(pave(4, 3, 3, { L: "4 cm", l: "3 cm", h: "3 cm" }, { ech: ECH_CUBES, grille: true }), "12 cubes par étage, 3 étages : 36"),
          ),
          micros: ["volume_comprendre"],
        },
        {
          enonce:
            "La base d'un pavé droit est un rectangle de $6$ cm sur $2{,}5$ cm, et sa hauteur est $8$ cm.\na) Calculer l'aire de la base.\nb) Quel est le volume d'une tranche du pavé épaisse de $1$ cm ?\nc) En déduire le volume du pavé.",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "120" },
          ],
          correction:
            "a) La base est un rectangle : $6 \\times 2{,}5 = 15$ cm².\nb) Une tranche de $1$ cm d'épaisseur, c'est la base posée sur $1$ cm de hauteur : $15 \\times 1 = 15$ cm³. Autant de cm³ que de cm² dans la base.\nc) Le pavé est un empilement de $8$ tranches pareilles, une par centimètre de hauteur : $V = 15 \\times 8 = 120$ cm³.\nC'est la règle de tous les solides droits : volume = aire de la base × hauteur.\n⛔ Le piège : s'arrêter à l'aire de la base et répondre $15$. Ce sont des cm², une surface : il manque les $8$ étages.\nRéponse : une base de $15$ cm², une tranche de $15$ cm³, un pavé de $120$ cm³.",
          schema: avec(pave(6, 2.5, 8, { L: "6 cm", l: "2,5 cm", h: "8 cm" }, { etages: true }), "8 tranches de 15 cm³ : 120 cm³"),
          micros: ["volume_lien_aire"],
        },
        {
          enonce: "Une boîte à chaussures est un pavé droit de $32$ cm de long, $20$ cm de large et $12$ cm de haut. Calculer son volume en cm³.",
          reponses: [
            { attendu: "7680", unite: "cm³" },
          ],
          correction:
            "La boîte est un pavé droit : son volume est l'aire du fond multipliée par la hauteur.\nJe calcule l'aire du fond : $32 \\times 20 = 640$ cm².\nJe multiplie par la hauteur : $V = 640 \\times 12 = 7\\,680$ cm³.\n⛔ Le piège : additionner, $32 + 20 + 12 = 64$. Une somme de longueurs donne une longueur, en cm, jamais un volume en cm³.\nRéponse : $V = 7\\,680$ cm³.",
          schema: pave(32, 20, 12, { L: "32 cm", l: "20 cm", h: "12 cm" }),
          micros: ["volume_pave"],
        },
        {
          enonce: "Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent $8$ cm et $5$ cm. Sa hauteur est $9$ cm. Calculer son volume.",
          reponses: [
            { attendu: "180" },
          ],
          correction:
            "Un prisme droit se calcule comme un pavé : aire de la base × hauteur. Seule la forme de la base change.\nLa base est un triangle rectangle, la moitié d'un rectangle de $8$ cm sur $5$ cm : $8 \\times 5 \\div 2 = 20$ cm².\nJe multiplie par la hauteur du prisme : $V = 20 \\times 9 = 180$ cm³.\n⛔ Le piège : oublier le $\\div 2$ du triangle et trouver $8 \\times 5 \\times 9 = 360$ cm³, le volume d'une boîte deux fois plus grande que le prisme.\nRéponse : $V = 180$ cm³.",
          schema: avec(prisme([[0, 0], [8, 0], [0, 5]], 9, { cotes: { 0: "8 cm", 2: "5 cm" }, long: "9 cm" }, { droit: 0 }), "en orange, la base : un demi-rectangle"),
          micros: ["volume_prisme"],
        },
        {
          enonce: "Une boîte de conserve est un cylindre de $4$ cm de rayon et $12$ cm de hauteur, mesurés à l'intérieur. Calculer son volume : la valeur exacte avec $\\pi$, puis l'arrondi au centième.",
          reponses: [
            { question: "exacte", attendu: ["192π", "192×π", "192pi"], exact: true },
            { question: "arrondi", attendu: "603,19", tolerance: 0.005 },
          ],
          correction:
            "Un cylindre se calcule comme un prisme : aire de la base × hauteur. Sa base est un disque.\nAire du disque : $\\pi \\times r^2 = \\pi \\times 4^2 = 16\\pi$ cm².\nJe multiplie par la hauteur : $V = 16\\pi \\times 12 = 192\\pi$ cm³.\nÀ la calculatrice : $192\\pi \\approx 603{,}19$ cm³.\n⛔ Le piège : prendre le TOUR du disque au lieu de son aire. $2 \\times \\pi \\times 4 = 8\\pi$ est le périmètre, une longueur ; $8\\pi \\times 12 = 96\\pi \\approx 301{,}59$ est l'aire de l'étiquette collée autour de la boîte, pas ce qu'il y a dedans.\nRéponse : $V = 192\\pi \\approx 603{,}19$ cm³.",
          schema: cylindre(4, 12, { r: "r = 4 cm", h: "12 cm" }),
          micros: ["volume_cylindre"],
        },
        {
          enonce:
            "Compléter, en se souvenant qu'un décimètre cube est un cube de $10$ cm d'arête et que $1$ L $= 1$ dm³.\na) $2{,}5$ dm³ $= \\ldots$ cm³\nb) $4\\,200$ cm³ $= \\ldots$ dm³ $= \\ldots$ L\nc) $0{,}6$ m³ $= \\ldots$ dm³ $= \\ldots$ L",
          reponses: [
            { question: "a)", attendu: "2500" },
            { question: "b) dm³", attendu: "4,2", unite: "dm³" },
            { question: "b) L", attendu: "4,2", unite: "L" },
            { question: "c) dm³", attendu: "600", unite: "dm³" },
            { question: "c) L", attendu: "600", unite: "L" },
          ],
          correction:
            "Un cube de $1$ dm d'arête mesure $10$ cm dans chaque direction : il contient $10 \\times 10 \\times 10 = 1\\,000$ cubes de $1$ cm³. Donc $1$ dm³ $= 1\\,000$ cm³, et de même $1$ m³ $= 1\\,000$ dm³. D'une unité de volume à la suivante, je multiplie ou je divise par $1\\,000$.\na) $2{,}5 \\times 1\\,000 = 2\\,500$, donc $2{,}5$ dm³ $= 2\\,500$ cm³.\nb) $4\\,200 \\div 1\\,000 = 4{,}2$, donc $4\\,200$ cm³ $= 4{,}2$ dm³ $= 4{,}2$ L.\nc) $0{,}6 \\times 1\\,000 = 600$, donc $0{,}6$ m³ $= 600$ dm³ $= 600$ L.\n⛔ Le piège : décaler la virgule d'un seul rang, comme pour les longueurs, et écrire $2{,}5$ dm³ $= 25$ cm³. Un volume a trois dimensions : trois fois $10$, c'est $1\\,000$.\nRéponse : $2\\,500$ cm³ ; $4{,}2$ dm³, soit $4{,}2$ L ; $600$ dm³, soit $600$ L.",
          schema: avec(chaine(["m³", "dm³ = L", "cm³ = mL"], ["× 1 000", "× 1 000"]), "une unité plus bas : × 1 000"),
          micros: ["volume_unite"],
        },
        {
          enonce: "Un cube de rangement a une arête de $30$ cm.\na) Calculer son volume en cm³.\nb) Combien de litres contient-il ?",
          reponses: [
            { question: "a)", attendu: "27000", unite: "cm³" },
            { question: "b)", attendu: "27", unite: "L" },
          ],
          correction:
            "a) Un cube est un pavé dont les trois dimensions sont égales. L'aire d'une face : $30 \\times 30 = 900$ cm². Fois la hauteur : $V = 900 \\times 30 = 27\\,000$ cm³.\nb) $1$ L $= 1$ dm³ $= 1\\,000$ cm³, donc $27\\,000 \\div 1\\,000 = 27$ L.\n⛔ Le piège : écrire $30 \\times 3 = 90$, ou s'arrêter à $900$, l'aire d'une face. Le petit $3$ de cm³ ne veut pas dire « fois $3$ » : il compte trois longueurs multipliées, $30 \\times 30 \\times 30$.\nRéponse : $27\\,000$ cm³, soit $27$ L.",
          schema: pave(30, 30, 30, { L: "30 cm", l: "30 cm", h: "30 cm" }),
          micros: ["volume_pave", "volume_unite"],
        },
        {
          enonce: "Un prisme droit a pour base un trapèze d'aire $35$ cm². Sur la figure, on lit la hauteur du trapèze, $4$ cm, et la hauteur du prisme, $6$ cm. Calculer le volume du prisme.",
          reponses: [
            { attendu: "210" },
          ],
          figure: avec(prisme([[0, 0], [12, 0], [5.5, 4], [0, 4]], 6, { cotes: { 3: "4 cm" }, long: "6 cm" }, { droit: 0 }), "la base orange a une aire de 35 cm²"),
          correction:
            "Je repère la base : c'est la face orange, le trapèze. Son aire est donnée, $35$ cm² : je n'ai pas besoin de la recalculer.\nJe repère la hauteur du PRISME : c'est la distance entre ses deux bases, les deux trapèzes. Ici, $6$ cm.\n$V = 35 \\times 6 = 210$ cm³.\nLa forme de la base ne change rien à la règle : dès que je connais son aire, je la multiplie par la hauteur.\n⛔ Le piège : il y a deux « hauteurs » sur le dessin. Les $4$ cm sont la hauteur du trapèze, une longueur DANS la base : $35 \\times 4 = 140$ ne veut rien dire. La hauteur du prisme relie les deux bases.\nRéponse : $V = 210$ cm³.",
          schema: avec(prisme([[0, 0], [12, 0], [5.5, 4], [0, 4]], 6, { cotes: { 3: "4 cm" }, long: "6 cm" }, { droit: 0 }), "35 cm² de base, 6 cm de hauteur : 210 cm³"),
          micros: ["volume_lien_aire", "volume_prisme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine le solide, j'écris ses mesures dessus, je convertis, puis je calcule.",
      rappel: [
        "Je repère la BASE, la face qui se répète, et la HAUTEUR, la distance entre les deux bases, même quand le solide est couché.",
        "Je mets toutes les longueurs dans la même unité AVANT de multiplier, et je convertis le volume à la fin : $1$ L $= 1$ dm³ $= 1\\,000$ cm³.",
        "Si je connais le volume et l'aire de la base : hauteur = volume ÷ aire de la base.",
      ],
      exercices: [
        {
          enonce:
            "Un aquarium est un pavé droit de $60$ cm de long, $30$ cm de large et $35$ cm de haut. On le remplit d'eau jusqu'à $5$ cm du bord.\na) Calculer le volume de l'aquarium en cm³, puis en litres.\nb) Quelle est la hauteur de l'eau ? Calculer le volume d'eau, en litres.\nc) Combien de litres faudrait-il ajouter pour le remplir à ras bord ?",
          reponses: [
            { question: "a) cm³", attendu: "63000", unite: "cm³" },
            { question: "a) L", attendu: "63", unite: "L" },
            { question: "b) h", attendu: "30" },
            { question: "b) L", attendu: "54", unite: "L" },
            { question: "c)", attendu: "9", unite: "L" },
          ],
          correction:
            "a) Aire du fond : $60 \\times 30 = 1\\,800$ cm². Volume : $1\\,800 \\times 35 = 63\\,000$ cm³. Comme $1$ L $= 1\\,000$ cm³ : $63\\,000 \\div 1\\,000 = 63$ L.\nb) L'eau s'arrête $5$ cm sous le bord : sa hauteur est $35 - 5 = 30$ cm. L'eau forme un pavé de même fond : $1\\,800 \\times 30 = 54\\,000$ cm³, soit $54$ L.\nc) $63 - 54 = 9$ L. Vérification : la tranche vide est un pavé de $1\\,800$ cm² sur $5$ cm, $1\\,800 \\times 5 = 9\\,000$ cm³, soit $9$ L.\n⛔ Le piège : prendre la hauteur de l'aquarium, $35$ cm, pour celle de l'eau. Le volume d'eau se calcule avec la hauteur de l'EAU.\nRéponse : l'aquarium fait $63$ L, il contient $54$ L d'eau, il manque $9$ L.",
          schema: avec(pave(60, 30, 35, { L: "60 cm", l: "30 cm", h: "35 cm", eau: "30 cm" }, { niveau: 30 }), "l'eau : un pavé de même fond, haut de 30 cm"),
          micros: ["volume_pave", "volume_unite"],
        },
        {
          enonce:
            "Un fossé de drainage, creusé le long d'un champ, a pour coupe un trapèze : $1{,}2$ m de large en haut, $0{,}6$ m au fond et $0{,}5$ m de profondeur. Il mesure $40$ m de long.\na) Calculer l'aire de la coupe.\nb) Le fossé est un prisme droit couché. Quelle est sa hauteur ? Calculer le volume de terre qu'on a retiré, en m³ puis en litres.",
          reponses: [
            { question: "a)", attendu: "0,45" },
            { question: "b) h", attendu: "40" },
            { question: "b) m³", attendu: "18", unite: "m³" },
            { question: "b) L", attendu: "18000", unite: "L" },
          ],
          correction:
            "a) Je découpe la coupe : un rectangle de $0{,}6$ m sur $0{,}5$ m au milieu, et deux triangles sur les côtés qui, recollés, font un triangle de base $1{,}2 - 0{,}6 = 0{,}6$ m et de hauteur $0{,}5$ m. Rectangle : $0{,}6 \\times 0{,}5 = 0{,}3$ m². Triangles : $0{,}6 \\times 0{,}5 \\div 2 = 0{,}15$ m². Coupe : $0{,}3 + 0{,}15 = 0{,}45$ m².\nb) La base du prisme est la coupe, et sa hauteur relie les deux bouts du fossé : c'est la longueur, $40$ m. $V = 0{,}45 \\times 40 = 18$ m³. Comme $1$ m³ $= 1\\,000$ L : $18\\,000$ L.\n⛔ Le piège : prendre la profondeur, $0{,}5$ m, pour la hauteur du prisme. Couché, un prisme a sa hauteur à l'horizontale : c'est la distance entre ses deux bases.\nRéponse : une coupe de $0{,}45$ m² ; $18$ m³ de terre, soit $18\\,000$ L.",
          schema: ensemble(
            avec(aPlat([[0.3, 0], [0.9, 0], [1.2, 0.5], [0, 0.5]], { cotes: { 0: "0,6 m", 2: "1,2 m" }, hauteurs: [[[0.3, 0], [0.3, 0.5], "0,5 m"]] }), "la coupe, à plat : 0,45 m²"),
            avec(prisme([[0.3, 0], [0.9, 0], [1.2, 0.5], [0, 0.5]], 40, { long: "40 m" }, { longDessin: 4 }), "le fossé couché (dessin raccourci)"),
          ),
          micros: ["volume_prisme", "volume_unite"],
        },
        {
          enonce:
            "Un ballon d'eau chaude est vendu comme « ballon de $200$ L ». Sa cuve est un cylindre de $50$ cm de diamètre intérieur et de $1$ m de hauteur intérieure.\na) Exprimer le rayon et la hauteur en dm.\nb) Calculer le volume de la cuve en dm³ : la valeur exacte, puis l'arrondi à l'unité.\nc) L'annonce « $200$ L » est-elle honnête ?",
          reponses: [
            { question: "a) r", attendu: "2,5", unite: "dm" },
            { question: "a) h", attendu: "10", unite: "dm" },
            { question: "b) exact", attendu: ["62,5π", "62,5×π", "62,5pi"], exact: true },
            { question: "b) arrondi", attendu: "196", tolerance: 0.5, unite: "dm³" },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
          correction:
            "a) Le rayon est la moitié du diamètre : $50 \\div 2 = 25$ cm, soit $2{,}5$ dm. La hauteur : $1$ m $= 10$ dm.\nJe convertis AVANT de calculer : ainsi le volume sort directement en dm³, c'est-à-dire en litres.\nb) Aire de la base : $\\pi \\times 2{,}5^2 = 6{,}25\\pi$ dm². Volume : $V = 6{,}25\\pi \\times 10 = 62{,}5\\pi \\approx 196$ dm³.\nc) $196$ dm³, c'est $196$ L : annoncer $200$ L est un arrondi honnête, à $2$ % près.\n⛔ Le piège : mélanger les unités, $\\pi \\times 25^2 \\times 1 = 625\\pi \\approx 1\\,963$. Des cm² multipliés par des m ne donnent aucune unité connue : ce nombre ne veut rien dire.\nRéponse : $62{,}5\\pi \\approx 196$ dm³, soit environ $196$ L ; l'annonce est honnête.",
          schema: cylindre(2.5, 10, { r: "r = 2,5 dm", h: "1 m = 10 dm" }),
          micros: ["volume_cylindre", "volume_unite"],
        },
        {
          enonce:
            "Un moule à cake a un fond rectangulaire de $24$ cm sur $10$ cm et des bords droits de $7$ cm de haut. On y verse $1{,}2$ L de pâte.\na) Convertir $1{,}2$ L en cm³.\nb) Quelle hauteur la pâte atteint-elle dans le moule ?\nc) Quel volume reste-t-il libre au-dessus de la pâte, pour qu'elle gonfle à la cuisson ?",
          reponses: [
            { question: "a)", attendu: "1200", unite: "cm³" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "480" },
          ],
          correction:
            "a) $1$ L $= 1$ dm³ $= 1\\,000$ cm³, donc $1{,}2$ L $= 1\\,200$ cm³.\nb) La pâte prend la forme d'un pavé qui a le fond du moule pour base. Aire du fond : $24 \\times 10 = 240$ cm². Le volume vaut aire de la base × hauteur, donc la hauteur vaut volume ÷ aire de la base : $h = 1\\,200 \\div 240 = 5$ cm.\nc) Il reste $7 - 5 = 2$ cm de bord libre : $240 \\times 2 = 480$ cm³.\n⛔ Le piège : diviser sans convertir, $1{,}2 \\div 240 = 0{,}005$. Des litres divisés par des cm² : le résultat n'est pas une hauteur. Je mets d'abord le volume en cm³.\nRéponse : $1\\,200$ cm³ ; la pâte monte à $5$ cm ; il reste $480$ cm³ libres.",
          schema: avec(pave(24, 10, 7, { L: "24 cm", l: "10 cm", h: "7 cm", eau: "5 cm" }, { niveau: 5, pate: true }), "la pâte : 1 200 cm³ sur 240 cm², donc 5 cm"),
          micros: ["volume_lien_aire", "volume_pave", "volume_unite"],
        },
        {
          enonce:
            "Un escalier de jardin en béton a trois marches. Chaque marche mesure $30$ cm de profondeur et $20$ cm de haut, et l'escalier fait $1{,}5$ m de large (figure). C'est un prisme droit couché : sa base est le profil en escalier.\na) Calculer l'aire du profil en m².\nb) Calculer le volume de béton en m³, puis en litres.",
          reponses: [
            { question: "a)", attendu: "0,36", unite: "m²" },
            { question: "b) m³", attendu: "0,54", unite: "m³" },
            { question: "b) L", attendu: "540", unite: "L" },
          ],
          figure: prisme([[0, 0], [0.9, 0], [0.9, 0.2], [0.6, 0.2], [0.6, 0.4], [0.3, 0.4], [0.3, 0.6], [0, 0.6]], 1.5, { cotes: { 0: "90 cm", 7: "60 cm" }, long: "1,5 m" }),
          correction:
            "a) Je travaille en mètres : $30$ cm $= 0{,}3$ m et $20$ cm $= 0{,}2$ m. Je découpe le profil en rectangles de $0{,}3$ m sur $0{,}2$ m : il y en a $3 + 2 + 1 = 6$, trois sous la marche du haut, deux sous celle du milieu, un sous celle du bas. Chacun mesure $0{,}3 \\times 0{,}2 = 0{,}06$ m². Profil : $6 \\times 0{,}06 = 0{,}36$ m².\nb) La hauteur du prisme est la largeur de l'escalier, $1{,}5$ m : la distance entre les deux profils. $V = 0{,}36 \\times 1{,}5 = 0{,}54$ m³, soit $540$ L de béton.\n⛔ Le piège : calculer le pavé qui enferme l'escalier, $0{,}9 \\times 0{,}6 \\times 1{,}5 = 0{,}81$ m³. Les marches ne sont pas pleines jusqu'en haut : $270$ L de béton en trop.\nRéponse : un profil de $0{,}36$ m² ; $0{,}54$ m³, soit $540$ L de béton.",
          schema: ensemble(
            avec(aPlat([[0, 0], [0.9, 0], [0.9, 0.2], [0.6, 0.2], [0.6, 0.4], [0.3, 0.4], [0.3, 0.6], [0, 0.6]], { cotes: { 0: "90 cm", 1: "20 cm", 2: "30 cm", 7: "60 cm" }, decoupe: [[[0.3, 0], [0.3, 0.4]], [[0.6, 0], [0.6, 0.2]], [[0, 0.2], [0.6, 0.2]], [[0, 0.4], [0.3, 0.4]]] }), "le profil : 6 rectangles de 0,06 m²"),
            avec(prisme([[0, 0], [0.9, 0], [0.9, 0.2], [0.6, 0.2], [0.6, 0.4], [0.3, 0.4], [0.3, 0.6], [0, 0.6]], 1.5, { long: "1,5 m" }), "0,36 m² × 1,5 m = 0,54 m³"),
          ),
          micros: ["volume_prisme", "volume_unite"],
        },
        {
          enonce:
            "Deux boîtes cylindriques : la boîte A a $2$ cm de rayon et $8$ cm de haut ; la boîte B a $4$ cm de rayon et $2$ cm de haut.\na) Calculer l'aire de la base de chacune, avec $\\pi$.\nb) Calculer leurs volumes. Laquelle contient le plus ?\nc) Un élève dit : « B a un rayon $2$ fois plus grand mais une hauteur $4$ fois plus petite, donc B contient $2$ fois moins. » Où est l'erreur ?",
          reponses: [
            { question: "a) A", attendu: "4π" },
            { question: "a) B", attendu: "16π" },
            { question: "b) A", attendu: "32π", tolerance: 0.005 },
            { question: "b) B", attendu: "32π", tolerance: 0.005 },
          ],
          correction:
            "a) A : $\\pi \\times 2^2 = 4\\pi$ cm². B : $\\pi \\times 4^2 = 16\\pi$ cm².\nb) A : $V = 4\\pi \\times 8 = 32\\pi$ cm³. B : $V = 16\\pi \\times 2 = 32\\pi$ cm³. Les deux boîtes contiennent exactement autant : $32\\pi \\approx 100{,}53$ cm³.\nc) Le rayon est au CARRÉ dans l'aire du disque : un rayon $2$ fois plus grand donne une base $2 \\times 2 = 4$ fois plus grande, $16\\pi$ contre $4\\pi$. Une base $4$ fois plus grande sur une hauteur $4$ fois plus petite : le volume ne change pas.\n⛔ Le piège : croire que doubler le rayon double la base. Le disque s'élargit dans toutes les directions à la fois.\nRéponse : $4\\pi$ cm² et $16\\pi$ cm² ; le même volume, $32\\pi \\approx 100{,}53$ cm³.",
          schema: ensemble(
            avec(cylindre(2, 8, { r: "r = 2 cm", h: "8 cm" }, { ech: ECH_BOITES }), "A : 4π × 8 = 32π"),
            avec(cylindre(4, 2, { r: "r = 4 cm", h: "2 cm" }, { ech: ECH_BOITES }), "B : 16π × 2 = 32π"),
          ),
          micros: ["volume_cylindre", "volume_comprendre"],
        },
        {
          enonce:
            "Pour une fête, on sert des jus de fruits dans des verres de $25$ cl.\na) Sachant que $1$ L $= 100$ cl et $1$ L $= 1\\,000$ cm³, convertir $25$ cl en L, puis en cm³.\nb) Combien de verres remplit une bouteille de $1{,}5$ L ?\nc) Une fontaine à jus contient $0{,}012$ m³. Combien de verres peut-on servir ?",
          reponses: [
            { question: "a) L", attendu: "0,25", unite: "L" },
            { question: "a) cm³", attendu: "250", unite: "cm³" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "48" },
          ],
          correction:
            "a) $25$ cl $= 25 \\div 100 = 0{,}25$ L. Et $0{,}25 \\times 1\\,000 = 250$ cm³.\nb) $1{,}5$ L $= 1\\,500$ cm³, et $1\\,500 \\div 250 = 6$ verres. Autre chemin : $1{,}5 \\div 0{,}25 = 6$.\nc) $1$ m³ $= 1\\,000$ dm³ $= 1\\,000$ L, donc $0{,}012$ m³ $= 12$ L. Et $12 \\div 0{,}25 = 48$ verres.\n⛔ Le piège : lire $25$ cl comme $25$ cm³. Un centilitre vaut $10$ cm³ : on trouverait $1\\,500 \\div 25 = 60$ verres, dix fois trop.\nRéponse : $0{,}25$ L, soit $250$ cm³ ; $6$ verres ; $48$ verres.",
          schema: avec(chaine(["L", "cl", "mL = cm³"], ["× 100", "× 10"]), "25 cl = 250 mL = 250 cm³"),
          micros: ["volume_unite"],
        },
        {
          enonce:
            "Dans une plaque de carton de $30$ cm sur $20$ cm, on découpe un carré de $4$ cm de côté à chaque coin, puis on replie les bords pour faire une boîte sans couvercle (figure).\na) Quelles sont les dimensions du fond de la boîte ? Sa hauteur ?\nb) Calculer le volume de la boîte.\nc) Avec des carrés de $5$ cm, le volume est-il plus grand ?",
          reponses: [
            { question: "a) fond", attendu: "22 ; 12" },
            { question: "a) h", attendu: "4" },
            { question: "b)", attendu: "1056" },
            { question: "c)", attendu: ["non", "faux"] },
            { question: "c) V", attendu: "1000" },
          ],
          figure: plaque(30, 20, 4, { L: "30 cm", l: "20 cm", c: "4 cm" }),
          correction:
            "a) Chaque bord perd un carré à chacun de ses deux bouts : $30 - 2 \\times 4 = 22$ cm et $20 - 2 \\times 4 = 12$ cm. Le fond mesure $22$ cm sur $12$ cm, et les bords repliés font la hauteur : $4$ cm.\nb) Aire du fond : $22 \\times 12 = 264$ cm². $V = 264 \\times 4 = 1\\,056$ cm³.\nc) Avec $5$ cm : un fond de $30 - 10 = 20$ cm sur $20 - 10 = 10$ cm, et $5$ cm de haut. $V = 20 \\times 10 \\times 5 = 1\\,000$ cm³. C'est un peu moins : la boîte est plus haute, mais son fond a rétréci.\n⛔ Le piège : garder les dimensions de la plaque, $30 \\times 20 \\times 4 = 2\\,400$ cm³. Les coins découpés et les bords repliés ne font plus partie du fond.\nRéponse : un fond de $22$ cm sur $12$ cm, $4$ cm de haut ; $1\\,056$ cm³ ; non, $1\\,000$ cm³ seulement.",
          schema: ensemble(
            avec(plaque(30, 20, 4, { L: "30 cm", l: "20 cm", c: "4 cm", fond: "22 × 12" }), "on plie sur les pointillés"),
            avec(pave(22, 12, 4, { L: "22 cm", l: "12 cm", h: "4 cm" }), "la boîte : 1 056 cm³"),
          ),
          micros: ["volume_pave", "volume_lien_aire"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je trouve le solide caché, je le dessine avec ses mesures, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je modélise : quel solide ? quelle base ? quelle hauteur ? Un solide couché garde sa hauteur entre ses deux bases.",
        "Une base compliquée se découpe en rectangles et en triangles, dont j'additionne les aires.",
        "Je garde $\\pi$ jusqu'au bout, j'arrondis à la fin, et je vérifie que le résultat est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Un bain ou une douche ?",
          enonce:
            "Une baignoire est assimilée à un pavé droit : son fond mesure $1{,}5$ m sur $0{,}6$ m, et on la remplit sur $20$ cm de hauteur. D'après le Centre d'information sur l'eau, une douche de $4$ à $5$ minutes utilise $60$ à $80$ L ; on prend $60$ L.\na) Calculer le volume d'eau du bain en m³, puis en litres.\nb) Combien de douches représente un bain ?\nc) Une famille remplace chaque jour un bain par une douche, pendant un an ($365$ jours). Combien de litres économise-t-elle ? Combien de m³ ?\nd) Toute cette eau est versée dans une pièce de $5$ m sur $4$ m. Quelle hauteur atteindrait-elle ?",
          reponses: [
            { question: "a) m³", attendu: "0,18", unite: "m³" },
            { question: "a) L", attendu: "180", unite: "L" },
            { question: "b)", attendu: "3" },
            { question: "c) L", attendu: "43800", unite: "L" },
            { question: "c) m³", attendu: "43,8", unite: "m³" },
            { question: "d)", attendu: "2,19" },
          ],
          correction:
            "a) Je convertis AVANT de multiplier : $20$ cm $= 0{,}2$ m. $V = 1{,}5 \\times 0{,}6 \\times 0{,}2 = 0{,}18$ m³. Comme $1$ m³ $= 1\\,000$ L : $0{,}18 \\times 1\\,000 = 180$ L.\nb) $180 \\div 60 = 3$ : un bain, c'est trois douches.\nc) Chaque jour : $180 - 60 = 120$ L économisés. En un an : $120 \\times 365 = 43\\,800$ L, soit $43\\,800 \\div 1\\,000 = 43{,}8$ m³.\nd) L'eau formerait un pavé de base $5 \\times 4 = 20$ m². Sa hauteur vaut volume ÷ aire de la base : $43{,}8 \\div 20 = 2{,}19$ m. Presque jusqu'au plafond.\n⛔ Le piège : multiplier sans convertir, $1{,}5 \\times 0{,}6 \\times 20 = 18$ « m³ », soit $18\\,000$ L : cent fois trop, une piscine dans la salle de bain.\nRéponse : $0{,}18$ m³, soit $180$ L ; $3$ douches ; $43\\,800$ L, soit $43{,}8$ m³ par an ; $2{,}19$ m d'eau dans la pièce.",
          schema: ensemble(
            avec(pave(1.5, 0.6, 0.45, { L: "1,5 m", l: "0,6 m" }, { niveau: 0.2 }), "20 cm d'eau : 0,18 m³ = 180 L"),
            avec(pave(5, 4, 2.5, { L: "5 m", l: "4 m", h: "2,5 m", eau: "2,19 m" }, { niveau: 2.19 }), "un an d'économie : 43,8 m³"),
          ),
          micros: ["volume_pave", "volume_unite", "volume_lien_aire", "volume_defi"],
        },
        {
          titre: "La balle ronde de foin",
          enonce:
            "Une balle ronde de foin est un cylindre couché de $1{,}2$ m de diamètre et $1{,}2$ m de large, un format courant.\na) Calculer son volume en m³ : la valeur exacte, puis l'arrondi au millième.\nb) On admet qu'un mètre cube de ce foin pèse $200$ kg. Quelle est la masse de la balle, au kilogramme près ?\nc) Pour la stocker, on la range dans un casier cubique de $1{,}2$ m d'arête. Calculer le volume du casier. Quelle part du casier la balle occupe-t-elle, en pourcentage à l'unité ?",
          reponses: [
            { question: "a) exact", attendu: ["0,432π", "0,432×π", "0,432pi"], exact: true },
            { question: "a) arrondi", attendu: "1,357", tolerance: 0.0005, unite: "m³" },
            { question: "b)", attendu: "271", tolerance: 0.5 },
            { question: "c) V", attendu: "1,728" },
            { question: "c) %", attendu: "79", tolerance: 0.5 },
          ],
          correction:
            "a) Le cylindre est couché : sa base est le disque qu'on voit au bout, sa hauteur est la largeur de la balle, $1{,}2$ m. Rayon : $1{,}2 \\div 2 = 0{,}6$ m. Aire de la base : $\\pi \\times 0{,}6^2 = 0{,}36\\pi$ m². $V = 0{,}36\\pi \\times 1{,}2 = 0{,}432\\pi \\approx 1{,}357$ m³.\nb) $0{,}432\\pi \\times 200 = 86{,}4\\pi \\approx 271$ kg. Je garde $\\pi$ jusqu'au bout.\nc) Casier : $1{,}2 \\times 1{,}2 \\times 1{,}2 = 1{,}728$ m³. Part occupée : $0{,}432\\pi \\div 1{,}728 \\approx 0{,}785$, soit environ $79$ %. Le reste, environ $0{,}371$ m³, c'est l'air des quatre coins.\n⛔ Le piège : mettre le diamètre dans la formule. $\\pi \\times 1{,}2^2 \\times 1{,}2 = 1{,}728\\pi \\approx 5{,}429$ m³ : plus que le casier qui la contient, c'est impossible.\nRéponse : $0{,}432\\pi \\approx 1{,}357$ m³ ; environ $271$ kg ; le casier fait $1{,}728$ m³ et la balle en occupe environ $79$ %.",
          schema: ensemble(
            avec(cylindre(0.6, 1.2, { r: "r = 0,6 m", h: "1,2 m" }, { ech: ECH_FOIN, couche: true }), "la balle : 0,432π ≈ 1,357 m³"),
            avec(pave(1.2, 1.2, 1.2, { L: "1,2 m", l: "1,2 m", h: "1,2 m" }, { ech: ECH_FOIN }), "le casier : 1,728 m³"),
          ),
          micros: ["volume_cylindre", "volume_pave", "volume_defi"],
        },
        {
          titre: "La digue contre la mer",
          enonce:
            "Pour protéger un quartier de la montée de la mer, une commune construit une digue en terre de $1{,}2$ km de long. Sa coupe est un trapèze : $20$ m de large à la base, $5$ m en haut et $6$ m de haut, les deux pentes étant pareilles.\na) Calculer l'aire de la coupe.\nb) Calculer le volume de terre nécessaire, en m³.\nc) Un bassin olympique mesure $50$ m sur $25$ m, avec au moins $2$ m de profondeur. Combien de ces bassins pleins ce volume représente-t-il ?\nd) Un camion-benne transporte $12$ m³ de terre. Combien de trajets faut-il ?",
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "90000", unite: "m³" },
            { question: "c)", attendu: "36" },
            { question: "d)", attendu: "7500" },
          ],
          correction:
            "a) Je découpe le trapèze : un rectangle de $5$ m sur $6$ m au milieu, et deux triangles pareils de chaque côté. Chaque triangle a pour base $(20 - 5) \\div 2 = 7{,}5$ m et pour hauteur $6$ m. Rectangle : $5 \\times 6 = 30$ m². Les deux triangles : $2 \\times 7{,}5 \\times 6 \\div 2 = 45$ m². Coupe : $30 + 45 = 75$ m².\nb) La digue est un prisme droit couché : sa base est la coupe, sa hauteur est sa longueur. Je convertis : $1{,}2$ km $= 1\\,200$ m. $V = 75 \\times 1\\,200 = 90\\,000$ m³.\nc) Un bassin : $50 \\times 25 \\times 2 = 2\\,500$ m³. Et $90\\,000 \\div 2\\,500 = 36$ bassins olympiques.\nd) $90\\,000 \\div 12 = 7\\,500$ trajets.\n⛔ Le piège : oublier de convertir les km, $75 \\times 1{,}2 = 90$ m³. Mille fois trop peu : à peine huit camions pour une digue de plus d'un kilomètre.\nRéponse : $75$ m² ; $90\\,000$ m³ de terre ; $36$ bassins olympiques ; $7\\,500$ trajets de camion.",
          schema: ensemble(
            avec(aPlat([[0, 0], [20, 0], [12.5, 6], [7.5, 6]], { cotes: { 0: "20 m", 2: "5 m" }, hauteurs: [[[7.5, 0], [7.5, 6], "6 m"]] }), "la coupe : 30 + 45 = 75 m²"),
            avec(prisme([[0, 0], [20, 0], [12.5, 6], [7.5, 6]], 1200, { long: "1,2 km" }, { longDessin: 40 }), "la digue (dessin raccourci)"),
          ),
          micros: ["volume_prisme", "volume_pave", "volume_unite", "volume_defi"],
        },
        {
          titre: "L'eau oubliée dans le tuyau",
          enonce:
            "Un tuyau d'arrosage de $25$ m de long a un diamètre intérieur de $15$ mm, une taille courante. L'eau qu'il contient forme un cylindre très long.\na) Donner le rayon intérieur et la longueur du tuyau en cm.\nb) Calculer le volume d'eau dans le tuyau plein, en cm³ (la valeur exacte, puis l'arrondi à l'unité), puis en litres, au dixième.\nc) Quelle longueur de ce tuyau contiendrait exactement un arrosoir de $10$ L ? Arrondir au mètre.",
          reponses: [
            { question: "a) r", attendu: "0,75", unite: "cm" },
            { question: "a) L", attendu: "2500" },
            { question: "b) exact", attendu: ["1406,25π", "1406,25×π", "1406,25pi"], exact: true },
            { question: "b) cm³", attendu: "4418", tolerance: 0.5, unite: "cm³" },
            { question: "b) L", attendu: "4,4", tolerance: 0.05, unite: "L" },
            { question: "c)", attendu: "57", tolerance: 0.5 },
          ],
          correction:
            "a) Rayon : $15 \\div 2 = 7{,}5$ mm, soit $0{,}75$ cm. Longueur : $25$ m $= 2\\,500$ cm. Tout est en cm AVANT le calcul.\nb) Aire de la base, un disque minuscule : $\\pi \\times 0{,}75^2 = 0{,}5625\\pi$ cm². Le tuyau est un cylindre de hauteur $2\\,500$ cm : $V = 0{,}5625\\pi \\times 2\\,500 = 1\\,406{,}25\\pi \\approx 4\\,418$ cm³, soit environ $4{,}4$ L.\nc) $10$ L $= 10\\,000$ cm³. La longueur est le volume divisé par l'aire de la base : $10\\,000 \\div (0{,}5625\\pi) \\approx 5\\,659$ cm, soit environ $57$ m.\n⛔ Le piège : oublier de diviser le diamètre par $2$. Avec $1{,}5$ cm comme rayon, $\\pi \\times 1{,}5^2 \\times 2\\,500 = 5\\,625\\pi \\approx 17\\,671$ cm³, soit $17{,}7$ L : quatre fois trop, puisque le rayon est au carré.\nRéponse : $0{,}75$ cm et $2\\,500$ cm ; $1\\,406{,}25\\pi \\approx 4\\,418$ cm³, environ $4{,}4$ L ; environ $57$ m de tuyau.",
          schema: avec(cylindre(0.75, 2500, { r: "r = 0,75 cm", h: "25 m = 2 500 cm" }, { couche: true, longDessin: 4 }), "le tuyau plein : 4,4 L (dessin raccourci)"),
          micros: ["volume_cylindre", "volume_unite", "volume_lien_aire", "volume_defi"],
        },
      ],
    },
  ],
};
