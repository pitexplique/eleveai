// ─── Fiche d'exercices : les solides (CE1) — 20 exercices corrigés ─────────────
//
// 17/11/2026 : la feuille interactive de la notion `solides` du coach CE1 (6
// micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/solides.bank.ts` : cube, boule, cône,
// pyramide, cylindre, pavé ; face, sommet, arête ; nombre et forme des faces
// du cube et du pavé ; construire un cube, un pavé ou une pyramide (faces en
// carton, ou pailles et boules de pâte).
// ⛔ LIMITES DU CE1 : pas de patron (CE2-CM1), pas de prisme. On ne compte les
// faces que des solides à faces planes. Aucune construction à rendre : elle
// devient un compte (combien de pailles ?).
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot.
// Phrases de 16 mots au plus.
//
// Les pièges nommés : le cube appelé « carré » (1, 3), le ballon « rond »
// (2), le pavé à faces carrées (4), le cylindre qui ne roulerait pas (5, 8),
// la base de la pyramide prise pour un triangle (6), sommet et arête
// mélangés (7), compter les coins en croyant compter les arêtes (9, 10, LE
// piège du programme), les arêtes cachées oubliées (9, 11, 16), les faces
// cachées oubliées (13), le pavé « plus d'arêtes » parce qu'il est plus long
// (14), les devinettes lues trop vite (15), la base oubliée (12), la face du
// dessous collée quand même (17), la marche cachée (18), faces opposées qui
// font 6 (19), additionner faces et sommets (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (2, 19), cuisine (4), école (10, 11,
// 12), fête (2), confiserie (17), construction (18), entrepôt (20).
// Métiers : confiseur (17), maçonne (18), fabricant de jeux (19), magasinier
// (20). Aucun contexte réunionnais sur cette feuille.
//
// ⭐ UNE RÈGLE RÉELLE, dite dans l'énoncé (19) : sur un dé classique à six
// faces, deux faces opposées font toujours 7 en tout (1 et 6, 2 et 5, 3 et 4)
// — la règle des dés à jouer usuels, déjà utilisée dans `maths-cm1-solide.tsx`.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessins-geometrie-cm1.tsx` (perspective cavalière, arêtes
// cachées en pointillés) et `escalier` (local, des petits cubes empilés).
//
// Micro-compétences : ce1_solide_reconnaitre (1, 5, 8, 15), ce1_solide_nommer
// (2, 6, 15), ce1_solide_faces (3, 4, 6, 13, 14, 19), ce1_solide_sommets_
// aretes (7, 9, 10, 14, 16, 17), ce1_solide_construire (11, 12, 18),
// ce1_solide_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ENCRE, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VIOLET, boule, cone, cylindre, dessin, pave, pyramide, type Forme, type P } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

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

const cube = (c = BLEU) =>
  dessin({
    l: 7,
    h: 6,
    max: "max-w-[11rem] print:max-w-[8rem]",
    label: "Un cube en perspective, arêtes cachées en pointillés",
    formes: pave([1, 5.2], 3.5, 3.5, 3.5, c),
  });

const pyramideSeule = () =>
  dessin({
    l: 7,
    h: 6,
    max: "max-w-[11rem] print:max-w-[8rem]",
    label: "Une pyramide à base carrée en perspective",
    formes: pyramide([1, 5.3], 3.6, 4.2, VERT),
  });

export const exercicesSolidesCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "solides",
  titre: "Les solides",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître le cube, le pavé, la boule, le cylindre, le cône et la pyramide. Compter les faces, les sommets et les arêtes, même ceux qu'on ne voit pas. Construire un cube avec des pailles. Un confiseur, une maçonne, un fabricant de dés et un magasinier. Un rappel avant chaque niveau. Cherche d'abord sur le dessin, ou avec un vrai objet. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je pense à l'objet dans ma main.",
      rappel: [
        "Une face est une partie plate. Un sommet est un coin pointu. Une arête est le bord entre deux faces.",
        "Le cube a 6 faces carrées. Le pavé a 6 faces rectangles.",
        "La boule n'a aucune face plate. Elle roule partout.",
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
              { t: "texte", en: [8, 5.5], txt: "2", taille: 16 },
              ...cone([2.6, 10.6], 1.4, 0.42, 4, VERT),
              { t: "texte", en: [2.6, 11.6], txt: "3", taille: 16 },
              ...boule([8, 8.9], 1.7, VIOLET),
              { t: "texte", en: [8, 11.6], txt: "4", taille: 16 },
            ],
          }),
          correction:
            "Je regarde les faces plates et les parties rondes.\na) Le solide 1 a des faces carrées, toutes pareilles : un cube.\nb) Le solide 2 a deux disques, en haut et en bas : un cylindre.\nc) Le solide 3 a un disque et une pointe : un cône.\nd) Le solide 4 est rond de partout : une boule.\n⛔ Le piège : a) écrire « carré ». Le carré est plat. Le cube se tient dans la main.\nRéponse : a) cube ; b) cylindre ; c) cône ; d) boule.",
          micros: ["ce1_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["cube", "un cube", "le cube"] },
            { question: "b)", attendu: ["cylindre", "un cylindre", "le cylindre"] },
            { question: "c)", attendu: ["cône", "un cône", "le cône"] },
            { question: "d)", attendu: ["boule", "une boule", "la boule", "sphère"] },
          ],
        },
        {
          enonce: "Quel solide ressemble à chaque objet ?\nÉcris : cube, boule, cylindre ou cône.\na) un dé\nb) un ballon\nc) une boîte de conserve\nd) un chapeau de fête pointu",
          correction:
            "Je pense à l'objet dans ma main.\na) Le dé a 6 faces carrées pareilles : un cube.\nb) Le ballon est rond de partout : une boule.\nc) La boîte de conserve a un fond rond, un couvercle rond, et elle roule : un cylindre.\nd) Le chapeau a un bord rond et une pointe : un cône.\n⛔ Le piège : b) écrire « rond ». « Rond » dit la forme, « boule » est le nom du solide.\nRéponse : a) cube ; b) boule ; c) cylindre ; d) cône.",
          micros: ["ce1_solide_nommer"],
          reponses: [
            { question: "a)", attendu: ["cube", "un cube"] },
            { question: "b)", attendu: ["boule", "une boule", "sphère"] },
            { question: "c)", attendu: ["cylindre", "un cylindre"] },
            { question: "d)", attendu: ["cône", "un cône"] },
          ],
        },
        {
          enonce: "Voici un cube.\na) Combien a-t-il de faces ?\nb) Quelle est la forme de ses faces ?",
          figure: cube(),
          correction:
            "a) Je compte les faces deux par deux : devant et derrière, dessus et dessous, gauche et droite.\n2 + 2 + 2 = 6 faces.\nb) Toutes ses faces sont des carrés, tous pareils.\n⛔ Le piège : a) compter seulement les 3 faces que je vois sur le dessin. Les autres sont cachées derrière.\nRéponse : a) 6 ; b) carré.",
          micros: ["ce1_solide_faces"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["carré", "carrés", "un carré", "des carrés", "carrée", "carrées"] },
          ],
        },
        {
          enonce: "Cette brique de lait a la forme d'un pavé.\nSes faces sont :\nA) des carrés seulement   B) des triangles   C) des rectangles",
          figure: dessin({
            l: 7,
            h: 8,
            max: "max-w-[10rem] print:max-w-[7rem]",
            label: "Une brique de lait en forme de pavé",
            formes: pave([1, 7.4], 2.6, 5.6, 2.4, ORANGE),
          }),
          correction:
            "Je regarde chaque face de la brique : devant, côté, dessus.\nElles sont allongées : ce sont des rectangles.\n⛔ Le piège : choisir A. Des faces toutes carrées, c'est le cube. Le pavé a des faces rectangles.\nRéponse : C.",
          micros: ["ce1_solide_faces"],
          reponses: [{ attendu: ["C", "C) des rectangles", "des rectangles", "rectangles", "rectangle"] }],
        },
        {
          enonce: "Quel solide n'a aucune face plate ?\nÉcris A, B ou C.",
          figure: dessin({
            l: 15,
            h: 6.4,
            label: "Trois solides : A, B et C",
            formes: [
              ...pave([0.6, 5], 3, 3, 3, BLEU),
              { t: "texte", en: [2.5, 5.9], txt: "A" },
              ...boule([8, 3.2], 1.7, VIOLET),
              { t: "texte", en: [8, 5.9], txt: "B" },
              ...cylindre([12.8, 5], 1.3, 0.4, 3.8, ORANGE),
              { t: "texte", en: [12.8, 5.9], txt: "C" },
            ],
          }),
          correction:
            "Je cherche une partie plate, où je pourrais poser le solide sans qu'il bouge.\nA, le cube, a 6 faces plates.\nC, le cylindre, a 2 disques plats, en haut et en bas.\nB, la boule, n'a aucune partie plate.\n⛔ Le piège : choisir C parce qu'il roule. Il roule, mais ses deux bouts sont plats.\nRéponse : B.",
          micros: ["ce1_solide_reconnaitre"],
          reponses: [{ attendu: ["B", "la boule", "boule"] }],
        },
        {
          enonce: "Regarde ce solide.\na) Comment s'appelle-t-il ?\nb) Quelle est la forme de sa base, en bas ?",
          figure: pyramideSeule(),
          correction:
            "a) Il a une base en bas, et des faces triangles qui montent vers une pointe. C'est une pyramide.\nb) Sa base a 4 côtés égaux et 4 angles droits : c'est un carré.\n⛔ Le piège : b) répondre « triangle ». Les faces qui montent sont des triangles, mais la base est un carré.\nRéponse : a) pyramide ; b) carré.",
          micros: ["ce1_solide_nommer", "ce1_solide_faces"],
          reponses: [
            { question: "a)", attendu: ["pyramide", "une pyramide", "la pyramide"] },
            { question: "b)", attendu: ["carré", "un carré", "carrée"] },
          ],
        },
        {
          enonce: "Sur le cube, regarde le point rouge et le trait orange.\nÉcris : face, sommet ou arête.\na) le point rouge\nb) le trait orange",
          figure: dessin({
            l: 7,
            h: 6,
            max: "max-w-[11rem] print:max-w-[8rem]",
            label: "Un cube avec un coin marqué en rouge et un bord marqué en orange",
            formes: [
              ...pave([1, 5.2], 3.5, 3.5, 3.5, BLEU),
              { t: "seg", de: [4.5, 5.2], vers: [4.5, 1.7], c: ORANGE, w: 5 },
              { t: "cercle", en: [1, 1.7], r: 0.25, fill: ROUGE, c: ROUGE },
            ],
          }),
          correction:
            "a) Le point rouge est un coin pointu du cube : c'est un sommet.\nb) Le trait orange est le bord entre deux faces : c'est une arête.\n⛔ Le piège : mélanger les deux mots. Sommet = coin. Arête = bord, un trait.\nRéponse : a) sommet ; b) arête.",
          micros: ["ce1_solide_sommets_aretes"],
          reponses: [
            { question: "a)", attendu: ["sommet", "un sommet"] },
            { question: "b)", attendu: ["arête", "une arête"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) La boule roule.\nb) Le cube roule.\nc) Le cylindre couché roule.",
          correction:
            "Je pense à chaque solide posé sur la table, et je le pousse.\na) La boule roule dans tous les sens. Vrai.\nb) Le cube n'a que des faces plates : il glisse, il bascule, mais il ne roule pas. Faux.\nc) Couché, le cylindre roule tout droit, sur son côté arrondi. Vrai.\n⛔ Le piège : c) dire faux. Debout, il ne roule pas ; couché, il roule.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["ce1_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je compte dans l'ordre : devant, puis derrière, puis ce qui relie.",
      rappel: [
        "Le cube a 6 faces, 8 sommets et 12 arêtes. Le pavé aussi.",
        "Les traits en pointillés sont les arêtes cachées. Je les compte aussi.",
        "Sommet = un coin. Arête = un bord. Je ne mélange pas les deux.",
      ],
      exercices: [
        {
          enonce: "Voici un cube. Les traits en pointillés sont cachés.\na) Combien a-t-il de sommets ?\nb) Combien a-t-il d'arêtes ?",
          figure: cube(),
          correction:
            "a) Les sommets : 4 coins devant, 4 coins derrière. 4 + 4 = 8 sommets.\nb) Les arêtes : 4 autour de la face de devant, 4 autour de celle de derrière.\nPuis 4 qui relient l'avant à l'arrière. 4 + 4 + 4 = 12 arêtes.\n⛔ Le piège : b) oublier les 3 arêtes en pointillés. Elles sont cachées, mais elles existent.\nRéponse : a) 8 ; b) 12.",
          micros: ["ce1_solide_sommets_aretes"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          enonce: "Léo dit : « Un cube a 8 arêtes. »\na) Qu'a-t-il compté ? A) les faces   B) les sommets   C) les arêtes\nb) Combien d'arêtes a un cube, en vrai ?",
          correction:
            "a) 8, c'est le nombre de coins du cube. Léo a compté les sommets : B.\nb) Les arêtes sont les bords : 4 devant, 4 derrière, 4 qui relient. 4 + 4 + 4 = 12.\n⛔ Le piège : compter les coins en croyant compter les bords. Un cube a 8 coins, mais 12 bords.\nRéponse : a) B ; b) 12.",
          micros: ["ce1_solide_sommets_aretes"],
          reponses: [
            { question: "a)", attendu: ["B", "B) les sommets", "les sommets", "sommets"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          enonce: "En classe, on construit un cube.\nUne paille pour chaque arête, une boule de pâte pour chaque sommet.\na) Combien de pailles ?\nb) Combien de boules de pâte ?",
          figure: cube(VIOLET),
          correction:
            "a) Chaque arête est une paille. Le cube a 12 arêtes : 12 pailles.\nb) Les boules relient les pailles aux coins. Le cube a 8 sommets : 8 boules.\n⛔ Le piège : a) prendre seulement les arêtes en traits pleins, 9. Les 3 arêtes cachées ont aussi besoin d'une paille.\nRéponse : a) 12 ; b) 8.",
          micros: ["ce1_solide_construire"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Nora fabrique une pyramide à base carrée. Elle découpe ses faces en carton.\na) Combien de carrés découpe-t-elle ?\nb) Combien de triangles ?\nc) Combien de faces en tout ?",
          figure: pyramideSeule(),
          correction:
            "a) La base est un carré : 1 carré.\nb) Sur chaque côté du carré monte un triangle. Le carré a 4 côtés : 4 triangles.\nc) 1 + 4 = 5 faces.\n⛔ Le piège : c) répondre 4, en oubliant la base. La pyramide est posée dessus, mais c'est une face.\nRéponse : a) 1 ; b) 4 ; c) 5.",
          micros: ["ce1_solide_construire", "ce1_solide_faces"],
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Sur le dessin d'un cube, je vois 3 faces.\nCombien de faces sont cachées ?",
          figure: cube(ORANGE),
          correction:
            "Le cube a 6 faces en tout.\nJe vois le devant, le dessus et le côté droit : 3 faces.\nLes autres sont cachées : 6 − 3 = 3.\nCe sont le derrière, le dessous et le côté gauche.\n⛔ Le piège : répondre 0, parce qu'on ne les voit pas. Le dessin ne montre pas tout.\nRéponse : 3.",
          micros: ["ce1_solide_faces"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Voici un pavé, comme une boîte à chaussures.\na) Combien a-t-il de faces ?\nb) Combien a-t-il de sommets ?\nc) A-t-il autant d'arêtes que le cube ?",
          figure: dessin({
            l: 10,
            h: 5,
            max: "max-w-[15rem] print:max-w-[10rem]",
            label: "Un pavé en perspective, arêtes cachées en pointillés",
            formes: pave([0.7, 4.4], 6, 2.4, 2.8, ORANGE),
          }),
          correction:
            "Le pavé est construit comme le cube, mais il est allongé.\na) Dessus et dessous, devant et derrière, gauche et droite : 2 + 2 + 2 = 6 faces.\nb) 4 coins devant, 4 derrière : 8 sommets.\nc) 4 arêtes devant, 4 derrière, 4 qui relient : 12. Comme le cube : oui.\n⛔ Le piège : c) dire non, car le pavé est plus long. Ses arêtes sont plus longues, pas plus nombreuses.\nRéponse : a) 6 ; b) 8 ; c) oui.",
          micros: ["ce1_solide_faces", "ce1_solide_sommets_aretes"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["8", "huit"] },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          enonce: "Devinettes. Qui suis-je ?\na) J'ai 6 faces carrées, toutes pareilles.\nb) J'ai un disque et une pointe.\nc) Je n'ai aucune face plate.",
          correction:
            "Je lis chaque indice jusqu'au bout.\na) 6 faces carrées pareilles : le cube. Le pavé a des faces rectangles.\nb) Un disque et une pointe : le cône. Le cylindre a deux disques et pas de pointe.\nc) Aucune face plate : la boule.\n⛔ Le piège : b) répondre « cylindre » en lisant seulement « disque ». La pointe dit : cône.\nRéponse : a) cube ; b) cône ; c) boule.",
          micros: ["ce1_solide_reconnaitre", "ce1_solide_nommer"],
          reponses: [
            { question: "a)", attendu: ["cube", "un cube", "le cube"] },
            { question: "b)", attendu: ["cône", "un cône", "le cône"] },
            { question: "c)", attendu: ["boule", "une boule", "la boule", "sphère"] },
          ],
        },
        {
          enonce: "Voici une pyramide à base carrée.\na) Combien a-t-elle de sommets ?\nb) Combien a-t-elle d'arêtes ?",
          figure: pyramideSeule(),
          correction:
            "a) Les 4 coins de la base, et la pointe en haut : 4 + 1 = 5 sommets.\nb) Les 4 arêtes autour de la base, et les 4 qui montent vers la pointe : 4 + 4 = 8 arêtes.\n⛔ Le piège : oublier ce qui est en pointillés, derrière. Un coin et trois arêtes sont cachés.\nRéponse : a) 5 ; b) 8.",
          micros: ["ce1_solide_sommets_aretes"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. J'imagine le solide dans ma main.",
      rappel: [
        "Cube : 6 faces, 8 sommets, 12 arêtes.",
        "Sur un dé, deux faces opposées font toujours 7.",
        "Je relis la question : faces, sommets ou arêtes ?",
      ],
      exercices: [
        {
          titre: "La boîte du confiseur",
          enonce: "Un confiseur range des bonbons dans une boîte en forme de cube.\na) Il colle une étiquette sur chaque face, sauf le dessous. Combien d'étiquettes ?\nb) Il met une perle sur chaque sommet du dessus. Combien de perles ?\nc) Puis une perle sur chaque sommet du dessous. Combien de perles en tout ?",
          figure: cube(ROUGE),
          correction:
            "a) Le cube a 6 faces. J'enlève le dessous : 6 − 1 = 5 étiquettes.\nb) Le dessus est un carré : il a 4 coins. 4 perles.\nc) Le dessous a aussi 4 coins : 4 + 4 = 8 perles.\nJe vérifie : un cube a bien 8 sommets.\n⛔ Le piège : a) répondre 6. La boîte est posée sur sa face du dessous : pas d'étiquette.\nRéponse : a) 5 ; b) 4 ; c) 8.",
          micros: ["ce1_solide_sommets_aretes", "ce1_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "L'escalier de la maçonne",
          enonce: "Une maçonne construit un petit escalier avec des cubes.\na) Combien de cubes y a-t-il ?\nb) Elle ajoute une marche de 4 cubes. Combien de cubes en tout ?",
          figure: dessin({
            l: 6,
            h: 5,
            max: "max-w-[10rem] print:max-w-[7rem]",
            label: "Un escalier de petits cubes : 1, 2 et 3 cubes de haut",
            formes: escalier([1, 2, 3]),
          }),
          correction:
            "a) Je compte colonne par colonne : 1 cube, puis 2, puis 3.\n1 + 2 + 3 = 6 cubes.\nb) La nouvelle marche a 4 cubes : 6 + 4 = 10 cubes.\n⛔ Le piège : a) compter seulement les cubes du haut de chaque marche, 3. Chaque colonne compte tous ses cubes.\nRéponse : a) 6 ; b) 10.",
          micros: ["ce1_solide_construire", "ce1_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          titre: "Les dés du fabricant",
          enonce: "Un fabricant de jeux fait des dés à 6 faces.\nSur un dé, deux faces opposées font toujours 7.\na) Le dessus montre 2. Combien sur le dessous ?\nb) Le dessus montre 6. Combien sur le dessous ?\nc) Combien de points y a-t-il sur tout le dé ?",
          figure: cube(BLEU),
          correction:
            "a) 2 + ? = 7. 2 + 5 = 7 : le dessous montre 5.\nb) 6 + ? = 7. 6 + 1 = 7 : le dessous montre 1.\nc) Les faces vont par paires : 1 et 6, 2 et 5, 3 et 4. Chaque paire fait 7.\n3 paires : 7 + 7 + 7 = 21 points.\n⛔ Le piège : a) répondre 4, en faisant 2 + 4 = 6. Les faces opposées font 7, pas 6.\nRéponse : a) 5 ; b) 1 ; c) 21.",
          micros: ["ce1_solide_faces", "ce1_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: "21" },
          ],
        },
        {
          titre: "Les cartons du magasinier",
          enonce: "Un magasinier pose 2 cartons en forme de cube sur une table. Ils ne se touchent pas.\na) Combien de faces en tout ?\nb) Combien de sommets en tout ?",
          figure: dessin({
            l: 13,
            h: 6,
            max: "max-w-[18rem] print:max-w-[12rem]",
            label: "Deux cubes séparés",
            formes: [...pave([0.8, 5.2], 3.5, 3.5, 3.5, ORANGE), ...pave([7.2, 5.2], 3.5, 3.5, 3.5, ORANGE)],
          }),
          correction:
            "Un cube a 6 faces et 8 sommets. Ici, il y a 2 cubes.\na) 6 + 6 = 12 faces.\nb) 8 + 8 = 16 sommets.\n⛔ Le piège : additionner les faces et les sommets d'un seul cube, 6 + 8 = 14. Je compte chaque chose à part, pour les 2 cartons.\nRéponse : a) 12 ; b) 16.",
          micros: ["ce1_solide_defi"],
          reponses: [
            { question: "a)", attendu: ["12", "douze"] },
            { question: "b)", attendu: ["16", "seize"] },
          ],
        },
      ],
    },
  ],
};
