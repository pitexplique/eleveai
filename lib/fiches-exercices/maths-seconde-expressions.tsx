// ─── Fiche d'exercices : les expressions littérales (seconde) — 20 exercices ───
//
// Cinquième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/expressions-litterales.bank.ts`
// (notionId expressions_litterales_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-expressions.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni ses programmes de
// calcul, ni A = bh/2, ni y = 3x − 6), ni des feuilles voisines.
//
// ⭐ LE FIL, CELUI DE LA FICHE, ET IL EST ASYMÉTRIQUE : pour RÉFUTER une
// égalité, un seul contre-exemple suffit ; pour la DÉMONTRER, aucun nombre
// d'exemples ne suffit, il faut la lettre (exercices 8, 10, 11, 17, 19). Le
// piège de l'exercice 8 le rend concret : x = 1 fait passer une égalité fausse.
//
// ⛔ LE PIÈGE CENTRAL, celui de la fiche : substituer un négatif sans
// parenthèses (exercices 4 et 13 : −x² pour x = −2).
//
// ⭐ La Réunion au réel : la TVA à 8,5 % (taux normal des DOM), 30 °C à
// Saint-Pierre.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-expressions.mjs`.
//
// Micro-compétences : expr_modeliser (1, 2, 9, 16, 17, 18, 19, 20),
// expr_exprimer_variable (6, 7, 14, 15, 20), expr_reduire_substituer (3, 4, 5,
// 8, 10, 11, 12, 13, 17, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (x², pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesExpressionsSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "expressions-litterales-2de",
  titre: "Les expressions littérales",
  accroche:
    "Vingt exercices, du calcul seul au problème : traduire une phrase, réduire, remplacer une lettre par un nombre, isoler une lettre dans une formule. Et surtout : prouver avec une lettre ce qu'aucun exemple ne prouve. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/expressions-litterales-2de", titre: "Les expressions littérales" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : traduire, réduire, remplacer ou isoler.",
      rappel: [
        "TRADUIRE : « le triple de x augmenté de 1 » s'écrit $3x + 1$ ; « le triple de la somme de x et de 1 » s'écrit $3(x + 1)$. Les parenthèses disent sur quoi porte le mot.",
        "RÉDUIRE : on regroupe les termes de même nature — les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble.",
        "REMPLACER : on met la valeur ENTRE PARENTHÈSES. Pour $x = -3$ : $x^2 = (-3)^2 = 9$.",
      ],
      exercices: [
        {
          enonce: "Écrire chaque phrase sous forme d'expression.\na) Le double de $x$, diminué de $5$.\nb) Le double de la différence de $x$ et de $5$.\nc) Le carré de $x$, augmenté de $1$.\nd) Le carré de la somme de $x$ et de $1$.",
          correction:
            "On cherche sur quoi porte chaque mot : s'il porte sur une somme ou une différence entière, il faut des parenthèses.\na) On prend le double, puis on retire $5$ : $2x - 5$.\nb) « Le double de » porte sur toute la différence : $2(x - 5)$.\nc) On prend le carré, puis on ajoute $1$ : $x^2 + 1$.\nd) « Le carré de » porte sur toute la somme : $(x + 1)^2$.\n⛔ Le piège : écrire $2x - 5$ au b). Pour $x = 10$, $2x - 5 = 15$ mais $2(x - 5) = 10$ : ce ne sont pas les mêmes nombres.",
          micros: ["expr_modeliser"],
        },
        {
          enonce: "Un rectangle a pour largeur $x$ cm et pour longueur $x + 4$ cm.\na) Exprimer son périmètre, sous forme réduite.\nb) Exprimer son aire, sous forme développée.",
          correction:
            "a) Le périmètre, c'est deux fois la somme de la longueur et de la largeur : $2[(x + 4) + x] = 2(2x + 4) = 4x + 8$.\nb) L'aire, c'est la longueur fois la largeur : $x(x + 4) = x^2 + 4x$.\n⛔ Le piège au a) : oublier les crochets et écrire $2 \\times x + 4 + x$. Le « deux fois » porte sur TOUTE la somme.",
          micros: ["expr_modeliser"],
        },
        {
          enonce: "Réduire.\na) $5x - 3 + 2x + 8$\nb) $4x^2 + 3x - x^2 - 5x$\nc) $2x \\times 3x$\nd) $x + x + x$, puis $x \\times x \\times x$",
          correction:
            "Dans une somme, on regroupe les termes de même nature. Dans un produit, on multiplie les nombres entre eux et les lettres entre elles.\na) $5x - 3 + 2x + 8 = 5x + 2x - 3 + 8 = 7x + 5$.\nb) $4x^2 + 3x - x^2 - 5x = 4x^2 - x^2 + 3x - 5x = 3x^2 - 2x$.\nc) $2x \\times 3x = 2 \\times 3 \\times x \\times x = 6x^2$.\nd) $x + x + x = 3x$, mais $x \\times x \\times x = x^3$.\n⛔ Le piège au b) : réunir $3x^2$ et $-2x$ en un seul terme. Des $x^2$ et des $x$ ne s'additionnent pas, comme on n'additionne pas des m² et des m.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Calculer $A = 3x^2 - 2x + 1$ pour :\na) $x = 2$\nb) $x = -1$\nc) $x = 0$",
          correction:
            "On remplace $x$ par sa valeur, ENTRE PARENTHÈSES. Puis on respecte les priorités : la puissance, puis les produits, puis les sommes.\na) $3 \\times 2^2 - 2 \\times 2 + 1 = 12 - 4 + 1 = 9$.\nb) $3 \\times (-1)^2 - 2 \\times (-1) + 1 = 3 + 2 + 1 = 6$.\nc) $3 \\times 0^2 - 2 \\times 0 + 1 = 1$.\n⛔ Le piège au b) : écrire $3 \\times (-1)^2 = -3$. Un carré n'est jamais négatif : $(-1)^2 = 1$.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Calculer $E = (x - 3)(2x + 1)$ pour $x = -2$, puis pour $x = 3$.",
          correction:
            "On calcule chaque parenthèse, puis on multiplie.\nPour $x = -2$ : $x - 3 = -5$ et $2x + 1 = -3$. Donc $E = (-5) \\times (-3) = 15$.\nPour $x = 3$ : $x - 3 = 0$, donc $E = 0 \\times 7 = 0$.\n⭐ Pour $x = 3$, un facteur est nul : le produit est nul, sans même calculer l'autre facteur.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Isoler la lettre demandée.\na) Dans $d = v \\times t$, exprimer $t$ en fonction de $d$ et de $v$.\nb) Dans $P = 2(L + \\ell)$, exprimer $L$ en fonction de $P$ et de $\\ell$.\nc) Dans $C = 2\\pi r$, exprimer $r$ en fonction de $C$.",
          correction:
            "On isole la lettre en défaisant les opérations, dans l'ordre inverse.\na) $t$ est multiplié par $v$ : on divise par $v$. $t = \\dfrac{d}{v}$.\nb) On divise d'abord par $2$ : $\\dfrac{P}{2} = L + \\ell$. Puis on retire $\\ell$ : $L = \\dfrac{P}{2} - \\ell$.\nc) $r$ est multiplié par $2\\pi$ : on divise par $2\\pi$. $r = \\dfrac{C}{2\\pi}$.\n⛔ Le piège au b) : écrire $L = P - 2\\ell$. Il faut d'abord défaire le « fois $2$ », qui porte sur toute la parenthèse.",
          micros: ["expr_exprimer_variable"],
        },
        {
          enonce: "Exprimer $x$ en fonction de $y$.\na) $y = 5x - 3$\nb) $y = -2x + 8$",
          correction:
            "a) On ajoute $3$ des deux côtés : $y + 3 = 5x$. Puis on divise par $5$ : $x = \\dfrac{y + 3}{5}$.\nb) On retire $8$ : $y - 8 = -2x$. Puis on divise par $-2$ : $x = \\dfrac{y - 8}{-2} = \\dfrac{8 - y}{2}$.\n⭐ On vérifie avec un nombre. Au a), $x = 2$ donne $y = 7$, et $\\dfrac{7 + 3}{5} = 2$. ✓\n⛔ Le piège au a) : retirer $3$ au lieu de l'ajouter. Pour défaire « $- 3$ », on ajoute $3$.",
          micros: ["expr_exprimer_variable"],
        },
        {
          enonce: "Vrai ou faux pour tout nombre $x$ ? Justifier.\na) $3x + 2x = 5x$\nb) $3x \\times 2x = 6x$\nc) $(2x)^2 = 2x^2$\nd) $x + 3 - (x - 3) = 6$",
          correction:
            "a) VRAI. On réduit : $3x + 2x = 5x$, pour tout $x$.\nb) FAUX. En réalité $3x \\times 2x = 6x^2$. Contre-exemple : pour $x = 2$, $3 \\times 2 \\times 2 \\times 2 = 24$, mais $6 \\times 2 = 12$.\nc) FAUX. En réalité $(2x)^2 = 4x^2$. Contre-exemple : pour $x = 1$, $(2 \\times 1)^2 = 4$, mais $2 \\times 1^2 = 2$.\nd) VRAI. $x + 3 - (x - 3) = x + 3 - x + 3 = 6$, pour tout $x$.\n⛔ Le piège au b) : tester avec $x = 1$. On trouve $6$ des deux côtés, et on croit l'égalité vraie. Un essai qui réussit ne prouve rien.",
          micros: ["expr_reduire_substituer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. On nomme la lettre, on écrit l'expression, on réduit, puis on conclut.",
      rappel: [
        "Pour RÉFUTER une égalité, un seul contre-exemple suffit. Pour la DÉMONTRER, aucun exemple ne suffit : on calcule avec la lettre.",
        "ISOLER une lettre : on fait la même opération des deux côtés, en défaisant les calculs dans l'ordre inverse.",
        "Un programme de calcul se traduit ligne par ligne : chaque étape s'applique au résultat PRÉCÉDENT, donc on l'écrit entre parenthèses.",
      ],
      exercices: [
        {
          enonce: "On prend trois entiers qui se suivent. Le plus petit s'appelle $n$.\na) Écrire les deux autres en fonction de $n$.\nb) Exprimer leur somme, sous forme réduite.\nc) Montrer que cette somme est toujours un multiple de $3$.\nd) Trouver les trois entiers dont la somme vaut $150$.",
          correction:
            "a) Les deux suivants sont $n + 1$ et $n + 2$.\nb) $n + (n + 1) + (n + 2) = 3n + 3$.\nc) $3n + 3 = 3(n + 1)$ : c'est $3$ fois un entier, donc un multiple de $3$.\nd) $3n + 3 = 150$, donc $3n = 147$ et $n = 49$. Les trois entiers sont $49$, $50$ et $51$.\n⭐ Au c), $n + 1$ est l'entier du milieu : la somme vaut trois fois celui du milieu. Vérification : $3 \\times 50 = 150$. ✓",
          micros: ["expr_modeliser"],
        },
        {
          // ⚠️ MESURÉ EN MODE CLASSE (21/09) : en cinq puces, le programme était
          // répété sur les deux diapos (a et b) et la diapo du b) débordait de
          // 259 px à 1280 × 800. Sur une ligne, il tient.
          enonce: "Programme : choisir un nombre ; le multiplier par $4$ ; ajouter $8$ ; diviser le résultat par $2$ ; retirer le double du nombre de départ.\na) Tester avec $3$, puis avec $-7$.\nb) Démontrer ce que l'on remarque.",
          correction:
            "a) Avec $3$ : $3 \\times 4 = 12$, puis $12 + 8 = 20$, puis $20 \\div 2 = 10$, puis $10 - 6 = 4$.\nAvec $-7$ : $-28$, puis $-20$, puis $-10$, puis $-10 - (-14) = 4$.\nOn trouve $4$ les deux fois.\nb) On appelle $x$ le nombre de départ. Le programme calcule $\\dfrac{4x + 8}{2} - 2x$.\n$\\dfrac{4x + 8}{2} = 2x + 4$, donc le résultat vaut $2x + 4 - 2x = 4$.\nLe programme donne toujours $4$, quel que soit le nombre choisi.\n⛔ Le piège : ne diviser que le $8$ par $2$, et écrire $4x + 4$. La division porte sur toute la somme.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Vrai ou faux ? Justifier.\na) Pour tout nombre $x$ : $2x > x$.\nb) Pour tout nombre $x$ : $x^2 \\geqslant x$.\nc) Pour tout nombre $x$ : $x^2 \\geqslant 0$.",
          correction:
            "a) FAUX. Contre-exemple : pour $x = -1$, $2x = -2$, qui est plus petit que $-1$.\nb) FAUX. Contre-exemple : pour $x = 0{,}5$, $x^2 = 0{,}25$, qui est plus petit que $0{,}5$.\nc) VRAI. Un carré est le produit d'un nombre par lui-même : deux facteurs de même signe, donc un résultat positif ou nul. Aucun essai n'aurait suffi à le prouver.\n⭐ Pour dire FAUX, un contre-exemple suffit. Pour dire VRAI, il faut une raison qui vaut pour tous les nombres.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Réduire $A = 3(x - 2) + 2(4 - x) - x$. Que remarque-t-on ?",
          correction:
            "On développe, puis on regroupe.\n$A = 3x - 6 + 8 - 2x - x$.\nLes $x$ : $3x - 2x - x = 0$. Les nombres : $-6 + 8 = 2$.\nDonc $A = 2$ : l'expression vaut $2$ pour TOUT nombre $x$.\n⭐ On le vérifie avec $x = 10$ : $3 \\times 8 + 2 \\times (-6) - 10 = 24 - 12 - 10 = 2$. ✓",
          micros: ["expr_reduire_substituer"],
        },
        {
          // ⚠️ Découpé en a), b), c) après la mesure du mode classe (21/09) : sans
          // lettres, les six lignes du corrigé tenaient sur UNE diapo (169 px de trop).
          enonce: "Calculer $B = -x^2 + 3x - 2$ pour :\na) $x = -2$\nb) $x = 1$\nc) $x = 2$",
          correction:
            "On remplace $x$ entre parenthèses. Attention : $-x^2$, c'est l'OPPOSÉ du carré.\na) $B = -(-2)^2 + 3 \\times (-2) - 2 = -4 - 6 - 2 = -12$.\n⛔ Le piège : écrire $-x^2 = 4$. On élève d'abord au carré, $(-2)^2 = 4$, PUIS on prend l'opposé : $-4$.\nb) $B = -1 + 3 - 2 = 0$.\nc) $B = -4 + 6 - 2 = 0$.\n⭐ $B$ s'annule pour $x = 1$ et pour $x = 2$. On retrouvera ces deux nombres en factorisant : $B = -(x - 1)(x - 2)$.",
          micros: ["expr_reduire_substituer"],
        },
        {
          enonce: "Pour passer des degrés Celsius $C$ aux degrés Fahrenheit $F$, on utilise $F = 1{,}8C + 32$.\na) Il fait $30$ °C à Saint-Pierre. Combien de degrés Fahrenheit ?\nb) Exprimer $C$ en fonction de $F$.\nc) L'eau bout à $212$ °F. Combien de degrés Celsius ?\nd) Pour quelle température les deux thermomètres affichent-ils le même nombre ?",
          correction:
            "a) $F = 1{,}8 \\times 30 + 32 = 54 + 32 = 86$ °F.\nb) On retire $32$, puis on divise par $1{,}8$ : $C = \\dfrac{F - 32}{1{,}8}$.\nc) $C = \\dfrac{212 - 32}{1{,}8} = \\dfrac{180}{1{,}8} = 100$ °C.\nd) On cherche $C$ tel que $1{,}8C + 32 = C$. Donc $0{,}8C = -32$ et $C = -40$. À $-40$ degrés, les deux échelles affichent le même nombre.\n⛔ Le piège au b) : diviser avant de retirer. $\\dfrac{F}{1{,}8} - 32$ défait les opérations dans le mauvais ordre.",
          micros: ["expr_exprimer_variable"],
        },
        {
          enonce: "L'aire d'un trapèze vaut $A = \\dfrac{(B + b) \\times h}{2}$, où $B$ et $b$ sont les deux bases et $h$ la hauteur.\na) Exprimer $h$ en fonction de $A$, $B$ et $b$.\nb) Un trapèze a une aire de $30$ cm², avec $B = 8$ cm et $b = 4$ cm. Calculer sa hauteur.\nc) Exprimer $B$ en fonction de $A$, $h$ et $b$.",
          correction:
            "a) On défait dans l'ordre inverse : on multiplie par $2$, puis on divise par $(B + b)$. $h = \\dfrac{2A}{B + b}$.\nb) $h = \\dfrac{2 \\times 30}{8 + 4} = \\dfrac{60}{12} = 5$ cm.\nc) On multiplie par $2$, on divise par $h$, puis on retire $b$ : $B = \\dfrac{2A}{h} - b$.\n⭐ On vérifie le c) avec les nombres du b) : $\\dfrac{2 \\times 30}{5} - 4 = 12 - 4 = 8$. On retrouve bien $B = 8$. ✓",
          micros: ["expr_exprimer_variable"],
        },
        {
          enonce: "Pour louer un vélo, deux loueurs proposent :\n• loueur A : $5$ € de frais fixes, puis $2$ € par heure ;\n• loueur B : $3{,}50$ € par heure, sans frais fixes.\na) Exprimer le prix $A(x)$ et le prix $B(x)$ pour $x$ heures.\nb) Calculer les deux prix pour $2$ h, puis pour $4$ h.\nc) Pour quelle durée les deux prix sont-ils égaux ?",
          correction:
            "a) $A(x) = 5 + 2x$ et $B(x) = 3{,}5x$.\nb) Pour $2$ h : $A(2) = 5 + 4 = 9$ € et $B(2) = 7$ €. Le loueur B est moins cher.\nPour $4$ h : $A(4) = 5 + 8 = 13$ € et $B(4) = 14$ €. Le loueur A est moins cher.\nc) $5 + 2x = 3{,}5x$, donc $5 = 1{,}5x$ et $x = \\dfrac{5}{1{,}5} = \\dfrac{10}{3}$ h, soit $3$ h $20$ min.\n⭐ Avant $3$ h $20$, le loueur B est moins cher ; après, c'est le loueur A.",
          schema: tableau("Deux loueurs", ["2 h", "4 h"], [
            { label: "Loueur A : 5 + 2x", values: ["9 €", "13 €"] },
            { label: "Loueur B : 3,5x", values: ["7 €", "14 €"] },
          ]),
          micros: ["expr_modeliser"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes. On nomme la lettre, on calcule avec elle, et on conclut par une phrase.",
      rappel: [
        "On nomme l'inconnue, on écrit l'expression, on la réduit, puis on répond à la question posée.",
        "Un carré est toujours positif ou nul : $(x - a)^2 \\geqslant 0$ pour tout nombre $x$.",
      ],
      exercices: [
        {
          titre: "Le tour de magie",
          enonce: "« Pense à un nombre. Ajoute $7$. Multiplie par $2$. Retire $4$. Divise par $2$. Retire le nombre pensé. Tu trouves $5$ ! »\na) Tester avec $10$, puis avec $-3$.\nb) Écrire le calcul avec une lettre, et le réduire.\nc) Expliquer le tour.",
          correction:
            "a) Avec $10$ : $17$, puis $34$, puis $30$, puis $15$, puis $15 - 10 = 5$.\nAvec $-3$ : $4$, puis $8$, puis $4$, puis $2$, puis $2 - (-3) = 5$.\nb) Avec $x$ : $\\dfrac{2(x + 7) - 4}{2} - x$.\n$2(x + 7) - 4 = 2x + 14 - 4 = 2x + 10$, puis $\\dfrac{2x + 10}{2} = x + 5$, puis $x + 5 - x = 5$.\nc) Le nombre pensé est ajouté au début, puis retiré à la fin : il disparaît. Il ne reste que les nombres du magicien, et ils font toujours $5$.\n⛔ Le piège : conclure après les deux essais du a). C'est le b) qui prouve le tour pour tous les nombres.",
          micros: ["expr_modeliser", "expr_reduire_substituer"],
        },
        {
          titre: "Une ficelle de 40 cm",
          enonce: "Avec une ficelle de $40$ cm, on forme un rectangle de largeur $x$ cm.\na) Montrer que sa longueur vaut $20 - x$.\nb) Exprimer son aire $A(x)$, sous forme développée.\nc) Calculer $A(5)$, $A(8)$ et $A(10)$.\nd) Montrer que $A(x) = 100 - (x - 10)^2$.\ne) En déduire l'aire la plus grande possible, et la forme du rectangle.",
          correction:
            "a) Le périmètre vaut $40$ : deux largeurs et deux longueurs. Une largeur et une longueur font donc $20$, et la longueur vaut $20 - x$.\nb) $A(x) = x(20 - x) = 20x - x^2$.\nc) $A(5) = 5 \\times 15 = 75$ ; $A(8) = 8 \\times 12 = 96$ ; $A(10) = 10 \\times 10 = 100$. Les aires sont en cm².\nd) $(x - 10)^2 = x^2 - 20x + 100$, donc $100 - (x - 10)^2 = 100 - x^2 + 20x - 100 = 20x - x^2$. C'est bien $A(x)$.\ne) Un carré est toujours positif ou nul, donc $A(x) = 100 - (x - 10)^2$ ne dépasse jamais $100$. L'aire vaut au plus $100$ cm², et elle l'atteint pour $x = 10$ : le rectangle est alors un CARRÉ de $10$ cm de côté.\n⭐ Avec la même ficelle, c'est le carré qui enferme le plus de place.",
          schema: tableau("L'aire selon la largeur", ["longueur", "aire"], [
            { label: "x = 5", values: ["15 cm", "75 cm²"] },
            { label: "x = 8", values: ["12 cm", "96 cm²"] },
            { label: "x = 10", values: ["10 cm", "100 cm²"] },
          ]),
          micros: ["expr_modeliser", "expr_reduire_substituer"],
        },
        {
          titre: "Le carré du calendrier",
          enonce: "Sur un calendrier, on entoure un carré de quatre dates, par exemple $3$, $4$, $10$ et $11$.\na) Calculer $4 \\times 10 - 3 \\times 11$.\nb) On appelle $n$ la date en haut à gauche. Écrire les trois autres en fonction de $n$.\nc) Montrer que le produit d'une diagonale (en haut à droite, en bas à gauche) moins celui de l'autre diagonale vaut toujours $7$.",
          correction:
            "a) $4 \\times 10 - 3 \\times 11 = 40 - 33 = 7$.\nb) À droite, le lendemain : $n + 1$. En dessous, une semaine plus tard : $n + 7$. En bas à droite : $n + 8$.\nc) On calcule $(n + 1)(n + 7) - n(n + 8)$.\n$(n + 1)(n + 7) = n^2 + 8n + 7$ et $n(n + 8) = n^2 + 8n$.\nLa différence vaut $n^2 + 8n + 7 - n^2 - 8n = 7$, quelle que soit la date $n$.\n⭐ Le $7$ vient des sept jours de la semaine : c'est lui qui apparaît dans $n + 7$.",
          micros: ["expr_modeliser", "expr_reduire_substituer"],
        },
        {
          titre: "La TVA à La Réunion",
          enonce: "À La Réunion, la TVA au taux normal est de $8{,}5\\,\\%$. Un article coûte $x$ € hors taxe (HT).\na) Exprimer son prix toutes taxes comprises (TTC), noté $T$, en fonction de $x$.\nb) Exprimer le prix HT en fonction du prix TTC.\nc) Un vélo coûte $434$ € TTC à Saint-Paul. Quel est son prix HT ?\nd) En métropole, la TVA est de $20\\,\\%$. Combien le même vélo, au même prix HT, coûterait-il TTC ?",
          correction:
            "a) Ajouter $8{,}5\\,\\%$, c'est multiplier par $1{,}085$ : $T = 1{,}085x$.\nb) On divise par $1{,}085$ : $x = \\dfrac{T}{1{,}085}$.\nc) $x = \\dfrac{434}{1{,}085} = 400$ €.\nd) $400 \\times 1{,}2 = 480$ € TTC, soit $46$ € de plus qu'à La Réunion.\n⛔ Le piège au c) : retirer $8{,}5\\,\\%$ de $434$. On trouverait $434 \\times 0{,}915 \\approx 397{,}11$ € : les $8{,}5\\,\\%$ ont été calculés sur le prix HT, pas sur le prix TTC.",
          micros: ["expr_modeliser", "expr_exprimer_variable"],
        },
      ],
    },
  ],
};
