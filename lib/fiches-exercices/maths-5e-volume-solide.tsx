// ─── Fiche d'exercices : les volumes (5e) — 20 exercices corrigés ───────────────
//
// Lot de 5e du 29/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-volumes.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/volumes.bank.ts`, notionId
// volume_solide : comprendre un volume (cubes unités), pavé droit (L × l × h),
// prisme droit et cylindre (aire de la base × hauteur), assemblage (somme des
// volumes), unités (cm³, dm³, L, m³ ; 1 L = 1 dm³ = 1 000 cm³ ; 1 m³ = 1 000 L),
// défis (remonter à une dimension, comparer, doubler une arête).
// ⛔ LIMITES DE LA 5e : l'aire du disque s'écrit π × rayon × rayon, avec
// π ≈ 3,14 annoncé dans l'énoncé — pas d'exposant ; pas de cône, de pyramide ni
// de boule (4e et 3e) ; aucune conversion d'aire ; « je défais la
// multiplication » plutôt qu'une équation.
// ⛔ Aucun exemple de la fiche de cours de 5e (cubes 4 × 3 × 2, pavé 6 × 4 × 3,
// prisme 15 × 8, cylindre 20 × 6, 12 × 5, 28 × 5, pavé 5 × 3 × 2, l'élève qui
// additionne 5 + 4 + 3), ni des feuilles de 4e voisines.
//
// Les pièges nommés : oublier les cubes cachés (1, 2), additionner les
// dimensions (3), oublier le ÷ 2 du triangle de base (4, 11, 13, 16), chercher
// un rayon quand l'aire de la base est donnée (5), convertir par 10 ou 100 (6),
// « cm³ » lu comme × 3 (7), diviser par une seule dimension (8), enlever des
// litres au lieu d'une hauteur (9), le diamètre pris pour le rayon (10, 19),
// 1 cm³ par cube de 2 cm (12), oublier de convertir avant de diviser par un
// débit (14), ne regarder que la hauteur (15), 0,4 × 0,4 = 1,6 (17), prendre la
// hauteur d'eau au lieu de la montée (18), doubler l'arête = doubler le volume
// (20).
//
// Un seul fait réel : la masse volumique du granite, environ 2,7 g par cm³
// (entre 2,6 et 2,8 selon les roches ; tables de physique-chimie), dite
// « environ » à l'exercice 18. Tout le reste (savon, cale, pot de peinture,
// aquarium, conserve, tente, nichoir, piscine, vases, chocolat, cuve, gâteau)
// est un MODÈLE, à des dimensions vraisemblables.
//
// ⭐ LES DESSINS, tous à l'échelle et cotés, arguments EN CLAIR :
// - `empilement` : des cubes unités en perspective cavalière (la feuille des
//   solides de 4e) — le volume se COMPTE ;
// - `prisme` : un prisme droit en perspective cavalière, sa face de devant
//   extrudée vers l'arrière ; arêtes cachées en pointillés, calculées (une face
//   latérale est vue si sa normale regarde vers la droite ou vers le haut) ;
//   base en orange, niveau d'eau en bleu, cotes en rouge ;
// - `cylindres` : un ou plusieurs cylindres à la même échelle, côte à côte ou
//   empilés, avec rayon ou diamètre, hauteur, aire du fond ;
// - `cubeDecoupe` : un cube découpé en n × n × n petits cubes (le litre).
// 13 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages). Police 14, viewBox de 300 de large au
// plus, AUCUN `min-w` (la zone d'une correction fait ~235 px à 375 px).
//
// Les corrigés sont écrits à la première personne (« je multiplie »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-volume-solide.mjs` —
// les cubes comptés dans le dessin, chaque volume refait depuis les arguments
// du dessin (lacet de la face × profondeur, π r² h), chaque cote relue à
// l'échelle, la mise en page des étiquettes rejouée.
//
// Micro-compétences : volume_comprendre (1, 2, 7, 12, 20), volume_pave (2, 3,
// 8, 9, 14, 18), volume_prisme (4, 11, 13, 16), volume_cylindre (5, 10, 15, 17,
// 19), volume_assemblage (12, 13, 19), volume_unite (6, 9, 10, 11, 14, 17, 18,
// 19, 20), volume_defi (7, 8, 12, 15, 16, 17, 18, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ROUGE = "#dc2626";
const ORANGE_F = "#ea580c";
const ARETE = "#1e3a8a";
const CACHEE = "#64748b";
const ENCRE = "#0f172a";
const FOND = "#dbeafe";
const EAU = "#38bdf8";
const CADRE = "mx-auto w-full max-w-[20rem] print:max-w-[14rem]";
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type P2 = [number, number];
type P3 = [number, number, number];
type Dir = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;
const TAILLE = 14;
const ECART = 5;
const SIGNES: Record<Dir, P2> = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };

/** La boîte d'une étiquette posée à côté du point (x ; y) de l'écran, dans la
 *  direction d. ⭐ Le script de recalcul refait ce calcul (largeur, croisements). */
const boite = (x: number, y: number, t: string, d: Dir) => {
  const w = [...t].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const e = sx !== 0 && sy !== 0 ? ECART * 0.7 : ECART;
  return { cx: x + sx * (e + w / 2), cy: y + sy * (e + TAILLE / 2), w, h: TAILLE };
};

/** Un cadre qui grandit avec ce qu'on y dessine. */
const cadre = () => {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  return {
    inclure(x0: number, y0: number, x1 = x0, y1 = y0) {
      b[0] = Math.min(b[0], x0);
      b[1] = Math.min(b[1], y0);
      b[2] = Math.max(b[2], x1);
      b[3] = Math.max(b[3], y1);
    },
    viewBox: (marge = 6) => `${(b[0] - marge).toFixed(1)} ${(b[1] - marge).toFixed(1)} ${(b[2] - b[0] + 2 * marge).toFixed(1)} ${(b[3] - b[1] + 2 * marge).toFixed(1)}`,
  };
};

const etiquette = (c: ReturnType<typeof cadre>, cle: string, x: number, y: number, t: string, d: Dir, couleur: string) => {
  const bo = boite(x, y, t, d);
  c.inclure(bo.cx - bo.w / 2, bo.cy - bo.h / 2, bo.cx + bo.w / 2, bo.cy + bo.h / 2);
  return (
    <text key={cle} x={bo.cx.toFixed(1)} y={(bo.cy + TAILLE * 0.35).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={couleur} {...halo}>
      {t}
    </text>
  );
};

/** Une cote : le segment [de ; a] (en vraies longueurs), son texte, la direction de l'étiquette. */
type Cote = { de: P3; a: P3; label: string; cote: Dir };

/**
 * Un PRISME DROIT en perspective cavalière (un pavé en est un) : la face de
 * devant `face` (points [x ; z], z vers le haut) est poussée vers l'arrière sur
 * la profondeur `p`. Une face latérale est VUE si sa normale extérieure regarde
 * vers la droite ou vers le haut (nx + nz > 0) ; une arête est cachée (en
 * pointillés) quand toutes ses faces le sont. `base` : la face de devant en
 * orange (la base du prisme). `niveau` : l'eau jusqu'à cette hauteur (face
 * rectangulaire). `traits` : des segments en tirets rouges (une hauteur, une
 * découpe). ⭐ Le script de recalcul relit face, p, cotes et traits.
 */
const prisme = (face: P2[], p: number, o: { base?: boolean; niveau?: number; traits?: [P3, P3][]; cotes?: Cote[] } = {}) => {
  const n = face.length;
  const sens = Math.sign(face.reduce((s, [x, z], i) => s + x * face[(i + 1) % n][1] - face[(i + 1) % n][0] * z, 0));
  const vue = face.map(([x, z], i) => {
    const [x2, z2] = face[(i + 1) % n];
    return sens * (z2 - z) + sens * -(x2 - x) > 1e-9;
  });
  const proj = ([x, y, z]: P3): P2 => [x + K * y, z + K * y];
  const av = (i: number): P3 => [face[i][0], 0, face[i][1]];
  const ar = (i: number): P3 => [face[i][0], p, face[i][1]];
  const pr = [...face.map((_, i) => proj(av(i))), ...face.map((_, i) => proj(ar(i)))];
  const [minX, maxX] = [Math.min(...pr.map((q) => q[0])), Math.max(...pr.map((q) => q[0]))];
  const [minY, maxY] = [Math.min(...pr.map((q) => q[1])), Math.max(...pr.map((q) => q[1]))];
  const e = Math.min(180 / (maxX - minX), 130 / (maxY - minY));
  const ecran = (q: P3): P2 => {
    const [X, Y] = proj(q);
    return [(X - minX) * e, (maxY - Y) * e];
  };
  const pts = (qs: P3[]) => qs.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ");
  const c = cadre();
  c.inclure(0, 0, (maxX - minX) * e, (maxY - minY) * e);
  const dessin: ReactNode[] = [];
  face.forEach((_, i) => {
    const j = (i + 1) % n;
    if (vue[i]) dessin.push(<polygon key={`l${i}`} points={pts([av(i), av(j), ar(j), ar(i)])} fill="#eff6ff" fillOpacity={0.9} stroke="none" />);
  });
  dessin.push(<polygon key="face" points={pts(face.map((_, i) => av(i)))} fill={o.base ? ORANGE_F : FOND} fillOpacity={o.base ? 0.3 : 0.6} stroke="none" />);
  if (o.niveau !== undefined) {
    const xs = face.map((q) => q[0]);
    const [x0, x1, h] = [Math.min(...xs), Math.max(...xs), o.niveau];
    const eau = { fill: EAU, fillOpacity: 0.35, stroke: EAU, strokeWidth: 1.2 };
    dessin.push(
      <polygon key="e1" points={pts([[x0, 0, 0], [x1, 0, 0], [x1, 0, h], [x0, 0, h]])} {...eau} />,
      <polygon key="e2" points={pts([[x0, 0, h], [x1, 0, h], [x1, p, h], [x0, p, h]])} {...eau} />,
      <polygon key="e3" points={pts([[x1, 0, 0], [x1, p, 0], [x1, p, h], [x1, 0, h]])} {...eau} />,
    );
  }
  const aretes: { a: P3; b: P3; vue: boolean }[] = [];
  face.forEach((_, i) => {
    const j = (i + 1) % n;
    aretes.push({ a: av(i), b: av(j), vue: true }, { a: ar(i), b: ar(j), vue: vue[i] }, { a: av(i), b: ar(i), vue: vue[i] || vue[(i - 1 + n) % n] });
  });
  const ligne = (k: string, a: P3, b: P3, props: Record<string, unknown>) => {
    const [[x1, y1], [x2, y2]] = [ecran(a), ecran(b)];
    return <line key={k} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} strokeLinecap="round" {...props} />;
  };
  aretes.forEach((a, i) => (a.vue ? null : dessin.push(ligne(`c${i}`, a.a, a.b, { stroke: CACHEE, strokeWidth: 1.5, strokeDasharray: "5 4" }))));
  aretes.forEach((a, i) => (a.vue ? dessin.push(ligne(`v${i}`, a.a, a.b, { stroke: ARETE, strokeWidth: 2.2 })) : null));
  (o.traits ?? []).forEach(([a, b], i) => dessin.push(ligne(`t${i}`, a, b, { stroke: ROUGE, strokeWidth: 1.8, strokeDasharray: "5 4" })));
  (o.cotes ?? []).forEach((k, i) => {
    const [[x1, y1], [x2, y2]] = [ecran(k.de), ecran(k.a)];
    dessin.push(etiquette(c, `k${i}`, (x1 + x2) / 2, (y1 + y2) / 2, k.label, k.cote, ROUGE));
  });
  return (
    <div className={CADRE}>
      <svg viewBox={c.viewBox()} className="block h-auto w-full" role="img" aria-label={`Prisme droit en perspective cavalière : ${(o.cotes ?? []).map((k) => k.label).join(", ")}`}>
        {dessin}
      </svg>
    </div>
  );
};

/** Un cylindre : rayon r et hauteur h (vraies longueurs). `rayon` ou `diametre` :
 *  le texte de la mesure tracée sur le disque du haut (ou du bas, `mesure: "bas"`) ;
 *  `hauteur` : à droite ; `base` : l'aire du fond, dans le disque du haut ; `nom` : dessous. */
type Cyl = { r: number; h: number; rayon?: string; diametre?: string; hauteur?: string; base?: string; nom?: string; mesure?: "haut" | "bas" };

/**
 * Des CYLINDRES à la même échelle, côte à côte (64 px entre deux) ou EMPILÉS
 * (centrés, le premier en bas). Le disque du fond : moitié arrière en
 * pointillés ; le disque du haut en orange (la base). Ellipses aplaties à 0,3.
 * ⭐ Le script de recalcul relit r, h et les textes, et rejoue la mise en page.
 */
const cylindres = (liste: Cyl[], empile = false) => {
  const ECARTC = 64;
  const R = Math.max(...liste.map((q) => q.r));
  const largeur = empile ? 2 * R : liste.reduce((s, q) => s + 2 * q.r, 0);
  const H = empile ? liste.reduce((s, q) => s + q.h, 0) : Math.max(...liste.map((q) => q.h));
  const e = Math.min((200 - (empile ? 0 : ECARTC * (liste.length - 1))) / largeur, 130 / (H + 0.6 * R));
  const sol = (H + 0.3 * R) * e;
  const c = cadre();
  const dessin: ReactNode[] = [];
  let x = 0;
  let pile = 0;
  liste.forEach((q, i) => {
    const [rx, ry] = [q.r * e, 0.3 * q.r * e];
    const cx = empile ? R * e : x + rx;
    const yb = sol - pile * e;
    const yt = yb - q.h * e;
    if (empile) pile += q.h;
    else x += 2 * rx + ECARTC;
    c.inclure(cx - rx, yt - ry, cx + rx, yb + ry);
    dessin.push(
      <path key={`f${i}`} d={`M ${cx - rx} ${yt} L ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb} L ${cx + rx} ${yt} Z`} fill={FOND} fillOpacity={0.9} stroke="none" />,
      <path key={`b${i}`} d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} fill="none" stroke={CACHEE} strokeWidth={1.5} strokeDasharray="5 4" />,
      <path key={`a${i}`} d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} fill="none" stroke={ARETE} strokeWidth={2.2} />,
      <line key={`g${i}`} x1={cx - rx} y1={yt} x2={cx - rx} y2={yb} stroke={ARETE} strokeWidth={2.2} />,
      <line key={`d${i}`} x1={cx + rx} y1={yt} x2={cx + rx} y2={yb} stroke={ARETE} strokeWidth={2.2} />,
      <ellipse key={`h${i}`} cx={cx} cy={yt} rx={rx} ry={ry} fill={ORANGE_F} fillOpacity={0.25} stroke={ARETE} strokeWidth={2.2} />,
    );
    const texte = q.rayon ?? q.diametre;
    if (texte) {
      const ym = q.mesure === "bas" ? yb : yt;
      dessin.push(
        <line key={`m${i}`} x1={q.rayon ? cx : cx - rx} y1={ym} x2={cx + rx} y2={ym} stroke={ROUGE} strokeWidth={2} />,
        <circle key={`o${i}`} cx={cx} cy={ym} r={2.5} fill={ROUGE} />,
        q.mesure === "bas" ? etiquette(c, `mt${i}`, cx, yb + ry, texte, "b", ROUGE) : etiquette(c, `mt${i}`, cx, yt - ry, texte, "h", ROUGE),
      );
    }
    if (q.hauteur) dessin.push(etiquette(c, `ht${i}`, cx + rx, (yt + yb) / 2, q.hauteur, "d", ROUGE));
    if (q.base) dessin.push(etiquette(c, `bt${i}`, cx, yt - TAILLE / 2 - ECART, q.base, "b", ENCRE));
    if (q.nom) dessin.push(etiquette(c, `nt${i}`, cx, yb + ry + (texte && q.mesure === "bas" ? TAILLE + ECART : 0), q.nom, "b", ENCRE));
  });
  return (
    <div className={CADRE}>
      <svg viewBox={c.viewBox()} className="block h-auto w-full" role="img" aria-label={`Cylindre${liste.length > 1 ? "s" : ""} : ${liste.map((q) => [q.rayon ?? q.diametre, q.hauteur, q.base].filter(Boolean).join(", ")).join(" ; ")}`}>
        {dessin}
      </svg>
    </div>
  );
};

/**
 * Un EMPILEMENT de cubes unités en perspective cavalière (la feuille des
 * solides de 4e) : h[y][x] cubes dans la colonne (x ; y), y = 0 la rangée de
 * DEVANT. Dessiné du fond vers l'avant, du bas vers le haut (l'ordre du peintre).
 * ⭐ Le script de recalcul compte les cubes dans ces tableaux.
 */
const empilement = (h: number[][]) => {
  const u = 24;
  const [ny, nx, nz] = [h.length, h[0].length, Math.max(...h.flat())];
  const P = (x: number, y: number, z: number) => `${((x + K * y) * u).toFixed(1)},${(-(z + K * y) * u).toFixed(1)}`;
  const trait = { stroke: ARETE, strokeWidth: 1.2, strokeLinejoin: "round" as const };
  const cubes: ReactNode[] = [];
  for (let y = ny - 1; y >= 0; y--)
    for (let z = 0; z < nz; z++)
      for (let x = 0; x < nx; x++) {
        if (z >= h[y][x]) continue;
        cubes.push(
          <g key={`${x}-${y}-${z}`}>
            <polygon points={`${P(x, y, z)} ${P(x + 1, y, z)} ${P(x + 1, y, z + 1)} ${P(x, y, z + 1)}`} fill="#bfdbfe" {...trait} />
            <polygon points={`${P(x, y, z + 1)} ${P(x + 1, y, z + 1)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}`} fill="#eff6ff" {...trait} />
            <polygon points={`${P(x + 1, y, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x + 1, y, z + 1)}`} fill="#93c5fd" {...trait} />
          </g>,
        );
      }
  const W = (nx + K * ny) * u;
  const H = (nz + K * ny) * u;
  return (
    <svg viewBox={`-3 ${(-H - 3).toFixed(1)} ${(W + 6).toFixed(1)} ${(H + 6).toFixed(1)}`} role="img" aria-label={`Empilement de ${h.flat().reduce((s, k) => s + k, 0)} cubes`} className="mx-auto block h-auto w-full max-w-[12rem] print:max-w-[9rem]">
      {cubes}
    </svg>
  );
};

/** Un cube découpé en n × n × n petits cubes, en perspective cavalière :
 *  `arete` sous la face de devant, les lignes de `droite` à côté. */
const cubeDecoupe = (n: number, arete: string, droite: string[]) => {
  const [x0, cote, fuite] = [16, 90, 45];
  const yb = cote + fuite + 12;
  const [s, d] = [cote / n, fuite / n];
  const pts = (...q: P2[]) => q.map(([a, b]) => `${a},${b}`).join(" ");
  const traits: [number, number, number, number][] = [];
  for (let k = 1; k < n; k++) {
    traits.push([x0 + k * s, yb - cote, x0 + k * s, yb], [x0, yb - k * s, x0 + cote, yb - k * s]);
    traits.push([x0 + k * s, yb - cote, x0 + k * s + fuite, yb - cote - fuite], [x0 + k * d, yb - cote - k * d, x0 + cote + k * d, yb - cote - k * d]);
    traits.push([x0 + cote + k * d, yb - k * d, x0 + cote + k * d, yb - cote - k * d], [x0 + cote, yb - k * s, x0 + cote + fuite, yb - k * s - fuite]);
  }
  const tx = x0 + cote + fuite + 10;
  const larg = Math.max(tx + Math.max(...droite.map((t) => [...t].length)) * TAILLE * 0.6, x0 + cote / 2 + ([...arete].length * TAILLE * 0.6) / 2) + 6;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${larg.toFixed(0)} ${yb + 26}`} className="block h-auto w-full" role="img" aria-label={`Un cube de ${arete} d'arête découpé en ${n * n * n} petits cubes`}>
        <polygon points={pts([x0, yb], [x0 + cote, yb], [x0 + cote, yb - cote], [x0, yb - cote])} fill="#bfdbfe" stroke={ARETE} strokeWidth={2} />
        <polygon points={pts([x0, yb - cote], [x0 + cote, yb - cote], [x0 + cote + fuite, yb - cote - fuite], [x0 + fuite, yb - cote - fuite])} fill="#eff6ff" stroke={ARETE} strokeWidth={2} />
        <polygon points={pts([x0 + cote, yb], [x0 + cote + fuite, yb - fuite], [x0 + cote + fuite, yb - cote - fuite], [x0 + cote, yb - cote])} fill="#93c5fd" stroke={ARETE} strokeWidth={2} />
        {traits.map(([a, b, c2, e], i) => (
          <line key={i} x1={a.toFixed(1)} y1={b.toFixed(1)} x2={c2.toFixed(1)} y2={e.toFixed(1)} stroke={ARETE} strokeWidth={0.8} />
        ))}
        <text x={x0 + cote / 2} y={yb + 19} fontSize={TAILLE} fontWeight={900} textAnchor="middle" fill={ROUGE}>
          {arete}
        </text>
        {droite.map((t, i) => (
          <text key={t} x={tx} y={yb - cote + 10 + i * 22} fontSize={TAILLE} fontWeight={900} fill={ENCRE}>
            {t}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const exercicesVolumeSolide5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Vingt exercices, du geste seul au problème : compter des cubes, même cachés, calculer le volume d'un pavé droit, d'un prisme droit et d'un cylindre (aire de la base × hauteur), additionner les volumes d'un assemblage, passer des cm³ aux litres et aux m³, remonter du volume à une longueur. Un aquarium, une tente, un nichoir, une piscine, une cuve d'eau de pluie, un galet plongé dans l'eau, un gâteau à étages. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le solide dessiné en perspective, coté.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/volume-solide", titre: "Les volumes" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice. Je repère la base et la hauteur du solide, je multiplie, et j'écris l'unité de volume.",
      rappel: [
        "Un volume mesure la place occupée : le nombre de cubes unités qui remplissent le solide. Il s'écrit en cm³, dm³ ou m³.",
        "Pavé droit : longueur × largeur × hauteur. Prisme droit et cylindre : aire de la base × hauteur.",
        "La base d'un prisme est un polygone (souvent un triangle) ; celle d'un cylindre est un disque, d'aire π × rayon × rayon, avec π ≈ 3,14.",
        "1 L = 1 dm³ = 1 000 cm³, et 1 m³ = 1 000 L.",
      ],
      exercices: [
        {
          enonce:
            "Ce solide est fait de cubes de $1$ cm d'arête, posés les uns sur les autres. Aucun cube ne flotte : sous chaque cube, il y a un autre cube ou la table.\na) Combien de cubes y a-t-il ?\nb) Quel est le volume du solide ?",
          figure: empilement([
            [2, 1, 1],
            [3, 2, 1],
          ]),
          correction:
            "Un volume, c'est le nombre de cubes unités qui remplissent le solide. Un cube de $1$ cm d'arête a un volume de $1$ cm³.\nJe compte pile par pile, en regardant le dessus de chaque pile.\nRangée de devant, de gauche à droite : $2$, $1$ et $1$ cubes, soit $4$.\nRangée de derrière : $3$, $2$ et $1$ cubes, soit $6$.\nEn tout : $4 + 6 = 10$ cubes.\na) Il y a $10$ cubes.\nb) Le volume du solide est $10$ cm³.\n⛔ Le piège : ne compter que les cubes qu'on voit. Les cubes du bas de la rangée de derrière sont cachés, mais ils portent ceux du dessus : ils comptent.\nRéponse : $10$ cubes, un volume de $10$ cm³.",
          micros: ["volume_comprendre"],
        },
        {
          enonce:
            "Ce pavé droit est rempli de cubes de $1$ cm d'arête.\na) Combien de cubes y a-t-il dans la couche du bas ?\nb) Combien y a-t-il de couches ?\nc) Quel est le volume du pavé ? Retrouve-le avec la formule longueur × largeur × hauteur.",
          figure: empilement([
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
          ]),
          correction:
            "a) La couche du bas a $4$ cubes en longueur et $3$ cubes en profondeur : $4 \\times 3 = 12$ cubes.\nb) Il y a $3$ couches, l'une sur l'autre.\nc) $3$ couches de $12$ cubes : $12 \\times 3 = 36$ cubes, soit $36$ cm³.\nAvec la formule : $4 \\times 3 \\times 3 = 36$ cm³. C'est le même calcul : la longueur fois la largeur compte une couche, la hauteur compte les couches.\n⛔ Le piège : ne compter que les faces qu'on voit, devant, dessus et à droite. Le pavé est plein : l'intérieur aussi est fait de cubes.\nRéponse : $12$ cubes par couche, $3$ couches, un volume de $36$ cm³.",
          micros: ["volume_comprendre", "volume_pave"],
        },
        {
          enonce: "Un savon a la forme d'un pavé droit de $8$ cm de long, $5$ cm de large et $2{,}5$ cm d'épaisseur. Calcule son volume.",
          figure: prisme([[0, 0], [8, 0], [8, 2.5], [0, 2.5]], 5, {
            cotes: [
              { de: [0, 0, 0], a: [8, 0, 0], label: "8 cm", cote: "b" },
              { de: [0, 0, 0], a: [0, 0, 2.5], label: "2,5 cm", cote: "g" },
              { de: [8, 0, 0], a: [8, 5, 0], label: "5 cm", cote: "bd" },
            ],
          }),
          correction:
            "Le volume d'un pavé droit est longueur × largeur × hauteur : je MULTIPLIE les trois dimensions.\n$8 \\times 5 = 40$ : c'est l'aire du dessous, $40$ cm², soit $40$ cubes dans une couche de $1$ cm d'épaisseur.\n$40 \\times 2{,}5 = 100$ cm³.\n⛔ Le piège : additionner les dimensions, $8 + 5 + 2{,}5 = 15{,}5$. Une somme de longueurs est encore une longueur, pas un volume.\nRéponse : le savon a un volume de $100$ cm³.",
          micros: ["volume_pave"],
        },
        {
          enonce:
            "Une cale de porte en bois est un prisme droit. Sa base est un triangle rectangle (en orange) : ses côtés de l'angle droit mesurent $8$ cm et $3$ cm. La cale a une largeur de $4$ cm. Calcule son volume.",
          figure: prisme([[0, 0], [8, 0], [0, 3]], 4, {
            base: true,
            cotes: [
              { de: [0, 0, 0], a: [8, 0, 0], label: "8 cm", cote: "b" },
              { de: [0, 0, 0], a: [0, 0, 3], label: "3 cm", cote: "g" },
              { de: [8, 0, 0], a: [8, 4, 0], label: "4 cm", cote: "bd" },
            ],
          }),
          correction:
            "Le volume d'un prisme droit est aire de la base × hauteur du prisme. Ici, la base est le triangle orange, et la « hauteur » du prisme est la largeur de la cale, $4$ cm : la distance entre les deux triangles.\nL'aire du triangle : $8 \\times 3 \\div 2 = 24 \\div 2 = 12$ cm².\nLe volume : $12 \\times 4 = 48$ cm³.\n⛔ Le piège : calculer $8 \\times 3 \\times 4 = 96$ cm³. C'est le volume du pavé entier ; la cale n'en est que la moitié, coupée en biais.\nRéponse : la cale a un volume de $48$ cm³.",
          micros: ["volume_prisme"],
        },
        {
          enonce: "Un pot de peinture a la forme d'un cylindre. L'aire de son fond est $45$ cm², et sa hauteur $12$ cm. Calcule son volume.",
          figure: cylindres([{ r: 3.8, h: 12, base: "45 cm²", hauteur: "12 cm" }]),
          correction:
            "Le volume d'un cylindre se calcule comme celui d'un prisme : aire de la base × hauteur.\nLa base est le disque du fond : son aire est donnée, $45$ cm².\n$45 \\times 12 = 540$ cm³.\n⭐ C'est comme empiler $12$ tranches de $1$ cm d'épaisseur, de $45$ cm³ chacune.\n⛔ Le piège : chercher un rayon qu'on n'a pas. L'aire de la base est déjà là : il suffit de la multiplier par la hauteur.\nRéponse : le pot a un volume de $540$ cm³.",
          micros: ["volume_cylindre"],
        },
        {
          enonce: "Complète.\na) $3$ L $=$ … dm³ $=$ … cm³\nb) $2{,}5$ m³ $=$ … L\nc) $750$ cm³ $=$ … L\nd) $4\\,500$ L $=$ … m³",
          correction:
            "Les trois égalités à connaître : $1$ L $= 1$ dm³ ; $1$ dm³ $= 1\\,000$ cm³ ; $1$ m³ $= 1\\,000$ L.\nPourquoi $1\\,000$ ? Un cube de $1$ dm d'arête mesure $10$ cm sur $10$ cm sur $10$ cm : $10 \\times 10 \\times 10 = 1\\,000$ petits cubes de $1$ cm³.\na) $3$ L $= 3$ dm³ $= 3 \\times 1\\,000 = 3\\,000$ cm³.\nb) $2{,}5$ m³ $= 2{,}5 \\times 1\\,000 = 2\\,500$ L.\nc) $750$ cm³ $= 750 \\div 1\\,000 = 0{,}75$ L : un peu moins d'un litre, c'est normal.\nd) $4\\,500$ L $= 4\\,500 \\div 1\\,000 = 4{,}5$ m³.\n⛔ Le piège : multiplier par $10$ ou par $100$, comme pour les longueurs ou les aires. Pour les volumes, on passe d'une unité à la suivante en multipliant par $1\\,000$.\nRéponse : a) $3$ dm³ et $3\\,000$ cm³ ; b) $2\\,500$ L ; c) $0{,}75$ L ; d) $4{,}5$ m³.",
          schema: ecranSeulement(cubeDecoupe(10, "10 cm = 1 dm", ["10 × 10 × 10", "= 1 000 cm³", "= 1 dm³ = 1 L"])),
          micros: ["volume_unite"],
        },
        {
          enonce:
            "Recopie chaque phrase avec la bonne unité : cm, cm² ou cm³.\na) Le volume d'un gros dé à jouer : $8$ …\nb) L'aire d'une carte à jouer : $54$ …\nc) Le tour d'un timbre : $12$ …\nd) La contenance d'une tasse : $250$ …\ne) Le dé du a) est un cube de $2$ cm d'arête. Léo calcule son volume : $2 \\times 3 = 6$ cm³. Qu'en penses-tu ?",
          correction:
            "Une longueur se mesure en cm, une aire en cm² (des carrés), un volume en cm³ (des cubes).\na) Un volume : $8$ cm³.\nb) Une aire, une surface plate : $54$ cm².\nc) Le tour, c'est une longueur : $12$ cm.\nd) Une contenance, c'est un volume : $250$ cm³.\ne) Léo a multiplié l'arête par $3$. Il faut multiplier trois longueurs : longueur × largeur × hauteur.\n$2 \\times 2 \\times 2 = 8$ cm³ : on retrouve bien les $8$ cm³ du a). Le dessin montre les $8$ petits cubes.\n⛔ Le piège : $2 \\times 3$. Le « 3 » de cm³ dit qu'on multiplie trois longueurs, pas qu'on multiplie par $3$.\nRéponse : a) cm³ ; b) cm² ; c) cm ; d) cm³ ; e) Léo se trompe, le volume est $8$ cm³.",
          schema: ecranSeulement(
            empilement([
              [2, 2],
              [2, 2],
            ]),
          ),
          micros: ["volume_comprendre", "volume_defi"],
        },
        {
          enonce: "Une boîte en forme de pavé droit a un fond rectangulaire de $9$ cm sur $4$ cm. Son volume est $180$ cm³. Quelle est sa hauteur ?",
          correction:
            "Volume du pavé = aire du fond × hauteur. Je calcule d'abord l'aire du fond : $9 \\times 4 = 36$ cm².\nDonc $36 \\times$ hauteur $= 180$. Je défais la multiplication : $180 \\div 36 = 5$.\nContrôle : $9 \\times 4 \\times 5 = 180$ cm³.\n⛔ Le piège : diviser par une seule dimension, $180 \\div 9 = 20$ cm. Il faut diviser par l'aire du fond, $36$ cm².\nRéponse : la boîte a une hauteur de $5$ cm.",
          schema: ecranSeulement(
            prisme([[0, 0], [9, 0], [9, 5], [0, 5]], 4, {
              cotes: [
                { de: [0, 0, 0], a: [9, 0, 0], label: "9 cm", cote: "b" },
                { de: [0, 0, 0], a: [0, 0, 5], label: "? = 5 cm", cote: "g" },
                { de: [9, 0, 0], a: [9, 4, 0], label: "4 cm", cote: "bd" },
              ],
            }),
          ),
          micros: ["volume_pave", "volume_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même solide. Je repère sa base, je calcule son aire, puis le volume, et je convertis à la fin.",
      rappel: [
        "Prisme droit ou cylindre : je calcule d'abord l'aire de la base, puis je multiplie par la hauteur du solide.",
        "Le rayon est la moitié du diamètre. Aire du disque : π × rayon × rayon.",
        "Un assemblage : j'additionne les volumes des morceaux.",
        "De cm³ à L : je divise par 1 000. De m³ à L : je multiplie par 1 000.",
      ],
      exercices: [
        {
          enonce:
            "Un aquarium a la forme d'un pavé droit : $60$ cm de long, $30$ cm de large et $40$ cm de haut (mesures intérieures).\na) Calcule son volume en cm³, puis en litres.\nb) On le remplit d'eau jusqu'à $5$ cm du bord. Quel volume d'eau contient-il, en litres ?\nc) On le remplit avec un seau de $9$ L. Combien de seaux faut-il ?",
          figure: prisme([[0, 0], [60, 0], [60, 40], [0, 40]], 30, {
            niveau: 35,
            cotes: [
              { de: [0, 0, 0], a: [60, 0, 0], label: "60 cm", cote: "b" },
              { de: [0, 0, 0], a: [0, 0, 40], label: "40 cm", cote: "g" },
              { de: [60, 0, 0], a: [60, 30, 0], label: "30 cm", cote: "bd" },
            ],
          }),
          correction:
            "a) $60 \\times 30 \\times 40 = 72\\,000$ cm³.\nDans $1$ L, il y a $1\\,000$ cm³ : $72\\,000 \\div 1\\,000 = 72$ L.\nb) L'eau forme elle aussi un pavé, de même fond mais moins haut : $40 - 5 = 35$ cm.\n$60 \\times 30 \\times 35 = 63\\,000$ cm³, soit $63$ L.\nc) $63 \\div 9 = 7$ seaux.\n⛔ Le piège du b) : enlever $5$ L au lieu de $5$ cm de hauteur. Les $5$ cm vides du haut forment une couche de $60 \\times 30 \\times 5 = 9\\,000$ cm³, soit $9$ L : $72 - 9 = 63$ L, on retombe juste.\nRéponse : a) $72\\,000$ cm³, soit $72$ L ; b) $63$ L ; c) $7$ seaux.",
          micros: ["volume_pave", "volume_unite"],
        },
        {
          enonce:
            "Une boîte de conserve est un cylindre de $8$ cm de diamètre et de $11$ cm de haut. On prend $\\pi \\approx 3{,}14$.\na) Calcule l'aire du fond.\nb) Calcule le volume de la boîte, puis arrondis-le au cm³.\nc) La boîte peut-elle contenir un demi-litre de soupe ?",
          figure: cylindres([{ r: 4, h: 11, diametre: "8 cm", hauteur: "11 cm" }]),
          correction:
            "a) Le fond est un disque. Son rayon est la moitié du diamètre : $8 \\div 2 = 4$ cm.\nAire d'un disque : $\\pi \\times$ rayon $\\times$ rayon, soit environ $3{,}14 \\times 4 \\times 4 = 50{,}24$ cm².\nb) Volume = aire du fond × hauteur : $50{,}24 \\times 11 = 552{,}64$ cm³, soit environ $553$ cm³.\nc) Un demi-litre, c'est $1\\,000 \\div 2 = 500$ cm³. Or $553 > 500$ : oui, la boîte peut contenir un demi-litre.\n⛔ Le piège : prendre le diamètre pour le rayon, $3{,}14 \\times 8 \\times 8 \\times 11 = 2\\,210{,}56$ cm³. On trouve quatre fois trop : plus de $2$ litres dans une boîte de conserve !\nRéponse : a) environ $50{,}24$ cm² ; b) environ $553$ cm³ ; c) oui.",
          micros: ["volume_cylindre", "volume_unite"],
        },
        {
          enonce:
            "Une tente a la forme d'un prisme droit couché. Sa base est un triangle (en orange) de $1{,}6$ m de large au sol et de $1{,}2$ m de haut. La tente mesure $2$ m de long.\na) Calcule l'aire du triangle.\nb) Calcule le volume de la tente en m³, puis en litres.\nc) Le modèle pour trois personnes a le même triangle, mais il mesure $3$ m de long. Quel est son volume ?",
          figure: prisme([[0, 0], [1.6, 0], [0.8, 1.2]], 2, {
            base: true,
            traits: [[[0.8, 0, 0], [0.8, 0, 1.2]]],
            cotes: [
              { de: [0, 0, 0], a: [1.6, 0, 0], label: "1,6 m", cote: "b" },
              { de: [0.8, 0, 0], a: [0.8, 0, 1.2], label: "1,2 m", cote: "g" },
              { de: [1.6, 0, 0], a: [1.6, 2, 0], label: "2 m", cote: "bd" },
            ],
          }),
          correction:
            "a) $1{,}6 \\times 1{,}2 \\div 2 = 1{,}92 \\div 2 = 0{,}96$ m².\nb) La base du prisme est le triangle, et la « hauteur » du prisme est la longueur de la tente, $2$ m : la distance entre les deux triangles.\n$0{,}96 \\times 2 = 1{,}92$ m³.\n$1$ m³ $= 1\\,000$ L, donc $1{,}92$ m³ $= 1\\,920$ L.\nc) Même base, longueur $3$ m : $0{,}96 \\times 3 = 2{,}88$ m³.\n⛔ Le piège : oublier le ÷ 2 du triangle, et trouver $1{,}6 \\times 1{,}2 \\times 2 = 3{,}84$ m³, le volume d'une boîte deux fois trop grande.\nRéponse : a) $0{,}96$ m² ; b) $1{,}92$ m³, soit $1\\,920$ L ; c) $2{,}88$ m³.",
          micros: ["volume_prisme", "volume_unite"],
        },
        {
          enonce:
            "Cet escalier est fait de cubes en bois de $2$ cm d'arête, collés entre eux. Aucun cube ne flotte.\na) Combien de cubes y a-t-il ?\nb) Quel est le volume d'un cube ?\nc) Quel est le volume de l'escalier ?\nd) Quelle est la hauteur de l'escalier ?",
          figure: empilement([
            [1, 2, 3],
            [1, 2, 3],
          ]),
          correction:
            "a) Je compte pile par pile. Devant : $1 + 2 + 3 = 6$ cubes. Derrière, la même chose : $6$ cubes. En tout : $6 + 6 = 12$ cubes.\nb) Un cube de $2$ cm d'arête : $2 \\times 2 \\times 2 = 8$ cm³.\nc) Le volume d'un assemblage est la somme des volumes de ses morceaux : $12 \\times 8 = 96$ cm³.\nd) La plus haute marche a $3$ cubes : $3 \\times 2 = 6$ cm.\n⛔ Le piège : compter $1$ cm³ par cube, et répondre $12$ cm³. Un cube de $2$ cm d'arête contient $8$ cubes de $1$ cm.\nRéponse : $12$ cubes de $8$ cm³, soit $96$ cm³ ; $6$ cm de haut.",
          micros: ["volume_assemblage", "volume_comprendre", "volume_defi"],
        },
        {
          enonce:
            "Un nichoir à oiseaux est formé d'un pavé droit surmonté d'un toit en prisme droit. Vu de face, c'est une « maison » : $24$ cm de large, des murs de $25$ cm, et le haut du toit à $9$ cm au-dessus des murs. Le nichoir mesure $20$ cm de profondeur.\na) Calcule le volume de la partie pavé.\nb) Calcule le volume du toit.\nc) Déduis-en le volume du nichoir, en cm³ puis en litres.",
          figure: prisme([[0, 0], [24, 0], [24, 25], [12, 34], [0, 25]], 20, {
            traits: [
              [[0, 0, 25], [24, 0, 25]],
              [[12, 0, 25], [12, 0, 34]],
            ],
            cotes: [
              { de: [0, 0, 0], a: [24, 0, 0], label: "24 cm", cote: "b" },
              { de: [0, 0, 0], a: [0, 0, 25], label: "25 cm", cote: "g" },
              { de: [12, 0, 25], a: [12, 0, 34], label: "9 cm", cote: "g" },
              { de: [24, 0, 0], a: [24, 20, 0], label: "20 cm", cote: "bd" },
            ],
          }),
          correction:
            "a) Le pavé : $24 \\times 25 \\times 20 = 12\\,000$ cm³.\nb) Le toit est un prisme droit. Sa base est le triangle de devant, de base $24$ cm et de hauteur $9$ cm ; sa « hauteur » de prisme est la profondeur, $20$ cm.\nL'aire du triangle : $24 \\times 9 \\div 2 = 216 \\div 2 = 108$ cm². Le volume du toit : $108 \\times 20 = 2\\,160$ cm³.\nc) Le volume d'un assemblage est la somme des volumes : $12\\,000 + 2\\,160 = 14\\,160$ cm³.\nEn litres : $14\\,160 \\div 1\\,000 = 14{,}16$ L.\n⭐ Autre chemin : tout le nichoir est UN prisme, dont la base est la « maison » de devant. Son aire : $600 + 108 = 708$ cm², et $708 \\times 20 = 14\\,160$ cm³. Les deux chemins se rejoignent.\n⛔ Le piège : oublier le ÷ 2 du toit, et compter un toit de $4\\,320$ cm³.\nRéponse : $12\\,000$ cm³ ; $2\\,160$ cm³ ; $14\\,160$ cm³, soit $14{,}16$ L.",
          micros: ["volume_assemblage", "volume_prisme"],
        },
        {
          enonce:
            "Une piscine a la forme d'un pavé droit de $10$ m de long, $4$ m de large et $1{,}5$ m de profondeur.\na) Calcule son volume en m³.\nb) Combien de litres d'eau faut-il pour la remplir ?\nc) Un tuyau d'arrosage débite $15$ L par minute. Combien de minutes faut-il pour la remplir ? Et combien d'heures, environ ?",
          correction:
            "a) $10 \\times 4 \\times 1{,}5 = 40 \\times 1{,}5 = 60$ m³.\nb) $1$ m³ $= 1\\,000$ L, donc $60$ m³ $= 60\\,000$ L.\nc) Chaque minute apporte $15$ L : $60\\,000 \\div 15 = 4\\,000$ minutes.\nUne heure a $60$ minutes : $4\\,000 \\div 60 \\approx 66{,}7$ heures, presque trois jours sans s'arrêter.\n⛔ Le piège : diviser les m³ par $15$, $60 \\div 15 = 4$ minutes. Le débit est en litres : il faut d'abord convertir les m³ en litres.\nRéponse : $60$ m³, soit $60\\,000$ L ; $4\\,000$ minutes, environ $67$ heures.",
          schema: ecranSeulement(
            prisme([[0, 0], [10, 0], [10, 1.5], [0, 1.5]], 4, {
              niveau: 1.5,
              cotes: [
                { de: [0, 0, 0], a: [10, 0, 0], label: "10 m", cote: "b" },
                { de: [0, 0, 0], a: [0, 0, 1.5], label: "1,5 m", cote: "g" },
                { de: [10, 0, 0], a: [10, 4, 0], label: "4 m", cote: "bd" },
              ],
            }),
          ),
          micros: ["volume_pave", "volume_unite"],
        },
        {
          enonce:
            "Deux vases cylindriques. Le vase A a un rayon de $3$ cm et une hauteur de $10$ cm. Le vase B a un rayon de $4$ cm et une hauteur de $6$ cm. On prend $\\pi \\approx 3{,}14$.\na) Sans calculer, lequel semble le plus grand ?\nb) Calcule le volume de chaque vase.\nc) Lequel contient le plus d'eau ? De combien ?",
          figure: cylindres([
            { r: 3, h: 10, rayon: "3 cm", hauteur: "10 cm", nom: "A" },
            { r: 4, h: 6, rayon: "4 cm", hauteur: "6 cm", nom: "B" },
          ]),
          correction:
            "a) A est plus haut : on a envie de dire A. Mais B est plus large, et le rayon compte deux fois dans l'aire du fond.\nb) A : aire du fond $3{,}14 \\times 3 \\times 3 = 28{,}26$ cm², volume $28{,}26 \\times 10 = 282{,}6$ cm³.\nB : aire du fond $3{,}14 \\times 4 \\times 4 = 50{,}24$ cm², volume $50{,}24 \\times 6 = 301{,}44$ cm³.\nc) $301{,}44 > 282{,}6$ : c'est B qui contient le plus, de $301{,}44 - 282{,}6 = 18{,}84$ cm³.\n⛔ Le piège : ne regarder que la hauteur. Le rayon est multiplié deux fois (rayon × rayon) : un rayon un peu plus grand pèse lourd.\nRéponse : B contient environ $301$ cm³, contre $283$ cm³ pour A : environ $19$ cm³ de plus.",
          micros: ["volume_cylindre", "volume_defi"],
        },
        {
          enonce:
            "Une barre de chocolat a la forme d'un prisme droit. Sa base est un triangle de $4$ cm de côté à la base et de $3$ cm de hauteur. Son volume est $126$ cm³.\na) Calcule l'aire du triangle.\nb) Quelle est la longueur de la barre ?\nc) La barre est partagée en $7$ morceaux identiques. Quel est le volume d'un morceau ? Et sa longueur ?",
          correction:
            "a) $4 \\times 3 \\div 2 = 12 \\div 2 = 6$ cm².\nb) Volume = aire de la base × longueur, donc $6 \\times$ longueur $= 126$. Je défais la multiplication : $126 \\div 6 = 21$ cm.\nc) $126 \\div 7 = 18$ cm³ par morceau. Chaque morceau garde la même base de $6$ cm² : sa longueur est $18 \\div 6 = 3$ cm. Et $21 \\div 7 = 3$ cm aussi.\n⛔ Le piège du b) : diviser le volume par $4 \\times 3 = 12$, en oubliant le ÷ 2. On trouverait $10{,}5$ cm, une barre deux fois trop courte.\nRéponse : a) $6$ cm² ; b) $21$ cm ; c) $18$ cm³ et $3$ cm par morceau.",
          schema: ecranSeulement(
            prisme([[0, 0], [4, 0], [2, 3]], 21, {
              base: true,
              traits: [[[2, 0, 0], [2, 0, 3]]],
              cotes: [
                { de: [0, 0, 0], a: [4, 0, 0], label: "4 cm", cote: "b" },
                { de: [2, 0, 0], a: [2, 0, 3], label: "3 cm", cote: "g" },
                { de: [4, 0, 0], a: [4, 21, 0], label: "? = 21 cm", cote: "d" },
              ],
            }),
          ),
          micros: ["volume_prisme", "volume_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je dessine le solide, je calcule son volume, je convertis, puis je réponds par une phrase.",
      rappel: [
        "Je repère le solide : pavé, prisme ou cylindre, ou un assemblage de plusieurs.",
        "Je garde la même unité de longueur dans tout le calcul, puis je convertis le volume à la fin.",
        "Un liquide prend la forme de son récipient : le volume d'eau se calcule comme celui d'un solide.",
      ],
      exercices: [
        {
          titre: "Le récupérateur d'eau de pluie",
          enonce:
            "Une cuve de récupération d'eau de pluie est un cylindre de $0{,}4$ m de rayon et de $1$ m de haut. On prend $\\pi \\approx 3{,}14$.\na) Calcule l'aire du fond de la cuve, en m².\nb) Calcule le volume de la cuve en m³, puis en litres.\nc) La cuve contient déjà $100$ L. Un orage y envoie $450$ L. Va-t-elle déborder ? De combien de litres ?\nd) Une fois la cuve pleine, combien d'arrosoirs de $10$ L peut-on remplir entièrement ?",
          figure: cylindres([{ r: 0.4, h: 1, rayon: "0,4 m", hauteur: "1 m" }]),
          correction:
            "a) Aire du disque : $\\pi \\times$ rayon $\\times$ rayon, soit environ $3{,}14 \\times 0{,}4 \\times 0{,}4$. Or $0{,}4 \\times 0{,}4 = 0{,}16$, donc l'aire vaut environ $3{,}14 \\times 0{,}16 = 0{,}5024$ m².\nb) Volume : $0{,}5024 \\times 1 = 0{,}5024$ m³. Et $1$ m³ $= 1\\,000$ L, donc la cuve contient environ $502{,}4$ L.\nc) $100 + 450 = 550$ L arrivent dans la cuve. Or $550 > 502{,}4$ : elle déborde, d'environ $550 - 502{,}4 = 47{,}6$ L.\nd) $502{,}4 \\div 10 = 50{,}24$ : on remplit $50$ arrosoirs entiers, et il reste un fond.\n⛔ Le piège : calculer $0{,}4 \\times 0{,}4 = 1{,}6$. Des dixièmes fois des dixièmes donnent des centièmes : $0{,}16$.\nRéponse : a) environ $0{,}5024$ m² ; b) environ $0{,}5$ m³, soit $502{,}4$ L ; c) oui, d'environ $48$ L ; d) $50$ arrosoirs.",
          micros: ["volume_cylindre", "volume_unite", "volume_defi"],
        },
        {
          titre: "Le galet dans l'aquarium",
          enonce:
            "Pour mesurer le volume d'un galet, Inès le plonge dans un aquarium. Le fond de l'aquarium est un rectangle de $40$ cm sur $25$ cm. Quand le galet est au fond, l'eau monte de $0{,}5$ cm.\na) Quel est le volume de l'eau « poussée » par le galet ? C'est le volume du galet.\nb) Écris ce volume en litres.\nc) Ce galet est en granite : $1$ cm³ de granite pèse environ $2{,}7$ g. Quelle est sa masse ?\nd) Au départ, sans galet, l'eau est à $30$ cm de haut, et l'aquarium mesure $32$ cm de haut. Combien de galets identiques peut-on y plonger en tout sans que l'eau dépasse le bord ?",
          correction:
            "a) L'eau qui monte forme une couche en forme de pavé : même fond que l'aquarium, $0{,}5$ cm d'épaisseur.\n$40 \\times 25 \\times 0{,}5 = 1\\,000 \\times 0{,}5 = 500$ cm³. Le galet a un volume de $500$ cm³.\nb) $500 \\div 1\\,000 = 0{,}5$ L : un demi-litre.\nc) $500 \\times 2{,}7 = 1\\,350$ g, soit environ $1{,}35$ kg.\nd) Il reste $32 - 30 = 2$ cm avant le bord. Chaque galet fait monter l'eau de $0{,}5$ cm : $2 \\div 0{,}5 = 4$ galets. Avec $4$ galets, l'eau arrive juste au bord ; un cinquième la ferait déborder.\n⛔ Le piège : prendre la hauteur de l'eau, $30$ cm, au lieu de la montée, $0{,}5$ cm. Seule l'eau poussée mesure le galet.\nRéponse : a) $500$ cm³ ; b) $0{,}5$ L ; c) environ $1{,}35$ kg ; d) $4$ galets.",
          schema: ecranSeulement(
            prisme([[0, 0], [40, 0], [40, 32], [0, 32]], 25, {
              niveau: 30,
              cotes: [
                { de: [0, 0, 0], a: [40, 0, 0], label: "40 cm", cote: "b" },
                { de: [0, 0, 0], a: [0, 0, 32], label: "32 cm", cote: "g" },
                { de: [40, 0, 0], a: [40, 25, 0], label: "25 cm", cote: "bd" },
              ],
            }),
          ),
          micros: ["volume_pave", "volume_defi", "volume_unite"],
        },
        {
          titre: "Le gâteau à deux étages",
          enonce:
            "Un pâtissier prépare un gâteau à deux étages : deux cylindres posés l'un sur l'autre. L'étage du bas a un diamètre de $24$ cm et une hauteur de $8$ cm ; celui du haut, un diamètre de $16$ cm et une hauteur de $6$ cm. On prend $\\pi \\approx 3{,}14$.\na) Calcule le volume de chaque étage, arrondi au cm³.\nb) Calcule le volume du gâteau, en cm³ puis en litres.\nc) Le gâteau est coupé en $16$ parts égales. Quel est le volume d'une part, environ ?",
          figure: cylindres(
            [
              { r: 12, h: 8, diametre: "24 cm", hauteur: "8 cm", mesure: "bas" },
              { r: 8, h: 6, diametre: "16 cm", hauteur: "6 cm" },
            ],
            true,
          ),
          correction:
            "a) Les rayons sont les moitiés des diamètres : $24 \\div 2 = 12$ cm et $16 \\div 2 = 8$ cm.\nÉtage du bas : aire du fond $3{,}14 \\times 12 \\times 12 = 452{,}16$ cm², volume $452{,}16 \\times 8 = 3\\,617{,}28$ cm³, soit environ $3\\,617$ cm³.\nÉtage du haut : aire du fond $3{,}14 \\times 8 \\times 8 = 200{,}96$ cm², volume $200{,}96 \\times 6 = 1\\,205{,}76$ cm³, soit environ $1\\,206$ cm³.\nb) Le volume d'un assemblage est la somme des volumes : $3\\,617{,}28 + 1\\,205{,}76 = 4\\,823{,}04$ cm³, soit environ $4\\,823$ cm³.\nEn litres : $4\\,823 \\div 1\\,000 \\approx 4{,}8$ L.\nc) $4\\,823 \\div 16 \\approx 301$ cm³ par part.\n⛔ Le piège : calculer avec les diamètres. On trouverait des volumes quatre fois trop grands : près de $20$ L de gâteau !\nRéponse : a) environ $3\\,617$ cm³ et $1\\,206$ cm³ ; b) environ $4\\,823$ cm³, soit $4{,}8$ L ; c) environ $301$ cm³ par part.",
          micros: ["volume_assemblage", "volume_cylindre", "volume_unite"],
        },
        {
          titre: "Doubler l'arête d'un cube",
          enonce:
            "Emma a un cube en bois de $3$ cm d'arête. Elle en fabrique un autre, d'arête deux fois plus longue.\na) Calcule le volume du petit cube.\nb) Calcule le volume du grand cube.\nc) Emma pensait que le volume serait « deux fois plus grand ». Combien de fois plus grand est-il ?\nd) Combien de petits cubes faut-il pour construire le grand ?\ne) Et si l'arête était dix fois plus longue ? Fais le lien avec $1$ dm³ $= 1\\,000$ cm³.",
          correction:
            "a) $3 \\times 3 \\times 3 = 27$ cm³.\nb) L'arête du grand cube : $3 \\times 2 = 6$ cm. Son volume : $6 \\times 6 \\times 6 = 216$ cm³.\nc) $216 \\div 27 = 8$ : il est $8$ fois plus grand, pas $2$.\nd) Le grand cube a $2$ petits cubes en longueur, $2$ en largeur et $2$ en hauteur : $2 \\times 2 \\times 2 = 8$ petits cubes. Le dessin le montre.\ne) Dix fois plus long dans les trois directions : $10 \\times 10 \\times 10 = 1\\,000$ fois plus grand. C'est pour cela qu'un cube de $1$ dm, soit $10$ cm d'arête, contient $1\\,000$ cubes de $1$ cm³.\n⛔ Le piège : croire que doubler l'arête double le volume. On double la longueur, ET la largeur, ET la hauteur : $2 \\times 2 \\times 2 = 8$.\nRéponse : $27$ cm³ et $216$ cm³, soit $8$ fois plus ; $8$ petits cubes ; $1\\,000$ fois plus pour une arête dix fois plus longue.",
          schema: ecranSeulement(cubeDecoupe(2, "6 cm", ["2 × 2 × 2", "= 8 cubes", "de 3 cm"])),
          micros: ["volume_defi", "volume_comprendre", "volume_unite"],
        },
      ],
    },
  ],
};
