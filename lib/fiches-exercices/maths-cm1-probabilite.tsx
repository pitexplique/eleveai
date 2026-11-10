// ─── Fiche d'exercices : le hasard et les chances (CM1) — 20 exercices corrigés ─
//
// 10/11/2026 : la première feuille de probabilités du CM1, pour la notion
// `probabilite` du coach CM1 (6 micros). Sur la forme de
// `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/probabilites.bank.ts`
// et sur la carte mentale `cm1/probabilite` (`lib/cartes/remplies/cm1.json`) :
// certain, possible, impossible ; une situation de hasard ; comparer des
// chances ; un dé, une roue, un sac ; toutes les issues ; défis.
// ⛔ LIMITES DU CM1 : AUCUNE fraction de probabilité (bo.ts : « Probabilités »,
// sans plus). On dit « 3 chances sur 8 », comme la carte mentale, et l'on
// compare en COMPTANT les cas gagnants. Pas de calcul de fréquence.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, oui ou non, un nombre, un mot.
//
// Les pièges nommés : « possible » pris pour « certain » (1, 7), un sac d'une
// seule couleur (2), « je ne sais pas encore » pris pour du hasard (3),
// compter les couleurs au lieu des parts (4, 16), la pièce qui aurait une
// mémoire (5, 15), le plus grand nombre de billes vertes sans regarder le
// reste (6, 12), « 6 est plus dur à faire » (8, 15), oublier une couleur dans
// le total (9), parts gagnantes comparées aux perdantes au lieu du total (10),
// PF et FP comptés une seule fois (11), oublier un menu (13), un seul nombre
// gagnant au lieu de plusieurs (14), le plus de tickets à soi seul (17), deux
// chaussettes « forcément » pareilles (18), oublier ce qu'on a enlevé (19),
// ajouter sans recompter le total (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux de société (1, 6, 14), billes (2),
// sciences (3), kermesse (4, 10), sport (5, arbitre), météo et nature (7),
// cuisine (13, cuisinier), astronomie (3), centre de loisirs (17), pompier
// (18), spectacle (19, magicienne), fabrication de jeux (20).
// Les métiers des problèmes : animatrice (17), pompier (18), magicienne (19),
// créatrice de jeux de société (20). Aucun décor réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : un dé ordinaire a 6 faces numérotées de 1 à 6 ; une pièce a
// deux côtés, pile et face. Le Soleil se lève chaque matin (rotation de la
// Terre). Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `de`, `roue` et `billes` de `figures.tsx` (canvas
// `probabilites` du coach), une part de roue par case pour qu'on la compte.
//
// Micro-compétences : probabilite_vocabulaire (1, 2, 7, 9, 15, 17, 18, 19),
// probabilite_hasard (3, 5, 15), probabilite_comparer (4, 6, 8, 10, 12, 14,
// 17, 20), probabilite_roue_de_sac (4, 8, 9, 10, 16, 19, 20),
// probabilite_issues (5, 11, 13, 14), probabilite_defi (16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, billes, de, roue } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#eab308";
const GRIS = "#94a3b8";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins côte à côte (à partir de `sm` et sur papier), l'un sous l'autre au téléphone. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);
const nomme = (nom: string, dessin: ReactNode) => (
  <div className="min-w-0">
    <p className="mb-1 text-center text-sm font-black text-slate-700">{nom}</p>
    {dessin}
  </div>
);

/** `n` billes d'une couleur. */
const lot = (n: number, couleur: string) => Array.from({ length: n }, () => ({ couleur }));
/** Une roue de parts égales : une part par lettre, dans l'ordre donné. */
const parts = (liste: [string, string][]) => roue(liste.map(([label, couleur]) => ({ label, poids: 1, couleur })));

export const exercicesProbabiliteCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "probabilite",
  titre: "Le hasard et les chances",
  accroche:
    "Vingt exercices, du geste seul au problème. Dire si un événement est certain, possible ou impossible. Reconnaître une situation de hasard. Compter les cas gagnants sur un dé, une roue ou dans un sac. Comparer des chances. Trouver tous les résultats possibles. Un jeu de société, une kermesse, un match, un menu, une tombola, des chaussettes dans le noir et un tour de magie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par question. Je me demande : est-ce que cela peut arriver ? Toujours ?",
      rappel: [
        "Certain : cela arrive à coup sûr. Impossible : cela n'arrive jamais.",
        "Possible : cela peut arriver, mais ce n'est pas sûr.",
        "C'est du hasard quand on ne peut pas connaître le résultat avant.",
        "Plus il y a de cas gagnants, plus on a de chances.",
      ],
      exercices: [
        {
          enonce:
            "Yanis lance un dé ordinaire, numéroté de 1 à 6.\nPour chaque événement, écris : certain, possible ou impossible.\na) Obtenir 4.\nb) Obtenir 7.\nc) Obtenir un nombre plus petit que 7.\nd) Obtenir 0.",
          figure: de(),
          correction:
            "Je regarde les 6 faces du dé : 1, 2, 3, 4, 5 et 6.\na) Le 4 est sur une face. Il peut sortir, mais ce n'est pas sûr : possible.\nb) Aucune face ne porte 7 : impossible.\nc) Toutes les faces sont plus petites que 7. Quoi qu'il arrive, c'est gagné : certain.\nd) Aucune face ne porte 0 : impossible.\n⛔ Le piège : dire « certain » pour le a). Le 4 peut sortir, mais il reste 5 autres faces.\nRéponse : a) possible ; b) impossible ; c) certain ; d) impossible.",
          reponses: [
            { question: "a)", attendu: "possible" },
            { question: "b)", attendu: "impossible" },
            { question: "c)", attendu: "certain" },
            { question: "d)", attendu: "impossible" },
          ],
          micros: ["probabilite_vocabulaire"],
        },
        {
          enonce:
            "Un sac contient 5 billes rouges, et rien d'autre. Mei tire une bille sans regarder.\na) Tirer une bille rouge : certain, possible ou impossible ?\nb) Tirer une bille bleue : certain, possible ou impossible ?\nc) Mei ajoute 1 bille bleue dans le sac. Maintenant, tirer une bille bleue est : A) possible B) certain C) impossible",
          figure: billes(lot(5, ROUGE)),
          correction:
            "a) Toutes les billes sont rouges. La bille tirée sera rouge à coup sûr : certain.\nb) Il n'y a aucune bille bleue dans le sac : impossible.\nc) Il y a maintenant 5 rouges et 1 bleue, soit 6 billes. La bleue peut sortir, mais ce n'est pas sûr : possible. Réponse A.\n⛔ Le piège : dire « certain » au c) parce qu'on vient d'ajouter la bleue. Il y a aussi 5 rouges qui peuvent sortir.\nRéponse : a) certain ; b) impossible ; c) A, possible.",
          reponses: [
            { question: "a)", attendu: "certain" },
            { question: "b)", attendu: "impossible" },
            { question: "c)", attendu: ["A", "a) possible", "possible"] },
          ],
          micros: ["probabilite_vocabulaire"],
        },
        {
          enonce:
            "Est-ce une situation de hasard ? Réponds par oui ou non.\na) Lancer une pièce pour savoir qui commence le match.\nb) Calculer 8 + 5.\nc) Tirer un ticket de tombola sans regarder.\nd) Dire quel jour vient après lundi.",
          correction:
            "C'est du hasard quand on ne peut pas savoir le résultat AVANT.\na) Pile ou face ? Personne ne peut le savoir avant : oui, c'est du hasard.\nb) 8 + 5 = 13, toujours. On connaît le résultat : non.\nc) Le ticket tiré est une surprise : oui.\nd) Après lundi vient toujours mardi : non.\n⛔ Le piège : croire que « je ne connais pas encore la réponse » veut dire « hasard ». Un calcul a une seule réponse, même si je ne l'ai pas encore trouvée.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["oui", "vrai"] },
            { question: "d)", attendu: ["non", "faux"] },
          ],
          micros: ["probabilite_hasard"],
        },
        {
          enonce:
            "À la kermesse, on fait tourner cette roue. Toutes les parts ont la même taille.\na) Combien de parts a la roue en tout ?\nb) Quelle couleur a le plus de chances de sortir ?\nc) Quelle couleur a le moins de chances de sortir ?",
          figure: parts([
            ["B", BLEU],
            ["R", ROUGE],
            ["B", BLEU],
            ["J", JAUNE],
            ["B", BLEU],
            ["R", ROUGE],
            ["B", BLEU],
            ["B", BLEU],
          ]),
          correction:
            "Les lettres disent la couleur : B pour bleu, R pour rouge, J pour jaune.\na) Je compte toutes les parts, une par une : 8 parts.\nb) Je compte les parts de chaque couleur. Bleu : 5. Rouge : 2. Jaune : 1.\nLe bleu a le plus de parts : il a le plus de chances, 5 chances sur 8.\nc) Le jaune n'a qu'une part : il a le moins de chances, 1 chance sur 8.\n⭐ Je vérifie : 5 + 2 + 1 = 8 parts.\n⛔ Le piège : répondre 3 au a), le nombre de COULEURS. Je compte toutes les parts.\nRéponse : a) 8 parts ; b) le bleu ; c) le jaune.",
          reponses: [
            { question: "a)", attendu: ["8", "8 parts"] },
            { question: "b)", attendu: ["bleu", "le bleu"] },
            { question: "c)", attendu: ["jaune", "le jaune"] },
          ],
          micros: ["probabilite_comparer", "probabilite_roue_de_sac"],
        },
        {
          enonce:
            "Avant le match, l'arbitre lance une pièce de monnaie.\na) Combien de résultats sont possibles ?\nb) Écris ces résultats.\nc) La veille, la pièce est tombée 3 fois de suite sur pile. Au lancer suivant, obtenir face est : A) certain B) impossible C) possible",
          correction:
            "a) Une pièce a deux côtés. Elle tombe sur l'un ou sur l'autre : 2 résultats.\nb) Les deux résultats sont pile et face.\nc) La pièce ne se souvient pas des lancers d'avant. Face peut sortir, pile aussi : possible. Réponse C.\n⛔ Le piège : croire que face est « obligé » après 3 piles. La pièce n'a pas de mémoire : à chaque lancer, tout recommence.\nRéponse : a) 2 résultats ; b) pile et face ; c) C, possible.",
          reponses: [
            { question: "a)", attendu: ["2", "deux", "2 résultats"] },
            { question: "b)", attendu: ["pile et face", "pile ; face", "pile, face", "face et pile"] },
            { question: "c)", attendu: ["C", "c) possible", "possible"] },
          ],
          micros: ["probabilite_hasard", "probabilite_issues"],
        },
        {
          enonce:
            "Pour un jeu de société, il faut tirer une bille verte. Inès hésite entre deux sacs.\nSac A : 2 billes vertes et 6 billes jaunes.\nSac B : 6 billes vertes et 2 billes jaunes.\na) Combien de billes y a-t-il dans chaque sac ?\nb) Dans quel sac a-t-elle le plus de chances de tirer une verte ?\nc) Dans le sac A, quelle couleur a le plus de chances de sortir ?",
          figure: deux(
            nomme("Sac A", billes([...lot(2, VERT), ...lot(6, JAUNE)])),
            nomme("Sac B", billes([...lot(6, VERT), ...lot(2, JAUNE)])),
          ),
          correction:
            "a) Sac A : 2 + 6 = 8 billes. Sac B : 6 + 2 = 8 billes. Les deux sacs ont autant de billes.\nb) Les sacs ont le même nombre de billes. Je compare les vertes : 6 dans le sac B, 2 dans le sac A. C'est le sac B : 6 chances sur 8.\nc) Dans le sac A, il y a 6 jaunes et 2 vertes. Le jaune a plus de chances.\n⛔ Le piège : choisir un sac sans compter. Ici, les deux sacs ont 8 billes : je peux comparer les vertes directement.\nRéponse : a) 8 billes chacun ; b) le sac B ; c) le jaune.",
          reponses: [
            { question: "a)", attendu: ["8", "8 billes"] },
            { question: "b)", attendu: ["B", "le sac B", "sac B"] },
            { question: "c)", attendu: ["jaune", "le jaune"] },
          ],
          micros: ["probabilite_comparer"],
        },
        {
          enonce:
            "Écris pour chaque phrase : certain, possible ou impossible.\na) Demain matin, le Soleil se lèvera.\nb) Un chat va réciter une poésie en français.\nc) Il va pleuvoir samedi.\nd) En semant une graine de tomate, il pousse un pommier.",
          correction:
            "a) Le Soleil se lève chaque matin, car la Terre tourne sur elle-même : certain.\nb) Un chat ne parle pas : impossible.\nc) Il peut pleuvoir samedi, ou faire beau. On ne le sait pas à coup sûr : possible.\nd) Une graine de tomate donne un plant de tomate, jamais un pommier : impossible.\n⛔ Le piège : dire « certain » au c) parce que la météo l'annonce. Une prévision peut se tromper : c'est seulement possible.\nRéponse : a) certain ; b) impossible ; c) possible ; d) impossible.",
          reponses: [
            { question: "a)", attendu: "certain" },
            { question: "b)", attendu: "impossible" },
            { question: "c)", attendu: "possible" },
            { question: "d)", attendu: "impossible" },
          ],
          micros: ["probabilite_vocabulaire"],
        },
        {
          enonce:
            "Lucas lance un dé ordinaire.\na) Combien de faces donnent un nombre pair ?\nb) Combien de faces donnent un nombre plus grand que 4 ?\nc) Obtenir un nombre pair, par rapport à un nombre impair, c'est : A) plus de chances B) autant de chances C) moins de chances",
          figure: de(),
          schema: ecranSeulement(de([2, 4, 6])),
          correction:
            "Le dé a 6 faces : 1, 2, 3, 4, 5, 6.\na) Les nombres pairs sont 2, 4 et 6 : 3 faces.\nb) Plus grand que 4 : le 5 et le 6. Cela fait 2 faces. Le 4 ne compte pas : il n'est pas plus grand que lui-même.\nc) Les impairs sont 1, 3 et 5 : 3 faces aussi. 3 contre 3 : autant de chances. Réponse B.\n⛔ Le piège : compter le 4 au b). « Plus grand que 4 » commence à 5.\nRéponse : a) 3 faces ; b) 2 faces ; c) B, autant de chances.",
          reponses: [
            { question: "a)", attendu: ["3", "3 faces"] },
            { question: "b)", attendu: ["2", "2 faces"] },
            { question: "c)", attendu: ["B", "b) autant de chances", "autant de chances", "autant"] },
          ],
          micros: ["probabilite_comparer", "probabilite_roue_de_sac"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même jeu. Je compte toutes les possibilités, puis les cas gagnants.",
      rappel: [
        "Je compte d'abord TOUS les cas : toutes les billes, toutes les parts.",
        "Puis je compte les cas gagnants : « 3 chances sur 10 ».",
        "Pour trouver tous les résultats, je les écris dans l'ordre, sans en oublier.",
      ],
      exercices: [
        {
          enonce:
            "Dans un sac, il y a 3 billes rouges, 5 billes bleues et 2 billes vertes. Karim tire une bille sans regarder.\na) Combien de billes y a-t-il en tout ?\nb) Il y a combien de chances sur 10 de tirer une bille bleue ?\nc) Quelle couleur a le moins de chances de sortir ?\nd) Tirer une bille jaune : certain, possible ou impossible ?",
          figure: billes([...lot(3, ROUGE), ...lot(5, BLEU), ...lot(2, VERT)]),
          correction:
            "a) J'ajoute toutes les couleurs : 3 + 5 + 2 = 10 billes.\nb) 5 billes sur 10 sont bleues : 5 chances sur 10.\nc) Les vertes sont les moins nombreuses, 2 billes : le vert a le moins de chances.\nd) Il n'y a aucune bille jaune : impossible.\n⛔ Le piège : oublier une couleur dans le total, et trouver 8. Je coche chaque couleur quand je l'ajoute.\nRéponse : a) 10 billes ; b) 5 chances sur 10 ; c) le vert ; d) impossible.",
          reponses: [
            { question: "a)", attendu: ["10", "10 billes"] },
            { question: "b)", attendu: ["5", "5 sur 10", "5 chances sur 10", "5/10"] },
            { question: "c)", attendu: ["vert", "le vert", "verte"] },
            { question: "d)", attendu: "impossible" },
          ],
          micros: ["probabilite_roue_de_sac", "probabilite_vocabulaire"],
        },
        {
          enonce:
            "À la kermesse, une roue a 10 parts égales. 4 parts disent « gagné », les autres « perdu ».\na) Combien de parts disent « perdu » ?\nb) Il y a combien de chances sur 10 de gagner ?\nc) Est-ce plus probable de gagner ou de perdre ?\nd) L'organisatrice veut autant de chances de gagner que de perdre. Combien de parts « gagné » lui faut-il ?",
          figure: parts([
            ["G", VERT],
            ["P", GRIS],
            ["P", GRIS],
            ["G", VERT],
            ["P", GRIS],
            ["P", GRIS],
            ["G", VERT],
            ["P", GRIS],
            ["G", VERT],
            ["P", GRIS],
          ]),
          correction:
            "G veut dire « gagné », P veut dire « perdu ».\na) 10 parts en tout, dont 4 « gagné » : 10 − 4 = 6 parts « perdu ».\nb) 4 parts sur 10 font gagner : 4 chances sur 10.\nc) 6 parts perdent, 4 gagnent. 6 > 4 : perdre est plus probable.\nd) Autant de chances, c'est la moitié des parts pour chaque côté. La moitié de 10, c'est 5 : il faut 5 parts « gagné » et 5 parts « perdu ».\n⛔ Le piège : comparer 4 à 10 au c). Je compare les parts gagnantes aux parts perdantes : 4 contre 6.\nRéponse : a) 6 parts ; b) 4 chances sur 10 ; c) perdre ; d) 5 parts.",
          reponses: [
            { question: "a)", attendu: ["6", "6 parts"] },
            { question: "b)", attendu: ["4", "4 sur 10", "4 chances sur 10", "4/10"] },
            { question: "c)", attendu: ["perdre", "de perdre", "perdu"] },
            { question: "d)", attendu: ["5", "5 parts"] },
          ],
          micros: ["probabilite_roue_de_sac", "probabilite_comparer"],
        },
        {
          enonce:
            "Chloé et Tiago lancent chacun une pièce. On note P pour pile et F pour face. Le résultat de Chloé s'écrit en premier : PF veut dire « Chloé pile, Tiago face ».\na) Combien de résultats différents sont possibles ?\nb) Dans combien de résultats les deux pièces montrent-elles la même chose ?\nc) Dans combien de résultats y a-t-il au moins un pile ?",
          correction:
            "J'écris tous les résultats, dans l'ordre. Chloé pile : PP et PF. Chloé face : FP et FF.\na) PP, PF, FP, FF : 4 résultats.\nb) La même chose : PP et FF. Cela fait 2 résultats.\nc) Au moins un pile : PP, PF et FP. Cela fait 3 résultats. Seul FF n'a pas de pile.\n⛔ Le piège : compter PF et FP une seule fois, et trouver 3 au a). Chloé pile et Tiago face, ce n'est pas Chloé face et Tiago pile.\nRéponse : a) 4 résultats ; b) 2 ; c) 3.",
          reponses: [
            { question: "a)", attendu: ["4", "4 résultats"] },
            { question: "b)", attendu: ["2", "2 résultats"] },
            { question: "c)", attendu: ["3", "3 résultats"] },
          ],
          micros: ["probabilite_issues"],
        },
        {
          enonce:
            "Nils veut tirer une bille rouge. Il peut choisir le sac A ou le sac B.\nSac A : 3 billes rouges et 1 bille bleue.\nSac B : 4 billes rouges et 6 billes bleues.\na) Dans le sac A, y a-t-il plus de billes rouges ou de billes bleues ?\nb) Et dans le sac B ?\nc) Quel sac doit-il choisir ?",
          figure: deux(
            nomme("Sac A", billes([...lot(3, ROUGE), ...lot(1, BLEU)])),
            nomme("Sac B", billes([...lot(4, ROUGE), ...lot(6, BLEU)])),
          ),
          correction:
            "a) Sac A : 3 rouges contre 1 bleue. Il y a plus de rouges : 3 chances sur 4.\nb) Sac B : 4 rouges contre 6 bleues. Il y a plus de bleues : seulement 4 chances sur 10.\nc) Dans le sac A, le rouge sort le plus souvent. Dans le sac B, c'est le bleu. Il choisit le sac A.\n⛔ Le piège : choisir le sac B « parce que 4 > 3 ». Le sac B a 4 rouges, mais aussi 6 bleues. Je compare toujours au reste du sac.\nRéponse : a) plus de rouges ; b) plus de bleues ; c) le sac A.",
          reponses: [
            { question: "a)", attendu: ["rouges", "plus de rouges", "rouge", "les rouges"] },
            { question: "b)", attendu: ["bleues", "plus de bleues", "bleue", "les bleues"] },
            { question: "c)", attendu: ["A", "le sac A", "sac A"] },
          ],
          micros: ["probabilite_comparer"],
        },
        {
          enonce:
            "Un cuisinier prépare des menus surprises. Il tire au hasard une entrée et un dessert.\nEntrées : salade ou soupe.\nDesserts : fruit, yaourt ou gâteau.\na) Combien de menus différents peut-il tirer ?\nb) Combien de ces menus ont une soupe ?\nc) Combien de ces menus ont un gâteau ?",
          correction:
            "J'écris tous les menus, entrée par entrée.\nAvec la salade : salade-fruit, salade-yaourt, salade-gâteau. Cela fait 3 menus.\nAvec la soupe : soupe-fruit, soupe-yaourt, soupe-gâteau. Encore 3 menus.\na) 3 + 3 = 6 menus. C'est aussi 2 entrées × 3 desserts = 6.\nb) Avec la soupe : 3 menus.\nc) Avec le gâteau : salade-gâteau et soupe-gâteau. Cela fait 2 menus.\n⛔ Le piège : ajouter 2 + 3 = 5. Chaque entrée va avec CHAQUE dessert.\nRéponse : a) 6 menus ; b) 3 ; c) 2.",
          reponses: [
            { question: "a)", attendu: ["6", "6 menus"] },
            { question: "b)", attendu: ["3", "3 menus"] },
            { question: "c)", attendu: ["2", "2 menus"] },
          ],
          micros: ["probabilite_issues"],
        },
        {
          enonce:
            "Aya et Hugo jouent avec un dé ordinaire. Aya gagne si le dé montre 5 ou 6. Hugo gagne si le dé montre 1, 2, 3 ou 4.\na) Combien de faces font gagner Aya ?\nb) Combien de faces font gagner Hugo ?\nc) Qui a le plus de chances de gagner ?\nd) Le dé montre un nombre plus grand que 0 : certain, possible ou impossible ?",
          figure: de(),
          correction:
            "a) Aya gagne avec le 5 et le 6 : 2 faces.\nb) Hugo gagne avec 1, 2, 3 et 4 : 4 faces.\nc) 4 faces contre 2 : Hugo a plus de chances, 4 chances sur 6.\n⭐ Je vérifie : 2 + 4 = 6. Chaque face fait gagner quelqu'un.\nd) Toutes les faces portent un nombre plus grand que 0 : certain.\n⛔ Le piège : croire qu'Aya a de la chance « parce que 6 est le plus grand ». Je compte les faces gagnantes, pas la taille des nombres.\nRéponse : a) 2 faces ; b) 4 faces ; c) Hugo ; d) certain.",
          reponses: [
            { question: "a)", attendu: ["2", "2 faces"] },
            { question: "b)", attendu: ["4", "4 faces"] },
            { question: "c)", attendu: "Hugo" },
            { question: "d)", attendu: "certain" },
          ],
          micros: ["probabilite_comparer", "probabilite_issues"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) « La pièce est tombée 4 fois sur face. Le prochain lancer sera pile, c'est certain. »\nb) « Avec un dé, obtenir 6 est plus difficile qu'obtenir 2. »\nc) « Dans un sac de 5 billes noires, tirer une bille noire est certain. »\nd) « Avec un dé, obtenir 2 est possible. »",
          correction:
            "a) La pièce n'a pas de mémoire. Pile peut sortir, face aussi : ce n'est pas certain. Faux.\nb) Le 6 et le 2 sont chacun sur 1 face sur 6. Ils ont autant de chances : faux.\nc) Toutes les billes sont noires : la bille tirée sera noire. Vrai.\nd) Le 2 est sur une face du dé : il peut sortir. Vrai.\n⛔ Le piège du b) : croire que le 6 est rare parce qu'on l'attend souvent dans les jeux. Chaque face a la même chance.\nRéponse : a) faux ; b) faux ; c) vrai ; d) vrai.",
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
            { question: "d)", attendu: ["vrai", "oui"] },
          ],
          micros: ["probabilite_vocabulaire", "probabilite_hasard"],
        },
        {
          enonce:
            "Sofia peint une roue de 8 parts égales : 2 rouges, 4 bleues et 2 vertes.\na) Il y a combien de chances sur 8 de tomber sur le bleu ?\nb) Le rouge a-t-il plus de chances que le vert ? Réponds par oui ou non.\nc) Elle veut que le rouge et le bleu aient autant de chances. Combien de parts bleues doit-elle repeindre en rouge ?",
          figure: parts([
            ["R", ROUGE],
            ["B", BLEU],
            ["B", BLEU],
            ["V", VERT],
            ["R", ROUGE],
            ["B", BLEU],
            ["B", BLEU],
            ["V", VERT],
          ]),
          correction:
            "a) 4 parts sur 8 sont bleues : 4 chances sur 8.\nb) Rouge : 2 parts. Vert : 2 parts. C'est autant : non, le rouge n'a pas plus de chances.\nc) J'essaie. Je repeins 1 part bleue en rouge : il reste 4 − 1 = 3 bleues, et il y a 2 + 1 = 3 rouges. 3 contre 3 : c'est gagné.\nIl faut repeindre 1 part.\n⛔ Le piège : repeindre 2 parts. Alors il y aurait 4 rouges et 2 bleues : le rouge passerait devant. Quand une part change de couleur, une couleur gagne 1 part ET l'autre en perd 1.\nRéponse : a) 4 chances sur 8 ; b) non ; c) 1 part.",
          reponses: [
            { question: "a)", attendu: ["4", "4 sur 8", "4 chances sur 8", "4/8"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["1", "1 part", "une"] },
          ],
          micros: ["probabilite_roue_de_sac", "probabilite_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je compte tous les cas, puis ceux qui m'intéressent.",
      rappel: [
        "Je compte tous les cas, puis les cas gagnants.",
        "Quand on retire ou on ajoute des objets, je recompte le total.",
        "Pour être CERTAIN, il faut que cela marche dans tous les cas, même le pire.",
      ],
      exercices: [
        {
          titre: "La tombola de l'animatrice",
          enonce:
            "Fatou est animatrice dans un centre de loisirs. Elle organise une tombola de 50 tickets. Un seul ticket gagne.\nLina a acheté 5 tickets, Malo 2 tickets et Sam 8 tickets.\na) Qui a le plus de chances de gagner ?\nb) Qui a le moins de chances ?\nc) Combien de tickets ont-ils achetés à eux trois ?\nd) Pour Lina, gagner est : A) possible B) certain C) impossible",
          correction:
            "Le tout, ce sont les 50 tickets. Un seul gagne.\na) Plus j'ai de tickets, plus j'ai de chances. Sam en a le plus, 8 : il a 8 chances sur 50.\nb) Malo en a le moins, 2 : il a 2 chances sur 50.\nc) 5 + 2 + 8 = 15 tickets.\nd) Lina a 5 tickets sur 50. Elle peut gagner, mais 45 autres tickets peuvent sortir : possible. Réponse A.\n⛔ Le piège du d) : croire que Sam va gagner « à coup sûr » avec ses 8 tickets. Il reste 42 tickets qui ne sont pas à lui. Personne n'est certain de gagner.\nRéponse : a) Sam ; b) Malo ; c) 15 tickets ; d) A, possible.",
          reponses: [
            { question: "a)", attendu: "Sam" },
            { question: "b)", attendu: "Malo" },
            { question: "c)", attendu: ["15", "15 tickets"] },
            { question: "d)", attendu: ["A", "a) possible", "possible"] },
          ],
          micros: ["probabilite_comparer", "probabilite_vocabulaire", "probabilite_defi"],
        },
        {
          titre: "Les chaussettes du pompier",
          enonce:
            "Une nuit, l'alarme sonne à la caserne. Le pompier Tom s'habille dans le noir. Son tiroir contient 4 chaussettes rouges et 4 chaussettes bleues, mélangées.\na) Il prend 1 chaussette. Elle est rouge : certain, possible ou impossible ?\nb) Il prend 2 chaussettes. Est-il certain qu'elles soient de la même couleur ? Réponds par oui ou non.\nc) Combien de chaussettes doit-il prendre, au moins, pour être certain d'en avoir 2 de la même couleur ?",
          correction:
            "a) Il y a des rouges et des bleues dans le tiroir. La rouge peut sortir, la bleue aussi : possible.\nb) Il peut tirer une rouge, puis une bleue. Alors les deux sont différentes : non, ce n'est pas certain.\nc) J'imagine le pire. Avec 2 chaussettes, il peut avoir une rouge et une bleue.\nLa 3e chaussette est rouge ou bleue : elle va forcément avec l'une des deux.\nAvec 3 chaussettes, il est certain d'avoir une paire.\n⛔ Le piège : répondre 5, « plus de la moitié des 8 ». Il n'y a que 2 couleurs : 3 chaussettes suffisent.\nRéponse : a) possible ; b) non ; c) 3 chaussettes.",
          reponses: [
            { question: "a)", attendu: "possible" },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["3", "3 chaussettes", "trois"] },
          ],
          micros: ["probabilite_vocabulaire", "probabilite_defi"],
        },
        {
          titre: "Les cartes de la magicienne",
          enonce:
            "Zélie est magicienne. Elle a 10 cartes : 4 cœurs, 3 piques, 2 carreaux et 1 trèfle. Un spectateur tire une carte sans regarder.\na) Quelle famille a le plus de chances de sortir ?\nb) Il y a combien de chances sur 10 de tirer un pique ?\nc) La magicienne retire les 4 cœurs du paquet. Combien de cartes reste-t-il ?\nd) Maintenant, tirer un cœur est : certain, possible ou impossible ?",
          correction:
            "a) Je compare les familles : 4 cœurs, 3 piques, 2 carreaux, 1 trèfle. Le cœur a le plus de cartes : 4 chances sur 10.\nb) 3 cartes sur 10 sont des piques : 3 chances sur 10.\nc) 10 − 4 = 6 cartes restent : 3 piques, 2 carreaux et 1 trèfle.\nd) Il n'y a plus aucun cœur dans le paquet : impossible.\n⭐ Maintenant, c'est le pique qui a le plus de chances : 3 chances sur 6.\n⛔ Le piège du d) : oublier qu'on a retiré les cœurs, et répondre « possible ». Je regarde ce qui reste VRAIMENT dans le paquet.\nRéponse : a) le cœur ; b) 3 chances sur 10 ; c) 6 cartes ; d) impossible.",
          reponses: [
            { question: "a)", attendu: ["cœur", "le cœur", "coeur", "les cœurs", "cœurs"] },
            { question: "b)", attendu: ["3", "3 sur 10", "3 chances sur 10", "3/10"] },
            { question: "c)", attendu: ["6", "6 cartes"] },
            { question: "d)", attendu: "impossible" },
          ],
          micros: ["probabilite_roue_de_sac", "probabilite_vocabulaire", "probabilite_defi"],
        },
        {
          titre: "Le sac de la créatrice de jeux",
          enonce:
            "Léna crée des jeux de société. Pour un nouveau jeu, elle remplit un sac de 12 billes : 6 rouges, 4 bleues et 2 vertes.\na) Range les couleurs, de la plus probable à la moins probable.\nb) Elle veut que le bleu ait autant de chances que le rouge. Combien de billes bleues doit-elle ajouter ?\nc) Après cet ajout, combien de billes y a-t-il dans le sac ?\nd) Il y a alors combien de chances sur 14 de tirer une bille verte ?",
          figure: billes([...lot(6, ROUGE), ...lot(4, BLEU), ...lot(2, VERT)]),
          correction:
            "a) Plus une couleur a de billes, plus elle a de chances. 6 > 4 > 2 : rouge, puis bleu, puis vert.\nb) Le rouge a 6 billes, le bleu 4. Il manque 6 − 4 = 2 billes bleues.\nc) 12 + 2 = 14 billes. Je vérifie : 6 + 6 + 2 = 14.\nd) Il y a toujours 2 billes vertes, sur 14 maintenant : 2 chances sur 14.\n⛔ Le piège du d) : garder l'ancien total, 12. Quand on ajoute des billes, je recompte TOUT le sac.\nRéponse : a) rouge, bleu, vert ; b) 2 billes ; c) 14 billes ; d) 2 chances sur 14.",
          reponses: [
            { question: "a)", attendu: ["rouge ; bleu ; vert", "rouge, bleu, vert", "rouges ; bleues ; vertes", "rouges, bleues, vertes"], ordre: true },
            { question: "b)", attendu: ["2", "2 billes"] },
            { question: "c)", attendu: ["14", "14 billes"] },
            { question: "d)", attendu: ["2", "2 sur 14", "2 chances sur 14", "2/14"] },
          ],
          schema: ecranSeulement(billes([...lot(6, ROUGE), ...lot(6, BLEU), ...lot(2, VERT)])),
          micros: ["probabilite_roue_de_sac", "probabilite_comparer", "probabilite_defi"],
        },
      ],
    },
  ],
};

