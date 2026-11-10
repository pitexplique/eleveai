// ─── Fiche d'exercices : les durées (CM1) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : la feuille interactive de la notion `duree` du coach CM1
// (6 micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cm1/maths/durees.bank.ts`) et sur la carte
// mentale `cm1/duree` (lib/cartes/remplies/cm1.json) : lire l'heure, placer
// les aiguilles, convertir (j, h, min, s), calculer une durée, une heure de
// fin, problèmes.
// ⛔ LIMITES DU CM1 : pas de calcul posé en base 60, des durées découpées
// « jusqu'à l'heure pile » ; pas de jours/heures/minutes mêlés.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un nom.
//
// ⛔ UNE HEURE SE SAISIT EN DEUX CHAMPS, « heures » puis « minutes » (10/11).
// Le vérificateur lit « 8 h 15 » comme le PRODUIT 8 × h × 15 : « 3 h 40 »
// (les aiguilles inversées !) passait alors pour « 8 h 15 », et « 5 h 5 »
// pour « 1 h 25 ». Avec deux nombres séparés, plus de collision. Une durée
// demandée « en minutes » ou « en secondes » se saisit en un seul nombre.
// ⛔ LA SAISIE IGNORE L'UNITÉ FINALE (« 45 h » vaut 45) : l'énoncé IMPOSE
// l'unité de chaque réponse.
//
// Les pièges nommés : la petite et la grande aiguille inversées (1, 8), 2 h =
// 200 min (2, 9), grande aiguille sur 6 = 6 min (3), compter 45 − 0 en heures
// (4), une demi-heure = 50 min (5), lire 10 h 50 quand la petite aiguille
// approche du 10 (6), 1 h 30 = 130 min (7, 9), la petite aiguille pile sur 6
// à 6 h 20 (10), 16 h 50 juste mais 15 h 75 (11), soustraire 11,10 − 9,45
// comme des nombres (12), oublier la pause (13), 1 h 20 = 120 min (14), le
// plus grand nombre = le plus rapide (15), 2 jours = 20 h (16), oublier les
// 10 min avant l'heure pile (17), 5 h 10 + 1 h 30 = 6 h 40 juste mais
// 6 h 65 (18), répondre 7 h (19), 12 min 90 s laissé tel quel (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : transports (4, 17), cuisine (11, 18),
// cinéma (11), sport (12, natation ; 13, football), jeux (15, puzzle),
// vacances (16), santé (19), musique (20). Les métiers : arbitre (13),
// conductrice de train (17), boulanger (18), infirmière (19), musicienne (20).
// AUCUN contexte réunionnais sur cette feuille (règle : ≈ 1 sur 25).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 13 — un match de football : deux mi-temps de 45 minutes, une pause
//     de 15 minutes au plus (Lois du jeu de l'IFAB, loi 7 « Durée du match »).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : des horloges à aiguilles (`horloges`), la petite aiguille
// placée EXACTEMENT entre deux nombres selon les minutes (à 9 h 50, presque
// sur le 10).
//
// Micro-compétences : duree_lire (1, 3, 6, 8, 13), duree_convertir (2, 5, 7, 9,
// 14, 15, 16, 20), duree_calculer (4, 6, 11, 12, 13), duree_probleme (11, 12,
// 13, 15, 17, 18, 19, 20), duree_positionner_aiguilles (3, 8, 10),
// duree_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/**
 * Des horloges à aiguilles côte à côte. `h` (0 à 23) et `m` : la petite
 * aiguille avance avec les minutes (à 9 h 50, elle est presque sur le 10).
 * Petite aiguille épaisse et orange, grande aiguille fine et bleue. Texte nu.
 */
const horloges = (liste: { h: number; m: number; label?: string }[]) => {
  const [r, larg] = [48, 124];
  const point = (cx: number, cy: number, L: number, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + L * Math.sin(t), y: cy - L * Math.cos(t) };
  };
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `${liste.length * 7.5}rem` }}>
      <svg viewBox={`0 0 ${liste.length * larg} 138`} className="block h-auto w-full" role="img" aria-label="Horloges à aiguilles">
        {liste.map((c, i) => {
          const [cx, cy] = [larg / 2 + i * larg, 58];
          const petite = point(cx, cy, 26, ((c.h % 12) + c.m / 60) * 30);
          const grande = point(cx, cy, 40, c.m * 6);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke={NOIR} strokeWidth={2.5} />
              {Array.from({ length: 60 }, (_, k) => {
                const a = point(cx, cy, r - (k % 5 === 0 ? 6 : 3), k * 6);
                const b = point(cx, cy, r, k * 6);
                return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={NOIR} strokeWidth={k % 5 === 0 ? 1.6 : 0.7} />;
              })}
              {Array.from({ length: 12 }, (_, k) => {
                const p = point(cx, cy, r - 15, (k + 1) * 30);
                return (
                  <text key={k} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={NOIR}>
                    {k + 1}
                  </text>
                );
              })}
              <line x1={cx} y1={cy} x2={petite.x} y2={petite.y} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
              <line x1={cx} y1={cy} x2={grande.x} y2={grande.y} stroke={BLEU} strokeWidth={2.6} strokeLinecap="round" />
              <circle cx={cx} cy={cy} r={3.5} fill={NOIR} />
              {c.label ? (
                <text x={cx} y={128} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                  {c.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesDureeCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "duree",
  titre: "Les durées",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire l'heure sur une horloge à aiguilles, placer les aiguilles. Passer des heures aux minutes, des minutes aux secondes. Calculer une durée, trouver l'heure de fin. Un bus, un gâteau au four, un cours de natation, un match de football, un train, un boulanger, une infirmière de nuit et une musicienne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Pour une heure, j'écris les heures dans une case, les minutes dans l'autre.",
      rappel: [
        "La petite aiguille montre l'heure. La grande aiguille montre les minutes.",
        "La grande aiguille : je compte de 5 en 5. Sur le 3, c'est 15 minutes ; sur le 6, 30 minutes.",
        "1 h = 60 min. 1 min = 60 s. 1 jour = 24 h.",
      ],
      exercices: [
        {
          enonce: "Quelle heure indique chaque horloge ? C'est le matin.\nÉcris les heures, puis les minutes.",
          figure: horloges([
            { h: 3, m: 0, label: "1" },
            { h: 4, m: 30, label: "2" },
            { h: 7, m: 15, label: "3" },
          ]),
          correction:
            "Je lis d'abord la petite aiguille (orange), puis la grande (bleue).\nHorloge 1 : la petite est sur le 3, la grande sur le 12. Il est 3 h 00.\nHorloge 2 : la petite est entre le 4 et le 5. La grande est sur le 6 : $6 \\times 5 = 30$ minutes. Il est 4 h 30.\nHorloge 3 : la petite est juste après le 7. La grande est sur le 3 : $3 \\times 5 = 15$ minutes. Il est 7 h 15.\n⛔ Le piège : inverser les aiguilles. Pour l'horloge 3, lire « 3 h 35 ». La petite aiguille donne TOUJOURS l'heure.\nRéponse : 3 h 00 ; 4 h 30 ; 7 h 15.",
          micros: ["duree_lire"],
          reponses: [
            { question: "1) heures", attendu: "3" },
            { question: "1) minutes", attendu: ["0", "00"] },
            { question: "2) heures", attendu: "4" },
            { question: "2) minutes", attendu: "30" },
            { question: "3) heures", attendu: "7" },
            { question: "3) minutes", attendu: "15" },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 h = … min\nb) 2 h = … min\nc) 1 min = … s\nd) 1 jour = … h",
          correction:
            "J'utilise les égalités du rappel.\na) 1 h = 60 min.\nb) 2 h, c'est $2 \\times 60 = 120$ min.\nc) 1 min = 60 s.\nd) 1 jour = 24 h.\n⛔ Le piège : écrire 2 h = 200 min, comme si 1 h valait 100 min. Une heure, c'est 60 minutes.\nRéponse : a) 60 ; b) 120 ; c) 60 ; d) 24.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "120" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "24" },
          ],
        },
        {
          enonce: "La grande aiguille est sur un nombre. Combien de minutes indique-t-elle ?\na) sur le 3\nb) sur le 6\nc) sur le 9\nd) sur le 10",
          correction:
            "D'un nombre au suivant, la grande aiguille avance de 5 minutes. Je multiplie par 5.\na) Sur le 3 : $3 \\times 5 = 15$ minutes.\nb) Sur le 6 : $6 \\times 5 = 30$ minutes.\nc) Sur le 9 : $9 \\times 5 = 45$ minutes.\nd) Sur le 10 : $10 \\times 5 = 50$ minutes.\n⛔ Le piège : lire « 6 minutes » quand la grande aiguille est sur le 6. Ce sont 30 minutes.\nRéponse : a) 15 ; b) 30 ; c) 45 ; d) 50.",
          micros: ["duree_lire", "duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "50" },
          ],
        },
        {
          enonce: "Combien de temps, en minutes ?\na) Un bus part à 8 h 00. Il arrive à 8 h 45.\nb) Une séance de yoga va de 10 h 15 à 10 h 45.",
          correction:
            "L'heure ne change pas : je compte seulement les minutes.\na) De 8 h 00 à 8 h 45 : $45 - 0 = 45$ minutes.\nb) De 10 h 15 à 10 h 45 : $45 - 15 = 30$ minutes.\n⛔ Le piège du b) : répondre 45 minutes. La séance ne commence pas à 10 h 00, mais à 10 h 15.\nRéponse : a) 45 ; b) 30.",
          micros: ["duree_calculer"],
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "30" },
          ],
        },
        {
          enonce: "Choisis la bonne réponse. Écris la lettre.\na) Une demi-heure : A) 50 min B) 30 min C) 20 min\nb) Un quart d'heure : A) 15 min B) 25 min C) 4 min\nc) Trois quarts d'heure : A) 34 min B) 75 min C) 45 min",
          correction:
            "Une heure, c'est 60 minutes. Je la coupe en parts égales.\na) Une demi-heure : la moitié de 60. $60 \\div 2 = 30$ min. Réponse B.\nb) Un quart d'heure : 60 coupé en 4. $60 \\div 4 = 15$ min. Réponse A.\nc) Trois quarts d'heure : 3 fois 15 min. $3 \\times 15 = 45$ min. Réponse C.\n⛔ Le piège : une demi-heure = 50 min, comme la moitié de 100. Une heure n'a que 60 minutes.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 30 min"] },
            { question: "b)", attendu: ["A", "A) 15 min"] },
            { question: "c)", attendu: ["C", "C) 45 min"] },
          ],
        },
        {
          enonce: "C'est le matin. Regarde l'horloge.\na) Quelle heure est-il ? Écris les heures, puis les minutes.\nb) Quelle heure sera-t-il dans 10 minutes ?",
          figure: horloges([{ h: 9, m: 50 }]),
          correction:
            "a) La grande aiguille est sur le 10 : $10 \\times 5 = 50$ minutes.\nLa petite aiguille est presque sur le 10, mais PAS encore : elle est entre le 9 et le 10.\nIl est donc 9 h 50.\nb) De 9 h 50, il manque 10 minutes pour arriver à l'heure pile : $50 + 10 = 60$ min = 1 h.\nDans 10 minutes, il sera 10 h 00.\n⛔ Le piège du a) : lire 10 h 50. La petite aiguille n'a pas encore atteint le 10 : l'heure est toujours 9.\nRéponse : a) 9 h 50 ; b) 10 h 00.",
          micros: ["duree_lire", "duree_calculer"],
          reponses: [
            { question: "a) heures", attendu: "9" },
            { question: "a) minutes", attendu: "50" },
            { question: "b) heures", attendu: "10" },
            { question: "b) minutes", attendu: ["0", "00"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 h = 100 min\nb) 1 min = 60 s\nc) 1 h 30 min = 130 min\nd) 1 jour = 24 h",
          correction:
            "Je relis les égalités du rappel.\na) 1 h = 60 min, pas 100. Faux.\nb) 1 min = 60 s. Vrai.\nc) 1 h 30 min = $60 + 30 = 90$ min, pas 130. Faux.\nd) 1 jour = 24 h. Vrai.\n⛔ Le piège du c) : coller 1 et 30 pour faire 130. L'heure vaut 60 minutes : j'ajoute 60 et 30.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "Quelle horloge indique 2 h 45 ?\nÉcris la lettre : A, B ou C.",
          figure: horloges([
            { h: 9, m: 10, label: "A" },
            { h: 3, m: 45, label: "B" },
            { h: 2, m: 45, label: "C" },
          ]),
          correction:
            "À 2 h 45, la grande aiguille est sur le 9 : $9 \\times 5 = 45$ minutes.\nLa petite aiguille a dépassé le 2 et approche du 3 : elle est entre le 2 et le 3.\nHorloge A : la petite est sur le 9, la grande sur le 2. C'est 9 h 10 : les aiguilles sont inversées.\nHorloge B : la petite est entre le 3 et le 4. C'est 3 h 45.\nHorloge C : la petite entre le 2 et le 3, la grande sur le 9. C'est 2 h 45. Réponse C.\n⛔ Le piège : choisir B, parce que la petite aiguille est « presque sur 3 ». À 2 h 45, elle est avant le 3, pas après.\nRéponse : C.",
          micros: ["duree_lire", "duree_positionner_aiguilles"],
          reponses: [{ attendu: ["C", "horloge C", "l'horloge C"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Une heure, c'est 60 minutes, pas 100.",
      rappel: [
        "Pour une durée, j'avance jusqu'à l'heure pile, puis j'ajoute le reste.",
        "60 min = 1 h. Donc 75 min = 60 min + 15 min = 1 h 15 min.",
        "Pour une heure de fin, j'ajoute la durée à l'heure du début.",
      ],
      exercices: [
        {
          enonce: "Complète. Écris seulement les nombres.\na) 1 h 15 min = … min\nb) 2 h 30 min = … min\nc) 90 min = … h … min\nd) 2 min = … s",
          correction:
            "1 h = 60 min et 1 min = 60 s.\na) 1 h 15 min = $60 + 15 = 75$ min.\nb) 2 h = $2 \\times 60 = 120$ min. Donc 2 h 30 min = $120 + 30 = 150$ min.\nc) 90 min = 60 min + 30 min = 1 h 30 min.\nd) 2 min = $2 \\times 60 = 120$ s.\n⛔ Le piège du b) : écrire 230 min, ou 200 + 30. 2 h, ce n'est pas 200 min, c'est 120 min.\nRéponse : a) 75 ; b) 150 ; c) 1 h 30 min ; d) 120.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "150" },
            { question: "c) h", attendu: "1" },
            { question: "c) min", attendu: "30" },
            { question: "d)", attendu: "120" },
          ],
        },
        {
          enonce: "Tu places les aiguilles d'une horloge.\na) Pour 6 h 20, sur quel nombre va la grande aiguille ?\nb) Pour 6 h 20, où va la petite aiguille ? A) pile sur le 6 B) entre le 6 et le 7 C) entre le 5 et le 6\nc) Pour 11 h 45, sur quel nombre va la grande aiguille ?",
          correction:
            "La grande aiguille : je divise les minutes par 5.\na) 20 minutes : $20 \\div 5 = 4$. La grande aiguille va sur le 4.\nb) Il est 6 heures passées. La petite aiguille a quitté le 6 et avance vers le 7. Réponse B.\nc) 45 minutes : $45 \\div 5 = 9$. La grande aiguille va sur le 9.\n⛔ Le piège du b) : laisser la petite aiguille pile sur le 6. Elle n'est pile sur le 6 qu'à 6 h 00 juste.\nRéponse : a) 4 ; b) B ; c) 9.",
          schema: horloges([{ h: 6, m: 20, label: "6 h 20" }]),
          micros: ["duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["B", "B) entre le 6 et le 7"] },
            { question: "c)", attendu: ["9", "neuf"] },
          ],
        },
        {
          enonce: "Trouve l'heure de fin. Écris les heures, puis les minutes.\na) Un gâteau va au four à 16 h 20. Il cuit 30 minutes. À quelle heure est-il cuit ?\nb) Un film commence à 15 h 40. Il dure 1 h 35 min. À quelle heure finit-il ?",
          correction:
            "J'ajoute la durée à l'heure du début.\na) 16 h 20 + 30 min : $20 + 30 = 50$. Il est cuit à 16 h 50.\nb) J'ajoute d'abord l'heure : 15 h 40 + 1 h = 16 h 40.\nPuis les 35 min. Je vais jusqu'à l'heure pile : de 16 h 40 à 17 h 00, il y a 20 min.\nIl reste $35 - 20 = 15$ min. Donc le film finit à 17 h 15.\n⛔ Le piège du b) : écrire 16 h 75. 75 minutes, c'est plus d'une heure : 1 h 15 min.\nRéponse : a) 16 h 50 ; b) 17 h 15.",
          micros: ["duree_calculer", "duree_probleme"],
          reponses: [
            { question: "a) heures", attendu: "16" },
            { question: "a) minutes", attendu: "50" },
            { question: "b) heures", attendu: "17" },
            { question: "b) minutes", attendu: "15" },
          ],
        },
        {
          enonce: "Le cours de natation va de 9 h 45 à 11 h 10.\na) Combien de temps dure-t-il ? Écris les heures, puis les minutes.\nb) Écris cette durée en minutes.",
          correction:
            "J'avance jusqu'à l'heure pile, puis j'ajoute le reste.\nDe 9 h 45 à 10 h 00 : 15 min.\nDe 10 h 00 à 11 h 00 : 1 h.\nDe 11 h 00 à 11 h 10 : 10 min.\na) J'ajoute : 1 h et $15 + 10 = 25$ min. Le cours dure 1 h 25 min.\nb) 1 h 25 min = $60 + 25 = 85$ min.\n⛔ Le piège : calculer 11,10 − 9,45 comme des nombres à virgule. Une heure a 60 minutes, pas 100.\nRéponse : a) 1 h 25 min ; b) 85.",
          micros: ["duree_calculer", "duree_probleme"],
          reponses: [
            { question: "a) h", attendu: "1" },
            { question: "a) min", attendu: "25" },
            { question: "b)", attendu: "85" },
          ],
        },
        {
          enonce: "Un arbitre regarde l'horloge au début du match (1) et à la fin (2). C'est l'après-midi.\na) Combien de temps s'est-il passé, en minutes ?\nb) Il y a eu 15 minutes de pause. Combien de minutes a-t-on joué ?\nc) Le match a deux mi-temps égales. Combien de minutes dure une mi-temps ?",
          figure: horloges([
            { h: 15, m: 0, label: "1" },
            { h: 16, m: 45, label: "2" },
          ]),
          correction:
            "Horloge 1 : 3 h 00 de l'après-midi, donc 15 h 00. Horloge 2 : 4 h 45, donc 16 h 45.\na) De 15 h 00 à 16 h 00 : 60 min. De 16 h 00 à 16 h 45 : 45 min.\n$60 + 45 = 105$ min.\nb) J'enlève la pause : $105 - 15 = 90$ min de jeu.\nc) Deux mi-temps égales : $90 \\div 2 = 45$ min.\n⛔ Le piège : oublier la pause et répondre $105 \\div 2$ pour une mi-temps. Pendant la pause, on ne joue pas.\nRéponse : a) 105 ; b) 90 ; c) 45.",
          micros: ["duree_lire", "duree_calculer", "duree_probleme"],
          reponses: [
            { question: "a)", attendu: "105" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "45" },
          ],
        },
        {
          enonce: "Quelle durée est la plus longue ? Écris la lettre.\na) A) 1 h 20 min B) 90 min\nb) A) 2 h B) 100 min\nc) A) 150 s B) 2 min",
          correction:
            "Je mets les deux durées dans la même unité.\na) 1 h 20 min = $60 + 20 = 80$ min. 80 < 90 : la plus longue est 90 min. Réponse B.\nb) 2 h = $2 \\times 60 = 120$ min. 120 > 100 : la plus longue est 2 h. Réponse A.\nc) 2 min = $2 \\times 60 = 120$ s. 150 > 120 : la plus longue est 150 s. Réponse A.\n⛔ Le piège du a) : lire 1 h 20 min comme 120 min. C'est 60 + 20 = 80 min.\nRéponse : a) B ; b) A ; c) A.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 90 min"] },
            { question: "b)", attendu: ["A", "A) 2 h"] },
            { question: "c)", attendu: ["A", "A) 150 s"] },
          ],
        },
        {
          enonce: "Oscar fait un puzzle en 4 min 30 s.\nJade fait le même puzzle en 250 s.\na) Écris le temps d'Oscar en secondes.\nb) Qui est le plus rapide ?",
          correction:
            "a) 4 min = $4 \\times 60 = 240$ s. Donc 4 min 30 s = $240 + 30 = 270$ s.\nb) Je compare : 250 s < 270 s. Jade met moins de temps.\nLe plus rapide est celui qui met le MOINS de temps : c'est Jade.\n⛔ Le piège : croire qu'Oscar est plus rapide parce que « 4 min » a l'air court. En secondes, il met plus longtemps.\nRéponse : a) 270 ; b) Jade.",
          micros: ["duree_convertir", "duree_probleme"],
          reponses: [
            { question: "a)", attendu: "270" },
            { question: "b)", attendu: ["Jade"] },
          ],
        },
        {
          enonce: "Pour les vacances, Sacha compte les jours.\na) 2 jours = … h\nb) 1 semaine = … jours\nc) 3 semaines = … jours",
          correction:
            "1 jour = 24 h. 1 semaine = 7 jours.\na) 2 jours = $2 \\times 24 = 48$ h.\nb) 1 semaine = 7 jours : du lundi au dimanche.\nc) 3 semaines = $3 \\times 7 = 21$ jours.\n⛔ Le piège du a) : écrire 20 h, comme si un jour valait 10 heures. Un jour, c'est 24 heures.\nRéponse : a) 48 ; b) 7 ; c) 21.",
          micros: ["duree_convertir"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: "21" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je coupe la durée en morceaux faciles, jusqu'aux heures pile.",
      rappel: [
        "De 9 h 50 à 11 h 10 : 10 min jusqu'à 10 h, puis 1 h, puis 10 min. En tout, 1 h 20 min.",
        "Quand les minutes dépassent 60, j'enlève 60 et j'ajoute 1 heure.",
        "À la fin, je relis la question : heures et minutes, ou seulement des minutes ?",
      ],
      exercices: [
        {
          titre: "Le train de la conductrice",
          enonce: "Léa conduit un train. Elle part à 9 h 50 et arrive à 12 h 05.\na) Combien de temps dure le trajet ? Écris les heures, puis les minutes.\nb) Écris cette durée en minutes.",
          correction:
            "Je coupe le trajet en morceaux faciles.\nDe 9 h 50 à 10 h 00 : 10 min.\nDe 10 h 00 à 12 h 00 : 2 h.\nDe 12 h 00 à 12 h 05 : 5 min.\na) 2 h et $10 + 5 = 15$ min. Le trajet dure 2 h 15 min.\nb) 2 h = $2 \\times 60 = 120$ min. $120 + 15 = 135$ min.\n⛔ Le piège : compter de 9 h à 12 h, soit 3 h, et oublier que le train part à 9 h 50, pas à 9 h 00.\nRéponse : a) 2 h 15 min ; b) 135.",
          micros: ["duree_probleme", "duree_defi"],
          reponses: [
            { question: "a) h", attendu: "2" },
            { question: "a) min", attendu: "15" },
            { question: "b)", attendu: "135" },
          ],
        },
        {
          titre: "La nuit du boulanger",
          enonce: "Un boulanger commence sa pâte à 5 h 10 du matin.\nLa pâte repose 1 h 30 min. Puis le pain cuit 25 min.\na) À quelle heure la pâte a-t-elle fini de reposer ? Écris les heures, puis les minutes.\nb) À quelle heure le pain est-il cuit ?",
          correction:
            "a) 5 h 10 + 1 h = 6 h 10. Puis + 30 min : $10 + 30 = 40$. La pâte a reposé à 6 h 40.\nb) 6 h 40 + 25 min. Je vais jusqu'à l'heure pile : de 6 h 40 à 7 h 00, il y a 20 min.\nIl reste $25 - 20 = 5$ min. Le pain est cuit à 7 h 05.\n⛔ Le piège du b) : écrire 6 h 65. 65 minutes, c'est 1 h 5 min : il est 7 h 05.\nRéponse : a) 6 h 40 ; b) 7 h 05.",
          micros: ["duree_probleme", "duree_defi"],
          reponses: [
            { question: "a) heures", attendu: "6" },
            { question: "a) minutes", attendu: "40" },
            { question: "b) heures", attendu: "7" },
            { question: "b) minutes", attendu: ["5", "05"] },
          ],
        },
        {
          titre: "La garde de l'infirmière",
          enonce: "Nadia est infirmière. Elle travaille la nuit, de 19 h à 7 h le lendemain matin.\na) Combien d'heures dure sa garde ?\nb) Écris cette durée en minutes.",
          correction:
            "Je coupe à minuit, l'heure pile qui change le jour.\nDe 19 h à minuit (24 h) : $24 - 19 = 5$ h.\nDe minuit à 7 h : 7 h.\na) $5 + 7 = 12$ h.\nb) $12 \\times 60 = 720$ min.\n⛔ Le piège : répondre 7 h, ou chercher $7 - 19$, impossible. La garde passe par minuit : je coupe là.\nRéponse : a) 12 ; b) 720.",
          micros: ["duree_probleme", "duree_defi", "duree_convertir"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: "720" },
          ],
        },
        {
          titre: "Le concert de la musicienne",
          enonce: "Une musicienne joue trois morceaux à la suite :\n4 min 30 s, puis 3 min 45 s, puis 5 min 15 s.\na) Combien dure le concert ? Écris les minutes, puis les secondes.\nb) Écris cette durée en secondes.",
          correction:
            "J'additionne les minutes : $4 + 3 + 5 = 12$ min.\nJ'additionne les secondes : $30 + 45 + 15 = 90$ s.\n90 s = 60 s + 30 s = 1 min 30 s.\na) 12 min + 1 min 30 s = 13 min 30 s.\nb) 13 min = $13 \\times 60 = 780$ s. $780 + 30 = 810$ s.\nJe vérifie : 270 s + 225 s + 315 s = 810 s.\n⛔ Le piège : laisser « 12 min 90 s ». Dès qu'il y a 60 secondes, cela fait une minute de plus.\nRéponse : a) 13 min 30 s ; b) 810.",
          micros: ["duree_convertir", "duree_probleme", "duree_defi"],
          reponses: [
            { question: "a) min", attendu: "13" },
            { question: "a) s", attendu: "30" },
            { question: "b)", attendu: "810" },
          ],
        },
      ],
    },
  ],
};
