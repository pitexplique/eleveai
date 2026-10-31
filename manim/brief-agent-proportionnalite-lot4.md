# Brief commun — agents de rendu, série PROPORTIONNALITÉ, lot 4 (4e agrandissements et grandeurs composées)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé).

## À lire d'abord, EN ENTIER
`manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » et « ⭐ Leçons du pilote et du lot 1 »), ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis : `manim/scripts/6e/prop_tableau.py` + `_short.py`, `prop_unite.py` + `_short.py`, `prop_coefficient_short.py`, le défi 4e du lot 2 `manim/scripts/4e/prop_echelle_defi.py` + `_short.py` (modèle le plus proche : épisode PROPRE à la 4e), les épisodes du lot 3 `manim/scripts/6e/prop_pourcentage_*.py`, leurs `*_marques.json`, la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête ; `EchelleCarte` est inutilisable).
⛔ Ne modifie NI `canvas_proportion.py` NI `prop_commun.py`.

## Voix
VALIDÉE par Frédéric le 31/10 (fichier donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le). Les unités composées y sont dites en toutes lettres (« kilomètres par heure ») : l'ÉCRAN les écrit en symboles (km/h, m², m³, kWh, hab/km², L/min, t/ha, €/kg, BPM). Faits réels : la voix cite déjà la source ; recopie source + date en en-tête du script (sources relevées : EDF tarif réglementé au 1/08/2025 ≈ 0,1952 €/kWh TTC ; Insee Paris ≈ 2,1 millions d'habitants (2022) sur 105 km² ; Agreste blé tendre 2025 ≈ 7,4 t/ha ; bassin olympique 50 × 25 m, 2 m de profondeur au moins (World Aquatics FR 2) ; terrain FIFA 105 × 68 m ; basket FIBA 28 × 15 m ; c = 299 792 km/s (BIPM) ; Terre-Lune 384 400 km (NASA) ; Bolt 9,58 s au 100 m, Berlin, 16/08/2009 (World Athletics) ; TGV jusqu'à 320 km/h sur certaines LGV). WAV avec `scripts/generer-voix.ps1` (débit −10), rangés comme ceux des lots précédents (`public/sons/<nom-de-la-voix>/`).

## Épisodes PROPRES à la 4e
Un script `manim/scripts/4e/prop_<slug_souligné>.py` (classe `Prop<Slug>4e`, ex. `prop_agrandissement_rapport.py` / `PropAgrandissementRapport4e`) + `_short.py`. Sorties : `manim/sorties/4e/maths/proportionnalite/<NN>-<slug>/eleveai-maths-4e-prop-<slug>[-short].mp4`. media_dir : `manim/media-prop-4e-<NN>` (⚠️ `media-prop-11` à `-14` appartiennent déjà au lot 3 de la 6e).

## Règles du lot
Ceintures : paysage verte (défi compris), short blanche (échelle entière). Produit en croix PERMIS en 4e, mais la voix ne l'utilise pas : ne l'ajoute pas. « ÷ » pour une division, jamais 5/2. Unités écrites à CHAQUE nombre ; chaque nombre dit est écrit à l'écran. Visuels attendus :
- agrandissements : la figure ET son image côte à côte (rapport écrit sur une flèche « × k »), pavage de la grande figure par la petite (aire : k² carreaux), empilement de petits pavés/cubes (volume : k³), en 3D légère ou perspective cavalière lisible ;
- grandeurs : l'opération sur les nombres ET sur les unités, alignées (2 kW × 5 h = 10 kWh), la barre de l'unité colorée et lue « par » = « pour 1 » ; tableau de proportionnalité quand on ramène à 1 ;
- conversions : le carré de 1 m = 100 cm × 100 cm quadrillé ; 1 h = 60 min écrit (jamais 100) ;
- cohérence : la ligne fausse barrée, l'unité juste à côté.
Pas de La Réunion (aucun contexte 974 dans ce lot).

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté. Rendus avec `PYTHONIOENCODING=utf-8`.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources des chiffres réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu, question, choix, reponse 0/1/2, explication) pour chaque vidéo, question en commentaire du short, résultat des bords, ce que tu as vu sur les planches, soucis restants.

## Leçons des lots 2 et 3
- Un défaut vu seulement sur la planche finale a coûté des rendus HD de plus : regarde la planche basse déf avec soin.
- `Indicate` coloré sur une grille entière la colore tout un instant (on croit voir « tout plein ») : utilise `Circumscribe` ou un cadre.
- `BarrePourcent` : `etiquette=False` (l'étiquette n'attend pas la voix).
- `scripts/cues2marques.py` jette un mot répété deux fois de suite : ajoute la marque à la main.
