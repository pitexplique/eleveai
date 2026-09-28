// ─── Fiche d'exercices : le coefficient multiplicateur (1re, automatismes) ────
//                              20 exercices corrigés
//
// Deuxième feuille des automatismes de première (28/09/2026), sur le modèle de
// l'étalon `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve
// anticipée, SANS CALCULATRICE : taux dans 5, 10, 20, 25, 50… et valeurs qui se
// divisent de tête. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/evolutions.bank.ts` : « un article
// à 200 € coûtera, après une augmentation de 20 % » (Antilles), « pour
// augmenter un prix de 15 %, je dois multiplier par » (Asie).
//
// ⭐⭐ LE FIL : UNE ÉVOLUTION = UNE MULTIPLICATION. Vers l'avenir, on multiplie
// par le coefficient ; vers le passé, on DIVISE par le même coefficient. Les
// exercices 6, 7, 12, 14, 15, 16, 18 sont bâtis sur le piège du retour : on ne
// retire pas « le même pourcentage » à la valeur d'arrivée.
// Les évolutions SUCCESSIVES, le taux calculé et le taux réciproque sont la
// feuille suivante (« Taux d'évolution ») : ici, une évolution à la fois.
//
// ⭐ Frédéric, 28/09 : lien GRAPHIQUE (diagrammes, courbes, tableaux avant/après
// avec le coefficient) et lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (soldes,
// salaire, carburant, TVA, fiche de paie, immobilier, exode rural, glacier,
// population mondiale). Les chiffres sont des MODÈLES arrondis, jamais
// présentés comme des données officielles — sauf le taux normal de TVA (20 %)
// et les trois jalons arrondis de la population mondiale (2,5 ; 5 ; 8 milliards).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-coefficient-multiplicateur.mjs`.
//
// Micro-compétences : auto_evo_additif_multiplicatif (1, 3, 4, 8, 10, 13, 17,
// 18, 19, 20), auto_evo_diminution (2, 3, 5, 7, 8, 9, 11, 14, 15, 17, 18, 20),
// auto_evo_valeur_finale (4, 5, 9, 10, 11, 13, 16, 17, 18, 19, 20),
// auto_evo_valeur_initiale (6, 7, 12, 14, 15, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoCoefficientMultiplicateurPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-coefficient-multiplicateur",
  titre: "Coefficient multiplicateur",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : traduire une hausse ou une baisse par un coefficient, calculer une valeur d'arrivée, retrouver une valeur de départ. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Augmenter de $t$ %, c'est multiplier par $1 + \\dfrac{t}{100}$. Exemple : $+5$ % donne $\\times 1{,}05$.",
        "Diminuer de $t$ %, c'est multiplier par $1 - \\dfrac{t}{100}$. Exemple : $-5$ % donne $\\times 0{,}95$.",
        "Valeur d'arrivée $=$ valeur de départ $\\times$ coefficient. Pour retrouver la valeur de départ, on DIVISE par le coefficient.",
      ],
      exercices: [
        {
          enonce: "Par quel nombre faut-il multiplier un prix pour l'augmenter de $15$ % ? de $3$ % ? de $100$ % ?",
          correction:
            "Augmenter de $t$ %, c'est garder le prix entier ($1$) et lui ajouter $\\dfrac{t}{100}$.\n$+15$ % : $1 + 0{,}15 = 1{,}15$.\n$+3$ % : $1 + 0{,}03 = 1{,}03$.\n$+100$ % : $1 + 1 = 2$. Augmenter de $100$ %, c'est doubler.\n⚠️ $+3$ % donne $1{,}03$, et non $1{,}3$ : $1{,}3$ ferait $+30$ %.",
          schema: ecranSeulement(tableau(["hausse", "+15 %", "+3 %", "+100 %"], ["coefficient", "1,15", "1,03", "2"])),
          micros: ["auto_evo_additif_multiplicatif"],
        },
        {
          enonce: "Par quel nombre faut-il multiplier un prix pour le diminuer de $30$ % ? de $5$ % ? de $80$ % ?",
          correction:
            "Diminuer de $t$ %, c'est garder ce qui RESTE. On multiplie par $1 - \\dfrac{t}{100}$.\n$-30$ % : il reste $70$ %, on multiplie par $1 - 0{,}3 = 0{,}7$.\n$-5$ % : il reste $95$ %, on multiplie par $1 - 0{,}05 = 0{,}95$.\n$-80$ % : il reste $20$ %, on multiplie par $1 - 0{,}8 = 0{,}2$.\n⚠️ Le piège : multiplier par $0{,}8$ pour « $-80$ % ». $0{,}8$ garde $80$ % du prix : c'est une baisse de $20$ % seulement.",
          schema: diagramme("camembert", [
            { label: "il reste 20 %", value: 20 },
            { label: "la remise 80 %", value: 80 },
          ]),
          micros: ["auto_evo_diminution"],
        },
        {
          enonce: "Traduire chaque multiplication par une hausse ou une baisse en pourcentage : $\\times 1{,}08$ ; $\\times 0{,}92$ ; $\\times 1{,}5$ ; $\\times 0{,}6$.",
          correction:
            "On compare le coefficient à $1$ : plus grand que $1$, c'est une hausse ; plus petit, une baisse.\n$1{,}08 = 1 + 0{,}08$ : hausse de $8$ %.\n$0{,}92 = 1 - 0{,}08$ : baisse de $8$ %.\n$1{,}5 = 1 + 0{,}5$ : hausse de $50$ %.\n$0{,}6 = 1 - 0{,}4$ : baisse de $40$ %.\n⚠️ $\\times 0{,}6$ n'est pas « $-60$ % » : on GARDE $60$ %, on perd $40$ %.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_diminution"],
        },
        {
          enonce: "Un article coûte $80$ €. Son prix augmente de $25$ %. Quel est son nouveau prix ?",
          correction:
            "Le coefficient : $1 + 0{,}25 = 1{,}25$.\nNouveau prix : $80 \\times 1{,}25 = 100$ €.\nDe tête : $25$ %, c'est un quart. Le quart de $80$ est $20$, et $80 + 20 = 100$.\n⚠️ $80 \\times 0{,}25 = 20$ donne la HAUSSE, pas le nouveau prix.",
          schema: diagramme("barres", [
            { label: "avant", value: 80 },
            { label: "après (× 1,25)", value: 100 },
          ]),
          micros: ["auto_evo_valeur_finale", "auto_evo_additif_multiplicatif"],
        },
        {
          enonce: "Un pantalon à $60$ € est soldé à $-30$ %. Combien le paie-t-on ?",
          correction:
            "Baisse de $30$ % : il reste $70$ %, le coefficient est $0{,}7$.\n$60 \\times 0{,}7 = 42$ €.\nVérification : la remise vaut $60 \\times 0{,}3 = 18$ €, et $60 - 18 = 42$ €. ✔️\n⭐ Avec le coefficient, un seul calcul suffit : pas besoin de calculer la remise, puis de la soustraire.",
          micros: ["auto_evo_valeur_finale", "auto_evo_diminution"],
        },
        {
          enonce: "Après une hausse de $20$ %, un prix vaut $72$ €. Quel était le prix avant la hausse ?",
          correction:
            "Le prix de départ, multiplié par $1{,}2$, a donné $72$ €.\nPour revenir en arrière, on DIVISE par $1{,}2$ : $\\dfrac{72}{1{,}2} = \\dfrac{720}{12} = 60$ €.\nVérification : $60 \\times 1{,}2 = 72$. ✔️\n⚠️ Enlever $20$ % à $72$ € donne $57{,}60$ € : c'est faux. Les $20$ % portaient sur le prix de DÉPART, pas sur $72$ €.",
          schema: tableau(["départ (€)", "coefficient", "arrivée (€)"], [60, "× 1,2", 72]),
          micros: ["auto_evo_valeur_initiale"],
        },
        {
          enonce: "Après une baisse de $25$ %, un prix vaut $45$ €. Quel était le prix de départ ?",
          correction:
            "Baisse de $25$ % : coefficient $0{,}75$. Le prix de départ, multiplié par $0{,}75$, a donné $45$ €.\nOn divise : $\\dfrac{45}{0{,}75} = 60$ €.\nDe tête : $0{,}75 = \\dfrac{3}{4}$. Trois quarts du prix font $45$ €, donc un quart fait $15$ €, et le prix entier $4 \\times 15 = 60$ €.\n⚠️ $45 \\times 1{,}25 = 56{,}25$ : ajouter $25$ % au prix soldé ne redonne pas le prix de départ.",
          micros: ["auto_evo_valeur_initiale", "auto_evo_diminution"],
        },
        {
          enonce: "Traduire par un pourcentage : multiplier par $1{,}005$ ; par $0{,}995$ ; par $3$.",
          correction:
            "$1{,}005 = 1 + 0{,}005$ : hausse de $0{,}5$ %.\n$0{,}995 = 1 - 0{,}005$ : baisse de $0{,}5$ %.\n$3 = 1 + 2$ : hausse de $200$ %.\n⚠️ Tripler, c'est $+200$ %, et non $+300$ % : on garde le prix entier, et on en ajoute deux fois autant.\n⭐ $0{,}005 = \\dfrac{0{,}5}{100}$ : un demi pour cent.",
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_diminution"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire les données, écrire le coefficient, conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Repérer la valeur de DÉPART : c'est sur elle que porte le pourcentage.",
        "Vers l'avenir, on MULTIPLIE par le coefficient. Vers le passé, on DIVISE par le même coefficient.",
        "Sur un diagramme ou une courbe, lire d'abord l'unité : milliers, millions, milliards…",
      ],
      exercices: [
        {
          titre: "Les soldes",
          enonce:
            "Trois articles sont soldés. Le tableau donne leur prix avant les soldes. Le blouson est à $-40$ %, les baskets à $-20$ %, le T-shirt à $-60$ %.\na) Donner le coefficient de chaque remise.\nb) Calculer les prix soldés. Que remarque-t-on ?",
          figure: tableau(["article", "blouson", "baskets", "T-shirt"], ["prix avant (€)", 120, 90, 25]),
          correction:
            "a) On garde ce qui reste : blouson $\\times 0{,}6$ ; baskets $\\times 0{,}8$ ; T-shirt $\\times 0{,}4$.\nb) Blouson : $120 \\times 0{,}6 = 72$ €. Baskets : $90 \\times 0{,}8 = 72$ €. Tee-shirt : $25 \\times 0{,}4 = 10$ €.\nLe blouson et les baskets coûtent le même prix une fois soldés, alors qu'ils avaient $30$ € d'écart.\n⚠️ La plus forte remise en pourcentage n'est pas la plus forte en euros : le T-shirt perd $60$ %, mais seulement $15$ €. Le blouson perd $40$ %, soit $48$ €.",
          schema: diagramme("barres", [
            { label: "blouson", value: 72 },
            { label: "baskets", value: 72 },
            { label: "T-shirt", value: 10 },
          ]),
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale"],
        },
        {
          titre: "Le salaire et le panier de courses",
          enonce:
            "Une salariée gagne $1\\,800$ € net par mois. Son salaire augmente de $5$ %. Dans le même temps, son panier de courses de la semaine, à $150$ €, augmente de $2$ %.\na) Calculer son nouveau salaire et le nouveau prix du panier.\nb) Elle achète quatre paniers par mois. Son augmentation couvre-t-elle la hausse des courses ?",
          correction:
            "a) Salaire : $1\\,800 \\times 1{,}05 = 1\\,890$ €, soit $90$ € de plus.\nPanier : $150 \\times 1{,}02 = 153$ €, soit $3$ € de plus.\nb) Quatre paniers coûtent $4 \\times 3 = 12$ € de plus par mois. Elle gagne $90$ € de plus : oui, largement.\n⭐ De tête : $1\\,800 \\times 1{,}05 = 1\\,800 + 1\\,800 \\times 0{,}05 = 1\\,800 + 90$.\n⚠️ Comparer « $5$ % » et « $2$ % » ne suffit pas : les deux pourcentages ne portent pas sur la même somme.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "hausse du salaire", value: 90 },
              { label: "hausse des courses", value: 12 },
            ]),
          ),
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale"],
        },
        {
          titre: "Une ville qui grandit",
          enonce:
            "Le diagramme donne la population d'une ville moyenne, en milliers d'habitants (chiffres d'un modèle).\na) Lire la population en 2020.\nb) Une étude prévoit $+5$ % d'ici 2030. Combien d'habitants en 2030 ?\nc) Une autre étude prévoit au contraire $-5$ %. Combien alors ?",
          figure: diagramme("batons", [
            { label: "2000", value: 30 },
            { label: "2010", value: 36 },
            { label: "2020", value: 40 },
          ]),
          correction:
            "a) En 2020, le bâton monte à $40$ : $40$ milliers, soit $40\\,000$ habitants.\nb) $+5$ % : coefficient $1{,}05$. $40\\,000 \\times 1{,}05 = 42\\,000$ habitants.\nc) $-5$ % : coefficient $0{,}95$. $40\\,000 \\times 0{,}95 = 38\\,000$ habitants.\n⭐ De tête : $5$ % de $40\\,000$, c'est $2\\,000$ ($10$ % font $4\\,000$, on prend la moitié).\n⚠️ Lire l'unité AVANT de répondre : « $40$ » veut dire $40$ milliers.",
          schema: ecranSeulement(
            diagramme("batons", [
              { label: "2020", value: 40 },
              { label: "2030 × 1,05", value: 42 },
              { label: "2030 × 0,95", value: 38 },
            ]),
          ),
          micros: ["auto_evo_valeur_finale", "auto_evo_diminution"],
        },
        {
          titre: "Le litre de carburant",
          enonce:
            "En un an, le prix d'un litre de carburant a augmenté de $10$ % (chiffres d'un modèle). Il vaut maintenant $1{,}98$ €. Quel était son prix un an plus tôt ?",
          correction:
            "Le prix d'il y a un an, multiplié par $1{,}1$, a donné $1{,}98$ €.\nOn divise : $\\dfrac{1{,}98}{1{,}1} = \\dfrac{19{,}8}{11} = 1{,}8$, soit $1{,}80$ €.\nVérification : $1{,}8 \\times 1{,}1 = 1{,}8 + 0{,}18 = 1{,}98$. ✔️\n⚠️ Retirer $10$ % de $1{,}98$ € donnerait $1{,}782$ € : faux. Les $10$ % se calculaient sur l'ANCIEN prix, plus petit.",
          schema: tableau(["il y a un an (€)", "coefficient", "aujourd'hui (€)"], ["1,80", "× 1,1", "1,98"]),
          micros: ["auto_evo_valeur_initiale"],
        },
        {
          titre: "Le chiffre d'affaires",
          enonce:
            "La courbe donne le chiffre d'affaires d'une entreprise, en millions d'euros. L'abscisse $0$ correspond à 2020, $1$ à 2021, et ainsi de suite.\na) Lire le chiffre d'affaires en 2020 et en 2024.\nb) Entre ces deux dates, il a doublé. Par quel nombre a-t-il été multiplié ? Quel pourcentage de hausse cela fait-il ?\nc) L'entreprise prévoit $+25$ % pour 2025. Quel chiffre d'affaires prévoit-elle ?",
          figure: repere([-1, 6, -1, 13], [{ pts: [[0, 4], [1, 5], [2, 6], [3, 6], [4, 8]] }], [
            { x: 0, y: 4, label: "2020" },
            { x: 4, y: 8, label: "2024" },
          ]),
          correction:
            "a) En 2020 ($x = 0$), on lit $4$ millions d'euros. En 2024 ($x = 4$), on lit $8$ millions.\nb) Doubler, c'est multiplier par $2 = 1 + 1$ : une hausse de $100$ %.\nc) $+25$ % : coefficient $1{,}25$. $8 \\times 1{,}25 = 10$ millions d'euros.\nSur le dessin, le point de 2025 est $2$ carreaux au-dessus de celui de 2024.\n⚠️ $+100$ %, ce n'est pas « tout » : c'est « encore une fois autant ».",
          schema: repere([-1, 6, -1, 13], [{ pts: [[0, 4], [1, 5], [2, 6], [3, 6], [4, 8]] }, { pts: [[4, 8], [5, 10]], couleur: ORANGE }], [
            { x: 5, y: 10, label: "2025" },
          ]),
          micros: ["auto_evo_valeur_finale", "auto_evo_additif_multiplicatif"],
        },
        {
          titre: "L'exode rural",
          enonce:
            "Pendant l'exode rural, une vallée de montagne a perdu $20$ % de ses habitants en trente ans (chiffres d'un modèle). Il lui en reste $12\\,000$. Combien en comptait-elle avant ?",
          correction:
            "Perdre $20$ %, c'est multiplier par $0{,}8$ : la population d'avant, multipliée par $0{,}8$, a donné $12\\,000$.\nOn divise : $\\dfrac{12\\,000}{0{,}8} = \\dfrac{120\\,000}{8} = 15\\,000$ habitants.\nVérification : $15\\,000 \\times 0{,}8 = 12\\,000$. ✔️ La vallée a perdu $3\\,000$ habitants.\n⚠️ $12\\,000 \\times 1{,}2 = 14\\,400$ : ajouter $20$ % au chiffre d'après ne redonne pas celui d'avant.",
          schema: diagramme("barres", [
            { label: "avant (milliers)", value: 15 },
            { label: "après × 0,8", value: 12 },
          ]),
          micros: ["auto_evo_valeur_initiale", "auto_evo_diminution"],
        },
        {
          titre: "Un glacier qui recule",
          enonce:
            "Un glacier des Alpes a perdu $40$ % de sa surface en un siècle (chiffres d'un modèle). Il couvre aujourd'hui $3$ km². Quelle était sa surface il y a cent ans ?",
          correction:
            "Perdre $40$ % : il reste $60$ %, le coefficient est $0{,}6$.\nLa surface d'il y a cent ans, multipliée par $0{,}6$, donne $3$ km². Donc elle vaut $\\dfrac{3}{0{,}6} = \\dfrac{30}{6} = 5$ km².\nVérification : $5 \\times 0{,}6 = 3$. ✔️\n⚠️ $3 \\times 1{,}4 = 4{,}2$ : faux. Pour remonter le temps, on divise par le coefficient ; on n'applique pas « la hausse inverse ».",
          micros: ["auto_evo_valeur_initiale", "auto_evo_diminution"],
        },
        {
          titre: "Hors taxes, toutes taxes",
          enonce:
            "En France, le taux normal de TVA est de $20$ % : le prix TTC (toutes taxes comprises) est le prix HT (hors taxes) augmenté de $20$ %.\na) Un casque coûte $50$ € HT. Quel est son prix TTC ?\nb) Un vélo coûte $540$ € TTC. Quel est son prix HT ?",
          correction:
            "a) On multiplie le prix HT par $1{,}2$ : $50 \\times 1{,}2 = 60$ € TTC.\nb) On remonte : on divise le prix TTC par $1{,}2$. $\\dfrac{540}{1{,}2} = \\dfrac{5\\,400}{12} = 450$ € HT.\nLa TVA du vélo vaut $540 - 450 = 90$ €, soit bien $20$ % de $450$.\n⚠️ $540 \\times 0{,}8 = 432$ : faux. Les $20$ % se calculent sur le prix HT, pas sur le prix TTC.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "prix HT 450 €", value: 450 },
              { label: "TVA 90 €", value: 90 },
            ]),
          ),
          micros: ["auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "Une évolution, c'est une seule multiplication : valeur d'arrivée $=$ valeur de départ $\\times$ coefficient.",
        "Pour retrouver une valeur de départ, on divise par le coefficient ; on ne retire pas le même pourcentage.",
        "On conclut par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Le prix de l'immobilier",
          enonce:
            "La courbe donne le prix moyen du mètre carré dans une ville, en milliers d'euros (chiffres d'un modèle). L'abscisse $0$ correspond à 2015, et $10$ à 2025.\na) Lire le prix du m² en 2015 et en 2025. Le prix a doublé : quel est le pourcentage de hausse ?\nb) Combien coûtait un appartement de $50$ m² en 2025 ?\nc) On prévoit une baisse de $5$ % en 2026. Quel serait le prix du m² ?\nd) En 2026, un vendeur annonce : « Après une baisse de $20$ %, mon appartement ne vaut plus que $240\\,000$ €. » Combien valait-il avant ?",
          figure: repere([-1, 11, -1, 9], [{ pts: [[0, 3], [2, 3], [4, 4], [6, 4], [8, 5], [10, 6]] }], [
            { x: 0, y: 3, label: "" },
            { x: 10, y: 6, label: "2025" },
          ]),
          correction:
            "a) En 2015 : $3$ milliers d'euros, soit $3\\,000$ € le m². En 2025 : $6\\,000$ € le m².\nDoubler, c'est multiplier par $2$ : une hausse de $100$ %.\nb) $50 \\times 6\\,000 = 300\\,000$ €.\nc) $-5$ % : coefficient $0{,}95$. $6\\,000 \\times 0{,}95 = 5\\,700$ € le m².\nd) Le prix d'avant, multiplié par $0{,}8$, donne $240\\,000$ €. Donc il vaut $\\dfrac{240\\,000}{0{,}8} = 300\\,000$ €.\n⭐ C'est le prix de la question b) : l'appartement a perdu $60\\,000$ €.\n⚠️ Ajouter $20$ % à $240\\,000$ € donnerait $288\\,000$ € : faux, on divise par $0{,}8$.",
          schema: diagramme("barres", [
            { label: "2025", value: 6000 },
            { label: "2026 × 0,95", value: 5700 },
          ]),
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_finale", "auto_evo_diminution", "auto_evo_valeur_initiale"],
        },
        {
          titre: "Du brut au net",
          enonce:
            "Sur une fiche de paie, le salaire net vaut environ $78$ % du salaire brut : la différence, ce sont les cotisations sociales (chiffres arrondis d'un modèle).\na) Par quel nombre multiplie-t-on le brut pour obtenir le net ? Traduire par un pourcentage de baisse.\nb) Un salaire brut est de $2\\,500$ €. Quel est le net ?\nc) Un salaire net est de $1\\,560$ €. Quel est le brut ?",
          correction:
            "a) Garder $78$ %, c'est multiplier par $0{,}78$. Et $0{,}78 = 1 - 0{,}22$ : du brut au net, c'est une baisse de $22$ %.\nb) $2\\,500 \\times 0{,}78 = 1\\,950$ € net.\nDe tête : $10\\,000 \\times 0{,}78 = 7\\,800$, et $2\\,500$ est le quart de $10\\,000$ ; le quart de $7\\,800$ est $1\\,950$.\nc) Le brut, multiplié par $0{,}78$, donne $1\\,560$ €. Donc le brut vaut $\\dfrac{1\\,560}{0{,}78} = \\dfrac{156\\,000}{78} = 2\\,000$ €, car $78 \\times 2 = 156$.\n⚠️ $1\\,560 \\times 1{,}22 = 1\\,903{,}2$ : faux. Les $22$ % portent sur le BRUT.",
          schema: diagramme("camembert", [
            { label: "net 78 %", value: 78 },
            { label: "cotisations 22 %", value: 22 },
          ]),
          micros: ["auto_evo_diminution", "auto_evo_additif_multiplicatif", "auto_evo_valeur_finale", "auto_evo_valeur_initiale"],
        },
        {
          titre: "La population mondiale",
          enonce:
            "Le diagramme donne la population mondiale, en milliards d'habitants, arrondie.\na) Entre 1950 et 1987, elle a doublé. Par quel nombre a-t-elle été multipliée ? Quel pourcentage de hausse cela représente-t-il ?\nb) Entre 1987 et 2022, elle a été multipliée par $1{,}6$. Traduire en pourcentage, et vérifier sur le diagramme.\nc) Retrouver la population de 1987 à partir de celle de 2022 et du coefficient $1{,}6$.\nd) Une projection prévoit encore $+25$ % d'ici la fin du siècle. Combien d'habitants cela ferait-il ?",
          figure: diagramme("barres", [
            { label: "1950", value: 2.5 },
            { label: "1987", value: 5 },
            { label: "2022", value: 8 },
          ]),
          correction:
            "a) Doubler, c'est multiplier par $2$ : $+100$ %. Sur le diagramme : $2{,}5 \\times 2 = 5$ milliards. ✔️\nb) $1{,}6 = 1 + 0{,}6$ : une hausse de $60$ %. Et $5 \\times 1{,}6 = 8$ milliards. ✔️\nc) On remonte le temps en divisant : $\\dfrac{8}{1{,}6} = \\dfrac{80}{16} = 5$ milliards.\nd) $+25$ % : coefficient $1{,}25$. $8 \\times 1{,}25 = 10$ milliards.\n⭐ En pourcentage, la hausse ralentit ($+100$ %, puis $+60$ % sur une durée semblable), même si l'on ajoute toujours des milliards d'habitants.\n⚠️ Une projection n'est pas une certitude : c'est un calcul fait sous une hypothèse.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "2022", value: 8 },
              { label: "fin du siècle × 1,25", value: 10 },
            ]),
          ),
          micros: ["auto_evo_additif_multiplicatif", "auto_evo_valeur_initiale", "auto_evo_valeur_finale"],
        },
        {
          titre: "Un château et ses visiteurs",
          enonce:
            "Un château reçoit $80\\,000$ visiteurs en 2019 (chiffres d'un modèle).\na) En 2020, l'année des confinements, la fréquentation baisse de $75$ %. Combien de visiteurs ?\nb) En 2021, elle augmente de $100$ %. Combien ?\nc) En 2023, après une hausse de $25$ %, le château reçoit $100\\,000$ visiteurs. Combien en avait-il reçu en 2022 ?\nd) Un guide affirme : « Après $-75$ %, une hausse de $75$ % suffit pour revenir au départ. » A-t-il raison ?",
          correction:
            "a) $-75$ % : il reste $25$ %, coefficient $0{,}25$. $80\\,000 \\times 0{,}25 = 20\\,000$ visiteurs.\nb) $+100$ % : coefficient $2$. $20\\,000 \\times 2 = 40\\,000$ visiteurs.\nc) Les visiteurs de 2022, multipliés par $1{,}25$, donnent $100\\,000$. Donc $\\dfrac{100\\,000}{1{,}25} = 80\\,000$ visiteurs : le chiffre de 2019 est retrouvé.\nd) Non : $20\\,000 \\times 1{,}75 = 35\\,000$, loin des $80\\,000$.\nPour revenir de $20\\,000$ à $80\\,000$, il faut multiplier par $4$ : une hausse de $300$ %.\n⚠️ Une baisse et une hausse de même pourcentage ne se compensent pas : elles ne portent pas sur la même quantité.",
          schema: diagramme("barres", [
            { label: "2019", value: 80 },
            { label: "2020", value: 20 },
            { label: "2021", value: 40 },
            { label: "2022", value: 80 },
            { label: "2023", value: 100 },
          ]),
          micros: ["auto_evo_diminution", "auto_evo_valeur_finale", "auto_evo_additif_multiplicatif", "auto_evo_valeur_initiale"],
        },
      ],
    },
  ],
};
