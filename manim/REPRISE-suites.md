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
- 11/11 : session fille au travail : rendus 02 → 38 lancés, 3 agents à la fois (mission commune dans le dossier de notes de la session, `mission-commune.md` ; rapports complets `ep-NN.md` au même endroit). Détail par épisode : section « Épisodes rendus » en bas. Sur la proposition de Frédéric, une session sœur rend la TERMINALE (28 à 38, 2 agents, sa note `manim/REPRISE-suites-terminale.md`, rapports `ep-NN.md` au même dossier de notes) ; la session fille garde 02 à 27 et toute la passe finale.
- APRÈS SON OUI : les 37 autres épisodes, un agent par épisode (brief `manim/brief-agent-suites.md` + mission : classe, micro, voix, lettres justes, dessins), 3 ou 4 à la fois au plus (machine partagée), puis passe finale comme la divisibilité (miniatures, manifeste en AJOUT avec `aussi` pour les 4 communes, `fiches-youtube.py`, R2 par `rclone copy` du seul dossier `suites`, coach `brancher-videos-coach.mjs --ecrire` APRÈS le push du soir, sur son ordre).
- Ép. 01 `lin_suite_reconnaitre` : voix écrites (`manim/voix/premiere-suite-arith-reconnaitre[-short].json`), EN ATTENTE DE LA VALIDATION de Frédéric. Rien de généré.
  Questions : paysage 04 → C, 08 → A ; short 03 → B ; commentaire : 37 km (10 + 9 × 3).

## ⏭ Relais de la session fille (11/11 après-midi)
- Acceptés après relecture : 02 à 12, tous en commits locaux (blocs ci-dessous). Fins sans étoile : 01 à 05 re-rendus ✅ (paysage + short). Plus aucun agent de la session fille ne tourne au moment du relais (11/11 ~15 h).
- Machine partagée : verrou `eleveai-rendu-hd.lock` (un seul rendu -qh à la fois, toutes sessions) + au moins 1,5 Go de RAM libre avant chaque HD (règle de la session Calcul mental 6e). Les sessions Calcul mental, Terminale et un « chef d'orchestre » peuvent demander une pause : la transmettre aux agents.
- Relecture : regarder `planche-finale-paysage.png` / `-short.png` du dossier de sortie + images à t précis (outil PyAV : extraire une image à t, recadrer pour zoomer). Défauts typiques renvoyés : liste en fin de `mission-commune.md` (dossier de notes de la session fille) : la donner telle quelle aux agents suivants.
- ⏰ ÉCHÉANCE (calendrier validé par Frédéric, section « 📅 Calendrier YouTube » en bas) : épisodes 01 à 04 PRÊTS avant le 16/11 12 h 30 (heure de La Réunion) = re-rendus sans étoile (faits), miniatures, entrées du manifeste en AJOUT (prioritaire: true, pas_avant à leur date, renvoie_vers sur les shorts), par lecture-patch-écriture du JSON ; ⛔ ne pas committer le manifeste par son chemin tant qu'il porte la modif non committée d'une autre session (2 pas_avant). Chaque épisode suivant : en place 2 jours avant sa date. Donc la passe finale se fait AU FIL DE L'EAU, pas seulement à la fin.
- Reste : 13 à 27 (1re géo puis 1re spé), puis passe finale (miniatures, manifeste en AJOUT, fiches-youtube, R2, table R2). Terminale 28-38 : session sœur « Suites Terminale », rapports `ep-28.md`… dans le même dossier de notes.

## ▶ REPRISE samedi 14/11 à 9 h : épisodes 16 à 27 (état au 12/11 4 h 20)
- **01 à 15 PRÊTS** : HD relus soi-même planche par planche, miniatures, 30 entrées au manifeste (`pas_avant` 17/11 → 16/12), `fiche-youtube.md`, R2 `premiere/maths/suites` (check : 87 fichiers, 0 différence), table R2 régénérée. Rien poussé de notre côté.
- Le 12/11 : 13 re-rendu (paysage + short, `3aa523f7`), 14 short re-rendu (« 200 mg », `aa903f42`), 15 paysage + short re-rendus (`faec9c91`). Fins vérifiées : 01-04, 29, short 28 sans étoile Flash ; paysage 28 re-rendue sans étoile (`f7b05821`, mp4 en place ; l'ancien dans le dossier agent-etoile du TEMP (ancien-28p.mp4)). ⚠ La 28 (Tle) n'est PAS encore sur R2 : c'est à la passe finale Tle de l'y envoyer.
- ⛔ Toujours NON committés (mêlés à d'autres sessions) : `manim/manifeste-youtube.json`, `lib/videos/videos-r2.json`, `lib/videos/bilans-videos.json`, `lib/videos/mots-videos.json` → ensemble au push. `python manim/passe_suites.py manifeste` recrée nos entrées.
- À faire samedi : 16 à 27, un agent par épisode, 3 au plus à la fois (mission : `mission-commune.md` du dossier de notes `local_eb6b8bf7…` + lettres ci-dessous), verrou `%TEMP%\eleveai-rendu-hd.lock` (dossier : mkdir/rmdir), ≥ 1,5 Go libres, < 2 rendus lourds sur le poste (les `hd.sh` des agents 13 et 15 le vérifient : les recopier). Puis relire soi-même chaque planche finale (une fois), passe finale (voir section suivante). Lettres : 16 B/A short B ; 17 C/A B ; 18 B/C A ; 19 A/B C ; 20 C/B A ; 21 B/A C ; 22 A/C B ; 23 C/A B ; 24 C/B A ; 25 A/B C ; 26 C/A B ; 27 B/C A (vérifier les clés `…b-reponse`). Communes : 18 et 19 ont déjà leur `aussi` dans `AUSSI`.
- ⚠ Arrêter une attente de verrou en tuant AUSSI ses processus enfants (`TaskStop` seul a laissé une boucle rendre la 15 pendant la pause du 11/11).
- Terminale (session sœur `local_944a8872…`) : acceptés 28-33 ; passe finale Tle par nous, depuis les `ep-NN.md` du dossier `local_67461f00…`.
- Planches : les étiquettes de temps des planches des agents sont parfois décalées (15 : ~20 s) ; se fier à `passe_suites.py temps`, qui mesure l'audio.

## ✅ Passe finale au fil de l'eau (11/11 16 h, session « suites 13-27 »)
- 01 à 12 PRÊTS pour l'envoi automatique : miniatures (`python manim/miniature_suites.py [filtre]`, indices dessinés : Arial Black n'a pas ₙ, écrire `u_{n+1}`, `q^{n}`), 24 entrées au manifeste (`python manim/passe_suites.py temps <filtre>` mesure les clips dans l'AUDIO des mp4 → `manim/sorties/temps-suites.json`, puis `python manim/passe_suites.py manifeste` : ajout/remplacement de NOS ids seulement, `prioritaire`, `pas_avant` du calendrier, `renvoie_vers`, chapitres < 10 s réunis, `aussi` pour 05/13/18/19), `fiche-youtube.md` (`scripts/fiches-youtube.py premiere-suite-`), R2 `premiere/maths/suites` (filtre sans `planche-*`, `check --size-only` : 0 différence), `node scripts/generer-videos-r2.mjs` (ajouts seulement).
- Commits outils : `2fe98447`, `939d9c7d`. ⛔ NON committés : `manim/manifeste-youtube.json`, `lib/videos/videos-r2.json`, `lib/videos/bilans-videos.json` (ils portaient déjà des modifs d'autres sessions) ; la commande `manifeste` recrée nos entrées à l'identique.
- Ajouter un épisode : sa ligne dans `EP` de `miniature_suites.py` et dans `EPS` de `passe_suites.py` (textes repris de la voix et du rapport), puis `temps <slug>`, `manifeste`, fiches, R2, table R2.

## Épisodes rendus (11/11, session fille)
⏳ À REFAIRE en fin de série, machine libre : les vidéos rendues AVANT `524b48bd` ont une étoile (Flash) posée 0,5 s sur « @eleveai974 » à l'écran de fin (pilote 01, 02, 03, 04, 28, 29 ; vérifier 05 et 06 selon l'heure de leur dernier rendu). Re-rendu HD seul, calage inchangé.
### Ép. 04 arith-terme-rang ✅ relu (planches regardées par la session fille ; short corrigé `a206b4d8` : « 20 » de u₁ lisible)
- Ép. 04 `arith-terme-rang` (`lin_suite_terme_rang`) : commits locaux `57a3a348` + `a206b4d8` correctif short (case u₁ élargie, « 20 » lisible) (scripts `suite_arith_terme_rang.py` / `_short.py` + `_marques.json`), PAS poussé.
- Durées : paysage 4:21 (261,2 s), short 1:04 (63,9 s). Bords : 0 instant sur les deux. Audit : 0 AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière à 70 %).
- Métier : Hugo, carreleur (bacs en carré bordé : 8, 12, 16 → étape 20 = 84 carreaux). Short : Chloé prépare une course à vélo.
- Centres : construction, velo, jeux-defis.
- Questions : paysage 01:28 → C (57), 02:33 → A (14) ; short 00:25 → C (65).
- Commentaire du short : 30e semaine = 20 + 29 × 5 = 165 km (non affiché).
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-arith-terme-rang[-short]/`). Marques produites par `manim/scripts/4e/equation_commun.py` (cues doubles datées).

- Chapitres et questions complets : `ep-04.md` du dossier de notes.

### Ép. 03 arith-notation ✅ relu (corrections `82f74820` : fiche de Nadia agrandie, satellites écartés, cases du short espacées)
- Ép. 03 `arith-notation` (1re, `lin_suite_notation`) : commits locaux `e72e7e7f` + `82f74820` (retouches) (scripts `suite_arith_notation.py` + `_short.py`, 2 `_marques.json`), PAS poussé.
- Durées : paysage 4:21 (260,75 s), short 1:05 (65,03 s). Bords : 0 instant (les deux). Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle à 70 %).
- Métier : Nadia, ingénieure dans une agence spatiale (constellation de satellites d'observation). Short : un compte de vulgarisation scientifique.
- Centres : `espace`, `sciences`, `reseaux-sociaux` (short).
- Questions paysage : 01:09 → A (u₈) ; 02:22 → B (8 + 3n). Short : 00:23 → B (u₆).
- Commentaire du short : indice du 50e terme d'une suite qui commence à u₀ → 49 (u₄₉), non affiché.
- Voix : aucun mot changé.
- Nouveauté technique (dans le script de l'épisode, pas dans le module commun) : `formule()` = un seul MarkupText Pango, avec de vrais indices abaissés (`u_{n+1}`), et des morceaux dévoilés à la voix. Les indices Unicode (ₙ) restaient sur la ligne et se lisaient mal. Seul défaut : les nombres d'un MarkupText ne sont pas audités, je les ai calés à la main avec suivre().


### Ép. 02 arith-recurrence ✅ relu (corrections `ce89aee2` : r = 300 écarté, piège clarifié, 250 dans sa case)
- Ép. 02 `arith-recurrence` (1re, `lin_suite_recurrence`) : commits 2d40f853 + ce89aee2 (corrections de la relecture) (scripts `suite_arith_recurrence.py` + `_short.py`, marques), pas poussé.
- Durées : paysage 4:41 (280,5 s), short 1:11. Ceintures : paysage verte, short blanche. Bords : 0 instant (les deux).
- Métier : Léna, programmatrice d'un festival de musique (paysage) ; un food truck (short).
- Centres : `musique`, `cuisine`.
- Questions : paysage 01:06 → A (vₙ₊₁ = vₙ − 15), 02:24 → B (54) ; short 00:27 → B (565).
- Commentaire du short : u₀ = 250, raison 35 → u₄ = 250 + 4 × 35 = 390 (non affiché).
- Voix : aucun mot changé (générée à −6, telle quelle).
- Outil propre à l'épisode (dans son script) : `AuditMilliers` (l'audit trouve « 1 200 » dans la voix), `arc_fleche` (flèche qui recule), `phrase` (une ligne de question en morceaux calés).


### Ép. 05 arith-explicite ✅ relu, COMMUNE avec 1re spé suite_arithmetique (corrections `248fd58f` : choix en colonne, titre Correction centré, choix du short agrandis)
- Ép. 05 `arith-explicite` (1re, micro `lin_suite_explicite`, vidéo COMMUNE avec `suite_arithmetique` 1re spé, à brancher par `aussi`) : commits `cb434f9d` (scripts + marques) puis `248fd58f` (corrections de la relecture), pas poussé.
- Durées : paysage 5:16 (315,9 s), short 1:08 (67,9 s), inchangées après relecture. Ceintures : paysage verte, short blanche. Bords 0 / 0 (verifier-bords-video), dry run 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Métier : Sofiane, conseiller bancaire (Jade, 17 ans, épargne 300 € + 45 €/mois pour son permis : uₙ = 300 + 45n, n = 20). Short : la trottinette électrique (120 km + 15 km/jour).
- Centres : `argent-budget`, `voitures-motos` (paysage) ; `transports` (short).
- Questions paysage : 01:05 → C (vₙ = 8 − 3n) ; 02:55 → B (tₙ = 14 + 6n). Short : 00:25 → C (uₙ = 120 + 15n).
- Réponse de la question en commentaire du short : 570 km (120 + 30 × 15), non affichée.
- Voix : AUCUN mot changé (paysage longue ~5 min gardée, qualité d'abord).
- Sorties : `manim/sorties/premiere/maths/suites/05-arith-explicite/eleveai-maths-premiere-suite-arith-explicite[-short].mp4`.


### Ép. 06 arith-variation ✅ relu (corrections `e0f68a4e`, `4fa07ead` : r = −25 espacé, cartes de la correction agrandies, cases du short)
- Ép. 06 `arith-variation` (`lin_suite_variation`) : commits locaux `aadaebcb` + `e0f68a4e` correctif de relecture + `4fa07ead` carte 3 (scripts `suite_arith_variation.py` / `_short.py` + `_marques.json`), PAS poussé.
- Durées : paysage 4:32 (272,3 s), short 1:04 (64,3 s). Bords : 0 instant sur les deux. Audit : 0 AVANCE, 0 RETARD, 0 BORD (dry run final).
- Ceintures : paysage verte, short blanche (échelle entière à 70 %).
- Métier : Lucie, glaciologue (le glacier de 6 000 m qui recule de 25 m par an ; « il va finir par se stabiliser » jugé faux). Short : un nageur qui gagne 0,5 s par semaine au 100 m.
- Centres : meteo-climat, nature-ecologie, natation.
- Questions : paysage 01:15 → A (décroissante, vₙ = 40 − 0,5n), 02:26 → B (croissante, w₀ = −300, r = 0,25) ; short 00:25 → C (décroissante).
- Commentaire du short : après 8 semaines, 62 − 8 × 0,5 = 58 s (non affiché).
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-arith-variation[-short]/`). Marques par `manim/scripts/4e/equation_commun.py`.


### Ép. 07 arith-graphique ✅ relu (corrections `b3580d3b` : étiquettes hors du tracé, graduations lisibles, bas du short aéré)
- Commits locaux `9c698040` (scripts + marques) puis `b3580d3b` (6 défauts mineurs relus par la session principale) ; rien poussé.
- Durées : paysage 4:26 (266,1 s) ; short 1:07 (67,0 s). Bords : 0 instant dans les deux vidéos.
- Ceintures : paysage verte, short blanche.
- Métiers : paysage Amel, ingénieure en robotique (robot livreur d'hôpital, autonomie 120 − 15n) ; short Lina, monteuse vidéo (4, 7, 10 épisodes, +3 par semaine).
- Centres : technologie-ia, corps-sante (paysage) ; cinema-series (short).
- Questions : paysage 01:11 → A (4), 02:23 → B ((4 ; 17)) ; short 00:24 → C (points alignés).
- Réponse au commentaire du short (non affichée) : 34 = 4 + 3 × 10.
- Voix : aucun mot changé.


### Ép. 08 arith-interpreter ✅ relu (corrections `8339fc82` : espaces autour de ≥ ≈ = −, personnages écartés)
- Ép. 08 `arith-interpreter` (1re, `lin_suite_interpreter`) : commits locaux `6e0873c3` + `8339fc82` (retouches de la relecture : espaces autour de ≥ ≈ = −, Clara et Bastien écartés ; paysage re-rendue, bords 0) (scripts `suite_arith_interpreter.py` + `_short.py`, 2 `_marques.json`), PAS poussé.
- Durées : paysage 5:02, short 1:04. Bords : 0 instant sur les deux mp4 ; dry run final : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière).
- Métier : Clara, kinésithérapeute (son patient Bastien, opéré du genou, réapprend à marcher). Short : un refuge pour animaux (pas de métier nommé dans la voix).
- Centres : `corps-sante`, `sport`, `animaux`.
- Questions paysage : 01:07 → B (le nombre de livres ajoutés chaque année) ; 03:10 → C (l'étape 20). Short : 00:23 → B (2035).
- Question en commentaire du short : u₁ correspond à 2026, à quelle année correspond u₉ ? Réponse : 2034 (non affichée).
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-arith-interpreter[-short]/`). Marques datées par `manim/scripts/4e/equation_commun.py` (cues doubles).


### Ép. 09 geo-reconnaitre ✅ relu (corrections `b34f9b36`, `f1e4dea5`, `2112046d` : « ; » espacés, choix du short sur deux lignes, cases 5/15/45/135 égales)
- Commits locaux `1ac3376e` puis `b34f9b36` , `f1e4dea5` et `2112046d` (retours de la session principale ; pas poussés) : 2 scripts (`suite_geo_reconnaitre.py`, `_short.py`) + 2 `_marques.json`.
- Durées : paysage 4:24 (263,6 s) ; short 1:13 (73,4 s). Bords : 0 instant dans les deux vidéos. Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière à 70 %).
- Métier : paysage Mathis, technicien de laboratoire d'analyses médicales (culture de bactéries 500, 1 000, 2 000, 4 000 ; médicament − 20 %/h) ; short : un photographe (photo agrandie × 1,5 : 8, 12, 18, 27 cm).
- Centres : corps-sante, sciences (paysage) ; photo (short).
- Questions : paysage 01:06 → B (80 ; 40 ; 20 ; 10), 02:22 → C (1,25) ; short 00:27 → C (5 ; 15 ; 45 ; 135).
- Réponse au commentaire du short (non affichée) : 40,5 cm (27 × 1,5).
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-geo-reconnaitre[-short]/`).


### Ép. 10 geo-recurrence ✅ relu (corrections `041dab0e`, `12d1f6ab`, `ec27018a` : espaces des calculs, « 1 024 » à la taille des autres, cases du rebond égales autour de 67,5, arc de la garde écarté des ceintures)
- Ép. 10 `geo-recurrence` (1re, `expo_suite_recurrence`) : commits locaux `b8d849f3` + `041dab0e` (défauts de la relecture) + `12d1f6ab` (2e relecture : cases h du rebond) + `ec27018a` (3e relecture : écran titre) (scripts `suite_geo_recurrence.py` + `_short.py`, 2 `_marques.json`), PAS poussé.
- Durées : paysage 4:33 (273,1 s), short 1:11 (70,7 s). Bords : 0 instant (les deux). Dry run : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière à 70 %).
- Métier : Manon, apicultrice (colonie de 10 000 abeilles, + 20 % par mois → uₙ₊₁ = 1,2 × uₙ ; u₃ = 17 280). Short : un tournoi d'échecs en ligne (1 024 joueurs, la moitié éliminée à chaque tour).
- Centres : `animaux`, `nature-ecologie` (paysage) ; `jeux-defis` (short).
- Questions : paysage 00:46 → A (vₙ₊₁ = 0,98 × vₙ), 02:31 → C (54) ; short 00:24 → A (uₙ₊₁ = 0,5 × uₙ).
- Commentaire du short : après 4 tours, 1 024 ÷ 2⁴ = 64 joueurs (non affiché).
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-geo-recurrence[-short]/`). Marques datées par `manim/scripts/4e/equation_commun.py` (cues doubles).
- Outils repris de l'ép. 02 (importés, pas recopiés) : `AuditMilliers`, `OutilsEp02` (`phrase`, `calcul`, `lancer`), `arc_fleche`. Nouveau dans le short : `deux_lignes()` (choix des boutons sur deux lignes, à la taille de la question).

### Ép. 11 geo-taux ✅ relu (corrections `6c079054` : sous-titre du titre écarté, étiquettes d'Ylan aérées, 49 %/51 % séparés)
- Ép. 11 `geo-taux` (1re, `expo_suite_taux`) : commit local `5cb68df2` (scripts `suite_geo_taux.py` + `_short.py`, 2 `_marques.json`), PAS poussé.
- Durées : paysage 4:49 (289,0 s), short 0:56 (56,3 s). Bords : 0 instant sur les deux mp4 ; dry run final : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière à 70 %).
- Métier : Ylan, distribution de films (combien de salles gardent un film à l'affiche ; 200 000 entrées, − 30 % par semaine). Short : un smartphone qui perd 20 % de sa valeur par an (pas de métier nommé).
- Centres : `cinema-series`, `argent-budget`, `reseaux-sociaux` (défi : les vues d'une vidéo).
- Questions paysage : 01:17 → A (1,04) ; 02:53 → C (hausse de 21 %). Short : 00:16 → A (0,8).
- Question en commentaire du short : 500 € qui perdent 20 % par an, après 2 ans → 320 € (500 × 0,8²), non affichée.
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-geo-taux[-short]/`). Marques : `marques_dump.ps1`, puis un petit convertisseur à moi qui date un à un les mots des cues répétées (« 10 000 fois » en 3 mots) ; `equation_commun.py` perdait la fin de `09b-correction` (16 cues « introuvable »).


### Ép. 12 geo-terme-rang ✅ relu (corrections `ba99d570`, `09fce1f0`, `6f69af25` : « 768 » dans sa case, garde aérée, choix des questions en grand, étiquettes agrandies, échelle du short à 70 % sous le titre)
- Ép. 12 `geo-terme-rang` (1re, `expo_suite_terme_rang`) : commits locaux `ba99d570` + `09fce1f0` + `6f69af25` (retours de relecture) (scripts `suite_geo_terme_rang.py` + `_short.py`, 2 `_marques.json`), PAS poussé.
- Durées : paysage 4:13 (253,0 s), short 1:14 (74,3 s). Bords : 0 instant sur les deux mp4 ; dry run final : 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.
- Ceintures : paysage verte, short blanche (échelle entière à 70 %, 0,15 sous le titre en fs 40).
- Métier : Léo, community manager (le compte d'un club de basket : 2 000 abonnés, + 10 % par mois, u₁₂ = 2 000 × 1,1¹² ≈ 6 277). Short : la feuille pliée 10 fois (pas de métier nommé dans la voix).
- Centres : `reseaux-sociaux`, `sport`, `jeux-defis`.
- Questions paysage : 01:08 → C (405 = 5 × 3⁴) ; 02:01 → B (100 = 800 × 0,5³). Short : 00:27 → C (uₙ = 0,1 × 2ⁿ).
- Question en commentaire du short : l'épaisseur après 7 pliages. Réponse : 12,8 mm (0,1 × 2⁷), non affichée.
- Voix : aucun mot changé (WAV débit −6 dans `public/sons/premiere-suite-geo-terme-rang[-short]/`). Marques datées par `manim/scripts/4e/equation_commun.py` (cues doubles).


### Ép. 13 geo-explicite ✅ relu, COMMUNE avec 1re spé suite_geometrique (`2e27f97f`, `3aa523f7` : retouches d'écartement, « × 2 » du short agrandis à 1,15 seulement)
- Paysage 5:04, short 1:10 ; ceintures verte / blanche. Elena, experte automobile (20 000 €, − 20 %/an, u₃ = 10 240 €) ; short : les nénuphars (uₙ = 3 × 2ⁿ, commentaire 192 m²). Centres `voitures-motos`, `argent-budget` / `nature-ecologie`. Questions mesurées 01:11 → C, 02:42 → B ; short 00:27 → A. YouTube 11/12, short 12/12.

### Ép. 14 geo-variation ✅ relu (`2e27f97f`, `aa903f42` : case « 200 mg » élargie)
- Paysage 4:15, short 1:01 ; verte / blanche. Sarah, game designer (+ 5 % d'XP par niveau, q = 1,05 ; ventes − 10 %) ; short : un médicament × 0,75 (commentaire 112,5 mg). Centres `jeux-video`, `technologie-ia` / `corps-sante`, `sciences`. Questions 01:16 → A, 02:27 → C ; short 00:22 → A. YouTube 13/12, short 14/12.

### Ép. 15 geo-graphique ✅ relu (`2e27f97f`, `faec9c91` : lignes du bas de 08b aérées, « uₙ » du short décollé)
- Paysage 4:26, short 1:05 ; verte / blanche. Laura, technicienne qualité en cuisine centrale (bactéries × 2 toutes les 20 min) ; short : les monstres d'un jeu vidéo × 3 (commentaire 1 458). Centres `cuisine`, `corps-sante`, `sciences` / `jeux-video`, `jeux-defis`. Questions 01:04 → A, 02:29 → B ; short 00:21 → A. YouTube 15/12, short 16/12.

## 📅 Calendrier YouTube décidé le 11/11 (Frédéric : « Oui, à partir du 16 »)
- Les suites prennent le 5e créneau du jour (les 4 autres sont le calendrier 4e/6e déjà daté jusqu'au 09/12). Le 16/11 est déjà plein (5 vidéos) : on démarre le **17/11**.
- Rythme : paysage de l'ép. NN un jour, son short le lendemain. Épisode k (01 → 38, dans l'ordre de la table) : paysage `pas_avant` = 17/11 + 2 × (k − 1) jours, short = le jour suivant. Donc 01 : 17 et 18/11 ; 02 : 19 et 20/11 ; 03 : 21 et 22/11 ; 08 : 01 et 02/12…
- Dans le manifeste (passe finale, entrées en AJOUT) : `prioritaire: true` + `pas_avant` sur chaque entrée ; le short a `renvoie_vers` = sa paysage. Les 4 vidéos communes : une seule entrée publiée, la jumelle en `meme_video_que`.
- ⛔ Avant l'envoi de l'ép. 01 (programmé le 16/11 à 12 h 30 pour le 17) : miniatures + entrées au manifeste des ép. 01 à 04 au moins, et re-rendu des vidéos qui ont l'étoile Flash sur « @eleveai974 » (01 à 05 ✅ re-rendus sans étoile le 11/11, paysage et short, durées identiques, bords 0 ; 06 et suivants rendus après le correctif). Sans entrée, l'automatique ne les voit pas ; une vidéo défectueuse partirait telle quelle.
