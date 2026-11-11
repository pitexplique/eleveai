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
- 11/11 15 h : ✅ **SÉRIE FINIE : 12 vidéos rendues en HD, relues, défauts mineurs corrigés** (Frédéric a validé le format le 11/11 : « Oui, enchaîne »). Aperçu : `manim/sorties/apercu-calcul-mental.html` (12 vidéos, en pause). Sorties dans `manim/sorties/6e/maths/calcul-mental/NN-<slug>/` (paysage, `-short.mp4`, `-short-miniature.png`).

| N° | Paysage (scène) | Durée | Short Ti Margo | Durée | Réponse |
|---|---|---|---|---|---|
| 01 | `mental_addition.py` Enzo, arbitre de basket | 3 min 36 | « Les billes » | 1 min 09 | — |
| 02 | `mental_soustraction.py` Chloé, magasin de vélos | 3 min 34 | « Le skate » | 1 min 13 | B |
| 03 | `mental_multiplication.py` Hugo, DJ | 3 min 05 | « Les bonbons » | 1 min 05 | C |
| 04 | `mental_division.py` Maëlys, soigneuse au zoo | 3 min 45 | « Les biscuits » | 1 min 10 | B |
| 05 | `mental_astuces.py` Jade, cheffe cuisinière | 3 min 24 | « Le beurre » | 1 min 12 | C |
| 06 | `mental_defi.py` Nathan, développeur de jeux vidéo | 3 min 35 | « La manette » | 1 min 16 | B |

- Contrôles : paysages bords 0 ; shorts ~70 « bords » = le décor plein cadre (même chiffre sur le pilote, normal). Planches relues pour les 12.
- Retouches après HD : 01 titre, piège, 275/282 ; 02 nombres des petits bonds (36/40, 45/50, 81/83, 142/143) ; 03 disques « 5 min » ; 05 titre « 99 + 47 » ; shorts 03 (« 5 = la moitié de 10 »), 04 (rebond « 4 copains »), 06 (bord du tableau).
- ⚠️ À écouter sur le HD (calages faits à l'oreille par les agents) : 04 « 80 et 16 », « 70 et 14 », « 60 et 12 » ; 05 « plus 250 », « fraises », « et 75 », « et 52 ».
- ⚠️ Synchro par jetons : chaque mot écrit attend son mot dit ; écrire EXACTEMENT les mots de la voix. Dry run : `PYTHONUTF8=1 PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 … --dry_run --media_dir <dossier à soi>`.
- ⚠️ Poste partagé : rendus via un verrou mkdir commun (≤ 1 autre -qh, RAM ≥ 1,5 Go). Cahier des charges : `side-session-notes/local_30b52608-…/calcul-mental-brief-agents.md`.

## Reste
1. Frédéric regarde les 12 vidéos dans l'aperçu (retouches éventuelles).
2. Publication (R2, manifeste, `lib/videos`, YouTube) : PAS dans cette session, ⛔ ne pas y toucher ici.
3. Rien n'est poussé.
