// ─── Fiche d'exercices : se repérer (4e) — 20 exercices corrigés ─────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-reperage.tsx` et sur les
// SEPT micros du coach de 4e (notionId reperage) : lire une abscisse, placer
// une abscisse, repérer un rationnel, le plan, le pavé, la sphère, les défis.
// Le programme de 4e : la droite graduée (relatifs et fractions), le plan muni
// d'un repère, le pavé droit et la sphère terrestre. ⛔ Pas de distance dans le
// plan par Pythagore : les longueurs se comptent en carreaux sur des segments
// horizontaux ou verticaux ; le milieu se calcule par la moyenne (micro défi).
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni A(−6) et B(6), ni M(−4)
// et R(6), ni le pas de 5, ni 7/4 et 17/5, ni (3 ; 5) et (5 ; 3), ni (2 ; 6),
// ni le pavé 4 × 3 × 2, ni Saint-Denis, Paris et Quito, ni le bateau et
// l'avion) — ni ceux de la feuille de 3e (le drone, les conteneurs, Stockholm
// et Le Cap, les antipodes, Reykjavik, Tokyo, Sydney).
//
// ⚠️⚠️ L'ORDONNÉE MONTE. Un ancien gabarit du coach comptait l'ordonnée vers
// le BAS (« ordonnée écran ») : la feuille le dit, le fait calculer, et nomme
// le piège (exercices 6, 15, 17). Le script de recalcul rejoue chaque
// déplacement avec « vers le haut = + » et relit les flèches dessinées.
//
// Les pièges nommés : compter les graduations sans multiplier par le pas (1,
// 2), retourner la fraction (3), placer −5/4 entre −1 et 0 (4), l'ordonnée
// écrite en premier (5, 11), l'ordonnée comptée vers le bas comme sur un écran
// (6, 15, 17), trois coordonnées dans le désordre (7, 13), la latitude au-delà
// de 90° (8), des longueurs soustraites de part et d'autre de Greenwich ou de
// l'équateur (14, 20), une part lue comme un dixième (9), une fraction non
// réécrite dans le bon dénominateur (10), les deux axes de symétrie confondus
// (12), la moyenne des quatre nombres pour un milieu (16), un écart calculé
// sans le signe (18), les carrés colorés comptés comme des cubes (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - coordonnées : GeoNames (geonames.org), arrondies au degré — Rio de Janeiro
//   22,91° S 43,18° O ; New York 40,71° N 74,01° O ; Naples 40,85° N 14,27° E ;
//   Lima 12,04° S 77,03° O ; mont Blanc 45,83° N 6,86° E ; Kilimandjaro (Uhuru)
//   3,08° S 37,35° E ; Aconcagua 32,65° S 70,01° O ; Everest 27,99° N
//   86,93° E — ex. 8, 14, 20 ;
// - altitudes : mont Blanc 4 805,59 m (relevé de 2021 des géomètres-experts de
//   Haute-Savoie), Kilimandjaro 5 895 m (Tanzania National Parks), Aconcagua
//   6 961 m, Everest 8 848,86 m (mesure commune Chine-Népal, décembre 2020) —
//   ex. 20 ;
// - records de température : OMM, Weather and Climate Extremes Archive —
//   −89,2 °C à Vostok (Antarctique) le 21 juillet 1983, 56,7 °C à Furnace Creek
//   (vallée de la Mort) le 10 juillet 1913 ; Paris-Montsouris 42,6 °C le
//   25 juillet 2019 (Météo-France) — ex. 18 ;
// - 1° de méridien ≈ 111 km : tour de la Terre par les pôles ≈ 40 008 km
//   (ellipsoïde WGS 84), divisé par 360 — ex. 20 ;
// - Rubik's Cube : inventé en 1974 par Ernő Rubik, 27 petits cubes, 54 carrés
//   colorés — ex. 19 ;
// - la course d'orientation (un carreau pour 100 m) et l'hélicoptère à 5 500 m
//   sont IMAGINÉS, à l'ordre de grandeur réel — ex. 17 et 20.
//
// ⭐ LES SCHÉMAS : les vingt corrigés en ont un. Quatre dessins :
// - `graduee` (SVG local) : la droite graduée avec ses SOUS-graduations sans
//   nombre — le canvas `number_line` écrit un nombre sous chaque graduation, ce
//   qui rend illisible une unité partagée en 3, 4 ou 6. Étiquettes des points
//   étagées quand elles se touchent. `lus` : les seules graduations chiffrées ;
//   `texte` : l'étiquette du point, qui finit par sa valeur (relue par le script).
// - `vecteurs` (figures.tsx) : le plan, y VERS LE HAUT, points à 2 carreaux au
//   moins des bords du cadre et hors des axes.
// - `pave` / `solide` : repris de la feuille de géométrie dans l'espace de 3e
//   (perspective cavalière, arêtes cachées en pointillés) ; ses `boites` ne
//   dessinent ici que les faces EXTÉRIEURES du pavé — les carrés d'un Rubik's
//   Cube —, chacune de sa couleur.
// - `globe` et `planisphere` : repris de la même feuille ; le globe sait
//   dessiner l'angle d'une latitude SUD, le planisphère surligne un parallèle.
// Écrire points, abscisses et coordonnées EN CLAIR dans les appels : le script
// les relit. Textes SVG nus (« 2/3 », « −89,2 »), jamais de `$`.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-reperage-4e.mjs`.
//
// Micro-compétences : abscisse_lire (1, 9, 18), abscisse_placer (2, 4, 10, 18),
// abscisse_fraction (3, 4, 10), repere_plan (5, 6, 11, 12, 15, 16, 17),
// repere_espace (7, 13, 19), repere_terre (8, 14, 20), repere_defi (9, 12, 13,
// 16, 17, 18, 19, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, vecteurs } from "@/lib/fiches-exercices/figures";

type P3 = [number, number, number];
type PointEspace = { nom: string; p: P3; texte?: string; chemin?: boolean; cote?: "g" | "d" };
type OptionsSolide = {
  /** true : tous les sommets nommés ; un objet : seulement ceux-là, renommés. */
  noms?: boolean | Record<string, string>;
  axes?: boolean;
  points?: PointEspace[];
  grille?: boolean;
  boites?: { de: P3; a: P3; couleur: string }[];
};

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const ARETE = "#1e3a8a";
const CACHEE = "#64748b";
const ENCRE = "#0f172a";
const CADRE = "mx-auto w-full max-w-[18rem] print:max-w-[13rem]";
const rad = (d: number) => (d * Math.PI) / 180;
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };
/** « −0,6 » : le signe moins typographique et la virgule. */
const nombre = (x: number) => String(+x.toFixed(4)).replace("-", "−").replace(".", ",");

const legendeSous = (dessin: ReactNode, texte: string) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

type PointDroite = { v: number; nom: string; texte?: string; couleur?: string };

/**
 * La droite graduée : une graduation chiffrée tous les `pas` (seulement celles
 * de `lus`, si on le donne), et `sous` parts égales entre deux — sans nombre.
 * Les points sont posés SUR l'axe ; leurs étiquettes montent d'un étage quand
 * elles se touchent. Cadre 300 : ≥ 12 px à 375.
 */
const graduee = (
  o: { min: number; max: number; pas: number; sous?: number; lus?: number[]; points: PointDroite[] },
  legende?: string,
) => {
  const W = 300;
  const G = 24;
  const D = 276;
  const X = (v: number) => G + ((v - o.min) / (o.max - o.min)) * (D - G);
  const sous = o.sous ?? 1;
  const n = Math.round((o.max - o.min) / o.pas);
  // ⛔ MESURÉ LE 25/09 À 375 PX : le dessin y fait ~235 px pour un viewBox de
  // 300 ; en 13, les nombres tombaient à 10,2 px. En 15 : 11,75 px.
  const LARG = 9.6;
  const etiquettes = o.points
    .map((p, i) => {
      const t = p.texte ?? p.nom;
      const w = t.length * LARG + 8;
      const x = Math.min(W - w / 2 - 2, Math.max(w / 2 + 2, X(p.v)));
      return { i, t, x, g: x - w / 2, d: x + w / 2 };
    })
    .sort((a, b) => a.g - b.g);
  const fins: number[] = [];
  const etage: number[] = [];
  for (const e of etiquettes) {
    let k = 0;
    while (fins[k] !== undefined && e.g < fins[k] + 3) k++;
    fins[k] = e.d;
    etage[e.i] = k;
  }
  const axeY = 34 + 22 * Math.max(1, fins.length);
  const H = axeY + 32;
  const dessin: ReactNode[] = [
    <line key="axe" x1={G - 14} y1={axeY} x2={D + 16} y2={axeY} stroke={ENCRE} strokeWidth={2.4} strokeLinecap="round" />,
    <path key="fl" d={`M ${D + 8} ${axeY - 6} L ${D + 16} ${axeY} L ${D + 8} ${axeY + 6}`} fill="none" stroke={ENCRE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />,
  ];
  for (let i = 0; i <= n; i++) {
    const v = o.min + i * o.pas;
    const x = X(v);
    dessin.push(<line key={`g${i}`} x1={x} y1={axeY - 9} x2={x} y2={axeY + 9} stroke={ENCRE} strokeWidth={2} />);
    if (!o.lus || o.lus.some((l) => Math.abs(l - v) < 1e-9))
      dessin.push(
        <text key={`n${i}`} x={x} y={axeY + 28} textAnchor="middle" fontSize={15} fontWeight={800} fill={ENCRE} {...halo}>
          {nombre(v)}
        </text>,
      );
    if (i < n)
      for (let j = 1; j < sous; j++) {
        const xs = X(v + (j * o.pas) / sous);
        dessin.push(<line key={`s${i}-${j}`} x1={xs} y1={axeY - 5} x2={xs} y2={axeY + 5} stroke={ENCRE} strokeWidth={1.3} />);
      }
  }
  etiquettes.forEach((e) => {
    const p = o.points[e.i];
    const couleur = p.couleur ?? ROUGE;
    const y = axeY - 17 - 22 * etage[e.i];
    dessin.push(
      <line key={`r${e.i}`} x1={X(p.v)} y1={axeY - 6} x2={X(p.v)} y2={y + 3} stroke={couleur} strokeWidth={1.2} strokeDasharray="2 2" />,
      <circle key={`c${e.i}`} cx={X(p.v)} cy={axeY} r={5} fill={couleur} stroke="white" strokeWidth={1.5} />,
      <text key={`t${e.i}`} x={e.x} y={y} textAnchor="middle" fontSize={15} fontWeight={900} fill={couleur} {...halo}>
        {e.t}
      </text>,
    );
  });
  const svg = (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Droite graduée" className="block h-auto w-full">
      {dessin}
    </svg>
  );
  return legende ? legendeSous(svg, legende) : <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">{svg}</div>;
};

/**
 * Un solide à faces planes, en perspective cavalière (repris de la feuille de
 * géométrie dans l'espace de 3e). Les arêtes de `cachees` sont en pointillés.
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
    const [Xp, Yp] = proj(q);
    return [(Xp - minX) * e, (maxY - Yp) * e];
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
  const face = (pts: P3[], props: Record<string, unknown>) => (
    <polygon key={`f${cle++}`} points={pts.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ")} {...props} />
  );

  const dessin: ReactNode[] = [];
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
  // ⭐ Seules les faces d'une boîte qui sont SUR le pavé (devant, dessus,
  // droite) se dessinent : ce sont les carrés colorés qu'on voit.
  for (const bo of s.boites ?? []) {
    const [x0, y0, z0] = bo.de;
    const [x1, y1, z1] = bo.a;
    const style = { fill: bo.couleur, fillOpacity: 0.75, stroke: "white", strokeWidth: 1.5 };
    if (y0 === 0) dessin.push(face([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], style));
    if (z1 === maxi[2]) dessin.push(face([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], style));
    if (x1 === maxi[0]) dessin.push(face([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], style));
  }
  for (const n of s.aretes.filter((n) => !s.cachees.includes(n))) dessin.push(ligne(...arete(n), { stroke: ARETE, strokeWidth: 2.2 }));
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
  const nommes: [string, string][] = s.noms === true ? noms.map((n) => [n, n]) : s.noms ? Object.entries(s.noms) : [];
  for (const [n, affiche] of nommes) {
    const [x, y] = ecran(s.sommets[n]);
    const L = Math.hypot(x - gx, y - gy) || 1;
    dessin.push(texte(x + (13 * (x - gx)) / L, y + (13 * (y - gy)) / L + 5, affiche, "middle"));
  }
  for (const pt of s.points ?? []) {
    const [x, y] = ecran(pt.p);
    dessin.push(<circle key={`c${cle++}`} cx={x} cy={y} r={4.5} fill={ROUGE} stroke="white" strokeWidth={1.5} />);
    const t = pt.texte ?? pt.nom;
    if (t) {
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
 * longitude `centre`. `angle` : la latitude dessinée comme un ANGLE, au centre
 * — vers le Nord ou vers le Sud.
 */
const globe = (o: { centre: number; paralleles?: number[]; meridiens?: number[]; villes?: Ville[] }, legende: string) => {
  const R = 90;
  const cx = 125;
  const cy = 122;
  const T = rad(20);
  const proj = (lat: number, lon: number) => {
    const f = rad(lat);
    const l = rad(lon - o.centre);
    const Xg = Math.cos(f) * Math.sin(l);
    const Yg = Math.sin(f);
    const Zg = Math.cos(f) * Math.cos(l);
    return { x: cx + R * Xg, y: cy - R * (Yg * Math.cos(T) - Zg * Math.sin(T)), vu: Yg * Math.sin(T) + Zg * Math.cos(T) >= -1e-9 };
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
  const dessin: ReactNode[] = [<circle key="terre" cx={cx} cy={cy} r={R} fill="#eff6ff" stroke={ARETE} strokeWidth={2} />];
  for (const lat of o.paralleles ?? []) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 4) pts.push(proj(lat, lon));
    dessin.push(...courbe(pts, lat === 0 ? ORANGE : "#94a3b8", lat === 0 ? 2.6 : 1.3));
  }
  for (const lon of o.meridiens ?? []) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 3) pts.push(proj(lat, lon));
    dessin.push(...courbe(pts, lon === 0 ? VERT : "#94a3b8", lon === 0 ? 2.6 : 1.3));
  }
  const texte = (x: number, y: number, t: string, ancre: "start" | "middle" | "end", couleur = ENCRE) => (
    <text key={`t${cle++}`} x={x} y={y} textAnchor={ancre} fontSize={15} fontWeight={900} fill={couleur} {...halo}>
      {t}
    </text>
  );
  dessin.push(texte(cx, cy - R * Math.cos(T) - 6, "N", "middle"), texte(cx, cy + R * Math.cos(T) + 17, "S", "middle"));
  if ((o.paralleles ?? []).includes(0)) dessin.push(texte(cx + R + 4, cy + 5, "équateur", "start", ORANGE));
  for (const v of o.villes ?? []) {
    const p = proj(v.lat, v.lon);
    if (v.angle) {
      const e0 = proj(0, v.lon);
      const sens = Math.sign(v.lat) || 1;
      const arc = [];
      for (let t = 0; Math.abs(t) <= Math.abs(v.lat); t += 2 * sens) {
        const q = proj(t, v.lon);
        arc.push(`${(cx + 0.35 * (q.x - cx)).toFixed(1)},${(cy + 0.35 * (q.y - cy)).toFixed(1)}`);
      }
      const m = proj(v.lat / 2, v.lon);
      dessin.push(
        <line key={`a${cle++}`} x1={cx} y1={cy} x2={e0.x} y2={e0.y} stroke={ROUGE} strokeWidth={1.8} />,
        <line key={`a${cle++}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={ROUGE} strokeWidth={1.8} />,
        <polyline key={`a${cle++}`} points={arc.join(" ")} fill="none" stroke={ROUGE} strokeWidth={2} />,
        <circle key={`a${cle++}`} cx={cx} cy={cy} r={3} fill={ROUGE} />,
        texte(cx + 0.55 * (m.x - cx) + 4, cy + 0.55 * (m.y - cy) + 5, `${Math.abs(v.lat)}°`, "start", ROUGE),
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
 * 120, lignes tous les 30°. Équateur en orange, Greenwich en vert, et le
 * parallèle `surligne` en violet pointillé.
 */
const planisphere = (villes: Ville[], legende: string, surligne?: number) => {
  const L = 52;
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
  if (surligne !== undefined)
    dessin.push(<line key="surligne" x1={L} y1={Y(surligne)} x2={L + W} y2={Y(surligne)} stroke={VIOLET} strokeWidth={2} strokeDasharray="5 4" />);
  for (let lat = -60; lat <= 60; lat += 30)
    dessin.push(
      <text key={`tl${lat}`} x={L - 4} y={Y(lat) + 4} textAnchor="end" fontSize={15} fontWeight={900} fill={ENCRE}>
        {lat === 0 ? "0°" : `${Math.abs(lat)}° ${lat > 0 ? "N" : "S"}`}
      </text>,
    );
  for (const lon of [-90, 0, 90])
    dessin.push(
      <text key={`tm${lon}`} x={X(lon)} y={H0 + H + 19} textAnchor="middle" fontSize={15} fontWeight={900} fill={ENCRE}>
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
      <text key={`n${i}`} x={v.gauche ? x - 7 : x + 7} y={y - 6} textAnchor={v.gauche ? "end" : "start"} fontSize={15} fontWeight={900} fill={ROUGE} {...halo}>
        {v.nom}
      </text>,
    );
  });
  return legendeSous(
    <svg viewBox="0 0 300 158" role="img" aria-label={`Planisphère. ${legende}`} className="w-full">
      {dessin}
    </svg>,
    legende,
  );
};

export const exercicesReperage4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "reperage",
  titre: "Se repérer : droite graduée, plan, pavé, Terre",
  accroche:
    "Vingt exercices, du geste seul au problème : lire et placer une abscisse, même quand l'unité est partagée en parts, lire et placer un point dans un repère — dont l'axe des ordonnées MONTE —, se repérer dans un pavé avec trois nombres, puis sur la Terre avec la latitude et la longitude. Une course d'orientation, les records de température de la planète, le Rubik's Cube, les plus hauts sommets des continents. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec un schéma, le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/reperage", titre: "Se repérer sur une droite, dans le plan, sur la Terre" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je lis le pas ou l'unité AVANT de compter, et j'écris toujours l'abscisse d'abord.",
      rappel: [
        "Sur une droite graduée, un point est repéré par UN nombre, son abscisse : positive à droite de l'origine, négative à gauche. Je compte les graduations, puis je multiplie par le PAS.",
        "Quand l'unité est partagée en parts égales, le DÉNOMINATEUR est le nombre de parts dans une unité, le NUMÉRATEUR le nombre de parts comptées depuis l'origine.",
        "Dans le plan, un point a DEUX coordonnées, (abscisse ; ordonnée) : l'abscisse d'abord. L'axe des ordonnées MONTE : vers le haut, l'ordonnée augmente.",
        "Dans un pavé : TROIS nombres, (abscisse ; ordonnée ; altitude). Sur la Terre : DEUX, la latitude (de 0° à 90°, N ou S) puis la longitude (de 0° à 180°, E ou O).",
      ],
      exercices: [
        {
          enonce: "Sur la droite graduée ci-dessous, seules les graduations $0$ et $3$ sont chiffrées.\na) Quelle est l'abscisse du point $K$ ? Celle du point $L$ ?\nb) Quelle est la distance $KL$ ?",
          figure: graduee({ min: -12, max: 15, pas: 3, lus: [0, 3], points: [{ v: -9, nom: "K" }, { v: 12, nom: "L" }] }),
          correction:
            "Je lis d'abord le pas : de $0$ à $3$, il y a une seule graduation d'écart. Chaque graduation vaut donc $3$.\na) $K$ est à gauche de l'origine, à $3$ graduations : $3 \\times 3 = 9$, et à gauche le signe est moins. L'abscisse de $K$ est $-9$.\n$L$ est à droite, à $4$ graduations : $4 \\times 3 = 12$. L'abscisse de $L$ est $12$.\nb) Je soustrais la plus petite abscisse à la plus grande : $KL = 12 - (-9) = 12 + 9 = 21$.\n⭐ Contrôle sur le dessin : de $K$ à $L$, il y a $7$ graduations de $3$, et $7 \\times 3 = 21$.\n⛔ Le piège : compter les graduations sans multiplier par le pas, et répondre $-3$ et $4$. Ici, une graduation vaut $3$, pas $1$.\nRéponse : $K$ a pour abscisse $-9$, $L$ a pour abscisse $12$, et $KL = 21$.",
          schema: graduee({ min: -12, max: 15, pas: 3, lus: [-9, 0, 3, 12], points: [{ v: -9, nom: "K" }, { v: 12, nom: "L" }] }, "7 graduations de 3 entre K et L"),
          micros: ["abscisse_lire"],
        },
        {
          enonce: "Sur une droite graduée d'origine $O$, chaque graduation vaut $0{,}5$.\na) À combien de graduations de l'origine, et de quel côté, faut-il placer les points $A$, $B$ et $C$ d'abscisses $2{,}5$, $-1{,}5$ et $-3$ ?\nb) Ranger $A$, $B$, $C$ et $O$ de la gauche vers la droite.",
          correction:
            "Le SIGNE dit de quel côté de l'origine ; le nombre divisé par le PAS dit combien de graduations.\na) $A$ : $2{,}5 \\div 0{,}5 = 5$, donc $5$ graduations à droite.\n$B$ : $1{,}5 \\div 0{,}5 = 3$, et le signe est moins : $3$ graduations à gauche.\n$C$ : $3 \\div 0{,}5 = 6$, donc $6$ graduations à gauche.\nb) Plus un point est à gauche, plus son abscisse est petite : $-3 < -1{,}5 < 0 < 2{,}5$. De gauche à droite : $C$, $B$, $O$, $A$.\n⛔ Le piège : placer $A$ à $2{,}5$ graduations, comme si chaque graduation valait $1$. Avec un pas de $0{,}5$, il en faut deux fois plus : $5$.\nRéponse : $A$ à $5$ graduations à droite, $B$ à $3$ à gauche, $C$ à $6$ à gauche ; de gauche à droite, $C$, $B$, $O$, $A$.",
          schema: graduee({ min: -4, max: 3, pas: 1, sous: 2, points: [{ v: 2.5, nom: "A" }, { v: -1.5, nom: "B" }, { v: -3, nom: "C" }] }, "une petite graduation vaut 0,5"),
          micros: ["abscisse_placer"],
        },
        {
          enonce: "Sur la droite graduée ci-dessous, chaque unité est partagée en parts égales. Donner l'abscisse des points $A$, $B$ et $C$ sous forme de fraction.",
          figure: graduee({ min: -2, max: 3, pas: 1, sous: 3, points: [{ v: 2 / 3, nom: "A" }, { v: 7 / 3, nom: "B" }, { v: -4 / 3, nom: "C" }] }),
          correction:
            "Je compte d'abord les parts dans UNE unité, de $0$ à $1$ : il y en a $3$. Chaque part vaut $\\dfrac{1}{3}$, et $3$ sera le dénominateur.\n$A$ est à $2$ parts à droite de l'origine : son abscisse est $\\dfrac{2}{3}$.\n$B$ est à $7$ parts à droite ($3$ jusqu'à $1$, $3$ de plus jusqu'à $2$, puis $1$) : son abscisse est $\\dfrac{7}{3}$.\n$C$ est à $4$ parts à gauche : son abscisse est $-\\dfrac{4}{3}$.\n⭐ Contrôle : $\\dfrac{7}{3}$ est bien entre $2$ et $3$, car $7 = 3 \\times 2 + 1$.\n⛔ Le piège : retourner la fraction et écrire $\\dfrac{3}{2}$ pour $A$. Le dénominateur compte les parts d'UNE unité ; le numérateur, les parts comptées.\nRéponse : $A$ a pour abscisse $\\dfrac{2}{3}$, $B$ a pour abscisse $\\dfrac{7}{3}$, $C$ a pour abscisse $-\\dfrac{4}{3}$.",
          schema: graduee({ min: -2, max: 3, pas: 1, sous: 3, points: [{ v: 2 / 3, nom: "A", texte: "A 2/3" }, { v: 7 / 3, nom: "B", texte: "B 7/3" }, { v: -4 / 3, nom: "C", texte: "C −4/3" }] }, "une part vaut 1/3"),
          micros: ["abscisse_fraction"],
        },
        {
          enonce: "a) Entre quels entiers consécutifs se trouvent $\\dfrac{9}{4}$ et $-\\dfrac{5}{4}$ ?\nb) Sur une droite où l'unité est partagée en $4$ parts, placer les points $D$, $E$ et $F$ d'abscisses $\\dfrac{9}{4}$, $-\\dfrac{5}{4}$ et $\\dfrac{3}{2}$.",
          correction:
            "a) Je fais la division euclidienne du numérateur par le dénominateur : $9 = 4 \\times 2 + 1$. Le quotient donne l'entier de gauche : $\\dfrac{9}{4}$ est entre $2$ et $3$, une part après $2$.\nPour $-\\dfrac{5}{4}$ : $5 = 4 \\times 1 + 1$, donc $\\dfrac{5}{4}$ est entre $1$ et $2$ ; son opposé est de l'autre côté, entre $-2$ et $-1$, une part à gauche de $-1$.\nb) $D$ : $9$ parts à droite de l'origine. $E$ : $5$ parts à gauche. $F$ : $\\dfrac{3}{2} = \\dfrac{6}{4}$, donc $6$ parts à droite, au milieu entre $1$ et $2$.\n⛔ Le piège : placer $E$ entre $-1$ et $0$, en pensant « $\\dfrac{5}{4}$, c'est un peu plus que $1$, donc un peu plus que $-1$ ». $-\\dfrac{5}{4} = -1{,}25$ est PLUS PETIT que $-1$ : il est à gauche de $-1$.\nRéponse : $2 < \\dfrac{9}{4} < 3$ et $-2 < -\\dfrac{5}{4} < -1$ ; $D$ à $9$ parts à droite, $E$ à $5$ parts à gauche, $F$ à $6$ parts à droite.",
          schema: graduee({ min: -2, max: 3, pas: 1, sous: 4, points: [{ v: 9 / 4, nom: "D", texte: "D 9/4" }, { v: -5 / 4, nom: "E", texte: "E −5/4" }, { v: 3 / 2, nom: "F", texte: "F 3/2" }] }, "une part vaut 1/4"),
          micros: ["abscisse_fraction", "abscisse_placer"],
        },
        {
          enonce: "a) Lire les coordonnées des points $R$, $S$, $T$ et $U$.\nb) Placer le point $V(-5\\,;\\,-3)$.",
          figure: vecteurs([-7, 7], [], [{ x: 2, y: 4, label: "R" }, { x: -4, y: 3, label: "S" }, { x: -3, y: -2, label: "T" }, { x: 5, y: -4, label: "U" }]),
          correction:
            "Pour chaque point, je descends (ou je monte) jusqu'à l'axe horizontal : c'est l'abscisse. Puis je vais jusqu'à l'axe vertical : c'est l'ordonnée. J'écris dans cet ordre.\na) $R(2\\,;\\,4)$, $S(-4\\,;\\,3)$, $T(-3\\,;\\,-2)$ et $U(5\\,;\\,-4)$.\nb) Pour $V(-5\\,;\\,-3)$ : je pars de l'origine, j'avance de $5$ carreaux vers la GAUCHE (abscisse négative), puis je descends de $3$ carreaux (ordonnée négative) : les traits orange.\n⭐ $T$ et $V$ ont leurs deux coordonnées négatives : ils sont en bas à gauche.\n⛔ Le piège : écrire $S(3\\,;\\,-4)$, en lisant la hauteur d'abord. L'abscisse vient TOUJOURS en premier.\nRéponse : $R(2\\,;\\,4)$, $S(-4\\,;\\,3)$, $T(-3\\,;\\,-2)$, $U(5\\,;\\,-4)$, et $V$ en bas à gauche.",
          schema: vecteurs(
            [-7, 7],
            [
              { de: [-5, 0], vers: [-5, -3], couleur: ORANGE, pointe: false },
              { de: [0, -3], vers: [-5, -3], couleur: ORANGE, pointe: false },
            ],
            [{ x: 2, y: 4, label: "R" }, { x: -4, y: 3, label: "S" }, { x: -3, y: -2, label: "T" }, { x: 5, y: -4, label: "U" }, { x: -5, y: -3, label: "V" }],
          ),
          micros: ["repere_plan"],
        },
        {
          enonce: "Le point $M(-2\\,;\\,1)$ se déplace de $4$ carreaux vers le haut : il arrive en $N$. Puis on part de $N$ : $3$ carreaux vers la droite, puis $6$ carreaux vers le bas. On arrive en $P$.\nDonner les coordonnées de $N$ et de $P$.",
          correction:
            "Dans un repère, l'axe des ordonnées MONTE : aller vers le haut AJOUTE à l'ordonnée, aller vers le bas en RETIRE. Aller vers la droite ajoute à l'abscisse.\n$N$ : l'abscisse ne bouge pas, l'ordonnée gagne $4$ : $1 + 4 = 5$. Donc $N(-2\\,;\\,5)$.\n$P$ : l'abscisse gagne $3$, $-2 + 3 = 1$ ; l'ordonnée perd $6$, $5 - 6 = -1$. Donc $P(1\\,;\\,-1)$.\n⛔ Le piège : compter comme sur un écran d'ordinateur, où descendre AUGMENTE la coordonnée. On trouverait $N(-2\\,;\\,-3)$ : un point qui descend alors qu'on lui dit de monter. Un repère n'est pas un écran.\nRéponse : $N(-2\\,;\\,5)$ et $P(1\\,;\\,-1)$.",
          schema: vecteurs(
            [-5, 7],
            [
              { de: [-2, 1], vers: [-2, 5] },
              { de: [-2, 5], vers: [1, 5] },
              { de: [1, 5], vers: [1, -1] },
            ],
            [{ x: -2, y: 1, label: "M" }, { x: -2, y: 5, label: "N" }, { x: 1, y: -1, label: "P" }],
          ),
          micros: ["repere_plan"],
        },
        {
          enonce: "$ABCDEFGH$ est un pavé droit avec $AB = 6$, $AD = 2$ et $AE = 3$. Le repère a pour origine $A$ ; ses axes sont portés par $[AB]$, $[AD]$ et $[AE]$.\na) Quel sommet a pour coordonnées $(6\\,;\\,2\\,;\\,0)$ ? Et $(0\\,;\\,2\\,;\\,3)$ ?\nb) Donner les coordonnées de $F$.\nc) Combien de coordonnées nulles a le sommet $B$ ? Où est-il ?",
          correction:
            "Je lis les trois nombres dans l'ordre : d'abord le long de $[AB]$, puis le long de $[AD]$ (vers le fond), enfin vers le haut, le long de $[AE]$.\na) $(6\\,;\\,2\\,;\\,0)$ : j'avance de $6$, tout $[AB]$, puis de $2$, toute la profondeur, sans monter. C'est le sommet $C$, au sol, derrière à droite.\n$(0\\,;\\,2\\,;\\,3)$ : je n'avance pas, je vais au fond de $2$, je monte de $3$. C'est le sommet $H$, en haut, derrière à gauche.\nb) $F$ est juste au-dessus de $B$ : $6$, puis $0$, puis $3$. Donc $F(6\\,;\\,0\\,;\\,3)$.\nc) $B(6\\,;\\,0\\,;\\,0)$ a deux coordonnées nulles : il est sur un axe, celui des abscisses.\n⛔ Le piège : lire $(0\\,;\\,2\\,;\\,3)$ dans le désordre, et chercher un point à $3$ de profondeur. Le pavé n'a que $2$ de profondeur : ce point serait dehors.\nRéponse : $C$ et $H$ ; $F(6\\,;\\,0\\,;\\,3)$ ; deux, $B$ est sur l'axe des abscisses.",
          schema: pave(6, 2, 3, ["AD", "CD", "DH"], { noms: true, axes: true }),
          micros: ["repere_espace"],
        },
        {
          enonce: "a) Rio de Janeiro a pour coordonnées géographiques (23° S ; 43° O). Est-elle au nord ou au sud de l'équateur ? À l'est ou à l'ouest du méridien de Greenwich ?\nb) Parmi ces écritures, lesquelles ne désignent AUCUN lieu sur la Terre : (95° N ; 20° E), (40° S ; 170° O), (10° N ; 200° E), (0° ; 180°) ?",
          correction:
            "Le premier nombre est la LATITUDE, l'écart à l'équateur ; le second est la LONGITUDE, l'écart au méridien de Greenwich.\na) 23° S : Rio est au sud de l'équateur, dans l'hémisphère Sud. 43° O : elle est à l'ouest de Greenwich. Sur le dessin, les 23° sont un ANGLE mesuré au centre de la Terre, vers le Sud.\nb) Une latitude va de 0° à 90°, pas plus : au pôle, on ne peut pas aller plus au nord. (95° N ; 20° E) est impossible.\nUne longitude va de 0° à 180°, vers l'Est ou vers l'Ouest : 200° E est impossible (au-delà de 180°, on revient de l'autre côté, vers l'Ouest). (10° N ; 200° E) est impossible.\n(40° S ; 170° O) existe : c'est en plein océan Pacifique, à l'est de la Nouvelle-Zélande. (0° ; 180°) aussi : sur l'équateur, sur le méridien opposé à celui de Greenwich.\n⛔ Le piège : accepter 95° pour une latitude parce qu'une longitude peut dépasser 90°. La latitude s'arrête à 90° (le pôle), la longitude à 180°.\nRéponse : Rio est au sud de l'équateur et à l'ouest de Greenwich ; (95° N ; 20° E) et (10° N ; 200° E) sont impossibles.",
          schema: globe({ centre: -40, paralleles: [0], meridiens: [0], villes: [{ nom: "Rio", lat: -23, lon: -43, angle: true }] }, "en orange l'équateur, en vert le méridien de Greenwich"),
          micros: ["repere_terre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir : je place, je calcule une distance, un milieu ou un symétrique, et je conclus par une phrase.",
      rappel: [
        "La distance entre deux points d'une droite graduée : la plus grande abscisse moins la plus petite. Soustraire un nombre négatif revient à ajouter son opposé.",
        "Le milieu d'un segment : la MOYENNE des abscisses — et dans le plan, la moyenne des ordonnées, séparément.",
        "Symétrique par rapport à l'axe des abscisses : l'ordonnée change de signe. Par rapport à l'axe des ordonnées : l'abscisse change de signe. Par rapport à l'origine : les deux.",
        "Monter ou descendre ne change que l'ordonnée ; aller à droite ou à gauche ne change que l'abscisse.",
      ],
      exercices: [
        {
          enonce: "a) Sur la droite graduée ci-dessous, chaque unité est partagée en $5$ parts. Combien vaut une part ? Lire les abscisses de $A$, $B$ et $C$ en écriture décimale.\nb) Calculer la distance $AC$.\nc) Calculer l'abscisse du milieu $M$ de $[AC]$.",
          figure: graduee({ min: -1, max: 2, pas: 1, sous: 5, points: [{ v: -0.6, nom: "A" }, { v: 0.8, nom: "B" }, { v: 1.4, nom: "C" }] }),
          correction:
            "a) Une unité partagée en $5$ : une part vaut $1 \\div 5 = 0{,}2$.\n$A$ est à $3$ parts à gauche de $0$ : $3 \\times 0{,}2 = 0{,}6$, donc son abscisse est $-0{,}6$.\n$B$ est à $4$ parts à droite : $4 \\times 0{,}2 = 0{,}8$.\n$C$ est à $2$ parts après $1$ : $1 + 2 \\times 0{,}2 = 1{,}4$.\nb) $AC = 1{,}4 - (-0{,}6) = 1{,}4 + 0{,}6 = 2$.\nc) Le milieu est à égale distance des deux bouts : son abscisse est la MOYENNE, $\\dfrac{-0{,}6 + 1{,}4}{2} = \\dfrac{0{,}8}{2} = 0{,}4$.\n⭐ Contrôle : de $A$ à $M$, $0{,}4 - (-0{,}6) = 1$ ; de $M$ à $C$, $1{,}4 - 0{,}4 = 1$. La moitié de $2$ de chaque côté.\n⛔ Le piège : lire chaque part comme un dixième, par habitude, et écrire $-0{,}3$ pour $A$. Ici l'unité a $5$ parts, pas $10$ : une part vaut $0{,}2$.\nRéponse : $A$, $B$ et $C$ ont pour abscisses $-0{,}6$, $0{,}8$ et $1{,}4$ ; $AC = 2$ ; $M$ a pour abscisse $0{,}4$.",
          schema: graduee({ min: -1, max: 2, pas: 1, sous: 5, points: [{ v: -0.6, nom: "A", texte: "A −0,6" }, { v: 0.8, nom: "B", texte: "B 0,8" }, { v: 1.4, nom: "C", texte: "C 1,4" }, { v: 0.4, nom: "M", texte: "M 0,4", couleur: ORANGE }] }, "une part vaut 0,2 ; M en orange"),
          micros: ["abscisse_lire", "repere_defi"],
        },
        {
          enonce: "Sur une droite graduée, l'unité est partagée en $6$ parts égales.\na) Placer les points $A$, $B$, $C$ et $D$ d'abscisses $\\dfrac{5}{6}$, $\\dfrac{4}{3}$, $-\\dfrac{1}{2}$ et $\\dfrac{11}{6}$.\nb) Ranger ces quatre nombres dans l'ordre croissant.\nc) Quelle est la distance $CD$ ?",
          correction:
            "a) Pour placer une fraction, je l'écris avec le dénominateur $6$, le nombre de parts par unité.\n$\\dfrac{5}{6}$ : $5$ parts à droite. $\\dfrac{4}{3} = \\dfrac{8}{6}$ : $8$ parts à droite, entre $1$ et $2$. $-\\dfrac{1}{2} = -\\dfrac{3}{6}$ : $3$ parts à gauche. $\\dfrac{11}{6}$ : $11$ parts à droite, une part avant $2$.\nb) Sur la droite, de gauche à droite : $C$, $A$, $B$, $D$. Donc $-\\dfrac{1}{2} < \\dfrac{5}{6} < \\dfrac{4}{3} < \\dfrac{11}{6}$.\nc) $CD = \\dfrac{11}{6} - \\left(-\\dfrac{3}{6}\\right) = \\dfrac{14}{6} = \\dfrac{7}{3}$ : ce sont les $14$ parts qu'on compte sur le dessin, de $C$ à $D$.\n⛔ Le piège : placer $\\dfrac{4}{3}$ à $4$ parts, sans le réécrire en sixièmes. Sur cette droite, une part vaut $\\dfrac{1}{6}$, pas $\\dfrac{1}{3}$.\nRéponse : $A$ à $5$ parts à droite, $B$ à $8$, $C$ à $3$ parts à gauche, $D$ à $11$ à droite ; $-\\dfrac{1}{2} < \\dfrac{5}{6} < \\dfrac{4}{3} < \\dfrac{11}{6}$ ; $CD = \\dfrac{7}{3}$.",
          schema: graduee({ min: -1, max: 2, pas: 1, sous: 6, points: [{ v: 5 / 6, nom: "A", texte: "A 5/6" }, { v: 4 / 3, nom: "B", texte: "B 4/3" }, { v: -1 / 2, nom: "C", texte: "C −1/2" }, { v: 11 / 6, nom: "D", texte: "D 11/6" }] }, "une part vaut 1/6"),
          micros: ["abscisse_fraction", "abscisse_placer"],
        },
        {
          enonce: "Dans un repère, on place les points $A(-4\\,;\\,-1)$, $B(2\\,;\\,-1)$ et $C(2\\,;\\,3)$.\na) Montrer que le triangle $ABC$ est rectangle en $B$, en regardant les coordonnées.\nb) Donner les coordonnées du point $D$ tel que $ABCD$ soit un rectangle.\nc) Calculer le périmètre et l'aire de $ABCD$, en carreaux.",
          correction:
            "a) $A$ et $B$ ont la même ordonnée, $-1$ : le segment $[AB]$ est horizontal. $B$ et $C$ ont la même abscisse, $2$ : le segment $[BC]$ est vertical. Un côté horizontal et un côté vertical forment un angle droit : $ABC$ est rectangle en $B$.\nb) $D$ doit être à la verticale de $A$ (même abscisse, $-4$) et à la hauteur de $C$ (même ordonnée, $3$). Donc $D(-4\\,;\\,3)$.\nc) $AB = 2 - (-4) = 6$ carreaux et $BC = 3 - (-1) = 4$ carreaux.\nPérimètre : $2 \\times (6 + 4) = 20$ carreaux. Aire : $6 \\times 4 = 24$ carreaux.\n⛔ Le piège : écrire $D(3\\,;\\,-4)$, les coordonnées à l'envers. Ce point est en bas à droite, loin du rectangle.\nRéponse : $D(-4\\,;\\,3)$ ; périmètre $20$ carreaux, aire $24$ carreaux.",
          schema: vecteurs(
            [-6, 5],
            [
              { de: [-4, -1], vers: [2, -1], pointe: false },
              { de: [2, -1], vers: [2, 3], pointe: false },
              { de: [2, 3], vers: [-4, 3], couleur: ORANGE, pointe: false },
              { de: [-4, 3], vers: [-4, -1], couleur: ORANGE, pointe: false },
            ],
            [{ x: -4, y: -1, label: "A" }, { x: 2, y: -1, label: "B" }, { x: 2, y: 3, label: "C" }, { x: -4, y: 3, label: "D" }],
          ),
          micros: ["repere_plan"],
        },
        {
          enonce: "Soit le point $K(5\\,;\\,2)$.\na) Donner les coordonnées de $L$, symétrique de $K$ par rapport à l'axe des abscisses.\nb) Même question pour $M$, symétrique de $K$ par rapport à l'axe des ordonnées.\nc) Et pour $N$, symétrique de $K$ par rapport à l'origine $O$.\nd) Quelle est la nature du quadrilatère $KLNM$ ?",
          correction:
            "a) La symétrie par rapport à l'axe des abscisses (horizontal) est un pliage le long de cet axe : le point passe de haut en bas. L'abscisse reste, l'ordonnée change de signe : $L(5\\,;\\,-2)$.\nb) Par rapport à l'axe des ordonnées (vertical), le point passe de droite à gauche. L'ordonnée reste, l'abscisse change de signe : $M(-5\\,;\\,2)$.\nc) Par rapport à l'origine, c'est un demi-tour : les DEUX coordonnées changent de signe. $N(-5\\,;\\,-2)$.\nd) Les côtés de $KLNM$ sont horizontaux et verticaux : c'est un rectangle, de $10$ carreaux sur $4$.\n⭐ $O$ est le milieu de $[KN]$ : $\\dfrac{5 + (-5)}{2} = 0$ et $\\dfrac{2 + (-2)}{2} = 0$.\n⛔ Le piège : confondre les deux axes et écrire $L(-5\\,;\\,2)$. Plier le long de l'axe HORIZONTAL fait passer le point de haut en bas : c'est l'ordonnée qui change.\nRéponse : $L(5\\,;\\,-2)$, $M(-5\\,;\\,2)$, $N(-5\\,;\\,-2)$ ; $KLNM$ est un rectangle.",
          schema: vecteurs(
            [-7, 7],
            [
              { de: [5, 2], vers: [5, -2], pointe: false },
              { de: [5, -2], vers: [-5, -2], pointe: false },
              { de: [-5, -2], vers: [-5, 2], pointe: false },
              { de: [-5, 2], vers: [5, 2], pointe: false },
              { de: [5, 2], vers: [-5, -2], couleur: ORANGE, pointe: false },
            ],
            [{ x: 5, y: 2, label: "K" }, { x: 5, y: -2, label: "L" }, { x: -5, y: 2, label: "M" }, { x: -5, y: -2, label: "N" }],
          ),
          micros: ["repere_defi", "repere_plan"],
        },
        {
          enonce: "Un colis a la forme d'un pavé droit $ABCDEFGH$ avec $AB = 8$ dm, $AD = 4$ dm et $AE = 6$ dm. Le repère a pour origine $A$, ses axes portés par $[AB]$, $[AD]$ et $[AE]$, l'unité est le décimètre.\na) Donner les coordonnées de $G$.\nb) $M$ est le milieu de l'arête $[EF]$. Donner ses coordonnées.\nc) $N$ est le centre de la face de droite, $BCGF$. Donner ses coordonnées.\nd) Où se trouve le point $P(4\\,;\\,4\\,;\\,0)$ ?",
          correction:
            "a) $G$ est le sommet opposé à $A$ : ses coordonnées sont les trois dimensions du pavé. $G(8\\,;\\,4\\,;\\,6)$.\nb) $E(0\\,;\\,0\\,;\\,6)$ et $F(8\\,;\\,0\\,;\\,6)$. Le milieu est à mi-chemin sur chaque coordonnée : $\\dfrac{0 + 8}{2} = 4$, puis $0$, puis $6$. Donc $M(4\\,;\\,0\\,;\\,6)$.\nc) Tous les points de la face $BCGF$ ont pour abscisse $8$. Son centre est au milieu de la profondeur, $4 \\div 2 = 2$, et au milieu de la hauteur, $6 \\div 2 = 3$. Donc $N(8\\,;\\,2\\,;\\,3)$.\nd) Altitude $0$ : au sol. Ordonnée $4$ : tout au fond, sur l'arête $[DC]$. Abscisse $4$ : la moitié de $8$. $P$ est le milieu de l'arête $[DC]$, qui est cachée sur le dessin.\n⛔ Le piège au c) : écrire $N(8\\,;\\,3\\,;\\,2)$, la hauteur avant la profondeur. L'ordre est fixe : abscisse, ordonnée, altitude.\nRéponse : $G(8\\,;\\,4\\,;\\,6)$, $M(4\\,;\\,0\\,;\\,6)$, $N(8\\,;\\,2\\,;\\,3)$ ; $P$ est le milieu de $[DC]$.",
          schema: pave(8, 4, 6, ["AD", "CD", "DH"], { noms: true, axes: true, points: [{ nom: "M", p: [4, 0, 6], texte: "M" }, { nom: "N", p: [8, 2, 3], texte: "N" }, { nom: "P", p: [4, 4, 0], texte: "P" }] }),
          micros: ["repere_espace", "repere_defi"],
        },
        {
          enonce: "New York a pour coordonnées géographiques (41° N ; 74° O), Naples (41° N ; 14° E) et Lima (12° S ; 77° O).\na) Que remarque-t-on sur les latitudes de New York et de Naples ?\nb) Laquelle de ces deux villes est la plus à l'est ?\nc) Quel écart de longitude sépare New York de Naples ?\nd) Lima est-elle au nord ou au sud de New York ? Quel écart de latitude les sépare ?",
          correction:
            "a) Même latitude, 41° N : New York et Naples sont sur le même PARALLÈLE (en violet), à la même distance de l'équateur.\nb) Naples est à l'est de Greenwich (E), New York à l'ouest (O) : Naples est la plus à l'est.\nc) De New York jusqu'à Greenwich, il y a 74° ; de Greenwich jusqu'à Naples, 14° de plus, de l'autre côté. L'écart est $74 + 14 = 88$ degrés.\nd) Lima est au sud de l'équateur (S), New York au nord (N) : Lima est au sud de New York. De part et d'autre de l'équateur, j'additionne : $41 + 12 = 53$ degrés.\n⛔ Le piège au c) : calculer $74 - 14 = 60$, comme si les deux villes étaient du même côté de Greenwich. L'une est à l'Ouest, l'autre à l'Est : j'additionne.\nRéponse : le même parallèle ; Naples ; 88° de longitude ; Lima est au sud, à 53° de latitude de New York.",
          schema: planisphere(
            [
              { nom: "Y", lat: 41, lon: -74 },
              { nom: "N", lat: 41, lon: 14 },
              { nom: "L", lat: -12, lon: -77 },
            ],
            "Y New York, N Naples, L Lima ; en violet le parallèle 41° N",
            41,
          ),
          micros: ["repere_terre"],
        },
        {
          enonce: "Un robot part du point $R(-3\\,;\\,-4)$ et exécute quatre ordres, dans cet ordre : monter de $7$, aller à droite de $5$, descendre de $2$, aller à gauche de $8$.\na) Donner les coordonnées du robot après chaque ordre.\nb) Un élève trouve, à la fin, $(-6\\,;\\,-9)$. Quelle erreur a-t-il faite ?",
          correction:
            "a) Monter ou descendre ne change que l'ORDONNÉE ; aller à droite ou à gauche ne change que l'ABSCISSE. Et dans un repère, monter AJOUTE.\nMonter de $7$ : $-4 + 7 = 3$. Le robot est en $(-3\\,;\\,3)$.\nÀ droite de $5$ : $-3 + 5 = 2$. Il est en $(2\\,;\\,3)$.\nDescendre de $2$ : $3 - 2 = 1$. Il est en $(2\\,;\\,1)$.\nÀ gauche de $8$ : $2 - 8 = -6$. Il arrive en $(-6\\,;\\,1)$.\nb) Son abscisse est juste ; son ordonnée vaut $-4 - 7 + 2 = -9$ : il a RETIRÉ en montant et AJOUTÉ en descendant. C'est la règle d'un écran d'ordinateur, où l'origine est en haut et où descendre augmente la coordonnée.\n⛔ Le piège : compter l'ordonnée vers le bas, comme sur un écran. Dans un repère, l'axe des ordonnées MONTE.\nRéponse : $(-3\\,;\\,3)$, $(2\\,;\\,3)$, $(2\\,;\\,1)$, puis $(-6\\,;\\,1)$ ; l'élève a compté l'ordonnée vers le bas.",
          schema: vecteurs(
            [-8, 6],
            [
              { de: [-3, -4], vers: [-3, 3] },
              { de: [-3, 3], vers: [2, 3] },
              { de: [2, 3], vers: [2, 1] },
              { de: [2, 1], vers: [-6, 1] },
            ],
            [{ x: -3, y: -4, label: "R" }, { x: -6, y: 1, label: "A" }],
          ),
          micros: ["repere_plan"],
        },
        {
          enonce: "Dans un repère, on donne $A(-4\\,;\\,3)$ et $B(2\\,;\\,-1)$.\na) Calculer les coordonnées du milieu $I$ de $[AB]$.\nb) Le point $C$ est le symétrique de $A$ par rapport à $B$ : $B$ est le milieu de $[AC]$. Trouver les coordonnées de $C$ en comptant les carreaux.",
          correction:
            "a) Le milieu : la moyenne des abscisses, puis la moyenne des ordonnées, SÉPARÉMENT.\n$\\dfrac{-4 + 2}{2} = \\dfrac{-2}{2} = -1$ et $\\dfrac{3 + (-1)}{2} = \\dfrac{2}{2} = 1$. Donc $I(-1\\,;\\,1)$.\nb) Pour aller de $A$ à $B$, j'avance de $6$ carreaux vers la droite et je descends de $4$. Comme $B$ est le milieu de $[AC]$, de $B$ à $C$ je refais le même trajet (les flèches) : $2 + 6 = 8$ et $-1 - 4 = -5$. Donc $C(8\\,;\\,-5)$.\n⭐ Contrôle : le milieu de $[AC]$ est $\\left(\\dfrac{-4 + 8}{2}\\,;\\,\\dfrac{3 + (-5)}{2}\\right)$, soit $(2\\,;\\,-1)$ : c'est bien $B$.\n⛔ Le piège au a) : faire la moyenne des quatre nombres, $\\dfrac{-4 + 3 + 2 + (-1)}{4} = 0$. Abscisses avec abscisses, ordonnées avec ordonnées.\nRéponse : $I(-1\\,;\\,1)$ et $C(8\\,;\\,-5)$.",
          schema: vecteurs(
            [-7, 10],
            [
              { de: [-4, 3], vers: [8, -5], couleur: ORANGE, pointe: false },
              { de: [2, -1], vers: [8, -1] },
              { de: [8, -1], vers: [8, -5] },
            ],
            [{ x: -4, y: 3, label: "A" }, { x: -1, y: 1, label: "I" }, { x: 2, y: -1, label: "B" }, { x: 8, y: -5, label: "C" }],
          ),
          micros: ["repere_defi", "repere_plan"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je choisis le support et le repère, je place les points dans l'ordre des coordonnées, et je réponds avec l'unité.",
      rappel: [
        "Combien de nombres pour repérer un point ? Une droite : 1. Un plan, une carte : 2. L'espace : 3. La surface de la Terre : 2, la latitude et la longitude.",
        "Deux valeurs de part et d'autre de zéro, de l'équateur ou de Greenwich : l'écart est la SOMME des deux nombres sans leur signe.",
        "Sur un méridien, 1° de latitude vaut environ 111 km : le tour de la Terre par les pôles, environ 40 000 km, divisé par 360.",
      ],
      exercices: [
        {
          titre: "La course d'orientation",
          enonce: "Sur la carte d'une course d'orientation, on a tracé un repère : l'axe des abscisses vers l'est, l'axe des ordonnées vers le nord, un carreau pour $100$ m. Le départ est en $D(-5\\,;\\,-3)$. La feuille de route de Léa dit : $400$ m vers le nord, $700$ m vers l'est, $600$ m vers le nord, $300$ m vers l'ouest.\na) La balise $K$ est atteinte après les deux premiers ordres. Donner ses coordonnées, puis celles de l'arrivée $A$.\nb) Quelle distance Léa a-t-elle parcourue ?\nc) Pour rentrer au départ, Léa ne veut donner que deux ordres : un vers l'est ou l'ouest, un vers le nord ou le sud. Lesquels ?",
          correction:
            "Un carreau vaut $100$ m : $400$ m font $4$ carreaux. Le nord est vers le HAUT de la carte, dans le sens de l'axe des ordonnées : aller au nord AJOUTE à l'ordonnée. Aller à l'est ajoute à l'abscisse, aller à l'ouest en retire.\na) Départ $D(-5\\,;\\,-3)$. $4$ carreaux au nord : $-3 + 4 = 1$, on est en $(-5\\,;\\,1)$. $7$ carreaux à l'est : $-5 + 7 = 2$. La balise est $K(2\\,;\\,1)$.\nPuis $6$ au nord : $1 + 6 = 7$, on est en $(2\\,;\\,7)$. Puis $3$ à l'ouest : $2 - 3 = -1$. L'arrivée est $A(-1\\,;\\,7)$.\nb) $400 + 700 + 600 + 300 = 2\\,000$ m, soit $2$ km.\nc) De $A(-1\\,;\\,7)$ à $D(-5\\,;\\,-3)$ : l'abscisse passe de $-1$ à $-5$, soit $4$ carreaux vers l'ouest, $400$ m. L'ordonnée passe de $7$ à $-3$, soit $7 - (-3) = 10$ carreaux vers le sud, $1\\,000$ m.\n⭐ Le retour fait $1\\,400$ m, moins que l'aller : à l'aller, Léa a fait un détour vers l'est puis est revenue vers l'ouest.\n⛔ Le piège : compter le nord vers le bas, comme les lignes d'un écran. L'arrivée tomberait sous le départ, alors que Léa n'a fait que monter vers le nord.\nRéponse : $K(2\\,;\\,1)$ et $A(-1\\,;\\,7)$ ; $2$ km ; $400$ m vers l'ouest, puis $1\\,000$ m vers le sud.",
          schema: vecteurs(
            [-7, 9],
            [
              { de: [-5, -3], vers: [-5, 1] },
              { de: [-5, 1], vers: [2, 1] },
              { de: [2, 1], vers: [2, 7] },
              { de: [2, 7], vers: [-1, 7] },
            ],
            [{ x: -5, y: -3, label: "D" }, { x: 2, y: 1, label: "K" }, { x: -1, y: 7, label: "A" }],
          ),
          micros: ["repere_plan", "repere_defi"],
        },
        {
          titre: "Les records de température",
          enonce: "L'Organisation météorologique mondiale retient deux records sur la planète : $-89{,}2$ °C à la station Vostok, en Antarctique, le 21 juillet 1983, et $56{,}7$ °C dans la vallée de la Mort, aux États-Unis, le 10 juillet 1913. À Paris, le record de chaleur est de $42{,}6$ °C, le 25 juillet 2019.\na) Sur une droite graduée de $30$ en $30$, entre quelles graduations se placent ces trois températures ?\nb) Quel écart sépare les deux records de la planète ?\nc) Quel écart sépare le record de Paris du record de froid ?\nd) Quelle température est exactement à mi-chemin entre les deux records de la planète ?",
          correction:
            "a) Je repère chaque température entre deux graduations de $30$ : $-89{,}2$ est entre $-90$ et $-60$, tout près de $-90$. $56{,}7$ est entre $30$ et $60$, près de $60$. $42{,}6$ est entre $30$ et $60$ aussi.\nb) L'écart est la plus grande température moins la plus petite : $56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 145{,}9$ °C.\nc) $42{,}6 - (-89{,}2) = 42{,}6 + 89{,}2 = 131{,}8$ °C.\nd) À mi-chemin, c'est le milieu : la moyenne des deux abscisses, $\\dfrac{-89{,}2 + 56{,}7}{2} = \\dfrac{-32{,}5}{2} = -16{,}25$ °C (le point orange).\n⭐ Contrôle : de $-89{,}2$ à $-16{,}25$, il y a $72{,}95$ degrés, et de $-16{,}25$ à $56{,}7$ aussi : la moitié de $145{,}9$.\n⛔ Le piège au b) : calculer $89{,}2 - 56{,}7 = 32{,}5$ en oubliant le signe. Il faut remonter de $89{,}2$ degrés jusqu'à zéro, PUIS monter encore de $56{,}7$.\nRéponse : entre $-90$ et $-60$, entre $30$ et $60$, entre $30$ et $60$ ; $145{,}9$ °C ; $131{,}8$ °C ; $-16{,}25$ °C.",
          schema: graduee({ min: -120, max: 90, pas: 30, points: [{ v: -89.2, nom: "V", texte: "V −89,2" }, { v: 42.6, nom: "P", texte: "P 42,6" }, { v: 56.7, nom: "M", texte: "M 56,7" }, { v: -16.25, nom: "I", texte: "−16,25", couleur: ORANGE }] }, "V Vostok, M vallée de la Mort, P Paris ; en orange, le milieu"),
          micros: ["abscisse_lire", "abscisse_placer", "repere_defi"],
        },
        {
          titre: "Le Rubik's Cube",
          enonce: "Le Rubik's Cube, inventé en 1974 par le Hongrois Ernő Rubik, est formé de $27$ petits cubes. On repère chacun par trois nombres (colonne ; rangée ; étage) : la colonne de gauche à droite, la rangée de l'avant vers l'arrière, l'étage de bas en haut, chacun valant $1$, $2$ ou $3$.\na) Quelles sont les coordonnées du petit cube caché au cœur, qu'on ne voit jamais ?\nb) Le cube $(2\\,;\\,1\\,;\\,2)$ est au centre de la face avant. Combien de petits cubes ont exactement DEUX coordonnées égales à $2$ ? Combien de couleurs montre chacun d'eux ?\nc) Les cubes des coins n'ont aucune coordonnée égale à $2$. Combien y en a-t-il ?\nd) Les autres sont les cubes d'arête. Combien y en a-t-il ? Combien de coordonnées égales à $2$ ont-ils ?",
          correction:
            "La valeur $2$ veut dire « au milieu » dans une direction ; $1$ ou $3$, « au bord ».\na) Le cube du cœur est au milieu dans les trois directions : $(2\\,;\\,2\\,;\\,2)$. Il ne touche aucune face.\nb) Deux coordonnées valent $2$, la troisième vaut $1$ ou $3$. Je choisis laquelle n'est pas $2$ ($3$ choix), puis sa valeur ($2$ choix) : $3 \\times 2 = 6$ cubes, un au centre de chaque face. Chacun ne montre qu'UNE couleur (en orange sur le dessin).\nc) Chaque coordonnée vaut $1$ ou $3$ : $2 \\times 2 \\times 2 = 8$ coins. Chacun montre TROIS couleurs (en rouge, le coin $(3\\,;\\,1\\,;\\,3)$).\nd) Il reste $27 - 1 - 6 - 8 = 12$ cubes d'arête. Ils ont exactement UNE coordonnée égale à $2$, et montrent deux couleurs (en violet, le cube $(2\\,;\\,1\\,;\\,3)$).\n⭐ Contrôle : une coordonnée égale à $2$ ($3$ choix), les deux autres à $1$ ou $3$ ($2 \\times 2 = 4$ choix) : $3 \\times 4 = 12$. Et les carrés colorés : $6 \\times 1 + 12 \\times 2 + 8 \\times 3 = 54$, soit $9$ par face.\n⛔ Le piège : compter $6 \\times 9 = 54$ petits cubes. Ce sont les CARRÉS colorés qu'on compte ainsi : un cube de coin porte trois carrés, il serait compté trois fois.\nRéponse : $(2\\,;\\,2\\,;\\,2)$ ; $6$ cubes, d'une seule couleur ; $8$ coins ; $12$ cubes d'arête, avec une seule coordonnée égale à $2$.",
          schema: legendeSous(
            pave(3, 3, 3, ["AD", "CD", "DH"], { grille: true, boites: [{ de: [1, 0, 1], a: [2, 1, 2], couleur: ORANGE }, { de: [1, 0, 2], a: [2, 1, 3], couleur: VIOLET }, { de: [2, 0, 2], a: [3, 1, 3], couleur: ROUGE }] }),
            "orange (2 ; 1 ; 2) centre de face, violet (2 ; 1 ; 3) arête, rouge (3 ; 1 ; 3) coin",
          ),
          micros: ["repere_espace", "repere_defi"],
        },
        {
          titre: "Les toits des continents",
          enonce: "Trois sommets célèbres, avec leurs coordonnées arrondies au degré et leur altitude : le mont Blanc (46° N ; 7° E), $4\\,806$ m ; le Kilimandjaro (3° S ; 37° E), $5\\,895$ m ; l'Aconcagua (33° S ; 70° O), $6\\,961$ m.\na) Lequel est dans l'hémisphère Nord ? Lesquels sont à l'est de Greenwich ? Lequel est le plus proche de l'équateur ?\nb) Quel écart de latitude sépare le mont Blanc du Kilimandjaro ?\nc) Un hélicoptère de secours survole le mont Blanc à $5\\,500$ m d'altitude. Pourquoi faut-il TROIS nombres pour le situer, alors que deux suffisent pour le sommet ? À combien de mètres au-dessus du sommet vole-t-il ?\nd) L'Everest est en (28° N ; 87° E). Un élève écrit : « Everest (87° N ; 28° E) ». Où serait ce point ?",
          correction:
            "a) La lettre de la latitude donne l'hémisphère : seul le mont Blanc (46° N ; 7° E) est au Nord. La lettre de la longitude dit l'est ou l'ouest : le mont Blanc et le Kilimandjaro (3° S ; 37° E) sont à l'est de Greenwich, l'Aconcagua (33° S ; 70° O) à l'ouest. Le plus proche de l'équateur est le Kilimandjaro, à 3° seulement.\nb) Le mont Blanc est à 46° au nord de l'équateur, le Kilimandjaro à 3° au sud : de part et d'autre, j'additionne. $46 + 3 = 49$ degrés.\nc) Le sommet est SUR la surface de la Terre : la latitude et la longitude suffisent, le relief donne le reste. L'hélicoptère, lui, peut quitter la surface : il faut un troisième nombre, son altitude. Il vole $5\\,500 - 4\\,806 = 694$ m au-dessus du sommet.\nd) (87° N ; 28° E) voudrait dire 87° au nord de l'équateur : à 3° seulement du pôle Nord, dans l'océan Arctique. Sur un méridien, 1° vaut environ 111 km : ce point est à $(90 - 87) \\times 111 = 333$ km environ du pôle, à des milliers de kilomètres de l'Himalaya.\n⛔ Le piège : inverser latitude et longitude. L'ordre est toujours (latitude ; longitude), et une latitude de 87° place le point presque au pôle.\nRéponse : le mont Blanc ; le mont Blanc et le Kilimandjaro ; le Kilimandjaro ; 49° ; il faut l'altitude, l'hélicoptère est 694 m au-dessus du sommet ; près du pôle Nord, dans l'océan Arctique.",
          schema: planisphere(
            [
              { nom: "B", lat: 46, lon: 7 },
              { nom: "K", lat: -3, lon: 37 },
              { nom: "A", lat: -33, lon: -70 },
              { nom: "E", lat: 28, lon: 87 },
            ],
            "B mont Blanc, K Kilimandjaro, A Aconcagua, E Everest",
          ),
          micros: ["repere_terre", "repere_defi"],
        },
      ],
    },
  ],
};
