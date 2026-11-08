# Reprise : série DIVISIBILITÉ ET NOMBRES PREMIERS 4e (07/11/2026)

Notions du coach `divisibilite` (7 micros) et `nombre_premier` (4 micros). Une paysage Manim et un short en dessin animé Ti Margo par micro : **22 vidéos**. Aucune vidéo n'existait pour ces notions.

Modèle : la série Relatifs 4e (`manim/REPRISE-relatifs.md`, à lire en entier). Règles : `manim/REGLES.md`. Shorts : socle commun `prototypes/ti-margo/LISEZ-MOI.md` + `scripts/ti-margo-short.mjs` (ne pas recopier de page).

## ✅ 08/11 : POUSSÉ (`11cc6a20`) ET BRANCHÉ AU COACH, sur l'ordre de Frédéric (« pousse »)

- Les 22 vidéos sont au coach en production (`brancher-videos-coach.mjs --id … --remplacer --ecrire`) : 19 nouvelles lignes, et 3 shorts YouTube de la série « bases » (autre classe) remplacés par nos shorts R2 sur `premier_definition`, `premier_determiner`, `premier_decomposer`. Relecture : 22 branchées, 0 à brancher. Pages /video/<id> en 200.
- Reste : son écoute (bruitages des shorts, son en général), puis YouTube (date à fixer à la place du `pas_avant` 2026-12-01).

## ÉTAT FINAL 08/11 matin (après la passe finale)

**Les 22 vidéos sont rendues, contrôlées et sur R2 (77 fichiers vérifiés à la taille). Rien n'est poussé, rien sur YouTube, le coach n'est pas branché, rien n'a été écouté.**
Commits : `92aff69f` (manifeste HEAD + 22 entrées, `manim/miniature_divisibilite.py`, `manim/passe_divisibilite.py`), `1bfeb0fe` (les 10 films, barre du compte à rebours), `820415f9` (table R2 + feuilles bilan, HEAD + nos 22 entrées).

- Miniatures des 11 paysages : `python manim/miniature_divisibilite.py` (« COMPRENDRE X », « EN N MIN » lu dans le mp4, ceinture), regardées ; vignettes webp refaites (`scripts/vignettes-videos.py`).
- Manifeste : 22 entrées `4e-div-*` et `4e-premier-*`, `pas_avant: 2026-12-01` (prudence). Chapitres et questions relevés dans l'AUDIO des mp4 (`python manim/passe_divisibilite.py temps`, puis `manifeste`), pas estimés ; les chapitres de moins de 10 s sont réunis automatiquement (2-5-10, 08, 10). Playlists Cycle 4 + CRPE : calculées par `publier-youtube.mjs` depuis la classe. `fiche-youtube.md` dans chaque dossier (`scripts/fiches-youtube.py 4e-div`, `4e-premier`).
- Barre du compte à rebours : `div#rebours{display:block;}` ajouté au style de chacun des 10 autres films (seul `divisibilite-probleme.js` l'avait) ; les 10 shorts re-rendus, barre vue sur les 11, planches 01, 03, 09 regardées, durées image = son, `_muet.mp4` effacés. Coupes de `LecteurVideo.tsx` recontrôlées (mp4 − (« Mets » + 0,03)) : écarts ≤ 0,01 s, rien changé.
- R2 : `scripts/r2-videos.ps1 -Rclone "copy manim/sorties/4e/maths/divisibilite R2:4e/maths/divisibilite --include *.{mp4,png,jpg,webp}"` (jamais `-Envoyer`), puis `check --size-only` : 0 différence.
- `Validé : non` reste dans les 11 `publication.md`.

**Il reste, sur l'ordre de Frédéric SEULEMENT :**
1. Écoute : les bruitages des shorts, et le son en général (rien n'a été écouté).
2. Push, le soir.
3. Après le push seulement, en production :
   `node scripts/brancher-videos-coach.mjs --id 4e-div-multiple,4e-div-multiple-short,4e-div-critere-2-5-10,4e-div-critere-2-5-10-short,4e-div-critere-3-9,4e-div-critere-3-9-short,4e-div-euclidienne,4e-div-euclidienne-short,4e-div-diviseurs,4e-div-diviseurs-short,4e-div-probleme,4e-div-probleme-short,4e-div-defi,4e-div-defi-short,4e-premier-definition,4e-premier-definition-short,4e-premier-determiner,4e-premier-determiner-short,4e-premier-decomposer,4e-premier-decomposer-short,4e-premier-defi,4e-premier-defi-short --ecrire`
4. YouTube : date à choisir à la place du `pas_avant` de prudence.

## ✅ 08/11 4 h 30 : LES 22 VIDÉOS RENDUES ET COMMITTÉES (pas poussées)

Frédéric a dit « ok » au pilote 05 ; les 20 autres faites sans redemander, un agent par épisode.
- Faits, contrôlés (planches regardées, bords 0 sur les paysages), committés, PAS poussés : paysages 01, 02, 03, 04, 06, 07, 09, 10, 11 et les 10 shorts (01-04, 06-11), avec miniature et `publication.md` (`Validé : non`) dans `manim/sorties/4e/maths/divisibilite/NN-<slug>/`.
- Commits : `ec9f1363` (`div_commun.py`, série `premiers`), puis un par épisode (`3d6a065d` 01, `2c40b05a` 02, `f5898ad5` 03, `af0db4e5` 04, `50bb7abc` 06, `b83d795b` 07, `bd99f9d4` 09, `4ed42af3` 10, `87bdf918` 11), `bdb6d5a1` (les 20 coupes de `COUPE_PAR_VIDEO`, les `-cues.js`).
- ✅ **Paysage 08** `manim/scripts/4e/premier_definition.py` (`PremierDefinition4e`, Mia mosaïste, ceinture orange) : rendue -qh, `08-definition/eleveai-maths-4e-premier-definition.mp4` (3 min 09,5, son 3 min 08,2), `verifier-bords-video.py` = 0, planche regardée (13 écrans, rien qui chevauche), dossiers `media-div-08*` supprimés. Commit `7cb3e0c3` (script, marques, `films/premiers-definition.js`). Sa boucle `tas()` tournait sans fin : corrigée avec un garde-fou. Coupe (8,4 et 4,17) déjà dans `LecteurVideo.tsx`.
- Fichiers des shorts : `films/divisibilite-<ep>.js` (01-07), `films/premiers.js` + `premiers.json` + `premiers-<ep>.js` (08-11, sorties `NN-<ep>`).
- Pièges vus : le cache `media/texts` partagé par plusieurs rendus en parallèle donne des SVG vides → lancer le dry run avec son propre `--media_dir` ; `lg` à x > 1 réduit le texte sans `maxw` ; la barre du compte à rebours des shorts est invisible (`#rebours`), réactivée dans `divisibilite-probleme.js` seulement ; `equation_commun.py` perd deux mots muets de suite (contourné dans `premier_defi.py`) ; `verifier-bords-video.py` compte des « bords » sur tous les shorts 3D (le décor remplit l'image), c'est normal.
- Finales : léger retard (0,5-0,8 s) de la première ligne de « Ce que tu as appris », comme sur le pilote validé.
- Reste ensuite (sur l'ordre de Frédéric) : son écoute (bruitages des shorts, rien n'a été écouté), passe finale comme les Relatifs (miniatures paysage, manifeste en AJOUT, `fiches-youtube.py`, R2 par `rclone copy` du seul dossier `divisibilite`), push le soir, PUIS `brancher-videos-coach.mjs --ecrire`, YouTube.

## ✅ 07/11 fin d'après-midi : PILOTE 05 RENDU (`304dce63`), en attente du oui de Frédéric

- Paysage `manim/scripts/4e/div_diviseurs.py` (3 min 01) et short `prototypes/ti-margo/films/divisibilite.js` (`FILMS.diviseurs`, 1 min 20), dans `manim/sorties/4e/maths/divisibilite/05-diviseurs/` (+ miniature, `publication.md` Validé : non). Coupes de fin dans `components/LecteurVideo.tsx` (8,4 et 4,17).
- `films/divisibilite.json` couvre les épisodes 01 à 07 (`4e-div-<ép>-short`) ; les 08 à 11 iront dans une série `premiers` (`4e-premier-<ép>-short`). Les autres films : `films/divisibilite-<ép>.js`, ils réutilisent `voixDe`, `poserTableau`, `tournesol`, `rect`, `fleche`, `gestes`, `poserMiniature` (copiés de `decimaux.js`, avec « ÷ » qui consomme « divisé par »).
- Paysage : `massif(l, c)`, `en_vrac`, `colorer_paire`, `table_paires`, `liste` + `arcs` dans `div_diviseurs.py` : à déplacer dans un `div_commun.py` pour les épisodes suivants.
- Pièges vus : `lg` à x = 3,2 déborde avec `insister` (mettre `maxw=5.6`) ; question-pause : couper la question en deux lignes (`eq_dans_q(0, …)` deux fois) ; la machine partagée rend le dry run lent (jusqu'à 10 min).
- Après son oui : les 20 autres, sans redemander.

## (historique) 07/11 après-midi : Frédéric a VALIDÉ les 22 voix (« Oui, lance le pilote »)

Pilote = épisode 05 `diviseurs` (paysage + short). **Rien n'est encore généré** : la génération de voix a été interrompue avant d'écrire quoi que ce soit (`public/sons/4e-div-*` n'existe pas).

Commandes exactes, dans l'ordre (depuis la racine du dépôt) :
1. Voix : `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/generer-voix.ps1 -Fichier manim/voix/4e-div-diviseurs.json -Debit -6`, idem `4e-div-diviseurs-short.json` (sort dans `public/sons/<nom>/`, en arrière-plan si long).
2. Marques paysage : `powershell -File scripts/marques_dump.ps1 -Fichier manim/voix/4e-div-diviseurs.json -Sortie <tmp> -Debit -6`, puis `python manim/scripts/4e/equation_commun.py manim/voix/4e-div-diviseurs.json <tmp>.cues.tsv manim/scripts/4e/div_diviseurs_marques.json`.
3. Script : `manim/scripts/4e/div_diviseurs.py`, classe `DivDiviseurs4e(PaysageRel)` importée de `relatif_commun` (ou un `div_commun.py` qui réexporte `relatif_commun` + une grille de rosiers). Modèle ligne à ligne : `relatif_multiplication.py` (API : `self.ecran`, `self.dit(self.lg(...), "phrase exacte")`, `F`/`E` + `self.dire_eq`, `self.au`, `self.insister`, `question_pause(cle_q, cle_r, [ligne], [3 E], bonne, [réponse], avant_q, autres_r)`, `finale_colonne`, `page_abonnement("08-abonne")`). Ceinture orange. Visuel : les rosiers en rectangles 1×36, 2×18, 3×12, 4×9, 6×6, chaque paire de diviseurs qui s'allume ; les deux listes qui se croisent.
4. `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD), brouillon `-ql` + planche, UN rendu `-qh --disable_caching --media_dir manim/scripts/4e/media-div-05`, copie vers `manim/sorties/4e/maths/divisibilite/05-diviseurs/eleveai-maths-4e-div-diviseurs.mp4`, `python scripts/verifier-bords-video.py` = 0, planche finale.
5. Short : `prototypes/ti-margo/films/divisibilite.js` (copie de `_modele.js`) + `divisibilite.json` (`voix: 4e-{ep}-short`… attention : les voix s'appellent `4e-div-<ep>-short` et `4e-premier-<ep>-short`, prévoir le préfixe dans le JSON ou deux séries `divisibilite` / `premiers`) ; film `FILMS.diviseurs` (décor jardin de tournesols, Ti Margo plante 24 tournesols en rectangles, PARI dans l'accroche) ; `python scripts/ti-margo-cues.py divisibilite diviseurs`, `controle`, `miniature` (« TU PARIES ? », ceinture, « Film d'animation 3D »), `film`, `publication.md` (`Validé : non`).
6. Montrer les deux pilotes à Frédéric (sans lancer la lecture), attendre son oui, puis les 20 autres sans redemander.

## (historique) voix écrites, en attente de son oui

- Les 22 voix sont dans `manim/voix/4e-div-<slug>[-short].json` et `manim/voix/4e-premier-<slug>[-short].json`, collées en entier à Frédéric le 07/11.
- **Rien n'est généré ni rendu** (ni WAV, ni marques, ni script Manim, ni film). On attend sa validation (mémoire `script-video-se-valide-a-deux`). S'il corrige une phrase : corriger le JSON, puis seulement après générer la voix.
- Déroulé ensuite, comme pour les Relatifs : un pilote paysage + un pilote short (proposer l'épisode 05 `diviseurs`, rectangles très visuels), montrés à Frédéric ; puis le reste sans redemander.

## Coach vérifié AVANT les vidéos (07/11)

- Squelettes (`npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e divisibilite nombre_premier`) : 11 micros au vert, aussi en texte seul et avec `--lettres` (pire : `premier_determiner` ★4 2,7 sur 20).
- Correcteurs : 26 gabarits justes sur 500 tirages chacun, 0 faux (script ponctuel sur `CORRECTEURS_4E` ; `verifier-correcteurs-maths-6e.ts 4e` plantait ce jour-là sur `6e/durees.bank.ts` en cours d'écriture par une autre session).
- Fiches d'exercices : `verifier-exercices-divisibilite-4e.mjs` 28/28, `verifier-exercices-nombres-premiers-4e.mjs` 25/25. `verifier-generateurs.mjs 4e maths` : rien sur ces notions.
- ✅ Corrigé `01933c03` : à ★2-★3 de `div_multiple_diviseur`, la bonne réponse était TOUJOURS « m est un multiple de d ». Elle est maintenant « d est un diviseur de m » une fois sur deux (la micro doit faire dire la relation dans les deux sens). 219 → 286 squelettes.
- À surveiller, non corrigé : `premier_determiner` ★4, 74 % des QCM ont pour réponse « pas premier : divisible par … ».
- Les modifs non commitées de la banque signalées le matin avaient été committées par une autre session (`62443de7`, 11 h 36) : rien à coordonner.

## Épisodes

| NN | slug | micro | ceinture paysage | ceinture short | centres | métier (paysage) | short (décor) |
|---|---|---|---|---|---|---|---|
| 01 | multiple | div_multiple_diviseur | jaune | jaune | musique, art-design | Awa, chorégraphe | Les caisses du quai |
| 02 | critere-2-5-10 | div_critere_2_5_10 | jaune | jaune | cuisine | Hugo, pâtissier | La loupe (écran de stade) |
| 03 | critere-3-9 | div_critere_3_9 | orange | orange | transports | Théo, logisticien | Ti Margo magicien |
| 04 | euclidienne | div_euclidienne | orange | orange | corps-sante | Jules, pharmacien | Les cookies (cuisine) |
| 05 | diviseurs | div_lister_diviseurs | orange | orange | nature-ecologie | Rose, paysagiste | Les tournesols (jardin) |
| 06 | probleme | div_probleme | verte | orange | espace | Adam, animateur de planétarium | Les deux phares (nuit) |
| 07 | defi | div_defi | verte | orange | jeux-defis | Chloé, créatrice d'escape games | Le coffre à code |
| 08 | definition | premier_definition | orange | jaune | art-design | Mia, mosaïste | La parade des 13 musiciens |
| 09 | determiner | premier_determiner | verte | orange | animaux, sciences | Salomé, entomologiste | Les cigales (forêt) |
| 10 | decomposer | premier_decomposer | verte | orange | technologie-ia | Nathan, ingénieur en cybersécurité | Le marteau (chantier) |
| 11 | defi | premier_defi | verte | verte | jeux-video | Elsa, organisatrice de tournois de jeux vidéo | Le plateau de quiz |

Ceintures : seulement jaune, orange, verte (comme les Relatifs) ; les autres se fixent avec Frédéric.
Voix : `4e-div-<slug>` pour 01 à 07, `4e-premier-<slug>` pour 08 à 11 (`4e-premier-defi` ≠ `4e-div-defi`).

## Ce que les voix respectent (à garder si on les retouche)

- Paysage : garde (nom + question), situation concrète portée par un métier, méthode, **2 questions-pauses** (3 choix, leurres = erreurs typiques), piège, défi + correction, « Ce que tu as appris », phrase de fin paysage.
- Short : accroche avec un PARI (« Tu paries… ? »), un défi et pas un mini-cours, **1 question-pause** (compte à rebours 3 s), question chiffrée « Réponds en commentaire ! », phrase de fin short. Décors tous différents.
- Aucun contexte réunionnais (règle des 4 %), aucune division écrite en fraction : la voix dit « divisé par », l'écran écrit « ÷ ». Les seules fractions sont celles de l'épisode 10 (84 sur 126, 2 sur 3).
- Voix = écrit : chaque nombre dit s'écrit à l'écran. « 2, un chiffre caché, 6 » s'écrit « 2 ? 6 ».
- Réponses des questions en commentaire (pour le manifeste et les réponses aux élèves) : 01 oui (56 = 8 × 7) ; 02 1 000 ; 03 2 (522) ; 04 2 (100 = 7 × 14 + 2) ; 05 8 ; 06 36 s ; 07 6 (360) ; 08 10 ; 09 3 (83, 89, 97) ; 10 2 × 3 × 5 × 5 ; 11 9.

## Fichiers à créer après son oui

- Paysages : `manim/scripts/4e/div_<slug>.py` et `premier_<slug>.py`, un module commun `div_commun.py` (repartir de `relatif_commun.py` : `PaysageRel`, audit, bords). Sorties `manim/sorties/4e/maths/divisibilite/NN-<slug>/` (NN = 01 à 11).
- Shorts : `prototypes/ti-margo/films/divisibilite.js` + `divisibilite.json` (voix `4e-…-short`, `{num}` de 01 à 11), un fichier `films/divisibilite-<ep>.js` par épisode si plusieurs sessions travaillent.
- Chaîne de rendu, pièges, passe finale (miniatures « TU PARIES ? » + « Film d'animation 3D », manifeste en AJOUT, `fiches-youtube.py`, R2 par `rclone copy` du seul dossier, `COUPE_PAR_VIDEO` = « Mets » + 0,03 s pour chaque short) : exactement comme dans `manim/REPRISE-relatifs.md`.
- Coach : `brancher-videos-coach.mjs --ecrire` seulement APRÈS le push du soir.

## Ne pas toucher

`short.js` / `personnage.js` sans petit changement contrôlé (partagés avec Triangles, Relatifs, Décimaux) ; le manifeste en entier (ajouter des entrées seulement) ; rien sur YouTube sans son ordre ; pas de push. Commit PAR CHEMIN.
