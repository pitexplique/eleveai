// ─── Fiche d'exercices : la proportionnalité (CM2) — 20 exercices corrigés ────
//
// 10/11/2026 : feuille INTERACTIVE (réponses vérifiées sans IA), sur la forme
// des feuilles 6e (`maths-6e-prop-proportionnalite.tsx`) et des feuilles CM2
// (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`,
// cm2/proportionnalite) et la banque du coach
// (`questionBank/cm2/maths/proportionnalite.bank.ts`) : reconnaître une
// situation de proportionnalité, compléter un tableau, le coefficient (on
// multiplie toujours par le même nombre), « 2 fois plus », la valeur pour UN
// SEUL, les problèmes et les défis.
// ⛔ LIMITES DU CM2 : pas de produit en croix, pas de vitesse en formule. Les
// procédures sont la linéarité (« 2 fois plus »), l'addition de deux colonnes,
// le retour à l'unité et le coefficient.
// ⛔ CM2 : AUCUNE question ouverte. QCM (A, B, C), oui/non, vrai/faux, nombres.
// ⛔ Aucun exemple de la carte mentale n'est repris (pommes à 3 €, 2 œufs pour
// 4 parts, cahier à 2,50 €, 3 places de ciné à 21 €, robinet de 8 L en 2 min,
// 4 croissants à 3,20 €).
//
// Les pièges nommés : « le prix monte » pris pour proportionnel (1), ajouter
// au lieu de multiplier (2, 4, 9, 12, 18), soustraire pour trouver le
// coefficient (3), enlever 1 € pour une entrée de moins (5), une seule colonne
// vérifiée (6), multiplier par 5 des km faits en 2 h (7), « ajouter un zéro »
// pour × 10 (8), multiplier au lieu de diviser (10, 13), un lot en promotion
// pris pour proportionnel (11), 12 ÷ 8 = 1,5 lu « 1,05 » (14), « les deux
// augmentent » pris pour proportionnel (15), diviser par le nombre d'heures de
// l'énoncé (16), 6,50 ÷ 5 = 1,3 lu « 1,03 » (17), comparer les prix sans
// ramener au kilo (19), diviser par le nombre de costumes (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : boulangerie (1), cuisine (2, 4, 12), fleurs
// (3), zoo (5, 18), vélo (7), couture (8, 20), peinture (9), imprimante (10),
// courses (11, 19), sciences (13, ressort), musique (14), voyage (16). Les
// métiers : fleuriste (3), cuisinier (4), couturière (8), peintre (9),
// pâtissier (12), scientifique (13), soigneuse (18). Tout est un MODÈLE.
//
// ⭐ LES DESSINS (SVG de viewBox 300, police 14, sans `min-w`) : des tableaux,
// la case cherchée « ? » en rouge (2, 3, 7, 9), les tableaux de la recette et
// des phoques dans le corrigé (12, 18).
//
// Micro-compétences : prop_reconnaitre (1, 6, 11, 15), prop_tableau (2, 7, 9,
// 12), prop_coefficient (3, 8, 13, 14), prop_quatrieme (4, 5, 10, 14, 16),
// prop_probleme (11, 12, 16, 18), prop_defi (17, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ENCRE = "#0f172a";
const GRIS = "#94a3b8";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * UN TABLEAU en SVG : la première colonne porte les titres (sur fond gris), les
 * autres les nombres. Une case « ? » est écrite en rouge. 300 de large, police 14.
 */
const grille = (lignes: string[][]) => {
  const n = lignes[0].length;
  const c0 = Math.max(...lignes.map((l) => l[0].length)) * 8.4 + 16;
  const w = (296 - c0) / (n - 1);
  const H = lignes.length * 32 + 4;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un tableau : ${lignes.map((l) => l.join(", ")).join(" ; ")}.`}>
        {lignes.map((l, i) =>
          l.map((c, j) => {
            const x = j === 0 ? 2 : 2 + c0 + (j - 1) * w;
            const larg = j === 0 ? c0 : w;
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={2 + i * 32} width={larg} height={32} fill={j === 0 ? "#f1f5f9" : "#ffffff"} stroke={GRIS} strokeWidth={1} />
                <text x={x + larg / 2} y={2 + i * 32 + 21} textAnchor="middle" fontSize={14} fontWeight={j === 0 || c === "?" ? 700 : 400} fill={c === "?" ? "#dc2626" : ENCRE}>
                  {c}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
};

export const exercicesProportionnaliteCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître une situation de proportionnalité. Compléter un tableau. Trouver le nombre par lequel on multiplie. Chercher « 2 fois plus », ou le prix d'un seul. Des crêpes, des tulipes, un zoo, un vélo, du ruban, de la peinture, une recette de gâteau, un ressort, des cordes de guitare et un voyage en voiture. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/proportionnalite", titre: "La proportionnalité" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche par combien on multiplie, puis je calcule.",
      rappel: [
        "C'est proportionnel quand on multiplie TOUJOURS par le même nombre.",
        "2 fois plus de choses, c'est 2 fois plus cher. 3 fois plus, c'est 3 fois plus cher.",
        "Je peux aussi chercher la valeur pour UN SEUL, puis multiplier.",
      ],
      exercices: [
        {
          enonce: "Est-ce une situation de proportionnalité ? Réponds par oui ou non.\na) 1 baguette coûte 1,20 €. 2 baguettes coûtent 2,40 €. 5 baguettes coûtent 6 €.\nb) En taxi, 2 km coûtent 6 €. 4 km coûtent 10 €.\nc) Un cycliste roule toujours à la même allure. En 1 h, il fait 18 km. En 3 h, il fait 54 km.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "Je regarde si on multiplie toujours par le même nombre.\na) 2 baguettes, c'est 2 fois plus : 2 × 1,20 = 2,40 €. Oui.\n5 baguettes : 5 × 1,20 = 6 €. Oui. C'est proportionnel.\nb) 4 km, c'est 2 fois 2 km. Si c'était proportionnel, on paierait 2 × 6 = 12 €. Or on paie 10 €. Non.\nc) 3 h, c'est 3 fois 1 h : 3 × 18 = 54 km. Oui. C'est proportionnel.\n⛔ Le piège : dire oui parce que « le prix monte ». Au b), le prix monte, mais il ne double pas quand les kilomètres doublent.\nRéponse : a) oui ; b) non ; c) oui.",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Pour faire 10 crêpes, il faut 250 g de farine. Complète le tableau.\na) Combien de grammes pour 20 crêpes ?\nb) Combien de grammes pour 30 crêpes ?\nc) Combien de grammes pour 5 crêpes ?",
          figure: grille([
            ["Crêpes", "10", "20", "30", "5"],
            ["Farine (g)", "250", "?", "?", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "500" },
            { question: "b)", attendu: "750" },
            { question: "c)", attendu: "125" },
          ],
          correction:
            "a) 20 crêpes, c'est 2 fois 10 crêpes. Donc 2 fois plus de farine : 2 × 250 = 500 g.\nb) 30 crêpes, c'est 3 fois 10 crêpes : 3 × 250 = 750 g.\nc) 5 crêpes, c'est la moitié de 10 crêpes. Donc la moitié de la farine : 250 ÷ 2 = 125 g.\n⛔ Le piège : AJOUTER 10 à la farine parce qu'on ajoute 10 crêpes. 20 crêpes avec 260 g de farine, c'est raté ! On multiplie.\nRéponse : a) 500 g ; b) 750 g ; c) 125 g.",
          micros: ["prop_tableau"],
        },
        {
          enonce: "Une fleuriste vend des tulipes. Le prix est proportionnel au nombre de tulipes.\na) Par quel nombre multiplie-t-on le nombre de tulipes pour avoir le prix ?\nb) Combien coûtent 8 tulipes ?\nc) Combien coûtent 12 tulipes ?",
          figure: grille([
            ["Tulipes", "3", "5", "8", "12"],
            ["Prix (€)", "6", "10", "?", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "24" },
          ],
          correction:
            "a) Pour trouver le nombre par lequel on multiplie, je DIVISE : 6 ÷ 3 = 2. Je vérifie : 5 × 2 = 10. C'est bien 2.\nCe nombre s'appelle le coefficient : une tulipe coûte 2 €.\nb) 8 tulipes : 8 × 2 = 16 €.\nc) 12 tulipes : 12 × 2 = 24 €.\n⛔ Le piège : soustraire, 6 − 3 = 3, et dire « on ajoute 3 ». Avec 5 tulipes, 5 + 3 = 8, pas 10.\nRéponse : a) 2 ; b) 16 € ; c) 24 €.",
          micros: ["prop_coefficient"],
        },
        {
          enonce: "Pour 3 bols de soupe, un cuisinier met 4 carottes.\na) Combien de carottes pour 6 bols ?\nb) Combien de carottes pour 9 bols ?\nc) Combien de carottes pour 30 bols ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "40" },
          ],
          correction:
            "a) 6 bols, c'est 2 fois 3 bols. Donc 2 fois plus de carottes : 2 × 4 = 8 carottes.\nb) 9 bols, c'est 3 fois 3 bols : 3 × 4 = 12 carottes.\nc) 30 bols, c'est 10 fois 3 bols : 10 × 4 = 40 carottes.\n⛔ Le piège : ajouter 3 carottes parce qu'on ajoute 3 bols. Pour 6 bols, 4 + 3 = 7 carottes, c'est faux : il en faut 8.\nRéponse : a) 8 ; b) 12 ; c) 40.",
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Au zoo, 4 entrées coûtent 36 €.\na) Combien coûte 1 entrée ?\nb) Combien coûtent 3 entrées ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "27" },
          ],
          correction:
            "3 n'est pas un nombre de fois 4. Je passe donc par le prix d'UNE entrée.\na) 4 entrées coûtent 36 €. 1 entrée : 36 ÷ 4 = 9 €.\nb) 3 entrées : 3 × 9 = 27 €.\nJe vérifie : 4 × 9 = 36. C'est juste.\n⛔ Le piège : calculer 36 − 1 = 35 € pour 3 entrées. Une entrée en moins, c'est 9 € en moins : 36 − 9 = 27 €.\nRéponse : a) 9 € ; b) 27 €.",
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Quel tableau est un tableau de proportionnalité ?\nA) 1 kg → 10 € et 2 kg → 12 €\nB) 2 kg → 5 € et 4 kg → 9 €\nC) 3 kg → 12 € et 5 kg → 20 €",
          reponses: [{ attendu: "C" }],
          correction:
            "Pour chaque tableau, je cherche par combien on multiplie, et je vérifie sur les DEUX colonnes.\nA) 1 × 10 = 10, mais 2 × 10 = 20, pas 12. Ce n'est pas proportionnel.\nB) 4 kg, c'est 2 fois 2 kg. 2 × 5 = 10 €, pas 9 €. Ce n'est pas proportionnel.\nC) 12 ÷ 3 = 4. Je vérifie : 5 × 4 = 20. On multiplie toujours par 4 : c'est proportionnel.\n⛔ Le piège : regarder une seule colonne. Au A, 1 kg → 10 € a l'air juste, mais la deuxième colonne ne suit pas.\nRéponse : C.",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Avec un vélo électrique, Inès roule toujours à la même allure. En 2 h, elle fait 30 km. En 3 h, elle fait 45 km.\na) Combien de km fait-elle en 5 h ?\nb) Combien de km fait-elle en 1 h ?\nc) Combien de km fait-elle en 10 h ?",
          figure: grille([
            ["Durée (h)", "2", "3", "5", "1"],
            ["Distance (km)", "30", "45", "?", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "75" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "150" },
          ],
          correction:
            "a) 5 h, c'est 2 h + 3 h. J'additionne les distances : 30 + 45 = 75 km.\nb) 1 h, c'est la moitié de 2 h : 30 ÷ 2 = 15 km.\nc) 10 h, c'est 10 fois 1 h : 10 × 15 = 150 km.\nJe vérifie le a) : 5 × 15 = 75. C'est juste.\n⛔ Le piège : multiplier 30 par 5 pour 5 h. Les 30 km sont faits en 2 h, pas en 1 h : on trouverait 2 fois trop.\nRéponse : a) 75 km ; b) 15 km ; c) 150 km.",
          micros: ["prop_tableau", "prop_coefficient"],
        },
        {
          enonce: "Une couturière achète du ruban. 1 m de ruban coûte 1,50 €.\na) Combien coûtent 2 m ?\nb) Combien coûtent 4 m ?\nc) Combien coûtent 10 m ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "Le coefficient est 1,50 : je multiplie le nombre de mètres par 1,50.\na) 2 m : 2 × 1,50 = 3 €.\nb) 4 m, c'est 2 fois 2 m : 2 × 3 = 6 €.\nc) 10 m : 10 × 1,50. Chaque chiffre prend une valeur 10 fois plus grande. Le 1 des unités devient le chiffre des dizaines. Le 5 des dixièmes devient le chiffre des unités. Cela donne 15 €.\n⭐ Le raccourci : la virgule avance d'un rang vers la droite, 1,50 devient 15.\n⛔ Le piège : écrire 1,500 ou 10,50 €. Multiplier par 10 ne consiste pas à ajouter un zéro ou 10.\nRéponse : a) 3 € ; b) 6 € ; c) 15 €.",
          micros: ["prop_coefficient"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je range les nombres dans un tableau, puis je calcule.",
      rappel: [
        "Dans un tableau de proportionnalité, je peux multiplier une colonne, ou ajouter deux colonnes.",
        "La valeur pour UN SEUL : je divise. Puis je multiplie par le nombre voulu.",
        "Une promotion « le lot est moins cher » casse la proportionnalité.",
      ],
      exercices: [
        {
          enonce: "Pour faire du vert, un peintre mélange toujours 3 pots de jaune avec 2 pots de bleu.\na) Avec 6 pots de jaune, combien de pots de bleu ?\nb) Avec 9 pots de jaune, combien de pots de bleu ?\nc) Avec 10 pots de bleu, combien de pots de jaune ?",
          figure: grille([
            ["Jaune (pots)", "3", "6", "9", "?"],
            ["Bleu (pots)", "2", "?", "?", "10"],
          ]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "a) 6 pots de jaune, c'est 2 fois 3 pots. Donc 2 fois plus de bleu : 2 × 2 = 4 pots.\nb) 9 pots de jaune, c'est 3 fois 3 pots : 3 × 2 = 6 pots de bleu.\nc) 10 pots de bleu, c'est 5 fois 2 pots. Donc 5 fois plus de jaune : 5 × 3 = 15 pots.\n⛔ Le piège : garder toujours « 1 pot de jaune de plus ». Avec 6 jaunes et 5 bleus, le vert n'a plus la même couleur.\nRéponse : a) 4 ; b) 6 ; c) 15.",
          micros: ["prop_tableau"],
        },
        {
          enonce: "Une imprimante imprime 60 pages en 3 minutes, toujours à la même vitesse.\na) Combien de pages en 1 minute ?\nb) Combien de pages en 7 minutes ?\nc) Combien de minutes pour 200 pages ?",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "140" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "a) Je cherche la valeur pour 1 minute : 60 ÷ 3 = 20 pages.\nb) 7 minutes : 7 × 20 = 140 pages.\nc) Chaque minute donne 20 pages. Pour 200 pages : 200 ÷ 20 = 10 minutes.\nJe vérifie : 10 × 20 = 200.\n⛔ Le piège : calculer 60 × 3 = 180 pages en 1 minute. En 1 minute, l'imprimante fait MOINS de pages qu'en 3 minutes : je divise.\nRéponse : a) 20 pages ; b) 140 pages ; c) 10 minutes.",
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Au magasin, un yaourt coûte 0,60 €. Le pack de 4 yaourts coûte 2 €.\na) Combien coûtent 4 yaourts achetés un par un ?\nb) Le prix est-il proportionnel au nombre de yaourts ? Réponds par oui ou non.\nc) Pour 4 yaourts, qu'est-ce qui coûte le moins cher ?\nA) le pack\nB) 4 yaourts un par un\nC) c'est le même prix",
          reponses: [
            { question: "a)", attendu: "2,40" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "a) 4 yaourts un par un : 4 × 0,60 = 2,40 €.\nb) Si c'était proportionnel, le pack de 4 coûterait aussi 2,40 €. Or il coûte 2 €. Ce n'est pas proportionnel : non.\nc) 2 € est moins que 2,40 €. Le pack est moins cher : choix A.\nJ'économise 2,40 − 2 = 0,40 €.\n⛔ Le piège : croire que tout prix est proportionnel. Une promotion sur un lot casse la règle.\nRéponse : a) 2,40 € ; b) non ; c) A.",
          micros: ["prop_reconnaitre", "prop_probleme"],
        },
        {
          enonce: "Un pâtissier a une recette de gâteau pour 6 personnes : 3 œufs, 180 g de sucre et 300 g de farine. Il veut un gâteau pour 8 personnes.\na) Combien d'œufs ?\nb) Combien de grammes de sucre ?\nc) Combien de grammes de farine ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "240" },
            { question: "c)", attendu: "400" },
          ],
          correction:
            "8 n'est pas un nombre de fois 6. Je passe d'abord par 2 personnes : 6 ÷ 3 = 2, donc je divise tout par 3.\nPour 2 personnes : 3 ÷ 3 = 1 œuf ; 180 ÷ 3 = 60 g de sucre ; 300 ÷ 3 = 100 g de farine.\n8 personnes, c'est 4 fois 2 personnes. Je multiplie par 4.\na) 4 × 1 = 4 œufs.\nb) 4 × 60 = 240 g de sucre.\nc) 4 × 100 = 400 g de farine.\n⛔ Le piège : ajouter 2 à chaque nombre parce qu'on ajoute 2 personnes. 5 œufs, 182 g de sucre : le gâteau serait raté.\nRéponse : a) 4 œufs ; b) 240 g ; c) 400 g.",
          schema: ecranSeulement(
            grille([
              ["Personnes", "6", "2", "8"],
              ["Œufs", "3", "1", "4"],
              ["Sucre (g)", "180", "60", "240"],
              ["Farine (g)", "300", "100", "400"],
            ]),
          ),
          micros: ["prop_tableau", "prop_probleme"],
        },
        {
          enonce: "Une scientifique accroche des masses à un ressort. Il s'allonge de 3 cm pour 100 g. L'allongement est proportionnel à la masse.\na) De combien de cm s'allonge-t-il pour 200 g ?\nb) Et pour 500 g ?\nc) Il s'allonge de 21 cm. Quelle masse est accrochée, en g ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "700" },
          ],
          correction:
            "a) 200 g, c'est 2 fois 100 g : 2 × 3 = 6 cm.\nb) 500 g, c'est 5 fois 100 g : 5 × 3 = 15 cm.\nc) 21 cm, c'est combien de fois 3 cm ? 21 ÷ 3 = 7 fois.\nDonc la masse est 7 fois 100 g : 7 × 100 = 700 g.\n⛔ Le piège : calculer 21 × 100 = 2 100 g. On cherche d'abord combien de fois 3 cm il y a dans 21 cm.\nRéponse : a) 6 cm ; b) 15 cm ; c) 700 g.",
          micros: ["prop_coefficient"],
        },
        {
          enonce: "Un musicien achète des cordes de guitare. 8 cordes coûtent 12 €.\na) Combien coûtent 4 cordes ?\nb) Combien coûtent 12 cordes ?\nc) Combien coûte 1 corde ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "1,50" },
          ],
          correction:
            "a) 4 cordes, c'est la moitié de 8 cordes. Donc la moitié du prix : 12 ÷ 2 = 6 €.\nb) 12 cordes, c'est 8 cordes + 4 cordes. J'additionne les prix : 12 + 6 = 18 €.\nc) 1 corde : 12 ÷ 8 = 1,50 €. Je vérifie : 8 × 1,50 = 12.\n⭐ Autre chemin pour le b) : 12 × 1,50 = 18 €.\n⛔ Le piège du c) : écrire 1,05 €. 12 ÷ 8 = 1,5 : c'est 1 € et 50 centimes.\nRéponse : a) 6 € ; b) 18 € ; c) 1,50 €.",
          micros: ["prop_quatrieme", "prop_coefficient"],
        },
        {
          enonce: "Vrai ou faux ?\na) Le prix de l'essence est proportionnel au nombre de litres achetés.\nb) La note d'un contrôle est proportionnelle au temps passé à le faire.\nc) Le nombre de roues est proportionnel au nombre de voitures.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
          ],
          correction:
            "Je me demande : si je double l'un, l'autre double-t-il TOUJOURS ?\na) 2 fois plus de litres, c'est 2 fois plus cher. Chaque litre a le même prix : vrai.\nb) Passer 2 fois plus de temps ne donne pas 2 fois plus de points. Une note ne dépasse pas le maximum : faux.\nc) Chaque voiture a 4 roues. 2 voitures : 8 roues ; 3 voitures : 12 roues. On multiplie toujours par 4 : vrai.\n⛔ Le piège : dire vrai parce que « les deux augmentent ». Il faut que l'un soit TOUJOURS le même nombre de fois l'autre.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["prop_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois, je range les nombres dans un tableau, puis je réponds à chaque question.",
      rappel: [
        "Je cherche d'abord la valeur pour UN SEUL (1 heure, 1 objet, 1 kg).",
        "Ensuite je multiplie par le nombre demandé, ou je divise pour trouver combien.",
        "Pour comparer deux prix, je compare le prix d'UN kilo de chaque.",
      ],
      exercices: [
        {
          titre: "Le voyage en voiture",
          enonce: "La famille de Nina part en vacances. Sur l'autoroute, la voiture roule toujours à la même vitesse : 180 km en 2 heures.\na) Combien de km en 1 heure ?\nb) Combien de km en 5 heures ?\nc) Combien d'heures pour faire 270 km ?",
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "450" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) En 1 heure, c'est la moitié de 2 heures : 180 ÷ 2 = 90 km.\nb) En 5 heures : 5 × 90 = 450 km.\nc) Chaque heure fait 90 km. Pour 270 km : 270 ÷ 90 = 3 heures.\nJe vérifie : 3 × 90 = 270.\n⛔ Le piège : diviser 270 par 2 parce que l'énoncé parle de 2 heures. Je passe d'abord par 1 heure.\nRéponse : a) 90 km ; b) 450 km ; c) 3 heures.",
          micros: ["prop_quatrieme", "prop_probleme"],
        },
        {
          titre: "Les pains au chocolat",
          enonce: "À la boulangerie, 5 pains au chocolat coûtent 6,50 €.\na) Combien coûte 1 pain au chocolat ?\nb) Combien coûtent 8 pains au chocolat ?\nc) Avec 13 €, combien de pains au chocolat peut-on acheter ?",
          reponses: [
            { question: "a)", attendu: "1,30" },
            { question: "b)", attendu: "10,40" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "a) 1 pain : 6,50 ÷ 5 = 1,30 €. Je vérifie : 5 × 1,30 = 6,50.\nb) 8 pains : 8 × 1,30 = 10,40 €.\nc) 13 €, c'est 2 fois 6,50 €. Donc 2 fois plus de pains : 2 × 5 = 10 pains.\n⭐ Je vérifie : 10 × 1,30 = 13 €.\n⛔ Le piège : écrire 1,03 € pour un pain. Mais 5 × 1,03 = 5,15 €, pas 6,50 €.\nRéponse : a) 1,30 € ; b) 10,40 € ; c) 10 pains.",
          micros: ["prop_defi"],
        },
        {
          titre: "Le repas des phoques",
          enonce: "Au zoo, une soigneuse donne 3 kg de poisson pour 2 phoques. Chaque phoque mange autant.\na) Combien de kg pour 6 phoques ?\nb) Combien de kg pour 10 phoques ?\nc) Combien de kg pour 1 phoque ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "1,5" },
          ],
          correction:
            "a) 6 phoques, c'est 3 fois 2 phoques : 3 × 3 = 9 kg.\nb) 10 phoques, c'est 5 fois 2 phoques : 5 × 3 = 15 kg.\nc) 1 phoque, c'est la moitié de 2 phoques : 3 ÷ 2 = 1,5 kg.\nJe vérifie : 10 × 1,5 = 15 kg. C'est bien la réponse du b).\n⛔ Le piège : ajouter 4 kg parce qu'on ajoute 4 phoques. Pour 6 phoques, 3 + 4 = 7 kg ne suffit pas.\nRéponse : a) 9 kg ; b) 15 kg ; c) 1,5 kg.",
          schema: ecranSeulement(
            grille([
              ["Phoques", "2", "6", "10", "1"],
              ["Poisson (kg)", "3", "9", "15", "1,5"],
            ]),
          ),
          micros: ["prop_probleme"],
        },
        {
          titre: "Le riz le moins cher",
          enonce: "Au supermarché, trois paquets de riz.\nA) 2 kg pour 5 €\nB) 5 kg pour 11 €\nC) 1 kg pour 2,60 €\na) Combien coûte 1 kg de riz du paquet A ?\nb) Combien coûte 1 kg de riz du paquet B ?\nc) Quel paquet a le kilo le moins cher : A, B ou C ?",
          reponses: [
            { question: "a)", attendu: "2,50" },
            { question: "b)", attendu: "2,20" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "Pour comparer, je ramène chaque paquet au prix d'UN kilo.\na) Paquet A : 5 ÷ 2 = 2,50 € le kilo.\nb) Paquet B : 11 ÷ 5 = 2,20 € le kilo. Je vérifie : 5 × 2,20 = 11.\nPaquet C : 2,60 € le kilo.\nc) Je range : 2,20 < 2,50 < 2,60. Le kilo le moins cher est celui du paquet B.\n⛔ Le piège : choisir le paquet qui coûte le moins d'euros. Le paquet C coûte 2,60 € seulement, mais il ne contient qu'un kilo.\nRéponse : a) 2,50 € ; b) 2,20 € ; c) B.",
          micros: ["prop_defi"],
        },
        {
          titre: "Les costumes du spectacle",
          enonce: "Pour le spectacle de l'école, une couturière fabrique des costumes. Pour 3 costumes, il faut 4,5 m de tissu.\na) Combien de mètres pour 1 costume ?\nb) Combien de mètres pour 12 costumes ?\nc) Avec 30 m de tissu, combien de costumes ?",
          reponses: [
            { question: "a)", attendu: "1,5" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "a) 1 costume : 4,5 ÷ 3 = 1,5 m. Je vérifie : 3 × 1,5 = 4,5.\nb) 12 costumes : 12 × 1,5 = 18 m.\nc) 2 costumes prennent 2 × 1,5 = 3 m. 30 m, c'est 10 fois 3 m. Donc 10 fois 2 costumes : 10 × 2 = 20 costumes.\nJe vérifie : 20 × 1,5 = 30.\n⛔ Le piège : diviser 30 par 3, et trouver 10 costumes. Les 3 costumes prennent 4,5 m, pas 3 m.\nRéponse : a) 1,5 m ; b) 18 m ; c) 20 costumes.",
          micros: ["prop_defi"],
        },
      ],
    },
  ],
};
