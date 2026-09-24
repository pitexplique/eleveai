// ─── Fiche d'exercices : fonctions affines (3e) — 20 exercices ─────────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-fonctions-affines.tsx` et
// sur les huit micros du coach de 3e (notionId affine_fonction). L'image et
// l'antécédent en général ont leur feuille (fonction_generalite) : ici, tout
// tourne autour de $ax + b$ — reconnaître, lire $a$ et $b$ (dans l'écriture,
// sur la droite, dans un tableau), trouver $a$ avec deux points,
// proportionnalité ↔ linéaire, et comparer deux offres (le classique du brevet).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le taxi à 4 € + 2 €/km,
// ni 2x + 4, 3x + 5, 2x + 3, 3x + 8, ni ses deux abonnements.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés, quinze sur un repère. La « marche d'escalier » — un pas vers la
// droite, $a$ vers le haut — est une ligne brisée `pts` de trois points, écrite
// en clair dans l'appel `repere(…)` : le script la RELIT et vérifie qu'elle
// part de la droite, qu'elle est horizontale puis verticale, et qu'elle
// retombe sur la droite (4, 7, 9, 10, 13, 15, et 2 pour une pente négative).
// Deux droites qui se croisent pour chaque comparaison (12, 17, 18, et 15).
//
// Les pièges nommés : $a$ pris pour le premier nombre écrit (2), $b$ lu sur le
// mauvais axe (4, 5), le signe de $a$ oublié (10), la marche lue à l'envers
// (15), la fraction de deux points renversée (9), l'écart entre deux colonnes
// pris pour $a$ (7), « deux fois plus, deux fois plus cher » appliqué à une
// fonction affine (6, 11, 14), $a = 0$ déclaré impossible (16), $a$ calculé
// sans enlever $b$ (18, 20), le point de bascule compté comme gagnant (12).
//
// Le monde, et les nombres réels qu'il porte :
//   · atmosphère type OACI (météo, aviation) : 15 °C au niveau de la mer,
//     −6,5 °C par km ; mont Blanc 4 805 m (IGN), Everest 8 849 m (2020) (ex. 8) ;
//   · échelle Fahrenheit : 32 °F au gel, 212 °F à l'ébullition — sa définition ;
//     la règle des voyageurs « doubler et ajouter 30 » (ex. 18) ;
//   · niveau moyen des océans, altimétrie satellite NASA-CNES (Topex/Poseidon,
//     Jason, depuis 1993) : ≈ 3,3 mm/an sur 1993-2023, ≈ 10 cm en trente ans ;
//     OMM, État du climat mondial 2023 : ≈ 4,7 mm/an sur 2014-2023 (ex. 19) ;
//   · une citadine à essence : ≈ 6 L/100 km, réservoir de 50 L (ex. 11) ;
//   · un carburant à 1,80 € le litre : un prix rond, de l'ordre des prix
//     affichés en France en 2024-2025 (ex. 6) ;
//   · vélo électrique en libre-service : 1 € de déverrouillage puis quelques
//     dizaines de centimes la minute, l'ordre des tarifs des grandes villes
//     (ex. 14) ; escalade, location de voiture, taxi : tarifs INVENTÉS, dits
//     tels quels dans l'énoncé (12, 17, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fonctions-affines-3e.mjs`.
//
// Micro-compétences : affine_reconnaitre (1, 6, 11, 14, 15, 19),
// affine_coeff_directeur (1, 2, 4, 5, 7, 8, 9, 13, 18, 20), affine_ordonnee_origine
// (1, 2, 5, 8, 9, 14, 17), affine_calcul_image (3, 6, 8, 10, 11, 13, 14, 18,
// 19), affine_expression (4, 6, 7, 9, 10, 12, 15, 16, 17, 18, 20),
// affine_graphique (4, 5, 10, 12, 15, 17), affine_probleme (11, 12, 14, 17,
// 19, 20), affine_defi (13, 16, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

export const exercicesFonctionsAffines3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "affine-fonction",
  titre: "Fonctions affines",
  accroche:
    "Vingt exercices, du calcul seul au problème : reconnaître une fonction affine ou linéaire, lire le coefficient directeur et l'ordonnée à l'origine dans une formule, sur une droite ou dans un tableau, trouver la fonction avec deux points, et comparer deux offres comme au brevet. Le froid en altitude, le réservoir d'une voiture, un vélo en libre-service, les degrés Fahrenheit, la mer qui monte. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé, et la droite dessinée avec sa marche d'escalier.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/affine-fonction", titre: "Fonctions affines" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par question : trouver a, trouver b, ou calculer une image. Je me demande d'abord qui multiplie x et qui est seul.",
      rappel: [
        "Une fonction AFFINE s'écrit $f(x) = ax + b$. Sa représentation graphique est une droite.",
        "$a$ est le COEFFICIENT DIRECTEUR : quand $x$ augmente de $1$, $f(x)$ augmente de $a$ (ou diminue, si $a$ est négatif).",
        "$b$ est l'ORDONNÉE À L'ORIGINE : $b = f(0)$, et la droite coupe l'axe vertical en $b$.",
        "Quand $b = 0$, la fonction est LINÉAIRE : $f(x) = ax$. C'est une situation de proportionnalité, et la droite passe par l'origine.",
      ],
      exercices: [
        {
          enonce:
            "Voici cinq fonctions : $f(x) = -3x + 2$ ; $g(x) = 0{,}5x$ ; $h(x) = 6$ ; $k(x) = x^2 + 1$ ; $m(x) = \\dfrac{2}{x}$.\na) Lesquelles sont affines ? Donner alors $a$ et $b$.\nb) Laquelle est linéaire ?\nc) Calculer l'image de $0$ par $f$, $g$ et $h$. Que retrouve-t-on ?",
          correction:
            "Pour chaque fonction, je cherche si elle s'écrit « un nombre fois $x$, plus un nombre », c'est-à-dire $ax + b$.\na) $f(x) = -3x + 2$ : affine, avec $a = -3$ et $b = 2$.\n$g(x) = 0{,}5x$ : affine, avec $a = 0{,}5$ et $b = 0$.\n$h(x) = 6$ s'écrit $h(x) = 0x + 6$ : affine, avec $a = 0$ et $b = 6$. Sa droite est horizontale.\n$k(x) = x^2 + 1$ : non, $x$ y est multiplié par lui-même.\n$m(x) = \\dfrac{2}{x}$ : non, $x$ est au dénominateur. Les valeurs le montrent : $m(1) = 2$, $m(2) = 1$, $m(4) = 0{,}5$, les écarts ne sont pas réguliers.\nb) Linéaire, c'est affine avec $b = 0$ : seule $g$ est linéaire. Sa droite passe par l'origine.\nc) $f(0) = 2$, $g(0) = 0$, $h(0) = 6$ : je retrouve chaque fois $b$, l'ordonnée à l'origine.\nSur le schéma : $f$ en bleu, $g$ en orange, $h$ en vert.\n⛔ Le piège : écarter $h$ parce qu'on n'y voit pas de $x$. $h(x) = 0x + 6$ : un coefficient nul est permis, la fonction est affine (on dit aussi constante).\nRéponse : $f$, $g$ et $h$ sont affines ; seule $g$ est linéaire ; $k$ et $m$ ne sont pas affines.",
          schema: repere([-2, 3, -5, 9], [{ q: [0, -3, 2] }, { q: [0, 0.5, 0], couleur: ORANGE }, { q: [0, 0, 6], couleur: VERT }], [{ x: 0, y: 2 }, { x: 0, y: 0 }, { x: 0, y: 6 }]),
          micros: ["affine_reconnaitre", "affine_coeff_directeur", "affine_ordonnee_origine"],
        },
        {
          enonce:
            "Pour chaque fonction affine, donner le coefficient directeur $a$ et l'ordonnée à l'origine $b$.\na) $f(x) = 5 - 2x$\nb) $g(x) = x - 4$\nc) $h(x) = -x$\nd) $k(x) = 3(x + 2)$",
          correction:
            "Je remets chaque expression dans l'ordre $ax + b$ : $a$ est le nombre qui MULTIPLIE $x$, $b$ le nombre seul.\na) $f(x) = 5 - 2x = -2x + 5$ : $a = -2$ et $b = 5$.\nb) $g(x) = x - 4 = 1x - 4$ : $a = 1$ et $b = -4$.\nc) $h(x) = -x = -1x + 0$ : $a = -1$ et $b = 0$. $h$ est linéaire.\nd) Je développe d'abord : $k(x) = 3(x + 2) = 3x + 6$ : $a = 3$ et $b = 6$.\nJe contrôle chaque $b$ avec l'image de $0$ : $f(0) = 5$, $g(0) = -4$, $h(0) = 0$, $k(0) = 6$. ✓\nSur le schéma, la droite bleue de $f$ coupe l'axe vertical en $5$, et la marche verte montre $a = -2$ : un pas vers la droite, on DESCEND de $2$. La droite orange de $k$ coupe l'axe en $6$.\n⛔ Le piège au a) : dire $a = 5$ parce que $5$ est écrit en premier. $a$ n'est pas le premier nombre, c'est celui qui est collé au $x$.\n⛔ Autre piège au d) : lire $b = 2$ dans $3(x + 2)$. Le $3$ multiplie aussi le $2$.\nRéponse : $a = -2$ et $b = 5$ ; $a = 1$ et $b = -4$ ; $a = -1$ et $b = 0$ ; $a = 3$ et $b = 6$.",
          schema: repere([-3, 3, -5, 9], [{ q: [0, -2, 5] }, { q: [0, 3, 6], couleur: ORANGE }, { pts: [[0, 5], [1, 5], [1, 3]], couleur: VERT }], [{ x: 0, y: 5 }, { x: 1, y: 3 }, { x: 0, y: 6 }]),
          micros: ["affine_coeff_directeur", "affine_ordonnee_origine"],
        },
        {
          enonce: "Soit $f$ la fonction affine définie par $f(x) = 2{,}5x - 4$. Calculer :\na) $f(2)$\nb) $f(-2)$\nc) $f(0)$\nd) $f(1{,}2)$",
          correction:
            "Je remplace $x$ par le nombre, entre parenthèses s'il est négatif, et je fais la multiplication AVANT la soustraction.\na) $f(2) = 2{,}5 \\times 2 - 4 = 5 - 4 = 1$.\nb) $f(-2) = 2{,}5 \\times (-2) - 4 = -5 - 4 = -9$.\nc) $f(0) = 2{,}5 \\times 0 - 4 = -4$ : c'est $b$, l'ordonnée à l'origine.\nd) $f(1{,}2) = 2{,}5 \\times 1{,}2 - 4 = 3 - 4 = -1$.\nSur le schéma, les quatre points calculés sont alignés sur la droite de $f$.\n⛔ Le piège au b) : écrire $-5 - 4 = -1$. Je pars de $-5$ et je descends encore de $4$ : j'arrive à $-9$.\nRéponse : $f(2) = 1$ ; $f(-2) = -9$ ; $f(0) = -4$ ; $f(1{,}2) = -1$.",
          schema: repere([-3, 3, -11, 4], [{ q: [0, 2.5, -4] }], [{ x: 2, y: 1 }, { x: -2, y: -9 }, { x: 0, y: -4 }, { x: 1.2, y: -1 }]),
          micros: ["affine_calcul_image"],
        },
        {
          enonce:
            "La droite ci-dessous représente une fonction affine $f$.\na) Lire l'ordonnée à l'origine $b$.\nb) Partir du point de la droite situé sur l'axe vertical et avancer de $1$ vers la droite : de combien monte-t-on ? En déduire $a$.\nc) Donner l'expression de $f(x)$.\nd) Vérifier avec un autre point de la droite.",
          figure: repere([-2, 3, -4, 6], [{ q: [0, 3, -2] }]),
          correction:
            "a) La droite coupe l'axe VERTICAL au point $(0\\,;\\,-2)$ : $b = -2$.\nb) Je pars de $(0\\,;\\,-2)$, j'avance d'un carreau vers la droite, puis je remonte jusqu'à la droite : j'arrive en $(1\\,;\\,1)$. De $-2$ à $1$, je suis monté de $3$ : $a = 3$. C'est la marche orange du schéma.\nc) $f(x) = 3x - 2$.\nd) La droite passe par $(2\\,;\\,4)$, et $3 \\times 2 - 2 = 4$. ✓\n⛔ Le piège au a) : lire $b$ là où la droite coupe l'axe HORIZONTAL (vers $0{,}7$). L'ordonnée à l'origine se lit sur l'axe des ordonnées, le vertical.\nRéponse : $b = -2$ ; $a = 3$ ; $f(x) = 3x - 2$.",
          schema: repere([-2, 3, -4, 6], [{ q: [0, 3, -2] }, { pts: [[0, -2], [1, -2], [1, 1]], couleur: ORANGE }], [{ x: 0, y: -2, label: "b" }, { x: 1, y: 1 }, { x: 2, y: 4 }]),
          micros: ["affine_graphique", "affine_expression", "affine_coeff_directeur"],
        },
        {
          enonce:
            "Voici les droites de trois fonctions affines, une bleue, une orange et une verte :\n$u(x) = -x + 3$ ; $v(x) = 0{,}5x - 2$ ; $w(x) = 2x + 1$.\na) Donner l'ordonnée à l'origine de chacune.\nb) Associer chaque fonction à sa droite.\nc) Contrôler avec le signe de $a$ : quelle droite descend ?",
          figure: repere([-3, 4, -5, 7], [{ q: [0, 2, 1] }, { q: [0, -1, 3], couleur: ORANGE }, { q: [0, 0.5, -2], couleur: VERT }]),
          correction:
            "a) L'ordonnée à l'origine est le nombre seul : $b = 3$ pour $u$, $b = -2$ pour $v$, $b = 1$ pour $w$.\nb) Je lis où chaque droite coupe l'axe VERTICAL : la bleue en $1$, l'orange en $3$, la verte en $-2$. Donc $w$ est la bleue, $u$ l'orange, $v$ la verte.\nc) $u$ a pour coefficient $a = -1$, négatif : sa droite descend, c'est bien l'orange. $w$ ($a = 2$) monte plus vite que $v$ ($a = 0{,}5$) : la bleue est bien la plus raide.\n⛔ Le piège : regarder où la droite coupe l'axe HORIZONTAL. La verte le coupe en $4$ ; son ordonnée à l'origine est pourtant $-2$.\nRéponse : $u$ est l'orange, $v$ la verte, $w$ la bleue.",
          schema: repere([-3, 4, -5, 7], [{ q: [0, 2, 1] }, { q: [0, -1, 3], couleur: ORANGE }, { q: [0, 0.5, -2], couleur: VERT }], [{ x: 0, y: 1 }, { x: 0, y: 3 }, { x: 0, y: -2 }, { x: 4, y: 0 }]),
          micros: ["affine_graphique", "affine_ordonnee_origine", "affine_coeff_directeur"],
        },
        {
          enonce:
            "À la pompe, un carburant coûte $1{,}80$ € le litre. On note $p(x)$ le prix payé, en euros, pour $x$ litres.\na) Compléter le tableau.\nb) Le prix est-il proportionnel au volume ? Exprimer $p(x)$ en fonction de $x$.\nc) La fonction $p$ est-elle linéaire ? Que représente son coefficient ?\nd) Une autre station ajoute $2$ € de frais fixes à chaque passage : $q(x) = 1{,}8x + 2$. Calculer $q(10)$ et $q(20)$. Le prix double-t-il quand le volume double ?",
          figure: tableau(["Volume (L)", "10", "25", "40", "50"], ["Prix (€)", "…", "…", "…", "…"]),
          correction:
            "a) Chaque litre coûte $1{,}80$ € : je multiplie le volume par $1{,}8$. $1{,}8 \\times 10 = 18$ ; $1{,}8 \\times 25 = 45$ ; $1{,}8 \\times 40 = 72$ ; $1{,}8 \\times 50 = 90$.\nb) Oui : on passe toujours du volume au prix en multipliant par le même nombre, $1{,}8$. Donc $p(x) = 1{,}8x$.\nc) $p(x) = 1{,}8x$ est de la forme $ax$ : $p$ est linéaire. Son coefficient, $a = 1{,}8$, est le prix d'un litre. Proportionnalité et fonction linéaire, c'est la même chose.\nd) $q(10) = 1{,}8 \\times 10 + 2 = 20$ et $q(20) = 1{,}8 \\times 20 + 2 = 38$. Le volume double, mais $38 \\neq 2 \\times 20$ : les $2$ € fixes ne se paient qu'une fois. $q$ est affine, pas linéaire.\n⛔ Le piège au d) : croire que « deux fois plus de litres, deux fois plus cher » marche toujours. C'est vrai pour une fonction LINÉAIRE seulement ; dès que $b \\neq 0$, c'est faux.\nRéponse : $18$, $45$, $72$ et $90$ € ; $p(x) = 1{,}8x$, linéaire ; $q(10) = 20$ € et $q(20) = 38$ €, le prix ne double pas.",
          schema: tableau(["Volume (L)", "10", "25", "40", "50"], ["Prix (€)", 18, 45, 72, 90]),
          micros: ["affine_reconnaitre", "affine_expression", "affine_calcul_image"],
        },
        {
          enonce:
            "Le tableau donne des valeurs d'une fonction affine $f$.\na) Lire $b$ dans le tableau.\nb) Calculer le coefficient directeur $a$.\nc) Donner l'expression de $f(x)$, et vérifier avec la dernière colonne.\nd) $f$ est-elle linéaire ?",
          figure: tableau(["x", "0", "2", "5", "10"], ["f(x)", -1, 3, 9, 19]),
          correction:
            "a) $b$ est l'image de $0$ : sous $0$, je lis $-1$. Donc $b = -1$.\nb) De $x = 0$ à $x = 2$, $x$ augmente de $2$ et $f(x)$ de $3 - (-1) = 4$. Pour une augmentation de $1$, c'est deux fois moins : $a = \\dfrac{4}{2} = 2$.\nJe contrôle sur les autres colonnes : de $2$ à $5$, $\\dfrac{6}{3} = 2$ ; de $5$ à $10$, $\\dfrac{10}{5} = 2$. Toujours $2$ : la fonction est bien affine.\nc) $f(x) = 2x - 1$. Vérification : $2 \\times 10 - 1 = 19$. ✓\nd) Non : $b = -1$, pas $0$, et la droite ne passe pas par l'origine.\nSur le schéma, la marche orange part de $(2\\,;\\,3)$ : $2$ pas vers la droite, $4$ vers le haut.\n⛔ Le piège au b) : prendre $a = 4$, l'écart entre deux colonnes. Les $x$ n'avancent pas de $1$ en $1$ : je divise toujours l'écart des images par l'écart des $x$.\nRéponse : $b = -1$ ; $a = 2$ ; $f(x) = 2x - 1$ ; $f$ n'est pas linéaire.",
          schema: repere([-1, 6, -3, 11], [{ q: [0, 2, -1] }, { pts: [[2, 3], [4, 3], [4, 7]], couleur: ORANGE }], [{ x: 0, y: -1 }, { x: 2, y: 3 }, { x: 5, y: 9 }]),
          micros: ["affine_expression", "affine_coeff_directeur"],
        },
        {
          enonce:
            "Dans l'atmosphère type des météorologues et des pilotes, il fait $15$ °C au niveau de la mer, et la température baisse de $6{,}5$ °C par kilomètre d'altitude. La température (en °C) à $h$ km d'altitude est $T(h) = 15 - 6{,}5h$.\na) Donner $a$ et $b$. Que représentent-ils ?\nb) Calculer $T(2)$.\nc) Quelle température au sommet du mont Blanc, à $4{,}8$ km ?\nd) Et au sommet de l'Everest, à $8{,}8$ km ?",
          correction:
            "a) $T(h) = -6{,}5h + 15$ : $a = -6{,}5$ et $b = 15$. $b = T(0)$ est la température au niveau de la mer ; $a$ dit ce que change chaque kilomètre : $6{,}5$ °C de MOINS, d'où le signe moins.\nb) La multiplication d'abord : $T(2) = 15 - 6{,}5 \\times 2 = 15 - 13 = 2$. Il fait $2$ °C à $2$ km d'altitude.\nc) $T(4{,}8) = 15 - 6{,}5 \\times 4{,}8 = 15 - 31{,}2 = -16{,}2$. Environ $-16$ °C au mont Blanc.\nd) $T(8{,}8) = 15 - 6{,}5 \\times 8{,}8 = 15 - 57{,}2 = -42{,}2$. Environ $-42$ °C sur l'Everest.\n⛔ Le piège au b) : calculer de gauche à droite, $(15 - 6{,}5) \\times 2 = 17$. La multiplication passe avant la soustraction ; et à $2$ km, il fait forcément plus froid qu'en bas, pas plus chaud.\nRéponse : $a = -6{,}5$ et $b = 15$ ; $2$ °C ; $-16{,}2$ °C ; $-42{,}2$ °C.",
          schema: tableau(["Altitude (km)", "0", "2", "4,8", "8,8"], ["T (°C)", 15, 2, -16.2, -42.2]),
          micros: ["affine_calcul_image", "affine_coeff_directeur", "affine_ordonnee_origine"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions, comme au brevet. Je justifie chaque résultat par un calcul ou une lecture, et je vérifie avec un point.",
      rappel: [
        "Avec deux points : $a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$, l'écart des images divisé par l'écart des nombres de départ, dans le même ordre en haut et en bas.",
        "Puis $b$ : je remplace $x$ et $f(x)$ par les coordonnées d'un des points dans $f(x) = ax + b$.",
        "Sur un graphique : $b$ se lit sur l'axe vertical. Pour $a$, je pars d'un point de la droite, j'avance vers la droite, et je compte de combien je monte ou je descends : c'est la « marche d'escalier ».",
      ],
      exercices: [
        {
          enonce:
            "$f$ est une fonction affine telle que $f(1) = -1$ et $f(4) = 8$.\na) Calculer le coefficient directeur $a$.\nb) Calculer l'ordonnée à l'origine $b$.\nc) Calculer $f(10)$.\nd) Le point $M(-2\\,;\\,-10)$ est-il sur la droite de $f$ ?",
          correction:
            "a) Je divise l'écart des images par l'écart des nombres de départ, dans le MÊME ordre en haut et en bas : $a = \\dfrac{f(4) - f(1)}{4 - 1} = \\dfrac{8 - (-1)}{4 - 1} = \\dfrac{9}{3} = 3$.\nb) Je sais maintenant que $f(x) = 3x + b$. Avec $f(1) = -1$ : $3 \\times 1 + b = -1$, donc $b = -1 - 3 = -4$. Ainsi $f(x) = 3x - 4$.\nJe vérifie avec l'autre point : $3 \\times 4 - 4 = 8$. ✓\nc) $f(10) = 3 \\times 10 - 4 = 26$.\nd) $f(-2) = 3 \\times (-2) - 4 = -6 - 4 = -10$ : l'ordonnée de $M$ est bien l'image de son abscisse, $M$ est sur la droite.\nSur le schéma, la marche orange va de $(1\\,;\\,-1)$ à $(4\\,;\\,8)$ : $3$ pas vers la droite, $9$ vers le haut, soit $3$ par pas.\n⛔ Le piège au a) : renverser la fraction, $\\dfrac{4 - 1}{8 - (-1)} = \\dfrac{3}{9}$. Les images en HAUT, les $x$ en bas.\nRéponse : $a = 3$ ; $b = -4$ ; $f(10) = 26$ ; oui, $M$ est sur la droite.",
          schema: repere([-1, 5, -5, 9], [{ q: [0, 3, -4] }, { pts: [[1, -1], [4, -1], [4, 8]], couleur: ORANGE }], [{ x: 1, y: -1 }, { x: 4, y: 8 }, { x: 0, y: -4, label: "b" }]),
          micros: ["affine_expression", "affine_coeff_directeur", "affine_ordonnee_origine"],
        },
        {
          enonce:
            "La droite ci-dessous représente une fonction affine $f$.\na) Lire l'ordonnée à l'origine.\nb) Lire le coefficient directeur (aide : avancer de $2$ carreaux vers la droite).\nc) En déduire $f(x)$.\nd) Calculer $f(-2)$, puis contrôler sur le graphique.\ne) Le point $P(10\\,;\\,-12)$, hors du dessin, est-il sur la droite ?",
          figure: repere([-3, 5, -5, 8], [{ q: [0, -1.5, 3] }]),
          correction:
            "a) La droite coupe l'axe vertical en $3$ : $b = 3$.\nb) Je pars de $(0\\,;\\,3)$. En avançant de $1$, la droite tombe entre deux carreaux : j'avance donc de $2$, et j'arrive en $(2\\,;\\,0)$. J'ai DESCENDU de $3$ pour $2$ pas : $a = \\dfrac{-3}{2} = -1{,}5$.\nc) $f(x) = -1{,}5x + 3$.\nd) $f(-2) = -1{,}5 \\times (-2) + 3 = 3 + 3 = 6$. Sur le graphique, au-dessus de $-2$, la droite est bien à la hauteur $6$. ✓\ne) $f(10) = -1{,}5 \\times 10 + 3 = -15 + 3 = -12$ : c'est l'ordonnée de $P$, il est sur la droite. Le calcul voit plus loin que le dessin.\n⛔ Le piège au b) : oublier le signe. La droite DESCEND quand on va vers la droite : $a$ est négatif, $-1{,}5$ et pas $1{,}5$.\n⛔ Autre piège : répondre $a = -3$. On a avancé de $2$, pas de $1$ : je divise par $2$.\nRéponse : $b = 3$ ; $a = -1{,}5$ ; $f(x) = -1{,}5x + 3$ ; $f(-2) = 6$ ; oui, $P$ est sur la droite.",
          schema: repere([-3, 5, -5, 8], [{ q: [0, -1.5, 3] }, { pts: [[0, 3], [2, 3], [2, 0]], couleur: ORANGE }], [{ x: 0, y: 3, label: "b" }, { x: 2, y: 0 }, { x: -2, y: 6 }]),
          micros: ["affine_graphique", "affine_expression", "affine_calcul_image"],
        },
        {
          enonce:
            "Une voiture consomme $6$ litres de carburant aux $100$ km. Elle part avec un réservoir plein de $50$ litres. On note $x$ la distance parcourue en km, $c(x)$ le carburant consommé et $r(x)$ le carburant restant, en litres.\na) Calculer la consommation pour $100$ km, puis pour $250$ km.\nb) Justifier que $c(x) = 0{,}06x$. La fonction $c$ est-elle linéaire ?\nc) Exprimer $r(x)$. Que représentent son coefficient directeur et son ordonnée à l'origine ?\nd) Calculer $r(250)$.\ne) Vrai ou faux : « après $500$ km, on a roulé deux fois plus qu'après $250$ km, donc il restera deux fois moins de carburant ».",
          correction:
            "a) Pour $100$ km, $6$ L. Pour $250$ km, c'est $2{,}5$ fois plus : $6 \\times 2{,}5 = 15$ L.\nb) Pour $1$ km, la voiture consomme $\\dfrac{6}{100} = 0{,}06$ L ; pour $x$ km, $x$ fois plus : $c(x) = 0{,}06x$. C'est de la forme $ax$ : $c$ est linéaire, la consommation est proportionnelle à la distance.\nc) Il reste le plein moins ce qui est consommé : $r(x) = 50 - 0{,}06x = -0{,}06x + 50$. $b = 50$, c'est le plein au départ ; $a = -0{,}06$ : le réservoir perd $0{,}06$ L à chaque kilomètre.\nd) $r(250) = 50 - 0{,}06 \\times 250 = 50 - 15 = 35$ L.\ne) Faux. $r(500) = 50 - 0{,}06 \\times 500 = 50 - 30 = 20$ L, et pas $35 \\div 2 = 17{,}5$ L. C'est la consommation qui double ($15$ L puis $30$ L), pas ce qui reste : $r$ est affine, pas linéaire.\nSur le schéma (axe horizontal en centaines de km, axe vertical en dizaines de litres), la droite bleue de $c$ part de l'origine ; la droite orange de $r$ part du plein et descend.\n⛔ Le piège au e) : raisonner en proportion sur $r$. Doubler ou diviser par deux ne marche que pour une fonction linéaire.\nRéponse : $6$ L et $15$ L ; $c$ est linéaire ; $r(x) = -0{,}06x + 50$ ; $r(250) = 35$ L ; faux, il restera $20$ L.",
          schema: repere([0, 9, -1, 7], [{ q: [0, 0.6, 0] }, { q: [0, -0.6, 5], couleur: ORANGE }], [{ x: 0, y: 5, label: "plein" }, { x: 2.5, y: 1.5 }, { x: 2.5, y: 3.5 }, { x: 5, y: 2 }]),
          micros: ["affine_reconnaitre", "affine_probleme", "affine_calcul_image"],
        },
        {
          enonce:
            "Une salle d'escalade propose deux tarifs (inventés). Tarif A : $12$ € l'entrée. Tarif B : une carte à $40$ € pour l'année, puis $7$ € l'entrée. On note $x$ le nombre d'entrées.\na) Calculer le prix de $5$ entrées, puis de $10$ entrées, avec chaque tarif.\nb) Exprimer $A(x)$ et $B(x)$. Laquelle de ces deux fonctions est linéaire ?\nc) Résoudre $A(x) = B(x)$. Interpréter.\nd) À partir de combien d'entrées le tarif B est-il le plus avantageux ?",
          correction:
            "a) Tarif A : $12 \\times 5 = 60$ € et $12 \\times 10 = 120$ €. Tarif B : $40 + 7 \\times 5 = 75$ € et $40 + 7 \\times 10 = 110$ €. Pour $5$ entrées, A gagne ; pour $10$, c'est B.\nb) $A(x) = 12x$ : linéaire, le prix est proportionnel au nombre d'entrées. $B(x) = 7x + 40$ : affine, avec $b = 40$, la carte payée une fois.\nc) $12x = 7x + 40$. J'enlève $7x$ des deux côtés : $5x = 40$, donc $x = 8$. Pour $8$ entrées, les deux tarifs coûtent $12 \\times 8 = 96$ € : c'est le point où les deux droites se croisent.\nd) Au-delà de $8$, la droite de B passe SOUS celle de A : chaque entrée y coûte $5$ € de moins. Le tarif B est le plus avantageux à partir de $9$ entrées.\nSur le schéma, l'axe vertical compte des dizaines d'euros : A en bleu part de l'origine, B en orange part de $4$, soit $40$ €.\n⛔ Le piège au d) : répondre « à partir de $8$ ». À $8$ entrées, les deux tarifs sont ÉGAUX ; B gagne à partir de la neuvième.\nRéponse : $60$ € et $75$ €, puis $120$ € et $110$ € ; $A(x) = 12x$ est linéaire, $B(x) = 7x + 40$ ; $x = 8$, soit $96$ € ; B à partir de $9$ entrées.",
          schema: repere([0, 12, -2, 15], [{ q: [0, 1.2, 0] }, { q: [0, 0.7, 4], couleur: ORANGE }], [{ x: 8, y: 9.6, label: "bascule" }, { x: 5, y: 6 }, { x: 5, y: 7.5 }, { x: 10, y: 12 }, { x: 10, y: 11 }]),
          micros: ["affine_probleme", "affine_expression", "affine_graphique"],
        },
        {
          enonce:
            "Soit $f(x) = -0{,}5x + 3$. Vrai ou faux ? Justifier par un calcul.\na) Le point $A(4\\,;\\,1)$ est sur la droite de $f$.\nb) L'image de $-2$ est $4$.\nc) La droite de $f$ passe par l'origine du repère.\nd) Quand $x$ augmente de $2$, $f(x)$ diminue de $1$.\ne) La droite de $f$ monte.",
          correction:
            "a) VRAI. $f(4) = -0{,}5 \\times 4 + 3 = -2 + 3 = 1$ : c'est bien l'ordonnée de $A$.\nb) VRAI. $f(-2) = -0{,}5 \\times (-2) + 3 = 1 + 3 = 4$.\nc) FAUX. $f(0) = 3$ : la droite coupe l'axe vertical en $3$, pas en $0$. $f$ est affine, pas linéaire.\nd) VRAI. À chaque pas de $1$, $f(x)$ change de $a = -0{,}5$ ; pour deux pas, de $2 \\times (-0{,}5) = -1$. C'est la marche orange du schéma, de $A$ jusqu'au point $(6\\,;\\,0)$.\ne) FAUX. $a = -0{,}5$ est négatif : la droite descend.\n⛔ Le piège au d) : répondre « faux, elle diminue de $0{,}5$ ». $a$ donne la variation pour UN pas ; pour deux pas, elle est deux fois plus grande.\nRéponse : vrai, vrai, faux, vrai, faux.",
          schema: repere([-3, 7, -2, 6], [{ q: [0, -0.5, 3] }, { pts: [[4, 1], [6, 1], [6, 0]], couleur: ORANGE }], [{ x: 4, y: 1, label: "A" }, { x: -2, y: 4 }, { x: 0, y: 3 }, { x: 6, y: 0 }]),
          micros: ["affine_calcul_image", "affine_coeff_directeur", "affine_defi"],
        },
        {
          enonce:
            "Un service de vélos électriques en libre-service facture $1$ € pour déverrouiller le vélo, puis $0{,}25$ € la minute. On note $f(t)$ le prix, en euros, d'un trajet de $t$ minutes.\na) Combien coûte un trajet de $20$ minutes ?\nb) Exprimer $f(t)$. Donner $a$ et $b$, et dire ce qu'ils représentent.\nc) Compléter le tableau.\nd) Un trajet de $40$ minutes coûte-t-il deux fois plus cher qu'un trajet de $20$ minutes ?\ne) Avec $8$ €, combien de minutes peut-on rouler ?",
          figure: tableau(["Durée (min)", "0", "10", "20", "30", "40"], ["Prix (€)", "…", "…", "…", "…", "…"]),
          correction:
            "a) $20$ minutes à $0{,}25$ €, plus le déverrouillage : $0{,}25 \\times 20 + 1 = 5 + 1 = 6$ €.\nb) $f(t) = 0{,}25t + 1$ : $a = 0{,}25$, le prix d'une minute ; $b = 1$, le déverrouillage, payé même pour $0$ minute.\nc) $f(0) = 1$ ; $f(10) = 2{,}5 + 1 = 3{,}5$ ; $f(20) = 6$ ; $f(30) = 7{,}5 + 1 = 8{,}5$ ; $f(40) = 10 + 1 = 11$. Chaque fois, $10$ minutes de plus ajoutent $2{,}50$ €.\nd) Non : $f(40) = 11$ € alors que $2 \\times 6 = 12$ €. L'euro du déverrouillage n'est payé qu'une fois : $f$ est affine, pas linéaire.\ne) Je résous $0{,}25t + 1 = 8$ : $0{,}25t = 7$, donc $t = \\dfrac{7}{0{,}25} = 28$. On peut rouler $28$ minutes.\n⛔ Le piège au e) : diviser $8$ par $0{,}25$ et trouver $32$ minutes. Le premier euro part dans le déverrouillage : il ne reste que $7$ € pour rouler.\nRéponse : $6$ € ; $f(t) = 0{,}25t + 1$ ; $1$, $3{,}5$, $6$, $8{,}5$ et $11$ € ; non ; $28$ minutes.",
          schema: tableau(["Durée (min)", "0", "10", "20", "30", "40"], ["Prix (€)", 1, 3.5, 6, 8.5, 11]),
          micros: ["affine_calcul_image", "affine_probleme", "affine_ordonnee_origine", "affine_reconnaitre"],
        },
        {
          enonce:
            "La droite bleue représente une fonction $f$, la droite orange une fonction $g$.\na) La droite bleue passe par l'origine. Que peut-on dire de $f$ ? Lire son coefficient (avancer de $2$ carreaux).\nb) Lire l'ordonnée à l'origine et le coefficient directeur de $g$.\nc) Donner $f(x)$ et $g(x)$.\nd) Lire les coordonnées du point où les deux droites se croisent, puis le vérifier par le calcul.",
          figure: repere([-3, 4, -5, 5], [{ q: [0, 0.5, 0] }, { q: [0, 2, -3], couleur: ORANGE }]),
          correction:
            "a) Une droite qui passe par l'origine représente une fonction LINÉAIRE : $f(x) = ax$. Je pars de $(0\\,;\\,0)$ et j'avance de $2$ : j'arrive en $(2\\,;\\,1)$, je suis monté de $1$. Donc $a = \\dfrac{1}{2} = 0{,}5$.\nb) La droite orange coupe l'axe vertical en $-3$ : $b = -3$. De $(0\\,;\\,-3)$, j'avance de $1$ et j'arrive en $(1\\,;\\,-1)$ : je suis monté de $2$, donc $a = 2$.\nc) $f(x) = 0{,}5x$ et $g(x) = 2x - 3$.\nd) Les droites se croisent en $I(2\\,;\\,1)$. Vérification : $0{,}5 \\times 2 = 1$ et $2 \\times 2 - 3 = 1$. ✓ Le point est sur les deux droites.\nSur le schéma, les deux marches vertes : $2$ pas pour monter de $1$ sur la bleue, $1$ pas pour monter de $2$ sur l'orange.\n⛔ Le piège au a) : répondre $a = 2$, en échangeant les deux nombres de la marche. $a$ est ce qu'on MONTE pour UN pas vers la droite : $1$ pour $2$ pas, donc $0{,}5$ par pas.\nRéponse : $f$ est linéaire, $f(x) = 0{,}5x$ ; $g(x) = 2x - 3$ ; les droites se croisent en $I(2\\,;\\,1)$.",
          schema: repere([-3, 4, -5, 5], [{ q: [0, 0.5, 0] }, { q: [0, 2, -3], couleur: ORANGE }, { pts: [[0, 0], [2, 0], [2, 1]], couleur: VERT }, { pts: [[0, -3], [1, -3], [1, -1]], couleur: VERT }], [{ x: 2, y: 1, label: "I" }, { x: 0, y: -3 }, { x: 0, y: 0 }]),
          micros: ["affine_graphique", "affine_expression", "affine_reconnaitre"],
        },
        {
          enonce:
            "Défi : trouver chaque fonction, ou montrer qu'elle n'existe pas.\na) $f$ est affine, avec $f(2) = 7$ et $f(5) = 7$.\nb) $g$ est affine, et sa droite coupe l'axe vertical en $6$ et l'axe horizontal en $3$.\nc) $h$ est linéaire, avec $h(4) = 10$.\nd) $k$ est affine, avec $k(1) = 2$, $k(2) = 4$ et $k(3) = 7$.",
          correction:
            "a) $a = \\dfrac{7 - 7}{5 - 2} = \\dfrac{0}{3} = 0$. Alors $f(x) = 0x + b$, et $f(2) = 7$ donne $b = 7$ : $f(x) = 7$. C'est une fonction CONSTANTE, sa droite est horizontale.\nb) La droite passe par $(0\\,;\\,6)$ et $(3\\,;\\,0)$ : $b = 6$ et $a = \\dfrac{0 - 6}{3 - 0} = -2$. Donc $g(x) = -2x + 6$. Vérification : $-2 \\times 3 + 6 = 0$. ✓\nc) Linéaire : $h(x) = ax$. $h(4) = 10$ donne $4a = 10$, donc $a = \\dfrac{10}{4} = 2{,}5$ : $h(x) = 2{,}5x$.\nd) De $1$ à $2$, $k$ augmente de $2$ ; de $2$ à $3$, de $3$. Pour une fonction affine, chaque pas de $1$ ajoute le même $a$ : aucune fonction affine ne convient. Les trois points ne sont pas alignés.\nSur le schéma : $f$ en bleu, $g$ en orange, $h$ en vert.\n⛔ Le piège au a) : conclure « impossible » parce que $a = 0$. Un coefficient nul est permis : la fonction ne change jamais, sa droite est horizontale.\nRéponse : $f(x) = 7$ ; $g(x) = -2x + 6$ ; $h(x) = 2{,}5x$ ; $k$ n'existe pas.",
          schema: repere([-1, 6, -2, 11], [{ q: [0, 0, 7] }, { q: [0, -2, 6], couleur: ORANGE }, { q: [0, 2.5, 0], couleur: VERT }], [{ x: 2, y: 7 }, { x: 5, y: 7 }, { x: 0, y: 6 }, { x: 3, y: 0 }, { x: 4, y: 10 }]),
          micros: ["affine_expression", "affine_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je traduis en fonction affine, je calcule ou je lis sur le graphique, puis je réponds par une phrase.",
      rappel: [
        "Je nomme la variable et son unité, puis j'écris chaque tarif sous la forme $ax + b$ : $b$ est la part FIXE, $a$ le prix de chaque unité.",
        "Pour comparer deux offres, je résous $f(x) = g(x)$ : c'est le point de bascule, là où les deux droites se croisent. Avant et après, c'est la droite du dessous qui gagne.",
        "Je réponds par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Louer une voiture pour le week-end",
          enonce:
            "Pour un week-end, l'agence A loue une voiture $40$ € plus $0{,}30$ € par kilomètre ; l'agence B, $70$ € plus $0{,}15$ € par kilomètre (tarifs inventés). On note $x$ le nombre de kilomètres. Sur le graphique, l'axe horizontal compte des CENTAINES de km, l'axe vertical des DIZAINES d'euros.\na) Calculer le prix d'un trajet de $150$ km dans chaque agence.\nb) Exprimer $A(x)$ et $B(x)$. Que représentent les nombres $40$ et $70$ ?\nc) Quelle droite représente l'agence A ? Justifier.\nd) Résoudre $A(x) = B(x)$ et interpréter.\ne) Pour un voyage de $350$ km, quelle agence choisir ?",
          figure: repere([0, 5, -2, 15], [{ q: [0, 3, 4] }, { q: [0, 1.5, 7], couleur: ORANGE }]),
          correction:
            "a) A : $40 + 0{,}3 \\times 150 = 40 + 45 = 85$ €. B : $70 + 0{,}15 \\times 150 = 70 + 22{,}5 = 92{,}5$ €. Pour $150$ km, A est moins chère.\nb) $A(x) = 0{,}3x + 40$ et $B(x) = 0{,}15x + 70$. Les ordonnées à l'origine, $40$ et $70$, sont les parts FIXES, payées même sans rouler ; les coefficients, $0{,}3$ et $0{,}15$, le prix d'un kilomètre.\nc) La bleue : elle coupe l'axe vertical en $4$ dizaines, soit $40$ €, et elle monte plus vite, car chaque kilomètre coûte deux fois plus cher chez A.\nd) $0{,}3x + 40 = 0{,}15x + 70$. J'enlève $0{,}15x$ et $40$ des deux côtés : $0{,}15x = 30$, donc $x = \\dfrac{30}{0{,}15} = 200$. Pour $200$ km, les deux agences demandent $0{,}3 \\times 200 + 40 = 100$ € : c'est le croisement des droites.\ne) $350$ km, c'est plus que $200$ : au-delà du croisement, la droite de B est en dessous. Je contrôle : A coûte $0{,}3 \\times 350 + 40 = 145$ € et B $0{,}15 \\times 350 + 70 = 122{,}5$ €. Je choisis B.\n⛔ Le piège : choisir l'agence au plus petit forfait sans regarder la distance. A démarre moins cher, mais chaque kilomètre y coûte plus : sur un long trajet, B la rattrape puis passe devant.\nRéponse : $85$ € et $92{,}50$ € ; $A(x) = 0{,}3x + 40$, $B(x) = 0{,}15x + 70$ ; A est la bleue ; $200$ km, soit $100$ € ; l'agence B.",
          schema: repere([0, 5, -2, 15], [{ q: [0, 3, 4] }, { q: [0, 1.5, 7], couleur: ORANGE }], [{ x: 2, y: 10, label: "200 km" }, { x: 1.5, y: 8.5 }, { x: 1.5, y: 9.25 }, { x: 3.5, y: 14.5 }, { x: 3.5, y: 12.25 }]),
          micros: ["affine_probleme", "affine_expression", "affine_graphique", "affine_ordonnee_origine"],
        },
        {
          titre: "Des degrés Celsius aux degrés Fahrenheit",
          enonce:
            "L'eau gèle à $0$ °C, soit $32$ °F, et bout à $100$ °C, soit $212$ °F. Passer des degrés Celsius aux degrés Fahrenheit est une fonction affine : $F(x) = ax + b$, pour $x$ en °C.\na) Trouver $b$, puis $a$.\nb) Combien de °F font $37$ °C, la température du corps humain ?\nc) $F$ est-elle linéaire ? $20$ °C font-ils deux fois plus de °F que $10$ °C ?\nd) Les voyageurs utilisent une règle rapide : « je double, et j'ajoute $30$ », soit $R(x) = 2x + 30$. Pour quelle température donne-t-elle le résultat exact ?\ne) Quelle erreur fait-elle à $30$ °C ?",
          correction:
            "a) $b$ est l'image de $0$ : $F(0) = 32$, donc $b = 32$. Puis $a = \\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1{,}8$. Donc $F(x) = 1{,}8x + 32$.\nb) $F(37) = 1{,}8 \\times 37 + 32 = 66{,}6 + 32 = 98{,}6$ : $37$ °C, c'est $98{,}6$ °F.\nc) Non : $b = 32$, pas $0$. $F(10) = 1{,}8 \\times 10 + 32 = 50$ et $F(20) = 1{,}8 \\times 20 + 32 = 68$, pas $2 \\times 50 = 100$.\nd) Je résous $2x + 30 = 1{,}8x + 32$ : $0{,}2x = 2$, donc $x = 10$. À $10$ °C, les deux donnent $50$ °F : c'est le croisement des deux droites.\ne) À $30$ °C : $R(30) = 2 \\times 30 + 30 = 90$ et $F(30) = 1{,}8 \\times 30 + 32 = 86$. La règle se trompe de $4$ °F, et d'autant plus qu'on s'éloigne de $10$ °C.\nSur le schéma, les deux axes comptent des DIZAINES de degrés : $F$ en bleu, $R$ en orange, qui se croisent à $10$ °C.\n⛔ Le piège au a) : calculer $a = \\dfrac{212}{100} = 2{,}12$, comme si $F$ était linéaire. L'eau gèle à $32$ °F, pas à $0$ : je divise l'ÉCART des images par l'écart des températures.\nRéponse : $F(x) = 1{,}8x + 32$ ; $98{,}6$ °F ; non ; à $10$ °C ; $4$ °F d'erreur.",
          schema: repere([-1, 4, -2, 12], [{ q: [0, 1.8, 3.2] }, { q: [0, 2, 3], couleur: ORANGE }], [{ x: 1, y: 5, label: "10 °C" }, { x: 3, y: 8.6 }, { x: 3, y: 9 }]),
          micros: ["affine_expression", "affine_coeff_directeur", "affine_calcul_image", "affine_defi"],
        },
        {
          titre: "La mer monte",
          enonce:
            "Depuis 1993, des satellites mesurent le niveau moyen des océans. De 1993 à 2023, il est monté en moyenne de $3{,}3$ mm par an. On note $n(t)$ la hausse, en mm, $t$ années après 1993 : $n(t) = 3{,}3t$.\na) La fonction $n$ est-elle linéaire ? Que représente $3{,}3$ ?\nb) Calculer la hausse en 2023.\nc) Si ce rythme restait le même, quelle serait la hausse en 2050 ?\nd) De 2014 à 2023, la mer est en fait montée d'environ $4{,}7$ mm par an. À partir de 2023, on modélise la hausse par $m(x) = 4{,}7x + 99$, avec $x$ le nombre d'années après 2023. Pourquoi $m$ n'est-elle pas linéaire ? Calculer la hausse prévue en 2050.\ne) Quel écart entre les deux prévisions pour 2050 ?",
          correction:
            "a) Oui : $n(t) = 3{,}3t$ est de la forme $at$, avec $b = 0$ — en 1993, point de départ des mesures, la hausse vaut $0$. $a = 3{,}3$ : la mer monte de $3{,}3$ mm chaque année.\nb) 2023, c'est $t = 30$ : $n(30) = 3{,}3 \\times 30 = 99$ mm, à peu près $10$ cm.\nc) 2050, c'est $t = 2050 - 1993 = 57$ : $n(57) = 3{,}3 \\times 57 = 188{,}1$ mm, près de $19$ cm.\nd) Ici l'origine est 2023, et la mer a déjà monté de $99$ mm : $b = 99$, pas $0$, donc $m$ est affine, pas linéaire. 2050, c'est $x = 27$ : $m(27) = 4{,}7 \\times 27 + 99 = 126{,}9 + 99 = 225{,}9$ mm, environ $23$ cm.\ne) $225{,}9 - 188{,}1 = 37{,}8$ mm : près de $4$ cm de plus, seulement parce que le rythme s'est accéléré.\n⛔ Le piège au d) : remplacer $x$ par $57$, les années depuis 1993. Dans $m$, on compte depuis 2023 : chaque fonction a SON point de départ, ici $x = 27$.\nRéponse : $n$ est linéaire ; $99$ mm en 2023 ; $188{,}1$ mm en 2050 au rythme ancien ; $m$ est affine, $225{,}9$ mm ; $37{,}8$ mm d'écart.",
          schema: (
            <div className="grid gap-2">
              {tableau(["Année", "1993", "2023", "2050"], ["n (mm)", 0, 99, 188.1])}
              {tableau(["Année", "2023", "2050"], ["m (mm)", 99, 225.9])}
            </div>
          ),
          micros: ["affine_probleme", "affine_reconnaitre", "affine_calcul_image", "affine_defi"],
        },
        {
          titre: "Le taxi à l'envers",
          enonce:
            "Dans une ville, un taxi facture une prise en charge, puis un prix fixe par kilomètre (tarif inventé). Une course de $6$ km a coûté $12{,}20$ €, une course de $10$ km, $17$ €. On note $f(x)$ le prix d'une course de $x$ km.\na) Le prix est-il proportionnel à la distance ?\nb) Calculer le prix d'un kilomètre, puis la prise en charge.\nc) Exprimer $f(x)$, et calculer le prix d'une course de $15$ km.\nd) Avec $30$ €, quelle distance, en kilomètres entiers, peut-on parcourir au plus ?",
          correction:
            "a) Non : $\\dfrac{12{,}2}{6} \\approx 2{,}03$ et $\\dfrac{17}{10} = 1{,}7$. Les deux quotients ne sont pas égaux : le prix n'est pas proportionnel, à cause de la prise en charge.\nb) De $6$ à $10$ km, $4$ km de plus coûtent $17 - 12{,}2 = 4{,}8$ € de plus. Un kilomètre coûte donc $a = \\dfrac{4{,}8}{4} = 1{,}2$ €. Pour $6$ km, les kilomètres coûtent $1{,}2 \\times 6 = 7{,}2$ € ; le reste est la prise en charge : $b = 12{,}2 - 7{,}2 = 5$ €.\nc) $f(x) = 1{,}2x + 5$. Vérification avec la seconde course : $1{,}2 \\times 10 + 5 = 17$. ✓ Pour $15$ km : $1{,}2 \\times 15 + 5 = 18 + 5 = 23$ €.\nd) Après la prise en charge, il reste $30 - 5 = 25$ € pour les kilomètres : $\\dfrac{25}{1{,}2} \\approx 20{,}8$. Je vérifie aux entiers : $1{,}2 \\times 20 + 5 = 29$ €, ça passe ; $1{,}2 \\times 21 + 5 = 30{,}2$ €, c'est trop. On peut faire $20$ km au plus.\n⛔ Le piège au b) : prendre $a = \\dfrac{12{,}2}{6}$, comme si tout le prix venait des kilomètres. Le coefficient se calcule avec l'ÉCART des prix et l'ÉCART des distances.\nRéponse : non ; $1{,}20$ € le kilomètre et $5$ € de prise en charge ; $f(x) = 1{,}2x + 5$, $23$ € pour $15$ km ; $20$ km au plus.",
          schema: tableau(["Distance (km)", "0", "6", "10", "15", "20"], ["Prix (€)", 5, 12.2, 17, 23, 29]),
          micros: ["affine_expression", "affine_coeff_directeur", "affine_probleme", "affine_defi"],
        },
      ],
    },
  ],
};
