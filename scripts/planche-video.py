# La planche de contrôle d'une vidéo : la DERNIÈRE image de chaque écran.
# Un écran finit par un clear() : le nombre de pixels allumés chute d'un coup.
# ⚠️ Pas de binaire ffmpeg sur ce poste : Manim rend avec PyAV, on lit avec PyAV.
#   python scripts/planche-video.py <video.mp4> <planche.png> [colonnes]
import sys

import av
from PIL import Image

video, sortie = sys.argv[1], sys.argv[2]
colonnes = int(sys.argv[3]) if len(sys.argv) > 3 else 3

container = av.open(video)
flux = container.streams.video[0]
fps = float(flux.average_rate)
pas = max(1, round(fps / 2))  # deux mesures par seconde
echantillons = []  # (temps, image PIL en petit, pixels allumés)
for n, frame in enumerate(container.decode(flux)):
    if n % pas:
        continue
    im = frame.to_image()
    petit = im.convert("L").resize((80, 45))
    echantillons.append((n / fps, im, sum(1 for p in petit.getdata() if p > 40)))
container.close()

allumes = [a for _, _, a in echantillons]
garder = [i - 1 for i in range(1, len(allumes)) if allumes[i - 1] > 40 and allumes[i] < 0.65 * allumes[i - 1]]
garder.append(len(allumes) - 1)
garder = sorted(set(garder))
duree = echantillons[-1][0]
print(f"duree : {int(duree // 60)} min {duree % 60:04.1f} s - ecrans detectes : {len(garder)} aux secondes "
      + ", ".join(f"{echantillons[i][0]:.1f}" for i in garder))

vignettes = [echantillons[i][1].convert("RGB") for i in garder]
w, h = vignettes[0].size
if w > 640:
    vignettes = [v.resize((640, int(h * 640 / w))) for v in vignettes]
    w, h = vignettes[0].size
lignes = (len(vignettes) + colonnes - 1) // colonnes
marge = 8
planche = Image.new("RGB", (colonnes * (w + marge) + marge, lignes * (h + marge) + marge), (90, 90, 90))
for k, v in enumerate(vignettes):
    planche.paste(v, (marge + (k % colonnes) * (w + marge), marge + (k // colonnes) * (h + marge)))
planche.save(sortie)
print(f"planche : {sortie} ({len(vignettes)} ecrans, {colonnes} colonnes)")

