// ─── Fiche de cours : la trigonométrie (1re spé) ─────────────────────────────
//
// Écrite le 28/09/2026, APRÈS la feuille de 20 exercices, la leçon vidéo
// « rouge et vert » (https://youtu.be/5E56e0CbyvQ) et le short « Demande au
// vent ». Alignée sur la banque
// lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank.ts (13 micros).
//
// ⭐⭐ LA CONVENTION DE FRÉDÉRIC : axe horizontal ROUGE = cosinus, axe vertical
// VERT = sinus. C'est ainsi qu'il dessine en classe, et la vidéo aussi. Tous les
// cercles de la fiche passent par `axesCouleur: true` du canvas `cercle_trigo`
// (ajouté le même jour) ; les dessins à la main suivent le même code.
//
// ⭐ LE SIGNE DU COSINUS S'EXPLIQUE PAR LE VENT : tu avances vers la droite, le
// vent souffle dans la direction de l'angle. Il t'aide : cos > 0. De côté : 0.
// Il te freine : cos < 0. « Le cosinus, c'est la part du vent qui te pousse
// vers l'avant. »
//
// ⛔ PAS de résolution de cos x = a : hors BO 2026 (Frédéric, 28/09).
// ⭐ Parité, périodicité, courbes : GARDÉES (Frédéric, 26/09), même si le BO
// 2026 ne les nomme plus.
//
// ⛔ Les valeurs des cercles sont CALCULÉES par le canvas, jamais saisies. Les
// autres nombres sont recalculés par
// scripts/verifier-fiche-cours-trigonometrie-premiere.mjs.
//
// Micro-compétences couvertes :
// - trig_cercle             → définition, figure
// - trig_radian, trig_arc   → propriété « Le radian est une longueur », exemple 1
// - trig_enroulement        → propriété « On enroule la droite »
// - trig_cos_sin            → propriété « Rouge et vert », propriété « Le vent »
// - trig_triangle_rectangle → propriété « Le triangle du collège », exemple 5
// - trig_valeurs            → formule, méthode 2, exemples 3 et 4
// - trig_angles_associes    → méthode 3, exemple 2
// - trig_grand_reel         → méthode 1, exemple 2
// - trig_parite, trig_periodicite → propriété « Symétries », usage « Les courbes »
// - trig_courbes            → usage « Les courbes »
// - trig_archimede          → usage « Approcher π comme Archimède »
// 13/13.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { CanvasRenderer } from "@/lib/canvas";
import type { CercleTrigoPoint } from "@/lib/tutor-v4/types_canvas";
import TexteMath from "@/components/fiches/TexteMath";
import { egalites, enRouge, BLEU } from "@/lib/fiches/schemas";

/** Le rouge du cosinus et le vert du sinus : les MÊMES que le canvas. */
const COS = "#dc2626";
const SIN = "#16a34a";
const ARDOISE = "#0f172a";
const GRIS = "#64748b";
const ORANGE = "#f59e0b";

/** Un cercle trigonométrique à la convention rouge-vert. */
function cercle(
  points: CercleTrigoPoint[],
  opts: { reperes?: "aucun" | "quarts" | "premier_quadrant" | "tous"; valeursAxes?: boolean } = {},
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "cercle_trigo",
        axesCouleur: true,
        reperes: opts.reperes ?? "quarts",
        valeursAxes: opts.valeursAxes,
        points,
      }}
    />
  );
}

function cadre(svg: ReactNode, legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      {svg}
      {legende ? <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p> : null}
    </div>
  );
}

/**
 * L'enroulement : la droite des réels, posée contre le cercle en I, s'enroule
 * dessus. Le segment de 0 à 1 et l'arc de I au point image ont la même longueur.
 */
function enroulement() {
  const cx = 62;
  const cy = 80;
  const r = 44;
  const xd = cx + r; // la droite touche le cercle en I
  const y = (t: number) => cy - t * r;
  const m = { x: cx + r * Math.cos(1), y: cy - r * Math.sin(1) };
  return cadre(
    <svg viewBox="0 0 230 160" className="block h-auto w-full" aria-label="La droite des réels s'enroule sur le cercle">
      <line x1={cx - r - 8} y1={cy} x2={cx + r + 4} y2={cy} stroke={COS} strokeWidth={1.4} />
      <line x1={cx} y1={cy + r + 8} x2={cx} y2={cy - r - 8} stroke={SIN} strokeWidth={1.4} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={BLEU} strokeWidth={2.5} />
      {/* La droite des réels, verticale, collée au cercle en I */}
      <line x1={xd} y1={152} x2={xd} y2={8} stroke={ARDOISE} strokeWidth={1.6} />
      <path d={`M ${xd - 4} 14 L ${xd} 7 L ${xd + 4} 14`} fill="none" stroke={ARDOISE} strokeWidth={1.6} />
      {[
        { t: 0, l: "0" },
        { t: 1, l: "1" },
        { t: Math.PI / 2, l: "π/2" },
        { t: -1, l: "−1" },
      ].map(({ t, l }) => (
        <g key={l}>
          <line x1={xd - 4} y1={y(t)} x2={xd + 4} y2={y(t)} stroke={ARDOISE} strokeWidth={1.6} />
          <text x={xd + 8} y={y(t) + 4} fontSize="12" fontWeight="800" fill={ARDOISE}>{l}</text>
        </g>
      ))}
      {/* Le segment [0 ; 1] et l'arc de même longueur, en orange */}
      <line x1={xd} y1={y(0)} x2={xd} y2={y(1)} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
      <path d={`M ${xd} ${cy} A ${r} ${r} 0 0 0 ${m.x.toFixed(1)} ${m.y.toFixed(1)}`} fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
      <path d={`M ${xd - 3} ${y(1) + 2} Q ${(xd + m.x) / 2 + 4} ${y(1) - 18} ${m.x + 4} ${m.y - 4}`} fill="none" stroke={GRIS} strokeWidth={1.4} strokeDasharray="3 3" />
      <circle cx={m.x} cy={m.y} r={4.5} fill={ARDOISE} />
      <text x={m.x - 10} y={m.y - 8} textAnchor="end" fontSize="12" fontWeight="900" fill={ARDOISE}>M</text>
      <text x={xd - 6} y={cy + 14} textAnchor="end" fontSize="12" fontWeight="800" fill={ARDOISE}>I</text>
      <text x={150} y={52} fontSize="12" fontWeight="900" fill={ORANGE}>même</text>
      <text x={150} y={67} fontSize="12" fontWeight="900" fill={ORANGE}>longueur</text>
      <text x={150} y={112} fontSize="12" fontWeight="700" fill={GRIS}>le réel 1</text>
      <text x={150} y={127} fontSize="12" fontWeight="700" fill={GRIS}>arrive en M</text>
    </svg>,
    "On enroule la droite sur le cercle, vers le haut pour les positifs, vers le bas pour les négatifs. Chaque réel tombe sur un point.",
  );
}

/**
 * ⭐ LE VENT (la pédagogie de classe de Frédéric) : tu avances vers la droite,
 * le vent souffle dans la direction de l'angle. La part rouge est ce qui te
 * pousse vers l'avant : c'est le cosinus.
 */
function leVent() {
  const cas = [
    { deg: 45, dit: "il t'aide", signe: "cos > 0" },
    { deg: 90, dit: "de côté", signe: "cos = 0" },
    { deg: 135, dit: "il te freine", signe: "cos < 0" },
  ];
  const L = 40;
  return cadre(
    <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="Le vent qui aide, qui souffle de côté, qui freine">
      <text x={115} y={16} textAnchor="middle" fontSize="12" fontWeight="800" fill={ARDOISE}>
        Tu avances vers la droite →
      </text>
      {cas.map(({ deg, dit, signe }, i) => {
        const x0 = 40 + i * 75;
        const y0 = 92;
        const t = (deg * Math.PI) / 180;
        const x1 = x0 + L * Math.cos(t);
        const y1 = y0 - L * Math.sin(t);
        const pointe = (a: number) => `${x1 - 7 * Math.cos(t - a)},${y1 + 7 * Math.sin(t - a)}`;
        return (
          <g key={deg}>
            <line x1={x0 - 26} y1={y0} x2={x0 + 30} y2={y0} stroke={GRIS} strokeWidth={1.2} />
            {Math.abs(x1 - x0) > 1 ? (
              <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={COS} strokeWidth={6} strokeLinecap="round" />
            ) : null}
            <line x1={x1} y1={y1} x2={x1} y2={y0} stroke={COS} strokeWidth={1.2} strokeDasharray="3 3" />
            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={BLEU} strokeWidth={2.6} />
            <path d={`M ${pointe(0.45)} L ${x1},${y1} L ${pointe(-0.45)}`} fill="none" stroke={BLEU} strokeWidth={2.6} />
            <circle cx={x0} cy={y0} r={4} fill={ARDOISE} />
            <text x={x0} y={y0 + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={GRIS}>{dit}</text>
            <text x={x0} y={y0 + 40} textAnchor="middle" fontSize="12" fontWeight="900" fill={COS}>{signe}</text>
          </g>
        );
      })}
    </svg>,
    "La flèche bleue est le vent. La barre rouge est la part qui te pousse vers l'avant : c'est le cosinus.",
  );
}

/** Le triangle du collège, logé dans le quart de cercle : hypoténuse 1. */
function triangleDuCollege() {
  const O = { x: 26, y: 132 };
  const r = 112;
  const t = (50 * Math.PI) / 180;
  const M = { x: O.x + r * Math.cos(t), y: O.y - r * Math.sin(t) };
  const H = { x: M.x, y: O.y };
  return (
    <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="Le triangle rectangle dans le cercle trigonométrique">
      <path d={`M ${O.x + r} ${O.y} A ${r} ${r} 0 0 0 ${O.x} ${O.y - r}`} fill="none" stroke={BLEU} strokeWidth={2.2} />
      <line x1={O.x} y1={O.y} x2={O.x + r + 10} y2={O.y} stroke={COS} strokeWidth={1.2} />
      <line x1={O.x} y1={O.y} x2={O.x} y2={O.y - r - 8} stroke={SIN} strokeWidth={1.2} />
      <line x1={O.x} y1={O.y} x2={H.x} y2={H.y} stroke={COS} strokeWidth={6} strokeLinecap="round" />
      <line x1={H.x} y1={H.y} x2={M.x} y2={M.y} stroke={SIN} strokeWidth={6} strokeLinecap="round" />
      <line x1={O.x} y1={O.y} x2={M.x} y2={M.y} stroke={ARDOISE} strokeWidth={2.2} />
      <path d={`M ${H.x - 9} ${H.y} L ${H.x - 9} ${H.y - 9} L ${H.x} ${H.y - 9}`} fill="none" stroke={ARDOISE} strokeWidth={1.2} />
      <path d={`M ${O.x + 22} ${O.y} A 22 22 0 0 0 ${O.x + 22 * Math.cos(t)} ${O.y - 22 * Math.sin(t)}`} fill="none" stroke={ORANGE} strokeWidth={2} />
      <text x={O.x + 30} y={O.y - 8} fontSize="12" fontWeight="900" fill={ORANGE}>x</text>
      <circle cx={M.x} cy={M.y} r={4} fill={ARDOISE} />
      <text x={M.x + 6} y={M.y - 6} fontSize="12" fontWeight="900" fill={ARDOISE}>M</text>
      <text x={O.x - 4} y={O.y + 14} fontSize="12" fontWeight="800" fill={ARDOISE}>O</text>
      <text x={(O.x + M.x) / 2 - 8} y={(O.y + M.y) / 2 - 4} textAnchor="end" fontSize="13" fontWeight="900" fill={ARDOISE}>1</text>
      <text x={(O.x + H.x) / 2} y={O.y + 16} textAnchor="middle" fontSize="12" fontWeight="900" fill={COS}>cos x</text>
      <text x={H.x + 8} y={(H.y + M.y) / 2 + 4} fontSize="12" fontWeight="900" fill={SIN}>sin x</text>
    </svg>
  );
}

/** Le triangle équilatéral de la démonstration de π/3. */
function triangleEquilateral() {
  const O = { x: 40, y: 124 };
  const r = 140;
  const I = { x: O.x + r, y: O.y };
  const M = { x: O.x + r / 2, y: O.y - (r * Math.sqrt(3)) / 2 };
  const H = { x: M.x, y: O.y };
  return cadre(
    <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="Le triangle équilatéral OIM">
      <polygon points={`${O.x},${O.y} ${I.x},${I.y} ${M.x},${M.y}`} fill={BLEU} fillOpacity={0.07} stroke={BLEU} strokeWidth={2.2} />
      <line x1={O.x} y1={O.y} x2={H.x} y2={H.y} stroke={COS} strokeWidth={6} strokeLinecap="round" />
      <line x1={H.x} y1={H.y} x2={M.x} y2={M.y} stroke={SIN} strokeWidth={4} strokeDasharray="6 4" />
      <path d={`M ${H.x + 8} ${H.y} L ${H.x + 8} ${H.y - 8} L ${H.x} ${H.y - 8}`} fill="none" stroke={ARDOISE} strokeWidth={1.2} />
      <text x={O.x - 4} y={O.y + 16} fontSize="12" fontWeight="800" fill={ARDOISE}>O</text>
      <text x={I.x} y={I.y + 16} fontSize="12" fontWeight="800" fill={ARDOISE}>I</text>
      <text x={M.x} y={M.y - 6} textAnchor="middle" fontSize="12" fontWeight="800" fill={ARDOISE}>M</text>
      <text x={H.x} y={H.y + 16} textAnchor="middle" fontSize="12" fontWeight="800" fill={ARDOISE}>H</text>
      <text x={(O.x + H.x) / 2} y={O.y + 16} textAnchor="middle" fontSize="12" fontWeight="900" fill={COS}>1/2</text>
      <text x={M.x - 36} y={(O.y + M.y) / 2} textAnchor="end" fontSize="12" fontWeight="800" fill={ARDOISE}>1</text>
      <text x={M.x + 44} y={(O.y + M.y) / 2} fontSize="12" fontWeight="800" fill={ARDOISE}>1</text>
      <path d={`M ${O.x + 20} ${O.y} A 20 20 0 0 0 ${O.x + 10} ${O.y - 17.3}`} fill="none" stroke={ORANGE} strokeWidth={2} />
      <text x={O.x + 24} y={O.y - 10} fontSize="11" fontWeight="800" fill={ORANGE}>60°</text>
    </svg>,
    "OI = OM = 1 et l'angle en O vaut 60° : le triangle est équilatéral. La hauteur tombe au milieu de [OI].",
  );
}

/**
 * Archimède : l'hexagone inscrit. Un triangle OAB, coupé en deux par sa
 * hauteur : le demi-côté est un SINUS (vert), celui de l'angle π/6.
 */
function hexagoneArchimede() {
  const O = { x: 72, y: 76 };
  const r = 62;
  const p = (deg: number) => ({ x: O.x + r * Math.cos((deg * Math.PI) / 180), y: O.y - r * Math.sin((deg * Math.PI) / 180) });
  const sommets = [0, 60, 120, 180, 240, 300].map(p);
  const A = sommets[0];
  const B = sommets[1];
  const H = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  return cadre(
    <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="Un hexagone régulier inscrit dans le cercle">
      <circle cx={O.x} cy={O.y} r={r} fill="none" stroke={BLEU} strokeWidth={2.2} />
      <polygon points={sommets.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ")} fill="none" stroke={ARDOISE} strokeWidth={1.6} />
      <polygon points={`${O.x},${O.y} ${A.x},${A.y} ${B.x.toFixed(1)},${B.y.toFixed(1)}`} fill={ORANGE} fillOpacity={0.15} stroke="none" />
      <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke={ARDOISE} strokeWidth={1.6} />
      <line x1={O.x} y1={O.y} x2={H.x} y2={H.y} stroke={GRIS} strokeWidth={1.4} strokeDasharray="4 3" />
      <line x1={H.x} y1={H.y} x2={A.x} y2={A.y} stroke={SIN} strokeWidth={5} strokeLinecap="round" />
      <circle cx={O.x} cy={O.y} r={3} fill={ARDOISE} />
      <text x={O.x - 12} y={O.y + 4} fontSize="12" fontWeight="800" fill={ARDOISE}>O</text>
      <text x={O.x + 30} y={O.y + 14} fontSize="12" fontWeight="800" fill={ARDOISE}>1</text>
      <text x={O.x + 22} y={O.y - 3} fontSize="11" fontWeight="900" fill={ORANGE}>π/6</text>
      <text x={150} y={46} fontSize="12" fontWeight="900" fill={SIN}>demi-côté</text>
      <text x={150} y={62} fontSize="12" fontWeight="900" fill={SIN}>= sin(π/6)</text>
      <text x={150} y={100} fontSize="12" fontWeight="700" fill={GRIS}>côté = 2 × 1/2</text>
      <text x={150} y={116} fontSize="12" fontWeight="700" fill={GRIS}>= 1</text>
    </svg>,
    "Le demi-périmètre de l'hexagone vaut 3, un peu moins que π.",
  );
}

/** Le tableau des valeurs remarquables, avec l'astuce √0/2 … √4/2. */
function tableauValeurs() {
  const x = ["0", "\\dfrac{\\pi}{6}", "\\dfrac{\\pi}{4}", "\\dfrac{\\pi}{3}", "\\dfrac{\\pi}{2}"];
  const valeurs = ["1", "\\dfrac{\\sqrt{3}}{2}", "\\dfrac{\\sqrt{2}}{2}", "\\dfrac{1}{2}", "0"];
  const ligne = (titre: string, couleur: string, cellules: string[], bord = true) => (
    <tr className={bord ? "border-b border-slate-200" : ""}>
      <th className="px-2 py-2 text-left text-base font-black" style={{ color: couleur }}>{titre}</th>
      {cellules.map((c, i) => (
        <td key={i} className="px-2 py-2 text-center text-lg" style={{ color: couleur }}>
          <TexteMath>{`$${c}$`}</TexteMath>
        </td>
      ))}
    </tr>
  );
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-slate-900">
        <tbody>
          {ligne("x", ARDOISE, x)}
          {ligne("cos", COS, valeurs)}
          {ligne("sin", SIN, [...valeurs].reverse(), false)}
        </tbody>
      </table>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        La ligne du sinus est celle du cosinus, lue à l&apos;envers.
      </p>
    </div>
  );
}

/** cos en rouge, sin en vert, sur [−3 ; 7], échantillonnés tous les 0,1. */
function lesCourbes() {
  const echantillon = (f: (x: number) => number) => {
    const pts: { x: number; y: number }[] = [];
    for (let k = -30; k <= 70; k++) {
      const x = k / 10;
      pts.push({ x, y: Math.round(f(x) * 1000) / 1000 });
    }
    return pts;
  };
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 360, height: 200 },
        xmin: -3,
        xmax: 7,
        ymin: -1.5,
        ymax: 1.5,
        grille: true,
        courbes: [
          { id: "cos", type: "points", couleur: COS, points: echantillon(Math.cos) },
          { id: "sin", type: "points", couleur: SIN, points: echantillon(Math.sin) },
        ],
      }}
    />
  );
}

/**
 * ⛔ Les diapos ne vivent PAS dans `FicheCoursData` : elles s'exportent à part et
 * la page les passe à `FicheCoursClient` en second argument.
 */
export const slidesTrigonometriePremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Trigonométrie - 1re spé",
    section: {
      type: "objectif",
      phrase: "Rouge pour le cosinus, vert pour le sinus",
      sousPhrase:
        "On enroule la droite des réels sur un cercle de rayon 1. Chaque réel devient un point. Son cosinus se lit sur l'axe rouge, son sinus sur l'axe vert.",
    },
  },
];

export const ficheTrigonometriePremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "trigonometrie",
  titre: "La trigonométrie",
  accroche:
    "Au collège, le cosinus vivait dans un triangle rectangle, et seulement pour des angles aigus. En première, on le sort du triangle. On enroule la droite des réels sur un cercle de rayon 1 : chaque réel devient un point. Son cosinus est l'abscisse de ce point, sur l'axe rouge. Son sinus est l'ordonnée, sur l'axe vert.",
  identite: [
    { label: "Prérequis", valeur: "Le cosinus du triangle rectangle, Pythagore, le périmètre du cercle" },
    { label: "L'idée clé", valeur: "Un réel est un point du cercle" },
    { label: "Le code couleur", valeur: "Axe rouge = cosinus, axe vert = sinus" },
  ],

  definition: {
    texte:
      "Le CERCLE TRIGONOMÉTRIQUE a pour centre l'origine $O$ et pour rayon $1$. On part toujours du point $I(1 ; 0)$. Le sens POSITIF est le sens inverse des aiguilles d'une montre. À chaque réel $x$ correspond un point $M$ du cercle. Alors $\\cos x$ est l'ABSCISSE de $M$, et $\\sin x$ son ORDONNÉE.",
  },

  figure: {
    schema: cercle([{ angle: { n: 1, d: 3 }, arc: true, projections: true }], { reperes: "premier_quadrant" }),
    legende:
      "⭐ Le réel $\\dfrac{\\pi}{3}$ est l'arc orange parcouru depuis $I$. Son point descend sur l'axe rouge : $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$. Il se projette sur l'axe vert : $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.",
  },

  proprietes: [
    {
      titre: "Le radian est une longueur",
      texte:
        "Au CM2, tu as appris que le périmètre d'un cercle vaut $2\\pi R$. Avec $R = 1$, un tour mesure $2\\pi$. Le radian mesure un angle par la LONGUEUR de l'arc qu'il découpe sur ce cercle. Un tour vaut donc $2\\pi$, et un demi-tour $\\pi$, c'est-à-dire $180°$.",
      schema: egalites(
        [
          `180° = \\pi \\text{ rad}`,
          `30° = \\dfrac{30\\pi}{180} = \\dfrac{\\pi}{6}`,
          `\\text{arc} = R \\times \\theta`,
        ],
        "Des degrés aux radians, on multiplie par π/180. La formule de l'arc ne marche qu'avec θ en radians.",
      ),
      micros: ["trig_radian", "trig_arc"],
    },
    {
      titre: "On enroule la droite",
      texte:
        "On colle la droite des réels contre le cercle, au point $I$, et on l'enroule. Le réel $x$ arrive sur un point du cercle. Un tour complet mesure $2\\pi$ : $x$ et $x + 2\\pi$ tombent donc sur le MÊME point.",
      schema: enroulement(),
      micros: ["trig_enroulement"],
    },
    {
      titre: "⭐ Rouge et vert",
      texte:
        "Le cosinus se lit sur l'axe horizontal, en rouge. Le sinus se lit sur l'axe vertical, en vert. Le point reste sur un cercle de rayon $1$ : ses deux coordonnées restent entre $-1$ et $1$.",
      schema: (
        <>
          {cercle([{ angle: { n: 2, d: 3 }, arc: true, projections: true }])}
          {egalites([`-1 \\leqslant \\cos x \\leqslant 1`, `-1 \\leqslant \\sin x \\leqslant 1`])}
        </>
      ),
      micros: ["trig_cos_sin"],
    },
    {
      titre: "⭐ Demande au vent",
      texte:
        "Tu avances vers la droite. Le vent souffle dans la direction de l'angle. S'il t'aide, le cosinus est positif. S'il souffle de côté, il vaut $0$. S'il te freine, il est négatif. Le cosinus, c'est la part du vent qui te pousse vers l'avant.",
      schema: leVent(),
      micros: ["trig_cos_sin"],
    },
    {
      titre: "Le triangle du collège",
      texte:
        "Pour un angle aigu, on retrouve le triangle rectangle. L'hypoténuse est le rayon, elle vaut $1$ : le côté adjacent EST le cosinus, le côté opposé EST le sinus. Pythagore donne alors la relation la plus utile du chapitre.",
      schema: (
        <>
          {cadre(triangleDuCollege())}
          {egalites([`\\cos^2 x + \\sin^2 x = 1`], "Elle vaut pour TOUS les réels, pas seulement pour les angles aigus.")}
        </>
      ),
      micros: ["trig_triangle_rectangle", "trig_cercle"],
    },
    {
      titre: "Symétries du cercle",
      texte:
        "$-x$ est le symétrique de $x$ par rapport à l'axe rouge : même cosinus, sinus opposé. On dit que cosinus est PAIRE et sinus IMPAIRE. Et comme $x + 2\\pi$ tombe au même point que $x$, cosinus et sinus sont PÉRIODIQUES de période $2\\pi$.",
      schema: (
        <>
          {cercle(
            [
              { angle: { n: 1, d: 4 }, projections: true },
              { angle: { n: -1, d: 4 }, projections: true, couleur: BLEU },
            ],
            { reperes: "quarts" },
          )}
          {egalites([
            `\\cos(-x) = \\cos x`,
            `\\sin(-x) = -\\sin x`,
            `\\cos(x + 2\\pi) = \\cos x`,
          ])}
        </>
      ),
      micros: ["trig_parite", "trig_periodicite"],
    },
  ],

  formule: {
    contexte: "Les valeurs remarquables",
    expression: "$\\dfrac{\\sqrt{0}}{2},\\ \\dfrac{\\sqrt{1}}{2},\\ \\dfrac{\\sqrt{2}}{2},\\ \\dfrac{\\sqrt{3}}{2},\\ \\dfrac{\\sqrt{4}}{2}$",
    legende:
      "Le sinus de $0$, $\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$, $\\dfrac{\\pi}{3}$, $\\dfrac{\\pi}{2}$ monte dans cet ordre. Le cosinus descend dans l'ordre inverse.",
    schema: tableauValeurs(),
  },

  reel: {
    texte:
      "Une grande roue a un rayon de $50$ m, et son centre est à $55$ m du sol. Une nacelle part de la hauteur du centre, à droite, et tourne dans le sens direct. Quand elle a tourné de $\\dfrac{\\pi}{6}$, elle est montée de $50 \\times \\sin\\dfrac{\\pi}{6} = 25$ m : elle est à $80$ m du sol. ⭐ Le sinus donne la HAUTEUR, le cosinus l'écart à gauche ou à droite du centre. Tout ce qui tourne se décrit ainsi : une roue de vélo, une aiguille, une éolienne, le son d'une corde qui vibre.",
  },

  historique: {
    texte:
      "Au IIᵉ siècle avant notre ère, l'astronome grec Hipparque dresse une table de CORDES pour prévoir la position des astres. En Inde, vers l'an 500, Aryabhata travaille avec la DEMI-corde : c'est notre sinus. Son nom sanskrit passe en arabe, puis un traducteur latin le lit de travers et l'écrit « sinus », qui veut dire « pli » ou « baie ». ⭐ Le mot « radian », lui, n'apparaît qu'en 1873.",
  },

  methode: [
    {
      titre: "Je retire les tours",
      texte:
        "Pour un grand réel, j'enlève des multiples de $2\\pi$ jusqu'à tomber près de $0$. Avec un dénominateur $6$, un tour s'écrit $\\dfrac{12\\pi}{6}$ : je cherche le multiple de $12$ le plus proche du numérateur.",
      schema: egalites(
        [
          `\\dfrac{47\\pi}{6} = \\dfrac{48\\pi}{6} - \\dfrac{\\pi}{6} = 8\\pi - \\dfrac{\\pi}{6}`,
          `8\\pi = 4 \\text{ tours : on les retire}`,
        ],
        "Le réel 47π/6 tombe au même point que −π/6.",
      ),
      micros: ["trig_grand_reel"],
    },
    {
      titre: "Je place le point sur le cercle",
      texte:
        "Je coupe le réel en « demi-tours + reste ». $\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ : un demi-tour, puis encore $\\dfrac{\\pi}{6}$. Le point est en bas à gauche.",
      schema: cercle([{ angle: { n: 7, d: 6 }, arc: true }], { reperes: "quarts" }),
      micros: ["trig_cercle", "trig_valeurs"],
    },
    {
      titre: "Je lis les signes, puis la valeur",
      texte:
        "Le point est à gauche ou à droite ? Cela donne le signe du cosinus. En haut ou en bas ? Le signe du sinus. La valeur, elle, vient du premier quart de tour, par symétrie.",
      schema: cercle(
        [
          { angle: { n: 1, d: 6 }, projections: true },
          { angle: { n: 5, d: 6 }, projections: true, couleur: BLEU },
          { angle: { n: 7, d: 6 }, projections: true, couleur: "#7c3aed" },
          { angle: { n: -1, d: 6 }, projections: true, couleur: ORANGE },
        ],
        { reperes: "quarts" },
      ),
      micros: ["trig_angles_associes"],
    },
  ],

  usages: [
    {
      titre: "Les courbes de cosinus et sinus",
      detail:
        "Quand le point fait le tour du cercle, son abscisse et son ordonnée ondulent entre $-1$ et $1$. On obtient deux vagues. La vague recommence tous les $2\\pi$ : c'est la période. La rouge (cosinus) est symétrique par rapport à l'axe des ordonnées : cosinus est paire. La verte (sinus) est symétrique par rapport à l'origine : sinus est impaire.",
      schema: lesCourbes(),
      micros: ["trig_courbes", "trig_parite", "trig_periodicite"],
    },
    {
      titre: "Les angles associés",
      detail:
        "Faire un demi-tour, prendre le symétrique : chaque formule se VOIT sur le cercle. Inutile de les apprendre par cœur si tu sais les dessiner.",
      schema: egalites([
        `\\cos(\\pi - x) = -\\cos x`,
        `\\sin(\\pi - x) = \\sin x`,
        `\\cos(\\pi + x) = -\\cos x`,
        `\\sin(\\pi + x) = -\\sin x`,
      ]),
      micros: ["trig_angles_associes"],
    },
    {
      titre: "Approcher π comme Archimède",
      detail:
        "On inscrit dans le cercle de rayon $1$ un polygone régulier à $n$ côtés. Chaque côté mesure $2\\sin\\dfrac{\\pi}{n}$. Le demi-périmètre $n\\sin\\dfrac{\\pi}{n}$ est un peu plus court que le demi-cercle, qui vaut $\\pi$. Plus il y a de côtés, plus il s'en approche. Un algorithme fait doubler $n$ à chaque tour.",
      schema: (
        <>
          {hexagoneArchimede()}
          {egalites(
            [
              `n = 6 : \\quad 6\\sin\\dfrac{\\pi}{6} = 3`,
              `n = 12 : \\quad \\approx 3{,}1058`,
              `n = 96 : \\quad \\approx ${enRouge("3{,}1410")}`,
            ],
            "Archimède s'est arrêté à 96 côtés : π est un peu plus grand que 3,1410.",
          )}
        </>
      ),
      micros: ["trig_archimede", "trig_triangle_rectangle"],
    },
  ],

  exemples: [
    {
      titre: "Convertir, puis mesurer un arc",
      donnees: "Un angle de $135°$, sur un cercle de rayon $4$ cm.",
      question: "Convertir en radians, puis calculer la longueur de l'arc.",
      solution:
        "$135° = \\dfrac{135\\pi}{180} = \\dfrac{3\\pi}{4}$ (on divise $135$ et $180$ par $45$).\nArc $= R \\times \\theta = 4 \\times \\dfrac{3\\pi}{4} = 3\\pi \\approx 9{,}42$ cm.\n⛔ Avec $135$ au lieu de $\\dfrac{3\\pi}{4}$, on trouverait $540$ cm.",
      micros: ["trig_radian", "trig_arc"],
    },
    {
      titre: "Un grand réel",
      donnees: "Le réel $\\dfrac{47\\pi}{6}$.",
      question: "Calculer $\\cos\\dfrac{47\\pi}{6}$ et $\\sin\\dfrac{47\\pi}{6}$.",
      schema: cercle([{ angle: { n: 47, d: 6 }, arc: true, projections: true }], { reperes: "quarts" }),
      solution:
        "$\\dfrac{47\\pi}{6} = 8\\pi - \\dfrac{\\pi}{6}$. On retire $4$ tours : même point que $-\\dfrac{\\pi}{6}$.\nLe point est à droite (le vent aide) et en bas.\n$\\cos\\dfrac{47\\pi}{6} = \\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$.\n$\\sin\\dfrac{47\\pi}{6} = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$.",
      micros: ["trig_grand_reel", "trig_angles_associes"],
    },
    {
      titre: "⭐ Démontrer : cosinus et sinus de π/4",
      donnees: "$M$ est le point du cercle image de $\\dfrac{\\pi}{4}$.",
      question: "Démontrer que $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$.",
      schema: cercle([{ angle: { n: 1, d: 4 }, arc: true, projections: true }], { reperes: "quarts" }),
      solution:
        "$\\dfrac{\\pi}{4}$ est la moitié d'un quart de tour : $M$ est sur la bissectrice, la droite $y = x$.\nSes deux coordonnées sont donc égales : $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = a$, avec $a > 0$.\n$M$ est sur le cercle de rayon $1$ : $a^2 + a^2 = 1$, donc $a^2 = \\dfrac{1}{2}$.\n$a = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$.",
      micros: ["trig_valeurs", "trig_cercle"],
    },
    {
      titre: "⭐ Démontrer : cosinus et sinus de π/3",
      donnees: "$M$ est le point du cercle image de $\\dfrac{\\pi}{3}$, et $H$ son projeté sur l'axe rouge.",
      question: "Démontrer que $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ et $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.",
      schema: triangleEquilateral(),
      solution:
        "$OI = OM = 1$ : le triangle $OIM$ est isocèle en $O$.\nSon angle en $O$ vaut $\\dfrac{\\pi}{3}$, soit $60°$. Un triangle isocèle avec un angle de $60°$ est équilatéral.\nDans un triangle équilatéral, la hauteur $[MH]$ tombe au milieu de $[OI]$ : $OH = \\dfrac{1}{2}$, donc $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$.\nPythagore dans $OHM$ : $\\sin^2\\dfrac{\\pi}{3} = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$, et le sinus est positif : $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.",
      micros: ["trig_valeurs", "trig_triangle_rectangle"],
    },
    {
      titre: "Trouver le cosinus à partir du sinus",
      donnees: "$\\sin x = \\dfrac{3}{5}$, et $x$ est entre $\\dfrac{\\pi}{2}$ et $\\pi$.",
      question: "Calculer $\\cos x$.",
      solution:
        "$\\cos^2 x = 1 - \\sin^2 x = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.\nDonc $\\cos x = \\dfrac{4}{5}$ ou $\\cos x = -\\dfrac{4}{5}$.\n$x$ est entre $\\dfrac{\\pi}{2}$ et $\\pi$ : le point est à GAUCHE, le vent freine. $\\cos x = -\\dfrac{4}{5}$.\n⛔ Oublier le signe est l'erreur la plus fréquente.",
      micros: ["trig_triangle_rectangle", "trig_cos_sin"],
    },
  ],

  pieges: [
    "⛔ Tourner dans le mauvais sens. Le sens positif est l'INVERSE des aiguilles d'une montre.",
    "⛔ Échanger cosinus et sinus. Le cosinus se lit sur l'axe horizontal (rouge), le sinus sur l'axe vertical (vert).",
    "⛔ Utiliser des degrés dans une formule de radians : l'arc vaut $R \\times \\theta$ avec $\\theta$ en radians seulement.",
    "⚠️ Oublier le signe après $\\cos^2 x + \\sin^2 x = 1$. On regarde où est le point : à gauche, le cosinus est négatif.",
    "⚠️ Croire que $\\cos\\dfrac{47\\pi}{6}$ demande une calculatrice. On retire les tours, et on retombe sur une valeur remarquable.",
    "⚠️ Écrire $\\cos x = 1{,}2$. Un cosinus et un sinus restent toujours entre $-1$ et $1$.",
  ],

  aRetenir: [
    "⭐ $\\cos x$ = abscisse (axe rouge), $\\sin x$ = ordonnée (axe vert) du point image de $x$.",
    "Un tour vaut $2\\pi$ ; $180° = \\pi$ ; $\\cos^2 x + \\sin^2 x = 1$.",
    "Le signe se lit sur le cercle, la valeur sur le premier quart de tour : $\\dfrac{\\sqrt{0}}{2}, \\dfrac{\\sqrt{1}}{2}, \\dots, \\dfrac{\\sqrt{4}}{2}$.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question: "Convertir $150°$ en radians.",
      correction: "$150 \\times \\dfrac{\\pi}{180} = \\dfrac{5\\pi}{6}$.",
    },
    {
      question: "Donner $\\cos\\dfrac{2\\pi}{3}$ et $\\sin\\dfrac{2\\pi}{3}$.",
      correction:
        "$\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$ : le point est en haut à gauche. $\\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}$ et $\\sin\\dfrac{2\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.",
    },
    {
      question: "Donner $\\cos\\left(-\\dfrac{\\pi}{4}\\right)$ et $\\sin\\left(-\\dfrac{\\pi}{4}\\right)$.",
      correction: "Symétrique par rapport à l'axe rouge : $\\cos\\left(-\\dfrac{\\pi}{4}\\right) = \\dfrac{\\sqrt{2}}{2}$ et $\\sin\\left(-\\dfrac{\\pi}{4}\\right) = -\\dfrac{\\sqrt{2}}{2}$.",
    },
    {
      question: "Calculer $\\cos\\dfrac{25\\pi}{4}$.",
      correction: "$\\dfrac{25\\pi}{4} = 6\\pi + \\dfrac{\\pi}{4}$. On retire $3$ tours : $\\cos\\dfrac{25\\pi}{4} = \\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$.",
    },
    {
      question: "Sur un cercle de rayon $2$, quelle est la longueur de l'arc découpé par un angle de $\\dfrac{\\pi}{3}$ ?",
      correction: "$2 \\times \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3} \\approx 2{,}09$.",
    },
    {
      question: "$\\cos x = 0{,}6$ et $x$ est entre $-\\dfrac{\\pi}{2}$ et $0$. Calculer $\\sin x$.",
      correction: "$\\sin^2 x = 1 - 0{,}36 = 0{,}64$. Le point est en bas : $\\sin x = -0{,}8$.",
    },
  ],
};
