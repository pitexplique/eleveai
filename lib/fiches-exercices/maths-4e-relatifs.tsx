// ─── Fiche d'exercices : les opérations sur les relatifs (4e) — 20 exercices corrigés
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-operations-relatifs.tsx` et
// sur les sept micros du coach de 4e (notionId `relatif_operation`). L'angle de
// la 4e, comme le cours : l'addition et la soustraction viennent de 5e, la
// NOUVEAUTÉ est la multiplication et la division, donc la RÈGLE DES SIGNES, puis
// l'ordre des calculs dans un calcul mélangé.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni (−3) + 7, (−5) + (−4),
// 6 − 9, 5 − (−3), ni (−4) × 3, (−5) × (−2), (−4) × (−3), (−12) ÷ 3,
// (−20) ÷ (−5), ni (−3) × 4 + 5, ni (−2) × (−3) × (−1), ni « −2 °C puis +7 »,
// ni la descente de 3 °C par heure. ⛔ Ni ceux de la feuille des rationnels de
// 3e (les quatre stations dans le froid, −3/4 contre −2/5…).
//
// Le niveau : celui de la 4e — entiers et décimaux simples, positifs et
// négatifs ; les quatre opérations ; parenthèses, priorités, trait de fraction.
// Rien des fractions négatives (notion `fraction_nombre`), rien des puissances.
//
// Les pièges nommés : ajouter les distances quand les signes sont contraires
// (1), changer le signe du PREMIER nombre dans une soustraction (2, 9), « des
// moins, donc négatif » dans un produit (3), une règle à part pour la division
// (4), perdre un signe dans une longue somme (5, 13), calculer de gauche à
// droite sans les priorités (6, 10), 4 − 9 au lieu de 4 − (−9) pour un écart
// (7, 14, 17, 19), le facteur nul oublié (8), la division avant la
// multiplication quand elles se suivent (11), simplifier un numérateur pas fini
// (12), « moins par moins donne plus » appliqué à une addition (15), la moyenne
// des distances sans les signes (16), le signe perdu sous zéro (18), −9 − 3 au
// lieu de −9 − (−3) (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - Everest : 8 849 m (8 848,86 m, mesure conjointe Chine–Népal annoncée le
//   8 décembre 2020) — ex. 17 ;
// - mer Morte : rives vers −439 m en 2024, en baisse d'environ 1 m par an
//   (relevés du Service hydrologique israélien) ; arrondi à −440 m — ex. 17 ;
// - atmosphère type de l'aviation : 15 °C au niveau de la mer, −6,5 °C par km
//   jusqu'à 11 km, soit −56,5 °C à 11 km (OACI, Manuel de l'atmosphère type,
//   Doc 7488) — ex. 18 ;
// - records de France métropolitaine : −36,7 °C à Mouthe (Doubs) le 13 janvier
//   1968, 46,0 °C à Vérargues (Hérault) le 28 juin 2019 (Météo-France) ;
//   records de la Terre : −89,2 °C à Vostok (Antarctique) le 21 juillet 1983,
//   56,7 °C à Furnace Creek, vallée de la Mort (États-Unis) le 10 juillet 1913
//   (OMM, archive des extrêmes météorologiques) — ex. 19 ;
// - le par 72 d'un parcours de golf de championnat est l'usage courant — ex. 20.
// Tout le reste (refuge, club de handball, plongeuse, station du Jura, cartes
// de la golfeuse) est inventé, à l'ordre de grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés. Deux SVG locaux, parce qu'aucun canvas ne dessine un SAUT (la
// droite graduée du coach pose des points, pas des déplacements — c'est écrit
// dans la fiche de cours) :
//   · `droiteRel` : une droite graduée et ses sauts fléchés, « +9 » en vert
//     vers la droite, « −6 » en rouge vers la gauche ;
//   · `axeVertical` : un axe VERTICAL pour ce qui monte et descend pour de vrai
//     — altitudes, profondeurs, thermomètre — avec la flèche de l'écart.
// Et la table des signes, les étapes d'un calcul, un relevé de compte, une
// carte de golf en `tableau_donnees`. ⭐ Le script de recalcul relit chaque
// point, chaque saut et chaque case : les écrire EN CLAIR dans l'appel.
//
// Les corrigés sont écrits à la première personne (« je regroupe »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-relatifs-4e.mjs`.
//
// Micro-compétences : relatif_addition (1, 5, 9, 13, 15, 17, 20),
// relatif_soustraction (2, 7, 9, 13, 14, 15, 16, 17, 18, 19, 20),
// relatif_multiplication (3, 6, 8, 10, 14, 15, 17, 18, 19),
// relatif_division (4, 11, 12, 16, 19), relatif_calcul (6, 9, 10, 11, 12, 16,
// 18), relatif_probleme (7, 13, 14, 16, 17, 18, 19, 20),
// relatif_operation_defi (8, 15, 20). 7/7.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** −2 000, 4,65 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/**
 * Une droite graduée HORIZONTALE et ses SAUTS : un arc fléché par saut, vert
 * vers la droite (on ajoute un positif), rouge vers la gauche. Les sauts qui
 * se suivent montent d'un cran chacun, pour que leurs étiquettes ne se
 * touchent pas. Les points sont nommés SOUS les nombres de la graduation, en
 * couleur, et descendent d'une ligne quand deux étiquettes se chevauchent.
 * ⛔ Onze graduations au plus : 300 de large, les nombres restent lisibles à 375.
 */
const droiteRel = (min: number, max: number, pas: number, points: Point[], sauts: Saut[] = []) => {
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += pas) ticks.push(Math.round(v * 1e6) / 1e6);
  // Les étiquettes des points, rangée par rangée : la première où elle tient.
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  [...points]
    .map((p, i) => ({ i, cx: x(p.value), demi: (p.label.length * 7.4) / 2 + 4 }))
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[16.5rem] print:min-w-0" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - 6} x2={x(t)} y2={Y + 6} stroke={NOIR} strokeWidth={1.8} />
            <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
              {ecrit(t)}
            </text>
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          // Tangente à l'arrivée d'une courbe de Bézier : du point de contrôle vers la fin.
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="13" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            <text x={x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="13" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Un axe VERTICAL gradué : altitudes, profondeurs, thermomètre. Les nombres à
 * gauche, les points nommés à droite (écartés de 16 au moins quand ils sont
 * proches), et les flèches d'écart plus à droite encore, une colonne chacune,
 * leur valeur à côté d'elles.
 */
const axeVertical = (min: number, max: number, pas: number, points: Point[], fleches: Saut[] = []) => {
  const W = 290;
  const H = 250;
  const X = 64;
  const [haut, bas] = [16, 16];
  const y = (v: number) => haut + ((max - v) / (max - min)) * (H - haut - bas);
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += pas) ticks.push(Math.round(v * 1e6) / 1e6);
  // Les étiquettes des points, du haut vers le bas, à 16 l'une de l'autre au moins.
  const ordre = points.map((p, i) => ({ i, ty: y(p.value) + 4 })).sort((a, b) => a.ty - b.ty);
  ordre.forEach((o, k) => {
    if (k > 0) o.ty = Math.max(o.ty, ordre[k - 1].ty + 16);
  });
  const tyDe = new Map(ordre.map((o) => [o.i, o.ty]));
  return (
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[16rem] print:min-w-0" role="img" aria-label="Axe gradué vertical">
        <line x1={X} y1={H - 6} x2={X} y2={6} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${X - 5} 14 L ${X} 6 L ${X + 5} 14`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X - 6} y1={y(t)} x2={X + 6} y2={y(t)} stroke={NOIR} strokeWidth={1.8} />
            <text x={X - 10} y={y(t) + 4} textAnchor="end" fontSize="13" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
              {ecrit(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={X} cy={y(p.value)} r={5} fill={p.color ?? BLEU} />
            <line x1={X + 6} y1={y(p.value)} x2={X + 12} y2={(tyDe.get(i) ?? 0) - 4} stroke={p.color ?? BLEU} strokeWidth={1.2} />
            <text x={X + 14} y={tyDe.get(i)} fontSize="13" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
        {fleches.map((f, i) => {
          const fx = 196 + 46 * i;
          const [y1, y2] = [y(f.de), y(f.vers)];
          const c = f.vers >= f.de ? VERT : ROUGE;
          const s = y2 < y1 ? 1 : -1;
          return (
            <g key={`f${i}`}>
              <line x1={fx} y1={y1} x2={fx} y2={y2} stroke={c} strokeWidth={2.6} />
              <line x1={fx - 5} y1={y1} x2={fx + 5} y2={y1} stroke={c} strokeWidth={2} />
              <path d={`M ${fx - 5} ${y2 + 8 * s} L ${fx} ${y2} L ${fx + 5} ${y2 + 8 * s}`} fill="none" stroke={c} strokeWidth={2.4} />
              <text x={fx + 6} y={(y1 + y2) / 2 + 4} fontSize="13" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/** Deux dessins l'un sous l'autre. */
const pile = (a: ReactNode, b: ReactNode) => (
  <div className="grid gap-2">
    {a}
    {b}
  </div>
);

export const exercicesRelatifs4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "relatif-operation",
  titre: "Calculer avec les nombres relatifs",
  accroche:
    "Vingt exercices, du calcul seul au problème : additionner, soustraire, multiplier et diviser des relatifs, respecter les priorités, compter les signes. Une plongée, un compte à découvert, l'Everest et la mer Morte, l'air à 11 km d'altitude, les records de froid et de chaud, une carte de golf. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la droite graduée dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/relatif-operation", titre: "Les opérations sur les nombres relatifs" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde les signes avant d'écrire le moindre chiffre.",
      rappel: [
        "Un relatif a un signe et une distance à zéro. Deux nombres opposés, comme $-6$ et $6$, ont une somme nulle.",
        "Additionner : mêmes signes, j'ajoute les distances et je garde le signe ; signes contraires, je soustrais les distances et je garde le signe du plus éloigné de zéro.",
        "Soustraire un nombre, c'est ajouter son opposé : seul le SECOND nombre change de signe.",
        "Multiplier ou diviser : je décide le signe d'abord. Signes identiques, résultat positif ; signes contraires, résultat négatif.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) $(-8) + (-6)$\nb) $(-13) + 9$\nc) $4{,}5 + (-7{,}5)$\nd) $(-11) + 11$",
          correction:
            "a) Deux négatifs : mêmes signes. J'ajoute les distances à zéro, $8 + 6 = 14$, et je garde le signe moins : $(-8) + (-6) = -14$.\nb) Signes contraires : je soustrais les distances, $13 - 9 = 4$. Le plus éloigné de zéro est $-13$, je garde son signe : $(-13) + 9 = -4$.\nc) Signes contraires : $7{,}5 - 4{,}5 = 3$, et $-7{,}5$ est le plus éloigné de zéro : $4{,}5 + (-7{,}5) = -3$.\nd) $-11$ et $11$ sont opposés : leur somme est nulle, $(-11) + 11 = 0$.\n⛔ Le piège : au b), écrire $-22$ en ajoutant les distances. Quand les signes sont contraires, les deux nombres se compensent : on soustrait.\nRéponse : a) $-14$ ; b) $-4$ ; c) $-3$ ; d) $0$.",
          schema: droiteRel(-14, 2, 2, [{ value: -13, label: "−13", color: ROUGE }, { value: -4, label: "−4" }], [{ de: -13, vers: -4, label: "+9" }]),
          micros: ["relatif_addition"],
        },
        {
          enonce: "Écris chaque soustraction comme une addition, puis calcule.\na) $3 - 10$\nb) $(-6) - 8$\nc) $(-2) - (-9)$\nd) $7 - (-4{,}5)$",
          correction:
            "Soustraire un nombre, c'est ajouter son opposé. Je change le signe du SECOND nombre, et seulement lui.\na) $3 - 10 = 3 + (-10) = -7$ : signes contraires, $10 - 3 = 7$, et $-10$ l'emporte.\nb) $(-6) - 8 = (-6) + (-8) = -14$ : deux négatifs, j'ajoute les distances.\nc) $(-2) - (-9) = (-2) + 9 = 7$ : l'opposé de $-9$ est $9$.\nd) $7 - (-4{,}5) = 7 + 4{,}5 = 11{,}5$.\n⛔ Le piège : changer aussi le signe du premier nombre, et écrire au c) $2 + 9 = 11$. Le premier nombre ne bouge jamais.\nRéponse : a) $-7$ ; b) $-14$ ; c) $7$ ; d) $11{,}5$.",
          schema: droiteRel(-4, 8, 2, [{ value: -2, label: "−2", color: ROUGE }, { value: 7, label: "7" }], [{ de: -2, vers: 7, label: "− (−9) = +9" }]),
          micros: ["relatif_soustraction"],
        },
        {
          enonce: "Calcule. Décide le signe avant d'écrire le moindre chiffre.\na) $(-7) \\times 6$\nb) $(-9) \\times (-8)$\nc) $2{,}5 \\times (-4)$\nd) $(-1) \\times (-15)$",
          correction:
            "a) Signes contraires : le résultat est négatif. Puis les distances : $7 \\times 6 = 42$. Donc $(-7) \\times 6 = -42$.\nb) Deux signes moins : identiques, le résultat est positif. $9 \\times 8 = 72$, donc $(-9) \\times (-8) = 72$.\nc) Signes contraires : négatif. $2{,}5 \\times 4 = 10$, donc $2{,}5 \\times (-4) = -10$.\nd) Signes identiques : positif. $(-1) \\times (-15) = 15$. Multiplier par $-1$, c'est prendre l'opposé.\n⛔ Le piège : au b), écrire $-72$ parce qu'« il y a des moins ». Deux signes moins dans un PRODUIT donnent un résultat positif.\nRéponse : a) $-42$ ; b) $72$ ; c) $-10$ ; d) $15$.",
          schema: table(["calcul", "signes", "résultat"], [
            ["(−7) × 6", "contraires", "−42"],
            ["(−9) × (−8)", "identiques", "72"],
            ["2,5 × (−4)", "contraires", "−10"],
            ["(−1) × (−15)", "identiques", "15"],
          ]),
          micros: ["relatif_multiplication"],
        },
        {
          enonce: "Calcule.\na) $(-56) \\div 7$\nb) $(-45) \\div (-9)$\nc) $36 \\div (-4)$\nd) $(-7) \\div 2$",
          correction:
            "La division suit la même règle des signes que la multiplication.\na) Signes contraires : négatif. $56 \\div 7 = 8$, donc $(-56) \\div 7 = -8$.\nb) Signes identiques : positif. $45 \\div 9 = 5$, donc $(-45) \\div (-9) = 5$.\nc) Signes contraires : négatif. $36 \\div 4 = 9$, donc $36 \\div (-4) = -9$.\nd) Signes contraires : négatif. $7 \\div 2 = 3{,}5$, donc $(-7) \\div 2 = -3{,}5$.\n⭐ Contrôle par la multiplication : $(-8) \\times 7 = -56$ et $5 \\times (-9) = -45$.\n⛔ Le piège : croire que « moins divisé par moins » reste négatif, comme si la division avait sa propre règle. C'est la même table que pour le produit.\nRéponse : a) $-8$ ; b) $5$ ; c) $-9$ ; d) $-3{,}5$.",
          schema: table(["calcul", "signes", "résultat"], [
            ["(−56) ÷ 7", "contraires", "−8"],
            ["(−45) ÷ (−9)", "identiques", "5"],
            ["36 ÷ (−4)", "contraires", "−9"],
            ["(−7) ÷ 2", "contraires", "−3,5"],
          ]),
          micros: ["relatif_division"],
        },
        {
          enonce: "Calcule $A = (-5) + 12 + (-9) + 4 + (-7)$.",
          correction:
            "Dans une somme, je peux changer l'ordre des termes : je regroupe les positifs d'un côté, les négatifs de l'autre.\nLes positifs : $12 + 4 = 16$.\nLes négatifs : $(-5) + (-9) + (-7) = -21$.\nIl reste $16 + (-21)$ : signes contraires, $21 - 16 = 5$, et $-21$ est le plus éloigné de zéro. $16 + (-21) = -5$.\n⭐ Contrôle de proche en proche : $-5 + 12 = 7$, puis $7 - 9 = -2$, puis $-2 + 4 = 2$, puis $2 - 7 = -5$.\n⛔ Le piège : perdre un signe en route. Regrouper d'abord évite de jongler cinq fois avec les règles.\nRéponse : $A = -5$.",
          schema: table(["", "les positifs", "les négatifs"], [
            ["termes", "12 ; 4", "−5 ; −9 ; −7"],
            ["total", "16", "−21"],
          ]),
          micros: ["relatif_addition"],
        },
        {
          enonce: "Calcule $B = 10 - 4 \\times (-3)$.",
          correction:
            "La multiplication passe avant la soustraction : je commence par $4 \\times (-3)$.\nSignes contraires : $4 \\times (-3) = -12$.\nJe remplace : $B = 10 - (-12)$. Soustraire $-12$, c'est ajouter $12$ : $10 + 12 = 22$.\n⛔ Le piège : calculer de gauche à droite, $(10 - 4) \\times (-3) = 6 \\times (-3) = -18$. Ce n'est pas le même calcul.\nRéponse : $B = 22$.",
          schema: table(["étape", "ce que j'écris"], [
            ["l'énoncé", "10 − 4 × (−3)"],
            ["le produit", "10 − (−12)"],
            ["l'opposé", "10 + 12"],
            ["le résultat", "22"],
          ]),
          micros: ["relatif_calcul", "relatif_multiplication"],
        },
        {
          enonce: "À 6 h, le thermomètre d'un refuge de montagne affiche $-9$ °C. À 14 h, il affiche $4$ °C. De combien de degrés la température a-t-elle monté ?",
          correction:
            "Un écart se calcule toujours : valeur d'arrivée moins valeur de départ.\n$4 - (-9) = 4 + 9 = 13$.\nSur la droite graduée : de $-9$ à $0$, il y a $9$ degrés ; de $0$ à $4$, encore $4$. En tout, $9 + 4 = 13$.\n⛔ Le piège : calculer $4 - 9 = -5$, ou $9 - 4 = 5$. Le départ est $-9$, pas $9$ : il faut d'abord remonter jusqu'à zéro.\nRéponse : la température a monté de $13$ °C.",
          schema: droiteRel(-10, 6, 2, [{ value: -9, label: "6 h : −9", color: ROUGE }, { value: 4, label: "14 h : 4" }], [{ de: -9, vers: 4, label: "+13" }]),
          micros: ["relatif_probleme", "relatif_soustraction"],
        },
        {
          enonce: "Sans calculer le produit, donne le signe de chaque nombre.\n$A = (-3) \\times 5 \\times (-2) \\times (-4) \\times (-1)$\n$B = (-6) \\times (-5) \\times 0 \\times (-8)$\nCalcule ensuite $A$ pour vérifier.",
          correction:
            "Dans un produit, je compte les facteurs négatifs : un nombre pair de moins donne un résultat positif, un nombre impair un résultat négatif.\n$A$ : $-3$, $-2$, $-4$ et $-1$ sont négatifs, soit $4$ facteurs négatifs. $4$ est pair : $A$ est positif.\n$B$ : trois facteurs négatifs, mais il y a un facteur $0$. Un produit qui contient $0$ vaut $0$ : $B$ n'est ni positif ni négatif.\nVérification : $3 \\times 5 \\times 2 \\times 4 \\times 1 = 120$, et le signe est plus.\n⛔ Le piège : conclure « trois moins, donc $B$ est négatif » sans voir le $0$. Avant de compter les signes, je cherche un facteur nul.\nRéponse : $A$ est positif, $A = 120$ ; $B = 0$.",
          schema: table(["produit", "facteurs négatifs", "signe"], [
            ["A", "4 : pair", "positif"],
            ["B", "3, et un facteur 0", "nul"],
          ]),
          micros: ["relatif_operation_defi", "relatif_multiplication"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je réécris le calcul entier à chaque étape, et je termine par une phrase.",
      rappel: [
        "L'ordre des calculs : d'abord les parenthèses, puis les multiplications et les divisions de gauche à droite, enfin les additions et les soustractions.",
        "Dans une suite d'additions et de soustractions, je transforme tout en additions, puis je regroupe les positifs et les négatifs.",
        "Un trait de fraction est une division, et il agit comme des parenthèses : je calcule le haut, puis le bas, puis je divise.",
      ],
      exercices: [
        {
          enonce: "Calcule $C = (-7) - (-12) + (-4{,}5) - 6$.",
          correction:
            "Je transforme les soustractions en additions de l'opposé : $(-7) + 12 + (-4{,}5) + (-6)$.\nJe regroupe. Les positifs : $12$. Les négatifs : $(-7) + (-4{,}5) + (-6) = -17{,}5$.\nIl reste $12 + (-17{,}5)$ : signes contraires, $17{,}5 - 12 = 5{,}5$, et le négatif l'emporte : $12 + (-17{,}5) = -5{,}5$.\n⛔ Le piège : transformer « $- (-12)$ » en « $-12$ ». Soustraire $-12$, c'est AJOUTER $12$ : seul le nombre qu'on soustrait change de signe.\nRéponse : $C = -5{,}5$.",
          schema: droiteRel(-8, 6, 2, [{ value: -7, label: "−7", color: ROUGE }, { value: -5.5, label: "−5,5" }], [
            { de: -7, vers: 5, label: "+12" },
            { de: 5, vers: 0.5, label: "−4,5" },
            { de: 0.5, vers: -5.5, label: "−6" },
          ]),
          micros: ["relatif_soustraction", "relatif_addition", "relatif_calcul"],
        },
        {
          enonce: "Calcule $D = (-4) \\times (6 - 11) + 3 \\times (-7)$.",
          correction:
            "D'abord la parenthèse : $6 - 11 = -5$.\nJe réécris : $(-4) \\times (-5) + 3 \\times (-7)$.\nPuis les deux multiplications. $(-4) \\times (-5) = 20$ : signes identiques, positif. $3 \\times (-7) = -21$ : signes contraires, négatif.\nEnfin l'addition : $20 + (-21) = -1$.\n⛔ Le piège : faire passer l'addition avant la seconde multiplication, $(20 + 3) \\times (-7) = -161$. Les deux produits se calculent AVANT de les ajouter.\nRéponse : $D = -1$.",
          schema: table(["étape", "calcul"], [
            ["énoncé", "(−4) × (6 − 11) + 3 × (−7)"],
            ["parenthèse", "(−4) × (−5) + 3 × (−7)"],
            ["produits", "20 + (−21)"],
            ["somme", "−1"],
          ]),
          micros: ["relatif_calcul", "relatif_multiplication"],
        },
        {
          enonce: "Calcule $E = (-30) \\div (-6) - 18 \\div (-3) \\times 2$.",
          correction:
            "Pas de parenthèse : je commence par les divisions et la multiplication, de gauche à droite.\n$(-30) \\div (-6) = 5$ : signes identiques, positif.\n$18 \\div (-3) = -6$, puis $(-6) \\times 2 = -12$ : je lis dans l'ordre où c'est écrit.\nIl reste la soustraction : $5 - (-12) = 5 + 12 = 17$.\n⛔ Le piège : faire la multiplication avant la division, $18 \\div ((-3) \\times 2) = 18 \\div (-6) = -3$, et trouver $8$. Multiplications et divisions ont la même priorité : on les fait de gauche à droite.\nRéponse : $E = 17$.",
          schema: table(["étape", "calcul"], [
            ["énoncé", "(−30) ÷ (−6) − 18 ÷ (−3) × 2"],
            ["divisions", "5 − (−6) × 2"],
            ["produit", "5 − (−12)"],
            ["différence", "17"],
          ]),
          micros: ["relatif_calcul", "relatif_division"],
        },
        {
          enonce: "Calcule $F = \\dfrac{(-8) \\times 9 + 12}{(-2) \\times 5}$.",
          correction:
            "Le trait de fraction agit comme des parenthèses : je calcule le haut et le bas séparément.\nEn haut : $(-8) \\times 9 = -72$, puis $-72 + 12 = -60$.\nEn bas : $(-2) \\times 5 = -10$.\nIl reste $\\dfrac{-60}{-10}$ : signes identiques, le quotient est positif, et $60 \\div 10 = 6$.\n⛔ Le piège : simplifier trop tôt, en divisant $-8$ par $-2$ avant d'avoir fini le numérateur. Le $+ 12$ du haut n'est pas divisé, lui : on ne divise qu'un numérateur calculé jusqu'au bout.\nRéponse : $F = 6$.",
          schema: table(["", "calcul", "valeur"], [
            ["en haut", "(−8) × 9 + 12", "−60"],
            ["en bas", "(−2) × 5", "−10"],
            ["quotient", "(−60) ÷ (−10)", "6"],
          ]),
          micros: ["relatif_division", "relatif_calcul"],
        },
        {
          enonce:
            "Le compte d'un club de handball est à $-48$ € le 1er mars : il est « à découvert ». Pendant le mois, les cotisations rapportent $150$ €, l'achat de ballons coûte $96{,}50$ €, un remboursement rapporte $23$ €, et la location du gymnase coûte $75$ €.\na) Écris le calcul du solde au 31 mars avec des nombres relatifs.\nb) Calcule ce solde. Le compte est-il encore à découvert ?",
          correction:
            "a) Ce qui entre est positif, ce qui sort est négatif : $-48 + 150 + (-96{,}5) + 23 + (-75)$.\nb) Je regroupe. Les positifs : $150 + 23 = 173$. Les négatifs : $(-48) + (-96{,}5) + (-75) = -219{,}5$.\n$173 + (-219{,}5) = -46{,}5$ : signes contraires, $219{,}5 - 173 = 46{,}5$, et le négatif l'emporte.\n⭐ Contrôle ligne par ligne : c'est le tableau, dont la dernière case redonne le même solde.\n⛔ Le piège : compter la dépense de $96{,}50$ € comme une rentrée d'argent. Avant de calculer, je donne un signe à chaque ligne.\nRéponse : le solde au 31 mars est de $-46{,}50$ € : le compte est encore à découvert.",
          schema: table(["opération", "montant (€)", "solde (€)"], [
            ["1er mars", "", "−48"],
            ["cotisations", "+150", "102"],
            ["ballons", "−96,50", "5,50"],
            ["remboursement", "+23", "28,50"],
            ["gymnase", "−75", "−46,50"],
          ]),
          micros: ["relatif_probleme", "relatif_addition", "relatif_soustraction"],
        },
        {
          enonce:
            "Une plongeuse part de la surface (altitude $0$ m) et descend de $1{,}5$ m toutes les $10$ secondes.\na) À quelle altitude est-elle au bout de $2$ minutes ?\nb) Elle remonte ensuite jusqu'à $-5$ m, où elle fait une pause de sécurité. De combien de mètres est-elle remontée ?",
          correction:
            "a) En $2$ minutes, il y a $120 \\div 10 = 12$ fois $10$ secondes. Une descente est négative : chaque fois, j'ajoute $-1{,}5$ m.\n$12 \\times (-1{,}5) = -18$ : signes contraires, négatif, et $12 \\times 1{,}5 = 18$.\nRéponse : au bout de $2$ minutes, elle est à $-18$ m.\nb) La remontée, c'est l'arrivée moins le départ : $-5 - (-18) = -5 + 18 = 13$.\nRéponse : elle est remontée de $13$ m.\n⛔ Le piège : écrire $-5 - 18 = -23$. Elle monte : le résultat doit être positif, et $-23$ m serait plus profond que son point de départ.",
          schema: axeVertical(-20, 0, 5, [{ value: -18, label: "2 min : −18", color: ROUGE }, { value: -5, label: "pause : −5" }], [{ de: -18, vers: -5, label: "+13" }]),
          micros: ["relatif_probleme", "relatif_multiplication", "relatif_soustraction"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie par une règle ou par un contre-exemple.\na) La somme de deux nombres négatifs est toujours négative.\nb) Le produit de deux nombres négatifs est négatif.\nc) La différence de deux nombres négatifs est toujours négative.\nd) Multiplier un nombre par $-1$ donne son opposé.",
          correction:
            "a) Vrai. Deux négatifs ont le même signe : j'ajoute les distances à zéro et je garde le signe moins. Exemple : $(-3) + (-8) = -11$.\nb) Faux. Deux signes identiques donnent un produit positif. Contre-exemple : $(-2) \\times (-7) = 14$.\nc) Faux. Contre-exemple : $(-3) - (-8) = (-3) + 8 = 5$, qui est positif. Tout dépend du nombre le plus éloigné de zéro.\nd) Vrai. La distance à zéro ne change pas, le signe s'inverse. Exemples : $(-1) \\times 6{,}4 = -6{,}4$ et $(-1) \\times (-9) = 9$.\n⛔ Le piège : appliquer « moins par moins donne plus » à une addition ou à une soustraction. Cette règle ne vaut que pour la multiplication et la division.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          schema: droiteRel(-4, 6, 2, [{ value: -3, label: "−3", color: ROUGE }, { value: 5, label: "5" }], [{ de: -3, vers: 5, label: "− (−8) = +8" }]),
          micros: ["relatif_operation_defi", "relatif_addition", "relatif_soustraction", "relatif_multiplication"],
        },
        {
          enonce:
            "Voici les températures relevées à 7 h pendant une semaine de janvier, dans une station météo du Jura.\na) Quel est l'écart entre la température la plus haute et la plus basse ?\nb) Calcule la température moyenne de la semaine.",
          figure: tableau(["jour", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."], ["°C", -4, -7, 2, -1, -6, 3, -8], true),
          correction:
            "a) La plus haute est $3$ °C (samedi), la plus basse $-8$ °C (dimanche). L'écart : $3 - (-8) = 3 + 8 = 11$.\nRéponse : l'écart est de $11$ °C.\nb) La moyenne, c'est la somme divisée par le nombre de valeurs.\nLes positifs : $2 + 3 = 5$. Les négatifs : $(-4) + (-7) + (-1) + (-6) + (-8) = -26$.\nLa somme : $5 + (-26) = -21$.\nJe divise par les $7$ jours : $(-21) \\div 7 = -3$.\n⭐ Contrôle : $-3$ est bien entre $-8$ et $3$.\n⛔ Le piège : diviser la somme des distances, $4 + 7 + 2 + 1 + 6 + 3 + 8 = 31$, en oubliant les signes.\nRéponse : la température moyenne est de $-3$ °C.",
          schema: droiteRel(-8, 4, 2, [
            { value: -8, label: "min −8", color: ROUGE },
            { value: -3, label: "moyenne −3", color: VERT },
            { value: 3, label: "max 3" },
          ]),
          micros: ["relatif_probleme", "relatif_calcul", "relatif_division", "relatif_soustraction"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un énoncé à traduire en calculs. Je donne un signe à chaque donnée, et je réponds par une phrase.",
      rappel: [
        "Une hausse, une montée, une rentrée d'argent sont positives ; une baisse, une descente, une dépense sont négatives.",
        "Un écart, une variation : valeur d'arrivée moins valeur de départ.",
        "Je contrôle le résultat : son signe a-t-il un sens dans la situation ?",
      ],
      exercices: [
        {
          titre: "De la mer Morte à l'Everest",
          enonce:
            "Le sommet de l'Everest culmine à $8\\,849$ m. Les rives de la mer Morte sont à environ $-440$ m : c'est le point le plus bas des terres émergées.\na) Quel est le dénivelé entre ces deux points ?\nb) Le niveau de la mer Morte baisse d'environ $1$ m par an. À ce rythme, à quelle altitude seront ses rives dans $25$ ans ?\nc) Une randonneuse part des rives de la mer Morte et monte de $1\\,250$ m. Est-elle au-dessus ou au-dessous du niveau de la mer ?",
          correction:
            "a) Le dénivelé, c'est l'altitude la plus haute moins la plus basse : $8\\,849 - (-440) = 8\\,849 + 440 = 9\\,289$.\nRéponse : le dénivelé est de $9\\,289$ m, plus de $9$ km.\nb) Une baisse est négative : en $25$ ans, $25 \\times (-1) = -25$, puis $-440 + (-25) = -465$.\nRéponse : dans $25$ ans, ses rives seraient vers $-465$ m.\nc) $-440 + 1\\,250 = 810$ : signes contraires, $1\\,250 - 440 = 810$, et le positif l'emporte.\nRéponse : elle est à $810$ m, au-dessus du niveau de la mer.\n⛔ Le piège : au a), calculer $8\\,849 - 440 = 8\\,409$. Les rives sont SOUS la mer : il faut remonter jusqu'à $0$, puis encore $8\\,849$ m.",
          schema: axeVertical(-2000, 10000, 2000, [
            { value: 8849, label: "Everest 8 849" },
            { value: -440, label: "mer Morte −440", color: ROUGE },
          ], [{ de: -440, vers: 8849, label: "+9 289" }]),
          micros: ["relatif_probleme", "relatif_soustraction", "relatif_multiplication", "relatif_addition"],
        },
        {
          titre: "Il fait froid dehors",
          enonce:
            "Dans l'atmosphère « type » utilisée en aviation, il fait $15$ °C au niveau de la mer, et la température baisse de $6{,}5$ °C chaque fois qu'on monte de $1$ km, jusqu'à $11$ km d'altitude.\na) Quelle température fait-il à $3$ km d'altitude ?\nb) Un avion de ligne vole à $11$ km. Quelle température fait-il dehors ?\nc) De combien de degrés la température monte-t-elle quand l'avion descend de $11$ km à $3$ km ?",
          correction:
            "Une baisse est négative : chaque kilomètre de montée ajoute $-6{,}5$ °C.\na) $3 \\times (-6{,}5) = -19{,}5$, puis $15 + (-19{,}5) = -4{,}5$.\nRéponse : à $3$ km, il fait $-4{,}5$ °C.\nb) $11 \\times (-6{,}5) = -71{,}5$, puis $15 + (-71{,}5) = -56{,}5$.\nRéponse : dehors, il fait $-56{,}5$ °C.\nc) L'arrivée moins le départ : $-4{,}5 - (-56{,}5) = -4{,}5 + 56{,}5 = 52$.\nRéponse : la température monte de $52$ °C.\n⭐ Contrôle : l'avion descend de $8$ km, et $8 \\times 6{,}5 = 52$.\n⛔ Le piège : au b), calculer $71{,}5 - 15 = 56{,}5$ et oublier le signe. Quand on retire plus qu'on n'a, on passe sous zéro.",
          schema: table(["altitude", "calcul", "température"], [
            ["0 km", "15", "15 °C"],
            ["3 km", "15 + 3 × (−6,5)", "−4,5 °C"],
            ["11 km", "15 + 11 × (−6,5)", "−56,5 °C"],
          ]),
          micros: ["relatif_probleme", "relatif_multiplication", "relatif_calcul", "relatif_soustraction"],
        },
        {
          titre: "Records de froid et de chaud",
          enonce:
            "Voici des records officiels de température.\nEn France métropolitaine : $-36{,}7$ °C à Mouthe (Doubs) en 1968, et $46$ °C à Vérargues (Hérault) en 2019.\nSur Terre : $-89{,}2$ °C à la station Vostok (Antarctique) en 1983, et $56{,}7$ °C dans la vallée de la Mort (États-Unis) en 1913.\na) Calcule l'écart entre les deux records de France, puis entre les deux records de la Terre.\nb) Calcule la moyenne des deux records de France.\nc) Le record de froid de la Terre est-il plus bas que le double du record de froid de France ?",
          correction:
            "a) Un écart, c'est le plus grand moins le plus petit.\nFrance : $46 - (-36{,}7) = 46 + 36{,}7 = 82{,}7$.\nTerre : $56{,}7 - (-89{,}2) = 56{,}7 + 89{,}2 = 145{,}9$.\nRéponse : $82{,}7$ °C d'écart en France, $145{,}9$ °C sur Terre.\nb) La moyenne de deux nombres : leur somme divisée par $2$. $46 + (-36{,}7) = 9{,}3$, puis $9{,}3 \\div 2 = 4{,}65$.\nRéponse : la moyenne des deux records de France est $4{,}65$ °C.\nc) Le double du record de France : $2 \\times (-36{,}7) = -73{,}4$. Le record de la Terre, $-89{,}2$, est plus loin de zéro, donc plus bas.\nRéponse : oui, $-89{,}2 < -73{,}4$.\n⛔ Le piège : au a), calculer $46 - 36{,}7 = 9{,}3$. C'est la SOMME des deux records, celle du b), pas leur écart : entre $-36{,}7$ et $46$, il faut passer par zéro.",
          schema: axeVertical(-100, 60, 20, [
            { value: -89.2, label: "Antarctique −89,2", color: ROUGE },
            { value: -36.7, label: "Doubs −36,7", color: ROUGE },
            { value: 46, label: "Hérault 46" },
            { value: 56.7, label: "États-Unis 56,7" },
          ], [
            { de: -36.7, vers: 46, label: "82,7" },
            { de: -89.2, vers: 56.7, label: "145,9" },
          ]),
          micros: ["relatif_probleme", "relatif_soustraction", "relatif_division", "relatif_multiplication"],
        },
        {
          titre: "La carte de golf",
          enonce:
            "Au golf, on compte ses coups par rapport au « par », le nombre de coups prévu : sur un parcours de par $72$, une carte de $70$ coups s'écrit $-2$.\nUne golfeuse joue un tournoi en quatre tours sur ce parcours. Ses trois premières cartes : $68$, $71$ et $74$ coups.\na) Écris chacune de ces cartes par rapport au par.\nb) Après trois tours, quel est son score total par rapport au par ?\nc) Elle veut finir le tournoi à $-9$. Quel score doit-elle faire au quatrième tour ? Combien de coups cela représente-t-il ?",
          correction:
            "a) Carte moins par : $68 - 72 = -4$ ; $71 - 72 = -1$ ; $74 - 72 = 2$.\nRéponse : $-4$, $-1$ et $+2$.\nb) $(-4) + (-1) + 2 = -5 + 2 = -3$.\nRéponse : après trois tours, elle est à $-3$.\nc) Je cherche ce qu'il faut ajouter à $-3$ pour obtenir $-9$ : c'est une différence, $-9 - (-3) = -9 + 3 = -6$.\nEn coups : $72 + (-6) = 66$.\nRéponse : elle doit jouer $-6$ au quatrième tour, soit une carte de $66$ coups.\n⭐ Contrôle : $68 + 71 + 74 + 66 = 279$ et $4 \\times 72 = 288$ ; $279 - 288 = -9$.\n⛔ Le piège : calculer $-9 - 3 = -12$ en oubliant que $-3$ est déjà négatif. Soustraire $-3$, c'est ajouter $3$.",
          schema: table(["tour", "coups", "écart au par", "cumul"], [
            ["1", "68", "−4", "−4"],
            ["2", "71", "−1", "−5"],
            ["3", "74", "+2", "−3"],
            ["4", "66", "−6", "−9"],
          ]),
          micros: ["relatif_operation_defi", "relatif_probleme", "relatif_soustraction", "relatif_addition"],
        },
      ],
    },
  ],
};
