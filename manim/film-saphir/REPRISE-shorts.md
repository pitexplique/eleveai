# Reprise — SAPHIR, shorts verticaux (1080 × 1920)

Demande de Frédéric le 09/11 : « fais deux shorts de l'épisode 1 puis de l'épisode 2 ». ⛔ Rien de publié (ni YouTube, ni R2, ni site, ni miniature).

## Fabrication
- Script : `scripts/film-saphir-short.mjs <partie> controle 0 5 10 … | film | mix` (instants = temps DU SHORT).
- Il reprend la page de `scripts/film-saphir.mjs` et la scène de l'épisode **sans la modifier** : la caméra passe par `window.cameraShort`, et `prototypes/film-saphir/short-<partie>.js` est collé dans le bloc de la scène (il en voit les noms).
- `short-<partie>.js` : `PLANS_V` (cadrages verticaux, en temps de l'épisode) et `window.short.segments` (extraits, en temps de l'épisode).
- Le son : découpé dans le MP4 de l'épisode aux mêmes instants (mêmes voix, même vent), raccords de 0,12 s.
- Travail : `manim/film-saphir/short/` (non suivi) ; sortie : `manim/sorties/saphir/eleveai-saphir-short-…mp4`.

## Épisode 1 — fait le 09/11
59 s, 10 extraits : titre, attelage, cercle des loups + « Qu'est-ce que vous gardez, vous… », le cercle s'ouvre (plongée), l'écharpe rouge au centre, les yeux bleu saphir, « Là… Je te tiens. », les loups suivent, les loups devant la cabane, l'étoile bleue, « SAPHIR — à suivre ».

## Pièges
- Plan du centre : hors du cercle, un loup de dos bouche l'image ; dedans (rayon 4,2, angle −2,2 rad de `gdir`) c'est propre.
- Gros plan des yeux : la chapka qu'il tient entre par le haut à gauche si le champ s'ouvre ; viser plus bas.
- La planche de contrôle se pose image par image (pas besoin d'une grille pleine).
