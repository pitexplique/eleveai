Prompt — vidéos LYCÉE, série PROPORTIONNALITÉ (2de, 1re automatismes, STMG) — 02/11/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (`git commit -- <chemins>`, jamais `git add -A`, jamais `media-*` ni `*.cues.tsv`) ; push SEULEMENT sur son signal, le soir ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes (ici : aucun). D'autres sessions partagent `main` : ne toucher qu'aux fichiers des vidéos lycée.

À lire d'abord : `manim/consigne-videos-proportionnalite.md`, `manim/REGLES.md`, `manim/prompt-session-proportionnalite-cm.md` (méthode complète : voix, agents, passe finale), `manim/prompt-session-proportionnalite-lot5.md`.

## Le périmètre : 14 micros du lycée sans vidéo (vérifié le 02/11 dans le manifeste)
- seconde, notion `information_chiffree_evolutions` : `info_proportion`, `info_pourcentage_de_pourcentage`
- premiere, automatismes : `auto_prop_calculer`, `auto_prop_formes`, `auto_prop_appliquer` (notion `auto_proportion`) ; `auto_prop_partie_connaissant_tout`, `auto_prop_tout_connaissant_partie`, `auto_prop_pourcentage_de_pourcentage` (notion `auto_partie_tout`)
- stmg : `auto_prop_calculer`, `auto_prop_formes`, `auto_prop_appliquer`, `auto_prop_de_proportion` (notion `auto_proportion`) ; `auto_evo_nature_pourcentage` (notion `auto_evo_taux`) ; `suiteT_taux_equivalent_proportionnel` (notion `suite_comparer`, terminale STMG)
Banques du coach lues : `lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank.ts`, `premiere/maths/automatismes-proportions-stats.bank.ts`, `stmg/maths/proportions-evolutions.bank.ts`, `stmg/maths/suites-terminale.bank.ts`.

## Choix : 9 voix pour 14 micros
- Épisodes COMMUNS (une voix `lycee-prop-<slug>`, qui ne cite aucune classe ; un script à sous-classes, seules l'identité et la ceinture changent ; short rendu une fois et copié) : calculer, formes, appliquer (1re + STMG) ; **pourcentage de pourcentage (2de + 1re + STMG)** : `info_pourcentage_de_pourcentage`, `auto_prop_pourcentage_de_pourcentage` et `auto_prop_de_proportion` sont la même compétence.
- Épisodes propres : `seconde-prop-proportion`, `premiere-prop-partie-tout`, `premiere-prop-tout-partie`, `stmg-prop-nature-pourcentage`, `stmg-prop-taux-equivalent`.
- Numérotation par classe, sorties `manim/sorties/<seconde|premiere|stmg>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<classe>-prop-<slug>[-short].mp4`, ids du manifeste `<classe>-prop-<slug>[-short]` :
  - seconde : 01-proportion, 02-pourcentage-de-pourcentage
  - premiere : 01-calculer, 02-formes, 03-appliquer, 04-partie-tout, 05-tout-partie, 06-pourcentage-de-pourcentage
  - stmg : 01-calculer, 02-formes, 03-appliquer, 04-pourcentage-de-pourcentage (micro `auto_prop_de_proportion`), 05-nature-pourcentage, 06-taux-equivalent
- Ceintures proposées (à confirmer par Frédéric avec les voix) : automatismes 1re/STMG (calculer, formes, appliquer, partie-tout, tout-partie) JAUNE ; seconde proportion VERTE ; pourcentage de pourcentage : seconde VERTE, 1re et STMG ORANGE ; nature du pourcentage ORANGE ; taux équivalent (terminale) BLEUE ; shorts BLANCHE.

## Les épisodes (voix VALIDÉES par Frédéric le 02/11, « oui, lance les rendus » ; commit des voix `54283f04`)
| voix | micro(s) | paysage (prénom, métier, décor) | centres | short | centres short |
|---|---|---|---|---|---|
| `lycee-prop-calculer` | auto_prop_calculer (1re, STMG) | Léa, ingénieure du réseau électrique : 2024, 361,7 TWh nucléaire sur ≈ 539 → 67,1 % ; piège diviser par le reste (204 %) ; hydraulique 75,1, éolien 46,8, solaire 24,8 | sciences, nature-ecologie | refrain 80 s sur 200 s = 40 % | musique |
| `lycee-prop-formes` | auto_prop_formes (1re, STMG) | Samuel, hydrologue : 97 % d'eau salée, 3 % douce = 3/100 = 0,03 ; ≈ 2/3 de l'eau douce gelée ; piège 3 % ≠ 0,3 | nature-ecologie, sciences | trouve l'intrus (1/2, 0,5, 5 %, 50 %) | jeux-defis |
| `lycee-prop-appliquer` | auto_prop_appliquer (1re, STMG) | Clara, infirmière : corps ≈ 60 % d'eau, 70 kg → 42 kg (3 méthodes) ; sang ≈ 7 % ; piège 6 ou 0,06 | corps-sante | 8 % de 50 = 50 % de 8 | jeux-defis |
| `lycee-prop-pourcentage-de-pourcentage` | info_pourcentage_de_pourcentage, auto_prop_pourcentage_de_pourcentage, auto_prop_de_proportion | Karim, analyste e-commerce : 2024, 175,3 Md€, produits ≈ 38 %, places de marché 31 % des produits → 11,8 % (carré 100 %) ; piège additionner (69 %) | argent-budget, technologie-ia | tirs cadrés 50 % × buts 50 % = 25 % | sport |
| `premiere-prop-partie-tout` | auto_prop_partie_connaissant_tout | Jade, ingénieure spatiale : ISS ≈ 90 % de la pesanteur, 800 N → 720 N ; Mars 38 %, Lune 16,5 % ; piège le complément (10 %) | espace, sciences | mise à jour 60 Go, 35 % → 21 Go | jeux-video |
| `premiere-prop-tout-partie` | auto_prop_tout_connaissant_partie | Hugo, consultant climat : transports 126,8 Mt = 34 % → total ≈ 373 Mt (par 1 % et par division) ; 2022 : 131,2 Mt = 33,1 % → 396 ; piège multiplier | meteo-climat, transports | batterie 30 % = 1 200 mAh → 4 000 | technologie-ia |
| `seconde-prop-proportion` | info_proportion | Aïcha, ingénieure forestière : forêt 17,6 Mha sur ≈ 55 → 32 % ; 75 % privée ; forêt publique 4,4 Mha = 25 % de la forêt mais 8 % du territoire (« pour cent de quoi ») ; communes 2,8 Mha = 16 % | nature-ecologie, histoire-geographie | 150 j'aime sur 2 000 vues = 7,5 % | reseaux-sociaux |
| `stmg-prop-nature-pourcentage` | auto_evo_nature_pourcentage | Moussa, journaliste de données sportives : Paris 2024 16 or sur 64 = 25 % (proportion) ; Tokyo 33 → 64 = +94 % (évolution) ; piège : or +60 % mais part 30 % → 25 % (−5 points) | sport | e-commerce 10 % → 11 % du commerce de détail : +1 point = +10 % | argent-budget |
| `stmg-prop-taux-equivalent` | suiteT_taux_equivalent_proportionnel | Emma, conseillère bancaire : Livret A 3 % (2024), proportionnel 0,25 %/mois → 3,04 % ; équivalent ≈ 0,247 % ; piège 1 %/mois = 12,68 %/an | argent-budget | 1 %/mois ≠ 12 %/an | argent-budget, jeux-defis |

Questions en commentaire : calculer 90/180 = 50 % ; formes l'intrus 0,5 ; appliquer 4 % de 75 = 3 ; pourcentage de pourcentage 18 %, 9 buts sur 50 ; partie-tout 39 Go ; tout-partie 4 500 mAh ; seconde 4,5 % ; nature 5 points, +25 % ; taux 2 %/mois ≈ 26,8 %/an.

### Sources (à recopier en tête des scripts)
- RTE, Bilan électrique 2024, principaux résultats : nucléaire 361,7 TWh (67,1 %), hydraulique 75,1 (13,9 %), éolien 46,8 (8,7 %), solaire 24,8 (4,6 %) → total ≈ 539 TWh.
- USGS / ordre de grandeur classique : ≈ 97 % de l'eau de la Terre est salée ; ≈ 2/3 de l'eau douce dans les glaces.
- Physiologie : eau ≈ 60 % de la masse d'un adulte ; sang ≈ 7 %.
- Fevad, bilan 2024 : 175,3 Md€ (+9,6 %), produits 66,9 Md€ (≈ 38 %), services 108,4 ; places de marché 31 % des produits ; part du e-commerce dans le commerce de détail 11 % (10 % en 2023).
- Pesanteur : ISS ≈ 400 km, g ≈ 8,7 m/s² (≈ 89-90 %) ; Lune 1,62 (16,5 %) ; Mars 3,71 (37,8 %).
- Citepa, Secten 2024 : 373 Mt CO2e en 2023 (396 en 2022), transports 126,8 Mt = 34 % (131,2 Mt = 33,1 % en 2022).
- SDES / IGN : forêt 17,6 Mha en 2024 = 32 % du territoire métropolitain ; ≈ 75 % privée, 16 % communale, 9 % domaniale (ministère, 2022).
- JO : Paris 2024 France 64 médailles (16 or, 26 argent, 22 bronze) ; Tokyo 2020 (2021) 33 (10 or).
- Livret A : 3 % du 1er août 2023 au 31 janvier 2025 (service-public.fr).

## ⏭ Reste à faire
1. ✅ Voix validées le 02/11. Ceintures proposées retenues.
   Vagues d'agents (brief `manim/brief-agent-proportionnalite-lycee.md`) : vague 1 lancée le 02/11 = calculer (1re + STMG), seconde proportion, 1re partie-tout ; vague 2 = formes, appliquer, tout-partie ; vague 3 = pourcentage de pourcentage (2de + 1re + STMG), nature du pourcentage, taux équivalent. Scripts `manim/scripts/<premiere|seconde|stmg>/prop_lycee_<slug>[_short].py`.
   État : ✅ 2de 01 proportion + 1re 04 partie-tout (`ca9045a5`), 01 calculer 1re + STMG (`60e51630`) FINIS et vérifiés ; ⏳ formes, appliquer, tout-partie en cours ; reste la vague 3.
   Planche : `planche.py <mp4> <png> t1 t2 …` (copie dans le scratchpad de la session, original `C:/Users/FRED/AppData/Local/Temp/claude/lycee-partie-tout/planche.py`).
2. ✅ Brief écrit : `manim/brief-agent-proportionnalite-lycee.md` (modèle `manim/brief-agent-proportionnalite-cm.md`, adapté : cadre lycée, ton sérieux, sources en en-tête, sous-classes 2 ou 3 classes, `canvas_proportion.py` en lecture seule). Modèles : `manim/scripts/6e/prop_*.py`, `manim/scripts/4e/prop_*.py` (lot 5, pourcentages), `manim/scripts/cm1/prop_*.py` (épisodes communs). Scripts communs dans `manim/scripts/premiere/prop_<slug>.py` (sous-classes `Prop<Slug>Premiere`, `…Stmg`, `…Seconde`).
3. 3 agents neufs au plus ; vérifier soi-même chaque épisode (dry run 0 RETARD / 0 AUDIT-AVANCE, `scripts/verifier-bords-video.py` = 0 instant, planche) ; section « Lycée » dans `manim/questions-proportionnalite.md`.
4. Passe finale comme `e9b19c20` / `b8564150` : miniatures, manifeste (chapitres par dry run), `python scripts/fiches-youtube.py`, R2 (seulement nos fichiers, `rclone check`), table R2 + bilans, `node scripts/brancher-videos-coach.mjs --id … --ecrire`. Outils de la passe CM-A : scratchpad `7a13429e-…` (`miniatures_cma.py`, `construire_cma.py`, `appliquer_manifeste.py`, `appliquer_r2_bilans.mjs`, `temps/lancer.sh`). Manifeste, `lib/videos/videos-r2.json` et `bilans-videos.json` ont des lignes non commitées d'autres sessions : index = HEAD + nos ajouts (`git hash-object -w` + `git update-index --cacheinfo`).

Ne pousse rien sans le signal du soir de Frédéric.
