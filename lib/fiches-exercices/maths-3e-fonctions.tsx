// ─── Fiche d'exercices : fonctions, image et antécédent (3e) — 20 exercices ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-fonctions.tsx` et sur les
// micros du coach de 3e (notionId fonction_generalite). On reste sur la
// fonction comme PROCÉDÉ : image, antécédent, tableau de valeurs (tableur),
// courbe lue, formule. Les fonctions affines ont leur propre notion
// (affine_fonction) : ici, seulement les RECONNAÎTRE (exercices 8 et 14).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le loueur de vélo, ni
// 2x + 3, ni les tacos, ni l'excursion, ni le ballon de la plage.
//
// ⭐ L'IDÉE DE LA FICHE (celle du cours) : une image est UNIQUE, un antécédent
// ne l'est pas — deux (4, 6, 10, 12, 17), trois (6, 18), un seul ou aucun
// (6, 12, 15). Et chaque lecture est dessinée : les points rouges du corrigé
// montrent où l'on lit.
//
// Les pièges nommés : l'image et l'antécédent échangés (1, 7, 10), la lecture
// partie du mauvais axe (5, 9, 20), le carré mal placé (2, 12, 17, 19),
// l'antécédent oublié (6, 15, 18).
//
// Le monde : un matin de gel en montagne, la marée dans un port, le dégagement
// d'un gardien (h = −5t² + 15t, g ≈ 10 m/s²), une randonnée en boucle, la
// boîte sans couvercle, une crue après l'orage.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fonctions-3e.mjs` — les
// courbes et les tableaux sont RELUS dans ce source, chaque lecture retrouvée
// sur une grille, chaque calcul réévalué en fractions exactes.
//
// Micro-compétences : fonction_vocabulaire (1, 3, 7, 10, 16, 20),
// fonction_image (2, 3, 5, 9, 11, 12, 15, 17, 19), fonction_antecedent (3, 4,
// 6, 9, 11, 12, 13, 15, 17, 18, 19, 20), fonction_tableau (4, 11, 13, 14, 19),
// fonction_graphique (5, 6, 9, 10, 13, 17, 18, 20), fonction_affine_lineaire
// (8, 14), fonction_defi (12, 15, 16, 18, 19). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, type Courbe } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";

/* Les courbes lues dans les énoncés — et redessinées, marquées, dans les corrigés. */
const COURBE_6: Courbe[] = [{ pts: [[-2, 1], [-1, -1], [0, 0], [1, 2], [2, 3], [3, 2], [4, 0], [5, -1]] }];
const TEMPERATURE_9: Courbe[] = [{ pts: [[0, -1], [2, -2], [4, -3], [5, -4], [6, -3], [8, 0], [10, 3], [12, 4]] }];
const COURBE_10: Courbe[] = [{ q: [1, -1, -2] }];
const MAREE_13: Courbe[] = [{ pts: [[0, 2], [2, 4], [4, 7], [6, 8], [8, 7], [10, 4], [12, 2]] }];
const ALTITUDE_18: Courbe[] = [{ pts: [[0, 6], [1, 7], [3, 10], [4, 11], [5, 10], [6, 9], [8, 10], [10, 6]] }];
const CRUE_20: Courbe[] = [{ pts: [[0, 1], [1, 2], [2, 4], [3, 6], [4, 7], [5, 6], [6, 5], [8, 4], [10, 2], [12, 1]] }];

export const exercicesFonctions3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "fonction-generalite",
  titre: "Fonctions : image et antécédent",
  accroche:
    "Vingt exercices, du calcul seul au problème : calculer une image, chercher un antécédent, lire une courbe et un tableau de tableur, comme au brevet. Un matin de gel en montagne, la marée dans un port, le dégagement d'un gardien, une randonnée, une crue. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape, le piège nommé et la lecture dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/fonction-generalite", titre: "Fonctions : image et antécédent" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un mot par exercice : image ou antécédent. Je me demande d'abord ce qui entre et ce qui sort.",
      rappel: [
        "Une FONCTION est une machine : on y fait entrer un nombre $x$, il en sort UN SEUL nombre, noté $f(x)$ (on lit « $f$ de $x$ »).",
        "Dans $f(3) = 7$ : $7$ est l'IMAGE de $3$, et $3$ est UN ANTÉCÉDENT de $7$. L'antécédent entre, l'image sort.",
        "Une image est unique. Un nombre peut avoir deux antécédents, ou plus, ou aucun.",
        "Sur une courbe, l'antécédent se lit sur l'axe horizontal (les abscisses), l'image sur l'axe vertical (les ordonnées).",
      ],
      exercices: [
        {
          enonce:
            "Une fonction $f$ vérifie $f(4) = 9$ et $f(-1) = 9$.\na) Quelle est l'image de $4$ ?\nb) Donner deux antécédents de $9$.\nc) Un élève écrit : « l'image de $9$ est $4$ ». A-t-il raison ?\nd) Peut-on avoir aussi $f(4) = 2$ ?\ne) Le point $A(4\\,;\\,9)$ est-il sur la courbe de $f$ ?",
          correction:
            "Je lis chaque égalité dans le bon sens : dans $f(4) = 9$, le nombre qui ENTRE est $4$, celui qui SORT est $9$.\na) $f(4) = 9$ : l'image de $4$ est $9$.\nb) $f(4) = 9$ et $f(-1) = 9$ : $4$ et $-1$ sont deux antécédents de $9$.\nc) Non. C'est la phrase à l'envers : $9$ est l'image de $4$, et $4$ est un antécédent de $9$.\nd) Non. $4$ a déjà une image, $9$ : pour un nombre donné, la machine ne rend qu'UN seul résultat.\ne) Oui : l'abscisse $4$ entre, l'ordonnée $9$ sort, et on a bien $f(4) = 9$.\n⛔ Le piège : dire « l'image de $9$ est $4$ ». L'image est toujours ce qui SORT, le nombre écrit après le signe $=$.\nRéponse : l'image de $4$ est $9$ ; $4$ et $-1$ sont deux antécédents de $9$.",
          schema: tableau(["x", "−1", "4"], ["f(x)", 9, 9]),
          micros: ["fonction_vocabulaire"],
        },
        {
          enonce: "Soit $f$ la fonction définie par $f(x) = 2x^2 - 5$. Calculer :\na) $f(0)$\nb) $f(-3)$\nc) $f(1{,}5)$",
          correction:
            "Je remplace $x$ par le nombre, avec des parenthèses s'il est négatif, et je respecte les priorités : le carré d'abord, puis la multiplication, puis la soustraction.\na) $f(0) = 2 \\times 0^2 - 5 = -5$.\nb) $f(-3) = 2 \\times (-3)^2 - 5 = 2 \\times 9 - 5 = 13$.\nc) $f(1{,}5) = 2 \\times 1{,}5^2 - 5 = 2 \\times 2{,}25 - 5 = -0{,}5$.\n⛔ Le piège au b) : calculer $(2 \\times (-3))^2 = 36$. Le carré ne porte que sur $x$, pas sur le $2$ : je calcule $(-3)^2 = 9$ d'abord, puis je multiplie par $2$.\n⛔ Autre piège : $(-3)^2$ vaut $9$, pas $-9$.\nRéponse : $f(0) = -5$ ; $f(-3) = 13$ ; $f(1{,}5) = -0{,}5$.",
          schema: tableau(["x", "−3", "0", "1,5"], ["f(x)", 13, -5, "−0,5"]),
          micros: ["fonction_image"],
        },
        {
          enonce:
            "Voici un programme de calcul : « Choisir un nombre. Le multiplier par $3$. Soustraire $7$ au résultat. » On note $f(x)$ le résultat obtenu en partant de $x$.\na) Exprimer $f(x)$ en fonction de $x$.\nb) Calculer l'image de $5$.\nc) Quel nombre faut-il choisir pour obtenir $11$ ?\nd) Quel est l'antécédent de $-1$ ?",
          correction:
            "a) Je suis le programme avec $x$ : $x$ devient $3x$, puis $3x - 7$. Donc $f(x) = 3x - 7$.\nb) On me donne le nombre de départ, je cherche ce qui sort : $f(5) = 3 \\times 5 - 7 = 8$.\nc) Cette fois je connais ce qui SORT, $11$ : je cherche un antécédent, donc je résous $3x - 7 = 11$. J'ajoute $7$ : $3x = 18$, puis je divise par $3$ : $x = 6$. Vérification : $3 \\times 6 - 7 = 11$.\nd) Je résous $3x - 7 = -1$ : $3x = 6$, donc $x = 2$. Vérification : $3 \\times 2 - 7 = -1$.\n⛔ Le piège au c) : calculer $3 \\times 11 - 7 = 26$. On ne fait pas entrer $11$ dans la machine : $11$ est ce qui en sort.\nRéponse : $f(x) = 3x - 7$ ; $f(5) = 8$ ; il faut choisir $6$ ; l'antécédent de $-1$ est $2$.",
          schema: tableau(["x", "2", "5", "6"], ["f(x)", -1, 8, 11]),
          micros: ["fonction_vocabulaire", "fonction_image", "fonction_antecedent"],
        },
        {
          enonce:
            "Un tableur a calculé des valeurs d'une fonction $f$. Voici ce qu'il affiche.\na) Quelle est l'image de $1$ ?\nb) Que vaut $f(4)$ ?\nc) Donner les antécédents de $-1$ lus dans le tableau.\nd) Donner les antécédents de $7$.\ne) Combien d'antécédents de $-2$ le tableau montre-t-il ?",
          figure: tableau(["x", "−1", "0", "1", "2", "3", "4", "5"], ["f(x)", 7, 2, -1, -2, -1, 2, 7]),
          correction:
            "La première ligne porte ce qui ENTRE ($x$), la seconde ce qui SORT ($f(x)$). Une image se lit de haut en bas ; un antécédent, de bas en haut.\na) Sous $1$, je lis $-1$ : l'image de $1$ est $-1$, soit $f(1) = -1$.\nb) Sous $4$, je lis $2$ : $f(4) = 2$.\nc) Je cherche $-1$ dans la ligne des $f(x)$ : il apparaît sous $1$ et sous $3$. Les antécédents de $-1$ sont $1$ et $3$.\nd) $7$ apparaît sous $-1$ et sous $5$ : ses antécédents sont $-1$ et $5$.\ne) $-2$ n'apparaît qu'une fois, sous $2$ : le tableau montre un seul antécédent, $2$.\n⛔ Le piège : confondre les deux lignes. Pour « l'image de $1$ », je pars de $1$ dans la ligne des $x$ ; pour « les antécédents de $-1$ », je pars de $-1$ dans la ligne des $f(x)$.\nRéponse : $f(1) = -1$ ; $f(4) = 2$ ; $1$ et $3$ ; $-1$ et $5$ ; un seul, $2$.",
          // Les points du tableau sur la courbe de x² − 4x + 2 : chaque
          // horizontale coupe deux fois, sauf au point le plus bas.
          schema: repere([-2, 6, -3, 9], [{ q: [1, -4, 2] }], [{ x: 1, y: -1 }, { x: 3, y: -1 }, { x: -1, y: 7 }, { x: 5, y: 7 }, { x: 2, y: -2 }], [-1, 7]),
          micros: ["fonction_tableau", "fonction_antecedent"],
        },
        {
          enonce:
            "La courbe donne la hauteur d'un ballon (en mètres) en fonction de la distance horizontale parcourue (en mètres). On note $h$ cette fonction.\na) De quelle hauteur le ballon part-il ?\nb) Lire $h(1)$.\nc) Quelle est l'image de $2$ par $h$ ? Que représente-t-elle ?",
          figure: repere([0, 4, -1, 7], [{ q: [-1, 4, 1] }]),
          correction:
            "Pour lire une image, je pars de l'axe HORIZONTAL : je monte jusqu'à la courbe, puis je vais à l'horizontale jusqu'à l'axe vertical, où je lis le résultat.\na) Au départ, la distance vaut $0$. Je lis $h(0) = 1$ : le ballon part de $1$ m de haut.\nb) Je pars de $1$ sur l'axe horizontal, je monte jusqu'à la courbe, je lis $4$ sur l'axe vertical : $h(1) = 4$.\nc) Je pars de $2$ : $h(2) = 5$. C'est le point le plus haut de la courbe : le ballon monte à $5$ m quand il a parcouru $2$ m.\n⛔ Le piège au b) : partir de $1$ sur l'axe VERTICAL. On chercherait alors les antécédents de $1$, c'est-à-dire la question à l'envers.\nRéponse : $h(0) = 1$ ; $h(1) = 4$ ; $h(2) = 5$.",
          schema: repere([0, 4, -1, 7], [{ q: [-1, 4, 1] }], [{ x: 0, y: 1 }, { x: 1, y: 4 }, { x: 2, y: 5, label: "sommet" }]),
          micros: ["fonction_image", "fonction_graphique"],
        },
        {
          enonce:
            "Voici la courbe d'une fonction $g$ définie de $-2$ à $5$. Lire graphiquement :\na) les antécédents de $2$ ;\nb) les antécédents de $3$ ;\nc) les antécédents de $4$ ;\nd) les antécédents de $0$.",
          figure: repere([-3, 6, -3, 5], COURBE_6),
          correction:
            "Pour un antécédent, je pars de l'axe VERTICAL : je trace l'horizontale à la hauteur demandée, je repère où elle coupe la courbe, et je lis les ABSCISSES de ces points.\na) L'horizontale $y = 2$ coupe la courbe deux fois, en $x = 1$ et en $x = 3$ : $2$ a deux antécédents, $1$ et $3$.\nb) L'horizontale $y = 3$ touche la courbe une seule fois, en son point le plus haut : $3$ a un seul antécédent, $2$.\nc) L'horizontale $y = 4$ passe au-dessus de la courbe : $4$ n'a AUCUN antécédent.\nd) L'axe des abscisses ($y = 0$) coupe la courbe trois fois : en $x = -1{,}5$, en $x = 0$ et en $x = 4$. $0$ a trois antécédents.\n⛔ Le piège au a) : s'arrêter au premier point trouvé. Je suis l'horizontale jusqu'au bout du dessin.\nRéponse : $1$ et $3$ ; $2$ ; aucun ; $-1{,}5$, $0$ et $4$.",
          schema: repere([-3, 6, -3, 5], COURBE_6, [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: -1.5, y: 0 }, { x: 0, y: 0 }, { x: 4, y: 0 }], 2),
          micros: ["fonction_antecedent", "fonction_graphique"],
        },
        {
          enonce:
            "Traduire chaque phrase par une égalité de la forme $g(\\ldots) = \\ldots$.\na) L'image de $2$ par $g$ est $7$.\nb) $3$ est un antécédent de $-1$.\nc) La courbe de $g$ passe par le point $A(0\\,;\\,5)$.\nd) $0$ a pour antécédent $4$.",
          correction:
            "Dans $g(a) = b$, le nombre entre parenthèses ENTRE dans la machine (l'antécédent), le nombre après le signe $=$ en SORT (l'image).\na) $2$ entre, $7$ sort : $g(2) = 7$.\nb) $3$ entre, c'est l'antécédent ; $-1$ sort : $g(3) = -1$.\nc) Pour un point de la courbe, l'abscisse entre et l'ordonnée sort : $g(0) = 5$.\nd) $4$ entre, $0$ sort : $g(4) = 0$.\n⛔ Le piège au b) : écrire $g(-1) = 3$. L'antécédent est TOUJOURS entre les parenthèses.\nRéponse : $g(2) = 7$ ; $g(3) = -1$ ; $g(0) = 5$ ; $g(4) = 0$.",
          schema: tableau(["x", "0", "2", "3", "4"], ["g(x)", 5, 7, -1, 0]),
          micros: ["fonction_vocabulaire"],
        },
        {
          enonce:
            "Voici quatre fonctions : $f(x) = 4x$ ; $g(x) = 2x + 3$ ; $h(x) = x^2$ ; $k(x) = 5 - x$.\na) Lesquelles sont affines ? Lesquelles sont linéaires ?\nb) Calculer l'image de $0$ par chacune. Que remarque-t-on pour la fonction linéaire ?\nc) Pourquoi $h$ n'est-elle pas affine ?",
          correction:
            "Une fonction affine s'écrit $x \\mapsto ax + b$ ; elle est linéaire quand, en plus, $b = 0$.\na) $f(x) = 4x$ : $a = 4$ et $b = 0$, elle est linéaire (donc aussi affine). $g(x) = 2x + 3$ : affine, avec $a = 2$ et $b = 3$. $k(x) = 5 - x = -x + 5$ : affine, avec $a = -1$ et $b = 5$. $h(x) = x^2$ n'est pas affine.\nb) $f(0) = 0$ ; $g(0) = 3$ ; $h(0) = 0$ ; $k(0) = 5$. Une fonction linéaire donne toujours $0$ pour $0$ : sa droite passe par l'origine.\nc) Dans $x^2$, $x$ est multiplié par lui-même : ce n'est pas « un nombre fois $x$, plus un nombre ». Sa courbe n'est pas une droite.\nSur le schéma : $f$ en bleu, $g$ en orange, $h$ en vert.\n⛔ Le piège : croire que $k$ n'est pas affine parce que le $x$ est à la fin. $5 - x$ s'écrit aussi $-x + 5$ : l'ordre ne change rien.\n⛔ Autre piège : $h(0) = 0$ ne suffit pas pour être linéaire, il faut d'abord être affine.\nRéponse : $f$, $g$ et $k$ sont affines ; seule $f$ est linéaire ; $h$ n'est ni l'une ni l'autre.",
          schema: repere([-2, 3, -2, 8], [{ q: [0, 4, 0] }, { q: [0, 2, 3], couleur: ORANGE }, { q: [1, 0, 0], couleur: VERT }], [{ x: 0, y: 0 }, { x: 0, y: 3 }]),
          micros: ["fonction_affine_lineaire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions, comme au brevet. Je justifie chaque lecture par une phrase, avec l'unité.",
      rappel: [
        "IMAGE de $a$ : je pars de $a$ (sur l'axe horizontal, dans la ligne des $x$, ou dans la formule) et je lis ce qui sort, $f(a)$.",
        "ANTÉCÉDENTS de $b$ : je pars de $b$ (sur l'axe vertical, ou dans la ligne des $f(x)$) et je cherche TOUS les nombres qui donnent $b$. Avec une formule, je résous $f(x) = b$.",
        "Au brevet, une lecture se justifie par une phrase : « je lis que… », avec l'unité de chaque axe.",
      ],
      exercices: [
        {
          enonce:
            "Dans un village de montagne, un thermomètre enregistre la température (en °C) de minuit à midi. On note $T(x)$ la température $x$ heures après minuit.\na) Quelle température fait-il à minuit ? À $10$ h ?\nb) À quelles heures fait-il $-3$ °C ?\nc) Quelle est la température la plus basse ? À quelle heure ?\nd) Traduire par une phrase l'égalité $T(8) = 0$.\ne) Quelle est l'image de $12$ par $T$ ?",
          figure: repere([0, 12, -6, 7], TEMPERATURE_9),
          correction:
            "a) Je pars de $0$, puis de $10$, sur l'axe horizontal (les heures) et je lis sur l'axe vertical : $T(0) = -1$ et $T(10) = 3$. Il fait $-1$ °C à minuit et $3$ °C à $10$ h.\nb) Je pars de $-3$ sur l'axe VERTICAL et je trace l'horizontale : elle coupe la courbe en $x = 4$ et en $x = 6$. Il fait $-3$ °C à $4$ h et à $6$ h.\nc) Le point le plus bas de la courbe est $(5\\,;\\,-4)$ : le minimum est $-4$ °C, atteint à $5$ h.\nd) $T(8) = 0$ : à $8$ h, il fait $0$ °C. Autrement dit, $0$ est l'image de $8$, et $8$ est un antécédent de $0$.\ne) $T(12) = 4$ : l'image de $12$ est $4$, il fait $4$ °C à midi.\n⛔ Le piège au b) : répondre « $-3$ ». Le $-3$ est dans la question ; la réponse est une HEURE, lue sur l'axe horizontal.\nRéponse : $-1$ °C et $3$ °C ; à $4$ h et à $6$ h ; $-4$ °C à $5$ h ; $4$ °C à midi.",
          schema: repere([0, 12, -6, 7], TEMPERATURE_9, [{ x: 4, y: -3 }, { x: 6, y: -3 }, { x: 5, y: -4 }, { x: 8, y: 0 }, { x: 10, y: 3 }], -3),
          micros: ["fonction_graphique", "fonction_image", "fonction_antecedent"],
        },
        {
          enonce:
            "Voici la courbe d'une fonction $f$. Vrai ou faux ? Justifier par une lecture.\na) L'image de $0$ est $-2$.\nb) $f(-2) = 0$.\nc) $4$ a exactement deux antécédents, $-2$ et $3$.\nd) $2$ est un antécédent de $0$.\ne) Le nombre $-3$ a un antécédent.",
          figure: repere([-3, 4, -4, 6], COURBE_10),
          correction:
            "a) VRAI. Je pars de $0$ sur l'axe horizontal : la courbe coupe l'axe vertical en $-2$, donc $f(0) = -2$.\nb) FAUX. Je pars de $-2$ sur l'axe horizontal et je monte jusqu'à la courbe : je lis $4$, donc $f(-2) = 4$.\nc) VRAI. L'horizontale $y = 4$ coupe la courbe en deux points, d'abscisses $-2$ et $3$, et nulle part ailleurs.\nd) VRAI. La courbe coupe l'axe des abscisses en $x = 2$ : $f(2) = 0$.\ne) FAUX. Le point le plus bas de la courbe est un peu au-dessus de $-3$ (vers $-2{,}25$) : l'horizontale $y = -3$ ne rencontre pas la courbe.\n⛔ Le piège au b) : on sait que $f(0) = -2$, et on retourne l'égalité en $f(-2) = 0$. Échanger les deux nombres échange l'image et l'antécédent : c'est une autre phrase, ici fausse.\nRéponse : vrai, faux, vrai, vrai, faux.",
          schema: repere([-3, 4, -4, 6], COURBE_10, [{ x: 0, y: -2 }, { x: -2, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 0 }], 4),
          micros: ["fonction_vocabulaire", "fonction_graphique"],
        },
        {
          enonce:
            "Dans un tableur, on a écrit des valeurs de $x$ dans la ligne 1, puis une formule dans la cellule B2, recopiée vers la droite.\na) Parmi ces trois formules, laquelle a été saisie en B2 ? « =2*B1 » ; « =B1*B1-2*B1 » ; « =B1*2+B1 ». Justifier.\nb) Compléter les deux cellules vides.\nc) Quelle est l'image de $10$ ?\nd) Lire dans le tableau les antécédents de $3$, puis ceux de $0$.",
          figure: tableau(["x", "−2", "−1", "0", "1", "2", "3"], ["f(x)", 8, 3, 0, "…", "…", 3]),
          correction:
            "a) Je teste chaque formule sur la colonne de $-2$, qui doit donner $8$.\n« =2*B1 » donne $2 \\times (-2) = -4$ : non.\n« =B1*B1-2*B1 » donne $(-2) \\times (-2) - 2 \\times (-2) = 4 + 4 = 8$ : oui.\n« =B1*2+B1 » donne $(-2) \\times 2 + (-2) = -6$ : non.\nLa formule est « =B1*B1-2*B1 », c'est-à-dire $f(x) = x^2 - 2x$. Je contrôle sur une autre colonne : $3^2 - 2 \\times 3 = 9 - 6 = 3$. ✓\nb) $f(1) = 1 - 2 = -1$ et $f(2) = 4 - 4 = 0$.\nc) $f(10) = 10^2 - 2 \\times 10 = 100 - 20 = 80$.\nd) $3$ apparaît sous $-1$ et sous $3$ : ce sont ses antécédents. $0$ apparaît sous $0$ et sous $2$.\n⛔ Le piège au a) : tester seulement la colonne de $0$. Les trois formules y donnent $0$ : une seule colonne ne départage rien, il faut en choisir une qui les sépare.\nRéponse : « =B1*B1-2*B1 » ; $-1$ et $0$ ; $f(10) = 80$ ; $-1$ et $3$, puis $0$ et $2$.",
          schema: tableau(["x", "−2", "−1", "0", "1", "2", "3"], ["f(x)", 8, 3, 0, -1, 0, 3]),
          micros: ["fonction_tableau", "fonction_image", "fonction_antecedent"],
        },
        {
          enonce:
            "Programme de calcul : « Choisir un nombre. Lui ajouter $2$. Élever le résultat au carré. Soustraire $9$. » On note $f(x)$ le résultat obtenu avec le nombre $x$.\na) Calculer $f(1)$ et $f(-5)$. Que peut-on dire du nombre $0$ ?\nb) Calculer $f(0{,}5)$.\nc) Quel résultat obtient-on en choisissant $-2$ ?\nd) Peut-on obtenir $-10$ comme résultat ? Justifier.",
          correction:
            "Je suis le programme étape par étape : ajouter $2$, élever au carré, soustraire $9$. Donc $f(x) = (x + 2)^2 - 9$.\na) $f(1) = (1 + 2)^2 - 9 = 9 - 9 = 0$ et $f(-5) = (-5 + 2)^2 - 9 = 9 - 9 = 0$. Deux nombres différents donnent $0$ : $0$ a deux antécédents, $1$ et $-5$.\nb) $f(0{,}5) = (0{,}5 + 2)^2 - 9 = 6{,}25 - 9 = -2{,}75$.\nc) $f(-2) = (-2 + 2)^2 - 9 = 0 - 9 = -9$.\nd) Non. Un carré n'est jamais négatif : $(x + 2)^2$ vaut au moins $0$, donc le résultat vaut au moins $-9$. Le nombre $-10$ n'a aucun antécédent.\n⛔ Le piège au a) : écrire $(-3)^2 = -9$. Un nombre négatif multiplié par lui-même donne un nombre POSITIF : $(-3)^2 = 9$.\nRéponse : $f(1) = f(-5) = 0$ ; $f(0{,}5) = -2{,}75$ ; $f(-2) = -9$ ; $-10$ est impossible.",
          schema: repere([-6, 2, -10, 4], [{ q: [1, 4, -5] }], [{ x: 1, y: 0 }, { x: -5, y: 0 }, { x: -2, y: -9, label: "−9" }]),
          micros: ["fonction_image", "fonction_antecedent", "fonction_defi"],
        },
        {
          enonce:
            "Le tableau donne la hauteur d'eau (en mètres) dans un port, $x$ heures après la marée basse. On note $H(x)$ cette hauteur.\na) Que vaut $H(4)$ ? Faire une phrase.\nb) Donner les antécédents de $7$ lus dans le tableau.\nc) Placer les points du tableau dans un repère et les relier.\nd) Un voilier a besoin d'au moins $7$ m d'eau pour entrer dans le port. Pendant combien de temps le peut-il ?\ne) Lire sur le graphique une valeur approchée de $H(5)$.",
          figure: tableau(["Heure", "0", "2", "4", "6", "8", "10", "12"], ["Hauteur (m)", 2, 4, 7, 8, 7, 4, 2], true),
          correction:
            "a) Sous $4$, je lis $7$ : $H(4) = 7$. Quatre heures après la marée basse, il y a $7$ m d'eau.\nb) Je cherche $7$ dans la ligne des hauteurs : il apparaît sous $4$ et sous $8$. Les antécédents de $7$ sont $4$ et $8$.\nc) Chaque colonne donne un point : $(0\\,;\\,2)$, $(2\\,;\\,4)$, $(4\\,;\\,7)$, et ainsi de suite. Je les relie dans l'ordre des heures.\nd) Sur le graphique, la courbe est au-dessus de l'horizontale $y = 7$ entre $x = 4$ et $x = 8$. Le voilier peut entrer de $4$ h à $8$ h après la marée basse, soit pendant $8 - 4 = 4$ heures.\ne) Je pars de $5$ sur l'axe horizontal : la courbe passe entre $7$ et $8$, vers $7{,}5$. Donc $H(5) \\approx 7{,}5$ m.\n⛔ Le piège au d) : répondre « $2$ fois », parce que $7$ a deux antécédents. La question demande une DURÉE : l'écart entre les deux antécédents.\nRéponse : $H(4) = 7$ ; $4$ et $8$ ; pendant $4$ heures ; $H(5) \\approx 7{,}5$ m.",
          schema: repere([0, 12, -1, 10], MAREE_13, [{ x: 4, y: 7 }, { x: 8, y: 7 }, { x: 6, y: 8, label: "pleine mer" }, { x: 5, y: 7.5 }], 7),
          micros: ["fonction_tableau", "fonction_graphique", "fonction_antecedent"],
        },
        {
          enonce:
            "Voici trois tableaux de valeurs, A, B et C.\na) Lequel est celui d'une fonction linéaire ? Donner sa formule.\nb) Montrer que le tableau B est celui d'une fonction affine, et trouver sa formule.\nc) Le tableau C est-il celui d'une fonction affine ?",
          figure: (
            <div className="grid gap-2">
              {tableau(["x", "1", "2", "3"], ["A", 3, 6, 9])}
              {tableau(["x", "1", "2", "3"], ["B", 4, 6, 8])}
              {tableau(["x", "1", "2", "3"], ["C", 1, 4, 9])}
            </div>
          ),
          correction:
            "a) Une fonction linéaire donne un tableau de proportionnalité : je divise chaque image par son $x$. Tableau A : $3 \\div 1 = 3$, $6 \\div 2 = 3$, $9 \\div 3 = 3$. Toujours $3$ : c'est la fonction linéaire $x \\mapsto 3x$.\nTableau B : $4 \\div 1 = 4$ mais $6 \\div 2 = 3$ : pas proportionnel, donc pas linéaire.\nb) Dans B, quand $x$ augmente de $1$, l'image augmente toujours de $2$ : $a = 2$. Je redescends d'un cran pour trouver l'image de $0$ : $4 - 2 = 2$, donc $b = 2$. La formule est $x \\mapsto 2x + 2$. Vérification : $2 \\times 3 + 2 = 8$. ✓\nc) Dans C, les images augmentent de $3$, puis de $5$ : le pas n'est pas constant, donc pas affine. C'est $x \\mapsto x^2$.\nSur le schéma : A en bleu passe par l'origine, B en orange coupe l'axe vertical en $2$, C en vert est courbe.\n⛔ Le piège : dire que B est linéaire parce qu'il « augmente régulièrement ». Augmenter d'un pas constant, c'est AFFINE ; être proportionnel, c'est LINÉAIRE — et la droite de B ne passe pas par l'origine.\nRéponse : A est linéaire, $x \\mapsto 3x$ ; B est affine, $x \\mapsto 2x + 2$ ; C n'est pas affine.",
          schema: repere(
            [-1, 4, -1, 10],
            [{ q: [0, 3, 0] }, { q: [0, 2, 2], couleur: ORANGE }, { q: [1, 0, 0], couleur: VERT }],
            [{ x: 1, y: 3 }, { x: 2, y: 6 }, { x: 3, y: 9 }, { x: 1, y: 4 }, { x: 3, y: 8 }, { x: 1, y: 1 }, { x: 2, y: 4 }],
          ),
          micros: ["fonction_affine_lineaire", "fonction_tableau"],
        },
        {
          enonce:
            "Soit $f(x) = x^2 - 6x + 10$.\na) Calculer $f(0)$, $f(3)$ et $f(6)$.\nb) Montrer que $f(x) = (x - 3)^2 + 1$.\nc) En déduire que $f(x)$ vaut toujours au moins $1$. Le nombre $0$ a-t-il un antécédent ?\nd) Trouver les antécédents de $5$.",
          correction:
            "a) $f(0) = 0 - 0 + 10 = 10$ ; $f(3) = 9 - 18 + 10 = 1$ ; $f(6) = 36 - 36 + 10 = 10$.\nb) Je développe avec l'identité $(a - b)^2 = a^2 - 2ab + b^2$ : $(x - 3)^2 + 1 = x^2 - 6x + 9 + 1 = x^2 - 6x + 10$. C'est bien $f(x)$.\nc) Un carré est toujours positif ou nul : $(x - 3)^2 \\geqslant 0$, donc $f(x) \\geqslant 1$. Le résultat ne descend jamais sous $1$ : $0$ n'a AUCUN antécédent. Et $1$ n'en a qu'un, $3$, le seul nombre qui annule $(x - 3)^2$.\nd) Je résous $(x - 3)^2 + 1 = 5$, soit $(x - 3)^2 = 4$. Deux nombres ont pour carré $4$ : $2$ et $-2$. Donc $x - 3 = 2$ ou $x - 3 = -2$, c'est-à-dire $x = 5$ ou $x = 1$. Vérification : $f(5) = 25 - 30 + 10 = 5$. ✓\n⛔ Le piège au d) : oublier $x - 3 = -2$ et ne trouver que $5$. Le nombre $5$ a DEUX antécédents : sur la courbe, l'horizontale $y = 5$ la coupe deux fois.\nRéponse : $10$, $1$ et $10$ ; $0$ n'a pas d'antécédent ; les antécédents de $5$ sont $1$ et $5$.",
          schema: repere([-1, 7, -1, 11], [{ q: [1, -6, 10] }], [{ x: 3, y: 1, label: "minimum" }, { x: 1, y: 5 }, { x: 5, y: 5 }], 5),
          micros: ["fonction_defi", "fonction_image", "fonction_antecedent"],
        },
        {
          enonce:
            "Une fonction associe à chaque nombre UN SEUL nombre. Chaque procédé est-il une fonction ?\na) À un nombre, on associe son triple diminué de $1$.\nb) À un nombre positif, on associe les nombres dont il est le carré.\nc) Le tableau ci-dessous.\nd) À un nombre, on associe son carré. Ici, $4$ a deux antécédents : est-ce gênant ?",
          figure: tableau(["x", "1", "2", "2", "3"], ["y", 5, 6, 7, 8]),
          correction:
            "Je cherche, pour chaque procédé, un nombre de départ qui donnerait DEUX résultats.\na) Oui. Un nombre n'a qu'un seul triple, donc un seul « triple moins $1$ » : c'est la fonction $x \\mapsto 3x - 1$.\nb) Non. Au nombre $9$, on associerait $3$ et $-3$, car $3^2 = 9$ et $(-3)^2 = 9$ : deux résultats pour un seul départ.\nc) Non. Le nombre $2$ apparaît deux fois dans la première ligne, avec $6$ puis avec $7$ : il aurait deux images.\nd) Oui, c'est une fonction, et ce n'est pas gênant : $2$ et $-2$ donnent tous les deux $4$, mais chacun ne donne qu'UN résultat. Deux antécédents pour un même nombre, c'est permis ; deux images pour un même nombre, c'est interdit.\n⛔ Le piège : confondre les deux sens. « Un nombre a deux antécédents » est normal (la courbe du d) descend puis remonte) ; « un nombre a deux images » est impossible pour une fonction.\nRéponse : oui ; non ; non ; oui.",
          schema: repere([-3, 3, -2, 8], [{ q: [1, 0, 0] }], [{ x: -2, y: 4 }, { x: 2, y: 4 }], 4),
          micros: ["fonction_vocabulaire", "fonction_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je repère ce qui entre et ce qui sort, je lis ou je calcule, puis je réponds par une phrase.",
      rappel: [
        "Je lis l'énoncé en me demandant : me donne-t-on ce qui ENTRE (je cherche une image) ou ce qui SORT (je cherche des antécédents) ?",
        "Un antécédent se cherche partout : sur toute la courbe, dans tout le tableau. Il y en a souvent plusieurs.",
        "Je réponds par une phrase, avec les unités des deux axes.",
      ],
      exercices: [
        {
          titre: "Le dégagement du gardien",
          enonce:
            "Un gardien dégage le ballon. Sa hauteur (en mètres), $t$ secondes après le coup de pied, est $h(t) = -5t^2 + 15t$.\na) Calculer $h(1)$ et $h(2)$. Que remarque-t-on ?\nb) Au bout de combien de temps le ballon retombe-t-il au sol ?\nc) Le point le plus haut semble atteint à $1{,}5$ s. Calculer $h(1{,}5)$.\nd) Pendant combien de temps le ballon est-il à plus de $10$ m de haut ?",
          figure: repere([0, 3, -2, 13], [{ q: [-5, 15, 0] }]),
          correction:
            "a) Je remplace $t$ par le nombre : $h(1) = -5 \\times 1^2 + 15 \\times 1 = -5 + 15 = 10$ et $h(2) = -5 \\times 2^2 + 15 \\times 2 = -20 + 30 = 10$. Même hauteur, $10$ m, à $1$ s et à $2$ s : $10$ a deux antécédents, parce que le ballon monte puis redescend.\nb) Au sol, la hauteur vaut $0$ : je cherche les antécédents de $0$. $h(0) = 0$, c'est le coup de pied ; et $h(3) = -5 \\times 3^2 + 15 \\times 3 = -45 + 45 = 0$. Le ballon retombe au bout de $3$ s.\nc) $h(1{,}5) = -5 \\times 1{,}5^2 + 15 \\times 1{,}5 = -11{,}25 + 22{,}5 = 11{,}25$. Le ballon monte à $11{,}25$ m.\nd) Sur la courbe, le ballon est au-dessus de l'horizontale $y = 10$ entre $t = 1$ et $t = 2$ : pendant $1$ seconde.\n⛔ Le piège au a) : calculer $-5 \\times 1^2$ comme $(-5 \\times 1)^2 = 25$. Le carré porte sur $t$ seulement ; le $-5$ multiplie après.\nRéponse : $h(1) = h(2) = 10$ ; au sol au bout de $3$ s ; $11{,}25$ m au plus haut ; $1$ s au-dessus de $10$ m.",
          schema: repere([0, 3, -2, 13], [{ q: [-5, 15, 0] }], [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 1.5, y: 11.25 }, { x: 3, y: 0 }], 10),
          micros: ["fonction_image", "fonction_antecedent", "fonction_graphique"],
        },
        {
          titre: "La randonnée en boucle",
          enonce:
            "Une randonnée en boucle fait $10$ km. La courbe donne l'altitude (axe vertical, en CENTAINES de mètres) en fonction de la distance parcourue (axe horizontal, en km). On note $A$ cette fonction.\na) Quelle est l'altitude du départ ? Et celle de l'arrivée ? Pourquoi est-ce logique ?\nb) Que vaut $A(4)$ ? Que représente ce point ?\nc) À quelles distances la randonneuse est-elle à $1\\,000$ m d'altitude ?\nd) Elle part à $8$ h et marche à $4$ km/h. À quelle heure passe-t-elle au sommet ?\ne) Calculer le dénivelé positif, c'est-à-dire le total des montées.",
          figure: repere([0, 10, -1, 13], ALTITUDE_18),
          correction:
            "⭐ L'axe vertical compte des centaines de mètres : $6$ sur l'axe, c'est $600$ m.\na) $A(0) = 6$ et $A(10) = 6$ : elle part et arrive à $600$ m. C'est une boucle, elle revient à son point de départ.\nb) $A(4) = 11$ : c'est le point le plus haut de la courbe, le sommet, à $1\\,100$ m, atteint au bout de $4$ km.\nc) $1\\,000$ m, c'est $10$ sur l'axe vertical. L'horizontale $y = 10$ coupe la courbe TROIS fois : en $x = 3$, $x = 5$ et $x = 8$. Elle est à $1\\,000$ m au kilomètre $3$ (en montant), au kilomètre $5$ (en redescendant) et au kilomètre $8$ (après une seconde montée).\nd) Le sommet est au kilomètre $4$. À $4$ km/h, parcourir $4$ km prend $1$ heure : elle y passe à $9$ h.\ne) Elle monte de $600$ m à $1\\,100$ m entre les kilomètres $0$ et $4$, soit $500$ m, puis de $900$ m à $1\\,000$ m entre les kilomètres $6$ et $8$, soit $100$ m. Dénivelé positif : $500 + 100 = 600$ m.\n⛔ Le piège au c) : s'arrêter aux deux premiers points. Ici $10$ a trois antécédents : je suis l'horizontale jusqu'au bout.\nRéponse : $600$ m au départ et à l'arrivée ; le sommet à $1\\,100$ m au kilomètre $4$ ; aux kilomètres $3$, $5$ et $8$ ; à $9$ h ; $600$ m de dénivelé positif.",
          schema: repere([0, 10, -1, 13], ALTITUDE_18, [{ x: 3, y: 10 }, { x: 5, y: 10 }, { x: 8, y: 10 }, { x: 4, y: 11 }], 10),
          micros: ["fonction_graphique", "fonction_antecedent", "fonction_defi"],
        },
        {
          titre: "La boîte sans couvercle",
          enonce:
            "Dans une feuille carrée de $12$ cm de côté, on découpe un carré de côté $x$ cm à chaque coin, puis on replie les bords : on obtient une boîte sans couvercle, de volume $V(x) = x(12 - 2x)^2$ en cm³.\na) Calculer $V(1)$, $V(2)$ et $V(3)$, puis compléter le tableau.\nb) Pourquoi $x$ doit-il rester inférieur à $6$ ?\nc) Parmi les valeurs du tableau, laquelle donne la plus grande boîte ?\nd) Combien de valeurs de $x$ donnent un volume de $108$ cm³ ?",
          figure: tableau(["x (cm)", "0", "1", "2", "3", "4", "5", "6"], ["V (cm³)", 0, "…", "…", "…", 64, 20, 0], true),
          correction:
            "a) Je calcule la parenthèse, puis son carré, puis je multiplie par $x$.\n$V(1) = 1 \\times (12 - 2)^2 = 1 \\times 100 = 100$.\n$V(2) = 2 \\times (12 - 4)^2 = 2 \\times 64 = 128$.\n$V(3) = 3 \\times (12 - 6)^2 = 3 \\times 36 = 108$.\nb) Le fond de la boîte est un carré de côté $12 - 2x$ : à $x = 6$, il vaut $0$ et la boîte est aplatie ; au-delà, on découperait plus que la feuille.\nc) La plus grande valeur de la ligne des volumes est $128$, sous $x = 2$ : la plus grande boîte du tableau fait $128$ cm³.\nd) $V(3) = 108$ : $3$ est un antécédent. Mais $V(1) = 100$ et $V(2) = 128$ : en passant de $1$ à $2$, le volume passe par $108$. Il y a donc un deuxième antécédent de $108$, entre $1$ et $2$. Deux valeurs de $x$ conviennent.\nSur le schéma, l'axe vertical compte des DIZAINES de cm³ : l'horizontale à $10{,}8$, soit $108$ cm³, coupe la courbe deux fois.\n⛔ Le piège au a) : calculer $1 \\times 12 - 2^2$. La parenthèse d'abord : $12 - 2 \\times 1 = 10$, puis $10^2 = 100$.\nRéponse : $100$, $128$ et $108$ cm³ ; $x = 2$ donne la plus grande boîte du tableau ; deux valeurs de $x$ donnent $108$ cm³.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableau(["x (cm)", "0", "1", "2", "3", "4", "5", "6"], ["V (cm³)", 0, 100, 128, 108, 64, 20, 0], true)}
              {repere([0, 6, -2, 15], [{ p: [0.4, -4.8, 14.4, 0] }], [{ x: 1, y: 10 }, { x: 2, y: 12.8 }, { x: 3, y: 10.8 }], 10.8)}
            </div>
          ),
          micros: ["fonction_image", "fonction_tableau", "fonction_antecedent", "fonction_defi"],
        },
        {
          titre: "La crue après l'orage",
          enonce:
            "Après un orage, on mesure la hauteur d'eau d'une rivière (en mètres) pendant $12$ heures. On note $H(t)$ la hauteur $t$ heures après le début de l'orage.\na) Que vaut $H(0)$ ? Quelle est la hauteur maximale, et quand est-elle atteinte ?\nb) Traduire par une phrase : $H(8) = 4$.\nc) Donner les antécédents de $6$.\nd) La vigilance crue est déclenchée quand l'eau atteint $5$ m. Combien de temps dure-t-elle ?\ne) Un journaliste écrit : « la rivière a mis autant de temps à monter qu'à redescendre ». Qu'en penser ?",
          figure: repere([0, 12, -1, 9], CRUE_20),
          correction:
            "a) $H(0) = 1$ : au début, l'eau est à $1$ m. Le point le plus haut est $(4\\,;\\,7)$ : la hauteur maximale est $7$ m, atteinte $4$ h après le début de l'orage.\nb) $8$ heures après le début de l'orage, l'eau est à $4$ m de haut. $4$ est l'image de $8$, et $8$ un antécédent de $4$.\nc) L'horizontale $y = 6$ coupe la courbe en $t = 3$ et en $t = 5$ : les antécédents de $6$ sont $3$ et $5$.\nd) Je trace l'horizontale $y = 5$. Elle coupe la courbe en montée à $t = 2{,}5$ (à mi-chemin entre $4$ m à $2$ h et $6$ m à $3$ h), et en descente à $t = 6$. Entre les deux, l'eau est au-dessus de $5$ m : la vigilance dure $6 - 2{,}5 = 3{,}5$ heures, soit $3$ h $30$ min.\ne) La rivière monte de $t = 0$ à $t = 4$ : $4$ heures. Elle redescend à $1$ m de $t = 4$ à $t = 12$ : $8$ heures. Elle a mis deux fois plus de temps à redescendre : le journaliste se trompe.\n⛔ Le piège au d) : partir de $5$ sur l'axe horizontal. Le $5$ de la question est une HAUTEUR, en mètres : je pars de l'axe vertical, et je lis des heures.\nRéponse : $1$ m au départ et $7$ m au plus haut, à $4$ h ; les antécédents de $6$ sont $3$ et $5$ ; la vigilance dure $3$ h $30$ min ; la décrue dure deux fois plus longtemps que la montée.",
          schema: repere([0, 12, -1, 9], CRUE_20, [{ x: 2.5, y: 5 }, { x: 6, y: 5 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 7 }], [5, 6]),
          micros: ["fonction_graphique", "fonction_antecedent", "fonction_vocabulaire"],
        },
      ],
    },
  ],
};
