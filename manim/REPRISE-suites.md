# Reprise : série SUITES du lycée (1re, 1re spé, Terminale), 10/11/2026

Une paysage Manim + un short Manim par micro (au lycée, pas de dessin animé). Règles : `manim/REGLES.md`. Modèles : convexité Tle (`manim/brief-agent-convexite-terminale.md`), divisibilité 4e (`manim/prompt-session-divisibilite-4e.md`, déroulé complet).
Ne pas toucher : `suite_comparer` (STMG), l'ancienne paysage « Les suites (1/2) » de septembre (`manim/sorties/premiere/maths/paysage/fr/suites-arith-geo/`, gardée telle quelle).

## Coach rendu robuste AVANT les vidéos (10/11, demande de Frédéric)
Avant : les 42 micros au rouge (1 à 27 squelettes, 7 à 19 répétitions sur 20), aucun correcteur. Après : les 42 au vert (178 à 2 755 squelettes, ≤ 3,4 répétitions sur 20), correcteurs sur 500 tirages, contrôles sur 3 000 tirages. Commits locaux, PAS poussés :
- `2f5bdb91` 1re (module sans spé, programme 2026) : `suites-arithmetiques-renfort.ts`, `suites-geometriques-renfort.ts` (motifs en croix, T, carré bordé du programme 2026) ;
- `c8effc11` 1re spé : `suites-renfort.ts` (142 gabarits) ;
- `6981472a` Tle : `suites-renfort.ts`, `limites-suites-renfort.ts` ; `608accc6` : 3 items concours reclassés.
Brief des agents et ce que le coach demande micro par micro : dossier de notes de la session (`brief-renfort-suites.md`) et rapports résumés ci-dessous.
⚠️ `makeChoices` (4e) mélange mal (bonne réponse en 1re ou 4e place ≈ 2 fois sur 3) : nos renforts remélangent ; correctif proposé à Frédéric en session à part.

## Programme
`premiere` = 1re générale SANS spé, module spécifique, programme 2026 en vigueur (épreuve anticipée juin 2027). 1re spé et Tle : programme 2019. Aucune micro de suites masquée.

## Découpage : 38 paysages + 38 shorts (vidéo commune = faite dans la classe la plus basse, branchée par `aussi`)
| Classe | Micro | Vidéo |
|---|---|---|
| 1re | les 8 `lin_suite_*` et les 8 `expo_suite_*` | 16 vidéos propres |
| 1re spé | `suite_arithmetique` | COMMUNE : vidéo de `lin_suite_explicite` |
| 1re spé | `suite_geometrique` | COMMUNE : vidéo de `expo_suite_explicite` |
| 1re spé | les 11 autres | 11 vidéos propres |
| Tle | `suite_calculer_termes` | COMMUNE : vidéo de `suite_termes` (1re spé) |
| Tle | `suite_explicite_recurrence` | COMMUNE : vidéo de `suite_recurrence` (1re spé) |
| Tle | les 11 autres | 11 vidéos propres |
Ordre : 1re (arithmétiques puis géométriques) → 1re spé → Tle (suites puis limites). Ceintures proposées : paysage verte, défis bleue (`suite_defi`, `limite_suite_defi`), short blanche.

## Épisodes (NN-slug ; voix `<prefixe>-suite-<slug>[-short].json`, préfixe premiere / premiere-spe / terminale)
1re : 01 arith-reconnaitre, 02 arith-recurrence, 03 arith-notation, 04 arith-terme-rang, 05 arith-explicite (+ 1re spé suite_arithmetique), 06 arith-variation, 07 arith-graphique, 08 arith-interpreter, 09 geo-reconnaitre, 10 geo-recurrence, 11 geo-taux, 12 geo-terme-rang, 13 geo-explicite (+ 1re spé suite_geometrique), 14 geo-variation, 15 geo-graphique, 16 geo-interpreter.
1re spé : 17 registres, 18 termes (+ Tle suite_calculer_termes), 19 recurrence (+ Tle suite_explicite_recurrence), 20 algorithme, 21 modeliser, 22 evolution, 23 variation, 24 sommes, 25 somme-geo, 26 limite, 27 auxiliaire (bleue).
Tle : 28 reconnaitre, 29 recurrence-preuve, 30 variation, 31 bornee, 32 defi (bleue), 33 limite-interpreter, 34 limite-calculer, 35 limite-operations, 36 limite-comparaison, 37 limite-monotone-bornee, 38 limite-defi (bleue).
Sorties : `manim/sorties/<classe>/maths/suites/NN-<slug>/`. Briefs : `manim/brief-agent-suites.md` (rendu), `manim/brief-voix-suites.md` (voix). Module commun : `manim/scripts/premiere/suites_commun.py` (créé par le pilote).

## État
- 10/11 soir : Frédéric a VALIDÉ la voix de l'ép. 01 (« Oui, lance »). Pilote 01 (paysage + short + module commun) en rendu par un agent ; voix 02 à 38 en écriture par 3 agents (1re, 1re spé, Tle). Après le pilote : montrer à Frédéric (aperçu en pause), puis les autres sans redemander.
- 10/11 : les 74 voix 02 à 38 sont ÉCRITES (`manim/voix/premiere-suite-*`, `premiere-spe-suite-*`, `terminale-suite-*`), calculs revérifiés, lettres justes ≈ 1/3 A, B, C, 0 Réunion. Rien de généré. À écouter à la génération : « u de n plus 1 », « n moins 1, fois r », « l » pour ℓ (37, 38). Longues (qualité d'abord, gardées) : 05, 27 (~5 min), 29, 32, 38. Écart accepté : l'ép. 13 (commune) ne traite pas q négatif (programme 1re sans spé : termes positifs) ; la 1re spé le voit dans 23 (variation). Centres : construction, photo, velo, natation EXISTENT dans la liste fermée (l'agent 1re les croyait absents), les remettre au manifeste.
- 10/11 soir : PILOTE 01 rendu (`24d8af04` : `suites_commun.py`, scripts, marques ; paysage 3:59, short 1:10, bords 0). Relu par la session principale : défauts renvoyés à l'agent du pilote (cases vertes qui cachent 7 et 11, croix trop petite, short trop petit et moitié basse vide, échelle des ceintures du short pas à 70 %, ordre de la question finale). À la reprise : vérifier son commit, refaire une planche (paysage vers 1:55 et 2:45 ; short garde, question, « Et toi ? »), puis montrer le short à Frédéric en pause (port 3900) et attendre son oui.
  Questions pilote (t du premier rendu, à recaler) : paysage 00:58 → 2 (C), 02:24 → 0 (A) ; short 00:23 → 1 (B). Chapitres : 00:00 garde, 00:08 haie, 00:30 écart, 00:45 raison, 00:58 Q, 01:30 silo, 01:47 croix, 02:04 piège, 02:24 Q, 02:50 défi, 03:11 correction, 03:32 appris, 03:48 fin.
- 10/11 nuit : pilote 01 CORRIGÉ et revérifié (`d720b563` cases allumées en contour vert, croix ×1,6, short agrandi, échelle 70 %, voix committées ; `9784f82a` plus aucun chevauchement de fondu, `nouvel_ecran` efface avant d'afficher). Paysage 3:59, short 1:10, bords 0. Questions : paysage 00:59 → C, 02:24 → A ; short 00:23 → B. Aperçu du short ouvert en pause (port 3900). EN ATTENTE DU OUI de Frédéric sur le pilote.
- ✅ 11/11 : Frédéric a VALIDÉ le pilote : « Oui, lance tout ». Bascule en session fille (contexte à 72 %) : la fille rend les 37 épisodes 02 à 38 SANS redemander.
- APRÈS SON OUI : les 37 autres épisodes, un agent par épisode (brief `manim/brief-agent-suites.md` + mission : classe, micro, voix, lettres justes, dessins), 3 ou 4 à la fois au plus (machine partagée), puis passe finale comme la divisibilité (miniatures, manifeste en AJOUT avec `aussi` pour les 4 communes, `fiches-youtube.py`, R2 par `rclone copy` du seul dossier `suites`, coach `brancher-videos-coach.mjs --ecrire` APRÈS le push du soir, sur son ordre).
- Ép. 01 `lin_suite_reconnaitre` : voix écrites (`manim/voix/premiere-suite-arith-reconnaitre[-short].json`), EN ATTENTE DE LA VALIDATION de Frédéric. Rien de généré.
  Questions : paysage 04 → C, 08 → A ; short 03 → B ; commentaire : 37 km (10 + 9 × 3).
