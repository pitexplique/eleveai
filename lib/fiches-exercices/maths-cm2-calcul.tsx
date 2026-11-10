// ─── Fiche d'exercices : le calcul (CM2) — 20 exercices corrigés ──────────────
//
// 10/11/2026 : feuille NOUVELLE, sur la forme de `maths-6e-entier-calcul-mental.tsx`
// et des feuilles CM2 (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`, clé
// `cm2/calcul`) et sur les banques `calcul.bank.ts`, `calcul-rapide.bank.ts`,
// `calcul-mental-decimal.bank.ts`, `operations-decimales.bank.ts` : calcul
// mental, addition et soustraction posées, + et − de décimaux, priorités,
// moitiés et doubles, ÷ 4 et ÷ 8 par moitiés, × 5 et × 50, calcul rapide
// (× 11, × 25, ÷ 25, × 0,5, × 0,25), ordre de grandeur, défis.
// ⭐ LES 15 MICROS SONT COUVERTES, y compris les deux masquées en France
// (calcul_fois_11_25, calcul_fois_05_025 : Belgique, Sénégal, Côte d'Ivoire) :
// exercices 12, 13 et 20.
// ⛔ CM2 = AUCUNE question ouverte : nombres, QCM A/B/C (réponses A : 11 b),
// 11 c), 20 d) ; B : 9 c), 11 a), 14 a) ; C : 11 d), 18 c)), vrai/faux, oui/non.
// ⛔ Aucun exemple de la carte mentale n'est repris (47 + 38 ; 6 × 15 ;
// 468 + 357 ; 523 − 187 ; 12,5 + 3,75 ; 5 − 1,35 ; 5 + 3 × 4 ; 64 ÷ 8 ; 18 × 5 ;
// 14 × 11 ; 12 × 25 ; 40 × 0,5 ; 4,95 × 6 ; 25 × 7 × 4…).
//
// Les pièges nommés : ajouter 30 sans retirer 1 (1), la moitié de 21 prise
// pour 10 (2), doubler sans retenue (3), ÷ 8 avec deux moitiés seulement (4),
// oublier la moitié après × 10 (5), calculer de gauche à droite (6, 14, 20),
// oublier les retenues (7, 17), « grand moins petit » à chaque rang (8), des
// virgules mal alignées (9, 10, 18), un arrondi trop grossier (11), ÷ 25 fait
// « ÷ 100 puis ÷ 4 » (12), ÷ 0,5 qui rendrait plus petit (13), la moitié de 3
// œufs (15), calculer dans l'ordre écrit (16), ÷ 8 arrêté à deux moitiés (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : course à pied (9, coureuse), escalade (10,
// alpiniste), cinéma (14), pâtisserie (15, pâtissière), sortie au musée des
// sciences (17), marché (18, primeur), tournoi de football (19), jardin (20,
// maraîcher). Aucun contexte réunionnais sur cette feuille. Tout est un MODÈLE.
//
// ⭐ LES DESSINS : l'OPÉRATION POSÉE (un chiffre par colonne, la retenue en
// rouge au-dessus), sans `min-w`, moins de 150 px de large.
//
// Micro-compétences : calcul_mental (1, 14, 19), calcul_addition_posee (7,
// 17), calcul_soustraction_posee (8, 17), calcul_decimal_addition (9, 18),
// calcul_decimal_soustraction (10, 18), calcul_priorite (6, 14, 20),
// calcul_moitie_impair (2, 15), calcul_double_decimal (3, 15),
// calcul_moitie_decimal (3, 15), calcul_diviser_4_8 (4, 19),
// calcul_multiplier_50 (5, 19), calcul_fois_11_25 (12, 20),
// calcul_fois_05_025 (13, 20), calcul_ordre_grandeur (11, 17, 18),
// calcul_defi (16). 15/15.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/**
 * UNE OPÉRATION POSÉE : un chiffre par colonne, alignés à droite (la virgule
 * a sa colonne). `retenues` : une chaîne de la même largeur que la plus longue
 * ligne, un espace là où il n'y a rien. Écrite en clair : `pose(["2586",
 * "1947"], "+", "4533", "111 ")`.
 */
const pose = (lignes: string[], signe: string, resultat: string, retenues = "") => {
  const largeur = Math.max(...[...lignes, resultat, retenues].map((l) => l.length));
  const ligne = (l: string, cls: string, gauche = "") => (
    <div className="flex">
      <span className="w-5 text-center font-bold text-blue-700">{gauche}</span>
      {l
        .padStart(largeur, " ")
        .split("")
        .map((c, i) => (
          <span key={i} className={`w-4 text-center ${cls}`}>
            {c === " " ? " " : c}
          </span>
        ))}
    </div>
  );
  return (
    <div className="mx-auto w-fit rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-lg leading-tight text-slate-900">
      {retenues.trim() ? ligne(retenues, "text-sm font-bold text-red-600") : null}
      {lignes.map((l, i) => (
        <div key={i}>{ligne(l, "", i === lignes.length - 1 ? signe : "")}</div>
      ))}
      <div className="ml-5 border-t-2 border-slate-800" />
      {ligne(resultat, "font-bold text-blue-700")}
    </div>
  );
};

export const exercicesCalculCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "calcul",
  titre: "Le calcul",
  accroche:
    "Vingt exercices, du geste seul au problème. Calculer de tête. Poser une addition, une soustraction. Ajouter et soustraire des nombres à virgule. Respecter les priorités. Prendre la moitié, le double, diviser par 4 ou par 8. Multiplier par 5, 50, 11 ou 25. Estimer un résultat. Une course à pied, une corde d'escalade, le cinéma, une recette, une sortie au musée, le marché, un tournoi de foot et un potager. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/calcul", titre: "Le calcul" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche d'abord le chemin le plus facile.",
      rappel: [
        "Je découpe un nombre en morceaux faciles : 29 = 30 − 1.",
        "La moitié d'un nombre impair se termine par ,5 : la moitié de 9 est 4,5.",
        "D'abord les × et les ÷, puis les + et les −. Les parenthèses passent avant tout.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête.\na) 64 + 29\nb) 83 − 19\nc) 7 × 16\nd) 250 + 375",
          reponses: [
            { question: "a)", attendu: "93" },
            { question: "b)", attendu: "64" },
            { question: "c)", attendu: "112" },
            { question: "d)", attendu: "625" },
          ],
          correction:
            "Je découpe en morceaux faciles.\na) 29 = 30 − 1. 64 + 30 = 94, puis 94 − 1 = 93.\nb) 19 = 20 − 1. 83 − 20 = 63, puis j'ai enlevé 1 de trop : 63 + 1 = 64.\nc) 16 = 10 + 6. 7 × 10 = 70 et 7 × 6 = 42. 70 + 42 = 112.\nd) 375 = 300 + 75. 250 + 300 = 550, puis 550 + 75 = 625.\n⛔ Le piège du a) : ajouter 30 et oublier de retirer 1. On trouverait 94 au lieu de 93.\nRéponse : a) 93 ; b) 64 ; c) 112 ; d) 625.",
          micros: ["calcul_mental"],
        },
        {
          enonce: "Donne la moitié de chaque nombre.\na) 9\nb) 21\nc) 47\nd) 105",
          reponses: [
            { question: "a)", attendu: "4,5" },
            { question: "b)", attendu: "10,5" },
            { question: "c)", attendu: "23,5" },
            { question: "d)", attendu: "52,5" },
          ],
          correction:
            "Un nombre impair, c'est un nombre pair + 1. Je prends la moitié du nombre pair, puis la moitié de 1, qui est 0,5.\na) 9 = 8 + 1. Moitié de 8 : 4. Plus 0,5 : 4,5.\nb) 21 = 20 + 1. Moitié de 20 : 10. Plus 0,5 : 10,5.\nc) 47 = 46 + 1. Moitié de 46 : 23. Plus 0,5 : 23,5.\nd) 105 = 104 + 1. Moitié de 104 : 52. Plus 0,5 : 52,5.\n⛔ Le piège : répondre 10 pour la moitié de 21. 10 + 10 = 20, il manque 1. La moitié de 21 est 10,5.\nRéponse : a) 4,5 ; b) 10,5 ; c) 23,5 ; d) 52,5.",
          micros: ["calcul_moitie_impair"],
        },
        {
          enonce: "a) Le double de 2,7\nb) Le double de 6,45\nc) La moitié de 6,8\nd) La moitié de 7,6",
          reponses: [
            { question: "a)", attendu: "5,4" },
            { question: "b)", attendu: "12,9" },
            { question: "c)", attendu: "3,4" },
            { question: "d)", attendu: "3,8" },
          ],
          correction:
            "Je coupe le nombre en deux morceaux : la partie entière et la partie après la virgule.\na) Double de 2 : 4. Double de 0,7 : 1,4. 4 + 1,4 = 5,4.\nb) Double de 6 : 12. Double de 0,45 : 0,9. 12 + 0,9 = 12,9.\nc) Moitié de 6 : 3. Moitié de 0,8 : 0,4. 3 + 0,4 = 3,4.\nd) Moitié de 7 : 3,5. Moitié de 0,6 : 0,3. 3,5 + 0,3 = 3,8.\n⛔ Le piège du a) : écrire 4,14. Le double de 7 dixièmes, c'est 14 dixièmes, donc 1 unité et 4 dixièmes.\nRéponse : a) 5,4 ; b) 12,9 ; c) 3,4 ; d) 3,8.",
          micros: ["calcul_double_decimal", "calcul_moitie_decimal"],
        },
        {
          enonce: "Calcule en prenant des moitiés.\na) 48 ÷ 4\nb) 72 ÷ 8\nc) 120 ÷ 8\nd) 92 ÷ 4",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: "23" },
          ],
          correction:
            "÷ 4, c'est prendre la moitié, puis encore la moitié (2 moitiés).\n÷ 8, c'est prendre 3 moitiés de suite.\na) 48 → 24 → 12. Donc 48 ÷ 4 = 12.\nb) 72 → 36 → 18 → 9. Donc 72 ÷ 8 = 9.\nc) 120 → 60 → 30 → 15. Donc 120 ÷ 8 = 15.\nd) 92 → 46 → 23. Donc 92 ÷ 4 = 23.\n⛔ Le piège : pour ÷ 8, s'arrêter après 2 moitiés. 72 → 36 → 18, ce n'est pas fini : il faut 9.\nRéponse : a) 12 ; b) 9 ; c) 15 ; d) 23.",
          micros: ["calcul_diviser_4_8"],
        },
        {
          enonce: "Calcule.\na) 14 × 5\nb) 26 × 5\nc) 12 × 50\nd) 36 × 50",
          reponses: [
            { question: "a)", attendu: "70" },
            { question: "b)", attendu: "130" },
            { question: "c)", attendu: "600" },
            { question: "d)", attendu: "1800" },
          ],
          correction:
            "5, c'est la moitié de 10. Donc × 5, c'est × 10 puis la moitié.\n50, c'est la moitié de 100. Donc × 50, c'est × 100 puis la moitié.\na) 14 × 10 = 140. Moitié : 70.\nb) 26 × 10 = 260. Moitié : 130.\nc) 12 × 100 = 1 200. Moitié : 600.\nd) 36 × 100 = 3 600. Moitié : 1 800.\n⛔ Le piège : oublier la moitié. 14 × 5 ne fait pas 140 : 140, c'est 14 × 10.\nRéponse : a) 70 ; b) 130 ; c) 600 ; d) 1 800.",
          micros: ["calcul_multiplier_50"],
        },
        {
          enonce: "Calcule en respectant les priorités.\na) 4 + 6 × 3\nb) 20 − 12 ÷ 4\nc) (4 + 6) × 3\nd) 2 × 7 + 3 × 4",
          reponses: [
            { question: "a)", attendu: "22" },
            { question: "b)", attendu: "17" },
            { question: "c)", attendu: "30" },
            { question: "d)", attendu: "26" },
          ],
          correction:
            "D'abord les parenthèses. Puis les × et les ÷. Enfin les + et les −.\na) Je fais d'abord 6 × 3 = 18. Puis 4 + 18 = 22.\nb) Je fais d'abord 12 ÷ 4 = 3. Puis 20 − 3 = 17.\nc) Les parenthèses d'abord : 4 + 6 = 10. Puis 10 × 3 = 30.\nd) Les deux × d'abord : 2 × 7 = 14 et 3 × 4 = 12. Puis 14 + 12 = 26.\n⛔ Le piège du a) : calculer de gauche à droite, 4 + 6 = 10 puis 10 × 3 = 30. Sans parenthèses, le × passe avant le +.\nRéponse : a) 22 ; b) 17 ; c) 30 ; d) 26.",
          micros: ["calcul_priorite"],
        },
        {
          enonce: "Pose et calcule.\na) 2 586 + 1 947\nb) 708 + 3 495",
          reponses: [
            { question: "a)", attendu: "4533" },
            { question: "b)", attendu: "4203" },
          ],
          correction:
            "J'aligne unités sous unités. Je calcule de droite à gauche. Quand j'arrive à 10 ou plus, j'écris les unités et je retiens 1.\na) Unités : 6 + 7 = 13. J'écris 3, je retiens 1.\nDizaines : 8 + 4 + 1 = 13. J'écris 3, je retiens 1.\nCentaines : 5 + 9 + 1 = 15. J'écris 5, je retiens 1.\nMilliers : 2 + 1 + 1 = 4. Total : 4 533.\nb) 8 + 5 = 13 : j'écris 3, je retiens 1. 0 + 9 + 1 = 10 : j'écris 0, je retiens 1. 7 + 4 + 1 = 12 : j'écris 2, je retiens 1. 3 + 1 = 4. Total : 4 203.\n⛔ Le piège : oublier les retenues. Sans elles, le a) donnerait 3 423.\nRéponse : a) 4 533 ; b) 4 203.",
          schema: pose(["2586", "1947"], "+", "4533", "111 "),
          micros: ["calcul_addition_posee"],
        },
        {
          enonce: "Pose et calcule.\na) 6 032 − 2 457\nb) 905 − 368",
          reponses: [
            { question: "a)", attendu: "3575" },
            { question: "b)", attendu: "537" },
          ],
          correction:
            "J'aligne les chiffres. Je calcule de droite à gauche. Si le chiffre du haut est trop petit, j'ajoute 10 en haut et 1 au chiffre suivant du bas : c'est la retenue.\na) Unités : 2 < 7. 12 − 7 = 5. Je retiens 1 : 5 + 1 = 6 dizaines en bas.\nDizaines : 3 < 6. 13 − 6 = 7. Je retiens 1 : 4 + 1 = 5 centaines en bas.\nCentaines : 0 < 5. 10 − 5 = 5. Je retiens 1 : 2 + 1 = 3 milliers en bas.\nMilliers : 6 − 3 = 3. Résultat : 3 575.\nb) 15 − 8 = 7 ; 10 − 7 = 3 (car 6 + 1 = 7) ; 9 − 4 = 5 (car 3 + 1 = 4). Résultat : 537.\n⭐ Je vérifie par une addition : 3 575 + 2 457 = 6 032.\n⛔ Le piège : faire « grand moins petit » à chaque rang. Pour les unités du a), on ferait 7 − 2 = 5 sans retenue, et tout serait faux.\nRéponse : a) 3 575 ; b) 537.",
          schema: pose(["6032", "2457"], "−", "3575"),
          micros: ["calcul_soustraction_posee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs calculs. J'aligne les virgules et j'estime avant de calculer.",
      rappel: [
        "Pour + et − de décimaux : j'aligne les virgules, je complète avec des zéros : 6,8 = 6,80.",
        "Estimer : j'arrondis chaque nombre à un nombre rond, puis je calcule vite.",
        "× 11 = × 10 puis + le nombre. × 25 = × 100 puis ÷ 4. × 0,5 = la moitié. ÷ 0,5 = le double.",
      ],
      exercices: [
        {
          enonce: "Inès est coureuse. Elle court 4,75 km lundi, 6,8 km mercredi et 12 km samedi.\na) Combien de km lundi et mercredi ensemble ?\nb) Combien de km dans la semaine ?\nc) Combien fait 3,6 + 1,45 ?\nA : 4,51 ; B : 5,05 ; C : 1,81",
          reponses: [
            { question: "a)", attendu: "11,55" },
            { question: "b)", attendu: "23,55" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "J'aligne les virgules et je complète avec des zéros.\na) 4,75 + 6,80 : 5 + 0 = 5 centièmes ; 7 + 8 = 15 dixièmes, j'écris 5 et je retiens 1 ; 4 + 6 + 1 = 11. Total : 11,55 km.\nb) 11,55 + 12,00 = 23,55 km.\nc) 3,60 + 1,45 : 0 + 5 = 5 ; 6 + 4 = 10, j'écris 0 et je retiens 1 ; 3 + 1 + 1 = 5. Total : 5,05. Choix B.\n⛔ Le piège du c) : coller 3,6 sous 1,45 sans aligner les virgules. On trouve 4,51, un nombre faux.\nRéponse : a) 11,55 km ; b) 23,55 km ; c) B.",
          schema: pose(["4,75", "6,80"], "+", "11,55", "1   "),
          micros: ["calcul_decimal_addition"],
        },
        {
          enonce: "a) Léo est alpiniste. Sa corde mesure 10 m. Il en coupe 3,65 m. Quelle longueur reste-t-il ?\nb) Calcule 8,2 − 5,75.\nc) Calcule 20 − 0,6.",
          reponses: [
            { question: "a)", attendu: "6,35" },
            { question: "b)", attendu: "2,45" },
            { question: "c)", attendu: "19,4" },
          ],
          correction:
            "J'aligne les virgules. Je mets des zéros pour avoir autant de chiffres après la virgule.\na) 10,00 − 3,65. Centièmes : 0 < 5, donc 10 − 5 = 5, et je retiens 1 : 6 + 1 = 7 dixièmes en bas.\nDixièmes : 0 < 7, donc 10 − 7 = 3, et je retiens 1 : 3 + 1 = 4 unités en bas.\nUnités et dizaines : 10 − 4 = 6. Il reste 6,35 m.\nJe vérifie : 6,35 + 3,65 = 10.\nb) 8,20 − 5,75 = 2,45. Je vérifie : 2,45 + 5,75 = 8,20.\nc) 20,0 − 0,6 = 19,4. Je vérifie : 19,4 + 0,6 = 20.\n⛔ Le piège du a) : oublier les zéros et faire 10 − 3 = 7, puis garder 0,65. On trouverait 7,65.\nRéponse : a) 6,35 m ; b) 2,45 ; c) 19,4.",
          schema: pose(["10,00", "3,65"], "−", "6,35"),
          micros: ["calcul_decimal_soustraction"],
        },
        {
          enonce: "Choisis le bon ordre de grandeur.\na) 49 × 21 est proche de :\nA : 100 ; B : 1 000 ; C : 10 000\nb) 398 + 512 est proche de :\nA : 900 ; B : 9 000 ; C : 90\nc) 6 cahiers à 2,95 € coûtent environ :\nA : 18 € ; B : 12 € ; C : 24 €\nd) 4 012 − 1 989 est proche de :\nA : 6 000 ; B : 3 000 ; C : 2 000",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "C" },
          ],
          correction:
            "J'arrondis chaque nombre à un nombre rond, puis je calcule de tête.\na) 49 est proche de 50, 21 est proche de 20. 50 × 20 = 1 000. Choix B.\nb) 398 est proche de 400, 512 est proche de 500. 400 + 500 = 900. Choix A.\nc) 2,95 € est proche de 3 €. 6 × 3 = 18 €. Choix A.\nd) 4 012 est proche de 4 000, 1 989 est proche de 2 000. 4 000 − 2 000 = 2 000. Choix C.\n⛔ Le piège du c) : arrondir 2,95 à 2. Il est tout près de 3 : il manque seulement 5 centimes.\nRéponse : a) B ; b) A ; c) A ; d) C.",
          micros: ["calcul_ordre_grandeur"],
        },
        {
          enonce: "Calcule astucieusement.\na) 23 × 11\nb) 16 × 25\nc) 500 ÷ 25\nd) 45 × 11",
          reponses: [
            { question: "a)", attendu: "253" },
            { question: "b)", attendu: "400" },
            { question: "c)", attendu: "20" },
            { question: "d)", attendu: "495" },
          ],
          correction:
            "11 = 10 + 1. Donc × 11, c'est × 10, puis j'ajoute le nombre.\n25, c'est 100 ÷ 4. Donc × 25, c'est × 100 puis ÷ 4. Et ÷ 25, c'est ÷ 100 puis × 4.\na) 23 × 10 = 230. 230 + 23 = 253.\nb) 16 × 100 = 1 600. 1 600 ÷ 4 = 400.\nc) 500 ÷ 100 = 5. 5 × 4 = 20.\nd) 45 × 10 = 450. 450 + 45 = 495.\n⛔ Le piège du c) : faire ÷ 100 puis ÷ 4. Dans 500, il y a 5 centaines, et dans chaque centaine, 4 fois 25 : 5 × 4 = 20.\nRéponse : a) 253 ; b) 400 ; c) 20 ; d) 495.",
          micros: ["calcul_fois_11_25"],
        },
        {
          enonce: "Calcule.\na) 60 × 0,5\nb) 80 × 0,25\nc) 7 ÷ 0,5\nd) 9 ÷ 0,25",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "14" },
            { question: "d)", attendu: "36" },
          ],
          correction:
            "0,5, c'est une moitié. 0,25, c'est un quart.\na) × 0,5, c'est prendre la moitié : 60 → 30.\nb) × 0,25, c'est prendre le quart : 80 → 40 → 20.\nc) ÷ 0,5, c'est chercher combien de moitiés dans 7. Il y a 2 moitiés dans 1, donc 7 × 2 = 14.\nd) ÷ 0,25, c'est chercher combien de quarts dans 9. Il y a 4 quarts dans 1, donc 9 × 4 = 36.\n⛔ Le piège du c) : répondre 3,5. Diviser par 0,5 rend le nombre plus GRAND : dans 7 gâteaux, il y a 14 demi-gâteaux.\nRéponse : a) 30 ; b) 20 ; c) 14 ; d) 36.",
          micros: ["calcul_fois_05_025"],
        },
        {
          enonce: "Au cinéma, Nour achète 3 places à 8 € et un pot de pop-corn à 5 €.\na) Quel calcul donne le prix total ?\nA : 3 + 8 × 5 ; B : 3 × 8 + 5 ; C : 3 × (8 + 5)\nb) Combien Nour paie-t-elle ?\nc) Calcule 3 × (8 + 5).\nd) Vrai ou faux : 3 × 8 + 5 et 3 × (8 + 5) donnent le même résultat.",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "29" },
            { question: "c)", attendu: "39" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) 3 places à 8 € : 3 × 8. Puis j'ajoute un seul pop-corn : + 5. Le calcul est 3 × 8 + 5. Choix B.\nb) Le × d'abord : 3 × 8 = 24. Puis 24 + 5 = 29 €.\nc) Les parenthèses d'abord : 8 + 5 = 13. Puis 3 × 13 = 39. Ce calcul compterait 3 pop-corns.\nd) 29 et 39 ne sont pas égaux : c'est faux. Les parenthèses changent le résultat.\n⛔ Le piège : calculer 3 × 8 + 5 de gauche à droite ou avec des parenthèses en trop. Ici, le pop-corn n'est acheté qu'une fois.\nRéponse : a) B ; b) 29 € ; c) 39 ; d) faux.",
          micros: ["calcul_priorite", "calcul_mental"],
        },
        {
          enonce: "Lou est pâtissière. Sa recette pour 8 personnes : 250 g de farine, 0,75 L de lait, 3 œufs, 45 g de beurre.\na) Pour 16 personnes, combien de litres de lait ?\nb) Pour 4 personnes, combien de grammes de farine ?\nc) Pour 4 personnes, combien d'œufs ?\nd) Pour 4 personnes, combien de grammes de beurre ?",
          reponses: [
            { question: "a)", attendu: "1,5", unite: "l" },
            { question: "b)", attendu: "125", unite: "g" },
            { question: "c)", attendu: "1,5" },
            { question: "d)", attendu: "22,5", unite: "g" },
          ],
          correction:
            "16 personnes, c'est le double de 8 : je double. 4 personnes, c'est la moitié de 8 : je prends la moitié.\na) Double de 0,75 : 0,75 + 0,75 = 1,5 L de lait.\nb) Moitié de 250 : moitié de 200 = 100, moitié de 50 = 25. 100 + 25 = 125 g de farine.\nc) Moitié de 3 : 3 est impair, 3 = 2 + 1. Moitié : 1 + 0,5 = 1,5 œuf, un œuf et demi.\nd) Moitié de 45 : 45 = 44 + 1. Moitié : 22 + 0,5 = 22,5 g de beurre.\n⛔ Le piège du c) : répondre 1 œuf. La moitié de 3, ce n'est ni 1 ni 2 : c'est 1,5.\nRéponse : a) 1,5 L ; b) 125 g ; c) 1,5 œuf ; d) 22,5 g.",
          micros: ["calcul_double_decimal", "calcul_moitie_impair", "calcul_moitie_decimal"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs calculs. J'estime d'abord, puis je calcule, puis je vérifie.",
      rappel: [
        "Avec seulement des × (ou seulement des +), je peux changer l'ordre des nombres : 25 × 4 = 100 d'abord.",
        "J'estime le résultat avant de poser : ça m'aide à repérer une erreur.",
        "Je réponds à la question posée, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Le chemin le plus malin",
          enonce: "Calcule de tête, en changeant l'ordre si ça aide.\na) 25 × 9 × 4\nb) 5 × 37 × 2\nc) 48 + 27 + 52\nd) 125 × 8",
          reponses: [
            { question: "a)", attendu: "900" },
            { question: "b)", attendu: "370" },
            { question: "c)", attendu: "127" },
            { question: "d)", attendu: "1000" },
          ],
          correction:
            "Je cherche les nombres qui vont bien ensemble.\na) 25 × 4 = 100. Puis 100 × 9 = 900.\nb) 5 × 2 = 10. Puis 10 × 37 = 370.\nc) 48 + 52 = 100. Puis 100 + 27 = 127.\nd) 8 = 2 × 2 × 2. 125 × 2 = 250 ; 250 × 2 = 500 ; 500 × 2 = 1 000.\n⛔ Le piège : calculer dans l'ordre écrit. 25 × 9 = 225, puis 225 × 4 : c'est long et on se trompe facilement.\nRéponse : a) 900 ; b) 370 ; c) 127 ; d) 1 000.",
          micros: ["calcul_defi"],
        },
        {
          titre: "La sortie au musée des sciences",
          enonce: "Pour une sortie, l'école paie le car 1 285 €, les entrées 846 € et le goûter 179 €. Le budget est de 2 500 €.\na) Estime le total en arrondissant chaque prix à la centaine.\nb) Pose et calcule le total exact.\nc) Combien reste-t-il du budget ?\nd) Le budget suffit-il ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "2300" },
            { question: "b)", attendu: "2310" },
            { question: "c)", attendu: "190" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) 1 285 est proche de 1 300 ; 846 de 800 ; 179 de 200. 1 300 + 800 + 200 = 2 300 €.\nb) J'aligne les unités. Unités : 5 + 6 + 9 = 20, j'écris 0, je retiens 2.\nDizaines : 8 + 4 + 7 + 2 = 21, j'écris 1, je retiens 2.\nCentaines : 2 + 8 + 1 + 2 = 13, j'écris 3, je retiens 1.\nMilliers : 1 + 1 = 2. Total : 2 310 €. C'est proche de mon estimation, 2 300.\nc) 2 500 − 2 310 = 190 €.\nd) Il reste de l'argent : oui, le budget suffit.\n⛔ Le piège du b) : retenir seulement 1 quand la colonne fait 20 ou 21. Ici, je retiens 2.\nRéponse : a) 2 300 € ; b) 2 310 € ; c) 190 € ; d) oui.",
          schema: pose(["1285", "846", "179"], "+", "2310", "122 "),
          micros: ["calcul_addition_posee", "calcul_soustraction_posee", "calcul_ordre_grandeur"],
        },
        {
          titre: "Chez le primeur",
          enonce: "Chez Sami, le primeur, Jade achète un melon à 2,85 €, des cerises à 4,6 € et un pain à 1,15 €. Elle paie avec un billet de 10 €.\na) Combien coûtent ses achats ?\nb) Combien Sami lui rend-il ?\nc) Quelle estimation du total est la bonne ?\nA : environ 12 € ; B : environ 6 € ; C : environ 9 €",
          reponses: [
            { question: "a)", attendu: "8,6" },
            { question: "b)", attendu: "1,4" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "a) J'aligne les virgules : 2,85 + 4,60 + 1,15.\nCentièmes : 5 + 0 + 5 = 10, j'écris 0, je retiens 1. Dixièmes : 8 + 6 + 1 + 1 = 16, j'écris 6, je retiens 1. Unités : 2 + 4 + 1 + 1 = 8. Total : 8,60 €, soit 8,6 €.\nb) 10,00 − 8,60 = 1,40 €. Sami rend 1,4 €. Je vérifie : 8,6 + 1,4 = 10.\nc) 2,85 ≈ 3 ; 4,6 ≈ 5 ; 1,15 ≈ 1. 3 + 5 + 1 = 9 €. Choix C.\n⛔ Le piège du a) : écrire 4,6 sous les centièmes de 2,85. J'aligne les virgules et j'écris 4,60.\nRéponse : a) 8,6 € ; b) 1,4 € ; c) C.",
          schema: pose(["2,85", "4,60", "1,15"], "+", "8,60", "1 1 "),
          micros: ["calcul_decimal_addition", "calcul_decimal_soustraction", "calcul_ordre_grandeur"],
        },
        {
          titre: "Le tournoi de football",
          enonce: "96 joueurs s'inscrivent à un tournoi de football.\na) On fait des équipes de 8 joueurs. Combien d'équipes ?\nb) On range les équipes en poules de 4 équipes. Combien de poules ?\nc) Chaque joueur paie 5 €. Combien d'argent en tout ?\nd) On prévoit 1 ballon pour 4 joueurs. Combien de ballons ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "480" },
            { question: "d)", attendu: "24" },
          ],
          correction:
            "a) 96 ÷ 8 : 3 moitiés de suite. 96 → 48 → 24 → 12. Il y a 12 équipes.\nb) 12 ÷ 4 : 2 moitiés. 12 → 6 → 3. Il y a 3 poules.\nc) 96 × 5 : × 10 puis la moitié. 96 × 10 = 960, moitié : 480 €.\nd) 96 ÷ 4 : 96 → 48 → 24. Il faut 24 ballons.\n⛔ Le piège du a) : s'arrêter à 24 après 2 moitiés. 24, c'est 96 ÷ 4 : pour ÷ 8, il faut une moitié de plus.\nRéponse : a) 12 équipes ; b) 3 poules ; c) 480 € ; d) 24 ballons.",
          micros: ["calcul_diviser_4_8", "calcul_multiplier_50", "calcul_mental"],
        },
        {
          titre: "Le potager",
          enonce: "Malik est maraîcher. Il plante 25 rangées de 12 salades et 11 rangées de 18 radis.\na) Combien de salades plante-t-il ?\nb) Il vend chaque salade 0,5 €. Combien gagne-t-il pour toutes les salades ?\nc) Combien de radis plante-t-il ?\nd) Avec cet argent, il achète 2 sacs de terreau à 10 €. Quel calcul donne ce qui lui reste ?\nA : 150 − 2 × 10 ; B : (150 − 2) × 10 ; C : 150 × 2 − 10\ne) Combien lui reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: "198" },
            { question: "d)", attendu: "A" },
            { question: "e)", attendu: "130" },
          ],
          correction:
            "a) 25 × 12 : × 100 puis ÷ 4. 12 × 100 = 1 200 ; 1 200 ÷ 4 = 300 salades.\nb) 300 × 0,5 : c'est la moitié de 300. Il gagne 150 €.\nc) 11 × 18 : × 10 puis + le nombre. 18 × 10 = 180 ; 180 + 18 = 198 radis.\nd) 2 sacs à 10 € : 2 × 10. Je l'enlève à 150 : 150 − 2 × 10. Choix A.\ne) Le × d'abord : 2 × 10 = 20. Puis 150 − 20 = 130 €.\n⛔ Le piège du e) : calculer de gauche à droite, 150 − 2 = 148, puis 148 × 10. Le × passe avant le −.\nRéponse : a) 300 ; b) 150 € ; c) 198 ; d) A ; e) 130 €.",
          micros: ["calcul_fois_11_25", "calcul_fois_05_025", "calcul_priorite"],
        },
      ],
    },
  ],
};
