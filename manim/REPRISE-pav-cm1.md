# Reprise — série PÉRIMÈTRE, AIRE, CONTENANCE, SOLIDES du CM1

Plan cochable : `manim/PLAN-perimetre-aire-volume.md`, section « ## CM1 ». Rien n'est poussé (c'est le chef d'orchestre qui pousse).

## Règles de la série
- Pas de doublon avec le CE2 : `perimetre_comprendre` (CM1) = vidéo CE2 `ce2_perimetre_comprendre` reliée par `aussi`.
- Ordre : AIRE d'abord (absente du CE2), puis triangle, quadrilatère, polygone et défi de périmètre au niveau CM1, puis contenance, puis solides.
- Paysage en Manim, short en DESSIN ANIMÉ Ti Margo (CM1 < 4e).
- Voix validée À DEUX avant tout rendu. RAM : verrou `%TEMP%\eleveai-rendu-hd.lock`, un seul rendu HD sur le PC, aperçus `-ql` scène par scène, ≥ 2,5 Go libres.

## État au 13/11/2026
| Ép. | Micro | Voix | Métier / décor | Questions (bonne réponse) | État |
|---|---|---|---|---|---|
| 1 | `aire_comprendre` | `voix/cm1-aire-comprendre(.json, -short.json)` | Mathis, carreleur (cuisine 3 × 5 = 15 carreaux ; plinthe = périmètre) ; short : Ti Margo achète de la ficelle pour couvrir sa cabane | paysage B, A ; short C | ✅ voix validée 13/11 |
| 2 | `aire_unite` | `voix/cm1-aire-unite(…)` | Awa, créatrice de jeux vidéo (îles en cases ; grande case = 4 petites) ; short : tablettes de chocolat, gros carré = 2 petits | paysage C, B ; short A | ✅ voix validée 13/11 |
| 3 | `aire_carre_rectangle` | `voix/cm1-aire-carre-rectangle(…)` | Lina, maraîchère (4 rangées de 6 m² = 24 m² ; carré 5 × 5) ; short : Ti Margo compte 8 × 5 carreaux un par un | paysage A, C ; short B | ✅ voix validée 13/11 |

Centres d'intérêt proposés : ép. 1 construction, art-design ; ép. 2 jeux-video ; ép. 3 nature-ecologie, cuisine.
Ceintures (proposées, validées avec les voix le 13/11) : paysages jaune (ép. 1-2) et verte (ép. 3) ; shorts blanche.

## Fait le 13/11 après-midi (session 1, passée la main à 55 % de contexte)
- ✅ Voix validées par Frédéric (« Oui, valide les 3 ») ; ceintures et « mètre carré » acceptés avec.
- ✅ WAV générés (Julie, débit −6) : `public/sons/cm1-aire-{comprendre,unite,carre-rectangle}[-short]/` (ignorés par git).
- ✅ Marques : `python manim/scripts/cm1/aire_marques.py` → `manim/scripts/cm1/aire_<slug>_marques.json` (0 mot introuvable).
- ✅ Module commun `manim/scripts/cm1/aire_cm1_commun.py` : base `PaysageAireCM1` (= `PaysageCalculPose` 6e, identité CM1, ceinture jaune), `carreau`, `rect_cases`, `figure_cases`, `rangee`, `contour` (plinthe orange), `numeros` (hors audit), personnages `mathis`, `awa`, `lina`.
- ✅ Script ép. 1 `manim/scripts/cm1/aire_comprendre.py` (`AireComprendreCM1`) écrit. Dry run : 0 AUDIT-AVANCE, 0 BORD ; il reste 1 TARD (« 10 » de la ligne « 10 + 3 = 13 » à la correction 08b, 1,57 s : le 10 est redit à l'écran après « 5 plus 5, 10 ») ; le `TransformFromCopy` n'a pas suffi. Piste : écrire la 2e ligne « + 3 = 13 » sous le 10, sans réécrire le 10 (calcul en colonne), ou faire descendre le 10 lui-même (`l1[1].animate.move_to(...)`).
  Commande de filtre utile : `tr '\r' '\n' < log | grep -E "AUDIT-|TARD |BORD |RETARD|ECART|INTRA|Traceback"`.
- Questions : 05 à 00:57 (réponse 1 = B), 07 à 01:49 (réponse 0 = A) (valeurs du dry run, à reprendre pour le manifeste).

## Fait le 13/11 fin de matinée (session 2)
- ✅ **Ép. 1 FINI** : dernier TARD réglé (le « 10 » redit de la correction 08b passé `hors_audit`) ; planche -ql relue deux fois, corrigés : lignes à deux couleurs empilées (`pile()` ajouté au commun) aux écrans 03 et 04, piège réparti sans chevauchement, choix de la question 2 plus courts (fs 26), « Mets pause » au-dessus de Ti-Margo (`pause_defi(y=-1.6)`), « 5 + 5 = 10 » aéré. Dry run AUDIT propre (seul « 974 »).
  - Paysage HD 3 min 20 (`manim/sorties/cm1/maths/aire/01-comprendre/`), `verifier-bords-video.py` = 0. Miniature : `python manim/miniature_aire_cm1.py comprendre` (les 3 épisodes y sont déjà décrits).
  - Short dessin animé 71 s : série Ti Margo `cm1-aire` (`prototypes/ti-margo/films/cm1-aire.json`, `cm1-aire.js` = `FILMS.comprendre`), outils communs de TOUS les shorts CM1 dans `films/cm1-commun.js` (chargé tout seul par page.html pour les séries `cm1-*` : voix mot à mot, ardoise, miniature « Dessin animé », `carreauCraie`, `solVide`, `tourCraie`). Instants : `python scripts/ti-margo-cues.py cm1-aire <ép>`. Miniature « Ficelle ou carreaux ? TU PARIES ? » + « Dessin animé ».
  - Manifeste : `cm1-aire-comprendre` + `-short`, `pas_avant` 2026-12-26 (questions 00:57 B, 01:49 A ; short 00:23 C). Mes entrées sont dans `scratchpad/manifeste-aire-cm1.json` de la session 2 ; à défaut, les relire dans le manifeste. Fiche YouTube écrite. R2 : envoyé SEUL ce dossier (`r2-videos.ps1 -Rclone "copy …ire R2:cm1/maths/aire --include *.{mp4,png,webp}"`), `generer-videos-r2.mjs`, coach branché (`brancher-videos-coach.mjs --id … --ecrire`, 2 vidéos).
  - Matrice métiers : pas de lignes CM1 dans `metiers-college.ts`, rien à marquer.
- ⏳ Ép. 2 `aire_unite.py` (`AireUniteCM1`) écrit, dry run AUDIT propre ; reste planche -ql, HD, short (`FILMS.unite` à écrire dans `films/cm1-aire.js`), publication. Dates prévues : ép. 2 le 28/12, ép. 3 le 30/12.
- ⏳ Ép. 3 `aire_carre_rectangle.py` (`AireCarreRectangleCM1`) écrit, pas encore lancé.

## Prochaine étape
1. ~~Ép. 1~~ (fait). Ép. 2 et 3 paysage : dry run propre → planche `-ql` scène par scène (RAM ≥ 2,5 Go, un seul process) → relire les écrans (chevauchements, rognage) → HD sous verrou `%TEMP%\eleveai-rendu-hd.lock` (`-qh --disable_caching … -o eleveai-maths-cm1-aire-comprendre --media_dir manim/scripts/cm1/media-aire-01`) → `python scripts/verifier-bords-video.py` = 0 → sortie `manim/sorties/cm1/maths/aire/01-comprendre/`.
2. Short ép. 1 en dessin animé : socle Ti Margo (`prototypes/ti-margo/LISEZ-MOI.md`, `scripts/ti-margo-short.mjs`), modèle `prototypes/ti-margo/films/calcul-pose-*.js`, mention « Dessin animé » dans la miniature.
3. Miniature paysage (`manim/miniature.py`), manifeste (≤ 2 paysages et 5 vidéos par jour, places libres après le 24/12, champs `questions`, `centres`), `python scripts/fiches-youtube.py`, R2, `scripts/brancher-videos-coach.mjs`. Marquer `V` au carreleur dans la matrice métiers si la classe y est.
4. Ép. 2 (`aire_unite`) et 3 (`aire_carre_rectangle`) : même chaîne (voix et marques déjà prêtes, scripts à écrire sur le modèle de `aire_comprendre.py`).
5. Écrire ensuite les voix de `aire_composer` et `aire_defi` (validation à deux).
- Rien committé, rien poussé. Commit par chemin seulement, pas de push (le chef d'orchestre pousse).
