// ─── Fiche d'exercices : reconnaître une suite géométrique (1re, sans spé) ────
//                              20 exercices corrigés
//
// Première feuille du chapitre « Variation exponentielle » (BOP1VE) de la
// première SANS spécialité (28/09/2026), une feuille par notion du coach.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts`.
//
// ⛔ LE PROGRAMME : suites géométriques à termes STRICTEMENT POSITIFS (aucune
// raison négative, aucun premier terme négatif). Ici, on reconnaît la suite,
// on écrit sa relation de récurrence, on relie la raison au taux, et on
// calcule les termes UN PAR UN. La formule u_n = u_0 × qⁿ est la feuille
// suivante (`expo-suite-terme-general`).
//
// ⭐⭐ LE FIL : ON MULTIPLIE, ON N'AJOUTE PAS. Les pièges nommés : prendre le
// premier quotient pour une preuve (2), confondre la raison et le taux (4, 5),
// soustraire au lieu de diviser (8), additionner les taux (13, 15, 19), et
// « perdre toujours la même quantité » (10, 18).
//
// ⭐ Frédéric, 28/09 : beaucoup de dessins et des contextes concrets. Économie
// (livret 9, salaires 16, smartphone 19), physique (lumière dans l'eau 10,
// balle qui rebondit 18), histoire-géo (légende de l'échiquier 11, croissance
// d'une population 17), sport (course 12), écologie (déchets 13, oiseaux 20),
// nature (algues 14), santé (médicament 15). Les chiffres sont des MODÈLES,
// jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-suite-geometrique.mjs`.
//
// Micro-compétences : expo_suite_reconnaitre (1, 2, 7, 8, 9, 11, 12, 14, 16,
// 17, 18, 20), expo_suite_recurrence (3, 6, 8, 9, 11, 13, 15, 17, 18, 19, 20),
// expo_suite_taux (4, 5, 7, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20),
// expo_suite_terme_rang (3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les dessins qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoSuiteGeometriquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-suite-geometrique",
  titre: "Reconnaître une suite géométrique",
  accroche:
    "Vingt exercices pour reconnaître une suite géométrique, écrire sa relation de récurrence, relier sa raison à un taux d'évolution et calculer ses termes un par un. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec ses dessins.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Une suite est GÉOMÉTRIQUE quand on passe d'un terme au suivant en multipliant toujours par le même nombre $q$, la RAISON : $u_{n+1} = q \\times u_n$.",
        "Pour la reconnaître sur des valeurs : on calcule les QUOTIENTS $\\dfrac{u_1}{u_0}$, $\\dfrac{u_2}{u_1}$… Ils doivent être tous égaux.",
        "Une hausse de $t$ % à chaque étape donne $q = 1 + \\dfrac{t}{100}$ ; une baisse de $t$ %, $q = 1 - \\dfrac{t}{100}$.",
      ],
      exercices: [
        {
          enonce: "Les premiers termes d'une suite sont $3$ ; $6$ ; $12$ ; $24$. Cette suite semble-t-elle géométrique ? Si oui, donner sa raison.",
          correction:
            "On calcule le quotient de chaque terme par le précédent.\n$\\dfrac{6}{3} = 2$, $\\dfrac{12}{6} = 2$, $\\dfrac{24}{12} = 2$.\nLe quotient est toujours le même : la suite semble géométrique, de raison $q = 2$.\n⭐ Géométrique : on passe d'un terme au suivant en MULTIPLIANT toujours par le même nombre.\n⚠️ Les différences, $3$ puis $6$ puis $12$, ne sont pas constantes : ce n'est pas une suite arithmétique.",
          schema: ecranSeulement(tableau(["terme", "3", "6", "12", "24"], ["passage", "", "× 2", "× 2", "× 2"])),
          micros: ["expo_suite_reconnaitre"],
        },
        {
          enonce: "Les termes $5$ ; $10$ ; $15$ ; $20$ sont-ils ceux d'une suite géométrique ?",
          correction:
            "Quotients : $\\dfrac{10}{5} = 2$, mais $\\dfrac{15}{10} = 1{,}5$.\nLes quotients ne sont pas égaux : la suite n'est PAS géométrique.\nEn revanche, on ajoute toujours $5$ : elle est arithmétique, de raison $5$.\n⚠️ Le piège : « $10$ est le double de $5$ », et on conclut trop vite. Il faut tester TOUS les passages, pas seulement le premier.\nSur le tableau, les coefficients de passage changent : pas de raison unique.",
          schema: ecranSeulement(tableau(["terme", "5", "10", "15", "20"], ["passage", "", "× 2", "× 1,5", "× 1,33"])),
          micros: ["expo_suite_reconnaitre"],
        },
        {
          enonce: "La suite $(u_n)$ est définie par $u_0 = 4$ et $u_{n+1} = 3 \\times u_n$. Calculer $u_1$, $u_2$ et $u_3$.",
          correction:
            "La relation dit : pour avoir le terme suivant, on multiplie par $3$.\n$u_1 = 3 \\times u_0 = 3 \\times 4 = 12$.\n$u_2 = 3 \\times u_1 = 3 \\times 12 = 36$.\n$u_3 = 3 \\times u_2 = 3 \\times 36 = 108$.\n⚠️ Entre $u_0$ et $u_3$, il y a TROIS multiplications par $3$, pas une seule.",
          schema: ecranSeulement(tableau(["uₙ", "4", "12", "36", "108"], ["passage", "", "× 3", "× 3", "× 3"])),
          micros: ["expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          enonce: "Une quantité augmente de $20$ % à chaque étape. On la modélise par une suite géométrique. Quelle est sa raison ?",
          correction:
            "Augmenter de $20$ %, c'est multiplier par $1 + \\dfrac{20}{100} = 1{,}2$.\nLa raison est $q = 1{,}2$.\n⚠️ Pas $q = 0{,}2$ : multiplier par $0{,}2$ ferait FONDRE la quantité. Et pas $q = 20$ non plus.\n⭐ La raison d'une suite géométrique, c'est le coefficient multiplicateur de l'évolution.\nSur le dessin, pour $100$ au départ : $120$, puis $144$.",
          schema: ecranSeulement(diagramme("barres", [{ label: "départ", value: 100 }, { label: "étape 1", value: 120 }, { label: "étape 2", value: 144 }])),
          micros: ["expo_suite_taux"],
        },
        {
          enonce: "a) Une quantité baisse de $15$ % à chaque étape. Quelle est la raison de la suite géométrique associée ?\nb) Deux suites géométriques ont pour raisons $1{,}07$ et $0{,}96$. À quelles évolutions correspondent-elles ?",
          correction:
            "a) Baisser de $15$ %, c'est multiplier par $1 - \\dfrac{15}{100} = 0{,}85$ : $q = 0{,}85$.\nb) $1{,}07 = 1 + 0{,}07$ : une hausse de $7$ % à chaque étape.\n$0{,}96 = 1 - 0{,}04$ : une baisse de $4$ % à chaque étape.\n⭐ $q > 1$ : hausse. $0 < q < 1$ : baisse.\n⚠️ $0{,}96$ n'est pas « une baisse de $96$ % » : on regarde l'écart à $1$.\nSur le dessin, pour $100$ au départ, avec $q = 0{,}85$ : $85$, puis $72{,}25$.",
          schema: ecranSeulement(diagramme("barres", [{ label: "départ", value: 100 }, { label: "étape 1", value: 85 }, { label: "étape 2", value: 72.25 }])),
          micros: ["expo_suite_taux"],
        },
        {
          enonce: "On donne $u_0 = 800$, et chaque terme est la moitié du précédent. Écrire la relation de récurrence, puis calculer $u_1$, $u_2$, $u_3$ et $u_4$.",
          correction:
            "« La moitié », c'est multiplier par $0{,}5$ : $u_{n+1} = 0{,}5 \\times u_n$.\n$u_1 = 0{,}5 \\times 800 = 400$ ; $u_2 = 0{,}5 \\times 400 = 200$ ; $u_3 = 0{,}5 \\times 200 = 100$ ; $u_4 = 0{,}5 \\times 100 = 50$.\n⭐ Les termes diminuent, mais restent strictement positifs : diviser par $2$ n'atteint jamais $0$.\n⚠️ Diviser par $2$, ce n'est pas « enlever $2$ » : $u_1$ ne vaut pas $798$.\nSur le dessin, les termes sont en centaines.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 9], [], [
              { x: 0, y: 8 },
              { x: 1, y: 4 },
              { x: 2, y: 2 },
              { x: 3, y: 1 },
              { x: 4, y: 0.5 },
            ]),
          ),
          micros: ["expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          enonce: "Les termes $1\\,000$ ; $1\\,100$ ; $1\\,210$ ; $1\\,331$ forment-ils une suite géométrique ? Donner la raison et le taux d'évolution correspondant.",
          correction:
            "Quotients : $\\dfrac{1\\,100}{1\\,000} = 1{,}1$ ; $\\dfrac{1\\,210}{1\\,100} = 1{,}1$ ; $\\dfrac{1\\,331}{1\\,210} = 1{,}1$.\nLe quotient est constant : la suite est géométrique, de raison $q = 1{,}1$.\n$1{,}1 = 1 + 0{,}1$ : chaque terme est $10$ % plus grand que le précédent.\n⚠️ Les écarts grandissent ($100$, puis $110$, puis $121$) : ce n'est pas une suite arithmétique, même si elle « monte régulièrement ».",
          schema: ecranSeulement(tableau(["terme", "1 000", "1 100", "1 210", "1 331"], ["passage", "", "× 1,1", "× 1,1", "× 1,1"])),
          micros: ["expo_suite_reconnaitre", "expo_suite_taux"],
        },
        {
          enonce: "Une suite géométrique vérifie $u_2 = 45$ et $u_3 = 54$. Calculer sa raison, puis $u_4$ et $u_1$.",
          correction:
            "La raison est le quotient de deux termes CONSÉCUTIFS : $q = \\dfrac{u_3}{u_2} = \\dfrac{54}{45} = 1{,}2$.\n$u_4 = 1{,}2 \\times 54 = 64{,}8$.\nPour reculer d'un rang, on DIVISE par la raison : $u_1 = \\dfrac{45}{1{,}2} = 37{,}5$.\n✔️ Vérification : $1{,}2 \\times 37{,}5 = 45$.\n⚠️ $54 - 45 = 9$ n'est pas la raison : dans une suite géométrique, on divise, on ne soustrait pas.\nSur le dessin, les termes $u_1$ à $u_4$, en dizaines : chaque point est $1{,}2$ fois plus haut que le précédent.",
          schema: ecranSeulement(repere([-1, 5, -1, 8], [], [{ x: 1, y: 3.75 }, { x: 2, y: 4.5 }, { x: 3, y: 5.4 }, { x: 4, y: 6.48 }])),
          micros: ["expo_suite_reconnaitre", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la situation en suite, écrire la relation, calculer, conclure par une phrase.",
      rappel: [
        "« Augmente de $t$ % par an » : chaque année, on multiplie par $1 + \\dfrac{t}{100}$. C'est une suite géométrique.",
        "« Augmente de $50$ € par an » : on AJOUTE toujours la même quantité. C'est une suite arithmétique, pas géométrique.",
        "On calcule les termes un par un : $u_1 = q \\times u_0$, puis $u_2 = q \\times u_1$…",
        "Perdre $t$ % à chaque étape, c'est perdre $t$ % de ce qui RESTE : la perte diminue d'une étape à l'autre.",
      ],
      exercices: [
        {
          titre: "Un livret d'épargne",
          enonce:
            "Léa place $2\\,500$ € sur un livret qui rapporte $2$ % par an, les intérêts restant sur le livret (modèle). On note $u_n$ le capital au bout de $n$ années ; $u_0 = 2\\,500$.\na) Justifier que la suite $(u_n)$ est géométrique ; donner sa raison.\nb) Écrire la relation de récurrence.\nc) Calculer $u_1$, $u_2$ et $u_3$, au centime près.",
          correction:
            "a) Chaque année, le capital augmente de $2$ % : il est multiplié par $1{,}02$. La suite est géométrique, de raison $q = 1{,}02$.\nb) $u_{n+1} = 1{,}02 \\times u_n$.\nc) $u_1 = 1{,}02 \\times 2\\,500 = 2\\,550$ €.\n$u_2 = 1{,}02 \\times 2\\,550 = 2\\,601$ €.\n$u_3 = 1{,}02 \\times 2\\,601 = 2\\,653{,}02$ €.\n⭐ La deuxième année rapporte $51$ €, plus que la première ($50$ €) : les intérêts rapportent à leur tour des intérêts.",
          schema: tableau(["année", "0", "1", "2", "3"], ["capital (€)", 2500, 2550, 2601, 2653.02], true),
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "La lumière sous l'eau",
          enonce:
            "Dans l'eau d'un lac, chaque mètre de profondeur absorbe $20$ % de la lumière qui l'atteint (modèle). À la surface, l'intensité vaut $100$ (en pourcentage de la lumière du jour). On note $u_n$ l'intensité à $n$ mètres de profondeur.\na) Quelle est la raison de la suite géométrique $(u_n)$ ?\nb) Calculer $u_1$, $u_2$, $u_3$ et $u_4$.\nc) Une plante aquatique a besoin d'au moins $50$ % de la lumière du jour (modèle). Peut-elle vivre à $3$ m ? à $4$ m ?",
          correction:
            "a) Perdre $20$ %, c'est garder $80$ % : on multiplie par $0{,}8$ à chaque mètre. La raison est $q = 0{,}8$, avec $u_0 = 100$.\nb) $u_1 = 0{,}8 \\times 100 = 80$ ; $u_2 = 0{,}8 \\times 80 = 64$ ; $u_3 = 0{,}8 \\times 64 = 51{,}2$ ; $u_4 = 0{,}8 \\times 51{,}2 = 40{,}96$.\nc) À $3$ m : $51{,}2 > 50$, oui, de justesse. À $4$ m : $40{,}96 < 50$, non.\n⚠️ On ne perd pas $20$ points par mètre : sinon, à $5$ m, il ne resterait plus rien. On perd $20$ % de ce qui RESTE.\nSur le dessin, l'intensité est en dizaines ; la ligne en pointillés marque les $50$ %.",
          schema: repere([-1, 5, -1, 11], [], [
            { x: 0, y: 10 },
            { x: 1, y: 8 },
            { x: 2, y: 6.4 },
            { x: 3, y: 5.12 },
            { x: 4, y: 4.096 },
          ], 5, true),
          micros: ["expo_suite_taux", "expo_suite_terme_rang"],
        },
        {
          titre: "La légende de l'échiquier",
          enonce:
            "Une légende raconte que l'inventeur du jeu d'échecs demanda au roi un grain de blé sur la première case de l'échiquier, deux sur la deuxième, quatre sur la troisième, et ainsi de suite en doublant à chaque case. On note $u_1 = 1$ le nombre de grains de la case $1$, $u_2$ celui de la case $2$, etc.\na) Quelle est la nature de la suite ? Sa relation de récurrence ?\nb) Combien de grains sur la case $6$ ? sur la case $11$ ?\nc) Le roi pensait : « Case $11$, c'est à peu près $2 \\times 11 = 22$ grains. » Qu'en dire ?",
          correction:
            "a) On double à chaque case, c'est-à-dire qu'on multiplie par $2$ : suite géométrique de raison $q = 2$, et $u_{n+1} = 2 \\times u_n$.\nb) $u_1 = 1$, $u_2 = 2$, $u_3 = 4$, $u_4 = 8$, $u_5 = 16$, $u_6 = 32$ grains.\nOn continue : $u_7 = 64$, $u_8 = 128$, $u_9 = 256$, $u_{10} = 512$, $u_{11} = 1\\,024$ grains.\nc) Le roi raisonne comme si l'on AJOUTAIT à chaque case. Mais on MULTIPLIE par $2$ : $1\\,024$ grains, pas $22$.\n⭐ Sur la dernière case, la $64$e, le nombre dépasse de très loin les récoltes de blé du monde entier en une année : c'est la morale de la légende.",
          schema: diagramme("batons", [
            { label: "case 1", value: 1 },
            { label: "case 2", value: 2 },
            { label: "case 3", value: 4 },
            { label: "case 4", value: 8 },
            { label: "case 5", value: 16 },
            { label: "case 6", value: 32 },
          ]),
          micros: ["expo_suite_reconnaitre", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "Préparer un semi-marathon",
          enonce:
            "Pour préparer un semi-marathon, Hugo court $20$ km la semaine $0$, puis augmente sa distance chaque semaine. Le tableau donne ses distances.\na) Ces distances forment-elles une suite arithmétique ? géométrique ?\nb) Quel est le taux d'augmentation chaque semaine ?\nc) Si la règle continue, quelle distance courra-t-il la semaine $4$ ? (au dixième de km)",
          figure: tableau(["semaine", "0", "1", "2", "3"], ["distance (km)", 20, 22, 24.2, 26.62]),
          correction:
            "a) Différences : $22 - 20 = 2$, puis $24{,}2 - 22 = 2{,}2$. Elles changent : pas arithmétique.\nQuotients : $\\dfrac{22}{20} = 1{,}1$ ; $\\dfrac{24{,}2}{22} = 1{,}1$ ; $\\dfrac{26{,}62}{24{,}2} = 1{,}1$. Ils sont égaux : suite géométrique de raison $1{,}1$.\nb) $1{,}1 = 1 + 0{,}1$ : $+10$ % chaque semaine.\nc) $26{,}62 \\times 1{,}1 = 29{,}282$, soit environ $29{,}3$ km.\n⚠️ $+2$ km la première semaine ne veut pas dire $+2$ km chaque semaine : c'est $10$ % de la distance DU MOMENT.",
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_terme_rang"],
        },
        {
          titre: "Moins de déchets",
          enonce:
            "Dans une commune, chaque habitant produisait $500$ kg de déchets en 2024. Grâce au tri et au compost, la commune vise une baisse de $4$ % par an (modèle). On note $d_n$ la masse de déchets par habitant, en kg, en l'année $2024 + n$.\na) Quelle est la raison de la suite $(d_n)$ ? Écrire la relation de récurrence.\nb) Calculer $d_1$, $d_2$ et $d_3$ (au dixième).\nc) À quelle année correspond $d_3$ ? La baisse sur trois ans est-elle de $12$ % ?",
          correction:
            "a) Baisser de $4$ %, c'est multiplier par $0{,}96$ : $q = 0{,}96$ et $d_{n+1} = 0{,}96 \\times d_n$.\nb) $d_1 = 0{,}96 \\times 500 = 480$ kg ; $d_2 = 0{,}96 \\times 480 = 460{,}8$ kg ; $d_3 = 0{,}96 \\times 460{,}8 = 442{,}368$, soit environ $442{,}4$ kg.\nc) $d_3$ correspond à $2024 + 3 = 2027$.\n⚠️ Une baisse de $12$ % donnerait $500 \\times 0{,}88 = 440$ kg. On trouve un peu plus : chaque baisse de $4$ % porte sur une masse déjà réduite.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "2024", value: 500 },
              { label: "2025", value: 480 },
              { label: "2026", value: 460.8 },
              { label: "2027", value: 442.4 },
            ]),
          ),
          micros: ["expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "Des algues sur le lac",
          enonce:
            "Sur un lac, des algues envahissantes s'étendent. Le graphique donne la surface qu'elles couvrent, en hectares : le point d'abscisse $n$ correspond à la semaine $n$ (modèle).\na) Lire $u_0$, $u_1$ et $u_2$.\nb) Montrer que ces trois valeurs sont celles d'une suite géométrique ; donner sa raison et le taux d'évolution par semaine.\nc) Calculer $u_3$ et le vérifier sur le graphique, puis calculer $u_4$.",
          figure: repere([-1, 5, -1, 8], [], [
            { x: 0, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4.5 },
            { x: 3, y: 6.75 },
          ]),
          correction:
            "a) $u_0 = 2$ ; $u_1 = 3$ ; $u_2 = 4{,}5$ hectares.\nb) $\\dfrac{3}{2} = 1{,}5$ et $\\dfrac{4{,}5}{3} = 1{,}5$ : le même quotient. Raison $q = 1{,}5$, soit $+50$ % par semaine.\nc) $u_3 = 1{,}5 \\times 4{,}5 = 6{,}75$ : sur le graphique, le point d'abscisse $3$ est bien entre $6$ et $7$, aux trois quarts.\n$u_4 = 1{,}5 \\times 6{,}75 = 10{,}125$ hectares.\n⭐ Les points ne sont pas alignés : ils montent de plus en plus vite. C'est l'allure d'une suite géométrique de raison plus grande que $1$.",
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_terme_rang"],
        },
        {
          titre: "Un médicament dans le sang",
          enonce:
            "Un patient reçoit une dose de $200$ mg d'un médicament. Chaque heure, son organisme en élimine $30$ % (modèle). On note $m_n$ la masse restante, en mg, au bout de $n$ heures.\na) Écrire la relation entre $m_{n+1}$ et $m_n$.\nb) Calculer $m_1$, $m_2$ et $m_3$.\nc) Au bout de $3$ heures, a-t-il éliminé $90$ % du médicament ?",
          correction:
            "a) Éliminer $30$ %, c'est en garder $70$ % : $m_{n+1} = 0{,}7 \\times m_n$, avec $m_0 = 200$.\nb) $m_1 = 0{,}7 \\times 200 = 140$ mg ; $m_2 = 0{,}7 \\times 140 = 98$ mg ; $m_3 = 0{,}7 \\times 98 = 68{,}6$ mg.\nc) Il reste $68{,}6$ mg sur $200$ : $\\dfrac{68{,}6}{200} = 0{,}343$, soit $34{,}3$ %. Il en a éliminé $65{,}7$ %, pas $90$ %.\n⚠️ Trois fois $30$ %, ce n'est pas $90$ % : chaque heure, on élimine $30$ % de ce qui RESTE.",
          schema: diagramme("batons", [
            { label: "0 h", value: 200 },
            { label: "1 h", value: 140 },
            { label: "2 h", value: 98 },
            { label: "3 h", value: 68.6 },
          ]),
          micros: ["expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "Deux promesses de salaire",
          enonce:
            "Deux entreprises proposent le même salaire de départ, $1\\,800$ € par mois. Dans l'entreprise $A$, il augmente de $45$ € chaque année ; dans l'entreprise $B$, de $2{,}5$ % chaque année.\na) Pour chaque entreprise, la suite des salaires est-elle arithmétique ou géométrique ? Donner sa raison.\nb) Calculer les salaires des années $1$ et $2$ dans chaque entreprise (au centime).\nc) Laquelle paie le mieux la deuxième année ?",
          correction:
            "a) $A$ : on AJOUTE $45$ € chaque année. Suite arithmétique de raison $45$.\n$B$ : on MULTIPLIE par $1{,}025$ chaque année. Suite géométrique de raison $1{,}025$.\nb) $A$ : $1\\,845$ €, puis $1\\,890$ €.\n$B$ : $1{,}025 \\times 1\\,800 = 1\\,845$ €, puis $1{,}025 \\times 1\\,845 = 1\\,891{,}125$, soit environ $1\\,891{,}13$ €.\nc) La première année, c'est pareil : $2{,}5$ % de $1\\,800$ €, ce sont justement $45$ €. La deuxième, $B$ paie un peu plus : $2{,}5$ % de $1\\,845$ €, c'est plus que $45$ €.\n⭐ L'écart est petit au début, mais il grandit chaque année.",
          schema: ecranSeulement(tableau(["année", "0", "1", "2"], ["salaire B (€)", 1800, 1845, 1891.13])),
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_terme_rang"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "On nomme la suite, on donne son premier terme et sa raison, on écrit la relation de récurrence.",
        "On calcule les termes un par un, et on dit ce que chacun représente : quelle année, quelle unité.",
        "Pour reconnaître le modèle : on AJOUTE toujours la même quantité, suite arithmétique ; on MULTIPLIE toujours par le même nombre, suite géométrique.",
      ],
      exercices: [
        {
          titre: "La population d'un pays",
          enonce:
            "Un pays compte $40$ millions d'habitants en 2000. On fait l'hypothèse (modèle) que sa population augmente de $2$ % par an. On note $p_n$ la population, en millions, en l'année $2000 + n$.\na) Justifier que $(p_n)$ est une suite géométrique ; donner $p_0$ et la raison.\nb) Calculer $p_1$, $p_2$ et $p_3$ (au centième).\nc) Un autre modèle ajoute $0{,}8$ million d'habitants par an. Donner ses valeurs pour 2001, 2002 et 2003.\nd) Lequel des deux modèles est géométrique ? Pourquoi l'écart entre eux grandit-il ?",
          correction:
            "a) $+2$ % par an : on multiplie par $1{,}02$ chaque année. Suite géométrique, $p_0 = 40$ et $q = 1{,}02$.\nb) $p_1 = 1{,}02 \\times 40 = 40{,}8$ ; $p_2 = 1{,}02 \\times 40{,}8 = 41{,}616$, soit environ $41{,}62$ ; $p_3 = 1{,}02 \\times 41{,}616 \\approx 42{,}45$ millions.\nc) $40{,}8$ ; $41{,}6$ ; $42{,}4$ millions : on ajoute $0{,}8$ à chaque fois.\nd) Le premier est géométrique : il multiplie. Le second est arithmétique : il ajoute.\nLes deux gagnent $0{,}8$ million la première année, car $2$ % de $40$, c'est $0{,}8$. Ensuite, le modèle géométrique gagne $2$ % d'une population PLUS grande : $0{,}816$ million, puis davantage. L'écart grandit d'année en année.",
          schema: tableau(["année", "2000", "2001", "2002", "2003"], ["modèle à 2 % (millions)", 40, 40.8, 41.62, 42.45], true),
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "La balle qui rebondit",
          enonce:
            "On lâche une balle de $5$ m de haut. Le graphique donne la hauteur atteinte, en mètres : l'abscisse $0$ est la hauteur de départ, l'abscisse $n$ la hauteur après le $n$-ième rebond (modèle).\na) Lire $h_0$ et $h_1$. On admet que chaque rebond fait perdre le même pourcentage de hauteur. Quelle est la raison de la suite $(h_n)$ ? Quel pourcentage perd-on à chaque rebond ?\nb) Calculer $h_2$, $h_3$ et $h_4$, et les comparer au graphique.\nc) Un joueur affirme : « À chaque rebond, la balle perd $1$ m, donc elle s'arrête après $5$ rebonds. » Qu'en penser ?",
          figure: repere([-1, 6, -1, 6], [], [
            { x: 0, y: 5 },
            { x: 1, y: 4 },
            { x: 2, y: 3.2 },
            { x: 3, y: 2.56 },
            { x: 4, y: 2.048 },
            { x: 5, y: 1.6384 },
          ]),
          correction:
            "a) $h_0 = 5$ et $h_1 = 4$. $q = \\dfrac{4}{5} = 0{,}8$ : chaque rebond garde $80$ % de la hauteur, il en fait perdre $20$ %.\nb) $h_2 = 0{,}8 \\times 4 = 3{,}2$ m ; $h_3 = 0{,}8 \\times 3{,}2 = 2{,}56$ m ; $h_4 = 0{,}8 \\times 2{,}56 = 2{,}048$ m. Les points du graphique sont bien à ces hauteurs.\nc) La perte n'est pas de $1$ m à chaque fois : $1$ m au premier rebond, puis $4 - 3{,}2 = 0{,}8$ m, puis $3{,}2 - 2{,}56 = 0{,}64$ m. Elle diminue, car elle vaut $20$ % d'une hauteur de plus en plus petite.\nDans le modèle, la hauteur reste strictement positive : elle n'atteint jamais $0$.\n⭐ En vrai, la balle finit par s'arrêter : le modèle est bon pour les premiers rebonds.\nSur le dessin, la droite orange est l'idée du joueur : elle touche $0$ au $5$e rebond.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 6], [{ pts: [[0, 5], [5, 0]], couleur: ORANGE }], [
              { x: 0, y: 5 },
              { x: 1, y: 4 },
              { x: 2, y: 3.2 },
              { x: 3, y: 2.56 },
              { x: 4, y: 2.048 },
            ]),
          ),
          micros: ["expo_suite_reconnaitre", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "Un smartphone d'occasion",
          enonce:
            "Un smartphone neuf coûte $800$ €. On estime (modèle) qu'il perd $25$ % de sa valeur chaque année. On note $v_n$ sa valeur, en euros, au bout de $n$ années.\na) Donner $v_0$, la raison de la suite $(v_n)$ et la relation de récurrence.\nb) Calculer $v_1$, $v_2$ et $v_3$.\nc) Un vendeur dit : « Au bout de $4$ ans, il ne vaut plus rien, puisque $4 \\times 25 = 100$ %. » Calculer $v_4$ au centime et conclure.\nd) Au bout de combien d'années vaut-il moins de la moitié de son prix neuf ?",
          correction:
            "a) $v_0 = 800$. Perdre $25$ %, c'est garder $75$ % : $q = 0{,}75$ et $v_{n+1} = 0{,}75 \\times v_n$.\nb) $v_1 = 0{,}75 \\times 800 = 600$ € ; $v_2 = 0{,}75 \\times 600 = 450$ € ; $v_3 = 0{,}75 \\times 450 = 337{,}5$ €.\nc) $v_4 = 0{,}75 \\times 337{,}5 = 253{,}125$, soit environ $253{,}13$ €. Il vaut encore quelque chose.\n⚠️ Les pourcentages de baisse ne s'additionnent pas : chaque année, on perd $25$ % de ce qui RESTE.\nd) La moitié de $800$ €, c'est $400$ €. $v_2 = 450 > 400$, mais $v_3 = 337{,}5 < 400$ : au bout de $3$ ans.",
          schema: diagramme("barres", [
            { label: "neuf", value: 800 },
            { label: "1 an", value: 600 },
            { label: "2 ans", value: 450 },
            { label: "3 ans", value: 337.5 },
            { label: "4 ans", value: 253.13 },
          ]),
          micros: ["expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
        {
          titre: "Des oiseaux protégés",
          enonce:
            "Dans une réserve naturelle, on compte $40$ couples d'une espèce d'oiseaux protégée en 2025. Les naturalistes estiment (modèle) que le nombre de couples augmentera de $25$ % par an. On note $c_n$ le nombre de couples en l'année $2025 + n$.\na) Donner la nature de la suite, sa raison et sa relation de récurrence.\nb) Calculer $c_1$, $c_2$, $c_3$ et $c_4$. Que signifie « $62{,}5$ couples » ?\nc) Le nombre de couples aura-t-il doublé en 2028 ? en 2029 ?",
          correction:
            "a) $+25$ % par an : on multiplie par $1{,}25$. Suite géométrique de raison $q = 1{,}25$, avec $c_0 = 40$ et $c_{n+1} = 1{,}25 \\times c_n$.\nb) $c_1 = 1{,}25 \\times 40 = 50$ ; $c_2 = 1{,}25 \\times 50 = 62{,}5$ ; $c_3 = 1{,}25 \\times 62{,}5 = 78{,}125$ ; $c_4 = 1{,}25 \\times 78{,}125 = 97{,}65625$.\n« $62{,}5$ couples » n'existe pas : le modèle donne un ordre de grandeur. On dira environ $62$ ou $63$ couples.\nc) Le double de $40$, c'est $80$. En 2028, $n = 3$ : $c_3 \\approx 78$, pas encore. En 2029, $n = 4$ : $c_4 \\approx 98$, oui.\n⚠️ Trois hausses de $25$ % ne font pas $+75$ % : $1{,}25 \\times 1{,}25 \\times 1{,}25 \\approx 1{,}95$, soit environ $+95$ %. Presque le double, mais pas encore.\nSur le dessin, les couples sont en dizaines ; la ligne en pointillés marque le double, $80$ couples.",
          schema: repere([-1, 5, -1, 11], [], [
            { x: 0, y: 4 },
            { x: 1, y: 5 },
            { x: 2, y: 6.25 },
            { x: 3, y: 7.81 },
            { x: 4, y: 9.77 },
          ], 8, true),
          micros: ["expo_suite_reconnaitre", "expo_suite_taux", "expo_suite_recurrence", "expo_suite_terme_rang"],
        },
      ],
    },
  ],
};
