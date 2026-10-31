# Brief commun — agents de rendu, série PROPORTIONNALITÉ, lot 3 (6e pourcentages)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé).

## À lire d'abord, EN ENTIER
`manim/consigne-videos-proportionnalite.md` (surtout « Noms et sorties » et « ⭐ Leçons du pilote et du lot 1 »), ce qu'elle demande de lire (dont `manim/REGLES.md`), puis les MODÈLES finis : `manim/scripts/6e/prop_tableau.py` + `_short.py`, `prop_unite.py` + `_short.py`, `prop_coefficient_short.py`, leurs `*_marques.json`, la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (API en en-tête ; `EchelleCarte` est inutilisable).
⛔ Ne modifie NI `canvas_proportion.py` NI `prop_commun.py`.

## Voix
VALIDÉE par Frédéric (fichier donné dans ta mission). N'y change rien sauf erreur factuelle (dis-le). Les chiffres du lot 3 sont inventés ; s'il y a un fait réel (composition d'un chocolat…), vérifie-le par WebSearch (source + date en en-tête du script). WAV avec `scripts/generer-voix.ps1` (débit −10), rangés comme ceux du lot 1 (`public/sons/<nom-de-la-voix>/`).

## Épisodes PROPRES à la 6e
Un script `manim/scripts/6e/prop_<slug>.py` (classe `Prop<Slug>6e`) + `_short.py`. Sorties : `manim/sorties/6e/maths/proportionnalite/<NN>-<slug>/eleveai-maths-6e-prop-<slug>[-short].mp4`. Modèles les plus proches : lot 1 (`prop_tableau.py`, `prop_unite.py`, `prop_defi.py`) et le défi 6e du lot 2 (`prop_echelle_defi.py`). Le module fournit `BarrePourcent` (100 cases / barre de chargement) : vérifie-la sur tes planches, contourne ses défauts dans TON script et signale-les. Lien sans duplication avec les vidéos fractions 6e 12 (`6e-frac-pourcentage-fraction`) et 13 (`6e-frac-pourcentage-decimal`) : regarde leurs scripts pour le visuel des 100 cases, ne les modifie pas.

## Règles du lot
Ceintures : paysage verte, short blanche (échelle entière). ⛔ Pas de produit en croix ; « ÷ » pour une division. Le symbole % écrit à chaque pourcentage dit ; unités partout (g, €, animaux, billets). Montre « sur 100 » avec les 100 cases, et le tableau de proportionnalité pour ramener à 100 (l'opération écrite sur la flèche, × 2, ÷ 4). Peu ou pas de La Réunion (≈ 4 % du public).

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE → UN SEUL rendu HD par vidéo → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur questions, correction, « Ce que tu as appris »).

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres, sources des chiffres réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu, question, choix, reponse 0/1/2, explication) pour chaque vidéo, résultat des bords, ce que tu as vu sur les planches, état de `BarrePourcent`, soucis restants.

## Leçons du lot 2
`EchelleCarte` inutilisable (sans objet ici) ; rendus avec `PYTHONIOENCODING=utf-8` ; un défaut vu seulement sur la planche finale a coûté deux rendus HD de plus au défi 4e : regarde la planche basse déf avec soin, écran par écran.
