# Reprise — les 8 épisodes propres à la 3e (lot T, branche `poste2`)

Ouvert le 17/11/2026. Ce fichier ne couvre QUE les 8 épisodes T1 à T8 de la série
« Périmètre, aire, volume, solides ». Le tableau des 20 autres (4e) vit dans
`manim/REPRISE-4e-perimetre-aire-volume.md`, tenu par une autre session : ⛔ ne pas y toucher.

Voix (VALIDÉES par Frédéric le 15/11, ⛔ pas un mot à changer) :
`manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md`, section « LOT 3 ».
WAV : `public/sons/3e-*/`. Marques : `manim/scripts/4e/3e_*_marques.json`. Tout était déjà prêt.

## Avancement

| Épisode | Id | Ceinture | Paysage | Short | HD |
|---|---|---|---|---|---|
| T1 | `3e-volume-boule` (le ballon, les poumons) | verte | ⏳ | ⏳ | — |
| T2 | `3e-volume-reduction-section` (le gobelet du cinéma) | bleue | ⏳ | ⏳ | — |
| T3 | `3e-section-pave-cube` (la tranche de pain de mie) | jaune | ⏳ | ⏳ | — |
| T4 | `3e-section-cylindre` (le tube d'une trottinette) | verte | ⏳ | ⏳ | — |
| T5 | `3e-section-cone-pyramide` (le volcan, 974) | verte | ⏳ | ⏳ | — |
| T6 | `3e-section-sphere` (les parallèles du globe) | bleue | ⏳ | ⏳ | — |
| T7 | `3e-section-longueur` (la position en vol) | bleue | ⏳ | ⏳ | — |
| T8 | `3e-section-defi` (scanner pour imprimer en 3D) | marron | ⏳ | ⏳ | — |

## La chaîne d'un épisode (rappel)

1. `manim/scripts/4e/3e_<slug>.py`, classe de base `Paysage3e` (de `volume_4e_commun.py`).
2. `PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Scène>`
   → 0 AUDIT-AVANCE, 0 AUDIT-TARD, 0 RETARD, 0 TARD, 0 BORD.
3. `manim/scripts/4e/3e_<slug>_short.py`, classe de base `Short4e`, même contrôle en `-r 1080,1920`.
4. `bash manim/poste2/4e_hd.sh <script> <Scène> eleveai-maths-3e-<slug> manim/scripts/4e/media-hd-<t> manim/sorties/3e/maths/<notion>/NN-<slug> [1080,1920]`
   — un seul rendu HD à la fois sur la machine (verrou), l'autre session s'en sert aussi.
5. Planche : `bash manim/poste2/5e_planche.sh <mp4> <png> <colonnes> t1 t2 …`, et RELIRE les images.
6. Short : contrôler le COMPTEUR autour de « Mets pause » (3 → 2 → 1, dans la carte, rien par-dessus).

⛔ Ne jamais modifier `volume_4e_commun.py` ni `volume_4e_short_commun.py` (l'autre session s'en sert).
⛔ Commit PAR CHEMIN, uniquement les fichiers `3e_*.py`. ⛔ Jamais de push.

## Leçons propres à ce lot (elles s'ajoutent aux 30 de `manim/REPRISE-4e-perimetre-aire-volume.md`)

31. ⛔⛔ **Un dry run qui PLANTE passe inaperçu** : l'exception s'écrit sur la même ligne que la
    barre de progression, et un `grep` ordinaire ne la voit pas. Deux garde-fous, à garder :
    · filtrer la sortie par `tr '\r' '\n'` avant le grep (sinon les messages AUDIT/TARD collés
      à la barre de progression sont invisibles eux aussi) ;
    · vérifier que la ligne `ECRAN 10-abonne` est bien là — c'est la preuve que la scène est allée
      jusqu'au bout. (`manim/poste2/3e_dry.sh` fait les deux.)
32. ⛔ **`pause_defi(x=…)` n'existe pas** : la méthode effective est celle de `PaysageJ2`
    (`y`, `marge`). Et surtout, dans la colonne de droite, « Mets pause, et cherche ! » TOUCHE
    Ti-Margo (vu sur les planches de T1, T2, T3 et T4 : la mascotte occupe x > 4,6 et y < −2,2).
    Chaque épisode définit donc sa `pause_gauche()`, qui pose la phrase en bas À GAUCHE (x = −6,2).
33. ⛔⛔ **Un morceau réduit à « <nombre>. » perd son jeton** : `_jetons` applique
    `_ENUM = ^\s*[0-9]+\.(\s|$)` pour retirer les numérotations (« 1. »), donc « 3. » ne contient
    plus rien à attendre et s'affiche EN AVANCE. Couper autrement (« Le rayon » / « vaut 3. »).
34. ⛔ **Dans un SHORT, la phrase de réponse se cale sur ce qui est dit APRÈS le premier point
    de la voix** (`_poser` ne cherche qu'à partir de là). Avant d'écrire la phrase, lire la voix
    de réponse et repérer ce point : s'il tombe à la fin, la phrase ne doit porter AUCUN nombre.
    Un nombre et son unité vont dans deux morceaux (« 4,2 » puis « litres d'air. ») : sinon on
    attend le mot et le nombre part en AUDIT-TARD.
35. ⛔ **Le premier mot long d'une ligne de question doit être dit JUSTE avant son nombre.**
    « Une sphère de rayon 10 » attendait le « 10 » et mettait « sphère » en TARD de 0,9 s :
    « Rayon de la sphère : 10. » passe. (Même remède que la leçon 24, côté question.)
36. ⛔ **Un `Write(titre)` avant le premier `au_mot` d'un écran met l'écran en RETARD** quand la
    voix commence par le mot attendu (T5, « Pour une pyramide »). Le titre part alors dans le même
    `play` que la première ligne. Dans un SHORT, l'ouverture (0,7 s) suffit à retarder un FadeIn :
    poser la figure avec `add()`, sans animation.
37. ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de 3,8 d'unités de large, elle
    déborde (BORD). Un `fig.scale(0.7)` avant l'appel suffit.
38. ⚠️ La marge basse du paysage est y = −3,57 (et non −3,88) : un disque de rayon 1,2 centré
    en −2,4 déborde.
39. ⭐ Deux barres de comparaison se dessinent À L'ÉCHELLE : si le ballon écrase les poumons,
    l'écran dit le contraire de la voix (« c'est le même ordre de grandeur »).
40. ⭐ Outil : `scratchpad/verif_aumot.py <script> <nom-voix>` relit le script, suit les
    `dire`/`ecran`/`question_gauche` et vérifie que CHAQUE `au_mot` existe dans la voix de SON
    écran. Il attrape en une seconde les fautes de casse (« La surface » vs « la surface ») qui
    font planter le rendu à la moitié de la vidéo.
