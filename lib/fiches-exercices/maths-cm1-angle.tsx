// ─── Fiche d'exercices : les angles (CM1) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : la feuille de la notion `angle` du coach CM1 (7 micros). Sur la
// forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Chaque exercice a ses réponses vérifiées sans IA (`reponses`).
//
// Alignée sur la carte mentale remplie `cm1/angle` : le sommet et les deux
// côtés, l'angle droit (coin de feuille, équerre), aigu et obtus PAR
// COMPARAISON à l'angle droit, comparer en décalquant (gabarit), le nom à trois
// lettres (sommet au milieu), le défi des angles droits d'un triangle.
// ⛔ LIMITES DU CM1 : AUCUNE mesure en degrés, pas de rapporteur (c'est la 6e).
// L'angle plat n'est pas demandé. ⛔ Aucune question à rédiger, ni « trace » :
// on lit un dessin, on répond par un mot, une lettre, un nombre.
// ⭐ Les dessins sont EXACTS (angles tracés au degré) : l'élève peut poser son
// équerre ou son gabarit sur la feuille imprimée.
//
// Les pièges nommés : compter les côtés au lieu des angles (1), « droit » à
// l'œil (2), un angle droit penché (2, 7), aigu et obtus inversés (3, 14), 3 h
// ni aigu ni obtus (4), les côtés longs (5, 16), le sommet au bout d'un côté
// (6, 12), le gabarit posé sans faire coïncider le sommet (8), un trapèze pris
// pour un rectangle (9, 17), plus de parts = plus grand angle (11), la lettre
// du milieu (12, 19), deux angles droits dans un triangle (15, 20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bureau (7), horloge de gare (4), montre (13),
// pizzeria (11), graphisme (14), menuiserie (17), robotique (18), architecture
// (19), pâtisserie (20).
// Les métiers : pizzaïolo (11), graphiste (14), menuisier (17), roboticienne
// (18), architecte (19), pâtissier (20).
//
// ⭐ Faits sûrs seulement : une horloge à aiguilles (12 heures sur le cadran ;
// à 3 h, les aiguilles font un angle droit). Tout le reste est un MODÈLE.
//
// Micro-compétences : angle_reconnaitre (1, 6), angle_droit (2, 7, 9, 15, 18,
// 20), angle_type (3, 4, 9, 11, 13, 14, 17, 19), angle_comparer (8, 10, 13),
// angle_notation (6, 12, 19), angle_comparer_sans_mesure (5, 11, 16),
// angle_defi (15, 17, 18, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, ORANGE_CLAIR, ROUGE, VERT_CLAIR, angles, ecranSeulement, figure, horloges, pizzas, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

/** Un polygone régulier de `n` côtés, centré en (cx ; cy), posé sur un côté horizontal. */
const regulier = (n: number, r: number, cx = 0, cy = 0): P2[] =>
  Array.from({ length: n }, (_, k) => {
    const a = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * k) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as P2;
  });

/** Un rectangle de `w` sur `h`, tourné de `deg` degrés autour de son coin. */
const rectTourne = (w: number, h: number, deg: number): P2[] => {
  const [c, s] = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  return [
    [0, 0],
    [w * c, w * s],
    [w * c - h * s, w * s + h * c],
    [-h * s, h * c],
  ];
};

export const exercicesAngleCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "angle",
  titre: "Les angles",
  accroche:
    "Vingt exercices, du geste seul au problème. Trouver le sommet et les côtés d'un angle. Reconnaître un angle droit avec l'équerre ou le coin d'une feuille. Dire si un angle est aigu ou obtus, en le comparant à l'angle droit. Comparer deux angles avec un gabarit. Nommer un angle avec trois lettres. Des horloges, des pizzas, des lettres, un cadre de menuisier, un robot, un toit et un gâteau. Un rappel de cours avant chaque niveau. Garde ton équerre près de toi. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je pose le coin de mon équerre sur le sommet.",
      rappel: [
        "Un angle, ce sont deux côtés qui partent du même point : le SOMMET.",
        "Un angle droit est comme le coin d'une feuille. Je le vérifie avec l'équerre.",
        "Aigu : plus petit qu'un angle droit. Obtus : plus grand qu'un angle droit.",
        "La taille d'un angle, c'est son OUVERTURE. La longueur des côtés ne compte pas.",
      ],
      exercices: [
        {
          enonce: "Combien d'angles a chaque figure ?\na) le triangle\nb) le carré\nc) le pentagone",
          figure: figure({
            polys: [
              { sommets: [[0, 0], [3, 0], [1.5, 2.4]], arcs: [0, 1, 2] },
              { sommets: [[4.5, 0], [7, 0], [7, 2.5], [4.5, 2.5]], fond: ORANGE_CLAIR },
              { sommets: regulier(5, 1.35, 9.8, 1.1), fond: VERT_CLAIR },
            ],
            textes: [
              { en: [1.5, -0.7], t: "triangle" },
              { en: [5.75, -0.7], t: "carré" },
              { en: [9.8, -0.7], t: "pentagone" },
            ],
            largeur: "max-w-[24rem] print:max-w-[18rem]",
          }),
          correction:
            "Un angle a un sommet. Je compte les sommets, là où deux côtés se touchent.\na) Le triangle a 3 sommets : 3 angles. Ils sont marqués en orange.\nb) Le carré a 4 sommets : 4 angles.\nc) Le pentagone a 5 sommets : 5 angles.\n⭐ Un polygone a autant d'angles que de côtés.\n⛔ Le piège : oublier un coin. Je mets une croix sur chaque sommet compté.\nRéponse : a) 3 ; b) 4 ; c) 5.",
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
          micros: ["angle_reconnaitre"],
        },
        {
          enonce: "Avec le coin d'une feuille, cherche les angles DROITS.\nQuels angles sont droits ? Écris leurs lettres.",
          figure: angles([
            { deg: 90, depart: 0, nom: "a" },
            { deg: 60, depart: 20, nom: "b" },
            { deg: 90, depart: 30, nom: "c" },
            { deg: 110, depart: 10, nom: "d" },
          ]),
          correction:
            "Je pose le coin de la feuille sur le sommet. Un côté du coin suit un côté de l'angle.\nL'angle a colle au coin : il est droit.\nL'angle b est plus fermé que le coin : il n'est pas droit.\nL'angle c est penché, mais il colle au coin quand je tourne la feuille : il est droit.\nL'angle d est plus ouvert que le coin : il n'est pas droit.\n⛔ Le piège : oublier l'angle c parce qu'il est penché. Je tourne ma feuille ou mon équerre.\nRéponse : les angles a et c.",
          reponses: [{ attendu: ["a ; c", "a, c", "c, a"] }],
          micros: ["angle_droit"],
        },
        {
          enonce: "Pour chaque angle, écris : aigu, droit ou obtus.\na) l'angle a\nb) l'angle b\nc) l'angle c\nd) l'angle d",
          figure: angles([
            { deg: 45, depart: 10, nom: "a" },
            { deg: 135, depart: 0, nom: "b" },
            { deg: 90, depart: 60, nom: "c" },
            { deg: 20, depart: 30, nom: "d" },
          ]),
          correction:
            "Je compare chaque angle au coin de mon équerre.\na) L'angle a est plus fermé que l'équerre : il est aigu.\nb) L'angle b est plus ouvert que l'équerre : il est obtus.\nc) L'angle c colle à l'équerre : il est droit.\nd) L'angle d est très fermé : il est aigu.\n⛔ Le piège : inverser les mots. AIGU comme une aiguille : pointu, fermé. OBTUS : ouvert, large.\nRéponse : a) aigu ; b) obtus ; c) droit ; d) aigu.",
          reponses: [
            { question: "a)", attendu: ["aigu", "aiguë"] },
            { question: "b)", attendu: "obtus" },
            { question: "c)", attendu: "droit" },
            { question: "d)", attendu: ["aigu", "aiguë"] },
          ],
          micros: ["angle_type"],
        },
        {
          enonce: "Voici l'horloge de la gare à trois heures différentes.\nLes deux aiguilles forment un angle.\nÉcris : aigu, droit ou obtus.\na) à 1 h\nb) à 3 h\nc) à 5 h",
          figure: horloges([
            { h: 1, nom: "1 h" },
            { h: 3, nom: "3 h" },
            { h: 5, nom: "5 h" },
          ]),
          correction:
            "La grande aiguille est sur le 12. Je regarde l'écart avec la petite aiguille.\na) À 1 h, l'écart est petit : l'angle est aigu.\nb) À 3 h, les aiguilles font un coin, comme une équerre : l'angle est droit.\nc) À 5 h, l'écart est plus grand qu'à 3 h : l'angle est obtus.\n⛔ Le piège : dire qu'à 3 h l'angle est aigu ou obtus. Il est droit : ni aigu, ni obtus.\nRéponse : a) aigu ; b) droit ; c) obtus.",
          reponses: [
            { question: "a)", attendu: ["aigu", "aiguë"] },
            { question: "b)", attendu: "droit" },
            { question: "c)", attendu: "obtus" },
          ],
          micros: ["angle_type"],
        },
        {
          enonce: "Regarde les angles a et b.\nQuel angle est le plus grand ?\nA) l'angle a   B) l'angle b   C) ils ont la même ouverture",
          figure: angles([
            { deg: 40, depart: 5, nom: "a", longueurs: [95, 95] },
            { deg: 70, depart: 5, nom: "b", longueurs: [38, 38] },
          ]),
          correction:
            "La taille d'un angle, c'est l'écart entre ses deux côtés.\nJe décalque l'angle b et je le pose sur l'angle a, sommet sur sommet.\nL'angle b est plus ouvert que l'angle a.\nL'angle b est le plus grand : la réponse B.\n⛔ Le piège : choisir a parce que ses côtés sont plus longs. On peut prolonger les côtés : l'écart ne change pas.\nRéponse : B) l'angle b.",
          reponses: [{ attendu: ["B", "l'angle b"] }],
          micros: ["angle_comparer_sans_mesure"],
        },
        {
          enonce: "Voici un angle.\na) Quelle lettre est sur son sommet ?\nb) Écris le nom de l'angle avec trois lettres.",
          figure: angles([{ deg: 55, depart: 10, lettres: ["A", "B", "C"] }]),
          correction:
            "a) Le sommet est le point d'où partent les deux côtés. C'est le point B.\nb) J'écris un point d'un côté, puis le sommet AU MILIEU, puis un point de l'autre côté.\nL'angle s'appelle ABC. On peut aussi écrire CBA.\n⛔ Le piège : écrire BAC. Avec A au milieu, on parle d'un autre angle, de sommet A.\nRéponse : a) B ; b) ABC (ou CBA).",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["ABC", "CBA"] },
          ],
          micros: ["angle_notation", "angle_reconnaitre"],
        },
        {
          enonce: "Une feuille de papier est posée de travers sur le bureau.\na) Combien d'angles droits a cette feuille ?\nb) Vrai ou faux : quand je tourne un rectangle, ses angles restent droits.\nc) Vrai ou faux : un triangle peut avoir deux angles droits.",
          figure: figure({ polys: [{ sommets: rectTourne(5, 3.5, 25), fond: "#f8fafc" }], hmax: 180 }),
          correction:
            "a) Une feuille est un rectangle. Je pose l'équerre dans chaque coin, en la tournant : elle colle 4 fois.\nLa feuille a 4 angles droits.\nb) Tourner une figure ne change pas ses angles. C'est vrai.\nc) Avec deux angles droits, deux côtés monteraient tout droit, côte à côte. Ils ne se rejoindraient jamais. C'est faux.\n⛔ Le piège : croire qu'un angle droit doit être « bien droit » sur la page. Penché, il reste droit.\nRéponse : a) 4 ; b) vrai ; c) faux.",
          schema: ecranSeulement(figure({ polys: [{ sommets: rectTourne(5, 3.5, 25), droits: [0, 1, 2, 3], fond: "#f8fafc" }], hmax: 180 })),
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
          ],
          micros: ["angle_droit"],
        },
        {
          enonce: "Zoé a découpé un gabarit d'angle en carton, en orange.\nElle le pose sur les angles a, b et c.\na) Quel angle a la même ouverture que le gabarit ?\nb) Quel angle est plus petit que le gabarit ?",
          figure: angles([
            { deg: 50, depart: 10, nom: "gabarit", couleur: ORANGE },
            { deg: 70, depart: 0, nom: "a" },
            { deg: 30, depart: 25, nom: "b" },
            { deg: 50, depart: 40, nom: "c" },
          ]),
          correction:
            "Je pose le sommet du gabarit sur le sommet de l'angle. Un côté du gabarit suit un côté de l'angle.\nPuis je regarde l'autre côté.\nAngle a : il dépasse du gabarit. L'angle a est plus grand.\nAngle b : il est caché sous le gabarit. L'angle b est plus petit.\nAngle c : les deux côtés collent. L'angle c a la même ouverture, même s'il est tourné.\n⛔ Le piège : poser le gabarit sans mettre les deux sommets l'un sur l'autre. La comparaison est alors fausse.\nRéponse : a) l'angle c ; b) l'angle b.",
          reponses: [
            { question: "a)", attendu: ["c", "l'angle c"] },
            { question: "b)", attendu: ["b", "l'angle b"] },
          ],
          micros: ["angle_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je vérifie chaque angle avec l'équerre, sans deviner à l'œil.",
      rappel: [
        "Le nom d'un angle : trois lettres, le SOMMET au milieu. ABC a pour sommet B.",
        "Pour comparer deux angles, je décalque l'un et je le pose sur l'autre, sommet sur sommet.",
        "Aigu < droit < obtus.",
      ],
      exercices: [
        {
          enonce: "Voici le quadrilatère ABCD.\na) Quels sont ses angles droits ? Écris les lettres des sommets.\nb) L'angle de sommet B est-il aigu ou obtus ?\nc) L'angle de sommet C est-il aigu ou obtus ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [6, 0], [4, 3], [0, 3]], noms: ["A", "B", "C", "D"] }], hmax: 170 }),
          correction:
            "Je pose l'équerre dans chaque coin.\na) En A, l'équerre colle aux deux côtés : angle droit. En D aussi : angle droit.\nb) En B, l'angle est plus fermé que l'équerre : il est aigu.\nc) En C, l'angle est plus ouvert que l'équerre : il est obtus.\n⛔ Le piège : croire que tous les coins d'un quadrilatère sont droits. Seul le rectangle (et le carré) a 4 angles droits.\nRéponse : a) A et D ; b) aigu ; c) obtus.",
          schema: ecranSeulement(figure({ polys: [{ sommets: [[0, 0], [6, 0], [4, 3], [0, 3]], noms: ["A", "B", "C", "D"], droits: [0, 3], arcs: [1, 2] }], hmax: 170 })),
          reponses: [
            { question: "a)", attendu: ["A ; D", "A, D", "D, A"] },
            { question: "b)", attendu: ["aigu", "aiguë"] },
            { question: "c)", attendu: "obtus" },
          ],
          micros: ["angle_type", "angle_droit"],
        },
        {
          enonce: "Range les angles a, b et c du plus petit au plus grand.\nÉcris les lettres dans l'ordre, séparées par des points-virgules.",
          figure: angles([
            { deg: 100, depart: 20, nom: "a" },
            { deg: 45, depart: 60, nom: "b" },
            { deg: 70, depart: 0, nom: "c" },
          ]),
          correction:
            "Je compare chaque angle à l'angle droit de l'équerre.\nL'angle a est plus ouvert que l'équerre : il est obtus. C'est le plus grand.\nLes angles b et c sont aigus. Je décalque b et je le pose sur c, sommet sur sommet : b est caché dans c.\nDonc b est plus petit que c.\nDu plus petit au plus grand : b, puis c, puis a.\n⛔ Le piège : se laisser tromper par la position. Un angle tourné vers le haut n'est pas plus grand.\nRéponse : b ; c ; a.",
          reponses: [{ attendu: ["b ; c ; a", "b < c < a", "b, c, a"], ordre: true }],
          micros: ["angle_comparer"],
        },
        {
          enonce: "Un pizzaïolo coupe trois pizzas pareilles en parts égales.\nLa part orange forme un angle au centre de la pizza.\nÉcris : aigu, droit ou obtus.\na) la pizza en 4 parts\nb) la pizza en 8 parts\nc) la pizza en 3 parts",
          figure: pizzas([
            { n: 4, nom: "4 parts" },
            { n: 8, nom: "8 parts" },
            { n: 3, nom: "3 parts" },
          ]),
          correction:
            "a) En 4 parts : les traits font une croix. Chaque part a un coin d'équerre : l'angle est droit.\nb) En 8 parts : chaque part de 4 est coupée en deux. L'angle est plus petit qu'un angle droit : il est aigu.\nc) En 3 parts : les parts sont plus grosses qu'en 4. L'angle est plus grand qu'un angle droit : il est obtus.\n⛔ Le piège : croire que 8 parts font un plus grand angle, parce que 8 est plus grand que 4. Plus on coupe, plus les angles sont PETITS.\nRéponse : a) droit ; b) aigu ; c) obtus.",
          reponses: [
            { question: "a)", attendu: "droit" },
            { question: "b)", attendu: ["aigu", "aiguë"] },
            { question: "c)", attendu: "obtus" },
          ],
          micros: ["angle_comparer_sans_mesure", "angle_type"],
        },
        {
          enonce: "Le triangle RST a un angle droit, codé en rouge.\na) Écris le nom de l'angle droit avec trois lettres.\nb) Quel est le sommet de l'angle RTS ?\nc) L'angle RTS est-il aigu ou obtus ?",
          figure: figure({ polys: [{ sommets: [[0, 3], [0, 0], [4, 0]], noms: ["R", "S", "T"], droits: [1] }], hmax: 170 }),
          correction:
            "a) Le petit carré rouge est en S. Le sommet S va au milieu : l'angle droit s'appelle RST, ou TSR.\nb) Dans RTS, la lettre du milieu est T. Le sommet est T.\nc) En T, l'angle est plus fermé que l'équerre : il est aigu.\n⛔ Le piège : lire la première lettre comme sommet. Dans RTS, le sommet n'est pas R : c'est la lettre du MILIEU.\nRéponse : a) RST (ou TSR) ; b) T ; c) aigu.",
          reponses: [
            { question: "a)", attendu: ["RST", "TSR"] },
            { question: "b)", attendu: "T" },
            { question: "c)", attendu: ["aigu", "aiguë"] },
          ],
          micros: ["angle_notation"],
        },
        {
          enonce: "Yanis regarde sa montre à 2 h, puis à 4 h.\na) À 2 h, l'angle des aiguilles est-il aigu ou obtus ?\nb) À 4 h, est-il aigu ou obtus ?\nc) À quelle heure l'angle est-il le plus grand ?\nA) à 4 h   B) à 2 h   C) à 3 h",
          figure: horloges([
            { h: 2, nom: "2 h" },
            { h: 4, nom: "4 h" },
          ]),
          correction:
            "Je compare à 3 h : à 3 h, les aiguilles font un angle droit.\na) À 2 h, la petite aiguille est avant le 3. L'angle est plus petit qu'un angle droit : il est aigu.\nb) À 4 h, la petite aiguille a dépassé le 3. L'angle est plus grand qu'un angle droit : il est obtus.\nc) De 2 h à 4 h, l'angle s'ouvre. Le plus grand est à 4 h : la réponse A.\n⛔ Le piège : choisir 3 h parce que l'angle droit « semble parfait ». Droit n'est pas le plus grand : obtus est plus grand.\nRéponse : a) aigu ; b) obtus ; c) A, à 4 h.",
          reponses: [
            { question: "a)", attendu: ["aigu", "aiguë"] },
            { question: "b)", attendu: "obtus" },
            { question: "c)", attendu: ["A", "4 h"] },
          ],
          micros: ["angle_comparer", "angle_type"],
        },
        {
          enonce: "Une graphiste dessine des lettres avec deux traits : L, V et un chapeau ^.\nÉcris : aigu, droit ou obtus.\na) l'angle du L\nb) l'angle du V\nc) l'angle du chapeau",
          figure: angles([
            { deg: 90, depart: 0, nom: "L", sansArc: true },
            { deg: 40, depart: 70, nom: "V", sansArc: true },
            { deg: 130, depart: 205, nom: "chapeau", sansArc: true },
          ]),
          correction:
            "Je pose le coin de l'équerre au point où les deux traits se touchent.\na) Le L colle à l'équerre : son angle est droit.\nb) Le V est plus fermé que l'équerre : son angle est aigu.\nc) Le chapeau est plus ouvert que l'équerre : son angle est obtus.\n⛔ Le piège : dire « aigu » pour le chapeau parce qu'il est pointu en haut. Je compare l'ÉCART à l'équerre, pas la forme.\nRéponse : a) droit ; b) aigu ; c) obtus.",
          reponses: [
            { question: "a)", attendu: "droit" },
            { question: "b)", attendu: ["aigu", "aiguë"] },
            { question: "c)", attendu: "obtus" },
          ],
          micros: ["angle_type"],
        },
        {
          enonce: "Voici trois triangles A, B et C.\na) Quel triangle a un angle droit ?\nb) Quel triangle a un angle obtus ?\nc) Combien d'angles droits un triangle peut-il avoir, au plus ?",
          figure: figure({
            polys: [
              { sommets: [[0, 0], [4, 0], [5, 2]] },
              { sommets: [[6.5, 0], [9.5, 0], [8, 2.6]], fond: ORANGE_CLAIR },
              { sommets: [[11, 0], [14, 0], [11, 2.5]], fond: VERT_CLAIR },
            ],
            textes: [
              { en: [2.5, 2.6], t: "A" },
              { en: [8, 3.3], t: "B" },
              { en: [12.5, 3.2], t: "C" },
            ],
            largeur: "max-w-[24rem] print:max-w-[18rem]",
          }),
          correction:
            "Je pose l'équerre dans les coins de chaque triangle.\na) Le triangle C a un coin qui colle à l'équerre, en bas à gauche : il a un angle droit.\nb) Le triangle A a un coin plus ouvert que l'équerre, en bas à droite : il a un angle obtus.\nLe triangle B a ses 3 angles aigus.\nc) Un triangle a au plus 1 angle droit. Avec deux, ses côtés ne se rejoindraient pas.\n⛔ Le piège : chercher l'angle droit seulement « en bas ». Je vérifie les 3 coins de chaque triangle.\nRéponse : a) C ; b) A ; c) 1.",
          schema: ecranSeulement(
            figure({
              polys: [
                { sommets: [[0, 0], [4, 0], [5, 2]], arcs: [1] },
                { sommets: [[6.5, 0], [9.5, 0], [8, 2.6]], fond: ORANGE_CLAIR },
                { sommets: [[11, 0], [14, 0], [11, 2.5]], droits: [0], fond: VERT_CLAIR },
              ],
              largeur: "max-w-[24rem] print:max-w-[18rem]",
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["C", "le triangle C"] },
            { question: "b)", attendu: ["A", "le triangle A"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
          micros: ["angle_droit", "angle_defi"],
        },
        {
          enonce: "Mila trace un angle. Puis elle prolonge ses deux côtés, en pointillés.\nL'angle devient-il plus grand ?\nA) oui, il devient obtus   B) oui, un peu   C) non, il ne change pas",
          figure: angles([{ deg: 50, depart: 15, longueurs: [45, 45], prolonge: 40 }]),
          correction:
            "Un angle se mesure à l'écart entre ses deux côtés, au sommet.\nQuand je prolonge les côtés, ils gardent la même direction.\nL'écart au sommet ne change pas : l'angle reste le même. La réponse C.\n⛔ Le piège : croire qu'un angle grandit avec ses côtés. Les côtés plus longs ne l'ouvrent pas.\nRéponse : C) non, il ne change pas.",
          reponses: [{ attendu: ["C", "non"] }],
          micros: ["angle_comparer_sans_mesure"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois. Je dessine au brouillon et je marque les angles droits d'un petit carré.",
      rappel: [
        "Un rectangle a 4 angles droits. S'il en manque un, ce n'est pas un rectangle.",
        "Un quart de tour, c'est un angle droit. Un demi-tour, ce sont 2 angles droits.",
        "Un triangle a 3 angles, et au plus 1 angle droit.",
      ],
      exercices: [
        {
          titre: "Le cadre du menuisier",
          enonce: "Un menuisier vérifie un cadre ABCD avec son équerre.\nEn A et en B, l'équerre colle aux deux côtés.\nEn C, il reste un espace : l'angle est plus ouvert que l'équerre.\nEn D, l'équerre dépasse : l'angle est plus fermé.\na) Combien d'angles droits a le cadre ?\nb) L'angle en C est-il aigu ou obtus ?\nc) L'angle en D est-il aigu ou obtus ?\nd) Le cadre est-il un rectangle ? Réponds oui ou non.",
          figure: figure({ polys: [{ sommets: [[0, 0], [6, 0], [6, 3], [0, 4]], noms: ["A", "B", "C", "D"], fond: "#fde68a" }], hmax: 170 }),
          correction:
            "a) L'équerre colle en A et en B : 2 angles droits.\nb) En C, l'angle est plus ouvert qu'un angle droit : il est obtus.\nc) En D, l'angle est plus fermé qu'un angle droit : il est aigu.\nd) Un rectangle a 4 angles droits. Ce cadre n'en a que 2 : ce n'est pas un rectangle. Le menuisier doit le reprendre.\n⛔ Le piège : dire oui parce que le cadre « ressemble » à un rectangle. Seule l'équerre le prouve.\nRéponse : a) 2 ; b) obtus ; c) aigu ; d) non.",
          schema: ecranSeulement(figure({ polys: [{ sommets: [[0, 0], [6, 0], [6, 3], [0, 4]], noms: ["A", "B", "C", "D"], droits: [0, 1], arcs: [2, 3], fond: "#fde68a" }], hmax: 170 })),
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: "obtus" },
            { question: "c)", attendu: ["aigu", "aiguë"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          micros: ["angle_defi", "angle_type"],
        },
        {
          titre: "Le robot qui tourne",
          enonce: "Une roboticienne teste un robot. Il regarde vers le nord (N).\nUn quart de tour, c'est un angle droit.\na) Il fait un quart de tour vers la droite. Vers quelle direction regarde-t-il : N, E, S ou O ?\nb) Combien de quarts de tour vers la droite faut-il pour qu'il regarde à nouveau vers le nord ?\nc) Un demi-tour fait combien d'angles droits ?",
          figure: figure({
            polys: [],
            segments: [
              { de: [0, -2], vers: [0, 2] },
              { de: [-2, 0], vers: [2, 0] },
              { de: [0, 0], vers: [0, 1.3], couleur: ORANGE, epaisseur: 5 },
            ],
            ronds: [{ en: [0, 0] }],
            textes: [
              { en: [0, 2.5], t: "N" },
              { en: [2.5, 0], t: "E" },
              { en: [0, -2.5], t: "S" },
              { en: [-2.5, 0], t: "O" },
            ],
            hmax: 170,
            largeur: "max-w-[12rem] print:max-w-[9rem]",
          }),
          correction:
            "Je tourne dans le sens des aiguilles d'une montre : N, puis E, puis S, puis O.\na) Un quart de tour vers la droite depuis le nord : il regarde vers l'est, E.\nb) N → E (1), E → S (2), S → O (3), O → N (4). Il faut 4 quarts de tour : un tour complet.\nc) Un demi-tour, c'est N → S : 2 quarts de tour, donc 2 angles droits.\n⛔ Le piège : tourner vers la gauche et répondre O. La droite, c'est le sens des aiguilles d'une montre.\nRéponse : a) E (l'est) ; b) 4 ; c) 2.",
          reponses: [
            { question: "a)", attendu: ["E", "est", "l'est"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
          micros: ["angle_droit", "angle_defi"],
        },
        {
          titre: "Le toit de l'architecte",
          enonce: "Une architecte dessine le pignon d'un toit : le triangle ABC.\na) L'angle ACB, en haut, est-il aigu ou obtus ?\nb) L'angle CAB est-il aigu ou obtus ?\nc) Combien d'angles aigus a ce triangle ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [6, 0], [3, 1.732]], noms: ["A", "B", "C"], fond: "#fecaca" }], hmax: 150 }),
          correction:
            "a) Dans ACB, la lettre du milieu est C : le sommet est en haut. Cet angle est plus ouvert que l'équerre : il est obtus.\nb) Dans CAB, le sommet est A. Cet angle est très fermé : il est aigu.\nc) L'angle en B ressemble à celui en A : il est aigu aussi. Les angles aigus sont en A et en B : il y en a 2.\n⭐ Un triangle qui a un angle obtus a toujours ses deux autres angles aigus.\n⛔ Le piège : croire que le haut du toit est pointu, donc aigu. Je compare l'écart à l'équerre.\nRéponse : a) obtus ; b) aigu ; c) 2.",
          schema: ecranSeulement(figure({ polys: [{ sommets: [[0, 0], [6, 0], [3, 1.732]], noms: ["A", "B", "C"], arcs: [0, 1, 2], fond: "#fecaca" }], hmax: 150 })),
          reponses: [
            { question: "a)", attendu: "obtus" },
            { question: "b)", attendu: ["aigu", "aiguë"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
          micros: ["angle_type", "angle_notation", "angle_defi"],
        },
        {
          titre: "Le gâteau du pâtissier",
          enonce: "Un pâtissier a un gâteau carré. Il le coupe en deux, d'un coin à l'autre, le long du trait rouge.\na) Combien d'angles droits a le gâteau carré ?\nb) Combien d'angles droits a chaque morceau ?\nc) Les deux autres angles d'un morceau sont-ils aigus ou obtus ?\nd) Combien d'angles droits y a-t-il en tout dans les deux morceaux ?",
          figure: figure({ polys: [{ sommets: [[0, 0], [4, 0], [4, 4], [0, 4]], droits: [0, 1, 2, 3], fond: "#fef3c7" }], segments: [{ de: [0, 0], vers: [4, 4], couleur: ROUGE, epaisseur: 3 }], hmax: 150, largeur: "max-w-[12rem] print:max-w-[9rem]" }),
          correction:
            "a) Un carré a 4 angles droits.\nb) Le couteau passe par deux coins : il coupe ces deux angles droits en deux. Les deux autres coins restent entiers.\nChaque morceau est un triangle. Il garde 1 angle droit.\nc) Les deux autres angles sont des moitiés d'angle droit : ils sont plus petits qu'un angle droit. Ils sont aigus.\nd) 1 angle droit par morceau, 2 morceaux : 2 angles droits.\n⛔ Le piège : répondre 4 au d). Deux des angles droits du carré ont été coupés : ce ne sont plus des angles droits.\nRéponse : a) 4 ; b) 1 ; c) aigus ; d) 2.",
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: ["aigus", "aigu", "aiguë", "aiguës"] },
            { question: "d)", attendu: ["2", "deux"] },
          ],
          micros: ["angle_droit", "angle_defi"],
        },
      ],
    },
  ],
};
