"""L'image d'une vidéo à des instants donnés, empilées dans un seul PNG.

    python -X utf8 manim/poste2/apercu-instants.py <video.mp4> <sortie.png> <t1> [t2 …]

⭐ POURQUOI (série NOMBRES ENTIERS, 21/11/2026)
`scripts/planche-video.py` prend la DERNIÈRE image de chaque écran, et il lui arrive d'en sauter un
(sur B1 : 12 images détectées pour 16 écrans, et c'est justement l'écran manquant qu'il fallait
relire). Il faut alors extraire l'image à la main — et c'est aussi ce qu'on fait pour regarder un
instant précis : le compteur d'un short seconde par seconde, une carte de choix au moment du ✓,
une étiquette dont on soupçonne qu'elle déborde.

⚠️ Pas de binaire ffmpeg utilisable en ligne de commande sur ce poste : on lit avec PyAV, comme
`scripts/planche-video.py`.
⭐ Comparer toujours le compte d'images de la planche aux lignes `ECRAN` du log de rendu : un écran
   manquant sur la planche n'est PAS un écran sauté par la vidéo.
"""
import sys

import av
from PIL import Image


def main(video, sortie, instants):
    conteneur = av.open(video)
    flux = conteneur.streams.video[0]
    ips = float(flux.average_rate)
    cibles = [round(t * ips) for t in sorted(instants)]
    trouve = {}
    for n, image in enumerate(conteneur.decode(flux)):
        if n in cibles:
            trouve[n] = image.to_image().convert("RGB")
        if len(trouve) == len(set(cibles)):
            break
    conteneur.close()
    images = [trouve[n] for n in cibles if n in trouve]
    if not images:
        raise SystemExit("aucun instant trouve dans " + video)
    w, h = images[0].size
    out = Image.new("RGB", (w, h * len(images) + 6 * (len(images) - 1)), (70, 70, 70))
    for i, im in enumerate(images):
        out.paste(im, (0, i * (h + 6)))
    out.save(sortie)
    print(sortie, [round(n / ips, 2) for n in cibles if n in trouve])


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(2)
    main(sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3:]])
