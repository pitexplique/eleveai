# -*- coding: utf-8 -*-
# manim/poste2/image-a-linstant.py
#
#   python -X utf8 manim/poste2/image-a-linstant.py <video.mp4> <secondes> <sortie.png>
#   python -X utf8 manim/poste2/image-a-linstant.py <video.mp4> 312,5 <sortie.png>
#
# ⛔⛔ POURQUOI CET OUTIL (27/11/2026). Une planche montre la DERNIÈRE image de chaque
# écran, et un écran de réponse HÉRITE de son écran de question : il n'y a pas de
# `clear()` entre les deux, donc le couple ne donne qu'UNE vignette — celle de la
# réponse. **Un écran de question n'est donc JAMAIS montré par une planche dans son
# état de question.**
#
# ⭐ Ce n'est pas une curiosité : sur E1 `07`, le rappel de la colonne de gauche est
# retiré (`FadeOut`) avant que l'explication s'écrive, précisément pour ne pas être
# recouvert. Il n'existe donc sur AUCUNE vignette. Quand Frédéric a fait réécrire ce
# rappel, aucune planche ne pouvait montrer le résultat : il fallait une image prise
# PENDANT la question.
#
# ⚠️ L'instant se lit dans le dry run, qui imprime `ECRAN <nom> t=<secondes>` quand
# `AUDIT=1` ou `BORDS=1`. Viser quelques secondes APRÈS le début de l'écran, le temps
# que ses blocs soient posés.
# ⚠️ La virgule décimale est acceptée (« 312,5 »), parce que tout le reste de cette
# série écrit les nombres à la française.
# ⛔ Il ne juge rien : il extrait. C'est l'œil qui juge.

import sys
from pathlib import Path

import av

if len(sys.argv) < 4:
    sys.exit(__doc__ or "usage : <video.mp4> <secondes> <sortie.png>")

video, brut, sortie = sys.argv[1], sys.argv[2].replace(",", "."), sys.argv[3]
cible = float(brut)

conteneur = av.open(video)
flux = conteneur.streams.video[0]
fps = float(flux.average_rate)
duree = float(flux.duration * flux.time_base) if flux.duration else None
if duree and cible > duree:
    conteneur.close()
    sys.exit(f"⛔ {cible:.1f} s demandé, la vidéo ne dure que {duree:.1f} s")

# ⚠️ Pas de seek : sur un MP4 Manim sans index fin, un seek retombe sur la keyframe
# précédente et on extrait une image d'un AUTRE écran sans le savoir. On décode depuis
# le début et on s'arrête au premier instant atteint — lent, mais exact.
trouve = None
for frame in conteneur.decode(flux):
    t = float(frame.pts * flux.time_base)
    if t >= cible:
        trouve = (t, frame.to_image())
        break
conteneur.close()

if trouve is None:
    sys.exit(f"⛔ aucune image à {cible:.1f} s")
t, im = trouve
Path(sortie).parent.mkdir(parents=True, exist_ok=True)
im.save(sortie)
print(f"image à {t:.2f} s (demandé {cible:.2f}) → {sortie}  [{im.width}×{im.height}, "
       f"{fps:.0f} fps]")
