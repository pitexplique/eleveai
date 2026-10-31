Prompt — série PROPORTIONNALITÉ, reprise au lot 2 (échelles) — 31/10/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv`) ; push SEULEMENT sur son signal, le soir (vérifier `git log origin/main..HEAD --stat` : la story Instagram n'est jamais poussée) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 %.

## Où on en est (tout commité, RIEN poussé)
- Consigne de la série : `manim/consigne-videos-proportionnalite.md` (lots, module, **leçons du lot 1**).
- **Pilote + lot 1 6e FINIS** (12 vidéos, 01-reconnaitre … 06-defi), passe finale faite (`7b6d6ed8` : manifeste, R2, branchées sur les 6 micros du coach). Questions + centres : `manim/questions-proportionnalite.md`. Aperçu : `manim/sorties/apercu-prop.html` (port 3900, vidéos à l'arrêt) ; outils du chef : `planche.py` (planche PyAV) et `apercu.py` (réécrit la page) — à recréer si besoin dans ton scratchpad.
- **Lot 2 (échelles) : voix VALIDÉES par Frédéric** (`3363217f`) :
  - COMMUNS 6e/4e (une voix, un script `manim/scripts/6e/prop_<slug>.py`, sous-classes `Prop<Slug>6e` / `Prop<Slug>4e`, deux rendus paysage, short rendu une fois et copié sous les deux noms) : 07 `commun-prop-echelle-comprendre` (Sofiane architecte ; short voiture au 1/43), 08 `commun-prop-echelle-reelle` (Awa cartographe ; short carte au trésor), 09 `commun-prop-echelle-plan` (Hugo paysagiste ; short stade de foot sur une A4).
  - Défis propres : 10 `6e-prop-echelle-defi` (Jade maquettiste ; short dinosaure-figurine) et 10 `4e-prop-echelle-defi` (Mathis guide de montagne, 1/25 000 ; short marathon sur une carte).
  - Brief commun des agents de rendu : `manim/brief-agent-proportionnalite-lot2.md` (chaque agent reçoit : « lis et applique ce brief » + sa mission : épisode, voix, script, classes, slug, dossier, media_dir, décor, chiffres réels à vérifier, centres).

## État au relais (31/10, 12 h 10)
- **08** : FINI, vérifié, COMMITÉ (`05b2260f`) avec ses questions.
- **07-echelle-comprendre** : FINI, vérifié (bords 0, planche bonne), COMMITÉ avec ses questions (`4ecd6e1e`).
- **09-echelle-plan** (agent lancé à 11 h 35 depuis la session du 31/10 midi ; au relais, paysage 6e du 09 rendue, 4e en cours ) Leurs rapports seront PERDUS si la session se ferme : vérifier sur disque (`manim/scripts/6e/prop_echelle_plan*`, `prop_echelle_defi*`, mp4 dans `09-echelle-plan/` et `6e/.../10-echelle-defi/`). Si les mp4 sont tous là : bords + planches + `t` + commit par chemin ; s'il en manque et que rien ne bouge : agent neuf.
- **10 défi 6e** : FINI, planches regardées (bonnes), bords 0, COMMITÉ avec ses questions.
- **10 défi 4e** : agent lancé à 12 h 20 (modèle : défi 6e). Si la session s'est fermée : vérifier sur disque `manim/scripts/4e/prop_echelle_defi*` et `manim/sorties/4e/maths/proportionnalite/10-echelle-defi/` ; mp4 complets → bords + planches + `t` + commit ; sinon agent neuf (mission ci-dessous).
- Leçons : `EchelleCarte` du module est inutilisable → reprendre la figure `Correspondance` de `prop_echelle_reelle.py` ; rendus avec `PYTHONIOENCODING=utf-8`.
- ✅ Banque 6e : Saint-Denis–Saint-Pierre corrigé (13 cm → 52 km à vol d'oiseau, `244f1d9f`).
- ⛔ Frédéric, 31/10 : La Réunion ne fait que ~4 % → contextes 974 rares (≈ 1 sur 25).
- Outil planche (PyAV, 12 images) : à recréer dans ton scratchpad.

**Missions restantes** (texte d'origine) :
- **09-echelle-plan, 10 défi 6e, 10 défi 4e : PAS lancés.** Mission 09 : `commun-prop-echelle-plan`, script `prop_echelle_plan.py` (`PropEchellePlan6e` / `PropEchellePlan4e`) + `prop_echelle_plan_short.py`, dossier `09-echelle-plan`, micro `echelle_distance_plan` ; jardin 70 m → 7 cm (1 cm ↔ 10 m), mur 40 m → 4 cm, mur 24 m à 1 cm ↔ 8 m → 3 cm, piège 700 cm barré, trajet 30 km à 1 cm ↔ 4 km → 7 + 0,5 = 7,5 cm, défi potager 30 × 15 m → 6 × 3 cm ; short stade 105 × 68 m → 21 × 13,6 cm sur une A4 ; chiffres réels à vérifier : terrain de foot, surface de réparation ≈ 40 m, A4 = 21 cm, basket 28 m ; centres paysage `nature-ecologie`, `art-design`, short `football`. Défis : script `manim/scripts/<6e|4e>/prop_echelle_defi.py` (+ `_short`), dossier `10-echelle-defi`, micro `echelle_defi` ; 6e : retrouver 1 cm (3 cm ↔ 12 m → 4 m), pont 7 cm → 28 m, périmètre 40 × 20 m à 1 cm ↔ 5 m → 24 cm, centres `cinema-series`, `art-design`, short `dinosaures`, `cinema-series` ; 4e : 1/25 000, conversions cm → m → km, retrouver 1/50 000, défi 7,5 km → 30 cm, centres `course-trail`, `nature-ecologie`, short `course-trail` (marathon 42,195 km à vérifier). En 4e, pas de produit en croix non plus (conversions et division).

## Suite
1. Finir les rendus du lot 2 (3 agents au plus), vérifier les planches toi-même, commit par chemin (scripts + `*_marques.json` + questions), aperçu mis à jour.
2. Passe finale du lot 2 par un agent (comme `7b6d6ed8` : miniatures, manifeste avec microId 6e ET 4e, fiches YouTube, R2, `brancher-videos-coach`), puis commit par chemin des seules lignes `6e-prop-echelle*` / `4e-prop-echelle*`.
3. ✅ Banque 6e corrigée (`244f1d9f`).
4. Puis lot 3 (6e pourcentages), lot 4 (4e agrandissements + grandeurs), lot 5 (4e paysages par micro) : voix à écrire puis à faire valider (coller la voix en entier, s'arrêter là).
5. Rappel : publier sur YouTube les paysages AVANT leurs shorts (`fiche-youtube.md` dans chaque dossier) ; le push du soir rendra visibles sur le site les vidéos du lot 1 (`videos-r2.json`).
