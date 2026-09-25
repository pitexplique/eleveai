// ─── Fiche d'exercices : la géométrie dans l'espace (3e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-geometrie-espace.tsx` et
// sur les QUATRE micros du coach de 3e (notionId volume_geometrie_espace) :
// reconnaître les solides, comprendre une section, interpréter une
// représentation en perspective, défis. On reste sur les FORMES et le
// REPÉRAGE (dans un pavé droit, sur la sphère terrestre) : ⛔ aucun calcul de
// volume, c'est la notion `volume_solide`.
//
// Les trois pièges qui reviennent : compter les traits du dessin au lieu des
// arêtes du solide (2, 14, 20), l'ordre des coordonnées (abscisse ; ordonnée ;
// altitude) (5, 9, 10, 11, 17), et latitude/longitude inversées ou N/S, E/O
// oubliés (6, 12, 13, 18, 19).
//
// Les chiffres du monde, et d'où ils viennent :
// - coordonnées des villes : GeoNames (geonames.org), arrondies au degré —
//   Paris 48,85° N 2,35° E ; Sydney 33,87° S 151,21° E ; Quito 0,23° S
//   78,52° O ; Reykjavik 64,14° N 21,90° O ; Tokyo 35,69° N 139,69° E ;
//   Stockholm 59,33° N 18,07° E ; Le Cap 33,93° S 18,42° E ; Madrid 40,42° N
//   3,70° O ; observatoire de Greenwich 51,48° N 0° ; îles des Antipodes
//   49,68° S 178,77° E ; Barfleur 49,67° N 1,26° O ; Weber (Nouvelle-Zélande)
//   40,40° S 176,32° E ; Hangzhou 30,27° N 120,15° E — ex. 6, 7, 12, 13, 18, 19 ;
// - méridien d'origine de Greenwich : conférence internationale de Washington,
//   1884 — ex. 7 ;
// - tour de la Terre par les pôles ≈ 40 008 km (ellipsoïde WGS 84), « environ
//   40 000 km » (définition du mètre de 1791) ; équateur ≈ 40 075 km — ex. 8, 18 ;
// - conteneur standard (EVP, norme ISO 668) : 2,59 m de haut (8 pieds 6
//   pouces) — ex. 10 ;
// - ballon Telstar (Coupe du monde 1970) : icosaèdre tronqué, 12 pentagones et
//   20 hexagones — ex. 20.
//
// ⭐ LES SCHÉMAS SONT DESSINÉS ICI, en SVG nu, parce que le canvas `solide_3d`
// ne sait pas tracer les arêtes cachées en pointillés (voir l'en-tête de la
// fiche de cours) : `solide` / `pave` projettent en perspective cavalière
// (fuyantes à 45°, réduites de moitié) et tracent en pointillés les arêtes
// qu'on leur donne comme cachées. Le script de recalcul retrouve ces arêtes
// cachées par un autre chemin (enveloppe convexe des sommets, faces tournées
// vers l'œil ou non) : écrire sommets, arêtes et `cachees` EN CLAIR dans l'appel.
// `globe`, `planisphere`, `coupeMeridien`, `coupeBoule` : latitude et longitude
// en degrés (Nord et Est positifs), relues par le script. Les sections de
// solides passent par le canvas `section_solide` du coach (CanvasRenderer).
// Textes SVG en 13-14 dans des cadres de ~300 : ≥ 11 px à 375.
//
// Les corrigés sont écrits à la première personne, comme les autres feuilles
// de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-geometrie-espace-3e.mjs`.
//
// Micro-compétences : volume_solide_reconnaitre (1, 2, 14, 20), volume_section
// (4, 8, 15, 18), volume_representation (2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 16,
// 17, 18), volume_geometrie_espace_defi (10, 14, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { ORANGE, tableauProba } from "@/lib/fiches-exercices/figures";

type P3 = [number, number, number];
/** `etiquette` : l'étiquette SORT du solide (au-dessus, en dessous, à droite),
 *  reliée à son point par un trait fin. ⛔ Vu par Frédéric le 25/09 (ex. 9 et
 *  17) : posée à côté d'un point intérieur, elle était barrée par les arêtes. */
type PointEspace = { nom: string; p: P3; texte?: string; chemin?: boolean; cote?: "g" | "d"; etiquette?: "dessus" | "dessous" | "droite" };
type OptionsSolide = {
  /** true : tous les sommets nommés ; un objet : seulement ceux-là, renommés. */
  noms?: boolean | Record<string, string>;
  axes?: boolean;
  cotes?: Record<string, string>;
  segments?: string[];
  points?: PointEspace[];
  chemin?: P3[];
  grille?: boolean;
  boites?: { de: P3; a: P3 }[];
};

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const ARETE = "#1e3a8a";
const CACHEE = "#64748b";
const ENCRE = "#0f172a";
const CADRE = "mx-auto w-full max-w-[18rem] print:max-w-[13rem]";
const virgule = (x: number) => String(+x.toFixed(2)).replace(".", ",");
const coordonnees = (p: P3) => `(${p.map(virgule).join(" ; ")})`;
const rad = (d: number) => (d * Math.PI) / 180;
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };

const legendeSous = (dessin: ReactNode, texte: string) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/**
 * Un solide à faces planes, en perspective cavalière. Les arêtes de `cachees`
 * sont en pointillés. Le cadre s'ajuste au dessin ET à ses étiquettes.
 */
const solide = (s: { sommets: Record<string, P3>; aretes: string[]; cachees: string[] } & OptionsSolide) => {
  const proj = (q: P3): [number, number] => [q[0] + K * q[1], q[2] + K * q[1]];
  const noms = Object.keys(s.sommets);
  const maxi = [0, 1, 2].map((i) => Math.max(...noms.map((n) => s.sommets[n][i])));
  const ext = 0.3 * Math.max(...maxi);
  const axes: { de: P3; a: P3; nom: string }[] = s.axes
    ? [
        { de: [maxi[0], 0, 0], a: [maxi[0] + ext, 0, 0], nom: "x" },
        { de: [0, maxi[1], 0], a: [0, maxi[1] + 2 * ext, 0], nom: "y" },
        { de: [0, 0, maxi[2]], a: [0, 0, maxi[2] + ext], nom: "z" },
      ]
    : [];
  const tous = [...noms.map((n) => proj(s.sommets[n])), ...axes.map((ax) => proj(ax.a))];
  const minX = Math.min(...tous.map((p) => p[0]));
  const maxX = Math.max(...tous.map((p) => p[0]));
  const minY = Math.min(...tous.map((p) => p[1]));
  const maxY = Math.max(...tous.map((p) => p[1]));
  const e = Math.min(180 / (maxX - minX), 130 / (maxY - minY));
  const ecran = (q: P3): [number, number] => {
    const [X, Y] = proj(q);
    return [(X - minX) * e, (maxY - Y) * e];
  };
  const ecranNoms = noms.map((n) => ecran(s.sommets[n]));
  const gx = ecranNoms.reduce((t, p) => t + p[0], 0) / noms.length;
  const gy = ecranNoms.reduce((t, p) => t + p[1], 0) / noms.length;

  const bornes = [Infinity, Infinity, -Infinity, -Infinity];
  const inclure = (x0: number, y0: number, x1: number, y1: number) => {
    bornes[0] = Math.min(bornes[0], x0);
    bornes[1] = Math.min(bornes[1], y0);
    bornes[2] = Math.max(bornes[2], x1);
    bornes[3] = Math.max(bornes[3], y1);
  };
  tous.forEach((p) => {
    const [x, y] = [(p[0] - minX) * e, (maxY - p[1]) * e];
    inclure(x, y, x, y);
  });
  let cle = 0;
  const texte = (x: number, y: number, t: string, ancre: "start" | "middle" | "end", couleur = ENCRE, taille = 14) => {
    const w = t.length * taille * 0.6;
    const x0 = ancre === "start" ? x : ancre === "end" ? x - w : x - w / 2;
    inclure(x0, y - taille, x0 + w, y + 3);
    return (
      <text key={`t${cle++}`} x={x} y={y} textAnchor={ancre} fontSize={taille} fontWeight={900} fill={couleur} {...halo}>
        {t}
      </text>
    );
  };
  const ligne = (a: P3, b: P3, props: Record<string, unknown>) => {
    const [x1, y1] = ecran(a);
    const [x2, y2] = ecran(b);
    return <line key={`l${cle++}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" {...props} />;
  };
  const polyligne = (pts: P3[], props: Record<string, unknown>) => (
    <polyline key={`p${cle++}`} points={pts.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ")} fill="none" strokeLinejoin="round" {...props} />
  );
  const face = (pts: P3[], props: Record<string, unknown>) => (
    <polygon key={`f${cle++}`} points={pts.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ")} {...props} />
  );

  const dessin: ReactNode[] = [];
  // La grille des conteneurs, sur les trois faces vues (devant, dessus, droite).
  if (s.grille) {
    const [a, b, c] = maxi;
    const g = { stroke: "#cbd5e1", strokeWidth: 1 };
    for (let i = 1; i < a; i++) dessin.push(ligne([i, 0, 0], [i, 0, c], g), ligne([i, 0, c], [i, b, c], g));
    for (let k = 1; k < c; k++) dessin.push(ligne([0, 0, k], [a, 0, k], g), ligne([a, 0, k], [a, b, k], g));
    for (let j = 1; j < b; j++) dessin.push(ligne([0, j, c], [a, j, c], g), ligne([a, j, 0], [a, j, c], g));
  }
  const arete = (nom: string) => [s.sommets[nom[0]], s.sommets[nom[1]]] as [P3, P3];
  for (const n of s.aretes.filter((n) => s.cachees.includes(n)))
    dessin.push(ligne(...arete(n), { stroke: CACHEE, strokeWidth: 1.6, strokeDasharray: "5 4" }));
  for (const bo of s.boites ?? []) {
    const [x0, y0, z0] = bo.de;
    const [x1, y1, z1] = bo.a;
    const style = { fill: ROUGE, fillOpacity: 0.45, stroke: ROUGE, strokeWidth: 1.5 };
    dessin.push(
      face([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], style),
      face([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], style),
      face([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], style),
    );
  }
  for (const n of s.aretes.filter((n) => !s.cachees.includes(n))) dessin.push(ligne(...arete(n), { stroke: ARETE, strokeWidth: 2.2 }));
  for (const n of s.segments ?? []) dessin.push(ligne(...arete(n), { stroke: ORANGE, strokeWidth: 2, strokeDasharray: "6 4" }));
  for (const ax of axes) {
    dessin.push(ligne(ax.de, ax.a, { stroke: "#2563eb", strokeWidth: 1.6 }));
    const [x1, y1] = ecran(ax.de);
    const [x2, y2] = ecran(ax.a);
    const L = Math.hypot(x2 - x1, y2 - y1) || 1;
    const [ux, uy] = [(x2 - x1) / L, (y2 - y1) / L];
    dessin.push(
      <polygon
        key={`fl${cle++}`}
        points={`${x2},${y2} ${x2 - 8 * ux - 4 * uy},${y2 - 8 * uy + 4 * ux} ${x2 - 8 * ux + 4 * uy},${y2 - 8 * uy - 4 * ux}`}
        fill="#2563eb"
      />,
      texte(x2 + 10 * ux + (ax.nom === "z" ? 8 : 0), y2 + 10 * uy + 5, ax.nom, "middle", "#2563eb"),
    );
  }
  if (s.chemin) {
    dessin.push(polyligne(s.chemin, { stroke: ORANGE, strokeWidth: 2.6 }));
  }
  for (const pt of s.points ?? []) {
    if (pt.chemin) {
      const [x, y, z] = pt.p;
      dessin.push(polyligne([[0, 0, 0], [x, 0, 0], [x, y, 0], [x, y, z]], { stroke: ORANGE, strokeWidth: 2.4, strokeDasharray: "7 4" }));
    }
  }
  // Les noms de sommets, poussés vers l'extérieur du solide.
  const nommes: [string, string][] =
    s.noms === true ? noms.map((n) => [n, n]) : s.noms ? Object.entries(s.noms) : [];
  for (const [n, affiche] of nommes) {
    const [x, y] = ecran(s.sommets[n]);
    const L = Math.hypot(x - gx, y - gy) || 1;
    dessin.push(texte(x + (13 * (x - gx)) / L, y + (13 * (y - gy)) / L + 5, affiche, "middle"));
  }
  for (const [n, t] of Object.entries(s.cotes ?? {})) {
    const [a, b] = arete(n).map(ecran);
    const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const L = Math.hypot(mx - gx, my - gy) || 1;
    dessin.push(texte(mx + (18 * (mx - gx)) / L, my + (18 * (my - gy)) / L + 5, t, "middle", CACHEE, 13));
  }
  // Le contour du dessin (solide ET axes), pour poser une étiquette dehors.
  const ecranTous = tous.map(([X, Y]) => [(X - minX) * e, (maxY - Y) * e]);
  const dehors = {
    haut: Math.min(...ecranTous.map((p) => p[1])),
    bas: Math.max(...ecranTous.map((p) => p[1])),
    droite: Math.max(...ecranTous.map((p) => p[0])),
  };
  for (const pt of s.points ?? []) {
    const [x, y] = ecran(pt.p);
    const t = pt.texte ?? `${pt.nom} ${coordonnees(pt.p)}`;
    if (t && pt.etiquette) {
      // L'étiquette hors du solide, et un trait fin jusqu'au point.
      const [tx, ty, ancre] =
        pt.etiquette === "dessus" ? [x, dehors.haut - 14, "middle" as const]
        : pt.etiquette === "dessous" ? [x, dehors.bas + 26, "middle" as const]
        : [dehors.droite + 14, y + 5, "start" as const];
      const [fx, fy] = pt.etiquette === "dessus" ? [tx, ty + 4] : pt.etiquette === "dessous" ? [tx, ty - 14] : [tx - 4, y];
      // Le trait d'abord, le texte (avec son halo blanc) par-dessus.
      dessin.push(<line key={`e${cle++}`} x1={x} y1={y} x2={fx} y2={fy} stroke={ROUGE} strokeWidth={1.2} strokeDasharray="2 3" />);
      dessin.push(texte(tx, ty, t, ancre, ROUGE, 13));
    }
  }
  for (const pt of s.points ?? []) {
    const [x, y] = ecran(pt.p);
    dessin.push(<circle key={`c${cle++}`} cx={x} cy={y} r={4.5} fill={ROUGE} stroke="white" strokeWidth={1.5} />);
    const t = pt.texte ?? `${pt.nom} ${coordonnees(pt.p)}`;
    if (t && !pt.etiquette) {
      const cote = pt.cote ?? (x > gx ? "g" : "d");
      dessin.push(texte(cote === "d" ? x + 8 : x - 8, y - 8, t, cote === "d" ? "start" : "end", ROUGE, 13));
    }
  }
  const [bx0, by0, bx1, by1] = bornes;
  return (
    <svg
      viewBox={`${(bx0 - 6).toFixed(1)} ${(by0 - 6).toFixed(1)} ${(bx1 - bx0 + 12).toFixed(1)} ${(by1 - by0 + 12).toFixed(1)}`}
      role="img"
      aria-label={`Solide en perspective cavalière, ${noms.length} sommets, ${s.aretes.length} arêtes dont ${s.cachees.length} cachées, en pointillés`}
      className={CADRE}
    >
      {dessin}
    </svg>
  );
};

/** Le pavé droit ABCDEFGH : ABCD au sol (A devant à gauche, D derrière), E au-dessus de A. */
const pave = (a: number, b: number, c: number, cachees: string[], o: OptionsSolide = {}) =>
  solide({
    sommets: { A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] },
    aretes: ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"],
    cachees,
    ...o,
  });

type Ville = { nom: string; lat: number; lon: number; angle?: boolean; gauche?: boolean; guides?: boolean };

/**
 * La Terre vue d'un peu au-dessus de l'équateur (20°), tournée vers la
 * longitude `centre`. Parallèles et méridiens : trait plein devant, pointillés
 * derrière. `angle` : la latitude dessinée comme un ANGLE, au centre.
 */
const globe = (o: { centre: number; paralleles?: number[]; meridiens?: number[]; surligne?: number; villes?: Ville[] }, legende: string) => {
  const R = 90;
  const cx = 125;
  const cy = 122;
  const T = rad(20);
  const proj = (lat: number, lon: number) => {
    const f = rad(lat);
    const l = rad(lon - o.centre);
    const X = Math.cos(f) * Math.sin(l);
    const Y = Math.sin(f);
    const Z = Math.cos(f) * Math.cos(l);
    return { x: cx + R * X, y: cy - R * (Y * Math.cos(T) - Z * Math.sin(T)), vu: Y * Math.sin(T) + Z * Math.cos(T) >= -1e-9 };
  };
  let cle = 0;
  const courbe = (pts: { x: number; y: number; vu: boolean }[], couleur: string, epaisseur: number) => {
    const morceaux: { vu: boolean; pts: typeof pts }[] = [];
    for (const p of pts) {
      const dernier = morceaux[morceaux.length - 1];
      if (!dernier || dernier.vu !== p.vu) {
        morceaux.push({ vu: p.vu, pts: dernier ? [dernier.pts[dernier.pts.length - 1], p] : [p] });
      } else dernier.pts.push(p);
    }
    return morceaux.map((m) => (
      <polyline
        key={`g${cle++}`}
        points={m.pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
        fill="none"
        stroke={couleur}
        strokeWidth={m.vu ? epaisseur : 1}
        strokeDasharray={m.vu ? undefined : "3 4"}
        opacity={m.vu ? 1 : 0.55}
      />
    ));
  };
  const couleurParallele = (lat: number) => (lat === 0 ? ORANGE : lat === o.surligne ? "#7c3aed" : "#94a3b8");
  const dessin: ReactNode[] = [<circle key="terre" cx={cx} cy={cy} r={R} fill="#eff6ff" stroke={ARETE} strokeWidth={2} />];
  for (const lat of o.paralleles ?? []) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 4) pts.push(proj(lat, lon));
    dessin.push(...courbe(pts, couleurParallele(lat), lat === 0 || lat === o.surligne ? 2.6 : 1.3));
  }
  for (const lon of o.meridiens ?? []) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 3) pts.push(proj(lat, lon));
    dessin.push(...courbe(pts, lon === 0 ? VERT : "#94a3b8", lon === 0 ? 2.6 : 1.3));
  }
  const texte = (x: number, y: number, t: string, ancre: "start" | "middle" | "end", couleur = ENCRE) => (
    <text key={`t${cle++}`} x={x} y={y} textAnchor={ancre} fontSize={14} fontWeight={900} fill={couleur} {...halo}>
      {t}
    </text>
  );
  dessin.push(texte(cx, cy - R * Math.cos(T) - 6, "N", "middle"), texte(cx, cy + R * Math.cos(T) + 17, "S", "middle"));
  if ((o.paralleles ?? []).includes(0)) dessin.push(texte(cx + R + 4, cy + 5, "équateur", "start", ORANGE));
  if (o.surligne !== undefined) {
    const p = proj(o.surligne, o.centre - 90);
    dessin.push(texte(p.x - 4, p.y + 5, `${Math.abs(o.surligne)}° ${o.surligne >= 0 ? "N" : "S"}`, "end", "#7c3aed"));
  }
  for (const v of o.villes ?? []) {
    const p = proj(v.lat, v.lon);
    if (v.angle) {
      const e0 = proj(0, v.lon);
      const arc = [];
      for (let t = 0; t <= v.lat; t += 2) {
        const q = proj(t, v.lon);
        arc.push(`${(cx + 0.35 * (q.x - cx)).toFixed(1)},${(cy + 0.35 * (q.y - cy)).toFixed(1)}`);
      }
      const m = proj(v.lat / 2, v.lon);
      dessin.push(
        <line key={`a${cle++}`} x1={cx} y1={cy} x2={e0.x} y2={e0.y} stroke={ROUGE} strokeWidth={1.8} />,
        <line key={`a${cle++}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={ROUGE} strokeWidth={1.8} />,
        <polyline key={`a${cle++}`} points={arc.join(" ")} fill="none" stroke={ROUGE} strokeWidth={2} />,
        <circle key={`a${cle++}`} cx={cx} cy={cy} r={3} fill={ROUGE} />,
        texte(cx + 0.55 * (m.x - cx) + 4, cy + 0.55 * (m.y - cy) + 5, `${v.lat}°`, "start", ROUGE),
      );
    }
    dessin.push(<circle key={`v${cle++}`} cx={p.x} cy={p.y} r={4.5} fill={ROUGE} stroke="white" strokeWidth={1.5} />);
    dessin.push(texte(v.gauche ? p.x - 7 : p.x + 7, p.y - 7, v.nom, v.gauche ? "end" : "start", ROUGE));
  }
  return legendeSous(
    <svg viewBox="0 0 300 235" role="img" aria-label={`Globe terrestre. ${legende}`} className="w-full">
      {dessin}
    </svg>,
    legende,
  );
};

/**
 * Le planisphère en grille : 360° de longitude sur 240, 180° de latitude sur
 * 120, lignes tous les 30°. Équateur en orange, Greenwich en vert.
 */
const planisphere = (villes: Ville[], legende: string) => {
  const L = 44;
  const H0 = 10;
  const W = 240;
  const H = 120;
  const X = (lon: number) => L + ((lon + 180) * W) / 360;
  const Y = (lat: number) => H0 + ((90 - lat) * H) / 180;
  const dessin: ReactNode[] = [<rect key="fond" x={L} y={H0} width={W} height={H} fill="#eff6ff" stroke={ARETE} strokeWidth={1.5} />];
  for (let lon = -150; lon <= 150; lon += 30)
    dessin.push(<line key={`m${lon}`} x1={X(lon)} y1={H0} x2={X(lon)} y2={H0 + H} stroke={lon === 0 ? VERT : "#cbd5e1"} strokeWidth={lon === 0 ? 2.4 : 1} />);
  for (let lat = -60; lat <= 60; lat += 30)
    dessin.push(<line key={`p${lat}`} x1={L} y1={Y(lat)} x2={L + W} y2={Y(lat)} stroke={lat === 0 ? ORANGE : "#cbd5e1"} strokeWidth={lat === 0 ? 2.4 : 1} />);
  for (let lat = -60; lat <= 60; lat += 30)
    dessin.push(
      <text key={`tl${lat}`} x={L - 4} y={Y(lat) + 4} textAnchor="end" fontSize={13} fontWeight={900} fill={ENCRE}>
        {lat === 0 ? "0°" : `${Math.abs(lat)}° ${lat > 0 ? "N" : "S"}`}
      </text>,
    );
  for (const lon of [-90, 0, 90])
    dessin.push(
      <text key={`tm${lon}`} x={X(lon)} y={H0 + H + 17} textAnchor="middle" fontSize={13} fontWeight={900} fill={ENCRE}>
        {lon === 0 ? "0°" : `${Math.abs(lon)}° ${lon > 0 ? "E" : "O"}`}
      </text>,
    );
  villes.forEach((v, i) => {
    const [x, y] = [X(v.lon), Y(v.lat)];
    if (v.guides)
      dessin.push(
        <line key={`gh${i}`} x1={L} y1={y} x2={x} y2={y} stroke={ROUGE} strokeWidth={1.4} strokeDasharray="4 3" />,
        <line key={`gv${i}`} x1={x} y1={y} x2={x} y2={H0 + H} stroke={ROUGE} strokeWidth={1.4} strokeDasharray="4 3" />,
      );
    dessin.push(
      <circle key={`v${i}`} cx={x} cy={y} r={4.5} fill={ROUGE} stroke="white" strokeWidth={1.5} />,
      <text key={`n${i}`} x={v.gauche ? x - 7 : x + 7} y={y - 6} textAnchor={v.gauche ? "end" : "start"} fontSize={14} fontWeight={900} fill={ROUGE} {...halo}>
        {v.nom}
      </text>,
    );
  });
  return legendeSous(
    <svg viewBox="0 0 296 156" role="img" aria-label={`Planisphère. ${legende}`} className="w-full">
      {dessin}
    </svg>,
    legende,
  );
};

/** La Terre coupée par le plan d'UN méridien : un grand cercle. Les villes du
 *  méridien sont placées à leur latitude, angle au centre compris. */
const coupeMeridien = (villes: { nom: string; lat: number }[]) => {
  const cx = 130;
  const cy = 115;
  const R = 85;
  const pt = (lat: number, r = R) => [cx + r * Math.cos(rad(lat)), cy - r * Math.sin(rad(lat))];
  const [haut, bas] = [Math.max(...villes.map((v) => v.lat)), Math.min(...villes.map((v) => v.lat))];
  const [xb, yb] = pt(bas);
  const [xh, yh] = pt(haut);
  const dessin: ReactNode[] = [
    <circle key="terre" cx={cx} cy={cy} r={R} fill="#eff6ff" stroke={ARETE} strokeWidth={2} />,
    <line key="axe" x1={cx} y1={cy - R - 6} x2={cx} y2={cy + R + 6} stroke={CACHEE} strokeWidth={1.4} strokeDasharray="5 4" />,
    <line key="eq" x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={ORANGE} strokeWidth={2.4} />,
    <path key="arc" d={`M ${xb.toFixed(1)} ${yb.toFixed(1)} A ${R} ${R} 0 0 0 ${xh.toFixed(1)} ${yh.toFixed(1)}`} fill="none" stroke={ROUGE} strokeWidth={5} opacity={0.45} />,
    <text key="N" x={cx} y={cy - R - 10} textAnchor="middle" fontSize={14} fontWeight={900} fill={ENCRE}>N</text>,
    <text key="S" x={cx} y={cy + R + 22} textAnchor="middle" fontSize={14} fontWeight={900} fill={ENCRE}>S</text>,
    <text key="teq" x={cx - R + 4} y={cy - 7} textAnchor="start" fontSize={13} fontWeight={900} fill={ORANGE} {...halo}>équateur</text>,
  ];
  villes.forEach((v, i) => {
    const [x, y] = pt(v.lat);
    const arc = [];
    for (let t = 0; Math.abs(t) <= Math.abs(v.lat); t += (Math.sign(v.lat) || 1) * 2) arc.push(pt(t, 30).map((c) => c.toFixed(1)).join(","));
    const [lx, ly] = pt(v.lat / 2, 46);
    dessin.push(
      <line key={`r${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke={ROUGE} strokeWidth={1.8} />,
      <polyline key={`a${i}`} points={arc.join(" ")} fill="none" stroke={ROUGE} strokeWidth={2} />,
      <text key={`d${i}`} x={lx} y={ly + 5} textAnchor="start" fontSize={14} fontWeight={900} fill={ROUGE} {...halo}>{`${Math.abs(v.lat)}°`}</text>,
      <circle key={`p${i}`} cx={x} cy={y} r={4.5} fill={ROUGE} stroke="white" strokeWidth={1.5} />,
      <text key={`n${i}`} x={x + 8} y={y + (v.lat > 0 ? -4 : 14)} textAnchor="start" fontSize={14} fontWeight={900} fill={ENCRE} {...halo}>{v.nom}</text>,
    );
  });
  return legendeSous(
    <svg viewBox="0 0 300 232" role="img" aria-label="La Terre coupée par le plan d'un méridien" className="w-full">
      {dessin}
    </svg>,
    "la Terre coupée par le plan du méridien : un grand cercle",
  );
};

/** Une boule de rayon R coupée à la distance d du centre, vue de profil : le
 *  triangle OHM, rectangle en H, donne le rayon de la section. */
const coupeBoule = (R: number, d: number) => {
  const e = 90 / R;
  const cx = 150;
  const cy = 112;
  const r = Math.sqrt(R * R - d * d);
  const yH = cy - d * e;
  const xM = cx + r * e;
  return legendeSous(
    <svg viewBox="0 0 300 215" role="img" aria-label={`Boule de rayon ${R} cm coupée à ${d} cm du centre`} className="w-full">
      <circle cx={cx} cy={cy} r={R * e} fill="#eff6ff" stroke={ARETE} strokeWidth={2} />
      <ellipse cx={cx} cy={yH} rx={r * e} ry={13} fill={ORANGE} fillOpacity={0.25} stroke={ORANGE} strokeWidth={2} />
      <line x1={cx} y1={cy} x2={cx} y2={yH} stroke={ROUGE} strokeWidth={2} />
      <line x1={cx} y1={yH} x2={xM} y2={yH} stroke={ROUGE} strokeWidth={2} />
      <line x1={cx} y1={cy} x2={xM} y2={yH} stroke={ROUGE} strokeWidth={2} />
      <polyline points={`${cx + 9},${yH} ${cx + 9},${yH + 9} ${cx},${yH + 9}`} fill="none" stroke={ROUGE} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3.5} fill={ENCRE} />
      <text x={cx - 8} y={cy + 5} textAnchor="end" fontSize={14} fontWeight={900} fill={ENCRE} {...halo}>O</text>
      <text x={cx - 8} y={yH - 4} textAnchor="end" fontSize={14} fontWeight={900} fill={ENCRE} {...halo}>H</text>
      <text x={xM + 8} y={yH + 5} textAnchor="start" fontSize={14} fontWeight={900} fill={ENCRE} {...halo}>M</text>
      <text x={cx - 8} y={(cy + yH) / 2 + 5} textAnchor="end" fontSize={13} fontWeight={900} fill={ROUGE} {...halo}>{`${virgule(d)} cm`}</text>
      <text x={(cx + xM) / 2} y={yH - 18} textAnchor="middle" fontSize={13} fontWeight={900} fill={ROUGE} {...halo}>{`${virgule(r)} cm`}</text>
      <text x={(cx + xM) / 2 + 10} y={(cy + yH) / 2 + 18} textAnchor="start" fontSize={13} fontWeight={900} fill={ROUGE} {...halo}>{`${virgule(R)} cm`}</text>
    </svg>,
    "la section est un disque de centre H",
  );
};

/** Une section de solide : le canvas `section_solide` du coach, sans texte
 *  dans le SVG (voir la fiche des sections), la légende en HTML dessous. */
const coupe = (solideCoupe: "cube" | "pave_droit" | "cylindre" | "cone" | "pyramide", section: "parallele_face" | "parallele_base" | "parallele_axe", legende: string) =>
  legendeSous(
    <CanvasRenderer
      figure={
        {
          kind: "section_solide",
          solide: solideCoupe,
          section,
          size: { width: 230, height: 215 },
          display: { showPlane: true, showLabels: false, showSectionName: false, showCallouts: false, showMiniLegend: false },
        } as never
      }
    />,
    legende,
  );

export const exercicesGeometrieEspace3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "volume-geometrie-espace",
  titre: "La géométrie dans l'espace",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un solide et compter ses faces, ses arêtes et ses sommets, lire un dessin en perspective, deviner la forme d'une section, repérer un point dans un pavé droit puis une ville sur la Terre par sa latitude et sa longitude. Un drone dans une salle, des conteneurs sur un cargo, Stockholm et Le Cap sur le même méridien, le ballon de football. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec un schéma, le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/volume-geometrie-espace", titre: "La géométrie dans l'espace" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je raisonne sur le solide, pas sur les traits du dessin.",
      rappel: [
        "Un solide a des FACES (planes ou courbes), des ARÊTES (là où deux faces se touchent) et des SOMMETS (là où les arêtes se rejoignent). Un cube : 6 faces, 12 arêtes, 8 sommets.",
        "En perspective cavalière, les arêtes cachées sont en POINTILLÉS, les parallèles restent parallèles, et une face vue de biais est dessinée en parallélogramme.",
        "Dans un pavé droit, un point se repère par TROIS nombres, toujours dans cet ordre : (abscisse ; ordonnée ; altitude).",
        "Sur la Terre, un lieu se repère par sa LATITUDE (de 0° à 90°, au Nord ou au Sud de l'équateur), PUIS sa LONGITUDE (de 0° à 180°, à l'Est ou à l'Ouest du méridien de Greenwich).",
      ],
      exercices: [
        {
          enonce:
            "Nommer chaque solide.\na) Six faces, toutes des carrés identiques.\nb) Deux disques identiques et parallèles, reliés par une surface courbe.\nc) Une base carrée et quatre triangles qui se rejoignent en un même point.\nd) Deux triangles identiques et parallèles, reliés par trois rectangles.\ne) Aucune face plane, aucune arête : tous ses points sont à la même distance d'un centre.\nf) Un disque et un sommet, reliés par une surface courbe.",
          correction:
            "Je cherche d'abord les BASES : combien il y en a, de quelle forme, et s'il y a un sommet pointu.\na) Six carrés identiques : c'est un cube.\nb) Deux bases en forme de disque : c'est un cylindre.\nc) Une seule base, carrée, et un sommet où se rejoignent les triangles : c'est une pyramide à base carrée (le dessin).\nd) Deux bases triangulaires : c'est un prisme droit à base triangulaire. Deux bases, donc un prisme, pas une pyramide.\ne) Ni face plane, ni arête : c'est une boule. Sa surface, la « peau », s'appelle une sphère.\nf) Une base en forme de disque et un sommet : c'est un cône.\n⛔ Le piège : confondre prisme et pyramide, ou cylindre et cône. Deux bases : prisme ou cylindre. Une base et un sommet : pyramide ou cône.\nRéponse : cube ; cylindre ; pyramide à base carrée ; prisme droit ; boule ; cône.",
          schema: solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [4, 4, 0], D: [0, 4, 0], S: [2, 2, 5] }, aretes: ["AB", "BC", "CD", "DA", "SA", "SB", "SC", "SD"], cachees: ["CD", "DA", "SD"], noms: true }),
          micros: ["volume_solide_reconnaitre"],
        },
        {
          enonce:
            "Un prisme droit ABCDEF a pour bases les triangles ABC et DEF. Ses arêtes latérales sont [AD], [BE] et [CF].\na) Combien a-t-il de faces ? De quelles formes ?\nb) Combien a-t-il d'arêtes ? De sommets ?\nc) Dans la représentation habituelle, combien d'arêtes sont dessinées en pointillés ?\nd) Vérifier que faces − arêtes + sommets = 2.",
          correction:
            "a) Deux bases triangulaires, ABC et DEF, plus une face rectangulaire par côté du triangle : 3 rectangles. En tout 2 + 3 = 5 faces.\nb) Chaque triangle a 3 arêtes, et 3 arêtes relient les deux bases, [AD], [BE] et [CF] : 6 + 3 = 9 arêtes. Chaque triangle a 3 sommets : 3 + 3 = 6 sommets.\nc) Sur le dessin, le sommet D est derrière : ses trois arêtes, [AD], [DE] et [DF], sont cachées. 3 pointillés, et 9 − 3 = 6 traits pleins.\nd) $5 - 9 + 6 = 2$. Le compte est cohérent.\n⛔ Le piège : ne compter que les traits pleins et trouver 6 arêtes. Je compte sur le SOLIDE, pas sur ce que je vois.\nRéponse : 5 faces (2 triangles et 3 rectangles), 9 arêtes, 6 sommets, dont 3 arêtes cachées.",
          schema: solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [2, 0, 3], D: [0, 5, 0], E: [4, 5, 0], F: [2, 5, 3] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AD", "DE", "FD"], noms: true }),
          micros: ["volume_solide_reconnaitre", "volume_representation"],
        },
        {
          enonce:
            "ABCDEFGH est un pavé droit dessiné en perspective cavalière : ABCD est la face du dessous, ABFE la face de devant.\na) Quelles arêtes sont dessinées en pointillés ?\nb) Sur le dessin, la face BCGF est un parallélogramme. Quelle est sa vraie nature ?\nc) Citer les trois arêtes parallèles à [AE].",
          correction:
            "a) Je repère le sommet qui est derrière, en bas, à gauche : c'est D. Les trois arêtes qui en partent sont cachées : [AD], [DC] et [DH].\nb) Toutes les faces d'un pavé droit sont des rectangles. BCGF est vue de biais : la perspective incline ses angles, mais en réalité ce sont des angles droits. BCGF est un rectangle.\nc) Les quatre arêtes « verticales » du pavé sont parallèles : [AE], [BF], [CG] et [DH]. La perspective conserve le parallélisme : sur le dessin aussi, elles sont parallèles.\n⛔ Le piège : croire que BCGF est un parallélogramme parce qu'elle est dessinée ainsi. Le dessin déforme les angles, jamais la nature d'une face.\nRéponse : [AD], [DC] et [DH] ; BCGF est un rectangle ; [BF], [CG] et [DH].",
          schema: pave(5, 3, 2, ["AD", "CD", "DH"], { noms: true }),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "On coupe chaque solide par un plan. Quelle est la forme de la section ?\na) Un cube, parallèlement à une face.\nb) Un cylindre, parallèlement à ses bases.\nc) Un cylindre, par un plan qui contient son axe.\nd) Une pyramide à base carrée, parallèlement à sa base.\ne) Une boule, par n'importe quel plan.",
          correction:
            "La section est toujours une figure PLANE. Sa forme dépend du solide ET du sens de la coupe.\na) Parallèlement à une face, le cube est coupé comme une tranche de pain de mie : la section est un carré, identique aux faces.\nb) Parallèlement aux bases, le cylindre donne une rondelle : un disque, de même rayon que les bases.\nc) Par un plan qui contient l'axe, le cylindre est coupé dans sa hauteur : la section est un rectangle (le dessin).\nd) Parallèlement à la base, la pyramide donne un carré plus petit que la base : une réduction de la base.\ne) Une boule coupée par un plan donne toujours un disque, dont le bord est un cercle.\n⛔ Le piège : croire que toute section d'un cylindre est un disque. Tout dépend du sens de la coupe : dans la hauteur, c'est un rectangle.\nRéponse : un carré ; un disque ; un rectangle ; un carré plus petit ; un disque.",
          schema: coupe("cylindre", "parallele_axe", "cylindre coupé selon son axe : un rectangle"),
          micros: ["volume_section"],
        },
        {
          enonce:
            "ABCDEFGH est un pavé droit avec AB = 4, AD = 3 et AE = 2. On prend A comme origine, l'axe des abscisses sur [AB], celui des ordonnées sur [AD] et celui des altitudes sur [AE].\nDonner les coordonnées de A, B, D, E, C et G.",
          correction:
            "Pour chaque sommet, je lis trois longueurs, toujours dans le même ordre : d'abord le long de [AB] (abscisse), puis le long de [AD] (ordonnée), enfin vers le haut, le long de [AE] (altitude).\nA est l'origine : A(0 ; 0 ; 0).\nB : j'avance de 4 le long de [AB], rien d'autre : B(4 ; 0 ; 0).\nD : 3 le long de [AD] : D(0 ; 3 ; 0).\nE : je monte de 2 : E(0 ; 0 ; 2).\nC : 4, puis 3, sans monter : C(4 ; 3 ; 0).\nG : 4, puis 3, puis je monte de 2 (le chemin orange) : G(4 ; 3 ; 2).\n⛔ Le piège : écrire les nombres dans le désordre, par exemple G(4 ; 2 ; 3). L'ordre est fixe : abscisse, ordonnée, altitude.\nRéponse : A(0 ; 0 ; 0), B(4 ; 0 ; 0), D(0 ; 3 ; 0), E(0 ; 0 ; 2), C(4 ; 3 ; 0), G(4 ; 3 ; 2).",
          schema: pave(4, 3, 2, ["AD", "CD", "DH"], { noms: true, axes: true, points: [{ nom: "G", p: [4, 3, 2], texte: "", chemin: true }] }),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "Paris a pour coordonnées géographiques (49° N ; 2° E) et Sydney (34° S ; 151° E).\na) Paris est-elle au nord ou au sud de l'équateur ? À l'est ou à l'ouest du méridien de Greenwich ?\nb) Même question pour Sydney.\nc) Un élève écrit Paris (2° N ; 49° E). Où tomberait ce point ?",
          correction:
            "La latitude se lit EN PREMIER : c'est l'écart à l'équateur, vers le Nord (N) ou vers le Sud (S). La longitude vient ensuite : l'écart au méridien de Greenwich, vers l'Est (E) ou vers l'Ouest (O).\na) Paris (49° N ; 2° E) : N, donc au nord de l'équateur ; E, donc à l'est de Greenwich, de très peu.\nb) Sydney (34° S ; 151° E) : S, donc au sud de l'équateur ; E, donc à l'est de Greenwich, presque à l'opposé (151° sur 180°).\nc) (2° N ; 49° E) voudrait dire 2° au nord de l'équateur et 49° à l'est de Greenwich : en plein océan Indien, au large de la Somalie, à plus de 5 000 km de Paris.\n⭐ Sur le dessin, les 49° de Paris sont un ANGLE, mesuré au centre de la Terre à partir de l'équateur.\n⛔ Le piège : inverser latitude et longitude. L'ordre est toujours (latitude ; longitude), comme sur un GPS.\nRéponse : Paris est au nord de l'équateur et à l'est de Greenwich ; Sydney est au sud de l'équateur et à l'est de Greenwich.",
          schema: globe({ centre: -48, paralleles: [0], meridiens: [0], villes: [{ nom: "Paris", lat: 49, lon: 2, angle: true }] }, "en orange l'équateur, en vert le méridien de Greenwich"),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "a) Quito, capitale de l'Équateur, a pour latitude 0°. Sur quelle ligne se trouve-t-elle ?\nb) L'observatoire de Greenwich, à Londres, a pour longitude 0°. Quelle ligne passe par lui ?\nc) Quelle est la latitude du pôle Nord ? Peut-on donner sa longitude ?\nd) Une latitude peut-elle valoir 120° ? Et une longitude ?",
          correction:
            "a) Latitude 0° : Quito est sur l'équateur, la ligne des points à 0° de latitude. Le pays porte d'ailleurs son nom.\nb) Longitude 0° : c'est le méridien de Greenwich, le méridien d'origine, choisi en 1884.\nc) Le pôle Nord est le point le plus éloigné de l'équateur vers le Nord : 90° N. Tous les méridiens s'y rejoignent : sa longitude n'est pas définie, n'importe laquelle convient.\nd) Une latitude va de 0° à 90°, vers le Nord ou vers le Sud : 120° est impossible. Une longitude va de 0° à 180°, vers l'Est ou vers l'Ouest : 120° E existe, ce méridien traverse la Chine.\n⛔ Le piège : donner la même étendue aux deux. La latitude s'arrête à 90° (au pôle), la longitude à 180° (de l'autre côté de la Terre).\nRéponse : l'équateur ; le méridien de Greenwich ; 90° N, longitude quelconque ; une latitude de 120° est impossible, une longitude de 120° est possible.",
          schema: globe({ centre: -40, paralleles: [0], meridiens: [0], villes: [{ nom: "Quito", lat: 0, lon: -79 }, { nom: "Greenwich", lat: 51, lon: 0 }] }, "en orange l'équateur, en vert le méridien de Greenwich"),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "On assimile la Terre à une sphère.\na) Un parallèle est la section de la sphère par un plan. Lequel ? Quelle est la forme de la section ?\nb) Quel est le plus grand des parallèles ?\nc) Le parallèle 60° N est-il plus long ou plus court que l'équateur ?\nd) Un méridien est-il aussi lié à une section de la sphère ? Par quel plan ?",
          correction:
            "a) Un parallèle est l'ensemble des points de même latitude. C'est la section de la sphère par un plan PARALLÈLE au plan de l'équateur : un cercle.\nb) Le plus grand est l'équateur : son plan passe par le centre de la Terre, et c'est la coupe par le centre qui donne le plus grand cercle. On l'appelle un grand cercle.\nc) Plus court. En montant vers le pôle, les plans de coupe s'éloignent du centre et les cercles rétrécissent, jusqu'au pôle, où il ne reste qu'un point. Le parallèle 60° N mesure même la moitié de l'équateur : environ 20 000 km.\nd) Oui : un méridien est la moitié de la section de la sphère par un plan qui contient l'axe des pôles. Cette section est un grand cercle, formé de deux méridiens opposés.\n⛔ Le piège : croire que tous les parallèles ont la même longueur, parce qu'ils sont parallèles. Parallèles ne veut pas dire égaux.\nRéponse : un plan parallèle à l'équateur, la section est un cercle ; l'équateur ; plus court, la moitié de l'équateur ; oui, un plan qui contient l'axe des pôles.",
          schema: globe({ centre: 0, paralleles: [-60, -30, 0, 30, 60], meridiens: [0], surligne: 60 }, "les parallèles rétrécissent vers les pôles"),
          micros: ["volume_section"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je fais un schéma, je lis les coordonnées dans l'ordre, je vérifie les lettres N, S, E, O.",
      rappel: [
        "Un sommet du pavé est l'origine, ses trois arêtes portent les trois axes. Pour atteindre un point : j'avance le long de l'axe des abscisses, puis de celui des ordonnées, puis je monte.",
        "Une section est une figure PLANE. Parallèle à une face d'un pavé : un rectangle de même taille que la face. Une sphère coupée par un plan : un cercle, le plus grand quand le plan passe par le centre.",
        "Pour un solide sans trou à faces planes : faces − arêtes + sommets = 2 (la relation d'Euler). C'est mon contrôle quand je compte.",
      ],
      exercices: [
        {
          enonce:
            "Une pièce a la forme d'un pavé droit : 6 m de long, 4 m de large, 3 m de haut. Un coin du sol, O, est l'origine du repère : abscisses le long de la longueur, ordonnées le long de la largeur, altitudes vers le plafond (en mètres).\na) Quelles sont les coordonnées du coin du plafond le plus éloigné de O ?\nb) Une lampe L est fixée au centre du plafond. Quelles sont ses coordonnées ?\nc) Un drone est au point D(5 ; 1 ; 2). Décrire comment l'atteindre depuis O.\nd) Le point (2 ; 7 ; 1) est-il dans la pièce ?",
          correction:
            "a) Le coin opposé est au bout des trois dimensions : 6 m de long, 4 m de large, 3 m de haut. Ses coordonnées sont (6 ; 4 ; 3).\nb) Le centre du plafond est au milieu de la longueur et au milieu de la largeur, $6 \\div 2 = 3$ et $4 \\div 2 = 2$, tout en haut : L(3 ; 2 ; 3).\nc) Je lis dans l'ordre : j'avance de 5 m le long de la longueur, puis de 1 m le long de la largeur, puis je monte de 2 m (le chemin orange).\nd) L'ordonnée vaut 7, mais la pièce n'a que 4 m de large : le point est dehors, derrière le mur.\n⛔ Le piège : lire (5 ; 1 ; 2) dans le désordre. Le point (1 ; 5 ; 2) serait à 5 m dans la largeur : hors de la pièce.\nRéponse : (6 ; 4 ; 3) ; L(3 ; 2 ; 3) ; 5 m, puis 1 m, puis 2 m vers le haut ; non.",
          schema: pave(6, 4, 3, ["AD", "CD", "DH"], { noms: { A: "O" }, axes: true, cotes: { AB: "6 m", AE: "3 m" }, points: [{ nom: "L", p: [3, 2, 3], etiquette: "dessus" }, { nom: "D", p: [5, 1, 2], chemin: true, etiquette: "droite" }] }),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "Sur le pont d'un porte-conteneurs, les conteneurs forment un bloc de 5 conteneurs de long, 3 de large et 4 de haut. Chacun est repéré par (rang dans la longueur ; rang dans la largeur ; étage), en comptant à partir de 1.\na) Combien de conteneurs y a-t-il à l'étage 4 ?\nb) Le conteneur rouge est en (4 ; 2 ; 3). Quel conteneur est juste au-dessus de lui ? Juste en dessous ?\nc) Pour le décharger, il faut d'abord enlever tous ceux qui sont au-dessus de lui. Combien ?\nd) Un conteneur mesure 2,59 m de haut. À quelle hauteur au-dessus du pont se trouve le toit du conteneur rouge ?",
          correction:
            "a) Un étage est une couche du bloc : 5 conteneurs de long sur 3 de large, soit $5 \\times 3 = 15$ conteneurs.\nb) Au-dessus, seul l'étage change, les deux premiers nombres restent : (4 ; 2 ; 4). En dessous : (4 ; 2 ; 2).\nc) Le rouge est à l'étage 3 et le bloc en a 4 : au-dessus de lui, il n'y a que (4 ; 2 ; 4). Un seul conteneur à enlever.\nd) Le toit du rouge est en haut du 3e étage : trois conteneurs empilés, $3 \\times 2{,}59 = 7{,}77$ m au-dessus du pont.\n⛔ Le piège : chercher (2 ; 4 ; 3), le rouge écrit dans le désordre. Ce conteneur n'existe même pas : le bloc n'a que 3 rangées dans la largeur.\nRéponse : 15 ; (4 ; 2 ; 4) et (4 ; 2 ; 2) ; 1 ; 7,77 m.",
          schema: legendeSous(pave(5, 3, 4, ["AD", "CD", "DH"], { grille: true, boites: [{ de: [3, 1, 2], a: [4, 2, 3] }] }), "le conteneur rouge, vu en transparence (sans les proportions)"),
          micros: ["volume_representation", "volume_geometrie_espace_defi"],
        },
        {
          enonce:
            "ABCDEFGH est un pavé droit. Dans le repère d'origine A, les axes sont portés par [AB], [AD] et [AE], et G(5 ; 3 ; 4).\na) Donner les longueurs AB, AD et AE.\nb) Donner les coordonnées de B, C, D, E, F et H.\nc) Le point I est le milieu de [AG], le centre du pavé. Quelles sont ses coordonnées ?",
          correction:
            "a) G est le sommet opposé à A : ses trois coordonnées sont les trois dimensions du pavé. AB = 5, AD = 3 et AE = 4.\nb) Je repère chaque sommet par les arêtes qui y mènent depuis A.\nB(5 ; 0 ; 0), C(5 ; 3 ; 0), D(0 ; 3 ; 0) : les trois sont au sol, altitude 0.\nE(0 ; 0 ; 4), F(5 ; 0 ; 4), H(0 ; 3 ; 4) : les trois sont en haut, altitude 4.\nc) Le milieu de [AG] a pour coordonnées les moitiés de celles de G : $5 \\div 2 = 2{,}5$ ; $3 \\div 2 = 1{,}5$ ; $4 \\div 2 = 2$. Donc I(2,5 ; 1,5 ; 2).\n⛔ Le piège : placer F au-dessus de A. ABFE est la face de devant : F est au-dessus de B, en haut à droite.\nRéponse : AB = 5, AD = 3, AE = 4 ; B(5 ; 0 ; 0), C(5 ; 3 ; 0), D(0 ; 3 ; 0), E(0 ; 0 ; 4), F(5 ; 0 ; 4), H(0 ; 3 ; 4) ; I(2,5 ; 1,5 ; 2).",
          schema: pave(5, 3, 4, ["AD", "CD", "DH"], { noms: true, axes: true, segments: ["AG"], points: [{ nom: "I", p: [2.5, 1.5, 2] }] }),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "Voici quatre villes et leurs coordonnées géographiques, arrondies au degré : Reykjavik (64° N ; 22° O) ; Quito (0° ; 79° O) ; Tokyo (36° N ; 140° E) ; Sydney (34° S ; 151° E).\na) Laquelle est la plus au nord ?\nb) Lesquelles sont dans l'hémisphère Sud ?\nc) Lesquelles sont à l'ouest du méridien de Greenwich ?\nd) Un élève dit : « Tokyo et Sydney sont presque à la même latitude, 36° et 34°. » Qu'en penser ?",
          correction:
            "a) Je compare les latitudes NORD : Reykjavik 64° N, Tokyo 36° N. Reykjavik est la plus au nord.\nb) Seule Sydney a une latitude S. Quito, à 0°, est sur l'équateur (en réalité juste au sud, à moins de 30 km).\nc) Les longitudes O sont à l'ouest de Greenwich : Reykjavik et Quito.\nd) Faux : 36° N et 34° S sont de part et d'autre de l'équateur. L'écart de latitude est $36 + 34 = 70$ degrés, pas 2.\n⛔ Le piège : comparer les nombres sans regarder la lettre. N ou S, E ou O, c'est la moitié de l'information.\nRéponse : Reykjavik ; Sydney ; Reykjavik et Quito ; faux, 70 degrés de latitude les séparent.",
          schema: planisphere(
            [
              { nom: "Reykjavik", lat: 64, lon: -22 },
              { nom: "Quito", lat: 0, lon: -79 },
              { nom: "Tokyo", lat: 36, lon: 140, gauche: true },
              { nom: "Sydney", lat: -34, lon: 151, gauche: true },
            ],
            "en orange l'équateur, en vert Greenwich ; lignes tous les 30°",
          ),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "Sur le planisphère ci-dessous, les lignes sont tracées tous les 30°. L'équateur est en orange, le méridien de Greenwich en vert.\nDonner les coordonnées géographiques des points A, B, C et D.",
          figure: planisphere(
            [
              { nom: "A", lat: 60, lon: -30 },
              { nom: "B", lat: 30, lon: 120 },
              { nom: "C", lat: 0, lon: -90 },
              { nom: "D", lat: -30, lon: 150, gauche: true },
            ],
            "lignes tous les 30°",
          ),
          correction:
            "Pour chaque point, je lis d'abord la latitude : combien de lignes au-dessus (N) ou au-dessous (S) de l'équateur, 30° par ligne. Puis la longitude : combien de lignes à droite (E) ou à gauche (O) de Greenwich.\nA : 2 lignes au-dessus, 1 à gauche. A(60° N ; 30° O), en plein Atlantique, au sud-ouest de l'Islande.\nB : 1 ligne au-dessus, 4 à droite. B(30° N ; 120° E), tout près de Hangzhou, en Chine.\nC : sur l'équateur, 3 à gauche. C(0° ; 90° O), aux îles Galápagos.\nD : 1 ligne au-dessous, 5 à droite. D(30° S ; 150° E), dans l'est de l'Australie.\n⛔ Le piège : lire la longitude d'abord, comme l'abscisse d'un repère du plan. Pour un lieu sur la Terre, la latitude vient en premier.\nRéponse : A(60° N ; 30° O) ; B(30° N ; 120° E) ; C(0° ; 90° O) ; D(30° S ; 150° E).",
          schema: planisphere(
            [
              { nom: "A", lat: 60, lon: -30, guides: true },
              { nom: "B", lat: 30, lon: 120, guides: true },
              { nom: "C", lat: 0, lon: -90, guides: true },
              { nom: "D", lat: -30, lon: 150, gauche: true, guides: true },
            ],
            "je descends à l'équateur, je rejoins Greenwich",
          ),
          micros: ["volume_representation"],
        },
        {
          enonce:
            "a) Combien une pyramide à base carrée a-t-elle de faces, d'arêtes, de sommets ?\nb) Même question pour une pyramide à base hexagonale (6 côtés).\nc) La base d'une pyramide a n côtés. Exprimer en fonction de n son nombre de faces, d'arêtes et de sommets, puis vérifier que faces − arêtes + sommets = 2.\nd) Une pyramide peut-elle avoir 15 arêtes ?",
          correction:
            "Une pyramide, c'est une base, plus un triangle par côté de la base, tous réunis au sommet.\na) Base carrée : 1 base + 4 triangles = 5 faces ; 4 arêtes de base + 4 qui montent au sommet = 8 arêtes ; 4 sommets de base + le sommet = 5 sommets.\nb) Base hexagonale (le dessin) : 1 + 6 = 7 faces ; 6 + 6 = 12 arêtes ; 6 + 1 = 7 sommets.\nc) Avec n côtés : n + 1 faces, 2n arêtes (n autour de la base, n qui montent), n + 1 sommets. Et $(n + 1) - 2n + (n + 1) = 2$ : ça marche pour tout n.\nd) Le nombre d'arêtes vaut 2n : il est toujours PAIR. 15 est impair : aucune pyramide n'a 15 arêtes.\n⛔ Le piège : oublier les arêtes cachées. Sur le dessin, 5 arêtes sont en pointillés : je compte 12, pas 7.\nRéponse : 5, 8, 5 ; 7, 12, 7 ; n + 1, 2n, n + 1 ; non, le nombre d'arêtes d'une pyramide est toujours pair.",
          schema: solide({ sommets: { A: [-2.82, -1.03, 0], B: [-0.52, -2.95, 0], C: [2.3, -1.93, 0], D: [2.82, 1.03, 0], E: [0.52, 2.95, 0], F: [-2.3, 1.93, 0], S: [0, 0, 4] }, aretes: ["AB", "BC", "CD", "DE", "EF", "FA", "SA", "SB", "SC", "SD", "SE", "SF"], cachees: ["DE", "EF", "FA", "SE", "SF"] }),
          micros: ["volume_solide_reconnaitre", "volume_geometrie_espace_defi"],
        },
        {
          enonce:
            "a) Un pavé droit de 6 cm × 4 cm × 3 cm est coupé par un plan parallèle à sa face de 6 cm sur 3 cm. Nature et dimensions de la section ?\nb) Un cylindre de rayon 5 cm et de hauteur 12 cm est coupé par un plan qui contient son axe. Nature et dimensions de la section ?\nc) Une boule de centre O et de rayon 5 cm est coupée par un plan situé à 3 cm de O. Quel est le rayon du disque obtenu ?",
          correction:
            "a) Une coupe parallèle à une face donne une figure identique à cette face : un rectangle de 6 cm sur 3 cm.\nb) Le plan passe par l'axe : il traverse le cylindre sur toute sa largeur, c'est-à-dire un DIAMÈTRE, et sur toute sa hauteur. La section est un rectangle de $2 \\times 5 = 10$ cm sur 12 cm.\nc) Je nomme H le centre du disque et M un point de son bord (le dessin). Le triangle OHM est rectangle en H, avec OH = 3 cm et OM = 5 cm, un rayon de la boule. Par le théorème de Pythagore : $HM^2 = 5^2 - 3^2 = 25 - 9 = 16$, donc HM = 4 cm.\n⛔ Le piège au b) : prendre le rayon, 5 cm, pour la largeur. Le plan coupe le cylindre selon un diamètre : 10 cm.\nRéponse : un rectangle de 6 cm sur 3 cm ; un rectangle de 10 cm sur 12 cm ; un disque de rayon 4 cm.",
          schema: coupeBoule(5, 3),
          micros: ["volume_section"],
        },
        {
          enonce:
            "ABCDEFGH est un cube de 4 cm d'arête, dessiné en perspective cavalière avec des fuyantes réduites de moitié. ABCD est la face du dessous, ABFE la face de devant.\na) Sur le dessin, [AB] mesure 4 cm. Combien mesure [BC] sur le dessin ? Et en réalité ?\nb) Sur le dessin, l'angle ABC mesure 135°. Quelle est sa vraie mesure ?\nc) Quelle est la vraie nature du triangle ABC ? Calculer AC, arrondi au centième.\nd) Quelles arêtes sont cachées ?",
          correction:
            "a) [BC] part vers l'arrière : c'est une fuyante, réduite de moitié. Sur le dessin, $4 \\div 2 = 2$ cm. En réalité, c'est une arête du cube : 4 cm.\nb) ABCD est une face du cube, donc un carré : l'angle ABC est droit, il mesure 90°. Le dessin l'a ouvert à 135°.\nc) AB = BC = 4 cm et l'angle en B est droit : ABC est rectangle et isocèle en B. Par le théorème de Pythagore : $AC^2 = 4^2 + 4^2 = 32$, donc $AC = \\sqrt{32} \\approx 5{,}66$ cm.\nd) Le sommet D est derrière, en bas, à gauche : [AD], [DC] et [DH] sont cachées.\n⛔ Le piège : mesurer à la règle sur le dessin. Les fuyantes sont raccourcies et les angles déformés : je calcule avec les vraies dimensions.\nRéponse : 2 cm sur le dessin, 4 cm en réalité ; 90° ; ABC est rectangle isocèle en B et AC ≈ 5,66 cm ; [AD], [DC] et [DH].",
          schema: pave(4, 4, 4, ["AD", "CD", "DH"], { noms: true, segments: ["AC"] }),
          micros: ["volume_representation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Un schéma d'abord, puis les coordonnées dans l'ordre, et une phrase de réponse.",
      rappel: [
        "La latitude est un ANGLE mesuré au centre de la Terre, à partir de l'équateur. Deux lieux sur le même méridien, de part et d'autre de l'équateur : l'angle qui les sépare est la SOMME de leurs latitudes.",
        "Le tour de la Terre par les pôles mesure environ 40 000 km : sur un méridien, la distance est proportionnelle à l'angle, et 1° vaut environ 111 km.",
      ],
      exercices: [
        {
          titre: "Le drone de la salle de sport",
          enonce:
            "Une salle de sport est un pavé droit de 20 m de long, 12 m de large et 8 m de haut. Un coin du sol, O, est l'origine du repère (en mètres). Un drone décolle de P(2 ; 2 ; 0) et reçoit trois ordres : avancer de 12 m selon l'axe des abscisses, puis de 6 m selon l'axe des ordonnées, puis monter de 5 m.\na) Quelles sont les coordonnées de son point d'arrivée M ?\nb) Une caméra C est fixée au centre du plafond. Quelles sont ses coordonnées ?\nc) Quels ordres donner au drone, depuis M, pour qu'il se place 2 m sous la caméra ?\nd) Arrivé là, le pilote ordonne « monter de 3 m ». Que se passe-t-il ?",
          correction:
            "a) Chaque ordre ne change qu'UNE coordonnée. Abscisse : $2 + 12 = 14$. Ordonnée : $2 + 6 = 8$. Altitude : $0 + 5 = 5$. Donc M(14 ; 8 ; 5), au bout du chemin orange.\nb) Le centre du plafond est au milieu de la longueur et au milieu de la largeur, tout en haut : $20 \\div 2 = 10$ et $12 \\div 2 = 6$, donc C(10 ; 6 ; 8).\nc) 2 m sous la caméra, c'est le point (10 ; 6 ; 6). Depuis M(14 ; 8 ; 5) : reculer de $14 - 10 = 4$ m selon les abscisses, reculer de $8 - 6 = 2$ m selon les ordonnées, monter de $6 - 5 = 1$ m.\nd) L'altitude passerait à $6 + 3 = 9$ m, mais le plafond est à 8 m, et la caméra juste au-dessus du drone : il la percute au bout de 2 m.\n⛔ Le piège : ajouter les 12 m à la mauvaise coordonnée. « Selon l'axe des abscisses » ne touche QUE le premier nombre.\nRéponse : M(14 ; 8 ; 5) ; C(10 ; 6 ; 8) ; reculer de 4 m, reculer de 2 m, monter de 1 m ; le drone heurte la caméra.",
          schema: pave(20, 12, 8, ["AD", "CD", "DH"], { noms: { A: "O" }, chemin: [[2, 2, 0], [14, 2, 0], [14, 8, 0], [14, 8, 5]], points: [{ nom: "P", p: [2, 2, 0] }, { nom: "M", p: [14, 8, 5], etiquette: "droite" }, { nom: "C", p: [10, 6, 8], etiquette: "dessus" }] }),
          micros: ["volume_representation", "volume_geometrie_espace_defi"],
        },
        {
          titre: "De Stockholm au Cap",
          enonce:
            "Stockholm a pour coordonnées (59° N ; 18° E) et Le Cap (34° S ; 18° E).\na) Que remarque-t-on sur leurs longitudes ? Qu'en déduire ?\nb) Quel angle, mesuré au centre de la Terre, sépare les deux villes ?\nc) Le tour de la Terre par les pôles mesure environ 40 000 km. Quelle distance sépare les deux villes le long du méridien ? Arrondir à la centaine de kilomètres.\nd) Un élève trouve 25° au b). Quelle est son erreur ?",
          correction:
            "a) Même longitude, 18° E : les deux villes sont sur le même méridien. Si on coupe la Terre par le plan de ce méridien, on obtient un grand cercle qui passe par les deux villes (le dessin).\nb) Les latitudes se mesurent à partir de l'équateur, chacune de son côté : 59° vers le Nord, 34° vers le Sud. L'angle total est $59 + 34 = 93$ degrés.\nc) Le tour complet, 360°, mesure 40 000 km, et la distance est proportionnelle à l'angle : $\\dfrac{93}{360} \\times 40\\,000 \\approx 10\\,333$ km, soit environ 10 300 km.\nd) Il a calculé $59 - 34 = 25$, comme si les deux villes étaient du même côté de l'équateur. L'une est au Nord, l'autre au Sud : j'additionne.\n⭐ Contrôle : 1° de méridien vaut $40\\,000 \\div 360 \\approx 111$ km, et $93 \\times 111 = 10\\,323$ km. Même résultat, à la centaine près.\nRéponse : les deux villes sont sur le même méridien ; 93° ; environ 10 300 km.",
          schema: coupeMeridien([{ nom: "Stockholm", lat: 59 }, { nom: "Le Cap", lat: -34 }]),
          micros: ["volume_representation", "volume_section", "volume_geometrie_espace_defi"],
        },
        {
          titre: "Les antipodes",
          enonce:
            "L'antipode d'un lieu est le point de la Terre diamétralement opposé : on l'atteint en traversant la Terre en ligne droite, par son centre.\na) Madrid a pour coordonnées (40° N ; 4° O). Quelles sont celles de son antipode ?\nb) Les îles des Antipodes, en Nouvelle-Zélande, sont en (50° S ; 179° E). Où se trouve leur antipode ?\nc) Énoncer la règle qui donne l'antipode d'un lieu.",
          correction:
            "a) Traverser par le centre fait passer de l'autre côté de l'équateur, à la même distance : la latitude garde son nombre et change de lettre, 40° N devient 40° S.\nPour la longitude, je fais le demi-tour de la Terre : $180 - 4 = 176$, et je passe de l'autre côté de Greenwich, O devient E. L'antipode de Madrid est (40° S ; 176° E) : en Nouvelle-Zélande, près du village de Weber.\nb) Même règle : 50° S devient 50° N, et $180 - 179 = 1$, E devient O. Le point (50° N ; 1° O) est en Normandie, près de Barfleur, dans le Cotentin. Ces îles doivent leur nom à leur position : presque à l'opposé de l'Europe de l'Ouest.\nc) Latitude : le même nombre, N et S échangés. Longitude : 180 moins le nombre, E et O échangés.\n⛔ Le piège : garder 4° et changer seulement la lettre. Le point (40° S ; 4° E) est en plein océan, au sud-ouest de l'Afrique, pas du tout à l'opposé de Madrid.\nRéponse : (40° S ; 176° E) ; (50° N ; 1° O), en Normandie ; la latitude garde son nombre et change de côté, la longitude devient 180 moins son nombre et change de côté.",
          schema: planisphere(
            [
              { nom: "Madrid", lat: 40, lon: -4 },
              { nom: "antipode", lat: -40, lon: 176, gauche: true },
            ],
            "Madrid et son antipode, de part et d'autre de l'équateur",
          ),
          micros: ["volume_representation", "volume_geometrie_espace_defi"],
        },
        {
          titre: "Le ballon de football",
          enonce:
            "Le ballon Telstar, dessiné pour la Coupe du monde de 1970, est cousu de 12 pentagones et 20 hexagones. On le voit comme un solide à faces planes : chaque arête est commune à exactement deux pièces, et en chaque sommet se rejoignent exactement trois pièces.\na) Combien le ballon a-t-il de faces ?\nb) Combien a-t-il d'arêtes ?\nc) Combien a-t-il de sommets ?\nd) Vérifier la relation faces − arêtes + sommets = 2.",
          correction:
            "a) Chaque pièce est une face : $12 + 20 = 32$ faces.\nb) Je compte les côtés de toutes les pièces : $12 \\times 5 = 60$ pour les pentagones, $20 \\times 6 = 120$ pour les hexagones, $60 + 120 = 180$ côtés. Mais chaque arête est le côté de DEUX pièces : je l'ai comptée deux fois. $180 \\div 2 = 90$ arêtes.\nc) Même idée : les 180 coins des pièces se regroupent par trois en chaque sommet. $180 \\div 3 = 60$ sommets.\nd) $32 - 90 + 60 = 2$. La relation d'Euler est vérifiée : le décompte est cohérent.\n⛔ Le piège : s'arrêter à 180 arêtes. Deux pièces cousues partagent la même couture : chaque arête est comptée deux fois.\nRéponse : 32 faces, 90 arêtes et 60 sommets.",
          schema: tableauProba(
            ["pièces", "nombre", "côtés chacune", "côtés en tout"],
            [
              ["pentagones", "12", "5", "60"],
              ["hexagones", "20", "6", "120"],
              ["total", "32", "", "180"],
            ],
            [[2, 3]],
          ),
          micros: ["volume_solide_reconnaitre", "volume_geometrie_espace_defi"],
        },
      ],
    },
  ],
};
