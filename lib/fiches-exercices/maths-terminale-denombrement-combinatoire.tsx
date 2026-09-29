// ─── Fiche d'exercices : dénombrement et combinatoire (terminale spé) ─────────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, alignée sur la banque `lib/tutor-v4/questionBank/
// terminale-spe/maths/denombrement.bank.ts` (six micros). Pas de fiche de cours.
// Le dénombrement est NOUVEAU en terminale : aucune feuille de 1re à ne pas
// répéter.
//
// ⭐⭐ LE FIL : DEUX QUESTIONS AVANT DE COMPTER. L'ordre compte-t-il ? Peut-on
// répéter ? Les réponses donnent l'outil : k-uplets (n puissance k),
// arrangements, permutations (n!), combinaisons (coefficients binomiaux). Et
// le triangle de Pascal relie tout, jusqu'aux chemins et à la loi binomiale.
//
// ⭐ LES DESSINS : l'arbre des choix (`arbre`, deux niveaux au plus : le canvas
// n'a que trois colonnes), le triangle de Pascal en `trace`, les cases à remplir
// (`tableau`), l'urne (`billes`), le quadrillage des chemins et le tournoi en
// `repere`, les lois en barres (`diagramme`).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-terminale-spe-denombrement-combinatoire.mjs`
// ÉNUMÈRE les objets comptés (listes, mots, mains, chemins) quand c'est
// possible, au lieu d'appliquer les formules du corrigé.
//
// Micro-compétences : denombrement_reconnaitre (1, 2, 6, 9, 11, 12, 14, 15, 16,
// 17), denombrement_produit_somme (1, 2, 4, 9, 11, 15, 16, 18, 20),
// denombrement_arrangement_combinaison (3, 4, 5, 6, 10, 15, 17, 20),
// denombrement_coefficient_binomial (5, 8, 9, 10, 12, 13, 14, 17, 18, 19),
// denombrement_pascal (7, 8, 13, 19), denombrement_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : aucun fait réel. Le jeu de 32 cartes est la composition
// usuelle (4 couleurs de 8 cartes, dont 4 as). La planche de Galton est un
// objet mathématique ; le jeu de tirage, le tournoi et les mots de passe sont
// des MODÈLES ; les anniversaires supposent 365 jours équiprobables.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import type { ReactNode } from "react";
import { ORANGE, arbre, billes, diagramme, repere, tableau, trace } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDenombrementCombinatoireTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "denombrement-combinatoire",
  titre: "Dénombrement et combinatoire",
  accroche:
    "Vingt exercices pour apprendre à compter sans tout écrire : tenues, codes, podiums, comités, mains de cartes, chemins, tournois. Un rappel avant chaque niveau. Avant chaque calcul, pose-toi deux questions : l'ordre compte-t-il ? peut-on répéter ? La correction y répond, puis dessine l'arbre, les cases ou le triangle de Pascal.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un outil par exercice. D'abord reconnaître la situation, ensuite compter.",
      rappel: [
        "Principe multiplicatif : un choix en plusieurs étapes, avec $n_1$ possibilités PUIS $n_2$ possibilités, donne $n_1 \\times n_2$ résultats. Principe additif : des cas SANS recouvrement s'ajoutent.",
        "Liste de $k$ éléments pris parmi $n$, répétitions permises (un $k$-uplet) : $n^k$. Sans répétition, l'ordre comptant (un arrangement) : $n \\times (n - 1) \\times \\cdots \\times (n - k + 1) = \\dfrac{n!}{(n - k)!}$.",
        "Permutations de $n$ objets : $n! = n \\times (n - 1) \\times \\cdots \\times 1$, avec $0! = 1$.",
        "Partie à $k$ éléments d'un ensemble à $n$ éléments (l'ordre ne compte pas) : $\\dbinom{n}{k} = \\dfrac{n!}{k!\\,(n - k)!}$.",
      ],
      exercices: [
        {
          enonce:
            "Pour s'habiller, Léo choisit un t-shirt parmi $3$, puis un pantalon parmi $2$, puis une paire de chaussures parmi $2$.\na) Combien de tenues t-shirt + pantalon peut-il former ? Faire un arbre.\nb) Combien de tenues complètes, avec les chaussures ?\nc) Il a aussi $4$ combinaisons (une seule pièce), qui remplacent le t-shirt ET le pantalon. Combien de tenues complètes en tout ?",
          correction:
            "a) Pour chacun des $3$ t-shirts, il y a $2$ pantalons : $3 \\times 2 = 6$ tenues. L'arbre a $6$ branches au bout.\nb) Chacune de ces $6$ tenues se complète avec $2$ paires : $6 \\times 2 = 12$ tenues.\nc) Le haut du corps se choisit de DEUX façons qui ne se recouvrent pas : t-shirt + pantalon ($6$ choix) OU combinaison ($4$ choix).\nPrincipe additif : $6 + 4 = 10$. Puis les chaussures : $10 \\times 2 = 20$ tenues complètes.\n⚠️ « Puis » se traduit par une multiplication, « ou » (sans recouvrement) par une addition. Additionner les $3 + 2 + 2$ pièces n'a aucun sens.\n⭐ Sur le dessin : $3$ branches pour les t-shirts, et $2$ branches au bout de chacune. On compte $6$ extrémités.",
          schema: arbre([
            { label: "T1", enfants: [{ label: "P1" }, { label: "P2" }] },
            { label: "T2", enfants: [{ label: "P1" }, { label: "P2" }] },
            { label: "T3", enfants: [{ label: "P1" }, { label: "P2" }] },
          ]),
          micros: ["denombrement_reconnaitre", "denombrement_produit_somme"],
        },
        {
          enonce:
            "Compter, en justifiant :\na) les mots de $2$ lettres écrits avec l'alphabet $\\{A ; B ; C\\}$ (un mot n'a pas besoin d'avoir un sens, une lettre peut revenir) ;\nb) les codes de carte à $4$ chiffres ;\nc) les résultats possibles de $5$ lancers successifs d'une pièce.",
          correction:
            "Dans les trois cas, l'ORDRE compte et une valeur peut REVENIR : ce sont des listes avec répétition.\na) $3$ choix pour la première lettre, $3$ pour la seconde : $3^2 = 9$ mots.\nb) $10$ choix pour chacun des $4$ chiffres : $10^4 = 10\\,000$ codes, de $0000$ à $9999$.\nc) $2$ résultats pour chacun des $5$ lancers : $2^5 = 32$ résultats.\n⚠️ Le code $1123$ est permis : les chiffres peuvent se répéter. C'est pour cela qu'il y a $10$ choix à CHAQUE étape, pas $10$, puis $9$…\n⭐ Sur le dessin : l'arbre des mots de $2$ lettres. Chaque première lettre a $3$ suites, d'où $9$ mots, de AA à CC.",
          schema: ecranSeulement(
            arbre([
              { label: "A", enfants: [{ label: "AA" }, { label: "AB" }, { label: "AC" }] },
              { label: "B", enfants: [{ label: "BA" }, { label: "BB" }, { label: "BC" }] },
              { label: "C", enfants: [{ label: "CA" }, { label: "CB" }, { label: "CC" }] },
            ]),
          ),
          micros: ["denombrement_produit_somme", "denombrement_reconnaitre"],
        },
        {
          enonce:
            "a) De combien de façons peut-on ranger les lettres A, B, C ? Faire l'arbre.\nb) De combien de façons peut-on ranger $6$ livres différents sur une étagère ?\nc) Combien d'anagrammes a le mot MATHS (les cinq lettres sont différentes) ?\nd) Que vaut $0!$ ? Et $\\dfrac{10!}{8!}$ ?",
          correction:
            "a) $3$ choix pour la première place, $2$ pour la deuxième, et la dernière lettre est imposée : $3 \\times 2 \\times 1 = 3! = 6$.\nb) $6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720$ rangements.\nc) Une anagramme est une permutation des $5$ lettres : $5! = 120$.\nd) Par convention, $0! = 1$.\n$\\dfrac{10!}{8!} = \\dfrac{10 \\times 9 \\times 8!}{8!} = 90$ : on simplifie sans calculer $10!$.\n⚠️ À chaque place, il reste une lettre de MOINS : $3$, puis $2$, puis $1$. Ce n'est pas $3 \\times 3 \\times 3$, qui permettrait AAA.\n⭐ Sur le dessin : chaque première lettre a deux suites, et la troisième lettre est forcée. On lit les $6$ mots au bout des branches.",
          schema: arbre([
            { label: "A", enfants: [{ label: "ABC" }, { label: "ACB" }] },
            { label: "B", enfants: [{ label: "BAC" }, { label: "BCA" }] },
            { label: "C", enfants: [{ label: "CAB" }, { label: "CBA" }] },
          ]),
          micros: ["denombrement_arrangement_combinaison"],
        },
        {
          enonce:
            "a) Une course oppose $8$ coureurs. Combien de podiums (1er, 2e, 3e) sont possibles ?\nb) Un club de $12$ membres élit un président, un trésorier et un secrétaire, trois personnes différentes. Combien de bureaux possibles ?\nc) Vérifier que ces deux nombres s'écrivent $\\dfrac{n!}{(n - k)!}$.",
          correction:
            "a) $8$ choix pour l'or, puis $7$ pour l'argent (le vainqueur est déjà placé), puis $6$ pour le bronze : $8 \\times 7 \\times 6 = 336$ podiums.\nb) Même raisonnement : $12 \\times 11 \\times 10 = 1\\,320$ bureaux. L'ordre compte : être président n'est pas être trésorier.\nc) $\\dfrac{8!}{5!} = 8 \\times 7 \\times 6 = 336$ et $\\dfrac{12!}{9!} = 12 \\times 11 \\times 10 = 1\\,320$.\nCe sont des arrangements de $k = 3$ éléments parmi $n$.\n⚠️ Ici on ne peut pas répéter : un coureur n'a qu'une médaille. Ce n'est donc pas $8^3 = 512$.\n⭐ Sur le dessin : trois cases, et dans chacune le nombre de choix qui restent.",
          schema: ecranSeulement(tableau(["place", "or", "argent", "bronze"], ["choix", 8, 7, 6])),
          micros: ["denombrement_arrangement_combinaison", "denombrement_produit_somme"],
        },
        {
          enonce:
            "a) Combien de comités de $3$ personnes peut-on former dans un groupe de $10$ ?\nb) Pourquoi divise-t-on par $3!$ le nombre de listes ordonnées ?\nc) $20$ personnes se serrent toutes la main, une fois par paire. Combien de poignées de main ?",
          correction:
            "a) Dans un comité, l'ordre ne compte PAS : c'est une partie à $3$ éléments. $\\dbinom{10}{3} = \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$.\nb) Les listes ordonnées de $3$ personnes sont $10 \\times 9 \\times 8 = 720$.\nMais chaque comité y apparaît $3! = 6$ fois, une fois par ordre de ses trois membres. Donc $\\dfrac{720}{6} = 120$ comités.\nc) Une poignée de main, c'est une paire de personnes, sans ordre : $\\dbinom{20}{2} = \\dfrac{20 \\times 19}{2} = 190$.\n⚠️ Compter $20 \\times 19 = 380$ compte chaque poignée DEUX fois : celle d'Anne à Bruno et celle de Bruno à Anne sont la même.\n⭐ Sur le dessin : les $6$ ordres de A, B, C donnent le même comité.",
          schema: ecranSeulement(trace(["ordre", "comité"], [["ABC", "{A, B, C}"], ["ACB", "le même"], ["BAC", "le même"], ["BCA", "le même"], ["CAB", "le même"], ["CBA", "le même"]])),
          micros: ["denombrement_coefficient_binomial", "denombrement_arrangement_combinaison"],
        },
        {
          enonce:
            "Pour chaque situation, dire si l'ordre compte et si l'on peut répéter, puis compter.\na) Le tiercé : les trois premiers d'une course de $15$ chevaux, dans l'ordre.\nb) Une main de $5$ cartes dans un jeu de $32$.\nc) Un code de $3$ lettres majuscules.\nd) L'ordre de passage de $7$ élèves à l'oral.",
          correction:
            "a) L'ordre compte, pas de répétition : arrangement. $15 \\times 14 \\times 13 = 2\\,730$.\nb) L'ordre ne compte pas (une main est un paquet), pas de répétition : combinaison. $\\dbinom{32}{5} = 201\\,376$.\nc) L'ordre compte, répétition permise : $26^3 = 17\\,576$ codes.\nd) On range les $7$ élèves : permutation. $7! = 5\\,040$.\n⭐ Deux questions suffisent : l'ordre compte-t-il ? peut-on répéter ?\n⚠️ Une main de cartes se reçoit d'un coup : l'as de cœur puis le roi de pique, c'est la même main que dans l'autre ordre.\n⭐ Sur le dessin : l'arbre des deux questions mène à l'outil.",
          schema: arbre([
            { label: "L'ordre compte", enfants: [{ label: "répétitions : nᵏ" }, { label: "sans : n!/(n−k)!" }] },
            { label: "Il ne compte pas", enfants: [{ label: "combinaison" }] },
          ]),
          micros: ["denombrement_reconnaitre", "denombrement_arrangement_combinaison"],
        },
        {
          enonce:
            "a) Construire le triangle de Pascal jusqu'à la ligne $n = 6$, avec la relation $\\dbinom{n+1}{k+1} = \\dbinom{n}{k} + \\dbinom{n}{k+1}$.\nb) Lire $\\dbinom{6}{2}$ et $\\dbinom{6}{3}$.\nc) En déduire $\\dbinom{7}{3}$ sans factorielle.",
          correction:
            "a) Chaque ligne commence et finit par $1$, car $\\dbinom{n}{0} = \\dbinom{n}{n} = 1$.\nChaque autre nombre est la somme des deux nombres de la ligne du dessus : celui juste au-dessus et celui à sa gauche.\nLigne $6$ : $1$, $6$, $15$, $20$, $15$, $6$, $1$.\nb) $\\dbinom{6}{2} = 15$ et $\\dbinom{6}{3} = 20$.\nc) $\\dbinom{7}{3} = \\dbinom{6}{2} + \\dbinom{6}{3} = 15 + 20 = 35$.\n⚠️ La ligne $n$ commence par $\\dbinom{n}{0}$ : il faut compter les colonnes à partir de $k = 0$. Le « $15$ » de la ligne $6$ est $\\dbinom{6}{2}$, pas $\\dbinom{6}{3}$.\n⭐ Sur le dessin : la ligne rouge est la ligne $6$ ; elle est symétrique, comme toutes les lignes.",
          schema: trace(
            ["n", "k=0", "1", "2", "3", "4", "5", "6"],
            [
              [0, 1, "", "", "", "", "", ""],
              [1, 1, 1, "", "", "", "", ""],
              [2, 1, 2, 1, "", "", "", ""],
              [3, 1, 3, 3, 1, "", "", ""],
              [4, 1, 4, 6, 4, 1, "", ""],
              [5, 1, 5, 10, 10, 5, 1, ""],
              [6, 1, 6, 15, 20, 15, 6, 1],
            ],
          ),
          micros: ["denombrement_pascal"],
        },
        {
          enonce:
            "Soit $E = \\{a ; b ; c ; d\\}$.\na) Écrire toutes les parties de $E$ à $2$ éléments. Combien y en a-t-il ?\nb) Combien $E$ a-t-il de parties en tout (y compris l'ensemble vide et $E$ lui-même) ?\nc) Vérifier que la somme des nombres de la ligne $4$ du triangle de Pascal donne le même résultat.",
          correction:
            "a) $\\{a ; b\\}$, $\\{a ; c\\}$, $\\{a ; d\\}$, $\\{b ; c\\}$, $\\{b ; d\\}$, $\\{c ; d\\}$ : il y en a $6 = \\dbinom{4}{2}$.\nb) Pour former une partie, on décide pour chaque élément : dedans ou dehors. $2$ choix, $4$ fois : $2^4 = 16$ parties.\nc) Ligne $4$ : $1 + 4 + 6 + 4 + 1 = 16$.\nC'est normal : on compte les parties selon leur nombre d'éléments, de $0$ à $4$.\n⚠️ Ne pas oublier l'ensemble vide ($1$ partie à $0$ élément) ni $E$ lui-même ($1$ partie à $4$ éléments).\n⭐ Sur le dessin : le nombre de parties de chaque taille. La somme fait $2^4$.",
          schema: ecranSeulement(tableau(["taille", "0", "1", "2", "3", "4"], ["parties", 1, 4, 6, 4, 1])),
          micros: ["denombrement_coefficient_binomial", "denombrement_pascal"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Des situations concrètes à découper en étapes. On justifie chaque facteur.",
      rappel: [
        "« Au moins un » : on compte le CONTRAIRE (« aucun »), puis on le retire du total.",
        "Choix dans plusieurs groupes à la fois : on choisit dans chaque groupe, puis on multiplie, par exemple $\\dbinom{4}{2} \\times \\dbinom{28}{3}$.",
        "Symétrie : $\\dbinom{n}{k} = \\dbinom{n}{n-k}$. Somme d'une ligne : $\\dbinom{n}{0} + \\dbinom{n}{1} + \\cdots + \\dbinom{n}{n} = 2^n$.",
        "En équiprobabilité, $P(A)$ est le nombre de cas favorables divisé par le nombre de cas possibles, les deux comptés de la même façon.",
      ],
      exercices: [
        {
          enonce:
            "Un jeu de $32$ cartes contient $4$ as. On distribue une main de $5$ cartes.\na) Combien y a-t-il de mains ?\nb) Combien de mains contiennent exactement $2$ as ?\nc) Combien de mains contiennent au moins un as ?\nd) En déduire la probabilité d'avoir au moins un as.",
          correction:
            "a) Une main est une partie de $5$ cartes parmi $32$ : $\\dbinom{32}{5} = 201\\,376$.\nb) On choisit les $2$ as parmi les $4$, PUIS les $3$ autres cartes parmi les $28$ qui ne sont pas des as.\n$\\dbinom{4}{2} \\times \\dbinom{28}{3} = 6 \\times 3\\,276 = 19\\,656$ mains.\nc) Le contraire de « au moins un as » est « aucun as » : $\\dbinom{28}{5} = 98\\,280$ mains.\nDonc $201\\,376 - 98\\,280 = 103\\,096$ mains avec au moins un as.\nd) Les mains sont équiprobables : $P = \\dfrac{103\\,096}{201\\,376} \\approx 0{,}512$.\n⛔ Le piège : compter « un as, puis $4$ cartes quelconques », $4 \\times \\dbinom{31}{4}$. Une main avec deux as serait comptée DEUX fois (une fois par as choisi en premier).\n⭐ Sur le dessin : le jeu coupé en deux groupes, as et autres cartes. La main de b) prend $2$ dans le premier, $3$ dans le second.",
          schema: trace(["", "as", "autres", "total"], [["le jeu", 4, 28, 32], ["la main", 2, 3, 5]]),
          micros: ["denombrement_coefficient_binomial", "denombrement_produit_somme", "denombrement_reconnaitre"],
        },
        {
          enonce:
            "Une entreprise de colis code ses étiquettes par des mots de $6$ lettres qui utilisent exactement les lettres de ANANAS : trois A, deux N et un S.\na) Combien de mots différents ?\nb) Pourquoi n'est-ce pas $6! = 720$ ?\nc) Combien de ces mots commencent par S ?",
          correction:
            "a) On place d'abord les trois A : on choisit leurs $3$ places parmi $6$, soit $\\dbinom{6}{3} = 20$ façons.\nPuis les deux N : $2$ places parmi les $3$ qui restent, soit $\\dbinom{3}{2} = 3$ façons. Le S prend la dernière place.\nTotal : $20 \\times 3 = 60$ mots.\nb) $6!$ compterait les lettres comme si elles étaient toutes différentes. Échanger deux A ne change pas le mot : chaque mot serait compté $3! \\times 2! = 12$ fois.\nEt $\\dfrac{720}{12} = 60$ : on retrouve le résultat.\nc) Le S est en première place. Il reste AAANN à ranger sur $5$ places : $\\dbinom{5}{3} = 10$ mots.\n⚠️ Ce qu'on choisit, ce sont des PLACES, pas des lettres : les trois A sont identiques.\n⭐ Sur le dessin : un mot parmi les $60$. Les A occupent les places $1$, $3$ et $5$ ; les N, les places $2$ et $4$.",
          schema: tableau(["place", "1", "2", "3", "4", "5", "6"], ["lettre", "A", "N", "A", "N", "A", "S"]),
          micros: ["denombrement_arrangement_combinaison", "denombrement_coefficient_binomial"],
        },
        {
          enonce:
            "Un site impose des mots de passe de $8$ signes, choisis parmi les $26$ lettres minuscules et les $10$ chiffres.\na) Combien de mots de passe possibles ?\nb) Combien contiennent au moins un chiffre ? Quelle proportion ?\nc) Un ordinateur teste un milliard de mots de passe par seconde. Combien de temps lui faut-il, au plus, pour tous les essayer ?\nd) Même question si l'on ajoute les $26$ majuscules.",
          correction:
            "a) $36$ signes, $8$ places, répétitions permises : $36^8 \\approx 2{,}82 \\times 10^{12}$.\nb) Sans aucun chiffre : $26^8 \\approx 2{,}09 \\times 10^{11}$.\nAu moins un chiffre : $36^8 - 26^8 \\approx 2{,}61 \\times 10^{12}$, soit environ $92{,}6$ % des mots de passe.\nc) $\\dfrac{2{,}82 \\times 10^{12}}{10^9} \\approx 2\\,821$ secondes : environ $47$ minutes.\nd) $62$ signes : $62^8 \\approx 2{,}18 \\times 10^{14}$, soit environ $218\\,000$ s, plus de $60$ heures.\n⚠️ Ajouter des signes ne fait pas un peu plus de mots : $62^8$ est environ $77$ fois $36^8$, car le rapport $\\dfrac{62}{36}$ est élevé à la puissance $8$.\n⭐ Sur le dessin : le nombre de mots de passe explose avec le nombre de signes.",
          schema: ecranSeulement(tableau(["signes", "26", "36", "62"], ["mots de 8", "2,09 × 10¹¹", "2,82 × 10¹²", "2,18 × 10¹⁴"])),
          micros: ["denombrement_produit_somme", "denombrement_reconnaitre"],
        },
        {
          enonce:
            "Un livreur va du point A $(0 ; 0)$ au point B $(4 ; 3)$ en suivant les rues d'un quartier en damier. Il ne fait que des pas d'une unité vers la droite (D) ou vers le haut (H). Le dessin montre un trajet, DDHDHHD, et le point P $(2 ; 1)$.\na) Combien de pas fait chaque trajet ? Combien de D, combien de H ?\nb) Combien de trajets différents de A à B ?\nc) Combien passent par P ? Quelle est la probabilité qu'un trajet choisi au hasard passe par P ?",
          figure: repere([-1, 5, -1, 4], [{ pts: [[0, 0], [2, 0], [2, 1], [3, 1], [3, 3], [4, 3]], couleur: ORANGE }], [{ x: 0, y: 0, label: "" }, { x: 4, y: 3, label: "" }, { x: 2, y: 1, label: "" }]),
          correction:
            "a) Pour aller de $(0 ; 0)$ à $(4 ; 3)$, il faut $4$ pas D et $3$ pas H : $7$ pas en tout, dans n'importe quel ordre.\nb) Un trajet est un mot de $7$ lettres avec $4$ D et $3$ H. Il suffit de choisir les $3$ places des H parmi les $7$.\n$\\dbinom{7}{3} = \\dfrac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$ trajets.\nc) De A à P : $2$ D et $1$ H, soit $\\dbinom{3}{1} = 3$ trajets. De P à B : $2$ D et $2$ H, soit $\\dbinom{4}{2} = 6$ trajets.\nPrincipe multiplicatif : $3 \\times 6 = 18$ trajets passent par P.\nProbabilité : $\\dfrac{18}{35} \\approx 0{,}514$.\n⚠️ On choisit les places des H, et les D prennent les autres. Choisir aussi les places des D compterait deux fois la même chose.\n⭐ Sur le dessin : le trajet orange passe par P. Il fait bien $4$ pas vers la droite et $3$ vers le haut.",
          micros: ["denombrement_coefficient_binomial", "denombrement_reconnaitre"],
        },
        {
          enonce:
            "Démonstrations du cours. Soit $E$ un ensemble à $n$ éléments.\na) Montrer que $\\dbinom{n}{k} = \\dbinom{n}{n-k}$, en associant à chaque partie son complémentaire.\nb) On fixe un élément $a$ de $E$. En triant les parties à $k + 1$ éléments selon qu'elles contiennent $a$ ou non, montrer la relation de Pascal $\\dbinom{n+1}{k+1} = \\dbinom{n}{k} + \\dbinom{n}{k+1}$ (ici $E$ a $n + 1$ éléments).\nc) Montrer que $E$ a $2^n$ parties, et en déduire la somme des nombres de la ligne $n$ du triangle.",
          correction:
            "a) Choisir les $k$ éléments qu'on garde, c'est choisir les $n - k$ qu'on laisse. L'application « partie ↦ complémentaire » associe à chaque partie à $k$ éléments une unique partie à $n - k$ éléments, et inversement.\nLes deux ensembles de parties ont donc le même nombre d'éléments : $\\dbinom{n}{k} = \\dbinom{n}{n-k}$.\nb) $E$ a $n + 1$ éléments, dont $a$. Une partie à $k + 1$ éléments contient $a$, ou ne le contient pas : deux cas sans recouvrement.\nSi elle contient $a$, il reste $k$ éléments à choisir parmi les $n$ autres : $\\dbinom{n}{k}$ parties.\nSinon, ses $k + 1$ éléments sont pris parmi les $n$ autres : $\\dbinom{n}{k+1}$ parties.\nPrincipe additif : $\\dbinom{n+1}{k+1} = \\dbinom{n}{k} + \\dbinom{n}{k+1}$.\nc) Chaque élément est dans la partie ou non : $2$ choix, $n$ fois, soit $2^n$ parties.\nEn les triant par taille, de $0$ à $n$ : $\\dbinom{n}{0} + \\dbinom{n}{1} + \\cdots + \\dbinom{n}{n} = 2^n$.\n⚠️ Un exemple ne démontre pas : on raisonne pour $n$ et $k$ quelconques. Les nombres servent seulement à vérifier.\n⭐ Sur le dessin (ligne $5$) : la symétrie $1$, $5$, $10$ | $10$, $5$, $1$, et la somme $32 = 2^5$.",
          schema: ecranSeulement(tableau(["k", "0", "1", "2", "3", "4", "5"], ["ligne 5", 1, 5, 10, 10, 5, 1])),
          micros: ["denombrement_pascal", "denombrement_coefficient_binomial"],
        },
        {
          enonce:
            "Une archère tire $5$ flèches. Chaque flèche atteint la cible avec la probabilité $0{,}8$, indépendamment des autres. $X$ est le nombre de flèches dans la cible.\na) Combien de suites de $5$ tirs (S pour succès, E pour échec) comportent exactement $3$ succès ?\nb) En déduire $P(X = 3)$.\nc) Calculer $P(X \\geqslant 4)$.",
          correction:
            "a) Une telle suite est déterminée par les places des $3$ succès parmi les $5$ tirs : $\\dbinom{5}{3} = 10$ suites (SSSEE, SSESE, …).\nb) Chaque suite avec $3$ S et $2$ E a la probabilité $0{,}8^3 \\times 0{,}2^2$, par indépendance.\n$P(X = 3) = 10 \\times 0{,}512 \\times 0{,}04 = 0{,}2048$.\nc) $P(X = 4) = \\dbinom{5}{4} \\times 0{,}8^4 \\times 0{,}2$ $= 5 \\times 0{,}4096 \\times 0{,}2 = 0{,}4096$.\n$P(X = 5) = 0{,}8^5 = 0{,}32768$.\n$P(X \\geqslant 4) = 0{,}4096 + 0{,}32768 = 0{,}73728$.\n⭐ C'est ici que le coefficient binomial entre dans la loi binomiale : il compte les chemins de l'arbre qui mènent à $k$ succès.\n⚠️ Oublier le facteur $\\dbinom{5}{3}$, c'est ne compter qu'UN chemin (SSSEE) au lieu de dix.\n⭐ Sur le dessin : la loi de $X$. La barre $3$ vaut $0{,}205$, les barres $4$ et $5$ font à elles deux près des trois quarts.",
          schema: diagramme("barres", [
            { label: "0", value: 0 },
            { label: "1", value: 0.006 },
            { label: "2", value: 0.051 },
            { label: "3", value: 0.205 },
            { label: "4", value: 0.41 },
            { label: "5", value: 0.328 },
          ]),
          micros: ["denombrement_coefficient_binomial", "denombrement_reconnaitre"],
        },
        {
          enonce:
            "Une urne contient $5$ boules rouges et $3$ boules vertes, dessinées ci-dessous. On tire $3$ boules.\na) Tirage simultané : combien de tirages ? Quelle est la probabilité d'obtenir exactement $2$ rouges ?\nb) Tirage successif sans remise : combien de tirages ? Même probabilité ?\nc) Tirage successif avec remise : combien de tirages ? Même probabilité ?",
          figure: billes([
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "R", couleur: "#dc2626" },
            { label: "V", couleur: "#16a34a" },
            { label: "V", couleur: "#16a34a" },
            { label: "V", couleur: "#16a34a" },
          ]),
          correction:
            "a) Simultané : l'ordre ne compte pas, c'est une partie de $3$ boules parmi $8$. $\\dbinom{8}{3} = 56$ tirages.\n$2$ rouges parmi $5$ et $1$ verte parmi $3$ : $\\dbinom{5}{2} \\times \\dbinom{3}{1} = 30$. $P = \\dfrac{30}{56} = \\dfrac{15}{28} \\approx 0{,}536$.\nb) Successif sans remise : l'ordre compte. $8 \\times 7 \\times 6 = 336$ tirages.\nLa verte peut sortir en 1re, 2e ou 3e position ($3$ places), puis $5 \\times 4$ rouges et $3$ vertes : $3 \\times 5 \\times 4 \\times 3 = 180$.\n$P = \\dfrac{180}{336} = \\dfrac{15}{28}$ : la même probabilité.\nc) Avec remise : $8^3 = 512$ tirages. Favorables : $3 \\times 5 \\times 5 \\times 3 = 225$. $P = \\dfrac{225}{512} \\approx 0{,}439$.\n⭐ En b), compter avec ordre ou sans ordre donne la même probabilité, POURVU qu'on compte les cas favorables et les cas possibles de la même façon.\n⚠️ Avec remise, la probabilité change : une boule tirée peut ressortir.\n⭐ Sur le dessin : $5$ rouges et $3$ vertes, $8$ boules en tout.",
          micros: ["denombrement_reconnaitre", "denombrement_arrangement_combinaison", "denombrement_produit_somme"],
        },
        {
          enonce:
            "Le digicode d'un immeuble accepte des codes de $3$ ou de $4$ chiffres.\na) Combien de codes différents sont possibles ?\nb) Combien de codes de $4$ chiffres ont leurs chiffres tous différents ?\nc) Combien de nombres entiers de $4$ chiffres (le premier n'est pas $0$) ont leurs chiffres tous différents ?",
          correction:
            "a) Codes de $3$ chiffres : $10^3 = 1\\,000$. Codes de $4$ chiffres : $10^4 = 10\\,000$.\nUn code a $3$ OU $4$ chiffres, jamais les deux : principe additif, $1\\,000 + 10\\,000 = 11\\,000$ codes.\nb) $10$ choix pour le premier chiffre, puis $9$, $8$, $7$ : $10 \\times 9 \\times 8 \\times 7 = 5\\,040$.\nc) Le premier chiffre ne peut pas être $0$ : $9$ choix. Le deuxième peut être $0$, mais pas le premier : encore $9$ choix. Puis $8$ et $7$.\n$9 \\times 9 \\times 8 \\times 7 = 4\\,536$ nombres.\n⚠️ En c), le deuxième facteur est $9$, pas $8$ : le $0$ interdit en tête redevient permis ensuite.\n⭐ Sur le dessin : les quatre cases du c), et le nombre de choix qui reste dans chacune.",
          schema: ecranSeulement(tableau(["chiffre", "milliers", "centaines", "dizaines", "unités"], ["choix", 9, 9, 8, 7])),
          micros: ["denombrement_produit_somme", "denombrement_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac : on reconnaît chaque situation, on compte, puis on en tire des probabilités.",
      rappel: [
        "Découper le problème en étapes (principe multiplicatif) ou en cas disjoints (principe additif), et reconnaître l'outil de chaque étape.",
        "Vérifier un résultat par un autre chemin : une formule, un petit cas qu'on compte à la main, une somme qui doit tomber juste.",
        "Diviser quand on a compté trop : chaque objet compté plusieurs fois, le même nombre de fois, se corrige par une division.",
      ],
      exercices: [
        {
          titre: "Le tournoi",
          enonce:
            "$10$ équipes disputent un tournoi.\na) Chaque équipe rencontre une fois chacune des autres. Combien de matchs ? Le dessin montre le cas de $5$ équipes.\nb) Et en matchs aller-retour ?\nc) Combien de classements possibles pour les trois premières places ?\nd) On répartit les $10$ équipes en deux poules de $5$, sans nom. Combien de répartitions ?",
          correction:
            "a) Un match est une paire d'équipes, sans ordre : $\\dbinom{10}{2} = \\dfrac{10 \\times 9}{2} = 45$ matchs.\nAutre chemin : chaque équipe joue $9$ matchs, soit $10 \\times 9 = 90$, mais chaque match est compté deux fois (une fois par équipe). $\\dfrac{90}{2} = 45$.\nb) Aller-retour : l'ordre compte (qui reçoit ?). $10 \\times 9 = 90$ matchs.\nc) Arrangement de $3$ équipes parmi $10$ : $10 \\times 9 \\times 8 = 720$ classements.\nd) Choisir la poule de l'équipe 1 revient à choisir ses $4$ partenaires parmi les $9$ autres : $\\dbinom{9}{4} = 126$.\nAutre chemin : $\\dbinom{10}{5} = 252$ choix d'une « première » poule, mais chaque répartition est comptée deux fois (poule 1 et poule 2 échangées). $\\dfrac{252}{2} = 126$.\n⚠️ En d), les poules n'ont pas de nom : choisir $\\{1, 2, 3, 4, 5\\}$ ou son complémentaire donne la même répartition.\n⭐ Sur le dessin : $5$ équipes, et un segment par match. On compte $\\dbinom{5}{2} = 10$ segments.",
          schema: repere(
            [-3, 3, -3, 3],
            [{ pts: [[0, 2], [-1.902, 0.618], [-1.176, -1.618], [1.176, -1.618], [1.902, 0.618], [0, 2], [-1.176, -1.618], [1.902, 0.618], [-1.902, 0.618], [1.176, -1.618], [0, 2]], couleur: ORANGE }],
            [
              { x: 0, y: 2, label: "" },
              { x: -1.902, y: 0.618, label: "" },
              { x: -1.176, y: -1.618, label: "" },
              { x: 1.176, y: -1.618, label: "" },
              { x: 1.902, y: 0.618, label: "" },
            ],
          ),
          micros: ["denombrement_defi", "denombrement_reconnaitre", "denombrement_arrangement_combinaison", "denombrement_coefficient_binomial"],
        },
        {
          titre: "Le jeu de tirage",
          enonce:
            "Dans un jeu, une grille consiste à cocher $5$ numéros parmi $30$, puis un numéro « chance » parmi $5$. Le tirage désigne $5$ bons numéros et un numéro chance, au hasard.\na) Combien de grilles différentes ?\nb) Quelle est la probabilité de gagner le gros lot (les $5$ bons numéros et le bon numéro chance) ?\nc) Quelle est la probabilité d'avoir exactement $3$ bons numéros parmi les $5$ cochés ?\nd) Quelle est la probabilité d'avoir au moins un bon numéro ?\ne) Vérifier que $\\dbinom{5}{0}\\dbinom{25}{5} + \\dbinom{5}{1}\\dbinom{25}{4} + \\cdots + \\dbinom{5}{5}\\dbinom{25}{0} = \\dbinom{30}{5}$, et expliquer pourquoi.",
          correction:
            "a) $\\dbinom{30}{5} = 142\\,506$ choix des numéros, PUIS $5$ numéros chance : $142\\,506 \\times 5 = 712\\,530$ grilles.\nb) Une seule grille gagne : $P = \\dfrac{1}{712\\,530} \\approx 1{,}4 \\times 10^{-6}$.\nc) On choisit $3$ numéros parmi les $5$ bons, et $2$ parmi les $25$ mauvais : $\\dbinom{5}{3} \\times \\dbinom{25}{2} = 10 \\times 300 = 3\\,000$.\n$P = \\dfrac{3\\,000}{142\\,506} \\approx 0{,}021$.\nd) Aucun bon numéro : $\\dbinom{25}{5} = 53\\,130$ choix. $P = 1 - \\dfrac{53\\,130}{142\\,506} \\approx 0{,}627$.\ne) Les termes valent $53\\,130$ ; $63\\,250$ ; $23\\,000$ ; $3\\,000$ ; $125$ ; $1$, et leur somme fait $142\\,506$.\nC'est normal : chaque grille de $5$ numéros a un nombre de bons numéros entre $0$ et $5$. On a compté toutes les grilles, triées selon ce nombre.\n⚠️ En c) et d), le numéro chance ne compte pas : on raisonne sur les $\\dbinom{30}{5}$ choix de numéros, pas sur les $712\\,530$ grilles.\n⭐ Sur le dessin : la loi du nombre de bons numéros. Avoir $0$ ou $1$ bon numéro, c'est plus de $80$ % des cas.",
          schema: diagramme("barres", [
            { label: "0", value: 0.373 },
            { label: "1", value: 0.444 },
            { label: "2", value: 0.161 },
            { label: "3", value: 0.021 },
            { label: "4", value: 0.001 },
            { label: "5", value: 0 },
          ]),
          micros: ["denombrement_defi", "denombrement_coefficient_binomial", "denombrement_produit_somme"],
        },
        {
          titre: "La planche de Galton",
          enonce:
            "Une bille tombe sur une planche de $6$ rangées de clous. À chaque clou, elle part à gauche ou à droite, avec la même probabilité, indépendamment. Elle finit dans l'une des cases numérotées de $0$ à $6$ : le numéro de la case est son nombre de rebonds à droite.\na) Combien de chemins la bille peut-elle suivre ?\nb) Combien de chemins mènent à la case $k$ ? Faire le lien avec le triangle de Pascal.\nc) Calculer la probabilité de chaque case.\nd) Pourquoi le nombre de chemins vers un clou est-il la somme des nombres de chemins vers les deux clous au-dessus ?",
          correction:
            "a) $6$ rebonds, chacun gauche ou droite : $2^6 = 64$ chemins, tous de probabilité $\\left(\\dfrac{1}{2}\\right)^6 = \\dfrac{1}{64}$.\nb) Un chemin vers la case $k$ comporte $k$ rebonds à droite parmi les $6$ : on choisit leurs places, $\\dbinom{6}{k}$ chemins.\nCe sont les nombres de la ligne $6$ du triangle : $1$, $6$, $15$, $20$, $15$, $6$, $1$. Leur somme fait bien $64$.\nc) $P(\\text{case } k) = \\dfrac{1}{64}\\dbinom{6}{k}$. Case $3$ : $\\dfrac{20}{64} = 0{,}3125$. Cases $2$ et $4$ : $\\dfrac{15}{64} \\approx 0{,}234$.\nCases $1$ et $5$ : $\\dfrac{6}{64} \\approx 0{,}094$. Cases $0$ et $6$ : $\\dfrac{1}{64} \\approx 0{,}016$.\nd) Pour arriver à un clou, la bille vient forcément du clou en haut à gauche ou du clou en haut à droite, jamais des deux : on additionne. C'est la relation de Pascal.\n⭐ Le numéro de case suit la loi binomiale $\\mathcal{B}(6 ; 0{,}5)$ : son espérance vaut $3$, la case du milieu.\n⚠️ Les cases ne sont PAS équiprobables : ce sont les chemins qui le sont, et il y en a $20$ vers la case $3$ contre $1$ vers la case $0$.\n⭐ Sur le dessin : le nombre de chemins vers chaque case, sur $64$. La cloche est symétrique autour de la case $3$ ; on divise par $64$ pour lire les probabilités.",
          schema: diagramme("barres", [
            { label: "0", value: 1 },
            { label: "1", value: 6 },
            { label: "2", value: 15 },
            { label: "3", value: 20 },
            { label: "4", value: 15 },
            { label: "5", value: 6 },
            { label: "6", value: 1 },
          ]),
          micros: ["denombrement_defi", "denombrement_pascal", "denombrement_coefficient_binomial"],
        },
        {
          titre: "Les anniversaires",
          enonce:
            "Dans une classe de $n$ élèves, on s'intéresse aux dates d'anniversaire. On suppose que l'année a $365$ jours, tous équiprobables, et que les dates des élèves sont indépendantes.\na) Combien de listes de dates d'anniversaire sont possibles pour les $n$ élèves ?\nb) Combien de ces listes ont des dates toutes différentes ?\nc) En déduire la probabilité $p_n$ qu'au moins deux élèves aient le même anniversaire.\nd) Calculer $p_{23}$ et $p_{30}$. Interpréter.",
          correction:
            "a) Chaque élève a $365$ dates possibles, et deux élèves peuvent avoir la même : $365^n$ listes.\nb) Dates toutes différentes : $365$ choix pour le premier élève, $364$ pour le deuxième… C'est un arrangement : $365 \\times 364 \\times \\cdots \\times (365 - n + 1)$.\nc) « Au moins deux élèves ont le même anniversaire » est le contraire de « toutes les dates sont différentes ».\n$p_n = 1 - \\dfrac{365 \\times 364 \\times \\cdots \\times (365 - n + 1)}{365^n}$.\nd) À la calculatrice : $p_{23} \\approx 0{,}507$ et $p_{30} \\approx 0{,}706$.\nDès $23$ élèves, il y a plus d'une chance sur deux que deux élèves fêtent leur anniversaire le même jour ; dans une classe de $30$, plus de sept chances sur dix.\n⚠️ On pense souvent « $23$ sur $365$, c'est peu ». Mais on compare des PAIRES d'élèves : avec $23$ élèves, il y a $\\dbinom{23}{2} = 253$ paires.\n⚠️ En a), les répétitions sont permises ; en b), non. C'est toute la différence entre $365^n$ et l'arrangement.\n⭐ Sur le dessin (une graduation = $10$ élèves) : la courbe de $p_n$ passe la droite $y = 0{,}5$ à $n = 23$, et frôle $1$ dès $60$ élèves.",
          schema: repere(
            [-1, 7, -1, 2],
            [{ pts: [[0, 0], [0.5, 0.027], [1, 0.117], [1.5, 0.253], [2, 0.411], [2.5, 0.569], [3, 0.706], [3.5, 0.814], [4, 0.891], [4.5, 0.941], [5, 0.97], [5.5, 0.986], [6, 0.994]] }],
            [{ x: 2.3, y: 0.507, label: "" }],
            0.5,
          ),
          micros: ["denombrement_defi", "denombrement_arrangement_combinaison", "denombrement_produit_somme"],
        },
      ],
    },
  ],
};
