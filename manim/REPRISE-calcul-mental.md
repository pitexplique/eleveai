# Reprise — série CALCUL MENTAL 6e (état au 11/11/2026)

Notion du coach `entier_calcul_mental` (banque `lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank.ts`, fiche `lib/fiches/maths-6e-calcul-mental.tsx`) : 6 micros → 6 paysages Manim + 6 shorts en dessin animé Ti Margo, sur le modèle de la série Décimaux (`manim/REPRISE-decimaux.md`).

## Pas de doublon
- Aucune vidéo `entier_calcul_mental` au manifeste.
- × 10 / × 100 d'un décimal : déjà dans `6e-decimal-multiplier` (ép. 08) ; × 0,1 : `6e-decimal-multiplier-par-01` (ép. 10) ; moitié / double / quart d'un décimal et ordre de grandeur : `6e-decimal-calcul-defi` (ép. 12). Ici on reste sur les ENTIERS : passer par la dizaine, compléter, arrondir puis corriger, × 5 = × 10 puis la moitié, regrouper. ÷ 10 n'apparaît qu'une fois (645 ÷ 10, par la valeur des chiffres).

## Épisodes
Dossier `manim/sorties/6e/maths/calcul-mental/NN-<slug>/`, voix `manim/voix/6e-mental-<slug>[-short].json`.

| Ép. | Slug | Micro | Paysage (métier) | Short (gag Ti Margo) | Q. paysage | Q. short |
|---|---|---|---|---|---|---|
| 01 | addition | `entier_addition_mentale` | Enzo, arbitre de basket (56 + 8, 134 + 28) | 38 + 5 = 313 billes ; commentaire 67 + 6 | C, A | A |
| 02 | soustraction | `entier_soustraction_mentale` | Chloé, commerçante, magasin de vélos (100 − 36, 96 − 27, 121 − 38) | skate 36 €, billet de 100 €, « 74 € » ; commentaire 100 − 58 | B, C | B |
| 03 | multiplication | `entier_multiplication_mentale` | Hugo, DJ (18 × 5, 11 × 9) | 16 paquets de 5 bonbons = 160 ; commentaire 28 × 5 | C, A | C |
| 04 | division | `entier_division_mentale` | Maëlys, soigneuse au zoo (56 ÷ 8, 96 ÷ 8, 645 ÷ 10) | 36 biscuits ÷ 4 = 32 ; commentaire 42 ÷ 6 | A, C | B |
| 05 | astuces | `entier_strategie_mentale` | Jade, cheffe cuisinière (double, quart, regrouper, 99 + 47) | double de 125 g = 1 250 g ; commentaire double de 375 | B, A | C |
| 06 | defi | `entier_calcul_mental_defi` | Nathan, développeur de jeux vidéo (3 défis + ordre de grandeur) | 49 + 52 = 911 € ; commentaire 98 + 103 | B, A | B |

Lettres des bonnes réponses tirées au hasard (graine 1111) : 6 A, 6 B, 6 C, jamais deux fois la même dans une paysage.
3 filles, 3 garçons, 0 à La Réunion. Métiers marqués `V` dans `lib/matrice/metiers-college.ts` (3 ajoutés : commerçante, soigneuse, développeur).
Centres : 01 sport, basket ; 02 argent-budget, velo ; 03 musique, electro-dj ; 04 animaux, animaux-marins ; 05 cuisine ; 06 jeux-video, jeux-defis.
Ceintures : paysages vertes ; shorts jaunes (un calcul à faire).

## État
- 11/11 : 12 voix écrites, pilote 01 (paysage + short) montré en entier à Frédéric : **EN ATTENTE DE SON OUI**. Rien n'est généré ni rendu.

## Reste, dans l'ordre
1. Son oui sur les voix (corrections éventuelles).
2. Générer les voix (Julie, débit −6 comme les décimaux), marques des paysages.
3. Pilotes 01 : paysage `manim/scripts/6e/mental_addition.py` (module commun `mental_commun.py`, calqué sur `decimal_commun.py`), short `prototypes/ti-margo/films/calcul-mental.js` (+ `.json`). Dry run AUDIT, planches, un seul rendu HD à la fois (⛔ `tasklist` avant : poste partagé).
4. Aperçu `manim/sorties/apercu-calcul-mental.html` (⛔ jamais `apercu.html`), validation du format, puis 02 à 06.
5. Commit par chemin, sans push.
