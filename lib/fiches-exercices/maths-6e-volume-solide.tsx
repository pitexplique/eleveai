// ─── Fiche d'exercices : les volumes (6e) — 20 exercices corrigés ───────────────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-volume-solide.tsx` (son `empilement` de cubes en perspective
// cavalière, repris ici pour plusieurs solides côte à côte).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-volumes.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/volumes.bank.ts`, notionId
// volume_solide : l'unité de volume (cm³, m³), compter les cubes unités (par
// étages, cachés compris), comparer, assembler (on additionne), lire une
// mesure, et les défis de la banque (pavé : longueur × largeur × hauteur, cube).
// ⛔ LIMITES DE LA 6e : aucun litre ni conversion (la banque n'en pose pas), ni
// prisme ni cylindre (5e) ; des nombres entiers ; la formule du pavé n'arrive
// qu'avec les cubes qui la montrent.
// ⛔ Aucun exemple de la fiche de cours : ni 3 couches de 5 ou de 6, ni 6 × 2 × 1
// et 3 × 2 × 2, ni 8 + 4, ni le tas 9 + 4, ni la boîte 2 × 3 × 2, ni 14 contre 12,
// ni 18 + 12, ni le cube de 3 cm.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : ils ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : oublier les cubes cachés (1, 9, 15), cm² pour un volume
// (2, 10), le nombre devant l'unité (3), juger à la hauteur (4, 13), multiplier
// au lieu d'ajouter en collant (5), compter les faces visibles (6, 12, 15),
// additionner les dimensions (8), une autre forme = un autre volume (11, 20),
// le m³ lu comme un cm³ (14), oublier une tour (16), le côté double donc le
// volume double (18), le volume qui ne dit pas si ça rentre (19).
//
// Aucun fait réel chiffré : sucres, boîtes, camion, bac, château sont des
// MODÈLES, à des tailles vraisemblables.
//
// ⭐ LES DESSINS :
// - `cubes` : un ou plusieurs solides de cubes unités, en perspective cavalière,
//   côte à côte, leur nom dessous. h[y][x] = nombre de cubes de la colonne
//   (x ; y), y = 0 la rangée de DEVANT. Aucun cube ne flotte : une colonne.
// - `unites` : le trait de 1 cm, le carré de 1 cm², le cube de 1 cm³.
// - `diagramme` (figures.tsx) : les barres de l'exercice 10.
// 13 dessins imprimés ; les schémas qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages). Police 14, viewBox de 300 de large au
// plus, AUCUN `min-w`.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-volume-solide.mjs` —
// les cubes comptés dans les tableaux des dessins, étage par étage et rangée
// par rangée, chaque résultat cherché dans le corrigé.
//
// Micro-compétences : volume_unite (2, 7, 14, 19), volume_compter (1, 3, 6, 8,
// 9, 12, 15, 17), volume_comparer (4, 10, 13, 14, 18, 19, 20),
// volume_assemblage (5, 11, 16, 19, 20), volume_lire (3, 7, 10, 14),
// volume_defi (8, 9, 12, 13, 15, 17, 18, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme } from "@/lib/fiches-exercices/figures";

const ARETE = "#1e3a8a";
const ENCRE = "#0f172a";
const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;

type Solide = { h: number[][]; nom?: string };

/**
 * Des SOLIDES DE CUBES UNITÉS en perspective cavalière, côte à côte, à la même
 * échelle : h[y][x] cubes dans la colonne (x ; y), y = 0 la rangée de DEVANT.
 * Dessinés du fond vers l'avant, du bas vers le haut (l'ordre du peintre).
 * `nom` s'écrit sous le solide. ⭐ Le script de recalcul compte les cubes dans
 * ces tableaux et rejoue la largeur du cadre.
 */
const cubes = (liste: Solide[]) => {
  const ECART = 1.2;
  const d = liste.map(({ h }) => {
    const ny = h.length, nx = h[0].length, nz = Math.max(...h.flat());
    return { nx, ny, nz, w: nx + K * ny, t: nz + K * ny };
  });
  const Wu = d.reduce((s, q) => s + q.w, 0) + ECART * (liste.length - 1);
  const Hu = Math.max(...d.map((q) => q.t));
  const u = Math.min(24, 280 / Wu, 170 / Hu);
  const bas = Hu * u;
  const noms = liste.some((s) => s.nom);
  const trait = { stroke: ARETE, strokeWidth: 1.2, strokeLinejoin: "round" as const };
  const dessin: ReactNode[] = [];
  let x0 = 0;
  liste.forEach(({ h, nom }, i) => {
    const { nx, ny, nz, w } = d[i];
    const ox = x0;
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
        <text key={`n${i}`} x={(ox + (w * u) / 2).toFixed(1)} y={(bas + 18).toFixed(1)} textAnchor="middle" fontSize={14} fontWeight={900} fill={ENCRE}>
          {nom}
        </text>,
      );
    x0 += (w + ECART) * u;
  });
  const W = Wu * u + 6;
  const H = bas + (noms ? 24 : 0) + 6;
  const total = liste.map((s) => s.h.flat().reduce((a, b) => a + b, 0));
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`-3 -3 ${W.toFixed(1)} ${H.toFixed(1)}`} className="mx-auto block h-auto w-full" style={{ maxWidth: `${Math.round(Math.min(300, W * 1.3))}px` }} role="img" aria-label={`Solide${liste.length > 1 ? "s" : ""} en cubes : ${total.join(" et ")} cubes`}>
        {dessin}
      </svg>
    </div>
  );
};

/** Les trois unités : le trait de 1 cm, le carré de 1 cm², le cube de 1 cm³. */
const unites = () => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
    <svg viewBox="0 0 300 112" className="block h-auto w-full" role="img" aria-label="Une longueur de 1 cm, une aire de 1 cm², un volume de 1 cm³">
      <line x1={25} y1={62} x2={75} y2={62} stroke={ARETE} strokeWidth={3} />
      <line x1={25} y1={55} x2={25} y2={69} stroke={ARETE} strokeWidth={2} />
      <line x1={75} y1={55} x2={75} y2={69} stroke={ARETE} strokeWidth={2} />
      <rect x={130} y={40} width={40} height={40} fill="#fed7aa" stroke={ARETE} strokeWidth={2} />
      <polygon points="232,50 262,50 262,80 232,80" fill="#bfdbfe" stroke={ARETE} strokeWidth={2} />
      <polygon points="232,50 262,50 272.6,39.4 242.6,39.4" fill="#eff6ff" stroke={ARETE} strokeWidth={2} />
      <polygon points="262,50 272.6,39.4 272.6,69.4 262,80" fill="#93c5fd" stroke={ARETE} strokeWidth={2} />
      <text x={50} y={24} textAnchor="middle" fontSize={14} fontWeight={900} fill={ROUGE}>1 cm</text>
      <text x={150} y={24} textAnchor="middle" fontSize={14} fontWeight={900} fill={ROUGE}>1 cm²</text>
      <text x={252} y={24} textAnchor="middle" fontSize={14} fontWeight={900} fill={ROUGE}>1 cm³</text>
      <text x={50} y={104} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>longueur</text>
      <text x={150} y={104} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>aire</text>
      <text x={252} y={104} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>volume</text>
    </svg>
  </div>
);

export const exercicesVolumeSolide6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Vingt exercices, du geste seul au problème : compter des cubes, même cachés, lire une mesure en cm³ ou en m³, comparer deux solides, coller des morceaux, et calculer le volume d'une boîte. Une boîte de sucres, un château, un bac du jardin, un camion de déménagement. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le solide dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/volume-solide", titre: "Les volumes" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les cubes étage par étage, sans oublier ceux qu'on ne voit pas.",
      rappel: [
        "Le volume, c'est la place que prend un solide.",
        "Je compte les cubes unités qui le remplissent.",
        "Un cube de 1 cm de côté a un volume de 1 cm³.",
        "cm : une longueur. cm² : une aire. cm³ : un volume.",
      ],
      exercices: [
        {
          enonce:
            "Ce solide est fait de cubes de $1$ cm de côté. Aucun cube ne flotte.\na) Combien y a-t-il de cubes ?\nb) Quel est le volume du solide ?",
          figure: cubes([{ h: [[1, 1, 2], [2, 2, 3]] }]),
          correction:
            "Je compte pile par pile.\nRangée de devant : $1$, $1$ et $2$ cubes. Cela fait $4$.\nRangée de derrière : $2$, $2$ et $3$ cubes. Cela fait $7$.\nEn tout : $4 + 7 = 11$ cubes.\nUn cube de $1$ cm de côté vaut $1$ cm³.\n⛔ Le piège : oublier les cubes cachés. Derrière, les cubes du bas ne se voient pas. Pourtant, ils portent ceux du haut.\nRéponse : a) $11$ cubes ; b) $11$ cm³.",
          micros: ["volume_compter"],
        },
        {
          enonce:
            "Le dessin montre trois unités.\nRecopie chaque mesure avec la bonne unité : cm, cm² ou cm³.\na) La longueur d'un crayon : $15$ …\nb) La place prise par un dé à jouer : $8$ …\nc) La surface d'une carte postale : $150$ …\nd) Le volume d'une boîte à chaussures : $6\\,000$ …",
          figure: unites(),
          correction:
            "Une longueur se mesure en cm. C'est un trait.\nUne aire se mesure en cm². Ce sont des carrés.\nUn volume se mesure en cm³. Ce sont des cubes.\na) Un crayon, c'est une longueur : $15$ cm.\nb) La place prise, c'est un volume : $8$ cm³.\nc) Une surface, c'est une aire : $150$ cm².\nd) Un volume : $6\\,000$ cm³.\n⛔ Le piège : écrire cm² pour un volume. Le petit $3$ dit « trois directions » : longueur, largeur, hauteur.\nRéponse : a) cm ; b) cm³ ; c) cm² ; d) cm³.",
          micros: ["volume_unite"],
        },
        {
          enonce:
            "Sur une boîte, on lit : « volume $30$ cm³ ».\na) Combien de cubes de $1$ cm³ faut-il pour la remplir ?\nb) Le dessin montre la boîte pleine. Vérifie en comptant les cubes.",
          figure: cubes([{ h: [[2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2]] }]),
          correction:
            "a) « $30$ cm³ », cela veut dire $30$ cubes de $1$ cm³.\nb) Je compte une couche. Il y a $5$ cubes de long et $3$ rangées.\n$5 \\times 3 = 15$ cubes dans une couche.\nIl y a $2$ couches : $15 \\times 2 = 30$ cubes.\nLe compte tombe juste.\n⭐ Le nombre devant cm³ est le nombre de cubes unités.\nRéponse : a) $30$ cubes ; b) oui, $30$ cubes.",
          micros: ["volume_lire", "volume_compter"],
        },
        {
          enonce: "Voici deux solides en cubes de $1$ cm³.\na) Lequel semble le plus gros ?\nb) Compte les cubes de chacun.\nc) Lequel a le plus grand volume ?",
          figure: cubes([
            { h: [[3, 3], [3, 3]], nom: "A" },
            { h: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], nom: "B" },
          ]),
          correction:
            "a) A est plus haut. On a envie de dire A.\nb) A : $2 \\times 2 = 4$ cubes par étage. Il y a $3$ étages.\n$4 \\times 3 = 12$ cubes pour A.\nB : $5 \\times 3 = 15$ cubes, sur un seul étage.\nc) $15 > 12$. B a le plus grand volume.\n⛔ Le piège : juger à la hauteur. Pour comparer, je compte les cubes.\nRéponse : B, avec $15$ cm³ contre $12$ cm³.",
          micros: ["volume_comparer"],
        },
        {
          enonce: "Noah colle ces deux pièces l'une contre l'autre.\nChaque cube vaut $1$ cm³.\nQuel est le volume du nouveau solide ?",
          figure: cubes([
            { h: [[2, 1, 1], [1, 1, 1]], nom: "pièce 1" },
            { h: [[1, 1], [2, 1]], nom: "pièce 2" },
          ]),
          correction:
            "Je compte chaque pièce.\nPièce 1 : devant $2 + 1 + 1 = 4$, derrière $1 + 1 + 1 = 3$. Cela fait $7$ cubes.\nPièce 2 : devant $1 + 1 = 2$, derrière $2 + 1 = 3$. Cela fait $5$ cubes.\nQuand on colle, aucun cube ne disparaît.\nJ'additionne : $7 + 5 = 12$.\n⛔ Le piège : multiplier $7 \\times 5$. Coller, c'est ajouter.\nRéponse : $12$ cm³.",
          micros: ["volume_assemblage"],
        },
        {
          enonce:
            "Cette tour est faite de cubes de $1$ cm³. Tous ses étages sont pareils.\na) Combien de cubes y a-t-il dans un étage ?\nb) Combien y a-t-il d'étages ?\nc) Quel est son volume ?",
          figure: cubes([{ h: [[4, 4, 4], [4, 4, 4]] }]),
          correction:
            "a) Un étage a $3$ cubes de long et $2$ rangées.\n$3 \\times 2 = 6$ cubes dans un étage.\nb) Je compte les étages sur le côté : il y en a $4$.\nc) $4$ étages de $6$ cubes : $6 \\times 4 = 24$ cubes.\n⭐ Des étages pareils : je compte un étage, puis je multiplie.\n⛔ Le piège : compter seulement les faces visibles. La tour est pleine.\nRéponse : a) $6$ ; b) $4$ ; c) $24$ cm³.",
          micros: ["volume_compter"],
        },
        {
          enonce:
            "Complète.\na) Un solide de $16$ cubes de $1$ cm³ a un volume de … cm³.\nb) Une benne contient $9$ m³ de sable. Cela fait combien de cubes de $1$ m³ ?\nc) Dans « $45$ cm³ », quel nombre dit le volume ? Quelle est l'unité ?",
          correction:
            "a) Chaque cube vaut $1$ cm³. $16$ cubes font donc $16$ cm³.\nLe dessin montre ces $16$ cubes : $8$ colonnes de $2$.\nb) « $9$ m³ », c'est $9$ cubes de $1$ m de côté.\nc) Le nombre est $45$. L'unité est le cm³.\n⭐ Le nombre compte les cubes. L'unité dit leur taille.\nRéponse : a) $16$ cm³ ; b) $9$ cubes ; c) $45$, en cm³.",
          schema: ecranSeulement(cubes([{ h: [[2, 2, 2, 2], [2, 2, 2, 2]] }])),
          micros: ["volume_lire", "volume_unite"],
        },
        {
          enonce: "Une boîte mesure $5$ cm de long, $4$ cm de large et $2$ cm de haut.\nCombien de cubes de $1$ cm³ faut-il pour la remplir ?",
          correction:
            "Au fond, je pose $5$ cubes sur $4$ rangées.\n$5 \\times 4 = 20$ cubes dans le fond.\nLa boîte a $2$ cm de haut : il y a $2$ couches.\n$20 \\times 2 = 40$ cubes.\nC'est la formule : longueur × largeur × hauteur.\n$5 \\times 4 \\times 2 = 40$.\n⛔ Le piège : additionner, $5 + 4 + 2 = 11$. Il faut multiplier.\nRéponse : $40$ cubes, soit $40$ cm³.",
          schema: ecranSeulement(cubes([{ h: [[2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2]] }])),
          micros: ["volume_defi", "volume_compter"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même solide. Je compte, je calcule, puis je vérifie sur le dessin.",
      rappel: [
        "Étages pareils : les cubes d'un étage × le nombre d'étages.",
        "Pavé : longueur × largeur × hauteur.",
        "Coller deux solides : j'additionne leurs volumes.",
        "Comparer : même unité, puis je compare les nombres.",
      ],
      exercices: [
        {
          enonce:
            "Un escalier en cubes de $1$ cm³ a $4$ marches et $2$ rangées.\na) Combien de cubes compte une rangée ?\nb) Quel est le volume de l'escalier ?\nc) On ajoute une marche de $5$ cubes au bout de chaque rangée. Quel est le nouveau volume ?",
          figure: cubes([{ h: [[1, 2, 3, 4], [1, 2, 3, 4]] }]),
          correction:
            "a) Une rangée : $1 + 2 + 3 + 4 = 10$ cubes.\nb) Il y a $2$ rangées pareilles.\n$10 \\times 2 = 20$ cubes. Le volume est $20$ cm³.\nc) J'ajoute $5$ cubes par rangée, soit $5 \\times 2 = 10$ cubes.\n$20 + 10 = 30$ cubes.\n⛔ Le piège : oublier la rangée de derrière. Elle est cachée, mais elle compte.\nRéponse : a) $10$ cubes ; b) $20$ cm³ ; c) $30$ cm³.",
          micros: ["volume_compter", "volume_defi"],
        },
        {
          enonce:
            "Quatre boîtes à bijoux ont ces volumes.\nA : $18$ cm³ ; B : $25$ cm³ ; C : $9$ cm³ ; D : $21$ cm³.\na) Range-les de la plus petite à la plus grande.\nb) Combien de cm³ la plus grande a-t-elle de plus que la plus petite ?\nc) Sofia dit : « la boîte E fait $20$ cm² ». Qu'est-ce qui ne va pas ?",
          figure: diagramme("barres", [
            { label: "A", value: 18 },
            { label: "B", value: 25 },
            { label: "C", value: 9 },
            { label: "D", value: 21 },
          ]),
          correction:
            "a) Tout est en cm³. Je compare juste les nombres.\n$9 < 18 < 21 < 25$. L'ordre est donc C, A, D, B.\nLes barres le montrent aussi.\nb) $25 - 9 = 16$. B a $16$ cm³ de plus que C.\nc) cm² est une unité d'aire. Un volume s'écrit en cm³.\n⛔ Le piège : comparer des cm² avec des cm³. Ce ne sont pas les mêmes mesures.\nRéponse : a) C, A, D, B ; b) $16$ cm³ ; c) l'unité est fausse.",
          micros: ["volume_comparer", "volume_lire"],
        },
        {
          enonce:
            "Ce solide est fait de cubes de $1$ cm³.\na) Quel est son volume ?\nb) Léo le coupe en deux morceaux. L'un a $6$ cubes. Combien en a l'autre ?\nc) Il recolle les deux morceaux autrement. Quel est le nouveau volume ?",
          figure: cubes([{ h: [[3, 2, 2], [3, 2, 2]] }]),
          correction:
            "a) Devant : $3 + 2 + 2 = 7$ cubes. Derrière, pareil : $7$ cubes.\nEn tout : $7 + 7 = 14$ cubes, donc $14$ cm³.\nb) Couper ne fait disparaître aucun cube.\n$14 - 6 = 8$ cubes.\nc) $6 + 8 = 14$. Le volume reste $14$ cm³.\n⭐ La forme change, le volume ne change pas.\n⛔ Le piège : croire qu'une autre forme donne un autre volume.\nRéponse : a) $14$ cm³ ; b) $8$ cubes ; c) $14$ cm³.",
          micros: ["volume_assemblage"],
        },
        {
          enonce:
            "Un carton est rempli de cubes de $1$ cm³.\nIl a $6$ cubes de long, $3$ de large et $2$ de haut.\na) Combien de cubes y a-t-il dans la couche du bas ?\nb) Quel est le volume du carton ?\nc) On enlève la couche du haut. Quel volume reste-t-il ?",
          correction:
            "a) $6 \\times 3 = 18$ cubes dans la couche du bas.\nb) Il y a $2$ couches : $18 \\times 2 = 36$ cubes, soit $36$ cm³.\nAvec la formule : $6 \\times 3 \\times 2 = 36$.\nc) Il reste une couche : $36 - 18 = 18$ cm³.\n⛔ Le piège : compter seulement les cubes visibles. Le carton est plein.\nRéponse : a) $18$ cubes ; b) $36$ cm³ ; c) $18$ cm³.",
          schema: ecranSeulement(cubes([{ h: [[2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2]] }])),
          micros: ["volume_compter", "volume_defi"],
        },
        {
          enonce:
            "Deux boîtes sont remplies de cubes de $1$ cm³.\nA : $3$ cm de long, $2$ cm de large, $4$ cm de haut.\nB : $5$ cm de long, $5$ cm de large, $1$ cm de haut.\na) Calcule le volume de chaque boîte.\nb) Laquelle contient le plus ? De combien ?",
          correction:
            "a) A : $3 \\times 2 \\times 4 = 24$ cm³.\nB : $5 \\times 5 \\times 1 = 25$ cm³.\nb) $25 > 24$. B contient le plus, de $25 - 24 = 1$ cm³.\n⭐ Un seul cube d'écart. Pourtant, A a l'air bien plus grande.\n⛔ Le piège : choisir la plus haute. Je calcule avant de répondre.\nRéponse : B, de $1$ cm³.",
          schema: ecranSeulement(
            cubes([
              { h: [[4, 4, 4], [4, 4, 4]], nom: "A" },
              { h: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], nom: "B" },
            ]),
          ),
          micros: ["volume_comparer", "volume_defi"],
        },
        {
          enonce:
            "Un jardin partagé a un bac à terre. Il mesure $3$ m de long, $2$ m de large et $1$ m de haut.\na) Quel est le volume du bac, en m³ ?\nb) Un camion livre $8$ m³ de terre. Le bac peut-il tout contenir ?\nc) Combien de m³ restent sur le camion ?",
          correction:
            "a) Je découpe le bac en cubes de $1$ m de côté.\nIl y a $3$ cubes devant et $3$ derrière : $3 \\times 2 = 6$ cubes.\nChaque cube vaut $1$ m³. Le volume est $6$ m³.\nb) $8 > 6$. Non, le bac est trop petit.\nc) $8 - 6 = 2$ m³ restent sur le camion.\n⚠️ Le piège : l'unité. Ici, un cube fait $1$ m de côté. C'est un m³, pas un cm³.\nRéponse : a) $6$ m³ ; b) non ; c) $2$ m³.",
          schema: ecranSeulement(cubes([{ h: [[1, 1, 1], [1, 1, 1]] }])),
          micros: ["volume_lire", "volume_unite", "volume_comparer"],
        },
        {
          enonce: "Ce solide ressemble à un escalier posé dans un coin. Aucun cube ne flotte.\na) Combien de cubes y a-t-il à l'étage du bas ?\nb) Compte les cubes étage par étage.\nc) Combien de cubes y a-t-il en tout ?",
          figure: cubes([{ h: [[4, 3, 2, 1], [3, 3, 2, 1], [2, 2, 2, 1], [1, 1, 1, 1]] }]),
          correction:
            "Je compte étage par étage, en partant du bas.\nÉtage du bas : un carré de $4$ sur $4$. $4 \\times 4 = 16$ cubes.\nDeuxième étage : un carré de $3$ sur $3$. $3 \\times 3 = 9$ cubes.\nTroisième étage : $2 \\times 2 = 4$ cubes.\nEn haut : $1$ cube.\nEn tout : $16 + 9 + 4 + 1 = 30$ cubes.\n⛔ Le piège : compter les faces qu'on voit. Beaucoup de cubes sont cachés derrière.\nRéponse : a) $16$ cubes ; b) $16$, $9$, $4$ et $1$ ; c) $30$ cubes.",
          micros: ["volume_compter", "volume_defi"],
        },
        {
          enonce:
            "Un château en cubes de $1$ cm³ a deux tours et un mur.\nChaque tour a $2$ cubes de long, $2$ de large et $4$ de haut.\nLe mur a $2$ cubes de long, $2$ de large et $2$ de haut.\na) Calcule le volume d'une tour.\nb) Calcule le volume du mur.\nc) Quel est le volume du château ?",
          correction:
            "a) Une tour : $2 \\times 2 \\times 4 = 16$ cm³.\nb) Le mur : $2 \\times 2 \\times 2 = 8$ cm³.\nc) J'additionne les morceaux.\n$16 + 16 + 8 = 40$ cm³.\n⛔ Le piège : oublier la deuxième tour. Je compte $16$ deux fois.\nRéponse : a) $16$ cm³ ; b) $8$ cm³ ; c) $40$ cm³.",
          schema: ecranSeulement(cubes([{ h: [[4, 4, 2, 2, 4, 4], [4, 4, 2, 2, 4, 4]] }])),
          micros: ["volume_assemblage"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je compte ou je calcule le volume, puis je réponds par une phrase.",
      rappel: [
        "Je lis bien l'unité : cm³ ou m³.",
        "Je compte par étages, ou je calcule longueur × largeur × hauteur.",
        "Je finis par une phrase.",
      ],
      exercices: [
        {
          titre: "La boîte de sucres",
          enonce:
            "Une boîte de sucres est pleine. Chaque sucre est un petit cube.\nLa boîte a $5$ sucres de long, $4$ de large et $3$ couches.\na) Combien de sucres y a-t-il dans une couche ?\nb) Combien de sucres y a-t-il dans la boîte ?\nc) Mamie met $2$ sucres dans son café chaque jour. Combien de jours dure la boîte ?\nd) Après $10$ jours, combien de couches pleines reste-t-il ?",
          figure: cubes([{ h: [[3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3]] }]),
          correction:
            "a) Une couche : $5 \\times 4 = 20$ sucres.\nb) $3$ couches : $20 \\times 3 = 60$ sucres.\nc) Chaque jour, $2$ sucres partent.\n$60 \\div 2 = 30$ jours.\nd) En $10$ jours, Mamie prend $10 \\times 2 = 20$ sucres.\n$20$ sucres, c'est une couche entière.\nIl reste $3 - 1 = 2$ couches pleines.\n⛔ Le piège : ne compter que les sucres du dessus. Il y a trois couches.\nRéponse : $20$ sucres par couche, $60$ en tout. La boîte dure $30$ jours. Après $10$ jours, il reste $2$ couches.",
          micros: ["volume_compter", "volume_defi"],
        },
        {
          titre: "Le côté qui double",
          enonce:
            "Inès a un cube de $2$ cm de côté. Il est fait de petits cubes de $1$ cm³.\nElle construit un cube de $4$ cm de côté.\na) Combien de petits cubes y a-t-il dans le petit cube ?\nb) Et dans le grand cube ?\nc) Le côté est $2$ fois plus long. Le volume est-il $2$ fois plus grand ?",
          figure: cubes([
            { h: [[2, 2], [2, 2]], nom: "2 cm" },
            { h: [[4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4]], nom: "4 cm" },
          ]),
          correction:
            "a) Petit cube : $2 \\times 2 \\times 2 = 8$ petits cubes.\nb) Grand cube : un étage a $4 \\times 4 = 16$ cubes.\nIl y a $4$ étages : $16 \\times 4 = 64$ petits cubes.\nc) $64 \\div 8 = 8$. Le volume est $8$ fois plus grand.\n⛔ Le piège : répondre « $2$ fois ». Le côté double en longueur, en largeur et en hauteur.\n$2 \\times 2 \\times 2 = 8$.\nRéponse : a) $8$ cm³ ; b) $64$ cm³ ; c) non, $8$ fois plus grand.",
          micros: ["volume_defi", "volume_comparer"],
        },
        {
          titre: "Le déménagement",
          enonce:
            "La famille Martin déménage.\nLa caisse du camion mesure $4$ m de long, $2$ m de large et $2$ m de haut.\na) Quel est le volume de la caisse, en m³ ?\nb) Il faut charger une armoire de $2$ m³, un canapé de $3$ m³ et $8$ cartons de $1$ m³. Quel volume cela fait-il ?\nc) Y a-t-il assez de place ? Combien de m³ restent libres ?",
          correction:
            "a) $4 \\times 2 \\times 2 = 16$ m³.\nLe dessin montre les $16$ cubes de $1$ m³.\nb) Les $8$ cartons font $8 \\times 1 = 8$ m³.\nJ'additionne tout : $2 + 3 + 8 = 13$ m³.\nc) $13 < 16$ : il y a assez de place.\n$16 - 13 = 3$ m³ restent libres.\n⚠️ En vrai, les meubles laissent des trous entre eux. Le calcul dit seulement que c'est possible.\nRéponse : $16$ m³ ; $13$ m³ à charger ; oui, il reste $3$ m³.",
          schema: cubes([{ h: [[2, 2, 2, 2], [2, 2, 2, 2]] }]),
          micros: ["volume_unite", "volume_assemblage", "volume_comparer"],
        },
        {
          titre: "Vingt-quatre cubes",
          enonce:
            "Tom a $24$ cubes de $1$ cm³. Il veut faire un pavé plein avec tous.\na) Peut-il faire un pavé de $6$ cubes de long, $2$ de large et $2$ de haut ?\nb) Et un pavé de $4$ de long, $3$ de large et $2$ de haut ?\nc) Trouve un autre pavé avec les $24$ cubes.\nd) Ces pavés ont-ils le même volume ?",
          correction:
            "a) $6 \\times 2 \\times 2 = 24$. Oui, il utilise les $24$ cubes.\nb) $4 \\times 3 \\times 2 = 24$. Oui, lui aussi.\nc) Par exemple : $12$ de long, $2$ de large, $1$ de haut.\nEn effet, $12 \\times 2 \\times 1 = 24$.\nd) Oui. Chaque pavé a $24$ cubes, donc $24$ cm³.\n⭐ Des formes différentes peuvent avoir le même volume.\n⛔ Le piège : croire que le plus long est le plus gros. Tous ont $24$ cubes.\nRéponse : a) oui ; b) oui ; c) par exemple $12 \\times 2 \\times 1$ ; d) oui, $24$ cm³.",
          schema: cubes([
            { h: [[2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2]], nom: "a)" },
            { h: [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]], nom: "b)" },
          ]),
          micros: ["volume_defi", "volume_comparer", "volume_assemblage"],
        },
      ],
    },
  ],
};
