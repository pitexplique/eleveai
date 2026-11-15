# Reprise : CM2 contenance, solides, longueurs (14 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md`, section « ## CM2 ». Modèle : `manim/REPRISE-cm2-perimetre-aire.md` (même chaîne, mêmes outils). Rien n'est poussé.

## Règles de la série
- Un cran au-dessus du CM1 : décimaux (2,5 L = 250 cL, 3,45 m < 3,5 m), conversions avant de calculer, tableau des unités (km → mm, L → mL), pyramides et prismes comptés par règle, patrons de cube à construire (11 patrons, faces opposées), défis à étapes (arrondir au-dessus, intervalles et poteaux).
- Paysage Manim + short DESSIN ANIMÉ Ti Margo. Voix validée À DEUX avant tout WAV.
- Métiers neufs (aucun du CE2, du CM1 ni du CM2 déjà fait), 7 filles / 7 garçons. La Réunion : 1 seule mention (Piton des Neiges, longueur_estimer Q2).
- Bonnes réponses : générateur `side-session-notes/local_bfd6aa0c-…/gen_voix_cm2_csl.py` (graine 1115) → 14 A, 14 B, 14 C, jamais deux fois la même lettre dans une paysage.

## Les 28 voix (`manim/voix/`) — écrites le 15/11 ; ⏳ validation par série
| Micro | Fichiers | Métier | Paysage Q | Short (réponse) | Ceinture | Validée |
|---|---|---|---|---|---|---|
| `contenance_comparer` | `cm2-contenance-comparer(-short)` | Paul, glacier | A, C | canette 33 cL / bouteille 0,5 L : B | jaune | ✅ 15/11 (WAV faits) |
| `contenance_convertir` | `cm2-contenance-convertir(-short)` | Lucie, pharmacienne | B, A | limonade 1,5 L = 150 cL : B | verte | ✅ 15/11 (WAV faits) |
| `contenance_estimer` | `cm2-contenance-estimer(-short)` | Ibrahim, plombier | A, C | parfum 50 mL : A | jaune | ✅ 15/11 (WAV faits) |
| `contenance_defi` | `cm2-contenance-defi(-short)` | Manon, organisatrice de marathon | A, C | cocktail 2,5 L dans un pichet de 2 L : C | bleue | ✅ 15/11 (WAV faits) |
| `solide_reconnaitre` | `cm2-solides-reconnaitre(-short)` | Gabriel, ingénieur spatial | C, B | devinette cylindre : A | jaune | ✅ 15/11 (WAV faits) |
| `solide_sommet_arete_face` | `cm2-solides-sommets-aretes-faces(-short)` | Lisa, sculptrice | A, C | pyramide en pailles, 5 boules : C | verte | ✅ 15/11 (WAV faits) |
| `solide_face` | `cm2-solides-faces(-short)` | Victor, chocolatier | C, B | boîte à chaussures, 6 couleurs : A | jaune | ✅ 15/11 (WAV faits) |
| `solide_patron` | `cm2-solides-patron(-short)` | Julia, maquettiste | C, B | boîte pyramide, 4 triangles : C | verte | ✅ 15/11 (WAV faits) |
| `solide_patron_construire` | `cm2-solides-patron-construire(-short)` | Anna, créatrice de lanternes | B, A | 11 patrons du cube : B | verte | ✅ 15/11 (WAV faits) |
| `solide_defi` | `cm2-solides-defi(-short)` | Ethan, fabricant d'aquariums | A, C | gâteau 27 cubes, 8 coins : B | bleue | ✅ 15/11 (WAV faits) |
| `longueur_comparer` | `cm2-longueur-comparer(-short)` | Léonie, coureuse de trail | B, A | avions 3,8 m / 3,15 m : B | jaune | ✅ 15/11 (WAV faits) |
| `longueur_convertir` | `cm2-longueur-convertir(-short)` | Arthur, géomètre | B, A | ruban 2,5 m = 250 cm : B | verte | ✅ 15/11 (WAV faits) |
| `longueur_estimer` | `cm2-longueur-estimer(-short)` | Mia, photographe animalière | C, B | lit de 2 m : C | jaune | ✅ 15/11 (WAV faits) |
| `longueur_defi` | `cm2-longueur-defi(-short)` | Nathan, technicien fibre optique | C, A | ballons tous les 2 m : 6 : A | bleue | ✅ 15/11 (WAV faits) |

## Prochaine étape
1. Faire valider les voix par Frédéric, série par série (contenance → solides → longueurs). Une voix retouchée : modifier le JSON à la main (le générateur refuse d'écraser).
2. Puis la chaîne de `REPRISE-cm2-perimetre-aire.md` : WAV → marques → scripts → dry run → planche -ql → HD (un seul, verrou) → bords 0 → short → miniatures → manifeste (après le 22/03/2027) → R2 → coach → plan coché. Commit PAR CHEMIN.

## LONGUEURS CM2 — session « cm2-longueurs-prod » (15/11)
Notes/outils `NL = side-session-notes/local_02c3644d-ad14-466c-9776-106b2f5c7f6a/longueurs/` (sous-dossier : la session contenance partage le dossier parent avec les mêmes noms d'épisodes) : `CONSIGNE-paysages-longueur-cm2.md`, `CONSIGNE-shorts-longueur-cm2.md`, `drylock.sh <fichier> <Scène>` (log `dry-<fichier>.log`, verrou `eleveai-dry-lg2.lock`), `chaine-ql.sh <fichier> <Scène> <ep>` (dry → aperçu -ql → planche `%TEMP%\lgpl_<ep>\`), `chaine.sh <fichier> <Scène> <0N> <ep>` (dry propre → HD sous verrou → bords ; log `hd-<ep>.log`), `ecrire_ep_longueur.py` (les 4 `ep-<ep>.json` ; ⚠️ `SQ` = instant de la question du short, à remplir après le film), `entrees_longueur.py <ep>` (manifeste : nos 2 id seulement), rapports des agents `rapport-agent-<ep>.md` / `rapport-short-<ep>.md`.
- ✅ Commun `manim/scripts/cm2/longueur_cm2_commun.py` (importe `longueur_cm1_commun` sans le modifier + `LigneAlignee` ; `leonie arthur mia nathan`, `FIBRE`, `PISTE` ; base `PaysageLongueurCM2`). ⚠️ `manim/scripts/cm2/longueur.py` = vieux prototype de juillet, pas touché.
- ✅ Shorts : série `prototypes/ti-margo/films/cm2-longueur.json` (sortie `manim/sorties/cm2/maths/longueurs/0N-<ep>/`), outils `cm2-longueur.js` (copie de cm1-longueur.js), cues des 4.
- ✅ Miniatures paysage : `python manim/miniature_longueur_cm2.py <ep>` (après le HD).
- Dates : 02/04 comparer, 03/04 convertir, 04/04 estimer, 05/04/2027 defi.
- ⏸ PAUSE du chef d'orchestre (15/11 ~05 h 30, RAM < 1,5 Go, 3 sessions vidéo au plus) : les 2 sous-agents arrêtés, files de dry run tuées, verrou `eleveai-dry-lg2.lock` retiré. Rien en HD.
- Paysages `manim/scripts/cm2/longueur_<ep>.py` ÉCRITS (scènes `LongueurComparerCM2`, `LongueurConvertirCM2`, `LongueurEstimerCM2`, `LongueurDefiCM2`), PAS finis : 1er dry run complet de comparer (Q 01:09 B, 02:13 A), convertir (01:21 B, 02:10 A), defi (00:52 C, 01:39 A) avec encore 16-24 lignes AUDIT/TARD/BORD (logs `NL/dry-longueur_<ep>.log`) ; les agents avaient corrigé puis attendaient la 2e passe ; estimer : aucun dry run encore. Aucune planche relue.
### Reprise (au signal du chef d'orchestre)
1. Pour chaque ép. : `bash NL/drylock.sh longueur_<ep> <Scène>` → filtre `grep -aE "AUDIT-|TARD |BORD |RETARD|ECART|INTRA|Traceback" NL/dry-longueur_<ep>.log | grep -v 974` = vide (corriger dans le script) ; puis `bash NL/chaine-ql.sh longueur_<ep> <Scène> <ep>` et relire la planche `%TEMP%\lgpl_longueur_<ep>\` (consigne `NL/CONSIGNE-paysages-longueur-cm2.md`, 2 agents au plus).
2. HD un par un : `PYTHONIOENCODING=utf-8 bash NL/chaine.sh longueur_<ep> <Scène> <0N> <ep>` (bords inclus).
3. Shorts : 4 films `prototypes/ti-margo/films/cm2-longueur-<ep>.js` (consigne `NL/CONSIGNE-shorts-longueur-cm2.md`), puis `SQ` dans `NL/ecrire_ep_longueur.py` → `python NL/ecrire_ep_longueur.py` → `python NL/entrees_longueur.py <ep>`.
4. Miniature, fiche YouTube, vignettes, R2 (`cm2/maths/longueurs/0N-<ep>`), `generer-videos-r2.mjs` (nos clés seules, `indexer_cles.py cm2-longueur-`), coach, plan, commit par chemin.

## CONTENANCE CM2 — session « cm2-contenance » (15/11, ~05 h 35 : EN PAUSE sur ordre du chef d'orchestre, RAM < 1,5 Go)
Notes et outils : `side-session-notes/local_02c3644d-ad14-466c-9776-106b2f5c7f6a/contenance/` (⛔ PAS la racine de ce dossier, elle est aux sessions solides / longueurs) : `drylock.sh <fichier> <Scène>` (verrou `eleveai-dry-c2.lock`, attend ≥ 2,5 Go) → `dry-contenance_<ep>.log`, `chaine-ql.sh <fichier> <Scène> <ep>` (dry → -ql → planche `%TEMP%\c2pl_<ep>\`), `chaine.sh <fichier> <Scène> <0N> <ep>` (dry propre → HD sous verrou → bords), `ecrire_ep.py` (les 4 `ep-*.json` déjà rédigés : titres, accroches, chapitres, tags, questions, centres, dates 23 → 26/03/2027 ; REMPLIR `SHORT_T` et les titres des shorts d'après les rapports des films), `entrees_contenance.py <ep>` (upsert des 2 entrées du manifeste), `indexer_cles.py cm2-contenance- <json…>` (met dans l'index HEAD + nos seules clés), consignes `CONSIGNE-paysages-contenance-cm2.md` / `CONSIGNE-shorts-contenance-cm2.md`, rapports `rapport-paysage-<ep>.md`.
- ✅ Commun `manim/scripts/cm2/contenance_cm2_commun.py` (importe `contenance_cm1_commun` + `LigneAlignee` sans les modifier ; `paul lucie ibrahim manon`, `tableau_unites()` L | dL | cL | mL, `chiffre()`, base `PaysageContenanceCM2`).
- ✅ Miniatures paysage : `python manim/miniature_contenance_cm2.py <ep>` (après le HD ; relire l'accroche contre le script final).
- ✅ Shorts : série `prototypes/ti-margo/films/cm2-contenance.json` + `cm2-contenance.js` (récipients à la craie copiés du CM1) + cues des 4 (`cm2-contenance-cues.js`). Aucun film écrit encore.
| Ép. | Script / Scène | État |
|---|---|---|
| 01 comparer | `contenance_comparer.py` / `ContenanceComparerCM2` (jaune) | écrit ; 2e dry run : 0 AVANCE/RETARD, mais piège 1 TARD + 2 BORD corrigés SANS dry run de contrôle ; planche -ql jamais rendue. Q 01:10 A, 02:00 C, ~3 min 50 |
| 02 convertir | `contenance_convertir.py` / `ContenanceConvertirCM2` (verte) | écrit ; dry run propre à 05:15 ; planche relue, corrections de 05:22 (écrans 02, 03, piège, correction) NON revérifiées. Q 01:25 B, 02:20 A, ~3 min 55 |
| 03 estimer | `contenance_estimer.py` (Ibrahim, jaune) | ⏳ à écrire (sous-agent avec la consigne) |
| 04 defi | `contenance_defi.py` (Manon, bleue) | ⏳ à écrire |
### Reprise (quand le chef d'orchestre relance)
1. 01 et 02 : `bash <notes>/contenance/chaine-ql.sh contenance_<ep> <Scène> <ep>`, relire planche (écrans cités dans `rapport-paysage-<ep>.md`), puis `chaine.sh … 0N <ep>` en arrière-plan (un HD à la fois).
2. 03 et 04 : sous-agents (pas plus de 2 à la fois) avec `CONSIGNE-paysages-contenance-cm2.md` ; puis les 4 shorts avec `CONSIGNE-shorts-contenance-cm2.md`.
3. Par ép. : miniature → `ecrire_ep.py <ep>` → `entrees_contenance.py <ep>` → `fiches-youtube.py cm2-contenance-<ep>` → `vignettes-videos.py` → R2 du seul dossier `cm2/maths/contenance/0N-<ep>` → `generer-videos-r2.mjs` → coach `brancher-videos-coach.mjs --id cm2-contenance-<ep>,cm2-contenance-<ep>-short --ecrire` → plan coché → commit PAR CHEMIN (`indexer_cles.py` pour les json partagés). Jamais de push.

## SOLIDES CM2 — session 1 « cm2-solides » (15/11 matin, passée la main à 65 %)
Notes/outils `S = side-session-notes/local_02c3644d-…/solides/` (⛔ dossier parent partagé avec contenance/ et longueurs/ : n'écrire que dans `solides/`) : `dry.sh <ep _> <Scène>` (verrou `eleveai-dry-sol2.lock`, attend 2,5 Go ; log `S/dry-<ep _>.log`), `ql.sh <ep _> <Scène>` (aperçu -ql sous `eleveai-apercu-lg.lock` + planche `%TEMP%/s2pl_<ep _>/`), `hd.sh <ep _> <Scène> <0N> <ep-tirets>` (verrou HD, 2,5 Go, copie dans `manim/sorties/cm2/maths/solides/0N-<ep>/`, puis bords), `film.sh <ep>…` (film + miniature d'un short sous verrou film, 2,5 Go, supprime `_muet`), `indexer_cles.py`, `CONSIGNE-paysages-solides-cm2.md`, `CONSIGNE-shorts-solides-cm2.md`, rapports `rapport-paysage-<ep>.md` / `rapport-short-<ep>.md`.
- ✅ Commit `4603649e` : commun `manim/scripts/cm2/solides_cm2_commun.py` (importe le commun CM1 sans le modifier ; `PaysageSolidesCM2`, `gabriel lisa victor julia anna ethan`), passe `manim/passe_solides_cm2.py` (`temps`, `voir`, `manifeste` ; 27/03 → 01/04/2027 ; titres ≤ 100 ; centres valides ; notion coach `solide`), miniatures `manim/miniature_solides_cm2.py` (après le HD), série `films/cm2-solides.json` + `cm2-solides.js` (moteur 3D copié du CM1) + cues des 6, films 01-03.
- Shorts : ⛔ règle CM2 = **ceinture blanche** (`ceinture:0`). ✅ 01 reconnaitre « Le solide caché » 1:01, Q 00:15, A ; ✅ 02 « La pyramide en pailles » 0:58, Q 00:15, C ; ✅ 03 « La boîte peinte » 1:07, Q 00:18, A (02 et 03 rendus d'abord en jaune → passés à 0 et RE-RENDUS par `film.sh sommets-aretes-faces faces` ✅ FAIT 15/11 06:33 et 06:37, « Ceinture blanche » vue sur la 1re image). ✅ 04 patron « 3 triangles ou 4 ? » 1:07, Q 00:16, C ; ✅ 05 « 1 patron ou 11 ? » 1:02, Q 00:13, B ; ✅ 06 « 3 faces au chocolat ? » 1:08, Q 00:22, B (miniatures relues ; rapports `S/rapport-short-<ep>.md`). LES 6 SHORTS SONT FINIS.
- Paysages : 6 scripts `manim/scripts/cm2/solides_<ep _>.py` (scènes `SolidesReconnaitreCM2`, `SolidesSommetsAretesFacesCM2`, `SolidesFacesCM2`, `SolidesPatronCM2`, `SolidesPatronConstruireCM2`, `SolidesDefiCM2`) écrits par 3 sous-agents de la session 1, encore en cours au passage (dry run → aperçu -ql relu). À ~06:30 : dry 01 et 02 propres, aperçus en cours ; 03 corrigé, 06 en dry run ; 04 patron avait 80 alertes, 05 pas encore lancé. Chaque agent écrit `S/rapport-paysage-<ep>.md` à la fin : ⛔ ne pas réécrire un script tant que son rapport n'existe pas (l'agent peut encore le modifier). AUCUN HD encore.
- ✅ 01 reconnaitre (Q 01:13 C, 02:09 B, ≈ 3 min 41) et 02 sommets-aretes-faces (Q 01:10 A, 01:54 C, ≈ 3 min 16) : dry run 0, aperçu relu, scripts commités. ✅ HD faits par la session 1 (01 à 07:01, 02 à 07:08), `verifier-bords-video.py` = 0 sur les deux, écrans des questions relus à l'image. RESTE pour 01 et 02 : miniature → `passe_solides_cm2.py temps/manifeste` → fiche → vignettes → R2 → videos-r2 → coach → plan → commit.
### Prochaine étape (session 2)
1. Attendre les rapports `S/rapport-paysage-*.md` / `rapport-short-*.md` (ou que les scripts ne bougent plus depuis 30 min) ; relire `S/dry-<ep>.log` (0 alerte) et la planche `%TEMP%/s2pl_<ep>/` ; si un épisode n'a ni rapport ni planche propre, le finir soi-même (consigne paysages).
2. HD un par un : `bash S/hd.sh <ep _> <Scène> <0N> <ep-tirets>` en arrière-plan → bords 0 → relire 3-4 images du HD (questions, piège, patron plié).
3. Par épisode : `python manim/miniature_solides_cm2.py <ep>` → `python manim/passe_solides_cm2.py temps <ep>` → `… manifeste` (vérifier le diff : seules nos entrées `cm2-solides-*`) → `python scripts/fiches-youtube.py cm2-solides-<ep>` → `python scripts/vignettes-videos.py` → R2 du seul dossier (`.\scripts\r2-videos.ps1 -Rclone "copy manim/sorties/cm2/maths/solides/0N-<ep> R2:cm2/maths/solides/0N-<ep> --include *.{mp4,png,webp}"` puis `check --one-way`) → `node scripts/generer-videos-r2.mjs` (ne garder que `cm2-solides-*`) → coach `node scripts/brancher-videos-coach.mjs --id cm2-solides-<ep>,cm2-solides-<ep>-short --ecrire` → cocher la ligne CM2 du plan → commit PAR CHEMIN (`python S/indexer_cles.py cm2-solides- manim/manifeste-youtube.json lib/videos/videos-r2.json lib/videos/bilans-videos.json` puis `git commit` sans `-a`, + script + film de l'épisode). Jamais de push.
4. Fin : une ligne par épisode dans `side-session-notes/local_02c3644d-…/rapport-solides.md` ; cette section mise à jour ; mémoire `serie-solides-ce2-cm1.md` (ou note CM2) + MEMORY.md.
