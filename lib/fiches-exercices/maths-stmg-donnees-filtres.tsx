// ─── Fiche d'exercices : filtrer des données, ET, OU, NON (STMG) — 20 exercices ─
//
// Troisième feuille « données » de STMG (22/10/2026), sœur de
// `maths-stmg-donnees-tableau-croise.tsx` (mêmes dessins, `figures-donnees.tsx`).
// Alignée sur la banque `lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts`,
// notion donnees_filtres : le sous-ensemble qui répond à un critère, le filtre
// ET (les deux à la fois), le filtre OU (l'un au moins, NON exclusif), le filtre
// NON (le contraire). Deux supports, comme au lycée : l'extrait de TABLEUR (une
// ligne par individu, on filtre une colonne) et le tableau croisé d'effectifs.
//
// ⭐⭐ LE FIL : ET est une CASE ; OU additionne une ligne et une colonne, puis
// RETIRE la case commune, comptée deux fois ; NON est le total moins le reste.
// Et « au moins 5 » ou « ≥ 5 » garde le 5, « > 20 » ne garde pas le 20.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 9 — les 8 planètes : type, anneaux (les 4 géantes en ont), demi-grand
//     axe en unités astronomiques (IMCCE : 0,39 ; 0,72 ; 1 ; 1,52 ; 5,20 ; 9,54 ;
//     19,19 ; 30,07), arrondi au dixième ;
//   · ex. 10 — les 13 régions de France métropolitaine, leur façade maritime et
//     leur nombre de départements (INSEE, code officiel géographique) ;
//   · ex. 11 — les quatre spécialités de terminale STMG (gestion et finance,
//     mercatique, ressources humaines et communication, systèmes d'information
//     de gestion) ; effectifs : modèle ;
//   · ex. 16 — le calendrier 2026 : jours et jours de week-end de chaque mois
//     (le 1er janvier 2026 est un jeudi).
// Le reste est un MODÈLE, et l'énoncé le dit. Les titres de livres (ex. 7) sont
// réels, leurs emprunts inventés.
// Domaines et métiers, un par exercice : ressources humaines (assistante RH),
// épicerie fine (gérant), cinéma (directrice), salle de sport (gérant), voyage
// (conseillère), location (agent immobilier), bibliothèque (bibliothécaire),
// nutrition (diététicienne), astronomie (animatrice de club), aménagement du
// territoire (chargée de mission), orientation (psychologue de l'Éducation
// nationale), banque (analyste anti-fraude), réseaux sociaux (community
// manager), agroalimentaire (responsable qualité), course à pied
// (organisatrice de trail), escalade (responsable de salle), commerce
// (chargée de fidélisation), parc d'attractions (recruteur), aéroport (agente
// d'escale), pharmacie (pharmacien).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-donnees-filtres.mjs`
// (chaque filtre est REJOUÉ ligne par ligne sur l'extrait de tableur relu dans
// `grille(…)`, chaque OU refait par le contraire).
//
// Micro-compétences : don_filtre_sous_ensemble (1, 2, 9, 10, 16, 17),
// don_filtre_et (3, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// don_filtre_ou (4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// don_filtre_non (5, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { croise, ecranSeulement, grille } from "@/lib/fiches-exercices/figures-donnees";

export const exercicesDonneesFiltresStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "donnees-filtres",
  titre: "Filtrer des données : ET, OU, NON",
  accroche:
    "Vingt exercices pour filtrer des données comme dans un tableur : garder les lignes qui répondent à un critère, combiner deux critères avec ET, avec OU, prendre le contraire avec NON, sur un extrait de fichier ou sur un tableau croisé. Fichier du personnel, rayon d'une épicerie, logements à louer, transactions bancaires, fichier clients ; et des données réelles : les planètes, les régions de France, le calendrier 2026. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un filtre par question : je garde les lignes qui répondent au critère, puis je les compte.",
      rappel: [
        "Un FILTRE garde les individus qui répondent à un critère : « Service = Commercial », « Prix > 20 ».",
        "« ≥ 5 » et « au moins 5 » gardent le 5 ; « > 20 » et « plus de 20 » ne gardent pas le 20.",
        "A ET B : les deux à la fois. A OU B : l'un au moins, les deux compris. NON A : tous ceux qui ne sont pas A.",
        "Dans un tableau croisé : A ET B est une case ; A OU B = marge de A + marge de B − la case commune.",
      ],
      exercices: [
        {
          enonce:
            "Une assistante RH extrait du fichier du personnel les 10 salariés d'une agence (modèle). L'ancienneté est en années.\na) Applique le filtre « Service = Commercial ». Quels salariés restent ? Combien sont-ils ?\nb) Applique le filtre « Ancienneté ≥ 5 ». Combien de salariés restent ?\nc) Applique le filtre « Télétravail = oui ». Combien de salariés restent ?",
          figure: grille(["Nom", "Service", "Ancienneté", "Télétravail"], [
            ["Alice", "Commercial", 3, "oui"],
            ["Bruno", "Comptabilité", 12, "non"],
            ["Chloé", "Commercial", 7, "non"],
            ["David", "Logistique", 1, "non"],
            ["Emma", "Commercial", 15, "oui"],
            ["Farid", "Comptabilité", 5, "oui"],
            ["Gaëlle", "Logistique", 9, "non"],
            ["Hugo", "Commercial", 2, "oui"],
            ["Inès", "Comptabilité", 4, "non"],
            ["Jules", "Logistique", 6, "oui"],
          ]),
          correction:
            "Je lis la colonne du critère, ligne par ligne, et je coche les lignes gardées.\na) Colonne « Service » : Alice, Chloé, Emma et Hugo. 4 salariés.\nb) Colonne « Ancienneté », 5 compris : Bruno, Chloé, Emma, Farid, Gaëlle et Jules. 6 salariés.\nc) Colonne « Télétravail » : Alice, Emma, Farid, Hugo et Jules. 5 salariés.\n⛔ Le piège au b) : oublier Farid. « ≥ 5 » se lit « supérieur OU ÉGAL à 5 » : ses 5 ans comptent.\nRéponse : a) Alice, Chloé, Emma et Hugo, 4 salariés ; b) 6 ; c) 5.",
          micros: ["don_filtre_sous_ensemble"],
        },
        {
          enonce:
            "Le gérant d'une épicerie fine prépare sa commande (modèle). Voici un extrait de son fichier de stock.\na) Applique le filtre « Prix > 20 ». Quels produits restent ?\nb) Applique le filtre « Stock ≤ 5 ». Combien de produits restent ?\nc) Les produits en rupture ont un stock nul. Lesquels ?",
          figure: grille(["Produit", "Prix (€)", "Stock"], [
            ["Café en grains", 12.9, 14],
            ["Thé vert", 6.5, 3],
            ["Miel", 9.8, 0],
            ["Huile d'olive", 24, 7],
            ["Chocolat noir", 3.2, 25],
            ["Confiture", 4.5, 5],
            ["Foie gras", 39.9, 2],
            ["Champagne", 32, 12],
            ["Biscuits", 2.8, 40],
            ["Vinaigre balsamique", 20, 4],
          ]),
          correction:
            "a) Colonne « Prix », strictement plus de 20 € : huile d'olive, foie gras et champagne. 3 produits.\nb) Colonne « Stock », 5 compris : thé vert, miel, confiture, foie gras et vinaigre balsamique. 5 produits.\nc) Stock égal à 0 : le miel seulement.\n⛔ Le piège au a) : garder le vinaigre balsamique, à 20 € pile. « > 20 » ne garde pas le 20.\nRéponse : a) huile d'olive, foie gras et champagne ; b) 5 ; c) le miel.",
          micros: ["don_filtre_sous_ensemble"],
        },
        {
          enonce:
            "La directrice d'un cinéma étudie les 600 entrées d'un samedi (modèle), par âge et par abonnement.\na) Combien de spectateurs répondent au filtre « Moins de 26 ans ET Abonné » ?\nb) Au filtre « 26 ans et plus ET Non abonné » ?\nc) Pourquoi un filtre ET se lit-il dans une seule case ?",
          figure: croise(["", "Abonné", "Non abonné", "Total"], [
            ["Moins de 26 ans", 85, 140, 225],
            ["26 ans et plus", 120, 255, 375],
            ["Total", 205, 395, 600],
          ]),
          correction:
            "a) ET : les deux critères à la fois. Ligne « Moins de 26 ans », colonne « Abonné » : 85 spectateurs.\nb) Ligne « 26 ans et plus », colonne « Non abonné » : 255 spectateurs.\nc) Une case compte les individus qui sont dans sa ligne ET dans sa colonne : c'est exactement le filtre ET.\n⛔ Le piège : lire 205, la marge des abonnés. Elle compte aussi les 26 ans et plus.\nRéponse : a) 85 ; b) 255 ; c) une case croise les deux critères.",
          micros: ["don_filtre_et"],
        },
        {
          enonce:
            "Le gérant d'une salle de sport étudie ses 400 adhérents (modèle), par formule et par ancienneté.\na) Combien d'adhérents répondent au filtre « Formule premium OU Inscrit depuis plus d'un an » ?\nb) Vérifie ta réponse en comptant ceux qui ne répondent pas au filtre.\nc) Combien répondent au filtre « Formule simple OU Inscrit cette année » ?",
          figure: croise(["", "Formule premium", "Formule simple", "Total"], [
            ["Plus d'un an", 70, 110, 180],
            ["Cette année", 50, 170, 220],
            ["Total", 120, 280, 400],
          ]),
          correction:
            "a) OU : l'un des deux critères au moins. J'additionne la marge « Formule premium » et la marge « Plus d'un an », puis je retire la case commune, comptée deux fois : $120 + 180 - 70 = 230$ adhérents.\nb) Ne répondent pas au filtre : ni premium, ni plus d'un an, la case « Cette année » et « Formule simple », 170. Et $400 - 170 = 230$. Les deux chemins donnent 230.\nc) $280 + 220 - 170 = 330$ adhérents.\n⛔ Le piège : $120 + 180 = 300$. Les 70 adhérents premium inscrits depuis plus d'un an seraient comptés deux fois.\nRéponse : a) 230 ; b) $400 - 170 = 230$ ; c) 330.",
          micros: ["don_filtre_ou"],
        },
        {
          enonce:
            "Une conseillère d'une agence de voyages étudie les 300 réservations de l'année (modèle), par destination et par saison.\na) Combien de réservations répondent au filtre « NON (Destination = France) » ?\nb) Au filtre « NON (Saison = été) » ?\nc) Au filtre « NON (Hors Europe) ET Saison = hiver » ?",
          figure: croise(["", "Été", "Hiver", "Total"], [
            ["France", 90, 40, 130],
            ["Europe hors France", 70, 30, 100],
            ["Hors Europe", 50, 20, 70],
            ["Total", 210, 90, 300],
          ]),
          correction:
            "NON A : tous ceux qui ne sont pas A. Je retire A du total.\na) $300 - 130 = 170$ réservations. Contrôle : $100 + 70 = 170$, les deux autres lignes.\nb) Ne pas être en été, ici, c'est être en hiver : $300 - 210 = 90$ réservations.\nc) NON (Hors Europe) : les lignes « France » et « Europe hors France ». En hiver : $40 + 30 = 70$ réservations.\n⛔ Le piège au a) : répondre 100, la seule ligne « Europe hors France ». Le contraire de « France » compte aussi le hors Europe.\nRéponse : a) 170 ; b) 90 ; c) 70.",
          micros: ["don_filtre_non"],
        },
        {
          enonce:
            "Un agent immobilier cherche un logement pour une étudiante (modèle). Elle veut au moins 30 m² et un loyer de 700 € au plus.\na) Applique le filtre « Surface ≥ 30 ET Loyer ≤ 700 ». Quels logements restent ?\nb) Elle ajoute un troisième critère : « Ville = Lyon ». Que reste-t-il ?",
          figure: grille(["Logement", "Ville", "Surface (m²)", "Loyer (€)"], [
            ["L1", "Lyon", 28, 650],
            ["L2", "Lyon", 35, 720],
            ["L3", "Villeurbanne", 42, 690],
            ["L4", "Lyon", 30, 700],
            ["L5", "Villeurbanne", 25, 540],
            ["L6", "Lyon", 55, 980],
            ["L7", "Villeurbanne", 31, 610],
            ["L8", "Lyon", 38, 760],
          ]),
          correction:
            "a) ET : je garde une ligne seulement si les DEUX critères sont vrais.\nSurface ≥ 30 : L2, L3, L4, L6, L7 et L8. Parmi eux, loyer ≤ 700 : L3, L4 et L7. 3 logements.\nb) Parmi L3, L4 et L7, ceux de Lyon : L4 seulement.\n⛔ Le piège : écarter L4, à 30 m² et 700 € pile. « Au moins » et « au plus » gardent la valeur limite.\nRéponse : a) L3, L4 et L7 ; b) L4.",
          micros: ["don_filtre_et"],
        },
        {
          enonce:
            "Un bibliothécaire prépare une vitrine (modèle) : il veut les bandes dessinées et les livres très empruntés. Voici un extrait de son fichier, avec le nombre d'emprunts de l'année.\na) Applique le filtre « Genre = BD OU Emprunts ≥ 20 ». Combien de livres restent ?\nb) Combien de livres répondent à « Genre = BD ET Emprunts ≥ 20 » ?",
          figure: grille(["Livre", "Genre", "Emprunts"], [
            ["Astérix", "BD", 34],
            ["Le Petit Prince", "Roman", 21],
            ["Persepolis", "BD", 12],
            ["Harry Potter", "Roman", 45],
            ["L'Étranger", "Roman", 8],
            ["Tintin", "BD", 27],
            ["Les Misérables", "Roman", 15],
            ["Maus", "BD", 9],
            ["Dune", "Roman", 19],
            ["Blacksad", "BD", 6],
          ]),
          correction:
            "a) OU : je garde une ligne dès qu'UN critère est vrai.\nGenre = BD : Astérix, Persepolis, Tintin, Maus et Blacksad, soit 5.\nEmprunts ≥ 20 : Astérix, Le Petit Prince, Harry Potter et Tintin, soit 4.\nAstérix et Tintin sont dans les deux listes : je ne les compte qu'une fois. $5 + 4 - 2 = 7$ livres.\nb) Les deux critères à la fois : Astérix et Tintin, 2 livres.\n⛔ Le piège au a) : répondre 9. Un livre qui vérifie les deux critères ne va qu'une fois dans la vitrine.\nRéponse : a) 7 ; b) 2.",
          micros: ["don_filtre_ou", "don_filtre_et"],
        },
        {
          enonce:
            "Une diététicienne suit 120 patients (modèle). 50 font du sport chaque semaine, 30 suivent un régime, et 12 font les deux.\na) Combien de patients répondent au filtre « Sport OU Régime » ?\nb) Au filtre « NON (Sport OU Régime) » ?\nc) Au filtre « Régime ET NON Sport » ?",
          correction:
            "a) $50 + 30 - 12 = 68$ patients : les 12 qui font les deux ne comptent qu'une fois.\nb) Le contraire de « sport OU régime » : ni sport, ni régime. $120 - 68 = 52$ patients.\nc) Les patients au régime, sauf ceux qui font aussi du sport : $30 - 12 = 18$.\n⭐ Le tableau croisé ci-dessous range tout : la case « Pas de sport » et « Pas de régime » est bien 52.\n⛔ Le piège au b) : calculer « NON sport OU NON régime ». Le contraire de « A OU B » est « NI A NI B » : ni l'un, ni l'autre.\nRéponse : a) 68 ; b) 52 ; c) 18.",
          schema: ecranSeulement(
            croise(["", "Régime", "Pas de régime", "Total"], [
              ["Sport", 12, 38, 50],
              ["Pas de sport", 18, 52, 70],
              ["Total", 30, 90, 120],
            ]),
          ),
          micros: ["don_filtre_ou", "don_filtre_non"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs filtres sur les mêmes données. J'écris la liste ou le calcul, puis je contrôle par le contraire.",
      rappel: [
        "ET : je garde la ligne si les deux critères sont vrais. OU : si l'un au moins est vrai.",
        "Contrôle d'un OU : total − (ceux qui ne vérifient AUCUN des deux critères).",
        "Le contraire de « A ET B » est « NON A OU NON B » ; le contraire de « A OU B » est « ni A ni B ».",
      ],
      exercices: [
        {
          enonce:
            "L'animatrice d'un club d'astronomie fait trier les 8 planètes du Système solaire. La distance est la distance moyenne au Soleil, en unités astronomiques (UA) : 1 UA est la distance Terre-Soleil.\na) Applique le filtre « Anneaux = oui ET Distance < 10 ». Quelles planètes restent ?\nb) Applique le filtre « Type = tellurique OU Distance > 15 ». Combien de planètes restent ?\nc) Applique le filtre « NON (Anneaux = oui) ». Que remarques-tu ?",
          figure: grille(["Planète", "Type", "Anneaux", "Distance (UA)"], [
            ["Mercure", "tellurique", "non", 0.4],
            ["Vénus", "tellurique", "non", 0.7],
            ["Terre", "tellurique", "non", 1],
            ["Mars", "tellurique", "non", 1.5],
            ["Jupiter", "géante", "oui", 5.2],
            ["Saturne", "géante", "oui", 9.5],
            ["Uranus", "géante", "oui", 19.2],
            ["Neptune", "géante", "oui", 30.1],
          ]),
          correction:
            "a) Anneaux : Jupiter, Saturne, Uranus et Neptune. Parmi elles, à moins de 10 UA : Jupiter et Saturne. 2 planètes.\nb) Telluriques : Mercure, Vénus, la Terre et Mars, soit 4. À plus de 15 UA : Uranus et Neptune, soit 2. Aucune planète n'est dans les deux listes : $4 + 2 - 0 = 6$ planètes.\nc) Sans anneaux : Mercure, Vénus, la Terre et Mars, soit 4 planètes. Ce sont exactement les telluriques : ici, « NON (Anneaux = oui) » et « Type = tellurique » donnent le même sous-ensemble.\n⛔ Le piège au a) : garder les quatre géantes. ET demande aussi la distance : Uranus et Neptune sont trop loin.\nRéponse : a) Jupiter et Saturne ; b) 6 ; c) 4 planètes, les telluriques.",
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non", "don_filtre_sous_ensemble"],
        },
        {
          enonce:
            "Une chargée d'aménagement du territoire étudie les 13 régions de France métropolitaine : ont-elles une façade maritime, et combien de départements comptent-elles ?\na) Applique le filtre « Façade = oui ET Départements ≥ 10 ». Quelles régions restent ?\nb) Combien de régions répondent au filtre « Départements ≥ 10 OU Façade = non » ?\nc) Combien répondent au filtre « NON (Façade = oui) » ? Combien de départements comptent-elles en tout ?",
          figure: grille(["Région", "Façade", "Départements"], [
            ["Auvergne-Rhône-Alpes", "non", 12],
            ["Bourgogne-Franche-Comté", "non", 8],
            ["Bretagne", "oui", 4],
            ["Centre-Val de Loire", "non", 6],
            ["Corse", "oui", 2],
            ["Grand Est", "non", 10],
            ["Hauts-de-France", "oui", 5],
            ["Île-de-France", "non", 8],
            ["Normandie", "oui", 5],
            ["Nouvelle-Aquitaine", "oui", 12],
            ["Occitanie", "oui", 13],
            ["Pays de la Loire", "oui", 5],
            ["Provence-Alpes-Côte d'Azur", "oui", 6],
          ]),
          correction:
            "a) Au moins 10 départements : Auvergne-Rhône-Alpes, Grand Est, Nouvelle-Aquitaine et Occitanie. Parmi elles, avec une façade : Nouvelle-Aquitaine et Occitanie.\nb) Au moins 10 départements : 4 régions. Sans façade : Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Centre-Val de Loire, Grand Est et Île-de-France, soit 5. Dans les deux listes : Auvergne-Rhône-Alpes et Grand Est. $4 + 5 - 2 = 7$ régions.\nc) Les 5 régions sans façade. Leurs départements : $12 + 8 + 6 + 10 + 8 = 44$.\n⛔ Le piège au b) : répondre 9, en comptant deux fois Auvergne-Rhône-Alpes et le Grand Est.\nRéponse : a) Nouvelle-Aquitaine et Occitanie ; b) 7 ; c) 5 régions, 44 départements.",
          micros: ["don_filtre_sous_ensemble", "don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          enonce:
            "Une psychologue de l'Éducation nationale prépare l'orientation de 360 élèves de 1re STMG (modèle) : quelle spécialité de terminale demandent-ils ?\na) Combien d'élèves répondent au filtre « Fille ET Mercatique » ?\nb) Au filtre « RH et communication OU Fille » ?\nc) Au filtre « NON (Gestion et finance) » ?\nd) Au filtre « Garçon ET NON (Systèmes d'information) » ?",
          figure: croise(["", "Filles", "Garçons", "Total"], [
            ["Gestion et finance", 38, 52, 90],
            ["Mercatique", 64, 46, 110],
            ["RH et communication", 72, 28, 100],
            ["Systèmes d'information", 16, 44, 60],
            ["Total", 190, 170, 360],
          ]),
          correction:
            "a) ET : une case. Ligne « Mercatique », colonne « Filles » : 64 élèves.\nb) OU : marge de la ligne + marge de la colonne − la case commune « RH et communication » et « Filles » : $100 + 190 - 72 = 218$ élèves.\nc) $360 - 90 = 270$ élèves.\nd) Les garçons, sauf ceux de « Systèmes d'information » : $170 - 44 = 126$ élèves.\nContrôle du b) par le contraire : ni RH, ni fille, ce sont les garçons des trois autres spécialités, $52 + 46 + 44 = 142$, et $360 - 142 = 218$.\n⛔ Le piège au b) : oublier de retirer les 72 filles de RH et communication, comptées dans la ligne et dans la colonne.\nRéponse : a) 64 ; b) 218 ; c) 270 ; d) 126.",
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          enonce:
            "Une analyste anti-fraude d'une banque relève 10 paiements par carte d'un même client (modèle).\na) Applique le filtre « Montant > 500 ET Pays ≠ France ». Quels paiements restent ?\nb) Combien de paiements répondent au filtre « En ligne = oui OU Montant > 1000 » ?\nc) Combien répondent au filtre « NON (En ligne = oui) » ?",
          figure: grille(["N°", "Montant (€)", "Pays", "En ligne"], [
            [1, 45, "France", "oui"],
            [2, 820, "Espagne", "non"],
            [3, 1250, "France", "oui"],
            [4, 60, "Italie", "oui"],
            [5, 530, "Brésil", "oui"],
            [6, 2100, "France", "non"],
            [7, 75, "France", "non"],
            [8, 640, "France", "oui"],
            [9, 1500, "Japon", "non"],
            [10, 300, "Espagne", "oui"],
          ]),
          correction:
            "a) Plus de 500 € : les n° 2, 3, 5, 6, 8 et 9. Parmi eux, hors de France : les n° 2, 5 et 9. 3 paiements.\nb) En ligne : les n° 1, 3, 4, 5, 8 et 10, soit 6. Plus de 1000 € : les n° 3, 6 et 9, soit 3. Le n° 3 est dans les deux listes. $6 + 3 - 1 = 8$ paiements.\nc) Pas en ligne : les n° 2, 6, 7 et 9. 4 paiements.\nContrôle du b) : ne répondent pas au filtre les paiements ni en ligne ni au-dessus de 1000 €, les n° 2 et 7. $10 - 2 = 8$.\n⛔ Le piège au b) : compter deux fois le n° 3, en ligne et à 1250 €.\nRéponse : a) les n° 2, 5 et 9 ; b) 8 ; c) 4.",
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          enonce:
            "Une community manager a interrogé 500 jeunes de 15 à 24 ans (modèle) : utilisent-ils Instagram, TikTok ?\na) Combien répondent au filtre « Instagram ET TikTok » ?\nb) Au filtre « Instagram OU TikTok » ? Vérifie par le contraire.\nc) Un stagiaire trouve 550 pour le b). Pourquoi est-ce impossible ?\nd) Combien utilisent exactement un des deux réseaux ?",
          figure: croise(["", "TikTok", "Pas TikTok", "Total"], [
            ["Instagram", 180, 120, 300],
            ["Pas Instagram", 70, 130, 200],
            ["Total", 250, 250, 500],
          ]),
          correction:
            "a) La case « Instagram » et « TikTok » : 180 jeunes.\nb) $300 + 250 - 180 = 370$ jeunes. Le contraire : ni Instagram, ni TikTok, la case 130. $500 - 130 = 370$.\nc) 550 dépasse les 500 jeunes interrogés : le stagiaire a fait $300 + 250$ sans retirer les 180 qui utilisent les deux.\nd) Instagram sans TikTok, 120, plus TikTok sans Instagram, 70 : $120 + 70 = 190$. Autre chemin : $370 - 180 = 190$.\n⛔ Le piège : un OU plus grand que le total. C'est le signe qu'on a compté deux fois la case commune.\nRéponse : a) 180 ; b) 370 ; c) on ne peut pas dépasser 500 ; d) 190.",
          micros: ["don_filtre_et", "don_filtre_ou"],
        },
        {
          enonce:
            "La responsable qualité d'une usine de yaourts contrôle 800 pots (modèle). 30 ont un défaut d'étiquette, 20 un défaut de poids, et 8 ont les deux défauts.\na) Combien de pots répondent au filtre « Étiquette fausse OU Poids faux » ?\nb) Combien de pots sont conformes, c'est-à-dire sans aucun défaut ?\nc) Combien de pots ont exactement un défaut ?\nd) Combien répondent au filtre « Étiquette fausse ET NON Poids faux » ?",
          correction:
            "a) $30 + 20 - 8 = 42$ pots ont au moins un défaut.\nb) Conformes : NON (étiquette fausse OU poids faux). $800 - 42 = 758$ pots.\nc) Au moins un défaut, sauf les deux à la fois : $42 - 8 = 34$ pots.\nd) Les étiquettes fausses, sauf celles qui ont aussi un poids faux : $30 - 8 = 22$ pots.\n⛔ Le piège au b) : retirer 30 et 20 du total, $800 - 50 = 750$. Les 8 pots aux deux défauts seraient retirés deux fois.\nRéponse : a) 42 ; b) 758 ; c) 34 ; d) 22.",
          schema: ecranSeulement(
            croise(["", "Poids faux", "Poids juste", "Total"], [
              ["Étiquette fausse", 8, 22, 30],
              ["Étiquette juste", 12, 758, 770],
              ["Total", 20, 780, 800],
            ]),
          ),
          micros: ["don_filtre_ou", "don_filtre_non", "don_filtre_et"],
        },
        {
          enonce:
            "L'organisatrice d'un trail a 250 inscrits (modèle) : 140 hommes et 110 femmes. 90 inscrits sont licenciés dans un club, dont 60 hommes.\na) Combien de femmes ne sont pas licenciées ?\nb) Combien d'inscrits répondent au filtre « Homme OU Licencié » ?\nc) Au filtre « NON (Homme ET Licencié) » ?",
          correction:
            "Je range d'abord les nombres dans un tableau croisé, sexe × licence.\na) Femmes licenciées : $90 - 60 = 30$. Femmes non licenciées : $110 - 30 = 80$.\nb) $140 + 90 - 60 = 170$ inscrits. Contrôle : le contraire, ce sont les femmes non licenciées, et $250 - 80 = 170$.\nc) Tous, sauf les 60 hommes licenciés : $250 - 60 = 190$ inscrits.\n⛔ Le piège au c) : confondre NON (homme ET licencié) avec « ni homme ni licencié ». Le contraire d'un ET garde tous ceux qui ratent AU MOINS un des deux critères.\nRéponse : a) 80 ; b) 170 ; c) 190.",
          schema: ecranSeulement(
            croise(["", "Licencié", "Non licencié", "Total"], [
              ["Hommes", 60, 80, 140],
              ["Femmes", 30, 80, 110],
              ["Total", 90, 160, 250],
            ]),
          ),
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          enonce:
            "Le responsable d'une salle d'escalade ouverte le week-end prépare les plannings de 2026. Le tableau donne, pour chaque mois, le nombre de jours et le nombre de jours de week-end (samedis et dimanches).\na) Applique le filtre « Jours = 31 ET Week-end = 9 ». Quels mois restent ?\nb) Combien de mois répondent au filtre « Jours = 30 OU Week-end ≥ 10 » ?\nc) Combien répondent au filtre « NON (Jours = 31) » ?\nd) Combien de jours de week-end compte l'année ?",
          figure: grille(["Mois", "Jours", "Week-end"], [
            ["Janvier", 31, 9],
            ["Février", 28, 8],
            ["Mars", 31, 9],
            ["Avril", 30, 8],
            ["Mai", 31, 10],
            ["Juin", 30, 8],
            ["Juillet", 31, 8],
            ["Août", 31, 10],
            ["Septembre", 30, 8],
            ["Octobre", 31, 9],
            ["Novembre", 30, 9],
            ["Décembre", 31, 8],
          ]),
          correction:
            "a) 31 jours : janvier, mars, mai, juillet, août, octobre et décembre. Parmi eux, 9 jours de week-end : janvier, mars et octobre.\nb) 30 jours : avril, juin, septembre et novembre, soit 4. Au moins 10 jours de week-end : mai et août, soit 2. Aucun mois dans les deux listes : $4 + 2 - 0 = 6$ mois.\nc) Pas 31 jours : février et les 4 mois de 30 jours. $12 - 7 = 5$ mois.\nd) $9 + 8 + 9 + 8 + 10 + 8 + 8 + 10 + 8 + 9 + 9 + 8 = 104$ jours.\n⛔ Le piège au c) : oublier février, qui n'a ni 31 ni 30 jours. NON (Jours = 31) le garde.\nRéponse : a) janvier, mars et octobre ; b) 6 ; c) 5 ; d) 104.",
          micros: ["don_filtre_sous_ensemble", "don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une décision de gestion, plusieurs filtres. Je traduis chaque critère, je filtre, je contrôle par le contraire, puis je conclus.",
      rappel: [
        "Je traduis la phrase en filtre : « sans carte et qui dépensent au moins 300 € » donne « Carte = non ET Achats ≥ 300 ».",
        "Pour un OU entre deux groupes, je retire une fois ceux qui sont dans les deux.",
        "Un tableau croisé range tous les cas à la fois : il donne chaque ET, chaque OU et chaque NON.",
      ],
      exercices: [
        {
          titre: "Le fichier clients",
          enonce:
            "La chargée de fidélisation d'un magasin de sport prépare deux campagnes à partir de son fichier clients (modèle). « Achats » est le montant dépensé dans l'année, « Carte » dit si le client a la carte de fidélité.\na) Campagne 1, un bon de 15 € pour les clients « Carte = non ET Achats ≥ 300 ». Quels clients le reçoivent ?\nb) Campagne 2, un SMS pour les clients « Âge < 30 OU Carte = oui ». Combien de SMS envoie-t-elle ?\nc) Combien de clients répondent au filtre « NON (Âge < 30) ET Carte = non » ?\nd) Si tous les bons de la campagne 1 sont utilisés, combien coûte-t-elle ?",
          figure: grille(["Client", "Âge", "Achats (€)", "Carte"], [
            ["C01", 24, 180, "oui"],
            ["C02", 41, 520, "non"],
            ["C03", 35, 310, "non"],
            ["C04", 19, 90, "non"],
            ["C05", 58, 760, "oui"],
            ["C06", 27, 300, "non"],
            ["C07", 66, 240, "oui"],
            ["C08", 33, 450, "oui"],
            ["C09", 22, 610, "non"],
            ["C10", 47, 150, "non"],
            ["C11", 29, 280, "oui"],
            ["C12", 52, 330, "non"],
          ]),
          correction:
            "a) Sans carte : C02, C03, C04, C06, C09, C10 et C12. Parmi eux, au moins 300 € : C02, C03, C06, C09 et C12. 5 clients.\nb) Moins de 30 ans : C01, C04, C06, C09 et C11, soit 5. Avec la carte : C01, C05, C07, C08 et C11, soit 5. C01 et C11 sont dans les deux listes. $5 + 5 - 2 = 8$ SMS.\nContrôle : ne reçoivent rien les clients de 30 ans ou plus sans carte, C02, C03, C10 et C12, et $12 - 4 = 8$.\nc) Ce sont justement ces 4 clients : C02, C03, C10 et C12.\nd) $5 \\times 15 = 75$ €.\n⛔ Le piège au a) : écarter C06, à 300 € pile. « Au moins 300 » garde le 300.\nRéponse : a) C02, C03, C06, C09 et C12 ; b) 8 SMS ; c) 4 ; d) 75 €.",
          micros: ["don_filtre_sous_ensemble", "don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          titre: "Les saisonniers du parc",
          enonce:
            "Le recruteur d'un parc d'attractions a reçu 200 candidatures pour l'été (modèle). 110 candidats parlent anglais, 60 ont le BAFA, et 35 ont les deux.\na) Le poste d'animateur demande l'anglais ET le BAFA. Combien de candidats peuvent l'occuper ?\nb) Le poste d'accueil demande l'anglais OU le BAFA. Combien de candidats ?\nc) Combien de candidats répondent au filtre « BAFA ET NON Anglais » ?\nd) Combien de candidats n'ont ni l'un ni l'autre ? Vérifie avec le b).",
          correction:
            "a) Les deux à la fois : 35 candidats.\nb) $110 + 60 - 35 = 135$ candidats.\nc) Les titulaires du BAFA, sauf ceux qui parlent aussi anglais : $60 - 35 = 25$ candidats.\nd) Anglais sans BAFA : $110 - 35 = 75$. Ni l'un ni l'autre : $200 - 35 - 75 - 25 = 65$ candidats.\nContrôle : $200 - 135 = 65$. Les deux chemins donnent 65.\n⛔ Le piège au b) : $110 + 60 = 170$. Les 35 candidats qui ont les deux seraient comptés deux fois.\nRéponse : a) 35 ; b) 135 ; c) 25 ; d) 65.",
          schema: ecranSeulement(
            croise(["", "BAFA", "Pas de BAFA", "Total"], [
              ["Anglais", 35, 75, 110],
              ["Pas d'anglais", 25, 65, 90],
              ["Total", 60, 140, 200],
            ]),
          ),
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          titre: "Les vols de l'aéroport",
          enonce:
            "Une agente d'escale fait le bilan d'une journée (modèle) : 240 vols, dont 90 internationaux. 36 vols ont eu du retard, dont 20 internationaux.\na) Combien de vols répondent au filtre « National ET À l'heure » ?\nb) Au filtre « International OU En retard » ?\nc) Au filtre « NON (En retard) » ?\nd) Au filtre « National OU À l'heure » ? Retrouve-le par le contraire.",
          correction:
            "Je range les nombres dans un tableau croisé, type de vol × ponctualité.\nVols nationaux : $240 - 90 = 150$. Retards nationaux : $36 - 20 = 16$.\na) $150 - 16 = 134$ vols.\nb) $90 + 36 - 20 = 106$ vols.\nc) $240 - 36 = 204$ vols.\nd) Le contraire de « National OU À l'heure » : international ET en retard, soit 20 vols. $240 - 20 = 220$ vols.\nAutre chemin : $150 + 204 - 134 = 220$.\n⛔ Le piège au d) : additionner 150 et 204, et dépasser les 240 vols. Les 134 vols nationaux à l'heure sont dans les deux groupes.\nRéponse : a) 134 ; b) 106 ; c) 204 ; d) 220.",
          schema: ecranSeulement(
            croise(["", "En retard", "À l'heure", "Total"], [
              ["International", 20, 70, 90],
              ["National", 16, 134, 150],
              ["Total", 36, 204, 240],
            ]),
          ),
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
        {
          titre: "Le stock de la pharmacie",
          enonce:
            "Un pharmacien fait l'inventaire de ses 500 références de médicaments (modèle). 320 se vendent sans ordonnance. 150 se conservent au réfrigérateur, dont 40 sans ordonnance.\na) Combien de références répondent au filtre « Avec ordonnance ET Au frais » ?\nb) Au filtre « Sans ordonnance ET NON (Au frais) » ?\nc) Au filtre « Avec ordonnance OU Au frais » ?\nd) Vérifie le c) par le contraire.",
          correction:
            "Avec ordonnance : $500 - 320 = 180$ références.\na) Au frais, sauf celles sans ordonnance : $150 - 40 = 110$ références.\nb) Sans ordonnance, sauf celles au frais : $320 - 40 = 280$ références.\nc) $180 + 150 - 110 = 220$ références.\nd) Le contraire de « Avec ordonnance OU Au frais » : sans ordonnance ET pas au frais, ce sont les 280 du b). $500 - 280 = 220$. Les deux chemins donnent 220.\n⛔ Le piège au a) : répondre 150. Parmi les 150 références au frais, 40 se vendent sans ordonnance : elles ne passent pas le filtre.\nRéponse : a) 110 ; b) 280 ; c) 220 ; d) $500 - 280 = 220$.",
          schema: ecranSeulement(
            croise(["", "Au frais", "Pas au frais", "Total"], [
              ["Sans ordonnance", 40, 280, 320],
              ["Avec ordonnance", 110, 70, 180],
              ["Total", 150, 350, 500],
            ]),
          ),
          micros: ["don_filtre_et", "don_filtre_ou", "don_filtre_non"],
        },
      ],
    },
  ],
};
