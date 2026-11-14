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

## Fait le 13/11 midi (session 3, passée la main à 78 % de contexte)
- ✅ **Ép. 2 FINI** : paysage HD 3 min 32 (bords 0) + short dessin animé « Le chocolat pas juste » 63 s (`prototypes/ti-margo/films/cm1-aire-unite.js` = `FILMS.unite`, chargé à part car `cm1-aire.js` contient déjà `FILMS.comprendre`), miniatures, manifeste `cm1-aire-unite` + `-short` le 28/12 (questions 00:54 C, 02:01 B ; short 00:16 A), fiche YouTube, R2 (dossier aire seul), `generer-videos-r2.mjs`, coach branché.
- Commun : `pile()`, `grande_case()`, `traits_de()`, `petites_de()` dans `aire_cm1_commun.py`.
- ⏳ **Ép. 3** `aire_carre_rectangle.py` : dry run `AUDIT=1 BORDS=1` PROPRE (seul « 974 »). Réglés : « 4 × 6 » du piège `hors_audit` (4 et 6 redits), ligne « L'aire est de 21 carreaux. » hors audit (`_ph_sans_audit`), ligne « 3 × 3 = 9. » coupée en deux morceaux (`_ph_couper`) et 3 marques ajoutées à la main dans `aire_carre_rectangle_marques.json` (07b : « 3 fois 3, » mesuré au silence ffmpeg, WinRT les avait perdues — ⚠️ relancer `aire_marques.py` les effacerait). Questions 01:14 A, 02:04 C.
- Reste ép. 3 : planche `-ql` relue, HD sous verrou, bords, short `FILMS['carre-rectangle']` (nouveau fichier `films/cm1-aire-carre-rectangle.js` + `cm1-aire-cues.js` via `python scripts/ti-margo-cues.py cm1-aire carre-rectangle` ; voix `cm1-aire-carre-rectangle-short`, Ti Margo compte 8 × 5 carreaux un par un, réponse B), miniature `python manim/miniature_aire_cm1.py carre-rectangle`, manifeste le 30/12, fiche, R2, coach.
- Puis voix `aire_composer` et `aire_defi` à écrire et valider À DEUX avant tout rendu.
- Outils de la session 3 (scratchpad, à refaire si perdus) : upsert du manifeste depuis un json de mes seules entrées ; indexation git de MES seules entrées dans manifeste / videos-r2.json / bilans-videos.json (partir de HEAD, insérer mes clés sans réordonner).

## Fait le 13/11 début d'après-midi (session 4)
- ✅ **Ép. 3 FINI** : paysage HD 3 min 31 (`manim/sorties/cm1/maths/aire/03-carre-rectangle/`), bords 0, dry run AUDIT propre (seul « 974 », plus aucun TARD).
  - Corrigé à la relecture : phrases de réponse des 2 questions en 34 sous la figure, à gauche (`_ph_haut`, sinon réduites par Ti-Margo à ~20) ; lignes posées DANS L'ORDRE (`poser_lignes` surchargé : `_par_lots` faisait passer « est de 9 carreaux. » avant « L'aire du carré ») ; morceaux de `_ph_couper` invisibles (couleur prise sur le Text parent = noir) → couleur des lettres ; règle « Rectangle : rangées × cases d'une rangée » en 34 sous la parcelle (était en 30 réduite) ; colonne de droite du défi et de la correction élargie (`xl=0.35`) ; « 1 m² » en 32 dans son carreau (débordait).
  - Short dessin animé « Perdu dans les carreaux » 68 s : `prototypes/ti-margo/films/cm1-aire-carre-rectangle.js` (`FILMS['carre-rectangle']`), miniature « 8 rangées de 5 : combien ? TU PARIES ? » + « Dessin animé ».
  - Manifeste `cm1-aire-carre-rectangle` + `-short` le 30/12 (questions 01:14 A, 02:04 C ; short 00:21 B), fiche YouTube, R2 (dossier aire seul), `generer-videos-r2.mjs`, coach branché.
  - Astuce : vérifier un écran sans tout rendre = petite scène qui n'appelle que `ecran_xxx()` + `manim render -s -ql` (dernière image), avec `fichier_marques` en chemin absolu.
- ⏳ **Voix ép. 4 et 5 écrites, PAS validées** : `manim/voix/cm1-aire-composer(-short).json` (Yanis, architecte, appartement en L 12 + 6 = 18 m² ; short : gâteau en L, 8 + 4 = 12 parts) et `manim/voix/cm1-aire-defi(-short).json` (Chloé, peintre en bâtiment, mur 24 − fenêtre 4 = 20 m², 2 pots ; short : Ti Margo et Noé, même tour ≠ même aire). Réponses : ép. 4 paysage C, B ; short C ; ép. 5 paysage A, B ; short A. Ceintures proposées : ép. 4 verte, ép. 5 bleue ; shorts blanche.

## Prochaine étape
1. Frédéric valide les voix 4-5 (à deux) → WAV (Julie, débit −6) → `python manim/scripts/cm1/aire_marques.py composer` puis `defi` (⚠️ jamais sans argument : cela réécrirait les marques de l'ép. 3, dont 3 posées à la main).
2. Scripts `aire_composer.py` et `aire_defi.py` sur le modèle de `aire_carre_rectangle.py` (garder `_ph_haut` et `poser_lignes`), puis la même chaîne : dry run, planche, HD, short, manifeste (places après le 30/12), R2, coach.

## Fait le 13/11 après-midi (session 5, passée la main à 62 %)
- ✅ Voix 4-5 VALIDÉES par Frédéric (après relecture : ép. 5 « carreaux » partout, choix C = 20 m² porte oubliée, short 25 contre 24) ; WAV + marques faits (`aire_marques.py composer defi`).
- Commun : `yanis`, `chloe`, mixin `PhraseAGauche` (`question_gauche(..., haut, sans_audit, couper, q_sans_audit, hors)`) ; l'ép. 3 garde sa copie à lui (pas touché).
- ✅ **Ép. 4 `aire_composer.py`** : dry run propre, planche -ql relue et corrigée, **HD rendu** `manim/sorties/cm1/maths/aire/04-composer/` (3 min 37), bords 0. Questions 01:08 rép 2 (C), 01:56 rép 1 (B).
- ✅ Short 4 « Le gâteau en L » : `prototypes/ti-margo/films/cm1-aire-composer.js`, contrôle relu, film + miniature rendus (`-short.mp4`, `-short-miniature.png`). Épisodes 04-05 déclarés dans `films/cm1-aire.json`, cues composer générées.
- ⏳ Ép. 5 `aire_defi.py` écrit : dry run AUDIT PROPRE (seul « 974 »). Questions 01:02 rép 0 (A), 01:59 rép 1 (B).

## Prochaine étape (session 6)
1. Ép. 4 : miniature paysage (`python manim/miniature_aire_cm1.py composer` — ajouter l'épisode au script s'il n'y est pas), manifeste `cm1-aire-composer` (verte, centres construction/art-design) + `-short` (blanche, question short à lire dans le contrôle : 02-question ≈ 00:21, rép 2) après le 30/12, fiche YouTube, R2 du dossier aire seul, `generer-videos-r2.mjs`, `brancher-videos-coach.mjs --id cm1-aire-composer,cm1-aire-composer-short --ecrire`.
2. Ép. 5 : planche -ql (aperçu complet + images à ECRAN suivant − 1,2 s), HD sous verrou (`media-aire-05`, sortie `05-defi/`), bords ; short `FILMS['defi']` dans `films/cm1-aire-defi.js` (modèle `cm1-aire-composer.js` ; durées WAV : 00 9.5, 01 7.43, 02 13.61, 02b 13.48, 03 4.68, 04 10.52, 05 6.04 ; jardins 5×5 contre 3×8, réponse A) après `python scripts/ti-margo-cues.py cm1-aire defi` ; puis même publication (ceinture bleue).
3. Commit PAR CHEMIN, cocher le plan, mettre à jour la mémoire `serie-aire-cm1.md`. Pas de push.

## Fait le 13/11 après-midi (session 6) — ✅ AIRE CM1 FINIE (5 épisodes)
- ✅ **Ép. 4 publié** : miniature paysage (`miniature_aire_cm1.py composer`, épisodes 04-05 ajoutés au script), manifeste `cm1-aire-composer` (verte, questions 01:08 C, 01:56 B, centres construction/art-design) + `-short` (blanche, 00:21 C, cuisine/jeux-defis) le **31/12**, fiche YouTube, R2 (dossier aire seul), `generer-videos-r2.mjs`, coach branché.
- ✅ **Ép. 5** `aire_defi.py` : planche -ql relue deux fois, corrigés : colonne de droite décalée (`xl=-0.6` écrans 02-03, `-0.9` au piège, sinon réduite contre le bord), piège descendu sous le titre et figures en face de leurs lignes, carré rose écarté du cadre final, pot du défi posé sous la salle (collait au texte), « 2 pots : 20 m², pas assez ! » espacé à la correction. Dry run AUDIT propre (seul « 974 »). HD `05-defi/`, `verifier-bords-video.py` = 0.
  - Short « La clôture de Noé » : `prototypes/ti-margo/films/cm1-aire-defi.js` (`FILMS['defi']`, jardins 5 × 5 contre 3 × 8, réponse A). ⚠️ `mot('02-question','A')` attrapait le « a » de « Qui a le jardin » : `tq('A',2)`.
  - Manifeste `cm1-aire-defi` (bleue, 01:02 A, 01:59 B) + `-short` (blanche, 00:18 A, nature-ecologie/jeux-defis) le **01/01/2027**, fiche, R2, coach.
- Outils session 6 (scratchpad) : `entrees.py <ep> <date> <t short>` (entrées du manifeste depuis le dry run), `upsert-manifeste.py`, `planche5.sh`.

## Prochaine étape (session 7)
Série aire CM1 terminée. Suite du plan CM1 (`PLAN-perimetre-aire-volume.md`) : périmètre du triangle, quadrilatère, polygone, défi (niveau CM1, pas de doublon CE2), puis contenance, puis solides. Voix à écrire puis valider À DEUX avant tout rendu.

## Fait le 13/11 (session 7) — voix PÉRIMÈTRE CM1 ✅ VALIDÉES (« Oui, valide les 8 »), WAV + marques faits
- `manim/voix/cm1-perimetre-{triangle,quadrilatere,polygone,defi}(-short).json` (micros `perimetre_triangle`, `_quadrilatere`, `_polygone`, `_defi` ; `perimetre_comprendre` reste la vidéo CE2 par `aussi`).
- Ép. 1 triangle : Nina, décoratrice de fêtes (fanion 20 + 25 + 25 = 70 cm ; 3 côtés égaux → × 3) ; questions A, C ; short : guirlande de 100 cm pour un fanion de 110 cm, B. Ceinture jaune.
- Ép. 2 quadrilatère : Lucas, encadreur (60 × 40 → (60 + 40) × 2 = 200 cm ; carré 35 × 4) ; piège aire ≠ périmètre ; questions B, A ; short : Ti Margo fait la moitié du tour du terrain, C. Ceinture jaune.
- Ép. 3 polygone : Emma, menuisière (octogone 50 × 8 = 400 cm ; 5 côtés différents = 170 cm ; croix sur chaque côté) ; questions C, B ; short : étoile de Noël à 10 côtés, A. Ceinture verte.
- Ép. 4 défi : Karim, éleveur de chevaux (3 rangées de fil = 3 tours ; côté manquant = périmètre − côtés connus ; carré 36 ÷ 4) ; questions B, C ; short : course d'escargots, côté manquant, A. Ceinture bleue.
- ✅ WAV `public/sons/cm1-perimetre-<ep>[-short]/` (Julie, débit −6, ignorés par git). ✅ Marques : `python manim/scripts/cm1/aire_marques.py perimetre:triangle perimetre:quadrilatere perimetre:polygone perimetre:defi` → `manim/scripts/cm1/perimetre_<ep>_marques.json` (0 mot introuvable). ⚠️ jamais sans argument.
- Prochaine étape (session 8) : scripts `manim/scripts/cm1/perimetre_<ep>.py` sur le modèle de `aire_composer.py` / `aire_defi.py` (base `PaysageAireCM1`, mixin `PhraseAGauche`, personnages à ajouter au commun : `nina`, `lucas`, `emma`, `karim` ; contour orange `contour` pour le tour), puis la chaîne habituelle : dry run AUDIT=1 BORDS=1 → planche -ql relue → HD sous verrou (`media-perimetre-0N`, sortie `manim/sorties/cm1/maths/perimetre/0N-<ep>/`) → bords 0 → short `films/cm1-perimetre-<ep>.js` (nouvelle série `cm1-perimetre` à déclarer comme `cm1-aire.json`) → miniatures → manifeste (places après le 01/01/2027) → fiche, R2, coach.

## Fait le 13/11 (session 7, suite) — ✅ PÉRIMÈTRE ép. 1 TRIANGLE fini
- Commun : `manim/scripts/cm1/perimetre_cm1_commun.py` (base `PaysagePerimetreCM1` = PhraseAGauche + PaysageAireCM1 ; `pts_triangle(base, g, d, u, pointe_en_bas)`, `poly`, `etiquette(p, i, s)` hors audit, `cote_tour`, `tour`, `fanion` ; personnages `nina`, `lucas`, `emma`, `karim`).
- ✅ `perimetre_triangle.py` (`PerimetreTriangleCM1`) : dry run AUDIT propre (seul « 974 »), planche -ql relue deux fois, HD `manim/sorties/cm1/maths/perimetre/01-triangle/` (3 min 43), `verifier-bords-video.py` = 0. Questions 01:06 A, 02:02 C.
  - ⚠️ Leçons : une ligne n'apparaît qu'une fois TOUS ses mots dits (synchro) → écrire dans l'ordre de la voix (« 20 cm en haut », pas « En haut : 20 cm »), ou couper la ligne en morceaux posés un à un ; `au_mot(extrait)` attend la FIN de l'extrait → pour un nombre, « mot + nombre » (« faut 70 »).
- ✅ Short « La guirlande du fanion » : série `cm1-perimetre` (`films/cm1-perimetre.json`, `cm1-perimetre.js` = outils polygones `polyCraie`, `tourPoly`, `coteCraie`, `reduire` ; film `cm1-perimetre-triangle.js`). Cues des 4 épisodes déjà faites. ⚠️ Dans `dit()`, deux « 40 centimètres » de suite : les mettre dans UNE légende (sinon décalage « écrit en, dit bas »). Fanion à gauche de l'ardoise (Ti Margo cache le bas du milieu).
- Miniature paysage : `python manim/miniature_aire_cm1.py perimetre-triangle` (le script prend un 9e champ « notion »).
- Manifeste `cm1-perimetre-triangle` (jaune, art-design) + `-short` (blanche, 00:22 B) le **02/01/2027** ; fiche YouTube ; R2 du dossier perimetre seul ; `generer-videos-r2.mjs` ; coach.
- Outils (scratchpad session 7) : `entrees_peri.py <ep> <date> <t short> <dry.log>` (ajouter l'épisode dans EPS), `upsert-manifeste.py`, `planche_peri.py <mp4> <dry.log> <préfixe> [t…]`.

## Prochaine étape (session 8)
Ép. 2 `perimetre_quadrilatere` (Lucas, encadreur ; ceinture jaune ; questions B, A ; short C), puis ép. 3 polygone (verte), ép. 4 défi (bleue) : même chaîne. Dates libres : 03/01 (0 paysage), 04/01, 05/01… (≤ 2 paysages et 5 vidéos par jour).

## Fait le 13/11 (session 8) — ✅ PÉRIMÈTRE ép. 2 QUADRILATÈRE fini
- ✅ `manim/scripts/cm1/perimetre_quadrilatere.py` (`PerimetreQuadrilatereCM1`, Lucas encadreur ; `pts_rect`, `tableau` (toile + cadre de bois), `baguette` dans le script) : dry run AUDIT propre (seul « 974 »), planche -ql relue deux fois, HD `manim/sorties/cm1/maths/perimetre/02-quadrilatere/` (3 min 46), bords 0. Questions 01:14 B, 02:09 A.
  - ⚠️ Leçons : `autres_r` (animation jouée avant la phrase de réponse) retarde la 1re ligne si elle commence par un nombre (« 9 + 5 ») → pas d'`autres_r` dans ce cas ; une ligne de ≥ 30 caractères en 34 est réduite par `col` → la couper sur deux rangs (`pile`) ; RETARD = l'animation d'avant est trop longue (0,2 s suffit).
- ✅ Short « La moitié du tour » (`films/cm1-perimetre-quadrilatere.js`, 67 s) : terrain 20 × 10 pas, Ti Margo s'arrête à 30 pas, réponse C 60. Étiquettes des côtés verticaux : taille 46, écart 96 (sinon coupées au bord ou collées au calcul).
- Miniatures, manifeste `cm1-perimetre-quadrilatere` (jaune, art-design + construction) + `-short` (blanche, 00:18 C) le **03/01/2027** ; fiche YouTube ; R2 du dossier 02-quadrilatere seul ; `generer-videos-r2.mjs` ; coach branché (2 vidéos).
- ⚠️ Une autre session a déjà l'ép. 3 polygone en cours (entrée `cm1-perimetre-polygone` dans `videos-r2.json` non commitée) : ne pas la reprendre ici.

## Fait le 13/11 (session 8 bis) — ✅ PÉRIMÈTRE ép. 3 POLYGONE fini
- ✅ `manim/scripts/cm1/perimetre_polygone.py` (`PerimetrePolygoneCM1`, Emma menuisière ; outils dans le script : `pts_regulier(n, côté, u)`, `croix`, `numero`, `coin`) : octogone 50 × 8 = 400 ; plateau 40, 30, 50, 30, 20 à l'échelle (170) ; Q1 hexagone C 54 ; Q2 pentagone 7, 4, 6, 4, 5 (presque régulier, à l'échelle) B 26 ; défi bac à sable 150 × 5 = 750 > 700. Dry run AUDIT propre (seul « 974 »), planche -ql relue deux fois, HD `manim/sorties/cm1/maths/perimetre/03-polygone/` (3 min 48), bords 0. Questions 01:14 C, 02:03 B.
  - ⚠️ Leçons : `au_mot` doit couvrir TOUTE la ligne qui suit (« Les 8 côtés sont égaux », pas « sont égaux ») sinon le « 8 » attend le suivant (+5 s) ; nombres énumérés vite (« 40, 30, 50… ») : extraits par paires (« 40, 30 ») et animations de 0,15 s ; dry run avec `--media_dir` à soi (le cache `media/texts` commun est verrouillé par l'autre rendu).
- ✅ Short « L'étoile à 10 côtés » (`films/cm1-perimetre-polygone.js`, 68 s) : « 5 pointes, donc 5 côtés ? », la petite sœur compte 10 croix, 6 × 10 = 60 (A) ; défi panneau stop 8 × 30. Étoile R 290 / r 140 (plus maigre, les « 6 » s'entassent) ; numéros effacés quand les longueurs arrivent.
- Miniatures (`miniature_aire_cm1.py perimetre-polygone`), manifeste `cm1-perimetre-polygone` (verte, construction + art-design) + `-short` (blanche, 00:19 A, art-design + jeux-defis) le **05/01/2027** ; fiche YouTube ; R2 du dossier 03-polygone seul ; `generer-videos-r2.mjs` ; coach branché (2 vidéos).

## Prochaine étape (session 9)
Ép. 4 défi (Karim, ceinture bleue ; questions B, C ; short escargots A) : même chaîne. Dates libres : 04/01 (1 paysage), 06/01 (1 paysage), 07/01… (≤ 2 paysages et 5 vidéos par jour).

## Fait le 14/11 (session 9) — ✅ PÉRIMÈTRE ép. 4 DÉFI fini → PÉRIMÈTRE CM1 FINI (4 épisodes)
- ✅ `manim/scripts/cm1/perimetre_defi.py` (`PerimetreDefiCM1`, Karim éleveur de chevaux, ceinture bleue ; outils dans le script : `pts_rect`, `piquets`, `cloture` (vue de côté, 3 fils), `tours_decales` (3 tours vus de haut)) : pré 40 × 30, un tour 140, 3 tours 420 ; pré en triangle 100 − (30 + 45) = 25 ; Q1 carré 36 ÷ 4 = 9 (B) ; Q2 piste 200 × 4 = 800 (C) ; défi pré carré 25 m, 3 rangées = 300 m, juste assez. Dry run AUDIT propre (seul « 974 »), planche -ql relue deux fois, HD `manim/sorties/cm1/maths/perimetre/04-defi/` (3 min 32), bords 0. Questions 01:08 B, 02:01 C.
  - ⚠️ Leçons : un texte `hors_audit` qui MÊLE mots et nombres (« 1 tour = 140 m ») est découpé par la synchro et perd son drapeau (TARD) → n'y mettre que le nombre (« 140 m ») ; étiquettes posées autour de `tours_decales` : `ecart=0.5` ; le rendu HD plante sur « − » dans un print SYNCHRO si la console est en cp1252 → `PYTHONIOENCODING=utf-8` devant `hd.sh`.
- ✅ Short « La course d'escargots » (`films/cm1-perimetre-defi.js`, 68,8 s) : 20 m de ruban, côtés 8 et 7 (à l'échelle, 62 px/m), 20 − 15 = 5 (A) ; `escargot()` et `cotePointille()` dans le film ; défi ruban 30 m, côtés 10 et 12.
- Miniatures (`miniature_aire_cm1.py perimetre-defi`), manifeste `cm1-perimetre-defi` (bleue, animaux + nature-ecologie) + `-short` (blanche, 00:20 A, animaux + jeux-defis) le **06/01/2027** ; fiche YouTube ; R2 du dossier 04-defi seul ; `generer-videos-r2.mjs` ; coach branché (2 vidéos).

## Prochaine étape (session 10)
CONTENANCE CM1 (plan, section CM1), puis les solides : voix à écrire et valider À DEUX avant tout rendu.
