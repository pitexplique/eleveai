// ─── Fiche d'exercices : fréquences marginales et conditionnelles (1re) ──────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), deuxième notion du
// coach (28/09/2026). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts`
// (« parmi les… » désigne le dénominateur ; comparer des FRÉQUENCES, pas des
// effectifs — le mot d'ordre du document d'accompagnement).
//
// ⭐⭐ LE FIL : LE MOT « PARMI » DÉSIGNE LE DÉNOMINATEUR. Trois fractions
// possibles sur une même case : sur le total général (la case, ou la marge :
// fréquence marginale), sur le total de sa ligne, sur le total de sa colonne
// (fréquences conditionnelles). Les exercices 3, 5, 9 et 14 opposent deux de
// ces fractions ; l'exercice 18 (les deux engrais) montre qu'un groupe peut
// gagner dans chaque sous-groupe et perdre au total — le paradoxe de Simpson,
// sans le nommer avant la correction.
//
// ⭐ Contextes : sport (tribunes, coureurs, club), écologie (composteur, vélo,
// éoliennes), nature (forêt), économie (contrats, télétravail), physique
// (capteurs de température, 12), histoire-géo (migrations, 10 ; éoliennes et
// territoire, 19), santé (sommeil, petit-déjeuner, échauffement), orientation
// (17). Les chiffres sont des MODÈLES, jamais des données officielles.
// ⚠️ Un lien entre deux caractères n'est pas une cause : c'est dit en 16, 19, 20.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-frequences.mjs`.
//
// Micro-compétences : info_tab_frequence_marginale (1, 2, 6, 8, 10, 12, 13, 15,
// 17, 18, 19), info_tab_frequence_conditionnelle (2, 3, 4, 5, 6, 8, 9, 10, 11,
// 12, 14, 15, 16, 17, 18, 19, 20), info_tab_interpreter (4, 7, 9, 10, 11, 12,
// 13, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (il redit le corrigé). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoFrequencesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-frequences",
  titre: "Fréquences marginales et conditionnelles",
  accroche:
    "Vingt exercices pour calculer une fréquence dans un tableau croisé, et surtout choisir le bon dénominateur : sur le total, sur une ligne, sur une colonne. Tribunes d'un stade, composteurs, capteurs de température, migrations, engrais, éoliennes. Un rappel de cours avant chaque niveau, une correction étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Écrire la fraction, puis la calculer. Le dénominateur d'abord.",
      rappel: [
        "Fréquence MARGINALE : le total d'une ligne (ou d'une colonne) divisé par le total GÉNÉRAL.",
        "Fréquence CONDITIONNELLE : « parmi les A, la part de B » = la case (A et B) divisée par le total de A.",
        "Le mot « parmi » désigne le dénominateur.",
        "Une fréquence est comprise entre $0$ et $1$ ; multipliée par $100$, elle donne un pourcentage.",
      ],
      exercices: [
        {
          enonce:
            "Le tableau répartit les $500$ spectateurs d'un match de rugby selon leur tribune et leur abonnement.\na) Quelle est la fréquence des abonnés parmi les spectateurs ?\nb) Quelle est la fréquence des spectateurs placés en tribune nord ?",
          figure: tableauProba(
            ["", "Tribune nord", "Tribune sud", "Total"],
            [
              ["Abonnés", "180", "120", "300"],
              ["Non abonnés", "70", "130", "200"],
              ["Total", "250", "250", "500"],
            ],
          ),
          correction:
            "a) Les abonnés en tout : la marge de la ligne, $300$. On divise par le total général : $\\dfrac{300}{500} = 0{,}6$.\nLa fréquence des abonnés est $0{,}6$, soit $60$ %.\nb) Marge de la colonne « Tribune nord » : $\\dfrac{250}{500} = 0{,}5$, soit $50$ %.\n⭐ Une fréquence marginale se lit dans la MARGE, et se divise par le total général.",
          micros: ["info_tab_frequence_marginale"],
        },
        {
          enonce:
            "Un lycée compte $1\\,200$ élèves, dont $300$ internes. Parmi les internes, $120$ habitent à plus de $50$ km.\na) Quelle est la fréquence des internes dans le lycée ?\nb) Parmi les internes, quelle est la fréquence de ceux qui habitent à plus de $50$ km ?\nc) Quelle est la fréquence des élèves qui sont internes ET habitent à plus de $50$ km ?",
          correction:
            "a) $\\dfrac{300}{1\\,200} = 0{,}25$ : un quart des élèves sont internes.\nb) « Parmi les internes » : on divise par $300$, pas par $1\\,200$. $\\dfrac{120}{300} = 0{,}4$, soit $40$ %.\nc) Cette fois, parmi TOUS les élèves : $\\dfrac{120}{1\\,200} = 0{,}1$, soit $10$ %.\n⚠️ Même numérateur au b) et au c), $120$ : seul le dénominateur change, et la réponse aussi.",
          // La case lue (120) et la marge des internes (300) en évidence ; les
          // externes restent inconnus : l'énoncé ne les donne pas.
          schema: ecranSeulement(
            tableauProba(
              ["", "Plus de 50 km", "50 km ou moins", "Total"],
              [
                ["Internes", "120", "180", "300"],
                ["Externes", "?", "?", "900"],
                ["Total", "?", "?", "1200"],
              ],
              [[0, 1], [0, 3]],
            ),
          ),
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle"],
        },
        {
          enonce:
            "Dans un quartier, on a demandé à $250$ foyers s'ils ont un composteur.\na) Parmi les maisons, quelle est la fréquence des foyers qui ont un composteur ?\nb) Parmi les appartements ?\nc) Parmi les foyers qui ont un composteur, quelle est la part des maisons ?",
          figure: tableauProba(
            ["", "Composteur", "Pas de composteur", "Total"],
            [
              ["Maison", "90", "60", "150"],
              ["Appartement", "10", "90", "100"],
              ["Total", "100", "150", "250"],
            ],
          ),
          correction:
            "a) « Parmi les maisons » : on divise par le total de la ligne « Maison ». $\\dfrac{90}{150} = 0{,}6$, soit $60$ %.\nb) $\\dfrac{10}{100} = 0{,}1$, soit $10$ %.\nc) « Parmi les foyers qui ont un composteur » : on divise par le total de la COLONNE. $\\dfrac{90}{100} = 0{,}9$, soit $90$ %.\n⚠️ Le a) et le c) utilisent la même case, $90$, mais pas le même « parmi » : $60$ % des maisons ont un composteur, et $90$ % des composteurs sont dans des maisons.",
          micros: ["info_tab_frequence_conditionnelle"],
        },
        {
          enonce:
            "Dans une ville, on a étudié $1\\,000$ accidents de vélo (modèle). $200$ ont eu lieu sur une piste cyclable, dont $40$ avec un blessé grave. Parmi les $800$ autres, $240$ ont fait un blessé grave.\na) Parmi les accidents sur piste cyclable, quelle est la fréquence des blessés graves ?\nb) Parmi les accidents sur une autre voie ?\nc) Conclure par une phrase.",
          correction:
            "a) $\\dfrac{40}{200} = 0{,}2$, soit $20$ %.\nb) $\\dfrac{240}{800} = 0{,}3$, soit $30$ %.\nc) Dans ce modèle, un accident sur piste cyclable est moins souvent grave : $20$ % contre $30$ %.\n⚠️ Comparer $40$ et $240$ n'aurait aucun sens : il y a quatre fois plus d'accidents hors des pistes. On compare des fréquences.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Blessé grave", "Pas de blessé grave", "Total"],
              [
                ["Piste cyclable", "40", "160", "200"],
                ["Autre voie", "240", "560", "800"],
                ["Total", "280", "720", "1000"],
              ],
            ),
          ),
          micros: ["info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          enonce:
            "On a interrogé $400$ élèves sur leur petit-déjeuner et leur fatigue en fin de matinée (modèle).\na) Quelle est la fréquence des élèves qui prennent un petit-déjeuner ET sont fatigués ?\nb) Parmi les élèves qui prennent un petit-déjeuner, quelle est la fréquence des fatigués ?\nc) Parmi ceux qui n'en prennent pas ?",
          figure: tableauProba(
            ["", "Fatigué", "Pas fatigué", "Total"],
            [
              ["Petit-déjeuner", "60", "240", "300"],
              ["Sans petit-déj.", "50", "50", "100"],
              ["Total", "110", "290", "400"],
            ],
          ),
          correction:
            "a) « ET », sans « parmi » : la case sur le total général. $\\dfrac{60}{400} = 0{,}15$, soit $15$ %.\nb) « Parmi ceux qui prennent un petit-déjeuner » : sur la ligne. $\\dfrac{60}{300} = 0{,}2$, soit $20$ %.\nc) $\\dfrac{50}{100} = 0{,}5$, soit $50$ %.\n⚠️ Le a) et le b) partent de la même case : $15$ % n'est pas $20$ %. Le dénominateur fait la question.",
          micros: ["info_tab_frequence_conditionnelle"],
        },
        {
          enonce:
            "Un forestier a examiné $360$ arbres de trois espèces.\na) Quelle est la fréquence des arbres malades, au centième près ?\nb) Quelle est la fréquence des sapins parmi tous les arbres ?\nc) Parmi les sapins, quelle est la fréquence des malades ?",
          figure: tableauProba(
            ["", "Sain", "Malade", "Total"],
            [
              ["Hêtre", "100", "20", "120"],
              ["Chêne", "90", "30", "120"],
              ["Sapin", "60", "60", "120"],
              ["Total", "250", "110", "360"],
            ],
          ),
          correction:
            "a) Marge de la colonne « Malade » : $\\dfrac{110}{360} \\approx 0{,}31$, soit environ $31$ %.\nb) $\\dfrac{120}{360} = \\dfrac{1}{3} \\approx 0{,}33$ : un arbre sur trois est un sapin.\nc) « Parmi les sapins » : $\\dfrac{60}{120} = 0{,}5$. La moitié des sapins sont malades.\n⭐ On arrondit à la FIN : $\\dfrac{110}{360}$ se tape d'un coup à la calculatrice.",
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle"],
        },
        {
          enonce:
            "Le club de handball $A$ compte $45$ filles sur $150$ licenciés ; le club $B$ en compte $60$ sur $240$. Dans quel club la PART des filles est-elle la plus grande ?",
          correction:
            "Club $A$ : $\\dfrac{45}{150} = 0{,}3$, soit $30$ %.\nClub $B$ : $\\dfrac{60}{240} = 0{,}25$, soit $25$ %.\nLa part des filles est plus grande dans le club $A$.\n⚠️ Le club $B$ a PLUS de filles ($60$ contre $45$), mais une plus petite PART : il est plus grand.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Club A (%)", value: 30 },
              { label: "Club B (%)", value: 25 },
            ]),
          ),
          micros: ["info_tab_interpreter"],
        },
        {
          enonce:
            "Une entreprise emploie $600$ salariés, en CDI ou en CDD, à temps plein ou partiel.\na) Parmi les salariés à temps partiel, quelle est la fréquence des CDD ?\nb) Parmi les CDD, quelle est la fréquence des temps partiels ?\nc) Quelle est la fréquence des CDD dans l'entreprise ?",
          figure: tableauProba(
            ["", "Temps plein", "Temps partiel", "Total"],
            [
              ["CDI", "360", "90", "450"],
              ["CDD", "60", "90", "150"],
              ["Total", "420", "180", "600"],
            ],
          ),
          correction:
            "a) Sur la colonne « Temps partiel » : $\\dfrac{90}{180} = 0{,}5$, soit $50$ %.\nb) Sur la ligne « CDD » : $\\dfrac{90}{150} = 0{,}6$, soit $60$ %.\nc) Marge sur le total : $\\dfrac{150}{600} = 0{,}25$, soit $25$ %.\n⭐ Trois questions, trois dénominateurs : $180$, $150$, $600$.",
          micros: ["info_tab_frequence_conditionnelle", "info_tab_frequence_marginale"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Calculer les bonnes fréquences, puis répondre à la question par une phrase.",
      rappel: [
        "Pour comparer deux groupes de tailles différentes, on compare leurs fréquences conditionnelles, pas leurs effectifs.",
        "On écrit la fraction AVANT de calculer : en haut une case, en bas le total du groupe « parmi lequel » on compte.",
        "On arrondit à la fin, au centième (ou au pour cent près).",
        "Une conclusion commence par « Parmi les … ».",
      ],
      exercices: [
        {
          titre: "Le plan d'entraînement",
          enonce:
            "Un magazine de course à pied a suivi $300$ coureurs qui préparaient un $10$ km (modèle). Il écrit : « Parmi ceux qui ont atteint leur objectif, la majorité s'entraînaient SANS plan. Le plan d'entraînement ne sert donc à rien. »\na) La première phrase est-elle vraie ?\nb) Calculer la fréquence de réussite parmi les coureurs avec un plan, puis sans plan.\nc) Que penser de la conclusion du magazine ?",
          figure: tableauProba(
            ["", "Objectif atteint", "Pas atteint", "Total"],
            [
              ["Avec un plan", "80", "20", "100"],
              ["Sans plan", "100", "100", "200"],
              ["Total", "180", "120", "300"],
            ],
          ),
          correction:
            "a) Parmi les $180$ qui ont réussi, $100$ étaient sans plan : $\\dfrac{100}{180} \\approx 0{,}56$. Oui, c'est une majorité.\nb) Avec un plan : $\\dfrac{80}{100} = 0{,}8$, soit $80$ %. Sans plan : $\\dfrac{100}{200} = 0{,}5$, soit $50$ %.\nc) La conclusion est fausse. Si beaucoup de réussites sont « sans plan », c'est que les coureurs sans plan sont deux fois plus nombreux.\nParmi les coureurs avec un plan, $80$ % réussissent, contre $50$ % sans plan.\n⚠️ Le piège : diviser par les RÉUSSITES au lieu de diviser par chaque groupe de coureurs.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Avec plan (%)", value: 80 },
              { label: "Sans plan (%)", value: 50 },
            ]),
          ),
          micros: ["info_tab_interpreter", "info_tab_frequence_conditionnelle"],
        },
        {
          titre: "D'où viennent les habitants ?",
          enonce:
            "Une ville étudie l'origine de $800$ habitants (modèle) : nés dans la région, ou venus d'ailleurs. $320$ ont moins de $35$ ans, et parmi eux $240$ sont nés hors de la région. En tout, $400$ habitants sont nés hors de la région.\na) Dresser le tableau croisé (âge × origine).\nb) Calculer la fréquence des moins de $35$ ans, et celle des habitants nés hors de la région.\nc) Parmi les moins de $35$ ans, quelle part est née hors de la région ? Et parmi les $35$ ans et plus ?\nd) Commenter.",
          correction:
            "a) $35$ ans et plus : $800 - 320 = 480$. Moins de $35$ ans nés dans la région : $320 - 240 = 80$.\n$35$ ans et plus nés ailleurs : $400 - 240 = 160$ ; nés dans la région : $480 - 160 = 320$.\nb) $\\dfrac{320}{800} = 0{,}4$ et $\\dfrac{400}{800} = 0{,}5$.\nc) Moins de $35$ ans : $\\dfrac{240}{320} = 0{,}75$. $35$ ans et plus : $\\dfrac{160}{480} \\approx 0{,}33$.\nd) Dans ce modèle, les jeunes habitants sont bien plus souvent venus d'ailleurs : $75$ % contre $33$ %. C'est le signe d'une ville qui attire des jeunes (études, premier emploi).\n⭐ Les migrations se lisent dans les fréquences conditionnelles : chaque âge a sa propre part de nouveaux venus.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Nés ailleurs", "Nés dans la région", "Total"],
              [
                ["Moins de 35 ans", "240", "80", "320"],
                ["35 ans et plus", "160", "320", "480"],
                ["Total", "400", "400", "800"],
              ],
            ),
          ),
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          titre: "Ville ou campagne",
          enonce:
            "On a demandé à $500$ habitants d'une région leur principal moyen de transport (modèle).\na) Dresser le tableau des fréquences conditionnelles PAR LIGNE : dans chaque case, la fréquence parmi les habitants de la ville, ou parmi ceux de la campagne.\nb) Commenter.",
          figure: tableauProba(
            ["", "Voiture", "Autre mode", "Total"],
            [
              ["Ville", "120", "180", "300"],
              ["Campagne", "160", "40", "200"],
              ["Total", "280", "220", "500"],
            ],
          ),
          correction:
            "a) Ligne « Ville » : on divise par $300$. Voiture $\\dfrac{120}{300} = 0{,}4$ ; autre mode $\\dfrac{180}{300} = 0{,}6$.\nLigne « Campagne » : on divise par $200$. Voiture $\\dfrac{160}{200} = 0{,}8$ ; autre mode $\\dfrac{40}{200} = 0{,}2$.\n✔️ Sur chaque ligne, les fréquences font $1$ : c'est le contrôle.\nb) À la campagne, $80$ % des habitants utilisent surtout la voiture, contre $40$ % en ville : deux fois plus.\n⚠️ En effectifs, l'écart paraît faible ($160$ contre $120$) : les deux groupes n'ont pas la même taille.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Voiture", "Autre mode", "Total"],
              [
                ["Ville", "0,4", "0,6", "1"],
                ["Campagne", "0,8", "0,2", "1"],
              ],
            ),
          ),
          micros: ["info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          titre: "Les capteurs de température",
          enonce:
            "Un réseau météo utilise $1\\,000$ capteurs de température : $30$ % de type $A$, les autres de type $B$. Parmi les capteurs $A$, $40$ % donnent une mesure décalée de plus de $0{,}5$ °C ; parmi les $B$, $10$ % (modèle).\na) Dresser le tableau croisé (type × mesure).\nb) Quelle est la fréquence des capteurs décalés dans le réseau ?\nc) Parmi les capteurs décalés, quelle est la part des capteurs $A$ ?\nd) Commenter.",
          correction:
            "a) Capteurs $A$ : $0{,}3 \\times 1\\,000 = 300$ ; capteurs $B$ : $700$.\nDécalés $A$ : $0{,}4 \\times 300 = 120$ ; décalés $B$ : $0{,}1 \\times 700 = 70$.\nb) $120 + 70 = 190$ décalés : $\\dfrac{190}{1\\,000} = 0{,}19$, soit $19$ %.\nc) « Parmi les décalés » : $\\dfrac{120}{190} \\approx 0{,}63$.\nd) Les capteurs $A$ ne font que $30$ % du réseau, mais $63$ % des mesures décalées : c'est eux qu'il faut vérifier en priorité.\n⚠️ Les $40$ % et les $10$ % ne s'additionnent pas : ils ne portent pas sur les mêmes capteurs.",
          schema: tableauProba(
            ["", "Décalé", "Juste", "Total"],
            [
              ["Type A", "120", "180", "300"],
              ["Type B", "70", "630", "700"],
              ["Total", "190", "810", "1000"],
            ],
          ),
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          titre: "La moyenne qui trompe",
          enonce:
            "Deux groupes d'élèves passent un test d'endurance. Un élève calcule le taux de réussite de l'ensemble en faisant la moyenne des deux taux : $\\dfrac{0{,}75 + 0{,}4}{2} = 0{,}575$.\na) D'où viennent $0{,}75$ et $0{,}4$ ?\nb) Calculer le vrai taux de réussite des $50$ élèves.\nc) Pourquoi la moyenne des deux taux est-elle fausse ?",
          figure: tableauProba(
            ["", "Réussi", "Échoué", "Total"],
            [
              ["Groupe A", "15", "5", "20"],
              ["Groupe B", "12", "18", "30"],
              ["Total", "27", "23", "50"],
            ],
          ),
          correction:
            "a) Ce sont les fréquences conditionnelles : $\\dfrac{15}{20} = 0{,}75$ dans le groupe $A$, $\\dfrac{12}{30} = 0{,}4$ dans le groupe $B$.\nb) C'est une fréquence marginale : $\\dfrac{27}{50} = 0{,}54$, soit $54$ %.\nc) Les deux groupes n'ont pas le même effectif : le groupe $B$ ($30$ élèves) pèse plus que le groupe $A$ ($20$ élèves).\nLa simple moyenne donne le même poids aux deux groupes.\n⛔ On ne fait pas la moyenne de deux fréquences qui ne portent pas sur le même nombre d'individus.",
          micros: ["info_tab_frequence_marginale", "info_tab_interpreter"],
        },
        {
          titre: "Le télétravail",
          enonce:
            "Dans une entreprise de $400$ salariés, $150$ sont en télétravail, dont $120$ se disent satisfaits de leurs conditions de travail. En tout, $270$ salariés se disent satisfaits (modèle). Un délégué affirme : « Il y a plus de satisfaits SANS télétravail qu'avec. Le télétravail ne rend pas plus satisfait. »\na) Combien de salariés sans télétravail sont satisfaits ?\nb) Calculer la fréquence des satisfaits parmi les salariés en télétravail, puis parmi les autres.\nc) Que penser de l'affirmation ?",
          correction:
            "a) $270 - 120 = 150$ salariés satisfaits sans télétravail.\nb) Salariés sans télétravail : $400 - 150 = 250$.\nEn télétravail : $\\dfrac{120}{150} = 0{,}8$. Sans : $\\dfrac{150}{250} = 0{,}6$.\nc) La première phrase est vraie ($150 > 120$) mais ne prouve rien : les salariés sans télétravail sont plus nombreux.\nParmi les salariés en télétravail, $80$ % sont satisfaits, contre $60$ % parmi les autres.\n⚠️ Comparer des effectifs de groupes inégaux, c'est le piège classique.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Satisfait", "Pas satisfait", "Total"],
              [
                ["Télétravail", "120", "30", "150"],
                ["Sur site", "150", "100", "250"],
                ["Total", "270", "130", "400"],
              ],
            ),
          ),
          micros: ["info_tab_interpreter", "info_tab_frequence_conditionnelle"],
        },
        {
          titre: "Un ordinateur à soi",
          enonce:
            "Un lycée a demandé à $600$ élèves s'ils ont un ordinateur personnel.\na) Parmi les élèves de terminale, quelle est la fréquence de ceux qui ont un ordinateur ?\nb) Parmi les élèves qui n'ont pas d'ordinateur, quelle est la part des élèves de seconde, au centième ?\nc) Quelle est la fréquence des élèves qui ont un ordinateur, au centième ?\nd) Comment évolue l'équipement de la seconde à la terminale ?",
          figure: tableauProba(
            ["", "Ordinateur", "Pas d'ordinateur", "Total"],
            [
              ["Seconde", "120", "80", "200"],
              ["Première", "140", "60", "200"],
              ["Terminale", "170", "30", "200"],
              ["Total", "430", "170", "600"],
            ],
          ),
          correction:
            "a) Sur la ligne « Terminale » : $\\dfrac{170}{200} = 0{,}85$, soit $85$ %.\nb) Sur la colonne « Pas d'ordinateur » : $\\dfrac{80}{170} \\approx 0{,}47$.\nc) Marge sur le total : $\\dfrac{430}{600} \\approx 0{,}72$.\nd) Parmi les secondes : $\\dfrac{120}{200} = 0{,}6$ ; parmi les premières : $\\dfrac{140}{200} = 0{,}7$ ; parmi les terminales : $0{,}85$.\nL'équipement augmente d'une classe à l'autre.\n⭐ Ici les trois classes ont le même effectif : comparer les cases revient au même. C'est l'exception, pas la règle.",
          micros: ["info_tab_frequence_conditionnelle", "info_tab_frequence_marginale", "info_tab_interpreter"],
        },
        {
          titre: "Un écran dans la chambre",
          enonce:
            "On a interrogé $250$ adolescents (modèle) : ont-ils un écran dans leur chambre ? dorment-ils moins de $8$ h ?\na) Calculer la fréquence des « moins de $8$ h » parmi ceux qui ont un écran, puis parmi ceux qui n'en ont pas.\nb) Peut-on affirmer que l'écran dans la chambre FAIT dormir moins ?",
          figure: tableauProba(
            ["", "Moins de 8 h", "8 h ou plus", "Total"],
            [
              ["Écran", "105", "45", "150"],
              ["Pas d'écran", "30", "70", "100"],
              ["Total", "135", "115", "250"],
            ],
          ),
          correction:
            "a) Avec écran : $\\dfrac{105}{150} = 0{,}7$, soit $70$ %. Sans écran : $\\dfrac{30}{100} = 0{,}3$, soit $30$ %.\nb) Les deux caractères sont LIÉS : on dort moins souvent $8$ h quand on a un écran dans sa chambre.\nMais le tableau ne dit pas pourquoi. D'autres raisons peuvent jouer (l'âge, les horaires, le bruit…).\n⛔ Un lien n'est pas une cause : un tableau croisé montre un lien, il ne prouve pas une cause.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Écran (%)", value: 70 },
              { label: "Sans écran (%)", value: 30 },
            ]),
          ),
          micros: ["info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Construire le tableau si besoin, calculer les bonnes fréquences, conclure avec prudence.",
      rappel: [
        "Une fréquence conditionnelle répond à « parmi les …, quelle part … ? ».",
        "Deux groupes se comparent par leurs fréquences conditionnelles.",
        "Un lien entre deux caractères n'est pas forcément une cause.",
      ],
      exercices: [
        {
          titre: "Avec ou sans maths",
          enonce:
            "Une licence d'économie a reçu $1\\,000$ candidatures (modèle). On distingue les candidats qui suivent un enseignement de maths en plus du tronc commun (« avec maths ») et les autres.\na) Quelle est la fréquence des admis parmi tous les candidats ?\nb) Calculer la fréquence des admis parmi les candidats avec maths, puis sans maths.\nc) Parmi les admis, quelle est la part des candidats sans maths ?\nd) Quel conseil en tirer pour un lycéen qui vise cette licence ?",
          figure: tableauProba(
            ["", "Admis", "Non admis", "Total"],
            [
              ["Avec maths", "180", "420", "600"],
              ["Sans maths", "40", "360", "400"],
              ["Total", "220", "780", "1000"],
            ],
          ),
          correction:
            "a) $\\dfrac{220}{1\\,000} = 0{,}22$, soit $22$ %.\nb) Avec maths : $\\dfrac{180}{600} = 0{,}3$. Sans maths : $\\dfrac{40}{400} = 0{,}1$.\nc) $\\dfrac{40}{220} \\approx 0{,}18$ : environ $18$ % des admis n'ont pas suivi de maths en plus.\nd) Dans ce modèle, un candidat avec maths est admis trois fois plus souvent ($30$ % contre $10$ %).\nMais être sans maths ne ferme pas la porte : près d'un admis sur cinq est dans ce cas.\n⭐ Deux questions différentes : « mes chances » (b), et « qui sont les admis » (c).",
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          titre: "Les deux engrais",
          enonce:
            "Un jardin partagé compare deux engrais pour ses tomates, sur des parcelles au sol pauvre ou riche. Le tableau donne le nombre de plants qui ont donné une bonne récolte (modèle).\na) Calculer les quatre fréquences de bonne récolte (engrais × sol).\nb) Sur l'ensemble des parcelles, calculer la fréquence de bonne récolte avec chaque engrais.\nc) Le bio gagne sur chaque sol, et perd au total ! Expliquer.\nd) Quel engrais conseiller ?",
          figure: tableauProba(
            ["", "Engrais bio", "Engrais chimique"],
            [
              ["Sol pauvre", "30 sur 100", "10 sur 50"],
              ["Sol riche", "45 sur 50", "80 sur 100"],
            ],
          ),
          correction:
            "a) Sol pauvre : bio $\\dfrac{30}{100} = 0{,}3$, chimique $\\dfrac{10}{50} = 0{,}2$.\nSol riche : bio $\\dfrac{45}{50} = 0{,}9$, chimique $\\dfrac{80}{100} = 0{,}8$.\nSur chaque sol, le bio fait mieux.\nb) Bio : $\\dfrac{30 + 45}{100 + 50} = \\dfrac{75}{150} = 0{,}5$. Chimique : $\\dfrac{10 + 80}{50 + 100} = \\dfrac{90}{150} = 0{,}6$.\nc) Le bio a surtout été essayé sur sol PAUVRE ($100$ plants sur $150$), où l'on récolte mal avec n'importe quel engrais. Le chimique, surtout sur sol riche.\nLe total mélange deux groupes très différents.\nd) Le bio : à sol égal, il fait toujours mieux.\n⭐ C'est le paradoxe de Simpson : une comparaison globale peut s'inverser quand on regarde chaque sous-groupe.",
          micros: ["info_tab_frequence_conditionnelle", "info_tab_frequence_marginale", "info_tab_interpreter"],
        },
        {
          titre: "Les éoliennes et leurs voisins",
          enonce:
            "Avant l'installation d'un parc éolien, on a interrogé $600$ habitants (modèle). Parmi les $120$ qui habitent à moins de $2$ km du futur parc, $60$ y sont favorables. Parmi les $240$ qui habitent entre $2$ et $10$ km, $156$ y sont favorables. Parmi les $240$ qui habitent à plus de $10$ km, $168$ y sont favorables.\na) Quelle est la fréquence des habitants favorables ?\nb) Calculer la fréquence des favorables pour chaque distance.\nc) Représenter ces trois fréquences, en pourcentage, par un diagramme en barres.\nd) Commenter.",
          correction:
            "a) $60 + 156 + 168 = 384$ favorables : $\\dfrac{384}{600} = 0{,}64$, soit $64$ %.\nb) Moins de $2$ km : $\\dfrac{60}{120} = 0{,}5$. De $2$ à $10$ km : $\\dfrac{156}{240} = 0{,}65$. Plus de $10$ km : $\\dfrac{168}{240} = 0{,}7$.\nc) Trois barres : $50$ %, $65$ %, $70$ %.\nd) Plus on habite loin du parc, plus on y est favorable : de $50$ % à $70$ %.\nEt même tout près, la moitié des habitants sont favorables.\n⚠️ La fréquence globale ($64$ %) cache ces écarts : elle est tirée vers le haut par les habitants éloignés, plus nombreux.",
          schema: diagramme("barres", [
            { label: "< 2 km", value: 50 },
            { label: "2 à 10 km", value: 65 },
            { label: "> 10 km", value: 70 },
          ]),
          micros: ["info_tab_frequence_marginale", "info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
        {
          titre: "L'échauffement",
          enonce:
            "Un club de football suit ses $240$ joueurs pendant une saison. Les deux tiers s'échauffent avant chaque match ; $10$ % de ceux-là se blessent dans la saison. Il y a $40$ blessés en tout (modèle).\na) Dresser le tableau croisé (échauffement × blessure).\nb) Calculer la fréquence des blessés parmi les joueurs qui s'échauffent, puis parmi les autres.\nc) Parmi les blessés, quelle est la part des joueurs qui ne s'échauffent pas ?\nd) L'entraîneur dit : « Dans notre club, un joueur qui ne s'échauffe pas se blesse trois fois plus souvent. » Est-ce exact ?",
          correction:
            "a) Joueurs qui s'échauffent : $\\dfrac{2}{3} \\times 240 = 160$ ; les autres : $80$.\nBlessés parmi ceux qui s'échauffent : $0{,}1 \\times 160 = 16$. Blessés parmi les autres : $40 - 16 = 24$.\nNon blessés : $160 - 16 = 144$ et $80 - 24 = 56$.\nb) Avec échauffement : $\\dfrac{16}{160} = 0{,}1$. Sans : $\\dfrac{24}{80} = 0{,}3$.\nc) $\\dfrac{24}{40} = 0{,}6$ : $60$ % des blessés ne s'échauffaient pas, alors qu'ils ne sont qu'un tiers des joueurs.\nd) Oui : $\\dfrac{0{,}3}{0{,}1} = 3$.\n⚠️ Ce chiffre vaut pour ce club et cette saison. Il montre un lien fort ; il ne suffit pas à lui seul à prouver la cause.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Blessé", "Pas blessé", "Total"],
              [
                ["Échauffement", "16", "144", "160"],
                ["Sans", "24", "56", "80"],
                ["Total", "40", "200", "240"],
              ],
            ),
          ),
          micros: ["info_tab_frequence_conditionnelle", "info_tab_interpreter"],
        },
      ],
    },
  ],
};
