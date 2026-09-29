// ─── Fiche d'exercices : additionner et soustraire des relatifs (5e) — 20 exercices corrigés
//
// Feuille du lot de 5e (29/09/2026), sur la forme de l'étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-operations-relatifs.tsx` et
// sur la banque `lib/tutor-v4/questionBank/5e/maths/operations-relatifs.bank.ts`,
// notionId relatif_operation : additionner, soustraire (ajouter l'opposé),
// enlever les parenthèses d'un double signe, calculer une somme algébrique de
// gauche à droite, résoudre un problème, défis.
// ⛔ LIMITES DE LA 5e : ADDITION et SOUSTRACTION seulement, entiers et décimaux.
// Aucun produit ni quotient de relatifs (4e) : la somme magique du 19 change de
// « (−2) + (−2) + (−2) », écrit comme une addition, comme le fait la banque.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni −4 + (−3), 7 + (−10),
// 4 − (−3), −2 + 5 − 3, le plongeur à −6 m, −5 + 2, −5 − (−2), −4 − 3 + 10,
// −2 °C qui baisse de 3, « quel calcul donne 4 »), ni aucun exercice de la
// feuille de 4e (`maths-4e-relatifs.tsx` : refuge, compte du club de handball,
// plongeuse, Jura, Everest, atmosphère type, records, golf).
//
// Les pièges nommés : additionner les distances quand les signes sont
// contraires (1, 10), lire la longueur d'un saut sans son sens (2), recopier
// « − (−3) » en « − 3 » (3, 9, 10), une addition à trou qui recule (4), l'écart
// qui oublie de passer par zéro (5, 17), perdre le signe d'un terme (6), un
// nombre et son opposé qui « s'ajoutent » (7), le signe oublié sous zéro (8),
// les distances additionnées sans leur signe (11), une durée négative (12), le
// bord d'une table d'addition trouvé à l'envers (14), l'ordre d'une différence
// (15), « des moins partout, donc négatif » (16), une distance négative (18),
// la somme magique qui ne bouge « que de −2 » (19), −5,5 > −4,5 « parce que
// 5,5 > 4,5 » (20).
//
// Les faits réels, et leur source :
// - ex. 12 : fondation légendaire de Rome en 753 av. J.-C. (date traditionnelle
//   de Varron) ; passage des Alpes par Hannibal en 218 av. J.-C. (deuxième
//   guerre punique, Polybe, Tite-Live) ; Alésia en 52 av. J.-C. (César, Guerre
//   des Gaules, livre VII) — les dates des manuels d'histoire de 6e-5e ;
// - ex. 17 : heures légales d'HIVER, Paris UTC+1, New York UTC−5, Tokyo UTC+9
//   (base des fuseaux horaires IANA : Europe/Paris, America/New_York,
//   Asia/Tokyo ; le Japon n'a pas d'heure d'été).
// - ex. 5 : −18 °C est le réglage usuel d'un congélateur, 4 °C celui d'un
//   réfrigérateur ; dits « réglés à », comme un modèle.
// Tout le reste (lac de barrage, grotte, cartes, pyramide) est un MODÈLE.
//
// ⭐ LES DESSINS : la droite graduée et ses SAUTS (`droiteRel`, les arcs verts
// vers la droite, rouges vers la gauche), l'axe vertical (`axeVertical`) pour
// ce qui monte et descend pour de vrai, un tableau (`table`), et deux SVG de
// défi : une pyramide de briques (`pyramide`) et un carré magique (`grille`).
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je regarde les signes »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-relatif-operation.mjs`.
//
// Micro-compétences : relatif_addition (1, 2, 4, 7, 8, 11, 13, 14, 15, 16, 19,
// 20), relatif_soustraction (3, 5, 8, 9, 10, 12, 14, 15, 16, 17, 18, 20),
// relatif_calcul (6, 7, 9, 11, 15, 18), relatif_probleme (5, 11, 12, 17, 18,
// 20), relatif_operation_defi (4, 10, 13, 16, 19, 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

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
 * Une droite graduée HORIZONTALE (celle de l'étalon) : une graduation tous les
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
 * Un axe VERTICAL gradué (celui de l'étalon) : les nombres à gauche, les points
 * nommés à droite (écartés de 16 au moins), les flèches d'écart plus à droite,
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
  // Les étiquettes poussées vers le bas agrandissent le dessin plutôt que d'en sortir.
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
          // ⛔ MESURÉ À 375 PX (29/09) : « 23,5 » à droite de la seconde flèche sortait
          // du cadre. Une étiquette qui déborderait passe à GAUCHE de sa flèche.
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * Une PYRAMIDE de briques : chaque brique est la somme des deux briques posées
 * sous elle. `etages` va du sommet à la base ; les briques de `trouvees`
 * ([étage, rang], comptés depuis 0) sont en vert — celles que l'élève a
 * trouvées. « ? » : une brique à trouver. Texte NU.
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

/** Un CARRÉ de nombres (carré magique) : trois lignes de trois cases, « ? » à
 *  trouver, les cases de `trouvees` ([ligne, colonne]) en vert. Texte NU. */
const grille = (cases: string[][], trouvees: [number, number][] = []) => {
  const [C, x0, y0] = [62, 57, 6];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${cases.length * C + 12}`} className="block h-auto w-full" role="img" aria-label="Carré de nombres">
        {cases.map((ligne, i) =>
          ligne.map((v, j) => {
            const vert = trouvees.some(([a, b]) => a === i && b === j);
            return (
              <g key={`${i}-${j}`}>
                <rect x={x0 + j * C} y={y0 + i * C} width={C} height={C} fill={vert ? "#dcfce7" : v === "?" ? "#f1f5f9" : "#fff"} stroke={NOIR} strokeWidth={2} />
                <text x={x0 + j * C + C / 2} y={y0 + i * C + C / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="800" fill={vert ? VERT : NOIR}>
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

export const exercicesRelatifOperation5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "relatif-operation",
  titre: "Les opérations sur les nombres relatifs",
  accroche:
    "Vingt exercices, du geste seul au problème : additionner deux relatifs, soustraire en ajoutant l'opposé, enlever les parenthèses, calculer une suite d'additions et de soustractions. Un congélateur, un lac de barrage, la frise de Rome à Alésia, les fuseaux horaires, une grotte, un jeu de cartes, une pyramide et un carré magique. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et les sauts dessinés sur la droite graduée.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/relatif-operation", titre: "Les opérations sur les nombres relatifs" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde les signes avant d'écrire le moindre chiffre.",
      rappel: [
        "Sur la droite graduée, ajouter un positif fait avancer vers la droite ; ajouter un négatif fait reculer vers la gauche.",
        "Mêmes signes : j'additionne les distances à zéro et je garde le signe.",
        "Signes contraires : je soustrais les distances à zéro et je garde le signe du nombre le plus loin de zéro.",
        "Soustraire un nombre, c'est ajouter son opposé : $5 - (-2) = 5 + 2$. Seul le nombre qu'on enlève change de signe.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) $-9 + (-5)$\nb) $-12 + 7$\nc) $6 + (-15)$\nd) $-3{,}5 + (-2{,}5)$",
          correction:
            "Je regarde d'abord les signes, puis les distances à zéro.\na) Deux négatifs : mêmes signes. J'additionne les distances, $9 + 5 = 14$, et je garde le signe moins : $-9 + (-5) = -14$.\nb) Signes contraires : je soustrais les distances, $12 - 7 = 5$. Le plus loin de zéro est $-12$, je garde son signe : $-12 + 7 = -5$.\nc) Signes contraires : $15 - 6 = 9$, et $-15$ est le plus loin de zéro : $6 + (-15) = -9$.\nd) Deux négatifs : $3{,}5 + 2{,}5 = 6$, donc $-3{,}5 + (-2{,}5) = -6$.\n⛔ Le piège : au b), écrire $-19$ en additionnant les distances. Quand les signes sont contraires, les deux nombres se compensent : je soustrais.\nRéponse : a) $-14$ ; b) $-5$ ; c) $-9$ ; d) $-6$.",
          schema: ecranSeulement(
            droiteRel(-10, 8, 1, [
              { value: 6, label: "départ 6" },
              { value: -9, label: "arrivée −9", color: ROUGE },
            ], { nombres: 2, sauts: [{ de: 6, vers: -9, label: "−15" }] }),
          ),
          micros: ["relatif_addition"],
        },
        {
          enonce: "Sur cette droite graduée, je pars de $3$ et je fais le saut dessiné.\na) Compte la longueur du saut et regarde son sens. Écris l'addition que montre le dessin.\nb) Calcule-la, et vérifie sur le dessin l'abscisse du point A.\nc) Quel saut faut-il faire depuis A pour revenir au départ ?",
          figure: droiteRel(-6, 4, 1, [
            { value: 3, label: "départ" },
            { value: -5, label: "A", color: ROUGE },
          ], { nombres: 2, sauts: [{ de: 3, vers: -5, label: "?" }] }),
          correction:
            "a) Je compte les graduations entre le départ et A : $8$ unités, vers la GAUCHE. Reculer, c'est ajouter un négatif : j'ajoute $-8$. L'addition est $3 + (-8)$.\nb) Signes contraires : $8 - 3 = 5$, et $-8$ est le plus loin de zéro. $3 + (-8) = -5$. Sur le dessin, A est bien à $5$ unités à gauche de zéro.\nc) Pour revenir, je fais le même saut dans l'autre sens : $8$ unités vers la droite, c'est ajouter $8$. $-5 + 8 = 3$.\n⛔ Le piège : lire seulement la longueur du saut et écrire $3 + 8 = 11$. Un saut vers la gauche est un nombre NÉGATIF.\nRéponse : a) $3 + (-8)$ ; b) A a pour abscisse $-5$ ; c) un saut de $+8$.",
          micros: ["relatif_addition"],
        },
        {
          enonce: "Écris chaque soustraction comme une addition, puis calcule.\na) $5 - 11$\nb) $-7 - 6$\nc) $-8 - (-3)$\nd) $2 - (-6{,}5)$",
          correction:
            "Soustraire un nombre, c'est ajouter son opposé. Je change le signe du nombre qu'on enlève, et seulement de lui.\na) $5 - 11 = 5 + (-11) = -6$ : signes contraires, $11 - 5 = 6$, et $-11$ est le plus loin de zéro.\nb) $-7 - 6 = -7 + (-6) = -13$ : deux négatifs, j'additionne les distances.\nc) $-8 - (-3) = -8 + 3 = -5$ : l'opposé de $-3$ est $3$.\nd) $2 - (-6{,}5) = 2 + 6{,}5 = 8{,}5$.\n⛔ Le piège : au c), écrire $-8 - 3 = -11$. Enlever $-3$, c'est AJOUTER $3$ : deux signes moins qui se suivent font plus.\nRéponse : a) $-6$ ; b) $-13$ ; c) $-5$ ; d) $8{,}5$.",
          schema: ecranSeulement(
            table(["je lis", "j'écris", "résultat"], [
              ["5 − 11", "5 + (−11)", "−6"],
              ["−7 − 6", "−7 + (−6)", "−13"],
              ["−8 − (−3)", "−8 + 3", "−5"],
              ["2 − (−6,5)", "2 + 6,5", "8,5"],
            ]),
          ),
          micros: ["relatif_soustraction"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) $-4 + \\ldots = 0$\nb) $6 + \\ldots = 2$\nc) $\\ldots + (-5) = -12$\nd) $-3 + \\ldots = 5$",
          correction:
            "Je cherche de combien il faut se déplacer sur la droite graduée, et dans quel sens.\na) Pour aller de $-4$ à $0$, j'avance de $4$ vers la droite : $-4 + 4 = 0$. Le nombre qui manque est l'opposé de $-4$.\nb) De $6$ à $2$, je recule de $4$ : j'ajoute $-4$. $6 + (-4) = 2$.\nc) Ajouter $-5$ fait reculer de $5$ et arriver à $-12$ : le départ est $5$ unités à droite de $-12$, en $-7$. $-7 + (-5) = -12$.\nd) De $-3$ à $5$ : $3$ unités jusqu'à zéro, puis $5$ de plus, soit $8$ vers la droite. $-3 + 8 = 5$.\n⛔ Le piège : au b), répondre $4$ parce que « de $6$ à $2$, il y a $4$ ». On RECULE : le nombre ajouté est négatif.\nRéponse : a) $4$ ; b) $-4$ ; c) $-7$ ; d) $8$.",
          schema: droiteRel(-4, 6, 1, [
            { value: -3, label: "−3", color: ROUGE },
            { value: 5, label: "5" },
          ], { nombres: 2, sauts: [{ de: -3, vers: 5, label: "+8" }] }),
          micros: ["relatif_addition", "relatif_operation_defi"],
        },
        {
          enonce: "Un congélateur est réglé à $-18$ °C et un réfrigérateur à $4$ °C.\na) Quel est l'écart de température entre les deux appareils ?\nb) On sort un glaçon du congélateur. Il fond quand sa température atteint $0$ °C. De combien de degrés sa température a-t-elle monté ?",
          correction:
            "Un écart se calcule toujours : la température la plus haute moins la plus basse.\na) $4 - (-18) = 4 + 18 = 22$. Sur l'axe : de $-18$ à $0$, il y a $18$ degrés, puis de $0$ à $4$, encore $4$. En tout, $22$.\nb) De $-18$ à $0$ : $0 - (-18) = 0 + 18 = 18$.\n⛔ Le piège : calculer $18 - 4 = 14$. Le congélateur est SOUS zéro : il faut remonter jusqu'à zéro, puis continuer jusqu'à $4$.\nRéponse : a) l'écart est de $22$ °C ; b) sa température a monté de $18$ °C.",
          schema: axeVertical(-20, 5, 5, [
            { value: 4, label: "réfrigérateur 4" },
            { value: 0, label: "glaçon fond 0", color: NOIR },
            { value: -18, label: "congélateur −18", color: ROUGE },
          ], [
            { de: -18, vers: 4, label: "22" },
            { de: -18, vers: 0, label: "18" },
          ]),
          micros: ["relatif_soustraction", "relatif_probleme"],
        },
        {
          enonce: "Calcule $D = -6 + 9 - 11 + 4$ de gauche à droite.",
          correction:
            "Sans parenthèses, je calcule de gauche à droite, un déplacement à la fois.\n$-6 + 9 = 3$ : signes contraires, $9 - 6 = 3$, et $9$ est le plus loin de zéro.\n$3 - 11 = -8$ : je recule de $11$ depuis $3$, je passe sous zéro.\n$-8 + 4 = -4$ : je remonte de $4$, sans atteindre zéro.\n⛔ Le piège : oublier le signe de $-6$ et commencer par $6 + 9 = 15$. Chaque nombre garde le signe écrit juste devant lui.\nRéponse : $D = -4$.",
          schema: droiteRel(-10, 4, 1, [
            { value: -6, label: "départ", color: NOIR },
            { value: -4, label: "arrivée", color: ROUGE },
          ], { nombres: 2, sauts: [{ de: -6, vers: 3, label: "+9" }, { de: 3, vers: -8, label: "−11" }, { de: -8, vers: -4, label: "+4" }] }),
          micros: ["relatif_calcul"],
        },
        {
          enonce: "Calcule astucieusement $B = 17 + (-6) + (-17) + 9 + (-4)$.",
          correction:
            "Dans une somme, je peux changer l'ordre des termes. Je cherche d'abord deux nombres opposés.\n$17$ et $-17$ sont opposés : $17 + (-17) = 0$. Ils s'annulent.\nIl reste $-6 + 9 + (-4)$. $-6 + 9 = 3$, puis $3 + (-4) = -1$.\n⭐ Contrôle de gauche à droite : $17 + (-6) = 11$, $11 + (-17) = -6$, $-6 + 9 = 3$, $3 + (-4) = -1$. Même résultat, avec plus d'étapes.\n⛔ Le piège : voir « $17$ » deux fois et écrire $34$. Un nombre et son opposé ne s'ajoutent pas : ils s'annulent.\nRéponse : $B = -1$.",
          schema: ecranSeulement(
            table(["étape", "calcul"], [
              ["les opposés", "17 + (−17) = 0"],
              ["le reste", "−6 + 9 + (−4) = −1"],
              ["B", "−1"],
            ]),
          ),
          micros: ["relatif_calcul", "relatif_addition"],
        },
        {
          enonce: "Calcule.\na) $-2{,}3 + 4{,}8$\nb) $-1{,}25 - 0{,}75$\nc) $0{,}6 - 1{,}4$\nd) $-0{,}5 - (-0{,}5)$",
          correction:
            "Les règles sont les mêmes avec des décimaux : je regarde les signes, puis les distances à zéro.\na) Signes contraires : $4{,}8 - 2{,}3 = 2{,}5$, et $4{,}8$ est le plus loin de zéro. $-2{,}3 + 4{,}8 = 2{,}5$.\nb) $-1{,}25 - 0{,}75 = -1{,}25 + (-0{,}75) = -2$ : deux négatifs, $1{,}25 + 0{,}75 = 2$.\nc) $0{,}6 - 1{,}4 = 0{,}6 + (-1{,}4) = -0{,}8$ : signes contraires, $1{,}4 - 0{,}6 = 0{,}8$, et $-1{,}4$ l'emporte.\nd) $-0{,}5 - (-0{,}5) = -0{,}5 + 0{,}5 = 0$ : deux nombres opposés.\n⛔ Le piège : au c), écrire $0{,}8$ en oubliant le signe. On enlève plus qu'on n'a : on passe sous zéro.\nRéponse : a) $2{,}5$ ; b) $-2$ ; c) $-0{,}8$ ; d) $0$.",
          schema: ecranSeulement(
            droiteRel(-1, 1, 0.2, [
              { value: 0.6, label: "0,6" },
              { value: -0.8, label: "−0,8", color: ROUGE },
            ], { nombres: 1, sauts: [{ de: 0.6, vers: -0.8, label: "−1,4" }] }),
          ),
          micros: ["relatif_addition", "relatif_soustraction"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je réécris le calcul à chaque étape, et je termine par une phrase.",
      rappel: [
        "Deux signes qui se suivent : pareils, ils font plus ; différents, ils font moins.",
        "Sans parenthèses, une suite d'additions et de soustractions se calcule de gauche à droite.",
        "Un écart, une durée : la plus grande valeur moins la plus petite. Le résultat n'est jamais négatif.",
      ],
      exercices: [
        {
          enonce: "Calcule $C = 3 - (-7) + (-12) - (+4)$.",
          correction:
            "D'abord, j'enlève les parenthèses. Deux signes qui se suivent : pareils, ils font plus ; différents, ils font moins.\n$- (-7)$ devient $+ 7$ ; $+ (-12)$ devient $- 12$ ; $- (+4)$ devient $- 4$.\n$C = 3 + 7 - 12 - 4$.\nPuis de gauche à droite : $3 + 7 = 10$, puis $10 - 12 = -2$, puis $-2 - 4 = -6$.\n⛔ Le piège : recopier $- (-7)$ en $- 7$. Enlever $-7$, c'est ajouter $7$.\nRéponse : $C = -6$.",
          schema: table(["étape", "ce que j'écris"], [
            ["énoncé", "3 − (−7) + (−12) − (+4)"],
            ["sans ( )", "3 + 7 − 12 − 4"],
            ["étape 1", "10 − 12 − 4"],
            ["étape 2", "−2 − 4"],
            ["résultat", "−6"],
          ]),
          micros: ["relatif_soustraction", "relatif_calcul"],
        },
        {
          enonce: "Trois élèves se sont trompés. Trouve l'erreur de chacun, puis corrige.\na) Noé écrit : $-8 + 3 = -11$.\nb) Lina écrit : $-2 - 6 = 4$.\nc) Yanis écrit : $5 - (-5) = 0$.",
          correction:
            "a) Noé a additionné les distances, $8 + 3 = 11$, alors que les signes sont contraires. Il faut les soustraire : $8 - 3 = 5$, et $-8$ est le plus loin de zéro. $-8 + 3 = -5$.\nb) Lina a calculé $6 - 2 = 4$. Or je pars de $-2$ et je recule encore de $6$ : $-2 - 6 = -2 + (-6) = -8$.\nc) Yanis a lu $5 - 5$. Mais on enlève $-5$ : c'est ajouter $5$. $5 - (-5) = 5 + 5 = 10$.\n⭐ Un contrôle rapide au b) : on recule depuis $-2$, le résultat doit être à gauche de $-2$. Le nombre $4$ ne peut pas convenir.\nRéponse : a) $-5$ ; b) $-8$ ; c) $10$.",
          schema: ecranSeulement(
            droiteRel(-2, 12, 1, [
              { value: 5, label: "5" },
              { value: 10, label: "10", color: VERT },
            ], { nombres: 2, sauts: [{ de: 5, vers: 10, label: "− (−5) = +5" }] }),
          ),
          micros: ["relatif_operation_defi", "relatif_soustraction"],
        },
        {
          enonce:
            "Le niveau d'un lac de barrage est mesuré par rapport à son niveau normal, noté $0$. Le 1er juin, il est exactement au niveau normal. Le tableau donne la variation du niveau pendant chaque mois de l'été (chiffres d'un modèle).\na) Quel est le niveau à la fin de juillet ?\nb) Quel est le niveau à la fin de septembre ?\nc) À la fin de quel mois le lac était-il le plus bas ?\nd) De combien le niveau doit-il encore monter pour revenir au niveau normal ?",
          figure: tableau(["mois", "juin", "juil.", "août", "sept."], ["variation (m)", "+0,4", "−1,3", "−0,9", "+0,6"], true),
          correction:
            "Je pars de $0$ et j'ajoute les variations une à une : une hausse est positive, une baisse négative.\nFin juin : $0 + 0{,}4 = 0{,}4$.\na) Fin juillet : $0{,}4 + (-1{,}3) = -0{,}9$. Le lac est à $0{,}9$ m sous son niveau normal.\nFin août : $-0{,}9 + (-0{,}9) = -1{,}8$.\nb) Fin septembre : $-1{,}8 + 0{,}6 = -1{,}2$.\nc) Le plus bas est $-1{,}8$ : c'est à la fin du mois d'août.\nd) Pour aller de $-1{,}2$ à $0$ : $0 - (-1{,}2) = 1{,}2$. Il doit encore monter de $1{,}2$ m.\n⛔ Le piège du b) : additionner les distances sans les signes, $0{,}4 + 1{,}3 + 0{,}9 + 0{,}6 = 3{,}2$. Une baisse et une hausse se compensent.\nRéponse : a) $-0{,}9$ m ; b) $-1{,}2$ m ; c) fin août ; d) $1{,}2$ m.",
          schema: axeVertical(-2, 1, 0.5, [
            { value: 0, label: "1er juin 0", color: NOIR },
            { value: 0.4, label: "fin juin 0,4" },
            { value: -0.9, label: "fin juil. −0,9", color: ROUGE },
            { value: -1.8, label: "fin août −1,8", color: ROUGE },
            { value: -1.2, label: "fin sept. −1,2", color: ROUGE },
          ], [{ de: -1.2, vers: 0, label: "1,2" }]),
          micros: ["relatif_probleme", "relatif_addition", "relatif_calcul"],
        },
        {
          enonce:
            "Voici trois dates de l'histoire antique.\nSelon la légende, Rome est fondée en $753$ av. J.-C.\nHannibal traverse les Alpes avec ses éléphants en $218$ av. J.-C.\nJules César remporte la bataille d'Alésia en $52$ av. J.-C.\na) Écris ces trois dates avec des nombres relatifs.\nb) Combien d'années séparent la fondation de Rome et le passage d'Hannibal ?\nc) Combien d'années séparent le passage d'Hannibal et Alésia ?\nd) Vérifie tes deux réponses avec la durée entre la fondation de Rome et Alésia.",
          correction:
            "a) Avant J.-C., les dates sont négatives : Rome $-753$, Hannibal $-218$, Alésia $-52$.\nb) Une durée, c'est la date la plus récente moins la plus ancienne : $-218 - (-753) = -218 + 753 = 535$. Il s'est passé $535$ ans.\nc) $-52 - (-218) = -52 + 218 = 166$. Il s'est passé $166$ ans.\nd) $-52 - (-753) = -52 + 753 = 701$, et $535 + 166 = 701$ : les deux calculs sont d'accord.\n⛔ Le piège : calculer $-218 - 753 = -971$. On n'enlève pas $753$, on enlève $-753$ : c'est ajouter $753$. Et une durée n'est jamais négative.\nRéponse : b) $535$ ans ; c) $166$ ans ; d) $701$ ans.",
          schema: droiteRel(-800, 0, 100, [
            { value: -753, label: "Rome", color: ROUGE },
            { value: -218, label: "Hannibal", color: ROUGE },
            { value: -52, label: "Alésia", color: ROUGE },
          ], { nombres: 200, sauts: [{ de: -753, vers: -218, label: "535 ans" }, { de: -218, vers: -52, label: "166 ans" }] }),
          micros: ["relatif_probleme", "relatif_soustraction"],
        },
        {
          enonce: "Dans cette pyramide, chaque brique est la somme des deux briques posées juste en dessous d'elle. Complète-la.",
          figure: pyramide([["?"], ["?", "?"], ["?", "−5", "?"], ["−5", "3", "?", "6"]]),
          correction:
            "Je commence par la brique du bas qui manque : au-dessus d'elle et de $3$, il y a $-5$.\nJe cherche le nombre qui, ajouté à $3$, donne $-5$ : $-5 - 3 = -8$. Contrôle : $3 + (-8) = -5$.\nDeuxième rangée en partant du bas : $-5 + 3 = -2$ à gauche, et $-8 + 6 = -2$ à droite.\nRangée suivante : $-2 + (-5) = -7$ et $-5 + (-2) = -7$.\nLe sommet : $-7 + (-7) = -14$.\n⛔ Le piège : écrire $8$ en bas, parce que « $3$ et $5$ font $8$ ». Je vérifie toujours : $3 + 8 = 11$, pas $-5$.\nRéponse : en bas, $-8$ ; puis $-2$ et $-2$ ; puis $-7$ et $-7$ ; au sommet, $-14$.",
          schema: ecranSeulement(pyramide([["−14"], ["−7", "−7"], ["−2", "−5", "−2"], ["−5", "3", "−8", "6"]], [[0, 0], [1, 0], [1, 1], [2, 0], [2, 2], [3, 2]])),
          micros: ["relatif_addition", "relatif_operation_defi"],
        },
        {
          enonce: "Dans cette table d'addition, chaque case est la somme du nombre de sa ligne et du nombre de sa colonne. Complète-la : commence par les deux nombres qui manquent au bord.",
          figure: table(["+", "−4", "…"], [
            ["−6", "…", "−9"],
            ["…", "3", "…"],
            ["1,5", "…", "…"],
          ]),
          correction:
            "Les bords d'abord. Dans la ligne de $-6$, la case $-9$ : je cherche le nombre qui, ajouté à $-6$, donne $-9$. $-9 - (-6) = -9 + 6 = -3$. La colonne qui manque est $-3$.\nDans la colonne de $-4$, la case $3$ : $3 - (-4) = 3 + 4 = 7$. La ligne qui manque est $7$.\nLigne $-6$ : $-6 + (-4) = -10$ ; $-6 + (-3) = -9$.\nLigne $7$ : $7 + (-4) = 3$ ; $7 + (-3) = 4$.\nLigne $1{,}5$ : $1{,}5 + (-4) = -2{,}5$ ; $1{,}5 + (-3) = -1{,}5$.\n⛔ Le piège : trouver le bord qui manque en calculant $-9 - 6 = -15$. Je cherche ce qu'on AJOUTE à $-6$ : c'est $-9 - (-6)$, soit $-3$. Contrôle : $-6 + (-3) = -9$.\nRéponse : la colonne $-3$, la ligne $7$, et les six cases calculées ci-dessus.",
          micros: ["relatif_addition", "relatif_soustraction"],
        },
        {
          enonce: "Écris chaque phrase par un calcul, puis calcule.\na) La somme de $-7$ et de $4{,}5$.\nb) La différence de $-3$ et de $-10$.\nc) J'ajoute $-8$ à l'opposé de $5$.\nd) Je soustrais $6$ à $-2{,}5$.",
          correction:
            "a) Une somme : j'ajoute. $-7 + 4{,}5 = -2{,}5$ : signes contraires, $7 - 4{,}5 = 2{,}5$, et $-7$ l'emporte.\nb) « La différence de $-3$ et de $-10$ », c'est le premier moins le second, dans cet ordre : $-3 - (-10) = -3 + 10 = 7$.\nc) L'opposé de $5$ est $-5$. J'y ajoute $-8$ : $-5 + (-8) = -13$.\nd) Je pars de $-2{,}5$ et j'enlève $6$ : $-2{,}5 - 6 = -8{,}5$.\n⛔ Le piège du d) : écrire $6 - (-2{,}5)$. « Soustraire $6$ à $-2{,}5$ », c'est partir de $-2{,}5$ et enlever $6$.\nRéponse : a) $-2{,}5$ ; b) $7$ ; c) $-13$ ; d) $-8{,}5$.",
          schema: ecranSeulement(
            table(["la phrase", "le calcul", "résultat"], [
              ["somme", "−7 + 4,5", "−2,5"],
              ["différence", "−3 − (−10)", "7"],
              ["opposé", "−5 + (−8)", "−13"],
              ["soustraire", "−2,5 − 6", "−8,5"],
            ]),
          ),
          micros: ["relatif_calcul", "relatif_addition", "relatif_soustraction"],
        },
        {
          enonce: "Sans calculer, dis si le résultat est positif, négatif ou nul. Calcule ensuite pour vérifier.\na) $-47 + 29$\nb) $38 - 52$\nc) $-16 - (-21)$\nd) $-8{,}4 + 8{,}4$",
          correction:
            "J'écris d'abord une addition, puis je regarde quel nombre est le plus loin de zéro : c'est lui qui donne le signe.\na) $-47$ est plus loin de zéro que $29$ : le résultat est négatif. $-47 + 29 = -18$.\nb) $38 - 52 = 38 + (-52)$ : $-52$ l'emporte, le résultat est négatif. $38 - 52 = -14$.\nc) $-16 - (-21) = -16 + 21$ : $21$ l'emporte, le résultat est positif. $-16 - (-21) = 5$.\nd) $-8{,}4$ et $8{,}4$ sont opposés : le résultat est nul. $-8{,}4 + 8{,}4 = 0$.\n⛔ Le piège du c) : « il y a des moins partout, donc c'est négatif ». Enlever un négatif fait AVANCER vers la droite.\nRéponse : a) négatif, $-18$ ; b) négatif, $-14$ ; c) positif, $5$ ; d) nul, $0$.",
          schema: ecranSeulement(
            table(["calcul", "loin de 0", "résultat"], [
              ["−47 + 29", "−47", "−18"],
              ["38 + (−52)", "−52", "−14"],
              ["−16 + 21", "21", "5"],
              ["−8,4 + 8,4", "opposés", "0"],
            ]),
          ),
          micros: ["relatif_operation_defi", "relatif_addition", "relatif_soustraction"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je donne un signe à chaque donnée, puis je réponds par une phrase.",
      rappel: [
        "Une hausse, une montée, un gain sont positifs ; une baisse, une descente, une perte sont négatives.",
        "Un écart entre deux valeurs : la plus grande moins la plus petite.",
        "Je contrôle mon résultat sur un dessin : la droite graduée ou l'axe vertical.",
      ],
      exercices: [
        {
          titre: "Les fuseaux horaires",
          enonce:
            "En hiver, l'heure légale de Paris est en avance d'une heure sur le temps universel : on note $+1$. Celle de New York est en retard de $5$ heures : $-5$. Celle de Tokyo est en avance de $9$ heures : $+9$.\na) Calcule $-5 - (+1)$. Que signifie ce résultat pour un habitant de New York ?\nb) Quel est le décalage horaire entre Tokyo et New York ?\nc) Quand il est $20$ h à Paris, quelle heure est-il à Tokyo ?\nd) Un avion quitte Paris à $10$ h, heure de Paris. Le vol dure $8$ h. Quelle heure est-il à New York quand il atterrit ?",
          correction:
            "a) $-5 - (+1) = -5 - 1 = -6$. New York a $6$ heures de RETARD sur Paris : quand il est midi à Paris, il est $6$ h du matin à New York.\nb) Tokyo moins New York : $9 - (-5) = 9 + 5 = 14$. Tokyo a $14$ heures d'avance sur New York.\nc) Tokyo moins Paris : $9 - 1 = 8$ heures d'avance. $20 + 8 = 28$ : c'est plus que $24$ h, on passe au lendemain. $28 - 24 = 4$ : il est $4$ h du matin à Tokyo, le lendemain.\nd) À l'arrivée, il est $10 + 8 = 18$ h à Paris. New York a $6$ heures de retard : $18 - 6 = 12$. Il est $12$ h, midi, à New York.\n⛔ Le piège du b) : calculer $9 - 5 = 4$. New York est à $-5$, pas à $5$ : entre les deux, il faut passer par zéro.\nRéponse : a) $-6$ ; b) $14$ heures ; c) $4$ h du matin, le lendemain ; d) midi.",
          schema: droiteRel(-6, 10, 1, [
            { value: -5, label: "New York", color: ROUGE },
            { value: 1, label: "Paris" },
            { value: 9, label: "Tokyo", color: VERT },
          ], { nombres: 2, sauts: [{ de: 1, vers: -5, label: "−6" }, { de: -5, vers: 9, label: "+14" }] }),
          micros: ["relatif_probleme", "relatif_soustraction"],
        },
        {
          titre: "La grotte",
          enonce:
            "Une spéléologue prend l'entrée d'une grotte comme repère : l'altitude $0$. Elle descend un puits de $42$ m, remonte de $15$ m le long d'une galerie, puis redescend de $27{,}5$ m jusqu'à une rivière souterraine (chiffres d'un modèle).\na) Écris le calcul de son altitude finale avec des nombres relatifs, puis calcule-la étape par étape.\nb) Une deuxième équipe l'attend à l'altitude $-31$ m. Combien de mètres les séparent ?\nc) De combien de mètres doit-elle remonter pour ressortir de la grotte ?",
          correction:
            "a) Descendre, c'est ajouter un négatif ; remonter, un positif : $0 + (-42) + 15 + (-27{,}5)$.\nAprès le puits : $0 + (-42) = -42$.\nAprès la galerie : $-42 + 15 = -27$.\nÀ la rivière : $-27 + (-27{,}5) = -54{,}5$. Elle est à $-54{,}5$ m.\nb) L'écart, c'est la plus haute moins la plus basse : $-31 - (-54{,}5) = -31 + 54{,}5 = 23{,}5$. Elles sont à $23{,}5$ m l'une de l'autre.\nc) De $-54{,}5$ à $0$ : $0 - (-54{,}5) = 54{,}5$. Elle doit remonter de $54{,}5$ m.\n⭐ Contrôle : elle est descendue de $42 + 27{,}5 = 69{,}5$ m et remontée de $15$ m, et $69{,}5 - 15 = 54{,}5$.\n⛔ Le piège du b) : calculer $-31 - 54{,}5 = -85{,}5$. On enlève $-54{,}5$, pas $54{,}5$ ; et une distance n'est jamais négative.\nRéponse : a) $-54{,}5$ m ; b) $23{,}5$ m ; c) $54{,}5$ m.",
          schema: axeVertical(-60, 0, 10, [
            { value: 0, label: "entrée 0", color: NOIR },
            { value: -27, label: "galerie −27", color: ROUGE },
            { value: -31, label: "équipe 2 −31" },
            { value: -42, label: "puits −42", color: ROUGE },
            { value: -54.5, label: "rivière −54,5", color: ROUGE },
          ], [{ de: -54.5, vers: -31, label: "23,5" }]),
          micros: ["relatif_probleme", "relatif_calcul", "relatif_soustraction"],
        },
        {
          titre: "Le carré magique",
          enonce:
            "Dans un carré magique, les sommes de chaque ligne, de chaque colonne et des deux diagonales sont toutes égales : c'est la somme magique.\na) Calcule la somme de la diagonale déjà complète. C'est la somme magique.\nb) Complète le carré. Explique dans quel ordre tu remplis les cases.\nc) On ajoute $-2$ à chacune des neuf cases. Le carré est-il encore magique ? Quelle est sa nouvelle somme magique ?",
          figure: grille([["−3", "?", "1"], ["?", "0", "?"], ["?", "−2", "3"]]),
          correction:
            "a) La diagonale complète : $-3 + 0 + 3 = 0$. La somme magique est $0$.\nb) Je remplis d'abord une case qui est seule à manquer dans sa ligne ou sa colonne.\nLigne du haut : $-3 + 1 = -2$. Pour revenir à $0$, il manque l'opposé de $-2$, soit $2$. Contrôle : $-3 + 2 + 1 = 0$.\nLigne du bas : $-2 + 3 = 1$, il manque $-1$. Contrôle : $-1 + (-2) + 3 = 0$.\nColonne de gauche : $-3 + (-1) = -4$, il manque $4$.\nLigne du milieu : $4 + 0 = 4$, il manque $-4$.\nDerniers contrôles : la colonne de droite, $1 + (-4) + 3 = 0$ ; l'autre diagonale, $1 + 0 + (-1) = 0$.\nc) Chaque ligne a trois cases : sa somme change de $(-2) + (-2) + (-2) = -6$. C'est pareil pour chaque colonne et chaque diagonale : toutes les sommes valent $0 + (-6) = -6$. Le carré reste magique.\n⛔ Le piège du c) : croire que la somme change de $-2$ seulement. Chaque ligne reçoit $-2$ trois fois.\nRéponse : a) $0$ ; c) oui, la nouvelle somme magique est $-6$.",
          schema: ecranSeulement(grille([["−3", "2", "1"], ["4", "0", "−4"], ["−1", "−2", "3"]], [[0, 1], [1, 0], [1, 2], [2, 0]])),
          micros: ["relatif_operation_defi", "relatif_addition"],
        },
        {
          titre: "La bataille des cartes",
          enonce:
            "Dans un jeu, chaque carte porte un nombre relatif. Le score d'un joueur est la somme de ses cartes, et le plus grand score gagne.\nTom a tiré $-7$, $4$ et $-2{,}5$. Inès a tiré $3$, $-9$ et $1{,}5$.\na) Calcule le score de chacun.\nb) Qui mène ? Avec combien de points d'avance ?\nc) Tom a le droit de tirer une quatrième carte. Les cartes vont de $-10$ à $10$, de $0{,}5$ en $0{,}5$. Quelles cartes lui font gagner la partie ? Donne la plus petite.",
          correction:
            "a) Tom : $-7 + 4 = -3$, puis $-3 + (-2{,}5) = -5{,}5$.\nInès : $3 + (-9) = -6$, puis $-6 + 1{,}5 = -4{,}5$.\nb) $-4{,}5$ est plus proche de zéro que $-5{,}5$ : $-4{,}5 > -5{,}5$. Inès mène.\nSon avance : $-4{,}5 - (-5{,}5) = -4{,}5 + 5{,}5 = 1$. Elle a $1$ point d'avance.\nc) Avec une carte de $1$, Tom arrive à $-5{,}5 + 1 = -4{,}5$ : égalité, il ne gagne pas encore.\nIl lui faut une carte plus grande que $1$. La plus petite est $1{,}5$ : $-5{,}5 + 1{,}5 = -4$, et $-4$ est plus grand que $-4{,}5$.\nToutes les cartes de $1{,}5$ à $10$ le font gagner.\n⛔ Le piège du b) : croire que Tom mène parce que $5{,}5$ est plus grand que $4{,}5$. Chez les négatifs, le plus grand est le plus proche de zéro.\nRéponse : a) Tom $-5{,}5$, Inès $-4{,}5$ ; b) Inès, avec $1$ point d'avance ; c) les cartes de $1{,}5$ à $10$, la plus petite est $1{,}5$.",
          schema: droiteRel(-6, 0, 0.5, [
            { value: -5.5, label: "Tom", color: ROUGE },
            { value: -4.5, label: "Inès" },
            { value: -4, label: "Tom + 1,5", color: VERT },
          ], { nombres: 1, sauts: [{ de: -5.5, vers: -4, label: "+1,5" }] }),
          micros: ["relatif_probleme", "relatif_addition", "relatif_soustraction", "relatif_operation_defi"],
        },
      ],
    },
  ],
};
