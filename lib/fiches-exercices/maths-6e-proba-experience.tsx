// ─── Fiche d'exercices : premiers pas en probabilités (6e) — 20 exercices ──────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-proba-experience.tsx` (aides `roue`, `echelle`, `patron` reprises,
// mesurées à 375 px).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-probabilites.tsx`
// (« Premiers pas en probabilités ») et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/probabilites.bank.ts`, notionId
// proba_experience : le vocabulaire (expérience aléatoire, issue, événement,
// certain, possible, impossible), lister les issues, comparer des chances,
// estimer une chance sur l'échelle de 0 à 1, lire une situation (sac, roue,
// dé, cartes), défis.
// ⛔ LIMITES DE LA 6e, lues dans la banque et la fiche de cours : UNE seule
// épreuve, des chances dites « 3 chances sur 6 » (la banque écrit « 3/6 ») —
// aucune formule, aucun produit, aucune fraction à simplifier par calcul. On
// compare « 2 sur 6 » et « 1 sur 3 » en regroupant les secteurs (ex. 15). Pas
// de pourcentage. L'échelle de 0 à 1 place « à peu près » (ex. 4).
// ⛔ Aucun exemple de la fiche de cours de 6e (le dé et ses nombres pairs,
// obtenir 7 / 6 / un nombre entre 1 et 6, le sac 4 rouges - 2 bleues -
// 1 verte, la roue A-4 B-1 C-1, la roue A-B-C-D, 3 rouges - 4 bleues -
// 2 vertes, 1,5, « 80 % de pluie »), ni de la feuille de 5e (jetons 2-4-6-8,
// chaussettes, destinations, mois, Scrabble, dé de Tom 1-2-1-3-2-1…).
// ⭐ Phrases courtes (Frédéric, 30/09) : des 6e qui lisent parfois mal. Une
// idée par phrase, 12 mots en moyenne.
//
// Les pièges nommés : « certain » dès que beaucoup d'issues conviennent (1),
// compter les couleurs au lieu des billes (2, 8), comparer à l'œil (3), croire
// qu'un événement rare est impossible (4), « au moins 4 » sans le 4 (6), croire
// aléatoire ce qu'on ne sait pas de tête (7), « deux chiffres » sans le 12 (9),
// choisir le sac qui a le plus de rouges (10), « probable » pris pour
// « certain » (11), croire qu'un événement ne peut pas être certain (12), une
// lettre lue deux fois (13), confondre 0 et 0,1 (14), compter les secteurs
// gagnants sans le total (15), un sac « plus probable » mais certain (16), un
// ticket « au milieu » (17), une règle qui a l'air juste (18), « la plus
// probable » prise pour « une chance sur deux » (19), oublier une règle (20).
//
// Aucun fait réel : les roues, les sacs, les cartes, le dé de Zoé, la tombola,
// les bulbes et la fête foraine sont des MODÈLES.
//
// ⭐ LES DESSINS : le matériel lui-même — `billes` et `de` de figures.tsx (sans
// largeur minimale), et, repris de la 5e, la ROUE (`roue`, secteurs à la vraie
// proportion, flèche en haut), l'ÉCHELLE de 0 à 1 (`echelle`, noms sur deux
// hauteurs) et le PATRON d'un dé (`patron`) ; plus `barres` et `grille`
// (reprises de la feuille des données de 6e). 13 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement`, leurs données sont alors dans
// l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-proba-experience.mjs`
// — chaque « chances sur » est retrouvé en ÉNUMÉRANT le matériel DESSINÉ (les
// billes une à une, les secteurs de la roue, les faces du patron et du dé), et
// chaque événement est réévalué (certain, possible, impossible).
//
// Micro-compétences : proba_vocabulaire (1, 7, 9, 12, 17), proba_comparer (3,
// 10, 15, 18, 19), proba_issue (2, 6, 9, 12, 17, 18, 19), proba_estimer (4, 6,
// 11, 14, 17), proba_lire (5, 9, 13, 18, 19), proba_defi (8, 10, 16, 17, 18,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, billes, de } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#eab308";
const VIOLET = "#7c3aed";
const GRIS = "#94a3b8";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins côte à côte (à partir de `sm` et sur papier), l'un sous l'autre au téléphone. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 min-w-0 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);
const nomme = (nom: string, dessin: ReactNode) => (
  <div className="min-w-0">
    <p className="mb-1 text-center text-sm font-black text-slate-700">{nom}</p>
    {dessin}
  </div>
);

/** 18.5 → « 18,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

const TEINTES_ROUE = [BLEU, ORANGE, VERT, JAUNE, VIOLET, ROUGE];

/**
 * La ROUE de loterie (reprise de la 5e), en SVG local : police 15 dans un
 * viewBox de 300, aucune largeur minimale. Les secteurs à la vraie proportion
 * de leur `poids`, dans l'ordre des aiguilles d'une montre à partir du haut ;
 * la flèche en haut. ⛔ Texte NU dans `label`. ⭐ Le script relit les secteurs.
 */
const roue = (segments: { label: string; poids: number; couleur?: string }[]) => {
  const total = segments.reduce((s, g) => s + g.poids, 0);
  const [cx, cy, r] = [150, 124, 100];
  const pt = (a: number, rr: number) => [cx + rr * Math.cos((a * Math.PI) / 180), cy + rr * Math.sin((a * Math.PI) / 180)];
  let a0 = -90;
  const parts = segments.map((g, i) => {
    const da = (g.poids / total) * 360;
    const [a, b] = [a0, a0 + da];
    a0 = b;
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    const [lx, ly] = pt((a + b) / 2, r * 0.62);
    return {
      d: `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${da > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      lx,
      ly,
      couleur: g.couleur ?? TEINTES_ROUE[i % TEINTES_ROUE.length],
      label: g.label,
    };
  });
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[12rem]">
      <svg viewBox="0 0 300 232" className="block h-auto w-full" role="img" aria-label="Roue de loterie">
        {parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.couleur} stroke="#ffffff" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={NOIR} strokeWidth={2} />
        {parts.map((p, i) => (
          <text key={`t${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {p.label}
          </text>
        ))}
        <path d={`M ${cx - 9} 4 L ${cx + 9} 4 L ${cx} 22 Z`} fill={NOIR} />
      </svg>
    </div>
  );
};

/**
 * L'ÉCHELLE DES CHANCES (reprise de la 5e) : une droite de 0 à 1 graduée en
 * dixièmes, et des points nommés. Les noms sont rangés par valeur et alternent
 * sur deux hauteurs (20 d'écart) : deux valeurs voisines ne se chevauchent
 * pas. ⛔ Texte NU. ⭐ Le script relit les `valeur`.
 */
const echelle = (points: { label: string; valeur: number }[]) => {
  const x = (v: number) => 24 + v * 252;
  const tries = [...points].sort((a, b) => a.valeur - b.valeur);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 104" className="block h-auto w-full" role="img" aria-label="Échelle des chances">
        <rect x={x(0)} y="60" width={x(1) - x(0)} height="8" fill="#bbf7d0" />
        <line x1={x(0) - 10} y1="64" x2={x(1) + 10} y2="64" stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, k) => (
          <line key={k} x1={x(k / 10)} y1={k % 5 ? 59 : 55} x2={x(k / 10)} y2={k % 5 ? 69 : 73} stroke="#334155" strokeWidth={k % 5 ? 1.2 : 2} />
        ))}
        {["0", "0,5", "1"].map((t, k) => (
          <text key={t} x={x(k / 2)} y="94" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
            {t}
          </text>
        ))}
        {tries.map((p, i) => {
          const haut = i % 2 === 0 ? 20 : 40;
          return (
            <g key={p.label}>
              <line x1={x(p.valeur)} y1={haut + 4} x2={x(p.valeur)} y2="64" stroke={BLEU} strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx={x(p.valeur)} cy="64" r="5" fill={BLEU} />
              <text x={x(p.valeur)} y={haut} textAnchor="middle" fontSize="15" fontWeight="900" fill={BLEU}>
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Le PATRON d'un dé (reprise de la 5e) : une croix de six carrés, la lettre de
 * chaque face écrite dedans. ⭐ Le script relit les six faces.
 */
const patron = (faces: string[]) => {
  const c = 54;
  const [ox, oy] = [42, 6];
  const places = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox="0 0 300 174" className="block h-auto w-full" role="img" aria-label="Patron du dé">
        {places.map(([i, j], k) => (
          <g key={k}>
            <rect x={ox + i * c} y={oy + j * c} width={c} height={c} fill="#f8fafc" stroke={NOIR} strokeWidth={2} />
            <text x={ox + i * c + c / 2} y={oy + j * c + c / 2 + 8} textAnchor="middle" fontSize="22" fontWeight="900" fill={BLEU}>
              {faces[k]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

type Barre = { label: string; value: number };

/**
 * Un diagramme en BARRES (reprise de la feuille des données de 6e) : viewBox
 * 300, police 14, la valeur écrite au-dessus de chaque barre, aucune largeur
 * minimale. ⭐ Le script relit `{ label, value }`.
 */
const barres = (data: Barre[]) => {
  const [W, G, D, HAUT, BAS] = [300, 16, 10, 28, 150];
  const vmax = Math.max(1, ...data.map((d) => d.value));
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = Math.min(40, slot * 0.6);
  const H = BAS + 30;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        <line x1={G - 4} y1={HAUT - 14} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx="3" fill="#bfdbfe" stroke={BLEU} strokeWidth="1.5" />
              <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                {fr(d.value)}
              </text>
              <text x={x + bw / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Un tableau HTML (reprise de la 5e) : TROIS colonnes au plus, textes courts.
 * ⛔ Texte NU dans les cases.
 */
const grille = (entetes: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1.5 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesProbaExperience6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "proba-experience",
  titre: "Premiers pas en probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème. Dire si un événement est certain, possible ou impossible. Lister toutes les issues. Compter les chances et les comparer. Placer une chance sur l'échelle de 0 à 1. Des roues, des sacs de billes, des cartes, un dé fabriqué, une tombola, des bulbes de fleurs, une fête foraine. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le matériel dessiné et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/proba-experience", titre: "Premiers pas en probabilités" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul geste : je liste les issues, je compte, puis je choisis le bon mot.",
      rappel: [
        "Une expérience est aléatoire quand le résultat dépend du hasard. Chaque résultat possible est une issue.",
        "Un événement est certain s'il arrive à tous les coups. Il est impossible s'il n'arrive jamais. Sinon, il est possible.",
        "Pour comparer des chances, je compte les issues qui conviennent.",
        "Une chance se place entre 0 (impossible) et 1 (certain).",
      ],
      exercices: [
        {
          enonce:
            "On fait tourner cette roue. Elle a $6$ secteurs égaux. On lit le nombre montré par la flèche.\nPour chaque événement, dis s'il est certain, possible ou impossible.\na) « Obtenir un nombre impair. »\nb) « Obtenir $4$. »\nc) « Obtenir $7$. »\nd) « Obtenir un nombre plus petit que $20$. »\ne) « Obtenir un nombre plus grand que $10$. »",
          figure: roue([{ label: "1", poids: 1 }, { label: "3", poids: 1 }, { label: "5", poids: 1 }, { label: "7", poids: 1 }, { label: "9", poids: 1 }, { label: "11", poids: 1 }]),
          correction:
            "Je lis les $6$ nombres de la roue : $1$, $3$, $5$, $7$, $9$, $11$.\na) Ils sont tous impairs : l'événement arrive à tous les coups. Il est certain.\nb) Aucun secteur ne porte $4$ : impossible.\nc) Un secteur porte $7$. Il peut sortir, mais pas à coup sûr : possible.\nd) Tous les nombres sont plus petits que $20$ : certain.\ne) Seul $11$ est plus grand que $10$ : possible.\n⛔ Le piège : dire « certain » dès que beaucoup de secteurs conviennent. Certain, c'est TOUS les secteurs.\nRéponse : a) certain ; b) impossible ; c) possible ; d) certain ; e) possible.",
          micros: ["proba_vocabulaire"],
        },
        {
          enonce:
            "Écris toutes les issues, puis compte-les.\na) On lance une pièce.\nb) On joue à pierre-feuille-ciseaux. Quel geste va faire l'adversaire ?\nc) On tire une bille dans un sac. Le sac contient $3$ billes rouges et $2$ billes bleues.",
          correction:
            "Une issue, c'est un résultat possible.\na) Pile ou face : $2$ issues.\nb) Pierre, feuille ou ciseaux : $3$ issues.\nc) Chaque bille peut sortir. Je numérote les billes de $1$ à $5$.\nIl y a $3 + 2 = 5$ billes, donc $5$ issues.\n⛔ Le piège au c) : répondre $2$, pour les deux couleurs. Je compte les BILLES, pas les couleurs.\nRéponse : a) $2$ ; b) $3$ ; c) $5$.",
          schema: ecranSeulement(billes([{ label: "1", couleur: ROUGE }, { label: "2", couleur: ROUGE }, { label: "3", couleur: ROUGE }, { label: "4", couleur: BLEU }, { label: "5", couleur: BLEU }])),
          micros: ["proba_issue"],
        },
        {
          enonce:
            "Un sac contient $6$ billes vertes, $3$ billes jaunes et $1$ bille noire. On tire une bille au hasard.\na) Quelle couleur a le plus de chances de sortir ?\nb) Quelle couleur a le moins de chances ?\nc) Le vert a-t-il deux fois plus de chances que le jaune ?",
          correction:
            "Je compte les billes de chaque couleur. Plus il y a de billes, plus il y a de chances.\na) $6$ vertes : c'est le plus grand nombre. Le vert a le plus de chances.\nb) $1$ seule noire : le noir a le moins de chances.\nc) $2 \\times 3 = 6$ : il y a deux fois plus de vertes que de jaunes.\nOui, le vert a deux fois plus de chances que le jaune.\n⛔ Le piège : juger à l'œil. Je compte, puis je compare les nombres.\nRéponse : a) le vert ; b) le noir ; c) oui.",
          schema: ecranSeulement(billes([{ couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: NOIR }])),
          micros: ["proba_comparer"],
        },
        {
          enonce:
            "Place chaque événement sur une échelle de $0$ à $1$, à peu près.\na) Demain, le soleil se lèvera.\nb) Tirer une bille rouge dans un sac de billes toutes bleues.\nc) Obtenir pile en lançant une pièce.\nd) Obtenir $6$ en lançant un dé.\ne) Obtenir au moins $2$ en lançant un dé.",
          correction:
            "$0$, c'est impossible. $1$, c'est certain. Au milieu, $0{,}5$ : une chance sur deux.\na) C'est certain : je le place à $1$.\nb) Il n'y a aucune bille rouge : impossible, je le place à $0$.\nc) Pile ou face : une chance sur deux. Je le place au milieu, à $0{,}5$.\nd) Une seule face sur $6$ porte le $6$. C'est peu probable : près de $0$.\ne) $5$ faces sur $6$ conviennent : $2$, $3$, $4$, $5$ et $6$. C'est très probable : près de $1$.\n⛔ Le piège au d) : placer « obtenir $6$ » à $0$. Il est rare, mais il est possible !\nRéponse : b) à $0$ ; d) près de $0$ ; c) à $0{,}5$ ; e) près de $1$ ; a) à $1$.",
          schema: echelle([{ label: "a", valeur: 1 }, { label: "b", valeur: 0 }, { label: "c", valeur: 0.5 }, { label: "d", valeur: 0.17 }, { label: "e", valeur: 0.83 }]),
          micros: ["proba_estimer"],
        },
        {
          enonce:
            "Cette roue a trois couleurs : B pour bleu, O pour orange, V pour vert.\na) Quelle couleur a le plus de chances de sortir ?\nb) L'orange et le vert ont-ils autant de chances ?\nc) « Obtenir bleu » est-il certain ?\nd) Quelle couleur a une chance sur deux de sortir ?",
          figure: roue([{ label: "B", poids: 2, couleur: BLEU }, { label: "O", poids: 1, couleur: ORANGE }, { label: "V", poids: 1, couleur: VERT }]),
          correction:
            "Je regarde la taille de chaque secteur.\na) Le bleu occupe la moitié de la roue : c'est le plus grand secteur.\nb) L'orange et le vert occupent chacun un quart de la roue. Oui, ils ont autant de chances.\nc) Non. La flèche peut aussi s'arrêter sur l'orange ou le vert.\nd) Le bleu : il occupe la moitié de la roue.\n⛔ Le piège au c) : confondre « le plus probable » et « certain ». Le bleu sort souvent, pas toujours.\nRéponse : a) le bleu ; b) oui ; c) non ; d) le bleu.",
          micros: ["proba_lire"],
        },
        {
          enonce:
            "On lance un dé à $6$ faces.\na) Quelles faces réalisent « obtenir au moins $4$ » ?\nb) Combien de chances sur $6$ cela fait-il ?\nc) Et pour « obtenir $2$ » ?",
          correction:
            "a) « Au moins $4$ », c'est $4$ ou plus. Les faces $4$, $5$ et $6$.\nb) $3$ faces conviennent, sur $6$ : $3$ chances sur $6$.\nOn écrit aussi $\\dfrac{3}{6}$. C'est la moitié des faces : une chance sur deux.\nc) Une seule face porte le $2$ : $1$ chance sur $6$.\n⛔ Le piège au a) : oublier le $4$. « Au moins $4$ » compte le $4$.\nRéponse : a) $4$, $5$, $6$ ; b) $3$ chances sur $6$ ; c) $1$ chance sur $6$.",
          schema: ecranSeulement(de([4, 5, 6])),
          micros: ["proba_issue", "proba_estimer"],
        },
        {
          enonce:
            "Ces expériences sont-elles aléatoires ? Réponds oui ou non, et explique.\na) Tirer au sort l'équipe qui commence un match.\nb) Compter les pattes d'une araignée.\nc) Lancer une pièce.\nd) Prendre une chaussette, dans le noir, dans un tiroir bien mélangé.\ne) Calculer $12 \\times 5$.",
          correction:
            "Une expérience est aléatoire si le résultat dépend du hasard.\na) Oui : on ne sait pas quelle équipe sera tirée.\nb) Non : une araignée a toujours $8$ pattes.\nc) Oui : pile ou face, on ne peut pas le prévoir.\nd) Oui : dans le noir, on ne sait pas quelle chaussette on prend.\ne) Non : $12 \\times 5 = 60$, à tous les coups.\n⛔ Le piège : croire aléatoire ce qu'on ne sait pas de tête. Le calcul du e) a une seule réponse.\nRéponse : aléatoires : a), c) et d) ; pas aléatoires : b) et e).",
          schema: ecranSeulement(grille(["expérience", "aléatoire ?"], [["a", "oui"], ["b", "non"], ["c", "oui"], ["d", "oui"], ["e", "non"]])),
          micros: ["proba_vocabulaire"],
        },
        {
          enonce:
            "Dans un sac, il y a $1$ bille rouge et $4$ billes bleues. Léo dit : « Il y a deux couleurs. Donc j'ai une chance sur deux de tirer du rouge. » A-t-il raison ?",
          correction:
            "Je compte les billes : $1 + 4 = 5$ billes, donc $5$ issues.\nUne seule bille est rouge : $1$ chance sur $5$.\nQuatre billes sont bleues : $4$ chances sur $5$.\nLe bleu a bien plus de chances que le rouge.\n⛔ Le piège : compter les couleurs au lieu des billes. Deux couleurs ne font pas deux chances égales.\nRéponse : non, Léo a $1$ chance sur $5$ de tirer du rouge.",
          schema: ecranSeulement(billes([{ couleur: ROUGE }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }])),
          micros: ["proba_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme en devoir : je liste les issues, je compte, je compare, puis je réponds par une phrase.",
      rappel: [
        "Je compte les objets (billes, cartes, secteurs égaux), jamais les sortes.",
        "« 3 chances sur 6 » : 3 issues conviennent, sur 6 issues en tout.",
        "Pour comparer deux sacs, je regarde la part des billes qui conviennent, pas leur nombre.",
      ],
      exercices: [
        {
          enonce:
            "On tire au hasard une carte parmi $12$ cartes. Elles sont numérotées de $1$ à $12$.\na) Combien y a-t-il d'issues ?\nb) Quelles cartes réalisent « un nombre à deux chiffres » ? Combien ?\nc) Quelles cartes réalisent « un multiple de $4$ » ?\nd) « Tirer un nombre plus petit que $13$ » : certain, possible ou impossible ?",
          correction:
            "a) Chaque carte est une issue : $12$ issues.\nb) Les nombres à deux chiffres : $10$, $11$ et $12$. Cela fait $3$ cartes.\nc) Les multiples de $4$ : $4$, $8$ et $12$.\nd) Toutes les cartes sont plus petites que $13$ : l'événement est certain.\n⛔ Le piège au b) : oublier le $12$. Je relis la liste jusqu'au bout.\n⭐ La carte $12$ réalise b) ET c) : une issue peut réaliser deux événements.\nRéponse : a) $12$ ; b) $3$ cartes ; c) $4$, $8$, $12$ ; d) certain.",
          schema: ecranSeulement(
            billes([{ label: "1", couleur: GRIS }, { label: "2", couleur: GRIS }, { label: "3", couleur: GRIS }, { label: "4", couleur: GRIS }, { label: "5", couleur: GRIS }, { label: "6", couleur: GRIS }, { label: "7", couleur: GRIS }, { label: "8", couleur: GRIS }, { label: "9", couleur: GRIS }, { label: "10", couleur: ORANGE }, { label: "11", couleur: ORANGE }, { label: "12", couleur: ORANGE }]),
          ),
          micros: ["proba_issue", "proba_lire", "proba_vocabulaire"],
        },
        {
          enonce:
            "Tu gagnes si tu tires une bille rouge. Tu peux choisir ton sac.\na) Dans le sac A, combien de chances de gagner ?\nb) Dans le sac B, combien de chances de gagner ?\nc) Quel sac vaut-il mieux choisir ?",
          figure: deux(
            nomme("Sac A", billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: BLEU }])),
            nomme("Sac B", billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }])),
          ),
          correction:
            "a) Sac A : $3$ rouges sur $4$ billes. $3$ chances sur $4$.\nC'est plus de la moitié : $4 \\div 2 = 2$, et $3$ est plus grand que $2$.\nb) Sac B : $5$ rouges sur $10$ billes. $5$ chances sur $10$.\nC'est la moitié tout juste : une chance sur deux.\nc) Le sac A donne plus de la moitié des chances. Le sac B, la moitié. Je choisis le sac A.\n⛔ Le piège : choisir le sac B parce qu'il a plus de rouges. Il a aussi beaucoup plus de bleues !\nRéponse : a) $3$ sur $4$ ; b) $5$ sur $10$ ; c) le sac A.",
          micros: ["proba_comparer", "proba_defi"],
        },
        {
          enonce:
            "Cette roue a $10$ secteurs égaux. Tu gagnes si la flèche s'arrête sur un secteur G.\na) Combien de chances sur $10$ de gagner ?\nb) Gagner est-il plutôt probable ou peu probable ?\nc) Place « gagner » et « perdre » sur une échelle de $0$ à $1$.",
          figure: roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "G", poids: 1, couleur: VERT }]),
          correction:
            "a) Je compte les secteurs G, en faisant le tour : $7$. Il y a $7$ chances sur $10$ de gagner.\nb) $7$, c'est plus de la moitié de $10$ : gagner est plutôt probable.\nc) $7$ chances sur $10$, c'est $0{,}7$. Je place « gagner » à $0{,}7$.\nIl reste $10 - 7 = 3$ secteurs P : « perdre » se place à $0{,}3$.\n⛔ Le piège : dire que gagner est certain. Il reste $3$ secteurs perdants.\nRéponse : a) $7$ sur $10$ ; b) probable ; c) gagner à $0{,}7$, perdre à $0{,}3$.",
          schema: ecranSeulement(echelle([{ label: "perdre", valeur: 0.3 }, { label: "gagner", valeur: 0.7 }])),
          micros: ["proba_estimer"],
        },
        {
          enonce:
            "On tire au hasard le nom d'un jour de la semaine.\na) Combien y a-t-il d'issues ?\nb) « Tirer un jour du week-end » : combien d'issues le réalisent ?\nc) « Tirer un jour dont le nom contient la lettre i » : certain, possible ou impossible ?\nd) « Tirer un jour dont le nom commence par x » : certain, possible ou impossible ?",
          correction:
            "a) Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche : $7$ issues.\nb) Samedi et dimanche : $2$ issues. Cela fait $2$ chances sur $7$.\nc) Je relis les sept noms, un par un. Chacun contient un i !\nL'événement arrive à tous les coups : il est certain.\nd) Aucun jour ne commence par x : impossible.\n⛔ Le piège au c) : répondre « possible » sans vérifier. Un événement peut être certain, même s'il a l'air surprenant.\nRéponse : a) $7$ ; b) $2$ ; c) certain ; d) impossible.",
          schema: ecranSeulement(grille(["jour", "contient i ?"], [["lundi", "oui"], ["mardi", "oui"], ["mercredi", "oui"], ["jeudi", "oui"], ["vendredi", "oui"], ["samedi", "oui"], ["dimanche", "oui"]])),
          micros: ["proba_vocabulaire", "proba_issue"],
        },
        {
          enonce:
            "Zoé fabrique un dé avec ce patron. Chaque face a la même chance de sortir.\na) Combien de faces portent la lettre B ?\nb) Quelle lettre a le plus de chances de sortir ?\nc) Combien de chances sur $6$ d'obtenir A ?\nd) « Obtenir D » : que dire de cet événement ?",
          figure: patron(["A", "B", "A", "B", "C", "B"]),
          correction:
            "Je lis les six faces, une par une, et je les coche.\na) La lettre B est sur $3$ faces.\nb) B a le plus de faces : c'est la lettre qui a le plus de chances.\nc) La lettre A est sur $2$ faces : $2$ chances sur $6$.\nd) Aucune face ne porte D : c'est impossible.\n⛔ Le piège : compter une face deux fois. Je coche chaque face lue.\n⭐ Contrôle : $2 + 3 + 1 = 6$ faces pour A, B et C.\nRéponse : a) $3$ ; b) B ; c) $2$ sur $6$ ; d) impossible.",
          micros: ["proba_lire", "proba_comparer"],
        },
        {
          enonce:
            "Associe chaque phrase à un nombre : $0$ ; $0{,}1$ ; $0{,}5$ ; $0{,}9$ ; $1$.\na) « C'est presque sûr que ça arrive. »\nb) « Ça ne peut pas arriver. »\nc) « Il y a une chance sur deux. »\nd) « C'est sûr et certain. »\ne) « C'est très peu probable. »",
          correction:
            "Sur l'échelle, $0$ veut dire impossible et $1$ veut dire certain.\na) Presque sûr : très près de $1$. C'est $0{,}9$.\nb) Impossible : $0$.\nc) Une chance sur deux : le milieu, $0{,}5$.\nd) Certain : $1$.\ne) Très peu probable : très près de $0$. C'est $0{,}1$.\n⛔ Le piège : mettre $0$ pour « très peu probable ». $0$, c'est jamais. Très peu probable, ça peut quand même arriver.\nRéponse : a) $0{,}9$ ; b) $0$ ; c) $0{,}5$ ; d) $1$ ; e) $0{,}1$.",
          schema: ecranSeulement(echelle([{ label: "a", valeur: 0.9 }, { label: "b", valeur: 0 }, { label: "c", valeur: 0.5 }, { label: "d", valeur: 1 }, { label: "e", valeur: 0.1 }])),
          micros: ["proba_estimer"],
        },
        {
          enonce:
            "À la fête de l'école, deux roues. Les secteurs d'une même roue sont égaux. On gagne sur un secteur G.\nLéa préfère la roue A : « Elle a plus de secteurs gagnants. »\na) Combien de chances de gagner avec la roue A ? Avec la roue B ?\nb) Léa a-t-elle raison ?",
          figure: deux(
            nomme("Roue A", roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }])),
            nomme("Roue B", roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }])),
          ),
          correction:
            "a) Roue A : $2$ secteurs G sur $6$. Donc $2$ chances sur $6$.\nRoue B : $1$ secteur G sur $3$. Donc $1$ chance sur $3$.\nb) Je fais le tour de la roue A : G-P-P, puis encore G-P-P.\nLa roue A, c'est deux fois la roue B ! Sur $3$ secteurs, $1$ seul est gagnant.\nDonc $2$ chances sur $6$, c'est comme $1$ chance sur $3$.\nLes deux roues donnent autant de chances. Léa a tort.\n⛔ Le piège : compter les secteurs gagnants sans regarder le total. La roue A a plus de gagnants, mais aussi plus de secteurs.\nRéponse : a) $2$ sur $6$ et $1$ sur $3$ ; b) non, c'est pareil.",
          micros: ["proba_comparer"],
        },
        {
          enonce:
            "Tu remplis un sac de $10$ billes. Tu as des billes rouges et des billes bleues.\na) Tirer une rouge doit être plus probable que tirer une bleue, mais pas certain. Propose un sac.\nb) Tirer une rouge doit avoir autant de chances que tirer une bleue. Combien de rouges ?\nc) Tirer une verte doit être impossible. Que faut-il faire ?",
          correction:
            "a) Il faut plus de rouges que de bleues. Donc plus de $5$ rouges.\nMais il faut au moins une bleue, sinon c'est certain.\nPar exemple : $7$ rouges et $3$ bleues. ($6$, $8$ ou $9$ rouges conviennent aussi.)\nb) Autant de rouges que de bleues : $10 \\div 2 = 5$ rouges.\nc) Je ne mets aucune bille verte dans le sac.\n⛔ Le piège au a) : mettre $10$ rouges. Tirer une rouge deviendrait certain.\nRéponse : a) par exemple $7$ rouges, $3$ bleues ; b) $5$ ; c) aucune verte.",
          schema: ecranSeulement(billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }])),
          micros: ["proba_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations de la vie. Je liste les issues, je compte, je compare, puis je réponds par une phrase.",
      rappel: [
        "Je liste toutes les issues, sans en oublier.",
        "Je compte celles qui conviennent : « tant de chances sur tant ».",
        "Un jeu est juste si chaque joueur a autant de chances.",
      ],
      exercices: [
        {
          titre: "La tombola de la kermesse",
          enonce:
            "À la kermesse, on vend $50$ tickets, numérotés de $1$ à $50$. Les tickets gagnants sont ceux qui finissent par $0$.\na) Quels sont les tickets gagnants ? Combien sont-ils ?\nb) Tu achètes un ticket. Combien de chances sur $50$ de gagner ?\nc) Gagner est-il probable ou peu probable ? Et perdre ?\nd) Lina veut le ticket $25$ : « Il est au milieu, il a plus de chances. » Qu'en penses-tu ?",
          correction:
            "a) Les nombres qui finissent par $0$ : $10$, $20$, $30$, $40$, $50$. Il y a $5$ tickets gagnants.\nb) $5$ tickets gagnants sur $50$ : $5$ chances sur $50$.\nc) $5$ sur $50$, c'est $1$ sur $10$ : gagner est peu probable. Je le place près de $0$, à $0{,}1$.\nPerdre : $50 - 5 = 45$ chances sur $50$. C'est très probable : près de $1$, à $0{,}9$.\nd) Le $25$ finit par $5$, pas par $0$. Il est perdant à coup sûr !\nEt « au milieu » ne change rien : chaque ticket a la même chance d'être vendu.\n⛔ Le piège : croire qu'une place « au milieu » porte chance. Je vérifie la règle du jeu.\nRéponse : a) $5$ tickets ; b) $5$ sur $50$ ; c) peu probable, et perdre est très probable ; d) le $25$ perd.",
          schema: echelle([{ label: "gagner", valeur: 0.1 }, { label: "perdre", valeur: 0.9 }]),
          micros: ["proba_estimer", "proba_vocabulaire", "proba_issue", "proba_defi"],
        },
        {
          titre: "Qui commence ?",
          enonce:
            "Emma et Noé jouent. Pour savoir qui commence, ils lancent un dé. Voici trois règles.\nRègle 1 : Emma commence si le dé montre $1$ ou $2$. Sinon, c'est Noé.\nRègle 2 : Emma commence si le nombre est pair. Sinon, c'est Noé.\nRègle 3 : Emma commence avec un $6$. Noé commence avec un $1$. Sinon, on relance.\na) Pour chaque règle, compte les faces de chacun.\nb) Quelles règles sont justes pour les deux ?",
          correction:
            "a) Règle 1 : Emma a $2$ faces, le $1$ et le $2$. Noé a les $4$ autres : $3$, $4$, $5$, $6$.\nRègle 2 : Emma a $3$ faces, $2$, $4$, $6$. Noé a $3$ faces, $1$, $3$, $5$.\nRègle 3 : Emma a $1$ face, le $6$. Noé a $1$ face, le $1$. Les autres faces ne comptent pas : on relance.\nb) Un jeu est juste si chacun a autant de faces.\nRègle 1 : $2$ contre $4$, Noé est favorisé. Injuste.\nRègle 2 : $3$ contre $3$. Juste.\nRègle 3 : $1$ contre $1$. Juste aussi !\n⛔ Le piège : trouver la règle 3 injuste, parce qu'on relance souvent. Relancer ne favorise personne.\nRéponse : b) les règles 2 et 3.",
          schema: de([1, 2]),
          micros: ["proba_comparer", "proba_issue", "proba_lire", "proba_defi"],
        },
        {
          titre: "Le sachet de bulbes",
          enonce:
            "Un sachet contient $20$ bulbes de fleurs. À l'œil, ils sont tous pareils. Le diagramme donne le nombre de bulbes de chaque fleur. On plante un bulbe pris au hasard.\na) Combien y a-t-il d'issues ?\nb) Quelle fleur a le plus de chances de pousser ? Combien de chances sur $20$ ?\nc) Les tulipes ont-elles une chance sur deux ?\nd) « Obtenir une rose » : que dire ?\ne) Range les fleurs, de la moins probable à la plus probable.",
          figure: barres([{ label: "tulipe", value: 10 }, { label: "jonquille", value: 6 }, { label: "crocus", value: 4 }]),
          correction:
            "a) Chaque bulbe est une issue : $20$ issues.\nb) La barre la plus haute est la tulipe : $10$ bulbes. Donc $10$ chances sur $20$.\nc) La moitié de $20$ : $20 \\div 2 = 10$. Oui, une chance sur deux.\nd) Aucun bulbe de rose : c'est impossible.\ne) Crocus ($4$), jonquille ($6$), tulipe ($10$).\n⭐ Contrôle : $10 + 6 + 4 = 20$ bulbes.\n⛔ Le piège : croire que la fleur la plus probable a toujours une chance sur deux. Ici oui, car $10$ est la moitié de $20$. Il faut le vérifier.\nRéponse : a) $20$ ; b) la tulipe, $10$ sur $20$ ; c) oui ; d) impossible ; e) crocus, jonquille, tulipe.",
          micros: ["proba_lire", "proba_comparer", "proba_issue"],
        },
        {
          titre: "La roue de la fête foraine",
          enonce:
            "Tu fabriques une roue de $8$ secteurs égaux. Chaque secteur donne une peluche (P), un bonbon (B) ou rien (R). Voici tes règles.\nRègle 1 : gagner une peluche est possible, mais c'est le moins probable.\nRègle 2 : gagner un bonbon est plus probable que gagner une peluche.\nRègle 3 : « rien » est le plus probable, mais pas certain.\na) Propose une roue.\nb) Pour ta roue, donne les chances sur $8$ de chaque lot.",
          correction:
            "a) Je commence par la peluche : le moins de secteurs, mais au moins $1$. Je mets $1$ secteur P.\nLe bonbon doit avoir plus de secteurs : je mets $3$ secteurs B.\nIl reste $8 - 1 - 3 = 4$ secteurs R.\nJe vérifie les règles. Règle 1 : $1$ P, c'est le moins. Règle 2 : $3$ B, plus que $1$. Règle 3 : $4$ R, le plus, mais pas les $8$.\nb) Peluche : $1$ chance sur $8$. Bonbon : $3$ chances sur $8$. Rien : $4$ chances sur $8$, une chance sur deux.\n⛔ Le piège : oublier une règle, par exemple mettre $8$ secteurs R. « Rien » deviendrait certain.\nRéponse : par exemple $1$ P, $3$ B, $4$ R ; $1$ sur $8$, $3$ sur $8$, $4$ sur $8$.",
          schema: roue([{ label: "P", poids: 1, couleur: VIOLET }, { label: "R", poids: 1, couleur: GRIS }, { label: "B", poids: 1, couleur: JAUNE }, { label: "R", poids: 1, couleur: GRIS }, { label: "B", poids: 1, couleur: JAUNE }, { label: "R", poids: 1, couleur: GRIS }, { label: "B", poids: 1, couleur: JAUNE }, { label: "R", poids: 1, couleur: GRIS }]),
          micros: ["proba_defi"],
        },
      ],
    },
  ],
};
