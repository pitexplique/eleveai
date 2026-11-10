// ─── Fiche d'exercices : les solides (CM1) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : feuille interactive de la notion `solide` du coach CM1 (6
// micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Chaque exercice a son champ `reponses`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/solides.bank.ts`
// et la carte mentale `cm1/solide` : cube, pavé droit, cylindre, cône,
// pyramide, boule ; faces, arêtes, sommets ; forme des faces ; patrons ; le
// prisme droit (5 faces, 9 arêtes, 6 sommets) ; compter dans l'ordre.
// ⛔ CM1 : AUCUNE construction à rendre. Les patrons se reconnaissent en QCM ;
// on ne compte les faces que des solides à faces planes (on évite « combien de
// faces a un cylindre », où la surface courbe trouble le compte).
//
// Les pièges nommés : le cube pris pour un carré (1, 8), la boule « sphère »
// (2), compter seulement les arêtes visibles (3, 12, 17), le pavé « à faces
// carrées » (4), le cylindre qui roule (5), la base oubliée (6, 20), six carrés
// en ligne (7), le carré « solide » (8), le prisme à 6 faces (9), la pointe
// oubliée (10, 18, 20), le patron du pavé pris pour celui du cube (11), les
// devinettes trop vite lues (13), les cubes cachés (14), le patron de la
// pyramide (15), les arêtes de même longueur (16), la face opposée voisine (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (2, 19), objets du quotidien (2, 4,
// 16), jeux de construction (14), confiserie (17), maquettes (18), charpente
// (20).
// Métiers : confiseur (17), maquettiste (18), fabricante de jeux (19),
// charpentier (20).
//
// ⭐ UNE RÈGLE RÉELLE, dite dans l'énoncé : sur un dé classique à six faces,
// deux faces opposées font toujours 7 en tout (1 et 6, 2 et 5, 3 et 4).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessins-geometrie-cm1.tsx` (perspective cavalière, arêtes
// cachées en pointillés ; patrons sur quadrillage).
//
// Micro-compétences : solide_reconnaitre (1, 2, 5, 8, 13), solide_sommet_arete_
// face (3, 10, 12, 16, 17, 18), solide_face (4, 6, 8, 13), solide_patron (7,
// 11, 15, 19), solide_prisme (9, 13), solide_defi (14, 17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ENCRE, ORANGE, ORANGE_CLAIR, VERT, VERT_CLAIR, VIOLET, cases, cylindre, dessin, ecranSeulement, pave, prisme, pyramide, pyramideN, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

/** Un escalier de petits cubes, une rangée de profondeur : `hauteurs` par colonne. */
const escalier = (hauteurs: number[]): Forme[] => {
  const k: P = [0.6, -0.45];
  const f: Forme[] = [];
  const bas = Math.max(...hauteurs) + 1;
  hauteurs.forEach((h, i) => {
    for (let j = 0; j < h; j++) {
      const x = 0.5 + i, y = bas - j;
      const A: P = [x, y], B: P = [x + 1, y], C: P = [x + 1, y - 1], D: P = [x, y - 1];
      const t = (q: P): P => [q[0] + k[0], q[1] + k[1]];
      f.push({ t: "poly", pts: [A, B, C, D], fill: ORANGE_CLAIR, c: ENCRE });
      if (j === h - 1) f.push({ t: "poly", pts: [D, C, t(C), t(D)], fill: "#fff7ed", c: ENCRE });
      if (i === hauteurs.length - 1 || hauteurs[i + 1] <= j) f.push({ t: "poly", pts: [B, t(B), t(C), C], fill: "#fdba74", c: ENCRE });
    }
  });
  return f;
};

/** Le patron en croix d'un cube, avec une étiquette par face. */
const croix = (x0: number, y0: number, etiquettes: string[], fill = BLEU_CLAIR): Forme[] => {
  const pos: P[] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
  return [
    ...cases(pos.map(([x, y]) => [x0 + x, y0 + y] as P), fill),
    ...pos.map(([x, y], i) => ({ t: "texte" as const, en: [x0 + x + 0.5, y0 + y + 0.5] as P, txt: etiquettes[i] ?? "", taille: 16 })),
  ];
};

export const exercicesSolideCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "solide",
  titre: "Les solides",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un cube, un pavé droit, un cylindre, un cône, une pyramide, une boule. Compter les faces, les arêtes et les sommets, sans oublier ceux qu'on ne voit pas. Dire la forme des faces. Reconnaître un patron. Un dé, une boîte à chaussures, une brique de lait, des cubes empilés, une boîte de bonbons, une maquette et le toit d'un kiosque. Un rappel de cours avant chaque niveau. Cherche d'abord sur le dessin, ou avec un vrai objet dans la main. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte dans l'ordre : devant, puis derrière.",
      rappel: [
        "Une face est une partie plate. Une arête est le bord entre 2 faces. Un sommet est un coin pointu.",
        "Un cube a 6 faces carrées, 12 arêtes et 8 sommets. Un pavé droit aussi, mais ses faces sont des rectangles.",
        "Sur un dessin, les arêtes cachées sont en pointillés : je les compte aussi.",
        "Un patron, c'est le solide déplié à plat.",
      ],
      exercices: [
        {
          enonce: "Donne le nom de chaque solide.\na) le solide 1\nb) le solide 2\nc) le solide 3",
          figure: dessin({
            l: 15,
            h: 6.3,
            label: "Trois solides numérotés 1, 2 et 3",
            formes: [
              ...pave([0.7, 5], 3, 3, 3),
              { t: "texte", en: [2.6, 5.8], txt: "1" },
              ...cylindre([8, 5], 1.4, 0.45, 3.8),
              { t: "texte", en: [8, 5.95], txt: "2" },
              ...pyramide([10.5, 5], 2.6, 3.6),
              { t: "texte", en: [12, 5.8], txt: "3" },
            ],
          }),
          correction:
            "Je regarde la forme des faces et s'il y a des parties rondes.\na) Le solide 1 a 6 faces carrées, toutes pareilles : c'est un cube.\nb) Le solide 2 a deux disques, en haut et en bas, et un côté arrondi : c'est un cylindre.\nc) Le solide 3 a une base carrée et des faces triangles qui se rejoignent en une pointe : c'est une pyramide.\n⛔ Le piège : a) répondre « carré ». Le carré est une figure plate. Le cube est un solide qu'on peut tenir : ses faces sont des carrés.\nRéponse : a) cube ; b) cylindre ; c) pyramide.",
          reponses: [
            { question: "a)", attendu: ["cube", "un cube", "le cube"] },
            { question: "b)", attendu: ["cylindre", "un cylindre", "le cylindre"] },
            { question: "c)", attendu: ["pyramide", "une pyramide", "la pyramide", "pyramide à base carrée"] },
          ],
          micros: ["solide_reconnaitre"],
        },
        {
          enonce: "Quel solide ressemble à chaque objet ?\nÉcris : cube, cylindre, cône ou boule.\na) un dé à jouer\nb) une boîte de conserve\nc) un ballon de football\nd) un cornet de glace",
          correction:
            "Je pense à l'objet dans ma main.\na) Le dé a 6 faces carrées pareilles : un cube.\nb) La boîte de conserve a un couvercle rond, un fond rond, et elle roule : un cylindre.\nc) Le ballon est rond de partout, sans face plate : une boule.\nd) Le cornet a une ouverture ronde et une pointe : un cône.\n⛔ Le piège : confondre le cône et le cylindre. Le cône a UNE pointe ; le cylindre a deux bases rondes, et pas de pointe.\nRéponse : a) cube ; b) cylindre ; c) boule ; d) cône.",
          reponses: [
            { question: "a)", attendu: ["cube", "un cube"] },
            { question: "b)", attendu: ["cylindre", "un cylindre"] },
            { question: "c)", attendu: ["boule", "une boule", "sphère", "une sphère"] },
            { question: "d)", attendu: ["cône", "un cône"] },
          ],
          micros: ["solide_reconnaitre"],
        },
        {
          enonce: "Voici un cube. Les arêtes cachées sont en pointillés.\na) Combien a-t-il de faces ?\nb) Combien a-t-il d'arêtes ?\nc) Combien a-t-il de sommets ?",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un cube dessiné en perspective, arêtes cachées en pointillés",
            formes: pave([1, 5.2], 3.5, 3.5, 3.5, BLEU),
          }),
          correction:
            "Je compte dans l'ordre, pour ne rien oublier.\na) Les faces : devant et derrière (2), dessus et dessous (2), gauche et droite (2). 2 + 2 + 2 = 6 faces.\nb) Les arêtes : 4 autour de la face de devant, 4 autour de la face de derrière, et 4 qui les relient. 4 + 4 + 4 = 12 arêtes.\nc) Les sommets : 4 devant et 4 derrière. 4 + 4 = 8 sommets.\n⛔ Le piège : b) compter seulement les arêtes en traits pleins : 9. Les 3 arêtes en pointillés existent aussi : 9 + 3 = 12.\nRéponse : a) 6 ; b) 12 ; c) 8.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: ["8", "huit"] },
          ],
          micros: ["solide_sommet_arete_face"],
        },
        {
          enonce: "Une boîte à chaussures a la forme d'un pavé droit.\na) Ses faces sont :\nA) des carrés seulement   B) des triangles   C) des rectangles\nb) Combien a-t-elle de faces ?",
          figure: dessin({
            l: 9,
            h: 5,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Un pavé droit en perspective",
            formes: pave([0.7, 4.4], 5.5, 2.4, 2.8, ORANGE),
          }),
          correction:
            "a) Je regarde chaque face de la boîte : le dessus, le fond, les côtés. Ce sont des rectangles : C.\nb) Comme le cube, le pavé a 6 faces : dessus et dessous, devant et derrière, gauche et droite. 2 + 2 + 2 = 6.\n⛔ Le piège : a) répondre « des carrés seulement ». Ça, c'est le cube. Le pavé a des faces allongées.\nRéponse : a) C ; b) 6.",
          reponses: [
            { question: "a)", attendu: ["C", "des rectangles", "c) des rectangles", "rectangles"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
          micros: ["solide_face"],
        },
        {
          enonce: "Quel solide ne peut pas rouler ?\nA) le cube   B) la boule   C) le cylindre",
          correction:
            "Je pense à chaque solide posé sur la table, et je le pousse.\nA) Le cube n'a que des faces plates et des arêtes : il glisse ou il bascule, mais il ne roule pas.\nB) La boule roule dans tous les sens.\nC) Le cylindre, couché, roule tout droit : son côté est arrondi.\n⛔ Le piège : C. Debout sur sa base, le cylindre ne roule pas… mais couché, il roule. Le cube, lui, ne roule jamais.\nRéponse : A.",
          reponses: [{ attendu: ["A", "le cube", "cube", "a) le cube"] }],
          micros: ["solide_reconnaitre"],
        },
        {
          enonce: "Voici une pyramide à base carrée.\na) Combien a-t-elle de faces ?\nb) Combien de ses faces sont des triangles ?\nc) Quelle est la forme de sa base ?",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Une pyramide à base carrée en perspective",
            formes: pyramide([1, 5.3], 3.6, 4.2, VERT),
          }),
          correction:
            "Je compte la base, puis les faces qui montent vers la pointe.\nc) La base, en bas, est un carré.\nb) Sur chaque côté du carré monte un triangle : 4 côtés, donc 4 triangles.\na) En tout : 1 carré + 4 triangles = 5 faces.\n⛔ Le piège : a) répondre 4 et oublier la base. La pyramide est posée dessus, mais c'est une face.\nRéponse : a) 5 ; b) 4 ; c) un carré.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["carré", "un carré", "carrée"] },
          ],
          micros: ["solide_face"],
        },
        {
          enonce: "Quel patron permet de fabriquer un cube : A, B ou C ?",
          figure: dessin({
            l: 15,
            h: 7.4,
            grille: true,
            u: 22,
            label: "Trois assemblages de carrés : A, B et C",
            formes: [
              ...cases([[0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3]], BLEU_CLAIR),
              { t: "texte", en: [1.5, 6.9], txt: "A" },
              ...cases([[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]], BLEU_CLAIR),
              { t: "texte", en: [5.5, 6.9], txt: "B" },
              ...cases([[10, 1], [9, 2], [10, 2], [11, 2], [12, 2], [10, 3]], BLEU_CLAIR),
              { t: "texte", en: [11, 6.9], txt: "C" },
            ],
          }),
          correction:
            "Les trois ont 6 carrés. Je replie chacun dans ma tête.\nA) 2 rangées de 3 : en repliant, des carrés se mettent l'un sur l'autre, et il reste des trous. Pas un cube.\nB) 6 carrés en ligne : en roulant, les 4 premiers font le tour, puis les 2 derniers retombent sur les premiers. Les deux bouts restent ouverts. Pas un cube.\nC) La croix : les 4 carrés de la rangée font le tour, le carré du haut ferme le dessus, celui du bas ferme le dessous. C'est un cube.\n⛔ Le piège : B. 6 carrés ne suffisent pas : il faut qu'ils soient bien placés.\nRéponse : C.",
          reponses: [{ attendu: ["C", "le patron C", "la croix"] }],
          micros: ["solide_patron"],
        },
        {
          enonce: "Vrai ou faux ?\na) Un cube a des faces carrées.\nb) Une boule a des sommets.\nc) Un carré est un solide.",
          correction:
            "a) Les 6 faces du cube sont des carrés. Vrai.\nb) Une boule est ronde de partout : aucun coin pointu, donc aucun sommet. Faux.\nc) Un carré est une figure plate, dessinée sur la feuille. On ne peut pas le tenir dans la main : ce n'est pas un solide. Faux.\n⛔ Le piège : c). Le carré est une FACE du cube, pas un solide.\nRéponse : a) vrai ; b) faux ; c) faux.",
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["faux", "non"] },
          ],
          micros: ["solide_face", "solide_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je compte en bas, puis en haut, puis ce qui relie les deux.",
      rappel: [
        "Un prisme droit a 2 bases pareilles, face à face, reliées par des rectangles.",
        "Prisme à base triangle : 2 triangles + 3 rectangles = 5 faces, 9 arêtes, 6 sommets.",
        "Pyramide à base carrée : 5 faces, 8 arêtes, 5 sommets (4 en bas + 1 pointe).",
        "Pour un patron, je replie dans ma tête : chaque face doit trouver sa place, sans se poser sur une autre.",
      ],
      exercices: [
        {
          enonce: "Voici un prisme droit à base triangle.\na) Combien a-t-il de faces ?\nb) Combien a-t-il d'arêtes ?\nc) Combien a-t-il de sommets ?",
          figure: dessin({
            l: 9,
            h: 5.4,
            max: "max-w-[13rem] print:max-w-[9rem]",
            label: "Un prisme droit à base triangle, couché, en perspective",
            formes: prisme([0.7, 4.8], 4, 3, 5, VIOLET),
          }),
          correction:
            "Je compte les deux triangles, puis ce qui les relie.\na) Les faces : 2 triangles (devant et derrière) et 3 rectangles qui les relient. 2 + 3 = 5 faces.\nb) Les arêtes : 3 autour du triangle de devant, 3 autour de celui de derrière, et 3 qui les relient. 3 + 3 + 3 = 9 arêtes.\nc) Les sommets : 3 devant et 3 derrière. 3 + 3 = 6 sommets.\n⛔ Le piège : a) répondre 6 faces « comme le pavé ». Le prisme n'a que 3 rectangles autour, car sa base a 3 côtés.\nRéponse : a) 5 ; b) 9 ; c) 6.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["9", "neuf"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
          micros: ["solide_prisme"],
        },
        {
          enonce: "Voici une pyramide à base carrée.\na) Combien a-t-elle de sommets ?\nb) Combien a-t-elle d'arêtes ?",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Une pyramide à base carrée, arêtes cachées en pointillés",
            formes: pyramide([1, 5.3], 3.6, 4.2, ORANGE),
          }),
          correction:
            "Je compte en bas, puis en haut.\na) Les sommets : 4 coins du carré, en bas, et 1 pointe en haut. 4 + 1 = 5 sommets.\nb) Les arêtes : 4 autour du carré de la base, et 4 qui montent jusqu'à la pointe. 4 + 4 = 8 arêtes.\nSur le dessin, 3 arêtes sont en pointillés : elles sont derrière, mais je les compte.\n⛔ Le piège : a) répondre 4 et oublier la pointe. C'est un coin aussi : c'est même le sommet de la pyramide !\nRéponse : a) 5 ; b) 8.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
          micros: ["solide_sommet_arete_face"],
        },
        {
          enonce: "Lucie découpe ce patron et le replie.\na) Quel solide obtient-elle ?\nA) un cube   B) un pavé droit   C) une pyramide\nb) Combien de faces a ce patron ?",
          figure: dessin({
            l: 7,
            h: 6,
            grille: true,
            u: 22,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un patron fait de six rectangles",
            formes: [
              { t: "case", x: 2, y: 0, l: 3, h: 1, fill: VERT_CLAIR, bord: ENCRE },
              { t: "case", x: 2, y: 1, l: 3, h: 2, fill: VERT_CLAIR, bord: ENCRE },
              { t: "case", x: 1, y: 1, l: 1, h: 2, fill: VERT_CLAIR, bord: ENCRE },
              { t: "case", x: 5, y: 1, l: 1, h: 2, fill: VERT_CLAIR, bord: ENCRE },
              { t: "case", x: 2, y: 3, l: 3, h: 1, fill: VERT_CLAIR, bord: ENCRE },
              { t: "case", x: 2, y: 4, l: 3, h: 2, fill: VERT_CLAIR, bord: ENCRE },
            ],
          }),
          correction:
            "a) Toutes les faces sont des rectangles, et elles ne sont pas toutes pareilles : 3 carreaux sur 2, 3 sur 1, 1 sur 2. Un solide à 6 faces rectangles, c'est un pavé droit : B.\nCe n'est pas un cube : les faces d'un cube sont des carrés tous pareils.\nb) Je compte les rectangles : 1 en haut, 3 au milieu, 1, puis 1 en bas. 6 faces.\n⛔ Le piège : a) choisir le cube parce que le patron a la même forme de croix. Je regarde la forme des faces : des rectangles, pas des carrés.\nRéponse : a) B ; b) 6.",
          reponses: [
            { question: "a)", attendu: ["B", "un pavé droit", "pavé droit", "pavé", "b) un pavé droit"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
          micros: ["solide_patron"],
        },
        {
          enonce: "Regarde le dessin de ce cube.\na) Combien d'arêtes vois-tu en traits pleins ?\nb) Combien d'arêtes sont en pointillés ?\nc) Combien d'arêtes a le cube en tout ?",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un cube : arêtes visibles en traits pleins, arêtes cachées en pointillés",
            formes: pave([1, 5.2], 3.5, 3.5, 3.5, ENCRE),
          }),
          correction:
            "Je compte au crayon, en cochant chaque arête.\na) Traits pleins : les 4 côtés de la face de devant, puis 3 arêtes qui partent vers l'arrière, puis 2 arêtes derrière, en haut et à droite. 4 + 3 + 2 = 9.\nb) Pointillés : les 3 arêtes qui partent du coin caché, en bas à gauche, derrière. 3.\nc) En tout : 9 + 3 = 12 arêtes.\n⛔ Le piège : c) répondre 9. Les pointillés montrent ce qu'on ne voit pas : ces arêtes existent.\nRéponse : a) 9 ; b) 3 ; c) 12.",
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: "12" },
          ],
          micros: ["solide_sommet_arete_face"],
        },
        {
          enonce: "Devinettes. Écris le nom du solide.\na) J'ai 6 faces, toutes des carrés. Qui suis-je ?\nb) J'ai une base ronde et une seule pointe. Qui suis-je ?\nc) Je n'ai ni face plate, ni arête, ni sommet. Qui suis-je ?\nd) J'ai 2 bases en triangle et 3 faces rectangles. Qui suis-je ?",
          correction:
            "Je lis chaque indice, l'un après l'autre.\na) 6 faces, toutes carrées : le cube. (Le pavé droit a aussi 6 faces, mais des rectangles.)\nb) Une base ronde et une pointe : le cône.\nc) Rien de plat, aucun bord, aucun coin : la boule.\nd) 2 triangles face à face, reliés par 3 rectangles : le prisme (droit, à base triangle).\n⛔ Le piège : b) répondre « pyramide » à cause de la pointe. La base de la pyramide a des côtés droits ; celle du cône est ronde.\nRéponse : a) cube ; b) cône ; c) boule ; d) prisme.",
          reponses: [
            { question: "a)", attendu: ["cube", "le cube", "un cube"] },
            { question: "b)", attendu: ["cône", "le cône", "un cône"] },
            { question: "c)", attendu: ["boule", "la boule", "une boule", "sphère", "la sphère"] },
            { question: "d)", attendu: ["prisme", "le prisme", "un prisme", "prisme droit", "le prisme droit"] },
          ],
          micros: ["solide_reconnaitre", "solide_face", "solide_prisme"],
        },
        {
          enonce: "Malik empile des petits cubes de jeu contre un mur, en escalier.\na) Combien de petits cubes a-t-il utilisés ?\nb) Il veut maintenant faire un grand cube de 2 cubes de long, 2 de large et 2 de haut. Combien de petits cubes lui faut-il ?",
          figure: dessin({
            l: 4.5,
            h: 4.5,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Un escalier de petits cubes : 3, puis 2, puis 1",
            formes: escalier([3, 2, 1]),
          }),
          correction:
            "a) Je compte colonne par colonne. À gauche : 3 cubes. Au milieu : 2. À droite : 1.\nL'escalier n'a qu'une rangée de profondeur : aucun cube n'est caché. 3 + 2 + 1 = 6 cubes.\nb) Le grand cube a 2 étages. Chaque étage est un carré de 2 sur 2 : 2 × 2 = 4 cubes.\nDeux étages : 4 × 2 = 8 petits cubes.\n⛔ Le piège : b) répondre 4, en ne comptant qu'un étage. Le grand cube a aussi 2 cubes de haut.\nRéponse : a) 6 ; b) 8.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
          micros: ["solide_defi"],
        },
        {
          enonce: "On replie ce patron : 1 carré et 4 triangles pareils.\na) Quel solide obtient-on ?\nA) une pyramide   B) un cube   C) un prisme\nb) Combien de faces a ce solide ?",
          figure: dessin({
            l: 8,
            h: 8,
            u: 20,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un patron : un carré au centre et quatre triangles autour",
            formes: [
              { t: "poly", pts: [[3, 3], [5, 3], [5, 5], [3, 5]], c: BLEU, fill: BLEU_CLAIR },
              { t: "poly", pts: [[3, 3], [5, 3], [4, 0.6]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "poly", pts: [[3, 5], [5, 5], [4, 7.4]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "poly", pts: [[3, 3], [3, 5], [0.6, 4]], c: ORANGE, fill: ORANGE_CLAIR },
              { t: "poly", pts: [[5, 3], [5, 5], [7.4, 4]], c: ORANGE, fill: ORANGE_CLAIR },
            ],
          }),
          correction:
            "a) Je replie les 4 triangles vers le haut. Leurs pointes se rejoignent au-dessus du carré : une pointe sur une base carrée. C'est une pyramide : A.\nb) Le patron a 1 carré + 4 triangles = 5 faces. Le solide a donc 5 faces.\n⛔ Le piège : a) choisir le prisme. Un prisme a DEUX bases pareilles, face à face. Ici, il n'y a qu'une base, le carré.\nRéponse : a) A ; b) 5.",
          reponses: [
            { question: "a)", attendu: ["A", "une pyramide", "pyramide", "a) une pyramide"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
          micros: ["solide_patron"],
        },
        {
          enonce: "Une brique de lait a la forme d'un pavé droit. Ses arêtes mesurent 20 cm, 7 cm ou 7 cm.\na) Combien a-t-elle d'arêtes ?\nb) Combien a-t-elle de sommets ?\nc) Combien d'arêtes mesurent 20 cm ?",
          figure: dessin({
            l: 7,
            h: 7.2,
            max: "max-w-[10rem] print:max-w-[7rem]",
            label: "Une brique de lait en forme de pavé droit, debout",
            formes: [...pave([2, 6.8], 2.4, 5, 2.6, BLEU), { t: "texte", en: [1.85, 4.3], txt: "20 cm", taille: 12, ancre: "end" }],
          }),
          correction:
            "a) Un pavé droit a 12 arêtes, comme le cube : 4 en bas, 4 en haut, 4 debout.\nb) Il a 8 sommets : 4 en bas et 4 en haut.\nc) Les arêtes de 20 cm sont les arêtes debout, de la hauteur de la brique. Il y en a une à chaque coin du bas : 4 arêtes.\n⭐ Dans un pavé droit, les 12 arêtes vont par paquets de 4 de même longueur.\n⛔ Le piège : c) répondre 1 ou 2, en regardant seulement le dessin. Les arêtes debout sont aux 4 coins, même celle cachée derrière.\nRéponse : a) 12 ; b) 8 ; c) 4.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: ["8", "huit"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
          micros: ["solide_sommet_arete_face"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout, j'imagine le solide dans ma main, puis je réponds question par question.",
      rappel: [
        "Arêtes = les bords, sommets = les coins, faces = les parties plates.",
        "Je compte toujours dans l'ordre : en bas, en haut, puis ce qui relie.",
        "Sur un dé classique, deux faces opposées font toujours 7 en tout.",
      ],
      exercices: [
        {
          titre: "La boîte du confiseur",
          enonce: "Un confiseur range ses bonbons dans une boîte en forme de cube de 10 cm de côté.\na) Il colle un fil doré sur TOUTES les arêtes. Quelle longueur de fil lui faut-il, en cm ?\nb) Il colle une étiquette sur chaque face. Combien d'étiquettes ?",
          correction:
            "a) Un cube a 12 arêtes, toutes de 10 cm.\n12 arêtes de 10 cm : 12 × 10 = 120 cm de fil.\nb) Un cube a 6 faces : 6 étiquettes.\n⛔ Le piège : a) compter les 9 arêtes qu'on voit sur un dessin : 9 × 10 = 90 cm. Il manquerait du fil pour les 3 arêtes de derrière.\nRéponse : a) 120 cm ; b) 6.",
          schema: ecranSeulement(
            dessin({
              l: 7,
              h: 6,
              max: "max-w-[10rem] print:max-w-[8rem]",
              label: "La boîte cube et ses 12 arêtes",
              formes: pave([1, 5.2], 3.5, 3.5, 3.5, "#ca8a04"),
            }),
          ),
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: ["6", "six"] },
          ],
          micros: ["solide_defi", "solide_sommet_arete_face"],
        },
        {
          titre: "Les pailles du maquettiste",
          enonce: "Un maquettiste fabrique le squelette d'une pyramide à base carrée. Chaque arête est une paille. Chaque sommet est une boule de pâte à modeler.\na) Combien de pailles lui faut-il ?\nb) Combien de boules de pâte à modeler ?",
          correction:
            "Les pailles sont les arêtes. Les boules sont les sommets.\na) Les arêtes : 4 pour le carré de la base, 4 qui montent jusqu'à la pointe. 4 + 4 = 8 pailles.\nb) Les sommets : 4 coins en bas + 1 pointe en haut = 5 boules.\n⛔ Le piège : b) répondre 4 et oublier la pointe. Sans la boule du haut, les 4 pailles ne tiennent pas ensemble.\nRéponse : a) 8 ; b) 5.",
          schema: ecranSeulement(
            dessin({
              l: 7,
              h: 6,
              max: "max-w-[10rem] print:max-w-[8rem]",
              label: "Le squelette de la pyramide : 8 pailles, 5 boules",
              formes: [
                ...pyramide([1, 5.3], 3.6, 4.2, "#ca8a04"),
                ...([[1, 5.3], [4.6, 5.3], [6.76, 3.68], [3.16, 3.68], [3.88, 0.29]] as P[]).map((en) => ({ t: "point" as const, en, c: VIOLET, rond: true })),
              ],
            }),
          ),
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
          micros: ["solide_defi", "solide_sommet_arete_face"],
        },
        {
          titre: "Le dé de la fabricante de jeux",
          enonce: "Une fabricante de jeux dessine le patron d'un dé. Sur un dé, deux faces opposées font toujours 7 en tout.\nElle a déjà écrit 1, 2 et 3. Trouve les nombres des faces a, b et c.\na) la face a\nb) la face b\nc) la face c",
          figure: dessin({
            l: 6,
            h: 5,
            grille: true,
            u: 26,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Le patron en croix d'un dé : faces 1, 2, 3 écrites, faces a, b, c à trouver",
            formes: croix(1, 1, ["1", "2", "3", "b", "c", "a"]),
          }),
          correction:
            "Je replie le patron dans ma tête pour trouver les faces opposées.\nLa rangée de 4 fait le tour du dé : la 1re et la 3e se font face, la 2e et la 4e aussi.\nLe carré du haut et celui du bas ferment le dé : ils se font face.\na) a est en bas, en face du 1 (en haut). 7 − 1 = 6.\nb) b est la 3e de la rangée, en face de la 1re, le 2. 7 − 2 = 5.\nc) c est la 4e de la rangée, en face de la 2e, le 3. 7 − 3 = 4.\nJe vérifie : 1 + 6 = 7, 2 + 5 = 7, 3 + 4 = 7.\n⛔ Le piège : croire que deux faces voisines sur le patron sont opposées. Collées sur le patron, elles se touchent aussi sur le dé.\nRéponse : a) 6 ; b) 5 ; c) 4.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
          micros: ["solide_defi", "solide_patron"],
        },
        {
          titre: "Le toit du charpentier",
          enonce: "Un charpentier construit le toit d'un kiosque. Le toit est une pyramide dont la base a 6 côtés.\na) Combien de faces triangles a le toit ?\nb) Combien de sommets a cette pyramide ?\nc) Combien d'arêtes a cette pyramide ?",
          figure: dessin({
            l: 8,
            h: 6.5,
            max: "max-w-[12rem] print:max-w-[9rem]",
            label: "Une pyramide dont la base a 6 côtés",
            formes: pyramideN([4, 5.2], 3.2, 1, 4.6, 6, "#92400e"),
          }),
          correction:
            "Je compte comme pour la pyramide à base carrée : en bas, puis en haut.\na) Un triangle monte sur chaque côté de la base. 6 côtés : 6 triangles.\nb) Les sommets : 6 coins en bas + 1 pointe en haut. 6 + 1 = 7 sommets.\nc) Les arêtes : 6 autour de la base + 6 qui montent à la pointe. 6 + 6 = 12 arêtes.\n⭐ Pour la pyramide à base carrée : 4 + 1 = 5 sommets et 4 + 4 = 8 arêtes. Même méthode !\n⛔ Le piège : c) compter seulement les 6 arêtes qui montent. Les côtés de la base sont aussi des arêtes.\nRéponse : a) 6 ; b) 7 ; c) 12.",
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: "12" },
          ],
          micros: ["solide_defi", "solide_sommet_arete_face"],
        },
      ],
    },
  ],
};

