// ─── Fiche d'exercices : tableur, écrire une formule (STMG) — 20 exercices ──────
//
// Notion tableur_formules du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// lire une cellule (B3, jamais 3B), trouver l'adresse d'une valeur, calculer ce que
// renvoie une formule (+, −, × par un coefficient), traduire un coefficient en
// pourcentage, écrire la formule à recopier vers le bas (=B2*1,05 ou =B2+50) et vers
// la droite (=B2*B3). Les références absolues ($) sont dans la feuille « recopier
// et exploiter » : ici, aucune. Formules écrites comme dans un tableur français :
// virgule décimale, * et /. SOMME n'est pas demandée (le coach ne l'emploie pas),
// mais =SOMME(…) est acceptée au champ réponse. Le champ accepte aussi une formule
// sans « = » et les références mixtes justes (=$B2*1,05), sauf à l'ex. 16 a), dont
// le sujet est justement l'oubli du « = ».
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : feuilles nues (ex. 1 à 8) ; natation (entraîneuse),
// boulangerie (boulanger), hôtellerie (hôtelière), urbanisme (urbaniste), transport
// (chauffeur), pharmacie (pharmacienne), association sportive (trésorier),
// apiculture (apiculteur), gîte (propriétaire), forêt (technicien forestier),
// football (entraîneur), eau (agent du service des eaux).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs` (les
// formules y sont calculées sur les cellules, et leur recopie y est simulée).
//
// Micro-compétences : tab_lire (1, 2, 9, 15), tab_comprendre_formule (3, 4, 5, 6, 9,
// 10, 11, 13, 14, 16, 18), tab_ecrire_formule (7, 8, 10, 11, 12, 13, 14, 15, 16, 17,
// 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { avecEgal, bas, baisse, cellule, droite, feuille, formule, hausse, produit, somme } from "@/lib/fiches-exercices/stmg-algo-tableur-outils";

export const exercicesTableurFormulesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "tableur-formules",
  titre: "Tableur : écrire une formule",
  accroche:
    "Vingt exercices sur la feuille de calcul : lire une cellule, comprendre une formule comme =B2*1,05, écrire celle qu'on recopie vers le bas ou vers la droite. Une boulangerie, un hôtel, un club de foot, une forêt, une facture d'eau : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire une cellule, calculer une formule, ou écrire une formule courte.",
      rappel: [
        "Une cellule se nomme par sa colonne (une lettre), puis sa ligne (un nombre) : B3, jamais 3B.",
        "Une formule commence par = . Chaque référence est remplacée par le contenu de la cellule. * veut dire « fois », / veut dire « divisé par ».",
        "Multiplier par 1,03, c'est augmenter de 3 %. Multiplier par 0,97, c'est diminuer de 3 %.",
        "Pour recopier vers le bas, la formule utilise la cellule juste au-dessus : en B3, =B2*1,03.",
      ],
      exercices: [
        {
          enonce: "Quelle valeur contient la cellule B4 ?",
          figure: feuille([["Mois", "CA (€)"], ["Janvier", 420], ["Février", 380], ["Mars", 510], ["Avril", 460]]),
          reponses: [{ attendu: "510" }],
          correction:
            "On croise la colonne B et la ligne 4.\nLa ligne 4 est celle de mars : elle contient 510.\n⛔ Le piège : compter 4 lignes de données et lire 460. Les numéros sont ceux écrits à gauche, et la ligne 1 contient les titres.\nRéponse : 510.",
          micros: ["tab_lire"],
        },
        {
          enonce: "Dans quelle cellule se trouve la valeur 380 ?",
          figure: feuille([["Mois", "CA (€)"], ["Janvier", 420], ["Février", 380], ["Mars", 510]]),
          reponses: [{ attendu: cellule("B3"), exact: true }],
          correction:
            "La valeur 380 est dans la colonne B, sur la ligne 3.\nOn écrit d'abord la lettre, puis le nombre : B3.\n⛔ Le piège : écrire 3B. La colonne vient toujours en premier.\nRéponse : B3.",
          micros: ["tab_lire"],
        },
        {
          enonce: "Que renvoie la formule =B2+B3 ?",
          figure: feuille([["Trimestre", "Montant"], ["T1", 120], ["T2", 80]]),
          reponses: [{ attendu: "200" }],
          correction:
            "On remplace chaque référence par le contenu de sa cellule.\nB2 contient 120 et B3 contient 80 : $120 + 80 = 200$.\n⛔ Le piège : ajouter les numéros de lignes. B2 désigne un contenu, pas le nombre 2.\nRéponse : 200.",
          micros: ["tab_comprendre_formule"],
        },
        {
          enonce: "Que renvoie la formule =B4-B2 ?",
          figure: feuille([["Trimestre", "Montant"], ["T1", 150], ["T2", 210], ["T3", 300]]),
          reponses: [{ attendu: "150" }],
          correction:
            "B4 contient 300 et B2 contient 150.\n$300 - 150 = 150$.\n⛔ Le piège : calculer B2 − B4, ce qui donne −150. On lit la formule de gauche à droite.\nRéponse : 150.",
          micros: ["tab_comprendre_formule"],
        },
        {
          enonce: "La cellule B2 contient 200. Que renvoie la formule =B2*1,1 ?",
          reponses: [{ attendu: "220" }],
          correction:
            "On remplace B2 par 200 : $200 \\times 1{,}1 = 220$.\nC'est une hausse de 10 %.\n⛔ Le piège : calculer $200 + 1{,}1$. Le signe * veut dire « fois ».\nRéponse : 220.",
          micros: ["tab_comprendre_formule"],
        },
        {
          enonce:
            "Que calcule la formule =B2*0,8 ? Réponds par la lettre.\nA : B2 augmenté de 80 %.\nB : B2 diminué de 20 %.\nC : 20 % de B2.",
          reponses: [{ attendu: "B" }],
          correction:
            "Le coefficient 0,8 est plus petit que 1 : c'est une baisse.\nL'écart à 1 donne le taux : $1 - 0{,}8 = 0{,}2$, soit 20 %.\n⛔ Le piège : choisir C. Prendre seulement 20 % de B2 s'écrirait =B2*0,2.\nRéponse : B.",
          micros: ["tab_comprendre_formule"],
        },
        {
          enonce:
            "La cellule B2 contient une valeur initiale. Chaque année, la grandeur augmente de 5 %. Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ?",
          reponses: [{ attendu: bas(hausse("B2", 5)), exact: true }],
          correction:
            "On part de la cellule juste au-dessus, B2, et on multiplie par le coefficient de la hausse : 1,05.\nLa formule est =B2*1,05. Recopiée en B4, elle deviendra =B3*1,05.\nOn peut aussi écrire =B2+B2*0,05 : c'est le même calcul.\n⛔ Le piège : écrire =B3*1,05. La cellule se citerait elle-même : c'est une référence circulaire.\nRéponse : =B2*1,05.",
          micros: ["tab_ecrire_formule"],
        },
        {
          enonce:
            "La cellule B2 contient une valeur initiale. Chaque année, la grandeur augmente de 50 unités. Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ?",
          reponses: [{ attendu: bas(formule("=B2+50", "=50+B2")), exact: true }],
          correction:
            "Une hausse d'un nombre fixe d'unités est une addition.\nLa formule est =B2+50.\n⛔ Le piège : écrire =B2*50. La valeur serait multipliée par 50 à chaque ligne.\nRéponse : =B2+50.",
          micros: ["tab_ecrire_formule"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une feuille de calcul à lire, plusieurs questions : on lit, on calcule, on écrit la formule.",
      rappel: [
        "Recopier vers le bas : le numéro de ligne augmente, B2 devient B3. Recopier vers la droite : la lettre avance, B2 devient C2.",
        "Sans le signe =, le tableur affiche le texte au lieu de calculer.",
        "Une ligne de total : on additionne les cellules du dessus.",
      ],
      exercices: [
        {
          enonce:
            "Une entraîneuse de natation note les longueurs nagées (modèle).\na) Quelle valeur contient C3 ?\nb) Que renvoie la formule =B4-C4 ?\nc) Dans quelle cellule se trouve la valeur 24 ?",
          figure: feuille([["Nageuse", "Lundi", "Mardi"], ["Aïcha", 20, 24], ["Noé", 16, 18], ["Lina", 30, 26]]),
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: cellule("C2"), exact: true },
          ],
          correction:
            "a) Colonne C, ligne 3 : la case de Noé le mardi, 18.\nb) B4 vaut 30 et C4 vaut 26 : $30 - 26 = 4$.\nc) 24 est dans la colonne C, sur la ligne 2 : C2.\n⛔ Le piège au a) : lire la ligne de Lina. La ligne 3 est la deuxième ligne de données.\nRéponse : a) 18 ; b) 4 ; c) C2.",
          micros: ["tab_lire", "tab_comprendre_formule"],
        },
        {
          enonce:
            "Un boulanger prépare sa feuille de ventes (modèle). La cellule D2 contient une formule.\na) Quelle valeur la cellule D2 affiche-t-elle ?\nb) Quelle formule faut-il en D3 ?\nc) Quelle valeur D3 affichera-t-elle ?",
          figure: feuille([["Article", "Prix", "Quantité", "Total"], ["Pain", 1.2, 50, "=B2*C2"], ["Croissant", 1.1, 40, "…"]]),
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: bas(produit("B3", "C3")), exact: true },
            { question: "c)", attendu: "44" },
          ],
          correction:
            "a) $1{,}2 \\times 50 = 60$.\nb) En recopiant vers le bas, les deux références descendent d'une ligne : =B3*C3.\nc) $1{,}1 \\times 40 = 44$.\n⛔ Le piège au b) : garder =B2*C2. On calculerait encore le total du pain.\nRéponse : a) 60 ; b) =B3*C3 ; c) 44.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
        {
          enonce:
            "Une hôtelière note, pour chaque mois, le nombre de nuits et le prix d'une nuit (modèle). Elle veut le chiffre d'affaires en ligne 4.\na) Quelle formule saisir en B4 pour pouvoir la recopier vers la droite ?\nb) Que devient cette formule, recopiée en C4 ?\nc) Quelle valeur C4 affiche-t-elle ?",
          figure: feuille([["", "Juin", "Juillet"], ["Nuits", 120, 150], ["Prix (€)", 80, 70], ["CA (€)", "?", "?"]]),
          reponses: [
            { question: "a)", attendu: droite(produit("B2", "B3")), exact: true },
            { question: "b)", attendu: droite(produit("C2", "C3")), exact: true },
            { question: "c)", attendu: "10 500" },
          ],
          correction:
            "a) Le chiffre d'affaires, c'est le nombre de nuits fois le prix : =B2*B3.\nb) Vers la droite, ce sont les lettres qui avancent : =C2*C3.\nc) $150 \\times 70 = 10\\,500$.\n⛔ Le piège au b) : écrire =B3*B4. En recopiant vers la droite, les numéros de ligne ne bougent pas.\nRéponse : a) =B2*B3 ; b) =C2*C3 ; c) 10 500.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
        {
          enonce:
            "Un urbaniste modélise une ville de 5 000 habitants, qui gagne 2 % par an.\na) Quelle formule saisir en B3 pour la recopier vers le bas ?\nb) Que devient-elle, recopiée en B4 ?\nc) Quelle valeur B3 affiche-t-elle ?\nd) Quelle valeur B4 affiche-t-elle ?",
          figure: feuille([["Année", "Habitants"], [2025, 5000], [2026, "?"], [2027, "?"]]),
          reponses: [
            { question: "a)", attendu: bas(hausse("B2", 2)), exact: true },
            { question: "b)", attendu: bas(hausse("B3", 2)), exact: true },
            { question: "c)", attendu: "5 100" },
            { question: "d)", attendu: "5 202" },
          ],
          correction:
            "a) Une hausse de 2 % : on multiplie par 1,02. =B2*1,02. On peut aussi écrire =B2+B2*0,02.\nb) La référence descend d'une ligne : =B3*1,02.\nc) $5\\,000 \\times 1{,}02 = 5\\,100$.\nd) $5\\,100 \\times 1{,}02 = 5\\,202$.\n⛔ Le piège au d) : ajouter encore 100. Les 2 % portent sur la valeur de l'année d'avant, qui a grandi.\nRéponse : a) =B2*1,02 ; b) =B3*1,02 ; c) 5 100 ; d) 5 202.",
          micros: ["tab_ecrire_formule"],
        },
        {
          enonce:
            "Un chauffeur calcule le prix au kilomètre de ses trajets (modèle).\na) Quelle valeur D2 affiche-t-elle ?\nb) Quelle formule faut-il en D3 ?\nc) Quelle valeur D3 affichera-t-elle ?",
          figure: feuille([["Trajet", "Prix (€)", "km", "€/km"], ["Nord", 30, 120, "=B2/C2"], ["Sud", 45, 150, "…"]]),
          reponses: [
            { question: "a)", attendu: "0,25" },
            { question: "b)", attendu: bas(formule("=B3/C3")), exact: true },
            { question: "c)", attendu: "0,3" },
          ],
          correction:
            "a) Le signe / veut dire « divisé par » : $30 \\div 120 = 0{,}25$.\nb) En descendant d'une ligne : =B3/C3.\nc) $45 \\div 150 = 0{,}3$.\n⛔ Le piège au b) : écrire =C3/B3. Le prix au km, c'est le prix divisé par les km : l'ordre compte, ici.\nRéponse : a) 0,25 ; b) =B3/C3 ; c) 0,3.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
        {
          enonce:
            "Une pharmacienne a 400 boîtes en stock dans la cellule B2 (modèle). Elle utilise la formule =B2*0,75.\na) De quel pourcentage cette formule diminue-t-elle le stock ?\nb) Quelle valeur renvoie-t-elle ?\nc) Quelle formule augmenterait B2 de 40 % ?",
          reponses: [
            { question: "a)", attendu: "25 %" },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: bas(hausse("B2", 40)), exact: true },
          ],
          correction:
            "a) L'écart à 1 : $1 - 0{,}75 = 0{,}25$, soit une baisse de 25 %.\nb) $400 \\times 0{,}75 = 300$.\nc) Hausse de 40 % : coefficient $1 + 0{,}4 = 1{,}4$, donc =B2*1,4.\n⛔ Le piège au a) : répondre 75 %. Le stock garde 75 % de sa valeur : il perd 25 %.\nRéponse : a) 25 % ; b) 300 ; c) =B2*1,4.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
        {
          enonce:
            "Le trésorier d'une association sportive prépare son budget (modèle).\na) Quelle formule saisir en B5 pour obtenir le total ?\nb) Quelle valeur B5 affichera-t-elle ?\nc) Dans quelle cellule se trouve le coût du bus ?",
          figure: feuille([["Poste", "Montant"], ["Maillots", 350], ["Bus", 420], ["Arbitres", 130], ["Total", "?"]]),
          reponses: [
            { question: "a)", attendu: bas(somme("B2", "B3", "B4")), exact: true },
            { question: "b)", attendu: "900" },
            { question: "c)", attendu: cellule("B3"), exact: true },
          ],
          correction:
            "a) On additionne les trois cellules du dessus : =B2+B3+B4.\nb) $350 + 420 + 130 = 900$.\nc) Le bus est sur la ligne 3, et son coût dans la colonne B : B3.\n⛔ Le piège au a) : écrire les nombres, =350+420+130. Le total ne suivrait plus si un montant change.\nRéponse : a) =B2+B3+B4 ; b) 900 ; c) B3.",
          micros: ["tab_lire", "tab_ecrire_formule"],
        },
        {
          enonce:
            "Un apiculteur a 50 ruches en B2 et prévoit 20 % de plus par an (modèle). En B3, trois élèves proposent :\nLéo : =B3*1,2\nSofia : B2*1,2\nÉliott : =B2*20\na) Écris la bonne formule.\nb) Quel élève a oublié le signe = ? Écris son prénom.\nc) Quelle valeur renvoie la formule d'Éliott ?\nd) Quelle valeur renvoie la bonne formule ?",
          reponses: [
            // ⛔ Ici seulement, le « = » est exigé : la formule de Sofia, sans lui, est celle qu'il faut rejeter.
            { question: "a)", attendu: avecEgal(hausse("B2", 20)), exact: true },
            { question: "b)", attendu: "Sofia" },
            { question: "c)", attendu: "1 000" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "a) On part de B2, et une hausse de 20 % multiplie par 1,2 : =B2*1,2. On peut aussi écrire =B2+B2*0,2.\nb) Sofia n'a pas mis le signe = : le tableur afficherait son texte.\nc) Éliott multiplie par 20 : $50 \\times 20 = 1\\,000$. C'est absurde pour une hausse de 20 %.\nd) $50 \\times 1{,}2 = 60$.\n⛔ Le piège : la formule de Léo. Écrite en B3, elle cite B3 : c'est une référence circulaire.\nRéponse : a) =B2*1,2 ; b) Sofia ; c) 1 000 ; d) 60.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une feuille complète : on écrit les formules de chaque colonne, puis on lit le résultat.",
      rappel: [
        "On écrit la formule pour la première ligne, en pensant à ce qu'elle deviendra une ligne plus bas.",
        "Une formule peut combiner plusieurs calculs : la multiplication passe avant l'addition, comme à la main.",
        "On vérifie une formule sur une ligne, en refaisant le calcul à la main.",
      ],
      exercices: [
        {
          titre: "Le gîte",
          enonce:
            "La propriétaire d'un gîte calcule ses recettes (modèle). Colonne D : le nombre de nuits fois le prix, en euros. Colonne E : la recette après une commission de 15 %.\na) Quelle formule saisir en D2 ?\nb) Quelle formule saisir en E2 ?\nc) Quelle valeur D3 affichera-t-elle ?\nd) Quelle valeur E3 affichera-t-elle ?",
          figure: feuille([["Mois", "Nuits", "Prix", "Recette", "Net"], ["Juin", 12, 90, "?", "?"], ["Juillet", 20, 110, "?", "?"]]),
          reponses: [
            { question: "a)", attendu: bas(produit("B2", "C2")), exact: true },
            { question: "b)", attendu: bas(baisse("D2", 15)), exact: true },
            { question: "c)", attendu: "2 200" },
            { question: "d)", attendu: "1 870" },
          ],
          correction:
            "a) Nuits fois prix : =B2*C2.\nb) Une baisse de 15 % multiplie par 0,85, appliqué à la recette : =D2*0,85.\nc) $20 \\times 110 = 2\\,200$.\nd) $2\\,200 \\times 0{,}85 = 1\\,870$.\n⛔ Le piège au b) : écrire =D2*15. Il faudrait aussi diviser par 100, et on obtiendrait la commission, pas ce qui reste.\nRéponse : a) =B2*C2 ; b) =D2*0,85 ; c) 2 200 ; d) 1 870.",
          micros: ["tab_ecrire_formule"],
        },
        {
          titre: "La forêt",
          enonce:
            "Un technicien forestier modélise une forêt de 1 000 arbres en B2. Chaque année, elle gagne 10 % par la pousse, puis on coupe 200 arbres.\na) Quelle formule saisir en B3 pour la recopier vers le bas ?\nb) Quelle valeur B3 affiche-t-elle ?\nc) Quelle valeur B4 affiche-t-elle ?\nd) Le nombre d'arbres augmente-t-il ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: bas(formule("=B2*1,1-200", "=1,1*B2-200", "=-200+B2*1,1", "=-200+1,1*B2", "=B2*1,10-200", "=B2*110%-200", "=B2+B2*0,1-200", "=(B2*1,1)-200")), exact: true },
            { question: "b)", attendu: "900" },
            { question: "c)", attendu: "790" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) D'abord la hausse, puis la coupe : =B2*1,1-200.\nb) $1\\,000 \\times 1{,}1 - 200 = 900$.\nc) $900 \\times 1{,}1 - 200 = 790$.\nd) Non : 1 000, puis 900, puis 790. La pousse ne compense pas la coupe.\n⛔ Le piège au a) : écrire =B2*1,1-B2*200. La coupe est un nombre fixe d'arbres, pas un coefficient.\nRéponse : a) =B2*1,1-200 ; b) 900 ; c) 790 ; d) non.",
          micros: ["tab_comprendre_formule", "tab_ecrire_formule"],
        },
        {
          titre: "Le classement",
          enonce:
            "Un entraîneur de football tient le classement d'un tournoi (modèle). Une victoire vaut 3 points, un nul vaut 1 point.\na) Quelle formule saisir en D2 ?\nb) Que devient-elle, recopiée en D3 ?\nc) Quelle valeur D3 affichera-t-elle ?\nd) Quelle équipe a le plus de points ? Écris son nom.",
          figure: feuille([["Équipe", "Victoires", "Nuls", "Points"], ["Aigles", 8, 3, "?"], ["Loups", 9, 2, "?"]]),
          reponses: [
            { question: "a)", attendu: bas(formule("=B2*3+C2", "=3*B2+C2", "=C2+B2*3", "=C2+3*B2", "=B2*3+C2*1", "=3*B2+1*C2")), exact: true },
            { question: "b)", attendu: bas(formule("=B3*3+C3", "=3*B3+C3", "=C3+B3*3", "=C3+3*B3", "=B3*3+C3*1", "=3*B3+1*C3")), exact: true },
            { question: "c)", attendu: "29" },
            { question: "d)", attendu: ["Loups", "les Loups"] },
          ],
          correction:
            "a) Les victoires valent 3 points, les nuls 1 point : =B2*3+C2.\nb) Vers le bas, les deux références descendent : =B3*3+C3.\nc) $9 \\times 3 + 2 = 29$.\nd) Les Aigles ont $8 \\times 3 + 3 = 27$ points. Les Loups, avec 29, sont devant.\n⛔ Le piège au a) : écrire =B2+C2. Les deux colonnes n'ont pas la même valeur en points.\nRéponse : a) =B2*3+C2 ; b) =B3*3+C3 ; c) 29 ; d) Loups.",
          micros: ["tab_ecrire_formule"],
        },
        {
          titre: "La facture d'eau",
          enonce:
            "Un agent du service des eaux modélise une facture annuelle : 60 € d'abonnement, plus 3,50 € par mètre cube.\na) Quelle formule saisir en C2 ?\nb) Quelle valeur C2 affichera-t-elle ?\nc) Quelle valeur C3 affichera-t-elle ?\nd) Un ménage paie 235 €. Combien de mètres cubes a-t-il consommés ?",
          figure: feuille([["Ménage", "m³", "Facture"], ["Dupont", 100, "?"], ["Sylla", 150, "?"]]),
          reponses: [
            { question: "a)", attendu: bas(formule("=60+B2*3,5", "=60+3,5*B2", "=B2*3,5+60", "=3,5*B2+60", "=60+B2*3,50", "=60+3,50*B2", "=B2*3,50+60", "=3,50*B2+60")), exact: true },
            { question: "b)", attendu: "410 €" },
            { question: "c)", attendu: "585 €" },
            { question: "d)", attendu: "50" },
          ],
          correction:
            "a) L'abonnement, plus le prix fois le volume : =60+B2*3,5.\nb) $60 + 100 \\times 3{,}5 = 410$ €.\nc) $60 + 150 \\times 3{,}5 = 585$ €.\nd) On enlève l'abonnement : $235 - 60 = 175$. Puis $175 \\div 3{,}5 = 50$ mètres cubes.\n⛔ Le piège au a) : écrire =(60+B2)*3,5. L'abonnement serait multiplié lui aussi.\nRéponse : a) =60+B2*3,5 ; b) 410 € ; c) 585 € ; d) 50.",
          micros: ["tab_ecrire_formule"],
        },
      ],
    },
  ],
};
