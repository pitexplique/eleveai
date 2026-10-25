// ─── Fiche d'exercices : les fractions (CM1) — 20 exercices corrigés ──────────
//
// 25/10/2026 : la PREMIÈRE feuille de fractions du CM1, pour la notion
// `fraction` du coach CM1 (9 micros). Sur la forme de
// `maths-6e-fraction-nombre.tsx` et des feuilles CM1 `maths-cm1-tableau.tsx` /
// `maths-cm1-graphique.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
// Écriture alignée sur la feuille voisine `maths-cm2-fraction.tsx` (même jour) :
// les fractions en $\dfrac{a}{b}$, les autres nombres en texte simple.
//
// Pas de fiche de cours de CM1 (fichesCours: []). Alignée sur la banque du
// coach réparée le 25/10 (`lib/tutor-v4/questionBank/cm1/maths/fractions-
// gabarits-*.ts`, notionId fraction) : lire, représenter, l'unité, fraction
// plus grande que 1, droite graduée, comparer (même dénominateur, même
// numérateur, à 1, à la moitié), fractions équivalentes PAR REGROUPEMENT,
// fractions décimales, défis.
// ⛔ LIMITES DU CM1 : aucun calcul de fractions, pas d'écriture décimale d'une
// fraction non décimale (sauf 1/2 = 0,5 et, en ⭐, 3/4 = 75/100), « pour
// cent » seulement comme une autre façon de dire « sur 100 ».
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, une fraction.
//
// ⭐ CE QUE FRÉDÉRIC VOIT SUR LES COPIES (25/10) : ses élèves ne savent pas
// SIMPLIFIER, ni passer fraction → DÉCIMAL → POURCENTAGE. La feuille le
// prépare SUR FIGURE : 6/8 = 3/4 en regroupant les parts deux par deux (9),
// 2/6 = 1/3 (4), 3/6 = 1/2 (7, 12), 4/12 = 1/3 en paquets de 4 (17),
// 30/90 = 1/3 (18), 4/8 = 1/2 (19) ; 1/2 = 5/10 = 0,5 = 50 % (10, 19) ;
// 40/100 = 4/10 = 0,4 = 40 % (8), 30/100 = 3/10 = 0,3 = 30 % (20).
// Les pièges nommés : les parts blanches mises en bas (1, 3), « trois
// quatrièmes » (2), des parts inégales (4), l'unité prise pour une part (5),
// une fraction « toujours plus petite que 1 » (6, 12), compter les traits au
// lieu des sauts (7), décimale « parce qu'elle est petite » (8), « plus grand
// numérateur = plus grande fraction » sans regrouper (9, 19), 1/2 = 1,2 et
// 3/4 = 3,4 (10, 15), « plus grand dénominateur = plus grande fraction » (11,
// 15), 5/4 lu en cinquièmes (13), répondre le dénominateur (14), 0,4 pour
// 4/100 (15), 13/10 = 13,10 (16), ENLEVER au lieu de diviser (17), une part
// rapportée à une autre part (18), 0,03 pour trois dixièmes (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (2, recette de mamie), dessin (3),
// goûter (5), vélo (13), école (14, feutres), sport (16, saut sans élan),
// imprimerie (17), football (18), astronomie (19), art (20, mosaïque).
// Les métiers des problèmes : imprimeuse (17), arbitre (18), astronome (19),
// mosaïste (20).
//
// ⭐ DES FAITS RÉELS, et leurs sources :
//   · ex. 17 — 12 mois : avril, juin, septembre et novembre ont 30 jours,
//     7 mois ont 31 jours, février 28 ou 29 (calendrier grégorien).
//   · ex. 18 — un match de football : deux mi-temps égales de 45 minutes
//     (Lois du jeu de l'IFAB, loi 7 « Durée du match »).
//   · ex. 19 — 8 planètes depuis la définition de l'UAI (Prague, 24/08/2006) ;
//     les 4 plus proches du Soleil, Mercure, Vénus, Terre, Mars, sont
//     telluriques, rocheuses (Larousse, « planète » ; Vikidia, « Planète »).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : ceux de la feuille de CM2 (`dessins-fractions-cm2.tsx` :
// barres empilées, rectangle partagé en lignes × colonnes, grille de 100, les
// deux barres de comparaison du coach, droite graduée, carreaux en couleurs,
// billes rangées), plus une aide locale `decoupes` (barres en parts inégales,
// reprise de la 6e). 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement`.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm1-fraction.mjs`.
//
// Micro-compétences : fraction_lire (1, 2, 17, 19), fraction_representer (3, 4,
// 19, 20), fraction_unite (5, 14, 18), fraction_superieure_1 (6, 12, 13, 16),
// fraction_droite (7, 13, 16), fraction_comparer (11, 12, 15, 17, 18),
// fraction_equivalente (4, 9, 10, 17, 18, 19, 20), fraction_decimale (8, 10,
// 15, 16, 19, 20), fraction_defi (14, 15, 17, 18, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU } from "@/lib/fiches-exercices/figures";
import { barres, carreaux, cent, comparer, droiteRel, ecranSeulement, jetons, rect } from "@/lib/fiches-exercices/dessins-fractions-cm2";

const NOIR = "#0f172a";
const VIDE = "#f1f5f9";

/**
 * Des barres de même longueur coupées en morceaux de largeurs `largeurs`
 * (relatives) : les `colorie` premiers morceaux en bleu. Sert à montrer
 * qu'une barre coupée en parts INÉGALES ne dit aucune fraction (reprise de
 * `maths-6e-fraction-nombre.tsx`).
 */
const decoupes = (liste: { label: string; largeurs: number[]; colorie: number }[]) => {
  const [x0, L, h, pas] = [40, 240, 26, 38];
  const H = liste.length * pas + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Barres découpées">
        {liste.map((b, i) => {
          const y = 6 + i * pas;
          const total = b.largeurs.reduce((s, w) => s + w, 0);
          const debut = (k: number) => b.largeurs.slice(0, k).reduce((s, w) => s + w, 0);
          return (
            <g key={i}>
              <text x={x0 - 10} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.label}
              </text>
              {b.largeurs.map((w, k) => (
                <rect key={k} x={x0 + (debut(k) * L) / total} y={y} width={(w * L) / total} height={h} fill={k < b.colorie ? BLEU : VIDE} stroke={NOIR} strokeWidth={1.4} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesFractionCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "fraction",
  titre: "Les fractions",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une fraction, la dessiner, comprendre l'unité. Reconnaître une fraction plus grande que 1, la placer sur la droite. Comparer deux fractions. Trouver des fractions égales en regroupant les parts. Passer d'une fraction à un nombre à virgule, puis dire « pour cent ». Une recette de crêpes, des feutres, un saut sans élan, un calendrier, un match de football, les planètes et une mosaïque. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé et les parts dessinées.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte d'abord toutes les parts : c'est le nombre du bas.",
      rappel: [
        "Une fraction, ce sont des parts d'un tout coupé en parts ÉGALES.",
        "En haut, le numérateur : les parts prises. En bas, le dénominateur : toutes les parts du partage.",
        "L'unité entière, ce sont toutes les parts : $\\dfrac{4}{4} = 1$.",
        "Une fraction décimale a 10, 100 ou 1 000 en bas : $\\dfrac{7}{10}$ se lit « sept dixièmes ».",
      ],
      exercices: [
        {
          enonce: "Quelle fraction de chaque barre est coloriée en bleu ?\nÉcris-la en chiffres, puis en lettres.",
          figure: barres([
            { d: 5, label: "A", parts: [2] },
            { d: 3, label: "B", parts: [1] },
            { d: 8, label: "C", parts: [3] },
          ]),
          correction:
            "Je compte d'abord TOUTES les parts : c'est le nombre du bas, le dénominateur.\nPuis je compte les parts bleues : c'est le nombre du haut, le numérateur.\nBarre A : 5 parts, 2 bleues. $\\dfrac{2}{5}$ : deux cinquièmes.\nBarre B : 3 parts, 1 bleue. $\\dfrac{1}{3}$ : un tiers.\nBarre C : 8 parts, 3 bleues. $\\dfrac{3}{8}$ : trois huitièmes.\n⛔ Le piège : mettre en bas les parts BLANCHES. Pour A, on écrirait $\\dfrac{2}{3}$. En bas, je mets toutes les parts.\nRéponse : A : $\\dfrac{2}{5}$ ; B : $\\dfrac{1}{3}$ ; C : $\\dfrac{3}{8}$.",
          micros: ["fraction_lire"],
        },
        {
          enonce: "Léo lit la recette des crêpes de sa mamie.\na) « un demi-litre de lait » : écris « un demi » en chiffres.\nb) « trois quarts d'un sachet de sucre » : écris la fraction en chiffres.\nc) « deux tiers d'un verre d'eau » : écris la fraction en chiffres.\nd) Écris en lettres : $\\dfrac{5}{6}$.",
          correction:
            "Le mot qui nomme les parts donne le nombre du BAS. Le nombre de parts prises va en HAUT.\na) « un demi » : 1 part sur 2. $\\dfrac{1}{2}$.\nb) « trois quarts » : des quarts, donc 4 en bas ; trois, donc 3 en haut. $\\dfrac{3}{4}$.\nc) « deux tiers » : des tiers, donc 3 en bas ; deux, donc 2 en haut. $\\dfrac{2}{3}$.\nd) $\\dfrac{5}{6}$ : 6 en bas, ce sont des sixièmes. Je lis « cinq sixièmes ».\n⛔ Le piège : dire « trois quatrièmes ». On dit un demi, un tiers, un quart, puis cinquième, sixième…\nRéponse : a) $\\dfrac{1}{2}$ ; b) $\\dfrac{3}{4}$ ; c) $\\dfrac{2}{3}$ ; d) cinq sixièmes.",
          schema: ecranSeulement(
            barres([
              { d: 2, label: "1/2", parts: [1] },
              { d: 4, label: "3/4", parts: [3] },
              { d: 3, label: "2/3", parts: [2] },
            ]),
          ),
          micros: ["fraction_lire"],
        },
        {
          enonce: "Maëlle colorie un rectangle partagé en cases égales.\na) Combien y a-t-il de cases en tout ?\nb) Quelle fraction du rectangle est coloriée ?\nc) Elle veut colorier $\\dfrac{5}{8}$ du rectangle. Combien de cases doit-elle colorier en plus ?\nd) Au b), quelle fraction du rectangle reste blanche ?",
          figure: rect(2, 4, 3),
          correction:
            "a) 2 lignes de 4 cases : 2 × 4 = 8 cases.\nb) Je compte 3 cases coloriées sur 8 : $\\dfrac{3}{8}$.\nc) Pour $\\dfrac{5}{8}$, il faut 5 cases coloriées. Elle en a déjà 3. Il manque 5 − 3 = 2 cases.\nd) 8 − 3 = 5 cases blanches : $\\dfrac{5}{8}$.\n⛔ Le piège : écrire $\\dfrac{3}{5}$, les cases coloriées sur les cases blanches. En bas, je mets TOUTES les cases.\nRéponse : a) 8 cases ; b) $\\dfrac{3}{8}$ ; c) 2 cases ; d) $\\dfrac{5}{8}$.",
          micros: ["fraction_representer"],
        },
        {
          enonce: "Sur quelles barres la partie bleue représente-t-elle $\\dfrac{1}{3}$ de la barre ?",
          figure: decoupes([
            { label: "A", largeurs: [1, 1, 1], colorie: 1 },
            { label: "B", largeurs: [1, 3, 2], colorie: 1 },
            { label: "C", largeurs: [1, 1, 1, 1], colorie: 1 },
            { label: "D", largeurs: [1, 1, 1, 1, 1, 1], colorie: 2 },
          ]),
          correction:
            "Pour lire $\\dfrac{1}{3}$, il faut 3 parts ÉGALES, dont 1 bleue.\nA : 3 parts égales, 1 bleue. Oui, c'est $\\dfrac{1}{3}$.\nB : 3 parts, mais elles ne sont pas égales. La part bleue est trop petite. Non.\nC : 4 parts égales, 1 bleue. C'est $\\dfrac{1}{4}$. Non.\nD : 6 parts égales, 2 bleues : $\\dfrac{2}{6}$. Je regroupe les parts deux par deux : 3 paquets, dont 1 bleu. $\\dfrac{2}{6} = \\dfrac{1}{3}$. Oui.\n⛔ Le piège : dire oui pour B parce qu'il y a 3 parts. Sans parts égales, pas de fraction.\nRéponse : les barres A et D.",
          micros: ["fraction_representer", "fraction_equivalente"],
        },
        {
          enonce: "Hugo a une barre de céréales coupée en 5 parts égales. Il en mange 2 au goûter.\na) Quelle fraction de la barre a-t-il mangée ?\nb) Quelle fraction de la barre reste ?\nc) Combien de cinquièmes faut-il pour faire la barre entière ?",
          correction:
            "La barre entière, c'est l'unité : elle est coupée en 5 parts égales.\na) Il mange 2 parts sur 5 : $\\dfrac{2}{5}$.\nb) 5 − 2 = 3 parts restent : $\\dfrac{3}{5}$.\nc) La barre entière, ce sont ses 5 parts : $\\dfrac{5}{5} = 1$.\n⭐ Je vérifie : 2 cinquièmes et 3 cinquièmes font 5 cinquièmes, la barre entière.\n⛔ Le piège : croire que l'unité, c'est une seule part. L'unité, c'est TOUTE la barre.\nRéponse : a) $\\dfrac{2}{5}$ ; b) $\\dfrac{3}{5}$ ; c) 5 cinquièmes : $\\dfrac{5}{5} = 1$.",
          schema: ecranSeulement(barres([{ d: 5, label: "la barre", parts: [2, 3] }])),
          micros: ["fraction_unite"],
        },
        {
          enonce: "Sur le dessin, chaque barre fait deux unités, séparées par un trait rouge.\nPour chaque fraction, dis si elle est plus petite que 1, égale à 1 ou plus grande que 1.\na) $\\dfrac{3}{4}$\nb) $\\dfrac{4}{4}$\nc) $\\dfrac{7}{4}$\nd) $\\dfrac{9}{5}$\ne) $\\dfrac{2}{5}$",
          figure: barres([
            { d: 4, label: "3/4", parts: [3], fois: 2 },
            { d: 4, label: "4/4", parts: [4], fois: 2 },
            { d: 4, label: "7/4", parts: [7], fois: 2 },
          ]),
          correction:
            "Une unité, ce sont 4 quarts : $\\dfrac{4}{4} = 1$. Je compare le haut et le bas.\na) 3 < 4 : $\\dfrac{3}{4}$ est plus petite que 1. Il manque 1 quart.\nb) 4 = 4 : $\\dfrac{4}{4} = 1$. La barre bleue s'arrête pile sur le trait rouge.\nc) 7 > 4 : $\\dfrac{7}{4}$ est plus grande que 1. La barre bleue dépasse le trait rouge.\nd) 9 > 5 : $\\dfrac{9}{5}$ est plus grande que 1.\ne) 2 < 5 : $\\dfrac{2}{5}$ est plus petite que 1.\n⛔ Le piège : croire qu'une fraction est toujours plus petite que 1. Dès que le haut dépasse le bas, elle dépasse 1.\nRéponse : a) plus petite ; b) égale à 1 ; c) plus grande ; d) plus grande ; e) plus petite.",
          micros: ["fraction_superieure_1"],
        },
        {
          enonce: "La droite est graduée de 0 à 1.\na) En combien de parts égales l'unité est-elle partagée ?\nb) Écris l'abscisse des points A, B et C avec une fraction.\nc) Lequel est au milieu, entre 0 et 1 ?",
          figure: droiteRel(0, 1, 1 / 6, [
            { value: 1 / 6, label: "A" },
            { value: 3 / 6, label: "B" },
            { value: 5 / 6, label: "C" },
          ], { nombres: 1 }),
          correction:
            "a) Entre 0 et 1, je compte les SAUTS d'une graduation à l'autre : 6 sauts. Chaque saut vaut $\\dfrac{1}{6}$.\nb) A est à 1 saut de 0 : $\\dfrac{1}{6}$.\nB est à 3 sauts de 0 : $\\dfrac{3}{6}$.\nC est à 5 sauts de 0 : $\\dfrac{5}{6}$.\nc) B : 3 sauts sur 6, c'est la moitié. $\\dfrac{3}{6} = \\dfrac{1}{2}$.\n⛔ Le piège : compter les TRAITS, 0 compris. Pour B, on trouverait 4. Je compte les sauts.\nRéponse : a) 6 parts ; b) A : $\\dfrac{1}{6}$ ; B : $\\dfrac{3}{6}$ ; C : $\\dfrac{5}{6}$ ; c) le point B.",
          micros: ["fraction_droite"],
        },
        {
          enonce: "a) Lesquelles sont des fractions décimales : $\\dfrac{3}{10}$ ; $\\dfrac{2}{5}$ ; $\\dfrac{45}{100}$ ; $\\dfrac{7}{8}$ ?\nb) Sur la grille de 100 cases, combien de cases sont coloriées ? Écris la fraction.\nc) Combien de lignes de 10 cases sont coloriées ? Écris la fraction en dixièmes.",
          figure: cent(40),
          correction:
            "a) En bas, il faut 10, 100 ou 1 000. $\\dfrac{3}{10}$ et $\\dfrac{45}{100}$ sont décimales. $\\dfrac{2}{5}$ et $\\dfrac{7}{8}$ ne le sont pas.\nb) Je compte 40 cases sur 100 : $\\dfrac{40}{100}$, quarante centièmes.\nc) 4 lignes coloriées sur 10 lignes : $\\dfrac{4}{10}$, quatre dixièmes. Donc $\\dfrac{40}{100} = \\dfrac{4}{10}$.\n⭐ Avec une virgule, 4 dixièmes s'écrit 0,4. Et « 40 sur 100 » se dit aussi « 40 pour cent » : 40 %.\n⛔ Le piège : croire que $\\dfrac{2}{5}$ est décimale parce qu'elle est petite. Je regarde seulement le nombre du bas.\nRéponse : a) $\\dfrac{3}{10}$ et $\\dfrac{45}{100}$ ; b) 40 cases, $\\dfrac{40}{100}$ ; c) 4 lignes, $\\dfrac{4}{10}$.",
          micros: ["fraction_decimale"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine les parts au brouillon avant de répondre.",
      rappel: [
        "Deux fractions sont égales quand elles colorient la même part du tout : $\\dfrac{2}{4} = \\dfrac{1}{2}$.",
        "Simplifier, c'est regrouper les parts en paquets égaux : je divise le haut ET le bas par le même nombre.",
        "Même dénominateur : le plus grand numérateur gagne. Même numérateur : plus je coupe, plus les parts sont PETITES.",
        "Dix dixièmes font une unité : $\\dfrac{13}{10} = 1{,}3$.",
      ],
      exercices: [
        {
          enonce: "Lucas et Maya ont deux tablettes de chocolat de même taille.\nLa tablette de Lucas a 4 barres : il en mange 3.\nLa tablette de Maya a 8 barres : elle en mange 6.\na) Écris la fraction de tablette mangée par chacun.\nb) Sur la tablette de Maya, regroupe les barres deux par deux. Combien de paquets en tout ? Combien de paquets mangés ?\nc) Qui a mangé le plus de chocolat ?",
          figure: barres([
            { d: 4, label: "Lucas", parts: [3] },
            { d: 8, label: "Maya", parts: [6] },
          ]),
          correction:
            "a) Lucas : 3 barres sur 4, $\\dfrac{3}{4}$. Maya : 6 barres sur 8, $\\dfrac{6}{8}$.\nb) 8 barres regroupées deux par deux : 8 ÷ 2 = 4 paquets. 6 barres mangées : 6 ÷ 2 = 3 paquets mangés. Donc $\\dfrac{6}{8} = \\dfrac{3}{4}$.\nc) Les deux parties bleues ont la même longueur : ils ont mangé autant !\n⭐ Simplifier, c'est cela : je divise le haut ET le bas par le même nombre. $\\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}$.\n⛔ Le piège : dire que Maya a mangé plus « parce que 6 > 3 ». Ses barres sont deux fois plus petites.\nRéponse : a) $\\dfrac{3}{4}$ et $\\dfrac{6}{8}$ ; b) 4 paquets, 3 mangés ; c) autant : $\\dfrac{6}{8} = \\dfrac{3}{4}$.",
          micros: ["fraction_equivalente"],
        },
        {
          enonce: "Complète.\na) $\\dfrac{1}{2} = \\dfrac{\\ldots}{4}$\nb) $\\dfrac{1}{2} = \\dfrac{\\ldots}{10}$\nc) $\\dfrac{5}{10}$ s'écrit avec une virgule : …\nd) $\\dfrac{1}{2} = \\dfrac{\\ldots}{100}$, c'est-à-dire … %",
          correction:
            "La moitié, c'est 1 part sur 2. Je coupe chaque moitié en parts plus petites.\na) Je coupe chaque moitié en 2. J'ai 2 parts sur 4. $\\dfrac{1}{2} = \\dfrac{2}{4}$.\nb) Je coupe chaque moitié en 5. J'ai 5 parts sur 10. $\\dfrac{1}{2} = \\dfrac{5}{10}$.\nc) 5 dixièmes : $\\dfrac{5}{10} = 0{,}5$.\nd) La moitié de 100, c'est 50. $\\dfrac{1}{2} = \\dfrac{50}{100}$ : c'est 50 %.\n⭐ Le haut et le bas sont multipliés par le même nombre : 1 × 5 = 5 et 2 × 5 = 10.\n⛔ Le piège : écrire $\\dfrac{1}{2} = 1{,}2$. La barre de fraction n'est pas une virgule. $\\dfrac{1}{2}$, c'est la moitié : 0,5.\nRéponse : a) 2 ; b) 5 ; c) 0,5 ; d) 50, c'est-à-dire 50 %.",
          schema: ecranSeulement(
            barres([
              { d: 2, label: "1/2", parts: [1] },
              { d: 4, label: "2/4", parts: [2] },
              { d: 10, label: "5/10", parts: [5] },
            ]),
          ),
          micros: ["fraction_equivalente", "fraction_decimale"],
        },
        {
          enonce: "Compare avec $<$, $>$ ou $=$.\na) $\\dfrac{2}{5}$ et $\\dfrac{4}{5}$\nb) $\\dfrac{1}{6}$ et $\\dfrac{1}{3}$\nc) $\\dfrac{3}{8}$ et $\\dfrac{3}{4}$\nd) $\\dfrac{7}{10}$ et $\\dfrac{5}{10}$",
          correction:
            "a) Même dénominateur : des cinquièmes de même taille. 2 < 4, donc $\\dfrac{2}{5} < \\dfrac{4}{5}$.\nb) Même numérateur : 1 part de chaque côté. Un sixième est plus PETIT qu'un tiers. $\\dfrac{1}{6} < \\dfrac{1}{3}$.\nc) 3 parts de chaque côté. Un huitième est plus petit qu'un quart. $\\dfrac{3}{8} < \\dfrac{3}{4}$.\nd) Des dixièmes, et 7 > 5. $\\dfrac{7}{10} > \\dfrac{5}{10}$.\n⛔ Le piège du b) : croire que $\\dfrac{1}{6}$ est plus grand « parce que 6 > 3 ». Plus je coupe, plus les parts sont PETITES. Les deux barres le montrent.\nRéponse : a) $<$ ; b) $<$ ; c) $<$ ; d) $>$.",
          schema: comparer([1, 6], [1, 3]),
          micros: ["fraction_comparer"],
        },
        {
          enonce: "a) Range ces fractions de la plus petite à la plus grande : $\\dfrac{5}{6}$ ; $\\dfrac{1}{6}$ ; $\\dfrac{8}{6}$ ; $\\dfrac{6}{6}$ ; $\\dfrac{3}{6}$.\nb) Lesquelles sont plus grandes que 1 ?\nc) Laquelle vaut la moitié de l'unité ?",
          correction:
            "Elles ont toutes le même dénominateur : des sixièmes. Je range les numérateurs : 1 < 3 < 5 < 6 < 8.\na) $\\dfrac{1}{6} < \\dfrac{3}{6} < \\dfrac{5}{6} < \\dfrac{6}{6} < \\dfrac{8}{6}$.\nb) $\\dfrac{6}{6} = 1$ : elle n'est pas plus grande que 1, elle est égale. Seule $\\dfrac{8}{6}$ est plus grande que 1, car 8 > 6.\nc) La moitié de 6, c'est 3 : $\\dfrac{3}{6} = \\dfrac{1}{2}$.\n⛔ Le piège : ranger $\\dfrac{6}{6}$ au hasard. Six sixièmes, c'est une unité entière : 1.\nRéponse : a) $\\dfrac{1}{6} < \\dfrac{3}{6} < \\dfrac{5}{6} < \\dfrac{6}{6} < \\dfrac{8}{6}$ ; b) $\\dfrac{8}{6}$ seulement ; c) $\\dfrac{3}{6}$.",
          schema: ecranSeulement(
            droiteRel(0, 2, 1 / 6, [
              { value: 1 / 6, label: "1/6" },
              { value: 3 / 6, label: "3/6" },
              { value: 5 / 6, label: "5/6" },
              { value: 6 / 6, label: "6/6" },
              { value: 8 / 6, label: "8/6" },
            ], { nombres: 1 }),
          ),
          micros: ["fraction_comparer", "fraction_superieure_1"],
        },
        {
          enonce: "Sacha fait du vélo sur une piste de 2 km. Une borne est posée tous les quarts de kilomètre.\na) Place sur la droite le point A à $\\dfrac{3}{4}$ km, le point B à $\\dfrac{5}{4}$ km et le point C à $\\dfrac{8}{4}$ km.\nb) Lequel tombe sur un nombre entier ?\nc) Complète : $\\dfrac{5}{4} = 1 + \\dfrac{\\ldots}{4}$.",
          figure: droiteRel(0, 2, 0.25, [], { nombres: 1 }),
          correction:
            "Entre 0 et 1, il y a 4 sauts égaux : chaque saut vaut $\\dfrac{1}{4}$.\na) A : 3 sauts depuis 0. B : 5 sauts, soit 1 saut après 1. C : 8 sauts.\nb) 4 sauts font 1, et 8 sauts font 2. C tombe sur 2 : $\\dfrac{8}{4} = 2$.\nc) 5 quarts, c'est 4 quarts et 1 quart : $\\dfrac{5}{4} = 1 + \\dfrac{1}{4}$.\n⛔ Le piège : placer $\\dfrac{5}{4}$ avant 1, comme si c'étaient des cinquièmes. Je compte des quarts, et je continue après 1.\nRéponse : b) le point C, sur 2 ; c) 1.",
          schema: ecranSeulement(
            droiteRel(0, 2, 0.25, [
              { value: 0.75, label: "A" },
              { value: 1.25, label: "B" },
              { value: 2, label: "C" },
            ], { nombres: 1 }),
          ),
          micros: ["fraction_droite", "fraction_superieure_1"],
        },
        {
          enonce: "Kenza a 12 billes dans un sac. Elle les range en 4 rangées égales. $\\dfrac{1}{4}$ des billes sont rouges.\na) Combien de billes y a-t-il dans une rangée ?\nb) Combien de billes sont rouges ?\nc) Combien de billes font $\\dfrac{3}{4}$ des 12 billes ?\nd) Zoé mange la moitié d'une petite pizza. Tom mange la moitié d'une grande pizza. Ont-ils mangé autant ? Réponds par oui ou non.",
          figure: jetons(4, 3, []),
          correction:
            "L'unité, c'est le sac entier : 12 billes.\na) 4 rangées égales : 12 ÷ 4 = 3 billes par rangée. Une rangée, c'est $\\dfrac{1}{4}$ des billes.\nb) $\\dfrac{1}{4}$ des billes, c'est une rangée : 3 billes rouges.\nc) $\\dfrac{3}{4}$, ce sont 3 rangées : 3 × 3 = 9 billes.\n⭐ Je vérifie : 3 + 9 = 12, tout le sac.\nd) Non. La moitié d'une grande pizza est plus grosse que la moitié d'une petite. Une fraction dépend de l'unité.\n⛔ Le piège du b) : répondre 4, le nombre du bas. Le 4 dit en combien de parts je partage, pas combien il y a de billes rouges.\nRéponse : a) 3 ; b) 3 billes ; c) 9 billes ; d) non.",
          micros: ["fraction_unite", "fraction_defi"],
        },
        {
          enonce: "Trois élèves se trompent. Pour chacun, écris la bonne réponse.\na) Léna : « $\\dfrac{3}{4} = 3{,}4$. » Est-ce que $\\dfrac{3}{4}$ est plus petit ou plus grand que 1 ? Et 3,4 ?\nb) Sam : « $\\dfrac{1}{8}$ est plus grand que $\\dfrac{1}{4}$, car 8 > 4. » Compare avec $<$ ou $>$.\nc) Noé : « $\\dfrac{4}{100} = 0{,}4$. » Écris $\\dfrac{4}{100}$ avec une virgule.",
          correction:
            "a) 3 < 4 : $\\dfrac{3}{4}$ est plus petit que 1. Mais 3,4, c'est 3 unités et 4 dixièmes : plus grand que 1. Donc $\\dfrac{3}{4}$ n'est pas 3,4.\n⭐ Sur une grille de 100, trois quarts, ce sont 75 cases : $\\dfrac{3}{4} = \\dfrac{75}{100} = 0{,}75$.\nb) Couper en 8 fait des parts plus PETITES que couper en 4. Donc $\\dfrac{1}{8} < \\dfrac{1}{4}$.\nc) 4 centièmes : le 4 va au rang des centièmes. $\\dfrac{4}{100} = 0{,}04$. Et 0,4, ce sont 4 dixièmes : $\\dfrac{4}{10}$.\n⛔ Le piège de Léna : lire la barre de fraction comme une virgule.\n⛔ Le piège de Sam : un grand nombre en bas fait de PETITES parts.\nRéponse : a) $\\dfrac{3}{4}$ est plus petit que 1, et 3,4 plus grand ; b) $\\dfrac{1}{8} < \\dfrac{1}{4}$ ; c) 0,04.",
          schema: ecranSeulement(comparer([1, 8], [1, 4])),
          micros: ["fraction_decimale", "fraction_comparer", "fraction_defi"],
        },
        {
          enonce: "Au saut sans élan, Anaïs saute $\\dfrac{13}{10}$ m. Bilal saute 1,6 m.\na) Écris $\\dfrac{13}{10}$ avec une virgule.\nb) Écris 1,6 en dixièmes, avec une fraction.\nc) Qui a sauté le plus loin ?\nd) Place le point A (Anaïs) et le point B (Bilal) sur la droite.",
          figure: droiteRel(0, 2, 0.1, [], { nombres: 0.5 }),
          correction:
            "Dix dixièmes font une unité : $\\dfrac{10}{10} = 1$.\na) 13 dixièmes, c'est 10 dixièmes et 3 dixièmes : 1 unité et 3 dixièmes. $\\dfrac{13}{10} = 1{,}3$.\nb) 1,6, c'est 1 unité (10 dixièmes) et 6 dixièmes : 16 dixièmes. $1{,}6 = \\dfrac{16}{10}$.\nc) 16 dixièmes > 13 dixièmes : Bilal a sauté le plus loin.\nd) A est 3 graduations après 1. B est 6 graduations après 1.\n⛔ Le piège du a) : écrire 13,10 ou 0,13. $\\dfrac{13}{10}$, ce sont 13 dixièmes : plus que 1.\nRéponse : a) 1,3 m ; b) $\\dfrac{16}{10}$ ; c) Bilal ; d) A à 1,3 et B à 1,6.",
          schema: ecranSeulement(
            droiteRel(0, 2, 0.1, [
              { value: 1.3, label: "A" },
              { value: 1.6, label: "B" },
            ], { nombres: 0.5 }),
          ),
          micros: ["fraction_decimale", "fraction_droite", "fraction_superieure_1"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je cherche d'abord le tout, puis j'écris la fraction.",
      rappel: [
        "Une part d'un groupe s'écrit en fraction : « 4 mois sur 12 » s'écrit $\\dfrac{4}{12}$. En bas, TOUT le groupe.",
        "Pour simplifier, je regroupe en paquets égaux : $\\dfrac{4}{12} = \\dfrac{1}{3}$, car 12 ÷ 4 = 3.",
        "« Sur 100 » se dit aussi « pour cent » : $\\dfrac{30}{100}$, c'est 30 %.",
      ],
      exercices: [
        {
          titre: "Le calendrier de l'imprimeuse",
          enonce: "Jade est imprimeuse. Elle fabrique des calendriers.\nUne année a 12 mois. 4 mois ont 30 jours, 7 mois ont 31 jours. Février a 28 ou 29 jours.\na) Quelle fraction des mois a 30 jours ?\nb) Sur le dessin, les mois sont rangés en paquets de 4. Écris la fraction du a) plus simplement.\nc) Quelle fraction des mois a 31 jours ? Est-ce plus ou moins que la moitié des mois ?\nd) Quelle fraction des mois est février ?",
          figure: carreaux(3, 4, [
            { n: 4, nom: "30 j" },
            { n: 7, nom: "31 j" },
          ], "fév."),
          correction:
            "Le tout, ce sont les 12 mois de l'année.\na) 4 mois sur 12 : $\\dfrac{4}{12}$.\nb) Je range les 12 mois en paquets de 4. 12 ÷ 4 = 3 paquets. Les mois de 30 jours font 1 paquet. $\\dfrac{4}{12} = \\dfrac{1}{3}$ : une rangée sur trois.\nc) 7 mois sur 12 : $\\dfrac{7}{12}$. La moitié de 12, c'est 6. Or 7 > 6 : c'est plus que la moitié.\nd) Février est 1 mois sur 12 : $\\dfrac{1}{12}$.\n⭐ Je vérifie : 4 + 7 + 1 = 12 mois.\n⛔ Le piège du b) : ENLEVER le même nombre en haut et en bas, par exemple 3, et trouver $\\dfrac{1}{9}$. Je regroupe en paquets égaux : je DIVISE le haut et le bas.\nRéponse : a) $\\dfrac{4}{12}$ ; b) $\\dfrac{1}{3}$ ; c) $\\dfrac{7}{12}$, plus que la moitié ; d) $\\dfrac{1}{12}$.",
          micros: ["fraction_lire", "fraction_equivalente", "fraction_comparer", "fraction_defi"],
        },
        {
          titre: "L'arbitre du match",
          enonce: "Aïcha est arbitre de football. Un match dure 90 minutes : deux mi-temps de 45 minutes.\na) Quelle fraction du match dure une mi-temps ?\nb) Après 30 minutes de jeu, quelle fraction du match est jouée ? Coupe les 90 minutes en paquets de 30.\nc) Et après 60 minutes ?\nd) Après 60 minutes, a-t-on joué plus ou moins de la moitié du match ?",
          correction:
            "Le tout, c'est le match entier : 90 minutes.\na) Deux mi-temps égales : une mi-temps, c'est $\\dfrac{1}{2}$ du match.\nb) 90 ÷ 30 = 3 paquets de 30 minutes. Après 30 minutes, 1 paquet sur 3 : $\\dfrac{1}{3}$ du match.\nc) Après 60 minutes, 2 paquets sur 3 : $\\dfrac{2}{3}$ du match.\nd) La moitié du match, c'est 45 minutes. Or 60 > 45 : plus de la moitié.\n⛔ Le piège du b) : écrire $\\dfrac{30}{60}$, le temps joué sur le temps qui reste. En bas, je mets TOUT le match : $\\dfrac{30}{90} = \\dfrac{1}{3}$.\nRéponse : a) $\\dfrac{1}{2}$ ; b) $\\dfrac{1}{3}$ ; c) $\\dfrac{2}{3}$ ; d) plus de la moitié.",
          schema: droiteRel(0, 90, 15, [
            { value: 30, label: "1/3" },
            { value: 45, label: "1/2" },
            { value: 60, label: "2/3" },
          ], { nombres: 15 }),
          micros: ["fraction_unite", "fraction_equivalente", "fraction_comparer", "fraction_defi"],
        },
        {
          titre: "Les planètes de l'astronome",
          enonce: "Inès est astronome. Elle explique : 8 planètes tournent autour du Soleil. Les 4 plus proches du Soleil sont rocheuses : Mercure, Vénus, la Terre et Mars. Les 4 autres sont des géantes.\na) Quelle fraction des planètes est rocheuse ?\nb) Simplifie cette fraction.\nc) La Terre est la 3e planète en partant du Soleil. Quelle fraction des planètes est plus proche du Soleil que la Terre ? Simplifie-la.\nd) Écris la fraction du b) en centièmes, puis en pour cent.",
          correction:
            "Le tout, ce sont les 8 planètes.\na) 4 planètes sur 8 : $\\dfrac{4}{8}$.\nb) 4, c'est la moitié de 8. Je regroupe en paquets de 4. J'ai 2 paquets, dont 1 rocheux. $\\dfrac{4}{8} = \\dfrac{1}{2}$.\nc) Avant la Terre, il y a Mercure et Vénus : 2 planètes sur 8, $\\dfrac{2}{8}$. En paquets de 2, j'ai 4 paquets, dont 1. $\\dfrac{2}{8} = \\dfrac{1}{4}$.\nd) La moitié de 100, c'est 50 : $\\dfrac{1}{2} = \\dfrac{50}{100}$, soit 50 %.\n⛔ Le piège du b) : croire que $\\dfrac{4}{8}$ est plus grand que $\\dfrac{1}{2}$ « parce que 4 et 8 sont plus grands ». Les deux fractions colorient la même part.\nRéponse : a) $\\dfrac{4}{8}$ ; b) $\\dfrac{1}{2}$ ; c) $\\dfrac{2}{8} = \\dfrac{1}{4}$ ; d) $\\dfrac{50}{100}$, soit 50 %.",
          schema: ecranSeulement(carreaux(2, 4, [{ n: 4, nom: "roche" }], "géante")),
          micros: ["fraction_lire", "fraction_representer", "fraction_equivalente", "fraction_decimale", "fraction_defi"],
        },
        {
          titre: "La mosaïque de Nora",
          enonce: "Nora est mosaïste. Elle pose une mosaïque carrée de 100 carreaux : 30 bleus, 50 orange et 20 verts.\na) Écris la fraction de chaque couleur en centièmes.\nb) Les carreaux bleus remplissent 3 lignes de 10. Écris leur fraction en dixièmes.\nc) Écris la fraction des carreaux bleus avec une virgule.\nd) Écris chaque couleur en pour cent.",
          figure: carreaux(10, 10, [
            { n: 30, nom: "bleu" },
            { n: 50, nom: "orange" },
            { n: 20, nom: "vert" },
          ]),
          correction:
            "La mosaïque entière, c'est l'unité : 100 carreaux.\na) Bleu : $\\dfrac{30}{100}$ ; orange : $\\dfrac{50}{100}$ ; vert : $\\dfrac{20}{100}$.\nb) 3 lignes sur 10 : $\\dfrac{3}{10}$. Donc $\\dfrac{30}{100} = \\dfrac{3}{10}$.\nc) 3 dixièmes : $\\dfrac{3}{10} = 0{,}3$.\nd) « Sur 100 » se dit « pour cent ». Bleu : 30 % ; orange : 50 % ; vert : 20 %.\n⭐ Je vérifie : 30 + 50 + 20 = 100. Tous les carreaux, c'est 100 %.\n⛔ Le piège du c) : écrire 0,03. Trois dixièmes, c'est le 3 juste après la virgule : 0,3.\nRéponse : a) $\\dfrac{30}{100}$, $\\dfrac{50}{100}$, $\\dfrac{20}{100}$ ; b) $\\dfrac{3}{10}$ ; c) 0,3 ; d) 30 %, 50 %, 20 %.",
          micros: ["fraction_representer", "fraction_equivalente", "fraction_decimale", "fraction_defi"],
        },
      ],
    },
  ],
};
