// ─── Fiche d'exercices : droites, parallèles, perpendiculaires (CM1) ───────────
//
// 10/11/2026 : feuille interactive de la notion `droite` du coach CM1 (5
// micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Chaque exercice a son champ `reponses`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/droites.bank.ts`
// et la carte mentale `cm1/droite` (`lib/cartes/remplies/cm1.json`) : segment,
// demi-droite, droite ; parallèles (même écart) ; perpendiculaires (angle
// droit) ; tracer à l'équerre ; deux perpendiculaires à une même droite sont
// parallèles. Plus l'ALIGNEMENT (programme du CM1 : points alignés, à la règle).
// ⛔ CM1 : AUCUNE construction à rendre. Un tracé devient une lecture sur
// quadrillage (« par quel point passe-t-elle ? ») ou un QCM.
//
// Les pièges nommés : prendre une droite pour un segment (1), croire des
// traits parallèles parce qu'ils ne se coupent pas SUR le dessin (2, 11),
// prendre un angle presque droit pour un angle droit (3, 13), « une droite se
// mesure » (4), juger l'alignement à l'œil (5, 12), confondre [EF] et (EF) (7),
// le compas pour une perpendiculaire (8), un côté en biais (9), une rue en
// biais (10, 15), 3 h et 6 h (14), compter les barreaux au lieu des intervalles
// (17), oublier une ligne (18), oublier les diagonales (19), « deux
// perpendiculaires se coupent » (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : train (6), plan de ville (10), menuiserie
// (11), jardin (12), horloge (14), ferronnerie (15), peinture (17), handball
// (18), sport (19), architecture (20).
// Métiers : menuisier (11), jardinière (12), ferronnière (15), peintre (17),
// arbitre (18), professeure d'EPS (19), architecte (20).
//
// ⭐ FAIT RÉEL, et sa source :
//   · ex. 18 — un terrain de handball mesure 40 m sur 20 m (Règles du jeu de
//     l'IHF, règle 1 « L'aire de jeu »).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `dessins-geometrie-cm1.tsx` (repère en carreaux, y vers le
// bas). Chaque point à lire est sur un nœud du quadrillage.
//
// Micro-compétences : droite_reconnaitre (1, 4, 5, 7, 12, 19), droite_parallele
// (2, 6, 9, 10, 11, 13, 15, 17, 18), droite_perpendiculaire (3, 4, 9, 10, 13,
// 14, 15, 18), droite_tracer (8, 16), droite_defi (17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, ROUGE, VERT, VIOLET, dessin, ecranSeulement } from "@/lib/fiches-exercices/dessins-geometrie-cm1";

export const exercicesDroiteCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "droite",
  titre: "Droites parallèles et perpendiculaires",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un segment, une demi-droite, une droite. Repérer des droites parallèles : elles gardent le même écart. Repérer des droites perpendiculaires : elles font un angle droit. Trouver des points alignés. Un plan de ville, un portail, une échelle, un terrain de handball et des plots de sport. Un rappel de cours avant chaque niveau. Cherche d'abord avec ta règle et ton équerre. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien le dessin, avec ma règle et mon équerre.",
      rappel: [
        "Un segment a 2 bouts. Une demi-droite a 1 seul bout. Une droite n'a pas de bout.",
        "Deux droites parallèles gardent le même écart. Elles ne se coupent jamais.",
        "Deux droites perpendiculaires se coupent en faisant un angle droit. Je vérifie à l'équerre.",
        "Des points alignés sont sur une même droite. Je vérifie avec la règle.",
      ],
      exercices: [
        {
          enonce: "Les pointillés veulent dire : le trait continue sans fin.\nPour chaque trait, écris : segment, demi-droite ou droite.\na) Le trait 1.\nb) Le trait 2.\nc) Le trait 3.",
          figure: dessin({
            l: 12,
            h: 6.6,
            label: "Trois traits : un segment, une demi-droite, une droite",
            formes: [
              { t: "texte", en: [0.4, 1], txt: "1" },
              { t: "seg", de: [2.5, 1], vers: [8, 1] },
              { t: "point", en: [2.5, 1], nom: "A", vers: "h" },
              { t: "point", en: [8, 1], nom: "B", vers: "h" },
              { t: "texte", en: [0.4, 3.3], txt: "2" },
              { t: "seg", de: [2.5, 3.3], vers: [10.5, 3.3] },
              { t: "seg", de: [10.5, 3.3], vers: [11.9, 3.3], pt: true },
              { t: "point", en: [2.5, 3.3], nom: "C", vers: "h" },
              { t: "point", en: [6, 3.3], nom: "D", vers: "h" },
              { t: "texte", en: [0.4, 5.6], txt: "3" },
              { t: "seg", de: [1, 5.6], vers: [2.3, 5.6], pt: true },
              { t: "seg", de: [2.3, 5.6], vers: [10.5, 5.6] },
              { t: "seg", de: [10.5, 5.6], vers: [11.9, 5.6], pt: true },
              { t: "point", en: [4, 5.6], nom: "E", vers: "h" },
              { t: "point", en: [8, 5.6], nom: "F", vers: "h" },
            ],
          }),
          correction:
            "Je regarde les deux bouts de chaque trait.\na) Le trait 1 s'arrête en A et en B : 2 bouts. C'est un segment, le segment [AB].\nb) Le trait 2 s'arrête en C, mais continue après D : 1 seul bout. C'est une demi-droite, [CD).\nc) Le trait 3 continue des deux côtés : aucun bout. C'est une droite, la droite (EF).\n⛔ Le piège : dire « segment » pour le trait 3 parce qu'il tient sur la feuille. On ne dessine qu'un morceau de la droite : elle ne s'arrête jamais.\nRéponse : a) segment ; b) demi-droite ; c) droite.",
          reponses: [
            { question: "a)", attendu: ["segment", "un segment", "le segment", "[AB]"] },
            { question: "b)", attendu: ["demi-droite", "demi droite", "une demi-droite", "une demi droite", "[CD)"] },
            { question: "c)", attendu: ["droite", "une droite", "la droite", "(EF)"] },
          ],
          micros: ["droite_reconnaitre"],
        },
        {
          enonce: "Voici trois paires de traits sur un quadrillage.\na) Quelle paire est parallèle : A, B ou C ?\nb) Paire B : combien de carreaux d'écart en haut ?\nc) Paire B : combien de carreaux d'écart en bas ?",
          figure: dessin({
            l: 15,
            h: 6,
            grille: true,
            label: "Trois paires de traits A, B et C sur un quadrillage",
            formes: [
              { t: "texte", en: [2.5, 0.45], txt: "A" },
              { t: "seg", de: [1, 1], vers: [4, 5], c: BLEU },
              { t: "seg", de: [1, 5], vers: [4, 1], c: ORANGE },
              { t: "texte", en: [7.5, 0.45], txt: "B" },
              { t: "seg", de: [6, 1], vers: [6, 5], c: BLEU },
              { t: "seg", de: [8, 1], vers: [9, 5], c: ORANGE },
              { t: "texte", en: [12.5, 0.45], txt: "C" },
              { t: "seg", de: [11, 5], vers: [12, 1], c: BLEU },
              { t: "seg", de: [13, 5], vers: [14, 1], c: ORANGE },
            ],
          }),
          correction:
            "Je compte les carreaux d'écart entre les deux traits, en haut puis en bas.\na) Paire A : les traits se croisent. Pas parallèles.\nPaire B : je compte en haut, puis en bas. L'écart change. Pas parallèles.\nPaire C : 2 carreaux en haut, 2 carreaux en bas. Même écart partout : la paire C est parallèle.\nb) Paire B, en haut : de 6 à 8, il y a 2 carreaux.\nc) Paire B, en bas : de 6 à 9, il y a 3 carreaux. Plus loin, les traits finiraient par se croiser… mais en haut !\n⛔ Le piège : choisir B parce que les traits ne se touchent pas sur le dessin. Ne pas se couper sur la feuille ne suffit pas : l'écart doit rester le même.\nRéponse : a) C ; b) 2 ; c) 3.",
          reponses: [
            { question: "a)", attendu: ["C", "la paire C", "paire C"] },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "3" },
          ],
          micros: ["droite_parallele"],
        },
        {
          enonce: "Voici trois paires de droites qui se coupent.\na) Quelle paire est perpendiculaire : A, B ou C ?\nb) Ces deux droites perpendiculaires font combien d'angles droits ?",
          figure: dessin({
            l: 15,
            h: 6,
            grille: true,
            label: "Trois paires de droites qui se coupent, A, B et C",
            formes: [
              { t: "texte", en: [2.5, 0.45], txt: "A" },
              { t: "seg", de: [0.5, 3], vers: [4.5, 3], c: BLEU },
              { t: "seg", de: [2.5, 1], vers: [2.5, 5], c: ORANGE },
              { t: "texte", en: [7.5, 0.45], txt: "B" },
              { t: "seg", de: [5.5, 3], vers: [9.5, 3], c: BLEU },
              { t: "seg", de: [6.5, 5], vers: [8.5, 1], c: ORANGE },
              { t: "texte", en: [12.5, 0.45], txt: "C" },
              { t: "seg", de: [10.5, 5], vers: [14.5, 1], c: BLEU },
              { t: "seg", de: [11, 1], vers: [14, 5], c: ORANGE },
            ],
          }),
          correction:
            "Je pose le coin de mon équerre là où les droites se coupent.\na) Paire A : une droite suit le quadrillage à l'horizontale, l'autre à la verticale. L'équerre colle : angle droit. La paire A est perpendiculaire.\nPaire B : l'angle est trop fermé. Pas d'angle droit.\nPaire C : l'angle semble presque droit. Mais l'équerre ne colle pas tout à fait : pas perpendiculaire.\nb) Deux droites perpendiculaires font 4 angles droits, comme le signe +.\n⛔ Le piège : choisir C « à l'œil ». Presque droit, ce n'est pas droit : je vérifie toujours à l'équerre.\nRéponse : a) A ; b) 4.",
          reponses: [
            { question: "a)", attendu: ["A", "la paire A", "paire A"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
          micros: ["droite_perpendiculaire"],
        },
        {
          enonce: "Vrai ou faux ?\na) Deux droites parallèles se coupent.\nb) Deux droites perpendiculaires font un angle droit.\nc) Une droite se mesure avec la règle.\nd) Un segment a deux bouts.",
          correction:
            "Je relis la règle de chaque mot.\na) Des parallèles gardent le même écart : elles ne se coupent jamais. Faux.\nb) Perpendiculaires veut dire : elles se coupent en angle droit. Vrai.\nc) Une droite n'a pas de bout : on ne peut pas la mesurer. On mesure un segment. Faux.\nd) Un segment s'arrête des deux côtés : 2 bouts. Vrai.\n⛔ Le piège : c). On trace une droite à la règle, mais on ne la mesure pas. Elle ne s'arrête jamais.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
          micros: ["droite_reconnaitre", "droite_perpendiculaire"],
        },
        {
          enonce: "Regarde les points sur le quadrillage.\na) Quels points sont alignés avec A et B ?\nb) Les points A, B et D sont-ils alignés ? Réponds oui ou non.",
          figure: dessin({
            l: 8,
            h: 5,
            grille: true,
            u: 28,
            label: "Six points sur un quadrillage : A, B, C, D, E, F",
            formes: [
              { t: "point", en: [1, 4], nom: "A", vers: "bg" },
              { t: "point", en: [3, 3], nom: "B", vers: "bd" },
              { t: "point", en: [5, 2], nom: "C", vers: "bd" },
              { t: "point", en: [7, 1], nom: "F", vers: "hd" },
              { t: "point", en: [5, 4], nom: "D", vers: "bd" },
              { t: "point", en: [2, 1], nom: "E", vers: "hd" },
            ],
          }),
          correction:
            "Je pose ma règle sur A et B. Je regarde quels points touchent la règle.\nSur le quadrillage, je compte aussi le chemin : de A à B, 2 carreaux à droite et 1 vers le haut.\na) Je refais le même chemin depuis B : 2 à droite, 1 vers le haut. J'arrive sur C. Encore une fois : j'arrive sur F. Les points C et F sont alignés avec A et B.\nb) D est à droite de B, mais plus bas. Il n'est pas sur la règle : A, B et D ne sont pas alignés.\n⛔ Le piège : juger à l'œil. D « a l'air » dans la ligne. Seule la règle le dit.\nRéponse : a) C et F ; b) non.",
          reponses: [
            { question: "a)", attendu: ["C ; F", "C et F", "F et C"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
          micros: ["droite_reconnaitre"],
        },
        {
          enonce: "Où vois-tu deux traits parallèles ?\nA) Les deux aiguilles d'une horloge à 2 h.\nB) Les deux rails d'une voie ferrée.\nC) Les deux branches d'un compas ouvert.",
          correction:
            "Je cherche deux traits qui gardent le même écart, sans jamais se toucher.\nA) Les aiguilles partent du même centre : elles se touchent. Pas parallèles.\nB) Les rails gardent toujours le même écart, sinon le train tomberait. Ils sont parallèles.\nC) Les branches du compas se touchent en haut. Pas parallèles.\n⛔ Le piège : C. Les deux pointes sont écartées en bas, mais les branches se rejoignent en haut.\nRéponse : B.",
          reponses: [{ attendu: ["B", "b) les deux rails d'une voie ferrée", "les rails", "les deux rails"] }],
          micros: ["droite_parallele"],
        },
        {
          enonce: "On regarde trois écritures.\nA) [EF]   B) (EF)   C) [EF)\na) Laquelle écrit la droite qui passe par E et F ?\nb) Laquelle écrit le segment qui va de E à F ?\nc) Laquelle écrit la demi-droite qui part de E et passe par F ?",
          correction:
            "Le crochet veut dire : le trait s'arrête là. La parenthèse veut dire : il continue.\na) Une droite continue des deux côtés : deux parenthèses. (EF), c'est B.\nb) Un segment s'arrête des deux côtés : deux crochets. [EF], c'est A.\nc) La demi-droite s'arrête en E, mais continue après F : un crochet puis une parenthèse. [EF), c'est C.\n⛔ Le piège : écrire [EF] pour une droite. Les crochets « ferment » le trait : c'est un segment.\nRéponse : a) B ; b) A ; c) C.",
          reponses: [
            { question: "a)", attendu: ["B", "(EF)", "(FE)"] },
            { question: "b)", attendu: ["A", "[EF]", "[FE]"] },
            { question: "c)", attendu: ["C", "[EF)"] },
          ],
          micros: ["droite_reconnaitre"],
        },
        {
          enonce: "Lina trace des droites.\na) Elle veut tracer une perpendiculaire à (d). Quel outil pose-t-elle contre (d) ?\nA) le compas   B) le rapporteur   C) l'équerre\nb) Pour une parallèle à (d) à 2 cm, elle place deux points. À combien de cm de (d) est chaque point ?",
          correction:
            "a) Une perpendiculaire fait un angle droit avec (d). L'outil de l'angle droit, c'est l'équerre : C.\nJe pose un côté de l'équerre contre (d), et je trace le long de l'autre côté.\nb) Une parallèle garde le même écart partout. Je place donc deux points à 2 cm de (d), puis je les relie.\n⛔ Le piège : a) le compas. Il sert à tracer des cercles et à reporter des longueurs, pas les angles droits.\nRéponse : a) C ; b) 2 cm.",
          reponses: [
            { question: "a)", attendu: ["C", "l'équerre", "équerre", "l equerre"] },
            { question: "b)", attendu: "2" },
          ],
          micros: ["droite_tracer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je vérifie chaque réponse avec la règle ou l'équerre.",
      rappel: [
        "Parallèles : je mesure l'écart à deux endroits. S'il est le même, elles sont parallèles.",
        "Perpendiculaires : je pose le coin de l'équerre au croisement. S'il colle, c'est un angle droit.",
        "Sur un quadrillage, les lignes horizontales et verticales sont perpendiculaires.",
        "Sur un quadrillage, des points alignés se suivent avec le même chemin de carreaux.",
      ],
      exercices: [
        {
          enonce: "Voici le quadrilatère ABCD.\na) Quel côté est parallèle à [AB] ?\nb) Quel côté est perpendiculaire à [AB] ?\nc) Combien d'angles droits a ce quadrilatère ?",
          figure: dessin({
            l: 9,
            h: 6,
            grille: true,
            label: "Le quadrilatère ABCD sur un quadrillage",
            formes: [
              { t: "poly", pts: [[1, 5], [8, 5], [8, 2], [3, 2]], c: BLEU },
              { t: "point", en: [1, 5], nom: "A", vers: "bg" },
              { t: "point", en: [8, 5], nom: "B", vers: "bd" },
              { t: "point", en: [8, 2], nom: "C", vers: "hd" },
              { t: "point", en: [3, 2], nom: "D", vers: "hg" },
            ],
          }),
          correction:
            "[AB] est en bas, à l'horizontale.\na) [DC] est en haut, à l'horizontale aussi. L'écart entre [AB] et [DC] fait 3 carreaux partout : ils sont parallèles.\nb) [BC] est vertical. Une ligne verticale et une ligne horizontale du quadrillage font un angle droit : [BC] est perpendiculaire à [AB].\nc) Je pose l'équerre à chaque coin.\nEn B : angle droit. En C : angle droit. En A et en D, le côté [AD] est en biais : pas d'angle droit.\nLe quadrilatère a 2 angles droits.\n⛔ Le piège : dire 4 angles droits « comme un rectangle ». Le côté [AD] penche : les angles A et D ne sont pas droits.\nRéponse : a) [DC] ; b) [BC] ; c) 2.",
          reponses: [
            { question: "a)", attendu: ["[DC]", "[CD]", "DC", "CD", "(DC)", "(CD)"] },
            { question: "b)", attendu: ["[BC]", "[CB]", "BC", "CB", "(BC)", "(CB)"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
          micros: ["droite_parallele", "droite_perpendiculaire"],
        },
        {
          enonce: "Voici le plan d'un quartier. Les rues sont numérotées.\na) Quelle rue est parallèle à la rue 1 ?\nb) Quelle rue est perpendiculaire à la rue 1 ?\nc) La rue 4 est-elle perpendiculaire à la rue 1 ? Réponds oui ou non.",
          figure: dessin({
            l: 12,
            h: 7,
            grille: true,
            u: 22,
            label: "Plan de quartier avec quatre rues numérotées",
            formes: [
              { t: "seg", de: [0.5, 1.5], vers: [11.5, 1.5], c: BLEU, w: 5 },
              { t: "texte", en: [1.5, 0.75], txt: "rue 1", c: BLEU },
              { t: "seg", de: [0.5, 5.5], vers: [11.5, 5.5], c: VERT, w: 5 },
              { t: "texte", en: [10.5, 6.3], txt: "rue 3", c: VERT },
              { t: "seg", de: [3, 0.3], vers: [3, 6.7], c: ORANGE, w: 5 },
              { t: "texte", en: [4.3, 3.5], txt: "rue 2", c: ORANGE },
              { t: "seg", de: [6, 6.7], vers: [10, 0.3], c: VIOLET, w: 5 },
              { t: "texte", en: [9.9, 3.5], txt: "rue 4", c: VIOLET },
            ],
          }),
          correction:
            "Je regarde chaque rue par rapport à la rue 1, qui est horizontale.\na) La rue 3 est horizontale aussi. L'écart avec la rue 1 fait 4 carreaux partout. La rue 3 est parallèle à la rue 1.\nb) La rue 2 est verticale. Elle coupe la rue 1 en faisant un angle droit. La rue 2 est perpendiculaire à la rue 1.\nc) La rue 4 coupe la rue 1, mais en biais. L'équerre ne colle pas : non.\n⛔ Le piège : c). Couper une rue ne suffit pas pour être perpendiculaire : il faut un angle droit.\nRéponse : a) la rue 3 ; b) la rue 2 ; c) non.",
          reponses: [
            { question: "a)", attendu: ["3", "rue 3", "la rue 3"] },
            { question: "b)", attendu: ["2", "rue 2", "la rue 2"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          micros: ["droite_parallele", "droite_perpendiculaire"],
        },
        {
          enonce: "Un menuisier mesure l'écart entre deux traits, à deux endroits.\nPaire A : 2 cm et 2 cm.\nPaire B : 3 cm et 4 cm.\nPaire C : 1,5 cm et 1,5 cm.\na) Quelles paires sont parallèles ?\nb) Paire B : de combien de cm l'écart change-t-il ?",
          correction:
            "Des traits parallèles ont le même écart partout.\na) Paire A : 2 cm et 2 cm, le même écart. Parallèles.\nPaire B : 3 cm puis 4 cm, l'écart change. Pas parallèles.\nPaire C : $1{,}5$ cm et $1{,}5$ cm, le même écart. Parallèles.\nLes paires A et C sont parallèles.\nb) Paire B : de 3 cm à 4 cm, l'écart change de 4 − 3 = 1 cm. Les traits s'écartent : de l'autre côté, ils finiraient par se couper.\n⛔ Le piège : regarder une seule mesure. Avec une seule mesure, on ne sait rien : il en faut deux.\nRéponse : a) A et C ; b) 1 cm.",
          reponses: [
            { question: "a)", attendu: ["A ; C", "A et C", "C et A"] },
            { question: "b)", attendu: "1" },
          ],
          micros: ["droite_parallele"],
        },
        {
          enonce: "Une jardinière plante des arbres en ligne. Elle veut un rang bien droit.\na) Combien de ces arbres sont sur la droite (PQ), P et Q compris ?\nb) L'arbre T est-il aligné avec P et Q ? Réponds oui ou non.",
          figure: dessin({
            l: 9,
            h: 6,
            grille: true,
            label: "Six arbres sur un quadrillage : P, Q, R, S, T, U",
            formes: [
              { t: "point", en: [1, 5], nom: "P", vers: "bg", c: VERT, rond: true },
              { t: "point", en: [3, 4], nom: "Q", vers: "bd", c: VERT, rond: true },
              { t: "point", en: [5, 3], nom: "R", vers: "bd", c: VERT, rond: true },
              { t: "point", en: [7, 2], nom: "S", vers: "bd", c: VERT, rond: true },
              { t: "point", en: [6, 4], nom: "T", vers: "bd", c: VERT, rond: true },
              { t: "point", en: [4, 1], nom: "U", vers: "hd", c: VERT, rond: true },
            ],
          }),
          correction:
            "Je compte le chemin de P à Q : 2 carreaux à droite, 1 vers le haut.\na) Je refais ce chemin depuis Q : j'arrive sur R. Puis depuis R : j'arrive sur S.\nP, Q, R et S sont sur la même droite. Cela fait 4 arbres.\nb) Depuis R, pour aller sur T, il faut 1 à droite et 1 vers le bas. Ce n'est pas le même chemin. T n'est pas aligné.\nJe vérifie à la règle : posée sur P et Q, elle ne touche pas T.\n⛔ Le piège : oublier P et Q dans le compte. La question dit « P et Q compris » : 2 + 2 = 4.\nRéponse : a) 4 ; b) non.",
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["non", "faux"] },
          ],
          micros: ["droite_reconnaitre"],
        },
        {
          enonce: "Regarde les droites (d), (r), (s) et (t).\na) Quelle droite est perpendiculaire à (d) ?\nb) Quelle droite est parallèle à (d) ?",
          figure: dessin({
            l: 10,
            h: 8,
            grille: true,
            label: "Quatre droites (d), (r), (s) et (t) sur un quadrillage",
            formes: [
              { t: "seg", de: [1, 7], vers: [7, 1], c: ROUGE, w: 2.5 },
              { t: "texte", en: [0.6, 6.4], txt: "(d)", c: ROUGE },
              { t: "seg", de: [2, 1], vers: [8, 7], c: BLEU },
              { t: "texte", en: [1.6, 0.5], txt: "(r)", c: BLEU },
              { t: "seg", de: [1, 2], vers: [9, 6], c: VERT },
              { t: "texte", en: [9.5, 6.4], txt: "(s)", c: VERT },
              { t: "seg", de: [4, 7], vers: [9, 2], c: VIOLET },
              { t: "texte", en: [9.5, 1.5], txt: "(t)", c: VIOLET },
            ],
          }),
          correction:
            "(d) traverse les carreaux en diagonale : 1 carreau à droite, 1 carreau vers le haut.\na) (r) traverse aussi les carreaux en diagonale, mais dans l'autre sens : 1 à droite, 1 vers le bas. Les deux diagonales d'un carreau sont perpendiculaires. Je vérifie à l'équerre : (r) est perpendiculaire à (d).\n(s) monte moins vite : 2 carreaux à droite pour 1 vers le bas. Elle coupe (d), mais pas en angle droit.\nb) (t) a le même chemin que (d) : 1 à droite, 1 vers le haut. L'écart reste le même : (t) est parallèle à (d).\n⛔ Le piège : choisir (s) en a). Elle coupe (d) presque en angle droit… presque seulement.\nRéponse : a) (r) ; b) (t).",
          reponses: [
            { question: "a)", attendu: ["(r)", "r", "la droite (r)"] },
            { question: "b)", attendu: ["(t)", "t", "la droite (t)"] },
          ],
          micros: ["droite_perpendiculaire", "droite_parallele"],
        },
        {
          enonce: "Les deux aiguilles d'une horloge partent du centre.\na) À quelle heure sont-elles perpendiculaires ?\nA) 6 h   B) 3 h   C) 1 h\nb) À 6 h, que forment les deux aiguilles ?\nA) une seule droite   B) un angle aigu   C) deux traits parallèles",
          correction:
            "a) À 3 h, la grande aiguille montre le 12, en haut. La petite montre le 3, à droite.\nEn haut et à droite : c'est un quart de tour, un angle droit. Elles sont perpendiculaires : B.\nÀ 1 h, l'angle est aigu. À 6 h, les aiguilles sont opposées.\nb) À 6 h, la grande aiguille montre le 12, en haut, et la petite le 6, en bas.\nElles partent dans deux sens opposés, sur la même ligne : une seule droite. C'est A.\n⛔ Le piège : b) « parallèles ». Les aiguilles partent du même centre : elles se touchent, elles ne peuvent pas être parallèles.\nRéponse : a) B ; b) A.",
          reponses: [
            { question: "a)", attendu: ["B", "3 h", "3h", "b) 3 h"] },
            { question: "b)", attendu: ["A", "une seule droite", "a) une seule droite", "une droite"] },
          ],
          micros: ["droite_perpendiculaire"],
        },
        {
          enonce: "Une ferronnière fabrique ce portail. La barre du bas est en rouge.\na) Combien de barres sont perpendiculaires à la barre rouge ?\nb) Combien de barres lui sont parallèles (sans compter elle-même) ?\nc) La barre en biais est-elle perpendiculaire à la barre rouge ? Réponds oui ou non.",
          figure: dessin({
            l: 12,
            h: 7,
            label: "Un portail : une barre rouge en bas, une barre en haut, cinq barres verticales et une barre en biais",
            formes: [
              { t: "seg", de: [1, 6], vers: [11, 6], c: ROUGE, w: 4 },
              { t: "seg", de: [1, 1], vers: [11, 1], w: 3 },
              { t: "seg", de: [1, 1], vers: [1, 6], w: 3 },
              { t: "seg", de: [3.5, 1], vers: [3.5, 6], w: 3 },
              { t: "seg", de: [6, 1], vers: [6, 6], w: 3 },
              { t: "seg", de: [8.5, 1], vers: [8.5, 6], w: 3 },
              { t: "seg", de: [11, 1], vers: [11, 6], w: 3 },
              { t: "seg", de: [3.5, 6], vers: [8.5, 1], c: BLEU, w: 3 },
            ],
          }),
          correction:
            "La barre rouge est horizontale.\na) Les barres verticales font un angle droit avec elle. Je les compte : 1, 2, 3, 4, 5. Il y a 5 barres perpendiculaires.\nb) La barre du haut est horizontale aussi, avec le même écart partout. Elle est parallèle à la barre rouge. Il y en a 1.\nc) La barre bleue penche : l'équerre ne colle pas. Non, elle n'est pas perpendiculaire.\n⛔ Le piège : compter la barre bleue en a). Elle coupe la barre rouge, mais en biais : ce n'est pas un angle droit.\nRéponse : a) 5 ; b) 1 ; c) non.",
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["1", "une"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          micros: ["droite_perpendiculaire", "droite_parallele"],
        },
        {
          enonce: "Inès veut tracer deux droites qui passent par le point M.\na) La parallèle à (d) passant par M passe aussi par quel point : P, Q, R ou S ?\nb) La perpendiculaire à (d) passant par M passe aussi par quel point ?",
          figure: dessin({
            l: 10,
            h: 7,
            grille: true,
            label: "Une droite (d), le point M et quatre points P, Q, R, S sur un quadrillage",
            formes: [
              { t: "seg", de: [0, 6.5], vers: [10, 1.5], c: ROUGE, w: 2.5 },
              { t: "texte", en: [9.4, 2.4], txt: "(d)", c: ROUGE },
              { t: "point", en: [2, 2], nom: "M", vers: "hg", c: BLEU },
              { t: "point", en: [4, 1], nom: "R", vers: "h" },
              { t: "point", en: [4, 6], nom: "P", vers: "bd" },
              { t: "point", en: [6, 1], nom: "Q", vers: "h" },
              { t: "point", en: [3, 3], nom: "S", vers: "bg" },
            ],
          }),
          correction:
            "Je compte d'abord le chemin de (d) : 2 carreaux à droite, 1 carreau vers le haut.\na) La parallèle a le même chemin. Depuis M : 2 à droite, 1 vers le haut. J'arrive sur R.\nb) Pour la perpendiculaire, je « tourne » le chemin d'un quart de tour : 1 carreau à droite, 2 carreaux vers le bas.\nDepuis M : 1 à droite, 2 vers le bas, puis encore 1 à droite, 2 vers le bas. J'arrive sur P.\nJe vérifie à l'équerre : (MP) coupe (d) en angle droit.\n⛔ Le piège : choisir Q en a). Q est à 4 carreaux à droite et 1 vers le haut. Pour être sur la parallèle, il faudrait 2 vers le haut.\nRéponse : a) R ; b) P.",
          reponses: [
            { question: "a)", attendu: ["R", "le point R"] },
            { question: "b)", attendu: ["P", "le point P"] },
          ],
          micros: ["droite_tracer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout, je fais un petit dessin, puis je réponds question par question.",
      rappel: [
        "Deux droites perpendiculaires à une même droite sont parallèles entre elles.",
        "Entre 8 barreaux, il y a 7 espaces : un de moins que de barreaux.",
        "Pour trouver des points alignés, je cherche toutes les lignes : en ligne, en colonne, en diagonale.",
      ],
      exercices: [
        {
          titre: "L'échelle du peintre",
          enonce: "Une peintre a une échelle de 8 barreaux. Chaque barreau est perpendiculaire au montant.\na) Les barreaux sont-ils parallèles entre eux ? Réponds oui ou non.\nb) Entre deux barreaux voisins, il y a 30 cm. Combien de cm du premier au dernier barreau ?",
          figure: dessin({
            l: 5,
            h: 9,
            u: 20,
            max: "max-w-[9rem] print:max-w-[7rem]",
            label: "Une échelle de 8 barreaux",
            formes: [
              { t: "seg", de: [1, 0.2], vers: [1, 8.8], w: 3 },
              { t: "seg", de: [4, 0.2], vers: [4, 8.8], w: 3 },
              ...[1, 2, 3, 4, 5, 6, 7, 8].map((k) => ({ t: "seg" as const, de: [1, k] as [number, number], vers: [4, k] as [number, number], c: ORANGE, w: 3 })),
            ],
          }),
          correction:
            "a) Chaque barreau est perpendiculaire au même montant.\nDeux droites perpendiculaires à une même droite sont parallèles. Oui, les barreaux sont parallèles.\nb) Je compte les ESPACES, pas les barreaux. Entre 8 barreaux, il y a 8 − 1 = 7 espaces.\n7 espaces de 30 cm : 7 × 30 = 210 cm.\n⛔ Le piège : faire 8 × 30 = 240 cm. Le premier barreau n'a pas d'espace avant lui : il y a 7 espaces, pas 8.\nRéponse : a) oui ; b) 210 cm.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: "210" },
          ],
          micros: ["droite_defi", "droite_parallele"],
        },
        {
          titre: "Les lignes de l'arbitre",
          enonce: "Avant le match, une arbitre vérifie les lignes du terrain de handball.\na) Combien de lignes sont parallèles à la ligne de but de gauche (sans elle) ?\nb) Combien de lignes lui sont perpendiculaires ?\nc) Le terrain mesure 40 m sur 20 m. Quel est l'écart entre les deux lignes de touche ?",
          figure: dessin({
            l: 12,
            h: 7,
            label: "Un terrain de handball vu de dessus : deux lignes de but, deux lignes de touche, une ligne médiane",
            formes: [
              { t: "case", x: 1, y: 1, l: 10, h: 5, fill: "#dcfce7" },
              { t: "seg", de: [1, 1], vers: [11, 1], c: BLEU, w: 3 },
              { t: "seg", de: [1, 6], vers: [11, 6], c: BLEU, w: 3 },
              { t: "seg", de: [1, 1], vers: [1, 6], c: ROUGE, w: 3 },
              { t: "seg", de: [11, 1], vers: [11, 6], c: ROUGE, w: 3 },
              { t: "seg", de: [6, 1], vers: [6, 6], w: 2 },
              { t: "texte", en: [6, 0.4], txt: "ligne de touche", c: BLEU, taille: 12 },
              { t: "texte", en: [6, 6.6], txt: "ligne de touche", c: BLEU, taille: 12 },
              { t: "texte", en: [2.6, 3.5], txt: "but", c: ROUGE, taille: 12 },
              { t: "texte", en: [9.4, 3.5], txt: "but", c: ROUGE, taille: 12 },
              { t: "texte", en: [7.3, 2], txt: "médiane", taille: 12 },
            ],
          }),
          correction:
            "La ligne de but de gauche est verticale.\na) Les lignes verticales lui sont parallèles : la ligne de but de droite et la ligne médiane. Cela fait 2 lignes.\nb) Les deux lignes de touche sont horizontales. Elles coupent la ligne de but en angle droit : 2 lignes perpendiculaires.\nc) Les lignes de touche sont parallèles. Leur écart, c'est la largeur du terrain : 20 m. La longueur, 40 m, est l'écart entre les deux lignes de but.\n⛔ Le piège : a) oublier la ligne médiane. Elle aussi garde le même écart avec la ligne de but.\nRéponse : a) 2 ; b) 2 ; c) 20 m.",
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["2", "deux"] },
            { question: "c)", attendu: "20" },
          ],
          micros: ["droite_defi", "droite_parallele", "droite_perpendiculaire"],
        },
        {
          titre: "Les plots de la professeure de sport",
          enonce: "Une professeure d'EPS pose 9 plots en carré : 3 rangées de 3.\nCombien de lignes droites passent par 3 plots ?",
          figure: dessin({
            l: 6,
            h: 6,
            u: 22,
            max: "max-w-[10rem] print:max-w-[8rem]",
            label: "Neuf plots en 3 rangées de 3",
            formes: [1, 3, 5].flatMap((y) => [1, 3, 5].map((x) => ({ t: "point" as const, en: [x, y] as [number, number], c: ORANGE, rond: true }))),
          }),
          correction:
            "Je cherche toutes les lignes, dans l'ordre.\nLes rangées, à l'horizontale : 3 lignes.\nLes colonnes, à la verticale : 3 lignes.\nLes diagonales, d'un coin à l'autre : 2 lignes.\nEn tout : 3 + 3 + 2 = 8 lignes.\n⛔ Le piège : répondre 6 et oublier les 2 diagonales. Les 3 plots d'une diagonale sont alignés aussi : je vérifie à la règle.\nRéponse : 8 lignes.",
          reponses: [{ attendu: ["8", "huit"] }],
          micros: ["droite_defi", "droite_reconnaitre"],
        },
        {
          titre: "Le plan de l'architecte",
          enonce: "Un architecte dessine le plan d'un nouveau quartier.\nLa rue A et la rue B sont toutes les deux perpendiculaires à l'avenue.\na) Que peut-on dire de la rue A et de la rue B ?\nA) Elles se coupent.   B) Elles sont perpendiculaires.   C) Elles sont parallèles.\nb) Sur le plan, l'écart entre la rue A et la rue B est 3 cm. 1 cm du plan représente 100 m. Quel est l'écart en vrai, en mètres ?",
          figure: ecranSeulement(
            dessin({
              l: 10,
              h: 6,
              grille: true,
              u: 22,
              label: "Une avenue horizontale et deux rues A et B qui lui sont perpendiculaires",
              formes: [
                { t: "seg", de: [0.5, 4], vers: [9.5, 4], c: BLEU, w: 5 },
                { t: "texte", en: [8.3, 4.8], txt: "avenue", c: BLEU },
                { t: "seg", de: [3, 0.5], vers: [3, 5.5], c: ORANGE, w: 4 },
                { t: "texte", en: [3.9, 1], txt: "A", c: ORANGE },
                { t: "seg", de: [6, 0.5], vers: [6, 5.5], c: VERT, w: 4 },
                { t: "texte", en: [6.9, 1], txt: "B", c: VERT },
                { t: "droit", en: [3, 4], u: [1, 0], v: [0, -1] },
                { t: "droit", en: [6, 4], u: [1, 0], v: [0, -1] },
              ],
            }),
          ),
          correction:
            "a) Je fais un dessin : l'avenue, puis deux rues qui la coupent en angle droit.\nLes deux rues partent dans la même direction et gardent le même écart. Deux droites perpendiculaires à une même droite sont parallèles : C.\nb) Sur le plan, 1 cm vaut 100 m. 3 cm valent 3 × 100 = 300 m.\n⛔ Le piège : a) répondre « perpendiculaires » parce que le mot est dans l'énoncé. Les rues sont perpendiculaires à l'AVENUE, pas l'une à l'autre.\nRéponse : a) C ; b) 300 m.",
          reponses: [
            { question: "a)", attendu: ["C", "elles sont parallèles", "parallèles", "c) elles sont parallèles"] },
            { question: "b)", attendu: "300" },
          ],
          micros: ["droite_defi", "droite_parallele"],
        },
      ],
    },
  ],
};
