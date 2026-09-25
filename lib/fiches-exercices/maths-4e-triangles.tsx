// ─── Fiche d'exercices : le triangle pour démontrer (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-triangle.tsx` et sur les
// sept micros du coach de 4e (notionId triangle_figure). L'angle de la 4e,
// comme le cours : le triangle devient un OUTIL DE DÉMONSTRATION — la somme des
// angles et l'inégalité pour contrôler, les hauteurs et médiatrices, les trois
// cas d'égalité, les triangles semblables, et le protocole de construction qui
// relie les deux (les données qui construisent UN triangle sont celles d'un cas
// d'égalité).
// ⛔ Hors programme ici : les angles alternes internes (puce à part du BO),
// Pythagore et le cosinus (autres notions). Les angles donnés « environ » (ombre,
// charpente) sont MESURÉS, jamais calculés par une formule de trigonométrie.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni 62° et 45°, ni 3-5-9 ou
// 3-5-8, ni 4-6-11, ni 4 et 9 cm, ni 40° et 75°, ni le protocole 6-4-5, ni le
// rapport 3 ou 4), ni aucun de la feuille de 3e (48° et 67°, l'échelle, l'étoile,
// le pignon, x, 2x, 3x, le tramway, la poutre, le Louvre, Paris-Lyon-Marseille,
// la voile).
//
// Les pièges nommés : retrancher un seul angle (1, 2), 180 divisé par deux sans
// retirer l'angle connu (8), l'égalité prise pour un triangle (3), hauteur et
// médiatrice confondues (4, 16), l'angle qui n'est pas ENTRE les deux côtés (5),
// ajouter au lieu de multiplier (6), placer un point avant son support (7, 14),
// la borne basse oubliée (9, 20), le « + 20 » oublié (10), le pied de hauteur
// cherché sur le segment (11), les lettres associées au hasard (12), comparer les
// angles donnés sans calculer le troisième (13), trois angles pris pour un cas
// d'égalité (15), la largeur mesurée en biais (17), le rapport renversé (18),
// l'angle droit « qui se voit » (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - triangulation : Delambre et Méchain mesurent la méridienne de Dunkerque à
//   Barcelone par une chaîne de triangles, de 1792 à 1798 (commande de
//   l'Académie des sciences pour définir le mètre) — ex. 17. La rivière, ses
//   60 m et ses angles sont IMAGINÉS ; la largeur (63,7 m) est recalculée par le
//   script ;
// - obélisque de Louxor, place de la Concorde (érigé en 1836) : 22,83 m de haut
//   hors socle (ministère de la Culture, base Mérimée ; Wikipédia), « environ
//   23 m » dans l'énoncé — ex. 18. Les ombres sont imaginées ;
// - course d'orientation : cartes à l'échelle 1/15 000 ou 1/10 000
//   (International Specification for Orienteering Maps, ISOM 2017, Fédération
//   internationale de course d'orientation) — ex. 20 ;
// - ferme de charpente (entrait, arbalétriers, poinçon) : vocabulaire de la
//   charpente traditionnelle ; les mesures 8 m et 5 m sont imaginées — ex. 19.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// autres feuilles.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés. `tri()` est un SVG local — celui de la feuille de 3e, augmenté de ce
// que la 4e demande : des DROITES en plus (hauteur, médiatrice, médiane,
// prolongement d'un côté, rives), des angles droits posés n'importe où, le codage
// du milieu, des arcs de compas, un cercle, une échelle commune à deux triangles
// semblables (`echelle`, en pixels par unité). Le canvas `triangle()` des
// figures ne sait ni surligner un angle trouvé, ni tracer une médiatrice.
// Coordonnées VRAIES, y vers le haut.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-triangles-4e.mjs` — le
// script relit chaque `tri(…)`, mesure ses angles et ses côtés, vérifie les
// angles droits posés, les hauteurs (par le sommet, perpendiculaires),
// médiatrices (par le milieu, perpendiculaires) et médianes (sommet → milieu),
// et que chaque étiquette tient dans le cadre de 260 × 200.
//
// Micro-compétences : triangle_inegalite (3, 9, 14, 15, 19, 20),
// triangle_somme_angle (1, 2, 8, 10, 12, 13, 17, 18, 19), triangle_droites (4,
// 11, 16, 17, 19), triangle_egalite (5, 7, 12, 14, 15, 17, 19),
// triangle_construire (7, 14, 17), triangle_semblable (6, 13, 15, 17, 18, 20),
// triangle_defi (8, 10, 15, 16, 18, 19, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Sommet = "A" | "B" | "C";
type Cote = "AB" | "BC" | "CA";
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";
const GRIS = "#64748b";
const COULEURS = { orange: ORANGE, bleu: BLEU, vert: VERT, gris: GRIS } as const;

/** Une droite en plus du triangle : hauteur, médiatrice, médiane, prolongement. */
type Ligne = { de: P2; vers: P2; couleur?: keyof typeof COULEURS; pointilles?: boolean; nom?: string; ou?: P2; ancre?: Ancre };

const unit = (x: number, y: number): P2 => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};

/**
 * ⭐ UN TRIANGLE À L'ÉCHELLE, ses angles écrits en degrés, l'angle TROUVÉ
 * surligné en orange, et ce que la 4e ajoute : `lignes` (segments en vraies
 * coordonnées, étiquette `nom` posée en `ou`), `carres` (angle droit : coin,
 * puis un point de chaque bras), `milieux` (côtés coupés en deux moitiés codées
 * de deux traits, puis trois…), `points` nommés, `arcs` de compas en C,
 * `cercle`, `echelle` fixe (pixels par unité) pour comparer deux dessins.
 * ⛔ Texte NU (« 35° », « 8 cm ») : SVG, pas de KaTeX.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const tri = (
  pts: { A: P2; B: P2; C: P2 },
  opts: {
    noms?: Partial<Record<Sommet, string>>;
    cotes?: Partial<Record<Cote, string>>;
    angles?: Partial<Record<Sommet, string>>;
    trouve?: Sommet[];
    droit?: Sommet;
    egaux?: Cote[];
    milieux?: Cote[];
    lignes?: Ligne[];
    carres?: [P2, P2, P2][];
    points?: { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" }[];
    arcs?: boolean;
    cercle?: { centre: P2; rayon: number };
    echelle?: number;
  } = {},
) => {
  const W = 260, H = 200, m = 36;
  const reels: P2[] = [pts.A, pts.B, pts.C];
  for (const l of opts.lignes ?? []) reels.push(l.de, l.vers);
  for (const p of opts.points ?? []) reels.push(p.en);
  if (opts.cercle) {
    const { centre: [cx, cy], rayon: r } = opts.cercle;
    reels.push([cx - r, cy - r], [cx + r, cy + r]);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = opts.echelle ?? Math.min((W - 2 * m) / (x1 - x0 || 1), (H - 2 * m) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P: Record<Sommet, P2> = { A: px(pts.A), B: px(pts.B), C: px(pts.C) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
  const voisins: Record<Sommet, [Sommet, Sommet]> = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
  const trouve = new Set(opts.trouve ?? []);
  const ancre = (dx: number): Ancre => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");

  const arc = (V: P2, u1: P2, u2: P2, r: number, plein: boolean, couleur: string, key: string) => {
    const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
    const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
    const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
    const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    return (
      <g key={key}>
        {plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${d.slice(2)} Z`} fill={ORANGE} fillOpacity={0.3} /> : null}
        <path d={d} fill="none" stroke={couleur} strokeWidth={plein ? 2.4 : 1.6} />
      </g>
    );
  };
  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, anchor: Ancre, key: string) => (
    <text key={key} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={anchor} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
      {t}
    </text>
  );
  const equerre = (V: P2, p: P2, q: P2, key: string) => {
    const u1 = unit(p[0] - V[0], p[1] - V[1]);
    const u2 = unit(q[0] - V[0], q[1] - V[1]);
    const c = 10;
    return (
      <path
        key={key}
        d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`}
        fill="none"
        stroke="#dc2626"
        strokeWidth={2.2}
      />
    );
  };
  /** `n` petits traits parallèles au milieu de [pq] (codage des longueurs égales). */
  const traits = (p: P2, q: P2, n: number, key: string) => {
    const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const t = unit(q[0] - p[0], q[1] - p[1]);
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 4;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          return <line key={i} x1={c[0] - nn[0] * 6} y1={c[1] - nn[1] * 6} x2={c[0] + nn[0] * 6} y2={c[1] + nn[1] * 6} stroke={ENCRE} strokeWidth={2} />;
        })}
      </g>
    );
  };

  const cotes = (["AB", "BC", "CA"] as Cote[]).map((c) => [c, P[c[0] as Sommet], P[c[1] as Sommet]] as const);

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Triangle dessiné à l'échelle">
        {opts.cercle ? (
          <circle cx={px(opts.cercle.centre)[0]} cy={px(opts.cercle.centre)[1]} r={opts.cercle.rayon * s} fill="none" stroke={BLEU} strokeWidth={1.4} strokeDasharray="5 4" />
        ) : null}
        <polygon points={`${P.A.join(",")} ${P.B.join(",")} ${P.C.join(",")}`} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {opts.arcs
          ? (["A", "B"] as Sommet[]).map((k) => {
              const V = P[k], Cp = P.C;
              const R = Math.hypot(Cp[0] - V[0], Cp[1] - V[1]);
              const t = Math.atan2(Cp[1] - V[1], Cp[0] - V[0]);
              const [a, b] = [t - 0.3, t + 0.3].map((u) => [V[0] + R * Math.cos(u), V[1] + R * Math.sin(u)] as P2);
              return <path key={`arc${k}`} d={`M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`} fill="none" stroke={VERT} strokeWidth={1.8} />;
            })
          : null}
        {(opts.lignes ?? []).map((l, i) => {
          const [a, b] = [px(l.de), px(l.vers)];
          const couleur = COULEURS[l.couleur ?? "orange"];
          return <line key={`l${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={couleur} strokeWidth={l.pointilles ? 1.8 : 2.4} strokeDasharray={l.pointilles ? "5 4" : undefined} />;
        })}
        {(opts.carres ?? []).map(([v, p, q], i) => equerre(px(v), px(p), px(q), `q${i}`))}
        {(Object.keys(opts.angles ?? {}) as Sommet[]).map((k) => {
          const V = P[k];
          const [p, q] = voisins[k].map((v) => P[v]);
          const u1 = unit(p[0] - V[0], p[1] - V[1]);
          const u2 = unit(q[0] - V[0], q[1] - V[1]);
          const ouvert = (Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180) / Math.PI;
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          const r = 17;
          const loin = r + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
          const t = trouve.has(k);
          let perp = unit(-bi[1], bi[0]);
          if (perp[0] > 0) perp = [-perp[0], -perp[1]];
          const [lx, ly, la]: [number, number, Ancre] =
            ouvert < 25 ? [V[0] + bi[0] * (r + 12) + perp[0] * 8, V[1] + bi[1] * (r + 12) + perp[1] * 8, "end"] : [V[0] + bi[0] * loin, V[1] + bi[1] * loin, "middle"];
          return (
            <g key={k}>
              {k === opts.droit ? null : arc(V, u1, u2, r, t, t ? ORANGE : VIOLET, `a${k}`)}
              {etiquette(lx, ly, opts.angles?.[k] ?? "", t ? ORANGE : VIOLET, 14, la, `l${k}`)}
            </g>
          );
        })}
        {opts.droit ? equerre(P[opts.droit], P[voisins[opts.droit][0]], P[voisins[opts.droit][1]], "droit") : null}
        {(opts.egaux ?? []).map((c) => traits(P[c[0] as Sommet], P[c[1] as Sommet], 1, `e${c}`))}
        {(opts.milieux ?? []).map((c, i) => {
          const [p, q] = [P[c[0] as Sommet], P[c[1] as Sommet]];
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          return (
            <g key={`m${c}`}>
              {traits(p, M, i + 2, "1")}
              {traits(M, q, i + 2, "2")}
            </g>
          );
        })}
        {cotes.map(([c, p, q]) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {(opts.lignes ?? []).map((l, i) => (l.nom && l.ou ? etiquette(px(l.ou)[0], px(l.ou)[1], l.nom, COULEURS[l.couleur ?? "orange"], 13, l.ancre ?? "middle", `ln${i}`) : null))}
        {(opts.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a]: [number, number, Ancre] =
            p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3} fill={ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, ENCRE, 15, a, `pn${i}`)}
            </g>
          );
        })}
        {(["A", "B", "C"] as Sommet[]).map((k) => {
          const V = P[k];
          const d = unit(V[0] - G[0], V[1] - G[1]);
          return (
            <g key={`s${k}`}>
              <circle cx={V[0]} cy={V[1]} r={3.5} fill={ENCRE} />
              {etiquette(V[0] + d[0] * 15, V[1] + d[1] * 15, opts.noms?.[k] ?? k, ENCRE, 15, ancre(d[0]), `n${k}`)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Deux dessins côte à côte (l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

const nombre = (x: number) => String(x).replace(".", ",");

/**
 * ⭐ L'INÉGALITÉ TRIANGULAIRE, VUE : en haut le plus grand côté (bleu), en
 * dessous les deux autres mis bout à bout (orange, vert), à la même échelle.
 * Le pointillé marque le bout du grand côté : les deux petits l'atteignent-ils ?
 * ⭐ Le script de recalcul relit `{ grand, petits }` : en clair.
 */
const longueurs = (cas: { grand: number; petits: [number, number] }[], unite = "cm") => {
  const s = 200 / Math.max(...cas.map((c) => Math.max(c.grand, c.petits[0] + c.petits[1])));
  const h = 78;
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 260 ${h * cas.length}`} className="block h-auto w-full" role="img" aria-label="Le plus grand côté comparé aux deux autres mis bout à bout">
        {cas.map(({ grand, petits: [a, b] }, i) => {
          const y = i * h;
          const x0 = 22;
          const somme = Math.round((a + b) * 1000) / 1000;
          const verdict = somme > grand ? "triangle" : somme === grand ? "plat" : "pas de triangle";
          return (
            <g key={i}>
              <rect x={x0} y={y + 16} width={grand * s} height={9} rx={2} fill={BLEU} />
              <text x={x0 + (grand * s) / 2} y={y + 10} textAnchor="middle" fontSize={13} fontWeight={800} fill={BLEU}>
                {`${nombre(grand)} ${unite}`}
              </text>
              <rect x={x0} y={y + 38} width={a * s} height={9} rx={2} fill={ORANGE} />
              <rect x={x0 + a * s} y={y + 38} width={b * s} height={9} rx={2} fill={VERT} />
              <text x={x0 + (a * s) / 2} y={y + 62} textAnchor="middle" fontSize={13} fontWeight={800} fill={ORANGE}>
                {nombre(a)}
              </text>
              <text x={x0 + a * s + (b * s) / 2} y={y + 62} textAnchor="middle" fontSize={13} fontWeight={800} fill={VERT}>
                {nombre(b)}
              </text>
              <line x1={x0 + grand * s} y1={y + 12} x2={x0 + grand * s} y2={y + 52} stroke={ENCRE} strokeWidth={1.4} strokeDasharray="3 3" />
              <text x={254} y={y + 74} textAnchor="end" fontSize={13} fontWeight={800} fill={somme > grand ? VERT : "#dc2626"}>
                {verdict}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesTriangles4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "triangle-figure",
  titre: "Le triangle : angles, droites, égalité et triangles semblables",
  accroche:
    "Vingt exercices, du geste seul au problème : calculer un angle manquant, tester si trois longueurs ferment un triangle, reconnaître une hauteur, une médiatrice ou une médiane, citer un cas d'égalité, calculer un côté dans deux triangles semblables, écrire un protocole de construction. Puis la largeur d'une rivière, l'ombre de l'obélisque de la Concorde, une charpente et une course d'orientation. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le triangle dessiné à l'échelle, ce qu'on cherche en orange, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/triangle-figure", titre: "Le triangle pour démontrer" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une propriété par exercice. Je regarde d'abord ce qui est donné : des angles, des côtés, ou des droites.",
      rappel: [
        "Dans tout triangle, les trois angles font $180°$ au total. Pour trouver le troisième, je retranche les deux connus de $180$.",
        "Inégalité triangulaire : trois longueurs forment un triangle seulement si la PLUS GRANDE est plus petite que la somme des deux autres. Si elle est égale, le triangle est plat.",
        "La hauteur issue d'un sommet passe par ce sommet et coupe le côté opposé à angle droit. La médiatrice d'un côté passe par son MILIEU, à angle droit. La médiane relie un sommet au milieu du côté opposé.",
        "Trois cas d'égalité : les trois côtés ; deux côtés et l'angle ENTRE eux ; un côté et les deux angles qui le touchent. Mêmes angles seulement : les triangles sont SEMBLABLES, leurs côtés sont proportionnels.",
      ],
      exercices: [
        {
          enonce: "Dans le triangle $RST$, $\\widehat{R} = 57°$ et $\\widehat{S} = 71°$.\na) Calculer $\\widehat{T}$.\nb) Quel est le plus grand angle du triangle ?",
          correction:
            "a) Les trois angles d'un triangle font toujours $180°$ : il ne m'en manque qu'un.\nJ'additionne les deux angles connus : $57 + 71 = 128$.\nJe retranche de $180$ : $\\widehat{T} = 180° - 128° = 52°$.\nJe vérifie : $57 + 71 + 52 = 180$.\nb) Je compare $57°$, $71°$ et $52°$ : le plus grand angle est $\\widehat{S}$, qui mesure $71°$.\n⛔ Le piège : retrancher un seul angle, $180 - 57 = 123$. Il faut retirer les DEUX angles connus.\nRéponse : $\\widehat{T} = 52°$ ; le plus grand angle est $\\widehat{S}$.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [3.921, 6.0378] }, { noms: { A: "R", B: "S", C: "T" }, angles: { A: "57°", B: "71°", C: "52°" }, trouve: ["C"] }),
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Le triangle $KLM$ est rectangle en $K$, et $\\widehat{L} = 28°$.\na) Calculer $\\widehat{M}$.\nb) Un triangle rectangle peut-il avoir un angle de $95°$ ?",
          correction:
            "a) L'angle droit prend déjà $90°$ sur les $180°$ : il reste $180 - 90 = 90$ degrés pour les deux autres angles.\nDonc $\\widehat{M} = 90° - 28° = 62°$.\nJe vérifie : $90 + 28 + 62 = 180$.\nb) Avec l'angle droit, on aurait déjà $90 + 95 = 185$ degrés : plus que $180°$. Impossible.\n⭐ Dans un triangle rectangle, les deux autres angles sont toujours aigus.\n⛔ Le piège : calculer $180° - 28° = 152°$ en oubliant l'angle droit. Un angle de $152°$ ne tient pas à côté d'un angle droit.\nRéponse : $\\widehat{M} = 62°$ ; non, pas d'angle de $95°$ dans un triangle rectangle.",
          schema: tri({ A: [0, 0], B: [5, 0], C: [0, 2.6585] }, { noms: { A: "K", B: "L", C: "M" }, angles: { B: "28°", C: "62°" }, trouve: ["C"], droit: "A" }),
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Peut-on construire un triangle avec ces trois longueurs ?\na) $3$ cm, $8$ cm et $4$ cm.\nb) $6$ cm, $6$ cm et $10$ cm.\nc) $2{,}5$ cm, $6$ cm et $3{,}5$ cm.",
          correction:
            "Je repère la PLUS GRANDE longueur, et je la compare à la somme des deux autres.\na) La plus grande est $8$. $3 + 4 = 7$, et $7 < 8$ : les deux petits côtés, mis bout à bout, n'atteignent pas le bout du grand. Pas de triangle.\nb) La plus grande est $10$. $6 + 6 = 12$, et $12 > 10$ : le triangle existe.\nc) La plus grande est $6$. $2{,}5 + 3{,}5 = 6$ : la somme est ÉGALE au grand côté. Les trois points sont alignés, le triangle est plat.\n⛔ Le piège au c) : dire « oui » parce que la somme n'est pas plus petite. Il faut qu'elle soit strictement plus GRANDE ; l'égalité donne un triangle aplati, qui n'en est pas un vrai.\nRéponse : a) non ; b) oui ; c) non, il est plat.",
          schema: longueurs([{ grand: 8, petits: [3, 4] }, { grand: 10, petits: [6, 6] }, { grand: 6, petits: [2.5, 3.5] }]),
          micros: ["triangle_inegalite"],
        },
        {
          enonce:
            "Sur la figure, les droites $(d_1)$, $(d_2)$ et $(d_3)$ coupent le côté $[BC]$ du triangle $ABC$. Les codages sont justes.\na) Laquelle est la hauteur issue de $A$ ?\nb) Laquelle est la médiatrice de $[BC]$ ?\nc) Laquelle est la médiane issue de $A$ ?",
          figure: tri({ A: [9, 6], B: [0, 0], C: [10, 0] }, { milieux: ["BC"], lignes: [{ de: [9, 6], vers: [4.3333, -1], couleur: "gris", nom: "(d1)", ou: [4.1, -1.6], ancre: "end" }, { de: [5, -0.4], vers: [5, 6.8], couleur: "gris", nom: "(d2)", ou: [5, 7.4] }, { de: [9, 6], vers: [9, -1], couleur: "gris", nom: "(d3)", ou: [9, -1.6] }], carres: [[[5, 0], [5, 6.8], [0, 0]], [[9, 0], [9, 6], [0, 0]]] }),
          correction:
            "Pour chaque droite, je vérifie DEUX conditions : par où elle passe, et si elle coupe $[BC]$ à angle droit.\n$(d_3)$ passe par le sommet $A$ et coupe $[BC]$ à angle droit (le petit carré) : c'est la hauteur issue de $A$.\n$(d_2)$ coupe $[BC]$ à angle droit en son MILIEU (les traits codent deux moitiés égales), mais elle ne passe pas par $A$ : c'est la médiatrice de $[BC]$.\n$(d_1)$ passe par $A$ et par le milieu de $[BC]$, sans angle droit : c'est la médiane issue de $A$.\n⛔ Le piège : confondre $(d_2)$ et $(d_3)$, toutes deux perpendiculaires à $[BC]$. La hauteur part du SOMMET ; la médiatrice part du MILIEU.\nRéponse : a) $(d_3)$ ; b) $(d_2)$ ; c) $(d_1)$.",
          schema: tri({ A: [9, 6], B: [0, 0], C: [10, 0] }, { milieux: ["BC"], lignes: [{ de: [9, 6], vers: [4.3333, -1], couleur: "vert", nom: "médiane", ou: [4.1, -1.6], ancre: "end" }, { de: [5, -0.4], vers: [5, 6.8], couleur: "bleu", nom: "médiatrice", ou: [5, 7.4] }, { de: [9, 6], vers: [9, -1], couleur: "orange", nom: "hauteur", ou: [9, -1.6] }], carres: [[[5, 0], [5, 6.8], [0, 0]], [[9, 0], [9, 6], [0, 0]]] }),
          micros: ["triangle_droites"],
        },
        {
          enonce:
            "Les triangles $ABC$ et $DEF$ vérifient $AB = DE = 5$ cm, $AC = DF = 7$ cm et $\\widehat{A} = \\widehat{D} = 44°$.\na) Ces triangles sont-ils égaux ? Citer le cas d'égalité.\nb) On mesure $BC = 4{,}9$ cm. Combien mesure $EF$ ?",
          correction:
            "a) Je regarde où est l'angle connu : en $A$, il est ENTRE les côtés $[AB]$ et $[AC]$. De même, en $D$, il est entre $[DE]$ et $[DF]$.\nDeux côtés égaux deux à deux et l'angle compris entre eux égal : c'est un cas d'égalité. Les triangles $ABC$ et $DEF$ sont égaux.\nb) Des triangles égaux ont TOUS leurs côtés égaux deux à deux. Je suis l'ordre des lettres : $A$ va avec $D$, $B$ avec $E$, $C$ avec $F$. Donc $[BC]$ va avec $[EF]$, et $EF = BC = 4{,}9$ cm.\n⭐ Sur le dessin, $DEF$ est retourné : il reste superposable à $ABC$, comme un calque qu'on retourne.\n⛔ Le piège : ne pas vérifier la PLACE de l'angle. Avec l'angle de $44°$ en $B$ au lieu de $A$, il ne serait plus entre les deux côtés connus, et ce ne serait plus un cas d'égalité.\nRéponse : a) oui, deux côtés et l'angle compris entre eux ; b) $EF = 4{,}9$ cm.",
          schema: deux(
            tri({ A: [0, 0], B: [5, 0], C: [5.0354, 4.8626] }, { cotes: { AB: "5 cm", BC: "4,9 cm", CA: "7 cm" }, angles: { A: "44°" }, echelle: 24 }),
            tri({ A: [0, 0], B: [5, 0], C: [5.0354, -4.8626] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "5 cm", BC: "4,9 cm", CA: "7 cm" }, angles: { A: "44°" }, echelle: 24 }),
          ),
          micros: ["triangle_egalite"],
        },
        {
          enonce:
            "Les triangles $ABC$ et $DEF$ sont semblables : $A$ correspond à $D$, $B$ à $E$ et $C$ à $F$. On sait que $AB = 8$ cm, $AC = 6$ cm, $BC = 4$ cm, $DF = 9$ cm et $EF = 6$ cm.\nCalculer $DE$.",
          correction:
            "Dans deux triangles semblables, les côtés du grand sont ceux du petit multipliés par un MÊME nombre, le rapport.\nJe cherche un couple de côtés correspondants que je connais tous les deux : $[AC]$ et $[DF]$. Le rapport vaut $9 \\div 6 = 1{,}5$.\nJe vérifie avec l'autre couple : $4 \\times 1{,}5 = 6$, c'est bien $EF$.\nJ'applique le rapport au côté $[AB]$ : $DE = 8 \\times 1{,}5 = 12$ cm.\n⛔ Le piège : AJOUTER au lieu de multiplier. $9 - 6 = 3$, et $8 + 3 = 11$ : faux, car $4 + 3 = 7$, pas $6$. Un agrandissement multiplie les longueurs.\nRéponse : $DE = 12$ cm.",
          schema: deux(
            tri({ A: [0, 0], B: [8, 0], C: [5.25, 2.9047] }, { cotes: { AB: "8 cm", BC: "4 cm", CA: "6 cm" }, echelle: 15 }),
            tri({ A: [0, 0], B: [12, 0], C: [7.875, 4.3571] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "? = 12 cm", BC: "6 cm", CA: "9 cm" }, echelle: 15 }),
          ),
          micros: ["triangle_semblable"],
        },
        {
          enonce:
            "On veut construire le triangle $LMN$ tel que $LM = 6{,}5$ cm, $LN = 4{,}5$ cm et $\\widehat{MLN} = 55°$. Voici les étapes du protocole, dans le désordre.\n(1) Placer le point $N$ sur cette demi-droite, à $4{,}5$ cm de $L$.\n(2) Tracer le segment $[LM]$ de $6{,}5$ cm.\n(3) Tracer le segment $[MN]$.\n(4) Au rapporteur, tracer une demi-droite d'origine $L$ qui fait un angle de $55°$ avec $[LM]$.\nRemettre les étapes dans l'ordre.",
          correction:
            "Je commence par ce qui se trace SANS RIEN CHERCHER : un segment de longueur connue. C'est l'étape (2), $[LM]$ de $6{,}5$ cm.\nL'angle de $55°$ est en $L$ : je le reporte au rapporteur à partir de $[LM]$, étape (4).\nLe point $N$ est sur cette demi-droite, à $4{,}5$ cm de $L$ : étape (1).\nIl ne reste qu'à fermer le triangle : étape (3).\n⭐ Deux côtés et l'angle compris entre eux : c'est un cas d'égalité, donc ce protocole donne toujours le même triangle.\n⛔ Le piège : placer $N$ avant d'avoir tracé la demi-droite. Sans elle, on sait seulement que $N$ est à $4{,}5$ cm de $L$ : il pourrait être n'importe où sur un cercle.\nRéponse : (2), (4), (1), (3).",
          schema: tri({ A: [0, 0], B: [6.5, 0], C: [2.5811, 3.6862] }, { noms: { A: "L", B: "M", C: "N" }, cotes: { AB: "6,5 cm", CA: "4,5 cm" }, angles: { A: "55°" }, lignes: [{ de: [0, 0], vers: [3.6135, 5.1607], couleur: "gris", pointilles: true }] }),
          micros: ["triangle_construire", "triangle_egalite"],
        },
        {
          enonce: "Dans le triangle $DEF$, l'angle $\\widehat{D}$ mesure $116°$.\na) Ce triangle peut-il avoir un angle droit ?\nb) On sait de plus que $\\widehat{E} = \\widehat{F}$. Calculer ces deux angles.",
          correction:
            "a) Avec un angle droit en plus, j'aurais déjà $116 + 90 = 206$ degrés : plus que $180°$. Impossible : ses deux autres angles sont aigus.\nb) Il reste $180 - 116 = 64$ degrés pour $\\widehat{E}$ et $\\widehat{F}$ ensemble.\nIls sont égaux : je partage en deux, $64 \\div 2 = 32$.\nJe vérifie : $116 + 32 + 32 = 180$.\n⛔ Le piège : diviser $180$ par deux sans retirer $\\widehat{D}$, soit $90°$ chacun. Contrôle : $116 + 90 + 90 = 296$, bien trop.\nRéponse : a) non ; b) $\\widehat{E} = \\widehat{F} = 32°$.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [3, 1.8746] }, { noms: { A: "E", B: "F", C: "D" }, angles: { A: "32°", B: "32°", C: "116°" }, trouve: ["A", "B"], egaux: ["BC", "CA"] }),
          micros: ["triangle_somme_angle", "triangle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je code sur la figure ce que je sais, je cite la propriété, puis je calcule.",
      rappel: [
        "Un angle inconnu s'appelle $x$ : j'écris que la somme des trois angles vaut $180$, puis je résous l'équation.",
        "Le troisième côté est encadré : plus grand que la DIFFÉRENCE des deux autres, plus petit que leur SOMME.",
        "Égaux : je cite le cas, puis je suis l'ordre des lettres pour associer les côtés. Semblables : je calcule le rapport sur un couple de côtés connus, puis je multiplie.",
        "Les points à égale distance de $A$ et de $B$ sont sur la médiatrice de $[AB]$. Les trois médiatrices d'un triangle se coupent en un même point.",
      ],
      exercices: [
        {
          enonce:
            "Un jardinier a posé deux bordures droites de $7$ m et $12$ m, qui se touchent en un coin. Il veut fermer un potager triangulaire avec une troisième bordure de $L$ mètres, un nombre entier.\na) Entre quelles valeurs $L$ doit-il se trouver ?\nb) Combien de longueurs entières sont possibles ?\nc) Le potager peut-il avoir un périmètre de $40$ m ?",
          correction:
            "a) La troisième bordure est plus petite que la somme des deux autres : $L < 7 + 12 = 19$.\nEt la bordure de $12$ m doit être plus petite que $7 + L$ : il faut $L > 12 - 7 = 5$.\nDonc $5 < L < 19$.\nb) Les entiers strictement entre $5$ et $19$ vont de $6$ à $18$ : il y en a $18 - 6 + 1 = 13$.\nc) Un périmètre de $40$ m demanderait $L = 40 - 7 - 12 = 21$. Or $21 > 19$ : impossible.\n⛔ Le piège : oublier la borne BASSE. Avec $L = 4$, on aurait $7 + 4 = 11 < 12$ : les deux petites bordures ne rejoindraient pas les bouts de la grande.\nRéponse : $5 < L < 19$ ; $13$ longueurs, de $6$ à $18$ m ; un périmètre de $40$ m est impossible.",
          schema: deux(
            tri({ A: [0, 0], B: [12, 0], C: [6.5417, 2.4913] }, { cotes: { AB: "12 m", BC: "6 m", CA: "7 m" } }),
            tri({ A: [0, 0], B: [12, 0], C: [-5.4583, 4.3825] }, { cotes: { AB: "12 m", BC: "18 m", CA: "7 m" } }),
          ),
          micros: ["triangle_inegalite"],
        },
        {
          enonce:
            "Les angles d'un triangle $ABC$ mesurent, en degrés, $\\widehat{A} = x$, $\\widehat{B} = x + 20$ et $\\widehat{C} = 2x$.\na) Écrire une équation, puis trouver $x$.\nb) En déduire les trois angles. Le triangle est-il rectangle ?",
          correction:
            "a) La somme des trois angles vaut $180°$ : $x + (x + 20) + 2x = 180$.\nJe regroupe les $x$ : $4x + 20 = 180$, donc $4x = 160$ et $x = 160 \\div 4 = 40$.\nb) $\\widehat{A} = 40°$, $\\widehat{B} = 40° + 20° = 60°$ et $\\widehat{C} = 2 \\times 40° = 80°$.\nJe vérifie : $40 + 60 + 80 = 180$.\nAucun angle ne vaut $90°$ : le triangle n'est pas rectangle. Ses trois angles sont aigus.\n⛔ Le piège : oublier le $+ 20$ et écrire $4x = 180$, soit $x = 45$. Contrôle : $45 + 65 + 90 = 200$, pas $180$.\nRéponse : $x = 40$ ; les angles valent $40°$, $60°$ et $80°$ ; le triangle n'est pas rectangle.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [4.0419, 3.3915] }, { angles: { A: "40°", B: "60°", C: "80°" }, trouve: ["A", "B", "C"] }),
          micros: ["triangle_somme_angle", "triangle_defi"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $BC = 4$ cm et l'angle $\\widehat{B}$ est obtus. La hauteur issue de $A$ coupe la droite $(BC)$ en $H$, avec $AH = 3$ cm.\na) Le point $H$ est-il sur le segment $[BC]$ ? Comment tracer cette hauteur ?\nb) Calculer l'aire du triangle $ABC$.\nc) Un élève dit : « cette hauteur n'existe pas, puisqu'elle ne coupe pas $[BC]$. » A-t-il raison ?",
          correction:
            "a) L'angle en $B$ est obtus : le sommet $A$ dépasse, du côté de $B$, au-dessus de la droite $(BC)$. Le pied $H$ tombe donc HORS du segment $[BC]$.\nPour tracer la hauteur, je prolonge d'abord le côté $[CB]$ au-delà de $B$ (en pointillés), puis je trace la perpendiculaire à $(BC)$ qui passe par $A$.\nb) L'aire d'un triangle vaut base fois hauteur divisé par $2$, avec la hauteur relative à cette base : $\\dfrac{BC \\times AH}{2} = \\dfrac{4 \\times 3}{2} = 6$ cm².\nc) Non. La hauteur passe par le sommet et coupe à angle droit la DROITE qui porte le côté opposé, pas forcément le segment. Dans un triangle obtus, deux des trois hauteurs tombent dehors.\n⛔ Le piège : chercher le pied de la hauteur sur le segment $[BC]$, et tracer à la place une droite qui n'est pas perpendiculaire.\nRéponse : $H$ est sur le prolongement de $[CB]$ ; l'aire vaut $6$ cm² ; l'élève a tort.",
          schema: tri({ A: [-2, 3], B: [0, 0], C: [4, 0] }, { cotes: { BC: "4 cm" }, lignes: [{ de: [0, 0], vers: [-2.8, 0], couleur: "gris", pointilles: true }, { de: [-2, 3], vers: [-2, 0], couleur: "orange", nom: "3 cm", ou: [-2.25, 1.5], ancre: "end" }], carres: [[[-2, 0], [-2, 3], [0, 0]]], points: [{ en: [-2, 0], nom: "H", vers: "bas" }] }),
          micros: ["triangle_droites"],
        },
        {
          enonce:
            "Les triangles $MNP$ et $RST$ vérifient $MN = RS = 6$ cm, $\\widehat{M} = \\widehat{R} = 42°$ et $\\widehat{N} = \\widehat{S} = 65°$.\na) Montrer que ces triangles sont égaux.\nb) Calculer $\\widehat{P}$ et $\\widehat{T}$.\nc) On mesure $RT = 5{,}7$ cm et $ST = 4{,}2$ cm. En déduire $MP$ et $NP$.",
          correction:
            "a) Les côtés $[MN]$ et $[RS]$ ont la même longueur, $6$ cm. Les angles qui touchent $[MN]$, en $M$ et en $N$, sont égaux à ceux qui touchent $[RS]$, en $R$ et en $S$.\nUn côté et les deux angles qui le touchent : c'est un cas d'égalité. Les triangles $MNP$ et $RST$ sont égaux.\nb) $\\widehat{P} = 180° - 42° - 65° = 73°$, et de même $\\widehat{T} = 73°$.\nc) Je suis l'ordre des lettres : $M$ va avec $R$, $N$ avec $S$, $P$ avec $T$. Donc $[MP]$ va avec $[RT]$, et $[NP]$ avec $[ST]$.\n$MP = RT = 5{,}7$ cm et $NP = ST = 4{,}2$ cm.\n⛔ Le piège : associer les côtés au hasard, par exemple $[MP]$ avec $[ST]$. C'est l'ordre des lettres qui fait la correspondance, pas la place sur le dessin.\nRéponse : les triangles sont égaux ; $\\widehat{P} = \\widehat{T} = 73°$ ; $MP = 5{,}7$ cm et $NP = 4{,}2$ cm.",
          schema: deux(
            tri({ A: [0, 0], B: [6, 0], C: [4.2258, 3.8049] }, { noms: { A: "M", B: "N", C: "P" }, cotes: { AB: "6 cm", BC: "4,2 cm", CA: "5,7 cm" }, angles: { A: "42°", B: "65°", C: "73°" }, trouve: ["C"], echelle: 26 }),
            tri({ A: [0, 0], B: [-6, 0], C: [-4.2258, 3.8049] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "6 cm", BC: "4,2 cm", CA: "5,7 cm" }, angles: { A: "42°", B: "65°", C: "73°" }, trouve: ["C"], echelle: 26 }),
          ),
          micros: ["triangle_egalite", "triangle_somme_angle"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $\\widehat{A} = 58°$ et $\\widehat{B} = 52°$. Dans le triangle $DEF$, $\\widehat{D} = 58°$ et $\\widehat{F} = 70°$.\na) Montrer que ces deux triangles sont semblables.\nb) On sait que $AB = 6$ cm, $DE = 9$ cm et $AC = 5$ cm. Calculer $DF$.\nc) Ces triangles sont-ils égaux ?",
          correction:
            "a) Je calcule les angles qui manquent. Dans $ABC$ : $\\widehat{C} = 180° - 58° - 52° = 70°$. Dans $DEF$ : $\\widehat{E} = 180° - 58° - 70° = 52°$.\nLes deux triangles ont des angles de $58°$, $52°$ et $70°$ : leurs angles sont égaux deux à deux, ils sont semblables. $A$ va avec $D$, $B$ avec $E$, $C$ avec $F$.\nb) $[AB]$ va avec $[DE]$ : le rapport vaut $9 \\div 6 = 1{,}5$.\n$[AC]$ va avec $[DF]$ : $DF = 5 \\times 1{,}5 = 7{,}5$ cm.\nc) Non : $DE = 9$ cm alors que $AB = 6$ cm. Même forme, mais pas la même taille.\n⛔ Le piège : comparer les angles donnés sans calculer les autres. $\\widehat{B} = 52°$ et $\\widehat{F} = 70°$ ne se ressemblent pas ; c'est le troisième angle qui révèle la correspondance.\nRéponse : les triangles sont semblables ; $DF = 7{,}5$ cm ; ils ne sont pas égaux.",
          schema: deux(
            tri({ A: [0, 0], B: [6, 0], C: [2.6663, 4.267] }, { cotes: { AB: "6 cm", CA: "5 cm" }, angles: { A: "58°", B: "52°", C: "70°" }, trouve: ["C"], echelle: 19 }),
            tri({ A: [0, 0], B: [9, 0], C: [3.9994, 6.4004] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "9 cm", CA: "7,5 cm" }, angles: { A: "58°", B: "52°", C: "70°" }, trouve: ["B"], echelle: 19 }),
          ),
          micros: ["triangle_semblable", "triangle_somme_angle"],
        },
        {
          enonce:
            "On veut construire le triangle $EFG$ tel que $EF = 7$ cm, $EG = 4{,}5$ cm et $FG = 5{,}5$ cm.\na) Vérifier que ce triangle existe.\nb) Écrire un protocole de construction à la règle et au compas.\nc) Deux élèves suivent ce protocole. Obtiennent-ils le même triangle ? Pourquoi ?\nd) Et si l'on demandait $FG = 12$ cm ?",
          correction:
            "a) Le plus grand côté est $EF = 7$ cm, et $4{,}5 + 5{,}5 = 10$. Comme $10 > 7$, le triangle existe.\nb) Je trace le segment $[EF]$ de $7$ cm. Je trace un arc de cercle de centre $E$ et de rayon $4{,}5$ cm, puis un arc de centre $F$ et de rayon $5{,}5$ cm, du même côté de $[EF]$. Le point $G$ est à l'intersection des deux arcs. Je trace $[EG]$ et $[FG]$.\nc) Oui, à la position près : leurs deux triangles ont les mêmes trois côtés. Trois côtés égaux deux à deux, c'est un cas d'égalité : les deux figures sont superposables.\nd) Le plus grand côté serait $12$, et $7 + 4{,}5 = 11{,}5 < 12$. Les deux arcs ne se couperaient jamais : pas de triangle.\n⛔ Le piège : commencer par un arc, avant d'avoir tracé $[EF]$. Un arc a besoin de son CENTRE, et les centres sont les extrémités du segment.\nRéponse : le triangle existe ; protocole : $[EF]$, puis deux arcs, $G$ à leur intersection ; le même triangle pour tous (les trois côtés) ; avec $12$ cm, c'est impossible.",
          schema: tri({ A: [0, 0], B: [7, 0], C: [2.7857, 3.5341] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "7 cm", BC: "5,5 cm", CA: "4,5 cm" }, arcs: true }),
          micros: ["triangle_construire", "triangle_egalite", "triangle_inegalite"],
        },
        {
          enonce:
            "Dans chaque cas, les deux triangles sont-ils égaux, seulement semblables, ou l'un d'eux n'existe-t-il pas ?\na) Les deux triangles ont des angles de $30°$, $70°$ et $80°$.\nb) Côtés de $5$, $6$ et $8$ cm pour l'un ; de $8$, $5$ et $6$ cm pour l'autre.\nc) Côtés de $3$, $4$ et $6$ cm pour l'un ; de $6$, $8$ et $12$ cm pour l'autre.\nd) Côtés de $3$, $4$ et $6$ cm pour l'un ; de $2$, $3$ et $6$ cm pour l'autre.",
          correction:
            "a) Mêmes angles : même FORME. Mais aucune longueur n'est donnée, rien ne fixe la taille. Ils sont semblables, pas forcément égaux.\nb) Je range les côtés : $5$, $6$, $8$ dans les deux cas. Trois côtés égaux deux à deux : c'est un cas d'égalité, les triangles sont égaux.\nc) Je range, puis je divise : $6 \\div 3 = 2$, $8 \\div 4 = 2$, $12 \\div 6 = 2$. Tous les côtés sont multipliés par $2$ : semblables, pas égaux.\nd) Pour le second, le plus grand côté vaut $6$, et $2 + 3 = 5 < 6$ : ce triangle n'existe pas.\n⛔ Le piège au a) : croire que trois angles égaux suffisent pour l'égalité. Trois angles ne sont PAS un cas d'égalité : il manque toujours une longueur.\nRéponse : a) semblables ; b) égaux ; c) semblables, de rapport $2$ ; d) le second n'existe pas.",
          schema: deux(
            tri({ A: [0, 0], B: [6, 0], C: [3.5833, 1.7776] }, { cotes: { AB: "6 cm", BC: "3 cm", CA: "4 cm" }, echelle: 15 }),
            tri({ A: [0, 0], B: [12, 0], C: [7.1667, 3.5551] }, { noms: { A: "D", B: "E", C: "F" }, cotes: { AB: "12 cm", BC: "6 cm", CA: "8 cm" }, echelle: 15 }),
          ),
          micros: ["triangle_egalite", "triangle_semblable", "triangle_inegalite", "triangle_defi"],
        },
        {
          enonce:
            "Trois villages $A$, $B$ et $C$ sont placés sur un plan à l'échelle $1$ cm pour $1$ km. La commune veut installer une antenne à la MÊME distance des trois villages.\na) Où sont les points à égale distance de $A$ et de $B$ ?\nb) Comment trouver le point $O$ où installer l'antenne ?\nc) Sur le plan, on mesure $OA = 4{,}5$ cm. À quelle distance des villages est l'antenne ?",
          correction:
            "a) Les points à égale distance de $A$ et de $B$ sont sur la médiatrice de $[AB]$ : la droite qui passe par le milieu de $[AB]$ et le coupe à angle droit.\nb) Je trace la médiatrice de $[AB]$ et celle de $[AC]$. Leur point d'intersection $O$ est à égale distance de $A$ et de $B$, et de $A$ et de $C$ : donc des trois villages.\n⭐ Du coup, $O$ est aussi à égale distance de $B$ et de $C$ : la troisième médiatrice passe par $O$. Les trois médiatrices se coupent en un même point.\nc) Sur le plan, $1$ cm représente $1$ km : $OA = 4{,}5$ km. Comme $OA = OB = OC$, l'antenne est à environ $4{,}5$ km de chaque village. Le cercle de centre $O$ passe par les trois villages.\n⛔ Le piège : tracer les HAUTEURS du triangle. Elles passent par les sommets, mais leur point commun n'est pas à égale distance des villages.\nRéponse : sur la médiatrice de $[AB]$ ; $O$ est le point commun des médiatrices ; l'antenne est à environ $4{,}5$ km de chaque village.",
          schema: tri({ A: [0, 0], B: [8, 0], C: [2, 6] }, { lignes: [{ de: [4, -1.5], vers: [4, 5], couleur: "bleu" }, { de: [-1.4, 3.8], vers: [6.4, 1.2], couleur: "bleu" }, { de: [3, 1], vers: [6.5, 4.5], couleur: "bleu" }], carres: [[[4, 0], [4, 5], [8, 0]], [[1, 3], [2, 6], [-1.4, 3.8]], [[5, 3], [2, 6], [6.5, 4.5]]], points: [{ en: [4, 2], nom: "O", vers: "droite" }], cercle: { centre: [4, 2], rayon: 4.4721 } }),
          micros: ["triangle_droites", "triangle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine, je code, je choisis la propriété qui s'applique aux données, puis je réponds par une phrase.",
      rappel: [
        "Un côté et ses deux angles, ou deux côtés et l'angle entre eux, ou trois côtés : un seul triangle possible. On peut donc le reconstruire à l'échelle et y MESURER ce qu'on ne peut pas atteindre.",
        "Semblables : mêmes angles, côtés multipliés par un même rapport. Un plan à l'échelle est semblable à la réalité.",
        "Somme des angles : $180°$. Inégalité triangulaire : la ligne droite est le plus court chemin.",
      ],
      exercices: [
        {
          titre: "La largeur de la rivière",
          enonce:
            "Pour mesurer la largeur d'une rivière sans la traverser, on plante deux piquets $A$ et $B$ sur une rive, à $60$ m l'un de l'autre. Sur l'autre rive se trouve un arbre $C$. Avec un viseur, on mesure $\\widehat{CAB} = 70°$ et $\\widehat{CBA} = 60°$. Les deux rives sont parallèles.\na) Calculer l'angle $\\widehat{ACB}$.\nb) Pourquoi ces mesures déterminent-elles un seul triangle ?\nc) On reconstruit ce triangle sur papier à l'échelle $\\dfrac{1}{1\\,000}$. Quelle longueur donner à $[AB]$ ? Le dessin est-il égal au vrai triangle, ou semblable ?\nd) Sur le dessin, la hauteur issue de $C$ mesure $6{,}4$ cm. Quelle est la largeur de la rivière ?",
          correction:
            "a) $\\widehat{ACB} = 180° - 70° - 60° = 50°$.\nb) On connaît un côté, $[AB]$, et les deux angles qui le touchent : c'est un cas d'égalité. Tous les triangles construits avec ces mesures sont superposables : il n'y en a qu'un.\nc) $60$ m $= 6\\,000$ cm, et $6\\,000 \\div 1\\,000 = 6$ : je trace $[AB]$ de $6$ cm, puis je reporte au rapporteur $70°$ en $A$ et $60°$ en $B$. Le dessin a les mêmes angles que le vrai triangle, mais des côtés $1\\,000$ fois plus courts : il est semblable, pas égal.\nd) La largeur de la rivière, c'est la distance de l'arbre $C$ à la rive $(AB)$ : la longueur de la hauteur issue de $C$, perpendiculaire à $(AB)$. Sur le papier, $6{,}4$ cm ; en vrai, $6{,}4 \\times 1\\,000 = 6\\,400$ cm, soit $64$ m.\n⭐ C'est la triangulation : de 1792 à 1798, Delambre et Méchain ont mesuré ainsi, triangle après triangle, la distance de Dunkerque à Barcelone, pour définir le mètre.\n⛔ Le piège au d) : prendre $AC$ ou $BC$ pour la largeur. Ce sont des chemins EN BIAIS ; la largeur se mesure à angle droit des rives.\nRéponse : $\\widehat{ACB} = 50°$ ; un côté et ses deux angles donnent un seul triangle ; $6$ cm sur le papier, un dessin semblable ; la rivière mesure environ $64$ m de large.",
          schema: tri({ A: [0, 0], B: [60, 0], C: [23.1996, 63.7402] }, { cotes: { AB: "60 m" }, angles: { A: "70°", B: "60°", C: "50°" }, trouve: ["C"], lignes: [{ de: [-8, 63.7402], vers: [70, 63.7402], couleur: "gris", pointilles: true }, { de: [-8, 0], vers: [70, 0], couleur: "gris", pointilles: true }, { de: [23.1996, 63.7402], vers: [23.1996, 0], couleur: "orange", nom: "≈ 64 m", ou: [27, 30], ancre: "start" }], carres: [[[23.1996, 0], [23.1996, 63.7402], [60, 0]]], points: [{ en: [23.1996, 0], nom: "H", vers: "bas" }] }),
          micros: ["triangle_somme_angle", "triangle_egalite", "triangle_construire", "triangle_semblable", "triangle_droites"],
        },
        {
          titre: "L'ombre de l'obélisque",
          enonce:
            "Place de la Concorde, à Paris, se dresse l'obélisque de Louxor. Un matin, son ombre au sol mesure $18$ m. Au même moment, un bâton vertical de $1{,}5$ m a une ombre de $1{,}2$ m. Le sol est horizontal, et les rayons du soleil sont parallèles.\na) Expliquer pourquoi le triangle « bâton, ombre, rayon » et le triangle « obélisque, ombre, rayon » ont les mêmes angles.\nb) En déduire qu'ils sont semblables, et calculer le rapport.\nc) Calculer la hauteur de l'obélisque. La comparer à sa hauteur officielle, environ $23$ m.",
          correction:
            "a) Les deux triangles ont un angle droit : le bâton et l'obélisque sont verticaux, le sol est horizontal.\nLes rayons sont parallèles : ils font avec le sol le même angle dans les deux triangles (sur un dessin à l'échelle, je lis environ $51°$).\nLe troisième angle vaut donc, dans les deux, $180° - 90° - 51° = 39°$ : les trois angles sont égaux deux à deux.\nb) Mêmes angles : les deux triangles sont semblables. Les ombres se correspondent : le rapport vaut $18 \\div 1{,}2 = 15$.\nc) La hauteur de l'obélisque correspond à celle du bâton : $1{,}5 \\times 15 = 22{,}5$ m.\nC'est proche des $23$ m officiels : l'écart d'un demi-mètre vient de la précision des mesures d'ombre.\n⛔ Le piège : renverser le rapport, $1{,}2 \\div 18$, et trouver un obélisque de $10$ cm. Le rapport va du PETIT triangle vers le GRAND : il est plus grand que $1$.\nRéponse : les angles sont égaux deux à deux ; le rapport vaut $15$ ; l'obélisque mesure environ $22{,}5$ m.",
          schema: deux(
            tri({ A: [0, 0], B: [1.2, 0], C: [1.2, 1.5] }, { noms: { A: "O", B: "P", C: "S" }, cotes: { AB: "1,2 m", BC: "1,5 m" }, angles: { A: "≈ 51°", C: "≈ 39°" }, trouve: ["C"], droit: "B" }),
            tri({ A: [0, 0], B: [18, 0], C: [18, 22.5] }, { noms: { A: "R", B: "Q", C: "T" }, cotes: { AB: "18 m", BC: "22,5 m" }, angles: { A: "≈ 51°", C: "≈ 39°" }, trouve: ["C"], droit: "B" }),
          ),
          micros: ["triangle_semblable", "triangle_somme_angle", "triangle_defi"],
        },
        {
          titre: "La ferme de charpente",
          enonce:
            "Une ferme de charpente est un triangle $ABC$ : l'entrait $[BC]$, horizontal, mesure $8$ m, et les deux arbalétriers $[AB]$ et $[AC]$ mesurent $5$ m chacun. Le poinçon $[AH]$ relie le sommet $A$ au milieu $H$ de $[BC]$.\na) Vérifier que ce triangle peut exister.\nb) Montrer que les triangles $ABH$ et $ACH$ sont égaux.\nc) En déduire que le poinçon est perpendiculaire à l'entrait. Que représente la droite $(AH)$ pour le triangle $ABC$ ?\nd) L'angle $\\widehat{ABC}$ mesure environ $37°$. Calculer l'angle au sommet $\\widehat{BAC}$.",
          correction:
            "a) Le plus grand côté est $BC = 8$ m, et $5 + 5 = 10 > 8$ : le triangle existe.\nb) Je compare les côtés : $AB = AC = 5$ m ; $BH = HC = 4$ m, car $H$ est le milieu de $[BC]$ ; et $[AH]$ est un côté COMMUN aux deux triangles. Trois côtés égaux deux à deux : les triangles $ABH$ et $ACH$ sont égaux.\nc) Des triangles égaux ont leurs angles égaux deux à deux : $\\widehat{AHB} = \\widehat{AHC}$. Or ces deux angles sont côte à côte sur la droite $(BC)$ : ensemble, ils font $180°$. Chacun vaut donc $180 \\div 2 = 90$ degrés : le poinçon est perpendiculaire à l'entrait.\n$(AH)$ passe par le sommet $A$ et coupe $[BC]$ à angle droit : c'est la hauteur issue de $A$. Elle coupe aussi $[BC]$ en son milieu, à angle droit : c'est la médiatrice de $[BC]$, et encore la médiane issue de $A$.\nd) Les triangles $ABH$ et $ACH$ étant égaux, $\\widehat{ACB} = \\widehat{ABC}$, environ $37°$. Donc $\\widehat{BAC} \\approx 180° - 37° - 37° = 106°$.\n⛔ Le piège au c) : AFFIRMER l'angle droit parce qu'il « se voit » sur la figure. Il se démontre, ici par un cas d'égalité.\nRéponse : le triangle existe ; $ABH$ et $ACH$ sont égaux par leurs trois côtés ; $(AH)$ est à la fois hauteur, médiatrice et médiane ; $\\widehat{BAC} \\approx 106°$.",
          schema: tri({ A: [4, 3], B: [0, 0], C: [8, 0] }, { cotes: { AB: "5 m", CA: "5 m" }, angles: { A: "≈ 106°", B: "≈ 37°", C: "≈ 37°" }, trouve: ["A"], egaux: ["AB", "CA"], milieux: ["BC"], lignes: [{ de: [4, 3], vers: [4, 0], couleur: "orange" }], carres: [[[4, 0], [4, 3], [8, 0]]], points: [{ en: [4, 0], nom: "H", vers: "bas" }] }),
          micros: ["triangle_inegalite", "triangle_egalite", "triangle_droites", "triangle_somme_angle", "triangle_defi"],
        },
        {
          titre: "La course d'orientation",
          enonce:
            "En course d'orientation, les coureurs lisent une carte à l'échelle $\\dfrac{1}{10\\,000}$. Trois balises $A$, $B$ et $C$ vérifient $AB = 1{,}2$ km et $BC = 0{,}9$ km.\na) Quelles longueurs mesure-t-on sur la carte pour $AB$ et $BC$ ?\nb) Entre quelles valeurs se trouve la distance $AC$ ?\nc) Un coureur affirme que $AC = 2{,}3$ km. Qu'en penser ?\nd) Sur la carte, on mesure $AC = 13$ cm. Quelle est la vraie distance $AC$ ? Combien de mètres le détour par $B$ ajoute-t-il ?",
          correction:
            "a) $1{,}2$ km $= 120\\,000$ cm, et $120\\,000 \\div 10\\,000 = 12$ : $12$ cm sur la carte. De même, $0{,}9$ km donne $9$ cm. Le triangle de la carte est semblable au vrai : mêmes angles, longueurs divisées par $10\\,000$.\nb) $AC$ est plus petit que la somme des deux autres : $AC < 1{,}2 + 0{,}9 = 2{,}1$ km. Et $AB$ doit être plus petit que $BC + AC$ : $AC > 1{,}2 - 0{,}9 = 0{,}3$ km. Donc $0{,}3 < AC < 2{,}1$, en kilomètres.\nc) $2{,}3 > 2{,}1$ : impossible. Aller de $A$ à $C$ tout droit serait plus LONG que de passer par $B$ ; or la ligne droite est le plus court chemin.\nd) $13$ cm sur la carte : $13 \\times 10\\,000 = 130\\,000$ cm, soit $1{,}3$ km. Par $B$ : $1{,}2 + 0{,}9 = 2{,}1$ km ; le détour ajoute $2{,}1 - 1{,}3 = 0{,}8$ km, soit $800$ m.\n⛔ Le piège au b) : oublier la borne basse. Avec $AC = 0{,}2$ km, on aurait $0{,}9 + 0{,}2 = 1{,}1 < 1{,}2$ : le triangle ne se refermerait pas.\nRéponse : $12$ cm et $9$ cm ; $0{,}3 < AC < 2{,}1$ km ; $2{,}3$ km est impossible ; $AC = 1{,}3$ km, et le détour ajoute $800$ m.",
          schema: deux(
            tri({ A: [0, 0], B: [12, 0], C: [9.6667, 8.6923] }, { cotes: { AB: "1,2 km", BC: "0,9 km", CA: "1,3 km" }, echelle: 12 }),
            longueurs([{ grand: 2.3, petits: [1.2, 0.9] }, { grand: 1.3, petits: [1.2, 0.9] }], "km"),
          ),
          micros: ["triangle_inegalite", "triangle_semblable", "triangle_defi"],
        },
      ],
    },
  ],
};
