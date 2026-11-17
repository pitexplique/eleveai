// ─── Fiche d'exercices : le repérage (CE1) — 20 exercices corrigés ────────────
//
// 17/11/2026 : la feuille interactive de la notion `reperage` du coach CE1
// (« Repérage sur quadrillage », 8 micros). Sur la forme de
// `maths-cm1-reperage.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège
// nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/reperage.bank.ts`) : le vocabulaire
// des positions, le plan d'un lieu connu, les assemblages de cubes, les cases
// et les nœuds, les cases repérées, les déplacements codés.
// ⛔ LIMITES DU CE1 : des cases repérées par une lettre (colonne, en bas) et
// un nombre (ligne, à gauche, 1 en bas), « C2 » ; pas de coordonnées de
// points ; des déplacements en cases, sans diagonale.
// ⛔ Aucune question à rédiger, ni « place » ou « trace » : un mot, une case,
// un nombre, une lettre de QCM.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// ⛔ UNE CASE SE TAPE LETTRE PUIS NOMBRE, « C2 » ou « c2 » : `exact` refuse
// « 2C » (sans lui, le vérificateur calcule 2 × c = c × 2).
//
// Les pièges nommés : la gauche du dessin et celle de l'enfant (1, 9), « sous »
// et « derrière » (2), le point pris pour une case (3), le nombre avant la
// lettre (4, 14), compter les traits (5), compter la case de départ (6, 10),
// les cubes cachés oubliés (7), « près de » flou (8), la gauche de celui qui
// est en face (9), le chemin à l'envers (11), l'école et la poste du même
// côté de la rue (12), la colonne pleine comptée (13), compter les cases au
// lieu des nœuds (15), « devant » dans une file (16), la diagonale (17), la
// ligne prise pour la colonne (18), l'escalier compté par marches (19), le
// retour dans le même sens (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : récréation (1), maison (2), jeux (3, 4,
// 14), robots (6, 20), construction (7, 13, 19), école (8), ville (12),
// cantine (16), plage (17), potager (18). Les métiers : maçon (13),
// jardinier (18).
// UN SEUL contexte réunionnais (17, une chasse au trésor sur la plage de
// Saint-Leu, MODÈLE).
// Tout est un MODÈLE (aucun fait réel à sourcer sur cette feuille).
//
// ⭐ LES DESSINS : une file d'enfants (`file`), une étagère (`etagere`), le
// quadrillage du CM1 (`grille`, lettres et nombres), un plan en cases, des
// assemblages de cubes vus de face (`cubes`). Le dessin ne donne jamais la
// réponse : l'arrivée d'un trajet n'est jamais marquée.
//
// Micro-compétences : ce1_espace_positions (1, 2, 16), ce1_espace_situer (2, 8,
// 9, 12, 16), ce1_espace_representation (8, 12), ce1_espace_assemblages (7,
// 13, 19), ce1_reperage_cases_noeuds (3, 5, 15), ce1_reperage_coordonnees (4,
// 14, 18), ce1_reperage_deplacement (6, 10, 11, 17, 20), ce1_reperage_defi
// (17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, BLEU_CLAIR, ORANGE, ORANGE_CLAIR, ROUGE, VERT, VERT_CLAIR, bloc, grille } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const NOIR = "#0f172a";
const GRIS_CLAIR = "#e2e8f0";
const JAUNE_CLAIR = "#fef3c7";

/** Une file d'enfants vus de face, de gauche à droite sur le dessin, le prénom dessous. */
const file = (noms: string[]) => {
  const couleurs = [BLEU, ORANGE, VERT, ROUGE, "#7c3aed"];
  const pas = 62;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[16rem]">
      <svg viewBox={`0 0 ${noms.length * pas + 8} 112`} className="block h-auto w-full" role="img" aria-label="Une file d'enfants">
        {noms.map((n, k) => {
          const cx = 4 + pas / 2 + k * pas;
          return (
            <g key={n}>
              <circle cx={cx} cy={22} r={13} fill="#fcd9b6" stroke={NOIR} strokeWidth={1.4} />
              <rect x={cx - 15} y={37} width={30} height={36} rx={9} fill={couleurs[k % couleurs.length]} />
              <rect x={cx - 11} y={73} width={8} height={14} rx={3} fill={NOIR} />
              <rect x={cx + 3} y={73} width={8} height={14} rx={3} fill={NOIR} />
              <text x={cx} y={104} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Une étagère : `rayons` du HAUT vers le BAS, chaque rayon une liste d'objets (étiquettes). */
const etagere = (rayons: string[][]) => {
  const [W, h] = [260, 52];
  const H = rayons.length * h + 12;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Une étagère">
        <rect x={4} y={4} width={W - 8} height={H - 8} rx={4} fill="#fff7ed" stroke="#92400e" strokeWidth={3} />
        {rayons.map((r, i) => {
          const y = 4 + (i + 1) * h;
          const larg = (W - 24) / r.length;
          return (
            <g key={i}>
              <line x1={4} y1={y} x2={W - 4} y2={y} stroke="#92400e" strokeWidth={3} />
              {r.map((o, k) => (
                <g key={o}>
                  <rect x={14 + k * larg + 4} y={y - 36} width={larg - 8} height={32} rx={8} fill={[BLEU_CLAIR, ORANGE_CLAIR, VERT_CLAIR][(i + k) % 3]} stroke={NOIR} strokeWidth={1.2} />
                  <text x={14 + k * larg + larg / 2} y={y - 15} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                    {o}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Des colonnes de cubes vues de face, un peu de biais (on voit le dessus et le
 * côté droit). `hauteurs` : le nombre de cubes de chaque colonne, de gauche à
 * droite. Tous les cubes sont visibles.
 */
const cubes = (hauteurs: number[]) => {
  const [c, d] = [34, 12];
  const max = Math.max(...hauteurs);
  const W = hauteurs.length * c + d + 8;
  const H = max * c + d + 8;
  const liste: { x: number; z: number }[] = [];
  hauteurs.forEach((h, x) => {
    for (let z = 0; z < h; z++) liste.push({ x, z });
  });
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `${Math.min(18, hauteurs.length * 3.4 + 2)}rem` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Assemblage de cubes">
        {liste.map(({ x, z }, k) => {
          const X = 4 + x * c;
          const Y = H - 4 - (z + 1) * c;
          return (
            <g key={k}>
              <polygon points={`${X},${Y} ${X + d},${Y - d} ${X + c + d},${Y - d} ${X + c},${Y}`} fill="#93c5fd" stroke={NOIR} strokeWidth={1.2} />
              <polygon points={`${X + c},${Y} ${X + c + d},${Y - d} ${X + c + d},${Y + c - d} ${X + c},${Y + c}`} fill="#1d4ed8" stroke={NOIR} strokeWidth={1.2} />
              <rect x={X} y={Y} width={c} height={c} fill="#3b82f6" stroke={NOIR} strokeWidth={1.2} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Un plan en cases : `lignes` du HAUT vers le BAS, chaque case un lieu (texte), « rue » en gris. */
const plan = (lignes: string[][], taille = 76) =>
  grille({
    col: lignes[0].length,
    lig: lignes.length,
    taille,
    largeur: "max-w-[22rem] print:max-w-[16rem]",
    cases: lignes.flatMap((l, i) =>
      l.map((t, c) => ({ c, l: lignes.length - 1 - i, texte: t, couleur: t === "rue" ? GRIS_CLAIR : JAUNE_CLAIR })),
    ),
  });

export const exercicesReperageCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "reperage",
  titre: "Se repérer",
  accroche:
    "Vingt exercices, du plus simple au problème. Dire où est un objet : devant, entre, au-dessus, à gauche. Lire le plan de la classe et du quartier. Compter des cubes. Trouver une case avec sa lettre et son nombre. Suivre un chemin sur un quadrillage. Une étagère, un robot, un potager et une chasse au trésor. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris un mot, une case ou un nombre.",
      rappel: [
        "Une case est un petit carré. Un nœud est un point où deux traits se croisent.",
        "Une case se lit avec la lettre en bas, puis le nombre à gauche : C2.",
        "Pour un trajet, je ne compte pas la case de départ.",
      ],
      exercices: [
        {
          enonce: "À la récréation, les enfants font la queue. Regarde le dessin.\na) Qui est entre Inès et Zoé ?\nb) Qui est tout à gauche du dessin ?\nc) Qui est juste à droite de Léa ?",
          figure: file(["Léa", "Max", "Inès", "Tom", "Zoé"]),
          correction:
            "Je lis le dessin de gauche à droite : Léa, Max, Inès, Tom, Zoé.\na) Entre Inès et Zoé, il y a Tom.\nb) Tout à gauche du dessin : Léa.\nc) Juste à droite de Léa : Max.\n⛔ Le piège : prendre la gauche des enfants du dessin. Ils nous regardent : je prends la gauche de la feuille.\nRéponse : a) Tom ; b) Léa ; c) Max.",
          micros: ["ce1_espace_positions"],
          reponses: [
            { question: "a)", attendu: ["Tom"] },
            { question: "b)", attendu: ["Léa"] },
            { question: "c)", attendu: ["Max"] },
          ],
        },
        {
          enonce: "Regarde l'étagère de la chambre.\na) Qu'y a-t-il au-dessus du livre ?\nb) Qu'y a-t-il sous le livre ?\nc) Qu'y a-t-il à côté du livre ?",
          figure: etagere([["ballon"], ["livre", "pot"], ["chaussures"]]),
          correction:
            "Je trouve le livre : il est sur le rayon du milieu.\na) Au-dessus, sur le rayon du haut : le ballon.\nb) En dessous, sur le rayon du bas : les chaussures.\nc) À côté de lui, sur le même rayon : le pot.\n⛔ Le piège : confondre « sous » et « à côté ». Sous, c'est plus bas.\nRéponse : a) le ballon ; b) les chaussures ; c) le pot.",
          micros: ["ce1_espace_positions", "ce1_espace_situer"],
          reponses: [
            { question: "a)", attendu: ["ballon", "le ballon"] },
            { question: "b)", attendu: ["chaussures", "les chaussures", "chaussure"] },
            { question: "c)", attendu: ["pot", "le pot"] },
          ],
        },
        {
          enonce: "Case ou nœud ?\na) L'étoile est-elle dans une case ou sur un nœud ?\nb) Le point P est-il dans une case ou sur un nœud ?",
          figure: grille({ col: 4, lig: 3, cases: [{ c: 0, l: 1, texte: "★", couleurTexte: ORANGE }], points: [{ en: [3, 2], nom: "P" }] }),
          correction:
            "Je relis le rappel : une case est un carré, un nœud est un croisement de traits.\na) L'étoile est au milieu d'un petit carré : dans une case.\nb) Le point P est là où deux traits se croisent : sur un nœud.\n⛔ Le piège : croire qu'un point est toujours dans une case. Sur un nœud, il touche quatre cases.\nRéponse : a) une case ; b) un nœud.",
          micros: ["ce1_reperage_cases_noeuds"],
          reponses: [
            { question: "a)", attendu: ["case", "une case", "dans une case"] },
            { question: "b)", attendu: ["nœud", "noeud", "un nœud", "un noeud", "sur un nœud", "sur un noeud"] },
          ],
        },
        {
          enonce: "Sur ce plateau de jeu, chaque case a une lettre et un nombre.\na) Dans quelle case est l'étoile ★ ?\nb) Qu'y a-t-il dans la case A4 : le rond ou le triangle ?",
          figure: grille({
            col: 4,
            lig: 4,
            lettres: true,
            cases: [
              { c: 2, l: 1, texte: "★", couleurTexte: ORANGE },
              { c: 0, l: 3, texte: "●", couleurTexte: BLEU },
              { c: 3, l: 0, texte: "▲", couleurTexte: VERT },
            ],
          }),
          correction:
            "a) Je descends de l'étoile jusqu'en bas : lettre C. Je vais à gauche : nombre 2. L'étoile est en C2.\nb) Je cherche la colonne A, puis je monte jusqu'à la ligne 4. Il y a le rond.\n⛔ Le piège : écrire 2C. On écrit la lettre d'abord, puis le nombre.\nRéponse : a) C2 ; b) le rond.",
          micros: ["ce1_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "C2", exact: true },
            { question: "b)", attendu: ["rond", "le rond", "●"] },
          ],
        },
        {
          enonce: "a) Combien de cases sont coloriées ?\nb) Combien de nœuds a une seule case ?",
          figure: grille({ col: 5, lig: 4, cases: bloc(1, 1, 3, 2) }),
          correction:
            "a) Je compte ligne par ligne : 3 cases en haut, 3 cases en bas.\n$3 + 3 = 6$ cases.\nb) Une case est un carré. Elle a un nœud à chaque coin : 4 nœuds.\n⛔ Le piège du a) : compter les traits au lieu des carrés.\nRéponse : a) 6 ; b) 4.",
          micros: ["ce1_reperage_cases_noeuds"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Le robot R est en A1.\nIl avance de 3 cases vers la droite.\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 5, lig: 3, lettres: true, cases: [{ c: 0, l: 0, texte: "R", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }] }),
          correction:
            "Je pars de A1. Je ne compte pas la case de départ.\nJ'avance d'une case à la fois : B1, C1, D1.\nTrois cases : le robot arrive en D1.\n⛔ Le piège : compter A1 comme première case, et s'arrêter en C1.\nRéponse : D1.",
          micros: ["ce1_reperage_deplacement"],
          reponses: [{ attendu: "D1", exact: true }],
        },
        {
          enonce: "Lucas a fait cette construction.\nCombien de cubes a-t-il utilisés ?",
          figure: cubes([1, 3, 2]),
          correction:
            "Je compte colonne par colonne, de bas en haut.\nPremière colonne : 1 cube. Deuxième : 3 cubes. Troisième : 2 cubes.\n$1 + 3 + 2 = 6$ cubes.\n⛔ Le piège : compter seulement les cubes du haut. Chaque colonne compte du sol jusqu'en haut.\nRéponse : 6.",
          micros: ["ce1_espace_assemblages"],
          reponses: [{ attendu: ["6", "six"] }],
        },
        {
          enonce: "Voici le plan de la classe, vu d'en haut.\na) Qu'y a-t-il entre la fenêtre et la porte ?\nb) Qu'y a-t-il juste sous la porte, sur le plan ?",
          figure: plan([
            ["fenêtre", "tableau", "porte"],
            ["tables", "tables", "évier"],
            ["livres", "tables", "placard"],
          ]),
          correction:
            "Je lis le plan ligne par ligne, en commençant par le haut.\na) En haut : fenêtre, tableau, porte. Entre la fenêtre et la porte, il y a le tableau.\nb) La porte est en haut à droite. Juste dessous, il y a l'évier.\n⛔ Le piège : dire « près de la porte » sans regarder la direction. Je regarde la case juste en dessous.\nRéponse : a) le tableau ; b) l'évier.",
          micros: ["ce1_espace_representation", "ce1_espace_situer"],
          reponses: [
            { question: "a)", attendu: ["tableau", "le tableau"] },
            { question: "b)", attendu: ["évier", "l'évier"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je suis le chemin avec le doigt, une case à la fois.",
      rappel: [
        "La gauche et la droite dépendent de celui qui regarde.",
        "Un trajet se lit dans l'ordre : d'abord le premier pas, puis le suivant.",
        "Pour compter des cubes, je compte chaque colonne, puis j'additionne.",
      ],
      exercices: [
        {
          enonce: "Paul est assis en face de toi.\na) Il lève sa main droite. Pour toi, elle est à gauche ou à droite ?\nb) Tu lèves ta main droite. Pour Paul, est-elle à sa gauche ou à sa droite ?",
          correction:
            "Paul me regarde : il est tourné dans l'autre sens.\na) Sa droite est en face de ma gauche. Je vois sa main droite à ma gauche.\nb) C'est pareil dans l'autre sens. Paul voit ma main droite à sa gauche.\nJe peux vérifier : je me lève et je me tourne comme Paul.\n⛔ Le piège : croire que la droite de Paul est aussi ma droite. Il est en face de moi.\nRéponse : a) à gauche ; b) à sa gauche.",
          micros: ["ce1_espace_situer"],
          reponses: [
            { question: "a)", attendu: ["gauche", "à gauche", "a gauche"] },
            { question: "b)", attendu: ["gauche", "à gauche", "à sa gauche", "a gauche"] },
          ],
        },
        {
          enonce: "Le pion est en B2.\nIl va : 2 cases en haut, puis 1 case à droite.\nDans quelle case arrive-t-il ?",
          figure: grille({ col: 5, lig: 4, lettres: true, cases: [{ c: 1, l: 1, texte: "●", couleurTexte: ROUGE }] }),
          correction:
            "Je pars de B2, et je fais les pas dans l'ordre.\n2 cases en haut : B3, puis B4.\n1 case à droite : C4.\nLe pion arrive en C4.\n⛔ Le piège : compter la case B2. On ne compte pas la case de départ.\nRéponse : C4.",
          micros: ["ce1_reperage_deplacement"],
          reponses: [{ attendu: "C4", exact: true }],
        },
        {
          enonce: "Le lapin L veut aller à la carotte C.\nQuel chemin doit-il suivre ? Écris la lettre.\nA) 3 à droite, 2 en haut\nB) 2 à droite, 3 en haut\nC) 3 à gauche, 2 en haut",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "L", couleur: BLEU_CLAIR, couleurTexte: BLEU },
              { c: 3, l: 2, texte: "C", couleur: ORANGE_CLAIR, couleurTexte: ORANGE },
            ],
          }),
          correction:
            "Le lapin est en A1. La carotte est en D3.\nDe A à D, je compte les cases vers la droite : B, C, D. Trois cases.\nDe 1 à 3, je compte les cases vers le haut : 2, 3. Deux cases.\nLe chemin : 3 à droite, 2 en haut. Réponse A.\n⛔ Le piège : inverser les nombres (réponse B), ou partir à gauche (réponse C).\nRéponse : A.",
          micros: ["ce1_reperage_deplacement"],
          reponses: [{ attendu: ["A", "A) 3 à droite, 2 en haut"] }],
        },
        {
          enonce: "Voici le plan du quartier. La rue est en gris.\na) Quel lieu est entre la poste et la mairie ?\nb) Qu'y a-t-il en face du stade, de l'autre côté de la rue ?",
          figure: plan(
            [
              ["poste", "parc", "mairie", "gare"],
              ["rue", "rue", "rue", "rue"],
              ["café", "école", "stade", "piscine"],
            ],
            70,
          ),
          correction:
            "Je lis le plan ligne par ligne.\na) En haut : poste, parc, mairie, gare. Entre la poste et la mairie, il y a le parc.\nb) Le stade est en bas, dans la 3e colonne.\nJe traverse la rue tout droit vers le haut : j'arrive à la mairie.\n⛔ Le piège du b) : chercher sur le même trottoir. « En face », c'est de l'autre côté de la rue.\nRéponse : a) le parc ; b) la mairie.",
          micros: ["ce1_espace_representation", "ce1_espace_situer"],
          reponses: [
            { question: "a)", attendu: ["parc", "le parc"] },
            { question: "b)", attendu: ["mairie", "la mairie"] },
          ],
        },
        {
          enonce: "Le maçon construit un petit mur de cubes.\na) Combien de cubes y a-t-il ?\nb) Il veut 3 cubes dans chaque colonne. Combien de cubes doit-il ajouter ?",
          figure: cubes([2, 1, 3, 2]),
          correction:
            "a) Je compte chaque colonne : 2, 1, 3, 2.\n$2 + 1 + 3 + 2 = 8$ cubes.\nb) Il manque dans chaque colonne pour arriver à 3 :\n1re : $3 - 2 = 1$. 2e : $3 - 1 = 2$. 3e : 0. 4e : $3 - 2 = 1$.\n$1 + 2 + 0 + 1 = 4$ cubes.\n⛔ Le piège du b) : ajouter un cube à la 3e colonne. Elle a déjà 3 cubes.\nRéponse : a) 8 ; b) 4.",
          micros: ["ce1_espace_assemblages"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Regarde le plateau de jeu.\na) Qu'y a-t-il dans la case C2 : le carré, le rond ou le triangle ?\nb) Dans quelle case est le triangle ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [
              { c: 1, l: 2, texte: "▲", couleurTexte: VERT },
              { c: 2, l: 1, texte: "■", couleurTexte: BLEU },
              { c: 4, l: 0, texte: "●", couleurTexte: ORANGE },
            ],
          }),
          correction:
            "a) C2 : je trouve la colonne C en bas, puis je monte à la ligne 2. Il y a le carré.\nb) Je descends du triangle : lettre B. Je vais à gauche : nombre 3. Le triangle est en B3.\n⛔ Le piège : lire la ligne avant la colonne. C2, c'est colonne C, ligne 2.\nRéponse : a) le carré ; b) B3.",
          micros: ["ce1_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: ["carré", "le carré", "■"] },
            { question: "b)", attendu: "B3", exact: true },
          ],
        },
        {
          enonce: "Regarde ce petit quadrillage.\na) Combien de cases a-t-il ?\nb) Combien de nœuds a-t-il ?",
          figure: grille({ col: 2, lig: 2, taille: 60, largeur: "max-w-[10rem] print:max-w-[8rem]" }),
          correction:
            "a) Il y a 2 cases en haut et 2 cases en bas : $2 + 2 = 4$ cases.\nb) Les nœuds sont les croisements. Je les compte ligne de traits par ligne de traits.\nEn haut : 3 nœuds. Au milieu : 3 nœuds. En bas : 3 nœuds.\n$3 + 3 + 3 = 9$ nœuds.\n⛔ Le piège du b) : répondre 4, comme les cases. Il y a plus de nœuds que de cases.\nRéponse : a) 4 ; b) 9.",
          micros: ["ce1_reperage_cases_noeuds"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["9", "neuf"] },
          ],
        },
        {
          enonce: "À la cantine, trois enfants font la queue.\nNina est devant Sam. Sam est devant Lou.\na) Qui est le dernier de la file ?\nb) Qui est entre Nina et Lou ?",
          correction:
            "Je dessine la file au brouillon. Le premier est devant.\nNina est devant Sam : Nina, puis Sam.\nSam est devant Lou : Sam, puis Lou.\nLa file : Nina, Sam, Lou.\na) Le dernier : Lou.\nb) Entre Nina et Lou : Sam.\n⛔ Le piège : croire que « devant » veut dire « après ». Celui qui est devant passe en premier.\nRéponse : a) Lou ; b) Sam.",
          micros: ["ce1_espace_positions", "ce1_espace_situer"],
          reponses: [
            { question: "a)", attendu: ["Lou"] },
            { question: "b)", attendu: ["Sam"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je suis le chemin pas à pas, avec le doigt.",
      rappel: [
        "On ne va jamais en biais : à droite, à gauche, en haut ou en bas.",
        "Pour revenir, je fais le chemin à l'envers : la droite devient la gauche.",
        "Je vérifie toujours ma case d'arrivée sur le dessin.",
      ],
      exercices: [
        {
          titre: "Le trésor de Saint-Leu",
          enonce: "Sur la plage de Saint-Leu, Noé part de la case A1.\na) Il va : 2 à droite, 3 en haut, 1 à gauche. Dans quelle case arrive-t-il ?\nb) Le trésor ★ est en D4. Combien de cases, au moins, de A1 au trésor ?",
          figure: grille({
            col: 5,
            lig: 5,
            lettres: true,
            cases: [
              { c: 0, l: 0, texte: "N", couleur: BLEU_CLAIR, couleurTexte: BLEU },
              { c: 3, l: 3, texte: "★", couleurTexte: ORANGE },
            ],
          }),
          correction:
            "a) Je pars de A1.\n2 à droite : B1, C1. 3 en haut : C2, C3, C4. 1 à gauche : B4.\nNoé arrive en B4.\nb) De A1 à D4, sans aller en biais.\nVers la droite, de A à D : 3 cases. Vers le haut, de 1 à 4 : 3 cases.\n$3 + 3 = 6$ cases au moins.\n⛔ Le piège du b) : aller tout droit en biais. C'est interdit sur un quadrillage.\nRéponse : a) B4 ; b) 6.",
          micros: ["ce1_reperage_defi", "ce1_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "B4", exact: true },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          titre: "Le potager du jardinier",
          enonce: "Le jardinier a un potager en cases.\na) Dans quelle case sont les tomates T ?\nb) Il plante une salade dans chaque case de la ligne 3. Combien de salades ?",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [{ c: 1, l: 1, texte: "T", couleur: "#fecaca", couleurTexte: ROUGE }],
          }),
          correction:
            "a) Je descends des tomates : lettre B. Je vais à gauche : nombre 2. Les tomates sont en B2.\nb) La ligne 3 va de gauche à droite : A3, B3, C3, D3, E3.\nJe compte : 5 cases, donc 5 salades.\n⛔ Le piège du b) : compter les cases de la colonne C, de bas en haut. Une ligne se lit de gauche à droite.\nRéponse : a) B2 ; b) 5.",
          micros: ["ce1_reperage_defi", "ce1_reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "B2", exact: true },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Les escaliers de cubes",
          enonce: "Voici un escalier de 3 marches.\na) Combien de cubes faut-il ?\nb) Pour un escalier de 4 marches, combien de cubes faut-il ?",
          figure: cubes([3, 2, 1]),
          correction:
            "a) Je compte chaque colonne : 3, 2, 1.\n$3 + 2 + 1 = 6$ cubes.\nb) Avec 4 marches, il y a une colonne de 4 en plus : 4, 3, 2, 1.\n$4 + 3 + 2 + 1 = 10$ cubes.\n⛔ Le piège : compter les marches, 3 ou 4. Chaque marche a plusieurs cubes dessous.\nRéponse : a) 6 ; b) 10.",
          micros: ["ce1_espace_assemblages", "ce1_reperage_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          titre: "Le robot aspirateur",
          enonce: "Le robot aspirateur part de A1. Il suit le chemin orange.\na) Dans quelle case s'arrête-t-il ?\nb) Pour revenir en A1, quel chemin ?\nA) 3 à gauche, 2 en bas\nB) 3 à droite, 2 en bas\nC) 2 à gauche, 3 en bas",
          figure: grille({
            col: 5,
            lig: 4,
            lettres: true,
            cases: [{ c: 0, l: 0, texte: "R", couleur: ORANGE_CLAIR, couleurTexte: ORANGE }],
            chemins: [{ pts: [[0.5, 0.5], [3.5, 0.5], [3.5, 2.5]] }],
          }),
          correction:
            "a) Le chemin va 3 cases à droite : B1, C1, D1. Puis 2 cases en haut : D2, D3.\nLe robot s'arrête en D3.\nb) Pour revenir, je fais le chemin à l'envers, en partant de la fin.\nIl était monté de 2 : il descend de 2. Il était allé à droite de 3 : il va à gauche de 3.\nLe chemin A : 3 à gauche, 2 en bas. Il arrive bien en A1.\n⛔ Le piège : garder « à droite ». Pour revenir, la droite devient la gauche.\nRéponse : a) D3 ; b) A.",
          micros: ["ce1_reperage_defi", "ce1_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "D3", exact: true },
            { question: "b)", attendu: ["A", "A) 3 à gauche, 2 en bas"] },
          ],
        },
      ],
    },
  ],
};
