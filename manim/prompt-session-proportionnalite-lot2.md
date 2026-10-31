Prompt — série PROPORTIONNALITÉ, reprise au lot 2 (échelles) — 31/10/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv`) ; push SEULEMENT sur son signal, le soir (vérifier `git log origin/main..HEAD --stat` : la story Instagram n'est jamais poussée) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 %.

## Où on en est (tout commité, RIEN poussé)
- Consigne de la série : `manim/consigne-videos-proportionnalite.md` (lots, module, **leçons du lot 1** à donner aux agents).
- **Pilote + lot 1 6e FINIS** (12 vidéos : 01-reconnaitre … 06-defi), passe finale faite (`7b6d6ed8` : manifeste, R2, branchées sur les 6 micros du coach). Questions + centres : `manim/questions-proportionnalite.md`. Aperçu : `manim/sorties/apercu-prop.html` (servi sur le port 3900, à l'arrêt).
- **Lot 2 (échelles)** : voix écrites (`3363217f`) — SOUMISES À FRÉDÉRIC, à valider avant tout rendu :
  - épisodes COMMUNS 6e/4e (une voix, un script `manim/scripts/6e/prop_<slug>.py` avec `Prop<Slug>6e` / `Prop<Slug>4e`, seule l'identité change ; short rendu une fois, copié sous les deux noms) : `manim/voix/commun-prop-echelle-comprendre(.json|-short.json)` (07, Sofiane architecte ; short voiture au 1/43), `commun-prop-echelle-reelle` (08, Awa cartographe ; short carte au trésor), `commun-prop-echelle-plan` (09, Hugo paysagiste ; short stade de foot sur une A4) ;
  - défis propres : `6e-prop-echelle-defi` (10, Jade maquettiste ; short dinosaure-figurine) et `4e-prop-echelle-defi` (10, Mathis guide de montagne, 1/25 000 ; short marathon sur une carte).
  - Micros : echelle_comprendre, echelle_distance_reelle, echelle_distance_plan, echelle_defi (6e et 4e) ; notion `prop_echelle`.
  - Chiffres réels à vérifier par l'agent (WebSearch, source en en-tête) : voiture de collection au 1/43, avion de ligne ≈ 40 m, terrain de foot ≈ 105 × 68 m, surface de réparation ≈ 40 m, feuille A4 = 21 cm de large, basket 28 m, marathon 42,195 km.
  - Sorties : `manim/sorties/<6e|4e>/maths/proportionnalite/<NN>-<slug>/eleveai-maths-<classe>-prop-<slug>[-short].mp4`.

## Suite
1. Dès sa validation : rendus par agents neufs (3 au plus), brief sur le modèle de ceux du lot 1 (modèles `manim/scripts/6e/prop_*.py`, ne pas modifier `canvas_proportion.py` ni `prop_commun.py`, premier usage d'`EchelleCarte` à vérifier sur planches), puis vérification des planches par le chef, commit par chemin, aperçu.
2. Passe finale du lot 2 (comme `7b6d6ed8`).
3. Lot 3 (6e pourcentages), lot 4 (4e agrandissements + grandeurs), lot 5 (4e paysages par micro) : voix à écrire puis à faire valider.
4. Rappel : publier sur YouTube les paysages AVANT leurs shorts (fiches `fiche-youtube.md` prêtes dans chaque dossier).
