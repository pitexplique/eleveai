// ─── Fiche d'exercices : le cercle et le disque (6e) — 20 exercices corrigés ────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` ; aides SVG locales, écrites EN CLAIR, dans
// l'esprit de `grille()` de `maths-5e-sym-centrale.tsx` (étiquettes bornées au
// cadre, direction choisie).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-cercle-disque.tsx` et sur
// la banque `lib/tutor-v4/questionBank/6e/maths/cercle.bank.ts`, notionId
// cercle_disque : centre, rayon, diamètre, corde ; le cercle et le disque
// comme ensembles de points ; problèmes de distance à un point ; le tour
// proportionnel au diamètre ; le périmètre P = π × d avec π ≈ 3,14 ; défis
// (roues, figures composées).
// ⛔ LIMITES DE LA 6e : pas d'AIRE du disque (la banque n'en pose pas) ; π ≈ 3,14
// annoncé ; « je fais le calcul à l'envers » plutôt qu'une équation ; la
// calculatrice est annoncée quand on divise par 3,14.
// ⛔ Aucun exemple de la fiche de cours : ni le rayon de 4 cm, ni le rond-point
// de 20 m, ni la borne à 500 m, ni la chèvre et sa corde de 8 m, ni le disque
// de 1 m et de 3 m, ni le disque de 10 cm de diamètre.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : ils ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : toute corde appelée diamètre (1), diviser au lieu de
// multiplier (2), oublier qu'un point du cercle est dans le disque (3, 7),
// ajouter au lieu de multiplier (4, 15), multiplier le rayon par 3,14 (6, 14),
// multiplier au lieu de faire le calcul à l'envers (8), un seul point commun
// (9), mesurer au lieu d'utiliser le cercle (13), mélanger les unités (11),
// compter le trait intérieur (12), oublier le côté droit (16), un seul virage
// (17), le tour pris pour le diamètre (18), comparer le tour au côté (20), un
// seul arroseur regardé (19).
//
// Un seul fait réel : un CD mesure 12 cm de diamètre (norme du disque compact),
// dit « 6 cm de rayon » à l'exercice 6. Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS :
// - `plan` : des cercles ou des disques, des points, des segments, en vraies
//   coordonnées (en cm ou en m) ; étiquettes posées dans une direction choisie
//   et BORNÉES au cadre ;
// - `deroule` : une roue et son tour « déroulé » en segment, à la même échelle
//   (le tour vaut un peu plus de 3 diamètres : ça se VOIT) ;
// - `piste` : stade, fenêtre ou demi-disque, pour les figures composées ;
// - `mesures` : un petit tableau HTML de 2 ou 3 colonnes.
// 14 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages). Police 14, viewBox de 300 de large au
// plus, AUCUN `min-w`.
//
// Les corrigés sont écrits à la première personne (« je compare »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-cercle-disque.mjs` —
// chaque distance relue sur le dessin, chaque tour refait avec 3,14, les points
// d'intersection des cercles recalculés, la mise en page des étiquettes
// rejouée.
//
// Micro-compétences : cercle_vocabulaire (1, 2, 13, 14), cercle_ensemble (3, 9,
// 13, 19), cercle_distance (7, 9, 19), cercle_proportionnel (4, 10, 15, 18, 20),
// cercle_perimetre (5, 6, 8, 11, 12, 14, 16, 17), cercle_defi (11, 12, 16, 17,
// 18, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ENCRE = "#0f172a";
const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const ORANGE = "#ea580c";
const TAILLE = 14;
const halo = { stroke: "white", strokeWidth: 3, paintOrder: "stroke" as const };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type P2 = [number, number];
type Vers = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";
const SIGNES: Record<Vers, P2> = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-1, -1], hd: [1, -1], bg: [-1, 1], bd: [1, 1] };

/** La boîte d'une étiquette posée à côté du point (x ; y) de l'écran, dans la
 *  direction d, à `e` pixels. ⭐ Le script de recalcul refait ce calcul. */
const boite = (x: number, y: number, t: string, d: Vers, e = 6) => {
  const w = [...t].length * TAILLE * 0.6;
  const [sx, sy] = SIGNES[d];
  const ee = sx !== 0 && sy !== 0 ? e * 0.7 : e;
  return { cx: x + sx * (ee + w / 2), cy: y + sy * (ee + TAILLE / 2), w, h: TAILLE };
};

type Rond = { centre: P2; r: number; disque?: boolean; couleur?: string };
type Pt = { en: P2; nom?: string; vers?: Vers; couleur?: string };
type Seg = { de: P2; a: P2; label?: string; vers?: Vers; couleur?: string; pointilles?: boolean };

/**
 * Un PLAN : des cercles (ou des disques, `disque`), des points nommés, des
 * segments, en VRAIES coordonnées (y vers le haut). Étiquettes en 14, posées
 * dans la direction `vers`, bornées au cadre. ⭐ Le script de recalcul relit
 * chaque coordonnée, mesure chaque distance et rejoue la place des étiquettes.
 */
const plan = (o: { ronds: Rond[]; points?: Pt[]; segments?: Seg[] }) => {
  const xs: number[] = [], ys: number[] = [];
  for (const c of o.ronds) xs.push(c.centre[0] - c.r, c.centre[0] + c.r), ys.push(c.centre[1] - c.r, c.centre[1] + c.r);
  for (const p of o.points ?? []) xs.push(p.en[0]), ys.push(p.en[1]);
  for (const s of o.segments ?? []) xs.push(s.de[0], s.a[0]), ys.push(s.de[1], s.a[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(230 / (x1 - x0), 170 / (y1 - y0));
  const M = 34;
  const W = (x1 - x0) * s + 2 * M, H = (y1 - y0) * s + 2 * M;
  const px = (p: P2): P2 => [M + (p[0] - x0) * s, M + (y1 - p[1]) * s];
  const texte = (x: number, y: number, t: string, d: Vers, couleur: string, k: string) => {
    const b = boite(x, y, t, d);
    const cx = Math.min(Math.max(b.cx, b.w / 2 + 2), W - b.w / 2 - 2);
    const cy = Math.min(Math.max(b.cy, b.h / 2 + 2), H - b.h / 2 - 2);
    return (
      <text key={k} x={cx.toFixed(1)} y={(cy + TAILLE * 0.35).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={couleur} {...halo}>
        {t}
      </text>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} className="block h-auto w-full" role="img" aria-label="Cercles, points et segments dessinés à l'échelle">
        {o.ronds.map((c, i) => {
          const [cx, cy] = px(c.centre);
          const coul = c.couleur ?? BLEU;
          return <circle key={`c${i}`} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r={(c.r * s).toFixed(1)} fill={c.disque ? coul : "none"} fillOpacity={c.disque ? 0.14 : undefined} stroke={coul} strokeWidth={2.4} />;
        })}
        {(o.segments ?? []).map((g, i) => {
          const [a, b] = [px(g.de), px(g.a)];
          return <line key={`s${i}`} x1={a[0].toFixed(1)} y1={a[1].toFixed(1)} x2={b[0].toFixed(1)} y2={b[1].toFixed(1)} stroke={g.couleur ?? ROUGE} strokeWidth={g.pointilles ? 1.8 : 2.6} strokeDasharray={g.pointilles ? "5 4" : undefined} strokeLinecap="round" />;
        })}
        {(o.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          return <circle key={`p${i}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={p.nom ? 3.5 : 3} fill={p.couleur ?? ENCRE} />;
        })}
        {(o.segments ?? []).map((g, i) => {
          if (!g.label) return null;
          const [a, b] = [px(g.de), px(g.a)];
          return texte((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, g.label, g.vers ?? "h", g.couleur ?? ROUGE, `sl${i}`);
        })}
        {(o.points ?? []).map((p, i) => (p.nom ? texte(...px(p.en), p.nom, p.vers ?? "hd", p.couleur ?? ENCRE, `pl${i}`) : null))}
      </svg>
    </div>
  );
};

/**
 * Des ROUES et leur tour DÉROULÉ, à la même échelle : à gauche la roue posée
 * au sol (son diamètre tracé), à droite un segment rouge de longueur 3,14 × d.
 * `diametre` s'écrit sous la roue, `tour` au-dessus du segment. ⭐ Le script de
 * recalcul relit d et le nombre écrit dans `tour`.
 */
const deroule = (liste: { d: number; diametre: string; tour: string }[]) => {
  const s = 230 / (4.14 * Math.max(...liste.map((q) => q.d)));
  const G = 8;
  let y = 24;
  const dessin: ReactNode[] = [];
  liste.forEach((q, i) => {
    const R = (q.d * s) / 2;
    const sol = y + 2 * R;
    const xs = G + 2 * R + 12;
    const L = 3.14 * q.d * s;
    dessin.push(
      <circle key={`r${i}`} cx={(G + R).toFixed(1)} cy={(y + R).toFixed(1)} r={R.toFixed(1)} fill={BLEU} fillOpacity={0.12} stroke={BLEU} strokeWidth={2.2} />,
      <line key={`d${i}`} x1={G} y1={(y + R).toFixed(1)} x2={(G + 2 * R).toFixed(1)} y2={(y + R).toFixed(1)} stroke={VERT} strokeWidth={2} />,
      <line key={`t${i}`} x1={xs.toFixed(1)} y1={sol.toFixed(1)} x2={(xs + L).toFixed(1)} y2={sol.toFixed(1)} stroke={ROUGE} strokeWidth={4} strokeLinecap="round" />,
      <text key={`a${i}`} x={G} y={(sol + 18).toFixed(1)} fontSize={TAILLE} fontWeight={900} fill={VERT}>
        {q.diametre}
      </text>,
      <text key={`b${i}`} x={(xs + L / 2).toFixed(1)} y={(sol - 8).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={ROUGE}>
        {q.tour}
      </text>,
    );
    y = sol + 44;
  });
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${(y - 16).toFixed(1)}`} className="block h-auto w-full" role="img" aria-label={`Roue et tour déroulé : ${liste.map((q) => q.tour).join(" ; ")}`}>
        {dessin}
      </svg>
    </div>
  );
};

/**
 * Une FIGURE COMPOSÉE : `stade` (un rectangle de longueur L et de largeur d,
 * un demi-disque à chaque bout), `fenetre` (un rectangle de d de large et L de
 * haut, un demi-disque dessus) ou `demi` (un demi-disque de diamètre d). Le
 * contour en bleu épais ; les diamètres intérieurs en pointillés.
 */
const piste = (forme: "stade" | "fenetre" | "demi", L: number, d: number, cotes: { L?: string; d?: string } = {}) => {
  const R0 = d / 2;
  const [lw, lh] = forme === "stade" ? [L + d, d] : forme === "fenetre" ? [d, L + R0] : [d, R0];
  // G = 52 : la cote « 10 dm » (42 px) tient à droite de la fenêtre.
  const s = Math.min(190 / lw, 150 / lh);
  const R = R0 * s;
  const G = 52, Hh = 30;
  const W = lw * s + 2 * G, H = lh * s + 2 * Hh;
  const trait = { fill: "#dbeafe", stroke: BLEU, strokeWidth: 3, strokeLinejoin: "round" as const };
  const tiret = { stroke: ORANGE, strokeWidth: 1.8, strokeDasharray: "5 4" };
  const t = (x: number, y: number, txt: string, a: "start" | "middle" | "end", k: string) => (
    <text key={k} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={a} fontSize={TAILLE} fontWeight={900} fill={ROUGE} {...halo}>
      {txt}
    </text>
  );
  let corps: ReactNode;
  if (forme === "stade") {
    const [a, b, hy, by] = [G + R, G + R + L * s, Hh, Hh + 2 * R];
    corps = (
      <>
        <path d={`M ${a} ${hy} L ${b} ${hy} A ${R} ${R} 0 0 1 ${b} ${by} L ${a} ${by} A ${R} ${R} 0 0 1 ${a} ${hy} Z`} {...trait} />
        <line x1={a} y1={hy} x2={a} y2={by} {...tiret} />
        <line x1={b} y1={hy} x2={b} y2={by} {...tiret} />
        {cotes.L ? t((a + b) / 2, hy - 8, cotes.L, "middle", "L") : null}
        {cotes.d ? t(a + 6, (hy + by) / 2 + 5, cotes.d, "start", "d") : null}
      </>
    );
  } else if (forme === "fenetre") {
    const [g, dr, hr, bas] = [G, G + 2 * R, Hh + R, Hh + R + L * s];
    corps = (
      <>
        <path d={`M ${g} ${bas} L ${g} ${hr} A ${R} ${R} 0 0 1 ${dr} ${hr} L ${dr} ${bas} Z`} {...trait} />
        <line x1={g} y1={hr} x2={dr} y2={hr} {...tiret} />
        {cotes.d ? t((g + dr) / 2, bas + 20, cotes.d, "middle", "d") : null}
        {cotes.L ? t(dr + 6, (hr + bas) / 2 + 5, cotes.L, "start", "L") : null}
      </>
    );
  } else {
    const [g, dr, base] = [G, G + 2 * R, Hh + R];
    corps = (
      <>
        <path d={`M ${g} ${base} A ${R} ${R} 0 0 1 ${dr} ${base} Z`} {...trait} />
        {cotes.d ? t((g + dr) / 2, base + 20, cotes.d, "middle", "d") : null}
      </>
    );
  }
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} className="block h-auto w-full" role="img" aria-label={`Figure composée : ${[cotes.L, cotes.d].filter(Boolean).join(", ")}`}>
        {corps}
      </svg>
    </div>
  );
};

/** Un petit tableau de mesures, en HTML (2 ou 3 colonnes courtes). */
const mesures = (entetes: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    <table className="w-full border-collapse text-center text-sm">
      <thead>
        <tr>
          {entetes.map((e) => (
            <th key={e} className="border border-slate-400 bg-orange-50 px-2 py-1 font-black text-slate-900">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-400 px-2 py-1 font-bold text-slate-800">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesCercleDisque6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "cercle-disque",
  titre: "Le cercle et le disque",
  accroche:
    "Vingt exercices, du geste seul au problème : nommer rayon, diamètre et corde, dire si un point est sur le cercle, dans le disque ou dehors, trouver des points à une distance donnée, voir que le tour est proportionnel au diamètre, calculer un périmètre avec π ≈ 3,14. Un chien et sa laisse, une horloge, une fenêtre, une piste, une ronde dans la cour. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/cercle-disque", titre: "Le cercle et le disque" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je repère le centre, le rayon ou le diamètre, puis je réponds.",
      rappel: [
        "Le cercle de centre O : tous les points à la même distance de O.",
        "Le rayon va du centre au cercle. Le diamètre vaut 2 rayons.",
        "Le disque, c'est le cercle et tout l'intérieur.",
        "Le tour du disque : 3,14 × diamètre (π ≈ 3,14).",
      ],
      exercices: [
        {
          enonce: "Sur la figure, O est le centre du cercle.\nComment s'appellent les segments $[OA]$, $[BC]$ et $[DE]$ ?",
          figure: plan({
            ronds: [{ centre: [0, 0], r: 3 }],
            points: [
              { en: [0, 0], nom: "O", vers: "b" },
              { en: [1.5, 2.6], nom: "A", vers: "hd" },
              { en: [-3, 0], nom: "B", vers: "g" },
              { en: [3, 0], nom: "C", vers: "d" },
              { en: [-1.03, -2.82], nom: "D", vers: "bg" },
              { en: [2.3, -1.93], nom: "E", vers: "bd" },
            ],
            segments: [
              { de: [0, 0], a: [1.5, 2.6] },
              { de: [-3, 0], a: [3, 0], couleur: VERT },
              { de: [-1.03, -2.82], a: [2.3, -1.93], couleur: ORANGE },
            ],
          }),
          correction:
            "$[OA]$ va du centre à un point du cercle : c'est un rayon.\n$[BC]$ joint deux points du cercle en passant par O : c'est un diamètre.\n$[DE]$ joint deux points du cercle sans passer par O : c'est une corde.\n⛔ Le piège : appeler « diamètre » toute corde. Un diamètre passe toujours par le centre.\nRéponse : $[OA]$ est un rayon, $[BC]$ un diamètre, $[DE]$ une corde.",
          micros: ["cercle_vocabulaire"],
        },
        {
          enonce: "a) Un cercle a un rayon de $8$ cm. Quel est son diamètre ?\nb) Un autre cercle a un diamètre de $9$ cm. Quel est son rayon ?",
          correction:
            "a) Le diamètre vaut deux rayons.\n$8 \\times 2 = 16$ cm.\nb) Le rayon est la moitié du diamètre.\n$9 \\div 2 = 4{,}5$ cm.\n⛔ Le piège : diviser quand il faut multiplier. Le diamètre est toujours le plus long.\nRéponse : a) $16$ cm ; b) $4{,}5$ cm.",
          schema: ecranSeulement(
            plan({
              ronds: [
                { centre: [0, 0], r: 8 },
                { centre: [19, 0], r: 4.5 },
              ],
              segments: [
                { de: [0, 0], a: [8, 0], label: "8 cm", vers: "h" },
                { de: [14.5, 0], a: [23.5, 0], label: "9 cm", vers: "h", couleur: VERT },
              ],
            }),
          ),
          micros: ["cercle_vocabulaire"],
        },
        {
          enonce: "Le disque a pour centre O et pour rayon $3$ cm.\nOn sait que $OM = 3$ cm, $ON = 2$ cm et $OP = 4$ cm.\na) Quel point est sur le cercle ?\nb) Quels points sont dans le disque ?\nc) Quel point est en dehors ?",
          figure: plan({
            ronds: [{ centre: [0, 0], r: 3, disque: true }],
            points: [
              { en: [0, 0], nom: "O", vers: "b" },
              { en: [2.6, 1.5], nom: "M", vers: "d" },
              { en: [-1.88, -0.68], nom: "N", vers: "b" },
              { en: [-2, 3.46], nom: "P", vers: "hg" },
            ],
          }),
          correction:
            "Je compare chaque distance au rayon, $3$ cm.\n$OM = 3$ cm, pile le rayon : M est sur le cercle.\n$ON = 2$ cm, moins que le rayon : N est à l'intérieur.\n$OP = 4$ cm, plus que le rayon : P est dehors.\nLe disque, c'est le cercle et l'intérieur. M et N sont donc dans le disque.\n⛔ Le piège : oublier M. Un point du cercle est aussi dans le disque.\nRéponse : a) M ; b) M et N ; c) P.",
          micros: ["cercle_ensemble"],
        },
        {
          enonce: "Un disque de $2$ cm de diamètre a un tour de $6{,}28$ cm.\nLe tour est proportionnel au diamètre.\na) Quel est le tour d'un disque de $6$ cm de diamètre ?\nb) Et d'un disque de $20$ cm de diamètre ?",
          correction:
            "a) $6$ cm, c'est $3$ fois $2$ cm, car $2 \\times 3 = 6$.\nLe tour est donc $3$ fois plus grand : $6{,}28 \\times 3 = 18{,}84$ cm.\nb) $20$ cm, c'est $10$ fois $2$ cm.\n$6{,}28 \\times 10 = 62{,}8$ cm.\n⛔ Le piège : ajouter. $6$ cm, ce n'est pas « $4$ cm de plus » : c'est « $3$ fois plus ».\nRéponse : a) $18{,}84$ cm ; b) $62{,}8$ cm.",
          schema: mesures(["Diamètre", "Tour"], [["2 cm", "6,28 cm"], ["6 cm", "18,84 cm"], ["20 cm", "62,8 cm"]]),
          micros: ["cercle_proportionnel"],
        },
        {
          enonce: "Un biscuit rond a un diamètre de $7$ cm.\nOn l'entoure d'un ruban.\nQuelle longueur de ruban faut-il ? On prend $\\pi \\approx 3{,}14$.",
          correction:
            "Le ruban fait le tour du biscuit : c'est son périmètre.\nPérimètre $= \\pi \\times$ diamètre.\n$3{,}14 \\times 7 = 21{,}98$ cm.\n⭐ Je vérifie : c'est un peu plus de $3$ fois $7$, donc un peu plus de $21$.\n⚠️ Le résultat est approché, car $3{,}14$ n'est qu'une valeur approchée de $\\pi$.\nRéponse : environ $21{,}98$ cm de ruban.",
          schema: ecranSeulement(
            plan({
              ronds: [{ centre: [0, 0], r: 3.5 }],
              points: [{ en: [0, 0], nom: "O", vers: "h" }],
              segments: [{ de: [-3.5, 0], a: [3.5, 0], label: "7 cm", vers: "b", couleur: VERT }],
            }),
          ),
          micros: ["cercle_perimetre"],
        },
        {
          enonce: "Un CD est un disque de $6$ cm de rayon.\nCalcule son périmètre. On prend $\\pi \\approx 3{,}14$.",
          correction:
            "La formule utilise le diamètre. Je le cherche d'abord.\n$6 \\times 2 = 12$ cm.\nPérimètre : $3{,}14 \\times 12 = 37{,}68$ cm.\n⛔ Le piège : calculer $3{,}14 \\times 6 = 18{,}84$. Avec le rayon, on ne trouve que la moitié du tour.\nRéponse : environ $37{,}68$ cm.",
          schema: ecranSeulement(
            plan({
              ronds: [{ centre: [0, 0], r: 6 }],
              points: [{ en: [0, 0], nom: "O", vers: "b" }],
              segments: [{ de: [0, 0], a: [6, 0], label: "6 cm", vers: "h" }],
            }),
          ),
          micros: ["cercle_perimetre"],
        },
        {
          enonce:
            "Le chien Pixel est attaché à un piquet P par une laisse de $3$ m.\nSa gamelle G est à $2{,}5$ m de P. Sa niche N est à $3$ m de P. Sa balle B est à $3{,}5$ m de P.\na) Quelle est la forme de la zone où il peut aller ?\nb) Peut-il atteindre G, N et B ?",
          figure: plan({
            ronds: [{ centre: [0, 0], r: 3, disque: true, couleur: VERT }],
            points: [
              { en: [0, 0], nom: "P", vers: "b" },
              { en: [-2.17, 1.25], nom: "G", vers: "d" },
              { en: [2.6, 1.5], nom: "N", vers: "d" },
              { en: [1.75, -3.03], nom: "B", vers: "d" },
            ],
          }),
          correction:
            "a) Pixel peut aller partout à $3$ m ou moins de P.\nC'est le disque de centre P et de rayon $3$ m.\nb) G : $2{,}5 < 3$. Oui, G est dans le disque.\nN : $3 = 3$. Oui, tout juste : N est sur le cercle.\nB : $3{,}5 > 3$. Non, B est hors du disque.\n⛔ Le piège : dire non pour N. La laisse bien tendue arrive pile à N.\nRéponse : a) un disque de rayon $3$ m ; b) G oui, N oui, B non.",
          micros: ["cercle_distance"],
        },
        {
          enonce: "La roue d'une brouette a un tour de $125{,}6$ cm.\nQuel est son diamètre ? On prend $\\pi \\approx 3{,}14$. La calculatrice est permise.",
          correction:
            "Tour $= 3{,}14 \\times$ diamètre.\nJe fais le calcul à l'envers : je divise par $3{,}14$.\n$125{,}6 \\div 3{,}14 = 40$ cm.\nJe vérifie : $3{,}14 \\times 40 = 125{,}6$. C'est juste.\n⛔ Le piège : multiplier encore par $3{,}14$. On cherche le diamètre : on remonte le calcul.\nRéponse : $40$ cm.",
          schema: ecranSeulement(deroule([{ d: 40, diametre: "d = 40 cm", tour: "tour : 125,6 cm" }])),
          micros: ["cercle_perimetre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions. Je fais un dessin à main levée, je repère le diamètre, puis je calcule.",
      rappel: [
        "Diamètre = 2 × rayon.",
        "Diamètre 2 fois plus grand : tour 2 fois plus grand. Le tour est proportionnel au diamètre.",
        "Tour du disque = 3,14 × diamètre (valeur approchée).",
        "Les points à 3 cm de A forment le cercle de centre A et de rayon 3 cm.",
      ],
      exercices: [
        {
          enonce: "Deux points A et B sont à $6$ cm l'un de l'autre.\na) Où sont les points à $4$ cm de A ?\nb) Où sont les points à $3$ cm de B ?\nc) Combien de points sont à la fois à $4$ cm de A et à $3$ cm de B ?\nd) Et à la fois à $1$ cm de A et à $2$ cm de B ?",
          correction:
            "a) Sur le cercle de centre A et de rayon $4$ cm.\nb) Sur le cercle de centre B et de rayon $3$ cm.\nc) Je trace les deux cercles. Ils se coupent en deux points, M et N.\nM et N sont sur les deux cercles à la fois.\nd) Les deux cercles sont trop petits : $1 + 2 = 3$, moins que $6$.\nIls ne se touchent pas. Il n'y a aucun point.\n⛔ Le piège : chercher un seul point. Deux cercles qui se coupent ont deux points communs.\nRéponse : a) et b) sur deux cercles ; c) $2$ points ; d) aucun.",
          schema: plan({
            ronds: [
              { centre: [0, 0], r: 4 },
              { centre: [6, 0], r: 3, couleur: VERT },
            ],
            points: [
              { en: [0, 0], nom: "A", vers: "g" },
              { en: [6, 0], nom: "B", vers: "d" },
              { en: [3.58, 1.78], nom: "M", vers: "h" },
              { en: [3.58, -1.78], nom: "N", vers: "b" },
            ],
            segments: [{ de: [0, 0], a: [6, 0], couleur: ENCRE }],
          }),
          micros: ["cercle_distance", "cercle_ensemble"],
        },
        {
          enonce: "Lina mesure le tour de trois objets ronds avec une ficelle.\na) Pour chaque objet, calcule tour ÷ diamètre. Arrondis au centième.\nb) Que remarques-tu ?\nc) Sans mesurer, donne le tour d'un disque de $30$ cm de diamètre.",
          figure: mesures(["Objet", "Diamètre", "Tour"], [["verre", "8 cm", "25,1 cm"], ["assiette", "24 cm", "75,4 cm"], ["bassine", "40 cm", "125,6 cm"]]),
          correction:
            "a) Verre : $25{,}1 \\div 8 \\approx 3{,}14$.\nAssiette : $75{,}4 \\div 24 \\approx 3{,}14$.\nBassine : $125{,}6 \\div 40 = 3{,}14$.\nb) On trouve toujours à peu près $3{,}14$. C'est le nombre $\\pi$.\nLe tour est proportionnel au diamètre.\nc) $3{,}14 \\times 30 = 94{,}2$ cm.\n⚠️ Une ficelle ne mesure pas parfaitement. C'est pour cela qu'on arrondit.\nRéponse : a) environ $3{,}14$ chaque fois ; b) toujours le même nombre ; c) $94{,}2$ cm.",
          micros: ["cercle_proportionnel"],
        },
        {
          enonce: "La roue d'un vélo d'enfant a un diamètre de $50$ cm.\na) Quelle distance le vélo parcourt-il quand la roue fait un tour ?\nb) Et en $10$ tours ? Donne la réponse en mètres.\nc) Combien de tours faut-il pour parcourir $314$ m ?",
          correction:
            "a) En un tour, le vélo avance de la longueur du tour de la roue.\n$3{,}14 \\times 50 = 157$ cm.\nb) $157 \\times 10 = 1\\,570$ cm, soit $15{,}7$ m.\nc) Je mets tout en cm : $314$ m $= 31\\,400$ cm.\n$31\\,400 \\div 157 = 200$ tours.\n⛔ Le piège : diviser des mètres par des centimètres. Je mets tout dans la même unité.\nRéponse : a) $157$ cm ; b) $15{,}7$ m ; c) $200$ tours.",
          schema: deroule([{ d: 50, diametre: "d = 50 cm", tour: "1 tour : 157 cm" }]),
          micros: ["cercle_perimetre", "cercle_defi"],
        },
        {
          enonce: "Une fenêtre est un rectangle surmonté d'un demi-disque.\nLe rectangle mesure $8$ dm de large et $10$ dm de haut.\nOn pose un joint tout autour de la fenêtre. Quelle longueur de joint faut-il ?",
          figure: piste("fenetre", 10, 8, { L: "10 dm", d: "8 dm" }),
          correction:
            "Le tour se fait en trois morceaux.\nLes deux côtés droits : $10 + 10 = 20$ dm.\nLe bas : $8$ dm.\nLe haut est un demi-cercle de diamètre $8$ dm.\nUn cercle entier ferait $3{,}14 \\times 8 = 25{,}12$ dm.\nLa moitié : $25{,}12 \\div 2 = 12{,}56$ dm.\nEn tout : $20 + 8 + 12{,}56 = 40{,}56$ dm.\n⛔ Le piège : compter le trait en pointillés. Il est à l'intérieur : le joint n'y passe pas.\nRéponse : environ $40{,}56$ dm.",
          micros: ["cercle_perimetre", "cercle_defi"],
        },
        {
          enonce: "A, B et C sont sur le cercle de centre O. On sait que $OA = 4{,}5$ cm.\na) Combien mesurent $OB$ et $OC$ ?\nb) $[AB]$ passe par O. Comment s'appelle $[AB]$ ? Quelle est sa longueur ?\nc) $[AC]$ ne passe pas par O. Comment s'appelle $[AC]$ ? Est-il plus long que $[AB]$ ?",
          figure: plan({
            ronds: [{ centre: [0, 0], r: 4.5 }],
            points: [
              { en: [0, 0], nom: "O", vers: "h" },
              { en: [-3.9, 2.25], nom: "A", vers: "hg" },
              { en: [3.9, -2.25], nom: "B", vers: "bd" },
              { en: [2.25, 3.9], nom: "C", vers: "hd" },
            ],
            segments: [
              { de: [-3.9, 2.25], a: [3.9, -2.25], couleur: VERT },
              { de: [-3.9, 2.25], a: [2.25, 3.9], couleur: ORANGE },
            ],
          }),
          correction:
            "a) Tous les points du cercle sont à la même distance du centre.\n$OB = OC = 4{,}5$ cm.\nb) $[AB]$ passe par le centre : c'est un diamètre.\n$AB = 4{,}5 \\times 2 = 9$ cm.\nc) $[AC]$ est une corde.\nUne corde est plus courte qu'un diamètre. Le diamètre est la plus longue des cordes.\n⛔ Le piège : mesurer OB à la règle. Le cercle suffit : $OB$ est un rayon.\nRéponse : a) $4{,}5$ cm chacun ; b) un diamètre, $9$ cm ; c) une corde, plus courte.",
          micros: ["cercle_vocabulaire", "cercle_ensemble"],
        },
        {
          enonce: "La grande aiguille d'une horloge mesure $12$ cm.\nEn une heure, son bout fait un tour complet.\na) Quel est le rayon de ce cercle ? Et son diamètre ?\nb) Quelle distance parcourt le bout de l'aiguille en une heure ?\nc) Et en un quart d'heure ?",
          figure: plan({
            ronds: [{ centre: [0, 0], r: 12 }],
            points: [
              { en: [0, 0], nom: "O", vers: "b" },
              { en: [0, 12], nom: "M", vers: "hd" },
            ],
            segments: [{ de: [0, 0], a: [0, 12], label: "12 cm", vers: "d" }],
          }),
          correction:
            "a) L'aiguille va du centre au bord : c'est un rayon, $12$ cm.\nLe diamètre vaut $12 \\times 2 = 24$ cm.\nb) En une heure, le bout fait un tour complet.\n$3{,}14 \\times 24 = 75{,}36$ cm.\nc) Un quart d'heure, c'est un quart de tour.\n$75{,}36 \\div 4 = 18{,}84$ cm.\n⛔ Le piège : prendre $12$ cm pour le diamètre. L'aiguille part du centre : c'est un rayon.\nRéponse : a) $12$ cm et $24$ cm ; b) environ $75{,}36$ cm ; c) environ $18{,}84$ cm.",
          micros: ["cercle_perimetre", "cercle_vocabulaire"],
        },
        {
          enonce: "La roue A a un diamètre de $30$ cm. Son tour mesure $94{,}2$ cm.\nLa roue B a un diamètre $3$ fois plus grand.\na) Quel est le diamètre de B ?\nb) Trouve le tour de B sans la formule.\nc) Vérifie avec la formule.",
          correction:
            "a) $30 \\times 3 = 90$ cm.\nb) Le tour est proportionnel au diamètre.\nDiamètre $3$ fois plus grand, tour $3$ fois plus grand.\n$94{,}2 \\times 3 = 282{,}6$ cm.\nc) $3{,}14 \\times 90 = 282{,}6$ cm. On retrouve le même nombre.\n⛔ Le piège : ajouter $60$ cm au tour, comme au diamètre. Le tour est multiplié, pas augmenté.\nRéponse : a) $90$ cm ; b) et c) $282{,}6$ cm.",
          schema: ecranSeulement(
            deroule([
              { d: 30, diametre: "A : 30 cm", tour: "94,2 cm" },
              { d: 90, diametre: "B : 90 cm", tour: "282,6 cm" },
            ]),
          ),
          micros: ["cercle_proportionnel", "cercle_perimetre"],
        },
        {
          enonce: "Un rapporteur a la forme d'un demi-disque de $10$ cm de diamètre.\nQuel est le périmètre du rapporteur ?",
          figure: piste("demi", 0, 10, { d: "10 cm" }),
          correction:
            "Le tour a deux morceaux : l'arrondi et le côté droit.\nUn cercle entier ferait $3{,}14 \\times 10 = 31{,}4$ cm.\nL'arrondi est la moitié : $31{,}4 \\div 2 = 15{,}7$ cm.\nLe côté droit est le diamètre : $10$ cm.\n$15{,}7 + 10 = 25{,}7$ cm.\n⛔ Le piège : oublier le côté droit. Le périmètre fait tout le tour.\nRéponse : environ $25{,}7$ cm.",
          micros: ["cercle_perimetre", "cercle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je repère les cercles, je calcule chaque morceau, puis je réponds par une phrase.",
      rappel: [
        "Je repère le rayon ou le diamètre avant de calculer.",
        "Tour = 3,14 × diamètre. Un demi-cercle : la moitié.",
        "Je mets toutes les longueurs dans la même unité.",
      ],
      exercices: [
        {
          titre: "La piste du collège",
          enonce:
            "La piste d'un collège a deux lignes droites de $80$ m.\nSes deux virages sont des demi-cercles de $60$ m de diamètre.\na) Quelle longueur font les deux lignes droites ?\nb) Les deux virages forment un cercle entier. Quelle est sa longueur ?\nc) Quelle est la longueur d'un tour de piste ?\nd) Sami fait $3$ tours. Court-il plus de $1$ km ?",
          figure: piste("stade", 80, 60, { L: "80 m", d: "60 m" }),
          correction:
            "a) $80 + 80 = 160$ m.\nb) Deux demi-cercles font un cercle de $60$ m de diamètre.\n$3{,}14 \\times 60 = 188{,}4$ m.\nc) $160 + 188{,}4 = 348{,}4$ m.\nd) $348{,}4 \\times 3 = 1\\,045{,}2$ m.\n$1$ km $= 1\\,000$ m, et $1\\,045{,}2 > 1\\,000$.\nOui, Sami court un peu plus de $1$ km.\n⛔ Le piège : compter un seul virage. La piste en a deux.\nRéponse : a) $160$ m ; b) $188{,}4$ m ; c) $348{,}4$ m ; d) oui, $1\\,045{,}2$ m.",
          micros: ["cercle_perimetre", "cercle_defi"],
        },
        {
          titre: "La roue du géomètre",
          enonce:
            "Une géomètre mesure un chemin avec une roue. La roue fait $1$ m de tour, soit $100$ cm.\nÀ chaque tour, un compteur fait « clic ».\na) Elle entend $45$ clics. Quelle est la longueur du chemin ?\nb) Quel est le diamètre de la roue, au millimètre près ? La calculatrice est permise.\nc) Une roue de diamètre $2$ fois plus grand aurait quel tour ?",
          correction:
            "a) Un clic, c'est $1$ m. $45$ clics : $45 \\times 1 = 45$ m.\nb) Tour $= 3{,}14 \\times$ diamètre.\nJe fais le calcul à l'envers : $100 \\div 3{,}14 \\approx 31{,}8$ cm.\nc) Le tour est proportionnel au diamètre.\nDiamètre $2$ fois plus grand : tour $2$ fois plus grand, soit $2$ m.\n⛔ Le piège : croire que la roue fait $1$ m de diamètre. C'est son tour qui fait $1$ m.\nRéponse : a) $45$ m ; b) environ $31{,}8$ cm ; c) $2$ m.",
          schema: ecranSeulement(deroule([{ d: 31.85, diametre: "d = 31,8 cm", tour: "tour : 100 cm" }])),
          micros: ["cercle_proportionnel", "cercle_defi", "cercle_perimetre"],
        },
        {
          titre: "Les deux arroseurs",
          enonce:
            "Deux arroseurs A et B sont à $7$ m l'un de l'autre.\nA arrose jusqu'à $5$ m. B arrose jusqu'à $4$ m.\nP est à $4$ m de A et à $4$ m de B.\nQ est à $6$ m de A et à $2$ m de B.\nR est à $3$ m de A et à $6$ m de B.\nS est à $6$ m de A et à $5$ m de B.\na) Quelle forme a la zone arrosée par A ?\nb) Pour chaque plante, dis qui l'arrose.\nc) Quelle plante reste au sec ?",
          figure: plan({
            ronds: [
              { centre: [0, 0], r: 5, disque: true },
              { centre: [7, 0], r: 4, disque: true, couleur: VERT },
            ],
            points: [
              { en: [0, 0], nom: "A", vers: "b" },
              { en: [7, 0], nom: "B", vers: "b" },
              { en: [3.5, 1.94], nom: "P", vers: "h" },
              { en: [5.79, 1.59], nom: "Q", vers: "d" },
              { en: [1.57, 2.56], nom: "R", vers: "h" },
              { en: [4.29, 4.2], nom: "S", vers: "d" },
            ],
          }),
          correction:
            "a) A arrose tout ce qui est à $5$ m ou moins.\nC'est un disque de centre A et de rayon $5$ m.\nb) Pour chaque plante, je compare les distances aux portées, $5$ m et $4$ m.\nP : $4 < 5$, A l'arrose. $4 = 4$, B aussi, tout juste.\nQ : $6 > 5$, pas A. $2 < 4$, B l'arrose.\nR : $3 < 5$, A l'arrose. $6 > 4$, pas B.\nS : $6 > 5$ et $5 > 4$. Ni A, ni B.\nc) S reste au sec.\n⛔ Le piège : regarder un seul arroseur. Je compare chaque distance à la bonne portée.\nRéponse : a) un disque de rayon $5$ m ; b) P : A et B ; Q : B ; R : A ; S : aucun ; c) S.",
          micros: ["cercle_distance", "cercle_ensemble"],
        },
        {
          titre: "La ronde dans la cour",
          enonce:
            "$24$ élèves font une ronde en se tenant la main. Chacun occupe $1{,}2$ m du tour.\na) Quelle est la longueur du tour de la ronde ?\nb) Quel est son diamètre, au dixième près ? La calculatrice est permise.\nc) La cour est un carré de $10$ m de côté. La ronde y tient-elle ?\nd) $6$ élèves de plus arrivent. Tient-elle encore ?",
          correction:
            "a) $24 \\times 1{,}2 = 28{,}8$ m.\nb) Tour $= 3{,}14 \\times$ diamètre. Je fais le calcul à l'envers.\n$28{,}8 \\div 3{,}14 \\approx 9{,}2$ m.\nc) $9{,}2 < 10$ : oui, la ronde tient, de justesse.\nd) Avec $30$ élèves : $30 \\times 1{,}2 = 36$ m de tour.\n$36 \\div 3{,}14 \\approx 11{,}5$ m de diamètre.\n$11{,}5 > 10$ : non, elle ne tient plus.\n⛔ Le piège : comparer le tour, $28{,}8$ m, au côté de la cour. C'est le diamètre qui doit tenir.\nRéponse : a) $28{,}8$ m ; b) environ $9{,}2$ m ; c) oui ; d) non.",
          schema: plan({
            ronds: [{ centre: [5, 5], r: 4.59, couleur: VERT }],
            points: [
              { en: [9.59, 5] }, { en: [9.43, 6.19] }, { en: [8.98, 7.3] }, { en: [8.25, 8.25] }, { en: [7.3, 8.98] }, { en: [6.19, 9.43] },
              { en: [5, 9.59] }, { en: [3.81, 9.43] }, { en: [2.7, 8.98] }, { en: [1.75, 8.25] }, { en: [1.02, 7.3] }, { en: [0.57, 6.19] },
              { en: [0.41, 5] }, { en: [0.57, 3.81] }, { en: [1.02, 2.7] }, { en: [1.75, 1.75] }, { en: [2.7, 1.02] }, { en: [3.81, 0.57] },
              { en: [5, 0.41] }, { en: [6.19, 0.57] }, { en: [7.3, 1.02] }, { en: [8.25, 1.75] }, { en: [8.98, 2.7] }, { en: [9.43, 3.81] },
            ],
            segments: [
              { de: [0, 0], a: [10, 0], label: "10 m", vers: "b", couleur: ENCRE },
              { de: [10, 0], a: [10, 10], couleur: ENCRE },
              { de: [10, 10], a: [0, 10], couleur: ENCRE },
              { de: [0, 10], a: [0, 0], couleur: ENCRE },
            ],
          }),
          micros: ["cercle_proportionnel", "cercle_defi"],
        },
      ],
    },
  ],
};
