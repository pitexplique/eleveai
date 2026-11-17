// ─── Fiche d'exercices : figures planes et solides (CP) — 20 exercices ───────
//
// 17/11/2026 : la feuille interactive de la notion `figures_solides` du coach
// CP (7 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/figures-solides.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : le DISQUE (pas le cercle), le
// carré, le rectangle, le triangle, avec les mots CÔTÉ et SOMMET ; le cube, le
// pavé, la boule à NOMMER, le cône et le cylindre à RECONNAÎTRE ; un solide se
// décrit avec ses FACES (ni arête, ni sommet de solide). Le cube n'est pas
// présenté comme un pavé. Ni équerre, ni compas, ni angle droit.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot, oui / non.
// ⛔ Phrases de 14 mots au plus, une idée par phrase.
//
// Les pièges nommés : rectangle et carré confondus (1, 8), compter les côtés
// d'un seul trait (2), boule et disque (3), un dé n'est pas une boule (4), les
// faces cachées (5, 10), l'œil qui décide trop vite (6, 12, 18), le carré
// penché (7), le triangle à l'envers (16), la devinette lue à moitié (9, 19),
// le côté manquant (11, 17), oublier les sommets du creux (14), l'empreinte du
// cylindre (15), compter le carré entier (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : dessin (1, 8), jeux (4), cuisine (10, 15 :
// pâte à sel), jardin (18), couture (20), classe (2, 6, 11, 12, 14, 17).
// Les métiers : jardinière (18), couturier (20). AUCUN contexte réunionnais
// sur cette feuille (il est sur la feuille « monnaie » du même lot).
//
// ⭐ FAITS RÉELS : un cube a 6 faces carrées ; un pavé a 6 faces rectangles ;
// une boule n'a aucune face plate ; le fond d'un cylindre est un disque.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessin` de dessins-geometrie-cm1 (figures remplies, points
// marqués d'une croix, solides en perspective, arêtes cachées en pointillés,
// quadrillage). ⛔ Aucun nom de figure ni de solide écrit sur le dessin quand
// la question demande ce nom.
//
// Micro-compétences : cp_figure_reconnaitre (1, 7, 8, 9, 16), cp_figure_decrire
// (2, 9, 14, 20), cp_solide_reconnaitre (3, 4, 13, 19), cp_solide_faces (5, 10,
// 15, 19), cp_figure_alignement (6, 12, 18), cp_figure_tracer (11, 17),
// cp_figure_defi (17, 18, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import {
  BLEU,
  BLEU_CLAIR,
  ENCRE,
  GRIS,
  ORANGE,
  ORANGE_CLAIR,
  VERT,
  VERT_CLAIR,
  JAUNE,
  boule,
  cylindre,
  dessin,
  pave,
  type Forme,
  type P,
} from "@/lib/fiches-exercices/dessins-geometrie-cm1";

const VIOLET_CLAIR = "#ddd6fe";

/** Une étiquette sous une figure (a, b, 1, 2…). */
const nom = (en: P, txt: string): Forme => ({ t: "texte", en, txt, c: GRIS, taille: 16 });

/** Un rectangle rempli, coin haut-gauche (x, y), largeur l, hauteur h. */
const rect = (x: number, y: number, l: number, h: number, fill: string, c = ENCRE): Forme => ({
  t: "poly",
  pts: [
    [x, y],
    [x + l, y],
    [x + l, y + h],
    [x, y + h],
  ],
  fill,
  c,
});

export const exercicesFiguresSolidesCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "figures-solides",
  titre: "Figures planes et solides",
  accroche:
    "Vingt exercices de géométrie. Le carré, le rectangle, le triangle et le disque, leurs côtés et leurs sommets. Le cube, le pavé et la boule, leurs faces. Des points alignés à vérifier avec la règle. Une maison à dessiner, une jardinière et un couturier. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je regarde bien la figure. J'écris un mot ou un nombre.",
      rappel: [
        "Le carré : 4 côtés de même longueur. Le rectangle : 4 côtés, deux longs et deux courts.",
        "Le triangle : 3 côtés et 3 sommets. Le disque est tout rond.",
        "Le cube a 6 faces carrées. Le pavé a 6 faces rectangles. La boule roule.",
      ],
      exercices: [
        {
          enonce: "Écris le nom de chaque figure.\nChoisis : carré, rectangle, triangle ou disque.",
          figure: dessin({
            l: 16,
            h: 5,
            u: 20,
            label: "Quatre figures planes",
            formes: [
              rect(0.5, 0.5, 3, 3, BLEU_CLAIR),
              { t: "poly", pts: [[4.8, 3.5], [8.2, 3.5], [6.5, 0.5]], fill: ORANGE_CLAIR },
              { t: "cercle", en: [10.5, 2], r: 1.5, fill: VERT_CLAIR },
              rect(12.5, 1, 3.4, 2, VIOLET_CLAIR),
              nom([2, 4.5], "a"),
              nom([6.5, 4.5], "b"),
              nom([10.5, 4.5], "c"),
              nom([14.2, 4.5], "d"),
            ],
          }),
          correction:
            "Je compte les côtés, puis je compare leurs longueurs.\na) 4 côtés, tous de la même longueur : c'est un carré.\nb) 3 côtés : c'est un triangle.\nc) Tout rond et plein, sans côté : c'est un disque.\nd) 4 côtés, deux longs et deux courts : c'est un rectangle.\n⛔ Le piège : appeler le carré « rectangle », ou l'inverse. Je compare la longueur des côtés.\nRéponse : a) carré ; b) triangle ; c) disque ; d) rectangle.",
          micros: ["cp_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré"] },
            { question: "b)", attendu: ["triangle", "un triangle"] },
            { question: "c)", attendu: ["disque", "un disque"] },
            { question: "d)", attendu: ["rectangle", "un rectangle"] },
          ],
        },
        {
          enonce: "a) Combien de côtés a la figure a ?\nb) Combien de sommets a la figure b ?",
          figure: dessin({
            l: 12,
            h: 5,
            u: 22,
            label: "Deux figures",
            formes: [
              { t: "poly", pts: [[0.5, 3.6], [4.5, 3.6], [1.5, 0.4]], fill: ORANGE_CLAIR },
              rect(6.5, 0.8, 5, 2.8, BLEU_CLAIR),
              nom([2.2, 4.5], "a"),
              nom([9, 4.5], "b"),
            ],
          }),
          correction:
            "Un côté est un trait droit. Un sommet est un coin, là où deux côtés se rencontrent.\na) Je suis le bord de la figure a avec le doigt : 1, 2, 3 traits. Elle a 3 côtés.\nb) Je touche chaque coin de la figure b : 1, 2, 3, 4. Elle a 4 sommets.\n⛔ Le piège : compter deux fois le même coin. Je marque le premier coin d'un point.\nRéponse : a) 3 ; b) 4.",
          micros: ["cp_figure_decrire"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Écris le nom de chaque solide.\nChoisis : cube, pavé ou boule.",
          figure: dessin({
            l: 15,
            h: 5.5,
            u: 24,
            label: "Trois solides",
            formes: [
              ...pave([0.4, 4], 3.6, 1.8, 2.2),
              ...pave([6, 4], 2.4, 2.4, 2.4),
              ...boule([12.6, 2.6], 1.6),
              nom([2.6, 5], "1"),
              nom([7.8, 5], "2"),
              nom([12.6, 5], "3"),
            ],
          }),
          correction:
            "Je regarde la forme de chaque solide.\n1) Il est allongé : ses faces sont des rectangles. C'est un pavé.\n2) Toutes ses faces sont des carrés de même taille. C'est un cube.\n3) Il est tout rond, il roule partout. C'est une boule.\n⛔ Le piège : dire « disque » pour la boule. Le disque est plat. La boule se tient dans la main.\nRéponse : 1) pavé ; 2) cube ; 3) boule.",
          micros: ["cp_solide_reconnaitre"],
          reponses: [
            { question: "1)", attendu: ["pavé", "un pavé"] },
            { question: "2)", attendu: ["cube", "un cube"] },
            { question: "3)", attendu: ["boule", "une boule"] },
          ],
        },
        {
          enonce: "Choisis la bonne réponse. Écris la lettre.\na) Quel objet a la forme d'une boule ?\nA) un dé B) une balle de tennis C) une boîte à chaussures\nb) Quel objet a la forme d'un cube ?\nA) un dé B) une orange C) une boîte de céréales",
          correction:
            "Je pense à la forme de chaque objet.\na) Une balle de tennis est toute ronde : c'est une boule. Réponse B.\nb) Un dé a 6 faces carrées, toutes pareilles : c'est un cube. Réponse A.\n⛔ Le piège : choisir la boîte de céréales pour le cube. Ses faces sont des rectangles : c'est un pavé.\nRéponse : a) B ; b) A.",
          micros: ["cp_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["B", "B) une balle de tennis", "une balle de tennis"] },
            { question: "b)", attendu: ["A", "A) un dé", "un dé"] },
          ],
        },
        {
          enonce: "Voici un cube.\na) Combien de faces a un cube ?\nb) Quelle forme ont ses faces ?\nA) des carrés B) des disques C) des triangles",
          figure: dessin({ l: 6, h: 5, u: 26, label: "Un cube", formes: [...pave([1, 4.3], 3, 3, 3)] }),
          correction:
            "a) Je compte les faces : devant, derrière, dessus, dessous, à gauche, à droite.\n1, 2, 3, 4, 5, 6. Le cube a 6 faces.\nb) Chaque face a 4 côtés de même longueur : ce sont des carrés. Réponse A.\n⛔ Le piège du a) : compter seulement les 3 faces que l'on voit. Les autres sont cachées derrière.\nRéponse : a) 6 ; b) A.",
          micros: ["cp_solide_faces"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["A", "A) des carrés", "carrés", "des carrés"] },
          ],
        },
        {
          enonce: "Prends ta règle.\na) Les points A, B et C sont-ils alignés ? Écris oui ou non.\nb) Les points D, E et F sont-ils alignés ?",
          figure: dessin({
            l: 8,
            h: 7,
            u: 26,
            label: "Six points",
            formes: [
              { t: "point", en: [1, 1], nom: "A", vers: "h" },
              { t: "point", en: [4, 2], nom: "B", vers: "h" },
              { t: "point", en: [7, 3], nom: "C", vers: "h" },
              { t: "point", en: [1, 4.4], nom: "D", vers: "b", c: BLEU },
              { t: "point", en: [4, 5.15], nom: "E", vers: "b", c: BLEU },
              { t: "point", en: [7, 6.4], nom: "F", vers: "b", c: BLEU },
            ],
          }),
          correction:
            "Je pose ma règle sur deux points. Je regarde si le troisième touche la règle.\na) Je pose la règle sur A et C. Le point B touche la règle. Oui, ils sont alignés.\nb) Je pose la règle sur D et F. Le point E est un peu au-dessus de la règle. Non.\n⛔ Le piège du b) : dire oui « à l'œil ». Les points ont l'air alignés, la règle dit non.\nRéponse : a) oui ; b) non.",
          micros: ["cp_figure_alignement"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
        },
        {
          enonce: "Cette figure est posée sur une pointe.\nQuelle figure est-ce ? Écris la lettre.\nA) un carré B) un triangle C) un disque",
          figure: dessin({
            l: 6,
            h: 6,
            u: 26,
            label: "Une figure posée sur une pointe",
            formes: [{ t: "poly", pts: [[3, 0.5], [5.5, 3], [3, 5.5], [0.5, 3]], fill: BLEU_CLAIR }],
          }),
          correction:
            "Je compte les côtés : 1, 2, 3, 4. Ce n'est ni un triangle, ni un disque.\nJe compare les côtés : ils ont tous la même longueur.\nC'est un carré, simplement tourné.\n⛔ Le piège : croire qu'un carré penché n'est plus un carré. Tourner une figure ne change pas son nom.\nRéponse : A.",
          micros: ["cp_figure_reconnaitre"],
          reponses: [{ attendu: ["A", "A) un carré", "carré", "un carré"] }],
        },
        {
          enonce: "Gaby a dessiné une maison et le soleil.\na) Combien de carrés vois-tu ?\nb) Combien de disques ?\nc) Combien de rectangles ?",
          figure: dessin({
            l: 10,
            h: 7.5,
            u: 24,
            label: "Une maison et le soleil",
            formes: [
              rect(1, 3, 4, 4, "#fef3c7"),
              { t: "poly", pts: [[0.5, 3], [5.5, 3], [3, 0.6]], fill: ORANGE_CLAIR },
              rect(2.5, 5, 1, 2, "#fdba74"),
              rect(1.5, 3.6, 0.9, 0.9, BLEU_CLAIR),
              rect(3.6, 3.6, 0.9, 0.9, BLEU_CLAIR),
              { t: "cercle", en: [8, 1.6], r: 1, fill: JAUNE, c: ORANGE },
            ],
          }),
          correction:
            "Je regarde chaque morceau du dessin, un par un.\na) Le mur a 4 côtés égaux : 1 carré. Les deux fenêtres aussi : 2 carrés. En tout, 3 carrés.\nb) Le soleil est tout rond : 1 disque.\nc) La porte a deux côtés longs et deux courts : 1 rectangle.\n⛔ Le piège : compter la porte comme un carré. Elle est plus haute que large.\nRéponse : a) 3 ; b) 1 ; c) 1.",
          micros: ["cp_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["1", "un"] },
            { question: "c)", attendu: ["1", "un"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je compte, puis je nomme.",
      rappel: [
        "Un côté est un trait droit. Un sommet est un coin.",
        "Une figure tournée garde son nom.",
        "Pour des points alignés, la règle touche les trois points.",
      ],
      exercices: [
        {
          enonce: "Devinettes. Qui suis-je ?\na) J'ai 3 côtés et 3 sommets.\nb) Je n'ai ni côté ni sommet. Je suis tout rond et plat.\nc) J'ai 4 côtés, tous de la même longueur.",
          correction:
            "Je lis chaque indice jusqu'au bout.\na) 3 côtés et 3 sommets : le triangle.\nb) Rond et plat, sans côté : le disque.\nc) 4 côtés de même longueur : le carré.\n⛔ Le piège du c) : répondre « rectangle » dès « 4 côtés ». Le rectangle a deux côtés longs et deux courts.\nRéponse : a) triangle ; b) disque ; c) carré.",
          micros: ["cp_figure_decrire", "cp_figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["triangle", "le triangle", "un triangle"] },
            { question: "b)", attendu: ["disque", "le disque", "un disque"] },
            { question: "c)", attendu: ["carré", "le carré", "un carré"] },
          ],
        },
        {
          enonce: "Une boîte de céréales a la forme d'un pavé.\na) Combien de faces a-t-elle ?\nb) Ses faces sont des :\nA) rectangles B) disques C) triangles",
          figure: dessin({ l: 7, h: 7, u: 24, label: "Une boîte de céréales", formes: [...pave([1, 6.4], 3, 5, 1.8)] }),
          correction:
            "a) Je compte les faces : devant, derrière, dessus, dessous, et les deux côtés.\n1, 2, 3, 4, 5, 6. La boîte a 6 faces.\nb) Chaque face a deux côtés longs et deux côtés courts : ce sont des rectangles. Réponse A.\n⛔ Le piège du a) : compter seulement les faces que l'on voit. Trois faces sont cachées.\nRéponse : a) 6 ; b) A.",
          micros: ["cp_solide_faces"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["A", "A) rectangles", "rectangles", "des rectangles"] },
          ],
        },
        {
          enonce: "Théo trace une figure sur le quadrillage. Il manque un côté.\na) Quand il aura fini, quelle figure aura-t-il ?\nA) un carré B) un rectangle C) un triangle\nb) Combien de sommets aura sa figure ?",
          figure: dessin({
            l: 7,
            h: 5,
            u: 28,
            grille: true,
            label: "Une figure à finir sur un quadrillage",
            formes: [{ t: "poly", pts: [[1, 1], [5, 1], [5, 3], [1, 3]], ouvert: true, c: BLEU, w: 3 }],
          }),
          correction:
            "a) Je compte les carreaux de chaque côté tracé.\nEn haut : 4 carreaux. À droite : 2 carreaux. En bas : 4 carreaux.\nLe côté qui manque, à gauche, relie les deux bouts : 2 carreaux.\nDeux côtés longs et deux côtés courts : c'est un rectangle. Réponse B.\nb) Un rectangle a 4 coins : 4 sommets.\n⛔ Le piège du a) : choisir « un carré ». Les côtés n'ont pas tous la même longueur.\nRéponse : a) B ; b) 4.",
          micros: ["cp_figure_tracer"],
          reponses: [
            { question: "a)", attendu: ["B", "B) un rectangle", "rectangle", "un rectangle"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Prends ta règle. Quels points sont alignés ?\nÉcris la lettre.\nA) A, B et C\nB) A, B et D\nC) B, C et D",
          figure: dessin({
            l: 8,
            h: 5,
            u: 28,
            label: "Quatre points",
            formes: [
              { t: "point", en: [1, 1], nom: "A", vers: "h" },
              { t: "point", en: [3, 2], nom: "B", vers: "h" },
              { t: "point", en: [5, 3], nom: "C", vers: "h" },
              { t: "point", en: [7, 3.6], nom: "D", vers: "h" },
            ],
          }),
          correction:
            "Je pose ma règle sur deux points, puis je regarde le troisième.\nA : la règle sur A et C passe par B. Les trois sont alignés.\nB : la règle sur A et B passe sous D. D n'est pas sur la règle.\nC : la règle sur B et D ne touche pas C.\n⛔ Le piège : choisir avec l'œil seul. Le point D a l'air d'être sur la ligne. La règle montre que non.\nRéponse : A.",
          micros: ["cp_figure_alignement"],
          reponses: [{ attendu: ["A", "A) A, B et C"] }],
        },
        {
          enonce: "Regarde les trois solides.\na) La boule peut-elle rouler ? Écris oui ou non.\nb) Le cube peut-il rouler ?\nc) Le cylindre couché peut-il rouler ?",
          figure: dessin({
            l: 14,
            h: 6,
            u: 21,
            label: "Une boule, un cube et un cylindre",
            formes: [
              ...boule([2, 2.6], 1.6),
              ...pave([4.8, 4.2], 2.6, 2.6, 2.6),
              ...cylindre([11.6, 4.2], 1.4, 0.45, 3),
              { t: "texte", en: [2, 5.4], txt: "boule", c: GRIS },
              { t: "texte", en: [6.1, 5.4], txt: "cube", c: GRIS },
              { t: "texte", en: [11.6, 5.4], txt: "cylindre", c: GRIS },
            ],
          }),
          correction:
            "Un solide roule s'il a une partie toute ronde.\na) La boule est ronde de tous les côtés : elle roule. Oui.\nb) Le cube n'a que des faces plates et des coins : il ne roule pas. Non.\nc) Couché, le cylindre roule sur son côté arrondi, comme un rouleau de pâtisserie. Oui.\n⛔ Le piège du c) : dire non. Debout sur son disque, il ne roule pas. Couché, il roule.\nRéponse : a) oui ; b) non ; c) oui.",
          micros: ["cp_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
          ],
        },
        {
          enonce: "Lisa dessine cette figure à la règle.\na) Combien de côtés a-t-elle ?\nb) Combien de sommets a-t-elle ?",
          figure: dessin({
            l: 7,
            h: 7,
            u: 26,
            grille: true,
            label: "Une figure en forme de L",
            formes: [{ t: "poly", pts: [[1, 1], [3, 1], [3, 4], [6, 4], [6, 6], [1, 6]], fill: VERT_CLAIR, c: VERT, w: 3 }],
          }),
          correction:
            "Je pars d'un coin, et je fais le tour avec le doigt.\na) Je compte chaque trait droit : 1, 2, 3, 4, 5, 6. Elle a 6 côtés.\nb) Je compte chaque coin, même celui du creux : 1, 2, 3, 4, 5, 6. Elle a 6 sommets.\n⛔ Le piège : oublier le coin du creux, à l'intérieur du L. Lui aussi est un sommet.\nRéponse : a) 6 ; b) 6.",
          micros: ["cp_figure_decrire"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Léo appuie un solide dans la pâte à sel. Il laisse une trace.\na) Une face du cube laisse quelle trace ?\nb) Le fond du cylindre laisse quelle trace ?\nChoisis : carré, triangle ou disque.",
          figure: dessin({
            l: 10,
            h: 5.5,
            u: 24,
            label: "Un cube et un cylindre",
            formes: [...pave([0.8, 4.6], 3, 3, 3), ...cylindre([7.4, 4.6], 1.5, 0.5, 3.4)],
          }),
          correction:
            "La trace a la forme de la face posée dans la pâte.\na) Une face du cube a 4 côtés égaux : la trace est un carré.\nb) Le fond du cylindre est tout rond et plat : la trace est un disque.\n⛔ Le piège du b) : répondre « rectangle », en regardant le cylindre de côté. Seul le fond touche la pâte.\nRéponse : a) carré ; b) disque.",
          micros: ["cp_solide_faces", "cp_solide_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré"] },
            { question: "b)", attendu: ["disque", "un disque"] },
          ],
        },
        {
          enonce: "Combien de triangles vois-tu sur ce dessin ?\nAttention, certains sont tournés.",
          figure: dessin({
            l: 14,
            h: 5,
            u: 21,
            label: "Des figures dans tous les sens",
            formes: [
              { t: "poly", pts: [[0.5, 4], [3, 4], [1.7, 1]], fill: ORANGE_CLAIR },
              { t: "poly", pts: [[3.6, 0.8], [6.4, 0.8], [5, 4]], fill: ORANGE_CLAIR },
              rect(7, 1.2, 2.4, 2.4, BLEU_CLAIR),
              { t: "poly", pts: [[10, 1], [13.4, 2.2], [10.6, 4.3]], fill: ORANGE_CLAIR },
              { t: "poly", pts: [[11.6, 0.3], [13.8, 0.3], [13.8, 1.3], [11.6, 1.3]], fill: VIOLET_CLAIR },
            ],
          }),
          correction:
            "Je compte les côtés de chaque figure, même tournée.\n1re : 3 côtés, un triangle.\n2e : 3 côtés, pointe en bas, un triangle.\n3e : 4 côtés égaux, un carré.\n4e : 3 côtés, penché, un triangle.\n5e : 4 côtés, un rectangle.\nJe trouve 3 triangles.\n⛔ Le piège : oublier le triangle à l'envers. Pointe en haut ou en bas, il a toujours 3 côtés.\nRéponse : 3.",
          micros: ["cp_figure_reconnaitre"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le défi. Je compte, je vérifie, puis je réponds.",
      rappel: [
        "Un carré a 4 côtés de même longueur.",
        "La règle dit si des points sont alignés, pas l'œil.",
        "Le cube : 6 faces carrées. Le pavé : 6 faces rectangles. La boule : aucune face plate.",
      ],
      exercices: [
        {
          titre: "Le carré d'Ana",
          enonce: "Ana trace un carré sur le quadrillage. Elle a déjà tracé deux côtés.\na) Combien de côtés reste-t-il à tracer ?\nb) Chaque côté mesure combien de carreaux ?",
          figure: dessin({
            l: 6,
            h: 6,
            u: 28,
            grille: true,
            label: "Un carré commencé sur un quadrillage",
            formes: [{ t: "poly", pts: [[1, 1], [1, 4], [4, 4]], ouvert: true, c: BLEU, w: 3 }],
          }),
          correction:
            "a) Un carré a 4 côtés. Ana en a tracé 2. 4 − 2 = 2. Il reste 2 côtés.\nb) Je compte les carreaux d'un côté tracé : 1, 2, 3. Le côté mesure 3 carreaux.\nDans un carré, tous les côtés ont la même longueur. Chaque côté mesure 3 carreaux.\n⛔ Le piège du a) : répondre 4, le nombre de côtés du carré. Deux sont déjà faits.\nRéponse : a) 2 ; b) 3.",
          micros: ["cp_figure_tracer", "cp_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "Les arbres de la jardinière",
          enonce: "Une jardinière veut planter quatre arbres alignés.\nElle a planté A, B, C et D.\nPrends ta règle. Quel arbre n'est pas aligné avec les autres ?",
          figure: dessin({
            l: 8,
            h: 5,
            u: 28,
            label: "Quatre arbres",
            formes: [
              { t: "point", en: [1, 1], nom: "A", vers: "h", c: VERT },
              { t: "point", en: [3, 2], nom: "B", vers: "h", c: VERT },
              { t: "point", en: [5, 2.6], nom: "C", vers: "h", c: VERT },
              { t: "point", en: [7, 4], nom: "D", vers: "h", c: VERT },
            ],
          }),
          correction:
            "Je pose ma règle sur les deux arbres du bout : A et D.\nB touche la règle : il est aligné.\nC est au-dessus de la règle : il n'est pas aligné.\nJe vérifie : la règle sur A et B passe aussi par D.\n⛔ Le piège : choisir à l'œil. C a l'air presque sur la ligne. La règle montre que non.\nRéponse : C.",
          micros: ["cp_figure_alignement", "cp_figure_defi"],
          reponses: [{ attendu: ["C", "l'arbre C"] }],
        },
        {
          titre: "Les devinettes des solides",
          enonce: "Qui suis-je ? Choisis : cube, pavé ou boule.\na) J'ai 6 faces. Toutes mes faces sont des carrés.\nb) J'ai 6 faces. Ce sont des rectangles allongés.\nc) Je n'ai aucune face plate. Je roule partout.",
          figure: dessin({
            l: 15,
            h: 5,
            u: 21,
            label: "Trois solides",
            formes: [...boule([2, 2.6], 1.6), ...pave([4.6, 4.2], 4, 1.6, 2), ...pave([10.4, 4.2], 2.4, 2.4, 2.4)],
          }),
          correction:
            "Je lis chaque devinette jusqu'au bout.\na) 6 faces, toutes carrées : le cube.\nb) 6 faces rectangles, allongées : le pavé.\nc) Aucune face plate, il roule : la boule.\n⛔ Le piège : répondre « cube » au b), dès « 6 faces ». Le cube et le pavé ont tous deux 6 faces. Seule leur forme change.\nRéponse : a) cube ; b) pavé ; c) boule.",
          micros: ["cp_solide_faces", "cp_solide_reconnaitre", "cp_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["cube", "le cube", "un cube"] },
            { question: "b)", attendu: ["pavé", "le pavé", "un pavé"] },
            { question: "c)", attendu: ["boule", "la boule", "une boule"] },
          ],
        },
        {
          titre: "Le tissu du couturier",
          enonce: "Un couturier a un morceau de tissu carré.\nIl le coupe d'un coin au coin d'en face.\na) Combien de triangles obtient-il ?\nb) Combien de sommets a chaque triangle ?",
          figure: dessin({
            l: 6,
            h: 6,
            u: 26,
            label: "Un carré coupé d'un coin à l'autre",
            formes: [rect(1, 1, 4, 4, ORANGE_CLAIR), { t: "seg", de: [1, 1], vers: [5, 5], c: ORANGE, w: 3, pt: true }],
          }),
          correction:
            "a) Le trait coupe le carré en deux morceaux. Chaque morceau a 3 côtés.\nIl obtient 2 triangles.\nb) Chaque triangle a 3 coins : 3 sommets.\n⛔ Le piège du a) : compter aussi le carré, et répondre 3. Une fois coupé, il n'y a plus de carré.\nRéponse : a) 2 ; b) 3.",
          micros: ["cp_figure_decrire", "cp_figure_defi"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },
  ],
};
