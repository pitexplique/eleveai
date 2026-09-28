// ─── Fiche d'exercices : le tableau croisé (1re, sans spécialité) ─────────────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), première notion du
// coach : lire, compléter, dresser un tableau croisé d'effectifs (28/09/2026).
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts`
// (le tableau 2 × 2 et ses marges, le « ? » qu'on retrouve).
//
// ⭐⭐ LE FIL : UNE CASE DIT « À LA FOIS … ET … », UNE MARGE DIT « EN TOUT ». Le
// piège de toutes les questions de lecture est de lire le total de la ligne à la
// place de la case. Et pour compléter : on commence TOUJOURS par la ligne ou la
// colonne où il ne manque qu'un nombre, puis on vérifie le total dans les deux
// sens (exercice 12 : l'erreur se trouve ainsi).
//
// ⭐ Frédéric, 28/09 : « beaucoup de canvas et de visuel », et des contextes
// économie, écologie, sport, nature, physique, histoire-géo. Ici : le tri du
// verre, la forêt, le parc de véhicules, le semi-marathon, les ampoules de deux
// usines (physique : lumière), le canton de montagne et l'exode rural d'un
// village (histoire-géo), la station de ski, le festival. Les chiffres sont des
// MODÈLES, jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-tableau-croise.mjs`
// (chaque tableau est relu dans le source et additionné dans les deux sens ; la
// liste des randonneurs de l'exercice 5 est recomptée dans l'énoncé).
//
// Micro-compétences : info_tab_lire (1, 2, 7, 12, 13, 16, 18, 20),
// info_tab_completer (3, 4, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20),
// info_tab_construire (5, 6, 9, 11, 14, 15, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le tableau
 *  complété qui redit le corrigé. Les tableaux qu'on LIT restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesInfoTableauCroisePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-tableau-croise",
  titre: "Le tableau croisé",
  accroche:
    "Vingt exercices pour lire, compléter et dresser un tableau croisé d'effectifs : tri des déchets, forêt, véhicules électriques, semi-marathon, ampoules, exode rural, station de ski. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec le tableau complété.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On lit ou on complète, puis on répond par une phrase.",
      rappel: [
        "Un tableau croisé range une population selon DEUX caractères : l'un en ligne, l'autre en colonne.",
        "Une case compte les individus qui ont À LA FOIS le caractère de sa ligne et celui de sa colonne.",
        "Les marges (ligne et colonne « Total ») sont des sommes. Le total général est dans le coin, en bas à droite.",
      ],
      exercices: [
        {
          enonce:
            "On a demandé à $200$ habitants d'une ville s'ils trient le verre (modèle). Le tableau croise leur âge et leur réponse.\na) Combien de personnes de moins de $40$ ans trient le verre ?\nb) Combien de personnes, en tout, ne trient pas le verre ?\nc) Combien de personnes de $40$ ans et plus ont été interrogées ?",
          figure: tableauProba(
            ["", "Trie le verre", "Ne trie pas", "Total"],
            [
              ["Moins de 40 ans", "70", "30", "100"],
              ["40 ans et plus", "85", "15", "100"],
              ["Total", "155", "45", "200"],
            ],
          ),
          correction:
            "a) On se place sur la ligne « Moins de 40 ans », puis dans la colonne « Trie le verre » : la case contient $70$.\n$70$ personnes de moins de $40$ ans trient le verre.\nb) « En tout » : c'est une marge. On lit le total de la colonne « Ne trie pas », tout en bas : $45$ personnes.\nc) C'est le total de la ligne « 40 ans et plus », à droite : $100$ personnes.\n⚠️ Une case répond à « à la fois … et … » ; une marge répond à « en tout ».",
          micros: ["info_tab_lire"],
        },
        {
          enonce:
            "Un club omnisports compte $200$ licenciés, répartis dans le tableau ci-dessous.\na) Combien de filles font de la natation ?\nb) Dans quel sport y a-t-il autant de filles que de garçons ?\nc) Combien de licenciés font du football ?",
          figure: tableauProba(
            ["", "Filles", "Garçons", "Total"],
            [
              ["Football", "24", "56", "80"],
              ["Basket", "30", "30", "60"],
              ["Natation", "36", "24", "60"],
              ["Total", "90", "110", "200"],
            ],
          ),
          correction:
            "a) Ligne « Natation », colonne « Filles » : $36$ filles font de la natation.\n⚠️ Pas $60$ : $60$ est le total de la ligne, filles et garçons ensemble.\nb) On compare les deux cases de chaque ligne. Au basket : $30$ filles et $30$ garçons.\nc) Total de la ligne « Football » : $80$ licenciés.\n✔️ Contrôle : $80 + 60 + 60 = 200$, le total général.",
          micros: ["info_tab_lire"],
        },
        {
          enonce:
            "Voici la répartition des $180$ salariés d'une entreprise selon leur temps de travail. Deux nombres ont été effacés. Les retrouver.",
          figure: tableauProba(
            ["", "Temps plein", "Temps partiel", "Total"],
            [
              ["Femmes", "60", "?", "80"],
              ["Hommes", "90", "10", "100"],
              ["Total", "150", "?", "180"],
            ],
          ),
          correction:
            "On commence par la ligne où il ne manque qu'UN nombre : la ligne « Femmes ».\n$80 - 60 = 20$ : $20$ femmes travaillent à temps partiel.\nPuis la colonne « Temps partiel » : $20 + 10 = 30$.\n✔️ Contrôle par l'autre chemin : $180 - 150 = 30$. Les deux calculs donnent le même nombre.\n⭐ Un tableau complété se vérifie TOUJOURS dans les deux sens.",
          micros: ["info_tab_completer"],
        },
        {
          enonce:
            "Un forestier a compté les arbres de deux parcelles. Compléter les cinq cases de total.",
          figure: tableauProba(
            ["", "Feuillus", "Résineux", "Total"],
            [
              ["Parcelle nord", "120", "80", "…"],
              ["Parcelle sud", "60", "140", "…"],
              ["Total", "…", "…", "…"],
            ],
          ),
          correction:
            "Les totaux des lignes : nord $120 + 80 = 200$ ; sud $60 + 140 = 200$.\nLes totaux des colonnes : feuillus $120 + 60 = 180$ ; résineux $80 + 140 = 220$.\nLe total général, par les lignes : $200 + 200 = 400$ ; par les colonnes : $180 + 220 = 400$.\nLes deux chemins donnent $400$ arbres : le tableau est juste.\n⚠️ Le total général ne s'obtient pas en additionnant TOUTES les cases, marges comprises : on compterait chaque arbre deux fois.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Feuillus", "Résineux", "Total"],
              [
                ["Parcelle nord", "120", "80", "200"],
                ["Parcelle sud", "60", "140", "200"],
                ["Total", "180", "220", "400"],
              ],
            ),
          ),
          micros: ["info_tab_completer"],
        },
        {
          enonce:
            "À la fin d'une randonnée en montagne, $12$ randonneurs répondent à deux questions : parcours court (C) ou long (L) ? A vu un chamois (O) ou non (N) ? Voici leurs réponses :\nCN, LO, LO, CO, CN, LN, LO, CN, CO, LO, CN, LO.\nDresser le tableau croisé de ces réponses.",
          correction:
            "On prépare un tableau à $2$ lignes (court, long) et $2$ colonnes (chamois vu, pas vu), plus les marges.\nOn compte chaque couple, en barrant au fur et à mesure : CO $2$ fois, CN $4$ fois, LO $5$ fois, LN $1$ fois.\nLes marges : court $2 + 4 = 6$, long $5 + 1 = 6$ ; chamois vu $2 + 5 = 7$, pas vu $4 + 1 = 5$.\n✔️ Total : $6 + 6 = 12$ et $7 + 5 = 12$, le nombre de randonneurs.\n⭐ Barrer chaque réponse une fois comptée évite d'en oublier une, ou de la compter deux fois.",
          schema: tableauProba(
            ["", "Chamois vu", "Pas vu", "Total"],
            [
              ["Court", "2", "4", "6"],
              ["Long", "5", "1", "6"],
              ["Total", "7", "5", "12"],
            ],
          ),
          micros: ["info_tab_construire"],
        },
        {
          enonce:
            "On veut croiser, pour les logements d'un quartier, le type de logement (appartement ou maison) et le mode de chauffage (électrique, gaz ou bois).\na) Combien de cases d'effectifs le tableau aura-t-il, sans compter les marges ?\nb) Dessiner le tableau vide, avec ses marges.",
          correction:
            "a) Une case par couple possible : $2$ types de logement $\\times$ $3$ modes de chauffage $= 6$ cases.\nb) $2$ lignes (appartement, maison) plus la ligne « Total » ; $3$ colonnes (électrique, gaz, bois) plus la colonne « Total ».\n⚠️ Les marges ne sont pas des données nouvelles : ce sont des sommes, qu'on calcule une fois les $6$ cases remplies.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Électrique", "Gaz", "Bois", "Total"],
              [
                ["Appartement", "", "", "", ""],
                ["Maison", "", "", "", ""],
                ["Total", "", "", "", ""],
              ],
            ),
          ),
          micros: ["info_tab_construire"],
        },
        {
          enonce:
            "Un lycée a relevé le temps d'écran quotidien de $250$ élèves (modèle).\na) Combien d'élèves de première passent $3$ h ou plus devant un écran ?\nb) Combien d'élèves, toutes classes confondues, passent $3$ h ou plus devant un écran ?\nc) Combien d'élèves de seconde ont répondu ?",
          figure: tableauProba(
            ["", "Moins de 3 h", "3 h ou plus", "Total"],
            [
              ["Seconde", "60", "70", "130"],
              ["Première", "50", "70", "120"],
              ["Total", "110", "140", "250"],
            ],
          ),
          correction:
            "a) Ligne « Première », colonne « 3 h ou plus » : $70$ élèves.\nb) « Toutes classes confondues » : on lit la marge du bas de la colonne « 3 h ou plus » : $140$ élèves.\nc) Marge de droite de la ligne « Seconde » : $130$ élèves.\n⚠️ Aux a) et b), la même colonne, mais pas la même case : la question dit si l'on veut une case (a) ou une marge (b).",
          micros: ["info_tab_lire"],
        },
        {
          enonce:
            "Une ville possède $100$ vélos en libre-service. Il manque cinq nombres dans le tableau. Les retrouver, dans un ordre où chaque calcul n'a qu'une inconnue.",
          figure: tableauProba(
            ["", "En service", "En panne", "Total"],
            [
              ["Électriques", "25", "?", "40"],
              ["Mécaniques", "?", "?", "?"],
              ["Total", "70", "?", "100"],
            ],
          ),
          correction:
            "Ligne « Électriques » : $40 - 25 = 15$ électriques en panne.\nColonne « Total » : $100 - 40 = 60$ vélos mécaniques.\nColonne « En service » : $70 - 25 = 45$ mécaniques en service.\nLigne « Total » : $100 - 70 = 30$ vélos en panne.\nDernière case : $60 - 45 = 15$ mécaniques en panne.\n✔️ Contrôle : $15 + 15 = 30$, le total des vélos en panne.",
          schema: ecranSeulement(
            tableauProba(
              ["", "En service", "En panne", "Total"],
              [
                ["Électriques", "25", "15", "40"],
                ["Mécaniques", "45", "15", "60"],
                ["Total", "70", "30", "100"],
              ],
            ),
          ),
          micros: ["info_tab_completer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire chaque phrase dans sa case, compléter, puis vérifier le total dans les deux sens.",
      rappel: [
        "Dans chaque ligne, les cases font le total de la ligne ; dans chaque colonne, le total de la colonne.",
        "On commence par la ligne ou la colonne où il ne manque QU'UN nombre.",
        "Un pourcentage se traduit en effectif : $30$ % de $400$, c'est $0{,}3 \\times 400 = 120$.",
        "Contrôle final : somme des totaux de lignes = somme des totaux de colonnes = total général.",
      ],
      exercices: [
        {
          titre: "Un parc de véhicules",
          enonce:
            "Une entreprise possède $300$ véhicules : des utilitaires et des voitures, électriques ou thermiques. $40$ % des véhicules sont électriques. Parmi les électriques, $90$ sont des utilitaires. Il y a $150$ utilitaires en tout.\na) Combien de véhicules sont électriques ?\nb) Dresser le tableau croisé complet.\nc) Combien de voitures thermiques l'entreprise possède-t-elle ?",
          correction:
            "a) $40$ % de $300$ : $0{,}4 \\times 300 = 120$ véhicules électriques. Il en reste $300 - 120 = 180$ thermiques.\nb) On place les nombres donnés : $90$ (électrique ET utilitaire), $150$ (total des utilitaires).\nÉlectriques non utilitaires : $120 - 90 = 30$ voitures.\nUtilitaires thermiques : $150 - 90 = 60$.\nVoitures en tout : $300 - 150 = 150$.\nc) Voitures thermiques : $180 - 60 = 120$.\n✔️ Contrôle : $30 + 120 = 150$, le total des voitures.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Utilitaires", "Voitures", "Total"],
              [
                ["Électriques", "90", "30", "120"],
                ["Thermiques", "60", "120", "180"],
                ["Total", "150", "150", "300"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "Le semi-marathon",
          enonce:
            "À l'arrivée d'un semi-marathon, on range les $500$ coureurs selon leur temps. Compléter le tableau.",
          figure: tableauProba(
            ["", "< 1 h 45", "1 h 45 à 2 h 15", "> 2 h 15", "Total"],
            [
              ["Femmes", "40", "?", "50", "200"],
              ["Hommes", "?", "150", "?", "?"],
              ["Total", "160", "?", "80", "500"],
            ],
          ),
          correction:
            "Ligne « Femmes », une seule inconnue : $200 - 40 - 50 = 110$.\nColonne « Total » : $500 - 200 = 300$ hommes.\nColonne « < 1 h 45 » : $160 - 40 = 120$ hommes.\nColonne « > 2 h 15 » : $80 - 50 = 30$ hommes.\nColonne du milieu : $110 + 150 = 260$.\n✔️ Contrôle de la ligne « Hommes » : $120 + 150 + 30 = 300$. Et $160 + 260 + 80 = 500$.\n⭐ L'ordre compte : à chaque étape, on choisit une ligne ou une colonne où il ne reste qu'un « ? ».",
          schema: ecranSeulement(
            tableauProba(
              ["", "< 1 h 45", "1 h 45 à 2 h 15", "> 2 h 15", "Total"],
              [
                ["Femmes", "40", "110", "50", "200"],
                ["Hommes", "120", "150", "30", "300"],
                ["Total", "160", "260", "80", "500"],
              ],
            ),
          ),
          micros: ["info_tab_completer"],
        },
        {
          titre: "La satisfaction des clients",
          enonce:
            "Une banque interroge $800$ clients (modèle). $60$ % sont clients en ligne, les autres en agence. $75$ % des clients en ligne se disent satisfaits, et $200$ clients en agence se disent satisfaits.\na) Dresser le tableau croisé.\nb) Combien de clients sont satisfaits, en tout ?\nc) Combien de clients en agence ne sont pas satisfaits ?",
          correction:
            "a) Clients en ligne : $0{,}6 \\times 800 = 480$ ; en agence : $800 - 480 = 320$.\nSatisfaits en ligne : $75$ % de $480$, soit $0{,}75 \\times 480 = 360$. Non satisfaits en ligne : $480 - 360 = 120$.\nEn agence : $200$ satisfaits, donc $320 - 200 = 120$ non satisfaits.\nb) $360 + 200 = 560$ clients satisfaits.\nc) $120$ clients en agence ne sont pas satisfaits.\n⚠️ Les $75$ % portent sur les clients EN LIGNE, pas sur les $800$ : $0{,}75 \\times 800 = 600$ serait faux.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Satisfaits", "Non satisfaits", "Total"],
              [
                ["En ligne", "360", "120", "480"],
                ["En agence", "200", "120", "320"],
                ["Total", "560", "240", "800"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "Les ampoules de deux usines",
          enonce:
            "Un fabricant d'éclairage a produit $200$ lots d'ampoules dans deux usines, selon trois technologies : LED, fluocompacte, halogène. Un stagiaire a recopié le tableau, et UNE erreur s'y est glissée. La trouver et la corriger.",
          figure: tableauProba(
            ["", "LED", "Fluo", "Halogène", "Total"],
            [
              ["Usine A", "45", "30", "25", "100"],
              ["Usine B", "35", "50", "15", "100"],
              ["Total", "80", "80", "40", "210"],
            ],
          ),
          correction:
            "On vérifie chaque ligne : $45 + 30 + 25 = 100$ ✔️ ; $35 + 50 + 15 = 100$ ✔️.\nChaque colonne : $45 + 35 = 80$ ✔️ ; $30 + 50 = 80$ ✔️ ; $25 + 15 = 40$ ✔️.\nLe total général : par les lignes, $100 + 100 = 200$ ; par les colonnes, $80 + 80 + 40 = 200$.\nL'erreur est le total général : il vaut $200$, et non $210$.\n⭐ Toutes les cases s'accordaient entre elles : seul le contrôle dans les deux sens trahit l'erreur.",
          micros: ["info_tab_completer", "info_tab_lire"],
        },
        {
          titre: "Sommeil et fatigue",
          enonce:
            "On a interrogé $400$ lycéens sur leur nuit (moins de $8$ h, ou $8$ h ou plus) et sur leur fatigue en classe (modèle).\na) Écrire une phrase qui dit ce que signifie le nombre $150$.\nb) Combien de lycéens ne se disent pas fatigués ?\nc) Combien dorment $8$ h ou plus ET ne sont pas fatigués ?\nd) Combien dorment moins de $8$ h ?",
          figure: tableauProba(
            ["", "Fatigué", "Pas fatigué", "Total"],
            [
              ["Moins de 8 h", "150", "90", "240"],
              ["8 h ou plus", "40", "120", "160"],
              ["Total", "190", "210", "400"],
            ],
          ),
          correction:
            "a) $150$ est à la ligne « Moins de 8 h » et à la colonne « Fatigué » : $150$ lycéens dorment moins de $8$ h ET se disent fatigués.\nb) Marge de la colonne « Pas fatigué » : $210$ lycéens.\nc) Une case : ligne « 8 h ou plus », colonne « Pas fatigué » : $120$ lycéens.\nd) Marge de la ligne « Moins de 8 h » : $240$ lycéens.\n⭐ Le mot « ET » annonce une case ; « en tout », une marge.",
          micros: ["info_tab_lire"],
        },
        {
          titre: "Les communes d'un canton de montagne",
          enonce:
            "Un canton compte $36$ communes. $20$ sont en montagne, les autres en plaine. Parmi les communes de montagne, $15$ ont moins de $1\\,000$ habitants. $12$ communes de plaine ont $1\\,000$ habitants ou plus.\na) Dresser le tableau croisé (situation × taille).\nb) Combien de communes du canton ont moins de $1\\,000$ habitants ?",
          correction:
            "a) Communes de plaine : $36 - 20 = 16$.\nMontagne, $1\\,000$ habitants ou plus : $20 - 15 = 5$.\nPlaine, moins de $1\\,000$ habitants : $16 - 12 = 4$.\nb) Moins de $1\\,000$ habitants : $15 + 4 = 19$ communes.\n✔️ Et $5 + 12 = 17$ communes plus grandes : $19 + 17 = 36$.\n⭐ En montagne, les petites communes dominent ($15$ sur $20$) ; en plaine, les grandes ($12$ sur $16$).",
          schema: ecranSeulement(
            tableauProba(
              ["", "Moins de 1 000 hab.", "1 000 hab. ou plus", "Total"],
              [
                ["Montagne", "15", "5", "20"],
                ["Plaine", "4", "12", "16"],
                ["Total", "19", "17", "36"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "Les oiseaux bagués",
          enonce:
            "Dans une réserve naturelle, on a bagué des oiseaux. $30$ % d'entre eux sont des jeunes, soit $90$ oiseaux. Parmi les adultes, $120$ sont des mâles. Il y a $150$ femelles en tout.\na) Combien d'oiseaux ont été bagués ?\nb) Dresser le tableau croisé (sexe × âge).\nc) Combien de jeunes femelles a-t-on baguées ?",
          correction:
            "a) $30$ % du total font $90$ oiseaux : le total vaut $90 \\div 0{,}3 = 300$ oiseaux.\n✔️ Vérification : $0{,}3 \\times 300 = 90$.\nb) Adultes : $300 - 90 = 210$. Mâles en tout : $300 - 150 = 150$.\nFemelles adultes : $210 - 120 = 90$. Jeunes mâles : $150 - 120 = 30$.\nc) Jeunes femelles : $90 - 30 = 60$ (ou $150 - 90 = 60$).\n⚠️ Au a), on ne multiplie pas $90$ par $0{,}3$ : on cherche le TOUT dont $90$ est une partie.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Jeunes", "Adultes", "Total"],
              [
                ["Mâles", "30", "120", "150"],
                ["Femelles", "60", "90", "150"],
                ["Total", "90", "210", "300"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "Venir travailler",
          enonce:
            "Une entreprise a relevé comment ses $400$ salariés viennent travailler, selon la distance entre leur domicile et l'entreprise (modèle).\na) Combien de salariés viennent en voiture ?\nb) Parmi ceux qui habitent à moins de $10$ km, combien viennent en voiture ?\nc) La directrice affirme : « la plupart de ceux qui habitent à moins de $10$ km viennent en voiture ». A-t-elle raison ?\nd) Combien de salariés habitant à $10$ km ou plus viennent à vélo ou à pied ?",
          figure: tableauProba(
            ["", "Voiture", "Bus, train", "Vélo, marche", "Total"],
            [
              ["Moins de 10 km", "80", "40", "60", "180"],
              ["10 km ou plus", "150", "60", "10", "220"],
              ["Total", "230", "100", "70", "400"],
            ],
          ),
          correction:
            "a) Marge de la colonne « Voiture » : $230$ salariés.\nb) Case « Moins de 10 km » et « Voiture » : $80$ salariés.\nc) « La plupart » veut dire plus de la moitié. La moitié de $180$, c'est $90$, et $80 < 90$.\nElle a tort : $40 + 60 = 100$ salariés proches viennent autrement qu'en voiture.\nd) Case « 10 km ou plus » et « Vélo, marche » : $10$ salariés.\n⚠️ Au c), on compare à la ligne « Moins de 10 km » ($180$), pas aux $400$ salariés.",
          micros: ["info_tab_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Dessiner le tableau vide, placer chaque information dans sa case, compléter, vérifier.",
      rappel: [
        "On dessine d'abord le tableau vide, avec ses marges.",
        "On place chaque information de l'énoncé dans SA case, puis on complète ce qui ne manque que d'un nombre.",
        "On vérifie le total général dans les deux sens, et on répond par une phrase.",
      ],
      exercices: [
        {
          titre: "Le recyclage des téléphones",
          enonce:
            "On a interrogé $1\\,200$ personnes sur leur ancien téléphone : l'ont-elles recyclé, ou gardé dans un tiroir ? $400$ ont moins de $25$ ans, $500$ ont de $25$ à $50$ ans, les autres plus de $50$ ans. $25$ % des moins de $25$ ans l'ont recyclé ; $150$ personnes de $25$ à $50$ ans l'ont recyclé ; au total, $330$ personnes l'ont recyclé (modèle).\na) Combien de personnes ont plus de $50$ ans ?\nb) Dresser le tableau croisé (âge × choix).\nc) Combien de téléphones dorment dans un tiroir ?\nd) Dans quelle tranche d'âge le plus grand NOMBRE de personnes a-t-il recyclé ?",
          correction:
            "a) $1\\,200 - 400 - 500 = 300$ personnes ont plus de $50$ ans.\nb) Moins de $25$ ans : $0{,}25 \\times 400 = 100$ ont recyclé, $400 - 100 = 300$ ont gardé.\nDe $25$ à $50$ ans : $150$ ont recyclé, $500 - 150 = 350$ ont gardé.\nPlus de $50$ ans : $330 - 100 - 150 = 80$ ont recyclé, $300 - 80 = 220$ ont gardé.\nc) $300 + 350 + 220 = 870$ téléphones dans un tiroir.\n✔️ Contrôle : $1\\,200 - 330 = 870$.\nd) Les $25$ à $50$ ans : $150$ personnes, contre $100$ et $80$.\n⭐ Un tableau à trois lignes se complète comme un tableau à deux : une inconnue à la fois.",
          schema: tableauProba(
            ["", "Recyclé", "Tiroir", "Total"],
            [
              ["Moins de 25 ans", "100", "300", "400"],
              ["25 à 50 ans", "150", "350", "500"],
              ["Plus de 50 ans", "80", "220", "300"],
              ["Total", "330", "870", "1200"],
            ],
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "La station de ski",
          enonce:
            "Une station de ski a vendu $2\\,000$ forfaits pendant les vacances : forfaits « journée » ou « semaine », pour adultes ou enfants. $1\\,200$ forfaits sont pour des adultes, $1\\,100$ forfaits sont des forfaits journée, et $700$ sont des forfaits journée pour adultes. Les prix (modèle) : journée $50$ € pour un adulte et $40$ € pour un enfant ; semaine $250$ € pour un adulte et $200$ € pour un enfant.\na) Dresser le tableau croisé des ventes.\nb) Combien de forfaits semaine pour enfants ont été vendus ?\nc) Calculer la recette totale de la station.\nd) Quel type de forfait rapporte le plus ?",
          correction:
            "a) Forfaits enfants : $2\\,000 - 1\\,200 = 800$. Forfaits semaine : $2\\,000 - 1\\,100 = 900$.\nAdultes semaine : $1\\,200 - 700 = 500$. Enfants journée : $1\\,100 - 700 = 400$.\nb) Enfants semaine : $800 - 400 = 400$ (ou $900 - 500 = 400$).\nc) On multiplie chaque case par son prix :\nadultes journée $700 \\times 50 = 35\\,000$ € ; enfants journée $400 \\times 40 = 16\\,000$ € ;\nadultes semaine $500 \\times 250 = 125\\,000$ € ; enfants semaine $400 \\times 200 = 80\\,000$ €.\nRecette : $35\\,000 + 16\\,000 + 125\\,000 + 80\\,000 = 256\\,000$ €.\nd) Le forfait semaine adulte : $125\\,000$ €, près de la moitié de la recette, avec seulement $500$ forfaits sur $2\\,000$.\n⚠️ La case la plus remplie ($700$) n'est pas celle qui rapporte le plus.",
          schema: tableauProba(
            ["", "Journée", "Semaine", "Total"],
            [
              ["Adultes", "700", "500", "1200"],
              ["Enfants", "400", "400", "800"],
              ["Total", "1100", "900", "2000"],
            ],
          ),
          micros: ["info_tab_construire", "info_tab_completer", "info_tab_lire"],
        },
        {
          titre: "L'exode rural d'un village",
          enonce:
            "On compare les métiers des actifs d'un village en $1900$ et en $2000$ (modèle) : $300$ actifs à chaque date. En $1900$ : $180$ agriculteurs et $60$ artisans ou commerçants ; les autres exercent d'« autres métiers ». En $2000$ : $15$ agriculteurs et $240$ « autres métiers ».\na) Dresser le tableau croisé (date × métier), avec ses marges.\nb) Combien d'artisans ou commerçants en $2000$ ?\nc) Par combien le nombre d'agriculteurs a-t-il été divisé en un siècle ?",
          correction:
            "a) En $1900$, autres métiers : $300 - 180 - 60 = 60$.\nb) En $2000$, artisans ou commerçants : $300 - 15 - 240 = 45$.\nLes marges des colonnes : agriculture $180 + 15 = 195$ ; artisanat $60 + 45 = 105$ ; autres $60 + 240 = 300$ ; total $600$.\n✔️ $195 + 105 + 300 = 600 = 300 + 300$.\nc) $180 \\div 15 = 12$ : le nombre d'agriculteurs a été divisé par $12$.\n⭐ C'est, en petit, l'exode rural du XXᵉ siècle : moins de paysans, plus d'emplois dans les services.\n⚠️ Ici, la marge « Total » des colonnes additionne deux dates : elle a peu de sens. Ce sont les LIGNES qu'on compare.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Agriculture", "Artisanat", "Autres", "Total"],
              [
                ["1900", "180", "60", "60", "300"],
                ["2000", "15", "45", "240", "300"],
                ["Total", "195", "105", "300", "600"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer"],
        },
        {
          titre: "Le festival et les transports",
          enonce:
            "Un festival de musique a accueilli $5\\,000$ festivaliers. $40$ % sont venus en voiture seule, $1\\,500$ en train, les autres en covoiturage. $2\\,000$ festivaliers habitent à moins de $50$ km ; parmi eux, $1\\,200$ sont venus en voiture seule et $300$ en train (modèle).\na) Combien sont venus en voiture seule ? en covoiturage ?\nb) Dresser le tableau croisé (distance × transport).\nc) Combien de festivaliers venus de $50$ km ou plus ont covoituré ?\nd) L'an prochain, des navettes de $60$ places iront chercher les festivaliers proches venus en voiture seule. Combien de navettes faut-il ?",
          correction:
            "a) Voiture seule : $0{,}4 \\times 5\\,000 = 2\\,000$. Covoiturage : $5\\,000 - 2\\,000 - 1\\,500 = 1\\,500$.\nb) Moins de $50$ km, covoiturage : $2\\,000 - 1\\,200 - 300 = 500$.\n$50$ km ou plus : $5\\,000 - 2\\,000 = 3\\,000$ festivaliers, dont voiture seule $2\\,000 - 1\\,200 = 800$ et train $1\\,500 - 300 = 1\\,200$.\nc) Covoiturage de loin : $1\\,500 - 500 = 1\\,000$.\n✔️ Ligne « 50 km ou plus » : $800 + 1\\,200 + 1\\,000 = 3\\,000$.\nd) $1\\,200 \\div 60 = 20$ navettes.\n⭐ Le tableau répond à des questions que l'énoncé ne posait pas directement : c'est pour cela qu'on le dresse.",
          schema: ecranSeulement(
            tableauProba(
              ["", "Voiture seule", "Train", "Covoiturage", "Total"],
              [
                ["Moins de 50 km", "1200", "300", "500", "2000"],
                ["50 km ou plus", "800", "1200", "1000", "3000"],
                ["Total", "2000", "1500", "1500", "5000"],
              ],
            ),
          ),
          micros: ["info_tab_construire", "info_tab_completer", "info_tab_lire"],
        },
      ],
    },
  ],
};
