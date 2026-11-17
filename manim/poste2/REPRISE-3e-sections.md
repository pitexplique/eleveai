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

## Leçons propres à ce lot

(à remplir au fil des épisodes)
