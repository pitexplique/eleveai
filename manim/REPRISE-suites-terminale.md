# Reprise : série SUITES, épisodes de TERMINALE (28 à 38), session sœur, 11/11/2026

Session sœur de la session fille `suites-lycee` (qui rend 02 à 27 et fait TOUTE la passe finale : miniatures, manifeste, R2, coach, YouTube). Ici : rendu seulement des 11 épisodes de Tle (22 vidéos), 2 agents à la fois au plus.
Mission commune des agents : dossier de notes de `suites-lycee` (`mission-commune.md`) ; rapports complets `ep-28.md` à `ep-38.md` au même endroit.
Scripts `manim/scripts/terminale/suite_<slug>.py` (`Suite<Slug>Tle`) + `_short.py` (`Suite<Slug>Short`) ; ils importent `manim/scripts/premiere/suites_commun.py`.
Sorties `manim/sorties/terminale/maths/suites/NN-<slug>/`. Ceintures : paysage verte (32, 38 bleue), short blanche. Rien poussé.

## État
| Ép. | Slug | Micro | Lettres (paysage ; short) | État |
|---|---|---|---|---|
| 28 | reconnaitre | suite_reconnaitre | 04 C, 07 A ; B | ✅ `a98ce8ba` + `af285329` (5:11 / 1:11), relu, bords 0 |
| 29 | recurrence-preuve | suite_recurrence_preuve | 06 B, 08 C, 10 A ; C | ✅ `ae350d97` + `562b7d8b` + `584f95d3` (5:42 / 1:13), relu, bords 0 |
| 30 | variation | suite_variation | 04 A, 07 B ; A | ✅ `d413f550` + `bca6781d` (4:18 / 1:15), relu, bords 0 |
| 31 | bornee | suite_bornee | 04 C, 07 B ; C | ✅ `55969ebb` (3:59 / 1:24), relu, bords 0 ; questions 01:10 C, 02:21 B ; short 00:28 C |
| 32 | defi (bleue) | suite_defi | 04 B, 06 A, 09 C ; B | ✅ `66bee7b1` (6:17 / 1:07), relu, bords 0 |
| 33 | limite-interpreter | limite_suite_interpreter | 04 A, 08 C ; A | ✅ `1b32d10c` + `6f85ce6a` (4:58 / 1:24), relu, bords 0 ; questions 01:10 A, 03:01 C ; short 00:37 A |
| 34 | limite-calculer | limite_suite_calculer | 04 B, 06 A ; C | ✅ `8eb50db8` + `2e27f97f` + `f99754fd` (4:32 / 1:14), relu, bords 0 ; questions 01:14 B, 02:06 A ; short 00:29 C |
| 35 | limite-operations | limite_suite_operations | 04 C, 07 B ; B | ✅ `2e27f97f` + `c5335870` (4:19 / 1:05), relu, bords 0 ; questions 01:03 C, 02:12 B ; short 00:25 B |
| 36 | limite-comparaison | limite_suite_comparaison | 04 A, 07 C ; A | à rendre |
| 37 | limite-monotone-bornee | limite_suite_monotone_bornee | 04 B, 07 A ; C | à rendre |
| 38 | limite-defi (bleue) | limite_suite_defi | 04 C, 06 B, 09 A ; B | à rendre |

## Journal
- 11/11 : session ouverte, agents 28 et 29 lancés.
- 11/11 : ép. 29 rendu (`ae350d97`), planches relues : 8 défauts mineurs renvoyés à l'agent (espaces autour de ≤, indices petits, copie serrée, en-tête de correction petit, « appris » vide, boutons du short 28 pt, ligne de base du short).
- 11/11 : ép. 28 rendu (`a98ce8ba`), relu : retouches demandées (motif sur @eleveai974 en fin, croix trop épaisses, « + 120 » sur les points, titre du short sur l'échelle des ceintures, interlignes).
- 11/11 : ép. 28 ACCEPTÉ (`af285329` retouches). ⚠️ Trouvé : l'étincelle `Flash` de la fin commune (`suites_commun.py`) se pose sur « @eleveai974 », ce qui touche AUSSI le pilote et les épisodes 02-27. L'ép. 28 la redéfinit dans son script. Signalé à la session mère (note `etincelle-fin-commune.md` dans son dossier de notes). Ép. 30 lancé.
- 11/11 : la session mère a corrigé la fin commune (`524b48bd`, `Indicate` au lieu du `Flash`) : les épisodes suivants ne la redéfinissent plus. Les vidéos déjà rendues avec l'étoile seront refaites par la session mère en fin de série.
- 11/11 : ép. 29 ACCEPTÉ (`584f95d3`). Ép. 31 lancé (30 en cours).
- 11/11 : ép. 30 ACCEPTÉ (`bca6781d`). Ép. 32 lancé (31 en cours).
- 11/11 ~9 h 40 (Réunion) : le chef d'orchestre a demandé de ne lancer AUCUN nouveau rendu -qh pendant ~40 min (RAM à 0,46 Go). La session Calcul mental 6e (local_ab9a90af…) préviendra. Agents 31 et 32 : ils finissent le rendu en cours, sans en lancer d'autre.
- 11/11 ~13 h : HD libre (4 Go libres). Ép. 32 ACCEPTÉ (`66bee7b1`). Ép. 33 lancé ; ép. 31 en rendu HD final (`b5f772ea`).
- 12/11 ~3 h 40 : ép. 34 ACCEPTÉ (`f99754fd` : le short « Tour 20 » ne mélange plus deux tours ; 5 images relues entre 21 et 31 s).
- 12/11 ~5 h : ép. 35 ACCEPTÉ (`c5335870` : les 8 retouches sont vérifiées image par image, à 132, 170, 187, 227 et 247 s pour la paysage, à 9, 34 et 54 s pour le short). Deux `.cues.tsv` de travail ne sont pas suivis dans `manim/scripts/terminale/` (pas committés).
- 12/11 : consigne de Frédéric (usage hebdomadaire presque épuisé) : on s'arrête après 35, sans lancer 36 à 38. Rien n'est poussé de notre côté : la session « Contextez hebdomadaire et vidéos » poussera.

## ⏰ REPRISE samedi 14/11 à 9 h : restent 36, 37, 38
1. Lire `mission-commune.md` et `ep-34.md` / `ep-35.md` (gabarits les plus récents) dans `C:\Users\FRED\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_67461f00-b575-469d-af35-949aecf360b7\`.
2. Lancer un agent par épisode (36, puis 37 ; 38 est le défi en ceinture BLEUE), avec les lettres du tableau ci-dessus. Paysage en ceinture verte, short en ceinture blanche.
3. Circuit : voix `scripts/generer-voix.ps1 -Debit -6` → dry run `AUDIT=1 BORDS=1` (0 AVANCE, 0 RETARD, 0 BORD) → planche -ql relue → HD `-qh --disable_caching` sous le verrou `%TEMP%\eleveai-rendu-hd.lock` (mkdir/rmdir), avec au moins 2 Go libres et au plus 1 autre rendu lourd sur le poste → `python scripts/verifier-bords-video.py` donne 0 → planches finales.
4. RELIRE soi-même : la planche ET des images extraites au ffmpeg aux passages à risque (une image ne doit jamais mélanger deux états, comme le « Tour 20 » du 34). Corriger TOUT défaut mineur.
5. Commit PAR CHEMIN, pas de push. Ensuite, prévenir la passe finale (`local_ef649e63-e539-4aea-9158-c43e5faf6339`) avec le `ep-NN.md` à jour.
