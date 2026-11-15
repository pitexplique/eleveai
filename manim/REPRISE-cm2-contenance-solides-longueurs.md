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
