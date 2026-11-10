// ─── Fiche d'exercices : les périmètres (CM2) — 20 exercices corrigés ─────────
//
// 10/11/2026 : feuille INTERACTIVE du CM2 (une réponse à taper par sous-question,
// vérifiée sans IA), sur la forme de `maths-cm2-tableau.tsx` et des feuilles
// sœurs `maths-cm2-longueur.tsx`, `maths-cm2-masse.tsx` : 8 ★, 7 ★★, 5 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-perimetres.tsx`, la banque
// `lib/tutor-v4/questionBank/cm2/maths/perimetres.bank.ts` et la carte mentale
// remplie `lib/cartes/remplies/cm2.json` (clé cm2/perimetre) : comprendre (le
// tour, pas la surface ; compter les côtés sur un quadrillage), triangle (3
// côtés), quadrilatère (carré : côté × 4 ; rectangle : (L + l) × 2), polygone
// (tous les côtés ; côté × nombre de côtés s'ils sont égaux), défis (trouver
// d'abord les côtés qui manquent).
// ⛔ LIMITES DU CM2 : pas de cercle (la longueur du cercle est en 6e), pas de
// formule avec des lettres à manipuler.
// ⛔ AUCUNE question ouverte (CM2). Bonnes réponses des QCM : B (ex. 1), C
// (ex. 12), C (ex. 20).
// ⛔ Aucun exemple de la fiche de cours ni de la carte mentale n'est repris
// (triangles 5-6-7, 4-5-6, 5-4-3 ; rectangles 8 × 5, 10 × 4 ; carrés de 7 et
// 9 cm ; jardin 12 × 8 ; tapis 2 × 1 ; potager 6 × 4 ; hexagone de 5 cm ;
// carré de périmètre 36 cm ; 4 cm + 30 mm).
//
// Les pièges nommés : compter les carreaux au lieu du bord (1, 12), oublier un
// côté (2, 6), faire L × l (3, 9), le périmètre pour peindre un sol (4), mal
// compter les côtés (5, 14), additionner des cm et des mm (8, 11), oublier les
// petits côtés d'un L (10), le grand nombre de carreaux = le grand tour (12),
// côté × 2 pour un carré (13, 16), un losange pris pour un rectangle (15),
// oublier le portail (17), les côtés cachés d'un L (18), un seul rang de fil
// (19), ajouter les deux périmètres quand on colle deux carrés (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : sport (9, basket), architecture (10, la
// pièce), couture (8, 11), art (13, cadres), jardin (14, 17, 18), musique (14,
// kiosque), géométrie pure (2, 3, 5, 6, 7, 15, 16), ferme (19), jeu (20).
// Les métiers : entraîneur de basket (9), peintre en bâtiment (10), couturière
// (11), encadreuse (13), paysagiste (14, 18), jardinier (17), fermière (19).
// Aucun décor de La Réunion sur cette feuille.
//
// ⭐ FAIT RÉEL : un terrain de basket FIBA mesure 28 m sur 15 m (ex. 9, Règles
// officielles du basket-ball FIBA, art. 2). Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS (aides locales, SVG de viewBox 300, police 14, sans `min-w`) :
//   · `poly` — un polygone, la longueur de chaque côté écrite DEHORS (la
//     normale sortante, calculée par le sens du tracé) ; `decal` déplace une
//     étiquette coincée dans un coin rentrant ;
//   · `triangle` — un triangle À L'ÉCHELLE, construit sur ses trois côtés ;
//   · `quadrillage` — des figures en carreaux, un carreau = 1 cm.
//
// Micro-compétences : perimetre_comprendre (1, 4, 8, 12), perimetre_triangle
// (2, 7, 8, 11, 19), perimetre_quadrilatere (3, 6, 9, 13, 15, 16, 17),
// perimetre_polygone (5, 10, 14, 18, 20), perimetre_defi (16, 17, 18, 19, 20).
// 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Point = [number, number];

/**
 * UN POLYGONE, en coordonnées SVG (viewBox 300 × `H`). `labels[i]` est écrit
 * au milieu du côté P[i] → P[i+1], DEHORS : la normale sortante se déduit du
 * sens du tracé (signe de l'aire). "" pour ne rien écrire. `decal[i]` décale
 * l'étiquette i (un coin rentrant). `extra` : un tracé de plus (un portail).
 */
const poly = (P: Point[], labels: string[], H: number, decal: Record<number, Point> = {}, extra?: ReactNode) => {
  const n = P.length;
  let aire2 = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = P[i];
    const [x2, y2] = P[(i + 1) % n];
    aire2 += x1 * y2 - x2 * y1;
  }
  const s = aire2 > 0 ? 1 : -1;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un polygone à ${n} côtés : ${labels.filter(Boolean).join(", ")}.`}>
        <polygon points={P.map((p) => p.join(",")).join(" ")} fill="#dbeafe" stroke={BLEU} strokeWidth={2.5} strokeLinejoin="round" />
        {extra}
        {labels.map((t, i) => {
          if (!t) return null;
          const [x1, y1] = P[i];
          const [x2, y2] = P[(i + 1) % n];
          const L = Math.hypot(x2 - x1, y2 - y1);
          const nx = (s * (y2 - y1)) / L;
          const ny = (-s * (x2 - x1)) / L;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const ancre = nx > 0.6 ? "start" : nx < -0.6 ? "end" : "middle";
          const d = ancre === "middle" ? 14 + Math.abs(nx) * 22 : 9;
          const [dx, dy] = decal[i] ?? [0, 0];
          return (
            <text key={i} x={mx + nx * d + dx} y={my + ny * d + 5 + dy} textAnchor={ancre} fontSize={14} fontWeight={700} fill={t.includes("?") ? ORANGE : NOIR}>
              {t}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UN TRIANGLE À L'ÉCHELLE, construit sur ses trois côtés : la base en bas, puis
 * le côté de droite, puis celui de gauche. `labels` dans le même ordre.
 */
const triangle = (base: number, droite: number, gauche: number, labels: [string, string, string]) => {
  const xC = (gauche * gauche - droite * droite + base * base) / (2 * base);
  const yC = Math.sqrt(gauche * gauche - xC * xC);
  const k = Math.min(180 / base, 100 / yC);
  const ox = 150 - (base * k) / 2;
  const oy = 34 + yC * k;
  return poly([[ox, oy], [ox + base * k, oy], [ox + xC * k, oy - yC * k]], labels, oy + 30);
};

/** DES FIGURES EN CARREAUX sur un quadrillage de `cols` × `rows`. Le nom de la figure dans son premier carreau. */
const quadrillage = (cols: number, rows: number, formes: { cellules: Point[]; nom?: string; couleur: string }[]) => {
  const c = Math.min(30, 288 / cols);
  const x0 = (300 - cols * c) / 2;
  const y0 = 4;
  const H = rows * c + 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un quadrillage avec ${formes.length === 1 ? "une figure" : `${formes.length} figures`} en carreaux.`}>
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * c} y1={y0} x2={x0 + i * c} y2={y0 + rows * c} stroke="#cbd5e1" strokeWidth={1} />
        ))}
        {Array.from({ length: rows + 1 }, (_, j) => (
          <line key={`h${j}`} x1={x0} y1={y0 + j * c} x2={x0 + cols * c} y2={y0 + j * c} stroke="#cbd5e1" strokeWidth={1} />
        ))}
        {formes.map((f, k) => (
          <g key={k}>
            {f.cellules.map(([cx, cy], i) => (
              <rect key={i} x={x0 + cx * c} y={y0 + cy * c} width={c} height={c} fill={f.couleur} stroke="#1e3a8a" strokeWidth={1} />
            ))}
            {f.nom ? (
              <text x={x0 + f.cellules[0][0] * c + c / 2} y={y0 + f.cellules[0][1] * c + c / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="#fff">
                {f.nom}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesPerimetreCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "perimetre",
  titre: "Les périmètres",
  accroche:
    "Vingt exercices, du geste seul au problème. Faire le tour d'une figure, sur un quadrillage puis avec des mesures. Triangle, carré, rectangle, losange, pentagone, hexagone. Trouver un côté qui manque. Un terrain de basket, une pièce en L, des cadres photo, un kiosque, une clôture, un enclos. Un rappel avant chaque niveau. Cherche d'abord au brouillon, tape ta réponse, puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/perimetre", titre: "Les périmètres" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je fais le tour de la figure, sans oublier de côté.",
      rappel: [
        "Le périmètre, c'est la longueur du TOUR d'une figure.",
        "J'additionne les longueurs de tous les côtés, dans la même unité.",
        "Carré : côté × 4. Rectangle : (longueur + largeur) × 2.",
        "Le périmètre n'est pas l'aire : l'aire, c'est la surface à l'intérieur.",
      ],
      exercices: [
        {
          enonce:
            "Sur ce quadrillage, chaque carreau a des côtés de 1 cm.\na) Quel est le périmètre de la figure, en cm ?\nb) Combien de carreaux la figure contient-elle ?\nc) Le périmètre, c'est : A) le nombre de carreaux   B) la longueur du tour   C) la plus grande longueur. Réponds par A, B ou C.",
          figure: quadrillage(4, 3, [{ cellules: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2]], couleur: "#93c5fd" }]),
          reponses: [
            { question: "a)", attendu: "14", unite: "cm" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "Le périmètre, c'est la longueur du tour. Je pars d'un coin et je compte les côtés de carreaux sur le bord.\nEn bas : 4 cm. À droite : 1 cm. Sur la marche : 3 cm. Puis 2 cm qui montent. En haut : 1 cm. À gauche : 3 cm.\na) 4 + 1 + 3 + 2 + 1 + 3 = 14 cm.\nb) Je compte les carreaux à l'intérieur : 6. Ce n'est pas le périmètre !\nc) Le périmètre est la longueur du tour : B.\n⛔ Le piège : compter les carreaux au lieu des côtés du bord. Le tour se mesure sur le bord.\nRéponse : a) 14 cm ; b) 6 carreaux ; c) B.",
          micros: ["perimetre_comprendre"],
        },
        {
          enonce: "a) Quel est le périmètre de ce triangle ?\nb) Un autre triangle a des côtés de 12 cm, 12 cm et 5 cm. Quel est son périmètre ?",
          figure: triangle(11, 9, 7, ["11 cm", "9 cm", "7 cm"]),
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "29" },
          ],
          correction:
            "Un triangle a 3 côtés. J'additionne les 3 longueurs.\na) 11 + 9 + 7 = 27 cm.\nb) 12 + 12 + 5 = 29 cm.\n⛔ Le piège : oublier un des deux côtés de 12 cm, et trouver 17 cm. Je compte 3 nombres pour 3 côtés.\nRéponse : a) 27 cm ; b) 29 cm.",
          micros: ["perimetre_triangle"],
        },
        {
          enonce: "a) Quel est le périmètre de ce rectangle ?\nb) Un carré a des côtés de 6 cm. Quel est son périmètre ?",
          figure: poly([[60, 30], [240, 30], [240, 110], [60, 110]], ["9 cm", "4 cm", "9 cm", "4 cm"], 140),
          reponses: [
            { question: "a)", attendu: "26" },
            { question: "b)", attendu: "24" },
          ],
          correction:
            "a) Un rectangle a 2 longueurs et 2 largeurs.\n9 + 4 + 9 + 4 = 26 cm. Ou bien : (9 + 4) × 2 = 13 × 2 = 26 cm.\nb) Un carré a 4 côtés égaux : 6 × 4 = 24 cm.\n⛔ Le piège : faire 9 × 4 = 36. Ça, c'est l'aire du rectangle, pas son tour.\nRéponse : a) 26 cm ; b) 24 cm.",
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Le périmètre, c'est la longueur du tour d'une figure.\nb) Pour mettre une clôture autour d'un champ, on a besoin de son périmètre.\nc) Pour peindre le sol d'une pièce, on a besoin de son périmètre.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "vrai" },
            { question: "c)", attendu: "faux" },
          ],
          correction:
            "a) Vrai : le périmètre est la longueur du tour.\nb) Vrai : la clôture fait le tour du champ. Sa longueur, c'est le périmètre.\nc) Faux : la peinture couvre toute la surface du sol. C'est l'aire qu'il faut, pas le tour.\n⛔ Le piège : confondre le tour et la surface. Le périmètre se mesure en m ou en cm, comme un fil qu'on pose sur le bord.\nRéponse : a) vrai ; b) vrai ; c) faux.",
          micros: ["perimetre_comprendre"],
        },
        {
          enonce:
            "a) Un pentagone a 5 côtés égaux de 4 cm. Quel est son périmètre ?\nb) Un hexagone a 6 côtés égaux de 3 cm. Quel est son périmètre ?\nc) Combien de côtés a un octogone ?",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "8" },
          ],
          correction:
            "Quand tous les côtés sont égaux, je fais : côté × nombre de côtés.\na) Pentagone : 5 côtés. 5 × 4 = 20 cm.\nb) Hexagone : 6 côtés. 6 × 3 = 18 cm.\nc) Un octogone a 8 côtés, comme une pieuvre a 8 bras (octo veut dire huit).\n⛔ Le piège : se tromper de nombre de côtés. Penta = 5, hexa = 6, octo = 8.\nRéponse : a) 20 cm ; b) 18 cm ; c) 8 côtés.",
          micros: ["perimetre_polygone"],
        },
        {
          enonce: "Quel est le périmètre de ce quadrilatère ?",
          figure: poly([[66, 150], [234, 150], [217, 68], [80, 39]], ["6 cm", "3 cm", "5 cm", "4 cm"], 176),
          reponses: [
            { attendu: "18" },
          ],
          correction:
            "Un quadrilatère a 4 côtés. Ici, ils ne sont pas égaux : je les additionne un par un.\nJe pars d'un coin et je fais le tour : 6 + 3 + 5 + 4.\n6 + 3 = 9 ; 9 + 5 = 14 ; 14 + 4 = 18 cm.\n⛔ Le piège : oublier un côté. Je coche chaque côté quand je l'ai compté : 4 côtés, 4 nombres.\nRéponse : 18 cm.",
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce: "a) Un triangle équilatéral a 3 côtés égaux de 8 cm. Quel est son périmètre ?\nb) Un triangle isocèle a deux côtés de 7 cm et un côté de 4 cm. Quel est son périmètre ?",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "18" },
          ],
          correction:
            "a) Équilatéral : 3 côtés égaux. 3 × 8 = 24 cm.\nb) Isocèle : deux côtés égaux. 7 + 7 + 4 = 18 cm.\n⛔ Le piège : au b), faire 7 + 4 = 11 cm. Il y a DEUX côtés de 7 cm.\nRéponse : a) 24 cm ; b) 18 cm.",
          micros: ["perimetre_triangle"],
        },
        {
          enonce: "Un triangle a des côtés de 4 cm, 35 mm et 50 mm.\na) Quel est son périmètre, en mm ?\nb) Écris ce périmètre en cm.",
          reponses: [
            { question: "a)", attendu: "125", unite: "mm" },
            { question: "b)", attendu: "12,5", unite: "cm" },
          ],
          correction:
            "Les côtés ne sont pas dans la même unité : je mets tout en mm d'abord.\n1 cm = 10 mm, donc 4 cm = 40 mm.\na) 40 + 35 + 50 = 125 mm.\nb) 10 mm font 1 cm. 125 mm, c'est 12 cm et 5 mm : 12,5 cm.\n⛔ Le piège : additionner 4 + 35 + 50 = 89. On n'additionne pas des cm et des mm.\nRéponse : a) 125 mm ; b) 12,5 cm.",
          micros: ["perimetre_comprendre", "perimetre_triangle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je compte les côtés, je mets tout dans la même unité, puis j'additionne.",
      rappel: [
        "Rectangle : (longueur + largeur) × 2. Carré : côté × 4.",
        "Polygone à côtés égaux : côté × nombre de côtés.",
        "Avant d'additionner, toutes les longueurs dans la même unité.",
      ],
      exercices: [
        {
          enonce:
            "Un terrain de basket est un rectangle de 28 m de long et 15 m de large.\na) Quel est son périmètre ?\nb) Pour s'échauffer, l'entraîneur fait courir 3 tours du terrain. Combien de mètres courent les joueurs ?",
          reponses: [
            { question: "a)", attendu: "86" },
            { question: "b)", attendu: "258", unite: "m" },
          ],
          correction:
            "a) Rectangle : (28 + 15) × 2 = 43 × 2 = 86 m.\nb) 3 tours de 86 m : 3 × 86 = 258 m.\n⛔ Le piège : faire 28 × 15. Ça, c'est l'aire du terrain, pas son tour.\nRéponse : a) 86 m ; b) 258 m.",
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce:
            "Un peintre pose une plinthe au bas des murs de cette pièce en forme de L.\na) Quel est le périmètre de la pièce ?\nb) La porte fait 1 m de large : on ne met pas de plinthe devant. Combien de mètres de plinthe faut-il ?",
          figure: poly([[62, 20], [172, 20], [172, 64], [238, 64], [238, 152], [62, 152]], ["5 m", "2 m", "3 m", "4 m", "8 m", "6 m"], 176, { 2: [18, 0] }),
          reponses: [
            { question: "a)", attendu: "28" },
            { question: "b)", attendu: "27", unite: "m" },
          ],
          correction:
            "La pièce a 6 côtés. Je fais le tour en partant d'un coin : 5, 2, 3, 4, 8, 6.\na) 5 + 2 + 3 + 4 + 8 + 6 = 28 m.\nb) Je retire la porte : 28 − 1 = 27 m.\n⛔ Le piège : oublier les deux petits côtés du creux, 2 m et 3 m. Je compte 6 côtés pour 6 nombres.\nRéponse : a) 28 m ; b) 27 m.",
          micros: ["perimetre_polygone"],
        },
        {
          enonce: "Une couturière borde un fanion triangulaire. Ses côtés mesurent 1,2 m, 90 cm et 75 cm.\na) Quel est le périmètre du fanion, en cm ?\nb) Écris-le en m.",
          reponses: [
            { question: "a)", attendu: "285", unite: "cm" },
            { question: "b)", attendu: "2,85", unite: "m" },
          ],
          correction:
            "Je mets tout en cm. 1 m = 100 cm, donc 1,2 m = 120 cm.\na) 120 + 90 + 75 = 285 cm.\nb) 100 cm font 1 m. 285 cm, c'est 2 m et 85 cm : 2,85 m.\n⛔ Le piège : additionner 1,2 + 90 + 75. Les m et les cm ne s'additionnent pas.\nRéponse : a) 285 cm ; b) 2,85 m.",
          micros: ["perimetre_triangle"],
        },
        {
          enonce:
            "Chaque carreau a des côtés de 1 cm.\na) Quel est le périmètre de la figure A ?\nb) Quel est le périmètre de la figure B ?\nc) Laquelle a le plus grand périmètre ? A) la figure A   B) la figure B   C) elles ont le même. Réponds par A, B ou C.\nd) Quelle figure a le plus de carreaux ? Écris A ou B.",
          figure: quadrillage(9, 3, [
            { cellules: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], nom: "A", couleur: "#60a5fa" },
            { cellules: [[5, 1], [6, 1], [7, 1], [8, 1]], nom: "B", couleur: "#fb923c" },
          ]),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "C" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) A est un rectangle de 3 carreaux sur 2 : 3 + 2 + 3 + 2 = 10 cm.\nb) B est un rectangle de 4 carreaux sur 1 : 4 + 1 + 4 + 1 = 10 cm.\nc) 10 cm et 10 cm : elles ont le même périmètre. C'est C.\nd) A a 6 carreaux, B en a 4 : A a le plus de carreaux.\n⛔ Le piège : croire que la figure qui a le plus de carreaux a forcément le plus grand tour. Ici, les tours sont égaux.\nRéponse : a) 10 cm ; b) 10 cm ; c) C ; d) A.",
          micros: ["perimetre_comprendre", "perimetre_quadrilatere"],
        },
        {
          enonce:
            "Une encadreuse fabrique des cadres carrés de 25 cm de côté, avec une baguette de bois.\na) Combien de cm de baguette pour un cadre ?\nb) Écris cette longueur en m.\nc) Combien de mètres de baguette pour 6 cadres ?",
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "1", unite: "m" },
            { question: "c)", attendu: "6", unite: "m" },
          ],
          correction:
            "a) Un carré a 4 côtés égaux : 25 × 4 = 100 cm.\nb) 100 cm = 1 m.\nc) 1 m par cadre : 6 × 1 = 6 m.\n⛔ Le piège : faire 25 × 2 = 50 cm. Un carré a 4 côtés, pas 2.\nRéponse : a) 100 cm ; b) 1 m ; c) 6 m.",
          micros: ["perimetre_quadrilatere"],
        },
        {
          enonce:
            "a) Un paysagiste trace un massif de fleurs en forme d'hexagone. Ses 6 côtés mesurent 4,5 m. Quel est son périmètre ?\nb) Le kiosque à musique du parc est un octogone. Ses côtés mesurent 2 m. Quel est son périmètre ?",
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "16" },
          ],
          correction:
            "Tous les côtés sont égaux : côté × nombre de côtés.\na) Hexagone : 6 côtés. 6 × 4,5 = 27 m. (6 × 4 = 24, et 6 × 0,5 = 3 ; 24 + 3 = 27.)\nb) Octogone : 8 côtés. 8 × 2 = 16 m.\n⛔ Le piège : compter 6 côtés pour l'octogone. Octo = 8.\nRéponse : a) 27 m ; b) 16 m.",
          micros: ["perimetre_polygone"],
        },
        {
          enonce: "a) Un losange a 4 côtés égaux de 7,5 cm. Quel est son périmètre ?\nb) Un parallélogramme a des côtés de 9 cm et 5,5 cm. Quel est son périmètre ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "29" },
          ],
          correction:
            "a) Le losange a 4 côtés égaux, comme le carré : 7,5 × 4 = 30 cm.\nb) Le parallélogramme a ses côtés opposés égaux, comme le rectangle : (9 + 5,5) × 2 = 14,5 × 2 = 29 cm.\n⛔ Le piège : au a), additionner seulement deux côtés. Un losange a 4 côtés, tous égaux.\nRéponse : a) 30 cm ; b) 29 cm.",
          micros: ["perimetre_quadrilatere"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je cherche d'abord les côtés qui manquent. Puis je fais le tour.",
      rappel: [
        "Je fais un schéma, et j'écris chaque longueur connue sur son côté.",
        "Un côté qui manque se trouve souvent avec les autres : une longueur moins une autre.",
        "Je calcule, puis je vérifie que le tour tombe juste.",
      ],
      exercices: [
        {
          titre: "Le côté caché",
          enonce:
            "a) Un carré a un périmètre de 48 cm. Combien mesure son côté ?\nb) Un rectangle a un périmètre de 30 cm. Sa longueur mesure 9 cm. Combien mesure sa largeur ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) Le carré a 4 côtés égaux : 48 ÷ 4 = 12 cm.\n⭐ Je vérifie : 12 × 4 = 48.\nb) Le tour fait 30 cm. Une longueur et une largeur font la moitié du tour : 30 ÷ 2 = 15 cm.\nLa largeur : 15 − 9 = 6 cm.\n⭐ Je vérifie : 9 + 6 + 9 + 6 = 30.\n⛔ Le piège : au a), faire 48 ÷ 2 = 24. Un carré a 4 côtés, pas 2.\nRéponse : a) 12 cm ; b) 6 cm.",
          micros: ["perimetre_defi", "perimetre_quadrilatere"],
        },
        {
          titre: "La clôture du jardin",
          enonce:
            "Un jardinier veut clôturer un jardin rectangulaire de 15 m sur 10 m. Il laisse un portail de 3 m sans grillage.\na) Quel est le périmètre du jardin ?\nb) Combien de mètres de grillage faut-il ?\nc) Le grillage est vendu en rouleaux de 10 m. Combien de rouleaux faut-il acheter ?",
          figure: poly(
            [[75, 30], [225, 30], [225, 130], [75, 130]],
            ["15 m", "10 m", "15 m", "10 m"],
            156,
            {},
            <g>
              <line x1={85} y1={130} x2={115} y2={130} stroke="#fff" strokeWidth={5} />
              <line x1={85} y1={130} x2={115} y2={130} stroke={ORANGE} strokeWidth={2.5} strokeDasharray="4 3" />
              <text x={110} y={122} textAnchor="middle" fontSize={14} fontWeight={700} fill={ORANGE}>
                portail
              </text>
            </g>,
          ),
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "47", unite: "m" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) (15 + 10) × 2 = 25 × 2 = 50 m.\nb) Pas de grillage devant le portail : 50 − 3 = 47 m.\nc) 4 rouleaux font 40 m : pas assez. 5 rouleaux font 50 m : assez.\nIl faut 5 rouleaux.\n⛔ Le piège : oublier le portail, ou acheter 4 rouleaux et demi. On n'achète que des rouleaux entiers.\nRéponse : a) 50 m ; b) 47 m ; c) 5 rouleaux.",
          micros: ["perimetre_defi", "perimetre_quadrilatere"],
        },
        {
          titre: "La pelouse en L",
          enonce:
            "Une paysagiste borde une pelouse en forme de L. Deux côtés ne sont pas écrits.\na) Combien mesure le côté du haut ?\nb) Combien mesure le côté de droite ?\nc) Quel est le périmètre de la pelouse ?",
          figure: poly([[60, 24], [168, 24], [168, 78], [240, 78], [240, 150], [60, 150]], ["? m", "3 m", "4 m", "? m", "10 m", "7 m"], 174, { 2: [16, 0] }),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "34" },
          ],
          correction:
            "a) En bas, la pelouse fait 10 m de large. En haut, il y a le côté cherché, puis le creux de 4 m.\nCôté du haut : 10 − 4 = 6 m.\nb) À gauche, la pelouse fait 7 m de haut. À droite, il y a le creux de 3 m, puis le côté cherché.\nCôté de droite : 7 − 3 = 4 m.\nc) Je fais le tour : 6 + 3 + 4 + 4 + 10 + 7 = 34 m.\n⭐ Je vérifie : c'est le même tour qu'un rectangle de 10 m sur 7 m, (10 + 7) × 2 = 34 m.\n⛔ Le piège : additionner seulement les côtés écrits : 3 + 4 + 10 + 7 = 24 m. Il manque deux côtés !\nRéponse : a) 6 m ; b) 4 m ; c) 34 m.",
          micros: ["perimetre_defi", "perimetre_polygone"],
        },
        {
          titre: "L'enclos des chèvres",
          enonce:
            "Une fermière fait un enclos triangulaire pour ses chèvres. Les côtés mesurent 25 m, 30 m et 35 m. Elle tend 3 rangs de fil tout autour.\na) Quel est le périmètre de l'enclos ?\nb) Combien de mètres de fil lui faut-il ?",
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "270", unite: "m" },
          ],
          correction:
            "a) 25 + 30 + 35 = 90 m.\nb) 3 rangs de fil, chacun fait le tour : 3 × 90 = 270 m.\n⛔ Le piège : s'arrêter à 90 m. Il y a 3 rangs : le fil fait 3 fois le tour.\nRéponse : a) 90 m ; b) 270 m.",
          micros: ["perimetre_defi", "perimetre_triangle"],
        },
        {
          titre: "Deux carrés collés",
          enonce:
            "Léna a deux carrés de carton de 5 cm de côté.\na) Quel est le périmètre d'un carré ?\nb) Elle colle les deux carrés côte à côte, pour faire un rectangle. Quel est le périmètre du rectangle ? A) 40 cm   B) 35 cm   C) 30 cm. Réponds par A, B ou C.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "C" },
          ],
          correction:
            "a) 5 × 4 = 20 cm.\nb) Le rectangle mesure 5 + 5 = 10 cm de long et 5 cm de large.\nSon périmètre : (10 + 5) × 2 = 15 × 2 = 30 cm. C'est C.\n⭐ Autre façon : sur le bord, je compte 6 côtés de 5 cm. 6 × 5 = 30 cm.\n⛔ Le piège : ajouter les deux périmètres, 20 + 20 = 40 cm. Les deux côtés collés sont à l'intérieur : ils ne font plus partie du tour.\nRéponse : a) 20 cm ; b) C.",
          schema: ecranSeulement(
            poly(
              [[60, 30], [150, 30], [240, 30], [240, 120], [150, 120], [60, 120]],
              ["5 cm", "5 cm", "5 cm", "5 cm", "5 cm", "5 cm"],
              150,
              {},
              <line x1={150} y1={30} x2={150} y2={120} stroke={BLEU} strokeWidth={1.5} strokeDasharray="5 4" />,
            ),
          ),
          micros: ["perimetre_defi", "perimetre_polygone"],
        },
      ],
    },
  ],
};
