// ─── Fiche d'exercices : la vision dans l'espace (6e) — 20 exercices corrigés ───
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-volume-solide.tsx` (son `empilement` de cubes en perspective
// cavalière, repris ici pour plusieurs solides, avec leurs VUES dessous).
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/vision-espace.bank.ts`,
// notionId vision_espace, et sur ce que le BO en attend : interpréter une
// perspective cavalière, un patron ; tracer les vues de dessus, de face, de
// gauche, de droite ; retrouver l'assemblage qui a des vues données ; compter
// les cubes d'un empilement, cachés compris.
// ⛔ LIMITES DE LA 6e : des assemblages de cubes et des pavés, rien d'autre ;
// aucune formule ; « vue de face » = on voit la longueur et la hauteur, et
// chaque énoncé dit de quel côté on regarde.
//
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : ils ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : compter les faces qu'on voit (1, 11, 15), croire que la
// vue de dessus compte les cubes (2), ne regarder que la rangée de devant (3),
// compter tous les cubes dans une vue (4), dessiner les arêtes cachées en
// traits pleins (5, 14), croire que six carrés font toujours un patron (6),
// oublier une pile du plan (7, 16), inverser gauche et droite (8), oublier que
// les piles de derrière dépassent (9, 19), une seule vue pour choisir (10),
// deux faces voisines prises pour opposées (12), les vues qui changent quand on
// couche le solide (13), la fuyante raccourcie prise pour une vraie longueur
// (14), les coins comptés trois fois (17), croire que les vues disent tout (18),
// oublier la face cachée du dé (20).
//
// Un seul fait réel : sur un dé à jouer classique, deux faces opposées font
// 7 en tout (1 et 6, 2 et 5, 3 et 4) — ex. 20. Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS :
// - `cubes(solides, vues)` : des solides de cubes unités en perspective
//   cavalière, côte à côte (h[y][x] cubes dans la colonne (x ; y), y = 0 la
//   rangée de DEVANT), et, en dessous, des VUES dessinées en carreaux ;
// - `carreaux(vues)` : des vues seules, un plan à nombres ou un patron. Chaque
//   vue s'écrit en lignes, du haut vers le bas : « # » un carreau, « . » rien,
//   un autre signe = un carreau qui porte ce signe ;
// - `cavalier` : un pavé en perspective cavalière, arêtes cachées en pointillés.
// 14 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages). Police 14, viewBox de 300 de large au
// plus, AUCUN `min-w`.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-vision-espace.mjs` —
// les cubes comptés dans les tableaux, les VUES recalculées depuis h et
// comparées aux vues dessinées, chaque patron PLIÉ (on fait rouler un cube sur
// ses carreaux), les faces opposées retrouvées.
//
// Micro-compétences : vision_vues (2, 3, 4, 8, 9, 10, 13, 18, 19),
// vision_denombrer (1, 7, 11, 15, 16, 19), vision_representation (5, 6, 7, 12,
// 13, 14, 16, 19, 20), vision_defi (10, 11, 15, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ARETE = "#1e3a8a";
const CACHEE = "#64748b";
const ENCRE = "#0f172a";
const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;
const TAILLE = 14;

type Solide = { h: number[][]; nom?: string };
type Vue = { nom: string; lignes: string[] };

/**
 * La planche : des SOLIDES de cubes en perspective cavalière (rangée du haut),
 * puis des VUES en carreaux (rangée du bas), chacun avec son nom dessous.
 * ⭐ Le script de recalcul relit les tableaux, recalcule les vues depuis h et
 * rejoue la largeur du cadre (300 au plus).
 */
const planche = (liste: Solide[], vues: Vue[]) => {
  const ECART = 1.2;
  const trait = { stroke: ARETE, strokeWidth: 1.2, strokeLinejoin: "round" as const };
  const dessin: ReactNode[] = [];

  // Les solides.
  const d = liste.map(({ h }) => {
    const ny = h.length, nx = h[0].length, nz = Math.max(...h.flat());
    return { nx, ny, nz, w: nx + K * ny, t: nz + K * ny };
  });
  const Wu = d.reduce((s, q) => s + q.w, 0) + ECART * Math.max(0, liste.length - 1);
  const Hu = liste.length ? Math.max(...d.map((q) => q.t)) : 0;
  const u = liste.length ? Math.min(24, 280 / Wu, 150 / Hu) : 0;
  // Un nom plus large que son solide élargit sa case : il ne sort jamais du cadre.
  const bs = liste.map((s, i) => Math.max(d[i].w * u, [...(s.nom ?? "")].length * TAILLE * 0.6));
  const SW = bs.reduce((a, b) => a + b, 0) + ECART * u * Math.max(0, liste.length - 1);
  const bas = Hu * u;
  const noms = liste.some((s) => s.nom);
  const hautSolides = liste.length ? bas + (noms ? 24 : 0) : 0;

  // Les vues.
  const nc = vues.map((v) => Math.max(...v.lignes.map((l) => [...l].length)));
  const nr = vues.map((v) => v.lignes.length);
  const c = vues.length ? Math.min(20, (280 - 20 * (vues.length - 1)) / nc.reduce((a, b) => a + b, 0), 90 / Math.max(...nr)) : 0;
  const bw = vues.map((v, i) => Math.max(nc[i] * c, [...v.nom].length * TAILLE * 0.6));
  const VW = bw.reduce((a, b) => a + b, 0) + 20 * Math.max(0, vues.length - 1);
  const W = Math.max(SW, VW);

  let x0 = (W - SW) / 2;
  liste.forEach(({ h, nom }, i) => {
    const { nx, ny, nz, w } = d[i];
    const ox = x0 + (bs[i] - w * u) / 2;
    const P = (x: number, y: number, z: number) => `${(ox + (x + K * y) * u).toFixed(1)},${(bas - (z + K * y) * u).toFixed(1)}`;
    for (let y = ny - 1; y >= 0; y--)
      for (let z = 0; z < nz; z++)
        for (let x = 0; x < nx; x++) {
          if (z >= h[y][x]) continue;
          dessin.push(
            <g key={`${i}-${x}-${y}-${z}`}>
              <polygon points={`${P(x, y, z)} ${P(x + 1, y, z)} ${P(x + 1, y, z + 1)} ${P(x, y, z + 1)}`} fill="#bfdbfe" {...trait} />
              <polygon points={`${P(x, y, z + 1)} ${P(x + 1, y, z + 1)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}`} fill="#eff6ff" {...trait} />
              <polygon points={`${P(x + 1, y, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x + 1, y, z + 1)}`} fill="#93c5fd" {...trait} />
            </g>,
          );
        }
    if (nom)
      dessin.push(
        <text key={`n${i}`} x={(ox + (w * u) / 2).toFixed(1)} y={(bas + 18).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={ENCRE}>
          {nom}
        </text>,
      );
    x0 += bs[i] + ECART * u;
  });

  const y0 = hautSolides + (liste.length && vues.length ? 14 : 0);
  const R = vues.length ? Math.max(...nr) : 0;
  let bx = (W - VW) / 2;
  vues.forEach((v, i) => {
    const gx = bx + (bw[i] - nc[i] * c) / 2;
    const gy = y0 + (R - nr[i]) * c;
    v.lignes.forEach((l, r) =>
      [...l].forEach((ch, k) => {
        if (ch === ".") return;
        const [x, y] = [gx + k * c, gy + r * c];
        dessin.push(<rect key={`v${i}-${r}-${k}`} x={x.toFixed(1)} y={y.toFixed(1)} width={c.toFixed(1)} height={c.toFixed(1)} fill="#fed7aa" stroke={ARETE} strokeWidth={1.4} />);
        if (ch !== "#")
          dessin.push(
            <text key={`t${i}-${r}-${k}`} x={(x + c / 2).toFixed(1)} y={(y + c / 2 + TAILLE * 0.35).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={ENCRE}>
              {ch}
            </text>,
          );
      }),
    );
    dessin.push(
      <text key={`vn${i}`} x={(bx + bw[i] / 2).toFixed(1)} y={(y0 + R * c + 18).toFixed(1)} textAnchor="middle" fontSize={TAILLE} fontWeight={900} fill={ROUGE}>
        {v.nom}
      </text>,
    );
    bx += bw[i] + 20;
  });

  const H = y0 + (vues.length ? R * c + 24 : 0) + 6;
  const total = liste.map((s) => s.h.flat().reduce((a, b) => a + b, 0));
  const label = [liste.length ? `solide${liste.length > 1 ? "s" : ""} de ${total.join(", ")} cubes` : "", vues.map((v) => v.nom).join(", ")].filter(Boolean).join(" ; ");
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`-3 -3 ${(W + 6).toFixed(1)} ${H.toFixed(1)}`} className="mx-auto block h-auto w-full" style={{ maxWidth: `${Math.round(Math.min(300, (W + 6) * 1.3))}px` }} role="img" aria-label={label}>
        {dessin}
      </svg>
    </div>
  );
};

/** Des solides de cubes, et leurs vues dessous (facultatives). */
const cubes = (liste: Solide[], vues: Vue[] = []) => planche(liste, vues);
/** Des vues seules : vues d'un solide, plan à nombres ou patron. */
const carreaux = (vues: Vue[]) => planche([], vues);

type P2 = [number, number];
type Sommet = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

/**
 * Un PAVÉ en perspective cavalière : longueur L (vers la droite), profondeur P
 * (en fuyante, à 45°, réduite de moitié), hauteur H. La face de devant ABCD est
 * en vraie grandeur ; E, F, G, H sont derrière A, B, C, D. Les trois arêtes qui
 * partent de E sont cachées : en pointillés. `noms` écrit les sommets ; `cotes`
 * écrit les longueurs VRAIES sous [AB], à gauche de [AD], le long de [BF].
 */
const cavalier = (L: number, P: number, H: number, o: { noms?: boolean; cotes?: { longueur?: string; hauteur?: string; profondeur?: string } } = {}) => {
  const s = Math.min(170 / (L + K * P), 120 / (H + K * P));
  const G0 = 44;
  const haut = (H + K * P) * s;
  const pt = (x: number, y: number, z: number): P2 => [G0 + (x + K * y) * s, 24 + haut - (z + K * y) * s];
  const S: Record<Sommet, P2> = {
    A: pt(0, 0, 0), B: pt(L, 0, 0), C: pt(L, 0, H), D: pt(0, 0, H),
    E: pt(0, P, 0), F: pt(L, P, 0), G: pt(L, P, H), H: pt(0, P, H),
  };
  const vues: [Sommet, Sommet][] = [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["D", "H"], ["C", "G"], ["H", "G"], ["B", "F"], ["F", "G"]];
  const cachees: [Sommet, Sommet][] = [["A", "E"], ["E", "F"], ["E", "H"]];
  const poly = (...q: Sommet[]) => q.map((k) => S[k].map((v) => v.toFixed(1)).join(",")).join(" ");
  const decal: Record<Sommet, P2> = { A: [-11, 12], B: [4, 14], C: [-10, 16], D: [-11, -6], E: [10, -8], F: [12, 6], G: [11, -8], H: [-7, -10] };
  const W = G0 + (L + K * P) * s + 44;
  const Ht = 24 + haut + 34;
  const ligne = (a: Sommet, b: Sommet, cachee: boolean) => (
    <line key={`${a}${b}`} x1={S[a][0].toFixed(1)} y1={S[a][1].toFixed(1)} x2={S[b][0].toFixed(1)} y2={S[b][1].toFixed(1)} stroke={cachee ? CACHEE : ARETE} strokeWidth={cachee ? 1.6 : 2.4} strokeDasharray={cachee ? "6 4" : undefined} strokeLinecap="round" />
  );
  const texte = (x: number, y: number, t: string, a: "start" | "middle" | "end", couleur: string, k: string) => (
    <text key={k} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={a} fontSize={TAILLE} fontWeight={900} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
      {t}
    </text>
  );
  const mil = (a: Sommet, b: Sommet): P2 => [(S[a][0] + S[b][0]) / 2, (S[a][1] + S[b][1]) / 2];
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W.toFixed(1)} ${Ht.toFixed(1)}`} className="block h-auto w-full" role="img" aria-label="Pavé en perspective cavalière, arêtes cachées en pointillés">
        <polygon points={poly("D", "C", "G", "H")} fill="#eff6ff" />
        <polygon points={poly("B", "F", "G", "C")} fill="#93c5fd" fillOpacity={0.6} />
        <polygon points={poly("A", "B", "C", "D")} fill="#bfdbfe" fillOpacity={0.7} />
        {cachees.map(([a, b]) => ligne(a, b, true))}
        {vues.map(([a, b]) => ligne(a, b, false))}
        {o.noms ? (Object.keys(S) as Sommet[]).map((k) => texte(S[k][0] + decal[k][0], S[k][1] + decal[k][1] + 5, k, "middle", ENCRE, `s${k}`)) : null}
        {o.cotes?.longueur ? texte(mil("A", "B")[0], mil("A", "B")[1] + 22, o.cotes.longueur, "middle", ROUGE, "cl") : null}
        {o.cotes?.hauteur ? texte(mil("A", "D")[0] - 7, mil("A", "D")[1] + 5, o.cotes.hauteur, "end", ROUGE, "ch") : null}
        {o.cotes?.profondeur ? texte(mil("B", "F")[0] + 9, mil("B", "F")[1] + 14, o.cotes.profondeur, "start", ROUGE, "cp") : null}
      </svg>
    </div>
  );
};

export const exercicesVisionEspace6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "vision-espace",
  titre: "La vision dans l'espace",
  accroche:
    "Vingt exercices, du geste seul au problème : compter les cubes d'un empilement, même cachés, dessiner les vues de dessus, de face, de gauche et de droite, lire un plan à nombres, reconnaître un patron de cube, lire une perspective cavalière. Un entrepôt de caisses, un dé à jouer, un cube peint. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et les vues dessinées.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/vision-espace", titre: "La vision dans l'espace" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde le solide d'un seul côté, ou je compte ses cubes étage par étage.",
      rappel: [
        "On regarde un solide de dessus, de face, de gauche ou de droite.",
        "Chaque vue est faite de carreaux.",
        "Pour compter les cubes, je compte étage par étage.",
        "Un cube caché compte aussi.",
      ],
      exercices: [
        {
          enonce: "Ce solide est fait de cubes. Aucun cube ne flotte.\na) Combien de cubes y a-t-il à l'étage du bas ?\nb) Et au deuxième étage ? Et au troisième ?\nc) Combien de cubes y a-t-il en tout ?",
          figure: cubes([{ h: [[2, 1, 1], [3, 2, 1], [3, 3, 2]] }]),
          correction:
            "Je compte étage par étage, en partant du bas.\nÉtage du bas : $3$ rangées de $3$ cubes. $3 \\times 3 = 9$ cubes.\nDeuxième étage : je compte les piles de $2$ cubes ou plus. Il y en a $6$.\nTroisième étage : les piles de $3$ cubes. Il y en a $3$.\nEn tout : $9 + 6 + 3 = 18$ cubes.\n⛔ Le piège : compter les faces qu'on voit. Les cubes du bas, derrière, sont cachés.\nRéponse : a) $9$ ; b) $6$ et $3$ ; c) $18$ cubes.",
          micros: ["vision_denombrer"],
        },
        {
          enonce: "On regarde ce solide d'en haut.\na) Combien de carreaux a sa vue de dessus ?\nb) Combien de cubes a le solide ?\nc) Pourquoi ces deux nombres sont-ils différents ?",
          figure: cubes([{ h: [[1, 0, 0], [2, 1, 1], [0, 0, 1]] }]),
          correction:
            "a) D'en haut, chaque pile donne un seul carreau.\nIl y a $5$ piles, donc $5$ carreaux.\nLe dessin montre cette vue de dessus.\nb) Une pile a $2$ cubes. Les autres ont $1$ cube.\n$2 + 1 + 1 + 1 + 1 = 6$ cubes.\nc) D'en haut, on ne voit pas le cube du dessous de la pile de $2$.\n⛔ Le piège : croire que la vue de dessus compte les cubes. Elle compte les piles.\nRéponse : a) $5$ carreaux ; b) $6$ cubes ; c) un cube est caché sous un autre.",
          schema: ecranSeulement(carreaux([{ nom: "dessus", lignes: ["..#", "###", "#.."] }])),
          micros: ["vision_vues"],
        },
        {
          enonce: "On regarde ce solide de face : on voit sa longueur et sa hauteur.\nQuelle vue, A, B ou C, est sa vue de face ?",
          figure: cubes(
            [{ h: [[1, 2, 1], [3, 1, 2]] }],
            [
              { nom: "A", lignes: ["...", ".#.", "###"] },
              { nom: "B", lignes: ["#..", "###", "###"] },
              { nom: "C", lignes: ["#..", "#.#", "###"] },
            ],
          ),
          correction:
            "De face, je vois chaque colonne. Je garde la pile la plus haute.\nColonne de gauche : devant $1$, derrière $3$. Je vois $3$ carreaux.\nColonne du milieu : devant $2$, derrière $1$. Je vois $2$ carreaux.\nColonne de droite : devant $1$, derrière $2$. Je vois $2$ carreaux.\nLa vue a donc $3$, $2$ et $2$ carreaux : c'est B.\n⛔ Le piège : ne regarder que la rangée de devant. Ça donne A. Les piles de derrière dépassent !\nRéponse : B.",
          micros: ["vision_vues"],
        },
        {
          enonce: "Un pavé plein est fait de cubes : $5$ de long, $2$ de large, $3$ de haut.\na) Combien de carreaux a sa vue de dessus ?\nb) Et sa vue de face ?\nc) Et sa vue de droite ?",
          correction:
            "a) De dessus, je vois la longueur et la largeur.\n$5 \\times 2 = 10$ carreaux.\nb) De face, je vois la longueur et la hauteur.\n$5 \\times 3 = 15$ carreaux.\nc) De droite, je vois la largeur et la hauteur.\n$2 \\times 3 = 6$ carreaux.\n⛔ Le piège : compter tous les cubes. Une vue montre une seule face, sans profondeur.\nRéponse : a) $10$ ; b) $15$ ; c) $6$.",
          schema: ecranSeulement(
            cubes(
              [{ h: [[3, 3, 3, 3, 3], [3, 3, 3, 3, 3]] }],
              [
                { nom: "dessus", lignes: ["#####", "#####"] },
                { nom: "face", lignes: ["#####", "#####", "#####"] },
                { nom: "droite", lignes: ["##", "##", "##"] },
              ],
            ),
          ),
          micros: ["vision_vues"],
        },
        {
          enonce: "Ce pavé est dessiné en perspective cavalière.\na) Combien d'arêtes sont en traits pleins ?\nb) Combien sont en pointillés ? Pourquoi ?\nc) Quelle face est dessinée sans déformation ?",
          figure: cavalier(4, 3, 2, { noms: true }),
          correction:
            "Un pavé a $12$ arêtes.\na) Je compte les traits pleins : $9$ arêtes.\nb) Il reste $12 - 9 = 3$ arêtes, en pointillés : $[AE]$, $[EF]$ et $[EH]$.\nCe sont les arêtes cachées. On ne les voit pas de face.\nc) La face de devant, $ABCD$. C'est un vrai rectangle.\nLes autres faces sont penchées : leurs rectangles deviennent des parallélogrammes.\n⛔ Le piège : tracer les arêtes cachées en traits pleins. On ne sait plus ce qui est devant.\nRéponse : a) $9$ ; b) $3$, les arêtes cachées ; c) la face $ABCD$.",
          micros: ["vision_representation"],
        },
        {
          enonce: "Un seul de ces trois dessins est un patron de cube.\nLequel ? Explique pourquoi les deux autres ne marchent pas.",
          figure: carreaux([
            { nom: "A", lignes: ["###", "###"] },
            { nom: "B", lignes: [".#..", "####", ".#.."] },
            { nom: "C", lignes: ["####", "#..#"] },
          ]),
          correction:
            "Un cube a $6$ faces. Les trois dessins ont bien $6$ carrés.\nJe les plie en pensée.\nB : les $4$ carrés en ligne font le tour du cube. Les deux autres ferment le dessus et le dessous.\nA : en pliant, deux carrés tombent au même endroit. Une face reste ouverte.\nC : les deux carrés du bas se replient du même côté. Ils se superposent.\n⛔ Le piège : croire que $6$ carrés font toujours un patron.\nRéponse : B.",
          micros: ["vision_representation"],
        },
        {
          enonce: "Voici la vue de dessus d'un empilement.\nChaque nombre dit combien de cubes sont empilés sur ce carreau.\nCombien de cubes y a-t-il en tout ?",
          figure: carreaux([{ nom: "vue de dessus", lignes: ["21.", "312", "111"] }]),
          correction:
            "Chaque nombre compte les cubes d'une pile.\nJ'additionne ligne par ligne.\nLigne du haut : $2 + 1 = 3$.\nLigne du milieu : $3 + 1 + 2 = 6$.\nLigne du bas : $1 + 1 + 1 = 3$.\nEn tout : $3 + 6 + 3 = 12$ cubes.\nLe dessin montre l'empilement.\n⛔ Le piège : compter les carreaux. Il y en a $8$, mais une pile peut avoir plusieurs cubes.\nRéponse : $12$ cubes.",
          schema: ecranSeulement(cubes([{ h: [[1, 1, 1], [3, 1, 2], [2, 1, 0]] }])),
          micros: ["vision_denombrer", "vision_representation"],
        },
        {
          enonce: "Voici un solide et deux de ses vues, P et Q.\nL'une est la vue de gauche, l'autre la vue de droite.\nLaquelle est la vue de droite ?",
          figure: cubes(
            [{ h: [[1, 1, 3], [2, 1, 1]] }],
            [
              { nom: "P", lignes: [".#", "##", "##"] },
              { nom: "Q", lignes: ["#.", "##", "##"] },
            ],
          ),
          correction:
            "Je me place à droite du solide et je le regarde.\nLe devant du solide est alors à ma gauche.\nLa pile de $3$ cubes est devant. Je la vois donc à gauche.\nDerrière, la plus haute pile a $2$ cubes. Je la vois à droite.\nC'est la vue Q.\nP est la vue de gauche : tout est inversé.\n⛔ Le piège : inverser gauche et droite. Je me mets vraiment à la place de celui qui regarde.\nRéponse : Q est la vue de droite.",
          micros: ["vision_vues"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même solide. Je dessine les vues en carreaux, je compte, puis je vérifie.",
      rappel: [
        "Dessus : longueur et largeur. Face : longueur et hauteur. Côté : largeur et hauteur.",
        "Dans une vue, les piles de derrière dépassent si elles sont plus hautes.",
        "Perspective cavalière : les arêtes cachées sont en pointillés.",
        "Un patron de cube : 6 carrés qui se replient sans se superposer.",
      ],
      exercices: [
        {
          enonce: "Un escalier a $3$ marches : $1$, $2$ et $3$ cubes. Il a $2$ rangées pareilles.\na) Dessine sa vue de face. Combien de carreaux a-t-elle ?\nb) Combien de carreaux a sa vue de droite ?\nc) Combien de carreaux a sa vue de gauche ?",
          correction:
            "a) De face, je vois les marches : $1$, $2$ et $3$ carreaux.\n$1 + 2 + 3 = 6$ carreaux.\nb) De droite, je vois la plus haute marche : $3$ cubes de haut, $2$ rangées.\n$3 \\times 2 = 6$ carreaux, en rectangle.\nc) De gauche, je vois d'abord la petite marche. Mais les grandes, derrière, dépassent.\nJe vois donc aussi un rectangle de $6$ carreaux.\n⛔ Le piège : dessiner une seule marche à gauche. Une vue montre tout ce qui dépasse.\nRéponse : a) $6$ ; b) $6$ ; c) $6$.",
          schema: ecranSeulement(
            cubes(
              [{ h: [[1, 2, 3], [1, 2, 3]] }],
              [
                { nom: "face", lignes: ["..#", ".##", "###"] },
                { nom: "droite", lignes: ["##", "##", "##"] },
                { nom: "gauche", lignes: ["##", "##", "##"] },
              ],
            ),
          ),
          micros: ["vision_vues"],
        },
        {
          enonce: "Voici trois vues d'un solide : dessus, face, droite.\nQuel solide, A, B ou C, a ces trois vues ?",
          figure: cubes(
            [
              { h: [[1, 1], [2, 1]], nom: "A" },
              { h: [[2, 1], [1, 1]], nom: "B" },
              { h: [[1, 2], [1, 1]], nom: "C" },
            ],
            [
              { nom: "dessus", lignes: ["##", "##"] },
              { nom: "face", lignes: ["#.", "##"] },
              { nom: "droite", lignes: ["#.", "##"] },
            ],
          ),
          correction:
            "Les trois solides ont la même vue de dessus : un carré de $4$ carreaux.\nJe regarde la vue de face : la pile de $2$ est à gauche.\nC a sa pile de $2$ à droite. Ce n'est pas C.\nJe regarde la vue de droite : la pile de $2$ est à gauche, donc devant.\nA a sa pile de $2$ derrière. Ce n'est pas A.\nB a sa pile de $2$ devant, à gauche. Tout colle.\n⛔ Le piège : regarder une seule vue. Ici, la vue de dessus ne permet pas de choisir.\nRéponse : B.",
          micros: ["vision_vues", "vision_defi"],
        },
        {
          enonce: "Ce solide est fait de cubes. Aucun cube ne flotte.\na) Compte les cubes étage par étage.\nb) Combien de cubes y a-t-il en tout ?\nc) Combien faut-il en ajouter pour faire un cube plein de $3$ sur $3$ sur $3$ ?",
          figure: cubes([{ h: [[3, 1, 1], [3, 2, 1], [2, 2, 1]] }]),
          correction:
            "a) Étage du bas : les $9$ piles ont au moins $1$ cube. $9$ cubes.\nDeuxième étage : les piles de $2$ cubes ou plus. J'en compte $5$.\nTroisième étage : les piles de $3$ cubes. Il y en a $2$.\nb) $9 + 5 + 2 = 16$ cubes.\nc) Un cube plein de $3$ sur $3$ sur $3$ : $3 \\times 3 \\times 3 = 27$ cubes.\n$27 - 16 = 11$ cubes à ajouter.\n⛔ Le piège : compter seulement les cubes visibles. Plusieurs sont cachés derrière la pile de $3$.\nRéponse : a) $9$, $5$ et $2$ ; b) $16$ cubes ; c) $11$ cubes.",
          micros: ["vision_denombrer", "vision_defi"],
        },
        {
          enonce: "On plie ce patron pour faire un cube.\na) Quelle face sera en face de A ?\nb) Et en face de B ? Et en face de C ?",
          figure: carreaux([{ nom: "patron", lignes: ["AB..", ".CD.", "..EF"] }]),
          correction:
            "Je plie en pensée, carré par carré.\nA touche B. B touche C. Deux faces qui se touchent sont voisines, pas opposées.\nEn pliant, D vient se poser au-dessus de A.\nDe même, E se pose en face de B, et F en face de C.\n⭐ Dans cet escalier, une face est opposée à celle qui est deux cases plus loin.\n⛔ Le piège : choisir une face qui touche. Elle est voisine, pas en face.\nRéponse : a) D ; b) E en face de B, F en face de C.",
          micros: ["vision_representation"],
        },
        {
          enonce: "Une tour de $4$ cubes est debout sur la table.\na) Combien de carreaux ont sa vue de dessus et sa vue de face ?\nb) On couche la tour vers la droite. Réponds de nouveau.\nc) Son nombre de cubes a-t-il changé ?",
          correction:
            "a) Debout, d'en haut, je vois le cube du sommet : $1$ carreau.\nDe face, je vois la tour entière : $4$ carreaux, l'un sur l'autre.\nb) Couchée, d'en haut, je vois les $4$ cubes en ligne : $4$ carreaux.\nDe face, je vois aussi $4$ carreaux, côte à côte.\nc) Non, elle a toujours $4$ cubes.\n⛔ Le piège : croire que les vues restent les mêmes. Elles dépendent de la position du solide.\nRéponse : a) $1$ et $4$ ; b) $4$ et $4$ ; c) non.",
          schema: ecranSeulement(
            cubes(
              [
                { h: [[4]], nom: "debout" },
                { h: [[1, 1, 1, 1]], nom: "couchée" },
              ],
              [
                { nom: "dessus", lignes: ["#"] },
                { nom: "dessus", lignes: ["####"] },
              ],
            ),
          ),
          micros: ["vision_vues", "vision_representation"],
        },
        {
          enonce: "Maé dessine un cube de $4$ cm de côté en perspective cavalière.\na) Quelle forme a la face de devant ? Quelle taille ?\nb) Elle trace les arêtes de biais plus courtes : $2$ cm. Le vrai cube a-t-il des arêtes de $2$ cm ?\nc) Combien d'arêtes seront en pointillés ?",
          correction:
            "a) La face de devant est dessinée sans déformation. C'est un carré de $4$ cm de côté.\nb) Non. Toutes les arêtes du vrai cube mesurent $4$ cm.\nSur le dessin, les arêtes de biais sont raccourcies. Cela donne l'impression de profondeur.\nc) Un cube a $12$ arêtes. $3$ sont cachées : elles sont en pointillés.\n⛔ Le piège : mesurer une arête sur le dessin. Une arête de biais n'a pas sa vraie longueur.\nRéponse : a) un carré de $4$ cm ; b) non, toutes font $4$ cm ; c) $3$.",
          schema: ecranSeulement(cavalier(4, 4, 4, { cotes: { longueur: "4 cm", hauteur: "4 cm", profondeur: "4 cm" } })),
          micros: ["vision_representation"],
        },
        {
          enonce: "Un pavé plein est fait de $4$ cubes de long, $3$ de large et $2$ de haut.\nOn le regarde de devant, d'en haut et de droite.\na) Combien de cubes a-t-il ?\nb) Un cube est caché s'il a un voisin devant, au-dessus et à droite. Combien sont cachés ?\nc) Combien de cubes voit-on, au moins un peu ?",
          correction:
            "a) $4 \\times 3 \\times 2 = 24$ cubes.\nb) Un cube de l'étage du haut se voit d'en haut. Les cachés sont donc en bas.\nIls ne sont pas dans la rangée de devant : il reste $3 - 1 = 2$ rangées.\nIls ne sont pas dans la colonne de droite : il reste $4 - 1 = 3$ colonnes.\n$3 \\times 2 = 6$ cubes cachés.\nc) $24 - 6 = 18$ cubes visibles.\n⛔ Le piège : compter seulement les cubes visibles. Les $6$ cachés comptent dans le volume.\nRéponse : a) $24$ ; b) $6$ ; c) $18$.",
          schema: ecranSeulement(cubes([{ h: [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]] }])),
          micros: ["vision_denombrer", "vision_defi"],
        },
        {
          enonce: "Voici un empilement de cubes.\na) Dessine sa vue de dessus. Écris dans chaque carreau le nombre de cubes de la pile.\nb) Combien de cubes y a-t-il en tout ?",
          figure: cubes([{ h: [[1, 2, 1], [2, 3, 1]] }]),
          correction:
            "a) Je dessine $2$ lignes de $3$ carreaux. La ligne du bas est la rangée de devant.\nDevant, les piles ont $1$, $2$ et $1$ cubes.\nDerrière, elles ont $2$, $3$ et $1$ cubes.\nb) $1 + 2 + 1 = 4$ et $2 + 3 + 1 = 6$.\n$4 + 6 = 10$ cubes.\n⛔ Le piège : oublier une pile de derrière. Je vérifie : $6$ carreaux, $6$ piles.\nRéponse : $10$ cubes.",
          schema: ecranSeulement(carreaux([{ nom: "vue de dessus", lignes: ["231", "121"] }])),
          micros: ["vision_representation", "vision_denombrer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je dessine les vues ou je compte par étages, puis je réponds par une phrase.",
      rappel: [
        "Je compte les cubes étage par étage, ou pile par pile.",
        "Une vue ne montre pas les cubes cachés.",
        "Je vérifie mon dessin en me mettant à la place de celui qui regarde.",
      ],
      exercices: [
        {
          titre: "Le cube peint",
          enonce:
            "Un grand cube est fait de $4$ cubes sur $4$ sur $4$. On peint tout l'extérieur en rouge. Puis on le démonte.\na) Combien de petits cubes y a-t-il ?\nb) Combien ont $3$ faces rouges ?\nc) Combien ont $2$ faces rouges ?\nd) Combien ont $1$ face rouge ?\ne) Combien n'ont aucune face rouge ?",
          correction:
            "a) $4 \\times 4 \\times 4 = 64$ petits cubes.\nb) $3$ faces rouges : ce sont les coins. Un cube a $8$ coins.\nc) $2$ faces rouges : ils sont sur une arête, sans les coins.\nSur chaque arête, il y en a $4 - 2 = 2$. Le cube a $12$ arêtes : $12 \\times 2 = 24$.\nd) $1$ face rouge : ils sont au milieu d'une face.\nSur chaque face, il y en a $2 \\times 2 = 4$. Le cube a $6$ faces : $6 \\times 4 = 24$.\ne) Aucune face : ils sont à l'intérieur, $2 \\times 2 \\times 2 = 8$.\nJe vérifie : $8 + 24 + 24 + 8 = 64$.\n⛔ Le piège : compter un coin trois fois, sur trois faces.\nRéponse : $64$ ; $8$ ; $24$ ; $24$ ; $8$.",
          schema: ecranSeulement(cubes([{ h: [[4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4]] }])),
          micros: ["vision_defi"],
        },
        {
          titre: "Mêmes vues, pas le même solide",
          enonce:
            "Timéo et Zoé ont construit ces deux solides.\na) Combien de cubes a chaque solide ?\nb) Dessine les vues de dessus, de face et de droite de chacun.\nc) Que remarques-tu ?\nd) Avec ces trois vues, combien de cubes faut-il au minimum ?",
          figure: cubes([
            { h: [[2, 1], [1, 2]], nom: "Timéo" },
            { h: [[2, 2], [2, 2]], nom: "Zoé" },
          ]),
          correction:
            "a) Timéo : $2 + 1 + 1 + 2 = 6$ cubes. Zoé : $2 \\times 2 \\times 2 = 8$ cubes.\nb) De dessus, les deux font un carré de $4$ carreaux.\nDe face, chaque colonne a une pile de $2$. Les deux font un carré de $4$ carreaux.\nDe droite, c'est pareil : un carré de $4$ carreaux.\nc) Les vues sont les mêmes, mais pas le nombre de cubes.\nLes vues ne montrent pas les trous cachés.\nd) Chaque colonne vue de face doit avoir une pile de $2$. Chaque rangée aussi.\nLe solide de Timéo y arrive avec $6$ cubes. Avec $5$, une vue aurait un trou.\n⛔ Le piège : croire que trois vues disent tout.\nRéponse : $6$ et $8$ cubes ; mêmes vues ; au minimum $6$ cubes.",
          schema: ecranSeulement(
            carreaux([
              { nom: "dessus", lignes: ["##", "##"] },
              { nom: "face", lignes: ["##", "##"] },
              { nom: "droite", lignes: ["##", "##"] },
            ]),
          ),
          micros: ["vision_defi", "vision_vues"],
        },
        {
          titre: "Les caisses de l'entrepôt",
          enonce:
            "Dans un entrepôt, des caisses cubiques sont empilées.\nLe plan donne le nombre de caisses de chaque pile. Le bas du plan est le devant.\na) Combien de caisses y a-t-il ?\nb) Un drone filme d'en haut. Combien de carreaux voit-il ?\nc) Une caméra filme de face. Dessine ce qu'elle voit. Combien de carreaux ?\nd) Une autre filme de droite. Combien de carreaux ?",
          figure: carreaux([{ nom: "plan", lignes: ["1232", "2231", "3321"] }]),
          correction:
            "a) J'additionne ligne par ligne.\n$1 + 2 + 3 + 2 = 8$ ; $2 + 2 + 3 + 1 = 8$ ; $3 + 3 + 2 + 1 = 9$.\n$8 + 8 + 9 = 25$ caisses.\nb) D'en haut, chaque pile donne un carreau : $4 \\times 3 = 12$ carreaux.\nc) De face, je garde la plus haute pile de chaque colonne.\nColonnes : $3$, $3$, $3$ et $2$. Cela fait $3 + 3 + 3 + 2 = 11$ carreaux.\nd) De droite, je garde la plus haute pile de chaque ligne : $3$, $3$ et $3$.\n$3 \\times 3 = 9$ carreaux.\n⛔ Le piège : ne regarder que la ligne de devant. Les piles de derrière dépassent.\nRéponse : $25$ caisses ; $12$ ; $11$ ; $9$ carreaux.",
          schema: ecranSeulement(
            carreaux([
              { nom: "face", lignes: ["###.", "####", "####"] },
              { nom: "droite", lignes: ["###", "###", "###"] },
            ]),
          ),
          micros: ["vision_vues", "vision_denombrer", "vision_representation"],
        },
        {
          titre: "Le dé à jouer",
          enonce:
            "Sur un dé à jouer, deux faces opposées font toujours $7$ en tout.\nVoici le patron d'un dé. Trois faces n'ont pas encore leur nombre : R, S et T.\na) Quelle face sera en face de $1$ ? En face de $2$ ? En face de $3$ ?\nb) Quel nombre faut-il écrire sur R, sur S et sur T ?",
          figure: carreaux([{ nom: "patron du dé", lignes: [".1..", "23RS", ".T.."] }]),
          correction:
            "a) Je plie en pensée.\nLes $4$ carrés de la ligne du milieu font le tour du dé.\nDans ce tour, $2$ est en face de R, et $3$ est en face de S.\nLe carré du haut et celui du bas ferment le dé : $1$ est en face de T.\nb) Deux faces opposées font $7$.\nR est en face de $2$ : $7 - 2 = 5$.\nS est en face de $3$ : $7 - 3 = 4$.\nT est en face de $1$ : $7 - 1 = 6$.\n⛔ Le piège : prendre une face voisine. $2$ et $3$ se touchent : ils ne sont pas opposés.\nRéponse : a) T en face de $1$, R en face de $2$, S en face de $3$ ; b) R : $5$, S : $4$, T : $6$.",
          micros: ["vision_representation", "vision_defi"],
        },
      ],
    },
  ],
};
