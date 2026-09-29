// ─── Fiche d'exercices : calculer avec les nombres relatifs (4e) — 20 exercices corrigés
//
// RÉÉCRITE le 29/09/2026 au standard de la 5e (feuille étalon de la 4e) : un
// dessin qui aide dans CHAQUE exercice, 12 à 14 imprimés, aides de dessin
// locales écrites EN CLAIR et relues par le script de recalcul. L'ancienne
// feuille du 25/09 n'a servi que de réservoir (le fait sourcé de l'atmosphère
// type) ; aucun exercice n'en est recopié.
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-operations-relatifs.tsx` et
// sur la banque `lib/tutor-v4/questionBank/4e/maths/operations-relatifs.bank.ts`,
// notionId relatif_operation. L'angle de la 4e : l'addition et la soustraction
// viennent de 5e (un seul exercice de rappel) ; la NOUVEAUTÉ est le produit et
// le quotient, donc la RÈGLE DES SIGNES, le compte des facteurs négatifs, puis
// l'ordre des calculs (priorités, parenthèses, trait de fraction).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni (−5) + (−4), (−12) + 5,
// (−2) + 7, 6 − 9, 5 − (−3), ni (−4) × 3, (−5) × (−2), (−4) × (−3), (−12) ÷ 3,
// (−20) ÷ (−5), ni (−3) × 4 + 5, ni (−2) × (−3) × (−1). Ni aucun exercice de la
// feuille de 5e (congélateur, lac de barrage, Rome, fuseaux horaires, grotte,
// carré magique, cartes additionnées).
// Rien des fractions négatives (notion `fraction_nombre`), rien des puissances.
//
// Les pièges nommés : « − (−13) » recopié en « − 13 » (1), un saut vers la
// gauche lu comme positif (2), « des moins, donc négatif » dans un produit (3),
// une règle à part pour la division (4), compter tous les facteurs au lieu des
// négatifs (5), calculer de gauche à droite sans les priorités (6, 9, 12, 18),
// le signe moins devant un produit (10), simplifier un numérateur pas fini
// (11), la multiplication avant la division qui la précède (12), les bonnes
// réponses à déduire (13), la moyenne des distances (14), remonter un programme
// avec les mêmes opérations (15), le facteur trouvé sans son signe (8, 16), un
// écart négatif (17), prendre les trois plus grandes cartes (19), les pertes
// additionnées sans le gain (20).
//
// Les faits réels, et leur source :
// - ex. 17 : atmosphère type de l'aviation, 15 °C au niveau de la mer et
//   −6,5 °C par kilomètre jusqu'à 11 km (OACI, Manuel de l'atmosphère type,
//   Doc 7488 ; l'« ISA » des pilotes).
// Tout le reste (sous-marin, quiz, station de montagne, club de VTT, jeu de
// cartes, bilans du glacier) est un MODÈLE, dit comme tel dans l'énoncé quand
// il ressemble à une mesure.
//
// ⭐ LES DESSINS : la droite graduée et ses SAUTS (`droiteRel`) — la
// multiplication y devient des sauts répétés ; l'axe vertical (`axeVertical`)
// pour ce qui monte et descend ; la table de la règle des signes et les
// tableaux (`table`, `tableau`) ; les ÉTAPES fléchées d'un calcul avec ses
// priorités (`etapes`) ; un programme de calcul (`programme`) ; une pyramide
// multiplicative (`pyramide`) ; des cartes (`cartes`) ; des barres de part et
// d'autre de zéro (`barresRel`). 14 dessins imprimés ; ceux qui redisent le
// corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je décide le signe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-relatif-operation.mjs`.
//
// Micro-compétences : relatif_addition (1, 14, 18, 20), relatif_soustraction
// (1, 10, 14, 17), relatif_multiplication (2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 15,
// 16, 17, 18, 19), relatif_division (4, 7, 8, 9, 11, 12, 14, 15, 16, 17, 20),
// relatif_calcul (6, 9, 10, 11, 12, 13, 14, 15, 18, 20), relatif_probleme (7,
// 13, 14, 17, 18, 19, 20), relatif_operation_defi (5, 8, 12, 15, 16, 19). 7/7.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, programme, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";
const ORANGE = "#ea580c";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** −1 000, 4,5 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE (celle de la 5e) : une graduation tous les
 * `pas`, un nombre tous les `nombres`, des points nommés SOUS les nombres, et
 * des arcs fléchés (`sauts`) : vert vers la droite, rouge vers la gauche.
 * ⛔ Onze nombres écrits au plus : 300 de large, lisibles à 375 px.
 */
const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    // Une étiquette ne sort pas du dessin : au bord, elle rentre.
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Un axe VERTICAL gradué (celui de la 5e) : les nombres à gauche, les points
 * nommés à droite (écartés de 18 au moins), les flèches d'écart plus à droite,
 * une colonne chacune.
 */
const axeVertical = (min: number, max: number, pas: number, points: Point[], fleches: Saut[] = []) => {
  const W = 290;
  const H = 250;
  const X = 64;
  const [haut, bas] = [16, 16];
  const y = (v: number) => haut + ((max - v) / (max - min)) * (H - haut - bas);
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ordre = points.map((p, i) => ({ i, ty: y(p.value) + 4 })).sort((a, b) => a.ty - b.ty);
  // ⛔ 18 d'écart en police 14 : à 16, les boîtes se touchaient de 3 px (mesuré le 29/09).
  ordre.forEach((o, k) => {
    if (k > 0) o.ty = Math.max(o.ty, ordre[k - 1].ty + 18);
  });
  const tyDe = new Map(ordre.map((o) => [o.i, o.ty]));
  const Hsvg = Math.max(H, (ordre.length ? ordre[ordre.length - 1].ty : 0) + 8);
  return (
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${Hsvg}`} className="block h-auto w-full" role="img" aria-label="Axe gradué vertical">
        <line x1={X} y1={H - 6} x2={X} y2={6} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${X - 5} 14 L ${X} 6 L ${X + 5} 14`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X - 6} y1={y(t)} x2={X + 6} y2={y(t)} stroke={NOIR} strokeWidth={1.8} />
            <text x={X - 10} y={y(t) + 4} textAnchor="end" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
              {ecrit(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={X} cy={y(p.value)} r={5} fill={p.color ?? BLEU} />
            <line x1={X + 6} y1={y(p.value)} x2={X + 12} y2={(tyDe.get(i) ?? 0) - 4} stroke={p.color ?? BLEU} strokeWidth={1.2} />
            <text x={X + 14} y={tyDe.get(i)} fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
        {fleches.map((f, i) => {
          const fx = 216 + 38 * i;
          const [y1, y2] = [y(f.de), y(f.vers)];
          const c = f.vers >= f.de ? VERT : ROUGE;
          const s = y2 < y1 ? 1 : -1;
          const aGauche = fx + 6 + f.label.length * 9.5 > W - 2;
          return (
            <g key={`f${i}`}>
              <line x1={fx} y1={y1} x2={fx} y2={y2} stroke={c} strokeWidth={2.6} />
              <line x1={fx - 5} y1={y1} x2={fx + 5} y2={y1} stroke={c} strokeWidth={2} />
              <path d={`M ${fx - 5} ${y2 + 8 * s} L ${fx} ${y2} L ${fx + 5} ${y2 + 8 * s}`} fill="none" stroke={c} strokeWidth={2.4} />
              <text x={aGauche ? fx - 7 : fx + 6} y={(y1 + y2) / 2 + 4} textAnchor={aGauche ? "end" : "start"} fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). ⛔ Trois colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * Les ÉTAPES d'un calcul, l'une sous l'autre, reliées par une flèche orange qui
 * dit ce qu'on fait (« le × d'abord »). La dernière ligne, le résultat, en vert.
 * ⛔ Une ligne : 26 signes au plus ; une note : 15 signes au plus (police 14,
 * elle part du milieu du dessin et doit tenir dans les 300 de large).
 */
const etapes = (lignes: string[], notes: string[] = []) => {
  const [W, pasY] = [300, 50];
  const H = 20 + (lignes.length - 1) * pasY + 10;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Les étapes du calcul">
        {lignes.map((l, i) => {
          const y = 20 + i * pasY;
          const dernier = i === lignes.length - 1;
          return (
            <g key={i}>
              <text x={W / 2} y={y} textAnchor="middle" fontSize="15" fontWeight={dernier ? 900 : 700} fill={dernier ? VERT : NOIR}>
                {l}
              </text>
              {dernier ? null : (
                <g>
                  <line x1={W / 2} y1={y + 8} x2={W / 2} y2={y + pasY - 22} stroke={ORANGE} strokeWidth={2} />
                  <path d={`M ${W / 2 - 5} ${y + pasY - 28} L ${W / 2} ${y + pasY - 22} L ${W / 2 + 5} ${y + pasY - 28}`} fill="none" stroke={ORANGE} strokeWidth={2} />
                  {notes[i] ? (
                    <text x={W / 2 + 10} y={y + pasY / 2} fontSize="14" fontWeight="700" fill={ORANGE}>
                      {notes[i]}
                    </text>
                  ) : null}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Une PYRAMIDE de briques (celle de la 5e) : ici, chaque brique est le PRODUIT
 * des deux briques posées sous elle. `etages` va du sommet à la base ; les
 * briques de `trouvees` ([étage, rang], comptés depuis 0) sont en vert. « ? » :
 * une brique à trouver. Texte NU.
 */
const pyramide = (etages: string[][], trouvees: [number, number][] = []) => {
  const [L, Hb, W] = [64, 36, 300];
  const H = etages.length * Hb + 12;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Pyramide de nombres">
        {etages.map((ligne, i) =>
          ligne.map((v, j) => {
            const x = W / 2 - (ligne.length * L) / 2 + j * L;
            const y = 6 + i * Hb;
            const vert = trouvees.some(([a, b]) => a === i && b === j);
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={y} width={L} height={Hb} fill={vert ? "#dcfce7" : v === "?" ? "#f1f5f9" : "#fff"} stroke={NOIR} strokeWidth={1.8} />
                <text x={x + L / 2} y={y + Hb / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={vert ? VERT : NOIR}>
                  {v}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
};

/** Des CARTES à jouer, chacune avec son nombre : négatifs en rouge, positifs en bleu. Celles de `vertes` (rangs) sont entourées de vert. Huit au plus. */
const cartes = (valeurs: string[], vertes: number[] = []) => {
  const [L, Hc, e, W] = [32, 48, 4, 300];
  const x0 = (W - (valeurs.length * (L + e) - e)) / 2;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${Hc + 8}`} className="block h-auto w-full" role="img" aria-label="Les cartes du jeu">
        {valeurs.map((v, i) => {
          const vert = vertes.includes(i);
          return (
            <g key={i}>
              <rect x={x0 + i * (L + e)} y={4} width={L} height={Hc} rx={5} fill={vert ? "#dcfce7" : "#fff"} stroke={vert ? VERT : NOIR} strokeWidth={vert ? 2.6 : 1.8} />
              <text x={x0 + i * (L + e) + L / 2} y={4 + Hc / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={v.startsWith("−") ? ROUGE : BLEU}>
                {v}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Des BARRES de part et d'autre de zéro : vers le haut en bleu (un gain), vers
 * le bas en rouge (une perte). La valeur s'écrit de l'AUTRE côté de la ligne
 * du zéro, au pied de sa barre : elle ne touche ni les libellés du bas ni le
 * bout d'une barre longue. Axe gradué de `min` à `max`, tous les `pas`.
 */
const barresRel = (min: number, max: number, pas: number, barres: { label: string; value: number }[]) => {
  const [W, H, X, haut, bas] = [300, 210, 46, 14, 32];
  const y = (v: number) => haut + ((max - v) / (max - min)) * (H - haut - bas);
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const larg = (W - X - 10) / barres.length;
  const bw = Math.min(34, larg - 14);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X} y1={y(t)} x2={W - 6} y2={y(t)} stroke={t === 0 ? NOIR : "#cbd5e1"} strokeWidth={t === 0 ? 2 : 1} />
            <text x={X - 6} y={y(t) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
              {ecrit(t)}
            </text>
          </g>
        ))}
        {barres.map((b, i) => {
          const cx = X + 5 + larg * (i + 0.5);
          const [y0, y1] = [y(0), y(b.value)];
          const c = b.value >= 0 ? BLEU : ROUGE;
          return (
            <g key={i}>
              <rect x={cx - bw / 2} y={Math.min(y0, y1)} width={bw} height={Math.abs(y1 - y0)} fill={c} opacity={0.85} />
              <text x={cx} y={b.value >= 0 ? y0 + 17 : y0 - 6} textAnchor="middle" fontSize="14" fontWeight="900" fill={c}>
                {ecrit(b.value)}
              </text>
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesRelatifs4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "relatif-operation",
  titre: "Calculer avec les nombres relatifs",
  accroche:
    "Vingt exercices, du geste seul au problème : multiplier et diviser des relatifs avec la règle des signes, compter les facteurs négatifs, respecter l'ordre des calculs, le trait de fraction, et les additions de 5e en rappel. Un sous-marin, un quiz, un programme de calcul, l'air qui se refroidit en altitude, le compte d'un club de VTT, un jeu de cartes, un glacier qui fond. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/relatif-operation", titre: "Les opérations sur les nombres relatifs" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je décide le signe avant d'écrire le moindre chiffre.",
      rappel: [
        "Additionner, soustraire : les règles de 5e. Soustraire un nombre, c'est ajouter son opposé.",
        "Multiplier ou diviser deux relatifs : je décide le signe d'abord, puis je calcule avec les distances à zéro.",
        "Signes pareils : le résultat est positif. Signes contraires : le résultat est négatif.",
        "Dans un produit de plusieurs facteurs, je compte les facteurs négatifs : un nombre pair donne un positif, un nombre impair un négatif.",
      ],
      exercices: [
        {
          enonce: "Pour se remettre en route : les gestes de 5e. Calcule.\na) $-14 + 6$\nb) $-2{,}5 - 4$\nc) $9 - (-7)$\nd) $-6 - (-13)$",
          correction:
            "Je regarde les signes, puis les distances à zéro. Une soustraction devient l'addition de l'opposé.\na) Signes contraires : $14 - 6 = 8$, et $-14$ est le plus loin de zéro. $-14 + 6 = -8$.\nb) $-2{,}5 - 4 = -2{,}5 + (-4) = -6{,}5$ : deux négatifs, j'additionne les distances.\nc) $9 - (-7) = 9 + 7 = 16$ : l'opposé de $-7$ est $7$.\nd) $-6 - (-13) = -6 + 13 = 7$ : signes contraires, et $13$ l'emporte.\n⛔ Le piège : au d), écrire $-6 - 13 = -19$. Enlever $-13$, c'est AJOUTER $13$.\nRéponse : a) $-8$ ; b) $-6{,}5$ ; c) $16$ ; d) $7$.",
          schema: ecranSeulement(
            droiteRel(-8, 8, 1, [
              { value: -6, label: "départ −6", color: NOIR },
              { value: 7, label: "arrivée 7", color: VERT },
            ], { nombres: 2, sauts: [{ de: -6, vers: 7, label: "− (−13) = +13" }] }),
          ),
          micros: ["relatif_addition", "relatif_soustraction"],
        },
        {
          enonce: "Sur cette droite graduée, je pars de $0$ et je fais quatre sauts identiques, tous vers la gauche.\na) Quelle est la longueur de chaque saut ? Écris-la avec son signe.\nb) Écris le produit que montre le dessin, puis donne l'abscisse du point A.\nc) Sans dessiner : où arrive-t-on après $7$ sauts de la même sorte ?",
          figure: droiteRel(-12, 2, 0.5, [
            { value: 0, label: "départ", color: NOIR },
            { value: -10, label: "A", color: ROUGE },
          ], { nombres: 2, sauts: [{ de: 0, vers: -2.5, label: "?" }, { de: -2.5, vers: -5, label: "?" }, { de: -5, vers: -7.5, label: "?" }, { de: -7.5, vers: -10, label: "?" }] }),
          correction:
            "Multiplier par un nombre entier, c'est répéter une addition : quatre sauts de la même longueur, c'est un produit.\na) Le premier saut va de $0$ à $-2{,}5$ : il mesure $2{,}5$ unités, vers la GAUCHE. Avec son signe : $-2{,}5$.\nb) Quatre sauts de $-2{,}5$ : $4 \\times (-2{,}5) = -10$. Signes contraires, le résultat est négatif, et $4 \\times 2{,}5 = 10$. A a pour abscisse $-10$, comme sur le dessin.\nc) $7 \\times (-2{,}5) = -17{,}5$. On arrive en $-17{,}5$, plus loin à gauche que le dessin.\n⭐ Voilà pourquoi un positif fois un négatif donne un négatif : je répète un recul, je recule encore plus.\n⛔ Le piège : écrire $4 \\times 2{,}5 = 10$ et placer A à droite de zéro. Les sauts vont vers la gauche : le résultat est négatif.\nRéponse : a) $-2{,}5$ ; b) $4 \\times (-2{,}5) = -10$ ; c) $-17{,}5$.",
          micros: ["relatif_multiplication"],
        },
        {
          enonce: "Calcule. Décide le signe avant d'écrire le moindre chiffre.\na) $(-6) \\times 8$\nb) $(-7) \\times (-9)$\nc) $0{,}5 \\times (-14)$\nd) $(-1{,}5) \\times (-6)$",
          correction:
            "Je décide le signe d'abord, avec la règle des signes, puis je multiplie les distances à zéro.\na) Signes contraires : négatif. $6 \\times 8 = 48$, donc $(-6) \\times 8 = -48$.\nb) Deux négatifs, signes pareils : positif. $7 \\times 9 = 63$, donc $(-7) \\times (-9) = 63$.\nc) Signes contraires : négatif. $0{,}5 \\times 14 = 7$, donc $0{,}5 \\times (-14) = -7$.\nd) Signes pareils : positif. $1{,}5 \\times 6 = 9$, donc $(-1{,}5) \\times (-6) = 9$.\n⛔ Le piège : au b), écrire $-63$ parce qu'« il y a des moins ». Dans un PRODUIT, deux signes moins donnent un résultat positif.\nRéponse : a) $-48$ ; b) $63$ ; c) $-7$ ; d) $9$.",
          schema: table(["×", "positif", "négatif"], [
            ["positif", "positif", "négatif"],
            ["négatif", "négatif", "positif"],
          ]),
          micros: ["relatif_multiplication"],
        },
        {
          enonce: "Calcule.\na) $(-72) \\div 9$\nb) $(-63) \\div (-7)$\nc) $54 \\div (-6)$\nd) $(-9) \\div 4$",
          correction:
            "La division suit la même règle des signes que la multiplication.\na) Signes contraires : négatif. $72 \\div 9 = 8$, donc $(-72) \\div 9 = -8$.\nb) Signes pareils : positif. $63 \\div 7 = 9$, donc $(-63) \\div (-7) = 9$.\nc) Signes contraires : négatif. $54 \\div 6 = 9$, donc $54 \\div (-6) = -9$.\nd) Signes contraires : négatif. $9 \\div 4 = 2{,}25$, donc $(-9) \\div 4 = -2{,}25$.\n⭐ Je contrôle par la multiplication : $(-8) \\times 9 = -72$ et $9 \\times (-7) = -63$.\n⛔ Le piège : croire que la division a sa propre règle, et que « moins divisé par moins » reste négatif. C'est la même règle que pour le produit.\nRéponse : a) $-8$ ; b) $9$ ; c) $-9$ ; d) $-2{,}25$.",
          schema: ecranSeulement(
            table(["division", "contrôle", "résultat"], [
              ["(−72) ÷ 9", "(−8) × 9 = −72", "−8"],
              ["(−63) ÷ (−7)", "9 × (−7) = −63", "9"],
              ["54 ÷ (−6)", "(−9) × (−6) = 54", "−9"],
              ["(−9) ÷ 4", "(−2,25) × 4 = −9", "−2,25"],
            ]),
          ),
          micros: ["relatif_division"],
        },
        {
          enonce: "Sans calculer, donne le signe de chaque produit. Calcule-le ensuite pour vérifier.\n$A = (-1) \\times (-2) \\times (-3) \\times (-4) \\times (-5)$\n$B = (-0{,}5) \\times 4 \\times (-10) \\times (-2)$\n$C = (-3) \\times (-3) \\times (-3) \\times (-3)$",
          correction:
            "Dans un produit, je compte les facteurs NÉGATIFS. Un nombre pair de facteurs négatifs donne un produit positif ; un nombre impair, un produit négatif.\n$A$ : cinq facteurs négatifs. $5$ est impair : $A$ est négatif. Les distances : $1 \\times 2 \\times 3 \\times 4 \\times 5 = 120$, donc $A = -120$.\n$B$ : trois facteurs négatifs, $-0{,}5$, $-10$ et $-2$. $3$ est impair : $B$ est négatif. $0{,}5 \\times 4 \\times 10 \\times 2 = 40$, donc $B = -40$.\n$C$ : quatre facteurs négatifs, un nombre pair : $C$ est positif. $3 \\times 3 \\times 3 \\times 3 = 81$, donc $C = 81$.\n⭐ Pourquoi compter suffit : les facteurs négatifs vont par paires, et chaque paire donne un positif. Un négatif resté seul rend le tout négatif.\n⛔ Le piège : compter TOUS les facteurs au lieu des facteurs négatifs. $B$ a quatre facteurs, mais trois seulement sont négatifs.\nRéponse : $A = -120$, négatif ; $B = -40$, négatif ; $C = 81$, positif.",
          schema: table(["produit", "négatifs", "signe"], [
            ["A", "5 : impair", "négatif"],
            ["B", "3 : impair", "négatif"],
            ["C", "4 : pair", "positif"],
          ]),
          micros: ["relatif_multiplication", "relatif_operation_defi"],
        },
        {
          enonce: "Calcule $E = -9 + 3 \\times (-7)$.",
          correction:
            "La multiplication passe AVANT l'addition. Je commence par $3 \\times (-7)$.\nSignes contraires : $3 \\times (-7) = -21$.\nJe réécris : $E = -9 + (-21)$. Deux négatifs : $-9 + (-21) = -30$.\n⛔ Le piège : calculer de gauche à droite, $(-9 + 3) \\times (-7) = (-6) \\times (-7) = 42$. Ce n'est pas le calcul écrit : il n'y a pas de parenthèses.\nRéponse : $E = -30$.",
          schema: etapes(["−9 + 3 × (−7)", "−9 + (−21)", "−30"], ["le × d'abord", "puis le +"]),
          micros: ["relatif_calcul", "relatif_multiplication"],
        },
        {
          enonce: "Un sous-marin part de la surface (profondeur $0$ m) et plonge : sa position change de $-12$ m chaque minute.\na) Où est-il au bout de $7$ minutes ?\nb) Au bout de combien de minutes atteint-il $-150$ m ?",
          correction:
            "Une descente est négative : chaque minute, j'ajoute $-12$ m. Plusieurs minutes, c'est une multiplication.\na) $7 \\times (-12) = -84$ : signes contraires, négatif, et $7 \\times 12 = 84$. Il est à $-84$ m.\nb) Je cherche combien de fois $-12$ il faut pour faire $-150$ : c'est une division. $(-150) \\div (-12) = 12{,}5$ : signes pareils, positif. Il lui faut $12{,}5$ minutes, soit $12$ min $30$ s.\n⛔ Le piège : au b), trouver $-12{,}5$ minutes. Deux négatifs divisés donnent un positif, et une durée n'est jamais négative.\nRéponse : a) $-84$ m ; b) $12{,}5$ minutes.",
          schema: axeVertical(-160, 0, 20, [
            { value: 0, label: "surface 0", color: NOIR },
            { value: -84, label: "7 min : −84", color: ROUGE },
            { value: -150, label: "12,5 min : −150", color: ROUGE },
          ]),
          micros: ["relatif_probleme", "relatif_multiplication", "relatif_division"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $(-4) \\times \\ldots = 28$\nb) $\\ldots \\times (-5) = -35$\nc) $(-36) \\div \\ldots = 4$\nd) $\\ldots \\div (-3) = -6$",
          correction:
            "Je décide le signe du nombre qui manque d'abord, avec la règle des signes, puis je cherche sa distance à zéro.\na) $28$ est positif : les deux facteurs ont le même signe. Le nombre est négatif, et $4 \\times 7 = 28$. $(-4) \\times (-7) = 28$.\nb) $-35$ est négatif : signes contraires. Le nombre est positif : $7 \\times (-5) = -35$.\nc) Le quotient $4$ est positif : $-36$ et le nombre ont le même signe. $(-36) \\div (-9) = 4$.\nd) Le résultat $-6$ est négatif et on divise par $-3$ : le nombre est positif. $18 \\div (-3) = -6$.\n⛔ Le piège : au a), répondre $7$ parce que « $4 \\times 7 = 28$ ». Contrôle : $(-4) \\times 7 = -28$, pas $28$.\nRéponse : a) $-7$ ; b) $7$ ; c) $-9$ ; d) $18$.",
          schema: ecranSeulement(
            table(["calcul", "signe", "nombre"], [
              ["(−4) × … = 28", "négatif", "−7"],
              ["… × (−5) = −35", "positif", "7"],
              ["(−36) ÷ … = 4", "négatif", "−9"],
              ["… ÷ (−3) = −6", "positif", "18"],
            ]),
          ),
          micros: ["relatif_multiplication", "relatif_division", "relatif_operation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je respecte l'ordre des calculs et je réécris tout le calcul à chaque étape.",
      rappel: [
        "L'ordre des calculs : d'abord les parenthèses, puis les multiplications et les divisions de gauche à droite, enfin les additions et les soustractions.",
        "Un trait de fraction agit comme des parenthèses : je calcule le haut, puis le bas, puis je divise.",
        "À chaque étape, je réécris tout le calcul, en ne changeant qu'une chose à la fois.",
      ],
      exercices: [
        {
          enonce: "Calcule $F = 7 - 3 \\times (-4) + (-20) \\div 5$.",
          correction:
            "Pas de parenthèse à calculer : la multiplication et la division passent avant l'addition et la soustraction.\nLe produit : $3 \\times (-4) = -12$.\nLe quotient : $(-20) \\div 5 = -4$.\nJe réécris : $F = 7 - (-12) + (-4)$.\nJ'enlève les parenthèses : $F = 7 + 12 - 4$.\nDe gauche à droite : $7 + 12 = 19$, puis $19 - 4 = 15$.\n⛔ Le piège : commencer par $7 - 3 = 4$. La soustraction attend que le produit soit calculé.\nRéponse : $F = 15$.",
          schema: ecranSeulement(etapes(["7 − 3 × (−4) + (−20) ÷ 5", "7 − (−12) + (−4)", "7 + 12 − 4", "15"], ["× et ÷ d'abord", "les signes", "gauche à droite"])),
          micros: ["relatif_calcul", "relatif_multiplication", "relatif_division"],
        },
        {
          enonce: "Calcule $G = (-2) \\times (9 - 14) - (3 - 8) \\times (-6)$.",
          correction:
            "D'abord les parenthèses : $9 - 14 = -5$ et $3 - 8 = -5$.\nJe réécris : $G = (-2) \\times (-5) - (-5) \\times (-6)$.\nPuis les deux produits. $(-2) \\times (-5) = 10$ : signes pareils. $(-5) \\times (-6) = 30$ : signes pareils.\nIl reste $G = 10 - 30 = -20$.\n⛔ Le piège : voir « $- (-5)$ » et le changer en « $+ 5$ » avant d'avoir fait le produit. Le signe moins porte sur le PRODUIT $(-5) \\times (-6)$ tout entier : je retire $30$.\nRéponse : $G = -20$.",
          schema: etapes(["(−2) × (−5) − (−5) × (−6)", "10 − 30", "−20"], ["les produits", "la soustraction"]),
          micros: ["relatif_calcul", "relatif_multiplication", "relatif_soustraction"],
        },
        {
          enonce: "Calcule $H = \\dfrac{-6 \\times 5 + 2}{-3 - 4}$.",
          correction:
            "Le trait de fraction est une division, et il agit comme des parenthèses : je calcule le haut, puis le bas, puis je divise.\nEn haut : $-6 \\times 5 = -30$, puis $-30 + 2 = -28$.\nEn bas : $-3 - 4 = -7$.\nIl reste $(-28) \\div (-7) = 4$ : signes pareils, positif.\n⛔ Le piège : simplifier trop tôt, en divisant le $-6$ du haut par un nombre du bas. Le haut n'est fini qu'après le $+ 2$.\nRéponse : $H = 4$.",
          schema: ecranSeulement(
            table(["", "calcul", "valeur"], [
              ["en haut", "−6 × 5 + 2", "−28"],
              ["en bas", "−3 − 4", "−7"],
              ["H", "(−28) ÷ (−7)", "4"],
            ]),
          ),
          micros: ["relatif_division", "relatif_calcul"],
        },
        {
          enonce: "Trois élèves se sont trompés. Trouve l'erreur de chacun, puis corrige.\na) Sami écrit : $(-6) \\times (-7) = -42$.\nb) Maya écrit : $-8 - 2 \\times (-3) = 30$.\nc) Hugo écrit : $(-24) \\div (-4) \\times 2 = 3$.",
          correction:
            "a) Sami a oublié la règle des signes. Deux facteurs négatifs : le produit est positif. $(-6) \\times (-7) = 42$.\nb) Maya a calculé $-8 - 2 = -10$ d'abord, puis $(-10) \\times (-3) = 30$. Mais la multiplication passe avant : $2 \\times (-3) = -6$, puis $-8 - (-6) = -8 + 6 = -2$.\nc) Hugo a fait la multiplication avant la division : $(-4) \\times 2 = -8$, puis $(-24) \\div (-8) = 3$. Or multiplications et divisions se font de gauche à droite : $(-24) \\div (-4) = 6$, puis $6 \\times 2 = 12$.\n⭐ Un contrôle au b) : on enlève un nombre négatif à $-8$, donc on avance un peu vers la droite. Le résultat est proche de $-8$ : $30$ ne peut pas convenir.\nRéponse : a) $42$ ; b) $-2$ ; c) $12$.",
          schema: ecranSeulement(etapes(["−8 − 2 × (−3)", "−8 − (−6)", "−8 + 6", "−2"], ["le × d'abord", "l'opposé", "la somme"])),
          micros: ["relatif_operation_defi", "relatif_calcul", "relatif_multiplication", "relatif_division"],
        },
        {
          enonce: "À un quiz de $20$ questions, une bonne réponse rapporte $4$ points, une mauvaise en fait perdre $3$, et une question sans réponse en fait perdre $1$. Le tableau donne les réponses de Nina et de Karim.\na) Écris le score de Nina en un seul calcul avec des nombres relatifs, puis calcule-le.\nb) Même question pour Karim.\nc) Jade a donné $9$ mauvaises réponses et laissé $1$ question sans réponse. Quel est son score ?",
          figure: table(["réponses", "Nina", "Karim"], [
            ["bonnes", "12", "8"],
            ["mauvaises", "5", "10"],
            ["sans réponse", "3", "2"],
          ]),
          correction:
            "Une bonne réponse vaut $+4$, une mauvaise $-3$, une question sans réponse $-1$. Chaque sorte de réponse se compte par une multiplication.\na) Nina : $12 \\times 4 + 5 \\times (-3) + 3 \\times (-1)$. Les produits d'abord : $48 + (-15) + (-3)$. Puis $48 - 15 - 3 = 30$.\nb) Karim : $8 \\times 4 + 10 \\times (-3) + 2 \\times (-1) = 32 + (-30) + (-2) = 0$. Ses points perdus effacent tout juste ses points gagnés.\nc) Jade a répondu juste à $20 - 9 - 1 = 10$ questions. $10 \\times 4 + 9 \\times (-3) + 1 \\times (-1) = 40 + (-27) + (-1) = 12$.\n⛔ Le piège du c) : oublier les bonnes réponses de Jade. L'énoncé ne les donne pas : je les déduis des $20$ questions.\nRéponse : a) $30$ points ; b) $0$ point ; c) $12$ points.",
          micros: ["relatif_probleme", "relatif_calcul", "relatif_multiplication"],
        },
        {
          enonce: "Une station météo de montagne relève la température la plus basse de chaque nuit, pendant six nuits (chiffres d'un modèle).\na) Quel est l'écart entre la nuit la plus froide et la nuit la plus douce ?\nb) Calcule la température moyenne de ces six nuits.\nc) Quelle température faudrait-il la septième nuit pour que la moyenne des sept nuits soit de $-4$ °C ?",
          figure: tableau(["nuit", "1", "2", "3", "4", "5", "6"], ["°C", "−7", "−3,5", "2", "−9", "−1,5", "1"], true),
          correction:
            "a) La plus douce : $2$ °C ; la plus froide : $-9$ °C. L'écart : $2 - (-9) = 2 + 9 = 11$.\nb) La moyenne, c'est la somme divisée par le nombre de nuits.\nLes positifs : $2 + 1 = 3$. Les négatifs : $-7 + (-3{,}5) + (-9) + (-1{,}5) = -21$.\nLa somme : $3 + (-21) = -18$. Puis $(-18) \\div 6 = -3$.\nc) Pour une moyenne de $-4$ sur sept nuits, la somme doit valoir $7 \\times (-4) = -28$. Il manque $-28 - (-18) = -28 + 18 = -10$.\n⭐ Contrôle : $(-18 + (-10)) \\div 7 = (-28) \\div 7 = -4$.\n⛔ Le piège du b) : faire la moyenne des distances, $(7 + 3{,}5 + 2 + 9 + 1{,}5 + 1) \\div 6 = 4$, en oubliant les signes. Des nuits presque toutes sous zéro ne peuvent pas avoir une moyenne positive.\nRéponse : a) $11$ °C ; b) $-3$ °C ; c) $-10$ °C.",
          schema: ecranSeulement(
            droiteRel(-10, 4, 1, [
              { value: -9, label: "min", color: ROUGE },
              { value: -3, label: "moyenne", color: VERT },
              { value: 2, label: "max" },
            ], { nombres: 2 }),
          ),
          micros: ["relatif_probleme", "relatif_division", "relatif_soustraction", "relatif_addition", "relatif_calcul"],
        },
        {
          enonce: "Voici un programme de calcul.\na) Applique-le au nombre $-4$, puis au nombre $2{,}5$.\nb) Quel nombre de départ donne $0$ ?\nc) Remonte le programme : quel nombre de départ donne $12$ ?",
          figure: programme(["Choisir un nombre", "Le multiplier par −3", "Ajouter 6", "Multiplier par −2"]),
          correction:
            "a) Avec $-4$ : $(-4) \\times (-3) = 12$, puis $12 + 6 = 18$, puis $18 \\times (-2) = -36$.\nAvec $2{,}5$ : $2{,}5 \\times (-3) = -7{,}5$, puis $-7{,}5 + 6 = -1{,}5$, puis $(-1{,}5) \\times (-2) = 3$.\nb) Un produit par $-2$ vaut $0$ seulement si l'autre facteur vaut $0$. Avant « ajouter $6$ », il fallait donc $-6$. Et $-6$ vient de $2$, car $2 \\times (-3) = -6$.\nc) Je remonte en partant de la fin, avec l'opération contraire à chaque étape.\nAvant « multiplier par $-2$ » : $12 \\div (-2) = -6$.\nAvant « ajouter $6$ » : $-6 - 6 = -12$.\nAvant « multiplier par $-3$ » : $(-12) \\div (-3) = 4$.\n⭐ Contrôle : $4 \\times (-3) = -12$, puis $-12 + 6 = -6$, puis $(-6) \\times (-2) = 12$.\n⛔ Le piège du c) : remonter avec les mêmes opérations, par exemple multiplier $12$ par $-2$. Pour défaire une multiplication, je divise ; pour défaire un ajout, je soustrais.\nRéponse : a) $-36$ et $3$ ; b) $2$ ; c) $4$.",
          schema: ecranSeulement(
            table(["étape", "avec −4", "avec 2,5"], [
              ["× (−3)", "12", "−7,5"],
              ["+ 6", "18", "−1,5"],
              ["× (−2)", "−36", "3"],
            ]),
          ),
          micros: ["relatif_calcul", "relatif_multiplication", "relatif_division", "relatif_operation_defi"],
        },
        {
          enonce: "Dans cette pyramide, chaque brique est le PRODUIT des deux briques posées juste en dessous d'elle. Complète-la, puis explique le signe du sommet.",
          figure: pyramide([["?"], ["?", "?"], ["−6", "?", "?"], ["−2", "?", "−1", "2"]]),
          correction:
            "Je commence par la brique du bas qui manque : $(-2) \\times \\ldots = -6$. Le produit est négatif, donc la brique est positive : $(-6) \\div (-2) = 3$.\nTroisième rangée : $3 \\times (-1) = -3$ et $(-1) \\times 2 = -2$.\nDeuxième rangée : $(-6) \\times (-3) = 18$ et $(-3) \\times (-2) = 6$.\nLe sommet : $18 \\times 6 = 108$.\n⭐ Le signe du sommet : les deux briques sous lui sont positives, donc il est positif. Et chacune d'elles est le produit de deux négatifs.\n⛔ Le piège : écrire $-3$ en bas, parce que « $2 \\times 3 = 6$ ». Contrôle : $(-2) \\times (-3) = 6$, pas $-6$ ; alors que $(-2) \\times 3 = -6$.\nRéponse : en bas, $3$ ; puis $-3$ et $-2$ ; puis $18$ et $6$ ; au sommet, $108$.",
          schema: ecranSeulement(pyramide([["108"], ["18", "6"], ["−6", "−3", "−2"], ["−2", "3", "−1", "2"]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 1]])),
          micros: ["relatif_multiplication", "relatif_division", "relatif_operation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je donne un signe à chaque donnée, puis je réponds par une phrase.",
      rappel: [
        "Une hausse, un gain, une montée sont positifs ; une baisse, une perte, une descente sont négatives.",
        "Ce qui se répète se compte par une multiplication ; « combien de fois » se trouve par une division.",
        "Je contrôle le signe de ma réponse : a-t-il un sens dans la situation ?",
      ],
      exercices: [
        {
          titre: "L'air se refroidit en altitude",
          enonce:
            "Dans l'atmosphère « type » des pilotes d'avion, il fait $15$ °C au niveau de la mer, et la température baisse de $6{,}5$ °C chaque fois qu'on monte de $1$ km, jusqu'à $11$ km d'altitude.\na) Quelle température fait-il à $4$ km d'altitude ?\nb) Et à $10$ km, où volent les avions de ligne ?\nc) Quel est l'écart de température entre ces deux altitudes ?\nd) À quelle altitude fait-il $-30{,}5$ °C ?",
          correction:
            "Une baisse est négative : chaque kilomètre de montée ajoute $-6{,}5$ °C.\na) $4 \\times (-6{,}5) = -26$, puis $15 + (-26) = -11$. À $4$ km, il fait $-11$ °C.\nb) $10 \\times (-6{,}5) = -65$, puis $15 + (-65) = -50$. À $10$ km, il fait $-50$ °C.\nc) La plus haute moins la plus basse : $-11 - (-50) = -11 + 50 = 39$.\n⭐ Contrôle : on monte de $6$ km, et $6 \\times 6{,}5 = 39$.\nd) Depuis le niveau de la mer, la température doit changer de $-30{,}5 - 15 = -45{,}5$ °C. Combien de fois $-6{,}5$ ? $(-45{,}5) \\div (-6{,}5) = 7$ : signes pareils, positif.\n⛔ Le piège du c) : calculer $-11 - 50 = -61$. On enlève $-50$, donc on ajoute $50$ ; et un écart n'est jamais négatif.\nRéponse : a) $-11$ °C ; b) $-50$ °C ; c) $39$ °C ; d) à $7$ km.",
          schema: axeVertical(-60, 20, 10, [
            { value: 15, label: "mer : 15" },
            { value: -11, label: "4 km : −11", color: ROUGE },
            { value: -30.5, label: "7 km : −30,5", color: ROUGE },
            { value: -50, label: "10 km : −50", color: ROUGE },
          ], [{ de: -50, vers: -11, label: "39" }]),
          micros: ["relatif_probleme", "relatif_multiplication", "relatif_division", "relatif_soustraction"],
        },
        {
          titre: "Le compte du club de VTT",
          enonce:
            "Le 1er avril, le compte d'un club de VTT est à $-150$ € : il est « à découvert ». Chaque semaine d'avril, les cotisations rapportent $90$ € et l'entretien des vélos coûte $40$ €. Pendant le mois, le club loue aussi trois fois un minibus, à $35$ € chaque fois. Avril compte ici quatre semaines (chiffres d'un modèle).\na) Écris le solde à la fin d'avril en un seul calcul avec des nombres relatifs.\nb) Calcule-le. Le compte est-il encore à découvert ?\nc) En mai, il n'y a plus de minibus. Après combien de semaines de mai le compte n'est-il plus à découvert ?",
          correction:
            "Ce qui entre est positif, ce qui sort est négatif. Ce qui revient plusieurs fois se compte par une multiplication.\na) $-150 + 4 \\times 90 + 4 \\times (-40) + 3 \\times (-35)$.\nb) Les produits d'abord : $4 \\times 90 = 360$ ; $4 \\times (-40) = -160$ ; $3 \\times (-35) = -105$.\nPuis la somme $-150 + 360 + (-160) + (-105)$. Les positifs : $360$. Les négatifs : $-150 + (-160) + (-105) = -415$. Et $360 + (-415) = -55$.\nLe solde est de $-55$ € : le compte est encore à découvert.\nc) En mai, chaque semaine rapporte $90 + (-40) = 50$ €.\nAprès $1$ semaine : $-55 + 50 = -5$, encore à découvert.\nAprès $2$ semaines : $-5 + 50 = 45$. Le compte est repassé au-dessus de zéro.\n⛔ Le piège du b) : oublier le signe du départ et compter $150 + 360 - 160 - 105 = 245$. Le club commence le mois avec une dette.\nRéponse : b) $-55$ €, encore à découvert ; c) après $2$ semaines.",
          schema: axeVertical(-160, 60, 20, [
            { value: 45, label: "mai + 2 sem. 45", color: VERT },
            { value: -5, label: "mai + 1 sem. −5", color: ROUGE },
            { value: -55, label: "fin avril −55", color: ROUGE },
            { value: -150, label: "1er avril −150", color: ROUGE },
          ], [{ de: -55, vers: 45, label: "+100" }]),
          micros: ["relatif_probleme", "relatif_addition", "relatif_multiplication", "relatif_calcul"],
        },
        {
          titre: "Le jeu du produit",
          enonce:
            "Dans un jeu, on dispose des huit cartes dessinées. Chaque joueur en tire trois, et son score est le PRODUIT de ses trois cartes. Le plus grand score gagne.\na) Emma tire $-2$, $3$ et $-4$. Léo tire $-1$, $-3$ et $2$. Calcule leurs scores. Qui gagne ?\nb) Quel est le plus grand score possible ? Explique ton choix de cartes.\nc) Quel est le plus petit score possible ?",
          figure: cartes(["−4", "−3", "−2", "−1", "1", "2", "3", "4"]),
          correction:
            "a) Emma : deux facteurs négatifs, un nombre pair : son score est positif. $(-2) \\times 3 \\times (-4) = 24$.\nLéo : deux facteurs négatifs aussi : $(-1) \\times (-3) \\times 2 = 6$.\n$24 > 6$ : Emma gagne.\nb) Pour un grand score, il faut d'abord un produit POSITIF : zéro ou deux cartes négatives.\nAvec trois cartes positives, le mieux est $4 \\times 3 \\times 2 = 24$.\nAvec deux négatives, je prends les plus loin de zéro et la plus grande positive : $(-4) \\times (-3) \\times 4 = 48$.\nLe plus grand score possible est $48$.\nc) Pour le plus petit, il faut un produit négatif, le plus loin possible de zéro : une ou trois cartes négatives.\nAvec trois négatives : $(-4) \\times (-3) \\times (-2) = -24$.\nAvec une seule : $(-4) \\times 4 \\times 3 = -48$.\nLe plus petit score possible est $-48$.\n⛔ Le piège du b) : prendre les trois plus grandes cartes, $4$, $3$ et $2$, et répondre $24$. Deux négatifs loin de zéro font un grand positif.\nRéponse : a) Emma $24$, Léo $6$ : Emma gagne ; b) $48$ ; c) $-48$.",
          schema: ecranSeulement(cartes(["−4", "−3", "−2", "−1", "1", "2", "3", "4"], [0, 1, 7])),
          micros: ["relatif_operation_defi", "relatif_multiplication", "relatif_probleme"],
        },
        {
          titre: "Le glacier qui fond",
          enonce:
            "Chaque année, des glaciologues mesurent le « bilan » d'un glacier : l'épaisseur de glace gagnée (positive) ou perdue (négative) sur l'année, en mètres. Le diagramme donne les bilans d'un glacier des Alpes pendant cinq ans (chiffres d'un modèle).\na) Quelle épaisseur le glacier a-t-il gagnée ou perdue en tout, sur les cinq ans ?\nb) Calcule le bilan moyen par an.\nc) À ce rythme moyen, combien d'années faudrait-il pour que le glacier perde encore $22$ m ?",
          figure: barresRel(-3, 1, 1, [
            { label: "2021", value: -1.2 },
            { label: "2022", value: -2.6 },
            { label: "2023", value: -1.4 },
            { label: "2024", value: 0.4 },
            { label: "2025", value: -0.7 },
          ]),
          correction:
            "a) Je regroupe. Le seul gain : $0{,}4$. Les pertes : $-1{,}2 + (-2{,}6) + (-1{,}4) + (-0{,}7) = -5{,}9$.\nLe total : $0{,}4 + (-5{,}9) = -5{,}5$. Sur cinq ans, le glacier a perdu $5{,}5$ m d'épaisseur.\nb) La moyenne : le total divisé par le nombre d'années. $(-5{,}5) \\div 5 = -1{,}1$. En moyenne, il perd $1{,}1$ m par an.\nc) Combien de fois $-1{,}1$ pour faire $-22$ ? $(-22) \\div (-1{,}1) = 20$ : signes pareils, positif.\n⭐ Contrôle : $20 \\times (-1{,}1) = -22$.\n⛔ Le piège du a) : additionner les cinq nombres sans leurs signes, $1{,}2 + 2{,}6 + 1{,}4 + 0{,}4 + 0{,}7 = 6{,}3$. L'année $2024$ est un GAIN : elle compense une partie des pertes.\nRéponse : a) il a perdu $5{,}5$ m ; b) $-1{,}1$ m par an ; c) $20$ ans.",
          micros: ["relatif_probleme", "relatif_addition", "relatif_division", "relatif_calcul"],
        },
      ],
    },
  ],
};
