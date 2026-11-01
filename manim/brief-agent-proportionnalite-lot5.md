# Brief commun — agents de rendu, série PROPORTIONNALITÉ, lot 5 (4e, une paysage par micro)

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent d'autres épisodes en même temps : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire (il est partagé).

## À lire d'abord, EN ENTIER
`manim/brief-agent-proportionnalite-lot4.md` (règles, ordre obligatoire, rapport, leçons) : il s'applique tel quel, SAUF ce qui suit. Puis `manim/consigne-videos-proportionnalite.md` et `manim/REGLES.md`. Modèles les plus proches : `manim/scripts/4e/prop_grandeur_{produit,quotient,unite,convertir,coherence,defi}.py` (paysages 4e du lot 4, avec leurs `*_marques.json`), la base `manim/scripts/6e/prop_commun.py`, le module `manim/canvas_proportion.py` (`TableauProp`, `Unite`, `DroiteOrigine`, `BarrePourcent`…). ⛔ Ne modifie NI `canvas_proportion.py` NI `prop_commun.py`.

## Différences avec le lot 4
- **PAYSAGE SEULEMENT** : les shorts de ces micros existent déjà (`4e-prop-*-short-*`). Ceinture verte.
- Voix VALIDÉE par Frédéric le 01/11 : `manim/voix/4e-prop-<slug>.json`. N'y change rien sauf erreur factuelle (dis-le). WAV avec `scripts/generer-voix.ps1` (débit −10) dans `public/sons/4e-prop-<slug>/`.
- Script `manim/scripts/4e/prop_<slug_souligné>.py` (ex. `prop_ratio_ecrire.py`), classe `Prop<Slug>4e` (ex. `PropRatioEcrire4e`). ⚠️ `prop_ratio.py`, `prop_pourcentages.py`, `prop_proportionnalite.py` existent déjà (paysages de notion) : n'y touche pas.
- Sortie `manim/sorties/4e/maths/proportionnalite/<NN>-<slug>/eleveai-maths-4e-prop-<slug>.mp4` ; media_dir `manim/media-prop-4e-<NN>`.
- Produit en croix : SEULEMENT dans l'épisode 24 `quatrieme` (diagonale surlignée dans le tableau). Ailleurs : unité, coefficient, linéarité.
- Visuels attendus : tableau de proportionnalité (`TableauProp`) dès qu'il y a deux grandeurs ; repère (`DroiteOrigine`) en 20 et 22 et 26 ; ratios en BARRES DE PARTS colorées (une part = un bloc, la valeur d'une part écrite dedans) en 28 à 32 ; pourcentages en barre de 100 (`BarrePourcent`, `etiquette=False`) et coefficients « × 1,05 » sur flèche en 33 à 37. Le leurre de chaque question-pause est une erreur du fil rouge : montrer la ligne fausse barrée quand la voix la cite.
- Unités écrites à chaque nombre ; « ÷ », jamais 5/2 ; ratio écrit « 3 : 2 » ET dit « 3 pour 2 ».
- Leçons 11-19 : marque par occurrence même à travers la ponctuation (convertisseur de l'agent 19 : redemande-le au chef d'orchestre si besoin, sinon recrée-le) ; l'AUDIT cherche « 1500 » quand la voix dit « 1 500 » (AUDIT-ABSENT sans gravité) ; coche verte loin du texte des choix (texte arrêté à 0,8 du bord de sa carte, ép. 18) ; un choix sur deux lignes agrandit sa carte : raccourcis-le à l'écran ; cadres de mise en valeur à distance du mot voisin.

⛔ NE COMMITTE RIEN. ⛔ Ne lance jamais la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2. Écris par morceaux de ≤ 150 lignes. Un seul rendu à la fois. `PYTHONIOENCODING=utf-8`.

## Rapport final COURT
Fichiers créés, durée, centres, sources des chiffres réels, liste `questions` JSON (t "MM:SS" mesuré sur le rendu, question, choix, reponse 0/1/2, explication), résultat des bords, ce que tu as vu sur les planches, soucis restants.
