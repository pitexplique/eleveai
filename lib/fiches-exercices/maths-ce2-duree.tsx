// ─── Fiche d'exercices : le temps et les durées (CE2) — 20 exercices corrigés ─
//
// 17/11/2026 : la feuille interactive de la notion `duree` du coach CE2
// (« Temps et durées », 6 micros). Sur la forme de `maths-cm1-masse.tsx` et de
// `maths-ce1-duree.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
// Alignée sur la banque du coach (`lib/tutor-v4/questionBank/ce2/maths/duree.bank.ts`).
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : lire l'heure à 5 minutes près,
// placer les aiguilles, 1 h = 60 min et 1 jour = 24 h, une durée écoulée DANS
// LA JOURNÉE (pas de passage de minuit), pas de secondes en calcul.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot.
// ⛔ 8 ans : phrases de 18 mots au plus, une idée par phrase.
//
// ⛔ UNE HEURE NE SE TAPE PAS EN TEXTE : le vérificateur lit « 7 h 15 » comme
// un PRODUIT. Les heures se répondent par la LETTRE d'un QCM, ou par un nombre
// seul dans une unité imposée (« en minutes », « le nombre d'heures »).
//
// Les pièges nommés : la petite aiguille presque sur le nombre suivant (1, 9),
// lire le nombre au lieu des minutes (2, 4), 1 h = 100 min (3, 11), 15 h = 5 h
// de l'après-midi (6), soustraire les heures à l'envers (5, 8), trois quarts
// = 34 (7), 1 h 30 = 130 min (10), 15 h 75 (13), mettre la petite aiguille sur
// le 6 pile (14), soustraire 11 − 8 = 3 h (15), 75 min plus court que 1 h 10
// (16), 6 h 70 min (17), compter le jour de départ (19), 7 + 3 × 4 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : sport (5, 16), marché (8), cinéma (12),
// cuisine (13), transports (15, 18), zoo (17), maison (19, la pendule),
// santé (20). Les métiers : maraîcher (8), pâtissier (13), infirmière (20).
// UN SEUL contexte réunionnais (18, une sortie au volcan, MODÈLE d'horaire).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · 1 jour = 24 h, 1 h = 60 min (Système international, BIPM).
//   · ex. 18 — le Piton de la Fournaise est le volcan actif de La Réunion
//     (Observatoire volcanologique du Piton de la Fournaise, IPGP) ; l'horaire
//     et la durée du trajet sont INVENTÉS.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : des horloges à aiguilles (`horloges`), la petite aiguille
// placée EXACTEMENT selon les minutes (à 2 h 50, presque sur le 3) ; un cadran
// sans aiguilles quand l'élève doit les placer. Jamais l'heure écrite sous une
// horloge à lire.
//
// Micro-compétences : ce2_duree_lire_heure (1, 2, 6, 9), ce2_duree_positionner_
// aiguilles (4, 14), ce2_duree_convertir (3, 6, 7, 10, 11, 15, 16),
// ce2_duree_calculer (5, 8, 12, 13, 15, 17, 20), ce2_duree_probleme (13, 17,
// 18, 19), ce2_duree_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/**
 * Des horloges à aiguilles côte à côte (repris de `maths-ce1-duree.tsx`). `h`
 * et `m` : la petite aiguille avance avec les minutes (à 2 h 50, presque sur
 * le 3). `vide` : le cadran seul, sans aiguilles (« place les aiguilles »).
 */
const horloges = (liste: { h: number; m: number; label?: string; vide?: boolean }[]) => {
  const [r, larg] = [48, 124];
  const point = (cx: number, cy: number, L: number, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + L * Math.sin(t), y: cy - L * Math.cos(t) };
  };
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `${liste.length * 8}rem` }}>
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
                  <text key={k} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={NOIR}>
                    {k + 1}
                  </text>
                );
              })}
              {c.vide ? null : (
                <>
                  <line x1={cx} y1={cy} x2={petite.x} y2={petite.y} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
                  <line x1={cx} y1={cy} x2={grande.x} y2={grande.y} stroke={BLEU} strokeWidth={2.6} strokeLinecap="round" />
                </>
              )}
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

export const exercicesDureeCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "duree",
  titre: "Le temps et les durées",
  accroche:
    "Vingt exercices, du plus simple au problème. Lire l'heure à 5 minutes près. Placer les aiguilles. 1 h = 60 min, 1 jour = 24 h. Calculer une durée en passant par l'heure pile. Un cours de judo, un film, un gâteau, un train, un zoo et une sortie au volcan. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris la lettre, un nombre ou un mot.",
      rappel: [
        "La petite aiguille montre les heures. La grande aiguille montre les minutes.",
        "Pour la grande aiguille, chaque nombre du cadran vaut 5 minutes : sur le 4, c'est 20 min.",
        "1 h = 60 min. 1 jour = 24 h. Après 12 h, c'est l'après-midi.",
      ],
      exercices: [
        {
          enonce: "Quelle heure est-il ? Écris la lettre.\na) Horloge 1 : A) 8 h 20 B) 4 h 40 C) 8 h 04\nb) Horloge 2 : A) 3 h 50 B) 2 h 50 C) 10 h 15",
          figure: horloges([
            { h: 8, m: 20, label: "Horloge 1" },
            { h: 2, m: 50, label: "Horloge 2" },
          ]),
          correction:
            "Je regarde d'abord la grande aiguille, puis la petite.\na) La grande aiguille est sur le 4 : $4 \\times 5 = 20$ minutes. La petite est entre le 8 et le 9. Il est 8 h 20. Réponse A.\nb) La grande aiguille est sur le 10 : $10 \\times 5 = 50$ minutes.\nLa petite est presque sur le 3, mais pas encore. Il est donc 2 heures passées : 2 h 50. Réponse B.\n⛔ Le piège du b) : lire 3 h 50. Tant que la petite aiguille n'a pas atteint le 3, il n'est pas 3 heures.\nRéponse : a) A ; b) B.",
          micros: ["ce2_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
          ],
        },
        {
          enonce: "Combien de minutes la grande aiguille montre-t-elle ? Écris le nombre.\na) Elle est sur le 7.\nb) Elle est sur le 11.",
          correction:
            "Pour la grande aiguille, chaque nombre du cadran vaut 5 minutes.\na) Sur le 7 : $7 \\times 5 = 35$ minutes.\nb) Sur le 11 : $11 \\times 5 = 55$ minutes.\n⛔ Le piège : répondre 7 ou 11. Le nombre du cadran n'est pas le nombre de minutes.\nRéponse : a) 35 ; b) 55.",
          micros: ["ce2_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "55" },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 h = … min\nb) 1 jour = … h\nc) 2 h = … min",
          correction:
            "J'utilise le rappel.\na) 1 h = 60 min.\nb) La petite aiguille fait deux tours par jour : $12 + 12 = 24$. 1 jour = 24 h.\nc) 2 h, c'est 1 h + 1 h : $60 + 60 = 120$ min.\n⛔ Le piège : croire que 1 h = 100 min, et répondre 200 au c). Une heure, c'est 60 minutes.\nRéponse : a) 60 ; b) 24 ; c) 120.",
          micros: ["ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "120" },
          ],
        },
        {
          enonce: "Il est 9 h 40. Je place les aiguilles.\na) La grande aiguille va sur le …\nb) La petite aiguille va : A) juste après le 9 B) pile sur le 10 C) près du 10",
          figure: horloges([{ h: 9, m: 40, vide: true }]),
          correction:
            "a) 40 minutes : je cherche combien de fois 5. $8 \\times 5 = 40$. La grande aiguille va sur le 8.\nb) Il est 9 h passées, et il manque 20 minutes pour 10 h.\nLa petite aiguille a fait plus de la moitié du chemin entre le 9 et le 10. Réponse C.\n⛔ Le piège du a) : mettre la grande aiguille sur le 4, parce que 40 commence par 4.\nRéponse : a) 8 ; b) C.",
          micros: ["ce2_duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          enonce: "Le cours de judo va de 17 h 10 à 17 h 55.\nCombien de minutes dure-t-il ?",
          figure: horloges([
            { h: 17, m: 10, label: "début" },
            { h: 17, m: 55, label: "fin" },
          ]),
          correction:
            "Les deux heures sont dans la même heure : 17 h.\nJe soustrais seulement les minutes : $55 - 10 = 45$.\nLe cours dure 45 minutes.\n⛔ Le piège : faire $10 - 55$, à l'envers. Je pars toujours de la fin, moins le début.\nRéponse : 45.",
          micros: ["ce2_duree_calculer"],
          reponses: [{ attendu: "45" }],
        },
        {
          enonce: "Vrai ou faux ?\na) 15 h, c'est 5 h de l'après-midi.\nb) 21 h, c'est 9 h du soir.\nc) 7 h du soir s'écrit aussi : A) 19 h B) 17 h C) 7 h",
          correction:
            "Après 12 h, j'ajoute 12 pour passer à l'écriture du soir.\na) $12 + 3 = 15$. 15 h, c'est 3 h de l'après-midi, pas 5 h. Faux.\nb) $12 + 9 = 21$. 21 h, c'est 9 h du soir. Vrai.\nc) 7 h du soir : $12 + 7 = 19$. C'est 19 h. Réponse A.\n⛔ Le piège du a) : lire le 5 de 15. Je retire 12, pas 10.\nRéponse : a) faux ; b) vrai ; c) A.",
          micros: ["ce2_duree_lire_heure", "ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce: "Complète en minutes. Écris seulement le nombre.\na) Une demi-heure = … min\nb) Un quart d'heure = … min\nc) Trois quarts d'heure = … min",
          correction:
            "Une heure, c'est 60 minutes.\na) La moitié de 60 : $30 + 30 = 60$. Une demi-heure = 30 min.\nb) Un quart de 60 : $15 + 15 + 15 + 15 = 60$. Un quart d'heure = 15 min.\nc) Trois quarts : $15 + 15 + 15 = 45$ min.\n⛔ Le piège du c) : répondre 34, en collant 3 et 4. Je compte trois fois un quart d'heure.\nRéponse : a) 30 ; b) 15 ; c) 45.",
          micros: ["ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "45" },
          ],
        },
        {
          enonce: "Le maraîcher vend ses légumes au marché de 8 h à 14 h.\nCombien d'heures reste-t-il au marché ?",
          correction:
            "Je compte les heures de 8 h à 14 h.\n$14 - 8 = 6$.\nJe vérifie en comptant sur mes doigts : 9, 10, 11, 12, 13, 14. Six bonds.\nIl reste 6 heures.\n⛔ Le piège : compter 8 h comme une heure de plus, et dire 7. Je compte les bonds.\nRéponse : 6.",
          micros: ["ce2_duree_calculer"],
          reponses: [{ attendu: ["6", "six"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je passe par l'heure pile.",
      rappel: [
        "La petite aiguille avance pendant l'heure. À 4 h 55, elle est presque sur le 5.",
        "Pour une durée, je vais jusqu'à l'heure pile, puis d'heure en heure, puis j'ajoute le reste.",
        "1 h 30 min = 60 min + 30 min = 90 min.",
      ],
      exercices: [
        {
          enonce: "Quelle heure est-il ? Écris la lettre.\na) Horloge 1 : A) 5 h 55 B) 4 h 55 C) 11 h 20\nb) Horloge 2 : A) 11 h 25 B) 5 h 55 C) 12 h 25",
          figure: horloges([
            { h: 4, m: 55, label: "Horloge 1" },
            { h: 11, m: 25, label: "Horloge 2" },
          ]),
          correction:
            "a) La grande aiguille est sur le 11 : $11 \\times 5 = 55$ minutes.\nLa petite est tout près du 5, mais pas dessus. Il est 4 heures passées : 4 h 55. Réponse B.\nb) La grande aiguille est sur le 5 : $5 \\times 5 = 25$ minutes.\nLa petite est entre le 11 et le 12. Il est 11 h 25. Réponse A.\n⛔ Le piège du a) : lire 5 h 55. Dans 5 minutes seulement, il sera 5 h.\nRéponse : a) B ; b) A.",
          micros: ["ce2_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce: "Change en minutes. Écris seulement le nombre.\na) 1 h 30 min = … min\nb) 2 h 15 min = … min",
          correction:
            "Je change d'abord les heures en minutes, puis j'ajoute les minutes.\na) 1 h = 60 min. $60 + 30 = 90$ min.\nb) 2 h = $60 + 60 = 120$ min. $120 + 15 = 135$ min.\n⛔ Le piège du a) : écrire 130, en collant 1 et 30. Une heure, c'est 60 minutes.\nRéponse : a) 90 ; b) 135.",
          micros: ["ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "135" },
          ],
        },
        {
          enonce: "Écris la lettre.\na) 90 min, c'est : A) 9 h B) 1 h 30 min C) 1 h 50 min\nb) 80 min, c'est : A) 1 h 20 min B) 8 h C) 1 h 80 min",
          correction:
            "Dans 1 h, il y a 60 min. Je retire 60 minutes, et je regarde ce qui reste.\na) $90 - 60 = 30$. 90 min, c'est 1 h et 30 min. Réponse B.\nb) $80 - 60 = 20$. 80 min, c'est 1 h et 20 min. Réponse A.\n⛔ Le piège du b) : choisir 1 h 80 min. Après 59 minutes, on passe à l'heure suivante.\nRéponse : a) B ; b) A.",
          micros: ["ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce: "Le film commence à 14 h 40. Il finit à 16 h 10.\nCombien de minutes dure-t-il ?",
          figure: horloges([
            { h: 14, m: 40, label: "début" },
            { h: 16, m: 10, label: "fin" },
          ]),
          correction:
            "Je passe par les heures piles.\nDe 14 h 40 à 15 h : 20 min.\nDe 15 h à 16 h : 1 h, soit 60 min.\nDe 16 h à 16 h 10 : 10 min.\nJ'additionne : $20 + 60 + 10 = 90$ min.\n⛔ Le piège : faire $40 - 10 = 30$ et dire 2 h 30. Les minutes de fin sont plus petites : je passe par l'heure pile.\nRéponse : 90.",
          micros: ["ce2_duree_calculer"],
          reponses: [{ attendu: "90" }],
        },
        {
          enonce: "Le pâtissier met un gâteau au four à 10 h 40.\nIl cuit 35 minutes.\nÀ quelle heure sort-il ? A) 11 h 15 B) 10 h 75 C) 11 h 25",
          correction:
            "Je coupe les 35 minutes en deux morceaux.\nDe 10 h 40 à 11 h : 20 min.\nIl reste $35 - 20 = 15$ min. De 11 h à 11 h 15.\nLe gâteau sort à 11 h 15. Réponse A.\n⛔ Le piège : écrire 10 h 75. Une heure n'a que 60 minutes.\nRéponse : A.",
          micros: ["ce2_duree_calculer", "ce2_duree_probleme"],
          reponses: [{ attendu: "A" }],
        },
        {
          enonce: "Il est 6 h 25. Je place les aiguilles.\na) La grande aiguille va sur le …\nb) La petite aiguille va entre le 6 et le …",
          figure: horloges([{ h: 6, m: 25, vide: true }]),
          correction:
            "a) 25 minutes : $5 \\times 5 = 25$. La grande aiguille va sur le 5.\nb) Il est 6 h passées, pas encore 7 h. La petite aiguille est entre le 6 et le 7, un peu avant le milieu.\n⛔ Le piège du b) : mettre la petite aiguille pile sur le 6. Elle avance pendant l'heure.\nRéponse : a) 5 ; b) 7.",
          micros: ["ce2_duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Le train part à 8 h 50. Il arrive à 11 h 05.\na) Combien de minutes dure le trajet ?\nb) C'est : A) 3 h 15 min B) 2 h 55 min C) 2 h 15 min",
          correction:
            "a) Je passe par les heures piles.\nDe 8 h 50 à 9 h : 10 min.\nDe 9 h à 11 h : 2 h, soit $60 + 60 = 120$ min.\nDe 11 h à 11 h 05 : 5 min.\n$10 + 120 + 5 = 135$ min.\nb) 135 min = 120 min + 15 min = 2 h 15 min. Réponse C.\n⛔ Le piège : faire $11 - 8 = 3$ et dire 3 h 15 min. Le train ne part pas à 8 h pile.\nRéponse : a) 135 ; b) C.",
          micros: ["ce2_duree_calculer", "ce2_duree_convertir"],
          reponses: [
            { question: "a)", attendu: "135" },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          enonce: "Au parc, Léo joue 1 h 10 min. Mia joue 75 min. Sami joue 65 min.\nQui a joué le plus longtemps ?",
          correction:
            "Je mets toutes les durées en minutes.\nLéo : 1 h 10 min = $60 + 10 = 70$ min.\nMia : 75 min. Sami : 65 min.\nJe compare : 75 > 70 > 65.\nC'est Mia qui a joué le plus longtemps.\n⛔ Le piège : croire que Léo a joué moins, parce que 10 est petit. Il a 1 h en plus.\nRéponse : Mia.",
          micros: ["ce2_duree_convertir"],
          reponses: [{ attendu: ["Mia"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je coupe la durée en morceaux faciles.",
      rappel: [
        "Je passe par l'heure pile : de 9 h 45 à 10 h, il y a 15 min.",
        "Ajouter une durée, c'est avancer sur l'horloge. Après 59 minutes vient l'heure suivante.",
        "Pour compter des jours, je compte les bonds, pas le jour de départ.",
      ],
      exercices: [
        {
          titre: "La journée au zoo",
          enonce: "La famille arrive au zoo à 9 h 45. Elle repart à 16 h 15.\na) Elle reste : A) 7 h 30 min B) 6 h 30 min C) 5 h 30 min\nb) Le pique-nique dure 45 min. Combien de minutes reste-t-il pour visiter ?",
          correction:
            "a) De 9 h 45 à 10 h : 15 min.\nDe 10 h à 16 h : $16 - 10 = 6$ h.\nDe 16 h à 16 h 15 : 15 min.\n$15 + 15 = 30$ min. Elle reste 6 h 30 min. Réponse B.\nb) Je change 6 h 30 min en minutes.\n6 h = $6 \\times 60 = 360$ min. $360 + 30 = 390$ min.\nJe retire le pique-nique : $390 - 45 = 345$ min.\n⛔ Le piège du a) : faire $16 - 9 = 7$ et choisir 7 h 30 min. La famille n'arrive pas à 9 h pile.\nRéponse : a) B ; b) 345.",
          micros: ["ce2_duree_probleme", "ce2_duree_defi", "ce2_duree_calculer"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "345" },
          ],
        },
        {
          titre: "La sortie au volcan",
          enonce: "Pour aller au Piton de la Fournaise, le car part de Saint-Pierre à 7 h 50.\nLe trajet dure 1 h 25 min.\na) Il arrive à : A) 8 h 75 B) 9 h 15 C) 9 h 25\nb) Il repart à 16 h 30. Le groupe est resté : A) 6 h 15 min B) 7 h 45 min C) 7 h 15 min",
          correction:
            "a) Je coupe 1 h 25 min en morceaux. De 7 h 50 à 8 h : 10 min.\nPuis 1 h de plus : de 8 h à 9 h.\nIl reste $25 - 10 = 15$ min. De 9 h à 9 h 15.\nLe car arrive à 9 h 15. Réponse B.\nb) De 9 h 15 à 16 h 15 : $16 - 9 = 7$ h.\nDe 16 h 15 à 16 h 30 : 15 min.\nLe groupe est resté 7 h 15 min. Réponse C.\n⛔ Le piège du a) : écrire 8 h 75. Une heure n'a que 60 minutes.\nRéponse : a) B ; b) C.",
          micros: ["ce2_duree_probleme", "ce2_duree_defi"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          titre: "La pendule de Papi",
          enonce: "La pendule de Papi avance de 5 minutes chaque jour.\nLundi à midi, elle est à l'heure.\na) Combien de minutes d'avance a-t-elle vendredi à midi ?\nb) Vendredi à midi, elle montre : A) 11 h 40 B) 12 h 05 C) 12 h 20",
          correction:
            "a) Je compte les bonds d'un midi à l'autre.\nMardi : 5 min. Mercredi : 10 min. Jeudi : 15 min. Vendredi : 20 min.\nC'est 4 bonds : $4 \\times 5 = 20$ min d'avance.\nb) Elle avance : elle montre plus que l'heure vraie.\n12 h + 20 min = 12 h 20. Réponse C.\n⛔ Le piège du a) : compter lundi, et dire 25 min. Lundi, elle est encore à l'heure.\nRéponse : a) 20 ; b) C.",
          micros: ["ce2_duree_defi", "ce2_duree_probleme"],
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          titre: "Le sirop de l'infirmière",
          enonce: "L'infirmière donne un sirop toutes les 4 heures. Le premier est à 7 h.\na) À quelle heure est le 3e sirop ? Écris seulement le nombre d'heures.\nb) Combien de sirops de 7 h à 23 h, les deux compris ?",
          correction:
            "J'écris la liste des heures, de 4 h en 4 h.\n1er : 7 h. 2e : $7 + 4 = 11$ h. 3e : $11 + 4 = 15$ h.\na) Le 3e sirop est à 15 h.\nb) Je continue : 4e : $15 + 4 = 19$ h. 5e : $19 + 4 = 23$ h.\nDe 7 h à 23 h, il y a 5 sirops.\n⛔ Le piège du a) : faire $7 + 3 \\times 4 = 19$. Du 1er au 3e sirop, il n'y a que 2 bonds.\nRéponse : a) 15 ; b) 5.",
          micros: ["ce2_duree_defi", "ce2_duree_calculer"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },
  ],
};
