// ─── Fiche d'exercices : grandeurs composées et unités (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-grandeurs.tsx` (« Grandeurs
// composées et unités ») et sur les six micros du coach de 4e (notionId
// grandeur_composee). L'idée de la notion, reprise telle quelle : les unités ne
// SUIVENT pas le calcul, elles SE CALCULENT. Composer (m × m = m², km ÷ h =
// km/h), convertir, contrôler : le même geste vu trois fois. Les conversions de
// longueurs et d'aires sont ICI, comme dans le coach : 1 m² = 10 000 cm² est une
// conséquence de 1 m = 100 cm, pas une recette.
// ⛔ Hors programme de 4e, donc absent : la notation km·h⁻¹, les unités
// composées de la physique (newton, joule, pascal), la formule de la vitesse
// moyenne pondérée. Les volumes pour eux-mêmes sont la notion `volume_solide`.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 2 kW pendant 3 ou 4 h,
// ni le car de 240 km en 3 h, ni le robinet de 36 L en 6 min, ni la table de
// 2 m², ni le carrelage de 4 m sur 5 m, ni les deux étals, ni 4,5 km ou 3 m², ni
// la pomme de 15 kg, ni le cycliste à 250 km/h, ni le chauffe-eau et l'ampoule.
// ⛔ Ni ceux de la feuille de 3e de la proportionnalité (150 km en 2 h 30, le
// robinet de 18 L, le bus de 27 km, l'aller-retour à 80 et 40 km/h) ou des
// volumes (piscine municipale, cuve, pétanque…). Ni le marathon ni la feuille
// A4, déjà pris par trois feuilles de 4e.
//
// Les pièges nommés : 40 min lues 0,40 h (1), le quotient pris à l'envers (2,
// 8, 12, 13), « €/L » lu « euros et litres » (3), des grammes multipliés par des
// €/kg (4), un rang oublié en convertissant une longueur (5), le facteur 10 ou
// 100 des longueurs appliqué à une aire (6, 11), l'unité crue suffisante (7),
// 60 au lieu de 3 600 secondes par heure (9), des W pris pour des kW (10, 19),
// multiplier au lieu de diviser (14), des L/min pour un volume (15), comparer
// des m/s à des km/h (16), des jours pris pour des heures (17), des litres
// divisés par des m³/s (18), des km divisés par des secondes (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - aluminium : 2,70 g/cm³ (CRC Handbook of Chemistry and Physics) — ex. 8 ;
// - guépard : vitesse de pointe mesurée ≈ 29 m/s (Sharp, Journal of Zoology,
//   1997) ; autoroute limitée à 130 km/h (Code de la route, art. R413-2) — ex. 9 ;
// - prix du kWh : 0,20 € est une HYPOTHÈSE de l'énoncé, à l'ordre de grandeur du
//   tarif réglementé 2025 (CRE) — ex. 10, 19 ;
// - terrain de basket : 28 m × 15 m (FIBA, règles officielles, art. 2) — ex. 11 ;
// - France métropolitaine ≈ 66 millions d'habitants (INSEE, 1er janvier 2025) sur
//   ≈ 551 695 km² (IGN), arrondis à 550 000 ; Paris ≈ 2,1 millions d'habitants
//   (INSEE) sur 105 km², bois compris — ex. 12 ;
// - glace : 0,917 g/cm³ à 0 °C (CRC Handbook), arrondie à 0,92 — ex. 14 ;
// - pommeau de douche : ≈ 12 L/min classique, ≈ 6 L/min économe (ordres de
//   grandeur de l'ADEME) — ex. 15 ;
// - barge rousse (balise 234684) : ≈ 13 560 km sans escale, de l'Alaska à la
//   Tasmanie, en 11 jours, octobre 2022 (Guinness World Records, 2023) — ex. 17 ;
// - Rhône à Beaucaire : débit moyen ≈ 1 700 m³/s (Compagnie nationale du
//   Rhône ; module de 1 690 m³/s à la Banque Hydro) ; eau domestique ≈ 148 L
//   par jour et par habitant (Centre d'information sur l'eau), arrondie à 150 —
//   ex. 18 ;
// - corps au repos ≈ 100 W : 2 000 kcal par jour valent ≈ 97 W (besoins
//   énergétiques de l'adulte, ANSES) — ex. 19 ;
// - record de l'heure : Filippo Ganna, 56,792 km, Granges (Suisse), 8 octobre
//   2022, piste de 250 m (UCI) — ex. 20.
// Le nageur (2), le riz à 2,40 €/kg (4), le radiateur (10), la coureuse (13), Lou
// et Enzo (16) sont IMAGINÉS, à l'ordre de grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés
// dessinent. Des TRAJETS À L'ÉCHELLE (`trajets()` : chaque graduation à sa vraie
// place, la durée au-dessus, la distance dessous) ; des TABLEAUX DE CONVERSION
// (`conversion()`, un chiffre par colonne pour les longueurs, deux pour les
// aires) ; des RECTANGLES dont l'AIRE est la grandeur produit (`produit()` :
// puissance × durée = énergie, débit × durée = volume), deux rectangles de même
// aire au même dessin ; un terrain quadrillé en m², un km² et ses habitants, un
// cube de 8 cm³, des barres à l'échelle. SVG locaux : `figures.tsx` n'a ni
// trajet, ni rectangle-produit, ni tableau de conversion.
// ⚠️ LISIBLE AU TÉLÉPHONE : tous les SVG ont un cadre de 240 et un texte en 12,
// soit 12 × 235 ÷ 240 ≈ 11,75 px effectifs à 375 px de large (≥ 11). Le script
// de recalcul le vérifie, relit les nombres de chaque dessin et contrôle que les
// étiquettes tiennent dans le cadre sans se chevaucher.
//
// Les corrigés sont écrits à la première personne (« je convertis »), comme les
// autres feuilles de 4e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-grandeurs-composees-4e.mjs`.
//
// Micro-compétences : grandeur_produit (1, 3, 10, 11, 14, 15, 18, 19),
// grandeur_quotient (2, 3, 4, 8, 9, 11, 12, 13, 14, 16, 17, 18, 20),
// grandeur_unite_composee (3, 4, 12, 13), grandeur_convertir (5, 6, 9, 11, 15,
// 16, 17, 18, 19, 20), grandeur_coherence (7, 10, 13, 17, 18, 19, 20),
// grandeur_defi (17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const CYAN = "#0e7490";
const GRIS = "#334155";
const GRIS_CLAIR = "#64748b";
const L = 240;
const POLICE = 12;
/** Largeur d'un signe en 12 gras (≈ 0,62 em), pour garder une étiquette dans le cadre. */
const SIGNE = 7.44;
const CADRE = "mx-auto w-full max-w-[22rem] print:max-w-[16rem]";

/** Le centre d'une étiquette, déplacé pour qu'elle reste dans le cadre. */
const garde = (x: number, texte: string) => {
  const w = [...texte].length * SIGNE;
  return Math.min(Math.max(x, 2 + w / 2), L - 2 - w / 2);
};

/* ── Les trajets à l'échelle ─────────────────────────────────────────────────
 *
 * Une ligne par trajet : un axe de 18 à 222, la partie parcourue en couleur
 * (`plein`), et des graduations `[position, au-dessus, dessous]` à leur VRAIE
 * place. Deux trajets d'un même dessin partagent la même échelle (`max`).
 * ⭐ Le script relit chaque graduation : ce qui est écrit dessus et dessous doit
 * correspondre à la position, avec la vitesse du corrigé.
 */
type Marque = [number, string, string];
type Trajet = { legende: string; plein: number; marques: Marque[]; couleur?: string };
const X0 = 18;
const X1 = 222;
const trajets = (max: number, lignes: Trajet[]) => {
  const x = (d: number) => X0 + (d * (X1 - X0)) / max;
  const H = 62;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} ${H * lignes.length + 4}`} className="h-auto w-full" role="img" aria-label={lignes.map((li) => li.legende).join(" ; ")}>
        {lignes.map((li, i) => {
          const y0 = i * H;
          const axe = y0 + 38;
          const c = li.couleur ?? BLEU;
          return (
            <g key={i}>
              <text x={2} y={y0 + 12} fontSize={POLICE} fill={GRIS_CLAIR}>
                {li.legende}
              </text>
              <line x1={X0} x2={X1} y1={axe} y2={axe} stroke="#cbd5e1" strokeWidth={3} />
              <line x1={X0} x2={x(li.plein)} y1={axe} y2={axe} stroke={c} strokeWidth={5} strokeLinecap="round" />
              {li.marques.map(([d, haut, bas]) => (
                <g key={d}>
                  <line x1={x(d)} x2={x(d)} y1={axe - 6} y2={axe + 6} stroke={GRIS} strokeWidth={1.5} />
                  {haut ? (
                    <text x={garde(x(d), haut)} y={axe - 10} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={c}>
                      {haut}
                    </text>
                  ) : null}
                  {bas ? (
                    <text x={garde(x(d), bas)} y={axe + 20} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
                      {bas}
                    </text>
                  ) : null}
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── La grandeur produit comme une AIRE ──────────────────────────────────────
 *
 * Un rectangle posé à l'origine : sa largeur est une durée, sa hauteur une
 * puissance ou un débit, et son AIRE la grandeur produit (énergie, volume).
 * Deux rectangles de même aire, l'un long et bas, l'autre court et haut, se
 * voient au premier coup d'œil (exercice 19).
 * ⭐ Le script relit `l` et `h` et vérifie que l'étiquette dit leur produit.
 */
type Rect = { l: number; h: number; texte: string; ou: "dedans" | "dessus" | "droite"; couleur?: string; tirets?: boolean };
type Axes = { x: [number, string][]; y: [number, string][]; ux: string; uy: string };
const G = 44;
const D = 228;
const HAUT = 22;
const BAS = 136;
const produit = (xmax: number, ymax: number, rects: Rect[], axes: Axes) => {
  const px = (v: number) => G + (v * (D - G)) / xmax;
  const py = (v: number) => BAS - (v * (BAS - HAUT)) / ymax;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} 172`} className="h-auto w-full" role="img" aria-label={`${axes.uy} en hauteur, ${axes.ux} en largeur : l'aire de chaque rectangle est leur produit`}>
        <text x={2} y={12} fontSize={POLICE} fill={GRIS_CLAIR}>
          {axes.uy}
        </text>
        {rects.map((r, i) => {
          const c = r.couleur ?? BLEU;
          return (
            <rect
              key={i}
              x={px(0)}
              y={py(r.h)}
              width={px(r.l) - px(0)}
              height={py(0) - py(r.h)}
              fill={c}
              fillOpacity={r.tirets ? 0.05 : 0.2}
              stroke={c}
              strokeWidth={2}
              strokeDasharray={r.tirets ? "5 4" : undefined}
            />
          );
        })}
        <line x1={G} x2={D + 6} y1={BAS} y2={BAS} stroke={GRIS} strokeWidth={1.5} />
        <line x1={G} x2={G} y1={BAS} y2={HAUT - 6} stroke={GRIS} strokeWidth={1.5} />
        {axes.x.map(([v, t]) => (
          <g key={`x${v}`}>
            <line x1={px(v)} x2={px(v)} y1={BAS} y2={BAS + 5} stroke={GRIS} />
            <text x={px(v)} y={BAS + 17} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
              {t}
            </text>
          </g>
        ))}
        {axes.y.map(([v, t]) => (
          <g key={`y${v}`}>
            <line x1={G - 5} x2={G} y1={py(v)} y2={py(v)} stroke={GRIS} />
            <text x={G - 7} y={py(v) + 4} fontSize={POLICE} fontWeight={700} textAnchor="end" fill={GRIS}>
              {t}
            </text>
          </g>
        ))}
        <text x={D} y={168} fontSize={POLICE} textAnchor="end" fill={GRIS_CLAIR}>
          {axes.ux}
        </text>
        {rects.map((r, i) => {
          const c = r.couleur ?? BLEU;
          const milieuX = (px(0) + px(r.l)) / 2;
          const milieuY = (py(r.h) + py(0)) / 2 + 4;
          const [x, y, ancre] =
            r.ou === "dedans" ? [milieuX, milieuY, "middle"] : r.ou === "dessus" ? [milieuX, py(r.h) - 5, "middle"] : [px(r.l) + 5, milieuY, "start"];
          return (
            <text key={`t${i}`} x={x} y={y} fontSize={POLICE} fontWeight={700} textAnchor={ancre as "middle" | "start"} fill={c}>
              {r.texte}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Le tableau de conversion ────────────────────────────────────────────────
 *
 * Une colonne par unité ; `larg` chiffres par colonne (1 pour les longueurs, 2
 * pour les aires). La colonne de DÉPART est en bleu ; la virgule orange est
 * posée après la colonne d'ARRIVÉE : on lit le résultat tel quel.
 * ⭐ Le script relit les chiffres, lit le nombre dans l'unité de départ (il doit
 * être celui de l'énoncé) et dans l'unité d'arrivée (celui du corrigé).
 * ⛔ Chaque case s'écrit avec EXACTEMENT `larg` signes (« 6 » d'une aire s'écrit
 * " 6") ; une case vide s'écrit "".
 */
type LigneConversion = { cases: string[]; de: string; vers: string };
const conversion = (unites: string[], larg: number, lignes: LigneConversion[]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <thead>
        <tr>
          {unites.map((u) => (
            <th key={u} className="border border-slate-400 bg-slate-100 px-2 py-1 font-semibold text-slate-800">
              {u}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((li, i) => (
          <tr key={i}>
            {li.cases.map((c, j) => (
              <td key={j} className={`border border-slate-400 px-2 py-1 text-center font-mono text-slate-900 ${unites[j] === li.de ? "bg-blue-100" : ""}`}>
                <span className="whitespace-pre">{c.padStart(larg, " ")}</span>
                {unites[j] === li.vers ? <span className="font-bold text-orange-600">,</span> : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-1 text-center text-xs font-semibold text-slate-600">en bleu : l'unité de départ · virgule orange : l'unité d'arrivée</p>
  </div>
);

// Le tableau d'un corrigé, en HTML (comme les autres feuilles de 4e) : la
// première case de chaque ligne est son en-tête.
// ⚠️ Pas de formule dans les cases : exposants en Unicode (cm², m³).
const tableau = (lignes: [string, ...string[]][]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <tbody>
        {lignes.map(([entete, ...cases]) => (
          <tr key={entete}>
            <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{entete}</th>
            {cases.map((c, i) => (
              <td key={i} className="border border-slate-400 px-3 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Deux dessins côte à côte à partir de `sm` et sur papier, l'un sous l'autre
 *  sur téléphone (mesuré à 375 px sur la feuille de Pythagore, 24/09). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/* ── Les petits dessins ──────────────────────────────────────────────────── */

/** Un carré de 1 cm découpé en 10 × 10 carrés de 1 mm (exercice 6). */
const grilleMm = (compte: boolean) => {
  const x0 = 60;
  const y0 = 8;
  const c = 12;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} ${compte ? 176 : 158}`} className="h-auto w-full" role="img" aria-label="Un carré de 1 cm de côté découpé en carrés de 1 mm de côté">
        <rect x={x0} y={y0} width={c} height={c} fill={ORANGE} fillOpacity={0.55} />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={x0 + i * c} x2={x0 + i * c} y1={y0} y2={y0 + 10 * c} stroke={i % 10 === 0 ? BLEU : "#94a3b8"} strokeWidth={i % 10 === 0 ? 2 : 0.8} />
            <line x1={x0} x2={x0 + 10 * c} y1={y0 + i * c} y2={y0 + i * c} stroke={i % 10 === 0 ? BLEU : "#94a3b8"} strokeWidth={i % 10 === 0 ? 2 : 0.8} />
          </g>
        ))}
        <text x={x0 + 10 * c + 8} y={y0 + 10} fontSize={POLICE} fontWeight={700} fill={ORANGE}>
          1 mm²
        </text>
        <text x={x0 + 5 * c} y={y0 + 10 * c + 18} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
          1 cm = 10 mm
        </text>
        <text x={x0 - 10} y={y0 + 5 * c} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS} transform={`rotate(-90 ${x0 - 10} ${y0 + 5 * c})`}>
          1 cm
        </text>
        {compte ? (
          <text x={x0 + 5 * c} y={y0 + 10 * c + 38} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={BLEU}>
            1 cm² = 100 mm²
          </text>
        ) : null}
      </svg>
    </div>
  );
};

/** Un terrain de `lo` m sur `la` m, quadrillé en carrés de 1 m (exercice 11). */
const terrain = (lo: number, la: number, bas: string, gauche: string, legende: string) => {
  const c = 7;
  const x0 = 30;
  const y0 = 6;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} ${y0 + la * c + 44}`} className="h-auto w-full" role="img" aria-label={`Un terrain de ${bas} sur ${gauche}, quadrillé en mètres carrés`}>
        <rect x={x0} y={y0} width={lo * c} height={la * c} fill="#fde68a" fillOpacity={0.5} />
        <rect x={x0} y={y0} width={c} height={c} fill={ORANGE} fillOpacity={0.7} />
        {Array.from({ length: lo + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * c} x2={x0 + i * c} y1={y0} y2={y0 + la * c} stroke="#b45309" strokeWidth={i % lo === 0 ? 2 : 0.4} />
        ))}
        {Array.from({ length: la + 1 }, (_, j) => (
          <line key={`h${j}`} x1={x0} x2={x0 + lo * c} y1={y0 + j * c} y2={y0 + j * c} stroke="#b45309" strokeWidth={j % la === 0 ? 2 : 0.4} />
        ))}
        <text x={x0 + (lo * c) / 2} y={y0 + la * c + 16} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
          {bas}
        </text>
        <text x={x0 - 9} y={y0 + (la * c) / 2} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS} transform={`rotate(-90 ${x0 - 9} ${y0 + (la * c) / 2})`}>
          {gauche}
        </text>
        <text x={x0 + (lo * c) / 2} y={y0 + la * c + 34} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={ORANGE}>
          {legende}
        </text>
      </svg>
    </div>
  );
};

/** Un carré de 1 km de côté et un point par habitant (exercice 12). */
const points = (colonnes: number, rangees: number, legende: string) => {
  const x0 = 45;
  const y0 = 6;
  const cote = 150;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} 198`} className="h-auto w-full" role="img" aria-label={legende}>
        <rect x={x0} y={y0} width={cote} height={cote} fill="#dcfce7" stroke="#15803d" strokeWidth={2} />
        {Array.from({ length: colonnes * rangees }, (_, k) => (
          <circle key={k} cx={x0 + ((k % colonnes) + 0.5) * (cote / colonnes)} cy={y0 + (Math.floor(k / colonnes) + 0.5) * (cote / rangees)} r={2.6} fill="#166534" />
        ))}
        <text x={x0 + cote / 2} y={y0 + cote + 16} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
          1 km
        </text>
        <text x={x0 - 9} y={y0 + cote / 2} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS} transform={`rotate(-90 ${x0 - 9} ${y0 + cote / 2})`}>
          1 km
        </text>
        <text x={x0 + cote / 2} y={y0 + cote + 36} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill="#15803d">
          {legende}
        </text>
      </svg>
    </div>
  );
};

/** Un cube de `n` cm d'arête découpé en cubes de 1 cm³, en perspective cavalière (exercice 8). */
const cube = (n: number, arete: string, droite: string[], bas: string) => {
  const x0 = 40;
  const yb = 118;
  const cote = 72;
  const fuite = 40;
  const s = cote / n;
  const d = fuite / n;
  const pts = (...p: [number, number][]) => p.map(([a, b]) => `${a},${b}`).join(" ");
  const traits: [number, number, number, number][] = [];
  for (let k = 1; k < n; k++) {
    traits.push([x0 + k * s, yb - cote, x0 + k * s, yb]);
    traits.push([x0, yb - k * s, x0 + cote, yb - k * s]);
    traits.push([x0 + k * s, yb - cote, x0 + k * s + fuite, yb - cote - fuite]);
    traits.push([x0 + k * d, yb - cote - k * d, x0 + cote + k * d, yb - cote - k * d]);
    traits.push([x0 + cote + k * d, yb - k * d, x0 + cote + k * d, yb - cote - k * d]);
    traits.push([x0 + cote, yb - k * s, x0 + cote + fuite, yb - k * s - fuite]);
  }
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} ${yb + 42}`} className="h-auto w-full" role="img" aria-label={`Un cube de ${arete} d'arête découpé en cubes de 1 cm³`}>
        <polygon points={pts([x0, yb], [x0 + cote, yb], [x0 + cote, yb - cote], [x0, yb - cote])} fill="#e2e8f0" stroke={GRIS} strokeWidth={2} />
        <polygon points={pts([x0, yb - cote], [x0 + cote, yb - cote], [x0 + cote + fuite, yb - cote - fuite], [x0 + fuite, yb - cote - fuite])} fill="#f1f5f9" stroke={GRIS} strokeWidth={2} />
        <polygon points={pts([x0 + cote, yb], [x0 + cote + fuite, yb - fuite], [x0 + cote + fuite, yb - cote - fuite], [x0 + cote, yb - cote])} fill="#cbd5e1" stroke={GRIS} strokeWidth={2} />
        {traits.map(([a, b, c, e], i) => (
          <line key={i} x1={a} y1={b} x2={c} y2={e} stroke={GRIS} strokeWidth={0.9} />
        ))}
        <text x={x0 + cote / 2} y={yb + 16} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={GRIS}>
          {arete}
        </text>
        {droite.map((t, i) => (
          <text key={t} x={x0 + cote + fuite + 8} y={yb - 50 + i * 16} fontSize={POLICE} fontWeight={700} fill={BLEU}>
            {t}
          </text>
        ))}
        <text x={L / 2} y={yb + 36} fontSize={POLICE} fontWeight={700} textAnchor="middle" fill={ORANGE}>
          {bas}
        </text>
      </svg>
    </div>
  );
};

/** Des barres horizontales à l'échelle, partant de zéro (exercice 14). */
const barres = (max: number, items: { label: string; valeur: number; texte: string; couleur?: string }[]) => {
  const x0 = 52;
  const larg = 180;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 ${L} ${items.length * 32 + 8}`} className="h-auto w-full" role="img" aria-label={items.map((it) => `${it.label} : ${it.texte}`).join(", ")}>
        {items.map((it, i) => {
          const y = 6 + i * 32;
          const w = (it.valeur * larg) / max;
          return (
            <g key={it.label}>
              <text x={x0 - 6} y={y + 15} fontSize={POLICE} fontWeight={700} textAnchor="end" fill={GRIS}>
                {it.label}
              </text>
              <rect x={x0} y={y} width={w} height={22} rx={3} fill={it.couleur ?? BLEU} />
              <text x={x0 + w - 5} y={y + 15} fontSize={POLICE} fontWeight={700} textAnchor="end" fill="white">
                {it.texte}
              </text>
            </g>
          );
        })}
        <line x1={x0} x2={x0} y1={2} y2={items.length * 32 + 6} stroke={GRIS} strokeWidth={1.5} />
      </svg>
    </div>
  );
};

export const exercicesGrandeursComposees4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "grandeur-composee",
  titre: "Grandeurs composées : vitesse, énergie, conversions",
  accroche:
    "Vingt exercices, du kilowattheure au record de l'heure : grandeur produit et grandeur quotient, lire et écrire une unité composée (km/h, g/cm³, hab/km²), convertir des longueurs, des aires et des vitesses, et contrôler un résultat par son unité. Un guépard, un glaçon, le Rhône, une barge rousse qui vole onze jours sans se poser. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un schéma — trajets à l'échelle, tableaux de conversion, rectangles dont l'aire est l'énergie.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/grandeur-composee", titre: "Grandeurs composées et unités" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je repère si je dois multiplier ou diviser, je calcule, et j'écris l'unité à chaque ligne.",
      rappel: [
        "Une grandeur PRODUIT s'obtient en multipliant : énergie = puissance × durée. Des kW multipliés par des h donnent des kWh, le « kilowattheure ».",
        "Une grandeur QUOTIENT s'obtient en divisant : vitesse = distance ÷ durée. La barre se lit « par » : 60 m/min, c'est 60 m pour UNE minute.",
        "Convertir une aire : 1 cm = 10 mm, donc 1 cm² = 10 × 10 = 100 mm². Le facteur des longueurs compte DEUX fois.",
        "L'unité subit le même calcul que les nombres. Une aire en m, un volume en m² : c'est faux, sans rien recalculer.",
      ],
      exercices: [
        {
          enonce: "Une plaque de cuisson de $1{,}5$ kW chauffe une casserole pendant $40$ min. Quelle énergie consomme-t-elle, en kWh ?",
          correction:
            "L'énergie est une grandeur produit : puissance × durée. Pour obtenir des kWh, je multiplie des kW par des HEURES.\nJe convertis la durée : $40$ min $= \\dfrac{40}{60}$ h $= \\dfrac{2}{3}$ h.\n$E = 1{,}5 \\times \\dfrac{2}{3} = 1$ kWh.\n⭐ Sur le dessin, l'énergie est l'AIRE du rectangle : la durée en largeur, la puissance en hauteur. En une heure entière, ce serait $1{,}5$ kWh ; en $40$ min, les deux tiers.\n⛔ Le piège : écrire $40$ min $= 0{,}40$ h. Une heure compte $60$ minutes, pas $100$ : on trouverait $1{,}5 \\times 0{,}40 = 0{,}6$ kWh au lieu de $1$.\nRéponse : la plaque consomme $1$ kWh.",
          schema: produit(
            60,
            2,
            [
              { l: 60, h: 1.5, texte: "en 1 h : 1,5 kWh", ou: "dessus", tirets: true },
              { l: 40, h: 1.5, texte: "1 kWh", ou: "dedans" },
            ],
            { x: [[40, "40"], [60, "60"]], y: [[1.5, "1,5"]], ux: "durée (min)", uy: "puissance (kW)" },
          ),
          micros: ["grandeur_produit"],
        },
        {
          enonce: "Une nageuse parcourt $1\\,500$ m en $25$ min, à allure régulière. Quelle est sa vitesse moyenne, en mètres par minute ?",
          correction:
            "La vitesse est une grandeur quotient : distance ÷ durée. L'unité demandée, m/min, me dit l'ordre : des mètres DIVISÉS par des minutes.\n$v = 1\\,500 \\div 25 = 60$ m/min.\nCela veut dire : $60$ m pour UNE minute. Sur le dessin, toutes les $5$ minutes, elle avance de $5 \\times 60 = 300$ m.\n⛔ Le piège : diviser dans l'autre sens, $25 \\div 1\\,500 \\approx 0{,}017$. Ce nombre est en min/m, le temps pour UN mètre : ce n'est pas une vitesse.\nRéponse : sa vitesse moyenne est $60$ m/min.",
          schema: trajets(1500, [
            {
              legende: "en haut : min · en bas : m",
              plein: 1500,
              marques: [[0, "0", "0"], [300, "5", "300"], [600, "10", "600"], [900, "15", "900"], [1200, "20", ""], [1500, "25", "1 500"]],
            },
          ]),
          micros: ["grandeur_quotient"],
        },
        {
          enonce:
            "Pour chaque calcul, écrire l'unité du résultat, la lire à voix haute, et dire s'il s'agit d'une grandeur produit ou d'une grandeur quotient.\na) Un prix en euros divisé par un volume en litres.\nb) Une puissance en watts multipliée par une durée en heures.\nc) Un nombre d'habitants divisé par une aire en km².\nd) Une masse en grammes divisée par un volume en cm³.",
          correction:
            "L'unité du résultat subit la MÊME opération que les nombres : je multiplie ou je divise les unités.\na) € ÷ L donne €/L, qui se lit « euros par litre » : grandeur quotient. C'est le prix affiché à la pompe.\nb) W × h donne Wh, qui se lit « wattheure » : grandeur produit.\nc) habitants ÷ km² donne hab/km², « habitants par kilomètre carré » : grandeur quotient, la densité de population.\nd) g ÷ cm³ donne g/cm³, « grammes par centimètre cube » : grandeur quotient, la masse volumique.\n⭐ Le repère : une barre trahit une division ; deux unités collées trahissent une multiplication.\n⛔ Le piège : lire « €/L » comme « des euros et des litres ». La barre se lit « par » : c'est le prix de UN litre.\nRéponse : €/L (quotient) ; Wh (produit) ; hab/km² (quotient) ; g/cm³ (quotient).",
          schema: tableau([
            ["on calcule", "on obtient", "famille"],
            ["€ ÷ L", "€/L", "quotient"],
            ["W × h", "Wh", "produit"],
            ["hab ÷ km²", "hab/km²", "quotient"],
            ["g ÷ cm³", "g/cm³", "quotient"],
          ]),
          micros: ["grandeur_unite_composee", "grandeur_produit", "grandeur_quotient"],
        },
        {
          enonce:
            "Sur l'étiquette d'un sachet de riz, on lit : $2{,}40$ €/kg.\na) Que signifie cette indication ?\nb) Combien coûtent $3$ kg de ce riz ?\nc) Combien coûtent $500$ g ?\nd) Quelle masse de riz peut-on acheter avec $6$ € ?",
          correction:
            "a) La barre se lit « par » : $2{,}40$ € PAR kilogramme, c'est-à-dire $2{,}40$ € pour UN kilo. C'est un prix au kilo, une grandeur quotient.\nb) $3$ kilos coûtent trois fois plus : $3 \\times 2{,}40 = 7{,}20$ €.\nc) Le prix est donné par kilo : je convertis d'abord, $500$ g $= 0{,}5$ kg. Puis $0{,}5 \\times 2{,}40 = 1{,}20$ €.\nd) Je divise l'argent par le prix d'un kilo : $6 \\div 2{,}40 = 2{,}5$ kg. L'unité le confirme : des € divisés par des €/kg donnent des kg.\n⛔ Le piège : calculer $500 \\times 2{,}40 = 1\\,200$ €. Des grammes multipliés par des €/kg ne donnent pas des euros : je convertis AVANT de multiplier.\nRéponse : $2{,}40$ € pour $1$ kg ; $7{,}20$ € ; $1{,}20$ € ; $2{,}5$ kg.",
          schema: tableau([
            ["Masse (kg)", "1", "3", "0,5", "2,5"],
            ["Prix (€)", "2,40", "7,20", "1,20", "6"],
          ]),
          micros: ["grandeur_unite_composee", "grandeur_quotient"],
        },
        {
          enonce: "Convertir en mètres.\na) $3{,}7$ km\nb) $45$ mm\nc) $280$ cm",
          correction:
            "Chaque unité de longueur vaut $10$ fois la suivante : km, hm, dam, m, dm, cm, mm. Dans le tableau, je place le chiffre des unités du nombre dans la colonne de son unité, puis je lis le nombre avec la virgule dans la colonne des mètres.\na) $1$ km $= 1\\,000$ m, donc $3{,}7$ km $= 3{,}7 \\times 1\\,000 = 3\\,700$ m.\nb) $1$ m $= 1\\,000$ mm, donc $45$ mm $= 45 \\div 1\\,000 = 0{,}045$ m.\nc) $1$ m $= 100$ cm, donc $280$ cm $= 280 \\div 100 = 2{,}8$ m.\n⭐ Contrôle : vers une unité plus GRANDE, le nombre devient plus PETIT ; vers une unité plus petite, il grandit.\n⛔ Le piège : écrire $45$ mm $= 0{,}45$ m. Il y a TROIS rangs du millimètre au mètre, pas deux.\nRéponse : $3\\,700$ m ; $0{,}045$ m ; $2{,}8$ m.",
          schema: conversion(["km", "hm", "dam", "m", "dm", "cm", "mm"], 1, [
            { cases: ["3", "7", "0", "0", "", "", ""], de: "km", vers: "m" },
            { cases: ["", "", "", "0", "0", "4", "5"], de: "mm", vers: "m" },
            { cases: ["", "", "", "2", "8", "0", ""], de: "cm", vers: "m" },
          ]),
          micros: ["grandeur_convertir"],
        },
        {
          enonce:
            "a) Un carré de $1$ cm de côté est découpé en carrés de $1$ mm de côté (figure). Combien y en a-t-il ? En déduire combien de mm² vaut $1$ cm².\nb) Convertir : $6$ cm² en mm² ; $45\\,000$ cm² en m² ; $3{,}2$ dm² en cm².",
          figure: grilleMm(false),
          correction:
            "a) Le côté de $1$ cm mesure $10$ mm : il y a $10$ rangées de $10$ petits carrés, soit $10 \\times 10 = 100$ carrés de $1$ mm². Donc $1$ cm² $= 100$ mm².\nC'est la conséquence de $1$ cm $= 10$ mm : une aire multiplie DEUX longueurs, le facteur $10$ compte deux fois.\nb) D'une unité d'aire à la suivante, le facteur est $100$ : dans le tableau, chaque unité a DEUX colonnes.\n$6$ cm² $= 6 \\times 100 = 600$ mm².\n$1$ m² $= 100 \\times 100 = 10\\,000$ cm², donc $45\\,000$ cm² $= 45\\,000 \\div 10\\,000 = 4{,}5$ m².\n$1$ dm² $= 100$ cm², donc $3{,}2$ dm² $= 3{,}2 \\times 100 = 320$ cm².\n⛔ Le piège : écrire $6$ cm² $= 60$ mm², avec le facteur des longueurs. Le dessin compte $100$ petits carrés, pas $10$.\nRéponse : $1$ cm² $= 100$ mm² ; $600$ mm² ; $4{,}5$ m² ; $320$ cm².",
          schema: deux(
            grilleMm(true),
            conversion(["m²", "dm²", "cm²", "mm²"], 2, [
              { cases: ["", "", " 6", "00"], de: "cm²", vers: "mm²" },
              { cases: [" 4", "50", "00", ""], de: "cm²", vers: "m²" },
              { cases: ["", " 3", "20", ""], de: "dm²", vers: "cm²" },
            ]),
          ),
          micros: ["grandeur_convertir"],
        },
        {
          enonce:
            "Sans faire aucun calcul, dire si chaque résultat est possible. S'il ne l'est pas, dire si c'est l'unité ou la valeur qui cloche.\na) L'aire d'un jardin : $540$ m.\nb) La vitesse d'un escargot : $3$ m/h.\nc) Le volume d'eau d'une piscine : $75$ m².\nd) La vitesse d'un marcheur : $50$ km/h.\ne) L'énergie consommée par un four en une soirée : $2$ kWh.",
          correction:
            "Je pose deux questions, dans cet ordre : l'unité est-elle celle de la grandeur cherchée ? Puis : la valeur est-elle plausible ?\na) Une aire se mesure en m², pas en m : l'UNITÉ cloche. $540$ m est une longueur.\nb) m/h est bien une unité de vitesse, et $3$ m par heure, c'est moins d'un millimètre par seconde : c'est plausible pour un escargot.\nc) Un volume se mesure en m³ : l'UNITÉ cloche. $75$ m² serait la surface de l'eau, pas son volume.\nd) km/h est bien une unité de vitesse, mais un marcheur fait environ $5$ km/h : c'est la VALEUR qui cloche, dix fois trop grande.\ne) kWh est bien une unité d'énergie, et $2$ kWh est plausible pour un four.\n⛔ Le piège : croire que l'unité suffit. Au d), l'unité est parfaite et le résultat est pourtant absurde : il faut aussi l'ordre de grandeur.\nRéponse : a) et c) sont faux par l'unité ; d) est faux par la valeur ; b) et e) sont possibles.",
          schema: tableau([
            ["on lit", "l'unité", "la valeur"],
            ["a) 540 m", "✗", "–"],
            ["b) 3 m/h", "✓", "✓"],
            ["c) 75 m²", "✗", "–"],
            ["d) 50 km/h", "✓", "✗"],
            ["e) 2 kWh", "✓", "✓"],
          ]),
          micros: ["grandeur_coherence"],
        },
        {
          enonce:
            "Un petit cube d'aluminium a $2$ cm d'arête. Il pèse $21{,}6$ g.\na) Calculer son volume.\nb) Calculer la masse volumique de l'aluminium, en g/cm³.\nc) Quelle serait la masse d'une plaque d'aluminium de $50$ cm³ ?",
          correction:
            "a) $V = 2 \\times 2 \\times 2 = 8$ cm³ : le cube se découpe en $8$ petits cubes de $1$ cm³.\nb) La masse volumique est une grandeur quotient : masse ÷ volume, en g/cm³. $21{,}6 \\div 8 = 2{,}7$ g/cm³.\nCela veut dire que chaque cm³ d'aluminium pèse $2{,}7$ g : c'est ce qu'écrit le dessin sur chaque petit cube.\nc) $50$ cm³ pèsent $50$ fois plus : $50 \\times 2{,}7 = 135$ g.\n⛔ Le piège : diviser le volume par la masse, $8 \\div 21{,}6 \\approx 0{,}37$. Le résultat serait en cm³/g, le volume de UN gramme : pas une masse volumique.\nRéponse : $8$ cm³ ; $2{,}7$ g/cm³ ; $135$ g.",
          schema: cube(2, "2 cm", ["8 cm³", "21,6 g"], "chaque cube de 1 cm³ : 2,7 g"),
          micros: ["grandeur_quotient"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Je convertis d'abord, j'écris l'unité à chaque ligne, et je contrôle le résultat.",
      rappel: [
        "Avant de calculer, je mets les données dans des unités qui vont ensemble : des kW avec des h pour des kWh, des km avec des h pour des km/h.",
        "Des m/s aux km/h : en 1 h il y a 3 600 s, et 1 km = 1 000 m. Multiplier par 3 600 puis diviser par 1 000, c'est multiplier par 3,6.",
        "Masse volumique = masse ÷ volume (g/cm³). Débit = volume ÷ durée (L/min). Et à l'envers : volume = débit × durée.",
        "Deux contrôles : l'unité est-elle la bonne ? La valeur est-elle plausible ?",
      ],
      exercices: [
        {
          enonce:
            "La vitesse de pointe d'un guépard a été mesurée à $29$ m/s.\na) Convertir cette vitesse en km/h.\nb) Sur autoroute, la vitesse est limitée à $130$ km/h. Convertir en m/s, arrondi au dixième.\nc) Un guépard lancé irait-il plus vite qu'une voiture sur l'autoroute ?",
          correction:
            "a) $29$ m/s, c'est $29$ m en UNE seconde. Une heure compte $60 \\times 60 = 3\\,600$ s : en une heure, $29 \\times 3\\,600 = 104\\,400$ m, soit $104{,}4$ km. Donc $29$ m/s $= 104{,}4$ km/h.\n⭐ Le raccourci : multiplier par $3\\,600$ puis diviser par $1\\,000$, c'est multiplier par $3{,}6$. $29 \\times 3{,}6 = 104{,}4$.\nb) Dans l'autre sens, je divise par $3{,}6$ : $130 \\div 3{,}6 \\approx 36{,}1$ m/s. (En une heure, $130\\,000$ m ; en une seconde, $130\\,000 \\div 3\\,600 \\approx 36{,}1$ m.)\nc) $104{,}4$ km/h $< 130$ km/h : la voiture va plus vite. Et le guépard ne tient sa pointe que quelques secondes.\n⛔ Le piège : ne multiplier que par $60$, et trouver $29 \\times 60 = 1\\,740$ m. C'est la distance en UNE MINUTE, pas en une heure.\nRéponse : $104{,}4$ km/h ; environ $36{,}1$ m/s ; la voiture est plus rapide.",
          schema: tableau([
            ["durée", "distance"],
            ["1 s", "29 m"],
            ["1 min = 60 s", "29 × 60 = 1 740 m"],
            ["1 h = 60 min", "1 740 × 60 = 104 400 m"],
            ["1 h", "104,4 km"],
          ]),
          micros: ["grandeur_convertir", "grandeur_quotient"],
        },
        {
          enonce:
            "Un radiateur électrique de $1\\,500$ W fonctionne $6$ h par jour pendant les $30$ jours de novembre. On compte $0{,}20$ € le kWh.\na) Quelle énergie consomme-t-il en une journée, en kWh ?\nb) En tout le mois ?\nc) Combien cela coûte-t-il ?",
          correction:
            "a) Pour des kWh, il me faut des kW : $1\\,500$ W $= 1{,}5$ kW, car $1$ kW $= 1\\,000$ W. Énergie par jour : $1{,}5 \\times 6 = 9$ kWh.\nb) $9 \\times 30 = 270$ kWh.\nc) $0{,}20$ € par kWh : $270 \\times 0{,}20 = 54$ €. L'unité le confirme : des kWh multipliés par des €/kWh donnent des €.\n⛔ Le piège : multiplier les watts tels quels, $1\\,500 \\times 6 = 9\\,000$, et écrire $9\\,000$ kWh. Ce sont $9\\,000$ Wh, mille fois moins : la facture du mois serait de $54\\,000$ € !\nRéponse : $9$ kWh par jour ; $270$ kWh dans le mois ; $54$ €.",
          schema: tableau([
            ["étape", "calcul"],
            ["puissance", "1 500 W = 1,5 kW"],
            ["1 jour", "1,5 × 6 = 9 kWh"],
            ["30 jours", "9 × 30 = 270 kWh"],
            ["coût", "270 × 0,20 = 54 €"],
          ]),
          micros: ["grandeur_produit", "grandeur_coherence"],
        },
        {
          enonce:
            "Un terrain de basket aux normes internationales est un rectangle de $28$ m sur $15$ m.\na) Calculer son aire en m².\nb) Convertir cette aire en cm².\nc) Pour repeindre le sol, une peinture couvre $12$ m² par litre. Combien de litres faut-il ?\nd) Elle est vendue en pots de $2{,}5$ L. Combien de pots faut-il acheter ?",
          correction:
            "a) L'aire est une grandeur produit : $28 \\times 15 = 420$ m². Sur le dessin, on compte $28$ colonnes de $15$ carrés de $1$ m².\nb) $1$ m $= 100$ cm, donc $1$ m² $= 100 \\times 100 = 10\\,000$ cm². $420 \\times 10\\,000 = 4\\,200\\,000$ cm².\nc) $12$ m²/L veut dire $12$ m² pour UN litre. Je divise l'aire par ce rendement : $420 \\div 12 = 35$ L. Unités : des m² divisés par des m²/L donnent des L.\nd) $35 \\div 2{,}5 = 14$ pots.\n⛔ Le piège : convertir avec le facteur $100$ et écrire $42\\,000$ cm². C'est cent fois trop peu : dans le tableau, le m² prend DEUX colonnes.\nRéponse : $420$ m² ; $4\\,200\\,000$ cm² ; $35$ L ; $14$ pots.",
          schema: deux(
            terrain(28, 15, "28 m", "15 m", "420 carrés de 1 m²"),
            conversion(["dam²", "m²", "dm²", "cm²"], 2, [{ cases: [" 4", "20", "00", "00"], de: "m²", vers: "cm²" }]),
          ),
          micros: ["grandeur_produit", "grandeur_convertir", "grandeur_quotient"],
        },
        {
          enonce:
            "La France métropolitaine compte environ $66$ millions d'habitants pour une superficie d'environ $550\\,000$ km². Paris compte environ $2{,}1$ millions d'habitants sur $105$ km².\na) Calculer la densité de population de la France métropolitaine, en habitants par km².\nb) Calculer celle de Paris.\nc) Combien de fois Paris est-il plus dense ? Arrondir à l'unité.\nd) Un élève calcule $550\\,000 \\div 66\\,000\\,000$. Quelle est l'unité de son résultat, et que mesure-t-il ?",
          correction:
            "a) La densité est une grandeur quotient : habitants ÷ km², en hab/km². $66\\,000\\,000 \\div 550\\,000 = 120$ hab/km². Le dessin place ces $120$ habitants dans un carré de $1$ km de côté.\nb) $2\\,100\\,000 \\div 105 = 20\\,000$ hab/km².\nc) $20\\,000 \\div 120 \\approx 167$ : Paris est environ $167$ fois plus dense.\nd) Il a divisé des km² par des habitants : son résultat, $\\approx 0{,}0083$, est en km²/hab. C'est la surface pour UN habitant, environ $8\\,300$ m² : pas une densité.\n⛔ Le piège : diviser dans le mauvais sens. L'unité cherchée, hab/km², dit ce qui est en haut : les habitants.\nRéponse : $120$ hab/km² ; $20\\,000$ hab/km² ; environ $167$ fois ; des km² par habitant.",
          schema: points(12, 10, "1 km² : 120 habitants"),
          micros: ["grandeur_quotient", "grandeur_unite_composee"],
        },
        {
          enonce:
            "Une coureuse boucle $10$ km en $50$ min. Sarah calcule $50 \\div 10 = 5$ et annonce : « elle court à $5$ km/min ».\na) Quelle est la vraie unité du nombre $5$ calculé par Sarah ? Que signifie-t-il ?\nb) Calculer la vitesse moyenne de la coureuse, en km/h.\nc) Sans calcul compliqué, montrer que « $5$ km/min » est absurde.",
          correction:
            "a) Sarah a divisé des MINUTES par des KILOMÈTRES : l'unité est la min/km. $5$ min/km veut dire $5$ minutes pour UN kilomètre. Les coureurs appellent ça l'allure : c'est utile, mais ce n'est pas une vitesse.\nb) Une vitesse, c'est distance ÷ durée. Je convertis : $50$ min $= \\dfrac{50}{60}$ h $= \\dfrac{5}{6}$ h. $v = 10 \\div \\dfrac{5}{6} = 10 \\times \\dfrac{6}{5} = 12$ km/h.\n⭐ Autre chemin : $1$ km en $5$ min, donc en $60$ min, $60 \\div 5 = 12$ km. On retrouve $12$ km/h.\nc) $5$ km par minute, ce serait $5 \\times 60 = 300$ km en une heure : la vitesse d'un TGV, pas d'une coureuse.\n⛔ Le piège : recopier une unité sans la calculer. L'unité subit la même division que les nombres : des minutes divisées par des kilomètres donnent des min/km.\nRéponse : $5$ min/km, soit $5$ minutes par kilomètre ; $12$ km/h ; « $5$ km/min » ferait $300$ km/h.",
          schema: trajets(10, [
            {
              legende: "en haut : min · en bas : km",
              plein: 10,
              marques: [[0, "0", "0"], [2, "10", "2"], [4, "20", "4"], [6, "30", "6"], [8, "40", "8"], [10, "50", "10"]],
            },
          ]),
          micros: ["grandeur_coherence", "grandeur_unite_composee", "grandeur_quotient"],
        },
        {
          enonce:
            "La glace a une masse volumique de $0{,}92$ g/cm³, l'eau liquide de $1$ g/cm³.\na) Un glaçon est un cube de $3$ cm d'arête. Calculer son volume, puis sa masse.\nb) Une fois fondu, quel volume d'eau donne-t-il ?\nc) On met au congélateur une bouteille pleine de $1$ L d'eau, soit $1\\,000$ cm³. Quel volume occupera la glace, au cm³ près ? Pourquoi la bouteille peut-elle éclater ?",
          correction:
            "a) $V = 3 \\times 3 \\times 3 = 27$ cm³. La masse est le volume multiplié par la masse volumique : $27 \\times 0{,}92 = 24{,}84$ g. Unités : des cm³ multipliés par des g/cm³ donnent des g.\nb) La masse ne change pas en fondant : $24{,}84$ g d'eau. Pour l'eau, $1$ g occupe $1$ cm³ : le glaçon donne $24{,}84$ cm³ d'eau, moins que ses $27$ cm³ de glace.\nc) $1\\,000$ cm³ d'eau pèsent $1\\,000$ g. Gelée, cette masse occupe un volume égal à la masse divisée par la masse volumique : $1\\,000 \\div 0{,}92 \\approx 1\\,087$ cm³. La glace prend $87$ cm³ de plus que l'eau : la bouteille, pleine, n'a pas la place.\n⛔ Le piège : multiplier au lieu de diviser au c), $1\\,000 \\times 0{,}92 = 920$ cm³. Le contrôle par l'unité le dit : des g multipliés par des g/cm³ ne donnent pas des cm³.\nRéponse : $27$ cm³ et $24{,}84$ g ; $24{,}84$ cm³ d'eau ; environ $1\\,087$ cm³ de glace.",
          schema: barres(1200, [
            { label: "eau", valeur: 1000, texte: "1 000 cm³" },
            { label: "glace", valeur: 1087, texte: "≈ 1 087 cm³", couleur: CYAN },
          ]),
          micros: ["grandeur_quotient", "grandeur_produit"],
        },
        {
          enonce:
            "Un pommeau de douche classique débite $12$ L/min ; un pommeau économe, $6$ L/min. Une douche dure $7$ min.\na) Quel volume d'eau consomme une douche avec chaque pommeau ?\nb) Quelle économie fait-on en une année, à une douche par jour ($365$ douches) ? Donner le résultat en litres, puis en m³.",
          correction:
            "a) Le débit est de $12$ L pour UNE minute. En $7$ min : $12 \\times 7 = 84$ L. Avec le pommeau économe : $6 \\times 7 = 42$ L.\nUnités : des L/min multipliés par des min donnent des L. Sur le dessin, chaque volume est l'AIRE d'un rectangle : le débit en hauteur, la durée en largeur.\nb) Économie par douche : $84 - 42 = 42$ L. En un an : $42 \\times 365 = 15\\,330$ L.\n$1$ m³ $= 1\\,000$ L, donc $15\\,330$ L $= 15\\,330 \\div 1\\,000 = 15{,}33$ m³.\n⛔ Le piège : écrire le résultat en « L/min ». $84$ L/min serait un débit ; le volume d'une douche se mesure en litres : les minutes se sont simplifiées.\nRéponse : $84$ L et $42$ L par douche ; $15\\,330$ L, soit $15{,}33$ m³ par an.",
          schema: produit(
            8,
            14,
            [
              { l: 7, h: 12, texte: "classique : 84 L", ou: "dessus" },
              { l: 7, h: 6, texte: "économe : 42 L", ou: "dedans", couleur: ORANGE },
            ],
            { x: [[7, "7"]], y: [[6, "6"], [12, "12"]], ux: "durée (min)", uy: "débit (L/min)" },
          ),
          micros: ["grandeur_produit", "grandeur_convertir"],
        },
        {
          enonce:
            "Lou fait $18$ km à vélo en $45$ min. Enzo, en roller, avance à $7$ m/s.\na) Calculer la vitesse de Lou en km/h.\nb) Convertir la vitesse d'Enzo en km/h.\nc) Qui va le plus vite ? Quelle distance chacun parcourt-il en une heure ?",
          correction:
            "a) $45$ min $= \\dfrac{45}{60}$ h $= 0{,}75$ h. $v = 18 \\div 0{,}75 = 24$ km/h.\n⭐ Autre chemin : $45$ min, c'est trois quarts d'heure. $18$ km en trois quarts d'heure, donc $6$ km par quart d'heure, et $4 \\times 6 = 24$ km en une heure.\nb) $7$ m/s : en une heure, $7 \\times 3\\,600 = 25\\,200$ m, soit $25{,}2$ km. Donc $25{,}2$ km/h.\nc) Pour comparer, il faut la MÊME unité : $25{,}2 > 24$. Enzo va un peu plus vite. En une heure, Lou fait $24$ km et Enzo $25{,}2$ km.\n⛔ Le piège : comparer $7$ et $24$ directement. Des m/s et des km/h ne se comparent pas : $1$ m/s vaut $3{,}6$ km/h.\nRéponse : $24$ km/h ; $25{,}2$ km/h ; Enzo va plus vite, $25{,}2$ km contre $24$ km en une heure.",
          schema: trajets(26, [
            { legende: "Lou, à vélo (km)", plein: 24, marques: [[0, "0 h", "0"], [18, "45 min", "18"], [24, "1 h", "24"]] },
            { legende: "Enzo, en roller (km)", plein: 25.2, marques: [[0, "0 h", "0"], [25.2, "1 h", "25,2"]], couleur: ORANGE },
          ]),
          micros: ["grandeur_quotient", "grandeur_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je range les données avec leurs unités, je convertis avant de calculer, et je termine par une phrase de réponse.",
      rappel: [
        "Je range les données dans un tableau avec leurs unités, et je convertis AVANT de calculer.",
        "À chaque ligne de calcul, j'écris l'unité : si elle ne sort pas juste, je me suis trompé d'opération.",
        "À la fin, je compare à un ordre de grandeur connu : un marcheur fait 5 km/h, une voiture 100 km/h, un avion de ligne 900 km/h.",
      ],
      exercices: [
        {
          titre: "Onze jours sans se poser",
          enonce:
            "En octobre 2022, une jeune barge rousse, un oiseau migrateur équipé d'une balise, a volé sans escale de l'Alaska jusqu'en Tasmanie : environ $13\\,560$ km en $11$ jours, sans se poser une seule fois.\na) Quelle distance a-t-elle parcourue en moyenne par jour ? Arrondir au km.\nb) Calculer sa vitesse moyenne en km/h, arrondie au dixième.\nc) Convertir cette vitesse en m/s, arrondie au dixième.\nd) Un site titre : « la barge a volé à $1\\,233$ km/h ». Quelle erreur a-t-il faite ?",
          correction:
            "a) Distance ÷ nombre de jours : $13\\,560 \\div 11 \\approx 1\\,233$ km par jour.\nb) Pour des km/h, il me faut des heures : $11 \\times 24 = 264$ h. $v = 13\\,560 \\div 264 \\approx 51{,}4$ km/h.\nc) Je divise par $3{,}6$ : $51{,}36 \\div 3{,}6 \\approx 14{,}3$ m/s. (Autre chemin : $13\\,560\\,000$ m en $264 \\times 3\\,600 = 950\\,400$ s, et $13\\,560\\,000 \\div 950\\,400 \\approx 14{,}3$.)\nd) $1\\,233$ est le nombre de km par JOUR, pas par heure : le site a gardé des jours et écrit des heures. Et $1\\,233$ km/h dépasserait un avion de ligne, environ $900$ km/h : l'ordre de grandeur aurait dû l'alerter.\n⛔ Le piège : diviser par des jours et écrire des km/h. L'unité de durée doit être la même dans le calcul et dans la réponse.\nRéponse : environ $1\\,233$ km par jour ; environ $51{,}4$ km/h ; environ $14{,}3$ m/s ; des km par jour pris pour des km/h.",
          schema: trajets(13560, [
            { legende: "en haut : jours · en bas : km", plein: 13560, marques: [[0, "0", "0"], [6780, "5,5", "6 780"], [13560, "11", "13 560"]] },
          ]),
          micros: ["grandeur_quotient", "grandeur_convertir", "grandeur_coherence", "grandeur_defi"],
        },
        {
          titre: "Le Rhône et nos robinets",
          enonce:
            "Le Rhône, à Beaucaire, a un débit moyen d'environ $1\\,700$ m³/s. En France, chaque habitant utilise en moyenne environ $150$ L d'eau par jour à la maison, et la France métropolitaine compte environ $66$ millions d'habitants.\na) Quel volume d'eau passe à Beaucaire en une journée, c'est-à-dire en $86\\,400$ s ?\nb) Quel volume d'eau les habitants utilisent-ils à la maison en une journée ? Donner le résultat en litres, puis en m³.\nc) Combien de temps faut-il au Rhône pour débiter ce volume ? Arrondir à la minute.\nd) Vérifier par les unités que le calcul du c) donne bien une durée.",
          correction:
            "a) Débit × durée : $1\\,700 \\times 86\\,400 = 146\\,880\\,000$ m³. Unités : des m³/s multipliés par des s donnent des m³.\nb) $66\\,000\\,000 \\times 150 = 9\\,900\\,000\\,000$ L. Comme $1$ m³ $= 1\\,000$ L : $9\\,900\\,000\\,000 \\div 1\\,000 = 9\\,900\\,000$ m³.\nc) La durée est le volume divisé par le débit : $9\\,900\\,000 \\div 1\\,700 \\approx 5\\,824$ s. En minutes : $5\\,824 \\div 60 \\approx 97$ min, soit $1$ h $37$ min.\nd) Des m³ divisés par des m³/s : les m³ se simplifient, il reste des s. C'est bien une durée.\n⭐ Toute l'eau des maisons françaises d'une journée passe à Beaucaire en moins de deux heures : le dessin la place sur les $24$ h du jour, moins de $7$ % du débit.\n⛔ Le piège : diviser des litres par des m³/s, $9\\,900\\,000\\,000 \\div 1\\,700$. Le résultat serait mille fois trop grand : je convertis en m³ AVANT de diviser.\nRéponse : $146\\,880\\,000$ m³ ; $9\\,900\\,000\\,000$ L, soit $9\\,900\\,000$ m³ ; environ $1$ h $37$ min.",
          schema: trajets(1440, [
            {
              legende: "24 h de débit du Rhône",
              plein: 97,
              marques: [[0, "0 h", ""], [97, "", "1 h 37"], [360, "6 h", ""], [720, "12 h", ""], [1080, "18 h", ""], [1440, "24 h", ""]],
            },
          ]),
          micros: ["grandeur_produit", "grandeur_quotient", "grandeur_convertir", "grandeur_coherence", "grandeur_defi"],
        },
        {
          titre: "Le corps humain, un appareil de 100 W",
          enonce:
            "Au repos, le corps d'un adulte dépense de l'énergie à peu près comme un appareil de $100$ W qui ne s'éteint jamais.\na) Quelle énergie le corps dépense-t-il en $24$ h ? Donner le résultat en Wh, puis en kWh.\nb) Un four de $2{,}4$ kW consomme la même énergie en combien de temps ?\nc) À $0{,}20$ € le kWh, combien coûterait cette énergie sur une facture d'électricité ?\nd) Un élève écrit : « $100 \\times 24 = 2\\,400$ kWh ». Qu'en penser ?",
          correction:
            "a) Énergie $=$ puissance × durée : $100 \\times 24 = 2\\,400$ Wh. Comme $1$ kWh $= 1\\,000$ Wh : $2\\,400$ Wh $= 2{,}4$ kWh.\nb) La durée est l'énergie divisée par la puissance : $2{,}4 \\div 2{,}4 = 1$ h. Une journée entière de notre corps, c'est une heure de four.\n⭐ Sur le dessin, les deux rectangles ont la même AIRE : l'un est long et très bas ($24$ h à $0{,}1$ kW), l'autre court et haut ($1$ h à $2{,}4$ kW).\nc) $2{,}4 \\times 0{,}20 = 0{,}48$ € : moins de cinquante centimes par jour.\nd) Il a multiplié des WATTS par des heures : il obtient des Wh, pas des kWh. $2\\,400$ kWh, c'est mille fois trop, et cela coûterait $2\\,400 \\times 0{,}20 = 480$ € par jour.\n⛔ Le piège : oublier que le préfixe kilo vaut $1\\,000$. $100$ W, c'est $0{,}1$ kW.\nRéponse : $2\\,400$ Wh, soit $2{,}4$ kWh ; $1$ h ; $0{,}48$ € ; il confond Wh et kWh.",
          schema: produit(
            26,
            2.8,
            [
              { l: 24, h: 0.1, texte: "2,4 kWh", ou: "dessus" },
              { l: 1, h: 2.4, texte: "2,4 kWh", ou: "droite", couleur: ORANGE },
            ],
            { x: [[1, "1"], [24, "24"]], y: [[0.1, "0,1"], [2.4, "2,4"]], ux: "durée (h)", uy: "puissance (kW)" },
          ),
          micros: ["grandeur_produit", "grandeur_convertir", "grandeur_coherence", "grandeur_defi"],
        },
        {
          titre: "Le record de l'heure",
          enonce:
            "Le 8 octobre 2022, sur la piste de $250$ m du vélodrome de Granges, en Suisse, le cycliste Filippo Ganna a parcouru $56{,}792$ km en une heure : c'est le record de l'heure.\na) Quelle était sa vitesse moyenne en km/h ? Il n'y a presque rien à calculer : pourquoi ?\nb) Convertir cette vitesse en m/s, arrondie au dixième.\nc) Combien de tours de piste complets a-t-il faits ?\nd) Combien de temps durait un tour, en moyenne ? Arrondir au dixième de seconde.\ne) Un journal écrit « $56{,}792$ m/s ». Montrer que c'est absurde.",
          correction:
            "a) km/h veut dire « kilomètres POUR UNE heure ». Il a roulé exactement une heure : la distance parcourue EST la vitesse moyenne, $56{,}792$ km/h.\nb) $56{,}792$ km $= 56\\,792$ m, et $1$ h $= 3\\,600$ s. $56\\,792 \\div 3\\,600 \\approx 15{,}8$ m/s.\nc) $56\\,792 \\div 250 = 227{,}168$ : $227$ tours complets, et un petit bout du suivant.\nd) En $3\\,600$ s, il fait $227{,}168$ tours : $3\\,600 \\div 227{,}168 \\approx 15{,}8$ s par tour. (Autre chemin : $250$ m à $15{,}78$ m/s, et $250 \\div 15{,}78 \\approx 15{,}8$ s.)\ne) $56{,}792 \\times 3{,}6 \\approx 204$ : ce serait $204$ km/h, la vitesse d'une voiture de course, pas celle d'un vélo. L'unité est bien une unité de vitesse, mais la VALEUR est absurde.\n⛔ Le piège : diviser des kilomètres par des secondes, $56{,}792 \\div 3\\,600 \\approx 0{,}016$. On obtient des km/s, un nombre minuscule : je convertis d'abord en mètres.\nRéponse : $56{,}792$ km/h ; environ $15{,}8$ m/s ; $227$ tours ; environ $15{,}8$ s par tour ; $204$ km/h, c'est absurde.",
          schema: trajets(60, [
            {
              legende: "en haut : min · en bas : km",
              plein: 60,
              marques: [[0, "0", "0"], [15, "15", ""], [30, "30", "28,396"], [45, "45", ""], [60, "60", "56,792"]],
            },
          ]),
          micros: ["grandeur_quotient", "grandeur_convertir", "grandeur_coherence", "grandeur_defi"],
        },
      ],
    },
  ],
};
