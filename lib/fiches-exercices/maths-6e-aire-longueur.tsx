// ─── Fiche d'exercices : les longueurs (6e) — 20 exercices corrigés ─────────────
//
// Lot de 6e du 30/09/2026, sur le modèle des feuilles de 5e voisines
// (`maths-5e-grandeur-conversion.tsx` : règle, tableau de conversion, bande).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-longueurs.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/longueurs.bank.ts`, notionId
// aire_longueur : mesurer à la règle, connaître les unités du mm au km, convertir,
// comparer, résoudre un problème, défis.
// ⛔ LIMITES DE LA 6e (celles de la banque) : longueurs seulement, du mm au km ;
// pas d'aire, pas de périmètre (notions voisines), pas de division par un
// décimal (on multiplie, ou on divise par un entier). Durées : juste « 1 min =
// 60 s », connu depuis le CM.
// ⛔ Aucun exemple de la fiche de cours (le trait de 8 cm, la corde de 2,5 m, le
// ruban de 2 m coupé de 50 cm, 2 m et 30 cm, 4 km, 150 cm, 2 m ou 190 cm, la
// planche de 3 m, 1,5 m ou 140 cm, 70 mm, l'étagère de 80 cm), ni de la banque,
// ni de la feuille de 5e des conversions.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une idée
// par phrase, les mots d'un enfant.
//
// Les pièges nommés : ne compter que les grands traits (1), lire le bout sans
// retirer le départ (2), 1 m = 10 cm (3), se tromper de sens (4), « ajouter un
// zéro » après la virgule (5), comparer des nombres sans leur unité (6, 11),
// choisir l'unité au hasard (7), vérifier le seul sens (8), 5 m 8 cm lu 58 cm
// (9), classer 31 dm devant 315 cm (10), soustraire des m et des cm (12, 18),
// oublier le demi-tour (13), additionner km et m tels quels (14, 17), oublier
// de convertir le mètre en mm (15, 16), croire que 7 × 35 cm font 245 m (19),
// compter un espace par fanion (20).
//
// Aucun fait réel : la plume, la chenille, les rubans, le saut en longueur, la
// pelote, la piste de 400 m, le trajet à vélo, l'escargot (4 mm par seconde),
// la ramette (10 feuilles par mm), la course d'orientation, l'étagère, le bambou
// (35 cm par jour) et la guirlande sont des MODÈLES, à des tailles vraisemblables.
//
// ⭐ LES DESSINS :
//   · `regle` — une règle graduée en millimètres, des objets posés dessus ; un
//     pointillé à chaque bout (le départ compte !) ;
//   · `conversion` — le tableau de conversion : un chiffre par colonne, l'unité
//     de départ en bleu, la virgule orange dans la colonne d'arrivée. Quatre
//     colonnes utiles au plus, rien ne défile à 375 px ;
//   · `bande` — une longueur coupée en morceaux, à l'échelle ;
//   · `plan` — le trajet à vélo, à l'échelle (le SVG de la feuille des aires) ;
//   · `guirlande` — des fanions et leurs espaces, à l'échelle ;
//   · `tableau` de figures.tsx, `table` (plusieurs lignes).
// SVG de viewBox 300, police 14, sans `min-w`. 14 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-aire-longueur.mjs`.
//
// Micro-compétences : aire_longueur_mesurer (1, 2, 7), aire_longueur_unite (3,
// 7, 8), aire_longueur_convertir (4, 5, 8, 9, 13, 14, 15, 16, 17, 18),
// aire_longueur_comparer (6, 10, 11, 14, 17, 19), aire_longueur_probleme (12,
// 13, 14, 17, 18, 19, 20), aire_longueur_defi (15, 16, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb";
const CYAN = "#0e7490";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LE TABLEAU DE CONVERSION (feuille de 5e des conversions). Une colonne par
 * unité, un chiffre par case (une case vide s'écrit ""). La colonne de DÉPART
 * est en bleu ; la virgule orange est posée après la colonne d'ARRIVÉE.
 * ⭐ Le script relit les chiffres et vérifie que les deux lectures désignent la
 * même longueur. ⛔ Quatre colonnes : rien ne défile à 375 px.
 */
type LigneConversion = { cases: string[]; de: string; vers: string };
const conversion = (unites: string[], lignes: LigneConversion[]) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <table className="mx-auto border-collapse text-sm">
      <thead>
        <tr>
          {unites.map((u) => (
            <th key={u} className="border border-slate-400 bg-slate-100 px-1.5 py-1 font-semibold text-slate-800">
              {u}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((li, i) => (
          <tr key={i}>
            {li.cases.map((c, j) => (
              <td key={j} className={`border border-slate-400 px-1.5 py-1 text-center font-mono text-slate-900 ${unites[j] === li.de ? "bg-blue-100" : ""}`}>
                <span>{c || " "}</span>
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

/**
 * UNE BANDE À L'ÉCHELLE : une longueur coupée en morceaux. Chaque morceau a sa
 * longueur VRAIE (`valeur`) et son étiquette, écrite dedans si elle y tient,
 * dessous sinon. Le total en haut ; des repères (`bornes`, un par frontière,
 * "" pour rien) au-dessus des bouts.
 */
const bande = (total: string, morceaux: { valeur: number; label: string; couleur?: string }[], bornes: string[] = []) => {
  const x0 = 12;
  const larg = 276;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  const u = larg / somme;
  const avecBornes = bornes.some((b) => b !== "");
  const yB = avecBornes ? 48 : 28;
  const debuts = morceaux.map((_, i) => x0 + morceaux.slice(0, i).reduce((s, m) => s + m.valeur, 0) * u);
  const dessous = morceaux.some((m) => m.label.length * 8.8 > m.valeur * u - 6);
  const H = yB + 34 + (dessous ? 26 : 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Une bande de ${total} : ${morceaux.map((m) => m.label).join(", ")}.`}>
        <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`total : ${total}`}
        </text>
        {morceaux.map((m, i) => {
          const w = m.valeur * u;
          const cx = debuts[i] + w / 2;
          const dedans = m.label.length * 8.8 <= w - 6;
          const demi = (m.label.length * 8.8) / 2;
          const cxBas = Math.min(Math.max(cx, x0 + demi), x0 + larg - demi);
          const couleur = m.couleur ?? (i % 2 === 0 ? BLEU : CYAN);
          return (
            <g key={i}>
              <rect x={debuts[i]} y={yB} width={w} height={32} fill={couleur} stroke="#fff" strokeWidth={1.5} />
              {dedans ? (
                <text x={cx} y={yB + 21} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                  {m.label}
                </text>
              ) : (
                <g>
                  <line x1={cx} y1={yB + 32} x2={cxBas} y2={yB + 40} stroke={couleur} strokeWidth={1.2} />
                  <text x={cxBas} y={yB + 54} textAnchor="middle" fontSize={14} fontWeight={700} fill={couleur}>
                    {m.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <rect x={x0} y={yB} width={larg} height={32} fill="none" stroke={NOIR} strokeWidth={1.5} />
        {bornes.map((b, i) =>
          b ? (
            <g key={`b${i}`}>
              <line x1={i === morceaux.length ? x0 + larg : debuts[i]} y1={yB - 6} x2={i === morceaux.length ? x0 + larg : debuts[i]} y2={yB} stroke={NOIR} strokeWidth={2} />
              <text
                x={i === morceaux.length ? x0 + larg : debuts[i]}
                y={yB - 10}
                textAnchor={i === 0 ? "start" : i === morceaux.length ? "end" : "middle"}
                fontSize={14}
                fontWeight={700}
                fill={ORANGE}
              >
                {b}
              </text>
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
};

/**
 * UNE RÈGLE GRADUÉE de 0 à `max` cm, une graduation par millimètre (plus longue
 * au demi-centimètre et au centimètre), un nombre par centimètre. Les objets
 * sont posés au-dessus, chacun sur sa ligne, de `de` à `a` (en cm). Un
 * pointillé descend de CHAQUE bout : quand l'objet ne part pas du zéro, on voit
 * où il commence.
 * ⛔ `max` ≤ 10 : onze nombres au plus, lisibles à 375 px.
 */
const regle = (max: number, objets: { de: number; a: number; label: string }[]) => {
  const x0 = 16;
  const u = 268 / max;
  const x = (v: number) => x0 + v * u;
  const yR = 26 + 28 * objets.length;
  const H = yR + 42;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Une règle graduée de 0 à ${max} cm, avec ${objets.map((o) => o.label).join(" et ")}.`}>
        <rect x={x0 - 10} y={yR} width={268 + 20} height={36} rx={3} fill="#fef9c3" stroke="#a16207" strokeWidth={1.2} />
        {Array.from({ length: max * 10 + 1 }, (_, k) => (
          <line key={k} x1={x(k / 10)} y1={yR} x2={x(k / 10)} y2={yR + (k % 10 === 0 ? 14 : k % 5 === 0 ? 10 : 6)} stroke={NOIR} strokeWidth={k % 10 === 0 ? 1.4 : 0.8} />
        ))}
        {Array.from({ length: max + 1 }, (_, k) => (
          <text key={`n${k}`} x={x(k)} y={yR + 30} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
            {k}
          </text>
        ))}
        {objets.map((o, i) => {
          const y = yR - 18 - 28 * i;
          const c = i === 0 ? ORANGE : BLEU;
          return (
            <g key={`o${i}`}>
              <rect x={x(o.de)} y={y} width={(o.a - o.de) * u} height={12} rx={3} fill={c} />
              {o.de > 0 ? <line x1={x(o.de)} y1={y + 12} x2={x(o.de)} y2={yR} stroke={c} strokeWidth={1} strokeDasharray="2 2" /> : null}
              <line x1={x(o.a)} y1={y + 12} x2={x(o.a)} y2={yR} stroke={c} strokeWidth={1} strokeDasharray="2 2" />
              <text x={x((o.de + o.a) / 2)} y={y - 4} textAnchor="middle" fontSize={14} fontWeight={700} fill={c}>
                {o.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * LA GUIRLANDE : `n` fanions de largeur `fanion`, séparés par des espaces de
 * largeur `espace`, À L'ÉCHELLE. On y compte les espaces : un de moins que les
 * fanions.
 */
const guirlande = (n: number, fanion: number, espace: number) => {
  const x0 = 12;
  const u = 276 / (n * fanion + (n - 1) * espace);
  const w = fanion * u;
  const g = espace * u;
  const yC = 44;
  const h = w * 0.8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${yC + h + 32}`} className="block h-auto w-full" role="img" aria-label={`${n} fanions de ${fanion} cm, séparés par ${n - 1} espaces de ${espace} cm.`}>
        <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`${n} fanions, ${n - 1} espaces`}
        </text>
        <line x1={x0} y1={yC} x2={x0 + 276} y2={yC} stroke={NOIR} strokeWidth={1.5} />
        {Array.from({ length: n }, (_, i) => {
          const xa = x0 + i * (w + g);
          return (
            <g key={i}>
              <polygon points={`${xa},${yC} ${xa + w},${yC} ${xa + w / 2},${yC + h}`} fill={i % 2 === 0 ? BLEU : ORANGE} fillOpacity={0.8} stroke={NOIR} strokeWidth={1} />
              <text x={xa + w / 2} y={yC + 16} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x={x0 + w + g / 2} y={yC - 10} textAnchor="middle" fontSize={14} fontWeight={700} fill="#dc2626">
          {`${espace} cm`}
        </text>
        <text x={x0 + w / 2} y={yC + h + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`${fanion} cm`}
        </text>
      </svg>
    </div>
  );
};

/* ── Le plan à l'échelle (SVG de la feuille des aires de 5e) ────────────────
 * Vraies coordonnées, y vers le haut ; le script relit chaque cote à l'échelle.
 * Police 14, viewBox d'environ 300 de large, aucun `min-w`. */
type Pt = [number, number];
type Forme =
  | { trait: [Pt, Pt] }
  | { cote: [Pt, Pt]; label: string; sens?: 1 | -1 }
  | { point: Pt; label: string };
const TAILLE = 14;

const plan = (unite: "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("trait" in f) geo.push(...f.trait);
    else if ("cote" in f) geo.push(...f.cote);
    else geo.push(f.point);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(170 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]: Pt): Pt => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];
  const C: Pt = [((x1 - x0) * s) / 2, ((y1 - y0) * s) / 2];
  type Etiquette = { x: number; y: number; t: string; ancre: "start" | "middle" | "end" };
  const etiquettes: Etiquette[] = [];
  const ancre = (nx: number) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M: Pt, n: Pt, t: string) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    etiquettes.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, ancre: a });
  };
  const traits: ReactNode[] = [];
  formes.forEach((f, i) => {
    if ("trait" in f) {
      const [a, b] = f.trait.map(P);
      traits.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BLEU} strokeWidth={3} strokeLinecap="round" />);
    } else if ("cote" in f) {
      const [a, b] = f.cote.map(P);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const M: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n: Pt = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (f.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, f.label);
    } else {
      const p = P(f.point);
      traits.push(<circle key={i} cx={p[0]} cy={p[1]} r={4} fill={NOIR} />);
      const L = Math.hypot(p[0] - C[0], p[1] - C[1]);
      poser(p, L < 1 ? [0, -1] : [(p[0] - C[0]) / L, (p[1] - C[1]) / L], f.label);
    }
  });
  let [bx0, by0, bx1, by1] = [0, 0, (x1 - x0) * s, (y1 - y0) * s];
  for (const e of etiquettes) {
    const L = e.t.length * TAILLE * 0.56;
    const g = e.ancre === "start" ? e.x : e.ancre === "end" ? e.x - L : e.x - L / 2;
    bx0 = Math.min(bx0, g);
    bx1 = Math.max(bx1, g + L);
    by0 = Math.min(by0, e.y - TAILLE * 0.6);
    by1 = Math.max(by1, e.y + TAILLE * 0.6);
  }
  const pad = 6;
  const vb = [bx0 - pad, by0 - pad, bx1 - bx0 + 2 * pad, by1 - by0 + 2 * pad].map((v) => +v.toFixed(1));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full" role="img" aria-label={`Plan en ${unite} : ${etiquettes.map((e) => e.t).join(", ")}`}>
        {traits}
        {etiquettes.map((e, i) => (
          <text key={`t${i}`} x={+e.x.toFixed(1)} y={+e.y.toFixed(1)} textAnchor={e.ancre} dominantBaseline="middle" fontSize={TAILLE} fontWeight={700} fill={NOIR} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {e.t}
          </text>
        ))}
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

export const exercicesAireLongueur6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du geste seul au problème : mesurer à la règle, connaître les unités du mm au km, convertir, comparer, calculer un reste ou un total. Une plume, une chenille, un saut en longueur, une pelote de laine, une piste d'athlétisme, un trajet à vélo, un escargot, une ramette de papier, une course d'orientation, un bambou, une guirlande. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/aire-longueur", titre: "Les longueurs" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire par question. Je regarde bien les unités.",
      rappel: [
        "Sur la règle, entre deux nombres, il y a 10 petits traits. Chaque petit trait vaut 1 mm.",
        "Les unités, de la plus grande à la plus petite : km, hm, dam, m, dm, cm, mm.",
        "Chaque unité vaut 10 fois celle qui est juste à sa droite.",
        "Vers une unité plus petite, le nombre grandit : je multiplie.",
      ],
      exercices: [
        {
          enonce: "Une plume et un trombone sont posés sur la règle. Ils partent du zéro.\na) Combien mesure chacun, en cm ?\nb) Écris ces deux longueurs en mm.",
          figure: regle(8, [
            { de: 0, a: 6.7, label: "plume" },
            { de: 0, a: 3.2, label: "trombone" },
          ]),
          correction:
            "Entre deux nombres de la règle, il y a $10$ petits traits.\nChaque petit trait vaut $1$ mm, soit $0{,}1$ cm.\na) La plume s'arrête $7$ petits traits après le $6$ : elle mesure $6{,}7$ cm.\nLe trombone s'arrête $2$ petits traits après le $3$ : il mesure $3{,}2$ cm.\nb) $1$ cm $= 10$ mm. Je multiplie par $10$.\n$6{,}7 \\times 10 = 67$ mm et $3{,}2 \\times 10 = 32$ mm.\n⛔ Le piège : regarder seulement les grands traits. Les petits traits se comptent aussi.\nRéponse : a) $6{,}7$ cm et $3{,}2$ cm ; b) $67$ mm et $32$ mm.",
          micros: ["aire_longueur_mesurer"],
        },
        {
          enonce: "Une chenille est posée sur la règle. Elle ne part pas du zéro.\nCombien mesure-t-elle, en cm puis en mm ?",
          figure: regle(8, [{ de: 2, a: 6.5, label: "chenille" }]),
          correction:
            "La chenille commence au $2$.\nElle finit $5$ petits traits après le $6$, donc à $6{,}5$.\nSa longueur, c'est l'écart entre les deux bouts.\n$6{,}5 - 2 = 4{,}5$ cm.\nEn mm : $4{,}5 \\times 10 = 45$ mm.\n⛔ Le piège : lire seulement le bout, et répondre $6{,}5$ cm. La chenille ne part pas du zéro.\nRéponse : la chenille mesure $4{,}5$ cm, soit $45$ mm.",
          micros: ["aire_longueur_mesurer"],
        },
        {
          enonce: "Complète.\na) $1$ m = … cm\nb) $1$ km = … m\nc) $1$ cm = … mm\nd) $1$ m = … mm\ne) $1$ dm = … cm",
          correction:
            "Dans le tableau, chaque colonne vaut $10$ fois sa voisine de droite.\na) Du m au cm, j'avance de deux colonnes. $1$ m $= 100$ cm.\nb) Du km au m, j'avance de trois colonnes. $1$ km $= 1\\,000$ m.\nc) $1$ cm $= 10$ mm.\nd) Du m au mm, trois colonnes. $1$ m $= 1\\,000$ mm.\ne) $1$ dm $= 10$ cm.\n⛔ Le piège du a) : écrire $10$ cm. $10$ cm, c'est seulement $1$ dm.\nRéponse : a) $100$ ; b) $1\\,000$ ; c) $10$ ; d) $1\\,000$ ; e) $10$.",
          schema: (
            <div className="space-y-3">
              {conversion(["m", "dm", "cm", "mm"], [
                { cases: ["1", "0", "0", ""], de: "m", vers: "cm" },
                { cases: ["1", "0", "0", "0"], de: "m", vers: "mm" },
              ])}
              {ecranSeulement(conversion(["km", "hm", "dam", "m"], [{ cases: ["1", "0", "0", "0"], de: "km", vers: "m" }]))}
            </div>
          ),
          micros: ["aire_longueur_unite"],
        },
        {
          enonce: "Convertis.\na) $6$ m en cm\nb) $45$ mm en cm\nc) $3{,}2$ km en m\nd) $900$ cm en m",
          correction:
            "Je regarde d'abord le sens.\nVers une unité plus petite, je multiplie. Vers une unité plus grande, je divise.\na) $1$ m $= 100$ cm. $6 \\times 100 = 600$ cm.\nb) $10$ mm font $1$ cm. $45 \\div 10 = 4{,}5$ cm.\nc) $1$ km $= 1\\,000$ m. $3{,}2 \\times 1\\,000 = 3\\,200$ m.\nd) $100$ cm font $1$ m. $900 \\div 100 = 9$ m.\n⛔ Le piège : se tromper de sens. $900$ cm ne peuvent pas faire $90\\,000$ m !\nRéponse : a) $600$ cm ; b) $4{,}5$ cm ; c) $3\\,200$ m ; d) $9$ m.",
          schema: ecranSeulement(
            <div className="space-y-3">
              {conversion(["m", "dm", "cm", "mm"], [
                { cases: ["6", "0", "0", ""], de: "m", vers: "cm" },
                { cases: ["", "", "4", "5"], de: "mm", vers: "cm" },
                { cases: ["9", "0", "0", ""], de: "cm", vers: "m" },
              ])}
              {conversion(["km", "hm", "dam", "m"], [{ cases: ["3", "2", "0", "0"], de: "km", vers: "m" }])}
            </div>,
          ),
          micros: ["aire_longueur_convertir"],
        },
        {
          enonce: "Convertis.\na) $1{,}8$ m en cm\nb) $2\\,450$ m en km\nc) $36$ dm en m\nd) $0{,}6$ cm en mm",
          correction:
            "a) $1$ m $= 100$ cm. $1{,}8 \\times 100 = 180$ cm.\nb) $1\\,000$ m font $1$ km. $2\\,450 \\div 1\\,000 = 2{,}45$ km.\nc) $10$ dm font $1$ m. $36 \\div 10 = 3{,}6$ m.\nd) $1$ cm $= 10$ mm. $0{,}6 \\times 10 = 6$ mm.\n⛔ Le piège du a) : « ajouter deux zéros » et écrire $1{,}800$. Ce nombre vaut toujours $1{,}8$.\nDans le tableau, c'est la virgule qui se déplace.\nRéponse : a) $180$ cm ; b) $2{,}45$ km ; c) $3{,}6$ m ; d) $6$ mm.",
          schema: (
            <div className="space-y-3">
              {conversion(["m", "dm", "cm", "mm"], [
                { cases: ["1", "8", "0", ""], de: "m", vers: "cm" },
                { cases: ["3", "6", "", ""], de: "dm", vers: "m" },
                { cases: ["", "", "0", "6"], de: "cm", vers: "mm" },
              ])}
              {ecranSeulement(conversion(["km", "hm", "dam", "m"], [{ cases: ["2", "4", "5", "0"], de: "m", vers: "km" }]))}
            </div>
          ),
          micros: ["aire_longueur_convertir"],
        },
        {
          enonce: "Voici quatre rubans : $1{,}2$ m ; $95$ cm ; $130$ cm ; $1$ m.\nRange-les du plus court au plus long.",
          correction:
            "Je mets tout dans la même unité : le cm.\n$1{,}2$ m $= 120$ cm et $1$ m $= 100$ cm.\nJe compare les nombres : $95 < 100 < 120 < 130$.\n⛔ Le piège : croire que $1{,}2$ est le plus petit, car $1{,}2 < 95$. Les unités ne sont pas les mêmes !\nRéponse : $95$ cm, puis $1$ m, puis $1{,}2$ m, puis $130$ cm.",
          schema: tableau(["Ruban", "1,2 m", "95 cm", "130 cm", "1 m"], ["en cm", "120", "95", "130", "100"], true),
          micros: ["aire_longueur_comparer"],
        },
        {
          enonce: "Choisis la bonne unité : mm, cm, m ou km.\na) Un terrain de football mesure environ $100$ …\nb) Un téléphone a une épaisseur d'environ $8$ …\nc) Deux villes voisines sont à environ $25$ …\nd) Une baguette de pain mesure environ $60$ …\ne) Une girafe mesure environ $5$ …",
          correction:
            "J'essaie chaque unité dans ma tête. Je garde celle qui colle à l'objet.\na) $100$ cm, c'est la hauteur d'une table. Un terrain, c'est $100$ m.\nb) $8$ cm, c'est trop épais. Un téléphone fait $8$ mm.\nc) $25$ m, c'est une piscine. Deux villes sont à $25$ km.\nd) $60$ m, c'est un immeuble couché ! Une baguette fait $60$ cm.\ne) Une girafe mesure $5$ m.\n⛔ Le piège : répondre au hasard. Un nombre sans la bonne unité ne veut rien dire.\nRéponse : a) m ; b) mm ; c) km ; d) cm ; e) m.",
          schema: ecranSeulement(
            table(["Repère", "environ"], [
              ["la largeur d'un doigt", "1 cm"],
              ["la hauteur d'une porte", "2 m"],
              ["un quart d'heure à pied", "1 km"],
            ]),
          ),
          micros: ["aire_longueur_unite", "aire_longueur_mesurer"],
        },
        {
          enonce: "Vrai ou faux ? Corrige les égalités fausses.\na) $4$ m $= 40$ cm\nb) $5\\,000$ m $= 5$ km\nc) $3$ cm $= 30$ mm\nd) $60$ cm $= 6$ m",
          correction:
            "Je compare avec ce que je connais bien.\na) $1$ m, c'est déjà $100$ cm. Donc $4$ m, c'est $400$ cm : FAUX.\nb) $5 \\times 1\\,000 = 5\\,000$ : VRAI.\nc) $3 \\times 10 = 30$ : VRAI.\nd) $60$ cm, c'est moins qu'un mètre. Ça ne peut pas faire $6$ m : FAUX.\n$60 \\div 100 = 0{,}6$ m.\n⛔ Le piège : vérifier seulement si le nombre grandit. Au a), $40$ est plus grand que $4$, et pourtant c'est faux.\nRéponse : a) faux, $400$ cm ; b) vrai ; c) vrai ; d) faux, $0{,}6$ m.",
          schema: conversion(["m", "dm", "cm", "mm"], [
            { cases: ["4", "0", "0", ""], de: "m", vers: "cm" },
            { cases: ["0", "6", "0", ""], de: "cm", vers: "m" },
          ]),
          micros: ["aire_longueur_unite", "aire_longueur_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions. Je mets tout dans la même unité avant de calculer.",
      rappel: [
        "On compare ou on additionne seulement des longueurs dans la MÊME unité.",
        "Je choisis une unité, je convertis, puis je calcule.",
        "À la fin, je relis : la réponse est-elle possible ?",
      ],
      exercices: [
        {
          enonce: "Écris chaque longueur dans l'unité demandée.\na) $2$ km $350$ m, en m\nb) $5$ m $8$ cm, en cm\nc) $1$ m $5$ mm, en mm",
          correction:
            "Je convertis la grande unité, puis j'ajoute le reste.\na) $2$ km $= 2\\,000$ m. Puis $2\\,000 + 350 = 2\\,350$ m.\nb) $5$ m $= 500$ cm. Puis $500 + 8 = 508$ cm.\nc) $1$ m $= 1\\,000$ mm. Puis $1\\,000 + 5 = 1\\,005$ mm.\n⛔ Le piège du b) : écrire $58$ cm. Le $8$ va dans la colonne des cm, pas dans celle des dm.\nRéponse : a) $2\\,350$ m ; b) $508$ cm ; c) $1\\,005$ mm.",
          schema: conversion(["m", "dm", "cm", "mm"], [
            { cases: ["5", "0", "8", ""], de: "m", vers: "cm" },
            { cases: ["1", "0", "0", "5"], de: "m", vers: "mm" },
          ]),
          micros: ["aire_longueur_convertir"],
        },
        {
          enonce: "Au saut en longueur, trois élèves ont sauté.\nLéa : $3{,}15$ m. Tom : $298$ cm. Inès : $31$ dm.\na) Range les sauts du plus long au plus court.\nb) Quel écart y a-t-il entre le premier et le dernier, en cm ?",
          correction:
            "a) Je mets tout en cm.\nLéa : $3{,}15$ m $= 315$ cm.\nInès : $31$ dm $= 310$ cm.\nTom : $298$ cm.\n$315 > 310 > 298$. Léa est première, puis Inès, puis Tom.\nb) $315 - 298 = 17$ cm.\n⛔ Le piège : croire que $31$ dm est le plus long, car $31$ est un grand nombre. Il faut d'abord convertir.\nRéponse : a) Léa, Inès, Tom ; b) $17$ cm.",
          schema: ecranSeulement(
            table(["Élève", "saut", "en cm"], [
              ["Léa", "3,15 m", "315"],
              ["Inès", "31 dm", "310"],
              ["Tom", "298 cm", "298"],
            ]),
          ),
          micros: ["aire_longueur_comparer"],
        },
        {
          enonce: "Dans chaque paire, quelle longueur est la plus grande ?\na) $2{,}5$ km ou $2\\,400$ m ?\nb) $45$ mm ou $5$ cm ?\nc) $7$ dm ou $68$ cm ?\nd) $0{,}9$ m ou $1\\,000$ mm ?",
          correction:
            "Pour chaque paire, je mets les deux longueurs dans la même unité.\na) $2{,}5$ km $= 2\\,500$ m. Et $2\\,500 > 2\\,400$.\nb) $5$ cm $= 50$ mm. Et $50 > 45$.\nc) $7$ dm $= 70$ cm. Et $70 > 68$.\nd) $1\\,000$ mm $= 1$ m. Et $1 > 0{,}9$.\n⛔ Le piège du d) : croire que $0{,}9$ m est plus petit parce qu'il a une virgule. Il faut comparer dans la même unité.\nRéponse : a) $2{,}5$ km ; b) $5$ cm ; c) $7$ dm ; d) $1\\,000$ mm.",
          schema: ecranSeulement(
            table(["Paire", "dans la même unité"], [
              ["a", "2 500 m et 2 400 m"],
              ["b", "45 mm et 50 mm"],
              ["c", "70 cm et 68 cm"],
              ["d", "0,9 m et 1 m"],
            ]),
          ),
          micros: ["aire_longueur_comparer"],
        },
        {
          enonce: "Mia a une pelote de laine de $12$ m.\nElle tricote une écharpe avec $850$ cm de laine.\na) Quelle longueur de laine reste-t-il, en cm puis en m ?\nb) Un bonnet demande $4$ m de laine. Peut-elle le tricoter ?",
          correction:
            "a) Je mets tout en cm : $12$ m $= 1\\,200$ cm.\nIl reste $1\\,200 - 850 = 350$ cm.\nEn m : $350 \\div 100 = 3{,}5$ m.\nb) $3{,}5$ m, c'est moins que $4$ m.\nIl manque $4 - 3{,}5 = 0{,}5$ m, soit $50$ cm.\n⛔ Le piège : calculer $12 - 850$. On ne soustrait pas des cm à des m.\nRéponse : a) $350$ cm, soit $3{,}5$ m ; b) non, il manque $50$ cm.",
          schema: bande("12 m = 1 200 cm", [
            { valeur: 850, label: "écharpe : 850 cm" },
            { valeur: 350, label: "reste : 350 cm", couleur: ORANGE },
          ]),
          micros: ["aire_longueur_probleme"],
        },
        {
          enonce: "Une piste d'athlétisme mesure $400$ m.\nNour fait $6$ tours et demi.\nQuelle distance parcourt-il, en m puis en km ?",
          correction:
            "Six tours : $6 \\times 400 = 2\\,400$ m.\nUn demi-tour, c'est la moitié de $400$ m : $200$ m.\nEn tout : $2\\,400 + 200 = 2\\,600$ m.\nEn km : $2\\,600 \\div 1\\,000 = 2{,}6$ km.\n⛔ Le piège : oublier le demi-tour, et répondre $2\\,400$ m.\nRéponse : Nour parcourt $2\\,600$ m, soit $2{,}6$ km.",
          schema: bande("2 600 m = 2,6 km", [
            { valeur: 400, label: "400" },
            { valeur: 400, label: "400" },
            { valeur: 400, label: "400" },
            { valeur: 400, label: "400" },
            { valeur: 400, label: "400" },
            { valeur: 400, label: "400" },
            { valeur: 200, label: "200", couleur: ORANGE },
          ]),
          micros: ["aire_longueur_probleme", "aire_longueur_convertir"],
        },
        {
          enonce: "Sami fait un tour à vélo. Il va de la maison à l'école, puis à la piscine, puis il rentre.\nMaison → école : $1{,}2$ km. École → piscine : $850$ m. Piscine → maison : $1$ km $50$ m.\na) Quelle distance fait-il en tout, en m puis en km ?\nb) De la maison à l'école, il peut aussi passer par la piscine. Combien de mètres en plus ?",
          figure: plan("m", [
            { trait: [[0, 0], [1200, 0]] },
            { trait: [[1200, 0], [758.333, 726.244]] },
            { trait: [[758.333, 726.244], [0, 0]] },
            { cote: [[0, 0], [1200, 0]], label: "1,2 km" },
            { cote: [[1200, 0], [758.333, 726.244]], label: "850 m" },
            { cote: [[758.333, 726.244], [0, 0]], label: "1 km 50 m" },
            { point: [0, 0], label: "maison" },
            { point: [1200, 0], label: "école" },
            { point: [758.333, 726.244], label: "piscine" },
          ]),
          correction:
            "a) Je mets tout en m.\n$1{,}2$ km $= 1\\,200$ m et $1$ km $50$ m $= 1\\,050$ m.\n$1\\,200 + 850 + 1\\,050 = 3\\,100$ m.\nEn km : $3\\,100 \\div 1\\,000 = 3{,}1$ km.\nb) Par la piscine : $1\\,050 + 850 = 1\\,900$ m.\nTout droit : $1\\,200$ m.\n$1\\,900 - 1\\,200 = 700$ m de plus.\n⛔ Le piège : additionner $1{,}2 + 850 + 1$. On mélangerait des km et des m.\nRéponse : a) $3\\,100$ m, soit $3{,}1$ km ; b) $700$ m de plus.",
          micros: ["aire_longueur_probleme", "aire_longueur_convertir", "aire_longueur_comparer"],
        },
        {
          enonce: "Un escargot avance de $4$ mm chaque seconde. C'est un modèle.\na) Quelle distance fait-il en $10$ secondes ? Réponds en cm.\nb) Et en $1$ minute ?\nc) Combien de secondes lui faut-il pour faire $1$ m ?",
          correction:
            "a) $10 \\times 4 = 40$ mm. Et $40$ mm $= 4$ cm.\nb) $1$ minute, c'est $60$ secondes.\n$60 \\times 4 = 240$ mm, soit $24$ cm.\nc) Je mets le mètre en mm : $1$ m $= 1\\,000$ mm.\nIl fait $4$ mm par seconde : $1\\,000 \\div 4 = 250$ secondes.\n⛔ Le piège du c) : calculer $1 \\div 4$. Le mètre et le millimètre ne se mélangent pas.\nRéponse : a) $4$ cm ; b) $24$ cm ; c) $250$ secondes.",
          schema: ecranSeulement(
            table(["Temps", "Distance"], [
              ["1 s", "4 mm"],
              ["10 s", "40 mm = 4 cm"],
              ["60 s", "240 mm = 24 cm"],
              ["250 s", "1 000 mm = 1 m"],
            ]),
          ),
          micros: ["aire_longueur_defi", "aire_longueur_convertir"],
        },
        {
          enonce: "Dans un paquet de papier, $10$ feuilles font $1$ mm d'épaisseur. C'est un modèle.\na) Une ramette a $500$ feuilles. Quelle est son épaisseur, en mm puis en cm ?\nb) Combien de feuilles faut-il pour une pile de $1$ m ?",
          correction:
            "a) $10$ feuilles font $1$ mm.\n$500 \\div 10 = 50$ : la ramette fait $50$ mm.\nEn cm : $50 \\div 10 = 5$ cm.\nb) Je mets le mètre en mm : $1$ m $= 1\\,000$ mm.\nChaque mm contient $10$ feuilles : $1\\,000 \\times 10 = 10\\,000$ feuilles.\n⛔ Le piège : répondre $10$ feuilles pour $1$ m. Il faut d'abord convertir le mètre en mm.\nRéponse : a) $50$ mm, soit $5$ cm ; b) $10\\,000$ feuilles.",
          schema: conversion(["m", "dm", "cm", "mm"], [
            { cases: ["", "", "5", "0"], de: "mm", vers: "cm" },
            { cases: ["1", "0", "0", "0"], de: "m", vers: "mm" },
          ]),
          micros: ["aire_longueur_defi", "aire_longueur_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je choisis mon unité, je convertis, puis je réponds par une phrase.",
      rappel: [
        "Je repère toutes les unités de l'énoncé.",
        "Je mets tout dans la même unité, puis je calcule.",
        "Je relis ma réponse avec son unité.",
      ],
      exercices: [
        {
          titre: "La course d'orientation",
          enonce:
            "Une course d'orientation a quatre étapes.\nDépart → B1 : $450$ m. B1 → B2 : $0{,}7$ km. B2 → B3 : $1$ km $200$ m. B3 → arrivée : $650$ m.\na) Quelle est la longueur de la course, en m puis en km ?\nb) Zoé est arrivée à B2. Quelle distance lui reste-t-il ?\nc) Quelle étape est la plus longue ?",
          correction:
            "a) Je mets tout en m.\n$0{,}7$ km $= 700$ m et $1$ km $200$ m $= 1\\,200$ m.\n$450 + 700 + 1\\,200 + 650 = 3\\,000$ m.\nEn km : $3\\,000 \\div 1\\,000 = 3$ km.\nb) Jusqu'à B2, Zoé a fait $450 + 700 = 1\\,150$ m.\nIl lui reste $3\\,000 - 1\\,150 = 1\\,850$ m.\nc) L'étape de B2 à B3, avec $1\\,200$ m.\n⛔ Le piège : additionner $450 + 0{,}7$. Des m et des km ne s'ajoutent pas tels quels.\nRéponse : a) $3\\,000$ m, soit $3$ km ; b) $1\\,850$ m ; c) de B2 à B3.",
          schema: bande("3 000 m = 3 km", [
            { valeur: 450, label: "450 m" },
            { valeur: 700, label: "700 m" },
            { valeur: 1200, label: "1 200 m" },
            { valeur: 650, label: "650 m" },
          ], ["départ", "", "B2", "", "arrivée"]),
          micros: ["aire_longueur_probleme", "aire_longueur_convertir", "aire_longueur_comparer"],
        },
        {
          titre: "L'étagère",
          enonce:
            "Tom a une étagère de $1{,}2$ m de long.\nIl y range d'abord $8$ BD. Chaque BD fait $15$ mm d'épaisseur.\nPuis il ajoute des livres de $3$ cm d'épaisseur.\na) Quelle place prennent les BD, en mm puis en cm ?\nb) Quelle place reste-t-il pour les livres, en cm ?\nc) Combien de livres peut-il ranger ?",
          correction:
            "a) $8 \\times 15 = 120$ mm.\nEn cm : $120 \\div 10 = 12$ cm.\nb) L'étagère en cm : $1{,}2$ m $= 120$ cm.\nIl reste $120 - 12 = 108$ cm.\nc) Chaque livre fait $3$ cm : $108 \\div 3 = 36$ livres.\n⛔ Le piège : calculer $1{,}2 - 120$. Je convertis avant de soustraire.\nRéponse : a) $120$ mm, soit $12$ cm ; b) $108$ cm ; c) $36$ livres.",
          schema: bande("1,2 m = 120 cm", [
            { valeur: 12, label: "8 BD : 12 cm", couleur: ORANGE },
            { valeur: 108, label: "36 livres : 108 cm" },
          ]),
          micros: ["aire_longueur_probleme", "aire_longueur_convertir"],
        },
        {
          titre: "Le bambou",
          enonce:
            "Un bambou mesure $1{,}8$ m. Il pousse de $35$ cm chaque jour. C'est un modèle.\na) De combien pousse-t-il en $7$ jours, en cm puis en m ?\nb) Quelle est sa hauteur au bout de $7$ jours ?\nc) Au bout de combien de jours dépasse-t-il $5$ m ?",
          correction:
            "a) $7 \\times 35 = 245$ cm.\nEn m : $245 \\div 100 = 2{,}45$ m.\nb) Je mets tout en cm : $1{,}8$ m $= 180$ cm.\n$180 + 245 = 425$ cm, soit $4{,}25$ m.\nc) Il doit encore grandir de $500 - 180 = 320$ cm.\n$9 \\times 35 = 315$ : au bout de $9$ jours, il manque encore $5$ cm.\n$10 \\times 35 = 350$ : au bout de $10$ jours, il dépasse $5$ m.\n⛔ Le piège : lire $245$ m. Le bambou grandit de $245$ cm, pas de $245$ m !\nRéponse : a) $245$ cm, soit $2{,}45$ m ; b) $4{,}25$ m ; c) au bout de $10$ jours.",
          schema: ecranSeulement(
            bande("4,25 m = 425 cm", [
              { valeur: 180, label: "départ : 180 cm", couleur: ORANGE },
              { valeur: 245, label: "7 jours : 245 cm" },
            ]),
          ),
          micros: ["aire_longueur_probleme", "aire_longueur_comparer"],
        },
        {
          titre: "La guirlande",
          enonce:
            "La classe fabrique une guirlande de $24$ fanions.\nChaque fanion fait $15$ cm de large.\nEntre deux fanions, on laisse $5$ cm.\nOn laisse aussi $50$ cm de ficelle à chaque bout.\na) Combien y a-t-il d'espaces entre les fanions ?\nb) Quelle longueur de ficelle faut-il, en cm puis en m ?\nc) La ficelle se vend en rouleaux de $3$ m. Combien de rouleaux faut-il ?",
          correction:
            "a) Sur le dessin, $4$ fanions ont $3$ espaces : un de moins.\nAvec $24$ fanions, il y a $23$ espaces.\nb) Les fanions : $24 \\times 15 = 360$ cm.\nLes espaces : $23 \\times 5 = 115$ cm.\nLes deux bouts : $2 \\times 50 = 100$ cm.\nEn tout : $360 + 115 + 100 = 575$ cm, soit $5{,}75$ m.\nc) Un rouleau ne suffit pas : $3$ m $< 5{,}75$ m.\nDeux rouleaux font $6$ m : ça suffit. Il restera $25$ cm.\n⛔ Le piège : compter $24$ espaces. Il y a un espace de moins que de fanions.\nRéponse : a) $23$ espaces ; b) $575$ cm, soit $5{,}75$ m ; c) $2$ rouleaux.",
          schema: guirlande(4, 15, 5),
          micros: ["aire_longueur_defi", "aire_longueur_probleme"],
        },
      ],
    },
  ],
};
