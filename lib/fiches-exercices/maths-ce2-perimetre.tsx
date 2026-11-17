// ─── Fiche d'exercices : le périmètre (CE2) — 20 exercices corrigés ───────────
//
// 17/11/2026 : la feuille interactive de la notion `perimetre` du coach CE2
// (« Périmètres », 5 micros). Sur la forme de `maths-cm1-masse.tsx` et de
// `maths-cm1-perimetre.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce2/maths/perimetre.bank.ts`).
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : comprendre le périmètre (le
// TOUR), l'obtenir en ADDITIONNANT les côtés d'un polygone, comparer des
// périmètres (aussi SANS RÈGLE, en reportant les côtés au compas), le cas du
// rectangle et du carré. ⛔ Pas d'aire (CM1), pas de formule 2 × (L + l)
// (cycle 3), des longueurs entières en cm ou en m, jamais de virgule.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot.
// ⛔ 8 ans : phrases de 18 mots au plus, une idée par phrase.
// La saisie : un nombre seul ; `unite` refuse une autre unité (« 15 m » pour
// « 15 cm »).
//
// Les pièges nommés : le tour et le dedans (1, 7, 11), oublier un côté (2, 5),
// compter les carreaux au lieu des côtés (3, 11), 5 × 5 pour un carré (4),
// additionner seulement deux côtés du rectangle (6, 9), juger « à l'œil » (8),
// 6 + 8 = 14 donné comme réponse (10), plus de côtés = plus long (12), 36 ÷ 2
// (13), le plus grand nombre écrit = le plus grand tour (14), 6 côtés comptés
// 4 (15), la largeur 20 ou 10 (16), oublier la porte (17), 2 rouleaux (18),
// compter le côté collé (19), la largeur 8 au lieu de 4 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fête (2), jeux (3), cuisine (4),
// construction (5), poste (6), maison (7), ferme (8, 17), jardin (9),
// couture (10, 18), terrasse (11), dessin (12), sport (14), cantine (15),
// encadrement (16), carrelage (19), bijou (20).
// Les métiers : maçon (5), jardinier (9), couturière (10, 18), encadreur (16), éleveuse (17),
// carreleur (19), bijoutière (20).
// Aucun contexte réunionnais sur cette feuille (la notion en a ailleurs).
//
// ⭐ FAIT RÉEL : 1 m = 100 cm (Système international, BIPM). Toutes les
// mesures sont des MODÈLES.
//
// ⭐ LES DESSINS : des polygones aux côtés écrits (`figure`), des figures sur
// quadrillage dont on compte le contour (`grille`), des côtés reportés au
// compas sur une droite (`reports`). ⛔ Aucun périmètre écrit sur un dessin.
//
// Micro-compétences : ce2_perimetre_comprendre (1, 3, 7, 11), ce2_perimetre_
// polygone (2, 3, 5, 10, 11, 15), ce2_perimetre_comparer (8, 12, 14, 19),
// ce2_perimetre_rectangle (4, 6, 9, 13, 14, 16, 17, 18, 20), ce2_perimetre_defi
// (17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ORANGE, ORANGE_CLAIR, VERT, VERT_CLAIR, figure, grille, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const NOIR = "#0f172a";

/** Un polygone régulier de `n` côtés, de rayon `r`, posé sur un côté horizontal. */
const regulier = (n: number, r: number): P2[] =>
  Array.from({ length: n }, (_, k) => {
    const a = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * k) / n;
    return [r * Math.cos(a), r * Math.sin(a)] as P2;
  });

const rect4 = (x: number, y: number, w: number, h: number): P2[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

/**
 * Les côtés de chaque figure REPORTÉS AU COMPAS, bout à bout, sur une droite :
 * un segment par figure, chaque côté d'une autre couleur, des petits arcs de
 * compas aux jonctions. Aucune longueur écrite : on compare à l'œil.
 */
const reports = (lignes: { nom: string; morceaux: number[] }[]) => {
  const u = 24;
  const H = lignes.length * 48 + 8;
  const teintes = [BLEU, ORANGE, VERT, "#7c3aed"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Côtés reportés au compas sur une droite">
        {lignes.map((l, i) => {
          const y = 30 + i * 48;
          let x = 44;
          return (
            <g key={l.nom}>
              <text x={8} y={y + 5} fontSize="16" fontWeight="900" fill={NOIR}>
                {l.nom}
              </text>
              <line x1={40} y1={y} x2={292} y2={y} stroke="#cbd5e1" strokeWidth={1.5} />
              {l.morceaux.map((m, k) => {
                const x0 = x;
                x += m * u;
                return (
                  <g key={k}>
                    <line x1={x0} y1={y} x2={x} y2={y} stroke={teintes[k % teintes.length]} strokeWidth={6} strokeLinecap="butt" />
                    <path d={`M ${x - 5} ${y - 11} A 12 12 0 0 1 ${x + 5} ${y - 11}`} fill="none" stroke={NOIR} strokeWidth={1.2} />
                    <line x1={x0} y1={y - 7} x2={x0} y2={y + 7} stroke={NOIR} strokeWidth={1.6} />
                  </g>
                );
              })}
              <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={NOIR} strokeWidth={1.6} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesPerimetreCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "perimetre",
  titre: "Le périmètre",
  accroche:
    "Vingt exercices, du plus simple au problème. Le périmètre, c'est le tour d'une figure. J'additionne tous les côtés d'un triangle, d'une maison, d'un rectangle ou d'un carré. Je compare des tours, même sans règle, au compas. Un fanion, un potager, une table de cantine, un poulailler, une nappe et un fil de fer. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le nombre seul, la lettre ou un mot.",
      rappel: [
        "Le périmètre, c'est la longueur du TOUR d'une figure.",
        "Pour le trouver, j'additionne TOUS les côtés. Je les compte d'abord.",
        "Sur un quadrillage, je compte les côtés de carreaux qui sont sur le bord.",
      ],
      exercices: [
        {
          enonce: "Écris la lettre. Le périmètre d'une figure, c'est :\nA) la place à l'intérieur\nB) la longueur de son tour\nC) le nombre de ses côtés",
          correction:
            "Le périmètre se mesure en faisant le tour de la figure, comme une fourmi qui marche sur le bord.\nC'est une longueur : on l'écrit en cm ou en m. Réponse B.\n⛔ Le piège : choisir A, la place à l'intérieur. L'intérieur, ce n'est pas le tour.\nRéponse : B.",
          micros: ["ce2_perimetre_comprendre"],
          reponses: [{ attendu: "B" }],
        },
        {
          enonce: "Pour la fête, Jade découpe un fanion en triangle.\nQuel est le périmètre du fanion ? Écris le nombre de cm.",
          figure: figure({ polys: [{ sommets: [[0, 0], [6, 0], [2.25, 3.31]], cotes: ["6 cm", "5 cm", "4 cm"], fond: ORANGE_CLAIR }] }),
          correction:
            "Un triangle a 3 côtés : 6 cm, 5 cm et 4 cm.\nJ'additionne les 3 côtés : $6 + 5 + 4 = 15$ cm.\n⛔ Le piège : additionner seulement deux côtés. Je compte les côtés avant de calculer.\nRéponse : 15.",
          micros: ["ce2_perimetre_polygone"],
          reponses: [{ attendu: "15", unite: "cm" }],
        },
        {
          enonce: "Sur ce tapis de jeu, le côté d'un carreau mesure 1 cm.\nQuel est le périmètre du rectangle bleu ? Écris le nombre de cm.",
          figure: grille({ col: 6, lig: 4, formes: [{ pts: [[1, 1], [5, 1], [5, 3], [1, 3]], couleur: BLEU_CLAIR, contour: BLEU }] }),
          correction:
            "Je fais le tour du rectangle en comptant les côtés de carreaux.\nEn bas : 4. À droite : 2. En haut : 4. À gauche : 2.\n$4 + 2 + 4 + 2 = 12$ cm.\n⛔ Le piège : compter les carreaux à l'intérieur (il y en a 8). Le périmètre, c'est le bord.\nRéponse : 12.",
          micros: ["ce2_perimetre_polygone", "ce2_perimetre_comprendre"],
          reponses: [{ attendu: "12", unite: "cm" }],
        },
        {
          enonce: "Un sous-verre carré a un côté de 5 cm.\nQuel est son périmètre ? Écris le nombre de cm.",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 5, 5), cotes: ["5 cm"], droits: [0, 1, 2, 3], fond: VERT_CLAIR }], hmax: 170 }),
          correction:
            "Un carré a 4 côtés de même longueur.\nJ'additionne les 4 côtés : $5 + 5 + 5 + 5 = 20$ cm.\nC'est aussi 4 fois 5 : $4 \\times 5 = 20$.\n⛔ Le piège : calculer $5 \\times 5 = 25$. Un carré a 4 côtés, pas 5.\nRéponse : 20.",
          micros: ["ce2_perimetre_rectangle"],
          reponses: [{ attendu: "20", unite: "cm" }],
        },
        {
          enonce: "Le maçon dessine le mur d'une cabane. Il a 5 côtés.\nQuel est son périmètre ? Écris le nombre de cm.",
          figure: figure({ polys: [{ sommets: [[0, 0], [4, 0], [4, 3], [2, 5.24], [0, 3]], cotes: ["4 cm", "3 cm", "3 cm", "3 cm", "3 cm"], fond: BLEU_CLAIR }] }),
          correction:
            "Je compte les côtés : il y en a 5.\nLe bas : 4 cm. Les deux murs : 3 cm et 3 cm. Le toit : 3 cm et 3 cm.\n$4 + 3 + 3 + 3 + 3 = 16$ cm.\n⛔ Le piège : oublier un côté du toit, et trouver 13 cm. Je coche chaque côté compté.\nRéponse : 16.",
          micros: ["ce2_perimetre_polygone"],
          reponses: [{ attendu: "16", unite: "cm" }],
        },
        {
          enonce: "Une étiquette de colis est un rectangle de 7 cm sur 3 cm.\nQuel est son périmètre ? Écris le nombre de cm.",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 7, 3), cotes: ["7 cm", "3 cm"], droits: [0, 1, 2, 3], fond: ORANGE_CLAIR }], hmax: 150 }),
          correction:
            "Un rectangle a 4 côtés : deux longueurs et deux largeurs.\nLes longueurs : 7 cm et 7 cm. Les largeurs : 3 cm et 3 cm.\n$7 + 3 + 7 + 3 = 20$ cm.\n⛔ Le piège : faire $7 + 3 = 10$. Ce n'est que la moitié du tour.\nRéponse : 20.",
          micros: ["ce2_perimetre_rectangle"],
          reponses: [{ attendu: "20", unite: "cm" }],
        },
        {
          enonce: "Vrai ou faux ?\na) Pour poser une clôture autour du jardin, je cherche son périmètre.\nb) Pour couvrir tout le sol de la chambre, je cherche son périmètre.",
          correction:
            "Le périmètre, c'est le tour.\na) La clôture fait le tour du jardin. Vrai.\nb) Couvrir le sol, c'est remplir le dedans, pas faire le tour. Faux.\n⛔ Le piège : croire que tout ce qui mesure une pièce est un périmètre. Je me demande : le tour ou le dedans ?\nRéponse : a) vrai ; b) faux.",
          micros: ["ce2_perimetre_comprendre"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "À la ferme, il y a deux enclos. Le côté d'un carreau mesure 1 m.\nQuel enclos a le plus grand périmètre ? Écris A ou B.",
          figure: grille({
            col: 12,
            lig: 5,
            formes: [
              { pts: [[1, 1], [4, 1], [4, 4], [1, 4]], couleur: VERT_CLAIR, contour: VERT, nom: "A", ou: [2.5, 2.5] },
              { pts: [[6, 1], [11, 1], [11, 3], [6, 3]], couleur: ORANGE_CLAIR, contour: ORANGE, nom: "B", ou: [8.5, 2] },
            ],
          }),
          correction:
            "Je fais le tour de chaque enclos.\nA : $3 + 3 + 3 + 3 = 12$ m.\nB : $5 + 2 + 5 + 2 = 14$ m.\n14 est plus grand que 12. C'est l'enclos B.\n⛔ Le piège : choisir A parce qu'il paraît plus gros. Je compte le tour, je ne devine pas.\nRéponse : B.",
          micros: ["ce2_perimetre_comparer"],
          reponses: [{ attendu: ["B", "l'enclos B"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. J'écris tous les côtés, puis j'additionne.",
      rappel: [
        "Rectangle : deux longueurs et deux largeurs. Carré : quatre côtés égaux.",
        "Au compas, je reporte les côtés bout à bout sur une droite. Ce segment a la longueur du tour.",
        "J'écris toujours l'unité : cm ou m. 1 m = 100 cm.",
      ],
      exercices: [
        {
          enonce: "Le potager du jardinier est un rectangle de 8 m sur 5 m.\nIl pose une clôture tout autour.\nQuelle longueur de clôture lui faut-il ? Écris le nombre de m.",
          correction:
            "La clôture fait le tour : je cherche le périmètre.\nDeux longueurs : 8 m et 8 m. Deux largeurs : 5 m et 5 m.\n$8 + 5 + 8 + 5 = 26$ m.\n⛔ Le piège : faire $8 + 5 = 13$ m. La clôture fait tout le tour, pas la moitié.\nRéponse : 26.",
          micros: ["ce2_perimetre_rectangle"],
          reponses: [{ attendu: "26", unite: "m" }],
        },
        {
          enonce: "La couturière coud un ruban autour d'un triangle de tissu. Le tour mesure 20 cm.\nDeux côtés mesurent 6 cm et 8 cm.\nCombien mesure le troisième côté ? Écris le nombre de cm.",
          correction:
            "Le périmètre, c'est la somme des 3 côtés : il fait 20 cm.\nLes deux côtés connus : $6 + 8 = 14$ cm.\nLe troisième côté : $20 - 14 = 6$ cm.\nJe vérifie : $6 + 8 + 6 = 20$.\n⛔ Le piège : répondre 14. C'est la somme des deux côtés connus, pas le troisième.\nRéponse : 6.",
          micros: ["ce2_perimetre_polygone"],
          reponses: [{ attendu: "6", unite: "cm" }],
        },
        {
          enonce: "Voici le plan d'une terrasse. Le côté d'un carreau mesure 1 m.\nQuel est le périmètre de la terrasse ? Écris le nombre de m.",
          figure: grille({ col: 6, lig: 5, formes: [{ pts: [[1, 1], [5, 1], [5, 2], [3, 2], [3, 4], [1, 4]], couleur: BLEU_CLAIR, contour: BLEU }] }),
          correction:
            "Je pars du coin en bas à gauche et je tourne, côté par côté.\nEn bas : 4. À droite : 1. Vers la gauche : 2. Vers le haut : 2. En haut : 2. À gauche, en descendant : 3.\n$4 + 1 + 2 + 2 + 2 + 3 = 14$ m.\n⛔ Le piège : compter les carreaux de la terrasse (il y en a 8). Le périmètre, c'est le bord.\nRéponse : 14.",
          micros: ["ce2_perimetre_polygone", "ce2_perimetre_comprendre"],
          reponses: [{ attendu: "14", unite: "m" }],
        },
        {
          enonce: "Inès n'a pas de règle, seulement un compas.\nElle reporte les côtés de chaque figure, bout à bout, sur une droite.\na) Quelle figure a le plus grand périmètre ? Écris A ou B.\nb) Combien de côtés a la figure B ?",
          figure: reports([
            { nom: "A", morceaux: [3, 2, 4] },
            { nom: "B", morceaux: [2, 2, 2, 2] },
          ]),
          correction:
            "a) Chaque segment est le tour d'une figure, déplié sur la droite.\nLe segment A va plus loin que le segment B. Le tour de A est plus long.\nb) Chaque couleur est un côté reporté. Sur la ligne B, je compte 4 morceaux.\nLa figure B a 4 côtés, tous de même longueur.\n⛔ Le piège du a) : choisir B, parce qu'il a plus de côtés. Ce qui compte, c'est la longueur totale.\nRéponse : a) A ; b) 4.",
          micros: ["ce2_perimetre_comparer"],
          reponses: [
            { question: "a)", attendu: ["A", "la figure A"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Un carré a un périmètre de 36 cm.\nCombien mesure un de ses côtés ? Écris le nombre de cm.",
          correction:
            "Un carré a 4 côtés égaux. Les 4 côtés font 36 cm en tout.\nJe cherche le nombre qui, ajouté 4 fois, fait 36 : $36 \\div 4 = 9$.\nJe vérifie : $9 + 9 + 9 + 9 = 36$.\n⛔ Le piège : diviser par 2 et trouver 18. Un carré a 4 côtés, pas 2.\nRéponse : 9.",
          micros: ["ce2_perimetre_rectangle"],
          reponses: [{ attendu: "9", unite: "cm" }],
        },
        {
          enonce: "Au stade, trois enfants courent autour d'une figure.\nTriangle : 5 m, 5 m, 5 m. Carré : côté 4 m. Rectangle : 6 m sur 3 m.\na) Quelle figure a le plus grand tour ?\nb) Quelle figure a le plus petit tour ?",
          correction:
            "Je calcule chaque périmètre.\nTriangle : $5 + 5 + 5 = 15$ m.\nCarré : $4 + 4 + 4 + 4 = 16$ m.\nRectangle : $6 + 3 + 6 + 3 = 18$ m.\na) Le plus grand : 18 m, le rectangle.\nb) Le plus petit : 15 m, le triangle.\n⛔ Le piège : croire que le triangle a le plus grand tour, parce que 5 est le plus grand nombre écrit. Je compte tous les côtés.\nRéponse : a) le rectangle ; b) le triangle.",
          micros: ["ce2_perimetre_comparer", "ce2_perimetre_rectangle"],
          reponses: [
            { question: "a)", attendu: ["rectangle", "le rectangle"] },
            { question: "b)", attendu: ["triangle", "le triangle"] },
          ],
        },
        {
          enonce: "À la cantine, une table a 6 côtés de 50 cm.\na) Quel est son périmètre ? Écris le nombre de cm.\nb) C'est combien de mètres ?",
          figure: figure({ polys: [{ sommets: regulier(6, 3), cotes: ["50 cm"], fond: "#fef3c7" }], hmax: 180 }),
          correction:
            "a) Les 6 côtés ont la même longueur : 50 cm.\n$50 + 50 = 100$, et j'ai trois paires : $100 + 100 + 100 = 300$ cm.\nC'est aussi $6 \\times 50 = 300$.\nb) 1 m = 100 cm. 300 cm, c'est 100 cm trois fois : 3 m.\n⛔ Le piège : compter 4 côtés comme un carré. Je compte les côtés sur le dessin : 6.\nRéponse : a) 300 ; b) 3.",
          micros: ["ce2_perimetre_polygone"],
          reponses: [
            { question: "a)", attendu: "300", unite: "cm" },
            { question: "b)", attendu: ["3", "trois"], unite: "m" },
          ],
        },
        {
          enonce: "L'encadreur fait le tour d'un cadre rectangulaire. Le tour mesure 30 cm.\nLa longueur du cadre mesure 10 cm.\nCombien mesure sa largeur ? Écris le nombre de cm.",
          correction:
            "Le tour, c'est deux longueurs et deux largeurs.\nLes deux longueurs : $10 + 10 = 20$ cm.\nIl reste pour les deux largeurs : $30 - 20 = 10$ cm.\nUne largeur : la moitié de 10, soit 5 cm.\nJe vérifie : $10 + 5 + 10 + 5 = 30$.\n⛔ Le piège : répondre 20 ou 10. Il y a DEUX largeurs à partager.\nRéponse : 5.",
          micros: ["ce2_perimetre_rectangle"],
          reponses: [{ attendu: "5", unite: "cm" }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je fais un dessin à main levée avec les longueurs.",
      rappel: [
        "Je dessine la figure et j'écris la longueur de chaque côté.",
        "Un côté collé entre deux figures n'est plus sur le tour.",
        "Pour retrouver un côté, je retire du périmètre les côtés que je connais.",
      ],
      exercices: [
        {
          titre: "Le grillage du poulailler",
          enonce: "L'éleveuse entoure son poulailler de grillage. C'est un rectangle de 6 m sur 4 m.\nLa porte mesure 1 m, et elle n'a pas de grillage.\na) Quel est le périmètre du poulailler ? Écris le nombre de m.\nb) Combien de mètres de grillage faut-il ?",
          figure: figure({ polys: [{ sommets: rect4(0, 0, 6, 4), cotes: ["6 m", "4 m"], droits: [0, 1, 2, 3], fond: VERT_CLAIR }], hmax: 170 }),
          correction:
            "a) Deux longueurs et deux largeurs : $6 + 4 + 6 + 4 = 20$ m.\nb) Le grillage fait le tour, sauf la porte.\n$20 - 1 = 19$ m.\n⛔ Le piège du b) : oublier la porte, et répondre 20 m.\nRéponse : a) 20 ; b) 19.",
          micros: ["ce2_perimetre_defi", "ce2_perimetre_rectangle"],
          reponses: [
            { question: "a)", attendu: "20", unite: "m" },
            { question: "b)", attendu: "19", unite: "m" },
          ],
        },
        {
          titre: "Le galon de la nappe",
          enonce: "La couturière coud un galon autour d'une nappe carrée de 120 cm de côté.\na) Quelle longueur de galon lui faut-il ? Écris le nombre de cm.\nb) Le galon se vend en rouleaux de 2 m. Combien de rouleaux doit-elle acheter ?",
          correction:
            "a) Un carré a 4 côtés égaux.\n$120 + 120 = 240$, puis $240 + 240 = 480$ cm.\nb) Un rouleau : 2 m = 200 cm.\n2 rouleaux : 400 cm. C'est moins que 480 cm : pas assez.\n3 rouleaux : 600 cm. C'est assez.\nElle doit acheter 3 rouleaux.\n⛔ Le piège du b) : acheter 2 rouleaux. Il manquerait $480 - 400 = 80$ cm de galon.\nRéponse : a) 480 ; b) 3.",
          micros: ["ce2_perimetre_defi", "ce2_perimetre_rectangle"],
          reponses: [
            { question: "a)", attendu: "480", unite: "cm" },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "Les deux carreaux",
          enonce: "Le carreleur colle deux carreaux carrés de 3 cm, côte à côte.\na) Quel est le périmètre d'un seul carreau ? Écris le nombre de cm.\nb) Quel est le périmètre de la nouvelle figure ? Écris le nombre de cm.",
          figure: figure({
            polys: [
              { sommets: rect4(0, 0, 3, 3), cotes: ["3 cm"], fond: BLEU_CLAIR },
              { sommets: rect4(3, 0, 3, 3), fond: ORANGE_CLAIR },
            ],
            hmax: 150,
          }),
          correction:
            "a) Un carré : $3 + 3 + 3 + 3 = 12$ cm.\nb) Les deux carreaux forment un rectangle de 6 cm sur 3 cm.\nLe côté collé est au milieu : il n'est plus sur le tour.\n$6 + 3 + 6 + 3 = 18$ cm.\n⛔ Le piège du b) : faire $12 + 12 = 24$ cm. Les deux côtés collés ne comptent plus.\nRéponse : a) 12 ; b) 18.",
          micros: ["ce2_perimetre_defi", "ce2_perimetre_comparer"],
          reponses: [
            { question: "a)", attendu: "12", unite: "cm" },
            { question: "b)", attendu: "18", unite: "cm" },
          ],
        },
        {
          titre: "Le fil de la bijoutière",
          enonce: "La bijoutière plie un fil de fer de 24 cm. Tout le fil fait le tour de la figure.\na) Elle fait un rectangle de 8 cm de long. Quelle est sa largeur ? Écris le nombre de cm.\nb) Avec le même fil, elle fait un carré. Combien mesure son côté ?",
          correction:
            "Le fil entier fait le tour : le périmètre est 24 cm.\na) Les deux longueurs : $8 + 8 = 16$ cm.\nIl reste $24 - 16 = 8$ cm pour les deux largeurs. Une largeur : 4 cm.\nJe vérifie : $8 + 4 + 8 + 4 = 24$.\nb) Un carré a 4 côtés égaux : $24 \\div 4 = 6$ cm.\nJe vérifie : $6 + 6 + 6 + 6 = 24$.\n⛔ Le piège du a) : répondre 8. Les 8 cm qui restent se partagent entre DEUX largeurs.\nRéponse : a) 4 ; b) 6.",
          micros: ["ce2_perimetre_defi", "ce2_perimetre_rectangle"],
          reponses: [
            { question: "a)", attendu: "4", unite: "cm" },
            { question: "b)", attendu: "6", unite: "cm" },
          ],
        },
      ],
    },
  ],
};
