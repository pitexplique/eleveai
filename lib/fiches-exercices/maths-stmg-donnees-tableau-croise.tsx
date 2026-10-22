// ─── Fiche d'exercices : le tableau croisé d'effectifs (STMG) — 20 exercices ──
//
// Première feuille de STMG (22/10/2026). Sur le modèle de la 4e
// (`maths-4e-stat-donnee.tsx`) et de la 1re (`maths-premiere-info-tableau-croise.tsx`),
// alignée sur la banque `lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts`,
// notion donnees_tableau_croise (domaine STMGDC, classe de première) : lire une
// case et une marge, calculer les marges, compléter, dresser à partir de données
// brutes. ⛔ Pas de fréquence ici : c'est la notion donnees_frequences, qui a sa
// feuille. Pas de probabilité non plus (terminale).
//
// ⭐⭐ LE FIL : UNE CASE DIT « À LA FOIS … ET … », UNE MARGE DIT « EN TOUT ». On
// complète TOUJOURS par la ligne ou la colonne où il ne manque qu'un nombre, et
// l'on contrôle le total général par les deux chemins.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 2 — le jeu de 52 cartes : 4 couleurs de 13 cartes, 3 figures (roi,
//     dame, valet) par couleur ;
//   · ex. 4 — les 8 planètes du Système solaire (UAI, 2006) : Mercure et Vénus
//     sans satellite, la Terre (1) et Mars (2) avec ; les 4 géantes en ont toutes ;
//   · ex. 9 — les 18 régions françaises (13 en métropole, 5 en outre-mer ; loi du
//     16 janvier 2015) ; façade maritime d'après la carte ;
//   · ex. 12 — le calendrier 2026 : le 1er janvier 2026 est un jeudi ; Pâques
//     tombe le 5 avril, le lundi de Pâques le 6 avril (hors trimestre) ;
//   · ex. 15 — les médailles de la France à Paris 2024 (CNOSF, CPSF) : Jeux
//     olympiques 16 or, 26 argent, 22 bronze (64) ; Jeux paralympiques 19 or,
//     28 argent, 28 bronze (75).
// Le reste est un MODÈLE, à des ordres de grandeur vraisemblables, et l'énoncé
// le dit.
// Domaines et métiers, un par exercice : marketing (chargée d'études), jeux
// (croupière), ressources humaines (responsable RH), astronomie (médiatrice au
// planétarium), santé (infirmière de centre de vaccination), environnement
// (chargée de mission), e-commerce (responsable de boutique en ligne), formation
// (directeur d'organisme), géographie (géomaticienne), hôtellerie (directrice
// d'hôtel), immobilier (agente), paie (gestionnaire de paie), logistique
// (responsable d'entrepôt), banque (conseiller), sport (journaliste sportive),
// création d'entreprise (conseillère CCI), culture (chargé de billetterie),
// mobilité (gestionnaire de flotte), agriculture (responsable qualité d'une
// coopérative), restauration collective (gérant).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-donnees-tableau-croise.mjs`
// (chaque tableau relu dans le source, chaque marge refaite dans les deux sens,
// les listes brutes recomptées dans l'énoncé, le calendrier refait par Date).
//
// Micro-compétences : don_tab_lire (1, 2, 9, 13, 14, 15), don_tab_marges (2, 3,
// 4, 9, 14, 16, 17, 19), don_tab_completer (5, 6, 10, 11, 13, 15, 16, 18, 19),
// don_tab_dresser (7, 8, 9, 12, 17, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { croise, ecranSeulement } from "@/lib/fiches-exercices/figures-donnees";

export const exercicesDonneesTableauCroiseStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "donnees-tableau-croise",
  titre: "Le tableau croisé d'effectifs",
  accroche:
    "Vingt exercices pour lire, compléter et dresser un tableau croisé d'effectifs, comme en gestion, en marketing ou en ressources humaines : satisfaction des clients, contrats des salariés, colis en retard, crédits d'une banque, billets d'un festival. Et des données réelles : le jeu de 52 cartes, les planètes, les régions de France, le calendrier 2026, les médailles de Paris 2024. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape, avec le tableau complété et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lire une case, calculer une marge, retrouver un nombre, ou ranger des données.",
      rappel: [
        "Un tableau croisé range une population selon DEUX critères : l'un en ligne, l'autre en colonne.",
        "Une case compte les individus qui sont À LA FOIS dans sa ligne et dans sa colonne.",
        "Les MARGES (ligne et colonne « Total ») sont des sommes. Le total général est dans le coin, en bas à droite.",
        "Pour compléter, je commence par une ligne ou une colonne où il ne manque qu'un nombre.",
      ],
      exercices: [
        {
          enonce:
            "Une chargée d'études marketing a interrogé 400 clients d'une enseigne de bricolage (modèle). Le tableau croise le lieu d'achat et l'avis du client.\na) Combien de clients ont acheté sur le site ET sont satisfaits ?\nb) Combien de clients, en tout, ne sont pas satisfaits ?\nc) Combien de clients ont acheté en magasin ?\nd) Combien de clients du magasin ne sont pas satisfaits ?",
          figure: croise(["", "Satisfait", "Pas satisfait", "Total"], [
            ["Magasin", 180, 60, 240],
            ["Site web", 120, 40, 160],
            ["Total", 300, 100, 400],
          ]),
          correction:
            "a) « À la fois » : c'est une case. Ligne « Site web », colonne « Satisfait » : je lis 120.\nb) « En tout » : c'est une marge. Total de la colonne « Pas satisfait », tout en bas : 100.\nc) Total de la ligne « Magasin », à droite : 240.\nd) Ligne « Magasin », colonne « Pas satisfait » : 60.\n⛔ Le piège au a) : lire 300, le total de la colonne « Satisfait ». 300 compte aussi les clients du magasin.\nRéponse : a) 120 ; b) 100 ; c) 240 ; d) 60.",
          micros: ["don_tab_lire"],
        },
        {
          enonce:
            "Une croupière range les 52 cartes d'un jeu. Chaque couleur compte 13 cartes, dont 3 figures : le roi, la dame et le valet.\na) Combien de figures de trèfle y a-t-il ?\nb) Combien de cartes ne sont pas des figures ?\nc) Combien de cartes rouges (cœur ou carreau) y a-t-il ?\nd) Vérifie le total général par les deux chemins.",
          figure: croise(["", "Figure", "Autre carte", "Total"], [
            ["Cœur", 3, 10, 13],
            ["Carreau", 3, 10, 13],
            ["Trèfle", 3, 10, 13],
            ["Pique", 3, 10, 13],
            ["Total", 12, 40, 52],
          ]),
          correction:
            "a) Ligne « Trèfle », colonne « Figure » : 3 figures.\nb) C'est la marge de la colonne « Autre carte » : 40 cartes.\nc) J'additionne les marges des lignes « Cœur » et « Carreau » : $13 + 13 = 26$ cartes rouges.\nd) Par les lignes : $13 + 13 + 13 + 13 = 52$. Par les colonnes : $12 + 40 = 52$. Les deux chemins donnent 52.\n⛔ Le piège au b) : répondre 10, une seule case. « Ne sont pas des figures » parle de toutes les couleurs : c'est la marge.\nRéponse : a) 3 ; b) 40 ; c) 26 ; d) 52 par les deux chemins.",
          micros: ["don_tab_lire", "don_tab_marges"],
        },
        {
          enonce:
            "Le responsable des ressources humaines d'une PME prépare le bilan social (modèle). Le tableau donne les salariés par service et par contrat. Calcule les six marges et le total général.",
          figure: croise(["", "CDI", "CDD", "Total"], [
            ["Production", 42, 8, "…"],
            ["Commercial", 15, 5, "…"],
            ["Administration", 12, 3, "…"],
            ["Total", "…", "…", "…"],
          ]),
          correction:
            "Les totaux des lignes : Production $42 + 8 = 50$ ; Commercial $15 + 5 = 20$ ; Administration $12 + 3 = 15$.\nLes totaux des colonnes : CDI $42 + 15 + 12 = 69$ ; CDD $8 + 5 + 3 = 16$.\nLe total général par les lignes : $50 + 20 + 15 = 85$ ; par les colonnes : $69 + 16 = 85$.\n⛔ Le piège : additionner TOUTES les cases, marges comprises. Chaque salarié serait compté deux fois.\nRéponse : 50, 20 et 15 salariés par service ; 69 CDI et 16 CDD ; 85 salariés en tout.",
          schema: ecranSeulement(
            croise(["", "CDI", "CDD", "Total"], [
              ["Production", 42, 8, 50],
              ["Commercial", 15, 5, 20],
              ["Administration", 12, 3, 15],
              ["Total", 69, 16, 85],
            ]),
          ),
          micros: ["don_tab_marges"],
        },
        {
          enonce:
            "Une médiatrice scientifique prépare une animation au planétarium sur les 8 planètes du Système solaire. Les planètes telluriques sont Mercure, Vénus, la Terre et Mars ; les 4 autres sont les géantes. Seules Mercure et Vénus n'ont aucun satellite.\na) Complète les marges du tableau.\nb) Combien de planètes ont au moins un satellite ?\nc) Quelles planètes sont dans la case « Tellurique » et « Sans satellite » ?",
          figure: croise(["", "Avec satellite", "Sans satellite", "Total"], [
            ["Tellurique", 2, 2, "…"],
            ["Géante", 4, 0, "…"],
            ["Total", "…", "…", "…"],
          ]),
          correction:
            "a) Les lignes : telluriques $2 + 2 = 4$ ; géantes $4 + 0 = 4$.\nLes colonnes : avec satellite $2 + 4 = 6$ ; sans satellite $2 + 0 = 2$.\nLe total général : $4 + 4 = 8$, et $6 + 2 = 8$. Ce sont bien les 8 planètes.\nb) C'est la marge de la colonne « Avec satellite » : 6 planètes.\nc) Mercure et Vénus. La Terre (la Lune) et Mars (Phobos et Déimos) sont dans la case voisine.\n⛔ Le piège : oublier la case 0. Une case vide d'individus s'écrit 0, elle compte dans le tableau.\nRéponse : a) 4, 4, 6, 2 et 8 ; b) 6 ; c) Mercure et Vénus.",
          micros: ["don_tab_marges"],
        },
        {
          enonce:
            "L'infirmière d'un centre de vaccination fait le bilan de la campagne contre la grippe auprès de 500 patients (modèle). Retrouve les quatre nombres effacés.",
          figure: croise(["", "Vacciné", "Non vacciné", "Total"], [
            ["Moins de 65 ans", 84, "?", 300],
            ["65 ans et plus", "?", 45, 200],
            ["Total", "?", "?", 500],
          ]),
          correction:
            "Je commence par les lignes, où il ne manque qu'un nombre.\nMoins de 65 ans, non vaccinés : $300 - 84 = 216$.\n65 ans et plus, vaccinés : $200 - 45 = 155$.\nPuis les colonnes : vaccinés $84 + 155 = 239$ ; non vaccinés $216 + 45 = 261$.\nContrôle par l'autre chemin : $239 + 261 = 500$. Le compte est bon.\n⛔ Le piège : commencer par la colonne « Vacciné », où il manque DEUX nombres. On ne peut rien en tirer.\nRéponse : 216 ; 155 ; 239 vaccinés ; 261 non vaccinés.",
          schema: ecranSeulement(
            croise(["", "Vacciné", "Non vacciné", "Total"], [
              ["Moins de 65 ans", 84, 216, 300],
              ["65 ans et plus", 155, 45, 200],
              ["Total", 239, 261, 500],
            ]),
          ),
          micros: ["don_tab_completer"],
        },
        {
          enonce:
            "Une chargée de mission environnement suit les arbres plantés par sa commune l'an dernier (modèle). Un an après, elle note s'ils sont vivants. Complète le tableau, dans l'ordre que tu choisis, en expliquant chaque calcul.",
          figure: croise(["", "Vivant", "Mort", "Total"], [
            ["Chêne", 72, "?", 80],
            ["Érable", "?", 15, "?"],
            ["Total", 132, "?", "?"],
          ]),
          correction:
            "1. La ligne « Chêne » : il ne manque qu'un nombre. Chênes morts : $80 - 72 = 8$.\n2. La colonne « Vivant » : il ne manque qu'un nombre. Érables vivants : $132 - 72 = 60$.\n3. La ligne « Érable » : $60 + 15 = 75$ érables.\n4. La colonne « Mort » : $8 + 15 = 23$ arbres morts.\n5. Le total général : $80 + 75 = 155$ par les lignes, et $132 + 23 = 155$ par les colonnes.\n⛔ Le piège : chercher d'abord le total général. Il manque partout autour de lui ; on le trouve en dernier.\nRéponse : 8 ; 60 ; 75 ; 23 ; 155 arbres plantés.",
          schema: ecranSeulement(
            croise(["", "Vivant", "Mort", "Total"], [
              ["Chêne", 72, 8, 80],
              ["Érable", 60, 15, 75],
              ["Total", 132, 23, 155],
            ]),
          ),
          micros: ["don_tab_completer"],
        },
        {
          enonce:
            "Le responsable d'une boutique en ligne relève 16 commandes (modèle). Pour chacune, il note le canal (M : retrait en magasin, W : livraison à domicile) et ce qu'en a fait le client (R : retournée, G : gardée). Voici ses notes :\nWR, MG, WG, WG, MG, WR, MG, WG, WR, MG, MR, WG, MG, WG, MG, WR.\na) Dresse le tableau croisé de ces commandes, marges comprises.\nb) Combien de commandes livrées à domicile ont été retournées ?",
          correction:
            "a) Je prépare 2 lignes (magasin, domicile) et 2 colonnes (retournée, gardée), plus les marges.\nJe compte chaque couple en le barrant : MR 1 fois, MG 6 fois, WR 4 fois, WG 5 fois.\nLes marges : magasin $1 + 6 = 7$ ; domicile $4 + 5 = 9$ ; retournées $1 + 4 = 5$ ; gardées $6 + 5 = 11$.\nContrôle : $7 + 9 = 16$ et $5 + 11 = 16$, le nombre de commandes.\nb) La case « Domicile » et « Retournée » : 4 commandes.\n⛔ Le piège : compter les W et les R séparément. Une case compte les commandes qui ont LES DEUX lettres.\nRéponse : a) le tableau ci-dessous ; b) 4 commandes.",
          schema: ecranSeulement(
            croise(["", "Retournée", "Gardée", "Total"], [
              ["Magasin", 1, 6, 7],
              ["Domicile", 4, 5, 9],
              ["Total", 5, 11, 16],
            ]),
          ),
          micros: ["don_tab_dresser"],
        },
        {
          enonce:
            "Le directeur d'un organisme de formation fait le bilan d'une session (modèle) : 40 stagiaires ont passé le titre professionnel. 25 sont des femmes. 30 stagiaires ont obtenu le titre, dont 18 femmes.\na) Dresse le tableau croisé sexe × résultat, marges comprises.\nb) Combien d'hommes n'ont pas obtenu le titre ?",
          correction:
            "a) Je place d'abord les nombres donnés : le total 40, la marge « Femmes » 25, la marge « Obtenu » 30, la case « Femmes » et « Obtenu » 18.\nHommes : $40 - 25 = 15$. Pas obtenu : $40 - 30 = 10$.\nFemmes sans le titre : $25 - 18 = 7$. Hommes avec le titre : $30 - 18 = 12$.\nHommes sans le titre : $15 - 12 = 3$.\nContrôle par la colonne : $7 + 3 = 10$. Le compte est bon.\nb) La case « Hommes » et « Pas obtenu » : 3.\n⛔ Le piège : lire « dont 18 femmes » comme 18 femmes en tout. « Dont » prend une partie des 30 qui ont obtenu le titre : c'est une case.\nRéponse : a) le tableau ci-dessous ; b) 3 hommes.",
          schema: ecranSeulement(
            croise(["", "Obtenu", "Pas obtenu", "Total"], [
              ["Femmes", 18, 7, 25],
              ["Hommes", 12, 3, 15],
              ["Total", 30, 10, 40],
            ]),
          ),
          micros: ["don_tab_dresser"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même tableau. Je complète ce qui manque, je contrôle par les deux chemins, puis je réponds par une phrase.",
      rappel: [
        "« À la fois … et … » : une case. « En tout » : une marge. « … ou … » : j'additionne des cases sans en compter une deux fois.",
        "Une phrase « dont » ou « parmi » donne une CASE : une partie d'une ligne ou d'une colonne.",
        "Le total général se vérifie par les lignes ET par les colonnes : si les deux chemins diffèrent, il y a une erreur.",
      ],
      exercices: [
        {
          enonce:
            "Une géomaticienne prépare une carte des 18 régions françaises : 13 en métropole et 5 en outre-mer. En métropole, 8 régions ont une façade maritime : Hauts-de-France, Normandie, Bretagne, Pays de la Loire, Nouvelle-Aquitaine, Occitanie, Provence-Alpes-Côte d'Azur et Corse. Les 5 régions d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte) ont toutes une façade maritime.\na) Dresse le tableau croisé situation × façade maritime, marges comprises.\nb) Combien de régions n'ont aucune façade maritime ? Nomme-les.\nc) Combien de régions, en tout, ont une façade maritime ?",
          correction:
            "a) 2 lignes (métropole, outre-mer), 2 colonnes (façade maritime, sans façade), et les marges.\nMétropole avec façade : 8. Métropole sans façade : $13 - 8 = 5$.\nOutre-mer : 5 avec façade, 0 sans façade.\nLes colonnes : avec façade $8 + 5 = 13$ ; sans façade $5 + 0 = 5$. Total : $13 + 5 = 18$.\nb) La marge « Sans façade » : 5 régions, toutes en métropole : Grand Est, Île-de-France, Centre-Val de Loire, Bourgogne-Franche-Comté et Auvergne-Rhône-Alpes.\nc) La marge « Façade maritime » : 13 régions.\n⛔ Le piège au c) : répondre 8, en oubliant l'outre-mer. Une marge additionne toute sa colonne.\nRéponse : a) le tableau ci-dessous ; b) 5 régions ; c) 13 régions.",
          schema: ecranSeulement(
            croise(["", "Façade maritime", "Sans façade", "Total"], [
              ["Métropole", 8, 5, 13],
              ["Outre-mer", 5, 0, 5],
              ["Total", 13, 5, 18],
            ]),
          ),
          micros: ["don_tab_dresser", "don_tab_lire", "don_tab_marges"],
        },
        {
          enonce:
            "La directrice d'un hôtel fait le bilan des 9000 nuitées de l'année 2025 (modèle), selon la saison et l'origine des clients.\na) Complète le tableau.\nb) En basse saison, combien de nuitées de clients étrangers ?\nc) Combien de nuitées de clients venus de France, sur l'année ?\nd) La directrice dit : « La haute saison fait le double de la basse saison. » A-t-elle raison ?",
          figure: croise(["", "France", "Étranger", "Total"], [
            ["Haute saison", "?", 2400, 6000],
            ["Basse saison", 2100, "?", "?"],
            ["Total", "?", "?", 9000],
          ]),
          correction:
            "a) Ligne « Haute saison » : France $6000 - 2400 = 3600$.\nColonne « Total » : basse saison $9000 - 6000 = 3000$.\nLigne « Basse saison » : étranger $3000 - 2100 = 900$.\nColonnes : France $3600 + 2100 = 5700$ ; étranger $2400 + 900 = 3300$.\nContrôle : $5700 + 3300 = 9000$.\nb) La case « Basse saison » et « Étranger » : 900 nuitées.\nc) La marge « France » : 5700 nuitées.\nd) $2 \times 3000 = 6000$ : oui, la haute saison fait exactement le double.\n⛔ Le piège au b) : lire 3300, la marge des étrangers sur toute l'année.\nRéponse : a) 3600, 3000, 900, 5700, 3300 ; b) 900 ; c) 5700 ; d) oui.",
          schema: ecranSeulement(
            croise(["", "France", "Étranger", "Total"], [
              ["Haute saison", 3600, 2400, 6000],
              ["Basse saison", 2100, 900, 3000],
              ["Total", 5700, 3300, 9000],
            ]),
          ),
          micros: ["don_tab_completer"],
        },
        {
          enonce:
            "Une agente immobilière a conclu 120 ventes en 2025 (modèle). Elle se souvient de trois choses :\n· il y a eu trois fois plus de ventes dans l'ancien que dans le neuf ;\n· dans le neuf, il y a eu quatre fois plus d'appartements que de maisons ;\n· dans l'ancien, il y a eu 10 appartements de plus que de maisons.\nUtilise ces phrases pour compléter le tableau.",
          figure: croise(["", "Neuf", "Ancien", "Total"], [
            ["Appartement", "?", "?", "?"],
            ["Maison", 6, "?", "?"],
            ["Total", "?", "?", 120],
          ]),
          correction:
            "1. Neuf et ancien font 120 ventes, l'ancien en fait trois fois plus : 4 parts égales. $120 \div 4 = 30$ ventes dans le neuf, $3 \times 30 = 90$ dans l'ancien.\n2. Dans le neuf : $4 \times 6 = 24$ appartements. Contrôle : $24 + 6 = 30$.\n3. Dans l'ancien : 90 ventes, 10 appartements de plus que de maisons. $90 - 10 = 80$, et $80 \div 2 = 40$ maisons, donc $40 + 10 = 50$ appartements.\n4. Les marges : appartements $24 + 50 = 74$ ; maisons $6 + 40 = 46$. Contrôle : $74 + 46 = 120$.\n⛔ Le piège au 3. : partager 90 en deux, 45 et 45. « 10 de plus » : j'enlève d'abord les 10, puis je partage.\nRéponse : 24 et 50 appartements, 40 maisons dans l'ancien ; 30 ventes dans le neuf, 90 dans l'ancien ; 74 appartements et 46 maisons.",
          schema: ecranSeulement(
            croise(["", "Neuf", "Ancien", "Total"], [
              ["Appartement", 24, 50, 74],
              ["Maison", 6, 40, 46],
              ["Total", 30, 90, 120],
            ]),
          ),
          micros: ["don_tab_completer"],
        },
        {
          enonce:
            "Une gestionnaire de paie compte, pour le premier trimestre 2026, les jours du lundi au vendredi et les jours de week-end. Le 1er janvier 2026 est un jeudi ; janvier et mars ont 31 jours, février 28.\na) Dresse le tableau croisé mois × type de jour, marges comprises.\nb) Combien de jours du lundi au vendredi compte le trimestre ?\nc) Le 1er janvier est férié, et c'est le seul jour férié du trimestre. Combien de jours travaillés (du lundi au vendredi, hors férié) en janvier ?",
          correction:
            "a) Janvier commence un jeudi. Les samedis sont les 3, 10, 17, 24 et 31 : 5 samedis. Les dimanches, les 4, 11, 18 et 25 : 4. Week-end : $5 + 4 = 9$ jours ; du lundi au vendredi : $31 - 9 = 22$.\nLe 31 janvier est un samedi, donc le 1er février est un dimanche. 28 jours, soit 4 semaines pile : $4 \times 2 = 8$ jours de week-end et $28 - 8 = 20$ jours du lundi au vendredi.\nLe 1er mars est donc aussi un dimanche. Dimanches : 1, 8, 15, 22 et 29 ; samedis : 7, 14, 21 et 28. Week-end : $5 + 4 = 9$ ; du lundi au vendredi : $31 - 9 = 22$.\nb) La marge : $22 + 20 + 22 = 64$ jours. Contrôle : $64 + 26 = 90$ jours dans le trimestre.\nc) Le 1er janvier est un jeudi : $22 - 1 = 21$ jours travaillés.\n⛔ Le piège : compter 4 semaines dans chaque mois, donc 8 jours de week-end. Un mois de 31 jours a 3 jours de plus, qui peuvent tomber un samedi ou un dimanche.\nRéponse : a) le tableau ci-dessous ; b) 64 jours ; c) 21 jours.",
          schema: ecranSeulement(
            croise(["", "Lundi-vendredi", "Week-end", "Total"], [
              ["Janvier", 22, 9, 31],
              ["Février", 20, 8, 28],
              ["Mars", 22, 9, 31],
              ["Total", 64, 26, 90],
            ]),
          ),
          micros: ["don_tab_dresser"],
        },
        {
          enonce:
            "Le responsable d'un entrepôt reçoit ce tableau des colis expédiés en septembre (modèle), par transporteur. Un seul nombre est faux.\na) Vérifie chaque ligne, puis chaque colonne. Quel nombre est faux ? Corrige-le.\nb) Combien de colis le transporteur B a-t-il livrés en retard ?\nc) Combien de colis sont arrivés à l'heure, en tout ?",
          figure: croise(["", "À l'heure", "En retard", "Total"], [
            ["Transporteur A", 460, 40, 500],
            ["Transporteur B", 270, 30, 300],
            ["Transporteur C", 185, 15, 200],
            ["Total", 915, 85, 1010],
          ]),
          correction:
            "a) Les lignes : A $460 + 40 = 500$ ; B $270 + 30 = 300$ ; C $185 + 15 = 200$. Les trois sont justes.\nLes colonnes : à l'heure $460 + 270 + 185 = 915$ ; en retard $40 + 30 + 15 = 85$. Justes aussi.\nLe total général : par les lignes $500 + 300 + 200 = 1000$, par les colonnes $915 + 85 = 1000$. Le tableau écrit 1010 : c'est lui, le nombre faux. Il faut 1000.\nb) La case « Transporteur B » et « En retard » : 30 colis.\nc) La marge « À l'heure » : 915 colis.\n⛔ Le piège : ne vérifier que les lignes. Une erreur dans le coin ne se voit qu'en refaisant le total général par les deux chemins.\nRéponse : a) le total général, 1000 et non 1010 ; b) 30 ; c) 915.",
          micros: ["don_tab_lire", "don_tab_completer"],
        },
        {
          enonce:
            "Un conseiller bancaire fait le point sur les 450 crédits accordés par son agence en 2025 (modèle), par âge du client et par type de crédit.\na) Combien de crédits auto ont été accordés aux 31-50 ans ?\nb) Combien de crédits immobiliers, en tout ?\nc) Combien de crédits ont été accordés aux clients de 50 ans ou moins ?\nd) Quelle tranche d'âge a reçu le plus de crédits à la consommation ?\ne) Combien de crédits ne sont pas immobiliers ?",
          figure: croise(["", "Immobilier", "Auto", "Conso", "Total"], [
            ["18-30 ans", 35, 48, 62, 145],
            ["31-50 ans", 110, 55, 40, 205],
            ["51 ans et plus", 25, 32, 43, 100],
            ["Total", 170, 135, 145, 450],
          ]),
          correction:
            "a) Ligne « 31-50 ans », colonne « Auto » : 55.\nb) La marge de la colonne « Immobilier » : 170.\nc) Deux lignes : 18-30 ans et 31-50 ans. J'additionne leurs marges : $145 + 205 = 350$ crédits.\nd) Je lis la colonne « Conso » : 62, 40 et 43. Le plus grand est 62 : les 18-30 ans.\ne) J'enlève les immobiliers du total : $450 - 170 = 280$. Contrôle : $135 + 145 = 280$.\n⛔ Le piège au d) : répondre 145. C'est la marge de toute la colonne ; la question demande une tranche d'âge.\nRéponse : a) 55 ; b) 170 ; c) 350 ; d) les 18-30 ans, avec 62 ; e) 280.",
          micros: ["don_tab_lire", "don_tab_marges"],
        },
        {
          enonce:
            "Une journaliste sportive retrouve, dans ses notes, une partie du tableau des médailles de la France aux Jeux de Paris 2024. Elle sait aussi qu'aux Jeux paralympiques, la France a gagné autant de médailles d'argent que de bronze.\na) Complète le tableau.\nb) Combien de médailles d'or la France a-t-elle gagnées aux Jeux paralympiques ?\nc) Combien de médailles d'or sur les deux Jeux ?",
          figure: croise(["", "JO", "Paralympiques", "Total"], [
            ["Or", 16, "?", "?"],
            ["Argent", "?", 28, 54],
            ["Bronze", 22, "?", "?"],
            ["Total", "?", 75, 139],
          ]),
          correction:
            "1. Le total des JO : $139 - 75 = 64$ médailles.\n2. L'argent aux JO : $54 - 28 = 26$.\n3. Le bronze paralympique est égal à l'argent : 28. Donc l'or paralympique : $75 - 28 - 28 = 19$.\n4. Les marges des lignes : or $16 + 19 = 35$ ; bronze $22 + 28 = 50$.\nContrôle : JO $16 + 26 + 22 = 64$, et $35 + 54 + 50 = 139$.\nb) 19 médailles d'or paralympiques.\nc) La marge de la ligne « Or » : 35.\n⛔ Le piège : chercher l'or paralympique en premier. Il manque deux nombres dans sa colonne tant qu'on n'a pas utilisé la phrase sur le bronze.\nRéponse : a) 19, 35, 26, 28, 50, 64 ; b) 19 ; c) 35.",
          schema: ecranSeulement(
            croise(["", "JO", "Paralympiques", "Total"], [
              ["Or", 16, 19, 35],
              ["Argent", 26, 28, 54],
              ["Bronze", 22, 28, 50],
              ["Total", 64, 75, 139],
            ]),
          ),
          micros: ["don_tab_lire", "don_tab_completer"],
        },
        {
          enonce:
            "Une conseillère de la chambre de commerce (CCI) étudie les entreprises créées en 2025 dans son département (modèle), par secteur et par forme juridique.\na) Complète le tableau.\nb) Combien de sociétés ont été créées en tout ?\nc) Combien de micro-entreprises ont été créées dans les services ?\nd) Combien d'entreprises ont été créées en tout ?",
          figure: croise(["", "Micro-entreprise", "Société", "Total"], [
            ["Commerce", 420, "?", 600],
            ["Services", "?", 350, "?"],
            ["Industrie", 60, 90, "?"],
            ["Total", 1530, "?", "?"],
          ]),
          correction:
            "1. Ligne « Commerce » : sociétés $600 - 420 = 180$.\n2. Ligne « Industrie » : total $60 + 90 = 150$.\n3. Colonne « Micro-entreprise » : services $1530 - 420 - 60 = 1050$.\n4. Ligne « Services » : total $1050 + 350 = 1400$.\n5. Colonne « Société » : $180 + 350 + 90 = 620$.\n6. Total général : $600 + 1400 + 150 = 2150$ par les lignes, $1530 + 620 = 2150$ par les colonnes.\nb) La marge de la colonne « Société » : 620.\nc) 1050 micro-entreprises.\nd) 2150 entreprises.\n⛔ Le piège au 3. : oublier une ligne dans la soustraction. Je retire TOUTES les cases connues de la colonne.\nRéponse : a) 180, 150, 1050, 1400, 620, 2150 ; b) 620 ; c) 1050 ; d) 2150.",
          schema: ecranSeulement(
            croise(["", "Micro-entreprise", "Société", "Total"], [
              ["Commerce", 420, 180, 600],
              ["Services", 1050, 350, 1400],
              ["Industrie", 60, 90, 150],
              ["Total", 1530, 620, 2150],
            ]),
          ),
          micros: ["don_tab_completer", "don_tab_marges"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation de gestion, plusieurs étapes. Je dresse ou je complète le tableau, je le contrôle, puis je m'en sers pour calculer et décider.",
      rappel: [
        "Je place d'abord les nombres donnés : une marge (« en tout ») ou une case (« dont », « parmi »).",
        "Je complète ligne par ligne ou colonne par colonne, là où il ne manque qu'un nombre, et je contrôle le total.",
        "Une recette se calcule case par case : prix × nombre, puis on additionne.",
      ],
      exercices: [
        {
          titre: "La billetterie du festival",
          enonce:
            "Le chargé de billetterie d'un festival de musique de deux jours fait ses comptes (modèle). 5000 billets ont été vendus, dont 2800 pour le samedi. 1500 billets sont à tarif réduit, dont 900 pour le samedi. Le billet plein tarif coûte 50 €, le billet réduit 30 €.\na) Dresse le tableau croisé jour × tarif, marges comprises.\nb) Combien de billets plein tarif ont été vendus pour le dimanche ?\nc) Calcule la recette du dimanche.\nd) Calcule la recette totale du festival.",
          correction:
            "a) Les nombres donnés : total 5000 ; marge « Samedi » 2800 ; marge « Réduit » 1500 ; case « Samedi » et « Réduit » 900.\nDimanche : $5000 - 2800 = 2200$ billets. Plein tarif : $5000 - 1500 = 3500$ billets.\nSamedi plein tarif : $2800 - 900 = 1900$. Dimanche réduit : $1500 - 900 = 600$.\nDimanche plein tarif : $2200 - 600 = 1600$. Contrôle par la colonne : $1900 + 1600 = 3500$.\nb) 1600 billets.\nc) $1600 \\times 50 + 600 \\times 30 = 80\\,000 + 18\\,000 = 98\\,000$ €.\nd) $3500 \\times 50 + 1500 \\times 30 = 175\\,000 + 45\\,000 = 220\\,000$ €.\n⛔ Le piège au c) : multiplier les 2200 billets du dimanche par 50 €. Les billets réduits ne rapportent que 30 € : je calcule case par case.\nRéponse : a) le tableau ci-dessous ; b) 1600 ; c) $98\\,000$ € ; d) $220\\,000$ €.",
          schema: ecranSeulement(
            croise(["", "Plein tarif", "Réduit", "Total"], [
              ["Samedi", 1900, 900, 2800],
              ["Dimanche", 1600, 600, 2200],
              ["Total", 3500, 1500, 5000],
            ]),
          ),
          micros: ["don_tab_dresser", "don_tab_marges"],
        },
        {
          titre: "La flotte de véhicules",
          enonce:
            "La gestionnaire de flotte d'une entreprise suit ses 80 véhicules (modèle), par motorisation et par usage. Elle sait aussi que, parmi les véhicules électriques, il y a deux fois plus de véhicules commerciaux que de véhicules de livraison.\na) Complète le tableau.\nb) Combien de véhicules diesel servent aux commerciaux ?\nc) L'an prochain, chaque diesel de livraison sera remplacé par un électrique. Combien l'entreprise aura-t-elle de véhicules électriques ?\nd) Combien de diesels restera-t-il alors ?",
          figure: croise(["", "Commercial", "Livraison", "Total"], [
            ["Essence", 14, "?", 20],
            ["Diesel", "?", 26, "?"],
            ["Électrique", "?", "?", 18],
            ["Total", 42, "?", 80],
          ]),
          correction:
            "1. Ligne « Essence » : livraison $20 - 14 = 6$.\n2. Ligne « Électrique » : 18 véhicules, deux fois plus de commerciaux, soit 3 parts. $18 \\div 3 = 6$ de livraison, $2 \\times 6 = 12$ commerciaux.\n3. Colonne « Total » : diesels $80 - 20 - 18 = 42$. Ligne « Diesel » : commerciaux $42 - 26 = 16$.\n4. Colonne « Livraison » : $6 + 26 + 6 = 38$. Contrôle : $14 + 16 + 12 = 42$, et $42 + 38 = 80$.\nb) 16 diesels commerciaux.\nc) Les 26 diesels de livraison deviennent électriques : $18 + 26 = 44$ véhicules électriques.\nd) Il reste les diesels commerciaux : 16.\n⛔ Le piège au 2. : partager 18 en deux. « Deux fois plus » fait 3 parts : une pour la livraison, deux pour les commerciaux.\nRéponse : a) 6, 16, 42, 12, 6, 38 ; b) 16 ; c) 44 ; d) 16.",
          micros: ["don_tab_completer"],
        },
        {
          titre: "La coopérative fruitière",
          enonce:
            "La responsable qualité d'une coopérative agricole classe les cagettes de fruits reçues en une semaine (modèle). Une cagette se vend 18 € en catégorie Extra, 12 € en catégorie I et 7 € en catégorie II.\na) Complète le tableau.\nb) Combien de cagettes de catégorie I la coopérative a-t-elle reçues ?\nc) Calcule ce que rapportent les cagettes de pommes.\nd) Calcule ce que rapportent toutes les cagettes de la semaine.",
          figure: croise(["", "Extra", "Catégorie I", "Catégorie II", "Total"], [
            ["Pommes", 120, "?", 80, 500],
            ["Poires", "?", 150, "?", 260],
            ["Total", 160, "?", "?", "?"],
          ]),
          correction:
            "1. Ligne « Pommes » : catégorie I $500 - 120 - 80 = 300$.\n2. Colonne « Extra » : poires $160 - 120 = 40$.\n3. Ligne « Poires » : catégorie II $260 - 40 - 150 = 70$.\n4. Les marges : catégorie I $300 + 150 = 450$ ; catégorie II $80 + 70 = 150$ ; total $500 + 260 = 760$.\nContrôle : $160 + 450 + 150 = 760$.\nb) La marge « Catégorie I » : 450 cagettes.\nc) $120 \\times 18 + 300 \\times 12 + 80 \\times 7 = 2160 + 3600 + 560 = 6320$ €.\nd) $160 \\times 18 + 450 \\times 12 + 150 \\times 7 = 2880 + 5400 + 1050 = 9330$ €.\n⛔ Le piège au d) : multiplier les 760 cagettes par un seul prix. Chaque catégorie a son prix : je calcule colonne par colonne.\nRéponse : a) 300, 40, 70, 450, 150, 760 ; b) 450 ; c) 6320 € ; d) 9330 €.",
          micros: ["don_tab_completer", "don_tab_marges"],
        },
        {
          titre: "Le restaurant d'entreprise",
          enonce:
            "Le gérant d'un restaurant d'entreprise a servi 240 repas lundi (modèle) : 100 avec de la viande, 60 avec du poisson, les autres végétariens. 150 repas ont été pris avec un dessert, dont 70 avec de la viande et 35 avec du poisson.\na) Dresse le tableau croisé plat × dessert, marges comprises.\nb) Combien de repas végétariens ont été pris sans dessert ?\nc) Le gérant prévoit les mêmes repas chacun des 5 jours de la semaine. Combien de repas végétariens sans dessert doit-il prévoir pour la semaine ?",
          correction:
            "a) Végétariens : $240 - 100 - 60 = 80$. Sans dessert : $240 - 150 = 90$.\nViande sans dessert : $100 - 70 = 30$. Poisson sans dessert : $60 - 35 = 25$.\nVégétarien avec dessert : $150 - 70 - 35 = 45$. Végétarien sans dessert : $80 - 45 = 35$.\nContrôle par la colonne : $30 + 25 + 35 = 90$. Le compte est bon.\nb) 35 repas végétariens sans dessert.\nc) $5 \\times 35 = 175$ repas.\n⛔ Le piège au a) : oublier les végétariens, qui ne sont pas donnés. « Les autres » se trouvent par soustraction.\nRéponse : a) le tableau ci-dessous ; b) 35 ; c) 175 repas.",
          schema: ecranSeulement(
            croise(["", "Avec dessert", "Sans dessert", "Total"], [
              ["Viande", 70, 30, 100],
              ["Poisson", 35, 25, 60],
              ["Végétarien", 45, 35, 80],
              ["Total", 150, 90, 240],
            ]),
          ),
          micros: ["don_tab_dresser"],
        },
      ],
    },
  ],
};
