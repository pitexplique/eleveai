// ─── Fiche d'exercices : les nombres entiers (CM2) — 20 exercices corrigés ─────
//
// 10/11/2026 : feuille INTERACTIVE du lot CM2 (session fiches-cm2), sur la forme
// de `maths-6e-entier-nombre.tsx` (tableau de numération, droite graduée) et
// sur le ton des feuilles CM2 (`maths-cm2-fraction.tsx`) : phrases courtes,
// corrigés à la première personne, un rappel avant chaque niveau.
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (clé `cm2/nombre_entier`) et sur les 11 micros du coach (notionId
// nombre_entier) : lire et écrire, comparer et ranger, décomposer, arrondir,
// multiples, droite graduée, diviseur, tous les diviseurs, diviseurs communs,
// multiples communs, défis.
// ⛔ LIMITES DU CM2 : des entiers jusqu'aux millions, pas de critère de
// divisibilité au-delà de « pair » (multiple de 2).
// ⛔ AUCUNE QUESTION OUVERTE (règle CM1/CM2) : des nombres, des signes < > =,
// oui/non, vrai/faux, et des QCM A/B/C (bonne réponse : C au 7, A et B au 14).
// Les listes de diviseurs et de multiples se tapent séparées par « ; ».
//
// Micro-compétences par exercice :
//   1 entier_lire · 2 entier_lire, entier_decomposer · 3 entier_comparer ·
//   4 entier_decomposer · 5 entier_arrondir · 6 entier_droite ·
//   7 entier_multiple · 8 entier_diviseur · 9 entier_diviseurs_tous ·
//   10 entier_diviseurs_communs · 11 entier_multiples_communs ·
//   12 entier_comparer · 13 entier_arrondir, entier_droite, entier_comparer ·
//   14 entier_lire, entier_decomposer · 15 entier_multiple, entier_diviseur ·
//   16 entier_multiples_communs, entier_multiple, entier_defi ·
//   17 entier_diviseurs_tous, entier_diviseurs_communs, entier_defi ·
//   18 entier_comparer, entier_arrondir, entier_defi ·
//   19 entier_lire, entier_arrondir, entier_multiple, entier_defi ·
//   20 entier_droite, entier_defi. 11/11.
//
// Les pièges nommés : les zéros des rangs vides (1, 4, 19), « chiffre des »
// contre « nombre de » (2), ranger au premier chiffre (3, 12), mettre des
// zéros sans monter (5), le chiffre qui n'est pas JUSTE à droite (13), un trait
// qui vaut 1 (6, 20), multiple et diviseur confondus (7, 8, 15), oublier 1 et le
// nombre lui-même (9), un diviseur d'un seul des deux nombres (10, 17), croire
// que le premier multiple commun est le produit (11), « 080 » lu « huit » (14),
// un indice oublié (16), comparer par la fin (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : sport (1, 5, stade), cuisine (9, pâtissier),
// fleurs (10, fleuriste), transports (11, bus ; 20, chauffeuse routière),
// musique (12, 18, concerts et festivals), vélo (13), ferme (16, maraîchère),
// bâtiment (17, carreleuse), jeux (15, 19). Aucun fait réel : tout est un MODÈLE.
//
// ⭐ LES DESSINS : le tableau de numération (`numeration`), la droite graduée
// (`droite`, nombres écrits par classes) et le sol carrelé (`carrelage`).
// Ceux qui redisent le corrigé sont `ecranSeulement`.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const ROUGE = "#dc2626";

type Point = { value: number; label: string; color?: string };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 47 362 : un entier écrit par classes de trois chiffres (texte NU). */
const ecrit = (v: number) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * LE TABLEAU DE NUMÉRATION : une colonne par rang, groupées par classes
 * (unités, mille, millions), une ligne par nombre, chiffres alignés sur les
 * unités. `surligne` allume une colonne (0 = unités). Sept chiffres au plus.
 */
const numeration = (nombres: string[], opts: { surligne?: number; noms?: string[] } = {}) => {
  const W = 300;
  const larg = Math.max(...nombres.map((n) => n.length));
  const cols = Math.max(1, Math.ceil(larg / 3)) * 3;
  const gauche = opts.noms ? 34 : 6;
  const cw = Math.min(32, (W - gauche - 6) / cols);
  const x0 = gauche + (W - gauche - 6 - cols * cw) / 2;
  const X = (c: number) => x0 + (cols - 1 - c) * cw + cw / 2;
  const [haut, hl] = [48, 26];
  const H = haut + nombres.length * hl + 6;
  const classes = ["unités", "mille", "millions"];
  const lettres = ["u", "d", "c"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {opts.surligne !== undefined ? <rect x={X(opts.surligne) - cw / 2} y={24} width={cw} height={H - 26} fill="#ffedd5" /> : null}
        {Array.from({ length: cols / 3 }, (_, k) => (
          <text key={`cl${k}`} x={X(3 * k + 1)} y={16} textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">
            {classes[k]}
          </text>
        ))}
        {Array.from({ length: cols }, (_, c) => (
          <text key={`l${c}`} x={X(c)} y={40} textAnchor="middle" fontSize="13" fontWeight="700" fill={c === opts.surligne ? ORANGE : "#64748b"}>
            {lettres[c % 3]}
          </text>
        ))}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * cw} y1={i % 3 === 0 ? 4 : 24} x2={x0 + i * cw} y2={H - 2} stroke={i % 3 === 0 ? NOIR : "#cbd5e1"} strokeWidth={i % 3 === 0 ? 1.8 : 1} />
        ))}
        <line x1={x0} y1={24} x2={x0 + cols * cw} y2={24} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={x0} y1={haut - 2} x2={x0 + cols * cw} y2={haut - 2} stroke={NOIR} strokeWidth={1.4} />
        {nombres.map((n, i) => (
          <g key={`n${i}`}>
            {opts.noms ? (
              <text x={x0 - 6} y={haut + i * hl + 18} textAnchor="end" fontSize="14" fontWeight="800" fill={BLEU}>
                {opts.noms[i]}
              </text>
            ) : null}
            {n.split("").map((ch, j) => {
              const c = n.length - 1 - j;
              return (
                <text key={j} x={X(c)} y={haut + i * hl + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={c === opts.surligne ? ORANGE : NOIR}>
                  {ch}
                </text>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Une droite graduée : un trait tous les `pas`, un nombre écrit tous les
 * `nombres`, des points nommés sous la droite (sur une seule rangée : les
 * points doivent être écartés). ⛔ Trois nombres écrits au plus
 * quand ils ont six chiffres.
 */
const droite = (min: number, max: number, pas: number, points: Point[], nombres: number) => {
  const W = 300;
  const marge = 30;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const Y = 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(min + k * pas);
  const ecritIci = (t: number) => Math.abs((t - min) / nombres - Math.round((t - min) / nombres)) < 1e-6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 66`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 14} y1={Y} x2={W - marge + 14} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 6} ${Y - 5} L ${W - marge + 14} ${Y} L ${W - marge + 6} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 7 : 5)} x2={x(t)} y2={Y + (ecritIci(t) ? 7 : 5)} stroke={NOIR} strokeWidth={ecritIci(t) ? 2 : 1.3} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y - 12} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            <text x={Math.min(Math.max(x(p.value), 24), W - 24)} y={Y + 30} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/** Le sol carrelé : `colonnes` × `lignes` carreaux, les cotes en dm. */
const carrelage = (colonnes: number, lignes: number, longueur: string, largeur: string) => {
  const W = 300;
  const c = Math.min(200 / colonnes, 130 / lignes);
  const [x0, y0] = [(W - colonnes * c) / 2 + 14, 12];
  const H = y0 + lignes * c + 30;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Sol carrelé">
        {Array.from({ length: colonnes * lignes }, (_, k) => (
          <rect key={k} x={x0 + (k % colonnes) * c} y={y0 + Math.floor(k / colonnes) * c} width={c} height={c} fill={(k + Math.floor(k / colonnes)) % 2 ? "#dbeafe" : "#bfdbfe"} stroke={BLEU} strokeWidth={1.5} />
        ))}
        <text x={x0 + (colonnes * c) / 2} y={y0 + lignes * c + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
          {longueur}
        </text>
        <text x={x0 - 8} y={y0 + (lignes * c) / 2 + 5} textAnchor="end" fontSize="14" fontWeight="700" fill={NOIR}>
          {largeur}
        </text>
      </svg>
    </div>
  );
};

export const exercicesNombreEntierCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "nombre-entier",
  titre: "Les nombres entiers",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire et écrire les grands nombres. Les comparer, les ranger, les décomposer, les arrondir. Les placer sur une droite graduée. Trouver des multiples et des diviseurs. Un stade, des macarons, des bouquets, des bus, des concerts, des œufs, un carrelage et un camion. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/nombre-entier", titre: "Les nombres entiers" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je sépare d'abord le nombre en classes de trois chiffres.",
      rappel: [
        "Un grand nombre se lit par classes de 3 chiffres, depuis la droite : les unités, les mille, les millions.",
        "Pour comparer : le nombre qui a le plus de chiffres est le plus grand. Sinon, je compare depuis la gauche.",
        "Pour arrondir, je regarde le chiffre JUSTE à droite : de 0 à 4, je descends ; de 5 à 9, je monte.",
        "42 est un multiple de 7, car 7 × 6 = 42. Et 7 est un diviseur de 42.",
      ],
      exercices: [
        {
          enonce:
            "Une journaliste sportive note des nombres en lettres. Écris-les en chiffres.\na) sept mille quatre\nb) quarante mille six cents\nc) neuf cent mille neuf\nd) trois millions deux cent mille cinquante",
          reponses: [
            { question: "a)", attendu: "7004" },
            { question: "b)", attendu: "40600" },
            { question: "c)", attendu: "900009" },
            { question: "d)", attendu: "3200050" },
          ],
          correction:
            "Je range le nombre par classes : les millions, les mille, les unités. Chaque classe a 3 chiffres.\na) « sept mille » : 7 dans la classe des mille. « quatre » : 004 dans la classe des unités. J'écris 7 004.\nb) « quarante mille » : 40. « six cents » : 600. J'écris 40 600.\nc) « neuf cent mille » : 900. « neuf » : 009. J'écris 900 009.\nd) « trois millions » : 3. « deux cent mille » : 200. « cinquante » : 050. J'écris 3 200 050.\n⛔ Le piège : oublier les zéros des rangs vides. « sept mille quatre » ne s'écrit pas 74. La classe des unités a toujours 3 chiffres : 004.\nRéponse : a) 7 004 ; b) 40 600 ; c) 900 009 ; d) 3 200 050.",
          schema: ecranSeulement(numeration(["7004", "40600", "900009", "3200050"], { noms: ["a)", "b)", "c)", "d)"] })),
          micros: ["entier_lire"],
        },
        {
          enonce:
            "Voici le nombre 5 382 046 dans le tableau.\na) Quel est le chiffre des milliers ?\nb) Quel est le chiffre des centaines de mille ?\nc) Quel est le chiffre des dizaines ?\nd) Combien y a-t-il de centaines en tout dans ce nombre ?",
          figure: numeration(["5382046"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "53820" },
          ],
          correction:
            "Je lis le tableau de droite à gauche : unités 6, dizaines 4, centaines 0, milliers 2, dizaines de mille 8, centaines de mille 3, millions 5.\na) Le chiffre des milliers est 2.\nb) Le chiffre des centaines de mille est 3.\nc) Le chiffre des dizaines est 4.\nd) Le NOMBRE de centaines : je garde tout ce qui est à gauche des dizaines. Je cache le 4 et le 6. Il reste 53 820 centaines.\n⛔ Le piège : confondre « chiffre des centaines » et « nombre de centaines ». Le chiffre des centaines est 0, mais il y a 53 820 centaines.\nRéponse : a) 2 ; b) 3 ; c) 4 ; d) 53 820.",
          schema: ecranSeulement(numeration(["5382046"], { surligne: 2 })),
          micros: ["entier_lire", "entier_decomposer"],
        },
        {
          enonce: "Compare avec <, > ou =.\na) 9 999 et 10 001\nb) 72 418 et 72 481\nc) 1 000 000 et 999 999\nd) 60 070 et 60 007",
          reponses: [
            { question: "a)", attendu: "<" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: ">" },
            { question: "d)", attendu: ">" },
          ],
          correction:
            "D'abord, je compte les chiffres. Le nombre qui en a le plus est le plus grand.\na) 9 999 a 4 chiffres, 10 001 en a 5. Donc 9 999 < 10 001.\nb) 5 chiffres chacun. Je compare depuis la gauche : 7 = 7, 2 = 2, 4 = 4. Aux dizaines : 1 < 8. Donc 72 418 < 72 481.\nc) 1 000 000 a 7 chiffres, 999 999 en a 6. Donc 1 000 000 > 999 999.\nd) 5 chiffres chacun. Depuis la gauche : 6 = 6, 0 = 0, 0 = 0. Aux dizaines : 7 > 0. Donc 60 070 > 60 007.\n⛔ Le piège : regarder le premier chiffre. 9 est plus grand que 1, mais 9 999 est plus petit que 10 001.\nRéponse : a) < ; b) < ; c) > ; d) >.",
          micros: ["entier_comparer"],
        },
        {
          enonce:
            "Complète.\na) 8 405 = 8 000 + … + 5\nb) 70 000 + 300 + 9 = …\nc) 5 milliers + 12 centaines + 3 unités = …\nd) 2 millions + 4 dizaines de mille = …",
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "70309" },
            { question: "c)", attendu: "6203" },
            { question: "d)", attendu: "2040000" },
          ],
          correction:
            "Chaque chiffre vaut selon sa place.\na) Dans 8 405, le 4 est au rang des centaines : il vaut 400. Donc 8 405 = 8 000 + 400 + 5.\nb) 70 000 + 300 + 9 : 7 dizaines de mille, 0 millier, 3 centaines, 0 dizaine, 9 unités. J'écris 70 309.\nc) 5 milliers = 5 000. 12 centaines = 1 200. Donc 5 000 + 1 200 + 3 = 6 203.\nd) 2 millions = 2 000 000. 4 dizaines de mille = 40 000. Donc 2 000 000 + 40 000 = 2 040 000.\n⛔ Le piège : oublier les rangs vides. Au b), 7 039 est faux : il manque le 0 des milliers.\nRéponse : a) 400 ; b) 70 309 ; c) 6 203 ; d) 2 040 000.",
          micros: ["entier_decomposer"],
        },
        {
          enonce:
            "Un soir de match, le stade compte 47 362 spectateurs. Arrondis ce nombre :\na) à la dizaine\nb) à la centaine\nc) au millier\nd) à la dizaine de mille",
          reponses: [
            { question: "a)", attendu: "47360" },
            { question: "b)", attendu: "47400" },
            { question: "c)", attendu: "47000" },
            { question: "d)", attendu: "50000" },
          ],
          correction:
            "Pour arrondir, je regarde le chiffre JUSTE à droite du rang demandé.\na) À la dizaine : le chiffre à droite est 2 (unités). 2 est entre 0 et 4 : je descends. 47 360.\nb) À la centaine : le chiffre à droite est 6 (dizaines). 6 est entre 5 et 9 : je monte. 47 400.\nc) Au millier : le chiffre à droite est 3 (centaines). Je descends. 47 000.\nd) À la dizaine de mille : le chiffre à droite est 7 (milliers). Je monte. 50 000.\n⛔ Le piège : mettre des zéros sans monter. Au b), 47 300 est faux : 47 362 est plus près de 47 400.\nRéponse : a) 47 360 ; b) 47 400 ; c) 47 000 ; d) 50 000.",
          micros: ["entier_arrondir"],
        },
        {
          enonce:
            "Regarde la droite graduée.\na) Combien vaut un saut d'un trait au trait suivant ?\nb) Quel nombre est au point A ?\nc) Quel nombre est au point B ?\nd) Quel nombre est au point C ?",
          figure: droite(2000, 3000, 100, [
            { value: 2300, label: "A" },
            { value: 2600, label: "C" },
            { value: 2800, label: "B" },
          ], 1000),
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "2300" },
            { question: "c)", attendu: "2800" },
            { question: "d)", attendu: "2600" },
          ],
          correction:
            "a) De 2 000 à 3 000, il y a 1 000. Je compte 10 sauts. 1 000 ÷ 10 = 100 : un saut vaut 100.\nb) A est à 3 sauts après 2 000 : 2 000 + 300 = 2 300.\nc) B est à 8 sauts après 2 000 : 2 000 + 800 = 2 800.\nd) C est à 6 sauts après 2 000 : 2 000 + 600 = 2 600.\n⛔ Le piège : croire que chaque saut vaut 1. A n'est pas 2 003. Je trouve d'abord ce que vaut un saut.\nRéponse : a) 100 ; b) 2 300 ; c) 2 800 ; d) 2 600.",
          micros: ["entier_droite"],
        },
        {
          enonce:
            "Réponds par oui ou non.\na) 42 est-il un multiple de 7 ?\nb) 35 est-il un multiple de 4 ?\nc) 3 est-il un multiple de 9 ?\nd) Lequel est un multiple de 6 ?\nA) 26   B) 3   C) 54",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "C" },
          ],
          correction:
            "Un multiple de 7 est un nombre de la table de 7.\na) 7 × 6 = 42 : oui, 42 est un multiple de 7.\nb) 4 × 8 = 32 et 4 × 9 = 36. 35 n'est pas dans la table de 4 : non.\nc) La table de 9 commence à 9 : 9, 18, 27… 3 n'y est pas : non. 3 est un DIVISEUR de 9.\nd) 6 × 9 = 54 : C. Pour 26 : 6 × 4 = 24 et 6 × 5 = 30, ce n'est pas un multiple. Pour 3 : c'est un diviseur de 6.\n⛔ Le piège : confondre multiple et diviseur. Un multiple de 9 est plus grand que 9, ou égal.\nRéponse : a) oui ; b) non ; c) non ; d) C (54).",
          micros: ["entier_multiple"],
        },
        {
          enonce:
            "Réponds par oui ou non.\na) 5 est-il un diviseur de 45 ?\nb) 4 est-il un diviseur de 30 ?\nc) 8 est-il un diviseur de 56 ?\nd) 36 est-il un diviseur de 9 ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "5 est un diviseur de 45 si 45 ÷ 5 tombe juste, sans reste.\na) 45 ÷ 5 = 9, car 5 × 9 = 45. Pas de reste : oui.\nb) 4 × 7 = 28 et 4 × 8 = 32. 30 ÷ 4 = 7, il reste 2 : non.\nc) 56 ÷ 8 = 7, car 8 × 7 = 56 : oui.\nd) 36 est plus grand que 9 : il ne peut pas diviser 9. C'est 9 qui divise 36 : 36 ÷ 9 = 4.\n⛔ Le piège : dire « 36 est un diviseur de 9 ». C'est le petit nombre qui divise le grand.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["entier_diviseur"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris mes listes au brouillon, puis je réponds. Je sépare les nombres d'une liste par « ; ».",
      rappel: [
        "Pour trouver tous les diviseurs de 18, je cherche les multiplications qui donnent 18 : 1 × 18, 2 × 9, 3 × 6.",
        "1 et le nombre lui-même sont toujours des diviseurs.",
        "Diviseurs communs : ceux qui sont dans les DEUX listes. Multiples communs : pareil, avec les tables.",
      ],
      exercices: [
        {
          enonce:
            "Un pâtissier range 20 macarons en rangées égales, sans en laisser.\na) Écris tous les diviseurs de 20. Sépare-les par « ; ».\nb) Peut-il faire des rangées de 6 macarons ? (oui ou non)\nc) Combien de diviseurs a le nombre 16 ?",
          reponses: [
            { question: "a)", attendu: "1 ; 2 ; 4 ; 5 ; 10 ; 20" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "Je cherche les multiplications qui donnent 20.\na) 1 × 20 = 20 ; 2 × 10 = 20 ; 4 × 5 = 20. Avec 3 : 3 × 6 = 18 et 3 × 7 = 21, ça ne marche pas. Les diviseurs de 20 : 1 ; 2 ; 4 ; 5 ; 10 ; 20.\nb) 6 n'est pas dans la liste. 20 ÷ 6 = 3, il reste 2 macarons : non.\nc) 1 × 16 ; 2 × 8 ; 4 × 4. Les diviseurs de 16 : 1 ; 2 ; 4 ; 8 ; 16. Le 4 ne compte qu'une fois. Il y en a 5.\n⛔ Le piège : oublier 1 et le nombre lui-même. Une seule rangée de 20 macarons, ça marche aussi !\nRéponse : a) 1 ; 2 ; 4 ; 5 ; 10 ; 20 ; b) non ; c) 5.",
          micros: ["entier_diviseurs_tous"],
        },
        {
          enonce:
            "Une fleuriste a 12 roses et 20 tulipes. Elle veut faire des bouquets tous pareils, sans fleur en trop.\na) Écris les diviseurs communs de 12 et de 20. Sépare-les par « ; ».\nb) Combien de bouquets peut-elle faire, au plus ?\nc) Avec ce nombre de bouquets, combien de roses dans chaque bouquet ?\nd) Et combien de tulipes ?",
          reponses: [
            { question: "a)", attendu: "1 ; 2 ; 4" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "5" },
          ],
          correction:
            "J'écris les deux listes de diviseurs.\nDiviseurs de 12 : 1 ; 2 ; 3 ; 4 ; 6 ; 12.\nDiviseurs de 20 : 1 ; 2 ; 4 ; 5 ; 10 ; 20.\na) Je garde ceux qui sont dans les deux listes : 1 ; 2 ; 4.\nb) Le plus grand diviseur commun est 4 : 4 bouquets au plus.\nc) 12 ÷ 4 = 3 roses par bouquet.\nd) 20 ÷ 4 = 5 tulipes par bouquet.\n⛔ Le piège : choisir 6. 6 divise 12, mais pas 20 : il resterait 2 tulipes.\nRéponse : a) 1 ; 2 ; 4 ; b) 4 bouquets ; c) 3 roses ; d) 5 tulipes.",
          micros: ["entier_diviseurs_communs", "entier_diviseur"],
        },
        {
          enonce:
            "Le bus 1 passe toutes les 4 minutes. Le bus 2 passe toutes les 6 minutes. À 8 h, ils partent ensemble.\na) Écris les multiples communs de 4 et de 6 plus petits que 40. Sépare-les par « ; ».\nb) Au bout de combien de minutes repartent-ils ensemble pour la première fois ?\nc) Repartent-ils ensemble au bout de 30 minutes ? (oui ou non)",
          reponses: [
            { question: "a)", attendu: "12 ; 24 ; 36" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "J'écris les deux tables.\nMultiples de 4 : 4, 8, 12, 16, 20, 24, 28, 32, 36.\nMultiples de 6 : 6, 12, 18, 24, 30, 36.\na) Dans les deux listes : 12 ; 24 ; 36.\nb) Le plus petit multiple commun est 12 : ils repartent ensemble au bout de 12 minutes.\nc) 30 est dans la table de 6. Mais 4 × 7 = 28 et 4 × 8 = 32 : 30 n'est pas dans la table de 4. Non.\n⛔ Le piège : croire que la première fois, c'est 4 × 6 = 24 minutes. 12 vient avant !\nRéponse : a) 12 ; 24 ; 36 ; b) 12 minutes ; c) non.",
          micros: ["entier_multiples_communs", "entier_multiple"],
        },
        {
          enonce:
            "Voici le nombre de spectateurs de cinq concerts :\n108 450 ; 18 045 ; 180 405 ; 108 045 ; 81 450.\nRange-les du plus petit au plus grand. Sépare-les par « < ».",
          reponses: [
            { attendu: ["18045 < 81450 < 108045 < 108450 < 180405", "18045 ; 81450 ; 108045 ; 108450 ; 180405"], ordre: true },
          ],
          correction:
            "Je groupe d'abord les nombres par nombre de chiffres.\n5 chiffres : 18 045 et 81 450. Aux dizaines de mille : 1 < 8. Donc 18 045 < 81 450.\n6 chiffres : 108 450, 180 405 et 108 045. Je compare depuis la gauche.\n108 045 et 108 450 : aux centaines, 0 < 4. Donc 108 045 < 108 450.\n180 405 : aux dizaines de mille, 8 > 0. C'est le plus grand.\n⛔ Le piège : ranger d'après le premier chiffre. 81 450 commence par 8, mais il n'a que 5 chiffres.\nRéponse : 18 045 < 81 450 < 108 045 < 108 450 < 180 405.",
          micros: ["entier_comparer"],
        },
        {
          enonce:
            "Le compteur du vélo de Tom affiche 6 748 km pour l'année.\na) Entre quels milliers se trouve 6 748 ? Écris-les séparés par « ; ».\nb) Arrondis 6 748 au millier.\nc) Arrondis 6 748 à la centaine.",
          figure: droite(6000, 7000, 100, [{ value: 6748, label: "6 748", color: ORANGE }], 1000),
          reponses: [
            { question: "a)", attendu: ["6000 ; 7000", "6000 < 6748 < 7000"], ordre: true },
            { question: "b)", attendu: "7000" },
            { question: "c)", attendu: "6700" },
          ],
          correction:
            "a) 6 748 a 6 milliers. Il est après 6 000 et avant 7 000 : 6 000 < 6 748 < 7 000.\nb) Au millier : le chiffre juste à droite est 7 (centaines). 7 est entre 5 et 9 : je monte. 7 000.\nc) À la centaine : le chiffre juste à droite est 4 (dizaines). 4 est entre 0 et 4 : je descends. 6 700.\nSur la droite, 6 748 est plus près de 6 700 que de 6 800.\n⛔ Le piège du c) : regarder le 8 des unités et monter à 6 800. Je regarde seulement le chiffre JUSTE à droite du rang.\nRéponse : a) 6 000 ; 7 000 ; b) 7 000 ; c) 6 700.",
          micros: ["entier_arrondir", "entier_droite", "entier_comparer"],
        },
        {
          enonce:
            "Choisis la bonne écriture en lettres.\na) 2 080 400 s'écrit :\nA) deux millions quatre-vingt mille quatre cents\nB) deux millions huit mille quatre cents\nC) deux cent huit mille quatre cents\nb) 3 040 017 s'écrit :\nA) trois millions quatre mille dix-sept\nB) trois millions quarante mille dix-sept\nC) trois cent quarante mille dix-sept\nc) Écris en chiffres : 4 dizaines de mille + 7 centaines + 2 unités.",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "40702" },
          ],
          correction:
            "Je coupe le nombre en classes de 3 chiffres, depuis la droite.\na) 2 | 080 | 400 : deux millions, quatre-vingt mille, quatre cents. C'est A.\nb) 3 | 040 | 017 : trois millions, quarante mille, dix-sept. C'est B.\nc) 40 000 + 700 + 2 = 40 702. Le 0 des milliers et le 0 des dizaines restent.\n⛔ Le piège : lire 080 comme « huit ». 080 dans la classe des mille, c'est quatre-vingt mille.\nRéponse : a) A ; b) B ; c) 40 702.",
          schema: ecranSeulement(numeration(["2080400", "3040017"], { noms: ["a)", "b)"] })),
          micros: ["entier_lire", "entier_decomposer"],
        },
        {
          enonce:
            "Lou lit des phrases. Max répond vrai ou faux. Aide-le.\na) 48 est un multiple de 8.\nb) 8 est un multiple de 48.\nc) 7 est un diviseur de 63.\nd) 25 est un diviseur de 5.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "Le multiple est dans la table : c'est le grand nombre. Le diviseur est le petit nombre.\na) 8 × 6 = 48 : 48 est dans la table de 8. Vrai.\nb) 8 est plus petit que 48. C'est un diviseur de 48, pas un multiple. Faux.\nc) 7 × 9 = 63, donc 63 ÷ 7 = 9 sans reste. Vrai.\nd) 25 est plus grand que 5 : il ne divise pas 5. C'est 5 qui divise 25. Faux.\n⛔ Le piège : inverser les deux mots. « 48 est un multiple de 8 » veut dire aussi « 8 est un diviseur de 48 ».\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["entier_multiple", "entier_diviseur"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je lis tous les indices, j'écris mes listes, puis je teste chaque indice.",
      rappel: [
        "Un défi : je liste les nombres possibles, puis je garde ceux qui respectent TOUS les indices.",
        "Ranger sans reste par 6, c'est avoir un multiple de 6.",
        "Partager en parts égales sans reste, c'est chercher un diviseur.",
      ],
      exercices: [
        {
          titre: "Les œufs de la ferme",
          enonce:
            "Une maraîchère a entre 30 et 50 œufs. Elle peut les ranger par boîtes de 6, sans reste. Elle peut aussi les ranger par boîtes de 8, sans reste.\na) Écris les multiples communs de 6 et de 8 plus petits que 50. Sépare-les par « ; ».\nb) Combien a-t-elle d'œufs ?\nc) Combien de boîtes de 6 remplit-elle ?",
          reponses: [
            { question: "a)", attendu: "24 ; 48" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "8" },
          ],
          correction:
            "a) Multiples de 8 : 8, 16, 24, 32, 40, 48.\nLesquels sont dans la table de 6 ? 24 = 6 × 4 et 48 = 6 × 8. Les autres non.\nLes multiples communs : 24 ; 48.\nb) Elle a entre 30 et 50 œufs. 24 est trop petit. Il reste 48 œufs.\nc) 48 ÷ 6 = 8 boîtes.\n⛔ Le piège : oublier un indice. 24 marche avec les boîtes de 6 et de 8, mais 24 n'est pas entre 30 et 50.\nRéponse : a) 24 ; 48 ; b) 48 œufs ; c) 8 boîtes.",
          micros: ["entier_multiples_communs", "entier_multiple", "entier_defi"],
        },
        {
          titre: "Le carrelage",
          enonce:
            "Inès est carreleuse. Le sol d'une salle de bain est un rectangle de 24 dm sur 18 dm. Elle veut le couvrir de carreaux carrés tous pareils, sans couper de carreau. Le côté d'un carreau est un nombre entier de dm.\na) Écris les diviseurs communs de 24 et de 18. Sépare-les par « ; ».\nb) Quel est le plus grand côté possible pour un carreau, en dm ?\nc) Avec ce carreau, combien de carreaux pose-t-elle sur la longueur ?\nd) Combien de carreaux pose-t-elle en tout ?",
          reponses: [
            { question: "a)", attendu: "1 ; 2 ; 3 ; 6" },
            { question: "b)", attendu: "6", unite: "dm" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "12" },
          ],
          correction:
            "Le côté du carreau doit diviser 24 ET 18 : sinon, il faut couper.\nDiviseurs de 24 : 1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24.\nDiviseurs de 18 : 1 ; 2 ; 3 ; 6 ; 9 ; 18.\na) Dans les deux listes : 1 ; 2 ; 3 ; 6.\nb) Le plus grand est 6 : un carreau de 6 dm de côté.\nc) Sur la longueur : 24 ÷ 6 = 4 carreaux.\nd) Sur la largeur : 18 ÷ 6 = 3 carreaux. En tout : 4 × 3 = 12 carreaux.\n⛔ Le piège : choisir 8. 8 divise 24, mais pas 18 : il faudrait couper des carreaux.\nRéponse : a) 1 ; 2 ; 3 ; 6 ; b) 6 dm ; c) 4 carreaux ; d) 12 carreaux.",
          schema: carrelage(4, 3, "24 dm", "18 dm"),
          micros: ["entier_diviseurs_tous", "entier_diviseurs_communs", "entier_defi"],
        },
        {
          titre: "Les festivals de musique",
          enonce:
            "Trois festivals de musique ont compté leurs spectateurs.\nFestival A : 152 380. Festival B : 125 830. Festival C : 152 083.\na) Quel festival a eu le plus de spectateurs ? (A, B ou C)\nb) Range les festivals du plus grand au plus petit. Écris par exemple : B ; A ; C.\nc) Arrondis le nombre du festival B au millier.\nd) Arrondis le nombre du festival C à la dizaine de mille.",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: ["A ; C ; B", "A > C > B", "ACB"], exact: true },
            { question: "c)", attendu: "126000" },
            { question: "d)", attendu: "150000" },
          ],
          correction:
            "Les trois nombres ont 6 chiffres. Je compare depuis la gauche.\na) A et C ont 152 milliers. B n'en a que 125. Entre A et C, aux centaines : 3 > 0. Le plus grand est A.\nb) 152 380 > 152 083 > 125 830. Donc A, puis C, puis B.\nc) 125 830 au millier : le chiffre juste à droite est 8 (centaines). Je monte : 126 000.\nd) 152 083 à la dizaine de mille : le chiffre juste à droite est 2 (milliers). Je descends : 150 000.\n⛔ Le piège : comparer par la fin. 083 et 380 ne disent rien tant que les milliers ne sont pas comparés.\nRéponse : a) A ; b) A ; C ; B ; c) 126 000 ; d) 150 000.",
          micros: ["entier_comparer", "entier_arrondir", "entier_defi"],
        },
        {
          titre: "Le nombre mystère",
          enonce:
            "Je suis un nombre de 5 chiffres.\nMon chiffre des dizaines de mille est 3.\nMon chiffre des milliers est 0.\nMon chiffre des centaines est 3 + 4.\nMon chiffre des dizaines est 2.\nMon chiffre des unités est la moitié de 8.\na) Qui suis-je ?\nb) Arrondis-moi à la centaine.\nc) Suis-je un multiple de 2 ? (oui ou non)",
          reponses: [
            { question: "a)", attendu: "30724" },
            { question: "b)", attendu: "30700" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) Je remplis le tableau rang par rang.\nDizaines de mille : 3. Milliers : 0. Centaines : 3 + 4 = 7. Dizaines : 2. Unités : 8 ÷ 2 = 4.\nLe nombre est 30 724.\nb) À la centaine : le chiffre juste à droite est 2 (dizaines). Je descends : 30 700.\nc) Le chiffre des unités est 4 : le nombre est pair. 30 724 = 2 × 15 362. Oui.\n⛔ Le piège : oublier le 0 des milliers. 3 724 n'a que 4 chiffres.\nRéponse : a) 30 724 ; b) 30 700 ; c) oui.",
          schema: ecranSeulement(numeration(["30724"])),
          micros: ["entier_lire", "entier_arrondir", "entier_multiple", "entier_defi"],
        },
        {
          titre: "Le camion de livraison",
          enonce:
            "Sonia est chauffeuse routière. La droite montre le compteur de son camion. Le point A : le compteur en janvier. Le point B : le compteur en juin.\na) Combien de kilomètres vaut un saut d'un trait au suivant ?\nb) Quel nombre est au point A ?\nc) Quel nombre est au point B ?\nd) Combien de kilomètres a-t-elle roulé de janvier à juin ?",
          figure: droite(0, 50000, 5000, [
            { value: 15000, label: "A" },
            { value: 35000, label: "B", color: ROUGE },
          ], 50000),
          reponses: [
            { question: "a)", attendu: "5000", unite: "km" },
            { question: "b)", attendu: "15000" },
            { question: "c)", attendu: "35000" },
            { question: "d)", attendu: "20000", unite: "km" },
          ],
          correction:
            "a) De 0 à 50 000, je compte 10 sauts. 50 000 ÷ 10 = 5 000 : un saut vaut 5 000 km.\nb) A est à 3 sauts de 0 : 3 × 5 000 = 15 000.\nc) B est à 7 sauts de 0 : 7 × 5 000 = 35 000.\nd) De A à B : 35 000 − 15 000 = 20 000 km. Je vérifie : 4 sauts de 5 000, c'est 20 000.\n⛔ Le piège : compter les traits au lieu des sauts. Le trait du 0 n'est pas un saut.\nRéponse : a) 5 000 km ; b) 15 000 ; c) 35 000 ; d) 20 000 km.",
          micros: ["entier_droite", "entier_defi"],
        },
      ],
    },
  ],
};
