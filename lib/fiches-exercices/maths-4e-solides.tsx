// ─── Fiche d'exercices : solides et représentations (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-vision-espace.tsx` et sur
// les CINQ micros du coach de 4e (notionId vision_espace) : reconnaître les
// solides, lire les vues, perspective cavalière et patron, sections planes,
// défis. On reste sur les FORMES et les REPRÉSENTATIONS : ⛔ aucun calcul de
// volume, c'est la notion `volume_solide`, qui a sa propre feuille. Les seuls
// calculs sont ceux du programme de 4e : une fuyante doublée, le théorème des
// milieux dans une face, Pythagore dans une section, une aire de rectangle.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni le cube compté 6-12-8,
// ni le cône « disque dessus, triangle de face », ni la boule sans patron, ni
// la tente et le cornet), ni ceux des feuilles de 3e « géométrie dans
// l'espace » et « sections » (pyramide à base carrée, prisme ABCDEF 4 × 5,
// cube de 4 cm à 135°, ballon, Rubik's Cube, meule, conteneur, Louvre).
//
// Les pièges nommés : nommer un solide d'après sa POSITION au lieu de ses bases
// (1, 4, 15), ne compter que ce qu'on voit sur le dessin (2, 16, 20), la vue de
// face réduite à la rangée de devant (3, 20), six carrés qui ne font pas un cube
// (5), mesurer une fuyante à la règle (6, 11), croire que toute section a la
// forme de la base (7, 14), croire qu'une section de pyramide ou de cône a la
// taille de la base (8, 18), deviner une longueur de patron au lieu de la lire
// sur le bord qui se colle (9), croire que trois vues donnent un seul
// empilement (10), mettre en pointillés tout ce qui est « au fond » (11),
// chercher les faces opposées d'un dé seulement dans une même rangée (12),
// croire qu'une coupe en diagonale a la taille d'une face (13), additionner les
// faces de deux solides collés (15, 17), la profondeur prise au bout du bassin
// (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - cristal de quartz : prisme à six pans terminé par une pointe à six faces
//   (en réalité deux rhomboèdres de trois faces chacun, qu'on modélise ici par
//   une pyramide à base hexagonale) ; les cristaux « biterminés », à pointe aux
//   deux bouts, poussent libres dans une argile ou une cavité (mindat.org,
//   fiche « Quartz », rubrique Habit) — ex. 17 ;
// - bassin de 25 m, couloirs de 2,5 m de large : règles des installations de
//   World Aquatics (Facilities Rules, FR 2) ; 5 couloirs donnent 12,5 m. Les
//   profondeurs de 1 m et 2 m sont IMAGINÉES (un bassin municipal courant) —
//   ex. 19 ;
// - le silo (6 m de diamètre, 10 m de fût, toit de 2 m) et le podium (cubes de
//   20 cm) sont IMAGINÉS, à l'ordre de grandeur réel — ex. 18 et 20.
//
// ⭐ LES SCHÉMAS SONT DESSINÉS ICI, en SVG nu : les vingt corrigés ont le leur.
// `solide` / `pave` projettent en perspective cavalière (fuyantes à 45°,
// réduites de moitié) et tracent en pointillés les arêtes qu'on leur donne
// comme cachées. ⛔ LA LEÇON DE LA FEUILLE « ESPACE » DE 3e : des étiquettes y
// croisaient des arêtes. Ici, chaque nom de sommet et chaque cote porte sa
// DIRECTION écrite en clair (`h`, `bd`, `g`…) ; le script de recalcul refait la
// projection, pose la boîte de chaque étiquette et vérifie qu'aucun trait ne la
// traverse et qu'aucune étiquette n'en chevauche une autre.
// `empilement` dessine des cubes unité (h[y][x], y = 0 devant) ; `vues` les
// vues à la même unité ; `aPlat` les patrons et les sections en vraie grandeur
// relative ; `patronCube` les patrons de cube sur quadrillage. Les sections
// de l'exercice 14 passent par le canvas `section_solide` du coach, textes
// éteints (`showSectionName: false` : il écrirait la réponse).
// Le script relit tous ces appels : écrire les nombres EN CLAIR, un appel par
// ligne.
//
// Les corrigés sont écrits à la première personne, comme les autres feuilles.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-solides-4e.mjs`.
//
// Micro-compétences : vision_reconnaitre (1, 2, 4, 9, 15, 17, 19), vision_vues
// (3, 4, 10, 15, 18, 20), vision_representation (5, 6, 9, 11, 12, 16),
// vision_section (7, 8, 13, 14, 18, 19), vision_defi (2, 10, 12, 13, 15, 16,
// 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { ORANGE, tableauProba } from "@/lib/fiches-exercices/figures";

type P3 = [number, number, number];
type P2 = [number, number];
type Dir = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;
/** Le cadre dans lequel un solide est mis à l'échelle (le script refait ce calcul). */
const LARGEUR = 180;
const HAUTEUR = 130;
/** L'écart entre un point et le bord de son étiquette (0,7 fois en diagonale). */
const ECART = 5;
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const ARETE = "#1e3a8a";
const CACHEE = "#64748b";
const ENCRE = "#0f172a";
const FOND = "#dbeafe";
const CADRE = "mx-auto w-full max-w-[18rem] print:max-w-[13rem]";
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };
const virgule = (x: number) => String(+x.toFixed(2)).replace(".", ",");
const SIGNES: Record<Dir, P2> = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };

/**
 * La boîte d'une étiquette posée à côté du point (x ; y) de l'écran, dans la
 * direction d : largeur 0,6 × taille par signe, hauteur = taille.
 * ⭐ Le script de recalcul refait EXACTEMENT ce calcul pour tester les croisements.
 */
const boiteEtiquette = (x: number, y: number, t: string, d: Dir, taille: number) => {
  const w = [...t].length * taille * 0.6;
  const h = taille;
  const [sx, sy] = SIGNES[d];
  const e = sx !== 0 && sy !== 0 ? ECART * 0.7 : ECART;
  return { cx: x + sx * (e + w / 2), cy: y + sy * (e + h / 2), w, h };
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
    largeur: (marge = 6) => b[2] - b[0] + 2 * marge,
  };
};

/**
 * Un solide à faces planes, en perspective cavalière. Les arêtes de `cachees`
 * sont en pointillés, les faces de `faces` en orange (les bases), `plan` est
 * un plan de coupe (polygone orange). `noms` et `cotes` : la DIRECTION de
 * chaque étiquette est écrite dans l'appel.
 */
const solide = (s: {
  sommets: Record<string, P3>;
  aretes: string[];
  cachees: string[];
  noms?: Record<string, Dir>;
  cotes?: Record<string, [string, Dir]>;
  plan?: P3[];
  faces?: string[];
}) => {
  const proj = (q: P3): P2 => [q[0] + K * q[1], q[2] + K * q[1]];
  const noms = Object.keys(s.sommets);
  const pts = noms.map((n) => proj(s.sommets[n]));
  const minX = Math.min(...pts.map((p) => p[0]));
  const maxX = Math.max(...pts.map((p) => p[0]));
  const minY = Math.min(...pts.map((p) => p[1]));
  const maxY = Math.max(...pts.map((p) => p[1]));
  const e = Math.min(LARGEUR / (maxX - minX), HAUTEUR / (maxY - minY));
  const ecran = (q: P3): P2 => {
    const [X, Y] = proj(q);
    return [(X - minX) * e, (maxY - Y) * e];
  };
  const c = cadre();
  c.inclure(0, 0, (maxX - minX) * e, (maxY - minY) * e);
  let cle = 0;
  const points = (qs: P3[]) => qs.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ");
  const ligne = (a: P3, b: P3, props: Record<string, unknown>) => {
    const [x1, y1] = ecran(a);
    const [x2, y2] = ecran(b);
    return <line key={`l${cle++}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" {...props} />;
  };
  const texte = (x: number, y: number, t: string, d: Dir, taille: number, couleur: string) => {
    const bo = boiteEtiquette(x, y, t, d, taille);
    c.inclure(bo.cx - bo.w / 2, bo.cy - bo.h / 2, bo.cx + bo.w / 2, bo.cy + bo.h / 2);
    return (
      <text key={`t${cle++}`} x={bo.cx} y={bo.cy + taille * 0.35} textAnchor="middle" fontSize={taille} fontWeight={900} fill={couleur} {...halo}>
        {t}
      </text>
    );
  };
  const arete = (nom: string) => [s.sommets[nom[0]], s.sommets[nom[1]]] as [P3, P3];
  const dessin: ReactNode[] = [];
  for (const f of s.faces ?? [])
    dessin.push(<polygon key={`f${cle++}`} points={points([...f].map((n) => s.sommets[n]))} fill={ORANGE} fillOpacity={0.3} stroke="none" />);
  for (const n of s.aretes.filter((n) => s.cachees.includes(n)))
    dessin.push(ligne(...arete(n), { stroke: CACHEE, strokeWidth: 1.6, strokeDasharray: "5 4" }));
  if (s.plan) dessin.push(<polygon key="plan" points={points(s.plan)} fill={ORANGE} fillOpacity={0.35} stroke={ORANGE} strokeWidth={2} strokeLinejoin="round" />);
  for (const n of s.aretes.filter((n) => !s.cachees.includes(n))) dessin.push(ligne(...arete(n), { stroke: ARETE, strokeWidth: 2.2 }));
  for (const [n, d] of Object.entries(s.noms ?? {})) {
    const [x, y] = ecran(s.sommets[n]);
    dessin.push(texte(x, y, n, d, 14, ENCRE));
  }
  for (const [n, [t, d]] of Object.entries(s.cotes ?? {})) {
    const [a, b] = arete(n).map(ecran);
    dessin.push(texte((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, t, d, 13, ROUGE));
  }
  return (
    <svg
      viewBox={c.viewBox()}
      role="img"
      aria-label={`Solide en perspective cavalière, ${noms.length} sommets, ${s.aretes.length} arêtes dont ${s.cachees.length} cachées, en pointillés`}
      className={CADRE}
    >
      {dessin}
    </svg>
  );
};

/** Le pavé droit ABCDEFGH : ABCD au sol (A devant à gauche, D derrière), E au-dessus de A. */
const pave = (a: number, b: number, c: number, cachees: string[], o: { noms?: Record<string, Dir>; cotes?: Record<string, [string, Dir]>; plan?: P3[] } = {}) =>
  solide({
    sommets: { A: [0, 0, 0], B: [a, 0, 0], C: [a, b, 0], D: [0, b, 0], E: [0, 0, c], F: [a, 0, c], G: [a, b, c], H: [0, b, c] },
    aretes: ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"],
    cachees,
    ...o,
  });

/**
 * Les deux solides ronds de l'exercice 1, posés de travers : le cylindre
 * COUCHÉ (axe horizontal) et le cône RENVERSÉ (pointe en bas). `bases` : les
 * bases en orange.
 */
const rond = (sorte: "cylindre" | "cone", bases = false) => {
  const remplir = bases ? { fill: ORANGE, fillOpacity: 0.35 } : { fill: "none" };
  if (sorte === "cylindre")
    return (
      <svg viewBox="0 0 220 160" role="img" aria-label="Un cylindre couché" className={CADRE}>
        <ellipse cx={50} cy={80} rx={16} ry={40} {...remplir} stroke="none" />
        <path d="M 50 40 A 16 40 0 0 0 50 120" fill="none" stroke={ARETE} strokeWidth={2.2} />
        <path d="M 50 40 A 16 40 0 0 1 50 120" fill="none" stroke={CACHEE} strokeWidth={1.6} strokeDasharray="5 4" />
        <line x1={50} y1={40} x2={170} y2={40} stroke={ARETE} strokeWidth={2.2} />
        <line x1={50} y1={120} x2={170} y2={120} stroke={ARETE} strokeWidth={2.2} />
        <ellipse cx={170} cy={80} rx={16} ry={40} {...remplir} stroke={ARETE} strokeWidth={2.2} />
      </svg>
    );
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Un cône, la pointe en bas" className={CADRE}>
      <line x1={40} y1={38} x2={110} y2={150} stroke={ARETE} strokeWidth={2.2} />
      <line x1={180} y1={38} x2={110} y2={150} stroke={ARETE} strokeWidth={2.2} />
      <ellipse cx={110} cy={38} rx={70} ry={18} {...remplir} stroke={ARETE} strokeWidth={2.2} />
    </svg>
  );
};

type Vue = { titre: string; cases?: number[][]; hauteurs?: number[]; poly?: P2[]; lignes?: P2[][]; cercle?: number };

/**
 * Des vues, toutes à la MÊME unité `u` (en px) : `hauteurs` (une pile de carrés
 * par colonne, de gauche à droite), `cases` (un quadrillage, lignes du haut vers
 * le bas), `poly` et `lignes` (y vers le haut), `cercle` (un rayon).
 */
const vues = (liste: Vue[], u = 20) => (
  <div className={`grid grid-cols-1 items-end gap-3 ${liste.length === 3 ? "sm:grid-cols-3 print:grid-cols-3" : "sm:grid-cols-2 print:grid-cols-2"}`}>
    {liste.map((v, i) => {
      const carre = (x: number, y: number, k: string) => <rect key={k} x={x * u} y={y * u} width={u} height={u} fill={FOND} stroke={ARETE} strokeWidth={1.6} />;
      let w = 0;
      let h = 0;
      const dessin: ReactNode[] = [];
      if (v.hauteurs) {
        const hmax = Math.max(...v.hauteurs);
        [w, h] = [v.hauteurs.length, hmax];
        v.hauteurs.forEach((n, x) => {
          for (let z = 0; z < n; z++) dessin.push(carre(x, hmax - 1 - z, `c${x}-${z}`));
        });
      }
      if (v.cases) {
        [w, h] = [v.cases[0].length, v.cases.length];
        v.cases.forEach((ligne, y) => ligne.forEach((n, x) => (n ? dessin.push(carre(x, y, `c${x}-${y}`)) : null)));
      }
      if (v.poly) {
        const xs = v.poly.map((p) => p[0]);
        const ys = v.poly.map((p) => p[1]);
        const [x0, y1] = [Math.min(...xs), Math.max(...ys)];
        [w, h] = [Math.max(...xs) - x0, y1 - Math.min(...ys)];
        const pt = (p: P2) => `${((p[0] - x0) * u).toFixed(1)},${((y1 - p[1]) * u).toFixed(1)}`;
        dessin.push(<polygon key="p" points={v.poly.map(pt).join(" ")} fill={FOND} stroke={ARETE} strokeWidth={2} strokeLinejoin="round" />);
        (v.lignes ?? []).forEach((l, k) => dessin.push(<polyline key={`l${k}`} points={l.map(pt).join(" ")} fill="none" stroke={ARETE} strokeWidth={1.6} />));
      }
      if (v.cercle) {
        [w, h] = [2 * v.cercle, 2 * v.cercle];
        dessin.push(
          <circle key="c" cx={v.cercle * u} cy={v.cercle * u} r={v.cercle * u} fill={FOND} stroke={ARETE} strokeWidth={2} />,
          <circle key="o" cx={v.cercle * u} cy={v.cercle * u} r={2.5} fill={ARETE} />,
        );
      }
      return (
        <div key={i}>
          <svg viewBox={`-3 -3 ${w * u + 6} ${h * u + 6}`} role="img" aria-label={`Vue ${v.titre}`} className="mx-auto block" style={{ width: `${w * u + 6}px`, maxWidth: "100%" }}>
            {dessin}
          </svg>
          <p className="mt-1 text-center text-xs font-black text-slate-600">{v.titre}</p>
        </div>
      );
    })}
  </div>
);

type Piece = { pts: P2[]; couleur?: string };
type Bord = { de: P2; a: P2; texte?: string; cote?: Dir; couleur?: string };

/**
 * Des figures planes À LA MÊME ÉCHELLE (y vers le haut) : un patron, ou une
 * section à côté de la base. `bords` : un bord surligné (`couleur`, les bords
 * qui se collent ont la même) et/ou une cote posée dans la direction `cote`.
 * ⭐ Le script relit `pts`, `de`, `a` : les écrire en clair.
 */
const aPlat = (pieces: Piece[], bords: Bord[] = [], u = 14) => {
  const tous = pieces.flatMap((p) => p.pts);
  const x0 = Math.min(...tous.map((p) => p[0]));
  const y1 = Math.max(...tous.map((p) => p[1]));
  const ecran = (p: P2): P2 => [(p[0] - x0) * u, (y1 - p[1]) * u];
  const c = cadre();
  tous.forEach((p) => c.inclure(...ecran(p)));
  const dessin: ReactNode[] = pieces.map((p, i) => (
    <polygon key={`p${i}`} points={p.pts.map((q) => ecran(q).map((v) => v.toFixed(1)).join(",")).join(" ")} fill={p.couleur ?? FOND} stroke={ARETE} strokeWidth={1.8} strokeLinejoin="round" />
  ));
  bords.forEach((b, i) => {
    const [xa, ya] = ecran(b.de);
    const [xb, yb] = ecran(b.a);
    if (b.couleur) dessin.push(<line key={`b${i}`} x1={xa} y1={ya} x2={xb} y2={yb} stroke={b.couleur} strokeWidth={4.5} strokeLinecap="round" />);
    if (b.texte && b.cote) {
      const bo = boiteEtiquette((xa + xb) / 2, (ya + yb) / 2, b.texte, b.cote, 13);
      c.inclure(bo.cx - bo.w / 2, bo.cy - bo.h / 2, bo.cx + bo.w / 2, bo.cy + bo.h / 2);
      dessin.push(
        <text key={`t${i}`} x={bo.cx} y={bo.cy + 13 * 0.35} textAnchor="middle" fontSize={13} fontWeight={900} fill={b.couleur ?? ENCRE} {...halo}>
          {b.texte}
        </text>,
      );
    }
  });
  return (
    <svg viewBox={c.viewBox()} role="img" aria-label="Figures planes à la même échelle" className="mx-auto block" style={{ width: `${Math.ceil(c.largeur())}px`, maxWidth: "100%" }}>
      {dessin}
    </svg>
  );
};

/**
 * Un patron de cube sur quadrillage : `cases` en (colonne ; ligne), la ligne
 * comptée VERS LE BAS. `marques` : le texte de chaque case (même ordre).
 * `etat` : « oui » (en vert, c'est un patron) ou « non » ; `rouges` : les
 * numéros des cases qui tombent sur la même face.
 */
const patronCube = (cases: P2[], o: { marques?: string[]; etat?: "oui" | "non"; rouges?: number[] } = {}) => {
  const u = 24;
  const w = (Math.max(...cases.map((p) => p[0])) + 1) * u;
  const h = (Math.max(...cases.map((p) => p[1])) + 1) * u;
  return (
    <svg viewBox={`-3 -3 ${w + 6} ${h + 6}`} role="img" aria-label="Six carrés sur un quadrillage" className="mx-auto block" style={{ width: `${w + 6}px`, maxWidth: "100%" }}>
      {cases.map(([x, y], i) => (
        <rect
          key={`r${i}`}
          x={x * u}
          y={y * u}
          width={u}
          height={u}
          fill={(o.rouges ?? []).includes(i) ? "#fca5a5" : o.etat === "oui" ? "#bbf7d0" : FOND}
          stroke={ARETE}
          strokeWidth={1.8}
        />
      ))}
      {(o.marques ?? []).map((t, i) => (
        <text key={`m${i}`} x={cases[i][0] * u + u / 2} y={cases[i][1] * u + u / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={900} fill={ENCRE}>
          {t}
        </text>
      ))}
    </svg>
  );
};

/**
 * Un empilement de cubes unité en perspective cavalière : h[y][x] cubes dans
 * la colonne (x ; y), y = 0 la rangée de DEVANT. Dessiné du fond vers l'avant,
 * du bas vers le haut, de gauche à droite (l'ordre du peintre).
 * `peint` : chaque cube coloré selon son nombre de faces sur le bord du bloc.
 */
const empilement = (h: number[][], o: { peint?: boolean; u?: number } = {}) => {
  const u = o.u ?? 24;
  const ny = h.length;
  const nx = h[0].length;
  const nz = Math.max(...h.flat());
  const P = (x: number, y: number, z: number) => `${((x + K * y) * u).toFixed(1)},${(-(z + K * y) * u).toFixed(1)}`;
  const PEINTURE = ["#e2e8f0", "#fde047", "#fb923c", "#ef4444"];
  const cubes: ReactNode[] = [];
  for (let y = ny - 1; y >= 0; y--)
    for (let z = 0; z < nz; z++)
      for (let x = 0; x < nx; x++) {
        if (z >= h[y][x]) continue;
        const bord = [x === 0 || x === nx - 1, y === 0 || y === ny - 1, z === 0 || z === nz - 1].filter(Boolean).length;
        const [avant, dessus, droite] = o.peint ? [PEINTURE[bord], PEINTURE[bord], PEINTURE[bord]] : ["#bfdbfe", "#eff6ff", "#93c5fd"];
        const trait = { stroke: ARETE, strokeWidth: 1.2, strokeLinejoin: "round" as const };
        cubes.push(
          <g key={`${x}-${y}-${z}`}>
            <polygon points={`${P(x, y, z)} ${P(x + 1, y, z)} ${P(x + 1, y, z + 1)} ${P(x, y, z + 1)}`} fill={avant} {...trait} />
            <polygon points={`${P(x, y, z + 1)} ${P(x + 1, y, z + 1)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}`} fill={dessus} fillOpacity={o.peint ? 0.75 : 1} {...trait} />
            <polygon points={`${P(x + 1, y, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x + 1, y, z + 1)}`} fill={droite} fillOpacity={o.peint ? 0.9 : 1} {...trait} />
          </g>,
        );
      }
  const W = (nx + K * ny) * u;
  const H = (nz + K * ny) * u;
  return (
    <svg viewBox={`-3 ${(-H - 3).toFixed(1)} ${(W + 6).toFixed(1)} ${(H + 6).toFixed(1)}`} role="img" aria-label={`Empilement de cubes, ${h.flat().reduce((s, n) => s + n, 0)} cubes`} className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      {cubes}
    </svg>
  );
};

/** Deux figures ou plus côte à côte (l'une sous l'autre sur un téléphone),
 *  avec leur légende. `serre` : deux par ligne même sur téléphone (dessins sans texte). */
const ensemble = (dessins: ReactNode[], legendes: string[] = [], serre = false) => (
  <div className={serre ? "grid grid-cols-2 items-end gap-3 print:grid-cols-4" : "grid grid-cols-1 items-end gap-3 sm:grid-cols-2 print:grid-cols-2"}>
    {dessins.map((d, i) => (
      <div key={i}>
        {d}
        {legendes[i] ? <p className="mt-1 text-center text-xs font-black text-slate-600">{legendes[i]}</p> : null}
      </div>
    ))}
  </div>
);

/** Un solide et son plan de coupe : le canvas `section_solide` du coach, TOUS
 *  ses textes éteints (`showSectionName: false`, sinon il écrit la réponse). */
const coupe = (s: "cube" | "pave_droit" | "cylindre" | "cone" | "pyramide", section: "parallele_face" | "parallele_base" | "parallele_axe" | "diagonale" | "verticale") => (
  <CanvasRenderer
    figure={
      {
        kind: "section_solide",
        solide: s,
        section,
        size: { width: 230, height: 215 },
        display: { showPlane: true, showLabels: false, showSectionName: false, showCallouts: false, showMiniLegend: false },
      } as never
    }
  />
);

/** Les quatre formes de section de l'exercice 14, dessinées à plat. */
const formes = (liste: { forme: "rectangle" | "triangle" | "disque" | "petit_carre"; titre: string }[]) =>
  ensemble(
    liste.map((f, i) => (
      <svg key={i} viewBox="0 0 120 90" role="img" aria-label={f.titre} className="mx-auto w-full max-w-[8rem]">
        {f.forme === "rectangle" ? <rect x={17} y={17} width={85} height={60} fill={ORANGE} fillOpacity={0.35} stroke={ORANGE} strokeWidth={2.4} /> : null}
        {f.forme === "triangle" ? <polygon points="60,8 20,82 100,82" fill={ORANGE} fillOpacity={0.35} stroke={ORANGE} strokeWidth={2.4} /> : null}
        {f.forme === "disque" ? <circle cx={60} cy={45} r={36} fill={ORANGE} fillOpacity={0.35} stroke={ORANGE} strokeWidth={2.4} /> : null}
        {f.forme === "petit_carre" ? (
          <>
            <rect x={22} y={7} width={76} height={76} fill="none" stroke={CACHEE} strokeWidth={1.6} strokeDasharray="5 4" />
            <rect x={41} y={26} width={38} height={38} fill={ORANGE} fillOpacity={0.35} stroke={ORANGE} strokeWidth={2.4} />
          </>
        ) : null}
      </svg>
    )),
    liste.map((f) => f.titre),
    true,
  );

/**
 * Le silo de face, à l'échelle : un cylindre de rayon R et de hauteur Hc,
 * surmonté d'un cône de hauteur Ht. Chaque plan de `coupes` (hauteur en m) est
 * tracé, et la largeur de la section y est surlignée.
 */
const silo = (R: number, Hc: number, Ht: number, coupes: number[]) => {
  const u = 11;
  const x0 = 20;
  const sol = 12 + (Hc + Ht) * u;
  const xa = x0 + R * u;
  const dessin: ReactNode[] = [
    <polygon key="s" points={`${x0},${sol} ${x0 + 2 * R * u},${sol} ${x0 + 2 * R * u},${sol - Hc * u} ${xa},${sol - (Hc + Ht) * u} ${x0},${sol - Hc * u}`} fill={FOND} stroke={ARETE} strokeWidth={2} strokeLinejoin="round" />,
    <line key="t" x1={x0} y1={sol - Hc * u} x2={x0 + 2 * R * u} y2={sol - Hc * u} stroke={ARETE} strokeWidth={1.4} />,
    <line key="a" x1={xa} y1={sol + 6} x2={xa} y2={sol - (Hc + Ht) * u - 6} stroke={CACHEE} strokeWidth={1.2} strokeDasharray="4 3" />,
    <text key="d" x={xa} y={sol + 18} textAnchor="middle" fontSize={13} fontWeight={900} fill={ENCRE}>{`${virgule(2 * R)} m`}</text>,
  ];
  coupes.forEach((z, i) => {
    const demi = z <= Hc ? R : (R * (Hc + Ht - z)) / Ht;
    const y = sol - z * u;
    dessin.push(
      <line key={`p${i}`} x1={x0 - 8} y1={y} x2={x0 + 2 * R * u + 8} y2={y} stroke={ORANGE} strokeWidth={1.2} strokeDasharray="4 3" />,
      <line key={`q${i}`} x1={xa - demi * u} y1={y} x2={xa + demi * u} y2={y} stroke={ORANGE} strokeWidth={4} />,
      <text key={`z${i}`} x={x0 + 2 * R * u + 12} y={y + 4} textAnchor="start" fontSize={13} fontWeight={900} fill={ORANGE}>{`${virgule(z)} m`}</text>,
    );
  });
  return (
    <div className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
      <svg viewBox={`0 0 ${x0 + 2 * R * u + 52} ${sol + 24}`} role="img" aria-label="Le silo vu de face, et les plans de coupe" className="w-full">
        {dessin}
      </svg>
      <p className="mt-1 text-center text-xs font-black text-slate-600">de face, avec les plans de coupe</p>
    </div>
  );
};

/**
 * Le bassin vu de côté (le trapèze), profondeurs agrandies `exag` fois pour
 * qu'on les voie : longueur L, profondeur p1 au petit bain, p2 au grand bain,
 * et la coupe à la distance x du petit bain.
 */
const bassin = (L: number, p1: number, p2: number, x: number, exag: number) => {
  // ⛔ MESURÉ LE 25/09 : avec 220 px de bassin et une police de 13, le dessin
  // (dans une colonne de ~218 px) sortait ses cotes à 9,2 px. Viewbox de 260 et
  // police de 14 : 14 × 218 ÷ 260 ≈ 11,7 px, au-dessus du plancher de 11.
  const sx = 180 / L;
  const sy = sx * exag;
  const [x0, y0] = [40, 22];
  const p = p1 + ((p2 - p1) * x) / L;
  const xc = x0 + x * sx;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${x0 + L * sx + 40} ${y0 + p2 * sy + 14}`} role="img" aria-label="Le bassin vu de côté : un trapèze" className="w-full">
        <polygon points={`${x0},${y0} ${x0 + L * sx},${y0} ${x0 + L * sx},${y0 + p2 * sy} ${x0},${y0 + p1 * sy}`} fill={FOND} stroke={ARETE} strokeWidth={2} strokeLinejoin="round" />
        <line x1={xc} y1={y0} x2={xc} y2={y0 + p * sy} stroke={ORANGE} strokeWidth={4} />
        <text x={x0 + (L * sx) / 2} y={y0 - 7} textAnchor="middle" fontSize={14} fontWeight={900} fill={ENCRE}>{`${virgule(L)} m`}</text>
        <text x={x0 - 5} y={y0 + (p1 * sy) / 2 + 4} textAnchor="end" fontSize={14} fontWeight={900} fill={ENCRE}>{`${virgule(p1)} m`}</text>
        <text x={x0 + L * sx + 5} y={y0 + (p2 * sy) / 2 + 4} textAnchor="start" fontSize={14} fontWeight={900} fill={ENCRE}>{`${virgule(p2)} m`}</text>
        <text x={xc + 6} y={y0 + (p * sy) / 2 + 4} textAnchor="start" fontSize={14} fontWeight={900} fill={ORANGE} {...halo}>{`${virgule(p)} m`}</text>
      </svg>
      <p className="mt-1 text-center text-xs font-black text-slate-600">{`de côté, profondeurs agrandies ${exag} fois ; en orange, la coupe à ${virgule(x)} m du petit bain`}</p>
    </div>
  );
};

export const exercicesSolides4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "vision-espace",
  titre: "Solides et représentations",
  accroche:
    "Vingt exercices, du geste seul au problème : nommer un solide posé de travers, compter ses faces, ses arêtes et ses sommets, lire les vues d'un empilement de cubes, reconnaître un patron de cube, lire une perspective cavalière sans s'y laisser prendre, trouver la forme d'une section. Un crayon, un dé, une maison, un cristal de quartz, un silo à grain, une piscine, un podium. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec un schéma, le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/vision-espace", titre: "Solides et représentations" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une idée par exercice. Je raisonne sur le solide, pas seulement sur le dessin.",
      rappel: [
        "Un solide se reconnaît à ses BASES : deux bases identiques et parallèles, c'est un prisme droit (un cylindre si elles sont rondes) ; une base et une pointe, c'est une pyramide (un cône si la base est ronde).",
        "Une VUE (de face, de dessus, de côté) est le contour du solide regardé bien en face : le relief disparaît.",
        "Un PATRON est le solide déplié : chaque face y apparaît une fois, en vraie grandeur.",
        "En perspective cavalière, la face de devant est en vraie grandeur, les fuyantes sont réduites (souvent de moitié) et les arêtes cachées sont en pointillés. Une SECTION est la figure plane obtenue en coupant le solide par un plan.",
      ],
      exercices: [
        {
          enonce:
            "Voici quatre solides, dessinés en perspective. Ils ne sont pas posés comme d'habitude.\nNommer chacun d'eux le plus précisément possible.",
          figure: ensemble(
            [
              solide({ sommets: { A: [0, 0, 0], B: [0, 3, 0], C: [0, 1.5, 2.5], D: [5, 0, 0], E: [5, 3, 0], F: [5, 1.5, 2.5] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AB", "BC", "BE"] }),
              rond("cylindre"),
              rond("cone"),
              solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [1.5, 3.5, 0], S: [2, 1.2, 3.5] }, aretes: ["AB", "BC", "CA", "SA", "SB", "SC"], cachees: ["AC", "BC", "SC"] }),
            ],
            ["①", "②", "③", "④"],
            true,
          ),
          correction:
            "Je ne regarde pas comment le solide est posé : je cherche ses BASES, puis ce qui les relie (en orange sur le schéma).\n① Deux triangles identiques et parallèles, à gauche et à droite, reliés par trois rectangles : c'est un prisme droit à base triangulaire, couché sur une face rectangulaire.\n② Deux disques identiques et parallèles, reliés par une surface courbe : c'est un cylindre, couché.\n③ Un disque et une pointe, reliés par une surface courbe : c'est un cône, la pointe en bas.\n④ Quatre faces, toutes des triangles : une base triangulaire et une pointe. C'est une pyramide à base triangulaire.\n⛔ Le piège : nommer d'après la position. Un prisme couché reste un prisme, un cône à l'envers reste un cône : les bases ne changent pas quand on tourne le solide.\nRéponse : ① prisme droit à base triangulaire ; ② cylindre ; ③ cône ; ④ pyramide à base triangulaire.",
          schema: ensemble(
            [
              solide({ sommets: { A: [0, 0, 0], B: [0, 3, 0], C: [0, 1.5, 2.5], D: [5, 0, 0], E: [5, 3, 0], F: [5, 1.5, 2.5] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AB", "BC", "BE"], faces: ["ABC", "DEF"] }),
              rond("cylindre", true),
              rond("cone", true),
              solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [1.5, 3.5, 0], S: [2, 1.2, 3.5] }, aretes: ["AB", "BC", "CA", "SA", "SB", "SC"], cachees: ["AC", "BC", "SC"], faces: ["ABC"] }),
            ],
            ["① deux bases triangulaires", "② deux bases rondes", "③ une base ronde, une pointe", "④ une base, une pointe"],
            true,
          ),
          micros: ["vision_reconnaitre"],
        },
        {
          enonce:
            "Un crayon à papier neuf, pas encore taillé, a la forme d'un prisme droit à base hexagonale (six côtés).\na) Combien a-t-il de faces ? De quelles formes ?\nb) Combien a-t-il d'arêtes ?\nc) Combien a-t-il de sommets ?",
          correction:
            "Je compte par groupes : les deux bases, puis ce qui les relie.\na) Deux bases hexagonales, aux deux bouts du crayon, et une face rectangulaire par côté de l'hexagone, soit 6 rectangles. En tout $2 + 6 = 8$ faces.\nb) Chaque hexagone a 6 côtés : $6 + 6 = 12$ arêtes autour des bases, plus 6 arêtes dans la longueur du crayon. En tout $12 + 6 = 18$ arêtes.\nc) 6 sommets à chaque bout : $6 + 6 = 12$ sommets.\n⭐ Contrôle : $8 - 18 + 12 = 2$, la relation d'Euler est vérifiée.\n⛔ Le piège : ne compter que ce que je vois. Sur le dessin, 5 arêtes sont en pointillés, cachées derrière le crayon : je compte 18, pas 13.\nRéponse : 8 faces (2 hexagones et 6 rectangles), 18 arêtes, 12 sommets.",
          schema: solide({ sommets: { A: [0, 2.4, 1.2], B: [0, 1.8, 2.24], C: [0, 0.6, 2.24], D: [0, 0, 1.2], E: [0, 0.6, 0.16], F: [0, 1.8, 0.16], G: [8, 2.4, 1.2], H: [8, 1.8, 2.24], I: [8, 0.6, 2.24], J: [8, 0, 1.2], K: [8, 0.6, 0.16], L: [8, 1.8, 0.16] }, aretes: ["AB", "BC", "CD", "DE", "EF", "FA", "GH", "HI", "IJ", "JK", "KL", "LG", "AG", "BH", "CI", "DJ", "EK", "FL"], cachees: ["AB", "AF", "AG", "EF", "FL"], faces: ["ABCDEF", "GHIJKL"] }),
          micros: ["vision_reconnaitre", "vision_defi"],
        },
        {
          enonce:
            "On a empilé des cubes identiques, comme sur le dessin ci-dessous.\na) Combien de carrés compte sa vue de dessus ? La dessiner.\nb) Combien de carrés compte sa vue de face ? La dessiner.",
          figure: empilement([[2, 1, 1], [3, 0, 1]]),
          correction:
            "a) De dessus, je vois une case par colonne de cubes, quelle que soit sa hauteur. Il y a 3 colonnes devant et 2 derrière, avec un trou au milieu du fond : la vue de dessus a 5 carrés.\nb) De face, je vois, pour chaque colonne de gauche à droite, la plus haute pile, qu'elle soit devant ou derrière. À gauche, la pile du fond, 3 cubes, dépasse celle de devant ; au milieu 1 ; à droite 1. La vue de face a $3 + 1 + 1 = 5$ carrés.\n⛔ Le piège : dessiner de face seulement la rangée de devant (2, 1 et 1). La pile de 3 du fond dépasse au-dessus : on la voit.\nRéponse : de dessus, 5 carrés (le trou au fond, au milieu) ; de face, des piles de 3, 1 et 1 carrés.",
          schema: vues([{ titre: "de dessus", cases: [[1, 0, 1], [1, 1, 1]] }, { titre: "de face", hauteurs: [3, 1, 1] }]),
          micros: ["vision_vues"],
        },
        {
          enonce:
            "Un solide posé sur une table a les deux vues ci-dessous : de face, un rectangle ; de dessus, un triangle.\nDe quel solide s'agit-il ? Comment est-il posé ?",
          figure: vues([{ titre: "de face", poly: [[0, 0], [4, 0], [4, 5], [0, 5]] }, { titre: "de dessus", poly: [[0, 0], [4, 0], [2.5, 3]] }]),
          correction:
            "La vue de dessus donne la forme de la BASE posée sur la table : un triangle.\nLa vue de face dit comment le solide monte : un rectangle, donc des bords verticaux et pas de pointe. Le solide garde la même forme triangulaire sur toute sa hauteur.\nUne base triangulaire qui monte tout droit : c'est un prisme droit à base triangulaire, debout sur une de ses bases (le dessin).\n⛔ Le piège : répondre « une pyramide » parce qu'on voit un triangle. Une pyramide se termine en pointe : de face, elle donnerait un triangle, pas un rectangle.\nRéponse : un prisme droit à base triangulaire, debout sur sa base.",
          schema: solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [2.5, 3, 0], D: [0, 0, 5], E: [4, 0, 5], F: [2.5, 3, 5] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AC", "BC", "CF"], faces: ["ABC", "DEF"] }),
          micros: ["vision_vues", "vision_reconnaitre"],
        },
        {
          enonce:
            "Chacune de ces quatre figures est faite de six carrés identiques.\nLesquelles sont des patrons de cube ? Pour les autres, expliquer ce qui coince.",
          figure: ensemble(
            [
              patronCube([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 2]]),
              patronCube([[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [2, 0]]),
              patronCube([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]]),
              patronCube([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2]]),
            ],
            ["A", "B", "C", "D"],
            true,
          ),
          correction:
            "Je plie en pensée : je choisis un carré comme fond, et je relève les autres un par un autour de lui.\nA : les quatre carrés en bande font le tour du cube ; le carré du haut et celui du bas ferment le dessus et le dessous. C'est un patron.\nB : cinq carrés en bande, c'est un de trop. En faisant le tour, le cinquième retombe sur le premier : deux faces se superposent, et une autre reste ouverte. Ce n'est pas un patron.\nC : l'escalier se replie marche après marche, chaque carré sur une face différente. C'est un patron.\nD : la bande de quatre fait le tour ; le carré juste au-dessus d'elle ferme le dessus ; mais le carré tout en haut se rabat encore, et retombe sur le troisième carré de la bande. Ce n'est pas un patron.\n⛔ Le piège : croire que six carrés bien collés font toujours un cube. Deux carrés peuvent tomber sur la même face : je vérifie en pliant, carré par carré.\nRéponse : A et C sont des patrons de cube ; B et D n'en sont pas.",
          schema: ensemble(
            [
              patronCube([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 2]], { etat: "oui" }),
              patronCube([[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [2, 0]], { etat: "non", rouges: [0, 4] }),
              patronCube([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], { etat: "oui" }),
              patronCube([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2]], { etat: "non", rouges: [0, 4] }),
            ],
            ["A : un patron", "B : en rouge, la même face", "C : un patron", "D : en rouge, la même face"],
            true,
          ),
          micros: ["vision_representation"],
        },
        {
          enonce:
            "Ce prisme droit est dessiné en perspective cavalière : ses fuyantes sont tracées à 45° et réduites de moitié. Sa face avant ABC est un triangle rectangle en A.\nSur le dessin, on mesure AB = 4 cm, AC = 3 cm et BE = 3,5 cm.\na) Quelles sont les vraies longueurs AB et AC ?\nb) Quelle est la vraie longueur de l'arête [BE] ?\nc) Quelles arêtes sont dessinées en pointillés ?",
          figure: solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [0, 0, 3], D: [0, 7, 0], E: [4, 7, 0], F: [0, 7, 3] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AD", "DE", "DF"], noms: { A: "bg", B: "bd", C: "g", D: "hg", E: "d", F: "h" }, cotes: { AB: ["4 cm", "b"], CA: ["3 cm", "g"], BE: ["3,5 cm", "bd"] } }),
          correction:
            "a) La face ABC est la face de devant, dessinée de face : elle est en vraie grandeur. AB = 4 cm et AC = 3 cm.\nb) [BE] part vers l'arrière : c'est une fuyante, dessinée à la moitié de sa longueur. Je double : $3{,}5 \\times 2 = 7$ cm.\nc) Le sommet D est derrière, en bas, à gauche : la face de gauche, celle du dessous et celle du fond le cachent. Les trois arêtes qui en partent, [AD], [DE] et [DF], sont en pointillés.\n⛔ Le piège : lire 3,5 cm pour [BE] avec la règle. Sur une perspective, seule la face de devant se mesure ; une fuyante, je la multiplie par 2.\nRéponse : AB = 4 cm, AC = 3 cm ; BE = 7 cm ; [AD], [DE] et [DF] sont en pointillés.",
          schema: solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [0, 0, 3], D: [0, 7, 0], E: [4, 7, 0], F: [0, 7, 3] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AD", "DE", "DF"], noms: { A: "bg", B: "bd", C: "g", D: "hg", E: "d", F: "h" }, cotes: { AB: ["4 cm", "b"], CA: ["3 cm", "g"], BE: ["7 cm", "bd"] } }),
          micros: ["vision_representation"],
        },
        {
          enonce:
            "ABCDEF est un prisme droit en forme de toit. Sa base ABC est un triangle isocèle en C, avec AB = 4 cm et une hauteur de 3 cm ; ses arêtes latérales mesurent 6 cm.\na) On le coupe par un plan parallèle à ses bases. Quelle est la nature de la section ?\nb) On le coupe par un plan parallèle à la face ABED, celle du dessous. Quelle est la nature de la section ? Quelle est sa longueur ?",
          correction:
            "a) Le plan est parallèle aux bases : il coupe le prisme comme une tranche. La section est un triangle identique à la base : un triangle isocèle de 4 cm de base et 3 cm de hauteur (à gauche sur le schéma).\nb) La face ABED est un rectangle. Le plan parallèle à cette face coupe chaque base selon un segment horizontal, et ces deux segments sont reliés par deux segments parallèles aux arêtes latérales : la section est un rectangle (à droite sur le schéma). Sa longueur est celle des arêtes latérales, 6 cm.\n⛔ Le piège : croire que la section d'un prisme a toujours la forme de sa base. C'est vrai si le plan est parallèle aux bases ; parallèle à une face latérale, c'est un rectangle.\nRéponse : a) un triangle isocèle identique à ABC ; b) un rectangle de 6 cm de long.",
          schema: ensemble(
            [
              solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [2, 0, 3], D: [0, 6, 0], E: [4, 6, 0], F: [2, 6, 3] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AD", "DE", "DF"], noms: { A: "bg", B: "bd", C: "hg", D: "b", E: "d", F: "h" }, plan: [[0, 3, 0], [4, 3, 0], [2, 3, 3]] }),
              solide({ sommets: { A: [0, 0, 0], B: [4, 0, 0], C: [2, 0, 3], D: [0, 6, 0], E: [4, 6, 0], F: [2, 6, 3] }, aretes: ["AB", "BC", "CA", "DE", "EF", "FD", "AD", "BE", "CF"], cachees: ["AD", "DE", "DF"], noms: { A: "bg", B: "bd", C: "hg", E: "d", F: "h" }, plan: [[1, 0, 1.5], [3, 0, 1.5], [3, 6, 1.5], [1, 6, 1.5]] }),
            ],
            ["a) parallèle aux bases", "b) parallèle à la face du dessous"],
          ),
          micros: ["vision_section"],
        },
        {
          enonce:
            "SABC est une pyramide dont la base ABC est un triangle équilatéral de 8 cm de côté. On la coupe par un plan parallèle à la base, qui passe par le milieu de [SA].\na) Quelle est la forme de la section ?\nb) Est-elle plus grande que la base, plus petite, ou identique ?\nc) Le plan passe aussi par les milieux de [SB] et de [SC]. Quelle est la longueur de chaque côté de la section ?",
          correction:
            "a) Coupée parallèlement à sa base, une pyramide donne une section de même forme que la base : un triangle équilatéral.\nb) La pyramide se resserre vers sa pointe : la section est plus petite que la base.\nc) Dans la face SAB, le côté de la section relie les milieux de [SA] et de [SB]. D'après le théorème des milieux, il mesure la moitié de AB : $8 \\div 2 = 4$ cm. C'est pareil dans les deux autres faces.\n⛔ Le piège : répondre 8 cm, comme pour un prisme. Un prisme garde la même largeur de bas en haut ; une pyramide rétrécit.\nRéponse : un triangle équilatéral de 4 cm de côté, plus petit que la base.",
          schema: ensemble([
            solide({ sommets: { A: [0, 0, 0], B: [8, 0, 0], C: [4, 6.93, 0], S: [5.5, 2.31, 6] }, aretes: ["AB", "BC", "CA", "SA", "SB", "SC"], cachees: ["AC", "BC", "SC"], noms: { A: "bg", B: "bd", C: "d", S: "h" }, plan: [[2.75, 1.155, 3], [6.75, 1.155, 3], [4.75, 4.62, 3]] }),
            aPlat([{ pts: [[0, 0], [8, 0], [4, 6.93]] }, { pts: [[10, 0], [14, 0], [12, 3.46]], couleur: "#fed7aa" }], [{ de: [0, 0], a: [8, 0], texte: "8 cm", cote: "b" }, { de: [10, 0], a: [14, 0], texte: "4 cm", cote: "b" }], 14),
          ], ["le plan passe par les milieux", "la base et la section, à la même échelle"]),
          micros: ["vision_section"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir. Je compte par groupes, je plie en pensée, puis je vérifie.",
      rappel: [
        "Pour compter faces, arêtes et sommets, je compte par GROUPES (le dessus, le dessous, les côtés), sans oublier ce qui est caché. Contrôle : faces − arêtes + sommets = 2 (la relation d'Euler).",
        "Un empilement de cubes : la vue de dessus montre une case par colonne ; la vue de face montre, pour chaque colonne, la pile la plus haute.",
        "Dans un patron, deux bords qui se collent ont la même longueur. Une section parallèle à une face d'un pavé droit est un rectangle identique à cette face.",
      ],
      exercices: [
        {
          enonce:
            "Voici le patron d'un solide (les longueurs sont en cm).\na) Quel est ce solide ? Combien a-t-il de faces ?\nb) Quelle est la longueur du bord marqué « ? » ? Justifier sans mesurer.\nc) Contre quel bord vient se coller le côté de 5 cm du triangle du haut ?",
          figure: aPlat([{ pts: [[0, 0], [3, 0], [3, 8], [0, 8]] }, { pts: [[3, 0], [7, 0], [7, 8], [3, 8]] }, { pts: [[7, 0], [12, 0], [12, 8], [7, 8]] }, { pts: [[3, 8], [7, 8], [3, 11]] }, { pts: [[3, 0], [3, -3], [7, 0]] }], [{ de: [0, 0], a: [0, 8], texte: "8 cm", cote: "g" }, { de: [0, 0], a: [3, 0], texte: "3 cm", cote: "b" }, { de: [3, 8], a: [7, 8], texte: "4 cm", cote: "b" }, { de: [3, 8], a: [3, 11], texte: "3 cm", cote: "g" }, { de: [3, 11], a: [7, 8], texte: "5 cm", cote: "hd" }, { de: [7, 0], a: [12, 0], texte: "?", cote: "b" }], 14),
          correction:
            "a) Trois rectangles côte à côte et deux triangles identiques, un en haut et un en bas : deux bases triangulaires reliées par des rectangles. C'est le patron d'un prisme droit à base triangulaire. Il a $2 + 3 = 5$ faces.\nb) Quand je replie, chaque rectangle vient border UN côté du triangle : la largeur de chaque rectangle est la longueur d'un côté de la base. Les côtés du triangle mesurent 3 cm, 4 cm et 5 cm ; les deux premiers rectangles ont 3 cm et 4 cm de large. Le troisième a donc 5 cm de large.\nc) Je replie le triangle du haut sur le rectangle de 4 cm : son côté de 3 cm vient contre le haut du rectangle de 3 cm, et son côté de 5 cm contre le haut du rectangle de 5 cm. Les bords qui se collent ont la même couleur sur le schéma.\n⛔ Le piège : chercher « ? » avec la règle, ou deviner 4 cm. Deux bords qui se collent ont la même longueur : c'est ce qui donne la réponse.\nRéponse : un prisme droit à base triangulaire, 5 faces ; ? = 5 cm ; contre le haut du rectangle de 5 cm.",
          schema: aPlat([{ pts: [[0, 0], [3, 0], [3, 8], [0, 8]] }, { pts: [[3, 0], [7, 0], [7, 8], [3, 8]] }, { pts: [[7, 0], [12, 0], [12, 8], [7, 8]] }, { pts: [[3, 8], [7, 8], [3, 11]] }, { pts: [[3, 0], [3, -3], [7, 0]] }], [{ de: [0, 8], a: [3, 8], couleur: "#16a34a" }, { de: [3, 8], a: [3, 11], couleur: "#16a34a" }, { de: [7, 8], a: [12, 8], couleur: "#dc2626" }, { de: [3, 11], a: [7, 8], couleur: "#dc2626" }, { de: [0, 0], a: [3, 0], couleur: "#7c3aed" }, { de: [3, 0], a: [3, -3], couleur: "#7c3aed" }, { de: [7, 0], a: [12, 0], texte: "5 cm", cote: "b", couleur: "#ea580c" }, { de: [3, -3], a: [7, 0], couleur: "#ea580c" }, { de: [0, 0], a: [0, 8], couleur: "#0891b2" }, { de: [12, 0], a: [12, 8], couleur: "#0891b2" }], 14),
          micros: ["vision_representation", "vision_reconnaitre"],
        },
        {
          enonce:
            "Un empilement de cubes identiques, posé sur une table, a les trois vues ci-dessous. Sur la vue de droite, l'avant de l'empilement est à gauche.\na) Combien de cubes, au plus, peut-il contenir ?\nb) Combien de cubes, au moins ?",
          figure: vues([{ titre: "de dessus", cases: [[1, 1, 1], [1, 1, 1]] }, { titre: "de face", hauteurs: [2, 1, 3] }, { titre: "de droite", hauteurs: [3, 2] }]),
          correction:
            "La vue de dessus montre 2 rangées de 3 colonnes, toutes occupées : 6 piles, chacune d'au moins un cube.\nLa vue de face donne, de gauche à droite, la plus haute pile de chaque colonne : 2, 1 et 3. La vue de droite donne la plus haute pile de chaque rangée : 3 devant, 2 derrière.\na) Au plus : chaque pile est limitée par sa colonne ET par sa rangée. Devant : 2, 1 et 3 ; derrière : 2, 1 et 2, car rien ne dépasse 2 au fond. En tout $2 + 1 + 3 + 2 + 1 + 2 = 11$ cubes.\nb) Au moins : il faut une pile de 3 à droite, forcément devant, puisque derrière rien ne dépasse 2. Il faut aussi une pile de 2 à gauche : placée derrière, elle donne à la fois la colonne de gauche et la rangée du fond. Toutes les autres piles n'ont qu'un cube : $1 + 1 + 3 + 2 + 1 + 1 = 9$ cubes.\n⛔ Le piège : croire que trois vues donnent un seul empilement. Plusieurs empilements ont les mêmes vues : ici, de 9 à 11 cubes.\nRéponse : au plus 11 cubes, au moins 9.",
          schema: ensemble([empilement([[2, 1, 3], [2, 1, 2]]), empilement([[1, 1, 3], [2, 1, 1]])], ["au plus : 11 cubes", "au moins : 9 cubes"]),
          micros: ["vision_vues", "vision_defi"],
        },
        {
          enonce:
            "Léa a dessiné un pavé droit ABCDEFGH en perspective cavalière : ABCD est la face du dessous, ABFE la face de devant. Elle s'est trompée deux fois dans ses pointillés.\na) Quelles sont ses deux erreurs ?\nb) Sur son dessin, AB = 5 cm, AE = 3 cm et BC = 2 cm. Les fuyantes sont réduites de moitié. Donner les vraies dimensions du pavé.",
          figure: pave(5, 4, 3, ["AD", "CD", "FG"], { noms: { A: "bg", B: "bd", C: "d", D: "hg", E: "g", F: "hg", G: "hd", H: "hg" }, cotes: { AB: ["5 cm", "b"], AE: ["3 cm", "g"], BC: ["2 cm", "bd"] } }),
          correction:
            "a) Je cherche le sommet caché : c'est celui qui est derrière, en bas, à gauche, D. Les arêtes cachées sont les trois qui partent de D : [AD], [DC] et [DH]. Toutes les autres se voient.\nLéa a tracé [DH] en trait plein : il fallait des pointillés. Et elle a mis [FG] en pointillés, alors que [FG] borde la face du dessus et la face de droite, toutes deux visibles : il fallait un trait plein.\nb) [AB] et [AE] sont sur la face de devant, en vraie grandeur : 5 cm et 3 cm. [BC] est une fuyante, réduite de moitié : $2 \\times 2 = 4$ cm.\n⛔ Le piège : mettre en pointillés tout ce qui est « au fond ». [FG] est au fond du dessus, mais rien ne le cache : seules les arêtes qui partent du sommet caché sont en pointillés.\nRéponse : [DH] devait être en pointillés et [FG] en trait plein ; le pavé mesure 5 cm, 4 cm et 3 cm.",
          schema: pave(5, 4, 3, ["AD", "CD", "DH"], { noms: { A: "bg", B: "bd", C: "d", D: "hg", E: "g", F: "hg", G: "hd", H: "hg" }, cotes: { AB: ["5 cm", "b"], AE: ["3 cm", "g"], BC: ["4 cm", "bd"] } }),
          micros: ["vision_representation"],
        },
        {
          enonce:
            "Sur un dé, deux faces opposées ont toujours 7 pour somme : 1 et 6, 2 et 5, 3 et 4.\nVoici un patron de dé dont trois faces sont déjà numérotées. Quels nombres faut-il écrire à la place de a, b et c ?",
          figure: patronCube([[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]], { marques: ["2", "3", "1", "a", "b", "c"] }),
          correction:
            "Je cherche, pour chaque face, celle qui lui sera opposée une fois le dé plié.\nJe pose la face 1 sur la table. La face a se relève à sa droite, et b, collée à a, se rabat par-dessus : b est le dessus, opposé à 1. Donc $b = 7 - 1 = 6$.\nLa face 3 se relève derrière 1, et 2, collée à 3, se rabat sur la gauche : 2 est à gauche, a à droite, elles sont opposées. Donc $a = 7 - 2 = 5$.\nLa face c, collée à b, retombe devant : elle est opposée à 3, qui est derrière. Donc $c = 7 - 3 = 4$.\n⭐ Contrôle : 1, 2, 3, 4, 5 et 6 apparaissent chacun une fois.\n⛔ Le piège : chercher les faces opposées seulement dans une même rangée. 2 et a ne sont pas dans la même rangée, et pourtant elles se font face.\nRéponse : a = 5, b = 6, c = 4.",
          schema: patronCube([[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]], { marques: ["2", "3", "1", "5", "6", "4"], etat: "oui" }),
          micros: ["vision_representation", "vision_defi"],
        },
        {
          enonce:
            "Un bloc de mousse a la forme d'un pavé droit ABCDEFGH, avec AB = 12 cm, BC = 5 cm et AE = 7 cm (ABCD est la face du dessous). On le coupe d'un seul trait vertical, qui passe par les arêtes [AE] et [CG].\na) Quelle est la nature de la section ACGE ?\nb) Calculer AC.\nc) Donner les dimensions de la section, puis comparer son aire à celle de la face ABFE.",
          correction:
            "a) Les arêtes [AE] et [CG] sont verticales, parallèles et de même longueur, 7 cm. La section a deux côtés verticaux, et deux côtés [AC] et [EG] sur le dessous et sur le dessus : c'est un rectangle.\nb) [AC] est une diagonale du rectangle ABCD. Le triangle ABC est rectangle en B, donc d'après le théorème de Pythagore : $AC^2 = 12^2 + 5^2 = 144 + 25 = 169$, et $AC = 13$ cm.\nc) La section est un rectangle de 13 cm sur 7 cm. Son aire : $13 \\times 7 = 91$ cm². Celle de la face ABFE : $12 \\times 7 = 84$ cm². La section est plus grande que la face de devant.\n⛔ Le piège : croire que la coupe en diagonale a la taille d'une face. Elle traverse le bloc en biais : sa largeur est la diagonale, plus longue que chaque côté.\nRéponse : un rectangle de 13 cm sur 7 cm, d'aire 91 cm², plus grand que la face ABFE (84 cm²).",
          schema: ensemble([
            pave(12, 5, 7, ["AD", "CD", "DH"], { noms: { A: "bg", B: "bd", C: "d", E: "hg", G: "hd" }, plan: [[0, 0, 0], [12, 5, 0], [12, 5, 7], [0, 0, 7]] }),
            aPlat([{ pts: [[0, 0], [13, 0], [13, 7], [0, 7]], couleur: "#fed7aa" }, { pts: [[15, 0], [27, 0], [27, 7], [15, 7]] }], [{ de: [0, 0], a: [13, 0], texte: "13 cm", cote: "b" }, { de: [0, 0], a: [0, 7], texte: "7 cm", cote: "g" }, { de: [15, 0], a: [27, 0], texte: "12 cm", cote: "b" }], 7),
          ], ["la coupe ACGE", "la section ACGE et la face ABFE"]),
          micros: ["vision_section", "vision_defi"],
        },
        {
          enonce:
            "Voici quatre solides coupés par un plan : ① un cube, ② un cône, ③ un cylindre, ④ une pyramide à base carrée.\nAssocier chaque solide à la forme de sa section : un disque de même rayon que la base ; un triangle ; un rectangle qui n'est pas un carré ; un carré plus petit que la base.",
          figure: ensemble([coupe("cube", "diagonale"), coupe("cone", "verticale"), coupe("cylindre", "parallele_base"), coupe("pyramide", "parallele_base")], ["①", "②", "③", "④"], true),
          correction:
            "Pour chaque dessin, je regarde comment le plan est placé par rapport au solide.\n① Le plan du cube contient deux arêtes verticales opposées : il le traverse en diagonale. La section a la hauteur du cube, mais la largeur d'une diagonale, plus longue que l'arête : un rectangle qui n'est pas un carré.\n② Le plan du cône est vertical et passe par la pointe : la section a deux côtés droits qui descendent de la pointe, et une base. C'est un triangle.\n③ Le plan du cylindre est parallèle à la base : un disque de même rayon.\n④ Le plan de la pyramide est parallèle à la base : un carré, plus petit que la base.\n⛔ Le piège : répondre « un carré » pour le cube. Parallèle à une face, oui ; mais ce plan-là passe en diagonale.\nRéponse : ① un rectangle ; ② un triangle ; ③ un disque ; ④ un carré plus petit.",
          schema: formes([{ forme: "rectangle", titre: "① un rectangle" }, { forme: "triangle", titre: "② un triangle" }, { forme: "disque", titre: "③ un disque" }, { forme: "petit_carre", titre: "④ un carré plus petit" }]),
          micros: ["vision_section"],
        },
        {
          enonce:
            "Une maison est modélisée par le solide ci-dessous : des murs de 6 m de long, 4 m de large et 3 m de haut, et un toit à deux pentes dont le faîte est à 5 m du sol.\na) Montrer que ce solide est un prisme droit. Quelles sont ses bases ?\nb) Compter ses faces, ses arêtes et ses sommets.\nc) Dessiner sa vue de face, sa vue de droite et sa vue de dessus.",
          figure: solide({ sommets: { A: [0, 0, 0], B: [6, 0, 0], C: [6, 4, 0], D: [0, 4, 0], E: [0, 0, 3], F: [6, 0, 3], G: [6, 4, 3], H: [0, 4, 3], I: [0, 2, 5], J: [6, 2, 5] }, aretes: ["AB", "BC", "CD", "DA", "AE", "BF", "CG", "DH", "EF", "HG", "EI", "HI", "FJ", "GJ", "IJ"], cachees: ["AD", "CD", "DH", "GH", "HI"] }),
          correction:
            "a) Je cherche deux faces identiques et parallèles : les deux pignons, à gauche et à droite, sont des pentagones identiques (un rectangle de 4 m sur 3 m surmonté d'un triangle). Ils sont reliés par des rectangles : le sol, les deux longs murs et les deux pans du toit. C'est un prisme droit à base pentagonale, couché sur une face.\nb) Faces : 2 pentagones et 5 rectangles, soit 7 faces. Arêtes : 5 autour de chaque pentagone, $5 + 5 = 10$, plus 5 dans la longueur : $10 + 5 = 15$ arêtes. Sommets : $5 + 5 = 10$.\nc) De face, je vois le long mur et, au-dessus, le pan du toit qui monte vers le faîte : un rectangle de 6 m sur 5 m, coupé par la ligne du bas du toit à 3 m. De droite, je vois le pignon : le pentagone. De dessus, je vois les deux pans du toit : un rectangle de 6 m sur 4 m, partagé en son milieu par le faîte.\n⛔ Le piège : voir deux solides, un pavé et un toit, et additionner leurs faces : $6 + 5 = 11$. Le plafond commun disparaît, et chaque pignon (rectangle et triangle) ne forme qu'UNE face : il en reste 7.\nRéponse : un prisme droit à base pentagonale (les pignons) ; 7 faces, 15 arêtes, 10 sommets.",
          schema: vues([{ titre: "de face", poly: [[0, 0], [6, 0], [6, 5], [0, 5]], lignes: [[[0, 3], [6, 3]]] }, { titre: "de droite", poly: [[0, 0], [4, 0], [4, 3], [2, 5], [0, 3]] }, { titre: "de dessus", poly: [[0, 0], [6, 0], [6, 4], [0, 4]], lignes: [[[0, 2], [6, 2]]] }], 16),
          micros: ["vision_reconnaitre", "vision_vues", "vision_defi"],
        },
        {
          enonce:
            "Un cube en bois de 3 cm d'arête est peint en bleu sur ses six faces, puis découpé en petits cubes de 1 cm d'arête.\na) Combien obtient-on de petits cubes ?\nb) Combien ont 3 faces peintes ? 2 faces ? 1 face ? Aucune ?",
          correction:
            "a) 3 couches de 3 rangées de 3 cubes : $3 \\times 3 \\times 3 = 27$ petits cubes.\nb) Je classe les petits cubes selon leur place dans le grand cube (les couleurs du schéma).\nLes cubes des coins ont 3 faces peintes. Un cube a 8 sommets : 8 cubes.\nLes cubes au milieu d'une arête ont 2 faces peintes. Il y en a un par arête, et un cube a 12 arêtes : 12 cubes.\nLes cubes au centre d'une face ont 1 face peinte. Un par face : 6 cubes.\nLe cube tout au centre n'a aucune face peinte : 1 cube, invisible de l'extérieur.\n⭐ Contrôle : $8 + 12 + 6 + 1 = 27$.\n⛔ Le piège : oublier le cube du centre, qu'on ne voit sur aucun dessin. Le contrôle par le total le retrouve.\nRéponse : 27 cubes ; 8 avec 3 faces peintes, 12 avec 2, 6 avec 1, et 1 sans peinture.",
          schema: ensemble([
            empilement([[3, 3, 3], [3, 3, 3], [3, 3, 3]], { peint: true }),
            tableauProba(["faces peintes", "3", "2", "1", "0"], [["petits cubes", "8", "12", "6", "1"]]),
          ], ["rouge : 3 faces, orange : 2, jaune : 1"]),
          micros: ["vision_defi", "vision_representation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des objets réels. Je choisis le solide qui leur ressemble le plus, je fais un schéma, puis une phrase de réponse.",
      rappel: [
        "Pour modéliser un objet réel, je le remplace par le solide usuel qui lui ressemble le plus, en oubliant les détails.",
        "Une section parallèle à la base a la forme de la base : de même taille pour un prisme ou un cylindre, plus petite pour une pyramide ou un cône. Un plan qui contient l'axe d'un cylindre donne un rectangle.",
        "Pour compter sans rien oublier : par groupes, puis le contrôle faces − arêtes + sommets = 2.",
      ],
      exercices: [
        {
          titre: "Le cristal de quartz",
          enonce:
            "Dans la nature, un cristal de quartz pousse souvent en colonne à six pans, terminée par une pointe à six faces triangulaires. On le modélise par le solide dessiné ci-dessous.\na) De quels solides usuels est-il fait ?\nb) Compter ses faces, ses arêtes et ses sommets. Vérifier que faces − arêtes + sommets = 2.\nc) Certains cristaux, qui ont poussé libres, ont une pointe à chaque bout. Combien ont-ils de faces, d'arêtes et de sommets ?",
          figure: solide({ sommets: { A: [2, 0, 0], B: [1, 1.73, 0], C: [-1, 1.73, 0], D: [-2, 0, 0], E: [-1, -1.73, 0], F: [1, -1.73, 0], G: [2, 0, 5], H: [1, 1.73, 5], I: [-1, 1.73, 5], J: [-2, 0, 5], K: [-1, -1.73, 5], L: [1, -1.73, 5], S: [0, 0, 7.5] }, aretes: ["AB", "BC", "CD", "DE", "EF", "FA", "GH", "HI", "IJ", "JK", "KL", "LG", "AG", "BH", "CI", "DJ", "EK", "FL", "SG", "SH", "SI", "SJ", "SK", "SL"], cachees: ["AB", "BC", "BH", "CD", "CI", "HI", "IJ", "IS"] }),
          correction:
            "a) Une colonne à six pans : un prisme droit à base hexagonale. Surmontée d'une pointe à six faces triangulaires : une pyramide à base hexagonale, posée sur le dessus du prisme.\nb) Faces : l'hexagone du bas, 6 rectangles et 6 triangles, soit $1 + 6 + 6 = 13$ faces. L'hexagone du haut n'est plus une face : la pyramide le recouvre.\nArêtes : 6 autour du bas, 6 verticales, 6 autour du haut, 6 qui montent à la pointe : $6 + 6 + 6 + 6 = 24$ arêtes.\nSommets : 6 en bas, 6 en haut, et la pointe : $6 + 6 + 1 = 13$ sommets.\nContrôle : $13 - 24 + 13 = 2$.\nc) La face du bas est remplacée par 6 triangles : $6 + 6 + 6 = 18$ faces. On ajoute 6 arêtes vers la seconde pointe : $24 + 6 = 30$ arêtes. Et un sommet : $13 + 1 = 14$ sommets. Contrôle : $18 - 30 + 14 = 2$.\n⛔ Le piège : additionner les faces du prisme (8) et celles de la pyramide (7), soit 15. L'hexagone où ils se collent disparaît des deux côtés : $15 - 2 = 13$.\nRéponse : un prisme et une pyramide à base hexagonale ; 13 faces, 24 arêtes, 13 sommets ; avec deux pointes, 18 faces, 30 arêtes, 14 sommets.",
          schema: ensemble([
            solide({ sommets: { A: [2, 0, 0], B: [1, 1.73, 0], C: [-1, 1.73, 0], D: [-2, 0, 0], E: [-1, -1.73, 0], F: [1, -1.73, 0], G: [2, 0, 5], H: [1, 1.73, 5], I: [-1, 1.73, 5], J: [-2, 0, 5], K: [-1, -1.73, 5], L: [1, -1.73, 5], S: [0, 0, 7.5] }, aretes: ["AB", "BC", "CD", "DE", "EF", "FA", "GH", "HI", "IJ", "JK", "KL", "LG", "AG", "BH", "CI", "DJ", "EK", "FL", "SG", "SH", "SI", "SJ", "SK", "SL"], cachees: ["AB", "BC", "BH", "CD", "CI", "HI", "IJ", "IS"], faces: ["ABCDEF"] }),
            solide({ sommets: { A: [2, 0, 0], B: [1, 1.73, 0], C: [-1, 1.73, 0], D: [-2, 0, 0], E: [-1, -1.73, 0], F: [1, -1.73, 0], G: [2, 0, 5], H: [1, 1.73, 5], I: [-1, 1.73, 5], J: [-2, 0, 5], K: [-1, -1.73, 5], L: [1, -1.73, 5], S: [0, 0, 7.5], T: [0, 0, -2.5] }, aretes: ["AB", "BC", "CD", "DE", "EF", "FA", "GH", "HI", "IJ", "JK", "KL", "LG", "AG", "BH", "CI", "DJ", "EK", "FL", "SG", "SH", "SI", "SJ", "SK", "SL", "TA", "TB", "TC", "TD", "TE", "TF"], cachees: ["AB", "BC", "BH", "BT", "CD", "CI", "CT", "DT", "HI", "IJ", "IS"] }),
          ], ["une pointe : 13 faces", "deux pointes : 18 faces"]),
          micros: ["vision_reconnaitre", "vision_defi"],
        },
        {
          titre: "Le silo à grain",
          enonce:
            "Un silo à grain est formé d'un cylindre de 6 m de diamètre et de 10 m de haut, surmonté d'un toit en forme de cône, de même diamètre et de 2 m de haut.\na) Décrire sa vue de dessus et sa vue de face.\nb) On coupe le silo par un plan horizontal à 4 m du sol. Quelle est la section ? Donner son rayon.\nc) Même question à 11 m du sol, au milieu de la hauteur du toit.\nd) On coupe le silo par un plan vertical qui passe par son axe. Quelle est la forme de la section ?",
          correction:
            "a) De dessus, je vois le toit, qui est rond : un disque de 3 m de rayon, dont le centre est la pointe du toit. De face, je vois un rectangle de 6 m sur 10 m (le cylindre), surmonté d'un triangle isocèle de 6 m de base et 2 m de haut (le cône).\nb) À 4 m, le plan coupe le cylindre parallèlement à sa base : la section est un disque de même rayon que la base, $6 \\div 2 = 3$ m.\nc) À 11 m, le plan coupe le toit, 1 m au-dessus de sa base : la section est encore un disque, mais plus petit. Sur la vue de face, le toit est un triangle ; à mi-hauteur, le plan passe par les milieux de ses deux côtés. D'après le théorème des milieux, la largeur y est la moitié de la base : $6 \\div 2 = 3$ m de diamètre, donc un rayon de $3 \\div 2 = 1{,}5$ m.\nd) Le plan contient l'axe : il coupe le cylindre selon un rectangle de 6 m sur 10 m, et le cône selon un triangle. La section a la même forme que la vue de face : un pentagone, un rectangle surmonté d'un triangle.\n⛔ Le piège : donner 3 m de rayon au c), comme dans le cylindre. Le cône se resserre vers la pointe : sa section parallèle à la base est plus petite.\nRéponse : de dessus un disque, de face un rectangle surmonté d'un triangle ; à 4 m, un disque de rayon 3 m ; à 11 m, un disque de rayon 1,5 m ; par l'axe, un pentagone.",
          schema: ensemble([
            silo(3, 10, 2, [4, 11]),
            vues([{ titre: "à 4 m : rayon 3 m", cercle: 3 }, { titre: "à 11 m : rayon 1,5 m", cercle: 1.5 }], 12),
          ]),
          micros: ["vision_vues", "vision_section", "vision_defi"],
        },
        {
          titre: "Le bassin de la piscine",
          enonce:
            "Le bassin d'une piscine mesure 25 m de long et 12,5 m de large (5 couloirs de 2,5 m). Sa profondeur passe régulièrement de 1 m au petit bain à 2 m au grand bain. L'eau du bassin, rempli à ras bord, forme un solide.\na) Quel est ce solide ? Quelles sont ses bases ?\nb) Combien a-t-il de faces, d'arêtes et de sommets ?\nc) On coupe l'eau par un plan vertical, dans le sens de la longueur, le long d'une ligne d'eau. Quelle est la section ?\nd) On la coupe par un plan vertical, dans le sens de la largeur, à 10 m du petit bain. Quelle est la section ? Donner ses dimensions.",
          correction:
            "a) Vu de côté, le bassin a la forme d'un trapèze : la surface de l'eau (25 m) en haut, le fond en pente en bas, entre deux bords verticaux de 1 m et 2 m. Ce trapèze est le même sur toute la largeur du bassin : c'est un prisme droit, couché, dont les bases sont les deux trapèzes des murs de côté.\nb) 2 trapèzes et 4 rectangles (la surface, le fond, les murs des deux bouts) : 6 faces. $4 + 4 + 4 = 12$ arêtes, et $4 + 4 = 8$ sommets. Les mêmes nombres qu'un pavé droit, et pourtant ce n'en est pas un : le fond penche.\nc) Le plan est parallèle aux murs de côté, donc aux bases du prisme : la section est un trapèze identique à la base, de 1 m et 2 m de profondeur aux bouts et de 25 m de long.\nd) Ce plan est parallèle au mur du petit bain : la section est un rectangle. Sa largeur est celle du bassin, 12,5 m. Sa hauteur est la profondeur à 10 m du petit bain. La profondeur gagne 1 m sur 25 m, soit $1 \\div 25 = 0{,}04$ m par mètre, donc $10 \\times 0{,}04 = 0{,}4$ m sur 10 m. Profondeur : $1 + 0{,}4 = 1{,}4$ m.\n⛔ Le piège : prendre la profondeur d'un bout, ou la moyenne, 1,5 m. La profondeur dépend de l'endroit où je coupe.\nRéponse : un prisme droit à base trapèze ; 6 faces, 12 arêtes, 8 sommets ; un trapèze ; un rectangle de 12,5 m sur 1,4 m.",
          schema: ensemble([
            bassin(25, 1, 2, 10, 5),
            aPlat([{ pts: [[0, 0], [12.5, 0], [12.5, 1.4], [0, 1.4]], couleur: "#fed7aa" }], [{ de: [0, 0], a: [12.5, 0], texte: "12,5 m", cote: "b" }, { de: [12.5, 0], a: [12.5, 1.4], texte: "1,4 m", cote: "d" }], 14),
          ], ["", "la section à 10 m du petit bain"]),
          micros: ["vision_reconnaitre", "vision_section", "vision_defi"],
        },
        {
          titre: "Le podium",
          enonce:
            "Pour une remise de médailles, on construit un podium avec des cubes de 20 cm d'arête. Chaque marche fait 3 cubes de large et 3 cubes de profondeur. La marche du 1er, au milieu, a 3 cubes de haut ; celle du 2e, à gauche, 2 cubes ; celle du 3e, à droite, 1 cube.\na) Combien faut-il de cubes ?\nb) Décrire la vue de face et la vue de droite.\nc) On peint tout le podium, sauf le dessous posé au sol. Combien de faces de cubes (des carrés de 20 cm de côté) faut-il peindre ? Quelle aire cela représente-t-il, en m² ?",
          correction:
            "a) Chaque marche a $3 \\times 3 = 9$ colonnes. Le 2e : $9 \\times 2 = 18$ cubes ; le 1er : $9 \\times 3 = 27$ ; le 3e : $9 \\times 1 = 9$. En tout $18 + 27 + 9 = 54$ cubes.\nb) De face, je vois les trois marches en escalier : 3 colonnes de 2 carrés, 3 de 3, puis 3 de 1. De droite, je vois la plus haute marche, celle du 1er, qui dépasse les autres : un carré de 3 cubes sur 3.\nc) Je compte les carrés à peindre, côté par côté.\nDevant : $3 \\times 2 + 3 \\times 3 + 3 \\times 1 = 18$ carrés, et autant derrière : 18.\nDessus : une case par colonne, $9 \\times 3 = 27$ carrés.\nCôtés : à gauche, le 2e, $3 \\times 2 = 6$ ; à droite, le 3e, $3 \\times 1 = 3$.\nContremarches : le 1er dépasse le 2e d'un cube, $3 \\times 1 = 3$ ; il dépasse le 3e de deux cubes, $3 \\times 2 = 6$.\nEn tout $18 + 18 + 27 + 6 + 3 + 3 + 6 = 81$ carrés. Un carré a une aire de $0{,}2 \\times 0{,}2 = 0{,}04$ m², donc $81 \\times 0{,}04 = 3{,}24$ m².\n⛔ Le piège : oublier les contremarches, ces côtés du 1er qui dépassent des deux autres marches. De face, on ne les voit pas.\nRéponse : 54 cubes ; 81 carrés à peindre, soit 3,24 m².",
          schema: ensemble([
            empilement([[2, 2, 2, 3, 3, 3, 1, 1, 1], [2, 2, 2, 3, 3, 3, 1, 1, 1], [2, 2, 2, 3, 3, 3, 1, 1, 1]], { u: 18 }),
            vues([{ titre: "de face", hauteurs: [2, 2, 2, 3, 3, 3, 1, 1, 1] }, { titre: "de droite", hauteurs: [3, 3, 3] }], 14),
          ], ["le podium, 54 cubes"]),
          micros: ["vision_vues", "vision_defi"],
        },
      ],
    },
  ],
};
