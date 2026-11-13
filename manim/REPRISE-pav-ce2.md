# Reprise — série PÉRIMÈTRE → CONTENANCE → SOLIDES du CE2

Plan : `manim/PLAN-perimetre-aire-volume.md` (section « ## CE2 »). Vidéos COMMUNES : la session CM1 les relie par `aussi`.

## État au 13/11 (matin)

✅ 13/11 après-midi : VOIX VALIDÉES par Frédéric (« Validées »), paysage + short des 3 épisodes, ceintures proposées acceptées avec. Rien rendu encore :

| Épisode | Micro | Paysage | Short (dessin animé Ti Margo) | QCM (bonne réponse) |
|---|---|---|---|---|
| 01 | `ce2_perimetre_comprendre` | `voix/ce2-perimetre-comprendre.json` (Léo paysagiste, jardin 8×5 = 26 m ; défi Inès éleveuse, 20 m) | `voix/ce2-perimetre-comprendre-short.json` (bac à sable 6×3, Ti Margo coupe par le milieu → 18 m) | C, A · short B |
| 02 | `ce2_perimetre_polygone` | `voix/ce2-perimetre-polygone.json` (Sofia jardinière, potager en L à 6 côtés = 22 m ; quadrillage 9 carreaux / 14 cm ; défi hexagone 6 × 3 m = 18 m) | `voix/ce2-perimetre-polygone-short.json` (guirlande de la cabane, mur oublié : 13 → 16 m) | B, C · short A |
| 03 | `ce2_perimetre_comparer` | `voix/ce2-perimetre-comparer.json` (Malik organisateur de courses, rectangle 40×20 = 120 m / triangle 50-30-50 = 130 m ; piège carré 5 vs rectangle 9×1 = 20 ; compas ; défi 110 < 120 < 140) | `voix/ce2-perimetre-comparer-short.json` (course autour des tables, 20 pas = 20 pas) | A, B · short C |

Ceintures proposées (à confirmer) : 01 blanche, 02 jaune, 03 orange ; shorts blanche.
Centres : 01 nature-ecologie + animaux, 02 nature-ecologie, 03 sport.

## Prochaine étape

1. Frédéric valide ou corrige les voix (paysage ET short).
2. Script Manim `manim/scripts/ce2/…`, audit dry run, aperçu `-ql` scène par scène, verrou `%TEMP%\eleveai-rendu-hd.lock` puis HD, bords, miniature, manifeste (places libres après le 24/12), R2, `scripts/brancher-videos-coach.mjs`.
3. Shorts : socle Ti Margo (`prototypes/ti-margo/LISEZ-MOI.md`, `scripts/ti-margo-short.mjs`), mention « Dessin animé ».

## ✅ Fait le 13/11 après-midi (session 1, arrêtée à 61 % de contexte)
- Voix GÉNÉRÉES (6) : `public/sons/ce2-perimetre-{comprendre,polygone,comparer}[-short]/` (`scripts/generer-voix.ps1 -Debit -6`, Julie).
- Marques des 3 paysages : `python manim/scripts/ce2/perimetre_marques.py` → `manim/scripts/ce2/perimetre_{slug}_marques.json` (0 introuvable).
- Outils communs : `manim/scripts/ce2/perimetre_ce2_commun.py` (base `PaysageCalculPose` importée de 6e/calcul_pose_commun ; `FigureCotee(pts, textes, e, centre)` : côtés i → i+1, `.lab[i]` textes dehors à poser au mot, `.cote(i)`, `.contour()`, `.sommets()` (position actuelle) ; `rect_pts(L, l)` ; `poteaux`, `touffes`, `fourmi`, `leo`, `ines`, `mouton` ; `PaysagePerimetreCE2` (identité « Maths CE2 — EleveAI », ceinture blanche, `tour_cote(fig, i, rt, mobile)`). Orange (TOUR) = le tour = le périmètre, comme la série CM1.
- Paysage pilote ÉCRITE : `manim/scripts/ce2/perimetre_comprendre.py` (`PerimetreComprendreCE2`). Commandes en tête du fichier (dry run AUDIT, HD, sortie `manim/sorties/ce2/maths/perimetre/01-comprendre/`).
- ⏳ Premier dry run lancé (AUDIT=1 BORDS=1) : résultat à relire (voir ci-dessous) ; ensuite corriger les AUDIT/BORD/TARD, puis aperçu `-ql` scène par scène, planche, HD sous verrou.

## Reste (dans l'ordre)
1. Pilote 01 : dry run propre → `-ql` (une scène à la fois, RAM ≥ 2,5 Go) → planche (`python scripts/ti-margo-planche.py <mp4> <png> 40`) → verrou `%TEMP%\eleveai-rendu-hd.lock` → HD → `python scripts/verifier-bords-video.py` (0) → planche HD.
2. Short 01 Ti Margo : socle `prototypes/ti-margo/LISEZ-MOI.md` + `scripts/ti-margo-short.mjs` ; modèle série calcul posé (`prototypes/ti-margo/films/calcul-pose.js`, `.json`, `-cues.js`). Créer `films/ce2-perimetre.js` (+ `.json` : voix `ce2-perimetre-{ep}-short`, sortie `manim/sorties/ce2/maths/perimetre/{num}-{ep}`, nom `eleveai-maths-ce2-perimetre-{ep}-short`). Mention « Dessin animé » sur la miniature.
3. Miniature paysage (modèle `manim/miniature_calcul_pose.py`), manifeste via un `manim/passe_perimetre_ce2.py` (modèle `passe_calcul_pose.py` : ceinture, fiche, questions et chapitres mesurés au son, `pas_avant` après le 24/12, ≤ 2 paysages et 5 vidéos par jour, `centres`), `python scripts/fiches-youtube.py`, R2, `lib/videos/*` (nos clés seulement : hash-object + update-index, jamais `git commit -- lib/videos/...`), aperçu séparé `manim/sorties/apercu-perimetre-ce2.html` (jamais `apercu.html`).
4. Coach : `node scripts/brancher-videos-coach.mjs --classe ce2 --notion perimetre` (lecture seule d'abord) — APRÈS le push du chef d'orchestre.
5. Épisodes 02 polygone et 03 comparer : même chaîne (voix validées ; ceintures jaune, orange).
6. Cocher `manim/PLAN-perimetre-aire-volume.md` à chaque épisode fini. Commit PAR CHEMIN, pas de push.
