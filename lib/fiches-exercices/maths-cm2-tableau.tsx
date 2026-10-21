// ─── Fiche d'exercices : lire, compléter et interpréter un tableau (CM2) ───────
//
// 21/10/2026 : une des PREMIÈRES feuilles d'exercices de maths du CM, sur le
// modèle de `maths-6e-stat-donnee.tsx` (aides de dessin locales, sans largeur
// minimale, mesurées pour 375 px). 20 exercices : 8 ★, 8 ★★, 4 ★★★.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-tableaux.tsx` (« Lire un
// tableau ») et sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// tableaux.bank.ts`, notionId tableau : lire une case d'un tableau à double
// entrée (et la lecture inverse : où est ce nombre ?), compléter (placer une
// information, la case manquante par le total d'une ligne ou d'une colonne,
// « de plus », « de moins », les cases total), interpréter (le plus, le moins,
// l'écart, vrai ou faux), défis (total général vérifié de deux façons, la plus
// grande case n'est pas le meilleur total, deux inconnues, un objectif).
// ⛔ LIMITES DU CM2, lues dans la banque : des nombres entiers, ni moyenne ni
// pourcentage, pas de nombre négatif. Additions, soustractions, « deux fois ».
// ⛔ Aucun exemple de la fiche de cours (fruits du marché : ananas 18 / 24 /
// 20, bananes 30 / 28 / 35, mangues 12 / 15 / 18, lundi à mercredi, totaux 62,
// 93, 45, colonne du mercredi 73).
// ⭐ Des élèves qui lisent difficilement : phrases de 10 mots en moyenne, une
// idée par phrase, du texte simple (pas de KaTeX), « − » (U+2212) pour la
// soustraction, « × » pour la multiplication, l'espace fine insécable des
// milliers (1 240).
//
// Les pièges nommés : la bonne ligne mais la colonne d'à côté (1), la ligne
// voisine (2, 13), recopier dans l'ordre de la phrase (3, 10), enlever une
// seule case du total (4), lire une ligne au lieu de la colonne (5),
// additionner pour un écart (6), oublier une ligne dans un total (7), un nombre
// lu sans sa ligne ni sa colonne (8), comparer une seule colonne au lieu du
// total (9, 15), compter les jours gagnés au lieu des totaux (10), calculer un
// total avant de connaître ses cases (11), la plus grande case prise pour le
// meilleur total (12), l'écart pris pour la valeur (14), les manches gagnées
// prises pour le total (16), un classement qui dépend de sa règle (17), la
// ligne à deux trous (18), croire un total parce qu'il est écrit (19), comparer
// à un seul bâtiment au lieu des deux réunis (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cinéma (1), transports (2), sciences de la
// vie (3, germination), culture (4, quiz), météo (5), nature (6, oiseaux du
// jardin), écologie (7, recyclage), cuisine (8), histoire (9, château fort),
// cantine (10), lecture (11), fête de l'école (12), volcan de La Réunion (13,
// le seul décor d'ici), fleuriste (14), musique (15), jeux (16), sport (17),
// refuge pour animaux (18), bibliothèque (19), énergie solaire (20).
// Les métiers : cuisinier (10), guide de montagne (13), fleuriste (14),
// journaliste sportive (17), vétérinaire (18), bibliothécaire (19),
// technicien des panneaux solaires (20).
//
// ⭐ UN FAIT RÉEL, et sa source :
//   · ex. 17 — les médailles des Jeux olympiques de Paris 2024 (tableau
//     officiel des médailles, CIO / Paris 2024) : Japon 20 or, 12 argent,
//     13 bronze (45) ; Australie 18, 19, 16 (53) ; France 16, 26, 22 (64) ;
//     Grande-Bretagne, écrite « Royaume-Uni », 14, 22, 29 (65). Le classement
//     officiel, à l'or, les range 3e, 4e, 5e et 7e.
// Tout le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS : une aide locale, `grille` (tableau HTML, cinq colonnes au
// plus, mots courts : le script mesure qu'il tient dans 240 px sans défiler).
// Elle surligne des cases (`cases`, la case trouvée du corrigé) et met en gras
// la dernière ligne (`total`). Une case « ? » est une case à trouver.
// 14 dessins imprimés ; les schémas du corrigé (la case trouvée, le tableau
// complété) sont `ecranSeulement`, et les données sont alors dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je lis », « je pose le
// doigt »), étape par étape, avec le pourquoi et le piège nommé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm2-tableau.mjs` —
// chaque case relue dans le tableau ou l'énoncé, chaque total, écart, case
// manquante et classement refait.
//
// Micro-compétences : tableau_lire (1, 2, 8, 9, 13, 17), tableau_completer (3,
// 4, 6, 9, 10, 11, 14, 16, 18, 19, 20), tableau_interpreter (2, 4, 5, 6, 9, 10,
// 12, 13, 15, 17, 19, 20), tableau_defi (7, 11, 12, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type OptionsGrille = {
  /** La dernière ligne en gras : c'est la ligne « total ». */
  total?: boolean;
  /** Les cases surlignées en orange, [ligne, colonne] comptées dans `lignes` (colonne 0 = le titre de la ligne). */
  cases?: [number, number][];
};

/**
 * Un TABLEAU HTML : une ligne d'en-tête, puis les lignes. Cinq colonnes au plus,
 * mots courts — il tient dans 240 px sans défiler (le script le mesure). La
 * première colonne (le titre de chaque ligne) est en gras. Une case « ? » est
 * une case à trouver, en pointillés. ⛔ Texte NU dans les cases.
 * ⭐ Le script relit `entetes` et `lignes` : les écrire en clair.
 */
const grille = (entetes: string[], lignes: string[][], opts: OptionsGrille = {}) => (
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
          <tr key={i} className={opts.total && i === lignes.length - 1 ? "bg-slate-50 font-bold" : ""}>
            {l.map((c, j) => {
              const surlignee = (opts.cases ?? []).some(([a, b]) => a === i && b === j);
              const inconnue = c === "?";
              return (
                <td
                  key={j}
                  className={`border px-1.5 py-0.5 ${j === 0 ? "font-bold text-slate-700" : "text-slate-800"} ${
                    surlignee ? "border-orange-400 bg-orange-100 font-black text-orange-900" : "border-slate-300"
                  } ${inconnue ? "font-black text-sky-700" : ""}`}
                >
                  {c}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesTableauCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "tableau",
  titre: "Lire, compléter et interpréter un tableau",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une case au croisement d'une ligne et d'une colonne. Retrouver une case effacée grâce au total. Comparer, calculer un écart, vérifier un total. Un cinéma, un car scolaire, un château fort, une kermesse, un volcan, un refuge, les médailles des Jeux de Paris. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/tableau", titre: "Lire un tableau" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis les titres, puis je cherche la bonne case.",
      rappel: [
        "Un tableau range des nombres en lignes et en colonnes.",
        "Pour lire une case : je suis la ligne, puis je descends la colonne.",
        "Je lis d'abord les titres : ils disent ce que comptent les nombres.",
        "Le total d'une ligne, c'est la somme de toutes ses cases.",
      ],
      exercices: [
        {
          enonce:
            "Un petit cinéma compte ses spectateurs, un samedi.\na) Combien de spectateurs pour le film d'aventure, à 20 h ?\nb) Combien pour le documentaire, à 17 h ?\nc) Dans quelle case lis-tu 112 ?\nd) Lola dit : « 74 personnes ont vu l'aventure à 20 h. » A-t-elle raison ?",
          figure: grille(["film", "14 h", "17 h", "20 h"], [
            ["animation", "86", "112", "45"],
            ["aventure", "38", "74", "120"],
            ["documentaire", "27", "19", "33"],
          ]),
          correction:
            "Une case est au croisement d'une ligne et d'une colonne.\na) Je pose le doigt sur la ligne « aventure ».\nJe glisse jusqu'à la colonne « 20 h » : je lis 120.\nb) Ligne « documentaire », colonne « 17 h » : je lis 19.\nc) Je cherche 112 dans tout le tableau.\nIl est sur la ligne « animation », dans la colonne « 17 h ».\nd) Non. 74, c'est l'aventure à 17 h.\nLola a lu la colonne d'à côté.\n⛔ Le piège : la bonne ligne, mais la mauvaise colonne. Je garde le doigt sur la ligne jusqu'au bout.\nRéponse : a) 120 ; b) 19 ; c) animation, 17 h ; d) non, c'est 120.",
          schema: ecranSeulement(
            grille(["film", "14 h", "17 h", "20 h"], [
              ["animation", "86", "112", "45"],
              ["aventure", "38", "74", "120"],
              ["documentaire", "27", "19", "33"],
            ], { cases: [[1, 3], [0, 2]] }),
          ),
          micros: ["tableau_lire"],
        },
        {
          enonce:
            "Voici les horaires du car scolaire, le matin. Chaque colonne est un car.\na) À quelle heure le car 2 part-il de la gare ?\nb) À quelle heure le car 3 arrive-t-il à l'école ?\nc) Noé monte à la mairie à 7 h 42. Quel car prend-il ?\nd) Noé doit être à l'école avant 8 h. Ce car convient-il ?",
          figure: grille(["arrêt", "car 1", "car 2", "car 3"], [
            ["gare", "7 h 05", "7 h 35", "8 h 05"],
            ["mairie", "7 h 12", "7 h 42", "8 h 12"],
            ["piscine", "7 h 20", "7 h 50", "8 h 20"],
            ["école", "7 h 28", "7 h 58", "8 h 28"],
          ]),
          correction:
            "Une ligne, c'est un arrêt. Une colonne, c'est un car.\na) Colonne « car 2 », ligne « gare » : 7 h 35.\nb) Colonne « car 3 », ligne « école » : 8 h 28.\nc) Sur la ligne « mairie », je cherche 7 h 42.\nIl est dans la colonne « car 2 ».\nd) Je descends la colonne du car 2 jusqu'à « école » : 7 h 58.\n7 h 58, c'est avant 8 h : le car convient.\n⛔ Le piège : lire la ligne de la piscine au lieu de celle de l'école. Je lis le nom de l'arrêt avant l'heure.\nRéponse : a) 7 h 35 ; b) 8 h 28 ; c) le car 2 ; d) oui, il arrive à 7 h 58.",
          schema: ecranSeulement(
            grille(["arrêt", "car 1", "car 2", "car 3"], [
              ["gare", "7 h 05", "7 h 35", "8 h 05"],
              ["mairie", "7 h 12", "7 h 42", "8 h 12"],
              ["piscine", "7 h 20", "7 h 50", "8 h 20"],
              ["école", "7 h 28", "7 h 58", "8 h 28"],
            ], { cases: [[1, 2], [3, 2]] }),
          ),
          micros: ["tableau_lire", "tableau_interpreter"],
        },
        {
          enonce:
            "La classe sème des graines, au soleil et à l'ombre. Une semaine plus tard, elle compte les graines qui ont germé.\nHaricots : 18 au soleil et 11 à l'ombre.\nLentilles : 23 au soleil et 16 à l'ombre.\nRadis : 9 à l'ombre et 20 au soleil.\na) Range ces nombres dans un tableau. Une ligne par graine, une colonne par endroit.\nb) Que veut dire le nombre 16 dans ton tableau ?",
          correction:
            "a) Je trace trois lignes : haricot, lentille, radis.\nJe trace deux colonnes : soleil, ombre.\nHaricot : 18 dans « soleil », 11 dans « ombre ».\nLentille : 23 dans « soleil », 16 dans « ombre ».\nRadis : attention, l'ombre est donnée en premier.\nJ'écris 20 dans « soleil » et 9 dans « ombre ».\nb) 16 est sur la ligne « lentille », dans la colonne « ombre ».\n16 lentilles ont germé à l'ombre.\n⛔ Le piège : recopier les nombres dans l'ordre de la phrase. Je lis le mot à côté de chaque nombre.\nRéponse : b) 16 lentilles ont germé à l'ombre.",
          schema: ecranSeulement(
            grille(["graine", "soleil", "ombre"], [
              ["haricot", "18", "11"],
              ["lentille", "23", "16"],
              ["radis", "20", "9"],
            ], { cases: [[2, 1], [2, 2]] }),
          ),
          micros: ["tableau_completer"],
        },
        {
          enonce:
            "À la fête de l'école, une équipe joue à un quiz de culture. Il y a quatre manches.\nManche 1 : 14 points. Manche 3 : 19 points. Manche 4 : 17 points.\nLe score de la manche 2 est effacé. Le total des quatre manches est 68 points.\na) Combien de points en manche 2 ?\nb) Vérifie par une addition.\nc) Dans quelle manche l'équipe a-t-elle marqué le plus ?",
          correction:
            "a) J'additionne les manches connues : 14 + 19 + 17 = 50.\nIl manque 68 − 50 = 18 points.\nb) 14 + 18 + 19 + 17 = 68. Le total colle.\nc) Je compare : 14, 18, 19, 17. Le plus grand est 19 : la manche 3.\n⛔ Le piège : enlever une seule manche, 68 − 14 = 54. J'enlève TOUTES les manches connues.\nRéponse : a) 18 points ; c) la manche 3.",
          schema: ecranSeulement(
            grille(["manche", "points"], [
              ["1", "14"],
              ["2", "18"],
              ["3", "19"],
              ["4", "17"],
              ["total", "68"],
            ], { total: true, cases: [[1, 1]] }),
          ),
          micros: ["tableau_completer", "tableau_interpreter"],
        },
        {
          enonce:
            "Ce tableau donne la température à midi dans quatre villes, en degrés (°C).\na) Mardi, quelle ville a le plus chaud ?\nb) Mardi, quelle ville a le moins chaud ?\nc) Lundi, où fait-il plus chaud : à Brest ou à Lyon ?\nd) Quelle ville est la plus chaude les trois jours ?",
          figure: grille(["ville", "lundi", "mardi", "mercredi"], [
            ["Lille", "14", "12", "15"],
            ["Brest", "15", "14", "16"],
            ["Lyon", "17", "19", "18"],
            ["Nice", "22", "21", "23"],
          ]),
          correction:
            "a) Je lis toute la colonne « mardi », de haut en bas : 12, 14, 19, 21.\nLe plus grand est 21 : Nice.\nb) Le plus petit de la colonne est 12 : Lille.\nc) Colonne « lundi » : Brest 15, Lyon 17. 17 est plus grand : Lyon.\nd) Chaque jour, le plus grand nombre est sur la ligne « Nice » : 22, 21, 23.\n⛔ Le piège : lire une ligne au lieu de la colonne « mardi ». Pour comparer les villes un jour, je descends la colonne.\nRéponse : a) Nice ; b) Lille ; c) Lyon ; d) Nice.",
          schema: ecranSeulement(
            grille(["ville", "lundi", "mardi", "mercredi"], [
              ["Lille", "14", "12", "15"],
              ["Brest", "15", "14", "16"],
              ["Lyon", "17", "19", "18"],
              ["Nice", "22", "21", "23"],
            ], { cases: [[0, 2], [1, 2], [2, 2], [3, 2]] }),
          ),
          micros: ["tableau_interpreter"],
        },
        {
          enonce:
            "Un week-end, Léa compte les oiseaux de son jardin.\nSamedi : 23 moineaux, 17 mésanges et 6 merles.\nDimanche : 31 moineaux, 9 mésanges et 8 merles.\na) Combien de moineaux de plus le dimanche que le samedi ?\nb) Samedi, combien de mésanges de plus que de merles ?\nc) Quel oiseau a été moins vu le dimanche que le samedi ?\nd) Combien d'oiseaux Léa a-t-elle comptés le dimanche ?",
          correction:
            "Je range d'abord les nombres dans un tableau. Une ligne par oiseau, une colonne par jour.\na) Ligne « moineau » : 31 le dimanche, 23 le samedi.\nJe fais le grand moins le petit : 31 − 23 = 8 moineaux.\nb) Colonne « samedi » : 17 mésanges, 6 merles. 17 − 6 = 11 mésanges.\nc) Je compare les deux cases de chaque ligne. Mésange : 9 le dimanche, 17 le samedi.\nC'est la seule ligne qui baisse.\nd) Colonne « dimanche » : 31 + 9 + 8 = 48 oiseaux.\n⛔ Le piège : additionner pour un écart, 31 + 23. « Combien de plus », c'est une soustraction.\nRéponse : a) 8 ; b) 11 ; c) la mésange ; d) 48 oiseaux.",
          schema: ecranSeulement(
            grille(["oiseau", "samedi", "dimanche"], [
              ["moineau", "23", "31"],
              ["mésange", "17", "9"],
              ["merle", "6", "8"],
            ], { cases: [[1, 1], [1, 2]] }),
          ),
          micros: ["tableau_interpreter", "tableau_completer"],
        },
        {
          enonce:
            "Trois classes collectent du vieux papier pour le recycler. Le tableau donne les kilos (kg) collectés.\na) Combien de kilos le CM2 a-t-il collectés en tout ?\nb) Combien de kilos dans tout le tableau ?\nc) Vérifie ton total d'une autre façon.",
          figure: grille(["classe", "sept.", "oct.", "nov."], [
            ["CE2", "7", "10", "11"],
            ["CM1", "12", "15", "9"],
            ["CM2", "18", "14", "16"],
          ]),
          correction:
            "a) Ligne « CM2 » : 18 + 14 + 16 = 48 kg.\nb) Je fais le total de chaque ligne.\nCE2 : 7 + 10 + 11 = 28 kg. CM1 : 12 + 15 + 9 = 36 kg. CM2 : 48 kg.\nPuis j'additionne les trois totaux : 28 + 36 + 48 = 112 kg.\nc) Je fais le total de chaque colonne.\nSeptembre : 7 + 12 + 18 = 37. Octobre : 10 + 15 + 14 = 39. Novembre : 11 + 9 + 16 = 36.\n37 + 39 + 36 = 112 kg. Je trouve le même total : il est juste.\n⛔ Le piège : oublier une ligne. Je coche chaque case quand je l'ajoute.\nRéponse : a) 48 kg ; b) 112 kg.",
          schema: ecranSeulement(
            grille(["classe", "sept.", "oct.", "nov.", "total"], [
              ["CE2", "7", "10", "11", "28"],
              ["CM1", "12", "15", "9", "36"],
              ["CM2", "18", "14", "16", "48"],
              ["total", "37", "39", "36", "112"],
            ], { total: true, cases: [[3, 4]] }),
          ),
          micros: ["tableau_defi"],
        },
        {
          enonce:
            "Voici une recette de crêpes, pour 4 ou pour 8 personnes.\na) Combien de lait pour 8 personnes ?\nb) Combien d'œufs pour 4 personnes ?\nc) Le nombre 500 est écrit deux fois. Que veut dire chacun ?\nd) Tu cuisines pour 8 personnes. Lis-tu une ligne ou une colonne ?",
          figure: grille(["ingrédient", "4 personnes", "8 personnes"], [
            ["farine (g)", "250", "500"],
            ["lait (mL)", "500", "1 000"],
            ["œufs", "4", "8"],
            ["sucre (g)", "50", "100"],
          ]),
          correction:
            "a) Ligne « lait (mL) », colonne « 8 personnes » : 1 000 mL.\nb) Ligne « œufs », colonne « 4 personnes » : 4 œufs.\nc) Le premier 500 est sur la ligne « farine (g) », colonne « 8 personnes ».\nC'est 500 g de farine pour 8 personnes.\nLe second est sur la ligne « lait (mL) », colonne « 4 personnes ».\nC'est 500 mL de lait pour 4 personnes.\nd) Une colonne : « 8 personnes ». Elle donne tout ce qu'il faut pour 8.\n⛔ Le piège : lire un nombre sans sa ligne et sa colonne. 500 seul ne dit rien : je lis toujours les deux titres.\nRéponse : a) 1 000 mL ; b) 4 œufs ; c) 500 g de farine pour 8, et 500 mL de lait pour 4 ; d) une colonne.",
          schema: ecranSeulement(
            grille(["ingrédient", "4 personnes", "8 personnes"], [
              ["farine (g)", "250", "500"],
              ["lait (mL)", "500", "1 000"],
              ["œufs", "4", "8"],
              ["sucre (g)", "50", "100"],
            ], { cases: [[0, 2], [1, 1]] }),
          ),
          micros: ["tableau_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même tableau. Je lis, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Une case effacée : je pars du total, et j'enlève toutes les autres cases.",
        "« Combien de plus » : le grand nombre moins le petit.",
        "Je vérifie un total par une autre addition.",
      ],
      exercices: [
        {
          enonce:
            "Un château fort compte ses visiteurs au printemps. Le tableau sépare les enfants et les adultes.\na) Combien d'adultes en juin ?\nb) Quel nombre manque à la place du « ? » ?\nc) Quel mois a eu le plus de visiteurs ?\nd) En avril, combien d'adultes de plus que d'enfants ?",
          figure: grille(["mois", "enfants", "adultes", "total"], [
            ["avril", "1 240", "1 860", "3 100"],
            ["mai", "980", "1 530", "?"],
            ["juin", "1 450", "2 070", "3 520"],
          ]),
          correction:
            "a) Ligne « juin », colonne « adultes » : 2 070.\nb) Le « ? » est le total de mai. J'additionne la ligne : 980 + 1 530 = 2 510.\nc) Je compare la colonne « total » : 3 100, 2 510, 3 520.\nLe plus grand est 3 520 : juin.\nd) Ligne « avril » : 1 860 − 1 240 = 620 adultes de plus.\n⛔ Le piège au c) : comparer seulement les enfants, ou seulement les adultes. « Le plus de visiteurs », c'est la colonne « total ».\nRéponse : a) 2 070 ; b) 2 510 ; c) juin ; d) 620.",
          schema: ecranSeulement(
            grille(["mois", "enfants", "adultes", "total"], [
              ["avril", "1 240", "1 860", "3 100"],
              ["mai", "980", "1 530", "2 510"],
              ["juin", "1 450", "2 070", "3 520"],
            ], { cases: [[1, 3], [2, 3]] }),
          ),
          micros: ["tableau_lire", "tableau_completer", "tableau_interpreter"],
        },
        {
          enonce:
            "Le cuisinier de la cantine propose deux plats : poisson ou végétarien. Il note les choix.\nLundi : 46 poissons et 38 végétariens.\nMardi : 29 poissons et 55 végétariens.\nJeudi : 33 végétariens et 51 poissons.\nVendredi : 40 poissons et 44 végétariens.\na) Range ces nombres dans un tableau, avec une colonne « total ».\nb) Chaque jour, 84 élèves mangent à la cantine. Tes totaux collent-ils ?\nc) Quel jour le plat végétarien a-t-il eu le plus de succès ?\nd) Sur les quatre jours, quel plat a été le plus choisi ?",
          correction:
            "a) Une ligne par jour. Trois colonnes : poisson, végétarien, total.\nJeudi : attention, le végétarien est donné en premier.\nJ'écris 51 dans « poisson » et 33 dans « végétarien ».\nb) Lundi : 46 + 38 = 84. Mardi : 29 + 55 = 84.\nJeudi : 51 + 33 = 84. Vendredi : 40 + 44 = 84.\nChaque total fait 84 : le tableau est juste.\nc) Colonne « végétarien » : 38, 55, 33, 44. Le plus grand est 55 : mardi.\nd) Poisson : 46 + 29 + 51 + 40 = 166. Végétarien : 38 + 55 + 33 + 44 = 170.\nLe végétarien gagne, de 170 − 166 = 4 repas.\n⛔ Le piège au d) : compter les jours gagnés. Chaque plat gagne deux jours, mais les totaux ne sont pas égaux.\nRéponse : b) oui ; c) mardi ; d) le végétarien.",
          schema: ecranSeulement(
            grille(["jour", "poisson", "végétarien", "total"], [
              ["lun.", "46", "38", "84"],
              ["mar.", "29", "55", "84"],
              ["jeu.", "51", "33", "84"],
              ["ven.", "40", "44", "84"],
              ["total", "166", "170", "336"],
            ], { total: true, cases: [[2, 1], [2, 2]] }),
          ),
          micros: ["tableau_completer", "tableau_interpreter"],
        },
        {
          enonce:
            "Trois classes font un défi lecture. Le tableau donne les livres lus. Cinq cases sont effacées.\na) Combien de livres le CE2 a-t-il lus en février ?\nb) Combien le CM1 en a-t-il lus en janvier ?\nc) Complète le total du CM2, puis le total de janvier.\nd) Complète la dernière case. Vérifie-la de deux façons.",
          figure: grille(["classe", "janvier", "février", "total"], [
            ["CE2", "34", "?", "71"],
            ["CM1", "?", "42", "80"],
            ["CM2", "45", "39", "?"],
            ["total", "?", "118", "?"],
          ], { total: true }),
          correction:
            "a) Ligne « CE2 » : le total est 71, et janvier vaut 34.\n71 − 34 = 37 livres en février.\nb) Ligne « CM1 » : 80 − 42 = 38 livres en janvier.\nc) Total du CM2 : 45 + 39 = 84.\nTotal de janvier : je descends la colonne. 34 + 38 + 45 = 117.\nd) La dernière case, c'est le total de tout le tableau.\nPar la colonne « total » : 71 + 80 + 84 = 235.\nPar la ligne « total » : 117 + 118 = 235.\nLes deux calculs donnent 235 : c'est juste.\nJe vérifie aussi février : 37 + 42 + 39 = 118. Le total colle.\n⛔ Le piège au c) : calculer le total de janvier avant de connaître la case du CM1. Je trouve d'abord les cases, puis les totaux.\nRéponse : a) 37 ; b) 38 ; c) 84 et 117 ; d) 235.",
          schema: ecranSeulement(
            grille(["classe", "janvier", "février", "total"], [
              ["CE2", "34", "37", "71"],
              ["CM1", "38", "42", "80"],
              ["CM2", "45", "39", "84"],
              ["total", "117", "118", "235"],
            ], { total: true, cases: [[0, 2], [1, 1], [2, 3], [3, 1], [3, 3]] }),
          ),
          micros: ["tableau_completer", "tableau_defi"],
        },
        {
          enonce:
            "À la kermesse, chaque stand compte ses tickets, le matin et l'après-midi.\na) Quel stand a vendu le plus de tickets l'après-midi ?\nb) Combien de tickets ont été vendus le matin, en tout ?\nc) Quel stand a vendu le plus de tickets sur toute la journée ?\nd) Max dit : « Les quilles ont gagné, elles ont la plus grande case. » A-t-il raison ?",
          figure: grille(["stand", "matin", "après-midi"], [
            ["pêche", "48", "44"],
            ["quilles", "27", "63"],
            ["loto", "51", "30"],
            ["tir à l'arc", "39", "41"],
          ]),
          correction:
            "a) Colonne « après-midi » : 44, 63, 30, 41. Le plus grand est 63 : les quilles.\nb) Colonne « matin » : 48 + 27 + 51 + 39 = 165 tickets.\nc) Je fais le total de chaque ligne.\nPêche : 48 + 44 = 92. Quilles : 27 + 63 = 90.\nLoto : 51 + 30 = 81. Tir à l'arc : 39 + 41 = 80.\nLe plus grand total est 92 : la pêche.\nd) Non. 63 est la plus grande case, mais ce n'est que l'après-midi.\nSur la journée, la pêche fait 92, les quilles 90.\n⛔ Le piège : prendre la plus grande case pour le meilleur total. Je calcule toujours les totaux.\nRéponse : a) les quilles ; b) 165 ; c) la pêche ; d) non.",
          schema: ecranSeulement(
            grille(["stand", "matin", "après-midi", "total"], [
              ["pêche", "48", "44", "92"],
              ["quilles", "27", "63", "90"],
              ["loto", "51", "30", "81"],
              ["tir à l'arc", "39", "41", "80"],
            ], { cases: [[0, 3], [1, 2]] }),
          ),
          micros: ["tableau_interpreter", "tableau_defi"],
        },
        {
          enonce:
            "À La Réunion, une guide de montagne emmène des randonneurs sur le volcan du Piton de la Fournaise. Elle compte les randonneurs de trois sentiers.\na) Combien de randonneurs au Formica Léo, le dimanche ?\nb) Kenza lit : « 185 randonneurs au cratère, le samedi. » A-t-elle raison ?\nc) Au cratère, combien de randonneurs de plus le dimanche que le samedi ?\nd) Combien de randonneurs en tout, le dimanche ?",
          figure: grille(["sentier", "samedi", "dimanche"], [
            ["cratère", "420", "610"],
            ["Formica Léo", "185", "240"],
            ["Commerson", "96", "130"],
          ]),
          correction:
            "a) Ligne « Formica Léo », colonne « dimanche » : 240.\nb) Non. Ligne « cratère », colonne « samedi » : je lis 420.\n185, c'est le Formica Léo le samedi. Kenza a lu la ligne du dessous.\nc) Ligne « cratère » : 610 − 420 = 190 randonneurs de plus.\nd) Colonne « dimanche » : 610 + 240 + 130 = 980 randonneurs.\n⛔ Le piège au b) : glisser sur la ligne voisine. Je pose une règle sous la ligne que je lis.\nRéponse : a) 240 ; b) non, c'est 420 ; c) 190 ; d) 980.",
          schema: ecranSeulement(
            grille(["sentier", "samedi", "dimanche"], [
              ["cratère", "420", "610"],
              ["Formica Léo", "185", "240"],
              ["Commerson", "96", "130"],
            ], { cases: [[0, 1], [1, 2]] }),
          ),
          micros: ["tableau_lire", "tableau_interpreter"],
        },
        {
          enonce:
            "Une fleuriste compte les bouquets vendus. Trois cases sont effacées. Voici trois indices.\nIndice 1 : mardi, elle a vendu 15 bouquets de roses de plus que lundi.\nIndice 2 : jeudi, elle a vendu 9 bouquets de tulipes de moins que mardi.\nIndice 3 : mardi, elle a vendu 170 bouquets en tout.\na) Trouve les roses du mardi.\nb) Trouve les tulipes du jeudi.\nc) Trouve les tournesols du mardi.\nd) Quel jour a-t-elle vendu le plus de roses ?",
          figure: grille(["bouquet", "lundi", "mardi", "jeudi"], [
            ["roses", "64", "?", "70"],
            ["tulipes", "38", "45", "?"],
            ["tournesols", "52", "?", "49"],
          ]),
          correction:
            "a) Lundi : 64 roses. 15 de plus : 64 + 15 = 79 roses mardi.\nb) Mardi : 45 tulipes. 9 de moins : 45 − 9 = 36 tulipes jeudi.\nc) Le total du mardi est 170. Je connais déjà 79 roses et 45 tulipes.\n79 + 45 = 124. Puis 170 − 124 = 46 tournesols.\nContrôle : 79 + 45 + 46 = 170.\nd) Ligne « roses » : 64, 79, 70. Le plus grand est 79 : mardi.\n⛔ Le piège au a) : écrire 15. 15, c'est l'écart, pas le nombre de bouquets.\nRéponse : a) 79 ; b) 36 ; c) 46 ; d) mardi.",
          schema: ecranSeulement(
            grille(["bouquet", "lundi", "mardi", "jeudi"], [
              ["roses", "64", "79", "70"],
              ["tulipes", "38", "45", "36"],
              ["tournesols", "52", "46", "49"],
            ], { cases: [[0, 2], [1, 3], [2, 2]] }),
          ),
          micros: ["tableau_completer"],
        },
        {
          enonce:
            "Une école de musique compte ses élèves, filles et garçons.\nVrai ou faux ? Explique avec les nombres.\na) « À la guitare, il y a plus de garçons que de filles. »\nb) « Au piano, il y a deux fois plus de filles que de garçons. »\nc) « En tout, il y a plus de garçons que de filles. »\nd) « La batterie est l'instrument le moins choisi. »",
          figure: grille(["cours", "filles", "garçons"], [
            ["piano", "18", "9"],
            ["guitare", "14", "21"],
            ["violon", "11", "4"],
            ["batterie", "5", "13"],
          ]),
          correction:
            "a) Ligne « guitare » : 21 garçons, 14 filles. 21 est plus grand : vrai.\nb) Deux fois les garçons du piano : 2 × 9 = 18. Il y a 18 filles : vrai.\nc) Filles : 18 + 14 + 11 + 5 = 48. Garçons : 9 + 21 + 4 + 13 = 47.\n48 filles, 47 garçons : faux, de peu.\nd) Je fais le total de chaque ligne.\nPiano : 18 + 9 = 27. Guitare : 14 + 21 = 35.\nViolon : 11 + 4 = 15. Batterie : 5 + 13 = 18.\nLe moins choisi est le violon, avec 15 élèves : faux.\n⛔ Le piège au d) : regarder la seule colonne « filles », où la batterie a 5. Un instrument se juge sur toute sa ligne.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          schema: ecranSeulement(
            grille(["cours", "filles", "garçons", "total"], [
              ["piano", "18", "9", "27"],
              ["guitare", "14", "21", "35"],
              ["violon", "11", "4", "15"],
              ["batterie", "5", "13", "18"],
              ["total", "48", "47", "95"],
            ], { total: true, cases: [[2, 3]] }),
          ),
          micros: ["tableau_interpreter"],
        },
        {
          enonce:
            "Inès, Malo et Sacha jouent à un jeu en trois manches.\nInès marque 25, puis 18, puis 30 points.\nMalo marque 32, puis 29, puis 9 points.\nSacha marque 14, puis 27, puis 21 points.\na) Range ces scores dans un tableau. Une ligne par joueur, une colonne par manche.\nb) Combien de manches Malo a-t-il gagnées ?\nc) Calcule le total de chaque joueur.\nd) Qui gagne la partie ? Avec combien de points d'avance ?",
          correction:
            "a) Trois lignes : Inès, Malo, Sacha. Trois colonnes : 1re, 2e et 3e manche.\nb) Manche 1 : 25, 32, 14. Malo gagne avec 32.\nManche 2 : 18, 29, 27. Malo gagne avec 29.\nManche 3 : 30, 9, 21. Inès gagne avec 30.\nMalo a gagné 2 manches.\nc) Inès : 25 + 18 + 30 = 73. Malo : 32 + 29 + 9 = 70. Sacha : 14 + 27 + 21 = 62.\nd) Le plus grand total est 73 : Inès gagne.\nSon avance sur Malo : 73 − 70 = 3 points.\n⛔ Le piège : donner la victoire à Malo, qui a gagné le plus de manches. Le gagnant a le plus grand TOTAL.\nRéponse : b) 2 manches ; c) 73, 70 et 62 ; d) Inès, avec 3 points d'avance.",
          schema: ecranSeulement(
            grille(["joueur", "1re", "2e", "3e", "total"], [
              ["Inès", "25", "18", "30", "73"],
              ["Malo", "32", "29", "9", "70"],
              ["Sacha", "14", "27", "21", "62"],
            ], { cases: [[0, 4]] }),
          ),
          micros: ["tableau_completer", "tableau_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des tableaux de métiers. Je lis, je calcule, je vérifie, puis je réponds par une phrase.",
      rappel: [
        "Je lis le titre, les lignes et les colonnes avant de calculer.",
        "Un total se vérifie de deux façons : par les lignes, puis par les colonnes.",
        "Le meilleur, c'est souvent le plus grand total, pas la plus grande case.",
      ],
      exercices: [
        {
          titre: "Le tableau des médailles",
          enonce:
            "Une journaliste sportive écrit un article sur les Jeux olympiques de Paris 2024. Voici les vraies médailles de quatre pays.\na) Combien de médailles d'argent pour la France ?\nb) Calcule le total de médailles de chaque pays.\nc) Le classement officiel range les pays par l'or. Range ces quatre pays de cette façon.\nd) Range-les maintenant par le total de médailles.\ne) Quel pays est premier ? Explique pourquoi la réponse dépend de la règle.",
          figure: grille(["pays", "or", "argent", "bronze"], [
            ["France", "16", "26", "22"],
            ["Royaume-Uni", "14", "22", "29"],
            ["Australie", "18", "19", "16"],
            ["Japon", "20", "12", "13"],
          ]),
          correction:
            "a) Ligne « France », colonne « argent » : 26.\nb) J'additionne chaque ligne.\nFrance : 16 + 26 + 22 = 64. Royaume-Uni : 14 + 22 + 29 = 65.\nAustralie : 18 + 19 + 16 = 53. Japon : 20 + 12 + 13 = 45.\nc) Colonne « or » : Japon 20, Australie 18, France 16, Royaume-Uni 14.\nL'ordre est : Japon, Australie, France, Royaume-Uni.\nd) Les totaux : Royaume-Uni 65, France 64, Australie 53, Japon 45.\nL'ordre est : Royaume-Uni, France, Australie, Japon.\ne) Par l'or, le Japon est premier. Par le total, il est dernier !\nLe tableau ne change pas. C'est la règle qui change le classement.\n⛔ Le piège : croire qu'un classement est le seul possible. Je lis toujours sa règle.\nRéponse : c) Japon, Australie, France, Royaume-Uni ; d) Royaume-Uni, France, Australie, Japon ; e) cela dépend de la règle.",
          schema: ecranSeulement(
            grille(["pays", "or", "total"], [
              ["Japon", "20", "45"],
              ["Australie", "18", "53"],
              ["France", "16", "64"],
              ["Royaume-Uni", "14", "65"],
            ], { cases: [[0, 1], [3, 2]] }),
          ),
          micros: ["tableau_lire", "tableau_interpreter", "tableau_defi"],
        },
        {
          titre: "Les adoptions de l'été",
          enonce:
            "Une vétérinaire travaille dans un refuge pour animaux. Elle note les adoptions de l'été. Quatre cases sont effacées.\na) Combien de chiens adoptés en juillet ?\nb) Combien de chats adoptés en août ?\nc) Combien de chats adoptés en tout ?\nd) Combien d'animaux adoptés pendant tout l'été ? Vérifie de deux façons.\ne) Le refuge espérait 130 adoptions. Combien en manque-t-il ?",
          figure: grille(["animal", "juin", "juil.", "août", "total"], [
            ["chiens", "12", "?", "15", "41"],
            ["chats", "18", "23", "?", "?"],
            ["lapins", "4", "6", "5", "15"],
            ["total", "34", "43", "38", "?"],
          ], { total: true }),
          correction:
            "a) Ligne « chiens » : le total est 41.\nJ'enlève les mois connus : 41 − 12 − 15 = 14 chiens.\nb) La ligne des chats a deux cases effacées. Je passe par la colonne « août ».\nLe total d'août est 38 : 38 − 15 − 5 = 18 chats.\nc) Ligne « chats » : 18 + 23 + 18 = 59 chats.\nd) Par la colonne « total » : 41 + 59 + 15 = 115.\nPar la ligne « total » : 34 + 43 + 38 = 115.\nLes deux calculs donnent 115 : c'est juste.\ne) 130 − 115 = 15 adoptions manquent.\n⛔ Le piège au b) : chercher les chats par leur ligne. Elle a deux trous : je prends la colonne qui n'en a qu'un.\nRéponse : a) 14 ; b) 18 ; c) 59 ; d) 115 ; e) 15.",
          schema: ecranSeulement(
            grille(["animal", "juin", "juil.", "août", "total"], [
              ["chiens", "12", "14", "15", "41"],
              ["chats", "18", "23", "18", "59"],
              ["lapins", "4", "6", "5", "15"],
              ["total", "34", "43", "38", "115"],
            ], { total: true, cases: [[0, 2], [1, 3], [1, 4], [3, 4]] }),
          ),
          micros: ["tableau_completer", "tableau_defi"],
        },
        {
          titre: "Le total qui ne colle pas",
          enonce:
            "Le bibliothécaire de l'école compte les livres empruntés par deux classes. Il a fait une erreur dans une case « total ».\na) Vérifie chaque total. Lequel est faux ?\nb) Corrige-le.\nc) Quelle classe emprunte le plus de livres ?\nd) Il veut acheter des livres du genre le plus emprunté. Lequel ?",
          figure: grille(["livres", "CM1", "CM2", "total"], [
            ["BD", "48", "57", "105"],
            ["romans", "35", "41", "76"],
            ["albums", "22", "19", "41"],
            ["total", "105", "107", "222"],
          ], { total: true }),
          correction:
            "a) Je refais chaque addition.\nBD : 48 + 57 = 105. Romans : 35 + 41 = 76. Albums : 22 + 19 = 41. Ces trois totaux sont justes.\nCM1 : 48 + 35 + 22 = 105. C'est juste.\nCM2 : 57 + 41 + 19 = 117. Le tableau écrit 107 : c'est faux.\nUn indice le montrait : 105 + 107 = 212, pas 222.\nb) J'écris 117. Contrôle : 105 + 117 = 222, et 105 + 76 + 41 = 222.\nc) CM2 : 117 livres. CM1 : 105 livres. Le CM2 emprunte le plus.\nd) Colonne « total » : BD 105, romans 76, albums 41. Ce sont les BD.\n⛔ Le piège : croire un total parce qu'il est écrit. Je le vérifie par l'addition.\nRéponse : a) le total du CM2 ; b) 117 ; c) le CM2 ; d) les BD.",
          schema: ecranSeulement(
            grille(["livres", "CM1", "CM2", "total"], [
              ["BD", "48", "57", "105"],
              ["romans", "35", "41", "76"],
              ["albums", "22", "19", "41"],
              ["total", "105", "117", "222"],
            ], { total: true, cases: [[3, 2]] }),
          ),
          micros: ["tableau_completer", "tableau_interpreter", "tableau_defi"],
        },
        {
          titre: "Les panneaux solaires de l'école",
          enonce:
            "Un technicien relève l'électricité produite par les panneaux solaires de l'école. Il la compte en kWh, une unité d'énergie.\nCantine : 85 en avril, 110 en mai, 125 en juin.\nGymnase : 140 en avril, 175 en mai, 190 en juin.\nClasses : 60 en avril, 72 en mai, 81 en juin.\na) Range ces relevés dans un tableau.\nb) Quel mois a produit le plus ?\nc) L'objectif était 1 000 kWh sur les trois mois. Est-il atteint ?\nd) Le technicien dit : « Le gymnase produit plus que la cantine et les classes réunies. » A-t-il raison ?",
          correction:
            "a) Une ligne par bâtiment, une colonne par mois.\nb) Je fais le total de chaque colonne.\nAvril : 85 + 140 + 60 = 285. Mai : 110 + 175 + 72 = 357. Juin : 125 + 190 + 81 = 396.\nLe plus grand est 396 : juin.\nc) 285 + 357 + 396 = 1 038 kWh.\n1 038 est plus grand que 1 000 : l'objectif est atteint, avec 38 kWh de plus.\nd) Gymnase : 140 + 175 + 190 = 505.\nCantine : 85 + 110 + 125 = 320. Classes : 60 + 72 + 81 = 213.\nCantine et classes réunies : 320 + 213 = 533.\n505 est plus petit que 533 : il a tort.\nContrôle : 505 + 533 = 1 038. Je retrouve le total.\n⛔ Le piège au d) : comparer le gymnase à un seul bâtiment. « Réunies » veut dire : j'additionne les deux autres.\nRéponse : b) juin ; c) oui, 1 038 kWh ; d) non.",
          schema: ecranSeulement(
            grille(["bâtiment", "avril", "mai", "juin", "total"], [
              ["cantine", "85", "110", "125", "320"],
              ["gymnase", "140", "175", "190", "505"],
              ["classes", "60", "72", "81", "213"],
              ["total", "285", "357", "396", "1 038"],
            ], { total: true, cases: [[3, 3], [3, 4]] }),
          ),
          micros: ["tableau_completer", "tableau_interpreter", "tableau_defi"],
        },
      ],
    },
  ],
};
