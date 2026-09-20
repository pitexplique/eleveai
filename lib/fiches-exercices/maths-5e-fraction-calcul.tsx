// ─── Fiche d'exercices : calculer avec les fractions (5e) — 20 exercices corrigés ─
//
// ⭐ LA PREMIÈRE FEUILLE DU COLLÈGE (20/09/2026). Frédéric : « va à 5e et fais la
// feuille d'exercices sur les fractions — calculer avec les fractions », avec la
// vidéo https://www.youtube.com/watch?v=mWK-Qm8bPKY. Elle ferme le trio que la
// Une de l'accueil met en avant cette semaine-là : le short « 1/2 + 1/3 ne fait
// pas 2/5 », la leçon vidéo, et maintenant la feuille (lib/accueil/une.ts).
// ⚠️ La vidéo n'est PAS écrite ici : `VideoNotion` la lit dans
// `notion_ressources` (5e, fraction_calcul) et l'affiche toute seule.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-fraction-calcul.tsx` et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/fractions.bank.ts`, notionId
// fraction_calcul. Lu AVANT d'écrire, micro par micro : la banque additionne à
// dénominateurs égaux, multiples l'un de l'autre, et PETITS dénominateurs
// différents (1/2 + 1/3, 3/4 + 1/6) ; elle multiplie, prend une fraction d'un
// nombre ou d'une fraction, et fait expliquer deux erreurs d'élève.
//
// ⛔ NI INVERSE NI DIVISION DE FRACTIONS : ils ont quitté la 5e le 04/08/2026
// (repères annuels : 4e). Ni nombres négatifs : la banque n'en calcule aucun ici.
//
// ⛔ Aucun calcul de la fiche de cours n'est repris — l'élève qui a lu le cours
// ne retrouve pas un corrigé déjà vu. UNE exception, voulue : 1/2 + 1/3 = 2/5,
// à l'exercice 12. C'est l'erreur du short, et c'est elle que la feuille démonte
// (la banque la pose aussi, deux fois).
//
// ⭐ LE FIL, le même que la fiche de cours : on n'additionne que des parts de
// MÊME TAILLE. Cinq corrigés le DESSINENT (barres de fractions, le canvas du
// coach) : une somme de fractions se comprend en regardant les parts, pas en
// récitant « même dénominateur ».
//
// Les corrigés sont écrits à la première personne (« je redécoupe »), comme la
// fiche de cours de 5e : c'est la voix du cahier, pas celle du manuel.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-fractions-5e.mjs`.
//
// Micro-compétences : fraction_additionner (1-4, 9-12, 17, 20),
// fraction_multiplier (5, 6, 13-15, 19, 20), fraction_quantite (7, 8, 15, 16,
// 18, 19), fraction_calcul_defi (12, 14, 17-20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⚠️ `size.height: 140`, ET UNE LARGEUR BORNÉE. Par défaut le canvas fait
// 320 × 210 : la barre (42 px, posée à y = 58, son étiquette à y = 128) flotte
// au milieu d'une carte presque vide. Mesuré le 20/09 : trois barres empilées
// dans un corrigé prenaient ~750 px — plus que le corrigé lui-même, à l'écran
// comme sur la page des corrigés du PDF. À 140 de haut rien n'est coupé
// (l'étiquette finit à 128), et à 16 rem de large douze parts restent lisibles.
// ⛔ On ne touche pas au canvas lui-même : il sert toutes les fiches de cours.
const barre = (n: number, d: number) => (
  <div className="mx-auto w-full max-w-[16rem]">
    <CanvasRenderer
      figure={{
        kind: "fraction",
        model: "bar",
        fraction: { numerator: n, denominator: d },
        size: { width: 320, height: 140 },
      }}
    />
  </div>
);

// Le même dessin que la fiche de cours (`operation`, maths-5e-fraction-calcul) :
// les deux opérandes, le signe, le résultat — EMPILÉS, chacun sur toute la
// largeur. Côte à côte, les numérateurs devenaient illisibles (Frédéric, 20/08 :
// « on voit rien »). ⚠️ On dessine les fractions UNE FOIS REDÉCOUPÉES : c'est
// là que l'œil voit des parts de même taille.
const calculDessine = (
  a: [number, number],
  signe: string,
  b: [number, number],
  resultat: [number, number],
) => (
  <div className="space-y-0.5">
    {barre(a[0], a[1])}
    <p className="text-center text-lg font-black leading-none text-slate-700">{signe}</p>
    {barre(b[0], b[1])}
    <p className="text-center text-lg font-black leading-none text-slate-700">=</p>
    {barre(resultat[0], resultat[1])}
  </div>
);

export const exercicesFractionCalcul5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Vingt exercices, du calcul seul au problème, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/5e/fraction-calcul",
      titre: "Calculer avec les fractions",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Tu appliques, tu simplifies, tu écris le résultat.",
      rappel: [
        "Additionner ou soustraire : il faut le MÊME dénominateur. On calcule alors seulement les numérateurs : $\\dfrac{2}{9} + \\dfrac{5}{9} = \\dfrac{7}{9}$.",
        "Si un dénominateur est un multiple de l'autre, on transforme UNE seule fraction : $\\dfrac{1}{3} = \\dfrac{1 \\times 4}{3 \\times 4} = \\dfrac{4}{12}$.",
        "Multiplier : haut $\\times$ haut, bas $\\times$ bas. Aucun dénominateur commun à chercher.",
        "Prendre une fraction d'un nombre : on divise par le dénominateur, puis on multiplie par le numérateur. Et on simplifie toujours le résultat.",
      ],
      exercices: [
        {
          enonce: "Calcule $\\dfrac{3}{8} + \\dfrac{2}{8}$.",
          correction:
            "Les deux fractions ont le même dénominateur : ce sont des huitièmes, des parts de même taille.\nJ'additionne les numérateurs et je garde le dénominateur : $3 + 2 = 5$.\n$\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$.\n⛔ Le piège : écrire $\\dfrac{5}{16}$. Le dénominateur ne s'additionne pas : il dit la taille des parts, et elle n'a pas changé.",
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{7}{10} - \\dfrac{3}{10}$ et simplifie le résultat.",
          correction:
            "Même dénominateur : je soustrais les numérateurs, $7 - 3 = 4$.\n$\\dfrac{7}{10} - \\dfrac{3}{10} = \\dfrac{4}{10}$.\nJe simplifie : $4$ et $10$ se divisent par $2$, donc $\\dfrac{4}{10} = \\dfrac{2}{5}$.\n⚠️ Un résultat se donne toujours sous sa forme la plus simple : $\\dfrac{4}{10}$ est juste, mais le calcul n'est pas fini.",
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{2}{5} + \\dfrac{3}{10}$.",
          correction:
            "Les dénominateurs sont différents, mais $10$ est un multiple de $5$ : je transforme seulement $\\dfrac{2}{5}$.\n$\\dfrac{2}{5} = \\dfrac{2 \\times 2}{5 \\times 2} = \\dfrac{4}{10}$ : chaque cinquième est coupé en deux dixièmes.\nMaintenant les parts ont la même taille : $\\dfrac{4}{10} + \\dfrac{3}{10} = \\dfrac{7}{10}$.\n⛔ Le piège : $\\dfrac{2 + 3}{5 + 10} = \\dfrac{5}{15}$. On n'additionne jamais des cinquièmes avec des dixièmes sans les redécouper.",
          schema: calculDessine([4, 10], "+", [3, 10], [7, 10]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{5}{6} - \\dfrac{1}{2}$ et simplifie le résultat.",
          correction:
            "$6$ est un multiple de $2$ : je transforme $\\dfrac{1}{2}$ en sixièmes.\n$\\dfrac{1}{2} = \\dfrac{1 \\times 3}{2 \\times 3} = \\dfrac{3}{6}$.\n$\\dfrac{5}{6} - \\dfrac{3}{6} = \\dfrac{2}{6}$.\nJe simplifie par $2$ : $\\dfrac{2}{6} = \\dfrac{1}{3}$.",
          schema: calculDessine([5, 6], "−", [3, 6], [2, 6]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{3}{5} \\times \\dfrac{2}{7}$.",
          correction:
            "Pour multiplier, je n'ai besoin d'aucun dénominateur commun.\nHaut $\\times$ haut : $3 \\times 2 = 6$. Bas $\\times$ bas : $5 \\times 7 = 35$.\n$\\dfrac{3}{5} \\times \\dfrac{2}{7} = \\dfrac{6}{35}$.\n$6$ et $35$ n'ont aucun diviseur commun : la fraction ne se simplifie pas.\n⛔ Le piège : chercher un dénominateur commun « comme pour l'addition ». C'est du travail pour rien, et c'est là qu'on se trompe.",
          micros: ["fraction_multiplier"],
        },
        {
          enonce: "Calcule $\\dfrac{3}{4} \\times \\dfrac{2}{9}$ et simplifie le résultat.",
          correction:
            "Haut $\\times$ haut : $3 \\times 2 = 6$. Bas $\\times$ bas : $4 \\times 9 = 36$.\n$\\dfrac{3}{4} \\times \\dfrac{2}{9} = \\dfrac{6}{36}$.\nJe simplifie : $6$ et $36$ se divisent par $6$, donc $\\dfrac{6}{36} = \\dfrac{1}{6}$.\n⚠️ Simplifier par $2$ puis par $3$ donne la même chose : $\\dfrac{6}{36} = \\dfrac{3}{18} = \\dfrac{1}{6}$. L'important est d'aller jusqu'au bout.",
          micros: ["fraction_multiplier"],
        },
        {
          enonce: "Calcule $\\dfrac{2}{3}$ de $24$.",
          correction:
            "Je divise par le dénominateur : $24 \\div 3 = 8$. C'est un tiers de $24$.\nJe multiplie par le numérateur : $8 \\times 2 = 16$. Ce sont deux tiers.\n$\\dfrac{2}{3}$ de $24$ vaut $16$.\n⭐ Pour vérifier : $\\dfrac{2}{3}$ est plus petit que $1$, donc le résultat doit être plus petit que $24$. C'est le cas.",
          micros: ["fraction_quantite"],
        },
        {
          enonce: "Un paquet de farine pèse $250$ g. Une recette en demande les $\\dfrac{3}{10}$. Quelle masse de farine faut-il ?",
          correction:
            "Je cherche $\\dfrac{3}{10}$ de $250$ g.\nUn dixième : $250 \\div 10 = 25$ g.\nTrois dixièmes : $25 \\times 3 = 75$ g.\nIl faut $75$ g de farine.\n⚠️ Une quantité se donne avec son unité, dans une phrase.",
          micros: ["fraction_quantite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. Tu écris chaque étape.",
      rappel: [
        "Dénominateurs différents : on cherche un multiple commun aux deux (pour $4$ et $6$ : $12$), et on transforme LES DEUX fractions.",
        "On n'additionne jamais les dénominateurs : ils disent la TAILLE des parts, pas leur nombre.",
        "« de » veut dire « fois » : $\\dfrac{3}{4}$ de $\\dfrac{2}{5}$, c'est $\\dfrac{3}{4} \\times \\dfrac{2}{5}$.",
        "Pour contrôler un résultat, compare-le à $\\dfrac{1}{2}$ ou à $1$, ou passe par l'écriture décimale.",
      ],
      exercices: [
        {
          enonce: "Calcule $\\dfrac{1}{4} + \\dfrac{1}{6}$.",
          correction:
            "Ni $4$ ni $6$ n'est un multiple de l'autre : je cherche un multiple commun. Dans la table de $6$ : $6$, puis $12$ — et $12$ est aussi dans la table de $4$.\n$\\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}$ et $\\dfrac{1}{6} = \\dfrac{1 \\times 2}{6 \\times 2} = \\dfrac{2}{12}$.\n$\\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}$.\n⭐ Prendre $24$ (soit $4 \\times 6$) marche aussi : $\\dfrac{6}{24} + \\dfrac{4}{24} = \\dfrac{10}{24}$, qui se simplifie en $\\dfrac{5}{12}$. Le plus petit multiple commun évite seulement cette dernière étape.",
          schema: calculDessine([3, 12], "+", [2, 12], [5, 12]),
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{3}{4} - \\dfrac{2}{5}$.",
          correction:
            "Un multiple commun à $4$ et $5$ : $20$.\n$\\dfrac{3}{4} = \\dfrac{3 \\times 5}{4 \\times 5} = \\dfrac{15}{20}$ et $\\dfrac{2}{5} = \\dfrac{2 \\times 4}{5 \\times 4} = \\dfrac{8}{20}$.\n$\\dfrac{15}{20} - \\dfrac{8}{20} = \\dfrac{7}{20}$.\n$7$ et $20$ n'ont aucun diviseur commun : c'est fini.\n⚠️ Ce qu'on fait en bas, on le fait en haut : multiplier seulement le dénominateur changerait la fraction.",
          micros: ["fraction_additionner"],
        },
        {
          enonce: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{4} + \\dfrac{1}{8}$.",
          correction:
            "$8$ est un multiple de $2$ et de $4$ : je mets tout en huitièmes.\n$\\dfrac{1}{2} = \\dfrac{4}{8}$ et $\\dfrac{1}{4} = \\dfrac{2}{8}$.\n$\\dfrac{4}{8} + \\dfrac{2}{8} + \\dfrac{1}{8} = \\dfrac{7}{8}$.\n⭐ Il manque $\\dfrac{1}{8}$ pour faire $1$ : à chaque fois, on ajoute la moitié de ce qui manquait.",
          micros: ["fraction_additionner"],
        },
        {
          enonce:
            "Un élève écrit : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$.\na) Écris $\\dfrac{1}{2}$ et $\\dfrac{2}{5}$ sous forme décimale. Pourquoi son résultat est-il impossible ?\nb) Quelle erreur a-t-il faite ?\nc) Donne le bon résultat.",
          correction:
            "a) $\\dfrac{1}{2} = 0{,}5$ et $\\dfrac{2}{5} = 0{,}4$. Son résultat est plus PETIT que $\\dfrac{1}{2}$, alors qu'il a ajouté quelque chose à $\\dfrac{1}{2}$ : c'est impossible.\nb) Il a additionné les numérateurs entre eux ($1 + 1 = 2$) et les dénominateurs entre eux ($2 + 3 = 5$). Or une moitié et un tiers ne sont pas des parts de même taille : on ne peut pas les compter ensemble.\nc) Je redécoupe en sixièmes : $\\dfrac{1}{2} = \\dfrac{3}{6}$ et $\\dfrac{1}{3} = \\dfrac{2}{6}$. Donc $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.\n⭐ Le contrôle du a) marche pour n'importe quelle somme : le résultat est toujours plus grand que chacun des deux termes.",
          schema: calculDessine([3, 6], "+", [2, 6], [5, 6]),
          micros: ["fraction_additionner", "fraction_calcul_defi"],
        },
        {
          enonce: "Calcule $\\dfrac{4}{9} \\times \\dfrac{3}{8}$ et simplifie le résultat.",
          correction:
            "Haut $\\times$ haut : $4 \\times 3 = 12$. Bas $\\times$ bas : $9 \\times 8 = 72$.\n$\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{12}{72}$.\n$12$ et $72$ se divisent par $12$ : $\\dfrac{12}{72} = \\dfrac{1}{6}$.\n⭐ On peut aussi simplifier AVANT de multiplier : $4$ et $8$ se divisent par $4$, $3$ et $9$ se divisent par $3$. Il reste $\\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$ — le même résultat, avec de plus petits nombres.",
          micros: ["fraction_multiplier"],
        },
        {
          enonce:
            "Un élève écrit : $\\dfrac{3}{5} \\times \\dfrac{2}{5} = \\dfrac{6}{5}$.\na) Sans calculer, explique pourquoi le résultat ne peut pas être plus grand que $1$.\nb) Quelle erreur a-t-il faite ?\nc) Donne le bon résultat.",
          correction:
            "a) $\\dfrac{3}{5} \\times \\dfrac{2}{5}$, c'est prendre les $\\dfrac{3}{5}$ de $\\dfrac{2}{5}$ : une partie seulement de $\\dfrac{2}{5}$. Le résultat est donc plus petit que $\\dfrac{2}{5}$, et sûrement pas plus grand que $1$. Or $\\dfrac{6}{5}$ dépasse $1$.\nb) Il a multiplié les numérateurs ($3 \\times 2 = 6$) mais il a GARDÉ le dénominateur $5$, comme dans une addition.\nc) Bas $\\times$ bas aussi : $5 \\times 5 = 25$. Donc $\\dfrac{3}{5} \\times \\dfrac{2}{5} = \\dfrac{6}{25}$.\n⛔ « Je garde le dénominateur » est la règle de l'addition. Pour multiplier : haut $\\times$ haut ET bas $\\times$ bas.",
          micros: ["fraction_multiplier", "fraction_calcul_defi"],
        },
        {
          enonce: "Calcule $\\dfrac{3}{4}$ de $\\dfrac{2}{5}$ et simplifie le résultat.",
          correction:
            "« de » veut dire « fois » : je calcule $\\dfrac{3}{4} \\times \\dfrac{2}{5}$.\nHaut $\\times$ haut : $3 \\times 2 = 6$. Bas $\\times$ bas : $4 \\times 5 = 20$.\n$\\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20}$.\nJe simplifie par $2$ : $\\dfrac{6}{20} = \\dfrac{3}{10}$.\n⭐ C'est bien plus petit que $\\dfrac{2}{5}$ (soit $\\dfrac{4}{10}$) : on n'en a pris que les trois quarts.",
          micros: ["fraction_quantite", "fraction_multiplier"],
        },
        {
          enonce: "Dans une classe de $28$ élèves, les $\\dfrac{3}{7}$ mangent à la cantine. Combien d'élèves NE mangent PAS à la cantine ?",
          correction:
            "Je cherche d'abord ceux qui y mangent : $\\dfrac{3}{7}$ de $28$.\nUn septième : $28 \\div 7 = 4$. Trois septièmes : $4 \\times 3 = 12$ élèves.\nLes autres : $28 - 12 = 16$.\n$16$ élèves ne mangent pas à la cantine.\n⭐ Autre chemin : la classe entière, c'est $\\dfrac{7}{7}$. Ceux qui n'y mangent pas sont $\\dfrac{7}{7} - \\dfrac{3}{7} = \\dfrac{4}{7}$ de la classe, et $\\dfrac{4}{7}$ de $28$ vaut $4 \\times 4 = 16$.\n⛔ Le piège : s'arrêter à $12$. La question porte sur ceux qui ne mangent PAS.",
          micros: ["fraction_quantite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Tu réponds par des phrases.",
      rappel: [
        "On écrit le calcul, on donne le résultat avec son unité, puis on répond par une phrase.",
        "« Ce qui reste » : le tout vaut $1$, c'est-à-dire $\\dfrac{12}{12}$, $\\dfrac{8}{8}$… Le reste, c'est $1$ moins ce qui est pris.",
        "Attention à « une fraction DE CE QUI RESTE » : on la prend sur le reste, pas sur le total.",
        "Priorités : la multiplication se fait AVANT l'addition et la soustraction. Les parenthèses passent avant tout.",
      ],
      exercices: [
        {
          titre: "Le gâteau patate",
          enonce:
            "À La Réunion, Maëlle mange $\\dfrac{1}{3}$ d'un gâteau patate et son frère en mange $\\dfrac{1}{4}$.\na) Quelle fraction du gâteau ont-ils mangée à eux deux ?\nb) Quelle fraction du gâteau reste-t-il ?\nc) Reste-t-il plus ou moins de la moitié du gâteau ?",
          correction:
            "a) Un tiers et un quart ne sont pas des parts de même taille : je redécoupe en douzièmes ($12$ est dans la table de $3$ et dans celle de $4$).\n$\\dfrac{1}{3} = \\dfrac{4}{12}$ et $\\dfrac{1}{4} = \\dfrac{3}{12}$, donc $\\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$. Ils ont mangé $\\dfrac{7}{12}$ du gâteau.\nb) Le gâteau entier, c'est $\\dfrac{12}{12}$. Il reste $\\dfrac{12}{12} - \\dfrac{7}{12} = \\dfrac{5}{12}$ du gâteau.\nc) La moitié du gâteau, c'est $\\dfrac{6}{12}$. Or $\\dfrac{5}{12} < \\dfrac{6}{12}$ : il reste un peu MOINS de la moitié.\n⛔ Le piège du a) : $\\dfrac{1 + 1}{3 + 4} = \\dfrac{2}{7}$. Ce serait moins que la part de Maëlle seule ($\\dfrac{1}{3}$) : impossible.",
          schema: calculDessine([4, 12], "+", [3, 12], [7, 12]),
          micros: ["fraction_additionner", "fraction_calcul_defi"],
        },
        {
          titre: "La récolte de letchis",
          enonce:
            "Un producteur de Saint-Benoît récolte $240$ kg de letchis. Il en vend les $\\dfrac{5}{8}$ au marché forain, puis il donne $\\dfrac{1}{3}$ DE CE QUI RESTE à sa famille.\na) Quelle masse de letchis vend-il au marché ?\nb) Quelle masse lui reste-t-il après le marché ?\nc) Quelle masse donne-t-il à sa famille ?\nd) Quelle masse garde-t-il ? Quelle fraction de la récolte cela représente-t-il ?",
          correction:
            "a) $\\dfrac{5}{8}$ de $240$ : un huitième vaut $240 \\div 8 = 30$ kg, donc cinq huitièmes valent $30 \\times 5 = 150$ kg. Il vend $150$ kg.\nb) $240 - 150 = 90$. Il lui reste $90$ kg.\nc) Il donne $\\dfrac{1}{3}$ de CES $90$ kg : $90 \\div 3 = 30$ kg.\nd) $90 - 30 = 60$. Il garde $60$ kg. Sur $240$ kg, cela fait $\\dfrac{60}{240}$, que je simplifie par $60$ : $\\dfrac{60}{240} = \\dfrac{1}{4}$. Il garde un quart de sa récolte.\n⛔ Le piège du c) : calculer $\\dfrac{1}{3}$ de $240$ (soit $80$ kg). L'énoncé dit « de ce qui reste » : la fraction se prend sur $90$ kg, pas sur la récolte entière.",
          micros: ["fraction_quantite", "fraction_calcul_defi"],
        },
        {
          titre: "La recette pour quatre",
          enonce:
            "Une recette pour $6$ personnes demande $\\dfrac{3}{4}$ de litre de lait et $\\dfrac{1}{2}$ kg de farine. Lina la prépare pour $4$ personnes seulement.\na) Montre que Lina doit prendre les $\\dfrac{2}{3}$ de chaque quantité.\nb) Quelle quantité de lait lui faut-il ?\nc) Quelle quantité de farine lui faut-il ?",
          correction:
            "a) $4$ personnes sur $6$, c'est $\\dfrac{4}{6}$ de la recette. Je simplifie par $2$ : $\\dfrac{4}{6} = \\dfrac{2}{3}$.\nb) $\\dfrac{2}{3}$ de $\\dfrac{3}{4}$ : « de » veut dire « fois ». $\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{6}{12} = \\dfrac{1}{2}$. Il lui faut $\\dfrac{1}{2}$ litre de lait.\nc) $\\dfrac{2}{3} \\times \\dfrac{1}{2} = \\dfrac{2}{6} = \\dfrac{1}{3}$. Il lui faut $\\dfrac{1}{3}$ de kg de farine.\n⭐ Contrôle : les deux résultats sont plus PETITS que les quantités de départ ($\\dfrac{1}{2} < \\dfrac{3}{4}$ et $\\dfrac{1}{3} < \\dfrac{1}{2}$). C'est normal, on cuisine pour moins de monde.",
          micros: ["fraction_quantite", "fraction_multiplier", "fraction_calcul_defi"],
        },
        {
          titre: "L'ordre des calculs",
          enonce:
            "a) Calcule $A = \\dfrac{3}{4} - \\dfrac{1}{4} \\times \\dfrac{2}{3}$.\nb) Un élève trouve $A = \\dfrac{1}{3}$. Quel calcul a-t-il fait en premier ?\nc) Calcule $B = \\left(\\dfrac{1}{2} + \\dfrac{1}{3}\\right) \\times \\dfrac{3}{5}$.",
          correction:
            "a) La multiplication passe AVANT la soustraction : $\\dfrac{1}{4} \\times \\dfrac{2}{3} = \\dfrac{2}{12} = \\dfrac{1}{6}$.\nIl reste $A = \\dfrac{3}{4} - \\dfrac{1}{6}$. En douzièmes : $\\dfrac{9}{12} - \\dfrac{2}{12} = \\dfrac{7}{12}$. Donc $A = \\dfrac{7}{12}$.\nb) Il a calculé de gauche à droite : $\\dfrac{3}{4} - \\dfrac{1}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}$, puis $\\dfrac{1}{2} \\times \\dfrac{2}{3} = \\dfrac{2}{6} = \\dfrac{1}{3}$. Il a oublié la priorité de la multiplication.\nc) Les parenthèses d'abord : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.\nPuis $B = \\dfrac{5}{6} \\times \\dfrac{3}{5} = \\dfrac{15}{30} = \\dfrac{1}{2}$.\n⛔ Le piège de tout le chapitre, version longue : on ne lit pas un calcul de gauche à droite, on cherche d'abord ce qui est prioritaire.",
          micros: ["fraction_calcul_defi", "fraction_additionner", "fraction_multiplier"],
        },
      ],
    },
  ],
};
