// ─── Fiche d'exercices : les pourcentages (CM2) — 20 exercices corrigés ───────
//
// 10/11/2026 : feuille INTERACTIVE (réponses vérifiées sans IA), sur la forme
// des feuilles 6e (`maths-6e-pourcentage-nombre.tsx`) et des feuilles CM2
// (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`,
// cm2/pourcentage) et la banque du coach (`questionBank/cm2/maths/
// pourcentages.bank.ts`) : un pourcentage, c'est « sur 100 » ; le relier à une
// fraction et à un nombre décimal (50 % = 1/2 = 0,5 ; 25 % = 1/4 ; 10 % =
// 1/10) ; calculer 10 %, 20 %, 25 %, 50 % d'une quantité ; les remises ; les
// défis (10 % puis multiplier).
// ⛔ LIMITES DU CM2 : seulement des pourcentages simples (multiples de 5 et de
// 10, 25 %, 75 %), jamais de taux à calculer en « × 0,… ». 10 % se calcule en
// divisant par 10, expliqué par la VALEUR DES CHIFFRES.
// ⛔ CM2 : AUCUNE question ouverte. QCM (A, B, C), vrai/faux, nombres.
// ⛔ Aucun exemple de la carte mentale n'est repris (30 % de judo, jeu vidéo à
// 50 €, vélo à 200 € moins 25 %, 30 % de 40 bonbons).
//
// Les pièges nommés : compter les cases blanches (1), « 42 % » lu sur 10 (2),
// 25 % = 2,5 (3), 1/4 = 4 % (4), 10 % de 80 = 80 − 10 (5), 25 % pris pour la
// moitié (6), 20 % = 70 ÷ 20 (7), 30 % d'une classe de 25 = 30 élèves (8), la
// remise prise pour le prix (9, 16), 20 % de 25 lu « 20 » (10), 0,1 = 1 %
// (11), une part prise pour 1 % (12), enlever 25 € au lieu de 25 % (13),
// 45 % lu « 45 familles » sur 200 (14), soustraire 10 au lieu de diviser (15),
// additionner les pourcentages comme des arbres (17), 60 % lu « 60 kg » (18),
// comparer « 20 » et « 15 » sans calculer les prix (19), prendre la moitié du
// samedi au lieu du dimanche (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (2, 10), sport (9, 12, 16), soldes
// (13, 19), animaux (14), nature (17, verger), corps humain (18), piscine (20),
// musique (10). Les métiers : vétérinaire (14), arboricultrice (17),
// maître-nageur (20).
//
// ⭐ DES FAITS RÉELS, et leurs sources :
//   · ex. 18 — le corps d'un adulte contient environ 60 % d'eau (USGS, « The
//     Water in You: Water and the Human Body »).
//   · ex. 12 — une piste d'athlétisme en salle mesure 200 m (World Athletics,
//     règle des pistes couvertes).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : la grille de 100 cases du coach (`cent`, 1 et 4) et la barre
// coupée en 10 parts (`barres`, 12), de `dessins-fractions-cm2.tsx`.
//
// Micro-compétences : pourcentage_comprendre (1, 2, 8, 14),
// pourcentage_fraction_decimal (3, 4, 11, 12), pourcentage_calculer (5, 6, 7,
// 12, 15), pourcentage_probleme (9, 10, 13, 16, 18), pourcentage_defi (14, 17,
// 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, cent, ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

export const exercicesPourcentageCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "pourcentage",
  titre: "Les pourcentages",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire un pourcentage sur une grille de 100 cases. L'écrire en fraction et en nombre à virgule. Calculer 10 %, 20 %, 25 % ou 50 % d'une quantité. Calculer une remise et le prix à payer. Un ballon de foot, une piste d'athlétisme, des soldes, un sondage sur les animaux, un verger, l'eau du corps humain et une piscine. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/pourcentage", titre: "Les pourcentages" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Un pourcentage, c'est toujours « sur 100 ».",
      rappel: [
        "30 %, c'est 30 sur 100 : 30 parts quand on coupe le tout en 100 parts égales.",
        "50 % = $\\dfrac{1}{2}$ = 0,5. 25 % = $\\dfrac{1}{4}$ = 0,25. 10 % = $\\dfrac{1}{10}$ = 0,1.",
        "Pour 10 %, je divise par 10. Pour 50 %, je prends la moitié. Pour 25 %, la moitié de la moitié.",
      ],
      exercices: [
        {
          enonce: "La grille a 100 cases. Certaines sont coloriées.\na) Combien de cases sont coloriées ?\nb) Quel pourcentage de la grille est colorié ?\nc) Quel pourcentage de la grille n'est pas colorié ?",
          figure: cent(35),
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "35 %" },
            { question: "c)", attendu: "65 %" },
          ],
          correction:
            "a) Je compte les lignes pleines de 10 cases, puis les cases en plus : 3 lignes de 10 et 5 cases. 30 + 5 = 35 cases.\nb) 35 cases sur 100 : c'est 35 %.\nc) Toute la grille, c'est 100 %. Il reste 100 − 35 = 65 cases blanches : 65 %.\nJe vérifie : 35 % + 65 % = 100 %.\n⛔ Le piège : répondre 65 % au b), en comptant les cases blanches. Le pourcentage colorié compte les cases coloriées.\nRéponse : a) 35 ; b) 35 % ; c) 65 %.",
          micros: ["pourcentage_comprendre"],
        },
        {
          enonce: "Dans une école de 100 élèves, 42 élèves viennent à pied.\na) Quel pourcentage des élèves vient à pied ?\nb) Les autres viennent en bus ou en voiture. Quel pourcentage ?\nc) Que veut dire « 42 % » ?\nA) 42 sur 10\nB) 4 sur 2\nC) 42 sur 100",
          reponses: [
            { question: "a)", attendu: "42 %" },
            { question: "b)", attendu: "58 %" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "L'école a 100 élèves : chaque élève, c'est 1 %.\na) 42 élèves sur 100 : 42 %.\nb) Les autres : 100 − 42 = 58 élèves sur 100, soit 58 %.\nc) Le signe % veut dire « sur 100 ». 42 %, c'est 42 sur 100 : choix C.\n⛔ Le piège : lire 42 % comme 42 sur 10, ou comme 4 sur 2. Un pourcentage, c'est toujours sur 100.\nRéponse : a) 42 % ; b) 58 % ; c) C.",
          micros: ["pourcentage_comprendre"],
        },
        {
          enonce: "Complète.\na) 50 % = $\\dfrac{1}{\\ldots}$ : quel est le nombre du bas ?\nb) Écris 25 % avec une virgule.\nc) Écris 10 % avec une fraction.\nd) Écris 75 % avec une virgule.",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "1/10" },
            { question: "d)", attendu: "0,75" },
          ],
          correction:
            "Un pourcentage, ce sont des centièmes : 25 % = $\\dfrac{25}{100}$.\na) 50 %, c'est 50 sur 100 : la moitié. $\\dfrac{50}{100} = \\dfrac{1}{2}$. Le nombre du bas est 2.\nb) 25 % = 25 centièmes. Avec une virgule : 0,25.\nc) 10 % = $\\dfrac{10}{100}$. Je divise le haut et le bas par 10 : $\\dfrac{1}{10}$.\nd) 75 % = 75 centièmes = 0,75.\n⛔ Le piège : écrire 25 % = 2,5. Mais 2,5, c'est plus que 1, donc plus que tout le gâteau ! 25 %, c'est moins que la moitié : 0,25.\nRéponse : a) 2 ; b) 0,25 ; c) $\\dfrac{1}{10}$ ; d) 0,75.",
          micros: ["pourcentage_fraction_decimal"],
        },
        {
          enonce: "Choisis la bonne réponse.\na) Lequel est égal à $\\dfrac{1}{4}$ ?\nA) 4 %\nB) 25 %\nC) 40 %\nb) Lequel est égal à 0,5 ?\nA) 50 %\nB) 5 %\nC) 0,5 %",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
          correction:
            "a) Un quart, c'est le tout coupé en 4 parts. 100 ÷ 4 = 25. Donc $\\dfrac{1}{4}$ = 25 sur 100 = 25 % : choix B.\nb) 0,5 = 5 dixièmes = 50 centièmes. Donc 0,5 = 50 % : choix A.\n⭐ Sur la grille de 100, un quart, ce sont 25 cases.\n⛔ Le piège : $\\dfrac{1}{4}$ = 4 %. Le 4 est le nombre de parts, pas le pourcentage. Et 0,5 n'est pas 5 % : 5 %, c'est 0,05.\nRéponse : a) B ; b) A.",
          schema: ecranSeulement(cent(25)),
          micros: ["pourcentage_fraction_decimal"],
        },
        {
          enonce: "Calcule 10 %.\na) 10 % de 80\nb) 10 % de 350\nc) 10 % de 45",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "4,5" },
          ],
          correction:
            "10 %, c'est $\\dfrac{1}{10}$ : je divise par 10. Chaque chiffre prend une valeur 10 fois plus petite.\na) 80 ÷ 10 : le 8 des dizaines devient le chiffre des unités. 10 % de 80 = 8.\nb) 350 ÷ 10 : le 3 des centaines devient le chiffre des dizaines, le 5 des dizaines devient le chiffre des unités. 10 % de 350 = 35.\nc) 45 ÷ 10 : le 4 des dizaines devient le chiffre des unités, le 5 des unités devient le chiffre des dixièmes. 10 % de 45 = 4,5.\n⛔ Le piège : calculer 80 − 10 = 70. 10 %, ce n'est pas « enlever 10 » : c'est un dixième.\nRéponse : a) 8 ; b) 35 ; c) 4,5.",
          micros: ["pourcentage_calculer"],
        },
        {
          enonce: "Calcule.\na) 50 % de 60\nb) 25 % de 60\nc) 50 % de 90",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "45" },
          ],
          correction:
            "50 %, c'est la moitié : je divise par 2. 25 %, c'est le quart : la moitié de la moitié.\na) 50 % de 60 : 60 ÷ 2 = 30.\nb) 25 % de 60 : la moitié de 30, c'est 30 ÷ 2 = 15. Je vérifie : 60 ÷ 4 = 15.\nc) 50 % de 90 : 90 ÷ 2 = 45.\n⛔ Le piège : croire que 25 % est la moitié. La moitié, c'est 50 %. 25 % est 2 fois plus petit.\nRéponse : a) 30 ; b) 15 ; c) 45.",
          micros: ["pourcentage_calculer"],
        },
        {
          enonce: "Calcule. Commence par 10 % de 70.\na) 20 % de 70\nb) 30 % de 70\nc) 100 % de 70",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "21" },
            { question: "c)", attendu: "70" },
          ],
          correction:
            "D'abord 10 % de 70 : 70 ÷ 10 = 7.\na) 20 %, c'est 2 fois 10 % : 2 × 7 = 14.\nb) 30 %, c'est 3 fois 10 % : 3 × 7 = 21.\nc) 100 %, c'est le tout : 100 % de 70 = 70. Je vérifie : 10 fois 10 %, 10 × 7 = 70.\n⛔ Le piège : calculer 70 ÷ 20 pour 20 %. 20 % ne veut pas dire « diviser par 20 » : c'est 2 fois 10 %.\nRéponse : a) 14 ; b) 21 ; c) 70.",
          micros: ["pourcentage_calculer"],
        },
        {
          enonce: "Vrai ou faux ?\na) 100 % d'un gâteau, c'est le gâteau entier.\nb) Dans une classe de 25 élèves, 30 % des élèves, ce sont 30 élèves.\nc) 50 % d'une somme, c'est la moitié de cette somme.\nd) 20 % est plus grand que 25 %.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) 100 %, c'est 100 parts sur 100 : tout le gâteau. Vrai.\nb) La classe a seulement 25 élèves : il ne peut pas y en avoir 30 ! 30 % veut dire 30 sur 100, pas 30 élèves. Faux.\nc) 50 % = $\\dfrac{1}{2}$ : la moitié. Vrai.\nd) 20 sur 100, c'est moins que 25 sur 100. 20 % < 25 %. Faux.\n⛔ Le piège du b) : prendre le pourcentage pour un nombre d'élèves. 30 % = 30 élèves seulement si le groupe a 100 élèves.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["pourcentage_comprendre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je calcule d'abord 10 % ou la moitié, puis je termine.",
      rappel: [
        "20 %, c'est 2 fois 10 %. 30 %, c'est 3 fois 10 %. 75 %, c'est 3 fois 25 %.",
        "Une remise : je calcule le pourcentage, puis je l'ENLÈVE du prix de départ.",
        "Le tout fait toujours 100 % : ce qui reste, c'est 100 % moins la partie.",
      ],
      exercices: [
        {
          enonce: "Un ballon de foot coûte 30 €. Le magasin fait une remise de 10 %.\na) De combien d'euros est la remise ?\nb) Combien paie-t-on le ballon ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "27" },
          ],
          correction:
            "a) La remise est de 10 % de 30 € : 30 ÷ 10 = 3 €.\nb) J'enlève la remise du prix de départ : 30 − 3 = 27 €.\n⛔ Le piège : répondre 3 € au b). 3 €, c'est la remise, pas le prix à payer.\nRéponse : a) 3 € ; b) 27 €.",
          micros: ["pourcentage_probleme"],
        },
        {
          enonce: "Une classe a 25 élèves. 20 % des élèves jouent d'un instrument de musique.\na) Combien d'élèves jouent d'un instrument ?\nb) Combien d'élèves n'en jouent pas ?\nc) Quel pourcentage des élèves n'en joue pas ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "80 %" },
          ],
          correction:
            "a) 10 % de 25 : 25 ÷ 10 = 2,5. 20 %, c'est 2 fois 10 % : 2 × 2,5 = 5 élèves.\n⭐ Autre chemin : 20 % = $\\dfrac{1}{5}$. 25 ÷ 5 = 5 élèves.\nb) 25 − 5 = 20 élèves n'en jouent pas.\nc) 100 % − 20 % = 80 %.\n⛔ Le piège : répondre 20 élèves au a). 20 %, ce n'est pas 20 élèves : la classe n'en a que 25.\nRéponse : a) 5 élèves ; b) 20 élèves ; c) 80 %.",
          micros: ["pourcentage_probleme"],
        },
        {
          enonce: "Complète.\na) Écris $\\dfrac{3}{4}$ en pourcentage.\nb) Écris 0,1 en pourcentage.\nc) Écris 20 % avec une fraction qui a 5 en bas.\nd) Écris 0,6 en pourcentage.",
          reponses: [
            { question: "a)", attendu: "75 %" },
            { question: "b)", attendu: "10 %" },
            { question: "c)", attendu: "1/5", exact: true },
            { question: "d)", attendu: "60 %" },
          ],
          correction:
            "Je passe par les centièmes : un pourcentage, c'est « sur 100 ».\na) Un quart, c'est 25 %. Trois quarts : 3 × 25 = 75 %.\nb) 0,1 = 1 dixième = 10 centièmes = 10 %.\nc) 20 % = $\\dfrac{20}{100}$. 100 ÷ 5 = 20 : dans 100, il y a 5 fois 20. Donc 20 % = $\\dfrac{1}{5}$.\nd) 0,6 = 6 dixièmes = 60 centièmes = 60 %.\n⛔ Le piège : écrire 0,1 = 1 %. Le 1 est au rang des dixièmes : 0,1, c'est 10 centièmes. 1 %, c'est 0,01.\nRéponse : a) 75 % ; b) 10 % ; c) $\\dfrac{1}{5}$ ; d) 60 %.",
          micros: ["pourcentage_fraction_decimal"],
        },
        {
          enonce: "Une piste d'athlétisme en salle mesure 200 m. La barre la montre, coupée en 10 parts égales. Une coureuse a fait les parts bleues.\na) Une part, c'est quel pourcentage de la piste ?\nb) Combien de mètres dans une part ?\nc) Quel pourcentage de la piste a-t-elle couru ?\nd) Combien de mètres a-t-elle couru ?",
          figure: barres([{ d: 10, label: "200 m", parts: [3] }]),
          reponses: [
            { question: "a)", attendu: "10 %" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "30 %" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "a) La piste entière, c'est 100 %, en 10 parts égales : 100 ÷ 10 = 10 % par part.\nb) 200 m en 10 parts : 200 ÷ 10 = 20 m par part.\nc) Elle a couru 3 parts : 3 × 10 % = 30 %.\nd) 3 parts de 20 m : 3 × 20 = 60 m.\n⛔ Le piège : dire qu'une part vaut 1 %. Il faudrait alors 100 parts. Ici, il n'y en a que 10.\nRéponse : a) 10 % ; b) 20 m ; c) 30 % ; d) 60 m.",
          micros: ["pourcentage_fraction_decimal", "pourcentage_calculer"],
        },
        {
          enonce: "C'est les soldes ! Un pantalon coûte 40 €. Il est soldé à − 25 %.\na) De combien d'euros est la remise ?\nb) Combien paie-t-on le pantalon ?\nc) Une veste coûte 80 €, avec la même remise de 25 %. Combien paie-t-on la veste ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "60" },
          ],
          correction:
            "25 %, c'est le quart : je divise par 4.\na) 40 ÷ 4 = 10 €. La remise est de 10 €.\nb) 40 − 10 = 30 €.\nc) La remise sur la veste : 80 ÷ 4 = 20 €. On paie 80 − 20 = 60 €.\n⭐ Le prix de la veste est 2 fois celui du pantalon : la remise et le prix payé aussi.\n⛔ Le piège : enlever 25 € au lieu de 25 %. 40 − 25 = 15 € serait faux.\nRéponse : a) 10 € ; b) 30 € ; c) 60 €.",
          micros: ["pourcentage_probleme"],
        },
        {
          enonce: "Une vétérinaire fait un sondage auprès de 100 familles qui ont un animal. 45 % ont un chat. 30 % ont un chien. Les autres ont un poisson.\na) Quel pourcentage des familles a un poisson ?\nb) Combien de familles ont un chien ?\nc) Elle refait le sondage avec 200 familles. Les pourcentages sont les mêmes. Combien de familles ont un chat ?",
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "90" },
          ],
          correction:
            "a) Toutes les familles, c'est 100 %. 45 % + 30 % = 75 %. Il reste 100 % − 75 % = 25 % pour les poissons.\nb) Sur 100 familles, 30 % font 30 familles.\nc) Sur 200 familles, c'est 2 fois plus : 2 × 45 = 90 familles ont un chat.\n⭐ Autre chemin : 10 % de 200 = 20, et 45 % = 4 fois 10 % + 5 %. 4 × 20 + 10 = 90.\n⛔ Le piège du c) : répondre 45 familles. 45 % = 45 familles seulement quand il y a 100 familles.\nRéponse : a) 25 % ; b) 30 familles ; c) 90 familles.",
          micros: ["pourcentage_comprendre", "pourcentage_defi"],
        },
        {
          enonce: "a) Quel calcul donne 10 % de 90 ?\nA) 90 − 10\nB) 90 × 10\nC) 90 ÷ 10\nb) Combien vaut 10 % de 90 ?",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "10 %, c'est $\\dfrac{1}{10}$ : je partage en 10 parts égales et j'en prends une.\na) Partager en 10, c'est diviser par 10 : 90 ÷ 10. Choix C.\nb) 90 ÷ 10 : le 9 des dizaines devient le chiffre des unités. 10 % de 90 = 9.\n⛔ Le piège : choisir 90 − 10 = 80. Enlever 10 ne donne pas 10 %. Et 90 × 10 = 900 donne plus que le tout.\nRéponse : a) C ; b) 9.",
          micros: ["pourcentage_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois, je calcule 10 % d'abord, puis je réponds à chaque question.",
      rappel: [
        "Je calcule 10 % en divisant par 10, puis je multiplie : 30 % = 3 fois 10 %.",
        "Remise : prix à payer = prix de départ − remise.",
        "Hausse : nouveau nombre = nombre de départ + hausse.",
      ],
      exercices: [
        {
          titre: "Le vélo en promotion",
          enonce: "Un vélo coûte 250 €. Le magasin fait une remise de 20 %.\na) Combien vaut 10 % de 250 € ?\nb) De combien d'euros est la remise ?\nc) Combien paie-t-on le vélo ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "200" },
          ],
          correction:
            "a) 10 % de 250 : 250 ÷ 10. Le 2 des centaines devient le chiffre des dizaines, le 5 des dizaines devient le chiffre des unités : 25 €.\nb) 20 %, c'est 2 fois 10 % : 2 × 25 = 50 €.\nc) J'enlève la remise : 250 − 50 = 200 €.\n⛔ Le piège : payer 50 €. 50 €, c'est la remise. Le prix à payer est 200 €.\nRéponse : a) 25 € ; b) 50 € ; c) 200 €.",
          micros: ["pourcentage_probleme"],
        },
        {
          titre: "Le verger",
          enonce: "Une arboricultrice a un verger de 80 arbres. 30 % sont des pommiers. 25 % sont des poiriers. Les autres sont des cerisiers.\na) Combien y a-t-il de pommiers ?\nb) Combien y a-t-il de poiriers ?\nc) Combien y a-t-il de cerisiers ?",
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "36" },
          ],
          correction:
            "a) 10 % de 80 : 80 ÷ 10 = 8. 30 %, c'est 3 fois 10 % : 3 × 8 = 24 pommiers.\nb) 25 %, c'est le quart : 80 ÷ 4 = 20 poiriers.\nc) Les cerisiers sont le reste : 80 − 24 − 20 = 36 cerisiers.\n⭐ Je vérifie avec les pourcentages : 100 % − 30 % − 25 % = 45 %. 45 % de 80 : 4 × 8 = 32, plus la moitié de 8, soit 4. 32 + 4 = 36.\n⛔ Le piège : additionner 30 + 25 = 55 et croire qu'il y a 55 arbres. Ce sont des pourcentages, pas des arbres.\nRéponse : a) 24 ; b) 20 ; c) 36.",
          micros: ["pourcentage_defi"],
        },
        {
          titre: "L'eau du corps humain",
          enonce: "Le corps d'un adulte contient environ 60 % d'eau.\na) Un adulte pèse 70 kg. Combien de kg d'eau contient son corps, environ ?\nb) Une adulte pèse 50 kg. Combien de kg d'eau contient son corps, environ ?",
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "30" },
          ],
          correction:
            "60 %, c'est 6 fois 10 %.\na) 10 % de 70 : 70 ÷ 10 = 7. 60 % : 6 × 7 = 42 kg d'eau.\nb) 10 % de 50 : 50 ÷ 10 = 5. 60 % : 6 × 5 = 30 kg d'eau.\n⭐ Plus de la moitié du corps est de l'eau : 42 est bien plus que la moitié de 70, qui est 35.\n⛔ Le piège : répondre 60 kg. 60 %, ce n'est pas 60 kg : c'est 60 sur 100.\nRéponse : a) 42 kg ; b) 30 kg.",
          micros: ["pourcentage_probleme"],
        },
        {
          titre: "Le jeu le moins cher",
          enonce: "Un jeu de société coûte 60 €. Trois magasins font une offre.\nMagasin A : 15 € de moins.\nMagasin B : 20 % de remise.\nMagasin C : le jeu à 50 €.\na) Combien coûte le jeu chez A ?\nb) Combien coûte le jeu chez B ?\nc) Quel magasin est le moins cher : A, B ou C ?",
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "a) Chez A : 60 − 15 = 45 €.\nb) Chez B : 10 % de 60 = 6. 20 % = 2 × 6 = 12 €. Le prix : 60 − 12 = 48 €.\nChez C : 50 €.\nc) Je range les prix : 45 < 48 < 50. Le moins cher est le magasin A.\n⛔ Le piège : croire que « 20 » est plus que « 15 », donc que B est le moins cher. 20 % de 60 ne font que 12 €.\nRéponse : a) 45 € ; b) 48 € ; c) A.",
          micros: ["pourcentage_defi"],
        },
        {
          titre: "La piscine",
          enonce: "Un maître-nageur compte les entrées de la piscine. Samedi : 400 personnes. Dimanche, il y en a 10 % de plus que samedi. Lundi, il y en a 50 % de moins que dimanche.\na) Combien de personnes en plus dimanche ?\nb) Combien de personnes dimanche ?\nc) Combien de personnes lundi ?",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "440" },
            { question: "c)", attendu: "220" },
          ],
          correction:
            "a) 10 % de 400 : 400 ÷ 10 = 40 personnes en plus.\nb) Dimanche : 400 + 40 = 440 personnes.\nc) 50 % de moins, c'est la moitié de dimanche : 440 ÷ 2 = 220 personnes.\n⛔ Le piège : prendre la moitié de samedi, 400 ÷ 2 = 200. Le lundi se compare au DIMANCHE.\nRéponse : a) 40 ; b) 440 ; c) 220.",
          micros: ["pourcentage_defi"],
        },
      ],
    },
  ],
};
