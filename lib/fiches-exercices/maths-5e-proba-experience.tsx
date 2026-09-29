// ─── Fiche d'exercices : les probabilités (5e) — 20 exercices corrigés ──────────
//
// Feuille du 29/09/2026 (lot de 5e, forme de la feuille étalon
// `maths-5e-relatif-nombre.tsx`). Alignée sur la fiche de cours
// `lib/fiches/maths-5e-probabilites.tsx` (« Les probabilités ») et sur la banque
// `lib/tutor-v4/questionBank/5e/maths/probabilites.bank.ts`, notionId
// proba_experience : le vocabulaire (expérience aléatoire, issue, événement,
// certain, impossible), les issues, l'équiprobabilité, le calcul d'une
// probabilité simple (favorables ÷ possibles, en fraction, en décimal, en
// pourcentage) et des défis.
//
// ⛔ LIMITES DE LA 5e, lues dans la banque : UNE SEULE ÉPREUVE partout. La
// banque n'a aucune expérience à deux épreuves : ni tableau à double entrée, ni
// arbre ici. L'« événement contraire » n'apparaît que comme « ne pas obtenir… »
// (la banque le pose en défi), calculé en comptant les AUTRES issues.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni le dé et ses nombres
// pairs, ni P(3) = 1/6, ni le sac de 3 rouges et 2 bleues, ni les roues A-B-C-D,
// 3-1-1, 3-2-1 et 3-1, ni 1,3, ni le panier de fruits) ; ni ceux de la feuille
// de 4e (dé à 12 faces, PARAPLUIE, jours de la semaine, jeu de 32 cartes,
// sacs A et B, feu tricolore, bonbons, dé à 8 faces, roue 90-60-120-90,
// tombola de 200 tickets, stands, classe de 25, météorite, Liste rouge, Coupe
// du monde, sac des insectes).
//
// Les pièges nommés : croire aléatoire ce qu'on ne sait pas encore de tête (1),
// « plus grand que 3 » avec le 3 (2), « certain » dès que la moitié convient
// (3), « deux issues, donc une chance sur deux » (4), oublier une issue dans
// « au moins » (5), diviser par le nombre de sortes (6, 10, 17), 30 % placé à
// 30 (7), croire que le nombre de rouges ne change pas avec le total (8),
// compter de 10 à 20 comme 10 nombres (9), 12 graines sur 40 lues 12 % (11),
// « pas noire » réduit à « blanche » (12), comparer des nombres de secteurs au
// lieu de probabilités (13), oublier le â de château (14), oublier juillet ou
// août (15), recopier les fractions en nombres d'objets (16, 20), 2 secteurs
// sur 12 pris pour un cinquième (18), garder l'ancien total (19).
//
// Les faits réels et leur source :
// - le calendrier : le 1er janvier 2027 est un vendredi, et les mois de 31, 30
//   et 28 jours (année non bissextile) — vérifiés par le script avec l'objet
//   Date de JavaScript (ex. 1 et 15) ;
// - un litre d'eau pure pèse environ 1 kg (définition historique du
//   kilogramme) — ex. 1 ;
// - le Scrabble en français : 102 jetons, dont 2 jokers ; 15 E, 9 A, 8 I, 6 O,
//   6 U et 1 Y (règlement officiel du jeu, répartition des lettres de l'édition
//   française, reprise par la Fédération internationale de Scrabble
//   francophone ; pas de jeton Ç) — ex. 17. ⚠️ À faire relire par Frédéric.
// - le reste (sacs, roues, tiroir, graines, oiseaux bagués, dé de Tom) est un
//   MODÈLE, dit comme tel quand c'est un relevé.
//
// ⭐ LES DESSINS : le matériel lui-même — le dé et les billes du coach
// (`de`, `billes`, `tableauProba`, `diagramme` de figures.tsx), et trois SVG
// locaux lisibles à 375 px (police 14-15 dans un viewBox de 300, sans largeur
// minimale) : la ROUE (`roue`, secteurs à la vraie proportion, flèche en haut),
// l'ÉCHELLE DES PROBABILITÉS de 0 à 1 (`echelle`) et le PATRON du dé de Tom
// (`patron`). 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-proba-experience.mjs` —
// chaque probabilité est retrouvée en ÉNUMÉRANT le matériel DESSINÉ (les billes
// une à une, les secteurs de la roue, les faces du patron, les cases des
// tableaux), en fractions exactes, puis cherchée dans le corrigé.
//
// Micro-compétences : proba_vocabulaire (1, 3, 7, 12, 14, 17, 20), proba_issue
// (2, 9, 12, 14, 15, 17, 20), proba_equiprobabilite (4, 10, 13, 18, 20),
// proba_calculer (5, 6, 7, 9, 10, 11, 12, 13, 15, 17, 18, 19), proba_defi (8,
// 12, 13, 16, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, billes, de, diagramme, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#eab308";
const VIOLET = "#7c3aed";
const GRIS = "#94a3b8";
const BLANC = "#e2e8f0";
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

const TEINTES_ROUE = [BLEU, ORANGE, VERT, JAUNE, VIOLET, ROUGE];

/**
 * La ROUE de loterie, en SVG local (lisible à 375 px : police 15 dans un
 * viewBox de 300, aucune largeur minimale). Les secteurs à la vraie
 * proportion de leur `poids`, dans l'ordre des aiguilles d'une montre à partir
 * du haut ; la flèche en haut. ⛔ Texte NU dans `label`. ⭐ Le script de
 * recalcul relit les secteurs.
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
 * L'ÉCHELLE DES PROBABILITÉS : une droite de 0 à 1 graduée en dixièmes, la bande
 * verte des valeurs possibles, et des points nommés. Les noms sont rangés par
 * valeur et alternent sur deux hauteurs (20 d'écart) : deux valeurs voisines ne
 * se chevauchent pas. ⛔ Texte NU. ⭐ Le script relit les `valeur`.
 */
const echelle = (points: { label: string; valeur: number }[]) => {
  const x = (v: number) => 24 + v * 252;
  const tries = [...points].sort((a, b) => a.valeur - b.valeur);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 104" className="block h-auto w-full" role="img" aria-label="Échelle des probabilités">
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
 * Le PATRON d'un dé (une croix de six carrés) avec le nombre écrit sur chaque
 * face. ⭐ Le script de recalcul relit les six faces.
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

export const exercicesProbaExperience5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître une expérience aléatoire, lister les issues, dire si un événement est certain ou impossible, reconnaître l'équiprobabilité, calculer une probabilité (issues favorables ÷ issues possibles) et l'écrire en fraction, en décimal ou en pourcentage. Des roues de kermesse, des billes, un tiroir de chaussettes, des bombes à graines, les mois de l'année, le sac du Scrabble, des oiseaux bagués, un dé fabriqué à la main. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le matériel dessiné et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/proba-experience", titre: "Les probabilités" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul geste : je liste les issues, je reconnais un événement, je compte puis je divise.",
      rappel: [
        "Une expérience est aléatoire quand on connaît tous les résultats possibles sans pouvoir prévoir lequel sortira. Chaque résultat possible est une issue.",
        "Un événement est réalisé par une ou plusieurs issues. Il est certain si toutes les issues le réalisent, impossible si aucune ne le réalise.",
        "Quand toutes les issues ont la même chance (elles sont équiprobables) : probabilité = issues favorables ÷ issues possibles.",
        "Une probabilité est un nombre entre $0$ (impossible) et $1$ (certain).",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque expérience, dis si elle est aléatoire ou non, et explique.\na) Lancer une pièce de monnaie et regarder la face du dessus.\nb) Peser un litre d'eau pure sur une balance précise.\nc) Tirer un numéro du loto.\nd) Chercher dans un calendrier le jour de la semaine du 1er janvier 2027.\ne) Choisir au hasard un élève de la classe pour aller au tableau.",
          correction:
            "Une expérience est aléatoire quand on connaît tous les résultats possibles, mais qu'on ne peut pas prévoir lequel va sortir.\na) Aléatoire : pile ou face, on ne sait pas lequel sortira.\nb) Pas aléatoire : un litre d'eau pure pèse toujours environ $1$ kg. On connaît le résultat à l'avance.\nc) Aléatoire : chaque numéro peut sortir, sans qu'on sache lequel.\nd) Pas aléatoire : le calendrier donne la réponse, c'est un vendredi. Il n'y a aucun hasard.\ne) Aléatoire : si on choisit vraiment au hasard, on ne sait pas quel élève sera appelé.\n⛔ Le piège : croire qu'une expérience est aléatoire dès qu'on ne connaît pas la réponse de tête. Au d), la réponse est écrite d'avance : il suffit de la chercher.\nRéponse : aléatoires : a), c) et e) ; pas aléatoires : b) et d).",
          schema: ecranSeulement(tableau(["expérience", "a)", "b)", "c)", "d)", "e)"], ["aléatoire ?", "oui", "non", "oui", "non", "oui"], true)),
          micros: ["proba_vocabulaire"],
        },
        {
          enonce:
            "On fait tourner cette roue, partagée en $5$ secteurs égaux, et on lit le numéro montré par la flèche.\na) Écris toutes les issues de l'expérience.\nb) Quelles issues réalisent l'événement A : « obtenir un nombre impair » ?\nc) Quelles issues réalisent l'événement B : « obtenir un nombre plus grand que $3$ » ?",
          figure: roue([{ label: "1", poids: 1 }, { label: "2", poids: 1 }, { label: "3", poids: 1 }, { label: "4", poids: 1 }, { label: "5", poids: 1 }]),
          correction:
            "a) Une issue, c'est un résultat possible. La flèche peut montrer $1$, $2$, $3$, $4$ ou $5$ : il y a $5$ issues.\nb) Les nombres impairs de la roue sont $1$, $3$ et $5$. A est réalisé par $3$ issues.\nc) Plus grand que $3$ : $4$ et $5$. Le $3$ n'est pas plus grand que lui-même. B est réalisé par $2$ issues.\n⛔ Le piège au c) : compter le $3$. « Plus grand que $3$ » exclut le $3$.\n⭐ Une issue peut réaliser deux événements à la fois : $5$ est impair ET plus grand que $3$.\nRéponse : a) $1$, $2$, $3$, $4$, $5$ ; b) $1$, $3$, $5$ ; c) $4$ et $5$.",
          micros: ["proba_issue"],
        },
        {
          enonce:
            "Un sac contient quatre jetons, numérotés $2$, $4$, $6$ et $8$. On tire un jeton au hasard.\nPour chaque événement, dis s'il est certain, impossible, ou ni l'un ni l'autre.\na) « Tirer un nombre pair. »\nb) « Tirer le $5$. »\nc) « Tirer un nombre plus grand que $5$. »\nd) « Tirer un nombre plus petit que $10$. »",
          figure: billes([{ label: "2", couleur: BLEU }, { label: "4", couleur: BLEU }, { label: "6", couleur: BLEU }, { label: "8", couleur: BLEU }]),
          correction:
            "Un événement est certain si TOUTES les issues le réalisent, impossible si AUCUNE ne le réalise.\na) $2$, $4$, $6$ et $8$ sont tous pairs : l'événement est certain.\nb) Aucun jeton ne porte le $5$ : l'événement est impossible.\nc) $6$ et $8$ le réalisent, mais pas $2$ ni $4$ : il n'est ni certain, ni impossible.\nd) Les quatre nombres sont plus petits que $10$ : l'événement est certain.\n⛔ Le piège au c) : répondre « certain » parce que la moitié des jetons conviennent. Pour être certain, il faut que TOUS les jetons conviennent.\nRéponse : a) certain ; b) impossible ; c) ni l'un ni l'autre ; d) certain.",
          micros: ["proba_vocabulaire"],
        },
        {
          enonce:
            "Dans chaque cas, les issues ont-elles toutes la même chance ? On dit alors qu'elles sont équiprobables.\na) On lance une pièce bien équilibrée : pile ou face.\nb) On lance un dé à $6$ faces dans lequel on a collé un petit plomb, près d'une face.\nc) Un sac contient $6$ billes rouges et $2$ bleues. On tire une bille : les issues sont « rouge » et « bleue ».\nd) Le même sac. On numérote les $8$ billes de $1$ à $8$ et on note le numéro tiré.\ne) Demain, il pleuvra ou il ne pleuvra pas.",
          correction:
            "a) Oui : la pièce est équilibrée, pile et face ont chacune une chance sur deux.\nb) Non : le plomb alourdit un côté du dé, certaines faces tombent plus souvent que d'autres.\nc) Non : il y a $6$ billes rouges et seulement $2$ bleues. Le rouge a plus de chances de sortir.\nd) Oui : chaque bille a la même chance d'être tirée, donc chaque numéro aussi.\ne) Non : rien ne dit que la pluie a une chance sur deux. Cela dépend du ciel, de la saison, de l'endroit.\n⛔ Le piège : « deux issues, donc une chance sur deux ». Au c) et au e), il y a deux issues, mais pas deux chances égales.\n⭐ Au c) et au d), c'est le même sac : ce sont les BILLES qui sont équiprobables, pas les couleurs.\nRéponse : a) oui ; b) non ; c) non ; d) oui ; e) non.",
          schema: ecranSeulement(
            billes([{ label: "1", couleur: ROUGE }, { label: "2", couleur: ROUGE }, { label: "3", couleur: ROUGE }, { label: "4", couleur: ROUGE }, { label: "5", couleur: ROUGE }, { label: "6", couleur: ROUGE }, { label: "7", couleur: BLEU }, { label: "8", couleur: BLEU }]),
          ),
          micros: ["proba_equiprobabilite"],
        },
        {
          enonce:
            "On lance un dé équilibré à $6$ faces.\na) Quelle est la probabilité d'obtenir un multiple de $3$ ?\nb) Quelle est la probabilité d'obtenir $1$ ?\nc) Quelle est la probabilité d'obtenir au moins $2$ ?",
          correction:
            "Le dé est équilibré : les $6$ faces ont la même chance. Je compte les faces favorables et je divise par $6$.\na) Les multiples de $3$ du dé sont $3$ et $6$ : $2$ faces. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.\nb) Une seule face porte le $1$ : $P = \\dfrac{1}{6}$.\nc) « Au moins $2$ » : $2$, $3$, $4$, $5$ ou $6$, soit $5$ faces. $P = \\dfrac{5}{6}$.\n⛔ Le piège au c) : oublier le $2$. « Au moins $2$ » veut dire $2$ OU plus.\n⭐ Contrôle : « obtenir $1$ » et « au moins $2$ » se partagent toutes les faces : $\\dfrac{1}{6} + \\dfrac{5}{6} = 1$.\nRéponse : a) $\\dfrac{1}{3}$ ; b) $\\dfrac{1}{6}$ ; c) $\\dfrac{5}{6}$.",
          schema: de([3, 6]),
          micros: ["proba_calculer"],
        },
        {
          enonce:
            "Un sac contient $7$ billes vertes, $5$ jaunes et $3$ noires, toutes de même taille. On tire une bille au hasard.\na) Combien y a-t-il d'issues possibles ?\nb) Calcule la probabilité de tirer une bille verte, puis jaune, puis noire.\nc) Simplifie les fractions quand c'est possible.",
          figure: billes([{ couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: NOIR }, { couleur: NOIR }, { couleur: NOIR }]),
          correction:
            "a) Chaque bille est une issue : $7 + 5 + 3 = 15$ billes, donc $15$ issues possibles, toutes avec la même chance.\nb) $P(\\text{verte}) = \\dfrac{7}{15}$ ; $P(\\text{jaune}) = \\dfrac{5}{15}$ ; $P(\\text{noire}) = \\dfrac{3}{15}$.\nc) $\\dfrac{5}{15} = \\dfrac{1}{3}$ et $\\dfrac{3}{15} = \\dfrac{1}{5}$. $\\dfrac{7}{15}$ ne se simplifie pas.\n⭐ Contrôle : $\\dfrac{7}{15} + \\dfrac{5}{15} + \\dfrac{3}{15}$ $= \\dfrac{15}{15} = 1$.\n⛔ Le piège : diviser par $3$, le nombre de couleurs. Je divise par le nombre de BILLES.\nRéponse : $\\dfrac{7}{15}$ ; $\\dfrac{1}{3}$ ; $\\dfrac{1}{5}$.",
          micros: ["proba_calculer"],
        },
        {
          enonce:
            "Écris chaque probabilité en nombre décimal, puis place-la sur une échelle graduée de $0$ à $1$.\na) une chance sur deux ; b) $\\dfrac{1}{4}$ ; c) $0{,}9$ ; d) $30$ % ; e) la probabilité d'un événement impossible ; f) celle d'un événement certain.",
          correction:
            "Une probabilité est toujours un nombre entre $0$ et $1$. Je l'écris en décimal pour la placer.\na) Une chance sur deux : $\\dfrac{1}{2} = 1 \\div 2 = 0{,}5$, au milieu.\nb) $\\dfrac{1}{4} = 1 \\div 4 = 0{,}25$.\nc) $0{,}9$ : presque certain.\nd) $30$ %, c'est $\\dfrac{30}{100} = 0{,}3$.\ne) Impossible : $0$.\nf) Certain : $1$.\n⛔ Le piège au d) : placer $30$ % à $30$, bien après $1$. Un pourcentage se lit « sur $100$ » : $30$ %, c'est $0{,}3$.\nRéponse : e) $0$ ; b) $0{,}25$ ; d) $0{,}3$ ; a) $0{,}5$ ; c) $0{,}9$ ; f) $1$.",
          schema: echelle([{ label: "a", valeur: 0.5 }, { label: "b", valeur: 0.25 }, { label: "c", valeur: 0.9 }, { label: "d", valeur: 0.3 }, { label: "e", valeur: 0 }, { label: "f", valeur: 1 }]),
          micros: ["proba_vocabulaire", "proba_calculer"],
        },
        {
          enonce:
            "Une urne contient $8$ boules. La probabilité de tirer une boule rouge est $\\dfrac{3}{8}$.\na) Combien y a-t-il de boules rouges ?\nb) Quelle est la probabilité de ne pas tirer une boule rouge ?\nc) Une autre urne contient $16$ boules, avec la même probabilité $\\dfrac{3}{8}$ de tirer une rouge. Combien a-t-elle de boules rouges ?",
          correction:
            "a) $\\dfrac{3}{8}$ veut dire : $3$ issues favorables sur $8$ possibles. Il y a $3$ boules rouges.\nb) Ne pas tirer une rouge, c'est tirer une des $8 - 3 = 5$ autres boules : $P = \\dfrac{5}{8}$.\nAutre façon : $1 - \\dfrac{3}{8} = \\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$.\nc) $\\dfrac{3}{8} = \\dfrac{6}{16}$ : il faut $6$ rouges sur $16$ boules.\n⛔ Le piège au c) : répondre encore $3$ rouges. La probabilité dit la PART des rouges, pas leur nombre : avec deux fois plus de boules, il faut deux fois plus de rouges.\nRéponse : a) $3$ ; b) $\\dfrac{5}{8}$ ; c) $6$ rouges.",
          schema: ecranSeulement(billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: GRIS }, { couleur: GRIS }, { couleur: GRIS }, { couleur: GRIS }, { couleur: GRIS }])),
          micros: ["proba_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme en devoir : je compte les issues, j'écris la probabilité de plusieurs façons, je compare.",
      rappel: [
        "Je compte les OBJETS (billes, cartes, secteurs égaux), pas les sortes : trois couleurs ne font pas trois chances égales.",
        "Une probabilité s'écrit en fraction, en décimal ou en pourcentage : $\\dfrac{1}{4} = 0{,}25$, soit $25$ %.",
        "Ne pas réaliser un événement : je compte les AUTRES issues. Les deux probabilités font $1$ à elles deux.",
      ],
      exercices: [
        {
          enonce:
            "On tire au hasard une carte parmi $20$ cartes numérotées de $1$ à $20$.\na) Combien y a-t-il d'issues ? Sont-elles équiprobables ?\nb) Quelle est la probabilité de tirer un multiple de $5$ ?\nc) Quelle est la probabilité de tirer un nombre à deux chiffres ?\nd) Quelle est la probabilité de tirer un nombre qui se termine par $7$ ?",
          correction:
            "a) Chaque carte est une issue : $20$ issues. On tire au hasard, donc elles ont toutes la même chance.\nb) Les multiples de $5$ : $5$, $10$, $15$ et $20$. $P = \\dfrac{4}{20} = \\dfrac{1}{5}$.\nc) Les nombres à deux chiffres vont de $10$ à $20$ : $11$ cartes. $P = \\dfrac{11}{20}$.\nd) Se terminent par $7$ : $7$ et $17$. $P = \\dfrac{2}{20} = \\dfrac{1}{10}$.\n⛔ Le piège au c) : compter de $10$ à $20$ comme $10$ nombres. Avec $10$ ET $20$, il y en a $20 - 10 + 1 = 11$.\nRéponse : a) $20$ issues équiprobables ; b) $\\dfrac{1}{5}$ ; c) $\\dfrac{11}{20}$ ; d) $\\dfrac{1}{10}$.",
          schema: ecranSeulement(
            billes([{ label: "1", couleur: GRIS }, { label: "2", couleur: GRIS }, { label: "3", couleur: GRIS }, { label: "4", couleur: GRIS }, { label: "5", couleur: ORANGE }, { label: "6", couleur: GRIS }, { label: "7", couleur: GRIS }, { label: "8", couleur: GRIS }, { label: "9", couleur: GRIS }, { label: "10", couleur: ORANGE }, { label: "11", couleur: GRIS }, { label: "12", couleur: GRIS }, { label: "13", couleur: GRIS }, { label: "14", couleur: GRIS }, { label: "15", couleur: ORANGE }, { label: "16", couleur: GRIS }, { label: "17", couleur: GRIS }, { label: "18", couleur: GRIS }, { label: "19", couleur: GRIS }, { label: "20", couleur: ORANGE }]),
          ),
          micros: ["proba_issue", "proba_calculer"],
        },
        {
          enonce:
            "Cette roue est partagée en $10$ secteurs égaux : J pour jaune, V pour violet, O pour orange.\na) Les $10$ secteurs sont-ils équiprobables ? Et les trois couleurs ?\nb) Calcule la probabilité de chaque couleur, en fraction puis en décimal.\nc) Quelle couleur a le plus de chances de sortir ?",
          figure: roue([{ label: "J", poids: 1, couleur: JAUNE }, { label: "V", poids: 1, couleur: VIOLET }, { label: "J", poids: 1, couleur: JAUNE }, { label: "O", poids: 1, couleur: ORANGE }, { label: "J", poids: 1, couleur: JAUNE }, { label: "V", poids: 1, couleur: VIOLET }, { label: "J", poids: 1, couleur: JAUNE }, { label: "O", poids: 1, couleur: ORANGE }, { label: "J", poids: 1, couleur: JAUNE }, { label: "V", poids: 1, couleur: VIOLET }]),
          correction:
            "a) Les secteurs sont égaux : chacun a la même chance, $\\dfrac{1}{10}$. Mais les couleurs n'ont pas le même nombre de secteurs : elles ne sont pas équiprobables.\nb) Je compte les secteurs de chaque couleur.\nJaune : $5$ secteurs, $P = \\dfrac{5}{10} = \\dfrac{1}{2} = 0{,}5$.\nViolet : $3$ secteurs, $P = \\dfrac{3}{10} = 0{,}3$.\nOrange : $2$ secteurs, $P = \\dfrac{2}{10} = \\dfrac{1}{5} = 0{,}2$.\nc) Le jaune, qui a le plus de secteurs.\n⭐ Contrôle : $0{,}5 + 0{,}3 + 0{,}2 = 1$.\n⛔ Le piège : « trois couleurs, donc une chance sur trois chacune ». Ce sont les SECTEURS qui ont la même chance, pas les couleurs.\nRéponse : jaune $\\dfrac{1}{2}$, violet $\\dfrac{3}{10}$, orange $\\dfrac{1}{5}$ ; c'est le jaune.",
          micros: ["proba_equiprobabilite", "proba_calculer"],
        },
        {
          enonce:
            "Pour un atelier de jardinage, chaque graine est enfermée dans une petite boule d'argile, toutes pareilles : ce sont des « bombes à graines » (sachet imaginé pour l'exercice). On en prend une au hasard.\na) Combien y a-t-il d'issues possibles ?\nb) Calcule la probabilité de prendre chaque sorte de graine. Écris-la en fraction simplifiée, en décimal, puis en pourcentage.\nc) Quelle est la probabilité de ne pas prendre une graine de haricot ?",
          figure: tableau(["graine", "tournesol", "haricot", "courge", "total"], ["nombre", 12, 20, 8, 40], true),
          correction:
            "a) Chaque boule d'argile est une issue : $12 + 20 + 8 = 40$ issues, toutes avec la même chance.\nb) Tournesol : $\\dfrac{12}{40} = \\dfrac{3}{10} = 0{,}3$, soit $30$ %.\nHaricot : $\\dfrac{20}{40} = \\dfrac{1}{2} = 0{,}5$, soit $50$ %.\nCourge : $\\dfrac{8}{40} = \\dfrac{1}{5} = 0{,}2$, soit $20$ %.\nc) Ne pas prendre de haricot, c'est prendre un tournesol ou une courge : $12 + 8 = 20$ boules. $P = \\dfrac{20}{40} = \\dfrac{1}{2}$, soit $50$ %.\n⭐ Contrôle : $30 + 50 + 20 = 100$ : les trois pourcentages font bien $100$ %.\n⛔ Le piège : écrire $12$ % pour le tournesol. $12$ graines sur $40$, ce n'est pas $12$ sur $100$.\nRéponse : tournesol $30$ %, haricot $50$ %, courge $20$ % ; ne pas prendre de haricot : $50$ %.",
          schema: ecranSeulement(diagramme("camembert", [{ label: "tournesol", value: 30 }, { label: "haricot", value: 50 }, { label: "courge", value: 20 }])),
          micros: ["proba_calculer"],
        },
        {
          enonce:
            "Dans un tiroir, il y a $5$ chaussettes noires, $4$ blanches et $3$ rayées. Karim en prend une au hasard, dans le noir.\na) Combien y a-t-il d'issues possibles ?\nb) Calcule la probabilité de prendre une chaussette noire, puis blanche, puis rayée.\nc) Donne un événement certain et un événement impossible pour cette expérience.\nd) Quelle est la probabilité de ne pas prendre une chaussette noire ?",
          correction:
            "a) Chaque chaussette est une issue : $5 + 4 + 3 = 12$ issues, toutes avec la même chance.\nb) $P(\\text{noire}) = \\dfrac{5}{12}$ ; $P(\\text{blanche}) = \\dfrac{4}{12} = \\dfrac{1}{3}$ ; $P(\\text{rayée}) = \\dfrac{3}{12} = \\dfrac{1}{4}$.\nc) Certain : « prendre une chaussette noire, blanche ou rayée » : toutes les issues le réalisent, sa probabilité est $1$.\nImpossible : « prendre une chaussette rouge » : aucune issue ne le réalise, sa probabilité est $0$.\nd) Pas noire : blanche ou rayée, $4 + 3 = 7$ chaussettes. $P = \\dfrac{7}{12}$.\n⭐ Contrôle : $\\dfrac{5}{12} + \\dfrac{7}{12} = 1$.\n⛔ Le piège au d) : répondre $\\dfrac{1}{3}$ en ne pensant qu'aux blanches. « Pas noire » réunit TOUTES les autres chaussettes.\nRéponse : a) $12$ issues ; b) $\\dfrac{5}{12}$, $\\dfrac{1}{3}$ et $\\dfrac{1}{4}$ ; d) $\\dfrac{7}{12}$.",
          schema: ecranSeulement(billes([{ label: "N", couleur: NOIR }, { label: "N", couleur: NOIR }, { label: "N", couleur: NOIR }, { label: "N", couleur: NOIR }, { label: "N", couleur: NOIR }, { label: "B", couleur: BLANC }, { label: "B", couleur: BLANC }, { label: "B", couleur: BLANC }, { label: "B", couleur: BLANC }, { label: "R", couleur: ORANGE }, { label: "R", couleur: ORANGE }, { label: "R", couleur: ORANGE }])),
          micros: ["proba_vocabulaire", "proba_issue", "proba_calculer", "proba_defi"],
        },
        {
          enonce:
            "À la fête de l'école, deux stands proposent une roue. Les secteurs d'une même roue sont égaux ; on gagne sur un secteur G.\na) Quelle est la probabilité de gagner avec la roue A ? Avec la roue B ?\nb) Écris ces deux probabilités en nombre décimal, arrondi au centième si besoin.\nc) Quelle roue vaut-il mieux choisir ?\nd) Léo préfère la roue A « parce qu'elle a moins de secteurs perdants ». A-t-il raison ?",
          figure: deux(
            nomme("Roue A", roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }])),
            nomme("Roue B", roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }])),
          ),
          correction:
            "a) Roue A : $3$ secteurs égaux, dont $1$ gagnant. $P_A = \\dfrac{1}{3}$.\nRoue B : $8$ secteurs égaux, dont $3$ gagnants. $P_B = \\dfrac{3}{8}$.\nb) $1 \\div 3 \\approx 0{,}33$ et $3 \\div 8 = 0{,}375 \\approx 0{,}38$.\nc) $0{,}375 > 0{,}33$ : la roue B donne un peu plus de chances de gagner.\nd) Non. La roue A a moins de secteurs perdants ($2$ contre $5$), mais aussi moins de secteurs en tout. On compare des PROBABILITÉS, pas des nombres de secteurs.\n⛔ Le piège : comparer $1$ et $3$ secteurs gagnants, ou $2$ et $5$ perdants. Il faut diviser par le nombre de secteurs de CHAQUE roue.\nRéponse : $P_A = \\dfrac{1}{3} \\approx 0{,}33$ ; $P_B = \\dfrac{3}{8} = 0{,}375$ ; la roue B.",
          micros: ["proba_calculer", "proba_equiprobabilite", "proba_defi"],
        },
        {
          enonce:
            "Pour la sortie de fin d'année, on tire au sort la destination parmi cinq papiers : musée, zoo, parc, plage, château.\na) Écris les issues de l'expérience. Sont-elles équiprobables ?\nb) E est l'événement « une sortie en plein air » : zoo, parc ou plage. Calcule sa probabilité.\nc) F est l'événement « le nom de la sortie contient la lettre a ». Quelles issues le réalisent ? Calcule sa probabilité.\nd) L'événement « aller au cinéma » est-il possible ?",
          correction:
            "a) Les issues sont les $5$ destinations : musée, zoo, parc, plage et château. Les papiers sont tirés au hasard : elles ont toutes la même chance, $\\dfrac{1}{5}$.\nb) E est réalisé par $3$ issues : zoo, parc et plage. $P(E) = \\dfrac{3}{5}$.\nc) Je relis chaque mot : parc, plage et château contiennent un a ; musée et zoo, non. $P(F) = \\dfrac{3}{5}$.\nd) Aucun papier ne porte « cinéma » : l'événement est impossible, sa probabilité est $0$.\n⭐ E et F ont la même probabilité, mais pas les mêmes issues : zoo réalise E et pas F ; château réalise F et pas E.\n⛔ Le piège au c) : oublier château, où le a porte un accent circonflexe. â, c'est bien la lettre a.\nRéponse : a) $5$ issues équiprobables ; b) $P(E) = \\dfrac{3}{5}$ ; c) parc, plage, château, et $P(F) = \\dfrac{3}{5}$ ; d) non, il est impossible.",
          schema: ecranSeulement(tableauProba(["destination", "E", "F"], [["musée", "non", "non"], ["zoo", "oui", "non"], ["parc", "oui", "oui"], ["plage", "oui", "oui"], ["château", "non", "oui"]], [[1, 1], [2, 1], [3, 1], [2, 2], [3, 2], [4, 2]])),
          micros: ["proba_issue", "proba_vocabulaire"],
        },
        {
          enonce:
            "On choisit au hasard un mois de l'année, en tirant son nom dans un chapeau. On prend une année qui n'est pas bissextile.\na) Combien y a-t-il d'issues ?\nb) Quelle est la probabilité de tirer un mois de $31$ jours ? Un mois de $30$ jours ? Février ?\nc) Vérifie que la somme de ces trois probabilités vaut $1$. Pourquoi ?\nd) Quelle est la probabilité de tirer un mois dont le nom finit par « bre » ?",
          correction:
            "a) Les $12$ mois sont les issues, et chaque papier a la même chance.\nb) $31$ jours : janvier, mars, mai, juillet, août, octobre et décembre. $P = \\dfrac{7}{12}$.\n$30$ jours : avril, juin, septembre et novembre. $P = \\dfrac{4}{12} = \\dfrac{1}{3}$.\nFévrier est seul : $P = \\dfrac{1}{12}$.\nc) $\\dfrac{7}{12} + \\dfrac{4}{12} + \\dfrac{1}{12}$ $= \\dfrac{12}{12} = 1$. Chaque mois est dans un groupe et un seul : les trois groupes réunissent toutes les issues.\nd) Septembre, octobre, novembre et décembre : $P = \\dfrac{4}{12} = \\dfrac{1}{3}$.\n⛔ Le piège au b) : oublier que juillet ET août ont tous les deux $31$ jours. Je compte sur les bosses de mes poings : chaque bosse est un mois de $31$ jours.\nRéponse : a) $12$ issues ; b) $\\dfrac{7}{12}$, $\\dfrac{1}{3}$ et $\\dfrac{1}{12}$ ; d) $\\dfrac{1}{3}$.",
          schema: ecranSeulement(
            tableauProba(["mois", "jours"], [["janvier", "31"], ["février", "28"], ["mars", "31"], ["avril", "30"], ["mai", "31"], ["juin", "30"], ["juillet", "31"], ["août", "31"], ["septembre", "30"], ["octobre", "31"], ["novembre", "30"], ["décembre", "31"]], [[0, 1], [2, 1], [4, 1], [6, 1], [7, 1], [9, 1], [11, 1]]),
          ),
          micros: ["proba_issue", "proba_calculer"],
        },
        {
          enonce:
            "Emma prépare un sac de $12$ billes pour un jeu. Elle veut que la probabilité de tirer une bille rouge soit $\\dfrac{1}{4}$, celle de tirer une bleue $\\dfrac{1}{2}$, et que les autres billes soient vertes.\na) Combien de billes rouges doit-elle mettre ? De billes bleues ?\nb) Combien de vertes ? Quelle est la probabilité de tirer une verte ?\nc) Pourrait-elle obtenir les mêmes probabilités avec $10$ billes ?",
          correction:
            "a) Un quart des $12$ billes doit être rouge : $12 \\div 4 = 3$ rouges.\nLa moitié des $12$ billes doit être bleue : $12 \\div 2 = 6$ bleues.\nb) Il reste $12 - 3 - 6 = 3$ vertes. $P(\\text{verte}) = \\dfrac{3}{12} = \\dfrac{1}{4}$.\n⭐ Contrôle : $\\dfrac{3}{12} + \\dfrac{6}{12} + \\dfrac{3}{12} = 1$.\nc) Il faudrait $10 \\div 4 = 2{,}5$ billes rouges : on ne coupe pas une bille en deux. Avec $10$ billes, c'est impossible.\n⛔ Le piège au a) : mettre $1$ rouge et $2$ bleues, en recopiant les fractions. Avec $12$ billes, $P(\\text{rouge})$ vaudrait alors $\\dfrac{1}{12}$, pas $\\dfrac{1}{4}$.\nRéponse : a) $3$ rouges et $6$ bleues ; b) $3$ vertes et $\\dfrac{1}{4}$ ; c) non.",
          schema: billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: VERT }, { couleur: VERT }, { couleur: VERT }]),
          micros: ["proba_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : je repère ce qui a la même chance, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Je repère ce qui a la même chance (un jeton, une fiche, un secteur), je compte, puis je divise.",
        "Je contrôle : une probabilité est entre $0$ et $1$, et les probabilités de toutes les issues font $1$.",
        "Pour fabriquer un jeu, je pars de la probabilité voulue : c'est une PART du nombre total d'objets.",
      ],
      exercices: [
        {
          titre: "Le sac du Scrabble",
          enonce:
            "Dans le Scrabble en français, le sac contient $102$ jetons : $100$ lettres et $2$ jokers blancs. Parmi eux, il y a $15$ E, $9$ A, $8$ I, $6$ O, $6$ U et $1$ Y ; les autres lettres sont des consonnes (règle officielle du jeu). On pioche un jeton au hasard dans le sac bien mélangé.\na) Combien y a-t-il d'issues possibles ?\nb) Quelle est la probabilité de piocher un E ? Un joker ?\nc) Quelle est la probabilité de piocher une voyelle (A, E, I, O, U ou Y) ? Donne aussi un arrondi au centième.\nd) Le Scrabble français n'a aucun jeton Ç. Quelle est la probabilité de piocher un Ç ? Comment appelle-t-on cet événement ?",
          figure: tableau(["jeton", "E", "A", "I", "O", "U", "Y"], ["nombre", 15, 9, 8, 6, 6, 1], true),
          correction:
            "a) Chaque jeton est une issue : $102$ issues, qui ont toutes la même chance puisque le sac est bien mélangé.\nb) $15$ jetons E sur $102$ : $P(\\text{E}) = \\dfrac{15}{102} = \\dfrac{5}{34} \\approx 0{,}15$.\n$2$ jokers sur $102$ : $P(\\text{joker}) = \\dfrac{2}{102} = \\dfrac{1}{51}$.\nc) Les voyelles : $15 + 9 + 8 + 6 + 6 + 1 = 45$ jetons. $P = \\dfrac{45}{102} = \\dfrac{15}{34} \\approx 0{,}44$.\nd) Aucun jeton ne porte Ç : l'événement est impossible, sa probabilité est $0$.\n⛔ Le piège au b) : diviser par $26$, le nombre de lettres de l'alphabet. Les lettres n'ont pas toutes le même nombre de jetons : je divise par le nombre de JETONS.\nRéponse : a) $102$ ; b) $\\dfrac{5}{34}$ et $\\dfrac{1}{51}$ ; c) $\\dfrac{15}{34} \\approx 0{,}44$ ; d) $0$, c'est un événement impossible.",
          micros: ["proba_vocabulaire", "proba_issue", "proba_calculer"],
        },
        {
          titre: "La roue de la kermesse",
          enonce:
            "Pour une kermesse, Lila prépare une roue de $12$ secteurs égaux. Elle colorie en vert les secteurs gagnants.\na) Combien de secteurs verts faut-il pour que la probabilité de gagner soit $\\dfrac{1}{4}$ ? Pour qu'elle soit $\\dfrac{1}{3}$ ?\nb) Elle colorie finalement $4$ secteurs en vert. Quelle est la probabilité de perdre ?\nc) Peut-elle obtenir une probabilité de gagner égale à $\\dfrac{1}{5}$ avec cette roue ? Pourquoi ?\nd) Combien de secteurs faudrait-il au minimum à une roue pour pouvoir obtenir $\\dfrac{1}{4}$, $\\dfrac{1}{3}$ et aussi $\\dfrac{1}{5}$ ?",
          correction:
            "a) Pour $\\dfrac{1}{4}$ : un quart des $12$ secteurs, $12 \\div 4 = 3$ secteurs verts. Pour $\\dfrac{1}{3}$ : $12 \\div 3 = 4$ secteurs verts.\nb) $4$ secteurs gagnants, donc $12 - 4 = 8$ perdants. $P(\\text{perdre}) = \\dfrac{8}{12} = \\dfrac{2}{3}$.\n⭐ Contrôle : $\\dfrac{4}{12} + \\dfrac{8}{12} = 1$.\nc) Non : il faudrait $12 \\div 5 = 2{,}4$ secteurs verts. On ne colorie pas un morceau de secteur : ils doivent rester égaux.\nd) Le nombre de secteurs doit se partager en quarts, en tiers ET en cinquièmes : c'est un multiple de $4$, de $3$ et de $5$. Le plus petit est $60$.\n⛔ Le piège au c) : colorier $2$ secteurs et croire obtenir un cinquième. $\\dfrac{2}{12} = \\dfrac{1}{6}$, ce n'est pas $\\dfrac{1}{5}$.\nRéponse : a) $3$, puis $4$ ; b) $\\dfrac{2}{3}$ ; c) non ; d) $60$ secteurs.",
          schema: roue([{ label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "P", poids: 1, couleur: GRIS }, { label: "P", poids: 1, couleur: GRIS }]),
          micros: ["proba_defi", "proba_calculer", "proba_equiprobabilite"],
        },
        {
          titre: "Les oiseaux bagués",
          enonce:
            "Dans une réserve naturelle, un ornithologue a bagué $40$ oiseaux cette année (relevé imaginé pour l'exercice). Le diagramme donne le nombre d'oiseaux bagués de chaque espèce. Il tire au hasard la fiche d'un oiseau bagué.\na) Quelle est la probabilité que ce soit une mésange ? Écris-la en fraction simplifiée, en décimal, puis en pourcentage.\nb) Quelle est la probabilité que ce soit un hibou ? Que ce ne soit pas une mésange ?\nc) L'an prochain, il bague $10$ mésanges de plus, et aucun autre oiseau. La probabilité de tirer une mésange augmente-t-elle ? Calcule-la.",
          figure: diagramme("barres", [{ label: "mésange", value: 18 }, { label: "merle", value: 12 }, { label: "pic", value: 6 }, { label: "hibou", value: 4 }]),
          correction:
            "a) Les $40$ fiches ont la même chance : $40$ issues. $18$ fiches de mésange : $P = \\dfrac{18}{40} = \\dfrac{9}{20} = 0{,}45$, soit $45$ %.\nb) $P(\\text{hibou}) = \\dfrac{4}{40} = \\dfrac{1}{10} = 0{,}1$.\nPas une mésange : $40 - 18 = 22$ fiches. $P = \\dfrac{22}{40} = \\dfrac{11}{20} = 0{,}55$.\nc) Il y a maintenant $18 + 10 = 28$ mésanges, sur $40 + 10 = 50$ oiseaux. $P = \\dfrac{28}{50} = 0{,}56$, soit $56$ %. Elle augmente : de $45$ % à $56$ %.\n⛔ Le piège au c) : calculer $\\dfrac{28}{40}$ en gardant l'ancien total. Les $10$ nouvelles mésanges font aussi grandir le nombre d'oiseaux.\nRéponse : a) $\\dfrac{9}{20} = 0{,}45$, soit $45$ % ; b) $\\dfrac{1}{10}$ et $\\dfrac{11}{20}$ ; c) oui, elle passe à $0{,}56$.",
          micros: ["proba_calculer", "proba_defi"],
        },
        {
          titre: "Le dé de Tom",
          enonce:
            "Tom fabrique un dé à $6$ faces avec un patron de cube en carton. Il veut que la probabilité d'obtenir $1$ soit $\\dfrac{1}{2}$, celle d'obtenir $2$ soit $\\dfrac{1}{3}$, et celle d'obtenir $3$ soit $\\dfrac{1}{6}$.\na) Combien de faces doivent porter chaque nombre ? Dessine le patron avec ses nombres.\nb) Les faces du dé sont-elles équiprobables ? Et les nombres $1$, $2$ et $3$ ?\nc) Quelle est la probabilité d'obtenir un nombre impair ?\nd) Comment appelle-t-on l'événement « obtenir $4$ » ? Et l'événement « obtenir moins de $4$ » ?",
          correction:
            "a) Les $6$ faces du cube ont la même chance. La moitié des $6$ faces porte le $1$ : $3$ faces. Le tiers des $6$ faces porte le $2$ : $2$ faces. Le sixième des $6$ faces porte le $3$ : $1$ face.\n⭐ Contrôle : $3 + 2 + 1 = 6$ faces.\nb) Les faces, oui : le cube est régulier, chaque face a une chance sur $6$. Les nombres, non : le $1$ est sur trois faces, le $3$ sur une seule.\nc) Impair : $1$ ou $3$, soit $3 + 1 = 4$ faces. $P = \\dfrac{4}{6} = \\dfrac{2}{3}$.\nd) Aucune face ne porte $4$ : « obtenir $4$ » est impossible, sa probabilité est $0$. Toutes les faces portent moins de $4$ : « obtenir moins de $4$ » est certain, sa probabilité est $1$.\n⛔ Le piège au a) : mettre un seul $1$ « puisque c'est un demi ». $\\dfrac{1}{2}$ est la part des faces, pas un nombre de faces.\nRéponse : a) trois faces $1$, deux faces $2$, une face $3$ ; b) les faces oui, les nombres non ; c) $\\dfrac{2}{3}$ ; d) impossible, puis certain.",
          schema: patron(["1", "2", "1", "3", "2", "1"]),
          micros: ["proba_defi", "proba_issue", "proba_vocabulaire", "proba_equiprobabilite"],
        },
      ],
    },
  ],
};
