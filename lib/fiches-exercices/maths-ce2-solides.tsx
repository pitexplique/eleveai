// ─── Fiche d'exercices : les solides (CE2) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `solides` du coach CE2
// (5 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/solides.bank.ts` : nommer le cube, la
// boule, le pavé droit, le cône, la pyramide et le cylindre ; les décrire avec
// faces, arêtes et sommets ; la nature des faces d'une pyramide ; le patron du
// cube ; IDENTIFIER un solide dessiné en perspective, arêtes cachées en
// pointillés (note du programme de CE2).
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : pas de volume (le cm³ arrive au
// cycle 3), pas de relation d'inclusion (jamais « un cube est-il un pavé ? »),
// aucune perspective à construire. Pas de prisme : il n'est pas dans la liste.
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot.
// Phrases de 18 mots au plus.
//
// LE PIÈGE DE LA NOTION (celui de la banque) : les faces de la pyramide.
// « Pyramide = triangles » fait oublier la base : une pyramide à base carrée a
// 5 faces, 4 triangles ET 1 carré. Le second : le cube a 8 sommets et 12
// arêtes, et l'élève dit 8 pour les deux.
//
// Les pièges nommés : la pyramide appelée « triangle » (1), le cône appelé
// « triangle » (2), le sommet confondu avec l'arête (3), compter 3 faces
// parce qu'on en voit 3 (4), oublier la base (5, 18), les 6 carrés mal
// placés (6), le cylindre qui roule cru sans face plate (7), oublier le
// sommet caché (8), compter 8 arêtes au cube (9), 3 faces à la pyramide à
// base triangulaire (10), le pavé et le cube mélangés (11), la face voisine
// prise pour la face d'en face (12), les arêtes du sommet oubliées (14), deux
// faces du même côté (15), « toutes les faces d'une pyramide sont des
// triangles » (16), oublier les arêtes du dessous (17), compter les faces
// collées (19), compter 30 cartons pour 30 carrés (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (1 à 16), objets de la maison (2),
// chocolaterie (17), monuments (18), jeux de société (19), déménagement
// (20). Métiers : chocolatière (17), laveur de vitres (18), déménageur (20).
// Aucun contexte réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 18 — la pyramide du Louvre, à Paris, est une pyramide de verre à
//     base carrée, dessinée par l'architecte Ieoh Ming Pei et ouverte en 1989
//     (Wikipédia, « Pyramide du Louvre »). Ses 4 faces triangulaires sont
//     vitrées. Le laveur de vitres est un MODÈLE.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : les solides en perspective de `dessins-geometrie-cm1.tsx`
// (`pave`, `pyramide`, `pyramideN`, `cylindre`, `cone`, `boule`, arêtes
// cachées en pointillés) et les patrons en `cases`. Le dessin montre la
// question, jamais la réponse.
//
// Micro-compétences : ce2_solide_reconnaitre (1, 2, 7, 11), ce2_solide_decrire
// (3, 4, 8, 9, 13, 16, 17, 19), ce2_solide_faces_pyramide (5, 10, 13, 14, 16,
// 18), ce2_solide_patron (6, 12, 15, 20), ce2_solide_defi (17, 18, 19, 20).
// 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, VIOLET, boule, cases, cone, cylindre, dessin, pave, pyramide, pyramideN, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

/** Un cube seul, arêtes cachées en pointillés. */
const cube = (c = BLEU) =>
  dessin({
    l: 7,
    h: 6,
    max: "max-w-[11rem] print:max-w-[8rem]",
    label: "Un cube en perspective, arêtes cachées en pointillés",
    formes: pave([1, 5.2], 3.5, 3.5, 3.5, c),
  });

/** Une pyramide à base carrée seule. */
const pyramideCarree = () =>
  dessin({
    l: 7,
    h: 6,
    max: "max-w-[11rem] print:max-w-[8rem]",
    label: "Une pyramide à base carrée en perspective, arêtes cachées en pointillés",
    formes: pyramide([1, 5.3], 3.6, 4.2, VERT),
  });

/** Des carrés en pointillés, avec une lettre au milieu : les places possibles. */
const places = (liste: [number, number, string][]): Forme[] =>
  liste.flatMap(([x, y, l]) => [
    { t: "poly", pts: [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]], c: ROUGE, pt: true, w: 1.8 } as Forme,
    { t: "texte", en: [x + 0.5, y + 0.5], txt: l, c: ROUGE } as Forme,
  ]);

/** Des cases qui portent une lettre (patron à faces nommées). */
const casesNommees = (liste: [number, number, string][], fill: string): Forme[] => [
  ...cases(liste.map(([x, y]) => [x, y] as P), fill),
  ...liste.map(([x, y, l]) => ({ t: "texte", en: [x + 0.5, y + 0.5], txt: l }) as Forme),
];

export const exercicesSolidesCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "solides",
  titre: "Les solides",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer le cube, le pavé, la boule, le cylindre, le cône et la pyramide. Compter les faces, les arêtes et les sommets, même cachés. Trouver la base d'une pyramide. Choisir un patron de cube. Une chocolatière, la pyramide du Louvre, des dés et un déménageur. Un rappel avant chaque niveau. Cherche d'abord sur le dessin, ou avec un vrai objet. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je pense à l'objet dans ma main, et je regarde aussi les pointillés.",
      rappel: [
        "Une face est une partie plate. Une arête est le bord entre deux faces. Un sommet est un coin pointu.",
        "Sur le dessin, les pointillés montrent les arêtes cachées, derrière le solide.",
        "Le cube a 6 faces carrées. Le pavé a 6 faces rectangles. La pyramide a une base et des faces triangles.",
      ],
      exercices: [
        {
          enonce: "Écris le nom de chaque solide.\na) le solide 1\nb) le solide 2\nc) le solide 3\nd) le solide 4",
          figure: dessin({
            l: 11,
            h: 12,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Quatre solides numérotés de 1 à 4",
            formes: [
              ...pave([0.6, 4.6], 3, 3, 3, BLEU),
              { t: "texte", en: [2.1, 5.5], txt: "1", taille: 16 },
              ...cylindre([8, 4.6], 1.3, 0.4, 3.8, ORANGE),
              { t: "texte", en: [8, 5.6], txt: "2", taille: 16 },
              ...pyramide([0.8, 10.6], 3, 4, VERT),
              { t: "texte", en: [2.3, 11.5], txt: "3", taille: 16 },
              ...boule([8.3, 8.9], 1.7, VIOLET),
              { t: "texte", en: [8.3, 11.5], txt: "4", taille: 16 },
            ],
          }),
          correction:
            "Je regarde les faces et la forme de chaque solide.\na) Le solide 1 a des faces carrées, toutes pareilles : c'est un cube.\nb) Le solide 2 a deux disques, en haut et en bas, et il peut rouler : c'est un cylindre.\nc) Le solide 3 a une base carrée et des faces triangles qui se rejoignent en haut : c'est une pyramide.\nd) Le solide 4 est rond de partout : c'est une boule.\n⛔ Le piège du c) : dire « triangle ». Un triangle est une figure plate. Le solide, c'est une pyramide.\nRéponse : a) cube ; b) cylindre ; c) pyramide ; d) boule.",
          micros: ["ce2_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["cube", "un cube", "le cube"] },
            { question: "b)", attendu: ["cylindre", "un cylindre", "le cylindre"] },
            { question: "c)", attendu: ["pyramide", "une pyramide", "la pyramide"] },
            { question: "d)", attendu: ["boule", "une boule", "la boule", "sphère"] },
          ],
        },
        {
          enonce: "Quel solide a la forme de chaque objet ?\nÉcris : pavé, cône, boule ou cylindre.\na) une boîte à chaussures\nb) un cornet de glace\nc) un ballon de foot\nd) une boîte de conserve",
          correction:
            "J'imagine chaque objet dans ma main.\na) La boîte à chaussures a 6 faces rectangles : c'est un pavé.\nb) Le cornet de glace a une pointe et un bord rond : c'est un cône.\nc) Le ballon est rond de partout : c'est une boule.\nd) La boîte de conserve a deux disques et elle roule : c'est un cylindre.\n⛔ Le piège du b) : dire « triangle » parce que le cornet est pointu. De côté, il ressemble à un triangle, mais c'est un solide : un cône.\nRéponse : a) pavé ; b) cône ; c) boule ; d) cylindre.",
          micros: ["ce2_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["pavé", "pave", "un pavé", "pavé droit", "un pavé droit"] },
            { question: "b)", attendu: ["cône", "cone", "un cône"] },
            { question: "c)", attendu: ["boule", "une boule", "sphère"] },
            { question: "d)", attendu: ["cylindre", "un cylindre"] },
          ],
        },
        {
          enonce: "Regarde le cube.\nÉcris : face, arête ou sommet.\na) le point marqué 1\nb) le trait marqué 2\nc) la partie coloriée 3",
          figure: dessin({
            l: 8.4,
            h: 6,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Un cube : un coin marqué 1, un bord marqué 2, une face coloriée 3",
            formes: [
              { t: "poly", pts: [[1, 5.5], [4.5, 5.5], [4.5, 2], [1, 2]], c: BLEU, fill: ORANGE_CLAIR },
              ...pave([1, 5.5], 3.5, 3.5, 3.5, BLEU),
              { t: "texte", en: [2.75, 3.75], txt: "3", taille: 18, c: ORANGE },
              { t: "point", en: [6.6, 0.43], c: ROUGE, rond: true },
              { t: "texte", en: [7.4, 0.6], txt: "1", c: ROUGE, taille: 16 },
              { t: "seg", de: [4.5, 5.5], vers: [6.6, 3.93], c: ROUGE, w: 4 },
              { t: "texte", en: [6.2, 5.1], txt: "2", c: ROUGE, taille: 16 },
            ],
          }),
          correction:
            "Je me rappelle les trois mots.\na) Le 1 est un coin pointu, là où plusieurs bords se rejoignent : c'est un sommet.\nb) Le 2 est un bord, entre deux faces : c'est une arête.\nc) Le 3 est une partie plate : c'est une face.\n⛔ Le piège : confondre sommet et arête. Le sommet est un point, l'arête est un trait.\nRéponse : a) sommet ; b) arête ; c) face.",
          micros: ["ce2_solide_decrire"],
          reponses: [
            { question: "a)", attendu: ["sommet", "un sommet"] },
            { question: "b)", attendu: ["arête", "arete", "une arête"] },
            { question: "c)", attendu: ["face", "une face"] },
          ],
        },
        {
          enonce: "Regarde le cube.\na) Combien de faces a un cube ?\nb) Quelle forme ont ses faces ? Écris : carré, rectangle ou triangle.",
          figure: cube(),
          correction:
            "a) Je compte les faces, même cachées. Devant et derrière : 2. Dessus et dessous : 2. À gauche et à droite : 2.\n2 + 2 + 2 = 6 faces.\nb) Toutes les faces du cube sont des carrés, tous pareils.\n⛔ Le piège du a) : répondre 3, parce qu'on ne voit que 3 faces sur le dessin. Les autres sont cachées derrière.\nRéponse : a) 6 ; b) carré.",
          micros: ["ce2_solide_decrire"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["carré", "carrés", "un carré", "des carrés", "carre"] },
          ],
        },
        {
          enonce: "Regarde la pyramide.\na) Combien a-t-elle de faces triangles ?\nb) Quelle forme a sa base ? Écris : carré, rond ou triangle.\nc) Combien de faces a-t-elle en tout ?",
          figure: pyramideCarree(),
          correction:
            "a) Autour du sommet du haut, je compte les faces triangles : devant, à droite, derrière, à gauche. 4 triangles.\nb) La base est la face du dessous. Elle a 4 côtés égaux et 4 angles droits : c'est un carré.\nc) 4 triangles + 1 carré = 5 faces.\n⛔ Le piège du c) : répondre 4, en oubliant la base. La face du dessous compte aussi.\nRéponse : a) 4 ; b) carré ; c) 5.",
          micros: ["ce2_solide_faces_pyramide"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["carré", "un carré", "carrée", "carre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Un patron, c'est le carton à plier pour fabriquer un solide.\nQuel dessin est un patron de cube ? Écris la lettre.",
          figure: dessin({
            l: 13,
            h: 4.8,
            u: 26,
            label: "Trois assemblages de carrés A, B et C",
            formes: [
              ...cases([[1.5, 0.5], [0.5, 1.5], [1.5, 1.5], [2.5, 1.5], [3.5, 1.5], [1.5, 2.5]], BLEU_CLAIR),
              { t: "texte", en: [2.5, 4.2], txt: "A" },
              ...cases([[5.5, 1], [6.5, 1], [7.5, 1], [5.5, 2], [6.5, 2], [7.5, 2]], ORANGE_CLAIR),
              { t: "texte", en: [7, 4.2], txt: "B" },
              ...cases([[10.5, 0.5], [9.5, 1.5], [10.5, 1.5], [11.5, 1.5], [10.5, 2.5]], VERT_CLAIR),
              { t: "texte", en: [11, 4.2], txt: "C" },
            ],
          }),
          correction:
            "Un cube a 6 faces : il faut 6 carrés, et ils doivent se replier sans se chevaucher.\nC n'a que 5 carrés : il manque une face.\nB a 6 carrés, mais en 2 rangées de 3. En pliant, deux carrés tombent au même endroit : le cube ne ferme pas.\nA : 4 carrés en bande font le tour, un au-dessus fait le dessus, un en dessous fait le dessous. Le cube se ferme.\n⛔ Le piège : choisir B parce qu'il a bien 6 carrés. Il faut aussi qu'ils soient bien placés.\nRéponse : A.",
          micros: ["ce2_solide_patron"],
          reponses: [{ attendu: ["A", "le patron A"] }],
        },
        {
          enonce: "Quel solide n'a aucune face plate ? Écris la lettre.\nA) le cube   B) la boule   C) le cylindre",
          figure: dessin({
            l: 13,
            h: 6,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un cube A, une boule B et un cylindre C",
            formes: [
              ...pave([0.6, 4.4], 2.6, 2.6, 2.6, BLEU),
              { t: "texte", en: [1.9, 5.4], txt: "A" },
              ...boule([6.5, 3.2], 1.6, VIOLET),
              { t: "texte", en: [6.5, 5.4], txt: "B" },
              ...cylindre([11, 4.4], 1.2, 0.38, 3.4, ORANGE),
              { t: "texte", en: [11, 5.4], txt: "C" },
            ],
          }),
          correction:
            "Je cherche une partie plate sur chaque solide.\nLe cube a 6 faces plates.\nLe cylindre roule, mais il a 2 faces plates : le disque du haut et celui du bas. Je peux le poser debout.\nLa boule est ronde de partout : elle n'a aucune face plate.\n⛔ Le piège : choisir le cylindre parce qu'il roule. Il roule sur le côté, mais tient debout sur ses disques.\nRéponse : B.",
          micros: ["ce2_solide_reconnaitre", "ce2_solide_decrire"],
          reponses: [{ attendu: ["B", "B) la boule", "la boule", "boule"] }],
        },
        {
          enonce: "Regarde le cube. Les pointillés sont cachés derrière.\na) Combien de sommets vois-tu au bout de traits pleins seulement ?\nb) Combien de sommets a le cube en tout ?",
          figure: cube(VERT),
          correction:
            "a) Je compte les coins où arrivent des traits pleins : 4 devant, puis 3 derrière en haut et à droite. 4 + 3 = 7.\nb) Il reste un coin caché, derrière en bas à gauche : là où les trois pointillés se rejoignent.\n7 + 1 = 8 sommets. C'est aussi 4 en haut et 4 en bas.\n⛔ Le piège du b) : répondre 7, en oubliant le sommet caché. Les pointillés montrent qu'il existe.\nRéponse : a) 7 ; b) 8.",
          micros: ["ce2_solide_decrire"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je compte avec méthode : par étage, ou autour du sommet.",
      rappel: [
        "Le cube et le pavé : 6 faces, 8 sommets, 12 arêtes.",
        "Pour compter les arêtes du cube : 4 en haut, 4 en bas, 4 debout.",
        "Une pyramide : une base, et autant de faces triangles que la base a de côtés.",
      ],
      exercices: [
        {
          enonce: "Regarde le cube.\na) Combien d'arêtes a le cube ?\nb) Combien de sommets a le cube ?",
          figure: cube(ORANGE),
          correction:
            "a) Je compte les arêtes par étage, même en pointillés.\nLe carré du haut : 4 arêtes. Le carré du bas : 4 arêtes. Les arêtes debout, qui les relient : 4.\n4 + 4 + 4 = 12 arêtes.\nb) Les coins : 4 en haut et 4 en bas. 4 + 4 = 8 sommets.\n⛔ Le piège : répondre 8 pour les arêtes. 8, ce sont les coins. Les arêtes sont les traits : il y en a 12.\nRéponse : a) 12 ; b) 8.",
          micros: ["ce2_solide_decrire"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Voici une pyramide à base triangle.\na) Combien de faces a-t-elle en tout ?\nb) Quelle forme ont toutes ses faces ?\nc) Combien de sommets a-t-elle ?",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Une pyramide à base triangle en perspective, arêtes cachées en pointillés",
            formes: [
              { t: "seg", de: [0.8, 4.9], vers: [5.8, 5.4], c: VIOLET },
              { t: "seg", de: [3.4, 0.6], vers: [0.8, 4.9], c: VIOLET },
              { t: "seg", de: [3.4, 0.6], vers: [5.8, 5.4], c: VIOLET },
              { t: "seg", de: [0.8, 4.9], vers: [4.6, 3.7], c: VIOLET, pt: true, w: 1.5 },
              { t: "seg", de: [5.8, 5.4], vers: [4.6, 3.7], c: VIOLET, pt: true, w: 1.5 },
              { t: "seg", de: [3.4, 0.6], vers: [4.6, 3.7], c: VIOLET, pt: true, w: 1.5 },
            ],
          }),
          correction:
            "a) La base est un triangle : elle a 3 côtés. Sur chaque côté, une face triangle monte au sommet : 3 faces.\nAvec la base : 3 + 1 = 4 faces.\nb) Les 3 faces du côté sont des triangles, et la base aussi : toutes sont des triangles.\nc) Les 3 coins de la base, et le sommet du haut : 3 + 1 = 4 sommets.\n⛔ Le piège du a) : répondre 3, en oubliant la base. Elle est triangle, elle aussi.\nRéponse : a) 4 ; b) triangle ; c) 4.",
          micros: ["ce2_solide_faces_pyramide"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["triangle", "triangles", "des triangles", "un triangle"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Devinettes : qui suis-je ?\na) J'ai 6 faces. Mes faces sont des rectangles.\nb) J'ai 2 faces plates en forme de disque. Je roule.\nc) J'ai 1 sommet et 1 face plate toute ronde.",
          figure: dessin({
            l: 18,
            h: 6,
            max: "max-w-[20rem] print:max-w-[14rem]",
            label: "Cinq solides pour s'aider : un cône, un cube, un pavé, un cylindre et une boule",
            formes: [
              ...cone([1.8, 5], 1.3, 0.4, 4, VERT),
              ...pave([3.8, 5], 2.4, 2.4, 2.4, VIOLET),
              ...pave([8.2, 5], 3.2, 1.8, 1.6, BLEU),
              ...cylindre([13.6, 5], 1, 0.32, 3.6, ORANGE),
              ...boule([16.4, 3.6], 1.3, ROUGE),
            ],
          }),
          correction:
            "Je lis chaque indice, et je cherche le solide qui va avec.\na) 6 faces, toutes des rectangles : c'est le pavé.\nb) 2 disques plats, et il roule : c'est le cylindre.\nc) Une seule pointe, et un disque plat dessous : c'est le cône.\n⛔ Le piège du a) : dire « cube ». Le cube a des faces carrées. Des faces rectangles, c'est le pavé.\nRéponse : a) pavé ; b) cylindre ; c) cône.",
          micros: ["ce2_solide_reconnaitre", "ce2_solide_decrire"],
          reponses: [
            { question: "a)", attendu: ["pavé", "pave", "un pavé", "pavé droit", "le pavé"] },
            { question: "b)", attendu: ["cylindre", "un cylindre", "le cylindre"] },
            { question: "c)", attendu: ["cône", "cone", "un cône", "le cône"] },
          ],
        },
        {
          enonce: "Je plie ce patron pour faire un cube.\na) Quelle face sera juste en face de C, de l'autre côté du cube ?\nb) Quelle face sera juste en face de B ?",
          figure: dessin({
            l: 5,
            h: 6,
            u: 30,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un patron de cube en croix, faces nommées A, B, C, D, E, F",
            formes: casesNommees(
              [
                [2, 0.5, "A"],
                [1, 1.5, "B"],
                [2, 1.5, "C"],
                [3, 1.5, "D"],
                [2, 2.5, "E"],
                [2, 3.5, "F"],
              ],
              BLEU_CLAIR,
            ),
          }),
          correction:
            "La bande debout A, C, E, F fait le tour du cube, comme une ceinture.\nDans une bande de 4 faces, une face sur deux se fait face : A avec E, C avec F.\na) Donc F sera en face de C.\nb) B et D sont de chaque côté de C. En pliant, B monte d'un côté, D de l'autre : ils se font face.\n⛔ Le piège : répondre A ou E pour C. Ces faces touchent C : elles sont à côté, pas en face.\nRéponse : a) F ; b) D.",
          micros: ["ce2_solide_patron"],
          reponses: [
            { question: "a)", attendu: ["F", "la face F"] },
            { question: "b)", attendu: ["D", "la face D"] },
          ],
        },
        {
          enonce: "Compare un cube et une pyramide à base carrée.\na) Combien de faces a le cube ?\nb) Combien de faces a la pyramide ?\nc) Combien de faces de plus a le cube ?",
          figure: dessin({
            l: 12,
            h: 6,
            max: "max-w-[17rem] print:max-w-[12rem]",
            label: "Un cube et une pyramide à base carrée",
            formes: [...pave([0.6, 5.2], 3.2, 3.2, 3.2, BLEU), ...pyramide([6.6, 5.3], 3.2, 4.2, VERT)],
          }),
          correction:
            "a) Le cube : devant, derrière, dessus, dessous, gauche, droite. 6 faces.\nb) La pyramide : 4 faces triangles et 1 base carrée. 4 + 1 = 5 faces.\nc) 6 − 5 = 1. Le cube a 1 face de plus.\n⛔ Le piège du b) : compter 4 faces, seulement les triangles. La base du dessous est une face.\nRéponse : a) 6 ; b) 5 ; c) 1.",
          micros: ["ce2_solide_decrire", "ce2_solide_faces_pyramide"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["1", "une", "un"] },
          ],
        },
        {
          enonce: "Regarde la pyramide à base carrée.\na) Combien de sommets a-t-elle ?\nb) Combien d'arêtes partent du sommet du haut ?\nc) Combien d'arêtes a-t-elle en tout ?",
          figure: pyramideCarree(),
          correction:
            "a) Les 4 coins de la base carrée, et le sommet du haut : 4 + 1 = 5 sommets.\nb) Du sommet du haut, une arête descend vers chaque coin de la base : 4 arêtes.\nc) La base carrée a aussi 4 arêtes, une par côté. 4 + 4 = 8 arêtes.\n⛔ Le piège du c) : compter seulement les 4 arêtes qui montent. Les côtés de la base sont aussi des arêtes.\nRéponse : a) 5 ; b) 4 ; c) 8.",
          micros: ["ce2_solide_faces_pyramide"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Ce patron de cube n'est pas fini.\na) Combien de carrés faut-il pour un patron de cube ?\nb) Où ajouter le dernier carré : en A, en B ou en C ?",
          figure: dessin({
            l: 4,
            h: 6.6,
            u: 30,
            max: "max-w-[9rem] print:max-w-[7rem]",
            label: "Cinq carrés d'un patron de cube, et trois places A, B, C en pointillés",
            formes: [...cases([[1.5, 0.5], [1.5, 1.5], [1.5, 2.5], [1.5, 3.5], [0.5, 1.5]], ORANGE_CLAIR), ...places([[2.5, 1.5, "A"], [0.5, 2.5, "B"], [1.5, 4.5, "C"]])],
          }),
          correction:
            "a) Un cube a 6 faces : il faut 6 carrés. Il y en a 5 : il en manque 1.\nb) La bande de 4 carrés fait le tour du cube. Le carré de gauche fermera un bout.\nEn A, le nouveau carré se plie de l'autre côté : il ferme l'autre bout.\nEn B, il se plierait du même côté que le carré de gauche : deux faces au même endroit.\nEn C, la bande aurait 5 carrés : le 5e recouvrirait le 1er.\n⛔ Le piège : choisir B, collé au carré de gauche. Deux carrés du même côté se superposent.\nRéponse : a) 6 ; b) A.",
          micros: ["ce2_solide_patron"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["A", "en A"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) Le cylindre a 2 faces plates.\nb) La boule a un sommet.\nc) Le cône a un sommet.\nd) Toutes les faces d'une pyramide à base carrée sont des triangles.",
          correction:
            "Je pense à chaque solide dans ma main.\na) Le cylindre a un disque en haut et un disque en bas : 2 faces plates. Vrai.\nb) La boule est ronde de partout, sans aucune pointe. Faux.\nc) Le cône a une pointe en haut : c'est son sommet. Vrai.\nd) Sa base est un carré, pas un triangle. Faux.\n⛔ Le piège du d) : penser « pyramide = triangles ». La base n'est pas toujours un triangle.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["ce2_solide_decrire", "ce2_solide_faces_pyramide"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je nomme le solide, je compte ses faces, arêtes ou sommets, puis je calcule.",
      rappel: [
        "Cube : 6 faces, 8 sommets, 12 arêtes. Pyramide à base carrée : 5 faces, 5 sommets, 8 arêtes.",
        "Un patron de cube : 6 carrés bien placés.",
        "Je relis la question : faces, arêtes ou sommets ?",
      ],
      exercices: [
        {
          titre: "La boîte de la chocolatière",
          enonce: "Une chocolatière range ses chocolats dans une boîte en forme de cube. Chaque arête mesure 10 cm.\na) Combien d'arêtes a la boîte ?\nb) Elle colle un ruban sur chaque arête. Combien de cm de ruban lui faut-il ?\nc) Elle colle une perle sur chaque sommet. Combien de perles ?",
          figure: cube(ROUGE),
          correction:
            "a) La boîte est un cube : 4 arêtes en haut, 4 en bas, 4 debout. 12 arêtes.\nb) 12 arêtes de 10 cm : 12 × 10 = 120 cm de ruban.\nc) Un cube a 8 sommets : 4 en haut et 4 en bas. 8 perles.\n⛔ Le piège du b) : oublier les arêtes du dessous, qu'on ne voit pas. Le ruban passe aussi par-dessous.\nRéponse : a) 12 ; b) 120 ; c) 8.",
          micros: ["ce2_solide_decrire", "ce2_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: "120", unite: "cm" },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "La pyramide du Louvre",
          enonce: "À Paris, devant le musée du Louvre, il y a une grande pyramide de verre. Sa base est posée au sol.\na) Sa base a 4 côtés égaux et 4 angles droits. Quelle est sa forme ?\nb) Un laveur de vitres lave les faces triangles. Combien de faces doit-il laver ?\nc) Combien de sommets a cette pyramide ?",
          figure: dessin({
            l: 8,
            h: 6,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Une pyramide de verre à base carrée, posée au sol",
            formes: [{ t: "seg", de: [0.2, 5.4], vers: [7.8, 5.4], c: "#94a3b8", w: 3 }, ...pyramide([1.2, 5.3], 3.8, 4.4, "#0369a1")],
          }),
          correction:
            "a) 4 côtés égaux et 4 angles droits : la base est un carré.\nb) Autour du sommet, il y a une face triangle sur chaque côté du carré : 4 faces.\nLa base est au sol : le laveur ne la lave pas.\nc) Les 4 coins de la base, et la pointe du haut : 4 + 1 = 5 sommets.\n⛔ Le piège du c) : compter 4 sommets, seulement ceux qui touchent le sol. La pointe en haut est aussi un sommet.\nRéponse : a) carré ; b) 4 ; c) 5.",
          micros: ["ce2_solide_faces_pyramide", "ce2_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré", "carrée", "carre"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Les dés collés",
          enonce: "Un dé est un cube. Lina colle deux dés, face contre face.\na) Combien de faces ont les deux dés ensemble ?\nb) Combien de faces ne sont pas collées ?\nc) Combien de sommets ont les deux dés ensemble ?",
          figure: dessin({
            l: 11,
            h: 5,
            max: "max-w-[16rem] print:max-w-[11rem]",
            label: "Deux dés cubiques collés côte à côte",
            formes: [
              { t: "poly", pts: [[0.8, 4.6], [4, 4.6], [4, 1.4], [0.8, 1.4]], c: BLEU, fill: BLEU_CLAIR },
              { t: "poly", pts: [[4, 4.6], [7.2, 4.6], [7.2, 1.4], [4, 1.4]], c: ORANGE, fill: ORANGE_CLAIR },
              ...pave([0.8, 4.6], 6.4, 3.2, 3.2, ENCRE),
              { t: "seg", de: [4, 1.4], vers: [5.92, -0.04], c: ENCRE },
              { t: "point", en: [2.4, 3], c: ENCRE, rond: true },
              { t: "point", en: [5, 2], c: ENCRE, rond: true },
              { t: "point", en: [6.2, 4], c: ENCRE, rond: true },
            ],
          }),
          correction:
            "a) Un dé a 6 faces. Deux dés : 6 + 6 = 12 faces.\nb) Les dés se touchent par une face chacun : 2 faces sont collées, cachées au milieu.\n12 − 2 = 10 faces ne sont pas collées.\nc) Un dé a 8 sommets. Deux dés : 8 + 8 = 16 sommets.\n⛔ Le piège du b) : enlever une seule face. La face du dé bleu ET celle du dé orange sont collées : 2 faces.\nRéponse : a) 12 ; b) 10 ; c) 16.",
          micros: ["ce2_solide_decrire", "ce2_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["10", "dix"] },
            { question: "c)", attendu: ["16", "seize"] },
          ],
        },
        {
          titre: "Les cartons du déménageur",
          enonce: "Un déménageur fabrique des cartons en forme de cube. Pour chaque carton, il découpe un patron.\na) Combien de carrés de carton faut-il pour un patron ?\nb) Il a 30 carrés. Combien de cartons peut-il fabriquer ?\nc) Il met un coin de protection sur chaque sommet. Combien de coins pour tous les cartons ?",
          figure: dessin({
            l: 5,
            h: 4.4,
            u: 28,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un patron de cube en croix",
            formes: cases([[1.5, 0.4], [0.5, 1.4], [1.5, 1.4], [2.5, 1.4], [3.5, 1.4], [1.5, 2.4]], "#fde68a", "#92400e"),
          }),
          correction:
            "a) Un cube a 6 faces : le patron a 6 carrés.\nb) Je cherche combien de fois 6 dans 30. 6 × 5 = 30, donc 30 ÷ 6 = 5 cartons.\nc) Chaque cube a 8 sommets. 5 cartons : 8 × 5 = 40 coins.\n⛔ Le piège du b) : répondre 30 cartons, un par carré. Un carton demande 6 carrés.\nRéponse : a) 6 ; b) 5 ; c) 40.",
          micros: ["ce2_solide_patron", "ce2_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["40", "quarante"] },
          ],
        },
      ],
    },
  ],
};
