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
- 11/11 13 h : ✅ PILOTES 01 RENDUS EN HD, **EN ATTENTE DU OUI DE FRÉDÉRIC SUR LE FORMAT** (aperçu `manim/sorties/apercu-calcul-mental.html`, ouvert en pause).
  - Paysage `manim/sorties/6e/maths/calcul-mental/01-addition/eleveai-maths-6e-mental-addition.mp4` : 3 min 36, bords 0, planches relues (titre « 56 + 8 = ? » à écart égal, droite du piège sous « On passe la dizaine ! », 275/282 aérés). Commit `640f34ce`.
  - Short `…/01-addition/eleveai-maths-6e-mental-addition-short.mp4` (1 min 09, 1080×1920) + `-short-miniature.png` (« 38 + 5 = 313 ? TU PARIES ? », « Dessin animé ») : planche relue, OK.
- ✅ 02 : paysage `mental_soustraction.py` dry run propre (commit `2da0da25`, titre retouché dans `640f34ce`) ; short `films/mental-soustraction.js` (`04d2fd0d`, 73 s, réponse B). RESTE : HD paysage, film + miniature.
- ⏳ 03 à 06 : écrits par des agents (scène + `films/mental-<slug>.js`), dry run, brouillon -ql, planches ; derniers contrôles en cours. RESTE pour chacun : HD, film + miniature, bords, planche.
- ⚠️ Synchro par jetons : chaque mot écrit attend son mot dit ; écrire EXACTEMENT les mots de la voix (« Chloé en vend », pas « Elle en vend »). Dry run : `PYTHONUTF8=1 PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 … --dry_run --media_dir <dossier à soi>`.
- ⚠️ Poste partagé : rendus via `rendre.sh` (verrou mkdir commun, ≤ 1 autre -qh, RAM ≥ 1,5 Go au départ, arrêt si < 0,3 Go). Cahier des charges : `side-session-notes/local_30b52608-…/calcul-mental-brief-agents.md`.

## Reste, dans l'ordre
1. Oui de Frédéric sur le format (aperçu).
2. 02 : HD paysage, puis `node scripts/ti-margo-short.mjs mental soustraction film` et `… miniature`, bords, planches.
3. 03 à 06 : idem, un rendu à la fois ; ajouter chaque épisode à l'aperçu avec sa vraie durée.
4. Commit par chemin, sans push ; ⛔ pas de manifeste, `lib/videos` ni R2.
