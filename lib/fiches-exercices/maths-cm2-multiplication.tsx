// ─── Fiche d'exercices : la multiplication (CM2) — 20 exercices corrigés ───────
//
// 10/11/2026 : feuille INTERACTIVE du lot CM2 (session fiches-cm2), sur le ton
// des feuilles CM2 (`maths-cm2-fraction.tsx`) : phrases courtes, corrigés à la
// première personne, un rappel avant chaque niveau.
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (clé `cm2/multiplication`) et sur les 7 micros du coach (notionId
// multiplication) : tables, calcul mental, multiplication posée, × 10, 100,
// 1 000, décimal × entier posé, problèmes, défis.
// ⛔ LIMITES DU CM2 : un décimal × un ENTIER seulement (pas de décimal ×
// décimal) ; posées à deux chiffres en bas au plus.
// ⭐ × 10, × 100, × 1 000 PAR LA VALEUR DES CHIFFRES (Frédéric, 05/10) : « le
// chiffre des unités devient le chiffre des dizaines » d'abord, le décalage
// de la virgule en raccourci après (3, 4, 12), avec le tableau qui glisse.
// ⛔ AUCUNE QUESTION OUVERTE (règle CM1/CM2) : des nombres, vrai/faux, oui/non,
// et des QCM A/B/C (bonnes réponses : C au 2 ; B au 4 ; B, A, C au 11 ; A au
// 15 ; B au 20).
//
// Micro-compétences par exercice :
//   1 multiplication_table · 2 multiplication_table · 3 multiplication_puissance_dix ·
//   4 multiplication_puissance_dix · 5 multiplication_mental · 6 multiplication_mental ·
//   7 multiplication_posee · 8 multiplication_decimale_posee ·
//   9 multiplication_posee · 10 multiplication_decimale_posee ·
//   11 multiplication_mental · 12 multiplication_puissance_dix ·
//   13 multiplication_probleme, multiplication_decimale_posee ·
//   14 multiplication_table, multiplication_mental · 15 multiplication_probleme ·
//   16 multiplication_probleme, multiplication_posee, multiplication_decimale_posee, multiplication_defi ·
//   17 multiplication_probleme, multiplication_decimale_posee, multiplication_table ·
//   18 multiplication_probleme, multiplication_decimale_posee, multiplication_defi ·
//   19 multiplication_probleme, multiplication_decimale_posee, multiplication_defi ·
//   20 multiplication_defi, multiplication_puissance_dix, multiplication_mental. 7/7.
//
// Les pièges nommés : 6 × 7 pris pour 6 × 8 (1, 2), « ajouter un 0 » à un
// décimal (3, 4, 12), un morceau oublié (5), un zéro oublié (6, 11), la
// retenue oubliée (7), la virgule oubliée (8, 10, 19), le 0 du décalage (9),
// additionner au lieu de multiplier (13, 15), 7 × 0 = 7 (14), s'arrêter trop
// tôt (16), ajouter au lieu de multiplier une recette (17), oublier qu'on paie
// avec un billet (18), × 10 et ÷ 10 confondus (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : usine (3, fabricant de crayons), école (8,
// 15), commerce (13, boulangère), cinéma (16, gérant), cuisine (17, cuisinier),
// voyage (18, train), énergie (19, technicienne des panneaux solaires).
// Aucun fait réel : tout est un MODÈLE.
//
// ⭐ LES DESSINS : la multiplication posée (`posee`, chiffres alignés en
// colonnes, la virgule entre deux colonnes) et le tableau qui GLISSE pour
// × 10, × 100 (`glisse`).

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const VERT = "#16a34a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * UNE MULTIPLICATION POSÉE : une ligne par chaîne, chiffres alignés à droite
 * en colonnes ; la virgule se pose ENTRE deux colonnes ; « × » en tête de
 * ligne se met à gauche de tout. `traits` : les lignes sous lesquelles on tire
 * un trait. La dernière ligne (le résultat) est en bleu.
 */
const posee = (lignes: string[], traits: number[]) => {
  const W = 300;
  const cw = 20;
  const xR = 190;
  const chiffres = (s: string) => s.replace(/[^0-9]/g, "").length;
  const larg = Math.max(...lignes.map(chiffres)) + 1;
  const hl = 28;
  const H = lignes.length * hl + 14;
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Multiplication posée">
        {lignes.map((l, i) => {
          const y = 22 + i * hl;
          const couleur = i === lignes.length - 1 ? BLEU : NOIR;
          const morceaux: ReactNode[] = [];
          let k = 0;
          const corps = l.replace(/^[×+]\s*/, "");
          for (let j = corps.length - 1; j >= 0; j--) {
            const ch = corps[j];
            if (/[0-9]/.test(ch)) {
              morceaux.push(
                <text key={j} x={xR - k * cw - cw / 2} y={y} textAnchor="middle" fontSize="18" fontWeight="800" fill={couleur}>
                  {ch}
                </text>,
              );
              k++;
            } else if (ch === ",") {
              morceaux.push(
                <text key={j} x={xR - k * cw} y={y + 3} textAnchor="middle" fontSize="18" fontWeight="900" fill={ORANGE}>
                  ,
                </text>,
              );
            }
          }
          const op = /^[×+]/.exec(l)?.[0];
          return (
            <g key={i}>
              {op ? (
                <text x={xR - larg * cw - cw / 2} y={y} textAnchor="middle" fontSize="18" fontWeight="800" fill={NOIR}>
                  {op}
                </text>
              ) : null}
              {morceaux}
              {traits.includes(i) ? <line x1={xR - (larg + 1) * cw} y1={y + 8} x2={xR + 6} y2={y + 8} stroke={NOIR} strokeWidth={2} /> : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * LE TABLEAU QUI GLISSE : le nombre avant et après × 10, × 100 ou × 1 000,
 * rangé dans les colonnes milliers… centièmes. Chaque chiffre monte de rang.
 */
const glisse = (avant: string, apres: string, operation: string) => {
  const W = 300;
  const entetes = ["m", "c", "d", "u", "1/10", "1/100"];
  const cw = 38;
  const x0 = 8;
  const X = (c: number) => x0 + c * cw + cw / 2;
  const placer = (s: string, y: number, couleur: string, cle: string) => {
    const [e, d = ""] = s.split(",");
    const items: ReactNode[] = [];
    e.split("").forEach((ch, j) => {
      const col = 3 - (e.length - 1 - j);
      items.push(
        <text key={`${cle}e${j}`} x={X(col)} y={y} textAnchor="middle" fontSize="18" fontWeight="800" fill={couleur}>
          {ch}
        </text>,
      );
    });
    d.split("").forEach((ch, j) => {
      items.push(
        <text key={`${cle}d${j}`} x={X(4 + j)} y={y} textAnchor="middle" fontSize="18" fontWeight="800" fill={couleur}>
          {ch}
        </text>,
      );
    });
    if (d)
      items.push(
        <text key={`${cle}v`} x={x0 + 4 * cw} y={y + 4} textAnchor="middle" fontSize="20" fontWeight="900" fill={ORANGE}>
          ,
        </text>,
      );
    return items;
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 104`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {entetes.map((t, c) => (
          <text key={t} x={X(c)} y={16} textAnchor="middle" fontSize="13" fontWeight="700" fill="#64748b">
            {t}
          </text>
        ))}
        {Array.from({ length: entetes.length + 1 }, (_, i) => (
          <line key={i} x1={x0 + i * cw} y1={4} x2={x0 + i * cw} y2={98} stroke={i === 4 ? ORANGE : "#cbd5e1"} strokeWidth={i === 4 ? 2 : 1} />
        ))}
        <line x1={x0} y1={24} x2={x0 + 6 * cw} y2={24} stroke={NOIR} strokeWidth={1.4} />
        {placer(avant, 50, NOIR, "a")}
        {placer(apres, 88, BLEU, "p")}
        <text x={x0 + 6 * cw + 20} y={74} fontSize="14" fontWeight="900" fill={VERT}>
          {operation}
        </text>
        <path d={`M ${x0 + 6 * cw + 10} 56 L ${x0 + 6 * cw + 10} 82`} stroke={VERT} strokeWidth={2} />
        <path d={`M ${x0 + 6 * cw + 5} 77 L ${x0 + 6 * cw + 10} 83 L ${x0 + 6 * cw + 15} 77`} fill="none" stroke={VERT} strokeWidth={2} />
      </svg>
    </div>
  );
};

export const exercicesMultiplicationCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "multiplication",
  titre: "La multiplication",
  accroche:
    "Vingt exercices, du geste seul au problème. Les tables. Le calcul de tête. Multiplier par 10, 100 ou 1 000 avec la valeur des chiffres. Poser une multiplication, avec ou sans virgule. Puis des problèmes : une boulangerie, un cinéma, des crêpes, un voyage en train et des panneaux solaires. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/multiplication", titre: "La multiplication" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche d'abord un ordre de grandeur, puis je calcule.",
      rappel: [
        "Les tables se savent par cœur. On peut retourner : 7 × 8 = 8 × 7.",
        "× 10 : chaque chiffre prend une valeur 10 fois plus grande. Le chiffre des unités devient le chiffre des dizaines.",
        "Pour poser, je commence par les unités et je n'oublie pas les retenues.",
        "Décimal × entier : je calcule sans la virgule, puis je remets autant de chiffres après la virgule.",
      ],
      exercices: [
        {
          enonce: "Calcule.\na) 7 × 9\nb) 8 × 6\nc) 6 × 7\nd) 9 × 9",
          reponses: [
            { question: "a)", attendu: "63" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "42" },
            { question: "d)", attendu: "81" },
          ],
          correction:
            "a) 7 × 9 = 63. Astuce : 7 × 10 = 70, puis j'enlève 7. 70 − 7 = 63.\nb) 8 × 6 = 48. C'est aussi 6 × 8.\nc) 6 × 7 = 42. Je vérifie : 6 × 6 = 36, et 36 + 6 = 42.\nd) 9 × 9 = 81. Astuce : 9 × 10 = 90, puis 90 − 9 = 81.\n⛔ Le piège : mélanger les tables. 6 × 7 = 42, pas 48. 48, c'est 6 × 8.\nRéponse : a) 63 ; b) 48 ; c) 42 ; d) 81.",
          micros: ["multiplication_table"],
        },
        {
          enonce:
            "Complète.\na) 7 × … = 56\nb) … × 9 = 45\nc) 4 × … = 36\nd) 54, c'est :\nA) 6 × 8   B) 7 × 8   C) 6 × 9",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "9" },
            { question: "d)", attendu: "C" },
          ],
          correction:
            "Je cherche dans la table, puis je vérifie.\na) Dans la table de 7 : 7 × 8 = 56. Il manque 8.\nb) Dans la table de 9 : 5 × 9 = 45. Il manque 5.\nc) Dans la table de 4 : 4 × 9 = 36. Il manque 9.\nd) 6 × 8 = 48 ; 7 × 8 = 56 ; 6 × 9 = 54. C'est C.\n⛔ Le piège du d) : choisir 6 × 8. 6 × 8 = 48, pas 54.\nRéponse : a) 8 ; b) 5 ; c) 9 ; d) C.",
          micros: ["multiplication_table"],
        },
        {
          enonce:
            "Un fabricant range ses crayons par boîtes de 10, de 100 ou de 1 000. Calcule.\na) 47 × 10\nb) 305 × 100\nc) 62 × 1 000\nd) 3,8 × 10",
          reponses: [
            { question: "a)", attendu: "470" },
            { question: "b)", attendu: "30500" },
            { question: "c)", attendu: "62000" },
            { question: "d)", attendu: "38" },
          ],
          correction:
            "Je regarde la valeur de chaque chiffre.\na) × 10 : chaque chiffre vaut 10 fois plus. Les 4 dizaines deviennent 4 centaines. Les 7 unités deviennent 7 dizaines. Il n'y a plus d'unités : j'écris 0. 47 × 10 = 470.\nb) × 100 : chaque chiffre monte de 2 rangs. Les 3 centaines deviennent 3 dizaines de mille. Les 5 unités deviennent 5 centaines. 305 × 100 = 30 500.\nc) × 1 000 : chaque chiffre monte de 3 rangs. Les 6 dizaines deviennent 6 dizaines de mille. Les 2 unités deviennent 2 milliers. 62 × 1 000 = 62 000.\nd) × 10 : les 3 unités deviennent 3 dizaines. Les 8 dixièmes deviennent 8 unités. 3,8 × 10 = 38.\n⭐ Le raccourci : pour un entier, j'écris des zéros à droite. Pour un décimal, la virgule avance d'un rang vers la droite par zéro.\n⛔ Le piège du d) : ajouter un 0. 3,80 est égal à 3,8 : ce n'est pas 10 fois plus.\nRéponse : a) 470 ; b) 30 500 ; c) 62 000 ; d) 38.",
          micros: ["multiplication_puissance_dix"],
        },
        {
          enonce:
            "On calcule 4,25 × 100.\na) Le chiffre 4 des unités devient le chiffre des :\nA) dizaines   B) centaines   C) milliers\nb) Calcule 4,25 × 100.\nc) Calcule 0,7 × 1 000.\nd) Calcule 1,06 × 10.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "425" },
            { question: "c)", attendu: "700" },
            { question: "d)", attendu: "10,6" },
          ],
          correction:
            "a) × 100 : chaque chiffre monte de 2 rangs. Unités → dizaines → centaines. Le 4 devient le chiffre des centaines : B.\nb) Le 4 des unités devient 4 centaines. Le 2 des dixièmes devient 2 dizaines. Le 5 des centièmes devient 5 unités. 4,25 × 100 = 425.\nc) × 1 000 : les 7 dixièmes montent de 3 rangs. Dixièmes → unités → dizaines → centaines. 0,7 × 1 000 = 700.\nd) × 10 : le 1 des unités devient 1 dizaine. Le 0 des dixièmes devient 0 unité. Le 6 des centièmes devient 6 dixièmes. 1,06 × 10 = 10,6.\n⛔ Le piège : écrire 4,2500. Ajouter des zéros après la virgule ne change pas le nombre.\nRéponse : a) B ; b) 425 ; c) 700 ; d) 10,6.",
          schema: ecranSeulement(glisse("4,25", "425", "× 100")),
          micros: ["multiplication_puissance_dix"],
        },
        {
          enonce: "Calcule de tête en découpant le premier nombre.\na) 34 × 5\nb) 21 × 6\nc) 25 × 4\nd) 19 × 3",
          reponses: [
            { question: "a)", attendu: "170" },
            { question: "b)", attendu: "126" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: "57" },
          ],
          correction:
            "Je découpe en dizaines et en unités, je multiplie chaque morceau, puis j'additionne.\na) 34 = 30 + 4. 30 × 5 = 150 et 4 × 5 = 20. 150 + 20 = 170.\nb) 21 = 20 + 1. 20 × 6 = 120 et 1 × 6 = 6. 120 + 6 = 126.\nc) 25 = 20 + 5. 20 × 4 = 80 et 5 × 4 = 20. 80 + 20 = 100.\nd) 19, c'est 20 − 1. 20 × 3 = 60. J'ai pris 1 de trop, 3 fois : 60 − 3 = 57.\n⛔ Le piège : oublier de multiplier un morceau. 34 × 5, ce n'est pas 30 × 5 + 4 = 154.\nRéponse : a) 170 ; b) 126 ; c) 100 ; d) 57.",
          micros: ["multiplication_mental"],
        },
        {
          enonce: "Calcule de tête.\na) 30 × 4\nb) 50 × 8\nc) 200 × 7\nd) 60 × 30",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "400" },
            { question: "c)", attendu: "1400" },
            { question: "d)", attendu: "1800" },
          ],
          correction:
            "Je calcule avec les chiffres, puis je pense à la valeur.\na) 30, ce sont 3 dizaines. 3 × 4 = 12 : 12 dizaines = 120.\nb) 5 dizaines × 8 = 40 dizaines = 400.\nc) 2 centaines × 7 = 14 centaines = 1 400.\nd) 60 × 30 = 6 × 3 × 10 × 10. 6 × 3 = 18 et 10 × 10 = 100. 18 × 100 = 1 800.\n⛔ Le piège du d) : oublier un zéro. 60 × 30 = 180 est faux : il y a deux zéros, un dans chaque nombre.\nRéponse : a) 120 ; b) 400 ; c) 1 400 ; d) 1 800.",
          micros: ["multiplication_mental"],
        },
        {
          enonce: "Pose et calcule.\na) 136 × 4\nb) 257 × 3",
          reponses: [
            { question: "a)", attendu: "544" },
            { question: "b)", attendu: "771" },
          ],
          correction:
            "Ordre de grandeur : 136 × 4 ≈ 140 × 4 = 560. 257 × 3 ≈ 250 × 3 = 750.\na) 6 × 4 = 24 : je pose 4, je retiens 2.\n3 × 4 = 12, plus 2 de retenue : 14. Je pose 4, je retiens 1.\n1 × 4 = 4, plus 1 de retenue : 5. Résultat : 544.\nb) 7 × 3 = 21 : je pose 1, je retiens 2.\n5 × 3 = 15, plus 2 : 17. Je pose 7, je retiens 1.\n2 × 3 = 6, plus 1 : 7. Résultat : 771.\n⛔ Le piège : oublier la retenue. Sans elle, au a), on trouverait 424.\nRéponse : a) 544 ; b) 771.",
          schema: posee(["136", "× 4", "544"], [1]),
          micros: ["multiplication_posee"],
        },
        {
          enonce:
            "a) Un stylo coûte 1,45 €. Combien coûtent 3 stylos ?\nb) Un ruban mesure 2,6 m. Combien mesurent 5 rubans mis bout à bout ?",
          reponses: [
            { question: "a)", attendu: "4,35" },
            { question: "b)", attendu: "13" },
          ],
          correction:
            "Je calcule sans la virgule, puis je la remets.\na) 145 × 3 = 435. 1,45 a 2 chiffres après la virgule. Le résultat aussi : 4,35 €.\nJe vérifie l'ordre de grandeur : 1,45 ≈ 1,5 et 1,5 × 3 = 4,5. 4,35 est proche.\nb) 26 × 5 = 130. 2,6 a 1 chiffre après la virgule : 13,0. Donc 13 m.\n⛔ Le piège : oublier la virgule. 3 stylos ne coûtent pas 435 € !\nRéponse : a) 4,35 € ; b) 13 m.",
          schema: ecranSeulement(posee(["1,45", "× 3", "4,35"], [1])),
          micros: ["multiplication_decimale_posee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je pose au brouillon, et je vérifie avec un ordre de grandeur.",
      rappel: [
        "Avec 2 chiffres en bas : je multiplie par les unités, puis par les dizaines en écrivant un 0 au début de la 2e ligne. J'additionne.",
        "Ordre de grandeur : j'arrondis les nombres, puis je calcule de tête. 49 × 21 ≈ 50 × 20 = 1 000.",
        "Quand on répète la même quantité plusieurs fois, on multiplie.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule.\na) 47 × 23\nb) 125 × 34",
          reponses: [
            { question: "a)", attendu: "1081" },
            { question: "b)", attendu: "4250" },
          ],
          correction:
            "a) Ordre de grandeur : 50 × 20 = 1 000.\n1re ligne : 47 × 3 = 141.\n2e ligne : 47 × 20. J'écris d'abord 0 aux unités, puis 47 × 2 = 94. Cela donne 940.\nJ'additionne : 141 + 940 = 1 081.\nb) Ordre de grandeur : 125 × 30 = 3 750.\n1re ligne : 125 × 4 = 500.\n2e ligne : 125 × 30 = 3 750.\nJ'additionne : 500 + 3 750 = 4 250.\n⛔ Le piège : oublier le 0 de la 2e ligne. 141 + 94 = 235 est faux : le 2 de 23 vaut 2 dizaines.\nRéponse : a) 1 081 ; b) 4 250.",
          schema: posee(["47", "× 23", "141", "940", "1081"], [1, 3]),
          micros: ["multiplication_posee"],
        },
        {
          enonce: "Calcule. Tu peux poser au brouillon.\na) 3,25 × 6\nb) 12,8 × 7\nc) 0,45 × 8",
          reponses: [
            { question: "a)", attendu: "19,5" },
            { question: "b)", attendu: "89,6" },
            { question: "c)", attendu: "3,6" },
          ],
          correction:
            "Je calcule sans la virgule, puis je remets le même nombre de chiffres après la virgule.\na) 325 × 6 = 1 950. 3,25 a 2 chiffres après la virgule : 19,50 = 19,5.\nOrdre de grandeur : 3 × 6 = 18. C'est proche.\nb) 128 × 7 = 896. 12,8 a 1 chiffre après la virgule : 89,6.\nOrdre de grandeur : 13 × 7 = 91. C'est proche.\nc) 45 × 8 = 360. 0,45 a 2 chiffres après la virgule : 3,60 = 3,6.\n⛔ Le piège du c) : écrire 0,360. Je compte les chiffres après la virgule dans 0,45 : il y en a 2, pas 3.\nRéponse : a) 19,5 ; b) 89,6 ; c) 3,6.",
          schema: ecranSeulement(posee(["3,25", "× 6", "19,50"], [1])),
          micros: ["multiplication_decimale_posee"],
        },
        {
          enonce:
            "Choisis le bon ordre de grandeur, sans poser.\na) 49 × 21 ≈ …\nA) 100   B) 1 000   C) 10 000\nb) 302 × 9 ≈ …\nA) 2 700   B) 270   C) 27 000\nc) 1,98 × 5 ≈ …\nA) 100   B) 1   C) 10",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "J'arrondis chaque nombre, puis je calcule de tête.\na) 49 ≈ 50 et 21 ≈ 20. 50 × 20 = 1 000 : B. (Le vrai résultat : 1 029.)\nb) 302 ≈ 300. 300 × 9 = 2 700 : A. (Le vrai résultat : 2 718.)\nc) 1,98 ≈ 2. 2 × 5 = 10 : C. (Le vrai résultat : 9,9.)\n⛔ Le piège : se tromper de zéros. 50 × 20, ce n'est pas 100 : 5 × 2 = 10, puis deux zéros, 1 000.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["multiplication_mental"],
        },
        {
          enonce: "Complète avec 10, 100 ou 1 000, ou avec un nombre.\na) 54 × … = 5 400\nb) 0,3 × … = 300\nc) … × 10 = 72\nd) 6,05 × … = 60,5",
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "1000" },
            { question: "c)", attendu: "7,2" },
            { question: "d)", attendu: "10" },
          ],
          correction:
            "Je regarde de combien de rangs chaque chiffre a monté.\na) Le 4 des unités devient 4 centaines : 2 rangs. C'est × 100.\nb) Le 3 des dixièmes devient 3 centaines : dixièmes → unités → dizaines → centaines, 3 rangs. C'est × 1 000.\nc) × 10 fait monter d'un rang. Dans 72, le 7 est aux dizaines : avant, il était aux unités. Le 2 était aux dixièmes. Le nombre est 7,2.\nd) Le 6 des unités devient 6 dizaines : 1 rang. C'est × 10.\n⛔ Le piège du b) : compter les zéros de 300 et répondre 100. 0,3 × 100 = 30 seulement.\nRéponse : a) 100 ; b) 1 000 ; c) 7,2 ; d) 10.",
          micros: ["multiplication_puissance_dix"],
        },
        {
          enonce:
            "Une boulangère vend 48 baguettes à 1,15 € et 36 croissants à 0,95 €.\na) Combien rapportent les baguettes ?\nb) Combien rapportent les croissants ?\nc) Combien gagne-t-elle en tout ?",
          reponses: [
            { question: "a)", attendu: "55,2" },
            { question: "b)", attendu: "34,2" },
            { question: "c)", attendu: "89,4" },
          ],
          correction:
            "48 fois le même prix : je multiplie.\na) Sans la virgule : 115 × 48 = 5 520. 1,15 a 2 chiffres après la virgule : 55,20 €.\nb) Sans la virgule : 95 × 36 = 3 420. 0,95 a 2 chiffres après la virgule : 34,20 €.\nc) 55,20 + 34,20 = 89,40 €.\n⭐ Ordre de grandeur : 48 × 1 ≈ 50 et 36 × 1 ≈ 35. 50 + 35 = 85. C'est proche.\n⛔ Le piège : additionner 48 + 1,15. Pour 48 baguettes au même prix, je multiplie.\nRéponse : a) 55,20 € ; b) 34,20 € ; c) 89,40 €.",
          micros: ["multiplication_probleme", "multiplication_decimale_posee"],
        },
        {
          enonce: "Vrai ou faux ?\na) 6 × 8 = 8 × 6\nb) 7 × 0 = 7\nc) 25 × 4 × 9 = 900\nd) 12 × 5 = 50",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) On peut retourner une multiplication : 6 × 8 = 48 et 8 × 6 = 48. Vrai.\nb) 7 fois 0, c'est 0 + 0 + 0 + 0 + 0 + 0 + 0 = 0. Faux.\nc) Je commence par 25 × 4 = 100. Puis 100 × 9 = 900. Vrai.\nd) 12 × 5 = 10 × 5 + 2 × 5 = 50 + 10 = 60. Faux.\n⛔ Le piège du b) : croire que « × 0 » ne change rien. C'est « × 1 » qui ne change rien : 7 × 1 = 7.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["multiplication_table", "multiplication_mental"],
        },
        {
          enonce:
            "a) Un cahier coûte 2,40 €. Noé en achète 5. Quel calcul donne le prix ?\nA) 2,40 × 5   B) 2,40 + 5   C) 2,40 ÷ 5\nb) Calcule ce prix.\nc) Une salle a 9 rangées de 14 chaises. Combien de chaises en tout ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "126" },
          ],
          correction:
            "a) Noé paie 5 fois le même prix : je multiplie. C'est A.\nb) Sans la virgule : 240 × 5 = 1 200. 2,40 a 2 chiffres après la virgule : 12,00 €, soit 12 €.\nc) 9 rangées de 14 : 9 × 14. Je découpe : 9 × 10 = 90 et 9 × 4 = 36. 90 + 36 = 126 chaises.\n⛔ Le piège : choisir B. 2,40 + 5 ajoute des cahiers à des euros : ça n'a pas de sens.\nRéponse : a) A ; b) 12 € ; c) 126 chaises.",
          micros: ["multiplication_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. J'écris chaque étape, une multiplication à la fois.",
      rappel: [
        "Je repère ce qui se répète : 14 rangées de 22 fauteuils, c'est 14 × 22.",
        "Une étape après l'autre : je me demande ce que représente chaque résultat.",
        "Je vérifie avec un ordre de grandeur, et je réponds avec l'unité : €, km, g.",
      ],
      exercices: [
        {
          titre: "Le cinéma",
          enonce:
            "Sam est gérant d'un cinéma. Sa salle a 14 rangées de 22 fauteuils. Une place coûte 7,50 €.\na) Combien y a-t-il de fauteuils ?\nb) Combien rapporte une séance quand la salle est pleine ?\nc) Le samedi, il y a 3 séances pleines. Combien rapportent-elles en tout ?",
          reponses: [
            { question: "a)", attendu: "308" },
            { question: "b)", attendu: "2310" },
            { question: "c)", attendu: "6930" },
          ],
          correction:
            "a) 14 rangées de 22 : 14 × 22. Je découpe : 14 × 20 = 280 et 14 × 2 = 28. 280 + 28 = 308 fauteuils.\nb) 308 places à 7,50 €. 7,50 = 7,5. Sans la virgule : 308 × 75 = 23 100. 1 chiffre après la virgule : 2 310,0. Donc 2 310 €.\nJe vérifie : 308 × 7 = 2 156 et la moitié de 308 est 154. 2 156 + 154 = 2 310.\nc) 3 séances : 2 310 × 3 = 6 930 €.\n⛔ Le piège : s'arrêter trop tôt. 308, c'est le nombre de places, pas l'argent gagné.\nRéponse : a) 308 fauteuils ; b) 2 310 € ; c) 6 930 €.",
          micros: ["multiplication_probleme", "multiplication_posee", "multiplication_decimale_posee", "multiplication_defi"],
        },
        {
          titre: "Les crêpes",
          enonce:
            "Un cuisinier a une recette de crêpes pour 4 personnes : 250 g de farine, 0,5 L de lait et 3 œufs. Il cuisine pour 12 personnes.\na) Par combien multiplie-t-il la recette ?\nb) Combien de grammes de farine lui faut-il ?\nc) Combien de litres de lait ?\nd) Combien d'œufs ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "750" },
            { question: "c)", attendu: "1,5" },
            { question: "d)", attendu: "9" },
          ],
          correction:
            "a) 12 personnes, c'est 3 fois 4 personnes : 4 × 3 = 12. Il multiplie tout par 3.\nb) 250 × 3 = 750 g de farine.\nc) 0,5 × 3 = 1,5 L de lait. (Trois demi-litres font un litre et demi.)\nd) 3 × 3 = 9 œufs.\n⛔ Le piège : ajouter 8 à chaque quantité, parce que 12 − 4 = 8. Une recette pour 3 fois plus de monde se multiplie par 3.\nRéponse : a) 3 ; b) 750 g ; c) 1,5 L ; d) 9 œufs.",
          micros: ["multiplication_probleme", "multiplication_decimale_posee", "multiplication_table"],
        },
        {
          titre: "Le voyage en train",
          enonce:
            "La famille Martin part en train. Ils sont 4. Un billet coûte 39,90 €. Le train roule 4 heures, à 118 km par heure en moyenne.\na) Combien coûtent les 4 billets ?\nb) Combien de kilomètres parcourt le train ?\nc) Ils paient avec 200 €. Combien leur rend-on ?",
          reponses: [
            { question: "a)", attendu: "159,6" },
            { question: "b)", attendu: "472" },
            { question: "c)", attendu: "40,4" },
          ],
          correction:
            "a) 4 billets au même prix : 39,90 × 4. Sans la virgule : 3 990 × 4 = 15 960. 2 chiffres après la virgule : 159,60 €.\nOrdre de grandeur : 40 × 4 = 160. C'est proche.\nb) 118 km chaque heure, pendant 4 heures : 118 × 4 = 472 km.\nc) 200 − 159,60 = 40,40 €.\n⛔ Le piège du c) : répondre 159,60 €. La question demande la monnaie rendue, pas le prix.\nRéponse : a) 159,60 € ; b) 472 km ; c) 40,40 €.",
          micros: ["multiplication_probleme", "multiplication_decimale_posee", "multiplication_defi"],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Une technicienne installe 16 panneaux solaires sur le toit d'une école. Chaque panneau produit 1,25 kWh par jour.\na) Combien de kWh produisent les 16 panneaux en un jour ?\nb) Et en 30 jours ?\nc) L'école utilise 450 kWh en 30 jours. Les panneaux produisent-ils assez ? (oui ou non)",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "600" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "a) 16 panneaux pareils : 1,25 × 16. Sans la virgule : 125 × 16 = 2 000. 2 chiffres après la virgule : 20,00. Donc 20 kWh.\nJe vérifie : 125 × 16 = 125 × 8 × 2 = 1 000 × 2 = 2 000.\nb) 20 kWh chaque jour pendant 30 jours : 20 × 30 = 600 kWh.\nc) 600 est plus grand que 450. Oui, les panneaux produisent assez.\n⛔ Le piège du a) : oublier la virgule et écrire 2 000 kWh. L'ordre de grandeur : 1 × 16 = 16, donc environ 20.\nRéponse : a) 20 kWh ; b) 600 kWh ; c) oui.",
          micros: ["multiplication_probleme", "multiplication_decimale_posee", "multiplication_defi"],
        },
        {
          titre: "Le défi des produits",
          enonce:
            "a) Quel produit est le plus grand ?\nA) 45 × 20   B) 450 × 3   C) 4,5 × 100\nb) On sait que 12 × 25 = 300. Sans poser, calcule 12 × 250.\nc) Sans poser, calcule 1,2 × 25.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "3000" },
            { question: "c)", attendu: "30" },
          ],
          correction:
            "a) Je calcule les trois produits.\nA) 45 × 20 = 45 × 2 × 10 = 90 × 10 = 900.\nB) 450 × 3 = 1 350.\nC) 4,5 × 100 = 450.\nLe plus grand est 1 350 : B.\nb) 250, c'est 25 × 10. Le produit est 10 fois plus grand : 300 × 10 = 3 000.\nc) 1,2 est 10 fois plus petit que 12. Le produit est 10 fois plus petit : 300 ÷ 10 = 30.\n⛔ Le piège du c) : multiplier par 10 au lieu de diviser. 1,2 est plus PETIT que 12 : le résultat aussi.\nRéponse : a) B ; b) 3 000 ; c) 30.",
          micros: ["multiplication_defi", "multiplication_puissance_dix", "multiplication_mental"],
        },
      ],
    },
  ],
};
