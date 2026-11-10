// ─── Fiche d'exercices : les suites de nombres (CM2) — 20 exercices corrigés ───
//
// 10/11/2026 : feuille INTERACTIVE du lot CM2 (session fiches-cm2), sur le ton
// des feuilles CM2 (`maths-cm2-fraction.tsx`) : phrases courtes, corrigés à la
// première personne, un rappel avant chaque niveau.
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (clé `cm2/suite`) et sur les 4 micros du coach (notionId suite) : continuer
// une suite, trouver sa règle, croissante ou décroissante, défis.
// ⛔ LIMITES DU CM2 : des règles « + », « − », « × », « ÷ 2 », et une règle à
// deux pas alternés ; aucun calcul littéral (pas de « n »).
// ⛔ AUCUNE QUESTION OUVERTE (règle CM1/CM2) : des nombres, vrai/faux, oui/non,
// un jour de la semaine, et des QCM A/B/C (bonnes réponses : B, A, C au 2 ;
// A, B, C, B au 3 ; C au 9 ; B au 12 ; A au 15 ; B au 19).
//
// Micro-compétences par exercice :
//   1 suite_continuer · 2 suite_regle · 3 suite_croissante_decroissante ·
//   4 suite_continuer · 5 suite_regle · 6 suite_continuer ·
//   7 suite_croissante_decroissante · 8 suite_regle, suite_continuer ·
//   9 suite_continuer, suite_regle, suite_croissante_decroissante ·
//   10 suite_regle, suite_continuer · 11 suite_continuer, suite_defi ·
//   12 suite_croissante_decroissante, suite_continuer · 13 suite_regle, suite_continuer ·
//   14 suite_continuer, suite_defi · 15 suite_regle, suite_continuer, suite_defi ·
//   16 suite_defi, suite_continuer · 17 suite_defi, suite_continuer ·
//   18 suite_defi, suite_regle · 19 suite_defi, suite_croissante_decroissante ·
//   20 suite_defi, suite_regle. 4/4.
//
// Les pièges nommés : regarder seulement les deux premiers nombres (1, 2, 13),
// un écart fixe cherché quand c'est « × » (2, 6, 14), « monte puis descend »
// (3, 9), le sens des suites « − » et « ÷ » (7, 12), 4 allumettes par carré (8),
// des écarts qui changent (10), compter les pas (11, 16, 17), le départ oublié
// (15, 18), le dernier jour (19), une seule règle appliquée (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (8, allumettes ; 20, programmeuse de
// jeux vidéo), maison (12, bougie), sciences (14, biologiste), transports (15,
// taxi), nature (16, pépiniériste), sport (17, course), fête (18, traiteur),
// ferme (19, agricultrice). Aucun fait réel : tout est un MODÈLE.
//
// ⭐ LES DESSINS : la frise des nombres et de leurs sauts (`frise`), les carrés
// d'allumettes (`allumettes`) et les tables collées du banquet (`banquet`).

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LA FRISE : les nombres de la suite dans des cases, et le saut écrit au-dessus
 * de chaque flèche (vert quand ça monte, rouge quand ça descend). Un « ? »
 * s'écrit en orange. ⛔ Six cases au plus.
 */
const frise = (termes: (number | string)[], sauts: string[]) => {
  const W = 300;
  const n = termes.length;
  const pas = (W - 8) / n;
  const larg = Math.min(46, pas - 8);
  const cx = (i: number) => 4 + pas * i + pas / 2;
  const [Y, h] = [44, 30];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 80`} className="block h-auto w-full" role="img" aria-label="Frise de la suite">
        {sauts.slice(0, n - 1).map((s, i) => {
          const c = s.startsWith("−") || s.startsWith("÷") ? ROUGE : VERT;
          const [x1, x2] = [cx(i) + 6, cx(i + 1) - 6];
          return (
            <g key={`s${i}`}>
              <path d={`M ${x1} ${Y - 2} Q ${(x1 + x2) / 2} ${Y - 26} ${x2} ${Y - 2}`} fill="none" stroke={c} strokeWidth={2} />
              <path d={`M ${x2 - 6} ${Y - 8} L ${x2} ${Y - 2} L ${x2 - 8} ${Y - 1}`} fill="none" stroke={c} strokeWidth={2} />
              <text x={(x1 + x2) / 2} y={Y - 20} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s}
              </text>
            </g>
          );
        })}
        {termes.map((t, i) => (
          <g key={`t${i}`}>
            <rect x={cx(i) - larg / 2} y={Y} width={larg} height={h} rx={6} fill={t === "?" ? "#ffedd5" : "#eff6ff"} stroke={t === "?" ? ORANGE : BLEU} strokeWidth={1.8} />
            <text x={cx(i)} y={Y + 20} textAnchor="middle" fontSize="14" fontWeight="800" fill={t === "?" ? ORANGE : NOIR}>
              {typeof t === "number" ? String(t).replace(".", ",") : t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/** Les carrés d'allumettes collés en ligne : 1, 2 puis 3 carrés. */
const allumettes = () => {
  const W = 300;
  const c = 30;
  const figures = [1, 2, 3];
  const x0s = [10, 66, 154];
  const Y = 18;
  const allumette = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b45309" strokeWidth={4} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={3.5} fill={ROUGE} />
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 92`} className="block h-auto w-full" role="img" aria-label="Carrés d'allumettes">
        {figures.map((n, f) => {
          const x0 = x0s[f];
          const traits: ReactNode[] = [];
          for (let k = 0; k < n; k++) {
            traits.push(allumette(x0 + k * c + 3, Y, x0 + (k + 1) * c - 3, Y, `h${f}${k}`));
            traits.push(allumette(x0 + k * c + 3, Y + c, x0 + (k + 1) * c - 3, Y + c, `b${f}${k}`));
          }
          for (let k = 0; k <= n; k++) traits.push(allumette(x0 + k * c, Y + c - 3, x0 + k * c, Y + 3, `v${f}${k}`));
          return (
            <g key={f}>
              {traits}
              <text x={x0 + (n * c) / 2} y={Y + c + 30} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                {`${n} carré${n > 1 ? "s" : ""}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Le banquet : `n` tables collées en ligne, 2 chaises en haut et en bas de
 *  chaque table, 1 chaise à chaque bout. */
const banquet = (n: number) => {
  const W = 300;
  const t = Math.min(56, 230 / n);
  const x0 = (W - n * t) / 2;
  const [Y, h] = [26, 34];
  const chaise = (x: number, y: number, k: string) => <circle key={k} cx={x} cy={y} r={7} fill={ORANGE} />;
  const chaises: ReactNode[] = [];
  for (let k = 0; k < n; k++)
    for (const f of [0.28, 0.72]) {
      chaises.push(chaise(x0 + (k + f) * t, Y - 12, `h${k}${f}`));
      chaises.push(chaise(x0 + (k + f) * t, Y + h + 12, `b${k}${f}`));
    }
  chaises.push(chaise(x0 - 13, Y + h / 2, "g"), chaise(x0 + n * t + 13, Y + h / 2, "d"));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 104`} className="block h-auto w-full" role="img" aria-label="Tables collées">
        {Array.from({ length: n }, (_, k) => (
          <rect key={k} x={x0 + k * t} y={Y} width={t} height={h} fill="#dbeafe" stroke={BLEU} strokeWidth={2} />
        ))}
        {chaises}
        <text x={W / 2} y={Y + h + 42} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
          {`${n} tables : ${4 * n + 2} places`}
        </text>
      </svg>
    </div>
  );
};

export const exercicesSuiteCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "suite",
  titre: "Les suites de nombres",
  accroche:
    "Vingt exercices, du geste seul au problème. Continuer une suite. Trouver sa règle. Dire si elle monte ou si elle descend. Puis des défis : des allumettes, une bougie, une plante d'eau, un taxi, un sapin, une coureuse, un banquet, une citerne et un code secret. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/suite", titre: "Les suites de nombres" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde ce qui se passe d'un nombre au suivant, et je vérifie partout.",
      rappel: [
        "Dans une suite, on passe d'un nombre au suivant avec la même règle : + 4, − 10, × 2…",
        "Pour trouver la règle, je compare chaque nombre au suivant. Je vérifie sur TOUS les nombres.",
        "Croissante : les nombres montent toujours. Décroissante : ils descendent toujours.",
      ],
      exercices: [
        {
          enonce:
            "Continue chaque suite.\na) 4 ; 9 ; 14 ; 19 ; … Quel est le nombre suivant ?\nb) Et le nombre d'après ?\nc) 100 ; 92 ; 84 ; … Quel est le nombre suivant ?\nd) Et le nombre d'après ?",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "29" },
            { question: "c)", attendu: "76" },
            { question: "d)", attendu: "68" },
          ],
          correction:
            "Je trouve d'abord le pas, puis je le vérifie partout.\na) 4 + 5 = 9 ; 9 + 5 = 14 ; 14 + 5 = 19. On ajoute 5. Donc 19 + 5 = 24.\nb) 24 + 5 = 29.\nc) 100 − 8 = 92 ; 92 − 8 = 84. On enlève 8. Donc 84 − 8 = 76.\nd) 76 − 8 = 68.\n⛔ Le piège : regarder seulement les deux premiers nombres. Je vérifie le pas entre TOUS les nombres.\nRéponse : a) 24 ; b) 29 ; c) 76 ; d) 68.",
          schema: ecranSeulement(frise([4, 9, 14, 19, "?"], ["+ 5", "+ 5", "+ 5", "+ 5"])),
          micros: ["suite_continuer"],
        },
        {
          enonce:
            "Trouve la règle de chaque suite.\na) 3 ; 6 ; 12 ; 24\nA) + 3   B) × 2   C) + 6\nb) 81 ; 72 ; 63 ; 54\nA) − 9   B) − 8   C) ÷ 9\nc) 7 ; 17 ; 27 ; 37\nA) × 2   B) + 7   C) + 10",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Je teste chaque règle sur TOUS les nombres.\na) + 3 : 3 + 3 = 6, mais 6 + 3 = 9, pas 12. Faux. × 2 : 3 × 2 = 6 ; 6 × 2 = 12 ; 12 × 2 = 24. C'est B.\nb) 81 − 9 = 72 ; 72 − 9 = 63 ; 63 − 9 = 54. C'est A.\nc) 7 + 10 = 17 ; 17 + 10 = 27 ; 27 + 10 = 37. C'est C.\n⛔ Le piège du a) : choisir + 3 en regardant seulement 3 et 6. Ici, l'écart change : 3, puis 6, puis 12. C'est × 2.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["suite_regle"],
        },
        {
          enonce:
            "Pour chaque suite, choisis :\nA) croissante   B) décroissante   C) ni l'une ni l'autre\na) 5 ; 12 ; 19 ; 26\nb) 90 ; 75 ; 60 ; 45\nc) 2 ; 8 ; 4 ; 10\nd) 1 000 ; 100 ; 10 ; 1",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "C" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "Je regarde si chaque nombre est plus grand ou plus petit que le précédent.\na) 5 < 12 < 19 < 26 : ça monte toujours. Croissante : A.\nb) 90 > 75 > 60 > 45 : ça descend toujours. Décroissante : B.\nc) 2 < 8, puis 8 > 4, puis 4 < 10 : ça monte, puis ça descend. Ni l'une ni l'autre : C.\nd) 1 000 > 100 > 10 > 1 : ça descend toujours. Décroissante : B.\n⛔ Le piège du c) : dire « croissante » parce que 10 est plus grand que 2. Il faut que ça monte à CHAQUE pas.\nRéponse : a) A ; b) B ; c) C ; d) B.",
          micros: ["suite_croissante_decroissante"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 15 ; 30 ; … ; 60 ; 75\nb) 250 ; 225 ; … ; 175\nc) 2 ; 4 ; 8 ; … ; 32",
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "200" },
            { question: "c)", attendu: "16" },
          ],
          correction:
            "Je trouve la règle avec les nombres connus, puis je remplis le trou.\na) 15 + 15 = 30. On ajoute 15. 30 + 15 = 45. Je vérifie : 45 + 15 = 60.\nb) 250 − 25 = 225. On enlève 25. 225 − 25 = 200. Je vérifie : 200 − 25 = 175.\nc) 2 × 2 = 4 ; 4 × 2 = 8. On multiplie par 2. 8 × 2 = 16. Je vérifie : 16 × 2 = 32.\n⛔ Le piège du c) : chercher un écart fixe. 2, 4, 8 : l'écart change (2, puis 4). Ici, on double.\nRéponse : a) 45 ; b) 200 ; c) 16.",
          micros: ["suite_continuer"],
        },
        {
          enonce:
            "Chaque suite avance toujours du même pas. Quel est ce pas ?\na) 18 ; 25 ; 32 ; 39 : on ajoute …\nb) 140 ; 125 ; 110 ; 95 : on enlève …\nc) 0,5 ; 1 ; 1,5 ; 2 : on ajoute …",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "0,5" },
          ],
          correction:
            "Je calcule l'écart entre deux nombres qui se suivent, puis je vérifie.\na) 25 − 18 = 7 ; 32 − 25 = 7 ; 39 − 32 = 7. On ajoute 7.\nb) 140 − 125 = 15 ; 125 − 110 = 15 ; 110 − 95 = 15. On enlève 15.\nc) 1 − 0,5 = 0,5 ; 1,5 − 1 = 0,5 ; 2 − 1,5 = 0,5. On ajoute 0,5, une demie.\n⛔ Le piège du c) : croire qu'on ajoute 1. De 0,5 à 1, il n'y a qu'une demie.\nRéponse : a) 7 ; b) 15 ; c) 0,5.",
          micros: ["suite_regle"],
        },
        {
          enonce:
            "a) 1 ; 3 ; 9 ; 27 ; … On multiplie par 3. Quel est le nombre suivant ?\nb) Et le nombre d'après ?\nc) 640 ; 320 ; 160 ; … On divise par 2. Quel est le nombre suivant ?",
          reponses: [
            { question: "a)", attendu: "81" },
            { question: "b)", attendu: "243" },
            { question: "c)", attendu: "80" },
          ],
          correction:
            "J'applique la règle au dernier nombre écrit.\na) 27 × 3 = 81.\nb) 81 × 3 = 243. Je calcule : 80 × 3 = 240, et 1 × 3 = 3. 240 + 3 = 243.\nc) 160 ÷ 2 = 80. La moitié de 160, c'est 80.\n⛔ Le piège : ajouter 3 au lieu de multiplier. 27 + 3 = 30 est faux : la règle est × 3.\nRéponse : a) 81 ; b) 243 ; c) 80.",
          schema: ecranSeulement(frise([1, 3, 9, 27, 81, 243], ["× 3", "× 3", "× 3", "× 3", "× 3"])),
          micros: ["suite_continuer"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Je pars de 10 et j'ajoute toujours 6. La suite est croissante.\nb) Je pars de 50 et j'enlève toujours 4. La suite est croissante.\nc) Je pars de 5 et je multiplie toujours par 2. La suite est croissante.\nd) Je pars de 64 et je divise toujours par 2. La suite est croissante.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "J'écris les premiers nombres de chaque suite.\na) 10 ; 16 ; 22 ; 28 : ça monte. Vrai.\nb) 50 ; 46 ; 42 ; 38 : ça descend. Elle est décroissante. Faux.\nc) 5 ; 10 ; 20 ; 40 : ça monte. Vrai.\nd) 64 ; 32 ; 16 ; 8 : ça descend. Elle est décroissante. Faux.\n⛔ Le piège : croire qu'une suite avec une règle est toujours croissante. Avec « − » ou « ÷ 2 », les nombres descendent.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["suite_croissante_decroissante"],
        },
        {
          enonce:
            "Léa fait des carrés avec des allumettes, collés en ligne.\n1 carré : 4 allumettes. 2 carrés : 7 allumettes. 3 carrés : 10 allumettes.\na) Combien d'allumettes ajoute-t-on pour chaque nouveau carré ?\nb) Combien d'allumettes faut-il pour 4 carrés ?\nc) Et pour 5 carrés ?",
          figure: allumettes(),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: "16" },
          ],
          correction:
            "a) 4 ; 7 ; 10 : 7 − 4 = 3 et 10 − 7 = 3. On ajoute 3 allumettes. Le nouveau carré réutilise le côté de son voisin.\nb) 10 + 3 = 13 allumettes pour 4 carrés.\nc) 13 + 3 = 16 allumettes pour 5 carrés.\n⛔ Le piège : compter 4 allumettes par carré. 5 × 4 = 20 est faux : deux carrés voisins partagent une allumette.\nRéponse : a) 3 ; b) 13 ; c) 16.",
          schema: ecranSeulement(frise([4, 7, 10, 13, 16], ["+ 3", "+ 3", "+ 3", "+ 3"])),
          micros: ["suite_regle", "suite_continuer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris la suite au brouillon, un nombre après l'autre.",
      rappel: [
        "Une règle peut avoir deux pas qui alternent : + 3, puis − 1, puis + 3…",
        "Pour aller loin dans une suite « + 5 », je compte les pas : du 1er au 10e nombre, il y a 9 pas.",
        "Les écarts peuvent aussi changer : 3, puis 5, puis 7… J'écris les écarts.",
      ],
      exercices: [
        {
          enonce:
            "Voici une suite : 2 ; 5 ; 4 ; 7 ; 6 ; 9 ; …\nSa règle : + 3, puis − 1, puis + 3, puis − 1…\na) Quel est le nombre suivant ?\nb) Et le nombre d'après ?\nc) Cette suite est :\nA) croissante   B) décroissante   C) ni l'une ni l'autre",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Je vérifie la règle : 2 + 3 = 5 ; 5 − 1 = 4 ; 4 + 3 = 7 ; 7 − 1 = 6 ; 6 + 3 = 9.\na) Après « + 3 » vient « − 1 » : 9 − 1 = 8.\nb) Puis « + 3 » : 8 + 3 = 11.\nc) 2 < 5, puis 5 > 4 : ça monte, puis ça descend. Ni l'une ni l'autre : C.\n⛔ Le piège : faire deux fois la même opération. Les deux pas ALTERNENT.\nRéponse : a) 8 ; b) 11 ; c) C.",
          schema: ecranSeulement(frise([4, 7, 6, 9, 8, 11], ["+ 3", "− 1", "+ 3", "− 1", "+ 3"])),
          micros: ["suite_continuer", "suite_regle", "suite_croissante_decroissante"],
        },
        {
          enonce:
            "Voici une suite : 1 ; 4 ; 9 ; 16 ; …\na) Les écarts sont 3, puis 5, puis 7. Quel sera l'écart suivant ?\nb) Quel est le nombre suivant de la suite ?\nc) Et le nombre d'après ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "25" },
            { question: "c)", attendu: "36" },
          ],
          correction:
            "a) Les écarts : 4 − 1 = 3 ; 9 − 4 = 5 ; 16 − 9 = 7. Ils augmentent de 2 à chaque fois. L'écart suivant est 7 + 2 = 9.\nb) 16 + 9 = 25.\nc) L'écart d'après est 9 + 2 = 11. Donc 25 + 11 = 36.\n⭐ Ces nombres sont 1 × 1, 2 × 2, 3 × 3, 4 × 4, 5 × 5 = 25 et 6 × 6 = 36.\n⛔ Le piège : chercher un écart fixe. Ici, l'écart change à chaque pas : j'écris les écarts.\nRéponse : a) 9 ; b) 25 ; c) 36.",
          schema: ecranSeulement(frise([1, 4, 9, 16, 25, 36], ["+ 3", "+ 5", "+ 7", "+ 9", "+ 11"])),
          micros: ["suite_regle", "suite_continuer"],
        },
        {
          enonce:
            "Une suite commence à 6. On ajoute 5 à chaque fois : 6 ; 11 ; 16 ; 21 ; …\na) Quel est le 6e nombre ?\nb) Quel est le 10e nombre ?\nc) Le nombre 101 est-il dans la suite ? (oui ou non)\nd) Le nombre 70 est-il dans la suite ? (oui ou non)",
          reponses: [
            { question: "a)", attendu: "31" },
            { question: "b)", attendu: "51" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) 21 est le 4e nombre. 21 + 5 = 26 (5e), puis 26 + 5 = 31 (6e).\nb) Du 1er au 10e nombre, j'avance de 9 pas. 9 × 5 = 45. Et 6 + 45 = 51.\nc) Les nombres de la suite finissent tous par 1 ou par 6. 101 finit par 1. Je vérifie : 101 − 6 = 95, et 95 = 19 × 5. Oui, c'est le 20e nombre.\nd) 70 finit par 0 : il n'est pas dans la suite. 66 et 71 y sont, pas 70. Non.\n⛔ Le piège du b) : faire 10 pas. Le 1er nombre est déjà écrit : il reste 9 pas jusqu'au 10e.\nRéponse : a) 31 ; b) 51 ; c) oui ; d) non.",
          micros: ["suite_continuer", "suite_defi"],
        },
        {
          enonce:
            "Une bougie mesure 24 cm. Allumée, elle perd 2 cm par heure.\na) Combien mesure-t-elle après 3 heures ?\nb) Au bout de combien d'heures a-t-elle fondu entièrement ?\nc) La suite des hauteurs est :\nA) croissante   B) décroissante   C) ni l'une ni l'autre",
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "La règle : − 2 cm par heure. 24 ; 22 ; 20 ; 18 ; …\na) 3 heures : j'enlève 3 fois 2 cm. 3 × 2 = 6 et 24 − 6 = 18 cm.\nb) Il faut enlever les 24 cm. 24 ÷ 2 = 12. Elle a fondu au bout de 12 heures.\nc) La bougie raccourcit à chaque heure : la suite descend. Décroissante : B.\n⛔ Le piège du a) : compter 4 nombres (24, 22, 20, 18) et répondre 4 heures. 3 heures, ce sont 3 pas.\nRéponse : a) 18 cm ; b) 12 heures ; c) B.",
          micros: ["suite_croissante_decroissante", "suite_continuer"],
        },
        {
          enonce:
            "Léo écrit une suite. On ajoute 7 à chaque fois :\n7 ; 14 ; 21 ; 27 ; 35 ; 42\na) Quel nombre est faux ?\nb) Par quel nombre faut-il le remplacer ?\nc) Quel est le nombre après 42 ?",
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "28" },
            { question: "c)", attendu: "49" },
          ],
          correction:
            "Je vérifie chaque pas : c'est la table de 7.\n7 + 7 = 14 ; 14 + 7 = 21 ; 21 + 7 = 28, pas 27.\na) Le nombre faux est 27.\nb) Je le remplace par 28. Je vérifie la suite : 28 + 7 = 35. Ça marche.\nc) 42 + 7 = 49.\n⛔ Le piège : vérifier seulement le début. L'erreur se cache au milieu : je contrôle TOUS les pas.\nRéponse : a) 27 ; b) 28 ; c) 49.",
          micros: ["suite_regle", "suite_continuer"],
        },
        {
          enonce:
            "Une biologiste observe une plante d'eau. Sa surface double chaque jour.\nJour 1 : 1 m². Jour 2 : 2 m². Jour 3 : 4 m².\na) Quelle est sa surface au jour 4 ?\nb) Et au jour 6 ?\nc) Quel jour dépasse-t-elle 100 m² pour la première fois ? Écris le numéro du jour.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "32" },
            { question: "c)", attendu: "8" },
          ],
          correction:
            "La règle : × 2 chaque jour.\na) Jour 4 : 4 × 2 = 8 m².\nb) Jour 5 : 8 × 2 = 16 m². Jour 6 : 16 × 2 = 32 m².\nc) Jour 7 : 32 × 2 = 64 m². 64 est plus petit que 100. Jour 8 : 64 × 2 = 128 m². 128 dépasse 100 : c'est le jour 8.\n⛔ Le piège : ajouter 2 m² chaque jour. La surface DOUBLE : 1, 2, 4, 8… et pas 1, 3, 5, 7.\nRéponse : a) 8 m² ; b) 32 m² ; c) le jour 8.",
          micros: ["suite_continuer", "suite_defi"],
        },
        {
          enonce:
            "Un taxi coûte 3,50 € au départ, puis 1,20 € par kilomètre.\nLes prix : 3,50 € ; 4,70 € ; 5,90 € ; …\na) La règle est :\nA) + 1,20 €   B) × 2   C) + 3,50 €\nb) Combien coûte un trajet de 5 km ?\nc) Avec 15,50 €, combien de kilomètres peut-on faire, au plus ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "9,5" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "a) 3,50 + 1,20 = 4,70 et 4,70 + 1,20 = 5,90. La règle est + 1,20 € : A.\nb) 5 km : 5 × 1,20 = 6 €. J'ajoute le départ : 3,50 + 6 = 9,50 €.\nc) J'enlève le départ : 15,50 − 3,50 = 12 €. Combien de fois 1,20 € dans 12 € ? 10 × 1,20 = 12. Donc 10 km.\n⛔ Le piège : oublier les 3,50 € du départ. 5 × 1,20 = 6 € n'est pas le prix du trajet.\nRéponse : a) A ; b) 9,50 € ; c) 10 km.",
          micros: ["suite_regle", "suite_continuer", "suite_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je trouve la règle, puis j'avance pas à pas.",
      rappel: [
        "Je trouve la règle de l'histoire : ce qu'on ajoute, enlève ou multiplie à chaque étape.",
        "Je compte bien les étapes : après 4 ans, j'ai ajouté 4 fois, pas 5.",
        "Je peux écrire la suite dans un tableau au brouillon, une case par étape.",
      ],
      exercices: [
        {
          titre: "Le sapin de la pépinière",
          enonce:
            "Un pépiniériste plante un petit sapin de 35 cm. Le sapin grandit de 15 cm chaque année.\na) Combien mesure-t-il après 4 ans ?\nb) Après combien d'années mesure-t-il 200 cm ?\nc) Après 10 ans, mesure-t-il plus de 180 cm ? (oui ou non)",
          reponses: [
            { question: "a)", attendu: "95" },
            { question: "b)", attendu: "11" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "La règle : + 15 cm par an, en partant de 35 cm.\na) Après 4 ans : 4 × 15 = 60 cm de plus. 35 + 60 = 95 cm.\nb) Il doit gagner 200 − 35 = 165 cm. Combien de fois 15 dans 165 ? 11 × 15 = 165. Donc 11 ans.\nc) Après 10 ans : 10 × 15 = 150 cm de plus. 35 + 150 = 185 cm. 185 est plus grand que 180 : oui.\n⛔ Le piège : ajouter 15 cinq fois pour 4 ans. Le jour de la plantation, le sapin n'a pas encore grandi.\nRéponse : a) 95 cm ; b) 11 ans ; c) oui.",
          micros: ["suite_defi", "suite_continuer"],
        },
        {
          titre: "L'entraînement de course",
          enonce:
            "Lina court 800 m le lundi. Chaque jour, elle court 200 m de plus que la veille.\na) Combien de mètres court-elle le vendredi ?\nb) Combien de mètres court-elle en tout, du lundi au vendredi ?\nc) Quel jour court-elle 2 000 m pour la première fois ?",
          reponses: [
            { question: "a)", attendu: "1600" },
            { question: "b)", attendu: "6000" },
            { question: "c)", attendu: "dimanche" },
          ],
          correction:
            "J'écris un jour après l'autre, en ajoutant 200 m.\nLundi 800 ; mardi 1 000 ; mercredi 1 200 ; jeudi 1 400 ; vendredi 1 600.\na) Le vendredi, elle court 1 600 m.\nb) 800 + 1 000 + 1 200 + 1 400 + 1 600 = 6 000 m. Je vérifie : 800 + 1 600 = 2 400 et 1 000 + 1 400 = 2 400. 2 400 + 2 400 + 1 200 = 6 000.\nc) Samedi : 1 600 + 200 = 1 800. Dimanche : 1 800 + 200 = 2 000. C'est le dimanche.\n⛔ Le piège : ajouter 200 m dès le lundi. Le lundi, elle court 800 m, c'est le départ.\nRéponse : a) 1 600 m ; b) 6 000 m ; c) dimanche.",
          micros: ["suite_defi", "suite_continuer"],
        },
        {
          titre: "Le banquet",
          enonce:
            "Un traiteur colle des tables en ligne pour une fête.\n1 table : 6 places. 2 tables : 10 places. 3 tables : 14 places.\na) Combien de places ajoute chaque nouvelle table ?\nb) Combien de places avec 5 tables ?\nc) Combien de places avec 10 tables ?\nd) Il y a 50 invités. Combien de tables faut-il, au moins ?",
          figure: banquet(3),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "22" },
            { question: "c)", attendu: "42" },
            { question: "d)", attendu: "12" },
          ],
          correction:
            "a) 10 − 6 = 4 et 14 − 10 = 4. Chaque table ajoute 4 places : 2 en haut, 2 en bas. Les chaises des bouts restent.\nb) 4 tables : 14 + 4 = 18. 5 tables : 18 + 4 = 22 places.\nc) De 1 à 10 tables, j'ajoute 9 tables. 9 × 4 = 36. Et 6 + 36 = 42 places.\nd) Il manque 50 − 6 = 44 places après la 1re table. 44 ÷ 4 = 11 tables de plus. 1 + 11 = 12 tables. Je vérifie : 6 + 11 × 4 = 50.\n⛔ Le piège : compter 6 places par table. 10 × 6 = 60 est faux : en collant les tables, on perd des chaises aux bouts.\nRéponse : a) 4 ; b) 22 ; c) 42 ; d) 12 tables.",
          micros: ["suite_defi", "suite_regle"],
        },
        {
          titre: "La citerne d'eau",
          enonce:
            "Une agricultrice a une citerne de 1 200 litres. Chaque jour, elle prend 75 litres pour arroser.\na) Combien de litres reste-t-il après 4 jours ?\nb) Au bout de combien de jours la citerne est-elle vide ?\nc) Quel jour reste-t-il moins de 500 litres pour la première fois ? Écris le numéro du jour.\nd) La suite des litres est :\nA) croissante   B) décroissante   C) ni l'une ni l'autre",
          reponses: [
            { question: "a)", attendu: "900" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "La règle : − 75 litres par jour, en partant de 1 200.\na) 4 jours : 4 × 75 = 300 litres. 1 200 − 300 = 900 litres.\nb) En 4 jours, elle prend 300 litres. 300 × 4 = 1 200 : il faut 4 × 4 = 16 jours.\nc) Jour 9 : 9 × 75 = 675, et 1 200 − 675 = 525 litres. C'est encore plus que 500. Jour 10 : 525 − 75 = 450 litres. C'est le jour 10.\nd) L'eau baisse chaque jour : décroissante, B.\n⛔ Le piège du c) : s'arrêter au jour 9. 525 litres, ce n'est pas encore moins de 500.\nRéponse : a) 900 litres ; b) 16 jours ; c) le jour 10 ; d) B.",
          micros: ["suite_defi", "suite_croissante_decroissante"],
        },
        {
          titre: "Le code du jeu vidéo",
          enonce:
            "Maya est programmeuse de jeux vidéo. Pour un code secret, elle part de 3. Elle fait + 4, puis × 2, puis + 4, puis × 2…\n3 ; 7 ; 14 ; 18 ; …\na) Quel est le 5e nombre ?\nb) Quel est le 7e nombre ?\nc) Quel est le premier nombre plus grand que 100 ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "80" },
            { question: "c)", attendu: "168" },
          ],
          correction:
            "Je vérifie : 3 + 4 = 7 ; 7 × 2 = 14 ; 14 + 4 = 18.\na) Après « + 4 » vient « × 2 » : 18 × 2 = 36. C'est le 5e nombre.\nb) 6e : 36 + 4 = 40. 7e : 40 × 2 = 80.\nc) 8e : 80 + 4 = 84. C'est moins que 100. 9e : 84 × 2 = 168. C'est le premier nombre plus grand que 100.\n⛔ Le piège : appliquer une seule règle, toujours « + 4 » ou toujours « × 2 ». Les deux règles alternent.\nRéponse : a) 36 ; b) 80 ; c) 168.",
          schema: ecranSeulement(frise([14, 18, 36, 40, 80, 84], ["+ 4", "× 2", "+ 4", "× 2", "+ 4"])),
          micros: ["suite_defi", "suite_regle"],
        },
      ],
    },
  ],
};
