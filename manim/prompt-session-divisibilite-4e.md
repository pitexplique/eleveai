# Reprise : série DIVISIBILITÉ ET NOMBRES PREMIERS 4e (07/11/2026)

Notions du coach `divisibilite` (7 micros) et `nombre_premier` (4 micros). Une paysage Manim et un short en dessin animé Ti Margo par micro : **22 vidéos**. Aucune vidéo n'existait pour ces notions.

Modèle : la série Relatifs 4e (`manim/REPRISE-relatifs.md`, à lire en entier). Règles : `manim/REGLES.md`. Shorts : socle commun `prototypes/ti-margo/LISEZ-MOI.md` + `scripts/ti-margo-short.mjs` (ne pas recopier de page).

## ⏳ ÉTAT : voix écrites, EN ATTENTE DE SON OUI

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
